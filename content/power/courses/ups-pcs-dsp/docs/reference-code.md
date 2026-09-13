---
title: "参考代码索引与对照表"
published: 2026-09-13
draft: false
visibility: public
description: "本课程正文出现的代码均为面向 F28075 + float 的教学重写版：常量来自各章算例、接口统一（adc_/pwm_/ctrl_/prot_/task_ 前缀、_isr 结尾）。但结构与口径不是凭空造的——它们对照学员手头的既有工程代码"
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
articleId: power/courses/ups-pcs-dsp/docs/reference-code
order: 790
---
本课程正文出现的代码均为**面向 F28075 + float 的教学重写版**：常量来自各章算例、接口统一（`adc_/pwm_/ctrl_/prot_/task_` 前缀、`_isr` 结尾）。但结构与口径不是凭空造的——它们对照学员手头的既有工程代码核对过。本页给出对照关系、参考代码里的关键常量与命名，便于"课上学结构、工程里对代码"。

> [!WARNING]
> 使用纪律：①参考代码是他方工程代码（平台、编码、许可各不相同，部分为 GBK 编码的定点工程），课程不直接复制其代码，只借鉴结构、命名与工程口径；②参考代码里的角度/电流有各自的标幺与 Q 定标约定，照抄常量会出错，必须按本课程第20章（标幺与定标）重新折算；③凡与本书算例冲突处，以本书算例的口径为准，并在设计说明里记明差异。

### 0. 主参考：`UPS-PCS课程\部分参考代码\`（F28075 逆变侧真实工程）

这是与本书同平台的现场工程代码，也是**本书各章代码的第一对照件**。该目录自带的 readme 明确写着"代码不全且注释不完全可信，需鉴别"，因此下表只登记可以从代码本身读出的设置，推断项单独标注。

| 文件 | 规模 | 能读出的内容（可直接对照） |
| --- | --- | --- |
| `逆变侧28075epwm1配置.cpp` | 2.1 KB | TBPRD = 1667、TB_COUNT_UPDOWN、TZCTL 双路 `TZ_FORCE_LO`（安全电平）、死区 `KDeadTime3usCnst`、HRPWM 使能（HRCNFG/HRPCTL、AUTOCONV）、INT on CTR_ZERO 且 `INTPRD = ET_2ND` |
| `逆变侧28075epwm2配置.cpp` | 2.0 KB | TBPRD = 1667（注释"载波18K"）、相位加载 `PHSEN = TB_ENABLE` + `SYNCODEL = TB_SYNC_IN`、`CMPC = 1517`（注释"延时2.49us"）、CMPD = 150、**由 ePWM2 触发 ADC**（`SOCASEL = 1 / SOCAEN = 1 / SOCAPRD = 1`） |
| `逆变侧28075ADC配置.cpp` | 10.1 KB | 用 **ADCA/ADCB/ADCD 三组**（未用 ADCC）、12 位单端、`INTPULSEPOS = 1`、ADCCLK 分频后按"13/120 + 10.3/(120/3)"算出 **2.733 MSPS < 3.1 MSPS** 的采样率预算、`ACQPS = 12`、全部 SOC 的 `TRIGSEL = 7`（ePWM2 SOCA）；通道用途含 `Vouta/VBPA/Ibal/Vnpgnd/VINDC_A/Ila1/Ila2` 与温度、模块 ID |
| `逆变侧epwm中断内容.cpp` | 14.5 KB | 下溢中断 ISR 的完整调用序列与**每段实测耗时**（如 485 通信 1.8µs/最大 4.6µs、CLA 回传 1.22µs、BpPreDeal 1.045µs）；用 `ReadCpuTimer0Counter()` + eCAP1 做 ISR 时长测量；`INT_RUN_FUNCTION = 0x8001/0x8003` 软件 trace；`g_i16_IntCnt1Per2_0` 奇偶拍分工 |
| `逆变侧28075CLA内容.cpp` | 60.8 KB | CLA 承担的部分（含 θ 数据与采样数据处理的 CPU↔CLA 交换） |
| `逆变算法类内容.cpp` | 70.1 KB | 逆变算法类实现（`objInvAlg` 等方法体） |

#### 0.1 平台重定标：已对齐项与剩余待改项

