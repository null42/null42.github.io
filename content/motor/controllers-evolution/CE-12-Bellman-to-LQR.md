---
date: 2026-06-08
section: 电机控制
chapter: controllers-evolution
chapterTitle: 控制器演进
chapterOrder: 50
category: 控制器演进
source: motor
visibility: public
title: "CE-12: 从Bellman原理到Riccati方程"
tags:
  - motor-control
status: learning
summary: "**副标题：动态规划如何导出LQR的核心——以及Riccati方程为何不是凭空而来的** **难度：**  **适用对象：** 控制理论学习者、电机控制工程师 **前置知识：** CE-03（状态空间法）、CE-08（最优控制基础）"
navGroup: 工程与生态
navGroupOrder: 50
---

# CE-12: 从Bellman原理到Riccati方程

**副标题：动态规划如何导出LQR的核心——以及Riccati方程为何不是凭空而来的**
**难度：** 
**适用对象：** 控制理论学习者、电机控制工程师
**前置知识：** CE-03（状态空间法）、CE-08（最优控制基础）

---

## 1.  核心摘要

本文从Bellman最优性原理出发，逐步推导出线性二次调节器（Linear Quadratic Regulator, LQR）的核心——Riccati方程。我们首先建立动态规划（Dynamic Programming, DP）的一般框架，然后通过一个一维手算例子感受Riccati增益的递推过程，最后证明在线性动力学+二次代价的条件下，值函数（Value Function）始终保持二次型，从而导出离散Riccati递推和连续Riccati方程（CARE）。Bellman原理将多步联合优化分解为单步递推，二次假设使递推闭式可解——两者结合，就是LQR的全部数学基础。

**认知挂钩：** Riccati方程不是"从天而降"的公式，而是Bellman递推在"线性+二次"条件下的必然产物——就像二次方程的求根公式不是发明出来的，而是配方法的自然结果。

---

## 2. 我们要解决的问题

你有一个系统。在每个时刻 $k$，它有状态 $x_k$（一个向量）。你施加控制 $u_k$，系统按已知动力学演化：

$$x_{k+1} = f(x_k, u_k)$$

你还有一个随时间累积的代价函数。每步付出 $\ell(x_k, u_k)$（"阶段代价"），最后一步 $N$ 付出终端代价 $V_f(x_N)$。总代价：

$$J = V_f(x_N) + \sum_{k=0}^{N-1} \ell(x_k, u_k)$$

你的任务：选择序列 $u_0, u_1, \ldots, u_{N-1}$ 使 $J$ 最小。

如果试图暴力求解——同时优化所有 $N$ 个控制向量——问题随时域长度组合爆炸。对连续状态和控制空间，你面对的是一个高维非线性优化。这就是Bellman出场的时刻。

---

## 3. Bellman最优性原理

Richard Bellman（1957）陈述了一个看似简单的思想：

> **"最优策略具有如下性质：无论初始状态和初始决策如何，剩余决策必须构成从第一个决策所导致的状态出发的最优策略。"**

通俗地说：**最优轨迹的尾部本身也是从该尾部出发的子问题的最优轨迹。**

为什么这如此强大？它意味着你不需要同时求解所有 $u_0, \ldots, u_{N-1}$。你可以**逆时间**一步一步求解。

定义**值函数** $V_k(x)$ 为从时刻 $k$ 的状态 $x$ 出发的最小代价：

$$V_k(x) = \min_{u_k, \ldots, u_{N-1}} \left[ V_f(x_N) + \sum_{i=k}^{N-1} \ell(x_i, u_i) \right]$$

Bellman原理给出递推关系。在时刻 $k$，$u_k$ 的最优选择必须平衡：
1. 即时代价 $\ell(x_k, u_k)$
2. 从着陆点出发的最优代价：$V_{k+1}(x_{k+1})$

这就是**Bellman方程**：

