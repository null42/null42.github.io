---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: Appendices
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 1034-1047 > Chunk ID: `appendices`"
---

# Appendices

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 1034-1047  
> Chunk ID: `appendices`

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
A
RMS Values of Commonly Observed Converter
Waveforms
The waveforms encountered in power electronics converters can be quite complex, containing
modulation at the switching frequency and often also at the ac line frequency. During converter
design, it is often necessary to compute the rms values of such waveforms. In this appendix,
several useful formulas and tables are developed which allow these rms values to be quickly
determined.
RMS values of the doubly modulated waveforms encountered in PWM rectiﬁer circuits are
discussed in Sect. 21.5.
A.1 Some Common Waveforms
DC:
rms= I (A.1)
i(t)
t
I
DC plus linear ripple:
rms= I
√
1+ 1
3
⎦Δi
I
)2
(A.2)
i(t)
t
I
Ts0
i
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4
1037

1038 A RMS Values of Commonly Observed Converter Waveforms
Square wave:
rms= Ipk (A.3)
i(t)
t
Ipk
pk
Sine wave:
rms= Ipk
√
2
(A.4)
i(t)
t
0
Ipk
Pulsating waveform:
rms= Ipk
√
D (A.5)
i(t)
t
Ipk
TsDTs0
0
Pulsating waveform with linear ripple:
rms= I
√
D
√
1+ 1
3
⎦Δi
I
)2
(A.6)
i(t)
t
I
TsDTs0
0
i
i

A.1 Some Common Waveforms 1039
Triangular waveform:
rms= Ipk
√
D1+ D2
3 (A.7)
i(t)
t
Ipk
TsD1Ts0
0
D2Ts
Triangular waveform:
rms= Ipk
√
D1
3 (A.8)
i(t)
t
Ipk
TsD1Ts0
0
Triangular waveform, no dc component:
rms= Δi√
3
(A.9)
i(t)
t0
i
Center-tapped bridge winding waveform:
rms= 1
2 Ipk
√
1+ D (A.10)
i(t)
t
Ipk
TsDTs0
0
(1+D)Ts 2Ts
1
2 Ipk
1
2
Ipk

1040 A RMS Values of Commonly Observed Converter Waveforms
General stepped waveform:
rms=
√
D1I2
1+ D2I2
2+··· (A.11)
i(t)
t
I2
Ts
D1Ts
0
I1
D2Ts
A.2 General Piecewise Waveform
i(t)
tTsD1Ts D2Ts D3Ts
Triangular
segment
Constant
segment
Trapezoidal
segment
etc.
For a periodic waveform composed of n piecewise segments as shown above, the rms value is
rms=
√ n∑
k=1
Dkuk (A.12)
where Dk is the duty cycle of segmentk, and uk is the contribution of segmentk.T h euk s depend
on the shape of the segments—several common segment shapes are listed below.
Constant segment:
uk= I2
1 (A.13)
i(t)
t
I1

A.2 General Piecewise Waveform 1041
Triangular segment:
uk= 1
3 I2
1 (A.14)
i(t)
t
I1
0
Trapezoidal segment:
uk= 1
3
⎦
I2
1+ I1I2+ I2
2
)
(A.15)
i(t)
t
I1 I2
Sinusoidal segment, half or full period:
uk= 1
2 I2
pk (A.16)
i(t)
t
Ipk
Sinusoidal segment, partial period: a sinusoidal segment of less than one half-period, which
begins at angleθ1 and ends at angleθ2. The anglesθ1 andθ2 are expressed in radians:
uk= 1
2 I2
pk
⎦
1−sin(θ2−θ1) cos(θ2+θ1)
(θ2−θ1)
)
(A.17)
i(t)
t
Ipk
1
2

1042 A RMS Values of Commonly Observed Converter Waveforms
Example
i(t)
tTs0.2 μs
I1 = 20 A
0.2 μs
I2 = 2 A
0.1 μs
10 μs
0.2 μs5 μs
0 A
1 2 3 4 5 6
A transistor current waveform contains a current spike due to the stored charge of a free-
wheeling diode. The observed waveform can be approximated as shown above. Estimate the
rms current.
The waveform can be divided into six approximately linear segments, as shown. TheDk and
uk for each segment are
1. Triangular segment:
D1= (0.2μs)/(10μs)= 0.02
u1= I2
1/3= (20A)2/3= 133A2
2. Constant segment:
D2= (0.2μs)/(10μs)= 0.02
u2= I2
1 = (20A)2= 400A2
3. Trapezoidal segment:
D3= (0.1μs)/(10μs)= 0.01
u3= (I2
1+ I2
2+ I2
3 )/3= 148A2
4. Constant segment:
D4= (5μs)/(10μs)= 0.5
u4= I2
2 = (2A)2= 4A2
5. Triangular segment:
D5= (0.2μs)/(10μs)= 0.02
u5= I2
2/3= (2A)2/3= 1.3A2
6. Zero segment:
u6= 0
The rms value is
rms=
√ 6∑
k=1
Dkuk= 3.76A (A.18)
Even though its duration is very short, the current spike has a signiﬁcant impact on the rms
value of the current—without the current spike, the rms current is approximately 2.0 A.

