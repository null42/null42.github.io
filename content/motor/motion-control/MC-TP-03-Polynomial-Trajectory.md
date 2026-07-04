---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-03: 多项式轨迹规划"
tags:
  - motor-control
status: learning
summary: 用代数保证平滑——从三次到七次多项式的优雅之旅
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-03: 多项式轨迹规划

## 副标题

用代数保证平滑——从三次到七次多项式的优雅之旅

## 难度



## 适用对象

- 机器人轨迹规划工程师
- 伺服系统算法工程师
- 数控系统开发者
- 控制理论研究者

## 前置知识

- MC-TP-01: 运动学基础与约束
- MC-TP-02: 梯形与S曲线速度规划
- CT-10: 状态空间模型
- 线性代数基础（矩阵求解）

## 核心摘要

多项式轨迹规划通过选择多项式阶数来保证轨迹的连续性：三次多项式保证速度连续（C¹），五次多项式保证加速度连续（C²），七次多项式保证jerk连续（C³）。边界条件被表述为线性方程组，求解即可得到多项式系数。与S曲线相比，多项式轨迹更灵活（可指定任意边界条件），但计算量更大，且约束满足需要额外验证。本模块详细推导三/五/七次多项式的边界条件方程，讨论连续性分析，并给出完整的C语言实现。

## 问题引入

### 工程场景

**场景1：机器人关节空间的点到点运动**

六轴机器人的每个关节需要从角度 $\theta_1$ 运动到 $\theta_2$，且起始和终止速度、加速度均为0。三次多项式可以满足位置和速度的边界条件，但加速度在端点不连续，导致关节力矩突变。五次多项式可以同时指定加速度边界条件，实现力矩的平滑过渡。

**场景2：多路径点的平滑插值**

机器人需要经过多个路径点（via-points），每个点有指定的位置和速度。使用分段三次多项式（样条）可以保证位置和速度连续，但加速度在路径点处可能不连续，导致振动。使用五次B样条可以同时保证加速度连续。

**场景3：精密跟踪的轨迹生成**

激光加工中，激光头需要精确跟踪预定轨迹。轨迹不仅要位置连续，还需要速度和加速度都连续，否则激光功率与速度的不匹配会导致加工质量下降。七次多项式可以保证jerk连续，使加速度变化率也受控。

### 核心问题

> 多项式的阶数与连续性有什么关系？如何将边界条件转化为线性方程组？多项式轨迹与S曲线相比各有什么优劣？

## 原理推导

### 1. 三次多项式（Cubic Polynomial）

#### 1.1 形式与自由度

三次多项式有4个系数，对应4个自由度（DOF）：

$$
q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3, \quad t \in [0, T]
$$

4个DOF恰好可以指定起始和终止的位置与速度：

$$
\begin{cases}
q(0) = q_s \\
\dot{q}(0) = v_s \\
q(T) = q_e \\
\dot{q}(T) = v_e
\end{cases}
$$

#### 1.2 边界条件方程

代入多项式及其导数：

$$
\begin{aligned}
q(0) &= a_0 = q_s \\
\dot{q}(0) &= a_1 = v_s \\
q(T) &= a_0 + a_1 T + a_2 T^2 + a_3 T^3 = q_e \\
\dot{q}(T) &= a_1 + 2a_2 T + 3a_3 T^2 = v_e
\end{aligned}
$$

求解得：

$$
\begin{aligned}
a_0 &= q_s \\
a_1 &= v_s \\
a_2 &= \frac{3(q_e - q_s) - (2v_s + v_e)T}{T^2} \\
a_3 &= \frac{-2(q_e - q_s) + (v_s + v_e)T}{T^3}
\end{aligned}
$$

#### 1.3 加速度分析

$$
\begin{aligned}
\ddot{q}(t) &= 2a_2 + 6a_3 t \\
\ddot{q}(0) &= 2a_2 \\
\ddot{q}(T) &= 2a_2 + 6a_3 T
\end{aligned}
$$

