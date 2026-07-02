---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第18章part 2 - 18 Current-Programmed Control
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 747-766 > Chunk ID: `chapter-18-part-2`"
---

# 第18章part 2 - 18 Current-Programmed Control

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 747-766  
> Chunk ID: `chapter-18-part-2`

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
18.2 Oscillation for D> 0.5 745
(a) iL(t)
ic
t0 DTs Ts
Steady-state
waveform
Perturbed
waveform
dTs
(D + d)Ts
ic
(b) iL(t)
ic
t0 DTs Ts
Steady-state
waveform
Perturbed
waveform
dTs
(D + d)Ts
ic
Artificial
ˆ
ˆ
ˆ
ˆ
ˆ
ˆ
ramp
Fig. 18.22 When noise perturbs a controller signal such as ic, the duty cycle is perturbed: ( a) with no
artiﬁcial ramp and small inductor current ripple, the perturbation ˆd is large; (b) an artiﬁcial ramp reduces
the controller gain, thereby reducing the perturbation ˆd
Another common choice of ma is
ma= m2 (18.58)
This causes the characteristic value α to become zero for all D. As a result, ˆiL(Ts) is zero for
any ˆiL(0) that does not saturate the controller. The system removes any error after one switching
period Ts. This behavior is known as deadbeat control,o r ﬁnite settling time.
It should be noted that the above stability analysis employs a quasi-static approximation,
in which the slopes m1 and m2 of the perturbed inductor current waveforms are assumed to be
identical to the steady-state case. In the most general case, the stability and transient response
of a complete system employing current-programmed control must be assessed using a system-
wide discrete-time or sampled-data analysis. Nonetheless, in practice the above arguments are
found to be suﬃcient for selection of the artiﬁcial ramp slope m
a.
Current-programmed controller circuits exhibit signiﬁcant sensitivity to noise. The reason
for this is illustrated in Fig. 18.22a, in which the control signal ic(t) is perturbed by a small
amount of noise represented by ˆic. It can be seen that, when there is no artiﬁcial ramp and when
the inductor current ripple is small, then a small perturbation in ic leads to a large perturbation
in the duty cycle: the controller has high gain. When noise is present in the controller circuit,
then signiﬁcant jitter in the duty-cycle waveforms may be observed. A solution is to reduce
the gain of the controller by introduction of an artiﬁcial ramp. As illustrated in Fig. 18.22b, the

746 18 Current-Programmed Control
same perturbation in ic now leads to a reduced variation in the duty cycle. When the layout and
grounding of the controller circuit introduce signiﬁcant noise into the duty-cycle waveform, it
may be necessary to add an artiﬁcial ramp whose amplitude is substantially greater than the
inductor current ripple.
18.3 A More Accurate Model
The simple models discussed in the Sect. 18.1 yield much insight into the low-frequency behav-
ior of current-programmed converters. Unfortunately, they do not always describe everything
that we need to know. For example, the simple model of the buck converter predicts that the
line-to-output transfer function G
vg(s) is zero. While it is true that this transfer function is usu-
ally small in magnitude, the transfer function is not equal to zero. To predict the eﬀect of input
voltage disturbances on the output voltage, we need to compute the actual Gvg(s). Furthermore,
the simple model does not take into account the e ﬀects of inductor current ripple or artiﬁcial
ramp slope on the average value of the inductor current.
In this section, a more accurate analysis is performed, which does not rely on the approxi-
mation⟨iL(t)⟩Ts ≈ic(t). The analytical approach of [ 167, 168] is combined with the controller
model of [169]. A functional block diagram of the current programmed controller is constructed,
which accounts for the presence of the artiﬁcial ramp and for the inductor current ripple. This
block diagram is appended to the averaged converter models derived in Chap. 7, leading to a
complete converter CPM model. Models for the CPM buck, boost, and buck–boost converters
are listed, and the buck converter model is analyzed in detail.
18.3.1 Current Programmed Controller Model
Rather than using the approximation⟨i
L(t)⟩TS =⟨ic(t)⟩Ts , let us derive a more accurate expres-
sion relating the average inductor current⟨iL(t)⟩Ts to the control input ic(t). Application of the
moving average (7.3)t o iL(t),
⟨iL(t)⟩Ts = 1
Ts
∫ t+Ts/2
t−Ts/2
iL(τ)dτ (18.59)
is illustrated in Fig. 18.23 under transient conditions, in which iL(0) is not equal to iL(Ts). It
can be seen that the peak value ipk of iL(t)d iﬀers from ic(t), by the magnitude of the artiﬁcial
ramp waveform at time t = dTs, that is, by madTs. Furthermore, the peak and the average
values of the inductor current waveform diﬀer because of the inductor current ripple. As a result,
a relationship between the average inductor current ⟨iL(t)⟩Ts and the control input ic(t)m u s t
involve the slope ma of the artiﬁcial ramp, the time interval dTs, as well as the inductor current
slopes m1 and m2.Ad iﬃculty arises because this relationship depends on time t in (18.59), i.e.,
on the position of the averaging window of lengthTs. This is in contrast to the averaging applied
in Chap. 7 to continuous conduction mode waveforms with duty cycle d being an independent
control input, where we found that the same results are obtained regardless of the position of
the averaging window within a switching period. In current-programmed control, however, duty
cycle d is not an independent control input, but is instead determined by the value of the control
input i
c(t)a t dTs. Just as in the pulse-width modulator discussed in Sect. 7.3, sampling of the
control input occurs at the modulated edge of the switch control signal, atdTs. Indeed, as shown

