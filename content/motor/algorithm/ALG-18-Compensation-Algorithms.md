---
date: 2026-06-08
section: 电机控制
chapter: algorithm
chapterTitle: 控制算法
chapterOrder: 20
category: 控制算法
source: motor
visibility: public
title: ALG-18 补偿算法综合
tags:
  - motor-control
status: learning
summary: "**模块编号：** ALG-18 **模块名称：** 补偿算法综合（Compensation Algorithms） **文档版本：** v1.0 **适用对象：** 电机控制工程师、嵌入式算法工程师、伺服驱动开发者 **前置知识：** FOC 控制框架、SVPWM 调制、PI 电流调节器、编码器原理、ALG-04 死"
navGroup: 控制与算法
navGroupOrder: 30
---

# ALG-18 补偿算法综合

**模块编号：** ALG-18
**模块名称：** 补偿算法综合（Compensation Algorithms）
**文档版本：** v1.0
**适用对象：** 电机控制工程师、嵌入式算法工程师、伺服驱动开发者
**前置知识：** FOC 控制框架、SVPWM 调制、PI 电流调节器、编码器原理、ALG-04 死区补偿基础

---

## 1.  核心摘要  

**一句话总结：** 补偿算法是消除逆变器非理想特性（死区、管压降）与电机非理想特性（齿槽转矩、磁路不对称）对控制性能影响的系统级手段，补偿精度直接决定低速平稳性、转矩纹波和高速电流环稳定性。

**认知钩子：** 理想的 FOC 控制器假设"指令电压 = 实际输出电压"、"电机转矩 = $K_t \cdot i_q$"，但现实是逆变器有死区和管压降，电机有齿槽转矩和磁路非线性——就像你用 GPS 导航，地图假设路是直的，但实际路面有坑洼、弯道和施工。补偿算法就是给导航系统加上"路面修正信息"，让实际行驶轨迹尽可能贴合理想路径。不同补偿算法的区别在于：你是提前测绘好坑洼位置（前馈查表），还是靠车身震动实时感知（观测器自适应），还是两者结合。

| 补偿类型 | 物理来源 | 影响频段 | 典型改善幅度 |
|---------|---------|---------|------------|
| 死区补偿深化 | 逆变器开关非理想 | 低频（6倍电气频率谐波） | 电流THD降低50~80% |
| 齿槽转矩补偿 | 定子齿槽磁阻变化 | 与极槽配合相关的位置周期 | 转矩纹波降低60~90% |
| 转速纹波补偿 | 多源复合 | 1×/6×/12×电气频率 | 转速波动降低70~95% |
| 角度延迟补偿 | 采样-计算-更新链路延迟 | 高速时显著 | 高速d轴电流偏移降低80%+ |

---

## 2.  问题引入  

### 2.1 为什么需要系统级补偿？

FOC 控制器的性能上限取决于两个假设的成立程度：

1. **电压假设**：控制器输出的 $v_d^*, v_q^*$ 能无失真地施加到电机端子上
2. **转矩假设**：电磁转矩严格正比于 $i_q$（$T_e = K_t \cdot i_q$）

然而实际系统中：

**逆变器侧非理想特性：**
- 死区时间导致输出电压畸变（ALG-04 已详述原理）
- 功率器件管压降（IGBT 饱和压降 $V_{CE(sat)} \approx 1.5\sim3V$，二极管正向压降 $V_F \approx 1.2\sim2V$）
- 器件开关时间随温度和电流变化
- 母线电压纹波

**电机侧非理想特性：**
- 齿槽转矩：定子齿槽与永磁体间磁阻周期性变化产生的定位力矩
- 磁路饱和导致 $L_d, L_q$ 随电流非线性变化
- 反电势谐波（非理想正弦）
- 摩擦力矩非线性

**传感器侧非理想特性：**
- 编码器分辨率有限导致角度量化误差
- 采样-计算-更新链路引入角度延迟
- 编码器安装偏心

这些非理想特性在高速、低速、轻载等极端工况下尤为突出，单一补偿手段无法覆盖所有场景，需要系统级的多层补偿策略。

### 2.2 补偿算法的分层架构

```text
┌──────────────────────────────────────────────┐
│              应用层：轨迹规划                   │
├──────────────────────────────────────────────┤
│         控制层：PI 调节器 + 前馈补偿            │
│    ┌──────────┬──────────┬──────────────┐     │
│    │ 齿槽转矩 │ 转速纹波 │ 角度延迟补偿  │     │
│    │  前馈补偿 │  重复控制 │  θ预测补偿    │     │
│    └──────────┴──────────┴──────────────┘     │
├──────────────────────────────────────────────┤
│         驱动层：SVPWM + 死区补偿               │
│    ┌────────────────────────────────────┐     │
│    │  自适应死区补偿 + 电压误差观测器    │     │
│    └────────────────────────────────────┘     │
├──────────────────────────────────────────────┤
│         硬件层：逆变器 + 电机 + 编码器          │
└──────────────────────────────────────────────┘
```

---

## 3.  死区补偿深化  

> **与 ALG-04 的关系：** ALG-04 讲述死区补偿的物理原理和基础方法（平均电压前馈、PWM占空比修正、扰动观测器），本节聚焦工程深化——过零模糊区处理、自适应补偿、稳定性分析及方法对比。

### 3.1 电流极性检测的模糊区域处理 

**问题本质：** 死区补偿的核心是确定电流极性 $\text{sign}(i)$，但在电流过零附近（$|i| < i_{threshold}$），ADC 采样噪声、量化误差和电流纹波使极性判断不可靠。

**模糊区域的三重不确定性：**

1. **采样噪声**：ADC 量化 + 运放噪声，典型 RMS $10\sim50mA$，在轻载时信噪比极低
2. **电流纹波**：PWM 开关频率引起的电流纹波在过零点叠加，使实际电流在正负间振荡
3. **死区本身的正反馈**：极性误判→补偿方向错误→电流更偏离预期→极性更难判断

