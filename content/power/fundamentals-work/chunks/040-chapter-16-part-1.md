---
date: 2026-08-01
section: 电源控制
chapter: fundamentals
chapterTitle: 电力电子基础教材
chapterOrder: 10
category: 电力电子基础教材
source: power
visibility: public
title: "第16章 面向设计的分析技巧：额外元件定理（第1部分）"
tags:
  - power-electronics
  - 教材
  - Fundamentals-of-Power-Electronics
status: learning
summary: "`Fundamentals of Power Electronics 3rd Edition.pdf`"
navGroup: 教材研读
navGroupOrder: 25
---

# 第16章 面向设计的分析技巧：额外元件定理（第1部分）

> 源页：629–648
> 本部分涵盖 16.1 额外元件定理和 16.2 EET 示例。

## 章引言

Middlebrook 额外元件定理（EET）是面向设计分析的强大技巧，辅助复杂电路和系统的分析，目标是导出对设计有用的可处理方程。与第13章反馈定理一样，它基于线性叠加和零双注入分析技巧。

额外元件定理揭示已知传递函数如何因加入新网络元件而改变。16.1 节含零双注入推导，16.2 节描述若干使用示例。此定理是第17章变换器输入滤波器分析的基础。16.2.3 节用 EET 获得如何阻尼 SEPIC 内部谐振的理解。

N 额外元件定理（n-EET）是 EET 向同时加入多个元件的扩展。n-EET 的一个有用应用是将所有储能元件视为额外元件：传递函数可写为几乎无代数的归一化有理分式。此强大技巧可大幅扩展工程师对复杂动态电路进行可处理纸面分析和设计的能力。16.3 节无证明描述此技巧，并含若干示例。

## 16.1 额外元件定理

R. D. Middlebrook [139–141] 的额外元件定理表明传递函数如何因向网络加入阻抗而改变。此定理允许确定此额外元件对任何感兴趣传递函数的影响，无需重新求解系统。额外元件定理是面向设计分析的强大技巧。它导出保证元件不显著改变传递函数的阻抗不等式。额外元件定理在第17章使用，导向设计不退化开关稳压器环路增益的输入滤波器的相对简单方法。22.4 节也使用它确定负载电阻如何影响谐振逆变器特性。本节基于叠加原理导出 Middlebrook 额外元件定理，并通过示例说明其应用。

![源页 p.630](../assets/page-snapshots/chapter-16/page-630.png)

图16.1 加入元件如何改变传递函数 $G(s)$：(a) 加入新元件前的原始条件；(b) 加入阻抗为 $Z(s)$ 的元件

### 16.1.1 基本结果

考虑图16.1a 的线性电路。此网络含输入 $v_{in}(s)$ 和输出 $v_{out}(s)$。此外含端子开路的端口。假定从 $v_{in}(s)$ 到 $v_{out}(s)$ 的传递函数已知，为

$$\frac{v_{out}(s)}{v_{in}(s)} = \left.G(s)\right|_{Z(s)\to\infty} \tag{16.1}$$

额外元件定理告诉我们当阻抗 $Z(s)$ 连接到端口端子间时（如图16.1b）传递函数 $G(s)$ 如何修改。结果为

$$\frac{v_{out}(s)}{v_{in}(s)} = \left(\left.G(s)\right|_{Z(s)\to\infty}\right)\frac{\left(1+\dfrac{Z_N(s)}{Z(s)}\right)}{\left(1+\dfrac{Z_D(s)}{Z(s)}\right)} \tag{16.2}$$

涉及 $Z(s)$ 的右边项计入 $Z(s)$ 对 $G(s)$ 的影响，称为校正因子。

额外元件定理也适用于图16.2所示的对偶形式。此形式中传递函数初始在端口短路条件下已知。图16.2b 中短路用阻抗 $Z(s)$ 替代。此情形加入阻抗 $Z(s)$ 使传递函数变为

$$\frac{v_{out}(s)}{v_{in}(s)} = \left(\left.G(s)\right|_{Z(s)\to 0}\right)\frac{\left(1+\dfrac{Z(s)}{Z_N(s)}\right)}{\left(1+\dfrac{Z(s)}{Z_D(s)}\right)} \tag{16.3}$$

式 (16.2) 和 (16.3) 中的 $Z_N(s)$ 和 $Z_D(s)$ 项相同。令式 (16.2) 和 (16.3) 的 $G(s)$ 表达式相等可证

$$\frac{\left.G(s)\right|_{Z(s)\to\infty}}{\left.G(s)\right|_{Z(s)\to 0}} = \frac{Z_D(s)}{Z_N(s)} \tag{16.4}$$

这称为互易关系。

![源页 p.631](../assets/page-snapshots/chapter-16/page-631.png)

图16.2 额外元件定理的对偶形式，其中额外元件替代短路：(a) 原始条件；(b) 加入阻抗 $Z(s)$ 的元件

