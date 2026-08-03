---
date: 2026-08-01
section: 电源控制
chapter: fundamentals
chapterTitle: 电力电子基础教材
chapterOrder: 10
category: 电力电子基础教材
source: power
visibility: public
title: "第18章 电流编程控制（第2部分）"
tags:
  - power-electronics
  - 教材
  - Fundamentals-of-Power-Electronics
status: learning
summary: "`Fundamentals of Power Electronics 3rd Edition.pdf`"
navGroup: 教材研读
navGroupOrder: 25
---


> 源页：747–766
> 本部分涵盖 18.3 更精确的模型、18.4 电流编程传递函数与 18.5 CPM 控制变换器仿真。

![源页 p.747](../assets/page-snapshots/chapter-18/page-747.png)

### 18.2.3 噪声敏感性（续）

电流编程控制器电路对噪声表现出显著的敏感性。其原因如图18.22a所示，其中控制信号 $i_c(t)$ 受到用 $\hat{i}_c$ 表示的微小噪声扰动。可以看出，当没有人工斜坡且电感电流纹波很小时，$i_c$ 的微小扰动会导致占空周期的大扰动：控制器具有高增益。当控制器电路中存在噪声时，占空周期波形可能出现显著的抖动。解决办法是通过引入人工斜坡来降低控制器增益。如图18.22b所示，

![源页 p.748](../assets/page-snapshots/chapter-18/page-748.png)

$i_c$ 的相同扰动现在导致占空周期变化减小。当控制器电路的布局和接地在占空周期波形中引入显著噪声时，可能需要加入幅值远大于电感电流纹波的人工斜坡。

图18.22 当噪声扰动控制器信号 $i_c$ 时，占空周期被扰动：(a) 无人工斜坡且电感电流纹波小时，扰动 $\hat{d}$ 很大；(b) 人工斜坡降低控制器增益，从而减小扰动 $\hat{d}$

$m_a$ 的另一种常见选择为

$$m_a = m_2 \tag{18.58}$$

这使特征值 $\alpha$ 对所有 $D$ 均为零。结果是，对任何不使控制器饱和的 $\hat{i}_L(0)$，$\hat{i}_L(T_s)$ 均为零。系统在一个开关周期 $T_s$ 后即消除任何误差。此行为称为死拍控制（deadbeat control），或有限建立时间。

应当注意，上述稳定性分析采用准静态近似，即假设扰动电感电流波形的斜率 $m_1$ 和 $m_2$ 与稳态情形相同。在最一般情况下，采用电流编程控制的完整系统的稳定性和瞬态响应须用系统级离散时间或采样数据分析来评估。不过，实践中上述论证对选择人工斜坡斜率 $m_a$ 已足够。

## 18.3 更精确的模型

18.1节讨论的简单模型对电流编程变换器的低频行为提供了大量洞见。然而，它们并不总能描述我们需要了解的一切。例如，降压变换器的简单模型预测线路-输出传递函数 $G_{vg}(s)$ 为零。虽然该传递函数的幅值通常确实很小，但它并不等于零。为预测输入电压扰动对输出电压的影响，我们需要计算实际的 $G_{vg}(s)$。此外，简单模型未考虑电感电流纹波或人工斜坡斜率对电感电流平均值的影响。

本节进行更精确的分析，不依赖近似 $\langle i_L(t) \rangle_{T_s} \approx i_c(t)$。将 [167, 168] 的分析方法与 [169] 的控制器模型相结合。构建电流编程控制器的功能框图，其中考虑了人工斜坡和电感电流纹波的存在。该框图附加到第7章导出的平均变换器模型，构成完整的变换器 CPM 模型。列出 CPM 降压、升压和升降压变换器的模型，并对降压变换器模型进行详细分析。

### 18.3.1 电流编程控制器模型

不使用近似 $\langle i_L(t) \rangle_{T_s} = \langle i_c(t) \rangle_{T_s}$，而推导一个更精确的关系式，将平均电感电流 $\langle i_L(t) \rangle_{T_s}$ 与控制输入 $i_c(t)$ 相联系。将移动平均 (7.3) 应用于 $i_L(t)$，

$$\langle i_L(t) \rangle_{T_s} = \frac{1}{T_s} \int_{t-T_s/2}^{t+T_s/2} i_L(\tau)\, d\tau \tag{18.59}$$

在暂态条件下（即 $i_L(0)$ 不等于 $i_L(T_s)$）下的应用如图18.23所示。可以看出，$i_L(t)$ 的峰值 $i_{pk}$ 与 $i_c(t)$ 相差人工斜坡波形在 $t = dT_s$ 时刻的幅值，即 $m_a d T_s$。此外，电感电流波形的峰值和平均值因电感电流纹波而不同。因此，平均电感电流 $\langle i_L(t) \rangle_{T_s}$ 与控制输入 $i_c(t)$ 之间的关系必须涉及人工斜坡的斜率 $m_a$、时间间隔 $dT_s$，以及电感电流斜率 $m_1$ 和 $m_2$。困难在于该关系依赖于式(18.59)中的时间 $t$，即依赖于长度为 $T_s$ 的平均窗口的位置。这与第7章对以占空周期 $d$ 为独立控制输入的连续导通模式波形所做的平均不同——在那里我们发现，无论平均窗口在一个开关周期内的位置如何，结果都相同。然而在电流编程控制中，占空周期 $d$ 不是独立控制输入，而是由控制输入 $i_c(t)$ 在 $dT_s$ 时刻的值决定。正如7.3节讨论的脉宽调制器一样，控制输入的采样发生在开关控制信号的调制边沿处，即 $dT_s$。实际上，如

![源页 p.749](../assets/page-snapshots/chapter-18/page-749.png)

图18.23所示，是 $i_c(dT_s)$ 的值决定了所示开关周期内的占空周期 $d$。因此，$\langle i_L(t) \rangle_{T_s}$ 与 $i_c(t)$ 之间的正确关系通过在调制器采样时刻 $t = dT_s$ 求式(18.59)中的平均电感电流来确定，

$$\langle i_L \rangle_{T_s} = \langle i_L(dT_s) \rangle_{T_s} = \frac{1}{T_s} \int_{(d-0.5)T_s}^{(d+0.5)T_s} i_L(\tau)\, d\tau \tag{18.60}$$

式(18.60)中的平均窗口在图18.23中针对 $d < 0.5$ 的情况示出。可通过将平均窗口分为三个子区间来完成平均：从 $(d-0.5)T_s$ 到 $0$，从 $0$ 到 $dT_s$，以及从 $dT_s$ 到 $(d+0.5)T_s$。通过将三个中点高度分别为 $i_3$、$i_1$、$i_2$ 的梯形面积相加，并减去中点高度为 $i_4$、底边从 $(d+0.5)T_s$ 延伸到 $T_s$ 的梯形面积，可简化积分：

$$\langle i_L(dT_s) \rangle_{T_s} = (0.5-d)\, i_3 + d\, i_1 + d'\, i_2 - (0.5-d)\, i_4 \tag{18.61}$$

