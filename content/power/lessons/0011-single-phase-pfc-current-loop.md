---
title: 教程 0011：单相功率因数校正（power factor correction / PFC）内层电流环
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0011-single-phase-pfc-current-loop.html
status: learning
visibility: public
summary: Imported from 0011-single-phase-pfc-current-loop.html
chapterOrder: 10
---

# 教程 0011：单相功率因数校正（power factor correction / PFC）内层电流环

中文主讲。一个概念：电压环给出电流参考幅值之后，内层电流环如何让实际电感电流跟上参考；一个仿真任务：比较不同电流参考下的跟踪误差和占空比命令。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

电流环（current loop）是 PFC 的快速内环。它的任务是让电感电流（inductor current / iL）跟踪电流参考 `i_ref`。

上一节电压环决定“电流参考幅值要多大”，本节只看实际电流如何跟踪：

  e_i = i_ref - iL
占空比命令（duty command / D） = current_controller(e_i)

这里的 脉宽调制（pulse-width modulation / PWM） 仍不展开成开关波形，只用平均占空比命令观察控制趋势。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要让输入电流跟随参考波形。只有电压环不够，因为电压环只给出“要多少电流幅值”，不知道每个控制周期电感电流是否真的跟上。

- 电流跟踪差：输入电流畸变变大。

- 误差长期偏大：功率因数和母线控制都会受影响。

- 占空比撞限：可能意味着参数、输入条件或保护边界有问题。

## 3. 物理直觉

电压环像告诉你“目标速度是多少”，电流环像脚下油门。参考电流在一个工频周期内持续变化，电流环要不断推着电感电流追上它。

    i_ref - iL
    电流误差

    PI 电流环
    快速内环

    D 命令
    占空比限幅

    Boost 电感
    产生 iL

    电流采样反馈

图 1：本节是平均模型，只看跟踪关系，不看开关纹波。

## 4. 数学形式

电流误差：

  e_i[k] = i_ref[k] - iL[k]

电流比例积分控制器（proportional-integral controller / PI）加一个简化前馈：

  u[k] = Kp * e_i[k] + integral[k] + feedforward[k]
integral[k+1] = integral[k] + Ki * e_i[k] * Ts
D[k] = clamp(0.5 + u[k] / Vbus, Dmin, Dmax)

简化电感模型：

  diL/dt = vL / L
vL ≈ (D - 0.5) * Vbus - R * iL

这不是完整开关模型，只用来观察电流环的“参考、实际、误差、占空比”关系。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_current_loop.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含交流输入电压、电流参考、实际电感电流、跟踪误差和占空比命令。

    对比实验
    python simulations\python\single_phase_pfc_current_loop.py --current-rms-reference 3 --output simulations\results\pfc_current_loop_3a.png --no-open
python simulations\python\single_phase_pfc_current_loop.py --current-rms-reference 8 --output simulations\results\pfc_current_loop_8a.png --no-open

比较参考电流越大时，占空比命令和跟踪误差如何变化。图内参数框会标明当前电流参考的均方根值（root mean square / RMS）条件。

观察顺序：

- 先看 `iref` 和 `iL` 是否同相、幅值是否接近。

- 看误差 `e_i` 是否长期偏大。

- 看占空比 `D` 是否撞到上下限。

- 看参数框里的均方根值（root mean square / RMS） tracking error。

## 6. 固件落地

真实 PFC 固件中，电流环通常放在控制 ISR 中：

- 读取模数转换器（analog-to-digital converter / ADC）采样的电感电流。

- 计算 `i_ref - iL`。

- 执行 PI、比例谐振控制器（proportional resonant controller / PR）或其他控制器。

- 加入前馈、限幅、抗积分饱和。

- 更新 PWM 比较值。

阅读代码时重点找：电流采样在哪里更新，参考值从哪里来，控制器输出如何限幅，PWM 在哪个时刻更新。

## 7. 常见误解

- **误解：**电压环给出幅值后，电流自然就是目标波形。
**纠正：**必须有内层电流环让实际电感电流跟踪参考。

- **误解：**电流环越猛越好。
**纠正：**过高增益会放大采样噪声，引起占空比抖动和稳定性问题。

- **误解：**平均模型等于真实 PWM 波形。
**纠正：**平均模型用于理解控制趋势，真实开关模型还会有纹波、采样延迟和调制限制。

## 8. 验收标准

- 能解释电流环（current loop）的输入、输出和作用。

- 能在图中指出 `iref`、`iL`、`e_i` 和 `D`。

- 能解释占空比命令（duty command / D）为什么需要限幅。

- 能解释 RMS tracking error 表示什么。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 默认仿真中，电流参考 RMS 是多少 A？跟踪误差大约是多少？

- 把参考电流提高到 8 A 后，占空比命令有什么变化？

- 如果占空比长时间撞到上限，可能是控制参数问题、输入电压问题，还是负载过重问题？

## 10. 导师问题

- 我用 `single_phase_pfc_current_loop.py` 看到 `iL` 跟踪 `iref`，但仍有误差。公司 PFC 电流环常用 PI、PR 还是其他控制器？

- 图中占空比命令有限幅。真实工程里 PFC 电流环的占空比限幅和过流保护如何配合？

- 本节用了平均模型。公司调试 PFC 电流环时通常先看平均模型、Simulink 开关模型，还是直接看示波器波形？

**下一步：**再把 PWM 更新、ADC 采样点和电流环延迟连起来看，形成更接近真实 PFC 控制 ISR 的链路。

关联：[上一节：单相 PFC 电压环](0010-single-phase-pfc-voltage-loop.html)；源稿：`concepts/power-electronics/single-phase-pfc-current-loop.md`。

    上一节：教程 0010：单相功率因数校正（power factor correction / PFC）电压环如何生成电流幅值
    下一节：教程 0012：单相功率因数校正（power factor correction / PFC）的 PWM/ADC 时序与控制延迟
