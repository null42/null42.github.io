---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 命令响应与拒绝原因（command response and reject reason）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0033-ups-command-response.html` 的源稿和补充资料。它只使用教学响应码，不包含公司内部通信响应码、协议错误码、客户项目参数或未公开产品方案。
---

# 概念：UPS 命令响应与拒绝原因（command response and reject reason）

本页是 `lessons/0033-ups-command-response.html` 的源稿和补充资料。它只使用教学响应码，不包含公司内部通信响应码、协议错误码、客户项目参数或未公开产品方案。

## 它是什么

命令响应（command response）是固件处理外部命令后返回给外部工具的结果说明。响应码（response code）说明命令处理结果，例如 `OK`、`ACCEPTED`、`REJECTED`。拒绝原因（reject reason）说明为什么命令没有被执行，例如 `NOT_SAFE_TO_CLEAR`。

本课只讲一个概念：命令被拒绝时也要返回可诊断原因，而不是让外部工具猜。

## 为什么 UPS 需要它

上一节讲了命令解析（command parsing）和安全门控（safety gating）。安全门控拒绝清故障请求后，外部工具还需要知道“是通信坏了、命令错了，还是安全条件不满足”。没有响应码，调试人员会把安全拒绝误判成通信故障。

UPS 中很多命令会影响故障锁存、输出许可或模式切换。响应码能把“命令已看懂”和“动作是否执行”分开表达。

## 物理直觉

命令响应像值班工程师给外部工具回话：读状态请求可以说“OK”；不安全的清故障请求要说“拒绝，原因是当前不安全”；安全条件满足后的清故障请求可以说“已接受”。

## 数学形式

```text
parsed = parse(raw_command)
gated = apply_safety_gate(parsed, safe_to_clear_fault)

if parsed.type == READ_STATUS:
    response_code = OK
    reject_reason = NONE

if parsed.type == CLEAR_FAULT_REQUEST and gated.request_clear_fault:
    response_code = ACCEPTED
    reject_reason = NONE

if parsed.type == CLEAR_FAULT_REQUEST and not gated.request_clear_fault:
    response_code = REJECTED
    reject_reason = NOT_SAFE_TO_CLEAR
```

本课只建三个教学响应码，不实现真实协议的异常码表。

## 仿真观察

运行：

```powershell
python simulations\python\ups_command_response.py --no-open
```

默认生成：

```text
simulations/results/ups_command_response.png
```

图中包含命令类型、响应码和拒绝原因。图内参数框说明：0 ms 读状态返回 `OK`，20 ms 不安全清故障返回 `REJECTED / NOT_SAFE_TO_CLEAR`，40 ms 安全清故障返回 `ACCEPTED`。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `UpsCommandResponseCode`：教学响应码枚举。
- `UPS_RESPONSE_OK`：读状态这类不改变安全状态的命令处理成功。
- `UPS_RESPONSE_ACCEPTED`：需要执行的命令已被接受。
- `UPS_RESPONSE_REJECTED`：命令被拒绝。
- `UpsRejectReason`：教学拒绝原因枚举。
- `UPS_REJECT_REASON_NOT_SAFE_TO_CLEAR`：当前不满足清故障安全条件。
- `UpsCommandResponse_FromCommand()`：根据原始命令、安全门控后的命令和安全条件生成响应。
- `UpsCommandResponse_Print()`：打印可检查证据。

真实工程可能还会包含协议校验失败、权限不足、参数越界、忙碌、超时和版本不匹配等响应。本课只训练最小阅读路径。

## 常见误解

- 错误理解：命令被拒绝就不用回复。  
  正确理解：拒绝也应该尽量说明原因，否则外部工具无法区分安全拒绝和通信故障。
- 错误理解：响应码等于故障码。  
  正确理解：故障码描述设备故障；响应码描述通信命令处理结果。
- 错误理解：可以把导师给的真实响应码表记到学习仓库。  
  正确理解：不能记录公司内部通信响应码，只能记录通用分类方法。

## 验收标准

- 能运行 `python simulations\python\ups_command_response.py --no-open` 并打开 `simulations/results/ups_command_response.png`。
- 能解释响应码和拒绝原因的区别。
- 能解释为什么 `REJECTED` 不是通信失败，而是一个明确处理结果。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `command_response` 输出。
- 能基于 `command_response.c -> UpsCommandResponse_FromCommand()` 准备导师问题。

## 导师问题

- 我用 `command_response.c -> UpsCommandResponse_FromCommand()` 区分 `OK`、`ACCEPTED` 和 `REJECTED`。真实工程里通常如何区分“已收到”“已执行”和“拒绝执行”？
- 我用 `simulations/results/ups_command_response.png` 看到不安全清故障返回 `NOT_SAFE_TO_CLEAR`。真实工程中拒绝原因通常会细分到什么程度？
- 我不会记录公司内部通信响应码，只想确认阅读方式：看真实工程时，响应码表、命令解析表和故障码表应该分开看还是合在一起看？
