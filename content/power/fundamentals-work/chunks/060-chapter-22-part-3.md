---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第22章part 3 - 22 Resonant Conversion
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 971-990 > Chunk ID: `chapter-22-part-3`"
---

# 第22章part 3 - 22 Resonant Conversion

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 971-990  
> Chunk ID: `chapter-22-part-3`

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
22.4 Load-Dependent Properties of Resonant Converters 973
(a) (b)
Fig. 22.41 Tank network of the LLC inverter example: (a) with load shorted, (b) with load open-circuited
with
Ro0=
√
Ls
C
n= Lp
Ls
F= fs
f∞
(22.80)
For switching frequencies fs > fm, the tank circuit exhibits the desirable property that the
tank input current decreases as the load current decreases. Operation of this converter at high
frequency f
s > f0 combines the desirable properties of zero-voltage switching at all loads and
of tank input current that scales monotonically with load current. Over this range of frequencies,
the LLC exhibits a conversion ratio less than unity, similar to the series resonant circuit. In the
vicinity of f∞,t h eLLC is capable of boost-type conversion ratios that can become large at light
load.
Figure 22.43 illustrates the output characteristic of theLLC, for the example fm< fs< f0.I t
can be observed that, for this example,Rcrit < Ro0; therefore, the converter exhibits the desirable
property that the zero-voltage switching region includes the matched-load conditions as well as
open-circuit conditions.
Figure 22.44 illustrates typical control plane M vs. F characteristics of the LLC converter,
as predicted by the CCM sinusoidal approximation result of Eq. ( 22.85). Contours for various
values of load resistance are shown, with the speciﬁc choice L
p = 5Ls.F o rl o wQ (large load
resistance), the characteristics exhibit a resonance near f∞with parallel resonant (boost) charac-
teristics. For large Q (low load resistance), the characteristics exhibit a resonance near f0 with
series resonant (buck) characteristics.
22.4.6 Results for Basic Tank Networks
The tank networks of Fig. 22.1 can be written in the form shown in Fig. 22.39b. The series and
shunt branch reactances are listed in Table 22.1. In this section, the resonant converter general
solution and key equations are listed, as functions of the branch reactances Xs and Xp.
The tank network input impedance is Zi0 = jXsfor Re = 0, and is Zi∞= j(Xs+ Xp)f o r
Re=∞. The unloaded tank transfer function is
H∞(ω)= Xp
Xp+ Xs
(22.81)

974 22 Resonant Conversion
The matched-load impedance (tank output impedance when the input is shorted) is
Zo0(ω)= jXsXp
Xs+ Xp
= jXsH∞(ω) (22.82)
Matched-load resistance occurs at Re= Ro0, where Ro0=∥ Zo0∥.
Fig. 22.42 Tank input impedance∥ Zi∥ for the LLC tank circuit
Fig. 22.43 Output plane characteristic of the LLC inverter

22.4 Load-Dependent Properties of Resonant Converters 975
The critical load resistance at the boundary betweem ZVS and ZCS is
Rcrit =∥ Zo0∥
√
−Zi∞
Zi0
=| Xp|
√
−Xs
Xs+ Xp
(22.83)
The frequency f = fm, where∥ Zi∞∥=∥ Zi0∥, can be shown to occur at the frequency where
Xs=−Xp/2.
If we deﬁne the conversion ratio M= Vout/Vin, the normalized load current J= IoutR0/Vin,
and the eﬀective quality factor as Qe = R0/Re, then the elliptical output characteristic can be
written ⎦M
a
)2
+
⎦J
b
)2
= 1 (22.84)
and the control characteristic can be written
0.5 1 1.5 2 2.5 3 3.5 4
0
0.5
1
1.5
2
2.5
3
Q = 0
Q = 0.25
0.35
0.5
0.75
1
1.52 3 5 10
25
F
M
Fig. 22.44 Typical control plane characteristic of the LLC inverter, as predicted by the CCM sinusoidal
approximation
Table 22.1 Branch reactances of basic tank networks
Tank Series branch reactance Xs Shunt branch reactance Xp
Series ωL−1
ωC ∞
Parallel ωL −1
ωC
LCC ωL−1
ωCs
−1
ωCp
LLC ωLs−1
ωC ωLp