已按主参考代码完成机械重定标（全书 34 个页面、197 处）：`16kHz → 18kHz`、`62.5µs → 55.6µs`、`93.75µs → 83.3µs`、`TBPRD=1667 → 1667`、`死区 2.2µs → 3µs`、`带宽口径 1.6kHz → 1.8kHz`、`6,667 周期 → 6,667 周期`。

> [!IMPORTANT]
> 一个自洽性检查（说明重定标为什么能保住大量算例）：1.5Ts延迟的相位只取决于 f/fsw，旧口径1.6kHz/16kHz = 0.1与新口径1.8kHz/18kHz = 0.1恰好相同 →"1.5Ts在该带宽处 = 54°" 这个跨章主数字保持不变；凡是按 fsw/10 设计交越的章节（第10/13/14/17/21章）相位账无需重算。

**仍需逐章手算的项（下一批处理）：**

| 待改项 | 旧值（16kHz/2.2µs） | 新值（18kHz/3µs） | 涉及章节 |
| --- | --- | --- | --- |
| 死区损失比 | 2.2/62.5 = 5.40% | 3/55.6 = **5.40%** | 第6/13章 |
| 死区误差电压（400V 母线） | 21.6 V | **21.6 V** | 第6/13章 |
| 死区谐波（3/5/7 次） | 1.33% / 0.80% / 0.57%（RSS 1.65%，基波峰值 311V 口径） | **维持 1.33/0.80/0.57、RSS 1.65%**（audit-v1 F3 已统一口径；18kHz/3µs 失损失真比恰为 5.40%，与该组值配套） | 第6/13/23章 |
| ISR 占用率 | 2020/7500 = 27%、2600/7500 = 35% | ISR 按 9kHz 执行：2020/13333 = **15.2%**、2600/13333 = 19.5% | 第3/4/37章 |
| 内环 1kHz 处延迟相位 | 33.75°（16kHz 历史，PM 54.3°） | 30.0°（1.5×55.6µs@1kHz → 与 LAB3/第13章一致的 PM 56.3°） | 第13/14章 |
| 外环 455Hz/500Hz 延迟相位 | 13.65° / 15.0° | 13.65° / 15.0°（→ 第13章最终 PM 46.4°，与 LAB3 一致） | 第13章 |
| PFC 电感与电流环 | L = 4.2mH、fc_i = 800Hz | 按 18kHz 重算（L 与 fRHPZ 随 fsw 变） | 第12章 |

另需新增的章节内容（参考工程有、课程尚无）：CLA 分工与 CPU↔CLA 数据交换、软件 trace（`INT_RUN_FUNCTION`）、ISR 分段实测耗时标注、奇偶拍分工（`g_i16_IntCnt1Per2_0`）、三组 ADC 并行与采样率预算、HRPWM 分辨率、C++ 对象化架构与三段式命名规范。

