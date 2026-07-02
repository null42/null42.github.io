---
title: 教程 0030：故障码与故障日志
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0030-ups-fault-code-logging.html
status: learning
visibility: public
summary: Imported from 0030-ups-fault-code-logging.html
chapterOrder: 10
---

# 教程 0030：故障码与故障日志

中文主讲。一个概念：故障闭环之后要留下可调试证据，记录什么故障、何时发生、由谁触发、当时处于什么模式。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学故障码和教学日志字段，不包含公司内部故障码、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

故障码（fault code）是给故障原因分配的可读编号或枚举。故障日志（fault log）是在故障发生时记录一条事件，通常包含时间戳（timestamp）、故障码、触发源（trigger source）、发生时模式和是否锁存。

本节只讲一个概念：故障闭环之后要留下可调试证据。

## 2. 为什么 UPS 需要它

UPS 现场问题常常不是“故障有没有发生”，而是“先发生了什么、谁触发的、当时处于什么模式”。没有故障日志，工程师只能靠用户描述、现象猜测和复现尝试。

教学日志让你建立阅读路径：故障码说明类别，时间戳说明发生时刻，触发源说明来自哪个模块，模式说明系统当时处于什么状态。

## 3. 物理直觉

故障锁存（fault latch）像拉下急停，故障日志像在值班记录本上写一行：什么时候、什么故障、谁报的警、当时设备处于什么运行状态。

## 4. 数学形式

  if latched_fault rises from 0 to 1:
    event.timestamp_ms = now_ms
    event.fault_code = detected_fault_code
    event.trigger_source = "protection module"
    event.mode_when_logged = current_mode
    event.latched_fault = 1

本课只记录单条教学事件，不实现环形缓冲区、Flash 保存或通信上传。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_fault_code_logging.py

只保存图片、不自动打开：

  python simulations\python\ups_fault_code_logging.py --no-open

    产物

- `simulations/results/ups_fault_code_logging.png`

- 终端输出：首次记录的故障码、日志时间戳、锁存期间是否只记录一次。

- 图内包含参数框、图例、故障码、日志脉冲和记录时模式。

观察顺序：先看保护故障触发锁存，再看日志脉冲只出现一次，然后看故障码变为 `DC_BUS_OV`，记录时模式为 FAULT。

## 6. 固件落地

- `UpsFaultCode`：教学故障码枚举。

- `UpsFaultLogEvent`：单条日志事件。

- `UpsFaultLog_Record()`：生成故障日志事件。

- `UpsFaultLog_Print()`：把事件打印成可检查证据。

真实工程还会涉及日志缓存、掉电保存、擦写寿命、通信读取、故障码版本兼容等问题，本节先不展开。

## 7. 常见误解

- **误解：**有故障锁存就不需要日志。
**纠正：**锁存告诉你系统停了，日志告诉你为什么停、什么时候停、谁触发。

- **误解：**日志越多越好。
**纠正：**嵌入式存储有限，日志要记录关键事件和关键字段。

- **误解：**导师给的真实故障码可以记进学习仓库。
**纠正：**不能记录公司内部故障码，只能记录通用组织方式和字段设计思路。

## 8. 验收标准

- 能运行 `python simulations\python\ups_fault_code_logging.py --no-open` 并打开 `simulations/results/ups_fault_code_logging.png`。

- 能解释故障码、时间戳、触发源、模式和锁存字段分别解决什么问题。

- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `fault_log` 输出。

- 能基于 `fault_log.c -> UpsFaultLog_Record()` 准备导师问题。

## 9. 复盘问题

- 为什么故障日志不能只记录“发生故障”四个字？

- 为什么触发源字段对阅读 C 工程很重要？

- 如果同一故障反复发生，是追加日志、覆盖日志还是增加计数？这三种方式各有什么取舍？

## 10. 导师问题

- 我用 `fault_log.c -> UpsFaultLog_Record()` 记录时间戳、故障码、触发源和模式。真实工程里故障日志通常还会记录哪些通用字段？

- 我用 `simulations/results/ups_fault_code_logging.png` 看到日志只在锁存时记录一次。真实工程里同一故障重复出现时会覆盖、追加还是计数？

- 我不会记录公司内部故障码，只想确认组织方式：真实工程里故障码是否有版本号、分类范围或通信协议映射？

**下一步：**可以继续补通信查询接口，让外部工具读取模式、故障码、最近日志和关键参数。

关联：[上一节：系统故障闭环](0029-ups-system-fault-closure.html)；源稿：`concepts/embedded/ups-fault-code-logging.md`；仿真：`simulations/python/ups_fault_code_logging.py`。

    上一节：教程 0029：系统故障闭环
    下一节：教程 0031：UPS 遥测通信帧