B
Magnetics Design Tables
Geometrical data for several standard ferrite core shapes are listed here. The geometrical con-
stant Kg is a measure of core size, useful for designing inductors and transformers that attain
a given copper loss [ 99]. The Kg method for inductor design is described in Chap. 11. Kg is
deﬁned as
Kg= A2
c WA
MLT (B.1)
where Ac is the core cross-sectional area,WA is the window area, andMLT is the winding mean-
length-per-turn. The geometrical constant Kgfe is a similar measure of core size, which is useful
for designing ac inductors and transformers when the total copper plus core loss is constrained.
The Kgfe method for magnetics design is described in Chap. 12. Kgfe is deﬁned as
Kgfe = WAA2(1−1/β)
c
MLTℓ2/β
m
u(β)( B . 2 )
whereℓm is the core mean magnetic path length, and β is the core loss exponent:
Pfe = Kfe Bβ
max (B.3)
For modern ferrite materials, β typically lies in the range 2.6 to 2.8. The quantityu(β) is deﬁned
as
u(β)=
⎡⎢⎢⎢⎢⎢⎢⎣
⎦β
2
)−
⎦β
β+2
)
+
⎦β
2
)⎦2
β+2
)⎤⎥⎥⎥⎥⎥⎥⎦
−
⎦β+2
β
)
(B.4)
u(β) is equal to 0.305 for β= 2.7. This quantity varies by roughly 5% over the range 2.6≤β≤
2.8. Values of Kgfe are tabulated for β= 2.7; variation of Kgfe over the range 2.6≤β≤2.8i s
typically quite small.
Thermal resistances are listed in those cases where published manufacturer’s data are avail-
able. The thermal resistances listed are the approximate temperature rise from the center leg of
the core to ambient, per watt of total power loss. Diﬀerent temperature rises may be observed
under conditions of forced air cooling, unusual power loss distributions, etc. Listed window
areas are the winding areas for conventional single-section bobbins.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4
1043

1044 B Magnetics Design Tables
An American Wire Gauge table is included at the end of this appendix.
B.1 Pot Core Data
A H
Fig. B.1 Pot core
Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core
type constant constant sectional winding length path resistance weight
area area per turn length
(AH) Kg Kgfe Ac WA MLT ℓm Rth
(mm) cm 5 cmx (cm2)( c m 2) (cm) (cm) ( ◦C/W) (g)
704 0.738· 10−6 1.61· 10−6 0.070 0 .22· 10−3 1.46 1.0 0.5
905 0.183· 10−3 256· 10−6 0.101 0.034 1.90 1.26 1.0
1107 0.667· 10−3 554· 10−6 0.167 0.055 2.30 1.55 1.8
1408 2.107· 10−3 1.1· 10−3 0.251 0.097 2.90 2.00 100 3.2
1811 9.45· 10−3 2.6· 10−3 0.433 0.187 3.71 2.60 60 7.3
2213 27.1· 10−3 4.9· 10−3 0.635 0.297 4.42 3.15 38 13
2616 69.1· 10−3 8.2· 10−3 0.948 0.406 5.28 3.75 30 20
3019 0.180 14 .2· 10−3 1.38 0.587 6.20 4.50 23 34
3622 0.411 21 .7· 10−3 2.02 0.748 7.42 5.30 19 57
4229 1.15 41 .1· 10−3 2.66 1.40 8.60 6.81 13.5 104

B.2 EE Core Data 1045
B.2 EE Core Data
A
Fig. B.2 EE core
Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Core
type constant constant sectional winding length path weight
area area per turn length
(A) Kg Kgfe Ac WA MLT ℓm
(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) (g)
EE12 0 .731· 10−3 0.458· 10−3 0.14 0.085 2.28 2.7 2.34
EE16 2 .02· 10−3 0.842· 10−3 0.19 0.190 3.40 3.45 3.29
EE19 4 .07· 10−3 1.3· 10−3 0.23 0.284 3.69 3.94 4.83
EE22 8 .26· 10−3 1.8· 10−3 0.41 0.196 3.99 3.96 8.81
EE30 85 .7· 10−3 6.7· 10−3 1.09 0.476 6.60 5.77 32.4
EE40 0.209 11 .8· 10−3 1.27 1.10 8.50 7.70 50.3
EE50 0.909 28 .4· 10−3 2.26 1.78 10.0 9.58 116
EE60 1.38 36 .4· 10−3 2.47 2.89 12.8 11.0 135
EE70/68/19 5.06 75 .9· 10−3 3.24 6.75 14.0 18.0 280