18.3 A More Accurate Model 747
Fig. 18.23 Accurate determination of the relationship between the average inductor current ⟨iL(t)⟩Ts
and ic
in Fig. 18.23,i ti st h ev a l u eo fic(dTs) that determines the duty cycle d in the switching period
shown. Hence, the proper relationship between ⟨iL(t)⟩Ts and ic(t) is determined by ﬁnding the
average inductor current in (18.59) at the modulator sampling time t= dTs,
⟨iL⟩Ts =⟨iL(dTs)⟩Ts = 1
Ts
∫ (d+0.5)Ts
(d−0.5)Ts
iL(τ)dτ (18.60)
The averaging window in Eq. (18.60) is shown in Fig.18.23 for the case d< 0.5. Averaging can
be performed by splitting the averaging window into three subintervals: from ( d−0.5)Ts to 0,
from 0 to dTs, and from dTs to (d+ 0.5)Ts. Integration can be simpliﬁed by adding the areas
of the three trapezoids having mid-point heights equal to i3, i1, i2, respectively, and subtracting
the area of the trapezoid having the mid-point height of i4 and with the base extending from
(d+ 0.5)Ts to Ts,
iL(dTs)⟩Ts = (0.5−d)i3+ di1+ d′i2−(0.5−d)i4 (18.61)
iL(dTs)⟩Ts = di1+ d′i2−(0.5−d)(i4−i3) (18.62)
Equation (18.62) can be simpliﬁed by noting that the time interval between the midpointsi4 and
i3 is Ts, while the time interval between the midpointsi1 and i2 is Ts/2. Since the slope between
the midpoint values is the same, i4−i3= 2(i2−i1). As a result, Eq. (18.62) becomes
⟨iL⟩Ts = di1+ d′i2−2(0.5−d)(i2−i1)
= d′i1+ di2 (18.63)
The literature includes a number of di ﬀerent approaches to CPM modeling, most notably
[165, 169, 171, 172]; an important diﬀerence between these is in how they average the in-
ductor current [ 175]. The above relationship, originally derived in [ 107], diﬀers from various
alternative expressions reported in literature. If, for example, the averaging window is centered
at t= Ts/2, extending between 0 and Ts,ad iﬀerent relationship⟨iL⟩Ts = di1+ d′i2 is obtained
[169]. In equilibrium, i1= i2, and this alternative expression becomes equivalent to Eq. (18.63).
Similarly, predictions of low-frequency dynamics are essentially the same. However, small but

748 18 Current-Programmed Control
conceptually important diﬀerences are found in predictions of high-frequency dynamics. As dis-
cussed further in Sect. 18.7,E q .(18.63), which is based on correctly positioning the averaging
window, leads to a small-signal averaged ac model validated by exact sampled-data analysis.
The above result is consistent with the averaging deﬁnition of Eq. (7.3).
From Fig. 18.23, it follows that the midpoint currents in Eq. (18.63) can be found as
i1= ipk−m1
2 dTs (18.64)
i2= ipk−m2
2 d′Ts (18.65)
where
ipk= ic−madTs (18.66)
Substitution of Eqs. (18.64), (18.65), and (18.66) into Eq. (18.63) yields the desired large-signal
relationship between⟨iL⟩Ts and ic:
⟨iL⟩Ts = ic−madTs−m1+ m2
2 dd′Ts (18.67)
This equation exposes how the inductor current ripple and the artiﬁcial ramp can cause the
average inductor current⟨iL⟩Ts to diﬀer from the control input ic.
18.3.2 Small-Signal Averaged Model
A small-signal current-programmed controller model is found by perturbation and linearization
of Eq. (18.67). Let
⟨iL⟩Ts = IL+ ˆiL(t)
⟨ic⟩Ts = ic== Ic+ ˆic(t)
d(t)= D+ ˆd(t) (18.68)
m1 = M1+ ˆm1(t)
m2 = M2+ ˆm2(t)
Note that it is necessary to perturb the slopesm1 and m2, since the inductor current slope depends
on the converter voltages according to Eq. ( 18.30). For the basic buck, boost, and buck–boost
converters, the slope variations are given by
Buck converter
ˆm1= ˆvg−ˆv
L ˆm2= ˆv
L
Boost converter
ˆm1= ˆvg
L ˆm2= ˆv−ˆvg
L (18.69)
Buck–boost converter
ˆm1= ˆvg
L ˆm2=−ˆv
L

18.3 A More Accurate Model 749
It is assumed that ma does not vary: ma = Ma. The usual steps of ac perturbation and lin-
earization, including substitution of Eq. (18.68) into Eq. (18.67), cancellation of dc terms, and
retention of the ﬁrst-order ac terms, leads to:
ˆiL(t)= ˆic(t)−
⎦
Ma+ M1+ M2
2 (1−2D)
)
Ts ˆd(t)−DD′Ts
2 (ˆm1(t)+ ˆm2(t)) (18.70)
With use of the equilibrium relationship DM1= D′ M2,E q .(18.70) can be further simpliﬁed:
ˆiL(t)= ˆic(t)−
⎦
Ma+ M1−M2
2
)
Ts ˆd(t)−DD′Ts
2 ˆm1(t)−DD′Ts
2 ˆm2(t) (18.71)
Finally, solution for ˆd(t) yields
ˆd(t)= 1⎦
Ma+ M1−M2
2
)
Ts
[
ˆic(t)−ˆiL(t)−DD′Ts
2 ˆm1(t)−DD′Ts
2 ˆm2(t)
]
(18.72)
This is the small-signal relationship that the current-programmed controller follows, to deter-
mine ˆd(t)a saf u n c t i o no fˆic(t), ˆiL(t), ˆm1(t), and ˆm2(t). Since the quantities ˆm1(t) and ˆm2(t) de-
pend on ˆvg(t) and ˆv(t), according to Eq. ( 18.69), we can express Eq. ( 18.72) in the following
form:
ˆd(t)= Fm
[ˆic(t)−ˆiL(t)−Fg ˆvg(t)−Fv ˆv(t)
]
(18.73)
where
Fm= 1⎦
Ma+ M1−M2
2
)
Ts
(18.74)
Expressions for the gains Fg and Fv, for the basic buck, boost, and buck–boost converters, are
listed in Table 18.2. A functional block diagram of the current-programmed controller small-
signal model, corresponding to Eq. (18.73), is constructed in Fig. 18.24.
Current-programmed converter models can now be obtained, by combining the controller
block diagram of Fig. 18.24 with the averaged converter models derived in Chap. 7.F i g -
ures 18.25, 18.26, and 18.27 illustrate the CPM converter models obtained by combination of
Fig. 18.24 with, respectively, the buck, boost, and buck–boost models of Fig. 7.18. The current
programmed controller contains eﬀective feedback of the inductor current ˆiL(t) and the output
voltage ˆv(t), as well as eﬀective feedforward of the input voltage ˆvg(t).
Table 18.2 Current-programmed controller gains for basic converters
Converter Fg Fv
Buck DD′Ts
2L 0
Boost 0 DD′Ts
2L
Buck–boost DD′Ts
2L −DD′Ts
2L

