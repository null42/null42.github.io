---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-02: 梯形与S曲线速度规划"
tags:
  - motor-control
status: learning
summary: 从硬切换到软着陆——用Jerk约束消除机械冲击
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-02: 梯形与S曲线速度规划

## 副标题

从硬切换到软着陆——用Jerk约束消除机械冲击

## 难度

★★★☆☆

## 适用对象

- 伺服驱动器固件工程师
- 运动控制器算法工程师
- 数控系统轨迹规划开发者
- 机器人控制器开发者

## 前置知识

- MC-TP-01: 运动学基础与约束
- CT-14: 级联PID控制（位置环）
- ALG-12: 速度环与转矩观测器

## 核心摘要

梯形速度规划是最简单的加速度受限规划，但在加速/匀速/减速切换瞬间存在无限大jerk，导致机械冲击。S曲线（七段式）速度规划通过引入jerk约束，使加速度平滑过渡，消除机械冲击，代价是运动时间增加约15%。本模块详细推导七段S曲线的全部边界条件与时间计算，给出完整的C语言实现，并讨论梯形与S曲线的工程选择策略。

## 问题引入

### 工程场景

**场景1：点胶机的高速定位**

点胶机需要在PCB上快速精确定位。使用梯形速度规划时，每次加速/减速切换都会引起机械振动，导致点胶位置偏移0.05mm——这在0.1mm间距的焊盘上是不可接受的。切换到S曲线后，振动消失，定位精度提升至0.01mm以内。

**场景2：SCARA机器人的拾放操作**

拾放操作要求快速完成"取-移-放"循环。梯形规划的冲击使机械臂在加速瞬间产生弹性变形，抓取的工件有脱落风险。S曲线规划虽然慢了10ms，但彻底消除了脱落问题。

**场景3：CNC加工的进给运动**

加工进给运动中，梯形规划的加速度突变会在加工表面留下振纹。S曲线规划使进给速度平滑变化，表面粗糙度从Ra 1.6降至Ra 0.8。

### 核心问题

> 梯形规划的jerk问题到底有多严重？S曲线如何解决？七段式S曲线的时间计算如何处理所有可能的退化情况？

## 原理推导

### 1. 梯形速度规划

#### 1.1 三段式结构

梯形速度规划由三个阶段组成：

```
  v_max ──────────────────
       /                  \
      /   匀速段(T_const)   \
     /                        \
    / 加速段(T_acc)  减速段(T_dec) \
   ────────────────────────────── 时间
```

给定参数：
- $v_{max}$：最大速度
- $a_{max}$：最大加速度
- $q_{total}$：总位移
- $v_s, v_e$：起始和终止速度

加速段时间：$T_{acc} = \frac{v_{max} - v_s}{a_{max}}$

减速段时间：$T_{dec} = \frac{v_{max} - v_e}{a_{max}}$

加速段位移：$q_{acc} = \frac{v_s + v_{max}}{2} T_{acc}$

减速段位移：$q_{dec} = \frac{v_{max} + v_e}{2} T_{dec}$

匀速段位移：$q_{const} = q_{total} - q_{acc} - q_{dec}$

匀速段时间：$T_{const} = \frac{q_{const}}{v_{max}}$

#### 1.2 三角形退化

当 $q_{const} < 0$ 时，无法达到 $v_{max}$，退化为三角形：

$$
v_{peak} = \sqrt{\frac{2 a_{max} q_{total} + v_s^2 \cdot \frac{a_{dec}}{a_{acc}} + v_e^2 \cdot \frac{a_{acc}}{a_{dec}}}{\frac{a_{dec}}{a_{acc}} + \frac{a_{acc}}{a_{dec}}}}
$$

简化情况（$a_{acc} = a_{dec} = a_{max}$，$v_s = v_e = 0$）：

$$
v_{peak} = \sqrt{a_{max} \cdot q_{total}}
$$

#### 1.3 Jerk问题

梯形规划在三个切换点存在无限大jerk：

$$
\dddot{q}(t_{switch}) = \lim_{\Delta t \to 0} \frac{\Delta \ddot{q}}{\Delta t} = \infty
$$

