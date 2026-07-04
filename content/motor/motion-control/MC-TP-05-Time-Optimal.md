---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-05: 时间最优轨迹规划"
tags:
  - motor-control
status: learning
summary: 在约束边界上起舞——Bang-Bang控制与时间最优理论
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-05: 时间最优轨迹规划

## 副标题

在约束边界上起舞——Bang-Bang控制与时间最优理论

## 难度



## 适用对象

- 高性能伺服系统算法工程师
- 机器人运动规划研究者
- 数控系统核心开发者
- 控制理论研究者

## 前置知识

- MC-TP-01: 运动学基础与约束
- MC-TP-02: 梯形与S曲线速度规划
- CT-13: LQR/LQG控制
- CE-15: LP/QP/LQR关系

## 核心摘要

时间最优轨迹规划的核心思想是：在满足所有物理约束的前提下，使运动时间最短。其解具有Bang-Bang结构——控制量始终在约束边界上切换。在仅有加速度约束时，时间最优退化为梯形速度规划；加入jerk约束后，变为三级Bang-Bang（jerk→加速度→jerk切换）。本模块从Pontryagin最大值原理出发，推导时间最优的必要条件，分析相平面切换曲线，讨论与LQR/QP的关系，并给出实用的工程实现。

## 问题引入

### 工程场景

**场景1：高速贴片机的最小周期**

SMT贴片机需要在最短时间内完成拾取-移动-放置循环。每毫秒的缩短都直接转化为产能提升。时间最优规划使贴片头始终运行在约束边界上，将循环时间从120ms压缩到95ms。

**场景2：工业机器人的快速拾放**

六轴机器人在码垛应用中，每个循环需要经过多个路径点。时间最优规划使每个关节都运行在最大加速度和最大速度的边界上，整体节拍提升15%。

**场景3：半导体晶圆传输**

真空机械手在腔室间传输晶圆，时间直接影响产线的吞吐量。时间最优规划在保证晶圆不滑落的前提下，将传输时间压缩到极限。

### 核心问题

> 时间最优轨迹的数学结构是什么？为什么一定是Bang-Bang？如何处理jerk约束？与LQR/QP有什么关系？

## 原理推导

### 1. 时间最优问题建模

#### 1.1 问题陈述

给定系统动力学：

$$
\ddot{q}(t) = u(t), \quad |u(t)| \leq a_{max}
$$

（更一般地，$\dddot{q}(t) = u(t)$, $|u(t)| \leq j_{max}$）

边界条件：

$$
q(0) = q_s, \quad \dot{q}(0) = v_s, \quad q(T) = q_e, \quad \dot{q}(T) = v_e
$$

目标：最小化 $T$。

#### 1.2 状态空间形式

$$
\begin{bmatrix} \dot{q} \\ \ddot{q} \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} q \\ \dot{q} \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u
$$

简记为 $\dot{\mathbf{x}} = A\mathbf{x} + Bu$。

### 2. Pontryagin最大值原理

#### 2.1 Hamilton函数

$$
H(\mathbf{x}, \mathbf{p}, u) = 1 + \mathbf{p}^T(A\mathbf{x} + Bu)
$$

其中 $\mathbf{p} = [p_1, p_2]^T$ 为协态向量。

#### 2.2 协态方程

$$
\dot{\mathbf{p}} = -\frac{\partial H}{\partial \mathbf{x}} = -A^T \mathbf{p}
$$

即：

$$
\dot{p}_1 = 0, \quad \dot{p}_2 = -p_1
$$

解为：

$$
p_1 = c_1, \quad p_2 = -c_1 t + c_2
$$

#### 2.3 最优控制

由最大值原理，最优控制使 $H$ 最小化：

$$
u^*(t) = -a_{max} \cdot \text{sgn}(p_2(t)) = -a_{max} \cdot \text{sgn}(-c_1 t + c_2)
$$