1046 B Magnetics Design Tables
B.3 EC Core Data
A
Fig. B.3 EC core
Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core
type constant constant sectional winding length path resistance weight
area area per turn length
(A) Kg Kgfe Ac WA MLT ℓm Rth
(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) ( ◦C/W) (g)
EC35 0.131 9 .9· 10−3 0.843 0.975 5.30 7.74 18.5 35.5
EC41 0.374 19 .5· 10−3 1.21 1.35 5.30 8.93 16.5 57.0
EC52 0.914 31 .7· 10−3 1.80 2.12 7.50 10.5 11.0 111
EC70 2.84 56 .2· 10−3 2.79 4.71 12.9 14.4 7.5 256

B.4 ETD Core Data 1047
B.4 ETD Core Data
A
Fig. B.4 ETD core
Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Thermal Core
type constant constant sectional winding length path resistance weight
area area per turn length
(A) Kg Kgfe Ac WA MLT ℓm Rth
(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) ( ◦C/W) (g)
ETD29 0.0978 8 .5· 10−3 0.76 0.903 5.33 7.20 30
ETD34 0.193 13 .1· 10−3 0.97 1.23 6.00 7.86 19 40
ETD39 0.397 19 .8· 10−3 1.25 1.74 6.86 9.21 15 60
ETD44 0.846 30 .4· 10−3 1.74 2.13 7.62 10.3 12 94
ETD49 1.42 41 .0· 10−3 2.11 2.71 8.51 11.4 11 124

1048 B Magnetics Design Tables
B.5 PQ Core Data
A1
2D
Fig. B.5 PQ core
Core Geometrical Geometrical Cross- Bobbin Mean Magnetic Core
type constant constant sectional winding length path weight
area area per turn length
(A1/2D) Kg Kgfe Ac WA MLT ℓm
(mm) (cm 5)( c m x)( c m 2)( c m 2) (cm) (cm) (g)
PQ20/16 22.4· 10−3 3.7· 10−3 0.62 0.256 4.4 3.74 13
PQ20/20 33.6· 10−3 4.8· 10−3 0.62 0.384 4.4 4.54 15
PQ26/20 83.9· 10−3 7.2· 10−3 1.19 0.333 5.62 4.63 31
PQ26/25 0.125 9 .4· 10−3 1.18 0.503 5.62 5.55 36
PQ32/20 0.203 11 .7· 10−3 1.70 0.471 6.71 5.55 42
PQ32/30 0.384 18 .6· 10−3 1.61 0.995 6.71 7.46 55
PQ35/35 0.820 30 .4· 10−3 1.96 1.61 7.52 8.79 73
PQ40/40 1.20 39 .1· 10−3 2.01 2.50 8.39 10.2 95

B.6 American Wire Gauge Data 1049
B.6 American Wire Gauge Data
AWG # Bare area, Resistance, Diameter,
10−3 cm2 10−6Ω/cm cm
0000 1072.3 1.608 1.168
000 850.3 2.027 1.040
00 674.2 2.557 0.927
0 534.8 3.224 0.825
1 424.1 4.065 0.735
2 336.3 5.128 0.654
3 266.7 6.463 0.583
4 211.5 8.153 0.519
5 167.7 10.28 0.462
6 133.0 13.0 0.411
7 105.5 16.3 0.366
8 83.67 20.6 0.326
9 66.32 26.0 0.291
10 52.41 32.9 0.267
11 41.60 41.37 0.238
12 33.08 52.09 0.213
13 26.26 69.64 0.190
14 20.02 82.80 0.171
15 16.51 104.3 0.153
16 13.07 131.8 0.137
17 10.39 165.8 0.122
18 8.228 209.5 0.109
19 6.531 263.9 0.0948
20 5.188 332.3 0.0874
21 4.116 418.9 0.0785
22 3.243 531.4 0.0701
23 2.508 666.0 0.0632
24 2.047 842.1 0.0566
25 1.623 1062.0 0.0505
26 1.280 1345.0 0.0452
27 1.021 1687.6 0.0409
28 0.8046 2142.7 0.0366
29 0.6470 2664.3 0.0330
(continued)

1050 B Magnetics Design Tables
AWG # Bare area, Resistance, Diameter,
10−3 cm2 10−6Ω/cm cm
30 0.5067 3402.2 0.0294
31 0.4013 4294.6 0.0267
32 0.3242 5314.9 0.0241
33 0.2554 6748.6 0.0236
34 0.2011 8572.8 0.0191
35 0.1589 10849 0.0170
36 0.1266 13608 0.0152
37 0.1026 16801 0.0140
38 0.08107 21266 0.0124
39 0.06207 27775 0.0109
40 0.04869 35400 0.0096
41 0.03972 43405 0.00863
42 0.03166 54429 0.00762
43 0.02452 70308 0.00685
44 0.0202 85072 0.00635
```