$$V_k(x) = \min_u \Big[ \ell(x, u) + V_{k+1}\big(f(x, u)\big) \Big]$$

边界条件为 $V_N(x) = V_f(x)$。

你从末尾（$k = N$）开始逆推。每步只需对 $u$ 做一个**单步优化**——未来已被 $V_{k+1}$ 概括。这就是动态规划：把多步问题分解为一系列单步问题。

### 一个具体的一维例子（感受递推）

假设 $x_{k+1} = x_k + u_k$（简单积分器），代价为：

$$J = x_N^2 + \sum_{k=0}^{N-1} (x_k^2 + u_k^2)$$

时域 $N = 3$。逆推求解。

**步骤 $k=3$（终端）：** $V_3(x) = x^2$

**步骤 $k=2$：**
$$V_2(x) = \min_u \big[ x^2 + u^2 + V_3(x+u) \big] = \min_u \big[ x^2 + u^2 + (x+u)^2 \big]$$

对 $u$ 求导并令其为零：$2u + 2(x+u) = 0 \Rightarrow u = -x/2$。代回：

$$V_2(x) = x^2 + (x/2)^2 + (x - x/2)^2 = x^2 + x^2/4 + x^2/4 = \tfrac{3}{2}x^2$$

**步骤 $k=1$：**
$$V_1(x) = \min_u \big[ x^2 + u^2 + \tfrac{3}{2}(x+u)^2 \big]$$

求导：$2u + 3(x+u) = 0 \Rightarrow u = -\tfrac{3}{5}x$。则：

$$V_1(x) = x^2 + \tfrac{9}{25}x^2 + \tfrac{3}{2}(\tfrac{2}{5}x)^2 = x^2\big(1 + \tfrac{9}{25} + \tfrac{6}{25}\big) = \tfrac{8}{5}x^2$$

**步骤 $k=0$：**
$$V_0(x) = \min_u \big[ x^2 + u^2 + \tfrac{8}{5}(x+u)^2 \big]$$

求导：$2u + \tfrac{16}{5}(x+u) = 0 \Rightarrow u = -\tfrac{8}{13}x$。

所以每步的最优策略是**线性反馈** $u_k = -K_k x_k$，增益为 $K_0 = 8/13$，$K_1 = 3/5$，$K_2 = 1/2$。这些就是**Riccati增益**——我们通过手算逆推DP得到了它们。

---

## 4. LQR：当系统是线性的、代价是二次的

现在特化。假设动力学是**线性**的：

$$x_{k+1} = A x_k + B u_k$$

代价是**二次**的：

$$J = x_N^T Q_f x_N + \sum_{k=0}^{N-1} \big( x_k^T Q x_k + u_k^T R u_k \big)$$

其中 $Q \succeq 0$（惩罚状态误差），$R \succ 0$（惩罚控制消耗），$Q_f \succeq 0$（终端代价）。

这就是**线性二次调节器**（LQR）——有限时域、离散时间。

LQR的魔力在于值函数在每步都保持二次型。我们做一个**假设**（由上面的一维例子启发）：

$$V_k(x) = x^T P_k x$$

其中 $P_k$ 是对称半正定矩阵。我们来验证这个假设成立，并找到 $P_k$ 的递推关系。

代入Bellman方程：

$$x^T P_k x = \min_u \Big[ x^T Q x + u^T R u + (Ax + Bu)^T P_{k+1} (Ax + Bu) \Big]$$

括号内的项关于 $u$ 是二次的。展开未来代价部分：

$$(Ax + Bu)^T P_{k+1} (Ax + Bu) = x^T A^T P_{k+1} A x + 2 u^T B^T P_{k+1} A x + u^T B^T P_{k+1} B u$$

所以关于 $u$ 最小化的总表达式为：

$$u^T (R + B^T P_{k+1} B) u + 2 u^T B^T P_{k+1} A x + x^T (Q + A^T P_{k+1} A) x$$

