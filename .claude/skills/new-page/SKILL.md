---
name: new-page
description: Add a new page to the site. Always asks which template to use first (standard page, article, or resource). Use when Georgia asks for "a new page", "a page about X" or "add a page".
---

# New page

**Always start by asking which template**, offering these in plain words:

1. **Standard page** (like About): an opening headline, then any mix of sections: reading-style text with a label in the margin, a timeline or list of rows, steps, a coloured quote band, a call to action.
2. **Article** (like the ones under Articles): long-form writing with contents list, pull quote and "in short" box. -> use the `/new-article` skill.
3. **Resource** (like the ones under Resources): a tool, template, guide, video or pack with facts, what's inside, how-to steps. -> use the `/new-resource` skill.
(A page with a form is like Contact; say so if that is what she wants.)

For a **standard page**, ask (briefly, in one message): the page title and what it should say (she can paste or attach the text), whether it should appear in the top navigation, and whether there are pictures.

Then build it:
1. Create `src/pages/<slug>.astro` (lowercase, hyphenated; becomes `/<slug>`). Model it on `src/pages/about.astro`: `BaseLayout` with a title, then `PageHero` and sections from the kit (`Section`, `SectionHeader`, `MarginSection`, `RuledList`/`RuledRow`, `StepGrid`/`Step`, `Button`). Read `docs/components.md` for the options. Keep long lists of content in an array in the front matter and map over it, like About does.
2. Put her words in verbatim. Don't invent text; where something is missing, ask or mark it `Placeholder:` so the check lists it.
3. If it belongs in the navigation, add it to `nav` in `src/data/site.ts` (the Contact item is the highlighted call to action; keep it last).
4. `npm run check`, then `/screenshots` for desktop and phone, look at them, fix anything off. Then offer `/preview`.
