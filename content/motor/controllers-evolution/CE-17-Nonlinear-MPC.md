---
date: 2026-06-08
section: 电机控制
chapter: controllers-evolution
chapterTitle: 控制器演进
chapterOrder: 50
category: 控制器演进
source: motor
visibility: public
title: "CE-17: 非线性MPC——当动力学超越线性"
tags:
  - motor-control
status: learning
summary: "**副标题：超越线性——非线性模型预测控制的方法、折衷与前沿** **难度：**  **适用对象：** 控制理论学习者、电机控制工程师 **前置知识：** CE-15（LP→QP→LQR——现代控制的优化引擎）、CE-16（轨迹跟踪）"
navGroup: 工程与生态
navGroupOrder: 50
---

# CE-17: 非线性MPC——当动力学超越线性

**副标题：超越线性——非线性模型预测控制的方法、折衷与前沿**
**难度：** 
**适用对象：** 控制理论学习者、电机控制工程师
**前置知识：** CE-15（LP→QP→LQR——现代控制的优化引擎）、CE-16（轨迹跟踪）

---

## 1.  核心摘要

到目前为止，所有内容都假设 $x_{k+1} = A x_k + B u_k$。这个假设买了很多——闭式Riccati解、凸QP、保证全局最优。现实是非线性的。本文系统梳理非线性MPC的四个层级：单次线性化（LTV-MPC）、序贯二次规划（Sequential Quadratic Programming, SQP）、直接多重打靶（Direct Multiple Shooting）和微分动态规划（Differential Dynamic Programming, DDP/iLQR）。每一级增加真实感，也增加计算量。PID可忽略，LQR是一次矩阵求解，线性MPC是每步一个QP，非线性MPC是每步多个QP或一个完整NLP。选择停在哪一级取决于三个问题：你的被控对象有多非线性、控制环路必须跑多快、稍微次优（线性化非线性被控对象）的代价是否高于额外计算的代价。

**认知挂钩：** 线性MPC的三大支柱——代价保持二次、QP凸、Hessian与状态无关——在非线性动力学下全部崩塌。非线性MPC的全部艺术就是在"更精确的模型"和"更贵的计算"之间找到实用平衡点。

---

## 2. 为什么线性是拐杖

LQR和线性MPC的整个大厦建立在一个性质上：动力学是仿射的，代价是二次的。两者合在一起给你：

1. **压缩后代价保持二次。** 值函数在Bellman递推的每步都保持二次型。这就是Riccati方程能工作的原因。

2. **QP是凸的。** $H \succeq 0$ 有保证。任何局部极小值都是全局的。求解器不会卡住。

3. **$H$ 与状态无关。** 你分解一次，永远重用。在线计算每步只是一个矩阵-向量乘法加一个固定Hessian的QP求解。

当 $x_{k+1} = f(x_k, u_k)$ 且 $f$ 非线性时，这三条全部崩塌。

---

## 3. 什么崩塌了

### 3.1 代价关于 $U$ 不再是二次的

线性动力学下，压缩产生 $J = \frac{1}{2} U^T H U + (F^T x_0)^T U + \text{const}$。非线性动力学 $x_{k+1} = f(x_k, u_k)$ 下，状态轨迹变成 $U$ 的非线性函数：

$$x_k = \underbrace{f(f(\ldots f(x_0, u_0), u_1), \ldots, u_{k-1})}_{\text{关于 } u_0, \ldots, u_{k-1} \text{非线性}}$$

当你把这个代入二次阶段代价 $\ell(x_k, u_k) = x_k^T Q x_k + u_k^T R u_k$，结果是关于 $U$ 的一般非凸函数。没有压缩技巧能使它二次化。没有Riccati递推能分解它。

### 3.2 优化是非凸的

$J(U)$ 的Hessian不再是常数。它通过 $f$ 的线性化依赖于 $U$。假设固定正定Hessian的QP求解器不能直接使用。

你仍然可以*近似*Hessian。这就是SQP做的（第4节）。但近似引入误差，收敛不再是一步到位。

### 3.3 $H$ 依赖于轨迹

线性MPC中，$H = 2(\mathcal{B}^T \bar{Q} \mathcal{B} + \bar{R})$ 从 $A$ 和 $B$ 一次性计算。非线性MPC中，$A$ 和 $B$ 的等价物——Jacobian $\frac{\partial f}{\partial x}$ 和 $\frac{\partial f}{\partial u}$——在状态和控制轨迹的当前猜测处求值。随着求解器迭代，线性化点移动，有效的 $H$ 改变。预分解不再是一次性成本——它在每次SQP迭代时都要支付，或者如果做单次打靶RTI，最好也是每个MPC时间步一次。

