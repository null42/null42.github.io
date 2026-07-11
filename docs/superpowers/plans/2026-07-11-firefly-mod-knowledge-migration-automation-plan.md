# Firefly Mod 知识库博客自动化迁移实施计划

日期：2026-07-11  
依据规格：`docs/superpowers/specs/2026-07-11-firefly-mod-knowledge-migration-design.md`  
参考底座：`https://github.com/MmzMing/my-blog`  
固定提交：`2fe55d6718839807c5c4cae20c33eae00390cd12`  
目标迁移分支：`codex/firefly-mod-knowledge-migration`

## 执行规则

- 严格按任务顺序执行；带“停止门”的任务未通过不得继续。
- 实现任务必须先添加失败测试，再做最小实现。
- 所有提交先进入远程迁移分支；用户批准前禁止更新 `main`。
- 不自动提交或推送；每个提交点执行前核对暂存文件，提交和推送需保持可审查。
- `content/` 是唯一内容源；生成物不得手工修改。
- `env/` 存放本地安装、缓存、参考仓库和截图，禁止进入 Git。
- 不引入 Cloudflare Worker、KV、Vectorize、Workers AI 或 RAG。
- 分类分级必须全量满足 `sectionId → routeId → stageId → articleId`。

---

## 阶段 0：稳定基线与远程迁移分支

### 任务 0.1：核对稳定版本和工作区

**目标**：确认当前版本可恢复，避免把未提交内容混入迁移。

**执行**：

1. 检查当前分支、工作区、远端、最近提交和 `main` SHA。
2. 确认线上 `https://null42.github.io/` 对应当前稳定提交。
3. 确认既有备份分支仍在远端。
4. 确认 `.gitignore` 包含 `env/`、`dist/` 和生成内容目录。
5. 记录稳定 SHA 和最近成功 Actions run 到迁移基线报告。

**验证**：

```powershell
git status --short --branch
git rev-parse main
git ls-remote --heads origin main backup/vitepress-2026-07-10
```

**停止门**：工作区不干净或稳定 SHA 无法确认时停止。

### 任务 0.2：创建并推送远程迁移分支

**目标**：在任何迁移修改前建立远程暂存分支。

**执行**：

```powershell
git switch main
git pull --ff-only origin main
git rev-parse HEAD
git switch -c codex/firefly-mod-knowledge-migration
git push -u origin codex/firefly-mod-knowledge-migration
```

`git rev-parse HEAD` 必须等于任务 0.1 记录的稳定 `main` SHA，否则停止且不得创建分支。

**验证**：

```powershell
git branch -vv
git ls-remote --heads origin codex/firefly-mod-knowledge-migration
```

**停止门**：远端分支不存在或未建立 tracking 时停止。

### 任务 0.3：建立可重现迁移基线

**新增/修改**：

- `scripts/migration/generate-baseline.ts`
- `tests/migration/baseline.test.ts`
- `reports/migration-baseline.json`（版本化）
- `package.json`

**测试先行**：

1. 测试基线记录源路径、内容哈希、slug、旧/新 URL、visibility、encrypted、四级兼容字段和附件哈希。
2. 测试 private 内容不会把正文写入报告。
3. 测试相同输入生成稳定排序和稳定 JSON。

**实现**：

- 复用现有文章扫描和栏目配置读取；
- 使用 SHA-256 记录内容和附件摘要；
- 报告写入稳定 `main` SHA、生成命令、文章/附件/URL 计数；
- 仅记录加密内容元数据，不记录明文。

**验证**：

```powershell
corepack pnpm vitest run tests/migration/baseline.test.ts
corepack pnpm migration:baseline
corepack pnpm migration:baseline:check
```

**提交点**：`chore: establish Firefly mod migration baseline`

---

## 阶段 1：获取并审计参考底座

### 任务 1.1：将参考仓库下载到 env

**目标**：所有新安装和参考源码都位于不提交的 `env/`。

**执行**：

```powershell
git clone https://github.com/MmzMing/my-blog env/firefly-mod-reference
git -C env/firefly-mod-reference checkout 2fe55d6718839807c5c4cae20c33eae00390cd12
```

