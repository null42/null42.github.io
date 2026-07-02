---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第9章part 2 - 9 Controller Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 378-397 > Chunk ID: `chapter-9-part-2`"
---

# 第9章part 2 - 9 Controller Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 378-397  
> Chunk ID: `chapter-9-part-2`

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
9.4 Stability 367
(a)
Re[T(s)]
Im[T(s)]
Unit circle
f = 0f
1
2
3
(b)
–1
Re[T(s)]
Im[T(s)]
T(jω )
T(–jω )
®¥
Fig. 9.18 Nyquist plot for the example having three crossover frequencies (Fig. 9.17): (a) mapping of
the contourΓA through the loop gain T(s), (b) mapping of the complete Nyquist contour through the loop
gain T(s)
the−1 point is encircled twice. Hence, the closed-loop transfer functions contain two poles in
the right half of the complex plane, and this feedback system is unstable.
Example 3: Integrator in Feedback Loop
If the Nyquist contourΓpasses through one or more singularities of the loop gainT(s), then the
conformal mapping property is lost, and the arguments of the above sections no longer apply.
This case can occur when the loop gain T(s) contains one or more poles lying on the imaginary
axis. A common example is the use of an integrator in the compensator (see Sect.9.5.2), leading
to a pole at the origin. An example of a loop gain containing a pole at the origin is:
T(s)= 1⎦s
ω0
)⎦
1+ s
ω1
)⎦
1+ s
ω2
) (9.33)
The corner frequenciesω0,ω1, andω2 are positive and real in this example. This special case
can be handled by redeﬁning the Nyquist contour of Fig.9.13 as illustrated in Fig.9.19. A fourth
segmentΓD is added, to jog the contour around the singularity. Segment ΓD is deﬁned to be a
semicircular arc as follows:
s=ϵ ejθ with ϵ→0 and θ∈(−90◦,+90◦) (9.34)
The loop gain T(s)o fE q . (9.33) contains no poles inside the modiﬁed Nyquist contour of
Fig. 9.19. Hence the number of right half-plane poles of the closed-loop transfer function
T/(1+ T) is equal to the number of encirclements of the −1 point by the mapped modiﬁed
Nyquist contour T(Γ).
The magnitude and phase Bode plot ofT(s) is sketched in Fig.9.20 for some speciﬁc values
ofω0,ω1, andω2. For this example, T(s) exhibits a crossover frequency fc with phase margin
ϕm as illustrated.
Figure 9.21a illustrates the ﬁrst part of the Nyquist plot, in which segment ΓA is mapped
through the loop gain T(s). Along this segment, s= jωwithωvarying fromϵ (→0) to∞.

368 9 Controller Design
Fig. 9.19 Modiﬁcation of the Nyquist contour to
handle the special case in which the loop gain in-
cludes a pole at the origin. Segment Γ
D deﬁned by
Eq. (9.34) routes the Nyquist contour around the pole
at s = 0. The locations of poles of Eq. ( 9.33)a r e
marked x
fc
Crossover
frequency
0 dB
–20 dB
–40 dB
20 dB
40 dB
60 dB
f
fp1
|| T ||
0˚
–90˚
–180˚
–270˚
ϕm
∠ T
∠ T||T ||
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
fp2
Fig. 9.20 Bode plot of loop gain T(s) for the example of Eq. (9.33)
SegmentΓB is again deﬁned by Eq. (9.28), and this segment again maps to the origin. Seg-
mentΓC is the complex conjugate of ΓC. The mapping of contours ΓA,ΓB, andΓC through
the loop gain T(s) is illustrated in Fig. 9.21b. It can be seen that this contour is not closed; to
complete the mapped contour,ΓD must be incorporated.
Substitution of the mapping deﬁned by Eq. (9.34) into the loop gain of Eq. (9.33) leads to:
T(ϵejθ)= 1⎦ϵejθ
ω0
)⎦
1+ϵejθ
ω1
)⎦
1+ϵejθ
ω2
) (9.35)
Asϵ tends to zero, the pole terms associated with the corner frequencies ω1 andω2 tend to 1.
Equation (9.35) then reduces to
T(ϵejθ)=ω0 e−jθ
ϵ (9.36)
Asϵ tends to zero, the magnitude of Eq. ( 9.36) tends to inﬁnity. As θvaries from −90◦to
+90◦, the phase of the mapped contour varies from +90◦to−90◦. The complete contour is

