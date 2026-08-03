---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-01: 位置环设计与整定"
tags:
  - motor-control
status: learning
summary: '**副标题：为什么伺服位置环几乎只用P？——从I型系统阶跃响应零稳态误差的数学本质，到带宽法则Kp ≤ ω_speed/3的工程约束，位置环是三环级联中"最简单却最容易调错"的一环** **难度：**  进阶级 **适用对象：** 伺服驱动调试工程师、运动控制算法开发者、CNC/机器人控制工程师 **前置知识'
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-01: 位置环设计与整定

**副标题：为什么伺服位置环几乎只用P？——从I型系统阶跃响应零稳态误差的数学本质，到带宽法则Kp ≤ ω_speed/3的工程约束，位置环是三环级联中"最简单却最容易调错"的一环**
- **难度：**  进阶级
- **适用对象：** 伺服驱动调试工程师、运动控制算法开发者、CNC/机器人控制工程师
- **前置知识：** 三环级联PID（CT-14）、速度环设计（ALG-12）、频域分析基础（CT-03）

---

## 1.  核心摘要

位置环是伺服三环级联控制的最外层，其输出作为速度环的给定。位置环的核心设计原则是：**几乎只用比例控制（P-only）**。这不是偷懒，而是有严格的数学依据——在I型系统（速度环闭环后含一个积分环节）中，纯比例控制对阶跃输入的稳态误差为零；加入积分项会导致超调增大、相位裕度降低；加入微分项则放大位置反馈噪声（编码器量化噪声在微分后被急剧放大）。位置环Kp的整定遵循带宽分离法则：$\omega_{pos} \leq \omega_{speed} / 3$，保证外环有足够的相位裕度。然而，纯比例控制对恒速输入存在常值跟踪误差 $e_{ss} = v_{ref} / K_p$，这在CNC加工中直接影响尺寸精度——这正是前馈控制（MC-MC-02）要解决的核心问题。

---

## 2.  问题引入

### 工程师的真实困惑

**场景1：位置环加了积分，电机开始震荡**
```text
工程师A："位置跟踪有0.5°的稳态偏差，我给位置环加了积分项，
       结果电机到位后来回震荡，调小Ki也没用..."
问题现象:
- P-only：到位后稳态偏差0.5°，无震荡
- 加Ki后：到位后±2°震荡，持续5秒才收敛
- 减小Ki：震荡频率降低但持续时间更长
根因：位置环内已含速度环的积分（I型系统），
      再加积分→系统变成II型→相位裕度骤降→超调/震荡
```

**场景2：位置环Kp调不大，一调大就啸叫**
```text
工程师B："位置环Kp从30调到100，跟踪误差从1.5°降到0.5°，
       但继续调到200时电机开始800Hz啸叫..."
问题现象:
- Kp=30：跟踪误差1.5°，响应慢
- Kp=100：跟踪误差0.5°，响应尚可
- Kp=200：电机啸叫，Iq振荡
根因：位置环带宽超过速度环1/3→相位裕度不足
      →速度环无法跟踪位置环的高频输出→激发机械谐振
```

**场景3：CNC加工尺寸偏差**
```text
工程师C："CNC铣圆，理论直径100mm，实测99.7mm，
       每个轴都有0.15mm的跟踪误差..."
问题现象:
- 单轴定位精度：±0.01mm（静态）
- 圆弧插补时：直径偏差0.3mm
- 降低进给速度后偏差减小
根因：恒速进给时位置环P控制产生常值跟踪误差
      e_ss = v_ref / Kp，两轴误差叠加→圆弧缩径
```

### 核心问题

- 位置环为什么只用P？→ I型系统阶跃零稳态误差的数学证明
- 位置环Kp上限由什么决定？→ 带宽分离法则的频域推导
- 跟踪误差的本质是什么？→ P控制对斜坡输入的常值稳态误差
- 编码器分辨率如何影响位置环性能？→ 量化噪声与分辨率极限

---

## 3.  原理推导

### 3.1 位置环在级联结构中的位置

三环级联控制结构中，位置环是最外层：

```text
位置给定 θ* ──→[位置环P]──→ 速度给定 ω* ──→[速度环PI]──→ Iq给定 ──→[电流环PI]──→ Vd/Vq
   ↑                                                    ↑                ↑
位置反馈 θ                                          速度反馈 ω        电流反馈 Id/Iq
```