$$\langle i_L(dT_s) \rangle_{T_s} = d\, i_1 + d'\, i_2 - (0.5-d)(i_4 - i_3) \tag{18.62}$$

注意到中点 $i_4$ 与 $i_3$ 之间的时间间隔为 $T_s$，而中点 $i_1$ 与 $i_2$ 之间的时间间隔为 $T_s/2$，可简化式(18.62)。由于中点值之间的斜率相同，$i_4 - i_3 = 2(i_2 - i_1)$。因此，式(18.62)变为

$$\langle i_L \rangle_{T_s} = d\, i_1 + d'\, i_2 - 2(0.5-d)(i_2 - i_1) = d'\, i_1 + d\, i_2 \tag{18.63}$$

文献中有多种不同的 CPM 建模方法，最著名的有 [165, 169, 171, 172]；它们之间的重要区别在于如何对电感电流进行平均 [175]。上述关系最初在 [107] 中导出，与文献中报道的其他表达式不同。例如，若平均窗口以 $t = T_s/2$ 为中心、在 $0$ 与 $T_s$ 之间延伸，则得到不同的关系 $\langle i_L \rangle_{T_s} = d\, i_1 + d'\, i_2$ [169]。在平衡态，$i_1 = i_2$，该替代表达式变得与式(18.63)等价。类似地，对低频动态的预测基本相同。然而，对高频动态的预测存在细微但

![源页 p.750](../assets/page-snapshots/chapter-18/page-750.png)

概念上重要的差异。如18.7节进一步讨论的，式(18.63)基于正确放置平均窗口，导出的低阶小信号平均交流模型可由精确的采样数据分析验证。上述结果与式(7.3)的平均定义一致。

由图18.23可知，式(18.63)中的中点电流可求得为

$$i_1 = i_{pk} - \frac{m_1}{2}\, dT_s \tag{18.64}$$

$$i_2 = i_{pk} - \frac{m_2}{2}\, d'T_s \tag{18.65}$$

其中

$$i_{pk} = i_c - m_a dT_s \tag{18.66}$$

将式(18.64)、(18.65)和(18.66)代入式(18.63)，得到 $\langle i_L \rangle_{T_s}$ 与 $i_c$ 之间的大信号关系：

$$\langle i_L \rangle_{T_s} = i_c - m_a dT_s - \frac{m_1 + m_2}{2}\, d d' T_s \tag{18.67}$$

该方程揭示了电感电流纹波和人工斜坡如何使平均电感电流 $\langle i_L \rangle_{T_s}$ 偏离控制输入 $i_c$。

### 18.3.2 小信号平均模型

通过对式(18.67)进行扰动和线性化，得到小信号电流编程控制器模型。令

$$\langle i_L \rangle_{T_s} = I_L + \hat{i}_L(t), \quad \langle i_c \rangle_{T_s} = i_c = I_c + \hat{i}_c(t), \quad d(t) = D + \hat{d}(t) \tag{18.68}$$

$$m_1 = M_1 + \hat{m}_1(t), \quad m_2 = M_2 + \hat{m}_2(t)$$

注意必须扰动斜率 $m_1$ 和 $m_2$，因为根据式(18.30)，电感电流斜率取决于变换器电压。对基本降压、升压和升降压变换器，斜率变化为

表　式(18.69) 基本变换器的斜率变分

| 变换器 | |
|---|---|
| 降压变换器 | $\hat{m}_1 = \dfrac{\hat{v}_g - \hat{v}}{L}$，$\hat{m}_2 = \dfrac{\hat{v}}{L}$ |
| 升压变换器 | $\hat{m}_1 = \dfrac{\hat{v}_g}{L}$，$\hat{m}_2 = \dfrac{\hat{v} - \hat{v}_g}{L}$ |
| 升降压变换器 | $\hat{m}_1 = \dfrac{\hat{v}_g}{L}$，$\hat{m}_2 = \dfrac{-\hat{v}}{L}$ |

![源页 p.751](../assets/page-snapshots/chapter-18/page-751.png)

假设 $m_a$ 不变：$m_a = M_a$。通常的交流扰动和线性化步骤——包括将式(18.68)代入式(18.67)、消去直流项、保留一阶交流项——得：

