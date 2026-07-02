---
title: 教程 0013：单相功率因数校正（power factor correction / PFC）的输入电压前馈
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0013-single-phase-pfc-voltage-feedforward.html
status: learning
visibility: public
summary: Imported from 0013-single-phase-pfc-voltage-feedforward.html
chapterOrder: 10
---

# 教程 0013：单相功率因数校正（power factor correction / PFC）的输入电压前馈

中文主讲。一个概念：输入电网电压变了，为什么用 `G = Pcmd / Vrms^2` 能让输入功率更接近命令值；一个仿真任务：比较 180 V 和 264 V 输入电压跳变时固定电导与前馈电导的差异。

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

输入电压前馈（input-voltage feedforward）是一种前馈（feedforward）补偿：把输入电压的均方根值（root mean square / RMS）提前放进功率命令到电流命令的换算里。这里的“提前”意思是：不要等母线电压掉下去以后才靠慢速电压环纠正，而是在电网电压刚变化时先把电流命令换算对。

本节只讲一个概念：PFC 平均模型里为什么常见下面这个式子：

  G = Pcmd / Vrms^2
I_rms_ref = G * Vrms

其中 `G` 是电导命令（conductance command / G），`Pcmd` 是输入功率命令，`Vrms` 是输入电压 RMS。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的前级 PFC 要在电网电压变化时稳定地给直流母线供能。如果只固定电导命令，输入功率会随 `Vrms^2` 变化。

- 输入 220 V 掉到 180 V：固定 `G` 会让输入功率明显下降，母线更容易下跌。

- 输入 220 V 升到 264 V：固定 `G` 会让输入功率明显上升，母线更容易上冲。

- 电压环最终会修正，但前馈能把这类扰动先压小，减轻电压环压力。

## 3. 物理直觉

PFC 电流参考常把输入端做得像“受控电导”：电压越高，电流参考也越高。功率等于电压乘电流，所以电导不变时，功率不是按电压一次方变化，而是按电压平方变化。

输入电压前馈的直觉很简单：电压高时把电导命令压低，电压低时把电导命令抬高，让 `G * Vrms^2` 尽量等于目标功率。

    Pcmd
    功率命令

    前馈换算
    G=Pcmd/Vrms^2
    输入：Vrms

    电流参考
    i_ref = G * vin

    PWM电流环
    跟踪电感电流

    本节只看前馈换算，不展开完整电压环和开关级模型

图 1：输入电压前馈放在功率命令到电流参考之间。

## 4. 数学形式

平均意义下，单相正弦输入可以写成：

  v(t) = Vpk * sin(theta)
i_ref(t) = G * v(t)
Pin_avg = Vrms * Irms = G * Vrms^2

如果希望平均输入功率接近 `Pcmd`，就令：

  G_ff = Pcmd / Vrms^2
Irms_ref = G_ff * Vrms = Pcmd / Vrms

这不是完整的电压环，也不是完整的电流环。它只是把输入电压变化提前补偿掉，减轻比例积分控制器（proportional-integral controller / PI）后续要修正的误差。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_voltage_feedforward.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图里包含输入电压的均方根值（root mean square / RMS）、固定电导输入功率、前馈输入功率、电导命令、电流 RMS 命令和参数框。

    一个仿真任务
    python simulations\python\single_phase_pfc_voltage_feedforward.py --rms-step 180 --output simulations\results\pfc_feedforward_180v.png --no-open
python simulations\python\single_phase_pfc_voltage_feedforward.py --rms-step 264 --output simulations\results\pfc_feedforward_264v.png --no-open

对比 180 V 和 264 V 两种输入电压跳变：固定 `G` 的输入功率分别偏低和偏高，而前馈曲线应保持接近 `Pcmd`。

观察顺序：

- 先看第一幅子图确认 `Vrms` 在什么时刻跳变。

- 再看功率曲线：`Pin_fixed` 是否偏离 `Pcmd`，`Pin_ff` 是否保持接近命令值。

- 再看电导曲线：低压时 `G_ff` 应变大，高压时 `G_ff` 应变小。

- 最后看电流 RMS：低压同样功率需要更大电流，高压同样功率需要更小电流。

## 6. 固件落地

固件里通常不会孤立地写一个“前馈模块”，而是放在 PFC 电压环输出到电流幅值之间，最后交给脉宽调制（pulse-width modulation / PWM）电流环执行：

  voltage_loop_output or Pcmd
  -> RMS measurement and filter
  -> G = Pcmd / max(Vrms^2, lower_limit)
  -> current reference amplitude
  -> PWM current loop

- `Vrms` 需要滤波，不能直接把带噪声的瞬时采样扔进分母。

- 分母要有限幅，避免低电压、掉电或采样异常时电流命令暴涨。

- 前馈不能替代过流、欠压、过压、输入异常等保护逻辑。

- PWM 电流环仍然负责让实际电感电流跟上参考。

## 7. 常见误解

- **误解：**有了前馈就不需要母线电压环。
**纠正：**前馈只补偿输入电压变化；负载变化、损耗和模型误差仍需要电压环修正。

- **误解：**前馈越快越好。
**纠正：**`Vrms` 估算太快会把采样噪声带进电流命令，通常要滤波和限幅。

- **误解：**固定电流幅值比固定电导更稳。
**纠正：**固定电流幅值时 `Pin = Vrms * Irms`，仍会随输入电压变化。

## 8. 验收标准

- 能解释为什么固定 `G` 时 `Pin = G * Vrms^2`。

- 能解释为什么 `G = Pcmd / Vrms^2` 可以让输入功率更接近命令值。

- 能在仿真图中指出 `Vrms`、`Pin_fixed`、`Pin_ff`、`G_fixed`、`G_ff`。

- 能说清楚低电压时为什么电流 RMS 命令会上升。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 220 V 跳到 180 V 后，固定 `G` 的输入功率为什么会下降？下降比例大约和哪个量有关？

- 220 V 跳到 264 V 后，前馈为什么要降低 `G`？

- 如果 `Vrms` 估算值带噪声，电流命令会出现什么现象？

## 10. 导师问题

- 我用 `single_phase_pfc_voltage_feedforward.py` 看到 220 V 跳到 180 V 时，固定 `G` 的输入功率明显下降。公司 PFC 控制里是否使用 `Vrms^2` 输入电压前馈？

- 图里 `G_ff` 在低电压时变大。实际固件会怎样限制低压时的最大电流命令？

- 如果 `Vrms` 估算来自半周或整周滤波，公司平台一般怎样平衡前馈响应速度和噪声？

**下一步：**把前馈、电压环、电流环和 PWM/ADC 延迟串起来，看一个平均 PFC 控制框架如何组织。

关联：[上一节：单相 PFC 的 PWM/ADC 时序与控制延迟](0012-single-phase-pfc-pwm-delay.html)；源稿：`concepts/power-electronics/single-phase-pfc-voltage-feedforward.md`。

    上一节：教程 0012：单相功率因数校正（power factor correction / PFC）的 PWM/ADC 时序与控制延迟
    下一节：教程 0014：单相功率因数校正（power factor correction / PFC）的平均控制链
