---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-MC-05: 电子齿轮与凸轮"
tags:
  - motor-control
status: learning
summary: "**副标题：机械齿轮用齿数比锁定主从关系，电子齿轮用分数乘法实现同样的同步——而电子凸轮更进一步，用查表插值让从轴跟随任意非线性曲线，这是包装、印刷、纺织行业的运动控制灵魂** **难度：**  进阶级 **适用对象：** 伺服应用工程师、包装/印刷/纺织行业运动控制开发者 **前置知识：** 位置环设计（M"
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-MC-05: 电子齿轮与凸轮

**副标题：机械齿轮用齿数比锁定主从关系，电子齿轮用分数乘法实现同样的同步——而电子凸轮更进一步，用查表插值让从轴跟随任意非线性曲线，这是包装、印刷、纺织行业的运动控制灵魂**
- **难度：**  进阶级
- **适用对象：** 伺服应用工程师、包装/印刷/纺织行业运动控制开发者
- **前置知识：** 位置环设计（MC-MC-01）、有传感器FOC（ALG-05）

---

## 1.  核心摘要

电子齿轮（Electronic Gearing）和电子凸轮（Electronic Cam）是实现多轴同步运动的核心技术。电子齿轮让从轴以固定齿轮比跟随主轴运动：$\theta_{slave} = K_{gear} \cdot \theta_{master}$，齿轮比 $K_{gear}$ 可以是任意分数（如7/3），突破了机械齿轮的齿数限制。电子凸轮则更进一步，用凸轮表（cam table）定义主轴位置到从轴位置的非线性映射关系，实现任意曲线的同步。两者的共同架构是：主轴编码器→位置转换→从轴位置给定→位置环跟踪。电子齿轮适用于固定速比同步（如双驱龙门、传送带同步），电子凸轮适用于变比同步（如包装切刀、印刷套色）。注册校正（Registration）是电子凸轮的高级功能，通过传感器输入实时修正相位偏差，实现飞行中的精确对位。

---

## 2.  问题引入

### 工程师的真实困惑

**场景1：双驱龙门不同步**
```text
工程师A："龙门两侧电机用机械刚性连接太贵了，
       改用电子齿轮同步，但两轴总有几度的相位差..."
问题现象:
- 静态：两轴位置一致
- 运动：从轴滞后主轴约2°
- 加速时：滞后增大到5°
根因：电子齿轮比正确，但从轴位置环跟踪延迟
      → 需要前馈补偿或更高带宽的位置环
```

**场景2：包装切刀切不准**
```text
工程师B："包装机切刀跟随传送带运动，
       但切出来的位置总是偏几毫米..."
问题现象:
- 低速：切口位置准确
- 高速：切口偏移3~5mm
- 每次启动后偏移量不同
根因：电子凸轮的相位未校准
      → 需要注册传感器校正相位
```

**场景3：分数齿轮比实现困难**
```text
工程师C："主轴和从轴的齿轮比是7:3，
       用整数计数总是有累积误差..."
问题现象:
- 齿轮比7/3 = 2.333...
- 浮点数计算有精度损失
- 长时间运行后位置漂移
根因：浮点数累积误差
      → 需要用分数表示或高精度定点数
```

### 核心问题

- 电子齿轮的齿轮比怎么精确实现？→ 分数表示与定点数运算
- 电子凸轮的凸轮表怎么设计？→ 多项式插值与平滑过渡
- 主从同步的延迟怎么消除？→ 前馈+高带宽位置环
- 注册校正怎么实现？→ 传感器触发+相位修正
- 电子齿轮和电子凸轮怎么选？→ 固定比用齿轮，变比用凸轮

---

## 3.  原理推导

### 3.1 电子齿轮——数学模型

电子齿轮的核心关系：

$$\theta_{slave} = K_{gear} \cdot \theta_{master}$$

其中齿轮比 $K_{gear}$ 可以是任意分数：

$$K_{gear} = \frac{N_{slave}}{N_{master}} = \frac{\text{从轴转数}}{\text{主轴转数}}$$

**速度关系**：

$$\dot{\theta}_{slave} = K_{gear} \cdot \dot{\theta}_{master}$$

**加速度关系**：

$$\ddot{\theta}_{slave} = K_{gear} \cdot \ddot{\theta}_{master}$$

**相位同步**：

不仅要满足齿轮比，还要保证初始相位对齐：

$$\theta_{slave}(0) = K_{gear} \cdot \theta_{master}(0) + \phi_0$$

其中 $\phi_0$ 为初始相位偏移，通常在校准时设为零。

### 3.2 分数齿轮比的精确实现

