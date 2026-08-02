---
date: 2026-08-01
section: 电源控制
chapter: fundamentals
chapterTitle: 电力电子基础教材
chapterOrder: 10
category: 电力电子基础教材
source: power
visibility: public
title: "第7章 交流等效电路建模（第3部分）"
tags:
  - power-electronics
  - 教材
  - Fundamentals-of-Power-Electronics
status: learning
summary: "`Fundamentals of Power Electronics 3rd Edition.pdf`"
navGroup: 教材研读
navGroupOrder: 25
---

# 第7章 交流等效电路建模（第3部分）

> 源页：267–286
> 本部分续接 7.5 状态空间平均，涵盖 7.5.2–7.5.5、7.6 关键要点小结和习题 7.1–7.12。

## 7.5 状态空间平均（续）

### 7.5.2 基本状态空间平均模型

现在考虑一个工作于连续导通模式的脉宽调制变换器。变换器电路含构成状态向量 $\mathbf{x}(t)$ 的独立状态，并由构成输入向量 $\mathbf{u}(t)$ 的独立电源驱动。第一子区间内，开关在位置 1，变换器简化为线性电路，可用如下状态方程描述：

$$\begin{aligned} \mathbf{K}\frac{d\mathbf{x}(t)}{dt} &= \mathbf{A}_1\mathbf{x}(t) + \mathbf{B}_1\mathbf{u}(t) \\ \mathbf{y}(t) &= \mathbf{C}_1\mathbf{x}(t) + \mathbf{E}_1\mathbf{u}(t) \end{aligned} \tag{7.104}$$

第二子区间内，开关在位置 2，变换器简化为另一线性电路，其状态方程为

$$\begin{aligned} \mathbf{K}\frac{d\mathbf{x}(t)}{dt} &= \mathbf{A}_2\mathbf{x}(t) + \mathbf{B}_2\mathbf{u}(t) \\ \mathbf{y}(t) &= \mathbf{C}_2\mathbf{x}(t) + \mathbf{E}_2\mathbf{u}(t) \end{aligned} \tag{7.105}$$

两个子区间内电路元件连接不同，故相应状态方程矩阵 $\mathbf{A}_1, \mathbf{B}_1, \mathbf{C}_1, \mathbf{E}_1$ 和 $\mathbf{A}_2, \mathbf{B}_2, \mathbf{C}_2, \mathbf{E}_2$ 也可能不同。给定这些状态方程，状态空间平均的结果是平衡和小信号交流模型的状态方程。

若变换器的自然频率及变换器输入的变化频率均远低于开关频率，则描述平衡态变换器的状态空间平均模型为

$$\begin{aligned} \mathbf{0} &= \mathbf{A}\mathbf{X} + \mathbf{B}\mathbf{U} \\ \mathbf{Y} &= \mathbf{C}\mathbf{X} + \mathbf{E}\mathbf{U} \end{aligned} \tag{7.106}$$

其中平均矩阵为

$$\begin{aligned} \mathbf{A} &= D\mathbf{A}_1 + D'\mathbf{A}_2 \\ \mathbf{B} &= D\mathbf{B}_1 + D'\mathbf{B}_2 \\ \mathbf{C} &= D\mathbf{C}_1 + D'\mathbf{C}_2 \\ \mathbf{E} &= D\mathbf{E}_1 + D'\mathbf{E}_2 \end{aligned} \tag{7.107}$$

平衡直流分量为

$$\begin{aligned} \mathbf{X} &= \text{平衡（直流）状态向量} \\ \mathbf{U} &= \text{平衡（直流）输入向量} \\ \mathbf{Y} &= \text{平衡（直流）输出向量} \\ D &= \text{平衡（直流）占空比} \end{aligned} \tag{7.108}$$

式 (7.108) 定义的量表示平均向量的平衡值。式 (7.106) 可解出平衡状态和输出向量：

$$\mathbf{X} = -\mathbf{A}^{-1}\mathbf{B}\mathbf{U} \qquad \mathbf{Y} = (-\mathbf{C}\mathbf{A}^{-1}\mathbf{B} + \mathbf{E})\mathbf{U} \tag{7.109}$$

小信号交流模型的状态方程为

$$\begin{aligned} \mathbf{K}\frac{d\hat{\mathbf{x}}(t)}{dt} &= \mathbf{A}\hat{\mathbf{x}}(t) + \mathbf{B}\hat{\mathbf{u}}(t) + \{(\mathbf{A}_1 - \mathbf{A}_2)\mathbf{X} + (\mathbf{B}_1 - \mathbf{B}_2)\mathbf{U}\}\hat{d}(t) \\ \hat{\mathbf{y}}(t) &= \mathbf{C}\hat{\mathbf{x}}(t) + \mathbf{E}\hat{\mathbf{u}}(t) + \{(\mathbf{C}_1 - \mathbf{C}_2)\mathbf{X} + (\mathbf{E}_1 - \mathbf{E}_2)\mathbf{U}\}\hat{d}(t) \end{aligned} \tag{7.110}$$

式 (7.110) 中的量 $\hat{\mathbf{x}}(t)$、$\hat{\mathbf{u}}(t)$、$\hat{\mathbf{y}}(t)$ 和 $\hat{d}(t)$ 是绕式 (7.106) 至 (7.109) 定义的平衡解（静态工作点）的小交流变化。

故若能写出变换器状态方程 (7.104) 和 (7.105)，则总可通过计算式 (7.106) 至 (7.110) 求得平均直流和小信号交流模型。

### 7.5.3 状态空间平均结果的讨论

如 7.1 和 7.2 节，电感电流和电容电压的低频分量通过在长度为 $T_s$ 的区间上平均建模。故可定义状态向量 $\mathbf{x}(t)$ 的平均为

$$\langle \mathbf{x}(t)\rangle_{T_s} = \frac{1}{T_s}\int_{t-T_s/2}^{t+T_s/2}\mathbf{x}(\tau)\,d\tau \tag{7.111}$$

输入和输出向量的低频分量以类似方式建模。通过平均电感电压和电容电流，得到如下低频状态方程：

$$\mathbf{K}\frac{d\langle \mathbf{x}(t)\rangle_{T_s}}{dt} = \bigl(d(t)\mathbf{A}_1 + d'(t)\mathbf{A}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + \bigl(d(t)\mathbf{B}_1 + d'(t)\mathbf{B}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s} \tag{7.112}$$

此结果等价于式 (7.2)。