**工程处理方法：**

**方法一：滞环比较法**

```c
#define I_HYST_POS  0.3f
#define I_HYST_NEG  (-0.3f)

typedef struct {
    int8_t polarity;
} polarity_state_t;

int8_t polarity_detect_hyst(polarity_state_t *state, float i_meas)
{
    if (i_meas > I_HYST_POS)
        state->polarity = 1;
    else if (i_meas < I_HYST_NEG)
        state->polarity = -1;

    return state->polarity;
}
```

滞环宽度选取原则：$i_{hyst} \geq 3\sigma_{noise}$（$\sigma_{noise}$ 为电流测量噪声标准差），典型值 $2\sim5\%$ 额定电流。

**方法二：线性过渡法**

在模糊区域内用线性函数替代 sign 函数，避免补偿量突变：

$$f(i) = \begin{cases} 1 & i > i_{th} \\ \frac{i}{i_{th}} & -i_{th} \leq i \leq i_{th} \\ -1 & i < -i_{th} \end{cases}$$

```c
float polarity_linear(float i_meas, float i_threshold)
{
    if (i_meas > i_threshold)
        return 1.0f;
    else if (i_meas < -i_threshold)
        return -1.0f;
    else
        return i_meas / i_threshold;
}
```

**方法三：Sigmoid 平滑法**

用 Sigmoid 函数实现连续平滑的极性过渡：

$$f(i) = \frac{2}{1 + e^{-k \cdot i}} - 1$$

其中 $k$ 控制过渡区宽度，$k$ 越大过渡越陡峭（趋近 sign 函数），$k$ 越小过渡越平滑。

```c
float polarity_sigmoid(float i_meas, float k)
{
    float exp_val = expf(-k * i_meas);
    return 2.0f / (1.0f + exp_val) - 1.0f;
}
```

**三种方法对比：**

| 方法 | 补偿连续性 | 过零区精度 | 实现复杂度 | 适用场景 |
|------|----------|----------|----------|---------|
| 滞环比较 | 阶跃（不连续） | 低（保持上次极性） |  | 通用场景 |
| 线性过渡 | 连续（一阶） | 中 |  | 低噪声场景 |
| Sigmoid | 连续（平滑） | 中高 |  | 高性能伺服 |

### 3.2 基于电压误差观测器的自适应死区补偿 

**核心思想：** 不依赖电流极性判断，而是通过比较指令电压与"实际需要的电压"（由电流误差反推）来估计死区引起的电压误差，实现自适应补偿。

**观测器设计：**

将死区误差建模为 dq 坐标系下的未知扰动 $d_d, d_q$，构建电流模型：

$$L\frac{di_d}{dt} = v_d^* - R i_d + \omega_e L_q i_q + d_d$$

$$L\frac{di_q}{dt} = v_q^* - R i_q - \omega_e(L_d i_d + \psi_f) + d_q$$

扰动观测器：

$$\frac{d\hat{d}_d}{dt} = \gamma_d \cdot (i_d - \hat{i}_d)$$

$$\frac{d\hat{d}_q}{dt} = \gamma_q \cdot (i_q - \hat{i}_q)$$

其中模型电流由标称参数计算：

$$\frac{d\hat{i}_d}{dt} = \frac{1}{L_d}(v_d^* - R\hat{i}_d + \omega_e L_q i_q + \hat{d}_d)$$

$$\frac{d\hat{i}_q}{dt} = \frac{1}{L_q}(v_q^* - R\hat{i}_q - \omega_e(L_d i_d + \psi_f) + \hat{d}_q)$$

**补偿输出：**

$$v_{d,comp} = v_d^* + \hat{d}_d$$

$$v_{q,comp} = v_q^* + \hat{d}_q$$

```c
typedef struct {
    float gamma;
    float R;
    float Ld_inv;
    float Lq_inv;
    float Ts;
    float d_hat_d;
    float d_hat_q;
    float i_hat_d;
    float i_hat_q;
    float d_hat_limit;
} volt_err_observer_t;

void volt_err_observer_update(volt_err_observer_t *obs,
                               float vd_cmd, float vq_cmd,
                               float id_meas, float iq_meas,
                               float omega_e, float psi_f,
                               float *vd_comp, float *vq_comp)
{
    obs->i_hat_d += obs->Ts * obs->Ld_inv *
        (vd_cmd - obs->R * obs->i_hat_d + omega_e * (1.0f / obs->Lq_inv) * obs->i_hat_q + obs->d_hat_d);
    obs->i_hat_q += obs->Ts * obs->Lq_inv *
        (vq_cmd - obs->R * obs->i_hat_q - omega_e * ((1.0f / obs->Ld_inv) * obs->i_hat_d + psi_f) + obs->d_hat_q);

    obs->d_hat_d += obs->Ts * obs->gamma * (id_meas - obs->i_hat_d);
    obs->d_hat_q += obs->Ts * obs->gamma * (iq_meas - obs->i_hat_q);

    obs->d_hat_d = clampf(obs->d_hat_d, -obs->d_hat_limit, obs->d_hat_limit);
    obs->d_hat_q = clampf(obs->d_hat_q, -obs->d_hat_limit, obs->d_hat_limit);

    *vd_comp = vd_cmd + obs->d_hat_d;
    *vq_comp = vq_cmd + obs->d_hat_q;
}
```

**观测器增益 $\gamma$ 的整定：**

$\gamma$ 决定扰动估计的收敛速度，但过大将放大噪声：

- $\gamma$ 过小：补偿响应慢，动态过程中电压误差大
- $\gamma$ 过大：噪声放大，电流抖动加剧，甚至导致电流环不稳定
- 经验范围：$\gamma = 500 \sim 5000$，需结合电流环带宽和采样噪声调整
- 整定原则：$\gamma$ 对应的观测器带宽应低于电流环带宽的 $1/3 \sim 1/5$