**验证**：

```powershell
git -C env/firefly-mod-reference rev-parse HEAD
git -C env/fqzlr-blog-reference rev-parse HEAD
git check-ignore env/firefly-mod-reference
git check-ignore env/fqzlr-blog-reference
```

**停止门**：SHA 不匹配、许可证不存在或目录被 Git 跟踪时停止。

### 任务 1.2：生成导入清单

**新增**：

- `reports/firefly-mod-import-manifest.json`（版本化）
- `tests/migration/import-manifest.test.ts`

**清单分类**：

- `import`：首页、导航、Dock、文章列表、样式和静态组件；
- `merge`：Astro 配置、package、内容 schema、布局和构建脚本；
- `preserve`：`content/`、`scripts/kb/`、加密、部署和测试；
- `exclude`：Worker、Wrangler、RAG、KV、Vectorize、作者私有内容；
- `replace-personal`：作者文案、社交链接、图片、站点统计和项目展示。

**测试**：

- 清单不得包含 `wrangler.toml`、Worker、Vectorize 索引脚本；
- 每个参考源码文件必须明确分类；
- 引入文件的许可证来源可追溯。

**提交点**：`chore: define Firefly mod import manifest`

---

## 阶段 2：导入主题应用壳

### 任务 2.1：合并依赖和静态构建配置

**修改**：

- `package.json`
- `pnpm-lock.yaml`
- `astro.config.mjs`
- `tsconfig.json`
- `src/content.config.ts`
- `.github/workflows/deploy.yml`

**测试先行**：

- 新增静态部署契约测试，断言 `output: "static"`；
- 断言不存在 Cloudflare adapter、Wrangler、KV/Vectorize/AI binding；
- 断言 `env/` 仍被忽略；
- 断言 Pages 正式部署只监听 `main`。

**实现**：

- 合并 Astro 6、Svelte 5、Tailwind 4 和参考主题静态依赖；
- 保留 Pagefind、KaTeX、Mermaid、PlantUML、加密和内容生成依赖；
- 删除参考仓库的后端构建脚本和绑定；
- 所有包缓存和 pnpm store 指向 `env/`。

**验证**：

```powershell
corepack pnpm install --frozen-lockfile=false
corepack pnpm vitest run tests/deploy tests/migration
corepack pnpm astro check
```

**提交点**：`build: merge static Firefly mod toolchain`

### 任务 2.2：导入视觉 token、全局布局和页面过渡

**导入/修改**：

- `src/styles/main.css`
- `src/styles/variables.styl`
- `src/styles/transition.css`
- `src/layouts/*`
- `src/components/layout/*` 中的基础布局组件

**测试先行**：

- 页面壳存在主内容、左右侧栏和 Swup 容器；
- `prefers-reduced-motion` 有降级样式；
- 全局 CSS 不引用参考作者远程私有资源。

**实现**：

- 先导入 token 和布局，不导入首页重动效；
- 保留当前 Markdown 正文可读性和代码块样式；
- 保持文章宽度、双侧栏断点和移动端基础布局。

**验证**：

```powershell
corepack pnpm vitest run tests/ui/layout-contract.test.ts
corepack pnpm astro check
```

**提交点**：`feat: adopt Firefly mod visual foundation`

### 任务 2.3：导入导航、下拉菜单和 Mobile Dock

**导入/修改**：

- `src/constants/link-presets.ts`
- `src/config/navBarConfig.ts`
- `src/components/layout/Navbar.astro`
- `src/components/layout/DropdownMenu.astro`
- `src/components/layout/NavMenuPanel.astro`
- `src/components/layout/MobileDock.astro`
- 对应 CSS

**测试先行**：

- 导航包含主页、知识地图、文章列表、归档、分类、标签、搜索、关于和友链；
- 不含 RAG、动态留言板和 Cloudflare 后端入口；
- 外链具有安全属性；
- Mobile Dock 在移动断点出现。

**提交点**：`feat: add Firefly mod navigation and mobile dock`

### 任务 2.4：导入首页视觉章节

**导入/修改**：

