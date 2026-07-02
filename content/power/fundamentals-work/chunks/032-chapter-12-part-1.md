---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第12章part 1 - 12 Transformer Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 493-512 > Chunk ID: `chapter-12-part-1`"
---

# 第12章part 1 - 12 Transformer Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 493-512  
> Chunk ID: `chapter-12-part-1`

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
12
Transformer Design
In the design methods of the previous chapter, copper loss Pcu and maximum ﬂux density Bmax
are speciﬁed, while core loss Pfe is not speciﬁcally addressed. This approach is appropriate for
a number of applications, such as the ﬁlter inductor in which the dominant design constraints
are copper loss and saturation ﬂux density. However, in a substantial class of applications, the
operating ﬂux density is limited by core loss rather than saturation. For example, in a conven-
tional high-frequency transformer, it is usually necessary to limit the core loss by operating at a
reduced value of the peak ac ﬂux densityΔB.
Design of core loss-limited magnetic devices is characterized by ﬁnding the ac ﬂux density
that minimizes total core plus copper loss. Typically, this optimization problem also involves
optimization of the winding geometry to control ac proximity losses, and possibly incorpora-
tion of other constraints such as galvanic isolation. Consequently, multiple design iterations are
required. In this chapter, the basic design equations are developed, and a ﬁrst-pass design that
minimizes the total core loss plus dc copper loss is found. The winding geometry can then be
estimated, and ac proximity losses can be analyzed as described in Sect. 10.4. The design can
then be iterated as needed.
This chapter covers the general transformer design problem. It is desired to design a k-
winding transformer as illustrated in Fig. 12.1. Both copper loss Pcu and core loss Pfe are mod-
eled. As the operating ﬂux density is increased (by decreasing the number of turns), the copper
loss is decreased but the core loss is increased. We will determine the operating ﬂux density that
minimizes the total power loss Ptot = Pfe + Pcu.
It is possible to generalize the core geometrical constant Kg design method, derived in the
previous chapter, to treat the design of magnetic devices when both copper loss and core loss
are signiﬁcant. This leads to the geometrical constant Kgfe , a measure of the eﬀective magnetic
size of core in a transformer design application. Several examples of transformer designs via
the Kgfe method are given in this chapter. A similar procedure is also derived, for design of
single-winding inductors in which core loss is signiﬁcant.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_12
485

486 12 Transformer Design
Fig. 12.1 A k-winding transformer, in which
both core loss and copper loss are signiﬁcant
n1 : n2
: nk
R1 R2
Rk
+
v1(t)
+
v2(t)
+
vk(t)
i1(t) i2(t)
ik(t)
12.1 Transformer Design: Basic Constraints
As in the case of the ﬁlter inductor design, we can write several basic constraining equations.
These equations can then be combined into a single equation for selection of the core size. In
the case of transformer design, the basic constraints describe the core loss, ﬂux density, copper
loss, and total power loss vs. ﬂux density. The ﬂux density is then chosen to optimize the total
power loss.
12.1.1 Core Loss
As described in Chap. 10, the total core loss Pfe depends on the peak ac ﬂux density ΔB,t h e
operating frequency f , and the volume of the core. At a given frequency, we can approximate
the core loss by a function of the form
Pfe = Kfe (ΔB)βAcℓm (12.1)
Again, Ac is the core cross-sectional area,ℓm is the core mean magnetic path length, and hence
Acℓm is the volume of the core. Kfe is a constant of proportionality which depends on the
operating frequency. The exponent β is determined from the core manufacturer’s published
data. Typically, the value of β for ferrite power materials is approximately 2.6; for other core
materials, this exponent lies in the range 2 to 3. Equation ( 12.1) generally assumes that the
applied waveforms are sinusoidal; eﬀects of waveform harmonic content are ignored here.
12.1.2 Flux Density
An arbitrary periodic primary voltage waveformv1(t) is illustrated in Fig.12.2. The volt-seconds
applied during the positive portion of the waveform is denotedλ1:
λ1=
∫ t2
t1
v1(t)dt (12.2)
These volt-seconds, or ﬂux-linkages, cause the ﬂux density to change from its negative peak to
its positive peak value. Hence, from Faraday’s law, the peak value of the ac component of the
ﬂux density is

12.1 Transformer Design: Basic Constraints 487
Fig. 12.2 An arbitrary transformer pri-
mary voltage waveform, illustrating the
volt-seconds applied during the positive
portion of the cycle
area 1
v1(t)
t1 t2 t
ΔB= λ1
2n1Ac
(12.3)
Note that, for a given applied voltage waveform and λ1, we can reduce ΔB by increasing the
primary turns n1. This has the eﬀect of decreasing the core loss according to Eq. (12.1). However,
it also causes the copper loss to increase, since the new windings will be comprised of more
turns of smaller wire. As a result, there is an optimal choice for ΔB, in which the total loss is
minimized. In the next sections, we will determine the optimal ΔB. Having done so, we can
then use Eq. (12.3) to determine the primary turns n1, as follows:
n1= λ1
2ΔBAc
(12.4)
It should also be noted that, in some converter topologies such as the forward converter with
conventional reset winding, the ﬂux density B(t) and the magnetizing current iM(t) are not al-
lowed to be negative. In consequence, the instantaneous ﬂux density B(t) contains a dc bias.
Provided that the core does not approach saturation, this dc bias does not signiﬁcantly a ﬀect
the core loss: core loss is determined by the ac component of B(t). Equations (12.2)t o( 12.4)
continue to apply to this case, sinceΔB is the peak value of the ac component of B(t).
12.1.3 Copper Loss
As shown in Sect. 11.3.1, the total copper loss is minimized when the core window area WA is
allocated to the various windings according to their relative apparent powers. The total copper
loss is then given by Eq. (11.34). This equation can be expressed in the form
Pcu= ρ(MLT )n2
1I2
tot
WAKu
(12.5)
where
Itot =
k∑
j=1
nj
n1
Ij (12.6)

