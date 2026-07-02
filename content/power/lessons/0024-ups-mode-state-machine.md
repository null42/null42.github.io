---
title: 教程 0024：UPS 模式状态机
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0024-ups-mode-state-machine.html
status: learning
visibility: public
summary: Imported from 0024-ups-mode-state-machine.html
chapterOrder: 10
---

# 教程 0024：UPS 模式状态机

中文主讲。一个概念：把市电、旁路、电池、逆变器故障和输出许可放进同一个 UPS 模式状态机，形成阅读 C 工程的主线。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学脚本和教学参数，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 1. 它是什么

UPS 模式状态机（UPS mode state machine）是把不间断电源（uninterruptible power supply / UPS）的工作模式组织成明确状态、转换条件和输出许可的软件结构。

这里的状态机（state machine）只保留四个入门状态：

- 在线模式（online mode）：市电正常，PFC 与逆变器供电。

- 电池模式（battery mode）：市电异常，电池经 DC-DC 支撑直流母线，逆变器供电。

- 旁路模式（bypass mode）：负载由旁路供电，逆变 PWM 关闭。

- 故障模式：危险条件锁存，输出许可关闭，等待复位条件。

## 2. 为什么 UPS 需要它

UPS 同时要处理市电、旁路、电池、逆变器、保护和通信。如果这些条件散落在很多 `if` 语句里，读 C 工程时很难判断系统现在处于什么模式、允许什么输出、为什么不能切换。

模式状态机是系统级代码的主干。前面的锁相环（phase-locked loop / PLL）、旁路同步、逆变器保护和调度课程，最终都会汇入这里。

## 3. 物理直觉

状态机像列车调度。市电正常时走在线轨道；市电丢失时切到电池轨道；电池不足但旁路同步时切到旁路轨道；没有安全供电路径时进入故障轨道并锁住，不能靠瞬时信号自己跳回来。

    ONLINE
    PFC + 逆变

    BATTERY
    DC-DC + 逆变

    BYPASS
    旁路供电

    FAULT
    故障锁存

    市电丢失

    电池低且旁路同步

    无安全供电路径

    旁路失步/故障

    复位 + 安全输入

图 1：入门级 UPS 模式状态机，只保留阅读工程时最常见的主线。

## 4. 数学形式

  if mode == ONLINE:
    if not mains_ok after delay:
        mode = BATTERY if battery_ok else BYPASS if bypass_sync else FAULT

if mode == BATTERY:
    if battery_low:
        mode = BYPASS if bypass_sync else FAULT
    if mains_ok:
        mode = ONLINE

if mode == BYPASS:
    if mains_ok:
        mode = ONLINE
    if not bypass_sync and not battery_ok:
        mode = FAULT

if mode == FAULT:
    outputs disabled until reset_request and safe input

这里的输出包括 PFC 许可、DC-DC 许可、逆变器脉宽调制（pulse-width modulation / PWM）许可、旁路接触器许可和故障锁存（fault latch）。

## 5. 一个仿真任务与仿真观察

运行：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_mode_state_machine.py

脚本会生成并默认尝试自动打开图片；如果打不开，会打印完整路径。

    产物

- `simulations/results/ups_mode_state_machine.png`

    对比任务
    python simulations\python\ups_mode_state_machine.py --bypass-sync-time 0.40 --bypass-loss-time 0.41 --output simulations\results\ups_mode_no_safe_bypass.png
python simulations\python\ups_mode_state_machine.py --transfer-delay 0.050 --output simulations\results\ups_mode_delay_50ms.png

第一条命令观察电池低且没有安全旁路时如何进入故障；第二条命令观察切换延时变长后，模式变化时刻如何推迟。

默认事件顺序：

- 80 ms：市电丢失，延时后进入电池模式。

- 180 ms：电池不可用，若旁路同步则延时后进入旁路模式。

- 270 ms：逆变器故障且旁路已失去同步，进入故障模式。

- 380 ms：复位请求到来，市电已恢复，回到在线模式。

## 6. 固件落地

真实 C 工程中可按这些模块找：

- `mode_state_machine.c`：模式状态机和转换条件。

- `protection.c`：故障锁存与复位条件。

- `bypass_sync.c`：旁路同步许可。

- `pwm.c`：PWM 输出许可。

- `contactors.c`：旁路接触器、输入接触器和输出继电器命令。

- `communication.c`：把当前模式、故障码和许可状态上报。

## 7. 常见误解

- **误解：**模式切换就是把几个继电器打开或关闭。
**纠正：**继电器只是输出，背后要先满足输入条件、保护条件、同步条件和延时条件。

- **误解：**故障消失就自动回在线。
**纠正：**严重故障通常需要故障锁存和明确复位请求。

- **误解：**旁路同步只属于 PLL 课程。
**纠正：**PLL 提供相位信息，状态机决定能否真的切换供电路径。

## 8. 验收标准

- 能解释在线、电池、旁路、故障四个模式的区别。

- 能说明每个模式下 PFC、DC-DC、逆变 PWM、旁路接触器的许可状态。

- 能根据图指出市电丢失、电池低、旁路失步、逆变故障和复位请求各自造成的模式变化。

- 能基于图和脚本准备导师问题。

## 9. 复盘问题

- 默认仿真中，ONLINE、BATTERY、BYPASS、FAULT 分别出现在什么时间段？

- 为什么 BYPASS 模式下逆变 PWM 关闭，但旁路接触器打开？

- 为什么进入 FAULT 后不能因为市电恢复就立刻回 ONLINE？

## 10. 导师问题

- 我用 `ups_mode_state_machine.py` 看到市电丢失后先进入电池模式，电池不可用且旁路同步后再进入旁路模式。公司工程里模式状态机一般由哪个模块负责？

- 我看到故障模式会关闭 PFC、DC-DC、逆变 PWM 和旁路接触器。真实产品里哪些故障会保留旁路供电，哪些故障会全关？

- 我在脚本里用了 `transfer delay=20 ms`。真实工程里模式切换延时通常来自继电器动作、静态开关时序，还是软件去抖？

**下一步：**这节把 UPS 系统软件主线搭起来。后续可以继续把这个状态机迁移成简化 C 工程，或者进入三电平逆变器、Vienna 整流器和 LLC 的高功率拓扑推导。

关联：[上一节：旁路同步与切换许可](0023-single-phase-bypass-sync-transfer.html)；源稿：`concepts/embedded/ups-mode-state-machine.md`。

    上一节：教程 0023：单相 UPS 旁路同步与切换许可
    下一节：教程 0025：UPS C 固件骨架