| 项目 | 重定标前口径（历史记录） | 参考工程（部分参考代码） | 处理结果 |
| --- | --- | --- | --- |
| 载波频率 / TBPRD | 18kHz，Ts = 55.6µs，TBPRD = 1667 | TBPRD = 1667，注释"载波 18K"（需确认 EPWMCLK 分频；60MHz 时 60e6/(2×1667) = 18.0kHz） | **跨章数值需重定标**：Ts、1.5Ts、延迟相位、ISR 周期预算、采样对齐点 |
| 死区 | 3µs（按器件极值算，第6章算例 6-2） | 常量名即 `KDeadTime3usCnst` → 3µs | 死区损失从 5.40% 变 4.8%（18kHz、3µs）→ 第6章算例需并列两套值 |
| 中断频率 | 每载波周期一次（18kHz） | INT on CTR_ZERO 且 `INTPRD = ET_2ND` → **每 2 个载波周期一次**（约 9kHz） | 控制周期、双更新可行性、ISR 预算全部随之变化（第4/21/37章） |
| ADC 使用 | 单组 ADC + 多 SOC，样例通道分配 | **ADCA + ADCB + ADCD 三组并行**，统一由 ePWM2 SOCA 触发，ACQPS = 12 | 第5章需补"多组并行 + 采样率预算（2.733MSPS）"的算例 |
| 硬件加速 | 未涉及 CLA | **CLA 分担 θ 与采样数据处理**（CPU↔CLA 数据交换） | 第2/31/37章需补 CLA 的分工边界与数据交换纪律 |
| ADC 触发源 | 本机 ePWM 过零/峰谷（第5章） | 由 **ePWM2** 的 SOCA 统一触发（含 CMPC = 1517 的 2.49µs 相移） | 第5章"采样对齐"要补"相移补偿"的实际做法 |
| 语言与架构 | C，模块前缀 `adc_/pwm_/ctrl_/prot_/task_` | **C++ 类的对象化架构**（`objInvAlg / objSystem / objInvCtrl / objDCBus / objBypass / objOutput / objBalancer / objLBS / objSCIComm / objDigitalIO / objMonInterface / objTimerDrv`），方法三段式命名 `Alg_Int_* / Dat_Int_* / App_Int_* / Drv_*` | 第37章需补"C++ 对象化 + 三段式命名 + 匈牙利前缀"的工程规范，并给出与本书 C 模块化风格的映射表 |
| 运行时诊断 | GPIO 打点 + 统计最大/平均时长（第37章） | `ReadCpuTimer0Counter()` 测 ISR 时长 + `INT_RUN_FUNCTION` 全局变量做软件 trace + eCAP1 计数 | 第37章补"软件 trace"与"分段耗时标注"两项工程做法 |
| 通信位置 | 纪律：通信不进 ISR（第37章） | **485 通信在 ISR 内执行**（实测 1.8µs，最大 4.6µs） | 第37章补"为什么真实工程敢把它放进来"的定量论证与适用边界 |
| 逐波限流 / 母线平衡 | 第36章（本轮新增）、第15章（直流支路） | ISR 内可见 `objDCBus.Alg_Int_PulseChange()`（逐波限流值修正）、`objBalancer.Dat_Int_IBalPreDeal()`（母线平衡电路电流）、`Ibal / Vnpgnd` 采样通道 | 两处已在课程中出现，可直接用参考代码的类名与采样通道印证 |

> [!IMPORTANT]
> 结论与后续动作：参考工程把本书的"平台口径"从教学假设变成了可核对的现场设置。下一步需做一次平台重定标批次：以 TBPRD = 1667 / 死区 3µs / 每 2 周期中断 / 三组 ADC / CLA 分担 为主口径，把第0、3、4、5、6、21、31、37 章的跨章数值改为双栏并列（教学假设 vs 参考工程实值），并补 CLA、软件 trace、C++ 架构三节。

### 0.2 参考工程里课程尚缺的七项（平台级做法，按代码逐条列）