488 12 Transformer Design
is the sum of the rms winding currents, referred to winding 1. Use of Eq. (12.4) to eliminate n1
from Eq. (12.5) leads to
Pcu=
⎛⎜⎜⎜⎜⎝
ρλ2
1I2
tot
4Ku
⎞⎟⎟⎟⎟⎠
⎦(MLT )
WAA2c
)⎦ 1
ΔB
)2
(12.7)
The right-hand side of Eq. ( 12.7) is grouped into three terms. The ﬁrst group contains speciﬁ-
cations, while the second group is a function of the core geometry. The last term is a function
ofΔB, to be chosen to optimize the design. It can be seen that copper loss varies as the inverse
square ofΔB; increasingΔB reduces Pcu.
The increased copper loss due to the proximity eﬀect is not explicitly accounted for in this
design procedure. In practice, the proximity loss must be estimated after the core and winding
geometries are known. However, the increased ac resistance due to proximity loss can be ac-
counted for in the design procedure. The eﬀective value of the wire resistivityρis increased by
a factor equal to the estimated ratio R
ac/Rdc. When the core geometry is known, the engineer
can attempt to implement the windings such that the estimated Rac/Rdc is obtained. Several
design iterations may be needed.
12.1.4 Total Power Loss vs.ΔB
The total power loss Ptot is found by adding Eqs. (12.1) and (12.7):
Ptot = Pfe + Pcu (12.8)
The dependence of Pfe, Pcu, and Ptot onΔB is sketched in Fig. 12.3.
Fig. 12.3 Dependence of cop-
per loss, core loss, and total loss
on peak ac ﬂux density
B
Power
loss
Ptot
Copper loss P
cu Core loss P
fe
Optimum B
12.1.5 Optimum Flux Density
Let us now choose the value ofΔB that minimizes Eq. (12.8). At the optimumΔB, we can write
dPtot
d(ΔB)= dP fe
d(ΔB)+ dPcu
d(ΔB)= 0 (12.9)
Note that the optimum does not necessarily occur where Pfe = Pcu. Rather, it occurs where
dP fe
d(ΔB)=−dPcu
d(ΔB) (12.10)

12.1 Transformer Design: Basic Constraints 489
The derivatives of the core and copper losses with respect toΔB are given by
dP fe
d(ΔB)= βKfe (ΔB)(β−1)Acℓm (12.11)
dPcu
d(ΔB)=−2
⎛⎜⎜⎜⎜⎝
ρλ2
1I2
tot
4Ku
⎞⎟⎟⎟⎟⎠
⎦(MLT )
WAA2c
)
(ΔB)−3 (12.12)
Substitution of Eqs. (12.11) and (12.12) into Eq. (12.10), and solution forΔB, leads to the opti-
mum ﬂux density
ΔB=
⎡⎢⎢⎢⎢⎣
ρλ2
1I2
tot
2Ku
(MLT )
WAA3cℓm
1
βKfe
⎤⎥⎥⎥⎥⎦
⎦ 1
β+2
)
(12.13)
The resulting total power loss is found by substitution of Eq. ( 12.13)i n t o( 12.1), ( 12.8),
and (12.9). Simpliﬁcation of the resulting expression leads to
Ptot =
[
AcℓmKfe
]⎦2
β+2
) ⎡⎢⎢⎢⎢⎣
ρλ2
1I2
tot
4Ku
(MLT )
WAA2c
⎤⎥⎥⎥⎥⎦
⎦β
β+2
) ⎡⎢⎢⎢⎢⎢⎢⎣
⎦β
2
)−
⎦β
β+2
)
+
⎦β
2
)⎦ 2
β+2
)⎤⎥⎥⎥⎥⎥⎥⎦ (12.14)
This expression can be regrouped, as follows:
WA(Ac)(2(β−1)/β)
(MLT )ℓ(2/β)
m
⎡⎢⎢⎢⎢⎢⎢⎣
⎦β
2
)−
⎦β
β+2
)
+
⎦β
2
)⎦2
β+2
)⎤⎥⎥⎥⎥⎥⎥⎦
−
⎦β+2
β
)
=
ρλ2
1I2
tot K(2/β)
fe
4Ku(Ptot)((β+2)/β) (12.15)
The terms on the left side of Eq. ( 12.15) depend on the core geometry, while the terms on
the right side depend on speciﬁcations regarding the application ( ρ, Itot,λ1, Ku, Ptot) and the
desired core material (Kfe, β). The left side of Eq. (12.15) can be deﬁned as the core geometrical
constant Kgfe :
Kgfe = WA(Ac)(2(β−1)/β)
(MLT )ℓ(2/β)
m
⎡⎢⎢⎢⎢⎢⎢⎣
⎦β
2
)−
⎦β
β+2
)
+
⎦β
2
)⎦ 2
β+2
)⎤⎥⎥⎥⎥⎥⎥⎦
−
⎦β+2
β
)
(12.16)
Hence, to design a transformer, the right side of Eq. ( 12.15) is evaluated. A core is selected
whose Kgfe exceeds this value:
Kgfe ≥
ρλ2
1I2
tot K(2/β)
fe
4Ku(Ptot)((β+2)/β) (12.17)
The quantity Kgfe is similar to the geometrical constant Kg used in the previous chapter to
design magnetics when core loss is negligible. Kgfe is a measure of the magnetic size of a core,
for applications in which core loss is signiﬁcant. Unfortunately, Kgfe depends on β, and hence
the choice of core material aﬀects the value of Kgfe . However, the β of most high-frequency
ferrite materials lies in the narrow range 2.6 to 2.8, and Kgfe varies by no more than±5% over
this range. Appendix B lists the values of Kgfe for various standard ferrite cores, for the value
β= 2.7.
Once a core has been selected, then the values of Ac, WA,ℓ m, and MLT are known. The
peak ac ﬂux densityΔB can then be evaluated using Eq. (12.13), and the primary turnsn1 can be
found using Eq. (12.4). The number of turns for the remaining windings can be computed using

