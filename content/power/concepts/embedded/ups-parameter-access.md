---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 参数访问边界（parameter access boundary）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0034-ups-parameter-access.html` 的源稿和补充资料。它只使用教学参数访问表，不包含公司内部参数访问表、客户项目参数、未公开产品阈值或内部调试命令。
---

# 概念：UPS 参数访问边界（parameter access boundary）

本页是 `lessons/0034-ups-parameter-access.html` 的源稿和补充资料。它只使用教学参数访问表，不包含公司内部参数访问表、客户项目参数、未公开产品阈值或内部调试命令。

## 它是什么

参数访问（parameter access）是通信模块或调试工具读取、写入固件参数的边界层。它决定某个参数是只读（read-only）、可读写（read-write），以及写入值是否通过范围校验（range check）。

本课只讲一个概念：外部写参数不能直接改 C 变量，必须经过访问策略和范围校验。

## 为什么 UPS 需要它

UPS 的参数会影响保护阈值、控制周期、同步窗口和故障行为。如果外部工具可以随便写这些参数，轻则调试结果混乱，重则破坏保护边界。

因此参数表（parameter table）之外，还需要参数访问层：它把“参数是什么”“能不能写”“写入范围是多少”“拒绝原因是什么”集中管理。

## 物理直觉

参数访问层像设备柜门上的权限标签：有些旋钮只能看不能拧，有些旋钮可以调，但只能在红线范围内调。通信命令只是伸手去调，真正能不能调由参数访问层决定。

## 数学形式

```text
read(parameter_id):
    return value, access_policy

write(parameter_id, requested_value):
    if access_policy == READ_ONLY:
        return accepted = 0, reject_reason = READ_ONLY

    if requested_value < min or requested_value > max:
        return accepted = 0, reject_reason = OUT_OF_RANGE

    parameter.value = requested_value
    return accepted = 1, reject_reason = NONE
```

本课使用教学范围 `MAINS_UV_THRESHOLD_V = 120..240 V`，不代表任何真实产品阈值。

## 仿真观察

运行：

```powershell
python simulations\python\ups_parameter_access.py --no-open
```

默认生成：

```text
simulations/results/ups_parameter_access.png
```

图中包含参数编号、写入是否接受、拒绝原因和 `mains_uv_threshold_v` 的值变化。图内参数框说明：`CONTROL_ISR_PERIOD_US` 是只读，写入被拒绝；`MAINS_UV_THRESHOLD_V=90 V` 越界被拒绝；`MAINS_UV_THRESHOLD_V=170 V` 被接受。默认不加 `--no-open` 时脚本会尝试自动打开图片；打不开时会打印完整路径。

## 固件落地

- `UpsParameterId`：教学参数编号。
- `UPS_PARAMETER_MAINS_UV_THRESHOLD_V`：市电欠压阈值教学参数，可读写但有范围限制。
- `UPS_PARAMETER_CONTROL_ISR_PERIOD_US`：控制中断周期教学参数，只读。
- `UpsParameterAccess`：访问策略。
- `UPS_PARAMETER_ACCESS_READ_ONLY`：只读。
- `UPS_PARAMETER_ACCESS_READ_WRITE`：可读写。
- `UpsParameter_Read()`：读取参数值和访问策略。
- `UpsParameter_Write()`：执行写入前的只读检查和范围校验。
- `UpsParameterWriteResult`：写入是否接受和拒绝原因（reject reason）。

真实工程还会涉及掉电保存、参数版本、校验和、默认值恢复、权限、在线修改限制和写 Flash 寿命。本课先训练阅读边界。

## 常见误解

- 错误理解：通信写参数就是给变量赋值。  
  正确理解：写参数必须经过访问策略、范围校验和安全条件。
- 错误理解：只读参数没有必要出现在访问表里。  
  正确理解：只读参数也要能被外部读取，并明确拒绝写入。
- 错误理解：可以把导师给的真实参数范围记到学习仓库。  
  正确理解：不能记录公司内部参数访问表，只能记录通用组织方式和问题清单。

## 验收标准

- 能运行 `python simulations\python\ups_parameter_access.py --no-open` 并打开 `simulations/results/ups_parameter_access.png`。
- 能解释只读、可读写、范围校验和拒绝原因的区别。
- 能解释为什么控制周期这类参数通常不应被普通通信写入。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `parameter_access` 输出。
- 能基于 `parameter_access.c -> UpsParameter_Write()` 准备导师问题。

## 导师问题

- 我用 `parameter_access.c -> UpsParameter_Write()` 区分只读、可读写和越界拒绝。真实工程里参数访问表通常还会包含哪些通用字段？
- 我用 `simulations/results/ups_parameter_access.png` 看到越界写入不会改变参数值。真实工程中写入失败时通常会返回拒绝原因、当前值，还是两者都返回？
- 我不会记录公司内部参数范围，只想确认阅读方式：看真实工程时，应先看参数定义、访问权限表，还是通信写入入口？
