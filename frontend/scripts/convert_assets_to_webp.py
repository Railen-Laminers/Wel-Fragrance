from pathlib import Path
from PIL import Image
import re

root = Path(__file__).resolve().parent.parent
asset_dirs = [root / 'src/assets/Bg', root / 'src/assets/Models', root / 'src/assets/Products']

for asset_dir in asset_dirs:
    if not asset_dir.exists():
        continue
    for path in asset_dir.iterdir():
        if path.name.startswith('._'):
            continue
        if path.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
            continue
        out_path = path.with_suffix('.webp')
        if out_path.exists():
            continue
        try:
            with Image.open(path) as img:
                if img.mode in {'RGBA', 'LA', 'P'}:
                    converted = img.convert('RGBA')
                else:
                    converted = img.convert('RGB')
                max_dim = 1600
                if max(converted.size) > max_dim:
                    converted.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                converted.save(out_path, 'WEBP', quality=78, lossless=False)
            print(f'converted {path.name} -> {out_path.name}')
        except Exception as exc:
            print(f'skipped {path.name}: {exc}')

# Update asset module imports to point at .webp files when available.
files_to_update = [root / 'src/assets/images/bg.js', root / 'src/assets/images/models.js', root / 'src/assets/images/products.js']
for file_path in files_to_update:
    if not file_path.exists():
        continue
    text = file_path.read_text(encoding='utf-8')
    updated = re.sub(r"(\.[A-Za-z0-9]+)(['\"])", lambda m: '.webp' + m.group(2) if (file_path / (Path(m.group(0)).name)) else m.group(0), text)
    # fallback for direct import path replacements
    updated = updated.replace('.jpg', '.webp').replace('.png', '.webp').replace('.JPG', '.webp').replace('.PNG', '.webp')
    file_path.write_text(updated, encoding='utf-8')

print('asset import rewrites complete')
