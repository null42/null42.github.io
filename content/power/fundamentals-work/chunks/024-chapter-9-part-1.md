---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第9章part 1 - 9 Controller Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 358-377 > Chunk ID: `chapter-9-part-1`"
---

# 第9章part 1 - 9 Controller Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 358-377  
> Chunk ID: `chapter-9-part-1`

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
9
Controller Design
9.1 Introduction
In all switching converters, the output voltagev(t) is a function of the input line voltagevg(t), the
duty cycle d(t), and the load current iload(t), as well as the converter circuit element values. In
a dc–dc converter application, it is desired to obtain a constant output voltage v(t)= V, in spite
of disturbances in vg(t) and iload(t), and in spite of variations in the converter circuit element
values. The sources of these disturbances and variations are many, and a typical situation is
illustrated in Fig. 9.1. The input voltage vg(t)o fa noﬀ-line power supply may typically contain
periodic variations at the second harmonic of the ac power system frequency (100 Hz or 120
Hz), produced by a rectiﬁer circuit. The magnitude of vg(t) may also vary when neighboring
power system loads are switched on or oﬀ. The load current iload(t) may contain variations of
signiﬁcant amplitude, and a typical power supply speciﬁcation is that the output voltage must
remain within a speciﬁed range (for example, 3 .3V± 0.05 V) when the load current takes a
step change from, for example, full rated load current to 50% of the rated current, and vice
versa. The values of the circuit elements are constructed to a certain tolerance, and so in high-
volume manufacturing of a converter, converters are constructed whose output voltages lie in
some distribution. It is desired that essentially all of this distribution fall within the speciﬁed
range; however, this is not practical to achieve without the use of negative feedback. Similar
considerations apply to inverter applications, except that the output voltage is ac.
So we cannot expect to simply set the dc–dc converter duty cycle to a single value, and
obtain a given constant output voltage under all conditions. The idea behind the use of negative
feedback is to build a circuit that automatically adjusts the duty cycle as necessary, to obtain
the desired output voltage with high accuracy, regardless of disturbances in vg(t)o r iload(t)o r
variations in component values. This is a useful thing to do whenever there are variations and
unknowns that otherwise prevent the system from attaining the desired performance.
A block diagram of a feedback system is shown in Fig. 9.2. The output voltage v(t)i sm e a -
sured, using a “sensor” with gain H(s). In a dc voltage regulator or dc–ac inverter, the sensor
circuit is usually a voltage divider, comprised of precision resistors. The sensor output signal
H(s)v(s) is compared with a reference input voltage vre f (s). The objective is to make H(s)v(s)
equal to vre f (s), so that v(s) accurately follows vre f (s) regardless of disturbances or component
variations in the compensator, pulse-width modulator, gate driver, or converter power stage.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_9
347

348 9 Controller Design
(a)
+
+
v(t)vg(t)
Switching converter Load
Pulse-width
modulator
vc(t)
Transistor
gate driver
(t)
iload(t
(t)
TsdTs t
(b)
v(t)
)
vg(t)
iload(t)
d(t)
Switching converter
Disturbances
Control input
}
}
v(t)= f(vg, i load,d )
Fig. 9.1 The output voltage of a typical switching converter is a function of the line input voltagevg,t h e
duty cycle d, and the load current iload:( a) open-loop buck converter; (b) functional diagram illustrating
dependence of v on the independent quantities vg, d,a n diload
The diﬀerence between the reference input vre f (s) and the sensor output H(s)v(s) is called
the error signal ve(s). If the feedback system works perfectly, then vre f (s) = H(s)v(s), and
hence the error signal is zero. In practice, the error signal is usually nonzero but nonetheless
small. Obtaining a small error is one of the objectives in adding a compensator network G
c(s)
as shown in Fig. 9.2. Note that the transfer function from the error signal ve(s) to the output
voltage v(s) is equal to the gains of the compensator, pulse-width modulator, and converter
power stage. If the compensator gain Gc(s) is large enough in magnitude, then a small error
signal can produce the required output voltage v(t)= V for a dc regulator ( Q: how should H
and vre f then be chosen?). So a large compensator gain leads to a small error, and therefore the
output follows the reference input with good accuracy. This is the key idea behind feedback
systems.
The averaged small-signal converter models derived in Chap.7 are used in the following sec-
tions to ﬁnd the eﬀects of feedback on the small-signal transfer functions of the regulator. The
loop gain T(s) is deﬁned as the product of the small-signal gains in the forward and feedback
paths of the feedback loop. It is found that the transfer function from a disturbance to the output
is multiplied by the factor 1/(1+ T(s)). Hence, when the loop gain T is large in magnitude,
then the inﬂuence of disturbances on the output voltage is small. A large loop gain also causes
the output voltage v(s) to be nearly equal to v
re f (s)/H(s), with very little dependence on the