物理后果：
- 加速度从0瞬间跳到 $a_{max}$：机械冲击力 $F = m \cdot \Delta a / \Delta t \to \infty$
- 激发机械共振，振幅正比于 jerk 幅值
- 齿轮间隙处的"敲击"效应
- 结构弹性变形引起的残余振动

### 2. S曲线（七段式）速度规划

#### 2.1 七段结构

```
加速度:    ╱╲      ╲╱
          ╱  ╲      ╲
         ╱    ╲      ╲
        ╱  T1  T2 T3  ╲  T5  T6  T7
       ╱                  ╲
──────╱                    ╲──────
      |T1|T2|T3|   T4   |T5|T6|T7|

段1: Jerk正加速 (j = +j_max, a: 0→a_max)
段2: 匀加速     (j = 0,     a = a_max)
段3: Jerk负加速 (j = -j_max, a: a_max→0)
段4: 匀速       (j = 0, a = 0, v = v_max)
段5: Jerk正减速 (j = -j_max, a: 0→-a_max)
段6: 匀减速     (j = 0,     a = -a_max)
段7: Jerk负减速 (j = +j_max, a: -a_max→0)
```

#### 2.2 逐段推导

**段1（$0 \leq t \leq T_1$）：Jerk正加速**

$$
\dddot{q} = j_{max}, \quad \ddot{q}(0) = 0, \quad \dot{q}(0) = v_s
$$

$$
\begin{aligned}
\ddot{q}(t) &= j_{max} \cdot t \\
\dot{q}(t) &= v_s + \frac{1}{2} j_{max} t^2 \\
q(t) &= q_s + v_s t + \frac{1}{6} j_{max} t^3
\end{aligned}
$$

段1结束时（$t = T_1$）：

$$
\begin{aligned}
a_1 &= j_{max} T_1 \\
v_1 &= v_s + \frac{1}{2} j_{max} T_1^2 \\
q_1 &= q_s + v_s T_1 + \frac{1}{6} j_{max} T_1^3
\end{aligned}
$$

**段2（$0 \leq t \leq T_2$）：匀加速**

$$
\dddot{q} = 0, \quad \ddot{q} = a_{max}
$$

$$
\begin{aligned}
\dot{q}(t) &= v_1 + a_{max} t \\
q(t) &= q_1 + v_1 t + \frac{1}{2} a_{max} t^2
\end{aligned}
$$

段2结束时：

$$
\begin{aligned}
v_2 &= v_1 + a_{max} T_2 \\
q_2 &= q_1 + v_1 T_2 + \frac{1}{2} a_{max} T_2^2
\end{aligned}
$$

**段3（$0 \leq t \leq T_3$）：Jerk负加速**

$$
\dddot{q} = -j_{max}, \quad \ddot{q}(0) = a_{max}
$$

$$
\begin{aligned}
\ddot{q}(t) &= a_{max} - j_{max} t \\
\dot{q}(t) &= v_2 + a_{max} t - \frac{1}{2} j_{max} t^2 \\
q(t) &= q_2 + v_2 t + \frac{1}{2} a_{max} t^2 - \frac{1}{6} j_{max} t^3
\end{aligned}
$$

段3结束时（加速度降为0）：

$$
T_3 = \frac{a_{max}}{j_{max}} = T_1 \quad \text{（当 $T_1$ 取最大值时）}
$$

**段4（$0 \leq t \leq T_4$）：匀速**

$$
\dot{q} = v_{max}, \quad \ddot{q} = 0, \quad \dddot{q} = 0
$$

**段5~7**：与段1~3对称，jerk符号相反。

#### 2.3 关键时间关系

由加速度连续性：

$$
T_1 = T_3 = T_5 = T_7 = \frac{a_{max}}{j_{max}}
$$

记 $T_j = \frac{a_{max}}{j_{max}}$，这是加速度从0变化到 $a_{max}$ 所需的时间。

加速阶段总时间：

$$
T_{acc} = T_1 + T_2 + T_3 = 2T_j + T_2
$$

加速阶段速度增量：