例如，考虑状态向量 $\mathbf{x}(t)$ 的元素在一个开关周期内如何变化。第一子区间内，开关在位置 1，变换器状态方程由式 (7.104) 给出。因此 $\mathbf{x}(t)$ 的元素以斜率 $\mathbf{K}^{-1}(\mathbf{A}_1\mathbf{x}(t) + \mathbf{B}_1\mathbf{u}(t))$ 变化。若做小纹波近似，即 $\mathbf{x}(t)$ 和 $\mathbf{u}(t)$ 在一个开关周期内变化不大，则斜率基本恒定，近似等于

$$\frac{d\mathbf{x}(t)}{dt} = \mathbf{K}^{-1}\bigl(\mathbf{A}_1\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_1\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.113}$$

此假设与 $\mathbf{x}(t)$ 所有元素中开关纹波小以及 $\mathbf{u}(t)$ 的变化远慢于开关频率的要求一致。若假定状态向量初值为 $\mathbf{x}(0)$，则可写

$$\underbrace{\mathbf{x}(dT_s)}_{\text{终值}} = \underbrace{\mathbf{x}(0)}_{\text{初值}} + \underbrace{(dT_s)}_{\text{区间长度}}\,\mathbf{K}^{-1}\bigl(\mathbf{A}_1\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_1\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.114}$$

类似论证适用于第二子区间。开关在位置 2 时，状态方程由式 (7.105) 给出。在此子区间内做小纹波近似，状态向量现在以斜率

$$\frac{d\mathbf{x}(t)}{dt} = \mathbf{K}^{-1}\bigl(\mathbf{A}_2\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_2\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.115}$$

![源页 p.269](../assets/page-snapshots/chapter-7/page-269.png)

图7.40 状态向量的一个元素及其平均在一个开关周期内的演化

变化。开关周期末的状态向量为

