---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-06: 多轴协调运动"
tags:
  - motor-control
status: learning
summary: '**副标题：单轴跑得再快，多轴不协调也白搭——从笛卡尔空间的直线/圆弧插补，到龙门同步的零差分误差控制，再到交叉耦合让"各管各的"变成"齐心协力"，多轴协调是运动控制从"驱动"到"运动"的质变** **难度：**  专家级 **适用对象：** CNC/机器人运动控制架构师、多轴协调算法开发者 **前置知识：*'
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-06: 多轴协调运动

**副标题：单轴跑得再快，多轴不协调也白搭——从笛卡尔空间的直线/圆弧插补，到龙门同步的零差分误差控制，再到交叉耦合让"各管各的"变成"齐心协力"，多轴协调是运动控制从"驱动"到"运动"的质变**
**难度：**  专家级
**适用对象：** CNC/机器人运动控制架构师、多轴协调算法开发者
**前置知识：** 插补原理（MC-TP-06）、电子齿轮与凸轮（MC-MC-05）、非线性MPC（CE-17）

---

## 1.  核心摘要

多轴协调运动解决的核心问题是：**多个电机如何协同完成空间轨迹，使末端执行器精确地沿预定路径运动**。与单轴控制"各管各的"不同，协调运动要求各轴在时间上严格同步、在空间上精确配合。核心技术包括：笛卡尔空间的直线插补（各轴按比例分配速度）和圆弧插补（参数化圆弧分解到各轴）；交叉耦合控制（cross-coupling control）将多轴的轮廓误差反馈到各轴控制器，实现"齐心协力"的误差修正；龙门同步控制（gantry control）要求两个电机驱动同一物理轴时差分误差趋近于零。协调运动的控制器架构为：轨迹规划器→插补器→各轴位置环，所有轴共享同一插补时钟。从主从同步到协调控制的本质升级是：主从只保证速度比，协调保证路径精度。

---

## 2.  问题引入

### 工程师的真实困惑

**场景1：CNC铣圆不圆**
```text
工程师A："X/Y两轴分别调好了，但圆弧插补铣出来的
       圆不是圆的，像椭圆，还有凸起..."
问题现象:
- X轴单独：阶跃响应完美，无超调
- Y轴单独：阶跃响应完美，无超调
- 圆弧插补：45°方向有凸起，0°/90°方向凹进
根因：两轴动态特性不一致（带宽不同、相位滞后不同）
      → 45°方向两轴误差叠加→轮廓误差最大
```

**场景2：龙门框架歪斜**
```text
工程师B："龙门两侧电机用电子齿轮同步，
       但加速时框架明显歪斜，有异响..."
问题现象:
- 匀速运行：两侧位置差<0.01mm
- 加速时：位置差达0.5mm
- 减速时：反向偏移
根因：电子齿轮只保证速度比，不保证差分误差
      → 两侧负载不对称时跟踪延迟不同
      → 需要龙门同步控制（差分位置环）
```

**场景3：3D打印拐角过切**
```text
工程师C："3D打印机在拐角处总是多打一点，
       导致拐角不锐利..."
问题现象:
- 直线段：精度好
- 拐角处：过切0.2mm
- 高速时更严重
根因：各轴独立控制→拐角处各轴不同时到位
      → 需要协调控制保证各轴同时到达
```

### 核心问题

- 多轴协调和主从同步有什么区别？→ 主从保速度比，协调保路径精度
- 直线/圆弧插补怎么实现？→ 参数化轨迹+轴分解
- 轮廓误差怎么计算和修正？→ 交叉耦合控制
- 龙门同步怎么做？→ 差分位置环+力矩分配
- 时间同步怎么保证？→ 共享插补时钟

---

## 3.  原理推导

### 3.1 协调运动 vs 主从同步

| 特性 | 主从同步 | 协调运动 |
|------|---------|---------|
| 控制目标 | 从轴跟随主轴 | 所有轴协同完成空间轨迹 |
| 误差定义 | 从轴位置误差 | 轮廓误差（空间路径偏差） |
| 通信方式 | 主→从单向 | 插补器→各轴广播 |
| 典型应用 | 传送带同步、电子齿轮 | CNC、机器人、3D打印 |
| 控制架构 | 串联 | 并联+协调层 |

