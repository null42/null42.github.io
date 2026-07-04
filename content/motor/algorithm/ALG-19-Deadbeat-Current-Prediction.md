---
date: 2026-06-08
section: 电机控制
chapter: algorithm
chapterTitle: 控制算法
chapterOrder: 20
category: 控制算法
source: motor
visibility: public
title: ALG-19 无差拍电流预测控制
tags:
  - motor-control
status: learning
summary: "**模块编号：** ALG-19 **模块名称：** 无差拍电流预测控制（Deadbeat Current Prediction Control） **文档版本：** v1.0 **适用对象：** 电机控制算法工程师、高性能伺服开发者 **前置知识：** FOC 磁场定向控制基础、PI 电流调节器（ALG-03）、离散"
navGroup: 控制与算法
navGroupOrder: 30
---

# ALG-19 无差拍电流预测控制

**模块编号：** ALG-19
**模块名称：** 无差拍电流预测控制（Deadbeat Current Prediction Control）
**文档版本：** v1.0
**适用对象：** 电机控制算法工程师、高性能伺服开发者
**前置知识：** FOC 磁场定向控制基础、PI 电流调节器（ALG-03）、离散时间控制系统、状态空间模型
**难度等级：** 

---

## 1.  核心摘要  

**一句话总结：** 无差拍电流预测控制基于离散电机模型，在下一个控制周期内使电流无误差地跟踪给定值——它不是渐进逼近，而是一拍到位，是数字控制下电流环动态响应的理论极限。

**认知钩子：** 把 PI 电流环想象成开车跟车——PI 是"看到前车加速了，我逐渐踩油门跟上"，需要几个控制周期才能消除误差；无差拍则是"精确计算前车加速度，一脚踏到刚好匹配的速度"，一个周期到位。代价是什么？你必须精确知道自己的车有多重（电感）、发动机有多大的摩擦（电阻）——参数稍有偏差，不是追不上就是冲过头。

```text
  i_ref(k+1) ──→[无差拍预测器]──→ u(k) ──→[逆变器+电机]──→ i(k+1) = i_ref(k+1)
                      ↑                              ↑
               离散模型 Ad, Bd                   i(k) 反馈
               反EMF前馈 ê(k)                    θ(k+1) 预测
```

| 关键概念 | 说明 |
|---------|------|
| 一拍到位 | 令 $i(k+1) = i^*(k+1)$，反推所需电压 $u(k)$ |
| 离散模型依赖 | $A_d$, $B_d$ 依赖于 $R_s$, $L_s$, $T_s$，参数敏感性极高 |
| 一拍延迟补偿 | 数字控制固有延迟需通过电流/角度预测补偿 |
| 电压饱和处理 | 无差拍无积分器，饱和后必须显式处理退饱和 |

---

## 2.  问题引入  

PI 电流调节器通过带宽参数化法（[ALG-03](./ALG-03-PI-Current-Regulator.md)）可实现一阶闭环响应，但带宽受数字控制延迟严格约束：

$$\omega_{bw} \leq \frac{1}{3 \sim 5 \cdot T_{delay}}$$

对于 $T_s = 100\mu s$（10kHz PWM），总延迟 $T_{delay} = 1.5 T_s$，带宽上限约 2200~3700 rad/s。PI 的渐进跟踪本质决定了：

- 阶跃响应需要 $3\sim5$ 个控制周期才能进入 ±2% 稳态带
- 负载突变时电流跌落大、恢复慢
- 高速弱磁区域交叉耦合强，PI 解耦前馈的残余误差影响显著

**核心问题：** 能否突破 PI 的渐进跟踪限制，在**一个控制周期内**使电流无误差地跟踪给定值？

答案就是无差拍电流预测控制——利用离散电机模型精确预测下一拍电流，反推所需电压指令，实现一拍到位。

---

## 3.  无差拍控制原理  

### 3.1 核心思想

无差拍控制（Deadbeat Control）的核心目标：在下一个控制周期 $k+1$，使电流输出精确等于给定值：

$$i(k+1) = i^*(k+1)$$

即：给定当前状态 $i(k)$ 和参考 $i^*(k+1)$，求解所需的控制输入 $u(k)$，使得系统在一步之内从当前状态转移到目标状态。

### 3.2 与 PI 控制的本质区别

