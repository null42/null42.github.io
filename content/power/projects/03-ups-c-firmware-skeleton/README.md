---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 项目 03：UPS C 固件骨架（UPS C Firmware Skeleton）
tags:
  - power-electronics
status: learning
summary: 把 `simulations/python/ups_mode_state_machine.py` 里的系统模式状态机迁移成一个可编译的简化 C 工程，帮助你阅读完整 UPS 工程代码时先抓住模块边界。
---

# 项目 03：UPS C 固件骨架（UPS C Firmware Skeleton）

## 目标

把 `simulations/python/ups_mode_state_machine.py` 里的系统模式状态机迁移成一个可编译的简化 C 工程，帮助你阅读完整 UPS 工程代码时先抓住模块边界。

本项目不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。所有输入序列和参数都是教学用的简化示例。

## 学习重点

- UPS 模式状态机（UPS mode state machine）如何串起在线模式、电池模式、旁路模式和故障模式。
- 控制中断服务程序（control interrupt service routine / control ISR）之外，系统级状态机如何决定输出许可。
- 脉宽调制（pulse-width modulation / PWM）许可、DC-DC 许可、PFC 许可和旁路模式（bypass mode）接触器许可如何由模式统一生成。
- UPS C 参数表（UPS C parameter table）如何集中保存教学阈值、保持时间和控制周期，便于阅读和向导师提问。
- UPS 保护标志（UPS protection flags）如何把采样值和参数表组合成欠压、过压、旁路不同步和停机请求。
- 保护去抖（protection debounce）和故障锁存（fault latch）如何把瞬时保护标志变成稳定故障状态。
- 系统故障闭环（system fault closure）如何把故障锁存接回模式状态机和输出许可。
- 故障码（fault code）和故障日志（fault log）如何记录故障发生时间、触发源、模式和锁存状态。
- 遥测（telemetry）通信帧如何把模式、故障码、时间戳和输出使能状态上报为外部可检查证据。
- 命令解析（command parsing）和安全门控（safety gating）如何把外部命令转换成内部意图，并阻止不安全的清故障请求。
- 命令响应（command response）如何用响应码和拒绝原因区分读状态成功、清故障被接受和清故障被拒绝。
- 参数访问（parameter access）如何区分只读、可读写和越界拒绝，避免通信写参数直接改 C 变量。
- 参数保存（parameter storage）如何用版本、有效标志和校验和判断 NVM 记录是否可信，并在失败时恢复默认值。
- 参数保存触发策略（parameter save scheduler）如何用脏标志、延时提交和最小保存间隔避免每次参数写入都立刻保存。

## 文件结构

```text
src/ups_types.h             公共类型、模式、输入、输出和运行状态
src/inputs.c/.h             教学场景输入序列
src/mode_state_machine.c/.h UPS 模式状态机
src/outputs.c/.h            模式到执行器许可的映射
src/parameters.c/.h         教学参数表，不包含公司内部参数
src/protection.c/.h         教学保护判断，不包含公司内部保护阈值
src/fault_latch.c/.h        教学保护去抖和故障锁存，不包含公司内部故障策略
src/system_step.c/.h        教学系统仲裁，不包含公司内部系统仲裁策略
src/fault_log.c/.h          教学故障码和日志事件，不包含公司内部故障码
src/telemetry.c/.h          教学遥测通信帧，不包含公司内部通信协议
src/command_parser.c/.h     教学命令解析和安全门控，不包含公司内部通信命令
src/command_response.c/.h   教学命令响应和拒绝原因，不包含公司内部通信响应码
src/parameter_access.c/.h   教学参数访问边界，不包含公司内部参数访问表
src/parameter_storage.c/.h  教学参数保存和默认值恢复，不包含公司内部NVM格式
src/parameter_save_scheduler.c/.h 教学参数保存触发策略，不包含公司内部保存策略
src/main.c                  运行 9 个 tick 并打印证据
```

## 编译和运行

在 PowerShell 中：

```powershell
cd E:\gitee_CodeStorage\学习\电源
gcc -std=c99 -Wall -Wextra -Werror -I projects\03-ups-c-firmware-skeleton\src projects\03-ups-c-firmware-skeleton\src\*.c -o projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
```

预期现象：