490 12 Transformer Design
the desired turns ratios. The various window area allocations are found using Eq. ( 11.35). The
wire sizes for the various windings can then be computed as discussed in the previous chapter,
Aw, j= KuWAαj
nj
(12.18)
where Aw, j is the wire area for winding j.
12.2 A First-Pass Transformer Design Procedure
The procedure developed in the previous sections is summarized below. As in the ﬁlter inductor
design procedure of the previous chapter, this simple transformer design procedure should be
regarded as a ﬁrst-pass approach. Numerous issues have been neglected, including detailed
insulation requirements, conductor eddy current losses, temperature rise, roundoﬀof number of
turns, etc.
The following quantities are speciﬁed, using the units noted:
Wire eﬀective resistivity ρ (Ω-cm)
Total rms winding currents, referred to primary I
tot =
k∑
j=1
nj
ni
Ij (A)
Desired turns ratios n2/n1, n3/n1,e t c .
Applied primary volt-seconds λ1=
∫
positive
portion
o f cycle
v1(t) dt (V-sec)
Allowed total power dissipation Ptot (W)
Winding ﬁll factor Ku
Core loss exponent β
Core loss coeﬃcient Kfe (W/cm3Tβ)
The core dimensions are expressed in cm:
Core cross-sectional area Ac (cm2)
Core window area WA (cm2)
Mean length per turn MLT (cm)
Magnetic path length ℓm (cm)
Peak ac ﬂux density ΔB (Tesla)
Wire areas Aw1, Aw2,... (cm2)
The use of centimeters rather than meters requires that appropriate factors be added to the
design equations.
12.2.1 Procedure
1. Determine core size.
Kgfe ≥
ρλ2
1I2
tot K(2/β)
fe
4Ku(Ptot)((β+2)/β) 108 (12.19)
Choose a core that is large enough to satisfy this inequality. If necessary, it may be possible
to use a smaller core by choosing a core material having lower loss, i.e., smaller Kfe .

12.2 A First-Pass Transformer Design Procedure 491
2. Evaluate peak ac f lux density .
ΔB=
⎡⎢⎢⎢⎢⎣108ρλ2
1I2
tot
2Ku
(MLT )
WAA3cℓm
1
βKfe
⎤⎥⎥⎥⎥⎦
⎦1
β+2
)
(12.20)
Check whetherΔB is greater than the core material saturation ﬂux density. If the core op-
erates with a ﬂux dc bias, then the dc bias plus ΔB should not exceed the saturation ﬂux
density. Proceed to the next step if adequate margins exist to prevent saturation. Otherwise,
(1) repeat the procedure using a core material having greater core loss, or (2) use the Kg
design method, in which the maximum ﬂux density is speciﬁed.
3. Evaluate primary turns .
n1= λ1
2ΔBAc
104 (12.21)
4. Choose numbers o f turns f or other windings .
According to the desired turns ratios:
n2 = n1
⎦n2
n1
)
n3 = n1
⎦n3
n1
)
(12.22)
...
5. Evaluate f raction o f window area allocated to each winding .
α1 = n1I1
n1Itot
α2 = n2I2
n1Itot
..
. (12.23)
α
k = nk Ik
n1Itot
6. Evaluate wire sizes .
Aw1 ≤α1KuWA
n1
Aw2 ≤α2KuWA
n2
(12.24)
...
Choose wire gauges to satisfy these criteria.
A winding geometry can now be determined, and copper losses due to the proximity eﬀect
can be evaluated. If these losses are signiﬁcant, it may be desirable to further optimize the
design by reiterating the above steps, accounting for proximity losses by increasing the eﬀective

