# Firefly Mod V2.2.2 High-Fidelity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the four-level knowledge migration and deliver a V2.2.2-primary high-fidelity Astro site with safe visibility boundaries, a real local music player, static feature pages, and production visual verification.

**Architecture:** Keep `content/` as the only authored source, normalize every article into `sectionId → routeId → stageId → articleId`, and generate Astro/navigation/search artifacts from canonical records. Visual features use page-scoped abortable controllers; one global audio store survives Swup replacement. Service-backed features remain zero-network visual shells.

**Tech Stack:** Astro 7, TypeScript, Svelte, Swup, Vitest, Playwright, Pagefind, Lighthouse, local static assets.

---

### Task 1: Canonical ArticleRecord Mapping

**Files:**
- Modify: `scripts/kb/types.ts`
- Modify: `scripts/kb/domain/normalize-article.ts`
- Modify: `scripts/kb/articles.ts`
- Modify: `src/content.config.ts`
- Test: `tests/kb/article-normalization.test.ts`
- Test: `tests/kb/articles.test.ts`

- [ ] **Step 1: Write failing compatibility tests**

Add cases proving legacy `section`, `navGroup`, `chapter`, and `stage` input maps once into canonical IDs, canonical input remains unchanged, and scanner output exposes no legacy properties.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/article-normalization.test.ts tests/kb/articles.test.ts`

- [ ] **Step 3: Implement the canonical boundary**

Make `ArticleRecord` require `sectionId`, `routeId`, `stageId`, and `articleId`; keep legacy aliases only in normalizer input; make Astro schema and exporter consume canonical fields.

- [ ] **Step 4: Run GREEN**

Run the same command and assert generated records contain only canonical hierarchy fields.

### Task 2: Visibility Matrix and Leak Scans

**Files:**
- Modify: `scripts/kb/domain/normalize-article.ts`
- Modify: `scripts/astro/export-content.ts`
- Modify: `scripts/security/scan-generated-output.ts`
- Modify: `src/pages/posts/[...slug].astro`
- Test: `tests/kb/content-policy.test.ts`
- Test: `tests/security/generated-output.test.ts`
- Test: `tests/routes/sitemap-boundary.test.ts`

- [ ] **Step 1: Write failing matrix tests**

Cover public page output, placeholder output, generated Markdown, Pagefind, Sitemap, JSON-LD, summaries, attachments, and encrypted payload publication for `public/private/hidden/encrypted`.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/content-policy.test.ts tests/security/generated-output.test.ts tests/routes/sitemap-boundary.test.ts`

- [ ] **Step 3: Implement one visibility decision function**

Return explicit decisions for every public surface and make exporters/routes consume it instead of duplicating conditions.

- [ ] **Step 4: Run GREEN**

Run the same tests and confirm no protected plaintext or metadata leak.

### Task 3: Content and Attachment Baseline

**Files:**
- Modify: `scripts/migration/generate-baseline.ts`
- Modify: `scripts/migration/generate-content-comparison.ts`
- Modify: `scripts/migration/verify-built-site.ts`
- Modify: `reports/migration-baseline.json`
- Modify: `reports/migration-content-comparison.json`
- Test: `tests/migration/content-comparison-report.test.ts`
- Test: `tests/migration/built-site.test.ts`

- [ ] **Step 1: Write failing full-tree comparisons**

Assert canonical ID set, article count, attachment set, protected fingerprints, redirects, and built route set match the approved baseline and allowlist.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/migration/content-comparison-report.test.ts tests/migration/built-site.test.ts`

- [ ] **Step 3: Extend deterministic evidence**

Record sorted IDs, byte sizes, hashes, visibility decisions, and allowlist expectation IDs.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd run migration:baseline:check`
Run: `npm.cmd run migration:comparison:check`

### Task 4: NavigationTreeBuilder and Coverage

**Files:**
- Modify: `scripts/kb/navigation/build-navigation.ts`
- Modify: `scripts/kb/navigation/validate-coverage.ts`
- Modify: `src/utils/navigation-tree.ts`
- Modify: `reports/knowledge-navigation-coverage.json`
- Test: `tests/kb/navigation-tree.test.ts`
- Test: `tests/kb/navigation-generation.test.ts`

- [ ] **Step 1: Write failing coverage tests**

