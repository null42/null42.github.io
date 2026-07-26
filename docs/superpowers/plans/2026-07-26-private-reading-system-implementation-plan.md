# 私密 TXT/EPUB 阅读系统实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在目标 1 正式发布并完成线上验收后，按本计划交付私密 TXT/EPUB 阅读系统，覆盖加密管线、浏览器阅读器、公开性矩阵扩展、安全扫描扩展、本地压力测试隔离与质量门。

**Architecture:** 复用现有加密文章系统的 AES-GCM + PBKDF2-SHA256 原语并统一参数为 210000 轮；TXT 按段落边界分段独立加密，EPUB 按 spine 章节独立加密；新增 `private-reader` 可见性类型，路由不进导航/Sitemap/Pagefind；浏览器通过 Web Crypto API 本地解密，按需 fetch 分片；本地压力测试通过 gitignore 的配置文件指向真实测试目录，产物只写入 `env/`。

**Tech Stack:** Astro, Svelte, TypeScript, Web Crypto API, Node.js crypto, yauzl, sanitize-html, reading-time, Vitest, Playwright, Pagefind, GitHub Pages.

---

## Authority and Scope

- 设计规格：`docs/superpowers/specs/2026-07-26-private-reading-system-design.md`
- 目标拆分：`docs/superpowers/specs/2026-07-24-firefly-migration-goal-decomposition-design.md`
- 现有加密原语：`scripts/kb/encrypt/encrypt.ts`、`src/utils/encrypted-payload-controller.ts`
- 现有公开性矩阵：`scripts/kb/domain/normalize-article.ts`
- 本计划仅在目标 1 完成线上验收后启动；不修改目标 1 已验收的加密 Markdown 文章行为。
- 测试隔离硬约束：`scripts/private-reader/.local-paths.json` 与 `env/private-reader-stress/` 必须在 `.gitignore` 中；真实测试文件路径与明文不进入 `content/`、`dist/`、`reports/`、`public/` 或任何提交。

### 依赖关系总览

```
Task 1 (加密原语统一)
  ├─→ Task 2 (TXT 加密管线)
  └─→ Task 3 (EPUB 加密管线)
Task 4 (公开性矩阵 + 安全扫描) ─→ Task 5 (路由 + 密码门)
Task 2, 3, 5 ─→ Task 6 (TXT 阅读器)
Task 2, 3, 5 ─→ Task 7 (EPUB 阅读器)
Task 6, 7 ─→ Task 8 (阅读控件)
Task 2, 3, 6, 7, 8 ─→ Task 9 (本地压力测试隔离)
Task 4–9 ─→ Task 10 (质量门与回归)
```

并行机会：Task 2 与 Task 3 在 Task 1 完成后可并行；Task 6 与 Task 7 在 Task 5 完成后可并行。

### Task 1: 提取加密原语并统一参数

**Files:**
- Add: `scripts/kb/private-reader/crypto.ts`
- Add: `tests/kb/private-reader/crypto.test.ts`
- Modify: `.env.example`

- [ ] **Step 1: Write the failing crypto round-trip test (RED)**

Assert that `encryptSegment(plaintext, key, iv)` and `decryptSegment(ciphertext, key, iv)` are inverse; assert that the unified iteration count is `210000`; assert that IV is 12 bytes and salt is 16 bytes; assert that two segments under the same key with different IVs do not share ciphertext prefix.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/crypto.test.ts`

Expected: FAIL because `scripts/kb/private-reader/crypto.ts` does not exist.

- [ ] **Step 3: Implement the unified crypto primitive**

Extract PBKDF2 + AES-GCM from `scripts/kb/encrypt/encrypt.ts` into `scripts/kb/private-reader/crypto.ts`. Export: `deriveKey(password, salt, iterations = 210_000)`, `encryptSegment(plaintext, key)` (returns `{ iv, ciphertext }`), `decryptSegment(ciphertext, key, iv)`, and constants `ITERATIONS = 210_000`, `SALT_LEN = 16`, `IV_LEN = 12`, `KEY_LEN = 32`. Use Node.js `crypto` only (build-time). Do not change `scripts/kb/encrypt/encrypt.ts` behavior for existing encrypted articles — extract, do not move.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/crypto.test.ts`

