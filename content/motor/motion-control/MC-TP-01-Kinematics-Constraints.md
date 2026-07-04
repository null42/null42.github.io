---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-01: 运动学基础与约束"
tags:
  - motor-control
status: learning
summary: 从位置到加加速度——理解运动约束的物理根源
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-01: 运动学基础与约束

## 副标题

从位置到加加速度——理解运动约束的物理根源

## 难度



## 适用对象

- 伺服驱动器固件工程师
- 运动控制器算法工程师
- 机器人运动规划开发者
- 数控系统开发人员

## 前置知识

- CT-01: 开环与闭环控制基础
- CT-02: 时域分析
- ALG-12: 速度环与转矩观测器
- 基本微积分（导数与积分）

## 核心摘要

运动学约束是轨迹规划的物理基础。位置、速度、加速度、加加速度（jerk）构成运动学层级，每一层都有明确的物理来源：电机转矩限制约束加速度，机械共振与齿轮间隙约束加加速度，编码器分辨率约束位置精度。理解这些约束的物理根源，是设计合理轨迹规划算法的前提——任何超越物理约束的规划都是空中楼阁。

## 问题引入

### 工程场景

**场景1：半导体晶圆搬运机器人**

晶圆搬运机械手需要在真空腔室中快速移动晶圆。如果加速度过大，晶圆会因惯性力滑落；如果加加速度过大，机械臂的谐振会被激发，导致定位精度下降至微米级以下。工程师必须在速度和精度之间找到平衡。

**场景2：数控机床高速加工**

五轴加工中心在加工复杂曲面时，各轴的加速度和速度必须严格限制。超过限制会导致刀具磨损加剧、加工表面出现振纹，甚至损坏主轴轴承。一个合理的轨迹规划必须尊重每一轴的物理约束。

**场景3：协作机器人安全停止**

协作机器人在检测到碰撞风险时需要紧急停止。但"紧急"不等于"瞬间"——无限大的加加速度会产生巨大的冲击力，反而可能伤害人员。安全停止同样需要遵循加加速度约束。

### 核心问题

> 为什么轨迹规划不能简单地"越快越好"？运动系统的物理约束到底有哪些？它们之间如何相互制约？

## 原理推导

### 1. 运动学层级

运动学的基本量构成严格的层级关系，每一层是上一层的导数、下一层的积分：

$$
\begin{aligned}
q(t) &\quad \text{— 位置 (Position)} \\
\dot{q}(t) &= \frac{dq}{dt} \quad \text{— 速度 (Velocity)} \\
\ddot{q}(t) &= \frac{d^2q}{dt^2} \quad \text{— 加速度 (Acceleration)} \\
\dddot{q}(t) &= \frac{d^3q}{dt^3} \quad \text{— 加加速度 (Jerk)}
\end{aligned}
$$

反向关系为积分：

$$
\begin{aligned}
\dot{q}(t) &= \dot{q}(t_0) + \int_{t_0}^{t} \ddot{q}(\tau) \, d\tau \\
q(t) &= q(t_0) + \int_{t_0}^{t} \dot{q}(\tau) \, d\tau
\end{aligned}
$$

### 2. 物理约束的来源

#### 2.1 加速度约束 ← 电机转矩限制

电机输出转矩 $T_m$ 受到电流限制 $I_{max}$ 的约束：

$$
T_{max} = K_t \cdot I_{max}
$$

其中 $K_t$ 为转矩常数。根据牛顿第二定律，加速度受到限制：

$$
\ddot{q}_{max} = \frac{T_{max} - T_{friction} - T_{load}}{J_{total}}
$$

其中总转动惯量：

$$
J_{total} = J_m + J_l / n^2
$$

$J_m$ 为转子惯量，$J_l$ 为负载惯量，$n$ 为减速比。

**关键洞察**：加速度约束不是常数！在高速运行时，反电动势增大，可用转矩下降：

$$
T_{available}(\omega) = K_t \cdot \sqrt{I_{max}^2 - \left(\frac{V_{dc} - K_e \omega}{R_s}\right)^2}
$$

这意味着在弱磁区域，加速度约束随速度变化。

#### 2.2 加加速度约束 ← 机械共振与间隙

加加速度约束的物理来源更为隐蔽，但同样重要：

1. **机械共振激发**：突然的加速度变化（即高 jerk）会在机械系统中激发共振模态。共振频率 $f_r$ 与系统刚度 $k$ 和惯量 $J$ 的关系：

$$
f_r = \frac{1}{2\pi}\sqrt{\frac{k}{J}}
$$

