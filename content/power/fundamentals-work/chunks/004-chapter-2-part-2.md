---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第2章part 2 - 2 Principles of Steady-State Converter Analysis
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 51-57 > Chunk ID: `chapter-2-part-2`"
---

# 第2章part 2 - 2 Principles of Steady-State Converter Analysis

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 51-57  
> Chunk ID: `chapter-2-part-2`

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
2.5 Estimating the Output V oltage Ripple in Converters Containing Two-Pole Low-Pass Filters 35
These expressions can be used to select values of L1, L2, and C1, such that desired values of
switching ripple magnitudes are obtained.
Similar arguments cannot be used to estimate the switching ripple magnitude in the output
capacitor voltage v2(t). According to Fig.2.22d, the current iC2(t) is continuous: unlike vL1, vL2,
and iC1, the capacitor current iC2(t) is nonpulsating. If the switching ripple of i2(t) is neglected,
then the capacitor current iC2(t) does not contain an ac component. The small-ripple approxima-
tion then leads to the conclusion that the output switching rippleΔv2 is zero.
Of course, the output voltage switching ripple is not zero. To estimate the magnitude of the
output voltage ripple in this converter, we must not neglect the switching ripple present in the
inductor current i2(t), since this current ripple is the only source of ac current driving the output
capacitor C2. A simple way of doing this in the ´Cuk converter and in other similar converters is
discussed in the next section.
2.5 Estimating the Output Voltage Ripple in Converters Containing
Two-Pole Low-Pass Filters
A case where the small-ripple approximation is not useful is in converters containing two-pole
low-pass ﬁlters, such as in the output of the ´Cuk converter (Fig. 2.20) or the buck converter
(Fig. 2.25). For these converters, the small-ripple approximation predicts zero output voltage
ripple, regardless of the value of the output ﬁlter capacitance. The problem is that the only
component of output capacitor current in these cases is that arising from the inductor current
ripple. Hence, inductor current ripple cannot be neglected when calculating the output capacitor
voltage ripple, and a more accurate approximation is needed.
An improved approach that is useful for this case is to estimate the capacitor current wave-
form i
C(t) more accurately, accounting for the inductor current ripple. The capacitor voltage
ripple can then be related to the total charge contained in the positive portion of the iC(t)w a v e -
form.
Consider the buck converter of Fig.2.25. The inductor current waveform iL(t) contains a dc
component I and linear ripple of peak magnitude ΔiL, as shown in Fig. 2.10. The dc compo-
nent I must ﬂow entirely through the load resistance R (why?), while the ac switching ripple
divides between the load resistance R and the ﬁlter capacitor C. In a well-designed converter,
in which the capacitor provides signiﬁcant ﬁltering of the switching ripple, the capacitanceC is
chosen large enough that its impedance at the switching frequency is much smaller than the load
impedance R. Hence nearly all of the inductor current ripple ﬂows through the capacitor, and
+
–
L
CR
+
vC(t)
–
1
2
iC(t) iR(t)iL(t)
Vg
Fig. 2.25 The buck converter contains a two-pole output ﬁlter

36 2 Principles of Steady-State Converter Analysis
iC(t)
vC(t)
t
t
Total charge
q
DTs D'Ts
Ts /2
V
ΔiL
Δv
Δv
Fig. 2.26 Output capacitor voltage and current waveforms, for the buck converter in Fig.2.25
very little ﬂows through the load. As shown in Fig.2.26, the capacitor current waveform iC(t)i s
then equal to the inductor current waveform with the dc component removed. The current ripple
is linear, with peak valueΔi
L.
When the capacitor current iC(t) is positive, charge is deposited on the capacitor plates and
the capacitor voltage vC(t) increases. Therefore, between the two zero crossings of the capacitor
current waveform, the capacitor voltage changes between its minimum and maximum extrema.
The waveform is symmetrical, and the total change in vC is the peak-to-peak output voltage
ripple, or 2Δv.
This change in capacitor voltage can be related to the total chargeq contained in the positive
portion of the capacitor current waveform. By the capacitor relation Q= CV,
q= C(2Δv) (2.58)
As illustrated in Fig. 2.26, the charge q is the integral of the current waveform between its zero
crossings. For this example, the integral can be expressed as the area of the shaded triangle,
having a heightΔiL. Owing to the symmetry of the current waveform, the zero crossings occur
at the centerpoints of the DTs and D′Ts subintervals. Hence, the base dimension of the triangle
is Ts/2. So the total charge q is given by
q= 1
2ΔiL
Ts
2 (2.59)
Substitution of Eq. (2.58) into Eq. (2.59), and solution for the voltage ripple peak magnitudeΔv
yields
Δv=ΔiLTs
8C (2.60)

