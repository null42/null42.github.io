---
title: 教程 0014：单相功率因数校正（power factor correction / PFC）的平均控制链
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0014-single-phase-pfc-average-controller.html
status: learning
visibility: public
summary: Imported from 0014-single-phase-pfc-average-controller.html
chapterOrder: 10
---

# 教程 0014：单相功率因数校正（power factor correction / PFC）的平均控制链

中文主讲，一个概念，一个仿真任务：把电压环、前馈、电流参考、电流环和 PWM 延迟串成一条能读懂的 PFC 控制链。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学模型和教学参数，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

平均模型（averaged model）把开关周期内的细节暂时压缩掉，只保留控制链上的慢变量。它不看每个开关沿，而是看母线电压、功率、电导命令、电流 RMS 命令和占空比代理量如何变化。

本节把前面几节学过的电压环（voltage loop）、前馈（feedforward）、电流环（current loop）和脉宽调制（pulse-width modulation / PWM）延迟串起来。目标不是追求开关级精度，而是看懂 PFC 控制主链路。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）固件通常不是“电压环一份文件、前馈一份文件、电流环一份文件”这么理想。真实控制中断服务程序（control interrupt service routine / control ISR）里会同时出现采样缩放、RMS 估算、电压环、限幅、电流参考、PWM 更新和保护判断。

平均控制链给你一张地图：看到一个变量时，能判断它属于“母线能量误差”“输入功率命令”“电流参考”还是“PWM 执行”。其中电流幅值常用均方根值（root mean square / RMS）表达，这对后续读 C 工程代码非常关键。

## 3. 物理直觉

负载突然变大时，母线电容先补能量，所以母线电压会下跌。电压环看到下跌后提高电导命令，PFC 从输入侧吸取更多功率。电流环和 PWM 有带宽与延迟，实际输入功率不会立刻等于命令功率。等实际输入功率超过负载功率，母线电压再回升。

    Vbus误差
    Vref - Vbus

    电压环
    G_cmd

    前馈换算
    Irms_ref

    电流环/PWM
    Pin_actual

    母线能量
    Cbus, Pload

    母线电压反馈到下一次控制计算
    本节只看平均功率和控制链，不看开关纹波

图 1：平均 PFC 控制链。箭头代表信号和能量影响，不代表公司内部实现。

## 4. 数学形式

  e_v = Vbus_ref - Vbus
G_cmd = clamp(Kp * e_v + integral(Ki * e_v), Gmin, Gmax)
Irms_ref = G_cmd * Vrms
Pin_cmd = G_cmd * Vrms^2
Pin_actual[k] = low_pass(delay(Pin_cmd), current_loop_bandwidth)
Cbus * d(Vbus^2) / 2 = (Pin_actual - Pload) * dt

这里 `Pin_actual` 是电流环和 PWM 执行后的平均输入功率，不是开关级瞬时功率。`delay` 用来表示采样、计算和 PWM 生效之间的离散延迟。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pfc_average_controller.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图里包含母线电压、负载功率、命令输入功率、实际输入功率、电导命令、电流 RMS 参考、占空比代理量和参数框。

    一个仿真任务
    python simulations\python\single_phase_pfc_average_controller.py --delay-samples 0 --output simulations\results\pfc_average_delay_0.png
python simulations\python\single_phase_pfc_average_controller.py --delay-samples 5 --output simulations\results\pfc_average_delay_5.png

对比 0 个和 5 个控制周期延迟时，`Pin_actual` 跟随 `Pin_cmd` 的滞后和尾段功率误差如何变化。

观察顺序：

- 先看负载阶跃后母线电压是否下跌。

- 再看电压环是否提高 `G_cmd` 和 `Irms_ref`。

- 再看 `Pin_actual` 是否滞后于 `Pin_cmd`。

- 最后看母线电压是否回到参考附近。

## 6. 固件落地

读固件时可以沿着下面的链路找变量：

  ADC samples
  -> Vbus, Vin, Iin scaling/filtering
  -> Vrms estimation
  -> voltage loop output
  -> feedforward and limit
  -> current reference
  -> current loop
  -> PWM compare update

真实工程还会叠加软启动、限流、保护、故障锁存、模式状态机和通信参数。本节模型故意不塞这些内容，先把主控制链看清楚。

## 7. 常见误解

- **误解：**平均模型能替代开关仿真。
**纠正：**平均模型适合看控制链和慢动态，不能看开关纹波、采样尖峰和器件应力。

- **误解：**电压环输出就是占空比。
**纠正：**PFC 里电压环通常输出功率、电导或电流幅值类命令，内层电流环才产生 PWM 相关命令。

- **误解：**母线电压下跌说明控制器一定错了。
**纠正：**负载突变时电容先承担能量差，短暂下跌是正常动态，要看能否恢复、是否超限。

## 8. 验收标准

- 能按顺序说出 `Vbus error -> G_cmd -> Irms_ref -> Pin_actual -> Vbus` 的因果链。

- 能解释负载阶跃后为什么母线先跌再恢复。

- 能在图中指出 `Vbus`、`Pload`、`Pin_cmd`、`Pin_actual`、`G_cmd`、`Irms_ref`。

- 能解释延迟样本数增加为什么会增大输入功率跟踪误差。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 负载从 700 W 跳到 1200 W 后，母线电压为什么不会立刻保持在 380 V？

- `Pin_cmd` 和 `Pin_actual` 的差值主要代表哪两类工程因素？

- 如果 `G_cmd` 达到上限，母线仍然下跌，你会优先怀疑控制参数、功率能力还是保护限流？为什么？

## 10. 导师问题

- 我用 `single_phase_pfc_average_controller.py` 看到负载阶跃后，`Pin_cmd` 先上升，`Pin_actual` 因延迟滞后。公司 PFC 控制中电压环输出通常是功率命令、电导命令还是电流幅值命令？

- 图中 `delay_samples=2` 会增加输入功率跟踪误差。实际平台从 ADC 采样到 PWM 生效的延迟一般怎样计算？

- 如果真实产品还叠加限流和软启动，公司代码里这些限制通常放在电压环输出之后，还是电流参考生成之后？

**下一步：**可以进入锁相环（phase-locked loop / PLL）前的准备：先理解电网相位、零交越、同步角度和 PFC 电流参考之间的关系。

关联：[上一节：单相 PFC 输入电压前馈](0013-single-phase-pfc-voltage-feedforward.html)；源稿：`concepts/power-electronics/single-phase-pfc-average-controller.md`。

    上一节：教程 0013：单相功率因数校正（power factor correction / PFC）的输入电压前馈
    下一节：教程 0015：单相锁相环（phase-locked loop / PLL）入门
