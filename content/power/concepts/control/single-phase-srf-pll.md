---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相 SRF-PLL 入门
tags:
  - power-electronics
status: learning
summary: 锁相环（phase-locked loop / PLL）是一个估算电网相位和频率的闭环。同步旋转坐标系（synchronous reference frame / SRF）PLL 的核心想法是：把输入电压投影到自己估计的旋转坐标系里，让 q 轴误差（q-axis error / vq）趋近于 0。
---

# 概念：单相 SRF-PLL 入门

## 1. 它是什么

锁相环（phase-locked loop / PLL）是一个估算电网相位和频率的闭环。同步旋转坐标系（synchronous reference frame / SRF）PLL 的核心想法是：把输入电压投影到自己估计的旋转坐标系里，让 q 轴误差（q-axis error / vq）趋近于 0。

本节只讲一个概念：`vq` 不为 0 时，说明估算相位和真实电网相位有误差；用比例积分控制器（proportional-integral controller / PI）修正估算频率，积分后得到新的相位。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）需要知道电网相位：

- 功率因数校正（power factor correction / PFC）要让输入电流参考和电网电压同相。
- 旁路（bypass）切换需要判断逆变输出和电网是否同步。
- 逆变器并网或跟随旁路时，需要相位、频率和相序信息。

如果 PLL 错，相当于“坐标系错了”。后面的电流参考、功率方向、并联系统同步都会受影响。

## 3. 物理直觉

把 PLL 想成一个追着电网转的指针。指针慢了，电网相位会跑到前面；指针快了，会超过电网。`vq` 就像“偏左还是偏右”的误差信号。PI 控制器根据这个误差调快或调慢指针，直到指针和电网相位对齐。

## 4. 数学形式

教学模型使用相位误差直接构造 q 轴误差：

```text
theta_err = theta_grid - theta_hat
vq = sin(theta_err)
omega_hat = omega_nominal + Kp * vq + integral(Ki * vq)
theta_hat[k+1] = theta_hat[k] + omega_hat * Ts
```

当误差很小时：

```text
sin(theta_err) ≈ theta_err
```

所以 PLL 在锁定附近可以近似看成一个二阶闭环。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_srf_pll.py
```

观察：

- 初始相位误差会被 PLL 拉回 0 附近。
- 60 ms 时电网相位阶跃 30 度，`theta_err` 会突然变大。
- `f_est` 会短时升高，表示 PLL 让估算相位追上电网。
- 锁定后相位误差回到 ±5 度附近，估算频率回到 50 Hz 附近。

一个仿真任务：对比慢 PLL 和快 PLL 的相位收敛速度、估算频率（estimated frequency / f_est）动作幅度。

```powershell
python simulations\python\single_phase_srf_pll.py --kp 80 --ki 3000 --output simulations\results\srf_pll_slow.png --no-open
python simulations\python\single_phase_srf_pll.py --kp 260 --ki 22000 --output simulations\results\srf_pll_fast.png --no-open
```

## 6. 固件落地

固件里 PLL 通常在固定采样周期运行：

```text
ADC voltage sample
  -> scaling/filtering
  -> phase detector, vq
  -> PI loop filter
  -> frequency limit
  -> phase accumulator
  -> sin/cos angle output
```

落地时要注意：

- 输入电压要有幅值归一化或滤波，否则电网幅值变化会干扰相位检测。
- 估算频率要限幅，避免采样异常时相位飞掉。
- PLL 输出的角度会被 PFC 电流参考、旁路同步和逆变控制复用。
- 锁定判据不能只看瞬间误差，要看一段时间内的相位误差和频率误差。

## 7. 常见误解

- 错误理解：PLL 只是过零检测。  
  正确理解：过零检测只能粗略给相位点，PLL 是连续估算相位和频率的闭环。

- 错误理解：PLL 越快越好。  
  正确理解：太快会把电网噪声、谐波和采样毛刺带进角度；太慢会跟不上频率和相位变化。

- 错误理解：PFC 不需要 PLL。  
  正确理解：简单单相 PFC 可以直接用电压采样生成参考，但工程里仍常需要相位、频率、过零、同步和异常检测信息。

## 8. 验收标准

- 能解释 `vq` 为什么代表估算相位偏差。
- 能说明 `omega_hat` 如何由额定角频率、比例项和积分项组成。
- 能在图中指出 `vac`、`theta_err`、`vq`、`f_est` 和锁定带（lock band）。
- 能解释相位阶跃后 `f_est` 为什么会短时升高。
- 能基于 `single_phase_srf_pll.py` 生成的仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `theta_err` 回到 0 附近时，`vq` 也会回到 0 附近？
- 如果把 `--kp` 和 `--ki` 调得很大，图里的 `f_est` 会出现什么变化？
- 如果输入电网电压含 5 次谐波，PLL 角度可能会怎样受影响？

## 10. 导师问题

- 我用 `single_phase_srf_pll.py` 看到 30 度相位阶跃后，`f_est` 会短时升高再回到 50 Hz。公司 UPS 的 PLL 锁定判据通常看相位误差、频率误差，还是两者都看？
- 图里 `Kp=180, Ki=12000` 能较快收敛。实际工程中 PLL 带宽通常如何选，PFC 和旁路同步会不会用不同带宽？
- 如果输入电压含谐波或采样噪声，公司平台是在 PLL 前加滤波，还是在 `vq` 误差后加滤波？
