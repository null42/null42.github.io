---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第8章part 3 - 8 Converter Transfer Functions
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 328-347 > Chunk ID: `chapter-8-part-3`"
---

# 第8章part 3 - 8 Converter Transfer Functions

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 328-347  
> Chunk ID: `chapter-8-part-3`

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
8.3 Graphical Construction of Impedances and Transfer Functions 317
Fig. 8.39 Waveforms of the con-
verters of Fig. 8.38,f o ras t e pr e -
sponse in duty cycle. The average
diode current and output voltage
initially decrease, as predicted by
the RHP zero. Eventually, the in-
ductor current increases, causing
the average diode current and the
output voltage to increase
t
iD(t)
iD(t) Ts
t
| v(t) |
t
iL(t)
d = 0.6d = 0.4
The increased duty cycle causes the inductor current to slowly increase, and hence the aver-
age diode current eventually exceeds its original d= 0.4 equilibrium value. The output voltage
eventually increases in magnitude, to the new equilibrium value corresponding to d= 0.6.
The presence of a right half-plane zero tends to destabilize wide-bandwidth feedback loops,
because during a transient the output initially changes in the wrong direction. The phase margin
test for feedback loop stability is discussed in the next chapter; when a RHP zero is present,
it is diﬃcult to obtain an adequate phase margin in conventional single-loop feedback systems
having wide bandwidth. Prediction of the right half-plane zero, and the consequent explanation
of why the feedback loops controlling CCM boost and buck–boost converters tend to oscillate,
was one of the early successes of averaged converter modeling.
8.3 Graphical Construction of Impedances and Transfer Functions
Often, we can draw approximate Bode diagrams by inspection, without large amounts of messy
algebra and the inevitable associated algebra mistakes. A great deal of insight can be gained into
the operation of the circuit using this method. It becomes clear which components dominate
the circuit response at various frequencies, and so suitable approximations become obvious.
Analytical expressions for the approximate corner frequencies and asymptotes can be obtained
directly. Impedances and transfer functions of quite complicated networks can be constructed.
Thus insight can be gained, so that the design engineer can modify the circuit to obtain a desired
frequency response.

318 8 Converter Transfer Functions
The graphical construction method, also known as “doing algebra on the graph,” involves
use of a few simple rules for combining the magnitude Bode plots of impedances and transfer
functions.
8.3.1 Series Impedances: Addition of Asymptotes
R
10 
C
1 μF
Z(s)
Fig. 8.40 Series R–C network example
A series connection represents the addition of
impedances. If the Bode diagrams of the individual
impedance magnitudes are known, then the asymptotes
of the series combination are found by simply taking
the largest of the individual impedance asymptotes. In
many cases, the result is exact. In other cases, such as
when the individual asymptotes have the same slope,
then the result is an approximation; nonetheless, the
accuracy of the approximation can be quite good.
Consider the series-connected R–C network of
Fig. 8.40. It is desired to construct the magnitude
asymptotes of the total series impedance Z(s), where
Z(s)= R+ 1
sC (8.150)
Let us ﬁrst sketch the magnitudes of the individual impedances. The 10 Ωresistor has an
impedance magnitude of 10Ω⇒20 dBΩ. This value is independent of frequency, and is given
in Fig. 8.41. The capacitor has an impedance magnitude of 1/ωC. This quantity varies inversely
withω, and hence its magnitude Bode plot is a line with slope−20 dB/decade. The line passes
through 1Ω⇒0d BΩat the angular frequencyωwhere
1
ωC= 1Ω (8.151)
that is, at
ω= 1
(1Ω)C= 1
(1Ω)(10−6F)= 106 rad/sec (8.152)
Fig. 8.41
Impedance
magnitudes of the
individual elements
in the network of
Fig. 8.40
1 MHz100 kHz10 kHz1 kHz100 Hz
100 
10 
1 
0.1 
1 k
10 k
1
C
R = 10 20 dB
1
C =1 at 159 kHz
40 dB
20 dB
0 dB
60 dB
80 dB

8.3 Graphical Construction of Impedances and Transfer Functions 319
In terms of frequency f , this occurs at
f= ω
2π= 106
2π= 159 kHz (8.153)
So the capacitor impedance magnitude is a line with slope −20 dB/dec, and which passes
through 0 dBΩat 159 kHz, as shown in Fig. 8.41. It should be noted that, for simplicity, the
asymptotes in Fig. 8.41 have been labeled R and 1/ωC. But to draw the Bode plot, we must
actually plot dBΩ; for example, 20 log10(R/1Ω) and 20 log10((1/ωC)/1Ω).
Let us now construct the magnitude of Z(s), given by Eq. (8.150). The magnitude of Z can
be approximated as follows:
Z ( jω)
=

R+ 1
jωC