### 3.3 死区补偿与电流环稳定性的关系 

**补偿过度的风险：** 死区补偿本质上是在电压指令上叠加一个与电流方向相关的反馈量，当补偿量超过实际死区误差时，形成正反馈环路，可能导致电流振荡甚至发散。

**稳定性分析：**

考虑死区补偿后的电流环等效框图：

```text
              ┌─────────┐    ┌─────────┐    ┌─────────┐
 i* ──(+)──→│  PI 控制器 │──→│ 死区补偿 │──→│  电机模型 │──→ i
        -│   └─────────┘    └─────────┘    └─────────┘
         │                                      │
         └──────────────────────────────────────┘
```

死区补偿环节的等效增益为 $K_{comp} = \frac{\partial v_{comp}}{\partial i}$。对于基于电流极性的补偿：

- 极性正确时：$K_{comp} = 0$（补偿量恒定，与电流无关）
- 极性错误时：$K_{comp} = -\frac{2\Delta V}{i_{th}}$（线性过渡区），形成负阻尼

**稳定性判据：** 补偿后的电流环开环增益不应超过 PI 控制器设计时的相位裕度允许范围。实用准则：

1. 补偿量上限：$|\hat{d}| \leq 1.5 \Delta V_{theoretical}$（留50%安全裕量）
2. 观测器带宽：$\omega_{obs} \leq \frac{1}{5}\omega_{current\_loop}$
3. 补偿滤波：对 $\hat{d}$ 施加低通滤波，截止频率 $\leq \omega_{obs}/2$

**补偿过度的典型表现：**
- 电流波形出现低频振荡（频率接近观测器带宽）
- 电流过零点附近抖动加剧
- 电流环阶跃响应出现振铃

### 3.4 多种死区补偿方法的工程对比 

| 维度 | 基于电流极性 | 基于电压误差观测器 | 基于扰动观测器(DOB) |
|------|-----------|----------------|------------------|
| **原理** | 根据电流符号前馈固定 $\Delta V$ | 通过电流模型误差反推电压扰动 | 将死区误差视为等效负载扰动 |
| **过零区表现** | 阶跃/滞环，易误判 | 平滑过渡，无极性判断 | 平滑，但响应有延迟 |
| **参数依赖** | 需知 $T_{dead}, V_{dc}$ | 需知 $R, L$（参数失配影响精度） | 需设计 Q-filter 和标称模型 |
| **温度鲁棒性** | 差（固定 $\Delta V$ 不随温度变） | 中（$R$ 随温度变化引入误差） | 好（DOB 对模型误差有鲁棒性） |
| **计算量** |  |  |  |
| **低速性能** | 中（过零问题） | 好 | 好 |
| **高速性能** | 好 | 好 | 中（DOB 带宽受限） |
| **典型应用** | 通用变频器 | 工业伺服 | 高精度伺服/直驱 |
| **实现风险** | 极性误判→补偿反向 | 参数失配→稳态误差 | Q-filter设计不当→不稳定 |

**选型建议：**

- **成本敏感型应用**（家电变频器、电动工具）：基于电流极性 + 滞环，实现简单
- **中等性能应用**（工业伺服、机器人关节）：基于电压误差观测器，平衡精度与复杂度
- **高性能应用**（直驱电机、半导体设备）：基于扰动观测器 + 电流极性混合策略

---

## 4.  抗齿槽转矩补偿  

### 4.1 齿槽转矩的物理来源 

齿槽转矩（Cogging Torque）是永磁电机中定子齿槽与永磁体之间磁阻周期性变化产生的定位力矩，即使不通电也存在。

**物理机制：**

永磁体产生的磁通倾向于走磁阻最小的路径。当转子旋转时，永磁体与定子齿的相对位置变化导致磁路磁阻周期性改变，磁场储能随之变化：

$$T_{cog} = -\frac{\partial W_{mag}}{\partial \theta_m}$$

其中 $W_{mag}$ 为磁场储能，$\theta_m$ 为机械角度。

**齿槽转矩的周期性：**

齿槽转矩是转子位置的周期函数，每机械转的脉动次数为：

$$N_{cog} = \text{LCM}(N_s, 2p)$$

其中 $N_s$ 为定子槽数，$2p$ 为极数，LCM 为最小公倍数。

例如：12槽10极电机，$N_{cog} = \text{LCM}(12, 10) = 60$ 次/机械转。

**典型幅值：** 齿槽转矩通常为额定转矩的 $1\sim5\%$，但在槽极配合不佳的电机中可达 $10\%$ 以上。

### 4.2 齿槽转矩的特征 

齿槽转矩可展开为傅里叶级数：

$$T_{cog}(\theta_m) = \sum_{k=1}^{\infty} T_k \sin(k \cdot N_{cog} \cdot \theta_m + \phi_k)$$

特征要点：

- **频率特征**：基频为 $N_{cog} \times f_m$（$f_m$ 为机械转速频率），与电气频率无关
- **低速显著**：低速时齿槽转矩占电磁转矩比例大，高速时被惯量平滑
- **位置确定性**：同一台电机的齿槽转矩波形高度可重复，是前馈补偿的基础
- **温度影响**：温度改变永磁体剩磁，齿槽转矩幅值可能变化 $\pm10\sim20\%$

### 4.3 前馈补偿法 

**原理：** 预先测量齿槽转矩随转子位置的变化规律，存储为查找表，运行时根据角度查表并叠加到 $i_q$ 指令上。

**步骤一：齿槽转矩表测量**

在无电流激励（$i_d = i_q = 0$）条件下，缓慢旋转转子，测量维持恒速所需的 $i_q$ 补偿量：