9.1 Introduction 349
(a)
+
+
vvg
Switching converterPower
input
Load
+
Compensator
vref
Reference
input
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
(b)
vref
Reference
input
vcve(t)
Error
signal
Sensor
gain
v(t)
vg(t)
iload(t)
d(t)
Switching converter
Disturbances
Control input
}
}+ Pulse-width
modulatorCompensator
v(t)= f(vg, i load,d )
Fig. 9.2 Feedback loop for regulation of the output voltage: (a) buck converter, with feedback loop block
diagram; (b) functional block diagram of the feedback system
gains in the forward path of the feedback loop. So the loop gain magnitude ∥ T∥ is a measure
of how well the feedback system works. All of these gains can be easily constructed using the
algebra-on-the-graph method; this allows easy evaluation of important closed-loop performance
measures, such as the output voltage ripple resulting from 120 Hz rectiﬁcation ripple in vg(t)o r
the closed-loop output impedance.
Stability is another important issue in feedback systems. Adding a feedback loop can cause
an otherwise well-behaved circuit to exhibit oscillations, ringing and overshoot, and other unde-
sirable behavior. An in-depth treatment of stability is beyond the scope of this book; however,
the simple phase margin criterion for assessing stability is used here. When the phase margin
of the loop gain T is positive, then the feedback system is stable. Moreover, increasing the
phase margin causes the system transient response to be better behaved, with less overshoot and
ringing. The relation between phase margin and closed-loop response is quantiﬁed in Sect. 9.4.
An example is given in Sect. 9.5, in which a compensator network is designed for a dc reg-
ulator system. The compensator network is designed to attain adequate phase margin and good

350 9 Controller Design
rejection of expected disturbances. Lead compensators andP–D controllers are used to improve
the phase margin and extend the bandwidth of the feedback loop. This leads to better rejection
of high-frequency disturbances. Lag compensators and P–I controllers are used to increase the
low-frequency loop gain. This leads to better rejection of low-frequency disturbances and very
small steady-state error. More complicated compensators can achieve the advantages of both
approaches.
Injection methods for experimental measurement of loop gain are introduced in Sect. 9.6.
The use of voltage or current injection solves the problem of establishing the correct quiescent
operating point in high-gain systems. Conditions for obtaining an accurate measurement are
exposed. The injection method also allows measurement of the loop gains of unstable systems.
9.2 Eﬀect of Negative Feedback on the Network Transfer Functions
We have seen how to derive the small-signal ac transfer functions of a switching converter. For
example, the equivalent circuit model of the buck converter can be written as in Fig. 9.3.T h i s
equivalent circuit contains three independent inputs: the control input variations ˆd, the power
input voltage variations ˆvg, and the load current variations ˆiload. The output voltage variation ˆv
can therefore be expressed as a linear combination of the three independent inputs, as follows:
ˆv(s)= Gvd(s) ˆd(s)+ Gvg(s)ˆvg(s)−Zout(s) ˆi load(s) (9.1)
where
Gvd(s)= ˆv(s)
ˆd(s)
⏐⏐⏐
⏐⏐⏐
ˆvg=0
ˆiload=0
converter control-to-output transfer function (9.1a)
Gvg(s)= ˆv(s)
ˆvg(s)
⏐⏐
⏐⏐⏐
⏐
ˆd=0
ˆiload=0
converter line-to-output transfer function (9.1b)
Zout(s)=−ˆv(s)
ˆiload(s)
⏐⏐
⏐⏐⏐
⏐
ˆvg=0
ˆd=0
converter output impedance (9.1c)
The Bode diagrams of these quantities are constructed in Chap.8. Equation (9.1) describes how
disturbances vg and iload propagate to the output v, through the transfer function Gvg(s) and the
output impedance Zout(s). If the disturbances vg and iload are known to have some maximum
worst-case amplitude, then Eq. (9.1) can be used to compute the resulting worst-case open-loop
variation in v.
As described previously, the feedback loop of Fig. 9.2 can be used to reduce the inﬂuences
of vg and iload on the output v. To analyze this system, let us perturb and linearize its aver-
aged signals about their quiescent operating points. Both the power stage and the control block
diagram are perturbed and linearized:
v
re f (t)= Vre f+ ˆvre f (t) (9.2)
ve(t)= Ve+ ˆve(t)
etc.

9.2 Eﬀect of Negative Feedback on the Network Transfer Functions 351
Fig. 9.3 Small-signal converter model, which represents variations in vg, d,a n diload
In a dc regulator system, the reference input is constant, so ˆvre f (t)= 0. In a switching ampliﬁer
or dc–ac inverter, the reference input may contain an ac variation. In Fig. 9.4a, the converter
model of Fig. 9.3 is combined with the perturbed and linearized control circuit block diagram.
This is equivalent to the reduced block diagram of Fig. 9.4b, in which the converter model has
been replaced by blocks representing Eq. (9.1).
Solution of Fig. 9.4b for the output voltage variation v yields
ˆv= ˆvre f
GcGvd/VM
1+ HGcGvd/VM
+ ˆvg
Gvg
1+ HGcGvd/VM
−ˆiload
Zout
1+ HGcGvd/VM
(9.3)
which can be written in the form
ˆv= ˆvre f
1
H
T
1+ T+ ˆvg
Gvg
1+ T−ˆiload
Zout
1+ T (9.4)
with
T(s)= H(s)Gc(s)Gvd(s)/VM = “loop gain”
Equation (9.4) is a general result. The loop gain T(s) is deﬁned in general as the product of the
gains around the forward and feedback paths of the loop. This equation shows how the addition
of a feedback loop modiﬁes the transfer functions and performance of the system, as described
in detail below.
9.2.1 Feedback Reduces the Transfer Functions from Disturbances to the Output
The transfer function from vg to v in the open-loop buck converter of Fig.9.3 is Gvg(s), as given
in Eq. (9.1). When feedback is added, this transfer function becomes
ˆv(s)
ˆvg(s)
⏐⏐
⏐
⏐⏐⏐
ˆvre f=0
ˆiload=0
= Gvg(s)
1+ T(s) (9.5)
from Eq. (9.4). So this transfer function is reduced via feedback by the factor 1/(1+T(s)). If the
loop gain T(s) is large in magnitude, then the reduction can be substantial. Hence, the output
voltage variation v resulting from a given vg variation is attenuated by the feedback loop.

