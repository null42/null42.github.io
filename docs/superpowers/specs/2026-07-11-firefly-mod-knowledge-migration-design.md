# Firefly Mod 知识库博客迁移设计

日期：2026-07-11  
状态：已确认，待实施计划  
目标仓库：`null42/null42.github.io`  
主参考底座：`https://github.com/MmzMing/my-blog`  
固定提交：`2fe55d6718839807c5c4cae20c33eae00390cd12`（Firefly Mod V2.5.0）  
辅助参考：`https://github.com/fqzlr/my-blog`  
固定提交：`65d6daf637e3e3dda460e012b4ef4ff418796dfc`（Firefly Mod V2.2.2）  
许可证：两个参考仓库均为 MIT；导入时保留上游版权与许可声明。主参考决定应用壳，辅助参考用于分类、页面能力和实现对比，不覆盖主参考的架构决策。

## 1. 背景与目标

当前博客已经从 VitePress 迁移到 Astro + Firefly，并保留约 385 篇内容、Pagefind、加密文章和 GitHub Pages 部署。但当前视觉仍接近 Firefly 默认形态，缺少 `MmzMing/my-blog` 及参考站点的完整首页叙事、导航、文章索引、移动 Dock 和高密度侧栏体验；旧 VitePress 的“栏目 → 路线 → 阶段/章节 → 文章”分类分级也未进入 Astro 前台。

本次迁移以 `MmzMing/my-blog` 为新应用壳，优先完成博客本体迁移，再在该底座上恢复知识库分类分级。Obsidian 插件作为后续独立阶段，本轮只预留共享核心边界，不实施插件。

## 2. 已确认决策

1. 以 `MmzMing/my-blog` 为新版主题底座，不在当前 Firefly 上零散复制组件。
2. 分两阶段交付：先完成博客迁移和线上验收，再开发 Obsidian 插件。
3. 本轮实现完整视觉与静态体验，不引入 Cloudflare Worker、KV、Vectorize、Workers AI 或 RAG。
4. 知识类文章采用左侧四级知识树、正文居中、右侧文章 TOC；移动端使用知识树抽屉。
5. 新增独立 `/knowledge/` 知识地图页。
6. `content/` 始终是唯一规范内容源。
7. 开工前从当前稳定版本创建新的迁移分支并推送到远端。所有迁移提交先进入该分支，人工验收前不得更新 `main`。
8. 分类分级必须贯穿数据、生成、页面、筛选、导航和测试，不能只实现视觉折叠。

## 3. 范围

### 3.1 本轮包含

- 导入 `MmzMing/my-blog` 的首页、导航、移动 Dock、文章虚拟列表、双侧栏、动效与视觉系统。
- 替换参考作者文案、链接、图片和个人配置，禁止残留其个人信息。
- 保留现有内容、附件、Markdown 能力、加密文章、Pagefind、旧 URL 和 GitHub Pages。
- 统一文章扫描、栏目默认值继承和 Astro 导出。
- 构建四级知识导航模型并接入文章页、移动端抽屉、知识地图、文章列表筛选及阶段级前后篇。
- 建立自动化兼容、安全、构建和线上验证门槛。
- 保留现有 CLI 校验能力，直到 Obsidian 插件替代。

### 3.2 本轮不包含

- Cloudflare Worker、KV、Vectorize、Workers AI、RAG 搜索、动态留言板。
- Obsidian 插件的界面和功能实现。
- 自动 Git 提交、自动推送或无确认发布。
- 用户账号、云端学习进度或多设备同步。
- 与博客迁移无关的主题功能扩展。

## 4. 分支、发布与回滚约束

### 4.1 分支策略

实施开始前：

1. 确认当前 `main` 指向已验证线上版本。
2. 从当前稳定提交创建语义清晰的新迁移分支，例如 `codex/firefly-mod-knowledge-migration`。
3. 立即将空迁移分支推送远端，建立跟踪关系。
4. 记录当前稳定提交、迁移分支名、参考主题 SHA 和线上 Actions run。
5. 所有实现、测试和预览提交只进入迁移分支。
6. 只有人工确认预览效果和自动验收全部通过后，才允许使用 `--no-ff` 合并到 `main`，生成唯一迁移合并提交；禁止 fast-forward。

### 4.2 发布门

更新 `main` 前必须同时满足：

