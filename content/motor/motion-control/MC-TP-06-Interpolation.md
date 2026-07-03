---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-06: 插补原理"
tags:
  - motor-control
status: learning
summary: 从稀疏到稠密——实时生成密集位置指令的核心技术
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-06: 插补原理

## 副标题

从稀疏到稠密——实时生成密集位置指令的核心技术

## 难度

★★★★☆

## 适用对象

- 数控系统核心开发者
- 运动控制器固件工程师
- 机器人控制器开发者
- 嵌入式实时系统工程师

## 前置知识

- MC-TP-01: 运动学基础与约束
- MC-TP-02: 梯形与S曲线速度规划
- MC-TP-04: 多段轨迹拼接与Blend
- ALG-05: 有感FOC

## 核心摘要

插补（Interpolation）是运动控制中"从稀疏到稠密"的核心技术：将上位机发送的稀疏路径点（如G代码指令）转化为控制器所需的密集位置指令序列。线性插补（G01）最简单但只能走直线；圆弧插补（G02/G03）处理圆弧路径，需要解决弦高误差与段长的矛盾；NURBS插补是工业CNC的标准，用控制点、权重和节点向量定义自由曲线。实时插补器在固定时间步长内生成位置指令，插补周期（通常1ms）与控制周期（通常0.1ms）的协调是系统设计的关键。

## 问题引入

### 工程场景

**场景1：CNC加工中心的实时插补**

上位机发送G代码：`G01 X100 Y50 F3000`（直线进给到(100,50)，速度3000mm/min）。控制器需要以1ms的插补周期，逐点生成位置指令，同时处理加减速。如果进给速度变化，插补器需要实时调整步长。

**场景2：五轴加工的圆弧插补**

加工圆弧槽：`G02 X50 Y50 I25 J0 F2000`（顺时针圆弧，圆心偏移(25,0)）。圆弧插补需要计算每个插补周期内的角度增量，同时控制弦高误差不超过精度要求。

**场景3：汽车模具的NURBS加工**

汽车模具表面是复杂的自由曲面，传统G01代码需要数百万行。使用NURBS插补，上位机只发送少量控制点和节点向量，控制器实时计算曲线上的点，数据量减少99%，加工表面质量显著提升。

### 核心问题

> 插补器如何在固定时间步长内精确生成位置指令？圆弧插补如何控制弦高误差？NURBS插补为什么是工业标准？插补周期与控制周期如何协调？

## 原理推导

### 1. 插补的基本概念

#### 1.1 什么是插补

插补（Interpolation）是在已知路径点之间，按照一定算法生成中间点的过程：

```
上位机指令（稀疏）          插补器输出（稠密）
  P0 ────────── P1    →    P0, P0', P0'', ..., P1
  (G代码)                    (位置指令序列)
```

插补器的核心任务：
1. **路径生成**：在路径点之间生成精确的中间点
2. **速度控制**：沿路径的进给速度遵循速度规划
3. **实时性**：在固定时间步长内完成计算

#### 1.2 插补周期与控制周期

```
插补周期 (T_interp):  1ms    ┃         ┃         ┃
                       ┃ 位置指令 ┃ 位置指令 ┃ 位置指令 ┃
控制周期 (T_ctrl):   0.1ms  │││││││││││││││││││││││││
                       │││││││││││││││││││││││││
                       电流环 速度环  位置环
```

典型配置：
- 插补周期 $T_{interp} = 1$ ms（1 kHz）
- 位置环周期 $T_{pos} = 0.5$ ms（2 kHz）
- 速度环周期 $T_{vel} = 0.1$ ms（10 kHz）
- 电流环周期 $T_{cur} = 0.05$ ms（20 kHz）

插补器在每个 $T_{interp}$ 输出一个位置指令，位置环在 $T_{pos}$ 之间做线性插值。

### 2. 线性插补（G01）

#### 2.1 基本算法

从点 $\mathbf{P}_s = (x_s, y_s, z_s)$ 到 $\mathbf{P}_e = (x_e, y_e, z_e)$，进给速度 $F$：

路径长度：

$$
L = \sqrt{(x_e - x_s)^2 + (y_e - y_s)^2 + (z_e - z_s)^2}
$$

