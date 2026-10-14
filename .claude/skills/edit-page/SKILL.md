---
name: edit-page
description: Change something on an existing page (wording, a heading, a link, a button, a picture, contact details, navigation) from a request like "change the header on this page", usually with a link and/or screenshot. Use for any edit to the live pages or settings that is not a brand-new page, article or resource.
---

# Edit a page

Georgia describes the change in plain English, often with a URL and a screenshot of the old version and the new words. You make it.

1. **Find the source.** Map the URL:
   - `/` -> `src/pages/index.astro`; `/about`, `/contact`, `/articles`, `/resources` -> the same-named file in `src/pages/`.
   - `/articles/<slug>` -> `src/content/articles/<slug>.mdx` (headline, standfirst, topic, date are in the front matter at the top; the text is below it).
   - `/resources/<slug>` -> `src/content/resources/<slug>.md` (the rota builder page's words are in `rota-builder.md`; its layout is `src/pages/resources/rota-builder.astro`).
   - Header navigation, footer links, email, phone, location, social links -> `src/data/site.ts`. Footer headline/button on one page -> the `footer` prop of `BaseLayout` in that page (or the resource layout).
   - If she only gives a screenshot, search the repo for a distinctive phrase from it (`grep -rn "phrase" src`). Text is often inside an array in the page's front matter, so search before you assume.
2. **Make the smallest change** that does what she asked. Use her wording exactly. Don't touch other text. Keep the surrounding structure and components. For a heading, an `<em>` or `*word*` marks the italic emphasis word; keep it unless she says otherwise.
3. If the request needs something the kit doesn't do (a new kind of section), read `docs/components.md` and compose from existing components; if it really needs a new look, tell her what you propose and ask.
4. **Check**: `npm run check` (fix ERRORS). Take screenshots of the changed page at desktop and phone width with `/screenshots` and look at them yourself: nothing broken, no sideways scrolling, text not cut off.
5. Tell her what changed in terms of what she sees. Offer to show screenshots or go straight to `/preview`.

Never invent wording for her. If she says "make it better" or "something punchier", propose 2-3 options and let her choose.
Links between pages use clean URLs like `/about`. A link that should go somewhere you don't know yet: ask; don't leave `href="#"` silently.