$$
\Delta v_{acc} = v_{max} - v_s = \frac{1}{2} j_{max} T_1^2 + a_{max} T_2 + \frac{1}{2} j_{max} T_3^2
$$

当 $T_1 = T_3 = T_j$：

$$
\Delta v_{acc} = j_{max} T_j^2 + a_{max} T_2 = a_{max}(T_j + T_2)
$$

#### 2.4 退化情况

S曲线存在多种退化情况，必须正确处理：

**退化1：无匀加速段（$T_2 = 0$）**

当距离较短，无法维持 $a_{max}$ 时：

$$
T_2 = 0, \quad T_1 = T_3 = \sqrt{\frac{v_{peak}}{j_{max}}}
$$

其中 $v_{peak} < v_{max}$。

**退化2：无匀速段（$T_4 = 0$）**

总距离不足以达到 $v_{max}$：

$$
T_4 = 0, \quad v_{peak} < v_{max}
$$

**退化3：无匀加速且无匀速段**

最极端的退化，只有jerk段：

$$
T_2 = T_4 = T_6 = 0
$$

#### 2.5 速度限制圆

给定起始速度 $v_s$ 和终止速度 $v_e$，最大可达速度受距离约束：

$$
v_{limit} = \sqrt{v_s^2 + 2 a_{max} \cdot q_{acc\_avail}}
$$

其中 $q_{acc\_avail}$ 是可用于加速的位移。实际 $v_{max}$ 取：

$$
v_{max\_actual} = \min(v_{max}, v_{limit})
$$

#### 2.6 总时间计算

完整S曲线的总时间：

$$
T_{total} = T_1 + T_2 + T_3 + T_4 + T_5 + T_6 + T_7
$$

与梯形规划相比，S曲线多出的时间主要来自jerk过渡段：

$$
\Delta T \approx 2 \cdot \frac{a_{max}}{j_{max}} \approx 10\% \sim 20\% \text{ 的额外时间}
$$

## 工程实现

### S曲线规划器