这是关于 $u$ 的无约束凸二次问题（因为 $R \succ 0$ 且 $P_{k+1} \succeq 0$，Hessian矩阵 $R + B^T P_{k+1} B$ 正定）。令梯度为零：

$$2(R + B^T P_{k+1} B) u + 2 B^T P_{k+1} A x = 0$$

$$\Rightarrow u^* = -\underbrace{(R + B^T P_{k+1} B)^{-1} B^T P_{k+1} A}_{K_k} \; x$$

这是**线性状态反馈** $u_k = -K_k x_k$，增益 $K_k$ 依赖于 $P_{k+1}$。

现在将 $u^*$ 代回求 $P_k$。经过代数运算（配方）：

$$P_k = Q + A^T P_{k+1} A - A^T P_{k+1} B (R + B^T P_{k+1} B)^{-1} B^T P_{k+1} A$$

这就是**离散时间Riccati递推**（Discrete-time Riccati Recurrence）。它从终端条件 $P_N = Q_f$ 开始逆推传播 $P_k$。

### 完整算法（有限时域离散时间LQR）

```text
给定：A, B, Q, R, Qf, 时域 N

P_N = Qf
for k = N-1, N-2, ..., 0:
    K_k = (R + B^T P_{k+1} B)^{-1} B^T P_{k+1} A
    P_k = Q + A^T P_{k+1} A - A^T P_{k+1} B K_k

最优控制：u_k = -K_k x_k
最优代价：  J*(x_0) = x_0^T P_0 x_0
```

每次迭代做一个 $m \times m$ 的求解（$m$ 是控制输入维数）和若干矩阵乘法。总复杂度：对 $n$ 状态系统为 $O(N n^3)$。

---

## 5. 稳态：从递推到代数方程

当 $N \to \infty$ 时会发生什么？如果系统是可镇定（Stabilizable）和可检测（Detectable）的，$P_k$ 在逆推过程中收敛到一个稳态矩阵 $P$。递推变为：

$$P = Q + A^T P A - A^T P B (R + B^T P B)^{-1} B^T P A$$

这就是**离散时间代数Riccati方程**（Discrete-time Algebraic Riccati Equation, DARE）。最优反馈增益变为常数：

$$K = (R + B^T P B)^{-1} B^T P A$$

无限时域最优控制就是 $u_k = -K x_k$。

实践中，你迭代Riccati递推直到 $\|P_{k} - P_{k+1}\| < \epsilon$，然后读出稳态 $K$。

---

## 6. 连续时间：如何得到CARE

连续时间LQR问题最小化：

$$J = \int_0^\infty \big( x(t)^T Q x(t) + u(t)^T R u(t) \big) dt$$

约束为 $\dot{x} = A x + B u$。

你可以通过取采样时间 $\Delta t \to 0$ 的极限从离散递推导出连续时间Riccati方程（这是细致的工作——离散的 $A_d \approx I + A \Delta t$，$B_d \approx B \Delta t$，$\Delta t^2$ 阶的项消失）。结果是**连续时间代数Riccati方程**（Continuous-time Algebraic Riccati Equation, CARE）：

$$A^T P + P A - P B R^{-1} B^T P + Q = 0$$

最优控制为：

$$u(t) = -K x(t), \qquad K = R^{-1} B^T P$$

与离散增益 $K = (R + B^T P B)^{-1} B^T P A$ 比较。当 $\Delta t \to 0$ 时，$B^T P B$ 项相对于 $R$ 可忽略，反馈路径中的 $A$ 消失——连续极限更简洁。

### `solveCARE`实际如何工作（Newton-Kleinman方法）

`lqr_explorer.html` 中的代码不是直接把CARE当作二次矩阵方程来解。它使用**Newton-Kleinman迭代**，即对Riccati方程应用Newton法：