**关键结论**：最优控制是Bang-Bang的——控制量始终取 $\pm a_{max}$，且切换次数最多1次（因为 $p_2(t)$ 是线性函数，最多过一次零点）。

#### 2.4 切换结构

对于从 $q_s$ 到 $q_e$（$q_e > q_s$），起始和终止速度均为0的情况：

**情况1**：先加速后减速（最常见）

$$
u^*(t) = \begin{cases} +a_{max}, & 0 \leq t < t_{switch} \\ -a_{max}, & t_{switch} \leq t \leq T \end{cases}
$$

切换时间 $t_{switch} = T/2$（对称情况），总时间：

$$
T = 2\sqrt{\frac{q_e - q_s}{a_{max}}}
$$

**情况2**：先减速后加速（当起始速度过大时）

$$
u^*(t) = \begin{cases} -a_{max}, & 0 \leq t < t_{switch} \\ +a_{max}, & t_{switch} \leq t \leq T \end{cases}
$$

### 3. 相平面分析

#### 3.1 切换曲线

在速度-位置相平面上，切换曲线是关键概念。

从任意状态 $(q, \dot{q})$ 以 $u = -a_{max}$ 减速到 $\dot{q} = 0$ 的轨迹：

$$
q_f - q = \frac{\dot{q}^2}{2 a_{max}}
$$

即：

$$
q = q_f - \frac{\dot{q}^2}{2 a_{max}} \quad \text{（减速切换曲线）}
$$

类似地，以 $u = +a_{max}$ 加速的切换曲线：

$$
q = q_s + \frac{\dot{q}^2}{2 a_{max}} \quad \text{（加速切换曲线）}
$$

#### 3.2 相平面分区

切换曲线将相平面分为两个区域：

- **加速区**：状态在减速切换曲线上方 → 先加速
- **减速区**：状态在减速切换曲线下方 → 先减速

```
  速度 ↑
       |    减速切换曲线
       |   ╱
       |  ╱  先加速区
       | ╱
       |╱─────────── 先减速区
       |╲
       | ╲  减速切换曲线
       |  ╲
       ──────────────→ 位置
```

#### 3.3 加入速度约束

当加入 $|\dot{q}| \leq v_{max}$ 约束后，相平面上的可行域被截断：

$$
\begin{cases}
|\dot{q}| \leq v_{max} & \text{速度约束} \\
q + \frac{\dot{q}^2}{2a_{max}} \leq q_f & \text{减速到终点} \\
q - \frac{\dot{q}^2}{2a_{max}} \geq q_s & \text{加速从起点}
\end{cases}
$$

最优轨迹变为：加速→匀速→减速（即梯形速度规划）。

### 4. 加入Jerk约束的时间最优

#### 4.1 三级Bang-Bang

当控制变量为jerk（$\dddot{q} = u$, $|u| \leq j_{max}$），且同时有加速度约束 $|\ddot{q}| \leq a_{max}$ 时，最优控制变为三级Bang-Bang：

$$
u^*(t) = \begin{cases}
+j_{max}, & \text{段1: 加速度从0升到}a_{max} \\
0, & \text{段2: 加速度保持}a_{max} \\
-j_{max}, & \text{段3: 加速度从}a_{max}降到0 \\
0, & \text{段4: 匀速} \\
-j_{max}, & \text{段5: 加速度从0降到}-a_{max} \\
0, & \text{段6: 加速度保持}-a_{max} \\
+j_{max}, & \text{段7: 加速度从}-a_{max}\text{升到0}
\end{cases}
$$

**这正是七段S曲线！** S曲线就是加入jerk约束后的时间最优轨迹。

#### 4.2 退化情况

当距离较短时，某些段的时间为0：

- **无匀加速段**（$T_2 = T_6 = 0$）：加速度达不到 $a_{max}$
- **无匀速段**（$T_4 = 0$）：速度达不到 $v_{max}$
- **仅有jerk段**（$T_2 = T_4 = T_6 = 0$）：最极端的退化

