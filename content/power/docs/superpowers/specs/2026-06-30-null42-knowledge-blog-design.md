---
date: 2026-06-30
category: 电源控制
source: power
visibility: public
title: null42 Personal Knowledge Blog Design
tags:
  - power-electronics
status: learning
summary: Build `null42.github.io` as lx's public personal knowledge blog for power electronics, motor control, simulations, engineering notes, and long-term learning rec
---

# null42 Personal Knowledge Blog Design

## Goal

Build `null42.github.io` as lx's public personal knowledge blog for power electronics, motor control, simulations, engineering notes, and long-term learning records.

The site should feel like a modern Chinese technical blog while keeping the structure and maintainability of a documentation site. The first implementation should favor offline Markdown editing and one-command publishing over an online editing backend.

## Non-Goals

- Do not build a public website admin panel in the first version.
- Do not require a server-side runtime on GitHub Pages.
- Do not force every article into fixed categories if the user follows the metadata contract.
- Do not rewrite user-authored metadata once it exists.
- Do not migrate unrelated source code, binaries, build outputs, or private/company material into the public site.

## Recommended Stack

- Site generator: VitePress.
- Hosting: GitHub Pages from the `null42.github.io` repository.
- Deployment: GitHub Actions building the static site and publishing the generated output.
- Comments: giscus backed by GitHub Discussions.
- Search: VitePress local search for the first version.
- Writing workflow: offline Markdown editing with VS Code, Obsidian, Typora, or any plain-text editor.

This stack matches GitHub Pages' static hosting model and keeps publishing simple: edit Markdown locally, run validation, build, and push.

## Visual Direction

Use a VitePress blog/documentation hybrid as the foundation, with warmer Chinese personal-blog styling.

Design qualities:

- Clear technical reading experience for long articles.
- A homepage that feels personal, not like a generic docs portal.
- Soft but restrained color, avoiding an overdecorated theme.
- Category and tag surfaces that are easy to scan.
- Article pages that prioritize body text, table of contents, math, code blocks, Mermaid diagrams, and comments.

The selected direction is: A-style structure with B-style warmth.

## Content Model

The site owns a normalized `content/` tree. Source material from existing knowledge bases is copied or synchronized into this tree rather than served directly from scattered local directories.

Default structure:

```text
content/
  power/
  motor/
  blog/
  projects/
  simulations/
  notes/
  uncategorized/
```

These directories are defaults, not hard limits. Users may create new directories as long as they provide either a directory metadata file or valid file-level frontmatter.

Suggested first navigation:

- Home
- Power Electronics
- Motor Control
- Simulations
- Engineering Notes
- Projects
- Blog
- Archive
- About

Chinese labels can be used in the UI:

- 首页
- 电源控制
- 电机控制
- 仿真与实验
- 工程笔记
- 项目归档
- 随笔
- 文章库
- 关于我

## Directory Metadata

Each content directory may define defaults in a metadata file:

```text
content/power/.category.yml
```

Example:

```yaml
category: 电源控制
source: power
defaultTags:
  - power-electronics
navTitle: 电源控制
visibility: public
```

Optional fields:

- `order`: controls category or sidebar ordering.
- `slug`: stable URL segment when the folder name is not ideal.
- `description`: category landing-page summary.
- `aliases`: alternative category names accepted during validation.
- `exclude`: prevents a folder from being published.

Rules:

- Directory metadata applies recursively.
- More specific child directory metadata overrides parent defaults.
- File-level frontmatter overrides directory defaults.
- Missing fields are filled by the organizing script.
- Existing file-level fields are not rewritten.
- Unknown metadata fields are preserved and exposed to generated indexes for future use.

This leaves room for user-created directories such as `content/control-theory/`, `content/interview/`, or `content/readings/` without code changes.

## File Frontmatter

Every article should use YAML frontmatter:

```md
---
title: Buck 变换器基础
date: 2026-06-30
category: 电源控制
tags:
  - Buck
  - PWM
  - CCM
source: power
status: evergreen
visibility: public
summary: 从占空比、电感电流和连续导通模式理解 Buck 变换器。
---

# Buck 变换器基础
```

The frontmatter is metadata. It is read by VitePress and build scripts but is not rendered as article body text.

Recommended fields:

- `title`: required for a polished index.
- `date`: used for sorting and archive pages.
- `updated`: optional, used when a long-lived note is revised.
- `category`: primary grouping.
- `tags`: searchable keywords.
- `source`: origin such as `power`, `motor`, `blog`, or `manual`.
- `status`: `draft`, `evergreen`, `learning`, `archived`, or another user-defined value.
- `visibility`: `public`, `hidden`, or `private`.
- `summary`: short index description.

The script should accept additional user-defined fields and preserve them.

## Metadata Completion Policy

