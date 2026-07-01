---
title: Clarke & Park 坐标变换仿真 — abc → αβ → dq
date: 2026-07-01
section: 电机控制
chapter: 02-Simulations
category: 电机控制
tags:
  - imported
source: motor
sourcePath: frontend/src/components/simulations/ClarkeParkSim.vue
status: learning
visibility: public
summary: Imported from frontend/src/components/simulations/ClarkeParkSim.vue
---

# Clarke & Park 坐标变换仿真 — abc → αβ → dq

#### Clarke & Park 坐标变换仿真 — abc → αβ → dq

## Clarke & Park 坐标变换原理

**Clarke 变换 (abc &rarr; &#945;&#946;)：**完整形式为 u&#945; = k(ua-0.5ub-0.5uc), u&#946; = k(&#8730;3/2·ub-&#8730;3/2·uc)。三相平衡且无零序时 ua+ub+uc=0，幅值不变型可化简为 u&#945;=ua, u&#946;=(ua+2ub)/&#8730;3。

**幅值不变 vs 功率不变：**幅值不变型保持空间矢量幅值等于相量峰值，便于 SVPWM/电压限幅理解；功率不变型使用 k=&#8730;(2/3)，满足 ua²+ub²+uc² = u&#945;²+u&#946;²，更适合能量、功率和控制理论推导。两者数值不同，不能混着调 PI 参数。

**Park 变换 (&#945;&#946; &rarr; dq)：**将静止 &#945;&#946; 坐标系旋转电角度 &#952;e。公式：ud = u&#945;·cos&#952; + u&#946;·sin&#952;, uq = -u&#945;·sin&#952; + u&#946;·cos&#952;。若 d 轴对准当前矢量，ud 表示同轴/励磁分量，uq 表示正交/转矩分量。

**工程含义与误区：**dq 直流化让 PI 控制成为可能，但前提是角度 &#952;e 正确、零序假设成立、Clarke/Park 缩放一致。常见错误包括电角度/机械角混用、相序反了导致 uq 符号反、幅值不变和功率不变公式混用。
