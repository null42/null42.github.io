---
title: "UPS与PCS数字控制：DSP算法从入门到精通"
published: 2026-09-13
draft: false
visibility: public
description: "面向 UPS/储能 PCS 开发的工程师手册式课程：以 TMS320F28075 为教学样片，从 DSP 外设到整机系统，第0章+48章+附录A~C 完整知识体系。"
tags:
 - power-electronics
 - UPS
 - PCS
 - DSP
 - 课程
category: 课程项目
lang: zh-CN
comment: false
sectionId: power
sectionTitle: 电源控制
routeId: project
routeTitle: 项目实践
stageId: courses
stageTitle: 课程项目
articleId: power/courses/ups-pcs-dsp/README
order: 10
---

# UPS与PCS数字控制：DSP算法从入门到精通

本课程是面向 UPS/储能 PCS 开发的一套“工程师手册”式课程体系：**第0章 + 48章正文 + 附录A~C**，教学样片统一采用 **TMS320F28075**。与教材式课程不同，全书以“可手算的算例、可复现的设计流程、可执行的上机核对、真实的失败案例”为主线，所有专业词口径统一收敛到[术语与缩略语表](/posts/power/courses/ups-pcs-dsp/docs/glossary/)，产品级指标锚定真实采购技术规范书（见[整机验收指标](/posts/power/courses/ups-pcs-dsp/docs/acceptance/)）。

> **入门提示**：没有控制理论底子也能开始——第0章给出“刚好够用”的数学/电学自检清单与标幺化速成，读完即可进入第1章。全书最重要的动手节点：学完第11章 DC-DC 整定后，立即在低压 Buck 板上闭合第一个电压环。

## 课程地图

| 阶段 | 章节 | 内容概要 |
| --- | --- | --- |
| 预备 | [第0章](/posts/power/courses/ups-pcs-dsp/ch00/) | 数学自检、标幺化、全书符号表、课程地图 |
| 平台基础（裸机能力） | 第1~7章 | 系统概述、F28075 选型、开发环境、GPIO/中断、ADC、ePWM/SPWM、eCAP 测频测相 |
| 建模与拓扑 | 第8~16章 | 拓扑全景、信号调理、建模方法论、DC-DC/PFC/单相PR/三相LCL、三电平、双向谐振 |
| 控制器设计 | 第17~22章 | 整定方法论、数字滤波、PI/PR、离散化、双环设计、补偿网络 |
| 谐波与锁相专题 | 第23~29章 | 谐波指标、ip-iq/滑窗DFT提取、准PR/重复控制补偿、PLL |
| 系统功能 | 第30~44章 | 旁路切换、SVPWM、四线制、并网、状态机、保护、固件架构、并联、电池、孤岛 |
| 工程实践 | 第45~48章 | EMC、热设计、SiC/GaN 前沿、50kW PCS + 模块化 UPS 双主线综合实战 |
| 附录 | A~C | 安规认证、量产标定、降额与 DFMEA |

## 平台基础（第1~7章）

1. [第01章 UPS与PCS系统概述](/posts/power/courses/ups-pcs-dsp/ch01/)
2. [第02章 DSP基础与选型（TMS320F28075）](/posts/power/courses/ups-pcs-dsp/ch02/)
3. [第03章 开发环境搭建与调试方法](/posts/power/courses/ups-pcs-dsp/ch03/)
4. [第04章 GPIO配置与中断系统](/posts/power/courses/ups-pcs-dsp/ch04/)
5. [第05章 ADC采样与SOC架构](/posts/power/courses/ups-pcs-dsp/ch05/)
6. [第06章 ePWM与SPWM波形生成](/posts/power/courses/ups-pcs-dsp/ch06/)
7. [第07章 eCAP与电网频率相位测量](/posts/power/courses/ups-pcs-dsp/ch07/)

## 建模与拓扑（第8~16章）

