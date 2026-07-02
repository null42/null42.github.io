---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第21章part 3 - 21 Pulse-Width Modulated Rectifiers
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 906-925 > Chunk ID: `chapter-21-part-3`"
---

# 第21章part 3 - 21 Pulse-Width Modulated Rectifiers

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 906-925  
> Chunk ID: `chapter-21-part-3`

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
21.5 RMS Values of Rectiﬁer Waveforms 907
⟨i2
Q⟩TS = V2
M
R2e
⎦
1−VM
V | sinωt|
)
sin2(ωt) (21.118)
One can now plug this expression into Eq. (21.112):
IQrms=
√
1
Tac
∫ Tac
0
⟨i2
Q⟩Ts dt
=
√
1
Tac
∫ Tac
0
V2
M
R2e
⎦
1−VM
V | sinωt|
)
sin2(ωt)dt (21.119)
which can be further simpliﬁed to
IQrms=
√
2
Tac
V2
M
R2e
∫ Tac/2
0
⎦
sin2(ωt)−VM
V sin3(ωt)
)
dt (21.120)
This involves integration of powers of sin(ωt) over a complete half-cycle. The integral can
be evaluated with the help of the following formula:
1
π
∫ π
0
sinn(θ)dθ=
⎧⎪⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎪⎩
2
π
2· 4· 6··· (n−1)
1· 3· 5··· n if n is odd
1· 3· 5··· (n−1)
2· 4· 6··· n if n is even
(21.121)
This type of integral commonly arises in rms calculations involving PWM rectiﬁers. The values
of the integral for several choices of n are listed in Table 21.2. Evaluation of the integral in
Eq. (21.120)u s i n gE q .(21.121) leads to the following result:
IQrms= VM
√
2Re
√
1−8
3π
VM
V = Iac rms
√
1−8
3π
VM
V (21.122)
Table 21.2 Solution of the integral of Eq. (21.121), for several values of n
n 1
π
∫ π
0
sinn(θ)dθ
1 2
π
2 1
2
3 4
3π
4 3
8
5 16
15π
6 15
48

908 21 Pulse-Width Modulated Rectiﬁers
It can be seen that the rms transistor current is minimized by choosing the output voltage V to
be as small as possible. The best that can be done is to choose V= VM, which leads to
IQrms= 0.39Iac rms (21.123)
Larger values of V lead to a larger rms transistor current.
A similar analysis for the rms diode current leads to the following expression
IDrms= Iac rms
√
8
3π
VM
V (21.124)
The choice V= VM maximizes the rms diode current, with the result
IDrms= 0.92Iac rms (21.125)
Larger values of V lead to smaller rms diode current.
Average currents can be computed in a similar way. The results are
IQav = Iac rms
2
√
2
π
⎦
1−π
8
VM
V
)
(21.126)
IDav= Iac rms
VM
2
√
2V
Expressions for rms, average, and peak currents of the power stage components of the con-
tinuous conduction mode boost converter are summarized in Table 21.3. Expressions are also
tabulated for ﬂyback and SEPIC topologies, operating in the continuous conduction mode. In
the case of the ﬂyback converter, an L1−C1 input ﬁlter is also included. In all cases, the eﬀects
of switching ripple are neglected.
21.5.2 Comparison of Single-Phase Rectiﬁer Topologies
When isolation is not a rectiﬁer requirement, and when it is acceptable that the dc output voltage
be marginally larger than the peak ac input voltage, then the boost converter is a very eﬀective
approach. For example, consider the design of a 1 kW rectiﬁer operating from the 240 Vrms
input line voltage. If the converter e ﬃciency and power factor are both approximately unity,
then the rms input current is I
rms = (1000W)/(240V)= 4.2 A. The dc output voltage is chosen
to be 380 V , or slightly larger than the peak ac input voltage. By use of Eq. ( 21.122), the rms
transistor current is found to be 2 A. This is quite a low value–less than half of the rms input
current, which demonstrates how eﬀectively the converter utilizes the power switch. The rms
diode current is 3.6 A, and the transistor and diode blocking voltages are 380 V . With a 120 A
ac input voltage, the transistor and diode rms currents increase to 6.6 A and 5.1 A, respectively.
The only real drawback of the boost converter is its inability to limit inrush currents. When
the dc output voltage is less than the instantaneous input voltage, the control circuit of the boost
rectiﬁer loses control of the inductor current waveform. A very large inrush current occurs when
the dc output capacitor is initially charged. Additional circuitry must be employed to limit the
magnitude of this current.
Buck–boost, SEPIC, and ´Cuk topologies can be used to solve the inrush current problem.
Since these converters have a d/(1−d) conversion ratio, their waveforms can be controlled

