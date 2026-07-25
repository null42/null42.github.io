# Firefly Mod 知识库博客迁移交接

更新日期：2026-07-25

当前分支：`codex/firefly-mod-knowledge-migration`

提交前基线 HEAD：`ec678bf21d976bf8e427d12a6908d5685efda38b`

当前状态：Goal 1 的本地实现、真实播放器、加密生命周期、完整质量门、Lighthouse 和最终双审均已完成，迁移提交已创建。用户已授权自动推进到更新 `main` 前的同 SHA 验收门，下一步是提交后重跑同 SHA 证据、核对远端后正常推送并等待分支 CI artifact。阶段 8 人工批准门仍不可跳过。

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

最近已通过：

- 完整 `quality:full`。
- 96 项生产 Playwright E2E：79 passed、17 expected skipped、0 failed。
- 7 页、14 次 Lighthouse，0 blocking failure。
- generated-output 安全扫描 3413 文件，`issueCount: 0`。
- 导航和路由生成物重复生成后 SHA-256 不变。
- `git diff --check`。
- Vitest 56 个文件、538/538 tests passed；Astro check 为 0 errors、0 warnings、0 hints。
- Lighthouse 7 页各 2 次，性能分数包括 `/list/` 87/88，全部强制类别 0 blocking failure、`executionError: null`。
- 最终规格审查与代码质量审查均为 `Critical 0 / Important 0`。

提交会改变 HEAD，因此提交完成后必须重新运行至少：

```powershell
corepack pnpm quality:full
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE='<local Chrome executable>'
corepack pnpm test:e2e:quality -- --workers=4 --reporter=line
corepack pnpm quality:lighthouse
```

并确认 Lighthouse 报告中的 `commitSha` 等于新提交 SHA。

## 6. Git 与远端状态

2026-07-14 已执行：

```powershell
git fetch origin --prune
git ls-remote --heads origin codex/firefly-mod-knowledge-migration
```

结果：

- 远端不存在同名迁移分支。
- 本地分支没有 upstream。
- `origin/main` 为 `61c1c29f3460e7d158a0c9daf1176ea95a5b8675`。
- 当前活跃目标已授权自动提交并正常推送迁移分支，但推送前仍必须 fetch 和核对同名远端分支。
- 首次推送必须使用正常的 `git push -u origin codex/firefly-mod-knowledge-migration`，禁止 force push。

## 7. 下一步严格顺序

1. 完成最终规格审查与代码质量审查，`Critical`、`Important` 必须清零。
2. 执行 `git status --short --branch`、`git diff --name-status HEAD` 和 `git diff --check`，确认未夹带 `dist/`、`.astro/`、`env/` 或被忽略的 Lighthouse 报告。
3. 暂存当前完整迁移工作树并创建迁移提交；提交后记录新 SHA，重新运行完整质量门、生产 E2E 和 Lighthouse。
4. 将 `env/migration-protected-fingerprint.key` 的值安全配置为仓库 Actions secret `MIGRATION_PROTECTED_FINGERPRINT_KEY`，不得把值写入日志、提交或交接文档。
5. 若任一验证失败，修复后重新审查；不得推送失败提交。
6. 再次 fetch 并核对远端同名分支和 tracking 状态，然后正常推送并设置 upstream；禁止 force push。
7. 等待迁移分支 CI 成功，下载或核对 `dist-<sha>` artifact，确认 artifact SHA 与提交 SHA 一致。
8. 只有完成上述外部停止门后，才能进入阶段 8 的同 SHA 生产预览和截图。
9. 阶段 8 必须等待用户明确选择“批准上线”；未批准不得更新 `main`。
10. 批准后才能执行阶段 9 的本地回滚演练、合并、正式部署和线上回归。

## 8. 当前停止门

当前停止在“提交后同 SHA 验证”之前；用户已授权自动推进到更新 `main` 前的同 SHA 验收门。

尚未满足：

- 提交后完整质量门、生产 E2E 和 Lighthouse 的同 SHA 证据。
- 远端迁移分支。
- 同 SHA CI 成功记录。
- `dist-<sha>` artifact。
- 阶段 8 人工验收批准。

在这些条件按顺序满足前，不得推断迁移已发布完成，也不得更新 `main`。