9.4 Stability 369
Fig. 9.21 Nyquist plot for the example of an integrator in the feedback loop (Fig. 9.20): (a) mapping of
the contourΓA through the loop gain T(s), (b) mapping of the contoursΓA,ΓB,a n dΓC through the loop
gain T(s), (c) mapping of complete modiﬁed Nyquist contour
illustrated in Fig. 9.21c. It can be seen that the mapped contour is now closed, and that there
are no encirclements of the−1 point provided that the phase margin is positive. The contour of
Fig. 9.21c represents a stable system.
Summary: Nyquist Stability Criterion
Thus, the Nyquist stability criterion is closely related to the Bode plot of the loop gain. The
segmentΓA corresponds to letting s= jω, and the mapping of ΓA through the loop gain T(s)
constitutes a polar plot of T( jω). The number of right half-plane poles of the closed-loop trans-
fer functions T/(1+T) and 1/(1+T) is rigorously discerned via determination of the number of
encirclements of the−1 point by the Nyquist contour mapped through the loop gain T(s). This
explains the origins of the phase margin test, and also provides a stability test for more complex
cases such as loop gains having multiple crossover frequencies.

370 9 Controller Design
9.4.3 The Relationship Between Phase Margin and Closed-Loop Damping Factor
How much phase margin is necessary? Is a worst-case phase margin of 1 ◦satisfactory? Of
course, good designs should have adequate design margins, but there is another important reason
why additional phase margin is needed. A small phase margin (in T) causes the closed-loop
transfer functions T/(1+ T) and 1/(1+ T) to exhibit resonant poles with high Q in the vicinity
of the crossover frequency. The system transient response exhibits overshoot and ringing. As
the phase margin is reduced these characteristics become worse (higherQ, longer ringing) until,
for ϕm≤0◦, the system becomes unstable.
Let us consider a loop gainT(s) which is well-approximated, in the vicinity of the crossover
frequency, by the following function:
T(s)= 1⎦s
ω0
)⎦
1+ s
ω2
) (9.37)
Magnitude and phase asymptotes are plotted in Fig.9.22. This function is a good approximation
near the crossover frequency for many common loop gains, in which∥ T∥ approaches unity gain
with a−20 dB/decade slope, with an additional pole at frequency f2 = ω2/2π. Any additional
poles and zeroes are assumed to be suﬃciently far above or below the crossover frequency, such
that they have negligible eﬀect on the system transfer functions near the crossover frequency.
Note that, as f2→∞, the phase marginϕm approaches 90◦.A s f2→0, ϕm→0◦.S oa s f2
is reduced, the phase margin is also reduced. Let’s investigate how this aﬀects the closed-loop
response via T/(1+ T). We can write
T(s)
1+ T(s)= 1
1+ 1
T(s)
= 1
1+ s
ω0
+ s2
ω0ω2
(9.38)
0 dB
20 dB
40 dB
f
0
 T
 T
f0
f2
m
f2
f2/10
10f2
f0
f
f0 f2
f 2
|| T ||
|| T ||
Fig. 9.22 Magnitude and phase asymptotes for the loop gain T of Eq. (9.37)

9.4 Stability 371
using Eq. (9.37). By putting this into the standard normalized quadratic form, one obtains
T(s)
1+ T(s)= 1
1+ s
Qωc
+
⎦s
ωc
)2 (9.39)
where
ωc=√ω0ω2= 2πfc
Q= ω0
ωc
=
√ω0
ω2
So the closed-loop response contains quadratic poles at fc, the geometric mean of f0 and f2.
These poles have a low Q-factor when f0 ≪ f2. In this case, we can use the low- Q approxima-
tion to estimate their frequencies:
Qωc= ω0 (9.40)
ωc
Q = ω2
Magnitude asymptotes are plotted in Fig.9.23 for this case. It can be seen that these asymptotes
conform to the rules of Sect.9.3 for constructing T/(1+T) by the algebra-on-the-graph method.
Next consider the high-Q case. When the pole frequency f2 is reduced, reducing the phase
margin, then the Q-factor given by Eq. (9.39) is increased. For Q> 0.5, resonant poles occur at
frequency fc. The magnitude Bode plot for the case f2< f0 is given in Fig.9.24. The frequency
fc continues to be the geometric mean of f2 and f0, and fc now coincides with the crossover
(unity-gain) frequency of the∥ T∥ asymptotes. The exact value of the closed-loop gainT/(1+T)
at frequency fc is equal to Q= f0/ fc. As shown in Fig. 9.24, this is identical to the value of the
low-frequency−20 dB/decade asymptote ( f0/ f ), evaluated at frequency fc. It can be seen that
the Q-factor becomes very large as the pole frequency f2 is reduced.
The asymptotes of Fig. 9.24 also follow the algebra-on-the-graph rules of Sect. 9.3,b u tt h e
deviation of the exact curve from the asymptotes is not predicted by the algebra-on-the-graph
method.
0 dB
20 dB
40 dB
f
|| T ||
f0
f2
f0
f
f0 f2
f 2
T
1+ T
fc = f0 f2
Q = f0 / fc
Fig. 9.23 Construction of magnitude asymptotes of the closed-loop transfer function T/(1+ T), for the
low-Q case