量 $Z_N(s)$ 和 $Z_D(s)$ 可通过在端口测量阻抗求得。项 $Z_D(s)$ 是从端口看入的戴维南等效阻抗，也称驱动点阻抗。如图16.3a所示，此阻抗通过令独立源 $v_{in}(s)$ 为零然后测量端口端子间阻抗求得：

$$Z_D(s) = \left.\frac{v(s)}{i(s)}\right|_{v_{in}(s)=0} \tag{16.5}$$

故 $Z_D(s)$ 是输入 $v_{in}(s)$ 设为零时端口端子间的阻抗。

确定阻抗 $Z_N(s)$ 如图16.3b所示。项 $Z_N(s)$ 在输出 $v_{out}(s)$ 置零条件下求得。电流源 $i(s)$ 接到端口端子。输入信号 $v_{in}(s)$ 存在下调整 $i(s)$ 使输出 $v_{out}(s)$ 置零。此条件下量 $Z_N(s)$ 为

$$Z_N(s) = \left.\frac{v(s)}{i(s)}\right|_{v_{out}(s)\to\text{null} 0} \tag{16.6}$$

注意置零输出不等于短路输出。若简单短路输出，则电流流过短路，在网络其他元件中引起电压降和电流。这些电压降和电流在输出置零时不存在。图16.3b 的置零条件不采用对电路输出的任何连接。而是置零条件通过以特殊方式调整独立源 $v_{in}(s)$ 和 $i(s)$ 使输出 $v_{out}(s)$ 为零来实现。由叠加，$v_{out}(s)$ 可表示为 $v_{in}(s)$ 和 $i(s)$ 的线性组合；故对给定 $v_{in}(s)$，总可选择使 $v_{out}(s)$ 为零的 $i(s)$。此置零条件下 $Z_N(s)$ 作为 $v(s)$ 与 $i(s)$ 之比测量。实际中求 $Z_N(s)$ 的电路分析比分析 $Z_D(s)$ 简单，因为置零条件使电路内许多信号为零。16.2 节给出若干示例。

![源页 p.632](../assets/page-snapshots/chapter-16/page-632.png)

图16.3 量 $Z_N(s)$ 和 $Z_D(s)$ 的确定：(a) $Z_D(s)$ 是端口处的驱动点阻抗，在输入 $v_{in}(s)$ 设为零时测量；(b) $Z_N(s)$ 是输出置零条件下端口处看到的阻抗

输入和输出量不必是电压，也可为电流或其他可设零或置零的信号。下一节含用一般输入 $u(s)$ 和输出 $y(s)$ 的额外元件定理推导。

### 16.1.2 推导

图16.4a 给出含输入 $u(s)$ 和输出 $y(s)$ 的一般线性系统。此外系统含电压 $v(s)$ 和电流 $i(s)$ 的电气端口，极性如图所示。初始端口开路：$i(s) = 0$。端口开路时此系统的传递函数为

$$G_{old}(s) = \left.\frac{y(s)}{u(s)}\right|_{i(s)=0} \tag{16.7}$$

额外元件定理的目标是确定阻抗 $Z(s)$ 连接到端口时获得的新传递函数 $G(s)$：

$$G(s) = \frac{y(s)}{u(s)} \tag{16.8}$$

情况如图16.4b所示。可见端口条件现为

$$v(s) = -i(s)Z(s) \tag{16.9}$$

![源页 p.633](../assets/page-snapshots/chapter-16/page-633.png)

图16.4 通过加入额外元件修改线性网络：(a) 原始系统；(b) 修改后系统，阻抗 $Z(s)$ 接在电气端口

为用式 (16.7) 原始传递函数 $G_{old}(s)$ 表示式 (16.8) 的新传递函数 $G(s)$，在端口处用电流注入，如图16.5所示。现有两个独立输入：输入 $u(s)$ 和独立电流源 $i(s)$。因变量 $y(s)$ 和 $v(s)$ 可用叠加原理表示为这些独立输入的函数：

$$y(s) = G_{old}(s)u(s) + G_i(s)i(s) \tag{16.10}$$

$$v(s) = G_v(s)u(s) + Z_D(s)i(s) \tag{16.11}$$

![源页 p.633](../assets/page-snapshots/chapter-16/page-633.png)

图16.5 通过加入独立电流源 $i(s)$ 在电气端口处电流注入

其中

$$G_{old}(s) = \left.\frac{y(s)}{u(s)}\right|_{i(s)=0} \tag{16.12}$$

$$G_i(s) = \left.\frac{y(s)}{i(s)}\right|_{u(s)=0} \tag{16.13}$$

$$Z_D(s) = \left.\frac{v(s)}{i(s)}\right|_{u(s)=0} \tag{16.14}$$

$$G_v(s) = \left.\frac{v(s)}{u(s)}\right|_{i(s)=0} \tag{16.15}$$

是从独立输入到各自因变量 $y(s)$ 和 $v(s)$ 的传递函数。