对于分数齿轮比 $K_{gear} = p/q$（$p$、$q$ 为互质整数），使用分数计数器避免浮点累积误差：

```text
主轴每转q个计数 → 从轴转p个计数
主轴位置：θ_m = 2π × master_count / q
从轴位置：θ_s = 2π × slave_count / p
关系：slave_count = master_count × p / q
```

**定点数实现**：

$$\theta_{slave} = \frac{\theta_{master} \times p}{q}$$

使用64位中间变量避免溢出：

$$\theta_{slave} = \frac{(int64\_t)\theta_{master} \times p}{q}$$

### 3.3 电子凸轮——凸轮表与插值

电子凸轮定义主轴位置到从轴位置的非线性映射：

$$\theta_{slave} = f(\theta_{master})$$

凸轮表由离散点定义：

| 主轴位置 $\theta_m$ | 从轴位置 $\theta_s$ |
|---------------------|---------------------|
| $\theta_{m,0}$ | $\theta_{s,0}$ |
| $\theta_{m,1}$ | $\theta_{s,1}$ |
| ... | ... |
| $\theta_{m,n}$ | $\theta_{s,n}$ |

**线性插值**（最简单，但速度不连续）：

$$\theta_s = \theta_{s,i} + \frac{\theta_{m} - \theta_{m,i}}{\theta_{m,i+1} - \theta_{m,i}} \cdot (\theta_{s,i+1} - \theta_{s,i})$$

**三次样条插值**（速度和加速度连续）：

在区间 $[\theta_{m,i}, \theta_{m,i+1}]$ 内：

$$\theta_s(u) = a_i u^3 + b_i u^2 + c_i u + d_i, \quad u = \frac{\theta_m - \theta_{m,i}}{\theta_{m,i+1} - \theta_{m,i}}$$

系数由连续性条件确定：
- 位置连续：$\theta_s(\theta_{m,i}^-) = \theta_s(\theta_{m,i}^+)$
- 速度连续：$\dot{\theta}_s(\theta_{m,i}^-) = \dot{\theta}_s(\theta_{m,i}^+)$
- 加速度连续：$\ddot{\theta}_s(\theta_{m,i}^-) = \ddot{\theta}_s(\theta_{m,i}^+)$

### 3.4 凸轮表的速度和加速度计算

从轴的速度和加速度（用于前馈）：

$$\dot{\theta}_{slave} = \frac{df}{d\theta_{master}} \cdot \dot{\theta}_{master} = f'(\theta_m) \cdot \dot{\theta}_m$$

$$\ddot{\theta}_{slave} = f''(\theta_m) \cdot \dot{\theta}_m^2 + f'(\theta_m) \cdot \ddot{\theta}_m$$

其中 $f'(\theta_m)$ 和 $f''(\theta_m)$ 为凸轮曲线的一阶和二阶导数，可以从凸轮表预计算并存储。

### 3.5 注册校正（Registration）

注册校正是在运动过程中，通过传感器输入实时修正相位偏差：

$$\Delta\phi = \theta_{sensor} - \theta_{expected}$$

$$\theta_{slave,corrected} = \theta_{slave} + \Delta\phi \cdot G_{reg}(t)$$

其中 $G_{reg}(t)$ 为校正增益函数，通常设计为平滑过渡（避免突变）：

$$G_{reg}(t) = \begin{cases} 0 & t < t_{trigger} \\ \frac{t - t_{trigger}}{T_{reg}} & t_{trigger} \leq t < t_{trigger} + T_{reg} \\ 1 & t \geq t_{trigger} + T_{reg} \end{cases}$$

$T_{reg}$ 为校正过渡时间，太短会导致速度突变，太长则校正不及时。

### 3.6 主从架构的延迟分析

电子齿轮/凸轮的同步精度受以下延迟影响：

| 延迟来源 | 典型值 | 影响 |
|---------|--------|------|
| 主轴编码器采样 | 0.1~1 ms | 主轴位置滞后 |
| 通信传输 | 0.5~2 ms | EtherCAT/CANopen |
| 凸轮表插值计算 | 0.01~0.1 ms | 可忽略 |
| 从轴位置环跟踪 | 1~10 ms | 主要延迟 |

**总延迟**：$\Delta t_{total} = \Delta t_{sample} + \Delta t_{comm} + \Delta t_{tracking}$

**位置滞后**：$\Delta\theta = \dot{\theta}_{master} \cdot \Delta t_{total}$

**消除方法**：
1. 提高从轴位置环带宽
2. 加入速度前馈
3. 主轴位置预测（外推）

---

## 4.  工程实现

