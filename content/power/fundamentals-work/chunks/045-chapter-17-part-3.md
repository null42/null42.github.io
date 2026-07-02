---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第17章part 3 - 17 Input Filter Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 718-726 > Chunk ID: `chapter-17-part-3`"
---

# 第17章part 3 - 17 Input Filter Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 718-726  
> Chunk ID: `chapter-17-part-3`

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
17.5 Stability Criteria 715
Fig. 17.43 Determination of Yi∞
At frequencies where the loop gainT is large in magnitude, the converter closed-loop incremen-
tal input admittanceYi is negative. The quantity 1/Yi∞coincides with theZN listed in Table17.1;
when the loop gain is large then the converter closed-loop input impedance follows ZN .
The gain Yi0 is given by
Yi0(s)=
ˆit(s)
ˆvt(s)
⏐⏐⏐⏐
⏐⏐
ˆvre f=0
ˆvx→
null
0
(17.74)
The loop reference variation ˆvre f is set to zero. In the presence of the test source ˆvt, the signal
ˆvz is adjusted such that ˆvx is nulled. Figure 17.44 illustrates solution of the model under these
conditions.
With ˆvx equal to zero, the duty-cycle variation ˆd is zero. Hence the canonical model sources
e(s) ˆd and j(s) ˆd become zero. The converter input admittanceYi0 is then the eﬀective ﬁlter input
admittance 1/Zei(s), reﬂected through the transformer turns ratio M2:
Yi0(s)= M2
Zei(s) (17.75)
At frequencies where the loop gain T is small in magnitude, then the converter closed-loop
incremental input admittance Yi follows the open-loop value M2/Zei. This quantity is a passive
admittance, having phase in the range−90◦≤∠Yi ≤+90◦. The quantity 1/Yi0 coincides with
the ZD listed in Table 17.1; when the loop gain is small then the converter closed-loop input
impedance follows ZD.
The loop gain T(s)o fE q .(17.70) is given by
T(s)= ˆvy(s)
ˆvx(s)
⏐⏐⏐⏐
⏐
ˆvre f=0
ˆvt=0
(17.76)
This is the loop gain of the original closed-loop regulator, before addition of the input ﬁlter.

716 17 Input Filter Design
Fig. 17.44 Determination of Yi0
Construction of Zi
Construction of the closed-loop input impedance Zi = 1/Yi based on the results of
Eqs. (17.70), (17.73), and (17.75). Graphical construction of Zi is illustrated in Fig. 17.45 for a
simple buck converter example. Figure 17.45a contains magnitude asymptotes of T, T/(1+ T),
and 1/(1+ T), constructed as described in Sect. 9.3. The loop gain for this simple example in-
cludes the resonant poles of the converterL–C ﬁlter at frequency fo, plus a high-frequency zero.
The loop crossover frequency is fc, and the phase margin ofT leads to peaking with closed-loop
Q-factor Qc as described in Sect. 9.4.3.
Figure 17.45b illustrates construction of the admittance terms of Eq. ( 17.70). The ZN and
ZD terms of Table 17.1 are inverted to obtain their admittances, and then are multiplied by the
T/(1+ T) and 1/(1+ T) plots of Fig.17.45a. Figure 17.45c contains plots of the magnitude and
phase of the converter closed-loop input impedance Zi, derived from Fig. 17.45b according to
Eq. (17.70).
At frequencies well below the original loop crossover frequency fc where the loop gain T
is large in magnitude, then T/(1+ T)≈1 and 1/(1+ T) is small. Hence, Yi≈Yi∞and Zi≈ZN .
As illustrated in Fig. 17.45c, Zi follows−R/M2 and has phase−180◦at low frequency.
At frequencies well above fc where∥T∥≪ 1, then∥T/(1+ T)∥≪ 1 and∥1/(1+ T)∥≈1.
Hence Yi≈Yi0 and the closed-loop input impedanceZi follows ZD. For the example asymptotes
of Fig. 17.45, Zi follows the inductor asymptote sL/ M2 at high frequency, with a phase of+90◦.
In the vicinity of the original loop crossover frequency fc, the impedance Zi transitions
between ZN and ZD. In general, the ZN and ZD asymptotes can diﬀer at the loop crossover
frequency, and hence this transition will contain new asymptotes that are not present in ZN and
ZD alone. Depending on the phase margin of the original loop gainT,t h eT/(1+T) and 1/(1+T)
t e r m so fE q .(17.70) may contain resonant poles and peaking in the vicinity of fc. This leads to

17.5 Stability Criteria 717
Fig. 17.45 Steps in the construction of the asymptotes of the closed-loop converter input impedance
Zi(s): (a) converter loop gain T and the closed-loop quantities T/(1+ T)a n d1/(1+ T); (b) the admittance
terms of Eq. (17.70); (c) the resulting magnitude and phase asymptotes of Zi(s)