从方程组 (16.9) 至 (16.11) 消去 $v(s)$ 和 $i(s)$ 并解 $y(s)$ 作为 $u(s)$ 的函数可求传递函数 $G(s)$。结果为

$$G(s) = \frac{y(s)}{u(s)} = G_{old}(s) - \frac{G_v(s)G_i(s)}{Z(s)+Z_D(s)} \tag{16.16}$$

此中间结果将新传递函数 $G(s)$ 表示为原始传递函数 $G_{old}(s)$ 和额外元件 $Z(s)$ 及量 $Z_D(s)$、$G_v(s)$、$G_i(s)$ 的函数。

式 (16.14) 给出直接求 $Z_D(s)$ 的方法。$Z_D(s)$ 是输入 $u(s)$ 设为零时端口处的驱动点阻抗。此量可用常规电路分析或仿真或实验室测量求得。

虽然 $G_v(s)$ 和 $G_i(s)$ 也可由定义 (16.13) 和 (16.15) 确定，但更可取的是消去这些量，改为将 $G(s)$ 表示为给定端口处阻抗的函数。可通过以下思维实验完成。

输入 $u(s)$ 存在下以使输出 $y(s)$ 置零的特殊方式调整独立电流源 $i(s)$。$Z_N(s)$ 定义为此置零条件下 $v(s)$ 与 $i(s)$ 之比：

$$Z_N(s) = \left.\frac{v(s)}{i(s)}\right|_{y(s)\to\text{null} 0} \tag{16.17}$$

实现置零条件 $y(s) \to \text{null} 0$ 的 $i(s)$ 值可通过在式 (16.10) 中令 $y(s) = 0$ 求得：

$$\left[G_{old}(s)u(s) + G_i(s)i(s)\right] \to \text{null} 0 \tag{16.18}$$

故当输入 $u(s)$ 和 $i(s)$ 如下相关时输出 $y(s)$ 置零：

$$\left.u(s)\right|_{y(s)\to\text{null} 0} = -\frac{G_i(s)}{G_{old}(s)}\left.i(s)\right|_{y(s)\to\text{null} 0} \tag{16.19}$$

此置零条件下电压 $v(s)$ 由式 (16.11) 和 (16.19) 得

$$\left.v(s)\right|_{y(s)\to\text{null} 0} = \left.G_v(s)u(s)\right|_{y(s)\to\text{null} 0} + \left.Z_D(s)i(s)\right|_{y(s)\to\text{null} 0} = \left(-\frac{G_v(s)G_i(s)}{G_{old}(s)} + Z_D(s)\right)\left.i(s)\right|_{y(s)\to\text{null} 0} \tag{16.20}$$

将式 (16.17) 代入式 (16.20) 得

$$\left.v(s)\right|_{y(s)\to\text{null} 0} = Z_N(s)\left.i(s)\right|_{y(s)\to\text{null} 0} = \left(-\frac{G_v(s)G_i(s)}{G_{old}(s)} + Z_D(s)\right)\left.i(s)\right|_{y(s)\to\text{null} 0} \tag{16.21}$$

故

$$Z_N(s) = Z_D(s) - \frac{G_v(s)G_i(s)}{G_{old}(s)} \tag{16.22}$$

解 $G_v(s)G_i(s)$ 得

$$G_v(s)G_i(s) = (Z_D(s) - Z_N(s))G_{old}(s) \tag{16.23}$$

故未知量 $G_v(s)$ 和 $G_i(s)$ 可与 $Z_N(s)$ 和 $Z_D(s)$（新阻抗 $Z(s)$ 将连接的端口性质）及原始传递函数 $G_{old}(s)$ 关联。

最后一步是将式 (16.23) 代入式 (16.16) 得

$$G(s) = G_{old}(s) - \frac{Z_D(s)-Z_N(s)}{Z(s)+Z_D(s)}G_{old}(s) \tag{16.24}$$

此表达式可简化为

$$G(s) = G_{old}(s)\frac{\left(1+\dfrac{Z_N(s)}{Z(s)}\right)}{\left(1+\dfrac{Z_D(s)}{Z(s)}\right)} \tag{16.25}$$

或

$$G(s) = \left(\left.G(s)\right|_{Z(s)\to\infty}\right)\frac{\left(1+\dfrac{Z_N(s)}{Z(s)}\right)}{\left(1+\dfrac{Z_D(s)}{Z(s)}\right)} \tag{16.26}$$

这是所需结果。它表明传递函数 $G(s)$ 如何因加入额外元件 $Z(s)$ 而修改。式 (16.26) 最右项称为校正因子；此项定量给出引入 $Z(s)$ 引起的 $G(s)$ 变化。

对偶结果 [式 (16.3)] 的推导遵循类似步骤。

### 16.1.3 讨论

