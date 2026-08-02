---
date: 2026-06-02
section: 电机控制
chapter: algorithm
chapterTitle: 控制算法
chapterOrder: 20
category: 控制算法
source: motor
visibility: public
title: ALG-16 非线性磁链观测器
tags:
  - motor-control
status: learning
summary: "**模块编号：** ALG-16 **模块名称：** 非线性磁链观测器（Nonlinear Flux Observer） **文档版本：** v1.0 **适用对象：** 电机控制工程师、嵌入式开发者 **前置知识：** ALG-07 无感FOC观测器、ALG-06 位置与速度观测器、控制理论"
navGroup: 控制与算法
navGroupOrder: 30
---

# ALG-16 非线性磁链观测器

- **模块编号：** ALG-16  
- **模块名称：** 非线性磁链观测器（Nonlinear Flux Observer）  
- **文档版本：** v1.0  
- **适用对象：** 电机控制工程师、嵌入式开发者  
- **前置知识：** ALG-07 无感FOC观测器、ALG-06 位置与速度观测器、控制理论

---

## 1.  核心摘要  

> ** 文档定位：** 本文是 **[ALG-07 无感FOC观测器](./ALG-07-Sensorless-Observers.md)** 的**深化篇**。在 ALG-07 建立的观测器基本概念（SMO/磁链观测器/PLL 概览）基础上，系统深入地讲解非线性磁链观测器的完整数学推导、非线性补偿机制、工程代码实现、参数整定方法及硬件约束分析。如果你尚未掌握基础磁链观测器的原理，建议先阅读 ALG-07 第2.3节和第3.3节建立基础认知。

- **一句话：** 非线性磁链观测器将转子磁链作为状态变量直接估计，通过非线性反馈补偿抑制纯积分器的直流漂移，从根本上克服了反电动势类观测器低速性能差的瓶颈，是实现零速闭环无感FOC的关键技术之一。

- **认知挂钩：** 如果说SMO是"听回声定位"（反电动势∝速度，低速时回声微弱），那么非线性磁链观测器就是"追踪磁场本身"——永磁体磁链幅值在整个速度范围内近似恒定，无论电机快转慢转，"磁场信号"始终存在，低速不再"失聪"。

- **非线性磁链观测器核心优势：**

| 优势 | 说明 |
|------|------|
| 低速性能优异 | 磁链幅值≈ψf（与速度无关），低速信噪比远高于反电动势法 |
| 无需HFI辅助 | 理论上可实现零速闭环运行，无需高频注入 |
| 无抖振问题 | 不使用符号函数，电流平滑无振荡 |
| 结构简洁 | 仅需积分器+反馈补偿，比EKF计算量低一个数量级 |

- **与ALG-07中线性磁链观测器的本质区别：**

| 维度 | 线性磁链观测器（ALG-07 §2.3） | 非线性磁链观测器（本文） |
|------|------|------|
| 积分漂移抑制 | 低通滤波器替代纯积分（引入相位误差） | 非线性反馈补偿（电流模型+电压模型融合） |
| 反馈增益γ | 固定值或简单线性变化 | 速度自适应：低速γ大（电流模型主导），高速γ≈0（纯积分主导） |
| 低速性能 | 差（低通截止频率折中困难） | 优秀（电流模型在低速提供可靠参考） |
| 零速能力 | 无 | 有（电流模型在零速仍可工作） |

- **系统架构：**

```mermaid
flowchart TD
    subgraph 非线性磁链观测器系统
        Uab[Uα, Uβ 给定电压] --> flux_int[磁链积分器<br/>dψ/dt = u - Rs·i - γ·(ψ - Ld·i)]
        Iab[Iα, Iβ 采样电流] --> flux_int
        Iab --> current_model[电流模型<br/>ψ_model = Ld·id + ψf<br/>ψ_model = Lq·iq]
        current_model --> feedback_comp[非线性反馈补偿<br/>γ·(ψ_model - ψ)]
        feedback_comp --> flux_int
        
        flux_int --> psi_alpha[ψα, ψβ 观测磁链]
        Iab --> psi_f_alpha[转子磁链提取<br/>ψfα = ψα - Ld·iα<br/>ψfβ = ψβ - Ld·iβ]
        psi_alpha --> psi_f_alpha
        
        psi_f_alpha --> arctan[arctan2提取粗角度]
        psi_f_alpha --> pll[PLL锁相环<br/>平滑角度跟踪]
        arctan --> pll
        
        pll --> theta_out[θ̂ 估算角度]
        pll --> omega_out[ω̂ 估算速度]
        
        speed_fb[速度反馈] --> gamma_adapt[γ自适应<br/>γ = γ_base · f(ω)]
        gamma_adapt --> feedback_comp
    end
```

---

## 2.  原理推导  

### 2.1 PMSM电压方程与磁链定义

#### 2.1.1 αβ坐标系电压方程

在αβ静止坐标系下，PMSM的电压方程为：

$$
\begin{cases}
u_\alpha = R_s i_\alpha + \frac{d\psi_\alpha}{dt} \\
u_\beta = R_s i_\beta + \frac{d\psi_\beta}{dt}
\end{cases}
$$

其中：
- $u_\alpha, u_\beta$：αβ轴定子电压 ($V$)
- $R_s$：定子电阻 ($\Omega$)
- $i_\alpha, i_\beta$：αβ轴定子电流 ($A$)
- $\psi_\alpha, \psi_\beta$：αβ轴定子总磁链 ($Wb$)

#### 2.1.2 磁链分解

定子总磁链由电枢反应磁链和转子永磁体磁链组成：

$$
\begin{cases}
\psi_\alpha = L_s i_\alpha + \psi_{f\alpha} \\
\psi_\beta = L_s i_\beta + \psi_{f\beta}
\end{cases}
$$

其中：
- $\psi_{f\alpha}, \psi_{f\beta}$：αβ轴转子（永磁体）磁链分量 ($Wb$)
- $L_s$：定子电感 ($H$)，对SPMSM有$L_d = L_q = L_s$，对IPMSM需分别使用$L_d, L_q$

转子磁链与转子位置的关系：

$$
\begin{cases}
\psi_{f\alpha} = \psi_f \cos\theta_e \\
\psi_{f\beta} = \psi_f \sin\theta_e
\end{cases}
$$

其中：
- $\psi_f$：永磁体磁链幅值 ($Wb$)，**与转速无关**
- $\theta_e$：转子电角度 ($rad$)

#### 2.1.3 磁链观测的基本思路

从电压方程可得磁链的**电压模型**（开环积分）：

$$
\begin{cases}
\psi_\alpha = \int (u_\alpha - R_s i_\alpha) dt \\
\psi_\beta = \int (u_\beta - R_s i_\beta) dt
\end{cases}
$$

转子磁链：

$$
\begin{cases}
\psi_{f\alpha} = \psi_\alpha - L_s i_\alpha \\
\psi_{f\beta} = \psi_\beta - L_s i_\beta
\end{cases}
$$