| 维度 | PI 控制 | 无差拍控制 |
|------|--------|-----------|
| 跟踪方式 | 渐进跟踪，多拍收敛 | 一拍到位，无稳态过渡 |
| 控制律本质 | 误差驱动：$u = K_p e + K_i \int e \, dt$ | 模型驱动：$u = B_d^{-1}[i^* - A_d \cdot i]$ |
| 参数依赖 | 零极点对消，参数偏差影响带宽和阻尼 | 直接依赖模型参数，偏差导致稳态误差或振荡 |
| 积分器 | 有，天然消除稳态误差 | 无，需额外机制处理模型失配 |
| 鲁棒性 | 较强，参数偏差 20% 仍可稳定 | 较弱，电感偏差 >15% 可能失稳 |
| 动态响应 | 受带宽限制，$3\sim5$ 拍收敛 | 理论一拍，实际 $2\sim3$ 拍（含延迟补偿） |

### 3.3 与 MPC 的关系

无差拍控制是模型预测控制（MPC）的一个特例：

- 当 MPC 的代价函数仅包含电流跟踪误差项 $J = \|i(k+1) - i^*(k+1)\|^2$，且预测时域 $N_p = 1$、控制时域 $N_c = 1$ 时，MPC 退化为无差拍控制
- MPC 在代价函数中增加电压变化率约束、电流变化率约束等项时，退化为带约束的有限集 MPC（FS-MPC），参见 CT-19
- 无差拍可视为"连续空间、单步预测、无约束"的 MPC

$$\text{MPC}(N_p, N_c, J) \xrightarrow{N_p=1, N_c=1, J=\|e\|^2} \text{Deadbeat}$$

---

## 4.  离散电机模型  

### 4.1 连续域电机电压方程

在 dq 同步旋转坐标系下，表贴式 PMSM（SPMSM）的电压方程为：

$$v_d = R_s i_d + L_s \frac{di_d}{dt} - \omega_e L_s i_q$$

$$v_q = R_s i_q + L_s \frac{di_q}{dt} + \omega_e L_s i_d + \omega_e \psi_f$$

忽略交叉耦合项（由前馈解耦单独处理，见 [ADV-ALG-07](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md)），d/q 轴可独立建模为：

$$v = R_s i + L_s \frac{di}{dt}$$

### 4.2 离散化方法

#### 零阶保持（ZOH）离散化

假设电压在一个控制周期内恒定（PWM 输出为阶梯函数），对连续系统 $\dot{i} = -\frac{R_s}{L_s} i + \frac{1}{L_s} v$ 进行 ZOH 离散化：

$$i(k+1) = A_d \cdot i(k) + B_d \cdot u(k)$$

其中：

$$A_d = e^{-\frac{R_s}{L_s} T_s}$$

$$B_d = \frac{1 - e^{-\frac{R_s}{L_s} T_s}}{R_s}$$

#### 一阶近似（适用于 $R_s T_s / L_s \ll 1$）

当 $R_s T_s / L_s \ll 1$（高 PWM 频率下通常满足），可简化为：

$$A_d \approx 1 - \frac{R_s}{L_s} T_s$$

$$B_d \approx \frac{T_s}{L_s}$$

此近似在 $T_s \leq 100\mu s$、$R_s/L_s \leq 500$ 时误差 $< 1\%$。

#### Tustin（双线性变换）离散化

$$s \approx \frac{2}{T_s} \cdot \frac{z - 1}{z + 1}$$

Tustin 保持频率响应形状更好，但计算稍复杂。工程中 ZOH 更常用，因为 PWM 本质就是零阶保持。

### 4.3 离散状态空间模型

将 d、q 轴合并为向量形式（含交叉耦合）：

$$\begin{bmatrix} i_d(k+1) \\ i_q(k+1) \end{bmatrix} = \mathbf{A_d} \begin{bmatrix} i_d(k) \\ i_q(k) \end{bmatrix} + \mathbf{B_d} \begin{bmatrix} v_d(k) \\ v_q(k) \end{bmatrix} + \mathbf{E_d}$$

其中：

$$\mathbf{A_d} = \begin{bmatrix} A_{d0} & \omega_e T_s A_{d0} \\ -\omega_e T_s A_{d0} & A_{d0} \end{bmatrix}, \quad A_{d0} = e^{-\frac{R_s}{L_s} T_s}$$

