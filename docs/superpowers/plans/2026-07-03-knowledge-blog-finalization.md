# Knowledge Blog Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the existing `null42.github.io` knowledge blog so the published site uses the correct motor-control source, hides unfinished power drafts, presents a learning-map experience, keeps the comment fallback honest, and leaves no stale publish assets.

**Architecture:** Keep the current VitePress knowledge-base pipeline. Treat content policy, generated indexes, root publish assets, and browser-visible pages as separate acceptance surfaces, because a clean index alone does not prove the deployed root is clean.

**Tech Stack:** VitePress, Vue 3, TypeScript, fast-glob, Vitest, local generated JSON indexes, Giscus fallback link.

---

## Current Evidence Snapshot

- Repository state was re-audited with `git status --short` and `git diff --stat` on 2026-07-03. The worktree is intentionally large and dirty, with generated assets, migrated motor content, root HTML, and pipeline changes mixed together. Do not stage with `git add .`.
- `scripts/kb/migrate.ts` currently points motor migration at `E:\gitee_CodeStorage\学习\MotorControl-main\motor-control-knowledge-base`.
- `scripts/kb/migrate.ts` does not point at `motor-learning-web`.
- `scripts/kb/content-exclusions.ts` excludes `content/power/fundamentals-work/**`, `content/power/concepts/**`, `content/power/lessons/**`, `docs/handoff-*.md`, and `docs/superpowers/**`.
- `scripts/kb/path-defaults.ts` maps real motor chapters into learning groups and keeps `content/motor/simulation/**` as the real C simulation chapter.
- The current generated article index previously reported 362 articles: 318 motor, 41 power, 2 blog, 1 manual, with zero old-content hits. This must be rechecked after every build before claiming completion.
- `.vitepress/dist/assets` and root `assets` previously had zero old-content chunk hits. This must be rechecked after every sync before claiming completion.
- Browser acceptance was previously checked for the homepage, archive, motor entry, and an article comment fallback. It must be checked again after the next build and sync.

## Gap Analysis

### P0: Publish Policy Must Stay Clean

The most important requirements are mostly implemented, but they are brittle because the worktree contains generated output and deleted stale assets. Completion requires fresh evidence from tests, build, sync, index inspection, asset inspection, and browser checks in the same final pass.

Acceptance criteria:

- `scripts/kb/migrate.ts` contains `motor-control-knowledge-base`.
- `scripts/kb/migrate.ts`, `scripts/kb/import/inspect-source.ts`, and generated public content do not depend on `motor-learning-web`.
- `.vitepress/generated/articles.json` has zero paths under `content/power/fundamentals-work/`, `content/power/concepts/`, `content/power/lessons/`, and `content/motor/simulations/`.
- `.vitepress/generated/articles.json` may include `content/motor/simulation/`.
- `.vitepress/dist/assets` and root `assets` have zero filenames matching `content_power_fundamentals-work`, `content_power_concepts`, `content_power_lessons`, and `content_motor_simulations`.
- `npm.cmd test`, `npm.cmd run build`, and `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts` complete with exit code 0.

Verification commands:

```powershell
npm.cmd test
npm.cmd run build
node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts
node -e "const fs=require('fs'); const a=JSON.parse(fs.readFileSync('.vitepress/generated/articles.json','utf8')); const bad=a.filter(x=>/content\/power\/(fundamentals-work|concepts|lessons)\//.test(x.path)||/content\/motor\/simulations\//.test(x.path)); const sim=a.filter(x=>/content\/motor\/simulation\//.test(x.path)).length; console.log(JSON.stringify({total:a.length,bad:bad.length,motorSimulation:sim},null,2)); if(bad.length) process.exit(1)"
node -e "const fg=require('fast-glob'); const bad=/content_power_(fundamentals-work|concepts|lessons)|content_motor_simulations/; const files=fg.sync(['.vitepress/dist/assets/**/*','assets/**/*'],{onlyFiles:true}).filter(f=>bad.test(f.replace(/\\/g,'/'))); console.log(JSON.stringify({bad:files.length,files},null,2)); if(files.length) process.exit(1)"
```

### P1: Learning Map Experience Is Improved, But Not Complete

The homepage and `content/motor/getting-started.md` now contain learning-map cards, but the article archive still behaves like a filtered file listing. A fully compliant blog should make the learning paths visible inside the article library and make the section landing pages feel like curated maps.

Acceptance criteria:

- Homepage shows direct learning routes for motor, power, and article lookup.
- Motor entry explains the correct source and gives a staged route from overview to hardware, control theory, algorithms, simulation, and practice.
- Power entry explains what is public and what is intentionally excluded.
- Article library exposes compact learning-path shortcuts with counts so the user can browse by map, not only by raw filters.
- Mobile layout keeps filters and cards readable without text overlap.
- Dark mode keeps map cards, filter controls, and comment fallback readable.

