---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第8章part 4 - 8 Converter Transfer Functions
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 348-357 > Chunk ID: `chapter-8-part-4`"
---

# 第8章part 4 - 8 Converter Transfer Functions

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 348-357  
> Chunk ID: `chapter-8-part-4`

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
8.6 Summary of Key Points 337
Problems
8.1 Express the gains represented by the asymptotes of Fig.8.64a–c in factored pole-zero form.
You may assume that all poles and zeroes have negative real parts.
(a)
+20 dB/decade
f0
Gm
f1
(b)
f2
Gm
f3
f1
(c)
f1
Q
f2
G+20 dB/decade
Fig. 8.64 Gain asymptotes for Problem 8.1
8.2 Express the gains represented by the asymptotes of Fig.8.65a–c in factored pole-zero form.
You may assume that all poles and zeroes have negative real parts.
8.3 Derive analytical expressions for the low-frequency asymptotes of the magnitude Bode
plots shown in Fig. 8.65a–c.
8.4 Derive analytical expressions for the three magnitude asymptotes of Fig.8.16.
8.5 An experimentally measured transfer function. Figure 8.66 contains experimentally mea-
sured magnitude and phase data for the gain functionA(s) of a certain ampliﬁer. The object
of this problem is to ﬁnd an expression forA(s). Overlay asymptotes as appropriate on the
magnitude and phase data, and hence deduce numerical values for the gain asymptotes
and corner frequencies of A(s). Your magnitude and phase asymptotes must, of course,
follow all of the rules: magnitude slopes must be multiples of ±20 dB per decade, phase
slopes for real poles must be multiples of±45◦per decade, etc. The phase and magnitude
asymptotes must be consistent with each other.
It is suggested that you start by guessingA(s) based on the magnitude data. Then construct
the phase asymptotes for your guess, and compare them with the given data. If there are
discrepancies, then modify your guess accordingly and redo your magnitude and phase
asymptotes. You should turn in: (1) your analytical expression for A(s), with numerical
values given, and (2) a copy of Fig. 8.66, with your magnitude and phase asymptotes
superimposed and with all break frequencies and slopes clearly labeled.

338 8 Converter Transfer Functions
(a)
+20 dB/decade
f0
G (b)
f1
Q1
f2
Q2
G
(c) f1
Q
f2
Gf3
Fig. 8.65 Gain asymptotes for Problems 8.2 and 8.3
º
º
º
º
0º
45º
90º
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
 A
|| A ||
0 dB
10 dB
20 dB
30 dB
40 dB
Fig. 8.66 Experimentally measured magnitude and phase data, Problem 8.5
8.6 An experimentally measured impedance. Figure 8.67 contains experimentally measured
magnitude and phase data for the driving-point impedance Z(s) of a passive network. The
object of this problem is the ﬁnd an expression for Z(s). Overlay asymptotes as appropri-
ate on the magnitude and phase data, and hence deduce numerical values for the salient
features of the impedance function. You should turn in: (1) your analytical expression for

8.6 Summary of Key Points 339
Z(s), with numerical values given, and (2) a copy of Fig. 8.67, with your magnitude and
phase asymptotes superimposed and with all salient features and asymptote slopes clearly
labeled.
Fig. 8.67 Impedance mag-
nitude and phase data, Prob-
lem 8.6
0 dB
10 dB
20 dB
30 dB
º
º
0º
45º
90º
10 Hz 100 Hz 1 kHz 10 kHz
|| Z ||
Z
8.7 For the nonideal ﬂyback converter modeled in Sect. 7.2.10:
(a) Derive analytical expressions for the control-to-output and line-to-output transfer
functions Gvd(s) and Gvg(s). Express your results in standard normalized form.
(b) Derive analytical expressions for the salient features of these transfer functions.
(c) Construct the magnitude and phase Bode plots of the control-to-output transfer func-
tion, using the following values: n = 2, Vg = 48 V, D = 0.3, R = 5Ω, L =
250μH, C= 100 μF, Ron= 1.2Ω. Label the numerical values of the constant asymp-
totes, all corner frequencies, the Q-factor, and asymptote slopes.
8.8 Magnitude Bode diagram of an R–L–C ﬁlter circuit. For the ﬁlter circuit of Fig. 8.68,
construct the Bode plots for the magnitudes of the Thevenin-equivalent output impedance
Zout and the transfer function H(s)= v2/v1. Plot your results on semi-log graph paper.
Give approximate analytical expressions and numerical values for the important corner
frequencies and asymptotes. Do all of the elements signiﬁcantly aﬀect Zout and H?

