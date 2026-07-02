export const generatedSidebar = [
  {
    "text": "电机控制",
    "collapsed": true,
    "items": [
      {
        "text": "仿真专题",
        "collapsed": true,
        "items": [
          {
            "text": "过调制与六阶梯波仿真 — 线性区 → 过调制 → 六阶梯波",
            "link": "/content/motor/simulations/OvermodulationSim.html"
          },
          {
            "text": "速度环与负载转矩观测器仿真 -- 阶跃启动 + 负载扰动 + TL 前馈补偿",
            "link": "/content/motor/simulations/SpeedLoopSim.html"
          },
          {
            "text": "位置 & 速度观测器仿真 -- SMO / Luenberger / PLL 对比",
            "link": "/content/motor/simulations/ObserverSim.html"
          },
          {
            "text": "ADC 电流采样时序 — 避开开关噪声的最佳采样时机",
            "link": "/content/motor/simulations/SamplingTimingSim.html"
          },
          {
            "text": "MOSFET 开关波形仿真",
            "link": "/content/motor/simulations/MosfetSwitchingSim.html"
          },
          {
            "text": "MTPA & 弱磁控制仿真 -- Id-Iq 电流平面与转矩-速度包络",
            "link": "/content/motor/simulations/MTPASim.html"
          },
          {
            "text": "Park 变换可视化",
            "link": "/content/motor/simulations/ParkTransformSim.html"
          },
          {
            "text": "PID 参数调节仿真",
            "link": "/content/motor/simulations/PIDTunerSim.html"
          },
          {
            "text": "RLC 充放电仿真",
            "link": "/content/motor/simulations/RLCSim.html"
          },
          {
            "text": "SVPWM 矢量合成仿真（参考知乎：SVPWM理论与实践）",
            "link": "/content/motor/simulations/SVPWMSim.html"
          },
          {
            "text": "THD 谐波分析仿真 -- SPWM vs SVPWM vs 六步方波",
            "link": "/content/motor/simulations/THDSim.html"
          },
          {
            "text": "启动定位与预定位仿真 -- 电感饱和法 / 预定位 / 高频注入法对比",
            "link": "/content/motor/simulations/InitialPositionSim.html"
          },
          {
            "text": "死区补偿仿真 -- 电压误差分析与补偿策略对比",
            "link": "/content/motor/simulations/DeadtimeCompSim.html"
          },
          {
            "text": "Bode 图交互仿真",
            "link": "/content/motor/simulations/BodePlotSim.html"
          },
          {
            "text": "Clarke & Park 坐标变换仿真 — abc → αβ → dq",
            "link": "/content/motor/simulations/ClarkeParkSim.html"
          },
          {
            "text": "PI 电流调节器仿真 -- dq 电流环阶跃响应与带宽参数化",
            "link": "/content/motor/simulations/CurrentLoopSim.html"
          }
        ]
      },
      {
        "text": "电机控制入口",
        "link": "/content/motor/getting-started.html"
      }
    ]
  },
  {
    "text": "电源控制",
    "collapsed": true,
    "items": [
      {
        "text": "电源课程",
        "collapsed": true,
        "items": [
          {
            "text": "定点数闯关：一小时速通",
            "link": "/content/power/lessons/0049-fixed-point-dungeon.html"
          },
          {
            "text": "教程 0006：Boost C 固件骨架",
            "link": "/content/power/lessons/0006-boost-c-firmware-skeleton.html"
          },
          {
            "text": "教程 0007：Boost 故障锁存与复位状态机",
            "link": "/content/power/lessons/0007-boost-fault-state-machine.html"
          },
          {
            "text": "教程 0008：Boost 慢速任务、遥测与故障日志",
            "link": "/content/power/lessons/0008-boost-telemetry-fault-log.html"
          },
          {
            "text": "教程 0009：单相功率因数校正（power factor correction / PFC）电流参考",
            "link": "/content/power/lessons/0009-single-phase-pfc-current-reference.html"
          },
          {
            "text": "教程 0010：单相功率因数校正（power factor correction / PFC）电压环如何生成电流幅值",
            "link": "/content/power/lessons/0010-single-phase-pfc-voltage-loop.html"
          },
          {
            "text": "教程 0011：单相功率因数校正（power factor correction / PFC）内层电流环",
            "link": "/content/power/lessons/0011-single-phase-pfc-current-loop.html"
          },
          {
            "text": "教程 0012：单相功率因数校正（power factor correction / PFC）的 PWM/ADC 时序与控制延迟",
            "link": "/content/power/lessons/0012-single-phase-pfc-pwm-delay.html"
          },
          {
            "text": "教程 0013：单相功率因数校正（power factor correction / PFC）的输入电压前馈",
            "link": "/content/power/lessons/0013-single-phase-pfc-voltage-feedforward.html"
          },
          {
            "text": "教程 0014：单相功率因数校正（power factor correction / PFC）的平均控制链",
            "link": "/content/power/lessons/0014-single-phase-pfc-average-controller.html"
          },
          {
            "text": "教程 0015：单相锁相环（phase-locked loop / PLL）入门",
            "link": "/content/power/lessons/0015-single-phase-srf-pll.html"
          },
          {
            "text": "教程 0016：单相锁相环（phase-locked loop / PLL）的带宽取舍",
            "link": "/content/power/lessons/0016-single-phase-pll-bandwidth.html"
          },
          {
            "text": "教程 0017：锁相环（phase-locked loop / PLL）的频率限幅与锁定检测",
            "link": "/content/power/lessons/0017-single-phase-pll-lock-detector.html"
          },
          {
            "text": "教程 0018：单相全桥逆变器（single-phase full-bridge inverter）的 LC 输出滤波",
            "link": "/content/power/lessons/0018-single-phase-inverter-lc-filter.html"
          },
          {
            "text": "教程 0019：单相逆变器比例谐振控制（proportional resonant control / PR control）",
            "link": "/content/power/lessons/0019-single-phase-inverter-pr-control.html"
          },
          {
            "text": "教程 0020：单相逆变器的均方根（root mean square / RMS）估算与欠压保护",
            "link": "/content/power/lessons/0020-single-phase-inverter-rms-protection.html"
          },
          {
            "text": "教程 0021：单相逆变器状态机（state machine）与故障锁存",
            "link": "/content/power/lessons/0021-single-phase-inverter-fault-state-machine.html"
          },
          {
            "text": "教程 0022：UPS 固件实时调度骨架",
            "link": "/content/power/lessons/0022-ups-firmware-scheduler.html"
          },
          {
            "text": "教程 0023：单相 UPS 旁路同步与切换许可",
            "link": "/content/power/lessons/0023-single-phase-bypass-sync-transfer.html"
          },
          {
            "text": "教程 0024：UPS 模式状态机",
            "link": "/content/power/lessons/0024-ups-mode-state-machine.html"
          },
          {
            "text": "教程 0025：UPS C 固件骨架",
            "link": "/content/power/lessons/0025-ups-c-firmware-skeleton.html"
          },
          {
            "text": "教程 0026：UPS C 参数表",
            "link": "/content/power/lessons/0026-ups-c-parameter-table.html"
          },
          {
            "text": "教程 0027：UPS 保护标志",
            "link": "/content/power/lessons/0027-ups-c-protection-flags.html"
          },
          {
            "text": "教程 0028：保护去抖与故障锁存",
            "link": "/content/power/lessons/0028-ups-fault-latch-debounce.html"
          },
          {
            "text": "教程 0029：系统故障闭环",
            "link": "/content/power/lessons/0029-ups-system-fault-closure.html"
          },
          {
            "text": "教程 0030：故障码与故障日志",
            "link": "/content/power/lessons/0030-ups-fault-code-logging.html"
          },
          {
            "text": "教程 0031：UPS 遥测通信帧",
            "link": "/content/power/lessons/0031-ups-telemetry-frame.html"
          },
          {
            "text": "教程 0032：UPS 命令解析与安全门控",
            "link": "/content/power/lessons/0032-ups-command-parser.html"
          },
          {
            "text": "教程 0033：UPS 命令响应与拒绝原因",
            "link": "/content/power/lessons/0033-ups-command-response.html"
          },
          {
            "text": "教程 0034：UPS 参数访问边界",
            "link": "/content/power/lessons/0034-ups-parameter-access.html"
          },
          {
            "text": "教程 0035：UPS 参数保存与默认值恢复",
            "link": "/content/power/lessons/0035-ups-parameter-storage.html"
          },
          {
            "text": "教程 0036：UPS 参数保存触发策略",
            "link": "/content/power/lessons/0036-ups-parameter-save-scheduler.html"
          },
          {
            "text": "教程 0037：三相功率与 dq 坐标变换",
            "link": "/content/power/lessons/0037-three-phase-power-dq-transform.html"
          },
          {
            "text": "教程 0038：三相 SRF-PLL 锁相",
            "link": "/content/power/lessons/0038-three-phase-srf-pll.html"
          },
          {
            "text": "教程 0039：三相 dq 电流环解耦",
            "link": "/content/power/lessons/0039-three-phase-current-loop-decoupling.html"
          },
          {
            "text": "教程 0040：两电平 SVPWM",
            "link": "/content/power/lessons/0040-two-level-svpwm.html"
          },
          {
            "text": "教程 0041：Vienna PFC 与中点电压平衡",
            "link": "/content/power/lessons/0041-vienna-pfc-neutral-point-balance.html"
          },
          {
            "text": "教程 0042：三电平 NPC 逆变器",
            "link": "/content/power/lessons/0042-three-level-npc-inverter.html"
          },
          {
            "text": "教程 0043：PCS 并网跟随型 P/Q 控制",
            "link": "/content/power/lessons/0043-pcs-grid-following-pq-control.html"
          },
          {
            "text": "教程 0044：PCS 构网型 V/f 与下垂控制",
            "link": "/content/power/lessons/0044-pcs-grid-forming-vf-droop.html"
          },
          {
            "text": "教程 0045：PCS LCL 滤波器与有源阻尼",
            "link": "/content/power/lessons/0045-pcs-lcl-filter-active-damping.html"
          },
          {
            "text": "教程 0046：PCS 储能 DC-DC 与模式状态机",
            "link": "/content/power/lessons/0046-pcs-storage-dcdc-mode-state-machine.html"
          },
          {
            "text": "教程 0047：TMS320F28075 外设从零配置",
            "link": "/content/power/lessons/0047-tms320f28075-peripheral-bringup.html"
          },
          {
            "text": "MATLAB/Simulink 到 UPS 软件开发快速路线",
            "link": "/content/power/lessons/0048-matlab-simulink-ups-software-roadmap.html"
          },
          {
            "text": "教程 0001：Boost 升压变换器（Boost Converter）",
            "link": "/content/power/lessons/0001-boost-converter.html"
          },
          {
            "text": "教程 0002：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）",
            "link": "/content/power/lessons/0002-ccm-dcm.html"
          },
          {
            "text": "教程 0003：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）",
            "link": "/content/power/lessons/0003-pwm-sampling.html"
          },
          {
            "text": "教程 0004：离散比例积分控制器（discrete proportional-integral controller / discrete PI）最小闭环",
            "link": "/content/power/lessons/0004-discrete-pi-boost.html"
          },
          {
            "text": "教程 0005：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架",
            "link": "/content/power/lessons/0005-boost-firmware-skeleton.html"
          }
        ]
      },
      {
        "text": "电源控制入口",
        "link": "/content/power/getting-started.html"
      },
      {
        "text": "MATLAB/Simulink 电力电子仿真快速路线",
        "link": "/content/power/roadmap/matlab-simulink-power-electronics-fast-track.html"
      },
      {
        "text": "1 Introduction",
        "link": "/content/power/fundamentals-work/chunks/002-chapter-1.html"
      },
      {
        "text": "20 Power and Harmonics in Nonsinusoidal Systems",
        "link": "/content/power/fundamentals-work/chunks/053-chapter-20.html"
      },
      {
        "text": "第10章part 1 - 10 Basic Magnetics Theory",
        "link": "/content/power/fundamentals-work/chunks/027-chapter-10-part-1.html"
      },
      {
        "text": "第10章part 2 - 10 Basic Magnetics Theory",
        "link": "/content/power/fundamentals-work/chunks/028-chapter-10-part-2.html"
      },
      {
        "text": "第10章part 3 - 10 Basic Magnetics Theory",
        "link": "/content/power/fundamentals-work/chunks/029-chapter-10-part-3.html"
      },
      {
        "text": "第11章part 1 - 11 Inductor Design",
        "link": "/content/power/fundamentals-work/chunks/030-chapter-11-part-1.html"
      },
      {
        "text": "第11章part 2 - 11 Inductor Design",
        "link": "/content/power/fundamentals-work/chunks/031-chapter-11-part-2.html"
      },
      {
        "text": "第12章part 1 - 12 Transformer Design",
        "link": "/content/power/fundamentals-work/chunks/032-chapter-12-part-1.html"
      },
      {
        "text": "第12章part 2 - 12 Transformer Design",
        "link": "/content/power/fundamentals-work/chunks/033-chapter-12-part-2.html"
      },
      {
        "text": "第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem",
        "link": "/content/power/fundamentals-work/chunks/034-chapter-13-part-1.html"
      },
      {
        "text": "第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem",
        "link": "/content/power/fundamentals-work/chunks/035-chapter-13-part-2.html"
      },
      {
        "text": "第14章part 1 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation",
        "link": "/content/power/fundamentals-work/chunks/036-chapter-14-part-1.html"
      },
      {
        "text": "第14章part 2 - 14 Circuit Averaging, Averaged Switch Modeling, and Simulation",
        "link": "/content/power/fundamentals-work/chunks/037-chapter-14-part-2.html"
      },
      {
        "text": "第15章part 1 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode",
        "link": "/content/power/fundamentals-work/chunks/038-chapter-15-part-1.html"
      },
      {
        "text": "第15章part 2 - 15 Equivalent Circuit Modeling of the Discontinuous Conduction Mode",
        "link": "/content/power/fundamentals-work/chunks/039-chapter-15-part-2.html"
      },
      {
        "text": "第16章part 1 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems",
        "link": "/content/power/fundamentals-work/chunks/040-chapter-16-part-1.html"
      },
      {
        "text": "第16章part 2 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems",
        "link": "/content/power/fundamentals-work/chunks/041-chapter-16-part-2.html"
      },
      {
        "text": "第16章part 3 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems",
        "link": "/content/power/fundamentals-work/chunks/042-chapter-16-part-3.html"
      },
      {
        "text": "第17章part 1 - 17 Input Filter Design",
        "link": "/content/power/fundamentals-work/chunks/043-chapter-17-part-1.html"
      },
      {
        "text": "第17章part 2 - 17 Input Filter Design",
        "link": "/content/power/fundamentals-work/chunks/044-chapter-17-part-2.html"
      },
      {
        "text": "第17章part 3 - 17 Input Filter Design",
        "link": "/content/power/fundamentals-work/chunks/045-chapter-17-part-3.html"
      },
      {
        "text": "第18章part 1 - 18 Current-Programmed Control",
        "link": "/content/power/fundamentals-work/chunks/046-chapter-18-part-1.html"
      },
      {
        "text": "第18章part 2 - 18 Current-Programmed Control",
        "link": "/content/power/fundamentals-work/chunks/047-chapter-18-part-2.html"
      },
      {
        "text": "第18章part 3 - 18 Current-Programmed Control",
        "link": "/content/power/fundamentals-work/chunks/048-chapter-18-part-3.html"
      },
      {
        "text": "第18章part 4 - 18 Current-Programmed Control",
        "link": "/content/power/fundamentals-work/chunks/049-chapter-18-part-4.html"
      },
      {
        "text": "第19章part 1 - 19 Digital Control of Switched-Mode Power Converters",
        "link": "/content/power/fundamentals-work/chunks/050-chapter-19-part-1.html"
      },
      {
        "text": "第19章part 2 - 19 Digital Control of Switched-Mode Power Converters",
        "link": "/content/power/fundamentals-work/chunks/051-chapter-19-part-2.html"
      },
      {
        "text": "第19章part 3 - 19 Digital Control of Switched-Mode Power Converters",
        "link": "/content/power/fundamentals-work/chunks/052-chapter-19-part-3.html"
      },
      {
        "text": "第21章part 1 - 21 Pulse-Width Modulated Rectifiers",
        "link": "/content/power/fundamentals-work/chunks/054-chapter-21-part-1.html"
      },
      {
        "text": "第21章part 2 - 21 Pulse-Width Modulated Rectifiers",
        "link": "/content/power/fundamentals-work/chunks/055-chapter-21-part-2.html"
      },
      {
        "text": "第21章part 3 - 21 Pulse-Width Modulated Rectifiers",
        "link": "/content/power/fundamentals-work/chunks/056-chapter-21-part-3.html"
      },
      {
        "text": "第21章part 4 - 21 Pulse-Width Modulated Rectifiers",
        "link": "/content/power/fundamentals-work/chunks/057-chapter-21-part-4.html"
      },
      {
        "text": "第22章part 1 - 22 Resonant Conversion",
        "link": "/content/power/fundamentals-work/chunks/058-chapter-22-part-1.html"
      },
      {
        "text": "第22章part 2 - 22 Resonant Conversion",
        "link": "/content/power/fundamentals-work/chunks/059-chapter-22-part-2.html"
      },
      {
        "text": "第22章part 3 - 22 Resonant Conversion",
        "link": "/content/power/fundamentals-work/chunks/060-chapter-22-part-3.html"
      },
      {
        "text": "第22章part 4 - 22 Resonant Conversion",
        "link": "/content/power/fundamentals-work/chunks/061-chapter-22-part-4.html"
      },
      {
        "text": "第23章part 1 - 23 Soft Switching",
        "link": "/content/power/fundamentals-work/chunks/062-chapter-23-part-1.html"
      },
      {
        "text": "第23章part 2 - 23 Soft Switching",
        "link": "/content/power/fundamentals-work/chunks/063-chapter-23-part-2.html"
      },
      {
        "text": "第23章part 3 - 23 Soft Switching",
        "link": "/content/power/fundamentals-work/chunks/064-chapter-23-part-3.html"
      },
      {
        "text": "第2章part 1 - 2 Principles of Steady-State Converter Analysis",
        "link": "/content/power/fundamentals-work/chunks/003-chapter-2-part-1.html"
      },
      {
        "text": "第2章part 2 - 2 Principles of Steady-State Converter Analysis",
        "link": "/content/power/fundamentals-work/chunks/004-chapter-2-part-2.html"
      },
      {
        "text": "第3章part 1 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency",
        "link": "/content/power/fundamentals-work/chunks/005-chapter-3-part-1.html"
      },
      {
        "text": "第3章part 2 - 3 Steady-State Equivalent Circuit Modeling, Losses, and Efficiency",
        "link": "/content/power/fundamentals-work/chunks/006-chapter-3-part-2.html"
      },
      {
        "text": "第4章part 1 - 4 Switch Realization",
        "link": "/content/power/fundamentals-work/chunks/007-chapter-4-part-1.html"
      },
      {
        "text": "第4章part 2 - 4 Switch Realization",
        "link": "/content/power/fundamentals-work/chunks/008-chapter-4-part-2.html"
      },
      {
        "text": "第4章part 3 - 4 Switch Realization",
        "link": "/content/power/fundamentals-work/chunks/009-chapter-4-part-3.html"
      },
      {
        "text": "第4章part 4 - 4 Switch Realization",
        "link": "/content/power/fundamentals-work/chunks/010-chapter-4-part-4.html"
      },
      {
        "text": "第5章part 1 - 5 The Discontinuous Conduction Mode",
        "link": "/content/power/fundamentals-work/chunks/011-chapter-5-part-1.html"
      },
      {
        "text": "第5章part 2 - 5 The Discontinuous Conduction Mode",
        "link": "/content/power/fundamentals-work/chunks/012-chapter-5-part-2.html"
      },
      {
        "text": "第6章part 1 - 6 Converter Circuits",
        "link": "/content/power/fundamentals-work/chunks/013-chapter-6-part-1.html"
      },
      {
        "text": "第6章part 2 - 6 Converter Circuits",
        "link": "/content/power/fundamentals-work/chunks/014-chapter-6-part-2.html"
      },
      {
        "text": "第6章part 3 - 6 Converter Circuits",
        "link": "/content/power/fundamentals-work/chunks/015-chapter-6-part-3.html"
      },
      {
        "text": "第7章part 1 - 7 AC Equivalent Circuit Modeling",
        "link": "/content/power/fundamentals-work/chunks/016-chapter-7-part-1.html"
      },
      {
        "text": "第7章part 2 - 7 AC Equivalent Circuit Modeling",
        "link": "/content/power/fundamentals-work/chunks/017-chapter-7-part-2.html"
      },
      {
        "text": "第7章part 3 - 7 AC Equivalent Circuit Modeling",
        "link": "/content/power/fundamentals-work/chunks/018-chapter-7-part-3.html"
      },
      {
        "text": "第7章part 4 - 7 AC Equivalent Circuit Modeling",
        "link": "/content/power/fundamentals-work/chunks/019-chapter-7-part-4.html"
      },
      {
        "text": "第8章part 1 - 8 Converter Transfer Functions",
        "link": "/content/power/fundamentals-work/chunks/020-chapter-8-part-1.html"
      },
      {
        "text": "第8章part 2 - 8 Converter Transfer Functions",
        "link": "/content/power/fundamentals-work/chunks/021-chapter-8-part-2.html"
      },
      {
        "text": "第8章part 3 - 8 Converter Transfer Functions",
        "link": "/content/power/fundamentals-work/chunks/022-chapter-8-part-3.html"
      },
      {
        "text": "第8章part 4 - 8 Converter Transfer Functions",
        "link": "/content/power/fundamentals-work/chunks/023-chapter-8-part-4.html"
      },
      {
        "text": "第9章part 1 - 9 Controller Design",
        "link": "/content/power/fundamentals-work/chunks/024-chapter-9-part-1.html"
      },
      {
        "text": "第9章part 2 - 9 Controller Design",
        "link": "/content/power/fundamentals-work/chunks/025-chapter-9-part-2.html"
      },
      {
        "text": "第9章part 3 - 9 Controller Design",
        "link": "/content/power/fundamentals-work/chunks/026-chapter-9-part-3.html"
      },
      {
        "text": "全局术语表",
        "link": "/content/power/fundamentals-work/glossary-global.html"
      },
      {
        "text": "Appendices",
        "link": "/content/power/fundamentals-work/chunks/065-appendices.html"
      },
      {
        "text": "Index",
        "link": "/content/power/fundamentals-work/chunks/067-index.html"
      },
      {
        "text": "Preface",
        "link": "/content/power/fundamentals-work/chunks/001-preface.html"
      },
      {
        "text": "References",
        "link": "/content/power/fundamentals-work/chunks/066-references.html"
      },
      {
        "text": "Translation Manifest",
        "link": "/content/power/fundamentals-work/manifest.html"
      },
      {
        "text": "概念：两电平 SVPWM",
        "link": "/content/power/concepts/power-electronics/two-level-svpwm.html"
      },
      {
        "text": "概念：两电平 SVPWM",
        "link": "/content/power/concepts/two-level-svpwm.html"
      },
      {
        "text": "概念：三电平 NPC 逆变器",
        "link": "/content/power/concepts/power-electronics/three-level-npc-inverter.html"
      },
      {
        "text": "概念：三电平 NPC 逆变器",
        "link": "/content/power/concepts/three-level-npc-inverter.html"
      },
      {
        "text": "概念：三相 dq 电流环解耦",
        "link": "/content/power/concepts/control/three-phase-current-loop-decoupling.html"
      },
      {
        "text": "概念：三相 SRF-PLL 锁相",
        "link": "/content/power/concepts/control/three-phase-srf-pll.html"
      },
      {
        "text": "概念：三相功率与 dq 坐标变换",
        "link": "/content/power/concepts/power-electronics/three-phase-power-dq-transform.html"
      },
      {
        "text": "概念：三相功率与 dq 坐标变换",
        "link": "/content/power/concepts/three-phase-power-dq-transform.html"
      },
      {
        "text": "概念：F28075 外设从零配置",
        "link": "/content/power/concepts/embedded/tms320f28075-peripheral-bringup.html"
      },
      {
        "text": "概念：PCS 并网跟随型 P/Q 控制",
        "link": "/content/power/concepts/pcs/grid-following-pq-control.html"
      },
      {
        "text": "概念：PCS 储能 DC-DC 与模式状态机",
        "link": "/content/power/concepts/pcs/storage-dcdc-mode-state-machine.html"
      },
      {
        "text": "概念：PCS 构网型 V/f 与下垂控制",
        "link": "/content/power/concepts/pcs/grid-forming-vf-droop.html"
      },
      {
        "text": "概念：PCS LCL 滤波器与有源阻尼",
        "link": "/content/power/concepts/pcs/lcl-filter-active-damping.html"
      },
      {
        "text": "概念：Vienna PFC 与中点电压平衡",
        "link": "/content/power/concepts/power-electronics/vienna-pfc-neutral-point-balance.html"
      },
      {
        "text": "概念：Vienna PFC 与中点电压平衡",
        "link": "/content/power/concepts/vienna-pfc-neutral-point-balance.html"
      },
      {
        "text": "New Module Priority Map",
        "link": "/content/power/roadmap/lesson-priority-map.html"
      },
      {
        "text": "UPS电源软件开发 — 学习资源列表",
        "link": "/content/power/RESOURCES.html"
      },
      {
        "text": "概念：保护去抖与故障锁存（protection debounce and fault latch）",
        "link": "/content/power/concepts/embedded/ups-fault-latch-debounce.html"
      },
      {
        "text": "概念：单相 PFC 的 PWM/ADC 时序与控制延迟",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-pwm-delay.html"
      },
      {
        "text": "概念：单相 PFC 的 PWM/ADC 时序与控制延迟",
        "link": "/content/power/concepts/single-phase-pfc-pwm-delay.html"
      },
      {
        "text": "概念：单相 PFC 电流参考",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-current-reference.html"
      },
      {
        "text": "概念：单相 PFC 电流参考",
        "link": "/content/power/concepts/single-phase-pfc-current-reference.html"
      },
      {
        "text": "概念：单相 PFC 电压环如何生成电流幅值",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-voltage-loop.html"
      },
      {
        "text": "概念：单相 PFC 电压环如何生成电流幅值",
        "link": "/content/power/concepts/single-phase-pfc-voltage-loop.html"
      },
      {
        "text": "概念：单相 PFC 内层电流环",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-current-loop.html"
      },
      {
        "text": "概念：单相 PFC 内层电流环",
        "link": "/content/power/concepts/single-phase-pfc-current-loop.html"
      },
      {
        "text": "概念：单相 PFC 平均控制链",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-average-controller.html"
      },
      {
        "text": "概念：单相 PFC 平均控制链",
        "link": "/content/power/concepts/single-phase-pfc-average-controller.html"
      },
      {
        "text": "概念：单相 PFC 输入电压前馈",
        "link": "/content/power/concepts/power-electronics/single-phase-pfc-voltage-feedforward.html"
      },
      {
        "text": "概念：单相 PFC 输入电压前馈",
        "link": "/content/power/concepts/single-phase-pfc-voltage-feedforward.html"
      },
      {
        "text": "概念：单相 SRF-PLL 入门",
        "link": "/content/power/concepts/control/single-phase-srf-pll.html"
      },
      {
        "text": "概念：单相逆变器 RMS 估算与欠压保护",
        "link": "/content/power/concepts/embedded/single-phase-inverter-rms-protection.html"
      },
      {
        "text": "概念：单相逆变器比例谐振电压控制",
        "link": "/content/power/concepts/control/single-phase-inverter-pr-control.html"
      },
      {
        "text": "概念：单相逆变器故障状态机",
        "link": "/content/power/concepts/embedded/single-phase-inverter-fault-state-machine.html"
      },
      {
        "text": "概念：单相全桥逆变器 LC 输出滤波",
        "link": "/content/power/concepts/power-electronics/single-phase-inverter-lc-filter.html"
      },
      {
        "text": "概念：单相全桥逆变器 LC 输出滤波",
        "link": "/content/power/concepts/single-phase-inverter-lc-filter.html"
      },
      {
        "text": "概念：故障码与故障日志（fault code and fault log）",
        "link": "/content/power/concepts/embedded/ups-fault-code-logging.html"
      },
      {
        "text": "概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）",
        "link": "/content/power/concepts/discrete-pi-boost.html"
      },
      {
        "text": "概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）",
        "link": "/content/power/concepts/power-electronics/discrete-pi-boost.html"
      },
      {
        "text": "概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）",
        "link": "/content/power/concepts/ccm-dcm.html"
      },
      {
        "text": "概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）",
        "link": "/content/power/concepts/power-electronics/ccm-dcm.html"
      },
      {
        "text": "概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）",
        "link": "/content/power/concepts/power-electronics/pwm-sampling.html"
      },
      {
        "text": "概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）",
        "link": "/content/power/concepts/pwm-sampling.html"
      },
      {
        "text": "概念：旁路同步（bypass synchronization）与旁路切换（bypass transfer）",
        "link": "/content/power/concepts/control/single-phase-bypass-sync-transfer.html"
      },
      {
        "text": "概念：系统故障闭环（system fault closure）",
        "link": "/content/power/concepts/embedded/ups-system-fault-closure.html"
      },
      {
        "text": "概念：Boost 故障锁存与复位状态机（Fault Latch And Reset State Machine）",
        "link": "/content/power/concepts/embedded/boost-fault-state-machine.html"
      },
      {
        "text": "概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架",
        "link": "/content/power/concepts/boost-firmware-skeleton.html"
      },
      {
        "text": "概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架",
        "link": "/content/power/concepts/power-electronics/boost-firmware-skeleton.html"
      },
      {
        "text": "概念：Boost 慢速任务、遥测与故障日志",
        "link": "/content/power/concepts/embedded/boost-telemetry-fault-log.html"
      },
      {
        "text": "概念：Boost C 固件骨架（Boost C Firmware Skeleton）",
        "link": "/content/power/concepts/embedded/boost-c-firmware-skeleton.html"
      },
      {
        "text": "概念：PLL 带宽取舍",
        "link": "/content/power/concepts/control/single-phase-pll-bandwidth.html"
      },
      {
        "text": "概念：PLL 频率限幅与锁定检测",
        "link": "/content/power/concepts/control/single-phase-pll-lock-detector.html"
      },
      {
        "text": "概念：UPS 保护标志（UPS protection flags）",
        "link": "/content/power/concepts/embedded/ups-c-protection-flags.html"
      },
      {
        "text": "概念：UPS 参数保存触发策略（parameter save scheduler）",
        "link": "/content/power/concepts/embedded/ups-parameter-save-scheduler.html"
      },
      {
        "text": "概念：UPS 参数保存与默认值恢复（parameter storage and default restore）",
        "link": "/content/power/concepts/embedded/ups-parameter-storage.html"
      },
      {
        "text": "概念：UPS 参数访问边界（parameter access boundary）",
        "link": "/content/power/concepts/embedded/ups-parameter-access.html"
      },
      {
        "text": "概念：UPS 固件实时调度（real-time scheduling）",
        "link": "/content/power/concepts/embedded/ups-firmware-scheduler.html"
      },
      {
        "text": "概念：UPS 命令解析与安全门控（command parsing and safety gating）",
        "link": "/content/power/concepts/embedded/ups-command-parser.html"
      },
      {
        "text": "概念：UPS 命令响应与拒绝原因（command response and reject reason）",
        "link": "/content/power/concepts/embedded/ups-command-response.html"
      },
      {
        "text": "概念：UPS 模式状态机（UPS mode state machine）",
        "link": "/content/power/concepts/embedded/ups-mode-state-machine.html"
      },
      {
        "text": "概念：UPS 遥测通信帧（telemetry communication frame）",
        "link": "/content/power/concepts/embedded/ups-telemetry-frame.html"
      },
      {
        "text": "概念：UPS C 参数表（UPS C parameter table）",
        "link": "/content/power/concepts/embedded/ups-c-parameter-table.html"
      },
      {
        "text": "概念：UPS C 固件骨架（UPS C firmware skeleton）",
        "link": "/content/power/concepts/embedded/ups-c-firmware-skeleton.html"
      },
      {
        "text": "项目 03：UPS C 固件骨架（UPS C Firmware Skeleton）",
        "link": "/content/power/projects/03-ups-c-firmware-skeleton/README.html"
      },
      {
        "text": "UPS 持续提高路线（Continuous Learning Path）",
        "link": "/content/power/roadmap/continuous-learning-path.html"
      },
      {
        "text": "UPS 电源控制入职训练体系使用说明",
        "link": "/content/power/USAGE.html"
      },
      {
        "text": "概念：升压变换器（Boost Converter）",
        "link": "/content/power/concepts/boost-converter.html"
      },
      {
        "text": "概念：升压变换器（Boost Converter）",
        "link": "/content/power/concepts/power-electronics/boost-converter.html"
      },
      {
        "text": "项目 01：Boost 基础（Boost Basics）",
        "link": "/content/power/projects/01-boost-basics/README.html"
      },
      {
        "text": "项目 02：Boost C 固件骨架（Boost C Firmware Skeleton）",
        "link": "/content/power/projects/02-boost-c-firmware-skeleton/README.html"
      },
      {
        "text": "Archive",
        "link": "/content/power/archive/README.html"
      },
      {
        "text": "Mission: UPS 控制方向入职训练",
        "link": "/content/power/MISSION.html"
      },
      {
        "text": "Simulations",
        "link": "/content/power/simulations/README.html"
      },
      {
        "text": "UPS 30 天训练计划（30-Day Training Plan）",
        "link": "/content/power/roadmap/30-day-plan.html"
      },
      {
        "text": "Week 01 Day 01: Boost Converter First Pass",
        "link": "/content/power/weekly-reviews/week-01-day-01.html"
      },
      {
        "text": "学习记录 #0026：三电平P/O/N工作状态判别",
        "link": "/content/power/archive/old-learning-records/0026-three-level-pon-states.html"
      },
      {
        "text": "学习记录 #0001：UPS电源系统全景认知",
        "link": "/content/power/archive/old-learning-records/0001-ups-system-overview.html"
      },
      {
        "text": "学习记录 #0002：电力电子基础——开关器件与基本拓扑",
        "link": "/content/power/archive/old-learning-records/0002-switching-devices-and-basic-topologies.html"
      },
      {
        "text": "学习记录 #0003：PWM调制技术——从SPWM到SVPWM",
        "link": "/content/power/archive/old-learning-records/0003-pwm-techniques-spwm-svpwm.html"
      },
      {
        "text": "学习记录 #0004：数字控制基础——从连续到离散",
        "link": "/content/power/archive/old-learning-records/0004-digital-control-basics.html"
      },
      {
        "text": "学习记录 #0005：锁相环（PLL）技术——电网同步的核心",
        "link": "/content/power/archive/old-learning-records/0005-phase-locked-loop.html"
      },
      {
        "text": "学习记录 #0006：ADC采样技术——从传感器到数字量",
        "link": "/content/power/archive/old-learning-records/0006-adc-sampling-techniques.html"
      },
      {
        "text": "学习记录 #0007：单相PFC整流器——从整流到功率因数校正",
        "link": "/content/power/archive/old-learning-records/0007-single-phase-pfc.html"
      },
      {
        "text": "学习记录 #0008：维也纳整流器——三相三电平PFC之王",
        "link": "/content/power/archive/old-learning-records/0008-vienna-rectifier.html"
      },
      {
        "text": "学习记录 #0009：三电平SVPWM深入——从理论到代码实现",
        "link": "/content/power/archive/old-learning-records/0009-three-level-svpwm-deep.html"
      },
      {
        "text": "学习记录 #0010：单相逆变器控制——UPS的输出级",
        "link": "/content/power/archive/old-learning-records/0010-single-phase-inverter.html"
      },
      {
        "text": "学习记录 #0011：三相逆变器控制——UPS输出级的高性能方案",
        "link": "/content/power/archive/old-learning-records/0011-three-phase-inverter.html"
      },
      {
        "text": "学习记录 #0012：LLC谐振变换器原理与控制——UPS的DC-DC级",
        "link": "/content/power/archive/old-learning-records/0012-llc-resonant-converter.html"
      },
      {
        "text": "学习记录 #0013：双向DC-DC与电池管理——UPS的能量枢纽",
        "link": "/content/power/archive/old-learning-records/0013-bidirectional-dcdc-battery.html"
      },
      {
        "text": "学习记录 #0014：多级联调——PFC+DC-DC+逆变器协同",
        "link": "/content/power/archive/old-learning-records/0014-cascade-coordination.html"
      },
      {
        "text": "学习记录 #0015：后备式UPS完整软件设计——从零到一的固件实战",
        "link": "/content/power/archive/old-learning-records/0015-backup-ups-software.html"
      },
      {
        "text": "学习记录 #0016：在线式UPS完整软件设计——双变换架构的软件实现",
        "link": "/content/power/archive/old-learning-records/0016-online-ups-software.html"
      },
      {
        "text": "学习记录 #0017：并机与冗余设计——高可用UPS系统的基石",
        "link": "/content/power/archive/old-learning-records/0017-parallel-redundancy.html"
      },
      {
        "text": "学习记录 #0018：保护机制设计——UPS安全的最后防线",
        "link": "/content/power/archive/old-learning-records/0018-protection-mechanism.html"
      },
      {
        "text": "学习记录 #0019：通信协议与远程监控——UPS的\"神经系统\"",
        "link": "/content/power/archive/old-learning-records/0019-communication-protocol.html"
      },
      {
        "text": "学习记录 #0020：固件分层架构设计——从裸机到RTOS的工程实践",
        "link": "/content/power/archive/old-learning-records/0020-firmware-architecture.html"
      },
      {
        "text": "学习记录 #0021：RTOS任务设计与实时性保证——让每个任务准时执行",
        "link": "/content/power/archive/old-learning-records/0021-rtos-task-design.html"
      },
      {
        "text": "学习记录 #0022：OTA升级与安全启动——固件安全的全链路保障",
        "link": "/content/power/archive/old-learning-records/0022-ota-upgrade.html"
      },
      {
        "text": "学习记录 #0023：面试实战——UPS电源软件开发高频面试题精讲",
        "link": "/content/power/archive/old-learning-records/0023-interview-practice.html"
      },
      {
        "text": "学习记录 #0024：电源控制 vs 电机控制——跨界对比与知识迁移",
        "link": "/content/power/archive/old-learning-records/0024-power-vs-motor.html"
      },
      {
        "text": "学习记录 #0025：Buck/Boost工作模式深度分析——CCM/DCM/BCM的工程意义",
        "link": "/content/power/archive/old-learning-records/0025-buck-boost-ccm-dcm.html"
      },
      {
        "text": "UPS电源软件开发 — 课程体系大纲",
        "link": "/content/power/NOTES.html"
      }
    ]
  },
  {
    "text": "随笔",
    "collapsed": true,
    "items": [
      {
        "text": "第一篇记录",
        "link": "/content/blog/hello.html"
      },
      {
        "text": "个人知识库第一版上线记录",
        "link": "/content/blog/knowledge-base-first-pass.html"
      }
    ]
  },
  {
    "text": "Playground",
    "collapsed": true,
    "items": [
      {
        "text": "00-Fixtures",
        "collapsed": true,
        "items": [
          {
            "text": "Markdown 渲染验证",
            "link": "/content/playground/rendering-fixture.html"
          }
        ]
      }
    ]
  }
]