2.6 Summary of Key Points 37
Fig. 2.27 Estimating inductor
current ripple when the inductor
voltage waveform is continuous
vL(t)
iL(t)
t
t
Total
flux linkage
−λ
DTs D'Ts
Ts /2
I
Δv
Δi
Δi
This expression can be used to select a value for the capacitance C such that a given voltage
rippleΔv is obtained. In practice, the additional voltage ripple caused by the capacitor equivalent
series resistance (ESR) must also be included.
Similar arguments can be applied to inductors. An example is considered in Problem2.10,i n
which a two-pole input ﬁlter is added to a buck converter as in Fig. 2.33. The capacitor voltage
ripple cannot be neglected; doing so would lead to the conclusion that no ac voltage is applied
across the input ﬁlter inductor, resulting in zero input current ripple. The actual inductor voltage
waveform is identical to the ac portion of the input ﬁlter capacitor voltage, with linear ripple
and with peak valueΔv as illustrated in Fig.2.27. By use of the inductor relationλ= Li, a result
similar to Eq. (2.60) can be derived. The derivation is left as a problem for the student.
2.6 Summary of Key Points
1. The dc component of a converter waveform is given by its average value, or the integral over
one switching period, divided by the switching period. Solution of a dc–dc converter to ﬁnd
its dc, or steady state, voltages and currents therefore involves averaging the waveforms.
2. The linear- (or small-) ripple approximation greatly simpliﬁes the analysis. In a well-
designed converter, the switching ripples in the inductor currents and capacitor voltages
are small compared to the respective dc components, and can be neglected.
3. The small-ripple approximation is properly applied only to inductor currents and capacitor
voltages, which are continuous waveforms. Attempts to apply the small-ripple approxima-
tion to switched (discontinuous) waveforms lead to erroneous results.
4. The principle of inductor volt-second balance allows determination of the dc voltage compo-
nents in any switching converter. In steady state, the average voltage applied to an inductor
must be zero.
5. The principle of capacitor charge balance allows determination of the dc components of the
inductor currents in a switching converter. In steady state, the average current applied to a
capacitor must be zero.

38 2 Principles of Steady-State Converter Analysis
6. By knowledge of the slopes of the inductor current and capacitor voltage waveforms, the
ac switching ripple magnitudes may be computed. Inductance and capacitance values can
then be chosen to obtain desired ripple magnitudes.
7. In converters containing multiple-pole ﬁlters, continuous (nonpulsating) voltages and cur-
rents are applied to one or more of the inductors or capacitors. Computation of the ac
switching ripple in these elements can be done using capacitor charge and/or inductor ﬂux-
linkage arguments, without use of the small-ripple approximation.
8. Converters capable of increasing (boost), decreasing (buck), and inverting the voltage polar-
ity (buck–boost and ´Cuk) have been described. Converter circuits are explored more fully
in the problems and in a later chapter.
Problems
2.1 Analysis and design of a buck–boost converter: A buck–boost converter is illustrated
in Fig. 2.28a, and a practical implementation using a transistor and diode is shown in
Fig. 2.28b.
Fig. 2.28 Buck–boost converter
of Problem 2.1:( a) ideal converter
circuit, ( b) implementation using
MOSFET and diode
+
– L
CR
+
v
–
12
i(t)
Vg
+
v
–
i(t)
+
–
D1Q1
LC R
iT
iD
Vg
(a)
(b)
(a) Find the dependence of the equilibrium output voltage V and inductor current I on
the duty ratio D, input voltage Vg, and load resistance R. You may assume that the
inductor current ripple and capacitor voltage ripple are small.
(b) Plot your results of part (a) over the range 0≤D≤1.
(c) Dc design: for the speciﬁcations
Vg= 30 V V=−20V
R= 4Ω fs= 40 kHz
(i)F i n dD and I
(ii) Calculate the value of L that will make the peak inductor current rippleΔi equal
to ten percent of the average inductor current I.
(iii) Choose C such that the peak output voltage rippleΔv is 0.1 V .

2.6 Summary of Key Points 39
(d) Sketch the transistor drain current waveform iT (t) for your design of part (c). Include
the eﬀects of inductor current ripple. What is the peak value of iT ? Also sketch iT (t)
for the case when L is decreased such thatΔi is 50% of I. What happens to the peak
value of iT in this case?
(e) Sketch the diode current waveform iD(t) for the two cases of part (d).
2.2 The boost converter illustrated in Fig.2.29 operates with the following conditions:
Input voltage Vg= 3.3V
Output voltage V= 5V
Switching frequency fs= 500 kHz
All elements are ideal, and the converter operates in steady state with waveforms similar
to those illustrated in Fig. 2.15.
(a) What is the duty cycle?
Fig. 2.29 Boost converter of Problem 2.2
(b) Sketch the waveform of the MOSFET drain-to-source voltage. Label the numerical
values of all relevant times and voltages.
(c) Find the dc component of the voltage waveform of Part (b).
2.3 In a certain application, an unregulated dc input voltage can vary between 18 and 36 V . It
is desired to produce a regulated output of 28 V to supplya2Al oad. Hence, a converter is
needed that is capable of both increasing and decreasing the voltage. Since the input and
output voltages are both positive, converters that invert the voltage polarity (such as the
basic buck–boost converter) are not suited for this application.
One converter that is capable of performing the required function is the nonisolated SEPIC
(single-ended primary inductance converter) shown in Fig.2.30. This converter has a con-
+
–
D1L1
C2
+
v
–
Q1
C1
L2
+
vDS
–
iD
Load
R
i1
Vg
Fig. 2.30 SEPIC of Problems 2.3 and 2.4

