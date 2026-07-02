---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: UPS 持续提高路线（Continuous Learning Path）
tags:
  - power-electronics
status: learning
summary: 这份路线用于承接 `roadmap/30-day-plan.md` 之后的长期训练。30 天计划只负责打基础，不代表课程到第 30 天结束。后续仍然按“一个概念讲清楚 + 一个仿真任务 + 复盘问题 + 导师问题”的节奏推进。
---

# UPS 持续提高路线（Continuous Learning Path）

这份路线用于承接 `roadmap/30-day-plan.md` 之后的长期训练。30 天计划只负责打基础，不代表课程到第 30 天结束。后续仍然按“一个概念讲清楚 + 一个仿真任务 + 复盘问题 + 导师问题”的节奏推进。

## 总目标

长期目标保持三条主线：

- 能自行推导 UPS 相关拓扑的基本工作原理，包括 Boost、功率因数校正（power factor correction / PFC）、LLC 谐振变换器（inductor-inductor-capacitor resonant converter / LLC）、维也纳整流器（Vienna rectifier）和三电平逆变器（three-level inverter）。
- 能较顺畅阅读带有部分注释的完整 C 语言工程代码，理解控制中断、采样、脉宽调制（pulse-width modulation / PWM）、保护、状态机、通信和参数管理之间的关系。
- 能自行实现一个具备基本功能的简化 UPS 软件骨架，包括启动、采样、控制、保护判断、模式切换、故障锁存、通信接口和日志记录。

## 阶段 A：系统级 UPS 软件骨架

目标：把 Boost、PFC、锁相环（phase-locked loop / PLL）、逆变器、旁路、保护和通信串成一个可阅读的软件结构。

建议专题：

- UPS 模式状态机（UPS mode state machine）：市电模式、电池模式、旁路模式、故障模式；已开始用 `lessons/0024-ups-mode-state-machine.html` 和 `simulations/python/ups_mode_state_machine.py` 建立入门模型。
- 简化 UPS C 固件骨架（UPS C firmware skeleton）：已开始用 `lessons/0025-ups-c-firmware-skeleton.html` 和 `projects/03-ups-c-firmware-skeleton` 把模式状态机迁移到可编译、可运行、可提问的 C 工程结构。
- UPS C 参数表（UPS C parameter table）：已开始用 `lessons/0026-ups-c-parameter-table.html` 和 `projects/03-ups-c-firmware-skeleton/src/parameters.c` 训练阈值、保持时间和控制周期的集中阅读方式。
- UPS 保护标志（UPS protection flags）：已开始用 `lessons/0027-ups-c-protection-flags.html`、`simulations/python/ups_protection_flags.py` 和 `projects/03-ups-c-firmware-skeleton/src/protection.c` 训练“采样值 + 参数表 -> 保护标志”的阅读路径。
- 保护去抖与故障锁存（protection debounce and fault latch）：已开始用 `lessons/0028-ups-fault-latch-debounce.html`、`simulations/python/ups_fault_latch_debounce.py` 和 `projects/03-ups-c-firmware-skeleton/src/fault_latch.c` 训练“瞬时标志 -> 确认故障 -> 锁存 -> 安全复位”的阅读路径。
- 系统故障闭环（system fault closure）：已开始用 `lessons/0029-ups-system-fault-closure.html`、`simulations/python/ups_system_fault_closure.py` 和 `projects/03-ups-c-firmware-skeleton/src/system_step.c` 训练“故障锁存 -> 模式强制 -> 输出关闭 -> 安全复位”的系统仲裁路径。
- 故障码与故障日志（fault code and fault log）：已开始用 `lessons/0030-ups-fault-code-logging.html`、`simulations/python/ups_fault_code_logging.py` 和 `projects/03-ups-c-firmware-skeleton/src/fault_log.c` 训练“故障发生 -> 编码 -> 记录时间戳和触发源 -> 导师复盘”的阅读路径。
- 遥测通信帧（telemetry communication frame）：已开始用 `lessons/0031-ups-telemetry-frame.html`、`simulations/python/ups_telemetry_frame.py` 和 `projects/03-ups-c-firmware-skeleton/src/telemetry.c` 训练“状态机/故障日志/输出许可 -> 外部可观察上报”的阅读路径。
- 命令解析与安全门控（command parsing and safety gating）：已开始用 `lessons/0032-ups-command-parser.html`、`simulations/python/ups_command_parser.py` 和 `projects/03-ups-c-firmware-skeleton/src/command_parser.c` 训练“外部命令 -> 内部意图 -> 安全条件允许后执行”的阅读路径。
- 命令响应与拒绝原因（command response and reject reason）：已开始用 `lessons/0033-ups-command-response.html`、`simulations/python/ups_command_response.py` 和 `projects/03-ups-c-firmware-skeleton/src/command_response.c` 训练“命令处理结果 -> 响应码 -> 拒绝原因”的阅读路径。
- 参数访问边界（parameter access boundary）：已开始用 `lessons/0034-ups-parameter-access.html`、`simulations/python/ups_parameter_access.py` 和 `projects/03-ups-c-firmware-skeleton/src/parameter_access.c` 训练“参数表 -> 只读/可写策略 -> 范围校验 -> 写入结果”的阅读路径。
- 参数保存与默认值恢复（parameter storage and default restore）：已开始用 `lessons/0035-ups-parameter-storage.html`、`simulations/python/ups_parameter_storage.py` 和 `projects/03-ups-c-firmware-skeleton/src/parameter_storage.c` 训练“参数快照 -> NVM 记录 -> 校验和 -> 默认值恢复”的阅读路径。
- 参数保存触发策略（parameter save scheduler）：已开始用 `lessons/0036-ups-parameter-save-scheduler.html`、`simulations/python/ups_parameter_save_scheduler.py` 和 `projects/03-ups-c-firmware-skeleton/src/parameter_save_scheduler.c` 训练“参数写入 -> 脏标志 -> 延时提交 -> 合并保存”的阅读路径。
- 直流母线协调（DC bus coordination）：PFC、DC-DC、电池和逆变器之间的功率平衡。
- 旁路同步与切换（bypass synchronization and transfer）：电压、频率、相位窗口和保持时间。
- 简化 C 工程骨架后续扩展：启动、采样、控制、保护、故障锁存、通信接口、参数表和日志。

