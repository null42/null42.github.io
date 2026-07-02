---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS C 固件骨架（UPS C firmware skeleton）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0025-ups-c-firmware-skeleton.html` 的源稿和补充资料。它只使用教学代码和教学输入序列，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。向导师提问时也不能记录公司内部参数，不能记录公司内部通信协议，不能记录未公开故障码、内部测试数据或客户项目参数
---

# 概念：UPS C 固件骨架（UPS C firmware skeleton）

本页是 `lessons/0025-ups-c-firmware-skeleton.html` 的源稿和补充资料。它只使用教学代码和教学输入序列，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。向导师提问时也不能记录公司内部参数，不能记录公司内部通信协议，不能记录未公开故障码、内部测试数据或客户项目参数。

## 1. 它是什么

UPS C 固件骨架（UPS C firmware skeleton）是把 `0024` 中的不间断电源（uninterruptible power supply / UPS）模式状态机（UPS mode state machine）拆成接近 C 工程阅读方式的小工程。

本节只讲一个概念：用模块边界表达系统级状态机。本节只关注 C 工程骨架的模块边界；后续课程已经在同一项目目录继续叠加参数、保护、通信和保存模块，但 0025 先只抓输入、状态和输出许可这条主线。

```text
inputs -> mode_state_machine -> outputs -> main print
```

## 2. 为什么 UPS 需要它

真实 UPS 工程不会只有一个控制公式。即使控制中断服务程序（control interrupt service routine / control ISR）里有模数转换器（analog-to-digital converter / ADC）采样和控制，系统级代码仍需要决定当前是在线模式、电池模式、旁路模式（bypass mode）还是故障模式。

在线模式通常会允许功率因数校正（power factor correction / PFC）和逆变脉宽调制（pulse-width modulation / PWM），电池模式会允许 DC-DC 和逆变 PWM，故障模式会关闭关键输出。用状态机（state machine）集中表达这些模式，比把判断散落在多个文件里更容易审查。

如果先看一个简化 C 骨架，后续读真实工程时就能沿着模块边界追踪。

## 3. 物理直觉

Python 仿真像观察波形；C 骨架像看控制柜接线图。它不追求电路细节，而是回答：谁提供输入，谁决定模式，谁控制输出许可。

可以把它想成一组互锁开关：市电、电池、旁路同步和故障输入先进入状态判断；状态再决定 PFC、DC-DC、逆变 PWM 和旁路接触器能不能动作。故障锁存（fault latch）意味着故障不是输入一恢复就自动消失，而是需要安全条件和复位请求。

## 4. 数学形式

核心条件可以写成：

```c
if (mains_ok) {
    mode = UPS_MODE_ONLINE;
} else if (battery_ok) {
    mode = UPS_MODE_BATTERY;
} else if (bypass_synchronized) {
    mode = UPS_MODE_BYPASS;
} else {
    mode = UPS_MODE_FAULT;
}
```

输出许可：

```text
ONLINE  -> PFC=1, DC-DC=0, PWM=1, bypass=0
BATTERY -> PFC=0, DC-DC=1, PWM=1, bypass=0
BYPASS  -> PFC=0, DC-DC=0, PWM=0, bypass=1
FAULT   -> PFC=0, DC-DC=0, PWM=0, bypass=0
```

这段逻辑不是最终工程策略，而是一个训练骨架：先看清模式到输出许可的最短链路，再逐步叠加保护、参数、通信和日志。

## 5. 仿真任务与仿真观察

本节的仿真任务分两步：先运行上一节 Python 模式状态机仿真，得到带图中参数框的 `simulations/results/ups_mode_state_machine.png`；再编译 C 骨架，对照同一条模式序列是否被 C 代码表达清楚。

```powershell
python simulations\python\ups_mode_state_machine.py --no-open
gcc -std=c99 -Wall -Wextra -Werror -I projects\03-ups-c-firmware-skeleton\src projects\03-ups-c-firmware-skeleton\src\*.c -o projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
```

观察：

- `simulations/results/ups_mode_state_machine.png`：图中参数框包含采样频率、仿真时长、各输入切换时刻、转移延时和最终模式；每条曲线都有图例。
- `tick=00 mode=ONLINE`：在线模式，PFC 和逆变 PWM 允许。
- `tick=02 mode=BATTERY`：电池模式，DC-DC 和逆变 PWM 允许。
- `tick=04 mode=BYPASS`：旁路接触器允许，逆变 PWM 关闭。
- `tick=06 mode=FAULT`：所有输出关闭并故障锁存。
- `tick=08 mode=ONLINE`：复位请求且市电恢复，回到在线模式。

关键对照：Python 图帮助你看“模式随时间怎么变化”，C 输出帮助你看“工程文件如何生成同样的模式和输出许可”。

## 6. 固件落地

- `inputs.c`：教学输入序列，真实工程中对应采样、保护和同步判断结果。
- `mode_state_machine.c`：模式状态机和故障锁存。
- `outputs.c`：把模式转换成 PFC、DC-DC、脉宽调制（pulse-width modulation / PWM）和旁路接触器许可。
- `main.c`：教学主循环，真实工程可能由调度器或任务调用。

## 7. 常见误解

- 错误理解：C 工程只是 Python 脚本逐行翻译。  
  正确理解：C 工程首先要表达模块边界、状态保存和输入输出责任。
- 错误理解：输出许可可以散落在各处。  
  正确理解：入门时应尽量集中生成输出许可，便于审查状态机行为。
- 错误理解：故障恢复只看故障输入是否消失。  
  正确理解：故障锁存通常需要复位请求和安全输入条件。
- 错误理解：现在项目目录里已经有参数、保护、通信等文件，所以 0025 必须一次学完所有模块。  
  正确理解：0025 只抓 C 骨架主线，后续 0026 之后再逐个模块展开。

## 8. 验收标准

- 能运行 `python simulations\python\ups_mode_state_machine.py --no-open`，看到或打开 `simulations/results/ups_mode_state_machine.png`。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`。
- 能解释 `UpsModeStateMachine_Step()` 的输入、状态和输出。
- 能解释 `UpsOutputs_FromMode()` 为什么集中生成许可。
- 能基于 C 文件准备导师问题。

## 9. 复盘问题

- `tick=04` 为什么是 BYPASS，而不是继续 BATTERY？
- `tick=06` 进入 FAULT 后，为什么 PFC、DC-DC、inv_pwm、bypass 都是 0？
- 对照 `simulations/results/ups_mode_state_machine.png` 和 C 终端输出，哪一部分负责说明“时间顺序”，哪一部分负责说明“模块边界”？
- `mode_state_machine.c` 和 `outputs.c` 分开有什么好处？

## 10. 导师问题

- 我用 `mode_state_machine.c -> UpsModeStateMachine_Step()` 看到模式切换集中在一个函数。公司工程里模式状态机通常集中实现，还是分散在多个任务中？
- 我用 `outputs.c -> UpsOutputs_FromMode()` 看到输出许可由模式统一生成。真实工程里 PFC、DC-DC、逆变 PWM 和旁路接触器许可通常在哪里统一仲裁？
- 教学代码里故障复位需要 `reset_request && mains_ok`。真实工程里复位条件通常还会检查哪些状态？
- 我会只记录模块边界和公开可讨论的原则，不记录公司内部参数、公司内部通信协议、未公开故障码或客户项目数据。这样的提问边界是否合适？
