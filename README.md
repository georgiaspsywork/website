# Georgia's PsyWork — website mock-up

Responsive website for **Georgia's PsyWork Ltd** (Georgia Hodkinson GMBPsS, organisational psychologist, Leicestershire, UK). Built by Oblong in Claude Design. Current live site being replaced: https://www.georgiaspsywork.com/

## How the site is built
Astro (static output) + Tailwind CSS v4, no UI framework. Pages are assembled from a small component kit; articles and resources are content files. The interactive bits are small TypeScript scripts inside their components.

```
src/pages/          one file per page (about, contact, index, articles, resources ...) + [slug] routes for content
src/content/        articles/*.mdx and resources/*.md  (the words; front matter describes each entry)
src/components/     the component kit (see docs/components.md)
docs/guide-for-georgia.md   plain-English guide for the site owner
src/layouts/        BaseLayout, ArticleLayout, ResourceLayout
src/lib/            shared logic (rota rules, alertness text, date formatting)
src/data/site.ts    nav links, contact details, social links
src/styles/global.css   design tokens (colours, type scale, spacing) + base styles
src/assets/         fonts and images (images are optimised at build time)
scripts/            check, optimise-images, screenshot
.claude/skills/     the routines Claude follows for preview, publish, new pages, new articles ...
_templates/         the original Claude Design exports, for reference only (not part of the build)
```

### Commands
- `npm install` once, then `npm run dev` (live preview at localhost:4321), `npm run build` (output in `dist/`).
- `npm run check` builds and runs the pre-publish checks: broken links, missing titles/alt text, oversized images, design-rule breaks (errors) and a list of unfinished content (placeholder text, `href="#"` links).
- `npm run optimise-images -- path/to/photo.jpg` shrinks a picture into `src/assets/images/`.

### Deploying (Cloudflare Pages, via Git)
- Build command `npm run build`, output directory `dist`. The Node version comes from `.node-version`.
- The `preview` branch deploys to https://preview.website-4ph.pages.dev/; `main` is the production site.
- Cloudflare build watch paths: if set, they must include `src`, `public`, `scripts`, `astro.config.mjs`, `package.json` and `package-lock.json` (simplest is to leave them empty so every push builds).
- Minification: the build minifies HTML, CSS and JavaScript and fingerprints assets (`/_astro/*.js`), so there is no separate minify step.
- Contact form and newsletter form do not send anything yet; wire both to a form service before launch.
- Calendly links are **examples** (`/30min`, `/rota-review`, `/board-briefing`). Replace with real event URLs.

### Pages
| URL | File | Purpose |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Home: hero, problem tick-list, hours-awake slider, three pressures, Georgia bio, 24-hour alertness chart, note from Georgia |
| `/about` | `src/pages/about.astro` | About Georgia: story, career timeline, principles, credentials, client quote |
| `/resources` | `src/pages/resources.astro` | Resource library: featured resource, filterable cards |
| `/resources/<slug>` | `src/content/resources/<slug>.md` | One page per resource (standard layout). Resources with a bespoke page set `href` |
| `/resources/rota-builder` | `src/pages/resources/rota-builder.astro` | Interactive rota fatigue builder |
| `/articles` | `src/pages/articles.astro` | Article index: lead article, filterable list, newsletter sign-up |
| `/articles/<slug>` | `src/content/articles/<slug>.mdx` | One page per article |
| `/contact` | `src/pages/contact.astro` | Booking options, message form, direct details, what happens next |

## Brief & audience
- Fatigue and human-factors consultancy. Industry: **shift work** (logistics, utilities, energy).
- Audience is **operations leaders / COOs who manage shift workers**, not the workers themselves. Copy speaks to cost, incidents, turnover, absence, risk.
- Tone: **calm**, quiet, problem-led. Must not look like a London brand agency. No large imagery, no giant decorative type, no flashy animation. Interactivity is allowed when it teaches something (tick-list, sliders, rota builder).

## Key design decisions
- **Dark mode throughout.** The client liked the dark concepts. Night-shift theme: the site "lives" at night.
- **Clock/hours motif** is the core idea. Section labels use times (`02:00 · the circadian low`, `06:00 · handover`), steps use timestamps (`00:00`, `00:05`), timelines use years/days in a left margin. Use this sparingly but consistently.
- **Problem-focused headlines** (client preference, from concept 1c): e.g. "Work designed so people stay safe, stay well and stay."
- **Interactive teaching moments**: problem tick-list with live count + verdict; hours-awake slider (Dawson & Reid, *Nature*, 1997: 17h ≈ 0.05% BAC, 24h ≈ 0.10%); clickable 24-hour alertness curve (illustrative); rota builder with simplified flag rules.
- **Left-margin layout** for reading sections (label in a ~200px column, content max ~720px) — borrowed from the 2b "logbook" concept.
- Resources = cards (things you use); Articles = editorial list (things you read). Kept deliberately different.

## Style rules
Colours, type sizes and spacing are theme tokens in `src/styles/global.css`; use the token names (`bg-brand`, `text-mint`, `text-lg`, `px-gutter`), never raw values. `npm run check` fails on raw hex colours and pixel font sizes.

- **Colour roles:** page ground `ground`, deeper bands `deep`, footer `footer`. **Brand green `brand`** (client-supplied `#0f3a34`) for full-bleed sections, feature cards and quiet buttons. `mint` for links, small labels, outlines and primary buttons on dark. `amber` is **highlight only**: selected hour, ticks, counts, timestamps, primary call to action inside green sections; never for body text. Text: `ink` primary; `muted`/`soft` secondary; `subtle`/`faint` tertiary; `on-brand` on green. Cards `surface` with a `line-soft` border; row rules `line`.
- **Type:** Source Serif 4 only, no sans-serif (arrow glyphs use the system font on purpose). Headings semibold, or normal weight for big display heroes with an *italic* emphasis word. Small uppercase labels use `tracking-label`. Times and counts use `tabular-nums`.
- **Layout:** fluid and responsive. Sections use `px-gutter`/`px-gutter-reading` and `py-section`/`py-section-sm`; everything stacks to one column on phones (no horizontal scrolling). Radius `rounded-xs` (2px) on buttons, `rounded-sm` (4px) on cards.
- **Components:** reuse the kit (`docs/components.md`); don't invent new ones for one-off needs.
- **Copy rules:** keep client-supplied copy verbatim. Plain, matter-of-fact UK English. No stats unless sourced. Placeholder copy is flagged (`placeholder: true` in content files, "Placeholder:" in text) so `npm run check` can list it.

## Open items
- All imagery is placeholder (portrait, lead images, previews).
- Placeholder/invented copy needing Georgia's sign-off: About story, career timeline dates, MSc, client quote, all resource and article copy except the two sample pieces, "note from Georgia", tick-list items. The check script lists these.
- Sign-off needed on: Dawson & Reid comparison, rota rule thresholds, alertness curve (labelled illustrative).
- Contact form backend, newsletter backend, real Calendly URLs, social links, the many `href="#"` links.
- Fonts: only the Latin subset of Source Serif 4 is included (UK English); other alphabets would fall back to a system serif.
