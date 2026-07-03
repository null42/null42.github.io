---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-02: 速度与加速度前馈"
tags:
  - motor-control
status: learning
summary: '**副标题：反馈是"事后纠错"，前馈是"事前预判"——当Kff_v=1且Kff_a匹配系统惯量时，跟踪误差趋近于零，这就是前馈的魔力** **难度：** ★★★★☆ 专业级 **适用对象：** 伺服控制工程师、CNC/机器人运动控制开发者 **前置知识：** 前馈控制原理（CT-06）、位置环设计（MC-MC-01）、'
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-02: 速度与加速度前馈

**副标题：反馈是"事后纠错"，前馈是"事前预判"——当Kff_v=1且Kff_a匹配系统惯量时，跟踪误差趋近于零，这就是前馈的魔力**
**难度：** ★★★★☆ 专业级
**适用对象：** 伺服控制工程师、CNC/机器人运动控制开发者
**前置知识：** 前馈控制原理（CT-06）、位置环设计（MC-MC-01）、S曲线轨迹规划（MC-TP-02）

---

## 1. 📌 核心摘要

前馈控制的核心洞察是：**反馈在误差产生后才纠正，前馈在误差产生前就预防**。在位置伺服系统中，速度前馈 $K_{ff,v} \cdot \dot{\theta}^*$ 叠加到速度环给定端，消除恒速跟踪误差；加速度前馈 $K_{ff,a} \cdot \ddot{\theta}^*$ 叠加到电流环给定端，消除加速跟踪误差。当速度前馈增益 $K_{ff,v} = 1$ 且加速度前馈增益 $K_{ff,a} = J_{total} / K_t$ 时，系统跟踪误差趋近于零。前馈的关键前提是：参考轨迹的速度和加速度必须已知且平滑——这正是轨迹规划器（S曲线）的输出，而非数值微分的结果。常见错误是用数值微分获取参考导数，导致前馈注入噪声反而恶化性能。

---

## 2. 🤔 问题引入

### 工程师的真实困惑

**场景1：CNC铣圆总是缩径**
```text
工程师A："CNC铣圆，理论Φ100mm，实测Φ99.6mm，
       进给越快偏差越大..."
问题现象:
- 进给3000mm/min：偏差0.15mm
- 进给6000mm/min：偏差0.30mm
- 降Kp增大→震荡，不加前馈→无法消除
根因：P位置环的跟踪误差 e_ss = v/Kp
      两轴各偏0.15mm，叠加后圆弧缩径0.3mm
```

**场景2：加了前馈反而更差**
```text
工程师B："加了速度前馈后，位置跟踪出现超调，
       还不如纯P控制..."
问题现象:
- 纯P：跟踪慢但稳定，误差0.5°
- 加速度前馈Kff_v=1.0：出现10%超调
- 减小Kff_v到0.8：超调消失但误差没完全消除
根因：速度环实际增益不是精确的1.0
      前馈过补偿→反馈反向纠正→超调
```

**场景3：加速度前馈导致电流尖峰**
```text
工程师C："加了加速度前馈后，S曲线拐点处
       Iq出现尖峰，电机有异响..."
问题现象:
- 无加速度前馈：Iq平滑
- 加加速度前馈：S曲线加减速拐点Iq尖峰
- 用数值微分计算加速度→噪声放大
根因：数值微分会放大轨迹中的高频分量
      →加速度前馈注入噪声电流
```

### 核心问题

- 前馈为什么能消除跟踪误差？→ 逆模型补偿的数学本质
- 速度前馈和加速度前馈分别注入哪里？→ 注入点决定补偿效果
- 前馈增益怎么调？→ 先速度后加速度，逐步逼近
- 参考导数从哪里来？→ 轨迹规划器输出，不是数值微分

---

## 3. 💡 原理推导

### 3.1 前馈的数学本质——逆模型补偿

考虑完整的伺服系统模型（从速度给定到位置输出）：