### 3.2 直线插补

在笛卡尔空间中，从点 $\mathbf{P}_0 = (x_0, y_0, z_0)$ 到点 $\mathbf{P}_1 = (x_1, y_1, z_1)$ 的直线插补：

$$\mathbf{P}(t) = \mathbf{P}_0 + s(t) \cdot (\mathbf{P}_1 - \mathbf{P}_0)$$

其中 $s(t)$ 为归一化参数（$0 \leq s \leq 1$），由速度规划决定。

各轴的位置给定：

$$x^*(t) = x_0 + s(t) \cdot (x_1 - x_0)$$
$$y^*(t) = y_0 + s(t) \cdot (y_1 - y_0)$$
$$z^*(t) = z_0 + s(t) \cdot (z_1 - z_0)$$

各轴的速度给定：

$$\dot{x}^*(t) = \dot{s}(t) \cdot (x_1 - x_0)$$
$$\dot{y}^*(t) = \dot{s}(t) \cdot (y_1 - y_0)$$
$$\dot{z}^*(t) = \dot{s}(t) \cdot (z_1 - z_0)$$

**关键**：所有轴共享同一个 $s(t)$，保证同时到达终点。

### 3.3 圆弧插补

在XY平面上的圆弧插补（圆心 $\mathbf{C} = (c_x, c_y)$，半径 $R$，起始角 $\theta_0$，终止角 $\theta_1$）：

$$x^*(t) = c_x + R \cos(\theta(t))$$
$$y^*(t) = c_y + R \sin(\theta(t))$$

其中 $\theta(t)$ 由角速度规划决定。

各轴的速度给定：

$$\dot{x}^*(t) = -R \dot{\theta}(t) \sin(\theta(t))$$
$$\dot{y}^*(t) = R \dot{\theta}(t) \cos(\theta(t))$$

**3D圆弧**：通过平面定义+2D圆弧+法向量扩展到3D空间。

### 3.4 轮廓误差计算

轮廓误差定义为实际位置到期望轨迹的最短距离：

$$\varepsilon = \min_{\mathbf{P} \in \text{path}} \|\mathbf{P}_{actual} - \mathbf{P}\|$$

**直线轮廓误差**（2轴情况）：

设期望直线方向为单位向量 $\mathbf{t} = (\cos\alpha, \sin\alpha)$，法向量为 $\mathbf{n} = (-\sin\alpha, \cos\alpha)$。

各轴位置误差：$e_x = x^* - x$，$e_y = y^* - y$

轮廓误差（法向分量）：

$$\varepsilon = e_x \sin\alpha - e_y \cos\alpha$$

**圆弧轮廓误差**（近似）：

$$\varepsilon \approx \sqrt{e_x^2 + e_y^2} - \frac{|e_x \cos\theta + e_y \sin\theta|}{\sqrt{e_x^2 + e_y^2}} \cdot R$$

简化近似（小误差时）：

$$\varepsilon \approx e_r = \sqrt{(x - c_x)^2 + (y - c_y)^2} - R$$

### 3.5 交叉耦合控制（Cross-Coupling Control）

传统各轴独立控制无法减小轮廓误差——因为各轴的误差修正是独立的。交叉耦合控制将轮廓误差反馈到各轴控制器：

$$u_x = K_{p,x} e_x + K_{cc,x} \varepsilon$$
$$u_y = K_{p,y} e_y + K_{cc,y} \varepsilon$$

其中 $K_{cc,x}$ 和 $K_{cc,y}$ 为交叉耦合增益，方向与法向量一致：

$$K_{cc,x} = K_{cc} \cdot n_x = K_{cc} \cdot (-\sin\alpha)$$
$$K_{cc,y} = K_{cc} \cdot n_y = K_{cc} \cdot \cos\alpha$$

**效果**：轮廓误差被各轴"共同"修正，而不是各轴"各自"修正。

### 3.6 龙门同步控制