≈
⎧⎪⎪⎪⎨⎪⎪⎪⎩
R for R≫ 1/ωC
1
ωC for R≪ 1/ωC (8.154)
The asymptotes of the series combination are simply the larger of the individual resistor and
capacitor asymptotes, as illustrated by the heavy lines in Fig. 8.42. For this example, these
are in fact the exact asymptotes of ∥Z∥. In the limiting case as frequency tends to zero (dc),
then the capacitor tends to an open circuit. The series combination is then dominated by the
capacitor, and the exact function tends asymptotically to the capacitor impedance magnitude. In
the limiting case as frequency tends to inﬁnity, then the capacitor tends to a short circuit, and
the total impedance becomes simply R.S ot h e R and 1/ωC lines are the exact asymptotes for
this example.
The corner frequency f
0, where the asymptotes intersect, can now be easily deduced. At
angular frequencyω0= 2πf0, the two asymptotes are equal in value:
1
ω0C= R (8.155)
Solution forω0 and f0 leads to:
ω0 = 1
RC= 1
(10Ω)(10−6F)= 105 rad/sec
f0 =ω0
2π= 1
2πRC= 16 kHz (8.156)
1 MHz100 kHz10 kHz1 kHz100 Hz
100 
10 
1 
0.1 
1 k
10 k
1
C
R
|| Z ||
f0
1
2 RC =1 6k H z
40 dB
20 dB
0 dB
60 dB
80 dB
Fig. 8.42 Construction of the composite asymptotes of∥ Z∥. The asymptotes of the series combination
can be approximated by simply selecting the larger of the individual resistor and capacitor asymptotes

320 8 Converter Transfer Functions
So if we can write analytical expressions for the asymptotes, then we can equate the expressions
to ﬁnd analytical expressions for the corner frequencies where the asymptotes intersect.
The deviation of the exact curve from the asymptotes follows all of the usual rules. The
slope of the asymptotes changes by +20 dB/decade at the corner frequency f0 (i.e., from
−20 dBΩ/decade to 0 dBΩ/decade), and hence there is a zero at f = f0. So the exact curve
deviates from the asymptotes by+3d BΩat f= f0, and by+1d BΩat f= 2 f0 and at f= f0/2.
8.3.2 Series Resonant Circuit Example
Z(s)
R
L
C
Fig. 8.43 Series R–L–C network example
As a second example, let us construct the
magnitude asymptotes for the series R–L–
C circuit of Fig. 8.43. The series impedance
Z(s)i s
Z(s)= R+ sL+ 1
sC (8.157)
The magnitudes of the individual resistor, in-
ductor, and capacitor asymptotes are plotted
in Fig. 8.44, for the values
R= 1kΩ
L= 1 mH (8.158)
C= 0.1μF
The series impedance Z(s) is dominated by the capacitor at low frequency, by the resistor at mid
frequencies, and by the inductor at high frequencies, as illustrated by the bold line in Fig. 8.44.
The impedance Z(s) contains a zero at angular frequency ω1, where the capacitor and resistor
asymptotes intersect. By equating the expressions for the resistor and capacitor asymptotes, we
can ﬁndω
1:
R= 1
ω1C⇒ω1= 1
RC (8.159)
A second zero occurs at angular frequencyω2, where the inductor and resistor asymptotes inter-
sect. Upon equating the expressions for the resistor and inductor asymptotes at ω2, we obtain
the following:
Fig. 8.44 Graphical
construction of ∥ Z∥
of the series R–L–C
network of Fig. 8.43,
for the element values
speciﬁed by Eq. (8.158)
1 MHz100 kHz10 kHz1 kHz100 Hz
1 k
100 
10 
1 
10 k
100 k
1
C
R
|| Z ||
f1
L
60 dB
40 dB
20 dB
0 dB
80 dB
100 dB
f2

8.3 Graphical Construction of Impedances and Transfer Functions 321
Fig. 8.45 Graphical con-
struction of impedance
asymptotes for the series
R–L–C network example,
with R decreased to 10Ω
1 MHz100 kHz10 kHz1 kHz100 Hz
1 k
100 
10 
1 
10 k
100 k
1
C
R
|| Z ||
f0
L
60 dB
40 dB
20 dB
0 dB
80 dB
100 dB
R0
R=ω2L⇒ω2= R
L (8.160)
So simple expressions for all important features of the magnitude Bode plot of Z(s) can be
obtained directly. It should be noted that Eqs. (8.159) and (8.160) are approximate, rather than
exact, expressions for the corner frequenciesω1 andω2. Equations (8.159) and (8.160) coincide
with the results obtained via the low-Q approximation of Sect. 8.1.7.
Next, suppose that the value of R is decreased to 10Ω.A s R is reduced in value, the approx-
imate corner frequencies ω1 andω2 move closer together until, at R= 100Ω, they are both
100 krad/sec. Reducing R further in value causes the asymptotes to become independent of the
value of R, as illustrated in Fig. 8.45 for R= 10ω.T h e∥ Z∥ asymptotes now switch directly
fromωL to 1/ωC.
So now there are two zeroes atω=ω0. At corner frequencyω0, the inductor and capacitor
asymptotes are equal in value. Hence,
ω0L= 1
ω0C= R0 (8.161)
Solution for the angular corner frequencyω0 leads to
ω0= 1√
LC
(8.162)
Atω=ω0, the inductor and capacitor impedances both have magnitude R0, called the charac-
teristic impedance.
Since there are two zeroes at ω=ω0, there is a possibility that the two poles could be
complex conjugates, and that peaking could occur in the vicinity ofω=ω0. So let us investigate
what the actual curve does atω=ω0. The actual value of the series impedance Z( jω0)i s
Z( jω0)= R+ jω0L+ 1
jω0C (8.163)
Substitution of Eq. (8.161) into Eq. (8.163) leads to
Z( jω0)= R+ jR0+ R0
j = R+ jR0−jR0= R (8.164)
Atω=ω0, the inductor and capacitor impedances are equal in magnitude but opposite in phase.
Hence, they exactly cancel out in the series impedance, and we are left with Z( jω0)= R,a s

