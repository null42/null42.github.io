---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第11章part 2 - 11 Inductor Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 488-492 > Chunk ID: `chapter-11-part-2`"
---

# 第11章part 2 - 11 Inductor Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 488-492  
> Chunk ID: `chapter-11-part-2`

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
11.4 Examples 479
The number of winding 1 turns is chosen according to Eq. (11.54), as follows:
n1 = LM IM,max
BmaxAc
104
= (1.07· 10−3 H)(1.5A )
(0.25 T)(1.09 cm2) 104 (11.79)
= 58.7 turns
Since an integral number of turns is required, we roundoﬀthis value to
n1= 59 (11.80)
To obtain the desired turns ratio, n2 should be chosen as follows:
n2 =
⎦n2
n1
)
n1
= (0.15)59 (11.81)
= 8.81
We again round this value oﬀ,t o
n2= 9 (11.82)
The fractions of the window area allocated to windings 1 and 2 are selected in accordance with
Eq. (11.56):
α 1 = I1
Itot
= (0.796 A)
(1.77 A) = 0.45
α 2 = n2I2
n1Itot
= (9)(6.5A )
(59)(1.77 A)= 0.55 (11.83)
The wire gauges should therefore be
AW1 ≤α 1KuWA
n1
= 1.09· 10−3 cm2 —use #28 AWG
AW2 ≤α 2KuWA
n2
= 8.88· 10−3 cm2 —use #19 AWG (11.84)
The above American Wire Gauges are selected using the wire gauge table given at the end of
Appendix B.
The above design does not account for core loss or copper loss caused by the proximity
eﬀect. Let us compute the core loss for this design. Figure Fig. 11.14 contains a sketch of the
B–H loop for this design. The ﬂux densityB(t) can be expressed as a dc component (determined
by the dc value of the magnetizing current IM), plus an ac variation of peak amplitudeΔB that
is determined by the current rippleΔiM. The maximum value of B(t) is labeled Bmax; this value
is determined by the sum of the dc component and the ac ripple component. The core material
saturates when the applied B(t) exceeds B
sat; hence, to avoid saturation, Bmax should be less
than Bsat. The core loss is determined by the amplitude of the ac variations in B(t), i.e., byΔB.

480 11 Inductor Design
Fig. 11.14 B–H loop for the ﬂyback transformer
design example
B(t)
Hc(t)
CCM flyback
example
large excitation
Bsat
BBmax
Fig. 11.15 Variation of ﬂux density B(t), ﬂy-
back transformer example
vM(t)
0
Vg
DTs
B(t)
Bmax
0
B
Vg
n1 Ac
The ac componentΔB is determined using Faraday’s law, as follows. Solution of Faraday’s
law for the derivative of B(t) leads to
dB(t)
dt = vM(t)
n1Ac
(11.85)
As illustrated in Fig. 11.15, the voltage applied during the ﬁrst subinterval is vM(t)= Vg.T h i s
causes the ﬂux density to increase with slope
dB(t)
dt = Vg
n1Ac
(11.86)
Over the ﬁrst subinterval 0 < t< DTs, the ﬂux density B(t) changes by the net amount 2ΔB.
This net change is equal to the slope given by Eq. (11.86), multiplied by the interval lengthDTs:
ΔB=
⎦ Vg
2n1Ac
)
(DTs) (11.87)
Upon solving forΔB and expressing Ac in cm2, we obtain
ΔB= VgDTs
2n1Ac
104 (11.88)

11.5 Summary of Key Points 481
B, Tesla
0.01 0.1 0.3
Power loss density,
Watts/cm3
0.01
0.1
1
20kHz
50kHz
100kHz
200kHz400kHz
150kHz
0.04
W/cm3
0.041
Fig. 11.16 Determination of core loss density for the ﬂyback transformer design example
For the ﬂyback transformer example, the peak ac ﬂux density is found to be
ΔB= (200 V)(0.4)(6.67 μs)
2(59)(1.09 cm2) 104 (11.89)
= 0.041 T
To determine the core loss, we next examine the data provided by the manufacturer for the
given core material. A typical plot of core loss is illustrated in Fig. 11.16. For the values ofΔB
and switching frequency of the ﬂyback transformer design, this plot indicates that 0.04 W will
be lost in every cm3 of the core material. Of course, this value neglects the eﬀects of harmonics
on core loss. The total core loss Pfe will therefore be equal to this loss density, multiplied by the
volume of the core:
Pfe = (0.04 W/cm3)(Acℓm)
= (0.04 W/cm3)(1.09 cm2)(5.77 cm) (11.90)
= 0.25 W
This core loss is less than the copper loss of 1.5 W, and neglecting the core loss is often war-
ranted in designs that operate in the continuous conduction mode and that employ ferrite core
materials.
11.5 Summary of Key Points
1. A variety of magnetic devices are commonly used in switching converters. These devices
diﬀer in their core ﬂux density variations, as well as in the magnitudes of the ac winding cur-
rents. When the ﬂux density variations are small, core loss can be neglected. Alternatively,
a low-frequency material can be used, having higher saturation ﬂux density.

