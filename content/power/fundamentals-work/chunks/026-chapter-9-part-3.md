---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第9章part 3 - 9 Controller Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 398-417 > Chunk ID: `chapter-9-part-3`"
---

# 第9章part 3 - 9 Controller Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 398-417  
> Chunk ID: `chapter-9-part-3`

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
9.5 Regulator Design 387
0 dB
20 dB
40 dB
f
0
 Tu
||Tu ||
||Tu ||
 Tu
Tu0 2.33 7.4 dB
f0
1 kHz
0 10
1
2Q f0 =9 0 0H z
10
1
2Q f0 = 1.1 kHz
Q0 = 9.5 19.5 dB
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.39 Uncompensated loop gain Tu, design example
The uncompensated loop gain Tu(s), with unity compensator gain, is sketched in Fig. 9.39.
With Gc(s)= 1, Eq. (9.75) can be written
Tu(s)= Tu0
1
1+ s
Q0ω0
+
⎦s
ω0
)2 (9.76)
where the dc gain is
Tu0= HV
DVM
= 2.33⇒7.4 dB (9.77)
The uncompensated loop gain has a crossover frequency of approximately 1.8 kHz, with a
phase margin of less than ﬁve degrees.
Let us design a compensator, to attain a crossover frequency offc= 5 kHz, or one twentieth
of the switching frequency. From Fig. 9.39, the uncompensated loop gain has a magnitude at
5 kHz of approximatelyTu0( f0/ fc)2= 0.093⇒−20.6 dB. So to obtain unity loop gain at 5 kHz,
our compensator should have a 5 kHz gain of +20.6 dB. In addition, the compensator should
improve the phase margin, since the phase of the uncompensated loop gain is nearly −180◦at
5k H z .S oal e a d(PD) compensator is needed. Let us (somewhat arbitrarily) choose to design for
a phase margin of 52◦. According to Fig.9.25, this choice leads to closed-loop poles having aQ-
factor of 1. The unit step response, Fig.9.26, then exhibits a peak overshoot of 16%. Evaluation
of Eq. (9.57), with fc = 5 kHz and θ= 52◦, leads to the following compensator pole and zero
frequencies:
fz= (5 kHz)
√
1−sin(52◦)
1+ sin(52◦)= 1.7 kHz (9.78)
fp= (5 kHz)
√
1+ sin(52◦)
1−sin(52◦)= 14.5k H z

388 9 Controller Design
fc
= fzfp0 dB
20 dB
40 dB
f
Gc
||Gc ||
||Gc ||
Gc
Gc0
fz
0
fp
Gc0
fp
fz
90
0
fz /10
fp /10 10fz
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.40 PD compensator transfer function Gc, design example
To obtain a compensator gain of 20.6d B⇒10.7 at 5 kHz, the low-frequency compensator gain
must be
Gc0=
⎦fc
f0
)2 1
Tu0
√
fz
fp
= 3.7⇒11.3 dB (9.79)
A Bode diagram of the PD compensator magnitude and phase is sketched in Fig. 9.40.
With this PD controller, the loop gain becomes
T(s)= Tu0Gc0
⎦
1+ s
ωz
)
⎦
1+ s
ωp
) ⎛⎜⎜⎜⎜⎜⎝1+ s
Q0ω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(9.80)
The compensated loop gain is sketched in Fig. 9.41. It can be seen that the phase of T(s)i s
approximately equal to 52◦over the frequency range of 1.4 kHz to 17 kHz. Hence variations
in component values, which cause the crossover frequency to deviate somewhat from 5 kHz,
should have little impact on the phase margin. In addition, it can be seen from Fig.9.41 that the
loop gain has a dc magnitude of Tu0Gc0⇒18.7d B .
Asymptotes of the quantity 1/(1+ T) are constructed in Fig. 9.42. This quantity has a dc
asymptote of−18.7 dB. Therefore, at frequencies less than 1 kHz, the feedback loop attenu-
ates output voltage disturbances by 18.7 dB. For example, suppose that the input voltage vg(t)
contains a 100 Hz variation of amplitude 1 V. With no feedback loop, this disturbance would
propagate to the output according to the open-loop transfer function Gvg(s), given in Eq. (9.72).

9.5 Regulator Design 389
0 dB
20 dB
40 dB
f
|| T ||
0
 T