- 全量构建、Astro Check、测试和安全扫描通过；
- 文章计数、导航节点计数和旧 URL 清单通过；
- 首页、列表、知识地图、文章正文、搜索、加密文章在生产预览正常；
- 桌面与移动端布局通过；
- 用户明确批准上线。

### 4.3 分支预览闭环

GitHub Pages 正式环境只允许 `main` 部署。迁移分支 CI 必须执行完整构建并上传带提交 SHA 的 `dist` artifact，不发布到生产 Pages。人工验收使用本地生产预览：从该 artifact 或同一提交的 `dist` 启动静态服务器，通过 Trae 可访问预览 URL 展示。验收记录必须包含迁移提交 SHA、artifact 名称、预览命令、首页/知识地图/知识文章/移动端截图和用户结论。若后续启用第三方预览服务，必须使用独立临时域名、只读静态产物、有限保留期，并禁止占用生产 Pages environment。

### 4.4 回滚

原稳定提交和既有备份分支保持不变。默认回滚方式是在受保护流程中对唯一迁移合并提交执行 `git revert -m 1 <merge-sha>` 并重新触发 Pages，禁止强推 `main`。若迁移后已有新增文章，先将内容提交移植到回滚分支，避免内容丢失。回滚后必须重新验证首页、关键文章、旧 URL、搜索、加密文章和隐私扫描。更新 `main` 前至少在临时本地分支演练一次 `--no-ff` 合并、`git revert -m 1` 和回滚后构建，但不实际改动远端 `main`。

## 5. 目标架构

```text
content/（唯一内容源）
├─ column.config.json
├─ Markdown
├─ 本地附件
└─ 加密载荷
        │
        ▼
知识库领域与适配层
├─ 栏目配置与继承
├─ 标准 ArticleRecord
├─ 分类分级 NavigationNode[]
├─ Astro 内容导出
├─ 旧 URL 清单
└─ 隐私与内容校验
        │
        ▼
Firefly Mod 应用壳
├─ 品牌化滚动首页
├─ Navbar + Mobile Dock
├─ 文章虚拟列表
├─ 左侧四级知识树
├─ 右侧文章 TOC
├─ 移动端知识抽屉
└─ 独立知识地图
        │
        ▼
Astro SSG + Pagefind + GitHub Pages
```

## 6. 主题底座导入

### 6.1 导入原则

- 固定参考仓库精确 SHA，避免实施期间上游变化。
- 以参考仓库应用壳为基线导入 `src/`、Astro 配置、样式、依赖和必要静态资源。
- 保留本项目 `content/`、知识库逻辑、加密格式、迁移测试、部署安全策略和报告。
- 不覆盖后再修；先列出保留、替换、合并和禁用清单，按模块导入。
- Cloudflare 相关配置、Worker 路由和动态入口必须禁用或移除。

### 6.2 页面信息架构

```text
/                 品牌化滚动首页
/list/            文章虚拟列表
/knowledge/       四级知识地图
/archive/         归档
/categories/      分类
/tags/            标签
/search/          Pagefind 搜索
/posts/.../       文章正文
/about/           关于
/friends/         友链
```

首页不再承担文章 Feed，文章发现统一进入 `/list/`、知识地图、归档、分类和搜索。

### 6.3 视觉与交互

导入：

- Hero、Ticker、数据层、展示层和滚动叙事；
- 桌面 Navbar、下拉菜单和移动 Dock；
- 文章虚拟列表及列表/网格切换；
- 双侧栏和主题小组件；
- 页面过渡、主题模式与必要动效。

约束：

- 作者信息、链接和媒体全部本项目化；
- 首屏媒体优先加载，后续图片和视频延迟加载；
- 移动端关闭高成本雨滴、复杂切片或视频效果；
- `prefers-reduced-motion` 下提供静态降级；
- 动效不得阻塞导航、正文和搜索；
- 构建产物不得依赖参考作者的私有远程资源。

## 7. 分类分级与四级导航

### 7.1 数据模型

规范层级：

```text
section（栏目）
└─ navGroup / route（路线）
   └─ chapter / stage（阶段或章节）
      └─ article（文章）
```

统一中间模型：

```ts
type NavigationNodeKind = "section" | "route" | "chapter" | "article";

interface NavigationNode {
  id: string;
  kind: NavigationNodeKind;
  title: string;
  order: number;
  path?: string;
  articleCount: number;
  children: NavigationNode[];
}
```

