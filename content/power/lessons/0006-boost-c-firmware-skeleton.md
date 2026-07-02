---
title: 教程 0006：Boost C 固件骨架
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0006-boost-c-firmware-skeleton.html
status: learning
visibility: public
summary: Imported from 0006-boost-c-firmware-skeleton.html
chapterOrder: 10
---

# 教程 0006：Boost C 固件骨架

中文主讲。一个概念：把 Boost 控制中断软件骨架拆成可阅读、可编译的简化 C 工程。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学代码，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 1. 它是什么

Boost C 固件骨架（Boost C firmware skeleton）是一个可编译的小型 C 工程，用来表达前一节 控制中断服务程序（control interrupt service routine / control ISR）的数据流。

  ADC 采样 -> 保护判断 -> 控制 ISR -> PWM 输出 -> 状态机锁存

这里的 模数转换器（analog-to-digital converter / ADC） 不连接真实硬件，只返回一组教学采样值。脉宽调制（pulse-width modulation / PWM） 也不驱动开关管，只保存并打印占空比命令。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）软件需要同时处理控制、保护、状态和硬件接口。你入职后读到的 C 工程很可能不是一个长函数，而是一组互相调用的模块。

    采样边界
adc.c 提供电压、电流采样。
    保护边界
protection.c 判断过压、欠压、过流。
    控制边界
control.c 计算占空比并决定是否关断。
    输出边界
pwm.c 接收占空比或执行强制关断。

## 3. 物理直觉

C 工程里的模块边界，本质上是在给能量流加安全门。采样值先经过保护门，只有确认安全，比例积分控制器（proportional-integral controller / PI）才允许计算新的占空比。只要检测到过压，软件立刻进入故障状态并关断 PWM。

    adc.c
    AdcSample

    protection.c
    Fault check

    control.c
    Boost_ControlIsr

    pwm.c
    Duty / Off

    state_machine.c
    RUN / FAULT

    fault -> PWM off

图 1：教学 C 骨架的模块边界。真实工程会增加硬件抽象层（hardware abstraction layer / HAL）、通信、日志和参数管理。

## 4. 数学形式

本节仍然只讲一个概念：保护优先的控制 ISR。核心伪代码如下：

  fault = Protection_Check(sample, config)
if fault != NONE:
    runtime.fault = fault
    runtime.state = FAULT
    Pwm_ForceOff()
else:
    error = Vref - Vout
    integrator = clamp(integrator + Ki * error * Ts)
    duty = clamp(Kp * error + integrator)
    Pwm_SetDuty(duty)

数学上，PI 只是后半段：`D[k] = clamp(Kp * e[k] + I[k])`。工程上，保护判断和状态锁存决定这条公式有没有资格执行。

## 5. 一个仿真任务与仿真观察

这里的一个仿真任务是编译并运行一个 C 教学程序。它不会生成图片，因为本节重点是代码结构和状态输出；前面五节的 Python 仿真仍用于观察波形。

  cd E:\gitee_CodeStorage\学习\电源
gcc -std=c99 -Wall -Wextra -Werror -I projects\02-boost-c-firmware-skeleton\src projects\02-boost-c-firmware-skeleton\src\*.c -o projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe
projects\02-boost-c-firmware-skeleton\boost_c_firmware_skeleton.exe

    观察点

- `tick=00` 到 `tick=02`：状态应为 `RUN`，故障为 `NONE`，PWM 非零。

- `tick=03`：教学 ADC 采样给出 `vout=132.0`，超过过压阈值，进入 `FAULT`。

- `tick=04`：即使采样恢复到 `vout=90.0`，故障仍锁存，`pwm=0.000`。

## 6. 固件落地

阅读真实 C 工程时，可以沿着这些入口找：

- `boost_types.h`：先看采样、配置、运行状态和故障码结构。

- `control.c -> Boost_ControlIsr()`：看控制 ISR 顺序。

- `protection.c -> Protection_Check()`：看保护阈值和故障码。

- `pwm.c -> Pwm_SetDuty()/Pwm_ForceOff()`：看正常输出和安全关断接口。

- `state_machine.c -> StateMachine_Step()`：看状态如何进入故障。

## 7. 常见误解

- **误解：**C 工程只是 Python 控制函数翻译。
**纠正：**C 工程更重视模块边界、状态保存、实时调度和硬件接口。

- **误解：**保护可以放在 PI 后面。
**纠正：**危险采样应先触发关断，不能先计算新的 PWM 命令。

- **误解：**故障后采样恢复就应自动运行。
**纠正：**严重故障通常锁存，复位需要状态机条件。

## 8. 验收标准

- 能解释 `Boost_ControlIsr()` 的输入、状态、配置和输出。

- 能说出为什么保护判断在控制计算之前。

- 能根据终端输出指出过压发生在哪个 tick。

- 能解释为什么 `tick=04` 仍然是 `FAULT`。

- 能用 `control.c` 和 `pwm.c` 准备具体导师问题。

## 9. 复盘问题

- `tick=03` 的 `vout` 是多少？为什么触发过压？

- 如果把 `Protection_Check()` 放到 PI 计算之后，最坏会发生什么？

- `Pwm_SetDuty()` 和 `Pwm_ForceOff()` 为什么应该分成两个接口？

## 10. 导师问题

- 我用 `projects/02-boost-c-firmware-skeleton/src/control.c` 看到 `Boost_ControlIsr()` 先执行保护再更新 PWM。公司工程里控制 ISR 的顺序是否类似？

- 我看到 `pwm.c` 中教学代码把正常占空比输出和强制关断分开。真实工程里软件关断和硬件保护关断如何分工？

- 我看到 `boost_types.h` 把配置、采样和运行状态分开。公司工程里参数表、实时变量和故障状态通常怎么组织？

**下一步：**先不要跳到 PFC 或逆变器。把这个 C 骨架里的每个结构体字段标注清楚，再回看 Python 仿真图，确认“波形现象”和“软件状态”能互相对应。

关联：[上一节：Boost 控制中断软件骨架](0005-boost-firmware-skeleton.html)；源稿：`concepts/embedded/boost-c-firmware-skeleton.md`。

    上一节：教程 0005：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架
    下一节：教程 0007：Boost 故障锁存与复位状态机