976 22 Resonant Conversion
M= 1√
1
a2 +
⎦Qe
b
)2
(22.85)
where the parameters a and b are given by
a=∥ H∞(ω)∥= | Xp|
| Xp+ Xs|
b=∥ H∞(ω)∥R0
∥ Zo0(ω)∥ = R0
| Xs|
(22.86)
The above equations describe the solutions of all of the inverters of Fig. 22.1, based on the
sinusoidal approximation. For the series tank, a= 1.
22.5 Exact Characteristics of the Series and Parallel Resonant Converters
The exact steady-state behavior of resonant converters can be determined via methods such as
state plane analysis. A detailed analysis of resonant dc–dc converters is beyond the scope of
this book. However, the exact steady-state characteristics of ideal series [ 272, 306–313] and
parallel [299, 315–318] resonant dc–dc converters (Fig. 22.45) are summarized in this section.
Small-signal ac modeling has also been described in the literature; several relevant papers are
[320–323].
(a) L
+Vg
CQ1
Q2
Q3
Q4
D1
D2
D3
D4
1 : n
R
+
V
(b) L
+Vg C
Q1
Q2
Q3
Q4
D1
D2
D3
D4
1 : n
R
+
V
D5
D6
D7
D8
Fig. 22.45 Transformer-isolated resonant dc–dc converters: ( a) series resonant converter, ( b) parallel
resonant converter

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 977
22.5.1 Series Resonant Converter
At a given switching frequency, the series resonant dc–dc converter can operate in one continu-
ous conduction mode, and possibly in several discontinuous conduction modes. The mode index
k is deﬁned as the integer that satisﬁes
f0
k+ 1< fs< f0
k or 1
k+ 1< F< 1
k (22.87)
where F= fs/ f0 is the normalized switching frequency. The subharmonic numberξis deﬁned
as
ξ= k+ 1+ (−1)k
2 (22.88)
Values of k andξas functions of fs are summarized in Fig. 22.46a. The subharmonic numberξ
denotes the dominant harmonic that excites the tank resonance. When the converter is heavily
loaded, it operates in type k continuous conduction mode. As the load is reduced (i.e., as the
load resistance R is increased), the converter enters the type k discontinuous conduction mode.
Further reducing the load causes the converter to enter the type ( k−1) DCM, type ( k−2)
DCM,... , type 1 DCM. There is no type 0 DCM, and hence when the converter operates above
resonance, only the type 0 continuous conduction mode is possible.
In the type k continuous conduction mode, the series resonant converter exhibits elliptical
output characteristics, given by
M
2ξ2 sin2
⎦γ
2
)
+ 1
ξ2
⎦Jγ
2 + (−1)k
)2
cos2
⎦γ
2
)
= 1 (22.89)
For the transformer-isolated converters of Fig.22.45, M and J are related to the load voltage V
and load current I according to
M= V
nVg
J= InR0
Vg
(22.90)
Again, R0 is the tank characteristic impedance, referred to the transformer primary side. The
quantityγis the angular length of one-half of the switching period:
γ=ω0Ts
2 =π
F (22.91)
Equation (22.89) is valid only fork satisfying Eq. (22.87). It predicts that the voltage conversion
ratio M is restricted to the range
0≤M≤1
ξ (22.92)
This is consistent with Eq. (22.21).
Typical CCM tank current waveforms are illustrated in Fig.22.46. When k is even, the tank
inductor current is initially negative. In consequence, the switch network antiparallel diodes
conduct ﬁrst, for a fraction of a half resonant cycle. If k is odd, then each half-switching period
is initiated by conduction of the switch network transistors. In either case, this is followed by
(ξ−1) complete tank half-cycles of ringing. The half-switching period is then concluded by

978 22 Resonant Conversion
(a)
fs
f0f0 /2f0 /3
etc. k = 0k = 1k = 2k = 3
 = 1 = 3