372 9 Controller Design
f
|| T ||
f0
f2
f0
f
f0 f2
f 2
T
1+ T fc = f0 f2
Q = f0/fc
0 dB
20 dB
40 dB
60 dB
Fig. 9.24 Construction of magnitude asymptotes of the closed-loop transfer function T/(1+ T), for the
high-Q case
These two poles with Q-factor appear in both T/(1+T) and 1/(1+T). We need an easy way
to predict the Q-factor. We can obtain such a relationship by ﬁnding the frequency at which the
magnitude of T is exactly equal to unity. We then evaluate the exact phase ofT at this frequency,
and compute the phase margin. This phase margin is a function of the ratiof0/ f2,o r Q2. We can
then solve to ﬁnd Q as a function of the phase margin. The result is
Q=
√cosϕm
sinϕm
ϕm= tan−1
√
1+
√
1+ 4Q4
2Q4
(9.41)
This function is plotted in Fig. 9.25, with Q expressed in dB. It can be seen that obtaining real
poles (Q< 0.5) requires a phase margin of at least 76◦. To obtain Q= 1, a phase margin of 52◦
is needed. The system with a phase margin of 1◦exhibits a closed-loop response with very high
Q! With a small phase margin, T( jω) is very nearly equal to−1 in the vicinity of the crossover
frequency. The denominator (1+ T) then becomes very small, causing the closed-loop transfer
functions to exhibit a peaked response at frequencies near the crossover frequency fc.
Figure 9.25 is the result for the simple loop gain deﬁned by Eq. ( 9.37). However, this loop
gain is a good approximation for many other loop gains that are encountered in practice, in
which∥ T∥ approaches unity gain with a−20 dB/decade slope, with an additional pole at fre-
quency f2. If all other poles and zeroes of T(s)a r es uﬃciently far above or below the crossover
frequency, then they have negligible eﬀect on the system transfer functions near the crossover
frequency, and Fig.9.25 gives a good approximation for the relationship betweenϕm and Q.
Another common case is the one in which∥ T∥ approaches unity gain with a−40 dB/decade
slope, with an additional zero at frequency f2.A s f2 is increased, the phase margin is decreased
and Q is increased. It can be shown that the relation betweenϕm and Q is exactly the same, Eq.
(9.41).

9.4 Stability 373
0° 10° 20° 30° 40° 50° 60° 70° 80° 90°
m
Q
Q =1 0 dB
Q = 0.5
m = 52
m = 76
0 dB
5 dB
10 dB
15 dB
20 dB
Fig. 9.25 Relationship between loop-gain phase marginϕm and closed-loop peaking factor Q
A case where Fig. 9.25 fails is when the loop gain T(s) contains three or more poles at or
near the crossover frequency. The closed-loop response then also contains three or more poles
near the crossover frequency, and these poles cannot be completely characterized by a single
Q-factor. Additional work is required to ﬁnd the behavior of the exact T/(1+ T) and 1/(1+ T)
near the crossover frequency, but nonetheless it can be said that a small phase margin leads to a
peaked closed-loop response.
9.4.4 Transient Response vs. Damping Factor
One can solve for the unit-step response of the T/(1+ T) transfer function, by multiplying
Eq. (9.39)b y1/s and then taking the inverse Laplace transform. The result for Q> 0.5i s
ˆv(t)= 1+ 2Qe−ωct/2Q
√
4Q2−1
sin
⎡⎢⎢⎢⎢⎢⎣
√
4Q2−1
2Q ωct+ tan−1 ⎦√
4Q2−1
)⎤⎥⎥⎥⎥⎥⎦ (9.42)
For Q< 0.5, the result is
ˆv(t)= 1−ω2
ω2−ω1
e−ω1t−ω1
ω1−ω2
e−ω2t (9.43)
with
ω1,ω2=ωc
2Q
⎦
1±
√
1−4Q2
)
(9.44)
These equations are plotted in Fig. 9.26 for various values of Q.