1. **猜测**一个初始镇定增益 $K_0$（第739–743行——从已知好的增益缩放而来）。
2. **迭代：** 给定 $K_i$，形成闭环矩阵 $A_{cl} = A - B K_i$。
3. **求解Lyapunov方程：** $A_{cl}^T P_{i+1} + P_{i+1} A_{cl} = -(Q + K_i^T R K_i)$（第779行）。
4. **更新增益：** $K_{i+1} = R^{-1} B^T P_{i+1}$（第786–792行）。
5. **必要时阻尼：** 如果 $K_{i+1}$ 不能镇定 $A$，取部分步长（第795–800行）。
6. **停止**当 $\|K_{i+1} - K_i\| < 10^{-7}$。

一旦接近解，收敛速度是二次的。每次迭代的Lyapunov求解使用特征值分解或Kronecker积方法（代码第480行起）。

---

## 7. 为什么这很美

整个LQR大厦建立在三个思想之上，层层递进：

| 层次 | 思想 | 方程 |
|------|------|------|
| **Bellman (1957)** | 最优尾部是子问题的最优 | $V_k = \min_u [\ell + V_{k+1}]$ |
| **DP + 二次型** | 值函数保持二次型 | $V_k(x) = x^T P_k x$ |
| **DP → Riccati** | $P_k$ 的逆推递推 | $P_k = Q + A^T P_{k+1} A - (\ldots)$ |
| **稳态 → CARE** | 当 $N \to \infty$，$P$ 满足代数方程 | $A^T P + P A - P B R^{-1} B^T P + Q = 0$ |

注意这里**没有**什么：
- 没有PDE的离散化（Hamilton-Jacobi-Bellman方程保持可解，因为二次假设使递推闭合）。
- 没有非线性优化——Bellman方程简化为令梯度为零，因为代价是二次的、动力学是线性的。
- 没有维数灾难——值函数由 $n \times n$ 矩阵 $P$ 表示，而非状态空间上的网格。

代价是：LQR只适用于线性动力学和二次代价。这就是交换。但在该范围内，它是精确的、全局的、$O(n^3)$ 可计算的。

---

## 8. 从LQR到本项目的其余部分

LQR探索器（`lqr_explorer.html`）对一个4阶增广电机模型（3个电机状态 + 1个用于零稳态误差的积分器——这就是"LQI"扩展）求解CARE。QP-MPC仿真器（`servo_qp_mpc.html`）求解有限时域约束版本：每个时间步，它在 $N$ 步时域上最小化相同的LQR代价，受电压约束 $u_{\min} \leq u_k \leq u_{\max}$，使用坐标下降QP求解器。没有约束时，QP-MPC在第一步的解**等同于**LQR解——因为二次代价下的Bellman原理无论你一次求解Riccati方程还是在线优化有限时域，都产生相同的线性反馈。

贯穿三种控制器（PID、LQR、QP-MPC）的统一线索是：**你始终在求解一个优化问题。** PID通过增益调参隐式地做。LQR显式地但无约束地做，通过一次Riccati求解。QP-MPC显式地带约束地做，通过在线二次规划。Bellman原理使后两者变得可解。

---

## 9. 延伸阅读

- **Bellman, R. (1957).** *Dynamic Programming.* Princeton University Press. —— 原始文献。仅第1章就值得阅读Bellman的直觉。
- **Bertsekas, D.P. (2012).** *Dynamic Programming and Optimal Control, Vol. I.* Athena Scientific. —— 严谨论述；第1章和第4章深入覆盖DP和LQR。
- **Anderson, B.D.O. & Moore, J.B. (1990).** *Optimal Control: Linear Quadratic Methods.* Prentice-Hall. —— LQR的权威参考。
- **Boyd, S.** *EE363: Linear Dynamical Systems*（Stanford课程笔记）。—— 连接DP、LQR和Riccati的优秀讲义。
- 试试第2节的一维例子，用不同的 $N$ 手算——观察 $K_k$ 收敛到稳态增益所建立的直觉，是任何阅读都无法替代的。
