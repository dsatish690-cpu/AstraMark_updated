from pathlib import Path
import pymupdf

source = Path("attached_assets/astramark_logo_vector_1793199781755.pdf")
preview = Path(".agents/outputs/astramark-new-logo-preview.png")
preview.parent.mkdir(parents=True, exist_ok=True)

document = pymupdf.open(source)
page = document[0]
scale = 0.15
pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=True)
pixmap.save(preview)

drawings = page.get_drawings()
images = page.get_images(full=True)
print(f"Pages: {document.page_count}")
print(f"Page size: {page.rect.width:.1f} x {page.rect.height:.1f} pt")
print(f"Vector drawing objects: {len(drawings)}")
print(f"Embedded images: {len(images)}")
print(f"Rendered preview: {preview}")
