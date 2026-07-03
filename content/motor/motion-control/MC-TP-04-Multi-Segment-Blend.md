---
date: 2026-06-13
section: 电机控制
chapter: motion-control
chapterTitle: 运动控制
chapterOrder: 30
category: 运动控制
source: motor
visibility: public
title: "MC-TP-04: 多段轨迹拼接与Blend"
tags:
  - motor-control
status: learning
summary: 丝滑过弯——多段运动间的平滑过渡与前瞻算法
navGroup: 控制与算法
navGroupOrder: 30
---

# MC-TP-04: 多段轨迹拼接与Blend

## 副标题

丝滑过弯——多段运动间的平滑过渡与前瞻算法

## 难度

★★★★☆

## 适用对象

- 数控系统轨迹规划工程师
- 机器人运动控制器开发者
- 高端伺服驱动器算法工程师
- 运动控制平台架构师

## 前置知识

- MC-TP-01: 运动学基础与约束
- MC-TP-02: 梯形与S曲线速度规划
- CT-14: 级联PID控制

## 核心摘要

实际运动控制中，轨迹很少是单段点到点运动，而是由多个运动段组成：加速→匀速→转弯→减速→加速……如何在段间实现平滑过渡，同时保证速度和加速度约束，是多段轨迹拼接的核心问题。Blend（圆弧过渡）技术允许在两个线段之间用圆弧连接，避免完全停止；前瞻（Look-ahead）算法提前计算减速距离，防止在急弯处超速。本模块详细推导Blend半径计算、拐角速度限制、前瞻算法，并给出完整的C语言实现。

## 问题引入

### 工程场景

**场景1：CNC加工的连续路径**

铣刀沿矩形路径加工，四个直角拐角处如果完全停止再启动，加工效率极低且会在拐角留下停刀痕迹。使用圆弧过渡（Blend），刀具在拐角处保持一定速度平滑通过，既提高效率又改善表面质量。

**场景2：SCARA机器人的取放路径**

机器人需要依次经过：原点→取料位→检测位→放料位→原点。四个运动段之间如果完全停止，循环时间增加30%。使用前瞻算法，在检测位到放料位的直线段提前加速，整体循环时间缩短20%。

**场景3：3D打印的层间路径**

3D打印的每一层由数百条短线段组成，如果每段都停止再启动，打印速度极慢。使用Blend过渡，喷嘴在拐角处保持高速平滑通过，打印效率提升3倍以上。

### 核心问题

> 多段轨迹如何在拐角处平滑过渡？Blend半径如何选择？如何提前计算减速以避免超速？

## 原理推导

### 1. 问题定义

给定 $N$ 个路径点 $\mathbf{p}_0, \mathbf{p}_1, \ldots, \mathbf{p}_N$，相邻点之间用直线段连接。需要解决：

1. 在路径点（拐角）处如何平滑过渡？
2. 每段的速度如何确定？
3. 如何保证加速度约束？

### 2. Blend（圆弧过渡）

#### 2.1 基本概念

在拐角点 $\mathbf{p}_i$ 处，用圆弧替代尖角，圆弧与前后线段相切：

```
    p_{i-1} ──────╲
                   ╲  ← 圆弧(Blend)
                    ╲
                     ╲────── p_{i+1}
                      p_i (拐角点)
```

圆弧的半径 $r$ 称为Blend半径。圆弧的圆心位于拐角的角平分线上。

#### 2.2 Blend几何计算

设入射方向单位向量 $\mathbf{u}_{in}$ 和出射方向单位向量 $\mathbf{u}_{out}$：

$$
\mathbf{u}_{in} = \frac{\mathbf{p}_i - \mathbf{p}_{i-1}}{|\mathbf{p}_i - \mathbf{p}_{i-1}|}, \quad \mathbf{u}_{out} = \frac{\mathbf{p}_{i+1} - \mathbf{p}_i}{|\mathbf{p}_{i+1} - \mathbf{p}_i|}
$$

拐角半角 $\alpha$：