374 9 Controller Design
Fig. 9.26 Unit-step response of the second-order system, Eqs. (9.42)a n d(9.43), for various values of Q
According to Eq. (9.39), when f2 > 4 f0,t h eQ-factor is less than 0.5, and the closed-loop
response contains a low-frequency and a high-frequency real pole. The transient response in
this case, Eq. (9.43), contains decaying-exponential functions of time, of the form
Ae
(pole)t (9.45)
This is called the “overdamped” case. With very low Q, the low-frequency pole leads to a slow
step response.
For f2= 4 f0,t h eQ-factor is equal to 0.5. The closed-loop response contains two real poles
at frequency 2 f0. This is called the “critically damped” case. The transient response is faster
than in the overdamped case, because the lowest-frequency pole is at a higher frequency. This is
the fastest response that does not exhibit overshoot. Atωct=πradians (t= 1/2 fc), the voltage
has reached 82% of its ﬁnal value. At ωct= 2πradians (t= 1/ fc), the voltage has reached
98.6% of its ﬁnal value.
For f2 < 4 f0,t h eQ-factor is greater than 0.5. The closed-loop response contains complex
poles, and the transient response exhibits sinusoidal-type waveforms with decaying amplitude,
Eq. (9.42). The rise time of the step response is faster than in the critically damped case, but the
waveforms exhibit overshoot. The peak value of v(t)i s
peak ˆv(t)= 1+ e
−π/
√
4Q2−1 (9.46)

9.4 Stability 375
This is called the “underdamped” case. A Q-factor of 1 leads to an overshoot of 16.3%, while
a Q-factor of 2 leads to a 44.4% overshoot. Large Q-factors lead to overshoots approaching
100%.
The exact transient response of the feedback loop may di ﬀer from the plots of Fig. 9.26,
because of additional poles and zeroes in T, and because of diﬀerences in initial conditions.
Nonetheless, Fig.9.26 illustrates how high-Q poles lead to overshoot and ringing. In most power
applications, overshoot is unacceptable. For example, in a 3.3 V computer power supply, the
voltage must not be allowed to overshoot to 5 or 6 volts when the supply is turned on—this
would likely destroy all of the integrated circuits in the computer! So the Q-factor must be
suﬃciently low, often 0.5 or less, corresponding to a phase margin of at least 76◦.
9.4.5 Load Step Response vs. Damping Factor
Usually we also are interested in the response of the output voltage to a step change in load cur-
rent. Let us consider the case where the closed-loop output impedance can be well approximated
by a second-order function of the form
Z
out(s)=
⎦sR0
ωc
)
1+ s
Qωc
+
⎦s
ωc
)2 (9.47)
This constitutes an eﬀective parallel R−L−C impedance having characteristic impedance R0,
resonant frequency fc, and Q-factor Q. Also consider that the load current takes a step change
of magnitude I0, with the following Laplace transform:
ˆiload= I0
s (9.48)
One can multiply Eqs. ( 9.47) and ( 9.48), and then invert the Laplace transform to derive an
expression for the output voltage response ˆv(t). For Q< 0.5, the result is:
ˆv(t)=−I0R0Q√
1−4Q2
⎦
e−ω1t−e−ω2t)
(9.49)
withω1 andω2 deﬁned as in Eq. (9.44). For the high-Q case Q> 0.5, the result is:
ˆv(t)=−I0R02Q√
4Q2−1
e−ωct/2Q sin
⎛⎜⎜⎜⎜⎜⎝
√
4Q2−1
2Q ωct
⎞⎟⎟⎟⎟⎟⎠ (9.50)
These equations are plotted in Fig. 9.27 for various values of Q and for I0R0= 1. For non-unity
I0R0, the curves can be multiplied by I0R0: the peak deviation in ˆ v(t) is proportional to the
magnitude of the current step I0 multiplied by the characteristic impedance R0.F o rQ< 0.5, the
peak voltage deviation has magnitude slightly less than I0R0Q.A t Q= 0.5, the peak voltage
deviation is approximately−0.368 I0R0.A s Q→∞, the peak voltage deviation tends to−I0R0.