(b)
iL(t)
st
Q1
Q1
D1
D1
(k
vs(t) Vg
g
Q1
Q2
(c)
iL(t)
st
Q1
Q1
D1
D1
D1
k complete half-cycles
vs(t) Vg
g
D2
Q2
Fig. 22.46 Continuous conduction modes of the series resonant converter: ( a) switching frequency
ranges over which various mode indices k and subharmonic numbersξoccur; (b) tank inductor current
waveform, type k CCM, for odd k;( c) tank inductor current waveform, type k CCM, for even k

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 979
a subinterval shorter than one complete resonant half-cycle, in which the device that did not
initially conduct is on. The next half- switching period then begins, and is symmetrical.
The steady-state control plane characteristic can be found for a resistive load R obeying
V= IR, by substitution of the normalized relationJ= MQ into Eq. (22.89), where Q= n2R0/R.
Use of the quadratic formula and some algebraic manipulations allows solution for M,a sa
function of load (via Q) and switching frequency (viaγ):
M=
⎦Qγ
2
)
ξ4 tan2
⎦γ
2
)
+
⎦Qγ
2
)2
⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢
⎢⎣
(−1)
k+1+
√1+
[
ξ2−cos2
⎦γ
2
)][
ξ4 tan2
⎦γ
2
)
+
⎦Qγ
2
)2]
⎦Qγ
2
)2
cos2
⎦γ
2
)
⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥
⎥⎦
(22.93)
This is the closed-form relationship between the conversion ratioM and the switching frequency,
for a resistive load. It is valid for any continuous conduction mode k.
The type k discontinuous conduction modes, for k odd, occur over the frequency range
f
s< f0
k (22.94)
In these modes, the output voltage is independent of both load current and switching frequency,
and is described by
M= 1
k (22.95)
The type k discontinuous conduction mode, for odd k, occurs over the range of load currents
given by
2(k+ 1)
γ> J> 2(k−1)
γ (22.96)
In the odd discontinuous conduction modes, the tank current rings for k complete resonant
half-cycles. All four output bridge rectiﬁer diodes then become reverse-biased, and the tank
current remains at zero until the next switching half-period begins, as illustrated in Fig. 22.51.
Series resonant converters are not normally purposely designed to operate in odd discontinuous
conduction modes, because the output voltage is not controllable. Nonetheless, when the load
is removed with f
s< f0, the series resonant converter operates in k= 1 DCM with M= 1.
The type k discontinuous conduction mode, for k even, also occurs over the frequency range
fs< f0
k (22.97)
Even discontinuous conduction modes exhibit current source characteristics, in which the load
current is a function of switching frequency and input voltage, but not of the load voltage. The
output relationship is
J= 2k
γ (22.98)
Operation in this mode occurs for
1
k−1> M> 1
k+ 1 (22.99)

980 22 Resonant Conversion
iL(t)
st
Q1
D1
k complete half-cycles
vs(t) Vg
g
Q2
X
D1
Fig. 22.47 Tank inductor current waveform, typek DCM, for even k
g+
Vg
+
V
Ig = gV Ig = gVg
g = 2k
R0
Fig. 22.48 Steady-state equivalent circuit model for an even discontinuous conduction mode: an eﬀective
gyrator. The converter exhibits current source characteristics
In the even discontinuous conduction modes, the tank current rings fork complete resonant half-
cycles during each switching half-period. All four output bridge then become reverse-biased,
and the tank current remains at zero until the next switching half-period is initiated. Tank current
waveforms are illustrated in Fig.22.47 for even DCM.
The series resonant converter possesses some unusual properties when operated in an even
discontinuous conduction mode. A dc equivalent circuit is given in Fig. 22.48, consisting of a
gyrator with gyration conductance g= 2k/gn2R0. The gyrator has the property of transforming
circuits into their dual networks; in the typical dc–dc converter application, the input voltage
source V
g is eﬀectively transformed into its dual, an output current source of value gVg. Series
resonant converters have been purposely designed to operate in thek= 2D C M ,a tp o w e rl e v e l s
of several tens of kW.
The complete control plane characteristics can now be plotted using Eqs. ( 22.87)–(22.99).
The result is shown in Fig. 22.49, and the mode boundaries are explicitly diagrammed in
Fig. 22.50. It can be seen that, for operation above resonance, the only possible operating mode
is the k= 0 CCM, and that the output voltage decreases monotonically with increasing switch-

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 981
0
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
1
0 0.2 0.4 0.6 0.8 1 1.2 1.4 1.6 1.8 2
M = V/Vg
F = fs / f0
Q = 20
10
5
3.5
2
1.5
1
0.75
0.5
0.35
Q = 0.2
Q = 20
10
5
3.5
2
1.5
1
0.75
0.5
0.35
Q = 0.2
Fig. 22.49 Complete control plane characteristics of the series resonant converter, for 0.2≤F≤2
0
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
1
0 0.2 0.4 0.6 0.8 1 1.2 1.4 1.6 1.8 2
M
F
k = 0 CCMk = 1 CCMk = 2 DCM
k = 2 CCM
k = 3 CCM
k = 4
DCM
k = 1 DCM
k = 3 DCM
etc.
Fig. 22.50 Continuous and discontinuous conduction mode boundaries