$$\theta(s) = \frac{1}{s(\tau_s s + 1)} \cdot \omega^*(s)$$

理想情况下，如果我们知道需要的位置轨迹 $\theta^*(s)$，那么所需的速度给定应为：

$$\omega^*(s) = s(\tau_s s + 1) \cdot \theta^*(s) = \dot{\theta}^*(s) + \tau_s \ddot{\theta}^*(s)$$

这就是**逆模型**：被控对象传递函数的倒数。将其分解为：

$$\omega^*(s) = \underbrace{\dot{\theta}^*(s)}_{\text{速度前馈}} + \underbrace{\tau_s \ddot{\theta}^*(s)}_{\text{加速度前馈（速度环层）}}$$

但加速度前馈更精确的做法是直接注入电流环给定端（绕过速度环延迟）。

### 3.2 速度前馈——消除恒速跟踪误差

带速度前馈的位置环结构：

```text
θ* ──→[Kp]──→(+)──→ ω* ──→[速度环]──→ Iq* ──→[电流环/电机]──→ θ
       ↑       ↑                                        |
       |    Kff_v·dθ*/dt                                 |
       |                                                [1/s]
       └────────────────── θ_fb ←───────────────────────┘
```

闭环传递函数（速度环近似为一阶 $G_s(s) = 1/(\tau_s s + 1)$）：

$$\theta(s) = \frac{K_p + K_{ff,v} \cdot s}{s(\tau_s s + 1) + K_p} \cdot \theta^*(s)$$

**当 $K_{ff,v} = 1$ 时**：

$$\theta(s) = \frac{K_p + s}{s(\tau_s s + 1) + K_p} \cdot \theta^*(s)$$

对斜坡输入 $\theta^*(s) = v_{ref}/s^2$ 的稳态误差：

$$e_{ss} = \lim_{s \to 0} s \cdot \frac{v_{ref}/s^2}{1} \cdot \left(1 - \frac{K_p + s}{s(\tau_s s + 1) + K_p}\right)$$

$$= \lim_{s \to 0} s \cdot \frac{v_{ref}}{s^2} \cdot \frac{s(\tau_s s + 1) - s}{s(\tau_s s + 1) + K_p} = \lim_{s \to 0} \frac{v_{ref} \cdot \tau_s s}{s(\tau_s s + 1) + K_p} = 0$$

**结论**：速度前馈 $K_{ff,v} = 1$ 时，恒速跟踪误差为零！

对比无前馈时的 $e_{ss} = v_{ref}/K_p$，速度前馈的效果是决定性的。

### 3.3 加速度前馈——消除加速跟踪误差

速度前馈消除了恒速误差，但加速阶段仍有动态误差。考虑加速度前馈直接注入电流环给定端：

```text
θ* ──→[Kp]──→(+)──→ ω* ──→[速度环PI]──→(+)──→ Iq* ──→[电流环/电机]──→ θ
       ↑       ↑                      ↑                         |
       |    Kff_v·dθ*/dt         Kff_a·d²θ*/dt²                 |
       |                                                    [1/s]
       └────────────────── θ_fb ←─────────────────────────────┘
```

加速度前馈的物理含义：加速所需的转矩为 $\tau = J_{total} \cdot \ddot{\theta}$，对应的电流为：

$$I_{q,ff} = \frac{J_{total}}{K_t} \cdot \ddot{\theta}^* = K_{ff,a} \cdot \ddot{\theta}^*$$

因此加速度前馈增益的理论值为：

$$K_{ff,a} = \frac{J_{total}}{K_t}$$

### 3.4 完整前馈控制律

综合位置反馈P控制、速度前馈和加速度前馈：

$$u(t) = K_p \cdot (\theta^* - \theta) + K_{ff,v} \cdot \dot{\theta}^* + K_{ff,a} \cdot \ddot{\theta}^*$$

