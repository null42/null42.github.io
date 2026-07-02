---
date: 2026-06-30
category: 电源控制
source: power
visibility: public
title: null42 Knowledge Blog Implementation Plan
tags:
  - power-electronics
status: learning
summary: "> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan t"
---

# null42 Knowledge Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `null42.github.io` as a VitePress-based personal knowledge blog with offline Markdown writing, metadata validation, generated archive indexes, giscus comments, and GitHub Pages deployment.

**Architecture:** Create a new standalone repository at `E:\gitee_CodeStorage\学习\null42.github.io`. Keep content in `content/`, generate normalized indexes under `.vitepress/generated/`, and keep source knowledge bases read-only during migration. Use small focused TypeScript scripts for metadata parsing, validation, generation, migration, and publishing.

**Tech Stack:** VitePress, Vue 3, TypeScript, Node.js scripts, gray-matter, fast-glob, yaml, Vitest, GitHub Actions, GitHub Pages, giscus.

---

## Source References Checked

- VitePress supports YAML frontmatter at the top of Markdown files and parses it with `gray-matter`.
- VitePress local search is enabled with `themeConfig.search.provider = 'local'`.
- VitePress deploy docs use `.vitepress/dist` as the default static output.
- giscus is a GitHub Discussions-powered comments system.
- GitHub Actions is the deployment mechanism for GitHub Pages.

## Implementation Root

Create all product code in:

```text
E:\gitee_CodeStorage\学习\null42.github.io
```

Keep the planning/spec files in:

```text
E:\gitee_CodeStorage\学习\电源\docs\superpowers\
```

Do not edit these source knowledge bases during implementation:

```text
E:\gitee_CodeStorage\学习\电源
E:\gitee_CodeStorage\学习\MotorControl-main\motor-learning-web
```

## Planned File Structure

```text
null42.github.io/
  .gitignore
  package.json
  tsconfig.json
  index.md
  archive.md
  about.md
  content/
    power/.category.yml
    motor/.category.yml
    blog/.category.yml
    projects/.category.yml
    simulations/.category.yml
    notes/.category.yml
    uncategorized/.category.yml
    power/getting-started.md
    motor/getting-started.md
    blog/hello.md
  public/
    favicon.svg
  .vitepress/
    config.ts
    generated/.gitkeep
    theme/index.ts
    theme/style.css
    theme/Layout.vue
    theme/components/ArchivePage.vue
    theme/components/GiscusComments.vue
  scripts/
    kb/types.ts
    kb/paths.ts
    kb/frontmatter.ts
    kb/category.ts
    kb/articles.ts
    kb/check.ts
    kb/fix.ts
    kb/generate.ts
    kb/publish.ts
    kb/migrate.ts
  tests/
    fixtures/content/
    kb/frontmatter.test.ts
    kb/category.test.ts
    kb/articles.test.ts
  .github/workflows/deploy.yml
```

Responsibilities:

- `.vitepress/config.ts`: VitePress site config, navigation, search, generated sidebar import.
- `.vitepress/theme/Layout.vue`: Wrap default theme layout and inject comments on article pages.
- `.vitepress/theme/components/ArchivePage.vue`: Client-side archive/category/tag/date filtering UI.
- `.vitepress/theme/components/GiscusComments.vue`: giscus integration with safe fallback when config is missing.
- `scripts/kb/frontmatter.ts`: Parse, serialize, and safely complete Markdown frontmatter.
- `scripts/kb/category.ts`: Load inherited `.category.yml` metadata.
- `scripts/kb/articles.ts`: Scan content, normalize articles, validate links and metadata.
- `scripts/kb/check.ts`: Non-mutating validation entrypoint.
- `scripts/kb/fix.ts`: Mutating safe metadata completion entrypoint.
- `scripts/kb/generate.ts`: Generate archive JSON and VitePress sidebar.
- `scripts/kb/publish.ts`: Validate, build, commit, and push.
- `scripts/kb/migrate.ts`: Copy selected source content into normalized `content/` folders without mutating sources.

---

### Task 1: Create the VitePress Project Skeleton

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.gitignore`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\package.json`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\tsconfig.json`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\index.md`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\archive.md`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\about.md`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\public\favicon.svg`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\generated\.gitkeep`