- 程序先打印教学参数表：`mains_uv=180.0V`、`dc_bus_ov=420.0V`、`bypass_hold=30ms`、`isr=100us`。
- 程序随后打印教学保护标志：`mains_uv=1`、`dc_bus_ov=1`、`bypass_not_sync=1`、`shutdown=1`。
- 程序继续打印故障锁存演示：短毛刺不锁存、连续故障锁存、安全复位后清除。
- 程序继续打印系统故障闭环：锁存故障强制 `FAULT` 并关闭输出，安全复位后回到 `ONLINE`。
- 程序继续打印教学故障日志：时间戳、故障码、触发源、模式和锁存状态。
- 程序继续打印教学遥测通信帧：序号、时间戳、模式、故障码和四个输出使能状态。
- 程序继续打印教学命令解析：读状态请求产生遥测回复，不安全清故障被拦截，安全清故障被允许。
- 程序继续打印教学命令响应：读状态返回 `OK`，不安全清故障返回 `REJECTED / NOT_SAFE_TO_CLEAR`，安全清故障返回 `ACCEPTED`。
- 程序继续打印教学参数访问：可读写参数能读，写只读参数被拒绝，越界写入被拒绝，合法写入被接受。
- 程序继续打印教学参数保存：有效记录加载保存值，损坏记录校验失败后恢复默认值。
- 程序继续打印教学参数保存触发策略：0 ms 和 20 ms 两次写入被合并，80 ms 触发一次保存并清除脏标志。
- tick 00：`ONLINE`，PFC 和逆变 PWM 允许。
- tick 02：市电异常后进入 `BATTERY`，DC-DC 和逆变 PWM 允许。
- tick 04：电池不可用且旁路同步后进入 `BYPASS`，旁路接触器允许，逆变 PWM 关闭。
- tick 06：逆变器故障且旁路不可用后进入 `FAULT`，所有输出关闭并故障锁存。
- tick 08：复位请求且市电恢复后回到 `ONLINE`。

## 验收标准

- 能指出 `UpsModeStateMachine_Step()` 的输入、状态和输出。
- 能解释为什么输出许可集中由 `UpsOutputs_FromMode()` 生成。
- 能解释为什么教学阈值集中由 `UpsParameters_GetDefault()` 返回。
- 能解释为什么保护判断集中由 `UpsProtection_Evaluate()` 产生标志。
- 能解释为什么故障锁存由 `UpsFaultLatch_Step()` 负责，而不是直接用瞬时故障标志停机。
- 能解释为什么系统仲裁由 `UpsSystem_Step()` 把故障锁存、模式状态机和输出许可串起来。
- 能解释为什么故障日志由 `UpsFaultLog_Record()` 记录故障码、时间戳、触发源和模式。
- 能解释为什么遥测通信帧由 `UpsTelemetry_BuildFrame()` 把内部状态转换成外部可观察证据。
- 能解释为什么命令解析由 `UpsCommand_Parse()` 产生内部意图，再由 `UpsCommand_ApplySafetyGate()` 决定清故障请求是否允许落地。
- 能解释为什么命令响应由 `UpsCommandResponse_FromCommand()` 把命令处理结果转换成外部可诊断的响应码和拒绝原因。
- 能解释为什么参数访问由 `UpsParameter_Read()` 和 `UpsParameter_Write()` 集中处理访问策略、范围校验和写入结果。
- 能解释为什么参数保存由 `UpsParameterStorage_Save()` 和 `UpsParameterStorage_LoadOrDefault()` 管理版本、有效标志、校验和和默认值恢复。
- 能解释为什么参数保存触发策略由 `UpsParameterSaveScheduler_ShouldSave()` 管理脏标志、延时提交和最小保存间隔。
- 能解释故障锁存为什么不能靠输入恢复自动清除。
- 能基于 `mode_state_machine.c -> UpsModeStateMachine_Step()` 向导师询问真实工程的模块边界。
- 能基于 `parameters.c -> UpsParameters_GetDefault()` 向导师询问真实工程的参数表组织方式，但不能记录公司内部参数。
- 能基于 `protection.c -> UpsProtection_Evaluate()` 向导师询问真实工程中采样、参数和保护标志之间的边界。
- 能基于 `fault_latch.c -> UpsFaultLatch_Step()` 向导师询问真实工程中保护去抖、锁存和复位条件的组织方式。
- 能基于 `system_step.c -> UpsSystem_Step()` 向导师询问真实工程中故障闭环和输出许可仲裁的模块边界。
- 能基于 `fault_log.c -> UpsFaultLog_Record()` 向导师询问真实工程中故障码、日志字段和持久化策略，但不能记录公司内部故障码。
- 能基于 `telemetry.c -> UpsTelemetry_BuildFrame()` 向导师询问真实工程中通信上报字段、周期和故障上报入口，但不能记录公司内部通信协议。
- 能基于 `command_parser.c -> UpsCommand_ApplySafetyGate()` 向导师询问真实工程中命令解析、安全门控和清故障条件的组织方式，但不能记录公司内部通信命令。
- 能基于 `command_response.c -> UpsCommandResponse_FromCommand()` 向导师询问真实工程中响应码、拒绝原因和故障码之间的边界，但不能记录公司内部通信响应码。
- 能基于 `parameter_access.c -> UpsParameter_Write()` 向导师询问真实工程中参数访问权限、范围校验和写入失败反馈方式，但不能记录公司内部参数访问表。
- 能基于 `parameter_storage.c -> UpsParameterStorage_LoadOrDefault()` 向导师询问真实工程中参数保存、校验、默认值恢复和上报告警的组织方式，但不能记录公司内部NVM格式。
- 能基于 `parameter_save_scheduler.c -> UpsParameterSaveScheduler_ShouldSave()` 向导师询问真实工程中参数保存触发、系统模式约束和掉电检测之间的边界，但不能记录公司内部保存策略。
