# Astro Firefly Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the current VitePress knowledge blog to Astro using CuteLeaf Firefly while preserving content, search, rendering support, encrypted articles, and old-link compatibility.

**Architecture:** Use Firefly as the Astro application shell and add a content adapter that exports current `content/**/*.md` into Firefly-compatible `src/content/posts/**` files. Keep the migration staged with human confirmation gates before destructive cleanup, visual finalization, encrypted-content publication, and deployment.

**Tech Stack:** Astro, Firefly, TypeScript, pnpm, Pagefind, Svelte, Markdown/MDX-compatible content, existing `scripts/kb/*` utilities, Vitest.

---

## Automation Answer

This migration can be highly automated, but it should not be run as a fully automatic zero-confirmation migration.

Use automation for mechanical steps: fetching Firefly, merging dependencies, converting Markdown, copying assets, generating redirects, running tests, and building the site. Require confirmation for worktree safety, visual identity, content samples, encrypted content, and deployment behavior.

## Confirmation Checklist

### Phase 0: Migration Readiness

- [ ] Confirm the target is Astro + Firefly, not a custom Astro rebuild.
- [ ] Confirm the current `content/` directory remains the canonical source until migration is verified.
- [ ] Confirm VitePress can be removed only after Astro build and preview are accepted.
- [ ] Confirm generated VitePress output is not considered source.
- [ ] Confirm the migration will stop at the gates below rather than publishing unattended.

### Phase 1: Worktree Gate

- [ ] Run `git status --short`.
- [ ] Review existing uncommitted files:
  - `.vitepress/theme/Layout.vue`
  - `.vitepress/theme/kb-theme.ts`
  - `.vitepress/theme/style.css`
  - `index.md`
  - `.vitepress/theme/components/HomeVisualHero.vue`
  - `.vitepress/theme/components/LocalMusicPlayer.vue`
  - `.vitepress/theme/components/VisualModeToggle.vue`
  - `.vitepress/theme/daily-image.ts`
  - `.vitepress/theme/useVisualMode.ts`
  - `public/audio/`
  - `public/images/`
  - `tests/kb/visual-mode.test.ts`
- [ ] Decide whether to commit, stash, or intentionally carry those files into the migration branch.
- [ ] Create or switch to `codex/astro-firefly-migration`.
- [ ] Record the current VitePress baseline build command and result.
- [ ] Stop if the worktree contains unknown changes that the owner has not approved.

### Phase 2: Toolchain Gate

- [ ] Run `node --version` and confirm it is `>= 22`.
- [ ] Install or enable `pnpm >= 9`.
- [ ] Run `pnpm --version`.
- [ ] Decide that `pnpm-lock.yaml` will replace `package-lock.json` after dependency migration.
- [ ] Confirm CI/deploy environment can run `pnpm install` and `pnpm build`.

### Phase 3: Firefly Import

- [ ] Fetch `https://github.com/CuteLeaf/Firefly` into a temporary directory outside the working tree.
- [ ] Confirm Firefly default branch is `master`.
- [ ] Copy Firefly app files into the repository without overwriting content source:
  - `src/`
  - `astro.config.*`
  - Firefly config files under `src/config/`
  - required public assets
  - required Firefly scripts
- [ ] Preserve MIT license and attribution.
- [ ] Keep the import in a separate commit from content conversion.
- [ ] Run a minimal Firefly build before merging custom content if practical.

### Phase 4: Package and Script Merge

- [ ] Replace VitePress scripts with Astro scripts:
  - `dev`
  - `build`
  - `preview`
  - `astro`
  - `check`
- [ ] Keep useful existing scripts:
  - `kb:check`
  - `kb:generate`
  - `kb:encrypt`
  - `kb:publish`
  - `kb:deploy` if still relevant
- [ ] Add a content export script such as `content:generate`.
- [ ] Ensure `build` runs content export before `astro build`.
- [ ] Ensure Pagefind runs only after `astro build`.
- [ ] Run dependency install with `pnpm install`.