$$\underbrace{\mathbf{x}(T_s)}_{\text{终值}} = \underbrace{\mathbf{x}(dT_s)}_{\text{初值}} + \underbrace{(d'T_s)}_{\text{区间长度}}\,\mathbf{K}^{-1}\bigl(\mathbf{A}_2\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_2\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.116}$$

将式 (7.114) 代入式 (7.116) 可用 $\mathbf{x}(0)$ 表示 $\mathbf{x}(T_s)$：

$$\mathbf{x}(T_s) = \mathbf{x}(0) + dT_s\mathbf{K}^{-1}\bigl(\mathbf{A}_1\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_1\langle \mathbf{u}(t)\rangle_{T_s}\bigr) + d'T_s\mathbf{K}^{-1}\bigl(\mathbf{A}_2\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{B}_2\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.117}$$

合并同类项得

$$\mathbf{x}(T_s) = \mathbf{x}(0) + T_s\mathbf{K}^{-1}\bigl(d(t)\mathbf{A}_1 + d'(t)\mathbf{A}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + T_s\mathbf{K}^{-1}\bigl(d(t)\mathbf{B}_1 + d'(t)\mathbf{B}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s} \tag{7.118}$$

接下来，用一个开关周期上的净变化近似 $\langle \mathbf{x}(t)\rangle_{T_s}$ 的导数：

$$\frac{d\langle \mathbf{x}(t)\rangle_{T_s}}{dt} \approx \frac{\mathbf{x}(T_s) - \mathbf{x}(0)}{T_s} \tag{7.119}$$

将式 (7.118) 代入式 (7.119) 得

$$\mathbf{K}\frac{d\langle \mathbf{x}(t)\rangle_{T_s}}{dt} = \bigl(d(t)\mathbf{A}_1 + d'(t)\mathbf{A}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + \bigl(d(t)\mathbf{B}_1 + d'(t)\mathbf{B}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s} \tag{7.120}$$

与式 (7.113) 相同。这是描述变换器动态的基本平均模型。它是非线性的，因为控制输入 $d(t)$ 与 $\langle \mathbf{x}(t)\rangle_{T_s}$ 和 $\langle \mathbf{u}(t)\rangle_{T_s}$ 相乘。$\mathbf{x}(t)$ 的典型元素及其平均的变化如图7.40所示。

还希望通过平均求输出向量 $\mathbf{y}(t)$ 的低频分量。第一子区间内 $\mathbf{y}(t)$ 由式 (7.104) 描述，第二子区间内由式 (7.105) 描述。故 $\mathbf{y}(t)$ 的元素在开关转换处可能不连续，如图7.41所示。可再次在一个开关周期上平均去除开关谐波，结果为

$$\langle \mathbf{y}(t)\rangle_{T_s} = d(t)\bigl(\mathbf{C}_1\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{E}_1\langle \mathbf{u}(t)\rangle_{T_s}\bigr) + d'(t)\bigl(\mathbf{C}_2\langle \mathbf{x}(t)\rangle_{T_s} + \mathbf{E}_2\langle \mathbf{u}(t)\rangle_{T_s}\bigr) \tag{7.121}$$

整理得

$$\langle \mathbf{y}(t)\rangle_{T_s} = \bigl(d(t)\mathbf{C}_1 + d'(t)\mathbf{C}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + \bigl(d(t)\mathbf{E}_1 + d'(t)\mathbf{E}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s} \tag{7.122}$$

![源页 p.270](../assets/page-snapshots/chapter-7/page-270.png)

图7.41 输出向量 $\mathbf{y}(t)$ 的一个元素的平均

这又是一个非线性方程。

平均状态方程 (7.120) 和 (7.122) 汇集如下：

$$\mathbf{K}\frac{d\langle \mathbf{x}(t)\rangle_{T_s}}{dt} = \bigl(d(t)\mathbf{A}_1 + d'(t)\mathbf{A}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + \bigl(d(t)\mathbf{B}_1 + d'(t)\mathbf{B}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s} \tag{7.123}$$

$$\langle \mathbf{y}(t)\rangle_{T_s} = \bigl(d(t)\mathbf{C}_1 + d'(t)\mathbf{C}_2\bigr)\langle \mathbf{x}(t)\rangle_{T_s} + \bigl(d(t)\mathbf{E}_1 + d'(t)\mathbf{E}_2\bigr)\langle \mathbf{u}(t)\rangle_{T_s}$$

下一步是在静态工作点附近线性化这些方程以构造小信号交流模型。当施加直流输入 $d(t) = D$ 和 $\mathbf{u}(t) = \mathbf{U}$ 时，$\langle \mathbf{x}(t)\rangle_{T_s}$ 所有元素的导数为零时变换器处于平衡态。故通过在式 (7.123) 中令 $\langle \mathbf{x}(t)\rangle_{T_s}$ 的导数为零，可将变换器静态工作点定义为如下方程的解：

$$\begin{aligned} \mathbf{0} &= \mathbf{A}\mathbf{X} + \mathbf{B}\mathbf{U} \\ \mathbf{Y} &= \mathbf{C}\mathbf{X} + \mathbf{E}\mathbf{U} \end{aligned} \tag{7.124}$$

其中已用定义 (7.107) 和 (7.108)。现在在静态工作点附近扰动和线性化变换器波形：

$$\begin{aligned} \langle \mathbf{x}(t)\rangle_{T_s} &= \mathbf{X} + \hat{\mathbf{x}}(t) \\ \langle \mathbf{u}(t)\rangle_{T_s} &= \mathbf{U} + \hat{\mathbf{u}}(t) \\ \langle \mathbf{y}(t)\rangle_{T_s} &= \mathbf{Y} + \hat{\mathbf{y}}(t) \\ d(t) &= D + \hat{d}(t) \quad\Rightarrow\quad d'(t) = D' - \hat{d}(t) \end{aligned} \tag{7.125}$$

这里 $\hat{\mathbf{u}}(t)$ 和 $\hat{d}(t)$ 是输入向量和占空比的小交流变化。向量 $\hat{\mathbf{x}}(t)$ 和 $\hat{\mathbf{y}}(t)$ 是所得状态和输出向量的小交流变化。须假定这些交流变化远小于静态值，即

$$\|\mathbf{U}\| \gg \|\hat{\mathbf{u}}(t)\|, \quad D \gg |\hat{d}(t)|, \quad \|\mathbf{X}\| \gg \|\hat{\mathbf{x}}(t)\|, \quad \|\mathbf{Y}\| \gg \|\hat{\mathbf{y}}(t)\| \tag{7.126}$$

这里 $\|\mathbf{x}\|$ 表示向量 $\mathbf{x}$ 的范数。

将式 (7.125) 代入式 (7.123) 得

$$\mathbf{K}\frac{d(\mathbf{X} + \hat{\mathbf{x}}(t))}{dt} = \bigl((D + \hat{d}(t))\mathbf{A}_1 + (D' - \hat{d}(t))\mathbf{A}_2\bigr)(\mathbf{X} + \hat{\mathbf{x}}(t)) + \bigl((D + \hat{d}(t))\mathbf{B}_1 + (D' - \hat{d}(t))\mathbf{B}_2\bigr)(\mathbf{U} + \hat{\mathbf{u}}(t)) \tag{7.127}$$

$$(\mathbf{Y} + \hat{\mathbf{y}}(t)) = \bigl((D + \hat{d}(t))\mathbf{C}_1 + (D' - \hat{d}(t))\mathbf{C}_2\bigr)(\mathbf{X} + \hat{\mathbf{x}}(t)) + \bigl((D + \hat{d}(t))\mathbf{E}_1 + (D' - \hat{d}(t))\mathbf{E}_2\bigr)(\mathbf{U} + \hat{\mathbf{u}}(t))$$

$d\mathbf{X}/dt$ 为零。合并同类项得

$$\underbrace{\mathbf{K}\frac{d\hat{\mathbf{x}}(t)}{dt}}_{\text{一阶交流}} = \underbrace{(\mathbf{A}\mathbf{X} + \mathbf{B}\mathbf{U})}_{\text{直流项}} + \underbrace{\mathbf{A}\hat{\mathbf{x}}(t) + \mathbf{B}\hat{\mathbf{u}}(t) + \{(\mathbf{A}_1 - \mathbf{A}_2)\mathbf{X} + (\mathbf{B}_1 - \mathbf{B}_2)\mathbf{U}\}\hat{d}(t)}_{\text{一阶交流项}} + \underbrace{(\mathbf{A}_1 - \mathbf{A}_2)\hat{\mathbf{x}}(t)\hat{d}(t) + (\mathbf{B}_1 - \mathbf{B}_2)\hat{\mathbf{u}}(t)\hat{d}(t)}_{\text{二阶非线性项}} \tag{7.128}$$

$$(\mathbf{Y} + \hat{\mathbf{y}}(t)) = \underbrace{(\mathbf{C}\mathbf{X} + \mathbf{E}\mathbf{U})}_{\text{直流项}} + \underbrace{\mathbf{C}\hat{\mathbf{x}}(t) + \mathbf{E}\hat{\mathbf{u}}(t) + \{(\mathbf{C}_1 - \mathbf{C}_2)\mathbf{X} + (\mathbf{E}_1 - \mathbf{E}_2)\mathbf{U}\}\hat{d}(t)}_{\text{一阶交流项}} + \underbrace{(\mathbf{C}_1 - \mathbf{C}_2)\hat{\mathbf{x}}(t)\hat{d}(t) + (\mathbf{E}_1 - \mathbf{E}_2)\hat{\mathbf{u}}(t)\hat{d}(t)}_{\text{二阶非线性项}}$$

由于直流项满足式 (7.124)，它们从式 (7.128) 中消去。又若满足小信号假设 (7.126)，则式 (7.128) 的二阶非线性项的幅度远小于一阶交流项。故可忽略非线性项，得如下线性化交流模型：

$$\begin{aligned} \mathbf{K}\frac{d\hat{\mathbf{x}}(t)}{dt} &= \mathbf{A}\hat{\mathbf{x}}(t) + \mathbf{B}\hat{\mathbf{u}}(t) + \{(\mathbf{A}_1 - \mathbf{A}_2)\mathbf{X} + (\mathbf{B}_1 - \mathbf{B}_2)\mathbf{U}\}\hat{d}(t) \\ \hat{\mathbf{y}}(t) &= \mathbf{C}\hat{\mathbf{x}}(t) + \mathbf{E}\hat{\mathbf{u}}(t) + \{(\mathbf{C}_1 - \mathbf{C}_2)\mathbf{X} + (\mathbf{E}_1 - \mathbf{E}_2)\mathbf{U}\}\hat{d}(t) \end{aligned} \tag{7.129}$$

这是所需结果，与式 (7.110) 一致。

### 7.5.4 示例：非理想升降压变换器的状态空间平均

让我们用状态空间平均法建模图7.42 的升降压变换器。我们将用导通电阻 $R_{on}$ 建模 MOSFET $Q_1$ 的导通损耗，用数值为 $V_D$ 的独立电压源建模二极管 $D_1$ 的正向压降。希望得到建模变换器输入端口和输出端口的完整等效电路。

![源页 p.272](../assets/page-snapshots/chapter-7/page-272.png)

图7.42 升降压变换器示例

变换器的独立状态为电感电流 $i(t)$ 和电容电压 $v(t)$。故应定义状态向量 $\mathbf{x}(t)$ 为

$$\mathbf{x}(t) = \begin{bmatrix} i(t) \\ v(t) \end{bmatrix} \tag{7.130}$$

输入电压 $v_g(t)$ 是应放入输入向量 $\mathbf{u}(t)$ 的独立电源。此外，我们选择用数值为 $V_D$ 的独立电压源建模二极管正向压降。故此电压源也应包含在输入向量 $\mathbf{u}(t)$ 中。故定义输入向量为

$$\mathbf{u}(t) = \begin{bmatrix} v_g(t) \\ V_D \end{bmatrix} \tag{7.131}$$

为建模变换器输入端口，需求变换器输入电流 $i_g(t)$。为计算此因变量电流，应将其包含在输出向量 $\mathbf{y}(t)$ 中。故选择定义 $\mathbf{y}(t)$ 为

$$\mathbf{y}(t) = [i_g(t)] \tag{7.132}$$

注意不必将输出电压 $v(t)$ 包含在输出向量 $\mathbf{y}(t)$ 中，因为 $v(t)$ 已在状态向量 $\mathbf{x}(t)$ 中。

接下来写每个子区间的状态方程。开关在位置 1 时，得图7.43a 变换器电路。电感电压、电容电流和变换器输入电流为

$$\begin{aligned} L\frac{di(t)}{dt} &= v_g(t) - i(t)R_{on} \\ C\frac{dv(t)}{dt} &= -\frac{v(t)}{R} \\ i_g(t) &= i(t) \end{aligned} \tag{7.133}$$

![源页 p.273](../assets/page-snapshots/chapter-7/page-273.png)

图7.43 升降压变换器电路：(a) 子区间 1；(b) 子区间 2

这些方程可写成如下状态空间形式：

$$\underbrace{\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}}_{\mathbf{K}} \frac{d}{dt}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} = \underbrace{\begin{bmatrix} -R_{on} & 0 \\ 0 & -\dfrac{1}{R} \end{bmatrix}}_{\mathbf{A}_1}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}}_{\mathbf{B}_1}\underbrace{\begin{bmatrix} v_g(t) \\ V_D \end{bmatrix}}_{\mathbf{u}(t)} \tag{7.134}$$