### 3.4 最优性原理仍然成立，但是……

Bellman原理是通用的——它对任何动力学和任何代价都成立。动态规划方程：

$$V_k(x) = \min_u \big[ \ell(x, u) + V_{k+1}(f(x, u)) \big]$$

对非线性 $f$ 有效。问题是 $V_k(x)$ 不再是二次的。它是 $\mathbb{R}^n$ 上的一般非线性函数，精确表示它需要无限信息。这就是**维数灾难**——Bellman本人创造这个词的原因。

所以，原理成立。但对非线性系统闭式计算 $V_k(x)$ 是不可能的。你要么近似它（DDP、iLQR），要么完全避免计算它，直接求解完整NLP（多重打靶）。

---

## 4. 方法层级

处理非线性大约有四个野心级别，在线计算与精度之间做折衷。

### 4.1 第一级：每步单次线性化（LTV-MPC）

**有时有效的最简单方案。**

每个时间步，在当前状态 $x_k$ 和移位后的前一步控制序列处线性化 $f(x, u)$ 一次：

$$x_{i+1} \approx f(\bar{x}_i, \bar{u}_i) + \underbrace{\frac{\partial f}{\partial x}\bigg|_{\bar{x}_i, \bar{u}_i}}_{A_i} (x_i - \bar{x}_i) + \underbrace{\frac{\partial f}{\partial u}\bigg|_{\bar{x}_i, \bar{u}_i}}_{B_i} (u_i - \bar{u}_i) + \underbrace{f(\bar{x}_i, \bar{u}_i) - A_i \bar{x}_i - B_i \bar{u}_i}_{d_i,\ \text{仿射偏移}}$$

这是一个LTV（线性时变）系统：$x_{i+1} = A_i x_i + B_i u_i + d_i$。仿射偏移 $d_i$ 捕获了线性化点处线性项不能解释的非线性。

然后把这个LTV系统压缩成QP——与线性情形结构相同，但 $A$ 和 $B$ 每步变化。Hessian $H$ 必须每步重新构造（不只是重新分解），因为预测矩阵 $\mathcal{A}$ 和 $\mathcal{B}$ 依赖于时变的 $A_i, B_i$。

```text
每个MPC步（单次线性化）：
  1. 移位前一步解：(u_0,...,u_{N-1}) → (u_1,...,u_{N-1}, u_{N-1})
  2. 通过 f 仿真移位序列得到 (x̄_0,...,x̄_N)
  3. 在 (x̄_i, ū_i) 处线性化 f → A_i, B_i, d_i
  4. 压缩LTV系统 → H, F, g
  5. 求解QP → U*
  6. 施加 u*_0
```

**何时有效：** 平滑非线性、慢动力学、控制频率相对系统带宽高。MPC每步重新规划补偿了线性化误差。

**何时失效：** 强非线性导致线性化模型即使一步前也预测不准。悬停的四旋翼线性化没问题。做翻滚的四旋翼不行。

### 4.2 第二级：序贯二次规划（SQP）

**在同一时间步内迭代线性化。**

不是线性化一次，而是求解一系列QP，每个用前一个QP的解作为新线性化点：

```text
在一个MPC时间步内：
  从前一步的解（移位后）初始化 (X̄, Ū)
  重复：
    仿真：X̄ ← f(x_k, Ū)
    在 (X̄, Ū) 处线性化 f → A_i, B_i, d_i
    构建关于 ΔU 的 QP：min ½ΔU^T H ΔU + g^T ΔU   s.t. 约束
    求解 ΔU
    更新：Ū ← Ū + α·ΔU       （α 来自线搜索或信赖域）
    计算连续性间隙：||X̄_next - f(X̄, Ū)||
  直到 gap < ε 且 ||ΔU|| < ε
  施加 Ū[0]
```

每个QP子问题与线性MPC结构相同——$H$ 是块结构的，约束是线性的。但 $A_i, B_i$ 每次迭代变化，所以 $H$ 变化。这是一般非线性优化的主力（SQP是SNOPT、acados和大多数生产级NLP求解器的基础）。

使用精确Hessian时，SQP在解附近二次收敛，使用好的近似（BFGS更新）时超线性收敛。

