#!/usr/bin/env node
// Screenshots pages of the built site (dist/) at desktop and phone width, so changes can be shown
// to Georgia before anything is pushed.
//   npm run build && node scripts/screenshot.mjs /about /articles/rota-compliant-not-safe
//   node scripts/screenshot.mjs --out=/tmp/shots /          (default output folder: /tmp/site-screenshots)
// Pictures are saved outside the repo. Needs Playwright with Chromium (preinstalled in Claude Code on the web).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const out = (args.find((a) => a.startsWith('--out=')) ?? '--out=/tmp/site-screenshots').slice(6);
const pages = args.filter((a) => !a.startsWith('--'));
if (pages.length === 0) pages.push('/');

let playwright;
try {
  playwright = createRequire(import.meta.url)('playwright');
} catch {
  playwright = createRequire(import.meta.url)(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
}

if (!fs.existsSync('dist')) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
// Same clean-URL behaviour as Cloudflare Pages: /about -> about.html
const server = http.createServer((req, res) => {
  const base = path.join('dist', decodeURIComponent(req.url.split('?')[0]));
  for (const file of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
      return fs.createReadStream(file).pipe(res);
    }
  }
  res.writeHead(404).end('not found');
});
await new Promise((resolve) => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}`;

fs.mkdirSync(out, { recursive: true });
const browser = await playwright.chromium.launch();
for (const page of pages) {
  const slug = page.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
  for (const [label, width] of [['desktop', 1280], ['phone', 390]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const tab = await context.newPage();
    await tab.goto(base + page);
    await tab.waitForLoadState('networkidle');
    await tab.evaluate(() => document.fonts.ready);
    const file = path.join(out, `${slug}-${label}.png`);
    await tab.screenshot({ path: file, fullPage: true });
    console.log(file);
    await context.close();
  }
}
await browser.close();
server.close();