||T || T
T0 = 8.6 18.7 dB
f0
1 kHz
0
Q0 = 9.5 19.5 dB
fz
fp
1.7 kHz
14 kHz
fc
5 kHz
170 Hz
1.1 kHz
1.4 kHz
900 Hz
17 kHz
m=52
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.41 The compensated loop gain of Eq. (9.80)
0 dB
20 dB
40 dB
f
|| T || T0 = 8.6 18.7 dB
f0
Q0 = 9.5 19.5 dB
fz
fp
fc
Q0
1/T0 = 0.12 
1
1+ T
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.42 Construction of∥1/(1+ T)∥ for the PD-compensated design example of Fig. 9.41
At 100 Hz, this transfer function has a gain essentially equal to the dc asymptote D= 0.536.
Therefore, with no feedback loop, a 100 Hz variation of amplitude 0.536 V would be observed
at the output. In the presence of feedback, the closed-loop line-to-output transfer function of Eq.
(9.5) is obtained; for our example, this attenuates the 100 Hz variation by an additional factor of
18.7d B⇒8.6. The 100 Hz output voltage variation now has magnitude 0.536/8.6= 0.062 V.

390 9 Controller Design
0 dB
20 dB
40 dB
f
||Gc ||
Gc
||Gc || Gc
Gcm
fz
fp
90
0
fz /10
fp /10
10fz
fL
fc
fL /10
10fL
90 /decade
45 /decade /dec
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.43 PID compensator transfer function, Eq. (9.81)
The low-frequency regulation can be further improved by addition of an inverted zero, as
discussed in Sect. 9.5.2.A PID controller, as in Sect. 9.5.3, is then obtained. The compensator
transfer function becomes
Gc(s)= Gcm
⎦
1+ s
ωz
) ⎦
1+ ωL
s
)
⎦
1+ s
ωp
) (9.81)
The Bode diagram of this compensator gain is illustrated in Fig.9.43. The pole and zero frequen-
cies fz and fp are unchanged, and are given by Eq. (9.78). The midband gainGcm is chosen to be
the same as the previous Gc0,E q .(9.79). Hence, for frequencies greater than fL, the magnitude
of the loop gain is unchanged by the inverted zero. The loop continues to exhibit a crossover
frequency of 5 kHz.
So that the inverted zero does not signiﬁcantly degrade the phase margin, let us (somewhat
arbitrarily) choose fL to be one-tenth of the crossover frequency, or 500 Hz. The inverted zero
will then increase the loop gain at frequencies below 500 Hz, improving the low-frequency regu-
lation of the output voltage. The loop gain of Fig.9.44 is obtained. The magnitude of the quantity
1/(1+ T) is also constructed. It can be seen that the inverted zero at 500 Hz causes the magni-
tude of 1/(1+T) at 100 Hz to be reduced by a factor of approximately (100 Hz)/(500 Hz)= 1/5.
The total attenuation of 1/(1+ T) at 100 Hz is−32.7 dB. A 1 V , 100 Hz variation invg(t) would
now induce a 12 mV variation in v(t). Further improvements could be obtained by increasing
fL; however, this would require redesign of the PD portion of the compensator to maintain an
adequate phase margin.
The line-to-output transfer function is constructed in Fig. 9.45. Both the open-loop transfer
function Gvg(s), Eq. (9.72), and the closed-loop transfer function Gvg(s)/(1+ T(s)), are con-
structed using the algebra-on-the-graph method. The two transfer functions coincide at frequen-
cies greater than the crossover frequency. At frequencies less than the crossover frequency fc,

9.5 Regulator Design 391
f
||T ||
f0
fz
fp
fc
Q01
1+ T
fL
Q0
0 dB
20 dB
40 dB
60 dB
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.44 Construction of∥T∥ and∥1/(1+ T)∥ with the PID compensator of Fig. 9.43
D
Tu0Gcm
f
fz
fc
fL
Open-loop ||Gvg ||
Closed-loop Gvg
1+T
0 dB
20 dB
f0
Q0Gvg(0)= D
20 dB/decade
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.45 Comparison of open-loop line-to-output transfer function Gvg and the closed-loop line-to-
output transfer function of Eq. (9.82)
the closed-loop transfer function is reduced by a factor of T(s). It can be seen that the poles
of Gvg(s) are cancelled by zeroes of 1/(1+ T). Hence the closed-loop line-to-output transfer
function is approximately
Gvg(s)
(1+ T(s))≈ D
Tu0Gcm
1
⎦
1+ ωL
s
) ⎦
1+ s
ωz
)⎦
1+ s
ωc
) (9.82)

