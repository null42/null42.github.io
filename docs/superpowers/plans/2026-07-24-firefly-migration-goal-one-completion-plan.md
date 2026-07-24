# Firefly Mod Goal One Completion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining V2.2.2-primary migration work and release the Firefly Mod knowledge blog through same-SHA preview, manual approval, GitHub Pages deployment, and online verification.

**Architecture:** Keep the existing migration and high-fidelity plans as the implementation source of truth. This plan is a remaining-work index: it closes Task 7 without reopening completed phases, executes canonical Tasks 8–12, then adds the approval-bound release sequence required by the approved goal split.

**Tech Stack:** Astro, TypeScript, Vitest, Playwright, Swup, Pagefind, GitHub Actions, GitHub Pages.

---

## Authority and Scope

- Goal scope: `docs/superpowers/specs/2026-07-24-firefly-migration-goal-decomposition-design.md`
- Migration design: `docs/superpowers/specs/2026-07-11-firefly-mod-knowledge-migration-design.md`
- Migration plan: `docs/superpowers/plans/2026-07-11-firefly-mod-knowledge-migration-automation-plan.md`
- Visual design: `docs/superpowers/specs/2026-07-19-firefly-mod-v22-high-fidelity-visual-design.md`
- Canonical implementation tasks: `docs/superpowers/plans/2026-07-19-firefly-mod-v22-high-fidelity-implementation-plan.md`
- Goal 2 TXT/EPUB work is excluded until Goal 1 is released and verified.

### Task 1: Close Task 7 Reduced Motion

**Files:**
- Modify: `tests/ui/home-contract.test.ts`
- Modify: `tests/e2e/home.production.spec.ts`
- Modify: `src/styles/home.css`

- [ ] **Step 1: Write the failing contract test**

Assert that the reduced-motion block disables animation names and durations only on animated selectors and does not apply `transform: none !important` to all descendants of `.home-page`.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/home-contract.test.ts`

Expected: FAIL because the current global reduced-motion rule removes layout transforms.

- [ ] **Step 3: Implement the minimal selector-scoped rule**

Remove the global descendant transform reset. Preserve positioning transforms such as `.home-hero__floating-dock { transform: translateY(-50%); }`, while disabling animation-driven transforms on the animated hero, decorative, shutter, and reveal elements.

- [ ] **Step 4: Run GREEN and production verification**

Run: `npm.cmd test -- tests/ui/home-contract.test.ts`

Run: `npm.cmd run test:e2e:home -- --workers=1 --reporter=line`

Expected: all home contract and reduced-motion viewport cases pass.

### Task 2: Distinguish Loader Modes

**Files:**
- Modify: `tests/ui/page-loader.test.ts`
- Modify: `src/components/features/PageLoader.astro`
- Modify: `src/utils/page-loader-controller.ts`

- [ ] **Step 1: Write failing mode tests**

Assert that the initial load waits for critical readiness within the maximum timeout, while a Swup transition uses a shorter minimum display and does not wait for the full initial-load readiness path.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/page-loader.test.ts`

Expected: FAIL until initial and transition timing are observably different.

- [ ] **Step 3: Implement explicit initial and transition paths**

Keep one controller instance, token-cancel stale async work, use the project's existing Swup hooks, and expose mode-specific CSS variables or data attributes without adding a second loader lifecycle.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/ui/page-loader.test.ts`

Expected: all loader lifecycle, timeout, and Swup mode tests pass.

### Task 3: Finish Task 7 Evidence and Review

**Files:**
- Modify: `src/styles/home.css`
- Modify: `reports/firefly-mod-visual-asset-provenance.json`
- Modify: `tests/ui/home-contract.test.ts`
- Add: `reports/visual-baseline/2026-07-24-v22-home/*.png`
- Remove: `env/capture-v22-home.mjs`

- [ ] **Step 1: Add failing provenance checks**

