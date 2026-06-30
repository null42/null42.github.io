---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 电流参考
tags:
  - power-electronics
status: learning
summary: 功率因数校正（power factor correction / PFC）的第一步，是让输入电流尽量跟交流输入电压同相、同形。电流参考（current reference）就是控制器希望输入电流跟踪的目标波形。
---

# 概念：单相 PFC 电流参考

## 1. 它是什么

功率因数校正（power factor correction / PFC）的第一步，是让输入电流尽量跟交流输入电压同相、同形。电流参考（current reference）就是控制器希望输入电流跟踪的目标波形。

本节只讲“电流参考怎么长出来”，不讲完整 PFC 电压环、电流环和 PWM 实现。本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）前级通常要从交流电网取电。如果输入电流畸变严重或与电压不同相，就会带来：

- 功率因数低，视在功率变大。
- 电网谐波电流增加。
- 前级整流和母线电容电流应力增大。

PFC 的目标是让电网看到的负载更接近电阻性负载。

## 3. 物理直觉

如果一个负载像纯电阻，那么电压为正时电流为正，电压为负时电流为负，并且二者同步变化。PFC 电流参考就是让电源前级“装得像电阻”。

整流后的 Boost PFC 功率级实际只处理正向电感电流，但从交流输入侧看，电流应当跟 `vac` 同相。

## 4. 数学形式

若希望输入功率为 `P`，电网均方根值（root mean square / RMS）为 `Vrms`，可以用等效电导：

```text
G = P / Vrms^2
i_ref(t) = G * v_ac(t)
```

这样平均功率为：

```text
Pavg = mean(v_ac(t) * i_ref(t))
```

在理想情况下，电流和电压同相，功率因数接近 1。

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行 `single_phase_pfc_current_reference.py`，观察 `vac`、`|vac|`、`iref` 和瞬时功率之间的关系：

```powershell
python simulations\python\single_phase_pfc_current_reference.py
```

对比目标功率：

```powershell
python simulations\python\single_phase_pfc_current_reference.py --target-power 500 --output simulations\results\pfc_current_ref_500w.png --no-open
python simulations\python\single_phase_pfc_current_reference.py --target-power 1500 --output simulations\results\pfc_current_ref_1500w.png --no-open
```

观察：

- 交流输入电压 `vac` 是正负交替的正弦。
- 整流电压 `|vac|` 是 Boost PFC 功率级看到的正半波形状。
- 电流参考 `iref` 与 `vac` 同相。
- 瞬时功率 `p(t)` 有两倍工频脉动，但平均功率接近目标功率。

## 6. 固件落地

真实固件中，电流参考通常不是孤立公式，而是由以下信号共同决定：

- 电压环输出的功率或电流幅值指令。
- 交流电压采样或锁相环（phase-locked loop / PLL）提供的相位/单位正弦。
- 前馈和限幅逻辑。
- 电流环把实际电感电流跟踪到参考值。

本节只建立 `iref` 的形状，为后续电压环、电流环和 PLL 做准备。

## 7. 常见误解

- 错误理解：PFC 就是把输出母线电压升到 380 V。  
  正确理解：升压只是功率级功能；PFC 的关键是输入电流形状和相位。

- 错误理解：电流参考越大越好。  
  正确理解：电流参考幅值由功率需求、输入电压、限流和母线控制共同决定。

- 错误理解：整流后电压是正的，所以交流侧电流也只看正值。  
  正确理解：从电网侧看，电流仍应与交流电压同相，正负半周都要对应。

## 8. 验收标准

- 能解释功率因数校正（power factor correction / PFC）电流参考为什么要与 `vac` 同相。
- 能用 `G = P / Vrms^2` 推出 `i_ref = G * vac`。
- 能在图中指出 `vac`、`|vac|`、`iref` 和 `p(t)`。
- 能解释为什么瞬时功率有脉动，但平均功率接近目标功率。
- 能基于图中 PF、RMS 和功率参数准备导师问题。

## 9. 复盘问题

- 默认仿真中，`Vrms=220 V`、`P=1000 W`，电流 RMS 大约是多少？
- 如果目标功率从 500 W 提高到 1500 W，`iref` 幅值如何变化？
- 为什么本节没有直接讲完整电压环？如果电流参考都不会看，直接看双环控制会卡在哪里？

## 10. 导师问题

- 我用 `single_phase_pfc_current_reference.py` 看到 `iref = G * vac` 时功率因数接近 1。公司单相 PFC 代码里的电流参考是直接用输入电压采样生成，还是通过 PLL/单位正弦生成？
- 本节用 `P / Vrms^2` 生成等效电导。真实工程里电流参考幅值通常来自电压环输出、功率指令，还是前馈计算？
- 图中瞬时功率有两倍工频脉动。公司工程里母线电压环如何避免跟着二倍频纹波乱调？
