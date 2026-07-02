---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第2章part 1 - 2 Principles of Steady-State Converter Analysis
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 31-50 > Chunk ID: `chapter-2-part-1`"
---

# 第2章part 1 - 2 Principles of Steady-State Converter Analysis

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 31-50  
> Chunk ID: `chapter-2-part-1`

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
2
Principles of Steady-State Converter Analysis
2.1 Introduction
In the previous chapter, the buck converter was introduced as a means of reducing the dc voltage,
using only nondissipative switches, inductors, and capacitors. The switch produces a rectangular
waveform vs(t) as illustrated in Fig. 2.1. The voltage vs(t) is equal to the dc input voltage Vg
when the switch is in position 1, and is equal to zero when the switch is in position 2. In practice,
the switch is realized using power semiconductor devices, such as transistors and diodes, which
are controlled to turn on and oﬀas required to perform the function of the ideal switch. The
switching frequency fs, equal to the inverse of the switching period Ts, generally lies in the
range of 1 kHz–1 MHz, depending on the switching speed of the semiconductor devices. The
+
– R
+
v(t)
–
1
2
+
vs(t)
–
Vg
vs(t) Vg
DTs D'Ts
0
t0 DTs Ts
Switch
position: 12 1
(a)
(b)
Fig. 2.1 Ideal switch, (a), used to reduce the voltage dc component, and (b) its output voltage waveform
vs(t)
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_2
15

16 2 Principles of Steady-State Converter Analysis
Fig. 2.2 Determination of the switch out-
put voltage dc component, by integrating
and dividing by the switching period
vs(t) Vg
0
t0 DTs Ts
〈vs〉 = DVgarea =
DTsVg
duty ratio D is the fraction of time that the switch spends in position 1, and is a number between
zero and one. The complement of the duty ratio, D′, is deﬁned as (1−D).
The switch reduces the dc component of the voltage: the switch output voltagevs(t) has a dc
component that is less than the converter dc input voltage Vg. From Fourier analysis, we know
that the dc component of vs(t) is given by its average value⟨vs⟩,o r
⟨vs⟩= 1
Ts
∫ Ts
0
vs(t)dt (2.1)
As illustrated in Fig.2.2, the integral is given by the area under the curve, orDTsVg. The average
value is therefore
⟨vs⟩= 1
Ts
(DTsVg)= DVg (2.2)
So the average value, or dc component, of vs(t) is equal to the duty cycle times the dc input
voltage Vg. The switch reduces the dc voltage by a factor of D.
What remains is to insert a low-pass ﬁlter as shown in Fig.2.3. The ﬁlter is designed to pass
the dc component of vs(t), but to reject the components of vs(t) at the switching frequency and
its harmonics. To accomplish this, we design the ﬁlter such that its cuto ﬀfrequency is much
lower than the switching frequency. The output voltage v(t) is then essentially equal to the dc
component of vs(t):
v≈⟨vs⟩= DVg (2.3)
The converter of Fig. 2.3 has been realized using lossless elements. To the extent that they are
ideal, the inductor, capacitor, and switch do not dissipate power. For example, when the switch
is closed, its voltage drop is zero, and the current is zero when the switch is open. In either
+
–
L
CR
+
v(t)
–
1
2
+
vs(t)
–
Vg
Fig. 2.3 Insertion of low-pass ﬁler, to remove the switching harmonics and pass only the dc component
of vs(t) to the output

2.1 Introduction 17
Fig. 2.4 Buck converter dc output voltage V vs.
duty cycle D
Vg
0
0 D
V
1
case, the power dissipated by the switch is zero. Hence, e ﬃciencies approaching 100% can
be obtained. So to the extent that the components are ideal, we can realize our objective of
changing dc voltage levels using a lossless network.
M(D)
D
0
0.2
0.4
0.6
0.8
1
0 0.2 0.4 0.6 0.8 1
M(D)
D
0
1
2
3
4
5
0 0.2 0.4 0.6 0.8 1
M(D)
D
–5
–4
–3
–2
–1
0
0 0.2 0.4 0.6 0.8 1
(a)
(b)
(c)
+
–
L
CR
+
v
–
1
2
+
–
L
CR
+
v
–
1
2
+
– L
CR
+
v
–
12
M(D)= D
M(D)= 1
1–D
M(D)= –D
1–D
iL (t)
Vg
iL (t)
Vg
iL (t)Vg
Fig. 2.5 Three basic converters and their dc conversion ratios M(D)= V/Vg:( a) buck, ( b) boost, ( c)
buck–boost

