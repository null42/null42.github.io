---
date: 2026-06-06
section: 电机控制
chapter: controllers-evolution
chapterTitle: 控制器演进
chapterOrder: 50
category: 控制器演进
source: motor
visibility: public
title: "CE-16: 轨迹跟踪——LQR与MPC如何跟踪运动目标"
tags:
  - motor-control
status: learning
summary: '**副标题：调节问"把状态推到零"，跟踪问"跟着这个运动目标走"——反馈增益完全不变，你只需要加一个前馈项** **难度：** ★★★★☆ **适用对象：** 控制理论学习者、电机控制工程师 **前置知识：** CE-12（从Bellman原理到Riccati方程）、CE-13（CARE vs DARE）'
navGroup: 工程与生态
navGroupOrder: 50
---

# CE-16: 轨迹跟踪——LQR与MPC如何跟踪运动目标

**副标题：调节问"把状态推到零"，跟踪问"跟着这个运动目标走"——反馈增益完全不变，你只需要加一个前馈项**
**难度：** ★★★★☆
**适用对象：** 控制理论学习者、电机控制工程师
**前置知识：** CE-12（从Bellman原理到Riccati方程）、CE-13（CARE vs DARE）

---

## 1. 📌 核心摘要

标准LQR解决的是**调节问题**（Regulation）：将状态驱动到零。但几乎没有任何真实系统只做调节——电机伺服跟踪位置指令，无人机跟随航点路径，机械臂描绘期望末端轨迹。这些都是**跟踪问题**（Tracking）。好消息是：跟踪在调节之上增加的机制惊人地少。LQR的反馈增益 $K_k$ 完全不变，只需添加一个前馈项 $u_k^{\text{ff}}$。MPC的情况类似：Hessian矩阵 $H$ 不变，线性代价项只多加一个向量 $g_{\text{ref}}$。跟踪 = 调节 + 参考转换，这是线性二次最优控制最干净的结构性质之一。

**认知挂钩：** 前馈知道轨迹要去哪里（干重活），反馈只清理残差（擦屁股）。如果模型完美且无扰动，反馈项为零，前馈单独就能完美跟踪。

---

## 2. 调节与跟踪的区别

标准LQR解决**调节问题**：将状态驱动到零，同时惩罚控制消耗。最优控制是 $u_k = -K_k x_k$——纯负反馈。

但几乎没有任何真实系统只调节到零。电机伺服跟踪位置指令。无人机跟随航点路径。机械臂描绘期望末端轨迹。这些都是**跟踪问题**：给定参考 $\{r_0, r_1, \ldots, r_N\}$，找控制使 $x_k \approx r_k$ 对所有 $k$ 成立。

好消息：跟踪在调节之上增加的机制惊人地少。反馈增益 $K_k$ 完全相同。你只需要一个前馈项。

---

## 3. LQR跟踪

### 3.1 通过误差坐标推导

给定线性系统：

$$x_{k+1} = A x_k + B u_k$$

和满足相同动力学（带某个标称控制 $u_k^{\text{ff}}$）的参考轨迹 $\{r_0, r_1, \ldots, r_N\}$：

$$r_{k+1} = A r_k + B u_k^{\text{ff}}$$

定义跟踪误差 $e_k = x_k - r_k$ 和控制偏差 $\tilde{u}_k = u_k - u_k^{\text{ff}}$。从系统动力学减去参考动力学：

$$e_{k+1} = A e_k + B \tilde{u}_k$$

这与原始动力学形式完全相同。误差系统以 $\tilde{u}_k$ 为输入，有相同的 $A$ 和 $B$。所以 $(x, u)$ 上的跟踪问题变成了 $(e, \tilde{u})$ 上的**调节问题**：

$$\min_{\tilde{u}_0, \ldots, \tilde{u}_{N-1}} \quad e_N^T P e_N + \sum_{k=0}^{N-1} \big( e_k^T Q e_k + \tilde{u}_k^T R \tilde{u}_k \big)$$

最优解为：

$$\tilde{u}_k = -K_k e_k$$

其中 $K_k$ 来自与调节问题**完全相同的Riccati递推**。展开回原始变量：

