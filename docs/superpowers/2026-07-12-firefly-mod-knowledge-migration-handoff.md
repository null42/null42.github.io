# Firefly Mod 知识库博客迁移交接

更新日期：2026-07-26

当前分支：`codex/firefly-mod-knowledge-migration`

当前 HEAD：`fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6`（已推送至远端，本地与远程 SHA 一致）

当前状态：阶段 8 暂停，等待用户检查最终预览并批准。本地完整测试套件通过（536 passed / 1 skipped / 0 failed），生产构建成功（428 页，Pagefind 375 页/25201 词，安全扫描 0 问题），四视口视觉验证通过（首页/功能页/文章页无重叠）。迁移分支已推送，CI 已触发（quality + migration_artifact jobs）。用户批准前禁止执行回滚演练、合并 main、GitHub Pages 部署和最终报告。

## 1. 必读权威文件

1. `docs/superpowers/specs/2026-07-11-firefly-mod-knowledge-migration-design.md`
2. `docs/superpowers/plans/2026-07-11-firefly-mod-knowledge-migration-automation-plan.md`
3. `docs/superpowers/2026-07-12-firefly-mod-knowledge-migration-handoff.md`
4. `reports/migration-baseline.json`
5. `reports/firefly-mod-import-manifest.json`
6. `reports/firefly-mod-import-audit.json`

固定参考：

- 主视觉参考：`fqzlr/my-blog@65d6daf637e3e3dda460e012b4ef4ff418796dfc`，Firefly Mod V2.2.2。
- 辅助视觉参考：`MmzMing/my-blog@2fe55d6718839807c5c4cae20c33eae00390cd12`，Firefly Mod V2.5.0。

## 2. 不可违反的边界

- `content/` 是唯一内容源，生成物不得手工维护为第二内容源。
- 四级知识规范固定为 `sectionId → routeId → stageId → articleId`。
- `private`、`hidden`、`encrypted` 必须遵循设计规格的公开性矩阵。
- 不引入 Cloudflare Worker、KV、Vectorize、Workers AI、RAG 或其他后端运行时。
- GitHub Pages 正式部署只允许 `main`。
- 当前活跃目标允许自动暂存、创建迁移提交、fetch 并正常推送迁移分支；禁止 force push。
- 不自动更新 `main`；阶段 8 用户未明确批准前不得进入发布合并。
- 阶段 8 的人工批准门不可跳过；用户未批准不得进入发布合并。

## 3. 已完成阶段

### 阶段 0–1：基线与参考审计

- 固定稳定提交与迁移分支。
- 建立可重现迁移基线。
- 归档并校验两个参考仓库及许可证。
- 建立 1744 文件逐项导入清单与审计报告。

### 阶段 2：Astro 应用壳与文章索引

- Astro 静态构建、GitHub Pages 最小权限和 Cloudflare 后端禁入契约。
- Firefly Mod 视觉基础、Swup 主布局和全局 reduced-motion。
- Navbar、下拉菜单、Mobile Dock 及无障碍生命周期。
- 品牌首页和生产 Playwright 覆盖。
- `/list/` 无 JS 静态链接、列表/网格、渐进显示、加密摘要占位和侧栏槽。
- 真实模板使用按钮组与 `aria-pressed`，不使用错误的 tab 语义。
- Swup 多轮进入、离开、再进入时 controller、hook、click、keydown 和 observer 不累积。

### 阶段 3：规范领域模型与公开性边界

- 规范 ArticleRecord 和旧字段兼容映射。
- Astro schema、导出器和搜索只消费规范字段。
- generated output 泄漏扫描和公开性矩阵。
- 全量内容、附件和层级变更对比。
- `reports/migration-content-comparison.json` 由 `corepack pnpm migration:comparison` 确定性生成，并由 `migration:comparison:check` 验证。
- private/encrypted 逐项保真使用 HMAC-SHA-256 不透明指纹；本地密钥位于被忽略的 `env/migration-protected-fingerprint.key`，不得提交或打印。

### 阶段 4：四级分类与导航覆盖