$$\mathbf{B_d} = \begin{bmatrix} B_{d0} & 0 \\ 0 & B_{d0} \end{bmatrix}, \quad B_{d0} = \frac{1 - e^{-\frac{R_s}{L_s} T_s}}{R_s}$$

$$\mathbf{E_d} = \begin{bmatrix} 0 \\ -\frac{\omega_e \psi_f T_s}{L_s} A_{d0} \end{bmatrix}$$

其中 $\mathbf{E_d}$ 为反电动势扰动项。

>  **近似标注**：上式 $E_d = -\omega_e \psi_f T_s A_{d0} / L_s$ 为一阶近似表达式。精确 ZOH 离散化结果为 $E_d = -(1 - A_{d0}) \cdot \omega_e \psi_f / R_s$（其中 $A_{d0} = e^{-R_s T_s / L_s}$）。该近似在 $R_s T_s / L_s \ll 1$ 时成立（高 PWM 频率下通常满足，例如 $T_s \leq 100\mu s$、$R_s/L_s \leq 500$ s⁻¹ 时误差 < 1%）。当 $R_s T_s / L_s$ 不满足小量条件时（如低速大电阻电机），应使用精确公式。

### 4.4 参数依赖性

$A_d$ 和 $B_d$ 直接依赖于电机参数 $R_s$、$L_s$ 和控制周期 $T_s$：

| 参数 | 影响 | 典型偏差来源 |
|------|------|-------------|
| $R_s$ | 影响 $A_d$（衰减速率）和 $B_d$（增益） | 温度漂移（+40% @ 150°C）、测量误差 |
| $L_s$ | 影响 $A_d$、$B_d$ 和 $E_d$ | 磁饱和（-30%~-50% @ 额定电流）、交叉饱和 |
| $T_s$ | 影响离散化精度 | 通常精确，但抖动需关注 |
| $\psi_f$ | 影响 $E_d$ | 温度系数约 -0.1%/K |

---

## 5.  无差拍电流预测算法  

### 5.1 基本算法推导

令下一拍电流等于参考值：

$$i(k+1) = i^*(k+1)$$

代入离散模型（忽略交叉耦合，单轴形式）：

$$i^*(k+1) = A_d \cdot i(k) + B_d \cdot u(k)$$

反推所需电压指令：

$$\boxed{u(k) = \frac{1}{B_d} \left[ i^*(k+1) - A_d \cdot i(k) \right]}$$

代入 $A_d$、$B_d$ 的简化形式：

$$u(k) = \frac{L_s}{T_s} \left[ i^*(k+1) - i(k) \right] + R_s \cdot i(k)$$

**物理意义解读：**

- $\frac{L_s}{T_s} [i^*(k+1) - i(k)]$：克服电感使电流在一拍内变化到目标值所需的电压
- $R_s \cdot i(k)$：补偿当前电流在电阻上的压降

### 5.2 反电动势前馈补偿

实际电压指令需叠加反电动势前馈项：

$$u_d(k) = \frac{1}{B_d} \left[ i_d^*(k+1) - A_d \cdot i_d(k) \right] - \omega_e L_s i_q(k)$$

$$u_q(k) = \frac{1}{B_d} \left[ i_q^*(k+1) - A_d \cdot i_q(k) \right] + \omega_e L_s i_d(k) + \hat{e}(k)$$

其中反电动势估计值：

$$\hat{e}(k) = \omega_e \psi_f$$

反电动势前馈在高速时尤为关键——当 $\omega_e \psi_f$ 接近母线电压的 50% 以上时，不补偿将导致 q 轴电流严重偏差。

### 5.3 电压限幅处理

无差拍控制没有积分器，电压饱和后不会自动恢复。必须显式处理：

**方法一：电压矢量限幅**

$$u_{lim}(k) = \begin{cases} u(k) & \text{if } \|u(k)\| \leq U_{max} \\ \frac{U_{max}}{\|u(k)\|} u(k) & \text{if } \|u(k)\| > U_{max} \end{cases}$$

其中 $U_{max} = V_{dc} / \sqrt{3}$（SVPWM 线性调制区边界）。

**方法二：饱和时回退到 PI**

当电压饱和时，切换到 PI 控制器输出（PI 的 Anti-Windup 机制可处理饱和），退饱和后切回无差拍。此方法工程实现简单，但切换瞬间可能有暂态跳变。

**方法三：带约束的无差拍（Modified Deadbeat）**

