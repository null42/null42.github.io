# 个人知识库博客交接文档

日期：2026-07-03  
仓库：`<repo>`
用户：`null42` / 昵称 `lx`  
当前状态：已从“能跑的博客雏形”推进到“知识库内容和发布链路基本可验证”，但还没有完成最终体验打磨，尤其是知识库导航和留言正式启用。

## 1. 原始目标

用户想用 `null42.github.io` 搭建个人博客和知识库，核心需求是：

- 个人博客标题为 `lx的个人知识库`。
- 技术方案优先自动化、离线 Markdown 写作、一键整理、一键发布。
- 后续要承载电源课程、电源知识库、电机控制知识库。
- 内容可以通过元数据自动补全，但只补缺失字段，不覆盖用户自定义字段。
- 支持按时间、栏目、分类、关键词检索文章。
- 支持 Markdown、Mermaid、SVG 等工程文档渲染。
- 支持部分文章加密。
- 支持留言功能，用来记录文章问题和后续修改点。

用户后来明确指出当前方向的问题：

- 分节太生硬。
- 电机控制知识库不全。
- 不要搬旧的几个仿真页面。
- 真正电机知识库路径是 `<motor-source-root>`。
- 留言区没有真正启用。
- 电源里误放了未完成的英文书翻译，内容杂乱。
- 第一次上传的概念类内容不要公开展示。
- 整体优化空间很大，需要重新梳理。

## 2. 当前已经完成的部分

### 2.1 站点基础

- 使用 VitePress 搭建。
- 有文章库页、搜索页、归档/筛选组件、主题样式、文章页面布局扩展。
- 已有脚本体系：
  - `kb:migrate`
  - `kb:fix`
  - `kb:generate`
  - `kb:check`
  - `kb:clean`
  - `kb:sync`
  - `kb:all`
  - `kb:deploy`

### 2.2 电机知识库迁移

当前迁移源已经改为：

```text
<motor-source-root>
```

不再使用旧的：

```text
<legacy-motor-source-root>
```

已验证事实：

- 源库可发布文档约 317 个。
- 目标 `content/motor` 迁移 Markdown 约 318 个。
- 已抽查并计算：可发布文档缺失数为 0。
- 文章索引中 `source === "motor"` 的文章数为 318。
- 旧 `content/motor/simulations` 不进入索引。

注意：`simulation/` 是真实知识库里的 C 仿真/验证章节，不等于旧的 `simulations/` 网页组件目录。不要误删。

### 2.3 电源内容清理

以下内容已被排除在公开索引和发布源之外：

- `content/power/fundamentals-work/**`
- `content/power/concepts/**`
- `content/power/lessons/**`

这些对应用户说的：

- 未完成英文书翻译。
- 第一次上传的概念类内容。
- 粗糙生成课程。

当前公开索引里这些目录命中数为 0。

### 2.4 发布产物清理

之前有一个严重问题：普通 `npm run build` 不清理 `.vitepress/dist`，导致旧页面 chunk 残留，即使索引里看不到旧内容，发布目录 `assets` 里仍然夹带旧 JS。

已修复：

- 新增 `scripts/kb/clean-dist.ts`。
- `package.json` 的 `build` 脚本已改为先执行 `kb:clean`。
- `scripts/kb/pipeline.ts` 复用 `cleanDist()`。

已验证：

- `.vitepress/dist/assets` 中旧 `content_power_concepts`、`content_power_lessons`、`content_power_fundamentals-work`、`content_motor_simulations` chunk 数为 0。
- 根目录 `assets` 中上述旧 chunk 数为 0。
- 根目录 `index.html/archive.html` 和 `.vitepress/dist/index.html/archive.html` 指向同一版 app chunk。

### 2.5 搜索与筛选

文章库支持：

- 关键词搜索，包含正文。
- 栏目筛选。
- 学习路径筛选。
- 章节筛选。
- 标签筛选。
- 月份筛选。
- 状态和类型筛选。

当前索引统计：

```text
总文章数：362
motor：318
power：41
blog：2
manual：1
旧粗糙内容索引数：0
```

### 2.6 留言功能

已经接入 `@giscus/vue` 组件。

如果配置了以下环境变量，会显示 Giscus：

```text
VITE_GISCUS_REPO
VITE_GISCUS_REPO_ID
VITE_GISCUS_CATEGORY
VITE_GISCUS_CATEGORY_ID
```

如果未配置，目前会显示 GitHub Issue fallback：

- 链接到 `https://github.com/null42/null42.github.io/issues/new`
- 自动带上文章路径。
- 用于临时记录“这篇文章的问题”。

