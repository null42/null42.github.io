---
date: 2026-06-06
section: 电机控制
chapter: controllers-evolution
chapterTitle: 控制器演进
chapterOrder: 50
category: 控制器演进
source: motor
visibility: public
title: "CE-03: 零极点与微分方程"
tags:
  - motor-control
status: learning
summary: "**副标题：从传递函数回到ODE——理解极点、零点与系统动态的根源** **难度：** ★★★☆☆ 中等 **适用对象：** 控制理论学习者、电机控制工程师 **前置知识：** 无"
navGroup: 工程与生态
navGroupOrder: 50
---

# CE-03: 零极点与微分方程

**副标题：从传递函数回到ODE——理解极点、零点与系统动态的根源**
**难度：** ★★★☆☆ 中等
**适用对象：** 控制理论学习者、电机控制工程师
**前置知识：** 无

---

## 1. 📌 核心摘要

传递函数并非独立于微分方程而存在——它只是常系数线性ODE（Ordinary Differential Equation，常微分方程）的简写。极点（Pole）决定了齐次解中的模态（Mode）——每个极点对应一个指数衰减或振荡分量；零点（Zero）决定了输入如何激励这些模态——它影响部分分式展开中的留数（Residue）。PID控制的本质，就是通过修改闭环ODE的系数来改变极点位置和模态权重。理解了ODE，你就理解了PID Explorer中所有滑块背后的物理真相。

**认知挂钩：** 极点决定"系统能做什么"，零点决定"输入能让系统做什么"——两者共同决定你在阶跃响应曲线上看到的一切。

---

## 1. 每个传递函数都是微分方程的伪装

传递函数不是另一种东西。它是常系数线性ODE的简写。

取一个被控对象（Plant）：

$$G(s) = \frac{Y(s)}{U(s)} = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

交叉相乘：

$$(s^2 + 2\zeta\omega_n s + \omega_n^2) Y(s) = \omega_n^2 U(s)$$

算子 $s$ 是拉普拉斯域中对微分算子 $d/dt$ 的别名。因此 $sY(s)$ ↔ $\dot{y}(t)$，$s^2Y(s)$ ↔ $\ddot{y}(t)$。逆拉普拉斯变换得到ODE：

$$\boxed{\ddot{y}(t) + 2\zeta\omega_n\,\dot{y}(t) + \omega_n^2\,y(t) = \omega_n^2\,u(t)}$$

这就是**支配方程**。PID Explorer展示给你的一切——每个阶跃响应、每个超调、每个振荡——都是这个ODE（或其闭环扩展）的解。

**$G(s)$ 的分母是ODE的左端，分子是对输入施加的微分算子。**

---

## 2. 极点 = 齐次解

### 2.1 特征方程

将输入置零（$u(t) = 0$），剩余的是**齐次方程**：

$$\ddot{y}(t) + 2\zeta\omega_n\,\dot{y}(t) + \omega_n^2\,y(t) = 0$$

假设解的形式为 $y(t) = e^{\lambda t}$，代入：

$$\lambda^2 e^{\lambda t} + 2\zeta\omega_n\,\lambda e^{\lambda t} + \omega_n^2 e^{\lambda t} = 0$$

提取 $e^{\lambda t}$（它永不为零）：

$$\boxed{\lambda^2 + 2\zeta\omega_n\lambda + \omega_n^2 = 0}$$

这就是**特征方程（Characteristic Equation）**。它的根就是 $G(s)$ 的**极点**，恰好是使分母为零的 $s$ 值。

### 2.2 每个极点的含义

根为：

$$\lambda_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$$

根据 $\zeta$ 的不同，出现三种情况：

| $\zeta$ | 极点 | 齐次解 $y_h(t)$ | 行为 |
|---|---|---|---|
| $\zeta > 1$ | 两个实根：$-\sigma_1, -\sigma_2$ | $A e^{-\sigma_1 t} + B e^{-\sigma_2 t}$ | 两个衰减指数之和——无振荡 |
| $\zeta = 1$ | 重根：$-\sigma$ | $(A + Bt)e^{-\sigma t}$ | 最快的非振荡回归平衡 |
| $\zeta < 1$ | 复根：$-\sigma \pm j\omega_d$ | $e^{-\sigma t}\big(A\cos\omega_d t + B\sin\omega_d t\big)$ | 衰减振荡 |