21.5 RMS Values of Rectiﬁer Waveforms 909
Table 21.3 Summary of PWM rectiﬁer current stresses for several converter topologies
rms Average Peak
CCM boost
Transistor Iac rms
√
1−8
3π
VM
V Iac rms
2
√
2
π
⎦
1−π
8
VM
V
)
Iac rms
√
2
Diode Idc
√
16
3π
V
VM
Idc 2Idc
V
VM
Inductor Iac rms Iac rms
2
√
2
π Iac rms
√
2
CCM ﬂyback, with n : 1 isolation transformer and input ﬁlter
Transistor, xfmr primary Iac rms
√
1+ 8
3π
VM
nV Iac rms
2
√
2
π Iac rms
√
2
⎦
1+ VM
nV
)
L1 Iac rms Iac rms
2
√
2
π Iac rms
√
2
C1 Iac rms
√
8
3π
VM
nV 0 Iac rms
√
2m a x
⎦
1, VM
nV
)
Diode, xfmr secondary Idc
√
3
2+ 16
3π
nV
VM
Idc 2Idc
⎦
1+ nV
VM
)
CCM SEPIC, nonisolated
Transistor Iac rms
√
1+ 8
3π
VM
V Iac rms
2
√
2
π Iac rms
√
2
⎦
1+ VM
V
)
L1 Iac rms Iac rms
2
√
2
π Iac rms
√
2
C1 Iac rms
√
8
3π
VM
V 0 Iac rms
√
2m a x
⎦
1, VM
V
)
L2 Iac rms
VM
V
√
3
2
Iac rms
√
2
VM
V Iac rms
VM
V
√
2
Diode Idc
√
3
2+ 16
3π
V
VM
Idc 2Idc
⎦
1+ V
VM
)
CCM SEPIC, with n : 1 isolation transformer
Transistor Iac rms
√
1+ 8
3π
VM
nV Iac rms
2
√
2
π Iac rms
√
2
⎦
1+ VM
nV
)
L1 Iac rms Iac rms
2
√
2
π Iac rms
√
2
C1, xfmr primary Iac rms
√
8
3π
VM
nV 0 Iac rms
√
2m a x
⎦
1, VM
nV
)
Diode, xfmr secondary Idc
√
3
2+ 16
3π
nV
VM
Idc 2Idc
⎦
1+ nV
VM
)
with, in all cases, Iac rms
Idc
=
√
2 V
VM
, ac input voltage= VM sin(ωt), dc output voltage= V.

910 21 Pulse-Width Modulated Rectiﬁers
when the output voltage is any positive value, but the price paid for this capability is increased
component stresses. For the same 1 kW rectiﬁer with 240 Vrms ac input and 380 V output, the
transistor rms current and peak voltage of the nonisolated SEPIC are 5.5 A and 719 V . The rms
diode current is 4.85 A. The semiconductor voltage stresses can be reduced by reducing the
output voltage, at the expense of increased rms currents. With a 120 V ac input voltage, the
transistor and diode rms currents increase to 9.8 A and 6.1 A, respectively.
Isolation can also be obtained in the SEPIC and other topologies, as discussed in Chap. 6.
The turns ratio of the isolation transformer can also be used to reduce the primary-side currents
when the dc output voltage is low. But the transformer winding rms currents are higher than
those of a dc–dc converter, because of the pulsating (twice-line frequency) power ﬂow. For
the 1 kW, 240 V ac input SEPIC example, with a 42 V 23.8 A dc load, and a 4:1 transformer
turns ratio, the rms transformer currents are 5.5 A (primary) and 36.4 A (secondary). The rms
transistor current is 6.9 A. At 120 V ac input voltage, these currents increase to 7.7 A, 42.5 A,
and 11.4 A, respectively.
21.6 Modeling Losses and Eﬃciency in CCM High-Quality Rectiﬁers
As in the case of dc–dc converters, we would like to model the converter loss elements so that we
can correctly specify the power stage components. The equivalent circuit approach used in the
dc–dc case can be generalized to include ac-dc low-harmonic rectiﬁers, although the resulting
equations are more complicated because of the low-frequency ac modulation of the waveforms.
A dc–dc boost converter and its steady-state equivalent circuit are illustrated in Fig. 21.36.
When the converter operates in equilibrium, the model of Fig.21.36b can be solved to determine
(a)
+ Q1
L
CR
+
v(t)
D1
vg(t)
ig(t) RL i(t)
(b)
+ R
+
v(t)vg(t)
ig(t) RL
i(t)
DRon
+
D : 1
VF
Fig. 21.36 Dc–dc boost converter (a) and a steady-state equivalent circuit (b), which models the inductor
resistance RL, MOSFET on-resistance Ron, and diode forward voltage drop VF

21.6 Modeling Losses and Eﬃciency in CCM High-Quality Rectiﬁers 911
(a)
Rvac(t)
iac(t) +
vg(t)
ig(t)
+
v(t)
id (t)
Q1
L
C
D1
Controller
i(t)
RL
(b)
+ R
+
v(t) = Vvg(t)
ig(t) RL
i(t) = I
d(t)Ron
+
d (t) : 1
VF
id (t)
C
(Large)
Fig. 21.37 Ac–dc boost rectiﬁer ( a) and a low-frequency equivalent circuit ( b), that models converter
losses and eﬃciency
the converter losses and eﬃciency. In the ac-dc case, the input voltagevg(t) is a rectiﬁed sinusoid,
and the controller varies the duty cycle d(t) to cause ig(t) to follow vg(t) according to
ig(t)= vg(t)
Re
(21.127)
The emulated resistance Re is chosen by the controller such that the desired dc output voltage
is obtained. Ac variations in d(t), vg(t), and several other system waveforms are not small, and
hence the small-signal approximation employed in Chaps. 7 to 18 is not justiﬁed. We can con-
tinue to model the low-frequency components of the converter via averaging, but the resulting
equivalent circuits are, in general, time-varying and nonlinear.
For the purposes of determining the rectiﬁer eﬃciency, it is assumed that (1) the inductor is
suﬃciently small, such that it has negligible inﬂuence on the ac-line frequency components of
the system waveforms and (2) the capacitor is large, so that the output voltagev(t) is essentially
equal to its equilibrium dc value, with negligible low- or high-frequency ac variations. So in the
ac-dc case, the model becomes as shown in Fig. 21.37. Low-frequency components (≪ fs)o f
the controller waveforms are sketched in Fig.21.38.
To ﬁnd the rectiﬁer waveforms, losses, and eﬃciency, we must solve the circuit of Fig.21.37b,
under the conditions that the controller varies the duty cycle d(t) such that Eq. (21.127)i ss a t -
isﬁed. This leads to time-varying circuit elements d(t)Ron and the d′(t) : 1 transformer. The
solution that follows involves the following steps: (1) solve for the d(t) waveform; (2) average
id(t) to ﬁnd its dc component, equal to the load currentI; and (3) ﬁnd other quantities of interest
such as the rectiﬁer eﬃciency.

