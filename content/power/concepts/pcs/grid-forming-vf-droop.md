---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：PCS 构网型 V/f 与下垂控制
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0044-pcs-grid-forming-vf-droop.html` 的源稿。
---

# 概念：PCS 构网型 V/f 与下垂控制

本页是 `lessons/0044-pcs-grid-forming-vf-droop.html` 的源稿。

## 它是什么

构网型控制（grid-forming control / GFM）自己建立电压和频率。电压频率控制（voltage-frequency control / V/f control）给出基本电压源参考，下垂控制（droop control）用于多机功率分担。

## 为什么 UPS/PCS 需要它

UPS 离网逆变器和孤岛 PCS 都要建立负载电压，不能只依赖外部电网相位。

## 数学形式

```text
omega_ref = omega_nominal - Kp_droop * (P - P_ref)
V_ref = V_nominal - Kq_droop * (Q - Q_ref)
```

## 一个仿真任务

对负载加阶跃，观察 P/f 和 Q/V 下垂曲线。

## 验收标准

- 能区分 GFL 和 GFM 的角度来源。
- 能写出 P-f、Q-V 下垂基本式。
- 能说明构网 PCS 与 UPS 离网逆变器的相似点。

## 导师问题

GFL/GFM 模式边界通常由状态机还是上位机决定？