额外元件定理的一般形式使其适合设计使不希望电路元件不退化已获得的理想系统性能的系统。例如设我们已在简化或理想条件下已知某传递函数或类似量 $G(s)$，并已设计系统使此量满足指标。然后用额外元件定理回答以下问题：

- 原始分析中未包含的寄生元件 $Z(s)$ 的影响是什么？
- 若后来决定向系统加入阻抗为 $Z(s)$ 的附加元件会发生什么？
- 能否建立确保 $G(s)$ 不显著改变的对 $Z(s)$ 的条件？

额外元件定理的常见应用是确定保证传递函数 $G(s)$ 不显著改变的额外元件条件。按式 (16.2) 和 (16.26)，当校正因子近似为 1 时发生。条件为

$$\|Z(j\omega)\| \gg \|Z_N(j\omega)\|$$

$$\|Z(j\omega)\| \gg \|Z_D(j\omega)\| \tag{16.27}$$

这给出何时可忽略阻抗的正式方法：可绘 $\|Z_N(j\omega)\|$ 和 $\|Z_D(j\omega)\|$，与 $\|Z(j\omega)\|$ 图比较。不等式 (16.27) 满足的频率范围内可忽略阻抗 $Z(s)$。

对偶情形（新阻抗插入先前为短路处）[式 (16.3)]，不等式反转：

$$\|Z(j\omega)\| \ll \|Z_N(j\omega)\|$$

$$\|Z(j\omega)\| \ll \|Z_D(j\omega)\| \tag{16.28}$$

此方程表明如何限制 $\|Z(j\omega)\|$ 以避免显著改变传递函数 $G(s)$。

对定量设计，式 (16.27) 和 (16.28) 引出附加问题：$\|Z(j\omega)\|$ 应超过（或小于）$\|Z_N(j\omega)\|$ 和 $\|Z_D(j\omega)\|$ 多少倍才能使式 (16.27) 或 (16.28) 不等式充分满足？此问题可通过绘校正因子项的幅值和相位作为 $(Z/Z_N)$ 和 $(Z/Z_D)$ 幅值和相位的函数来回答。

![源页 p.637](../assets/page-snapshots/chapter-16/page-637.png)

图16.6 $\|1+Z/Z_N\|$ 的等值线，作为 $Z/Z_N$ 幅值和相位的函数

![源页 p.637](../assets/page-snapshots/chapter-16/page-637.png)

图16.7 $\angle(1+Z/Z_N)$ 的等值线，作为 $Z/Z_N$ 幅值和相位的函数

图16.6 给出 $\|1+Z/Z_N\|$ 的等值线作为 $Z/Z_N$ 幅值和相位的函数。图16.7 给出 $\angle(1+Z/Z_N)$ 的类似等值线。可见 $\|Z/Z_N\|$ 小于 −20 dB 时分子 $(1+Z/Z_N)$ 项引起的最大偏差幅值小于 ±1 dB、相位小于 ±7°。$\|Z/Z_N\|$ 小于 −10 dB 时分子项引起的最大偏差幅值小于 ±3.5 dB、相位小于 ±20°。

![源页 p.638](../assets/page-snapshots/chapter-16/page-638.png)

图16.8 $\|1+Z/Z_D\|$ 的等值线，作为 $Z/Z_D$ 幅值和相位的函数

![源页 p.638](../assets/page-snapshots/chapter-16/page-638.png)

图16.9 $\angle(1+Z/Z_D)$ 的等值线，作为 $Z/Z_D$ 幅值和相位的函数

图16.8 和16.9 分别含 $\|1/(1+Z/Z_D)\|$ 和 $\angle 1/(1+Z/Z_D)$ 的等值线作为 $Z/Z_D$ 幅值和相位的函数。这些图含负号因为项出现在校正因子分母中；否则与图16.6 和16.7 相同。同样 $\|Z/Z_D\|$ 小于 −20 dB 时分母 $(1+Z/Z_D)$ 项引起的最大偏差幅值小于 ±1 dB、相位小于 ±7°。$\|Z/Z_D\|$ 小于 −10 dB 时分母项引起的最大偏差幅值小于 ±3.5 dB、相位小于 ±20°。

## 16.2 EET 示例

### 16.2.1 简单传递函数

第一个示例说明额外元件定理如何用于基本凭观察求传递函数。给定图16.10 所示电路。希望求传递函数

$$G(s) = \frac{v_2(s)}{v_1(s)} \tag{16.29}$$

并将此传递函数表示为因式分解极点-零点形式。一种方法是采用额外元件定理，将电容 $C$ 视为"额外"元件。如图16.11所示，电气端口取在电容位置，"原始条件"取为电容阻抗为无穷大（即开路）的情形。此原始条件下传递函数由电阻 $R_1$、$R_3$、$R_4$ 组成的分压器给出。故 $G(s)$ 可表示为

$$\frac{v_2(s)}{v_1(s)} = G(s) = \left(\frac{R_4}{R_1+R_3+R_4}\right)\frac{\left(1+\dfrac{Z_N}{Z}\right)}{\left(1+\dfrac{Z_D}{Z}\right)} \tag{16.30}$$