```c
#define COG_TABLE_SIZE  360

typedef struct {
    float table[COG_TABLE_SIZE];
    float mech_angle_offset;
} cogging_table_t;

void cogging_table_measure(cogging_table_t *cog, float *iq_comp_log,
                            float *mech_angle_log, int samples)
{
    for (int i = 0; i < COG_TABLE_SIZE; i++) {
        float angle = (float)i / COG_TABLE_SIZE * 2.0f * PI;
        int idx = find_nearest_angle(mech_angle_log, samples, angle);
        cog->table[i] = iq_comp_log[idx];
    }
}
```

**步骤二：在线查表补偿**

```c
float cogging_comp_ff(cogging_table_t *cog, float mech_angle)
{
    float angle_norm = mech_angle - cog->mech_angle_offset;
    while (angle_norm < 0) angle_norm += 2.0f * PI;
    while (angle_norm >= 2.0f * PI) angle_norm -= 2.0f * PI;

    float idx_f = angle_norm / (2.0f * PI) * COG_TABLE_SIZE;
    int idx0 = (int)idx_f;
    int idx1 = (idx0 + 1) % COG_TABLE_SIZE;
    float frac = idx_f - idx0;

    return cog->table[idx0] * (1.0f - frac) + cog->table[idx1] * frac;
}
```

**前馈补偿的局限：**
- 需要逐台标定（同一型号不同个体齿槽转矩有差异）
- 温度变化导致补偿表偏移
- 负载电流改变磁路饱和度，影响齿槽转矩波形

### 4.4 自适应补偿法 

**原理：** 在线辨识齿槽转矩的傅里叶系数，实时更新补偿表，克服前馈法的逐台标定和温度漂移问题。

**谐波系数在线辨识：**

将齿槽转矩建模为有限阶傅里叶级数：

$$T_{cog}(\theta_m) \approx \sum_{k=1}^{N_h} [a_k \cos(k \cdot N_{cog} \cdot \theta_m) + b_k \sin(k \cdot N_{cog} \cdot \theta_m)]$$

利用速度环的 $i_q$ 稳态误差（包含齿槽转矩信息），通过相关分析法或 RLS 辨识 $a_k, b_k$：

$$\begin{bmatrix} \hat{a}_k \\ \hat{b}_k \end{bmatrix}_{n+1} = \begin{bmatrix} \hat{a}_k \\ \hat{b}_k \end{bmatrix}_n + \mu_k \begin{bmatrix} \cos(k N_{cog} \theta_m) \\ \sin(k N_{cog} \theta_m) \end{bmatrix} \cdot e_{\omega}$$

其中 $e_{\omega} = \omega^* - \omega$ 为转速误差，$\mu_k$ 为自适应步长。

```c
#define COG_HARMONICS_MAX  6

typedef struct {
    int N_cog;
    float a[COG_HARMONICS_MAX];
    float b[COG_HARMONICS_MAX];
    float mu;
} adaptive_cog_t;

float cogging_comp_adaptive(adaptive_cog_t *acog, float theta_m, float speed_err)
{
    float comp = 0.0f;
    float theta_cog;

    for (int k = 0; k < COG_HARMONICS_MAX; k++) {
        theta_cog = (float)(k + 1) * acog->N_cog * theta_m;
        acog->a[k] += acog->mu * cosf(theta_cog) * speed_err;
        acog->b[k] += acog->mu * sinf(theta_cog) * speed_err;
        comp += acog->a[k] * cosf(theta_cog) + acog->b[k] * sinf(theta_cog);
    }

    return comp;
}
```

**自适应步长 $\mu$ 的选取：**
- $\mu$ 过大：收敛快但噪声敏感，可能不稳定
- $\mu$ 过小：噪声抑制好但收敛慢
- 经验值：$\mu = 10^{-5} \sim 10^{-3}$，需根据速度环带宽和采样率调整
- 实用技巧：启动时用大 $\mu$ 快速收敛，稳态后切换为小 $\mu$ 精细调整

### 4.5 ODrive 的 Anti-cogging 实现分析 

ODrive 是开源电机控制项目的标杆，其 Anti-cogging 功能是工程实践的优秀参考。

**ODrive Anti-cogging 流程：**

1. **标定阶段**（上电时自动执行）：
   - 电机进入位置控制模式，锁定到目标角度
   - 在一个电气周期内均匀采样 $N$ 个角度点（典型 $N = 360$ 或更大）
   - 每个角度点记录维持位置所需的 $i_q$ 值，即为齿槽转矩的等效电流
   - 对原始数据施加低通滤波，去除测量噪声
   - 存储为查找表

2. **运行阶段**：
   - 根据当前机械角度插值查表
   - 补偿量叠加到 $i_q$ 指令上

**ODrive 实现的关键细节：**

- 标定在位置环闭环下进行，利用位置环的积分项自动补偿齿槽转矩
- 标定速度极慢（典型 $0.1 \sim 0.5$ rad/s），确保动态效应可忽略
- 补偿表存储在非易失性存储器中，避免每次上电重新标定
- 提供手动触发重新标定的接口（温度变化后可能需要）

**ODrive 方法的优缺点：**

| 维度 | 评价 |
|------|------|
| 实现难度 | （逻辑简单） |
| 补偿效果 | （低速效果显著） |
| 通用性 | （依赖精确位置传感器） |
| 温度鲁棒性 | （固定表，不随温度更新） |
| 多机一致性 | （逐台标定，个体差异已包含） |

**改进方向：** 在 ODrive 基础上增加自适应更新机制——运行时监测速度纹波，当纹波幅值超过阈值时触发局部表项更新，实现温度自适应。

---

## 5.  转速纹波补偿  

### 5.1 转速纹波的来源 

转速纹波是多种非理想因素的复合表现：

| 来源 | 频率特征 | 幅值特征 |
|------|---------|---------|
| 齿槽转矩 | $N_{cog} \times f_m$ | 低速显著 |
| 死区效应 | $6f_e$（6倍电气频率） | 低调制比显著 |
| 反电势谐波 | $6f_e, 12f_e, \ldots$ | 全速域 |
| 负载脉动 | 与负载特性相关 | 应用相关 |
| 编码器非理想 | $1 \times f_m$（偏心） | 全速域 |
| 摩擦力矩 | $1 \times f_m$ | 低速显著 |