位置环的输出就是速度环的给定：
$$\omega^* = K_p (\theta^* - \theta)$$

### 3.2 为什么位置环只用P——I型系统分析

速度环闭环后，从速度给定 $\omega^*$ 到位置输出 $\theta$ 的传递函数为：

$$G_{speed\_cl}(s) = \frac{\omega(s)}{\omega^*(s)} \approx \frac{1}{\tau_s s + 1}$$

其中 $\tau_s = 1/\omega_{speed}$ 为速度环闭环时间常数。位置环被控对象为：

$$P(s) = \frac{\theta(s)}{\omega^*(s)} = \frac{1}{s} \cdot G_{speed\_cl}(s) = \frac{1}{s(\tau_s s + 1)}$$

这是一个**I型系统**（含一个积分环节 $1/s$）。

**阶跃输入的稳态误差**：位置给定 $\theta^*(s) = \theta_0 / s$

$$e_{ss} = \lim_{s \to 0} s \cdot E(s) = \lim_{s \to 0} s \cdot \frac{\theta^*}{1 + K_p \cdot P(s)} = \lim_{s \to 0} \frac{s \cdot \theta_0/s}{1 + K_p \cdot \frac{1}{s(\tau_s s+1)}} = 0$$

**结论**：I型系统对阶跃输入的稳态误差为零，**不需要积分项来消除阶跃稳态误差**。

### 3.3 为什么不加I——II型系统的代价

加入积分项后，开环传递函数变为：

$$G_{OL}(s) = \left(K_p + \frac{K_i}{s}\right) \cdot \frac{1}{s(\tau_s s + 1)} = \frac{K_p s + K_i}{s^2(\tau_s s + 1)}$$

系统变为**II型系统**，特征方程：

$$s^2(\tau_s s + 1) + K_p s + K_i = 0$$
$$\tau_s s^3 + s^2 + K_p s + K_i = 0$$

由Routh判据，稳定条件为 $K_i < K_p / \tau_s$。即使满足稳定条件，II型系统的相位裕度也显著低于I型系统：

- I型系统在穿越频率处的相位：

  $$\phi = -90° - \arctan(\omega_c \tau_s)$$
- II型系统在穿越频率处的相位：

  $$\phi = -180° - \arctan(\omega_c \tau_s)$$

**II型系统天然少了90°相位裕度**，这意味着更小的增益裕度、更大的超调、更差的鲁棒性。

### 3.4 为什么不加D——噪声放大效应

微分项 $K_d \cdot s$ 在频域上等效于高通滤波器。编码器位置反馈中的量化噪声 $\Delta\theta$ 经微分后变为：

$$\Delta\omega = K_d \cdot \frac{d(\Delta\theta)}{dt}$$

对于N位增量式编码器（每转 $2^N$ 个计数），量化步长为 $\Delta\theta = 2\pi / 2^N$。在采样周期 $T_s$ 内，量化噪声的微分近似为：

$$\Delta\omega \approx K_d \cdot \frac{\Delta\theta}{T_s} = K_d \cdot \frac{2\pi}{2^N \cdot T_s}$$

以典型参数 $K_d = 0.01$、$N = 13$（8192线）、$T_s = 0.001s$ 为例：

$$\Delta\omega \approx 0.01 \times \frac{2\pi}{8192 \times 0.001} \approx 0.0077 \text{ rad/s}$$

看似不大，但高频噪声的频谱远比量化步长估计的严重——实际编码器信号还包含机械振动、电磁干扰等宽带噪声，微分后这些噪声被急剧放大。

### 3.5 位置环闭环传递函数与带宽

位置环闭环传递函数（P-only控制）：

$$G_{pos\_cl}(s) = \frac{K_p \cdot P(s)}{1 + K_p \cdot P(s)} = \frac{K_p}{s(\tau_s s + 1) + K_p} = \frac{K_p}{\tau_s s^2 + s + K_p}$$

化为标准二阶形式：