$$\underbrace{[i_g(t)]}_{\mathbf{y}(t)} = \underbrace{\begin{bmatrix} 1 & 0 \end{bmatrix}}_{\mathbf{C}_1}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 0 & 0 \end{bmatrix}}_{\mathbf{E}_1}\underbrace{\begin{bmatrix} v_g(t) \\ V_D \end{bmatrix}}_{\mathbf{u}(t)}$$

故已识别状态方程矩阵 $\mathbf{A}_1, \mathbf{B}_1, \mathbf{C}_1, \mathbf{E}_1$。

开关在位置 2 时，得图7.43b 变换器电路。此子区间内，电感电压、电容电流和变换器输入电流为

$$\begin{aligned} L\frac{di(t)}{dt} &= v(t) - V_D \\ C\frac{dv(t)}{dt} &= -\frac{v(t)}{R} - i(t) \\ i_g(t) &= 0 \end{aligned} \tag{7.135}$$

写成状态空间形式时，这些方程变为

$$\underbrace{\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}}_{\mathbf{K}} \frac{d}{dt}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} = \underbrace{\begin{bmatrix} 0 & 1 \\ -1 & -\dfrac{1}{R} \end{bmatrix}}_{\mathbf{A}_2}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 0 & -1 \\ 0 & 0 \end{bmatrix}}_{\mathbf{B}_2}\underbrace{\begin{bmatrix} v_g(t) \\ V_D \end{bmatrix}}_{\mathbf{u}(t)} \tag{7.136}$$

