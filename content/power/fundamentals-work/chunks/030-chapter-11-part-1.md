---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第11章part 1 - 11 Inductor Design
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 468-487 > Chunk ID: `chapter-11-part-1`"
---

# 第11章part 1 - 11 Inductor Design

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 468-487  
> Chunk ID: `chapter-11-part-1`

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
11
Inductor Design
This chapter treats the design of magnetic elements such as ﬁlter inductors, using the geomet-
rical constant ( Kg) method. With this method, the maximum ﬂux density Bmax is speciﬁed in
advance, and the element is designed to attain a given copper loss.
The design of a basic ﬁlter inductor is discussed in Sects. 11.1 and 11.1.5. In the ﬁlter
inductor application, it is necessary to obtain the required inductance, avoid saturation, and
obtain an acceptable low dc winding resistance and copper loss. The geometrical constantKg is
a measure of the eﬀective magnetic size of a core, when dc copper loss and winding resistance
are the dominant constraints [ 4, 99]. Design of a ﬁlter inductor involves selection of a core
having a Kg suﬃciently large for the application, then computing the required air gap, turns,
and wire size. A ﬁrst-pass ﬁlter inductor design procedure is given. Values of Kg for common
ferrite core shapes are tabulated in Appendix B. In practice, the Kg method might be employed
to ﬁnd a starting estimate of an inductor design. Details of the winding geometry would be
examined, and all losses computed. Design iterations can then further optimize the design.
Extension of the Kg method to multiple-winding elements is covered in Sect. 11.3. In appli-
cations requiring multiple windings, it is necessary to optimize the wire sizes of the windings
so that the overall copper loss is minimized. It is also necessary to write an equation that relates
the peak ﬂux density to the applied waveforms or to the desired winding inductance. Again, a
simple step-by-step transformer design approach is given.
The goal of theKg approach of this chapter is the design of a magnetic device having a given
copper loss. Core loss is not speciﬁcally addressed in theKg approach, and Bmax is a given ﬁxed
value. In the next chapter, the ﬂux density is treated as a design variable to be optimized. This
allows the overall loss (i.e., core loss plus copper loss) to be minimized.
11.1 Filter Inductor Design Constraints
A ﬁlter inductor employed in a CCM buck converter is illustrated in Fig. 11.1a. In this appli-
cation, the value of inductance L is usually chosen such that the inductor current ripple peak
magnitudeΔi is a small fraction of the full-load inductor current dc component I, as illustrated
in Fig. 11.1b. As illustrated in Fig. 11.2, an air gap is employed that is suﬃciently large to pre-
vent saturation of the core by the peak current I+Δi.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_11
459

460 11 Inductor Design
(a)
+
L
i(t)
(b) i(t)
t0 DTs Ts
I iL
Fig. 11.1 Filter inductor employed in a CCM buck converter: (a) circuit schematic, (b) inductor current
waveform
Fig. 11.2 Filter inductor: (a) structure, (b) magnetic circuit model
Let us consider the design of the ﬁlter inductor illustrated in Figs. 11.1 and 11.2.I t
is assumed that the core and proximity losses are negligible, so that the inductor losses
Fig. 11.3 Filter inductor
equivalent circuit
are dominated by the low-frequency copper losses. The inductor
can therefore be modeled by the equivalent circuit of Fig.11.3,i n
which R represents the dc resistance of the winding. It is desired
to obtain a given inductance L and given winding resistance R.
The inductor should not saturate when a given worst-case peak
current Imax is applied. Note that speciﬁcation of R is equivalent
to speciﬁcation of the copper loss Pcu, since
Pcu= I2
rms R (11.1)
The inﬂuence of inductor winding resistance on converter e ﬃ-
ciency and output voltage is modeled in Chap. 3.

11.1 Filter Inductor Design Constraints 461
Fig. 11.4 Filter inductor: (a) assumed geometry, (b) magnetic circuit
It is assumed that the inductor geometry is topologically equivalent to Fig. 11.4a. An equiv-
alent magnetic circuit is illustrated in Fig. 11.4b. The core reluctance Rc and air gap reluctance
Rg are
Rc= ℓc
μcAc
Rg= ℓg
μ0Ac
(11.2)
whereℓc is the core magnetic path length, Ac is the core cross-sectional area, μc is the core
permeability, andℓg is the air gap length. It is assumed that the core and air gap have the same
cross-sectional areas. Solution of Fig. 11.4b yields
ni=Φ(Rc+ Rg) (11.3)
Usually, Rc≪ Rg, and hence Eq. (11.3) can be approximated as
ni≈ΦRg (11.4)
The air gap dominates the inductor properties. Four design constraints now can be identiﬁed.
11.1.1 Maximum Flux Density
Given a peak winding current Imax, it is desired to operate the core ﬂux density at a maximum
value Bmax .T h ev a l u eo fBmax is chosen to be less than the worst-case saturation ﬂux density
Bsat of the core material.
Substitution ofΦ=BAc into Eq. (11.4) leads to
ni= BAcRg (11.5)
Upon letting I= Imax and B= Bmax , we obtain
nImax = Bmax AcRg= Bmax
ℓg
μ0
(11.6)
This is the ﬁrst design constraint. The turns ratio n and the air gap lengthℓg are unknowns.

