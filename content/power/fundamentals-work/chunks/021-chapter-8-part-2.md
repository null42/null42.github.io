---
date: 2026-08-01
section: 电源控制
chapter: fundamentals
chapterTitle: 电力电子基础教材
chapterOrder: 10
category: 电力电子基础教材
source: power
visibility: public
title: "第8章 变换器传递函数（第2部分）"
tags:
  - power-electronics
  - 教材
  - Fundamentals-of-Power-Electronics
status: learning
summary: "`Fundamentals of Power Electronics 3rd Edition.pdf`"
navGroup: 教材研读
navGroupOrder: 25
---

# 第8章 变换器传递函数（第2部分）

> 源页：308–327
> 本部分续接 8.1 波特图复习，涵盖 8.1.7–8.1.9 和 8.2 变换器传递函数分析。

## 8.1 波特图复习（续）

![源页 p.308](../assets/page-snapshots/chapter-8/page-308.png)

图8.21 二阶极点的相位图。增大 $Q$ 使相位变化更陡

![源页 p.308](../assets/page-snapshots/chapter-8/page-308.png)

图8.22 双极点响应中频相位渐近线的一种选择，正确预测 $f = f_0$ 处的实际斜率

一个与实单极点所用近似 (8.28) 一致的更好选择为

$$f_a = 10^{-1/2Q} f_0 \tag{8.69}$$

$$f_b = 10^{1/2Q} f_0$$

此选择下，中频渐近线斜率为 $-180Q$ 度/十倍频程。相位渐近线汇总于图8.23。$Q = 0.5$ 时，相位在以转折频率 $f_0$ 为中心的约两个十倍频程范围内从 0° 变到 −180°。增大 $Q$ 使此频率范围迅速缩小。

二阶响应的幅值和相位曲线绘于图8.24 和8.25。

![源页 p.309](../assets/page-snapshots/chapter-8/page-309.png)

图8.23 中频相位渐近线的一种更简单选择，在整个频率范围内更好地近似曲线，且与实极点所用渐近线一致

![源页 p.309](../assets/page-snapshots/chapter-8/page-309.png)

图8.24 双极点响应若干 $Q$ 值的精确幅值曲线

### 8.1.7 低 Q 近似

如 8.1.6 节所述，当式 (8.53) 二阶分母多项式的根为实时，可将分母分解，用实极点的渐近线构造波特图。此时用如下归一化形式：

$$G(s) = \frac{1}{\left(1+\dfrac{s}{\omega_1}\right)\left(1+\dfrac{s}{\omega_2}\right)} \tag{8.70}$$

当转折频率 $\omega_1$ 和 $\omega_2$ 在数值上分得开时，此方法特别理想。

此方法的困难在于求转折频率所用求根公式的复杂性。用电路元件 $R$、$L$、$C$ 等表示转折频率 $\omega_1$ 和 $\omega_2$ 总是导致复杂且无启发性的表达式，尤其当电路含许多元件时。即使图8.18 的简单电路（传递函数由式 (8.52) 给出），常规求根公式也给出如下复杂的转折频率公式：

$$\omega_{1,2} = \frac{\dfrac{L}{R} \pm \sqrt{\left(\dfrac{L}{R}\right)^2 - 4LC}}{2LC} \tag{8.71}$$

此方程关于转折频率如何依赖元件值基本不提供洞察。例如，可证当转折频率在数值上分得开时，它们可用简单得多的关系高精度表示为

$$\omega_1 \approx \frac{R}{L}, \quad \omega_2 \approx \frac{1}{RC} \tag{8.72}$$

此时 $\omega_1$ 本质上与 $C$ 的值无关，$\omega_2$ 本质上与 $L$ 无关，但式 (8.71) 表面上预测两个转折频率都依赖所有元件值。式 (8.72) 的简单表达式远优于式 (8.71)，可用低 Q 近似 [79] 轻易导出。

设传递函数已表示为式 (8.58) 的标准归一化形式，重复如下：