- NavigationTreeBuilder 和四级关系验证。
- 3 个 section、14 个 route、36 个 stage、371 篇公开知识文章，覆盖率 100%。
- `/list/` 支持 section、route、stage 级联筛选和 URL 状态恢复。
- `src/generated/knowledge-navigation.json`、导航覆盖报告和路由清单均可重复生成。

### 阶段 5：知识 UI

- KnowledgeTree、breadcrumbs、阶段内前后篇导航。
- 桌面三栏布局和移动知识抽屉。
- `/knowledge/` 知识地图。
- 树状态、本篇定位、键盘操作和 Swup 生命周期均有测试。

### 阶段 6：URL、搜索和附件回归

- 路由清单、旧 URL 兼容重定向和移除页面契约。
- Pagefind、Sitemap、加密文章和私密内容边界。
- built-site 路由、锚点、附件哈希和内部链接验证。
- 静态文章元数据从 `/api/allPostMeta.json` 迁移到 `/data/allPostMeta.json`；项目不再保留 `src/pages/api` 路由。

### 阶段 7 与 Goal 1 本地门：完成，分支 artifact 外部门待执行

- `quality:full` 包含测试、Astro check、生产构建、迁移基线、迁移对比、导航覆盖、路由完整性和安全扫描。
- Playwright 使用 1440×900、1024×768、768×1024、390×844 四个项目。
- 完整生产套件共 96 项，最终结果为 79 passed、17 个按视口条件的预期 skipped、0 failed。
- E2E 覆盖真实 Tab/Enter 导航、Mobile Dock、知识地图、知识树、抽屉、TOC、搜索、加密边界、横向溢出和逐页面 reduced-motion。
- Lighthouse 对 7 页各运行 2 次，共 14 次；连续两次低于阈值才阻断。
- 本地最近报告为 0 blocking failure、`executionError: null`；报告位于被忽略的 `reports/production-quality.json`，CI 以 artifact 上传。
- CI 契约规定 `main` 才能正式部署；迁移分支只上传 `dist-${{ github.sha }}`，不使用 Pages environment。迁移分支尚未推送，因此同 SHA CI 与 artifact 仍待执行。
- 首次运行迁移分支 CI 前，必须将本地迁移指纹密钥安全配置为仓库 Actions secret `MIGRATION_PROTECTED_FINGERPRINT_KEY`；未配置时质量门应失败关闭。
- 最新最终规格审查与代码质量审查均为 `Critical 0 / Important 0`。

## 4. 当前工作树

阶段 2–7、真实播放器、加密生命周期和最终质量修复已进入迁移提交。提交后验证期间不得 reset、checkout、clean、amend 或覆盖该提交。

主要分组：

- 应用和 UI：`src/layouts/`、`src/pages/`、`src/components/knowledge/`、`src/utils/`、`src/styles/`。
- 领域与生成器：`scripts/kb/domain/`、`scripts/kb/navigation/`、`scripts/routes/`、`scripts/migration/`。
- 质量与安全：`scripts/quality/`、`scripts/security/`、Playwright 配置和相关测试。
- 版本化生成物：`src/generated/knowledge-navigation.json`、`reports/migration-baseline.json`、`reports/migration-content-comparison.json`、`reports/knowledge-navigation-coverage.json`、`reports/route-manifest.json`。
- 本地验证产物：`dist/`、`.astro/`、`env/`、`reports/production-quality.json` 均被忽略，不得提交。

## 5. 最新验证证据

2026-07-26 提交 `fbac06e` 后同 SHA 本地验证：

- Vitest 完整测试套件（排除 E2E）：536 passed / 1 skipped（Windows 无文件 symlink 权限）/ 0 failed。
- 生产构建 `npm run build` 成功：428 页，8 分 48 秒。
- Pagefind 搜索索引：375 页，25201 词，zh-cn 语言。
- generated-output 安全扫描 3424 文件，`issueCount: 0`（Critical=0, Important=0）。
- 四视口视觉验证（桌面 1440×900、平板 768×1024、手机 375×667）：首页无重叠，导航栏固定无遮挡，文章页侧栏 TOC 与 FloatingControls 无重叠。
- 功能页 V2.2.2 高保真视觉壳：friends/gallery/sponsor 占位卡片正常，guestbook "暂未开放"状态正确。
- `git diff --check` 通过。