**零跟踪误差条件**：
- $K_{ff,v} = 1$：速度前馈完全补偿速度环的跟踪延迟
- $K_{ff,a} = J_{total} / K_t$：加速度前馈完全补偿惯性延迟

当两个条件同时满足时，系统对任意平滑轨迹的跟踪误差趋近于零（仅受未建模动态和扰动影响）。

### 3.5 前馈对闭环稳定性的影响

**关键性质：前馈不影响闭环极点！**

证明：前馈通路是从参考输入到控制输出的前向通路，不经过反馈回路。闭环特征方程仍为：

$$1 + K_p \cdot P(s) = 0$$

与无前馈时相同。因此：
- 前馈不影响稳定性
- 前馈不影响增益裕度和相位裕度
- 前馈只影响跟踪性能（从参考到输出的传递函数零点）

这是前馈相比增大Kp的根本优势：**提高跟踪精度而不牺牲稳定性**。

### 3.6 前馈增益误差的灵敏度

实际系统中 $K_{ff,v}$ 和 $K_{ff,a}$ 不可能精确匹配。设速度前馈增益偏差为 $\Delta K_{ff,v}$：

$$K_{ff,v} = 1 + \Delta K_{ff,v}$$

则恒速跟踪误差变为：

$$e_{ss} = \frac{|\Delta K_{ff,v}| \cdot v_{ref}}{K_p}$$

**灵敏度分析**：
- $\Delta K_{ff,v} = 0$（完美匹配）：$e_{ss} = 0$
- $\Delta K_{ff,v} = \pm 0.1$（10%偏差）：$e_{ss} = 0.1 v_{ref}/K_p$（比无前馈好10倍）
- $\Delta K_{ff,v} = -1$（前馈完全关闭）：$e_{ss} = v_{ref}/K_p$（退化为纯P控制）

**工程启示**：即使前馈增益有10~20%的偏差，跟踪误差仍可减小5~10倍。前馈对增益误差的鲁棒性很好。

---

## 4. 🔧 工程实现

### 4.1 前馈控制器核心代码

```c
/**
 * @brief 位置环P控制 + 速度/加速度前馈
 * @param pos_ref    位置给定 [rad]
 * @param vel_ref    速度给定（来自轨迹规划器）[rad/s]
 * @param acc_ref    加速度给定（来自轨迹规划器）[rad/s²]
 * @param pos_fb     位置反馈 [rad]
 * @param ctrl       控制器状态结构体
 * @retval 速度给定 [rad/s]
 */
float PositionLoop_WithFeedforward(float pos_ref, float vel_ref,
                                    float acc_ref, float pos_fb,
                                    PosLoopFFCtrl_t *ctrl)
{
    float pos_error;
    float speed_ref;
    float acc_feedforward;

    /* 1. 位置误差 */
    pos_error = pos_ref - pos_fb;

    /* 2. 误差限幅 */
    pos_error = CLAMP(pos_error, -ctrl->error_limit, ctrl->error_limit);

    /* 3. P控制 + 速度前馈 */
    speed_ref = ctrl->Kp * pos_error + ctrl->Kff_v * vel_ref;

    /* 4. 速度给定限幅 */
    speed_ref = CLAMP(speed_ref, -ctrl->speed_limit, ctrl->speed_limit);

    /* 5. 加速度前馈 → 电流环给定端 */
    acc_feedforward = ctrl->Kff_a * acc_ref;

    /* 6. 保存状态 */
    ctrl->pos_error = pos_error;
    ctrl->speed_ref = speed_ref;
    ctrl->iq_feedforward = acc_feedforward;

    return speed_ref;
}
```

### 4.2 加速度前馈注入电流环