**关键问题**：三次多项式的加速度在端点不可指定！当 $v_s = v_e = 0$ 时：

$$
\ddot{q}(0) = \frac{6(q_e - q_s)}{T^2}, \quad \ddot{q}(T) = -\frac{6(q_e - q_s)}{T^2}
$$

这意味着加速度在起始和终止点不为零，存在加速度跳变（C¹连续但非C²连续）。

### 2. 五次多项式（Quintic Polynomial）

#### 2.1 形式与自由度

五次多项式有6个系数，6个DOF：

$$
q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5
$$

可以指定起始和终止的位置、速度、加速度：

$$
\begin{cases}
q(0) = q_s, \quad \dot{q}(0) = v_s, \quad \ddot{q}(0) = a_s \\
q(T) = q_e, \quad \dot{q}(T) = v_e, \quad \ddot{q}(T) = a_e
\end{cases}
$$

#### 2.2 边界条件方程

写成矩阵形式 $\mathbf{M} \mathbf{a} = \mathbf{b}$：

$$
\begin{bmatrix}
1 & 0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 \\
0 & 0 & 2 & 0 & 0 & 0 \\
1 & T & T^2 & T^3 & T^4 & T^5 \\
0 & 1 & 2T & 3T^2 & 4T^3 & 5T^4 \\
0 & 0 & 2 & 6T & 12T^2 & 20T^3
\end{bmatrix}
\begin{bmatrix}
a_0 \\ a_1 \\ a_2 \\ a_3 \\ a_4 \\ a_5
\end{bmatrix}
=
\begin{bmatrix}
q_s \\ v_s \\ a_s \\ q_e \\ v_e \\ a_e
\end{bmatrix}
$$

解析解（当 $v_s = v_e = 0$, $a_s = a_e = 0$ 时）：

$$
\begin{aligned}
a_0 &= q_s \\
a_1 &= 0 \\
a_2 &= 0 \\
a_3 &= \frac{10(q_e - q_s)}{T^3} \\
a_4 &= -\frac{15(q_e - q_s)}{T^4} \\
a_5 &= \frac{6(q_e - q_s)}{T^5}
\end{aligned}
$$

#### 2.3 连续性保证

五次多项式保证：
- C⁰连续：位置连续 
- C¹连续：速度连续 
- C²连续：加速度连续 
- C³连续：jerk连续 （jerk在端点不为零）

$$
\dddot{q}(t) = 6a_3 + 24a_4 t + 60a_5 t^2
$$

#### 2.4 峰值速度与加速度

对于零边界条件（$v_s = v_e = 0$, $a_s = a_e = 0$）：

峰值速度出现在 $t = T/2$：

$$
\dot{q}_{peak} = \frac{15(q_e - q_s)}{8T}
$$

峰值加速度出现在 $t \approx 0.2113T$ 和 $t \approx 0.7887T$：

$$
\ddot{q}_{peak} \approx \pm \frac{10\sqrt{5}(q_e - q_s)}{T^2} \approx \pm \frac{22.36(q_e - q_s)}{T^2}
$$

### 3. 七次多项式（Septic Polynomial）

#### 3.1 形式与自由度

七次多项式有8个系数，8个DOF：

$$
q(t) = \sum_{i=0}^{7} a_i t^i
$$

可以指定起始和终止的位置、速度、加速度、jerk：

$$
\begin{cases}
q(0) = q_s, \quad \dot{q}(0) = v_s, \quad \ddot{q}(0) = a_s, \quad \dddot{q}(0) = j_s \\
q(T) = q_e, \quad \dot{q}(T) = v_e, \quad \ddot{q}(T) = a_e, \quad \dddot{q}(T) = j_e
\end{cases}
$$

#### 3.2 边界条件矩阵