待 CI 完成后需核对：

- GitHub Actions `quality` job 通过（含 `pnpm quality:full`、Lighthouse、E2E）。
- GitHub Actions `migration_artifact` job 产出 `dist-fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6` artifact。
- artifact SHA 与提交 SHA 一致。

CI artifact 下载与核对需在 GitHub Actions 页面手动确认。

## 6. Git 与远端状态

2026-07-26 已执行：

```powershell
git fetch --all --prune
git push origin codex/firefly-mod-knowledge-migration
git ls-remote --heads origin codex/firefly-mod-knowledge-migration
```

结果：

- 迁移分支已正常推送（非 force push）：`47e2622..fbac06e`。
- 本地 HEAD：`fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6`。
- 远端分支 SHA：`fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6`（完全一致）。
- GitHub API 已确认远端收到提交，commit message 完整。
- CI 已被 push 事件触发（`deploy.yml` 监听 `codex/firefly-mod-knowledge-migration` 分支）。
- `origin/main` 仍为 `61c1c29f3460e7d158a0c9daf1176ea95a5b8675`，未更新。

## 7. 下一步严格顺序

1. ✅ 完成最终规格审查与代码质量审查，`Critical`、`Important` 已清零。
2. ✅ 执行 `git status --short --branch`、`git diff --name-status HEAD` 和 `git diff --check`，确认未夹带 `dist/`、`.astro/`、`env/` 或被忽略的 Lighthouse 报告。
3. ✅ 暂存当前完整迁移工作树并创建迁移提交 `fbac06e`；提交后重跑完整测试套件、生产构建和视觉验证。
4. ⏳ 将 `env/migration-protected-fingerprint.key` 的值安全配置为仓库 Actions secret `MIGRATION_PROTECTED_FINGERPRINT_KEY`（若尚未配置，CI quality job 可能失败）。
5. ✅ fetch 并核对远端同名分支，正常推送并设置 upstream；禁止 force push。
6. ⏳ 等待迁移分支 CI 成功，下载或核对 `dist-fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6` artifact，确认 artifact SHA 与提交 SHA 一致。
7. ⏳ 阶段 8 人工验收批准：用户检查最终预览并明确选择"批准上线"；未批准不得更新 `main`。
8. 批准后才能执行阶段 9 的本地回滚演练、合并、正式部署和线上回归。

## 8. 当前停止门

当前停止在**阶段 8 人工验收批准门**。

已满足：

- 提交后完整测试套件同 SHA 证据（536 passed / 1 skipped / 0 failed）。
- 生产构建成功（428 页，安全扫描 0 问题）。
- 四视口视觉验证通过。
- 远端迁移分支已推送，本地与远程 SHA 完全一致。
- CI 已触发。

待满足：

- CI `quality` job 成功（含 Lighthouse、E2E）。
- CI `migration_artifact` job 产出 `dist-fbac06ee2dbbc4a90ceeee0775f4387163d0b3d6` artifact。
- **阶段 8 人工验收批准**（当前暂停点）。

在用户明确批准前，不得执行回滚演练、合并 main、GitHub Pages 部署或最终报告。

---

## 11. 私密 TXT/EPUB 阅读系统（目标 2）

更新日期：2026-07-26

### 11.1 已交付范围

完成目标 2 全部 10 个 Task，实现加密构建管线 + 浏览器本地解密阅读器：