352 9 Controller Design
Fig. 9.4 V oltage regulator system small-signal model: (a) with converter equivalent circuit; (b) complete
block diagram
Equation (9.4) also predicts that the converter output impedance is reduced, from Zout(s)t o
ˆv(s)
−ˆiload(s)
⏐⏐⏐⏐
⏐
⏐
ˆvg=0
ˆvre f=0
= Zout(s)
1+ T(s) (9.6)
So the feedback loop also reduces the converter output impedance by a factor of 1/(1+ T(s)),
and the inﬂuence of load current variations on the output voltage is reduced.

9.3 Construction of 1/(1+ T)a n dT/(1+ T) 353
9.2.2 Feedback Causes the Transfer Function from the Reference Input to the Output
to Be Insensitive to Variations in the Gains in the Forward Path of the Loop
According to Eq. (9.4), the closed-loop transfer function from vre f to v is
ˆv(s)
ˆvre f (s)
⏐⏐
⏐⏐⏐
⏐
ˆvg=0
ˆiload=0
= 1
H(s)
T(s)
1+ T(s) (9.7)
If the loop gain is large in magnitude, that is, ∥ T∥≫ 1, then (1+ T)≈T and T/(1+ T)≈
T/T= 1. The transfer function then becomes
ˆv(s)
ˆvre f (s)≈1
H(s) (9.8)
which is independent of Gc(s), VM, and Gvd(s). So provided that the loop gain is large in mag-
nitude, then variations in Gc(s), VM, and Gvd(s) have negligible eﬀect on the output voltage. Of
course, in the dc regulator application, vre f (t) is constant and ˆvre f = 0. But Eq. ( 9.8) applies
equally well to the dc values. For example, if the system is linear, then we can write
V
Vre f
= 1
H(0)
T(0)
1+ T(0)≈1
H(0) (9.9)
So to make the dc output voltageV accurately follow the dc referenceVre f′ we need only ensure
that the dc sensor gain H(0) and dc reference Vre f are well known and accurate, and thatT(0) is
large. Precision resistors are normally used to realizeH, but components with tightly controlled
values need not be used in Gc, the pulse-width modulator, or the power stage. The sensitivity of
the output voltage to the gains in the forward path is reduced, while the sensitivity of v to the
feedback gain H and the reference input vre f is increased.
9.3 Construction of the Important Quantities 1/(1+ T)a n dT/(1+ T)
and the Closed-Loop Transfer Functions
The transfer functions in Eqs. (9.4)t o( 9.9) can be easily constructed using the algebra-on-the-
graph method [81]. Let us assume that we have analyzed the blocks in our feedback system, and
have plotted the Bode diagram of∥ T(s)∥. To use a concrete example, suppose that the result is
given in Fig. 9.5,f o rw h i c hT(s)i s
T(s)= T0
⎦
1+ s
ωz
)
⎛⎜⎜⎜⎜⎜⎝1+ s
Qωp1.
+
⎦ s
ωp1
)2⎞⎟⎟⎟⎟⎟⎠
⎦
1+ s
ωp2
) (9.10)
This example appears somewhat complicated. But the loop gains of practical voltage regulators
are often even more complex, and may contain four, ﬁve, or more poles. Evaluation of Eqs. (9.5)