当加加速度的频率分量接近 $f_r$ 时，振幅会被放大 $Q$ 倍（$Q$ 为品质因数）。

2. **齿轮间隙（Backlash）**：加速度突变时，齿轮间隙会导致"敲击"效应，产生噪声和定位误差。典型齿轮间隙引起的定位误差：

$$
\Delta q_{backlash} = \frac{\Delta \theta_{gap}}{n}
$$

3. **结构振动**：加加速度激发的结构振动衰减时间 $t_{settle}$ 与阻尼比 $\zeta$ 的关系：

$$
t_{settle} \approx \frac{4}{\zeta \omega_n}
$$

#### 2.3 速度约束 ← 多重限制

速度约束来自多个方面：

- **电机最大转速**：$\omega_{max} = \frac{V_{dc}}{K_e}$（反电动势限制）
- **机械安全限制**：轴承、密封件的线速度限制
- **编码器带宽限制**：高速时编码器脉冲频率超过计数器上限
- **电流环带宽限制**：高速时电流环无法有效跟踪

#### 2.4 位置分辨率约束 ← 编码器与量化

位置分辨率由编码器线数和细分决定：

$$
\Delta q_{min} = \frac{2\pi}{N_{lines} \times N_{interpolation}}
$$

例如：2500线编码器 × 4倍细分 → $\Delta q_{min} = \frac{2\pi}{10000} \approx 0.000628$ rad

位置量化导致速度测量的分辨率限制：

$$
\Delta \dot{q}_{min} = \frac{\Delta q_{min}}{T_s}
$$

### 3. 约束边界可视化

#### 3.1 速度-加速度平面

在速度-加速度平面上，可行域由以下边界围成：

$$
\begin{cases}
|\dot{q}| \leq v_{max} & \text{速度限制} \\
|\ddot{q}| \leq a_{max}(\dot{q}) & \text{加速度限制（速度相关）} \\
\end{cases}
$$

在弱磁区域，$a_{max}$ 随速度增大而减小，可行域呈现"削顶"特征。

#### 3.2 加速度-Jerk平面

$$
\begin{cases}
|\ddot{q}| \leq a_{max} & \text{加速度限制} \\
|\dddot{q}| \leq j_{max} & \text{Jerk限制} \\
\end{cases}
$$

Jerk限制意味着加速度不能瞬间变化，从一个加速度值过渡到另一个需要时间：

$$
\Delta t_{accel\_transition} = \frac{|\ddot{q}_2 - \ddot{q}_1|}{j_{max}}
$$

### 4. 运动学方程的完整形式

给定 jerk 曲线 $\dddot{q}(t)$，可以逐级积分得到所有运动量：

$$
\begin{aligned}
\ddot{q}(t) &= \ddot{q}(0) + \int_0^t \dddot{q}(\tau) d\tau \\
\dot{q}(t) &= \dot{q}(0) + \int_0^t \ddot{q}(\tau) d\tau \\
q(t) &= q(0) + \int_0^t \dot{q}(\tau) d\tau
\end{aligned}
$$

对于恒定 jerk 段（$\dddot{q} = J = \text{const}$），解析解为：

$$
\begin{aligned}
\ddot{q}(t) &= \ddot{q}_0 + Jt \\
\dot{q}(t) &= \dot{q}_0 + \ddot{q}_0 t + \frac{1}{2}Jt^2 \\
q(t) &= q_0 + \dot{q}_0 t + \frac{1}{2}\ddot{q}_0 t^2 + \frac{1}{6}Jt^3
\end{aligned}
$$

### 5. 约束与电机参数的关系

将运动学约束映射到电机参数：

| 运动学约束 | 物理来源 | 关键电机参数 |
|-----------|---------|-------------|
| $v_{max}$ | 反电动势限制 | $K_e$, $V_{dc}$ |
| $a_{max}$ | 转矩/电流限制 | $K_t$, $I_{max}$, $J_{total}$ |
| $j_{max}$ | 机械共振/间隙 | 系统刚度 $k$, 阻尼 $\zeta$ |
| $\Delta q_{min}$ | 编码器分辨率 | $N_{lines}$, $N_{interpolation}$ |

惯量比对加速度能力的影响：

$$
a_{max} = \frac{K_t \cdot I_{max}}{J_m(1 + J_l/(n^2 J_m))}
$$

当负载惯量 $J_l$ 远大于电机惯量 $J_m$ 时（高惯量比），加速度能力急剧下降。这是伺服选型中"惯量匹配"原则的理论基础。