$$u_k = u_k^{\text{ff}} - K_k (x_k - r_k)$$

### 3.2 两项结构

$$\underbrace{u_k}_{\text{施加的控制}} = \underbrace{u_k^{\text{ff}}}_{\text{前馈}} - \underbrace{K_k (x_k - r_k)}_{\text{反馈校正}}$$

| 项 | 角色 | 依赖于 |
|------|------|------------|
| $u_k^{\text{ff}}$ | 如果一切完美，能保持系统在参考上的标称控制 | $r_k, r_{k+1}, A, B$ |
| $-K_k (x_k - r_k)$ | 校正由扰动、初始偏移或模型失配引起的偏差 | $Q, R$（LQR调参） |

前馈干重活——它知道轨迹要去哪里。反馈只清理残差。如果模型完美且无扰动，反馈项为零，前馈单独就能完美跟踪。

### 3.3 计算前馈

理想前馈要求 $r_{k+1} = A r_k + B u_k^{\text{ff}}$，所以：

$$u_k^{\text{ff}} = B^+ (r_{k+1} - A r_k)$$

其中 $B^+$ 是Moore-Penrose伪逆。当 $r_{k+1} - A r_k$ 位于 $B$ 的列空间时（参考是"动力学可行的"），这是精确的。

对许多实际参考——例如位置的阶跃变化——$r_{k+1} - A r_k$ 不精确在 $B$ 的列空间中。常见变通方案：

- **稳态前馈：** 从DC增益计算 $u_{\text{ss}}$。对常值参考 $r$，稳态条件为 $r = A r + B u_{\text{ss}}$，所以 $u_{\text{ss}} = B^+ (I - A) r$。
- **LQI（积分增广）：** 用跟踪误差的积分增广状态。LQR然后自动将前馈构建到增广增益中。这就是 `lqr_explorer.html` 为电机伺服实现的。
- **预览前馈：** 如果完整未来参考已知，用伪逆从参考动力学计算每步的 $u_k^{\text{ff}}$。当参考服从动力学时这是精确的。

### 3.4 无限时域稳态情形

对常值参考 $r$ 和无限时域LQR（$K_k \to K$ 当 $k \to \infty$）：

$$u_k = u_{\text{ss}} - K (x_k - r)$$

其中 $u_{\text{ss}} = B^+ (I - A) r$。闭环系统：

$$x_{k+1} = A x_k + B [u_{\text{ss}} - K (x_k - r)] = (A - BK) x_k + B(K r + u_{\text{ss}})$$

在稳态，$x_\infty = r$（当 $u_{\text{ss}}$ 精确时，从 $r$ 到 $x_\infty$ 的闭环DC增益为单位矩阵，或使用LQI增广时接近单位矩阵）。

---

## 4. MPC跟踪

### 4.1 调节QP（回顾）

从 `from_lp_to_qp_to_lqr.md` 中的压缩推导，调节MPC求解：

$$\min_U \quad \frac{1}{2} U^T H U + (F^T x_0)^T U \quad \text{s.t. 约束}$$

其中 $H = 2(\mathcal{B}^T \bar{Q} \mathcal{B} + \bar{R})$ 和 $F = 2 \mathcal{B}^T \bar{Q} \mathcal{A}$。$H$ 固定；只有线性项随 $x_0$ 改变。

### 4.2 加入参考

定义堆叠参考 $\mathbf{R} = [r_1^T, r_2^T, \ldots, r_N^T]^T \in \mathbb{R}^{N n}$。跟踪代价惩罚 $\mathbf{X} - \mathbf{R}$ 而不只是 $\mathbf{X}$：

$$\begin{aligned}
J &= (\mathbf{X} - \mathbf{R})^T \bar{Q} (\mathbf{X} - \mathbf{R}) + U^T \bar{R} U \\
&= \mathbf{X}^T \bar{Q} \mathbf{X} - 2 \mathbf{R}^T \bar{Q} \mathbf{X} + \mathbf{R}^T \bar{Q} \mathbf{R} + U^T \bar{R} U
\end{aligned}$$

代入 $\mathbf{X} = \mathcal{A} x_0 + \mathcal{B} U$：