Expected: all round-trip and parameter tests pass.

- [ ] **Step 5: Update `.env.example`**

Add `KB_READER_PASSWORD=` placeholder alongside existing `KB_ENCRYPT_PASSWORD=`, with a comment stating it is used by `npm run private-reader:encrypt` and must never be committed.

### Task 2: TXT 分段加密管线

**Files:**
- Add: `scripts/kb/private-reader/encoding.ts`
- Add: `scripts/kb/private-reader/txt-slicer.ts`
- Add: `scripts/kb/private-reader/encrypt-txt.ts`
- Add: `tests/kb/private-reader/encoding.test.ts`
- Add: `tests/kb/private-reader/txt-slicer.test.ts`
- Add: `tests/kb/private-reader/encrypt-txt.test.ts`
- Add: `tests/fixtures/private-reader/sample.txt`
- Modify: `package.json`

- [ ] **Step 1: Write the failing encoding detection test (RED)**

Assert that `detectEncoding(buffer)` returns `'utf-8'` for UTF-8 with/without BOM, `'gb18030'` for GBK sample, `'utf-16le'` / `'utf-16be'` for UTF-16 samples, `'big5'` for Big5 sample; assert confidence score ranks the correct decoder strictly higher than others; assert `--encoding` override bypasses detection.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/encoding.test.ts`

Expected: FAIL because `encoding.ts` does not exist.

- [ ] **Step 3: Implement encoding detection**

Implement `detectEncoding(buffer): { encoding: string; confidence: number }` using BOM sniffing + `TextDecoder` round-trip validity scoring. Cover UTF-8, GB18030, UTF-16LE/BE, Big5. Throw on `confidence < 0.6` unless `--encoding` override is provided.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/encoding.test.ts`

Expected: all encoding tests pass.

- [ ] **Step 5: Write the failing slicer test (RED)**

Assert that `sliceTxt(text, { targetBytes: 262144, minBytes: 65536, maxBytes: 1048576 })` returns segments whose byte sizes are within bounds (except the last); assert no segment splits a paragraph (`\n\n` boundary is preserved); assert the union of segments reproduces the original text byte-for-byte.

- [ ] **Step 6: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/txt-slicer.test.ts`

Expected: FAIL.

- [ ] **Step 7: Implement the slicer**

Stream the text in 1 MiB chunks via `TextEncoder`; locate the 256 KiB target then backtrack to the nearest `\n\n` (fallback `\n`); emit segments within `[minBytes, maxBytes]`; the final segment may be smaller than `minBytes`.

- [ ] **Step 8: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/txt-slicer.test.ts`

Expected: all slicer tests pass.

- [ ] **Step 9: Write the failing TXT encrypt pipeline test (RED)**

Assert that `encryptTxtFile(inputPath, slug, password, outputDir)` writes `manifest.json` and `seg-*.bin` files; assert manifest has `schema: "private-reader/v1"`, `kind: "txt"`, `crypto.iterations: 210000`, `segments[].iv` all distinct; assert no plaintext or original filename appears in the manifest; assert round-trip decryption reproduces the original text.

- [ ] **Step 10: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/encrypt-txt.test.ts`

Expected: FAIL.

- [ ] **Step 11: Implement the TXT encrypt pipeline**

Compose `encoding.ts` + `txt-slicer.ts` + `crypto.ts`; write `manifest.json` and `seg-NNNN.bin` (base64 of `ciphertext || authTag`); encrypt `title` and `author` (single-block AES-GCM, stored as base64 with their own iv prefix); estimate reading time via `reading-time`. Log only `{ slug, kind: "txt", segments, ms }`.

- [ ] **Step 12: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/encrypt-txt.test.ts`

Expected: all TXT pipeline tests pass.

- [ ] **Step 13: Add the `private-reader:encrypt` script**

In `package.json` add `"private-reader:encrypt": "tsx scripts/kb/private-reader/cli.ts encrypt"` and `"private-reader:clean": "tsx scripts/kb/private-reader/cli.ts clean"`. The CLI reads `scripts/private-reader/.local-paths.json` and `KB_READER_PASSWORD` env var; refuses to run if the config file is tracked by git or the password is missing.

### Task 3: EPUB 章节加密管线