982 22 Resonant Conversion
iL(t)
st
Q1
Q1
D1
k complete half-cycles
vs(t) Vg
g
Q2
X
Fig. 22.51 Tank inductor current waveform, type k DCM, for odd k
ing frequency. Reduction in load current (or increase in load resistance, which decreases Q)
causes the output voltage to increase. A number of successful designs that operate above reso-
nance and utilize zero-voltage switching have been documented in the literature [300, 314].
Operation below resonance is complicated by the presence of subharmonic and discontinu-
ous conduction modes. The k= 1 CCM and k= 2 DCM are well behaved, in that the output
voltage increases monotonically with increasing switching frequency. Increase of the load cur-
rent again causes the output voltage to decrease. Successful designs that operate in these modes
and employ zero-current switching are numerous. However, operation in the higher-order modes
(k= 2 CCM, k= 4 DCM, etc.) is normally avoided.
Given F and Q, the operating mode can be evaluated directly, using the following algorithm.
First, the continuous conduction mode k corresponding to operation at frequency F with heavy
loading is found:
k= INT
⎦1
F
)
(22.100)
where INT (x) denotes the integer part of x. Next, the quantity k1 is determined:
k1= INT
⎛⎜⎜⎜⎜⎜⎝
1
2+
√
1
4+ Qπ
2F
⎞⎟⎟⎟⎟⎟⎠ (22.101)
The converter operates in type k CCM provided that:
k1> k (22.102)
Otherwise, the converter operates in typek1 DCM. A simple algorithm can therefore be deﬁned,
in which the conversion ratioM is computed for a givenF and Q.F i r s t ,E q s .(22.100)t o( 22.102)
are evaluated, to determine the operating mode. Then, the appropriate equation (22.93), (22.95),
or (22.98) is evaluated to ﬁnd M.

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 983
F = 1.30
F = 1.15
F = 1.10
F = 1.07
F = 1.05 F = 1.01
J
0 0.2 0.4 0.6 0.8 1
0
1
2
3
4
5
6
M
Fig. 22.52 Output characteristics, k= 0 CCM (above resonance)
Output I−V plane characteristics for the k= 0 CCM, plotted using Eq. (22.89), are shown
in Fig. 22.52. The constant-frequency curves are elliptical, and all pass through the point M=
1, J= 0. For a given switching frequency, the operating point is given by the intersection of the
elliptical converter output characteristic with the load I−V characteristic.
Output plane characteristics that combine the k= 1 CCM, k= 1 DCM, and k= 2D C M
are shown in Fig. 22.53. These were plotted using Eqs. ( 22.89), (22.95), and ( 22.98). These
curves were plotted with the assumption that the transistors are allowed to conduct no longer
than one tank half-cycle during each switching half-period; this eliminates subharmonic modes
and causes the converter to operate in k= 2o r k= 1 DCM whenever f
s< 0.5 f0. It can be seen
that the constant-frequency curves are elliptical in the continuous conduction mode, vertical
(voltage source characteristic) in the k= 1 DCM, and horizontal (current source characteristic)
in the k= 2D C M .
22.5.2 Parallel Resonant Converter
For operation in the frequency range 0.5 f0 < fs <∞, the parallel resonant dc–dc converter ex-
hibits one continuous conduction mode and one discontinuous conduction mode. Typical CCM
switch voltage vs(t), tank inductor current iL(t), and tank capacitor voltage vC(t) waveforms are
illustrated in Fig. 22.54. The CCM converter output characteristics are given by