354 9 Controller Design
fp1
QdB| T0 |dB
fz
fc fp2
Crossover
frequency
f
|| T ||
0 dB
20 dB
40 dB
60 dB
80 dB
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.5 Magnitude of the loop gain example, Eq. (9.10)
to (9.7), to determine the closed-loop transfer functions, requires quite a bit of work. The loop
gain T must be added to 1, and the resulting numerator and denominator must be refactored.
Using this approach, it is diﬃcult to obtain physical insight into the relationship between the
closed-loop transfer functions and the loop gain. In consequence, design of the feedback loop
to meet speciﬁcations is diﬃcult.
Using the algebra-on-the-graph method, the closed-loop transfer functions can be con-
structed by inspection, and hence the relation between these transfer functions and the loop gain
becomes obvious. Let us ﬁrst investigate how to plot∥T/(1+ T)∥. It can be seen from Fig. 9.5
that there is a frequency f
c, called the “crossover frequency,” where∥T∥= 1. At frequencies
less than fc,∥T∥> 1; indeed,∥T∥≫ 1f o r f≪ fc. Hence, at low frequency, (1+ T)≈T, and
T/(1+ T)≈T/T= 1. At frequencies greater than fc,∥T∥< 1, and∥T∥≪ 1f o r f≫ fc.S oa t
high frequency, (1+ T)≈1 and T/(1+ T)≈T/1= T.S ow eh a v e
T
1+ T ≈
{1f o r∥T∥≫ 1
T for∥T∥≪ 1 (9.11)
The asymptotes corresponding to Eq. (9.11) are relatively easy to construct. The low-frequency
asymptote, for f< fc, is 1 or 0 dB. The high-frequency asymptotes, for f> fc, follow T.T h e
result is shown in Fig. 9.6.
So at low frequency, where∥ T∥ is large, the reference-to-output transfer function is
ˆv(s)
ˆvre f (s)= 1
H(s)
T(s)
1+ T(s)≈1
H(s) (9.12)
This is the desired behavior, and the feedback loop works well at frequencies where ∥ T∥ is
large. At high frequency (f≫ fc) where∥ T∥ is small, the reference-to-output transfer function
is
ˆv(s)
ˆvre f (s)= 1
H(s)
T(s)
1+ T(s)≈T(s)
H(s)= Gc(s)Gvd(s)
VM
(9.13)

9.3 Construction of 1/(1+ T)a n dT/(1+ T) 355
fp1
fz
fc
fp2
Crossover
frequency
f
|| T ||
0 dB
20 dB
40 dB
60 dB
80 dB
T
1+ T
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
Fig. 9.6 Graphical construction of the asymptotes of∥T/(1+ T)∥. Exact curves are omitted
This is not the desired behavior; in fact, this is the gain with the feedback connection removed
(H→0). At high frequencies, the feedback loop is unable to reject the disturbance because the
bandwidth of T is limited. The reference-to-output transfer function can be constructed on the
graph by multiplying the T/(1+ T) asymptotes of Fig. 9.6 by 1/H.
Thus, the crossover frequency fc represents the bandwidth of the feedback system, and
within this bandwidth the closed-loop behavior is improved. Further, it can be observed from
Fig. 9.6 that feedback moves the poles of the system:T contains two poles at frequency fp1 that
are not present in T/(1+ T), and instead T/(1+ T) contains a pole at frequency fc. It can be
shown that one of the poles of T is moved from frequency fp1 to approximately fz, where it
cancels the zero. The second pole at fp1 is moved to approximately fc. Figure 9.6 illustrates
how, within the bandwidth of the feedback loop, the frequencies of the poles are increased and
their Q–factors are changed.
We can plot the asymptotes of ∥1/(1+ T)∥ using similar arguments. At low frequencies
where∥T∥≫ 1, then (1+ T)≈T, and hence 1/(1+ T)≈1/T At high frequencies where
∥T∥≪ 1, then (1+ T)≈1 and 1/(1+ T)≈1. So we have
1
1+ T(s)≈
⎧⎪⎪⎪⎨⎪⎪⎪
⎩
1T(s) for

T

≫ 1
1f o r
T
≪ 1
(9.14)
The asymptotes for the T(s) example of Fig. 9.5 are plotted in Fig. 9.7.
At low frequencies where∥ T∥ is large, the disturbance transfer function from v
g to v is
ˆv(s)
ˆvg(s)= Gvg(s)
1+ T(s)≈Gvg(s)
T(s) (9.15)
Again, Gvg(s) is the original transfer function, with no feedback. The closed-loop transfer func-
tion has magnitude reduced by the factor 1/∥T∥. So if, for example, we want to reduce this trans-
fer function by a factor of 20 at 120 Hz, then we need a loop gain∥ T∥ of at least 20⇒26 dB
at 120 Hz. The disturbance transfer function from vg to v can be constructed on the graph, by
multiplying the asymptotes of Fig. 9.7 by the asymptotes for Gvg(s).

356 9 Controller Design
fp1
QdB|T0 |dB
fz
fc fp2
Crossover
frequency
|| T ||
0 dB
20 dB
40 dB
60 dB
80 dB
f
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
QdB
| T0 |dB fp1
fz
1
1+ T
+ 40 dB/decade
+ 20 dB/decade
Fig. 9.7 Graphical construction of∥1/(1+ T)∥
Similar arguments apply to the output impedance. The closed-loop output impedance at low
frequencies is
ˆv(s)
−ˆiload(s)
= Zout(s)
1+ T(s)≈Zout(s)
T(s) (9.16)
The output impedance is also reduced in magnitude by a factor of 1/∥T∥ at frequencies below
the crossover frequency.
At high frequencies ( f> fc) where∥ T∥ is small, then 1/(1+ T)≈1, and
ˆv(s)
ˆvg(s)= Gvg(s)
1+ T(s)≈Gvg(s)
ˆv(s)
−ˆiload(s)
= Zout(s)
1+ T(s)≈Zout(s)
(9.17)
This is the same as the original disturbance transfer function and output impedance. So the
feedback loop has essentially no eﬀect on the disturbance transfer functions at frequencies above
the crossover frequency.
Figure 9.8a illustrates an example of a buck converter having a loop gain T(s) given by
T(s)= H(s)Gvd(s)/VM (9.18)
This simple example contains no compensator. The L–C ﬁlter of the buck converter introduces
resonant poles at frequency f = fp1, and the capacitor equivalent series resistance RC leads
to a zero at frequency fz. The feedback sensor block H(s) contains a high-frequency pole at
f= fp2. Hence, this example exhibits a loop gainT(s) identical to Eq. (9.10); let us assume that
the element values lead to the magnitude plotted in Fig. 9.5. Hence, the quantity∥1/(1+ T)∥ is
given by the plot of Fig. 9.7.

9.3 Construction of 1/(1+ T)a n dT/(1+ T) 357
Fig. 9.8 Construction of the closed-loop output impedance of a simple buck regulator: ( a) feedback
system, (b) open-loop (solid line) and closed-loop (dashed line) output impedance asymptotes
We can construct the Bode plot of the open-loop output impedance Zout by setting ˆvg and ˆd
to zero in Fig. 9.8a and then ﬁnding the impedance between the output terminals; the result is:
Zout(s)= sL
 R

⎦
RC+ 1
sC
)
(9.19)
The approximate Bode diagram of the open-loop output impedance is constructed in Fig. 9.8b,
for the typical case withRC ≪ R. The closed-loop output impedance is next constructed by mul-
tiplying the open-loop output impedance of Fig. 9.8bb yt h e∥1/(1+ T)∥ asymptotes of Fig. 9.7,
with the result illustrated in Fig. 9.8b. At frequencies greater than the crossover frequency fc,