40 2 Principles of Steady-State Converter Analysis
version ratio M(D) that can both buck and boost the voltage, but the voltage polarity is
not inverted. In the normal converter operating mode, the transistor conducts during the
ﬁrst subinterval (0 < t < DTs), and the diode conducts during the second subinterval
(DTs< t< Ts). You may assume that all elements are ideal.
(a) Derive expressions for the dc components of each capacitor voltage and inductor cur-
rent, as functions of the duty cycle D, the input voltage Vg, and the load resistance
R.
(b) A control circuit automatically adjusts the converter duty cycle D, to maintain a con-
stant output voltage of V = 28 V . The input voltage slowly varies over the range
18 V≤Vg ≤36 V. The load current is constant and equal to 2 A. Over what range
will the duty cycle D vary? Over what range will the input inductor current dc compo-
nent I1 vary?
2.4 For the SEPIC of Problem 2.3,
(a) Derive expressions for each inductor current ripple and capacitor voltage ripple. Ex-
press these quantities as functions of the switching period Ts; the component values
L1, L2, C1, C2; the duty cycle D; the input voltage Vg; and the load resistance R.
(b) Sketch the waveforms of the transistor voltage vDS (t) and transistor current iD(t), and
give expressions for their peak values.
2.5 The switches in the converter of Fig.2.31 operate synchronously: each is in position 1 for
0< t< DTs, and in position 2 for DTs < t< Ts. Derive an expression for the voltage
conversion ratio M(D)= V/Vg.S k e t c hM(D)v s .D.
+
–
L
C
R
+ v –
2
1iL
Vg
1
2
Fig. 2.31 H-bridge converter of Problems 2.5 and 2.7
2.6 The switches in the converter of Fig.2.32 operate synchronously: each is in position 1 for
0< t< DTs, and in position 2 for DTs < t< Ts. Derive an expression for the voltage
conversion ratio M(D)= V/Vg.S k e t c hM(D)v s .D.
+
–
L
C
R
+ v –
1
2
2
1
iL
Vg
Fig. 2.32 Current-fed bridge converter of Problems 2.6, 2.8,a n d2.9

2.6 Summary of Key Points 41
2.7 For the converter of Fig. 2.31, derive expressions for the inductor current ripple ΔiL and
the capacitor voltage rippleΔvC.
2.8 For the converter of Fig.2.32, derive an analytical expression for the dc component of the
inductor current, I, as a function of D, Vg, and R. Sketch your result vs. D.
2.9 For the converter of Fig. 2.32, derive expressions for the inductor current ripple ΔiL and
the capacitor voltage rippleΔvC.
2.10 To reduce the switching harmonics present in the input current of a certain buck converter,
an input ﬁlter consisting of inductor L1 and capacitor C1 is added as shown in Fig. 2.33.
Such ﬁlters are commonly used to meet regulations limiting conducted electromagnetic
interference (EMI). For this problem, you may assume that all inductance and capacitance
values are suﬃciently large, such that all ripple magnitudes are small.
R
+
v
–
+
– C2
L2L1
C1
+
vC1
–
i1
iT
i2
D1
Q1
Vg
Fig. 2.33 Addition of L-C input ﬁlter to buck converter, Problem 2.10
(a) Sketch the transistor current waveform iT (t).
(b) Derive analytical expressions for the dc components of the capacitor voltages and
inductor currents.
(c) Derive analytical expressions for the peak ripple magnitudes of the input ﬁlter inductor
current and capacitor voltage.
(d) Given the following values:
Input voltage Vg= 48 V
Output voltage V= 36 V
Switching frequency fs= 100 kHz
Load resistance R= 6Ω
Select values for L1 and C1 such that (i) the peak voltage ripple on C1,ΔvC1,i st w o
percent of the dc component VC1, and (ii) the input peak current rippleΔi1 is 20 mA.
2.11 An ideal boost converter is shown in Fig.2.13a. For the converter operating in steady state,
derive exact analytical expressions for:
(a) the dc component of the output voltage,
(b) the peak-to-peak inductor current ripple, and
(c) the peak-to-peak capacitor voltage ripple.
Your expressions should be written in terms of the circuit parameters Vg, R, Ts, L, C, and
duty cycle D.
```