- `src/pages/index.astro`
- `src/config/homeConfig.ts`
- `src/components/layout/HomeHero.astro`
- `HomeTicker.astro`
- `HomeDataLayer.astro`
- `HomeDisplayLayer.astro`
- `HomePortfolioShutterLayer.astro`
- `src/styles/components/home-*.css`
- 本项目化媒体资源

**测试先行**：

- 首页包含 Hero、Ticker、Data、Display 四类区块；
- 390×844 禁用雨滴、复杂切片和背景视频；
- reduced-motion 禁止自动播放和非必要滚动动画；
- 非首屏大媒体不是 eager；
- 不存在 `MmzMing`、参考作者邮箱、社交链接和私有资源 URL。

**实现**：

- 个人文案和图片全部配置化；
- 使用本项目素材，无合适素材时先保留可替换配置，不引用参考私有资源；
- 动效初始化兼容 Swup；
- 首页错误不影响导航和正文入口。

**验证**：

```powershell
corepack pnpm vitest run tests/ui/home-contract.test.ts
corepack pnpm astro check
corepack pnpm build
```

**提交点**：`feat: add branded Firefly mod landing page`

### 任务 2.5：导入文章虚拟列表和主题侧栏

**导入/修改**：

- `src/pages/list.astro`
- `src/components/pages/ArticleVirtualList.svelte`
- `src/components/controls/AnimatedTabs.svelte`
- `src/config/sidebarConfig.ts`
- 所需 widget 和 CSS

**测试先行**：

- 列表与网格均渲染；
- 无 JavaScript 时提供静态文章链接降级；
- 普通文章保持主题侧栏；
- 知识文章可由后续任务注入知识树槽位。

**提交点**：`feat: add rich article index and sidebar shell`

**阶段 2 停止门**：样本静态构建、首页、导航、列表和普通文章均正常，且无 Cloudflare 后端依赖。

---

## 阶段 3：统一知识库领域模型和内容导出

### 任务 3.1：定义规范 ArticleRecord 与兼容输入映射

**新增/修改**：

- `scripts/kb/domain/article-record.ts`
- `scripts/kb/domain/normalize-article.ts`
- `scripts/kb/articles.ts`
- `scripts/kb/columns.ts`
- `tests/kb/article-normalization.test.ts`

**测试先行**：

- `section/navGroup/chapter/stage` 正确映射到规范 ID；
- `routeId` 与 `navGroup` 冲突失败；
- `stage` 与 `chapter` 无法唯一映射失败；
- public 知识文章缺任一层失败；
- 普通博客文章允许无四级 ID；
- private/hidden/encrypted 按公开性矩阵处理。

**规范输出**：

```text
sectionId, sectionTitle
routeId, routeTitle
stageId, stageTitle
articleId, title
sourcePath, slug, order
difficulty?, quality?
```

**提交点**：`refactor: normalize knowledge article hierarchy`

### 任务 3.2：扩展 Astro schema 并改造导出器

**修改**：

- `src/content.config.ts`
- `scripts/astro/export-content.ts`
- `tests/astro/content-export.test.ts`

**测试先行**：

- 导出器只消费规范 `ArticleRecord`；
- 所有兼容输入字段不进入消费端计算；
- 四级规范字段写入生成文章；
- private 不生成；hidden 不进入索引清单；encrypted 不含明文；
- 附件和相对链接保持；
- `public/index.html` 不生成且历史残留被清理。

**提交点**：`refactor: export normalized knowledge content to Astro`

### 任务 3.3：实现公开性矩阵和泄漏扫描

**新增/修改**：

- `scripts/security/scan-generated-output.ts`
- `scripts/security/allowlist.json`
- `tests/security/generated-output.test.ts`
- `package.json`

**覆盖**：

- `dist/`、Pagefind、Sitemap、导航 JSON、报告、客户端 JS/CSS、Git 跟踪文件；
- 已知敏感词、令牌格式、高熵候选和绝对路径；
- 报告只打印摘要，不打印秘密。

**提交点**：`test: enforce generated content privacy policy`

### 任务 3.4：执行全量内容迁移对比

**执行**：