984 22 Resonant Conversion
M
1.5
2.5
0.2 0.4 0.6 0.8
2
4
F = .5
F = .75
F = .85
F = .90
F = .93
F = .96
F = 1.0
F = .25
F = .1
k = 2 DCM
k = 1 CCM
k = 1 DCM
J
0
1
2
3
0 1
Fig. 22.53 Output characteristics, k= 1 CCM, k= 1D C M ,a n dk= 2 DCM (below resonance)
M=
⎦2
γ
) ⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
ϕ−sin(ϕ)
cos
⎦γ
2
)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(22.103)
ϕ=
⎧⎪⎪⎪⎪⎨⎪⎪⎪⎪⎩
−cos−1
⎦
cos
⎦γ
2
)
+ J sin
⎦γ
2
))
for 0<γ<π(above resonance)
+ cos−1
⎦
cos
⎦γ
2
)
+ J sin
⎦γ
2
))
forπ<γ<2π(below resonance)
(22.104)
and where M, J, andγare again deﬁned as in Eqs. ( 22.90) and (22.91). Given the normalized
load current J and the half-switching-period-angleγ, one can evaluate Eq. ( 22.104) to ﬁndϕ,
and then evaluate Eq. (22.103) to ﬁnd the converter voltage conversion ratio M. In other words,
the output voltage can be found for a given load current and switching frequency, without need
for computer iteration.
A discontinuous conduction mode mechanism occurs in the parallel resonant converter
which is the dual of the discontinuous conduction mode mechanism of the series resonant con-
verter. In this mode, a discontinuous subinterval occurs in which all four output bridge rectiﬁer
diodes are forward-biased, and the tank capacitor voltage remains at zero. This mode occurs
both above and below resonance when the converter is heavily loaded. Typical DCM tank ca-
pacitor voltage and inductor current waveforms are illustrated in Fig. 22.55. The condition for
operation in the discontinuous conduction mode is
J> J
crit(γ) for DCM (22.105)
J< Jcrit(γ) for CCM

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 985
V = vC(t)
Ts
vC(t)
iL(t)
vs(t)
Vg
g
0t
vC(t)
Fig. 22.54 Typical waveforms of the parallel resonant converter, operating in the continuous conduction
mode
where
Jcrit(γ)=−1
2 sin(γ)+
√
sin2
⎦γ
2
)
+ 1
4 sin2 (γ) (22.106)
The discontinuous conduction mode is described by the following set of equations:
MC0 = 1−cos(β)
JL0 = J+ sin(β)
cos(α+β)−2 cos(α)=−1
−sin(α+β)+ 2s i n (α)+ (δ−α)= 2J (22.107)
β+δ=γ
M= 1+
⎦2
γ
)
(J−δ)
Unfortunately, the solution to this set of equations is not known in closed form, because of
the mixture of linear and trigonometric terms. In consequence, the equations must be solved

986 22 Resonant Conversion
I
vC(t)
0t
D5
D6 D7
D8
D6 D7
D5 D8 D5 D8 D5 D8
D6 D7 D6 D7
0t
iL(t)
Fig. 22.55 Typical waveforms of the parallel resonant converter, operating in the discontinuous conduc-
tion mode
iteratively. For a givenγand J, a computer is used to iteratively ﬁnd the angles α, β, and δ.
M is then evaluated, and the output plane characteristics can be plotted. The result is given in
Fig. 22.56. The dashed lines are the DCM solutions, and the solid lines are the valid CCM so-
lutions. Figure 22.56 describes the complete dc behavior of the ideal parallel resonant converter
for all switching frequencies above 0.5 f0. For given values of normalized switching frequency
F= fs/ f0 =π/γ, the relationship between the normalized output current J and the normalized
output voltage M is approximately elliptical. At resonance ( F = 1), the CCM ellipse degen-
erates to the horizontal line J = 1, and the converter exhibits current source characteristics.
Above resonance, the converter can both step-up the voltage (M> 1) and step-down the voltage
(M< 1). The normalized load current is then restricted to J< 1, corresponding to I< Vg/nR0.
For a given switching frequency greater than the resonant frequency, the actual limit on maxi-
mum load current is even more restrictive than this limit. Below resonance, the converter can
also step-up and step-down the voltage. Normalized load currentsJ greater than one are also ob-
tainable, depending on M and F. However, no solutions occur whenM and J are simultaneously
large.