18 2 Principles of Steady-State Converter Analysis
The network of Fig. 2.3 also allows control of the output. Figure 2.4 is the control charac-
teristic of the converter. The output voltage, given by Eq. ( 2.3), is plotted vs. duty cycle. The
buck converter has a linear control characteristic. Also, the output voltage is less than or equal
to the input voltage, since 0 ≤D≤1. Feedback systems are often constructed that adjust the
duty cycle D to regulate the converter output voltage. Inverters or power ampliﬁers can also be
built, in which the duty cycle varies slowly with time and the output voltage follows.
The buck converter is just one of many possible switching converters. Two other commonly
used converters, which perform diﬀerent voltage conversion functions, are illustrated in Fig.2.5.
In the boost converter, the positions of the inductor and switch are reversed. It is shown later
in this chapter that the boost converter steps the voltage up: V ≥Vg. Another converter, the
buck–boost converter, can either increase or decrease the magnitude of the voltage, but the
polarity is inverted. So with a positive input voltage, the ideal buck–boost converter can produce
a negative output voltage of any magnitude. It may at ﬁrst be surprising that dc output voltages
can be produced that are greater in magnitude than the input, or that have opposite polarity. But
it is indeed possible to produce any desired dc output voltage using a passive network of only
inductors, capacitors, and embedded switches.
In the above discussion, it was possible to derive an expression for the output voltage of
the buck converter, Eq. ( 2.3), using some simple arguments based on Fourier analysis. How-
ever, it may not be immediately obvious how to directly apply these arguments to ﬁnd the dc
output voltage of the boost, buck–boost, or other converters. The objective of this chapter is the
development of a more general method for analyzing any switching converter comprised of a
network of inductors, capacitors, and switches [4, 8–13].
The principles of inductor volt-second balance and capacitor charge balance are derived;
these can be used to solve for the inductor currents and capacitor voltages of switching convert-
ers. A useful approximation, the small-ripple or linear-ripple approximation, greatly facilitates
the analysis. Some simple methods for selecting the ﬁlter element values are also discussed.
2.2 Inductor Volt-Second Balance, Capacitor Charge Balance, and the
Small-Ripple Approximation
Let us more closely examine the inductor and capacitor waveforms in the buck converter of
Fig. 2.6. It is impossible to build a perfect low-pass ﬁlter that allows the dc component to pass
but completely removes the components at the switching frequency and its harmonics. So the
+
–
L
CR
+
v(t)
–
1
2
iL(t)
+ vL(t) – iC(t)
Vg
Fig. 2.6 Buck converter circuit, with the inductor voltage vL(t) and capacitor voltage vC (t) waveforms
speciﬁcally identiﬁed

2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 19
v(t)
t
0
V
Actual waveform
v(t) = V + vripple(t)
dc component V
Fig. 2.7 Output voltage waveform v(t), consisting of dc component V and switching ripple vripple (t)
low-pass ﬁlter must allow at least some small amount of the high-frequency harmonics gen-
erated by the switch to reach the output. Hence, in practice the output voltage waveform v(t)
appears as illustrated in Fig. 2.7, and can be expressed as
v(t)= V+ vripple (t) (2.4)
So the actual output voltage v(t) consists of the desired dc component V, plus a small undesired
ac component vripple (t) arising from the incomplete attenuation of the switching harmonics by
the low-pass ﬁlter. The magnitude of vripple (t) has been exaggerated in Fig. 2.7.
The output voltage switching ripple should be small in any well-designed converter, since
the object is to produce a dc output. For example, in a computer power supply having a 3.3 V
output, the switching ripple is normally required to be less than a few tens of millivolts, or less
than 1% of the dc component V. So it is nearly always a good approximation to assume that the
magnitude of the switching ripple is much smaller than the dc component:
∥vripple∥≪ V (2.5)
Therefore, the output voltage v(t) is well approximated by its dc component V, with the small-
ripple term vripple (t) neglected:
v(t)≈V (2.6)
This approximation, known as the small-ripple approximation,o rt h elinear-ripple approxima-
tion, greatly simpliﬁes the analysis of the converter waveforms and is used throughout this book.
With this approximation, we replace the exponential or damped sinusoidal expressions for the
inductor and capacitor waveforms with simpler linear waveforms; this approximation is justiﬁed
provided that the switching period is much shorter than the natural time constants of the circuit.
The small-ripple approximation is applied to the inductor currents and capacitor voltages of the
converter, which are continuous variables. It must not be applied to discontinuous waveforms
of the converter, such as the switch voltage, switch current, or inductor voltage.
Next let us analyze the inductor current waveform. We can ﬁnd the inductor current by inte-
grating the inductor voltage waveform. With the switch in position 1, the left side of the inductor
is connected to the input voltage V
g, and the circuit reduces to Fig.2.8a. It should be noted here
that the reference polarities of vL(t) and iL(t) have been carefully deﬁned in Fig. 2.6, and these
reference polarities are consistently followed in the circuits of Fig. 2.8a,b. The inductor voltage
vL(t) is given by
vL= Vg−v(t) (2.7)