$$\underbrace{[i_g(t)]}_{\mathbf{y}(t)} = \underbrace{\begin{bmatrix} 0 & 0 \end{bmatrix}}_{\mathbf{C}_2}\underbrace{\begin{bmatrix} i(t) \\ v(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 0 & 0 \end{bmatrix}}_{\mathbf{E}_2}\underbrace{\begin{bmatrix} v_g(t) \\ V_D \end{bmatrix}}_{\mathbf{u}(t)}$$

故也已识别子区间 2 矩阵 $\mathbf{A}_2, \mathbf{B}_2, \mathbf{C}_2, \mathbf{E}_2$。

下一步是计算状态空间平均平衡方程 (7.106) 至 (7.108)。平均矩阵 $\mathbf{A}$ 为

$$\mathbf{A} = D\mathbf{A}_1 + D'\mathbf{A}_2 = D\begin{bmatrix} -R_{on} & 0 \\ 0 & -\dfrac{1}{R} \end{bmatrix} + D'\begin{bmatrix} 0 & 1 \\ -1 & -\dfrac{1}{R} \end{bmatrix} = \begin{bmatrix} -DR_{on} & D' \\ -D' & -\dfrac{1}{R} \end{bmatrix} \tag{7.137}$$

类似地，平均矩阵 $\mathbf{B}, \mathbf{C}, \mathbf{E}$ 计算如下：

$$\mathbf{B} = D\mathbf{B}_1 + D'\mathbf{B}_2 = \begin{bmatrix} D & -D' \\ 0 & 0 \end{bmatrix} \qquad \mathbf{C} = D\mathbf{C}_1 + D'\mathbf{C}_2 = \begin{bmatrix} D & 0 \end{bmatrix} \qquad \mathbf{E} = D\mathbf{E}_1 + D'\mathbf{E}_2 = \begin{bmatrix} 0 & 0 \end{bmatrix} \tag{7.138}$$

故直流状态方程 (7.106) 变为

$$\begin{bmatrix} 0 \\ 0 \end{bmatrix} = \begin{bmatrix} -DR_{on} & D' \\ -D' & -\dfrac{1}{R} \end{bmatrix}\begin{bmatrix} I \\ V \end{bmatrix} + \begin{bmatrix} D & -D' \\ 0 & 0 \end{bmatrix}\begin{bmatrix} V_g \\ V_D \end{bmatrix} \tag{7.139}$$

$$[I_g] = \begin{bmatrix} D & 0 \end{bmatrix}\begin{bmatrix} I \\ V \end{bmatrix} + \begin{bmatrix} 0 & 0 \end{bmatrix}\begin{bmatrix} V_g \\ V_D \end{bmatrix}$$

计算式 (7.109) 得平衡状态和输出向量的如下解：

$$\begin{bmatrix} I \\ V \end{bmatrix} = \frac{1}{1 + \dfrac{DD'^2R_{on}}{R}}\begin{bmatrix} \dfrac{D}{D'^2R} & \dfrac{1}{D'R} - \dfrac{D}{D'} \\ \dfrac{1}{D'R} & -\dfrac{1}{R} \end{bmatrix}\begin{bmatrix} V_g \\ V_D \end{bmatrix} \tag{7.140}$$

$$[I_g] = \frac{1}{1 + \dfrac{DD'^2R_{on}}{R}}\begin{bmatrix} \dfrac{D^2}{D'^2R} & \dfrac{1}{D'R} \end{bmatrix}\begin{bmatrix} V_g \\ V_D \end{bmatrix}$$

也可照常由式 (7.139) 构造图7.44 的稳态等效电路。式 (7.139) 的顶行可通过对电感电压波形施加电感伏秒平衡原理得到。式 (7.139) 的第二行可通过对电容电流波形施加电容电荷平衡原理得到。$i_g(t)$ 方程表述变换器输入电流的直流分量。通过重建等效于这三个方程的电路，得图7.44 的直流模型。

![源页 p.275](../assets/page-snapshots/chapter-7/page-275.png)

图7.44 升降压变换器模型的直流电路模型，等效于式 (7.139)

小信号模型由式 (7.110) 求得。式 (7.110) 中 $\hat{d}(t)$ 的向量系数为

$$\begin{aligned} (\mathbf{A}_1 - \mathbf{A}_2)\mathbf{X} + (\mathbf{B}_1 - \mathbf{B}_2)\mathbf{U} &= \begin{bmatrix} -V - IR_{on} \\ I \end{bmatrix} + \begin{bmatrix} V_g + V_D \\ 0 \end{bmatrix} = \begin{bmatrix} V_g - V - IR_{on} + V_D \\ I \end{bmatrix} \\ (\mathbf{C}_1 - \mathbf{C}_2)\mathbf{X} + (\mathbf{E}_1 - \mathbf{E}_2)\mathbf{U} &= [I] \end{aligned} \tag{7.141}$$

故小信号交流状态方程 (7.110) 变为

$$\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}\frac{d}{dt}\begin{bmatrix} \hat{i}(t) \\ \hat{v}(t) \end{bmatrix} = \begin{bmatrix} -DR_{on} & D' \\ -D' & -\dfrac{1}{R} \end{bmatrix}\begin{bmatrix} \hat{i}(t) \\ \hat{v}(t) \end{bmatrix} + \begin{bmatrix} D & -D' \\ 0 & 0 \end{bmatrix}\begin{bmatrix} \hat{v}_g(t) \\ 0 \end{bmatrix} + \begin{bmatrix} V_g - V - IR_{on} + V_D \\ I \end{bmatrix}\hat{d}(t) \tag{7.142}$$

$$[\hat{i}_g(t)] = \begin{bmatrix} D & 0 \end{bmatrix}\begin{bmatrix} \hat{i}(t) \\ \hat{v}(t) \end{bmatrix} + \begin{bmatrix} 0 & 0 \end{bmatrix}\begin{bmatrix} \hat{v}_g(t) \\ 0 \end{bmatrix} + [I]\hat{d}(t)$$

注意，由于二极管正向压降建模为常数 $V_D$，此源中无交流变化，$\hat{v}_D(t)$ 为零。可照常构造等效于式 (7.142) 的电路模型。写成标量形式时，式 (7.142) 变为

$$\begin{aligned} L\frac{d\hat{i}(t)}{dt} &= D'\hat{v}(t) - DR_{on}\hat{i}(t) + D\hat{v}_g(t) + (V_g - V - IR_{on} + V_D)\hat{d}(t) \\ C\frac{d\hat{v}(t)}{dt} &= -D'\hat{i}(t) - \frac{\hat{v}(t)}{R} + I\hat{d}(t) \\ \hat{i}_g(t) &= D\hat{i}(t) + I\hat{d}(t) \end{aligned} \tag{7.143}$$

对应这些方程的电路列于图7.45。这些电路可合并为图7.46 的完整小信号交流等效电路模型。

![源页 p.276](../assets/page-snapshots/chapter-7/page-276.png)

图7.45 等效于小信号变换器方程的电路：(a) 电感回路；(b) 电容节点；(c) 输入端口

![源页 p.276](../assets/page-snapshots/chapter-7/page-276.png)

图7.46 非理想升降压变换器示例的完整小信号交流等效电路模型

### 7.5.5 示例：含 ESR 的升压变换器的状态空间平均

作为最后一个例子，让我们用状态空间平均法导出图7.47 非理想升压变换器的模型。此电路含一个电阻 $R_C$，建模电容等效串联电阻；虚线框内为含理想电容 $C$ 和 ESR $R_C$ 的电容模型。学生常在导出此电路的平均方程时遇到困难，状态空间平均法为正确导出平均模型提供了框架。除电容 ESR 外，我们将所有元件建模为理想。

![源页 p.277](../assets/page-snapshots/chapter-7/page-277.png)

图7.47 升压变换器电路，含电容等效串联电阻 $R_C$

![源页 p.277](../assets/page-snapshots/chapter-7/page-277.png)

图7.48 电容 ESR 使输出电压波形 $v(t)$ 不连续

如图7.48所示，电容 ESR 使输出电压 $v(t)$ 不连续。二极管导通时，电感电流使输出电压增大 $i_L(t)(R\,\|\,R_C)$，故电压在开关时刻呈现不连续。故须注意不要对输出电压 $v(t)$ 施加小纹波近似。另一方面，电容模型中理想电容部分的电压 $v_C(t)$ 是连续的且呈小纹波。

此电路的独立状态为电感电流 $i_L(t)$ 和电容电压 $v_C(t)$。注意 $v_C(t)$ 定义为电容模型中理想电容部分的电压。故状态向量 $\mathbf{x}(t)$ 定义为

$$\mathbf{x}(t) = \begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix} \tag{7.144}$$

输入电压 $v_g(t)$ 是应放入输入向量 $\mathbf{u}(t)$ 的独立电源。我们选择不建模其他独立电源。故定义输入向量为

$$\mathbf{u}(t) = [v_g(t)] \tag{7.145}$$

为建模变换器输入端口，需求变换器输入电流 $i_g(t)$。对升压变换器，输入电流 $i_g(t)$ 与电感电流 $i_L(t)$ 重合。由于 $i_L(t)$ 已在状态向量 $\mathbf{x}(t)$ 中，将 $i_g(t)$ 包含在输出向量中无额外信息。另一方面，为建模输出端口，须写输出电压 $v(t)$ 的方程。由于实际输出电压 $v(t)$ 不再与电容状态

![源页 p.278](../assets/page-snapshots/chapter-7/page-278.png)

图7.49 含 ESR 的升压变换器电路：(a) 子区间 1；(b) 子区间 2

$v_C(t)$ 重合，须写可求解平均输出电压的附加方程。故 $v(t)$ 必须包含在输出向量中。故选择定义 $\mathbf{y}(t)$ 为

$$\mathbf{y}(t) = [v(t)] \tag{7.146}$$

故此例中输出向量仅含因变量 $v(t)$。

接下来导出每个子区间的状态方程。第一子区间内，MOSFET 导通，变换器电路简化为图7.49a。可将电感电压和电容电流表示为

$$\begin{aligned} L\frac{di_L(t)}{dt} &= v_g(t) \\ C\frac{dv_C(t)}{dt} &= -\frac{v_C(t)}{R + R_C} \end{aligned} \tag{7.147}$$

注意我们已仔细将电容电流用电容电压 $v_C(t)$ 而非输出电压 $v(t)$ 表示。这是必要的，因为状态方程须写成独立向量 $\mathbf{x}(t)$ 和 $\mathbf{u}(t)$ 元素的函数，而非因变量向量 $\mathbf{y}(t)$ 的函数。

第一子区间内，输出量也可表示为 $\mathbf{x}(t)$ 和 $\mathbf{u}(t)$ 元素的函数，如下：

$$v(t) = v_C(t)\frac{R}{R + R_C} \tag{7.148}$$

再次，我们已仔细将 $v(t)$ 表示为电容状态 $v_C(t)$ 的函数。

接下来可将式 (7.147) 和 (7.148) 写成矩阵形式，结果为

$$\underbrace{\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}}_{\mathbf{K}} \frac{d}{dt}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} = \underbrace{\begin{bmatrix} 0 & 0 \\ 0 & -\dfrac{1}{R+R_C} \end{bmatrix}}_{\mathbf{A}_1}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 1 \\ 0 \end{bmatrix}}_{\mathbf{B}_1}\,[v_g(t)] \tag{7.149}$$