其中 $f_e$ 为电气频率，$f_m$ 为机械转速频率。

### 5.2 转速纹波的特征频率分析 

对转速信号做 FFT 分析，可定位主要纹波频率：

- **$1 \times f_m$**：编码器偏心、轴承偏摆、摩擦力矩周期性
- **$N_{cog} \times f_m$**：齿槽转矩
- **$6 \times f_e$**：逆变器非线性（死区、管压降）+ 反电势5、7次谐波
- **$12 \times f_e$**：反电势11、13次谐波

**诊断方法：** 在目标转速下采集转速波形，做 FFT 分析，识别主要纹波频率分量，据此选择补偿策略。

### 5.3 重复控制（Repetitive Control） 

**原理：** 转速纹波具有周期性（周期 = 电气周期或机械周期），重复控制器利用内模原理，在控制环路中嵌入周期信号模型，实现对周期性扰动的稳态无差抑制。

**重复控制器结构：**

$$G_{RC}(z) = \frac{k_r \cdot z^{-N+L}}{1 - Q(z) \cdot z^{-N}}$$

其中：
- $N = f_s / f_{ripple}$ —— 一个纹波周期内的采样点数
- $k_r$ —— 重复控制增益（$0 < k_r < 2$）
- $L$ —— 相位补偿阶数（补偿控制环路延迟）
- $Q(z)$ —— 低通滤波器（提高鲁棒性，典型 $Q(z) = 0.95$ 或一阶低通）

**内模原理：** $1 - Q(z) \cdot z^{-N}$ 在 $z = e^{j2\pi k/N}$（$k = 0, 1, \ldots, N-1$）处提供无穷大增益，即对频率为 $f_{ripple}$ 整数倍的所有谐波分量实现零稳态误差。

```c
#define RC_N_MAX  512

typedef struct {
    int N;
    float kr;
    float Q;
    int L;
    float buffer[RC_N_MAX];
    int idx;
} repetitive_ctrl_t;

float repetitive_ctrl_update(repetitive_ctrl_t *rc, float error)
{
    int delayed_idx = (rc->idx - rc->N + rc->L + RC_N_MAX) % RC_N_MAX;
    float rc_output = rc->kr * rc->buffer[delayed_idx];

    int store_idx = (rc->idx - rc->N + RC_N_MAX) % RC_N_MAX;
    rc->buffer[rc->idx] = error + rc->Q * rc->buffer[store_idx];

    rc->idx = (rc->idx + 1) % rc->N;

    return rc_output;
}
```

**参数整定要点：**

| 参数 | 选取原则 | 典型值 |
|------|---------|--------|
| $N$ | $f_s / f_{ripple}$，需精确 | 由采样率和转速决定 |
| $k_r$ | 从小到大逐步增加，直到纹波抑制满意但不引起振荡 | $0.01 \sim 0.3$ |
| $Q(z)$ | $0.9 \sim 0.99$，越大稳态精度越高但鲁棒性越低 | $0.95$ |
| $L$ | 补偿控制环路总延迟的拍数 | $2 \sim 8$ |

**重复控制的局限：**
- $N$ 必须精确匹配纹波周期，转速变化时 $N$ 需实时更新
- 瞬态响应慢（需要至少一个纹波周期才能建立补偿）
- 与速度环 PI 控制器存在耦合，需仔细整定

### 5.4 自适应陷波滤波器 

**原理：** 对转速纹波的主频分量施加窄带阻滤波，等效于在转速环开环传递函数中引入深陷波，抑制特定频率的纹波。

**二阶陷波滤波器传递函数：**

$$G_{notch}(s) = \frac{s^2 + 2\zeta_2 \omega_n s + \omega_n^2}{s^2 + 2\zeta_1 \omega_n s + \omega_n^2}$$

其中 $\omega_n$ 为陷波中心频率，$\zeta_2 < \zeta_1$（$\zeta_2$ 控制陷波深度，$\zeta_1$ 控制陷波宽度）。

**自适应机制：** 陷波中心频率 $\omega_n$ 跟踪纹波频率，纹波频率随转速变化：

$$\omega_n = 6 \cdot \omega_e = 6 \cdot p \cdot \omega_m$$

```c
typedef struct {
    float zeta1;
    float zeta2;
    float x1;
    float x2;
    float Ts;
} notch_filter_t;

float notch_filter_update(notch_filter_t *nf, float input, float omega_n)
{
    float wn2 = omega_n * omega_n;
    float b0 = 4.0f + 2.0f * nf->zeta1 * omega_n * nf->Ts + wn2 * nf->Ts * nf->Ts;
    float b1 = 2.0f * wn2 * nf->Ts * nf->Ts - 8.0f;
    float b2 = 4.0f - 2.0f * nf->zeta1 * omega_n * nf->Ts + wn2 * nf->Ts * nf->Ts;
    float a0 = 4.0f + 2.0f * nf->zeta2 * omega_n * nf->Ts + wn2 * nf->Ts * nf->Ts;
    float a1 = b1;
    float a2 = 4.0f - 2.0f * nf->zeta2 * omega_n * nf->Ts + wn2 * nf->Ts * nf->Ts;

    float output = (a0 * input + a1 * nf->x1 + a2 * nf->x2 - b1 * nf->x1 - b2 * nf->x2) / b0;

    nf->x2 = nf->x1;
    nf->x1 = input;

    return output;
}
```

**陷波滤波器 vs 重复控制：**

