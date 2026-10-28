from pathlib import Path
import shutil
import fitz

source = Path("attached_assets/Dolphin_Catalague__NEW-_2026_1793179165932.pdf")
output = Path("/tmp/dolphin-brochure-review")
output.mkdir(parents=True, exist_ok=True)

doc = fitz.open(source)
print(f"Pages: {doc.page_count}")

# Build two review sheets from the product pages, retaining the printed layout.
for sheet_number, page_numbers in enumerate((range(3, 11), range(11, 19)), start=1):
    sheet = fitz.open()
    sheet_page = sheet.new_page(width=1200, height=1320)
    cell_w, cell_h = 300, 330
    for index, page_number in enumerate(page_numbers):
        if page_number >= doc.page_count:
            continue
        x = (index % 4) * cell_w
        y = (index // 4) * cell_h
        rect = fitz.Rect(x + 5, y + 18, x + cell_w - 5, y + cell_h - 5)
        sheet_page.show_pdf_page(rect, doc, page_number)
        sheet_page.insert_text(
            fitz.Point(x + 9, y + 13),
            f"PDF page {page_number + 1}",
            fontsize=9,
            color=(0.12, 0.12, 0.12),
        )
    sheet[0].get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False).save(
        output / f"products-{sheet_number}.png"
    )

# Extract embedded images from product pages for visual selection.
seen = set()
for page_number in range(3, min(19, doc.page_count)):
    page = doc[page_number]
    for image_index, image_info in enumerate(page.get_images(full=True), start=1):
        xref = image_info[0]
        if xref in seen:
            continue
        seen.add(xref)
        image = doc.extract_image(xref)
        width, height = image["width"], image["height"]
        filename = f"page-{page_number + 1:02d}-image-{image_index:02d}-{width}x{height}.{image['ext']}"
        (output / filename).write_bytes(image["image"])
        print(f"{filename}\t{width}x{height}\t{xref}")

selected = [
    (3, 244, "fiber-marking"),
    (5, 308, "custom-fiber-marking"),
    (6, 327, "fiber-sheet-cutting"),
    (8, 435, "pipe-cutting"),
    (9, 439, "sheet-pipe-cutting"),
    (10, 494, "fiber-welding"),
    (11, 524, "battery-welding"),
    (12, 541, "online-marking"),
    (13, 654, "co2-cutting"),
    (14, 666, "co2-engraving"),
    (15, 709, "uv-marking"),
    (16, 783, "3d-engraving"),
    (16, 832, "die-mould-welding"),
    (17, 874, "jewellery-cutting"),
    (18, 938, "jewellery-soldering"),
]
sheet = fitz.open()
sheet_page = sheet.new_page(width=1200, height=800)
asset_dir = Path("artifacts/astromark-laser/public/images")
asset_dir.mkdir(parents=True, exist_ok=True)
for index, (page_number, xref, label) in enumerate(selected):
    image = doc.extract_image(xref)
    filename = f"selected-{label}.{image['ext']}"
    image_path = output / filename
    image_path.write_bytes(image["image"])
    shutil.copyfile(image_path, asset_dir / f"{label}.{image['ext']}")
    if index >= 6:
        continue
    x = (index % 3) * 400
    y = (index // 3) * 400
    rect = fitz.Rect(x + 12, y + 34, x + 388, y + 388)
    sheet_page.insert_image(rect, filename=str(image_path), keep_proportion=True)
    sheet_page.insert_text(fitz.Point(x + 14, y + 22), label.replace("-", " ").title(), fontsize=13)
sheet_page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False).save(
    output / "selected-machines.png"
)

shutil.copyfile(
    "attached_assets/Finalised_Logo_1793179180687.png",
    asset_dir / "astromark-logo.png",
)