912 21 Pulse-Width Modulated Rectiﬁers
0
1
2
3
4
5
6
0
2
4
6
8
10
0
100
200
300
vg(t)
vg(t)
ig(t)
ig(t)
id (t)
i(t) = I
t
0° 30° 60° 90° 120° 150° 180°
0° 30° 60° 90° 120° 150° 180°
d(t)
0
0.2
0.4
0.6
0.8
1
0° 30° 60° 90° 120° 150° 180°
Fig. 21.38 Typical low-frequency components of the boost rectiﬁer waveforms
The simpliﬁed boost converter circuit model of Fig. 21.39, in which only the MOSFET
conduction loss is accounted for, is solved here. However, the results can be generalized directly
to the circuit of Fig. 21.37b; doing so is left as a homework problem. A similar procedure can
also be followed to derive expressions for the losses and eﬃciencies of other rectiﬁer topologies.

21.6 Modeling Losses and Eﬃciency in CCM High-Quality Rectiﬁers 913
21.6.1 Expression for Controller Duty Cycle d(t)
The controller varies the duty cycle d(t) such that Eq. (21.127) is satisﬁed. By solving the input-
side loop of Fig. 21.39, we obtain
ig(t)d(t)Ron= vg(t)−d′(t)v (21.128)
Substitute Eq. (21.127)i n t o(21.128) to eliminate ig(t):
vg(t)
Re
d(t)Ron= vg(t)−d′(t)v (21.129)
with vg(t)= VM| sinωt| (21.130)
We can now solve for the duty cycled(t). The result is
d(t)= v−vg(t)
v−vg(t)Ron
Re
(21.131)
This expression neglects the converter dynamics, an assumption that is justiﬁed when these
dynamics are suﬃciently faster than the ac line voltage variation. The expression also neglects
operation in the discontinuous conduction mode near the zero crossing of the ac line voltage
waveform. This is justiﬁed when the rectiﬁer operates in the continuous conduction mode for
most of the ac line cycle, because the power loss near the zero crossing is negligible.
21.6.2 Expression for the DC Load Current
By charge balance on output capacitor C, the dc load current I is equal to the dc component of
the diode current id:
I=⟨id⟩Tac (21.132)
Solution of Fig. 21.39 for id(t) yields
id(t)= d′(t)ig(t)= d′(t)vg(t)
Re
(21.133)
From Eq. (21.131), d′(t)= 1−d(t)i sg i v e nb y
+ R
+
v(t) = Vvg(t)
ig(t) i(t) = I
d(t)Ron
d (t) : 1
id (t)
C
(Large)
Fig. 21.39 Simpliﬁed boost power stage low-frequency equivalent circuit, in which only the MOSFET
on-resistance is modeled

914 21 Pulse-Width Modulated Rectiﬁers
d′(t)=
vg(t)
⎦
1−Ron
Re
)
v−vg(t)Ron
Re
(21.134)
so
id(t)=
v2
g(t)
Re
⎦
1−Ron
Re
)
v−vg(t)Ron
Re
(21.135)
Now substitute vg(t)= VM sinωt, and integrate to ﬁnd⟨id(t)⟩Tac :
I=⟨id⟩Tac = 2
Tac
∫ Tac/2
0
⎛⎜⎜⎜⎜⎝
V2
M
Re
⎞⎟⎟⎟⎟⎠
⎦
1−Ron
Re
)
sin2(ωt)
⎦
v−VMRon
Re
sin(ωt)
) dt (21.136)
Again, Tac= 2π/ωis the ac line period. Equation (21.136) can be rewritten as
I= 2
Tac
V2
M
VRe
⎦
1−Ron
Re
) ∫ Tac/2
0
sin2(ωt)
1−a sin(ωt)dt (21.137)
where a=
⎦VM
V
) ⎦Ron
Re
)
(21.138)
By waveform symmetry, we need only integrate from 0 to Tac/4. Also, make the substitution
θ= ωt:
I= V2
M
VRe
⎦
1−Ron
Re
) 2
π
∫ π/2
0
sin2(θ)
1−a sin(θ)dθ (21.139)
Evaluation of this integral is tedious. It arises in not only the boost rectiﬁer, but in a number
of other high-quality rectiﬁer topologies as well. The derivation is not given here, but involves
the substitution z= tan(θ/2), performing a partial fraction expansion of the resulting rational
function of z, and integration of the results. The solution is
4
π
∫ π/2
0
sin2(θ)
1−a sin(θ)dθ= F(a)= 2
a2π
⎦
−2a−π+ 4s i n−1(a)+ 2 cos−1(a)√
1−a2
)
(21.140)
This equation is somewhat complicated, but it is in closed form, and can easily be evaluated by
computer spreadsheet. The quantity a, which is a measure of the loss resistance Ron relative to
the emulated resistance Re, is typically much smaller than 1. F(a) is plotted in Fig. 21.40.T h e
function F(a) can be well-approximated as follows:
F(a)≈1+ 0.862a+ 0.78a2 (21.141)
For|a|≤0.15, the F(a) predicted by this approximate expression is within 0.1% of the exact
value. If the a2 term is omitted, then the accuracy drops to ± 2% over the same range of a.
The rectiﬁer eﬃciencyηcalculated in the next section depends directly on F(a), and hence the
accuracy of F(a) coincides with the accuracy ofη.

