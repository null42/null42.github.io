---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-04: 摩擦与重力补偿"
tags:
  - motor-control
status: learning
summary: '**副标题：摩擦让低速爬行、重力让竖直轴偏移——Stribeck曲线揭示的摩擦本质和重力矩的三角函数依赖，是伺服精度从"微米级"迈向"亚微米级"必须跨越的鸿沟** **难度：**  专业级 **适用对象：** 伺服控制工程师、机器人控制开发者、精密运动控制工程师 **前置知识：** 前馈控制原理（CT-06）'
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-04: 摩擦与重力补偿

**副标题：摩擦让低速爬行、重力让竖直轴偏移——Stribeck曲线揭示的摩擦本质和重力矩的三角函数依赖，是伺服精度从"微米级"迈向"亚微米级"必须跨越的鸿沟**
- **难度：**  专业级
- **适用对象：** 伺服控制工程师、机器人控制开发者、精密运动控制工程师
- **前置知识：** 前馈控制原理（CT-06）、位置环设计（MC-MC-01）、补偿算法（ALG-18）

---

## 1.  核心摘要

摩擦和重力是运动控制系统中最主要的两种非线性扰动。摩擦力在低速时表现为Stribeck效应——静摩擦力大于动摩擦力，导致"粘-滑"（stick-slip）现象和极限环振荡；重力对竖直轴产生与位置相关的偏置力矩 $\tau_g = mgl\sin\theta$，导致位置环稳态偏差。两者的共同特点是：**纯反馈控制（PI/PID）无法有效抑制，因为积分项响应太慢，而增大增益又引发稳定性问题**。工程解决方案是前馈补偿：离线测量摩擦力-速度映射表和重力-位置映射表，在线查表输出补偿力矩。高级方案采用LuGre动态摩擦模型进行自适应补偿，以及递归Newton-Euler算法计算多自由度机器人的重力矩。核心原则是：**先测量，后补偿；先稳态，后动态；先单轴，后多轴**。

---

## 2.  问题引入

### 工程师的真实困惑

**场景1：低速爬行——"走走停停"**
```text
工程师A："伺服电机低速跟踪正弦波，速度过零时
       电机'卡顿'一下再走，位置波形出现台阶..."
问题现象:
- 高速（>100rpm）：跟踪平滑
- 低速（<10rpm）：速度过零附近位置有台阶
- 速度波形在零附近有'死区'
根因：静摩擦力 > 动摩擦力（Stribeck效应）
      电机先'粘住'，积累足够力矩后'滑出'
      → stick-slip → 低速爬行
```

**场景2：竖直轴定位偏差**
```text
工程师B："竖直安装的丝杠轴，向上定位偏差+0.3mm，
       向下定位偏差-0.2mm，同一位置来回偏差不同..."
问题现象:
- 向上运动到位：正偏差
- 向下运动到位：负偏差
- 静态保持时：缓慢下滑（重力克服不了摩擦）
根因：重力矩 τ_g = mgl·sin(θ) 未补偿
      向上：摩擦力+重力同向→偏差大
      向下：摩擦力+重力反向→偏差小
```

**场景3：机器人关节位置漂移**
```text
工程师C："6轴机器人不同姿态下，关节2和关节3
       的位置偏差从0.01°变到0.5°..."
问题现象:
- 水平伸展：关节2偏差0.5°
- 竖直收缩：关节2偏差0.01°
- 负载加重后偏差更大
根因：重力矩随姿态变化，固定补偿不够
      需要基于运动学的实时重力计算
```

### 核心问题

- 摩擦力的本质是什么？→ Stribeck模型四段特性
- 摩擦如何影响控制性能？→ 死区、stick-slip、极限环
- 重力矩怎么计算？→ 单轴简单、多轴需递归Newton-Euler
- 补偿方法怎么选？→ 查表法 vs 模型法 vs 自适应法
- 补偿精度怎么验证？→ 跟踪误差、极限环、重复定位精度

---

## 3.  原理推导

### 3.1 Stribeck摩擦模型