20 2 Principles of Steady-State Converter Analysis
As described above, the output voltage v(t) consists of the dc component V,p l u sas m a l la c
ripple term vripple (t). We can make the small-ripple approximation here, Eq. ( 2.6), to replace
v(t) with its dc component V:
vL≈Vg−V (2.8)
So with the switch in position 1, the inductor voltage is essentially constant and equal toVg−V,
as shown in Fig. 2.9. By knowledge of the inductor voltage waveform, the inductor current can
be found by use of the deﬁnition
vL(t)= LdiL(t)
dt (2.9)
Thus, during the ﬁrst interval, when vL(t) is approximately ( Vg−V), the slope of the inductor
current waveform is
diL(t)
dt = vL(t)
L ≈Vg−V
L (2.10)
which follows by dividing Eq. (2.9)b y L, and substituting Eq. (2.8). Since the inductor voltage
vL(t) is essentially constant while the switch is in position 1, the inductor current slope is also
essentially constant and the inductor current increases linearly.
Similar arguments apply during the second subinterval, when the switch is in position 2.
The left side of the inductor is then connected to ground, leading to the circuit of Fig. 2.8b. It is
important to consistently deﬁne the polarities of the inductor current and voltage; in particular,
the polarity of v
L(t) is deﬁned consistently in Figs. 2.7, 2.8a,b. So the inductor voltage during
the second subinterval is given by
vL(t)=−v(t) (2.11)
Use of the small-ripple approximation, Eq. (2.6), leads to
vL(t)≈−V (2.12)
So the inductor voltage is also essentially constant while the switch is in position 2, as illustrated
in Fig. 2.9. Substitution of Eq. ( 2.12) into Eq. ( 2.9) and solution for the slope of the inductor
current yields
diL(t)
dt ≈−V
L (2.13)
Hence, during the second subinterval the inductor current changes with a negative and essen-
tially constant slope.
We can now sketch the inductor current waveform (Fig.2.10). The inductor current begins at
some initial value iL(0). During the ﬁrst subinterval, with the switch in position 1, the inductor
L
CR
+
v(t)
–
iL(t)
+ vL(t) – iC(t)
+
–Vg
L
CR
+
v(t)
–
iL(t)
+ vL(t) – iC(t)
+
–Vg
(b)(a)
Fig. 2.8 Buck converter circuit: (a) while the switch is in position 1, (b) while the switch is in position 2

2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 21
Fig. 2.9 Steady-state inductor voltage
waveform, buck converter
vL(t) Vg – V
t
– V
D'TsDTs
Switch
position: 12 1
Fig. 2.10 Steady-state inductor current
waveform, buck converter –V
L
Vg –V
L
iL(t)
t0 DTs Ts
I
iL(0)
iL(DTs)
ΔiL
current increases with the slope given in Eq. ( 2.10). At time t= DTs, the switch changes to
position 2. The current then decreases with the constant slope given by Eq. ( 2.13). At time
t= Ts, the switch changes back to position 1, and the process repeats.
It is of interest to calculate the inductor current ripple ΔiL. As illustrated in Fig. 2.10,t h e
peak inductor current is equal to the dc component I plus the peak-to-average rippleΔiL.T h i s
peak current ﬂows through not only the inductor, but also through the semiconductor devices
that comprise the switch. Knowledge of the peak current is necessary when specifying the rat-
ings of these devices.
Since we know the slope of the inductor current during the ﬁrst subinterval, and we also
know the length of the ﬁrst subinterval, we can calculate the ripple magnitude. The i
L(t)w a v e -
form is symmetrical about I, and hence during the ﬁrst subinterval the current increases by 2ΔiL
(sinceΔiL is the peak ripple, the peak-to-peak ripple is 2ΔiL). So the change in current, 2ΔiL,
is equal to the slope (the applied inductor voltage divided by L) times the length of the ﬁrst
subinterval (DTs):
(change in iL)= (slope)(length of subinterval)
(2ΔiL)=
⎦Vg−V
L
)
(DTs) (2.14)
Solution forΔiL yields
ΔiL= Vg−V
2L DTs (2.15)
Typical values ofΔiL lie in the range of 10%– 20% of the full-load value of the dc component
I. It is undesirable to allowΔiL to become too large; doing so would increase the peak currents of
the inductor and of the semiconductor switching devices, and would increase their size and cost.
So by design the inductor current ripple is also usually small compared to the dc component I.
The small-ripple approximation i
L(t)≈I is usually justiﬁed for the inductor current.
The inductor value can be chosen such that a desired current rippleΔiL is attained. Solution
of Eq. (2.15) for the inductance L yields