$$\hat{i}_L(t) = \hat{i}_c(t) - \left( M_a + \frac{M_1 + M_2}{2}(1-2D) \right) T_s\, \hat{d}(t) - \frac{DD'T_s}{2}(\hat{m}_1(t) + \hat{m}_2(t)) \tag{18.70}$$

利用平衡关系 $DM_1 = D'M_2$，式(18.70)可进一步简化：

$$\hat{i}_L(t) = \hat{i}_c(t) - \left( M_a + \frac{M_1 - M_2}{2} \right) T_s\, \hat{d}(t) - \frac{DD'T_s}{2}\, \hat{m}_1(t) - \frac{DD'T_s}{2}\, \hat{m}_2(t) \tag{18.71}$$

最后，解出 $\hat{d}(t)$ 得

$$\hat{d}(t) = \frac{1}{\left( M_a + \dfrac{M_1 - M_2}{2} \right) T_s} \left[ \hat{i}_c(t) - \hat{i}_L(t) - \frac{DD'T_s}{2}\, \hat{m}_1(t) - \frac{DD'T_s}{2}\, \hat{m}_2(t) \right] \tag{18.72}$$

这就是电流编程控制器所遵循的小信号关系，用于确定 $\hat{d}(t)$ 作为 $\hat{i}_c(t)$、$\hat{i}_L(t)$、$\hat{m}_1(t)$ 和 $\hat{m}_2(t)$ 的函数。由于 $\hat{m}_1(t)$ 和 $\hat{m}_2(t)$ 根据式(18.69)依赖于 $\hat{v}_g(t)$ 和 $\hat{v}(t)$，可将式(18.72)写成以下形式：

$$\hat{d}(t) = F_m \left[ \hat{i}_c(t) - \hat{i}_L(t) - F_g\, \hat{v}_g(t) - F_v\, \hat{v}(t) \right] \tag{18.73}$$

其中

$$F_m = \frac{1}{\left( M_a + \dfrac{M_1 - M_2}{2} \right) T_s} \tag{18.74}$$

基本降压、升压和升降压变换器的增益 $F_g$ 和 $F_v$ 表达式列于表18.2。对应于式(18.73)的电流编程控制器小信号模型功能框图如图18.24所示。

现在可通过将图18.24的控制器框图与第7章导出的平均变换器模型结合，得到电流编程变换器模型。图18.25、18.26和18.27展示了将图18.24分别与图7.18的降压、升压和升降压模型结合得到的 CPM 变换器模型。电流编程控制器包含电感电流 $\hat{i}_L(t)$ 和输出电压 $\hat{v}(t)$ 的有效反馈，以及输入电压 $\hat{v}_g(t)$ 的有效前馈。

表18.2 基本变换器的电流编程控制器增益

| 变换器 | $F_g$ | $F_v$ |
|---|---|---|
| 降压 | $\dfrac{DD'T_s}{2L}$ | $0$ |
| 升压 | $0$ | $\dfrac{DD'T_s}{2L}$ |
| 升降压 | $\dfrac{DD'T_s}{2L}$ | $-\dfrac{DD'T_s}{2L}$ |

![源页 p.752](../assets/page-snapshots/chapter-18/page-752.png)

图18.24 电流编程控制器的功能框图

图18.25 电流编程降压变换器的更精确模型

![源页 p.753](../assets/page-snapshots/chapter-18/page-753.png)

图18.26 电流编程升压变换器的更精确模型

图18.27 电流编程升降压变换器的更精确模型

![源页 p.754](../assets/page-snapshots/chapter-18/page-754.png)

## 18.4 电流编程传递函数

接下来求解18.3节的模型，以确定电流编程降压、升压和升降压变换器的控制-输出和线路-输出传递函数的更精确表达式。如第8章讨论的，变换器输出电压 $\hat{v}$ 可表示为占空周期 $\hat{d}$ 和输入电压 $\hat{v}_g$ 变化的函数，使用传递函数 $G_{vd}(s)$ 和 $G_{vg}(s)$：

$$\hat{v}(s) = G_{vd}(s)\, \hat{d}(s) + G_{vg}(s)\, \hat{v}_g(s) \tag{18.75}$$

类似地，电感电流变化 $\hat{i}$ 可表示为占空周期 $\hat{d}$ 和输入电压 $\hat{v}_g$ 变化的函数，定义传递函数 $G_{id}(s)$ 和 $G_{ig}(s)$：

$$\hat{i}_L(s) = G_{id}(s)\, \hat{d}(s) + G_{ig}(s)\, \hat{v}_g(s) \tag{18.76}$$

其中传递函数 $G_{id}(s)$ 和 $G_{ig}(s)$ 由

$$G_{id}(s) = \left. \frac{\hat{i}_L(s)}{\hat{d}(s)} \right|_{\hat{v}_g(s)=0}, \quad G_{ig}(s) = \left. \frac{\hat{i}_L(s)}{\hat{v}_g(s)} \right|_{\hat{d}(s)=0} \tag{18.77}$$

给出。图18.28将图18.25、18.26和18.27的变换器电路模型替换为对应于式(18.75)和(18.76)的框图。此外，在 CPM 控制器输出与占空周期输入之间插入注入源 $\hat{v}_z$，以便利用第13章的反馈定理求取系统传递函数。

现在可通过将反馈定理应用于图18.28的框图求取控制-输出 $G_{vc}(s)$ 和线路-输出 $G_{vg\text{-cpm}}(s)$ 传递函数。闭环控制-输出传递函数为

$$G_{vc}(s) = \left. \frac{\hat{v}}{\hat{i}_c} \right|_{\substack{\hat{v}_z=0 \\ \hat{v}_g=0}} = \frac{G_{vc}^{\infty}\, T_i}{1+T_i} + \frac{G_{vc}^{0}}{1+T_i} \tag{18.78}$$

图18.28 对图18.25、18.26和18.27的电流编程变换器建模的框图

![源页 p.755](../assets/page-snapshots/chapter-18/page-755.png)

其中

$$T_i(s) = \left. \frac{\hat{v}_y}{\hat{v}_x} \right|_{\substack{\hat{i}_c=0 \\ \hat{v}_g=0}} = F_m\, (G_{id} + F_v G_{vd}) \tag{18.79}$$

是环路增益传递函数。注意反馈环路包含两条路径，一条通过 $G_{id}$，另一条通过 $G_{vd}$ 和 $F_v$ 模块，两条路径都包含 CPM 调制器增益 $F_m$。通过 $G_{id}$ 的反馈环路在概念上可视为电流编程控制器中的主反馈环路，而通过 $G_{vd}$ 和 $F_v$ 的反馈环路反映输出电压对电流纹波、从而对平均电感电流的影响。在 CPM 降压变换器中，$F_v = 0$，意味着只存在主反馈环路。

闭环控制-输出理想前向增益 $G_{vc}^{\infty}$ 在 $\hat{v}_g = 0$ 且 $\hat{v}_y$ 置零时求得：

$$G_{vc}^{\infty}(s) = \left. \frac{\hat{v}}{\hat{i}_c} \right|_{\substack{\hat{v}_g=0 \\ \hat{v}_y \to 0}} \tag{18.80}$$

置零 $\hat{v}_y$ 意味着

$$\hat{i}_c - \hat{i}_L - F_v\, \hat{v} \to 0 \tag{18.81}$$

给定 $G_{vd}\, \hat{v}_x = \hat{v}$ 和 $G_{id}\, \hat{v}_x = \hat{i}_L$，有

$$\hat{i}_L = \frac{G_{id}}{G_{vd}}\, \hat{v} \tag{18.82}$$

将式(18.82)代入式(18.81)，得

$$\hat{i}_c - \frac{G_{id}}{G_{vd}}\, \hat{v} - F_v\, \hat{v} \to 0 \tag{18.83}$$

由此得到理想前向增益的表达式

$$G_{vc}^{\infty}(s) = \left. \frac{\hat{v}}{\hat{i}_c} \right|_{\substack{\hat{v}_g=0 \\ \hat{v}_y \to 0}} = \frac{G_{vd}}{G_{id} + F_v G_{vd}} = \frac{F_m G_{vd}}{T_i} \tag{18.84}$$

最后，在 $\hat{v}_g = 0$ 且 $\hat{v}_x$ 置零时求通过反馈路径的直接前向传输。由观察得

$$G_{vc}^{0} = 0 \tag{18.85}$$

将式(18.79)、(18.84)和(18.85)代入式(18.78)，得到所求结果：

$$G_{vc}(s) = \frac{F_m G_{vd}}{1+T_i} = \frac{F_m G_{vd}}{1+F_m(G_{id}+F_v G_{vd})} \tag{18.86}$$

类似地，可在 $\hat{i}_c = 0$ 时将反馈定理应用于图18.28的框图求取线路-输出传递函数，

$$G_{vg\text{-cpm}}(s) = \left. \frac{\hat{v}}{\hat{v}_g} \right|_{\substack{\hat{v}_z=0 \\ \hat{i}_c=0}} = \frac{G_{vg\text{-cpm}}^{\infty}\, T_i}{1+T_i} + \frac{G_{vg\text{-cpm}}^{0}}{1+T_i} \tag{18.87}$$

![源页 p.756](../assets/page-snapshots/chapter-18/page-756.png)

其中

$$G_{vg\text{-cpm}}^{\infty}(s) = \left. \frac{\hat{v}}{\hat{v}_g} \right|_{\substack{\hat{i}_c=0 \\ \hat{v}_y \to 0}} = \frac{-F_m F_g G_{vd} + F_m(G_{vg} G_{id} - G_{ig} G_{vd})}{T_i} \tag{18.88}$$

$$G_{vg\text{-cpm}}^{0}(s) = \left. \frac{\hat{v}}{\hat{v}_g} \right|_{\substack{\hat{i}_c=0 \\ \hat{v}_x \to 0}} = G_{vg} \tag{18.89}$$

将式(18.79)、(18.88)和(18.89)代入式(18.87)，得到电流编程线路-输出传递函数：

$$G_{vg\text{-cpm}}(s) = \left. \frac{\hat{v}(s)}{\hat{v}_g(s)} \right|_{\hat{i}_c(s)=0} = \frac{G_{vg} - F_m F_g G_{vd} + F_m(G_{vg} G_{id} - G_{ig} G_{vd})}{1+F_m(G_{id}+F_v G_{vd})} \tag{18.90}$$

式(18.86)和(18.90)是连续导通模式下单电感电流编程变换器重要传递函数的一般表达式。

### 18.4.1 讨论

式(18.73)和图18.24的控制器模型考虑了由两种机制引起的 $i_L$ 与 $i_c$ 之间的差异：电感电流纹波和人工斜坡。电感电流纹波使电感电流的峰值和平均值不同；这导致平均电感电流与 $i_c$ 之间产生偏差。由于电感电流纹波的幅值是变换器输入和电容电压的函数，该机制在控制器小信号框图中引入了 $\hat{v}_g$ 和 $\hat{v}$ 依赖。因此，图18.24的 $F_g$ 和 $F_v$ 增益模块建模电感电流纹波的小信号效应。当深入连续导通模式运行时（$2L/(RT_s) \gg 1$），电感电流纹波很小。此时 $F_g$ 和 $F_v$ 增益模块可忽略，电感电流纹波对电流编程控制器增益的影响可忽略不计。

人工斜坡也使平均电感电流偏离 $i_c$。这由增益模块 $F_m$ 建模。当无人工斜坡时，$M_a = 0$，式(18.74)意味着若 $M_1 = M_2$（对应于 $D = 0.5$ 处运行），则调制器增益 $F_m$ 趋于无穷。若 $M_2 > M_1$（$D > 0.5$），$F_m$ 变为负值，意味着电流控制环路中存在正反馈。$D > 0.5$ 时不稳定和振荡的本质以及人工斜坡的必要性已在18.2节用离散时间技术讨论。根据式(18.56)和(18.57)，$M_a \ge M_2/2$ 的人工斜坡使电流编程控制器对任意 $D$（$0 \le D < 1$）都稳定。可验证该人工斜坡斜率 $M_a \ge M_2/2$ 也使调制器增益 $F_m$ 对任意 $D$ 都为有限正值。

考虑 $D < 0.5$ 且无人工斜坡（$M_a = 0$）的运行情况。若 $M_1$ 和 $M_2$ 很小（即电感电流纹波可忽略），则电流编程调制器增益 $F_m$ 非常大。图18.25、18.26和18.27的电流编程控制系统因此具有非常大的环路增益 $T_i$，使得 $F_m$ 模块输入端的信号（$\hat{d}/F_m$）趋于零。框图于是预测

$$\frac{\hat{d}}{F_m} = 0 = \hat{i}_c - \hat{i}_L - F_g\, \hat{v}_g - F_v\, \hat{v} \tag{18.91}$$

![源页 p.757](../assets/page-snapshots/chapter-18/page-757.png)

在电感电流纹波可忽略的情况下（$F_g \to 0$ 且 $F_v \to 0$），该方程进一步简化为

$$0 = \hat{i}_c - \hat{i}_L \tag{18.92}$$

这与18.1节采用的简单近似一致。因此，本节预测的传递函数在无人工斜坡且电感电流纹波可忽略时退化为18.1节的结果。在 $F_m \to \infty$、$F_g \to 0$、$F_v \to 0$ 的极限下，控制-输出传递函数(18.86)退化为

$$\lim_{\substack{F_m \to \infty \\ F_g \to 0 \\ F_v \to 0}} G_{vc}(s) = \frac{G_{vd}}{G_{id}} \tag{18.93}$$

线路-输出传递函数(18.90)退化为

$$\lim_{\substack{F_m \to \infty \\ F_g \to 0 \\ F_v \to 0}} G_{vg\text{-cpm}}(s) = \frac{G_{vg} G_{id} - G_{ig} G_{vd}}{G_{id}} \tag{18.94}$$

可验证式(18.93)和(18.94)与18.1节导出的传递函数等价。

当存在人工斜坡时，CPM 调制器增益 $F_m$ 减小。电流编程控制器不再完美调节电感电流 $i_L$，式(18.91)右侧各项之和不为零。在人工斜坡非常大的极端情况下（$M_a$ 大因而 $F_m$ 小），电流编程控制器退化为占空周期控制。图18.19的人工斜坡和模拟比较器此时功能上类似于图7.29的脉宽调制器，小信号增益为 $F_m$。当 $F_m$ 小时，控制-输出传递函数(18.86)退化为

$$\lim_{\text{小 } F_m} G_{vc}(s) = F_m G_{vd}(s) \tag{18.95}$$

这与常规占空周期控制一致。类似地，式(18.90)退化为

$$\lim_{\text{小 } F_m} G_{vg\text{-cpm}}(s) = G_{vg} \tag{18.96}$$

即常规占空周期控制的线路-输出传递函数。

### 18.4.2 CCM 降压变换器的电流编程传递函数

占空周期控制下 CCM 降压变换器的控制-输出传递函数 $G_{vd}(s)$ 和线路-输出传递函数 $G_{vg}(s)$ 在第8章通过分析图7.18a的等效电路模型给出。结果为

$$G_{vd}(s) = \frac{V}{D}\, \frac{1}{\text{den}(s)} \tag{18.97}$$

$$G_{vg}(s) = D\, \frac{1}{\text{den}(s)} \tag{18.98}$$

![源页 p.758](../assets/page-snapshots/chapter-18/page-758.png)

其中分母多项式为

$$\text{den}(s) = 1 + s\frac{L}{R} + s^2 LC \tag{18.99}$$

式(18.76)和(18.77)定义的电感电流传递函数 $G_{id}(s)$ 和 $G_{ig}(s)$ 也可通过求解图7.18a的等效电路模型得到，结果如下：

$$G_{id}(s) = \frac{V}{D}\, \frac{1+sRC}{R\, \text{den}(s)} \tag{18.100}$$

$$G_{ig}(s) = \frac{D}{R}\, \frac{1+sRC}{\text{den}(s)} \tag{18.101}$$

其中 $\text{den}(s)$ 仍由式(18.99)给出。

当无人工斜坡且纹波可忽略时，控制-输出传递函数退化为理想表达式(18.93)。将式(18.97)和(18.100)代入得

$$\lim_{\substack{F_m \to \infty \\ F_g \to 0 \\ F_v \to 0}} G_{vc}(s) = \frac{G_{vd}(s)}{G_{id}(s)} = \frac{R}{1+sRC} \tag{18.102}$$

在相同条件下，线路-输出传递函数退化为理想表达式(18.94)。将式(18.97)至(18.101)代入得

$$\lim_{\substack{F_m \to \infty \\ F_g \to 0 \\ F_v \to 0}} G_{vg\text{-cpm}}(s) = \frac{G_{vg}(s) G_{id}(s) - G_{vd}(s) G_{ig}(s)}{G_{id}(s)} = 0 \tag{18.103}$$

式(18.102)和(18.103)与18.1节对 CCM 降压变换器导出的表达式一致。

对任意 $F_m$、$F_v$ 和 $F_g$，控制-输出传递函数由式(18.86)给出。根据表18.2，降压变换器 $F_v = 0$。将式(18.97)至(18.101)代入式(18.86)得

$$G_{vc}(s) = \frac{F_m G_{vd}}{1+F_m G_{id}} = \frac{F_m \left( \dfrac{V}{D}\, \dfrac{1}{\text{den}(s)} \right)}{1 + F_m \left( \dfrac{V}{D}\, \dfrac{1+sRC}{R\, \text{den}(s)} \right)} \tag{18.104}$$

化简得

$$G_{vc}(s) = \frac{F_m\, \dfrac{V}{D}}{\text{den}(s) + F_m\, \dfrac{V}{D}\, \dfrac{1+sRC}{R}} \tag{18.105}$$

最后，控制-输出传递函数可写成以下归一化形式：

$$G_{vc}(s) = G_{c0}\, \frac{1}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2} \tag{18.106}$$

![源页 p.759](../assets/page-snapshots/chapter-18/page-759.png)

其中

$$G_{c0} = \frac{V}{D}\, \frac{F_m}{1 + F_m\, \dfrac{V}{DR}} \tag{18.107}$$

$$\omega_c = \frac{1}{\sqrt{LC}}\, \sqrt{1 + F_m\, \frac{V}{DR}} \tag{18.108}$$

$$Q_c = R\sqrt{\frac{C}{L}}\, \frac{\sqrt{1 + F_m\, \dfrac{V}{DR}}}{1 + \dfrac{RC\, F_m\, V}{DL}} \tag{18.109}$$

在以上方程中，主要特征量 $G_{c0}$、$\omega_c$ 和 $Q_c$ 表示为占空周期控制下的值乘以一个考虑电流编程控制效应的因子。由式(18.109)可见，电流编程倾向于降低极点的 $Q$ 值。当 $F_m$ 大时，$Q_c$ 随 $F_m^{-1/2}$ 变化；因此，极点变为实数且在幅值上良好分离。8.1.7节的低 $Q$ 近似于是预测低频极点 $\omega_{p1}$ 变为

$$\omega_{p1} = Q_c\, \omega_c = \frac{R}{L}\, \frac{1 + F_m\, \dfrac{V}{DR}}{1 + \dfrac{RC\, F_m\, V}{DL}} \tag{18.110}$$

当 $F_m$ 大时，极点频率可进一步近似为

$$f_{p1} \approx \frac{1}{2\pi}\, \frac{1}{RC} \tag{18.111}$$

这与18.1节简单模型预测的低频极点一致。低 $Q$ 近似还预测高频极点 $\omega_{hf}$ 变为

$$\omega_{hf} \approx \frac{\omega_c}{Q_c} = \frac{1}{RC} \left( 1 + \frac{RC\, F_m\, V}{DL} \right) \tag{18.112}$$

当 $F_m$ 大时，极点频率 $f_{hf}$ 可进一步近似为

$$f_{hf} \approx \frac{1}{2\pi}\, \frac{F_m\, V}{DL} \tag{18.113}$$

利用式(18.74)的 $F_m$、$V/L = M_2$ 以及 $M_1 D = M_2 D'$，$f_{hf}$ 可表示为

$$f_{hf} = \frac{f_s}{\pi}\, \frac{M_1 + M_2}{2M_a + M_1 - M_2} = \frac{f_s}{\pi}\, \frac{1}{1 + 2D\left( \dfrac{M_a}{M_2} - \dfrac{1}{2} \right)} \tag{18.114}$$

由此可见，高频极点通常被预测为位于接近甚至高于开关频率 $f_s$ 处，远高于此处所采用的基于连续时间平均分析的平均模型可被认为有效的频率范围。应指出，变换器开关和调制器采样过程导致的离散时间现象影响变换器的高频行为，如18.7节进一步讨论。

![源页 p.760](../assets/page-snapshots/chapter-18/page-760.png)

对任意 $F_m$、$F_v$ 和 $F_g$，电流编程线路-输出传递函数 $G_{vg\text{-cpm}}(s)$ 由式(18.90)给出。对降压变换器，量 $(G_{vg} G_{id} - G_{vd} G_{ig})$ 等于零。此外 $F_v = 0$。因此式(18.90)变为

$$G_{vg\text{-cpm}}(s) = \frac{G_{vg} - F_m F_g G_{vd}}{1 + F_m G_{id}} \tag{18.115}$$

将式(18.97)至(18.101)代入式(18.115)得

$$G_{vg\text{-cpm}}(s) = \frac{D\, \dfrac{1}{\text{den}(s)} - F_m F_g\, \dfrac{V}{D}\, \dfrac{1}{\text{den}(s)}}{1 + F_m \left( \dfrac{V}{D}\, \dfrac{1+sRC}{R\, \text{den}(s)} \right)} \tag{18.116}$$

化简得

$$G_{vg\text{-cpm}}(s) = \frac{D - F_m F_g\, \dfrac{V}{D}}{\text{den}(s) + F_m\, \dfrac{V}{D}\, \dfrac{1+sRC}{R}} \tag{18.117}$$

最后，电流编程线路-输出传递函数可写成以下归一化形式：

$$G_{vg\text{-cpm}}(s) = G_{g0}\, \frac{1}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2} \tag{18.118}$$

其中

$$G_{g0} = \frac{D\, \left( 1 - F_m F_g\, \dfrac{V}{D^2} \right)}{1 + F_m\, \dfrac{V}{DR}} = \frac{D\, \dfrac{2M_a - M_2}{2M_a + M_1 - M_2}}{1 + F_m\, \dfrac{V}{DR}} \tag{18.119}$$

$Q_c$ 和 $\omega_c$ 由式(18.108)和(18.109)给出。

式(18.119)表明电流编程如何降低降压变换器线路-输出传递函数的直流增益。对占空周期控制（$F_m \to 0$），$G_{g0}$ 等于 $D$。非零的 $F_m$ 值使式(18.119)的分子减小而分母增大，从而倾向于降低 $G_{g0}$。在理想情况下（$F_m \to \infty$），我们已经看到 $G_{g0}$ 变为零。式(18.119)揭示，非理想电流编程降压变换器也可表现出 $G_{g0}$ 为零，只要人工斜坡斜率 $M_a$ 选为 $M_2/2$。此时电流编程控制器阻止输入线路电压变化到达输出。导致该结果的机制是式(18.73)中 $F_g \hat{v}_g$ 项所固有的、电流编程控制器对 $v_g$ 的有效前馈。由图18.28可看出，当 $F_g F_m G_{vd}(s) = G_{vg}(s)$ 时，通过 $F_g$ 从 $\hat{v}_g$ 出发的前馈路径在输出 $\hat{v}$ 中引起的变化恰好抵消了通过 $G_{vg}(s)$ 的直接前向路径中由 $\hat{v}_g$ 引起的变化。该抵消在降压变换器中当 $M_a = 0.5 M_2$ 时发生。

### 18.4.3 基本变换器的结果

基本降压、升压和升降压变换器在电流编程控制下的传递函数总结于表18.3、18.4、18.5。列出了18.1节简单模型和本节更精确模型的控制-输出和线路-输出传递函数。为完整起见，也包含了占空周期控制的传递函数。在每种情况下，主要特征量表示为相应占空周期控制下的值乘以一个考虑电流编程控制效应的因子。

表18.3 CPM 降压变换器结果总结

| 简单模型 | 占空周期控制传递函数 |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = \dfrac{R}{1+sRC}$ | $G_{vd}(s) = \dfrac{V}{D}\, \dfrac{1}{\text{den}(s)}$，$G_{id}(s) = \dfrac{V}{D}\, \dfrac{1+sRC}{R\,\text{den}(s)}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = 0$ | $G_{vg}(s) = D\, \dfrac{1}{\text{den}(s)}$，$G_{ig}(s) = \dfrac{D}{R}\, \dfrac{1+sRC}{\text{den}(s)}$ |
| | $\text{den}(s) = 1 + s\dfrac{L}{R} + s^2 LC$ |

| 更精确模型 | |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = G_{vc}(s) = \dfrac{G_{c0}}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{c0} = \dfrac{V}{D}\, \dfrac{F_m}{1 + F_m\, \dfrac{V}{DR}}$ |
| | $\omega_c = \dfrac{1}{\sqrt{LC}}\, \sqrt{1 + F_m\, \dfrac{V}{DR}}$ |
| | $Q_c = R\sqrt{\dfrac{C}{L}}\, \dfrac{\sqrt{1 + F_m\, \dfrac{V}{DR}}}{1 + \dfrac{RC\, F_m\, V}{DL}}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = G_{vg\text{-cpm}}(s) = \dfrac{G_{g0}}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{g0} = \dfrac{D\left( 1 - F_m F_g\, \dfrac{V}{D^2} \right)}{1 + F_m\, \dfrac{V}{DR}}$ |

![源页 p.761](../assets/page-snapshots/chapter-18/page-761.png)

表18.4 CPM 升压变换器结果总结

| 简单模型 | 占空周期控制传递函数 |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = \dfrac{D'R}{2}\, \dfrac{1 - \dfrac{sL}{D'^2 R}}{1 + \dfrac{sRC}{2}}$ | $G_{vd}(s) = \dfrac{V}{D'}\, \dfrac{1 - \dfrac{sL}{D'^2 R}}{\text{den}(s)}$，$G_{id}(s) = \dfrac{2V}{D'^2 R}\, \dfrac{1 + \dfrac{sRC}{2}}{\text{den}(s)}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = \dfrac{1}{2D'}\, \dfrac{1}{1 + \dfrac{sRC}{2}}$ | $G_{vg}(s) = \dfrac{1}{D'}\, \dfrac{1}{\text{den}(s)}$，$G_{ig}(s) = \dfrac{1}{D'^2 R}\, \dfrac{1+sRC}{\text{den}(s)}$ |
| | $\text{den}(s) = 1 + s\dfrac{L}{D'^2 R} + s^2 \dfrac{LC}{D'^2}$ |