- [ ] **Step 1: Create the repository directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'E:\gitee_CodeStorage\学习\null42.github.io'
Set-Location 'E:\gitee_CodeStorage\学习\null42.github.io'
git init
```

Expected: Git initializes an empty repository in `E:\gitee_CodeStorage\学习\null42.github.io`.

- [ ] **Step 2: Add base package files**

Create `package.json`:

```json
{
  "name": "null42.github.io",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npm run kb:generate && vitepress dev .",
    "build": "npm run kb:check && npm run kb:generate && vitepress build .",
    "preview": "vitepress preview .",
    "test": "vitest run",
    "kb:check": "tsx scripts/kb/check.ts",
    "kb:fix": "tsx scripts/kb/fix.ts",
    "kb:generate": "tsx scripts/kb/generate.ts",
    "kb:migrate": "tsx scripts/kb/migrate.ts",
    "kb:publish": "tsx scripts/kb/publish.ts"
  },
  "dependencies": {
    "@giscus/vue": "^3.1.1",
    "vitepress": "^1.6.0",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "fast-glob": "^3.3.3",
    "gray-matter": "^4.0.3",
    "tsx": "^4.20.0",
    "typescript": "^5.5.0",
    "vitest": "^2.1.0",
    "yaml": "^2.5.0"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node", "vitest"]
  },
  "include": [
    ".vitepress/**/*.ts",
    ".vitepress/**/*.vue",
    "scripts/**/*.ts",
    "tests/**/*.ts"
  ]
}
```

Create `.gitignore`:

```gitignore
node_modules/
.vitepress/cache/
.vitepress/dist/
.vitepress/generated/*.json
.vitepress/generated/sidebar.ts
*.log
.env
.env.local
```

- [ ] **Step 3: Add starter pages**

Create `index.md`:

```md
---
layout: home
title: lx的个人知识库
hero:
  name: lx的个人知识库
  text: 电源与电控学习笔记
  tagline: 把课程、仿真、工程记录和复盘整理成可搜索、可评论、可持续维护的知识库。
  actions:
    - theme: brand
      text: 浏览文章库
      link: /archive
    - theme: alt
      text: 关于 lx
      link: /about
features:
  - title: 电源控制
    details: UPS、PFC、LLC、三电平、采样与保护等电源控制主题。
  - title: 电机控制
    details: FOC、SVPWM、观测器、电流环与速度环等电控主题。
  - title: 离线写作
    details: 使用 Markdown 编写，脚本自动整理元数据、分类、归档和发布。
---
```

Create `archive.md`:

```md
---
title: 文章库
layout: page
comments: false
---

# 文章库

<ArchivePage />
```

Create `about.md`:

```md
---
title: 关于我
comments: false
---

# 关于我

这里是 lx 的个人知识库，用来整理电源控制、电机控制、仿真和工程学习记录。
```

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2563eb"/>
  <path d="M18 42h10l4-20 4 20h10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 4: Install dependencies**

Run:

```powershell
npm install
```

Expected: `package-lock.json` is created and install exits with code 0.

- [ ] **Step 5: Commit scaffold**

Run:

```powershell
git add .gitignore package.json package-lock.json tsconfig.json index.md archive.md about.md public/favicon.svg .vitepress/generated/.gitkeep
git commit -m "chore: scaffold VitePress knowledge blog"
```

Expected: Commit succeeds.

---

### Task 2: Add Default Content Directories and Category Metadata

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\power\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\motor\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\blog\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\projects\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\simulations\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\notes\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\uncategorized\.category.yml`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\power\getting-started.md`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\motor\getting-started.md`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\content\blog\hello.md`

- [ ] **Step 1: Create category metadata files**

Create `content/power/.category.yml`:

```yaml
category: 电源控制
source: power
defaultTags:
  - power-electronics
navTitle: 电源控制
visibility: public
order: 10
description: UPS、PFC、LLC、三电平逆变器、采样、保护和电源控制软件。
aliases:
  - 电源
  - power
```

Create `content/motor/.category.yml`:

```yaml
category: 电机控制
source: motor
defaultTags:
  - motor-control
navTitle: 电机控制
visibility: public
order: 20
description: FOC、SVPWM、观测器、控制环路、驱动器和电机控制工程记录。
aliases:
  - 电控
  - motor
```

Create `content/blog/.category.yml`:

```yaml
category: 随笔
source: blog
defaultTags:
  - blog
navTitle: 随笔
visibility: public
order: 60
description: 学习复盘、零散想法和阶段性记录。
```

Create `content/projects/.category.yml`:

```yaml
category: 项目归档
source: projects
defaultTags:
  - project
navTitle: 项目归档
visibility: public
order: 50
description: 可公开的工程项目、实验项目和代码阅读记录。
```

Create `content/simulations/.category.yml`:

```yaml
category: 仿真与实验
source: simulations
defaultTags:
  - simulation
navTitle: 仿真与实验
visibility: public
order: 30
description: Python、MATLAB、Simulink 和网页仿真实验记录。
```

Create `content/notes/.category.yml`:

```yaml
category: 工程笔记
source: notes
defaultTags:
  - engineering-notes
navTitle: 工程笔记
visibility: public
order: 40
description: 调试、工具链、读手册、工程实践和排错记录。
```

Create `content/uncategorized/.category.yml`:

```yaml
category: 未分类
source: uncategorized
defaultTags: []
navTitle: 未分类
visibility: public
order: 999
description: 元数据不完整或暂未整理的文章。
```

- [ ] **Step 2: Add starter articles**

Create `content/power/getting-started.md`:

```md
---
title: 电源控制入口
date: 2026-06-30
category: 电源控制
tags:
  - UPS
  - PFC
  - LLC
source: power
status: learning
visibility: public
summary: 电源控制方向的知识库入口。
---

# 电源控制入口

这里会整理 UPS、PFC、LLC、三电平逆变器、采样、保护和控制软件相关笔记。
```

Create `content/motor/getting-started.md`:

```md
---
title: 电机控制入口
date: 2026-06-30
category: 电机控制
tags:
  - FOC
  - SVPWM
  - Observer
source: motor
status: learning
visibility: public
summary: 电机控制方向的知识库入口。
---

# 电机控制入口

这里会整理 FOC、SVPWM、观测器、电流环、速度环和驱动器相关笔记。
```

Create `content/blog/hello.md`:

```md
---
title: 第一篇记录
date: 2026-06-30
category: 随笔
tags:
  - knowledge-base
source: blog
status: learning
visibility: public
summary: 这个知识库从离线 Markdown 写作和一键发布开始。
---

# 第一篇记录

这个知识库会先做好阅读、检索、评论和发布链路，再逐步迁移旧资料。
```

- [ ] **Step 3: Commit default content**

Run:

```powershell
git add content
git commit -m "content: add default knowledge categories"
```

Expected: Commit succeeds.

---

### Task 3: Implement Metadata Parsing and Completion

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\types.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\paths.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\frontmatter.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\tests\kb\frontmatter.test.ts`

- [ ] **Step 1: Write failing tests for frontmatter behavior**

Create `tests/kb/frontmatter.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import {
  completeArticleData,
  extractTitleFromMarkdown,
  parseMarkdown,
  serializeMarkdown
} from '../../scripts/kb/frontmatter'

describe('frontmatter helpers', () => {
  it('parses YAML frontmatter without rendering it as body text', () => {
    const parsed = parseMarkdown(`---
title: Existing
tags:
  - PWM
---

# Body Title

Body text.`)

    expect(parsed.data.title).toBe('Existing')
    expect(parsed.body.trim()).toBe('# Body Title\n\nBody text.')
  })

  it('extracts title from first heading when frontmatter has no title', () => {
    expect(extractTitleFromMarkdown('# Buck 变换器\n\nContent')).toBe('Buck 变换器')
  })

  it('fills only missing fields and preserves user-authored metadata', () => {
    const completed = completeArticleData(
      {
        title: '手写标题',
        category: '自定义分类',
        tags: ['Manual'],
        source: 'manual'
      },
      {
        title: '目录标题',
        category: '电源控制',
        tags: ['power-electronics'],
        source: 'power',
        visibility: 'public'
      },
      {
        body: '# Fallback',
        relativePath: 'content/power/a.md',
        modifiedDate: '2026-06-30'
      }
    )

    expect(completed.title).toBe('手写标题')
    expect(completed.category).toBe('自定义分类')
    expect(completed.tags).toEqual(['Manual'])
    expect(completed.source).toBe('manual')
    expect(completed.visibility).toBe('public')
    expect(completed.date).toBe('2026-06-30')
  })

  it('falls back to uncategorized when no category exists', () => {
    const completed = completeArticleData(
      {},
      {},
      {
        body: '# Untitled',
        relativePath: 'content/random/a.md',
        modifiedDate: '2026-06-30'
      }
    )

    expect(completed.category).toBe('未分类')
    expect(completed.source).toBe('random')
  })

  it('serializes completed metadata above the original body', () => {
    const output = serializeMarkdown(
      {
        title: 'Buck',
        date: '2026-06-30',
        category: '电源控制',
        tags: ['Buck'],
        source: 'power',
        status: 'learning',
        visibility: 'public',
        summary: 'Buck note'
      },
      '# Buck\n'
    )

    expect(output).toContain('title: Buck')
    expect(output).toContain('category: 电源控制')
    expect(output.endsWith('# Buck\n')).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```powershell
npm test -- tests/kb/frontmatter.test.ts
```

Expected: FAIL because `scripts/kb/frontmatter.ts` does not exist.

- [ ] **Step 3: Implement shared types and paths**

Create `scripts/kb/types.ts`:

```ts
export type Visibility = 'public' | 'hidden' | 'private' | string

export interface CategoryDefaults {
  category?: string
  source?: string
  defaultTags?: string[]
  navTitle?: string
  visibility?: Visibility
  order?: number
  slug?: string
  description?: string
  aliases?: string[]
  exclude?: boolean
  [key: string]: unknown
}

export interface ArticleFrontmatter {
  title?: string
  date?: string
  updated?: string
  category?: string
  tags?: string[]
  source?: string
  status?: string
  visibility?: Visibility
  summary?: string
  comments?: boolean
  [key: string]: unknown
}

export interface ArticleRecord {
  title: string
  date: string
  updated?: string
  category: string
  tags: string[]
  source: string
  status: string
  visibility: Visibility
  summary: string
  path: string
  url: string
  body: string
}

export interface CompletionContext {
  body: string
  relativePath: string
  modifiedDate: string
}
```

Create `scripts/kb/paths.ts`:

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const thisFile = fileURLToPath(import.meta.url)
export const repoRoot = path.resolve(path.dirname(thisFile), '../..')
export const contentRoot = path.join(repoRoot, 'content')
export const generatedRoot = path.join(repoRoot, '.vitepress', 'generated')

export function toPosixPath(value: string): string {
  return value.split(path.sep).join('/')
}

export function stripMarkdownExtension(value: string): string {
  return value.replace(/\.md$/i, '')
}
```

- [ ] **Step 4: Implement frontmatter helpers**

Create `scripts/kb/frontmatter.ts`:

```ts
import matter from 'gray-matter'
import YAML from 'yaml'
import type { ArticleFrontmatter, CategoryDefaults, CompletionContext } from './types'

export interface ParsedMarkdown {
  data: ArticleFrontmatter
  body: string
}

export function parseMarkdown(input: string): ParsedMarkdown {
  const parsed = matter(input)
  return {
    data: parsed.data as ArticleFrontmatter,
    body: parsed.content.replace(/^\r?\n/, '')
  }
}

export function extractTitleFromMarkdown(body: string): string | undefined {
  const heading = body.match(/^#\s+(.+)$/m)
  return heading?.[1]?.trim()
}

export function sourceFromPath(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/')
  const parts = normalized.split('/')
  const contentIndex = parts.indexOf('content')
  return parts[contentIndex + 1] || parts[0] || 'manual'
}

export function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean)
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  }
  return []
}

export function completeArticleData(
  fileData: ArticleFrontmatter,
  directoryDefaults: Partial<CategoryDefaults>,
  context: CompletionContext
): Required<Pick<ArticleFrontmatter, 'title' | 'date' | 'category' | 'tags' | 'source' | 'status' | 'visibility' | 'summary'>> &
  ArticleFrontmatter {
  const tags = normalizeTags(fileData.tags)
  const defaultTags = normalizeTags(directoryDefaults.defaultTags)
  const title = fileData.title || directoryDefaults.title as string | undefined || extractTitleFromMarkdown(context.body) || filenameTitle(context.relativePath)
  const category = fileData.category || directoryDefaults.category || '未分类'
  const source = fileData.source || directoryDefaults.source || sourceFromPath(context.relativePath)
  const summary = fileData.summary || firstParagraph(context.body) || title

  return {
    ...directoryDefaults,
    ...fileData,
    title,
    date: fileData.date || context.modifiedDate,
    category,
    tags: tags.length > 0 ? tags : defaultTags,
    source,
    status: fileData.status || 'learning',
    visibility: fileData.visibility || directoryDefaults.visibility || 'public',
    summary
  }
}

export function serializeMarkdown(data: ArticleFrontmatter, body: string): string {
  const yaml = YAML.stringify(data, {
    lineWidth: 0,
    defaultStringType: 'PLAIN'
  }).trim()
  return `---\n${yaml}\n---\n\n${body.replace(/^\r?\n/, '')}`
}

function filenameTitle(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/')
  const filename = normalized.split('/').pop() || 'untitled'
  return filename.replace(/\.md$/i, '').replace(/[-_]+/g, ' ')
}

function firstParagraph(body: string): string | undefined {
  const withoutHeading = body.replace(/^#\s+.+$/m, '').trim()
  const paragraph = withoutHeading.split(/\n\s*\n/).map((part) => part.trim()).find(Boolean)
  return paragraph?.replace(/\s+/g, ' ').slice(0, 160)
}
```

- [ ] **Step 5: Run tests and verify pass**

Run:

```powershell
npm test -- tests/kb/frontmatter.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit metadata parsing**

Run:

```powershell
git add scripts/kb/types.ts scripts/kb/paths.ts scripts/kb/frontmatter.ts tests/kb/frontmatter.test.ts
git commit -m "feat: add knowledge metadata parsing"
```

Expected: Commit succeeds.

---

### Task 4: Implement Directory Metadata and Article Scanning

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\category.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\articles.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\tests\kb\category.test.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\tests\kb\articles.test.ts`

- [ ] **Step 1: Write failing tests for inherited category metadata**

Create `tests/kb/category.test.ts`:

```ts
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadInheritedCategoryDefaults } from '../../scripts/kb/category'

describe('category metadata', () => {
  it('inherits parent metadata and lets child metadata override it', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-category-'))
    const content = path.join(root, 'content')
    const child = path.join(content, 'power', 'pfc')
    await fs.mkdir(child, { recursive: true })
    await fs.writeFile(path.join(content, 'power', '.category.yml'), 'category: 电源控制\nsource: power\norder: 10\n')
    await fs.writeFile(path.join(child, '.category.yml'), 'category: PFC\nslug: pfc\n')

    const defaults = await loadInheritedCategoryDefaults(path.join(child, 'note.md'), content)

    expect(defaults.category).toBe('PFC')
    expect(defaults.source).toBe('power')
    expect(defaults.order).toBe(10)
    expect(defaults.slug).toBe('pfc')
  })
})
```

Create `tests/kb/articles.test.ts`:

```ts
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'

describe('article scanning', () => {
  it('scans markdown files, completes missing metadata, and excludes private articles from public records', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-articles-'))
    const content = path.join(root, 'content')
    await fs.mkdir(path.join(content, 'power'), { recursive: true })
    await fs.writeFile(path.join(content, 'power', '.category.yml'), 'category: 电源控制\nsource: power\nvisibility: public\n')
    await fs.writeFile(path.join(content, 'power', 'public.md'), '# Public Note\n\nVisible body.')
    await fs.writeFile(path.join(content, 'power', 'private.md'), '---\nvisibility: private\n---\n\n# Private Note\n')

    const result = await scanArticles({ contentRoot: content })

    expect(result.articles).toHaveLength(1)
    expect(result.articles[0].title).toBe('Public Note')
    expect(result.articles[0].category).toBe('电源控制')
    expect(result.warnings.some((warning) => warning.includes('private.md'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```powershell
npm test -- tests/kb/category.test.ts tests/kb/articles.test.ts
```

Expected: FAIL because `category.ts` and `articles.ts` do not exist.

- [ ] **Step 3: Implement inherited category metadata**

Create `scripts/kb/category.ts`:

```ts
import fs from 'node:fs/promises'
import path from 'node:path'
import YAML from 'yaml'
import type { CategoryDefaults } from './types'

export async function loadInheritedCategoryDefaults(filePath: string, contentRoot: string): Promise<CategoryDefaults> {
  const absoluteContentRoot = path.resolve(contentRoot)
  const absoluteFilePath = path.resolve(filePath)
  const startDir = path.dirname(absoluteFilePath)
  const dirs: string[] = []

  let current = startDir
  while (current.startsWith(absoluteContentRoot)) {
    dirs.unshift(current)
    if (current === absoluteContentRoot) break
    current = path.dirname(current)
  }

  const merged: CategoryDefaults = {}
  for (const dir of dirs) {
    const categoryFile = path.join(dir, '.category.yml')
    try {
      const raw = await fs.readFile(categoryFile, 'utf8')
      Object.assign(merged, YAML.parse(raw) as CategoryDefaults)
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code !== 'ENOENT') throw error
    }
  }

  return merged
}
```

- [ ] **Step 4: Implement article scanning**

Create `scripts/kb/articles.ts`:

```ts
import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { contentRoot as defaultContentRoot, stripMarkdownExtension, toPosixPath } from './paths'
import { loadInheritedCategoryDefaults } from './category'
import { completeArticleData, parseMarkdown, serializeMarkdown } from './frontmatter'
import type { ArticleFrontmatter, ArticleRecord } from './types'

export interface ScanOptions {
  contentRoot?: string
  includeHidden?: boolean
}

export interface ScanResult {
  articles: ArticleRecord[]
  warnings: string[]
}

export interface MarkdownFileRecord {
  absolutePath: string
  relativePath: string
  data: ArticleFrontmatter
  completed: ArticleFrontmatter
  body: string
  warnings: string[]
}

export async function scanMarkdownFiles(options: ScanOptions = {}): Promise<MarkdownFileRecord[]> {
  const root = options.contentRoot || defaultContentRoot
  const files = await fg('**/*.md', {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**']
  })

  const records: MarkdownFileRecord[] = []
  for (const absolutePath of files.sort()) {
    const relativePath = toPosixPath(path.relative(path.dirname(root), absolutePath))
    const raw = await fs.readFile(absolutePath, 'utf8')
    const parsed = parseMarkdown(raw)
    const stats = await fs.stat(absolutePath)
    const modifiedDate = stats.mtime.toISOString().slice(0, 10)
    const defaults = await loadInheritedCategoryDefaults(absolutePath, root)
    const completed = completeArticleData(parsed.data, defaults, {
      body: parsed.body,
      relativePath,
      modifiedDate
    })

    records.push({
      absolutePath,
      relativePath,
      data: parsed.data,
      completed,
      body: parsed.body,
      warnings: validateArticle(relativePath, completed)
    })
  }
  return records
}