#### 4.3 切换曲线的推广

在加速度-速度相平面上，切换曲线变为：

$$
\dot{q} = v_{switch}(\ddot{q}) = v_{target} - \frac{\ddot{q}^2}{2 j_{max}} - \frac{a_{max}^2}{2 j_{max}} \cdot \text{sgn}(\ddot{q})
$$

### 5. 与LQR的关系

#### 5.1 LQR趋近时间最优

考虑LQR问题：

$$
\min J = \int_0^T (\mathbf{x}^T Q \mathbf{x} + r u^2) dt
$$

当 $r \to 0$ 时（控制代价趋近于0），LQR的最优控制趋近于Bang-Bang控制：

$$
\lim_{r \to 0} u_{LQR}(t) = u_{time\_optimal}(t)
$$

**直觉理解**：当控制代价极低时，LQR会"毫不吝啬"地使用最大控制量，这与时间最优的Bang-Bang行为一致。

#### 5.2 实际意义

- LQR + 饱和 ≈ 时间最优（在约束边界附近）
- LQR提供了约束边界附近的平滑过渡
- 工程上常用LQR作为时间最优的"软化"版本

### 6. 与QP的关系

#### 6.1 时间最优的LP/QP形式

时间最优问题可以表述为线性规划（LP）或二次规划（QP）：

**LP形式**（最小化时间）：

$$
\min_{T, u} T \quad \text{s.t.} \quad |u(t)| \leq a_{max}, \quad \text{动力学约束}
$$

**QP形式**（最小化时间+控制平滑性）：

$$
\min_{T, u} T + \epsilon \int_0^T u^2(t) dt \quad \text{s.t.} \quad |u(t)| \leq a_{max}
$$

其中 $\epsilon > 0$ 是正则化参数。当 $\epsilon \to 0$，QP解趋近于LP解（时间最优）。

#### 6.2 离散化

将时间离散化为 $N$ 个步长，每个步长的控制为 $u_k$：

$$
\min \sum_{k=0}^{N-1} \Delta t \quad \text{s.t.} \quad |u_k| \leq a_{max}, \quad \text{离散动力学}
$$

这可以转化为标准LP/QP问题，用内点法或单纯形法求解。

### 7. 实用考虑

#### 7.1 鲁棒性裕度

严格的时间最优轨迹运行在约束边界上，对扰动极敏感。工程实践中需要留裕度：

$$
a_{used} = \eta \cdot a_{max}, \quad \eta \in [0.8, 0.95]
$$

裕度选择取决于：
- 负载变化范围
- 传感器噪声水平
- 模型不确定性

#### 7.2 不完全在约束边界上运行的原因

1. **模型不确定性**：实际 $a_{max}$ 可能低于标称值
2. **扰动**：外力可能导致加速度超限
3. **跟踪误差**：控制器无法完美跟踪Bang-Bang指令
4. **安全余量**：防止意外情况

## 工程实现

### 时间最优轨迹计算器