22 2 Principles of Steady-State Converter Analysis
L= Vg−V
2ΔiL
DTs (2.16)
This equation is commonly used to select the value of inductance in the buck converter.
It is entirely possible to solve converters exactly, without use of the small-ripple approxima-
tion. For example, one could use the Laplace transform to write expressions for the waveforms
of the circuits of Fig. 2.8a,b. One could then invert the transforms, match boundary conditions,
and ﬁnd the periodic steady-state solution of the circuit. Having done so, one could then ﬁnd
the dc components of the waveforms and the peak values. But this is a great deal of work, and
the results are nearly always intractable. Besides, the extra work involved in writing equations
that exactly describe the ripple is a waste of time, since the ripple is small and is undesired. The
small-ripple approximation is easy to apply, and quickly yields simple expressions for the dc
components of the converter waveforms.
The inductor current waveform of Fig.2.10 is drawn under steady-state conditions, with the
converter operating in equilibrium. Let us consider next what happens to the inductor current
when the converter is ﬁrst turned on. Suppose that the inductor current and output voltage are
initially zero, and an input voltage V
g is then applied. As shown in Fig. 2.11, iL(0) is zero.
During the ﬁrst subinterval, with the switch in position 1, we know that the inductor current
will increase, with a slope of ( Vg −v)/L and with v initially zero. Next, with the switch in
position 2, the inductor current will change with a slope of −v/L; since v is initially zero, this
slope is essentially zero. It can be seen that there is a net increase in inductor current over the
ﬁrst switching period, becauseiL(Ts) is greater thaniL(0). Since the inductor current ﬂows to the
output, the output capacitor will charge slightly, andv will increase slightly. The process repeats
during the second and succeeding switching periods, with the inductor current increasing during
each subinterval 1 and decreasing during each subinterval 2.
As the output capacitor continues to charge and v increases, the slope during subinterval 1
decreases while the slope during subinterval 2 becomes more negative. Eventually, the point is
reached where the increase in inductor current during subinterval 1 is equal to the decrease in
inductor current during subinterval 2. There is then no net change in inductor current over a
iL(t)
t0 DTs Ts
iL(0) = 0
iL(nTs)
iL(Ts)
2Ts nTs (n + 1)Ts
iL((n + 1)Ts)
Vg –v(t)
L
–v(t)
L
Fig. 2.11 Inductor current waveform during converter turn-on transient

2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 23
complete switching period, and the converter operates in steady state. The converter waveforms
are periodic: iL(nTs)= iL((n+ 1)Ts). From this point on, the inductor current waveform appears
as in Fig. 2.10.
The requirement that, in equilibrium, the net change in inductor current over one switching
period be zero leads us to a way to ﬁnd steady-state conditions in any switching converter: the
principle of inductor volt-second balance. Given the deﬁning relation of an inductor:
vL(t)= LdiL(t)
dt (2.17)
Integration over one complete switching period, say from t= 0t o Ts, yields
iL(Ts)−iL(0)= 1
L
∫ TS
0
vL(t)dt (2.18)
This equation states that the net change in inductor current over one switching period, given by
the left-hand side of Eq. ( 2.18), is proportional to the integral of the applied inductor voltage
over the interval. In steady state, the initial and ﬁnal values of the inductor current are equal,
and hence the left-hand side of Eq. ( 2.18) is zero. Therefore, in steady state the integral of the
applied inductor voltage must be zero:
0=
∫ TS
0
vL(t)dt (2.19)
The right-hand side of Eq. (2.19) has the units of volt-seconds or ﬂux-linkages. Equation (2.19)
states that the total area, or net volt-seconds, under the vL(t) waveform must be zero.
An equivalent form is obtained by dividing both sides of Eq. ( 2.19) by the switching
period Ts:
0= 1
TS
∫ Ts
0
vL(t)dt=⟨vL⟩ (2.20)
The right-hand side of Eq. (2.20) is recognized as the average value, or dc component, of vL(t).
Equation (2.20) states that, in equilibrium, the applied inductor voltage must have zero dc com-
ponent.
The inductor voltage waveform of Fig. 2.9 is reproduced in Fig. 2.12, with the area un-
der the vL(t) curve speciﬁcally identiﬁed. The total area λis given by the areas of the two
rectangles, or
λ=
∫ TS
0
vL(t)dt= (Vg−V)(DTs)+ (−V)(D′Ts) (2.21)
Fig. 2.12 The principle of inductor volt-
second balance: in steady state, the net
volt-seconds applied to an inductor ( i.e.,
the total areaλ) must be zero
vL(t) Vg – V
t
– V
DTs
Total area λ