358 9 Controller Design
the output impedance is unaﬀected by the feedback loop. At frequencies immediately below
fc, the feedback loop reduces the output impedance and the ∥1/(1+ T)∥ term introduces a
+ 20 dB/decade slope to∥Zout/(1+ T)∥.A t f = fz, the zero of Zout is cancelled by the pole of
1/(1+ T), and hence no change in slope is observed in the closed-loop output impedance plot.
Likewise, at f= fp1, the resonant poles ofZout are cancelled by the resonant zeroes of 1/(1+T),
and again there is no change in the slope of ∥Zout/(1+ T)∥. These cancellations occur because
the power stage circuit introduces the same poles into Gvd(s) and Zout(s).
Another example is given later in this chapter, in which a feedback compensator circuit
introduces poles and zeroes into T(s) that are not present in Zout(s). As a result, the closed-
loop output impedance exhibits poles and zeroes induced by the compensator dynamics within
∥1/(1+ T)∥.
9.4 Stability
It is well known that adding a feedback loop can cause an otherwise stable system to become
unstable. Even though the transfer functions of the original converter, Eq. ( 9.1), as well as of
the loop gain T(s), contain no right half-plane poles, it is possible for the closed-loop transfer
functions of Eq. (9.4) to contain right half-plane poles. The feedback loop then fails to regulate
the system at the desired quiescent operating point, and oscillations are usually observed. It is
important to avoid this situation. And even when the feedback system is stable, it is possible
for the transient response to exhibit undesirable ringing and overshoot. The stability problem
is discussed in this section, and a method for ensuring that the feedback system is stable and
well-behaved is explained.
When feedback destabilizes the system, the denominator (1+T(s)) terms in Eq. (9.4) contain
roots in the right half-plane (i.e., with positive real parts). If T(s) is a rational fraction, that is,
the ratio N(s)/D(s) of two polynomial functions N(s) and D(s), then we can write
T(s)
1+ T(s)=
N(s)
D(s)
1+ N(s)
D(s)
= N(s)
N(s)+ D(s)
1
1+ T(s)= 1
1+ N(s)
D(s)
= D(s)
N(s)+ D(s)
(9.20)
So T(s)/(1+T(s)) and 1/(1+T(s)) contain the same poles, given by the roots of the polynomial
(N(s)+ D(s)). A brute-force test for stability is to evaluate (N(s)+ D(s)), and factor the result to
see whether any of the roots have positive real parts. However, for all but very simple loop gains,
this involves a great deal of work. A more illuminating method is given by the Nyquist stability
theorem, in which the number of right half-plane roots of ( N(s)+ D(s)) can be determined
by testing T(s)[ 82, 83]. This theorem is discussed in Sect. 9.4.2. Often, a special case of the
theorem known as the phase margin test is suﬃcient for designing most voltage regulators; the
simpler phase margin test is discussed ﬁrst.

9.4 Stability 359
9.4.1 The Phase Margin Test
The crossover frequency fc is deﬁned as the frequency where the magnitude of the loop gain is
unity:

T ( j2πf
c)