750 18 Current-Programmed Control
Fig. 18.24 Functional block diagram of the current-programmed controller
+ +
Fm
Fg
+
+
L
RC
1 : D
vˆ
ˆ
ˆ
ˆ
ˆ
ˆ
ˆ
ˆ
ˆ
g(t)
vg
d
iL
ic
+
v(t)Id (t)
Vg d(t)
iL(t)
Fig. 18.25 More accurate model of a current-programmed buck converter

18.3 A More Accurate Model 751
Fig. 18.26 More accurate model of a current-programmed boost converter
Fig. 18.27 More accurate model of a current-programmed buck–boost converter

752 18 Current-Programmed Control
18.4 Current-Programmed Transfer Functions
Next, let us solve the models of Sect. 18.3, to determine more accurate expressions for the
control-to-output and line-to-output transfer functions of current-programmed buck, boost, and
buck–boost converters. As discussed in Chap.8, the converter output voltage ˆv can be expressed
as a function of the duty-cycle ˆd and input voltage ˆvg variations, using the transfer functions
Gvd(s) and Gvg(s):
ˆv(s)= Gvd(s) ˆd(s)+ Gvg(s)ˆvg(s) (18.75)
In a similar manner, the inductor current variation ˆi can be expressed as a function of the duty-
cycle ˆd and input voltage ˆvg variations, by deﬁning the transfer functions Gid(s) and Gig(s):
ˆiL(s)= Gid(s) ˆd(s)+ Gig(s)ˆvg(s) (18.76)
where the transfer functions Gid(s) and Gig(s)a r eg i v e nb y
Gid(s)=
ˆiL(s)
ˆd(s)
⏐⏐⏐⏐
⏐
⏐
ˆvg(s)=0
Gig(s)=
ˆiL(s)
ˆvg(s)
⏐⏐⏐
⏐⏐⏐
ˆd(s)=0
(18.77)
Figure 18.28 illustrates replacement of the converter circuit models of Figs. 18.25, 18.26,
and 18.27 with block diagrams that correspond to Eqs. ( 18.75) and ( 18.76). Furthermore, an
injection source ˆvz is inserted between the output of the CPM controller and the duty-cycle
input to allow ﬁnding the system transfer functions using the Feedback Theorem of Chap. 13.
The control-to-output Gvc(s) and line-to-output Gvg−cpm (s) transfer functions can now be
found, by application of the Feedback Theorem to the block diagram of Fig. 18.28. The closed-
loop control-to-output transfer function is given by
Gvc(s)= ˆv
ˆic
⏐⏐⏐⏐
⏐⏐
ˆvz=0
ˆvg=0
= G∞vc
Ti
1+ Ti
+ G0vc
1
1+ Ti
(18.78)
Fig. 18.28 Block diagram that models the current-programmed converters of Figs. 18.25, 18.26,
and 18.27

18.4 Current-Programmed Transfer Functions 753
where
Ti(s)= ˆvy
ˆvx
⏐⏐
⏐⏐⏐
⏐
ˆic=0
ˆvg=0
= Fm (Gid+ FvGvd) (18.79)
is the loop gain transfer function. Note that the feedback loop comprises two paths, one through
Gid and another through Gvd and Fv blocks, both paths including the CPM modulator gain Fm.
The feedback loop through Gid can conceptually be considered the main feedback loop in a
current-programmed controller, while the feedback loop through Gvd and Fv reﬂects the eﬀects
of the output voltage on the current ripple, and hence on the average inductor current. In a CPM
buck converter, Fv= 0, which means that only the main feedback loop exists.
The closed-loop control-to-output ideal forward gain G∞vc is found with ˆvg= 0 and with ˆvy
nulled:
G∞vc(s)= ˆv
ˆic
⏐⏐⏐⏐
⏐
⏐
ˆvg=0
ˆvy→
null
0
(18.80)
Nulling ˆvy implies
ˆic−ˆiL−Fv ˆv→
null
0 (18.81)
Given that Gvd ˆvx= ˆv and Gid ˆvx= ˆiL,w eh a v e
ˆiL= Gid
Gvd
ˆv (18.82)
Substituting Eq. (18.82) into Eq. (18.81), we have
ˆic−Gid
Gvd
ˆv−Fv ˆv→
null
0 (18.83)
which yields an expression for the ideal forward gain
G∞vc(s)= ˆv
ˆic
⏐⏐⏐⏐
⏐
⏐
ˆvg=0
ˆvy→
null
0
= Gvd
Gid+ FvGvd
= FmGvd
Ti
(18.84)
Finally, the direct forward transmission through the feedback path is found with ˆvg= 0 and with
ˆvx nulled. By inspection,
G0vc= 0 (18.85)
Substituting Eqs. (18.79), (18.84), and (18.85) into Eq. (18.78) leads to the desired result:
Gvc(s)= FmGvd
1+ Ti
= FmGvd
1+ Fm(Gid+ FvGvd) (18.86)
Similarly, line-to-output transfer function can be found by application of the Feedback Theorem
to the block diagram in Fig. 18.28 with ˆic= 0,
Gvg−cpm (s)= ˆv
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆvz=0
ˆic=0
= G∞vg−cpm
Ti
1+ Ti
+ G0vg−cpm
1
1+ Ti
(18.87)