完整的摩擦力-速度关系（Stribeck模型）：

$$F_f(\dot{x}) = \begin{cases} F_s \cdot \text{sign}(F_{ext}) & \dot{x} = 0 \text{ 且 } |F_{ext}| < F_s \\ F_{ext} & \dot{x} = 0 \text{ 且 } |F_{ext}| \geq F_s \\ [F_c + (F_s - F_c) \cdot e^{-(\dot{x}/\dot{x}_s)^2}] \cdot \text{sign}(\dot{x}) + \sigma_v \dot{x} & \dot{x} \neq 0 \end{cases}$$

其中：
- $F_s$：静摩擦力（static friction）
- $F_c$：库仑摩擦力（Coulomb friction）
- $\dot{x}_s$：Stribeck速度（临界速度）
- $\sigma_v$：粘性摩擦系数（viscous friction）

**Stribeck曲线四段**：

```text
F_f ↑
Fs ─●                          静摩擦区
    |  ╲
    |   ╲  Stribeck区
Fc ─|────●────────────────── 库仑摩擦区
    |      ╲
    |       ╲  ╱  粘性摩擦区（斜率=σv）
    |        ╱
    └──────────────────────→ ẋ
       0    ẋs
```

**关键特征**：
1. **静摩擦 > 动摩擦**：$F_s > F_c$，这是stick-slip的根源
2. **Stribeck区域**：速度从零增加时摩擦力先降后升，呈负斜率
3. **负斜率不稳定**：Stribeck区的负阻尼特性导致低速不稳定
4. **粘性摩擦**：高速时摩擦力与速度成正比

### 3.2 摩擦对位置环的影响分析

考虑含摩擦力的位置环：

$$J\ddot{\theta} + F_f(\dot{\theta}) = K_t I_q$$

**低速跟踪时的stick-slip**：

当速度接近零时，摩擦力从 $F_s$ 突变到 $F_c$，等效为：

$$\Delta F = F_s - F_c > 0$$

这个力矩突变导致加速度突变：

$$\Delta\ddot{\theta} = \frac{\Delta F}{J}$$

在位置环P控制下，速度过零时的行为：
1. 速度从正趋近零→摩擦力从 $F_c$ 跳到 $F_s$→制动力矩突增
2. 电机"粘住"→位置误差累积→P控制器输出增大
3. 电机力矩超过 $F_s$→突然"滑出"→速度跳变
4. 速度再次趋近零→重复上述过程

**极限环分析**：

在P+I位置环中，摩擦力会导致极限环振荡。设位置环输出为 $\tau = K_p e + K_i \int e \, dt$，当 $e$ 很小时：

- 电机静止（$|K_p e| < F_s$）：积分项累积
- 积分输出超过 $F_s$：电机突然运动
- 运动后摩擦降为 $F_c$：电机加速过头
- 位置超调→误差反向→积分减小→电机减速→再次粘住

极限环的幅值近似为：

$$A_{limit} \approx \frac{F_s - F_c}{K_p}$$

### 3.3 重力矩计算

**单轴竖直运动**：

重力矩为：
$$\tau_g(\theta) = m \cdot g \cdot l \cdot \sin(\theta)$$

其中：
- $m$：负载质量 [kg]
- $g$：重力加速度 9.81 [m/s²]
- $l$：质心到旋转中心的距离 [m]
- $\theta$：轴角度 [rad]

**丝杠直线轴**：

$$F_g = m \cdot g$$

折算到电机侧：
$$\tau_g = \frac{F_g \cdot L}{2\pi \cdot \eta} = \frac{m \cdot g \cdot L}{2\pi \cdot \eta}$$

其中 $L$ 为丝杠导程 [m/rev]，$\eta$ 为传动效率。

**多轴机器人**：

对于n自由度机器人，关节 $i$ 的重力矩需要通过递归Newton-Euler算法计算：

$$\tau_{g,i} = \sum_{j=i}^{n} m_j \cdot g \cdot \frac{\partial \mathbf{p}_j}{\partial q_i}$$