$$
\cos\alpha = -\mathbf{u}_{in} \cdot \mathbf{u}_{out}
$$

Blend半径 $r$ 与Blend距离 $d$（从拐角点到切点的距离）的关系：

$$
d = r \cdot \tan\alpha = r \cdot \frac{\sin\alpha}{\cos\alpha + 1}
$$

更精确地，当拐角为 $2\alpha$（全角）时：

$$
d = \frac{r}{\tan(\pi/2 - \alpha)} = r \cdot \cot\left(\frac{\pi - 2\alpha}{2}\right)
$$

简化为：

$$
d = r \cdot \frac{1 + \cos(2\alpha)}{\sin(2\alpha)}
$$

#### 2.3 拐角速度限制

在Blend圆弧上运动时，向心加速度为：

$$
a_c = \frac{v^2}{r}
$$

由加速度约束 $a_c \leq a_{max}$，拐角速度限制：

$$
v_{corner} = \sqrt{r \cdot a_{max}}
$$

这是Blend速度规划的核心公式：**拐角速度由Blend半径和加速度约束共同决定**。

#### 2.4 Blend半径的选择

Blend半径受以下约束：

1. **线段长度约束**：Blend距离不能超过线段长度的一半

$$
d \leq \frac{L_{min}}{2}
$$

其中 $L_{min} = \min(|\mathbf{p}_i - \mathbf{p}_{i-1}|, |\mathbf{p}_{i+1} - \mathbf{p}_i|)$。

2. **精度约束**：Blend圆弧与理想拐角的最大偏差（弦高误差）

$$
e_{max} = r \cdot (1 - \cos\alpha) \leq e_{tol}
$$

3. **综合约束**：

$$
r_{max} = \min\left(\frac{L_{min}}{2\tan\alpha}, \frac{e_{tol}}{1 - \cos\alpha}\right)
$$

### 3. 前瞻（Look-ahead）算法

#### 3.1 问题动机

如果只看当前段，无法知道前方是否有急弯需要减速。前瞻算法提前扫描后续路径段，计算每段的最大允许速度。

#### 3.2 前向扫描：计算最大进入速度

从第一段开始，逐段计算最大速度：

$$
v_{i,max} = \min(v_{limit}, v_{feed}, v_{corner,i})
$$

其中：
- $v_{limit}$：系统最大速度
- $v_{feed}$：用户设定的进给速度
- $v_{corner,i}$：第 $i$ 个拐角的速度限制

#### 3.3 后向扫描：计算减速约束

从最后一段开始，反向计算每段的起始速度限制：

$$
v_{i,start} = \min(v_{i,max}, \sqrt{v_{i+1,start}^2 + 2 a_{dec} \cdot L_i})
$$

其中 $L_i$ 为第 $i$ 段的长度，$a_{dec}$ 为减速度。

**物理含义**：如果要在第 $i+1$ 段开始时速度为 $v_{i+1,start}$，那么在第 $i$ 段开始时的速度不能超过从 $v_{i+1,start}$ 反向加速 $L_i$ 距离所能达到的速度。

#### 3.4 前瞻算法完整流程

```
输入：路径点序列 p[0..N], 约束 v_max, a_max, r_blend

Step 1: 计算每段长度 L[i] 和拐角角度 angle[i]
Step 2: 计算每个拐角的Blend半径 r[i] 和拐角速度 v_corner[i]
Step 3: 前向扫描 - 计算每段的最大速度 v_fwd[i]
Step 4: 后向扫描 - 计算每段的起始速度约束 v_bwd[i]
Step 5: 取 v[i] = min(v_fwd[i], v_bwd[i]) 作为每段速度
Step 6: 为每段生成S曲线或梯形速度规划
```

#### 3.5 前瞻深度

前瞻深度 $N_{lookahead}$ 决定了扫描多少个后续段：

$$
N_{lookahead} \geq \frac{v_{max}^2}{2 a_{dec} \cdot L_{avg}}
$$

其中 $L_{avg}$ 为平均段长度。这确保了从最大速度减速到0所需的所有段都被考虑到。