export async function scanArticles(options: ScanOptions = {}): Promise<ScanResult> {
  const records = await scanMarkdownFiles(options)
  const warnings: string[] = []
  const articles: ArticleRecord[] = []

  for (const record of records) {
    warnings.push(...record.warnings)
    if (record.completed.visibility === 'private') {
      warnings.push(`${record.relativePath}: skipped because visibility is private`)
      continue
    }
    if (record.completed.visibility === 'hidden' && !options.includeHidden) {
      warnings.push(`${record.relativePath}: skipped because visibility is hidden`)
      continue
    }

    const url = '/' + stripMarkdownExtension(toPosixPath(path.relative(options.contentRoot || defaultContentRoot, record.absolutePath)))
    articles.push({
      title: String(record.completed.title),
      date: String(record.completed.date),
      updated: record.completed.updated ? String(record.completed.updated) : undefined,
      category: String(record.completed.category || '未分类'),
      tags: Array.isArray(record.completed.tags) ? record.completed.tags.map(String) : [],
      source: String(record.completed.source || 'manual'),
      status: String(record.completed.status || 'learning'),
      visibility: String(record.completed.visibility || 'public'),
      summary: String(record.completed.summary || record.completed.title),
      path: record.relativePath,
      url,
      body: record.body
    })
  }

  articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  return { articles, warnings }
}