```c
#include <math.h>
#include <stdint.h>

/* 时间最优规划参数 */
typedef struct {
    double T_total;     /* 总时间 */
    double T_acc;       /* 加速时间 */
    double T_const;     /* 匀速时间 */
    double T_dec;       /* 减速时间 */
    double v_peak;      /* 峰值速度 */
    double a_used;      /* 实际使用的加速度 */
} TimeOptimalParams;

/* 带裕度的时间最优梯形规划 */
int time_optimal_trapezoidal(
    double q_s, double q_e,
    double v_s, double v_e,
    double v_max, double a_max,
    double margin,     /* 裕度系数 0.8~1.0 */
    TimeOptimalParams *params)
{
    double a_used = a_max * margin;
    double dist = fabs(q_e - q_s);
    double dir = (q_e > q_s) ? 1.0 : -1.0;
    double v_s_abs = fabs(v_s) * dir;
    double v_e_abs = fabs(v_e) * dir;

    /* 检查是否能达到v_max */
    /* 加速段距离 + 减速段距离 <= 总距离 */
    double dv_acc = v_max - v_s_abs;
    double dv_dec = v_max - v_e_abs;

    double q_acc = v_s_abs * (dv_acc / a_used) + 0.5 * a_used * (dv_acc / a_used) * (dv_acc / a_used);
    double q_dec = v_max * (dv_dec / a_used) - 0.5 * a_used * (dv_dec / a_used) * (dv_dec / a_used);

    if (q_acc + q_dec <= dist) {
        /* 梯形：能达到v_max */
        params->v_peak = v_max;
        params->T_acc = dv_acc / a_used;
        params->T_dec = dv_dec / a_used;
        double q_const = dist - q_acc - q_dec;
        params->T_const = q_const / v_max;
    } else {
        /* 三角形：达不到v_max */
        params->T_const = 0.0;
        /* 求解峰值速度 */
        /* v_peak² / (2*a) + v_peak² / (2*a) = dist (简化：v_s=v_e=0) */
        double v_peak_sq = 2.0 * a_used * dist;
        if (v_s_abs > 0 || v_e_abs > 0) {
            /* 非零边界速度：迭代求解 */
            double v_lo = fmax(v_s_abs, v_e_abs);
            double v_hi = v_max;
            for (int i = 0; i < 50; i++) {
                double v_mid = 0.5 * (v_lo + v_hi);
                double qa = v_s_abs * (v_mid - v_s_abs)/a_used + 0.5*(v_mid - v_s_abs)*(v_mid - v_s_abs)/a_used;
                double qd = v_mid * (v_mid - v_e_abs)/a_used - 0.5*(v_mid - v_e_abs)*(v_mid - v_e_abs)/a_used;
                if (qa + qd < dist) v_lo = v_mid;
                else v_hi = v_mid;
            }
            params->v_peak = v_lo;
        } else {
            params->v_peak = sqrt(v_peak_sq / 2.0);
        }
        params->T_acc = (params->v_peak - v_s_abs) / a_used;
        params->T_dec = (params->v_peak - v_e_abs) / a_used;
    }

    params->a_used = a_used;
    params->T_total = params->T_acc + params->T_const + params->T_dec;

    return 0;
}

/* 带Jerk约束的时间最优（S曲线） */
int time_optimal_scurve(
    double q_s, double q_e,
    double v_s, double v_e,
    double v_max, double a_max, double j_max,
    double margin,
    TimeOptimalParams *params)
{
    /* 使用裕度后的约束 */
    double a_used = a_max * margin;
    double v_used = v_max * margin;

    /* S曲线的时间最优就是MC-TP-02中的七段S曲线 */
    /* 关键区别：这里强调的是"时间最优"的视角 */
    /* S曲线 = 加入jerk约束后的时间最优解 */

    double T_j = a_used / j_max;  /* jerk过渡时间 */
    double dist = fabs(q_e - q_s);

    /* 计算加速到v_used所需的时间和距离 */
    double dv_acc = v_used - fabs(v_s);
    double dv_dec = v_used - fabs(v_e);

    /* 加速阶段 */
    double T_acc_jerk = 2.0 * T_j;  /* 两个jerk过渡段 */
    double dv_acc_jerk = j_max * T_j * T_j;  /* jerk段贡献的速度增量 */
    double T_acc_const = 0.0;

    if (dv_acc > dv_acc_jerk) {
        T_acc_const = (dv_acc - dv_acc_jerk) / a_used;
    } else {
        /* 加速度达不到a_used */
        T_acc_jerk = 2.0 * sqrt(dv_acc / j_max);
        T_acc_const = 0.0;
    }

    double T_acc = T_acc_jerk + T_acc_const;

    /* 减速阶段（对称计算） */
    double T_dec_jerk = 2.0 * T_j;
    double dv_dec_jerk = j_max * T_j * T_j;
    double T_dec_const = 0.0;

    if (dv_dec > dv_dec_jerk) {
        T_dec_const = (dv_dec - dv_dec_jerk) / a_used;
    } else {
        T_dec_jerk = 2.0 * sqrt(dv_dec / j_max);
        T_dec_const = 0.0;
    }

    double T_dec = T_dec_jerk + T_dec_const;

    /* 加速和减速阶段的位移（近似） */
    double q_acc = fabs(v_s) * T_acc + 0.5 * a_used * T_acc * T_acc * 0.5;
    double q_dec = v_used * T_dec - 0.5 * a_used * T_dec * T_dec * 0.5;

    double q_const = dist - q_acc - q_dec;
    double T_const = (q_const > 0) ? q_const / v_used : 0.0;

    params->T_acc = T_acc;
    params->T_dec = T_dec;
    params->T_const = T_const;
    params->T_total = T_acc + T_const + T_dec;
    params->v_peak = (T_const > 0) ? v_used : sqrt(2.0 * a_used * dist * 0.5);
    params->a_used = a_used;

    return 0;
}

/* 计算时间最优轨迹在任意时刻的状态 */
void time_optimal_evaluate(
    const TimeOptimalParams *params,
    double t,
    double q_s, double q_e,
    double v_s,
    double *q, double *v, double *a)
{
    double dir = (q_e > q_s) ? 1.0 : -1.0;
    double a_val = params->a_used * dir;

    if (t <= params->T_acc) {
        /* 加速段 */
        *a = a_val;
        *v = v_s + a_val * t;
        *q = q_s + v_s * t + 0.5 * a_val * t * t;
    } else if (t <= params->T_acc + params->T_const) {
        /* 匀速段 */
        double dt = t - params->T_acc;
        *a = 0.0;
        *v = v_s + a_val * params->T_acc;
        double q_at_acc_end = q_s + v_s * params->T_acc + 0.5 * a_val * params->T_acc * params->T_acc;
        *q = q_at_acc_end + *v * dt;
    } else if (t <= params->T_total) {
        /* 减速段 */
        double dt = t - params->T_acc - params->T_const;
        *a = -a_val;
        double v_at_const = v_s + a_val * params->T_acc;
        double q_at_const_end = q_s + v_s * params->T_acc + 0.5 * a_val * params->T_acc * params->T_acc
                              + v_at_const * params->T_const;
        *v = v_at_const - a_val * dt;
        *q = q_at_const_end + v_at_const * dt - 0.5 * a_val * dt * dt;
    } else {
        /* 超出时间范围 */
        *q = q_e;
        *v = 0.0;
        *a = 0.0;
    }
}
```