其中 $\mathbf{p}_j$ 为连杆 $j$ 的质心位置，$q_i$ 为关节 $i$ 的角度。

### 3.4 摩擦前馈补偿

摩擦前馈补偿的核心思想：根据当前速度，从摩擦模型/查表中获取摩擦力矩，叠加到电流环给定端：

$$I_{q,ff} = \frac{F_f(\dot{\theta}) + \tau_g(\theta)}{K_t}$$

**补偿后的位置环误差**：

无补偿时：$e_{ss} = (F_f + \tau_g) / (K_p \cdot K_t)$

有补偿时（补偿精度 $\alpha$）：$e_{ss} = (1-\alpha)(F_f + \tau_g) / (K_p \cdot K_t)$

当 $\alpha = 0.9$（90%补偿精度）时，稳态误差减小10倍。

### 3.5 LuGre动态摩擦模型

静态Stribeck模型无法描述摩擦的动态行为（pre-sliding displacement、friction lag）。LuGre模型引入内部状态变量 $z$（bristle deflection）：

$$\dot{z} = \dot{x} - \frac{|\dot{x}|}{g(\dot{x})} z$$

$$F_f = \sigma_0 z + \sigma_1 \dot{z} + \sigma_2 \dot{x}$$

其中：
$$g(\dot{x}) = F_c + (F_s - F_c) e^{-(\dot{x}/\dot{x}_s)^2}$$

- $\sigma_0$：bristle刚度
- $\sigma_1$：bristle阻尼
- $\sigma_2$：粘性摩擦系数

LuGre模型能描述：
- **Pre-sliding**：位移很小但未完全滑动（$z$ 较小）
- **Friction lag**：摩擦力变化滞后于速度变化
- **Break-away**：从静止到滑动的过渡

---

## 4.  工程实现

### 4.1 摩擦力查表补偿

```c
/**
 * @brief 摩擦力查表补偿
 * @note  离线测量不同速度下的摩擦力矩，存储为查找表
 *        在线根据当前速度查表获取补偿力矩
 */

/* 摩擦力查表项 */
typedef struct {
    float speed;        /* 速度 [rad/s] */
    float torque;       /* 摩擦力矩 [Nm] */
} FrictionTableEntry_t;

/* 摩擦补偿器 */
typedef struct {
    FrictionTableEntry_t *table;    /* 查表数据 */
    int table_size;                 /* 表项数 */
    float speed_max;                /* 最大速度 [rad/s] */
    float dead_zone;                /* 速度死区 [rad/s] */
    float Kt;                       /* 转矩常数 [Nm/A] */
} FrictionComp_t;

/**
 * @brief 摩擦力矩查表（线性插值）
 * @param comp   摩擦补偿器
 * @param speed  当前速度 [rad/s]
 * @retval 摩擦补偿电流 [A]
 */
float FrictionComp_Lookup(FrictionComp_t *comp, float speed)
{
    float abs_speed;
    float friction_torque;
    float friction_current;
    int idx;
    float ratio;

    abs_speed = fabsf(speed);

    /* 速度死区处理 */
    if (abs_speed < comp->dead_zone) {
        /* 在死区内：使用静摩擦力的一半（保守估计） */
        friction_torque = comp->table[0].torque * 0.5f;
    } else {
        /* 查找速度所在的区间 */
        idx = 0;
        while (idx < comp->table_size - 1 &&
               abs_speed > comp->table[idx + 1].speed) {
            idx++;
        }

        /* 线性插值 */
        if (idx < comp->table_size - 1) {
            ratio = (abs_speed - comp->table[idx].speed) /
                    (comp->table[idx + 1].speed - comp->table[idx].speed);
            friction_torque = comp->table[idx].torque +
                              ratio * (comp->table[idx + 1].torque -
                                       comp->table[idx].torque);
        } else {
            /* 超出表范围：使用最后一项 + 粘性摩擦外推 */
            float excess_speed = abs_speed - comp->table[comp->table_size - 1].speed;
            friction_torque = comp->table[comp->table_size - 1].torque +
                              0.01f * excess_speed; /* 粘性摩擦系数估计 */
        }
    }

    /* 方向处理 */
    if (speed < 0.0f) {
        friction_torque = -friction_torque;
    }

    /* 转换为电流 */
    friction_current = friction_torque / comp->Kt;

    return friction_current;
}
```

