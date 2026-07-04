---
date: 2026-06-13
section: 电机控制
chapter: cross-reference
chapterTitle: 交叉索引
chapterOrder: 10
category: 交叉索引
source: motor
visibility: public
title:  交叉引用映射表（索引）
tags:
  - motor-control
status: learning
summary: "> **用途：** 汇总硬件路径与算法路径之间的所有交叉引用，帮助学习者快速定位关联知识 > > 本文件为索引页，详细映射表已拆分至以下子文件："
navGroup: 入门与索引
navGroupOrder: 10
---

#  交叉引用映射表（索引）

> **用途：** 汇总硬件路径与算法路径之间的所有交叉引用，帮助学习者快速定位关联知识
>
> 本文件为索引页，详细映射表已拆分至以下子文件：

---

##  子文件索引

| 子文件 | 内容概述 |
|--------|---------|
| [xref-hw-alg.md](./xref-hw-alg.md) | 硬件↔算法双向映射（HW-01~07、ALG-01/05/07/09/13/15） |
| [xref-ee-hw.md](./xref-ee-hw.md) | 硬件基础↔电控映射（EE-01~09）及功率变换↔电控关联（PP-04/07） |
| [xref-ct-alg.md](./xref-ct-alg.md) | 控制理论↔算法映射（CT-03~18） |
| [xref-adv-base.md](./xref-adv-base.md) | 高级篇↔基础篇映射（ADV-HW-01~03、ADV-ALG-01/05/07/09/13/15、SYS-01~04） |
| [xref-hpm.md](./xref-hpm.md) | HPM MC代码↔知识库文档双向映射及官方知识库文章关联 |
| [xref-new-modules.md](./xref-new-modules.md) | 新增模块映射（HW-02B、ALG-17/18/19、CT-19、PMI-01~03、COM-08/09） |
| [xref-practice.md](./xref-practice.md) | 实践路径↔KB模块映射（路径11-14与ALG/HW/CT/ADV/SYS/MC-LIB/HPM-MC/SIM双向映射） |
| [xref-lxfoc-verification.md](./xref-lxfoc-verification.md) | lxfoc 25个核心算法模块↔KB理论一致性验证（控制环/观测器/高级控制/参数辨识/自整定/数学变换） |
| [xref-motion-control.md](./xref-motion-control.md) | 轨迹规划与运动控制映射（MC-TP-01~06、MC-MC-01~06）及已有模块反向映射 |

---

##  交叉引用密度统计（汇总）

### 基础篇——硬件/算法模块

| 模块 | 算法关联/硬件约束数量 | 达标(≥2) |
|------|---------------------|----------|
| HW-01 | 5个算法关联 |  |
| HW-02 | 4个算法关联 |  |
| HW-03 | 3个算法关联 |  |
| HW-04 | 5个算法关联 |  |
| HW-05 | 5个算法关联 |  |
| HW-06 | 3个算法关联 |  |
| HW-07 | 3个算法关联 |  |
| ALG-01 | 3个硬件约束 |  |
| ALG-05 | 5个硬件约束 |  |
| ALG-07 | 4个硬件约束 |  |
| ALG-09 | 4个硬件约束 |  |
| ALG-13 | 4个硬件约束 |  |
| ALG-15 | 4个硬件约束 |  |

### 基础篇——硬件基础/SDK模块

| 模块 | 算法关联/硬件约束数量 | 达标(≥2) |
|------|---------------------|----------|
| EE-01 | 5个电控关联 |  |
| EE-02 | 4个电控关联 |  |
| EE-03 | 4个电控关联 |  |
| EE-04 | 4个电控关联 |  |
| EE-05 | 5个电控关联 |  |
| EE-06 | 4个电控关联 |  |
| EE-07 | 5个电控关联 |  |
| EE-08 | 4个电控关联 |  |
| EE-09 | 4个电控关联 |  |
| SDK-01 | 1个代码映射(架构类) |  |
| SDK-02 | 7个代码映射 |  |
| SDK-03 | 4个代码映射 |  |
| SDK-04 | 3个代码映射 |  |
| SDK-05 | 2个代码映射 |  |
| SDK-06 | 4个代码映射 |  |

### 高级篇模块

