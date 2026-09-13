---
title: "三套岗位定制课表"
published: 2026-09-13
draft: false
visibility: public
description: "共用底座为第0月（第0~7章 + LAB0）。此后分轨，每轨 12 周节奏，里程碑即\"出师验收线\"。原则：先能上岗干活，再回头补理论深度。全表章号一律按 第0章 + 48 章 + 附录 A~C 体系编号。"
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
articleId: power/courses/ups-pcs-dsp/docs/paths
order: 750
---
共用底座为**第0月**（第0~7章 + LAB0）。此后分轨，每轨 12 周节奏，里程碑即"出师验收线"。原则：** 先能上岗干活，再回头补理论深度。**全表章号一律按 [第0章 + 48 章 + 附录 A~C](/posts/power/courses/ups-pcs-dsp/ch00/) 体系编号。

### Track A · UPS 研发工程师

| 周 | 章节/实验 | 产出物 |
| --- | --- | --- |
| 1-2 | 第8~10章 + LAB1 | Buck 对象辨识与 SSA 验证报告（手算/脚本 ±1%） |
| 3-4 | 第11~12章 + LAB2 | Buck 电压环闭环波形归档（PM ≥40° 硬件复核线，仿真设计判据 ≥45°——口径说明见 glossary/labs、跌落 <5%） |
| 5-6 | 第13章精读 + LAB3 步骤①② | "峰推穿越"复现报告（2.47kHz/16° vs 2.23kHz/49°） |
| 7-8 | 第23~28章谐波篇 + LAB4 | 非线性负载 THDu 达标记录（≤3%） |
| 9-10 | 第29~30章（PLL / 旁路切换与无扰转移） | 旁路切换 50 次统计表（≤1ms 判据） |
| 11-12 | 第21章双环带宽 + 第35/36章软启与保护 + LAB5；综合小项目：2kW 单相机低压→半压联调 | **里程碑A** |

里程碑 A：

独立完成单相 2kW 在线 UPS 的控制软件全套（双环+PR+前馈+保护+旁路+黑匣子），非线性满载 THDu≤3%，切换零感知。可胜任 UPS 初级研发岗。

### Track B · PCS 并网/网侧工程师

| 周 | 章节/实验 | 产出物 |
| --- | --- | --- |
| 1-2 | 第10~12章深读 + LAB1/LAB2 | SSA 手推+辨识报告 |
| 3-5 | 第14章精读(CFBV推导) + LAB3 改造为三相 dq 版 | LCL 阻尼前后对比图 |
| 6-7 | 第31章 SVPWM+dq；第29章 PLL + LAB4 | SVPWM 扇区验证 + PLL 阶跃响应 |
| 8-9 | 第26~28章谐波篇 + 第33章并网策略 | PQ 控制仿真 + 指定次补偿报告 |
| 10 | 第44章孤岛检测 + 第33章 LVRT 策略实现 | 低穿曲线通过判定脚本 |
| 11 | 弱电网专题：第14章 14.6 节方法做 SCR 扫描 | **SCR-fr 灵敏度表（自产）** |
| 12 | 综合：第48章 50kW 案例的软件框架复刻（含四线制/不平衡） | **里程碑B** |

里程碑 B：

在仿真中完成三相 PCS 并网充放、离网 VF、并离网切换与 LVRT 四大场景；提交含阻抗校核的弱电网适应性报告。可胜任 PCS 控制算法岗笔试+面试。

### Track C · 储能系统集成 / 测试工程师

| 周 | 章节/实验 | 产出物 |
| --- | --- | --- |
| 1-2 | 第1/8章 + 第36章保护矩阵 + LAB0 | 系统框图手绘图 + 保护矩阵表 |
| 3-4 | 第40~41章（通信/遥测与计量）+ Modbus 上机 | 寄存器表对接成功截图 + 计量精度核对 |
| 5-6 | 第35~36章（软启/保护时序 + 黑匣子分析） | 故障日志还原一份真实案例 |
| 7-8 | 第39/42/43章（ECO / SOC / BMS 交互） | SOC 误差追踪一周曲线 |
| 9 | 第45章 EMC 测试流程 + 第46章可靠性 + 附录C FMEA | FMEA 表一份 |
| 10-12 | 跟产：出厂测试大纲执行（第48章七步 + [附录 B](/posts/power/courses/ups-pcs-dsp/appendix-b/) 量产标定与 ATE） | **里程碑C** |

里程碑 C：

能独立编写并执行一款 PCS 的出厂测试大纲，读懂黑匣子定位三类典型故障（采样链/时序/参数漂移）。可胜任测试与现场应用岗。

### 三轨通用建议

- 每周固定 2 小时回看错题本（[练习参考答案](/posts/power/courses/ups-pcs-dsp/docs/answers/)页对照自查）。
- 任何一章学完，强制回答：**"这一章的模式落在第34章整机状态机的哪个节点里？"**（模式矩阵见第34章，并网策略与 VF/LVRT 见第33章，旁路与无扰转移见第30章）。
- 凡涉及"过/不过"的判定，一律回到 [整机验收指标表](/posts/power/courses/ups-pcs-dsp/docs/acceptance/) 找整机级数值，回到各章"验收量化单"找环节级判据。
- 里程碑未过不进入下一轨段——宁慢勿虚，功率电子的坑都是欠账变的。
- 硬件台架与 LAB 判据以 [实验指导书](/posts/power/courses/ups-pcs-dsp/docs/labs/) 为准；质量门槛以 [质量标准](/posts/power/courses/ups-pcs-dsp/docs/quality/) 为准；术语不懂先查 [术语表](/posts/power/courses/ups-pcs-dsp/docs/glossary/)。