| 更精确模型 | |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = G_{vc}(s) = \dfrac{G_{c0}\left( 1 - \dfrac{sL}{D'^2 R} \right)}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{c0} = \dfrac{V}{D'}\, \dfrac{F_m}{1 + \dfrac{2F_m V}{D'^2 R} + F_m F_v \dfrac{V}{D'}}$ |
| | $\omega_c = \dfrac{D'}{\sqrt{LC}}\, \sqrt{1 + \dfrac{2F_m V}{D'^2 R} + F_m F_v \dfrac{V}{D'}}$ |
| | $Q_c = D' R\sqrt{\dfrac{C}{L}}\, \dfrac{\sqrt{1 + \dfrac{2F_m V}{D'^2 R} + F_m F_v \dfrac{V}{D'}}}{1 + \dfrac{RC\, F_m V}{L} - F_m F_v \dfrac{V}{D'}}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = G_{vg\text{-cpm}}(s) = \dfrac{G_{g0}}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{g0} = \dfrac{\dfrac{1}{D'}\left( 1 + \dfrac{F_m V}{D'^2 R} \right)}{1 + \dfrac{2F_m V}{D'^2 R} + F_m F_v \dfrac{V}{D'}}$ |

![源页 p.762](../assets/page-snapshots/chapter-18/page-762.png)