### 4.1 电子齿轮——分数齿轮比实现

```c
/**
 * @brief 电子齿轮控制器
 * @note  支持分数齿轮比，使用64位中间变量避免累积误差
 */
typedef struct {
    int32_t numerator;      /* 齿轮比分子 p */
    int32_t denominator;    /* 齿轮比分母 q */
    float phase_offset;     /* 相位偏移 [rad] */
    float master_offset;    /* 主轴零点偏移 [rad] */

    /* 输出 */
    float slave_position;   /* 从轴位置给定 [rad] */
    float slave_velocity;   /* 从轴速度给定 [rad/s]（用于前馈） */
} ElectronicGear_t;

/**
 * @brief 电子齿轮位置计算
 * @param gear       电子齿轮结构体
 * @param master_pos 主轴当前位置 [rad]
 * @param master_vel 主轴当前速度 [rad/s]
 * @retval 从轴位置给定 [rad]
 */
float ElectronicGear_Calculate(ElectronicGear_t *gear,
                                float master_pos, float master_vel)
{
    float gear_ratio;
    float relative_pos;

    /* 1. 计算齿轮比（浮点，但每次从整数重新计算，无累积误差） */
    gear_ratio = (float)gear->numerator / (float)gear->denominator;

    /* 2. 主轴相对位置 */
    relative_pos = master_pos - gear->master_offset;

    /* 3. 从轴位置 = 齿轮比 × 主轴位置 + 相位偏移 */
    gear->slave_position = gear_ratio * relative_pos + gear->phase_offset;

    /* 4. 从轴速度（用于前馈） */
    gear->slave_velocity = gear_ratio * master_vel;

    return gear->slave_position;
}
```

### 4.2 电子凸轮——凸轮表与线性插值

```c
/**
 * @brief 凸轮表项
 */
typedef struct {
    float master_pos;   /* 主轴位置 [rad] */
    float slave_pos;    /* 从轴位置 [rad] */
    float slave_vel;    /* 从轴速度导数 df/dθ_m [无量纲] */
} CamTableEntry_t;

/**
 * @brief 电子凸轮控制器
 */
typedef struct {
    CamTableEntry_t *table;    /* 凸轮表 */
    int table_size;            /* 表项数 */
    int last_index;            /* 上次查表索引（加速搜索） */

    /* 注册校正 */
    float reg_offset;          /* 注册校正偏移 [rad] */
    float reg_gain;            /* 校正增益（0~1，平滑过渡） */
    float reg_target;          /* 校正目标偏移 [rad] */
    float reg_rate;            /* 校正速率 [rad/s] */

    /* 输出 */
    float slave_position;      /* 从轴位置给定 [rad] */
    float slave_velocity;      /* 从轴速度给定 [rad/s] */
} ElectronicCam_t;

/**
 * @brief 凸轮表查表与线性插值
 * @param cam         电子凸轮结构体
 * @param master_pos  主轴位置 [rad]
 * @param master_vel  主轴速度 [rad/s]
 * @retval 从轴位置给定 [rad]
 */
float ElectronicCam_Calculate(ElectronicCam_t *cam,
                               float master_pos, float master_vel)
{
    int idx;
    float ratio;
    float interp_pos;
    float interp_vel;

    /* 1. 查找主轴位置所在的区间 */
    idx = cam->last_index;
    if (master_pos < cam->table[idx].master_pos) {
        /* 向前搜索 */
        while (idx > 0 && master_pos < cam->table[idx].master_pos)
            idx--;
    } else {
        /* 向后搜索 */
        while (idx < cam->table_size - 2 &&
               master_pos >= cam->table[idx + 1].master_pos)
            idx++;
    }
    cam->last_index = idx;

    /* 2. 线性插值 */
    ratio = (master_pos - cam->table[idx].master_pos) /
            (cam->table[idx + 1].master_pos - cam->table[idx].master_pos);

    /* 限制ratio范围 */
    if (ratio < 0.0f) ratio = 0.0f;
    if (ratio > 1.0f) ratio = 1.0f;

    interp_pos = cam->table[idx].slave_pos +
                 ratio * (cam->table[idx + 1].slave_pos - cam->table[idx].slave_pos);

    interp_vel = cam->table[idx].slave_vel +
                 ratio * (cam->table[idx + 1].slave_vel - cam->table[idx].slave_vel);

    /* 3. 从轴位置 = 插值位置 + 注册校正偏移 */
    cam->slave_position = interp_pos + cam->reg_offset;

    /* 4. 从轴速度 = f'(θ_m) × θ̇_m（用于前馈） */
    cam->slave_velocity = interp_vel * master_vel;

    return cam->slave_position;
}
```