322 8 Converter Transfer Functions
Fig. 8.46 Ac-
tual impedance
magnitude (solid
line) for the series
resonant R–L–C
example. The induc-
tor and capacitor
impedances cancel
out at f = f
0,a n d
hence Z( jω0)= R
1 MHz100 kHz10 kHz1 kHz100 Hz
1 k
100 
10 
1 
10 k
100 k
1
C
R
|| Z ||
f0
L
60 dB
40 dB
20 dB
0 dB
80 dB
100 dB
R0
Q = R0 /R
Actual curve
illustrated in Fig. 8.46. The actual curve in the vicinity of the resonance at ω=ω0 can deviate
signiﬁcantly from the asymptotes, because its value is determined byR rather thanωL or 1/ωC.
We know from Sect. 8.1.6 that the deviation of the actual curve from the asymptotes at
ω=ω0 is equal to Q.F r o mF i g .8.46, one can see that
⏐⏐⏐ Q
⏐⏐⏐dB=
⏐⏐⏐ R0
⏐⏐⏐dBΩ−
⏐⏐⏐ R
⏐⏐⏐dBΩ (8.165)
or,
Q= R0
R (8.166)
Equations (8.161)t o( 8.166) are exact results for the series resonant circuit.
The practice of adding asymptotes by simply selecting the larger asymptote can be applied
to transfer functions as well as impedances. For example, suppose that we have already con-
structed the magnitude asymptotes of two transfer functions, G1 and G2, and we wish to ﬁnd
the asymptotes of G= G1+ G2. At each frequency, the asymptote for G can be approximated
by simply selecting the larger of the asymptotes for G1 and G2:
G= G1+ G2≈
⎧⎪⎪⎨⎪⎪⎩
G1,
G1
≫
G2

G2,
G2
≫
G1
 (8.167)
Corner frequencies can be found by equating expressions for asymptotes as illustrated in the
preceding examples. In the next chapter, we will see that this approach yields a simple and
powerful method for determining the closed-loop transfer functions of feedback systems.
8.3.3 Parallel Impedances: Inverse Addition of Asymptotes
A parallel combination represents inverse addition of impedances:
Z
par= 1⎦1
Z1
+ 1
Z2
+···
)= Z1
 Z2
··· (8.168)
If the asymptotes of the individual impedances Z1, Z2,... , are known, then the asymptotes
of the parallel combination Zpar can be found by simply selecting the smallest individual
impedance asymptote. This is true because the smallest impedance will have the largest inverse,
and will dominate the inverse sum. As in the case of the series impedances, this procedure will
often yield the exact asymptotes of Zpar.

8.3 Graphical Construction of Impedances and Transfer Functions 323
Z(s) RLC
Fig. 8.47 Parallel R–L–C network example
Let us construct the magnitude asymp-
totes for the parallel R–L–C network of
Fig. 8.47, using the following element values:
R= 10Ω
L= 1 mH (8.169)
C= 0.1μF
Impedance magnitudes of the individual ele-
ments are illustrated in Fig. 8.48. The asymptotes for the total parallel impedance Z are approx-
imated by simply selecting the smallest individual element impedance, as shown by the heavy
line in Fig. 8.48. So the parallel impedance is dominated by the inductor at low frequency, by
the resistor at mid frequencies, and by the capacitor at high frequency. Approximate expressions
for the angular corner frequencies are again found by equating asymptotes:
atω=ω
1, R=ω1L⇒ω1= R
L (8.170)
atω=ω2, R= 1
ω2C⇒ω2= 1
RC
These expressions could have been obtained by conventional analysis, combined with the low-Q
approximation of Sect. 8.1.7.
1 MHz100 kHz10 kHz1 kHz100 Hz
1
C
R
|| Z ||
f1
L
40 dB
20 dB
0 dB
60 dB
80 dB
100 
10 
1 
0.1 
1 k
10 k
f2
Fig. 8.48 Construction of the composite asymptotes of∥ Z∥, for the parallelR–L–C example. The asymp-
totes of the parallel combination can be approximated by simply selecting the smallest of the individual
resistor, inductor, and capacitor asymptotes
8.3.4 Parallel Resonant Circuit Example
Figure 8.49 illustrates what happens when the value of R in the parallel R–L–C network is
increased to 1 kΩ. The asymptotes for∥ Z∥ then become independent of R, and change directly
fromωL to 1/ωC at angular frequencyω0. The corner frequencyω0 is now the frequency where
the inductor and capacitor asymptotes have equal value:

324 8 Converter Transfer Functions
Fig. 8.49 Graphical con-
struction of impedance
asymptotes for the parallel
R–L–C example, with R
increased to 1 kΩ
1 MHz100 kHz10 kHz1 kHz100 Hz
1
C
R
|| Z ||
f0
L
R040 dB
20 dB
0 dB
60 dB
80 dB
100 
10 
1 
0.1 
1 k
10 k
ω0L= 1
ω0C= R0 (8.171)
which implies that
ω0= 1√
LC
(8.172)
Atω=ω0, the slope of the asymptotes of∥ Z∥ changes from+20 dB/decade to−20 dB/decade,
and hence there are two poles. We should investigate whether peaking occurs, by determining
the exact value of∥ Z∥ atω=ω
0, as follows:
Z ( jω0)= (R)
 ( jω0L)

⎦ 1
jω0C
)
= 1⎦1
R+ 1
jω0L+ jω0C
) (8.173)
Substitution of Eq. (8.171)i n t o(8.173) yields
Z ( jω0)= 1
1
R+ 1
jR0
+ j
R0
= 1
1
R−j
R0
+ j
R0
= R (8.174)
So atω=ω0, the impedances of the inductor and capacitor again cancel out, and we are left with
Z( jω0)= R. The values of L and C determine the values of the asymptotes, but R determines
the value of the actual curve atω=ω0.
The actual curve is illustrated in Fig.8.50. The deviation of the actual curve from the asymp-
totes atω=ω0 is
⏐⏐⏐ Q
⏐⏐⏐dB=
⏐⏐⏐ R
⏐⏐⏐dBΩ−
⏐⏐⏐ R0
⏐⏐⏐dBΩ (8.175)
or,
Q= R
R0
(8.176)
Equations (8.171)t o( 8.176) are exact results for the parallel resonant circuit.
The graphical construction method for impedance magnitudes is well known, and reac-
tance paper can be purchased commercially. As illustrated in Fig. 8.51, the magnitudes of
the impedances of various inductances, capacitances, and resistances are plotted on semi-
logarithmic axes. Asymptotes for the impedances of R–L–C networks can be sketched directly
on these axes, and numerical values of corner frequencies can then be graphically determined.

8.3 Graphical Construction of Impedances and Transfer Functions 325
Fig. 8.50 Actual
impedance magni-
tude (solid line) for
the parallel resonant
R–L–C example. The
inductor and capacitor
impedances cancel out
at f = f
0, and hence
Z( jω0)= R
1 MHz100 kHz10 kHz1 kHz100 Hz
1
C
R
|| Z ||
f0
L
R0Actual curve40 dB
20 dB
0 dB
60 dB
80 dB
100 
10 
1 
0.1 
1 k
10 k
Q = R /R0
10 
1 
100 m
100 
1 k
10 k
10 m
1 m
100 ! H
1 mH
10 ! H 100 nH 10 nH 1 nH
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
1 ! H
10 mH
100 mH
1 H
10 H
10 ! F
100 ! F1 mF10 mF100 mF1 F
1 ! F
100 nF
10 nF
1 nF
100 pF
20 dB
0 dB
40 dB
60 dB
80 dB
Fig. 8.51 “Reactance paper”: an aid for graphical construction of impedances, with the magnitudes of
various inductive, capacitive, and resistive impedances preplotted
8.3.5 Voltage Divider Transfer Functions: Division of Asymptotes
Usually, we can express transfer functions in terms of impedances—for example, as the ratio
of two impedances. If we can construct these impedances as described in the previous sections,
then we can divide to construct the transfer function. In this section, construction of the transfer
function H(s) of the two-pole R–L–C low-pass ﬁlter (Fig.8.52) is discussed in detail. A ﬁlter of
this form appears in the canonical model for two-pole converters, and the results of this section
are applied in the converter examples of the next section.
The familiar voltage divider formula shows that the transfer function of this circuit can be
expressed as the ratio of impedancesZ2/Zin, where Zin= Z1+Z2 is the network input impedance:
ˆv2(s)
ˆv1(s)= Z2
Z1+ Z2
= Z2
Zin
(8.177)
For this example, Z1(s)= sL, and Z2(s) is the parallel combination of R and 1/sC. Hence, we
can ﬁnd the transfer function asymptotes by constructing the asymptotes of Z2 and of the series