Assert that every reused target asset exists, matches the recorded SHA-256, names its pinned source commit, records its license traceability, and records transformations for optimized derivatives.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/home-contract.test.ts`

- [ ] **Step 3: Clean stale HUD CSS and complete provenance**

Delete unused viewfinder, camera-parameter, focus-frame, rain, and duplicate shutter rules. Do not alter current layout behavior. Update provenance only for audited V2.2.2-primary and V2.5.0-secondary assets.

- [ ] **Step 4: Capture complete scroll evidence**

Stop any stale process on port 4321, run the production preview, and capture desktop, tablet, and mobile images for loader, hero, data layer, display layer, portfolio shutter, feature entry, and latest-content states.

- [ ] **Step 5: Run Task 7 gates**

Run: `npm.cmd test -- tests/ui/home-contract.test.ts tests/ui/home-interaction.test.ts tests/ui/page-loader.test.ts`

Run: `npm.cmd run check`

Run: `npm.cmd run build`

Run: `npm.cmd run test:e2e:home -- --workers=4 --reporter=line`

Run: `git diff --check`

- [ ] **Step 6: Review Task 7**

Run a specification review and a code-quality review. Continue fixing with RED→GREEN until both report `Critical = 0` and `Important = 0`.

### Task 4: Execute Canonical Tasks 8–12

**Files:**
- Follow exactly: `docs/superpowers/plans/2026-07-19-firefly-mod-v22-high-fidelity-implementation-plan.md:206`

- [ ] **Step 1: Implement Task 8 real local player**

Use the canonical Task 8 file list and RED→GREEN sequence. Require local-only media, one persistent audio store, page/mini-player synchronization, and Swup-safe subscriptions.

- [ ] **Step 2: Implement Task 9 static feature pages**

Use the canonical Task 9 file list and RED→GREEN sequence. Preserve real local static features and mark unavailable service-backed operations as “功能暂未开放”.

- [ ] **Step 3: Implement Task 10 encrypted Markdown parity**

Use the canonical Task 10 file list and RED→GREEN sequence. Reuse the normal article Markdown capability while keeping decrypted content local and sanitized.

- [ ] **Step 4: Implement Task 11 final regressions**

Use the canonical Task 11 file list and RED→GREEN sequence for URLs, Pagefind, Sitemap, attachments, route manifests, and generated-output leakage.

- [ ] **Step 5: Execute Task 12 pre-release gates**

Run the canonical full quality, E2E, Lighthouse, visual, security, specification-review, and code-quality gates. Require `Critical = 0` and `Important = 0`.

### Task 5: Produce Same-SHA Approval Artifact

**Files:**
- Modify: `reports/production-quality.json`
- Modify: `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md`
- Add: `reports/visual-baseline/2026-07-24-release/*.png`

- [ ] **Step 1: Create focused migration commits**

Commit completed work on `codex/firefly-mod-knowledge-migration` without force-pushing and without updating `main`.

- [ ] **Step 2: Verify remote state before first push**

Run: `git fetch --all --prune`

Run: `git branch -vv`

Run: `git ls-remote --heads origin codex/firefly-mod-knowledge-migration`

Expected: the local and remote relationship is understood before normal push.

- [ ] **Step 3: Push the migration branch normally**

Run: `git push -u origin codex/firefly-mod-knowledge-migration`

- [ ] **Step 4: Verify same-SHA CI and artifact**

Record local HEAD, remote branch SHA, workflow run SHA, artifact SHA, production preview SHA, quality reports, and release screenshots. All SHA values must refer to the same reviewed commit.

- [ ] **Step 5: Stop at the Stage 8 user gate**

Present the same-SHA preview and evidence to the user. Do not merge, update `main`, publish, or change the approved SHA before explicit approval.

### Task 6: Release After Explicit Approval

**Files:**
- Modify: `reports/production-quality.json`
- Modify: `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md`

- [ ] **Step 1: Reconfirm the approved SHA**

Verify that the branch HEAD and preview artifact still match the SHA explicitly approved by the user. If the SHA changed, return to Task 5 and request approval again.

- [ ] **Step 2: Run the rollback rehearsal**

Record the current production SHA, the candidate SHA, the exact non-force rollback command, and evidence that the previous artifact can be restored.

- [ ] **Step 3: Update `main` without force push**

Use a normal fast-forward or reviewed merge path only after approval. Never rewrite `main` history.

- [ ] **Step 4: Verify GitHub Pages deployment**

Wait for the Pages workflow tied to the approved SHA and verify the deployed commit, core routes, public/private boundaries, search, sitemap, attachments, player, feature shells, encrypted Markdown, and responsive screenshots.

- [ ] **Step 5: Publish the final migration report**

Record release SHA, deployment URL, workflow run, rollback target, verification results, known non-blocking limitations, and Goal 1 completion at 100%.

## Self-Review

- Spec coverage: Task 7 closure, player, feature shells, encrypted parity, final regressions, same-SHA preview, manual approval, rollback, `main`, Pages, and online verification are mapped.
- Placeholder scan: no unresolved placeholder, deferred implementation, or unspecified approval action remains.
- Type consistency: all content and generated artifacts continue to use `sectionId → routeId → stageId → articleId`; this plan adds no alternate content model.