392 9 Controller Design
So the algebra-on-the-graph method allows simple approximate disturbance-to-output closed-
loop transfer functions to be written. Armed with such an analytical expression, the system
designer can easily compute the output disturbances, and can gain the insight required to shape
the loop gain T(s) such that system speciﬁcations are met. Computer simulations can then
be used to judge whether the speciﬁcations are met under all operating conditions, and over
expected ranges of component parameter values. Results of computer simulations of the design
example described in this section can be found in Sect. 15.4.2.
9.6 Measurement of Loop Gains
It is a good engineering practice to measure the loop gains of prototype feedback systems. The
objective of such an exercise is to verify that the system has been correctly modeled. If so, then
provided that a good controller design has been implemented, then the system behavior will
meet expectations regarding transient overshoot (and phase margin), rejection of disturbances,
dc output voltage regulation, etc. Unfortunately, there are reasons why practical system proto-
types are likely to diﬀer from theoretical models. Phenomena may occur that were not accounted
for in the original model, and that signiﬁcantly inﬂuence the system behavior. Noise and elec-
tromagnetic interference (EMI) can be present, which cause the system transfer functions to
deviate in unexpected ways.
So let us consider the measurement of the loop gainT(s) of the feedback system of Fig.9.46.
We will make measurements at some point A, where two blocks of the network are connected
electrically. In Fig.9.46, the output port of block 1 is represented by a Thevenin-equivalent net-
work, composed of the dependent voltage source G
1 ˆve and output impedance Z1.B l o c k1i s
loaded by the input impedance Z2 of block 2. The remainder of the feedback system is repre-
sented by a block diagram as shown. The loop gain of the system is
T(s)= G1(s)
⎦ Z2(s)
Z1(s)+ Z2(s)
)
G2(s)H(s) (9.83)
Measurement of this loop gain presents several challenges not present in other frequency
response measurements.
Fig. 9.46 It is desired to determine the loop gainT(s) experimentally, by making measurements at pointA

9.6 Measurement of Loop Gains 393
Fig. 9.47 Measurement of loop gain by breaking the loop
In principle, one could break the loop at point A, and attempt to measure T(s)u s i n gt h e
transfer function measurement method of the previous chapter. As illustrated in Fig. 9.47,ad c
supply voltage VCC and potentiometer would be used, to establish a dc bias in the voltage vx,
such that all of the elements of the network operate at the correct quiescent point. Ac voltage
variations in vz(t) are coupled into the injection point via a dc blocking capacitor. Any other
independent ac inputs to the system are disabled. A network analyzer is used to measure the
relative magnitudes and phases of the ac components of the voltages vy(t) and vx(t):
Tm(s)= ˆvy(s)
ˆvx(s)
⏐⏐⏐⏐
⏐
ˆvre f=0
ˆvg=0
(9.84)
The measured gain Tm(s)d iﬀers from the actual gain T(s) because, by breaking the connection
between blocks 1 and 2 at the measurement point, we have removed the loading of block 2 on
block 1. Solution of Fig. 9.47 for the measured gain Tm(s) leads to
Tm(s)= G1(s)G2(s)H(s) (9.85)
Equations (9.83) and (9.85) can be combined to express Tm(s) in terms of T(s):
Tm(s)= T(s)
⎦
1+ Z1(s)
Z2(s)
)
(9.86)
Hence,
Tm(s)≈T(s) provided that∥Z2∥≫∥ Z1∥ (9.87)
So to obtain an accurate measurement, we need to ﬁnd an injection point where loading is
negligible over the range of frequencies to be measured.
Other diﬃculties are encountered when using the method of Fig. 9.47. The most serious
problem is adjustment of the dc bias using a potentiometer. The dc loop gain is typically very
large, especially when a PI controller is used. A small change in the dc component of vx(t) can
therefore lead to very large changes in the dc biases of some elements in the system. So it is
diﬃcult to establish the correct dc conditions in the circuit. The dc gains may drift during the
experiment, making the problem even worse, and saturation of the error ampliﬁer is a common
complaint. Also, we have seen that the gains of the converter can be a function of the quiescent
operating point; signiﬁcant deviation from the correct operating point can cause the measured
gain to diﬀer from the loop gain of actual operating conditions.