492 12 Transformer Design
wire resistivity to the value ρef f = ρcuPcu/Pdc, where Pcu is the actual copper loss including
proximity eﬀects, and Pdc is the copper loss obtained when the proximity eﬀect is negligible.
If desired, the power losses and transformer model parameters can now be checked. For the
simple model of Fig. 12.4, the following parameters are estimated:
Magnetizing inductance, referred to winding 1: LM = μn2
1Ac
ℓm
Peak ac magnetizing current, referred to winding 1: iM,pk= λ1
2LM
Winding resistances:
R1 = ρn1(MLT )
Aw1
R2 = ρn2(MLT )
Aw2
...
The core loss, copper loss, and total power loss can be determined using Eqs. ( 12.1), (12.7),
and (12.8), respectively.
n1 : n2
: nk
R1 R2
Rk
i1(t) i2(t)
ik(t)
LM
iM(t)
Fig. 12.4 Computed elements of simple transformer model
12.3 Examples
12.3.1 Example 1: Single-Output Isolated ´Cuk Converter
As an example, let us consider the design of a simple two-winding transformer for the ´Cuk
converter of Fig. 12.5. This transformer is to be optimized at the operating point shown, corre-
sponding to D= 0.5. The steady-state converter solution is Vc1 = Vg, Vc2 = V. The desired

12.3 Examples 493
transformer turns ratio is n= n1/n2= 5. The switching frequency is fs= 200 kHz, correspond-
ing to Ts= 5μs. A ferrite pot core is to be used; at 200 kHz, the chosen ferrite core material is
described by the following parameters: Kfe = 24.7W/Tβcm3, β= 2.6. A ﬁll factor of Ku= 0.5
is assumed. Total power loss of Ptot = 0.25 W is allowed. Copper wire, having a resistivity of
ρ= 1.724· 10−6Ω-cm, is to be used.
+
+
V
5 V
Vg
25 V
n : 1
I
20 A
Ig
4 A
+
v2(t)v1(t)
+
i1(t) i2(t)
vC2(t)++ vC1(t)
Fig. 12.5 Isolated ´Cuk converter example
Fig. 12.6 Waveforms, ´Cuk
converter transformer design
example
v1(t)
i1(t)
i2(t)
DTs
Area 1VC1
C2
D Ts
I/n
g
I
g
Transformer waveforms are illustrated in Fig.12.6. The applied primary volt-seconds are
λ1= DT sVc1 = (0.5)(5μsec)(25 V) (12.25)
= 62.5V−μsec
The primary rms current is
I1=
√
D
⎦I
n
)2
+ D′(Ig)2= 4A (12.26)

494 12 Transformer Design
It is assumed that the rms magnetizing current is much smaller than the rms winding currents.
Since the transformer contains only two windings, the secondary rms current is equal to
I2= nI1= 20 A (12.27)
The total rms winding current, referred to the primary, is
Itot = I1+ 1
n I2= 8 A (12.28)
The core size is evaluated using Eq. (12.19):
Kgfe ≥(1.724· 10−6)(62.5· 10−6)2(8)2(24.7)(2/26)
4(0.5)(0.25)(4.6/2.6) 108
= 0.00295 (12.29)
The pot core data of Appendix B lists the 2213 pot core with Kgfe = 0.0049 for β = 2.7.
Evaluation of Eq. (12.16) shows that Kgfe = 0.0047 for this core, when β= 2.6. In any event,
2213 is the smallest standard pot core size having Kgfe ≤0.00295. The increased value of
Kgfe should lead to lower total power loss. The peak ac ﬂux density is found by evaluation of
Eq. (12.20), using the geometrical data for the 2213 pot core:
ΔB=
[
108 (1.724· 10−6)(62.5· 10−6)2(8)2
2(0.5)
(4.42)
(0.297)(0.635)3(3.15)
1
(2.6)(24.7)
](1/4.6)
(12.30)
= 0.0858Tesla
This ﬂux density is considerably less than the saturation ﬂux density of approximately 0.35
Tesla. The primary turns are determined by evaluation of Eq. (12.21):
n1 = 104 (62.5· 10−6)
2(0.0858)(0.635) (12.31)
= 5.74 turns
The secondary turns are found by evaluation of Eq. ( 12.22). It is desired that the transformer
have a 5:1 turns ratio, and hence
n2= n1
n = 1.15 turns (12.32)
In practice, we might select n1 = 5 and n2 = 1. This would lead to a slightly higher ΔB and
slightly higher loss.
The fraction of the window area allocated to windings 1 and 2 are determined using
Eq. (12.23):
α1 = (4A)
(8A)= 0.5 (12.33)
α2 =
(1
5 )(20A)
(8A) = 0.5
For this example, the window area is divided equally between the primary and secondary wind-
ings, since the ratio of their rms currents is equal to the turns ratio. We can now evaluate the
primary and secondary wire areas, via Eq. (12.24):