```c
/**
 * @brief 速度环PI控制 + 加速度前馈
 * @param speed_ref   速度给定 [rad/s]
 * @param speed_fb    速度反馈 [rad/s]
 * @param iq_ff       电流前馈（来自加速度前馈）[A]
 * @param ctrl        速度环控制器
 * @retval Iq给定 [A]
 */
float SpeedLoop_WithAccFeedforward(float speed_ref, float speed_fb,
                                    float iq_ff, SpeedLoopCtrl_t *ctrl)
{
    float speed_error;
    float iq_ref;

    /* 1. 速度误差 */
    speed_error = speed_ref - speed_fb;

    /* 2. PI控制 */
    ctrl->integral += ctrl->Ki * speed_error * ctrl->Ts;
    ctrl->integral = CLAMP(ctrl->integral, -ctrl->integral_limit, ctrl->integral_limit);

    /* 3. PI输出 + 加速度前馈 */
    iq_ref = ctrl->Kp * speed_error + ctrl->integral + iq_ff;

    /* 4. Iq限幅 */
    iq_ref = CLAMP(iq_ref, -ctrl->iq_limit, ctrl->iq_limit);

    return iq_ref;
}
```

### 4.3 从S曲线轨迹规划器获取参考导数

```c
/**
 * @brief S曲线轨迹规划器输出（提供位置、速度、加速度三阶信号）
 * @note  关键：前馈需要的速度和加速度必须来自规划器，
 *        绝不能对位置给定做数值微分！
 */
typedef struct {
    float position;     /* 规划位置 [rad] */
    float velocity;     /* 规划速度 [rad/s] — 速度前馈用 */
    float acceleration; /* 规划加速度 [rad/s²] — 加速度前馈用 */
    float jerk;         /* 规划加加速度 [rad/s³] — 高级前馈用 */
} TrajectoryRef_t;

/**
 * @brief S曲线轨迹规划器单步计算
 * @param planner  规划器状态
 * @param Ts       采样周期 [s]
 * @retval 当前时刻的轨迹参考
 */
TrajectoryRef_t SCurve_Planner_Step(SCurvePlanner_t *planner, float Ts)
{
    TrajectoryRef_t ref = {0};

    /* 根据当前阶段（加加速/匀加速/减加速/匀速/...）计算 */
    switch (planner->phase) {
    case PHASE_ACCEL_JERK_UP:
        planner->acc += planner->jerk * Ts;
        break;
    case PHASE_ACCEL_CONST:
        /* acceleration unchanged */
        break;
    case PHASE_ACCEL_JERK_DOWN:
        planner->acc -= planner->jerk * Ts;
        break;
    case PHASE_CONST_SPEED:
        planner->acc = 0.0f;
        break;
    /* ... 其他阶段 ... */
    default:
        break;
    }

    /* 积分更新 */
    planner->vel += planner->acc * Ts;
    planner->pos += planner->vel * Ts;

    ref.position = planner->pos;
    ref.velocity = planner->vel;
    ref.acceleration = planner->acc;
    ref.jerk = planner->jerk;

    return ref;
}
```

### 4.4 完整前馈控制循环

```c
/**
 * @brief 前馈位置伺服控制主循环
 * @note  调用顺序：轨迹规划 → 位置环+速度前馈 → 速度环+加速度前馈 → 电流环
 */
void ServoControl_MainLoop(ServoSystem_t *sys)
{
    TrajectoryRef_t traj_ref;

    /* 1. S曲线轨迹规划（获取位置、速度、加速度参考） */
    traj_ref = SCurve_Planner_Step(&sys->planner, sys->Ts);

    /* 2. 位置环P控制 + 速度前馈 */
    sys->pos_ctrl.speed_ref = PositionLoop_WithFeedforward(
        traj_ref.position,      /* 位置给定 */
        traj_ref.velocity,      /* 速度前馈 */
        traj_ref.acceleration,  /* 加速度前馈 */
        sys->feedback.position, /* 位置反馈 */
        &sys->pos_ctrl
    );

    /* 3. 速度环PI控制 + 加速度前馈 */
    sys->speed_ctrl.iq_ref = SpeedLoop_WithAccFeedforward(
        sys->pos_ctrl.speed_ref,        /* 速度给定 */
        sys->feedback.speed,            /* 速度反馈 */
        sys->pos_ctrl.iq_feedforward,   /* 加速度前馈 */
        &sys->speed_ctrl
    );

    /* 4. 电流环（标准FOC） */
    CurrentLoop_Execute(&sys->current_ctrl, sys->speed_ctrl.iq_ref, &sys->feedback);
}
```