$$
\begin{bmatrix}
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 2 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 6 & 0 & 0 & 0 & 0 \\
1 & T & T^2 & T^3 & T^4 & T^5 & T^6 & T^7 \\
0 & 1 & 2T & 3T^2 & 4T^3 & 5T^4 & 6T^5 & 7T^6 \\
0 & 0 & 2 & 6T & 12T^2 & 20T^3 & 30T^4 & 42T^5 \\
0 & 0 & 0 & 6 & 24T & 60T^2 & 120T^3 & 210T^4
\end{bmatrix}
\mathbf{a} = \mathbf{b}
$$

#### 3.3 零边界条件解析解

当所有边界速度、加速度、jerk均为0时：

$$
\begin{aligned}
a_0 &= q_s \\
a_3 &= \frac{35(q_e - q_s)}{T^4} \quad \text{（注意：$a_1=a_2=0$）} \\
a_4 &= -\frac{84(q_e - q_s)}{T^5} \\
a_5 &= \frac{70(q_e - q_s)}{T^6} \\
a_6 &= -\frac{20(q_e - q_s)}{T^7}
\end{aligned}
$$

（$a_7 = 0$ 在此特殊情况下）

实际上更精确的零边界七次多项式为：

$$
q(t) = q_s + (q_e - q_s)\left[35\tau^4 - 84\tau^5 + 70\tau^6 - 20\tau^7\right]
$$

其中 $\tau = t/T$ 为归一化时间。

### 4. 连续性分析

| 多项式阶数 | DOF | C⁰ | C¹ | C² | C³ | 可指定边界条件 |
|-----------|-----|-----|-----|-----|-----|--------------|
| 三次(3) | 4 |  |  |  |  | $q_s, v_s, q_e, v_e$ |
| 五次(5) | 6 |  |  |  |  | $q_s, v_s, a_s, q_e, v_e, a_e$ |
| 七次(7) | 8 |  |  |  |  | $q_s, v_s, a_s, j_s, q_e, v_e, a_e, j_e$ |

**Cⁿ连续的含义**：
- C⁰：位置连续（无跳跃）
- C¹：速度连续（无速度跳变）
- C²：加速度连续（无力矩跳变）
- C³：jerk连续（无加速度变化率跳变）

### 5. Via-Point插值

当轨迹需要经过多个中间点时，使用分段多项式（样条）：

**方法1：分段三次样条**

每个区间用三次多项式，在via-point处保证C¹连续：

$$
\begin{cases}
q_i(t_i) = q_i \\
q_i(t_{i+1}) = q_{i+1} \\
\dot{q}_i(t_{i+1}) = \dot{q}_{i+1}(t_{i+1}) \quad \text{（速度连续）}
\end{cases}
$$

自由度不足，需要额外指定via-point的速度（或使用自然样条条件）。

**方法2：分段五次样条**

每个区间用五次多项式，在via-point处保证C²连续：

$$
\dot{q}_i(t_{i+1}) = \dot{q}_{i+1}(t_{i+1}), \quad \ddot{q}_i(t_{i+1}) = \ddot{q}_{i+1}(t_{i+1})
$$

### 6. 多项式 vs S曲线对比

| 特性 | 多项式 | S曲线 |
|------|-------|-------|
| 平滑性 | 由阶数决定 | C²（加速度连续） |
| 约束保证 | 不保证，需后验验证 | 构造性保证 |
| 计算复杂度 | 矩阵求解 | 解析公式 |
| 灵活性 | 高（任意边界条件） | 中（固定结构） |
| 约束满足 | 需要迭代调整T | 自动满足 |
| 实时性 | 可预计算 | 适合在线生成 |

**关键差异**：S曲线的约束满足是构造性的——只要参数合理，速度、加速度、jerk一定不超限。多项式轨迹的约束满足则需要额外验证，可能需要迭代调整运动时间T。

## 工程实现

### 五次多项式轨迹生成器