| 维度 | 陷波滤波器 | 重复控制 |
|------|----------|---------|
| 抑制频带 | 窄带（单频点） | 宽带（基频+所有整数倍谐波） |
| 瞬态响应 | 快（几拍） | 慢（至少一个周期） |
| 计算量 |  |  |
| 参数敏感度 | 对 $\omega_n$ 精度敏感 | 对 $N$ 精度敏感 |
| 适用场景 | 单一主频纹波 | 多谐波纹波 |

### 5.5 基于扰动观测器的转速纹波抑制 

**原理：** 将转速纹波视为等效负载扰动，通过扰动观测器（DOB, Disturbance Observer）在线估计并前馈补偿。

**转速环扰动观测器：**

机械运动方程：

$$J\frac{d\omega_m}{dt} = T_e - T_L - T_{ripple} - B\omega_m$$

将纹波转矩 $T_{ripple}$ 与负载转矩 $T_L$ 合并为等效扰动 $T_d$：

$$J\frac{d\omega_m}{dt} = T_e - T_d - B\omega_m$$

扰动观测器：

$$\hat{T}_d = \frac{\omega_{DOB}}{s + \omega_{DOB}} \left( K_t i_q^* - J_n s \omega_m - B_n \omega_m \right)$$

其中 $J_n, B_n$ 为标称惯性和阻尼，$\omega_{DOB}$ 为观测器带宽，低通滤波器 $\frac{\omega_{DOB}}{s + \omega_{DOB}}$ 用于避免微分放大噪声。

**补偿输出：**

$$i_{q,comp} = i_q^* + \frac{\hat{T}_d}{K_t}$$

```c
typedef struct {
    float J_n;
    float B_n;
    float Kt;
    float omega_dob;
    float Ts;
    float Td_hat;
    float lpf_state;
} speed_dob_t;

float speed_dob_update(speed_dob_t *dob, float iq_cmd, float omega_m)
{
    float T_em = dob->Kt * iq_cmd;
    float T_accel_est = dob->J_n * (omega_m - dob->lpf_state) / dob->Ts;
    float T_d_raw = T_em - T_accel_est - dob->B_n * omega_m;

    float alpha = dob->omega_dob * dob->Ts / (1.0f + dob->omega_dob * dob->Ts);
    dob->Td_hat += alpha * (T_d_raw - dob->Td_hat);

    dob->lpf_state = omega_m;

    return dob->Td_hat / dob->Kt;
}
```

**DOB 带宽 $\omega_{DOB}$ 的选取：**
- 需覆盖纹波频率：$\omega_{DOB} \geq 2\pi \cdot f_{ripple,max}$
- 受限于速度环带宽和噪声：$\omega_{DOB} \leq \frac{1}{3}\omega_{speed\_loop}$
- 典型值：$50 \sim 500$ rad/s

---

## 6.  角度延迟补偿  

### 6.1 角度延迟的物理来源 

在数字控制系统中，从编码器读取角度到电流环执行输出之间存在不可忽略的时间差：

```text
时间轴：  ─────────────────────────────────────────→
          │←─Δt1─→│←──Δt2──→│←─Δt3─→│
          ADC采样   算法计算    PWM更新   下一拍ADC采样
          (t0)     (t0~t1)    (t1)      (t2)
```

**延迟分解：**

| 延迟环节 | 典型值 | 说明 |
|---------|--------|------|
| ADC 采样延迟 $\Delta t_1$ | $0.5 \sim 2\mu s$ | 触发到转换完成 |
| 算法计算延迟 $\Delta t_2$ | $5 \sim 20\mu s$ | FOC 全部计算（Clarke/Park/PI/SVPWM） |
| PWM 更新延迟 $\Delta t_3$ | $0 \sim T_{PWM}$ | 取决于更新时机（影子寄存器加载点） |
| **总延迟 $\Delta t$** | **$10 \sim 110\mu s$** | **$\Delta t = \Delta t_1 + \Delta t_2 + \Delta t_3$** |

### 6.2 角度误差分析 

延迟导致电流环使用的角度 $\theta_{used}$ 滞后于实际角度 $\theta_{actual}$：

$$\theta_{used} = \theta_{actual} - \Delta\theta$$

$$\Delta\theta = \omega_e \cdot \Delta t$$

**典型数值：**

| 转速 (rpm) | 电气频率 $f_e$ (Hz) | $\Delta t = 50\mu s$ 时 $\Delta\theta$ | $\Delta t = 100\mu s$ 时 $\Delta\theta$ |
|-----------|---------------------|--------------------------------------|---------------------------------------|
| 1,000 | 167 (4极) | 3.0° | 6.0° |
| 3,000 | 500 | 9.0° | 18.0° |
| 6,000 | 1,000 | 18.0° | 36.0° |
| 10,000 | 1,667 | 30.0° | 60.0° |

**角度误差的影响：**

$\Delta\theta$ 导致 dq 坐标系旋转偏差，使 d 轴和 q 轴之间产生交叉耦合：

$$\begin{bmatrix} v_d' \\ v_q' \end{bmatrix} = \begin{bmatrix} \cos\Delta\theta & \sin\Delta\theta \\ -\sin\Delta\theta & \cos\Delta\theta \end{bmatrix} \begin{bmatrix} v_d \\ v_q \end{bmatrix}$$

当 $\Delta\theta$ 较小时（$\Delta\theta < 10°$）：

- d 轴电流偏移：$\Delta i_d \approx i_q \cdot \Delta\theta$（q轴电流泄漏到d轴）
- q 轴电流损失：$\Delta i_q \approx -i_d \cdot \Delta\theta$（d轴电流泄漏到q轴）
- 等效于引入了 d-q 交叉耦合，削弱电流环解耦效果

当 $\Delta\theta > 15°$ 时，电流环性能严重退化，可能出现振荡。

### 6.3 补偿方法：角度预测 

**基本原理：** 基于当前转速预测下一拍的角度：

$$\theta_{pred} = \theta_{meas} + \omega_e \cdot \Delta t$$

其中 $\Delta t$ 为总延迟时间。