21.6 Modeling Losses and Eﬃciency in CCM High-Quality Rectiﬁers 915
F(a)
a
0.00 0.05 0.10 0.15
0.85
0.9
0.95
1
1.05
1.1
1.15
Fig. 21.40 Plot of the integral F(a)v s .a
21.6.3 Solution for Converter Eﬃciency η
Now that we have found the dc load current, we can calculate the converter e ﬃciency η.T h e
average input power is
Pin=⟨pin(t)⟩Tac = V2
M
2Re
(21.142)
The average load power is
pout= VI= (V)
⎛⎜⎜⎜⎜⎝
V2
M
VRe
⎦
1−Ron
Re
) F(a)
2
⎞⎟⎟⎟⎟⎠ (21.143)
where a=
⎦VM
V
) ⎦Ron
Re
)
(21.144)
Here, we have substituted Eq. (21.139)f o rI.T h eeﬃciency is therefore
η= Pout
Pin
=
⎦
1−Ron
Re
)
F(a) (21.145)
by substitution of Eqs. (21.142) and (21.143). If desired, the parabolic approximation for F(a),
Eq. (21.141), can be employed. This leads to
η≈
⎦
1−Ron
Re
) ⎛⎜⎜⎜⎜⎜⎝1+ 0.862VM
V
Ron
Re
+ 0.78
⎦VM
V
Ron
Re
)2⎞⎟⎟⎟⎟⎟⎠ (21.146)
Equations (21.145) and ( 21.146)s h o wh o wt h eeﬃciency varies with MOSFET on-resistance
Ron and with ac peak voltage VM. Equation (21.145) is plotted in Fig. 21.41. It can be seen that
high eﬃciency is obtained when the peak ac line voltage VM is close to the dc output voltage V.
Eﬃciencies in the range 90% to 95% can then be obtained, even with MOSFET on-resistances
as high as 0.2Re. Of course, Fig. 21.41 is optimistic because it neglects sources of loss other
than the MOSFET conduction loss.

916 21 Pulse-Width Modulated Rectiﬁers
0.0 0.2 0.4 0.6 0.8 1.0
0.75
0.8
0.85
0.9
0.95
1
VM /V
Ron/Re = 0.05
Ron/Re = 0.1
Ron
/Re = 0.15
Ron
/Re = 0.2
Fig. 21.41 Boost rectiﬁer eﬃciency, Eq. (21.145), accounting for MOSFET on-resistance
21.6.4 Design Example
Let us utilize Fig. 21.41 to design for a given eﬃciency. Consider the following speciﬁcations:
Output voltage 390 V
Output power 500 W
rms input voltage 120 V
Eﬃciency 95%
Assume that losses other than the MOSFET conduction loss are negligible. The average input
power is
P
in= Pout
η= 500W
0.95 = 526 W (21.147)
The emulated resistance is therefore
Re=
V2
g,rms
Pin
= (120V)2
526W = 27.4Ω (21.148)
Also,
VM
V = 120
√
2V
390V = 0.435 (21.149)
From Fig. 21.41, or by evaluation of the exact equation (21.145), 95% eﬃciency with VM/V=
0.435 occurs with Ron/Re≈0.077. So we require a MOSFET having an on-resistance of
Ron≤(0.077)Re= (0.077)(27.4Ω)= 2.11Ω (21.150)
Of course, other converter losses have not been accounted for, which will reduce the eﬃciency.
It is instructive to compare this result with that obtained using the expressions for rms cur-
rent from Sect. 21.5. The rms transistor current of the ideal CCM boost converter is given by

21.7 Ideal Three-Phase Rectiﬁers 917
Eq. (21.122). The rms input current will be equal to Pin/Vg,rms = (526W)/(120V)= 4.38 A.
Hence, Eq. (21.122) predicts an rms transistor current of
IQrms= Iac rms
√
1−8
3π
VM
V
= (4.38 A)
√
1−8
3π
(120 V)
√
2
(390 V) (21.151)
= 3.48 A
Hence, the MOSFET on-resistance should be chosen according to
Ron≤Pin−Pout
I2
Qrms
= (526 W)−(500 W)
(4.38 A)2 = 2.17Ω (21.152)
This calculation is approximate because Eq. ( 21.122) was derived using the waveforms of the
ideal (lossless) converter. Nonetheless, it gives an answer that is very close to the more exact
result of Eq. (21.150). We would expect this approximate approach to exhibit good accuracy in
this example, because of the high 95% eﬃciency.
21.7 Ideal Three-Phase Rectiﬁers
The single-phase ideal rectiﬁer concepts of the previous sections can be generalized to cover
ideal three-phase rectiﬁers. Figure 21.42a illustrates the properties of an ideal three-phase rec-
tiﬁer, which presents a balanced resistive load to the utility system. A three-phase converter
system is controlled such that resistor emulation is obtained in each input phase. The rectiﬁer
three-phase input port can then be modeled by per-phase eﬀective resistancesR
e, as illustrated in
Fig. 21.42a. The instantaneous powers apparently consumed by these resistors are transferred
to the rectiﬁer dc output port. The rectiﬁer output port can therefore be modeled by power
sources equal to the instantaneous powers ﬂowing into the eﬀective resistances Re.I ti si r r e l e -
vant whether the three power sources are connected in series or in parallel; in either event, they
can be combined into a single source equal to the total three-phase instantaneous input power
as illustrated in Fig. 21.42b.
If the three-phase ac input voltages are
van(t)= VM sin(ωt)
vbn(t)= VM sin(ωt−120◦) (21.153)
vcn(t)= VM sin(ωt−240◦)
then the instantaneous powers ﬂowing into the phase a, b, and c eﬀective resistances Re are
pa(t)= v2
an(t)
Re
= V2
M
2Re
(1−cos(2ωt))
pb(t)=
v2
bn(t)
Re
= V2
M
2Re
(1−cos(2ωt−240◦)) (21.154)
pc(t)= v2
cn(t)
Re
= V2
M
2Re
(1−cos (2ωt−120◦))

