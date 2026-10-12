#!/usr/bin/env node
// Pre-publish checks. Run with: npm run check   (builds the site first, then inspects dist/ and src/)
//
// ERRORS (exit code 1, do not publish):
//   - broken internal links or #anchors
//   - pages without a <title> or without exactly one <h1>
//   - images in the built site over 300 KB, or <img> without alt
//   - design-rule breaks in src/: raw hex colours or px font sizes in classes, <style> blocks, !important
// UNFINISHED CONTENT (listed, exit code 0 - a human decides):
//   - href="#" links, the word "placeholder" in page text, and content files marked placeholder: true
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const errors = [];
const unfinished = new Map(); // message -> pages it appears on
const note = (message, page) => unfinished.set(message, [...new Set([...(unfinished.get(message) ?? []), page])]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = async (p) => stat(p).then((s) => s.isFile(), () => false);

/** Resolve a site-relative URL to a built file, the way Cloudflare Pages does. */
async function resolves(url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]).replace(/\/$/, '');
  const base = path.join(DIST, clean);
  for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (await exists(candidate)) return candidate;
  }
  return null;
}

const pageName = (file) => '/' + path.relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '');

// ---- built pages
const files = await walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));
const idsByPage = new Map();
const contents = new Map();
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  contents.set(page, html);
  idsByPage.set(page, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

for (const page of pages) {
  const html = contents.get(page);
  const name = pageName(page);

  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${name}: missing <title>`);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) errors.push(`${name}: expected one <h1>, found ${h1s}`);

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(img[0])) errors.push(`${name}: <img> without alt text`);
  }

  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1];
    if (href === '#') {
      const label = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      note(`link "${label}" goes nowhere yet (href="#")`, name);
    } else if (href.startsWith('#')) {
      if (!idsByPage.get(page).has(href.slice(1))) errors.push(`${name}: link to missing anchor ${href}`);
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      const target = await resolves(href);
      if (!target) errors.push(`${name}: broken link ${href}`);
      else if (href.includes('#') && !idsByPage.get(target)?.has(href.split('#')[1])) {
        errors.push(`${name}: link ${href} points to a missing anchor`);
      }
    }
  }

  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
  if (/placeholder/i.test(text.replace(/placeholder="[^"]*"/gi, ''))) {
    const hit = text.match(/.{0,40}placeholder.{0,60}/i)?.[0].replace(/\s+/g, ' ').trim();
    note(`placeholder wording: "…${hit}…"`, name);
  }
}

// ---- built images
for (const file of files.filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))) {
  const { size } = await stat(file);
  if (size > 300 * 1024) errors.push(`${path.relative(DIST, file)}: image is ${Math.round(size / 1024)} KB (limit 300 KB)`);
}

// ---- source images (what people drop into the repo)
const srcFiles = await walk('src');
for (const file of srcFiles.filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))) {
  const { size } = await stat(file);
  if (size > 800 * 1024) errors.push(`${file}: source image is ${Math.round(size / 1024)} KB. Run: node scripts/optimise-images.mjs ${file}`);
}

// ---- content files still marked placeholder
for (const file of srcFiles.filter((f) => f.startsWith(path.join('src', 'content')) && /\.(md|mdx)$/.test(f))) {
  const text = await readFile(file, 'utf8');
  const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (/^placeholder:\s*true\s*$/m.test(front)) note(`${file} is marked placeholder: true (stand-in text)`, file);
}

// ---- design rules in source
for (const file of srcFiles.filter((f) => f.endsWith('.astro'))) {
  const text = await readFile(file, 'utf8');
  const rules = [
    [/\b(?:text|leading|tracking)-\[\d[^\]]*\]/g, 'arbitrary font size/leading/tracking; use a theme token'],
    [/\b(?:bg|text|border|ring|fill|stroke|accent|from|to|via)-\[(?:#|rgb)[^\]]*\]/g, 'raw colour in a class; use a theme colour'],
    [/<style[\s>]/g, '<style> block; put styles in global.css or use utility classes'],
    [/!important/g, '!important'],
  ];
  for (const [re, why] of rules) {
    for (const m of text.matchAll(re)) errors.push(`${file}: ${m[0]} (${why})`);
  }
}

// ---- report
const pagesChecked = pages.length;
console.log(`\nChecked ${pagesChecked} pages.`);
if (errors.length) {
  console.log(`\nERRORS (${errors.length}) - fix before publishing:`);
  for (const e of errors) console.log(`  x ${e}`);
}
if (unfinished.size) {
  console.log(`\nUNFINISHED CONTENT (${unfinished.size} items) - check this is intended before publishing:`);
  for (const [message, where] of unfinished) {
    const list = where.length > 3 ? `${where.length} pages` : where.join(', ');
    console.log(`  - ${message}${where[0] === message.split(' ')[0] ? '' : `  [${list}]`}`);
  }
}
if (!errors.length && !unfinished.size) console.log('\nAll clear.');
process.exit(errors.length ? 1 : 0);