| # | 做法 | 参考代码里的证据 | 要补进课程的章节与要点 |
| --- | --- | --- | --- |
| 1 | CLA 分担控制计算 | `逆变侧28075CLA内容.cpp`（60.8 KB）；CPU 侧 `APP_Int_ToClaThetaDataDeal()`、`APP_Int_PrimaryToClaDataDeal()`、`APP_Int_FromClaDataDeal()`（注释"运行时间 1.22µs，放这个位置是为了等 CLA 里面的采样数据出来"） | **第2章**（CLA 资源与触发源）、** 第31章**（把 SVPWM/坐标变换放 CLA 的边界）、** 第37章**（CPU↔CLA 数据交换纪律：共享区、握手标志、数据一致性；CLA 不经 PIE，用任务触发/软件中断） |
| 2 | 软件 trace（跑到哪个函数） | `INT_RUN_PREVIOUSFUNCTION = INT_RUN_FUNCTION; INT_RUN_FUNCTION = 0x8001/0x8003;` 贯穿整个 ISR | **第37章**：用全局变量记录"当前执行到的功能码"，死机/复位后可直接读出最后执行位置；成本 2 条赋值指令；与黑匣子（第36章）配合 |
| 3 | ISR 分段实测耗时标注 | ISR 内每个调用后都带注释：`485 通信 平均1.8µs/最大4.6µs/最小0.2µs`、`DCBusPreDeal 0.3µs`、`FromClaDataDeal 1.22µs`、`BpPreDeal 1.045µs`、`OutPreDeal 0.428µs`、`PulseChange 0.8µs` | **第4/37章**：要求"每个 ISR 内函数都标注实测平均/最坏耗时"，并纳入代码评审；比只测 ISR 总时长更容易定位超时来源 |
| 4 | 奇偶拍分工 | `g_i16_IntCnt1Per2_0`：`==1` 时做时钟维护与主程序接口 2，否则做 `Alg_Int_PulseChange()`（逐波限流值修正）与 `objBalancer.Dat_Int_IBalPreDeal()`（母线平衡电流） | **第4/21/37章**：把"重活"按拍分摊，使 ISR 最坏时长可控；注意由此产生的"功能每 2 拍才更新一次"必须写进时序说明 |
| 5 | 三组 ADC 并行 + 采样率预算 | `ADCA/ADCB/ADCD` 同时用，`ACQPS = 12`，注释给出 `1/(13/120 + 10.3/(120/3)) = 2.733 MSPS < 3.1 MSPS`，全部 SOC 由 `ePWM2 SOCA`（`TRIGSEL = 7`）触发 | **第5章**：补"多 ADC 并行分工 + 采样率上限算例（ACQPS/ADCCLK 与转换时间相加）"；** 第13/14章**：说明为何采样点由 ePWM2 统一触发（含 `CMPC=1517 / CMPD=150` 的 2.49µs 相移） |
| 6 | HRPWM 高分辨率 | ePWM1/2 均使能 `HRCNFG.bit.EDGMODE = HR_REP`、`HRLOAD = HR_CTR_ZERO_PRD`、`AUTOCONV = 1`；`HRPCTL.bit.HRPE = 0` | **第3/31章**：补 HRPWM 的边沿分辨率（约 150 ps 量级，相对 55.6µs 周期约 21 位）、`HRPCTL.HRPE` 与死区/跳闸的交互、以及"何时需要 HRPWM"（低频输出、并机相位微调、THDu 改善） |
| 7 | C++ 对象化架构与命名规范 | 文件为 `.cpp`；对象：`objInvAlg / objSystem / objInvCtrl / objDCBus / objBypass / objOutput / objBalancer / objLBS / objSCIComm / objDigitalIO / objMonInterface / objTimerDrv`；方法三段式 `Alg_Int_*`（算法-中断）、`Dat_Int_*`（数据-中断）、`App_Int_*`（应用-中断）、`Drv_*`（驱动）；前缀 `i16/u32/f32`、成员 `m_`、全局 `g_` | **第37章**：给出"三段式命名 + 对象划分 + 匈牙利前缀"的工程规范，并给出与本书 C 模块化（`adc_/pwm_/ctrl_/prot_/task_`）的映射表，便于对读参考代码 |

> [!IMPORTANT]
> 这七项的共同点：它们都不改变算法数学，但决定"工程能不能落地、现场能不能定位"。参考工程用 CLA 换算力余量、用软件 trace 换可诊断性、用分段耗时换 WCET 可信度、用奇偶拍换最坏路径、用三 ADC 换采样并行度、用 HRPWM 换输出精度、用对象化换多人协作——本书下一批把这七项按上表落点补进正文。

### 0.3 逆变算法类的 17 个方法：课程覆盖情况（继续挖参考代码的入口）

`逆变算法类内容.cpp`（70.1 KB）里可解析出的方法名与含义如下。左列是参考工程实有功能，右列是本书当前状态——**"缺口"项就是后续要继续补进正文的内容**。

