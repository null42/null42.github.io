---
title: 教程 0019：单相逆变器比例谐振控制（proportional resonant control / PR control）
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0019-single-phase-inverter-pr-control.html
status: learning
visibility: public
summary: Imported from 0019-single-phase-inverter-pr-control.html
chapterOrder: 10
---

# 教程 0019：单相逆变器比例谐振控制（proportional resonant control / PR control）

中文主讲，一个概念，一个仿真任务：对 50 Hz 正弦输出，PR 控制在基波频率处提高误差校正能力，比普通比例控制更适合单相逆变器电压环。

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

比例谐振控制（proportional resonant control / PR control）是一种针对交流正弦量的控制方法。比例项看当前误差，谐振项专门记住目标频率附近的误差。

本节场景是单相全桥逆变器（single-phase full-bridge inverter）经过 LC 滤波器（inductor-capacitor filter / LC filter）后输出 50 Hz 正弦电压。PR 控制放在电压环（voltage loop）里，输出调制命令，再交给脉宽调制（pulse-width modulation / PWM）执行。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）逆变器要在负载变化时仍保持输出电压接近正弦参考。负载越重，滤波电感和功率级上的压降越明显；如果只靠普通比例控制，50 Hz 正弦误差通常会留下残余。

PR 控制的价值是：它不是笼统地把所有频率的误差都放大，而是在目标基波频率处给很强的纠偏能力。这对单相交流输出很自然，也方便你以后读逆变器电压环 C 代码时识别 `Kp`、`Kr`、谐振状态、限幅和保护之间的关系。

## 3. 物理直觉

比例控制像“看到误差就推一下”。对直流量，这个方法很直接；但对持续旋转的正弦量，误差方向每一刻都在变化，单纯比例项往往只能减小误差，不能很好地消除误差。

PR 控制像一个只盯住 50 Hz 的记忆器。如果输出电压长期比参考低一点，谐振项会把这个 50 Hz 误差积累起来，并在正确相位给出补偿。它不是魔法，只是在指定频率处提高环路增益。

    正弦参考
    v_ref

    误差计算
    e = vref - vout

    PR 电压环
    Kp, Kr, 50Hz

    PWM/功率级
    m_cmd

    输出电压反馈到误差计算
    本节只看50Hz基波误差校正，暂不讲谐波补偿和并联系统

图 1：PR 控制处在正弦参考、输出反馈和 PWM 执行之间。

## 4. 数学形式

连续域常见 PR 控制器可以写成：

  Gpr(s) = Kp + Kr * 2*wc*s / (s^2 + 2*wc*s + w0^2)

为了让物理意义更直观，本节仿真使用同步投影形式记住 50 Hz 误差：

  e = v_ref - v_out
xs += e * sin(theta) * dt
xc += e * cos(theta) * dt
u_res = Kr * (xs*sin(theta) + xc*cos(theta))
m_cmd = clamp(v_ref/Vdc + Kp*e + u_res/Vdc, -m_limit, m_limit)

`xs` 和 `xc` 可以理解成“50 Hz 误差记忆”。真实产品常用不同离散化形式，本节公式只服务于理解，不代表公司内部实现。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_inverter_pr_control.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含 Vdc、Vout_ref、f_out、L、C、负载阶跃、Kp、Kr、控制频率、调制限幅、仿真时长和跟踪误差。

    一个仿真任务
    python simulations\python\single_phase_inverter_pr_control.py --resonant-gain 0 --output simulations\results\inverter_pr_Kr_0.png
python simulations\python\single_phase_inverter_pr_control.py --resonant-gain 80 --output simulations\results\inverter_pr_Kr_80.png

对比 `Kr=0` 和 `Kr=80` 时，负载阶跃后的 `Voltage error e_v`、`m_cmd` 和尾段跟踪误差。文件名和图内参数框都标出当前参数条件。

观察顺序：

- 先看 `v_ref` 和 `v_out` 是否贴近。

- 再看负载阶跃后 `Voltage error e_v` 是否恢复。

- 检查 `m_cmd` 是否碰到 `m_limit`，避免把过调制误认为控制效果。

- 最后看 `i_load`，确认负载变重后输出电流确实增大。

## 6. 固件落地

读固件时可以按下面链路找变量：

  ADC Vout, iL, Vdc
  -> voltage reference from sine table or PLL angle
  -> e_v = v_ref - v_out
  -> PR voltage controller
  -> modulation command limit
  -> PWM compare update
  -> protection checks

工程上必须关注离散化、限幅、抗饱和、采样延迟、频率偏移和保护优先级。比如 `m_cmd` 长期贴着限幅，说明控制器已经没有调制裕量，此时继续加大 `Kr` 可能只会让波形和保护更难处理。

## 7. 常见误解

- **误解：**PR 控制就是 PI 控制换个名字。
**纠正：**比例积分（proportional integral / PI）更适合直流量零误差；PR 更适合交流正弦量在指定频率处小误差。

- **误解：**`Kr` 越大越好。
**纠正：**过大的谐振增益可能放大噪声、引起振荡、触发调制限幅，甚至激发 LC 谐振问题。

- **误解：**PR 跟踪误差小，就不需要保护逻辑。
**纠正：**短路、过流、母线异常、采样故障和过调制仍然必须由保护和状态机处理。

## 8. 验收标准

- 能解释 `Kp`、`Kr`、`e_v`、`m_cmd` 各自代表什么。

- 能说出 PR 为什么比单纯比例控制更适合 50 Hz 正弦电压跟踪。

- 能根据图内参数框读出 Vdc、Vout_ref、f_out、L、C、负载阶跃、Kp、Kr、f_ctrl 和 t_end。

- 能解释为什么检查调制限幅是判断控制效果的必要步骤。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `Kr=0` 时仍可能有明显的 50 Hz 跟踪误差？

- 如果把 `Kr` 继续加大，除了误差变小，还可能带来哪些风险？

- 负载从 `48.4 ohm` 变到 `32 ohm` 后，为什么要同时观察 `v_out`、`e_v`、`m_cmd` 和 `i_load`？

## 10. 导师问题

- 我用 `single_phase_inverter_pr_control.py` 看到 `Kr=80` 比 `Kr=0` 的 50 Hz 跟踪误差小很多。公司 UPS 逆变器电压环通常用 PR、PI 旋转坐标系，还是其他结构？

- 仿真里 `m_cmd` 没有触碰 `m_limit=0.95`。真实固件里 PR 输出限幅后，是否有抗饱和处理或故障计数？

- 负载从 `48.4 ohm` 变到 `32 ohm` 后，`i_load` 增大但 `v_out` 恢复到参考附近。真实调试时会怎样区分控制环带宽不足、LC 参数问题和限流保护介入？

**下一步：**可以继续把 PR 电压环放进更接近固件的离散实现，观察采样延迟、限幅和抗饱和对逆变器输出的影响。

关联：[上一节：单相逆变器 LC 输出滤波](0018-single-phase-inverter-lc-filter.html)；源稿：`concepts/control/single-phase-inverter-pr-control.md`。

    上一节：教程 0018：单相全桥逆变器（single-phase full-bridge inverter）的 LC 输出滤波
    下一节：教程 0020：单相逆变器的均方根（root mean square / RMS）估算与欠压保护