394 9 Controller Design
9.6.1 Voltage Injection
An approach that avoids the dc biasing problem [ 84] is illustrated in Fig. 9.48. The voltage
source vz(t) is injected between blocks 1 and 2, without breaking the feedback loop. Ac vari-
ations in vz(t) again excite variations in the feedback system, but dc bias conditions are deter-
mined by the circuit. Indeed, if vz(t) contains no dc component, then the biasing circuits of the
system itself establish the quiescent operating point. Hence, the loop gain measurement is made
at the actual system operating point.
The injection source is modeled in Fig. 9.48 by a Thevenin equivalent network, containing
an independent voltage source with source impedance Zs(s). The magnitudes of vz and Zs are
irrelevant in the determination of the loop gain. However, the injection of vz does disrupt the
loading of block 2 on block 1. Hence, a suitable injection point must be found, where the loading
eﬀect is negligible.
To measure the loop gain by voltage injection, we connect a network analyzer to measure
the transfer function from ˆvx to ˆvy. The system independent ac inputs are set to zero, and the
network analyzer sweeps the injection voltage ˆ vz(t) over the intended frequency range. The
measured gain is
Tv(s)= ˆvy(s)
ˆvx(s)
⏐⏐⏐⏐
⏐
ˆvre f=0
ˆvg=0
(9.88)
Let us solve Fig. 9.48, to compare the measured gain Tv(s) with the actual loop gain T(s)
given by (9.83). The error signal is
ˆve(s)=−H(s)G2(s)ˆvx(s) (9.89)
The voltage ˆvy can be written
−ˆvy(s)= G1(s)ˆve(s)−ˆi(s)Z1(s) (9.90)
where ˆi(s)Z1(s) is the voltage drop across the source impedance Z1. Substitution of Eq. (9.89)
into (9.90) leads to
−ˆvy(s)=−ˆvx(s)G2(s)H(s)G1(s)−ˆi(s)Z1(s) (9.91)
Fig. 9.48 Measurement of loop gain by voltage injection

9.6 Measurement of Loop Gains 395
But ˆi(s)i s
ˆi(s)= ˆvx(s)
Z2(s) (9.92)
Therefore, Eq. (9.91) becomes
ˆvy(s)= ˆvx(s)
⎦
G1(s)G2(s)H(s)+ Z1(s)
Z2(s)
)
(9.93)
Substitution of Eq. (9.93)i n t o(9.88) leads to the following expression for the measured gain
Tv(s):
Tv(s)= G1(s)G2(s)H(s)+ Z1(s)
Z2(s) (9.94)
Equations (9.83) and (9.94) can be combined to determine the measured gain Tv(s) in terms of
the actual loop gain T(s):
Tv(s)= T(s)
⎦
1+ Z1(s)
Z2(s)
)
+ Z1(s)
Z2(s) (9.95)
Thus, Tv(s) can be expressed as the sum of two terms. The ﬁrst term is proportional to the actual
loop gain T(s), and is approximately equal to T(s) whenever∥ Z1∥≪∥ Z2∥. The second term
is not proportional to T(s), and limits the minimum T(s) that can be measured with the voltage
injection technique. If Z1/Z2 is much smaller in magnitude than T(s), then the second term can
be ignored, and Tv(s)≈T(s). At frequencies where T(s) is smaller in magnitude than Z1/Z2,
the measured data must be discarded. Thus,
Tv(s)≈T(s) (9.96)
provided
(i)∥Z1(s)∥≪∥ Z2(s)∥
and
(ii)∥T(s)∥≫



Z
1(s)
Z2(s)



Again, note that the value of the injection source impedance Z
s is irrelevant.
As an example, consider voltage injection at the output of an operational ampliﬁer, having
a5 0Ωoutput impedance, which drives a 500Ωeﬀective load. The system in the vicinity of the
injection point is illustrated in Fig. 9.49.S o Z1(s)= 50Ωand Z2(s)= 500Ω. The ratio Z1/Z2
is 0.1, or−20 dB. Let us further suppose that the actual loop gain T(s) contains poles at 10 Hz
and 100 kHz, with a dc gain of 80 dB. The actual loop gain magnitude is illustrated in Fig.9.50.
V oltage injection would result in measurement ofTv(s)g i v e ni nE q .(9.95). Note that
⎦
1+ Z1(s)
Z2(s)
)
= 1.1⇒0.83 dB (9.97)
Hence, for large∥ T∥, the measured∥Tv∥ deviates from the actual loop gain by less than 1 dB.
However, at high frequency where ∥ T∥ is less than −20 dB, the measured gain di ﬀers sig-
niﬁcantly. Apparently, Tv(s) contains two high-frequency zeroes that are not present in T(s).
Depending on the Q-factor of these zeroes, the phase of Tv at the crossover frequency could be
inﬂuenced. To ensure that the phase margin is correctly measured, it is important that Z1/Z2 be
suﬃciently small in magnitude.