376 9 Controller Design
ct
0 5 10 15
-1
-0.5
0
0.5
1
Q = 50
Q = 10
Q = 4
Q = 2
Q = 1
Q = 0.75
Q = 0.5
Q = 0.3
Q = 0.2
Q = 0.1
Q = 0.05
Fig. 9.27 Response of the second-order system to a unit step change in load current, Eqs. ( 9.49)
and (9.50), for various values of Q. These curves are plotted for I0R0= 1
9.5 Regulator Design
Let’s now consider how to design a regulator system, to meet speciﬁcations or design goals re-
garding rejection of disturbances, transient response, and stability. Typical dc regulator designs
are deﬁned using speciﬁcations such as the following:
1. Eﬀect of load current variations on the output voltage regulation. The output voltage must
remain within a speciﬁed range when the load current varies in a prescribed way. This
amounts to a limit on the maximum magnitude of the closed-loop output impedance of
Eq. (9.6), repeated below
ˆv(s)
−ˆiload(s)
⏐⏐⏐⏐⏐⏐ ˆvg=0
ˆvre f=0
= Zout(s)
1+ T(s) (9.51)
If, over some frequency range, the open-loop output impedance Zout has magnitude that
exceeds the limit, then the loop gain T must be suﬃciently large in magnitude over the
same frequency range, such that the magnitude of the closed-loop output impedance given
in Eq. (9.51) is less than the given limit.
2. Eﬀect of input voltage variations (for example, at the second harmonic of the ac line fre-
quency) on the output voltage regulation . Speciﬁc maximum limits are usually placed on
the amplitude of variations in the output voltage at the second harmonic of the ac line fre-
quency (120 Hz or 100 Hz). If we know the magnitude of the rectiﬁcation voltage ripple
which appears at the converter input (as ˆvg), then we can calculate the resulting output volt-
age ripple (in ˆv) using the closed loop line-to-output transfer function of Eq. (9.5), repeated
below

9.5 Regulator Design 377
ˆv(s)
ˆvg(s)
⏐⏐
⏐⏐⏐
⏐
ˆvre f=0
ˆiload=0
= Gvg(s)
1+ T(s) (9.52)
The output voltage ripple can be reduced by increasing the magnitude of the loop gain at
the ripple frequency. In a typical good design,∥ T∥ is 20 dB or more at 120 Hz, so that the
transfer function of Eq. (9.52) is at least an order of magnitude smaller than the open-loop
line-to-output transfer function∥ Gvg∥.
3. Transient response time. When a speciﬁed large disturbance occurs, such as a large step
change in load current or input voltage, the output voltage may undergo a transient. Dur-
ing this transient, the output voltage typically deviates from its speciﬁed allowable range.
Eventually, the feedback loop operates to return the output voltage within tolerance. The
time required to do so is the transient response time; typically, the response time can be
shortened by increasing the feedback loop crossover frequency.
4. Overshoot and ringing . As discussed in Sect. 9.4.4, the amount of overshoot and ringing
allowed in the transient response may be limited. Such a speciﬁcation implies that the phase
margin must be suﬃciently large.
Each of these requirements imposes constraints on the loop gainT(s). Therefore, the design
of the control system involves modifying the loop gain. As illustrated in Fig.9.2, a compensator
network is added for this purpose. Several well-known strategies for design of the compensator
transfer function G
c(s) are discussed below.
9.5.1 Lead ( PD) compensator
This type of compensator transfer function is used to improve the phase margin. A zero is added
to the loop gain, at a frequency fz suﬃciently far below the crossover frequency fc, such that
the phase margin of T(s) is increased by the desired amount. The lead compensator is also
called a proportional-plus-derivative,o r PD, controller—at high frequencies, the zero causes
the compensator to diﬀerentiate the error signal. It often ﬁnds application in systems originally
containing a two-pole response. By use of this type of compensator, the bandwidth of the feed-
back loop (i.e., the crossover frequency fc) can be extended while maintaining an acceptable
phase margin.
As i d eeﬀect of the zero is that it causes the compensator gain to increase with frequency,
with a+20 dB/decade slope. So steps must be taken to ensure that∥ T∥ remains equal to unity
at the desired crossover frequency. Also, since the gain of any practical ampliﬁer must tend to
zero at high frequency, the compensator transfer function Gc(s) must contain high-frequency
poles. These poles also have the beneﬁcial eﬀect of attenuating high-frequency noise. Of partic-
ular concern are the switching frequency harmonics present in the output voltage and feedback
signals. If the compensator gain at the switching frequency is too great, then these switching
harmonics are ampliﬁed by the compensator, and can disrupt the operation of the pulse-width
modulator (see Sect. 7.3). So the compensator network should contain poles at a frequency less
than the switching frequency. These considerations typically restrict the crossover frequency
f
c to be less than approximately 10% of the converter switching frequency fs. In addition, the
circuit designer must take care not to exceed the gain-bandwidth limits of available operational
ampliﬁers.