龙门结构中，两个电机驱动同一横梁：

```text
电机A ────────────────── 电机B
   │                        │
   └──── 横梁（刚性连接） ────┘
```

控制目标：
1. 横梁的平均位置跟踪给定（位置控制）
2. 两侧位置差趋近于零（同步控制）

**控制律**：

定义平均位置和差分位置：

$$\theta_{avg} = \frac{\theta_A + \theta_B}{2}, \quad \theta_{diff} = \theta_A - \theta_B$$

平均位置环（跟踪轨迹）：

$$\omega_{avg}^* = K_{p,avg} (\theta_{avg}^* - \theta_{avg})$$

差分位置环（消除歪斜）：

$$\omega_{diff}^* = K_{p,diff} (0 - \theta_{diff}) = -K_{p,diff} \cdot \theta_{diff}$$

各轴速度给定：

$$\omega_A^* = \omega_{avg}^* + \omega_{diff}^*$$
$$\omega_B^* = \omega_{avg}^* - \omega_{diff}^*$$

**关键**：差分环的带宽应远高于平均位置环，确保歪斜被快速消除。

### 3.7 协调运动控制器架构

```text
                    ┌─────────────┐
                    │  轨迹规划器  │
                    │ (S曲线/MPC) │
                    └──────┬──────┘
                           │ 空间轨迹 P*(t)
                    ┌──────▼──────┐
                    │   插补器     │
                    │ (直线/圆弧)  │
                    └──────┬──────┘
                           │ 各轴位置给定
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───────┐ ┌──▼───────┐
       │  X轴位置环  │ │ Y轴位置环│ │ Z轴位置环│
       │  + 前馈     │ │ + 前馈   │ │ + 前馈   │
       └──────┬──────┘ └──┬───────┘ └──┬───────┘
              │            │            │
       ┌──────▼──────┐ ┌──▼───────┐ ┌──▼───────┐
       │  X轴速度环  │ │ Y轴速度环│ │ Z轴速度环│
       └──────┬──────┘ └──┬───────┘ └──┬───────┘
              │            │            │
              │     ┌──────▼──────┐     │
              └────→│ 交叉耦合控制│←────┘
                    │ (轮廓误差)  │
                    └─────────────┘
```

---

## 4.  工程实现

### 4.1 两轴直线插补

```c
/**
 * @brief 两轴直线插补器
 */
typedef struct {
    /* 起点和终点 */
    float x0, y0;       /* 起点 [mm] */
    float x1, y1;       /* 终点 [mm] */

    /* 插补参数 */
    float dx, dy;       /* 增量 Δx, Δy */
    float length;       /* 线段长度 [mm] */
    float s;            /* 归一化参数 [0, 1] */
    float ds;           /* s的步进量（由速度决定） */

    /* 速度规划 */
    float feed_rate;    /* 进给速度 [mm/s] */
    float accel;        /* 加速度 [mm/s²] */

    /* 当前状态 */
    float x_ref, y_ref; /* 当前位置给定 [mm] */
    float vx_ref, vy_ref; /* 当前速度给定 [mm/s] */
    uint8_t finished;   /* 插补完成标志 */
} LinearInterp2D_t;

/**
 * @brief 初始化直线插补
 */
void LinearInterp2D_Init(LinearInterp2D_t *interp,
                          float x0, float y0, float x1, float y1,
                          float feed_rate, float accel, float Ts)
{
    interp->x0 = x0;
    interp->y0 = y0;
    interp->x1 = x1;
    interp->y1 = y1;
    interp->dx = x1 - x0;
    interp->dy = y1 - y0;
    interp->length = sqrtf(interp->dx * interp->dx + interp->dy * interp->dy);
    interp->s = 0.0f;
    interp->feed_rate = feed_rate;
    interp->accel = accel;
    interp->finished = 0;

    /* s的步进量 = v * Ts / L */
    interp->ds = feed_rate * Ts / interp->length;
}

/**
 * @brief 直线插补单步计算
 * @param interp  插补器
 * @param Ts      采样周期 [s]
 * @retval 当前归一化参数 s
 */
float LinearInterp2D_Step(LinearInterp2D_t *interp, float Ts)
{
    float v_current;

    if (interp->finished)
        return interp->s;

    /* 1. 速度规划（简化：匀速段） */
    v_current = interp->feed_rate;

    /* 2. 更新归一化参数 */
    interp->s += v_current * Ts / interp->length;

    /* 3. 到达终点检查 */
    if (interp->s >= 1.0f) {
        interp->s = 1.0f;
        interp->finished = 1;
    }

    /* 4. 计算各轴位置给定 */
    interp->x_ref = interp->x0 + interp->s * interp->dx;
    interp->y_ref = interp->y0 + interp->s * interp->dy;

    /* 5. 计算各轴速度给定（用于前馈） */
    float v_ratio = v_current / interp->length;
    interp->vx_ref = v_ratio * interp->dx;
    interp->vy_ref = v_ratio * interp->dy;

    return interp->s;
}
```