在电压约束下，不完全追求一拍到位，而是沿电压边界方向最大化电流跟踪：

$$u(k) = \frac{U_{max}}{\|u_{db}(k)\|} u_{db}(k)$$

此方法保证电压不超过限制，但牺牲了无差拍特性（需要多拍收敛）。

### 5.4 内置式 PMSM（IPMSM）的扩展

对于 IPMSM，$L_d \neq L_q$，离散模型中 $B_d$ 矩阵不再对角元素相等：

$$B_{d,d} = \frac{1 - e^{-\frac{R_s}{L_d} T_s}}{R_s}, \quad B_{d,q} = \frac{1 - e^{-\frac{R_s}{L_q} T_s}}{R_s}$$

d、q 轴需使用各自独立的 $A_d$、$B_d$ 参数。

---

## 6. ⏱ 一拍延迟补偿  

### 6.1 数字控制的固有延迟

全数字电机控制系统中，从电流采样到 PWM 更新存在固有延迟：

```text
  ADC采样      计算控制律      PWM影子寄存器更新     PWM输出生效
  ──┬──────────┬──────────────┬──────────────────┬──→ 时间
    │  T_adc   │   T_calc     │   T_shadow       │
    │          │              │                   │
    │◄─────────┴──────────────┴──────────────────►│
                    总延迟 ≈ 1.0 ~ 1.5 T_s
```

- **计算延迟**：ADC 采样后到控制律计算完成，约 $0.5 \sim 0.8 T_s$
- **PWM 更新延迟**：影子寄存器在下一个 PWM 周期开始时才生效，约 $0.5 \sim 1.0 T_s$
- **总延迟**：约 $1.0 \sim 1.5 T_s$，通常简化为一拍延迟 $T_s$

这意味着：在时刻 $k$ 计算出的电压指令 $u(k)$，实际在时刻 $k+1$ 才作用于电机。如果不补偿，无差拍控制将变成"两拍到位"甚至不稳定。

### 6.2 电流预测补偿

利用离散模型预测 $k+1$ 时刻的电流，作为无差拍计算的反馈值：

$$\hat{i}(k+1) = A_d \cdot i(k) + B_d \cdot u(k)$$

其中 $i(k)$ 为 ADC 采样值，$u(k)$ 为上一拍已发出的电压指令。

修正后的无差拍控制律：

$$u(k+1) = \frac{1}{B_d} \left[ i^*(k+2) - A_d \cdot \hat{i}(k+1) \right]$$

**注意：** 此时参考值也需前推一拍，即 $i^*(k+2)$。若参考值由速度环生成，通常假设参考值在两拍内变化缓慢，取 $i^*(k+2) \approx i^*(k+1) \approx i^*(k)$。

### 6.3 角度预测补偿

Park 变换和逆 Park 变换需要精确的转子角度。一拍延迟意味着：

- 采样时刻的角度 $\theta(k)$
- 电压实际生效时刻的角度 $\theta(k+1) = \theta(k) + \omega_e T_s$

角度预测：

$$\hat{\theta}(k+1) = \theta(k) + \omega_e T_s$$

对于高加速度场景（如伺服快速定位），需加入加速度项：

$$\hat{\theta}(k+1) = \theta(k) + \omega_e T_s + \frac{1}{2} \alpha_e T_s^2$$

其中 $\alpha_e$ 为电气角加速度（rad/s²）。

角度预测误差对无差拍的影响：$\Delta\theta = 1°$ 在高速时（$\omega_e = 1000$ rad/s, $T_s = 100\mu s$）约引入 $1.7\%$ 的电流误差。

> 角度延迟补偿的更深入讨论参见 [ALG-18 补偿算法专题](./ALG-18-Compensation-Algorithms.md)。

---

## 7.  参数敏感性分析  

### 7.1 电感误差的影响

设实际电感为 $L$，模型中使用 $\hat{L} = L(1 + \Delta L)$，则 $B_d$ 的估计值为 $\hat{B}_d$。

无差拍控制律实际产生的电流变化：

$$i(k+1) = A_d \cdot i(k) + B_d \cdot \hat{B}_d^{-1} [i^* - A_d \cdot i(k)]$$

定义跟踪误差 $e(k+1) = i^* - i(k+1)$：

$$e(k+1) = \left(1 - \frac{B_d}{\hat{B}_d}\right) [i^* - A_d \cdot i(k)]$$