## 工程实现

### 约束结构体定义

```c
#include <stdint.h>
#include <math.h>

/* 运动学约束结构体 */
typedef struct {
    double v_max;       /* 最大速度 [rad/s 或 mm/s] */
    double a_max;       /* 最大加速度 [rad/s² 或 mm/s²] */
    double j_max;       /* 最大加加速度 [rad/s³ 或 mm/s³] */
    double q_min;       /* 位置下限 */
    double q_max;       /* 位置上限 */
    double pos_res;     /* 位置分辨率 [rad 或 mm] */
} KinematicConstraints;

/* 运动状态结构体 */
typedef struct {
    double q;       /* 位置 */
    double v;       /* 速度 */
    double a;       /* 加速度 */
    double j;       /* 加加速度 */
} MotionState;

/* 从电机参数计算运动学约束 */
void constraints_from_motor_params(
    double Kt,           /* 转矩常数 [Nm/A] */
    double Ke,           /* 反电动势常数 [V·s/rad] */
    double I_max,        /* 最大电流 [A] */
    double V_dc,         /* 母线电压 [V] */
    double J_motor,      /* 电机惯量 [kg·m²] */
    double J_load,       /* 负载惯量 [kg·m²] */
    double gear_ratio,   /* 减速比 */
    double stiffness,    /* 系统刚度 [Nm/rad] */
    double damping_ratio,/* 阻尼比 */
    KinematicConstraints *c)
{
    double J_total = J_motor + J_load / (gear_ratio * gear_ratio);

    /* 加速度约束：由最大转矩和总惯量决定 */
    double T_max = Kt * I_max;
    c->a_max = T_max / J_total;

    /* 速度约束：由反电动势和母线电压决定 */
    c->v_max = V_dc / Ke;

    /* Jerk约束：由机械共振频率和阻尼比估算 */
    /* 经验法则：j_max ≈ a_max × ω_n × (2ζ + 0.5) */
    double omega_n = sqrt(stiffness / J_total);
    c->j_max = c->a_max * omega_n * (2.0 * damping_ratio + 0.5);

    /* 位置分辨率：假设2500线编码器4倍细分 */
    c->pos_res = 2.0 * M_PI / (2500.0 * 4.0);
}

/* 检查运动状态是否满足约束 */
int check_constraints(const MotionState *s, const KinematicConstraints *c)
{
    if (fabs(s->v) > c->v_max) return -1;  /* 速度超限 */
    if (fabs(s->a) > c->a_max) return -2;  /* 加速度超限 */
    if (fabs(s->j) > c->j_max) return -3;  /* Jerk超限 */
    if (s->q < c->q_min || s->q > c->q_max) return -4; /* 位置超限 */
    return 0;  /* 满足约束 */
}

/* 恒定jerk段的前向积分 */
void integrate_jerk_segment(
    double jerk,        /* 恒定jerk值 */
    double dt,          /* 时间步长 */
    MotionState *state) /* 输入/输出运动状态 */
{
    double j = jerk;
    double a0 = state->a;
    double v0 = state->v;
    double q0 = state->q;

    state->a = a0 + j * dt;
    state->v = v0 + a0 * dt + 0.5 * j * dt * dt;
    state->q = q0 + v0 * dt + 0.5 * a0 * dt * dt + (1.0/6.0) * j * dt * dt * dt;
    state->j = j;
}
```

### 弱磁区域加速度约束

```c
/* 考虑弱磁的加速度约束（速度相关） */
double acceleration_limit_at_speed(
    double speed,              /* 当前速度 [rad/s] */
    const KinematicConstraints *c,
    double Ke, double V_dc, double Rs, double Kt, double I_max)
{
    /* 基本加速度限制 */
    double a_base = c->a_max;

    /* 弱磁区域：可用电流减小 */
    double I_available_sq = I_max * I_max
        - (V_dc - Ke * speed) * (V_dc - Ke * speed) / (Rs * Rs);

    if (I_available_sq > 0.0) {
        double I_available = sqrt(I_available_sq);
        double a_available = Kt * I_available / (c->a_max / (Kt * I_max));
        /* 取较小值 */
        if (a_available < a_base) {
            a_base = a_available;
        }
    } else {
        /* 速度已超过反电动势限制 */
        a_base = 0.0;
    }

    return a_base;
}
```

## 参数整定/调试指南

### 1. 约束参数确定方法