### 4.2 重力补偿

```c
/**
 * @brief 单轴重力补偿
 * @note  适用于竖直安装的旋转轴
 */
typedef struct {
    float mass;         /* 负载质量 [kg] */
    float gravity;      /* 重力加速度 [m/s²] */
    float arm_length;   /* 质心到旋转中心距离 [m] */
    float Kt;           /* 转矩常数 [Nm/A] */
    float gear_ratio;   /* 减速比 */
} GravityComp_t;

/**
 * @brief 计算重力补偿电流
 * @param comp    重力补偿器
 * @param angle   当前角度 [rad]
 * @retval 重力补偿电流 [A]
 */
float GravityComp_Calculate(GravityComp_t *comp, float angle)
{
    float gravity_torque;
    float gravity_current;

    /* 重力矩 = m * g * l * sin(θ) */
    gravity_torque = comp->mass * comp->gravity * comp->arm_length *
                     sinf(angle);

    /* 折算到电机侧 */
    gravity_torque /= comp->gear_ratio;

    /* 转换为电流 */
    gravity_current = gravity_torque / comp->Kt;

    return gravity_current;
}
```

### 4.3 丝杠轴重力补偿

```c
/**
 * @brief 丝杠竖直轴重力补偿
 * @param mass       负载质量 [kg]
 * @param lead       丝杠导程 [m/rev]
 * @param gear_ratio 减速比
 * @param efficiency 传动效率
 * @param Kt         转矩常数 [Nm/A]
 * @retval 重力补偿电流 [A]
 */
float GravityComp_BallScrew(float mass, float lead, float gear_ratio,
                             float efficiency, float Kt)
{
    float gravity_force;
    float gravity_torque;
    float gravity_current;

    /* 重力 = m * g */
    gravity_force = mass * 9.81f;

    /* 折算到电机侧：τ = F * L / (2π * η * i) */
    gravity_torque = gravity_force * lead /
                     (2.0f * PI * efficiency * gear_ratio);

    /* 转换为电流 */
    gravity_current = gravity_torque / Kt;

    return gravity_current;
}
```

### 4.4 摩擦力离线测量流程

```c
/**
 * @brief 摩擦力离线测量
 * @note  在调试阶段运行，测量不同速度下的摩擦力矩
 *        测量方法：恒速运行→记录稳态电流→计算摩擦力矩
 *
 * 步骤：
 * 1. 逐步给定不同速度（从低速到高速）
 * 2. 每个速度等待稳态（速度和电流稳定）
 * 3. 记录稳态Iq电流
 * 4. 摩擦力矩 = Iq_steady * Kt
 * 5. 正反方向各测一次
 */
typedef struct {
    float speed;        /* 测量速度 [rad/s] */
    float Iq_pos;       /* 正向稳态电流 [A] */
    float Iq_neg;       /* 反向稳态电流 [A] */
    float torque_pos;   /* 正向摩擦力矩 [Nm] */
    float torque_neg;   /* 反向摩擦力矩 [Nm] */
} FrictionMeasure_t;

/**
 * @brief 执行摩擦力测量
 * @param speeds     测量速度数组 [rad/s]
 * @param num_points 测量点数
 * @param Kt         转矩常数 [Nm/A]
 * @param results    测量结果数组
 */
void FrictionMeasure_Execute(const float *speeds, int num_points,
                              float Kt, FrictionMeasure_t *results)
{
    int i;

    for (i = 0; i < num_points; i++) {
        float Iq_steady;

        /* 1. 设置正向速度给定 */
        SpeedLoop_SetReference(speeds[i]);

        /* 2. 等待稳态（实际工程中用定时器或稳定判据） */
        /* WaitUntilSteady(); */

        /* 3. 记录稳态Iq */
        /* Iq_steady = GetCurrentIq(); */
        results[i].speed = speeds[i];
        results[i].Iq_pos = Iq_steady;
        results[i].torque_pos = Iq_steady * Kt;

        /* 4. 反向测量 */
        SpeedLoop_SetReference(-speeds[i]);
        /* WaitUntilSteady(); */
        /* Iq_steady = GetCurrentIq(); */
        results[i].Iq_neg = Iq_steady;
        results[i].torque_neg = Iq_steady * Kt;
    }
}
```