462 11 Inductor Design
11.1.2 Inductance
The given inductance value L must be obtained. The inductance is equal to
L= n2
Rg
= μ0Acn2
ℓg
(11.7)
This is the second design constraint. The turns ratio n, core area Ac, and gap length ℓg are
unknown.
Fig. 11.5 The winding must ﬁt in
the core window area
Core window
area WA
Wire bare area
AW
Core
11.1.3 Winding Area
As illustrated in Fig. 11.5, the winding must ﬁt through the window, i.e., the hole in the center
of the core. The cross-sectional area of the conductor, or bare area, is AW . If the winding has n
turns, then the area of copper conductor in the window is
nAW (11.8)
If the core has window area WA, then we can express the area available for the winding conduc-
tors as
KuWA (11.9)
where Ku is the window utilization factor,o r ﬁll factor. Hence, the third design constraint can
be expressed as
KuWA≥nAW (11.10)
The ﬁll factor Ku is the fraction of the core window area that is ﬁlled with copper. Ku must
lie between zero and one. As discussed in [99], there are several mechanism that cause Ku to be
less than unity. Round wire does not pack perfectly; this reduces Ku by a factor of 0.7 to 0.55,
depending on the winding technique. The wire has insulation; the ratio of wire conductor area
to total wire area varies from approximately 0.95 to 0.65, depending on the wire size and type
of insulation. The bobbin uses some of the window area. Insulation may be required between
windings and/or winding layers. Typical values of K
u for cores with winding bobbins are 0.5
for a simple low-voltage inductor, 0.25 to 0.3 for an o ﬀ-line transformer, 0.05 to 0.2 for a
high-voltage transformer supplying several kV , and 0.65 for a low-voltage foil transformer or
inductor.

11.1 Filter Inductor Design Constraints 463
11.1.4 Winding Resistance
The resistance of the winding is
R= ρℓb
AW
(11.11)
where ρis the resistivity of the conductor material, ℓb is the length of the wire, and AW is the
wire bare area. The resistivity of copper at room temperature is 1.724· 10−6Ω-cm. The length
of the wire comprising an n-turn winding can be expressed as
ℓb= n(MLT) (11.12)
where (MLT) is the mean-length-per-turn of the winding. The mean-length-per-turn is a function
of the core geometry. Substitution of Eq. (11.12)i n t o(11.11) leads to
R= ρn(MLT)
AW
(11.13)
This is the fourth constraint.
11.1.5 The Core Geometrical Constant Kg
The four constraints, Eqs. (11.6), (11.7), (11.10), and (11.13), involve the quantitiesAc, WA, and
MLT, which are functions of the core geometry, the quantities Imax, Bmax,μ0, L, Ku, R, and ρ,
which are given speciﬁcations or other known quantities, andn,ℓ g, and AW , which are unknowns.
Elimination of the unknowns n,ℓ g, and AW leads to the following equation:
A2
c WA
(MLT)≥ρL2I2
max
B2max RKu
(11.14)
The quantities on the right side of this equation are speciﬁcations or other known quantities.
The left side of the equation is a function of the core geometry alone. It is necessary to choose
a core whose geometry satisﬁes Eq. (11.14).
The quantity
Kg= A2
c WA
(MLT) (11.15)
is called the core geometrical constant. It is a ﬁgure-of-merit that describes the e ﬀective elec-
trical size of magnetic cores, in applications where copper loss and maximum ﬂux density are
speciﬁed. Tables are included in Appendix B that lists the values of K
g for several standard
families of ferrite cores. Kg has dimensions of length to the ﬁfth power.
Equation (11.14) reveals how the speciﬁcations aﬀect the core size. Increasing the induc-
tance or peak current requires an increase in core size. Increasing the peak ﬂux density allows
a decrease in core size, and hence it is advantageous to use a core material that exhibits a high
saturation ﬂux density. Allowing a larger winding resistance R, and hence larger copper loss,
leads to a smaller core. Of course, the increased copper loss and smaller core size will lead to a
higher temperature rise, which may be unacceptable. The ﬁll factor K
u also inﬂuences the core
size.
Equation (11.15) reveals how core geometry aﬀects the core capabilities. An inductor capa-
ble of meeting increased electrical requirements can be obtained by increasing either the core

