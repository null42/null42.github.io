---
title: Markdown 渲染验证
date: 2026-07-01
section: Playground
chapter: 00-Fixtures
category: 渲染验证
tags:
  - markdown
  - mermaid
  - svg
source: manual
status: reference
visibility: public
comments: false
summary: 用于验证 Markdown、Mermaid、SVG、表格、代码块和 callout 的测试页面。
---

# Markdown 渲染验证

## 表格

| 项目 | 说明 |
| --- | --- |
| PFC | 功率因数校正 |
| FOC | 磁场定向控制 |

## 任务列表

- [x] 支持 Markdown 基础语法
- [ ] 支持 Mermaid

## Callout

::: tip
这是 VitePress 容器语法。
:::

## Mermaid

```mermaid
flowchart LR
  A[Markdown] --> B[VitePress]
  B --> C[GitHub Pages]
```

## Math

Inline math: $i_d = 0$.

$$
u_q = R_s i_q + L_q \frac{di_q}{dt} + \omega_e \psi_f
$$

\[
T_e = \frac{3}{2} p \psi_f i_q
\]

## Unknown Fence

```unknown-diagram
current-loop -> speed-loop -> position-loop
```

## SVG

![控制延迟示意](/control-delay-timing.svg)

## 代码

```ts
const duty = vin / vout
```