918 21 Pulse-Width Modulated Rectiﬁers
(a)
a
b
c
3
input
Re
Re
Re
ia
ib
ic
R
+
v
dc output
pa(t)
pb(t)
pc(t)
(b)
a
b
c
3
input
Re
Re
Re
ia
ib
ic
R
+
v
dc output
pa + pb + pc
ptot =
Fig. 21.42 Development of the ideal three-phase rectiﬁer model: ( a) three ideal single-phase rectiﬁers,
(b) combination of the three power sources into an equivalent single power source
Each instantaneous phase power contains a dc term V2
M/(2Re), and a second-harmonic term.
The total instantaneous three-phase power is
ptot(t)= pa(t)+ pb(t)+ pc(t)= 3
2
V2
M
Re
(21.155)
This is the instantaneous power which ﬂows out of the rectiﬁer dc output port. Note that the
second harmonic terms add to zero, such that the rectiﬁer instantaneous output power is constant.
This is a consequence of the fact that the instantaneous power ﬂow in any balanced three-phase
ac system is constant. So, unlike the single-phase case, the ideal three-phase rectiﬁer can supply
constant instantaneous power to a dc load, without the need for internal low-frequency energy
storage.
A variety of 3øac-dc PWM rectiﬁers are known; a few of the many references on this sub-
ject are listed in the references [ 8, 22, 280–294]. The most well-known topology is the three-
phase ac-dc boost rectiﬁer, illustrated in Fig. 21.43. This converter requires six SPST current-
bidirectional two-quadrant switches. The inductors and capacitor ﬁlter the high-frequency
switching harmonics, and have little inﬂuence on the low-frequency ac components of the wave-

21.7 Ideal Three-Phase Rectiﬁers 919
forms. The switches of each phase are controlled to obtain input resistor emulation, either with
a multiplying controller scheme similar to Fig. 21.5, or with some other approach. To obtain
undistorted line current waveforms, the dc output voltage V must be greater than or equal to
the peak line-to-line ac input voltage VL,pk. In a typical realization, V is somewhat greater than
VL,pk. This converter resembles the voltage-source inverter, discussed brieﬂy in Chap.4, except
that the converter is operated as a rectiﬁer, and the converter input currents are controlled via
high-frequency pulse-width modulation.
The three-phase boost rectiﬁer of Fig. 21.43 has several attributes that make it the leading
candidate for most 3øac-dc rectiﬁer applications. The ac input currents are nonpulsating, and
hence very little additional input EMI ﬁltering is required. As in the case of the single-phase
boost rectiﬁer, the rms transistor currents and also the conduction losses of the three-phase boost
rectiﬁer are low relative to other 3øac-dc topologies such as the current source inverter. The
converter is capable of bidirectional power ﬂow. A disadvantage is the requirement for six active
devices: when compared with a dc–dc converter of similar ratings, the active semiconductor
utilization (discussed in Chap. 6) is low. Also, since the rectiﬁer has a boost characteristic, it
is not suitable for direct replacement of traditional buck-type phase-controlled rectiﬁers. The
circuit of Fig. 21.43 coincides with the voltage-source inverter of Fig. 4.14; indeed, the current-
bidirectional switches allow bidirectional current ﬂow and also power ﬂow in either direction.
The literature contains a wide variety of schemes for controlling the switches of a six-switch
three-phase bridge network, which are applicable for control of the switches of Fig. 21.43.T h e
basic operation of the converter can be most easily understood by assuming that the switches are
controlled via simple sinusoidal pulse-width modulation. TransistorQ
1 is driven with duty cycle
d1(t), while transistor Q4 is driven by the complement of d1(t), or d′
1(t)= 1−d1(t). Transistors
Q2 and Q5 are driven with duty cyclesd2(t) and d′
2(t), respectively, and transistorsQ3 and Q6 are
driven with duty cyclesd3(t) and d′
3(t), respectively. The switch voltage waveforms of Fig.21.44
are obtained. The average switch voltages are
⟨v10(t)⟩Ts = d1(t)⟨v(t)⟩Ts
⟨v20(t)⟩Ts = d2(t)⟨v(t)⟩Ts (21.156)
⟨v30(t)⟩Ts = d3(t)⟨v(t)⟩Ts
L
C
+
v(t)
dc output
ia(t)
ib(t)
ic(t)
Q1
Q4
Q2 Q3
Q6
D1 D3D2
D4 D5 D6
a
b
c
3
input
Q5
L
L
Load
1
3
2
0
v10(t)
+
v20(t)
+
v12(t)
+
i1(t) i2(t) i3(t)
Fig. 21.43 Boost-type three-phase ac–dc PWM rectiﬁer

920 21 Pulse-Width Modulated Rectiﬁers
v10(t)
d1Ts0 tTs
v
0
v10(t) Ts
 = d1 v(t) Ts
v20(t)
d2Ts0 tTs
v
0
v20(t) Ts
 = d2 v(t) Ts
v30(t)
d3Ts0 tTs
v
0
v30(t) Ts
 = d3 v(t) Ts
