---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "F28075控制核心教学工程"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "分层"
navGroup: 项目实践
navGroupOrder: 20
---

# F28075控制核心教学工程

本工程只包含可由桌面GCC验证的纯C控制与安全逻辑，不包含公司控制板引脚、真实PWM频率、实际保护阈值或产品通信协议。

## 分层

- `per_unit`：物理量与标幺转换；
- `control_primitives`：PI、跟踪和抗积分饱和；
- `vienna_gate_check`：Vienna三相逻辑门极范围检查；
- `ttype_gate_check`：T型P/O/N状态到四路门极的唯一映射；
- `dc_branch_gate_check`：明确禁止`SP=S0=SM=1`；
- `hardware_protection`：故障锁存和PWM封锁抽象；
- `ups_state_machine`：预充、整流、逆变、正常、降额和故障状态。

实际移植到TMS320F28075时，CMPSS、Digital Compare和Trip Zone必须直接作用于ePWM输出，不能由本工程的普通C函数替代硬件快速保护。