表18.5 CPM 升降压变换器结果总结

| 简单模型 | 占空周期控制传递函数 |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = -\dfrac{D'R}{(1+D)}\, \dfrac{1 - \dfrac{sDL}{D'^2 R}}{1 + \dfrac{sRC}{1+D}}$ | $G_{vd}(s) = -\dfrac{\lvert V \rvert}{DD'}\, \dfrac{1 - \dfrac{sDL}{D'^2 R}}{\text{den}(s)}$，$G_{id}(s) = \dfrac{\lvert V \rvert(1+D)}{DD'^2 R}\, \dfrac{1 + \dfrac{sRC}{1+D}}{\text{den}(s)}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = -\dfrac{D^2}{1-D^2}\, \dfrac{1}{1 + \dfrac{sRC}{1+D}}$ | $G_{vg}(s) = -\dfrac{D}{D'}\, \dfrac{1}{\text{den}(s)}$，$G_{ig}(s) = \dfrac{D}{D'^2 R}\, \dfrac{1+sRC}{\text{den}(s)}$ |
| | $\text{den}(s) = 1 + s\dfrac{L}{D'^2 R} + s^2 \dfrac{LC}{D'^2}$ |

| 更精确模型 | |
|---|---|
| $\dfrac{\hat{v}}{\hat{i}_c} = G_{vc}(s) = \dfrac{G_{c0}\left( 1 - \dfrac{sDL}{D'^2 R} \right)}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{c0} = -\dfrac{\lvert V \rvert}{DD'}\, \dfrac{F_m}{1 + \dfrac{F_m \lvert V \rvert(1+D)}{DD'^2 R} - F_m F_v \dfrac{\lvert V \rvert}{DD'}}$ |
| | $\omega_c = \dfrac{D'}{\sqrt{LC}}\, \sqrt{1 + \dfrac{F_m \lvert V \rvert(1+D)}{DD'^2 R} - F_m F_v \dfrac{\lvert V \rvert}{DD'}}$ |
| | $Q_c = D' R\sqrt{\dfrac{C}{L}}\, \dfrac{\sqrt{1 + \dfrac{F_m \lvert V \rvert(1+D)}{DD'^2 R} - F_m F_v \dfrac{\lvert V \rvert}{DD'}}}{1 + \dfrac{F_m \lvert V \rvert RC}{DL} + F_m F_v \dfrac{\lvert V \rvert}{D'}}$ |
| $\dfrac{\hat{v}}{\hat{v}_g} = G_{vg\text{-cpm}}(s) = \dfrac{G_{g0}\left( 1 + \dfrac{s}{\omega_{gz}} \right)}{1 + \dfrac{s}{Q_c \omega_c} + \left( \dfrac{s}{\omega_c} \right)^2}$ | $G_{g0} = -\dfrac{D}{D'}\, \dfrac{1 + \dfrac{F_m \lvert V \rvert}{D'^2 R} - F_m F_g \dfrac{\lvert V \rvert}{D^2}}{1 + \dfrac{F_m \lvert V \rvert(1+D)}{DD'^2 R} - F_m F_v \dfrac{\lvert V \rvert}{DD'}}$ |
| | $\omega_{gz} = \dfrac{DD'^2 R}{\lvert V \rvert L F_m F_g}\left( 1 + \dfrac{F_m \lvert V \rvert}{D'^2 R} - F_m F_g \dfrac{\lvert V \rvert}{D^2} \right)$ |

