---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-03: 机械谐振抑制"
tags:
  - motor-control
status: learning
summary: "**副标题：电机和负载之间不是刚体连接——双惯量模型揭示的反谐振-谐振对，是伺服带宽的隐形天花板，而陷波滤波器是打破这层天花板的手术刀** **难度：** ★★★★★ 专家级 **适用对象：** 伺服驱动高级调试工程师、运动控制算法架构师 **前置知识：** 频率响应与伯德图（CT-03）、补偿器设计（CT-09）、级"
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-03: 机械谐振抑制

**副标题：电机和负载之间不是刚体连接——双惯量模型揭示的反谐振-谐振对，是伺服带宽的隐形天花板，而陷波滤波器是打破这层天花板的手术刀**
**难度：** ★★★★★ 专家级
**适用对象：** 伺服驱动高级调试工程师、运动控制算法架构师
**前置知识：** 频率响应与伯德图（CT-03）、补偿器设计（CT-09）、级联控制（CT-14）

---

## 1. 📌 核心摘要

实际伺服系统中，电机与负载之间通过联轴器、丝杠、减速机等弹性元件连接，构成双惯量弹簧-阻尼系统。该系统在频域上呈现反谐振-谐振对（anti-resonance/resonance pair）：低频段反谐振点处增益下凹，高频段谐振点处增益突起。速度环在穿越频率附近遇到谐振峰时，相位急剧下降，导致增益裕度不足甚至失稳。谐振比 $R = J_l / J_m$ 越大，谐振峰越尖锐，问题越严重。抑制谐振的工程方法主要有三种：陷波滤波器（notch filter）针对已知固定频率谐振，低通滤波器（LPF）抑制宽带噪声但牺牲带宽，自适应陷波器处理频率漂移的谐振。核心原则是：**先识别谐振频率，再选择合适的滤波器，最后在保证稳定性的前提下恢复带宽**。

---

## 2. 🤔 问题引入

### 工程师的真实困惑

**场景1：速度环Kp一调大电机就啸叫**
```text
工程师A："速度环Kp调到0.3时电机开始发出800Hz啸叫，
       示波器看速度波形有等幅振荡..."
问题现象:
- Kp=0.1：速度响应慢但稳定
- Kp=0.3：800Hz持续振荡
- Kp=0.5：振荡加剧，电流饱和
根因：电机-负载弹性耦合的谐振频率约800Hz
      速度环增益在谐振峰处穿越0dB→无增益裕度
```

**场景2：换了负载后系统不稳定**
```text
工程师B："同一台伺服，带小负载时完美，
       换了大负载后速度环开始震荡..."
问题现象:
- 小负载（Jl/Jm=2）：稳定
- 大负载（Jl/Jm=8）：震荡
- 调小Kp可以稳定但响应太慢
根因：谐振比R=Jl/Jm增大→谐振峰更尖锐
      原Kp在大谐振比下增益裕度不足
```

**场景3：加了低通滤波器后响应变慢**
```text
工程师C："速度环加了2阶低通滤波器后谐振消失了，
       但位置环响应变慢，跟踪误差增大..."
问题现象:
- 无LPF：谐振但响应快
- 加LPF（fc=200Hz）：谐振消失但带宽从300Hz降到150Hz
- 位置跟踪误差增大2倍
根因：低通滤波器在抑制谐振的同时也衰减了有用信号
      →带宽损失是LPF的固有代价
```

### 核心问题

- 谐振从何而来？→ 双惯量模型的传递函数分析
- 谐振频率由什么决定？→ 刚度、惯量比
- 陷波滤波器怎么设计？→ 中心频率、深度、宽度
- 低通vs陷波怎么选？→ 固定谐振用陷波，宽带噪声用低通
- 谐振频率漂移怎么办？→ 自适应陷波

---

## 3. 💡 原理推导

### 3.1 双惯量模型

电机惯量 $J_m$ 通过刚度为 $K_s$、阻尼为 $C_s$ 的轴连接到负载惯量 $J_l$：

