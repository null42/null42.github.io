---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第17章part 2 - 17 Input Filter Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 698-717 > Chunk ID: `chapter-17-part-2`"
---

# 第17章part 2 - 17 Input Filter Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 698-717  
> Chunk ID: `chapter-17-part-2`

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
17.4 Design of a Damped Input Filter 695
-30 dB
-20 dB
-10 dB
0 dB
10 dB
20 dB
30 dB
0111.0
Original undamped
filter (Qf = )
Undamped
filter (Qf = 0)
Optimal damping
(Qopt = 0.93)
Suboptimal damping
(Qf = 0.2Qopt )
Suboptimal damping
(Qf = 5Qopt )
Zo
R0 f
f
fo
Fig. 17.24 Comparison of output impedance curves for optimal parallel Rf –Lb damping with undamped
and several suboptimal designs. For this example, n= Lb/L= 0.516
For this ﬁlter, let us deﬁne the quantity n as the ratio of the blocking capacitance Cb to the
ﬁlter capacitance C f :
n= Cb
C f
(17.33)
For the optimum design, the peak ﬁlter output impedance occurs at the frequency
fm= ff
√
2
2+ n (17.34)
The value of the peak output impedance for the optimum design is
∥Zo∥mm= R0 f
√2(2+ n)
n (17.35)
The value of damping resistance that leads to optimum damping is described by
Qopt = Rf
R0 f
=
√
(2+ n)(4+ 3n)
2n2(4+ n) (17.36)
The above equations allow choice of the damping values Rf and Cb.
For example, let us redesign the damping network of Sect. 17.3.2, to achieve the same peak
output impedance∥Zo( jω)∥mm = 1Ω, while minimizing the value of the blocking capacitance
Cb. From Sect. 17.3.2, the other parameter values are R0 f = 0.84Ω, C f = 470μF, and Lf =
330μH. First, we solve Eq. (17.35) to ﬁnd the required value of n:

696 17 Input Filter Design
zHk01zHk1zH001
0 dB
20 dB
f
|| Zo ||
10 dB
Undamped
Optimal
damping
Cb = 1200 ∀F
Rf = 0.67 
Suboptimal
damping
Cb = 4700 ∀F
Rf = 1 
Fig. 17.25 Comparison of the output impedances of the design with optimum parallel Rf –Cb damping,
the suboptimal design of Sect. 17.3.2, and the original undamped ﬁlter
n=
R2
0 f
∥Zo∥2mm
⎛⎜⎜⎜⎜⎜
⎜⎝1+
√1+ 4∥Zo∥2mm
R2
0 f
⎞⎟⎟⎟⎟⎟
⎟⎠ (17.37)
Evaluation of this expression with the given numerical values leads to n= 2.5. The blocking
capacitor is therefore required to have a value of nC
f = 1200μF. This is one-quarter of the
value employed in Sect. 17.3.2.T h ev a l u eo fRf is then found by evaluation of Eq. ( 17.36),
leading to
Rf = R0 f
√
(2+ n)(4+ 3n)
2n2(4+ n) = 0.67Ω (17.38)
The output impedance of this ﬁlter design is compared with the output impedances of the orig-
inal undamped ﬁlter of Sect. 17.3.1, and of the suboptimal design of Sect. 17.3.2,i nF i g .17.25.
It can be seen that the optimally damped ﬁlter does indeed achieve the desired peak output
impedance of 1Ω, at the slightly lower peak frequency given by Eq. (17.34)
The Rf –Cb parallel damping approach ﬁnds signiﬁcant application in dc–dc converters.
Since a series resistor is placed in series with Cb, Cb can be realized using capacitor types
having substantial equivalent series resistance, such as electrolytic and tantalum types. How-
ever, in some applications, the Rf –Lb approaches of the next subsections can lead to smaller
designs. Also, the large blocking capacitor value may be undesirable in applications having an
ac input.
17.4.2 Rf –Lb Parallel Damping
Figure 17.23b illustrates the placement of damping resistor Rf in parallel with inductor Lf .I n -
ductor Lb causes the ﬁlter to exhibit a two-pole attenuation characteristic at high frequency. To
allow Rf to damp the ﬁlter, inductor Lb should have an impedance magnitude that is suﬃciently
smaller than Rf at the ﬁlter resonant frequency ff . Optimization of this damping network is
described in [158].

