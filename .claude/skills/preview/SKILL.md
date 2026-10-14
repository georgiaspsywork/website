---
name: preview
description: Push the current work to the `preview` branch so Cloudflare Pages builds a preview deployment, and give Georgia the link. Use when she says "preview", "let me see it", "show me", "push it to preview".
---

# Preview

Gets the current work onto the preview site. Safe: it never touches `main` or the live site.

1. `npm run check`. If it prints ERRORS, fix them first (don't push a broken site). UNFINISHED CONTENT is not a blocker for a preview; mention it only if it relates to what she just asked for.
2. `git status`. Commit any uncommitted changes with a clear message (no empty commits). The commit message should describe the change in plain words.
3. Make sure `preview` contains the work: if you are on another branch, merge it into `preview` (`git checkout preview && git merge <branch>`), resolve conflicts, continue.
4. `git push -u origin preview` (on a network error retry up to 4 times: 2s, 4s, 8s, 16s apart).
5. Tell her it is pushed and name what is deploying, in plain words. Then give her the link:

   > Cloudflare is building this now (usually a minute or two). Go to https://preview.website-4ph.pages.dev/ and you'll see the changes live. If it still shows the old version, give it a moment and refresh.

   If the change was to one page, add that page's link too, e.g. https://preview.website-4ph.pages.dev/about. You can't see Cloudflare's build from here, so don't claim it has finished.
6. Ask her to have a look and say either what to change or "publish" when she is happy.

Do not create a pull request and do not push to `main`.