| 方法名（参考工程） | 功能 | 本书状态 | 落点 |
| --- | --- | --- | --- |
| `Alg_HardwareDelayCmpn` | **硬件延迟补偿**（把采样/驱动/滤波链的固定延迟从控制里补掉） | ** 缺口**：本书只做了"延迟链核算"（第10章 1.5Ts）与"相位账"（第9章），没有给补偿实现 | 第10/21章补"延迟补偿环节" |
| `Alg_Int_PhaseLock1` | 锁相 1（本振/跟旁路双模式、步长限幅、1.9° 固定相位补偿） | 已对照（`ups\pll.c`，本页 0.2/第2节） | 第29/30章 |
| `Alg_Int_PhaseLock2` | 锁相 2（第二个相位基准，用于并机/输出的另一路同步） | **缺口**：本书只写了单一 PLL 与三同步判据 | 第29/30章补"双锁相分工" |
| `Alg_Int_LockStatus` / `Alg_LockStatus` | 锁相状态机（中断内快速判定 + 非中断慢判） | 部分覆盖（第29章失锁判定放 1ms 任务） | 第29章补"双上下文状态机" |
| `Alg_Int_InvSyncRecord` | ISR 首项：逆变同步记录（相位/时钟基准） | 部分覆盖（第37章 ISR 序列） | 第37章 |
| `Alg_Int_CarrierPowerCANSync` | **载波与 CAN 功率同步**（并机模块间载波相位与功率指令同步） | ** 缺口**：第38章只写了均流与环流，没有"载波同步"这一层 | 第38章补"载波同步链" |
| `Alg_Int_CurrShareReg` | 均流调节（模块间电流均衡） | 已覆盖（第38章 Ksh = 0.1Ω 均流环） | 第38章 |
| `Alg_Int_bBpVoltAbnormalFastChk` | **旁路电压异常快速检查**（切换前的快速有效性判定） | 部分覆盖（第30章三同步判据），缺"快检"这一层 | 第30章补"快速否决条件" |
| `Alg_Int_ECOFreqFastChk` | ECO 频率快速检查（进出 ECO 的电网质量判据） | 已覆盖（第39章 `ECO_SWITCH_RATE` 与电网质量判据） | 第39章 |
| `Alg_Int_TransformerAndDcCmp` | **变压器与直流分量补偿**（输出直流分量的主抑制环节） | 部分覆盖（第28章 28-4 给的是"直流谐振器/慢积分"方案） | 第28章补"变压器侧直流补偿" |
| `App_Int_VinvDcReg` | 逆变输出电压直流调节 | 已覆盖（第28章直流抑制环） | 第28章 |
| `App_Int_IlDcCirReg` | **电感电流直流/环流调节**（抑制支路间直流环流） | ** 缺口**：第15章写了支路差流 iΔ 的机理，没写"直流分量环流"的调节 | 第15/38章补"直流差流调节" |
| `Alg_Int_InvOffReset` | 逆变关机与复位（与模式状态机的接口） | 已覆盖（第34章状态机退出动作） | 第34章 |
| `App_InvAlgEsetConfig1/2` | 算法参数配置（在线可改的参数集） | 已覆盖（第37章参数表 + CRC） | 第37章 |
| `App_InvAlgVarInit` | 变量初始化（含上电顺序） | 已覆盖（第48章 48-5 上电清单） | 第48章 |

> [!IMPORTANT]
> 由此得到的下一批补充清单（按优先级）：①硬件延迟补偿（第10/21章）——把"知道延迟"升级为"补掉延迟"；②载波与 CAN 功率同步 + 直流差流调节（第15/38章）——并机的第二层与第三层；③双锁相分工（第29/30章）；④旁路电压异常快检（第30章）；⑤变压器与直流分量补偿（第28章）。另注：逆变侧28075CLA内容.cpp（60.8 KB）里没有类名::方法名形式的定义，说明 CLA 侧用的是另一套约定（CLA 任务函数 + 共享区变量），需要单独解析后再补进第31/37章的 CLA 一节。

### 1. 代码与工程资产清单

