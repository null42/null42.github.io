---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：PLL 带宽取舍
tags:
  - power-electronics
status: learning
summary: 锁相环（phase-locked loop / PLL）的带宽（bandwidth）描述它愿意多快相信相位误差信号。带宽高，PLL 对相位阶跃和频率变化反应快；带宽低，PLL 对噪声和谐波更不敏感，但跟踪会慢。
---

# 概念：PLL 带宽取舍

## 1. 它是什么

锁相环（phase-locked loop / PLL）的带宽（bandwidth）描述它愿意多快相信相位误差信号。带宽高，PLL 对相位阶跃和频率变化反应快；带宽低，PLL 对噪声和谐波更不敏感，但跟踪会慢。

本节只讲一个概念：PLL 带宽不是越高越好，而是在响应速度和噪声敏感度之间取舍。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）里，PLL 角度会被功率因数校正（power factor correction / PFC）、旁路（bypass）同步和逆变器控制复用。如果 PLL 太慢，旁路同步或电网扰动后恢复会慢；如果 PLL 太快，输入电压噪声、谐波和采样毛刺会变成角度抖动，进一步影响电流参考或并联系统同步。

## 3. 物理直觉

PLL 像一个追着电网相位转的指针。高带宽像“方向盘很灵”：转得快，但路面小抖动也会传到方向盘。低带宽像“方向盘更稳”：小抖动不明显，但急转弯跟得慢。

## 4. 数学形式

同步旋转坐标系（synchronous reference frame / SRF）PLL 可简化为：

```text
vq = sin(theta_grid - theta_hat)
omega_hat = omega_nominal + Kp * vq + integral(Ki * vq)
theta_hat[k+1] = theta_hat[k] + omega_hat * Ts
```

在这个教学模型里，较大的 `Kp` 和 `Ki` 代表较高带宽。相同的相位噪声（phase noise）输入下，高带宽 PLL 的估算频率（estimated frequency / f_est）会有更明显的纹波。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_pll_bandwidth.py
```

观察：

- 快 PLL 的相位误差更快进入 ±5 度范围。
- 快 PLL 的估算频率纹波更大。
- 慢 PLL 的频率估算更平滑，但相位阶跃后收敛更慢。

一个仿真任务：改变相位噪声幅值，观察快 PLL 和慢 PLL 的相位收敛速度与估算频率纹波。

```powershell
python simulations\python\single_phase_pll_bandwidth.py --noise-phase-deg 0.5 --output simulations\results\pll_bandwidth_low_noise.png --no-open
python simulations\python\single_phase_pll_bandwidth.py --noise-phase-deg 4.0 --output simulations\results\pll_bandwidth_high_noise.png --no-open
```

## 6. 固件落地

固件里带宽通常不是直接写一个 “bandwidth” 变量，而是体现在 PI 增益、滤波器、限幅和锁定判据里：

```text
phase detector vq
  -> optional filter
  -> PI gains Kp, Ki
  -> frequency limit
  -> phase accumulator
  -> lock detector
```

工程上要关注：

- PFC、旁路同步、并机同步可能使用不同的 PLL 带宽或锁定条件。
- 输入电压质量差时，PLL 前端滤波和带宽选择同样重要。
- 频率估算需要限幅，防止噪声或采样异常造成相位飞掉。
- 锁定判断要看持续时间内的相位误差和频率误差，而不是单点值。

## 7. 常见误解

- 错误理解：带宽越高，PLL 越高级。  
  正确理解：带宽高只是响应快，不代表抗噪好。

- 错误理解：带宽只影响相位误差。  
  正确理解：带宽还影响估算频率抖动，进而影响依赖角度的电流参考和同步判断。

- 错误理解：仿真里锁得快，工程里也一定好。  
  正确理解：真实电网有谐波、跌落、过零畸变和采样噪声，必须看扰动下表现。

## 8. 验收标准

- 能解释 PLL 带宽为什么影响响应速度。
- 能解释高带宽为什么更容易把相位噪声变成 `f_est` 纹波。
- 能在图中指出慢 PLL、快 PLL、相位误差、估算频率和频率纹波 RMS。
- 能说明为什么 PFC 和旁路同步可能不使用同一个带宽。
- 能基于 `single_phase_pll_bandwidth.py` 生成的仿真图准备导师问题。

## 9. 复盘问题

- 为什么快 PLL 相位收敛更快，但频率估算更抖？
- 如果电网电压含明显谐波，你会倾向提高还是降低 PLL 带宽？为什么？
- 如果旁路切换要求很快确认同步，带宽和锁定判据应怎样一起考虑？

## 10. 导师问题

- 我用 `single_phase_pll_bandwidth.py` 看到快 PLL 收敛快，但 `f_est` 纹波更大。公司 UPS 的 PFC、旁路同步和逆变同步是否使用不同 PLL 带宽？
- 图中相位噪声为 2 度时，快 PLL 的频率纹波明显更大。实际代码里是否会对 `vq` 或 `f_est` 做滤波？
- 公司平台的 PLL 锁定判据是固定 ±几度、固定频率误差，还是随模式和电网质量变化？