396 9 Controller Design
+
+50 
500 
Block 1 Block 2
+
x(s)y(s)
+
z
ˆv ˆv
ˆv
Fig. 9.49 V oltage injection example
f
||T ||
0 dB
20 dB
40 dB
60 dB
80 dB
100 dB
|| Tv ||
Z1
Z2
||Tv ||
||T ||
10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
Fig. 9.50 Comparison of measured loop gain Tv and actual loop gain T, voltage injection example. The
measured gain deviates at high frequency
9.6.2 Current Injection
The results of the preceding paragraphs can also be obtained in dual form, where the loop gain
is measured by current injection [84]. As illustrated in Fig. 9.51, we can model block 1 and the
analyzer injection source by their Norton equivalents, and use current probes to measure ˆix and
ˆiy. The gain measured by current injection is
Ti(s)=
ˆiy(s)
ix(s)
⏐⏐
⏐⏐⏐
⏐
ˆvre f=0
ˆvg=0
(9.98)

9.6 Measurement of Loop Gains 397
Fig. 9.51 Measurement of loop gain by current injection
Fig. 9.52 Current injection using Thevenin-equivalent source
It can be shown that
Ti(s)= T(s)
⎦
1+ Z2(s)
Z1(s)
)
+ Z2(s)
Z1(s) (9.99)
Hence,
Ti(s)≈T(s) provided
(i) ∥ Z2(s)∥≪∥ Z1(s)∥, and (9.100)
(ii)∥T(s)∥≫


Z
2(s)
Z1(s)


So to obtain an accurate measurement of the loop gain by current injection, we must ﬁnd a
point in the network where block 2 has suﬃciently small input impedance. Again, note that the
injection source impedance Z
s does not aﬀect the measurement. In fact, we can realize iz by
use of a Thevenin-equivalent source, as illustrated in Fig. 9.52. The network analyzer injection
source is represented by voltage source ˆvz and output resistance Rs. A series capacitor, Cb,i s
inserted to avoid disrupting the dc bias at the injection point.
9.6.3 Measurement of Unstable Systems
When the prototype feedback system is unstable, we are even more eager to measure the loop
gain—to ﬁnd out what went wrong. But measurements cannot be made while the system oscil-

398 9 Controller Design
Fig. 9.53 Measurement of an unstable loop gain by voltage injection
lates. We need to stabilize the system, yet measure the original unstable loop gain. It is possible
to do this by recognizing that the injection source impedanceZs does not inﬂuence the measured
loop gain [84]. As illustrated in Fig.9.53, we can even add additional resistanceRext ,eﬀectively
increasing the source impedance Zs. The measured loop gain Tv(s)i su n aﬀected.
Adding series impedance generally lowers the loop gain of a system, leading to a lower
crossover frequency and a more positive phase margin. Hence, it is usually possible to add a
resistor Rext that is suﬃciently large to stabilize the system. The gainTv(s), Eq. (9.88), continues
to be approximately equal to the original unstable loop gain, according to Eq. ( 9.96). To avoid
disturbing the dc bias conditions, it may be necessary to bypass Rext with inductor Lext .I ft h e
inductance value is suﬃciently large, then it will not inﬂuence the stability of the modiﬁed
system.
9.7 Summary of Key Points
1. Negative feedback causes the system output to closely follow the reference input, according
to the gain 1/H(s). The inﬂuence on the output of disturbances and variation of gains in the
forward path is reduced.
2. The loop gain T(s) is equal to the products of the gains in the forward and feedback paths.
The loop gain is a measure of how well the feedback system works: a large loop gain leads
to better regulation of the output. The crossover frequency fc is the frequency at which the
loop gain T has unity magnitude, and is a measure of the bandwidth of the control system.
3. The introduction of feedback causes the transfer functions from disturbances to the out-
put to be multiplied by the factor 1 /(1+ T(s)). At frequencies where T is large in mag-
nitude (i.e., below the crossover frequency), this factor is approximately equal to 1 /T(s).
Hence, the inﬂuence of low-frequency disturbances on the output is reduced by a factor of
1/T(s). At frequencies where T is small in magnitude (i.e., above the crossover frequency),
the factor is approximately equal to 1. The feedback loop then has no e ﬀect. Closed-loop
disturbance-to-output transfer functions, such as the line-to-output transfer function or the
output impedance, can easily be constructed using the algebra-on-the-graph method.
4. Stability can be assessed using the phase margin test. The phase of T is evaluated at the
crossover frequency, and the stability of the important closed-loop quantitiesT/(1+ T) and
1/(1+ T) is then deduced. Inadequate phase margin leads to ringing and overshoot in the
system transient response, and peaking in the closed-loop transfer functions.

