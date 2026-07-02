---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第5章part 1 - 5 The Discontinuous Conduction Mode
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 149-168 > Chunk ID: `chapter-5-part-1`"
---

# 第5章part 1 - 5 The Discontinuous Conduction Mode

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 149-168  
> Chunk ID: `chapter-5-part-1`

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
5
The Discontinuous Conduction Mode
When the ideal switches of a dc–dc converter are implemented using current-unidirectional
and/or voltage-unidirectional semiconductor switches, one or more new modes of operation
known as discontinuous conduction modes (DCM) can occur. The discontinuous conduction
mode arises when the switching ripple in an inductor current or capacitor voltage is large enough
to cause the polarity of the applied switch current or voltage to reverse, such that the current-
or voltage-unidirectional assumptions made in realizing the switch with semiconductor devices
are violated. The DCM is commonly observed in dc–dc converters and rectiﬁers, and can also
sometimes occur in inverters or in other converters containing two-quadrant switches.
The discontinuous conduction mode typically occurs with large inductor current ripple in a
converter operating at light load and containing current-unidirectional switches. Since it is usu-
ally required that converters operate with their loads removed, DCM is frequently encountered.
Indeed, some converters are purposely designed to operate in DCM for all loads.
The properties of converters change radically in the discontinuous conduction mode. The
conversion ratio M becomes load-dependent, and the output impedance is increased. Control of
the output may be lost when the load is removed. We will see in a later chapter that the converter
dynamics are also signiﬁcantly altered.
In this chapter, the origins of the discontinuous conduction mode are explained, and the
mode boundary is derived. Techniques for solution of the converter waveforms and output volt-
age are also described. The principles of inductor volt-second balance and capacitor charge
balance must always be true in steady state, regardless of the operating mode. However, appli-
cation of the small- ripple approximation requires some care, since the inductor current ripple
(or one of the inductor current or capacitor voltage ripples) is not small.
Buck and boost converters are solved as examples. Characteristics of the basic buck, boost,
and buck–boost converters are summarized in tabular form.
5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary
Let us consider how the inductor and switch current waveforms change as the load power is
reduced. Let us use the buck converter (Fig. 5.1) as a simple example. The inductor current
iL(t) and diode current iD(t) waveforms are sketched in Fig. 5.2 for the continuous conduction
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_5
135

136 5 The Discontinuous Conduction Mode
Fig. 5.1 Buck converter
example +
Q1
L
CR
+
VD1Vg
iL(t)
iD(t)
mode. As described in Chap. 2, the inductor current waveform contains a dc component I,
plus switching ripple of peak amplitude ΔiL. During the second subinterval, the diode current
is identical to the inductor current. The minimum diode current during the second subinterval
is equal to ( I−ΔiL); since the diode is a single-quadrant switch, operation in the continuous
conduction mode requires that this current remain positive. As shown in Chap. 2, the inductor
current dc component I is equal to the load current:
I= V
R (5.1)
(a) iL(t)
t
iL
I
0D T s Ts
Conducting
devices: Q1 D1 Q1
(b) iD(t)
t0 DTs Ts
iL
I
Fig. 5.2 Buck converter waveforms in the continuous conduction mode: ( a) inductor current iL(t),
(b) diode current iD(t)
since no dc current ﬂows through capacitorC. It can be seen thatI depends on the load resistance
R. The switching ripple peak amplitude is