24 2 Principles of Steady-State Converter Analysis
The average value is therefore
⟨vL⟩= λ
Ts
= D(Vg−V)+ D′(−V) (2.22)
By equating⟨vL⟩ to zero, and noting that D+ D′= 1, one obtains
0= DVg−(D+ D′)V= DVg−V (2.23)
Solution for V yields
V= DVg (2.24)
which coincides with the result obtained previously, Eq. (2.3). So the principle of inductor volt-
second balance allows us to derive an expression for the dc component of the converter output
voltage. An advantage of this approach is its generality—it can be applied to any converter. One
simply sketches the applied inductor voltage waveform, and equates the average value to zero.
This method is used later in this chapter, to solve several more complicated converters.
Similar arguments can be applied to capacitors. The deﬁning equation of a capacitor is
iC(t)= C dvC(t)
dt (2.25)
Integration of this equation over one switching period yields
vC(Ts)−vC(0)= 1
C
∫ TS
0
iC(t)dt (2.26)
In steady state, the net change over one switching period of the capacitor voltage must be zero,
so that the left-hand side of Eq. ( 2.26) is equal to zero. Therefore, in equilibrium the integral
of the capacitor current over one switching period (having the dimensions of amp-seconds, or
charge) should be zero. There is no net change in capacitor charge in steady state. An equivalent
statement is
0= 1
Ts
∫ Ts
0
iC(t)dt=⟨iC⟩ (2.27)
The average value, or dc component, of the capacitor current must be zero in equilibrium.
This should be an intuitive result. If a dc current is applied to a capacitor, then the capacitor
will charge continually and its voltage will increase without bound. Likewise, if a dc voltage is
applied to an inductor, then the ﬂux will increase continually and the inductor current will in-
crease without bound. Equation (2.27), called the principle of capacitor amp-second balance or
capacitor charge balance, can be used to ﬁnd the steady-state currents in a switching converter.
2.3 Boost Converter Example
The boost converter, Fig.2.13a, is another well-known switched-mode converter that is capable
of producing a dc output voltage greater in magnitude than the dc input voltage. A practical
realization of the switch, using a MOSFET and diode, is shown in Fig. 2.13b. Let us apply the
small-ripple approximation and the principles of inductor volt-second balance and capacitor
charge balance to ﬁnd the steady-state output voltage and inductor current for this converter.

2.3 Boost Converter Example 25
+
–
L
CR
+
v
–
1
2
iL(t)
Vg
iC(t)+ vL(t) –
+
–
L
CR
+
v
–
iL(t)
Vg
iC(t)+ vL(t) –
D1
Q1
DTs Ts
+
–
(a)
(b)
Fig. 2.13 Boost converter: (a) with ideal switch, (b) practical realization using MOSFET and diode
CR
+
v
–
iC(t)
+
–
L
iL(t)
Vg
+ vL(t) –
CR
+
v
–
iC(t)
+
–
L
iL(t)
Vg
+ vL(t) –
(a)
(b)
Fig. 2.14 Boost converter circuit, (a) while the switch is in position 1, (b) while the switch is in position 2
With the switch in position 1, the right-hand side of the inductor is connected to ground,
resulting in the network of Fig. 2.14a. The inductor voltage and capacitor current for this subin-
terval are given by
vL = Vg (2.28)
iC =−v
R