482 11 Inductor Design
2. The core geometrical constant Kg is a measure of the magnetic size of a core, for appli-
cations in which copper loss is dominant. In the Kg design method, ﬂux density and total
copper loss are speciﬁed. Design procedures for single-winding ﬁlter inductors and for con-
ventional multiple-winding transformers are derived.
Problems
11.1 A simple buck converter operates with a 50 kHz switching frequency and a dc input volt-
age of Vg= 40 V. The output voltage is V= 20 V. The load resistance is R≥4Ω.
(a) Determine the value of the output ﬁlter inductance L such that the peak-to-average
inductor current rippleΔi is 10% of the dc component I.
(b) Determine the peak steady-state inductor current Imax.
(c) Design an inductor which has the values of L and Imax from parts (a) and (b). Use a
ferrite EE core, with Bmax = 0.25 T. Choose a value of winding resistance such that
the inductor copper loss is less than or equal to 1 W at room temperature. Assume
Ku= 0.5. Specify: core size, gap length, wire size (AWG), and number of turns.
11.2 A boost converter operates at the following quiescent point:Vg= 28 V, V= 48 V, Pload=
150 W, fs= 100 kHz. Design the inductor for this converter. Choose the inductance value
such that the peak current ripple is 10% of the dc inductor current. Use a peak ﬂux density
of 0.225 T, and assume a ﬁll factor of 0.5. Allow copper loss equal to 0.5% of the load
power, at room temperature. Use a ferrite PQ core. Specify: core size, air gap length, wire
gauge, and number of turns.
11.3 Extension of the K
g approach to design of two-winding transformers. It is desired to de-
sign a transformer having a turns ratio of 1 : n. The transformer stores negligible energy,
no air gap is required, and the ratio of the winding currents i2(t)/i1(t) is essentially equal
to the turns ratio n. The applied primary volt-secondsλ1 are deﬁned for a typical PWM
voltage waveform v1(t)i nF i g .10.45b; these volt-seconds should cause the maximum ﬂux
density to be equal to a speciﬁed value Bmax =ΔB. You may assume that the ﬂux density
B(t) contains no dc bias, as in Fig.10.46. You should allocate half of the core window area
to each winding. The total copper loss Pcu is also speciﬁed. You may neglect proximity
losses.
(a) Derive a transformer design procedure, in which the following quantities are speciﬁed:
total copper loss Pcu, maximum ﬂux density Bmax, ﬁll factor Ku, wire resistivityρ,r m s
primary current I1, applied primary volt-secondsλ1, and turns ratio 1:n. Your procedure
should yield the following data: required core geometrical constant Kg, primary and
secondary turns n1 and n2, and primary and secondary wire areas Aw1 and Aw2.
(b) The voltage waveform applied to the transformer primary winding of the ´Cuk converter
(Fig. 6.42c) is equal to the converter input voltageVg while the transistor conducts, and
is equal to −VgD/(1−D) while the diode conducts. This converter operates with a
switching frequency of 100 kHz, and a transistor duty cycle D equal to 0.4. The dc
input voltage is Vg = 120 V, the dc output voltage is V = 24 V, and the load power
is 200 W. You may assume a ﬁll factor of Ku = 0.3. Use your procedure of part (a) to
design a transformer for this application, in which Bmax= 0.15 T, and Pcu= 0.25 W at
100◦C. Use a ferrite PQ core. Specify: core size, primary and secondary turns, and wire
gauges.

11.5 Summary of Key Points 483
11.4 Coupled inductor design. The two-output forward converter of Fig. 10.47ae m p l o y s
secondary-side coupled inductors. An air gap is employed.
Design a coupled inductor for the following application: V1 = 5V, V2 = 15 V, I1 =
20 A, I2= 4A, D= 0.4. The magnetizing inductance should be equal to 8μH, referred to
the 5 V winding. You may assume a ﬁll factor Ku of 0.5. Allow a total of 1 W of copper
loss at 100◦C, and use a peak ﬂux density of Bmax= 0.2 T. Use a ferrite EE core. Specify:
core size, air gap length, number of turns, and wire gauge for each winding.
11.5 Flyback transformer design. A ﬂyback converter operates with a 160 Vdc input, and pro-
duces a 28 Vdc output. The maximum load current is 2 A. The transformer turns ratio is
8:1. The switching frequency is 100 kHz. The converter should be designed to operate in
the discontinuous conduction mode at all load currents. The total copper loss should be
less than 0.75 W.
(a) Choose the value of transformer magnetizing inductance L
M such that, at maximum
load current, D3= 0.1 (the duty cycle of subinterval 3, in which all semiconductors are
oﬀ). Please indicate whether your value of LM is referred to the primary or secondary
winding. What is the peak transistor current? The peak diode current?
(b) Design a ﬂyback transformer for this application. Use a ferrite pot core with Bmax =
0.25 Tesla, and with ﬁll factor Ku = 0.4. Specify: core size, primary and secondary
turns and wire sizes, and air gap length.
(c) For your design of part (b), compute the copper losses in the primary and secondary
windings. You may neglect proximity loss.
(d) For your design of part (b), compute the core loss. Loss data for the core material is
given by Fig. 10.20. Is the core loss less than the copper loss computed in Part (c)?
```