17.4 Design of a Damped Input Filter 697
With this approach, inductor Lb can be physically much smaller than Lf . Since Rf is typi-
cally much greater than the dc resistance of Lf , essentially none of the dc current ﬂows through
Lb. Furthermore, Rf could be realized as the equivalent series resistance of Lb at the ﬁlter reso-
nant frequency ff . Hence, this is a very simple, low-cost approach to damping the input ﬁlter.
The disadvantage of this approach is the fact that the high-frequency attenuation of the
ﬁlter is degraded: the high-frequency asymptote of the ﬁlter transfer function is increased from
1/ω2Lf C f to 1/ω2(Lf||Lb)C f . Furthermore, since the need for damping limits the maximum
value of Lb, signiﬁcant loss of high-frequency attenuation is unavoidable. To compensate, the
value of Lf must be increased. Therefore, a tradeoﬀoccurs between damping and degradation
of high-frequency attenuation, as illustrated in Fig.17.26. For example, limiting the degradation
of high-frequency attenuation to 6 dB leads to an optimum peak ﬁlter output impedance||Zo||mm
of
√
6 times the original characteristic impedance R0 f . Additional damping leads to further
degradation of the high-frequency attenuation.
The optimally damped design (i.e., the choice of Rf that minimizes the peak output
impedance∥Zo∥ for a given choice of Lb) is described by the following equations:
Qopt = Rf
R0 f
=
√
n(3+ 4n)(1+ 2n)
2(1+ 4n) (17.39)
where
n= Lb
Lf
(17.40)
The peak ﬁlter output impedance occurs at frequency
fm= ff
√
1+ 2n
2n (17.41)
Fig. 17.26
Performance attained
via optimal design procedure, par-
allel Rf –Lb circuit of Fig. 17.23b.
Optimum peak ﬁlter output
impedance ∥Zo∥mm and increase
of ﬁlter high-frequency gain, vs.
n= L
b/L 0 dB
10 dB
20 dB
30 dB
0.1 1 10
Degradation of HF
filter attenuation
Lb
L f
Zo mm
R0 f

698 17 Input Filter Design
and has the value 
 Z
o


mm
= R0 f
√
2n(1+ 2n) (17.42)
The attenuation of the ﬁlter high-frequency asymptote is degraded by the factor
Lf
Lf
Lb
= 1+ 1
n (17.43)
So, given an undamped Lf –C f ﬁlter having corner frequency ff , and characteristic impedance
R0 f , and given a requirement for the maximum allowable output impedance ||Zo||mm, one can
solve Eq. ( 17.42) for the required value of n. One can then determine the required numerical
values of Lb and Rf .
17.4.3 Rf –Lb Series Damping
Figure 17.23c illustrates the placement of damping resistor Rf in series with inductor Lf . Induc-
tor Lb provides a dc bypass to avoid signiﬁcant power dissipation in Rf . To allow Rf to damp
the ﬁlter, inductor Lb should have an impedance magnitude that is suﬃciently greater than Rf
at the ﬁlter resonant frequency.
Although this circuit is theoretically equivalent to the parallel damping Rf –Lb case of
Sect. 17.4.2, several diﬀerences are observed in practical designs. Both inductors must carry
the full dc current, and hence both have signiﬁcant size. The ﬁlter high-frequency attenuation
is not aﬀected by the choice of Lb, and the high-frequency asymptote is identical to that of the
original undamped ﬁlter. The tradeoﬀin design of this ﬁlter does not involve high-frequency
attenuation; rather, the issue is damping vs. bypass inductor size.
Design equations similar to those of the previous sections can be derived for this case. The
optimum peak ﬁlter output impedance occurs at frequency
fm= ff
√
2+ n
2(1+ n) (17.44)
and has the value
∥Zo∥mm= R0 f
√2(1+ n)(2+ n)
n (17.45)
The value of damping resistance that leads to optimum damping is described by
Qopt = R0 f
Rf
=
⎦1+ n
n
) √
2(1+ n)(4+ n)
(2+ n)(4+ 3n) (17.46)
For this case, the peak output impedance cannot be reduced below
√
2 R0 f via damping.
Nonetheless, it is possible to further reduce the ﬁlter output impedance by redesign of Lf and
C f , to reduce the value of R0 f .

17.4 Design of a Damped Input Filter 699
17.4.4 Cascading Filter Sections
A cascade connection of multiple L–C ﬁlter sections can achieve a given high-frequency at-
tenuation with less volume and weight than a single-section L–C ﬁlter. The increased cutoﬀ
frequency of the multiple-section ﬁlter allows use of smaller inductance and capacitance values.
Damping of each L–C section is usually required, which implies that damping of each section
should be optimized. Unfortunately, the results of the previous sections are restricted to single-
section ﬁlters. Interactions between cascaded L–C sections can lead to additional resonances
and increased ﬁlter output impedance.
It is nonetheless possible to design cascaded ﬁlter sections such that interaction between L–
C sections is negligible. In the approach described below, the ﬁlter output impedance is approxi-
mately equal to the output impedance of the last section, and resonances caused by interactions
between stages are avoided. Although the resulting ﬁlter may not be “optimal” in any sense,
insight can be gained that allows intelligent design of multiple-section ﬁlters with economical
damping of each section.
+
Existing
filter
Additional
filter
section
ZoZa itestvg
Zi1
+
vtest
Fig. 17.27 Addition of a ﬁlter section at the input of an existing ﬁlter
Consider the addition of a ﬁlter section to the input of an existing ﬁlter, as in Fig. 17.27.
Let us assume that the existing ﬁlter has been correctly designed to meet the output impedance
design criteria of Eq. (17.19): under the conditions Za(s)= 0 and ˆvg(s)= 0,∥Zo∥ is suﬃciently
small. It is desired to add a damped ﬁlter section that does not signiﬁcantly increase∥Zo∥.
Middlebrook’s Extra Element Theorem of Sect. 16.1 can again be invoked, to express how
addition of the ﬁlter section modiﬁes Zo(s):
Zo(s)=
⎦
Zo(s)
⏐⏐
⏐
⏐
Za(s)=0
)
⎦
1+ Za(s)
ZN1(s)
)
⎦
1+ Za(s)
ZD1(s)
) (17.47)
where
ZN1(s)= Zi1(s)
⏐⏐⏐⏐ˆvtest (s)→
null
0
(17.48)
is the impedance at the input port of the existing ﬁlter, with its output port short-circuited. Note
that, in this particular case, nulling ˆvtest (s) is the same as shorting the ﬁlter output port because
the short-circuit current ﬂows through the ˆitest source. The quantity
ZD1(s)= Zi1(s)
⏐⏐⏐⏐ˆitest (s)=0
(17.49)