### 相平面切换曲线计算

```c
/* 计算相平面切换曲线上的点 */
double switching_curve_velocity(
    double q_current, double q_target,
    double a_max, int decelerating)
{
    double dq = q_target - q_current;

    if (decelerating) {
        /* 减速切换曲线：从当前状态减速到0 */
        /* v² = 2 * a_max * |dq| */
        return sqrt(2.0 * a_max * fabs(dq));
    } else {
        /* 加速切换曲线 */
        return sqrt(2.0 * a_max * fabs(dq));
    }
}

/* 判断当前状态应该加速还是减速 */
int should_accelerate(
    double q, double v,
    double q_target,
    double a_max)
{
    /* 减速切换曲线上的速度 */
    double v_switch = switching_curve_velocity(q, q_target, a_max, 1);

    if (q < q_target) {
        /* 目标在右侧 */
        return (v < v_switch) ? 1 : 0;
    } else {
        /* 目标在左侧 */
        return (v > -v_switch) ? 0 : 1;
    }
}
```

## 参数整定/调试指南

### 1. 裕度选择

| 应用 | 裕度 $\eta$ | 说明 |
|------|-----------|------|
| 实验室环境 | 0.95 | 负载已知，扰动小 |
| 工业生产 | 0.85~0.90 | 有负载变化 |
| 高可靠性 | 0.75~0.80 | 安全第一 |