### 4. 多段S曲线拼接

#### 4.1 连续速度约束

相邻两段S曲线在拐角处需要速度连续。设第 $i$ 段的终止速度等于第 $i+1$ 段的起始速度：

$$
v_{i,end} = v_{i+1,start} = v_{corner,i}
$$

#### 4.2 非零起始/终止速度的S曲线

MC-TP-02中的S曲线规划器需要支持非零起始和终止速度。关键修改：

加速段速度增量：$\Delta v_{acc} = v_{max} - v_s$

减速段速度增量：$\Delta v_{dec} = v_{max} - v_e$

当 $v_s > 0$ 或 $v_e > 0$ 时，加速/减速段时间相应缩短。

#### 4.3 梯形加速度Blend

另一种方法是使用梯形加速度曲线进行Blend：

在拐角处，加速度从 $+a_1$ 线性过渡到 $-a_2$（经过0），过渡时间为：

$$
T_{blend} = \frac{a_1 + a_2}{j_{max}}
$$

### 5. Blend vs 完全停止

| 特性 | Blend过渡 | 完全停止 |
|------|----------|---------|
| 速度连续性 | C¹（速度连续） | C⁰（位置连续） |
| 循环时间 | 短 | 长 |
| 路径精度 | 有偏差（圆弧近似） | 精确 |
| 实现复杂度 | 高 | 低 |
| 适用场景 | 高速连续加工 | 精确定位 |

**选择标准**：
- 拐角速度 $v_{corner} > 0.3 v_{feed}$：使用Blend
- 拐角速度 $v_{corner} < 0.1 v_{feed}$：完全停止
- 中间情况：根据精度要求决定

## 工程实现

### 前瞻与Blend计算