Require every public knowledge article exactly once under four levels, encrypted entries as title-only placeholders, and private/hidden entries excluded.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/navigation-tree.test.ts tests/kb/navigation-generation.test.ts`

- [ ] **Step 3: Implement deterministic generation**

Sort each level by configured order then ID and reject duplicate or orphan identifiers.

- [ ] **Step 4: Run GREEN**

Run the same tests plus `npm.cmd run knowledge:coverage`.

### Task 5: Cascading List Filters

**Files:**
- Modify: `src/pages/list.astro`
- Modify: `src/utils/article-index.ts`
- Modify: `src/utils/article-index-controller.ts`
- Modify: `src/components/pages/ArticleVirtualList.svelte`
- Test: `tests/ui/article-index.test.ts`
- Test: `tests/e2e/article-index-swup.production.spec.ts`

- [ ] **Step 1: Write failing cascade tests**

Cover section→route→stage constraints, query restoration, reset, keyboard operation, no-JS links, and repeated Swup entry/exit.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/article-index.test.ts`

- [ ] **Step 3: Implement canonical cascade state**

Use only canonical IDs in filters and URLs; preserve native controls and complete fallback links.

- [ ] **Step 4: Run GREEN**

Run the unit test and `npm.cmd run test:e2e -- --workers=1 tests/e2e/article-index-swup.production.spec.ts`.

### Task 6: KnowledgeTree and Reading Layout

**Files:**
- Modify: `src/components/knowledge/KnowledgeTree.svelte`
- Modify: `src/components/knowledge/KnowledgeDrawer.svelte`
- Modify: `src/layouts/MainGridLayout.astro`
- Modify: `src/pages/knowledge.astro`
- Modify: `src/pages/posts/[...slug].astro`
- Test: `tests/ui/knowledge-tree.test.ts`
- Test: `tests/ui/knowledge-drawer.test.ts`
- Test: `tests/ui/knowledge-article-layout.test.ts`

- [ ] **Step 1: Write failing tree/layout tests**

Assert desktop three columns, current-node expansion, four-level keyboard traversal, encrypted placeholders, mobile drawer focus trap, and Swup cleanup.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/knowledge-tree.test.ts tests/ui/knowledge-drawer.test.ts tests/ui/knowledge-article-layout.test.ts`

- [ ] **Step 3: Implement shared tree rendering**

Render `/knowledge/`, article sidebar, and mobile drawer from the same generated tree while keeping public links in server HTML.

- [ ] **Step 4: Run GREEN**

Run the same tests and knowledge/article production E2E.

### Task 7: Loader and V2.2.2 Home Story

**Files:**
- Create: `src/components/features/PageLoader.astro`
- Create: `src/utils/page-loader-controller.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/layout/HomeHero.astro`
- Modify: `src/components/layout/HomeDataLayer.astro`
- Modify: `src/components/layout/HomeDisplayLayer.astro`
- Create: `src/components/layout/HomePortfolioShutterLayer.astro`
- Modify: `src/config/homeConfig.ts`
- Test: `tests/ui/page-loader.test.ts`
- Test: `tests/ui/home-interaction.test.ts`
- Test: `tests/e2e/home.production.spec.ts`

- [ ] **Step 1: Write failing loader/home tests**

Cover first-load visibility, max-wait release, short Swup transition, Back/Auto/Hide/typewriter/click-to-continue, section order, reduced motion, mobile flow, and disposal.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/page-loader.test.ts tests/ui/home-interaction.test.ts`

- [ ] **Step 3: Implement V2.2.2-primary composition**

Reuse only audited assets, replace upstream identity, keep copy in `homeConfig`, and use abortable page-scoped controllers.

- [ ] **Step 4: Run GREEN and capture screenshots**

Run home production E2E and save desktop/mobile captures under `reports/visual-baseline/<date>/`.

### Task 8: Real Local Music Player

**Files:**
- Modify: `src/components/features/MusicManager.astro`
- Modify: `src/components/features/MusicPlayer.astro`
- Create: `src/pages/music.astro`
- Create: `src/utils/music-player-store.ts`
- Modify: `src/config/musicConfig.ts`
- Add: `public/assets/music/*`
- Test: `tests/ui/music-player.test.ts`
- Test: `tests/e2e/music-player.production.spec.ts`

- [ ] **Step 1: Write failing player tests**

Cover local-only sources, user-gesture start, transport, seek, volume, mute, loop modes, playlist, lyrics fallback, mini-player sync, and uninterrupted Swup navigation.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/music-player.test.ts`

- [ ] **Step 3: Implement one persistent audio store**

Create one global `HTMLAudioElement`; page and mini controls subscribe while Swup disposes only view subscriptions.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd run test:e2e -- --workers=1 tests/e2e/music-player.production.spec.ts`