export async function writeCompletedFrontmatter(options: ScanOptions = {}): Promise<string[]> {
  const records = await scanMarkdownFiles(options)
  const changed: string[] = []

  for (const record of records) {
    const missingKeys = Object.keys(record.completed).filter((key) => record.data[key] === undefined)
    if (missingKeys.length === 0) continue
    const next = serializeMarkdown({ ...record.data, ...pickMissing(record.data, record.completed) }, record.body)
    await fs.writeFile(record.absolutePath, next, 'utf8')
    changed.push(record.relativePath)
  }

  return changed
}

function pickMissing(existing: ArticleFrontmatter, completed: ArticleFrontmatter): ArticleFrontmatter {
  const missing: ArticleFrontmatter = {}
  for (const [key, value] of Object.entries(completed)) {
    if (existing[key] === undefined) missing[key] = value
  }
  return missing
}

function validateArticle(relativePath: string, article: ArticleFrontmatter): string[] {
  const warnings: string[] = []
  if (!article.title) warnings.push(`${relativePath}: missing title`)
  if (!article.date) warnings.push(`${relativePath}: missing date`)
  if (!article.summary) warnings.push(`${relativePath}: missing summary`)
  if (!article.category || article.category === '未分类') warnings.push(`${relativePath}: categorized as 未分类`)
  return warnings
}
```

- [ ] **Step 5: Run tests and verify pass**

Run:

```powershell
npm test -- tests/kb/category.test.ts tests/kb/articles.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit scanning logic**