### 4.2 两轴圆弧插补

```c
/**
 * @brief 两轴圆弧插补器
 */
typedef struct {
    /* 圆弧参数 */
    float cx, cy;       /* 圆心 [mm] */
    float radius;       /* 半径 [mm] */
    float theta_start;  /* 起始角 [rad] */
    float theta_end;    /* 终止角 [rad] */
    float theta;        /* 当前角度 [rad] */
    int direction;      /* 1=逆时针, -1=顺时针 */

    /* 速度规划 */
    float angular_vel;  /* 角速度 [rad/s] */

    /* 当前状态 */
    float x_ref, y_ref;
    float vx_ref, vy_ref;
    uint8_t finished;
} ArcInterp2D_t;

/**
 * @brief 圆弧插补单步计算
 */
float ArcInterp2D_Step(ArcInterp2D_t *interp, float Ts)
{
    if (interp->finished)
        return interp->theta;

    /* 1. 更新角度 */
    interp->theta += interp->direction * interp->angular_vel * Ts;

    /* 2. 到达终点检查 */
    if (interp->direction > 0 && interp->theta >= interp->theta_end) {
        interp->theta = interp->theta_end;
        interp->finished = 1;
    } else if (interp->direction < 0 && interp->theta <= interp->theta_end) {
        interp->theta = interp->theta_end;
        interp->finished = 1;
    }

    /* 3. 计算各轴位置给定 */
    interp->x_ref = interp->cx + interp->radius * cosf(interp->theta);
    interp->y_ref = interp->cy + interp->radius * sinf(interp->theta);

    /* 4. 计算各轴速度给定（用于前馈） */
    float omega = interp->direction * interp->angular_vel;
    interp->vx_ref = -interp->radius * omega * sinf(interp->theta);
    interp->vy_ref = interp->radius * omega * cosf(interp->theta);

    return interp->theta;
}
```

### 4.3 交叉耦合控制

```c
/**
 * @brief 交叉耦合控制器
 * @note  根据轮廓误差修正各轴控制量
 */
typedef struct {
    float Kcc;          /* 交叉耦合增益 */
    float contour_err;  /* 当前轮廓误差 [mm] */

    /* 轨迹方向（由插补器更新） */
    float tx, ty;       /* 切向单位向量 */
    float nx, ny;       /* 法向单位向量 */
} CrossCouplingCtrl_t;

/**
 * @brief 交叉耦合控制计算
 * @param ccc     交叉耦合控制器
 * @param ex      X轴位置误差 [mm]
 * @param ey      Y轴位置误差 [mm]
 * @param[out] dx_corr  X轴修正量 [mm]
 * @param[out] dy_corr  Y轴修正量 [mm]
 */
void CrossCoupling_Calculate(CrossCouplingCtrl_t *ccc,
                              float ex, float ey,
                              float *dx_corr, float *dy_corr)
{
    /* 1. 计算轮廓误差（法向分量） */
    ccc->contour_err = ex * ccc->nx + ey * ccc->ny;

    /* 2. 交叉耦合修正（沿法向分配） */
    *dx_corr = ccc->Kcc * ccc->contour_err * ccc->nx;
    *dy_corr = ccc->Kcc * ccc->contour_err * ccc->ny;
}

/**
 * @brief 更新轨迹方向（每个插补周期调用）
 * @param ccc  交叉耦合控制器
 * @param vx   X轴速度给定 [mm/s]
 * @param vy   Y轴速度给定 [mm/s]
 */
void CrossCoupling_UpdateDirection(CrossCouplingCtrl_t *ccc,
                                    float vx, float vy)
{
    float speed;

    speed = sqrtf(vx * vx + vy * vy);

    if (speed > 0.001f) {
        /* 切向单位向量 */
        ccc->tx = vx / speed;
        ccc->ty = vy / speed;

        /* 法向单位向量（逆时针旋转90°） */
        ccc->nx = -ccc->ty;
        ccc->ny = ccc->tx;
    }
}
```

