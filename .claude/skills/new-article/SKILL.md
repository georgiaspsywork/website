---
name: new-article
description: Turn a Word document, Google Doc or pasted text into an article on the site. Use when Georgia says "here's a new article", shares a document, or asks to add or publish an article.
---

# New article

Articles are one MDX file each: `src/content/articles/<slug>.mdx` (front matter, then the text). The page, the entry in the Articles list, the topic filter and "read next" are all generated from it.

## 1. Get the text
- **Pasted text**: use as given.
- **Word file (.docx)** attached or in the session: `pandoc "<file>.docx" -t gfm --wrap=none --extract-media=/tmp/article-media -o /tmp/article.md`, then read `/tmp/article.md`. Embedded pictures are extracted to `/tmp/article-media`; handle them with `/add-image` if she wants them in.
- **Google Doc link**: if a Google Drive/Docs connector is available in this session, read it (or export it as .docx) the same way. If not, tell her: "I can't open Google Docs from here. Could you use File > Download > Microsoft Word and attach that?"
- Never alter her meaning. Keep her wording.

## 2. Work out the front matter (ask only for what you can't see in the document)
```
---
title: "Headline. Wrap *one emphasised word* in asterisks if she wants the italic word, as in the sample article."
dek: "One or two sentences that sum it up (shown in lists and under the headline)."
date: 2026-10-12            # today unless she says otherwise
topic: Fatigue              # Fatigue, Retention, Change or AI; a new topic is fine if she wants one
readMinutes: 7              # words / 200, rounded up
lead: false                 # true only if she wants it as the featured article (then set the old lead article to false)
---
```
- If the document has no standfirst/summary, ask her for one, or offer to use its first sentence(s) verbatim. Don't write one for her.
- Remove `placeholder: true` (that is only for stand-in pieces). Add `imageNote:` only when you keep the lead image placeholder.
- File name: short, lowercase, hyphenated, from the headline (`costing-turnover.mdx`). If an article with that name exists (a placeholder piece), replace its text rather than creating a duplicate.

## 3. Convert the body to MDX
- Leave the title (and the standfirst, which becomes `dek`) out of the body. Document headings -> `##` (second level) and `###`. Headings become the "In this article" contents list automatically.
- Paragraphs, **bold**, *italic*, links, bullet and numbered lists: plain Markdown. Numbered lists get the amber numbers automatically.
- A call-out she marks (e.g. "In short") -> `<Callout label="In short">text</Callout>`. A standout quotation -> `<PullQuote>"..."</PullQuote>`. A link to a resource -> `<ResourceLink href="/resources/<slug>" title="..." />`. Add the `import` lines for these components at the top of the body (see `rota-compliant-not-safe.mdx`). Don't add them if she didn't ask.
- Escape characters MDX would misread: a literal `{` or `<` in the text (write `\{` / `&lt;`).
- Pictures: don't leave huge images inline; use `/add-image` and `Photo`.

## 4. Check and show
`npm run check` (a broken build usually means an unescaped `{` or `<`). `/screenshots /articles/<slug> /articles`, look at them. Then offer `/preview`.
