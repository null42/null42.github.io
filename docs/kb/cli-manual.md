# 知识库博客 CLI 使用手册

本文记录当前 VitePress 知识库博客的本地管理流程。原则是先校验、再构建、再同步、再显式暂存；不要用 `git add .`，不要把未整理内容、禁发路径、旧资源 chunk 或加密明文带到公开站点。

## 1. 启动入口

交互菜单：

```powershell
npm.cmd run kb
```

C 盘缓存或 npm 日志写入异常时，直接运行：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts
```

当前菜单固定为：

```text
1. 新建文章
2. 管理栏目
3. 导入内容
4. 重排路线
5. 加密文章
6. 渲染体检
7. 发布上线
```

## 2. CI 命令

这些命令可直接用于上线前复核：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
node_modules\.bin\tsx.cmd scripts\kb\cli.ts content:audit
node_modules\.bin\tsx.cmd scripts\kb\cli.ts publish --dry-run
```

含义：

- `validate --ci`：检查栏目配置、发布清单、禁发路径、Markdown 渲染健康。
- `render:check`：检查公开文章源码 Markdown，避免依赖运行时补救。
- `content:audit`：查看公开文章、栏目、质量分布。
- `publish --dry-run`：只展示将执行的发布链路，不改文件。

## 3. 发布上线

发布前执行：

```powershell
npm.cmd test
npm.cmd run build
node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts
```

`npm.cmd run build` 会先执行检查和索引生成，再清理 `.vitepress/dist`，最后构建。`sync-dist.ts` 会把 `.vitepress/dist` 同步到仓库根目录，用于 GitHub Pages。

提交时先看变更：

```powershell
git status --short
git diff --stat
```

显式暂存本次相关文件，例如：

```powershell
git add scripts/kb/cli.ts docs/kb/cli-manual.md
git add tests/kb/cli.test.ts tests/kb/encoding.test.ts tests/kb/render-health.test.ts
git add content/motor/foundations
git add content/motor/advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md
git add content/motor/algorithm/ALG-07-Sensorless-Observers.md
git add content/motor/algorithm/ALG-17-VF-Control.md
git add content/motor/control-theory/CT-11-Observer-Design.md
git add content/motor/control-theory/CT-19-Model-Predictive-Control.md
git add content/motor/controllers-evolution/CE-09-Bode-Waterbed.md
git add content/motor/controllers-evolution/CE-10-Lead-Lag-Compensator.md
git add content/motor/controllers-evolution/CE-15-LP-QP-LQR.md
git add content/motor/controllers-evolution/CE-22-H-Infinity-Robust-Control.md
git add content/motor/motion-control/MC-MC-01-Position-Loop.md
git add content/motor/simulation/SIM-02-C-Simulation-Code-Map.md
```

构建同步后还要把生成产物显式加入，以 `git status --short` 为准：

```powershell
git add .vitepress/generated
git add assets index.html archive.html search.html content
```

提交并推送：

```powershell
git commit -m "fix: clean markdown rendering and motor foundations"
git push origin main
```

如果直连推送超时，可临时指定本地代理：

```powershell
git -c http.proxy=http://127.0.0.1:7892 -c https.proxy=http://127.0.0.1:7892 push origin main
```

## 4. 删除文章并让远端消失

删除公开文章不能只删 Markdown。远端 GitHub Pages 会保留仓库根目录的静态 HTML 和 assets，必须重新构建并同步。

推荐流程：

1. 删除源 Markdown，或把 frontmatter 改为 `visibility: hidden`。
2. 运行 `node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci`。
3. 运行 `npm.cmd run build`。
4. 运行 `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`。
5. 运行 `git status --short`，确认根目录对应 HTML 删除，旧 assets 不再残留。
6. 显式 `git add` 被删除的 Markdown、生成索引、根目录 HTML 和 assets 变化。
7. `git commit` 后 `git push origin main`。

临时下线优先使用：

```yaml
visibility: hidden
```

需要重新整理的文章建议使用：

```yaml
quality: needsRewrite
```

`draft`、`imported`、`needsRewrite` 不应进入首页推荐和学习地图主路线。

## 5. 批量管理

批量改路径、栏目或可见性前先审计：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts content:audit
```

批量操作后执行：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
npm.cmd test
```

栏目扩展要求：

- 每个公开栏目必须有显式 `column.config.json` 或等价栏目注册。
- 新栏目默认不能把所有文章挤成单篇大文章。
- 除非栏目配置允许 `layout: flat`，前台必须按路线、阶段、条目展示。
- 搜索筛选项必须来自栏目配置，不能从混乱内容临时反推。

## 6. 加密文章

加密内容走现有管线：

```powershell
npm.cmd run kb:encrypt
```

发布前检查：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
npm.cmd run build
```

要求：

- wrapper 可以公开。
- payload 不含明文。
- 加密文章不进入公开全文搜索。
- 加密页不显示 Giscus 或 GitHub Issue fallback。
- 页面要有空密码、错误密码、正确密码三态。

## 7. 渲染体检

渲染检查：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
npm.cmd test -- tests/kb/rendering.test.ts tests/kb/render-health.test.ts
```

重点：

- 支持 `$...$`、`$$...$$`、`\(...\)`、`\[...\]`。
- 表格列数一致；表格内公式的 `|` 必须转义或改写。
- 长表格横向滚动，不能撑爆文章页。
- Mermaid 使用本地依赖，不依赖远程 CDN。
- 公开文章标题、摘要、正文、标签不得含 emoji。
- `Imported from` 不出现在公开摘要或搜索卡片摘要中。

## 8. 禁发路径

以下路径不得进入公开索引和发布产物：

```text
content/power/fundamentals-work/**
content/power/concepts/**
content/power/lessons/**
content/motor/simulations/**
```

注意：`content/motor/simulation/**` 是真实知识库章节，可以保留；`content/motor/simulations/**` 是旧网页仿真，必须排除。

## 9. 常见故障

- PowerShell 显示中文乱码时，不要立刻判定文件坏了；用 Node 按 UTF-8 读取验证。
- 如果 `npm.cmd run ...` 因 C 盘 0 GB 或 npm cache/log 失败，直接用 `node_modules\.bin\tsx.cmd scripts\kb\...`。
- 如果 Mermaid 浏览器端失败，先检查源码是否是合法 Mermaid，而不是把图表当普通代码块。
- 如果公式或表格只有部分文章坏，优先检查源 Markdown 格式，特别是表格列数和数学公式里的管道符。
