---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: "第16章part 3 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems"
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 669-677 > Chunk ID: `chapter-16-part-3`"
---

# 第16章part 3 - 16 Techniques of Design-Oriented Analysis: Extra Element Theorems

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 669-677  
> Chunk ID: `chapter-16-part-3`

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
16.5 Frequency Inversion 665
Fig. 16.45 Damped L–C ﬁlter example
of Fig. 16.41: ﬁnding RDa. The resistance
seen at Port a is found with the reactive
elements at Ports b and c set to their refer-
ence states
The coeﬃcient RDa is the resistance seen at the L1 port (Port a) when Port b ( C)i s
set to its reference (DC /open) state, and Port c ( L2) is set to its reference (HF /open) state.
From examination of Fig. 16.45 with these conditions, it can be seen that RDa = ∞(open
circuit).
The coeﬃcient RDa−b is the resistance seen at theL1 port (Port a) when Port b (C) is set to its
inverse (DC/open) state, and Port c (L2) is set to its reference (HF/open) state. From examination
of Fig. 16.46 with these conditions, it can be seen that RDa−b= R.
The port states and results for the seven denominator terms are listed in Table 16.3. Deriva-
tion of the remaining terms of Table 16.3 is left for the reader. The resulting denominator is
denominator= 1+ sCR+ R
sL2
+ sCR sL1
R + R
sL2
sL1
R (16.99)
We will further simplify the denominator after the numerator has been found.
Fig. 16.46 Damped L–C ﬁlter example
of Fig. 16.41: ﬁnding RDa−b. The resis-
tance seen at Port a is found with the re-
active element at Port b set to its inverse
state (short) and Port c set to its reference
state
C: inverse

666 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
Table 16.3 Derivation of Denominator Terms, Damped L–C Filter Example
Term
States of Ports/ Reactive Elements
ResultL1 CL 2
Port a Port b Port c
sL1
RDa
Measurement Reference /open Reference /open RDa=∞
sCRDb Reference/short Measurement Reference /open RDb= R
RDc
sL2
Reference/short Reference /open Measurement RDc= R
sCRDb
sL1
RDa−b
Measurement Inverse /short Reference /open RDa−b= R
sCRDb
RDc−b
sL2
Reference/short Inverse /short Measurement RDc−b= 0
RDc
sL2
sL1
RDa−c
Measurement Reference /open Inverse /short RDa−c= R
sCRDb
sL1
RDa−b
RDc−ab
sL2
Inverse/open Inverse /short Measurement RDc−ab= 0
The numerator may also contain products having one, two, or all three reactive elements.
For the output impedance example, we obtain:
numerator= 1+
⎦sL1
RNa
+ sCRNb+ RNc
sL2
)
+
⎦sL1
RNa
sCRNb−a+ sL1
RNa
RNc−a
sL2
+ RNc
sL2
sCRNb−c
)
+
⎦sL1
RNa
RNc−a
sL2
sCRNb−ac
)
(16.100)
As usual, the numerator terms are found in the presence of ˆi, with the transfer function output
(ˆv ) nulled to zero. Since in this example the output voltage coincides with the capacitor (Port
b) voltage, we expect the capacitor terms to be zero.
We again employ the generalized deﬁnitions of reference and inverse states. In the pres-
ence of ˆi, we inject at the L1, C,o r L2 port, and adjust the injection such that ˆv is nulled. The
coeﬃcients are the resistances seen at the injection ports under these conditions.
For example, to ﬁnd RNa , we inject a current at the L1 port (Port a), with C (Port b) set to its
reference state (open) and L2 set to its reference state (open). The injection current is adjusted
in the presence of the current ˆi to null ˆv, as illustrated in Fig. 16.47. With ˆv nulled to zero, it can
be seen that ˆvtest = ˆitest R, and hence RNa = R.
From examination of Fig. 16.47, it can be seen that nulling the output voltage ˆv causes the
voltages across ports b and c to be zero. Consequently, numerator terms associated with these
ports are zero, and the only nonzero numerator term is RNa . Determination of the numerator
terms is summarized in Table 16.4.