12.3 Examples 495
Aw1 = (0.5)(0.5)(0.297)
(5) = 14.8· 10−3cm2
Aw2 = (0.5)(0.5)(0.297)
(1) = 74.2· 10−3cm2 (12.34)
The wire gauge is selected using the wire table of Appendix B. AWG #16 has area 13 .07·
10−3cm2, and is suitable for the primary winding. AWG #9 is suitable for the secondary winding,
with area 66.3· 10−3cm2. These are very large conductors, and one turn of AWG #9 is not
a practical solution! We can also expect signiﬁcant proximity losses, and signiﬁcant leakage
inductance. In practice, interleaved foil windings might be used. Alternatively, Litz wire or
several parallel strands of smaller wire could be employed.
It is a worthwhile exercise to repeat the above design at several di ﬀerent switching fre-
quencies, to determine how transformer size varies with switching frequency. As the switching
frequency is increased, the core loss coeﬃcient Kfe increases. Figure 12.7 illustrates the trans-
former pot core size, for various switching frequencies over the range 25 kHz to 1 MHz, for this
´Cuk converter example using P material withPtot < 0.25 W. Peak ﬂux densities in Tesla are also
plotted. For switching frequencies below 250 kHz, increasing the frequency causes the core size
to decrease. This occurs because of the decreased applied volt-secondsλ
1. Over this range, the
optimalΔB is essentially independent of switching frequency; the ΔB variations shown occur
owing to quantization of core sizes.
For switching frequencies greater than 250 kHz, increasing frequency causes greatly in-
creased core loss. Maintaining Ptot ≤0.25W then requires thatΔB be reduced, and hence the
core size is increased. The minimum transformer size for this example is apparently obtained at
250 kHz.
0
0.02
0.04
0.06
0.08
0.1
Switching frequency
B, Tesla
Pot core size
4226
3622
2616
2213
1811 1811
2213
2616
25 kHz 50 kHz 100 kHz 200 kHz 250 kHz 400 kHz 500 kHz 1000 kHz
Fig. 12.7 Variation of transformer size (bar chart) with switching frequency, ´Cuk converter example.
Optimum peak ac ﬂux density (data points) is also plotted
In practice, several matters complicate the dependence of transformer size on switching
frequency. Figure 12.7 ignores the winding geometry and copper losses due to winding eddy
currents. Greater power losses can be allowed in larger cores. Use of a di ﬀerent core material

496 12 Transformer Design
may allow higher or lower switching frequencies. The same core material, used in a di ﬀerent
application with diﬀerent speciﬁcations, may lead to a diﬀerent optimal frequency. Nonetheless,
examples have been reported in the literature [ 100–103] in which ferrite transformer size is
minimized at frequencies ranging from several hundred kilohertz to several megahertz. More
detailed design optimizations can be performed using computer optimization programs [ 104,
105].
12.3.2 Example 2: Multiple-Output Full-Bridge Buck Converter
As a second example, let us consider the design of transformer T
1 for the multiple-output full-
bridge buck converter of Fig. 12.8. This converter has a 5 V and a 15 V output, with maximum
loads as shown. The transformer is to be optimized at the full-load operating point shown, corre-
sponding to D= 0.75. Waveforms are illustrated in Fig.12.9. The converter switching frequency
is fs= 150 kHz. In the full-bridge conﬁguration, the transformer waveforms have fundamental
frequency equal to one-half of the switching frequency, so the eﬀective transformer frequency
is 75 kHz. Upon accounting for losses caused by diode forward voltage drops, one ﬁnds that the
desired transformer turns ratios n
1 : n2 : n3 are 110:5: 15. A ferrite EE consisting of Magnetics,
Inc. P-material is to be used in this example; at 75 kHz, this material is described by the follow-
ing parameters: Kfe = 7.6W/Tβcm3, β= 2.6. A ﬁll factor of Ku = 0.25 is assumed in this
isolated multiple-output application. Total power loss of Ptot = 4 W, or approximately 0.5% of
the load power, is allowed. Copper wire, having a resistivity of ρ= 1.724· 10−6Ω-cm, is to be
used.
The applied primary volt-seconds are
λ1= DT sVg= (0.75)(6.67 μsec)(160 V)= 800 V−μsec (12.35)
The primary rms current is
I1=
⎦n2
n1
I5V+ n3
n1
I15V
)√
D= 5.7A (12.36)
: n2
+
v1(t)+
D1
Q1
D2Q2
D3
Q3
D4Q4
i1(t)
+
5 V
D5
D6
I5V
100 Ai2a(t)
+
15 V
D7
D8
i3a(t)
n1 :
: n2
: n3
: n3
i2b(t)
i2b(t)
I15V
15 A
T1
Vg
160 V
Fig. 12.8 Multiple-output full-bridge isolated buck converter example