```c
typedef struct {
    float delta_t;
    float theta_comp;
} angle_delay_comp_t;

float angle_delay_compensate(angle_delay_comp_t *adc, float theta_meas, float omega_e)
{
    float theta_pred = theta_meas + omega_e * adc->delta_t;

    while (theta_pred > PI)  theta_pred -= 2.0f * PI;
    while (theta_pred < -PI) theta_pred += 2.0f * PI;

    adc->theta_comp = theta_pred;
    return theta_pred;
}
```

**延迟时间 $\Delta t$ 的精确确定：**

$\Delta t$ 不是简单的一拍延迟，需要根据实际控制时序精确计算：

```c
float calc_total_delay(float t_adc, float t_calc, float t_pwm_update,
                        float T_pwm, int pwm_update_mode)
{
    float delta_t = t_adc + t_calc;

    if (pwm_update_mode == PWM_UPDATE_AT_PEAK)
        delta_t += T_pwm / 2.0f;
    else if (pwm_update_mode == PWM_UPDATE_AT_PERIOD)
        delta_t += T_pwm;

    return delta_t;
}
```

**角度预测的改进——考虑加速度：**

若电机存在加速度（加减速过程），一阶预测有误差，可引入二阶预测：

$$\theta_{pred} = \theta_{meas} + \omega_e \cdot \Delta t + \frac{1}{2}\dot{\omega}_e \cdot \Delta t^2$$

其中 $\dot{\omega}_e$ 可由速度环 PI 输出估算：

$$\dot{\omega}_e \approx \frac{\omega_e[k] - \omega_e[k-1]}{T_s}$$

### 6.4 高速场景的特殊处理 

**角度预测误差对电流环稳定性的影响：**

角度预测误差 $\delta\theta = \theta_{actual} - \theta_{pred}$ 在高速时对电流环的影响呈非线性放大：

- 交叉耦合增益：$K_{cross} = \omega_e L \cdot \delta\theta$，高速时 $\omega_e$ 大，小角度误差即可产生显著耦合
- 电流环相位裕度降低：等效于在电流环中串联了一个相位滞后环节 $e^{-s\delta\theta/\omega_e}$

**高速场景的工程对策：**

1. **减小 $\Delta t$**：
   - 使用硬件 FOC 加速器（如 STM32 HRTIM、HPM 系列 PWM 协处理器）
   - 优化算法执行时间（定点化、查表替代三角函数）
   - PWM 更新模式从周期更新改为即时更新

2. **提高预测精度**：
   - 使用 PLL 观测器输出的平滑 $\omega_e$ 而非差分计算的 $\omega_e$
   - 考虑延迟随工况变化（如 PWM 更新时机随占空比变化）

3. **电流环增益调度**：
   - 高速时降低电流环增益，增大相位裕度
   - 引入交叉解耦项补偿角度误差引起的 d-q 耦合

```c
void current_loop_decoupling_with_angle_err(float *vd, float *vq,
                                             float id, float iq,
                                             float omega_e,
                                             float Ld, float Lq,
                                             float delta_theta)
{
    float cos_dt = cosf(delta_theta);
    float sin_dt = sinf(delta_theta);

    float vd_decoup = *vd - omega_e * Lq * iq;
    float vq_decoup = *vq + omega_e * Ld * id;

    *vd = cos_dt * vd_decoup + sin_dt * vq_decoup;
    *vq = -sin_dt * vd_decoup + cos_dt * vq_decoup;
}
```

4. **多步预测**（超高速场景）：
   - 当 $\Delta\theta > 30°$ 时，单步预测精度不足
   - 可使用多步预测 + 电流环前馈，在预测角度处施加正确的电压矢量

---

## 7.  交叉视角 

### 7.1 与 HW-05（功率器件）的关联

死区时间的下限由功率器件的关断特性决定（详见 [HW-05 功率器件与栅极驱动](../hardware/HW-05-Power-Devices-Gate-Drivers.md)）。SiC/GaN 器件的快速开关特性使死区可缩短至百纳秒级，从源头减小死区补偿需求。温度对器件开关速度的影响也需在补偿算法中考虑。

### 7.2 与 ALG-04（死区补偿）的关联

ALG-04 建立了死区补偿的理论基础（电压误差模型、电流过零钳位、基础补偿方法），本模块在此基础上深化：模糊区域处理（3.1节）、自适应观测器（3.2节）、稳定性分析（3.3节）和工程方法对比（3.4节）。两者构成"原理→工程"的完整知识链。

### 7.3 与 ALG-14（THD 谐波分析）的关联

死区效应是电流 THD 的主要贡献者之一，其特征谐波为 $6f_e$。ALG-14 提供了 THD 的分析框架和频域工具，本模块的补偿效果可通过 ALG-14 的方法量化评估。齿槽转矩引起的转速纹波也可通过 THD 分析定位主导谐波阶次。

### 7.4 与 ALG-12（速度环）的关联

转速纹波补偿（第5节）直接作用于速度环，重复控制器和自适应陷波滤波器是速度环的附加补偿环节。补偿参数的整定需与速度环 PI 参数协调，避免相互干扰。扰动观测器的带宽需低于速度环带宽。

### 7.5 与 ALG-06（位置速度观测器）的关联

角度延迟补偿（第6节）中的 $\omega_e$ 来源直接影响预测精度。ALG-06 中的 PLL 观测器提供平滑的 $\omega_e$ 估计，比差分法更适合角度预测。无感场景下角度观测器本身的延迟也需纳入 $\Delta t$ 计算。

### 7.6 与 ADV-HW-03（编码器测速）的关联

编码器分辨率和测速方法（M法、T法、M/T法）影响角度和速度的测量精度，进而影响角度延迟补偿和转速纹波补偿的效果。编码器偏心引起的 $1 \times f_m$ 转速纹波是第5节的重要纹波源。详见 [ADV-HW-03 编码器与测速](../advanced/hardware-algorithm-bridge/ADV-HW-03-Encoder-Speed.md)。