```c
#include <math.h>
#include <stdint.h>
#include <stdbool.h>

/* S曲线段类型 */
typedef enum {
    SEG_JERK_UP_ACC   = 0,  /* Jerk正加速 */
    SEG_CONST_ACC     = 1,  /* 匀加速 */
    SEG_JERK_DOWN_ACC = 2,  /* Jerk负加速 */
    SEG_CONST_VEL     = 3,  /* 匀速 */
    SEG_JERK_UP_DEC   = 4,  /* Jerk正减速 */
    SEG_CONST_DEC     = 5,  /* 匀减速 */
    SEG_JERK_DOWN_DEC = 6,  /* Jerk负减速 */
    SEG_IDLE          = 7,  /* 空闲 */
} SCurveSegment;

/* S曲线参数 */
typedef struct {
    double T[7];     /* 各段时间 [s] */
    double j[7];     /* 各段jerk [单位/s³] */
    double a[7];     /* 各段起始加速度 [单位/s²] */
    double v[7];     /* 各段起始速度 [单位/s] */
    double q[7];     /* 各段起始位置 [单位] */
    double t_total;  /* 总时间 */
    int    n_valid;  /* 有效段数 */
} SCurveParams;

/* S曲线规划器配置 */
typedef struct {
    double v_max;    /* 最大速度 */
    double a_max;    /* 最大加速度 */
    double j_max;    /* 最大jerk */
} SCurveConfig;

/* 计算S曲线参数 */
int scurve_plan(
    double q_start, double q_end,
    double v_start, double v_end,
    const SCurveConfig *cfg,
    SCurveParams *params)
{
    double dist = q_end - q_start;
    double dir = (dist >= 0.0) ? 1.0 : -1.0;
    dist = fabs(dist);

    double v_s = fabs(v_start);
    double v_e = fabs(v_end);
    double v_max = cfg->v_max;
    double a_max = cfg->a_max;
    double j_max = cfg->j_max;

    /* Jerk过渡时间：加速度从0到a_max */
    double T_j = a_max / j_max;

    /* 加速阶段：从v_s到v_max的速度增量 */
    double dv_acc = v_max - v_s;
    double dv_dec = v_max - v_e;

    /* 检查是否能达到最大加速度 */
    /* 加速段需要的最小速度增量（仅jerk过渡，无匀加速） */
    double dv_acc_min = j_max * T_j * T_j;  /* = a_max * T_j */

    /* 计算各段时间 */
    double T1, T2, T3, T4, T5, T6, T7;

    if (dv_acc >= dv_acc_min) {
        /* 有匀加速段 */
        T1 = T_j;
        T3 = T_j;
        T2 = (dv_acc - dv_acc_min) / a_max;
    } else {
        /* 无匀加速段：加速度达不到a_max */
        T1 = sqrt(dv_acc / j_max);
        T3 = T1;
        T2 = 0.0;
    }

    if (dv_dec >= dv_acc_min) {
        /* 有匀减速段 */
        T5 = T_j;
        T7 = T_j;
        T6 = (dv_dec - dv_acc_min) / a_max;
    } else {
        /* 无匀减速段 */
        T5 = sqrt(dv_dec / j_max);
        T7 = T5;
        T6 = 0.0;
    }

    /* 计算加速和减速阶段的位移 */
    double q_acc, q_dec;

    /* 加速段位移 */
    double v_after_T1 = v_s + 0.5 * j_max * T1 * T1;
    double v_after_T2 = v_after_T1 + a_max * T2;
    q_acc = v_s * T1 + (1.0/6.0) * j_max * T1*T1*T1
          + v_after_T1 * T2 + 0.5 * a_max * T2*T2
          + v_after_T2 * T3 + 0.5 * a_max * T3*T3 - (1.0/6.0) * j_max * T3*T3*T3;

    /* 减速段位移 */
    double v_max_actual = v_s + j_max * T1 * T1 + a_max * T2;
    double v_after_T5 = v_max_actual - 0.5 * j_max * T5 * T5;
    double v_after_T6 = v_after_T5 - a_max * T6;
    q_dec = v_max_actual * T5 - (1.0/6.0) * j_max * T5*T5*T5
          + v_after_T5 * T6 - 0.5 * a_max * T6*T6
          + v_after_T6 * T7 - 0.5 * a_max * T7*T7 + (1.0/6.0) * j_max * T7*T7*T7;

    /* 匀速段时间 */
    double q_const = dist - q_acc - q_dec;

    if (q_const < 0.0) {
        /* 无法达到v_max，需要重新计算 */
        /* 简化处理：降低峰值速度 */
        /* 迭代求解：二分法搜索v_peak */
        double v_lo = fmax(v_s, v_e);
        double v_hi = v_max;

        for (int i = 0; i < 50; i++) {
            double v_mid = 0.5 * (v_lo + v_hi);

            /* 用v_mid作为峰值速度重新计算 */
            double dv_a = v_mid - v_s;
            double dv_d = v_mid - v_e;

            double t1 = (dv_a >= dv_acc_min) ? T_j : sqrt(dv_a / j_max);
            double t2 = (dv_a >= dv_acc_min) ? (dv_a - j_max * T_j * T_j) / a_max : 0.0;
            double t3 = t1;

            double t5 = (dv_d >= dv_acc_min) ? T_j : sqrt(dv_d / j_max);
            double t6 = (dv_d >= dv_acc_min) ? (dv_d - j_max * T_j * T_j) / a_max : 0.0;
            double t7 = t5;

            /* 计算位移 */
            double v1 = v_s + 0.5 * j_max * t1 * t1;
            double v2 = v1 + a_max * t2;
            double qa = v_s*t1 + (1.0/6.0)*j_max*t1*t1*t1
                      + v1*t2 + 0.5*a_max*t2*t2
                      + v2*t3 + 0.5*a_max*t3*t3 - (1.0/6.0)*j_max*t3*t3*t3;

            double vd5 = v_mid - 0.5*j_max*t5*t5;
            double vd6 = vd5 - a_max*t6;
            double qd = v_mid*t5 - (1.0/6.0)*j_max*t5*t5*t5
                      + vd5*t6 - 0.5*a_max*t6*t6
                      + vd6*t7 - 0.5*a_max*t7*t7 + (1.0/6.0)*j_max*t7*t7*t7;

            if (qa + qd < dist) {
                v_lo = v_mid;
                T1 = t1; T2 = t2; T3 = t3;
                T5 = t5; T6 = t6; T7 = t7;
            } else {
                v_hi = v_mid;
            }
        }
        T4 = 0.0;
    } else {
        T4 = q_const / v_max_actual;
    }

    /* 填充参数 */
    params->T[0] = T1; params->T[1] = T2; params->T[2] = T3;
    params->T[3] = T4;
    params->T[4] = T5; params->T[5] = T6; params->T[6] = T7;

    /* 各段jerk（考虑方向） */
    params->j[0] = dir * j_max;
    params->j[1] = 0.0;
    params->j[2] = dir * (-j_max);
    params->j[3] = 0.0;
    params->j[4] = dir * (-j_max);
    params->j[5] = 0.0;
    params->j[6] = dir * j_max;

    /* 计算各段起始状态 */
    double a_cur = 0.0, v_cur = v_start, q_cur = q_start;
    for (int i = 0; i < 7; i++) {
        params->a[i] = a_cur;
        params->v[i] = v_cur;
        params->q[i] = q_cur;

        double dt = params->T[i];
        double j = params->j[i];
        q_cur += v_cur * dt + 0.5 * a_cur * dt * dt + (1.0/6.0) * j * dt * dt * dt;
        v_cur += a_cur * dt + 0.5 * j * dt * dt;
        a_cur += j * dt;
    }

    params->t_total = T1 + T2 + T3 + T4 + T5 + T6 + T7;
    params->n_valid = 7;

    return 0;
}

/* 在给定时间t处计算运动状态 */
void scurve_evaluate(
    const SCurveParams *params,
    double t,
    double *q, double *v, double *a, double *j)
{
    double t_cum = 0.0;

    for (int i = 0; i < 7; i++) {
        if (t <= t_cum + params->T[i] || i == 6) {
            double dt = t - t_cum;
            if (dt < 0.0) dt = 0.0;
            if (dt > params->T[i]) dt = params->T[i];

            double ji = params->j[i];
            double ai = params->a[i];
            double vi = params->v[i];
            double qi = params->q[i];

            *j = ji;
            *a = ai + ji * dt;
            *v = vi + ai * dt + 0.5 * ji * dt * dt;
            *q = qi + vi * dt + 0.5 * ai * dt * dt + (1.0/6.0) * ji * dt * dt * dt;
            return;
        }
        t_cum += params->T[i];
    }

    /* 超出总时间，返回终态 */
    *q = params->q[6] + params->v[6] * params->T[6]
       + 0.5 * params->a[6] * params->T[6] * params->T[6]
       + (1.0/6.0) * params->j[6] * params->T[6] * params->T[6] * params->T[6];
    *v = 0.0;
    *a = 0.0;
    *j = 0.0;
}
```

