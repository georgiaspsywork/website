# Georgia's PsyWork website

Static website for Georgia's PsyWork Ltd. Plain HTML, CSS and JavaScript: no framework, no build step.

## Layout
- `public/` is the whole website. Cloudflare Pages serves this folder and nothing else.
  - `*.html` pages, `css/styles.css`, `js/site.js`, `fonts/`.
- `_templates/` holds the original design exports. Reference only, never served, not kept in sync.
- `README.md` has the page list, design rules and editing notes. Read it before changing design or copy.

## Deployment (Cloudflare Pages, via Git)
- Pushing the `preview` branch gives a preview deployment at https://preview.website-4ph.pages.dev/. Pushing `main` deploys the live site.
- There is no build command. The output directory is `public`.

## Workflow words
- "preview" means run the `/preview` skill (`.claude/skills/preview/SKILL.md`).
- "publish" means run the `/publish` skill (`.claude/skills/publish/SKILL.md`).
- Never push to `main` unless the user has asked to publish and has confirmed the summary of what will go live.

## Conventions
- Keep client-supplied copy verbatim. Plain, matter-of-fact UK English.
- Edit `public/` directly. Don't reintroduce a bundler or inline `<style>`/`<script>` blocks in pages.
- Check changes at desktop (1280px) and mobile (390px) widths before saying they're done.
