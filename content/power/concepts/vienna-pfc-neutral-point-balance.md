---
date: 2026-06-22
category: 电源控制
source: power
visibility: public
title: 概念：Vienna PFC 与中点电压平衡
tags:
  - power-electronics
status: learning
summary: 本页是 `lessons/0041-vienna-pfc-neutral-point-balance.html` 的源稿。
---

# 概念：Vienna PFC 与中点电压平衡

本页是 `lessons/0041-vienna-pfc-neutral-point-balance.html` 的源稿。

## 它是什么

维也纳整流器（Vienna rectifier）是三相三电平单向 PFC 整流拓扑。中点电压平衡（neutral-point voltage balance）要求上下母线电容电压接近相等。

## 为什么 UPS/PCS 需要它

中大功率三相 UPS 前级常需要高效率和低输入谐波。Vienna PFC 可降低器件应力，但必须管理分裂母线。

## 数学形式

```text
Vdc = Vc_top + Vc_bottom
Vnp_err = Vc_top - Vc_bottom
id_ref = PI(Vdc_ref - Vdc)
iq_ref = 0
```

## 一个仿真任务

人为设置上下电容电压不等，观察加入平衡项后 `Vnp_err` 收敛。

## 验收标准

- 能解释 Vienna 和三相 Boost PFC 的区别。
- 能说明为什么总母线电压正常不代表中点平衡。
- 能区分 Vdc 环、id/iq 环和中点平衡环。

## 导师问题

中点平衡逻辑在真实代码中通常放在调制层还是控制层？