```c
#include <math.h>
#include <string.h>

/* 多项式轨迹参数 */
typedef struct {
    double coeff[6];  /* a0~a5 */
    double T;         /* 运动时间 */
    double q_start;
    double q_end;
} QuinticTrajectory;

/* 五次多项式规划：指定位置、速度、加速度边界条件 */
int quintic_plan(
    double q_s, double v_s, double a_s,
    double q_e, double v_e, double a_e,
    double T,
    QuinticTrajectory *traj)
{
    if (T <= 0.0) return -1;

    traj->T = T;
    traj->q_start = q_s;
    traj->q_end = q_e;

    double T2 = T * T;
    double T3 = T2 * T;
    double T4 = T3 * T;
    double T5 = T4 * T;

    /* 直接解析解 */
    double dq = q_e - q_s;

    traj->coeff[0] = q_s;
    traj->coeff[1] = v_s;
    traj->coeff[2] = 0.5 * a_s;

    /* 求解 a3, a4, a5 */
    /* 由边界条件：
       q(T) = a0 + a1*T + a2*T² + a3*T³ + a4*T⁴ + a5*T⁵ = q_e
       v(T) = a1 + 2*a2*T + 3*a3*T² + 4*a4*T³ + 5*a5*T⁴ = v_e
       a(T) = 2*a2 + 6*a3*T + 12*a4*T² + 20*a5*T³ = a_e
    */
    double rhs1 = q_e - q_s - v_s * T - 0.5 * a_s * T2;
    double rhs2 = v_e - v_s - a_s * T;
    double rhs3 = a_e - a_s;

    /* 3x3 线性系统 */
    double M[3][3] = {
        {T3,    T4,     T5},
        {3*T2,  4*T3,   5*T4},
        {6*T,   12*T2,  20*T3}
    };

    /* Cramer法则求解 */
    double det = M[0][0]*(M[1][1]*M[2][2] - M[1][2]*M[2][1])
               - M[0][1]*(M[1][0]*M[2][2] - M[1][2]*M[2][0])
               + M[0][2]*(M[1][0]*M[2][1] - M[1][1]*M[2][0]);

    if (fabs(det) < 1e-15) return -2;  /* 奇异矩阵 */

    double det1 = rhs1*(M[1][1]*M[2][2] - M[1][2]*M[2][1])
                - M[0][1]*(rhs2*M[2][2] - M[1][2]*rhs3)
                + M[0][2]*(rhs2*M[2][1] - M[1][1]*rhs3);

    double det2 = M[0][0]*(rhs2*M[2][2] - M[1][2]*rhs3)
                - rhs1*(M[1][0]*M[2][2] - M[1][2]*M[2][0])
                + M[0][2]*(M[1][0]*rhs3 - rhs2*M[2][0]);

    double det3 = M[0][0]*(M[1][1]*rhs3 - rhs2*M[2][1])
                - M[0][1]*(M[1][0]*rhs3 - rhs2*M[2][0])
                + rhs1*(M[1][0]*M[2][1] - M[1][1]*M[2][0]);

    traj->coeff[3] = det1 / det;
    traj->coeff[4] = det2 / det;
    traj->coeff[5] = det3 / det;

    return 0;
}

/* 五次多项式求值 */
void quintic_evaluate(
    const QuinticTrajectory *traj,
    double t,
    double *q, double *v, double *a, double *j)
{
    double tc = t;
    if (tc < 0.0) tc = 0.0;
    if (tc > traj->T) tc = traj->T;

    double c0 = traj->coeff[0];
    double c1 = traj->coeff[1];
    double c2 = traj->coeff[2];
    double c3 = traj->coeff[3];
    double c4 = traj->coeff[4];
    double c5 = traj->coeff[5];

    /* Horner法则求值 */
    *q = c0 + tc*(c1 + tc*(c2 + tc*(c3 + tc*(c4 + tc*c5))));
    *v = c1 + tc*(2*c2 + tc*(3*c3 + tc*(4*c4 + tc*5*c5)));
    *a = 2*c2 + tc*(6*c3 + tc*(12*c4 + tc*20*c5));
    *j = 6*c3 + tc*(24*c4 + tc*60*c5);
}

/* 约束验证：检查轨迹是否满足速度和加速度限制 */
int quintic_check_constraints(
    const QuinticTrajectory *traj,
    double v_max, double a_max,
    int n_samples)
{
    double dt = traj->T / n_samples;

    for (int i = 0; i <= n_samples; i++) {
        double t = i * dt;
        double q, v, a, j;
        quintic_evaluate(traj, t, &q, &v, &a, &j);

        if (fabs(v) > v_max) return -1;  /* 速度超限 */
        if (fabs(a) > a_max) return -2;  /* 加速度超限 */
    }
    return 0;
}

/* 自动计算满足约束的最短时间 */
double quintic_min_time(
    double q_s, double v_s, double a_s,
    double q_e, double v_e, double a_e,
    double v_max, double a_max,
    double T_guess)
{
    double T = T_guess;
    double T_min = 0.001;  /* 最小时间 */
    double T_max = 100.0;  /* 最大时间 */

    /* 二分搜索满足约束的最短时间 */
    for (int iter = 0; iter < 50; iter++) {
        QuinticTrajectory traj;
        int ret = quintic_plan(q_s, v_s, a_s, q_e, v_e, a_e, T, &traj);
        if (ret != 0) {
            T = 2.0 * T;
            continue;
        }

        int check = quintic_check_constraints(&traj, v_max, a_max, 200);
        if (check == 0) {
            /* 满足约束，尝试缩短时间 */
            T_max = T;
            T = 0.5 * (T_min + T_max);
        } else {
            /* 不满足约束，增加时间 */
            T_min = T;
            T = 0.5 * (T_min + T_max);
        }
    }

    return T_max;
}
```