5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary 137
(a) iL(t)
t0 DTs Ts
Conducting
devices: Q1 D1 Q1
iL
I
(b) iD(t)
t0 DTs Ts
I iL
Fig. 5.3 Buck converter waveforms at the boundary between the continuous and discontinuous conduc-
tion modes: (a) inductor current iL(t), (b) diode current iD(t)
ΔiL= (Vg−V)
2L DTs= VgDD′Ts
2L (5.2)
The ripple magnitude depends on the applied voltage (Vg−V), on the inductance L, and on the
transistor conduction time DTs. But it does not depend on the load resistance R. The inductor
current ripple magnitude varies with the applied voltages rather than the applied currents.
Suppose now that the load resistance R is increased, so that the dc load current is decreased.
The dc component of inductor current I will then decrease, but the ripple magnitude ΔiL will
remain unchanged. If we continue to increase R, eventually the point is reached where I=ΔiL,
illustrated in Fig.5.3. It can be seen that the inductor currentiL(t) and the diode current iD(t)a r e
both zero at the end of the switching period. Yet the load current is positive and nonzero.
What happens if we continue to increase the load resistance R? The diode current cannot
be negative; therefore, the diode must become reverse-biased before the end of the switching
period. As illustrated in Fig. 5.4, there are now three subintervals during each switching period
T
s. During the ﬁrst subinterval of length D1Ts the transistor conducts, and the diode conducts
during the second subinterval of length D2Ts. At the end of the second subinterval the diode
current reaches zero, and for the remainder of the switching period neither the transistor nor the
diode conduct. The converter operates in the discontinuous conduction mode.
Figure 5.3 suggests a way to ﬁnd the boundary between the continuous and discontinuous
conduction modes. It can be seen that, for this buck converter example, the diode current is
positive over the entire interval DTs < t< Ts provided that I>ΔiL. Hence, the conditions for
operation in the continuous and discontinuous conduction modes are

138 5 The Discontinuous Conduction Mode
(a) iL(t)
t0 DTs Ts
Conducting
devices: Q1 D1 Q1
I
X
D1Ts D2Ts D3Ts
(b) iD(t)
t0 DTs Ts
D2Ts
Fig. 5.4 Buck converter waveforms in the discontinuous conduction mode: (a) inductor current iL(t), (b)
diode current iD(t)
I>ΔiL for CCM (5.3)
I<ΔiL for DCM
where I andΔiL are found assuming that the converter operates in the continuous conduction
mode. Insertion of Eqs. (5.1) and (5.2) into Eq. (5.3) yields the following condition for operation
in the discontinuous conduction mode:
DVg
R < DD′TsVg
2L (5.4)
Simpliﬁcation leads to
2L
RTs
< D′ (5.5)
This can also be expressed
K< Kcrit(D) for DCM (5.6)
where
K= 2L
RTs
and Kcrit(D)= D′

5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary 139
Fig. 5.5 Buck converter Kcrit(D)v s . D.T h e
converter operates in CCM when K > Kcrit,
and in DCM when K< Kcrit Kcrit(D) =1 D
0 D1
0
1
2
K = 2L/RTs
K < Kcrit:
DCM
K > Kcrit:
CCM
The dimensionless parameter K is a measure of the tendency of a converter to operate in the
discontinuous conduction mode. Large values of K lead to continuous mode operation, while
small values lead to the discontinuous mode for some values of duty cycle. The critical value of
K at the boundary between modes, Kcrit(D), is a function of duty cycle, and is equal to D′ for
the buck converter.
The critical value Kcrit(D) is plotted vs. duty cycle D in Fig. 5.5. An arbitrary choice of K
is also illustrated. For the values shown, it can be seen that the converter operates in DCM at
low duty cycle, and in CCM at high duty cycle. Figure5.6 illustrates what happens with heavier
loading. The load resistance R is reduced in value, such that K is larger. If K is greater than one,
then the converter operates in the continuous conduction mode for all duty cycles.
It is natural to express the mode boundary in terms of the load resistance R, rather than the
dimensionless parameter K. Equation (5.6) can be rearranged to directly expose the dependence
of the mode boundary on the load resistance:
R< Rcrit(D) for CCM (5.7)
R> Rcrit(D)f o rD C M
where
Rcrit(D)= 2L
D′Ts
So the converter enters the discontinuous conduction mode when the load resistance R exceeds
the critical value Rcrit. This critical value depends on the inductance, the switching period, and
the duty cycle. Note that, since D′ ≤1, the minimum value of Rcrit is 2 L/Ts. Therefore, if
R < 2L/Ts, then the converter will operate in the continuous conduction mode for all duty
cycles.
Fig. 5.6 Comparison of K with Kcrit(D), for a
larger value of K.S i n c eK > 1, the converter
operates in CCM for all D Kcrit(D)=1 D
0 D1
0
1
2
K = 2L/RTs
K > Kcrit:
CCM