Conducting
devices: Q1 / D1 Q4 / D4
Q2 / D2
Q6 / D6
Q5 / D5
Q3 / D3
Fig. 21.44 Switch waveforms, 3ϕac–dc boost rectiﬁer
The averaged line-to-line switch voltages are therefore
⟨v12(t)⟩Ts =⟨v10(t)⟩Ts −⟨v20(t)⟩TS = (d1(t)−d2(t))⟨v(t)⟩Ts
⟨v23(t)⟩Ts =⟨v20(t)⟩TS −⟨v30(t)⟩Ts = (d2(t)−d3(t))⟨v(t)⟩Ts (21.157)
⟨v31(t)⟩Ts =⟨v30(t)⟩Ts −⟨v10(t)⟩Ts = (d3(t)−d1(t))⟨v(t)⟩Ts
In a similar manner, the average switch currents can be shown to be
⟨i1(t)⟩TS = d1(t)⟨ia(t)⟩Ts
⟨i2(t)⟩TS = d2(t)⟨ib(t)⟩Ts (21.158)
⟨i3(t)⟩Ts = d3(t)⟨ic(t)⟩Ts
Equations (21.157) and (21.158) lead to the circuit-averaged model of Fig. 21.45.

21.7 Ideal Three-Phase Rectiﬁers 921
With sinusoidal PWM, the duty cycles are varied sinusoidally in synchronism with the ac
line, as follows:
d1(t)= D0+ 1
2 Dm sin(ωt−ϕ)
d2(t)= D0+ 1
2 Dm sin(ωt−ϕ−120◦) (21.159)
d3(t)= D0+ 1
2 Dm sin(ωt−ϕ−240◦)
where ω is the ac line frequency. Since each instantaneous duty cycle must lie in the interval
[0,1], the dc bias D0 is required. The factor Dm is called the modulation index;f o rD0= 0.5, Dm
must be less than or equal to one. Other choices of D0 further restrict Dm. In general, the
modulation index can be deﬁned as equal to the peak-to-peak amplitude of the fundamental
component of the duty cycle variation.
If the switching frequency is suﬃciently large, then ﬁlter inductors L can be small in value,
such that they have negligible eﬀect on the low-frequency ac waveforms. The averaged switch
voltage⟨v12(t)⟩Ts then becomes approximately equal to the ac line-line voltage vab(t):
⟨v12(t)⟩Ts = (d1(t)−d2(t))⟨v(t)⟩TS ≈vab(t) (21.160)
Substitution of Eqs. (21.153) and (21.159) leads to
1
2 Dm
[sin(ωt−ϕ)−sin(ωt−ϕ−120◦)]⟨v(t)⟩Ts = VM
[sin(ωt)−sin(ωt−120◦)] (21.161)
For small L, the angleϕmust tend to zero, and hence the sinusoidal terms in Eq. (21.161) cancel
out. In steady state, the dc output voltage is⟨v(t)⟩TS = V Eq. (21.161) then becomes
1
2 DmV= VM (21.162)
Solution for the dc output voltage V leads to
V= 2VM
Dm
(21.163)
Equation (21.163) can be written in terms of the peak line-to-line voltage VL,pk,a s
V= 2√
3
VL,pk
Dm
= 1.15VL,pk
Dm
(21.164)
With Dm ≤1, the dc output voltage V must be greater than or equal to 1.15 times the peak
line-to-line ac input voltage. Thus, the rectiﬁer has a boost characteristic.
L ia Ts
a
b
c
L
L
+
+
+(d1 2) v Ts
C
+
v Ts
Load
ib Ts
ic Ts
(d2 3) v Ts
(d3 1) v Ts
d1 ia Ts d3 ic Ts
d2 ib Ts
Fig. 21.45 Averaged model of the open-loop 3ϕac–dc boost rectiﬁer

922 21 Pulse-Width Modulated Rectiﬁers
d1(t) d2(t) d3(t)
0 60 120 180 240 300 360
-1
-0.5
0
0.5
1
t
v12(t) Ts
/V
Fig. 21.46 A modulation strategy that leads to a dc output voltage equal to the peak input line-line
voltage
The sinusoidal PWM approach of Eq. ( 21.159) is not the only way to vary the duty cycles
to obtain sinusoidal ac voltages and currents. For example, triplen harmonics can be added to
the duty-cycle expressions of Eq. (21.159). These triplen harmonics cancel out in Eq. (21.157),
such that the average inverter input voltages ⟨v
12(t)⟩Ts, ⟨v23(t)⟩Ts , and⟨v31(t)⟩Ts contain only
fundamental. Figure 21.46 illustrates duty cycle variations that lead to a dc output voltage V
equal to VL,pk.T h eeﬀective modulation index in this case is 1.15. The ac-side voltages and
currents are again undistorted. Further increases in the modulation index can be attained only
by introduction of distortion in the ac-side voltages and currents. Of course, in practice the duty-
cycle modulations are usually generated by the feedback loops that control the input current
waveforms to attain resistor emulation.
Three-phase ac-to-dc rectiﬁers having buck, buck–boost, or other characteristics are possi-
ble, but ﬁnd much less use than the boost topology. A 3øac-dc rectiﬁer system can also be con-
structed simply using three separate single-phase rectiﬁers [ 273]; however, each single-phase
rectiﬁer must then contain transformer isolation, leading to substantially increased switch stress
and loss. Other unconventional approaches to three-phase low-harmonic rectiﬁcation have also
been recently explored, such as the Vienna rectiﬁer [292, 294], single-switch approaches [285–
291], and other circuits [281–284, 293].
Yet another approach to solving the problem of three-phase rectiﬁer harmonics is the har-
monic correction scheme illustrated in Fig. 21.47. An active six-switch three-phase bridge re-
moves the harmonics generated by a nonlinear three-phase load such as an uncontrolled rectiﬁer.
The harmonic corrector is controlled such that its ac line currents contain harmonics that are
equal in magnitude but opposite in phase to the harmonics generated by the nonlinear load. No
average power ﬂows into the harmonic corrector. The total kV A rating of the harmonic corrector
semiconductor devices depends on the magnitudes of the harmonics produced by the nonlinear
load. If the THD generated by the load is not too large, then the harmonic corrector scheme
requires less total active silicon than the CCM boost-type rectiﬁer of Fig. 21.43. But if the un-
controlled rectiﬁer contains small ac line inductances, such that it operates in the discontinuous
conduction mode with large THD, then it is probably better to simply replace the uncontrolled
rectiﬁer with the CCM boost-type rectiﬁer of Fig. 21.43.