```text
     Ks, Cs
Jm ───/\/\/─── Jl
 |              |
电机转矩       负载转矩
Tm             Tl
```

运动方程：

$$J_m \ddot{\theta}_m = T_m - K_s(\theta_m - \theta_l) - C_s(\dot{\theta}_m - \dot{\theta}_l)$$

$$J_l \ddot{\theta}_l = K_s(\theta_m - \theta_l) + C_s(\dot{\theta}_m - \dot{\theta}_l) - T_l$$

### 3.2 从电机侧看入的传递函数

令 $T_l = 0$，从电机转矩 $T_m$ 到电机转速 $\dot{\theta}_m$ 的传递函数：

$$G(s) = \frac{\dot{\theta}_m(s)}{T_m(s)} = \frac{1}{J_m} \cdot \frac{s^2 + 2\zeta_{ar}\omega_{ar}s + \omega_{ar}^2}{s^2 + 2\zeta_r\omega_r s + \omega_r^2} \cdot \frac{1}{s}$$

其中：

**反谐振频率**（零点）：
$$\omega_{ar} = \sqrt{\frac{K_s}{J_l}}$$

**谐振频率**（极点）：
$$\omega_r = \sqrt{\frac{K_s(J_m + J_l)}{J_m J_l}} = \omega_{ar} \sqrt{1 + R}$$

**谐振比**：
$$R = \frac{J_l}{J_m}$$

**谐振频率与反谐振频率的关系**：
$$\frac{\omega_r}{\omega_{ar}} = \sqrt{1 + R}$$

### 3.3 谐振比的物理意义

| 谐振比 R | ωr/ωar | 谐振峰增益 | 典型场景 |
|----------|---------|-----------|---------|
| 1 | 1.41 | ~6 dB | 电机直驱小负载 |
| 3 | 2.00 | ~12 dB | 标准伺服+减速机 |
| 5 | 2.45 | ~15 dB | 大负载/柔性联轴 |
| 10 | 3.32 | ~20 dB | 皮带传动/长轴 |

谐振比越大：
- 谐振峰越尖锐（增益越大）
- 反谐振与谐振频率间距越大
- 速度环可用的带宽越低

### 3.4 谐振对速度环的影响

速度环开环传递函数（含谐振）：

$$G_{OL}(s) = K_p \cdot \frac{1}{J_m} \cdot \frac{s^2 + 2\zeta_{ar}\omega_{ar}s + \omega_{ar}^2}{s(s^2 + 2\zeta_r\omega_r s + \omega_r^2)}$$

在伯德图上的表现：
1. **低频段**：-20 dB/dec（积分特性），正常
2. **反谐振点 $\omega_{ar}$**：增益下凹（-40 dB/dec），穿越频率可能在此处
3. **谐振点 $\omega_r$**：增益突起（+20 dB/dec），可能再次穿越0dB

**问题**：如果速度环的穿越频率 $\omega_c$ 接近谐振频率 $\omega_r$，则在谐振峰处：
- 增益可能再次穿越0dB
- 相位接近-180°（谐振极点贡献额外相位滞后）
- 增益裕度极小甚至为负→不稳定

### 3.5 陷波滤波器设计

陷波滤波器的传递函数：

$$G_{notch}(s) = \frac{s^2 + 2\zeta_z \omega_n s + \omega_n^2}{s^2 + 2\zeta_p \omega_n s + \omega_n^2}$$

其中：
- $\omega_n$：陷波中心频率（=谐振频率 $\omega_r$）
- $\zeta_z$：零点阻尼比（决定陷波深度，$\zeta_z$越小越深）
- $\zeta_p$：极点阻尼比（决定陷波宽度，$\zeta_p$越大越宽）

**陷波深度**：
$$\text{Depth} = 20\log_{10}\left(\frac{\zeta_z}{\zeta_p}\right) \text{ dB}$$