22.5 Exact Characteristics of the Series and Parallel Resonant Converters 987
M
J
0.0
0.5
1.0
1.5
2.0
2.5
3.0
0.0 0.5 1.0 1.5 2.0 2.5
F = 0.51
0.7
0.9
0.8
1.0
1.1
1.2
1.5
F = 2
1.3
0.6
Fig. 22.56 Exact output characteristics of the parallel resonant converter, for F > 0.5. Solid curves:
CCM, dashed curves: DCM
Q = 0.5
0.5 1.0 1.5 2.0 2.5 3.0
0.0
0.5
1.0
1.5
2.0
2.5
3.0
fs /f0
M = V/Vg
Q = 1
Q = 2
Q = 5
Q = 0.2
Fig. 22.57 Exact control characteristics of the parallel resonant converter, with a resistive load. Both
CCM and DCM operation is included, for 0.5≤F≤3

988 22 Resonant Conversion
In Fig. 22.57, the control plane characteristics are plotted for a resistive load. The parameter
Q is deﬁned for the parallel resonant converter as Q= R/n2R0. The normalized load current is
then given by J= M/Q.
22.6 Summary of Key Points
1. The sinusoidal approximation allows a great deal of insight to be gained into the operation
of resonant inverters and dc–dc converters. The voltage conversion ratio of dc–dc resonant
converters can be directly related to the tank network transfer function. Other important
converter properties, such as the output characteristics, dependence (or lack thereof) of
transistor current on load current, and zero-voltage- and zero-current-switching transitions,
can also be understood using this approximation. The approximation is accurate provided
that the eﬀective Q-factor is suﬃciently large, and provided that the switching frequency is
suﬃciently close to resonance.
2. Simple equivalent circuits are derived, which represent the fundamental components of the
tank network waveforms, and the dc components of the dc terminal waveforms.
3. Exact solutions of the ideal dc–dc series and parallel resonant converters are listed here as
well. These solutions correctly predict the conversion ratios, for operation not only in the
fundamental continuous conduction mode, but in discontinuous and subharmonic modes as
well.
4. Zero-voltage switching mitigates the switching loss caused by diode recovered charge and
semiconductor device output capacitances. When the objective is to minimize switching
loss and EMI, it is preferable to operate each MOSFET and diode with zero-voltage switch-
ing.
5. Zero-current switching leads to natural commutation of SCRs, and can also mitigate the
switching loss due to current tailing in IGBTs.
6. The input impedance magnitude ||Z
i||, and hence also the transistor current magnitude, are
monotonic functions of the load resistance R. The dependence of the transistor conduction
loss on the load current can be easily understood by simply plotting ∥Zi|| in the limiting
cases as R→∞and as R→0, or||Zi∞∥ and||Zi0∥.
7. The ZVS/ZCS boundary is also a simple function of Zi∞and Zi0. If ZVS occurs at open-
circuit and at short-circuit, then ZVS occurs for all loads. If ZVS occurs at short-circuit, and
ZCS occurs at open-circuit, then ZVS is obtained at matched load provided that ||Zi∞||>
||Zi0∥.
8. The output characteristics of all resonant inverters considered here are elliptical, and are
described completely by the open-circuit transfer function magnitude∥H∞∥, and the output
impedance∥Zo0∥. These quantities can be chosen to match the output characteristics to the
application requirements.
Problems
22.1 Analysis of a half-bridge dc–dc parallel resonant converter, operated above resonance .
In Fig. 22.58, the elements Cb, LF , and CF are large in value, and have negligible switch-
ing ripple. You may assume that all elements are ideal. You may use the sinusoidal ap-
proximation as appropriate.

22.6 Summary of Key Points 989
(a)
+Vg
160 V
L
10 μHCb
C
1.5 μF
n : 1
LF
CF
+
V
I
+
 v