26 2 Principles of Steady-State Converter Analysis
Use of the linear-ripple approximation, v≈V, leads to
vL = V (2.29)
iC =−V
R
With the switch in position 2, the inductor is connected to the output, leading to the circuit of
Fig. 2.14b. The inductor voltage and capacitor current are then
vL = Vg−v (2.30)
iC = iL−v
R
Use of the small-ripple approximation, v≈V and iL≈I, leads to
vL = Vg−V (2.31)
iC = I−V
R
Equations (2.29) and (2.31) are used to sketch the inductor voltage and capacitor current wave-
forms of Fig. 2.15.
It can be inferred from the inductor voltage waveform of Fig.2.15a that the dc output voltage
V is greater than the input voltage Vg. During the ﬁrst subinterval, vL(t) is equal to the dc input
voltage Vg, and positive volt-seconds are applied to the inductor. Since, in steady-state, the
total volt-seconds applied over one switching period must be zero, negative volt-seconds must
be applied during the second subinterval. Therefore, the inductor voltage during the second
subinterval, (V
g−V), must be negative. Hence, V is greater than Vg.
The total volt-seconds applied to the inductor over one switching period are
∫ TS
0
vL(t)dt= (Vg)DTs+ (Vg−V)D′Ts (2.32)
vL(t)
Vg – V
t
DTs
Vg
D'Ts
iC(t)
– V/R
t
DTs
I – V/R
D'Ts
(a)
(b)
Fig. 2.15 Boost converter voltage and current waveforms

2.3 Boost Converter Example 27
Fig. 2.16 Dc conversion ratioM(D)
of the boost converter
M(D)
D
0
1
2
3
4
5
0 0.2 0.4 0.6 0.8 1
M(D)= 1
D'= 1
1– D
By equating this expression to zero and collecting terms, one obtains
Vg(D+ D′)−VD
′
= 0 (2.33)
Solution for V, and by noting that (D+ D′)= 1, yields the expression for the output voltage,
V= Vg
D′ (2.34)
The voltage conversion ratio M(D) is the ratio of the output to the input voltage of a dc–dc
converter. Equation (2.34) predicts that the voltage conversion ratio is given by
M(D)= V
Vg
= 1
D′ = 1
1−D (2.35)
This equation is plotted in Fig. 2.16.A t D= 0, V = Vg. The output voltage increases as D
increases, and in the ideal case tends to inﬁnity as D tends to 1. So the ideal boost converter
is capable of producing any output voltage greater than the input voltage. There are, of course,
limits to the output voltage that can be produced by a practical boost converter. In the next
chapter, component nonidealities are modeled, and it is found that the maximum output voltage
of a practical boost converter is indeed limited. Nonetheless, very large output voltages can be
produced if the nonidealities are suﬃciently small.
The dc component of the inductor current is derived by use of the principle of capacitor
charge balance. During the ﬁrst subinterval, the capacitor supplies the load current, and the
capacitor is partially discharged. During the second subinterval, the inductor current supplies
the load and, additionally, recharges the capacitor. The net change in capacitor charge over one
switching period is found by integrating the i
C(t) waveform of Fig.2.15b,
∫ Ts
0
iC(t)dt=
⎦
−V
R
)
DTs+
⎦
I−V
R
)
D′Ts (2.36)
Collecting terms, and equating the result to zero, leads to the steady-state result
−V
R (D+ D′)+ ID′= 0 (2.37)

28 2 Principles of Steady-State Converter Analysis
Fig. 2.17 Variation of inductor cur-
rent dc component I with duty cycle
D, boost converter
D
0
2
4
6
8
0 0.2 0.4 0.6 0.8 1
I
Vg/R
By noting that (D+D′)= 1, and by solving for the inductor current dc componentI, one obtains
I= V
D′R (2.38)
So the inductor current dc component I is equal to the load current, V/R, divided by D′. Substi-
tution of Eq. (2.34) to eliminate V yields
I= Vg
D′2R (2.39)
This equation is plotted in Fig. 2.17. It can be seen that the inductor current becomes large as D
approaches 1.
This inductor current, which coincides with the dc input current in the boost converter, is
greater than the load current. Physically, this must be the case: to the extent that the converter
elements are ideal, the converter input and output powers are equal. Since the converter output
voltage is greater than the input voltage, the input current must likewise be greater than the out-
put current. In practice, the inductor current ﬂows through the semiconductor forward voltage
drops, the inductor winding resistance, and other sources of power loss. As the duty cycle ap-
proaches one, the inductor current becomes very large and these component nonidealities lead
to large power losses. In consequence, the eﬃciency of the boost converter decreases rapidly at
high duty cycle.
Next, let us sketch the inductor current i
L(t) waveform and derive an expression for the
inductor current ripple ΔiL. The inductor voltage waveform vL(t) has been already found
(Fig. 2.15), so we can sketch the inductor current waveform directly. During the ﬁrst subinterval,
with the switch in position 1, the slope of the inductor current is given by
diL(t)
dt = vL(t)
L = Vg
L (2.40)
Likewise, when the switch is in position 2, the slope of the inductor current waveform is
diL(t)
dt = vL(t)
L = Vg−V
L (2.41)
The inductor current waveform is sketched in Fig.2.18. During the ﬁrst subinterval, the change
in inductor current, 2ΔiL, is equal to the slope multiplied by the length of the subinterval, or

