---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 电压环如何生成电流幅值
tags:
  - power-electronics
status: learning
summary: 功率因数校正（power factor correction / PFC）的电压环（voltage loop）是一个慢环。它根据直流母线电压误差，输出电流参考的幅值命令。
---

# 概念：单相 PFC 电压环如何生成电流幅值

## 1. 它是什么

功率因数校正（power factor correction / PFC）的电压环（voltage loop）是一个慢环。它根据直流母线电压误差，输出电流参考的幅值命令。

本节用电导命令（conductance command / G）表示这个幅值：

```text
i_ref(t) = G * v_ac(t)
```

上一节解释了 `i_ref` 的形状；本节解释 `G` 怎么随母线电压变化。本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要维持直流母线电压。如果负载功率突然增加，母线电容会放电，母线电压下降。电压环必须提高输入功率，让母线回到目标值。

如果没有电压环：

- 负载变大时母线会持续下降。
- 负载变小时母线可能过压。
- 后级逆变器的输入条件会变差。

## 3. 物理直觉

直流母线电容像水箱。负载是出水，PFC 输入功率是进水。水位低于目标时，电压环开大进水阀门；水位高于目标时，电压环关小阀门。

这里的“阀门开度”就是电流参考幅值，本文用电导 `G` 表示。

## 4. 数学形式

电压误差：

```text
e_v[k] = Vbus_ref - Vbus[k]
```

比例积分控制器（proportional-integral controller / PI）：

```text
G[k] = clamp(Kp * e_v[k] + integral[k], Gmin, Gmax)
integral[k+1] = integral[k] + Ki * e_v[k] * Ts
```

输入功率近似：

```text
Pin[k] = G[k] * Vrms^2
```

母线能量平衡：

```text
0.5 * Cbus * (Vbus[k+1]^2 - Vbus[k]^2) = (Pin[k] - Pload[k]) * Ts
```

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pfc_voltage_loop.py
```

对比一个仿真任务：

```powershell
python simulations\python\single_phase_pfc_voltage_loop.py --load-power-step 900 --output simulations\results\pfc_voltage_loop_900w.png --no-open
python simulations\python\single_phase_pfc_voltage_loop.py --load-power-step 1500 --output simulations\results\pfc_voltage_loop_1500w.png --no-open
```

观察：

- 负载从 600 W 阶跃到 1200 W 后，母线电压先下降。
- 电压环提高 `G`。
- 输入功率 `Pin` 上升。
- 电流参考的均方根值（root mean square / RMS）随 `G` 增大。
- 母线电压逐步回到参考值附近。

## 6. 固件落地

真实 PFC 固件中，电压环通常运行得比电流环慢。它输出的可能不是 `G`，而是：

- 电流幅值命令。
- 功率命令。
- 电导命令。
- 归一化电流参考幅值。

工程阅读时先找：母线电压采样在哪里进入 PI，PI 输出如何限幅，输出又在哪里乘以输入电压或单位正弦。

## 7. 常见误解

- 错误理解：PFC 电压环直接控制 PWM。  
  正确理解：电压环通常只给电流幅值，内层电流环才负责快速跟踪。

- 错误理解：电压环越快越好。  
  正确理解：单相 PFC 母线有二倍工频纹波，电压环太快会把纹波错误调进电流参考。

- 错误理解：负载阶跃后母线不能有任何下跌。  
  正确理解：母线电容承担能量缓冲，短暂下跌正常，关键是恢复过程和保护边界。

## 8. 验收标准

- 能解释电压环（voltage loop）为什么是慢速外环。
- 能解释 `G` 增大为什么会提高输入功率。
- 能在 `single_phase_pfc_voltage_loop.py` 生成的图中指出母线电压、电导命令、输入功率、负载功率和电流参考 RMS。
- 能解释为什么需要 `Gmax` 限幅和抗积分饱和。
- 能基于仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中负载从多少 W 阶跃到多少 W？发生在多少 ms？
- 负载阶跃后，为什么 `G` 和电流参考 RMS 会升高？
- 如果电压环追踪二倍工频纹波，会对输入电流参考造成什么影响？

## 10. 导师问题

- 我用 `single_phase_pfc_voltage_loop.py` 看到负载从 600 W 到 1200 W 后，电压环提高 `G`，输入功率上升。公司 PFC 代码里电压环输出的是电流幅值、功率命令还是电导命令？
- 图中 `Gmax` 会限制最大输入功率。真实工程中 PFC 电压环输出限幅通常由哪些因素决定？
- 单相 PFC 母线上有二倍工频纹波。公司工程里电压环带宽如何避免追踪二倍频纹波？