$$\begin{aligned}
J &= (\mathcal{A} x_0 + \mathcal{B} U)^T \bar{Q} (\mathcal{A} x_0 + \mathcal{B} U) - 2 \mathbf{R}^T \bar{Q} (\mathcal{A} x_0 + \mathcal{B} U) + \text{const} + U^T \bar{R} U \\
&= U^T (\mathcal{B}^T \bar{Q} \mathcal{B} + \bar{R}) U + 2 x_0^T \mathcal{A}^T \bar{Q} \mathcal{B} U - 2 \mathbf{R}^T \bar{Q} \mathcal{B} U + \text{（与}U\text{无关的项）}
\end{aligned}$$

合并关于 $U$ 的线性项：

$$J = \frac{1}{2} U^T H U + \big( F^T x_0 - 2 \mathcal{B}^T \bar{Q} \mathbf{R} \big)^T U + \text{const}$$

所以QP变为：

$$\boxed{\min_U \quad \frac{1}{2} U^T H U + \big( F^T x_0 + g_{\text{ref}} \big)^T U \quad \text{s.t. 约束}}$$

其中：

$$g_{\text{ref}} = -2 \,\mathcal{B}^T \bar{Q} \,\mathbf{R}$$

### 4.3 什么变了 vs 什么没变

| 组件 | 调节 | 跟踪 | 变了？ |
|-----------|-----------|----------|----------|
| $H$ | $2(\mathcal{B}^T \bar{Q} \mathcal{B} + \bar{R})$ | 相同 | **没变** |
| $F$ | $2 \mathcal{B}^T \bar{Q} \mathcal{A}$ | 相同 | **没变** |
| 线性代价 | $F^T x_0$ | $F^T x_0 + g_{\text{ref}}$ | **变了**——多一个向量 |
| 约束 | $u_{\min} \leq U \leq u_{\max}$ | 相同（或扩展） | **通常不变** |

$H$ 是重量级部分——它是 $N m \times N m$，分解它主导求解时间。从调节切换到跟踪时 $H$ 不变，这是关键的实用洞察：**你预分解 $H$ 一次，跟踪只是每步在线性项上加一个廉价的向量加法。**

### 4.4 $g_{\text{ref}}$ 实际做了什么

$g_{\text{ref}} = -2 \mathcal{B}^T \bar{Q} \mathbf{R}$ 编码了整个未来参考轨迹对最优控制序列的影响。展开：

$$\mathcal{B}^T \bar{Q} \mathbf{R} = \begin{bmatrix}
B^T Q r_1 + B^T A^T Q r_2 + B^T (A^2)^T Q r_3 + \cdots \\
B^T Q r_2 + B^T A^T Q r_3 + \cdots \\
\vdots \\
B^T Q r_N
\end{bmatrix}$$

$g_{\text{ref}}$ 的每个分量求和了给定控制 $u_k$ 通过动力学能到达的所有未来参考点的影响。参考点 $r_j$ 只在 $j > k$ 时影响 $u_k$（因果性：$u_k$ 只能影响未来状态，代价将那些未来状态与它们的参考比较）。权重通过 $A$ 的幂随距离 $j - k$ 衰减。

没有约束时，最优跟踪控制为 $U^* = -H^{-1}(F^T x_0 + g_{\text{ref}})$。第一个控制 $u_0^*$ 为：

$$u_0^* = -\underbrace{[H^{-1} F^T]_{0} x_0}_{\text{调节反馈}} \;-\; \underbrace{[H^{-1}]_{0}\, g_{\text{ref}}}_{\text{来自未来参考的前馈}}$$

其中 $[H^{-1}]_0$ 表示 $H^{-1}$ 的前 $m$ 行。这明确表示 $u_0^*$ 是状态反馈和参考前馈之和——正是LQR情形中的两项结构，但现在前馈在整个时域上向前看。

### 4.5 代码草图

从调节MPC唯一的变化是每步多一行：