340 8 Converter Transfer Functions
Fig. 8.68 Filter circuit of
Problem 8.8
+v1
+
v2
Zout
R1
10 
R2
100 
R3
1 k
C2
220 μF
L1
10 mH
C1
47 nF
8.9 Operational ampliﬁer ﬁlter circuit. The op-amp circuit shown in Fig. 8.69 is a practical
realization of what is known as a PID controller , and is sometimes used to modify the
loop gain of feedback circuits to improve their performance. Using semi-log graph paper,
sketch the Bode diagram of the magnitude of the transfer functionv2(s)/v1(s) of the circuit
shown. Label all corner frequencies, ﬂat asymptote gains, and asymptote slopes, as appro-
priate, giving both analytical expressions and numerical values. You may assume that the
op-amp is ideal.
+
+v1
+
v2
R1
100 
C1
24 nF
R2
1 k
R4
2 k
R3 20 k
C2
1 μF
C3 800 pF
Fig. 8.69 Op-amp PID controller circuit, Problem 8.9
8.10 Phase asymptotes. Construct the phase asymptotes for the transfer function v2(s)/v1(s)o f
Problem 8.9. Label all break frequencies, ﬂat asymptotes, and asymptote slopes.
8.11 Construct the Bode diagram for the magnitude of the output impedance Zout of the net-
work shown in Fig. 8.70. Give suitable analytical expressions for each asymptote, corner
frequency, andQ-factor, as appropriate. Justify any approximations that you use. The com-
ponent values are: L1 = 100μH, L2 = 16 mH, C1 = 1000μF, C2 = 10μF, R1 = 5Ω,R2 =
50Ω

8.6 Summary of Key Points 341
+v1
Zout
R1
R2
C2
L1
C1
L2
Fig. 8.70 Filter network of Problem 8.11
+vg
Zs
R1
C2
L1
C1
R2L2
L3
L4
Fig. 8.71 Input ﬁlter circuit of Problem 8.12
8.12 The two section input ﬁlter in the circuit of Fig. 8.71 should be designed such that its
output impedance Zout|vg = 0 meets certain input ﬁlter design criteria, and hence it is
desirable to construct the Bode plot for the magnitude of Zs. Although this ﬁlter contains
six reactive elements,∥Zs∥ can nonetheless be constructed in a relatively straightforward
manner using graphical construction techniques. The element values are:
L1= 32mH C1= 32 μF
L2= 400 μH C2= 6.8 μF
L3= 800 μH R1= 10Ω
L4= 1 μH R2= 1Ω
(a) Construct ∥ Zs∥ using the“algebra on the graph” method. Give simple approximate
analytical expressions for all asymptotes and corner frequencies.
(b) It is desired that ∥ Zs∥ be approximately equal to 5 Ωat 500 Hz and 2.5Ωat 1 kHz.
Suggest a simple way to accomplish this by changing the value of one component.
8.13 Construct the Bode plot of the magnitude of the output impedance of the ﬁlter illustrated
in Fig. 8.72. Give approximate analytical expressions for each corner frequency. No credit
will be given for computer-generated plots.