本节导出的更精确模型一并列出。为完整起见，也包含了占空周期控制的传递函数。在每种情况下，主要特征量表示为相应占空周期控制下的值乘以一个考虑电流编程控制效应的因子。

所有三种变换器的线路-输出传递函数 $G_{vg\text{-cpm}}$ 和控制-输出传递函数 $G_{vc}$ 的两个极点在 CPM 下通常表现出低 $Q$ 值。可如式(18.110)至(18.113)那样应用低 $Q$ 近似来求低频极点。升压和升降压变换器的线路-输出传递函数表现出两个极点和一个零点，且具有可观的直流增益。

### 18.4.4 电流编程变换器中加入输入滤波器

第17章讨论了向占空周期控制变换器加入输入滤波器的问题，其中发现输入滤波器对变换器传递函数的影响可用第16章的额外元件定理来评估。具体而言，式(17.4)展示了控制-输出传递函数 $G_{vd}$ 如何被一个修正因子修改，该因子取决于阻抗比 $Z_o/Z_N$ 和 $Z_o/Z_D$，其中 $Z_o(s)$ 是滤波器输出阻抗，$Z_D(s)$ 是变换器驱动点输入阻抗，$Z_N(s)$ 是在输出电压置零条件下确定的变换器输入阻抗。第17章的输入滤波器设计方法基于

