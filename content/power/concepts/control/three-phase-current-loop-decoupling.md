---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：三相 dq 电流环解耦
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0039-three-phase-current-loop-decoupling.html` 的源稿。
---

# 概念：三相 dq 电流环解耦

本页是 `lessons/0039-three-phase-current-loop-decoupling.html` 的源稿。

## 它是什么

dq 电流环解耦（dq current loop decoupling）用前馈项抵消旋转坐标系中的交叉耦合，让 id 和 iq 更接近两个独立控制对象。

## 为什么 UPS/PCS 需要它

Vienna PFC、三相逆变器和 PCS 并网电流控制都需要快速、可解释的电流环。无解耦时 id 阶跃会扰动 iq。

## 数学形式

```text
vd_ref = PI(id_ref - id) - omega * L * iq + ed
vq_ref = PI(iq_ref - iq) + omega * L * id + eq
```

## 一个仿真任务

让 id_ref 阶跃、iq_ref 保持 0，对比有无解耦时 iq 的暂态扰动。

## 验收标准

- 能解释 omega * L * i 的来源。
- 能说明解耦项符号必须和 Park 变换定义一致。
- 能区分解耦、前馈、限幅和 PI 的职责。

## 导师问题

阅读真实代码时，如何确认电流环 PI、解耦、前馈和限幅的执行顺序？