当 $\hat{L} = L(1 + \Delta L)$ 时，近似有 $\frac{B_d}{\hat{B}_d} \approx \frac{1}{1 + \Delta L}$，则：

$$e(k+1) \approx \frac{\Delta L}{1 + \Delta L} [i^* - A_d \cdot i(k)]$$

| 电感误差 $\Delta L$ | 稳态跟踪误差 | 系统行为 |
|---------------------|-------------|---------|
| 0% | 0% | 理想无差拍 |
| +10% | -9.1% | 欠补偿，收敛变慢 |
| -10% | +11.1% | 过补偿，可能振荡 |
| +20% | -16.7% | 明显欠补偿 |
| -20% | +25% | 严重过补偿，振荡风险大 |
| -30% | +42.9% | 极可能失稳 |

**与 PI 的对比：** PI 控制器在电感误差 20% 时，仅导致带宽偏差约 20% 和轻微超调变化，系统仍稳定。无差拍对电感误差的容忍度远低于 PI。

### 7.2 电阻误差的影响

电阻误差主要影响 $A_d$（衰减因子），对 $B_d$ 影响较小（当 $R_s T_s / L_s \ll 1$ 时）。

$R_s$ 偏差导致的稳态误差：

$$e_{ss} \approx \frac{\Delta R_s}{R_s} \cdot \frac{R_s}{L_s} T_s \cdot i^*$$

对于典型参数 $R_s/L_s = 200$ s⁻¹、$T_s = 100\mu s$：电阻偏差 50% 仅引入约 1% 的稳态误差。**电阻误差的影响远小于电感误差。**

但电阻误差在低速时影响更大（$R_s/L_s$ 项的权重增加），且电阻随温度变化幅度可达 +40%（从 25°C 到 150°C），不可忽略。

### 7.3 参数自整定与在线辨识的结合

为缓解参数敏感性问题，工程中常将无差拍与在线参数辨识结合：

**方案一：递推最小二乘（RLS）在线辨识**

在线辨识 $R_s$ 和 $L_s$，实时更新 $A_d$、$B_d$：

$$\hat{\theta}_{RLS}(k) = \hat{\theta}_{RLS}(k-1) + \mathbf{K}(k) \left[ i(k) - \boldsymbol{\varphi}^T(k) \hat{\theta}_{RLS}(k-1) \right]$$

其中 $\hat{\theta} = [R_s, L_s]^T$，$\boldsymbol{\varphi}$ 为回归向量。

**方案二：模型参考自适应（MRAC）**

以 PI 控制器的输出作为参考模型，自适应调整无差拍参数使两者输出一致。

**方案三：混合控制——PI + 无差拍**

低速/参数不确定区域使用 PI（鲁棒），高速/参数精确区域切换无差拍（快速），兼顾鲁棒性与动态性能。

---

## 8.  工程实现  

### 8.1 C 代码实现

```c
typedef struct {
    float rs;
    float ls;
    float ts;
    float psi_f;
    float ad;
    float bd;
    float id_pred;
    float iq_pred;
    float vd_prev;
    float vq_prev;
    float vdc;
    float u_max;
} deadbeat_ctrl_t;

void deadbeat_init(deadbeat_ctrl_t *db, float rs, float ls, float ts,
                   float psi_f, float vdc)
{
    db->rs = rs;
    db->ls = ls;
    db->ts = ts;
    db->psi_f = psi_f;
    db->vdc = vdc;
    db->u_max = vdc / 1.732f;

    float tau = rs / ls * ts;
    db->ad = expf(-tau);
    db->bd = (1.0f - db->ad) / rs;
}

void deadbeat_update_params(deadbeat_ctrl_t *db, float rs, float ls)
{
    db->rs = rs;
    db->ls = ls;
    float tau = rs / ls * db->ts;
    db->ad = expf(-tau);
    db->bd = (1.0f - db->ad) / rs;
}

void deadbeat_current_predict(deadbeat_ctrl_t *db,
                              float id_fb, float iq_fb)
{
    db->id_pred = db->ad * id_fb + db->bd * db->vd_prev;
    db->iq_pred = db->ad * iq_fb + db->bd * db->vq_prev;
}

void deadbeat_voltage_calc(deadbeat_ctrl_t *db,
                           float id_ref, float iq_ref,
                           float omega_e,
                           float *vd_out, float *vq_out)
{
    float bd_inv = 1.0f / db->bd;

    float vd_db = bd_inv * (id_ref - db->ad * db->id_pred);
    float vq_db = bd_inv * (iq_ref - db->ad * db->iq_pred);

    vd_db -= omega_e * db->ls * db->iq_pred;
    vq_db += omega_e * db->ls * db->id_pred;
    vq_db += omega_e * db->psi_f;

    float v_mag = sqrtf(vd_db * vd_db + vq_db * vq_db);
    if (v_mag > db->u_max) {
        float scale = db->u_max / v_mag;
        vd_db *= scale;
        vq_db *= scale;
    }

    *vd_out = vd_db;
    *vq_out = vq_db;

    db->vd_prev = vd_db;
    db->vq_prev = vq_db;
}
```