718 17 Input Filter Design
resonant zeroes in Zi = 1/Yi; therefore it is possible that∥Zi∥ is smaller than∥ZN∥ and∥ZD∥ in
the vicinity of fc. Additionally, Zi contains a RHP pole at frequency fnd; at frequencies greater
than fnd, the negative sign ofZN is cancelled by the negative sign of the RHP pole, andZi reverts
to a passive open-loop impedance. It should be noted that the RHP pole of Zi does not directly
lead to instability: when the converter is driven by a voltage source vg, the current is given by
the transfer function ig = vg/Zi. This transfer function contains a RHP zero at fnd, and exhibits
no RHP poles.
Determination of stability
Next, we can construct the minor loop gain Tm = Zo/Zi of Eq. (17.68). In Fig. 17.46, an input
ﬁlter impedance Zo is overlayed on the Zi impedance of Fig. 17.45c. As illustrated in Fig.17.46,
the magnitude of Tm can be found by subtracting the magnitude∥Zi∥dB from∥Zo∥dB.A tt h ef r e -
quency or frequencies where∥Zi∥=∥Zo∥, the minor loop gainTm exhibits a crossover frequency.
The phase of Tm at a given frequency also can be found by subtracting:∠Tm=∠Zo−∠Zi.
The Bode plot of the minor loop gain Tm is constructed in Fig. 17.47, based on the
impedance asymptotes of Fig.17.46. To conform with the conventional appearance of loop gain
phase, the phase asymptotes of Tm have been shifted by−360◦; this corresponds to multiplying
Tm by e−j360◦
= 1, and does not change the result. For the speciﬁc case sketched in Fig. 17.46,
the input ﬁlter impedance∥Zo∥ is greater than the converter closed-loop input impedance ∥Zi∥
over the frequency range from fmc1 to fmc2. As illustrated in Fig. 17.47, the minor loop gain
Tm exhibits crossover frequencies at fmc1 and fmc2, and reaches a peak magnitude of Rf M2/R
at the ﬁlter resonant frequency ff . The phase of Tm at frequency fmc1 is approximately−90◦,
corresponding to a phase margin of+90◦. The phase of Tm is approximately−270◦at fmc2, cor-
Fig. 17.46 Superimposing the input ﬁlter impedance asymptotes Zo on the converter closed-loop input
impedance asymptotes Zi to determine the minor loop gain Tm

17.5 Stability Criteria 719
Fig. 17.47 Bode plot of minor loop gain Tm for the example of Fig. 17.46
Re[Tm(jω )]
Im[Tm(jω )]
+1f = 0
f = fmc1
f = fmc2
f = ff
f →∞
– R f
R/M2
Fig. 17.48 Nyquist plot of minor loop gain Tm for the example of Fig. 17.46. Crosshatching denotes the
region to the right of the contour; the−1 point is enclosed
responding to a phase margin of−90◦. The minor loop gain Tm contains resonant poles at the
original loop crossover frequency fc and a right half-plane zero at frequency fnd.
With multiple crossover frequencies, determination of stability should be resolved by use
of the Nyquist plot. The positive-frequency portion of the Nyquist plot of the minor loop gain
Tm(s) is illustrated in Fig. 17.48. The minor loop gain has magnitude zero at dc. As frequency
increases, Tm increases in magnitude with approximate phase−90◦, until it reaches unity mag-
nitude at f = fmc1. In the vicinity of f = ff , Tm has magnitude greater than 1, with phase
decreasing from−90◦towards−270◦. At frequencies greater than fmc2, Tm exhibits magnitude
less than 1. It can be seen that the−1 point is encircled once by the positive-frequency portion