Run:

```powershell
git add scripts/kb/category.ts scripts/kb/articles.ts tests/kb/category.test.ts tests/kb/articles.test.ts
git commit -m "feat: scan knowledge articles"
```

Expected: Commit succeeds.

---

### Task 5: Add Validation, Fix, and Generated Index Scripts

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\check.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\fix.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\generate.ts`

- [ ] **Step 1: Implement non-mutating validation**

Create `scripts/kb/check.ts`:

```ts
import { scanArticles } from './articles'

const result = await scanArticles()
for (const warning of result.warnings) {
  console.warn(`warning: ${warning}`)
}

const publicCount = result.articles.filter((article) => article.visibility === 'public').length
console.log(`checked ${result.articles.length} indexed articles (${publicCount} public)`)

const hardFailures = result.warnings.filter((warning) => warning.includes('E:\\') || warning.includes('visibility is private'))
if (hardFailures.length > 0) {
  console.warn(`review recommended for ${hardFailures.length} warnings`)
}
```

- [ ] **Step 2: Implement safe metadata fix**

Create `scripts/kb/fix.ts`:

```ts
import { writeCompletedFrontmatter } from './articles'

const changed = await writeCompletedFrontmatter()
if (changed.length === 0) {
  console.log('no frontmatter changes needed')
} else {
  console.log(`updated frontmatter in ${changed.length} files:`)
  for (const file of changed) console.log(`- ${file}`)
}
```

- [ ] **Step 3: Implement generated JSON and sidebar output**

Create `scripts/kb/generate.ts`:

```ts
import fs from 'node:fs/promises'
import path from 'node:path'
import { generatedRoot } from './paths'
import { scanArticles } from './articles'
import type { ArticleRecord } from './types'

const result = await scanArticles()
await fs.mkdir(generatedRoot, { recursive: true })

