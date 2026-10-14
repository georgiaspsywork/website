// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // about.html, articles/<slug>.html ... Cloudflare Pages serves these at /about, /articles/<slug>.
  build: { format: 'file' },
  trailingSlash: 'never',
  compressHTML: true,

  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },

  // Source Serif 4, self-hosted from src/assets/fonts. Astro fingerprints the files,
  // writes the @font-face rules, adds a metric-matched fallback and preloads on request.
  fonts: [
    {
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      provider: fontProviders.local(),
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
        // latin, italic
        { src: ['./src/assets/fonts/source-serif-4-latin-italic.woff2'], weight: '400', style: 'italic', unicodeRange: ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD'] },
        // latin, normal
        { src: ['./src/assets/fonts/source-serif-4-latin-normal.woff2'], weight: '200 900', style: 'normal', unicodeRange: ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD'] },
        ],
      },
    },
  ],
});