### 4.4 龙门同步控制

```c
/**
 * @brief 龙门同步控制器
 */
typedef struct {
    /* 平均位置环 */
    float Kp_avg;       /* 平均位置环增益 */
    float pos_ref;      /* 位置给定 [mm] */
    float pos_avg;      /* 平均位置反馈 [mm] */
    float speed_avg_ref;/* 平均速度给定 [mm/s] */

    /* 差分位置环 */
    float Kp_diff;      /* 差分位置环增益 */
    float Ki_diff;      /* 差分位置环积分增益 */
    float diff_limit;   /* 差分位置限幅 [mm] */
    float diff_integral;/* 差分积分项 */
    float pos_diff;     /* 差分位置反馈 [mm] */
    float speed_diff_ref;/* 差分速度给定 [mm/s] */

    /* 输出 */
    float speed_A_ref;  /* 电机A速度给定 [mm/s] */
    float speed_B_ref;  /* 电机B速度给定 [mm/s] */
} GantrySyncCtrl_t;

/**
 * @brief 龙门同步控制计算
 * @param ctrl    龙门同步控制器
 * @param pos_A   电机A位置反馈 [mm]
 * @param pos_B   电机B位置反馈 [mm]
 * @param Ts      采样周期 [s]
 */
void GantrySync_Calculate(GantrySyncCtrl_t *ctrl,
                           float pos_A, float pos_B, float Ts)
{
    float avg_error, diff_error;

    /* 1. 计算平均位置和差分位置 */
    ctrl->pos_avg = (pos_A + pos_B) / 2.0f;
    ctrl->pos_diff = pos_A - pos_B;

    /* 2. 平均位置环P控制 */
    avg_error = ctrl->pos_ref - ctrl->pos_avg;
    ctrl->speed_avg_ref = ctrl->Kp_avg * avg_error;

    /* 3. 差分位置环PI控制（消除歪斜） */
    diff_error = 0.0f - ctrl->pos_diff;  /* 目标差分=0 */

    ctrl->diff_integral += ctrl->Ki_diff * diff_error * Ts;
    ctrl->diff_integral = CLAMP(ctrl->diff_integral,
                                 -ctrl->diff_limit, ctrl->diff_limit);

    ctrl->speed_diff_ref = ctrl->Kp_diff * diff_error + ctrl->diff_integral;

    /* 4. 各轴速度给定 */
    ctrl->speed_A_ref = ctrl->speed_avg_ref + ctrl->speed_diff_ref;
    ctrl->speed_B_ref = ctrl->speed_avg_ref - ctrl->speed_diff_ref;
}
```

### 4.5 协调运动控制主循环