$$G_{pos\_cl}(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

其中：
- 自然频率：

  $$\omega_n = \sqrt{K_p / \tau_s}$$
- 阻尼比：

  $$\zeta = \frac{1}{2\sqrt{K_p \cdot \tau_s}}$$

**带宽分离法则**：为保证位置环有足够的相位裕度，要求位置环带宽 $\omega_{pos}$ 远小于速度环带宽 $\omega_{speed}$：

$$\omega_{pos} \leq \frac{\omega_{speed}}{3}$$

由于 $\omega_{pos} \approx K_p$（低频近似），可得：

$$K_p \leq \frac{\omega_{speed}}{3}$$

### 3.6 跟踪误差分析

**斜坡输入**（恒速运动）：

$$\theta^*(s) = v_{ref} / s^2$$

$$e_{ss} = \lim_{s \to 0} s \cdot \frac{v_{ref}/s^2}{1 + K_p \cdot \frac{1}{s(\tau_s s + 1)}} = \frac{v_{ref}}{K_p}$$

**关键结论**：纯P位置环对恒速输入存在常值跟踪误差，误差大小与速度成正比、与Kp成反比。

**正弦输入**：$\theta^*(t) = A\sin(\omega t)$

跟踪误差幅值近似为：

$$\lvert e(\omega) \rvert \approx \frac{A\omega}{K_p} \cdot \frac{1}{\sqrt{1 + (\omega/\omega_n)^2}}$$

在低频段（$\omega \ll \omega_n$），误差近似为 $A\omega/K_p$；在高频段，误差进一步增大。

---

## 4.  工程实现

### 4.1 位置环P控制器核心代码

```c
/**
 * @brief 位置环P控制器
 * @param pos_ref  位置给定 [rad]
 * @param pos_fb   位置反馈 [rad]
 * @param speed_fb 速度反馈 [rad/s]（用于速度限幅）
 * @param ctrl     控制器状态结构体
 * @retval 速度给定 [rad/s]
 */
float PositionLoop_Controller(float pos_ref, float pos_fb,
                               float speed_fb, PosLoopCtrl_t *ctrl)
{
    float pos_error;
    float speed_ref;

    /* 1. 位置误差计算 */
    pos_error = pos_ref - pos_fb;

    /* 2. 误差限幅（防止位置给定突变导致速度给定飞车） */
    if (pos_error > ctrl->error_limit)
        pos_error = ctrl->error_limit;
    else if (pos_error < -ctrl->error_limit)
        pos_error = -ctrl->error_limit;

    /* 3. P控制：速度给定 = Kp * 位置误差 */
    speed_ref = ctrl->Kp * pos_error;

    /* 4. 速度给定限幅（保护速度环） */
    if (speed_ref > ctrl->speed_limit)
        speed_ref = ctrl->speed_limit;
    else if (speed_ref < -ctrl->speed_limit)
        speed_ref = -ctrl->speed_limit;

    /* 5. 保存状态（用于监控和调试） */
    ctrl->pos_error = pos_error;
    ctrl->speed_ref = speed_ref;

    return speed_ref;
}
```

### 4.2 位置环控制器结构体定义

```c
typedef struct {
    /* 控制参数 */
    float Kp;               /* 位置环比例增益 [rad/s / rad] = [1/s] */
    float error_limit;      /* 位置误差限幅 [rad] */
    float speed_limit;      /* 速度给定限幅 [rad/s] */

    /* 运行状态 */
    float pos_error;        /* 当前位置误差 [rad] */
    float speed_ref;        /* 速度给定输出 [rad/s] */

    /* 编码器相关 */
    float encoder_res;      /* 编码器分辨率 [counts/rev] */
    float pos_resolution;   /* 位置分辨率 [rad/count] */
} PosLoopCtrl_t;
```

### 4.3 位置反馈处理——增量式与绝对值编码器

```c
/**
 * @brief 增量式编码器位置累加
 * @note  每次读取编码器计数后累加到绝对位置
 *        需要在Z信号（索引脉冲）处校准
 */
void Encoder_Incremental_Update(EncInc_t *enc)
{
    int32_t delta;
    int32_t current_count;

    current_count = __HAL_TIM_GET_COUNTER(enc->htim);
    delta = current_count - enc->last_count;

    /* 处理计数器溢出（16位计数器） */
    if (delta > 32768)
        delta -= 65536;
    else if (delta < -32768)
        delta += 65536;

    enc->absolute_pos += delta;
    enc->last_count = current_count;

    /* 位置转换：计数 → 弧度 */
    enc->position_rad = (float)enc->absolute_pos * 2.0f * PI / enc->counts_per_rev;
}

/**
 * @brief 绝对值编码器位置读取
 * @note  每次读取即获得绝对位置，无需累加
 *        上电即知位置，适合关节机器人等需要断电记忆的应用
 */
void Encoder_Absolute_Update(EncAbs_t *enc)
{
    uint16_t raw_data;

    /* 通过SPI/SSI/BiSS读取编码器原始数据 */
    raw_data = SPI_ReadEncoder(enc->spi_handle);

    /* 位置转换：原始数据 → 弧度 */
    enc->position_rad = (float)raw_data * 2.0f * PI / enc->resolution;
}
```

### 4.4 位置环完整调用流程

```c
/**
 * @brief 位置环任务（在RTOS任务或主循环中调用）
 * @note  典型执行频率：1kHz（比速度环慢，比电流环更慢）
 */
void PositionLoop_Task(PosLoopCtrl_t *pos_ctrl,
                       SpeedLoopCtrl_t *speed_ctrl,
                       MotorFeedback_t *feedback)
{
    float speed_ref;

    /* 1. 更新位置反馈 */
    /* （已在编码器更新任务中完成） */

    /* 2. 位置环P控制 */
    speed_ref = PositionLoop_Controller(
        pos_ctrl->position_ref,     /* 位置给定 */
        feedback->position,         /* 位置反馈 */
        feedback->speed,            /* 速度反馈 */
        pos_ctrl
    );

    /* 3. 将速度给定传递给速度环 */
    SpeedLoop_SetReference(speed_ctrl, speed_ref);
}
```

---

## 5.  参数整定与调试指南

### 5.1 Kp整定——带宽法

**步骤1：确认速度环带宽**
```text
方法：给速度环一个阶跃给定，测量上升时间 tr
速度环带宽近似：ω_speed ≈ 1.8 / tr
例：tr = 8ms → ω_speed ≈ 225 rad/s
```

**步骤2：计算Kp上限**
$$K_{p,max} = \frac{\omega_{speed}}{3} = \frac{225}{3} = 75 \text{ rad/s}$$

**步骤3：从小到大逐步增加Kp**
```text
起始值：Kp = Kp_max / 5 = 15
每次增加：+10
观察：位置阶跃响应的超调量和调节时间
停止条件：超调量 > 10% 或出现震荡
```

**步骤4：验证相位裕度**
```text
方法：给位置环一个小的阶跃给定（如5°）
观察：响应应无超调或超调<5%，无震荡
如果超调>10%：Kp过大，减小20%
如果响应太慢：确认速度环带宽是否足够
```

### 5.2 位置误差限幅设置

```c
/* 位置误差限幅 = 最大速度 / Kp */
/* 防止位置给定突变时速度给定飞车 */
ctrl->error_limit = ctrl->speed_limit / ctrl->Kp;
```

例如：$K_p = 50$，$\omega_{max} = 3000$ rpm $= 314$ rad/s：

$$e_{limit} = \frac{314}{50} = 6.28 \text{ rad} \approx 360°$$

### 5.3 跟踪误差评估

| 运动类型 | 跟踪误差 | 公式 |
| --- | --- | --- |
| 阶跃定位 | 0（稳态） | $e_{ss} = 0$（I型系统） |
| 恒速运动 | 常值 | $e_{ss} = v_{ref} / K_p$ |
| 正弦运动 | 与频率相关 | $\lvert e \rvert \approx A\omega / K_p$ |
| 加速运动 | 线性增长 | $e(t) = a \cdot t / K_p$ |

**CNC加工实例**：
```text
进给速度：v = 5000 mm/min = 83.3 mm/s
丝杠导程：L = 10 mm/rev
电机转速：ω = 2π × 83.3/10 = 52.4 rad/s
Kp = 50 rad/s
跟踪误差：e_ss = 52.4/50 = 1.05 rad = 60.3°（电机侧）
         = 60.3/360 × 10 = 1.68 mm（直线轴侧）

→ CNC要求误差<0.01mm，纯P控制远远不够！
→ 必须加前馈（MC-MC-02）
```

### 5.4 常见调试问题与对策

| 现象 | 可能原因 | 对策 |
| --- | --- | --- |
| 位置阶跃超调大 | Kp过大或速度环带宽不足 | 减小Kp或先优化速度环 |
| 位置震荡 | 位置环带宽>速度环1/3 | 减小Kp |
| 到位后微小震荡 | 编码器分辨率不足或机械间隙 | 提高分辨率或加死区 |
| 跟踪误差大 | Kp不够大或需要前馈 | 在带宽允许范围内增大Kp，加前馈 |
| 定位有偏差 | 负载摩擦/重力未补偿 | 参见MC-MC-04摩擦与重力补偿 |

---

## 6.  硬件约束

### 6.1 编码器分辨率对位置环的影响

编码器分辨率直接决定位置环的最小可分辨误差：

$$\Delta\theta_{min} = \frac{2\pi}{N_{ppr} \times 4}$$

其中 $N_{ppr}$ 为编码器每转脉冲数，4倍频后的有效分辨率。

| 编码器类型 | 分辨率 | 最小可分辨角度 | 适用场景 |
| --- | --- | --- | --- |
| 2500线增量式 | 10000 counts/rev | 0.036° | 通用伺服 |
| 17位绝对值 | 131072 counts/rev | 0.0027° | 高精度伺服 |
| 23位绝对值 | 8388608 counts/rev | 0.000043° | 直驱/精密 |

**位置环Kp与编码器分辨率的关系**：

Kp越大，对位置误差越敏感。当位置误差小于1个编码器计数时，位置环输出在0和一个最小非零值之间跳变，导致速度给定抖动：

$$\Delta\omega_{ref} = K_p \cdot \Delta\theta_{min} = K_p \cdot \frac{2\pi}{4 \times N_{ppr}}$$

若此抖动超过速度环的分辨率，则产生可闻噪声或振动。

### 6.2 采样频率约束

位置环的执行频率通常为速度环的1/3~1/10：

```text
电流环：10~20 kHz（最快）
速度环：1~5 kHz
位置环：0.5~2 kHz（最慢）
```

位置环频率过低会导致：
- 离散化效应增大，相位裕度降低
- 位置误差采样延迟增大
- 跟踪动态指令的能力下降

### 6.3 电机与负载惯量匹配

负载惯量与电机惯量的比值影响位置环的动态性能：

$$R_J = \frac{J_{load}}{J_{motor}}$$

- $R_J < 3$：位置环响应良好
- $3 < R_J < 10$：需要降低Kp，响应变慢
- $R_J > 10$：可能需要减速机或更大电机

---

## 7.  交叉引用

| 模块 | 关联说明 |
| --- | --- |
| [CT-14 三环级联PID](../../foundations/control-theory/CT-14-Cascaded-PID-Control.md) | 位置环是三环级联的最外层，带宽分离法则的完整推导 |
| [ALG-12 速度环与转矩观测器](../algorithm/ALG-12-Speed-Loop-Torque-Observer.md) | 速度环是位置环的直接内环，速度环带宽决定位置环Kp上限 |
| [CE-06 级联控制](../controllers-evolution/CE-06-Cascaded-Control.md) | 级联控制的理论基础与历史演化 |
| [MC-MC-02 速度与加速度前馈](./MC-MC-02-Feedforward.md) | 前馈是消除位置环跟踪误差的根本方法 |
| [MC-MC-03 机械谐振抑制](./MC-MC-03-Resonance-Suppression.md) | Kp过大激发机械谐振的抑制方法 |
| [MC-MC-04 摩擦与重力补偿](./MC-MC-04-Friction-Gravity.md) | 摩擦导致的位置稳态偏差的补偿方法 |
| [ADV-ALG-01 带宽与滤波](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md) | 带宽设计的理论基础 |

---

## 8.  参考文献

1. Ellis, G. *Control System Design Guide*, 4th Edition, Elsevier, 2012. — 第6章级联控制，位置环P-only的完整论证
2. Kuo, B.C. *Automatic Control Systems*, 9th Edition, Prentice Hall, 2009. — I型/II型系统稳态误差分析
3. Siemens SINUMERIK 840D sl 功能手册 — 位置环Kp与跟踪误差的工程设定方法
4. Yaskawa Σ-7 Series User Manual — 伺服位置环整定步骤与参数说明
5. Armstrong-Hélouvry, B. *Control of Machines with Friction*, Springer, 1991. — 摩擦对位置环的影响分析
6. 郭庆鼎等. *交流伺服系统*, 机械工业出版社, 2006. — 位置环设计与工程整定方法

---

##  版本信息

- 模块编号：MC-MC-01
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