每个插补周期的步长：

$$
\Delta s = F \cdot T_{interp}
$$

归一化参数：

$$
u_k = \frac{k \cdot \Delta s}{L}, \quad k = 0, 1, 2, \ldots, N
$$

其中 $N = \lceil L / \Delta s \rceil$。

第 $k$ 步的位置：

$$
\mathbf{P}_k = \mathbf{P}_s + u_k \cdot (\mathbf{P}_e - \mathbf{P}_s)
$$

#### 2.2 余数处理

由于 $\Delta s$ 通常不能整除 $L$，最后一步需要特殊处理：

$$
\Delta s_{last} = L - N \cdot \Delta s + \Delta s
$$

或者更精确地，累积距离并判断是否超过 $L$：

```c
s_accumulated += delta_s;
if (s_accumulated >= L) {
    /* 最后一步，精确到终点 */
    P_current = P_end;
}
```

#### 2.3 多轴协调

线性插补中，各轴的位移按比例分配：

$$
\Delta x_k = \frac{x_e - x_s}{L} \cdot \Delta s, \quad \Delta y_k = \frac{y_e - y_s}{L} \cdot \Delta s
$$

各轴速度：

$$
v_x = F \cdot \frac{x_e - x_s}{L}, \quad v_y = F \cdot \frac{y_e - y_s}{L}
$$

### 3. 圆弧插补（G02/G03）

#### 3.1 圆弧参数计算

给定起点 $\mathbf{P}_s$、终点 $\mathbf{P}_e$ 和圆心偏移 $(I, J)$：

圆心坐标：

$$
(x_c, y_c) = (x_s + I, y_s + J)
$$

半径：

$$
R = \sqrt{I^2 + J^2}
$$

起始角度和终止角度：

$$
\theta_s = \text{atan2}(y_s - y_c, x_s - x_c), \quad \theta_e = \text{atan2}(y_e - y_c, x_e - x_c)
$$

圆弧方向：
- G02（顺时针）：$\theta$ 从 $\theta_s$ 递减到 $\theta_e$
- G03（逆时针）：$\theta$ 从 $\theta_s$ 递增到 $\theta_e$

总角度：

$$
\Delta\theta = \begin{cases}
\theta_e - \theta_s & \text{G03, } \theta_e > \theta_s \\
\theta_e - \theta_s + 2\pi & \text{G03, } \theta_e \leq \theta_s \\
\theta_s - \theta_e & \text{G02, } \theta_s > \theta_e \\
\theta_s - \theta_e + 2\pi & \text{G02, } \theta_s \leq \theta_e
\end{cases}
$$

#### 3.2 角度增量计算

每个插补周期的弧长：

$$
\Delta s = F \cdot T_{interp}
$$

对应的角度增量：

$$
\Delta\theta = \frac{\Delta s}{R}
$$

第 $k$ 步的角度：

$$
\theta_k = \theta_s + k \cdot \Delta\theta \cdot \text{dir}
$$

其中 $\text{dir} = +1$（G03）或 $-1$（G02）。

第 $k$ 步的位置：

$$
\begin{aligned}
x_k &= x_c + R \cos\theta_k \\
y_k &= y_c + R \sin\theta_k
\end{aligned}
$$

#### 3.3 弦高误差

圆弧插补用弦近似弧，产生弦高误差：

$$
e_{chord} = R\left(1 - \cos\frac{\Delta\theta}{2}\right) \approx \frac{R \cdot \Delta\theta^2}{8}
$$

将 $\Delta\theta = \Delta s / R$ 代入：

$$
e_{chord} \approx \frac{\Delta s^2}{8R}
$$

给定弦高误差容限 $e_{tol}$，最大步长：

$$
\Delta s_{max} = \sqrt{8 R \cdot e_{tol}}
$$

对应的最大进给速度：

$$
F_{max} = \frac{\Delta s_{max}}{T_{interp}} = \frac{\sqrt{8 R \cdot e_{tol}}}{T_{interp}}
$$

**关键洞察**：小半径圆弧的进给速度受弦高误差限制，而非电机能力限制！

#### 3.4 改进算法：一阶Taylor展开