```c
/**
 * @brief 两轴协调运动控制主循环
 */
void CoordinatedMotion_MainLoop(CoordMotionSystem_t *sys)
{
    float x_ref, y_ref, vx_ref, vy_ref;
    float x_fb, y_fb;
    float ex, ey;
    float dx_corr, dy_corr;

    /* 1. 插补器更新（共享同一时钟） */
    if (sys->interp_type == INTERP_LINEAR) {
        LinearInterp2D_Step(&sys->linear_interp, sys->Ts);
        x_ref = sys->linear_interp.x_ref;
        y_ref = sys->linear_interp.y_ref;
        vx_ref = sys->linear_interp.vx_ref;
        vy_ref = sys->linear_interp.vy_ref;
    } else { /* INTERP_ARC */
        ArcInterp2D_Step(&sys->arc_interp, sys->Ts);
        x_ref = sys->arc_interp.x_ref;
        y_ref = sys->arc_interp.y_ref;
        vx_ref = sys->arc_interp.vx_ref;
        vy_ref = sys->arc_interp.vy_ref;
    }

    /* 2. 读取各轴位置反馈 */
    x_fb = sys->axis_x.feedback.position;
    y_fb = sys->axis_y.feedback.position;

    /* 3. 交叉耦合控制 */
    ex = x_ref - x_fb;
    ey = y_ref - y_fb;
    CrossCoupling_UpdateDirection(&sys->ccc, vx_ref, vy_ref);
    CrossCoupling_Calculate(&sys->ccc, ex, ey, &dx_corr, &dy_corr);

    /* 4. 各轴位置环（带前馈+交叉耦合修正） */
    sys->axis_x.speed_ref = PositionLoop_WithFeedforward(
        x_ref + dx_corr, vx_ref, 0.0f, x_fb, &sys->axis_x.pos_ctrl);

    sys->axis_y.speed_ref = PositionLoop_WithFeedforward(
        y_ref + dy_corr, vy_ref, 0.0f, y_fb, &sys->axis_y.pos_ctrl);

    /* 5. 各轴速度环 */
    sys->axis_x.iq_ref = SpeedLoop_Controller(
        sys->axis_x.speed_ref, sys->axis_x.feedback.speed,
        &sys->axis_x.speed_ctrl);

    sys->axis_y.iq_ref = SpeedLoop_Controller(
        sys->axis_y.speed_ref, sys->axis_y.feedback.speed,
        &sys->axis_y.speed_ctrl);
}
```

---

## 5.  参数整定与调试指南

### 5.1 协调运动调试流程

```text
步骤1：各轴独立调试
       - 分别调好X轴和Y轴的位置环、速度环
       - 确保各轴单独运动时稳定、无超调
步骤2：低速协调测试
       - 低速（10%额定）直线插补
       - 观察轮廓误差
       - 如果轮廓误差大→检查各轴带宽是否一致
步骤3：高速协调测试
       - 逐步提高进给速度
       - 观察轮廓误差随速度的变化
       - 如果高速误差大→加前馈
步骤4：交叉耦合调试
       - 先不加交叉耦合，记录轮廓误差
       - 加入交叉耦合，Kcc从0.1开始
       - 逐步增大Kcc直到轮廓误差最小
步骤5：圆弧测试
       - 铣圆测试（最敏感的协调测试）
       - 调整各轴参数使圆度误差最小
```

### 5.2 交叉耦合增益Kcc整定

```text
方法1：经验法
- Kcc从0.1开始
- 每次增加0.1
- 观察轮廓误差变化
- 轮廓误差最小时为最佳Kcc

方法2：计算法
- Kcc ≈ Kp / 2（Kp为位置环增益）
- 从此值开始微调
```

### 5.3 龙门同步参数整定

```text
步骤1：差分位置环整定
- 先不加平均位置环
- 给差分位置一个阶跃（手动偏移一侧）
- 调整Kp_diff使差分位置快速归零
- 差分环带宽应为平均位置环的3~5倍

步骤2：平均位置环整定
- 与单轴位置环整定方法相同
- Kp_avg基于两轴总惯量

步骤3：联合测试
- 给平均位置阶跃给定
- 观察两侧位置差（应<0.01mm）
- 加速时差分误差应<0.1mm
```

### 5.4 轮廓误差评估

| 测试方法 | 评估指标 | 合格标准（通用伺服） | 合格标准（精密伺服） |
|---------|---------|--------------------|--------------------|
| 直线插补 | 直线度误差 | <0.05mm | <0.005mm |
| 圆弧插补 | 圆度误差 | <0.1mm | <0.01mm |
| 拐角运动 | 过切/欠切 | <0.1mm | <0.01mm |
| 龙门同步 | 差分误差 | <0.05mm | <0.005mm |

