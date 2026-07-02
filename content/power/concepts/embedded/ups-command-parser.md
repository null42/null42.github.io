---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 命令解析与安全门控（command parsing and safety gating）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0032-ups-command-parser.html` 的源稿和补充资料。它只使用教学命令，不包含公司内部通信命令、寄存器地址、客户项目参数或未公开产品方案。
---

# 概念：UPS 命令解析与安全门控（command parsing and safety gating）

本页是 `lessons/0032-ups-command-parser.html` 的源稿和补充资料。它只使用教学命令，不包含公司内部通信命令、寄存器地址、客户项目参数或未公开产品方案。

## 它是什么

命令解析（command parsing）是把外部通信收到的文本、字节或寄存器请求转换成固件内部动作意图的过程。安全门控（safety gating）是在动作真正生效前，再检查系统是否满足安全条件。

本课只讲一个概念：通信命令不能直接改安全状态。教学命令只包含两类：

- `READ_STATUS`：请求遥测（telemetry）回复。
- `CLEAR_FAULT_REQUEST`：清故障请求（clear fault request），必须经过安全门控后才能变成真正的清故障动作。

## 为什么 UPS 需要它

UPS 通信模块会收到外部工具、监控系统或调试脚本发来的请求。如果通信命令绕过保护逻辑，直接清除故障锁存（fault latch）或打开输出，就会破坏系统安全边界。

因此阅读 UPS C 工程时，要把“收到命令”和“执行命令”分开看：命令解析只产生意图，安全门控决定这个意图是否允许落地。

## 物理直觉

命令解析像门卫看懂访客想做什么；安全门控像值班工程师判断现在能不能放行。访客说“我要清故障”并不代表设备立刻清故障，必须满足市电、负载、输出、故障原因等安全条件。

## 数学形式

```text
command = parse(raw_command)

if command.type == READ_STATUS:
    request_telemetry_reply = 1

if command.type == CLEAR_FAULT_REQUEST:
    request_clear_fault = 1

if request_clear_fault and not safe_to_clear_fault:
    request_clear_fault = 0
```

本课只用一个布尔量 `safe_to_clear_fault` 表示安全条件，真实工程可能由模式、输出反馈、故障原因、保持时间和人工确认共同决定。

## 仿真观察

运行：

```powershell
python simulations\python\ups_command_parser.py --no-open
```

默认生成：

```text
simulations/results/ups_command_parser.png
```

图中包含命令类型、遥测回复请求、清故障请求和安全门控状态。图内参数框说明命令序列：20 ms 的不安全清故障被拒绝，60 ms 的安全清故障被接受。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `UpsCommandType`：教学命令类型。
- `UPS_COMMAND_READ_STATUS`：读取状态命令。
- `UPS_COMMAND_CLEAR_FAULT_REQUEST`：清故障请求命令。
- `UpsCommand`：解析后的内部命令意图。
- `request_telemetry_reply`：是否需要回复通信帧（communication frame）。
- `request_clear_fault`：是否请求清除故障锁存。
- `UpsCommand_Parse()`：把原始命令转换成内部意图。
- `UpsCommand_ApplySafetyGate()`：在安全条件不满足时拦截清故障请求。

真实工程中还会有校验、超时、权限、主从地址、协议状态机和错误响应。本课不实现真实协议，只训练“解析”和“安全门控”的边界。

## 常见误解

- 错误理解：通信命令解析成功就应该立即执行。  
  正确理解：解析成功只说明看懂了命令，不代表动作安全。
- 错误理解：清故障只是把标志清零。  
  正确理解：清故障会影响系统重新启动和输出许可，必须经过安全条件检查。
- 错误理解：可以把导师给的真实命令字记到学习仓库。  
  正确理解：不能记录公司内部通信命令，只能记录通用解析流程和安全边界。

## 验收标准

- 能运行 `python simulations\python\ups_command_parser.py --no-open` 并打开 `simulations/results/ups_command_parser.png`。
- 能解释命令解析和安全门控的区别。
- 能解释为什么 `CLEAR_FAULT_REQUEST` 不能直接清除故障锁存。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `command_parser` 输出。
- 能基于 `command_parser.c -> UpsCommand_ApplySafetyGate()` 准备导师问题。

## 导师问题

- 我用 `command_parser.c -> UpsCommand_ApplySafetyGate()` 把清故障请求和安全条件分开。真实工程里清故障通常需要检查哪些通用条件？
- 我用 `simulations/results/ups_command_parser.png` 看到不安全清故障被拒绝。真实工程中拒绝命令时通常会回复错误码、保持沉默，还是上报当前状态？
- 我不会记录公司内部通信命令，只想确认阅读方式：看真实工程通信模块时，应先找命令解析表、安全门控入口，还是故障复位流程？
