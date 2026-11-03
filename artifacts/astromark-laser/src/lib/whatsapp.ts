export const WHATSAPP_NUMBER = '919177709681';

const GENERAL_ENQUIRY_MESSAGE = [
  'Hello ASTRAMARK Team,',
  '',
  'I would like to know more about your laser machines and solutions.',
  '',
  'Please contact me.',
].join('\n');

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(GENERAL_ENQUIRY_MESSAGE);
}

export function buildProductWhatsAppMessage(productName: string): string {
  return [
    'Hello ASTRAMARK Team,',
    '',
    `I am interested in your ${productName}.`,
    '',
    'Please share the product specifications, pricing, and quotation.',
    '',
    'Thank you.',
  ].join('\n');
}

export function buildEnquiryWhatsAppMessage(form: {
  name: string;
  companyName: string;
  mobile: string;
  email: string;
  requestType: string;
  machine: string;
  details: string;
}): string {
  return [
    'Hello ASTRAMARK Team,',
    '',
    'I would like to make an enquiry.',
    '',
    `Name: ${form.name.trim()}`,
    `Company: ${form.companyName.trim() || 'Not provided'}`,
    `Mobile: ${form.mobile.trim()}`,
    `Email: ${form.email.trim()}`,
    `Enquiry type: ${form.requestType}`,
    `Product: ${form.machine}`,
    '',
    'Enquiry message:',
    form.details.trim(),
    '',
    'Thank you.',
  ].join('\n');
}