---

## 5. 🎛️ 参数整定与调试指南

### 5.1 前馈增益整定流程

**原则：先速度前馈，后加速度前馈；先反馈环调好，再加前馈**

```text
步骤1：确认位置环P控制已调好（无前馈时稳定）
步骤2：开启速度前馈，Kff_v从0开始
步骤3：给一个恒速运动指令，逐步增大Kff_v
       - Kff_v=0.5：跟踪误差减小约50%
       - Kff_v=0.8：跟踪误差减小约80%
       - Kff_v=1.0：跟踪误差趋近零
       - Kff_v>1.0：过补偿，出现超调
步骤4：如果Kff_v=1.0出现超调，说明速度环增益偏小
       → 微调Kff_v到0.9~0.95
步骤5：确认速度前馈OK后，开启加速度前馈
步骤6：Kff_a从0开始，逐步增大
       - 理论值：Kff_a = J_total / Kt
       - 实际值通常为理论值的0.8~1.0倍
步骤7：给一个加减速运动指令，观察加速度段的跟踪误差
```

### 5.2 速度前馈增益Kff_v的精确整定

**方法1：恒速跟踪误差法**
```text
1. 给恒速指令 v_ref
2. 测量无前馈时的跟踪误差 e_no_ff = v_ref / Kp
3. 开启速度前馈，调整Kff_v使跟踪误差最小
4. Kff_v_optimal ≈ 1 - e_with_ff / e_no_ff
```

**方法2：阶跃响应法**
```text
1. 给位置阶跃指令
2. Kff_v=0：纯P响应，无超调
3. Kff_v=1.0：观察是否有超调
4. 如果超调>5%：Kff_v偏大，减小到0.9~0.95
5. 如果无超调且响应快：Kff_v合适
```

### 5.3 加速度前馈增益Kff_a的精确整定

**方法1：惯量估计法**
```text
1. 估算总惯量 J_total = J_motor + J_load / (gear_ratio²)
2. Kff_a_theoretical = J_total / Kt
3. 从Kff_a_theoretical的50%开始
4. 逐步增大，观察加减速段的跟踪误差
```

**方法2：加速段误差法**
```text
1. 给一个S曲线运动指令（有明确的加减速段）
2. 无加速度前馈时，测量加速段的跟踪误差峰值 e_acc
3. 加速度前馈应提供 Iq_ff = Kff_a * a_ref
4. 调整Kff_a使加速段跟踪误差最小
```

### 5.4 常见错误与对策

| 错误 | 现象 | 对策 |
|------|------|------|
| 用数值微分获取参考导数 | 前馈注入噪声，电流抖动 | 使用轨迹规划器的解析输出 |
| Kff_v > 1.0 | 速度过补偿，位置超调 | Kff_v设为0.9~1.0 |
| 先调加速度前馈再调速度前馈 | 加速度前馈效果被速度误差掩盖 | 先调速度前馈，再调加速度前馈 |
| 前馈增益与负载变化不匹配 | 负载变化后跟踪误差增大 | 考虑自适应前馈或定期标定 |
| S曲线jerk过大 | 加速度前馈在拐点处产生电流尖峰 | 限制jerk或对前馈加低通滤波 |

### 5.5 前馈效果评估指标

| 指标 | 无前馈 | +速度前馈 | +速度+加速度前馈 |
|------|--------|----------|----------------|
| 恒速跟踪误差 | $v/K_p$ | ≈0 | ≈0 |
| 加速段跟踪误差峰值 | $a/K_p \cdot t$ | 减小50~70% | ≈0 |
| 位置阶跃超调 | 0~5% | 0~5% | 0~5% |
| 正弦跟踪相位滞后 | 大 | 减小80% | ≈0 |
| 闭环稳定性 | 基准 | 不变 | 不变 |

