#!/usr/bin/env node
// Shrinks pictures for the website: resizes to a sensible maximum and saves WebP into src/assets/images.
//   node scripts/optimise-images.mjs path/to/photo.jpg [more files...] [--max=2000] [--quality=80] [--target=500] [--name=new-name]
// Originals are never modified. Anything that is not a picture is ignored with a warning.
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const opts = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')));
const files = args.filter((a) => !a.startsWith('--'));
const maxSide = Number(opts.max ?? 2000); // longest edge in px; 2000 is plenty for full-width photos on retina screens
const startQuality = Number(opts.quality ?? 80);
const targetKb = Number(opts.target ?? 500); // keep trying lower quality until the file is under this many KB
const outDir = 'src/assets/images';

if (files.length === 0) {
  console.error('Usage: node scripts/optimise-images.mjs <image> [more images] [--max=2000] [--quality=80] [--target=500] [--name=slug]');
  process.exit(1);
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

await mkdir(outDir, { recursive: true });
let failed = false;
for (const file of files) {
  try {
    const before = (await stat(file)).size;
    const name = slug(opts.name && files.length === 1 ? opts.name : path.parse(file).name);
    const out = path.join(outDir, `${name}.webp`);
    const prepared = sharp(file)
      .rotate() // respect the camera's orientation, then strip metadata (location etc.)
      .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true });
    let quality = startQuality;
    let info = await prepared.clone().webp({ quality }).toFile(out);
    while (info.size > targetKb * 1024 && quality > 45) {
      quality -= 10;
      info = await prepared.clone().webp({ quality }).toFile(out);
    }
    console.log(`${file}  ${kb(before)} -> ${out}  ${kb(info.size)}  (${info.width}x${info.height}, quality ${quality})`);
    if (info.size > targetKb * 1024) console.warn(`  note: still ${kb(info.size)}. Try --max=1600.`);
  } catch (error) {
    failed = true;
    console.warn(`Skipped ${file}: ${error.message}`);
  }
}
process.exit(failed ? 1 : 0);