720 17 Input Filter Design
of the Nyquist plot sketched in Fig. 17.48. The negative-frequency portion of the Nyquist plot,
which is the complex conjugate (not shown in Fig. 17.48), also encircles the −1 point once.
Consequently, the closed-loop term
1
1+ Tm
= Zi
Zo+ Zi
(17.77)
contains two right half-plane poles, and is unstable. The regulator closed-loop transfer functions
such as Eq. (17.67) will also exhibit these two right half-plane poles.
It can be observed from Fig.17.48 that the encirclements of the−1 point could be eliminated
by reducing the magnitude of the quantity Rf/(R/M2) to be less than unity. Then the Nyquist
plot no longer would encircle the −1 point, and the minor loop Tm would no longer introduce
RHP poles. This coincides with the earlier conclusion that adequate damping of the input ﬁlter
can stabilize the system.
17.5.3 Discussion
Section 17.5 describes two distinct approaches to derivation of the exact stability boundary of a
switching regulator with addition of an input ﬁlter. In Sect. 17.5.1, the Extra Element Theorem
is employed to determine the modiﬁed loop gain T′(s). The usual gain and phase margin tests
can then be employed to ascertain the stability of the modiﬁed regulator system. By contrast,
the approach of Sect. 17.5.2 employs the Feedback Theorem to ﬁnd the new closed-loop poles
induced by addition of the input ﬁlter. These poles are ascribed to a voltage divider term that
accounts for the loading of the input ﬁlter impedance Z
o(s) by the closed-loop converter input
impedance Zi(s). This voltage divider term can be viewed as having an eﬀective minor loop gain
Tm(s)= Zo(s)/Zi(s), whose stability can be ascertained using the usual techniques including
phase and gain margins and the Nyquist stability tests.
Thus, we have two distinct approaches to determination of the stability boundary of the reg-
ulator when modiﬁed by addition of an input ﬁlter. It can be veriﬁed that identical closed-loop
poles and characteristic equations are predicted by the two approaches. Hence, provided that the
original unmodiﬁed system is stable, the two approaches predict identical stability boundaries.
Finally, it should be emphasized that Sects. 17.1 to 17.4 are concerned with design of an
input ﬁlter that does not disrupt the important transfer functions of the closed-loop regulator,
while Sect. 17.5 is concerned with determination of the formal stability boundary. While these
are very diﬀerent goals, it is revealing that all approaches rely on the impedances ZN and ZD
of Table 17.1,a l b e i ti nd iﬀerent ways. Ultimately, the impedance inequalities of Eq. (17.19)a r e
the governing design criteria, with the issue only being how conservative should the design be.
The engineer can employ modern tools to plot the relevant equations of all sections and produce
an informed and optimized design.
17.6 Summary of Key Points
1. Switching converters usually require input ﬁlters, to reduce conducted electromagnetic in-
terference and possibly also to meet requirements concerning conducted susceptibility.
2. Addition of an input ﬁlter to a converter alters the control-to-output and other transfer func-
tions of the converter. Design of the converter control system must account for the eﬀects
of the input ﬁlter.

17.6 Summary of Key Points 721
3. If the input ﬁlter is not damped, then it typically introduces complex poles and RHP zeroes
into the converter control-to-output transfer function, at the resonant frequencies of the
input ﬁlter. If these resonant frequencies are lower than the crossover frequency of the
controller loop gain, then the phase margin will become negative and the regulator will be
unstable.
4. The input ﬁlter can be designed so that it does not signiﬁcantly change the converter control-
to-output and other transfer functions. Impedance inequalities ( 17.19) give simple design
criteria that guarantee this. To meet these design criteria, the resonances of the input ﬁlter
must be suﬃciently damped.
5. Optimization of the damping networks of single-section ﬁlters can yield signiﬁcant savings
in ﬁlter element size. Equations for optimizing three diﬀerent ﬁlter sections are listed.
6. Substantial savings in ﬁlter element size can be realized via cascading ﬁlter sections. The
design of noninteracting cascaded ﬁlter sections can be achieved by an approach similar to
the original input ﬁlter design method. Impedance inequalities ( 17.50) give design criteria
that guarantee that interactions are not substantial.
7. Another useful approach for determination of the exact stability boundary is based on the
loading of the input ﬁlter, whose output impedance is Z
o(s), by the closed-loop converter
input impedance Zi(s). The stability is examined by treating Tm(s)= Zo(s)/Zi(s) as a minor
loop gain using conventional techniques such as the Nyquist stability theorem and the phase
margin test.
Problems
17.1 It is required to design an input ﬁlter for the ﬂyback converter of Fig. 17.49. The max-
imum allowed amplitude of switching harmonics of iin(t)i s1 0 μA rms. Calculate the
required attenuation of the ﬁlter at the switching frequency.
+
Lp
+
vVg
Q1
D11:n
C RInput
filter
ig(t) n = 0.5
250 μH 100 μF
48 V
5 
iin(t)
D = 0.3
fs = 200 kHz
Fig. 17.49 Flyback converter, Problems 17.1, 17.4, 17.6, 17.8,a n d17.10
17.2 In the boost converter of Fig.17.50, the input ﬁlter is designed so that the maximum am-
plitude of switching harmonics of iin(t) is not greater than 10 μA rms. Find the required
attenuation of the ﬁlter at the switching frequency.