**设计步骤**：
1. 测量谐振频率 $\omega_r$（从阶跃响应的振荡频率或伯德图峰值）
2. 设置 $\omega_n = \omega_r$
3. 设置陷波深度 = 谐振峰增益（如谐振峰12dB，则陷波深度12dB）
4. 选择 $\zeta_z$ 和 $\zeta_p$：典型 $\zeta_z = 0.01 \sim 0.05$，$\zeta_p = 0.5 \sim 0.7$

**示例**：谐振频率800Hz，谐振峰12dB

$$\omega_n = 2\pi \times 800 = 5027 \text{ rad/s}$$

$$\zeta_z / \zeta_p = 10^{-12/20} = 0.25$$

取 $\zeta_p = 0.5$，则 $\zeta_z = 0.125$。

### 3.6 低通滤波器设计

二阶Butterworth低通滤波器：

$$G_{LPF}(s) = \frac{\omega_c^2}{s^2 + \sqrt{2}\omega_c s + \omega_c^2}$$

截止频率选择：$\omega_c \leq \omega_r / 3$

**低通vs陷波对比**：

| 特性 | 陷波滤波器 | 低通滤波器 |
|------|-----------|-----------|
| 谐振抑制 | 精确（只削峰） | 粗暴（全部衰减） |
| 带宽损失 | 极小 | 大（截止频率以下也衰减） |
| 相位影响 | 仅在陷波频率附近 | 全频段相位滞后 |
| 适用场景 | 固定频率谐振 | 宽带噪声/多谐振 |
| 调试难度 | 需精确知道谐振频率 | 简单（设截止频率即可） |

### 3.7 自适应陷波滤波器

当谐振频率随工况变化时（如负载惯量变化、温度影响刚度），固定陷波滤波器可能失效。自适应陷波的思路：

1. **在线频谱分析**：实时监测速度反馈的频谱，检测谐振峰值频率
2. **频率跟踪**：用锁相环（PLL）跟踪谐振频率
3. **参数更新**：实时更新陷波滤波器的中心频率 $\omega_n$

$$\omega_n(k+1) = \omega_n(k) + \mu \cdot \text{sign}(\text{resonance\_direction})$$

其中 $\mu$ 为自适应步长，需权衡收敛速度和稳定性。

---

## 4. 🔧 工程实现

### 4.1 双二阶（Biquad）陷波滤波器

```c
/**
 * @brief 双二阶陷波滤波器结构体
 * @note  采用Direct Form II Transposed结构，
 *        对定点数运算更友好
 */
typedef struct {
    /* 滤波器系数 */
    float b0, b1, b2;   /* 分子系数 */
    float a1, a2;       /* 分母系数（a0=1归一化） */

    /* 状态变量 */
    float w1, w2;       /* 中间状态 */

    /* 参数（用于在线更新） */
    float freq;          /* 中心频率 [Hz] */
    float depth;         /* 陷波深度 [dB] */
    float width;         /* 陷波宽度（Q值相关） */
    float sample_rate;   /* 采样率 [Hz] */
} BiquadNotch_t;

/**
 * @brief 计算陷波滤波器系数
 * @param notch  陷波滤波器结构体
 * @param freq   中心频率 [Hz]
 * @param depth  陷波深度 [dB]（正值）
 * @param width  陷波宽度因子（0.1~1.0，越大越宽）
 */
void BiquadNotch_Calculate(BiquadNotch_t *notch, float freq,
                            float depth, float width)
{
    float omega;
    float cos_omega, sin_omega;
    float alpha;
    float gain;
    float a0;

    omega = 2.0f * PI * freq / notch->sample_rate;
    cos_omega = cosf(omega);
    sin_omega = sinf(omega);

    /* 带宽参数 */
    alpha = sin_omega * width;

    /* 陷波深度对应的增益 */
    gain = powf(10.0f, -depth / 20.0f);  /* depth dB → 线性增益 */

    /* 分子：陷波零点（深度由gain控制） */
    notch->b0 = 1.0f + alpha * gain;
    notch->b1 = -2.0f * cos_omega;
    notch->b2 = 1.0f - alpha * gain;

    /* 分母：极点（保证稳定性） */
    a0 = 1.0f + alpha;
    notch->a1 = -2.0f * cos_omega / a0;
    notch->a2 = (1.0f - alpha) / a0;

    /* 归一化分子系数 */
    notch->b0 /= a0;
    notch->b1 /= a0;
    notch->b2 /= a0;

    /* 保存参数 */
    notch->freq = freq;
    notch->depth = depth;
    notch->width = width;
}

/**
 * @brief 陷波滤波器处理（Direct Form II Transposed）
 * @param notch  陷波滤波器结构体
 * @param input  输入信号
 * @retval 滤波后输出
 */
float BiquadNotch_Process(BiquadNotch_t *notch, float input)
{
    float output;

    output = notch->b0 * input + notch->w1;
    notch->w1 = notch->b1 * input - notch->a1 * output + notch->w2;
    notch->w2 = notch->b2 * input - notch->a2 * output;

    return output;
}
```