### Phase 5: Firefly Visual Configuration Gate

- [ ] Configure site name, description, author, language, and canonical URL.
- [ ] Configure nav items for home, archive, categories, tags, search, about, and major knowledge areas.
- [ ] Choose initial wallpaper mode:
  - banner;
  - fullscreen;
  - overlay;
  - none.
- [ ] Choose theme hue and dark/light default.
- [ ] Configure profile card, avatar, social links, RSS link, and footer.
- [ ] Decide whether to enable music in the first pass.
- [ ] Decide whether to enable comment integration in the first pass.
- [ ] Compare the first local home page against the desired reference-site feel.
- [ ] Stop for owner approval before full content conversion.

### Phase 6: Content Adapter

- [ ] Create a migration/export helper for current Markdown content.
- [ ] Read source files from `content/**/*.md`.
- [ ] Exclude private plaintext content.
- [ ] Exclude or specially route encrypted wrappers.
- [ ] Map frontmatter:
  - `title` to `title`;
  - `date` to `published`;
  - `updated` to `updated`;
  - `summary` to `description`;
  - `category` to `category`;
  - `tags` to `tags`;
  - `comments` to `comment`;
  - `visibility` to publish, draft, exclude, or encrypted handling.
- [ ] Preserve stable slugs for old URL compatibility.
- [ ] Copy article-local assets.
- [ ] Produce a conversion report with counts:
  - converted posts;
  - skipped private files;
  - encrypted files;
  - missing titles;
  - missing dates;
  - missing assets;
  - rewritten links.

### Phase 7: Content Sample Gate

- [ ] Convert a small sample before converting everything.
- [ ] Include at least one article with formulas.
- [ ] Include at least one article with Mermaid.
- [ ] Include at least one article with tables.
- [ ] Include at least one article with local images.
- [ ] Include at least one long technical article.
- [ ] Include at least one blog/daily article.
- [ ] Open sample pages locally.
- [ ] Confirm title, date, tags, category, image, code block, math, Mermaid, and table rendering.
- [ ] Stop and fix conversion issues before full bulk export.

### Phase 8: Markdown Compatibility

- [ ] Confirm KaTeX inline math renders.
- [ ] Confirm KaTeX display math renders.
- [ ] Confirm Mermaid fences render.
- [ ] Confirm VitePress containers render or are converted.
- [ ] Confirm tables do not break mobile layout.
- [ ] Confirm code blocks use a safe language fallback.
- [ ] Confirm local relative images resolve.
- [ ] Confirm safe inline HTML still renders.
- [ ] Confirm raw `<script>` remains blocked or reviewed.

### Phase 9: Full Content Export

- [ ] Run full content export.
- [ ] Review conversion report.
- [ ] Fix missing required metadata.
- [ ] Fix broken local assets.
- [ ] Fix broken internal links.
- [ ] Confirm public article count is plausible.
- [ ] Confirm excluded content count is plausible.
- [ ] Commit generated migration scripts separately from generated content if generated content is checked in.

### Phase 10: Search, Archive, Category, and Tag Checks

- [ ] Run Astro build with Pagefind.
- [ ] Open search page locally.
- [ ] Search for Chinese technical terms such as `电流环`, `SVPWM`, `PFC`, and `Mermaid`.
- [ ] Confirm search results link to valid pages.
- [ ] Open archive page.
- [ ] Open category page.
- [ ] Open tag page.
- [ ] Confirm hidden/private/encrypted plaintext is not indexed.

### Phase 11: Encrypted Content Gate