**交叉关系图：**

```text
                    HW-05 功率器件
                    (死区时间下限)
                         │
                         ▼
  ALG-04 死区原理 ←── ALG-18 补偿算法 ──→ ALG-14 THD分析
                         │    (本模块)          (补偿效果量化)
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    ALG-12 速度环   ALG-06 观测器   ADV-HW-03 编码器
   (纹波补偿接入)  (角度预测ω_e)   (角度/速度精度)
```

---

## 8.  工程案例与实践练习 

### 8.1 工程案例：工业伺服驱动器的多层补偿策略

**场景：** 某 400W PMSM 伺服电机（8极12槽），额定转速 3000rpm，要求转速波动 < 0.1%。

**问题分析：**

1. 低速（< 100rpm）时齿槽转矩导致明显位置抖动
2. 中速（500~1500rpm）时死区效应导致电流 THD 偏高
3. 高速（> 2500rpm）时角度延迟导致 d 轴电流偏移

**补偿方案：**

| 工况 | 主导问题 | 补偿策略 | 实现方式 |
|------|---------|---------|---------|
| < 100rpm | 齿槽转矩 | 前馈查表 + 自适应更新 | 上电标定 + 运行时 RLS 微调 |
| 100~1500rpm | 死区效应 | 电压误差观测器 | dq 坐标系扰动观测器 |
| > 2500rpm | 角度延迟 | 角度预测 + 交叉解耦 | PLL ω_e + 二阶预测 |
| 全速域 | 6f_e 纹波 | 自适应陷波滤波器 | 中心频率跟踪 6ω_e |

**效果：**

- 低速位置抖动：从 $\pm 0.5°$ 降至 $\pm 0.05°$
- 中速电流 THD：从 12% 降至 4%
- 高速 d 轴电流偏移：从 1.2A 降至 0.15A
- 转速波动：全速域 < 0.08%

### 8.2 工程案例：云台电机的齿槽转矩补偿

**场景：** 某无刷云台电机（14极12槽），要求在 $0.1°$ 步进时平稳无抖动。

**挑战：** 齿槽转矩占比大（约 8% 额定转矩），低速轻载时齿槽转矩是转矩脉动的绝对主导因素。

**方案：** ODrive 式 Anti-cogging 标定 + 运行时自适应微调

1. 标定阶段：以 $0.05$ rad/s 极慢速旋转，记录 720 点齿槽转矩表
2. 运行阶段：查表前馈 + 速度误差驱动的谐波系数在线更新
3. 效果：$0.1°$ 步进响应平稳，无可见抖动

### 8.3 实践练习

**练习 1：死区补偿模糊区域实验 **

给定条件：$V_{dc} = 48V$, $T_{dead} = 1\mu s$, $f_{PWM} = 20kHz$, 电流测量噪声 $\sigma = 30mA$

1. 计算死区电压误差 $\Delta V$
2. 设计滞环比较器的阈值 $i_{hyst}$（要求误判概率 < 0.3%）
3. 分别用滞环法、线性过渡法、Sigmoid 法实现补偿，对比电流过零点波形

**练习 2：齿槽转矩前馈补偿设计 **

给定条件：12槽10极 PMSM，齿槽转矩以 60 次/转为基频，前 3 阶谐波幅值分别为 $T_1 = 0.05Nm$, $T_2 = 0.02Nm$, $T_3 = 0.008Nm$，$K_t = 0.1 Nm/A$

1. 计算齿槽转矩的傅里叶级数表达式
2. 设计 360 点前馈补偿表
3. 分析温度变化 $\pm 20\%$ 时补偿效果的退化程度

**练习 3：角度延迟补偿计算 **

给定条件：4极 PMSM，$f_s = 10kHz$，ADC 延迟 $1\mu s$，算法计算 $15\mu s$，PWM 周期更新模式

1. 计算总延迟 $\Delta t$
2. 计算在 3000rpm 和 6000rpm 时的角度误差 $\Delta\theta$
3. 评估角度误差对 d 轴电流的影响（设 $i_q = 5A$）
4. 设计角度预测补偿，计算补偿后的残余角度误差

**练习 4：重复控制器设计 **

给定条件：转速纹波主频为 $6f_e$，电机 4 极，目标转速 1500rpm，$f_s = 10kHz$

1. 计算纹波频率和重复控制器的 $N$ 值
2. 设计 $k_r, Q(z), L$ 参数
3. 分析转速从 1500rpm 变化到 1600rpm 时 $N$ 值的变化，讨论实时更新策略
4. 用 Simulink 或 C 仿真验证重复控制器的纹波抑制效果

**练习 5：综合补偿系统设计 **

给定条件：某 200W 8极 PMSM，额定转速 4000rpm，要求全速域转速波动 < 0.2%

1. 分析各速域的主要纹波来源
2. 设计分层补偿架构，选择各层补偿方法
3. 分析各补偿环节之间的相互影响
4. 给出参数整定顺序和注意事项

---

> **仿真验证：** 本模块的补偿算法可在 [C 语言仿真](../simulation/SIM-00-C-Simulation-Overview.md) 中验证。对应仿真模式：MODE_SELECT_INVERTER_NONLINEARITY_SENSORLESS (49)，可对比开启/关闭各补偿环节时的电流波形、转矩纹波和转速波动。

> **前置模块：** [ALG-04 死区补偿策略](./ALG-04-Deadtime-Compensation.md) | [ALG-06 位置速度观测器](./ALG-06-Position-Speed-Observer.md) | [ALG-12 速度环与转矩观测器](./ALG-12-Speed-Loop-Torque-Observer.md) | [ALG-14 THD 谐波分析](./ALG-14-THD-Harmonic-Analysis.md)

>  检验你的理解：[ALG-18 检验题目](./ALG-18-assessment.md)