464 11 Inductor Design
area Ac, or the window area WA. Increase of the core area requires additional iron core material.
Increase of the window area implies that additional copper winding material is employed. We
can trade iron for copper, or vice versa, by changing the core geometry in a way that maintains
the Kg of Eq. (11.15).
11.2 The Kg Method: A First-Pass Design
The procedure developed in Sect. 11.1 is summarized below. This simple ﬁlter inductor de-
sign procedure should be regarded as a ﬁrst-pass approach. Numerous issues have been ne-
glected, including detailed insulation requirements, conductor eddy current losses, temperature
rise, roundoﬀof number of turns, etc.
The following quantities are speciﬁed, using the units noted:
Wire resistivity ρ (Ω-cm)
Peak winding current Imax (A)
Inductance L (H)
Winding resistance R (Ω)
Winding ﬁll factor Ku
Maximum operating ﬂux density Bmax (T)
The core dimensions are expressed in cm:
Core cross-sectional area Ac (cm2)
Core window area WA (cm2)
Mean length per turn MLT (cm)
The use of centimeters rather than meters requires that appropriate factors be added to the
design equations.
1. Determine core size
Kg≥ρL2I2
max
B2maxRKu
108 (cm5) (11.16)
Choose a core which is large enough to satisfy this inequality. Note the values of Ac, WA, and
MLT for this core. The resistivity ρof copper wire is 1.724· 10−6Ω-cm at room temperature,
and 2.3· 10−6Ω-cm at 100◦C.
2. Determine number of turns
n= LImax
Bmax Ac
104 (11.17)
with Ac expressed in cm2 and Bmax expressed in T.
3. Determine air gap length
ℓg= μ0Acn2
L 10−4 (m) (11.18)
with Ac expressed in cm2. The permeability of free space is μ0 = 4π· 10−7 H/m. The air gap
length is given in meters. The value expressed in Eq. (11.18) is approximate, and neglects fring-
ing ﬂux and other nonidealities. Generally fringing ﬂux increases the inductance, and hence a
somewhat longer gap would be needed to achieve the speciﬁed inductance.

11.3 Multiple-Winding Magnetics Design via the Kg Method 465
Core manufacturers sell gapped cores. Rather than specifying the air gap length, the equiva-
lent quantity AL is used. AL is equal to the inductance, in mH, obtained with a winding of 1000
turns. When AL is speciﬁed, it is the core manufacturer’s responsibility to obtain the correct gap
length. Equation (11.18) can be modiﬁed to yield the required AL, as follows:
AL= 10B2
max A2
c
LI2
max
(mH/1000 turns) (11.19)
where Ac is given in cm2, L is given in Henries, and Bmax is given in Tesla.
4. Evaluate wire size
AW ≤KuWA
n (cm2) (11.20)
Select wire with bare copper area less than or equal to this value. An American Wire Gauge
table is included in Appendix B.
As a check, the winding resistance can be computed:
R= ρn(MLT)
Aw
(Ω) (11.21)
11.3 Multiple-Winding Magnetics Design via the Kg Method
The Kg method can be extended to the case of multiple-winding magnetics, such as the trans-
formers and coupled inductors described in Sects. 10.5.3 to 10.5.5. The desired turns ratios, as
well as the desired winding voltage and current waveforms, are speciﬁed. In the case of a cou-
pled inductor or ﬂyback transformer, the magnetizing inductance is also speciﬁed. It is desired
to select a core size, number of turns for each winding, and wire sizes. It is also assumed that
the maximum ﬂux density Bmax is given.
With the Kg method, a desired copper loss is attained. In the multiple-winding case, each
winding contributes some copper loss, and it is necessary to allocate the available window area
among the various windings. In Sect.11.3.1 below, it is found that total copper loss is minimized
if the window area is divided between the windings according to their apparent powers. This
result is employed in the following sections, in which an optimized Kg method for coupled
inductor design is developed.
11.3.1 Window Area Allocation
The ﬁrst issue to settle in design of a multiple-winding magnetic device is the allocation of the
window area AW among the various windings. It is desired to design a device havingk windings
with turns ratios n1 : n2 :... : nk. These windings must conduct rms currents I1, I2,..., Ik
respectively. It should be noted that the windings are eﬀectively in parallel: the winding voltages
are ideally related by the turns ratios
v1(t)
n1
= v2(t)
n2
=··· = vk(t)
nk
(11.22)
However, the winding rms currents are determined by the loads, and in general are not related
to the turns ratios. The device is represented schematically in Fig. 11.6.