722 17 Input Filter Design
+
+
v
vg
L
C R
100 μH
33 ! F 12 48 V
Input
filter
iin(t) ig(t)
D = 0.6
fs = 200 kHz
Fig. 17.50 Boost converter, Problems 17.2, 17.5, 17.7,a n d17.9
17.3 Derive the expressions for ZN and ZD in Table17.1.
17.4 The input ﬁlter for the ﬂyback converter of Fig. 17.49 is designed using a single Lf –C f
section. The ﬁlter is damped using a resistor Rf in series with a very large blocking
capacitor Cb.
(a) Sketch a small-signal model of the ﬂyback converter. Derive expressions for ZN (s)
and ZD(s) using your model. Sketch the magnitude Bode plots of ZN and ZD, and
label all salient features.
(b) Design the input ﬁlter, i.e., select the values of Lf, C f , and Rf ,s ot h a t :(i) the ﬁlter
attenuation at the switching frequency is at least 100 dB, and ( ii) the magnitude of
the ﬁlter output impedance Zo(s) satisﬁes the conditions|| Zo( jω)||< 0.3|| ZD( jω)||
and|| Zo( jω)||< 0.3|| ZN ( jω)||, for all frequencies.
(c) Use Spice simulations to verify that the ﬁlter designed in part (b) meets the speciﬁ-
cations.
(d) Using Spice simulations, plot the converter control-to-output magnitude and phase
responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment
on the changes introduced by the ﬁlter.
17.5 It is required to design the input ﬁlter for the boost converter of Fig. 17.50 using a sin-
gle Lf –C f section. The ﬁlter is damped using a resistor Rf in series with a very large
blocking capacitor Cb.
(a) Sketch the magnitude Bode plots of ZN (s) and ZD(s) for the boost converter, and
label all salient features.
(b) Design the input ﬁlter, i.e., select the values of Lf, C f , and Rf ,s ot h a t :(i)t h e
ﬁlter attenuation at the switching frequency is at least 80 dB, and ( ii) the mag-
nitude of the ﬁlter output impedance Zo(s) satisﬁes the conditions || Zo( jω)|| <
0.2|| ZD( jω)||,|| Zo(ω)||< 0.2|| ZN (ω)||, for all frequencies.
(c) Use Spice simulations to verify that the ﬁlter designed in part (b) meets the speciﬁ-
cations.
(d) Using Spice simulations, plot the converter control-to-output magnitude and phase
responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment
on the changes in the control-to-output responses introduced by the ﬁlter.
17.6 Repeat the ﬁlter design of Problem 17.4 using the optimum ﬁlter damping approach de-
scribed in Sect. 17.4.1. Find the values of Lf, C f, Rf , and Cb.

17.6 Summary of Key Points 723
17.7 Repeat the ﬁlter design of Problem 17.5 using the optimum ﬁlter damping approach of
Sect. 17.4.1. Find the values of Lf, C f, Rf , and Cb.
17.8 Repeat the ﬁlter design of Problem 17.4 using the optimum Rf –Lb parallel damping ap-
proach described in Sect. 17.4.2. Find the values of Lf, C f, Rf , and Lb.
17.9 Repeat the ﬁlter design of Problem 17.5 using the optimum Rf –Lb parallel damping ap-
proach described in Sect. 17.4.2. Find the values of Lf, C f, Rf , and Lb.
17.10 It is required to design the input ﬁlter for the ﬂyback converter of Fig. 17.32 using two
ﬁlter sections. Each ﬁlter section is damped using a resistor in series with a blocking
capacitor.
(a) Design the input ﬁlter, i.e., select values of all circuit parameters, so that (i) the ﬁlter
attenuation at the switching frequency is at least 100 dB, and ( ii) the magnitude of
the ﬁlter output impedance Zo(s) satisﬁes the conditions|| Zo( jω)∥< 0.3|| ZD( jω)||
and|| Zo( jω)||< 0.3|| ZN (ω)||, for all frequencies.
(b) Use Spice simulations to verify that the ﬁlter designed in part (a) meets the speciﬁ-
cations.
(c) Using Spice simulations, plot the converter control-to-output magnitude and phase
responses without the input ﬁlter, and with the ﬁlter designed in part (b). Comment
on the changes introduced by the ﬁlter.
17.11 Consider the boost voltage regulator of Problem9.3. It is required to design an input ﬁlter
for this voltage regulator. The ﬁlter should have a single Lf –C f section with optimum
damping using a resistor Rf in series with a capacitor Cb.
(a) Design the input ﬁlter, i.e., select values of all circuit parameters, so that ( i)t h e
ﬁlter attenuation at the switching frequency fs = 200 kHz is equal to at least 80 dB,
and (ii) the magnitude of the ﬁlter output impedance Zo(s) satisﬁes the conditions
|| Zo( jω)∥≤0.4|| ZD( jω)|| and|| Zo( jω)||≤0.4|| ZN (ω)||, for all frequencies.
(b) Determine the closed-loop input impedance Zi(s) of the regulator in Problem 9.3.
Examine stability of the closed-loop system by analysis of the minor loop gain
Tm(s)= Zo(s)/Zi(s), where Zo(s) is the output impedance of the input ﬁlter designed
in part (a).
```
