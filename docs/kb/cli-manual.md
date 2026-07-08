# 知识库博客 CLI 使用手册

本文记录当前 VitePress 知识库博客的本地管理流程。所有发布前动作都先 dry-run 或校验，避免把未整理内容、禁发路径、旧资源 chunk 或加密明文带到公开站点。

## 1. 启动 CLI

交互菜单：

```powershell
npm.cmd run kb
```

C 盘缓存异常或 npm 日志写入失败时，直接运行：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts
```

常用 CI 命令：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
node_modules\.bin\tsx.cmd scripts\kb\cli.ts content:audit
node_modules\.bin\tsx.cmd scripts\kb\cli.ts publish --dry-run
```

## 2. 发布上线流程

发布前先检查：

```powershell
npm.cmd test
npm.cmd run build
node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts
```

当前 `npm.cmd run build` 会先执行检查与索引生成，再清理 `.vitepress/dist`，最后构建。同步脚本会把 dist 产物同步到仓库根目录，用于 GitHub Pages。

提交时不要使用 `git add .`。建议显式 staging：

```powershell
git status --short
git add .vitepress/generated docs/kb/cli-manual.md
git add content/motor/foundations content/motor/column.config.json
git add scripts/kb/markdown-rendering.ts tests/kb/rendering.test.ts
git add assets content index.html archive.html search.html
git commit -m "feat: improve knowledge rendering and motor foundations"
git push origin main
```

实际要加哪些根目录页面和 assets，以 `git status --short` 为准。

## 3. 删除文章并让远端也消失

删除公开文章不是只删 Markdown。推荐流程：

1. 删除或隐藏源 Markdown。
2. 运行 `node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci`。
3. 运行 `npm.cmd run build`。
4. 运行 `node_modules\.bin\tsx.cmd scripts\kb\sync-dist.ts`。
5. 检查 `git status --short`，确认根目录对应 HTML 已删除，旧 assets 不再残留。
6. 显式 `git add` 被删除的 Markdown、生成索引、根目录 HTML 和 assets 变化。
7. `git commit` 后 `git push origin main`。

若只是暂时不公开文章，优先把 frontmatter 改为：

```yaml
visibility: hidden
```

私密或加密文章不要进入公开搜索索引。

## 4. 批量管理文章

批量操作前先审计：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts content:audit
```

批量改路径或栏目后运行：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
npm.cmd test
```

栏目扩展必须同步更新对应 `column.config.json`。没有显式栏目配置的新公开路径不应发布；不允许把一个新栏目所有文章挤成单篇大文章。

## 5. 加密文章

加密内容走现有管线：

```powershell
npm.cmd run kb:encrypt
```

发布前检查：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts validate --ci
npm.cmd run build
```

加密文章要求：

- wrapper 可以公开。
- payload 不含明文。
- 文章不进入公开全文搜索。
- 页面不显示 Giscus 或 GitHub Issue fallback。

## 6. 渲染体检

渲染相关检查：

```powershell
node_modules\.bin\tsx.cmd scripts\kb\cli.ts render:check
npm.cmd test -- tests/kb/rendering.test.ts tests/kb/render-health.test.ts
```

重点关注：

- `$...$`、`$$...$$`、`\(...\)`、`\[...\]` 是否正常。
- 表格列数是否一致，长表格是否横向滚动。
- Mermaid 是否使用本地依赖，不出现远程 CDN。
- 公开文章标题、摘要、正文、标签不含 emoji。
- `Imported from` 不出现在公开摘要或搜索卡片摘要中。

## 7. 禁发路径复核

发布前必须确保以下路径不进入公开索引和产物：

```text
content/power/fundamentals-work/**
content/power/concepts/**
content/power/lessons/**
content/motor/simulations/**
```

注意 `content/motor/simulation/**` 是真实知识库章节，可以保留；`content/motor/simulations/**` 是旧网页仿真，必须排除。
