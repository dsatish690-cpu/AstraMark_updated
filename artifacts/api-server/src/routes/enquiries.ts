import { Router, type IRouter, type Response } from "express";
import {
  SendEnquiryBody,
  SendEnquiryResponse,
  type ApiError,
} from "@workspace/api-zod";

const router: IRouter = Router();
const limits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function respondWithError(
  res: Response,
  status: number,
  error: string,
): void {
  const body: ApiError = { error };
  res.status(status).json(body);
}

function isRateLimited(key: string, now: number): boolean {
  if (limits.size > 5000) {
    for (const [entryKey, entry] of limits) {
      if (entry.resetAt <= now) limits.delete(entryKey);
    }
  }

  const entry = limits.get(key);
  if (!entry || entry.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

router.post("/enquiries", async (req, res): Promise<void> => {
  const clientKey = req.ip || "unknown";
  if (isRateLimited(clientKey, Date.now())) {
    respondWithError(
      res,
      429,
      "Too many attempts. Please wait a little and try again.",
    );
    return;
  }

  const input = SendEnquiryBody.safeParse(req.body);
  if (!input.success) {
    respondWithError(res, 400, "Please check your details and try again.");
    return;
  }

  const enquiry = {
    ...input.data,
    name: input.data.name.trim(),
    email: input.data.email.trim(),
    companyName: input.data.companyName?.trim() || undefined,
    mobile: input.data.mobile?.trim() || undefined,
    machine: input.data.machine.trim(),
    details: input.data.details.trim(),
    website: input.data.website.trim(),
  };
  const normalizedInput = SendEnquiryBody.safeParse(enquiry);
  if (!normalizedInput.success) {
    respondWithError(res, 400, "Please check your details and try again.");
    return;
  }

  if (normalizedInput.data.website) {
    respondWithError(res, 400, "Could not accept this request.");
    return;
  }

  const validatedEnquiry = normalizedInput.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.warn("Enquiry delivery is not configured");
    respondWithError(
      res,
      503,
      "Enquiry delivery is temporarily unavailable. Please email info@astramarklaser.com or support@astramarklaser.com directly.",
    );
    return;
  }

  const isSupport =
    validatedEnquiry.requestType === "Service or technical support";
  const to = isSupport
    ? "support@astramarklaser.com"
    : "info@astramarklaser.com";
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Astramark Laser Website <info@astramarklaser.com>";
  const subject = `${validatedEnquiry.requestType} — Astramark Laser Machine`;
  const text = [
    "ASTRAMARK LASER MACHINE — WEBSITE ENQUIRY",
    "",
    `Name: ${validatedEnquiry.name}`,
    `Company: ${validatedEnquiry.companyName || "Not provided"}`,
    `Mobile: ${validatedEnquiry.mobile || "Not provided"}`,
    `Email: ${validatedEnquiry.email}`,
    `Request type: ${validatedEnquiry.requestType}`,
    `Machine / model: ${validatedEnquiry.machine || "Not specified"}`,
    "",
    "Application or support details:",
    validatedEnquiry.details,
  ].join("\n");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: validatedEnquiry.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!delivery.ok) {
      req.log.warn(
        { providerStatus: delivery.status },
        "Email provider rejected an enquiry",
      );
      respondWithError(
        res,
        502,
        "We couldn't send your enquiry just now. Your details are still here—please try again or email Astramark directly.",
      );
      return;
    }

    res
      .status(201)
      .json(SendEnquiryResponse.parse({ message: "Your enquiry has been sent." }));
  } catch {
    req.log.error("Email provider request failed");
    respondWithError(
      res,
      502,
      "We couldn't send your enquiry just now. Your details are still here—please try again or email Astramark directly.",
    );
  }
});

export default router;