466 11 Inductor Design
Fig. 11.6 It is desired to optimally allocate the win-
d o wa r e ao fak–winding magnetic element to min-
imize low-frequency copper losses, with given rms
winding currents and turns ratios
n1 : n2
: nk
rms current
I1
rms current
I2
rms current
Ik
Fig. 11.7 Basic core topology, in-
cluding window area WA enclosed by
core (a). The window is allocated to
the various windings (b) to minimize
low-frequency copper loss
(a) Core
Window area WA
Core mean length
per turn (MLT)
Wire resistivity 
Fill factor Ku
(b)
Total window
area WA
Winding 1 allocation
1WA
Winding 2 allocation
2WA
etc.
{
{
The relevant geometrical parameters are summarized in Fig.11.7a. It is necessary to allocate
a portion of the total window areaWA to each winding, as illustrated in Fig.11.7b. Let α j be the
fraction of the window area allocated to winding j, where
0< α j< 1
α 1+ α 2+··· + α k= 1 (11.23)
The low-frequency copper lossPcu, j in winding j depends on the dc resistanceRj of winding
j, as follows:
Pcu, j= I2
j Rj (11.24)
The resistance of winding j is
Rj= ρℓj
AW, j
(11.25)

11.3 Multiple-Winding Magnetics Design via the Kg Method 467
where ρis the wire resistivity,ℓj is the length of the wire used for winding j, and AW, j is the
cross-sectional area of the wire used for winding j. These quantities can be expressed as
ℓj= nj(MLT) (11.26)
AW, j= WAKuα j
nj
(11.27)
where (MLT) is the winding mean-length-per-turn, andKu is the winding ﬁll factor. Substitution
of these expressions into Eq. (11.25) leads to
Rj= ρ
n2
j (MLT)
WAKuα j
(11.28)
The copper loss of winding j is therefore
Pcu, j=
n2
j i2
jρ(MLT)
WAKuα j
(11.29)
The total copper loss of the k windings is
Pcu,tot= Pcu,1+ Pcu,2+··· + Pcu,k= ρ(MLT)
WAKu
k∑
j=1
⎛⎜⎜⎜⎜⎜⎝
n2
j I2
j
α j
⎞⎟⎟⎟⎟⎟⎠ (11.30)
It is desired to choose theα js such that the total copper lossPcu,tot is minimized. Let us consider
what happens when we vary one of the α s, say α 1, between 0 and 1.
When α 1 = 0, then we allocate zero area to winding 1. In consequence, the resistance
of winding 1 tends to inﬁnity. The copper loss of winding 1 also tends to inﬁnity. On the other
hand, the other windings are given maximum area, and hence their copper losses can be reduced.
Nonetheless, the total copper loss tends to inﬁnity.
When α
1 = 1, then we allocate all of the window area to winding 1, and none to the other
windings. Hence, the resistance of winding 1, as well as its low-frequency copper loss, is mini-
mized. But the copper losses of the remaining windings tend to inﬁnity.
As illustrated in Fig. 11.8, there must be an optimum value of α 1 that lies between these
two extremes, where the total copper loss is minimized. Let us compute the optimum values of
α 1, α 2,..., α k using the method of Lagrange multipliers. It is desired to minimize Eq. ( 11.30),
subject to the constraint of Eq. (11.23). Hence, we deﬁne the function
Fig. 11.8 Variation of copper losses
withα1
1
Copper
loss
10
Pcu,tot
P
cu,
1
Pcu,2
+Pcu,3
+...+
Pcu,k

468 11 Inductor Design
f (α 1, α 2,··· , α k,ξ)= Pcu,tot(α 1, α 2,··· , α k)+ξg(α 1, α 2,··· , α k) (11.31)
where
g(α 1, α 2,··· , α k)= 1−
k∑
j=1
α j (11.32)
is the constraint that must equal zero, and ξis the Lagrange multiplier. The optimum point is
the solution of the system of equations
∂f (α 1, α 2,··· , α k,ξ)
∂α 1
= 0
∂f (α 1, α 2,··· , α k,ξ)
∂α 2
= 0
..
. (11.33)
∂f (α
1, α 2,··· , α k,ξ)
∂α k
= 0
∂f (α 1, α 2,··· , α k,ξ)
∂ξ = 0
T h es o l u t i o ni s
ξ= ρ(MLT)
WAKu
⎛⎜⎜⎜⎜⎜⎜⎝
k∑
j=1
njIj
⎞⎟⎟⎟⎟⎟⎟⎠
2
= Pcu,tot (11.34)
α m= nmIm
k∑
j=1
njIj
(11.35)
This is the optimal choice for the α s, and the resulting minimum value of Pcu,tot.
According to Eq. (11.22), the winding voltages are proportional to the turns ratios. Hence,
we can express the α ms in the alternate form
α m= VmIm
k∑
j=1
VjIj
(11.36)
by multiplying and dividing Eq. (11.35) by the quantity Vm/nm. It is irrelevant whether rms or
peak voltages are used. Equation ( 11.36) is the desired result. It states that the window area
should be allocated to the various windings in proportion to their apparent powers. The numer-
ator of Eq. (11.36) is the apparent power of winding m, equal to the product of the rms current
and the voltage. The denominator is the sum of the apparent powers of all windings.
As an example, consider the PWM full-bridge transformer having a center-tapped secondary,
as illustrated in Fig. 11.9. This can be viewed as a three-winding transformer, having a single
primary-side winding of n
1 turns, and two secondary-side windings, each ofn2 turns. The wind-
ing current waveforms i1(t), i2(t), and i3(t) are illustrated in Fig. 11.10. Their rms values are

11.3 Multiple-Winding Magnetics Design via the Kg Method 469
Ii1(t)
n1 turns { } n2 turns
} n2 turns
i2(t)
i3(t)
Fig. 11.9 PWM full-bridge transformer example
Fig. 11.10 Transformer wave-
forms, PWM full-bridge trans-
former example
n2
n1
I
t
i1(t)
00
n2
n1
I
i2(t) I
0.5I 0.5I
0
i3(t) I
0.5I 0.5I
0
0 DTs Ts 2TsTs +DTs
I1=
√
1
2Ts
∫ 2TS
0
i2
1(t)dt= n2
n1
I
√
D (11.37)
I2= I3=
√
1
2Ts
∫ 2TS
0
i2
2(t)dt= 1
2 I
√
1+ D (11.38)
Substitution of these expressions into Eq. (11.35) yields
α 1= 1
⎛⎜⎜⎜⎜⎝1+
√
1+ D
D
⎞⎟⎟⎟⎟⎠
(11.39)
α 2= α 3= 1
2
1
⎛⎜⎜⎜⎜⎝1+
√
D
1+ D
⎞⎟⎟⎟⎟⎠
(11.40)
If the design is to be optimized at the operating point D= 0.75, then one obtains
α 1= 0.396
α 2= 0.302 (11.41)
α 3= 0.302

470 11 Inductor Design
So approximately 40% of the window area should be allocated to the primary winding, and
30% should be allocated to each half of the center-tapped secondary. The total copper loss at
this optimal design point is found from evaluation of Eq. (11.34):
Pcu,tot= ρ(MLT)
WAKu
⎛⎜⎜⎜⎜⎜⎜⎝
3∑
j=1
njIj
⎞⎟⎟⎟⎟⎟⎟⎠
2
= ρ(MLT)n2
2I2
WAKu
⎦
1+ 2D+ 2
√
D(1+ D)
)
(11.42)
11.3.2 Coupled Inductor Design Constraints
Let us now consider how to design a k-winding coupled inductor, as discussed in Sect. 10.5.4
and illustrated in Fig. 11.11. It is desired that the magnetizing inductance be a speciﬁed value
LM, referred to winding 1. It is also desired that the numbers of turns for the other windings be
chosen according to desired turns ratios. When the magnetizing current iM(t) reaches its maxi-
mum value IM,max, the coupled inductor should operate with a given maximum ﬂux densityBmax.
With rms currents I1, I2,..., Ik applied to the respective windings, the total copper loss should
be a desired value Pcu given by Eq. (11.34). Hence, the design procedure involves selecting the
core size and number of primary turns so that the desired magnetizing inductance, the desired
ﬂux density, and the desired total copper loss are achieved. Other quantities, such as air gap
length, secondary turns, and wire sizes, can then be selected. The derivation follows the deriva-
tion for the single-winding case (Sect. 11.1), and incorporates the window area optimization of
Sect. 11.3.1.
The magnetizing current iM(t) can be expressed in terms of the winding currents i1(t), i2(t),
..., ik(t) by solution of Fig. 11.11a (or by use of Ampere’s Law), as follows:
iM(t)= i1(t)+ n2
n1
i2(t)+··· + nk
n1
ik(t) (11.43)
Fig. 11.11 A k–winding magnetic device, with speciﬁed turns ratios and waveforms: (a) electrical circuit
model, (b) magnetic circuit model