### 七次多项式轨迹生成器

```c
/* 七次多项式参数 */
typedef struct {
    double coeff[8];  /* a0~a7 */
    double T;
} SepticTrajectory;

/* 七次多项式规划：零边界条件特例 */
int septic_plan_zero_boundary(
    double q_s, double q_e,
    double T,
    SepticTrajectory *traj)
{
    if (T <= 0.0) return -1;

    traj->T = T;
    double dq = q_e - q_s;
    double T2 = T*T, T3 = T2*T, T4 = T3*T;
    double T5 = T4*T, T6 = T5*T, T7 = T6*T;

    memset(traj->coeff, 0, sizeof(traj->coeff));

    /* 零边界条件：v=a=j=0 at both ends */
    traj->coeff[0] = q_s;
    traj->coeff[4] = 35.0 * dq / T4;
    traj->coeff[5] = -84.0 * dq / T5;
    traj->coeff[6] = 70.0 * dq / T6;
    traj->coeff[7] = -20.0 * dq / T7;

    return 0;
}

/* 七次多项式求值 */
void septic_evaluate(
    const SepticTrajectory *traj,
    double t,
    double *q, double *v, double *a, double *j)
{
    double tc = (t < 0.0) ? 0.0 : (t > traj->T ? traj->T : t);
    double *c = traj->coeff;

    *q = c[0] + tc*(c[1] + tc*(c[2] + tc*(c[3] + tc*(c[4] + tc*(c[5] + tc*(c[6] + tc*c[7]))))));
    *v = c[1] + tc*(2*c[2] + tc*(3*c[3] + tc*(4*c[4] + tc*(5*c[5] + tc*(6*c[6] + tc*7*c[7])))));
    *a = 2*c[2] + tc*(6*c[3] + tc*(12*c[4] + tc*(20*c[5] + tc*(30*c[6] + tc*42*c[7]))));
    *j = 6*c[3] + tc*(24*c[4] + tc*(60*c[5] + tc*(120*c[6] + tc*210*c[7])));
}
```

## 参数整定/调试指南

### 1. 运动时间T的选择

多项式轨迹的峰值速度和加速度与T的关系：