![源页 p.763](../assets/page-snapshots/chapter-18/page-763.png)

17.2.3节的阻抗不等式，使输入滤波器不显著改变控制-输出传递函数。该方法同样适用于电流编程变换器。

在存在输入滤波器时，CPM 控制-输出传递函数为

$$G_{vc}(s) = \frac{\hat{v}}{\hat{i}_c} = \left. G_{vc}(s) \right|_{Z_o(s)=0} \left( 1 + \frac{Z_o(s)}{Z_{N\text{-cpm}}(s)} \right) \left( 1 + \frac{Z_o(s)}{Z_{D\text{-cpm}}(s)} \right) \tag{18.120}$$

其中

$$\left. G_{vc}(s) \right|_{Z_o(s)=0} \tag{18.121}$$

是不含输入滤波器的 CPM 控制-输出传递函数，而 $Z_{N\text{-cpm}}$ 和 $Z_{D\text{-cpm}}$ 是在额外元件定理规定的两种不同条件下求得的电流编程变换器输入阻抗。CPM 输入阻抗 $Z_{i\text{-cpm}}$ 可用图18.25、18.26和18.27所示的变换器模型求得。例如，图18.25的电流编程降压变换器小信号模型如图18.29所示。该模型包含三个独立源：控制输入 $\hat{i}_c$、输入电压 $\hat{v}_g$ 和附加注入源 $\hat{i}_z$，后者便于利用第13章的反馈定理确定 $Z_{D\text{-cpm}}(s)$。

图18.29 适用于求取电流编程降压变换器输入阻抗的小信号模型

![源页 p.764](../assets/page-snapshots/chapter-18/page-764.png)

为确定 $Z_{N\text{-cpm}}$，将附加注入源置零，$\hat{i}_z = 0$。在 $\hat{i}_c$ 和 $\hat{v}_g$ 存在时，输出 $\hat{v}$ 被置零。在这些条件下，求得

$$\frac{1}{Z_{N\text{-cpm}}(s)} = \left. \frac{\hat{i}_g}{\hat{v}_g} \right|_{\hat{v} \to 0} \tag{18.122}$$

置零输出意味着置零电感电流，即 $D\hat{v}_g + V_g \hat{d}$ 必须等于零。因此有

$$\hat{d} = -\frac{D}{V_g}\, \hat{v}_g \tag{18.123}$$

在置零条件下，输入电流为

$$\left. \hat{i}_g \right|_{\hat{v} \to 0} = I\, \hat{d} \tag{18.124}$$

将式(18.123)代入式(18.124)得

$$\frac{1}{Z_{N\text{-cpm}}(s)} = \left. \frac{\hat{i}_g}{\hat{v}_g} \right|_{\hat{v} \to 0} = -\frac{D^2}{R} = \frac{1}{Z_N(s)} \tag{18.125}$$

即 $Z_{N\text{-cpm}} = -R/D^2$。$Z_{N\text{-cpm}}$ 的结果与式(17.28)给出的占空周期控制降压变换器的 $Z_N$ 完全相同。这不奇怪，因为置零条件 $\hat{v} \to 0$ 无论控制输入的性质如何，都导致完全相同的变换器电路条件。

为确定 $Z_{D\text{-cpm}}$，令 $\hat{i}_z = 0$ 且独立控制输入置零，$\hat{i}_c = 0$。变换器输入导纳（即 $Z_{D\text{-cpm}}$ 的倒数）定义如下：

$$\frac{1}{Z_{D\text{-cpm}}(s)} = \left. \frac{\hat{i}_g}{\hat{v}_g} \right|_{\hat{i}_c=0} \tag{18.126}$$

由图18.29所示的模型，该传递函数可用多种方法求得。与占空周期变换器不同——那里 $Z_D$ 是变换器开环输入阻抗——$Z_{D\text{-cpm}}$ 是电流编程变换器的输入阻抗，包含反馈和前馈路径。因此用反馈定理求 $Z_{D\text{-cpm}}$ 较为方便：

$$\frac{1}{Z_{D\text{-cpm}}(s)} = \frac{1}{Z_{D\text{-cpm}}^{\infty}(s)}\, \frac{T_i}{1+T_i} + \frac{1}{Z_{D\text{-cpm}}^{0}(s)}\, \frac{1}{1+T_i} \tag{18.127}$$