const articles = result.articles.filter((article) => article.visibility === 'public')
const categories = groupCounts(articles.map((article) => article.category))
const tags = groupCounts(articles.flatMap((article) => article.tags))
const archive = buildArchive(articles)
const sidebar = buildSidebar(articles)

await fs.writeFile(path.join(generatedRoot, 'articles.json'), JSON.stringify(articles, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'tags.json'), JSON.stringify(tags, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'archive.json'), JSON.stringify(archive, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'sidebar.ts'), sidebar, 'utf8')

console.log(`generated indexes for ${articles.length} public articles`)

function groupCounts(values: string[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

function buildArchive(articles: ArticleRecord[]): Array<{ month: string; count: number }> {
  return groupCounts(articles.map((article) => article.date.slice(0, 7))).map(({ name, count }) => ({
    month: name,
    count
  }))
}

function buildSidebar(articles: ArticleRecord[]): string {
  const byCategory = new Map<string, ArticleRecord[]>()
  for (const article of articles) {
    const list = byCategory.get(article.category) || []
    list.push(article)
    byCategory.set(article.category, list)
  }

  const sections = [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([text, items]) => ({
      text,
      collapsed: true,
      items: items.map((article) => ({ text: article.title, link: article.url }))
    }))

  return `export const generatedSidebar = ${JSON.stringify(sections, null, 2)}\n`
}
```

- [ ] **Step 4: Run generation**

Run:

```powershell
npm run kb:check
npm run kb:fix
npm run kb:generate
```

Expected:

- `kb:check` exits 0 and prints warnings only for acceptable starter content gaps.
- `kb:fix` either reports no changes or fills only missing fields.
- `.vitepress/generated/articles.json`, `categories.json`, `tags.json`, `archive.json`, and `sidebar.ts` are created.

- [ ] **Step 5: Commit scripts and generated sidebar**

Run:

```powershell
git add scripts/kb/check.ts scripts/kb/fix.ts scripts/kb/generate.ts .vitepress/generated/.gitkeep
git add -f .vitepress/generated/sidebar.ts
git commit -m "feat: generate knowledge indexes"
```

Expected: Commit succeeds. JSON generated files remain ignored; `sidebar.ts` is force-added because VitePress config imports it.

---

### Task 6: Configure VitePress Theme, Search, Archive, and Comments

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\config.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\theme\index.ts`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\theme\style.css`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\theme\Layout.vue`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\theme\components\ArchivePage.vue`
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.vitepress\theme\components\GiscusComments.vue`

- [ ] **Step 1: Create VitePress config**

Create `.vitepress/config.ts`:

```ts
import { defineConfig } from 'vitepress'
import { generatedSidebar } from './generated/sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'lx的个人知识库',
  description: '电源控制、电机控制、仿真和工程学习记录',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '电源控制', link: '/content/power/getting-started' },
      { text: '电机控制', link: '/content/motor/getting-started' },
      { text: '文章库', link: '/archive' },
      { text: '关于我', link: '/about' }
    ],
    sidebar: generatedSidebar,
    outline: {
      level: [2, 3],
      label: '目录'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/null42' }
    ],
    footer: {
      message: 'Powered by VitePress. Written offline, published with care.',
      copyright: 'Copyright © 2026 lx'
    }
  }
})
```

- [ ] **Step 2: Add theme entry**

Create `.vitepress/theme/index.ts`:

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ArchivePage from './components/ArchivePage.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ArchivePage', ArchivePage)
  }
} satisfies Theme
```

- [ ] **Step 3: Add layout wrapper with comments slot**

Create `.vitepress/theme/Layout.vue`:

```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import GiscusComments from './components/GiscusComments.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <GiscusComments
        v-if="frontmatter.comments !== false && page.relativePath.startsWith('content/')"
        :term="page.relativePath"
      />
    </template>
  </Layout>
</template>
```

- [ ] **Step 4: Add archive component**

Create `.vitepress/theme/components/ArchivePage.vue`:

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import articles from '../../generated/articles.json'

interface Article {
  title: string
  date: string
  category: string
  tags: string[]
  summary: string
  url: string
  body: string
}

const query = ref('')
const category = ref('全部')
const month = ref('全部')

const typedArticles = articles as Article[]
const categories = computed(() => ['全部', ...Array.from(new Set(typedArticles.map((article) => article.category))).sort()])
const months = computed(() => ['全部', ...Array.from(new Set(typedArticles.map((article) => article.date.slice(0, 7)))).sort().reverse()])

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return typedArticles.filter((article) => {
    const matchesCategory = category.value === '全部' || article.category === category.value
    const matchesMonth = month.value === '全部' || article.date.startsWith(month.value)
    const haystack = [
      article.title,
      article.summary,
      article.category,
      ...article.tags,
      article.body
    ].join(' ').toLowerCase()
    const matchesQuery = !needle || haystack.includes(needle)
    return matchesCategory && matchesMonth && matchesQuery
  })
})
</script>

<template>
  <section class="kb-archive">
    <div class="kb-filterbar">
      <input v-model="query" class="kb-search-input" aria-label="关键词搜索" title="搜索 Buck / FOC / SVPWM / 采样时序" />
      <select v-model="category" class="kb-select" aria-label="分类">
        <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="month" class="kb-select" aria-label="时间">
        <option v-for="item in months" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="kb-result-count">{{ filtered.length }} 篇文章</div>

    <div class="kb-article-list">
      <a v-for="article in filtered" :key="article.url" class="kb-article-card" :href="article.url">
        <span class="kb-article-date">{{ article.date }}</span>
        <strong>{{ article.title }}</strong>
        <span class="kb-article-summary">{{ article.summary }}</span>
        <span class="kb-tags">
          <span v-for="tag in article.tags" :key="tag" class="kb-tag">{{ tag }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
```

- [ ] **Step 5: Add giscus component**