12.3 Examples 497
t
i2a(t)
0
i3a(t)
0 DTs Ts 2TsTs+DTs
i1(t)
0
v1(t)
00
Vg
g
Area 1
= Vg DTs
n2
n1
I5V + n3
n1
I15V
n2
n1
I5V + n3
n1
I15V
I5V
0.5I5V
I15V
0.5I15V
0
Fig. 12.9 Transformer waveforms, full-bridge converter example
The 5 V secondary windings carry rms current
I2= 1
2 I5V
√
1+ D= 66.1A (12.37)
The 15 V secondary windings carry rms current
I3= 1
2 I15V
√
1+ D= 9.9A (12.38)
The total rms winding current, referred to the primary, is
Itot =
∑
all5
windings
nj
n1
Ij= I1+ 2n2
n1
I2+ 2n3
n1
I3 (12.39)
= 14.4A
The core size is evaluated using Eq. (12.19):
Kgfe ≥(1.724· 10−6)(800· 10−6)2(14.4)2(7.6)(2/2.6)
4(0.25)(4)(4.6/2.6) 108 (12.40)
= 0.00937
The EE core data of AppendixB lists the EE40 core with Kgfe = 0.0118 for β= 2.7. Evaluation
of Eq. (12.16) shows that Kgfe = 0.0108 for this core, when β= 2.6. In any event, EE40 is the

498 12 Transformer Design
smallest standard EE core size having Kgfe ≤0.00937. The peak ac ﬂux density is found by
evaluation of Eq. (12.20), using the geometrical data for the EE40 core:
ΔB=
[
108 (1.724· 10−6)(800· 10−6)2(14.4)2
2(0.25)
(8.5)
(1.1)(1.27)3(7.7)
1
(2.6)(7.6)
](1/46)
(12.41)
= 0.23 Tesla
This ﬂux density is less than the saturation ﬂux density of approximately 0.35 Tesla. The primary
turns are determined by evaluation of Eq. (12.21):
n1 = 104 (800· 10−6)
2(0.23)(1.27) (12.42)
= 13.7 turns
The secondary turns are found by evaluation of Eq. ( 12.22). It is desired that the transformer
have a 110:5:15 turns ratio, and hence
n2 = 5
110n1= 0.62 turns (12.43)
n3 = 5
110n1= 1.87 turns (12.44)
In practice, we might select n1 = 22, n2 = 1, and n3 = 3. This would lead to a reduced ΔB
with reduced core loss and increased copper loss. Since the resultingΔB is suboptimal, the total
power loss will be increased. According to Eq. (12.3), the peak ac ﬂux density for the EE40 core
will be
ΔB= (800· 10−6)
2(22)(1.27) 104= 0.143 Tesla (12.45)
The resulting core and copper loss can be computed using Eqs. (12.1) and (12.7):
Pfe = (7.6)(0.143)2.6(1.27)(7.7)= 0.47 W (12.46)
Pcu = (1.724· 10−6)(800· 10−6)2(14.4)2
4(0.25)
(8.5)
(1.1)(1.27)2
1
(0.143)2 108 (12.47)
= 5.4W
Hence, the total power loss would be
Ptot = Pfe + Pcu= 5.9 W (12.48)
Since this is 50% greater than the design goal of 4 W, it is necessary to increase the core size.
The next larger EE core is the EE50 core, having Kgfe of 0.0284. The optimum ac ﬂux density
for this core, given by Eq. (12.3), isΔB= 0.14 T; operation at this ﬂux density would require

12.4 AC Inductor Design 499
n1 = 12 and would lead to a total power loss of 2.3 W. With n1 = 22, calculations similar to
Eqs. (12.45)t o( 12.48) lead to a peak ﬂux density ofΔB= 0.08 T. The resulting power losses
would then be Pfe = 0.23 W, Pcu= 3.89 W, Ptot = 4.12 W.
With the EE50 core and n1 = 22, the fraction of the available window area allocated to the
primary winding is given by Eq. (12.23)a s
α1= I1
Itot
= 5.7
14.4= 0.396 (12.49)
The fraction of the available window area allocated to each half of the 5 V secondary winding
should be
α2= n2I2
n1Itot
= 5
110
66.1
14.4= 0.209 (12.50)
The fraction of the available window area allocated to each half of the 15 V secondary winding
should be
α3= n3I3
n1Itot
= 15
110
9.9
14.4= 0.094 (12.51)
The primary wire area Aw1, 5 V secondary wire area Aw2, and 15 V secondary wire area Aw3 are
then given by Eq. (12.24)a s
Aw1 = α1KuWA
n1
= (0.396)(0.25)(1.78)
(22) = 8.0· 10−3cm2
⇒AWG#19
Aw2 = α2KuWA
n2
= (0.209)(0.25)(1.78)
(1) = 930· 10−3cm2 (12.52)
⇒AWG#8
Aw3 = α3KuWA
n3
= (0.094)(0.25)(1.78)
(3) = 13.9· 10−3cm2
⇒AWG#16
It may be preferable to wind the 15 V outputs using two #19 wires in parallel; this would lead
to the same area A w3 but would be easier to wind. The 5 V windings could be wound using
many turns of smaller paralleled wires, but it would probably be easier to use a ﬂat copper foil
winding. If insulation requirements allow, proximity losses could be minimized by interleaving
several thin layers of foil with the primary winding.
12.4 AC Inductor Design
The transformer design procedure of the previous sections can be adapted to handle the design
of other magnetic devices in which both core loss and copper loss are signiﬁcant. A procedure
is outlined here for design of single-winding inductors whose waveforms contain signiﬁcant
high-frequency ac components (Fig. 12.10). An optimal value of ΔB is found, which leads to
minimum total core plus copper loss. The major diﬀerence is that we must design to obtain a
given inductance, using a core with an air gap. The constraints and a step-by-step procedure are
brieﬂy outlined below.