其中 $Z(s)$ 是电容阻抗 $1/sC$。

![源页 p.639](../assets/page-snapshots/chapter-16/page-639.png)

图16.10 16.2.1 节的 R-C 电路示例

![源页 p.639](../assets/page-snapshots/chapter-16/page-639.png)

图16.11 将图16.10 电路整理为图16.1 形式

阻抗 $Z_D(s)$ 是电容连接处端口看入的戴维南等效阻抗。如图16.12a所示，此阻抗通过令独立源 $v_1(s)$ 为零然后确定端口端子间阻抗求得。结果为

$$Z_D = R_2 + R_1\,\|\,(R_3+R_4) \tag{16.31}$$

![源页 p.640](../assets/page-snapshots/chapter-16/page-640.png)

图16.2 量 $Z_N(s)$ 和 $Z_D(s)$ 的测量：(a) 确定 $Z_D(s)$；(b) 确定 $Z_N(s)$

图16.12b 说明确定阻抗 $Z_N(s)$。电流源 $i(s)$ 接到端口替代电容。输入 $v_1(s)$ 存在下调整电流源 $i(s)$ 使输出 $v_2(s)$ 置零。此置零条件下阻抗 $Z_N(s)$ 作为 $v(s)$ 与 $i(s)$ 之比求得。

先确定置零条件对电路中信号的影响最易求 $Z_N(s)$。由于 $v_2$ 置零，电阻 $R_4$ 中无电流。由于 $R_3$ 与 $R_4$ 串联，$R_3$ 中也无电流，故 $R_3$ 两端无电压。故图16.12b 中电压 $v_3$ 等于 $v_2$，即

$$v_3 = v_2 \to \text{null} 0 \tag{16.32}$$

故电压 $v$ 由 $iR_2$ 给出。阻抗 $Z_N$ 为

$$Z_N(s) = \left.\frac{v(s)}{i(s)}\right|_{v_2\to\text{null} 0} = R_2 \tag{16.33}$$

注意一般 $Z_N$ 测量期间独立源 $v_1$ 和 $i$ 非零。此例中置零条件意味着电流 $i(s)$ 完全流过 $R_2$、$R_1$、$v_1$ 组成的路径。

将式 (16.31) 和 (16.33) 代入式 (16.30) 求传递函数 $G(s)$：

$$G(s) = \left(\frac{R_4}{R_1+R_3+R_4}\right)\frac{(1+sCR_2)}{(1+sC[R_2+R_1\,\|\,(R_3+R_4)])} \tag{16.34}$$

此例中结果以标准归一化极点-零点形式获得，因为电容是电路中唯一动态元件，且电容阻抗趋向开路的"原始条件"与电路中直流条件一致。类似步骤可用 16.3 节的 N 额外元件定理将含任意数量储能元件的电路传递函数写为归一化形式。

### 16.2.2 未建模元件

图16.13 所示简单 R-L-C 低通滤波器中，电容介质损耗、接触（端接）电阻和箔电阻用串联电阻 $R_{esr}$ 建模，即电容等效串联电阻（ESR）。实际电容可含显著 ESR，可退化性能并在功率损耗 $I_{rms}^2 R_{esr}$ 引起电容内过温时导致失效。ESR 的存在也改变滤波传递函数。传递函数首轮分析中常忽略 ESR（"未建模"）；后来可能希望将此元件影响纳入分析。此简单示例的目标是将 ESR 作为额外元件纳入滤波传递函数。

![源页 p.641](../assets/page-snapshots/chapter-16/page-641.png)

图16.13 R-L-C 滤波示例

滤波传递函数 $G(s)$ 定义为

$$G(s) = \frac{v_2}{v_1} \tag{16.35}$$

$R_{esr} \to 0$ 情形滤波传递函数为

$$\left.G(s)\right|_{R_{esr}\to 0} = \frac{1}{1+s\dfrac{L}{R}+s^2 LC} \tag{16.36}$$

故可用额外元件定理确定非零 ESR 如何改变 $G(s)$。如图16.14所示，将"原始电路"视为 ESR 为短路的情形，加入"额外元件"构成在所示端口处断开此短路。

![源页 p.641](../assets/page-snapshots/chapter-16/page-641.png)

图16.14 将电容 ESR 视为额外元件

ESR 存在时传递函数变为

$$G(s) = \left(\left.G(s)\right|_{R_{esr}\to 0}\right)\frac{\left(1+\dfrac{Z(s)}{Z_N(s)}\right)}{\left(1+\dfrac{Z(s)}{Z_D(s)}\right)} \tag{16.37}$$

其中 $Z(s)$ 等于 $R_{esr}$。

![源页 p.642](../assets/page-snapshots/chapter-16/page-642.png)

图16.15 电容 ESR 示例：(a) 确定 $Z_D(s)$；(b) 确定 $Z_N(s)$