378 9 Controller Design
f
c
 Gc
GG c0
0
fp
fz /10
fp/10 10fz
fmax
= fz fp
+ 45 /decade
/decade
fz
Gc0
fp
fz
||||
Fig. 9.28 Magnitude and phase asymptotes of the PD compensator transfer function Gc of Eq. (9.53)
The transfer function of the lead compensator therefore contains a low-frequency zero and
several high-frequency poles. A simpliﬁed example containing a single high-frequency pole is
given in Eq. (9.53) and illustrated in Fig. 9.28.
Gc(s)= Gc0
⎦
1+ s
ωz
)
⎦
1+ s
ωp
) (9.53)
The maximum phase occurs at a frequency fϕmax given by the geometrical mean of the pole and
zero frequencies:
fϕmax=
√
fz fp (9.54)
To obtain the maximum improvement in phase margin, we should design our compensator so
that the frequency fϕmax coincides with the loop gain crossover frequency fc. The value of the
phase at this frequency can be shown to be
∠Gc
⎦
fϕmax
)
= tan−1
⎛⎜⎜⎜⎜⎜⎜⎜⎝
1
2
√
fp
fz
−1
2
√
fz
fp
⎞⎟⎟⎟⎟⎟⎟⎟⎠ (9.55)
This equation is plotted in Fig. 9.29. Equation (9.55) can be inverted to obtain
fp
fz
= 1+ sin(θ)
1−sin(θ) (9.56)
where θ=∠Gc( fϕmax). Equations (9.55) and (9.53) imply that, to optimally obtain a compen-
sator phase lead ofθat frequency fc, the pole and zero frequencies should be chosen as follows:

9.5 Regulator Design 379
1 10 100 1000
Maximum
phase lead
0
15
30
45
60
75
90
fp / fz
Fig. 9.29 Maximum phase leadθvs. frequency ratio fp/ fz for the lead compensator
fz= fc
√
1−sin(θ)
1+ sin(θ)
fp= fc
√
1+ sin(θ)
1−sin(θ)
(9.57)
When it is desired to avoid changing the crossover frequency, the magnitude of the compen-
sator gain is chosen to be unity at the loop gain crossover frequency fc. This requires that Gc0
be chosen according to the following formula:
Gc0=
√
fz
fp
(9.58)
It can be seen that Gc0 is less than unity, and therefore the lead compensator reduces the dc
gain of the feedback loop. Other choices of Gc0 can be selected when it is desired to shift the
crossover frequency fc; for example, increasing the value ofGc0 causes the crossover frequency
to increase. If the frequencies fp and fz are chosen as in Eq. (9.57), then fϕmax of Eq. (9.53) will
coincide with the new crossover frequency fc.
The Bode diagram of a typical loop gainT(s) containing two poles is illustrated in Fig.9.30.
The phase margin of the original T(s) is small, since the crossover frequency fc is substantially
greater than the pole frequency f0. The result of adding a lead compensator is also illustrated.
The lead compensator of this example is designed to maintain the same crossover frequency but
improve the phase margin.

380 9 Controller Design
f
0
 T
 T