内部规范字段固定为 `sectionId → routeId → stageId → articleId`，界面文案分别显示为栏目、路线、阶段/章节、文章。兼容映射如下：

| 来源 | 规范字段 | 规则 |
|---|---|---|
| 栏目目录或 `section` | `sectionId` | frontmatter 显式值优先，其次 `column.config.json` 和路径继承 |
| `navGroup` 或 route 配置 | `routeId` | `routeId` 显式值优先，`navGroup` 作为兼容别名；两者冲突时构建失败 |
| `stage`、`chapter` 或阶段配置 | `stageId` | `stage` 显式值优先；`chapter` 作为兼容别名和显示标题来源；无法唯一映射时构建失败 |
| 源相对路径或显式 slug | `articleId` | 同一规范路径必须唯一，重复 ID 构建失败 |

每篇公开知识文章必须且只能映射到一个 section、route、stage 和 article 节点。未知路线、未知阶段、跨栏目路线、孤儿文章、重复 ID、同级重复显式 order 均作为构建错误。允许空节点必须在栏目配置中显式标记 `allowEmpty: true`。

排序形成确定全序：section、route、stage 分别先按配置 `order` 数值升序，再按规范 ID 的 Unicode 码点顺序；article 先按显式 `order`，再按文件名前缀数字、标题 Unicode 码点和源相对路径。缺失 order 视为正无穷；同级重复显式 order 不允许。

### 7.2 分类分级贯穿范围

分类分级必须同时进入：

- `ArticleRecord` 和 Astro content schema；
- 生成的知识导航 JSON；
- 左侧知识树和移动抽屉；
- `/knowledge/` 知识地图；
- `/list/` 文章筛选；
- 面包屑；
- 阶段级上一篇/下一篇；
- 内容统计、质量分布与迁移报告；
- 自动测试和隐私过滤。

源 frontmatter/schema 允许以下兼容输入字段，仅由适配器入口读取：`section`、`navGroup`、`navGroupOrder`、`chapter`、`chapterTitle`、`chapterOrder`、`routeId`、`stage`、`order`、`difficulty`、`quality`。

规范化 `ArticleRecord` 对知识文章必须包含：`sectionId`、`sectionTitle`、`routeId`、`routeTitle`、`stageId`、`stageTitle`、`articleId`、`title`、`sourcePath`、`slug`、`order`；`difficulty` 和 `quality` 为可选字段。普通非知识文章允许四级 ID 为空。

所有导航、筛选、排序、地图、面包屑和前后篇消费端只能读取规范化字段；兼容输入字段在适配器完成冲突校验和映射后，不得参与后续计算。

### 7.3 内容适配器收敛

当前 Astro 导出器不能继续单独使用较弱的 `gray-matter` 映射。新版流程：

```text
Node 文件系统适配器
→ 栏目配置与目录默认值继承
→ 标准 ArticleRecord[]
→ Astro 内容 / NavigationNode[] / 搜索清单 / 发布清单
```

文章页和知识地图消费同一份生成导航数据，避免重复实现排序规则。生成文件建议为 `src/generated/knowledge-navigation.json`，不允许手工编辑。

### 7.4 桌面文章页

知识文章使用三栏结构：

- 左侧：四级知识树，自动展开并高亮当前文章；
- 中间：面包屑、正文、严格限定当前 `stageId` 的前后篇和相关推荐；
- 右侧：当前文章 TOC、阅读进度和允许的小组件。

普通博客文章不含知识元数据时，继续使用主题默认布局。

折叠状态存储在浏览器本地，当前节点进入可视区域。知识树与 Swup 页面切换生命周期兼容。

### 7.5 移动端

- 提供“知识目录”按钮打开抽屉；
- 抽屉复用同一导航数据和树组件；
- 选中文章后关闭抽屉并导航；
- 支持焦点锁定、Escape、遮罩关闭和键盘操作；
- 正文前不直接展开完整树。

### 7.6 知识地图

`/knowledge/` 包含：

1. 栏目总览；
2. 路线与阶段；
3. 文章清单、数量、难度、标签和质量状态。

纯静态首版不实现账号学习进度。`private`、`hidden` 和加密明文不得进入公开地图或统计。

## 8. 内容、Markdown 与 URL 兼容

### 8.1 规范源

`content/` 是唯一编辑源；`src/content/posts/`、导航 JSON、导出报告和兼容页面均为生成物。