图16.15a 说明确定 $Z_D(s)$。输入源 $v_1(s)$ 设为零，求端口端子间阻抗。可见阻抗 $Z_D(s)$ 简化为电容阻抗与电感阻抗和负载电阻 $R$ 并联组合的串联：

$$Z_D(s) = \frac{1}{sC} + \left(R\,\|\,sL\right) = \frac{1+s\dfrac{L}{R}+s^2 LC}{sC\left(1+s\dfrac{L}{R}\right)} \tag{16.38}$$

图16.15b 说明确定 $Z_N(s)$。输入源 $v_1(s)$ 存在下在端口注入电流 $i(s)$ 如图。调整此电流使输出 $v_2(s)$ 置零。此条件下量 $Z_N(s)$ 由 $v(s)/i(s)$ 给出。可见 $v_2(s)$ 置零时电压 $v(s)$ 等于电流 $i(s)$ 乘电容阻抗 $1/sC$。故

$$Z_N(s) = \left.\frac{v(s)}{i(s)}\right|_{v_2(s)\to\text{null} 0} = \frac{1}{sC} \tag{16.39}$$

注意一般 $Z_N(s)$ 测量期间 $i(s)$ 不为零。置零条件通过令源 $i(s)$ 等于值 $-v_1(s)/sL$ 实现。故非零 $R_{esr}$ 存在时传递函数 $G(s)$ 可表示为

$$G(s) = \left(\left.G(s)\right|_{R_{esr}\to 0}\right)\frac{\left(1+\dfrac{R_{esr}}{Z_N(s)}\right)}{\left(1+\dfrac{R_{esr}}{Z_D(s)}\right)} = \left(\frac{1}{1+s\dfrac{L}{R}+s^2 LC}\right)\frac{(1+sCR_{esr})}{\left(1+\dfrac{R_{esr}}{Z_D(s)}\right)} \tag{16.40}$$

可见校正因子加入 $Z_N$ 项引起的频率 $\omega_z = 1/R_{esr}C$ 处零点。分母 $Z_D$ 项可附加修改传递函数；在以下条件满足时分母项影响可忽略

$$R_{esr} \ll \|Z_D\| \tag{16.41}$$

现可绘阻抗不等式 (16.28) 检查加入 $R_{esr}$ 如何改变 $G(s)$。用 8.3 节近似图解构造方法，$Z_D(s)$ 和 $Z_N(s)$ 的幅值对值 $L = 100\,\mu\text{H}$、$C = 1\,\mu\text{F}$、$R = 100\,\Omega$、$R_{esr} = 2\,\Omega$ 构造于图16.16。

$Z_N$ 等于电容阻抗；低频 $R_{esr} \ll \|Z_N\|$。但高频 $\|Z_N\|$ 变小，$R_{esr}$ 不可避免地大于 $\|Z_N\|$。这导致前述频率 $f_z$ 处零点。

![源页 p.643](../assets/page-snapshots/chapter-16/page-643.png)

图16.16 $Z_N$、$Z_D$、$R_{esr}$ 幅值阻抗波特图的构造

给定值下除谐振频率 $f_0$ 附近外所有频率 $\|Z_D\| \gg R_{esr}$。故式 (16.40) 分母 $Z_D$ 项除此谐振频率附近外基本为 1。谐振频率 $f_0$ 处 $Z_D$ 约等于 1 Ω，故分母 $Z_D$ 项变为

$$\left(1+\frac{R_{esr}}{Z_D(s)}\right) = \left(1+\frac{2\,\Omega}{1\,\Omega}\right) = 3 \tag{16.42}$$

这有效将传递函数 Q 因子从 10 降到约 10/3 = 3.33。

展开式 (16.40) 可验证精确传递函数 $G(s)$ 可表示为

$$G(s) = \frac{(1+sCR_{esr})}{1+s\!\left(\dfrac{L}{R}+R_{esr}C\right)+s^2 LC\!\left(\dfrac{R+R_{esr}}{R}\right)} \tag{16.43}$$

分母 $Z_D$ 项的影响是将精确 Q 因子从 10 降到 3.37，将谐振频率 $f_0$ 从 15.9 kHz 降到 15.8 kHz。

### 16.2.3 SEPIC 示例

作为第三个例子，考虑 SEPIC 小信号传递函数的推导和设计。14.1.3 节用平均开关建模导出 SEPIC 小信号模型，结果如图14.7所示并复制于图16.17。由于平均开关建模所得电路卷曲性质，传递函数 $G_{vd}(s)$ 分析繁琐。额外元件定理给出此电路求解的替代方法，导致传递函数的简化解释。此方法还给出如何阻尼此四阶系统内部谐振使小信号传递函数行为更好的洞察。

