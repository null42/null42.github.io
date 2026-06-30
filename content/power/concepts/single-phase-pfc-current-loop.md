---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 PFC 内层电流环
tags:
  - power-electronics
status: learning
summary: 功率因数校正（power factor correction / PFC）的电流环（current loop）是内层快速环。它的任务是让实际电感电流（inductor current / iL）跟踪电流参考 `i_ref`。
---

# 概念：单相 PFC 内层电流环

## 1. 它是什么

功率因数校正（power factor correction / PFC）的电流环（current loop）是内层快速环。它的任务是让实际电感电流（inductor current / iL）跟踪电流参考 `i_ref`。

上一节电压环给出电流参考幅值，本节关注：

```text
error = i_ref - iL
占空比命令 D = current_controller(error)
```

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要让输入电流跟着参考波形走。只有电压环不够，因为电压环只知道“要多少电流幅值”，不知道电感电流每个控制周期是否真的跟上了。

电流环的质量直接影响：

- 输入电流畸变。
- 功率因数。
- 过流风险。
- PFC 对负载变化和电网变化的响应。

## 3. 物理直觉

电压环像告诉你“目标速度是多少”，电流环像脚下的油门控制。参考电流在一个工频周期内不断变化，电流环要快速推着电感电流追上它。

## 4. 数学形式

电流误差：

```text
e_i[k] = i_ref[k] - iL[k]
```

比例积分控制器（proportional-integral controller / PI）：

```text
u[k] = Kp * e_i[k] + integral[k] + feedforward[k]
integral[k+1] = integral[k] + Ki * e_i[k] * Ts
D[k] = clamp(0.5 + u[k] / Vbus, Dmin, Dmax)
```

简化电感模型：

```text
diL/dt = vL / L
vL ≈ (D - 0.5) * Vbus - R * iL
```

这里的占空比命令（duty command / D）只是平均模型命令，不是开关级 PWM 波形。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pfc_current_loop.py
```

对比一个仿真任务：

```powershell
python simulations\python\single_phase_pfc_current_loop.py --current-rms-reference 3 --output simulations\results\pfc_current_loop_3a.png --no-open
python simulations\python\single_phase_pfc_current_loop.py --current-rms-reference 8 --output simulations\results\pfc_current_loop_8a.png --no-open
```

观察：

- 电流参考 `iref` 是正弦波。
- 实际电感电流 `iL` 应跟随 `iref`。
- 跟踪误差 `e_i` 不应长期偏大。
- 占空比命令 `D` 应在限幅内变化。

## 6. 固件落地

真实固件里，电流环通常在控制 ISR 中运行：

- 读取 ADC 采样的电感电流。
- 计算 `i_ref - iL`。
- 执行 PI 或 PR 等控制器。
- 加入前馈、限幅、抗积分饱和。
- 更新脉宽调制（pulse-width modulation / PWM）比较值。

工程阅读时重点找：电流采样在哪里更新、参考值在哪里传入、控制器输出如何限幅、PWM 何时更新。

## 7. 常见误解

- 错误理解：电压环输出电流幅值后，电流自然就会变成目标波形。  
  正确理解：必须有内层电流环让实际电感电流跟踪参考。

- 错误理解：电流环越猛越好。  
  正确理解：过高增益会导致噪声放大、占空比抖动和稳定性问题。

- 错误理解：平均模型等于真实开关波形。  
  正确理解：平均模型用于理解控制趋势，真实 PWM 还会带来开关纹波、采样延迟和调制限制。

## 8. 验收标准

- 能解释电流环（current loop）的输入、输出和作用。
- 能在图中指出 `iref`、`iL`、`e_i` 和 `D`。
- 能解释占空比命令（duty command / D）为什么需要限幅。
- 能解释均方根值（root mean square / RMS） tracking error 表示什么。
- 能基于 `single_phase_pfc_current_loop.py` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中，电流参考 RMS 是多少 A？跟踪误差大约是多少？
- 把参考电流提高到 8 A 后，占空比命令有什么变化？
- 如果占空比长时间撞到上限，可能是控制参数问题、输入电压问题，还是负载过重问题？

## 10. 导师问题

- 我用 `single_phase_pfc_current_loop.py` 看到 `iL` 跟踪 `iref`，但仍有误差。公司 PFC 电流环常用 PI、PR 还是其他控制器？
- 图中占空比命令有限幅。真实工程里 PFC 电流环的占空比限幅和过流保护如何配合？
- 本节用了平均模型。公司调试 PFC 电流环时通常先看平均模型、Simulink 开关模型，还是直接看示波器波形？
