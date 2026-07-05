---
title:  零极点对消动画演示
date: 2026-07-02
section: 电机控制
chapter: algorithm
chapterTitle: 控制算法
category: 控制算法
tags:
  - imported
source: motor
sourcePath: algorithm/ALG-00-Pole-Zero-Animation.html
status: learning
visibility: public
summary: Imported from algorithm/ALG-00-Pole-Zero-Animation.html
chapterOrder: 20
navGroup: 控制与算法
navGroupOrder: 30
---

#  零极点对消动画演示

电流环PI整定 — 观察PI控制器零点如何"消灭"电机极点，将二阶系统简化为一阶

相电感 L (mH)

0.08 mH

相电阻 R (Ω)

0.06 Ω

带宽 α (rad/s)

3000 rad/s

动画进度

0%

 开始对消
↺ 重置

 极点 (×)
 零点 (○)
 对消 ()

 s平面（零极点位置）

 Bode图（开环频率响应）

 阶跃响应（闭环时域）

### 传递函数（当前状态）

电机: G(s) = 1 / (Ls + R)

PI: C(s) = Kp(s + Ki/Kp) / s

开环: L(s) = C(s)·G(s)

闭环: G_cl(s) = L(s) / (1 + L(s))

### 对消条件与参数

PI零点: s = -Ki/Kp

电机极点: s = -R/L

对消条件: Ki/Kp = R/L

Kp = 0.311 V/A   Ki = 315.3 V/(A·s)

当前状态：零点与极点未对消 — 系统为二阶，可能存在超调/振荡