其中 $\sigma = \zeta\omega_n$，$\omega_d = \omega_n\sqrt{1-\zeta^2}$。

**这是核心洞察**：实部 $\sigma$ 控制衰减*包络*，虚部 $\omega_d$ 控制振荡*频率*。复平面上的每个极点对应 $y_h(t)$ 中的一个特定项：

- **极点在 $−\sigma$**：贡献 $e^{-\sigma t}$
- **极点在 $−\sigma \pm j\omega_d$**：贡献 $e^{-\sigma t}\sin(\omega_d t + \phi)$
- **极点在 $+ \sigma$**（右半平面 RHP）：贡献 $e^{+\sigma t}$——无界增长——**不稳定**
- **极点在 $0 \pm j\omega$**：贡献 $\sin(\omega t)$——无阻尼振荡——**临界稳定**

当你拖动 $K_p$ 滑块观察闭环极点沿垂直方向移动（减小 $\zeta_{\text{eff}}$）时，你**并没有**改变衰减速率 $\sigma$。实部 $-\zeta\omega_n$ 是固定的——$K_p$ 只进入平方根下的判别式（见第5节）。改变的是虚部 $\omega_d$，它随 $K_p$ 增大。这使得 $\zeta_{\text{eff}} = \sigma / \sqrt{\sigma^2 + \omega_d^2}$ 下降，振荡更明显，但指数衰减包络 $e^{-\sigma t}$ 完全不变。

### 2.3 完整的齐次解

对于具有极点 $\lambda_1, \ldots, \lambda_n$（假设互异）的 $n$ 阶系统：

$$y_h(t) = C_1 e^{\lambda_1 t} + C_2 e^{\lambda_2 t} + \cdots + C_n e^{\lambda_n t}$$

每个极点贡献一个**模态（Mode）**。系数 $C_i$ 由初始条件决定。你在阶跃响应图上看到的响应是这些模态之和加上强迫响应。

---

## 3. 零点 = 输入如何耦合到每个模态

### 3.1 零点对系数的影响

极点决定*存在哪些模态*。零点决定*每个模态被输入激励的强度*。

考虑一个在 $s = -z$ 处有零点的系统：

$$G(s) = \frac{s + z}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

对应的ODE为：

$$\ddot{y} + 2\zeta\omega_n\dot{y} + \omega_n^2 y = \dot{u} + z\,u$$

右端现在涉及输入的**导数**。对于阶跃输入（$u(t)=1$，$t > 0$ 时 $\dot{u}(t)=0$），强迫项简化为 $z \cdot 1 = z$。ODE变为：

$$\ddot{y} + 2\zeta\omega_n\dot{y} + \omega_n^2 y = z$$

求**特解（Particular Solution）**（强迫稳态响应），假设常数 $y_p$：则 $\dot{y}_p = 0$，$\ddot{y}_p = 0$。代入：

$$0 + 0 + \omega_n^2 y_p = z \quad\Longrightarrow\quad y_p = \frac{z}{\omega_n^2}$$

等价地，从传递函数：$G(0) = \frac{0 + z}{0^2 + 2\zeta\omega_n\cdot 0 + \omega_n^2} = \frac{z}{\omega_n^2}$，这就是从 $u$ 到 $y$ 的**直流增益（DC Gain）**。特解等于直流增益乘以阶跃幅值。

但关键在于零点如何影响**留数（Residues）**——每个模态前面的系数。对 $Y(s) = G(s)/s$ 做部分分式展开：

$$\frac{s+z}{s(s^2 + 2\zeta\omega_n s + \omega_n^2)} = \frac{A}{s} + \frac{B}{s - \lambda_1} + \frac{C}{s - \lambda_2}$$

零点 $−z$ 出现在 $B$ 和 $C$ 的分子中。它可以：

- **减小**邻近极点的留数（当 $z \to \lambda_i$ 时趋近零极点对消）
- **翻转**留数的符号（导致逆响应——对于右半平面零点，输出最初朝*错误*方向运动）
- **放大**远离极点的留数

### 3.2 物理直觉