Create `.vitepress/theme/components/GiscusComments.vue`:

```vue
<script setup lang="ts">
import Giscus from '@giscus/vue'

defineProps<{
  term: string
}>()

const repo = import.meta.env.VITE_GISCUS_REPO
const repoId = import.meta.env.VITE_GISCUS_REPO_ID
const category = import.meta.env.VITE_GISCUS_CATEGORY || 'General'
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID

const enabled = Boolean(repo && repoId && categoryId)
</script>

<template>
  <section class="kb-comments">
    <Giscus
      v-if="enabled"
      :repo="repo"
      :repo-id="repoId"
      :category="category"
      :category-id="categoryId"
      mapping="specific"
      :term="term"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
    />
    <p v-else class="kb-comments-note">
      留言区会在配置 giscus 后启用。发现问题时，可以先在本地 Markdown 旁记录，后续统一修正。
    </p>
  </section>
</template>
```

- [ ] **Step 6: Add visual style**

Create `.vitepress/theme/style.css`:

```css
:root {
  --vp-c-brand-1: #2563eb;
  --vp-c-brand-2: #3b82f6;
  --vp-c-brand-3: #60a5fa;
  --vp-c-bg: #fbfcff;
  --vp-c-bg-soft: #f5f8fc;
  --vp-font-family-base: "Inter", "Segoe UI", "Microsoft YaHei", system-ui, sans-serif;
  --vp-font-family-mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
}

.VPHome {
  background:
    radial-gradient(circle at 12% 18%, rgba(96, 165, 250, 0.16), transparent 28%),
    linear-gradient(135deg, #f8fbff 0%, #fffdf8 100%);
}

.VPFeature {
  border-radius: 8px !important;
}

.kb-archive {
  display: grid;
  gap: 18px;
}

.kb-filterbar {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(120px, 180px) minmax(120px, 160px);
  gap: 10px;
}

.kb-search-input,
.kb-select {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 10px 12px;
  font: inherit;
}

.kb-result-count {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.kb-article-list {
  display: grid;
  gap: 12px;
}

.kb-article-card {
  display: grid;
  gap: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px 16px;
  background: var(--vp-c-bg);
  color: inherit;
  text-decoration: none;
}

.kb-article-card:hover {
  border-color: var(--vp-c-brand-2);
}

.kb-article-date,
.kb-article-summary {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.kb-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.kb-tag {
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  font-size: 12px;
}

.kb-comments {
  margin-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

.kb-comments-note {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 720px) {
  .kb-filterbar {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 7: Build the site**

Run:

```powershell
npm run build
```

Expected: PASS and `.vitepress/dist` is generated.

- [ ] **Step 8: Commit VitePress theme**

Run:

```powershell
git add .vitepress/config.ts .vitepress/theme index.md archive.md about.md
git commit -m "feat: add knowledge blog theme"
```

Expected: Commit succeeds.

---

### Task 7: Add GitHub Pages Deployment Workflow

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\.github\workflows\deploy.yml`

- [ ] **Step 1: Add GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Validate metadata and build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate workflow syntax by running local build**

Run:

```powershell
npm run build
```

Expected: PASS. The workflow itself runs after pushing to GitHub.

- [ ] **Step 3: Commit deploy workflow**

Run:

```powershell
git add .github/workflows/deploy.yml
git commit -m "ci: deploy VitePress site to GitHub Pages"
```

Expected: Commit succeeds.

---

### Task 8: Add Migration Script for Existing Knowledge Bases

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\migrate.ts`

- [ ] **Step 1: Implement dry-run migration script**

Create `scripts/kb/migrate.ts`:

```ts
import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { contentRoot } from './paths'

interface MigrationSource {
  name: string
  root: string
  target: string
}

const sources: MigrationSource[] = [
  {
    name: 'power',
    root: 'E:\\gitee_CodeStorage\\学习\\电源',
    target: path.join(contentRoot, 'power')
  },
  {
    name: 'motor',
    root: 'E:\\gitee_CodeStorage\\学习\\MotorControl-main\\motor-learning-web',
    target: path.join(contentRoot, 'motor')
  }
]