$$\underbrace{[v(t)]}_{\mathbf{y}(t)} = \underbrace{\begin{bmatrix} 0 & \dfrac{R}{R+R_C} \end{bmatrix}}_{\mathbf{C}_1}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{[0]}_{\mathbf{E}_1}\,[v_g(t)]$$

第二子区间内，MOSFET 关断，二极管导通，得图7.49b 电路。可将电感电压和电容电流表示为

$$\begin{aligned} L\frac{di_L(t)}{dt} &= v_g(t) - v(t) = v_g(t) - v_C(t)\frac{R}{R+R_C} - i_L(t)(R\,\|\,R_C) \\ C\frac{dv_C(t)}{dt} &= \frac{v(t) - v_C(t)}{R_C} = -\frac{v_C(t)}{R+R_C} + \frac{i_L(t)R}{R+R_C} \end{aligned} \tag{7.150}$$

上述方程中须消去输出电压 $v(t)$，因为状态方程须写成独立向量 $\mathbf{x}(t)$ 和 $\mathbf{u}(t)$ 元素的函数，而非因变量向量 $\mathbf{y}(t)$ 的函数。记号 $R\,\|\,R_C$ 表示 $R$ 和 $R_C$ 的并联组合。

此子区间内，输出也可表示为 $\mathbf{x}(t)$ 和 $\mathbf{u}(t)$ 元素的函数，如下：

$$v(t) = v_C(t)\frac{R}{R+R_C} + i_L(t)(R\,\|\,R_C) \tag{7.151}$$

再次，我们已仔细将 $v(t)$ 表示为电容状态 $v_C(t)$ 的函数。现在可汇集上述方程得第二子区间内电路的状态空间描述：

$$\underbrace{\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}}_{\mathbf{K}} \frac{d}{dt}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} = \underbrace{\begin{bmatrix} -(R\,\|\,R_C) & -\dfrac{R}{R+R_C} \\ \dfrac{R}{R+R_C} & -\dfrac{1}{R+R_C} \end{bmatrix}}_{\mathbf{A}_2}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{\begin{bmatrix} 1 \\ 0 \end{bmatrix}}_{\mathbf{B}_2}\,[v_g(t)] \tag{7.152}$$

$$\underbrace{[v(t)]}_{\mathbf{y}(t)} = \underbrace{\begin{bmatrix} R\,\|\,R_C & \dfrac{R}{R+R_C} \end{bmatrix}}_{\mathbf{C}_2}\underbrace{\begin{bmatrix} i_L(t) \\ v_C(t) \end{bmatrix}}_{\mathbf{x}(t)} + \underbrace{[0]}_{\mathbf{E}_2}\,[v_g(t)]$$

状态空间平均法预测变换器稳态模型为

$$\underbrace{\begin{bmatrix} 0 \\ 0 \end{bmatrix}}_{\mathbf{0} = D\mathbf{A}_1 + D'\mathbf{A}_2\,\mathbf{X} + D\mathbf{B}_1 + D'\mathbf{B}_2\,\mathbf{U}} = \begin{bmatrix} -D'(R\,\|\,R_C) & -D'\dfrac{R}{R+R_C} \\ D'\dfrac{R}{R+R_C} & -\dfrac{1}{R+R_C} \end{bmatrix}\begin{bmatrix} I_L \\ V_C \end{bmatrix} + \begin{bmatrix} 1 \\ 0 \end{bmatrix}[V_g] \tag{7.153}$$

$$\underbrace{[V]}_{\mathbf{Y} = D\mathbf{C}_1 + D'\mathbf{C}_2\,\mathbf{X} + D\mathbf{E}_1 + D'\mathbf{E}_2\,\mathbf{U}} = \begin{bmatrix} D'(R\,\|\,R_C) & \dfrac{R}{R+R_C} \end{bmatrix}\begin{bmatrix} I_L \\ V_C \end{bmatrix} + [0][V_g]$$

让我们构造对应上述方程的稳态等效电路。变换器输出端是输出电压 $V$ 而非电容电压 $V_C$。故先用输出方程消去 $V_C$，将上述方程用输出电压 $V$ 表示更有帮助。得如下方程：