754 18 Current-Programmed Control
where
G∞vg−cpm (s)= ˆv
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆic=0
ˆvy→
null
0
=−FmFgGvd+ Fm(GvgGid−GigGvd)
Ti
(18.88)
G0vg−cpm (s)= ˆv
ˆvg
⏐⏐⏐
⏐⏐⏐
ˆic=0
ˆvx→
null
0
= Gvg (18.89)
The current-programmed line-to-output transfer function is obtained by substitution of
Eqs. (18.79), (18.88) and (18.89) into Eq. (18.87):
Gvg−cpm (s)= ˆv(s)
ˆvg(s)
⏐⏐
⏐⏐⏐
⏐
ˆic(s)=0
= Gvg−FmFgGvd+ Fm(GvgGid−GigGvd)
1+ Fm(Gid+ FvGvd) (18.90)
Equations (18.86) and ( 18.90) are general expressions for the important transfer functions of
single-inductor current-programmed converters operating in the continuous conduction mode.
18.4.1 Discussion
The controller model of Eq. (18.73) and Fig. 18.24 accounts for the diﬀerences between iL and
ic that arise by two mechanisms: the inductor current ripple and the artiﬁcial ramp. The inductor
current ripple causes the peak and average values of the inductor current to diﬀer; this leads to a
deviation between the average inductor current and ic. Since the magnitude of the inductor cur-
rent ripple is a function of the converter input and capacitor voltages, this mechanism introduces
ˆvg and ˆv dependencies into the controller small-signal block diagram. Thus, the Fg and Fv gain
blocks of Fig. 18.24 model the small-signal eﬀects of the inductor current ripple. For operation
deep in continuous conduction mode (2 L/RTs ≫ 1), the inductor current ripple is small. The
Fg and Fv gain blocks can then be ignored, and the inductor current ripple has negligible eﬀect
on the current-programmed controller gain.
The artiﬁcial ramp also causes the average inductor current to diﬀer from ic. This is modeled
by the gain block Fm. With no artiﬁcial ramp, Ma = 0, Eq. (18.74) implies that the modulator
gain Fm tends to inﬁnity if M1 = M2, which corresponds to operation at D= 0.5. If M2 > M1
(D> 0.5), Fm becomes negative, which implies positive feedback in the current control loop.
The nature of instability and oscillations for D> 0.5, as well as the need for the artiﬁcial ramp,
have been addressed in Sect. 18.2 using discrete-time techniques. According to Eqs. ( 18.56)
and (18.57) an artiﬁcial ramp withMa≥M2/2 results in a stable current-programmed controller
for any D,0 ≤D< 1. One may verify that this artiﬁcial ramp slope Ma ≥M2/2 also results in
a ﬁnite, positive value for the modulator gain Fm for any D.
Consider operation at D< 0.5 with no artiﬁcial ramp, Ma = 0. The current-programmed
modulator gain Fm is very large if M1 and M2 are very small, i.e., if the inductor current ripple
can be neglected. The current-programmed control systems of Figs. 18.25, 18.26, and 18.27
then eﬀectively have very large loop gain Ti, so that the signal at the input to the Fm block
( ˆd/Fm) tends to zero. The block diagram then predicts that
ˆd
Fm
= 0= ˆic−ˆiL−Fg ˆvg−Fv ˆv (18.91)

18.4 Current-Programmed Transfer Functions 755
In the case of negligible inductor current ripple ( Fg →0 and Fv →0), this equation further
reduces to
0= ˆic−ˆiL (18.92)
which coincides with the simple approximation employed in Sect. 18.1. Hence, the transfer
functions predicted in this section reduce to the results of Sect.18.1 in case of no artiﬁcial ramp
and negligible inductor current ripple. In the limit when Fm →∞, Fg →0, and Fv →0, the
control-to-output transfer function (18.86) reduces to
lim
Fm→∞
Fg→0
Fv→0
Gvc(s)= Gvd
Gid
(18.93)
and the line-to-output transfer function (18.90) reduces to
lim
Fm→∞
Fg→0
Fv→0
Gvg−cpm (s)= GvgGid−GigGvd
Gid
(18.94)
It can be veriﬁed that Eqs. ( 18.93) and (18.94) are equivalent to the transfer functions derived
in Sect. 18.1.
When an artiﬁcial ramp is present, then the CPM modulator gainFm is reduced. The current-
programmed controller no longer perfectly regulates the inductor current iL, and the terms on
the right-hand side of Eq. (18.91) do not add to zero. In the extreme case of a very large artiﬁcial
ramp (large Ma and hence small Fm), the current-programmed controller degenerates to duty-
cycle control. The artiﬁcial ramp and analog comparator of Fig. 18.19 then function as a pulse-
width modulator similar to Fig. 7.29, with small-signal gain Fm. For small Fm, the control-to-
output transfer function (18.86) reduces to
lim
small Fm
Gvc(s)= FmGvd(s) (18.95)
which coincides with conventional duty-cycle control. Likewise, Eq. (18.90) reduces to
lim
small Fm
Gvg−cpm (s)= Gvg (18.96)
which is the line-to-output transfer function for conventional duty cycle control.
18.4.2 Current-Programmed Transfer Functions of the CCM Buck Converter
The control-to-output transfer function Gvd(s) and line-to-output transfer function Gvg(s)o f
the CCM buck converter with duty-cycle control are tabulated in Chap. 8, by analysis of the
equivalent circuit model in Fig.7.18a. The results are
Gvd(s)= V
D
1
den(s) (18.97)
Gvg(s)= D 1
den(s) (18.98)