将ODE视为 $\mathcal{L}[y] = \mathcal{R}[u]$，其中 $\mathcal{L}$ 是分母的微分算子（极点），$\mathcal{R}$ 是分子的微分算子（零点）。

- $\mathcal{L}$ 描述**系统如何存储和耗散能量**——惯性、摩擦、弹簧。它定义了自然模态。
- $\mathcal{R}$ 描述**输入及其导数的哪些组合真正推动系统**。零点在 $−z$ 意味着系统对输入中的模态 $e^{-zt}$ "视而不见"。

**基本关系**：

$$\text{阶跃响应} = \underbrace{\sum_i C_i e^{\lambda_i t}}_{\text{极点产生的模态}} + \underbrace{y_{ss}}_{\text{直流增益}}$$

极点 $\lambda_i$ 决定*指数*，零点决定*系数 $C_i$*。两者共同决定*你在图上看到的内容*。

### 3.3 为什么微分作用能加速响应

在PID Explorer中，添加 $K_d$ 引入控制器零点。闭环传递函数变为：

$$T(s) = \frac{(K_d s^2 + K_p s + K_i)\,\omega_n^2}{s^3 + (2\zeta\omega_n + K_d\omega_n^2)s^2 + \omega_n^2(1+K_p)s + K_i\omega_n^2}$$

看分子：项 $K_d s^2 + K_p s + K_i$ 意味着ODE的右端为：

$$K_d\,\ddot{u} + K_p\,\dot{u} + K_i\,u$$

对于参考 $r(t)$ 的阶跃，导数项 $\dot{r}$ 和 $\ddot{r}$ 在 $t=0$ 产生冲激。这些冲激在初始瞬间*猛击*系统，然后消失。结果是：系统更快到达目标（极点没有太大变化，但模态上的系数将能量转移到了衰减更快的分量上）。

---

## 4. 闭环ODE——PID到底做了什么

开环被控对象ODE为：

$$\ddot{y} + 2\zeta\omega_n\dot{y} + \omega_n^2 y = \omega_n^2 u$$

PID控制器（D项采用微分-on-output）为：

$$u = K_p(r - y) - K_d\,\dot{y} + K_i\!\int_0^t \!(r - y)\,d\tau$$

将 $u$ 代入被控对象ODE。令 $e = r - y$，定义 $e_I = \int e\,dt$：

$$\ddot{y} + 2\zeta\omega_n\dot{y} + \omega_n^2 y = \omega_n^2\big[K_p e - K_d\dot{y} + K_i e_I\big]$$

由于 $y = r - e$，有 $\dot{y} = \dot{r} - \dot{e}$，$\ddot{y} = \ddot{r} - \ddot{e}$。对于阶跃参考，$t > 0$ 时 $\dot{r} = \ddot{r} = 0$，所以 $\dot{y} = -\dot{e}$，$\ddot{y} = -\ddot{e}$。注意 $\dot{e}_I = e$。以误差表示的闭环ODE为：

$$\boxed{\ddot{y} + \big(2\zeta\omega_n + K_d\omega_n^2\big)\dot{y} + \omega_n^2(1+K_p)y = \omega_n^2\big[K_p r + K_i e_I\big]}$$

这是一个**三阶**ODE（对积分器微分后）。闭环系统的每个极点都是特征方程的根：

$$\lambda^3 + (2\zeta\omega_n + K_d\omega_n^2)\lambda^2 + \omega_n^2(1+K_p)\lambda + K_i\omega_n^2 = 0$$

与二阶被控对象ODE不同——其中每个系数直接映射到物理效应（$\dot{y}$ 系数设定衰减率，$y$ 系数设定恢复力）——这个三次方程有**三个**根，而非两个。三阶系统没有单一的"阻尼比"或"自然频率"。这些概念只适用于根中的一对共轭复根。

建立直觉最清晰的方法是先退化到二阶，再把第三个根加回来。

**PD控制（$K_i = 0$）：回到二阶**

常数项消失，因此 $\lambda = 0$ 是一个根。提取它：

$$\lambda\big[\lambda^2 + (2\zeta\omega_n + K_d\omega_n^2)\lambda + \omega_n^2(1+K_p)\big] = 0$$