```c
#include <math.h>
#include <stdint.h>
#include <string.h>

#define MAX_SEGMENTS 256
#define MAX_LOOKAHEAD 64

/* 二维向量 */
typedef struct {
    double x, y;
} Vec2D;

/* 路径段信息 */
typedef struct {
    Vec2D  p_start;      /* 起始点 */
    Vec2D  p_end;        /* 终止点 */
    double length;        /* 段长度 */
    double angle;         /* 拐角半角 [rad] */
    double r_blend;       /* Blend半径 */
    double d_blend;       /* Blend距离 */
    double v_corner;      /* 拐角速度 */
    double v_start;       /* 段起始速度 */
    double v_end;         /* 段终止速度 */
    double v_cruise;      /* 巡航速度 */
} PathSegment;

/* 前瞻配置 */
typedef struct {
    double v_max;         /* 最大速度 */
    double a_max;         /* 最大加速度 */
    double j_max;         /* 最大jerk */
    double r_blend_max;   /* 最大Blend半径 */
    double e_tol;         /* 路径偏差容限 */
} LookaheadConfig;

/* 向量运算 */
static double vec2_length(Vec2D v) { return sqrt(v.x*v.x + v.y*v.y); }
static Vec2D vec2_sub(Vec2D a, Vec2D b) { return (Vec2D){a.x-b.x, a.y-b.y}; }
static double vec2_dot(Vec2D a, Vec2D b) { return a.x*b.x + a.y*b.y; }

/* 计算路径段信息 */
int path_compute_segments(
    const Vec2D *points, int n_points,
    const LookaheadConfig *cfg,
    PathSegment *segments)
{
    if (n_points < 2) return -1;

    int n_seg = n_points - 1;

    /* Step 1: 计算每段长度 */
    for (int i = 0; i < n_seg; i++) {
        segments[i].p_start = points[i];
        segments[i].p_end = points[i+1];
        Vec2D d = vec2_sub(points[i+1], points[i]);
        segments[i].length = vec2_length(d);
    }

    /* Step 2: 计算拐角角度和Blend参数 */
    for (int i = 0; i < n_seg - 1; i++) {
        Vec2D d_in = vec2_sub(points[i+1], points[i]);
        Vec2D d_out = vec2_sub(points[i+2], points[i+1]);

        double len_in = vec2_length(d_in);
        double len_out = vec2_length(d_out);

        if (len_in < 1e-10 || len_out < 1e-10) {
            segments[i].angle = 0.0;
            segments[i].r_blend = 0.0;
            segments[i].v_corner = 0.0;
            continue;
        }

        /* 单位向量 */
        Vec2D u_in = {d_in.x/len_in, d_in.y/len_in};
        Vec2D u_out = {d_out.x/len_out, d_out.y/len_out};

        /* 拐角半角 */
        double cos_alpha = -vec2_dot(u_in, u_out);
        if (cos_alpha > 1.0) cos_alpha = 1.0;
        if (cos_alpha < -1.0) cos_alpha = -1.0;
        double alpha = acos(cos_alpha);

        segments[i].angle = alpha;

        /* Blend半径：受线段长度和精度约束 */
        double L_min = (len_in < len_out) ? len_in : len_out;
        double r_max_len = 0.5 * L_min / (tan(alpha) + 1e-10);
        double r_max_tol = cfg->e_tol / (1.0 - cos_alpha + 1e-10);
        double r_blend = r_max_len;
        if (r_max_tol < r_blend) r_blend = r_max_tol;
        if (r_blend > cfg->r_blend_max) r_blend = cfg->r_blend_max;

        segments[i].r_blend = r_blend;
        segments[i].d_blend = r_blend * tan(alpha);

        /* 拐角速度限制 */
        segments[i].v_corner = sqrt(r_blend * cfg->a_max);
    }

    /* 最后一段无拐角 */
    segments[n_seg-1].angle = 0.0;
    segments[n_seg-1].r_blend = 0.0;
    segments[n_seg-1].v_corner = 0.0;

    /* Step 3: 前向扫描 */
    segments[0].v_start = 0.0;  /* 起始速度为0 */
    for (int i = 0; i < n_seg; i++) {
        double v_max_seg = cfg->v_max;
        double v_end_candidate = sqrt(
            segments[i].v_start * segments[i].v_start
            + 2.0 * cfg->a_max * segments[i].length);

        if (v_end_candidate > v_max_seg)
            v_end_candidate = v_max_seg;

        /* 拐角速度限制 */
        if (i < n_seg - 1 && v_end_candidate > segments[i].v_corner)
            v_end_candidate = segments[i].v_corner;

        segments[i].v_end = v_end_candidate;
        segments[i].v_cruise = v_max_seg;

        if (i < n_seg - 1)
            segments[i+1].v_start = v_end_candidate;
    }

    /* Step 4: 后向扫描 */
    segments[n_seg-1].v_end = 0.0;  /* 终止速度为0 */
    for (int i = n_seg - 1; i >= 0; i--) {
        double v_start_max = sqrt(
            segments[i].v_end * segments[i].v_end
            + 2.0 * cfg->a_max * segments[i].length);

        if (v_start_max > cfg->v_max)
            v_start_max = cfg->v_max;

        if (segments[i].v_start > v_start_max)
            segments[i].v_start = v_start_max;

        /* 拐角速度限制 */
        if (i > 0 && segments[i].v_start > segments[i-1].v_corner)
            segments[i].v_start = segments[i-1].v_corner;

        if (i > 0)
            segments[i-1].v_end = segments[i].v_start;
    }

    return n_seg;
}

/* 计算Blend圆弧上的位置 */
void blend_evaluate(
    Vec2D p_prev, Vec2D p_corner, Vec2D p_next,
    double r_blend,
    double t,  /* t ∈ [0, 1]，0=进入Blend，1=离开Blend */
    Vec2D *pos, double *curvature)
{
    Vec2D d_in = vec2_sub(p_corner, p_prev);
    Vec2D d_out = vec2_sub(p_next, p_corner);

    double len_in = vec2_length(d_in);
    double len_out = vec2_length(d_out);

    /* 切点 */
    Vec2D u_in = {d_in.x/len_in, d_in.y/len_in};
    Vec2D u_out = {d_out.x/len_out, d_out.y/len_out};

    double cos_a = -vec2_dot(u_in, u_out);
    double alpha = acos((cos_a > 1.0) ? 1.0 : ((cos_a < -1.0) ? -1.0 : cos_a));
    double d_blend = r_blend * tan(alpha);

    Vec2D t_in = {p_corner.x - d_blend * u_in.x, p_corner.y - d_blend * u_in.y};
    Vec2D t_out = {p_corner.x + d_blend * u_out.x, p_corner.y + d_blend * u_out.y};

    /* 圆弧中心 */
    Vec2D bisector = {u_in.x + u_out.x, u_in.y + u_out.y};
    double bis_len = vec2_length(bisector);
    Vec2D bis_unit = {bisector.x/bis_len, bisector.y/bis_len};

    double h = r_blend / cos(alpha);
    Vec2D center = {p_corner.x + h * bis_unit.x, p_corner.y + h * bis_unit.y};

    /* 圆弧角度参数化 */
    Vec2D v_to_in = {t_in.x - center.x, t_in.y - center.y};
    Vec2D v_to_out = {t_out.x - center.x, t_out.y - center.y};

    double angle_in = atan2(v_to_in.y, v_to_in.x);
    double angle_out = atan2(v_to_out.y, v_to_out.x);

    /* 确保角度方向正确 */
    double sweep = angle_out - angle_in;
    /* 选择短弧 */
    if (fabs(sweep) > M_PI) {
        if (sweep > 0) sweep -= 2*M_PI;
        else sweep += 2*M_PI;
    }

    double angle_t = angle_in + t * sweep;
    pos->x = center.x + r_blend * cos(angle_t);
    pos->y = center.y + r_blend * sin(angle_t);

    *curvature = 1.0 / r_blend;
}
```