16.5 Frequency Inversion 667
Fig. 16.47 Determination of
numerator term RNa
Table 16.4 Derivation of Numerator Terms, Damped L–C Filter Example
Term
States of Ports/ Reactive Elements
ResultL1 CL 2
Port a Port b Port c
sL1
RNa
Measurement Reference /open Reference /open RNa = R
sCRNb Reference/short Measurement Reference /open RNb = 0
RNc
sL2
Reference/short Reference /open Measurement RNc = 0
sL1
RNa
sCRNb−a Inverse/open Measurement Reference /open RNb−a= 0
sL1
RNa
RNc−a
sL2
Inverse/open Reference /open Measurement RNc−a= 0
RNc
sL2
sCRNb−c Reference/short Measurement Inverse /short RNb−c= 0
sL1
RNa
RNc−a
sL2
sCRNb−ac Inverse/open Measurement Inverse /short RNb−ac= 0
The resulting expression for the output impedance is
Z(s)= R
1+ sL1
R
1+ sRC+ R
sL2
+ s2L1C+ sL1
sL2
(16.101)
If desired, we can eliminate the inverted terms by multiplying the numerator and denominator
by the factor sL2/R to obtain
Z(s)= sL2
1+ sL1
R
1+ s(L1+ L2)
R + s2L2C+ s3L1L2C
R
(16.102)
In summary, the nEET allows us to write the transfer functions of quite complex systems
with a minimum of algebraic manipulations. Inverted forms can also be handled by deﬁnition of

668 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
a reference gain that occurs when the reactive elements are set to reference states. This allows
us to solve the case where there are poles or zeroes at the origin.
16.5.2 Other Special Cases
It sometimes happens in application of the n-EET that all terms for an intermediate power of s
are zero. This happens in circuits having undamped resonances. When we compute the higher-
order terms, we then obtain (0·∞) for all terms.
Fig. 16.48 Undamped L–C ﬁlter
example +
L
Cv1
+
v2
An example is the undamped L–C ﬁlter illustrated in Fig. 16.48. The transfer function of
this circuit is
G(s)= v2
v1
= 1
1+ s2LC (16.103)
The n-EET encounters problems with this example because the coeﬃcient of s1 in the denomi-
nator is zero. Hence we are unable to compute the coeﬃcient of s2: we obtain (0·∞).
Fig. 16.49 Addition of dummy re-
sistor Rdum to the undamped L–C ﬁl-
ter example +
L
Cv1
+
v2Rdum
A solution is to insert a dummy resistor Rdum into the circuit as in Fig. 16.49; this adds a
nonzero damping term. We can then proceed with the n-EET analysis as usual, to obtain the
transfer function
G(s)= 1
1+ s
⎦ L
Rdum
+ C· 0
)
+ s2 L
RCR
(16.104)
= 1
1+ s L
Rdum
+ s2LC
(16.105)
The original circuit is obtained when we let Rdum→∞. The transfer function then becomes
G(s)= 1
1+ s2LC (16.106)
The technique of adding dummy resistors to the circuit can allow the n-EET to be employed
when degenerate cases arise.

16.5 Frequency Inversion 669
Problems
16.1 Analysis of the buck–boost converter control-to-output transfer function Gvd(s) using the
Extra Element Theorem . Averaged switch modeling of the buck–boost converter leads
to the continuous conduction mode small-signal ac model illustrated in Fig. 16.50.O n e
approach to solving for Gvd(s) in this circuit is to employ the Extra Element Theorem,
treating inductor L as the extra element. No credit will be given for other methods.
+ D' : DI1 + i1 I2 + i2
I2
DD' dV1 + v1
V1
DD' d
V2 + v2
+
+
L
+vg CR
Fig. 16.50 Small-signal ac model for the CCM buck–boost converter of Problem16.1, derived by average
switch modeling
(a)L e t L→short circuit, and determine the “original transfer function” Gd0.
(b) Determine ZN (s) and ZD(s), and hence derive the expression for Gvd(s). Express your
result in standard normalized form.
16.2 Analysis and design of a CCM SEPIC . A dc–dc SEPIC, along with nominal element val-
ues, is illustrated in Fig. 16.50. The object of this problem is to employ the Extra Element
Theorem as discussed in Sect. 16.2.3 to gain insight into the physical origins of the salient
features of the control-to-output transfer function Gvd(s), and to improve its behavior by
addition of a damping network. It is expected that your work will follow the analysis of
Sect. 16.2.3; no credit will be given for other approaches.
(a) Sketch the small-signal averaged switch model for this converter. Evaluate the numer-
ical values of the quiescent conditions in your model (i.e., the steady-state duty cycle
D and the switch model quantities I1, I2, V1, and V2).
(b) Using the simple approximation C1 →open circuit, determine the approximate
control-to-output transfer function
Gvd−bb(s)= ˆv(s)
ˆd(s)
⏐⏐⏐
⏐⏐
C1→0
Construct the Bode plot of the magnitude and phase of this transfer function on semi-
log axes, and label salient features (corner frequencies, Q-factors, dc gain) as appro-
priate.

