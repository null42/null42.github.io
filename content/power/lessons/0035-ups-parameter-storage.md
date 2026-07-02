---
title: 教程 0035：UPS 参数保存与默认值恢复
date: 2026-07-02
section: 电源控制
chapter: 01-Lessons
chapterTitle: 电源课程
category: 电源控制
tags:
  - imported
source: power
sourcePath: 0035-ups-parameter-storage.html
status: learning
visibility: public
summary: Imported from 0035-ups-parameter-storage.html
chapterOrder: 10
---

# 教程 0035：UPS 参数保存与默认值恢复

中文主讲。一个概念：保存参数时要同时保存版本、有效标志和校验和，加载失败时必须回默认值。

    目录

- 它是什么

- 为什么 UPS 需要它

- 物理直觉

- 数学形式

- 一个仿真任务与仿真观察

- 固件落地

- 常见误解

- 验收标准、复盘问题、导师问题

**保密边界：**本节只使用教学非易失存储记录，不包含公司内部NVM格式、Flash 地址、客户项目参数、未公开产品阈值或内部校验算法。

## 1. 它是什么

非易失存储（non-volatile memory / NVM）是在断电后仍能保留数据的存储区域。参数保存是把参数表（parameter table）的当前值写入 NVM；默认值恢复（default restore）是在存储记录无效、版本不匹配或校验失败时回到安全的默认参数。

校验和（checksum）是用一组数据计算出的简短校验值，用来判断存储内容是否被破坏。本课只讲一个概念：保存参数时要同时保存版本、有效标志和校验和，加载失败时必须回默认值。

## 2. 为什么 UPS 需要它

上一节讲参数访问（parameter access）：通信可以改某些可写参数。但写入 RAM 后，如果掉电不保存，下次上电就丢失；如果保存内容损坏还盲目使用，保护阈值或控制参数可能变得不可预期。

UPS 上电时必须知道当前使用的参数来自哪里：是默认值，还是通过校验的已保存参数。这个来源本身就是调试和导师复盘的重要证据。

## 3. 物理直觉

参数保存像把调好的旋钮位置写进笔记本；校验和像笔记本最后的核对签名。下次开机先检查签名，如果签名对，就按笔记本恢复；如果签名不对，就不要相信这页纸，回到出厂默认值。

## 4. 数学形式

  save(parameters):
    record.version = 1
    record.valid = 1
    record.parameters = parameters
    record.checksum = checksum(version, parameters)

load(record):
    if record.valid and record.checksum == checksum(record.version, record.parameters):
        return record.parameters, loaded_default = 0

    return default_parameters, loaded_default = 1

本课的 checksum 是教学用简化计算，不代表真实产品算法。

## 5. 一个仿真任务与仿真观察

运行 Python 仿真：

  cd E:\gitee_CodeStorage\学习\电源
python simulations\python\ups_parameter_storage.py

只保存图片、不自动打开：

  python simulations\python\ups_parameter_storage.py --no-open

    产物

- `simulations/results/ups_parameter_storage.png`

- 终端输出：有效加载是否使用保存值、损坏加载是否使用默认值、校验失败次数。

- 图内包含参数框、图例、参数值、校验状态、损坏记录和是否加载默认值。

观察顺序：先看保存值为 170 V；再看正常加载仍为 170 V；最后看校验损坏后加载默认值 180 V。

## 6. 固件落地

- `UpsParameterStorageRecord`：教学 NVM 记录，包含版本号、有效标志、校验和和参数快照。

- `version`：参数格式版本。

- `valid`：记录是否被认为有效。

- `checksum`：参数记录校验值。

- `UpsParameterStorage_Save()`：把当前参数打包成存储记录。

- `UpsParameterStorage_LoadOrDefault()`：校验记录，成功则加载保存值，失败则加载默认值。

- `loaded_default`：说明本次加载是否回到默认值。

- `checksum_ok`：说明本次校验是否通过。

真实工程还会涉及 Flash 扇区擦写、磨损均衡、双备份、掉电中断保护、参数版本迁移和恢复默认值命令。本课只训练阅读主线。

## 7. 常见误解

- **误解：**参数写成功就等于永久保存。
**纠正：**RAM 写成功和 NVM 保存成功是两件事。

- **误解：**NVM 里有数据就可以直接用。
**纠正：**必须检查有效标志、版本和校验和。

- **误解：**可以把导师给的真实 NVM 记录格式写进学习仓库。
**纠正：**不能记录公司内部NVM格式，只能记录通用字段和阅读问题。

## 8. 验收标准

- 能运行 `python simulations\python\ups_parameter_storage.py --no-open` 并打开 `simulations/results/ups_parameter_storage.png`。

- 能解释 NVM、校验和、版本号、有效标志和默认值恢复分别解决什么问题。

- 能解释为什么校验失败时不能继续使用保存值。

- 能编译并运行 `projects/03-ups-c-firmware-skeleton`，看到 `parameter_storage` 输出。

- 能基于 `parameter_storage.c -> UpsParameterStorage_LoadOrDefault()` 准备导师问题。

## 9. 复盘问题

- 为什么 RAM 参数写成功不等于参数已经永久保存？

- 为什么校验失败时回默认值通常比继续使用损坏值更安全？

- 如果恢复默认值，通信上报里应该只报当前参数，还是也报“本次加载使用默认值”？

## 10. 导师问题

- 我用 `parameter_storage.c -> UpsParameterStorage_LoadOrDefault()` 在校验失败时回默认值。真实工程里通常还会检查哪些通用字段？

- 我用 `simulations/results/ups_parameter_storage.png` 看到损坏记录会恢复 180 V 默认值。真实工程中恢复默认值后会不会记录日志或上报告警？

- 我不会记录公司内部NVM格式，只想确认阅读方式：看真实工程时，应先看参数版本、校验算法、双备份策略，还是恢复默认值入口？

**下一步：**可以继续补“参数保存触发策略”，训练什么时候保存、如何避免频繁擦写、保存失败如何上报。

关联：[上一节：参数访问边界](0034-ups-parameter-access.html)；源稿：`concepts/embedded/ups-parameter-storage.md`；仿真：`simulations/python/ups_parameter_storage.py`。

    上一节：教程 0034：UPS 参数访问边界
    下一节：教程 0036：UPS 参数保存触发策略