直接计算 $\cos\theta_k$ 和 $\sin\theta_k$ 需要三角函数运算，在无FPU的MCU上较慢。使用递推公式：

$$
\begin{aligned}
\cos(\theta_{k+1}) &= \cos\theta_k \cos\Delta\theta - \sin\theta_k \sin\Delta\theta \\
\sin(\theta_{k+1}) &= \sin\theta_k \cos\Delta\theta + \cos\theta_k \sin\Delta\theta
\end{aligned}
$$

当 $\Delta\theta$ 很小时，$\cos\Delta\theta \approx 1$, $\sin\Delta\theta \approx \Delta\theta$：

$$
\begin{aligned}
\cos(\theta_{k+1}) &\approx \cos\theta_k - \Delta\theta \cdot \sin\theta_k \\
\sin(\theta_{k+1}) &\approx \sin\theta_k + \Delta\theta \cdot \cos\theta_k
\end{aligned}
$$

这是一阶近似，误差为 $O(\Delta\theta^2)$。更精确的二阶近似：

$$
\begin{aligned}
\cos(\theta_{k+1}) &\approx \cos\theta_k - \Delta\theta \cdot \sin\theta_k - \frac{\Delta\theta^2}{2} \cos\theta_k \\
\sin(\theta_{k+1}) &\approx \sin\theta_k + \Delta\theta \cdot \cos\theta_k - \frac{\Delta\theta^2}{2} \sin\theta_k
\end{aligned}
$$

### 4. NURBS插补

#### 4.1 NURBS基础

NURBS（Non-Uniform Rational B-Spline）是工业CNC的标准曲线表示：

$$
C(u) = \frac{\sum_{i=0}^{n} N_{i,p}(u) \cdot w_i \cdot \mathbf{P}_i}{\sum_{i=0}^{n} N_{i,p}(u) \cdot w_i}
$$

其中：
- $\mathbf{P}_i$：控制点
- $w_i$：权重
- $N_{i,p}(u)$：B样条基函数（$p$ 阶）
- $u$：参数，$u \in [u_{min}, u_{max}]$

#### 4.2 B样条基函数

B样条基函数由Cox-de Boor递推公式定义：

$$
\begin{aligned}
N_{i,0}(u) &= \begin{cases} 1, & u_i \leq u < u_{i+1} \\ 0, & \text{otherwise} \end{cases} \\
N_{i,p}(u) &= \frac{u - u_i}{u_{i+p} - u_i} N_{i,p-1}(u) + \frac{u_{i+p+1} - u}{u_{i+p+1} - u_{i+1}} N_{i+1,p-1}(u)
\end{aligned}
$$

节点向量 $\mathbf{U} = \{u_0, u_1, \ldots, u_{n+p+1}\}$ 决定了基函数的形状。

**均匀节点**：$u_{i+1} - u_i = \text{const}$

**非均匀节点**：节点间距不等，允许局部加密

**Clamped节点**：首尾各 $p+1$ 个节点相同，使曲线通过首尾控制点

#### 4.3 NURBS求导

速度和加速度需要NURBS的导数：

$$
C'(u) = \frac{dC}{du} = \frac{A'(u) \cdot W(u) - A(u) \cdot W'(u)}{W(u)^2}
$$

其中 $A(u) = \sum N_{i,p}(u) w_i \mathbf{P}_i$, $W(u) = \sum N_{i,p}(u) w_i$。

#### 4.4 参数-弧长关系

NURBS的参数 $u$ 与弧长 $s$ 不是线性关系。进给速度控制需要沿弧长匀速，而非沿参数匀速。

弧长微分：

$$
\frac{ds}{du} = |C'(u)|
$$

因此：