s(t)
ig(t)
Q1
Q2
D1
D2
n = 20
(b) vs(t)
t
Vg
Ts
0
0 0.5 Ts
fs = 1/Ts
Fig. 22.58 Half-bridge parallel resonant converter of Problem 22.1:( a) schematic, ( b) switch voltage
waveform
(a) Sketch the waveform of the current ig(t).
(b) Construct an equivalent circuit for this converter, similar to Fig. 22.22, which mod-
els the fundamental components of the tank waveforms and the dc components of
the converter input current and output voltage. Clearly label the values and/or give
expressions for all elements in your model, as appropriate.
(c) Solve your model to derive an expression for the conversion ratioV/Vg= M(F, Qe, n).
At rated (maximum) load, this converter produces I= 20 A at V= 3.3V .
(d) What is the converter switching frequency fs at rated load?
(e) What is the magnitude of the peak transistor current at rated load?
At minimum load, the converter produces I= 2Aa t V= 3.3V .
(f) What is the converter switching frequency fs at minimum load?
(g) What is the magnitude of the peak transistor current at minimum load? Compare
with your answer from part (e)—what happens to the conduction loss and eﬃciency
at minimum load?
22.2 A dc–dc resonant converter contains an LCC tank network (Fig. 22.1d), with an output
ﬁlter containing a ﬁlter inductor as in the parallel resonant dc–dc converter.
(a) Sketch an equivalent circuit model for this converter, based on the approximate si-
nusoidal analysis method of Sect. 22.1. Give expressions for all elements in your
model.
(b) Solve your model, to derive an expression for the conversion ratio M= V/Vg.E x -
press M as a function of F = fs/ f∞, Qe = Re/R0, and n= Cs/Cp, where f∞is
deﬁned as in Eq. (22.50) and R0 is

990 22 Resonant Conversion
R0=
√
L(Cs+ Cp)
CsCp
(c)P l o tM vs. F,f o rn= 1 and Qe= 1, 2, and 5.
(d)P l o tM vs. F,f o rn= 0.25 and Qe= 1, 2, and 5.
22.3 Dual of the series resonant converter. In the converter illustrated in Fig.22.59, LF1, LF2,
and CF are large ﬁlter elements, whose switching ripples are small. L and C are tank
elements, whose waveforms iL(t) and vC(t) are nearly sinusoidal.
+Vg
LF1
LF2
CF
C
LiL(t)
vC(t)
Q1
Q2
D1
D2
D3
D4
Q3
Q4
Fig. 22.59 Dual of the series resonant converter, Problem 22.3
(a) Using the sinusoidal approximation method, develop equivalent circuit models for
the switch network, tank network, and rectiﬁer network.
(b) Sketch a Bode diagram of the parallel LC parallel tank impedance.
(c) Solve your model. Find an analytical solution for the converter voltage conversion
ratio M = V/Vg, as a function of the e ﬀective Qe and the normalized switching
frequency F= fs/ f0.S k e t c hM vs. F.
(d) What can you say about the validity of the sinusoidal approximation for this con-
verter? Which parts of your M vs. F plot of part (c) are valid and accurate?
22.4 The converter of Problem22.3 operates below resonance.
(a) Sketch the waveform vC(t). For each subinterval, label: (i) which of the diodes D1 to
D4 and transistors Q1 to Q4 conduct current, and (ii) which devices block voltage.
(b) Does the reverse recovery process of diodes D1 to D4 lead to switching loss? Do the
output capacitances of transistors Q1 to Q4 lead to switching loss?