角度提取：

$$
\theta_e = \arctan2(\psi_{f\beta}, \psi_{f\alpha})
$$

### 2.2 纯积分器的直流漂移问题

#### 2.2.1 漂移机理

纯积分器对直流偏移无限累积：

$$
\psi = \int (e_{ac} + e_{dc}) dt = \psi_{ac} + e_{dc} \cdot t
$$

其中：
- $e_{ac}$：交流分量（有用信号）($V$)
- $e_{dc}$：直流偏移分量 ($V$)，来源包括：Rs测量误差、电流偏置、电压死区
- $t$：时间 ($s$)

- **数值示例：** 假设Rs误差1%，$R_s = 0.5\Omega$，$i = 10A$，则：

$$
e_{dc} = \Delta R_s \cdot i = 0.005 \times 10 = 0.05V
$$

1秒后磁链漂移：$\Delta\psi = 0.05 \text{ Wb}$。若$\psi_f = 0.05 \text{ Wb}$，漂移量等于磁链幅值，角度估算完全失效。

#### 2.2.2 低通滤波器替代的局限

ALG-07中线性磁链观测器用低通滤波器替代纯积分：

$$
\psi(s) = \frac{1}{s + \omega_c} \cdot e(s)
$$

- **问题：**
- 截止频率$\omega_c$过低→相位延迟大→角度滞后严重
- 截止频率$\omega_c$过高→直流抑制差→漂移仍存在
- 低速时矛盾最尖锐：信号频率低，截止频率必须更低才能滤波，但相位延迟更严重

### 2.3 非线性反馈补偿原理

#### 2.3.1 电流模型（低速参考）

在dq旋转坐标系下，磁链的**电流模型**为：

$$
\begin{cases}
\psi_d^{model} = L_d i_d + \psi_f \\
\psi_q^{model} = L_q i_q
\end{cases}
$$

转换到αβ坐标系：

$$
\begin{cases}
\psi_\alpha^{model} = \psi_d^{model} \cos\hat{\theta} - \psi_q^{model} \sin\hat{\theta} \\
\psi_\beta^{model} = \psi_d^{model} \sin\hat{\theta} + \psi_q^{model} \cos\hat{\theta}
\end{cases}
$$

其中$\hat{\theta}$为估算角度。

- **电流模型特点：**
- 不含积分环节，无直流漂移问题
- 低速/零速时仍可工作（仅需电流和角度估计值）
- 依赖电感参数$L_d, L_q$和磁链$\psi_f$的准确性
- 高速时受角度误差影响大（正反馈风险）

#### 2.3.2 非线性磁链观测器方程

将电压模型（积分）与电流模型（参考）通过非线性反馈融合：

$$
\begin{cases}
\frac{d\hat{\psi}_\alpha}{dt} = u_\alpha - R_s i_\alpha - \gamma \cdot (\hat{\psi}_\alpha - L_d i_\alpha) \\
\frac{d\hat{\psi}_\beta}{dt} = u_\beta - R_s i_\beta - \gamma \cdot (\hat{\psi}_\beta - L_d i_\beta)
\end{cases}
$$

其中：
- $\hat{\psi}_\alpha, \hat{\psi}_\beta$：观测器输出的αβ轴磁链估计值 ($Wb$)
- $u_\alpha, u_\beta$：αβ轴定子电压 ($V$)
- $R_s$：定子电阻 ($\Omega$)
- $i_\alpha, i_\beta$：αβ轴定子电流 ($A$)
- $L_d$：d轴电感 ($H$)，对SPMSM有$L_d = L_q = L_s$
- $\gamma$：非线性反馈增益 ($rad/s$)，**随速度自适应调节**

- **物理解读：**
- 前两项 $u_\alpha - R_s i_\alpha$ 是纯积分器（电压模型），提供磁链的基本估计
- 第三项 $-\gamma \cdot (\hat{\psi}_\alpha - L_d i_\alpha)$ 是非线性反馈补偿：
  - $\hat{\psi}_\alpha - L_d i_\alpha$ 是观测器对转子磁链$\psi_{f\alpha}$的隐式估计
  - 当该估计偏离真实值时，反馈项将其拉回，抑制漂移
  - $\gamma$ 越大，抗漂移能力越强，但高速时引入的模型误差也越大

#### 2.3.3 反馈增益γ的物理意义

将观测器方程改写为：

$$
\frac{d\hat{\psi}_\alpha}{dt} = (u_\alpha - R_s i_\alpha) - \gamma \cdot \hat{\psi}_{f\alpha}
$$

其中$\hat{\psi}_{f\alpha} = \hat{\psi}_\alpha - L_d i_\alpha$为估计的转子磁链α分量。

- **γ的作用等效于一个高通滤波器：**

$$
\hat{\psi}_{f\alpha}(s) = \frac{s}{s + \gamma} \cdot \frac{1}{s}(u_\alpha - R_s i_\alpha) - \frac{\gamma}{s + \gamma} \cdot L_d i_\alpha
$$

- $\gamma \to 0$：趋近纯积分器，高速精度高但低速漂移
- $\gamma \to \infty$：趋近电流模型，低速稳定但高速受参数误差影响

- **关键洞察：** 理想情况下，γ应随速度变化——低速时γ大（电流模型主导，抑制漂移），高速时γ≈0（纯积分主导，避免模型误差）。

### 2.4 角度提取与PLL

#### 2.4.1 直接arctan2提取

转子磁链估计：

$$
\begin{cases}
\hat{\psi}_{f\alpha} = \hat{\psi}_\alpha - L_d i_\alpha \\
\hat{\psi}_{f\beta} = \hat{\psi}_\beta - L_d i_\beta
\end{cases}
$$

角度：

$$
\hat{\theta}_e = \arctan2(\hat{\psi}_{f\beta}, \hat{\psi}_{f\alpha})
$$

- **问题：** arctan2对噪声敏感，且无法直接提供速度信息。

#### 2.4.2 PLL角度跟踪

采用与SMO相同的PLL结构，利用d轴磁链误差作为鉴相信号：

$$
\varepsilon = \hat{\psi}_{f\alpha} \sin\hat{\theta} - \hat{\psi}_{f\beta} \cos\hat{\theta}
$$

当$\hat{\theta} = \theta_e$时，$\varepsilon = \psi_f \sin(\hat{\theta} - \theta_e) \approx \psi_f \cdot \Delta\theta$（小角度近似）。

PLL结构：

$$
\begin{cases}
\hat{\omega}_e = K_p \cdot \varepsilon + K_i \int \varepsilon \, dt \\
\hat{\theta}_e = \int \hat{\omega}_e \, dt
\end{cases}
$$

其中：
- $K_p$：PLL比例增益
- $K_i$：PLL积分增益
- $\hat{\omega}_e$：估算电角速度 ($rad/s$)
- $\hat{\theta}_e$：估算电角度 ($rad$)