$\lambda=0$ 的根意味着误差动态可以维持一个常数偏移（被控对象本身没有积分器）。括号内是一个干净的二阶系统，其有效参数为：

$$\omega_{\text{eff}} = \omega_n\sqrt{1+K_p}, \qquad \zeta_{\text{eff}} = \frac{2\zeta\omega_n + K_d\omega_n^2}{2\omega_n\sqrt{1+K_p}}$$

现在增益到物理行为的映射是透明的：

- **$K_p$** 增大 $\omega_{\text{eff}}$——它使系统变刚，缩短上升时间。但由于 $K_p$ 也出现在 $\zeta_{\text{eff}}$ 的*分母*中，增大 $K_p$ 会降低有效阻尼比，除非同时增大 $K_d$。这就是高增益P控制产生振荡的原因。
- **$K_d$** 只出现在 $\zeta_{\text{eff}}$ 的分子中——它添加纯阻尼而不影响自然频率。这就是微分作用能在不减慢响应的情况下消除超调的原因。

**完整PID（$K_i > 0$）：加入第三个根**

当 $K_i > 0$ 时，常数项非零，系统是真正的三阶。三个根通常是**一个实极点 + 一对共轭复根**。没有单一的 $\zeta_{\text{eff}}$ 公式能刻画整个系统，但定性效果延续：

- **$K_p$** 仍然主要控制共轭复根对的振荡频率（通过 $\lambda^1$ 系数）。
- **$K_d$** 仍然主要添加阻尼，将共轭复根对和实极点都向左拉（通过 $\lambda^2$ 系数）。
- **$K_i$** 控制实极点。小 $K_i$ 使其靠近原点（稳态误差缓慢消除）。中等 $K_i$ 将其向左推（更快消除）。过大的 $K_i$ 将其拉回右侧并可能破坏稳定性——经典的积分饱和不稳定。

**主导极点图景**

在大多数调良好的PID回路中，实极点相当快（以 $e^{-10t}$ 或更快的速率衰减），共轭复根对主导可见的阶跃响应——振荡频率、超调、上升时间。这就是为什么PD情况下的二阶直觉通常可以延伸到完整PID：你观察的是共轭复根对。实极点主要影响误差趋近零时的长稳定尾部。

---

## 5. 从ODE视角解读根轨迹

**根轨迹（Root Locus）** 回答：当一个参数（通常是 $K_p$）从0变到∞时，闭环特征方程的根如何移动？

数学上，这只是追踪以下方程的解：

$$\lambda^n + a_{n-1}\lambda^{n-1} + \cdots + a_1\lambda + a_0 = 0$$

当某个 $a_i$ 随增益变化时。

当你在PID Explorer中拖动 $K_p$（$K_i = 0$）时，你观察的是以下方程的根：

$$\lambda^3 + (2\zeta\omega_n + K_d\omega_n^2)\lambda^2 + \omega_n^2(1+K_p)\lambda = 0$$

提取 $\lambda$（当 $K_i = 0$ 时积分极点被控制器零点对消）：

$$\lambda^2 + (2\zeta\omega_n + K_d\omega_n^2)\lambda + \omega_n^2(1+K_p) = 0$$

这是一个**二次方程**。其根为：

$$\lambda_{1,2} = -\frac{\zeta\omega_n + \tfrac{1}{2}K_d\omega_n^2}{1} \pm \sqrt{\big(\zeta\omega_n + \tfrac{1}{2}K_d\omega_n^2\big)^2 - \omega_n^2(1+K_p)}$$

- 实部：$-\sigma = -(\zeta\omega_n + \frac{1}{2}K_d\omega_n^2)$——在此PD情况下**与 $K_p$ 无关**。阻尼由 $K_d$ 和自然阻尼决定。
- 判别式：$D = \sigma^2 - \omega_n^2(1+K_p)$。随着 $K_p$ 增大，$D$ 变得更负→根变为复数→振荡出现。

**这就是**你在仿真器中看到的数学原因：在没有 $K_d$ 的情况下增大 $K_p$，将极点沿恒定实部的直线拉向虚轴（在纯PD情况下），降低 $\zeta_{\text{eff}}$ 直到系统振荡。

---

## 6. 零极点对消

### 6.1 为什么要对消极点？