### Task 9: Static Pages and Visual Shells

**Files:**
- Create: `src/pages/gallery/index.astro`
- Create: `src/pages/gallery/[album].astro`
- Create: `src/pages/calendar.astro`
- Create: `src/pages/friends.astro`
- Modify: `src/pages/guestbook.astro`
- Create: `src/pages/sponsor.astro`
- Create: `src/pages/ai.astro`
- Test: `tests/ui/static-feature-pages.test.ts`
- Test: `tests/e2e/static-feature-pages.production.spec.ts`

- [ ] **Step 1: Write failing static/zero-network tests**

Require local gallery albums, calendar navigation, friend cards, offline anime/bangumi data, and “功能暂未开放” shells for AI, sponsor, and dynamic guestbook.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/static-feature-pages.test.ts`

- [ ] **Step 3: Implement pages from audited V2.2.2 structures**

Use local configuration, disable service actions without faking success, and provide safe alternative links.

- [ ] **Step 4: Run GREEN**

Run static feature production E2E and assert zero forbidden requests.

### Task 10: Encrypted Markdown Parity

**Files:**
- Modify: `scripts/kb/encrypt/render-markdown.ts`
- Modify: `src/components/features/EncryptedPayload.astro`
- Test: `tests/kb/encryption.test.ts`
- Test: `tests/e2e/quality.production.spec.ts`

- [ ] **Step 1: Write failing parity tests**

Use one fixture containing headings, code, KaTeX, Mermaid, PlantUML, image grids, external links, mail protection, and GitHub cards; assert dangerous HTML is absent.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/encryption.test.ts`

- [ ] **Step 3: Use shared Markdown plugins**

Keep executable enhancements outside sanitized payload HTML and initialize them after local decryption with an abortable lifecycle.

- [ ] **Step 4: Run GREEN**

Run encryption unit tests and encrypted article production E2E.

### Task 11: URL, Search, Sitemap, and Assets

**Files:**
- Modify: `scripts/routes/build-route-manifest.ts`
- Modify: `scripts/migration/verify-built-site.ts`
- Modify: `scripts/security/scan-generated-output.ts`
- Test: `tests/e2e/legacy-url.production.spec.ts`
- Test: `tests/e2e/search.production.spec.ts`
- Test: `tests/routes/sitemap-boundary.test.ts`
- Test: `tests/migration/built-site.test.ts`

- [ ] **Step 1: Write failing final-route tests**

Cover old redirects and anchors, canonical URLs, Pagefind terms, Sitemap exclusions, music/gallery assets, and broken attachment detection.

- [ ] **Step 2: Run RED**

Run the four named test files.

- [ ] **Step 3: Correct generated manifests**

Generate route/search artifacts from canonical public decisions and fail on missing or leaked files.

- [ ] **Step 4: Run GREEN**

Run `npm.cmd run routes:verify` and production legacy/search E2E.

### Task 12: Final Quality and Release Gate

**Files:**
- Modify: `reports/production-quality.json`
- Add: `reports/visual-baseline/<date>/*.png`
- Update: `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md`

- [ ] **Step 1: Run all gates**

Run: `npm.cmd run quality:full`
Run: `npm.cmd run test:e2e -- --workers=1`
Run: `npm.cmd run quality:lighthouse`
Run: `git diff --check`

- [ ] **Step 2: Run final specification review**

Require Critical = 0 and Important = 0 against the migration and visual specifications.

- [ ] **Step 3: Run final code-quality review**

Review lifecycle disposal, visibility, zero-network policy, licensing, fallbacks, and screenshots. Require Critical = 0 and Important = 0.

- [ ] **Step 4: Produce same-SHA preview and rollback evidence**

Record branch, HEAD SHA, reports, route manifest, screenshots, preview artifact SHA, previous stable SHA, and rollback procedure.

- [ ] **Step 5: Stop at Stage 8 approval**

Do not update `main`, publish, force push, or merge until the user explicitly approves the final preview.

## Self-Review

- Spec coverage: canonical data, visibility, baseline, navigation, filters, knowledge UI, V2.2.2 home, loader, player, static pages, encrypted parity, URLs/search/assets, quality, preview, rollback, and manual release are mapped.
- Placeholder scan: no TBD/TODO or unspecified implementation step remains.
- Type consistency: downstream tasks consume only `sectionId`, `routeId`, `stageId`, and `articleId`; visual work introduces no alternate content model.