Verification commands:

```powershell
npm.cmd test -- tests/kb/navigation.test.ts
npm.cmd run build
```

Browser acceptance:

- Open `/`.
- Open `/archive.html`.
- Open `/content/motor/getting-started.html`.
- Open one motor article page and confirm the comment fallback is visible when Giscus env vars are absent.
- Repeat a quick viewport check on a narrow mobile width.

### P1: Comment System Must Be Honest About Its State

The Giscus component is integrated, but formal comments require external GitHub setup. The site must not imply that Giscus is live when env vars are absent.

Acceptance criteria:

- `GiscusComments.vue` renders Giscus only when `VITE_GISCUS_REPO`, `VITE_GISCUS_REPO_ID`, `VITE_GISCUS_CATEGORY`, and `VITE_GISCUS_CATEGORY_ID` are available.
- Without env vars, article pages render a GitHub Issue fallback link.
- The fallback issue title and body include the article path.
- `docs/kb/comments.md` documents GitHub Discussions, Giscus App, and required env vars.

Verification commands:

```powershell
npm.cmd test -- tests/kb/navigation.test.ts
npm.cmd run build
```

Browser acceptance:

- On an article page, inspect the fallback link target and confirm the encoded page path is present.

### P2: Source Content Quality Needs A Focused Follow-Up

The migration appears complete by count, but the imported corpus contains Markdown, converted HTML, code snippets, images, and source assets. A complete product should not stop at "all files copied"; it should catch broken local links and obvious rendering hazards.

Acceptance criteria:

- Public generated articles contain no `file:///` links.
- Public generated articles contain no links to `motor-learning-web`.
- Public generated articles do not include old `content/motor/simulations/` routes.
- A future link checker should validate local Markdown links and image references across generated public articles.

Verification commands:

```powershell
rg -n "file:///|motor-learning-web|content/motor/simulations" content .vitepress/generated
```

### P2: Release Hygiene Needs Split Staging

The current diff is too large for a single blind stage. Before commit or deploy, changes should be grouped by intent.

Acceptance criteria:

- No `git add .`.
- Stage groups explicitly, for example pipeline/tests, source migration/content policy, generated site assets, and learning-map UX.
- Before any commit, rerun the P0 verification commands.

## Execution Tasks

### Task 1: Add Learning-Path Shortcuts To The Archive

**Files:**
- Modify: `.vitepress/theme/components/ArchivePage.vue`
- Modify: `.vitepress/theme/style.css`
- Test: `tests/kb/navigation.test.ts`

- [ ] Add computed learning-path summaries grouped by `section` and `navGroup`, using the already generated article metadata.
- [ ] Render compact path shortcut buttons above the filter bar. Each shortcut sets `section` and `navGroup`; "全部路径" resets both.
- [ ] Keep the existing select filters available for precise filtering.
- [ ] Add tests that assert the archive component exposes the learning-path label and uses generated `navGroup` metadata.
- [ ] Run `npm.cmd test -- tests/kb/navigation.test.ts`.

### Task 2: Strengthen Content Policy Checks

**Files:**
- Modify: `tests/kb/content-policy.test.ts`
- Test: `tests/kb/content-policy.test.ts`

- [ ] Add an assertion that generated articles include at least one `content/motor/simulation/` article.
- [ ] Add assertions that generated articles and asset filenames include zero old `content/motor/simulations/` hits.
- [ ] Add assertions that public generated articles include zero `file:///` and `motor-learning-web` references.
- [ ] Run `npm.cmd test -- tests/kb/content-policy.test.ts`.

### Task 3: Full Pipeline Verification

**Files:**
- Read: `.vitepress/generated/articles.json`
- Read: `.vitepress/dist/assets/**`
- Read: `assets/**`

- [ ] Run `npm.cmd test`.
- [ ] Run `npm.cmd run build`.
- [ ] Run `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`.
- [ ] Run the article-index old-content check from this plan.
- [ ] Run the dist/root asset old-chunk check from this plan.

### Task 4: Browser Acceptance

**Files:**
- Inspect rendered local site in the in-app browser.

- [ ] Start or reuse a local static server for the built site.
- [ ] Open the homepage and confirm learning-map routes are visible.
- [ ] Open `/archive.html` and confirm learning-path shortcuts plus existing filters are visible.
- [ ] Open `/content/motor/getting-started.html` and confirm it is a curated motor entry, not a raw folder list.
- [ ] Open one motor article page and confirm the fallback issue link includes the article path.
- [ ] Check a mobile viewport for homepage, archive, and comment fallback readability.

## Completion Rule

Do not claim the blog is complete until every P0 and P1 acceptance criterion above has fresh same-pass evidence. P2 source-quality and release-hygiene items may remain as explicit follow-up work only if P0 and P1 pass and the remaining work is documented honestly.