### 4.2 二阶低通滤波器

```c
/**
 * @brief 二阶Butterworth低通滤波器
 */
typedef struct {
    float b0, b1, b2;
    float a1, a2;
    float w1, w2;
    float sample_rate;
} LPF2nd_t;

/**
 * @brief 计算二阶Butterworth低通滤波器系数
 * @param lpf   滤波器结构体
 * @param fc    截止频率 [Hz]
 */
void LPF2nd_Calculate(LPF2nd_t *lpf, float fc)
{
    float omega;
    float K, K2;
    float norm;

    omega = tanf(PI * fc / lpf->sample_rate);
    K = omega;
    K2 = K * K;

    /* Butterworth: 分母 s² + √2·ωc·s + ωc² */
    norm = 1.0f / (1.0f + 1.4142f * K + K2);

    lpf->b0 = K2 * norm;
    lpf->b1 = 2.0f * K2 * norm;
    lpf->b2 = K2 * norm;
    lpf->a1 = 2.0f * (K2 - 1.0f) * norm;
    lpf->a2 = (1.0f - 1.4142f * K + K2) * norm;
}

/**
 * @brief 低通滤波器处理
 */
float LPF2nd_Process(LPF2nd_t *lpf, float input)
{
    float output;

    output = lpf->b0 * input + lpf->w1;
    lpf->w1 = lpf->b1 * input - lpf->a1 * output + lpf->w2;
    lpf->w2 = lpf->b2 * input - lpf->a2 * output;

    return output;
}
```

### 4.3 谐振抑制在速度环中的集成

```c
/**
 * @brief 带谐振抑制的速度环控制器
 * @note  滤波器放在速度反馈通路，抑制谐振引起的速度振荡
 */
float SpeedLoop_WithResonanceSuppression(float speed_ref, float speed_fb,
                                          SpeedLoopResCtrl_t *ctrl)
{
    float speed_fb_filtered;
    float speed_error;
    float iq_ref;

    /* 1. 速度反馈经陷波滤波器（抑制谐振） */
    speed_fb_filtered = BiquadNotch_Process(&ctrl->notch, speed_fb);

    /* 2. 可选：再加低通滤波器（抑制残余高频噪声） */
    speed_fb_filtered = LPF2nd_Process(&ctrl->lpf, speed_fb_filtered);

    /* 3. 速度误差 */
    speed_error = speed_ref - speed_fb_filtered;

    /* 4. PI控制 */
    ctrl->integral += ctrl->Ki * speed_error * ctrl->Ts;
    ctrl->integral = CLAMP(ctrl->integral, -ctrl->integral_limit, ctrl->integral_limit);

    iq_ref = ctrl->Kp * speed_error + ctrl->integral;

    /* 5. Iq限幅 */
    iq_ref = CLAMP(iq_ref, -ctrl->iq_limit, ctrl->iq_limit);

    return iq_ref;
}
```

### 4.4 谐振频率在线检测