### 实时插值器（周期调用）

```c
/* S曲线实时插值器 */
typedef struct {
    SCurveParams params;
    double t_elapsed;
    int    running;
} SCurveInterpolator;

/* 初始化插值器 */
void scurve_interp_init(SCurveInterpolator *interp, const SCurveParams *params)
{
    interp->params = *params;
    interp->t_elapsed = 0.0;
    interp->running = 1;
}

/* 周期更新（在位置环中断中调用） */
void scurve_interp_update(SCurveInterpolator *interp, double T_s,
                          double *q_cmd, double *v_cmd, double *a_cmd)
{
    if (!interp->running) {
        *q_cmd = 0.0; *v_cmd = 0.0; *a_cmd = 0.0;
        return;
    }

    double j;
    scurve_evaluate(&interp->params, interp->t_elapsed, q_cmd, v_cmd, a_cmd, &j);

    interp->t_elapsed += T_s;
    if (interp->t_elapsed >= interp->params.t_total) {
        interp->running = 0;
    }
}
```

## 参数整定/调试指南

### 1. Jerk约束的选择

Jerk约束的选择直接影响运动平滑度和时间效率：

| 应用场景 | $j_{max}/a_{max}$ 比值 | 说明 |
|---------|----------------------|------|
| 高速拾放 | 10~50 | 追求速度，允许轻微振动 |
| 通用伺服 | 50~200 | 平衡速度与平滑度 |
| 精密定位 | 200~1000 | 追求平滑，牺牲时间 |
| 半导体设备 | 1000+ | 极致平滑 |