| 阶数 | 峰值速度 | 峰值加速度 |
|------|---------|-----------|
| 三次 | $\frac{3\Delta q}{2T}$ | $\frac{6\Delta q}{T^2}$ |
| 五次 | $\frac{15\Delta q}{8T}$ | $\frac{10\sqrt{5}\Delta q}{T^2}$ |
| 七次 | $\frac{35\Delta q}{16T}$ | $\approx\frac{59\Delta q}{T^2}$ |

给定约束 $v_{max}$ 和 $a_{max}$，最小时间估算：

$$
T_{min} \geq \max\left(\frac{15\Delta q}{8 v_{max}}, \sqrt{\frac{10\sqrt{5}\Delta q}{a_{max}}}\right)
$$

### 2. 约束不满足时的调整策略

1. **增大T**：最直接的方法，但牺牲效率
2. **调整边界条件**：允许非零的起始/终止加速度，减少峰值
3. **使用更高阶多项式**：增加自由度，但可能引入更多振荡
4. **分段规划**：将长距离分成多段，每段独立优化

### 3. Runge现象

高阶多项式（>7次）在区间端点附近可能出现剧烈振荡（Runge现象）。建议：
- 避免使用超过7次的多项式
- 如需更高连续性，使用分段低阶多项式（样条）

### 4. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 速度超限 | T太小 | 增大T或使用min_time自动计算 |
| 加速度超限 | T太小或边界加速度不合理 | 增大T，设a_s=a_e=0 |
| 轨迹振荡 | 多项式阶数过高 | 降低阶数或分段 |
| 端点不精确 | 浮点误差 | 使用归一化时间τ=t/T |
| Via-point处速度跳变 | 分段多项式未保证C¹ | 添加速度连续性约束 |

## 硬件约束

### 1. 计算量

多项式求值使用Horner法则，n次多项式需要n次乘法和n次加法：

| 阶数 | 乘法次数 | 加法次数 | 适合MCU |
|------|---------|---------|---------|
| 三次 | 3 | 3 | 所有MCU |
| 五次 | 5 | 5 | Cortex-M3+ |
| 七次 | 7 | 7 | Cortex-M4+ |

### 2. 系数存储

| 阶数 | 系数个数 | 存储空间(double) |
|------|---------|-----------------|
| 三次 | 4 | 32 bytes |
| 五次 | 6 | 48 bytes |
| 七次 | 8 | 64 bytes |

### 3. 数值稳定性

当T很大时，$T^n$ 可能溢出；当T很小时，$1/T^n$ 可能溢出。建议使用归一化时间：

$$
\tau = \frac{t}{T}, \quad \tau \in [0, 1]
$$

归一化后的多项式：

$$
q(\tau) = \sum_{i=0}^{n} b_i \tau^i
$$

这样所有系数的数量级与 $\Delta q$ 相当，数值稳定性好。

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| MC-TP-01 | 运动学约束：多项式轨迹的约束验证 |
| MC-TP-02 | S曲线：多项式与S曲线的对比 |
| CT-10 | 状态空间：多项式轨迹作为状态空间的参考输入 |
| CE-16 | LQR轨迹跟踪：多项式轨迹的跟踪控制 |
| MC-TP-04 | 多段拼接：多项式样条的多段拼接 |
| MC-TP-06 | 插补原理：多项式插补 |

## 参考文献

1. Biagiotti L., Melchiorri C., *Trajectory Planning for Automatic Machines and Robots*, Springer, 2008
2. Craig J.J., *Introduction to Robotics: Mechanics and Control*, Pearson, 2005
3. Gasparetto A., Boscariol P., Lanzutti A., Vidoni R., "Trajectory Planning in Robotics", *Mathematics in Industry*, 2012
4. Siciliano B., et al., *Robotics: Modelling, Planning and Control*, Springer, 2009
5. Villani L., Oriolo G., "Trajectory Planning", in *Springer Handbook of Robotics*, 2016