### 8.2 与 MC-LIB / HPM-MC 的接口

在 HPM-MC v2 框架中，无差拍控制器可替换 `hpm_mcl_control.h` 中的 `delta_pid()` 函数：

```c
// 在控制循环中替换 PI 调用
// 原始: vd = delta_pid(&pi_d, id_ref, id_fb);
// 替换:
deadbeat_current_predict(&db_ctrl, id_fb, iq_fb);
deadbeat_voltage_calc(&db_ctrl, id_ref, iq_ref, omega_e, &vd, &vq);
```

参数初始化从电机辨识结果获取：

```c
deadbeat_init(&db_ctrl,
              motor_params.rs,
              motor_params.ls,
              motor_params.ts,
              motor_params.psi_f,
              motor_params.vdc);
```

### 8.3 计算量分析

| 操作 | PI 控制器 | 无差拍控制器 | 增量 |
|------|----------|-------------|------|
| 乘法 | 4 次/轴 | 5 次/轴 | +25% |
| 加法 | 3 次/轴 | 4 次/轴 | +33% |
| 除法 | 0 | 1 次/轴（$1/B_d$） | +1 |
| exp | 0（初始化时 1 次） | 0（初始化时 1 次） | 0 |
| sqrt | 0 | 1 次（电压限幅） | +1 |
| 总计 | ~14 次运算/dq | ~22 次运算/dq | +57% |

无差拍的计算量比 PI 增加约 50~60%，但在现代 MCU（如 HPM6750 @ 810MHz）上，额外耗时 $< 0.5\mu s$，对 10kHz 控制循环影响可忽略。

### 8.4 从 PI 迁移到无差拍的步骤

1. **确保 PI 已调好**：先在 PI 控制下确认电机参数（$R_s$, $L_s$, $\psi_f$）的准确性
2. **离线验证模型**：用 C 仿真（[SIM-00](../simulation/SIM-00-C-Simulation-Overview.md)）验证离散模型预测精度
3. **参数辨识**：运行在线参数辨识，获取 $R_s$、$L_s$ 的精确值
4. **低速切换**：先在低速（$\omega_e < 100$ rad/s）下切换到无差拍，观察电流阶跃响应
5. **逐步提速**：每提高 200 rad/s，检查电流 THD 和稳态误差
6. **电压裕量确认**：确保在最高运行速度下，电压裕量 $> 20\%$
7. **异常回退**：实现无差拍→PI 的自动回退机制（检测到持续振荡时切换）

---

## 9.  模块关联  

### 9.1 与 ALG-03（PI 电流调节器）的对比

| 维度 | ALG-03 PI | ALG-19 无差拍 |
|------|-----------|--------------|
| 控制律 | 误差驱动 | 模型驱动 |
| 动态响应 | $3\sim5$ 拍收敛 | 理论 1 拍（实际 $2\sim3$ 拍） |
| 稳态精度 | 积分器保证零稳态误差 | 依赖模型精度，可能有残余误差 |
| 鲁棒性 | 强 | 弱 |
| 工程成熟度 | 极高 | 中等 |
| 适用场景 | 通用 | 高动态伺服、参数精确已知 |

**工程建议：** 优先使用 PI，仅在动态响应不满足要求且参数精度有保障时考虑无差拍。

### 9.2 与 CT-19（MPC）的关系

无差拍是 MPC 的特例（见 §3.3）。CT-19 的有限集 MPC（FS-MPC）在以下方面扩展了无差拍：

- 代价函数可包含多个目标（电流跟踪 + 纹波最小化 + 开关频率约束）
- 有限集 MPC 直接选择电压矢量，无需 SVPWM
- 但计算量远大于无差拍（需遍历所有候选矢量）