700 17 Input Filter Design
is the impedance at the input port of the existing ﬁlter, with its output port open-circuited. Hence,
the additional ﬁlter section does not signiﬁcantly alter Zo provided that
∥Za∥≪∥ ZN1∥ and
∥Za∥≪∥ ZD1∥ (17.50)
Bode plots of the quantities ZN1 and ZD1 can be constructed either analytically or by computer
simulation, to obtain limits of Za. When||Za|| satisﬁes Eq. (17.50), then the “correction factor”
(1+ Za/ZN1)/(1+ Za/ZD1) is approximately equal to 1, and the modiﬁed Zo is approximately
equal to the original Zo.
To satisfy the design criteria ( 17.50), it is advantageous to select the resonant frequencies
of Za to diﬀer from the resonant frequencies of ZD1. In other words, we should stagger-tune
the ﬁlter sections. This minimizes the interactions between ﬁlter sections, and can allow use of
smaller reactive element values.
17.4.5 Example: Two Stage Input Filter
As an example, let us consider the design of a two-stage ﬁlter using Rf –Lb parallel damping in
each section as illustrated in Fig. 17.28 [158]. It is desired to achieve the same attenuation as
the single-section ﬁlters designed in Sects. 17.3.2 and 17.4.1, and to ﬁlter the input current of
the same buck converter example of Fig. 17.11. These ﬁlters exhibit an attenuation of 80 dB at
250 kHz, and satisfy the design inequalities of Eq. (17.19) with the∥ZN∥ and∥ZD∥ impedances of
Fig. 17.13. Hence, let us design the ﬁlter of Fig. 17.28 to attain 80 dB of attenuation at 250 kHz.
+vg
L1
n1L1R1
C1
L2
n2L2R2
C2
Section 2 Section 1
Zo
Fig. 17.28 Two-section input ﬁlter example, employing Rf –Lb parallel damping in each section
As described in the previous section and below, it is advantageous to stagger-tune the ﬁl-
ter sections so that interaction between ﬁlter sections is reduced. We will ﬁnd that the cut-
oﬀfrequency of ﬁlter section 1 should be chosen to be smaller than the cuto ﬀfrequency of
section 2. In consequence, the attenuation of section 1 will be greater than that of section
2. Let us (somewhat arbitrarily) design to obtain 45 dB of attenuation from section 1, and

17.4 Design of a Damped Input Filter 701
35 dB of attenuation from section 2 (so that the total is the speciﬁed 80 dB). Let us also se-
lect n1= n2= n= Lb/Lf = 0.5 for each section; as illustrated in Fig.17.26, this choice leads to
a good compromise between damping of the ﬁlter resonance and degradation of high frequency
ﬁlter attenuation. Equation (17.43) and Fig. 17.26 predict that the Rf –Lb damping network will
degrade the high-frequency attenuation by a factor of (1+1/n)= 3, or 9.5 dB. Hence, the section
1 undamped resonant frequency ff 1 should be chosen to yield 45 dB+ 9.5dB= 54.5dB⇒533
of attenuation at 250 kHz. Since section 1 exhibits a two-pole (−40dB/decade) roll-oﬀat high
frequencies, ff 1 should be chosen as follows:
ff 1= (250 kHz)√
533
= 10.8 kHz (17.51)
Note that this frequency is well above the 1.6 kHz resonant frequency f0 of the buck converter
output ﬁlter. Consequently, the output impedance∥Zo∥ can be as large as 3Ω, and still be well
below the∥ZN ( jω)∥ and∥ZD( jω)∥ plots of Fig. 17.13.
Solution of Eq. (17.42) for the required section 1 characteristic impedance that leads to a
peak output impedance of 3Ωwith n= 0.5 leads to
R0 f 1= ∥Zo∥mm
√2n(1+ 2n)
= 3Ω√2(0.5)(1+ 2(0.5))
= 2.12Ω (17.52)
The ﬁlter inductance and capacitance values are therefore
L1= R0 f 1
2π ff 1
= 31.2 μH (17.53)
C1= 1
2π ff 1R0 f 1
= 6.9 μF
The section 1 damping network inductance is
n1L1= 15.6 μH (17.54)
The section 1 damping resistance is found from Eq. (17.39):
R1= Qopt R0 f 1= R0 f 1
√
n(3+ 4n)(1+ 2n)
2(1+ 4n) = 1.9Ω (17.55)
The peak output impedance will occur at the frequency given by Eq. ( 17.41), 15.3 kHz. The
quantities∥ZN1( jω)∥ and∥ZD1( jω)∥ for ﬁlter section 1 can now be constructed analytically or
plotted by computer simulation.∥ZN1( jω)∥ is the section 1 input impedance Zi1 with the output
of section 1 shorted, and is given by the parallel combination of the sL1 and the (R1+ sn1L1)
branches.∥ZD1( jω)∥ is the section 1 input impedance Zi1 with the output of section 1 open-
circuited, and is given by the series combination of ZN1(s) with the capacitor impedance 1/sC1.
Figure 17.29 contains plots of ∥ZN1( jω)∥ and∥ZD1( jω)∥ for ﬁlter section 1, generated using
Spice.