```powershell
corepack pnpm content:generate
corepack pnpm migration:baseline:check
corepack pnpm security:scan
```

**验收**：

- 公开文章集合无缺失；
- 内容与附件哈希差异均有解释；
- Markdown 样本：Mermaid、PlantUML、KaTeX、Callout、表格、代码、图片通过；
- 加密明文不进入生成区。

**提交点**：`feat: migrate full knowledge content into Firefly mod`

---

## 阶段 4：生成并验证四级分类分级

### 任务 4.1：实现框架无关 NavigationTreeBuilder

**新增**：

- `scripts/kb/domain/navigation.ts`
- `scripts/kb/navigation/build-navigation.ts`
- `tests/kb/navigation-tree.test.ts`

**测试先行**：

- 生成 section → route → stage → article；
- 每篇 public 知识文章恰好出现一次；
- 未知路线、未知阶段、跨栏目、孤儿、重复 ID、重复 order 失败；
- `allowEmpty: true` 是唯一允许空配置节点的方式；
- 排序遵循规范确定全序；
- private/hidden 不进入树；encrypted 只出现允许的标题级占位。

**提交点**：`feat: generate deterministic knowledge navigation tree`

### 任务 4.2：生成导航 JSON 和全量覆盖报告

**新增/修改**：

- `src/generated/knowledge-navigation.json`（生成物，按项目策略决定是否版本化）
- `reports/knowledge-navigation-coverage.json`
- `scripts/kb/navigation/validate-coverage.ts`
- `package.json`

**报告**：

- section、route、stage、article 数量；
- 每层 ID 和父子关系；
- 与基线集合差异；
- orphan、duplicate、unknown、cross-parent、empty 节点。

**停止门**：100% 公开知识文章未唯一映射时停止。

**提交点**：`build: add knowledge navigation generation gate`

### 任务 4.3：文章列表增加分类分级筛选

**修改**：

- `src/pages/list.astro`
- `src/components/pages/ArticleVirtualList.svelte`
- 对应类型和 CSS

**测试先行**：

- 栏目、路线、阶段级联筛选；
- 清除上级时清除无效下级；
- URL 查询参数可恢复筛选；
- 普通博客文章可通过“其他文章”查看；
- 筛选使用规范 ID，不读取兼容字段。

**提交点**：`feat: filter articles by knowledge hierarchy`

---

## 阶段 5：知识文章三栏、移动抽屉和知识地图

### 任务 5.1：实现可复用 KnowledgeTree

**新增**：

- `src/components/knowledge/KnowledgeTree.astro` 或 Svelte 岛
- `src/components/knowledge/knowledge-tree.css`
- `tests/ui/knowledge-tree.test.ts`

**行为**：

- 自动展开当前 section/route/stage；
- 高亮并滚动到当前 article；
- 折叠状态存入 namespaced localStorage；
- Swup 切换后重新绑定且不重复监听；
- 支持键盘展开、折叠和导航。

**提交点**：`feat: add hierarchical knowledge tree`

### 任务 5.2：接入知识文章三栏与面包屑

**修改**：

- `src/pages/posts/[...slug].astro`
- `src/layouts/MainGridLayout.astro`
- `src/components/knowledge/KnowledgeBreadcrumbs.astro`
- `src/components/knowledge/StagePostNavigation.astro`
- 侧栏配置和 CSS

**测试先行**：

- 知识文章：左树、中正文、右 TOC；
- 普通文章保持默认布局；
- 面包屑使用 section/route/stage/article；
- 上下篇严格限定当前 `stageId`，阶段边界处为空，不允许跨阶段补位；
- 消费端只读取规范 ID。

**提交点**：`feat: integrate knowledge article three-column layout`

### 任务 5.3：实现移动端知识抽屉

**新增**：

- `src/components/knowledge/KnowledgeDrawer.astro`
- `src/components/knowledge/knowledge-drawer.css`
- `tests/ui/knowledge-drawer.test.ts`

**测试先行**：

- 390px 出现入口，桌面不重复显示；
- focus trap、Escape、遮罩关闭；
- 选中文章后关闭；
- body 滚动锁正确恢复；
- reduced-motion 降级。