```c
/**
 * @brief 基于FFT的谐振频率检测（简化版）
 * @note  在调试阶段运行一次，获取谐振频率后设置陷波滤波器
 *        不建议在运行时持续运行FFT（计算量大）
 */
float DetectResonanceFrequency(float *speed_buffer, int buffer_len,
                                float sample_rate)
{
    float max_magnitude = 0.0f;
    float resonance_freq = 0.0f;
    int i;

    /* 简化FFT：仅检查关键频率段 */
    /* 实际工程中可用完整FFT或Goertzel算法 */

    /* 在200Hz~2000Hz范围内搜索峰值 */
    for (float f = 200.0f; f < 2000.0f; f += 10.0f) {
        float real_part = 0.0f, imag_part = 0.0f;
        float omega = 2.0f * PI * f / sample_rate;

        /* DFT at frequency f */
        for (i = 0; i < buffer_len; i++) {
            real_part += speed_buffer[i] * cosf(omega * i);
            imag_part -= speed_buffer[i] * sinf(omega * i);
        }

        float magnitude = sqrtf(real_part * real_part + imag_part * imag_part);

        if (magnitude > max_magnitude) {
            max_magnitude = magnitude;
            resonance_freq = f;
        }
    }

    return resonance_freq;
}
```

---

## 5. 🎛️ 参数整定与调试指南

### 5.1 谐振频率识别方法

**方法1：阶跃响应法（最简单）**
```text
1. 给速度环一个小的阶跃给定（5%额定转速）
2. 观察速度响应的振荡频率
3. 振荡频率 ≈ 谐振频率
4. 注意：振荡频率可能略高于谐振频率（受闭环影响）
```

**方法2：扫频法（最准确）**
```text
1. 速度环开环
2. 给电流环注入正弦电流，频率从100Hz扫到2000Hz
3. 记录速度响应幅值
4. 响应峰值对应的频率 = 谐振频率
5. 响应谷值对应的频率 = 反谐振频率
```

**方法3：自由振荡法**
```text
1. 速度环开环
2. 给电机一个脉冲转矩（短时电流脉冲）
3. 记录速度的自由振荡波形
4. FFT分析得到谐振频率
```

### 5.2 陷波滤波器整定步骤

```text
步骤1：识别谐振频率 f_r
步骤2：设置陷波中心频率 f_notch = f_r
步骤3：设置初始陷波深度 = 6dB（保守）
步骤4：逐步增大陷波深度（每次+3dB）
步骤5：每次增大后测试速度环稳定性
       - 给阶跃速度给定
       - 观察是否还有振荡
步骤6：当振荡消失时，记录陷波深度
步骤7：再增加3dB作为安全裕度
```

### 5.3 陷波深度与宽度的权衡

| 参数 | 值小 | 值大 |
|------|------|------|
| 陷波深度 | 保留更多带宽，谐振抑制不完全 | 谐振抑制彻底，但可能影响邻近频率 |
| 陷波宽度 | 精确抑制单一频率，对频率漂移敏感 | 覆盖频率范围宽，但带宽损失大 |

**工程建议**：
- 谐振频率稳定：窄而深的陷波（高Q值）
- 谐振频率有漂移：宽而浅的陷波（低Q值）
- 多个谐振峰：每个峰一个陷波，或用低通滤波器

### 5.4 何时用陷波、何时用低通

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| 单一固定谐振频率 | 陷波滤波器 | 精确抑制，带宽损失最小 |
| 多个谐振频率 | 多个陷波 或 低通 | 多陷波更精确，低通更简单 |
| 谐振频率随工况变化 | 自适应陷波 | 固定陷波可能失效 |
| 宽带噪声+谐振 | 陷波+低通组合 | 陷波削峰，低通抑噪 |
| 谐振频率接近穿越频率 | 降低Kp+陷波 | 先保证稳定，再恢复带宽 |

### 5.5 谐振抑制后的带宽恢复

陷波滤波器抑制谐振后，可以适当增大速度环Kp以恢复带宽：