702 17 Input Filter Design
1 kHz 10 kHz 100 kHz 1 MHz
0 dB
20 dB
0
45
90
|| ZN1 ||
|| ZD1 ||
ZN1
|| Za ||
Za
ZD1
Fig. 17.29 Bode plot of ZN1 and ZN2 for ﬁlter section 1. Also shown is the Bode plot for the output
impedance Za of ﬁlter section 2
One way to approach design of ﬁlter section 2 is as follows. To avoid signiﬁcantly mod-
ifying the overall ﬁlter output impedance Zo, the section 2 output impedance ||Za( jω)|| must
be suﬃciently less than ||ZN1( jω)|| and||ZD1( jω)||. It can be seen from Fig. 17.29 that, with
respect to∥ZD1( jω)||,t h i si sm o s td iﬃcult to accomplish when the peak frequencies of sections
1 and 2 coincide. It is most di ﬃcult to satisfy the ||ZN1( jω)|| design criterion when the peak
frequency of sections 2 is lower than the peak frequency of section 1. Therefore, the best choice
is to stagger-tune the ﬁlter sections, with the resonant frequency of section 1 being lower than
the peak frequency of section 2. This implies that section 1 will produce more high-frequency
attenuation than section 2. For this reason, we have chosen to achieve 45 dB of attenuation with
section 1, and 35 dB of attenuation from section 2.
The section 2 undamped resonant frequency f
f 2 should be chosen in the same manner used
in Eq. (17.51) for section 1. We have chosen to select n2 = n= Lb/Lf = 0.5 for section 2; this
again means that the Rf –Lb damping network will degrade the high-frequency attenuation by
a factor of (1 + 1/n)= 3, or 9.5 dB. Hence, the section 2 undamped resonant frequency ff 2
should be chosen to yield 35 dB+ 9.5d B= 44.5d B⇒169 of attenuation at 250 kHz. Since
section 2 exhibits a two-pole (−40 dB/decade) roll-oﬀat high frequencies, ff 2 should be chosen
as follows:
ff 2= (250 kHz)√
169
= 19.25kHz (17.56)
The output impedance of section 2 will peak at the frequency 27.2 kHz, as given by Eq. (17.41).
Hence, the peak frequencies of sections 1 and 2 diﬀer by almost a factor of 2.

17.4 Design of a Damped Input Filter 703
Figure 17.29 shows that, at 27.2 kHz, ∥ZD1( jω)∥ has a magnitude of roughly 3 dBΩ, and
that∥ZN1( jω)∥ is approximately 7 dBΩ. Hence, let us design section 2 to have a peak output
impedance of 0 dBΩ⇒1Ω. Solution of Eq. ( 17.42) for the required section 2 characteristic
impedance leads to
R0 f 2= ∥Za∥mm
√2n(1+ 2n)
= 1Ω√2(0.5)(1+ 2(0.5))
= 0.71Ω (17.57)
The section 2 element values are therefore
L2= R0 f 2
2πff 2
= 5.8 μH
C2= 1
2π ff 2R0 f 2
= 11.7 μF (17.58)
n2L2= 2.9 μH
R2= Qopt R0 f 2= R0 f 2
√
n(3+ 4n)(1+ 2n)
2(1+ 4n) = 0.65Ω
A Bode plot of the resulting Za is overlaid on Fig. 17.29. It can be seen that ∥Za( jω)∥ is less
than, but very close to, ∥ZD1( jω)∥ between the peak frequencies of 15 kHz and 27 kHz. The
impedance inequalities ( 17.50) are satisﬁed somewhat better below 15 kHz, and are satisﬁed
very well at high frequency.
The resulting ﬁlter output impedance∥Zo( jω)∥ is plotted in Fig. 17.30, for section 1 alone
and for the complete cascaded two-section ﬁlter. It can be seen that the peak output impedance
-20 dB
-10 dB
0 dB
10 dB
20 dB
zHk001zHk01zHk1
Section 1
alone
Cascaded
sections 1 and 2
30 dB
|| ZN ||
|| ZD ||
fo
Fig. 17.30 Comparison of the impedance design criteria ∥ZN ( jω)∥ and∥ZD( jω)∥,E q . (17.19), with the
ﬁlter output impedance∥Zo( jω)∥. Solid line:∥Zo( jω)∥ of cascaded design.Dashed line:∥Zo( jω)∥ of section
1 alone

