# Astro + Firefly Migration Design

## Conclusion

This migration should not be treated as a zero-confirmation, fully automatic replacement.

It can be highly automated: dependency setup, Firefly import, content conversion, frontmatter mapping, asset copying, redirect generation, build checks, and many regression checks can be scripted. However, the current repository has a dirty worktree, a large existing VitePress knowledge-base pipeline, generated output mixed with source files, encrypted article handling, and visual choices that need owner approval. For that reason, the correct execution model is:

> automated migration with explicit confirmation gates.

The automation can do most of the mechanical work. A human should confirm the branch baseline, visual identity, content samples, encrypted-content behavior, and final deployment shape.

## Current Project Facts

- The current site is built with VitePress, Vue, npm, and custom `scripts/kb/*` tooling.
- The repository contains a large Markdown knowledge base under `content/`.
- The project includes generated files such as root-level HTML, `assets/`, and `.vitepress/dist`.
- The project has custom behavior for search, columns, publish manifests, comments, Mermaid, KaTeX, visual mode, local music, and encrypted articles.
- The current worktree contains uncommitted VitePress theme changes that must not be overwritten.
- Local Node is new enough for Firefly, but `pnpm` is not currently installed.

## Target

Migrate the site to Astro using CuteLeaf Firefly as the main application shell and theme, with a visual direction close to `https://tblog.mmzhiku.xyz/`.

The target site should keep:

- public Markdown articles;
- article metadata;
- tags and categories;
- archive pages;
- search;
- comments or a clear comment configuration path;
- local images and SVGs;
- Mermaid diagrams;
- KaTeX math;
- encrypted article wrappers and payloads;
- old URL compatibility where practical;
- deployability as a static site.

## Non-Goals

- Do not rewrite all articles manually.
- Do not rebuild a custom Astro theme from scratch.
- Do not preserve VitePress DOM structure or CSS classes as a compatibility contract.
- Do not publish private plaintext.
- Do not publish both old VitePress output and new Astro output as equal sources.
- Do not promise pixel-perfect parity with the reference site on the first pass.

## Automation Decision

### Safe To Automate

- Create a migration branch after confirming the worktree state.
- Install or enable `pnpm`.
- Fetch Firefly into a temporary directory.
- Copy Firefly application files into the repository.
- Merge `package.json` scripts and dependencies.
- Generate `pnpm-lock.yaml`.
- Generate migrated posts from `content/**/*.md`.
- Map frontmatter from the current content model to Firefly frontmatter.
- Copy local post assets.
- Generate redirect or compatibility pages for old URLs.
- Run content checks, tests, build, and preview.
- Produce reports for broken links, missing images, skipped files, and excluded private content.

### Requires Confirmation

- Whether to commit or stash the current uncommitted VitePress visual-mode work.
- Which Firefly visual mode to use first: banner, fullscreen wallpaper, overlay, or pure background.
- Which profile, avatar, wallpaper, music, comment, and social-link assets to publish.
- Whether to keep all current columns visible in the first migration pass.
- Whether old generated HTML files should be deleted, ignored, or preserved temporarily.
- Whether encrypted article UX is acceptable after migration.
- Whether final deployment should remain GitHub Pages with static redirects.

## Recommended Architecture

Use Firefly as the Astro app shell. Keep the current knowledge-base content as the canonical source until the migration proves stable.

```text
content/                         canonical current Markdown source
scripts/kb/                      reusable content, metadata, encryption tooling
scripts/astro/                   new migration/export helpers
src/                             Firefly Astro application
src/content/posts/               generated or migrated Astro posts
src/components/kb/               migrated custom components if needed
public/                          shared static assets
dist/                            Astro build output
```

The first implementation should prefer a generated-content approach:

1. Read current Markdown from `content/`.
2. Normalize metadata and syntax.
3. Write Astro-compatible Markdown into `src/content/posts/`.
4. Copy assets next to the generated posts or into `public/`.
5. Let Firefly render, index, and present the generated content.

This keeps the original content reversible and lets the migration script be improved without manually editing hundreds of files.

## Frontmatter Mapping

Current field | Firefly field | Rule
--- | --- | ---
`title` | `title` | Keep existing value.
`date` | `published` | Keep date; fallback to file modified date if missing.
`updated` | `updated` | Keep if present.
`summary` | `description` | Keep existing summary.
`category` | `category` | Keep existing value; fallback to column title.
`tags` | `tags` | Keep existing list; fallback to column defaults.
`comments` | `comment` | Preserve boolean behavior.
`visibility: public` | `draft: false` | Publish.
`visibility: hidden` | `draft: true` or exclude | Decide per column.
`visibility: private` | exclude | Never publish.
`visibility: encrypted` | encrypted flow | Do not treat as normal post.

## Markdown Compatibility

The migration should preserve or translate:

- standard Markdown;
- GitHub-flavored tables;
- code fences;
- VitePress containers: `::: tip`, `::: warning`, `::: danger`, `::: details`;
- Mermaid fences;
- KaTeX inline and display math;
- local relative images;
- safe inline HTML already used in existing content.

Raw `<script>` in content should remain blocked or require explicit review.

## Encrypted Content

Encrypted content is not a normal blog-post migration. The encrypted payload JSON can be published, but plaintext must not appear in generated Markdown, search indexes, RSS, or built HTML.

Required checks:

- encrypted wrappers render a password input;
- encrypted payloads copy to `dist/content/encrypted/`;
- public search does not index encrypted plaintext;
- generated output does not contain known private phrases;
- wrong-password and correct-password states are manually verified.

## URL Compatibility

The old VitePress site exposes `.html` URLs. Firefly/Astro will normally prefer directory-style routes. The migration should generate a compatibility manifest and static redirect pages for important old URLs.

Priority routes:

- `/index.html`;
- `/archive.html`;
- `/search.html`;
- `/about.html`;
- `/tools.html`;
- `/content/**.html`;
- encrypted article wrapper URLs.

For GitHub Pages, use static HTML redirect pages or duplicate route generation. Do not depend on server-level redirect rules.

## Confirmation Gates

Gate | Required confirmation | Why
--- | --- | ---
Gate 1: Worktree | Commit/stash/accept current uncommitted files | Prevents overwriting unrelated user work.
Gate 2: Theme baseline | Approve Firefly visual mode and identity assets | Visual choices are subjective and public-facing.
Gate 3: Content sample | Approve migrated sample articles | Hundreds of articles make silent bulk conversion risky.
Gate 4: Encrypted articles | Approve encrypted UX and no-leak report | Privacy/security risk.
Gate 5: Deployment | Approve build output and old URL behavior | Prevents shipping broken public links.

## Acceptance Criteria

- `pnpm install` succeeds.
- `pnpm dev` starts Astro locally.
- `pnpm build` succeeds.
- `pnpm preview` serves the built site.
- Home page uses Firefly visual language.
- Public articles render with correct title, date, category, tags, images, code, math, and Mermaid where applicable.
- Search works for Chinese content.
- Archive, category, tag, and article routes work.
- Encrypted plaintext is absent from generated public output.
- Important old URLs either resolve or redirect.
- Deployment workflow is updated for Astro.

## Final Recommendation

Proceed with automation, but not as a single unchecked "convert everything and publish" action.

The safest path is a staged migration:

1. automate setup and a small content sample;
2. review visuals and article rendering;
3. automate full content export;
4. review encrypted content and old URLs;
5. automate final build and deployment update.

This gives the speed benefit of automation without pretending that visual identity, privacy, and public URL behavior are purely mechanical.