756 18 Current-Programmed Control
where the denominator polynomial is
den(s)= 1+ s L
R+ s2LC (18.99)
The inductor current transfer functionsGid(s) and Gig(s) deﬁned by Eqs. (18.76) and (18.77)a r e
also found by solution of the equivalent circuit model in Fig.7.18a, with the following results:
Gid(s)= V
DR
(1+ sRC)
den(s) (18.100)
Gig(s)= D
R
(1+ sRC)
den(s) (18.101)
where den(s) is again given by Eq. (18.99).
With no artiﬁcial ramp and negligible ripple, the control-to-output transfer function reduces
to the ideal expression (18.93). Substitution of Eqs. (18.97) and (18.100) yields
lim
Fm→∞
Fg→0
Fv→0
Gvc(s)= Gvd(s)
Gid(s)= R
1+ sRC (18.102)
Under the same conditions, the line-to-output transfer function reduces to the ideal expres-
sion (18.94). Substitution of Eqs. (18.97)t o( 18.101) leads to
lim
Fm→∞
Fg→0
Fv→0
Gvg−cpm (s)= Gvg(s)Gid(s)−Gvd(s)Gig(s)
Gid(s) = 0 (18.103)
Equations (18.102) and ( 18.103) coincide with the expressions derived in Sect. 18.1 for the
CCM buck converter.
For arbitrary Fm, Fv, and Fg, the control-to-output transfer function is given by Eq. (18.86).
According to Table18.2, Fv= 0 for the buck converter. Substitution of Eqs. (18.97)t o( 18.101)
into Eq. (18.86) yields
Gvc(s)= FmGvd
1+ FmGid
=
Fm
⎦V
D
1
den(s)
)
1+ Fm
⎦V
DR
1+ sRC
den(s)
) (18.104)
Simpliﬁcation leads to
Gvc(s)=
Fm
V
D
den(s)+ FmV
DR (1+ sRC)
(18.105)
Finally, the control-to-output transfer function can be written in the following normalized form:
Gvc(s)= Gc0
1+ s
Qcωc
+
⎦s
ωc
)2 (18.106)

18.4 Current-Programmed Transfer Functions 757
where
Gc0= V
D
Fm
1+ FmV
DR
(18.107)
ωc= 1√
LC
√
1+ FmV
DR (18.108)
Qc= R
√
C
L
√
1+ FmV
DR
1+ RCFmV
DL
(18.109)
In the above equations, the salient features Gc0, ωc, and Qc are expressed as the duty ratio-
control value, multiplied by a factor that accounts for the eﬀects of current-programmed control.
It can be seen from Eq. (18.109) that current programming tends to reduce theQ-factor of the
poles. For large Fm, Qc varies as F−1/2
m ; consequently, the poles become real and well-separated
in magnitude. The low-Q approximation of Sect. 8.1.7 then predicts that the low-frequency pole
ωp1 becomes
ωp1= Qcωc= R
L
1+ FmV
DR
1+ RCFmV
DL
(18.110)
For large Fm, the pole frequency can be further approximated as
fp1≈1
2π
1
RC (18.111)
which coincides with the low-frequency pole predicted by the simple model of Sect. 18.1.T h e
low-Q approximation also predicts that the high-frequency poleωhf becomes
ωhf ≈ωc
Qc
= 1
RC
⎦
1+ RCFmV
DL
)
(18.112)
For large Fm, the pole frequency fhf can be further approximated as
fhf ≈1
2π
FmV
DL (18.113)
Using Fm from Eq. (18.74), V/L= M2, and M1D= M2D′, fhf can be expressed as
fhf = fs
π
M1+ M2
2Ma+ M1−M2
= fs
π
1
1+ 2D
⎦Ma
M2
−1
) (18.114)
It follows that the high-frequency pole is typically predicted to lie near to or even greater than
the switching frequency fs, well above the range of frequencies where the averaged model based
on the continuous-time averaged analysis employed here can be considered valid. It should be
pointed out that the converter switching and modulator sampling processes lead to discrete-
time phenomena that aﬀect the high-frequency behavior of the converter, as discussed further
in Sect. 18.7.

758 18 Current-Programmed Control
For arbitrary Fm, Fv, and Fg, the current-programmed line-to-output transfer function
Gvg−cpm (s) is given by Eq. ( 18.90). In the case of the buck converter, the quantity ( GvgGid −
GvdGig) is equal to zero. Furthermore, Fv= 0. Hence, Eq. (18.90) becomes
Gvg−cpm (s)= Gvg−FmFgGvd
1+ FmGid
(18.115)
Substitution of Eqs. (18.97)t o( 18.101) into Eq. (18.115) yields
Gvg−cpm (s)=
D
den(s)−FmFg
V
D
1
den(s)
1+ Fm
⎦V
DR
1+ sRC
den(s)
) (18.116)
Simpliﬁcation leads to
Gvg−cpm (s)=
⎦
D−FmFg
V
D
)
den(s)+ FmV
DR (1+ sRC)
(18.117)
Finally, the current-programmed line-to-output transfer function can be written in the following
normalized form:
Gvg−cpm (s)= Gg0
1+ s
Qcωc
+
⎦s
ωc
)2 (18.118)
where
Gg0= D
1−FmFgV
D2
1+ FmV
DR
= D
2Ma−M2
2Ma+ M1−M2
1+ FmV
DR
(18.119)
The quantities Qc andωc are given by Eqs. (18.108) and (18.109).
Equation (18.119) shows how current programming reduces the dc gain of the buck con-
verter line-to-output transfer function. For duty-cycle control ( Fm →0), Gg0 is equal to D.
Nonzero values of Fm reduce the numerator and increase the denominator of Eq. ( 18.119),
which tends to reduce Gg0. In the ideal case ( Fm →∞), we have already seen that Gg0 be-
comes zero. Equation (18.119) reveals that nonideal current-programmed buck converters can
also exhibit zero Gg0, if the artiﬁcial ramp slope Ma is chosen equal to M2/2. The current-
programmed controller then prevents input line voltage variations from reaching the output. The
mechanism that leads to this result is the e ﬀective feedforward of v
g, inherent in the current-
programmed controller via the Fg ˆvg term in Eq. ( 18.73). It can be seen from Fig. 18.28 that,
when FgFmGvd(s)= Gvg(s), then the feedforward path from ˆvg through Fg induces variations
in the output ˆv that exactly cancel the ˆvg-induced variations in the direct forward path of the
converter through Gvg(s). This cancellation occurs in the buck converter when Ma= 0.5M2.
18.4.3 Results for Basic Converters
The transfer functions of the basic buck, boost, and buck–boost converters with current-
programmed control are summarized in Tables 18.3, 18.4, 18.5. Control-to-output and line-to-
output transfer functions for both the simple model of Sect. 18.1 and the more accurate model