704 17 Input Filter Design
1 kHz 10 kHz 100 kHz 1 MHz
-120 dB
-100 dB
-80 dB
-60 dB
-40 dB
-20 dB
0 dB
20 dB
|| H ||
at 250 kHz
f
Fig. 17.31 Input ﬁlter transfer function, cascaded two-section design
is approximately 10 dBΩ, or roughly 3Ω. The impedance design criteria (17.19) are also shown,
and it can be seen that the ﬁlter meets these design criteria. Note the absence of resonances in
∥Zo( jω)||.
The eﬀect of stage 2 on∥Zo( jω)∥ is very small above 40 kHz (where inequalities (17.50)a r e
very well satisﬁed), and has moderate-to-small eﬀect at lower frequencies. It is interesting that,
above approximately 12 kHz, the addition of stage 2 actually decreases||Zo( jω)||. The reason
for this can be seen from Fig. 16.8: when the phase diﬀerence between∠Za( jω) and∠ZD1( jω)
is not too large (≤90◦), then the 1/(1+ Za/ZD1) term decreases the magnitude of the resulting
∥Zo( jω)∥. As can be seen from the phase plot of Fig. 17.29, this is indeed what happens. So
allowing∥Za( jω)∥ to be similar in magnitude to ∥ZD1( jω)∥ above 12 kHz was an acceptable
design choice.
The resulting ﬁlter transfer function is illustrated in Fig. 17.31. It can be seen that it does
indeed attain the goal of 80 dB attenuation at 250 kHz.
Figure 17.32 compares the single-stage design of Sect.17.4.1 to the two-stage design of this
section. Both designs attain 80 dB attenuation at 250 kHz, and both designs meet the impedance
design criteria of Eq. ( 17.19). However, the single-stage approach requires much larger ﬁlter
elements.
17.5 Stability Criteria
In the previous sections, Middlebrook’s Extra Element Theorem has been employed to gain
insight into how the addition of an input ﬁlter changes the transfer functions of a converter.
Impedance inequalities such as those discussed in Sect. 17.2.3 yield insight into how to shape
the ﬁlter output impedance so that addition of the input ﬁlter does not substantially change the
converter transfer functions G
vd(s), Gvg(s), and Zout(s). Hence we expect that addition of an

17.5 Stability Criteria 705
(a)
+vg
Cb
Rf
Cf
Lf
330 μH
470 μF
1200 μF
0.67 
(b)
+vg
L1
n1L1R1
C1
L2
n2L2R2
C2
6.9 μF
31.2 μH
15.6 μH1.9 0.65 2.9 μH
5.8 μH
11.7 μF
Fig. 17.32 Comparison of single-section (a) and two-section (b) input ﬁlter designs. Both designs meet
the design criteria (17.19), and both exhibit 80 dB of attenuation at 250 kHz
input ﬁlter meeting the impedance inequalities will not change the stability of a well-designed
switching regulator. In this sense, the impedance inequalities can be viewed as design criteria
that may be conservative.
By themselves, the impedance inequalities of Sect. 17.2.3 do not deﬁne the stability bound-
ary of a closed-loop system, because these inequalities do not depend on the actual loop gain
T(s). So far, we have applied the Extra Element Theorem only to the open-loop transfer func-
tions such as Gvd(s). To determine the stability of a closed-loop switching regulator with input
ﬁlter, we need to further investigate how alteration of the transfer functions of the converter
power stage aﬀects the stability and phase margin of the loop gain T(s).
One straightforward approach is to plot the modiﬁed loop gain including the modiﬁedGvd(s)
of Eq. (17.4), and then apply the usual stability tests such as the phase margin test to the result.
The modiﬁed Gvg(s) and Zout(s) can be plotted as well, to check whether these quantities con-
tinue to meet the design goals. This approach is discussed in Sect. 17.5.1.
A second approach is based on comparison of the input ﬁlter source impedance Zo(s) with
the converter closed-loop input impedance Zi(s)[ 151]. This approach expresses the stability
boundary directly in terms of Zo(s). The loading of the input ﬁlter by Zi(s) leads to a voltage
divider term Zi
Zi+ Zo
(17.59)
that can contain RHP poles, and is the origin of the stability problem. Section 17.5.2 contains a
derivation and an example. The approaches of Sects.17.5.1 and 17.5.2 give identical predictions
of the stability boundary.

