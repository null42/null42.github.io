---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：PCS LCL 滤波器与有源阻尼
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0045-pcs-lcl-filter-active-damping.html` 的源稿。
---

# 概念：PCS LCL 滤波器与有源阻尼

本页是 `lessons/0045-pcs-lcl-filter-active-damping.html` 的源稿。

## 它是什么

LCL 滤波器（LCL filter）由变流器侧电感、滤波电容和电网侧电感组成。有源阻尼（active damping）用反馈或数字滤波抑制 LCL 谐振。

## 为什么 UPS/PCS 需要它

PCS 并网电流谐波要求高。LCL 高频衰减强，但谐振峰会影响电流环稳定性。

## 数学形式

```text
f_res = 1 / (2*pi) * sqrt((L1 + L2) / (L1 * L2 * Cf))
```

## 一个仿真任务

扫频比较 L 与 LCL，再加入电容电流反馈观察谐振峰下降。

## 验收标准

- 能写出谐振频率影响因素。
- 能解释有源阻尼为什么需要额外反馈。
- 能区分逆变器侧电流和电网侧电流。

## 导师问题

PCS 并网电流控制通常反馈哪一路电流？LCL 阻尼入口在哪里？