const apply = process.argv.includes('--apply')
const includePatterns = ['**/*.md', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
const ignorePatterns = [
  '**/.git/**',
  '**/node_modules/**',
  '**/venv/**',
  '**/.venv/**',
  '**/dist/**',
  '**/build/**',
  '**/static/assets/**',
  '**/*.slxc',
  '**/*.exe',
  '**/*.zip'
]

for (const source of sources) {
  const files = await fg(includePatterns, {
    cwd: source.root,
    absolute: false,
    onlyFiles: true,
    ignore: ignorePatterns
  })

  console.log(`${apply ? 'migrating' : 'dry-run'} ${files.length} files from ${source.name}`)
  for (const file of files) {
    const from = path.join(source.root, file)
    const to = path.join(source.target, sanitizePath(file))
    if (!apply) {
      console.log(`[dry-run] ${from} -> ${to}`)
      continue
    }
    await fs.mkdir(path.dirname(to), { recursive: true })
    await fs.copyFile(from, to)
    console.log(`[copied] ${from} -> ${to}`)
  }
}

if (!apply) {
  console.log('dry-run only; rerun with npm run kb:migrate -- --apply to copy files')
}

function sanitizePath(value: string): string {
  return value
    .replace(/\\/g, '/')
    .split('/')
    .filter((part) => part && part !== '..')
    .join(path.sep)
}
```

- [ ] **Step 2: Run dry-run migration**

Run:

```powershell
npm run kb:migrate
```

Expected: Script prints planned copies and does not modify source directories or target content.

- [ ] **Step 3: Run applied migration only after reviewing dry-run output**

Run:

```powershell
npm run kb:migrate -- --apply
npm run kb:fix
npm run kb:generate
npm run build
```

Expected:

- Files are copied into `content/power/` and `content/motor/`.
- Source directories are unchanged.
- Metadata is safely completed only in copied files.
- Build passes.

- [ ] **Step 4: Commit migration tooling**

Run:

```powershell
git add scripts/kb/migrate.ts
git commit -m "feat: add knowledge migration script"
```

Expected: Commit succeeds. Do not commit bulk migrated content until it has been reviewed for public safety.

---

### Task 9: Add Publish Script

**Files:**
- Create: `E:\gitee_CodeStorage\学习\null42.github.io\scripts\kb\publish.ts`

- [ ] **Step 1: Implement guarded publish flow**

Create `scripts/kb/publish.ts`:

```ts
import { spawnSync } from 'node:child_process'

run('npm', ['run', 'kb:check'])
run('npm', ['run', 'kb:generate'])
run('npm', ['run', 'build'])

const status = commandOutput('git', ['status', '--short'])
if (!status.trim()) {
  console.log('nothing to publish')
  process.exit(0)
}

console.log(status)
run('git', ['add', '.'])
run('git', ['commit', '-m', `publish: update knowledge blog ${new Date().toISOString().slice(0, 10)}`])
run('git', ['push'])

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function commandOutput(command: string, args: string[]): string {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
  return result.stdout
}
```

- [ ] **Step 2: Validate publish script without pushing**

Run:

```powershell
npm run kb:check
npm run kb:generate
npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit publish script**

Run:

```powershell
git add scripts/kb/publish.ts
git commit -m "feat: add guarded publish script"
```

Expected: Commit succeeds.

---

### Task 10: Connect to GitHub Repository and Configure giscus

**Files:**
- Modify: `E:\gitee_CodeStorage\学习\null42.github.io\.env.example`
- Modify: GitHub repository settings, not local files.

- [ ] **Step 1: Create `.env.example`**

Create `.env.example`:

```env
VITE_GISCUS_REPO=null42/null42.github.io
VITE_GISCUS_REPO_ID=
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=
```

- [ ] **Step 2: Commit env example**

Run:

```powershell
git add .env.example
git commit -m "docs: document giscus environment variables"
```

Expected: Commit succeeds.

- [ ] **Step 3: Create GitHub repository**

In GitHub:

1. Create repository `null42.github.io` under account `null42`.
2. Keep it public if the final website should be public.
3. Enable GitHub Pages with GitHub Actions as source.
4. Enable Discussions.
5. Install/configure the giscus GitHub App for `null42/null42.github.io`.
6. Use `https://giscus.app/` to get `repoId` and `categoryId`.

- [ ] **Step 4: Add remote and push**

Run:

```powershell
git branch -M main
git remote add origin https://github.com/null42/null42.github.io.git
git push -u origin main
```

Expected: Push succeeds and GitHub Actions deploy starts.

- [ ] **Step 5: Configure giscus environment for local preview**

Create `.env.local` with real IDs:

```env
VITE_GISCUS_REPO=null42/null42.github.io
VITE_GISCUS_REPO_ID=PASTE_REAL_REPO_ID
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=PASTE_REAL_CATEGORY_ID
```

Do not commit `.env.local`.

- [ ] **Step 6: Verify local site**

Run:

```powershell
npm run dev
```

Expected: VitePress prints a local URL. Open it, check:

- Home page renders.
- Archive filters by keyword, category, and month.
- Article pages render without showing frontmatter as body text.
- Comments note or giscus widget appears below article pages.

---

### Task 11: Final Verification and Review

**Files:**
- No new files required.

- [ ] **Step 1: Run all automated checks**

Run:

```powershell
npm test
npm run kb:check
npm run kb:generate
npm run build
```

Expected: All commands exit 0.

- [ ] **Step 2: Inspect generated static output**

Run:

```powershell
Test-Path '.vitepress\dist\index.html'
Test-Path '.vitepress\dist\archive.html'
```

Expected: Both commands print `True`.

- [ ] **Step 3: Check git status**

Run:

```powershell
git status --short
```

Expected: only intended generated JSON files or local preview artifacts are untracked. Commit any intended source changes; do not commit `.env.local`, `.vitepress/dist`, or `.vitepress/generated/*.json`.

- [ ] **Step 4: Manual review checklist**

Check these in the browser:

- Homepage matches the approved A-structure/B-visual direction.
- Archive search works for `Buck`, `FOC`, and `SVPWM`.
- Category filter shows `电源控制` and `电机控制`.
- Month filter narrows results.
- A public article page shows comments area.
- Frontmatter does not appear in the article body.
- Mobile viewport does not overlap text or controls.

- [ ] **Step 5: Final commit if needed**

Run:

```powershell
git add .
git reset -- .env.local .vitepress/dist .vitepress/generated/articles.json .vitepress/generated/categories.json .vitepress/generated/tags.json .vitepress/generated/archive.json
git commit -m "chore: finalize knowledge blog foundation"
```

Expected: Commit succeeds if there are pending source changes. If there are no pending source changes, Git prints that there is nothing to commit.

---

## Self-Review Notes

- Spec coverage: project scaffolding, visual direction, offline Markdown editing, metadata completion, uncategorized fallback, search/filter/archive, comments, GitHub Pages deployment, migration safety, and publish flow are each covered by tasks.
- Public safety: migration is dry-run first, source folders are never mutated, private/hidden visibility is supported.
- Extensibility: directory metadata supports custom folders, unknown fields are preserved, and generated JSON is independent from the visual theme.
- Tests: metadata parsing, inheritance, and scanning have Vitest coverage before implementation.
- Known manual setup: GitHub repository creation, GitHub Pages source selection, Discussions, and giscus IDs require user account access.