8. [第08章 UPS/PCS功率拓扑全景](/posts/power/courses/ups-pcs-dsp/ch08/)
9. [第09章 信号采样与调理电路](/posts/power/courses/ups-pcs-dsp/ch09/)
10. [第10章 建模方法论总览](/posts/power/courses/ups-pcs-dsp/ch10/)
11. [第11章 DC-DC拓扑建模与环路整定](/posts/power/courses/ups-pcs-dsp/ch11/)
12. [第12章 PFC整流器建模与双环整定](/posts/power/courses/ups-pcs-dsp/ch12/)
13. [第13章 单相全桥逆变器建模与PR双环整定](/posts/power/courses/ups-pcs-dsp/ch13/)（全课重头戏）
14. [第14章 三相LCL逆变器dq建模与电流环整定](/posts/power/courses/ups-pcs-dsp/ch14/)
15. [第15章 三电平与多电平拓扑建模：NPC·TNPC·Vienna](/posts/power/courses/ups-pcs-dsp/ch15/)
16. [第16章 双向隔离与谐振变换器：DAB·LLC·CLLC](/posts/power/courses/ups-pcs-dsp/ch16/)

## 控制器设计（第17~22章）

17. [第17章 环路参数整定方法论与自动整定](/posts/power/courses/ups-pcs-dsp/ch17/)
18. [第18章 数字滤波器基础](/posts/power/courses/ups-pcs-dsp/ch18/)
19. [第19章 控制算法基础：PI与PR](/posts/power/courses/ups-pcs-dsp/ch19/)
20. [第20章 控制器离散化与数字实现](/posts/power/courses/ups-pcs-dsp/ch20/)
21. [第21章 电压环与电流环双环设计要点](/posts/power/courses/ups-pcs-dsp/ch21/)
22. [第22章 补偿网络与谐振控制器设计](/posts/power/courses/ups-pcs-dsp/ch22/)

## 谐波与锁相专题（第23~29章）

23. [第23章 谐波的来源与电能质量指标](/posts/power/courses/ups-pcs-dsp/ch23/)
24. [第24章 谐波提取Ⅰ：瞬时无功与ip-iq法](/posts/power/courses/ups-pcs-dsp/ch24/)
25. [第25章 谐波提取Ⅱ：滑窗递推DFT与多同步旋转坐标系](/posts/power/courses/ups-pcs-dsp/ch25/)
26. [第26章 谐波补偿Ⅰ：多点准PR并联与相位补偿](/posts/power/courses/ups-pcs-dsp/ch26/)
27. [第27章 谐波补偿Ⅱ：重复控制设计与稳定性](/posts/power/courses/ups-pcs-dsp/ch27/)
28. [第28章 谐波补偿Ⅲ：前馈·虚拟阻抗·直流抑制·实战](/posts/power/courses/ups-pcs-dsp/ch28/)
29. [第29章 数字锁相环（PLL）](/posts/power/courses/ups-pcs-dsp/ch29/)

## 系统功能（第30~44章）

30. [第30章 旁路切换与无扰转移](/posts/power/courses/ups-pcs-dsp/ch30/)
31. [第31章 三相SVPWM与dq解耦控制](/posts/power/courses/ups-pcs-dsp/ch31/)
32. [第32章 三相四线制·不平衡负载·零序与中点平衡](/posts/power/courses/ups-pcs-dsp/ch32/)
33. [第33章 并网控制策略：PQ·下垂·VF·LVRT](/posts/power/courses/ups-pcs-dsp/ch33/)
34. [第34章 整机模式状态机与能量流协同](/posts/power/courses/ups-pcs-dsp/ch34/)
35. [第35章 软启动·预充电与预偏置](/posts/power/courses/ups-pcs-dsp/ch35/)
36. [第36章 保护功能与故障处理](/posts/power/courses/ups-pcs-dsp/ch36/)
37. [第37章 固件架构与实时任务调度](/posts/power/courses/ups-pcs-dsp/ch37/)
38. [第38章 并机并联与环流抑制](/posts/power/courses/ups-pcs-dsp/ch38/)
39. [第39章 效率优化与ECO模式](/posts/power/courses/ups-pcs-dsp/ch39/)
40. [第40章 数字通信与上位机监控](/posts/power/courses/ups-pcs-dsp/ch40/)
41. [第41章 遥测体系与计量精度](/posts/power/courses/ups-pcs-dsp/ch41/)
42. [第42章 电池SOC / SOH估算](/posts/power/courses/ups-pcs-dsp/ch42/)
43. [第43章 电池充放电管理与BMS协同](/posts/power/courses/ups-pcs-dsp/ch43/)
44. [第44章 孤岛检测与反孤岛保护](/posts/power/courses/ups-pcs-dsp/ch44/)

