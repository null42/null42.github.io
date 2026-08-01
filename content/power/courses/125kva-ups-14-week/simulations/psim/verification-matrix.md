---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "PSIM逐状态与闭环验证矩阵"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "统一仿真约定"
navGroup: 项目实践
navGroupOrder: 20
---

# PSIM逐状态与闭环验证矩阵

本目录不伪造PSIM专有二进制工程。由于当前环境没有PSIM命令行或工程编辑器，课程保存的是可直接照表搭建的节点、器件、状态、参数、测量点和预期结果。获得PSIM后，按本矩阵建立工程并把版本、运行时间和导出数据路径补入记录。

## 统一仿真约定

- 元件方向以课程`reference/symbols-and-nodes.html`和冻结拓扑确认文件为准；
- 第一次运行只允许理想器件、固定门极和小步长；
- 第二次运行加入器件压降、ESR、死区和采样；
- 第三次运行才闭合控制环；
- 每次必须保存`.csv`原始数据，不以截图替代数据；
- 拟合电感斜率时避开换流和采样边界；
- 所有载波交错角标记为教学候选，不写成产品事实。

## 矩阵

| 编号 | 工程 | 首要验证 | 固定输入 | 测量点 | 通过条件 |
|---|---|---|---|---|---|
| P01 | 单相Vienna桥臂 | 正负电流导通路径 | 低压直流、固定S、限流源 | 相端、二极管电流、电感电流 | 器件方向与状态表一致 |
| P02 | 三相Vienna | 六个正常电流符号扇区×八个门极，共48状态 | 三相电感、P/O/M电容 | 三相电感、iO、vp、vm | 电感斜率误差≤5% |
| P03 | T型单桥臂 | P/O/N和换流 | 正负电流源、死区扫描 | 桥臂电压、四管电流 | 无禁止直通 |
| P04 | 两套Vienna | 总流与差流 | 独立支路电感和采样 | i1、i2、ig、iΔ | 均流误差≤5% |
| P05 | 中点平衡 | 双向能量转移 | 上下电容初始差压 | Δv、ib、vp、vm | 差压进入1%至2%目标 |
| P06 | 直流支路 | 八组合安全筛查 | `BAT+、BAT-、P、M` | 各开关电流、母线电流 | `111`组合硬件/软件禁止 |
| P07 | 两套T型 | 差模环流 | 独立输出电感 | 两支路电流、公共电流 | 环流RMS≤5% |
| P08 | 四线制UPS | 零序和中点耦合 | 单相/非线性负载 | iN、iO、Δv、输出电压 | 路径和能量守恒一致 |

## 每个工程的记录格式

```text
PSIM version:
Project file:
Parameter set:
Solver and step:
Initial condition:
State or scenario:
Measured nodes:
Expected slope/level/current path:
Measured result:
Relative error:
Pass/Fail:
Raw CSV:
```
