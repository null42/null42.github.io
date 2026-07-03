---
date: 2026-06-06
section: 电机控制
chapter: controllers-evolution
chapterTitle: 控制器演进
chapterOrder: 50
category: 控制器演进
source: motor
visibility: public
title: "CE-13: CARE vs DARE——连续与离散Riccati方程"
tags:
  - motor-control
status: learning
summary: "**副标题：两个代数Riccati方程，同一个思想——为什么形式不同、何时用哪个、它们如何联系** **难度：** ★★★★☆ **适用对象：** 控制理论学习者、电机控制工程师 **前置知识：** CE-12（从Bellman原理到Riccati方程）"
navGroup: 工程与生态
navGroupOrder: 50
---

# CE-13: CARE vs DARE——连续与离散Riccati方程

**副标题：两个代数Riccati方程，同一个思想——为什么形式不同、何时用哪个、它们如何联系**
**难度：** ★★★★☆
**适用对象：** 控制理论学习者、电机控制工程师
**前置知识：** CE-12（从Bellman原理到Riccati方程）

---

## 1. 📌 核心摘要

CARE（Continuous-time Algebraic Riccati Equation）和DARE（Discrete-time Algebraic Riccati Equation）分别是连续时间和离散时间LQR问题的稳态解。它们形式不同——CARE包含 $A^T P + PA$ 项，DARE包含 $A^T PA$ 项——根本原因在于"下一状态"在两个时间域中的工作方式不同：离散时间做一步预测，连续时间关注瞬时变化率。本文并排对比两者，解释形式差异的来源，展示DARE在 $\Delta t \to 0$ 极限下如何退化为CARE，并给出实践中的选择指南：工程实现用DARE，学术分析和教学用CARE。

**认知挂钩：** DARE的增益公式里有 $A$，CARE的增益公式里没有——这不是疏忽，而是离散时间"预测下一步"与连续时间"瞬时对抗漂移"的本质区别。

---

## 2. 它们是什么

两者都是线性二次调节器（Linear Quadratic Regulator, LQR）问题的稳态解。唯一的区别是时间域。

| | 离散时间 | 连续时间 |
|---|---|---|
| **方程** | **DARE** | **CARE** |
| **代价** | $J = \sum x_k^T Q x_k + u_k^T R u_k$ | $J = \int (x^T Q x + u^T R u)\, dt$ |
| **动力学** | $x_{k+1} = A x_k + B u_k$ | $\dot{x} = A x + B u$ |

Riccati方程是你将Bellman最优性原理逆推到稳态、假设二次值函数 $V(x) = x^T P x$ 时得到的。时间域决定了代数形式。

---

## 3. 并排对比

**DARE**（离散时间代数Riccati方程）：

$$P = A^T P A - A^T P B (R + B^T P B)^{-1} B^T P A + Q$$

$$K = (R + B^T P B)^{-1} B^T P A$$

**CARE**（连续时间代数Riccati方程）：

$$A^T P + P A - P B R^{-1} B^T P + Q = 0$$

$$K = R^{-1} B^T P$$

---

## 4. 为什么形式不同

差异直接追溯到"下一状态"在每个时间域中的工作方式。

### 离散：预测一步

离散时间的Bellman方程为：

$$V_k(x) = \min_u \Big[ x^T Q x + u^T R u + V_{k+1}(Ax + Bu) \Big]$$

下一状态 $x_{k+1} = Ax + Bu$ 被 $V_{k+1}$ 包裹，产生 $A^T P A$——状态先经过 $A$ 转移**然后**才撞上代价矩阵 $P$。控制代价分母中出现 $B^T P B$ 项，因为控制影响下一状态，而下一状态再通过 $P$ 产生代价。

### 连续：瞬时变化率

在连续时间中，你取 $\Delta t \to 0$ 的极限。值函数满足微分方程：

$$-\dot{P} = A^T P + P A - P B R^{-1} B^T P + Q$$