**实时迭代（Real-Time Iteration, RTI）**是实用折衷：每个MPC时间步恰好做*一次*SQP迭代。这个想法由Diehl等人（2002）提出，核心是优化器在连续时间步之间"跟踪"真正的最优值，而不是在每步内完全收敛。随着 $x_k$ 在步间变化很小，前一步的最优轨迹是极好的热启动，一次SQP迭代使你保持接近最优。这就是非线性MPC在50–200 Hz嵌入式硬件上用于自动驾驶和无人机变得可行的关键。

### 4.3 第三级：直接多重打靶（Direct Multiple Shooting）

**让状态轨迹成为显式决策变量。**

不是压缩（消去状态，只对 $U$ 优化），多重打靶同时保留状态 $x_1, \ldots, x_N$ 和控制 $u_0, \ldots, u_{N-1}$ 作为决策变量，将动力学作为等式约束强制：

$$\begin{aligned}
\min_{x_1,\ldots,x_N, u_0,\ldots,u_{N-1}} \quad & \sum_{k=0}^{N-1} \ell(x_k, u_k) + V_f(x_N) \\
\text{s.t.} \quad & x_{k+1} = \Phi(x_k, u_k) \quad k = 0, \ldots, N-1 \quad \text{（连续性）} \\
& x_0 = \hat{x} \quad \text{（初始状态）} \\
& g(x_k, u_k) \leq 0 \quad \text{（路径约束）} \\
& h(x_N) \leq 0 \quad \text{（终端约束）}
\end{aligned}$$

其中 $\Phi$ 是数值积分器（如RK4），将连续时间动力学 $\dot{x} = f_c(x, u)$ 传播一个采样间隔。

连续性约束确保优化器找到动力学一致的轨迹。在收敛时，积分动力学与决策变量状态匹配。在优化过程中，间隙非零——这就是优化器驱动到零的"打靶"间隙。

**为什么对非线性系统比压缩好：**

1. **NLP有可利用的稀疏性。** 每个连续性约束 $x_{k+1} - \Phi(x_k, u_k) = 0$ 只耦合 $(x_k, u_k, x_{k+1})$。KKT矩阵是带状的。专用求解器（acados、Forces Pro）利用这一点实现 $O(N)$ 的时域长度复杂度，而压缩是 $O(N^3)$。

2. **更好的数值条件。** 决策变量 $(x_k, u_k)$ 有物理意义。Hessian不会像压缩Hessian那样对长时域爆炸。

3. **初始化更灵活。** 你可以从之前的仿真或粗略规划初始化状态轨迹，给求解器比猜测 $U$ 好得多的起点。

4. **状态上的路径约束是自然的。** 它们变成决策变量 $x_k$ 上的简单边界或不等式。

代价是更大但更稀疏的问题。NLP由SQP或内点法求解，线性代数中利用稀疏模式。

### 4.4 第四级：微分动态规划（DDP）/ iLQR

**用局部二次近似直接对非线性问题应用Bellman原理。**

DDP（Jacobson & Mayne, 1970）及其简化变体iLQR（Tassa et al., 2014）是轨迹优化方法，在当前轨迹周围线性化的非线性动力学上做反向Riccati类传递：

**重复直到收敛：**

1. **仿真**当前控制序列通过 $f$ 得到标称轨迹 $(\bar{x}_0, \ldots, \bar{x}_N)$，$(\bar{u}_0, \ldots, \bar{u}_{N-1})$。

2. 在每个 $(\bar{x}_i, \bar{u}_i)$ 处**线性化**动力学并**二次化**代价。定义偏差 $\delta x_i = x_i - \bar{x}_i$ 和 $\delta u_i = u_i - \bar{u}_i$。动力学 $x_{i+1} = f(x_i, u_i)$ 展开为：

$$x_{i+1} \approx \bar{x}_{i+1} + A_i \,\delta x_i + B_i \,\delta u_i
  \quad\Longleftrightarrow\quad
  \delta x_{i+1} \approx A_i \,\delta x_i + B_i \,\delta u_i$$

其中 $\bar{x}_{i+1} = f(\bar{x}_i, \bar{u}_i)$ 是步骤1中的标称下一状态。阶段代价 $\ell(x_i, u_i)$ 展开为：

