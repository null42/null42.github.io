# Content Model

Markdown is the editable source format for public articles. Frontmatter is metadata; it is used by scripts and pages but is not rendered as article body.

## Folder Rules

- `content/power`: power-electronics notes and migrated lessons.
- `content/motor`: motor-control notes and migrated simulation pages.
- `content/blog`: loose writing; classify with `type: technical` or `type: daily` when useful.
- `content/private`: local-only plaintext for encrypted articles. This folder is ignored by git except `.gitkeep`.
- `content/encrypted`: generated encrypted wrappers and payloads that can be published.

## Frontmatter

Use these fields when useful:

```yaml
title: Article title
date: 2026-07-02
updated: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
chapterOrder: 10
order: 20
category: 电源控制
type: concept
difficulty: intermediate
tags:
  - PFC
suggestedTags:
  - current-loop
source: power
sourcePath: lessons/example.html
status: learning
visibility: public
comments: true
summary: Short summary.
```

Scripts follow this rule: 只补缺失字段. Manual `tags`, `category`, `section`, `chapter`, `summary`, `visibility`, and article text win over generated defaults.

`suggestedTags` is advisory. `npm run kb:analyze` writes a report, not article frontmatter.