11.3 Multiple-Winding Magnetics Design via the Kg Method 471
By solution of the magnetic circuit model of Fig. 11.11b, we can write
n1iM(t)= B(t)Ac· Rg (11.44)
This equation is analogous to Eq. ( 11.4), and assumes that the reluctance Rg of the air gap is
much larger than the reluctance Rc of the core. As usual, the total ﬂux Φ(t) is equal to B(t)Ac.
Leakage inductances are ignored.
To avoid saturation of the core, the instantaneous ﬂux density B(t) must be less than the
saturation ﬂux density of the core material, Bsat. Let us deﬁne IM,max as the maximum value
of the magnetizing current iM(t). According to Eq. ( 11.44), this will lead to a maximum ﬂux
density Bmax given by
n1IM,max = Bmax Ac· Rg= Bmax
ℓg
μ0
(11.45)
For a value of IM,max given by the circuit application, we should use Eq. ( 11.45) to choose the
turns n1 and gap length ℓg such that the maximum ﬂux density Bmax is less than the satura-
tion density Bsat. Equation (11.45) is similar to Eq. (11.6), but accounts for the magnetizations
produced by multiple-winding currents.
The magnetizing inductance LM, referred to winding 1, is equal to
LM = n2
1
Rg
= n2
1
μ0Ac
ℓg
(11.46)
This equation is analogous to Eq. (11.7).
As shown in Sect. 11.3.1, the total copper loss is minimized when the core window areaWA
is allocated to the various windings according to Eq. (11.35)o r( 11.36). The total copper loss is
then given by Eq. (11.34). Equation (11.34) can be expressed in the form
Pcu= ρ(MLT)n2
1I2
tot
WAKu
(11.47)
where
Itot=
k∑
j=1
nj
n1
Ij (11.48)
is the sum of the rms winding currents, referred to winding 1.
We can now eliminate the unknown quantities ℓg and n1 from Eqs. ( 11.45), ( 11.46),
and (11.47). Equation (11.47) then becomes
Pcu=
ρ(MLT)L2
M I2
totI2
M,max
B2maxA2
c
WAKu
(11.49)
We can now rearrange this equation, by grouping terms that involve the core geometry on the
left-hand side, and speciﬁcations on the right-hand side:
A2
c WA
(MLT)=
ρL2
M I2
totI2
M,max
B2maxKuPcu
(11.50)
The left-hand side of the equation can be recognized as the sameKg term deﬁned in Eq. (11.15).
Therefore, to design a coupled inductor that meets the requirements of operating with a given