140 5 The Discontinuous Conduction Mode
These results can be applied to loads that are not pure linear resistors. An e ﬀective load
resistance R is deﬁned as the ratio of the dc output voltage to the dc load current: R= V/I.T h i s
eﬀective load resistance is then used in the above equations.
Table 5.1 CCM-DCM mode boundaries for the buck, boost, and buck–boost converters
Converter Kcrit(D)m a x
0≤D≤1
(Kcrit) Rcrit(D)m i n
0≤D≤1
(Rcrit)
Buck (1 −D)1 2L
(1−D)Ts
2 L
Ts
Boost D(1−D)2 4
27
2L
D(1−D)2Ts
27
2
L
Ts
Buck–boost (1 −D)2 1 2L
(1−D)2Ts
2 L
Ts
A similar mode boundary analysis can be performed for other converters. The boost con-
verter is analyzed in Sect. 5.3, while analysis of the buck–boost converter is left as a homework
problem. The results are listed in Table 5.1, for the three basic dc–dc converters. In each case,
the dimensionless parameter K is deﬁned as K= 2L/RTs, and the mode boundary is given by
K> Kcrit(D)o r R< Rcrit(D) for CCM (5.8)
K< Kcrit(D)o r R> Rcrit(D)f o rD C M
5.2 Analysis of the Conversion Ratio M(D, K)
With a few modiﬁcations, the same techniques and approximations developed in Chap.2 for the
steady-state analysis of the continuous conduction mode may be applied to the discontinuous
conduction mode.
(a) Inductor volt-second balance. The dc component of the voltage applied to an inductor must
be zero:
⟨vL⟩= 1
Ts
∫ Ts
0
vL(t)dt= 0 (5.9)
(b) Capacitor charge balance. The dc component of current applied to a capacitor must be zero:
⟨iC⟩= 1
Ts
∫ Ts
0
iC(t)dt= 0 (5.10)
These principles must be true for any circuit that operates in steady state, regardless of the
operating mode.
(c) The linear-ripple approximation. Care must be used when employing the linear-ripple ap-
proximation in the discontinuous conduction mode.

5.2 Analysis of the Conversion Ratio M(D, K) 141
(i) Output capacitor voltage ripple . Regardless of the operating mode, it is required that
the output voltage ripple be small. Hence, for a well-designed converter operating in
the discontinuous conduction mode, the peak output voltage rippleΔv should be much
smaller in magnitude than the output voltage dc component V. So the linear-ripple
approximation applies to the output voltage waveform:
v(t)≈V (5.11)
(ii) Inductor current ripple . By deﬁnition, the inductor current ripple is not small in the
discontinuous conduction mode. Indeed, Eq. (5.3) states that the inductor current ripple
ΔiL is greater in magnitude than the dc componentI. So neglecting the inductor current
ripple leads to inaccurate results. In other converters, several inductor currents, or a
capacitor voltage, may contain large switching ripple which should not be neglected.
The equations necessary for solution of the voltage conversion ratio can be obtained by invoking
volt-second balance for each inductor voltage, and charge balance for each capacitor current, in
the network. The switching ripple is ignored in the output capacitor voltage, but the inductor
current switching ripple must be accounted for in this buck converter example.
Let us analyze the conversion ratio M= V/V
g of the buck converter of Eq. (5.1). When the
transistor conducts, for 0< t< D1Ts, the converter circuit reduces to the network of Fig. 5.7a.
The inductor voltage and capacitor current are given by
vL(t)= Vg−v(t) (5.12)
iC(t)= iL(t)−v(t)
R
By making the linear-ripple approximation, to ignore the output capacitor voltage ripple, one
obtains
vL(t)≈Vg−V (5.13)
iC(t)≈iL(t)−V
R
Note that the inductor current ripple has not been ignored.
The diode conducts during subinterval 2, D1Ts< t< (D1+ D2)Ts. The circuit then reduces
to Fig. 5.7b. The inductor voltage and capacitor current are given by
vL(t)=−v(t) (5.14)
iC(t)= iL(t)−v(t)
R
By neglecting the ripple in the output capacitor voltage, one obtains
vL(t)≈−V (5.15)
iC(t)≈iL(t)−V
R
The diode becomes reverse-biased at time t= (D1+ D2)Ts. The circuit is then as shown in
Fig. 5.7c, with both transistor and diode in the o ﬀstate. The inductor voltage and inductor