---

## 3.  数学建模  

### 3.1 状态空间建模

#### 3.1.1 状态变量选择

选择磁链作为状态变量：

$$
\mathbf{x} = [\hat{\psi}_\alpha, \hat{\psi}_\beta]^T
$$

输入向量：

$$
\mathbf{u} = [u_\alpha, u_\beta, i_\alpha, i_\beta]^T
$$

#### 3.1.2 状态方程

$$
\dot{\mathbf{x}} = \mathbf{A}(\gamma) \mathbf{x} + \mathbf{B} \mathbf{u}
$$

展开：

$$
\begin{bmatrix} \dot{\hat{\psi}}_\alpha \\ \dot{\hat{\psi}}_\beta \end{bmatrix} =
\begin{bmatrix} -\gamma & 0 \\ 0 & -\gamma \end{bmatrix}
\begin{bmatrix} \hat{\psi}_\alpha \\ \hat{\psi}_\beta \end{bmatrix} +
\begin{bmatrix} 1 & 0 & -R_s + \gamma L_d & 0 \\ 0 & 1 & 0 & -R_s + \gamma L_d \end{bmatrix}
\begin{bmatrix} u_\alpha \\ u_\beta \\ i_\alpha \\ i_\beta \end{bmatrix}
$$

系统矩阵$\mathbf{A}$的特征值：

$$
\lambda_{1,2} = -\gamma
$$

- **稳定性条件：** $\gamma > 0$ 时系统渐近稳定。$\gamma$越大，收敛速度越快，但对模型误差的敏感度也越高。

### 3.2 离散化

#### 3.2.1 前向欧拉法

$$
\begin{cases}
\hat{\psi}_\alpha(k+1) = \hat{\psi}_\alpha(k) + T_s \left[ u_\alpha(k) - R_s i_\alpha(k) - \gamma \cdot (\hat{\psi}_\alpha(k) - L_d i_\alpha(k)) \right] \\
\hat{\psi}_\beta(k+1) = \hat{\psi}_\beta(k) + T_s \left[ u_\beta(k) - R_s i_\beta(k) - \gamma \cdot (\hat{\psi}_\beta(k) - L_d i_\beta(k)) \right]
\end{cases}
$$

其中$T_s$为采样周期 ($s$)。

- **稳定性约束：** 前向欧拉法要求 $T_s \cdot \gamma < 2$，即 $\gamma < 2/T_s$。当$T_s = 50\mu s$时，$\gamma < 40000$，远超实际使用范围，稳定性有保障。

#### 3.2.2 双线性变换（Tustin法）

更精确的离散化，保持频率响应特性：

$$
\hat{\psi}_\alpha(k+1) = \frac{2 - \gamma T_s}{2 + \gamma T_s} \hat{\psi}_\alpha(k) + \frac{T_s}{2 + \gamma T_s} \left[ (u_\alpha(k) - R_s i_\alpha(k) + \gamma L_d i_\alpha(k)) + (u_\alpha(k-1) - R_s i_\alpha(k-1) + \gamma L_d i_\alpha(k-1)) \right]
$$

- **优点：** 无条件稳定，频率畸变小  
- **缺点：** 需存储上一拍输入，计算量略大

#### 3.2.3 精确离散化（零阶保持）

$$
\hat{\psi}_\alpha(k+1) = e^{-\gamma T_s} \hat{\psi}_\alpha(k) + \frac{1 - e^{-\gamma T_s}}{\gamma} (u_\alpha(k) - R_s i_\alpha(k) + \gamma L_d i_\alpha(k))
$$

- **优点：** 精度最高，大$\gamma$时仍准确  
- **缺点：** 需计算指数函数，可用查表近似

### 3.3 Lyapunov稳定性分析

#### 3.3.1 误差动态方程

定义估计误差 $\tilde{\psi}_\alpha = \hat{\psi}_\alpha - \psi_\alpha$，$\tilde{\psi}_\beta = \hat{\psi}_\beta - \psi_\beta$：

$$
\begin{cases}
\frac{d\tilde{\psi}_\alpha}{dt} = -\gamma \tilde{\psi}_\alpha + \gamma (\psi_{f\alpha} - L_d i_\alpha + L_d i_\alpha) - \gamma \psi_{f\alpha} \\
= -\gamma \tilde{\psi}_\alpha + \gamma (\psi_{f\alpha}^{model} - \psi_{f\alpha})
\end{cases}
$$

其中$\psi_{f\alpha}^{model}$为电流模型给出的转子磁链估计。

#### 3.3.2 Lyapunov函数

选择Lyapunov函数：

$$
V = \frac{1}{2}(\tilde{\psi}_\alpha^2 + \tilde{\psi}_\beta^2)
$$

求导：

$$
\dot{V} = \tilde{\psi}_\alpha \dot{\tilde{\psi}}_\alpha + \tilde{\psi}_\beta \dot{\tilde{\psi}}_\beta
$$

当电流模型准确时（$\psi_{f\alpha}^{model} = \psi_{f\alpha}$）：

$$
\dot{V} = -\gamma (\tilde{\psi}_\alpha^2 + \tilde{\psi}_\beta^2) = -2\gamma V \leq 0
$$

- **结论：** 当$\gamma > 0$且电流模型参数准确时，观测器全局渐近稳定。误差以$e^{-\gamma t}$的速率指数收敛。

#### 3.3.3 参数失配下的鲁棒性

当电流模型存在参数误差$\Delta L_d$、$\Delta\psi_f$时：

$$
\dot{V} = -2\gamma V + \gamma(\tilde{\psi}_\alpha \Delta\psi_{f\alpha} + \tilde{\psi}_\beta \Delta\psi_{f\beta})
$$

其中$\Delta\psi_{f\alpha}$为电流模型误差。系统仍为输入-状态稳定（ISS），稳态误差有界：

$$
\|\tilde{\psi}\|_{ss} \leq \frac{\|\Delta\psi_f\|}{1}
$$

- **工程启示：** γ越大收敛越快，但对参数误差的放大也越严重。低速时γ大是安全的（电流模型准确），高速时应减小γ。

### 3.4 自适应增益设计

#### 3.4.1 速度自适应律

$$
\gamma = \gamma_{base} \cdot f(\hat{\omega}_e)
$$

其中$f(\hat{\omega}_e)$为速度自适应函数，典型设计：

**方案一：线性衰减**

$$
f(\omega) = \max\left(\frac{\omega_{threshold} - |\omega|}{\omega_{threshold}}, \gamma_{min}\right)
$$

其中$\omega_{threshold}$为切换速度阈值 ($rad/s$)。

**方案二：指数衰减**

$$
f(\omega) = \gamma_{min} + (\gamma_{max} - \gamma_{min}) \cdot e^{-|\omega|/\omega_c}
$$

其中$\omega_c$为衰减速率常数 ($rad/s$)。

**方案三：VESC风格分段线性**