$$\begin{aligned}
\ell(x_i, u_i) &\approx \ell_i + q_i^T \delta x_i + r_i^T \delta u_i
                  + \tfrac{1}{2}\delta x_i^T Q_i \,\delta x_i
                  + \delta x_i^T S_i \,\delta u_i
                  + \tfrac{1}{2}\delta u_i^T R_i \,\delta u_i
\end{aligned}$$

$A_i = \frac{\partial f}{\partial x}$，$B_i = \frac{\partial f}{\partial u}$ 在 $(\bar{x}_i, \bar{u}_i)$ 处求值，$Q_i, S_i, R_i, q_i, r_i$ 是代价的Taylor系数。

3. **反向Riccati递推**——从 $i = N-1$ 到 $0$：

$$\boxed{\begin{aligned}
K_i &= (R_i + B_i^T V_{i+1} B_i)^{-1} (B_i^T V_{i+1} A_i + S_i^T) \\[4pt]
k_i &= (R_i + B_i^T V_{i+1} B_i)^{-1} (B_i^T v_{i+1} + r_i) \\[4pt]
V_i &= Q_i + A_i^T V_{i+1} A_i - K_i^T (R_i + B_i^T V_{i+1} B_i) K_i \\[4pt]
v_i &= q_i + A_i^T v_{i+1} - K_i^T (R_i + B_i^T V_{i+1} B_i) k_i
\end{aligned}}$$

终端条件为 $V_N = Q_f$ 和 $v_N = q_f$，来自终端代价。

4. **前向传递**——用线搜索参数 $\alpha \in (0, 1]$ 从 $i = 0$ 到 $N-1$。完整DDP通过**非线性展开**施加增益——用扰动控制仿真实际动力学——而iLQR使用这里展示的线性展开：

$$\delta u_i = -K_i \,\delta x_i - \alpha\,k_i, \qquad \delta x_{i+1} = A_i \,\delta x_i + B_i \,\delta u_i$$

等价地用绝对变量：$u_i = \bar{u}_i + \delta u_i$，然后 $x_{i+1} = f(x_i, u_i)$ 做非线性展开。反馈增益 $K_i$ 校正偏离标称轨迹的偏差。前馈 $k_i$ 将整个轨迹向最优移动。$\alpha$ 上的线搜索（Armijo回溯）确保单调代价下降。

这就是*Riccati递推的非线性推广。* 每次迭代，DDP在当前标称轨迹周围计算局部最优反馈策略 $\delta u = -K \delta x - k$，其中 $k_i$ 是前馈改进，$K_i$ 是反馈增益。前向传递中的线搜索确保单调代价下降。

**关键性质：**
- **关于时域线性。** 反向传递是 $O(N)$——远比求解 $N m \times N m$ 的压缩QP便宜。
- **不需要显式QP求解器。** Riccati递推取代了它。
- **约束处理差。** DDP/iLQR本质上是 unconstrained（像LQR）。控制上的盒约束可以通过前向传递中的钳位处理，但这破坏了Riccati最优性保证。一般不等式约束需要增广Lagrangian或障碍扩展。
- **局部收敛。** 像Newton法，DDP在最优值附近二次收敛，但从差的初始化可能发散。

DDP及其变体（iLQR、SLQ、FDDP）在机器人轨迹优化中被广泛使用——步行机器人、操作、自动驾驶。其优势是速度和自然产生的反馈策略。其弱点是约束处理，这就是为什么约束变体（box-DDP、control-limited DDP）是活跃的研究领域。

#### Crocoddyl：实践中的DDP