142 5 The Discontinuous Conduction Mode
Fig. 5.7 Buck converter circuits for op-
eration in the discontinuous conduction
mode: (a) during subinterval 1, (b) during
subinterval 2, (c) during subinterval 3
(a)
+Vg
L
CR
+
v(t)
iC(t)+ vL(t)
iL(t)
(b)
+Vg
L
CR
+
v(t)
iC(t)+ vL(t)
iL(t)
(c)
+Vg
L
CR
+
v(t)
iC(t)+ vL(t)
iL(t)
current are both zero for the remainder of the switching period ( D1+ D2)Ts < t< Ts.T h e
network equations for the third subinterval are given by
vL= 0, iL= 0 (5.16)
iC(t)= iL(t)−v(t)
R
Note that the inductor current is constant and equal to zero during the third subinterval, and
therefore the inductor voltage must also be zero in accordance with the relationship vL(t)=
Ld iL(t)/dt. In practice, parasitic ringing is observed during this subinterval. This ringing occurs
owing to the resonant circuit formed by the inductor and the semiconductor device capacitances,
and typically has little inﬂuence on the converter steady-state properties. Again ignoring the
output capacitor voltage ripple, one obtains
vL(t)= 0 (5.17)
iC(t)=−V
R
Equations (5.13), (5.15), and (5.17) can now be used to plot the inductor voltage waveform as
in Fig. 5.8. According to the principle of inductor volt-second balance, the dc component of this
waveform must be zero. Since the waveform is rectangular, its dc component (or average value)

5.2 Analysis of the Conversion Ratio M(D, K) 143
Fig. 5.8 Inductor voltage waveform
vL(t), buck converter operating in discon-
tinuous conduction mode
vL(t)
0
Ts t
D1Ts D2Ts D3Ts
Vg
is easily evaluated:
⟨vL(t)⟩= D1(Vg−V)+ D2(−V)+ D3(0)= 0 (5.18)
Solution for the output voltage yields
V= Vg
D1
D1+ D2
(5.19)
The transistor duty cycle D (which coincides with the subinterval 1 duty cycle D1) is the con-
trol input to the converter, and can be considered known. But the subinterval 2 duty cycle D2
is unknown, and hence another equation is needed to eliminate D2 and solve for the output
voltage V.
The second equation is obtained by use of capacitor charge balance. The connection of the
capacitor to its adjacent components is detailed in Fig.5.9. The node equation of this network is
iL(t)= iC(t)+ v(t)
R (5.20)
By capacitor charge balance, the dc component of capacitor current must be zero:
⟨iC⟩= 0 (5.21)
Therefore, the dc load current must be supplied entirely by the other elements connected to the
node. In particular, for the case of the buck converter, the dc component of inductor current
must be equal to the dc load current:
⟨iL⟩= V
R (5.22)
So we need to compute the dc component of the inductor current.
Since the inductor current ripple is not small, determination of the inductor current dc com-
ponent requires that we examine the current waveform in detail. The inductor current waveform
is sketched in Fig. 5.10. The current begins the switching period at zero, and increases during
Fig. 5.9 Connection of the output capacitor to adja-
cent components in the buck converter
L
CR
+
v(t)
iC(t)
iL(t) v(t)/R

144 5 The Discontinuous Conduction Mode
Fig. 5.10 Inductor current
waveform iL(t), buck converter
operating in discontinuous
conduction mode
iL(t)
t0D T s Ts
D1Ts D2Ts D3Ts
iL = I
ipkVg V
L
V
L
the ﬁrst subinterval with a constant slope, given by the applied voltage divided by the induc-
tance. The peak inductor current ipk is equal to the constant slope, multiplied by the length of
the ﬁrst subinterval:
iL(D1Ts)= ipk= Vg−V
L D1Ts (5.23)
The dc component of the inductor current is again the average value:
⟨iL⟩= 1
Ts
∫ Ts
0
iL(t)dt (5.24)
The integral, or area under the iL(t) curve, is the area of the triangle having height ipk and
base dimension (D1+ D2)Ts. Use of the triangle area formula yields
∫ Ts
0
iL(t)dt= 1
2ipk(D1+ D2)Ts (5.25)
Substitution of Eqs. (5.23) and (5.25) into Eq. (5.24) leads to
⟨iL⟩= (Vg−V)
⎦D1Ts
2L
)
(D1+ D2) (5.26)
Finally, by equating this result to the dc load current, according to Eq. (5.22), we obtain
V
R= D1Ts
2L (D1+ D2)(Vg−V) (5.27)
Thus, we have two unknowns, V and D2, and we have two equations. The ﬁrst equation, Eq.
(5.19), was obtained by inductor volt-second balance, while the second equation, Eq. ( 5.27),
was obtained using capacitor charge balance. Elimination of D2 from the two equations, and
solution for the voltage conversion ratio M(D1, K)= V/Vg, yields
V
Vg
= 2
1+
√
1+ 4K
D2
1
(5.28)
where K= 2L/RTs
valid for K< Kcrit