| 参数 | 测量方法 | 典型值范围 |
|------|---------|-----------|
| $v_{max}$ | 逐步增大速度给定，观察电流环饱和 | 3000~10000 rpm |
| $a_{max}$ | 阶跃速度给定，测量最大加速度 | 1000~50000 rad/s² |
| $j_{max}$ | 阶跃加速度给定，观察振动 | $a_{max} \times (100 \sim 1000)$ |
| $\Delta q_{min}$ | 编码器规格书 | 0.001°~0.1° |

### 2. Jerk约束的实验确定

Jerk约束难以从规格书直接获取，推荐实验方法：

1. **阶跃加速度法**：给定阶跃加速度指令，逐步增大，用加速度计测量振动
2. **频率扫描法**：用正弦加速度激励，扫描频率，找到共振点
3. **经验公式**：$j_{max} \approx a_{max} \times \omega_n$，其中 $\omega_n$ 为系统第一阶固有频率

### 3. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 定位超调 | 加速度约束过大 | 降低 $a_{max}$ 或引入 jerk 限制 |
| 运动抖动 | Jerk约束过大 | 降低 $j_{max}$，增加加速度过渡时间 |
| 定位时间过长 | 约束过于保守 | 逐步增大约束，观察振动 |
| 高速振动 | 弱磁区域加速度未限制 | 使用速度相关的加速度约束 |
| 位置稳态波动 | 编码器分辨率不足 | 增加细分或更换高分辨率编码器 |

### 4. 惯量比对系统性能的影响

惯量比 $R_J = J_l / J_m$ 是伺服系统设计的关键指标：

- $R_J < 3$：理想范围，系统响应快且稳定
- $3 < R_J < 10$：可接受范围，需要降低增益
- $R_J > 10$：需要增加减速比或更换更大电机

## 硬件约束

### 1. 编码器分辨率对速度测量的影响

低速时速度测量噪声大，因为相邻采样间的脉冲数极少：

$$
\dot{q}_{measured} = \frac{\Delta q_{count} \times \Delta q_{min}}{T_s}
$$

当 $\Delta q_{count} = 1$ 时，速度分辨率最差。解决方案：
- M/T法测速（低速用T法，高速用M法）
- 增加编码器线数
- 使用观测器滤波

### 2. 电流环带宽对加速度跟踪的影响

加速度跟踪需要电流环能够快速响应。电流环带宽 $f_{bw}$ 与最大可跟踪加速度频率的关系：

$$
f_{accel\_track} \approx \frac{f_{bw}}{5}
$$

如果 jerk 对应的加速度变化频率超过此限制，实际加速度将无法跟踪给定。

### 3. PWM分辨率对转矩分辨率的影响

PWM分辨率决定了电流/转矩的最小步进：

$$
\Delta T_{min} = K_t \cdot \frac{V_{dc}}{R_s} \cdot \frac{1}{2^{N_{PWM}}}
$$

这直接影响加速度的分辨率。

### 4. 采样率约束

控制周期 $T_s$ 决定了轨迹规划的时间分辨率：

$$
\Delta t_{min} = T_s
$$

典型值：电流环 10~50 kHz，速度环 1~10 kHz，位置环 0.5~5 kHz。轨迹规划通常在位置环周期执行。

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| CT-01 | 开环与闭环控制：约束在闭环中的体现 |
| CT-02 | 时域分析：阶跃响应与约束的关系 |
| ALG-12 | 速度环与转矩观测器：加速度约束与速度环带宽 |
| MC-TP-02 | 梯形与S曲线规划：基于约束的速度曲线设计 |
| MC-TP-05 | 时间最优规划：在约束边界上运行 |
| CE-16 | 轨迹跟踪：跟踪误差与约束的关系 |
| HW-03 | 位置传感器：编码器分辨率与约束 |

## 参考文献

1. Biagiotti L., Melchiorri C., *Trajectory Planning for Automatic Machines and Robots*, Springer, 2008
2. Kroger T., *On-Line Trajectory Generation in Robotic Systems*, Springer, 2010
3. Macfarlane S., Croft E.A., "Jerk-Bounded Manipulator Trajectory Planning: Design for Real-Time Applications", *IEEE Trans. Robotics and Automation*, 2003
4. 郭庆鼎, 孙宜标, 王丽梅, 《直线交流伺服系统的精密控制技术》, 机械工业出版社, 2000
5. Erkorkmaz K., Altintas Y., "High Speed CNC System Design. Part I: Jerk Limited Trajectory Generation and Quintic Spline Interpolation", *Int. J. Machine Tools and Manufacture*, 2001
