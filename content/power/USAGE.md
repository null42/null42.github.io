---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: UPS 电源控制入职训练体系使用说明
tags:
  - power-electronics
status: learning
summary: 本说明用于在 `E:\gitee_CodeStorage\学习\电源` 工作区继续学习和维护这套 UPS 电源控制入职训练体系。当前体系以中文主讲，关键术语保留中英对照，目标是从 Boost 基础逐步过渡到 UPS 拓扑、控制、采样、嵌入式、保护、通信和系统工程。
---

# UPS 电源控制入职训练体系使用说明

本说明用于在 `E:\gitee_CodeStorage\学习\电源` 工作区继续学习和维护这套 UPS 电源控制入职训练体系。当前体系以中文主讲，关键术语保留中英对照，目标是从 Boost 基础逐步过渡到 UPS 拓扑、控制、采样、嵌入式、保护、通信和系统工程。

## 1. 学习入口

- `MISSION.md`：训练目标和硬性要求。开始任何新课程前先读它。
- `roadmap/30-day-plan.md`：第一个月的打基础路线。
- `roadmap/lesson-priority-map.md`：课程主题优先级。
- `roadmap/continuous-learning-path.md`：30 天之后的持续提高路线。
- `lessons/0001-boost-converter.html`：正式课程入口，从 Boost 开始。
- `lessons/0027-ups-c-protection-flags.html`：当前收官点，进入 UPS C 工程里的保护标志。

HTML 是正式学习入口，放在 `lessons/` 目录，可以直接用浏览器打开。Markdown 是源稿和补充资料，用于维护、速查和版本管理，不能替代 HTML 正式教程。

## 2. 当前课程范围

- `0001-0008：Boost 与基础固件骨架`  
  从 Boost 拓扑、连续导通模式（continuous conduction mode / CCM）、断续导通模式（discontinuous conduction mode / DCM）、脉宽调制（pulse-width modulation / PWM）、采样、离散 PI、C 固件骨架、故障状态机和遥测日志建立基础。

- `0009-0017：单相 PFC 与 PLL`  
  学习功率因数校正（power factor correction / PFC）、电压环、电流环、PWM 延迟、前馈、平均模型和锁相环（phase-locked loop / PLL）。

- `0018-0024：逆变器、旁路和 UPS 模式状态机`  
  学习 LC 滤波、PR 控制、RMS 保护、逆变器故障状态机、固件调度、旁路同步切换和 UPS 模式状态机。

- `0025-0027：UPS C 工程骨架、参数表和保护标志`  
  学习如何阅读简化 C 工程：`parameters.h -> UpsParameters` 定义参数边界，`parameters.c -> UpsParameters_GetDefault()` 提供教学默认值，`protection.c -> UpsProtection_Evaluate()` 把采样值和参数表转换成保护标志。

## 3. 推荐学习方法

1. 先打开对应 HTML 课程，按目录读完“它是什么、为什么 UPS 需要它、物理直觉、数学形式、仿真观察、固件落地、常见误解”。
2. 运行课程里的 Python 或 C 命令，生成图或终端证据。
3. 对照 Markdown 源稿查漏补缺，不把 Markdown 当唯一教程入口。
4. 回答课程里的复盘问题。
5. 准备导师问题。导师问题必须基于具体产物，例如 `simulations/results/ups_protection_flags.png` 或 `protection.c -> UpsProtection_Evaluate()`。

## 4. 常用命令

在 PowerShell 中从工作区根目录运行：

```powershell
cd E:\gitee_CodeStorage\学习\电源
```

Boost 开环仿真：

```powershell
python simulations\python\boost_open_loop.py --no-open
```

Boost CCM/DCM 仿真：

```powershell
python simulations\python\boost_ccm_dcm.py --no-open
```

UPS 保护标志仿真：

```powershell
python simulations\python\ups_protection_flags.py --no-open
```

UPS C 工程骨架编译运行：