| 参考代码/资产 | 来源路径（相对 `学习\`） | 规模/形态 | 对应章节 |
| --- | --- | --- | --- |
| UPS 逆变相位锁定（PLL1） | `ups\pll.c` | 373 行 C（GBK，定点风格） | 第29章、第30章 |
| 汇川 MD380 伺服 FOC 浮点实现 | `MotorControl-main\伺服\md380_foc_float.h` | 1962 行 C 头文件 | 第6/11/18/19/20/31章 |
| 安川7 伺服 FOC 浮点实现 | `MotorControl-main\伺服\sigma7_foc_float.h` | C 头文件 | 第11/19/31章 |
| 安川7 工程分析报告（12 篇） | `MotorControl-main\伺服\012_安川7_yaskawa7\08_报警与保护机制分析.md`、`09_时序逻辑与使能序列分析.md`、`12_Round轮询任务与应用功能分析.md` | Markdown 分析报告 | 第35/36/37章 |
| T 型三电平 SPWM 门极生成 | `电源\labs\ttype-three-level\ttype_3level_spwm_gates.m`、`spwm_ttype_3level_sfunc.m`、`ttype_3level_clean.slx` | MATLAB/S 函数 + Simulink | 第15/31章 |
| 电机参数辨识（L / R / 磁链） | `AxDr_L\L_identification.c`、`RLID.c`、`R_flux_identification.c`（Simulink 代码生成） | 生成 C + 模型 | 第22章（辨识与环路增益测量） |
| 125kVA UPS 课程骨架（含仿真/工具/测试） | `电源\courses\125kva-ups-14-week\`（simulations/tools/tests/content） | 课程与仿真工程 | 第15/32/34章、附录B |
| LLC/PFC/逆变设计工具 | `电源\llc_design_tool_v1\`（llc_design、pfc_design、inverter_design、power_codegen） | Python 工具包（含 GUI） | 第12/13/16章、`sim/` |
| UPS 控制软件术语与工况手册 | `电源\docs\ups-control-software-glossary.md` | 39 KB Markdown | 术语口径、第36/38章 |
| 基底教材《数字电源DSP控制算法从入门到精通》 | `UPS-PCS课程\基底\`（30 章 HTML） | 课程文本 | 章节范围对照（第10/12/20/22/26/27章等） |
| 《控制系统设计指南》第4版 | `UPS-PCS课程\基底\控制系统设计指南  原书第4版.pdf` | PDF | 第10/17/22章（补偿与整定的外部依据） |

### 2. `ups\pll.c`：可直接对照的三个工程做法

```text
函数：Class_InverterAlgorithm::Alg_Int_PhaseLock1()
功能：调整逆变给定矢量角"瞬时步长"，使逆变相位向输出/旁路相位靠齐（PLL1 锁相 + 角度三角函数计算）

做法① 双模式相位源（与本课程第29/30章的分工一致）
  case 0 本振：i32tmpDx_0 = m_i32K50HzDtheta − m_unPLL1DthetaRefStd_0.dword;   // 50Hz 自振
               另一支路用 m_i32K60HzDtheta                                          // 60Hz 制式
  case 1 跟旁路：i32tmpDx_0 = objBypass.m_unDthetaBpBase_0.dword;                 // 以旁路为基准
               UPDNLMT32(i32tmpDx_0, (m_i16FreqSetMax_0 << 16), (m_i16FreqSetMin_0 << 16));
               再对相位增量限幅：UPDNLMT32(i32tmpDx_0, m_i16ThetaStepBp_0, −m_i16ThetaStepBp_0);
  → 对应本书：第29章 29-3 的"频率跟踪限速"与第30章 30-2 的三同步判据；
    m_i16ThetaStepBp_0（每拍角度步长上限）就是本书 PLL_DF_MAX（2 Hz/s → 7.854e-4 rad/拍）的工程实现形态

做法② 角度用定点标度而非浮点
  角度基准分辨率：m_unDthetaLBSBase_0.dword = (m_u32KDthetaInvSyncBase << 16) / (m_i32TLBS_0 >> 1);
  注释给出标度：360 × 1024 × 10^8 / fpwm / cnt —— 用 int64 表示"每拍角度增量"，
  避免浮点同时保留 360°/1024 精度与 10^8 细度（本书第20章 20.5 "先标幺再定标"的工程版本）

做法③ 锁相支路上的固定相位补偿
  f32_tmpPllCompCos = 0.99945022f;  // cos(1.9°)
  f32_tmpPllCompSin = 0.03315518f;  // sin(1.9°)
  → 这是补偿采样/滤波链引入的固定相位滞后（本书第9章 9-3 的"相位账"）：
    1.9° 在 50Hz 上等于 105.6µs 的时延，必须由补偿角抵掉，否则并机与切换时相位不一致
  → 校验方法（本书口径）：双通道录波量"逆变输出与旁路电压的相位差"，把补偿角调到 0°±0.2°