### 4.3 注册校正实现

```c
/**
 * @brief 注册传感器触发回调
 * @note  当注册传感器检测到标记时调用
 * @param cam         电子凸轮结构体
 * @param master_pos  触发时刻的主轴位置 [rad]
 */
void ElectronicCam_RegistrationTrigger(ElectronicCam_t *cam, float master_pos)
{
    float expected_pos;
    float actual_pos;
    float phase_error;

    /* 1. 期望的传感器触发位置 */
    expected_pos = cam->table[0].master_pos;  /* 预设的标记位置 */

    /* 2. 实际触发位置 */
    actual_pos = master_pos;

    /* 3. 相位误差 */
    phase_error = actual_pos - expected_pos;

    /* 4. 设置校正目标 */
    cam->reg_target = -phase_error;
    cam->reg_gain = 0.0f;
}

/**
 * @brief 注册校正更新（每个控制周期调用）
 * @param cam  电子凸轮结构体
 * @param Ts   采样周期 [s]
 */
void ElectronicCam_RegistrationUpdate(ElectronicCam_t *cam, float Ts)
{
    float correction_step;

    if (fabsf(cam->reg_target - cam->reg_offset) > 0.001f) {
        /* 平滑校正：以固定速率趋近目标 */
        correction_step = cam->reg_rate * Ts;

        if (cam->reg_offset < cam->reg_target) {
            cam->reg_offset += correction_step;
            if (cam->reg_offset > cam->reg_target)
                cam->reg_offset = cam->reg_target;
        } else {
            cam->reg_offset -= correction_step;
            if (cam->reg_offset < cam->reg_target)
                cam->reg_offset = cam->reg_target;
        }
    }
}
```

### 4.4 主从同步控制主循环

```c
/**
 * @brief 电子齿轮/凸轮同步控制主循环
 * @note  典型执行频率：与从轴位置环一致（1~4 kHz）
 */
void MasterSlave_SyncLoop(MasterSlaveSystem_t *sys)
{
    float master_pos, master_vel;
    float slave_pos_ref, slave_vel_ref;

    /* 1. 读取主轴编码器 */
    master_pos = Encoder_Read(&sys->master_encoder);
    master_vel = SpeedEstimator_Update(&sys->master_speed_est, master_pos);

    /* 2. 根据模式计算从轴给定 */
    if (sys->mode == SYNC_MODE_GEAR) {
        slave_pos_ref = ElectronicGear_Calculate(&sys->gear,
                                                  master_pos, master_vel);
        slave_vel_ref = sys->gear.slave_velocity;
    } else { /* SYNC_MODE_CAM */
        slave_pos_ref = ElectronicCam_Calculate(&sys->cam,
                                                 master_pos, master_vel);
        slave_vel_ref = sys->cam.slave_velocity;

        /* 注册校正更新 */
        ElectronicCam_RegistrationUpdate(&sys->cam, sys->Ts);
    }

    /* 3. 从轴位置环（带速度前馈） */
    sys->slave_speed_ref = PositionLoop_WithFeedforward(
        slave_pos_ref, slave_vel_ref,
        0.0f,  /* 无加速度前馈 */
        sys->slave_feedback.position,
        &sys->slave_pos_ctrl
    );

    /* 4. 从轴速度环 */
    sys->slave_iq_ref = SpeedLoop_Controller(
        sys->slave_speed_ref,
        sys->slave_feedback.speed,
        &sys->slave_speed_ctrl
    );
}
```

---

## 5.  参数整定与调试指南

### 5.1 电子齿轮比设置

```text
步骤1：确定机械齿轮比
       - 主轴转速 / 从轴转速 = p / q
       - 化为最简分数
步骤2：设置齿轮比
       - gear.numerator = p
       - gear.denominator = q
步骤3：校准零点
       - 主轴和从轴转到机械零点
       - 记录此时主轴位置为 master_offset
       - 设置 phase_offset = 0
步骤4：验证
       - 主轴转一圈，从轴应转 p/q 圈
       - 检查累积误差（转100圈后）
```

### 5.2 电子凸轮表设计

**设计原则**：
1. **起点和终点连续**：凸轮表的首尾点应保证位置、速度连续
2. **速度平滑**：相邻点的速度变化不应过大
3. **加速度有限**：避免凸轮曲线的加速度超过电机能力
4. **采样密度**：在曲率大的区域增加采样点

**典型凸轮表设计流程**：
```text
1. 确定主轴一个周期内的关键位置点
2. 确定每个关键点对应的从轴位置
3. 用三次样条插值填充中间点
4. 计算每个点的速度导数 df/dθ_m
5. 验证最大速度和最大加速度在电机能力范围内
6. 下载到驱动器中测试
```