**Files:**
- Add: `scripts/kb/private-reader/epub-parser.ts`
- Add: `scripts/kb/private-reader/encrypt-epub.ts`
- Add: `tests/kb/private-reader/epub-parser.test.ts`
- Add: `tests/kb/private-reader/encrypt-epub.test.ts`
- Add: `tests/fixtures/private-reader/sample.epub` (synthetic, Lorem Ipsum)
- Modify: `scripts/kb/private-reader/cli.ts`

- [ ] **Step 1: Write the failing EPUB parser test (RED)**

Assert that `parseEpub(buffer)` returns `{ opfPath, spine: [{id, href, mediaType}], toc: [{id, title, href, anchor?}], metadata: {title, author}, assets: [{href, mediaType}] }`; assert spine order matches OPF; assert NCX (EPUB2) and nav.xhtml (EPUB3) both produce a TOC; assert zip bomb protection rejects archives exceeding `maxUncompressedBytes` (default 200 MB) or `maxEntries` (default 5000).

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/epub-parser.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the EPUB parser**

Use `yauzl` to enumerate entries; parse `META-INF/container.xml` → OPF path; parse OPF for `spine`, `manifest`, `metadata`; resolve TOC from NCX (`toc.ncx`) or EPUB3 `nav.xhtml`. Enforce `maxUncompressedBytes` and `maxEntries` with explicit errors. Do not decode binary assets as text.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/epub-parser.test.ts`

Expected: all parser tests pass.

- [ ] **Step 5: Write the failing EPUB encrypt pipeline test (RED)**

Assert that `encryptEpubFile(inputPath, slug, password, outputDir)` writes `manifest.json` with `kind: "epub"`, `toc[]` populated from NCX/nav, `segments[]` one per spine XHTML with distinct IVs; assert assets (images) are either inlined as encrypted base64 in an `assets.json` segment (default) or written as `asset-*.bin`; assert no plaintext title, author, chapter title, or original filename leaks into the manifest; assert round-trip decryption of every spine XHTML reproduces the original content.

- [ ] **Step 6: Run RED**

Run: `npm.cmd test -- tests/kb/private-reader/encrypt-epub.test.ts`

Expected: FAIL.

- [ ] **Step 7: Implement the EPUB encrypt pipeline**

Compose `epub-parser.ts` + `crypto.ts`; for each spine XHTML, derive independent IV and write `seg-NNNN.bin`; for each image asset, base64-encode then encrypt into a per-chapter `assets.json` segment (default inline strategy) or `asset-NNNN.bin`; encrypt `metadata.title`, `metadata.author`, and each `toc[].title`. Write `manifest.json` with `assets` map. Log only `{ slug, kind: "epub", chapters, segments, ms }`.

- [ ] **Step 8: Run GREEN**

Run: `npm.cmd test -- tests/kb/private-reader/encrypt-epub.test.ts`

Expected: all EPUB pipeline tests pass.

- [ ] **Step 9: Extend the CLI to dispatch by kind**

In `cli.ts`, branch on `book.kind === 'txt'` vs `'epub'`; reject unknown kinds; ensure a single `KB_READER_PASSWORD` derives per-book keys via per-book salt.

### Task 4: 公开性矩阵扩展与安全扫描

**Files:**
- Modify: `scripts/kb/types.ts`
- Modify: `scripts/kb/domain/normalize-article.ts`
- Modify: `scripts/astro/visibility-routes.ts`
- Modify: `scripts/security/scan-generated-output.ts`
- Modify: `tests/kb/normalize-article.test.ts`
- Modify: `tests/security/scan-generated-output.test.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Write the failing visibility test (RED)**

Assert that `decideVisibility('private-reader')` returns `{ html: true, pagefind: false, sitemap: false, navigation: false, summary: false, attachments: false, encryptedPayload: true, jsonLd: false, publicSurface: 'placeholder' }`; assert `normalizeVisibility('private-reader')` accepts the value and rejects unknown ones; assert existing `public/hidden/private/encrypted` decisions are unchanged.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/kb/normalize-article.test.ts`

Expected: FAIL because `'private-reader'` is not a known visibility.

- [ ] **Step 3: Extend the visibility matrix**

In `types.ts` add `'private-reader'` to the `Visibility` union; in `normalize-article.ts` add the frozen decision row and accept the value in `normalizeVisibility`. Do not alter existing rows.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/kb/normalize-article.test.ts`