| 模块 | 基础篇关联数 | 高级篇内部关联数 | 达标(≥2) |
|------|-----------|--------------|----------|
| ADV-HW-01 | 6 | 2 (→ADV-HW-02, →ADV-ALG-05) |  |
| ADV-HW-02 | 5 | 2 (→ADV-HW-01, →ADV-ALG-09) |  |
| ADV-HW-03 | 6 | 1 (→ADV-ALG-15) |  |
| ADV-ALG-01 | 4 | 3 (→ADV-ALG-05, →ADV-ALG-07, →ADV-ALG-13) |  |
| ADV-ALG-05 | 5 | 2 (→ADV-ALG-01, →ADV-HW-01) |  |
| ADV-ALG-07 | 4 | 2 (→ADV-ALG-13, →ADV-ALG-01) |  |
| ADV-ALG-09 | 4 | 2 (→ADV-ALG-13, →SYS-04) |  |
| ADV-ALG-13 | 4 | 3 (→ADV-ALG-01, →ADV-ALG-07, →ADV-ALG-09) |  |
| ADV-ALG-15 | 5 | 3 (→ADV-HW-01, →ADV-HW-02, →ADV-HW-03) |  |
| SYS-01 | 1 | 0 | (系统方法论类) |
| SYS-02 | 1 | 1 (→SYS-03) |  |
| SYS-03 | 1 | 1 (→SYS-02) |  |
| SYS-04 | 1 | 1 (→ADV-ALG-09) |  |

### 新增模块

| 模块 | 关联数量 | 达标(≥2) |
|------|---------|----------|
| HW-02B | 3 |  |
| ALG-17 | 3 |  |
| ALG-18 | 4 |  |
| ALG-19 | 3 |  |
| CT-19 | 3 |  |
| PMI-01 | 1+2(PMI-02/03) |  |
| PMI-02 | 2 |  |
| PMI-03 | 2 |  |
| COM-08 | 3 |  |
| COM-09 | 3 |  |
| 实践路径11-14 | 19个KB模块关联 |  |
| HW-01B | 3个ALG模块关联 |  |
| SYS-05 | HW-06/ALG-15/SYS-01关联 |  |
| SYS-06 | SYS-04/SYS-05/HW-07关联 |  |
| SIM-05 | SIM-00/SYS-04/ALG-03关联 |  |

**所有模块均满足交叉引用要求。SDK分析类模块以代码映射为主要关联方式；系统方法论类模块因其跨领域性质，基础篇关联数要求放宽。**

### 轨迹规划与运动控制模块

| 模块 | 关联数量 | 达标(≥2) |
|------|---------|----------|
| MC-TP-01 | 3 (CT-01, CT-02, ALG-12) |  |
| MC-TP-02 | 3 (CT-14, CE-16, MC-MC-02) |  |
| MC-TP-03 | 2 (CT-10, CE-16) |  |
| MC-TP-04 | 2 (CE-16, MC-MC-06) |  |
| MC-TP-05 | 2 (CT-13, CE-15) |  |
| MC-TP-06 | 2 (MC-MC-06, ALG-05) |  |
| MC-MC-01 | 3 (CT-14, ALG-12, CE-06) |  |
| MC-MC-02 | 3 (CT-06, CE-16, MC-TP-02) |  |
| MC-MC-03 | 3 (CT-03, CT-09, ADV-ALG-01) |  |
| MC-MC-04 | 2 (CT-06, ALG-18) |  |
| MC-MC-05 | 2 (MC-MC-01, ALG-05) |  |
| MC-MC-06 | 3 (MC-TP-06, MC-MC-05, CE-17) |  |

### lxfoc代码↔KB一致性验证

| 验证分组 | 模块数 |  |  |  | 关键发现 |
|---------|--------|-----|-----|-----|---------|
| 控制环 | 7 | 1 | 5 | 6 | VF弱磁区电压限制缺失；MTPA未考虑电感饱和 |
| 观测器 | 7 | 2 | 10 | 9 | Flux gamma未自适应；HFI缺N/S极判断 |
| 高级控制 | 4 | 3 | 8 | 3 | ADRC LESO缺b0*u；Deadbeat缺延迟补偿和电压限幅 |
| 参数辨识 | 3 | 0 | 5 | 3 | Inductance缺q轴测量；Flux未用omega信息 |
| 自整定 | 2 | 0 | 4 | 2 | speed_pi SO法a系数偏激进；缺前置滤波器 |
| 数学/变换 | 2 | 0 | 4 | 3 | SVPWM死区补偿阈值固定；PID条件积分默认禁用 |
| **合计** | **25** | **6** | **36** | **26** | 详细验证见 [xref-lxfoc-verification.md](./xref-lxfoc-verification.md) |