18.4 Current-Programmed Transfer Functions 759
Table 18.3 Summary of results for the CPM buck converter
Simple model Duty-cycle controlled transfer functions
ˆv
ˆic
= R
1+ sRC Gvd(s)= V
D
1
den(s) Gid(s)= V
DR
1+ sRC
den(s)
ˆv
ˆvg
= 0 Gvg(s)= D 1
den(s) Gig(s)= D
R
1+ sRC
den(s)
den(s)= 1+ s L
R+ s2LC
More accurate model
ˆv
ˆic
= Gvc(s)= Gc0
1
1+ s
Qcωc
+
⎦s
ωc
)2 Gc0= V
D
Fm
⎦
1+ FmV
DR
)
ωc = 1√
LC
√
1+ FmV
DR Qc = R
√
C
L
√
1+ FmV
DR⎦
1+ RCFmV
DL
)
ˆv
ˆvg
= Gvg−cpm (s)= Gg0
1
1+ s
Qcωc
+
⎦s
ωc
)2 Gg0 = D
⎦
1−FmFgV
D2
)
⎦
1+ FmV
DR
)
Table 18.4 Summary of results for the CPM boost converter
Simple model Duty-cycle controlled transfer functions
ˆv
ˆic
= D′R
2
⎦
1−s L
D′2R
)
⎦
1+ s RC
2
) Gvd(s)= V
D′
⎦
1−s L
D′2R
)
den(s) Gid(s)= 2V
D′2R
⎦
1+ s RC
2
)
den(s)
ˆv
ˆvg
= 1
2D′
1⎦
1+ s RC
2
) Gvg(s)= 1
D′
1
den(s) Gig(s)= 1
D′2R
(1+ sRC)
den(s)
den(s)= 1+ s L
D′2R+ s2 LC
D′2
More accurate model
ˆv
ˆic
= Gvc(s)= Gc0
⎦
1−s L
D′2R
)
1+ s
Qcωc
+
⎦s
ωc
)2 Gc0= V
D′
Fm⎦
1+ 2FmV
D′2R + FmFvV
D′
)
ωc = D′
√
LC
√
1+ 2FmV
D′2R + FmFvV
D′ Qc = D′R
√
C
L
√
1+ 2FmV
D′2R + FmFvV
D′
⎦
1+ RC FmV
L −FmFvV
D′
)
ˆv
ˆvg
= Gvg−cpm (s)= Gg0
1
1+ s
Qcωc
+
⎦s
ωc
)2 Gg0 = 1
D′
⎦
1+ FmV
D′2R
)
⎦
1+ 2FmV
D′2R + FmFvV
D′
)

760 18 Current-Programmed Control
Table 18.5 Summary of results for the CPM buck–boost converter
Simple model Duty-cycle controlled transfer functions
ˆv
ˆic
=−D′R
(1+ D)
⎦
1−s DL
D′2R
)
⎦
1+ s RC
1+ D
) Gvd(s)=−|V|
DD′
⎦
1−s DL
D′2R
)
den(s) Gid(s)=|V|(1+ D)
DD′2R
⎦
1+ s RC
(1+ D)
)
den(s)
ˆv
ˆvg
=−D2
1−D2
1⎦
1+ s RC
1+ D
) Gvg(s)=−D
D′
1
den(s) Gig(s)= D
D′2R
(1+ sRC)
den(s)
den(s)= 1+ s L
D′2R+ s2 LC
D′2
More accurate model
ˆv
ˆic
= Gvc(s)= Gc0
⎦
1−s DL
D′2R
)
1+ s
Qcωc
+
⎦s
ωc
)2 Gc0=−|V|
DD′
Fm⎦
1+ Fm|V|(1+ D)
DD′2R −FmFv|V|
DD′
)
ωc = D′
√
LC
√
1+ Fm|V|(1+ D)
DD′2R −FmFv|V|
DD′ Qc = D′R
√
C
L
√
1+ Fm|V|(1+ D)
DD′2R −FmFv|V|
DD′
⎦
1+ Fm|V|RC
DL + FmFv|V|
D′
)
ˆv
ˆvg
= Gvg−cpm (s)= Gg0
⎦
1+ s
ωgz
)
1+ s
Qcωc
+
⎦s
ωc
)2 Gg0 =−D
D′
⎦
1+ Fm|V|
D′2R −FmFg|V|
D2
)
⎦
1+ Fm|V|(1+ D)
DD′2R −FmFv|V|
DD′
)
ωgz = DD′2R
|V|LFmFg
⎦
1+ Fm|V|
D′2R −FmFg|V|
D2
)
derived in this section are listed. For completeness, the transfer functions for duty-cycle control
are included. In each case, the salient features are expressed as the corresponding quantity with
duty-cycle control, multiplied by a factor that accounts for current-programmed control.
The two poles of the line-to-output transfer functionsGvg−cpm and control-to-output transfer
functions Gvc of all three converters typically exhibit lowQ-factors in CPM. The low-Q approx-
imation can be applied, as in Eqs. ( 18.110)t o( 18.113), to ﬁnd the low-frequency pole. The
line-to-output transfer functions of the boost and buck–boost converters exhibit two poles and
one zero, with substantial dc gain.
18.4.4 Addition of an Input Filter to a Current-Programmed Converter
Addition of an input ﬁlter to a duty-cycle controlled converter is discussed in Chap. 17, where
it is found that eﬀects of input ﬁlter on converter transfer functions can be evaluated using the
Extra Element Theorem of Chap. 16. In particular, Eq. (17.4) shows how the control-to-output
transfer function G
vd is modiﬁed by a correction factor, which depends on the impedance ratios
Zo/ZN and Zo/ZD, where Zo(s) is the ﬁlter output impedance, ZD(s) is the converter driving-
point input impedance, and ZN (s) is the converter input impedance determined under the con-
dition that the output voltage is nulled. The input ﬁlter design approach of Chap. 17 is based

