---
name: publish
description: Publish the site live by merging `preview` into `main`, which deploys to the production site on Cloudflare Pages. Use only when the user explicitly says "publish".
disable-model-invocation: true
---

# Publish

Takes what is on `preview` live. This changes the public website, so confirm before the final step.

1. Run `git status`. Commit everything outstanding, then push `preview` (`git push -u origin preview`, retry up to 4 times with 2s/4s/8s/16s backoff on network errors).
2. Fetch `main` (`git fetch origin main`) and work out what will go live: `git log --oneline origin/main..preview` and `git diff --stat origin/main..preview`.
3. Show the user a short plain-English summary of that: pages and files changed, and anything that looks unfinished (placeholder copy, `href="#"` links, "placeholder" text, console errors).
4. **Stop and ask the user to confirm.** Only continue on a clear yes in this conversation.
5. Merge into main: `git checkout main`, `git pull origin main`, `git merge preview` (a normal merge, no force). If there are conflicts, stop and ask the user rather than choosing a side.
6. Push: `git push origin main`, then switch back to `preview` (`git checkout preview`).
7. Tell the user it is pushed and that Cloudflare Pages deploys `main` to the live site, usually within a minute or two. Name the commit.

Never force-push. Never publish without the confirmation in step 4.
