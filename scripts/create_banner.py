"""Create a wide campaign banner while preserving the source artwork's proportions."""
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

image_dir = Path(__file__).resolve().parents[1] / 'public' / 'image'
source = Image.open(image_dir / 'image2.jpg').convert('RGB')
width, height = 1600, 720
artwork = ImageOps.contain(source, (height, height), Image.Resampling.LANCZOS)
left = (width - artwork.width) // 2
canvas = Image.new('RGB', (width, height))

# Extend the scenery's colors at both edges without stretching the main artwork.
for side, x, side_width in [('left', 0, left), ('right', left + artwork.width, width - left - artwork.width)]:
    edge_width = max(1, artwork.width // 5)
    box = (0, 0, edge_width, artwork.height) if side == 'left' else (artwork.width - edge_width, 0, artwork.width, artwork.height)
    extension = ImageOps.mirror(artwork.crop(box)).resize((side_width + 40, height), Image.Resampling.LANCZOS)
    extension = extension.filter(ImageFilter.GaussianBlur(24))
    canvas.paste(extension, (x - (40 if side == 'right' else 0), 0))

# A narrow feather makes the extended background meet the sharp central artwork.
mask = Image.new('L', artwork.size, 255)
feather = 24
for x in range(feather):
    opacity = round(255 * x / feather)
    mask.paste(opacity, (x, 0, x + 1, artwork.height))
    mask.paste(opacity, (artwork.width - x - 1, 0, artwork.width - x, artwork.height))
canvas.paste(artwork, (left, (height - artwork.height) // 2), mask)
output = image_dir / 'vinfast-banner-wide.webp'
canvas.save(output, 'WEBP', quality=92, method=6)
print(f'Created {output.name}: {width} x {height}, {output.stat().st_size:,} bytes')