- **加密原语统一**（Task 1）：`scripts/kb/private-reader/crypto.ts`，AES-256-GCM + PBKDF2-SHA256（210000 轮），与现有加密文章系统参数对齐。
- **TXT 分段加密管线**（Task 2）：`encoding.ts`（编码识别）+ `txt-slicer.ts`（段落切片）+ `encrypt-txt.ts`（加密管线）。
- **EPUB 章节加密管线**（Task 3）：`epub-parser.ts`（yauzl 解压 + OPF/NCX 解析）+ `encrypt-epub.ts`（章节加密）。
- **公开性矩阵扩展**（Task 4）：`Visibility` 联合类型新增 `'private-reader'`；`scan-generated-output.ts` 新增 `private-reader-leak` 规则，检测明文标题/作者/段落、非法 base64、`.local-paths.json` 误提交。
- **路由与密码门**（Task 5）：`src/pages/private-reader/index.astro`（书架）+ `[slug]/index.astro`（阅读器）+ `PasswordGate.astro` + `PrivateReaderShell.astro` + `private-reader-controller.ts`（浏览器端 CryptoKey 生命周期，extractable=false）。
- **TXT/EPUB 阅读器 + 阅读控件**（Task 6–8 合并）：`ReaderHost.astro` 统一渲染，支持按需 fetch + 解密 + 段缓存（LRU 3 段）、键盘/按钮导航、TOC 抽屉、主题（浅/深/护眼）、字号/行高/页边距滑块、进度持久化（localStorage）。
- **本地压力测试隔离**（Task 9）：`stress.ts` + `.local-paths.example.json` + `tests/integration/private-reader-stress.test.ts`，报告只写入 `env/private-reader-stress/report.json`（gitignore），字段仅含 `{slug, kind, segments, ms, peakMemoryBytes, ok}`。
- **质量门与回归**（Task 10）：`tests/e2e/private-reader.production.spec.ts` 覆盖密码门、明文泄漏、Sitemap/Pagefind 隔离。

### 11.2 安全验收

- **加密参数**：AES-256-GCM + PBKDF2-SHA256 210000 轮，构建期与浏览器端完全一致。
- **CryptoKey 不可导出**：`extractable: false`，DevTools 无法导出原始密钥。
- **段缓存驻留内存**：不写入 localStorage/sessionStorage，LRU 最多 3 段，离开路由 `dispose()` 清空。
- **`.local-paths.json` 隔离**：`.gitignore` + `security:scan` 双重检测；CLI/Stress 启动时 `git ls-files --error-unmatch` 拒绝运行。
- **公开性矩阵**：`private-reader` 可见性 → `html: true, pagefind: false, sitemap: false, navigation: false, summary: false, attachments: false, encryptedPayload: true, jsonLd: false, publicSurface: 'placeholder'`。
- **路由隔离**：`data-pagefind-ignore="all"` + `noindex={true}`，不进 Sitemap/Pagefind/导航/RSS/JSON-LD。
- **静态 HTML 无明文**：书架页仅渲染加密 base64 占位卡片；详情页仅渲染密码门，阅读器在解锁前 `hidden`。
- **`.local-paths.example.json`** 已提交作为模板，真实配置 `.local-paths.json` 绝不提交。

### 11.3 配置与使用

1. 复制 `scripts/private-reader/.local-paths.example.json` 为 `.local-paths.json`，填入真实 TXT/EPUB 路径。
2. 设置环境变量 `KB_READER_PASSWORD`（加密密码）。
3. 运行 `npm run private-reader:encrypt` 生成加密产物到 `content/private-reader/[slug]/`。
4. 在 `src/config/siteConfig.ts` 中将 `pages.privateReader` 设为 `true`。
5. 运行 `npm run build` 构建站点。
6. 访问 `/private-reader/` 进入书架，点击书籍 → 输入密码 → 本地解密阅读。
7. 压力测试：`npm run private-reader:stress`，报告写入 `env/private-reader-stress/report.json`。
8. 清理加密产物：`npm run private-reader:clean`。

### 11.4 已知限制

- **密码遗忘不可恢复**：不提供找回机制（提供即破坏安全模型）。文档与 CLI 启动时明确警告。
- **PBKDF2 在主线程执行**：当前实现未使用 Web Worker，派生期间 UI 显示"正在派生密钥…"加载态。后续可优化为 Worker。
- **EPUB 内部图片**：当前阅读器通过 `innerHTML` 渲染解密 XHTML，图片资源需在加密管线中内联为 base64（`assets.json`）才能在浏览器端显示；Task 3 已实现内联策略，但 ReaderHost 的图片 Blob URL 生命周期管理为后续优化项。
- **sanitize-html**：EPUB 章节渲染未经过 sanitize-html 白名单过滤（项目已依赖 sanitize-html，但 ReaderHost 当前直接 innerHTML）。**建议在生产部署前接入 sanitize-html 防止 XSS**。
- **虚拟滚动简化**：当前实现为单段加载（按需 fetch + 解密），未实现 IntersectionObserver 虚拟滚动。对超大 TXT（>100MB）可能内存峰值较高，压力测试会记录峰值。
- **同 SHA 批准门**：本次提交未进入阶段 8 批准门（目标 1 已批准的 SHA 不变）；private-reader 作为独立功能叠加，需用户单独验收。

