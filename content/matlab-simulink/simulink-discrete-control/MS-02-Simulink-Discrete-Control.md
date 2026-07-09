---
title: MS-02 Simulink 仿真离散控制系统
date: 2026-07-09
quality: curated
status: learning
visibility: public
order: 30
summary: 从 Matlab 脚本迁移到 Simulink 离散模型，重点处理 solver、采样时间、Unit Delay、Zero-Order Hold 和多速率边界。
---

# MS-02 Simulink 仿真离散控制系统

Simulink 的优势是可视化数据流。新手最先要掌握的不是模块数量，而是采样时间和模块边界。

## 1. 从脚本到框图

把 Matlab 脚本迁移到 Simulink 时，可以按这个对应关系拆分：

| 脚本元素 | Simulink 模块 | 注意点 |
| --- | --- | --- |
| `ref(k)` | Step 或 Signal Builder | 参考信号采样时间要明确 |
| `err = ref - y` | Sum | 符号方向不要反 |
| `integ += Ts * err` | Discrete-Time Integrator | 设置初值和限幅 |
| `u = sat(uRaw)` | Saturation | 与实机执行器范围一致 |
| `y[k+1]` | Discrete State-Space 或 Unit Delay | 避免代数环 |
| 日志数组 | To Workspace 或 Simulation Data Inspector | 固定保存格式 |

## 2. Solver 设置

离散控制模型建议先使用固定步长离散求解器：

| 设置项 | 建议值 | 原因 |
| --- | --- | --- |
| Type | Fixed-step | 与数字控制周期一致 |
| Solver | discrete 或 fixed-step auto | 避免连续求解器隐藏采样问题 |
| Fixed-step size | `Ts` 或最小采样周期 | 保证模块按预期更新 |
| Stop time | 明确数值 | 便于复现实验 |

如果模型里同时有快速电流环和慢速速度环，可以让 fixed-step size 等于最快采样周期。例如电流环 `Ts_i = 100e-6`，速度环 `Ts_w = 1e-3`，则基础步长用 `100e-6`。

## 3. Unit Delay 与 Memory 的区别

离散控制里，`Unit Delay` 表示延迟一个采样周期。它常用于打断代数环，也用于模拟计算延迟。

```mermaid
flowchart LR
  Ref["参考值"] --> Sum["误差"]
  Y["反馈值"] --> Sum
  Sum --> Ctrl["离散控制器"]
  Ctrl --> Delay["Unit Delay"]
  Delay --> Plant["离散对象"]
  Plant --> Y
```

如果你的控制器输出直接影响对象，而对象输出又立即反馈到控制器，Simulink 可能报告代数环。新手不要急着关警告，先确认真实系统是否本来就有一拍延迟。

## 4. 多速率边界

多速率模型要写清楚哪个模块按哪个周期运行：

| 模块 | 典型周期 | 说明 |
| --- | --- | --- |
| ADC 采样 | `100e-6` | 跟电流环同步 |
| 电流环 | `100e-6` | 快环 |
| 速度环 | `1e-3` | 慢环 |
| 位置规划 | `5e-3` 或更慢 | 只给参考值 |
| 日志降采样 | `1e-3` 或 `10e-3` | 避免数据量过大 |

跨速率连接时，使用 Rate Transition，不要直接连线赌 Simulink 自动处理。这样后面生成代码或对齐实机任务周期时更稳。

## 5. 初次验收

模型第一次跑通后，至少检查这些现象：

- 改 `Ts` 后响应变化合理。
- Saturation 确实限制了控制输出。
- To Workspace 里的时间向量等间隔。
- 没有未解释的代数环警告。
- Scope 曲线和 Matlab 脚本结果趋势一致。
