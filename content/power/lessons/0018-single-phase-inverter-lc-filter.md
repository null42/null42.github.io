---
title: 教程 0018：单相全桥逆变器（single-phase full-bridge inverter）的 LC 输出滤波
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0018-single-phase-inverter-lc-filter.html
status: learning
visibility: public
summary: Imported from 0018-single-phase-inverter-lc-filter.html
chapterOrder: 10
---

# 教程 0018：单相全桥逆变器（single-phase full-bridge inverter）的 LC 输出滤波

中文主讲，一个概念，一个仿真任务：逆变器先产生高频脉宽调制（pulse-width modulation / PWM）桥臂电压，再通过 LC 滤波器把负载端电压变成接近 50 Hz 正弦。

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

单相全桥逆变器（single-phase full-bridge inverter）用四个功率开关，把直流母线（DC bus）电压切换成正负交替的桥臂电压。这个桥臂电压不是干净正弦，而是高频 PWM 波形。

LC 滤波器（inductor-capacitor filter / LC filter）由电感 L 和电容 C 组成，作用是压低开关频率附近的高频分量，同时尽量保留 50 Hz 基波。负载端看到的是滤波后的输出电压 `v_out`，不是桥臂原始电压 `v_bridge`。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）在电池供电或在线双变换工作时，需要把直流母线能量变成交流输出。逆变器负责能量变换，LC 滤波器负责让输出波形能给负载使用。

如果你以后读 UPS 控制软件，只盯着电压环代码会很吃力。因为固件里的采样量通常包括输出电压、电感电流（inductor current / iL）和直流母线电压；保护逻辑也会关心过流、输出短路、母线欠压、输出过欠压等状态。理解 LC 滤波器，是从“代码变量”回到“功率级物理对象”的第一步。

## 3. 物理直觉

桥臂电压像一个高速拍打的方波。它的短时间平均值按照正弦规律变化，但瞬时值只有 `+Vdc` 或 `-Vdc`。电感电流不能突变，所以电感会抵抗高频电压突变；电容电压也不能突变，所以电容会把负载端电压变平滑。

可以把 LC 滤波器理解成“允许慢变化通过，阻止快变化直接到负载”的功率级结构。这里的慢变化是 50 Hz 输出基波，快变化是 10 kHz 级别的 PWM 开关纹波。

    直流母线
    Vdc

    全桥 PWM
    v_bridge

    LC 滤波器
    L, C, iL

    交流负载
    v_out, Rload

    输出电压反馈到控制器
    本节先看功率级滤波，不进入 PR 电压环和 RMS 闭环

图 1：逆变器从直流母线取能量，经全桥 PWM 和 LC 滤波后给交流负载供电。

## 4. 数学形式

  m = Vout_peak_ref / Vdc
v_bridge = +Vdc  if  m*sin(2*pi*f_out*t) >= triangular_carrier
v_bridge = -Vdc  otherwise

diL/dt = (v_bridge - v_out) / L
dv_out/dt = (iL - v_out/Rload) / C
f_res = 1 / (2*pi*sqrt(L*C))

本节脚本使用双极性全桥 PWM。若目标输出是 220 Vrms，峰值就是 `220*sqrt(2)`。在 400 V 直流母线下，调制比约为 0.778。这个估算让你看到“母线电压、调制比、输出电压”之间的直接关系。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\single_phase_inverter_lc_filter.py

脚本会生成并自动打开图；如果无法自动打开，会打印完整路径。图中包含直流母线电压、输出电压参考、输出频率、开关频率、电感、电容、负载、电感电流、LC 谐振频率、仿真时长和纹波 RMS。

    一个仿真任务
    python simulations\python\single_phase_inverter_lc_filter.py --filter-inductance 1.0e-3 --output simulations\results\inverter_lc_L_1p0mH.png
python simulations\python\single_phase_inverter_lc_filter.py --filter-inductance 2.5e-3 --output simulations\results\inverter_lc_L_2p5mH.png

对比不同电感时的 `Output switching ripple`、`i_L` 峰值和 `f_res`。注意文件名已经标出当前参数条件，图内参数框也会显示 L、C、负载和开关频率。

观察顺序：

- 先看 `v_bridge`，确认它是高频 PWM 方波。

- 再看 `v_out` 是否跟随 `v_ref`。

- 看 `i_L` 是否是连续变化的电感电流。

- 最后看 `Output switching ripple`，理解 LC 滤波器把高频残差压低了多少。

## 6. 固件落地

固件中可以按下面链路找变量：

  ADC samples
  -> Vdc, Vout, iL scaling/filtering
  -> sine reference or PLL angle
  -> voltage loop / current loop
  -> PWM compare update
  -> protection checks

这里的 `Vout` 常用于输出电压控制和均方根值（root mean square / RMS）判断，`iL` 常用于电流内环、限流、短路保护或负载突变判断，`Vdc` 用于调制限幅和母线保护。真实产品还会叠加死区补偿、采样校准、过流硬件保护和状态机，本节先不展开。

## 7. 常见误解

- **误解：**逆变器直接输出正弦电压。
**纠正：**功率开关输出的是 PWM 电压，LC 滤波器和控制环让负载端接近正弦。

- **误解：**LC 谐振频率越低越好。
**纠正：**太低会带来体积、成本、相位滞后和动态响应问题；太高又滤不干净开关纹波。

- **误解：**输出 RMS 接近 220 V 就说明波形没问题。
**纠正：**还要看开关纹波、低频畸变、瞬态过冲、负载变化和保护边界。

## 8. 验收标准

- 能解释 `v_bridge`、`v_out`、`v_ref`、`i_L` 分别代表什么。

- 能说出为什么 LC 滤波器能压低开关纹波，但不会凭空决定输出基波幅值。

- 能根据图内参数框读出 Vdc、Vout_ref、f_out、f_sw、L、C、Rload、f_res 和 t_end。

- 能解释为什么桥臂纹波 RMS 明显大于输出纹波 RMS。

- 能基于仿真图准备导师问题。

## 9. 复盘问题

- 400 V 直流母线下，要输出 220 Vrms，调制比为什么接近 0.778？

- 如果把电感从 1.0 mH 增大到 2.5 mH，输出纹波和电感电流峰值会怎样变化？代价是什么？

- 为什么 LC 谐振频率不能离 50 Hz 太近，也不能太靠近 10 kHz 开关频率？

## 10. 导师问题

- 我用 `single_phase_inverter_lc_filter.py` 看到桥臂 PWM 纹波远大于输出纹波。公司 UPS 固件通常会同时采样 `Vout` 和 `iL` 吗？它们分别主要用于控制还是保护？

- 仿真里 `L=1.80 mH`、`C=20.00 uF` 时 `f_res` 在几百 Hz。真实产品选择 LC 参数时，通常先看开关频率、体积、动态响应还是保护裕量？

- 如果输出 RMS 正常但图中的 `Output switching ripple` 偏大，真实调试时优先怀疑滤波器参数、PWM 死区、采样噪声还是控制环带宽？

**下一步：**在看清 LC 输出滤波后，可以继续学习逆变器电压控制，尤其是比例谐振（proportional resonant / PR）控制为什么适合正弦稳态误差消除。

关联：[上一节：PLL 频率限幅与锁定检测](0017-single-phase-pll-lock-detector.html)；源稿：`concepts/power-electronics/single-phase-inverter-lc-filter.md`。

    上一节：教程 0017：锁相环（phase-locked loop / PLL）的频率限幅与锁定检测
    下一节：教程 0019：单相逆变器比例谐振控制（proportional resonant control / PR control）