其中 $T_i(s)$ 是电流编程环路增益

$$T_i(s) = \left. \frac{\hat{i}_y}{\hat{i}_x} \right|_{\hat{v}_g=0} = F_m G_{id}(s) \tag{18.128}$$

注意注入源 $\hat{i}_z$ 专门为利用反馈定理求 $Z_{D\text{-cpm}}$ 而添加到图18.29的模型中。理想输入导纳可在 $\hat{i}_z$ 和 $\hat{v}_g$ 存在时置零 $\hat{i}_y$ 求得。由于 $\hat{i}_c = 0$，置零 $\hat{i}_y$ 等价于置零 $\hat{i}_L$。因此，置零条件下的输入导纳为

![源页 p.765](../assets/page-snapshots/chapter-18/page-765.png)

$$\frac{1}{Z_{D\text{-cpm}}^{\infty}(s)} = \left. \frac{\hat{i}_g}{\hat{v}_g} \right|_{\hat{i}_y \to 0} = -\frac{D^2}{R} \tag{18.129}$$

由此可得 $Z_{D\text{-cpm}}^{\infty}(s) = -R/D^2$，与 $Z_{N\text{-cpm}}$ 的结果相同。导纳 $1/Z_{D\text{-cpm}}^{0}(s)$ 是在 $\hat{v}_g$ 和 $\hat{i}_z$ 存在时置零 $\hat{i}_x$ 求得的。求解图18.29的电路模型得

$$\frac{1}{Z_{D\text{-cpm}}^{0}(s)} = \left. \frac{\hat{i}_g}{\hat{v}_g} \right|_{\hat{i}_x \to 0} = \frac{D^2 - F_m F_g D V_g}{Z_{ei}} - \frac{F_m F_g D V_g}{R} \tag{18.130}$$

将式(18.128)、(18.129)和(18.130)代入式(18.127)，得到 CPM 输入阻抗 $Z_{D\text{-cpm}}$ 的表达式。按照18.4.1节的讨论，考察 $Z_{D\text{-cpm}}$ 如何依赖于变换器参数和人工斜坡斜率 $M_a$。首先考虑 $D < 0.5$ 且无人工斜坡（$M_a = 0$）的运行。若电感 $L$ 较大，$M_1$ 和 $M_2$ 较小，因此 CPM 增益非常大。大的 $L$ 意味着电感电流纹波很小，因而 $F_g \approx 0$。大的 $F_m$ 意味着 $T_i$ 很大，式(18.127)简化为：

$$\lim_{\substack{F_m \to \infty \\ F_g \to 0}} \frac{1}{Z_{D\text{-cpm}}(s)} = -\frac{D^2}{R} \tag{18.131}$$

接下来，考虑人工斜坡斜率等于 $M_a = M_2/2$ 的情况，即确保 CPM 控制器对任意占空周期 $D$ 稳定所需的最小值。可证明

$$\left. F_m F_g D V_g \right|_{M_a = M_2/2} = D^2 \tag{18.132}$$

因而式(18.127)变为

$$\left. \frac{1}{Z_{D\text{-cpm}}(s)} \right|_{M_a = M_2/2} = -\frac{D^2}{R} \tag{18.133}$$

因此，当 $M_a = M_2/2$ 时，$Z_{N\text{-cpm}}$ 和 $Z_{D\text{-cpm}}$ 都等于 $-R/D^2$。对人工斜坡斜率 $M_a$ 的实际值，$Z_{D\text{-cpm}} \approx Z_{N\text{-cpm}} = -R/D^2$。

最后，考虑人工斜坡斜率 $M_a$ 很大的情况，此时 $F_m$ 因而 $T_i$ 很小。式(18.127)于是退化为

$$\lim_{F_m \to 0} \frac{1}{Z_{D\text{-cpm}}(s)} = -\frac{D^2}{Z_{ei}} \tag{18.134}$$

这意味着当 $M_a$ 大时，CPM 输入阻抗 $Z_{D\text{-cpm}}$ 趋近于式(17.21)给出的占空周期控制变换器的开环输入阻抗 $Z_D$。

一旦确定了 $Z_{N\text{-cpm}}$ 和 $Z_{D\text{-cpm}}$，电流编程控制器的输入滤波器设计即可遵循第17章描述的方法。

## 18.5 CPM 控制变换器的仿真

在电流编程模式（CPM）下，晶体管开关的受控方式是使晶体管峰值电流跟随控制信号。晶体管占空周期 $d(t)$ 不直接受控，而是取决于 CPM 控制输入以及变换器的其他电压和电流。

![源页 p.766](../assets/page-snapshots/chapter-18/page-766.png)

图18.30 电流编程模式（CPM）子电路

本节将 CPM 的大信号平均关系写成适合作为子电路实现以进行仿真的形式。CPM 平均子电路模型的期望形式如图18.30所示。子电路的输入为平均控制输入、

$$\langle v_c(t) \rangle_{T_s} = R_f\, \langle i_c(t) \rangle_{T_s} \tag{18.135}$$

检测到的平均电感电流 $R_f\, \langle i_L(t) \rangle_{T_s}$、晶体管导通期间加在电感上的平均电压 $\langle v_1(t) \rangle_{T_s}$，以及整流管导通期间加在电感上的平均电压 $\langle v_2(t) \rangle_{T_s}$。模型参数包括等效电流检测电阻 $R_f$、开关频率 $f_s$、电感量 $L$ 和人工斜坡的幅值 $V_a$，

$$V_a = m_a T_s R_f \tag{18.136}$$

给定斜率为 $-m_a$ 且加到控制输入上的人工斜坡。在晶体管导通的子区间内，电感电流以斜率 $m_1$ 增加，

$$m_1 = \frac{\langle v_1(t) \rangle_{T_s}}{L} \tag{18.137}$$

假设电压纹波很小，因此电感两端的电压 $v_1(t)$ 近似等于平均值 $\langle v_1(t) \rangle_{T_s}$。该子区间的长度为 $d(t) T_s$。在第二个子区间，当晶体管关断且整流管导通时，电感电流以负斜率 $-m_2$ 下降。在电压纹波很小的假设下，斜率 $m_2$ 为

$$m_2 = \frac{\langle v_2(t) \rangle_{T_s}}{L} \tag{18.138}$$

CPM 模型的输出为占空周期 $d$。有了图18.30所示的输入和输出，CPM 子电路可与14.3节开发的任何平均开关子电路模型结合，构建电流编程变换器的平均仿真模型。CPM 子电路模型首先在18.5.1节针对变换器在连续导通模式下运行的情况开发，然后在18.5.2节扩展到包含 DCM 运行。

### 18.5.1 CCM 下 CPM 控制变换器的仿真模型

假设在连续导通模式下运行，平均电感电流 $\langle i_L \rangle_{T_s}$ 与控制信号 $i_c$ 之间的大信号关系由式(18.67)给出，