### 5.3 同步精度调试

| 调试项 | 方法 | 合格标准 |
|--------|------|---------|
| 静态同步 | 主轴固定，测量从轴位置误差 | <1个编码器计数 |
| 动态同步 | 主轴匀速运行，测量从轴跟踪误差 | <0.1°（取决于应用） |
| 加减速同步 | 主轴加减速，测量从轴滞后 | <0.5° |
| 注册精度 | 传感器触发，测量校正后的位置误差 | <0.05mm |

### 5.4 常见问题与对策

| 问题 | 原因 | 对策 |
|------|------|------|
| 从轴位置漂移 | 浮点累积误差 | 用分数齿轮比或定期校准 |
| 从轴跟踪滞后 | 位置环带宽不够 | 加速度前馈或提高Kp |
| 凸轮运动不平稳 | 凸轮表点太少 | 增加采样点或用样条插值 |
| 注册校正超调 | 校正速率太快 | 减小reg_rate |
| 启动时位置跳变 | 相位偏移未校准 | 先校准零点再启动同步 |

---

## 6.  硬件约束

### 6.1 主轴编码器分辨率

主轴编码器分辨率直接影响从轴的位置分辨率：

$$\Delta\theta_{slave} = K_{gear} \cdot \Delta\theta_{master} = K_{gear} \cdot \frac{2\pi}{4 \times N_{ppr}}$$

当 $K_{gear} = 7/3$、主轴编码器2500线时：

$$\Delta\theta_{slave} = \frac{7}{3} \times \frac{2\pi}{10000} = 0.00147 \text{ rad} = 0.084°$$

### 6.2 通信总线延迟

| 总线 | 周期时间 | 同步精度 | 适用场景 |
|------|---------|---------|---------|
| EtherCAT | 0.125~1 ms | ±1 μs | 高性能同步 |
| CANopen (DS402) | 1~4 ms | ±0.5 ms | 中等性能 |
| Modbus RTU | 5~20 ms | ±2 ms | 低速同步 |
| 脉冲/方向 | 实时 | ±1 脉冲 | 简单齿轮 |

### 6.3 从轴电机能力约束

电子凸轮的从轴需要满足：

$$\dot{\theta}_{slave,max} \geq \max|f'(\theta_m)| \cdot \dot{\theta}_{master,max}$$

$$\tau_{slave,max} \geq J_{slave} \cdot [f''(\theta_m) \cdot \dot{\theta}_m^2 + f'(\theta_m) \cdot \ddot{\theta}_m]$$

如果凸轮曲线的导数过大，从轴电机可能无法跟踪。

---

## 7.  交叉引用

| 模块 | 关联说明 |
|------|---------|
| [MC-MC-01 位置环设计](./MC-MC-01-Position-Loop.md) | 从轴位置环是电子齿轮/凸轮的执行层 |
| [MC-MC-02 速度与加速度前馈](./MC-MC-02-Feedforward.md) | 前馈减小从轴跟踪延迟 |
| [ALG-05 有传感器FOC](../algorithm/ALG-05-Sensored-FOC.md) | 从轴的底层驱动算法 |
| [MC-MC-06 多轴协调运动](./MC-MC-06-Multi-Axis.md) | 电子齿轮/凸轮是多轴协调的特例 |
| [COM-06 EtherCAT](../communication/COM-06-EtherCAT.md) | EtherCAT是实现多轴同步的推荐总线 |
| [MC-TP-06 插补原理](./MC-TP-06-Interpolation.md) | 插补是凸轮表插值的数学基础 |

---

## 8.  参考文献

1. Siemens SIMOTION — 电子齿轮与电子凸轮功能手册
2. Beckhoff TwinCAT NC PTP — 电子凸轮设计与调试指南
3. Yaskawa MP2300S — 电子齿轮/凸轮应用手册
4. Altintas, Y. *Manufacturing Automation: Metal Cutting Mechanics, Machine Tool Vibrations, and CNC Design*, 2nd Edition, Cambridge, 2012. — CNC中的电子齿轮与凸轮
5. Spong, M.W. et al. *Robot Modeling and Control*, Wiley, 2006. — 主从同步控制理论
6. 王晓远等. *伺服系统与运动控制*, 机械工业出版社, 2018. — 电子齿轮与凸轮的工程实现

---

##  版本信息

- 模块编号：MC-MC-05
- 所属路径：轨迹规划与运动控制 / 运动控制
- 创建日期：2026-06-13
- 最后更新：2026-06-13