706 17 Input Filter Design
17.5.1 Modiﬁed Phase Margin
Let us consider again the buck converter example of Sect. 17.3.T h eeﬀect of the addition of
an undamped L–C input ﬁlter on the control-to-output transfer function Gvd(s) is illustrated in
Fig. 17.18, repeated in Fig. 17.33. It can be seen that Gvd is substantially unchanged below the
input ﬁlter resonance at 400 Hz, butGvd contains an additional 360◦of phase lag above 400 Hz.
The undamped input ﬁlter violates the inequalities of Eq. (17.19) in the vicinity of 400 Hz.
f
|| Gvd || Gvd
00 dB
20 dB
30 dB
100 Hz
40 dB
zHk01zHk1
10 dB
|| Gvd ||
Gvd
Fig. 17.33 Eﬀect of undamped input ﬁlter on the control-to-output transfer function Gvd(s)o ft h eb u c k
converter example. Dashed lines: without input ﬁlter. Solid lines: with undamped input ﬁlter
If this converter and input ﬁlter are employed in a closed-loop regulator system having a
loop crossover frequency fc well below the input ﬁlter resonance at 400 Hz, then the phase
margin of the loop gain T(s) will be essentially unchanged by the input ﬁlter and the loop
will be stable. Violation of the impedance inequalities is irrelevant because the violation occurs
outside the bandwidth of the loop. Conversely, if the loop crossover frequency fc is near to or
greater than 400 Hz, then addition of the undamped input ﬁlter will decrease the phase margin
of the loop gain T(s) by as much as−360◦, which would lead to a negative phase margin and
instability.
Hence, one approach to determination of the stability boundary is to employ the modiﬁed
Gvd(s) to plot the modiﬁed loop gain and ﬁnd its phase margin. As an example, let us consider
the closed-loop buck regulator with PID compensator designed in Sect. 9.5.4. Figure 17.34
illustrates this closed-loop system, with an added single-section input ﬁlter andRf –Cb damping
network.
Figure 17.35 contains a plot of the magnitude of the input ﬁlter source (output) impedance
Zo, along with the impedances ZN , ZD, and Ze from Table 17.1, using the numerical values
speciﬁed in Fig. 17.34. It can be observed that∥Zo∥ is indeed less than∥ZN∥,∥ZD∥, and∥Ze∥ at

17.5 Stability Criteria 707
+
50 ! H
500 ! F28 V
L
C R
1 Ω
+
+
C2
11 kΩ
vref
5 V
R1
R2
R3 C3
R4
85 kΩ
1.1 nF
2.7 nF
47 kΩ
120 kΩ
VM = 4 V
PWM
d
Lf
Cf
Cb
Rf
31 ! H
47 ! F
29 ! F
1.7 Ω
T
Fig. 17.34 Closed-loop buck regulator with PID compensator, Sect. 9.5.4, with a damped input ﬁlter
101 102 103 104
Frequency, Hz
-40
-30
-20
-10
0
10
20
30
40
Magnitude, dB
Zo
ZN
ZD
Ze
Fig. 17.35 Impedance inequalities for the regulator of Fig. 17.34
all frequencies, although the impedances are close in magnitude in the vicinity of the resonances
of the input ﬁlter (approximately 4 kHz) and the converter output ﬁlter (1 kHz).
The original and modiﬁed loop gains are plotted in Fig.17.36. It can be observed that the ef-
fect of the input ﬁlter on the loop gain is moderate, and the loop continues to be stable. Nonethe-
less, changes are observed at frequencies where∥Z
o∥ approaches∥ZN∥ or∥ZD∥. At or above the 1

708 17 Input Filter Design
101 102 103 104
Frequency, Hz
-40
-20
0
20
40
60
Magnitude, dB
Modified T
Original T
101 102 103 104
Frequency, Hz
-270
-225
-180
-135
-90
-45
0
Phase, degrees
Modified T
Original T
Fig. 17.36 Modiﬁcation of the loop gain magnitude and phase by the input ﬁlter, for the buck regulator
of Fig. 17.34
kHz resonant frequency of the buck output ﬁlter, the magnitude and phase of the loop gainT(s)
are somewhat reduced. Resonant (LHP) zeroes are introduced into T(s) at the approximately 4
kHz resonance of the input ﬁlter, which cause the loop to exhibit three crossover frequencies.
The loop also contains a pair of damped poles near 4 kHz. The phase margin is reduced, but is
still positive, and the loop continues to be stable.
Again, it should be noted that∥Zo∥<∥ZN∥ is not the stability condition, but rather stability
is deduced from the loop gain plot.
Figure 17.37 illustrates modiﬁcation of the input ﬁlter damping network, such that the peak
∥Zo∥ is increased. The impedance magnitudes for this case are plotted in Fig. 17.38. It can be
seen that the input ﬁlter∥Zo∥ now signiﬁcantly exceeds∥ZN∥ and∥ZD∥ at the input ﬁlter resonant