### 多段速度规划调度器

```c
/* 多段运动调度器 */
typedef struct {
    PathSegment segments[MAX_SEGMENTS];
    int n_segments;
    int current_seg;
    double t_in_seg;     /* 当前段时间 */
    double v_current;    /* 当前速度 */
    int running;
} MultiSegScheduler;

/* 初始化调度器 */
int multiseg_init(
    MultiSegScheduler *sched,
    const Vec2D *points, int n_points,
    const LookaheadConfig *cfg)
{
    sched->n_segments = path_compute_segments(
        points, n_points, cfg, sched->segments);
    if (sched->n_segments < 0) return -1;

    sched->current_seg = 0;
    sched->t_in_seg = 0.0;
    sched->v_current = sched->segments[0].v_start;
    sched->running = 1;
    return 0;
}

/* 周期更新：输出位置和速度指令 */
void multiseg_update(
    MultiSegScheduler *sched,
    double T_s,
    Vec2D *pos_cmd, double *v_cmd)
{
    if (!sched->running || sched->current_seg >= sched->n_segments) {
        sched->running = 0;
        return;
    }

    PathSegment *seg = &sched->segments[sched->current_seg];

    /* 简化：线性速度规划（实际应用中替换为S曲线） */
    double v_s = seg->v_start;
    double v_e = seg->v_end;
    double L = seg->length;
    double progress = sched->t_in_seg * (v_s + v_e) / (2.0 * L + 1e-10);

    if (progress >= 1.0) {
        sched->current_seg++;
        sched->t_in_seg = 0.0;
        if (sched->current_seg >= sched->n_segments) {
            sched->running = 0;
            return;
        }
        seg = &sched->segments[sched->current_seg];
        progress = 0.0;
    }

    /* 线性插值位置 */
    pos_cmd->x = seg->p_start.x + progress * (seg->p_end.x - seg->p_start.x);
    pos_cmd->y = seg->p_start.y + progress * (seg->p_end.y - seg->p_start.y);

    /* 速度指令 */
    *v_cmd = v_s + progress * (v_e - v_s);

    sched->t_in_seg += T_s;
}
```

## 参数整定/调试指南

### 1. Blend半径选择