注意：这不是正式站内评论。正式启用仍需要用户在 GitHub 仓库开启 Discussions、安装 Giscus App、填入 repo/category id。

### 2.7 测试和验证

最近一次全量测试结果：

```text
npm.cmd test
17 个测试文件通过
49 个测试通过
```

最近一次完整构建：

```text
npm.cmd run build
通过
仅有 VitePress chunk 体积警告
```

同步时曾遇到：

```text
%SYSTEMDRIVE% 可用空间 0 GB
npm run kb:sync 因 npm 写 cache/log 失败
```

绕过 npm 后直接执行：

```text
node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts
```

已成功同步。

## 3. 当前没有完成或不应宣称完成的部分

### 3.1 分节仍然可能“生硬”

已经从简单的“电源/电机/随笔”提升到：

- 入门与索引
- 基础与硬件
- 控制与算法
- 实践与验证
- 工程与生态

但这只是结构化，不代表体验已经好。

还需要继续做：

- 把电机知识库做成更像“学习地图”的入口。
- 首页应直达几条路线，而不是只让用户进文章库筛选。
- 电源和电机不一定要完全同一种结构。
- 随笔应按技术/日常/时间组织。

### 3.2 留言没有正式启用

当前只是：

- Giscus 组件代码已接入。
- Issue fallback 可用。

未完成：

- GitHub Discussions 未确认开启。
- Giscus App 未确认安装。
- `VITE_GISCUS_REPO_ID` 和 `VITE_GISCUS_CATEGORY_ID` 未填。
- 没有在 GitHub Pages 生产环境验证真实 Giscus iframe。

### 3.3 C 盘空间问题没有解决

C 盘 0 GB 会导致 npm 命令随机失败，因为 npm 要写 cache/log。

后续要么：

- 清理 C 盘。
- 配置 npm cache 到 E 盘。
- 尽量用 `node_modules\.bin\tsx.cmd` 直接执行脚本。

### 3.4 工作区差异很大，不能草率提交

当前 git diff 很大，包含：

- 源码改动。
- 生成的 sidebar。
- 大量根目录 HTML/asset 删除和新增。
- 迁移后的 `content/motor/**`。
- 删除旧 `content/power/concepts`、`lessons`、`fundamentals-work` 和旧 `content/motor/simulations`。

下一位 AI 必须先审计 `git status` 和 `git diff --stat`，不要盲目 `git add .`。

## 4. 关键文件

内容迁移与过滤：

- `scripts/kb/migrate.ts`
- `scripts/kb/content-exclusions.ts`
- `scripts/kb/path-defaults.ts`
- `scripts/kb/articles.ts`
- `scripts/kb/fix.ts`
- `scripts/kb/generate.ts`

发布链路：

- `scripts/kb/clean-dist.ts`
- `scripts/kb/sync-dist.ts`
- `scripts/kb/pipeline.ts`
- `package.json`

前端体验：

- `.vitepress/config.ts`
- `.vitepress/theme/Layout.vue`
- `.vitepress/theme/components/ArchivePage.vue`
- `.vitepress/theme/components/GiscusComments.vue`
- `.vitepress/theme/style.css`
- `index.md`
- `archive.md`
- `search.md`

测试：

- `tests/kb/content-policy.test.ts`
- `tests/kb/path-defaults.test.ts`
- `tests/kb/navigation.test.ts`
- `tests/kb/pipeline.test.ts`
- `tests/kb/encoding.test.ts`
- `tests/kb/search.test.ts`
- `tests/kb/rendering.test.ts`

文档：

- `docs/kb/comments.md`
- `docs/kb/content-model.md`
- 本文件：`docs/handoff-2026-07-03-knowledge-blog.md`

## 5. 验收标准

### 5.1 内容来源验收

必须满足：

- `scripts/kb/migrate.ts` 的 motor 源路径包含 `motor-control-knowledge-base`。
- 不包含 `motor-learning-web`。
- 不迁移旧 `*Sim.vue` 网页组件。
- `content/motor` 中应覆盖源库可发布文档。
- 可发布文档缺失数为 0，或明确列出不能迁移的原因。

建议验证脚本：

```powershell
npm.cmd test -- tests/kb/content-policy.test.ts tests/kb/path-defaults.test.ts
```

### 5.2 电源内容验收

必须满足：

- `content/power/fundamentals-work/**` 不进入索引。
- `content/power/concepts/**` 不进入索引。
- `content/power/lessons/**` 不进入索引。
- 发布产物 `assets` 中不含这些目录对应 chunk。

建议验证：