326 8 Converter Transfer Functions
(a)
+
L
C R
+
v2(s)
H(s)
Zout
Z2Z1
{
{
Zinv1(s)
(b)
L C R Zout
Z2Z1
{
{
(c)
L
C R
Z2Z1
{
{
Zin
Fig. 8.52 Two-pole low-pass ﬁlter based on voltage divider circuit: (a) transfer function H(s), (b) deter-
mination of Zout(s) by setting independent sources to zero, (c) determination of Zin(s)
combination represented by Zin, and then dividing. Another approach, which is easier to apply
in this example, is to multiply the numerator and denominator of Eq. (8.177)b y Z1:
ˆv2(s)
ˆv1(s)= Z2Z1
Z1+ Z2
1
Z1
= Zout
Z1
(8.178)
where Zout= Z1∥ Z2 is the output impedance of the voltage divider. So another way to construct
the voltage divider transfer function is to ﬁrst construct the asymptotes for Z1 and for the par-
allel combination represented by Zout, and then divide. This method is useful when the parallel
combination Z1∥Z2 is easier to construct than the series combination Z1+ Z2.I to f t e ng i v e sa
diﬀerent approximate result, which may be more (or sometimes less) accurate than the result
obtained using Zin.
The output impedance Zout in Fig. 8.52bi s
Zout(s)= R
 1
sC
 sL (8.179)
The impedance of the parallel R–L–C network is constructed in Sect. 8.3.3, and is illustrated in
Fig. 8.51a for the high-Q case.
According to Eq. (8.178), the voltage divider transfer function magnitude is∥ H∥=∥ Zout∥/
∥ Z1∥. This quantity is constructed in Fig. 8.53b. Forω<ω0, the asymptote of ∥ Zout∥ co-
incides with ∥Z1∥: both are equal to ωL. Hence, the ratio is ∥ Zout∥/∥ Z1∥ = 1. For ω>
ω0, the asymptote of ∥ Zout∥ is 1/ωC, while ∥ Z1∥ id equal to ωL. The ratio then becomes
∥ Zout∥/∥ Z1∥= 1/ω2LC, and hence the high-frequency asymptote has a−40 dB/decade slope.

8.4 Graphical Construction of Converter Transfer Functions 327
Fig. 8.53 Graphical construction of
H and Zout of the voltage divider cir-
cuit: ( a) output impedance Zout;( b)
transfer function H
(a) 1
C
R
|| Zout ||
f0
R0
|| Z1 || = L
Q = R /R0
(b)
f0
Q = R /R0L
L =1
1/ C
L = 1
2LC
H = Zout
Z1
Fig. 8.54 Eﬀect of increasing L
on the output impedance asymptotes,
corner frequency, and Q-factor
1
C
R
|| Zout ||
f0
R0
Q = R /R0
Increasing
L L
Atω= ω0, ∥ Zout∥ has exact value R, while ∥Z1∥ has exact value R0. The ratio is then
∥ H( jω0)∥=∥ Zout( jω0)∥/∥ Z1( jω0)∥= R/R0 = Q. So the ﬁlter transfer function H has the
sameω0 and Q as the impedance Zout.
It now becomes obvious how variations in element values aﬀect the salient features of the
transfer function and output impedance. For example, the eﬀect of increasing L is illustrated in
Fig. 8.54. This causes the angular resonant frequency ω0 to be reduced, and also reduces the
Q-factor.
8.4 Graphical Construction of Converter Transfer Functions
The small-signal equivalent circuit model of the buck converter, derived in Chap. 7, is repro-
duced in Fig. 8.55. Let us construct the transfer functions and terminal impedances of this con-
verter, using the graphical approach of the previous section.
The output impedance Zout(s) is found with the ˆd(s) and ˆvg(s) sources set to zero; the circuit
of Fig. 8.56a is then obtained. This model coincides with the parallel R–L–C circuit analyzed
in Sects. 8.3.3 and 8.3.4. As illustrated in Fig. 8.56b, the output impedance is dominated by the

328 8 Converter Transfer Functions
+
–
+
–
L
RC
1 : D
vg(t) Id (t)
Vg d(t)
i(t) +
v(t)
–
Zout(s)Zin(s)
ˆ ˆ
ˆˆ
ˆ
Fig. 8.55 Small-signal model of the buck converter, with input impedance Zin(s) and output impedance
Zout(s) explicitly deﬁned
(a) L
RC
Zout(s)
(b) 1
C
R
|| Zout ||
f0
R0
L
Q = R /R0
Fig. 8.56 Construction of buck converter output impedance Zout(s): (a) circuit model; ( b) impedance
asymptotes
inductor at low frequency, and by the capacitor at high frequency. At the resonant frequency f0,
given by
f0= 1
2π
√
LC
(8.180)
the output impedance is equal to the load resistance R.T h eQ-factor of the circuit is equal to
Q= R
R0
(8.181)
where
R0=ω0L= 1
ω0C=
√
L
C (8.182)
Thus, the circuit is lightly damped (high Q) at light load, where the value of R is large.
The converter input impedance Zin(s) is also found with the ˆd(s) and ˆvg(s) sources set to
zero, as illustrated in Fig. 8.57a. The input impedance is referred to the primary side of the 1:D
transformer, and is equal to
Zin(s)= 1
D2
[Z1(s)+ Z2(s)] (8.183)

8.4 Graphical Construction of Converter Transfer Functions 329
(a) L
RC
1 : D
Zin(s)
Z1(s) Z2(s)
{
{
(b) 1
C
R
f0
f1
L
1
2 RC
1
2 LC
R0 = L
C
(c) 1
C
R
f0
|| Z1 ||
f1
|| Z2 ||
L
(d) 1
C
R
|| Zout ||
f0
R0
|| Z1 ||
Q = R /R0
f1
|| Z2 ||
L
(e)
f0
Q = R /R0
f1
1
D2
R0
2
R
1
CD2
L
D2R
D2
R0
D2|| Zin ||
||
Fig. 8.57 Construction of the input impedance Zin(s) for the buck converter: ( a) circuit model; ( b)t h e
individual resistor, inductor, and capacitor impedance magnitudes; (c) construction of the impedance mag-
nitudes∥Z1∥ and∥Z2∥;( d) construction of∥Zout∥;( e) ﬁnal result∥Zin∥
where
Z1(s)= sL (8.184)
and
Z2(s)= R
 1
sC (8.185)
We begin construction of the impedance asymptotes corresponding to Eqs. ( 8.183)t o( 8.185)
by constructing the individual resistor, capacitor, and inductor impedances as in Fig.8.57b. The
impedances in Fig. 8.57 are constructed for the case R> R0. As illustrated in Fig. 8.57c,∥Z1∥
coincides with the inductor reactance ωL. The impedance ∥Z2∥ is asymptotic to resistance R

330 8 Converter Transfer Functions
at low frequencies and to the capacitor reactance 1 /ωC at high frequency. The resistor and
capacitor asymptotes intersect at corner frequency f1, given by
f1= 1
2πRC (8.186)
According to Eq. (8.183), the input impedance Zin(s) is equal to the series combination of Z1(s)
and Z2(s), divided by the square of the turns ratioD. The asymptotes for the series combination
[Z1(s)+ Z2(s)] are found by selecting the larger of the∥Z1∥ and∥Z2∥ asymptotes. The∥Z1∥ and
∥Z2∥ asymptotes intersect at frequency f0, given by Eq. (8.180). It can be seen from Fig. 8.57c
that the series combination is dominated by Z2 for f< f0 and by Z1 for f> f0. Upon scaling
the [Z1(s)+ Z2(s)] asymptotes by the factor 1/D2, the input impedance asymptotes of Fig.8.57e
are obtained.
The zeroes of Zin(s), at frequency f0,h a v et h es a m eQ-factor as the poles of Zout(s)
[Eq. (8.181)]. One way to see that this is true is to note that the output impedance can be ex-
pressed as
Zout(s)= Z1(s)Z2(s)
Z1(s)+ Z2(s)= Z1(s)Z2(s)
D2Zin(s) (8.187)
Hence, we can relate Zout(s)t o Zin(s) as follows:
Zin(s)= 1
D2
Z1(s)Z2(s)
Zout(s) (8.188)
The impedances∥Z1∥,∥Z2∥, and∥ Zout∥ are illustrated in Fig. 8.57d. At the resonant frequency
f= f0, impedance Z1 has magnitude R0 and impedance Z2 has magnitude approximately equal
to R0. The output impedance Zout has magnitude R. Hence, Eq. ( 8.188) predicts that the input
impedance has the magnitude
∥ Zin∥≈1
D2
R0R0
R at f= f0 (8.189)
At f= f0, the asymptotes of the input impedance have magnitude R0/D2. The deviation from
the asymptotes is therefore equal to Q= R/R0, as illustrated in Fig. 8.57e.
The control-to-output transfer functionGvd(s) is found with the ˆvg(s) source set to zero, as in
Fig. 8.58a. This circuit coincides with the voltage divider analyzed in Sect.8.3.5. Hence, Gvd(s)
can be expressed as
Gvd(s)= Vg
Zout(s)
Z1(s) (8.190)
The quantities∥ Zout∥ and∥Z1∥ are constructed in Fig. 8.58b. According to Eq. (8.190), we can
construct∥Gvd(s)∥ by ﬁnding the ratio of∥ Zout∥ and∥Z1∥, and then scaling the result by Vg.F o r
f< f0,∥ Zout∥ and∥Z1∥ are both equal toωL and hence∥ Zout∥/∥Z1∥ is equal to 1. As illustrated
in Fig. 8.58c, the low-frequency asymptote of ∥Gvd(s)∥ has value Vg.F o r f > f0,∥ Zout∥ has
asymptote 1/ωC, and∥Z1∥ is equal toωL. Hence,∥ Zout∥/∥Z1∥ has asymptote 1/ω2LC, and the
high-frequency asymptote of∥Gvd(s)∥ is equal to Vg/ω2LC.T h e Q-factor of the two poles at
f= f0 is again equal to R/R0.

8.4 Graphical Construction of Converter Transfer Functions 331
(a)
+
L
RCVg (t)
+
(t)
(b) 1
C
R
|| Zout ||
f0
R0
Q = R /R0
|| Z1 || = L
(c)
f0
Q = R /R0Vg
L
L = Vg
Vg
1/ C
L = Vg
2LC|| Gvd(s) ||
dˆ vˆ
Fig. 8.58 Construction of the control-to-output transfer functionGvd(s) for the buck converter: (a) circuit
model; (b) relevant impedance asymptotes; (c) transfer function∥Gvd(s)∥
Fig. 8.59 The line-to-output trans-
fer function Gvg(s) for the buck con-
verter: (a) circuit model; ( b) magni-
tude asymptotes
(a)
+
–
L
RC
1 : D
g(t)
+
(t)
–
(b)
f0
Q = R /R0
D
2LC|| Gvg(s) ||
D
vˆ vˆ
The line-to-output transfer function Gvg(s) is found with the ˆd(s) sources set to zero, as
in Fig. 8.59a. This circuit contains the same voltage divider as in Fig. 8.58, and additionally
contains the 1:D transformer. The transfer function Gvg(s) can be expressed as
Gvg(s)= DZout(s)
Z1(s) (8.191)
This expression is similar to Eq. (8.190), except for the scaling factor of D. Therefore, the line-
to-output transfer function of Fig. 8.59b has the same shape as the control-to-output transfer
function Gvd(s).

332 8 Converter Transfer Functions
8.5 Measurement of AC Transfer Functions and Impedances
It is good engineering practice to measure the transfer functions of prototype converters and
converter systems. Such an exercise can verify that the system has been correctly modeled and
designed. Also, it is often useful to characterize individual circuit elements through measure-
ment of their terminal impedances.
Small-signal ac magnitude and phase measurements can be made using an instrument
known as a network analyzer, or frequency response analyzer. The key inputs and outputs of
a basic network analyzer are illustrated in Fig.8.60. The network analyzer provides a sinusoidal
output voltage ˆv
z of controllable amplitude and frequency. This signal can be injected into the
system to be measured, at any desired location. The network analyzer also has two (or more)
inputs, ˆvx and ˆvy. The return electrodes of ˆvz, ˆvy, and ˆvx are internally connected to earth ground.
The network analyzer performs the function of a narrowband tracking voltmeter: it measures the
components of ˆvx and ˆvy at the injection frequency, and displays the magnitude and phase of the
quantity ˆvy/ˆvx. The narrowband tracking voltmeter feature is essential for switching converter
measurements; otherwise, switching ripple and noise corrupt the desired sinusoidal signals and
make accurate measurements impossible [ 80]. Modem network analyzers can automatically
sweep the frequency of the injection source ˆvz to generate magnitude and phase Bode plots of
the transfer function ˆvy/ˆvx.
A typical test setup for measuring the transfer function of an ampliﬁer is illustrated in
Fig. 8.61. A potentiometer, connected between a dc supply voltage VCC and ground, is used
to bias the ampliﬁer input to attain the correct quiescent operating point. The injection source
voltage ˆvz is coupled to the ampliﬁer input terminals via a dc blocking capacitor. This blocking
capacitor prevents the injection voltage source from upsetting the dc bias. The network ana-
lyzer inputs ˆv
x and ˆvy are connected to the input and output terminals of the ampliﬁer. Hence,
the measured transfer function is
Network Analyzer
Injection source Measured inputs
vy
Magnitude
vz
Frequency
vz
Output
vz+
–
Input
vx
Input
+– +–
vy
vx
vy
vx
Data
17.3 dB
– 134.7˚
Data bus
to computer
Fig. 8.60 Key features and functions of a network analyzer: sinusoidal source of controllable amplitude
and frequency, two inputs, and determination of relative magnitude and phase of the input components at
the injection frequency

8.5 Measurement of AC Transfer Functions and Impedances 333
Network Analyzer
Injection source Measured inputs
vy
Magnitude
vz
Frequency
vz
Output
vz+
–
Input
vx
Input
+– +–
vy
vx
vy
vx
Data
–4.7 dB
– 162.8˚
Data bus
to computer
Device
under test
G(s)
Input
Output
VCC
DC
bias
adjust
DC
blocking
capacitor
Fig. 8.61 Measurement of a transfer function
ˆvy(s)
ˆvx(s)= G(s) (8.192)
Note that the blocking capacitance, bias potentiometer, and ˆvz amplitude have no eﬀect on the
measured transfer function
An impedance
Z(s)= ˆv(s)
ˆi(s)
(8.193)
can be measured by treating the impedance as a transfer function from current to voltage. For
example, measurement of the output impedance of an ampliﬁer is illustrated in Fig. 8.62.T h e
quiescent operating condition is again established by a potentiometer which biases the ampliﬁer
input. The injection source ˆv
z is coupled to the ampliﬁer output through a dc blocking capacitor.
The injection source voltage ˆvz excites a current ˆiout in impedance Zs. This current ﬂows into the
output of the ampliﬁer, and excites a voltage across the ampliﬁer output impedance:
Zout(s)= ˆvy(s)
ˆiout(s)
⏐⏐
⏐⏐⏐
⏐
ampliﬁer
ac input = 0
(8.194)

334 8 Converter Transfer Functions
VCC
DC
bias
adjust
Device
under test
G(s)
Input
Output
Zout +
– vz
iout
vy
+–
V oltage
probe
Zs
{
Rsource
DC blocking
capacitor
Current
probe
vx
+–
Fig. 8.62 Measurement of the output impedance of a circuit
A current probe is used to measure ˆiout. The current probe produces a voltage proportional
to ˆiout; this voltage is connected to the network analyzer input ˆ vx. A voltage probe is used to
measure the ampliﬁer output voltage ˆvy. The network analyzer displays the transfer function
ˆvy/ˆvx, which is proportional to Zout. Note that the value of Zs and the amplitude of ˆvz do not
aﬀect the measurement of Zout.
In power applications, it is sometimes necessary to measure impedances that are very small
in magnitude. Grounding problems [ 4] cause the test setup of Fig. 8.62 to fail in such cases.
The reason is illustrated in Fig. 8.63a. Since there turn connections of the injection source ˆ vz
and the analyzer input ˆvy are both connected to earth ground, the injected current ˆiout can return
to the source through the return connections of either the injection source or the voltage probe.
In practice, ˆiout divides between the two paths according to their relative impedances. Hence,
a signiﬁcant current (1 −k)ˆiout ﬂows through the return connection of the voltage probe. If
the voltage probe return connection has some total contact and wiring impedance Zprobe, then
the current induces a voltage drop (1 −k)ˆioutZprobe in the voltage probe wiring, as illustrated
in Fig. 8.63a. Hence, the network analyzer does not correctly measure the voltage drop across
the impedance Z. If the internal ground connections of the network analyzer have negligible
impedance, then the network analyzer will display the following impedance:
Z+ (1−k)Zprobe= Z+ Zprobe
Zrz (8.195)
Here, Zrz is the impedance of the injection source return connection. So to obtain an accurate
measurement, the following condition must be satisﬁed:

Z

≫



⎦
Z
probe

Z
rz
) 

 (8.196)
A typical lower limit on∥ Z∥ is a few tens or hundreds of milliohms.
An improved test setup for measurement of small impedances is illustrated in Fig.8.63b. An
isolation transformer is inserted between the injection source and the dc blocking capacitor. The
return connections of the voltage probe and injection source are no longer in parallel, and the
injected current ˆi
out must now return entirely through the injection source return connection. An

8.5 Measurement of AC Transfer Functions and Impedances 335
(a) Impedance
under test
Z(s) +
– vz
iout
vy
+
–
V oltage
probe
Rsource
vx
+
–
Network Analyzer
Injection source
Measured
inputs
V oltage
probe
return
connection
Injection
source
return
connection
iout
Zrz
{{Zprobe
ki out
(1 –k) iout
+ –(1 –k) iout Zprobe
(b) Impedance
under test
Z(s) +
– vz
iout
vy
+
–
V oltage
probe
Rsource
vx
+
–
Network Analyzer
Injection source
Measured
inputs
V oltage
probe
return
connection
Injection
source
return
connection
Zrz
{{Zprobe
+ –0V
0
iout
1 : n
Fig. 8.63 Measurement of a small impedance Z(s): (a) current ﬂowing in the return connection of the
voltage probe induces a voltage drop that corrupts the measurement; ( b) an improved experiment, incor-
porating isolation of the injection source

336 8 Converter Transfer Functions
added beneﬁt is that the transformer turns ratio n can be increased, to better match the injection
source impedance to the impedance under test. Note that the impedances of the transformer, of
the blocking capacitor, and of the probe and injection source return connections, do not a ﬀect
the measurement. Much smaller impedances can therefore be measured using this improved
approach.
8.6 Summary of Key Points
1. The magnitude Bode diagrams of functions which vary as ( f/ f0)n have slopes equal to
20n dB per decade, and pass through 0 dB at f= f0.
2. It is good practice to express transfer functions in normalized pole-zero form; this form
directly exposes expressions for the salient features of the response, that is, the corner
frequencies, reference gain, etc.
3. The right half-plane zero exhibits the magnitude response of the left half-plane zero, but
the phase response of the pole.
4. Poles and zeroes can be expressed in frequency-inverted form when it is desirable to refer
the gain to a high-frequency asymptote.
5. A two-pole response can be written in the standard normalized form of Eq. ( 8.58). When
Q> 0.5, the poles are complex conjugates. The magnitude response then exhibits peaking
in the vicinity of the corner frequency, with an exact value of Q at f = f0.H i g hQ also
causes the phase to change sharply near the corner frequency.
6. When Q is less than 0.5, the two-pole response can be plotted as two real poles. The low-
Q approximation predicts that the two poles occur at frequencies f0/Q and Qf 0. These
frequencies are within 10% of the exact values for Q≤0.3.
7. When a circuit includes two damping elements, the composite Q-factor can be estimated
as the “parallel combination” (inverse addition) of the Q-factors determined by the two
elements individually. This estimation is within 10% of the exact value when the product
of the individual Q-factors is greater than 5.
8. The low- Q approximation can be extended to ﬁnd approximate roots of an arbitrary-degree
polynomial. Approximate analytical expressions for the salient features can be derived.
Numerical values are used to justify the approximations.
9. Salient features of the transfer functions of the buck, boost, and buck–boost converters are
tabulated in Sect. 8.2.2. The line-to-output transfer functions of these converters contain
two poles. Their control-to-output transfer functions contain two poles, and may addition-
ally contain a right half-plane zero.
10. Approximate magnitude asymptotes of impedances and transfer functions can be easily
derived by graphical construction. This approach is a useful supplement to conventional
analysis, because it yields physical insight into the circuit behavior, and because it exposes
suitable approximations. Several examples, including the impedances of basic series and
parallel resonant circuits and the transfer function H(s) of the voltage divider circuit, are
worked in Sect. 8.3. The input impedance, output impedance, and transfer functions of the
buck converter are constructed in Sect.8.4, and physical origins of the asymptotes, corner
frequencies, and Q-factor are found.
11. Measurement of transfer functions and impedances using a network analyzer is discussed
in Sect. 8.5. Careful attention to ground connections is important when measuring small
impedances.
```