$$
\gamma(\omega) = \begin{cases}
\gamma_{max} & |\omega| < \omega_{low} \\
\gamma_{max} - \frac{|\omega| - \omega_{low}}{\omega_{high} - \omega_{low}} (\gamma_{max} - \gamma_{min}) & \omega_{low} \leq |\omega| \leq \omega_{high} \\
\gamma_{min} & |\omega| > \omega_{high}
\end{cases}
$$

#### 3.4.2 增益参数选择指南

| 参数 | 物理意义 | 典型范围 | 选择原则 |
|------|---------|---------|---------|
| $\gamma_{max}$ | 零速/低速反馈增益 | 500~5000 rad/s | 足以在1~2个电周期内抑制漂移 |
| $\gamma_{min}$ | 高速最小增益 | 0~50 rad/s | 0为纯积分，小值保留微弱抗漂移能力 |
| $\omega_{low}$ | 低速区上界 | 5~10% 额定电角速度 | 电流模型可信的速度上限 |
| $\omega_{high}$ | 高速区下界 | 15~30% 额定电角速度 | 电压模型可信的速度下限 |

---

## 4.  代码实现  

### 4.1 非线性磁链观测器核心实现

#### 4.1.1 数据结构定义

```c
typedef struct {
    float psi_alpha;
    float psi_beta;
    float psi_f_alpha;
    float psi_f_beta;

    float gamma;
    float gamma_max;
    float gamma_min;
    float omega_low;
    float omega_high;

    float Rs;
    float Ld;
    float Lq;
    float psi_f;
    float Ts;

    struct {
        float kp;
        float ki;
        float integral;
        float speed_est;
        float angle_est;
        float sin_val;
        float cos_val;
    } pll;
} nlo_flux_t;
```

#### 4.1.2 观测器初始化

```c
void nlo_flux_init(nlo_flux_t *nlo, float Rs, float Ld, float Lq,
                   float psi_f, float Ts)
{
    nlo->psi_alpha = 0.0f;
    nlo->psi_beta = 0.0f;
    nlo->psi_f_alpha = 0.0f;
    nlo->psi_f_beta = 0.0f;

    nlo->Rs = Rs;
    nlo->Ld = Ld;
    nlo->Lq = Lq;
    nlo->psi_f = psi_f;
    nlo->Ts = Ts;

    nlo->gamma_max = 2000.0f;
    nlo->gamma_min = 5.0f;
    nlo->omega_low = 50.0f;
    nlo->omega_high = 200.0f;
    nlo->gamma = nlo->gamma_max;

    nlo->pll.kp = 500.0f;
    nlo->pll.ki = 8000.0f;
    nlo->pll.integral = 0.0f;
    nlo->pll.speed_est = 0.0f;
    nlo->pll.angle_est = 0.0f;
    nlo->pll.sin_val = 0.0f;
    nlo->pll.cos_val = 1.0f;
}
```

#### 4.1.3 自适应增益计算

```c
static float nlo_gamma_adapt(nlo_flux_t *nlo, float speed_est)
{
    float speed_abs = fabsf(speed_est);

    if (speed_abs < nlo->omega_low) {
        nlo->gamma = nlo->gamma_max;
    } else if (speed_abs > nlo->omega_high) {
        nlo->gamma = nlo->gamma_min;
    } else {
        float ratio = (speed_abs - nlo->omega_low) /
                      (nlo->omega_high - nlo->omega_low);
        nlo->gamma = nlo->gamma_max -
                     ratio * (nlo->gamma_max - nlo->gamma_min);
    }

    return nlo->gamma;
}
```

#### 4.1.4 观测器更新（前向欧拉法）

>  **适用范围**：以下实现基于 SPMSM 假设（Ld = Lq），转子磁链提取直接使用 `psi - Ld·i`。IPMSM 的正确做法见本节末尾说明。

```c
void nlo_flux_update(nlo_flux_t *nlo, float i_alpha, float i_beta,
                     float v_alpha, float v_beta)
{
    nlo_gamma_adapt(nlo, nlo->pll.speed_est);

    float gamma = nlo->gamma;
    float Ts = nlo->Ts;

    nlo->psi_alpha += Ts * (v_alpha - nlo->Rs * i_alpha
                     - gamma * (nlo->psi_alpha - nlo->Ld * i_alpha));
    nlo->psi_beta  += Ts * (v_beta  - nlo->Rs * i_beta
                     - gamma * (nlo->psi_beta  - nlo->Ld * i_beta));

    nlo->psi_f_alpha = nlo->psi_alpha - nlo->Ld * i_alpha;
    nlo->psi_f_beta  = nlo->psi_beta  - nlo->Ld * i_beta;

    nlo_flux_pll_update(nlo);
}
```

> **说明**：上述转子磁链提取代码 `psi_f_α = psi_α - Ld·i_α` 仅对 SPMSM（Ld = Lq）严格成立。对于 IPMSM（Ld ≠ Lq），αβ 坐标系下转子磁链的提取不能直接用 Ld 乘 i_α，需先将定子磁链和电流变换到 dq 坐标系：`psi_r_d = psi_d - Ld·i_d`、`psi_r_q = psi_q - Lq·i_q`，再反旋转变换回 αβ 得到 `psi_r_α`、`psi_r_β`。参见 §4.4 的 IPMSM 扩展实现。

#### 4.1.5 精确离散化实现

>  **适用范围**：同上，以下实现基于 SPMSM 假设（Ld = Lq）。

```c
void nlo_flux_update_exact(nlo_flux_t *nlo, float i_alpha, float i_beta,
                           float v_alpha, float v_beta)
{
    nlo_gamma_adapt(nlo, nlo->pll.speed_est);

    float gamma = nlo->gamma;
    float Ts = nlo->Ts;
    float exp_gt = expf(-gamma * Ts);
    float coeff = (1.0f - exp_gt) / gamma;

    float input_alpha = v_alpha - nlo->Rs * i_alpha + gamma * nlo->Ld * i_alpha;
    float input_beta  = v_beta  - nlo->Rs * i_beta  + gamma * nlo->Ld * i_beta;

    nlo->psi_alpha = exp_gt * nlo->psi_alpha + coeff * input_alpha;
    nlo->psi_beta  = exp_gt * nlo->psi_beta  + coeff * input_beta;

    nlo->psi_f_alpha = nlo->psi_alpha - nlo->Ld * i_alpha;
    nlo->psi_f_beta  = nlo->psi_beta  - nlo->Ld * i_beta;

    nlo_flux_pll_update(nlo);
}
```

> **说明**：同上，转子磁链提取仅适用 SPMSM。IPMSM 的正确转子磁链提取方法见 §4.4。

### 4.2 PLL角度跟踪实现