17.5 Stability Criteria 709
+
50 ! H
500 ! F28 V
L
C R
1 Ω
+
+
C2
11 kΩ
vref
5 V
R1
R2
R3 C3
R4
85 kΩ
1.1 nF
2.7 nF
47 kΩ
120 kΩ
VM = 4 V
PWM
d
Lf
Cf
Cb
Rf
31 ! H
47 ! F
8 ! F
5.2 Ω
T
Fig. 17.37 Modiﬁcation of the input ﬁlter of Fig. 17.34 to reduce its damping
101 102 103 104
Frequency, Hz
-40
-30
-20
-10
0
10
20
30
40
Magnitude, dB
Zo
ZN
ZD
Ze
Fig. 17.38 Impedance inequalities for the regulator of Fig. 17.37
frequency of 4 kHz. The resulting loop gain magnitude and phase is plotted in Fig. 17.39.T h e
correction factor in Eq. ( 17.4) introduces resonant RHP zeroes and resonant poles into T(s),
at the input ﬁlter resonant frequency. This adds an additional 360◦of phase lag at frequencies
above 4 kHz. At the loop crossover frequency of 7 kHz, the phase margin is negative. Hence,
the converter feedback loop is unstable.

710 17 Input Filter Design
101 102 103 104
Frequency, Hz
–40
–20
0
20
40
60
Magnitude, dB
Modified T
Original T
101 102 103 104
Frequency, Hz
–540
–495
–450
–405
–360
–315
–270
–225
–180
–135
–90
–45
0
Phase, degrees
Modified T
Original T
Fig. 17.39 Modiﬁcation of the loop gain magnitude and phase by the input ﬁlter, for the buck regulator
of Fig. 17.37
In summary, the impedance inequalities of Sect. 17.2.3 provide conditions that guarantee
that the loop gain and other important quantities are unchanged by addition of an input ﬁlter. The
actual stability boundary is determined by plotting the modiﬁed loop gain, and then applying the
usual stability tests such as the phase margin test. In the examples of this section, the correction
factor (Eq. (17.18)) leads to decrease of the magnitude and phase of the loop gain in the vicinity
of the crossover frequency. In the example in which damping of the input ﬁlter was inadequate,
this led to a negative phase margin and instability.

17.5 Stability Criteria 711
17.5.2 Closed-Loop Input Impedance
Another useful approach for determination of the exact stability boundary is based on the load-
ing of the input ﬁlter by the closed-loop converter input impedance Zi(s). This loading leads to
a voltage divider term
Zi(s)
Zi(s)+ Zo(s)= 1
1+ Zo(s)
Zi(s)
(17.60)
that introduces new poles into the closed-loop transfer functions of the system [ 151]. It is pos-
sible that these new poles lie in the right half-plane, and this can be viewed as the mechanism
by which addition of an input ﬁlter destabilizes the regulator. In this section, the Extra Ele-
ment Theorem is employed to derive how the input ﬁlter adds the additional term ( 17.60)t oa
closed-loop transfer function of the system; the closed-loop audiosusceptibility ˆv/ˆvg is used as
an example but all closed-loop transfer functions of the network contain the same poles. Second,
the Feedback Theorem is employed to ﬁnd an expression for the closed-loop input impedance
Z
i(s). Finally, the stability of Eq. (17.60) is examined by treatingTm(s)= Zo(s)/Zi(s) as a minor
loop gain whose stability can be determined using conventional techniques such as the Nyquist
stability theorem and the phase margin test.
Eﬀect of input ﬁlter on closed-loop transfer functions
Figure 17.40 illustrates the small-signal model of a system composed of a CCM switching
converter, its feedback system, and an input ﬁlter. A Thevenin-equivalent circuit models the
output port of the input ﬁlter, having output impedanceZ
o. The transfer function of the unloaded
input ﬁlter isHi(s), and the voltage applied to the input port of the input ﬁlter isvg. The converter
power stage is modeled using the canonical model of Sect. 7.4. The compensator and PWM
transfer functions are combined into gain block A(s).
Fig. 17.40 Small-signal model of a closed-loop converter system with input ﬁlter

