---
name: add-image
description: Add or replace a picture on a page or article (photo of Georgia, lead image, preview image). Shrinks large uploads automatically. Use whenever Georgia provides an image or asks for one to be added or swapped.
---

# Add an image

Cloudflare caches images well, but a 5 MB upload still makes the page slow the first time. Every picture goes through the optimiser; originals are never committed.

1. Find the image file she provided (the session saves attachments; ask if you can't find it).
2. Ask two things if not obvious: **where it goes** (which page/placeholder) and **what it shows** (this becomes the alt text for screen readers; write a plain description, not "image of").
3. Optimise: `node scripts/optimise-images.mjs "<path>" --name=<short-descriptive-name>`. It saves a WebP in `src/assets/images/`, at most 2000px on the longest side and about 500 KB or less. If it prints a warning that it is still large, re-run with `--max=1600`. Tell her the before/after size ("5.2 MB down to 310 KB").
4. Use it. In the page or layout: `import pic from '../assets/images/<name>.webp';` and replace the matching `<ImagePlaceholder .../>` with `<Photo src={pic} alt="..." ratio="4/5" />` (ratios available: 4/5, 3/2, 4/3, 16/10, 16/8, 21/9, 1/1; match the placeholder it replaces). Photos above the fold can use `loading="eager"`. Astro creates phone-sized copies at build time.
5. Remove the placeholder wording (e.g. the caption "Caption or credit sits here" if there is a real credit to add, ask her for it).
6. Logos or simple graphics that are SVG: put them in `src/assets/images/` and import them the same way, no optimiser needed.
7. `npm run check` (it fails on any built image over 300 KB or any picture without alt text), `/screenshots`, then offer `/preview`.

A photo of a person: ask that she has permission to use it. Don't add pictures she didn't provide.