**提交点**：`feat: add accessible mobile knowledge drawer`

### 任务 5.4：实现 `/knowledge/` 知识地图

**新增**：

- `src/pages/knowledge.astro`
- `src/components/knowledge/KnowledgeMap.astro`
- `src/styles/pages/knowledge-map.css`
- `tests/ui/knowledge-map.test.ts`

**展示**：

- 栏目卡片；
- 路线和阶段；
- 文章计数、难度、标签、质量；
- 到筛选后 `/list/` 和文章页的链接；
- 不显示 private/hidden/加密明文。

**提交点**：`feat: add hierarchical knowledge map`

**阶段 5 停止门**：全量数据覆盖通过，桌面三栏和移动抽屉可操作，普通文章不受影响。

---

## 阶段 6：旧 URL、搜索与兼容回归

### 任务 6.1：建立统一路由清单

**新增/修改**：

- `scripts/routes/build-route-manifest.ts`
- `reports/route-manifest.json`
- `tests/routes/route-manifest.test.ts`
- `scripts/astro/export-content.ts`

**测试先行**：

- 真实 Astro 页面、兼容页和删除页明确分类；
- 禁止自跳转和产物冲突；
- 禁止 `public/index.html`；
- 兼容页包含 canonical、meta refresh、可点击链接和 hash 转移脚本；
- 禁用 JS 时链接可用。

**提交点**：`fix: harden static legacy URL compatibility`

### 任务 6.2：验证 Pagefind、Sitemap 和公开性

**执行/测试**：

- Pagefind 只索引 public 明文文章；
- hidden/private/encrypted 不进入 Pagefind；
- Sitemap 遵循公开性矩阵；
- `/search/` 中文搜索返回正确文章；
- 分类分级词可检索但不泄漏隐藏内容。

**提交点**：`test: verify public search and sitemap boundaries`

### 任务 6.3：全量 URL 与附件验证

**新增**：

- `scripts/migration/verify-built-site.ts`
- `tests/migration/built-site.test.ts`

**验证**：

- route manifest 每项在 `dist` 存在；
- 旧 URL 最终目标正确；
- 已有锚点、无效锚点、禁用 JS 三类行为；
- 所有基线附件存在；
- 内部链接无已知 404。

**提交点**：`test: verify migrated static site integrity`

---

## 阶段 7：完整质量门与分支预览

### 任务 7.1：执行完整自动化验证

```powershell
corepack pnpm test
corepack pnpm astro check
corepack pnpm build
corepack pnpm migration:baseline:check
corepack pnpm knowledge:coverage
corepack pnpm routes:verify
corepack pnpm security:scan
```

**必须输出**：

- 测试文件和用例数；
- Astro errors/warnings/hints；
- 构建页面数；
- Pagefind 索引页数；
- 四级节点数及 100% 覆盖；
- URL/附件通过数；
- 安全扫描结果。

### 任务 7.2：运行响应式、可访问性和性能检查

**视口**：1440、1024、768、390。  
**页面**：`/`、`/list/`、`/knowledge/`、普通文章、知识文章、加密文章、`/search/`。

**检查**：

- 导航、Dock、知识树、抽屉、TOC；
- reduced-motion；
- 移动端重动效禁用；
- Lighthouse Performance ≥ 75，Accessibility/Best Practices/SEO ≥ 90；
- 使用 Playwright 捕获上述全部页面的运行时网络请求，断言不访问 Cloudflare Worker/API、RAG、KV、Vectorize 或 Workers AI 域名；普通公共 CDN 仅允许版本化 allowlist；
- 连续两次低于阈值才阻塞，并记录分析。

### 任务 7.3：迁移分支 CI artifact

**修改**：

- `.github/workflows/deploy.yml` 或新增独立验证 workflow

**行为**：

- `main`：完整构建后部署正式 Pages；
- `codex/firefly-mod-knowledge-migration`：完整构建但不部署，只上传 `dist-<sha>`；
- artifact 有限保留；
- 不使用生产 Pages environment。

**测试**：workflow 契约测试验证分支条件和无分支部署。