当 $t \to \infty$，$\dot{P} \to 0$，留下 $A^T P + PA$。$PA$ 项来自对 $x^T P x$ 求导——它是瞬时变化率，不是一步预测。没有 $A^T PA$，因为连续时间没有"一步预测"——动力学 $\dot{x} = Ax + Bu$ 是瞬时的。

---

## 5. 控制增益说明了问题

| | 增益公式 | 原因 |
|---|---|---|
| **DARE** | $K = (R + B^T P B)^{-1} B^T P A$ | 控制通过 $A$ 影响下一状态，所以 $A$ 显式出现 |
| **CARE** | $K = R^{-1} B^T P$ | 控制瞬时影响 $\dot{x}$，不需要 $A$ |

DARE增益问的是："现在施加什么控制能最小化即时代价*加上*我下一步着陆状态的成本？"——所以 $A$ 出现，因为 $x_{k+1} = Ax_k + Bu_k$。

CARE增益问的是："什么控制能瞬时对抗状态的漂移？"——不需要转移矩阵。

---

## 6. 它们如何联系：$\Delta t \to 0$ 极限

你可以通过取采样时间趋零从DARE推导CARE。

令 $A_d \approx I + A \Delta t$ 和 $B_d \approx B \Delta t$（前向Euler离散化）。代入DARE：

- $A_d^T P A_d \approx P + (A^T P + P A) \Delta t + O(\Delta t^2)$
- $A_d^T P B_d \approx P B \Delta t + O(\Delta t^2)$
- $B_d^T P B_d \approx B^T P B \Delta t^2$

当 $\Delta t \to 0$：
- $A^T PA$ 坍缩为 $P + (A^T P + PA)\Delta t$——$O(1)$ 项相消，留下 $A^T P + PA$
- $B^T PB$ 相对于 $R$ 缩为零，所以 $(R + B^T PB)^{-1} \to R^{-1}$
- 反馈路径中的 $A$：$B^T PA \to B^T P$

DARE增益收敛到CARE增益：$K_{\text{dare}} \to R^{-1} B^T P = K_{\text{care}}$。

---

## 7. 你应该用哪个？

**实践中，用DARE。** 今天每个实际控制系统都运行在数字硬件上——微控制器、DSP、FPGA。即使被控对象是连续物理系统（电机、机器人、无人机、化工过程），控制器也是以固定采样率执行的离散时间算法。你将被控对象模型离散化，在离散矩阵上求解DARE。

CARE在三种场景中仍然重要：

| 场景 | 为什么用CARE？ |
|---|---|
| **学术分析** | 连续时间证明通常更简洁——Hamilton矩阵的特征值、稳定裕度保证、无源性论证 |
| **仿真与教学** | 在连续时间中建立电机+控制器模型并用ODE求解器一起仿真是自然的（`lqr_explorer.html`就是这么做的） |
| **先设计再离散化** | 在连续时间中设计LQR，直觉更容易（极点位置、带宽、阻尼比），然后将得到的 $K$ 离散化用于实现 |

但如果你在为真实产品写固件——电机驱动、无人机飞控、卫星姿态控制——你会在离散化的被控对象上求解DARE。那才是与微控制器实际行为匹配的方程：采样、计算、施加、重复。

在本项目中：

- **`servo_qp_mpc.py`** 使用DARE——ZOH离散化的电机，采样周期1 ms，MPC用DARE的 $P$ 作为终端代价求解离散QP。这是真实实现的样子。
- **`lqr_explorer.html`** 使用CARE（通过Newton-Kleinman迭代）——设计和仿真在连续时间中建立以获得教学清晰度，与RK4积分一起求解。

---

## 8. 延伸阅读

- **从Bellman到LQR**（`bellman_to_lqr.md`）——逐步走过产生两个方程的DP递推；第4节和第5节覆盖DARE到CARE的过渡。
- **Anderson, B.D.O. & Moore, J.B. (1990).** *Optimal Control: Linear Quadratic Methods.* —— 第2–3章深入覆盖连续和离散Riccati方程。
- **Bertsekas, D.P. (2012).** *Dynamic Programming and Optimal Control, Vol. I.* —— 第4章严谨处理离散时间LQR；附录A覆盖连续时间极限。