472 11 Inductor Design
maximum ﬂux density Bmax, given primary magnetizing inductance LM, and with a given total
copper loss Pcu, we must select a core that satisﬁes
Kg≥
ρL2
M I2
totI2
M,max
B2maxKuPcu
(11.51)
Once such a core is found, then the winding 1 turns and gap length can be selected to satisfy
Eqs. (11.45) and (11.46). The turns of windings 2 throughk are selected according to the desired
turns ratios. The window area is allocated among the windings according to Eq. (11.35), and the
wire gauges are chosen using Eq. (11.27).
The procedure above is applicable to design of coupled inductors. The results are applicable
to design of ﬂyback and SEPIC transformers as well, although it should be noted that the proce-
dure does not account for the eﬀects of core or proximity loss. It also can be extended to design
of other devices, such as conventional transformers—doing so is left as a homework problem.
11.3.3 First-Pass Design Procedure
The following quantities are speciﬁed, using the units noted:
Wire eﬀective resistivity ρ (Ω-cm)
Total rms winding currents, referred to winding 1 I
tot=
k∑
j=1
nj
ni
Ij (A)
Peak magnetizing current, referred to winding 1 IM,max (A)
Desired turns ratios n2/n1, n3/n1,e t c .
Magnetizing inductance, referred to winding 1 LM (H)
Allowed total copper loss Pcu (W)
Winding ﬁll factor Ku
Maximum operating ﬂux density Bmax (T)
The core dimensions are expressed in cm:
Core cross-sectional area Ac (cm2)
Core window area WA (cm2)
Mean length per turn MLT (cm)
The use of centimeters rather than meters requires that appropriate factors be added to the
design equations.
1. Determine core size
Kg≥
ρL2
M I2
totI2
M,max
B2maxPcuKu
108 (cm5) (11.52)
Choose a core which is large enough to satisfy this inequality. Note the values of Ac, WA, and
MLT for this core. The resistivity ρof copper wire is 1.724· 10−6Ω· cm at room temperature,
and 2.3· 10−6Ω· cm at 100◦C.