### 4.5 摩擦+重力补偿集成到伺服控制

```c
/**
 * @brief 带摩擦+重力补偿的电流前馈
 * @note  补偿电流叠加到速度环输出（Iq给定端）
 */
float DisturbanceComp_Calculate(DisturbanceComp_t *comp,
                                 float speed, float angle)
{
    float friction_current;
    float gravity_current;
    float total_compensation;

    /* 1. 摩擦补偿 */
    friction_current = FrictionComp_Lookup(&comp->friction, speed);

    /* 2. 重力补偿 */
    gravity_current = GravityComp_Calculate(&comp->gravity, angle);

    /* 3. 总补偿电流 */
    total_compensation = friction_current + gravity_current;

    /* 4. 补偿限幅（防止补偿过大） */
    total_compensation = CLAMP(total_compensation,
                                -comp->comp_limit, comp->comp_limit);

    return total_compensation;
}
```

---

## 5.  参数整定与调试指南

### 5.1 摩擦力测量步骤

```text
步骤1：确认机械系统安装完毕，润滑到位
步骤2：速度环和位置环已调好（无补偿时基本稳定）
步骤3：设置测量速度点（对数分布）
       - 低速：1, 2, 5, 10 rpm
       - 中速：20, 50, 100 rpm
       - 高速：200, 500, 1000 rpm
步骤4：每个速度点正向运行5秒，记录稳态Iq
步骤5：每个速度点反向运行5秒，记录稳态Iq
步骤6：计算摩擦力矩 τ_f = Iq × Kt
步骤7：绘制摩擦力-速度曲线
步骤8：拟合Stribeck模型参数
```

### 5.2 Stribeck参数拟合

从测量数据拟合Stribeck模型参数：

$$F_f(\dot{x}) = [F_c + (F_s - F_c) \cdot e^{-(\dot{x}/\dot{x}_s)^2}] \cdot \text{sign}(\dot{x}) + \sigma_v \dot{x}$$

**拟合方法**：
1. 高速段线性拟合→得到 $\sigma_v$ 和 $F_c$
2. 低速段数据→拟合 $F_s$ 和 $\dot{x}_s$
3. 验证：用拟合模型预测中间速度的摩擦力，与实测对比

### 5.3 重力补偿参数标定

**方法1：直接计算**
```text
已知参数：质量m、臂长l、减速比、Kt
直接计算：τ_g = mgl·sin(θ) / (gear_ratio × Kt)
优点：简单
缺点：参数不准（质量估计偏差、质心位置偏差）
```

**方法2：电流测量法**
```text
1. 竖直轴不同角度θ下保持静止
2. 记录保持电流Iq_hold
3. 重力补偿电流 = Iq_hold
4. 拟合 Iq_hold(θ) 曲线
优点：精确（包含了所有实际因素）
缺点：需要逐角度测量
```

**方法3：自适应标定**
```text
1. 初始用方法1的粗略估计
2. 运行过程中记录位置环积分项
3. 积分项的稳态值 ≈ 未补偿的重力矩
4. 在线更新重力补偿参数
优点：自动适应负载变化
缺点：收敛速度慢
```

### 5.4 补偿效果验证

| 指标 | 无补偿 | +摩擦补偿 | +摩擦+重力补偿 |
|------|--------|----------|--------------|
| 低速stick-slip | 明显 | 消除 | 消除 |
| 竖直轴定位偏差 | 0.3mm | 0.3mm（重力未补偿） | <0.02mm |
| 正反向定位差异 | 0.5mm | 0.1mm | <0.02mm |
| 极限环 | 存在 | 消除 | 消除 |
| 重复定位精度 | ±0.1mm | ±0.05mm | ±0.01mm |