5.3 Boost Converter Example 145
Fig. 5.11 V oltage conversion
ratio M(D, K), buck converter
0.0
0.2
0.4
0.6
0.8
1.0
M(D,K)
0.0 0.2 0.4 0.6 0.8 1.0
D
K = 0.01
K = 0.1
K = 0.5
K 1
This is the solution of the buck converter operating in discontinuous conduction mode.
The complete buck converter characteristics, including both continuous and discontinuous
conduction modes, are therefore
M=
⎧⎪⎪
⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎪⎪⎩
D for K> K
crit
2
1+
√
1+ 4K
D2
for K< Kcrit (5.29)
where the transistor duty cycle D is identical to the subinterval 1 duty cycle D1 of the above
derivation. These characteristics are plotted in Fig. 5.11, for several values of K. It can be seen
that the eﬀect of the discontinuous conduction mode is to cause the output voltage to increase.
As K tends to zero (the unloaded case), M tends to unity for all nonzero D. The characteristics
are continuous, and Eq. (5.28) intersects the CCM characteristic M= D at the mode boundary.
5.3 Boost Converter Example
As a second example, consider the boost converter of Fig. 5.12. Let us determine the bound-
ary between modes, and solve for the conversion ratio in the discontinuous conduction mode.
Behavior of the boost converter operating in the continuous conduction mode was analyzed pre-
viously, in Sect. 2.3, and expressions for the inductor current dc component I and ripple peak
magnitudeΔiL were found.
When the diode conducts, its current is identical to the inductor current iL(t). As can be
seen from Fig. 2.18, the minimum value of the inductor current during the diode conduction
subinterval DTs < t< Ts is (I−ΔiL). If this minimum current is positive, then the diode is

146 5 The Discontinuous Conduction Mode
Fig. 5.12 Boost converter example
+ Q1
L
CR
+
v(t)
D1
Vg
i(t)
+ vL(t)
iD(t)
iC(t)
forward-biased for the entire subinterval DTs< t< Ts, and the converter operates in the contin-
uous conduction mode. So the conditions for operation of the boost converter in the continuous
and discontinuous conduction modes are
I>ΔiL for CCM (5.30)
I<ΔiL for DCM
which is identical to the results for the buck converter. Substitution of the CCM solutions for I
andΔiL,E q s .(2.39) and (2.43), yields
Vg
D′2R> DTsVg
2L for CCM (5.31)
This equation can be rearranged to obtain
2L
RTs
> DD′2 for CCM (5.32)
which is in the standard form
K> Kcrit(D) for CCM (5.33)
K< Kcrit(D)f o rD C M
where
K= 2L
RTs
and Kcrit(D)= DD′2
The conditions for operation in the continuous or discontinuous conduction modes are of similar
form to those for the buck converter; however, the critical value Kcrit(D)i sad iﬀerent function
of the duty cycle D. The dependence of Kcrit(D) on the duty cycle D is plotted in Fig. 5.13.
Kcrit(D) is zero at D= 0 and at D= 1, and has a maximum value of 4/27 at D= 1/3. Hence, if
K is greater than 4/27, then the converter operates in the continuous conduction mode for all D.
Figure 5.14 illustrates what happens when K is less than 4/27. The converter then operates in
the discontinuous conduction mode for some intermediate range of values of D near D= 1/3.
But the converter operates in the continuous conduction mode near D= 0 and D= 1. Unlike
the buck converter, the boost converter must operate in the continuous conduction mode near
D= 0 because the ripple magnitude approaches zero while the dc component I does not.