---

## 6. ⚡ 硬件约束

### 6.1 参考信号质量要求

前馈的效果直接取决于参考信号的速度和加速度质量：

| 参考来源 | 速度质量 | 加速度质量 | 适用场景 |
|---------|---------|-----------|---------|
| S曲线规划器 | 解析精确 | 解析精确 | ✅ 最佳 |
| 多项式轨迹 | 解析精确 | 解析精确 | ✅ 最佳 |
| 数值微分（1阶差分） | 噪声大 | 噪声极大 | ❌ 不可用 |
| 数值微分+低通滤波 | 可用但有延迟 | 延迟大 | ⚠️ 勉强可用 |
| 上位机给定（无规划） | 不可微 | 不可微 | ❌ 不能用前馈 |

### 6.2 DAC/ADC分辨率对前馈的影响

加速度前馈直接叠加到电流环给定，如果DAC分辨率不足，前馈的微小增量可能被量化：

$$\Delta I_{q,ff} = K_{ff,a} \cdot \Delta a_{ref}$$

当 $\Delta I_{q,ff}$ 小于1个DAC LSB时，前馈无效。典型12位DAC、电流满量程20A：

$$\Delta I_{LSB} = \frac{20}{4096} \approx 0.0049 \text{ A}$$

### 6.3 通信延迟对前馈的影响

当轨迹规划在上位机执行、前馈信号通过通信总线（如EtherCAT）下发时：

```text
上位机规划 → EtherCAT → 伺服驱动器
            ↑
         通信延迟（典型0.5~2ms）
```

如果位置给定和速度/加速度前馈不同步（延迟不一致），前馈效果会恶化。解决方案：
- 在驱动器内部实现轨迹规划（零延迟）
- 上位机一次性下发整段轨迹（缓冲执行）
- 确保位置和前馈信号在同一帧中传输

---

## 7. 🔗 交叉引用

| 模块 | 关联说明 |
|------|---------|
| [CT-06 前馈控制](../control-theory/CT-06-Feedforward-Control.md) | 前馈控制的通用理论框架 |
| [MC-MC-01 位置环设计](./MC-MC-01-Position-Loop.md) | 位置环P控制是前馈的基础，前馈解决P控制的跟踪误差 |
| [CE-16 轨迹跟踪](../controllers-evolution/CE-16-Trajectory-Tracking.md) | 从LQR/MPC理论视角讨论轨迹跟踪 |
| [MC-TP-02 S曲线速度规划](./MC-TP-02-Trapezoidal-S-Curve.md) | S曲线提供前馈所需的解析速度和加速度 |
| [ADV-ALG-07 前馈解耦](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md) | FOC中的反电动势前馈解耦 |
| [ALG-12 速度环与转矩观测器](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md) | 速度环是前馈注入的直接内环 |

---

## 8. 📚 参考文献

1. Ellis, G. *Control System Design Guide*, 4th Edition, Elsevier, 2012. — 第8章前馈控制，速度/加速度前馈的完整推导
2. Schmidt, C. & Heinzl, J. "Feedforward Control Design for High-Speed Positioning Systems", *IFAC Proceedings Volumes*, 2008.
3. Siemens SINUMERIK 840D sl — 前馈增益整定方法与Veloce前馈功能
4. Beckhoff AX5000 User Manual — 速度前馈和加速度前馈的参数说明
5. 郭庆鼎等. *交流伺服系统*, 机械工业出版社, 2006. — 前馈补偿的工程实现
6. Yao, B. et al. "Adaptive Robust Motion Control of Linear Motors for Precision Manufacturing", *IEEE Trans. Mechatronics*, 2004. — 自适应前馈在精密运动控制中的应用

---

## 📝 版本信息

- 模块编号：MC-MC-02
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