图16.17 模型求解的困难来自元件 $C_1$，它提供与直流变压器并联的路径耦合模型的输入和输出部分。若此元件不存在，电路求解将简单得多。故本节所用策略是令 $C_1$ 成为开路，求解所得简单得多的模型。然后用额外元件定理将 $C_1$ 的影响纳入 $G_{vd}(s)$ 等传递函数。定义

$$G_{vd-bb} = \left.\frac{\hat{v}}{\hat{d}}\right|_{C_1\to 0} \tag{16.44}$$

![源页 p.644](../assets/page-snapshots/chapter-16/page-644.png)

图16.17 SEPIC 的小信号平均开关模型，图14.7

额外元件定理预测此传递函数可写为

$$G_{vd} = G_{vd-bb}\frac{\left(1+\dfrac{Z_N}{Z}\right)}{\left(1+\dfrac{Z_D}{Z}\right)} \tag{16.45}$$

$Z = 1/sC_1$。量 $Z_N$ 和 $Z_D$ 用额外元件定理求得。阻抗 $Z_D$ 是 $C_1$ 连接处端口的驱动点阻抗。式 (16.44)–(16.45) 表明 SEPIC 的控制-输出传递函数等于有效升降压变换器 $G_{vd-bb}$ 乘以计入 $C_1$ 及其关联谐振影响的校正因子。

![源页 p.645](../assets/page-snapshots/chapter-16/page-645.png)

图16.18 $C_1 \to 0$ 时 SEPIC 模型简化为有效升降压变换器

令 $C_1$ 趋向开路时，图16.17 SEPIC 模型可简化为图16.18 所示有效升降压变换器模型。此电路的传递函数现可按第7和8章所述常规方式求得。令 $\hat{v}_g$ 源为零解 $\hat{v}$ 求从 $\hat{d}$ 到 $\hat{v}$ 的传递函数，结果为