```text
1. 无陷波时：Kp_max = f(谐振峰限制) → 带宽低
2. 加陷波后：谐振峰被削平 → Kp可以增大
3. 新的Kp_max由陷波后的相位裕度决定
4. 典型：加陷波后带宽可恢复到无谐振时的70~90%
```

---

## 6. ⚡ 硬件约束

### 6.1 联轴器刚度与谐振频率的关系

$$f_r = \frac{1}{2\pi}\sqrt{\frac{K_s(J_m + J_l)}{J_m J_l}}$$

| 联轴器类型 | 刚度 Ks [Nm/rad] | 典型谐振频率 | 适用场景 |
|-----------|-----------------|-------------|---------|
| 铝合金膜片 | 5000~50000 | 500~2000 Hz | 标准伺服 |
| 波纹管 | 1000~10000 | 200~800 Hz | 需要角度补偿 |
| 弹性体 | 100~2000 | 50~300 Hz | 减振需求 |
| 皮带传动 | 10~500 | 20~100 Hz | 传送/定位 |

**设计建议**：选择联轴器时，确保谐振频率至少是速度环带宽的5倍以上。

### 6.2 编码器安装位置的影响

| 编码器位置 | 观测到的谐振 | 优缺点 |
|-----------|-------------|--------|
| 电机端（标准） | 反谐振+谐振对 | 可用陷波抑制 |
| 负载端 | 仅谐振峰 | 更直接但需双编码器 |
| 双编码器 | 全状态可测 | 最佳但成本高 |

### 6.3 采样频率对谐振抑制的影响

陷波滤波器的中心频率精度受采样频率限制：

$$\Delta f_{notch} \approx \frac{f_s}{2N}$$

其中 $N$ 为FFT点数。对于800Hz谐振频率，$f_s = 10kHz$：

- $N = 256$：$\Delta f \approx 20Hz$（可接受）
- $N = 64$：$\Delta f \approx 78Hz$（可能偏移过多）

**建议**：陷波滤波器的采样率应与速度环一致，且不低于谐振频率的10倍。

---

## 7. 🔗 交叉引用

| 模块 | 关联说明 |
|------|---------|
| [CT-03 频率响应与伯德图](../control-theory/CT-03-Frequency-Response-Bode.md) | 伯德图是识别谐振频率的核心工具 |
| [CT-09 补偿器设计](../control-theory/CT-09-Compensator-Design.md) | 陷波滤波器是补偿器设计的典型应用 |
| [CT-14 三环级联PID](../control-theory/CT-14-Cascaded-PID-Control.md) | 谐振主要影响速度环，进而限制位置环带宽 |
| [ADV-ALG-01 带宽与滤波](../advanced/algorithm/ADV-ALG-01-Bandwidth-Filter.md) | 滤波器设计的理论基础 |
| [MC-MC-01 位置环设计](./MC-MC-01-Position-Loop.md) | 谐振限制速度环带宽→间接限制位置环Kp |
| [HW-03 位置传感器](../hardware/HW-03-Position-Sensor.md) | 编码器安装位置影响谐振观测 |

---

## 8. 📚 参考文献

1. Ellis, G. *Control System Design Guide*, 4th Edition, Elsevier, 2012. — 第7章机械谐振，双惯量模型完整推导
2. Szabat, K. & Orlowska-Kowalska, T. "Vibration Suppression in a Two-Mass Drive System Using PI Speed Controller and Additional Feedbacks—Comparative Study", *IEEE Trans. Ind. Electron.*, 2007.
3. Schmidt, P.B. & Lorenz, R.D. "Design Principles and Implementation of Acceleration Feedback to Improve Performance of DC Drives", *IEEE Trans. Ind. Appl.*, 1992.
4. Yaskawa Σ-7 Series Application Manual — 机械谐振抑制功能（Notch Filter + 自适应陷波）
5. Lenze 9400 Servo Drives Manual — 谐振识别与陷波整定流程
6. 王成元等. *现代电机控制技术*, 机械工业出版社, 2014. — 双惯量系统谐振分析

---

## 📝 版本信息

- 模块编号：MC-MC-03
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