```c
static void nlo_flux_pll_update(nlo_flux_t *nlo)
{
    float sin_t = nlo->pll.sin_val;
    float cos_t = nlo->pll.cos_val;

    float error = nlo->psi_f_alpha * sin_t - nlo->psi_f_beta * cos_t;

    nlo->pll.integral += nlo->pll.ki * error * nlo->Ts;
    nlo->pll.speed_est = nlo->pll.kp * error + nlo->pll.integral;

    nlo->pll.angle_est += nlo->pll.speed_est * nlo->Ts;

    if (nlo->pll.angle_est > M_PI) {
        nlo->pll.angle_est -= 2.0f * M_PI;
    } else if (nlo->pll.angle_est < -M_PI) {
        nlo->pll.angle_est += 2.0f * M_PI;
    }

    nlo->pll.sin_val = sinf(nlo->pll.angle_est);
    nlo->pll.cos_val = cosf(nlo->pll.angle_est);
}
```

### 4.3 Whan-FOC项目参考实现（Simulink生成LADRC+LESO）

- **项目地址：** [Whan-FOC](https://github.com/OrientalSkylark/Whan-FOC)  
- **平台：** STM32G431  
- **算法：** Simulink自动生成的LADRC（线性自抗扰控制）+ LESO（线性扩张状态观测器）

#### 4.3.1 LESO D轴实现

```c
// LESO D-axis (from Speed_Driver.c)
// z1: 磁链/电流估计, z2: 扰动/反电动势估计
// b01L0: 观测器增益, u: 控制输入
rtDW.z1_integrator_DSTATE += ((rtU.b01L0 * rtb_Saturation1 - 2.0F * rtU.u *
    rtb_e0) + rtDW.z2_integrator_DSTATE) * 0.0001F;
rtDW.z2_integrator_DSTATE += -(rtb_Multiply1_tmp * rtb_e0) * 0.0001F;
```

- **LESO结构解读：**
- `z1_integrator`：一阶状态估计（对应磁链/电流），积分步长0.0001s（10kHz）
- `z2_integrator`：二阶状态估计（对应扰动/反电动势），扩张状态
- `b01L0`：观测器带宽参数，决定收敛速度
- `e0`：估计误差（z1与实际值的偏差），驱动观测器修正

#### 4.3.2 LESO Q轴实现

```c
// LESO Q-axis
rtDW.z1_integrator_DSTATE_p += ((rtU.b01L0 * rtb_Saturation - rtb_Multiply2) +
    rtDW.z2_integrator_DSTATE_c) * 0.0001F;
rtDW.z2_integrator_DSTATE_c += 0.0001F * -rtb_Multiply1;
```

#### 4.3.3 LADRC控制律

```c
// LADRC control law: u0 = (r - z1) * kp - z2, then u = u0 / b0
rtb_Saturation1 = ((0.0F - rtDW.z1_integrator_DSTATE) * (0.33F * rtU.u) -
                   rtDW.z2_integrator_DSTATE) / rtU.b01L0;
```

- **LADRC与非线性磁链观测器的联系：**
- LESO的z1/z2结构与磁链观测器的积分器+反馈补偿结构本质相同
- z1跟踪磁链（或电流），z2估计总扰动（包含反电动势和参数不确定性）
- LADRC将扰动估计z2前馈补偿到控制律中，实现"自抗扰"
- Simulink自动生成的代码虽然可读性差，但保证了数值稳定性和离散化精度

### 4.4 VESC风格非线性磁链观测器

- **参考：** VESC固件中的`mcpwm_foc.c`实现

#### 4.4.1 VESC观测器方程

VESC采用的非线性磁链观测器方程：

$$
\begin{cases}
\frac{d\hat{\psi}_\alpha}{dt} = V_\alpha - R \cdot I_\alpha - \gamma \cdot (\hat{\psi}_\alpha - L_d \cdot I_\alpha) \\
\frac{d\hat{\psi}_\beta}{dt} = V_\beta - R \cdot I_\beta - \gamma \cdot (\hat{\psi}_\beta - L_d \cdot I_\beta)
\end{cases}
$$

- **VESC的γ自适应策略：**

```c
// VESC-style gamma adaptation
// Zero-speed: gamma = gamma_max (current model dominates)
// High-speed: gamma -> 0 (pure integrator dominates)
float vesc_gamma_adapt(float speed_est, float gamma_max, float gamma_min,
                       float speed_low, float speed_high)
{
    float speed_abs = fabsf(speed_est);
    float gamma;

    if (speed_abs < speed_low) {
        gamma = gamma_max;
    } else if (speed_abs > speed_high) {
        gamma = gamma_min;
    } else {
        float t = (speed_abs - speed_low) / (speed_high - speed_low);
        gamma = gamma_max * (1.0f - t) + gamma_min * t;
    }

    return gamma;
}
```

#### 4.4.2 VESC角度提取

```c
// VESC uses arctan2 for initial angle, then PLL for tracking
void vesc_flux_observer_update(vesc_flux_t *f, float i_alpha, float i_beta,
                               float v_alpha, float v_beta, float dt)
{
    float gamma = vesc_gamma_adapt(f->speed_est, f->gamma_max, f->gamma_min,
                                   f->speed_low, f->speed_high);

    f->psi_alpha += dt * (v_alpha - f->Rs * i_alpha
                   - gamma * (f->psi_alpha - f->Ld * i_alpha));
    f->psi_beta  += dt * (v_beta  - f->Rs * i_beta
                   - gamma * (f->psi_beta  - f->Ld * i_beta));

    float psi_f_alpha = f->psi_alpha - f->Ld * i_alpha;
    float psi_f_beta  = f->psi_beta  - f->Ld * i_beta;

    f->angle = fast_atan2(psi_f_beta, psi_f_alpha);

    // PLL tracking for smooth angle and speed estimation
    float error = psi_f_alpha * sinf(f->angle_pll)
                - psi_f_beta * cosf(f->angle_pll);
    f->speed_est = f->pll_kp * error + f->pll_int;
    f->pll_int  += f->pll_ki * error * dt;
    f->angle_pll += f->speed_est * dt;

    // Normalize angle
    if (f->angle_pll > M_PI)  f->angle_pll -= 2.0f * M_PI;
    if (f->angle_pll < -M_PI) f->angle_pll += 2.0f * M_PI;
}
```

### 4.5 与ALG-07中线性磁链观测器的代码对比

- **ALG-07线性版本（低通滤波替代积分）：**

```c
// ALG-07: flux_observer.c - 线性磁链观测器
alpha_int += (v_alpha - i_alpha * Rs) * 0.0001f;
alpha_temp = alpha_int - i_alpha * Ld;
Alpha_psi = alpha_temp * 0.001f + (1.0f - 0.001f) * Alpha_psi_pre;
Alpha_psi_pre = Alpha_psi;
```

- **ALG-16非线性版本（反馈补偿替代低通滤波）：**

```c
// ALG-16: 非线性磁链观测器
psi_alpha += Ts * (v_alpha - Rs * i_alpha
           - gamma * (psi_alpha - Ld * i_alpha));
psi_f_alpha = psi_alpha - Ld * i_alpha;
```

- **关键差异：**
- 线性版用低通滤波`0.001f`系数消除漂移，引入固定相位延迟
- 非线性版用反馈补偿`-gamma * (psi_alpha - Ld * i_alpha)`，增益随速度自适应
- 非线性版直接在积分过程中补偿，而非后处理滤波

### 4.6 IPMSM扩展实现

对于内置式永磁同步电机（IPMSM），需考虑$dq$轴电感差异：

```c
void nlo_flux_update_ipmsm(nlo_flux_t *nlo, float i_alpha, float i_beta,
                            float v_alpha, float v_beta)
{
    nlo_gamma_adapt(nlo, nlo->pll.speed_est);

    float gamma = nlo->gamma;
    float Ts = nlo->Ts;
    float sin_t = nlo->pll.sin_val;
    float cos_t = nlo->pll.cos_val;

    float id = i_alpha * cos_t + i_beta * sin_t;
    float iq = -i_alpha * sin_t + i_beta * cos_t;

    float psi_d_model = nlo->Ld * id + nlo->psi_f;
    float psi_q_model = nlo->Lq * iq;

    float psi_alpha_model = psi_d_model * cos_t - psi_q_model * sin_t;
    float psi_beta_model  = psi_d_model * sin_t + psi_q_model * cos_t;

    nlo->psi_alpha += Ts * (v_alpha - nlo->Rs * i_alpha
                     - gamma * (nlo->psi_alpha - psi_alpha_model));
    nlo->psi_beta  += Ts * (v_beta  - nlo->Rs * i_beta
                     - gamma * (nlo->psi_beta - psi_beta_model));

    nlo->psi_f_alpha = nlo->psi_alpha - nlo->Ld * i_alpha;
    nlo->psi_f_beta  = nlo->psi_beta  - nlo->Ld * i_beta;

    nlo_flux_pll_update(nlo);
}
```

>  **注意**：上述 `psi_f_α = psi_α - Ld·i_α` 行仍沿用 SPMSM 简化公式，仅当 Ld = Lq 时严格成立。对于 Ld ≠ Lq 的 IPMSM，正确的转子磁链提取方法为：先将观测到的总磁链 `psi_α, psi_β` 和电流 `i_α, i_β` 变换到 dq 坐标系 → 计算 `psi_r_d = psi_d - Ld·i_d`、`psi_r_q = psi_q - Lq·i_q` → 再反旋转变换回 αβ 得到 `psi_f_α, psi_f_β`。

---

## 5.  参数整定  

### 5.1 反馈增益γ整定

- **关键参数：**

| 参数 | 说明 | 整定方法 |
|------|------|---------|
| $\gamma_{max}$ | 零速/低速最大增益 | 从小值开始，逐步增大直到漂移被抑制 |
| $\gamma_{min}$ | 高速最小增益 | 从0开始，若高速漂移则微增 |
| $\omega_{low}$ | 低速区上界 | 电流模型可信的速度上限 |
| $\omega_{high}$ | 高速区下界 | 电压模型可信的速度下限 |

- **整定步骤：**

1. **初始设置：** $\gamma_{max} = 1000$，$\gamma_{min} = 0$，$\omega_{low} = 10\% \omega_{rated}$，$\omega_{high} = 20\% \omega_{rated}$
2. **零速测试：** 电机静止，给定Id电流，观察$\hat{\psi}_{f\alpha}, \hat{\psi}_{f\beta}$是否漂移。若漂移，增大$\gamma_{max}$
3. **低速测试：** 5~10%额定转速运行，观察角度估算精度。若角度抖动，减小$\gamma_{max}$
4. **高速测试：** 额定转速运行，观察角度滞后。若滞后明显，减小$\gamma_{min}$或增大$\omega_{high}$
5. **过渡区测试：** 在$\omega_{low}$~$\omega_{high}$范围加减速，观察角度平滑性

- **经验法则：**

$$
\gamma_{max} \approx \frac{1}{T_{settle}}
$$

其中$T_{settle}$为期望的漂移抑制时间 ($s$)。若要求0.5秒内抑制漂移，则$\gamma_{max} \approx 2$。实际中需考虑噪声放大，通常取$\gamma_{max} = 500 \sim 3000$。

### 5.2 PLL参数整定

| 参数 | 说明 | 整定方法 |
|------|------|---------|
| $K_p$ | PLL比例增益 | 影响角度跟踪速度，先调Kp |
| $K_i$ | PLL积分增益 | 影响稳态精度，后调Ki |

- **PLL带宽设计：**

$$
\omega_n = \sqrt{K_i \cdot \psi_f}
$$

$$
\zeta = \frac{K_p}{2} \sqrt{\frac{\psi_f}{K_i}}
$$

其中$\omega_n$为自然频率 ($rad/s$)，$\zeta$为阻尼比（通常取0.707）。

- **典型值：**

| 速度范围 | $K_p$ | $K_i$ | $\omega_n$ |
|---------|-------|-------|-----------|
| 低速（<10%额定） | 200~500 | 2000~5000 | 10~30 Hz |
| 中速 | 500~1000 | 5000~10000 | 30~50 Hz |
| 高速（>50%额定） | 1000~2000 | 10000~20000 | 50~100 Hz |

### 5.3 Ld/Lq精度要求

- **电感误差对角度估算的影响：**

$$
\Delta\theta \approx \frac{\Delta L_d \cdot i_d}{\psi_f}
$$

- **数值示例：** $\psi_f = 0.05Wb$，$i_d = 5A$，$\Delta L_d = 10\% \times 1mH = 0.1mH$：

$$
\Delta\theta \approx \frac{0.0001 \times 5}{0.05} = 0.01 \text{ rad} \approx 0.57°
$$

- **结论：** 对SPMSM（$L_d = L_q$），电感精度要求相对宽松（10%误差→0.5°角度误差）。对IPMSM（$L_d \neq L_q$），需更精确的电感测量。

### 5.4 Rs温度补偿

**Rs温度漂移是磁链观测器最大的误差源。**

铜绕组温度系数：

$$
R_s(T) = R_{s,25°C} \cdot [1 + \alpha_{Cu} \cdot (T - 25)]
$$

其中$\alpha_{Cu} = 0.00393 /°C$。

**温升80°C时Rs增大约31%**，对磁链积分的影响：

$$
\Delta\psi_{drift} = \Delta R_s \cdot i \cdot t
$$

- **补偿策略：**

| 方法 | 精度 | 复杂度 | 适用场景 |
|------|------|--------|---------|
| 固定温度系数补偿 | 中 | 低 | 成本敏感 |
| 在线Rs辨识（MRAS） | 高 | 中 | 高性能驱动 |
| 直流脉冲注入 | 高 | 中 | 启动前辨识 |
| 热模型估算 | 中 | 中 | 无温度传感器 |

### 5.5 常见问题与解决方案

| 问题 | 现象 | 可能原因 | 解决方案 |
|------|------|---------|---------|
| 零速磁链漂移 | 静止时角度缓慢旋转 | γ不足或Rs误差大 | 增大γ_max，校准Rs偏置 |
| 低速角度抖动 | 5~10%转速时角度振荡 | γ过大放大噪声 | 减小γ_max，增加PLL滤波 |
| 高速角度滞后 | 额定转速时角度偏小 | γ_min过大引入模型误差 | 减小γ_min至0~5 |
| 加速过程角度跳变 | 过渡区角度突变 | γ切换不平滑 | 使用指数衰减替代分段线性 |
| IPMSM稳态偏差 | 角度有固定偏移 | Ld≠Lq未考虑 | 使用IPMSM版本（§4.6） |
| 启动失败 | 零速无法建立角度 | 初始磁链为零 | 预定位+电流模型初始化 |

---

## 6.  硬件约束  

### 6.1 电流采样精度→磁链积分精度

 **硬件约束：非线性磁链观测器对电流采样精度的要求比SMO更高**

磁链观测器核心方程中，$R_s \cdot i$ 项直接参与积分，电流偏置误差随时间累积：

- **ADC量化误差：** 12位ADC@3.3V，LSB≈0.8mV，对应电流（采样电阻0.01Ω+运放增益20倍）约4mA。$R_s \cdot \Delta i = 0.5 \times 0.004 = 2mV$，1秒积分漂移$0.002 Wb$
- **偏置漂移：** 运放偏置温度漂移典型值1μV/°C，等效电流偏移随温度变化，直接影响磁链积分零点
- **多通道匹配：** αβ轴电流需严格同步采样，通道间增益失配导致磁链轨迹椭圆化，角度估算出现周期性误差

- **对比SMO：** SMO中电流误差仅影响滑模面的切换行为，不参与积分累积，因此对偏置的容忍度更高。

### 6.2 PWM频率与死区效应

 **硬件约束：死区电压是磁链观测器在低调制比下的主要误差源**

- **死区电压误差：** 死区时间$T_d$导致的电压误差$\Delta V \approx \frac{T_d}{T_{PWM}} \cdot V_{dc}$。在$T_d = 1\mu s$，$T_{PWM} = 50\mu s$（20kHz），$V_{dc} = 48V$时，$\Delta V \approx 0.96V$
- **低速影响严重：** 低速时调制比小，给定电压仅几伏，死区误差占比可达30%以上。磁链积分中$u_\alpha - R_s i_\alpha$的$u_\alpha$误差直接累积
- **死区补偿必要性：** 非线性磁链观测器必须配合死区补偿算法使用，详见[ALG-04 死区补偿](./ALG-04-Deadtime-Compensation.md)

### 6.3 Rs温度漂移→磁链积分累积

 **硬件约束：Rs温度漂移是磁链观测器最根本的硬件约束**

$$
\Delta\psi_{Rs}(t) = \int_0^t \Delta R_s(\tau) \cdot i(\tau) d\tau
$$

- **铜绕组温度系数0.393%/°C**，温升80°C时Rs增大约31%
- **非线性补偿的缓解作用：** 反馈项$-\gamma(\hat{\psi}_\alpha - L_d i_\alpha)$在低速时（γ大）能有效抑制Rs误差导致的漂移，因为电流模型不依赖Rs
- **高速时的风险：** 高速时γ≈0，反馈补偿几乎不起作用，Rs误差直接积分累积。需在线Rs辨识或温度传感器补偿
- **冷态启动问题：** 电机冷态启动时Rs最小，随运行温度升高Rs增大。若使用冷态Rs值，运行后磁链将持续漂移

### 6.4 计算资源需求

 **硬件约束：非线性磁链观测器计算量介于SMO和EKF之间**

- **计算量对比（每控制周期，Cortex-M4 @168MHz）：**

| 观测器 | 浮点乘法 | 浮点加法 | 三角函数 | 总耗时估算 |
|--------|---------|---------|---------|-----------|
| 反电动势观测器 | 8 | 6 | 0 | 1~2μs |
| SMO | 16 | 12 | 0 | 3~5μs |
| **非线性磁链观测器** | **12** | **10** | **2(sin/cos)** | **4~6μs** |
| EKF(4阶) | 200+ | 150+ | 0 | 20~40μs |

- **非线性磁链观测器计算瓶颈：**
- PLL中的sin/cos计算：可用查表法或CORDIC加速
- 自适应γ计算：含条件分支，流水线不友好
- 精确离散化版本需exp()计算：可用查表或近似公式$e^{-x} \approx 1 - x$（$x \ll 1$时）

- **内存需求：** 约20个float变量 = 80字节，远小于EKF的4×4矩阵。

---

## 7.  前沿拓展  

### 7.1 与其他观测器的深度对比

| 维度 | 非线性磁链观测器 | SMO | 线性磁链观测器 | EKF |
|------|----------------|-----|--------------|-----|
| **低速性能** |  |  |  |  |
| **高速性能** |  |  |  |  |
| **零速能力** | （需电流模型） | （需HFI） | （需HFI） | （需HFI） |
| **计算量** | （低） | （低） | （最低） | （高） |
| **参数敏感性** | （Rs, Ld） | （Rs, Ls） | （Rs, Ls） | （全参数） |
| **抖振/噪声** | （无抖振） | （有抖振） | （无抖振） | （低噪声） |
| **实现复杂度** | （简单） | （中等） | （最简） | （复杂） |
| **鲁棒性** |  |  |  |  |

### 7.2 零速闭环启动策略

非线性磁链观测器实现零速闭环的关键：

**策略一：电流模型预定位**

1. 给定$d$轴电流$I_{d0}$（如额定电流的50%），$q$轴电流为零
2. 电流模型计算：$\psi_d^{model} = L_d I_{d0} + \psi_f$，$\psi_q^{model} = 0$
3. 观测器以$\gamma = \gamma_{max}$运行，磁链估计快速收敛到电流模型值
4. 从电流模型获取初始角度：$\hat{\theta}_0 = \arctan2(\psi_{f\beta}^{model}, \psi_{f\alpha}^{model})$
5. 切换到闭环FOC控制

**策略二：VESC零速方法**

1. 零速时$\gamma = \gamma_{max}$，观测器完全依赖电流模型
2. 电流模型需要角度估计值→形成闭环：角度估计→Park变换→电流模型→磁链→角度估计
3. 零速时该闭环是稳定的（可证明），但收敛域有限
4. 实际需配合小角度摆动或短时开环定位来确保收敛

**策略三：HFI辅助启动**

1. 零速时使用HFI获取初始角度（见[ALG-09 高频注入](./ALG-09-High-Frequency-Injection.md)）
2. 观测器以$\gamma = \gamma_{max}$初始化磁链
3. 低速时HFI与磁链观测器并行运行，角度加权融合
4. 速度超过$\omega_{low}$后完全切换到磁链观测器

### 7.3 VESC实现细节

VESC（Vedder Electronic Speed Controller）是目前最广泛使用非线性磁链观测器的开源电调项目：

- **VESC观测器特点：**
- 使用非线性磁链观测器作为中高速段的主观测器
- 低速段配合HFI实现全速域无感
- γ采用分段线性自适应
- 角度提取使用快速arctan2近似+PLL
- 内置Rs在线辨识功能

- **VESC参数配置（motor_config）：**
- `foc_observer_gain`：对应γ_max
- `foc_pll_kp`/`foc_pll_ki`：PLL参数
- `foc_sl_erpm`：开环→闭环切换速度
- `foc_sl_erpm_hfi`：HFI→观测器切换速度

### 7.4 在线参数辨识

- **Rs在线辨识：**

利用磁链观测器自身的结构，在稳态时比较电压模型和电流模型的差异来辨识Rs：

$$
\Delta R_s = \frac{\hat{\psi}_{voltage} - \hat{\psi}_{current}}{i \cdot T_{int}}
$$

其中$T_{int}$为积分时间窗口。

- **Ld/Lq在线辨识：**

注入高频电压信号，从电流响应中辨识电感：

$$
L_d = \frac{V_{inj}}{\omega_{inj} \cdot I_{response,d}}
$$

### 7.5 与主动磁链观测器的关系

ALG-07 §7.6提到的主动磁链观测器（Active Flux Observer）是非线性磁链观测器的理论推广：

- **主动磁链定义：** $\vec{\psi}_{active} = \vec{\psi}_f + (L_d - L_q) \cdot i_d \cdot \hat{d}$
- 将凸极效应等效为附加磁链，使SPMSM和IPMSM统一处理
- 非线性磁链观测器可视为主动磁链观测器在$L_d = L_q$时的特例

### 7.6 基于磁链观测器的无传感器MTPA

在IPMSM中，MTPA轨迹可通过磁链幅值直接确定：

$$
\psi_s^2 = (L_d i_d + \psi_f)^2 + (L_q i_q)^2
$$

MTPA条件等价于磁链幅值最小化。非线性磁链观测器直接提供$\hat{\psi}_\alpha, \hat{\psi}_\beta$，可实时计算磁链幅值$\hat{\psi}_s = \sqrt{\hat{\psi}_\alpha^2 + \hat{\psi}_\beta^2}$，用于MTPA控制。

---

## 观测器性能对比

| 观测器 | 低速性能 | 零速能力 | 高速性能 | 计算量 | 参数敏感性 | 抖振/噪声 |
|--------|---------|---------|---------|--------|-----------|----------|
| 反电动势 | 差 | 无 | 好 | 低 | 高 | 低 |
| SMO | 中 | 无(需HFI) | 好 | 中 | 中 | 高 |
| 线性磁链 | 差 | 无(需HFI) | 好 | 中 | 中 | 低 |
| **非线性磁链** | **优秀** | **有** | **好** | **中** | **中** | **低** |
| EKF | 中 | 无(需HFI) | 好 | 高 | 中 | 低 |
| HFI | 优秀 | 优秀 | 差 | 中 | 低 | 中 |

## 适用场景推荐

| 应用场景 | 推荐观测器 | 理由 |
|---------|-----------|------|
| 无人机云台 | 非线性磁链 | 零速保持力矩，无抖振 |
| 电动滑板/自行车 | 非线性磁链+HFI | VESC方案成熟，全速域覆盖 |
| 伺服驱动 | 非线性磁链 | 低速定位精度高 |
| 风机水泵 | SMO/反电动势 | 高速运行，低成本 |
| 电动汽车 | EKF+非线性磁链 | 高精度，全速域 |

## 关键公式速查表

| 名称 | 公式 | 说明 |
|------|------|------|
| 非线性磁链观测器 | $\dot{\hat{\psi}}_\alpha = u_\alpha - R_s i_\alpha - \gamma(\hat{\psi}_\alpha - L_d i_\alpha)$ | 核心方程 |
| 转子磁链提取 | $\hat{\psi}_{f\alpha} = \hat{\psi}_\alpha - L_d i_\alpha$ | 减去电枢反应磁链 |
| 角度计算 | $\hat{\theta} = \arctan2(\hat{\psi}_{f\beta}, \hat{\psi}_{f\alpha})$ | 直接角度提取 |
| PLL误差信号 | $\varepsilon = \hat{\psi}_{f\alpha}\sin\hat{\theta} - \hat{\psi}_{f\beta}\cos\hat{\theta}$ | d轴磁链误差 |
| γ自适应 | $\gamma = \gamma_{max} \cdot f(\omega)$ | 速度自适应增益 |
| 离散化(欧拉) | $\hat{\psi}_\alpha(k+1) = \hat{\psi}_\alpha(k) + T_s[u_\alpha - R_s i_\alpha - \gamma(\hat{\psi}_\alpha - L_d i_\alpha)]$ | 前向欧拉 |
| 离散化(精确) | $\hat{\psi}_\alpha(k+1) = e^{-\gamma T_s}\hat{\psi}_\alpha(k) + \frac{1-e^{-\gamma T_s}}{\gamma}(u_\alpha - R_s i_\alpha + \gamma L_d i_\alpha)$ | 零阶保持 |
| Lyapunov函数 | $V = \frac{1}{2}(\tilde{\psi}_\alpha^2 + \tilde{\psi}_\beta^2)$ | 稳定性证明 |
| 收敛速率 | $\dot{V} = -2\gamma V$ | 指数收敛 |

##  交叉引用

| 模块 | 关联内容 |
|------|---------|
| [ALG-07 无感FOC观测器](./ALG-07-Sensorless-Observers.md) | 基础观测器概念、SMO/线性磁链/EKF原理 |
| [ALG-06 位置与速度观测器](./ALG-06-Position-Speed-Observer.md) | 观测器入门、PLL基础 |
| [ALG-09 高频注入](./ALG-09-High-Frequency-Injection.md) | 零速启动辅助、HFI+磁链观测器全速域 |
| [ALG-04 死区补偿](./ALG-04-Deadtime-Compensation.md) | 死区对磁链积分的影响 |
| [MC-LIB-Observer](./MC-LIB/MC-LIB-Observer.md) | MC_LIB观测器模块实现 |
| [Whan-FOC](https://github.com/OrientalSkylark/Whan-FOC) | STM32G431 LADRC+LESO参考实现 |
| [VESC](https://github.com/vedderb/bldc) | 开源电调非线性磁链观测器实现 |

##  仿真验证
> 本模块的理论可在 [C 语言仿真](../simulation/SIM-00-C-Simulation-Overview.md) 中验证。
> 对应仿真模式：MODE_SELECT_VELOCITY_LOOP_SENSORLESS (41)，关键操作：切换观测器类型为非线性磁链观测器，观察零速/低速下的角度误差、γ自适应过程、与SMO的性能对比

>  检验你的理解：[ALG-16 检验题目](./ALG-16-assessment.md)