```python
# —— 预计算（一次性） ——
H = 2 * (B_aug.T @ Qbar @ B_aug + Rbar)
F = 2 * B_aug.T @ Qbar @ A_aug       # 与调节相同

# —— 每个时间步 ——
ref_stack = build_reference_stack(k)  # [r_{k+1}, ..., r_{k+N}]
g_ref = -2 * B_aug.T @ Qbar @ ref_stack

prob = QP(H, F.T @ x0 + g_ref, u_min, u_max)   # <— g_ref 是唯一的添加
U_opt = prob.solve()
u = U_opt[0]
```

就是这样。同一个QP求解器。同一个Hessian。多一个向量。

---

## 5. 跟踪误差上的状态约束

在调节MPC中，状态约束取形式 $x_{\min} \leq x_k \leq x_{\max}$。在跟踪中，你通常希望跟踪误差保持在界限内：$|x_k - r_k| \leq e_{\max}$，或等价地 $r_k - e_{\max} \leq x_k \leq r_k + e_{\max}$。

因为 $\mathbf{X} = \mathcal{A} x_0 + \mathcal{B} U$，状态约束变为关于 $U$ 的时变线性不等式：

$$\begin{bmatrix} \mathcal{B} \\ -\mathcal{B} \end{bmatrix} U \leq \begin{bmatrix} \mathbf{R} + \mathbf{e}_{\max} - \mathcal{A} x_0 \\ -\mathbf{R} + \mathbf{e}_{\max} + \mathcal{A} x_0 \end{bmatrix}$$

约束矩阵（$\mathcal{B}$ 与 $-\mathcal{B}$ 堆叠）仍然是固定的。只有右边随 $\mathbf{R}$ 和 $x_0$ 改变。

---

## 6. 总结

| | LQR调节 | LQR跟踪 | MPC调节 | MPC跟踪 |
|---|---|---|---|---|
| **增益 / Hessian** | 来自Riccati的 $K_k$ | 相同 $K_k$ | 来自压缩的 $H, F$ | 相同 $H$，相同 $F$ |
| **添加了什么** | — | $u_k^{\text{ff}}$ | — | 线性代价中的 $g_{\text{ref}}$ |
| **结构** | $u_k = -K_k x_k$ | $u_k = u_k^{\text{ff}} - K_k (x_k - r_k)$ | $\min \frac{1}{2}U^T H U + (F^T x_0)^T U$ | $\min \frac{1}{2}U^T H U + (F^T x_0 + g_{\text{ref}})^T U$ |
| **在线代价** | 无（离线） | 无（离线） | 每步解QP | 相同QP代价 + 一次向量加法 |

模式是普适的：**跟踪 = 调节 + 参考转换。** 反馈机制（Riccati增益、QP Hessian）不知道也不关心参考——它只知道如何镇定偏差。参考通过前馈路径单独进入，将期望轨迹映射到控制空间。这种分离是线性二次最优控制最干净的结构性质之一。

---

## 7. 参考文献

1. **Anderson, B.D.O. & Moore, J.B. (1990).** *Optimal Control: Linear Quadratic Methods.* Prentice-Hall. —— 第3–4章详细覆盖LQR的跟踪扩展。

2. **Borrelli, F., Bemporad, A., & Morari, M. (2017).** *Predictive Control for Linear and Hybrid Systems.* Cambridge University Press. —— 第9章覆盖MPC中的参考跟踪，包括压缩QP表述。

3. **Maciejowski, J.M. (2002).** *Predictive Control with Constraints.* Prentice Hall. —— 第2–3章推导跟踪MPC表述并讨论前馈设计。

4. **Rawlings, J.B., Mayne, D.Q., & Diehl, M. (2017).** *Model Predictive Control: Theory, Computation, and Design.* Nob Hill. —— 第1章覆盖调节到跟踪的过渡；第5章覆盖跟踪误差上的状态约束。

---

*本文档是 `Controllers-from-PID-to-QP_MPC` 仓库的一部分。LQR推导见 `bellman_to_lqr.md`。产生 $H$ 和 $F$ 的压缩推导见 `from_lp_to_qp_to_lqr.md`（第6节）。交互式跟踪器 `lqr_explorer.html` 实现了LQI——带积分增广的LQR跟踪，用于稳态参考跟随。*