The organizing script only fills missing fields. It must not overwrite fields already written by the user.

Completion order:

1. Parse file frontmatter.
2. Load inherited directory metadata.
3. Fill missing fields from directory defaults.
4. Infer safe fallbacks:
   - `title` from the first Markdown heading or filename.
   - `date` from Git history when available, otherwise file modified time.
   - `category` as `未分类` when no valid category exists.
   - `source` from the top-level content directory when possible.
5. Write missing frontmatter fields back to the file only when the user runs a fix command.

Validation command should be non-mutating by default. A separate fix command should apply safe additions.

Example commands:

```powershell
npm run kb:check
npm run kb:fix
npm run kb:publish
```

## Uncategorized Behavior

Invalid or missing metadata should not break publication.

Rules:

- Article remains buildable.
- Article appears under `未分类`.
- The script prints a warning with the file path and missing fields.
- The generated archive includes a visible `未分类` filter so cleanup is easy.

This keeps the site forgiving during fast note taking.

## Archive, Filtering, and Search

The site should provide an article index with:

- Keyword search across title, summary, tags, category, and body.
- Category filtering.
- Tag filtering.
- Date filtering by year and month.
- Default sort by newest first.
- Optional status filtering, useful for `draft`, `learning`, or `evergreen`.

First version can use generated JSON indexes plus VitePress local search. The generated index should be stable and framework-agnostic enough to reuse later if the UI grows.

Generated files:

```text
.vitepress/generated/articles.json
.vitepress/generated/categories.json
.vitepress/generated/tags.json
.vitepress/generated/archive.json
.vitepress/generated/sidebar.ts
```

## Comments

Use giscus for article comments and issue-style feedback.

Behavior:

- Comments appear at the bottom of public article pages.
- giscus maps pages to GitHub Discussions.
- Discussions act as the feedback inbox for typos, broken links, unclear explanations, and future improvement notes.
- Markdown remains the source of truth. Fixes are made locally and republished.

Setup requirements:

- Enable GitHub Discussions on the `null42.github.io` repository.
- Install/configure the giscus GitHub App for the repository.
- Store giscus repository ID, category ID, and mapping config in VitePress theme config.

## Publishing Workflow

Local workflow:

1. Write or edit Markdown under `content/`.
2. Run `npm run kb:check`.
3. Run `npm run kb:fix` if safe metadata additions are desired.
4. Run `npm run dev` for local preview.
5. Run `npm run kb:publish` to validate, build, commit, and push.

CI workflow:

1. GitHub Actions installs dependencies.
2. Runs metadata validation.
3. Builds VitePress.
4. Publishes static output to GitHub Pages.

The local publish script should stop before pushing if validation or build fails.

## Migration Plan

Initial sources:

- `E:\gitee_CodeStorage\学习\电源`
- `E:\gitee_CodeStorage\学习\MotorControl-main\motor-learning-web`

Migration should be selective.

Include:

- Markdown knowledge notes.
- HTML lessons that are safe for public release.
- Diagrams and images referenced by included notes.
- Small simulation pages or components only when they can run statically.

Exclude by default:

- Build outputs.
- Virtual environments.
- Large generated static bundles.
- Firmware vendor libraries.
- Private or company-sensitive material.
- Unreviewed notes with unclear public status.

The first migration should copy into normalized folders and add missing metadata. It should not mutate the original knowledge base folders.

## Safety and Optimization Points

Public/private guard:

- Default unknown material to `visibility: hidden` or route it through a review list before public publishing.
- Add a check for obvious sensitive terms before publishing.

Encoding:

- Treat Markdown as UTF-8.
- Detect and report files that cannot be decoded cleanly.
- Render-check Chinese titles and navigation before publishing.

Links:

- Validate internal Markdown links.
- Copy referenced images into public assets when needed.
- Warn on absolute Windows paths in published content.

Content quality:

- Warn when an article has no title, no summary, or too many uncategorized tags.
- Generate a broken-link report and metadata report.

Performance:

- Keep search indexes small enough for GitHub Pages.
- Avoid bundling unnecessary generated files from existing web apps.

Maintainability:

- Keep theme customizations small.
- Prefer VitePress defaults where they solve the problem.
- Keep content scripts independent from visual theme code.

## Acceptance Criteria

- `null42.github.io` can be built locally as a static site.
- The homepage uses the approved A-structure/B-visual direction.
- Articles can be written offline in Markdown.
- Metadata is hidden from rendered article bodies.
- Missing metadata is filled only when absent.
- Invalid or incomplete articles fall back to `未分类`.
- Archive page supports category, time, tag, and keyword lookup.
- giscus comments appear on public article pages.
- A one-command publish flow validates, builds, and pushes.
- Existing source knowledge bases are not modified during migration.