Expected: all visibility tests pass, existing rows untouched.

- [ ] **Step 5: Write the failing security scan test (RED)**

Assert that `scanGeneratedOutput` flags any plaintext title/author/body/original-filename under `dist/private-reader/`; assert it flags `scripts/private-reader/.local-paths.json` if tracked by git; assert it does NOT flag encrypted base64 payloads or `manifest.json` with encrypted fields.

- [ ] **Step 6: Run RED**

Run: `npm.cmd test -- tests/security/scan-generated-output.test.ts`

Expected: FAIL because the scanner has no private-reader rules.

- [ ] **Step 7: Extend the security scanner**

In `scan-generated-output.ts`, add a rule that walks `dist/private-reader/` and rejects: non-base64-looking plaintext longer than 16 chars (excluding JSON structural keys), the literal original filenames listed in `.local-paths.json` (read via `git ls-files` to detect tracking), and any `CryptoKey`/password-looking string. Extend the existing private/encrypted handling rather than duplicating.

- [ ] **Step 8: Run GREEN**

Run: `npm.cmd test -- tests/security/scan-generated-output.test.ts`

Expected: all scanner tests pass.

- [ ] **Step 9: Update `.gitignore`**

Add `scripts/private-reader/.local-paths.json` and `env/private-reader-stress/`. Run `git check-ignore -v scripts/private-reader/.local-paths.json` to confirm the rule matches.

### Task 5: 私密阅读器路由与密码门

**Files:**
- Add: `src/pages/private-reader/index.astro`
- Add: `src/pages/private-reader/[slug]/index.astro`
- Add: `src/components/private-reader/PasswordGate.astro`
- Add: `src/components/private-reader/PrivateReaderShell.astro`
- Add: `src/components/private-reader/PrivateLibrary.astro`
- Add: `src/utils/private-reader-controller.ts`
- Add: `tests/ui/private-reader-controller.test.ts`
- Modify: `src/config.ts` (add `pages.privateReader` flag, default `false`)

- [ ] **Step 1: Write the failing controller test (RED)**

Assert that `deriveReaderKey(password, salt)` returns a non-extractable `CryptoKey` usable for AES-GCM decrypt; assert `decryptField(encryptedBase64, key)` reproduces the original string; assert that calling `dispose()` clears the in-memory key and decrypted segment cache; assert that Swup `content:replace` hook triggers `sync` and disposes stale bindings (mirror the existing `encrypted-payload-controller.ts` lifecycle).

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/private-reader-controller.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the private-reader controller**