500 12 Transformer Design
(a)
+
v(t) L
i(t)
(b)
Core
Window area WA
Core mean length
per turn (MLT)
Wire resistivity 
Fill factor Ku
Air gap
lg
n
turns
Core area
A
c
(c)
Area 
v(t)
t1 t2 t
i(t)
Fig. 12.10 Ac inductor, in which copper loss and core loss are signiﬁcant: ( a) deﬁnition of terminal
quantities, (b) core geometry, (c) arbitrary terminal waveforms
12.4.1 Outline of Derivation
As in the ﬁlter inductor design procedure of the previous chapter, the desired inductanceL must
be obtained, given by
L= μ0Acn2
ℓg
(12.53)
The applied voltage waveform and the peak ac component of the ﬂux density ΔB are related
according to
ΔB= λ
2nAc
(12.54)
The copper loss is given by
Pcu= ρn2(MLT )
KuWA
I2 (12.55)
where I is the rms value of i(t). The core loss Pfe is given by Eq. (12.1).
The value ofΔB that minimizes the total power loss Ptot = Pcu+ Pfe is found in a manner
similar to the transformer design derivation. Equation ( 12.54) is used to eliminate n from the

12.4 AC Inductor Design 501
expression for Pcu. The optimalΔB is then computed by setting the derivative of Ptot to zero.
The result is
ΔB=
[ρλ2I2
2Ku
(MLT )
WAA3cℓm
1
βKfe
]⎦1
β+2
)
(12.56)
which is essentially the same as Eq. (12.13). The total power loss Ptot is evaluated at this value
ofΔB, and the resulting expression is manipulated to ﬁnd Kgfe . The result is
Kgfe ≥
ρλ2I2K(2/β)
fe
2Ku(Ptot)((β+2)/β) (12.57)
where Kgfe is deﬁned as in Eq. (12.16). A core that satisﬁes this inequality is selected.
12.4.2 First-Pass AC Inductor Design Procedure
The units of Sect. 12.2 are employed here.
1. Determine core size.
Kgfe ≥
ρλ2I2K(2/β)
fe
2Ku(Ptot)((β+2)/β) 108 (12.58)
Choose a core that is large enough to satisfy this inequality. If necessary, it may be possible
to use a smaller core by choosing a core material having lower loss, that is, smaller Kfe .
2. Evaluate peak ac f lux density .
ΔB=
[
108ρλ2I2
2Ku
(MLT )
W4A3cℓm
1
βKfe
]⎦1
β+2
)
(12.59)
3. Number o f turns .
n= λ
2ΔBAc
104 (12.60)
4. Air gap length.
ℓg= μ0Acn2
L 10−4 (12.61)
with Ac speciﬁed in cm2 andℓg expressed in meters. Alternatively, the air gap can be indi-
rectly expressed via AL(mH/1000 turns):
AL= L
n2 109 (12.62)
5. Check f or saturation .
If the inductor current contains a dc component Idc, then the maximum total ﬂux density
Bmax is greater than the peak ac ﬂux densityΔB. The maximum total ﬂux density, in Tesla,
is given by
Bmax =ΔB+ LIdc
nAc
104 (12.63)
If Bmax is close to or greater than the saturation ﬂux densityBsat, then the core may saturate.
The ﬁlter inductor design procedure of the previous chapter should then be used, to operate
at a lower ﬂux density.

502 12 Transformer Design
6. Evaluate wire size .
Aw≤KuWA
n (12.64)
A winding geometry can now be determined, and copper losses due to the proximity eﬀect
can be evaluated. If these losses are signiﬁcant, it may be desirable to further optimize the
design by reiterating the above steps, accounting for proximity losses by increasing the
eﬀective wire resistivity to the valueρef f = ρcuPcu/Pdc, where Pcu is the actual copper loss
including proximity eﬀects, and Pdc is the copper loss predicted when the proximity eﬀect
is ignored.
7. Check power loss .
Pcu = ρn(MLT )
Aw
I2
Pfe = Kfe (ΔB)β Acℓm (12.65)
Ptot = Pcu+ Pfe
12.5 Summary
1. In a multiple-winding transformer, the low-frequency copper losses are minimized when
the available window area is allocated to the windings according to their apparent powers,
or ampere-turns.
2. As peak ac ﬂux density is increased, core loss increases while copper losses decrease. There
is an optimum ﬂux density that leads to minimum total power loss. Provided that the core
material is operated near its intended frequency, then the optimum ﬂux density is less than
the saturation ﬂux density. Minimization of total loss then determines the choice of peak ac
ﬂux density.
3. The core geometrical constant K
gfe is a measure of the magnetic size of a core, for appli-
cations in which core loss is signiﬁcant. In the Kgfe design method, the peak ﬂux density
is optimized to yield minimum total loss, as opposed to the Kg design method where peak
ﬂux density is a given speciﬁcation.
Problems
12.1 Forward converter inductor and transformer design. The objective of this problem set is
to design the magnetics (two inductors and one transformer) of the two-transistor, two-
output forward converter shown in Fig. 12.11. The ferrite core material to be used for all
three devices has a saturation ﬂux density of approximately 0.3 T at 120◦C. To provide a
safety margin for your designs, you should use a maximum ﬂux density Bmax that is no
greater than 75% of this value. The core loss at 100 kHz is described by Eq. ( 12.1), with
the parameter values β= 2.6 and Kfe = 50W/Tβcm3. Calculate copper loss at 100◦C.
Steady-state converter analysis and design . You may assume 100% eﬃciency and ideal
lossless components for this section.