11.3 Multiple-Winding Magnetics Design via the Kg Method 473
2. Determine air gap length
ℓg=
μ0LM I2
M,max
B2maxAc
104 (m) (11.53)
Here, Bmax is expressed in Tesla, Ac is expressed in cm 2, andℓg is expressed in meters. The
permeability of free space is μ0 = 4π· 10−7 H/m. This value is approximate, and neglects
fringing ﬂux and other nonidealities.
3. Determine number of winding 1 turns
n1= LM IM,max
BmaxAc
104 (11.54)
Here, Bmax is expressed in Tesla and Ac is expressed in cm2.
4. Determine number of secondary turns
Use the desired turns ratios:
n2=
⎦n2
n1
)
n1
n3=
⎦n3
n1
)
n1
...
(11.55)
5. Evaluate fraction of window area allocated to each winding
α 1 = n1I1
n1Itot
α 2 = n2I2
n1Itot
(11.56)
...
α k = nk Ik
n1Itot
6. Evaluate wire sizes
Aw1 ≤α 1KuWA
n1
Aw2 ≤α 2KuWA
n2
... (11.57)
Select wire with bare copper area less than or equal to these values. An American Wire Gauge
table is included in Appendix B.

474 11 Inductor Design
11.4 Examples
11.4.1 Coupled Inductor for a Two-Output Forward Converter
As a ﬁrst example, let us consider the design of coupled inductors for the two-output forward
converter illustrated in Fig. 11.12. This element can be viewed as two ﬁlter inductors that are
wound on the same core. The turns ratio is chosen to be the same as the ratio of the output
voltages. The magnetizing inductance performs the function of ﬁltering the switching harmon-
ics for both outputs, and the magnetizing current is equal to the sum of the reﬂected winding
currents.
(a)
n1 +
v1
n2
turns
i1
+
v2
i2
+vg
Output 1
28 V
4 A
Output 2
12 V
2 Afs = 200 kHz
(b)
n1 : n2
+
v1
i1
+
v2
i2
LMiM
Coupled
inductor
model
vM
(c)
iM(t)
vM(t)
IM
0
0
1
iM
D Ts
Fig. 11.12 Two-output forward converter example: ( a) circuit schematic, ( b) coupled inductor model
inserted into converter secondary-side circuit, (c) magnetizing current and voltage waveforms of coupled
inductor, referred to winding 1
At the nominal full-load operating point, the converter operates in the continuous conduction
mode with a duty cycle of D= 0.35. The switching frequency is 200 kHz. At this operating
point, it is desired that the ripple in the magnetizing current have a peak magnitude equal to
20% of the dc component of magnetizing current.

11.4 Examples 475
The dc component of the magnetizing current IM is
IM = I1+ n2
n1
I2
= (4 A)+ 12
28(2 A) (11.58)
= 4.86 A
The magnetizing current rippleΔiM can be expressed as
ΔiM = V1D′Ts
2LM
(11.59)
Since we wantΔiM to be equal to 20% of IM, we should choose LM as follows:
LM = V1D′Ts
2ΔiM
= (28 V)(1−0.35)(5 μs)
2(4.86 A)(20%) (11.60)
= 47 μH
The peak magnetizing current, referred to winding 1, is therefore
IM,max= IM+ΔiM = 5.83 A (11.61)
Since the current ripples of the winding currents are small compared to the respective dc com-
ponents, the rms values of the winding currents are approximately equal to the dc components:
I1= 4A, I2= 2 A. Therefore, the sum of the rms winding currents, referred to winding 1, is
Itot= I1+ n2
n1
I2= 4.86 A (11.62)
For this design, it is decided to allow 0.75 W of copper loss, and to operate the core at a max-
imum ﬂux density of 0.25 Tesla. A ﬁll factor of 0.4 is assumed. The required Kg is found by
evaluation of Eq. (11.52), as follows:
Kg≥(1.724· 10−6Ω−cm)(47 μH)2(4.86 A)2(5.83 A)2
(0.25 T)2(0.75 W)(0.4) 108 (11.63)
= 16· 10−3 cm5
A ferrite PQ 20/16 core is selected, which has a Kg of 22.4· 10−3 cm5. From Appendix B,t h e
geometrical parameters for this core are Ac= 0.62 cm2, WA= 0.256 cm2, and MLT= 4.4c m .
The air gap is found by evaluation of Eq. (11.53) as follows:
ℓg=
μ0LM I2
M,max
B2maxAc
104
= (4π· 10−7H/m)(47 μH)(5.83 A)2
(0.25 T)2(0.62 cm2) 104 (11.64)
= 0.52 mm