```

### 3. 汇川 MD380 FOC 浮点实现：与本书口径逐条对照

| 参考代码设计要点 | 本书对应 | 差异与处理 |
| --- | --- | --- |
| 标幺基值：电流 1.0f = 最大电流、电压 1.0f = **母线电压 Vdc/2**、速度 1.0f = 最大速度 | 第20章 20.5（标幺化）、第14章（Kmod = Vdc/2） | 口径一致：本书第14章 Kmod 也取 Vdc/2（相对母线中点） |
| 电流环用**零极点对消法** 设计，阻尼比 ksi = 1/√2 | 第22章 22-2（零极点抵消）、第14章（ζ = 0.707） | 本书给出闭式解 Kp = ωc·K⁻¹，可直接与参考代码的系数对照 |
| 抗饱和采用**积分钳位式（条件积分）** | 第19章 19-4、第11章 11-6/11-7 | 本书额外给出"退饱和时间"手算（0.44s vs ≤20ms）作为判据 |
| 大转矩工况 **P-PI 切换**（转矩 >200% 额定时切纯 P） | 第36章（保护与降额）、第21章（限幅配合） | 本书对应"过载时降额/切换控制结构"，可把 P-PI 切换视为一种主动降额 |
| 弱磁（电压反馈型 PI，速度自适应增益） | 本课程不涉及（UPS/PCS 无弱磁） | 只借鉴其"增益随工况自适应"的思想（第17章敏感度） |
| 死区补偿支持**矩形与梯形** 两种方式 | 第6章（死区与伏秒补偿）、第32章（过零畸变） | 本书第6章算例给出 3/5/7 次谐波 1.33%/0.80%/0.57%（RSS 1.65%，按基波峰值 311V 口径，audit-v1 F3 统一），可与补偿前后实测对比 |
| 陷波滤波器用**双线性变换** 设计 | 第18章 18-2/18-3、第12章 12.6（2ω 陷波系数） | 本书给出陷波系数的完整推导与校核（直流增益 1、Nyquist 处 1） |
| SVPWM + 过调制（OverMod） | 第31章（SVPWM、最小零矢量、母线利用率） | 本书按"最小零矢量 6µs"给出可用调制比 365V（比理论 404V 更严） |
| 模块化组织：CurrentFeedback / Transform / CurrentLoopPI / DeadTimeComp / SVPWM / NotchFilter … | 第37章（固件架构与任务划分） | 命名风格可对照；本书统一 `adc_/ctrl_/pwm_/prot_` 前缀便于跨章引用 |

### 4. 安川7 工程分析报告：直接补本书第35~37章的空白

| 报告 | 本书章节 | 本轮已按此补齐的内容 |
| --- | --- | --- |
| `09_时序逻辑与使能序列分析.md` | 第35章（软启动/预充）、第38章（热插拔） | 热插拔五步时序：插入检测→读模块信息→预充/同步→相序与相位核查→缓慢并入并参与均流 |
| `08_报警与保护机制分析.md` | 第36章（保护与故障处理） | 逐波限流、打嗝（hiccup）与锁死区分、自恢复策略、故障分级 |
| `12_Round轮询任务与应用功能分析.md` | 第37章（任务调度） | 轮询式任务表 + 看门狗计数的工程形态（本书 37-5 的 `task_t` 表） |

### 5. T 型三电平与参数辨识代码：第15/22章的对照件

```text
T 型三电平（电源\labs\ttype-three-level\）
  ttype_3level_spwm_gates.m：由三相参考直接生成 T 型三电平门极（含 P/O/N 判据与死区插入）
  spwm_ttype_3level_sfunc.m：Simulink S 函数封装，便于与本书第15章的状态表逐条对照
  ttype_3level_switching.slx / threephase_debug_measure.slx：逐状态与测量调试模型
  → 用途：把本书 15.5/15.8 的状态判定函数（tl_pick / sw_state_legal_npc）与该脚本对拍

参数辨识（AxDr_L\，Simulink 代码生成）
  L_identification.c / RLID.c（R、L 辨识）、R_flux_identification.c（磁链/电阻辨识）
  foc_para.m：参数表与基值定义（与本书"参数表 + 标定"同思路）
  → 用途：第22章的"对象参数获取"环节：先用辨识/测量得到 L、R，再算穿越频率与补偿器，
    避免"用铭牌参数整定"的常见错误（第17章 17-6 的敏感度表说明 L 容差 ±20% 就吃掉 6.75°）
```

> [!IMPORTANT]
> 本轮起，正文与参考代码的对应关系：凡参考代码中存在同类实现的章节，正文代码块前会加一行"对照参考：文件路径 :: 函数名"，并说明借鉴了什么、改了什么、为什么。已在第29、35、36章落地；其余章节随批次推进补齐。