22.6 Summary of Key Points 991
(c) Repeat parts (a) and (b) for operation above resonance.
22.5 A parallel resonant converter operates with a dc input voltage of Vg = 270 V . The con-
verter supplies 5 V to a dc load. The dc load power varies over the range 20 W–200 W. It
is desired to operate the power transistors with zero-voltage switching. The tank element
values are L= 57 μH, Cp = 0.9 nF, referred to the transformer primary. The parallel
resonant tank network contains an isolation transformer having a turns ratio of 52:1.
(a) Deﬁne F as in Eq. (22.19). Derive an expression for F, as a function of M and Qe.
(b) Determine the switching frequency, peak transistor current, and peak tank capacitor
voltage at the maximum load power operating point.
(c) Determine the switching frequency, peak transistor current, and peak tank capacitor
voltage at the minimum load power operating point.
22.6 In a certain resonant inverter application, the dc input voltage isVg= 320 V . The inverter
must produce an approximately sinusoidal output voltage having a frequency of 200
kHz. Under no load (output opencircuit) conditions, the inverter should produce a peak-
to-peak output voltage of 1500 V . The nominal resistive operating point is 200 Vrms
applied to 100Ω. A nonisolated LCC inverter is employed. It is desired that the inverter
operate with zero-voltage switching, at least for load resistances less than 200Ω.
(a) Derive expressions for the output open-circuit voltage V
oc and short-circuit current
Isc of the LCC inverter. Express your results as functions of F= fs/ f∞, Vg, R∞=
L/Cs||Cp and n = Cs/Cp. The open-circuit resonant frequency f∞is deﬁned in
Eq. (22.50).
(b) To meet the given speciﬁcations, how should the short-circuit current Isc be chosen?
(c) Specify tank element values that meet the speciﬁcations.
(d) Under what conditions does your design operate with zero-voltage switching?
(e) Compute the peak transistor current under no-load and short-circuit conditions.
22.7 A series resonant dc–dc converter operates with a dc input voltage of Vg = 550 V . The
converter supplies 30 kV to a load. The dc load power varies over the range 5 kW–25 kW.
It is desired to operate the power transistors with zero-voltage switching. The maximum
feasible switching frequency is 50 kHz. An isolation transformer having a 1:n turns ratio
is connected in series with the tank network. The peak tank capacitor voltage should be
no greater than 2000 V , referred to the primary.
(a) Derive expressions for the peak tank capacitor voltage and peak tank inductor cur-
rent.
(b) Select values for the tank inductance, tank capacitance, and turns ratio, such that the
given speciﬁcations are met. Attempt to minimize the peak tank inductor current,
while maximizing the worst-case minimum switching frequency.
22.8 Figure 22.60 illustrates a full-bridge resonant inverter containing an LLC tank network.
(a) Sketch the Bode diagrams of the input impedance under short-circuit and open-
circuit conditions:||Z
i0( jω)|| and∥Zi∞( jω)||. Give analytical expressions for the reso-
nant frequencies and asymptotes.
(b) Describe the conditions on switching frequency and load resistance that lead to zero-
voltage switching.
(c) Derive an expression for the frequency fm, where∥Zi0||=∥Zi∞||.
(d) Sketch the Bode plot of∥H∞( jω)||. Label the resonant frequency, and give analytical
expressions for the asymptotes.

992 22 Resonant Conversion
+Vg
Q1
Q2
Q3
Q4
D1
D2
D3
D4
R
+
VLp
LsC
I
Fig. 22.60 LLC inverter of Problem 22.8
+Vg
12 V
Q1
Q2
Q3
Q4
D1
D2
D3
D4
1 : n
R
+
V
Lp
15 μH
Ls
2.5 μH
C
0.4 μF
n = 7.5
I
Fig. 22.61 Transformer-isolated LLC inverter, Problem22.9
22.9 You are given the LLC inverter circuit of Fig. 22.61. Under nominal conditions, this
converter operates at switching frequency fs= 100 kHz. All elements are ideal.
(a) Determine the numerical values of the open-circuit peak output voltage Voc and the
short-circuit peak output current Isc.
(b) Sketch the elliptical output characteristic. Over what portion of this ellipse does the
converter operate with zero-voltage switching? Does it operate with zero-voltage
switching at matched load?
(c) Sketch the Bode plots of∥Zi∞∥ and∥Zi0∥, and label the numerical values of f0, f∞, fm,
and fs.
(d) What is the numerical value of the peak transistor current when R= 0? When R→
∞?
(e) The inverter operates with load resistances that can vary between 500 Ωand an
open-circuit. What is the resulting range of output voltage? Does the inverter always
operate with zero-voltage switching?
22.10 It is desired to obtain a converter with current source characteristics. Hence, a series
resonant converter is designed for operation in thek= 2 discontinuous conduction mode.
The switching frequency is chosen to be f
s = 0.225 f0, where f0 is the tank resonant
```
