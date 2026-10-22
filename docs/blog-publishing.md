# Blog publishing contract

The editorial source of truth is the private [Samarinara/blog-posts](https://github.com/Samarinara/blog-posts) repository. **ChatGPT Scheduled tasks**, with the connected GitHub app, perform daily editorial research and prepare article pull requests every second Wednesday. There is no external OpenAI API key, model-powered GitHub Actions workflow, GitHub PAT, or developer-side LLM billing requirement.

Do not fetch the private Markdown from the public website at runtime. The approved Markdown is the source input for a reviewable portfolio pull request.

## Current site

- `data/posts.ts` drives the writing mode of `app/page.tsx` through `components/writing-flip.tsx`.
- `app/writing/layout.tsx` supplies the shared article shell. Keep it unchanged unless explicitly required.
- Each public article is a Next.js route at `app/writing/<slug>/page.tsx`.
- Optional bespoke interactive components live under `components/articles/<slug>/`.
- `components/blog-preview.tsx` reads an unrelated AT Protocol source. Do not modify it as part of this pipeline.

## Generated article rules

The scheduled ChatGPT task reads **exactly one** approved Markdown draft directly from `Samarinara/blog-posts/drafts/<slug>.md` through the connected GitHub app. It must have `status: ready` and a `publish_date` matching the next biweekly Thursday, beginning 2026-11-05. Treat authored prose as canonical: do not paraphrase, omit, reorder, or invent substantive material. A draft's `<!-- INTERACTIVE ... -->` comments contain optional implementation specifications, not public article text.

Generate `app/writing/<slug>/page.tsx`, plus optional files under `components/articles/<slug>/`, and exactly one new or updated entry in `data/posts.ts`. Preserve the established Next.js/React/Tailwind/Framer Motion approach and existing pages. Export Next.js `metadata` using the draft title/description and use the exact `publish_date` in the `<time>` element. Implement accessible responsive interactions respectful of reduced motion. Use existing dependencies only.

Create or update a branch named `blog/YYYY-MM-DD-<slug>` and open a pull request. This repository's PR checks execute `pnpm typecheck`, `pnpm lint`, and `pnpm build`; Vercel should provide a preview. A scheduled ChatGPT task should not claim that it personally ran commands unless it had a code execution environment. Only merge after CI and preview checks pass. Human review and merging on Thursday are required; the Wednesday task never merges or publishes directly.

If the GitHub connection lacks permission or a task cannot create the article PR, report the blocker without claiming a commit or PR was created. The editorial repository owns research and original writing; this portfolio repository owns page presentation.