18.4 Current-Programmed Transfer Functions 761
on meeting the impedance inequalities of Sect. 17.2.3 so that the input ﬁlter does not substan-
tially alter the control-to-output transfer function. The same approach can be applied to current-
programmed converters.
In the presence of an input ﬁlter, the CPM control-to-output transfer function is given by
Gvc(s)= ˆv
ˆic
=
⎛⎜⎜⎜⎜⎜⎝Gvc(s)
⏐⏐⏐
⏐
⏐⏐
Zo(s)=0
⎞⎟⎟⎟⎟⎟⎠
⎦
1+ Zo(s)
ZN−cpm (s)
)
⎦
1+ Zo(s)
ZD−cpm (s)
) (18.120)
where
Gvc(s)
⏐⏐⏐⏐
⏐⏐
Zo(s)=0
(18.121)
is the CPM control-to-output transfer function without the input ﬁlter, whileZN−cpm and ZD−cpm
are input impedances of the current-programmed converter found under two diﬀerent conditions
prescribed by the Extra Element Theorem. The CPM input impedances Zi−cpm can be found
using the converter models shown in Figs.18.25, 18.26, and 18.27. As an example, small-signal
model of a current-programmed buck converter of Fig.18.25 is shown in Fig.18.29. The model
includes three independent sources: control inputˆic, input voltage ˆvg, and an additional injection
source ˆiz, which will facilitate determining ZD−cpm (s) using the Feedback Theorem of Chap. 13.
ˆvg
ˆig ˆiL
ˆiL
ˆv
ˆix
−ˆiy
ˆiz
Fg
Fm
Vg ˆd
I ˆd Zei
C
L
R
+
++
+
++
+
−
−
−
−
−
1: D
ˆd
ˆic
ZN−cpm
ZD−cpm
ˆvg
ˆig ˆiL
ˆiL
ˆv
ˆix
−ˆiyi
ˆiz
FgF
FmF
VgVV ˆd
I ˆd ZeiZZ
C
L
R
+++
+++
++
++
+
−
−
−
−
−
1 : D
ˆd
ˆic
ZNZ −cpm
ZDZ −cpm
ˆvg
ˆig ˆiL
ˆiL
ˆv
ˆix
−ˆiy
ˆiz
Fg
Fm
Vg ˆd
I ˆd Zei
C
L
R
+
++
+
++
+
−
−
−
−
−
1: D
ˆd
ˆic
ZN−cpm
ZD−cpm
Fig. 18.29 Small-signal averaged model suitable for ﬁnding input impedances in the current-
programmed buck converter

762 18 Current-Programmed Control
To determine ZN−cpm , the additional injection source is set to zero,ˆiz= 0. In the presence of
ˆic and ˆvg, the output ˆv is nulled. Under these conditions, we ﬁnd
1
ZN−cpm (s)=
ˆig
ˆvg
⏐⏐⏐⏐
⏐⏐
ˆv→
null
0
(18.122)
Nulling the output implies nulling the inductor current, which means thatDˆvg+ Vg ˆd must equal
zero. As a result, we have
ˆd=−D
Vg
ˆvg (18.123)
Under the nulling condition, the input current is
ˆig
⏐⏐⏐⏐
⏐⏐
ˆv→
null
0
= I ˆd (18.124)
Substitution of Eq. (18.123) into Eq. (18.124) yields
1
ZN−cpm (s)=
ˆig
ˆvg
⏐⏐
⏐
⏐⏐⏐
ˆv→
null
0
=−D2
R = 1
ZN (s) (18.125)
or ZN−cpm =−R/D2. The result for ZN−cpm is exactly the same as the result given by Eq. (17.28)
for ZN in duty-cycle controlled buck converters. This is not surprising since the nulling condition
ˆv→
null
0 results in exactly the same converter circuit conditions regardless of the nature of the
control input.
To determine ZD−cpm , ˆiz = 0 and the independent control input is set to zero, ˆic = 0. The
converter input admittance, i.e., the inverse of ZD−cpm , is deﬁned as follows:
1
ZD−cpm (s)=
ˆig
ˆvg
⏐⏐⏐
⏐
⏐⏐
ˆic=0
(18.126)
From the model shown in Fig. 18.29, this transfer function can be found in any number of
ways. In contrast to duty-cycle converters, whereZD is the converter open-loop input impedance,
ZD−cpm is the input impedance of a current-programmed converter, which includes feedback and
feedforward paths. It is therefore convenient to approach ﬁnding ZD−cpm using the Feedback
Theorem: 1
ZD−cpm (s)= 1
Z∞D−cpm (s)
Ti
1+ Ti
+ 1
Z0D−cpm (s)
1
1+ Ti
(18.127)
where Ti(s) is the current-programmed loop gain
Ti(s)=
ˆiy
ˆix
⏐⏐⏐
⏐⏐⏐
ˆvg=0
= FmGid(s) (18.128)
Note that the injection source ˆiz has been added to the model of Fig. 18.29 speciﬁcally for the
purpose of ﬁnding ZD−cpm using the Feedback Theorem. The ideal input admittance can be
found by nulling ˆiy in the presence of ˆiz and ˆvg. Since ˆic = 0, nulling ˆiy is equivalent to nulling
ˆiL. Hence, the input admittance under the nulling condition is given by