712 17 Input Filter Design
In the case of no input ﬁlter, Zo(s)= 0 and Hi(s)= 1. Under these conditions, the “original”
closed-loop transfer functions can be found using the Feedback Theorem, in a manner similar
to that employed in Sect. 13.4. The “original” loop gain is found to be
T(s)= A(s)e(s)MHe(s)H(s) (17.61)
The “original” audiosusceptibility is
Gvg(s)= MHe(s)
1+ T(s) (17.62)
This coincides with the result of Eq. ( 13.103). In the presence of the input ﬁlter, the Extra
Element Theorem predicts that the audiosusceptibility becomes
G′
vg(s)= Hi(s)Gvg(s)
1+ Zo
ZNg
1+ Zo
ZDg
(17.63)
Figure 17.41 illustrates use of the Extra Element Theorem to ﬁnd the modiﬁed audiosuscepti-
bility G′
vg(s). The Thevenin impedance Zo(s) is treated as the extra element, and current ˆit is
injected at the Zo port.
The impedance ZNg is the impedance seen at the injection port, when ˆit and ˆvin are adjusted
such that the output voltage ˆv is nulled. The reference variation ˆvre f is also set to zero:
ZNg = ˆvt
ˆit
⏐⏐⏐
⏐⏐⏐
ˆv→
null
0
ˆvre f=0
(17.64)
Fig. 17.41 Use of the Extra Element Theorem to ﬁnd the modiﬁed G′
vg(s)

17.5 Stability Criteria 713
When ˆv is nulled, with ˆvre f set to zero, the duty-cycle variation ˆd also becomes zero. Hence, the
e(s) ˆd and j(s) ˆd sources are zero. Additionally, the null condition of ˆv causes zero-current varia-
tion in the load and in the C and Le elements, so that there is no voltage across the transformer
windings and no current through the transformer windings. Hence the null condition implies
that ˆit= 0 and ˆvt=−Hi ˆvin. Therefore ZNg is
ZNg =−Hi ˆvin
0 =∞ (17.65)
ZNg is an open circuit, and the numerator term of the correction factor (17.63) equals (1+0)= 1.
The impedance ZDg is the impedance seen at the injection port, when ˆvin and ˆvre f are set to
zero:
ZDg= ˆvt
ˆit
⏐⏐
⏐⏐⏐
⏐
ˆvin=0
ˆvre f=0
(17.66)
The quantity ZDg is seen to be the closed-loop input impedance Zi of the regulator. Hence, the
closed-loop audiosusceptibility in Eq. (17.63)i s
G′
vg(s)= Hi(s)Gvg(s) 1⎦
1+ Zo
Zi
) (17.67)
A similar analysis can show that the modiﬁed closed-loop output impedance contains the same
correction factor denominator term [151].
How can addition of an input ﬁlter to a stable closed-loop regulator lead to instability, i.e.,
closed-loop transfer function poles in the right half of the complex plane? In Eq. ( 17.67), the
quantity Gvg(s) is the closed-loop audiosusceptibility of the original regulator; we assume that
the original regulator was correctly designed so that Gvg(s) is stable and contains no right half-
plane poles. The quantityHi is the unloaded transfer function of the ﬁlter, which we also assume
contains no right half-plane poles since the ﬁlter is a passive network. Hence the only term that
can lead to instability is the denominator correction factor term
1⎦
1+ Zo
Zi
)= 1
(1+ Tm) (17.68)
The term in Eq. ( 17.68) is the origin of potential instability caused by addition of the input
ﬁlter. The denominator correction factor term assumes the same mathematical form as a closed-
loop transfer function, eﬀectively with “minor loop gain” Tm = Zo/Zi, and it is possible for the
(1+Tm) term to contain right half-plane roots. Hence the usual stability tests such as the Nyquist
stability criterion or phase margin tests can be applied to Tm.
Finding the closed-loop input admittance Yi = 1/ZDg
We can apply the Feedback Theorem of Chap. 13 as illustrated in Fig. 17.42. A test source ˆvt is
injected at the power input port of the small-signal model, and the converter input current ˆit is
measured. The input admittance is the transfer function from ˆvt to ˆit:
Yi=
ˆit
ˆvt
(17.69)

714 17 Input Filter Design
Fig. 17.42 Use of the Feedback Theorem to ﬁnd the closed-loop input admittance Yi = 1/ZDg
To determine the closed-loopYi, source ˆvz is injected after the summing node, and the Feedback
Theorem is applied to express Yi as
Yi= Yi∞
T
1+ T+ Yi0
1
1+ T (17.70)
The gain Yi∞is given by
Yi∞(s)=
ˆit(s)
ˆvt(s)
⏐⏐⏐
⏐⏐⏐
ˆvre f=0
ˆvy→
null
0
(17.71)
The loop reference variation ˆvre f is set to zero. In the presence of the test source ˆvt, the signal ˆvz
is adjusted to null ˆvy. Figure 17.43 illustrates solution of the model under these conditions.
With the reference ˆvre f set to zero, the nulling of ˆvy implies that the output voltage ˆv is also
nulled. Hence the current through the load resistanceR is nulled. Hence the currents in the eﬀec-
tive ﬁlter elements are nulled, and there must be zero voltage across the transformer secondary.
This implies that there is zero voltage across the transformer primary, and zero current through
the e(s) ˆd source. So under the null conditions, the test voltage must be ˆvt=−e(s) ˆd, and the test
current must be ˆit= j(s) ˆd. This leads to the result
Yi∞= j(s) ˆd
−e(s) ˆd
=−j(s)
e(s) (17.72)
For the buck converter, this expression reduces to
Yi∞=−M2
R (17.73)
```