9.7 Summary of Key Points 399
5. Compensators are added in the forward paths of feedback loops to shape the loop gain, such
that desired performance is obtained. Lead compensators, or PD controllers, are added to
improve the phase margin and extend the control system bandwidth. PI controllers are
used to increase the low-frequency loop gain, to improve the rejection of low-frequency
disturbances and reduce the steady-state error.
6. Loop gains can be experimentally measured by use of voltage or current injection. This
approach avoids the problem of establishing the correct quiescent operating conditions in
the system, a common diﬃculty in systems having a large dc loop gain. An injection point
must be found where interstage loading is not signiﬁcant. Unstable loop gains can also be
measured.
Problems
9.1 Derive both forms of Eq. (9.41).
9.2 The ﬂyback converter system of Fig. 9.54 contains a feedback loop for regulation of the
main output voltage v1. An auxiliary output produces voltage v2. The dc input voltage vg
lies in the range 280 V≤vg≤380 V. The compensator network has transfer function
Gc(s)= Gc∞
⎦
1+ ω1
s
)
where Gc∞= 0.05, and f1= ω1/2π= 400 Hz.
(a) What is the steady-state value of the error voltage ve(t)? Explain your reasoning.
(b) Determine the steady-state value of the main output voltage v1.
(c) Estimate the steady-state value of the auxiliary output voltage v2.
+vg
64 : 3
: 1
+
v1
+
Compensator
Reference
input
Pulse-width
modulator
vc
Isolated
transistor
gate driver
Gc (s)
H(s)
ve
fs = 200 kHz
C1
220 μF
VM = 4 V
+
v2
C2
100 μF
R1
5 
R2
2 
H(s) = 0.2
vref = 3 V
L = 600 μH
Fig. 9.54 Flyback converter system of Problem 9.2

400 9 Controller Design
9.3 In the boost converter system of Fig. 9.55, all elements are ideal. The compensator has
gain Gc(s)= 250/s.
+
+
vvg
Boost converter
+
Compensator
vrefReference
input
Pulse-width
modulator
vc
Transistorgate driver
Gc(s)
H(s)
ve
fs = 200 kHz
L
C R
100 μH
33 μF 12 
T(s)
VM = 4 V
48 V
5 V
H(s)= 1
24
Fig. 9.55 Boost converter system of Problem 9.3
(a) Construct the Bode plot of the loop gain T(s) magnitude and phase. Label values of
all corner frequencies and Q-factors, as appropriate.
(b) Determine the crossover frequency and phase margin.
(c) Construct the Bode diagram of the magnitude of 1/(1+ T), using the algebra-on-the-
graph method. Label values of all corner frequencies and Q-factors, as appropriate.
(d) Construct the Bode diagram of the magnitude of the closed-loop line-to-output trans-
fer function. Label values of all corner frequencies and Q-factors, as appropriate.
9.4 A certain inverter system has the following loop gain
T(s)= T0
⎦
1+ s
ωz
)
⎦
1+ s
ω1
)⎦
1+ s
ω2
)⎦
1+ s
ω3
)
and the following open-loop line-to-output transfer function
Gvg(s)= Gg0
1⎦
1+ s
ω1
)⎦
1+ s
ω3
)
where
T0= 100 ω1= 500 rad/ sec
ω2= 1000 rad/ sec ω3= 24000 rad/ sec
ωz= 4000 rad/ sec Gg0= 0.5
The gain of the feedback connection is H(s)= 0.1.