12.5 Summary 503
+Vg
325 V
n1
turns
+
V1
L1
5 V
30 A
n2
turns
i1
+
V2
L2
15 V
1 A
n3
turns
i2
fs = 100 kHz
Fig. 12.11 Two-output forward converter of Problem12.1
(a) Select the transformer turns ratios so that the desired output voltages are obtained
when the duty cycle is D= 0.4.
(b) Specify values of L1 and L2 such that their current ripplesΔi1 andΔi2 are 10% of their
respective full-load current dc components I1 and I2.
(c) Determine the peak and rms currents in each inductor and transformer winding.
Inductor design. Allow copper loss of 1 W in L1 and 0.4 W in L2. Assume a ﬁll factor
of Ku = 0.5. Use ferrite EE cores—tables of geometrical data for standard EE core sizes
are given in Appendix B. Design the output ﬁlter inductors L1 and L2. For each inductor,
specify:
(i) EE core size
(ii) Air gap length
(iii) Number of turns
(iv)A W G w i r e s i z e
Transformer design. Allow a total power loss of 1 W. Assume a ﬁll factor of Ku = 0.35
(lower than for the ﬁlter inductors, to allow space for insulation between the windings).
Use a ferrite EE core. You may neglect losses due to the skin and proximity eﬀects, but you
should include core and copper losses. Design the transformer, and specify the following:
(i) EE core size
(ii) Turns n1, n2, and n3
(iii) AWG wire size for the three windings
Check your transformer design:
(iv) Compute the maximum ﬂux density. Will the core saturate?
(v) Compute the core loss, the copper loss of each winding, and the total power loss

504 12 Transformer Design
12.2 A single-transistor forward converter operates with an input voltage Vg = 160 V, and
supplies two outputs: 24 V at 2 A, and 15 V at 6 A. The duty cycle is D= 0.4. The turns
ratio between the primary winding and the reset winding is 1:1. The switching frequency
is 100 kHz. The core material loss equation parameters are β= 2.7, Kfe = 50. You may
assume a ﬁll factor of 0.25. Do not allow the core maximum ﬂux density to exceed 0.3 T.
Design a transformer for this application, having a total power loss no greater than 1.5 W
at 100◦C. Neglect proximity losses. You may neglect the reset winding. Use a ferrite PQ
core. Specify: core size, peak ac ﬂux density, wire sizes, and number of turns for each
winding. Compute the core and copper losses for your design.
12.3 Flyback/SEPIC transformer design. The “transformer” of the ﬂyback and SEPIC convert-
ers is an energy storage device, which might be more accurately described as a multiple-
winding inductor. The magnetizing inductance Lp functions as an energy-transferring in-
ductor of the converter, and therefore the “transformer” normally contains an air gap. The
converter may be designed to operate in either the continuous or discontinuous conduction
mode. Core loss may be signiﬁcant. It is also important to ensure that the peak current in
the magnetizing inductance does not cause saturation.
A ﬂyback transformer is to be designed for the following two-output ﬂyback converter
application:
Input: 160 Vdc
Output 1: 5 Vdc at 10 A
Output 2: 15 Vdc at l A
Switching frequency: 100 kHz
Magnetizing inductance L
p: 1.33 mH, referred to primary
Turns ratio: 160: 5: 15
Transformer power loss: Allow 1 W total
(a) Does the converter operate in CCM or DCM? Referred to the primary winding, how
large are (i) the magnetizing current rippleΔi,( ii) the magnetizing current dc compo-
nent I, and (iii) the peak magnetizing current Ipk?
(b) Determine ( i) the rms winding currents, and ( ii) the applied primary volt-secondsλ1.
Isλ1 proportional to Ipk?
(c) Modify the transformer and ac inductor design procedures of this chapter, to derive a
general procedure for designing ﬂyback transformers that explicitly accounts for both
core and copper loss, and that employs the optimum ac ﬂux density that minimizes
the total loss.
(d) Give a general step-by-step design procedure, with all speciﬁcations and units clearly
stated.
(e) Design the ﬂyback transformer for the converter of part (a), using your step-by-step
procedure of Part (d). Use a ferrite EE core, with β= 2.7 and K
fe = 50W/Tβcm3.
Specify: core size, air gap length, turns, and wire sizes for all windings.
(f) For your ﬁnal design of part (e), what are ( i) the core loss, ( ii) the total copper loss,
and (iii) the peak ﬂux density?
12.4 Over the intended range of operating frequencies, the frequency dependence of the core
loss coeﬃcient Kfe of a certain ferrite core material can be approximated using a mono-
tonically increasing fourth-order polynomial of the form
```
