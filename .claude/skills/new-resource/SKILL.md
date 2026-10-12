---
name: new-resource
description: Add a resource (tool, template, guide, video or pack) to the Resources library and give it a page. Use when Georgia wants to add or publish a resource, download, template or video.
---

# New resource

A resource is one Markdown file: `src/content/resources/<slug>.md`. The library card, type filter and the resource page are all generated from its front matter. Look at `rota-red-flags.md` (complete example) and `ai-and-workload.md` (placeholder example).

Ask for anything you can't see: what it is, the file or link people use (a download file goes in `public/files/<name>`; a video is a link), who it is for, how long it takes.

Front matter fields:
- Library card: `title`, `type` (Tool, Video, Template, Guide or Pack), `meta` (short detail: "10 min", "PDF · 8 pages"), `summary` (1-2 sentences), `audience` (completes "For ___"), `action` ("Use the tool", "Download", "Watch"), `order` (position in the library; renumber others if inserting), `parts` (2-3 only for multi-part packs, gives the stacked-card look).
- Page: `intro`, `buttons` (label + `href`; style `primary` or `outline`), `facts` (four label/value pairs: Type, Time needed, Format, Best for), `previewLabel` (placeholder preview box text, until there is a picture), `inside` (what's inside: title + body), `stepsTitle` + `steps` (stamp, title, body), `note` (a quote from Georgia and who), `related` (slugs of resources to suggest).
- `featured` (only one resource at a time) makes it the large block at the top of the Resources page. Remove it from the old one first.
- Remove `placeholder: true` once the text is hers. Keep it while text is stand-in.

Use her words exactly; leave optional fields out rather than inventing content (sections with no data simply don't show). Files she wants people to download go in `public/files/`; make sure they are reasonably small (PDFs under a few MB).

Then `npm run check`, `/screenshots /resources /resources/<slug>`, look, and offer `/preview`.