T0
f0
0
fz
fc
m
T0 Gc0 Original gain
Compensated gain
Original phase asymptotes
Compensated phase asymptotes
0 dB
20 dB
40 dB
60 dB
fp
|| T ||
|| T ||
Fig. 9.30 Compensation of a loop gain containing two poles, using a lead (PD) compensator. The phase
marginϕm is improved
9.5.2 Lag ( PI) Compensator
This type of compensator is used to increase the low-frequency loop gain, such that the output
is better regulated at dc and at frequencies well below the loop crossover frequency. As given
in Eq. (9.59) and illustrated in Fig.9.31, an inverted zero is added to the loop gain, at frequency
fL.
Gc(s)= Gc∞
⎦
1+ωL
s
)
(9.59)
If fL is suﬃciently lower than the loop crossover frequency fc, then the phase margin is un-
changed. This type of compensator is also called a proportional-plus-integral,o r PI, controller.
At low frequencies, the inverted zero causes the compensator to integrate the error signal.
To the extent that the compensator gain can be made arbitrarily large at dc, the dc loop gain
T(0) becomes arbitrarily large. This causes the dc component of the error signal to approach
zero. In consequence, the steady-state output voltage is perfectly regulated, and the disturbance-
to-output transfer functions approach zero at dc. Such behavior is easily obtained in practice,
with the compensator of Eq. (9.59) realized using a conventional operational ampliﬁer.
Although the PI compensator is useful in nearly all types of feedback systems, it is an
especially simple and eﬀective approach for systems originally containing a single pole. For the
example of Fig. 9.32, the original uncompensated loop gain is of the form
T
u(s)= Tu0⎦
1+ s
ω0
) (9.60)
The compensator transfer function of Eq. ( 9.59) is used, so that the compensated loop gain is
T(s)= Tu(s) Gc(s). Magnitude and phase asymptotes of T(s) are also illustrated in Fig. 9.32.
The compensator high-frequency gain Gc∞is chosen to obtain the desired crossover frequency

9.5 Regulator Design 381
f
Gc
 Gc
Gc
0
fL/10
+ 45 /decade
fL
10fL
|| ||
Fig. 9.31 Magnitude and phase asymptotes of the PI compensator transfer function Gc of Eq. (9.59)
0 dB
20 dB
40 dB
f
90
0
Gc Tu0
fL
f0
Tu0
 Tu
u
f0
|| T ||
|| T || fc
 T
10fL
10f0 m
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.32 Compensation of a loop gain containing a single pole, using a lag (PI) compensator. The loop
gain magnitude is increased
fc. If we approximate the compensated loop gain by its high-frequency asymptote, then at high
frequencies we can write
T
≈Tu0Gc∞⎦f
f0
) (9.61)
At the crossover frequency f= fc, the loop gain has unity magnitude. Equation (9.61) predicts
that the crossover frequency is
fc≈Tu0Gc∞f0 (9.62)

382 9 Controller Design
0 dB
20 dB
40 dB
f
Gc Tu0
fL f0
T
fc
1
1+ T
fL f0
1
Gc Tu0
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
|| ||
Fig. 9.33 Construction of∥1/(1+ T)∥, for the PI-compensated example of Fig. 9.32
Hence, to obtain a desired crossover frequency fc, we should choose the compensator gain Gc∞
as follows:
Gc∞= fc
Tu0 f0
(9.63)
The corner frequency fL is then chosen to be suﬃciently less than fc, such that an adequate
phase margin is maintained.
Magnitude asymptotes of the quantity 1/(1+ T(s)) are constructed in Fig. 9.33. At frequen-
cies less than fL,t h ePI compensator improves the rejection of disturbances. At dc, where the
magnitude of Gc approaches inﬁnity, the magnitude of 1/(1+T) tends to zero. Hence, the closed-
loop disturbance-to-output transfer functions, such as Eqs. (9.51) and (9.52), tend to zero at dc.
9.5.3 Combined ( PID) Compensator
The advantages of the lead and lag compensators can be combined, to obtain both wide band-
width and zero steady-state error. At low frequencies, the compensator integrates the error sig-
nal, leading to large low-frequency loop gain and accurate regulation of the low-frequency com-
ponents of the output voltage. At high frequency (in the vicinity of the crossover frequency),
the compensator introduces phase lead into the loop gain, improving the phase margin. Such a
compensator is sometimes called a PID controller.
A typical Bode diagram of a practical version of this compensator is illustrated in Fig. 9.34.
The compensator has transfer function
G
c(s)= Gcm
⎦
1+ωL
s
) ⎦
1+ s
ωz
)
⎦
1+ s
ωp1
)⎦
1+ s
ωp2
) (9.64)
The inverted zero at frequency fL functions in the same manner as the PI compensator. The
zero at frequency fz adds phase lead in the vicinity of the crossover frequency, as in the PD

9.5 Regulator Design 383
0 dB
20 dB
40 dB
f
 Gc