5.3 Boost Converter Example 147
Fig. 5.13 Boost converter
Kcrit(D)v s .D
0
0.05
0.1
0.15
Kcrit(D)
0 0.2 0.4 0.6 0.8 1
D
Kcrit
1
3 = 4
27
Fig. 5.14 Comparison of K
with Kcrit(D)
0
0.05
0.1
0.15
K
crit
(D)
0 0.2 0.4 0.6 0.8 1
D
K
K < Kcrit
DCM CCM
K > Kcrit
CCM
Next, let us analyze the conversion ratio M= V/Vg of the boost converter. When the tran-
sistor conducts, for the subinterval 0< t< D1Ts, the converter circuit reduces to the circuit of
Fig. 5.15a. The inductor voltage and capacitor current are given by
vL(t)= Vg (5.34)
iC(t)=−v(t)
R

148 5 The Discontinuous Conduction Mode
Fig. 5.15 Boost converter circuits
for operation in the discontinuous
conduction mode: ( a) during
subinterval 1, 0 < t< D1Ts,
(b) during subinterval 2,
D1Ts< t< (D1+ D2)Ts,( c) during
subinterval 3, (D1+ D2)Ts< t< Ts
(a)
CR
+
v(t)
iC(t)
+
L
Vg
i(t)
+ vL(t)
(b)
CR
+
v(t)
iC(t)
+
L
Vg
i(t)
+ vL(t)
(c)
CR
+
v(t)
iC(t)
+
L
Vg
i(t)
+ vL(t)
Use of the linear-ripple approximation, to ignore the output capacitor voltage ripple, leads to
vL(t)≈Vg (5.35)
iC(t)≈−V
R
During the second subinterval D1Ts < t< (D1+ D2)Ts, the diode conducts. The circuit then
reduces to Fig. 5.15b. The inductor voltage and capacitor current are given by
vL(t)= Vg−v(t) (5.36)
iC(t)= i(t)−v(t)
R
Neglect of the output capacitor voltage ripple yields
vL(t)≈Vg−V (5.37)
iC(t)≈i(t)−V
R
The inductor current ripple has not been neglected.

5.3 Boost Converter Example 149
During the third subinterval, (D1+ D2)Ts < t< Ts, both transistor and diode are in the oﬀ
state, and Fig. 5.15c is obtained. The network equations are
vL= 0, i= 0
iC(t)=−v(t)
R (5.38)
Use of the small-ripple approximation yields
vL(t)= 0 (5.39)
iC(t)=−V
R
Equations (5.35), (5.37), and (5.39) are now used to sketch the inductor voltage waveform as
in Fig. 5.16. By volt-second balance, this waveform must have zero dc component when the
converter operates in steady state. By equating the average value of thisvL(t) waveform to zero,
one obtains
D1Vg+ D2(Vg−V)+ D3(0)= 0 (5.40)
Solution for the output voltage V yields
V= D1+ D2
D2
Vg (5.41)
The diode duty cycleD2 is again an unknown, and so a second equation is needed for elimination
of D2 before the output voltage V can be found.
We can again use capacitor charge balance to obtain the second equation. The connection
of the output capacitor to its adjacent components is detailed in Fig. 5.17. Unlike the buck
converter, the diode in the boost converter is connected to the output node. The node equation
of Fig. 5.17 is
iD(t)= iC(t)+ v(t)
R (5.42)
Fig. 5.16 Inductor voltage waveform
vL(t), boost converter operating in discon-
tinuous conduction mode
vL(t)
0
Ts t
D1Ts D2Ts D3Ts
Vg
Vg
Fig. 5.17 Connection of the output capacitor to ad-
jacent components in the boost converter
CR
+
v(t)
D1 iD(t)
iC(t)

