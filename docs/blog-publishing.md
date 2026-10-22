# Blog publishing contract

The editorial source is the private [Samarinara/blog-posts](https://github.com/Samarinara/blog-posts) repository. Do not fetch its private Markdown at runtime.

## Current site

- `data/posts.ts` drives the writing mode of `app/page.tsx` through `components/writing-flip.tsx`.
- `app/writing/layout.tsx` supplies the shared article shell. Keep it unchanged unless explicitly required.
- Each public article is a Next.js route at `app/writing/<slug>/page.tsx`.
- Optional custom interactive components live under `components/articles/<slug>/`.
- `components/blog-preview.tsx` reads an unrelated AT Protocol source. Do not modify it as part of this pipeline.

## Generated article rules

The coding agent receives a copy of one approved Markdown draft in `.article-input.md`. Treat its prose as canonical: do not paraphrase, omit, reorder, or invent substantive material. Text under `<!-- INTERACTIVE ... -->` is a development specification, not public article text. Implement interactions accessibly, with reduced-motion preferences and mobile layouts. Use installed dependencies only; never add one without explicit approval.

Generate `app/writing/<slug>/page.tsx`, plus optional files under `components/articles/<slug>/`, and exactly one new or updated entry in `data/posts.ts`. Preserve the established Next.js/React/Tailwind/Framer Motion approach and existing pages. Export Next.js `metadata` using the draft title/description, and use the exact `publish_date` in the `<time>` element.

Run `pnpm typecheck`, `pnpm lint`, and `pnpm build` before opening a PR. Preview and merge remain human-controlled; the Wednesday action must never merge or deploy directly.

The editorial repository owns original Markdown, research and sources. This portfolio repository owns page presentation.