21.8 Summary of Key Points 923
a
b
c
3
ac
Harmonic corrector
Nonlinear load
Fig. 21.47 A harmonic corrector, based on the 3ϕac–dc boost converter of Fig.21.43
21.8 Summary of Key Points
1. The ideal rectiﬁer presents an eﬀective resistive load, the emulated resistance Re, to the ac
power system. The power apparently “consumed” by Re is transferred to the dc output port.
In a three-phase ideal rectiﬁer, input resistor emulation is obtained in each phase. In both the
single-phase and three-phase cases, the output port follows a power source characteristic,
dependent on the instantaneous ac input power. Ideal rectiﬁers can perform the function of
low-harmonic rectiﬁcation, without need for low-frequency reactive elements.
2. The dc–dc boost converter, as well as other converters capable of increasing the voltage
according to Eq. (21.12), can be adapted to the ideal rectiﬁer application. A control system
causes the input current to be proportional to the input voltage. The converter may operate
in CCM, DCM, or in both modes. The mode boundary can be expressed as a function of
R
e, 2L/Ts, and the instantaneous voltage ratiovg(t)/V. A well-designed average current con-
troller leads to resistor emulation regardless of the operating mode; however, other schemes
may lead to distorted current waveforms when the mode boundary is crossed.
3. In a single-phase system, the instantaneous ac input power is pulsating, while the dc load
power is constant. Whenever the instantaneous input and output powers are not equal, the
ideal rectiﬁer system must contain energy storage. A large capacitor is commonly em-
ployed; the voltage of this capacitor must be allowed to vary independently, as necessary to
store and release energy. A slow feedback loop regulates the dc component of the capacitor
voltage, to ensure that the average ac input power and dc load power are balanced.

924 21 Pulse-Width Modulated Rectiﬁers
4. RMS values of rectiﬁers waveforms can be computed by double integration. In the case of
the boost converter, the rms transistor current can be as low as 39% of the rms ac input
current, when the dc output voltage V is close in value to the peak ac input voltage VM.
Other converter topologies such as the buck–boost, SEPIC, and ´Cuk converters exhibit
signiﬁcantly higher rms transistor currents but are capable of limiting the converter inrush
current.
5. In the three-phase case, a boost-type rectiﬁer based on the PWM voltage-source inverter
also exhibits low rms transistor currents. This approach requires six active switching ele-
ments, and its dc output voltage must be greater than the peak input line-to-line voltage.
Average current control can be used to obtain input resistor emulation. An equivalent cir-
cuit can be derived by averaging the switch waveforms. The converter operation can be
understood by assuming that the switch duty cycles vary sinusoidally; expressions for the
average converter waveforms can then be derived.
6. Converter losses and e ﬃciency can be modeled using the steady-state equivalent circuit
models of Chap. 3, with a time-varying duty cycle. The output current is averaged over
one ac line period, to determine its dc component. The converter losses and eﬃciency can
then be computed. This approach is approximate, in that ( i) it assumes that the converter
dynamics are much faster than the ac line frequency and ( ii) it neglects operation in the
discontinuous conduction mode.
7. Average current control involves direct regulation of the low-frequency components of the
rectiﬁer input current to follow the input voltage. Feedforward can also be added, to cancel
the inﬂuence of ac line voltage variations on the dc output voltage.
8. Current-programmed control can also be adapted to attain input resistor emulation in rec-
tiﬁers. The programmed current reference signal i
c(t) is made proportional to the ac input
voltage. The diﬀerence between ic(t) and the average inductor current leads to distortion,
owing to the inductor current ripple and the need for a stabilizing artiﬁcial ramp. Several
approaches are known for reducing the resulting harmonic distortion of the line current
waveform.
9. Hysteretic control, particularly with 100% current ripple, has a simple controller implemen-
tation. The disadvantages are variable switching frequency, and increased peak currents.
10. Nonlinear carrier control also leads to a simple controller implementation, and has the ad-
vantage of CCM operation with small peak transistor current.
11. The outer low-bandwidth control system, which regulates the dc output voltage to balance
the rectiﬁer and load powers, can be modeled by averaging the rectiﬁer waveforms over
one-half of the ac line period T2L. This causes the dc-side system equations to become
time-invariant. A small-signal model is then obtained by perturbation and linearization.
12. The inner high-bandwidth control system, which regulates the ac input current waveform
to attain resistor emulation, is in general highly nonlinear. However, in the case of the boost
rectiﬁer, a valid small-signal model can be derived. This approach is unsuccessful in the
case of other converters; one must then resort to other approaches such as the quasi-static
approximation or simulation.