[Crocoddyl](https://github.com/loco-3d/crocoddyl)（Control-RObot-COntrol via Differential DYnamic Library）是一个开源C++库，带Python绑定，由LAAS-CNRS和Inria机器人组开发。它实现了DDP、FDDP（可行性驱动DDP）和多重打靶DDP——全部建立在刚体动力学库[Pinocchio](https://github.com/stack-of-tasks/pinocchio)之上。

名字是"crocodile"的双关（DDP → crocodile → crocoddyl），因为DDP对轨迹优化就像鳄鱼对沼泽：古老、高效，50年后仍是顶级掠食者。

**一个具体场景——四足小跑：**

一个12自由度四足机器人（如Solo、ANYmal）需要以1 m/s小跑。你指定：

- 接触调度：哪些脚在何时着地（例如4相爬行或2相小跑）。
- 接触约束：当脚 $i$ 在接触时，其速度为零且保持在摩擦锥内。
- 代价：跟踪期望CoM速度、保持躯干直立、最小化关节力矩和接触力。

Crocoddyl将此建模为一系列约束最优控制问题——每个步态阶段一个——每个由DDP求解，接触力作为控制向量的一部分。典型设置：

```python
import crocoddyl
import pinocchio

# 从URDF构建机器人模型
model = pinocchio.buildModelFromUrdf("solo.urdf")
state = crocoddyl.StateMultibody(model)
actuation = crocoddyl.ActuationModelFull(state)

# 运行代价：跟踪期望速度 + 正则化力矩
running_model = crocoddyl.IntegratedActionModelEuler(
    crocoddyl.DifferentialActionModelFreeFwdDynamics(
        state, actuation,
        crocoddyl.CostModelSum(state, actuation)))
running_model.differential.costs.add(
    "velTrack", crocoddyl.CostModelResidual(
        state, crocoddyl.ResidualModelFrameVelocity(...)), weight=10)
running_model.differential.costs.add(
    "torqueReg", crocoddyl.CostModelResidual(
        state, crocoddyl.ResidualModelControl(state)), weight=0.01)

# 堆叠 N 个打靶节点 → OCP
problem = crocoddyl.ShootingProblem(x0, [running_model]*N, running_model)

# FDDP求解器：可行性驱动DDP（处理不可行热启动）
solver = crocoddyl.SolverFDDP(problem)
solver.solve([x0]*N, [np.zeros(12)]*N)  # 从站立热启动
```

每次FDDP迭代做一次反向Riccati传递（第4.4节的 $O(N)$ 递推），然后做一次确保动力学满足的前向线搜索——"可行性驱动"意味着即使在早期迭代也不会产生违反接触约束的轨迹。典型求解对50节点时域需要5–20次迭代，在现代笔记本CPU上以50–100 Hz的重规划速率运行。

输出是力矩前馈轨迹加上每个节点的时变反馈增益 $K_k$——正是轨迹跟踪中的 $u_k = u^{\text{ff}}_k - K_k (x_k - \bar{x}_k)$ 结构。机器人执行第一个力矩命令、重新测量状态、移位轨迹、重新求解。这就是用DDP引擎而非QP引擎的MPC。

**为什么四足用DDP而非多重打靶？** 四足机器人欠驱动、频繁建立和断开接触、有短的飞行相需要快速解。DDP的反向传递是 $O(N)$，没有大小为 $N$ 的矩阵分解，当你有12个状态和50节点时域以100 Hz运行时，这很重要。用一般NLP求解器的多重打靶在同一问题上每次迭代会慢10–100倍。

该库是生产级的：已用于实时控制Solo四足、Talos人形和Tiago移动操作器。如果你想看DDP驱动的非线性MPC在真实硬件上运行，Crocoddyl是参考实现。

#### 转变：为什么RL正在取代DDP/MPC用于人形运动

尽管DDP驱动的MPC数学优雅，但如果你看2025–2026年驱动当前代人形机器人的技术——Unitree H1、Tesla Optimus、Figure 02、Boston Dynamics Atlas（电动版）——控制栈不是DDP。它是从神经网络学到的策略，通常在仿真中用强化学习（Reinforcement Learning, RL）训练，通过域随机化零样本部署到硬件。

这是真正的范式转变，值得理解为什么发生。

**1. DDP需要显式接触调度；RL发现接触时机。**

DDP需要你指定*何时*每只脚在接触。对四足小跑，这很容易——四个相位、固定时序。对人形在不平地形上行走、推车、或从推搡中恢复，接触序列是解的一部分，不是输入的一部分。DDP可以通过互补约束或混合整数规划处理可变接触时机，但这些把光滑OCP变成了组合问题。RL不在乎——策略通过仿真中的试错隐式学习接触，无需显式模式枚举。

**2. 模型差距是真实的，RL通过在差距上训练来作弊。**

DDP的动力学模型——通常是带简化接触的刚体动力学——在关键方面是错的。齿轮间隙、缆绳拉伸、脚部变形、执行器带宽限制、传感器延迟。DDP给你错误模型的最优计划，反馈项 $-K_k(x_k - \bar{x}_k)$只能校正这么多。RL在仿真器中训练，你*选择*包含什么物理——你可以在训练期间添加随机电机延迟、脚部滑移、质量变化和传感器噪声。得到的策略见过差距并学会了补偿。它不是经典意义上的"最优"，但它是鲁棒的。

**3. 感知集成在RL中是自然的，在MPC中是外挂的。**

人形走过门或踏上箱子需要融合视觉、本体感觉和脚部接触为单一控制决策。在MPC流水线中，这通常意味着：运行感知模块提取高度图或代价图，送入脚步规划器，送入轨迹优化器，送入全身控制器——一串显式优化问题，每个有自己的假设和失败模式。在RL流水线中，观测向量可以包含高度图编码、关节状态、基座速度和前一步动作——策略学习从像素到力矩的端到端映射。中间表示（脚步、CoM轨迹）消失了。这减少了工程复杂性，消除了链式优化器的复合误差。

**4. 部署：一次前向传播 vs. 优化循环。**

运行时，RL策略是单次神经网络前向传播——通常在GPU或板载加速器上0.1–0.5 ms，延迟确定。DDP即使有FDDP优化，也是2–20 ms的CPU优化，求解时间随热启动离最优多远而变化。对50自由度人形以500+ Hz关节控制运行，延迟预算很紧。而且你还要与状态估计、感知和通信共享。

**5. 训练痛苦是摊销的。**

支持MPC的反论点是它不需要训练——你写下动力学和代价，它就能工作。RL需要数周GPU仿真训练、仔细的奖励塑形、域随机化调参、sim-to-real验证。那是巨大的前期成本。但对一个产品（Optimus、Atlas、H1），你会把同一策略部署到数千台，前期成本被摊销。MPC原型更快；RL大规模部署更便宜。

**DDP/MPC仍然赢的地方（目前）：**

这不是说DDP驱动的控制过时了。它在以下场景仍然主导：

- 接触模式已知且简单（四足、固定步态运动）。
- 任务需要精确约束满足（紧公差的工业操作）。
- 环境结构化且模型好（工厂车间、实验台）。
- 你需要可解释的失败模式——MPC违反约束有明确的优化含义；RL策略输出危险的大力矩是调试的黑箱。

而且界限正在模糊。一些最好的结果结合两者：RL策略提出参考轨迹，DDP/MPC层以约束保证跟踪它。这大致是Boston Dynamics描述的Spot控制器。RL处理"做什么"（接触策略、步态选择），MPC处理"怎么做"（关节限制下的力矩计算）。

**底线：** 控制的历史是从手调（PID）到基于模型的最优（LQR）到约束在线优化（MPC）的稳步推进。第四幕，现在在人形机器人中上演，是用从观测到动作的学习映射替换整个栈——模型、优化器、约束。它在哲学上更接近PID而非LQR：运行时没有显式模型，没有在线优化，只是当前状态的函数。区别在于PID的函数是三个增益，RL的函数是几百万个参数。

---

## 5. 全景图

| 方法 | 每步QP/NLP数 | 动力学满足 | 约束处理 | 典型用途 |
|------|-------------|-----------|---------|---------|
| **LTV-MPC**（单次线性化） | 1 QP | 不保证，误差随时域增长 | $U$ 上的线性约束 | 慢过程、温和非线性 |
| **SQP**（完全收敛） | 2–10 QP | 在容差内 | 每个QP中的线性约束 | 中速系统、中等非线性 |
| **RTI**（每步1次SQP迭代） | 1 QP | 随时间改善，不在步内 | 与SQP相同 | 自动驾驶、无人机、快速嵌入式NMPC |
| **多重打靶** | 1 NLP（SQP或IP） | 收敛时精确 | 完整——路径约束、终端约束 | 化工过程、火箭着陆、足式运动 |
| **DDP / iLQR** | 0 QP（Riccati传递） | 收敛时精确 | 原生差；约束用增广Lagrangian | 轨迹优化、机器人运动规划 |

---

## 6. 领域现状

非线性MPC的前沿是让它更快、处理更难的问题：

**学习动力学。** 不是从第一性原理推导 $f(x, u)$，而是用数据拟合神经网络。网络的Jacobian送入SQP或多重打靶求解器。这在基于模型的RL中是标准做法，在第一性原理建模昂贵的工业MPC中越来越多地使用。

**采样MPC（MPPI）。** 对太非线性或非光滑不适于梯度优化的系统（接触、混合动力学），模型预测路径积分控制（Model Predictive Path Integral Control）采样数千个随机控制序列，在GPU上并行仿真，按代价加权。没有梯度。没有QP。只有暴力仿真 + 指数加权。用于激进自动驾驶和某些足式机器人控制器。

**嵌入式优化。** acados、Forces Pro和HPIPM等求解器可以在嵌入式ARM处理器上对5–10状态、10–50步时域的系统在1毫秒内求解多重打靶NLP。这就是非线性MPC在无人机和小型机器人上实用的原因。

**非凸约束处理。** 最难的问题——避障（非凸可行集）、接触动力学（互补约束）、混合系统（模式切换）——仍然部分开放。凸松弛、混合整数规划和采样方法各自覆盖部分空间，但没有通用解。

---

## 7. 要带走什么

如果你跟随了这个仓库的递进——PID → LQR → 线性MPC → 非线性MPC——这是弧线：

1. **PID** 在系统简单、可以凭感觉调参时工作。
2. **LQR** 在你有好的线性模型、约束宽松时工作。它给你可证明的最优性和保证的稳定裕度。
3. **线性MPC**（压缩QP）在约束重要时工作。它把动态问题简化为在线求解的QP。
4. **非线性MPC** 在线性模型不够好时工作。它用迭代交换一次性QP：SQP循环、多重打靶、或非线性动力学上的Riccati类反向传递。

这个递进的每一步增加真实感——和计算量。PID可忽略。LQR是一次矩阵求解。线性MPC是每步一个QP。非线性MPC是每步多个QP或一个完整NLP。

选择停在哪一级取决于三件事：你的被控对象实际有多非线性、你的控制环路必须跑多快、稍微次优（线性化非线性被控对象）的代价是否高于额外计算的代价。

---

## 8. 参考文献

1. **Diehl, M., Bock, H.G., Schlöder, J.P., Findeisen, R., Nagy, Z., & Allgöwer, F. (2002).** "Real-time optimization and nonlinear model predictive control of processes governed by differential-algebraic equations." *Journal of Process Control.* —— RTI方案：每个时间步一次SQP迭代。

2. **Gros, S., Zanon, M., Quirynen, R., Bemporad, A., & Diehl, M. (2020).** "From linear to nonlinear MPC: bridging the gap via the real-time iteration." *International Journal of Control.* —— 从线性到非线性MPC过渡策略的综述。

3. **Jacobson, D.H. & Mayne, D.Q. (1970).** *Differential Dynamic Programming.* Elsevier. —— 原始DDP：非线性动力学上的反向Riccati传递。

4. **Tassa, Y., Mansard, N., & Todorov, E. (2014).** "Control-limited differential dynamic programming." *IEEE ICRA.* —— 带控制盒约束的iLQR；在机器人中广泛实现。

5. **Rawlings, J.B., Mayne, D.Q., & Diehl, M. (2017).** *Model Predictive Control: Theory, Computation, and Design.* Nob Hill. —— 第8–9章全面覆盖非线性MPC。

6. **Biegler, L.T. (2010).** *Nonlinear Programming: Concepts, Algorithms, and Applications to Chemical Processes.* SIAM. —— 动态优化SQP和内点法的权威参考。

7. **Verschueren, R., Frison, G., Kouzoupis, D., Frey, J., van Duijkeren, N., Zanelli, A., Novoselnik, B., Albin, T., Quirynen, R., & Diehl, M. (2022).** "acados — a modular open-source framework for fast embedded optimal control." *Mathematical Programming Computation.* —— 现代嵌入式NMPC背后的求解器框架。

8. **Williams, G., Aldrich, A., & Theodorou, E.A. (2017).** "Model Predictive Path Integral Control: From Theory to Parallel Computation." *Journal of Guidance, Control, and Dynamics.* —— MPPI：带GPU加速的采样非线性MPC。

9. **Kouzoupis, D., Frison, G., Zanelli, A., & Diehl, M. (2018).** "Recent advances in quadratic programming algorithms for nonlinear model predictive control." *Vietnam Journal of Mathematics.* —— QP求解器如何为NMPC中的SQP子问题适配。

---

*本文档完成了 `Controllers-from-PID-to-QP_MPC` 仓库中的控制器演进弧线。从 `pid_explorer.html`（经典控制）开始，继续到 `lqr_explorer.html`（最优控制）、`servo_qp_mpc.html`（约束线性MPC），以及本文档的非线性前沿。LP → QP → LQR优化层级见 `from_lp_to_qp_to_lqr.md`。LQR和MPC的轨迹跟踪见 `trajectory_tracking_lqr_mpc.md`。*