150 5 The Discontinuous Conduction Mode
where iD(t) is the diode current. By capacitor charge balance, the capacitor current iC(t)m u s t
have zero dc component in steady state. Therefore, the diode current dc component ⟨iD⟩ must
be equal to the dc component of the load current:
⟨iD⟩= V
R (5.43)
So we need to sketch the diode current waveform, and ﬁnd its dc component.
The waveforms of the inductor currenti(t) and diode current iD(t) are illustrated in Fig.5.18.
The inductor current begins at zero, and rises to a peak value ipk during the ﬁrst subinterval.
This peak value ipk is equal to the slope Vg/L, multiplied by the length of the ﬁrst subinterval,
D1Ts:
ipk= Vg
L D1Ts (5.44)
The diode conducts during the second subinterval, and the inductor current then decreases to
zero, where it remains during the third subinterval. The diode current iD(t) is identical to the
inductor current i(t) during the second subinterval. During the ﬁrst and third subintervals, the
diode is reverse-biased and hence iD(t) is zero.
The dc component of the diode current,⟨iD⟩,i s
⟨iD⟩= 1
Ts
∫ Ts
0
iD(t)dt (5.45)
(a) i(t)
t0 DTs Ts
D1Ts D2Ts D3Ts
ipkVg
L
Vg V
L
(b) iD(t)
t0 DTs Ts
D1Ts D2Ts D3Ts
ipk
iD 
Vg V
L
Fig. 5.18 Boost converter waveforms in the discontinuous conduction mode: (a) inductor current i(t), (b)
diode current iD(t)

5.3 Boost Converter Example 151
The integral is the area under the iD(t) waveform. As illustrated in Fig. 5.18b, this area is the
area of the triangle having peak value ipk and base dimension D2Ts:
∫ Ts
0
iD(t)dt= 1
2 iρkD2Ts (5.46)
Substitution of Eqs. (5.44) and (5.46) into Eq. (5.45) leads to the following expression for the
dc component of the diode current:
⟨iD⟩= 1
Ts
⎦1
2 ipk D2Ts
)
= VgD1D2Ts
2L (5.47)
By equating this expression to the dc load current as in Eq. (5.43), one obtains the ﬁnal result
VgD1D2Ts
2L = V
R (5.48)
So now we have two unknowns, V and D2. We have two equations: Eq. ( 5.41) obtained via
inductor volt-second balance, and Eq. ( 5.48) obtained using capacitor charge balance. Let us
now eliminate D2 from this system of equations, and solve for the output voltageV. Solution of
Eq. (5.41)f o rD2 yields
D2= D1
Vg
V−Vg
(5.49)
By inserting this result into Eq. ( 5.48), and rearranging terms, one obtains the following
quadratic equation:
V2−VVg−
V2
g D2
1
K = 0 (5.50)
Use of the quadratic formula yields
V
Vg
=
1±
√
1+ 4D2
1
K
2 (5.51)
The quadratic equation has two roots: one of the roots of Eq. ( 5.51) is positive, while the other
is negative. We already know that the output voltage of the boost converter should be positive,
and indeed, from Eq. (5.41), it can be seen that V/Vg must be positive since the duty cycles D1
and D2 are positive. So we should select the positive root:
V
Vg
= M(D1, K)=
1+
√
1+ 4D2
1
K
2 (5.52)
where K= 2L/RTs
valid for K< Kcrit(D)
This is the solution of the boost converter operating in the discontinuous conduction mode.

152 5 The Discontinuous Conduction Mode
Fig. 5.19 V oltage conversion
ratio M(D, K) of the boost con-
verter, including both continu-
ous and discontinuous conduc-
tion modes
0
1
2
3
4
5
M(D,K)
0 0.25 0.5 0.75 1
D
K 
= 0.01
K = 0.05
K = 0.1
K 4/27
The complete boost converter characteristics, including both continuous and discontinuous
conduction modes, are
M=
⎧⎪⎪⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎪⎪⎩
1
1−D for K> Kcrit
1+
√
1+ 4D2
K
2 for K< Kcrit
(5.53)
These characteristics are plotted in Fig. 5.19, for several values of K. As in the buck converter,
the eﬀect of the discontinuous conduction mode is to cause the output voltage to increase. The
DCM portions of the characteristics are nearly linear, and can be approximated as
M≈1
2+ D√
K
(5.54)
5.4 Summary of Results and Key Points
The characteristics of the basic buck, boost, and buck–boost are summarized in Table 5.2.E x -
pressions for Kcrit(D), as well as for the solutions of the dc conversion ratios in CCM and DCM,
and for the DCM diode conduction duty cycle D2, are given.
The dc conversion ratios of the DCM buck, boost, and buck–boost converters are compared
in Fig. 5.20. The buck–boost characteristic is a line with slope 1 /
√
K. The characteristics of
the buck and the boost converters are both asymptotic to this line, as well as to the line M=
1. Hence, when operated deeply into the discontinuous conduction mode, the boost converter
characteristic becomes nearly linear with slope 1/
√
K, especially at high duty cycle. Likewise,
the buck converter characteristic becomes nearly linear with the same slope, when operated
deeply into discontinuous conduction mode at low duty cycle.