### 5.5 常见问题与对策

| 问题 | 原因 | 对策 |
|------|------|------|
| 补偿后仍有stick-slip | 摩擦表分辨率不够 | 增加低速段测量点 |
| 补偿后位置超调 | 补偿过大（过补偿） | 减小补偿增益到0.8~0.9 |
| 重力补偿随温度变化 | 润滑油粘度变化 | 温度补偿或定期标定 |
| 正反向补偿不对称 | 机械结构非对称 | 正反向分别建表 |
| 补偿后低速震荡 | 死区处理不当 | 调整死区宽度或用平滑过渡 |

---

## 6.  硬件约束

### 6.1 编码器分辨率对摩擦补偿的影响

摩擦补偿需要精确的速度信号来查表。编码器分辨率不足时，低速段的速度估计噪声大：

$$\Delta\omega_{min} = \frac{2\pi}{N_{ppr} \times 4 \times T_{speed}}$$

其中 $T_{speed}$ 为速度计算的时间窗口。

**建议**：摩擦补偿需要至少17位（131072 counts/rev）的编码器分辨率。

### 6.2 电流环分辨率

摩擦补偿电流通常很小（额定电流的1~5%），如果电流环的DAC分辨率不足：

$$\Delta I_{LSB} = \frac{I_{rated}}{2^{N_{DAC}}}$$

12位DAC、20A满量程：$\Delta I_{LSB} = 0.0049A$，对应0.1Nm级力矩（Kt=0.02Nm/A时为0.0001Nm），通常足够。

### 6.3 温度对摩擦的影响

| 温度变化 | 摩擦力变化 | 原因 |
|---------|-----------|------|
| -20°C → +20°C | +30~50% | 润滑油粘度增大 |
| +20°C → +60°C | -10~20% | 润滑油粘度降低 |
| 长时间运行后 | -5~10% | 润滑油分布均匀 |

**对策**：
- 关键应用：温度传感器 + 摩擦表温度补偿
- 一般应用：定期（每季度）重新标定摩擦表

---

## 7.  交叉引用

| 模块 | 关联说明 |
|------|---------|
| [CT-06 前馈控制](../control-theory/CT-06-Feedforward-Control.md) | 摩擦和重力补偿本质上是前馈控制的应用 |
| [ALG-18 补偿算法](../algorithm/ALG-18-Compensation-Algorithms.md) | 通用补偿算法框架 |
| [MC-MC-01 位置环设计](./MC-MC-01-Position-Loop.md) | 摩擦和重力导致位置环稳态偏差 |
| [MC-MC-02 速度与加速度前馈](./MC-MC-02-Feedforward.md) | 摩擦/重力补偿与前馈控制配合使用 |
| [ADV-ALG-13 PID结构优化](../advanced/algorithm/ADV-ALG-13-PID-Structure-Tuning.md) | 积分饱和与摩擦极限环的关系 |
| [HW-03 位置传感器](../hardware/HW-03-Position-Sensor.md) | 编码器分辨率对摩擦补偿精度的影响 |

---

## 8.  参考文献

1. Armstrong-Hélouvry, B. *Control of Machines with Friction*, Springer, 1991. — 摩擦建模与补偿的经典著作
2. Canudas de Wit, C. et al. "A New Model for Control of Systems with Friction", *IEEE Trans. Automatic Control*, 1995. — LuGre模型的原始论文
3. Olsson, H. et al. "Friction Models and Friction Compensation", *European Journal of Control*, 1998. — 摩擦模型综述
4. Craig, J.J. *Introduction to Robotics: Mechanics and Control*, 4th Edition, Pearson, 2018. — 递归Newton-Euler算法
5. Siemens SINUMERIK 840D sl — 摩擦补偿功能说明
6. 王成元等. *现代电机控制技术*, 机械工业出版社, 2014. — 摩擦补偿的工程方法

---

##  版本信息

- 模块编号：MC-MC-04
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