```powershell
gcc -std=c99 -Wall -Wextra -Werror -I projects\03-ups-c-firmware-skeleton\src projects\03-ups-c-firmware-skeleton\src\*.c -o projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
projects\03-ups-c-firmware-skeleton\ups_c_firmware_skeleton.exe
```

全量验证：

```powershell
pytest -q
```

## 5. 仿真图要求

仿真脚本默认会尝试自动打开图片；加 `--no-open` 时只保存图片。打不开时会打印完整路径。每张图必须有参数框和图例，不能让学习者猜曲线含义。

重点结果图包括：

- `simulations/results/boost_open_loop.png`
- `simulations/results/boost_ccm_dcm_dcm.png`
- `simulations/results/boost_ccm_dcm_ccm.png`
- `simulations/results/ups_protection_flags.png`

查看图时先读图标题和参数框，再看曲线图例，最后把曲线变化对应回课程里的数学形式。

## 6. C 工程阅读顺序

当前 C 教学工程在 `projects/03-ups-c-firmware-skeleton/`。

建议先读：

1. `src/ups_types.h`：公共模式、输入、输出和运行状态。
2. `src/inputs.c`：教学输入序列。
3. `src/mode_state_machine.c`：UPS 模式状态机。
4. `src/outputs.c`：模式到执行器许可的映射。
5. `src/parameters.h` 和 `src/parameters.c`：教学参数表。
6. `src/protection.c`：教学保护标志。
7. `src/main.c`：把参数表、保护标志、模式状态机和输出打印串起来。

先抓模块边界，再看细节。不要一开始就试图记住所有参数或所有打印行。

## 7. 保密边界

本仓库只记录公开、教学和个人学习内容：

- 不能记录公司内部代码。
- 不能记录未公开产品方案。
- 不能记录客户项目参数。
- 不能记录内部测试数据。
- 不能记录公司内部保护阈值、内部通信协议、内部 NVM 格式或未公开故障码。

可以记录的是通用组织方式，例如“参数表集中管理阈值”“保护模块输出标志”“状态机消费保护结果”。向导师提问时，只问结构、边界和方法，不抄内部数值。

## 8. 导师问题模板

准备导师问题时使用这个格式：

```text
我基于 <具体产物> 观察到 <现象或代码边界>。
我不记录公司内部参数/代码/测试数据。
我想确认真实工程里 <模块边界、执行时机、权限或审查方式> 通常如何组织？
```

示例：

```text
我基于 simulations/results/ups_protection_flags.png 看到采样量跨过阈值后保护标志变为 1。
我不记录公司内部保护阈值和内部测试数据。
我想确认真实工程里保护判断通常会不会加滤波、去抖或保持时间？
```

```text
我基于 protection.c -> UpsProtection_Evaluate() 看到教学代码把采样值和参数表集中生成保护标志。
我不记录公司内部代码和客户项目参数。
我想确认真实工程里保护判断通常在控制 ISR、保护任务，还是状态机任务里执行？
```

## 9. 维护规则

新增或修改理论内容时，同步检查：

- `lessons/*.html` 是否是中文主讲正式入口。
- `concepts/**/*.md` 是否作为源稿或补充资料同步更新。
- `simulations/python/*.py` 是否生成带参数框和图例的图片。
- `tests/*.py` 是否覆盖仿真、C 工程输出和教程合规性。
- `MISSION.md` 是否仍然匹配当前学习目标。

完成修改前运行相关测试；收官或大改前运行 `pytest -q`。

## 10. 后续深入方向

完成 0027 后，基础路径已经能支持继续深入。后续深入方向包括：

- 保护去抖和故障锁存，把瞬时保护标志变成稳定故障状态。
- 故障码、故障日志、遥测通信帧和命令响应。
- 参数访问、参数保存、掉电恢复和版本校验。
- LLC 谐振变换器（inductor-inductor-capacitor resonant converter / LLC）。
- 维也纳整流器（Vienna rectifier）。
- 三电平逆变器（three-level inverter）。

后续仍保持同一节奏：一个概念讲清楚，一个仿真任务，一个或几个复盘问题，一个或几个基于具体产物的导师问题。
