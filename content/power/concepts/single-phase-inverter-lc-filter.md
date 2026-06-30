---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：单相全桥逆变器 LC 输出滤波
tags:
  - power-electronics
status: learning
summary: 单相全桥逆变器（single-phase full-bridge inverter）把直流母线（DC bus）的电压通过四个功率开关变成高频脉宽调制（pulse-width modulation / PWM）桥臂电压。LC 滤波器（inductor-capacitor filter / LC filter）再把高频开关
---

# 概念：单相全桥逆变器 LC 输出滤波

## 1. 它是什么

单相全桥逆变器（single-phase full-bridge inverter）把直流母线（DC bus）的电压通过四个功率开关变成高频脉宽调制（pulse-width modulation / PWM）桥臂电压。LC 滤波器（inductor-capacitor filter / LC filter）再把高频开关分量压下去，让负载端看到接近 50 Hz 正弦的输出电压。

本节只讲一个概念：逆变器不是直接“生成干净正弦”，而是先生成高频 PWM 电压，再靠 LC 滤波器和控制环把目标基波保留下来。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）在电池模式或双变换在线模式下，需要由直流母线向交流负载供电。逆变器负责把直流能量变成交流能量，LC 滤波器负责降低开关纹波，使输出电压满足负载和电能质量要求。

如果只理解控制器而不理解 LC 滤波器，你读固件时会看不懂为什么要采样输出电压、电感电流、直流母线电压，也不容易判断“波形畸变”到底来自调制、滤波器参数、负载还是控制环。

## 3. 物理直觉

全桥桥臂电压像一个高速来回切换的方波，平均值跟随 50 Hz 正弦参考。电感电流（inductor current / iL）不能突变，所以电感会阻挡高频电压突变；电容电压也不能突变，所以电容会把负载端电压变得平滑。二者组合后，高频 PWM 纹波被大幅衰减，低频 50 Hz 基波被保留下来。

## 4. 数学形式

教学模型使用双极性全桥 PWM：

```text
m*sin(2*pi*f_out*t) 与三角载波比较
v_bridge = +Vdc 或 -Vdc

diL/dt = (v_bridge - v_out) / L
dv_out/dt = (iL - v_out/Rload) / C
f_res = 1 / (2*pi*sqrt(L*C))
```

其中 `m` 是调制比。若全桥双极性输出在 `+Vdc` 和 `-Vdc` 之间切换，理想基波峰值约为 `m*Vdc`，所以 220 Vrms 输出在 400 V 母线下需要约 `m = 220*sqrt(2)/400`。

## 5. 一个仿真任务与仿真观察

运行：

```powershell
python simulations\python\single_phase_inverter_lc_filter.py
```

观察顺序：
- `v_bridge` 是高频 PWM 方波，不是干净正弦。
- `v_out` 是 LC 滤波后的输出电压，应接近 `v_ref`。
- `i_L` 反映滤波器和负载之间的能量交换。
- `Output switching ripple` 是从输出电压中扣掉 50 Hz 基波后的高频残差。

脚本默认保存并自动打开图片；如果无法自动打开，会打印完整图片路径。

一个仿真任务：改变滤波电感，观察输出纹波、电感电流峰值和 LC 谐振频率的变化。

```powershell
python simulations\python\single_phase_inverter_lc_filter.py --filter-inductance 1.0e-3 --output simulations\results\inverter_lc_L_1p0mH.png --no-open
python simulations\python\single_phase_inverter_lc_filter.py --filter-inductance 2.5e-3 --output simulations\results\inverter_lc_L_2p5mH.png --no-open
```

## 6. 固件落地

固件里常见的数据流是：

```text
ADC samples
  -> Vdc, Vout, iL scaling/filtering
  -> sine reference or PLL angle
  -> voltage loop / current loop
  -> PWM compare update
  -> protection checks
```

本节先不进入比例谐振（proportional resonant / PR）控制和均方根（root mean square / RMS）闭环，只要求你能把桥臂 PWM、电感电流、输出电压和 LC 参数联系起来。

## 7. 常见误解

- 错误理解：逆变器直接输出正弦电压。  
  正确理解：功率级先输出 PWM 电压，滤波器和控制环让负载端接近正弦。
- 错误理解：LC 截止频率越低越好。  
  正确理解：太低会增加体积、相位滞后和动态问题；太高又滤不掉开关纹波。
- 错误理解：只要输出 RMS 接近 220 V 就说明波形好。  
  正确理解：还要看纹波、谐波、瞬态、负载变化和保护边界。

## 8. 验收标准

- 能解释 `v_bridge`、`v_out`、`v_ref`、`i_L` 分别代表什么。
- 能说出为什么 LC 滤波器能压低开关纹波，但不会凭空决定输出基波幅值。
- 能根据图内参数框读出 Vdc、Vout_ref、f_out、f_sw、L、C、Rload、f_res 和 t_end。
- 能解释为什么桥臂纹波 RMS 明显大于输出纹波 RMS。
- 能基于 `single_phase_inverter_lc_filter.py` 生成的仿真图准备导师问题。

## 9. 复盘问题

- 400 V 直流母线下，要输出 220 Vrms，调制比为什么接近 0.778？
- 如果把电感从 1.0 mH 增大到 2.5 mH，输出纹波和电感电流峰值会怎样变化？代价是什么？
- 为什么 LC 谐振频率不能离 50 Hz 太近，也不能太靠近 10 kHz 开关频率？

## 10. 导师问题

- 我用 `single_phase_inverter_lc_filter.py` 看到桥臂 PWM 纹波远大于输出纹波。公司 UPS 固件通常会同时采样 `Vout` 和 `iL` 吗？各自主要用于控制还是保护？
- 仿真里 `L=1.80 mH`、`C=20.00 uF` 时 `f_res` 约为几百 Hz。真实产品选择 LC 参数时，通常先看开关频率、体积、动态响应还是保护裕量？
- 如果输出电压 RMS 正常但 `Output switching ripple` 偏大，真实调试时优先怀疑滤波器参数、PWM 死区、采样噪声还是控制环带宽？