```powershell
node -e "const fs=require('fs'); const a=JSON.parse(fs.readFileSync('.vitepress/generated/articles.json','utf8')); console.log(a.filter(x=>/content\\/power\\/(concepts|lessons|fundamentals-work)\\//.test(x.path)))"
```

### 5.3 旧仿真验收

必须满足：

- `content/motor/simulations/**` 不进入索引。
- 发布产物不含 `content_motor_simulations_*.js`。
- 真实知识库的 `content/motor/simulation/**` 可以保留。

### 5.4 搜索和筛选验收

必须满足：

- 文章库可按时间、栏目、学习路径、章节、标签筛选。
- 搜索覆盖标题、摘要、标签和正文。
- 搜索私密/加密内容不得泄漏。

建议验证：

```powershell
npm.cmd test -- tests/kb/search.test.ts tests/kb/archive-page.test.ts
```

### 5.5 留言验收

临时验收：

- 未配置 Giscus 时，文章底部显示 GitHub Issue fallback。
- fallback 链接带文章路径。
- 页面文案中文可读，无乱码。

最终验收：

- GitHub Discussions 已开启。
- Giscus App 已安装。
- 环境变量已配置。
- 线上 GitHub Pages 文章页能显示 Giscus 评论框。

### 5.6 发布链路验收

必须满足：

- `npm.cmd test` 全量通过。
- `npm.cmd run build` 通过。
- `kb:clean` 在 build 前执行。
- 同步后根目录 `index.html/archive.html` 和 `.vitepress/dist` 指向同一 app chunk。
- 根目录 `assets` 无旧内容 chunk。

如果 C 盘空间仍为 0 GB，`npm run kb:sync` 可能失败；可用：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts
```

## 6. 下一步建议

优先级从高到低：

1. 暂停大规模功能添加，先做一次人工体验验收。
2. 清理 C 盘或把 npm cache 改到 E 盘，避免命令随机失败。
3. 审计当前 git diff，拆成合理提交：
   - 内容迁移和内容排除。
   - 发布链路清理。
   - 搜索/归档/筛选。
   - 留言组件。
   - 样式和导航优化。
4. 做“学习地图”型首页或电机入口页，缓解分节生硬。
5. 完成 Giscus 正式配置。
6. 针对电源部分重新定义“公开学习路径”，不要让归档材料喧宾夺主。
7. 做移动端和暗色模式截图验收。

## 7. 给下一位 AI 的接手提示词

请把下面整段复制给下一位 AI：

```text
你接手的是 `<repo>` 个人知识库博客，不要从零开始。

用户怀疑前一轮已经跑偏，所以你的第一任务不是继续加功能，而是按 `docs/handoff-2026-07-03-knowledge-blog.md` 做状态审计和收口。

核心目标：
1. 电机控制内容必须来自 `<motor-source-root>`，不要使用旧 `motor-learning-web`，也不要搬旧 `content/motor/simulations` 的网页仿真。
2. 电源内容不要公开未完成英文书翻译和第一次上传的概念课程：`content/power/fundamentals-work/**`、`content/power/concepts/**`、`content/power/lessons/**` 必须从索引和发布资产中排除。
3. 分节体验还不够好，要继续做成更像知识库学习地图，而不是生硬文件夹列表。
4. 留言区已接入 Giscus 组件，但正式 Giscus 需要 GitHub Discussions/App 和环境变量；当前 fallback 是带文章路径的 GitHub Issue 链接。
5. 发布链路必须保持干净：build 前清理 `.vitepress/dist`，同步后根目录 `assets` 不能残留旧内容 chunk。

开始前必须做：
- `git status --short`
- `git diff --stat`
- 阅读 `docs/handoff-2026-07-03-knowledge-blog.md`
- 阅读 `scripts/kb/migrate.ts`、`scripts/kb/content-exclusions.ts`、`scripts/kb/path-defaults.ts`
- 不要直接 `git add .`

已知坑：
- C 盘可能是 0 GB，`npm run ...` 可能因为 npm 写 cache/log 失败。必要时直接用 `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`。
- PowerShell 可能把中文显示成乱码，不要仅凭终端显示判断文件坏了；用 Node 按 UTF-8 读文件验证。
- `content/motor/simulation/**` 是真实知识库章节，可以保留；`content/motor/simulations/**` 是旧网页仿真，不要保留。

建议验证：
- `npm.cmd test`
- `npm.cmd run build`
- `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`
- 检查 `.vitepress/generated/articles.json` 中旧内容命中数为 0。
- 检查 `.vitepress/dist/assets` 和根目录 `assets` 中旧内容 chunk 数为 0。

不要宣称最终完成，除非验收标准全部通过，且浏览器实际看过首页、文章库、电机入口、文章页留言区。
```