**提交点**：`ci: publish migration preview artifact`

### 任务 7.4：推送迁移分支并等待 CI

```powershell
git push origin codex/firefly-mod-knowledge-migration
```

等待分支 workflow 成功，核对 artifact SHA 与本地 HEAD 一致。

**停止门**：CI 未成功、artifact SHA 不匹配或任何质量门失败时不得进入人工验收。

---

## 阶段 8：生产产物预览与人工确认

### 任务 8.1：从同一 SHA 启动生产预览

- 下载或使用同 SHA 的 `dist`；
- 从 `env/preview/` 启动静态服务器；
- 通过 Trae 预览 URL 展示；
- 不使用 Astro dev server代替生产产物。

### 任务 8.2：生成验收截图

截图存放于 `env/verification/<sha>/`，不提交：

- 首页首屏与后续区块；
- 文章列表及分类分级筛选；
- 知识地图；
- 桌面知识文章三栏；
- 移动端知识抽屉；
- 搜索；
- 加密文章包装页。

### 任务 8.3：用户人工验收门

用户必须明确选择：

- 批准上线；
- 有问题继续修改；
- 中止并保留迁移分支。

**停止门**：未明确批准不得更新 `main`。

---

## 阶段 9：回滚演练、合并与线上验证

### 任务 9.1：本地回滚演练

1. 从最新 `origin/main` 创建临时本地分支；
2. `--no-ff` 合并迁移分支；
3. 记录临时 merge SHA；
4. 执行 `git revert -m 1 <merge-sha>`；
5. 在回滚状态执行 `corepack pnpm test`、`corepack pnpm astro check`、`corepack pnpm build`、`corepack pnpm migration:baseline:check`、`corepack pnpm knowledge:coverage`、`corepack pnpm routes:verify` 和 `corepack pnpm security:scan`；
6. 使用任务 7.2 的浏览器检查验证首页、关键文章、搜索、加密文章、响应式、可访问性和运行时网络；
7. 确认文章、附件、URL 和安全结果与任务 0.3 的稳定基线逐项一致；
8. 删除临时本地分支，不推送。

**停止门**：回滚演练失败时不得更新 `main`。

### 任务 9.2：以唯一迁移合并提交更新 main

经用户批准后：

```powershell
git switch main
git pull --ff-only origin main
git merge --no-ff codex/firefly-mod-knowledge-migration
```

检查唯一迁移 merge commit 后推送：

```powershell
git push origin main
```

禁止 force push。

### 任务 9.3：等待 Pages 并线上截图验证

- 等待 `Deploy Astro site to Pages` 的 build/deploy 成功；
- 验证线上 commit SHA；
- 检查 HTTP 200、Astro HTML 标记和无迁移占位页；
- 线上验证首页、列表、知识地图、知识文章、搜索、加密文章和旧 URL；
- 使用系统 Edge/Chrome 实际渲染桌面与移动截图；
- 与预览截图比较关键布局。

### 任务 9.4：最终报告

报告包括：

- 稳定基线 SHA；
- 迁移分支和最终 merge SHA；
- 参考主题 SHA；
- 文章/附件/URL/四级节点统计；
- 测试和构建结果；
- Actions run；
- 线上截图路径；
- 回滚命令和回滚演练结果；
- 暂缓到 Obsidian 插件阶段的事项。

---

## 阶段 10：博客迁移完成门

只有以下条件全部满足，才允许宣布博客迁移完成并规划 Obsidian 插件：

- 线上视觉达到参考魔改 Firefly 的完整静态体验；
- 所有公开知识文章 100% 进入四级分类分级；
- 桌面知识树、右侧 TOC、移动抽屉、知识地图和筛选一致；
- 内容、附件、复杂 Markdown、搜索和旧 URL 通过；
- private/hidden/encrypted 遵循公开性矩阵；
- GitHub Pages 成功且真实浏览器截图正常；
- 原稳定版本和回滚流程可用；
- 用户明确确认博客迁移完成。

在此门之前，不创建 Obsidian 插件项目、不删除旧 CLI、不开始插件功能实现。