$$G(s) = \frac{1}{1+\dfrac{s}{Q\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2} \tag{8.73}$$

对 $Q \le 0.5$，用求根公式将式 (8.73) 分母多项式的实根写为

$$\omega_1 = \frac{\omega_0}{Q}\frac{1-\sqrt{1-4Q^2}}{2} \tag{8.74}$$

$$\omega_2 = \frac{\omega_0}{Q}\frac{1+\sqrt{1-4Q^2}}{2} \tag{8.75}$$

转折频率 $\omega_2$ 可表示为

$$\omega_2 = \frac{\omega_0}{Q}F(Q) \tag{8.76}$$

其中 $F(Q)$ 定义为 [79]：

$$F(Q) = \frac{1}{2}\left(1+\sqrt{1-4Q^2}\right) \tag{8.77}$$

注意 $Q \ll 0.5$ 时 $4Q^2 \ll 1$，$F(Q)$ 近似等于 1。故得

$$\omega_2 \approx \frac{\omega_0}{Q} \quad \text{对} \ Q \ll \frac{1}{2} \tag{8.78}$$

![源页 p.311](../assets/page-snapshots/chapter-8/page-311.png)

图8.26 $F(Q)$ 对 $Q$，如式 (8.77) 所示。近似 $F(Q) = 1$ 在 $Q < 3$ 时与精确值偏差 10% 以内

函数 $F(Q)$ 绘于图8.26。可见 $Q$ 降到 0.5 以下时 $F(Q)$ 很快趋向 1。

为导出 $\omega_1$ 的类似近似，可将式 (8.74) 乘除 $F(Q)$ [式 (8.77)]。化简分子得

$$\omega_1 = \frac{Q\omega_0}{F(Q)} \tag{8.79}$$

同样，$Q$ 小时 $F(Q)$ 趋向 1。故 $\omega_1$ 可近似为

$$\omega_1 \approx Q\omega_0 \quad \text{对} \ Q \ll \frac{1}{2} \tag{8.80}$$

![源页 p.312](../assets/page-snapshots/chapter-8/page-312.png)

图8.27 低 Q 近似预测的幅值渐近线。实极点出现在频率 $Qf_0$ 和 $f_0/Q$ 处

低 Q 情形的幅值渐近线汇总于图8.27。$Q < 0.5$ 时，$\omega_0$ 处的两个极点分裂为实极点。一个实极点出现在转折频率 $\omega_1 < \omega_0$，另一个出现在 $\omega_2 > \omega_0$。用式 (8.78) 和 (8.80) 可轻易近似转折频率。

对图8.18 滤波器电路，参数 $Q$ 和 $\omega_0$ 由式 (8.61) 给出。$Q \ll 0.5$ 时，用式 (8.78) 和 (8.80) 可导出如下转折频率的解析表达式：

$$\omega_1 \approx Q\omega_0 = R\sqrt{\frac{C}{L}}\frac{1}{\sqrt{LC}} = \frac{R}{L} \tag{8.81}$$

$$\omega_2 \approx \frac{\omega_0}{Q} = \frac{1}{\sqrt{LC}}\frac{1}{R\sqrt{\dfrac{C}{L}}} = \frac{1}{RC}$$

故低 Q 近似使我们能导出简单的面向设计的转折频率解析表达式。

### 8.1.8 高 Q 近似

另一个感兴趣的情形是确定含多个电阻元件的高 Q 谐振电路的 Q 因子。例如，考虑图8.28 的谐振 L-C 电路，含负载电阻 $R$ 和与电容串联的附加电阻 $R_C$。$R$ 大且 $R_C$ 小时，电路趋近无阻尼 L-C 网络，谐振频率为

![源页 p.312](../assets/page-snapshots/chapter-8/page-312.png)

图8.28 含两个电阻元件的双极点低通滤波器

$$\omega_0 = \frac{1}{\sqrt{LC}} \tag{8.82}$$

$R_C$ 可忽略但 $R$ 显著时，得到 8.1.6 节先前考虑的电路（图8.18）。先前求得此电路的 Q 因子为

$$Q_{load} = \frac{R}{R_0} \tag{8.83}$$

其中

$$R_0 = \sqrt{\frac{L}{C}}$$

传递函数为

$$G(s) = \frac{1}{1+\dfrac{s}{Q_{load}\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2} \tag{8.84}$$

反之，负载电阻 $R$ 很大但 $R_C$ 显著时，分析电路得如下传递函数：

$$G(s) = \frac{\left(1+\dfrac{s}{\omega_z}\right)}{1+\dfrac{s}{Q_C\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2} \tag{8.85}$$

转折频率 $\omega_0$ 仍由式 (8.82) 给出，但 Q 因子为

$$Q_C = \frac{R_0}{R_C} \tag{8.86}$$

故两种阻尼情形各自导致相似的二阶分母，其 Q 因子取决于各自的电阻值。

$R$ 和 $R_C$ 同时引起显著阻尼的情形，可分析图8.28 电路证传递函数为

$$G(s) = \frac{1+sR_CC}{1+s\!\left(\dfrac{L}{R}+R_CC\right)+s^2LC\!\left(1+\dfrac{R_C}{R}\right)} \tag{8.87}$$

此方程可表示为如下归一化形式：

$$G(s) = \frac{\left(1+\dfrac{s}{\omega_z}\right)}{\left(\dfrac{s}{\omega_0}\right)\!\left(\dfrac{1}{Q_{load}}+\dfrac{1}{Q_C}\right)+\left(\dfrac{s}{\omega_0}\right)^2\!\left(1+\dfrac{1}{Q_{load}Q_C}\right)} \tag{8.88}$$

其中

$$\omega_0 = \frac{1}{\sqrt{LC}}, \quad Q_{load} = \frac{R}{R_0}, \quad Q_C = \frac{R_0}{R_C}, \quad R_0 = \sqrt{\frac{L}{C}} \tag{8.89}$$

若 $Q_{load} \gg 1$ 且 $Q_C \gg 1$，则

$$1+\frac{1}{Q_{load}Q_C} \approx 1 \tag{8.90}$$

式 (8.88) 可简化为

$$G(s) \approx \frac{\left(1+\dfrac{s}{\omega_z}\right)}{\left(\dfrac{s}{\omega_0}\right)\!\left(\dfrac{1}{Q_{load}}\,\|\,\dfrac{1}{Q_C}\right)+\left(\dfrac{s}{\omega_0}\right)^2} \tag{8.91}$$

故 $R$ 和 $R_C$ 同时引起显著阻尼时，可用高 Q 近似由 $Q_{load}$ 和 $Q_C$ 估计复合 Q 因子：

$$Q \approx Q_{load}\,\|\,Q_C = \frac{1}{\dfrac{1}{Q_{load}}+\dfrac{1}{Q_C}} \tag{8.92}$$

记号 $x\,\|\,y$ 表示如上所示的逆相加。此分母极点 Q 因子的近似在以下条件满足时准确：

$$Q_{load} \gg 1 \quad \text{且} \quad Q_C \gg 1 \tag{8.93}$$

两个阻尼项 $Q_{load}$ 和 $Q_C$ 同时影响精确频率和精确 Q 因子。可将式 (8.88) 表示为如下标准归一化形式：

$$G(s) = \frac{\left(1+\dfrac{s}{\omega_z}\right)}{\left(\dfrac{s}{\omega_e}\right)\!\left(\dfrac{1}{Q_e}\right)+\left(\dfrac{s}{\omega_e}\right)^2} \tag{8.94}$$

其中精确转折频率 $\omega_e$ 和精确 Q 因子 $Q_e$ 为

$$\omega_e = \frac{\omega_0}{F_H(Q_{load}Q_C)}, \quad Q_e = \frac{\left(Q_{load}\,\|\,Q_C\right)}{F_H(Q_{load}Q_C)} \tag{8.95}$$

![源页 p.315](../assets/page-snapshots/chapter-8/page-315.png)

图8.29 $F_H(Q_1Q_2)$ 对 $Q_1Q_2$，如式 (8.96) 所示。近似 $F_H(Q_1Q_2) \approx 1$ 在 $Q_1Q_2 > 5$ 时与正确值偏差 10% 以内

且

$$F_H(Q_1Q_2) = \sqrt{1+\frac{1}{Q_1Q_2}} \tag{8.96}$$

因子 $F_H(Q_1Q_2)$ 绘于图8.29。可见两个 Q 因子之积增大到 1 以上时，此因子收敛到 1。

总结：高 Q 近似表明，在由各自引起 Q 因子 $Q_1$ 和 $Q_2$ 的两个元件阻尼的谐振电路中，复合 Q 因子近似为 $Q_1\,\|\,Q_2$。此近似便于导出含多个阻尼元件的谐振电路的简单面向设计表达式。9.5.4 节给出其使用示例，其中高 Q 近似大幅简化了建模电感和电容电阻的降压变换器方程。

### 8.1.9 任意阶多项式的近似根

低 Q 近似可推广以导出 $n$ 阶多项式根的近似解析表达式

$$P(s) = 1 + a_1 s + a_2 s^2 + \cdots + a_n s^n \tag{8.97}$$

希望将多项式 $P(s)$ 分解为如下形式

$$P(s) = (1+\tau_1 s)(1+\tau_2 s)\cdots(1+\tau_n s) \tag{8.98}$$

实际电路中系数 $a_1, \ldots, a_n$ 为实，而时间常数 $\tau_1, \ldots, \tau_n$ 可为实或复。通常部分或全部时间常数在数值上分得开，且以很简单的方式依赖电路元件值。此时可导出时间常数的简单近似解析表达式。

展开式 (8.98) 可将时间常数 $\tau_1, \ldots, \tau_n$ 与原始系数 $a_1, \ldots, a_n$ 联系，结果为

$$\begin{aligned} a_1 &= \tau_1 + \tau_2 + \cdots + \tau_n \\ a_2 &= \tau_1(\tau_2+\cdots+\tau_n)+\tau_2(\tau_3+\cdots+\tau_n)+\cdots \\ a_3 &= \tau_1\tau_2(\tau_3+\cdots+\tau_n)+\tau_2\tau_3(\tau_4+\cdots+\tau_n)+\cdots \end{aligned} \tag{8.99}$$

$$a_n = \tau_1\tau_2\tau_3\cdots\tau_n$$

此方程组的一般解相当于任意阶多项式的精确分解，是不可能完成的任务。但式 (8.99) 确实提示了一种近似根的方法。

设所有时间常数 $\tau_1, \ldots, \tau_n$ 为实且在数值上分得开。不失一般性，可设时间常数按幅度降序排列：

$$|\tau_1| \gg |\tau_2| \gg \cdots \gg |\tau_n| \tag{8.100}$$

式 (8.100) 的不等式满足时，式 (8.99) 中 $a_1, \ldots, a_n$ 的表达式各由其第一项主导：

$$\begin{aligned} a_1 &\approx \tau_1 \\ a_2 &\approx \tau_1\tau_2 \\ a_3 &\approx \tau_1\tau_2\tau_3 \\ &\vdots \\ a_n &= \tau_1\tau_2\tau_3\cdots\tau_n \end{aligned} \tag{8.101}$$

这些表达式现可解出时间常数，结果为

$$\begin{aligned} \tau_1 &\approx a_1 \\ \tau_2 &\approx \frac{a_2}{a_1} \\ \tau_3 &\approx \frac{a_3}{a_2} \\ &\vdots \\ \tau_n &\approx \frac{a_n}{a_{n-1}} \end{aligned} \tag{8.102}$$

故若

$$|a_1| \gg \left|\frac{a_2}{a_1}\right| \gg \left|\frac{a_3}{a_2}\right| \gg \cdots \gg \left|\frac{a_n}{a_{n-1}}\right| \tag{8.103}$$

则式 (8.97) 给出的多项式 $P(s)$ 有近似分解

$$P(s) \approx (1+a_1 s)\left(1+\frac{a_2}{a_1}s\right)\left(1+\frac{a_3}{a_2}s\right)\cdots\left(1+\frac{a_n}{a_{n-1}}s\right) \tag{8.104}$$

注意若式 (8.97) 中的原始系数是电路元件的简单函数，则式 (8.104) 给出的近似根也是电路元件的类似简单函数。故可得根的近似解析表达式。将数值代入式 (8.103) 以验证近似。

若两个根分得不开，则式 (8.103) 的一个不等式被违反。此时可将对应项保留为二次形式。例如，设第 $k$ 个不等式不满足：

$$|a_1| \gg \left|\frac{a_2}{a_1}\right| \gg \cdots \gg \left|\frac{a_k}{a_{k-1}}\right| \not\gg \left|\frac{a_{k+1}}{a_k}\right| \gg \cdots \gg \left|\frac{a_n}{a_{n-1}}\right| \tag{8.105}$$

则近似分解为

$$P(s) \approx (1+a_1 s)\left(1+\frac{a_2}{a_1}s\right)\cdots\left(1+\frac{a_k}{a_{k-1}}s+\frac{a_{k+1}}{a_{k-1}}s^2\right)\cdots\left(1+\frac{a_n}{a_{n-1}}s\right) \tag{8.106}$$

此近似准确的条件为

$$|a_1| \gg \left|\frac{a_2}{a_1}\right| \gg \cdots \gg \left|\frac{a_k}{a_{k-1}}\right| \gg \left|\frac{a_{k-2}a_{k+1}}{a_{k-1}^2}\right| \gg \left|\frac{a_{k+2}}{a_{k+1}}\right| \gg \cdots \gg \left|\frac{a_n}{a_{n-1}}\right| \tag{8.107}$$

共轭复根可用此方式近似。

当式 (8.103) 的第一个不等式被违反，即

$$|a_1| \not\gg \left|\frac{a_2}{a_1}\right| \gg \left|\frac{a_3}{a_2}\right| \gg \cdots \gg \left|\frac{a_n}{a_{n-1}}\right| \tag{8.108}$$

时，前两个根应保留为二次形式：

$$P(s) \approx \left(1+a_1 s+a_2 s^2\right)\left(1+\frac{a_3}{a_2}s\right)\cdots\left(1+\frac{a_n}{a_{n-1}}s\right) \tag{8.109}$$

此近似在以下条件满足时有效：

$$\left|\frac{a_2^2}{a_3}\right| \gg |a_1| \gg \left|\frac{a_3}{a_2}\right| \gg \left|\frac{a_4}{a_3}\right| \gg \cdots \gg \left|\frac{a_n}{a_{n-1}}\right| \tag{8.110}$$

若上述近似均不成立，则有三个或更多根在幅度上接近。此时须求助于三次或更高阶形式。

作为例子，考虑图8.30 的阻尼 EMI 滤波器。此类滤波器通常置于变换器功率输入端，以衰减变换器输入电流中的开关谐波。由电路分析可证此滤波器的传递函数为

$$G(s) = \frac{i_g(s)}{i_c(s)} = \frac{1+s\dfrac{L_1+L_2}{R}}{1+s\dfrac{L_1+L_2}{R}+s^2L_1C+s^3\dfrac{L_1L_2C}{R}} \tag{8.111}$$

![源页 p.318](../assets/page-snapshots/chapter-8/page-318.png)

图8.30 输入 EMI 滤波器示例

此传递函数含三阶分母，系数为

$$a_1 = \frac{L_1+L_2}{R}, \quad a_2 = L_1C, \quad a_3 = \frac{L_1L_2C}{R} \tag{8.112}$$

希望分解分母以得极点的解析表达式。正确做法取决于 $R$、$L_1$、$L_2$ 和 $C$ 的数值。当根为实且分得开时，式 (8.104) 预测分母可分解为

$$\left(1+s\frac{L_1+L_2}{R}\right)\left(1+sRC\frac{L_1}{L_1+L_2}\right)\left(1+s\frac{L_2}{R}\right) \tag{8.113}$$

按式 (8.103)，此近似在以下条件满足时有效

$$\frac{L_1+L_2}{R} \gg RC\frac{L_1}{L_1+L_2} \gg \frac{L_2}{R} \tag{8.114}$$

这些不等式除非 $L_1 \gg L_2$ 否则不能成立。$L_1 \gg L_2$ 时，式 (8.114) 可进一步简化为

$$\frac{L_1}{R} \gg RC \gg \frac{L_2}{R} \tag{8.115}$$

近似分解 (8.113) 可进一步简化为

$$\left(1+s\frac{L_1}{R}\right)(1+sRC)\left(1+s\frac{L_2}{R}\right) \tag{8.116}$$

故此时传递函数含三个分得开的实极点。式 (8.113) 和 (8.116) 表示式 (8.111) 分母的近似解析分解。虽然须将数值代入式 (8.114) 或 (8.115) 以验证近似，但仍可将式 (8.113) 和 (8.116) 表示为 $L_1$、$L_2$、$R$ 和 $C$ 的解析函数。式 (8.113) 和 (8.116) 是面向设计的，因为它们揭示了如何选择元件值以获得给定极点频率。

当式 (8.114) 的第二个不等式被违反，

$$\frac{L_1+L_2}{R} \gg RC\frac{L_1}{L_1+L_2} \not\gg \frac{L_2}{R} \tag{8.117}$$

则第二和第三个根应保留为二次形式：

$$\left(1+s\frac{L_1+L_2}{R}\right)\left(1+sRC\frac{L_1}{L_1+L_2}+s^2(L_1\,\|\,L_2)C\right) \tag{8.118}$$

此式来自式 (8.106)，取 $k = 2$。式 (8.107) 预测此近似在以下条件满足时有效

$$\frac{L_1+L_2}{R} \gg RC\frac{L_1}{L_1+L_2} \gg \frac{(L_1\,\|\,L_2)(L_1+L_2)}{RC} \tag{8.119}$$

应用式 (8.107) 时，取 $a_0$ 等于 1。式 (8.119) 的不等式可简化为

$$L_1 \gg L_2, \quad \text{且} \quad \frac{L_1}{R} \gg RC \tag{8.120}$$

注意不再要求 $RC \gg L_2/R$。式 (8.120) 意味着分解 (8.118) 可进一步简化为

$$\left(1+s\frac{L_1}{R}\right)\left(1+sRC+s^2L_2C\right) \tag{8.121}$$

故此时传递函数含一个与高频二次极点对分得开的低频极点。同样，分解结果 (8.121) 表示为元件值的解析函数，因而是面向设计的。

当式 (8.114) 的第一个不等式被违反：

$$\frac{L_1+L_2}{R} \not\gg RC\frac{L_1}{L_1+L_2} \gg \frac{L_2}{R} \tag{8.122}$$

则第一和第二个根应保留为二次形式：

$$\left(1+s\frac{L_1+L_2}{R}+s^2L_1C\right)\left(1+s\frac{L_2}{R}\right) \tag{8.123}$$

此式直接来自式 (8.109)。式 (8.110) 预测此近似在以下条件满足时有效

$$\frac{L_1RC}{L_2} \gg \frac{L_1+L_2}{R} \gg \frac{L_2}{R} \tag{8.124}$$

即

$$L_1 \gg L_2, \quad \text{且} \quad RC \gg \frac{L_2}{R} \tag{8.125}$$

此时传递函数含一个与高频实极点分得开的低频二次极点对。若上述近似均不成立，则三个根在幅度上均接近。此时须用其他方法处理原始三次多项式。输入滤波器（包括图8.30 滤波器）的设计在第17章讨论。

## 8.2 变换器传递函数分析

接下来导出基本变换器传递函数中极点、零点和渐近线增益的解析表达式。

### 8.2.1 示例：升降压变换器的传递函数

7.2 节导出了升降压变换器的小信号等效电路模型，结果（图7.16b）重复于图8.31。让我们导出并绘制此电路的控制-输出和输入-输出传递函数。

![源页 p.320](../assets/page-snapshots/chapter-8/page-320.png)

图8.31 7.2 节导出的升降压变换器等效电路

变换器含两个独立交流输入：控制输入 $\hat{d}(s)$ 和电网输入 $\hat{v}_g(s)$。交流输出电压变化 $\hat{v}(s)$ 可表示为这两个输入产生项的叠加：

$$\hat{v}(s) = G_{vd}(s)\hat{d}(s) + G_{vg}(s)\hat{v}_g(s) \tag{8.126}$$

故传递函数 $G_{vd}(s)$ 和 $G_{vg}(s)$ 可定义为

$$G_{vd}(s) = \left.\frac{\hat{v}(s)}{\hat{d}(s)}\right|_{\hat{v}_g(s)=0} \quad \text{和} \quad G_{vg}(s) = \left.\frac{\hat{v}(s)}{\hat{v}_g(s)}\right|_{\hat{d}(s)=0} \tag{8.127}$$

为求输入-输出传递函数 $G_{vg}(s)$，如图8.32a 所示令 $\hat{d}$ 源为零。然后可将 $v_g(s)$ 源和电感推过变压器，得图8.32b 电路。用分压公式求传递函数 $G_{vg}(s)$：

$$G_{vg}(s) = \left.\frac{\hat{v}(s)}{\hat{v}_g(s)}\right|_{\hat{d}(s)=0} = \left(-\frac{D}{D'}\right)\frac{R\,\|\,\dfrac{1}{sC}}{\dfrac{sL}{D'^2}+R\,\|\,\dfrac{1}{sC}} \tag{8.128}$$

![源页 p.321](../assets/page-snapshots/chapter-8/page-321.png)

图8.32 整理升降压等效电路求输入-输出传递函数 $G_{vg}(s)$：(a) 令 $\hat{d}$ 源为零；(b) 将电感和 $\hat{v}_g$ 源推过变压器

展开并联组合并表示为有理分式：

$$G_{vg}(s) = \left(-\frac{D}{D'}\right)\frac{\dfrac{R}{1+sRC}}{\dfrac{sL}{D'^2}+\dfrac{R}{1+sRC}} = \left(-\frac{D}{D'}\right)\frac{R}{R+\dfrac{sL}{D'^2}+s^2\dfrac{RLC}{D'^2}} \tag{8.129}$$

还未完成——下一步是将表达式整理为归一化形式，使分子和分母多项式中 $s^0$ 的系数为 1。分子分母同除以 $R$ 可完成：

$$G_{vg}(s) = \left.\frac{\hat{v}(s)}{\hat{v}_g(s)}\right|_{\hat{d}(s)=0} = \left(-\frac{D}{D'}\right)\frac{1}{1+s\dfrac{L}{D'^2R}+s^2\dfrac{LC}{D'^2}} \tag{8.130}$$

故输入-输出传递函数含直流增益 $G_{g0}$ 和二次极点对：

$$G_{vg}(s) = \frac{G_{g0}}{1+\dfrac{s}{Q\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2} \tag{8.131}$$

令式 (8.130) 和 (8.131) 的同类项相等求得输入-输出传递函数显著特征的解析表达式。直流增益为

$$G_{g0} = -\frac{D}{D'} \tag{8.132}$$

令式 (8.130) 和 (8.131) 分母中 $s^2$ 的系数相等得

$$\frac{1}{\omega_0^2} = \frac{LC}{D'^2} \tag{8.133}$$

故角转折频率为

$$\omega_0 = \frac{D'}{\sqrt{LC}} \tag{8.134}$$

令式 (8.130) 和 (8.131) 分母中 $s$ 的系数相等得

$$\frac{1}{Q\omega_0} = \frac{L}{D'^2R} \tag{8.135}$$

用式 (8.134) 消去 $\omega_0$ 并解出 $Q$ 得

$$Q = D'R\sqrt{\frac{C}{L}} \tag{8.136}$$

式 (8.132)、(8.134) 和 (8.136) 是输入-输出传递函数分析所需结果。这些表达式不仅适用于分析情形（求显著特征 $G_{g0}$、$\omega_0$ 和 $Q$ 的数值），也适用于设计情形（选择 $R$、$L$ 和 $C$ 的数值以获得给定的显著特征值）。

控制-输出传递函数 $G_{vd}(s)$ 的推导因图8.31 中有三个依赖 $\hat{d}(s)$ 的电源而复杂化。求 $G_{vd}(s)$ 的一种好方法是如规范模型推导（图7.36）那样整理电路模型。此处采用的另一种方法用叠加原理。首先令 $\hat{v}_g$ 源为零。这使 1:D 变压器的输入短路，得图8.33a 电路。然后将电感和 $\hat{d}$ 电压源推过 $D':1$ 变压器，如图8.33b所示。

![源页 p.322](../assets/page-snapshots/chapter-8/page-322.png)

图8.33 整理升降压等效电路求控制-输出传递函数 $G_{vd}(s)$：(a) 令 $\hat{v}_g$ 源为零；(b) 将电感和电压源推过变压器

图8.33b 含一个依赖 $\hat{d}$ 的电压源和一个依赖 $\hat{d}$ 的电流源。故传递函数 $G_{vd}(s)$ 可表示为这两个电源产生项的叠加。令电流源为零（即开路）时，得图8.34a 电路。输出 $\hat{v}(s)$ 可表示为

$$\frac{\hat{v}(s)}{\hat{d}(s)} = \left(-\frac{V_g-V}{D'}\right)\frac{R\,\|\,\dfrac{1}{sC}}{\dfrac{sL}{D'^2}+R\,\|\,\dfrac{1}{sC}} \tag{8.137}$$

![源页 p.323](../assets/page-snapshots/chapter-8/page-323.png)

图8.34 用叠加法求解图8.33b 模型：(a) 电流源为零；(b) 电压源为零

令电压源为零（即短路）时，图8.33b 简化为图8.34b 电路。输出 $\hat{v}(s)$ 可表示为

$$\frac{\hat{v}(s)}{\hat{d}(s)} = I\left(\frac{sL}{D'^2}\,\|\,R\,\|\,\frac{1}{sC}\right) \tag{8.138}$$

传递函数 $G_{vd}(s)$ 是式 (8.137) 和 (8.138) 之和：

$$G_{vd}(s) = \left(-\frac{V_g-V}{D'}\right)\frac{R\,\|\,\dfrac{1}{sC}}{\dfrac{sL}{D'^2}+R\,\|\,\dfrac{1}{sC}} + I\left(\frac{sL}{D'^2}\,\|\,R\,\|\,\frac{1}{sC}\right) \tag{8.139}$$

经代数整理可化简为

$$G_{vd}(s) = \left.\frac{\hat{v}(s)}{\hat{d}(s)}\right|_{\hat{v}_g(s)=0} = \left(-\frac{V_g-V}{D'}\right)\left(1-\frac{sLI}{D'(V_g-V)}\right)\frac{1}{1+s\dfrac{L}{D'^2R}+s^2\dfrac{LC}{D'^2}} \tag{8.140}$$

此方程形式为

$$G_{vd}(s) = G_{d0}\frac{\left(1-\dfrac{s}{\omega_z}\right)}{\left(1+\dfrac{s}{Q\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2\right)} \tag{8.141}$$

式 (8.140) 和 (8.130) 的分母相同，故 $G_{vd}(s)$ 和 $G_{vg}(s)$ 共享相同的 $\omega_0$ 和 $Q$，由式 (8.134) 和 (8.136) 给出。直流增益为

$$G_{d0} = -\frac{V_g-V}{D'} = -\frac{V_g}{D'^2} = \frac{V}{DD'} \tag{8.142}$$

令式 (8.140) 和 (8.141) 分子中 $s$ 的系数相等求得零点的角频率：

$$\omega_z = \frac{D'(V_g-V)}{LI} = \frac{D'^2R}{DL} \quad (\text{RHP}) \tag{8.143}$$

此零点位于右半平面。式 (8.142) 和 (8.143) 已用直流关系

$$V = -\frac{D}{D'}V_g \tag{8.144}$$

$$I = -\frac{V}{D_1 R}$$

简化。

式 (8.134)、(8.136)、(8.142) 和 (8.143) 构成控制-输出传递函数分析的结果：显著特征 $\omega_0$、$Q$、$G_{d0}$ 和 $\omega_z$ 的解析表达式。这些表达式可用于选择元件值以获得给定的显著特征值。

求得传递函数显著特征的解析表达式后，可代入数值并构造波特图。设给定如下值：

$$D = 0.6, \quad R = 10\,\Omega, \quad V_g = 30\text{ V}, \quad L = 160\,\mu\text{H}, \quad C = 160\,\mu\text{F} \tag{8.145}$$

计算式 (8.132)、(8.134)、(8.136)、(8.142) 和 (8.143) 确定传递函数显著特征的数值，结果为

$$|G_{g0}| = \frac{D}{D'} = 1.5 \Rightarrow 3.5\text{ dB} \tag{8.146}$$

$$|G_{d0}| = \frac{|V|}{DD'} = 187.5\text{ V} \Rightarrow 45.5\text{ dBV}$$

$$f_0 = \frac{\omega_0}{2\pi} = \frac{D'}{2\pi\sqrt{LC}} = 400\text{ Hz}$$

$$Q = D'R\sqrt{\frac{C}{L}} = 4 \Rightarrow 12\text{ dB}$$

$$f_z = \frac{\omega_z}{2\pi} = \frac{D'^2R}{2\pi DL} = 2.65\text{ kHz}$$

$G_{vd}$ 的幅值和相位波特图构造于图8.35。传递函数含 45.5 dBV 直流增益、400 Hz 处 Q 为 $4 \Rightarrow 12$ dB 的谐振极点、以及 2.65 kHz 处的右半平面零点。谐振极点对高频相位渐近线贡献 −180°，而右半平面零点贡献 −90°。此外，升降压变换器的反相特性导致 180° 相位反转，未包含在图8.35 中。

![源页 p.325](../assets/page-snapshots/chapter-8/page-325.png)

图8.35 升降压变换器示例控制-输出传递函数 $G_{vd}$ 的波特图。输出电压反转引起的相位反转未包含

![源页 p.325](../assets/page-snapshots/chapter-8/page-325.png)

图8.36 升降压变换器示例输入-输出传递函数 $G_{vg}$ 的波特图。输出电压反转引起的相位反转未包含

输入-输出传递函数 $G_{vg}$ 的幅值和相位波特图构造于图8.36。此传递函数含相同的 400 Hz 谐振极点，但缺少右半平面零点。直流增益 $G_{g0}$ 等于变换器的变换比 $M(D)$。同样，升降压变换器反相特性引起的 180° 相位反转未包含在图8.36 中。

### 8.2.2 若干基本 CCM 变换器的传递函数

基本降压、升压和升降压变换器的输入-输出和控制-输出传递函数显著特征汇总于表8.2。每种情形下，控制-输出传递函数形式为

$$G_{vd}(s) = G_{d0}\frac{\left(1-\dfrac{s}{\omega_z}\right)}{\left(1+\dfrac{s}{Q\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2\right)} \tag{8.147}$$

输入-输出传递函数形式为

$$G_{vg}(s) = \frac{G_{g0}}{\left(1+\dfrac{s}{Q\omega_0}+\left(\dfrac{s}{\omega_0}\right)^2\right)} \tag{8.148}$$

表8.2 若干基本直流-直流变换器小信号 CCM 传递函数的显著特征

| 变换器 | $G_{g0}$ | $G_{d0}$ | $\omega_0$ | $Q$ | $\omega_z$ |
|---|---|---|---|---|---|
| 降压 | $D$ | $\dfrac{V}{D}$ | $\dfrac{1}{\sqrt{LC}}$ | $R\sqrt{\dfrac{C}{L}}$ | $\infty$ |
| 升压 | $\dfrac{1}{D'}$ | $\dfrac{V}{D'}$ | $D'\sqrt{\dfrac{1}{LC}}$ | $D'R\sqrt{\dfrac{C}{L}}$ | $\dfrac{D'^2R}{L}$ |
| 升降压 | $-\dfrac{D}{D'}$ | $\dfrac{V}{DD'}$ | $D'\sqrt{\dfrac{1}{LC}}$ | $D'R\sqrt{\dfrac{C}{L}}$ | $\dfrac{D'^2R}{DL}$ |

升压和升降压变换器的控制-输出传递函数含两个极点和一个右半平面零点。降压变换器的 $G_{vd}(s)$ 含两个极点但无零点。所有三个理想变换器的输入-输出传递函数含两个极点且无零点。

这些结果可轻易推广到降压、升压和升降压变换器的变压器隔离版本。变压器对传递函数 $G_{vg}(s)$ 和 $G_{vd}(s)$ 的影响可忽略，仅引入匝比。例如，当桥式拓扑的变压器对称驱动时，其磁化电感不对变换器小信号传递函数贡献动态。同样，当正激变换器的变压器磁化电感由输入电压 $v_g$ 复位时（如图6.24 或6.29），也不贡献显著动态。在所有基于降压、升压和升降压变换器的变压器隔离变换器中，输入-输出传递函数 $G_{vg}(s)$ 应乘以变压器匝比；传递函数 (8.147) 和 (8.148) 及表8.2 列出的参数在其他方面可直接应用。

### 8.2.3 变换器中右半平面零点的物理起源

![源页 p.327](../assets/page-snapshots/chapter-8/page-327.png)

图8.37 具有右半平面零点传递函数的框图，如式 (8.32) 所示，$\omega_0 = \omega_z$

图8.37 的框图说明了右半平面零点的行为。低频下增益 $(s/\omega_z)$ 幅值可忽略，故 $u_{out} \approx u_{in}$。高频下 $(s/\omega_z)$ 增益幅值远大于 1 时，$u_{out} \approx -(s/\omega_z)u_{in}$。负号在高频引起相位反转。对暂态响应的含义是输出最初倾向于与最终值相反的方向变化。

我们已看到升压和升降压变换器（图8.38）的控制-输出传递函数呈现 RHP 零点。占空比阶跃变化的典型暂态响应波形如图8.39所示。此例中变换器最初在 $d = 0.4$ 和 $d' = 0.6$ 平衡工作。图中给出平衡电感电流 $i_L(t)$、二极管电流 $i_D(t)$ 和输出电压 $v(t)$ 波形。平均二极管电流为

$$\langle i_D\rangle_{T_s} = d'\langle i_L\rangle_{T_s} \tag{8.149}$$

由电容电荷平衡，变换器平衡工作时此平均二极管电流等于直流负载电流。在时刻 $t = t_1$，占空比增大到 0.6。结果 $d'$ 减小到 0.4。由式 (8.149) 给出的平均二极管电流因此减小，输出电容开始放电。输出电压幅值最初如图所示下降。

![源页 p.327](../assets/page-snapshots/chapter-8/page-327.png)

图8.38 两个 CCM 控制-输出传递函数呈现 RHP 零点的基本变换器：(a) 升压；(b) 升降压
