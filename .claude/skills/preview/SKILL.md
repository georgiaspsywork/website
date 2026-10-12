---
name: preview
description: Push the current work to the `preview` branch so Cloudflare Pages builds a preview deployment. Use when the user says "preview the site" or "let me see it".
---

# Preview

Gets the current work onto Cloudflare's preview deployment. This is safe: it never touches `main` or the live site.

1. Run `git status`. Commit any uncommitted changes with a clear message (no empty commits).
2. Make sure `preview` contains the work:
   - If you are on `preview`, continue.
   - If you are on another branch, merge it into `preview` (`git checkout preview`, `git merge <branch>`), resolve any conflicts, then continue.
3. Push: `git push -u origin preview`. If it fails on a network error, retry up to 4 times (2s, 4s, 8s, 16s apart).
4. Tell the user the preview branch is pushed and that Cloudflare Pages will build it. Name the commit that is deploying. You can't see Cloudflare's preview URL from here, so say it will be in the Cloudflare Pages dashboard under Deployments for the `preview` branch.

Do not create a pull request and do not push to `main`.