In `src/utils/private-reader-controller.ts`, mirror the lifecycle pattern of `encrypted-payload-controller.ts` but hold a per-book `CryptoKey` and a `Map<number, string>` segment cache. Export `deriveReaderKey`, `decryptField`, `decryptSegment`, and the `initPrivateReaderLifecycle` factory. Use `crypto.subtle` with `extractable: false`. Provide an `AbortController`-based `dispose` that nulls the key and clears the map.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/ui/private-reader-controller.test.ts`

Expected: all controller tests pass.

- [ ] **Step 5: Write the failing route shell test (RED)**

Assert that `GET /private-reader/` returns 200 and renders encrypted placeholder cards without plaintext titles; assert `/private-reader/[slug]/` renders `PasswordGate` and does not include any decrypted content in the static HTML; assert neither route appears in Sitemap, Pagefind index, navigation, RSS, or JSON-LD.

- [ ] **Step 6: Run RED**

Run: `npm.cmd test -- tests/ui/private-reader-controller.test.ts tests/astro/visibility-routes.test.ts`

Expected: FAIL because routes do not exist.

- [ ] **Step 7: Implement the routes and shells**

Create `src/pages/private-reader/index.astro` enumerating `content/private-reader/*/manifest.json` and rendering `PrivateLibrary` with encrypted placeholders. Create `src/pages/private-reader/[slug]/index.astro` rendering `PrivateReaderShell` containing `PasswordGate` and `ReaderHost`. Ensure `data-pagefind-ignore="all"` is set on the reader containers. Wire `initPrivateReaderLifecycle` in the shell script tag. Gate the routes behind `siteConfig.pages.privateReader`.

- [ ] **Step 8: Run GREEN**

Run: `npm.cmd run check`

Run: `npm.cmd test -- tests/ui/private-reader-controller.test.ts`

Run: `npm.cmd run build`

Run: `npm.cmd run security:scan`

Expected: build passes, no plaintext leaks, routes absent from Sitemap/Pagefind/RSS/navigation.

### Task 6: TXT 阅读器（分段渲染与搜索）

**Files:**
- Add: `src/components/private-reader/readers/TxtReader.svelte`
- Add: `src/components/private-reader/readers/ReaderHost.astro`
- Add: `src/components/private-reader/controls/SearchPanel.svelte`
- Add: `src/utils/private-reader/virtual-list.ts`
- Add: `tests/ui/txt-reader.test.ts`
- Add: `tests/fixtures/private-reader/sample.txt` (already added in Task 2)

- [ ] **Step 1: Write the failing TXT reader test (RED)**

Assert that the reader fetches only the visible segment plus one ahead and one behind; assert scrolling past a segment boundary triggers prefetch of the next; assert decrypted text is rendered into a virtualized list that does not mount all segments at once; assert full-text search returns segment indices and scroll positions without leaking plaintext to the DOM before navigation; assert that leaving the route clears the segment cache and the `CryptoKey`.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/txt-reader.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the virtual list and TXT reader**

Implement `virtual-list.ts` using `IntersectionObserver` to mount/unmount segment DOM nodes outside the viewport. Implement `TxtReader.svelte` that consumes the `CryptoKey` from the controller, fetches `seg-*.bin`, decrypts via `crypto.subtle`, caches decrypted text in the controller's `Map`, and renders into the virtual list. Implement `SearchPanel.svelte` that decrypts the search index from the manifest, matches token HMACs, and offers "jump to segment N" without rendering plaintext snippets in the DOM (only segment number + char offset).

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/ui/txt-reader.test.ts`

Expected: all TXT reader tests pass.

- [ ] **Step 5: Wire `ReaderHost.astro`**

Render `TxtReader` when `manifest.kind === 'txt'`; render `EpubReader` (Task 7) for `'epub'`. For now stub the EPUB branch with a placeholder; Task 7 will replace it.

### Task 7: EPUB 阅读器（章节、目录、图片、内部链接）

**Files:**
- Add: `src/components/private-reader/readers/EpubReader.svelte`
- Add: `src/utils/private-reader/epub-link-rewriter.ts`
- Add: `src/utils/private-reader/sanitize-options.ts`
- Modify: `src/components/private-reader/readers/ReaderHost.astro`
- Add: `tests/ui/epub-reader.test.ts`
- Add: `tests/fixtures/private-reader/sample.epub` (already added in Task 3)

- [ ] **Step 1: Write the failing EPUB reader test (RED)**

Assert that the reader renders the current spine chapter's decrypted XHTML after `sanitize-html`; assert chapter navigation (prev/next, keyboard, swipe) updates the URL state and prefetches adjacent chapters; assert internal `href="#anchor"` and `href="chapter.xhtml"` links are rewritten to in-reader navigation events; assert images referenced by the chapter load from decrypted base64 via `Blob URL` and are revoked on chapter change; assert `<script>`, `<iframe>`, and event handler attributes are stripped.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/epub-reader.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the EPUB reader and helpers**

Implement `sanitize-options.ts` exporting a `sanitize-html` config whitelist (allow paragraphs, headings, lists, tables, images with `src`/`alt`, anchors with `href`; strip scripts, iframes, event attributes, `javascript:` links). Implement `epub-link-rewriter.ts` that rewrites internal `href` to reader navigation events. Implement `EpubReader.svelte` that decrypts the current chapter, sanitizes, rewrites links, and renders; manages `Blob URL` lifecycle for images (revoke on chapter change). Mirror the TXT reader's dispose semantics.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/ui/epub-reader.test.ts`

Expected: all EPUB reader tests pass.

- [ ] **Step 5: Replace the EPUB stub in `ReaderHost.astro`**

Mount `EpubReader` for `manifest.kind === 'epub'`; ensure both readers share the same `CryptoKey` and dispose path.

### Task 8: 阅读控件（主题、字体、进度、目录）

**Files:**
- Add: `src/components/private-reader/controls/ThemeSwitch.svelte`
- Add: `src/components/private-reader/controls/FontControls.svelte`
- Add: `src/components/private-reader/controls/TableOfContents.svelte`
- Add: `src/components/private-reader/controls/ProgressBar.svelte`
- Add: `src/components/private-reader/progress/ReadingProgressStore.ts`
- Add: `src/styles/private-reader.css`
- Add: `tests/ui/reader-controls.test.ts`
- Modify: `src/components/private-reader/readers/TxtReader.svelte`
- Modify: `src/components/private-reader/readers/EpubReader.svelte`

- [ ] **Step 1: Write the failing controls test (RED)**

Assert that theme switching toggles `data-reader-theme` among `light`/`dark`/`sepia` and persists to `localStorage` under `private-reader:prefs`; assert font family/size/line-height/letter-spacing/page-margin sliders update CSS variables and persist; assert `TableOfContents` lists decrypted chapter titles and clicking navigates without leaving the route; assert `ProgressBar` reflects `segmentIndex / totalSegments` (TXT) or `chapterIndex / totalChapters` (EPUB) and persists on scroll-idle (500ms debounce); assert reopening a book restores the last position.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/ui/reader-controls.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the controls and progress store**

Implement `ReadingProgressStore.ts` with `load(slug)` / `save(slug, { segmentIndex, scrollRatio })` over `localStorage`. Implement `ThemeSwitch`, `FontControls`, `TableOfContents`, `ProgressBar` Svelte components reading/writing the same store. Add `src/styles/private-reader.css` with CSS variables for theme + font controls. Wire the controls into both readers; on unmount, flush the debounced progress save.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/ui/reader-controls.test.ts`

Expected: all controls tests pass.

- [ ] **Step 5: Verify theme does not leak plaintext**

Run: `npm.cmd run build`

Run: `npm.cmd run security:scan`

Expected: no plaintext in `dist/private-reader/`; all theme/font CSS variables are static.

### Task 9: 本地压力测试隔离与脱敏 fixture

**Files:**
- Add: `scripts/kb/private-reader/stress.ts`
- Add: `scripts/private-reader/.local-paths.example.json`
- Add: `tests/fixtures/private-reader/sample.txt` (already added)
- Add: `tests/fixtures/private-reader/sample.epub` (already added)
- Modify: `package.json`
- Modify: `.gitignore` (already updated in Task 4)
- Add: `tests/integration/private-reader-stress.test.ts`

- [ ] **Step 1: Write the failing isolation test (RED)**

Assert that `npm run private-reader:stress` reads `scripts/private-reader/.local-paths.json`, encrypts each listed file in memory, decrypts, and writes a report to `env/private-reader-stress/report.json` only; assert the report contains no file paths, no filenames, no plaintext snippets (only `{ slug, kind, segments, ms, peakMemoryBytes, ok }`); assert `git status --porcelain` after the run shows no new tracked files under `content/`, `dist/`, `reports/`, `public/`; assert the script refuses to run if `.local-paths.json` is tracked by git.

- [ ] **Step 2: Run RED**

Run: `npm.cmd test -- tests/integration/private-reader-stress.test.ts`

Expected: FAIL.

- [ ] **Step 3: Implement the stress harness**

In `stress.ts`, read `.local-paths.json`, for each book: encrypt in memory (do not write to `content/`), decrypt, simulate a render pass (iterate segments), measure peak memory via `process.memoryUsage()`, record `{ slug, kind, segments, ms, peakMemoryBytes, ok }`. Write only to `env/private-reader-stress/report.json`. Refuse to run if `git ls-files --error-unmatch scripts/private-reader/.local-paths.json` succeeds (i.e., the file is tracked). Provide `.local-paths.example.json` as a committed template with placeholder paths.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd test -- tests/integration/private-reader-stress.test.ts`

Expected: all isolation tests pass.

- [ ] **Step 5: Add the script and document**

In `package.json` add `"private-reader:stress": "tsx scripts/kb/private-reader/stress.ts"`. Confirm `env/private-reader-stress/` is gitignored. Do NOT commit `.local-paths.json`.

- [ ] **Step 6: Verify isolation end-to-end**

Delete `env/private-reader-stress/`. Run `npm.cmd run private-reader:stress` against the real local paths. Run `git status --porcelain`. Run `npm.cmd run security:scan`.

Expected: only `env/private-reader-stress/report.json` is created (ignored); `git status` shows no new tracked files; security scan passes.

### Task 10: 质量门与回归

**Files:**
- Add: `tests/e2e/private-reader.production.spec.ts`
- Add: `reports/visual-baseline/2026-07-26-private-reader/*.png`
- Modify: `reports/production-quality.json` (extend with private-reader section)
- Modify: `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md`

- [ ] **Step 1: Write the failing E2E (RED)**

Assert that a Playwright run against the production preview can: navigate directly to `/private-reader/`, see encrypted placeholder cards (no plaintext titles), click a sample book, enter the test password, see decrypted text render, switch theme, adjust font, navigate via TOC, search a token and jump to its segment, close the tab and reopen to restore progress, and that leaving the route clears the decrypted DOM (assert no decrypted text remains in `document.body`).

- [ ] **Step 2: Run RED**

Run: `npm.cmd run test:e2e -- tests/e2e/private-reader.production.spec.ts`

Expected: FAIL.

- [ ] **Step 3: Capture the visual baseline**

Run the production preview with the synthetic fixtures; capture desktop, tablet, and mobile screenshots of the library, password gate, TXT reader, EPUB reader, TOC drawer, and theme/font controls. Store under `reports/visual-baseline/2026-07-26-private-reader/`. Screenshots must use synthetic Lorem Ipsum fixtures only — never real test files.

- [ ] **Step 4: Run the full quality gate**

Run: `npm.cmd run build`

Run: `npm.cmd run check`

Run: `npm.cmd test`

Run: `npm.cmd run test:e2e`

Run: `npm.cmd run security:scan`

Run: `npm.cmd run test:hidden-production`

Run: `npm.cmd run quality:lighthouse`

Expected: all gates pass; `dist/private-reader/` contains only encrypted base64 and HTML shells; no plaintext, no original filenames, no `.local-paths.json` tracked.

- [ ] **Step 5: Run specification and code-quality reviews**

Dispatch the spec-document-reviewer and code-quality-reviewer subagents against the design spec, this plan, and the implementation. Continue with RED→GREEN until both report `Critical = 0` and `Important = 0`.

- [ ] **Step 6: Update the handoff document**

Append a private-reader section to `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md` recording: shipped scope, encrypted fixture SHA-256, security scan results, Lighthouse scores, known non-blocking limitations, and the verification that real test files were never committed.

- [ ] **Step 7: Present the same-SHA approval gate**

Record the local HEAD, remote branch SHA, production preview SHA, and quality report SHAs. Present them to the user and wait for explicit approval. Do not merge to `main` or deploy to GitHub Pages before approval.

## 验收标准

### 功能验收

- TXT（含 100 MB+ 超大文件）与 EPUB（含多章节、图片、内部链接）均能：构建期加密 → 部署 → 浏览器输入密码 → 本地解密 → 渲染。
- 分段按需加载：滚动时只解密可视段及其前后各 1 段；内存中解密缓存不超过 3 段。
- 全文搜索（TXT）/章节跳转（EPUB）可用且不泄漏明文到 DOM。
- 主题（明/暗/护眼）、字体族、字号、行高、字距、页边距全部生效并持久化。
- 阅读进度按 book-slug 持久化，重开同一书自动恢复。
- 离开路由时内存中的 `CryptoKey` 与解密文本被清空。

### 安全验收

- `npm run security:scan` 通过；`dist/private-reader/` 下无明文、无原文件名、无路径泄漏。
- `npm run test:hidden-production` 通过；`/private-reader/` 路由不在 Sitemap、Pagefind、RSS、JSON-LD、导航中。
- `scripts/private-reader/.local-paths.json` 未被 git 追踪（`git ls-files --error-unmatch` 失败）。
- 压力测试运行后 `git status --porcelain` 无新增可提交文件；`reports/` 无真实测试文件路径或明文。
- 浏览器 DevTools 中 `CryptoKey.extractable === false`；离开路由后 `window` 上无残留密钥句柄。

### 质量验收

- 单元测试覆盖率 ≥ 80%（加密原语、编码、切片、EPUB 解析、解密生命周期、虚拟列表、链接改写、sanitize 配置）。
- E2E 覆盖密码输入、解密渲染、进度恢复、主题切换、TOC 跳转、搜索、离开路由清理。
- 规格审查与代码质量审查：`Critical = 0`、`Important = 0`。
- Lighthouse 性能/可访问性/最佳实践/SEO 达到与目标 1 一致的基线（阅读器路由因不进索引，SEO 维度可豁免）。
- 视觉基线截图覆盖桌面/平板/移动端的书架、密码门、TXT/EPUB 阅读界面、控件抽屉。

### 集成验收

- 现有 `public/hidden/private/encrypted` 公开性矩阵行为未改变（回归测试通过）。
- 现有加密 Markdown 文章解密行为未改变。
- `EncryptedPayload` 控制器与新的 `private-reader-controller` 共存，Swup 切换互不干扰。
- 同 SHA 分支 CI、artifact、生产预览齐全；用户批准后才推进 `main` 与 Pages 部署。

## 风险与缓解

| 风险 | 等级 | 缓解 |
|------|------|------|
| EPUB zip bomb 导致构建期 OOM | 中 | `epub-parser.ts` 强制 `maxUncompressedBytes=200MB`、`maxEntries=5000`；超限抛错并跳过该书；单元测试覆盖 |
| 编码识别错误产生乱码密文 | 中 | 多编码试解码 + 置信度评分；`--encoding` 强制覆盖；manifest 记录 detected encoding 供人工核对 |
| 超大 TXT 浏览器内存峰值 | 高 | 虚拟滚动 + 单段上限 1 MiB + 仅缓存 3 段；压力测试记录峰值；超阈值在 manifest 标记 `search.disabled` |
| Web Crypto PBKDF2 阻塞主线程 | 中 | 派生在 Web Worker 中执行；派生期间显示加载态；测试覆盖派生期间 UI 不冻结 |
| 密码遗忘导致内容永久不可读 | 高（用户侧） | 文档与 CLI 启动时明确警告；不提供找回机制（提供即破坏安全模型） |
| `.local-paths.json` 误提交泄漏真实路径 | 高 | `.gitignore` + `security:scan` 双重检测；CLI 启动时 `git ls-files --error-unmatch` 拒绝运行 |
| Swup 切换时 `CryptoKey` 残留 | 中 | 复用 `encrypted-payload-controller.ts` dispose 模式；E2E 断言离开路由后 DOM 无明文 |
| EPUB 内部链接改写遗漏导致 404 | 中 | `epub-link-rewriter.ts` 单元测试覆盖 `#anchor`、相对路径、绝对路径、外部链接四类 |
| sanitize-html 白名单过严破坏排版 | 低 | 白名单覆盖段落/标题/列表/表格/图片/锚点；E2E 视觉基线对比 |
| 同 SHA 批准门被绕过 | 高 | 沿用目标 1 的批准门；SHA 变化必须重新验证与重新批准；Task 10 Step 7 强制等待 |

## Self-Review

- 规格覆盖：加密原语统一、TXT 管线、EPUB 管线、公开性矩阵、安全扫描、路由与密码门、TXT 阅读器、EPUB 阅读器、阅读控件、压力测试隔离、质量门与同 SHA 批准门均已映射到 Task。
- 占位符扫描：Task 7 Step 5 的 EPUB stub 在 Task 7 完成后被真实组件替换；无其他未解析占位符或推迟项。
- 类型一致性：沿用 `sectionId → routeId → stageId → articleId` 内容模型；新增 `private-reader` 可见性不引入新内容模型，仅作为 `Visibility` 联合类型的新成员。
- 安全边界：每个 Task 的 RED 步骤都包含安全断言（无明文、无路径、无密钥泄漏）；Task 4 与 Task 10 集中验证。
- 依赖顺序：Task 1 是 Task 2/3 的前置；Task 4 是 Task 5 的前置；Task 5 是 Task 6/7 的前置；Task 6/7 是 Task 8 的前置；Task 9 依赖完整管线；Task 10 是最终门。并行机会已在依赖图中标注。