2.3 Boost Converter Example 29
Fig. 2.18 Boost converter inductor
current waveform iL(t) Vg –V
L
Vg
L
iL(t)
t0 DTs Ts
I ΔiL
Fig. 2.19 Boost converter output
voltage waveform v(t)
v(t)
t0 DTs Ts
V Δv
I
C – V
RC
–V
RC
2ΔiL= Vg
L DTs (2.42)
Solution forΔiL leads to
ΔiL= Vg
2L DTs (2.43)
This expression can be used to select the inductor value L such that a given value of ΔiL is
obtained.
Likewise, the capacitor voltage v(t) waveform can be sketched, and an expression derived
for the output voltage ripple peak magnitudeΔv. The capacitor current waveform iC(t)i sg i v e n
in Fig. 2.15. During the ﬁrst subinterval, the slope of the capacitor voltage waveform v(t)i s
dvC(t)
dt = iC(t)
C =−V
RC (2.44)
During the second subinterval, the slope is
dvC(t)
dt = iC(t)
C = I
C−V
RC (2.45)
The capacitor voltage waveform is sketched in Fig.2.19. During the ﬁrst subinterval, the change
in capacitor voltage,−2Δv, is equal to the slope multiplied by the length of the subinterval:
−2Δv=−V
RC DTs (2.46)
Solution forΔv yields
Δv= V
2RC DTs (2.47)
This expression can be used to select the capacitor value C to obtain a given output voltage
ripple peak magnitudeΔv.

30 2 Principles of Steady-State Converter Analysis
2.4 ´Cuk Converter Example
As a second example, consider the ´Cuk converter of Fig. 2.20a. This converter performs a dc
conversion function similar to the buck–boost converter: it can either increase or decrease the
magnitude of the dc voltage, and it inverts the polarity. A practical realization using a transistor
and diode is illustrated in Fig. 2.20b.
This converter operates via capacitive energy transfer. As illustrated in Fig. 2.21, capacitor
C1 is connected through L1 to the input source while the switch is in position 2, and source
energy is stored in C1. When the switch is in position 1, this energy is released through L2 to
the load.
The inductor currents and capacitor voltages are deﬁned, with polarities assigned somewhat
arbitrarily, in Fig.2.20a. In this section, the principles of inductor volt-second balance and capac-
itor charge balance are applied to ﬁnd the dc components of the inductor currents and capacitor
voltages. The voltage and current ripple magnitudes are also found.
During the ﬁrst subinterval, while the switch is in position 1, the converter circuit reduces
to Fig. 2.21a. The inductor voltages and capacitor currents are
vL1 = Vg
vL2 =−v1−v2
iC1= i2 (2.48)
iC2= i2−v2
R
We next assume that the switching ripple magnitudes ini1(t), i2(t), v1(t), and v2(t) are small
compared to their respective dc components I1, I2, V1, and V2. We can therefore make the
small-ripple approximation, and Eq. (2.48) becomes
+
–
L1
C2 R
+
v2
–
C1 L2
1 2
+ v1 –i1 i2
Vg
+
–
L1
C2 R
+
v2
–
C1 L2
+ v1 –i1 i2
D1Q1Vg
(a)
(b)
Fig. 2.20 ´Cuk converter: (a) with ideal switch, (b) practical realization using MOSFET and diode

2.4 ´Cuk Converter Example 31
+
–
L1
C2 R
+
v2
–
C1
L2
i1
i2
 –
v1
+
iC1 iC2
+ vL2 –+ vL1 –
Vg
+
–
L1
C2 R
+
v2
–
C1
L2i1 i2
 +
