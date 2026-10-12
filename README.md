# Georgia's PsyWork — website mock-up

Desktop-first, responsive mock-up of a new website for **Georgia's PsyWork Ltd** (Georgia Hodkinson GMBPsS, organisational psychologist, Leicestershire, UK). Built by Oblong in Claude Design. Current live site being replaced: https://www.georgiaspsywork.com/

## Deploying
- Every `.html` file in this folder is **fully self-contained** (fonts, styles, runtime and JavaScript inlined). Upload the whole folder to any static host (Netlify, S3, cPanel, GitHub Pages). No build step, no server code.
- `index.html` redirects to `Homepage.dc.html`. Page filenames are kept as `*.dc.html` because the pages link to each other by those names — don't rename them without updating links in the source files.
- The contact form does not send anything (it shows a thank-you state). Wire it to a form service before launch.
- Calendly links are **examples**: `https://calendly.com/georgiaspsywork/30min`, `/rota-review`, `/board-briefing`. Replace with real event URLs.

## Pages
| File | Purpose |
| --- | --- |
| `Homepage.dc.html` | Home: hero, problem tick-list, hours-awake slider, three pressures, Georgia bio, 24-hour alertness chart, note from Georgia, footer |
| `About.dc.html` | About Georgia: story, career "shift log" timeline, four principles, credentials, client quote |
| `Resources.dc.html` | Resources index: featured resource, filterable card library (Tool / Video / Template / Guide / Pack). Multi-part resources render as stacked cards |
| `Resource.dc.html` | Resource **template** (example: Rota red flags checklist) |
| `Resource-Rota-Builder.dc.html` | Real resource: interactive rota fatigue builder (4 crews × 7 days, click to cycle Off/E/L/N, live flags) |
| `Articles.dc.html` | Articles index: lead article, filterable editorial list (Fatigue / Retention / Change / AI), newsletter sign-up |
| `Article.dc.html` | Article **template**: long-form reading layout with sticky contents, pull quote, "In short" box, resource link, author, read next |
| `Contact.dc.html` | Contact: three Calendly booking options, message form, direct details, "what happens next" timeline |

## Editing source (for future Claude sessions)
- These exported files are **compiled bundles — do not edit them**. Edit the source `.dc.html` Design Components in the Claude Design project (same filenames at project root), then re-export with the bundler into `site/`.
- Source pages load the Broadsheet design system from `_ds/broadsheet-883746d1-7aea-4bdc-84c8-4d732850d943/` (styles.css + _ds_bundle.js). Keep that folder path intact.
- Each source file has a `<template id="__bundler_thumbnail">` right after `</helmet>`; it's required by the exporter. Leave it.
- Also in the project: `Homepage Concepts.dc.html` (the exploration canvas, turns 1–4) and `HANDOFF.md` (earlier brief + concept history). Read `HANDOFF.md` for the concept lineage.

## Brief & audience
- Fatigue and human-factors consultancy. Industry: **shift work** (logistics, utilities, energy).
- Audience is **operations leaders / COOs who manage shift workers**, not the workers themselves. Copy speaks to cost, incidents, turnover, absence, risk.
- Tone: **calm**, quiet, problem-led. Must not look like a London brand agency. No large imagery, no giant decorative type, no flashy animation. Interactivity is allowed when it teaches something (tick-list, sliders, rota builder).

## Key design decisions
- **Dark mode throughout.** The client liked the dark concepts. Night-shift theme: the site "lives" at night.
- **Clock/hours motif** is the core idea. Section labels use times (`02:00 · the circadian low`, `06:00 · handover`), steps use timestamps (`00:00`, `00:05`), timelines use years/days in a left margin. Use this sparingly but consistently.
- **Problem-focused headlines** (client preference, from concept 1c): e.g. "Fewer fatigue incidents. Lower turnover. Steadier shifts."
- **Interactive teaching moments**: problem tick-list with live count + verdict; hours-awake slider (Dawson & Reid, *Nature*, 1997: 17h ≈ 0.05% BAC, 24h ≈ 0.10%); clickable 24-hour alertness curve (illustrative); rota builder with simplified flag rules.
- **Left-margin layout** for reading sections (label in a ~200px column, content max ~720px) — borrowed from the 2b "logbook" concept.
- Resources = cards (things you use); Articles = editorial list (things you read). Kept deliberately different.

## Style rules
**Colour (hex, used inline):**
- Page ground `#101614` (charcoal-green). Deeper bands `#0b0f0e`. Footer `#07110f`.
- **Brand accent `#0f3a34`** (client-supplied) — full-bleed green sections, feature cards, primary "quiet" buttons. Hover `#134540` / `#185048`.
- Mint `#9cd3c2` — links, small labels, interactive outlines, primary buttons on dark. Hover `#b6e0d3`.
- Amber `#d9a55b` — **highlight only**: selected hour, ticked boxes, counts, timestamps, primary CTA inside green sections. Hover `#e4b977`. Never for body text blocks.
- Text: `#e6ece9` primary, `#b4b7ae` / `#a8aca3` secondary, `#8d9792` / `#7f857c` tertiary. On green: `#ffffff` / `#e2ebe8`, secondary `#a9c7bd`.
- Cards on dark: `#161f1c` with `1px solid rgba(230,236,233,.1)`, hover border mint.
- Row rules: `1px solid rgba(230,236,233,.14)`.

**Type:** Source Serif 4 only (from Broadsheet), no sans-serif. Headings 600 weight or 400 for big display heroes with an *italic* emphasis word. Small caps-style labels: 14–15px, `letter-spacing:.16–.18em`, uppercase. Body 18–22px, line-height 1.55–1.75. Use `font-variant-numeric: tabular-nums` for times and counts.

**Layout:** fluid. Horizontal padding `clamp(24px,6vw,80–96px)`; section vertical padding `clamp(72px,9–10vw,112–128px)`. Grids use `repeat(auto-fit,minmax(min(100%,Npx),1fr))` so everything stacks on mobile. Flex/grid + `gap`, no margins between siblings. Radius 2px on buttons, 4px on cards/panels.

**Components (repeat these, don't invent new ones):** header nav (brand left, links right, "Book a chat" underlined mint → Contact); hero (small label, display headline, one supporting paragraph, ≤2 buttons); green full-bleed section; left-margin reading section; numbered/time-stamped 3–4 column steps; ruled list rows; filter chips (mint fill when active); footer (CTA + Contact + Elsewhere columns).

**Copy rules:** keep client-supplied copy verbatim. Plain, matter-of-fact UK English. No stats unless sourced. Placeholders are labelled in uppercase inside the green image boxes.

## Open items
- All imagery is placeholder (portrait, lead images, previews).
- Placeholder/invented copy needing Georgia's sign-off: About story, career timeline dates, MSc, client quote, all resource and article copy, "note from Georgia", tick-list items.
- Sign-off needed on: Dawson & Reid comparison, rota rule thresholds, alertness curve (labelled illustrative).
- Nav items "Fatigue & Human Factors" and "How we work" link to `#` — pages not built yet.
- Homepage nav is missing About/Resources links (other pages have them) — add for consistency.
- Contact form backend, newsletter backend, real Calendly URLs, social links.
