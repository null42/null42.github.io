---
title: 教程 0036：UPS 参数保存触发策略
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0036-ups-parameter-save-scheduler.html
status: learning
visibility: public
summary: Imported from 0036-ups-parameter-save-scheduler.html
chapterOrder: 10
---

# 教程 0036：UPS 参数保存触发策略

中文主讲。一个概念：参数被修改后，不要每写一次就保存一次，而是用脏标志、延时提交和最小保存间隔合并保存。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学保存触发策略，不包含公司内部保存策略、Flash 地址、客户项目参数、内部磨损均衡算法或真实产品掉电保护方案。

## 1. 它是什么

参数保存触发策略（parameter save scheduler）决定“参数被改了以后，什么时候真正写入非易失存储（non-volatile memory / NVM）”。它连接上一节的参数保存（parameter storage）模块，但不等于保存格式本身。

本课只讲一个概念：通信或本地逻辑修改参数后，先置位脏标志（dirty flag），再经过延时提交（delayed commit）和最小保存间隔（minimum save interval）判断，最后才触发一次 NVM 保存。

## 2. 为什么 UPS 需要它

如果每次参数写入都立刻执行 Flash 擦写（Flash erase/write），会带来三个问题：保存次数过多、连续写多个参数时产生重复保存、参数写入路径和存储驱动耦合太紧。

UPS 参数管理更需要“可解释的保存时机”：哪些写入发生了、什么时候被合并、最终保存了几次。这些证据适合用仿真波形和 C 代码输出向导师提问。

## 3. 物理直觉

脏标志像便签上的“这页改过了”。延时提交像等你停止连续修改后再拍照存档。最小保存间隔像规定“就算又改了，也不能太频繁地拿橡皮和钢笔重写同一页”，避免把存储器当成 RAM 一样频繁写。

本课的例子里，0 ms 和 20 ms 连续两次参数写入，只产生一次 80 ms 的 NVM 保存。这样可以看清“多次写入合并成一次保存”的主线。

## 4. 数学形式

  should_save =
    dirty == 1
    and now_ms - last_change_ms >= commit_delay_ms
    and now_ms - last_save_ms >= minimum_save_interval_ms

on_saved:
    dirty = 0
    last_save_ms = now_ms
    save_count = save_count + 1

其中 `last_change_ms` 是最近一次参数变化时间，`last_save_ms` 是最近一次保存时间。40 ms 时距离 20 ms 的最近写入只有 20 ms，不满足 50 ms 延时提交；80 ms 时距离最近写入已有 60 ms，因此可以保存。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_parameter_save_scheduler.py

只保存图片、不自动打开：

  python simulations\python\ups_parameter_save_scheduler.py --no-open

    产物

- `simulations/results/ups_parameter_save_scheduler.png`

- 终端输出：`parameter writes: 2`、`nvm saves: 1`、`dirty cleared after save: True`。

- 图内包含参数框、图例、写入脉冲、保存脉冲、脏标志和保存次数。

观察顺序：先看 0 ms 和 20 ms 的写入脉冲；再看 `dirty flag` 保持为 1；最后看 80 ms 的保存脉冲出现后，`dirty flag` 清零，`save_count` 变成 1。

## 6. 固件落地

- `UpsParameterSaveScheduler`：保存触发状态。

- `dirty`：有参数未保存。

- `last_change_ms`：最近一次参数变化时间。

- `last_save_ms`：最近一次成功保存时间。

- `save_count`：教学统计，用来确认保存次数。

- `UpsParameterSaveScheduler_Init()`：初始化调度器。

- `UpsParameterSaveScheduler_MarkDirty()`：参数被接受写入后置脏。

- `UpsParameterSaveScheduler_ShouldSave()`：根据当前时间、延时提交和最小保存间隔判断是否保存。

- `UpsParameterSaveScheduler_OnSaved()`：保存成功后清脏并更新时间。

## 7. 常见误解

- **误解：**参数一写入就必须马上保存。
**纠正：**很多场景应先置脏，再合并保存。

- **误解：**只要加延时提交就足够。
**纠正：**还需要最小保存间隔，避免频繁保存。

- **误解：**保存触发策略就是公司真实 Flash 策略。
**纠正：**本课不包含公司内部保存策略，只讲可迁移的通用结构。

## 8. 验收标准

- 能运行 `python simulations\python\ups_parameter_save_scheduler.py --no-open` 并打开 `simulations/results/ups_parameter_save_scheduler.png`。

- 能解释脏标志、延时提交和最小保存间隔分别解决什么问题。

- 能根据公式判断 40 ms 为什么不保存、80 ms 为什么保存。

- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `parameter_save_scheduler` 输出。

- 能基于 `parameter_save_scheduler.c -> UpsParameterSaveScheduler_ShouldSave()` 准备导师问题。

## 9. 复盘问题

- 为什么 0 ms 写入后不能马上把 `dirty` 清掉？

- 为什么 20 ms 再次写入会推迟保存时机？

- 如果通信连续改 5 个参数，保存触发策略应该关注“写入次数”还是“最终一致的参数快照”？

## 10. 导师问题

- 我用 `simulations/results/ups_parameter_save_scheduler.png` 看到 0 ms 和 20 ms 两次写入只合并成 80 ms 一次保存。真实工程阅读时，通常从哪个函数看“参数写入”和“保存触发”的边界？

- 我用 `parameter_save_scheduler.c -> UpsParameterSaveScheduler_ShouldSave()` 只检查 dirty、延时提交和最小保存间隔。真实工程里还会不会受系统模式、故障状态或掉电检测影响？

- 我不会记录公司内部保存策略，只想确认阅读顺序：应先看参数写入入口、保存调度入口，还是 NVM 驱动回调？

**下一步：**可以继续补“参数保存失败与重试边界”，但仍只用教学策略，不记录真实产品内部实现。

关联：[上一节：参数保存与默认值恢复](0035-ups-parameter-storage.html)；源稿：`concepts/embedded/ups-parameter-save-scheduler.md`；仿真：`simulations/python/ups_parameter_save_scheduler.py`。

    上一节：教程 0035：UPS 参数保存与默认值恢复
    下一节：教程 0037：三相功率与 dq 坐标变换