v1
–
iC1
iC2
+ vL2 –+ vL1 –
Vg
(a)
(b)
Fig. 2.21 ´Cuk converter circuit: (a) while switch is in position 1, (b) while switch is in position 2
vL1 = Vg
vL2 =−V1−V2 (2.49)
iC1 = I2
iC2 = I2−V2
R
During the second subinterval, with the switch in position 2, the converter circuit elements are
connected as in Fig. 2.21b. The inductor voltages and capacitor currents are:
vL1 = Vg−v1
vL2 =−v2
iC1 = i1 (2.50)
iC2 = i2−v2
R
We again make the small-ripple approximation, and hence Eq. (2.50) becomes
vL1 = Vg−V1
vL2 =−V2
iC1 = I1 (2.51)
iC2 = I2−V2
R
Equations (2.49) and (2.51) are used to sketch the inductor voltage and capacitor current wave-
forms in Fig. 2.22.

32 2 Principles of Steady-State Converter Analysis
vL1(t)
Vg – V1
t
DTs
Vg
D'Ts
vL2(t)
– V1 – V2
t
DTs
– V2
D'Ts
iC1(t)
I2
t
DTs
I1
D'Ts
iC2(t)
I2 – V2 /R (= 0)
tDTs D'Ts
(a)
(b)
(c)
(d)
Fig. 2.22 ´Cuk converter waveforms: (a) inductor voltage vL1(t), (b) inductor voltage vL2(t), (c) capacitor
current iC1(t), (d) capacitor current iC2(t)
The next step is to equate the dc components, or average values, of the waveforms of
Fig. 2.22 to zero, to ﬁnd the steady-state conditions in the converter. The results are
⟨vL1⟩= DVg+ D′ ⎦
Vg−V1
)
= 0
⟨vL2⟩= D (−V1−V2)+ D′(−V2)= 0 (2.52)
⟨iC1⟩= DI2+ D′I1= 0
⟨iC2⟩= I2−V2
R = 0
Solution of this system of equations for the dc components of the capacitor voltages and inductor
currents leads to

2.4 ´Cuk Converter Example 33
M(D)
D
-5
-4
-3
-2
-1
0
0 0.2 0.4 0.6 0.8 1
M(D)= V2
Vg
=– D
1– D
Fig. 2.23 Dc conversion ratio M(D)=−V/Vg of the ´Cuk converter
V1 = Vg
D′
V2 =−D
D′ Vg (2.53)
I1 =−D
D′ I2=
⎦D
D′
)2 Vg
R
I2 = V2
R =−D
D′
Vg
R
The dependence of the dc output voltage V2 on the duty cycle D is sketched in Fig. 2.23.
The inductor current waveforms are sketched in Fig. 2.24a,b, and the capacitor C1 voltage
waveform v1(t) is sketched in Fig. 2.24c. During the ﬁrst subinterval, the slopes of the wave-
forms are given by
di1(t)
dt = vL1(t)
L1
= Vg
L1
di2(t)
dt = vL2(t)
L2
=−V1−V2
L2
(2.54)
dv1(t)
dt = iC1(t)
C1
= I2
C1
Equation (2.49) has been used here to substitute for the values of vL1, vL2, and iC1 during the
ﬁrst subinterval. During the second interval, the slopes of the waveforms are given by
di1(t)
dt = vL1(t)
L1
= Vg−V1
L1
di2(t)
dt = vL2(t)
L2
=−V2
L2
(2.55)
dv1(t)
dt = iC1(t)
C1
= I1
C1
Equation (2.51) was used to substitute for the values of vL1, vL2, and iC1 during the second
subinterval.

34 2 Principles of Steady-State Converter Analysis
i1(t)
tDTs Ts
I1
Δi1
Vg –V1
L1
Vg
L1
–V2
L2
–V1 –V2
L2
i2(t)
tDTs Ts
I2 Δi2
I1
C1
I2
C1
v1(t)
tDTs Ts
V1
Δv1
(a)
(b)
(c)
Fig. 2.24 ´Cuk converter waveforms: ( a) inductor current i1(t), (b) inductor current i2(t), (c) capacitor
voltage v1(t)
During the ﬁrst subinterval, the quantities i1(t), i2(t), and v1(t) change by 2Δi1,−2Δi2, and
−2Δv1, respectively. These changes are equal to the slopes given in Eq. ( 2.54), multiplied by
the subinterval length DTs, yielding
Δi1 = VgDTs
2L1
Δi2 = V1+ V2
2L2
DTs (2.56)
Δv1 =−I2DTs
2C1
The dc relationships, Eq. ( 2.53), can now be used to simplify these expressions and eliminate
V1, V2, and I1, leading to
Δi1= VgDTs
2L1
Δi2= VgDTs
2L2
(2.57)
Δv1 = VgD2Ts
2D′RC1
```