476 11 Inductor Design
In practice, a slightly longer air gap would be necessary, to allow for the eﬀects of fringing ﬂux
and other nonidealities. The winding 1 turns are found by evaluation of Eq. (11.54):
n1 = LM IM,max
BmaxAc
104
= (47 μH)(5.83 A)
(0.25 T)(0.62 cm2)104 (11.65)
= 17.6 turns
The winding 2 turns are chosen according to the desired turns ratio:
n2 =
⎦n2
n1
)
n1
=
⎦12
28
)
(17.6) (11.66)
= 7.54 turns
The numbers of turns are rounded oﬀto n1 = 17 turns, n2 = 7 turns (18:8 would be another
possible choice). The window area WA is allocated to the windings according to the fractions
from Eq. (11.56):
α 1= n1I1
n1Itot
= (17)(4 A)
(17)(4.86 A)= 0.8235
α 2= n2I2
n1Itot
= (7)(2 A)
(17)(4.86 A)= 0.1695
(11.67)
The wire sizes can therefore be chosen as follows:
Aw1≤α 1KuWA
n1
= (0.8235)(0.4)(0.256 cm2)
(17) = 4.96· 10−3 cm2
use AWG #21
(11.68)
Aw2≤α 2KuWA
n2
= (0.1695)(0.4)(0.256 cm2)
(7) = 2.48· 10−3 cm2
use AWG #24
11.4.2 CCM Flyback Transformer
As a second example, let us design the ﬂyback transformer for the converter illustrated in
Fig. 11.13. This converter operates with an input voltage of 200 V , and produces an full-load
output of 20 V at 5 A. The switching frequency is 150 kHz. Under these operating conditions, it
is desired that the converter operate in the continuous conduction mode, with a magnetizing cur-
rent ripple equal to 20% of the dc component of magnetizing current. The duty cycle is chosen
to be D= 0.4, and the turns ratio is n
2/n1 = 0.15. A copper loss of 1.5 W is allowed, not in-
cluding proximity eﬀect losses. To allow room for isolation between the primary and secondary

11.4 Examples 477
Fig. 11.13 Flyback transformer
design example: (a)c o n v e r t e r
schematic, (b) typical
waveforms
(a)
+
LM
+
V
Vg
Q1
D1
n1 : n2
C
Transformer model
iMi1
R
+
vM
i2
(b)
vM(t)
0
Vg
DTs
iM(t)
IM
0
iM
i1(t)
IM
0
i2(t)
IM
0
n1
n2
windings, a ﬁll factor ofKu= 0.3 is assumed. A maximum ﬂux density ofBmax= 0.25 T is used;
this value is less than the worst-case saturation ﬂux density Bsat of the ferrite core material.
By solution of the converter using capacitor charge balance, the dc component of the mag-
netizing current can be found to be
IM =
⎦n2
n1
) 1
D′
V
R= 1.25 A (11.69)
Hence, the magnetizing current ripple should be
ΔiM = (20%)IM = 0.25 A (11.70)

478 11 Inductor Design
and the maximum value of the magnetizing current is
IM,max= IM+ΔiM = 1.5 A (11.71)
To obtain this ripple, the magnetizing inductance should be
LM = VgDTs
2ΔiM
(11.72)
= 1.07 mH
The rms value of the primary winding current is found using Eq. ( A.6) of Appendix A,a sf o l -
lows:
I1= IM
√
D
√
1+ 1
3
⎦ΔiM
IM
)2
= 0.796 A (11.73)
The rms value of the secondary winding current is found in a similar manner:
I2= n1
n2
IM
√
D′
√
1+ 1
3
⎦ΔiM
IM
)2
= 6.50 A (11.74)
Note that I2 is not simply equal to the turns ratio multiplied byI1. The total rms winding current
is equal to:
Itot= I1+ n2
n1
I2= 1.77 A (11.75)
We can now determine the necessary core size. Evaluation of Eq. (11.52) yields
Kg ≥
ρL2
M I2
totI2
M,max
B2maxPcuKu
108
= (1.724· 10−6Ω−cm)(1.07· 10−3 H)2(1.77 A)2(1.5A )2
(0.25 T)2(1.5W ) ( 0.3) 108 (11.76)
= 0.049 cm5
The smallest EE core listed in Appendix B that satisﬁes this inequality is the EE30, which has
Kg= 0.0857 cm5. The dimensions of this core are
Ac 1.09 cm2
WA 0.476 cm2
MLT 6.6c m
ℓm 5.77 cm
(11.77)
The air gap lengthℓg is chosen according to Eq. (11.53):
ℓg =
μ0LM I2
M,max
B2maxAc
104
= (4π· 10−7H/m)(1.07· 10−3 H)(1.5A )2
(0.25 T)2(1.09 cm2) 104 (11.78)
= 0.44 mm
```