$$
\frac{du}{dt} = \frac{du}{ds} \cdot \frac{ds}{dt} = \frac{F(t)}{|C'(u)|}
$$

其中 $F(t)$ 是进给速度。

每个插补周期的参数增量：

$$
\Delta u_k = \frac{F(t_k) \cdot T_{interp}}{|C'(u_k)|}
$$

**关键问题**：$|C'(u)|$ 在曲线上变化，导致 $\Delta u$ 不均匀。在曲率大的区域，$|C'(u)|$ 小，$\Delta u$ 大，可能跳过细节。

#### 4.5 进给速度调度

沿NURBS曲线的进给速度需要考虑：

1. **曲率约束**：曲率大的区域速度低

$$
F_{curv} = \sqrt{\frac{a_{max}}{\kappa(u)}}
$$

其中 $\kappa(u)$ 为曲率。

2. **弦高误差约束**：

$$
F_{chord} = \frac{\sqrt{8 \cdot e_{tol}}}{T_{interp} \cdot \sqrt{\kappa(u)}}
$$

3. **加速度约束**：速度变化率受限于加速度

$$
\left|\frac{dF}{dt}\right| \leq a_{max}
$$

### 5. 实时插补器设计

#### 5.1 架构

```
┌──────────────────────────────────────────────┐
│                  插补器架构                     │
│                                              │
│  G代码解析 → 路径预处理 → 速度规划 → 实时插补  │
│                                    ↓         │
│                              位置指令输出      │
│                              (每T_interp)     │
└──────────────────────────────────────────────┘
```

#### 5.2 时间约束

实时插补器必须在 $T_{interp}$ 内完成所有计算：

$$
t_{compute} < T_{interp}
$$

典型 $T_{interp} = 1$ ms，在 100 MHz Cortex-M4 上约有 100,000 个时钟周期可用。

各操作的计算量：

| 操作 | 时钟周期（估算） | 说明 |
|------|----------------|------|
| 线性插补 | ~50 | 简单乘加 |
| 圆弧插补 | ~200 | 含三角函数 |
| NURBS求值 | ~2000 | 基函数+加权求和 |
| 速度规划 | ~500 | S曲线计算 |

#### 5.3 插补-控制周期协调

插补器输出频率低于控制环路频率，需要中间插值：

```
插补器输出:  P[0]              P[1]              P[2]
             │                  │                  │
时间:        ├──────1ms────────┤──────1ms────────┤
             │                  │                  │
位置环插值:  P[0]→P[0']→...→P[1]→P[1']→...→P[2]
             ├─0.5ms─┤─0.5ms─┤─0.5ms─┤─0.5ms─┤
```

位置环在两个插补点之间做线性插值：

$$
\mathbf{P}_{ctrl}(t) = \mathbf{P}_{interp}[k] + \frac{t - t_k}{T_{interp}} \cdot (\mathbf{P}_{interp}[k+1] - \mathbf{P}_{interp}[k])
$$

## 工程实现

### 线性插补器

```c
#include <math.h>
#include <stdint.h>

/* 三维向量 */
typedef struct {
    double x, y, z;
} Vec3;

/* 线性插补器状态 */
typedef struct {
    Vec3   p_start;      /* 起始点 */
    Vec3   p_end;        /* 终止点 */
    Vec3   direction;    /* 单位方向向量 */
    double length;       /* 总长度 */
    double s_current;    /* 当前弧长位置 */
    double feedrate;     /* 当前进给速度 */
    int    active;       /* 是否激活 */
} LinearInterpolator;

/* 初始化线性插补器 */
void linear_interp_init(
    LinearInterpolator *interp,
    Vec3 p_start, Vec3 p_end,
    double feedrate)
{
    interp->p_start = p_start;
    interp->p_end = p_end;

    Vec3 d = {p_end.x - p_start.x, p_end.y - p_start.y, p_end.z - p_start.z};
    interp->length = sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

    if (interp->length > 1e-10) {
        interp->direction.x = d.x / interp->length;
        interp->direction.y = d.y / interp->length;
        interp->direction.z = d.z / interp->length;
    } else {
        interp->direction = (Vec3){0, 0, 0};
    }

    interp->s_current = 0.0;
    interp->feedrate = feedrate;
    interp->active = 1;
}

/* 线性插补器更新（每个插补周期调用） */
int linear_interp_update(
    LinearInterpolator *interp,
    double T_interp,
    Vec3 *pos_cmd,
    double *vel_cmd)
{
    if (!interp->active) return 0;

    /* 计算步长 */
    double ds = interp->feedrate * T_interp;
    interp->s_current += ds;

    if (interp->s_current >= interp->length) {
        /* 到达终点 */
        *pos_cmd = interp->p_end;
        *vel_cmd = 0.0;
        interp->active = 0;
        return 0;  /* 完成 */
    }

    /* 计算当前位置 */
    pos_cmd->x = interp->p_start.x + interp->s_current * interp->direction.x;
    pos_cmd->y = interp->p_start.y + interp->s_current * interp->direction.y;
    pos_cmd->z = interp->p_start.z + interp->s_current * interp->direction.z;

    *vel_cmd = interp->feedrate;
    return 1;  /* 继续 */
}
```

### 圆弧插补器

```c
/* 圆弧插补器状态 */
typedef struct {
    double xc, yc;      /* 圆心坐标 */
    double radius;      /* 半径 */
    double theta_start; /* 起始角度 */
    double theta_end;   /* 终止角度 */
    double d_theta;     /* 每步角度增量 */
    double theta_current; /* 当前角度 */
    int    direction;   /* +1=逆时针(G03), -1=顺时针(G02) */
    double feedrate;    /* 进给速度 */
    int    active;      /* 是否激活 */
} ArcInterpolator;

/* 初始化圆弧插补器 */
int arc_interp_init(
    ArcInterpolator *interp,
    double xs, double ys,       /* 起始点 */
    double xe, double ye,       /* 终止点 */
    double I, double J,         /* 圆心偏移 */
    int direction,              /* +1=G03, -1=G02 */
    double feedrate,
    double e_tol,               /* 弦高误差容限 */
    double T_interp)
{
    interp->xc = xs + I;
    interp->yc = ys + J;
    interp->radius = sqrt(I*I + J*J);
    interp->direction = direction;
    interp->feedrate = feedrate;

    if (interp->radius < 1e-10) return -1;

    /* 计算起始和终止角度 */
    interp->theta_start = atan2(ys - interp->yc, xs - interp->xc);
    interp->theta_end = atan2(ye - interp->yc, xe - interp->xc);
    interp->theta_current = interp->theta_start;

    /* 计算总角度 */
    double total_angle;
    if (direction > 0) {  /* G03 逆时针 */
        total_angle = interp->theta_end - interp->theta_start;
        if (total_angle <= 0) total_angle += 2.0 * M_PI;
    } else {  /* G02 顺时针 */
        total_angle = interp->theta_start - interp->theta_end;
        if (total_angle <= 0) total_angle += 2.0 * M_PI;
    }

    /* 弦高误差约束：限制步长 */
    double ds = feedrate * T_interp;
    double ds_max = sqrt(8.0 * interp->radius * e_tol);
    if (ds > ds_max) {
        ds = ds_max;
        /* 实际进给速度被弦高误差限制 */
    }

    /* 每步角度增量 */
    interp->d_theta = ds / interp->radius;

    interp->active = 1;
    return 0;
}

/* 圆弧插补器更新 */
int arc_interp_update(
    ArcInterpolator *interp,
    double T_interp,
    double *x_cmd, double *y_cmd,
    double *vel_cmd)
{
    if (!interp->active) return 0;

    /* 更新角度 */
    interp->theta_current += interp->direction * interp->d_theta;

    /* 检查是否到达终点 */
    int finished = 0;
    if (interp->direction > 0) {
        if (interp->theta_current >= interp->theta_end) finished = 1;
    } else {
        if (interp->theta_current <= interp->theta_end) finished = 1;
    }

    if (finished) {
        /* 精确到终点 */
        *x_cmd = interp->xc + interp->radius * cos(interp->theta_end);
        *y_cmd = interp->yc + interp->radius * sin(interp->theta_end);
        *vel_cmd = 0.0;
        interp->active = 0;
        return 0;
    }

    /* 计算当前位置 */
    *x_cmd = interp->xc + interp->radius * cos(interp->theta_current);
    *y_cmd = interp->yc + interp->radius * sin(interp->theta_current);
    *vel_cmd = interp->feedrate;

    return 1;
}
```

### NURBS插补器（简化版）

```c
/* NURBS插补器（三次，clamped节点向量） */
#define MAX_CTRL_POINTS 32
#define MAX_KNOTS 64

typedef struct {
    double cx[MAX_CTRL_POINTS];  /* 控制点x坐标 */
    double cy[MAX_CTRL_POINTS];  /* 控制点y坐标 */
    double w[MAX_CTRL_POINTS];   /* 权重 */
    double knots[MAX_KNOTS];     /* 节点向量 */
    int    n_ctrl;               /* 控制点数 */
    int    degree;               /* 阶数（通常3） */
    double u_current;            /* 当前参数 */
    double u_end;                /* 终止参数 */
    double feedrate;             /* 进给速度 */
    int    active;
} NURBSInterpolator;

/* 计算B样条基函数 N_{i,p}(u) */
double basis_function(int i, int p, double u, const double *knots)
{
    if (p == 0) {
        return (u >= knots[i] && u < knots[i+1]) ? 1.0 : 0.0;
    }

    double left = 0.0, right = 0.0;

    double denom_left = knots[i+p] - knots[i];
    if (fabs(denom_left) > 1e-10) {
        left = (u - knots[i]) / denom_left * basis_function(i, p-1, u, knots);
    }

    double denom_right = knots[i+p+1] - knots[i+1];
    if (fabs(denom_right) > 1e-10) {
        right = (knots[i+p+1] - u) / denom_right * basis_function(i+1, p-1, u, knots);
    }

    return left + right;
}

/* NURBS曲线求值 */
void nurbs_evaluate(
    const NURBSInterpolator *interp,
    double u,
    double *x, double *y)
{
    double numer_x = 0.0, numer_y = 0.0, denom = 0.0;

    for (int i = 0; i < interp->n_ctrl; i++) {
        double N = basis_function(i, interp->degree, u, interp->knots);
        double wN = interp->w[i] * N;
        numer_x += wN * interp->cx[i];
        numer_y += wN * interp->cy[i];
        denom += wN;
    }

    if (fabs(denom) > 1e-10) {
        *x = numer_x / denom;
        *y = numer_y / denom;
    } else {
        *x = 0.0;
        *y = 0.0;
    }
}

/* NURBS导数（数值差分） */
void nurbs_derivative(
    const NURBSInterpolator *interp,
    double u,
    double *dx_du, double *dy_du)
{
    double du = 1e-6;
    double x1, y1, x2, y2;

    nurbs_evaluate(interp, u - du, &x1, &y1);
    nurbs_evaluate(interp, u + du, &x2, &y2);

    *dx_du = (x2 - x1) / (2.0 * du);
    *dy_du = (y2 - y1) / (2.0 * du);
}

/* NURBS插补器更新 */
int nurbs_interp_update(
    NURBSInterpolator *interp,
    double T_interp,
    double *x_cmd, double *y_cmd,
    double *vel_cmd)
{
    if (!interp->active) return 0;

    /* 计算当前参数处的导数 */
    double dx_du, dy_du;
    nurbs_derivative(interp, interp->u_current, &dx_du, &dy_du);

    /* |C'(u)| */
    double ds_du = sqrt(dx_du * dx_du + dy_du * dy_du);

    if (ds_du < 1e-10) {
        /* 退化点，跳过 */
        interp->u_current += 1e-4;
        if (interp->u_current >= interp->u_end) {
            interp->active = 0;
            return 0;
        }
        return 1;
    }

    /* 参数增量：Δu = F * T / |C'(u)| */
    double du = interp->feedrate * T_interp / ds_du;
    interp->u_current += du;

    if (interp->u_current >= interp->u_end) {
        /* 到达终点 */
        nurbs_evaluate(interp, interp->u_end, x_cmd, y_cmd);
        *vel_cmd = 0.0;
        interp->active = 0;
        return 0;
    }

    /* 计算当前位置 */
    nurbs_evaluate(interp, interp->u_current, x_cmd, y_cmd);
    *vel_cmd = interp->feedrate;

    return 1;
}
```

## 参数整定/调试指南

### 1. 插补周期选择

| 应用 | 插补周期 | 位置环周期 | 说明 |
|------|---------|-----------|------|
| 高端CNC | 0.5 ms | 0.25 ms | 追求精度 |
| 通用CNC | 1 ms | 0.5 ms | 平衡性能 |
| 机器人 | 1~2 ms | 0.5~1 ms | 多轴协调 |
| 3D打印 | 2~4 ms | 1~2 ms | 成本敏感 |

### 2. 弦高误差容限

弦高误差容限决定了圆弧和NURBS插补的精度：

| 加工精度 | $e_{tol}$ | 说明 |
|---------|-----------|------|
| 粗加工 | 0.01~0.05 mm | 快速，精度低 |
| 半精加工 | 0.005~0.01 mm | 平衡 |
| 精加工 | 0.001~0.005 mm | 慢速，高精度 |
| 超精加工 | < 0.001 mm | 极慢，极高精度 |

### 3. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 圆弧不闭合 | 角度计算错误 | 检查G02/G03方向和总角度 |
| 加工表面有纹路 | 弦高误差过大 | 减小 $e_{tol}$ 或降低进给速度 |
| NURBS曲线跳变 | 参数增量过大 | 减小进给速度或增大插补频率 |
| 位置指令有台阶 | 插补-控制周期不匹配 | 在位置环中做线性插值 |
| 小圆弧速度过低 | 弦高误差约束过严 | 适当放宽 $e_{tol}$ |
| NURBS计算超时 | 控制点过多 | 预计算基函数或使用查找表 |

### 4. NURBS特有调试

1. **节点向量验证**：确保clamped节点向量首尾正确
2. **权重验证**：权重为0的控制点不影响曲线
3. **参数范围**：有效参数范围为 $[u_p, u_{n+1}]$
4. **导数连续性**：检查节点处的导数是否连续

## 硬件约束

### 1. 三角函数计算

圆弧插补需要 `cos`/`sin` 计算：
- 有FPU的MCU（Cortex-M4F/M7）：~30 cycles
- 无FPU的MCU（Cortex-M3）：~500 cycles
- 优化：使用CORDIC硬件或查表法

### 2. NURBS计算量

三次NURBS求值需要：
- 基函数计算：$O(n \cdot p^2)$，$n$ 为控制点数，$p$ 为阶数
- 对于 $n=10$, $p=3$：约 200 次浮点运算
- 在 Cortex-M4F 上约 2~5 μs

### 3. 内存需求

| 数据 | 大小 | 说明 |
|------|------|------|
| 控制点 | $n \times 3 \times 8$ bytes | 10个点约240B |
| 节点向量 | $(n+p+1) \times 8$ bytes | 14个节点约112B |
| 权重 | $n \times 8$ bytes | 10个约80B |
| 基函数缓存 | $n \times 8$ bytes | 预计算约80B |

### 4. 实时性保证

插补器在RTOS中通常作为高优先级任务运行：

```
优先级0（最高）: 电流环 (20 kHz)
优先级1:        速度环 (10 kHz)
优先级2:        位置环 (2 kHz)
优先级3:        插补器 (1 kHz)
优先级4:        通信/显示
```

插补器的计算时间必须远小于其周期：

$$
t_{compute} < 0.5 \times T_{interp}
$$

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| MC-TP-01 | 运动学约束：插补的约束基础 |
| MC-TP-02 | S曲线：插补中的速度规划 |
| MC-TP-04 | 多段拼接：多段插补的Blend过渡 |
| MC-MC-06 | 多轴协调：多轴插补的同步 |
| ALG-05 | 有感FOC：插补输出作为位置环输入 |
| CT-14 | 级联PID：位置环跟踪插补指令 |

## 参考文献

1. Biagiotti L., Melchiorri C., *Trajectory Planning for Automatic Machines and Robots*, Springer, 2008
2. Piegl L., Tiller W., *The NURBS Book*, Springer, 1997
3. Yeh S.S., Hsu P.L., "The Speed-Controlled Interpolator for Machining Parametric Curves", *Computer-Aided Design*, 1999
4. Zhiming X., Jincheng C., Zhengjin F., "A Performance-Based Evaluation Method for NURBS Interpolators", *Int. J. Advanced Manufacturing Technology*, 2002
5. Erkorkmaz K., Altintas Y., "Quintic Spline Interpolation with Minimal Feed Fluctuation", *J. Manufacturing Science and Engineering*, 2005
6. Sencer B., Altintas Y., Croft E., "Feed Optimization for Five-Axis CNC Machine Tools with Drive Constraints", *Int. J. Machine Tools and Manufacture*, 2008
