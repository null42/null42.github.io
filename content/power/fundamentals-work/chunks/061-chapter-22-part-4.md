---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第22章part 4 - 22 Resonant Conversion
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 991-991 > Chunk ID: `chapter-22-part-4`"
---

# 第22章part 4 - 22 Resonant Conversion

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 991-991  
> Chunk ID: `chapter-22-part-4`

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
22.6 Summary of Key Points 993
frequency (consider only open-loop operation). The load R is a linear resistance which
can assume any positive value: 0≤R<∞.
(a) Plot the output characteristics ( M vs. J), for all values of R in the range 0 ≤R<
∞. Label mode boundaries, evaluate the short-circuit current, and give analytical
expressions for the output characteristics.
(b) Over what range of R (referred to the tank characteristic impedance R0) does the
converter operate as intended, in the k= 2 discontinuous conduction mode?
22.11 The parallel resonant converter as a single-phase high-quality rectiﬁer. It is desired to
utilize a transformer-isolated parallel resonant dc–dc converter in a single-phase low-
harmonic rectiﬁer system. By properly varying the converter switching frequency, a near-
ideal rectiﬁer system that can be modeled as in Fig. 21.16 is obtained. You may utilize
the results of Sect.22.5.2 to answer this problem. The parallel resonant tank network con-
tains an isolation transformer having a 1: n turns ratio. You may use either approximate
graphical analysis or computer iteration to answer parts (b) and (c).
(a) Plot the normalized input characteristics (normalized input voltage m
g = nvg/v vs.
normalized input current jg = ignR0/v) of the parallel resonant converter, operated
in the continuous conduction mode above resonance. Plot curves for F= fs/ f0 =
1.0, 1.1, 1.2, 1.3, 1.5, and 2.0. Compare these characteristics with the desired linear
resistive input characteristic vg/ig= Remulated.
(b) The converter is operated open-loop, with F= 1.1. The applied normalized input
voltage is a rectiﬁed sinusoid of unity magnitude: mg(t)=| sin(ωt)|.S k e t c ht h er e -
sulting normalized input current waveform jg(t). Approximately how large is the
peak current? The crossover dead time?
(c) A feedback loop is now added, which regulates the input current to follow the input
voltage such that ig(t)= vg(t)/Remulated. You may assume that the feedback loop oper-
ates perfectly. For the caseRemulated = R0, and with the same appliedmg(t) waveform
as in part (b), sketch the switching-frequency waveform for one ac line period [i.e.,
show how the controller must vary F to regulate ig(t)]. What is the maximum value
of F? Note: In practice, the converter would be designed to operate with a smaller
peak value of jg, so that the switching-frequency variations would be better behaved.
(d) Choose element values (tank inductance, tank capacitance, and transformer turns
ratio) such that the converter of part (c) meets the following speciﬁcations:
Ac input voltage 120 Vrms, 60 Hz
Dc output voltage 42 V
Average power 800 W
Maximum switching frequency 200 kHz
Refer the element values to the primary side of the transformer.
```
