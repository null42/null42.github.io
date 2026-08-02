---
date: 2026-08-01
section: 电源控制
chapter: fundamentals
chapterTitle: 电力电子基础教材
chapterOrder: 10
category: 电力电子基础教材
source: power
visibility: public
title: "第12章 变压器设计（第2部分）"
tags:
  - power-electronics
  - 教材
  - Fundamentals-of-Power-Electronics
status: learning
summary: "`Fundamentals of Power Electronics 3rd Edition.pdf`"
navGroup: 教材研读
navGroupOrder: 25
---

# 第12章 变压器设计（第2部分）

> 源页：513–514
> 本部分仅含习题 12.4（续）和 12.5。

## 习题（续）

**12.4（续）** 在预期工作频率范围内，某铁氧体磁芯材料铁损系数 $K_{fe}$ 的频率依赖可用如下形式的单调递增四阶多项式近似

$$K_{fe}(f) = K_{fe0}\left(1+a_1\!\left(\frac{f}{f_0}\right)+a_2\!\left(\frac{f}{f_0}\right)^2+a_3\!\left(\frac{f}{f_0}\right)^3+a_4\!\left(\frac{f}{f_0}\right)^4\right)$$

其中 $K_{fe0}$、$a_1$、$a_2$、$a_3$、$a_4$ 和 $f_0$ 为常数。在典型变换器变压器应用中，施加一次伏秒 $\lambda_1$ 与开关周期 $T_s = 1/f$ 成正比。希望选择使 $K_{gfe}$（故变压器尺寸）最小的最优开关频率。

(a) 证明最优开关频率是如下多项式的根

$$1+a_1\!\left(\frac{\beta-1}{\beta}\right)\!\left(\frac{f}{f_0}\right)+a_2\!\left(\frac{\beta-2}{\beta}\right)\!\left(\frac{f}{f_0}\right)^2+a_3\!\left(\frac{\beta-3}{\beta}\right)\!\left(\frac{f}{f_0}\right)^3+a_4\!\left(\frac{\beta-4}{\beta}\right)\!\left(\frac{f}{f_0}\right)^4$$

接下来，选择磁芯材料铁损参数为

$$\beta = 2.7, \quad K_{fe0} = 7.6, \quad f_0 = 100\text{ kHz}$$

$$a_1 = -1.3, \quad a_2 = 5.3, \quad a_3 = -0.5, \quad a_4 = 0.075$$

此多项式在 10 kHz < $f$ < 1 MHz 范围内拟合制造商公布数据。

(b) 画 $K_{fe}$ 对 $f$ 的曲线。

(c) 确定使 $K_{gfe}$ 最小的 $f$ 值。

(d) 在 100 kHz ≤ $f$ ≤ 1 MHz 范围内画 $K_{gfe}(f)/K_{gfe}(100\text{ kHz})$。变压器尺寸对开关频率选择有多敏感？

**12.5** 达到给定温升的变压器设计。铁氧体磁芯中心柱温升 $\Delta T$ 与变压器总功率损耗 $P_{tot}$ 成正比：$\Delta T = R_{th}P_{tot}$，其中 $R_{th}$ 是给定环境条件下变压器的热阻。可假定此温升对变压器内损耗分布依赖很小。希望修改 $K_{gfe}$ 变压器设计方法，使温升 $\Delta T$ 替代总功率损耗 $P_{tot}$ 作为技术指标。可忽略导线电阻率 $\rho$ 对温度的依赖。

(a) 按需修改 $n$ 绕组变压器 $K_{gfe}$ 设计方法。定义含 $R_{th}$ 的新磁芯几何常数 $K_{th}$。

(b) 附录 B 的 B.3 节列出铁氧体 EC 磁芯的热阻。用 $\beta = 2.7$ 列出这些磁芯的 $K_{th}$ 表。

(c) 750 W 单输出全桥隔离降压直流-直流变换器以变换器开关频率 $f_s = 200\text{ kHz}$、直流输入电压 $V_g = 400\text{ V}$、直流输出电压 $V = 48\text{ V}$ 工作。匝比 6:1。100 kHz 时铁损方程参数 $K_{fe} = 10\text{ W/T}^\beta\text{cm}^3$，$\beta = 2.7$。假定填充因子 $K_u = 0.3$。可忽略邻近损耗。用 (a) 和 (b) 的设计步骤为此应用设计温升限于 20°C 的变压器。指定：EC 磁芯尺寸、一次和二次匝数、线径、峰值交流磁通密度。

---

第四部分

高级建模、分析与控制技术
