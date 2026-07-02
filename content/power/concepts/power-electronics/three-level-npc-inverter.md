---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：三电平 NPC 逆变器
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0042-three-level-npc-inverter.html` 的源稿。
---

# 概念：三电平 NPC 逆变器

本页是 `lessons/0042-three-level-npc-inverter.html` 的源稿。

## 它是什么

三电平 NPC 逆变器（three-level neutral-point-clamped inverter / NPC inverter）让每相输出 +Vdc/2、0、-Vdc/2 三种电平，降低电压应力和输出谐波。

## 为什么 UPS/PCS 需要它

中大功率 UPS 输出级和 PCS 交流侧常需要低谐波、高效率和较低 EMI。NPC 拓扑是常见三电平方案之一。

## 数学形式

```text
P -> +Vdc / 2
O -> 0 through neutral clamp
N -> -Vdc / 2
```

## 一个仿真任务

比较两电平和三电平相电压阶梯，再观察冗余小矢量对中点电压的影响。

## 验收标准

- 能画出 P/O/N 三种相电平。
- 能解释 NPC 为什么降低器件电压应力。
- 能说明冗余矢量和中点平衡的关系。

## 导师问题

NPC 中点平衡由调制层、外环还是单独控制器处理？