18.5 Simulation of CPM Controlled Converters 763
1
Z∞D−cpm (s)=
ˆig
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆiy→
null
0
=−D2
R (18.129)
It follows that Z∞D−cpm (s)=−R/D2, which the same as the result found for ZN−cpm . The ad-
mittance 1/Z0D−cpm (s) is found under the condition that ˆix is nulled in the presence of ˆvg and ˆiz.
Solving the circuit model in Fig. 18.29 results in
1
Z0D−cpm (s)=
ˆig
ˆvg
⏐⏐
⏐⏐⏐
⏐
ˆix→
null
0
= D2−FmFgDVg
Zei
−FmFgDVg
R (18.130)
Substitution of Eqs. (18.128), (18.129), and (18.130) into Eq. (18.127) yields an expression for
the CPM input impedance ZD−cpm . Following the discussion in Sect.18.4.1, let us examine how
ZD−cpm depends on the converter parameters and the artiﬁcial ramp slope Ma. Consider ﬁrst
operation at D< 0.5 with no artiﬁcial ramp, Ma= 0. If inductance L is relatively large, M1 and
M2 are small, and therefore CPM gain is very large. A large L implies that the inductor current
ripple is small, and that Fg≈0. Large Fm implies that Ti is large and Eq. (18.127) simpliﬁes to:
lim
Fm→∞
Fg→0
1
ZD−cpm (s)=−D2
R (18.131)
Next, consider the case when the artiﬁcial ramp slope equals Ma = M2/2, the minimum value
necessary to ensure stability of the CPM controlled for any duty cycle D. It can be shown that
FmFgDVg
⏐⏐
⏐
Ma=M2/2= D2 (18.132)
so that Eq. (18.127) becomes
1
ZD−cpm (s)
⏐⏐
⏐
⏐⏐⏐
Ma=M2/2
=−D2
R (18.133)
Therefore, for Ma= M2/2, both ZN−cpm and ZD−cpm are equal to−R/D2. For practical values of
the artiﬁcial ramp slope Ma, ZD−cpm ≈ZN−cpm =−R/D2.
Finally, consider the case when the artiﬁcial ramp slopeMa is large, so thatFm and therefore
Ti are small. Equation (18.127) then reduces to
lim
Fm→0
1
ZD−cpm (s)=−D2
Zei
(18.134)
which means that for large Ma the CPM input impedance ZD−cpm approaches the open-loop
input impedance ZD in Eq. (17.21) for a duty-cycle controlled converter.
Once ZN−cpm and ZD−cpm are determined, input ﬁlter design for a current-programmed con-
troller follows the approach described in Chap. 17.
18.5 Simulation of CPM Controlled Converters
In the current-programmed mode (CPM), the transistor switching is controlled so that the peak
transistor current follows a control signal. The transistor duty cycled(t) is not directly controlled,
but depends on the CPM control input as well as on other converter voltages and currents.

764 18 Current-Programmed Control
CPM
control current 1 2
d
Rf iL(t) Ts
v1(t) Ts
v2(t) Ts
vc(t) Ts
PARAMETERS:
Rf, fs, L, Va
Inputs:
Output: duty cycle d
Fig. 18.30 Current-programmed mode (CPM) subcircuit
In this section, large-signal averaged relationships in CPM are written in a form suitable for
implementation as a subcircuit for simulation. The desired form of the CPM averaged subcircuit
model is shown in Fig. 18.30. The inputs to the subcircuit are the average control input,
⟨vc(t)⟩Ts = Rf⟨ic(t)⟩Ts (18.135)
the sensed average inductor current Rf⟨iL(t)⟩Ts , the average voltage⟨v1(t)⟩Ts applied across the
inductor during the interval when the transistor is on, and the average voltage⟨v2(t)⟩Ts applied
across the inductor during the interval when the rectiﬁer is on. The model parameters include the
equivalent current-sense resistance Rf , switching frequency fs, inductance L, and the amplitude
Va of the artiﬁcial ramp,
Va= maTsRf (18.136)
given an artiﬁcial ramp having slope −ma added to the control input. In the subinterval when
the transistor is on, the inductor current increases with slope m1 given by
m1=⟨v1(t)⟩Ts
L (18.137)
It is assumed that voltage ripples are small so that the voltage v1(t) across the inductor is ap-
proximately equal to the averaged value ⟨v1(t)⟩Ts . The length of this subinterval is d(t)Ts.I n
the second subinterval, when the transistor is o ﬀand the rectiﬁer is on, the inductor current
decreases with a negative slope−m2. Under the assumption that voltage ripples are small, the
slope m2 is given by
m2=⟨v2(t)⟩Ts
L (18.138)
The CPM model output is the duty cycle d. With the inputs and the output shown in Fig. 18.30,
the CPM subcircuit can be used in combination with any of the averaged switch subcircuit mod-
els developed in Sect.14.3 to construct an averaged simulation model for a current-programmed
converter. The CPM subcircuit model is developed ﬁrst in Sect.18.5.1 for the case when the con-
verter operates in continues conduction mode, and is then extended to include DCM operation
in Sect. 18.5.2.
18.5.1 Simulation Model for CPM Controlled Converters in CCM
Assuming operation in continuous conduction mode, the large-signal relationship between the
average inductor current⟨iL⟩Ts and the control signal ic is given by Eq. (18.67),
```
