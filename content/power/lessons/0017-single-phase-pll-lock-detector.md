---
title: 教程 0017：锁相环（phase-locked loop / PLL）的频率限幅与锁定检测
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0017-single-phase-pll-lock-detector.html
status: learning
visibility: public
summary: Imported from 0017-single-phase-pll-lock-detector.html
chapterOrder: 10
---

# 教程 0017：锁相环（phase-locked loop / PLL）的频率限幅与锁定检测

中文主讲，一个概念，一个仿真任务：PLL 不只是算角度，还要告诉固件“这个角度现在能不能信”。

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

PLL 不能只输出估算角度就结束。工程固件通常还要做频率限幅（frequency limit）和锁定检测（lock detection）。

- 频率限幅：把估算频率限制在合理范围，例如 45 Hz 到 55 Hz。

- 锁定检测：只有相位误差和频率误差连续一段时间满足条件，才认为 PLL 已锁定。

- 解锁判断（unlock detection）：相位突变、频率限幅、输入异常时，撤销锁定状态。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）会把 PLL 状态用于功率因数校正（power factor correction / PFC）、旁路（bypass）同步、逆变器同步和模式切换。如果 PLL 因噪声或电网异常输出不可信角度，后续控制不能盲目使用。

频率限幅和锁定检测把“算法还在算”与“结果可信”区分开。保护逻辑和故障锁存（fault latch）可能根据这些状态决定是否允许并网、旁路切换或继续闭环控制。

## 3. 物理直觉

PLL 像一个追踪电网的指针。频率限幅相当于给指针转速加机械限位：再着急也不能转到不合理速度。锁定检测相当于观察指针是否稳定贴住目标一段时间，而不是刚好经过目标就宣布成功。

    PLL计算
    f_raw

    频率限幅
    f_est

    锁定检测
    phase/freq/hold

    状态机/保护
    允许或禁止动作

    本节重点是“可信状态”，不是更复杂的 PLL 相位检测算法

图 1：PLL 的工程输出包括角度、频率、限幅标志和锁定状态。

## 4. 数学形式

  f_raw = f_nom + PI(vq)
f_est = clamp(f_raw, f_min, f_max)

phase_ok = abs(theta_err) < phase_band
freq_ok = abs(f_est - f_grid_est) < freq_band
limit_ok = not frequency_limited

if phase_ok and freq_ok and limit_ok for hold_time:
    locked = true

if abs(theta_err) > unlock_phase or frequency_limited:
    locked = false

这里的 `f_grid_est` 在真实工程里可能来自 PLL 内部估算、过零测频或独立电网检测模块。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_pll_lock_detector.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图里包含电网频率、原始估算频率、限幅后估算频率、相位误差、锁定状态、频率限幅标志、电网电压和参数框。

    一个仿真任务
    python simulations\python\single_phase_pll_lock_detector.py --phase-jump-deg 15 --output simulations\results\pll_lock_jump_15.png
python simulations\python\single_phase_pll_lock_detector.py --phase-jump-deg 45 --output simulations\results\pll_lock_jump_45.png

对比 15 度和 45 度相位跳变：观察锁定状态是否掉下去，以及相位误差什么时候重新进入锁定范围。

观察顺序：

- 先看 `f_raw` 是否越过限幅边界。

- 再看 `f_est` 是否被夹在 45 Hz 到 55 Hz 内。

- 看锁定状态是否在持续满足条件后才拉高。

- 看 120 ms 相位跳变后锁定状态是否掉下去。

## 6. 固件落地

固件实现通常会拆成几层：

  PLL update
  -> raw frequency
  -> frequency clamp
  -> phase accumulator
  -> lock detector
  -> mode/protection/state-machine decision

- 限幅值不能只按理想电网设定，还要考虑允许工作范围和保护策略。

- 锁定检测要有保持时间，避免单点噪声误判。

- 解锁条件要保守，尤其涉及旁路切换和并联系统同步时。

- 锁定状态不是故障锁存本身，但可能触发故障锁存或禁止某些模式。

## 7. 常见误解

- **误解：**PLL 输出频率越接近 50 Hz 就一定可信。
**纠正：**还要看相位误差、是否限幅、是否持续稳定。

- **误解：**限幅只是为了防止数值太大。
**纠正：**限幅也是保护边界，防止异常采样让角度飞掉。

- **误解：**一进入锁定带就可以立刻认为锁定。
**纠正：**要持续满足条件一段时间，否则噪声会导致误锁。

## 8. 验收标准

- 能解释 `f_raw` 和 `f_est` 的区别。

- 能解释为什么锁定检测需要保持时间。

- 能在图中指出频率限幅标志、锁定状态、相位误差和解锁点。

- 能说明 PLL lock 状态如何影响 UPS 模式切换和保护逻辑。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 为什么 `f_raw` 越过 55 Hz 时，固件仍应使用限幅后的 `f_est`？

- 为什么不能只要相位误差小于 5 度就立刻宣布锁定？

- PLL 解锁后，哪些 UPS 动作应该被禁止或延后？

## 10. 导师问题

- 我用 `single_phase_pll_lock_detector.py` 看到 `f_raw` 会越过限幅，而 `f_est` 被限制在 45 Hz 到 55 Hz。公司平台 PLL 的频率限幅一般设在哪里？

- 图中 120 ms 相位跳变后锁定状态掉下去。实际代码里 PLL 解锁会触发故障锁存，还是只禁止旁路/并网动作？

- 锁定检测需要保持 15 ms。公司代码里的 PLL lock 判据通常要求连续多少个控制周期满足相位和频率条件？

**下一步：**PLL 主线已经能支撑后续逆变器和旁路同步学习；可以进入单相逆变器 LC 滤波与输出电压控制。

关联：[上一节：PLL 带宽取舍](0016-single-phase-pll-bandwidth.html)；源稿：`concepts/control/single-phase-pll-lock-detector.md`。

    上一节：教程 0016：单相锁相环（phase-locked loop / PLL）的带宽取舍
    下一节：教程 0018：单相全桥逆变器（single-phase full-bridge inverter）的 LC 输出滤波