$$0 = V_g - D'V - DD'I_L(R\,\|\,R_C) \tag{7.154a}$$

$$0 = D'I_L - \frac{V}{R} \tag{7.154b}$$

$$V = V_C\frac{R}{R+R_C} + D'I_L(R\,\|\,R_C) \tag{7.154c}$$

式 (7.154a) 可识别为由电感伏秒平衡得到的电压回路方程。此回路的电流为直流电感电流 $I_L$。构造对应此方程的等效电路得图7.50a 网络。类似地，式 (7.154b) 是电压为 $V$ 的输出节点方程。对应此方程的等效电路如图7.50b所示。式 (7.154c) 描述电容 $C$ 及其电压 $V_C$ 如何连接到输出节点。我们可能预期理想电容元件 $C$ 通过 ESR $R_C$ 连接到输出节点，如原始变换器电路图7.47中那样。确实如此：图7.50c 是对应式 (7.154c) 的电路，电容电压 $V_C$ 通过电阻 $R_C$ 连接到输出节点电压 $V$。电阻 $R$ 和 $R_C$ 构成分压器，分压比为 $R/(R+R_C)$，如式 (7.154c) 所示。方程第二项说明电流 $D'I_L$ 如何通过分压器的戴维南等效输出电阻 $R\,\|\,R_C$ 升高输出电压。

![源页 p.280](../assets/page-snapshots/chapter-7/page-280.png)

图7.50 构造含电容等效串联电阻的升压变换器稳态等效电路的步骤：(a) 电感回路；(b) 输出节点；(c) 电容到输出节点的连接

图7.50 的电路可合并为图7.51 所示的完整稳态等效电路。可见稳态电压 $V$ 和 $V_C$ 相等。此外，电容 ESR 导致一个附加有效串联电阻 $DD'(R\,\|\,R_C)$。此电阻建模 ESR 中由交流电容电流引起的损耗及其对变换器效率的影响。

![源页 p.281](../assets/page-snapshots/chapter-7/page-281.png)

图7.51 升压变换器的稳态模型，含电容等效串联电阻 $R_C$ 的影响

小信号交流状态空间平均模型由式 (7.110) 求得，结果为

$$\begin{bmatrix} L & 0 \\ 0 & C \end{bmatrix}\frac{d}{dt}\begin{bmatrix} \hat{i}_L(t) \\ \hat{v}_C(t) \end{bmatrix} = \begin{bmatrix} -D'(R\,\|\,R_C) & -D'\dfrac{R}{R+R_C} \\ D'\dfrac{R}{R+R_C} & -\dfrac{1}{R+R_C} \end{bmatrix}\begin{bmatrix} \hat{i}_L(t) \\ \hat{v}_C(t) \end{bmatrix} + \begin{bmatrix} 1 \\ 0 \end{bmatrix}[\hat{v}_g(t)] \tag{7.155}$$

$$+ \begin{bmatrix} I_L(R\,\|\,R_C) + \dfrac{V_C R}{R+R_C} \\ -\dfrac{I_L R}{R+R_C} \end{bmatrix}\hat{d}(t) \tag{7.156}$$

$$[\hat{v}(t)] = \begin{bmatrix} D'(R\,\|\,R_C) & \dfrac{R}{R+R_C} \end{bmatrix}\begin{bmatrix} \hat{i}_L(t) \\ \hat{v}_C(t) \end{bmatrix} + [-I_L(R\,\|\,R_C)]\hat{d}(t) \tag{7.157}$$

为构造小信号交流电路模型，将方程用变换器输出电压 $\hat{v}$ 而非电容电压 $\hat{v}_C$ 表示更有帮助。这通过用输出方程从状态方程右边消去 $\hat{v}_C$ 完成。经代数运算后得