### 9.3 与 ALG-18（角度延迟补偿）的协同

无差拍控制对角度精度极为敏感。ALG-18 提供的角度预测方法是无差拍在高速运行时的必要支撑：

- 简单预测：$\hat{\theta}(k+1) = \theta(k) + \omega_e T_s$
- 高精度预测：基于锁相环（PLL）或观测器的角度外推

### 9.4 与 ADV-ALG-07（前馈解耦）的结合

无差拍控制律中的交叉耦合项（$\omega_e L_s i_q$、$\omega_e L_s i_d$）和反电动势项（$\omega_e \psi_f$）本质就是前馈解耦。ADV-ALG-07 的前馈增益调节策略（取 0.8~1.0 倍标称值留裕量）可直接应用于无差拍的前馈项，提高参数失配下的鲁棒性。

---

## 10.  工程案例与实践练习  

### 10.1 工程案例：高动态伺服电机

**系统参数：**

| 参数 | 值 |
|------|-----|
| 电机类型 | 表贴式 PMSM |
| $R_s$ | 0.5 Ω |
| $L_s$ | 0.8 mH |
| $\psi_f$ | 0.015 Wb |
| 极对数 | 4 |
| PWM 频率 | 20 kHz |
| 母线电压 | 48 V |
| 额定电流 | 10 A |

**离散模型参数：**

$T_s = 50\mu s$，$\tau = R_s T_s / L_s = 0.03125$

$A_d = e^{-0.03125} = 0.9692$

$B_d = (1 - 0.9692) / 0.5 = 0.0616$ A/V

**无差拍电压计算示例：**

设 $i_q^*(k+1) = 5$ A，$i_q(k) = 0$ A，$\omega_e = 0$：

$$v_q(k) = \frac{1}{0.0616} [5 - 0.9692 \times 0] = 81.2 \text{ V}$$

但 $U_{max} = 48/\sqrt{3} = 27.7$ V，电压饱和！实际需要多拍才能到达目标电流。

**修正：** 降低电流给定变化率或使用电压约束无差拍。

### 10.2 实践练习

**练习 1：离散模型验证**

给定 $R_s = 2\Omega$, $L_s = 5$mH, $T_s = 100\mu s$：

1. 计算 $A_d$ 和 $B_d$（ZOH 精确值和一阶近似值）
2. 比较两种离散化方法的误差
3. 验证：$i(0) = 0$, $u(k) = 10$ V 恒定输入，计算 $i(1), i(2), i(3)$

**练习 2：参数敏感性仿真**

在 C 仿真环境中：

1. 设定标称参数，验证无差拍一拍跟踪
2. 分别令 $L_s$ 偏差 +10%、+20%、-10%、-20%，观察电流阶跃响应
3. 与同参数偏差下 PI 控制器的响应对比
4. 确定无差拍控制下电感误差的稳定边界

**练习 3：一拍延迟补偿验证**

1. 不加延迟补偿，观察无差拍在 $T_s = 100\mu s$ 下的实际阶跃响应（应为两拍）
2. 加入电流预测补偿，验证是否恢复一拍跟踪
3. 在 $\omega_e = 500$ rad/s 下，分别测试有/无角度预测的稳态电流误差

**练习 4：PI→无差拍迁移**

1. 先在 PI 控制下整定好电流环（带宽 2000 rad/s）
2. 记录 PI 下的阶跃响应（上升时间、超调量）
3. 切换到无差拍，记录阶跃响应
4. 引入电感偏差 -15%，对比两种控制器的鲁棒性

---

> **仿真验证**：本模块的理论可在 [C 语言仿真](../simulation/SIM-00-C-Simulation-Overview.md) 中验证。建议新增 MODE_SELECT_DEADBEAT_IQ_STEP 模式，对比 PI 与无差拍在相同参数下的电流阶跃响应。

> **相关模块**：[ALG-03 PI 电流调节器](./ALG-03-PI-Current-Regulator.md) | [ADV-ALG-07 前馈解耦](../advanced/algorithm/ADV-ALG-07-Feedforward-Decoupling.md) | [ALG-04 死区补偿](./ALG-04-Deadtime-Compensation.md)

>  检验你的理解：[ALG-19 检验题目](./ALG-19-assessment.md)