### 2. 梯形 vs S曲线选择指南

| 判断条件 | 选择 | 原因 |
|---------|------|------|
| 机械系统刚性好、无精密要求 | 梯形 | 简单、快速 |
| 有齿轮间隙或柔性联轴器 | S曲线 | 消除冲击 |
| 定位精度要求 < 0.01mm | S曲线 | 消除振动 |
| 循环时间要求极严 | 梯形 | 快约15% |
| 高速往复运动 | S曲线 | 减少机械疲劳 |

### 3. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 运动末端振荡 | $j_{max}$ 过大 | 减小 $j_{max}$，增大 $T_j$ |
| 速度达不到设定值 | 距离太短，退化处理有误 | 检查退化情况计算 |
| 位置有稳态误差 | 浮点累积误差 | 使用相对时间，定期校准 |
| 加速度波形有毛刺 | 时间段计算不连续 | 检查段间连续性 |
| 规划时间异常长 | $j_{max}$ 过小 | 增大 $j_{max}$ |

### 4. 验证方法

1. **离线验证**：生成完整的 $q(t), \dot{q}(t), \ddot{q}(t), \dddot{q}(t)$ 曲线，检查约束满足
2. **在线验证**：在伺服驱动器中记录指令与反馈，对比跟踪误差
3. **频谱验证**：对加速度做FFT，确认无高频分量泄漏

## 硬件约束

### 1. 控制周期与规划分辨率

S曲线的时间分辨率受控制周期限制：

$$
\Delta T_{min} = T_s
$$

如果 $T_j = a_{max}/j_{max}$ 小于 $3T_s$，jerk过渡段将无法有效执行。建议：

$$
T_j \geq 5 T_s \quad \Rightarrow \quad j_{max} \leq \frac{a_{max}}{5 T_s}
$$

### 2. 浮点精度

七段式计算涉及 $t^3$ 项，在32位浮点下可能累积误差。建议：
- 使用 double（64位浮点）进行规划计算
- 最终输出转换为定点数（Q格式）给控制器

### 3. 内存占用

SCurveParams 结构体需要存储7段参数，约 200 字节。在RAM受限的MCU上，可以只存储当前段和下一段的参数。

### 4. 计算量

`scurve_plan()` 的计算量主要在二分搜索（最多50次迭代），适合在运动开始前离线计算。`scurve_evaluate()` 每个控制周期调用一次，计算量很小（7次比较+少量乘法）。

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| MC-TP-01 | 运动学约束：S曲线的物理约束基础 |
| CT-14 | 级联PID控制：位置环跟踪S曲线指令 |
| CE-16 | 轨迹跟踪：跟踪误差与S曲线的关系 |
| MC-MC-02 | 前馈控制：速度/加速度前馈配合S曲线 |
| MC-TP-03 | 多项式轨迹：另一种平滑轨迹方法 |
| MC-TP-04 | 多段拼接：多段S曲线的连续拼接 |
| MC-TP-05 | 时间最优：S曲线与时间最优的关系 |

## 参考文献

1. Biagiotti L., Melchiorri C., *Trajectory Planning for Automatic Machines and Robots*, Springer, 2008
2. Kroger T., *On-Line Trajectory Generation in Robotic Systems*, Springer, 2010
3. Macfarlane S., Croft E.A., "Jerk-Bounded Manipulator Trajectory Planning: Design for Real-Time Applications", *IEEE Trans. Robotics and Automation*, 2003
4. Haschke R., Weitnauer E., Ritter H., "On-Line Planning of Time-Optimal, Jerk-Limited Trajectories", *IEEE/RSJ IROS*, 2008
5. Lambrechts P., Boerlage M., Steinbuch M., "Trajectory Planning and Feedforward Design for Electromechanical Motion Systems", *Control Engineering Practice*, 2005