342 8 Converter Transfer Functions
+
–28 V Zout
100 μH
100 μF
1 
1 100 μH
5 mH
0.2 
1000 μF
0.2 μH
100 μF
10 μH
1 mH10 
1 μF100 μF
1 
0.1 μH
L1
L2
L3
L4
L5
L6
L7
C1
C2
C3
C4
C5
R1
R2
R3
R4
R5
Fig. 8.72 Input ﬁlter circuit of Problem 8.13
8.14 A certain open-loop buck–boost converter contains an input ﬁlter. Its small-signal ac
model is shown in Fig. 8.73, and the element values are speciﬁed below. Construct the
Bode plot for the magnitude of the converter output impedance∥Zout(s)∥. Label the values
of all important corner frequencies and asymptotes.
D= 0.6 Lf = 150 μH
R= 6Ω C f = 16 μF
C= 0.33 μF Cb= 2200 μF
L= 25 μH Rf = 1Ω
+
– Id (s)vg(s)
+
–L Vg –V d(s)
RCId (s)
1 : D D' : 1Lf
Rf
Cf
Cb
Zout(s)
Fig. 8.73 Small-signal model of a buck converter with input ﬁlter, Problem 8.14
8.15 In Sect. 7.2.10, the small-signal ac model of a nonideal ﬂyback converter is derived, with
the result illustrated in Fig. 7.28. Construct a Bode plot of the magnitude and phase of
the converter output impedance Zout(s). Give both analytical expressions and numerical
values for all important features in your plot. Note: Zout(s) includes the load resistance R.
The element values are: D= 0.4, n= 0.2, R= 6Ω, L= 600μH, C= 100μF, Ron= 5Ω.
8.16 The small-signal equations of the Watkins–Johnson converter operating in continuous con-
duction mode are:
Ldˆi(t)
dt =−Dˆv(t)+ (2Vg−V) ˆd(t)+ (D−D′)ˆvg(t)
C dˆv(t)
dt = Dˆi(t)−ˆv(t)
R
ˆig(t)= (D−D′)ˆi(t)+ 2I ˆd(t)

8.6 Summary of Key Points 343
(a) Derive analytical expressions for the line-to-output transfer function Gvg(s) and the
control-to-output transfer function Gvd(s).
(b) Derive analytical expressions for the salient features (dc gains, corner frequencies,
and Q-factors) of the transfer functions Gvg(s) and Gvd(s). Express your results as
functions of Vg, D, R, L, and C.
(c) The converter operates at Vg= 28 V, D= 0.25, R= 28Ω, C= 100 μF, L= 400 μF.
Sketch the Bode diagram of the magnitude and phase ofGvd(s). Label salient features.
8.17 The element values in the buck converter of Fig.7.55 are:
Vg= 120 V D= 0.6
R= 10Ω Rg= 2Ω
L= 550 μH C= 100 μF
(a) Determine an analytical expression for the control-to-output transfer function Gvg(s)
of this converter.
(b) Find analytical expressions for the salient features of Gvg(s).
(c) Construct magnitude and phase asymptotes for Gvg. Label the numerical values of all
slopes and other important features.
8.18 The LCC resonant inverter circuit contains the following transfer function:
H(s)= sC1R
1+ sR(C1+ C2)+ s2LC1+ s3LC1C2R
(a) When C1 is suﬃciently large, this transfer function can be expressed as an inverted
pole and a quadratic pole pair. Derive analytical expressions for the corner frequen-
cies and Q-factor in this case, and sketch typical magnitude asymptotes. Determine
analytical conditions for validity of your approximation.
(b) When C2 is suﬃciently large, the transfer function can be also expressed as an inverted
pole and a quadratic pole pair. Derive analytical expressions for the corner frequen-
cies and Q-factor in this case, and sketch typical magnitude asymptotes. Determine
analytical conditions for validity of your approximation in this case.
(c) When C1= C2 and when the quadratic poles have suﬃciently high Q, then the transfer
function can again be expressed as an inverted pole and a quadratic pole pair. Derive
analytical expressions for the corner frequencies and Q-factor in this case, and sketch
typical magnitude asymptotes. Determine analytical conditions for validity of your
approximation in this case.
8.19 A two-section L−C ﬁlter has the following transfer function:
G(s)= 1
1+ s
⎦L1+ L2
R
)
+ s2⎦
L1 (C1+ C2)+ L2C2
)
+ s3
⎦L1L2C1
R
)
+ s4⎦
L1L2C1C2
)
The element values are:
R= 50 mΩ
C1= 680 μF C2= 4.7 μF
L1= 500 μH L2= 50 μH