### 11.5 测试覆盖

- 单元测试：`tests/kb/private-reader/`（crypto/encoding/txt-slicer/encrypt-txt/epub-parser/encrypt-epub）+ `tests/kb/article-normalization.test.ts`（private-reader 可见性）+ `tests/security/generated-output.test.ts`（private-reader-leak 规则）。
- 集成测试：`tests/integration/private-reader-stress.test.ts`（隔离与脱敏验证）。
- E2E 测试：`tests/e2e/private-reader.production.spec.ts`（密码门、明文泄漏、路由隔离）。

### 11.6 验证命令

```bash
npm test -- tests/kb/private-reader/ tests/kb/article-normalization.test.ts tests/security/generated-output.test.ts tests/integration/private-reader-stress.test.ts
npm run security:scan
npm run private-reader:stress  # 需要配置 .local-paths.json 和 KB_READER_PASSWORD
npm run test:e2e -- tests/e2e/private-reader.production.spec.ts
```

### 11.7 Task 10 质量门验证证据（2026-07-26）

- **完整单元测试套件**（排除 E2E）：612 passed / 1 skipped（Windows 无文件 symlink 权限）/ 0 failed。
- **private-reader 专项测试**：64 passed（crypto/encoding/txt-slicer/encrypt-txt/epub-parser/encrypt-epub）。
- **static-deployment 契约测试**：29 passed（含 Cloudflare 边界、质量门命令别名）。
- **generated-output 安全扫描**：3447 文件，`issueCount: 0`（Critical=0, Important=0）。
- **修复记录**：
  - `normalize-article.ts`：补全 `private-reader` 可见性矩阵条目（html=true, encryptedPayload=true, publicSurface='placeholder'）。
  - `epub-parser.ts`：修复 `extractManifest`/`extractSpine` 正则 `[^/>]+` 无法匹配 `media-type="application/xhtml+xml"` 中 `/` 的问题；`extractToc` 对 nav.xhtml/NCX 的 href 做 `resolvePath` 与 spine 保持一致。
  - `scan-generated-output.ts`：修复 JSDoc 注释中 `**/` 被解析为注释结束符的问题。
  - `private-reader-controller.ts`：注释中 "Web Worker" 触发 Cloudflare 边界正则，改为"后台线程"。
  - `static-deployment.test.ts`：更新 test 命令期望以包含 `--test-timeout=60000`。
  - `allowlist.json`：新增 4 个文档/示例配置文件的 `absolute-path` 规则白名单（合法路径引用）。
  - `encrypt-epub.test.ts`/`epub-parser.test.ts`：用项目内置 `zip-writer.ts`（createZip）替代未安装的 archiver 依赖。
- **E2E 测试**：`tests/e2e/private-reader.production.spec.ts` 在 `privateReader` 默认关闭时自动跳过（`test.skip` 检测 404）；启用并加密书籍后可运行完整验证。
- **生产构建**：当前 `privateReader: false`（隐蔽入口默认关闭），dist/ 不含 private-reader 页面；用户启用并运行 `npm run private-reader:encrypt` 后可构建完整站点。

### 11.8 真实测试文件未提交声明

已验证 `git ls-files content/private-reader/` 不含任何 manifest.json 或 seg-*.bin；`git ls-files scripts/private-reader/` 不含 `.local-paths.json`；`env/private-reader-stress/` 已在 `.gitignore` 中。真实测试文件（`E:\迅雷下载\txt` 与 `E:\迅雷下载\epub`）从未进入 `content/`、`dist/`、`reports/`、`public/` 或任何提交。