### 8.2 内容保真

必须保证：

- 公开文章数不低于基线；
- 标题、日期、摘要、分类、标签和四级元数据不丢失；
- 相对文章链接、锚点、本地图片和附件可访问；
- Mermaid、PlantUML、KaTeX、Callout、表格和代码块继续工作；
- 评论继续全局关闭；
- Pagefind 仅索引公开可读内容。

### 8.3 可重现基线清单

阶段 0 生成并版本化机器可读基线，至少记录：源相对路径、内容摘要哈希、规范 slug、旧 URL、目标 URL、visibility、encrypted 标志、sectionId/routeId/stageId、附件列表及附件哈希。报告同时记录生成命令和基线 commit SHA。迁移后公开文章集合不得缺失，内容或 URL 变化必须进入用户批准的例外清单；附件逐项存在且哈希一致。

### 8.4 旧 URL

GitHub Pages 下使用静态 HTML 兼容页：`meta refresh` + canonical + 可点击链接，不宣称 HTTP 30x。为保留旧深链接锚点，兼容页使用最小内联脚本读取 `location.hash`，并执行 `location.replace(target + location.hash)`；禁用 JavaScript 时仍可点击无锚点目标链接。路由清单逐项声明真实页、兼容页或显式删除页的预期 HTTP 状态和最终 URL。查询串不保证保留。写入前必须检查目标文件冲突，禁止生成 `public/index.html`、自跳转或覆盖任何真实 Astro 页面。自动测试覆盖“已有锚点转移”“不存在锚点安全落到目标页”和“禁用 JavaScript可点击目标”三类场景。

### 8.5 公开性矩阵

| 可见性 | HTML/直链 | Pagefind/Sitemap | 导航/列表/统计 | 客户端载荷 |
|---|---|---|---|---|
| public | 允许 | 允许 | 允许 | 仅公开内容 |
| hidden | 仅已知直链允许 | 禁止 | 禁止 | 不含额外敏感数据 |
| private | 禁止生成 | 禁止 | 禁止 | 禁止 |
| encrypted | 仅生成无明文包装页 | 包装页与明文均禁止索引 | 可显示标题级占位但不得含明文摘要 | 仅密文、盐、nonce、算法参数；禁止口令 |

## 9. 安全门槛

以下任一情况必须使构建失败：

- 私密目录或 `visibility: private` 内容进入生成区；
- 加密文章明文进入 HTML、Pagefind、Sitemap、导航或报告；
- 加密载荷缺失；
- 重定向目标为自身或覆盖真实页面；
- 导航树包含私密、隐藏或不应公开的节点；
- 产物含密码、令牌、本机绝对路径或敏感源路径；
- `env/` 或本地工具环境被 Git 跟踪。

扫描范围至少包括 `dist/`、Pagefind、Sitemap、生成导航、报告、客户端 JS/CSS 和 Git 跟踪文件。规则覆盖已知敏感词、常见令牌格式、高熵候选和 Windows/Unix 绝对路径；仅允许在版本化 allowlist 中记录经人工确认的误报，报告必须列出规则、文件和匹配摘要，不打印完整秘密。

静态部署门要求 Astro `output: "static"`；依赖和配置不得包含 Cloudflare adapter、Wrangler、Worker 路由、KV/Vectorize/AI binding 或所需环境变量。普通公共 CDN 资源仅在明确资源 allowlist 中允许，浏览器网络记录不得访问 Worker/API 域名。

性能门：390×844 移动视口必须禁用雨滴、复杂切片和背景视频；`prefers-reduced-motion` 下禁止自动播放和非必要滚动动画。首页初始加载不得把后续展示层原始媒体全部设为 eager。Lighthouse 移动模式目标 Performance ≥ 75、Accessibility ≥ 90、Best Practices ≥ 90、SEO ≥ 90；若受 CI 波动影响，连续两次低于阈值才阻塞并提交分析。视觉丰富度通过首页区块清单和基准截图人工验收。

## 10. 分阶段实施与验收

### 阶段 0：基线与远程迁移分支

- 记录稳定 `main`、线上快照和 Actions run；
- 创建并推送新远程迁移分支；
- 固定参考主题 SHA；
- 生成文章、URL、隐私和页面基线。

通过条件：基线可复现，远程分支存在，`main` 未改变。