5.4 Summary of Results and Key Points 153
Table 5.2 Summary of CCM-DCM characteristics for the buck, boost, and buck–boost converters
Converter Kcrit(D)D C M M(D, K)D C M D2(D, K) CCM M(D)
Buck (1 −D) 2
1+
√
1+ 4K/D2
K
D M(D, K) D
Boost D(1−D)2 1+
√
1+ 4D2/K
2
K
D M(D, K) 1
1−D
Buck–boost (1 −D)2 −D√
K
√
K −D
1−D
with K= 2L/RTs. DCM occurs for K< Kcrit.
Fig. 5.20 Comparison of the dc
conversion ratios of the buck–boost,
buck, and boost converters oper-
ated in the discontinuous conduction
mode
0
1
0 0.2 0.4 0.6 0.8 1
D
Boost
Buck
Buck-boost
 (
DCM
M(D,K)
1
K
The following are the key points of this chapter:
1. The discontinuous conduction mode occurs in converters containing current- or voltage-
unidirectional switches, when the inductor current or capacitor voltage ripple is large
enough to cause the switch current or voltage to reverse polarity.
2. Conditions for operation in the discontinuous conduction mode can be found by determin-
ing when the inductor current or capacitor voltage ripples and dc components cause the
switch on state current or oﬀstate voltage to reverse polarity.
3. The dc conversion ratio M of converters operating in the discontinuous conduction mode
can be found by application of the principles of inductor volt-second and capacitor charge
balance.
4. Extra care is required when applying the small-ripple approximation. Some waveforms,
such as the output voltage, should have small ripple which can be neglected. Other wave-
forms, such as one or more inductor currents, may have large ripple that cannot be ignored.

154 5 The Discontinuous Conduction Mode
5. The characteristics of a converter changes signiﬁcantly when the converter enters DCM.
The output voltage becomes load-dependent, resulting in an increase in the converter output
impedance.
Problems
5.1 The elements of the buck–boost converter of Fig.5.21 are ideal: all losses may be ignored.
Your results for parts (a) and (b) should agree with Table5.2.
Fig. 5.21 Buck–boost converter of
Problems 5.1, 5.2,a n d5.16 + LC R
+
VVg
Q1 D1
i(t)
(a) Show that the converter operates in discontinuous conduction mode when K< Kcrit,
and derive expressions for K and Kcrit.
(b) Derive an expression for the dc conversion ratio V/Vg of the buck–boost converter
operating in discontinuous conduction mode.
(c) For K= 0.1, plot V/Vg over the entire range 0≤D≤1.
(d) Sketch the inductor voltage and current waveforms for K= 0.1 and D= 0.3. Label
salient features.
(e) What happens to V at no load (R→∞)? Explain why, physically.
5.2 For this problem, the buck–boost converter of Fig. 5.21 employs a diode having forward
voltage drop VD. All other elements should be modeled as ideal. Express your results in
terms of the transistor duty cycle D, the input voltage Vg, the diode forward voltage drop
VD, and the dimensionless parameter K= 2L/RTs where Ts is the switching period.
(a) Derive an expression for the conditions under which this converter operates in the
discontinuous conduction mode. Express your result in the form K< Kcrit, and give
an expression for Kcrit.
(b) Derive an equation for the steady-state output voltage V. Manipulate your equation
into the form
V= f
⎦
D, K, Vg, VD
)
5.3 A certain buck converter contains a synchronous rectiﬁer, as described in Sect. 4.1.5.
(a) Does this converter operate in the discontinuous conduction mode at light load? Ex-
plain.
(b) The load resistance is disconnected ( R→∞), and the converter is operated with duty
cycle 0.5. Sketch the inductor current waveform.
```
