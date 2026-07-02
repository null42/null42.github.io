---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第12章part 2 - 12 Transformer Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 513-514 > Chunk ID: `chapter-12-part-2`"
---

# 第12章part 2 - 12 Transformer Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 513-514  
> Chunk ID: `chapter-12-part-2`

## 主干提取

- TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。

## 术语表

| English term | 中文译名 | Notes |
|---|---|---|
| TODO | TODO | TODO |

## 中文翻译

TODO: 在这里写专业、通顺、前后一致的中文译文。

## 英文原文

```text
12.5 Summary 505
Kfe ( f )= Kfe 0
⎛⎜⎜⎜⎜⎜⎝1+ a1
⎦f
f0
)
+ a2
⎦f
f0
)2
+ a3
⎦f
f0
)3
+ a4
⎦f
f0
)4⎞⎟⎟⎟⎟⎟⎠
where Kfe 0, a1, a2, a3, a4, and f0 are constants. In a typical converter transformer ap-
plication, the applied primary volt-seconds λ1 varies directly with the switching period
Ts = 1/ f . It is desired to choose the optimum switching frequency such that Kgfe , and
therefore the transformer size, are minimized.
(a) Show that the optimum switching frequency is a root of the polynomial
1+ a1
⎦β−1
β
)⎦f
f0
)
+ a2
⎦β−2
β
)⎦f
f0
)2
+ a3
⎦β−3
β
)⎦f
f0
)3
+ a4
⎦β−4
β
)⎦f
f0
)4
Next, a core material is chosen whose core loss parameters are
β= 2.7 Kfe 0= 7.6
f0 = 100 kHz
a1 =−1.3 a2= 5.3
a3 =−0.5 a4= 0.075
The polynomial ﬁts the manufacturer’s published data over the range 10 kHz<f<1M H z .
(b)S k e t c hKfe vs. f
(c) Determine the value of f that minimizes Kgfe .
(d)S k e t c hKgfe ( f )/Kgfe (100 kHz), over the range 100 kHz≤f≤1 MHz. How sensitive
is the transformer size to the choice of switching frequency?
12.5 Transformer design to attain a given temperature rise. The temperature riseΔT of the cen-
ter leg of a ferrite core is directly proportional to the total power lossPtot of a transformer:
ΔT= Rth Ptot, where Rth is the thermal resistance of the transformer under given environ-
mental conditions. You may assume that this temperature rise has minimal dependence
on the distribution of losses within the transformer. It is desired to modify the Kgfe trans-
former design method, such that temperature rise ΔT replaces total power loss Ptot as a
speciﬁcation. You may neglect the dependence of the wire resistivityρon temperature.
(a) Modify the n-winding transformer Kgfe design method, as necessary. Deﬁne a new
core geometrical constant Kth that includes Rth.
(b) Thermal resistances of ferrite EC cores are listed in Sect. B.3 of Appendix B. Tabulate
Kth for these cores, using β= 2.7.
(c) A 750 W single-output full-bridge isolated buck dc–dc converter operates with con-
verter switching frequency fs= 200 kHz, dc input voltage Vg= 400 V, and dc output
voltage V = 48 V . The turns ratio is 6:1. The core loss equation parameters at 100
kHz are Kfe = 10 W/Tβcm3 and β= 2.7. Assume a ﬁll factor of Ku = 0.3. You may
neglect proximity losses. Use your design procedure of parts (a) and (b) to design a
transformer for this application, in which the temperature rise is limited to 20
◦C. Spec-
ify: EC core size, primary and secondary turns, wire sizes, and peak ac ﬂux density.

Part IV
Advanced Modeling, Analysis, and Control Techniques
```