= 1⇒0 dB (9.21)
To compute the phase marginϕ
m, the phase of the loop gain T is evaluated at the crossover
frequency, and 180◦is added. Hence,
ϕm= 180◦+∠T( j2πfc) (9.22)
If there is exactly one crossover frequency, and if the loop gainT(s) contains no right half-plane
poles, then the quantities 1/(1 + T) and T/(1 + T) contain no right half-plane poles when
the deﬁned in Eq. ( 9.22) is positive. Thus, using a simple test on T(s), we can determine the
stability of T/(1+ T) and 1/(1+ T). This is an easy-to-use design tool—we simply ensure that
the phase of T is greater than−180◦at the crossover frequency.
When there are multiple crossover frequencies, the phase margin test may be ambiguous.
Also, when T contains right half-plane poles (i.e., the original open-loop system is unstable),
then the phase margin test cannot be used. In either case, the more general Nyquist stability
theorem (Sect. 9.4.2) must be employed.
The loop gain of a typical stable system is shown in Fig.9.9. It can be seen that∠T( j2πfc)=
−112◦. Hence, ϕm = 180◦−112◦=+ 68◦. Since the phase margin is positive, T/(1+ T) and
1/(1+ T) contain no right half-plane poles, and the feedback system is stable.
The loop gain of an unstable system is sketched in Fig.9.10. For this example,∠T( j2πfc)=
−230◦. The phase margin isϕm= 180◦−230◦=−50◦. The negative phase margin implies that
T/(1+ T) and 1/(1+ T) each contain at least one right half-plane pole.
fc
Crossover
frequency
0 dB
20 dB
40 dB
60 dB
f
fp1
fz
0
m
 T
 T T
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
 T
Fig. 9.9 Magnitude and phase of the loop gain of a stable system. The phase marginϕm is positive

360 9 Controller Design
fc
Crossover
frequency
0 dB
20 dB
40 dB
60 dB
f
fp1
fp2 0 T
 T
m (< 0)
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
 T T
Fig. 9.10 Magnitude and phase of the loop gain of an unstable system. The phase marginϕm is negative
9.4.2 The Nyquist Stability Criterion
The Nyquist Stability Criterion is a rigorous and general technique to evaluate stability of a
closed-loop system, based on its loop gain. This technique determines the number of poles of
the closed-loop transfer functionsT/(1+T) and 1/(1+T) that lie in the right half of the complex
s-plane, based on a plot of the loop gain T(s) that can be derived from its Bode plot. The phase
margin test of Sect. 9.4.1 is based on the Nyquist plot, and is a useful but not entirely general
test for stability. In some cases, including several encountered later in this textbook, the more
general Nyquist stability test must be employed.
The Nyquist Stability Criterion is based on the conformal mapping of a contour Γthat
encloses the right half (positive real portion) of the complex s-plane. The contour is mapped
through the loop gain transfer function T(s). Encirclements of the −1 point by the mapped
contour are employed to count the number of right half-plane poles that are present in the
closed-loop transfer functions. The subsections below present a derivation, the precise rules for
application, and some important examples.
The Principle of the Argument
Let us consider a transfer function T(s) having a zero at s= s
1:
T(s)= (s−s1) (9.23)
Let us also consider a closed contour Γin the complex s-plane that encircles the point s1 as
illustrated in Fig. 9.11a. The complex variable s is varied to follow the path Γ, beginning at
some point a and proceeding around the contour in the clockwise direction through points b, c,
and back to a. For the example T(s)o fE q . (9.23), the value of T(s) at some point s is seen to
be the vector extending from s1 to s, having magnitude and phase as illustrated in Fig. 9.11a.

9.4 Stability 361
(a)
Re(s)
Im(s)
s1
Contour
a
b
c
(b)
Re(T(s))
Im(T(s))
T ()
(c)
s0 ab c a
Position along
ContourT
T T T T
Fig. 9.11 Principle of the argument, example 1: ( a) a closed contour Γin the complex s plane, ( b)
mapping of the contour Γthrough the transfer function T(s)o fE q . (9.23), (c) variation of the phase of
T(s), as s varies around the contourΓ
As sketched in Fig.9.11c, at s= a the phase∠T is 0◦.A s s varies along the contour, through
b, c, and then back toa, the phase∠T decreases, and becomes−360◦after one complete traverse
of contourΓ. This net phase change of−360◦indicates that the zero at s1 lies inside contourΓ.
Figure 9.11b contains a plot of T(s)a s s varies around the contour Γ; the magnitude∥T∥
and phase ∠T are identiﬁed and are identical to the quantities identiﬁed in Fig. 9.11a. This
plot is a conformal mapping of the contour Γthrough the transfer function T(s); conformal
mappings preserve local angles. The mapped contourT(Γ) encircles the origin of theT(s) plane,
as indicated by the net change of−360◦in∠T(s).
Figure 9.12a illustrates a second contourΓ′ that does not enclose the zero of T(s)a t s1.A s
illustrated in Fig. 9.12c, after one complete traverse of contourΓ′, the net change in∠T is zero.
The mapped contour T(Γ′) is illustrated in Fig. 9.12b; this contour does not encircle the origin
of the T(s) plane.
The phase of a complex function is sometimes referred to as its argument. Cauchy’s princi-
ple of the argument tells us that when the closed contourΓencloses the zero s1, then the phase
∠T(s) exhibits a net change of −360◦as s traversesΓonce in the clockwise direction. This is
equivalent to saying that the mapped contour T(Γ) encircles the origin of the T plane.
Next let us consider a transfer function T(s) that contains multiple poles and zeroes:
T(s)= Tre f
(s−z1)( s−z2)···
(s−p1)( s−p2)··· (9.24)
As usual, we can express the phase of T(s) as a sum of terms that arise from each zero or pole,
as follows:

362 9 Controller Design
Fig. 9.12 Principle of the argument, example 2: ( a) a closed contour Γ′ in the complex s plane, ( b)
mapping of the contourΓ′ through the transfer function T(s)o fE q . (9.23), (c) variation of the phase of
T(s), as s varies around the contourΓ′. Since the zero at s= s1 does not lie inside contourΓ′, there is no
net change in the phase of T, and the mapped contour T(Γ′) does not encircle the origin of the T plane
∠T(s)=∠(s−z1)+∠(s−z2)+···−∠(s−p1)−∠(s−p2)−··· (9.25)
We can again deﬁne a closed contourΓin the complex s plane, and examine how the phaseT(s)
changes as s traverses the contour once in the clockwise direction. Each zero of T(s) that lies
inside the contour will cause a net change of −360◦in∠T, and each pole of T(s) lying inside
the contour will cause a net change of+360◦in∠T. If a total of Z zeroes and P poles lie inside
the contourΓ, then∠T will exhibit a net phase shift of−N360◦, where
N= Z−P (9.26)
The mapped contour T(Γ) will encircle the origin of the T(s) plane N times in the clockwise
direction.
Thus, the principle of the argument provides us with a tool to determine the number of poles
and zeroes that lie inside a contourΓ.
The Nyquist Contour
It is desired to determine whether the closed-loop transfer functions of Eq. ( 9.20) contain un-
stable poles that lie in the right half of the complex plane. To accomplish this, we can deﬁne a
contourΓthat encloses the complete right half-plane, then employ the principle of the argument
to test the number of closed-loop poles that are enclosed by this contour.

9.4 Stability 363
Fig. 9.13 The Nyquist contour, which encloses the
right half of the complex s plane
Im(s)
Re(s)
A
B
C
Figure 9.13 illustrates a contourΓcalled the Nyquist contour. This contour is traversed in
the clockwise direction, and the region enclosed to the right of the contour is the right half of the
complex s plane. The Nyquist contour is comprised of three parts. Segment Γ
A is the positive
part of the imaginary axis, in which
s= jω with ω∈(0,∞) (9.27)
SegmentΓB can be chosen to be a semicircular arc that lies to the right of all closed-loop poles,
deﬁned as follows:
s= Rejθ with R→∞and θ∈(+90◦,−90◦) (9.28)
SegmentΓC is the negative part of the imaginary axis, in which
s=−jω with ω∈(∞, 0) (9.29)
SegmentΓC is the complex conjugate of segmentΓA.
If a transfer function F(s) contains Z zeroes and P poles in the right half of the complex
plane, then the mapping F(Γ) of the Nyquist contour will encircle the origin of the F(s) plane
N= (Z−P) times.
Stability Test
The closed-loop transfer functions of Eq. (9.20) contain the denominator polynomialN(s)+D(s),
whose roots are the closed-loop poles. It is desired to test whether this polynomial contains roots
in the right half of the complex s-plane. Note from Eq. (9.20) that these roots are the zeroes of
the quantity (1+ T(s)), and additionally that the poles of (1 + T(s)) coincide with the poles
of T(s). Hence we could map the Nyquist contour of Fig. 9.13 through the transfer function
(1+ T(s)), and evaluate the number of encirclements of the origin.
In the complex plane, the quantity (1+T(s)) is simply equal to the quantityT(s) shifted to the
right by one unit. If the mapped Nyquist contour (1+T(Γ)) encircles the origin, then the contour
T(Γ) encircles the−1 point. So one could map the Nyquist contour Γof Fig. 9.13 through the
loop gain T(s) and count the number of encirclementsN of the−1 point byT(Γ). The number of
encirclements N is related to the number of poles in the right half-plane according toN= Z−P,

364 9 Controller Design
where Z is the number of right half-plane poles of the closed-loop gains T/(1+ T)o r1/(1+ T),
and P is the number of right half-plane poles present in the original loop gain T(s).
If the original open-loop system is stable, so that T(s) contains no right half-plane poles,
then P= 0. In this common case N= Z: the number of encirclements of the−1 point by T(Γ)
is equal to the number of right half-plane closed-loop poles in T/(1+ T)o r1/(1+ T).
A Basic Example
As a ﬁrst example, let us consider a loop gain T(s) having three poles:
T(s)= T0⎦
1+ s
ω1
)⎦
1+ s
ω2
)⎦
1+ s
ω3
) (9.30)
The magnitude and phase Bode plot of T(s) is sketched in Fig. 9.14 for some speciﬁc values of
T0,ω1,ω2, andω3. For this example, T(s) exhibits a crossover frequencyωc with phase margin
ϕm as illustrated.
Figure 9.15a illustrates the ﬁrst part of the Nyquist plot, in which segment ΓA deﬁned by
Eq. (9.27) is mapped through the loop gain. Since s= jωalongΓA, this amounts to a polar
plot of T( jω) that corresponds to the magnitude and phase data of the Bode plot in Fig. 9.14.
Atω= 0, the loop gain has magnitude T0 and phase 0◦, so that the Nyquist plot begins on the
positive real axis at T= T0.A sωincreases, the magnitude decreases and the phase becomes
negative as illustrated.
At the crossover frequency fc, the loop gain has magnitude 1 and phase (−180◦+ϕm). The
contour T( jω) crosses the unit circle at this point, as illustrated in Fig. 9.15a. At frequencies
above fc the magnitude continues to decrease, and the contour T( jω) tends towards the origin.
The second portion of the Nyquist contourΓB is deﬁned by Eq. (9.28). To evaluate how the
loop gain T(s) maps the contourΓB, we ﬁrst substitute s= Rejθinto Eq. (9.30):
fc
Crossover
frequency
0 dB
20 dB
40 dB
60 dB
f
fp1
0
ϕm
∠ T
∠ T||T||
||T||
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
fp2
fp3
Fig. 9.14 Bode plot of loop gain T(s) for the example of Eq. (9.30)

