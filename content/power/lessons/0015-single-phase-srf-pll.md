---
title: 教程 0015：单相锁相环（phase-locked loop / PLL）入门
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0015-single-phase-srf-pll.html
status: learning
visibility: public
summary: Imported from 0015-single-phase-srf-pll.html
chapterOrder: 10
---

# 教程 0015：单相锁相环（phase-locked loop / PLL）入门

中文主讲，一个概念，一个仿真任务：用同步旋转坐标系里的 q 轴误差，修正估算频率，让估算相位追上电网相位。

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

同步旋转坐标系（synchronous reference frame / SRF）PLL 的核心想法是：拿自己估算出来的相位 `theta_hat` 建一个旋转坐标系，再看电网电压在这个坐标系里的q 轴误差（q-axis error / vq）。

如果 `vq` 不为 0，说明估算相位和真实电网相位没有对齐。用比例积分控制器（proportional-integral controller / PI）把 `vq` 变成估算频率（estimated frequency / f_est）的修正量，再积分得到新的相位。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）需要知道电网相位。前级功率因数校正（power factor correction / PFC）要让输入电流参考和电网电压同相；旁路切换要判断逆变输出和电网是否同步；逆变器跟随电网或旁路时也要相位和频率信息。

如果 PLL 错，相当于后面的控制都站在错误坐标系上。电流参考、功率方向、并联系统同步和旁路切换都会受影响。

## 3. 物理直觉

把 PLL 想成一个追着电网转的指针。指针慢了，电网相位跑到前面；指针快了，估算相位超过电网。`vq` 就像“偏左还是偏右”的误差信号。PI 控制器根据这个误差调快或调慢指针，直到指针和电网相位对齐。

    电网电压
    vac

    相位检测
    vq = sin(theta_err)

    PI滤波
    omega_hat

    相位积分
    theta_hat

    估算相位反馈到下一次相位检测
    本节先看相位闭环，不展开双二阶广义积分器等工程增强结构

图 1：SRF-PLL 的最小控制链。

## 4. 数学形式

  theta_err = theta_grid - theta_hat
vq = sin(theta_err)
omega_hat = omega_nominal + Kp * vq + integral(Ki * vq)
theta_hat[k+1] = theta_hat[k] + omega_hat * Ts

锁定附近 `sin(theta_err) ≈ theta_err`，所以 PLL 可以近似看作一个二阶闭环。`Kp` 和 `Ki` 决定它追得快不快、抖不抖；锁定带（lock band）则定义“相位误差已经足够小”的工程阈值。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_srf_pll.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图里包含电网电压、相位误差、锁定带、q 轴误差、估算频率和参数框。

    一个仿真任务
    python simulations\python\single_phase_srf_pll.py --kp 80 --ki 3000 --output simulations\results\srf_pll_slow.png
python simulations\python\single_phase_srf_pll.py --kp 260 --ki 22000 --output simulations\results\srf_pll_fast.png

对比慢 PLL 和快 PLL：慢的相位误差收敛更慢，快的频率估算动作更激烈，也更容易把噪声带进去。

观察顺序：

- 先看 60 ms 的相位阶跃位置。

- 看 `theta_err` 是否跳变后回到 ±5 度锁定带内。

- 看 `vq` 是否随着相位误差减小而回到 0 附近。

- 看 `f_est` 是否短时偏离 50 Hz，然后回到电网频率附近。

## 6. 固件落地

固件里 PLL 通常在固定采样周期运行：

  ADC voltage sample
  -> scaling/filtering
  -> phase detector, vq
  -> PI loop filter
  -> frequency limit
  -> phase accumulator
  -> sin/cos angle output

- 输入电压需要滤波或幅值归一化，否则幅值变化和谐波会污染相位检测。

- 估算频率要限幅，避免采样异常时相位飞掉。

- PLL 输出角度会被 PFC 电流参考、旁路同步和逆变控制复用。

- 锁定判据不能只看瞬时误差，要看一段时间内的相位误差和频率误差。

## 7. 常见误解

- **误解：**PLL 只是过零检测。
**纠正：**过零检测只能粗略给相位点，PLL 是连续估算相位和频率的闭环。

- **误解：**PLL 越快越好。
**纠正：**太快会把电网噪声、谐波和采样毛刺带进角度；太慢会跟不上频率和相位变化。

- **误解：**PFC 不需要 PLL。
**纠正：**简单单相 PFC 可以直接用电压采样生成参考，但工程里仍常需要相位、频率、过零、同步和异常检测信息。

## 8. 验收标准

- 能解释 `vq` 为什么代表估算相位偏差。

- 能说明 `omega_hat` 如何由 nominal frequency、比例项和积分项组成。

- 能在图中指出 `vac`、`theta_err`、`vq`、`f_est` 和锁定带。

- 能解释相位阶跃后 `f_est` 为什么会短时升高。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `theta_err` 回到 0 附近时，`vq` 也会回到 0 附近？

- 如果把 `Kp` 和 `Ki` 调得很大，图里的 `f_est` 会出现什么变化？

- 如果输入电网电压含 5 次谐波，PLL 角度可能会怎样受影响？

## 10. 导师问题

- 我用 `single_phase_srf_pll.py` 看到 30 度相位阶跃后，`f_est` 会短时升高再回到 50 Hz。公司 UPS 的 PLL 锁定判据通常看相位误差、频率误差，还是两者都看？

- 图里 `Kp=180, Ki=12000` 能较快收敛。实际工程中 PLL 带宽通常如何选，PFC 和旁路同步会不会用不同带宽？

- 如果输入电压含谐波或采样噪声，公司平台是在 PLL 前加滤波，还是在 `vq` 误差后加滤波？

**下一步：**继续 PLL，不急着进逆变器：先看频率偏差和谐波/噪声对锁相的影响。

关联：[上一节：单相 PFC 平均控制链](0014-single-phase-pfc-average-controller.html)；源稿：`concepts/control/single-phase-srf-pll.md`。

    上一节：教程 0014：单相功率因数校正（power factor correction / PFC）的平均控制链
    下一节：教程 0016：单相锁相环（phase-locked loop / PLL）的带宽取舍
