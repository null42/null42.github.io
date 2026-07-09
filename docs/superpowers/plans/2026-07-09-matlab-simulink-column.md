# Matlab/Simulink Column Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a beginner-friendly Matlab/Simulink simulation tutorial column with explicit route and stage governance.

**Architecture:** Reuse the existing VitePress content registry. Add one top-level content folder with `column.config.json`, curated Markdown articles, homepage entry, and tests that verify column order and stage mapping.

**Tech Stack:** VitePress, TypeScript content scanner, Vitest, Markdown with KaTeX and Mermaid fixtures.

---

### Task 1: Lock The Column Contract

**Files:**
- Modify: `tests/kb/columns.test.ts`

- [ ] Add expectations that the registry contains `matlab-simulink`, the searchable section order includes it between `motor` and `blog`, and route/stage filters expose Matlab/Simulink stages.
- [ ] Run `npm.cmd test -- tests/kb/columns.test.ts` and confirm it fails because the column does not exist yet.

### Task 2: Add Governed Content

**Files:**
- Create: `content/matlab-simulink/column.config.json`
- Create: `content/matlab-simulink/README.md`
- Create: `content/matlab-simulink/foundation/MS-00-Simulation-Setup.md`
- Create: `content/matlab-simulink/matlab-discrete-control/MS-01-Matlab-Discrete-Control.md`
- Create: `content/matlab-simulink/simulink-discrete-control/MS-02-Simulink-Discrete-Control.md`
- Create: `content/matlab-simulink/custom-blocks/MS-03-Matlab-Function.md`
- Create: `content/matlab-simulink/custom-blocks/MS-04-S-Function.md`
- Create: `content/matlab-simulink/tuning-validation/MS-05-Parameter-Auto-Tuning.md`

- [ ] Add explicit routes and stages with `allowFlat: false`.
- [ ] Add curated Chinese beginner-oriented Markdown files with summaries, order fields, tables, formulas, Mermaid, and Matlab/C snippets where useful.
- [ ] Keep all public content emoji-free.

### Task 3: Add Entry Points

**Files:**
- Modify: `index.md`
- Modify: `tests/kb/navigation.test.ts`

- [ ] Add a homepage learning-map link to `/content/matlab-simulink/`.
- [ ] Add test coverage that the homepage exposes the Matlab/Simulink entry.

### Task 4: Verify And Publish Assets

**Commands:**
- `npm.cmd test`
- `npm.cmd run build`
- `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`

- [ ] Confirm tests pass.
- [ ] Confirm build cleans and regenerates `.vitepress/dist`.
- [ ] Confirm synced root assets contain no old content chunks.
- [ ] Browser-check homepage, article library, search page, Matlab/Simulink entry, one formula/table article, one Mermaid article, and mobile layout.