### 5.5 常见问题与对策

| 问题 | 原因 | 对策 |
|------|------|------|
| 圆弧呈椭圆 | 两轴带宽不一致 | 匹配两轴带宽（以慢轴为准） |
| 45°方向凸起 | 两轴相位滞后不同 | 交叉耦合控制 |
| 龙门加速歪斜 | 差分环带宽不够 | 增大Kp_diff |
| 拐角过切 | 各轴不同时到位 | 降低拐角速度或加前瞻 |
| 高速轮廓误差大 | 前馈不足 | 加速度前馈 |

---

## 6.  硬件约束

### 6.1 各轴动态特性匹配

协调运动的前提是各轴的动态特性（带宽、相位延迟）尽可能一致：

| 参数 | 匹配要求 | 不匹配的后果 |
|------|---------|-------------|
| 位置环带宽 | 差异<20% | 圆弧变形 |
| 速度环带宽 | 差异<30% | 高速轮廓误差 |
| 位置环Kp | 差异<10% | 45°方向凸起 |
| 编码器分辨率 | 相同 | 量化误差不一致 |

### 6.2 插补时钟同步

所有轴必须共享同一插补时钟，时钟偏差直接影响轮廓误差：

$$\varepsilon_{sync} = v \cdot \Delta t_{sync}$$

| 同步方式 | 时钟偏差 | 轮廓误差（v=1m/s） |
|---------|---------|-------------------|
| EtherCAT分布式时钟 | ±1 μs | 0.001 mm |
| CANopen同步 | ±0.5 ms | 0.5 mm |
| 独立时钟 | ±1 ms | 1 mm |

### 6.3 通信带宽需求

n轴协调运动的通信数据量：

$$\text{Data} = n \times (pos + vel + status) \times f_{interp}$$

以3轴、4字节/信号、1kHz插补为例：

$$\text{Data} = 3 \times (4+4+2) \times 1000 = 30 \text{ KB/s}$$

EtherCAT可轻松满足，CANopen在多轴高速时可能成为瓶颈。

---

## 7.  交叉引用

| 模块 | 关联说明 |
|------|---------|
| [MC-TP-06 插补原理](./MC-TP-06-Interpolation.md) | 插补是协调运动的数学基础 |
| [MC-MC-05 电子齿轮与凸轮](./MC-MC-05-Electronic-Gearing.md) | 电子齿轮是协调运动的简化特例 |
| [MC-MC-01 位置环设计](./MC-MC-01-Position-Loop.md) | 各轴位置环是协调运动的执行层 |
| [MC-MC-02 速度与加速度前馈](./MC-MC-02-Feedforward.md) | 前馈减小各轴跟踪延迟→减小轮廓误差 |
| [CE-17 非线性MPC](../controllers-evolution/CE-17-Nonlinear-MPC.md) | MPC可实现最优多轴协调控制 |
| [COM-06 EtherCAT](../communication/COM-06-EtherCAT.md) | EtherCAT分布式时钟保证多轴时间同步 |

---

## 8.  参考文献

1. Koren, Y. *Computer Control of Manufacturing Systems*, McGraw-Hill, 1983. — 交叉耦合控制的原始提出
2. Yeh, S.S. & Hsu, P.L. "Estimation of the Contouring Error Vector for the Cross-Coupled Control Design", *IEEE/ASME Trans. Mechatronics*, 2002.
3. Barton, K.L. & Alleyne, A.G. "A Precision Motion Control Architecture for Cross-Coupled Multiple Axis Systems", *IEEE Trans. Control Syst. Technol.*, 2008.
4. Altintas, Y. *Manufacturing Automation*, 2nd Edition, Cambridge, 2012. — CNC多轴协调的完整论述
5. Siemens SINUMERIK 840D sl — 龙门同步与交叉耦合功能手册
6. 王晓远等. *伺服系统与运动控制*, 机械工业出版社, 2018. — 多轴协调的工程实现

---

##  版本信息

- 模块编号：MC-MC-06
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