9.7 Summary of Key Points 401
(a) Sketch the magnitude and phase asymptotes of the loop gain T(s). Determine numer-
ical values of the crossover frequency in Hz and phase margin in degrees.
(b) Construct the magnitude asymptotes of the closed-loop line-to-output transfer func-
tion. Label important features.
(c) Construct the magnitude asymptotes of the closed-loop transfer function from the
reference voltage to the output voltage. Label important features.
9.5 The forward converter system of Fig. 9.56a is constructed with the element values shown.
The quiescent value of the input voltage is Vg = 380 V . The transformer has turns ratio
n1/n3 = 4.5. The duty cycle produced by the pulse-width modulator is restricted to the
range 0≤d(t)≤0.5. Within this range, d(t) follows the control voltage vc(t) according to
d(t)= 1
2
vc(t)
VM
with VM = 3V .
(a) Determine the quiescent values of: the duty cycle D, the output voltage V, and the
control voltage Vc.
(a)
+
n1 : n1 : n3
CR
+
v(t)
L
vg(t)
vref
Pulse-width
modulator
vc
Isolated
transistor
gatedriver
fs = 150 kHz
500 μH
10 μF7 
T(s)
5.1 V
+
13 nF 5.6 k 81.8 k
18.2 k
C1 R1R3
R2
(b) v
vrefvc
+Gc (s)
H(s)
Gr (s)
Fig. 9.56 Forward converter system of Problem9.5:( a) system diagram, (b) modeling the op amp circuit
using a block diagram

402 9 Controller Design
(b) The op-amp circuit and feedback connection can be modeled using the block diagram
illustrated in Fig. 9.56b, with H(s)= R2/(R1+ R2). Determine the transfer functions
Gc(s) and Gr(s).
(c) Sketch a block diagram which models the small-signal ac variations of the complete
system, and determine the transfer function of each block. Hint: the transformer mag-
netizing inductance has negligible inﬂuence on the converter dynamics, and can be
ignored. The small-signal models of the forward and buck converters are similar.
(d) Construct a Bode plot of the loop gain magnitude and phase. What is the crossover
frequency? What is the phase margin?
(e) Construct the Bode plot of the closed-loop line-to-output transfer function magnitude



ˆv
ˆvg



Label important features. What is the gain at 120 Hz? At what frequency do distur-
bances in v
g have the greatest inﬂuence on the output voltage?
9.6 In the voltage regulator system of Fig. 9.56, described in Problem 9.5, the input voltage
vg(t) contains a 120 Hz variation of peak amplitude 10 V .
(a) What is the amplitude of the resulting 120 Hz variation in v(t)?
(b) Modify the compensator network such that the 120 Hz output voltage variation has
peak amplitude less than 25 mV. Your modiﬁcation should leave the dc output voltage
unchanged, and should result in a crossover frequency no greater than 10 kHz.
9.7 Design of a boost converter with current feedback and a PI compensator. In some appli-
cations, it is desired to control the converter input terminal current waveform. The boost
converter system of Fig. 9.57 contains a feedback loop which causes the converter input
current i
g(t) to be proportional to a reference voltage vre f (t). The feedback connection is a
current sense circuit having gain H(s)= 0.2 volts per ampere. A conventional pulse width
modulator circuit (Fig. 7.29) is employed, having a sawtooth waveform with peak–peak
amplitude of VM = 3 V. The quiescent values of the inputs are: Vg = 120 V, Vre f = 2V .
All elements are ideal.
+
+
vvg
+
Compensator
vref
Reference
input
Pulse-width
modulator
vc
Transistor
gatedriver
Gc (s)
H(s)
ve
fs = 100 kHz
L
CR
ig
400 μH
10 μ!F 120 
T(s)
VM = 3 V
ig
H(s) ig(s)
Fig. 9.57 Boost converter system with current feedback, Problem 9.7