344 8 Converter Transfer Functions
(a) Use the above numerical values to determine how to factor G(s) into approximate real
and quadratic poles, as appropriate. Give approximate analytical expressions for the
salient features that are valid for the above numerical values.
(b) Construct the magnitude and phase asymptotes of G(s).
(c) It is desired to reduce the Q to 2, without signiﬁcantly changing the corner frequencies
or other features of the response. It is possible to do this by changing only two element
values. Specify how to accomplish this.
Fig. 8.74 Boost converter of
Problem 8.20
+
–
+
v
–
v
g
Boost converter
Controller
fs = 200 kHz
L
C R
100 μH
33 μF 12 48 V
d
8.20 The boost converter of Fig. 8.74 operates in the continuous conduction mode, with quies-
cent duty cycle D= 0.6. On semi-log axes, construct the magnitude and phase Bode plots
of
(a) the control-to-output transfer function Gvd(s),
(b) the line-to-output transfer function Gvg(s),
(c) the output impedance Zout(s), and
(d) the input impedance Zin(s).
On each plot, label the corner frequencies and asymptotes.
+
–
n1 : n1 : n3
CR
+
v(t)
–
L
vg(t)
Controller
fs = 150 kHz
500 μH
10 μF7 
d
Fig. 8.75 Forward converter of Problem 8.21

8.6 Summary of Key Points 345
8.21 The forward converter of Fig. 8.75 operates in the continuous conduction mode, with the
quiescent values Vg= 380 V and V= 28 V . The transformer turns ratio isn1/n3= 4.5. On
semi-log axes, construct the magnitude and phase Bode plots of
(a) the control-to-output transfer function Gvd(s), and
(b) the line-to-output transfer function Gvg(s).
On each plot, label the corner frequencies and asymptotes.Hint: other than introduction of
the turns ration1/n3, the transformer does not signiﬁcantly aﬀect the small-signal behavior
of the forward converter.
8.22 Loss mechanisms in capacitors, such as dielectric loss and contact and foil resistance, can
be modeled electrically using an equivalent series resistance (ESR). Capacitors whose
dielectric materials exhibit a high dielectric constant, such as electrolytic capacitors, tan-
talum capacitors, and some types of multi-layer ceramic capacitors, typically exhibit rela-
tively high ESR.
A buck converter contains a 1.6 mH inductor, and operates with a quiescent duty cycle of
0.5. Its output capacitor can be modeled as a 16 μF capacitor in series with a 0.2ΩESR.
The load resistance is 10Ω. The converter operates in continuous conduction mode. The
quiescent input voltage is Vg= 120 V .
(a) Determine an analytical expression for the control-to-output transfer function Gvg(s)
of this converter.
(b) Find analytical expressions for the salient features of Gvg(s).
(c) Construct magnitude and phase asymptotes for Gvg. Label the numerical values of all
slopes and other important features.
8.23 The boost converter of Fig. 8.76 operates in the continuous conduction mode, with the
following quiescent values: Vg = 120 V, V= 300 V . It is desired to control the converter
input current waveform, and hence it is necessary to determine the small-signal transfer
function
Gid(s)=
ˆig(s)
ˆd(s)
⏐⏐⏐⏐
⏐⏐
ˆvg(s)=0
(a) Derive an analytical expression for Gid(s). Express all poles and zeroes in normalized
standard form, and give analytical expressions for the corner frequencies, Q-factor,
and dc gain.
(b) On semi-log axes, construct the Bode plot for the magnitude and phase of Gid(s).
Fig. 8.76 Boost converter of
Problem 8.23
+
–
+
v
–
vg
Controller
fs = 100 kHz
L
CR
ig
400 μH
10 μF 120 
d

346 8 Converter Transfer Functions
8.24 The buck–boost converter of Fig. 8.77 operates in the continuous conduction mode, with
the following quiescent values: Vg = 48 V, V=−24 V . On semi-log axes, construct the
magnitude and phase Bode plots of:
(a) the control-to-output transfer function Gvd(s), and
(b) the output impedance Zout(s).
On each plot, label the corner frequencies and asymptotes as appropriate.
Fig. 8.77 Buck–boost con-
verter of Problem 8.24
+
–
LC R
+
v
–
vg
fs = 200 kHz
220 mF5 W50 mH
Controller
d
```
