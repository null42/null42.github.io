---
date: 2026-08-01
section: 电源控制
chapter: courses
chapterTitle: 课程项目
chapterOrder: 30
category: 课程项目
source: power
visibility: public
title: "课程图源清单"
tags:
  - power-electronics
  - UPS
  - 125kVA
  - 课程
status: learning
summary: "本清单区分产品确认图、原始论文图、芯片官方文档图和课程脚本生成图。复杂拓扑、器件方向、换流路径及芯片时序优先采用前三类；课程脚本图只用于可复算的基础数学关系。"
navGroup: 项目实践
navGroupOrder: 20
---

# 课程图源清单

本清单区分产品确认图、原始论文图、芯片官方文档图和课程脚本生成图。复杂拓扑、器件方向、换流路径及芯片时序优先采用前三类；课程脚本图只用于可复算的基础数学关系。

| Figure ID | 证据等级 | 标题 | 原始页码/图号 | 使用课程 | 禁止误用 |
|---|---|---|---|---|---|
| `ups-target-confirmed` | `confirmed-product` | 125 kVA UPS目标拓扑标号图 | - | 0001, 0056 | 只证明已确认的节点和器件方向；不得从模糊像素推导载波关系、控制策略或直流支路工作模式。 |
| `ups-product-rectifier-bus` | `confirmed-product` | 目标UPS两套Vienna整流器与公共分裂母线区域 | - | 0033, 0035 | 只确认两套整流器接入BAT+、O、BAT-；产品交错方式未确认，图中不得解读出180°相移。 |
| `ups-product-balancer` | `confirmed-product` | 目标UPS有源中点平衡支路区域 | - | 0041 | 只确认P-Xb-M开关支路及Xb-Lb-O连接；器件状态仍须按电流方向逐项推导。 |
| `ups-product-dc-branch` | `confirmed-product` | 目标UPS三开关双电感直流支路区域 | - | 0044 | 直流支路功能尚未确认；不得把本图命名为确定的充电器、Boost或Buck拓扑。 |
| `ups-product-parallel-ttype` | `confirmed-product` | 目标UPS两套并联T型三电平逆变器区域 | - | 0046, 0050 | 辅管按背向体二极管、共发射极理解；原图上半部分错误方向已确认是绘图错误。产品交错方式未确认。 |
| `ups-product-four-wire-output` | `confirmed-product` | 目标UPS三相四线制输出及OutN区域 | - | 0055 | 用于确认OutN与O、mN同节点及输出支路结构，不用于证明控制器采样时序。 |
| `vienna-fig1-basic-circuit` | `source-paper` | 标准三相Vienna整流器基本功率电路 | PDF 3, Fig. 1 | 0011, 0015, 0035 | 这是论文中的标准Vienna拓扑，不是目标125 kVA产品原理图；节点编号必须重新映射。 |
| `vienna-fig2-bcm-waveforms` | `source-paper` | Vienna整流器BCM电感电流、门极状态与空间矢量轨迹 | PDF 3, Fig. 2 | 0013, 0015, 0016, 0033 | 该图描述论文的BCM控制实例，不是本项目产品波形；产品交错方式未确认，本图不能用于证明并联模块的载波关系。 |
| `ttype-fig1-topology` | `source-paper` | 三相三电平T型变换器基本拓扑 | PDF 3, Fig. 1 | 0021, 0022, 0046 | 这是通用T型论文拓扑，不是目标产品图；只能用于核对桥臂结构和节点关系。 |
| `ttype-fig2-bidirectional-config` | `source-paper` | T型中点双向开关的共发射极与共集电极实现 | PDF 3, Fig. 2 | 0006, 0021, 0022 | 用于辨认辅管体二极管方向和共发射极/共集电极差异，不替代目标产品方向确认。 |
| `ttype-table1-switching-states` | `source-paper` | T型桥臂P、0、N三种开关状态 | PDF 4, Table I | 0023 | 表中T1至T4编号属于论文，应用到本课程前必须先完成器件编号映射。 |
| `ttype-fig3-p-to-zero` | `source-paper` | T型桥臂P到0的正负电流换流序列 | PDF 4, Fig. 3(a)-(b) | 0024, 0050 | 该图只覆盖P到0的换流和论文编号；0到N等其他转换必须按同样方法重新推导。 |
| `ttype-fig3-zero-to-p` | `source-paper` | T型桥臂0到P的正负电流换流序列 | PDF 4, Fig. 3(c)-(d) | 0024, 0050 | 该图只覆盖0到P的换流和论文编号；N到0等其他转换必须按同样方法重新推导。 |
| `ttype-ups-fig1-architecture` | `source-paper` | 论文中的三相三电平双变换UPS结构 | PDF 2, Fig. 1 | 0056 | 这是20 kVA论文样机的通用UPS结构，不是目标125 kVA模块机，不得把器件数量和电池接口照搬为产品事实。 |
| `ti-f28075-fig6-36-adc` | `official-document` | F28075 12位ADC采样、转换、结果与中断时序 | PDF 101, Figure 6-36 | 0039, 0055, 0065 | 这是芯片官方通用时序；实际ACQPS、ADC时钟、SOC触发源和ISR安排必须按项目参数配置。 |
| `ti-f28075-fig6-50-epwm` | `official-document` | F28075 ePWM子模块与关键内部信号连接 | PDF 118, Figure 6-50 | 0007, 0039, 0065 | 框图说明硬件能力，不代表本项目已经确定TBPRD、CMPA、SOCA、死区或同步链配置。 |
| `ti-f28075-fig6-51-trip` | `official-document` | F28075 ePWM Trip输入连接 | PDF 119, Figure 6-51 | 0030, 0065 | 用于建立硬件关断链路，不证明项目板卡已采用图中任一具体输入映射。 |
| `ti-f28075-fig6-53-trip-timing` | `official-document` | F28075 Trip-Zone输入与PWM高阻时序 | PDF 121, Figure 6-53 and timing tables | 0030, 0065 | 数据手册给出芯片条件下的时序边界；整机保护时间还需加入比较器、隔离、驱动和功率器件关断延迟。 |
| `generated-discrete-delay` | `course-generated` | 连续一阶对象、离散对象与一拍延迟示意 | - | 0004 | 只表示脚本内一阶数学模型，不是UPS动态响应或实测波形。 |
| `generated-pwm-sampling` | `course-generated` | 中心对齐载波、比较阈值和采样位置数学示意 | - | 0007 | 不是F28075寄存器实测波形，不表示项目实际死区、采样点或PWM频率。 |
| `generated-pi-discretization` | `course-generated` | PI离散化方法频率响应对比 | - | 0009 | 只比较脚本给定PI参数与离散化公式，不是实机闭环频响。 |