21.8 Summary of Key Points 925
Problems
21.1 The boost converter of Fig. 21.5 is replaced by a buck–boost converter. Inductor energy
storage has negligible inﬂuence on the low-frequency components of the converter wave-
forms. The average load power is P
load. The dc output voltage is V and the sinusoidal ac
input voltage has peak amplitude VM.
(a) Determine expressions for the duty cycle variationsd(t) and the inductor current vari-
ation i(t), assuming that the converter operates in the continuous conduction mode.
(b) Derive the conditions for operation in the continuous conduction mode. Manipu-
late your result to show that the converter operates in CCM when Re is less than
Re,crit(L, Ts, vg(t), V), and determine Re,crit.
(c) For what values of Re does the converter always operate in CCM? in DCM?
(d) The ac input voltage has rms amplitude in the range 108 V to 132 V . The maximum
load power is 100 W, and the minimum load power is 10 W. The dc output voltage
is 120 V . The switching frequency is 75 kHz. What value of L guarantees that the
converter always operates in CCM? in DCM?
21.2 Derive expressions for the input characteristics of the buck–boost converter, similar to
Eqs. (21.25)t o( 21.33). Sketch the converter input characteristics, and label the CCM-
DCM boundary.
21.3 Derive expressions for the rms transistor and diode currents of rectiﬁers based on the
single-phase CCM ´Cuk topology. Express your results in forms similar to those of Ta-
ble 21.3.
21.4 To obtain an isolated dc output, the boost converter in Fig. 21.5 is replaced by the full-
bridge transformer-isolated CCM boost converter of Fig. 6.36. Derive an expression for
the rms transistor current. Express your result as a function of I
ac rms, n, V, and VM.
21.5 Comparison of CCM boost and isolated SEPIC topologies as universal-input single-
phase rectiﬁers. You are given that the dc output voltage isV= 400 V, the load power is
P= 500 W, and the rms input voltage varies between 90 and 270 V , such that the peak
ac input voltage VM varies between VM min = 127V and VM max = 382V. Deﬁne the tran-
sistor stress S as the product of the worst-case peak transistor voltage and the worst-case
rms transistor current. It is desired to minimize S .
(a) Determine S for the boost converter in this application.
(b) Brieﬂy discuss your result of part (a): if universal input operation was not required,
and hence VM = 382 V always, what S would result?
In the isolated SEPIC, the transformer turns ration : 1 can be chosen to optimize the
design.
(c) Express S for the SEPIC as a function of n, V, P, VM min, and VM max.
(d) Choose n for the SEPIC such that S is minimized in this application. Compare with
the results of parts (a) and (b).
21.6 In the boost-type dc-3øac rectiﬁer of Fig. 21.43, the ac-side inductances L are not small:
they exhibit line frequency impedances that should not be ignored. The three-phase ac
voltages are given by Eq. (21.153), and the duty cycles are modulated as in Eq. (21.159).
The converter operates in the continuous conduction mode.
(a) Determine the magnitudes and phases of the line-to-neutral average voltages at the
ac inputs to the switch network. Express your result in terms of Dm, V, and ϕ.

926 21 Pulse-Width Modulated Rectiﬁers
(b) Determine the real power P and reactive power Q drawn from the 3øac source. Ex-
press your results as functions of VM, V, Dm, ϕ, and ωL.
(c) How mustϕbe chosen to obtain unity power factor?
21.7 In the boost-type dc-3øac rectiﬁer of Fig. 21.43, the switch duty ratios are modulated
as illustrated in Fig. 21.46. When the inductances L are suﬃciently small, a dc output
voltage V equal to the peak line-to-line ac input voltage can be obtained, with undistorted
ac line currents. As illustrated in Fig. 21.46, d1(t) is equal to 1 for 0◦≤ωt≤60◦, where
ωt= 0◦when⟨v12(t)⟩Ts = V.
(a) Derive expressions for d2(t) and d3(t), over the interval 0◦≤ωt≤60◦.
(b) State how d1(t), d2(t), and d3(t) should vary over each 60◦interval.
21.8 The buck-type 3øac-dc rectiﬁer of Fig.21.48 operates in the continuous conduction mode.
Transistors Q1 to Q6 operate with duty cycles d1(t)t o d6(t), respectively.
L
C
+
v(t)
dc output
ia(t)
ib(t)
ic(t)
Q1
Q4
Q2 Q3
Q6
D1 D3D2
D4 D5 D6
a
b
c
3
input
Q5
Input filter
iL(t)
Load
Fig. 21.48 Buck-type 3ϕac–dc rectiﬁer, Problem 21.8
(a) Determine the constraints on switch operation. Which transistors must not conduct
simultaneously? Which duty cycles must total unity?
(b) Average the 3ø bridge switch network, to determine expressions for the average ac-
side switch currents⟨ia(t)⟩TS,⟨ib(t)⟩TS , and⟨ic(t)⟩TS .
(c) Show that the average dc-side switch voltage can be expressed as
⟨vd(t)⟩Ts = (d1(t)−d4(t))⟨van(t)⟩Ts + (d2(t)−d5(t))⟨vbn(t)⟩TS + (d3(t)−d6(t))⟨vcn(t)⟩Ts
(d) The duty cycles are varied as follows:
d1(t)= 1
3+ 1
2 Dm sin(ωt−ϕ)
d2(t)= 1
3+ 1
2 Dm sin(ωt−ϕ−120◦)
d3(t)= 1
3+ 1
2 Dm sin(ωt−ϕ−240◦)
d4(t)= 1
3−1
2 Dm sin(ωt−ϕ)
d5(t)= 1
3−1
2 Dm sin(ωt−ϕ−120◦)
d6(t)= 1
3−1
2 Dm sin(ωt−ϕ−240◦)
```