## 阶段 B：高功率拓扑推导

目标：不只会看结论，而是能自己从开关状态、能量流和平均模型推导核心关系。

建议专题：

- 维也纳整流器（Vienna rectifier）：三相输入电流、三电平开关状态、中点电压平衡。
- 三电平逆变器（three-level inverter）：中点钳位（neutral-point clamped / NPC）、空间矢量调制（space vector pulse-width modulation / SVPWM）、中点平衡。
- LLC 谐振变换器（inductor-inductor-capacitor resonant converter / LLC）：谐振腔频率响应、软开关、轻载跳频或脉冲控制边界。
- 双向 DC-DC 变换器（bidirectional DC-DC converter）：电池充放电、限流、预充和方向切换。

## 阶段 C：仿真能力升级

目标：从单脚本波形观察，升级到可复现实验、参数扫描和模型对比。

建议专题：

- Python 参数扫描：自动生成多组图，文件名和图内参数框说明条件。
- MATLAB/Simulink 平均模型：先建平均模型，再逐步加入开关模型。
- 控制器离散化：连续 PI/PR 到离散实现，含限幅、抗积分饱和和采样延迟。
- 故障注入：过压、欠压、过流、PLL 失锁、旁路相位跳变。

## 阶段 D：资料和视频阅读方式

目标：逐步提高阅读英文资料和工程资料的能力，但仍坚持中文主讲。

使用规则：

- 先用中文写“这份资料解决什么问题、我只看哪几页或哪几节”。
- 把关键术语整理成中英对照，例如锁相环（phase-locked loop / PLL）和脉宽调制（pulse-width modulation / PWM）。
- 看视频时必须产出一张结构图、一段推导或一个仿真复现，不能只记标题。
- 推荐资料必须记录到 `RESOURCES.md`，并标注适合的学习阶段、主题和可信度。

## 阶段 E：导师复盘闭环

每次问导师前，至少准备一个具体产物：

- 一张仿真图，例如 `simulations/results/single_phase_bypass_sync_transfer.png`。
- 一段代码片段，例如控制 ISR、状态机或保护判断。
- 一个参数表，例如同步窗口、保护阈值或采样频率。
- 一个明确卡点，例如“为什么相位窗口满足后还要保持 30 ms”。

导师反馈不直接写入公司内部参数或项目细节，只记录通用原则、公开知识和自己的理解修正。