$$L\frac{d\hat{i}_L}{dt} = \hat{v}_g - D'\hat{v} - DD'(R\,\|\,R_C)\hat{i}_L + \bigl((D-D')(R\,\|\,R_C)I_L + V\bigr)\hat{d} \tag{7.158a}$$

$$C\frac{d\hat{v}_C}{dt} = D'\hat{i}_L - \frac{\hat{v}}{R} - I_L\hat{d} \tag{7.158b}$$

$$\hat{v} = \hat{v}_C\frac{R}{R+R_C} + (D'\hat{i}_L - I_L\hat{d})(R\,\|\,R_C) \tag{7.158c}$$

式 (7.158a) 可识别为描述含电感回路上小信号交流电压分量的电压回路方程。此回路的电流为交流电感电流 $\hat{i}_L$。构造对应此方程的等效电路

![源页 p.282](../assets/page-snapshots/chapter-7/page-282.png)

图7.52 构造含电容等效串联电阻的升压变换器小信号交流等效电路的步骤：(a) 电感回路；(b) 输出节点；(c) 电容到输出节点的连接；(d) 输出节点与电容的复合电路

![源页 p.282](../assets/page-snapshots/chapter-7/page-282.png)

图7.53 升压变换器的完整小信号交流模型，含电容等效串联电阻 $R_C$ 的影响

得图7.52a 网络。类似地，式 (7.158b) 是电压为 $\hat{v}$ 的输出节点方程。对应此方程的等效电路如图7.52b所示。虽然电容电流 $C\,d\hat{v}_C/dt$ 从此节点流出，但式 (7.158b) 未描述电容是否通过电容 ESR 连接，故此时我们将电容支路留为未知元件。

式 (7.158c) 描述电容 $C$ 及其电压 $\hat{v}_C$ 如何连接到输出节点。与稳态模型一样，我们预期理想电容元件 $C$ 通过 ESR $R_C$ 连接到输出节点。确实如此：图7.52c 是对应式 (7.158c) 的电路，电容电压 $\hat{v}_C$ 通过电阻 $R_C$ 连接到输出节点电压 $\hat{v}$。电阻 $R$ 和 $R_C$ 再次构成

![源页 p.283](../assets/page-snapshots/chapter-7/page-283.png)

分压器，分压比为 $R/(R+R_C)$，如式 (7.158c) 所示。方程第二项说明总电流 $(D'\hat{i}_L + I_L\hat{d})$（来自变压器副侧加 $\hat{d}$ 电流源）如何通过分压器的戴维南等效输出电阻 $R\,\|\,R_C$ 升高输出电压。图7.52b、c 的电路可合并为图7.52d 所示单一电路。

图7.52a、d 的电路现可合并，并用有效变压器替代受控源，如图7.53所示。在此小信号交流模型中，电压 $\hat{v}$ 和 $\hat{v}_C$ 可不同，电容 ESR 导致无 ESR 变换器中不存在的新的传递函数动态。

## 7.6 关键要点小结

1. 第2、3章的 CCM 变换器分析技巧可扩展以预测变换器交流行为。关键步骤是在一个开关周期上平均变换器波形。这去除开关谐波，从而直接暴露所需的波形直流和低频交流分量。特别地，通常需求平均电感电压、电容电流和变换器输入电流的表达式。

2. 由于开关变换器是非线性系统，希望构造小信号线性化模型。这通过在静态工作点附近扰动和线性化平均模型完成。

3. 可用第3章构造直流等效电路相同的步骤构造交流等效电路。如需要，交流等效电路可精细化以计入变换器损耗和其他非理想性的影响。

4. 常规脉宽调制器电路有线性增益，取决于锯齿波形的斜率，或等价地取决于其峰-峰幅度。脉宽调制器还向系统引入采样。

5. 规范电路描述所有连续导通模式下工作的直流-直流脉宽调制变换器共有的基本性质。模型的核心是第3章引入的 1:M(D) 理想变压器（表示基本直流-直流变换功能），此处推广以包含交流变化。变换器储能元件在网络中引入有效低通滤波器。模型还含表示占空比变化影响的独立源。若干基本变换器规范模型的参数值列表以供参考。

6. 7.5 节的状态空间平均法本质上与 7.2 节的基本方法相同，只是使用了状态空间网络描述的形式。一般结果列于 7.5.2 节。状态空间平均是一种形式化方法，表明只要能写出每个子区间的状态方程，总能导出小信号平均模型。

## 习题

**7.1** 一个理想升压变换器工作于连续导通模式。

(a) 确定此变换器的非线性平均方程。

(b) 现构造小信号交流模型。令

$$\langle v_g(t)\rangle_{T_s} = V_g + \hat{v}_g(t), \quad d(t) = D + \hat{d}(t), \quad \langle i(t)\rangle_{T_s} = I + \hat{i}(t), \quad \langle v(t)\rangle_{T_s} = V + \hat{v}(t)$$

其中 $V_g$、$D$、$I$ 和 $V$ 为稳态直流值；$\hat{v}_g(t)$ 和 $\hat{d}(t)$ 为功率和控制输入的小交流变化；$\hat{i}(t)$ 和 $\hat{v}(t)$ 为电感电流和输出电压的所得小交流变化。证明得到如下模型：

大信号直流分量

$$0 = -D'V + V_g, \quad 0 = D'I - \frac{V}{R}$$

小信号交流分量

$$L\frac{d\hat{i}(t)}{dt} = -D'\hat{v}(t) + V\hat{d}(t) + \hat{v}_g(t), \quad C\frac{d\hat{v}(t)}{dt} = D'\hat{i}(t) - I\hat{d}(t) - \frac{\hat{v}(t)}{R}$$

**7.2** 构造对应习题7.1(b) 升压变换器小信号交流方程的等效电路。

**7.3** 将习题7.2 的升压变换器等效电路整理为规范形式。解释推导中的每一步。验证规范模型中的元件与表7.1 一致。

**7.4** 图2.32 的理想电流馈电桥变换器工作于连续导通模式。

(a) 确定此变换器的非线性平均方程。

(b) 扰动和线性化，确定小信号交流方程。

(c) 构造此变换器的小信号交流等效电路模型。

**7.5** 为图7.19所示工作于连续导通模式的反激变换器构造完整的小信号交流等效电路模型。变压器含归算到一次侧的磁化电感 $L$。此外，变压器呈现显著铁损，可用与一次绕组并联的电阻 $R_C$ 建模。所有其他元件为理想。可用任何有效方法求解此题。模型应正确预测 $i_g(t)$ 的变化。

**7.6** Ćuk 变换器建模。可用任何有效方法求解此题。

(a) 导出建模理想 Ćuk 变换器的小信号动态方程。

(b) 为 Ćuk 变换器构造完整的小信号等效电路模型。

![源页 p.285](../assets/page-snapshots/chapter-7/page-285.png)

图7.54 反相 SEPIC，习题7.7

**7.7** 反相 SEPIC 建模。可用任何有效方法求解此题。

(a) 导出建模图7.54所示变换器的小信号动态方程。

(b) 为反相 SEPIC 构造完整的小信号等效电路模型。

![源页 p.285](../assets/page-snapshots/chapter-7/page-285.png)

图7.55 非理想降压变换器，习题7.8

**7.8** 考虑图7.55 的非理想降压变换器。输入电压源 $v_g(t)$ 有内阻 $R_g$。其他元件非理想性可忽略。

(a) 用状态空间平均法确定描述由晶体管占空比 $d$ 和输入电压 $v_g$ 变化引起的 $i$、$v$ 和 $i_g$ 变化的小信号交流方程。

(b) 构造对应 (a) 方程的交流等效电路模型。

(c) 求解模型以确定小信号控制-输出传递函数的表达式。

**7.9** 从式 (7.19) 出发，导出式 (7.20) 和 (7.22)。展示推导中的所有步骤。

**7.10** 一个反激变换器工作于连续导通模式。MOSFET 开关有导通电阻 $R_{on}$，副侧二极管有恒定正向压降 $V_D$。反激变压器有一次绕组电阻 $R_p$ 和二次绕组电阻 $R_s$。

(a) 导出此变换器的小信号交流方程。

(b) 导出在连续导通模式下有效且正确建模上述损耗及变换器输入和输出端口的完整小信号交流等效电路模型。

**7.11** 图7.56a 的双输出反激变换器工作于连续导通模式。可假定变换器无损。

![源页 p.286](../assets/page-snapshots/chapter-7/page-286.png)

图7.56 双输出反激变换器，习题7.11：(a) 变换器电路；(b) 小信号交流等效电路

(a) 为此变换器导出小信号交流等效电路。

(b) 证明此双输出变换器的小信号交流等效电路可写成图7.56b 的广义规范形式。给出发生器 $e(s)$ 和 $j(s)$ 的解析表达式。

**7.12** 构造一个脉宽调制器电路，其中锯齿波发生器由三角波发生器替代，如图7.57a所示。三角波形如图7.57b所示。

![源页 p.286](../assets/page-snapshots/chapter-7/page-286.png)

图7.57 习题7.12

(a) 确定变换器开关频率，以 Hz 为单位。

(b) 确定此电路的增益 $d(t)/v_c(t)$。

(c) $v_c$ 在何范围内 (b) 的答案有效？