$$G_{vd-bb}(s) = \frac{V_g}{D'^2}\frac{1-s\dfrac{L_1}{R}\!\left(\dfrac{D}{D'}\right)^2}{1+\dfrac{s}{R\!\left(L_2+\left(\dfrac{D}{D'}\right)^2 L_1\right)}+s^2 C_2\!\left(L_2+\left(\dfrac{D}{D'}\right)^2 L_1\right)} \tag{16.46}$$

此表达式形式为

$$G_{vd-bb}(s) = G_{d0}\frac{1-\dfrac{s}{\omega_z}}{1+\dfrac{s}{Q_o\omega_o}+\left(\dfrac{s}{\omega_o}\right)^2} \tag{16.47}$$

其中

$$G_{d0} = \frac{V_g}{D'^2}, \quad \omega_o = \frac{1}{\sqrt{C_2\!\left(L_2+\left(\dfrac{D}{D'}\right)^2 L_1\right)}}, \quad Q_o = R\sqrt{\frac{C_2}{L_2+\left(\dfrac{D}{D'}\right)^2 L_1}}, \quad \omega_z = \frac{R}{L_1}\!\left(\frac{D'}{D}\right)^2\ (\text{RHP}) \tag{16.48}$$

故 $G_{vd-bb}$ 含二次极点和 RHP 零点。

$Z_N$ 的推导如图16.19所示。$\hat{v}_g$ 源设为零。$\hat{d}$ 存在下向 $C_1$ 将连接的端口注入电流 $\hat{i}_{test}$。调整源使输出 $\hat{v}$ 置零。

![源页 p.646](../assets/page-snapshots/chapter-16/page-646.png)

图16.19 $Z_N$ 的推导

量 $Z_N$ 为

$$Z_N = \left.\frac{\hat{v}_{test}}{\hat{i}_{test}}\right|_{\hat{v}\to\text{null} 0} \tag{16.49}$$

分析此电路从置零条件开始，沿信号向注入端口跟踪。输出电压置零 $\hat{v} \to \text{null} 0$ 时，负载电阻 $R$ 和输出电容 $C_2$ 中电流也置零。这意味着变压器二次和一次绕组中电流仅由平均开关模型的 $\hat{d}I_2/DD'$ 电流源决定。故一次电流为 $\hat{d}I_2/D'^2$ 如图所示。此外注入电流 $\hat{i}_{test}$ 完全流过电感 $L_2$，$L_2$ 两端电压为 $sL_2\hat{i}_{test}$。此电压也出现在变压器二次侧，可用于求变压器一次电压。这允许将电感 $L_1$ 电压表示为

$$\hat{v}_{L1} = -\frac{V_1\hat{d}}{DD'} - \frac{sL_2\hat{i}_{test}}{D'/D} \tag{16.50}$$

还可写回路方程

$$\hat{v}_{test} + \hat{v}_{L1} = sL_2\hat{i}_{test} \tag{16.51}$$

最后可写节点方程

$$\frac{\hat{v}_{L1}}{sL_1} + \frac{\hat{d}I_2}{D'^2} + \hat{i}_{test} = 0 \tag{16.52}$$

从式 (16.50)、(16.51)、(16.52) 消去 $\hat{v}_{L1}$ 和 $\hat{d}$ 并解 $\hat{v}_{test}/\hat{i}_{test}$ 得 $Z_N$ 的如下表达式：

$$Z_N(s) = \frac{s(L_1+L_2)\left(1-s\dfrac{L_1\,\|\,L_2}{R}\dfrac{D}{D'^2}\right)}{\left(1-\dfrac{sD^2 L_1}{D'^2 R}\right)} \tag{16.53}$$

此方程形式为

$$Z_N(s) = s(L_1+L_2)\frac{\left(1-\dfrac{s}{\omega_{zN}}\right)}{\left(1-\dfrac{s}{\omega_z}\right)} \tag{16.54}$$

应注意 $Z_N$ 等零阻抗不是无源或驱动点阻抗，此阻抗可为负或含 RHP 极点或零点。式 (16.53) 预测 $Z_N$ 呈现 $s(L_1+L_2)$ 串联组合给出的低频渐近线，纯感性，相位 +90°。$Z_N$ 含 RHP 零点和 RHP 极点；RHP 极点与 $G_{vd-bb}$ 的 RHP 零点 $\omega_z$ 重合。高频渐近线为 $sL_2/D$，也纯感性，相位 +90°。

量 $Z_D$ 是 $\hat{v}_g$ 和 $\hat{d}$ 源设为零时电容 $C_1$ 端口处看到的驱动点阻抗。如图16.20所示，在端口注入测试电流 $\hat{i}_{test}$ 测量端口电压 $\hat{v}_{test}$。由于 $Z_D$ 无置零条件关联，此量一般取决于所有元件，故代数更复杂。

![源页 p.647](../assets/page-snapshots/chapter-16/page-647.png)

图16.20 $Z_D$ 的推导

经分析和仔细代数可证

$$Z_D(s) = \frac{s(L_1+L_2)\left(1+s\dfrac{L_1\,\|\,L_2}{D'^2 R}+s^2\dfrac{L_1\,\|\,L_2}{D'^2}C_2\right)}{\left(1+\dfrac{s}{R\!\left(L_2+\left(\dfrac{D}{D'}\right)^2 L_1\right)}+s^2 C_2\!\left(L_2+\left(\dfrac{D}{D'}\right)^2 L_1\right)\right)} \tag{16.55}$$

此表达式形式为

$$Z_D(s) = s(L_1+L_2)\frac{\left(1+\dfrac{s}{Q_{zD}\omega_{zD}}+\left(\dfrac{s}{\omega_{zD}}\right)^2\right)}{\left(1+\dfrac{s}{Q_o\omega_o}+\left(\dfrac{s}{\omega_o}\right)^2\right)} \tag{16.56}$$

其中

$$\omega_{zD} = \frac{D'}{\sqrt{(L_1\,\|\,L_2)C_2}} \tag{16.57}$$

$$Q_{zD} = \frac{D'R}{\sqrt{\dfrac{C_2}{L_1\,\|\,L_2}}} \tag{16.58}$$

量 $G_{vd-bb}$ 和 $Z_D$ 有相同分母多项式。

故 $Z_D$ 的低频渐近线为 $s(L_1+L_2)$。此渐近线纯感性，相位 +90°。含中频二次极点和零点；可使中频渐近线变为阻性或容性。高频渐近线为

$$s(L_1+L_2)\left(\frac{\omega_p}{\omega_z}\right)^2 = s\left(\frac{L_1}{D'^2}\,\|\,\frac{L_2}{D^2}\right) \tag{16.59}$$

也纯感性，相位 +90°。

### 16.2.4 阻尼 SEPIC 内部谐振

考虑如下元件值的 SEPIC：输入电压 $V_g = 18\text{ V}$，输出电压 $V = 24\text{ V}$，开关频率 $f_s = 100\text{ kHz}$，电感 $L_1 = 100\,\mu\text{H}$、$L_2 = 50\,\mu\text{H}$，电容 $C_1 = 22\,\mu\text{F}$、$C_2 = 220\,\mu\text{F}$，负载电阻 $R = 5\,\Omega$。此元件值下式 (16.48) 预测 $G_{vd-bb}$ 含 $f_o = 711\text{ Hz}$ 处 $Q_o = 4.9$ 的复极点。此外 $G_{vd-bb}$ 含 4.5 kHz 处 RHP 零点。

阻抗 $Z_N$ [式 (16.53)]、$Z_D$ [式 (16.56)] 和 $Z = 1/sC_1$ 绘于图16.21。约 2 kHz 以下频率电容 $C_1$ 阻抗幅值远大于 $Z_N$ 或 $Z_D$。故式 (16.45) 中校正因子近似为 1，SEPIC $G_{vd}$ 等于有效升降压模型的 $G_{vd-bb}$。约 6 kHz 以上频率电容 $C_1$ 阻抗幅值远小于 $Z_N$ 和 $Z_D$。此情形下式 (16.45) 简化为
