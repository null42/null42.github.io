---
title: 教程 0016：单相锁相环（phase-locked loop / PLL）的带宽取舍
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0016-single-phase-pll-bandwidth.html
status: learning
visibility: public
summary: Imported from 0016-single-phase-pll-bandwidth.html
chapterOrder: 10
---

# 教程 0016：单相锁相环（phase-locked loop / PLL）的带宽取舍

中文主讲，一个概念，一个仿真任务：PLL 带宽越高，响应越快，但越容易把相位噪声变成频率和角度抖动。

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

PLL 的带宽（bandwidth）描述它愿意多快相信相位误差信号。带宽高，PLL 对相位阶跃和频率变化反应快；带宽低，PLL 对噪声和谐波更不敏感，但跟踪会慢。

本节只讲一个概念：PLL 带宽不是越高越好，而是在响应速度和噪声敏感度之间取舍。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）里，PLL 角度会被功率因数校正（power factor correction / PFC）、旁路（bypass）同步和逆变器控制复用。

- PLL 太慢：旁路同步、电网扰动恢复和频率变化跟踪会慢。

- PLL 太快：输入电压噪声、谐波、采样毛刺会变成角度抖动。

- 角度抖动会进一步影响 PFC 电流参考、并机同步和旁路切换判断。

## 3. 物理直觉

PLL 像一个追着电网相位转的指针。高带宽像方向盘很灵：急转弯跟得快，但路面小抖动也会传进来。低带宽像方向盘更稳：小抖动不明显，但急转弯跟得慢。

    相位误差
    阶跃 + 噪声

    低带宽PLL
    慢，但平滑

    高带宽PLL
    快，但抖动

    工程选择
    速度 vs 抗噪

    带宽选择服务具体模式：PFC、旁路同步、逆变同步不一定相同

图 1：PLL 带宽是速度和抗噪之间的工程取舍。

## 4. 数学形式

同步旋转坐标系（synchronous reference frame / SRF）PLL 的最小形式仍然是：

  vq = sin(theta_grid - theta_hat)
omega_hat = omega_nominal + Kp * vq + integral(Ki * vq)
theta_hat[k+1] = theta_hat[k] + omega_hat * Ts

这里 `Kp` 和 `Ki` 来自比例积分控制器（proportional-integral controller / PI）。本节把较大的 `Kp`/`Ki` 视为较高带宽。相同的相位噪声（phase noise）输入下，高带宽 PLL 的估算频率（estimated frequency / f_est）会有更明显纹波。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pll_bandwidth.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图里包含带相位噪声的电网电压、慢 PLL 和快 PLL 的相位误差、估算频率、频率纹波 RMS 对比和参数框。

    一个仿真任务
    python simulations\python\single_phase_pll_bandwidth.py --noise-phase-deg 0.5 --output simulations\results\pll_bandwidth_low_noise.png
python simulations\python\single_phase_pll_bandwidth.py --noise-phase-deg 4.0 --output simulations\results\pll_bandwidth_high_noise.png

对比低噪声和高噪声：噪声越大，快 PLL 的 `f_est` 纹波越明显。

观察顺序：

- 先看相位阶跃后，快 PLL 的相位误差是否更快回到 ±5 度范围。

- 再看估算频率曲线，快 PLL 是否更抖。

- 最后看柱状图，确认频率噪声 RMS 对比。

## 6. 固件落地

固件里带宽不一定直接叫 `bandwidth`，它通常体现在 PI 增益、滤波器、限幅和锁定判据里：

  phase detector vq
  -> optional filter
  -> PI gains Kp, Ki
  -> frequency limit
  -> phase accumulator
  -> lock detector

- PFC、旁路同步、并机同步可能使用不同 PLL 带宽或锁定条件。

- 输入电压质量差时，PLL 前端滤波和带宽选择同样重要。

- 频率估算需要限幅，防止噪声或采样异常造成相位飞掉。

- 锁定判断要看持续时间内的相位误差和频率误差。

## 7. 常见误解

- **误解：**带宽越高，PLL 越高级。
**纠正：**带宽高只是响应快，不代表抗噪好。

- **误解：**带宽只影响相位误差。
**纠正：**带宽还影响估算频率抖动，进而影响依赖角度的电流参考和同步判断。

- **误解：**仿真里锁得快，工程里也一定好。
**纠正：**真实电网有谐波、跌落、过零畸变和采样噪声，必须看扰动下表现。

## 8. 验收标准

- 能解释 PLL 带宽为什么影响响应速度。

- 能解释高带宽为什么更容易把相位噪声变成 `f_est` 纹波。

- 能在图中指出慢 PLL、快 PLL、相位误差、估算频率和频率纹波 RMS。

- 能说明为什么 PFC 和旁路同步可能不使用同一个带宽。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么快 PLL 相位收敛更快，但频率估算更抖？

- 如果电网电压含明显谐波，你会倾向提高还是降低 PLL 带宽？为什么？

- 如果旁路切换要求很快确认同步，带宽和锁定判据应怎样一起考虑？

## 10. 导师问题

- 我用 `single_phase_pll_bandwidth.py` 看到快 PLL 收敛快，但 `f_est` 纹波更大。公司 UPS 的 PFC、旁路同步和逆变同步是否使用不同 PLL 带宽？

- 图中相位噪声为 2 度时，快 PLL 的频率纹波明显更大。实际代码里是否会对 `vq` 或 `f_est` 做滤波？

- 公司平台的 PLL 锁定判据是固定 ±几度、固定频率误差，还是随模式和电网质量变化？

**下一步：**继续 PLL 的工程化：频率限幅、锁定判据和异常电网检测。

关联：[上一节：单相 SRF-PLL 入门](0015-single-phase-srf-pll.html)；源稿：`concepts/control/single-phase-pll-bandwidth.md`。

    上一节：教程 0015：单相锁相环（phase-locked loop / PLL）入门
    下一节：教程 0017：锁相环（phase-locked loop / PLL）的频率限幅与锁定检测