开环传递函数中的每个极点都贡献**相位滞后（Phase Lag）**。极点 $s = -p$ 的相移为：

$$\angle G(j\omega) = -\arctan\left(\frac{\omega}{p}\right)$$

在极点频率（$\omega = p$）处为 −45°。随着频率增大，趋近 −90°。多个极点叠加——两个极点意味着高频时 −180° 的相位滞后。一旦环路总相位滞后在增益穿越频率处达到 −180°，相位裕度（Phase Margin）为零，系统振荡。

**慢极点**（小的 $p$）尤其有害：它在低频段就开始贡献相位滞后，恰好是你需要控制带宽的地方。为了维持稳定性，你被迫保持低增益——这限制了速度和扰动抑制。

在 $s = -z$ 处放置控制器零点注入相位**超前（Phase Lead）**：

$$\angle (j\omega + z) = +\arctan\left(\frac{\omega}{z}\right)$$

如果 $z = p$，零点的正相位在每个频率上都对消极点的负相位。Bode图看起来就像那个极点从未存在过——被极点消耗的相位裕度被恢复了，环路增益可以提高。

这就是零极点对消的目的：不是装饰性简化，而是**恢复相位裕度**，使控制器可以在不失稳的前提下更激进。

### 6.2 对消的力学机制

当控制器零点精确匹配被控对象极点时，闭环传递函数部分分式展开中该极点的留数消失。模态 $e^{-pt}$ 在数学上仍然存在，但输入无法激励它——其系数为零。

在ODE中，该模态以等大反号的系数同时出现在齐次解和强迫解中。它们对消。系统响应就像那个极点不存在一样。

这就是为什么PID调参常将控制器零点放在慢的被控对象极点附近：为了"擦除"吞噬相位裕度并限制性能的迟缓模态。

### 6.3 陷阱

精确对消需要精确知道极点位置。实际上，参数不确定性意味着零点永远不会完美落在极点上。结果是一个**偶极子（Dipole）**——一个极点和一个零点靠近但不重合。偶极子留下一个小的残余模态：阶跃响应中一个长而慢的尾部。

对消也只对**稳定极点**（左半平面 LHP）安全。右半平面极点不能用右半平面零点对消——任何失配都会留下一个无界增长的不稳定模态。

实际上，部分对消通常就够了。将零点放在慢极点稍偏左的位置，将其留数减小到迟缓模态在阶跃响应中不再可见的程度，而不需要精确匹配。

---

## 7. 总结：ODE是基本真相

| 概念 | 传递函数视角 | ODE视角 |
|---|---|---|
| 极点在 $-\sigma$ | $1/(s+\sigma)$ | $y_h(t)$ 中的模态 $e^{-\sigma t}$ |
| 极点在 $-\sigma \pm j\omega$ | $1/(s^2 + 2\sigma s + \sigma^2+\omega^2)$ | $y_h(t)$ 中的模态 $e^{-\sigma t}\sin(\omega t + \phi)$ |
| 右半平面极点（$\sigma > 0$） | 具有正实部的分母根 | 无界增长的模态 $e^{+\sigma t}$ |
| 零点在 $-z$ | 分子中的 $s+z$ | 右端的 $\dot{u} + zu$——修改输入如何激励每个模态 |
| 右半平面零点 | $z>0$ 的 $s - z$ | 导致逆响应——留数符号翻转，输出最初朝错误方向运动 |
| $K_p$ 增大 | 提高共轭复极点的振荡频率（更高的 $\omega_d$） | 增大 $\lambda^1$ 系数——提高 $\omega_{\text{eff}}$ 但降低 $\zeta_{\text{eff}}$（除非 $K_d$ 补偿） |
| $K_d$ 增大 | 将极点左移 | 增大ODE中的 $\dot{y}$ 系数——纯能量耗散 |
| $K_i > 0$ | 在原点添加极点，添加控制器零点 | 添加 $\int e\,dt$ 项——保证 $e \to 0$，系统阶次增加1 |

每次你在PID Explorer中移动滑块，你都在修改微分方程的系数。极零点图上的极点和零点只是可视化该方程解的一种紧凑方式。阶跃响应是同一方程的数值解。**ODE是系统真正遵循的规律。**