670 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
+
–
L1
C2
+
v
12 V
–
C1
L2 Rvg
100 μH
100 μH
3.3 μF
100 μF 3 Ω18 V
fs = 100 kHz
Fig. 16.51 CCM SEPIC of Problem 16.2
(c) Construct the Bode plots of ∥ZN∥ and∥ZD∥, using semi-log axes, and label the nu-
merical values of the salient features. Overlay the capacitor C1 impedance. Hence,
estimate the frequencies of the resonant poles and zeroes in Gvd(s) induced by the in-
ternal resonance. Verify your analysis by simulation, using an averaged model to plot
the Bode plot of the exact G
vd(s).
(d) Add an Rb–Cb damping network as discussed in Sect.16.2.4, as follows. ChooseCb=
10C1. Select Rb such that the resonant poles and zeroes are approximately centered on
the Rb asymptote of the impedanceZ(s)o fE q .(16.61). Overlay the∥Z(s)∥ asymptotes
on your Bode plots of∥ZN∥ and∥ZD∥. Again use averaged simulation to plot the exact
magnitude and phase of the damped Gvd(s), and verify that the internal resonance is
adequately damped.
16.3 Analysis of a CCM ´Cuk Converter.A ´Cuk converter is illustrated in Fig. 16.52. The ob-
jective of this problem is to employ the Extra Element Theorem to derive an expression
for the line-to-output transfer function G
vg(s), with an approach that is similar to that em-
ployed in the SEPIC example of Sect. 16.2.3. Like the SEPIC, the ´Cuk converter can be
viewed as an eﬀective buck–boost converter plus correction factor terms that account for
an additional internal resonance.
+
L1
C2 R
+
v2
C1 L2
+ v1
i1 i2
D1Q1vg
Fig. 16.52 ´Cuk converter circuit of Problem 16.3
(a) Construct the average switch model for this converter operating in continuous conduc-
tion mode.
(b)I f w e l e tC1 →0 (open circuit) in the small-signal model, then an e ﬀective buck–
boost converter is obtained. Sketch the small-signal model for this case, and ﬁnd its
line-to-output transfer function Gvg−bb(s).

16.5 Frequency Inversion 671
(c) Apply the Extra Element Theorem to ﬁnd ZN (s) and ZD(s) in the correction factor of
the line-to-output transfer function.
(d) For some values, plot Gvg.
16.4 Figure 16.53 contains a small-signal model of a boost converter that includes inductor
resistance RL.
Fig. 16.53 Large-signal dc and small-signal ac model of the CCM boost converter of Problem 16.4
(a)U s e t h en-Extra Element Theorem to derive an expression for the control-to-output
transfer function Gvd(s) predicted by this circuit model. No credit will be given for
other methods.
(b) Can the inductor resistance RL be used to move the right half-plane zero into the left
half-plane? Explain. What is the resulting eﬀect on the converter eﬃciency? Compare
the resulting loss in RL with the load power.
16.5 A boost converter including an output capacitor equivalent series resistance RC is illus-
trated in Fig.16.54. For continuous conduction mode operation, the small-signal ac model
for this converter can be derived by state-space averaging, with the result illustrated in
Fig. 16.55.
+ Q1
L
C R
+
v(t)
D1
vg
iL(t)
RC +
vC(t)
Fig. 16.54 Boost converter with capacitor ESR RC , Problem 16.5

672 16 Techniques of Design-Oriented Analysis: Extra Element Theorems
Fig. 16.55 Small-signal ac model for the boost converter of Fig.16.54
Use the n-Extra Element Theorem to derive an expression for the control-to-output transfer
function Gvd(s) of this converter. No credit will be given for other methods. Be sure to
explain how you derived each term. You may use the following substitutions:
Re= DD′ (R∥RC)
Ve= (D−D′) (R∥RC) IL+ V
You may express your answer in terms of the following quantities:R, RC, IL, D, D′, V, Re,
Ve, L, C. It is not necessary to further simplify your answers.
16.6 Use the n-Extra Element Theorem to derive an expression for the control-to-output transfer
function Gvd(s) predicted by the SEPIC small-signal model of Fig. 16.17.
16.7 A small-signal ac model of the ´Cuk converter operating in continuous conduction mode is
illustrated in Fig. 16.56. Resistors Rl1 and Rl2 model the inductor copper loss.
+vg(t)
L1
+
v(t) R
1 : DD' : 1
+
+Rl1
C1
L2Rl2
C2
d(t)V1 d(t)V1
d(t) I1 + I2
Fig. 16.56 Small-signal ac model of the ´Cuk converter of Problem 16.7
Use the n-EET to determine the line-to-output transfer functionGvg(s). Your result should
be expressed as a rational fraction in s. No credit will be given for methods that do not
employ the n-EET.

16.5 Frequency Inversion 673
16.8 Figure. 16.57 contains the schematic of a single-section input ﬁlter with an R–C damping
network.
Fig. 16.57 Damped L–C input ﬁlter section, Problem 16.8
Use the n-EET to write the expression for the output impedance Z(s) of this network. No
credit will be given for methods that do not employ the n-EET.
```