| 应用 | Blend半径 | 说明 |
|------|----------|------|
| 粗加工 | 大（5~20mm） | 追求速度，允许路径偏差 |
| 精加工 | 小（0.1~1mm） | 追求精度，牺牲速度 |
| 机器人搬运 | 中（1~5mm） | 平衡速度与精度 |

### 2. 前瞻深度选择

前瞻深度不足会导致急弯处来不及减速：

$$
N_{lookahead} \geq \frac{v_{max}^2}{2 a_{dec} \cdot L_{min}} + 1
$$

例如：$v_{max} = 500$ mm/s, $a_{dec} = 2000$ mm/s², $L_{min} = 2$ mm：

$$
N_{lookahead} \geq \frac{500^2}{2 \times 2000 \times 2} + 1 = 32
$$

### 3. 常见调试问题

| 现象 | 可能原因 | 解决方法 |
|------|---------|---------|
| 拐角处超速 | 前瞻深度不足 | 增大 $N_{lookahead}$ |
| 拐角处停顿 | Blend半径过小 | 增大 $r_{blend}$ |
| 路径偏差过大 | Blend半径过大 | 减小 $r_{blend}$ 或 $e_{tol}$ |
| 速度曲线抖动 | 前向/后向扫描冲突 | 检查速度约束一致性 |
| 段间速度不连续 | 后向扫描遗漏 | 确保后向扫描覆盖所有段 |
| 短段速度过低 | Blend距离超过段长 | 限制 $d_{blend} < L/2$ |

### 4. 调试工具

1. **速度-距离图**：绘制每段的速度曲线，检查约束满足
2. **路径偏差图**：绘制实际路径与理想路径的偏差
3. **加速度频谱**：FFT分析加速度，检查是否有高频分量

## 硬件约束

### 1. 内存占用

前瞻算法需要存储所有路径段信息：

$$
\text{Memory} = N_{seg} \times \text{sizeof(PathSegment)} \approx N_{seg} \times 128 \text{ bytes}
$$

256段路径需要约32KB，在Cortex-M4上可行。

### 2. 计算时序

前瞻算法的计算分为两个阶段：

1. **路径预处理**：在运动开始前完成，无实时性要求
2. **实时插值**：每个控制周期调用，要求 < 10μs

### 3. 浮点性能

Blend计算涉及三角函数（`acos`, `atan2`, `cos`, `sin`），在无FPU的MCU上较慢。优化方案：
- 使用查表法近似三角函数
- 使用CORDIC算法
- 预计算所有Blend参数

### 4. 多轴协调

Blend计算在笛卡尔空间进行，但实际控制是各轴独立。需要将笛卡尔空间的Blend速度分解到各轴：

$$
v_x = v \cdot \cos\theta, \quad v_y = v \cdot \sin\theta
$$

各轴的加速度约束可能不同，需要取最保守的约束。

## 交叉引用

| 模块 | 关联说明 |
|------|---------|
| MC-TP-01 | 运动学约束：Blend的加速度约束 |
| MC-TP-02 | S曲线：多段S曲线拼接 |
| CE-16 | MPC轨迹跟踪：Blend轨迹的跟踪 |
| MC-MC-06 | 多轴协调：多轴Blend的速度分解 |
| MC-TP-06 | 插补原理：Blend段的实时插补 |
| MC-TP-05 | 时间最优：Blend速度的时间最优计算 |

## 参考文献

1. Biagiotti L., Melchiorri C., *Trajectory Planning for Automatic Machines and Robots*, Springer, 2008
2. Sencer B., Altintas Y., Croft E., "Feed Optimization for Five-Axis CNC Machine Tools with Drive Constraints", *Int. J. Machine Tools and Manufacture*, 2008
3. Beudaert X., Lavernhe S., Tournier C., "Feedrate Interpolation with Axis Jerk Constraints on 5-Axis CNC", *Procedia CIRP*, 2012
4. Kroger T., *On-Line Trajectory Generation in Robotic Systems*, Springer, 2010
5. Zhang K., Yuan C.M., Gao X.S., "A Greedy Algorithm for Feedrate Planning with Jerk Constraints along Curved Tool Paths", *IEEE ICRA*, 2012