9.7 Summary of Key Points 403
(a) Determine the quiescent values D, V, and Ig.
(b) Determine the small-signal transfer function
Gid(s)=
ˆig(s)
ˆd(s)
(c) Sketch the magnitude and phase asymptotes of the uncompensated ( Gc(s)= 1) loop
gain.
(d) It is desired to obtain a loop gain magnitude of at least 35 dB at 120 Hz, while main-
taining a phase margin of at least 72◦. The crossover frequency should be no greater
than fs/10= 10 kHz. Design a PI compensator that accomplishes this. Sketch the
magnitude and phase asymptotes of the resulting loop gain, and label important fea-
tures.
(e) For your design of part (d), sketch the magnitude of the closed-loop transfer function
ˆi
g(s)
ˆvre f (s)
Label important features.
9.8 Design of a buck regulator to meet closed-loop output impedance speciﬁcations. The buck
converter with control system illustrated in Fig. 9.58 is to be designed to meet the follow-
ing speciﬁcations. The closed-loop output impedance should be less than 0.2 Ωover the
entire frequency range 0 to 20 kHz. To ensure that the transient response is well-behaved,
the poles of the closed-loop transfer functions, in the vicinity of the crossover frequency,
should have Q-factors no greater than unity. The quiescent load current I
LOAD can vary
from 5 A to 50 A, and the above speciﬁcations must be met for every value of ILOAD in
this range. For simplicity, you may assume that the input voltage vg does not vary. The
loop gain crossover frequency fc may be chosen to be no greater than fs/10, or 10 kHz.
You may also assume that all elements are ideal. The pulse-width modulator circuit obeys
Eq. (7.85).
+
+
vvg
+
Compensator vref
HvPulse-width
modulator
vc
Transistor
gatedriver
Gc (s)
H(s)
ve
H(s) = 0.1fs = 100 kHz
L
1 mH
C
200 μF
VM = 4 V
5 V
iload
Rload
Zout
100 V
Fig. 9.58 Buck regulator system, Problem 9.8

404 9 Controller Design
(a) What is the intended dc output voltage V? Over what range does the eﬀective load
resistance RLOAD vary?
(b) Construct the magnitude asymptotes of the open-loop output impedance Zout(s). Over
what range of frequencies is the output impedance speciﬁcation not met? Hence, de-
duce how large the minimum loop gain T(s) must be in magnitude, such that the
closed-loop output impedance meets the speciﬁcation. Choose a suitable crossover
frequency fc.
(c) Design a compensator network Gc(s) such that all speciﬁcations are met. Additionally,
t h ed cl o o pg a i nT(s) should be at least 20 dB. Specify the following:
(i) Your choice for the transfer function Gc(s)
(ii) The worst-case closed-loop Q
(iii) Bode plots of the loop gain T(s) and the closed-loop output impedance, for load
currents of 5 A and 50 A. What eﬀect does variation of RLOAD have on the closed-
loop behavior of your design?
(d) Design a circuit using resistors, capacitors, and an op amp to realize your compensator
transfer function Gc(s).
9.9 Design of a buck–boost voltage regulator. The buck–boost converter of Fig.9.59 operates
in the continuous conduction mode, with the element values shown. The nominal input
voltage is Vg = 48 V, and it is desired to regulate the output voltage at−15 V. Design the
best compensator that you can, which has high crossover frequency (but no greater than
10% of the switching frequency), large loop gain over the bandwidth of the feedback loop,
and phase margin of at least 52◦.
(a) Specify the required value of H. Sketch Bode plots of the uncompensated loop gain
magnitude and phase, as well as the magnitude and phase of your proposed compen-
sator transfer function Gc(s). Label the important features of your plots.
(b) Construct Bode diagrams of the magnitude and phase of your compensated loop gain
T(s), and also of the magnitude of the quantities T/(1+ T) and 1/(1+ T).
(c) Discuss your design. What prevents you from further increasing the crossover fre-
quency? How large is the loop gain at 120 Hz? Can you obtain more loop gain at
120 Hz?
+ LC R
+
vvg
fs = 200 kHz
220 μF5 50 μH
++
Compensator vref
HvPulse-width
modulator
vc
Transistor
gatedriver
Gc (s)
H(s)
ve
VM = 3 V
5 V
Fig. 9.59 Buck–boost voltage regulator system, Problem 9.9

9.7 Summary of Key Points 405
(a)
+
1 k
10 k 2 nF
1 k +
x(s)y(s)
+
z
G1(s) e(s)
(b)
f
|| Tv ||
Tv
0
90
0 dB
20 dB
40 dB
60 dB
100 Hz 1 kHz 10 kHz 100 kHz 1 MHz
ˆv ˆv ˆv
ˆv
Fig. 9.60 Experimental measurement of loop gain, Problem 9.10:( a) measurement via voltage injection,
(b)m e a s u r e dd a t a
9.10 The loop gain of a certain feedback system is measured, using voltage injection at a point
in the forward path of the loop as illustrated in Fig.9.60a. The data in Fig.9.60b is obtained.
What is T(s)? Specify T(s) in factored pole-zero form, and give numerical values for
all important features. Over what range of frequencies does the measurement give valid
results?

Part III
Magnetics
```