9.4 Stability 365
(a)
–1
Re[T(s)]
Im[T(s)]
Unit circle
f = fc
f = 0
ϕm
f
T(jω )
(b)
–1
Re[T(s)]
Im[T(s)]
T(jω )
T(–jω )
®¥
Fig. 9.15 Nyquist plot for the loop gain of Fig. 9.14:( a) mapping of the contour ΓA through the loop
gain T(s), (b) mapping of the complete Nyquist contour through the loop gain T(s)
T(Rejθ)= T0⎦
1+ Rejθ
ω1
)⎦
1+ Rejθ
ω2
)⎦
1+ Rejθ
ω3
) (9.31)
Next, we let R→∞. This causes the denominator of Eq. (9.31) to tend to inﬁnity in magnitude,
which causes the magnitude of T to tend to zero. This portion of the Nyquist plot collapses to
the origin.
The third portion of the Nyquist plot involves mapping the segmentΓC deﬁned by Eq. (9.29)
through the loop gain T(s). This portion of the Nyquist contour is a polar plot ofT(−jω), which
is the complex conjugate of T( jω). Hence this plot is easily sketched by reﬂecting the T( jω)
plot about the real axis, as illustrated in Fig. 9.15b.
We can now determine the number of encirclements of the−1 point by T(Γ). Examination
of Fig. 9.15b shows that the −1 point lies outside the contour T(Γ) and hence there are no
encirclements: N = 0. Since the original loop gain T(s) contains no right half-plane poles,
P= 0. According to Eq. ( 9.26), Z= 0 so the closed-loop transfer functions contain no right
half-plane poles, and the feedback loop is stable.
If the phase marginϕm identiﬁed in Fig.9.14 had been negative, then the contourT(Γ) would
appear as illustrated in Fig. 9.16. The plot of T( jω) crosses the unit circle in the third quadrant.
In this case, the Nyquist plot of Fig. 9.16b encircles the−1 point twice: N= 2. Hence Z= 2
and the closed-loop transfer functions contain two RHP poles. The feedback loop is unstable.
For this example, the original T(s) contained three poles in the left half of the complex s-plane;
in the closed-loop transfer function T/(1+ T), two of these poles have moved into the right
half-plane, while one pole remains in the left half of the complex s-plane.
Example 2: Three Crossover Frequencies
As a second example, let us consider a loop gain having a low-frequency real pole at f = f1,
and higher-frequency resonant poles at frequency f= f2 that is just beyond the (ﬁrst) crossover
frequency:
T(s)= T0
⎦
1+ s
ω1
) ⎛⎜⎜⎜⎜⎜⎝1+ s
Qω2
+
⎦s
ω2
)2⎞⎟⎟⎟⎟⎟⎠
(9.32)

366 9 Controller Design
(a)
Re[T(s)]
Im[T(s)]
Unit circle
f = fc
f = 0
ϕm
f
(b)
–1
Re[T(s)]
Im[T(s)]
T(jω )
T(–jω )
®¥
Fig. 9.16 Nyquist plot for an unstable system: (a) mapping of the contourΓA through the loop gain T(s),
with negative phase marginϕm,( b) mapping of the complete Nyquist contour through the loop gain T(s)
0 dB
20 dB
40 dB
60 dB
f
f1
0
∠ T
∠ T
1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz
f2
1 2 3
|| T |||| T ||
Fig. 9.17 Bode plot of loop gainT(s) for the example of Eq. (9.32). The loop gain exhibits three crossover
frequencies
A Bode plot of the loop gain for this case is illustrated in Fig. 9.17. The resonant poles at
f2 cause the magnitude of T increase above 0 dB in the vicinity of f2. Consequently, there are
three crossover frequencies (designated 1, 2, and 3). We could associate a phase margin with
each crossover frequency; for the plot of Fig.9.17, the phase margins associated with crossover
frequencies 1 and 2 are positive, while the phase margin associated with crossover frequency 3
is negative. Hence the simple phase margin test is ambiguous, and it is necessary to sketch the
Nyquist plot to correctly determine whether this loop gain leads to a stable system.
Figure 9.18 contains the Nyquist plot corresponding to the Bode plot of Fig. 9.17.F i g -
ure 9.18a contains the mapped contour T(Γ
A)= T( jω), with crossover points 1, 2, and 3 iden-
tiﬁed. Figure 9.18b contains the mapping of the complete Nyquist contour. It can be seen that
```