## 工程实践（第45~48章）

45. [第45章 EMC设计要点](/posts/power/courses/ups-pcs-dsp/ch45/)
46. [第46章 热设计与可靠性](/posts/power/courses/ups-pcs-dsp/ch46/)
47. [第47章 前沿技术：SiC/GaN·构网型·数字孪生](/posts/power/courses/ups-pcs-dsp/ch47/)
48. [第48章 综合实战：50kW三相储能PCS + 模块化UPS双主线全流程](/posts/power/courses/ups-pcs-dsp/ch48/)

## 附录

- [附录A 安规、并网认证与标准合规](/posts/power/courses/ups-pcs-dsp/appendix-a/)
- [附录B 量产标定、ATE 测试与出厂大纲](/posts/power/courses/ups-pcs-dsp/appendix-b/)
- [附录C 降额设计、DFMEA 与可靠性预计](/posts/power/courses/ups-pcs-dsp/appendix-c/)

## 课程文档

| 文档 | 说明 |
| --- | --- |
| [课程介绍](/posts/power/courses/ups-pcs-dsp/docs/intro/) | 课程定位、覆盖岗位与学习方式 |
| [课程设计理念](/posts/power/courses/ups-pcs-dsp/docs/philosophy/) | 为什么这样组织内容 |
| [术语与缩略语表](/posts/power/courses/ups-pcs-dsp/docs/glossary/) | 全书专业词唯一口径 |
| [整机验收指标（产品级）](/posts/power/courses/ups-pcs-dsp/docs/acceptance/) | 源自真实采购技术规范书的量化单 |
| [实验指导书（LAB0~LAB5）](/posts/power/courses/ups-pcs-dsp/docs/labs/) | 配套上机实验 |
| [三套岗位定制课表](/posts/power/courses/ups-pcs-dsp/docs/paths/) | UPS研发 / PCS网侧 / 系统集成 |
| [练习参考答案与评分要点](/posts/power/courses/ups-pcs-dsp/docs/answers/) | 各章练习答案 |
| [参考文献与来源验证](/posts/power/courses/ups-pcs-dsp/docs/references/) | 内容溯源 |
| [课程质量验证标准](/posts/power/courses/ups-pcs-dsp/docs/quality/) | 内容质量口径 |
| [参考代码索引与对照表](/posts/power/courses/ups-pcs-dsp/docs/reference-code/) | F28075 实机代码索引 |

## 推荐学习路径

- **UPS 方向**：全读，重点第 13/24/30/36 章；33 章 LVRT 与 32 章四线制必读；30 章旁路切换全读。
- **PCS 方向**：全读，重点第 14/25/27/33/44 章；30 章旁路可略读；34 章整机状态机与 37 章固件架构是岗位面试高频。
- **共同第一闭环**：学完第 11 章 DC-DC 整定后，立即在低压 Buck 板上闭合一个电压环——这是全书最重要的动手节点。
- **安全三句话**：限流电源起步；单手操作；母线电容断电后先验放电再碰。