Gc|||| Gc|||| Gc
Gcm
fz
fp1
90
0
fz /10
fp1/10
10fz
fL
fc
fL /10
10fL
90 /decade
45 /decade
/decade
fp2
fp2 /10
10fp1
Fig. 9.34 Magnitude and phase asymptotes of the combined (PID) compensator transfer function Gc of
Eq. (9.64)
compensator. The high-frequency poles at frequencies fp1 and fp2 must be present in practical
compensators, to cause the gain to roll oﬀat high frequencies and to prevent the switching ripple
from disrupting the operation of the pulse-width modulator. The loop gain crossover frequency
fc is chosen to be greater than fL and fz, but less than fp1 and fp2.
9.5.4 Design Example
To illustrate the design of PI and PD compensators, let us consider the design of a combined
PID compensator for the dc–dc buck converter system of Fig. 9.35. The input voltage vg(t)f o r
this system has nominal value 28 V . It is desired to supply a regulated 15 V to a 5 A load. The
load is modeled here with a 3Ωresistor. An accurate 5 V reference is available.
The ﬁrst step is to select the feedback gainH(s). The gain H is chosen such that the regulator
produces a regulated 15 V dc output. Let us assume that we will succeed in designing a good
feedback system, which causes the output voltage to accurately follow the reference voltage.
This is accomplished via a large loop gain T, which leads to a small error voltage: ve ≈0.
Hence, Hv≈vre f So we should choose
H= Vre f
V = 5
15= 1
3 (9.65)
The quiescent duty cycle is given by the steady-state solution of the converter:
D= V
Vg
= 15
28= 0.536 (9.66)
The quiescent value of the control voltage, Vc, must satisfy Eq. (7.85). Hence,
Vc= DVM = 2.14 V (9.67)
Thus, the quiescent conditions of the system are known. It remains to design the compensator
gain Gc(s).

384 9 Controller Design
+
+
v(t)vg(t)
28 V
+
Compensator
HvPulse-width
modulator
vc
Transistor
gate driver
Gc(s)
H(s)
ve
Error
signal
Sensor
gain
iload
L
50 μH
C
500 μF
R
3 
fs = 100 kHz
VM = 4 V vref
5 V
Fig. 9.35 Design example
Fig. 9.36 System small-signal ac model, design example
A small-signal ac model of the regulator system is illustrated in Fig. 9.36. The buck con-
verter ac model is represented in canonical form. Disturbances in the input voltage and in the
load current are modeled. For generality, reference voltage variations ˆ vre f are included in the
diagram; in a dc voltage regulator, these variations are normally zero.

9.5 Regulator Design 385
The open-loop converter transfer functions are discussed in the previous chapters. The open-
loop control-to-output transfer function is
Gvd(s)= V
D
1
1+ s L
R+ s2LC
(9.68)
The open-loop control-to-output transfer function contains two poles, and can be written in the
following normalized form:
Gvd(s)= Gd0
1
1+ s
Q0ω0
+
⎦s
ω0
)2 (9.69)
By equating like coeﬃcients in Eqs. (9.68) and ( 9.69), one ﬁnds that the dc gain, corner fre-
quency, and Q-factor are given by
Gd0= V
D= 28 V
f0= ω0
2π= 1
2π
√
LC
= 1 kHz (9.70)
Q0= R
√
C
L= 9.5⇒19.5d B
In practice, parasitic loss elements, such as the capacitor equivalent series resistance ( esr),
would cause a lower Q-factor to be observed. Figure 9.37 contains a Bode diagram of Gvd(s).
0 dB
20 dB
40 dB
f
 T |||| T0 = 8.6 18.7 dB
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
Fig. 9.37 Converter small-signal control-to-output transfer function Gvd, design example

386 9 Controller Design
The open-loop line-to-output transfer function is
Gvg(s)= D 1
1+ s L
R+ s2LC
(9.71)
This transfer function contains the same poles as inGvd(s), and can be written in the normalized
form
Gvg(s)= Gg0
1
1+ s
Q0ω0
+
⎦s
ω0
)2 (9.72)
with Gg0= D. The open-loop output impedance of the buck converter is
Zout(s)= R


1
sC

sL= sL
1+ s L
R+ s2LC
(9.73)
Use of these equations to represent the converter in block-diagram form leads to the com-
plete system block diagram of Fig. 9.38. The loop gain of the system is
T(s)= Gc(s)
⎦1
VM
)
Gvd(s)H(s) (9.74)
Substitution of Eq. (9.69)i n t o(9.74) leads to
T(s)=
⎦Gc(s)H(s)
VM
) ⎦V
D
) 1⎛⎜⎜⎜⎜⎜⎝1+ s
Q0ω0
+
⎦s
ω0
)2⎞⎟⎟⎟⎟⎟⎠
(9.75)
The closed-loop disturbance-to-output transfer functions are given by Eqs. (9.5) and (9.6).
Fig. 9.38 System block diagram, design example
```