### 2. 约束辨识

时间最优的前提是约束准确。约束辨识方法：

| 约束 | 辨识方法 | 精度要求 |
|------|---------|---------|
| $a_{max}$ | 阶跃速度响应，测量加速度 | ±5% |
| $v_{max}$ | 逐步增大速度给定，观察饱和 | ±2% |
| $j_{max}$ | 阶跃加速度响应，测量振动 | ±20% |

### 3. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 跟踪误差大 | Bang-Bang指令难以跟踪 | 增加前馈或降低裕度 |
| 振动 | jerk约束未考虑 | 使用S曲线代替梯形 |
| 超调 | 加速度约束过大 | 降低 $a_{max}$ 或增大裕度 |
| 运动时间偏长 | 约束过于保守 | 逐步增大约束，观察稳定性 |
| 相平面轨迹偏离 | 模型不准确 | 重新辨识系统参数 |

### 4. 从LQR到时间最优的过渡

工程实践中，可以逐步从LQR过渡到时间最优：

1. **阶段1**：标准LQR，$r$ 较大，控制平滑
2. **阶段2**：减小 $r$，控制更激进，接近约束边界
3. **阶段3**：加入饱和约束，LQR + anti-windup
4. **阶段4**：显式时间最优（Bang-Bang + jerk约束）

## 硬件约束

### 1. Bang-Bang控制的跟踪问题

Bang-Bang指令要求控制器瞬间切换加速度，实际系统中：

- 电流环带宽有限，无法瞬间改变电流
- PWM分辨率限制了电流步进
- 采样延迟导致跟踪滞后

**解决方案**：
- 使用加速度前馈 + 速度前馈
- 在Bang-Bang切换点附近使用平滑过渡
- 增加电流环带宽

### 2. 采样率要求

时间最优轨迹的切换点需要精确计时：

$$
\Delta t_{switch} \geq 3 T_s
$$

如果切换点精度不够，会导致加速度超调。

### 3. 实时计算

相平面切换曲线的计算可以在每个控制周期执行，计算量很小（几次比较和乘法）。但如果使用QP求解，需要更强大的处理器。

### 4. 多轴协调

多轴时间最优需要所有轴同时到达，这等价于：

$$
T = \max_i T_i^*
$$

其中 $T_i^*$ 是第 $i$ 轴的时间最优时间。运动时间由最慢的轴决定。

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| MC-TP-01 | 运动学约束：时间最优的约束基础 |
| MC-TP-02 | S曲线：jerk约束下的时间最优 |
| CT-13 | LQR：$r \to 0$ 趋近时间最优 |
| CE-15 | LP/QP/LQR：时间最优的优化形式 |
| MC-TP-04 | 多段拼接：多段时间最优 |
| CE-16 | 轨迹跟踪：时间最优轨迹的跟踪控制 |

## 参考文献

1. Bryson A.E., Ho Y.C., *Applied Optimal Control*, Taylor & Francis, 1975
2. Kirk D.E., *Optimal Control Theory: An Introduction*, Dover, 2004
3. Pontryagin L.S., et al., *The Mathematical Theory of Optimal Processes*, Wiley, 1962
4. Kroger T., *On-Line Trajectory Generation in Robotic Systems*, Springer, 2010
5. Consolini L., Gerelli O., Bianco C.G.L., "Minimum-Time Trajectory Generation for SISO Systems", *IEEE Trans. Automatic Control*, 2010
6. Debrouwer F., et al., "Time-Optimal Path Following for Robots with Convex-Concave Constraints", *IEEE ICRA*, 2012
