import os
from pathlib import Path
import imageio.v2 as imageio

root = Path(__file__).resolve().parent.parent
src = root / 'src/assets/videos/welFragrance.mp4'
out = root / 'src/assets/videos/welFragrance-optimized.mp4'

if out.exists():
    out.unlink()

reader = imageio.get_reader(src, 'ffmpeg')
writer = imageio.get_writer(
    out,
    fps=24,
    codec='libx264',
    quality=8,
    macro_block_size=None,
    output_params=['-pix_fmt', 'yuv420p', '-movflags', '+faststart'],
)
for frame in reader:
    writer.append_data(frame)
writer.close()
reader.close()
print(out)
print(os.path.getsize(out))
