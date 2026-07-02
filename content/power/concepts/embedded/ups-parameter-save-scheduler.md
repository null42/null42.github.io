---
date: 2026-06-21
category: 电源控制
source: power
visibility: public
title: 概念：UPS 参数保存触发策略（parameter save scheduler）
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0036-ups-parameter-save-scheduler.html` 的源稿和补充资料。它只讨论教学用触发策略，不包含公司内部保存策略、Flash 地址、客户项目参数、内部磨损均衡算法或真实产品掉电保护方案。
---

# 概念：UPS 参数保存触发策略（parameter save scheduler）

本页是 `lessons/0036-ups-parameter-save-scheduler.html` 的源稿和补充资料。它只讨论教学用触发策略，不包含公司内部保存策略、Flash 地址、客户项目参数、内部磨损均衡算法或真实产品掉电保护方案。

## 它是什么

参数保存触发策略（parameter save scheduler）决定“参数被改了以后，什么时候真正写入非易失存储（non-volatile memory / NVM）”。它连接上一节的参数保存（parameter storage）模块，但不等于保存格式本身。

本课只讲一个概念：通信或本地逻辑修改参数后，先置位脏标志（dirty flag），再经过延时提交（delayed commit）和最小保存间隔（minimum save interval）判断，最后才触发一次 NVM 保存。

## 为什么 UPS 需要它

如果每次参数写入都立刻执行 Flash 擦写（Flash erase/write），会带来三个问题：

- 保存次数过多，增加 NVM 磨损风险。
- 多个参数连续写入时，可能产生多次没有必要的保存。
- 参数写入路径和保存路径耦合太紧，通信处理、状态机和存储驱动会变得难读。

UPS 参数管理更需要“可解释的保存时机”：哪些写入发生了、什么时候被合并、最终保存了几次。这些证据适合用仿真波形和 C 代码输出向导师提问。

## 物理直觉

脏标志像便签上的“这页改过了”。延时提交像等你停止连续修改后再拍照存档。最小保存间隔像规定“就算又改了，也不能太频繁地拿橡皮和钢笔重写同一页”，避免把存储器当成 RAM 一样频繁写。

本课的例子里，0 ms 和 20 ms 连续两次参数写入，只产生一次 80 ms 的 NVM 保存。这样可以看清“多次写入合并成一次保存”的主线。

## 数学形式

设：

- `dirty`：是否有未保存参数。
- `last_change_ms`：最近一次参数变化时间。
- `last_save_ms`：最近一次保存时间。
- `commit_delay_ms`：延时提交时间。
- `minimum_save_interval_ms`：最小保存间隔。

保存触发条件：

```text
should_save =
    dirty == 1
    and now_ms - last_change_ms >= commit_delay_ms
    and now_ms - last_save_ms >= minimum_save_interval_ms
```

保存完成后的状态：

```text
dirty = 0
last_save_ms = now_ms
save_count = save_count + 1
```

## 仿真观察

运行：

```powershell
python simulations\python\ups_parameter_save_scheduler.py --no-open
```

默认生成：

```text
simulations/results/ups_parameter_save_scheduler.png
```

图中包含三组曲线：`dirty flag`、`write pulse`、`NVM save pulse` 和 `save_count`。参数框写明 `commit_delay_ms=50`、`minimum_save_interval_ms=100`、写入时间点和保存时间点。

观察重点：

- 0 ms 写入后 `dirty` 置 1，但不立刻保存。
- 20 ms 再次写入，`last_change_ms` 被刷新。
- 80 ms 距离最近一次写入已超过 50 ms，因此触发一次保存。
- 保存后 `dirty` 清零，`save_count` 变成 1。

## 固件落地

- `UpsParameterSaveScheduler`：保存触发状态。
- `dirty`：有参数未保存。
- `last_change_ms`：最近一次参数变化时间。
- `last_save_ms`：最近一次成功保存时间。
- `save_count`：教学统计，用来确认保存次数。
- `UpsParameterSaveScheduler_Init()`：初始化调度器。
- `UpsParameterSaveScheduler_MarkDirty()`：参数被接受写入后置脏。
- `UpsParameterSaveScheduler_ShouldSave()`：根据当前时间、延时提交和最小保存间隔判断是否保存。
- `UpsParameterSaveScheduler_OnSaved()`：保存成功后清脏并更新时间。

真实工程还会考虑 Flash 扇区、双备份、掉电窗口、保存失败重试、磨损均衡和安全状态限制。本课只训练通用阅读路径。

## 常见误解

- 错误理解：参数一写入就必须马上保存。  
  正确理解：很多场景应先置脏，再合并保存。
- 错误理解：只要加延时提交就足够。  
  正确理解：还需要最小保存间隔，避免频繁保存。
- 错误理解：保存触发策略就是公司真实 Flash 策略。  
  正确理解：本课不包含公司内部保存策略，只讲可迁移的通用结构。

## 一个仿真任务

先运行 `python simulations\python\ups_parameter_save_scheduler.py --no-open`，再打开 `simulations/results/ups_parameter_save_scheduler.png`。在图上标出：

- 哪两个时刻是参数写入。
- 哪个时刻真正发生 NVM 保存。
- 保存后 `dirty` 为什么变成 0。
- 为什么保存次数是 1，不是 2。

## 验收标准

- 能解释脏标志、延时提交和最小保存间隔分别解决什么问题。
- 能根据公式判断 40 ms 为什么不保存、80 ms 为什么保存。
- 能运行仿真并看到 `parameter writes: 2`、`nvm saves: 1`、`dirty cleared after save: True`。
- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `parameter_save_scheduler` 输出。
- 能基于 `parameter_save_scheduler.c -> UpsParameterSaveScheduler_ShouldSave()` 准备导师问题。

## 复盘问题

- 为什么 0 ms 写入后不能马上把 `dirty` 清掉？
- 为什么 20 ms 再次写入会推迟保存时机？
- 如果通信连续改 5 个参数，保存触发策略应该关注“写入次数”还是“最终一致的参数快照”？

## 导师问题

- 我用 `simulations/results/ups_parameter_save_scheduler.png` 看到 0 ms 和 20 ms 两次写入只合并成 80 ms 一次保存。真实工程阅读时，通常从哪个函数看“参数写入”和“保存触发”的边界？
- 我用 `parameter_save_scheduler.c -> UpsParameterSaveScheduler_ShouldSave()` 只检查 dirty、延时提交和最小保存间隔。真实工程里还会不会受系统模式、故障状态或掉电检测影响？
- 我不会记录公司内部保存策略，只想确认阅读顺序：应先看参数写入入口、保存调度入口，还是 NVM 驱动回调？