- [ ] Preserve current encryption payload format unless there is a specific reason to change it.
- [ ] Ensure encrypted JSON payloads copy into the Astro `dist/` tree.
- [ ] Ensure encrypted wrappers render a password UI.
- [ ] Test empty password state.
- [ ] Test wrong password state.
- [ ] Test correct password state.
- [ ] Search built output for known private plaintext phrases.
- [ ] Confirm encrypted plaintext does not appear in Pagefind index.
- [ ] Stop for owner approval before publishing encrypted content.

### Phase 12: Old URL Compatibility

- [ ] Generate an old-to-new URL manifest.
- [ ] Cover root routes:
  - `/index.html`;
  - `/archive.html`;
  - `/search.html`;
  - `/about.html`;
  - `/tools.html`.
- [ ] Cover content routes under `/content/**.html`.
- [ ] Generate static redirect pages for GitHub Pages compatibility.
- [ ] Sample at least 30 old URLs.
- [ ] Confirm sampled old URLs do not 404.
- [ ] Confirm redirects do not create loops.

### Phase 13: Test Suite Update

- [ ] Keep content model tests that still apply.
- [ ] Keep encryption leakage tests.
- [ ] Keep rendering normalization tests that are still needed.
- [ ] Rewrite VitePress-specific DOM tests for Astro/Firefly or remove them.
- [ ] Add tests for frontmatter mapping.
- [ ] Add tests for content exclusion.
- [ ] Add tests for old URL manifest generation.
- [ ] Add build smoke verification.
- [ ] Run `pnpm test` or the updated test command.

### Phase 14: Build and Preview Gate

- [ ] Run `pnpm build`.
- [ ] Confirm build exits successfully.
- [ ] Run `pnpm preview`.
- [ ] Open local preview.
- [ ] Verify desktop home page.
- [ ] Verify mobile home page.
- [ ] Verify desktop article page.
- [ ] Verify mobile article page.
- [ ] Verify archive page.
- [ ] Verify search page.
- [ ] Verify encrypted page.
- [ ] Verify old URL redirect sample.
- [ ] Stop for owner approval before deployment workflow changes.

### Phase 15: Deployment Update

- [ ] Update GitHub Pages or deployment workflow to use Astro.
- [ ] Set install command to `pnpm install`.
- [ ] Set build command to `pnpm build`.
- [ ] Set output directory to `dist`.
- [ ] Confirm `.nojekyll` handling.
- [ ] Ensure `.vitepress/dist` is no longer published.
- [ ] Ensure root-level old VitePress generated HTML files are not accidentally published as source.
- [ ] Confirm RSS and sitemap paths.
- [ ] Confirm canonical site URL.

### Phase 16: Cleanup Gate

- [ ] Decide whether to remove VitePress dependencies.
- [ ] Decide whether to remove `.vitepress/`.
- [ ] Decide whether to remove old generated root HTML.
- [ ] Decide whether to remove old `assets/` build output.
- [ ] Keep historical docs and migration scripts.
- [ ] Ensure `.gitignore` covers generated output.
- [ ] Run final tests and build.
- [ ] Stop for final owner approval before merging.

### Phase 17: Post-Publish Checks

- [ ] Open the production home page.
- [ ] Open production archive.
- [ ] Open production search.
- [ ] Open 20 random production articles.
- [ ] Open 10 old production links.
- [ ] Open encrypted production page.
- [ ] Confirm no obvious mobile layout break.
- [ ] Confirm analytics/comment/music third-party features do not block content.
- [ ] Record follow-up issues for visual polish or advanced filters.

## Go / No-Go Rule

Go only if all of these are true:

- worktree baseline is protected;
- Firefly visual baseline is approved;
- sample articles render correctly;
- full build succeeds;
- encrypted content has no known plaintext leakage;
- important old URLs resolve or redirect;
- deployment workflow is updated and reviewed.

No-go if any of these are true:

- unknown uncommitted files would be overwritten;
- private plaintext appears in generated output;
- most article images are broken;
- search indexes encrypted plaintext;
- old critical URLs 404 without an accepted redirect plan;
- Astro build cannot complete.