### 阶段 1：主题应用壳

- 导入主题源码与依赖；
- 移除 Cloudflare 绑定；
- 恢复 GitHub Pages 静态输出；
- 接入首页、导航、Dock、文章列表和双侧栏；
- 替换作者内容与媒体。

通过条件：样本构建成功，无 Cloudflare 请求，无参考作者残留。

### 阶段 2：统一内容适配

- 抽取统一文章扫描和继承；
- 扩展 schema；
- 全量导出公开内容、附件和加密载荷；
- 生成报告和 Pagefind 输入。

通过条件：文章数量、Markdown 样本、隐私和搜索通过。

### 阶段 3：分类分级与四级导航

- 生成统一导航树；
- 实现桌面知识树、右侧 TOC、移动抽屉；
- 实现面包屑、阶段前后篇、列表筛选和知识地图。

通过条件：全量机器校验必须证明 100% 公开知识文章均唯一映射到 `sectionId → routeId → stageId → articleId`；所有配置节点已进入树或显式 `allowEmpty`；不存在孤儿文章、未知路线/阶段、重复 ID、跨层挂载和重复 order。报告输出逐层节点数、文章数和与基线的集合差异。主要栏目 UI 抽样、高亮、抽屉和普通文章降级仅作为附加验收。

### 阶段 4：兼容与回归

- 旧 URL、附件和锚点检查；
- 桌面/平板/移动端测试；
- reduced-motion 与性能测试；
- 全量测试、Astro Check、生产构建、Pagefind 和安全扫描。

通过条件：无 P0/P1 缺陷，全部自动门槛通过。

### 阶段 5：生产预览与人工确认

迁移分支 CI 上传 `dist-<commit-sha>` artifact；本地必须从同一 SHA 的产物启动静态预览。人工验收：首页完整滚动、`/list/`、`/knowledge/`、主要栏目样本、复杂 Markdown、加密文章、搜索、移动导航和知识抽屉。

通过条件：验收记录绑定 commit SHA 和 artifact，截图齐全，用户明确批准上线。

### 阶段 6：合并与线上验证

- 使用 `--no-ff` 生成唯一迁移合并提交并更新 `main`；
- 等待 GitHub Pages build/deploy 成功；
- 检查线上 HTML、关键 URL 和旧 URL；
- 使用真实浏览器截图首页、知识地图、知识文章和移动端。

通过条件：线上截图和自动检查均正常，稳定备份可回滚。

## 11. 测试矩阵

| 层级 | 覆盖范围 |
|---|---|
| 单元 | 栏目继承、排序、导航树、链接改写、重定向冲突 |
| 集成 | 内容导出、附件复制、加密载荷、导航生成、Pagefind 输入 |
| 构建 | Astro Check、生产构建、Sitemap、Pagefind |
| 安全 | 私密明文、密码、绝对路径、加密索引和导航泄漏 |
| UI | 首页、Navbar、Dock、列表、知识树、抽屉、TOC、知识地图 |
| 响应式 | 1440、1024、768、390 像素视口 |
| 线上 | Actions、HTTP 200、关键 HTML、浏览器截图、旧 URL |

## 12. Obsidian 插件接口预留

本阶段只解耦领域逻辑：

```text
kb-core
├─ ArticleNormalizer
├─ ColumnRegistry
├─ NavigationTreeBuilder
├─ ContentValidator
├─ RenderHealthAnalyzer
└─ EncryptionPayloadFormat

NodeAdapter
├─ 文件系统
├─ Astro 导出
└─ CLI

未来 ObsidianAdapter
├─ Vault API
├─ 命令面板
├─ 设置页
└─ 编辑器诊断
```

旧 CLI 在插件覆盖当前文章校验、新建文章、栏目路线选择、元数据补全、渲染体检、加密和发布前检查之前不得删除。

## 13. 最终验收标准

1. 线上视觉风格和静态体验达到参考魔改 Firefly 的整体丰富度，而非局部换皮。
2. 四级分类分级在数据、导航、筛选、地图、面包屑和前后篇中一致。
3. 全部公开内容、附件和复杂 Markdown 可用。
4. 私密与加密内容无泄漏。
5. Pagefind、旧 URL 和 GitHub Pages 正常。
6. 桌面与移动端均可访问和操作。
7. 迁移分支先行、用户确认后才更新 `main`。
8. 原稳定版本可随时回滚。
