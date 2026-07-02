---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第10章part 1 - 10 Basic Magnetics Theory
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 418-437 > Chunk ID: `chapter-10-part-1`"
---

# 第10章part 1 - 10 Basic Magnetics Theory

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 418-437  
> Chunk ID: `chapter-10-part-1`

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
10
Basic Magnetics Theory
Magnetics are an integral part of every switching converter. Often, the design of the magnetic
devices cannot be isolated from the converter design. The power electronics engineer must
not only model and design the converter, but must model and design the magnetics as well.
Modeling and designing of magnetics for switching converters is the topic of Part III of this
book.
In this chapter, basic magnetics theory is reviewed, including magnetic circuits, inductor
modeling, and transformer modeling [ 85–89]. Loss mechanisms in magnetic devices are de-
scribed. Winding eddy currents and the proximity eﬀect, a signiﬁcant loss mechanism in high-
current high-frequency windings, are explained in detail [90–95]. Inductor design is introduced
in Chap. 11, and transformer design is covered in Chap. 12.
10.1 Review of Basic Magnetics
10.1.1 Basic Relationships
The basic magnetic quantities are illustrated in Fig.10.1. Also illustrated are the analogous, and
perhaps more familiar, electrical quantities. The magnetomotive force F , or scalar potential,
between two points x1 and x2 is given by the integral of the magnetic ﬁeld H along a path
connecting the points:
F=
∫ x2
x1
H· dℓ (10.1)
where dℓ is a vector length element pointing in the direction of the path. The dot product yields
the component of H in the direction of the path. If the magnetic ﬁeld is of uniform strength H
passing through an element of lengthℓ as illustrated, then Eq. (10.1) reduces to
F= Hℓ (10.2)
This is analogous to the electric ﬁeld of uniform strength E, which induces a voltage V= Eℓ
between two points separated by distanceℓ.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_10
409

410 10 Basic Magnetics Theory
Fig. 10.1 Comparison of magnetic ﬁeld H, MMF F ,ﬂ u xΦ, and ﬂux density B, with the analogous
electrical quantities E, V, I,a n dJ
Figure 10.1 also illustrates a total magnetic ﬂuxΦpassing through a surface S having area
Ac. The total ﬂuxΦis equal to the integral of the normal component of the ﬂux density B over
the surface
Φ=
∫
sur f ace S
B· dA (10.3)
where dA is a vector area element having direction normal to the surface. For a uniform ﬂux
density of magnitude B as illustrated, the integral reduces to
Φ=BAc (10.4)
Flux density B is analogous to the electrical current density J, and ﬂuxΦis analogous to the
electric current I. If a uniform current density of magnitude J passes through a surface of area
Ac, then the total current is I= JAc.
Faraday’s law relates the voltage induced in a winding to the total ﬂux passing through the
interior of the winding. Figure10.2 illustrates ﬂuxΦ(t) passing through the interior of a loop of
Fig. 10.2 The voltage v(t) induced in a loop of
wire is related by Faraday’s law to the derivative
of the total ﬂuxΦ(t) passing through the interior
of the loop

10.1 Review of Basic Magnetics 411
Fig. 10.3 Illustration of Lenz’s law in a shorted
loop of wire. The ﬂuxΦ(t) induces currenti(t), which
in turn generates ﬂux Φ′(t) that tends to oppose
changes inΦ(t) Flux (t)
Induced current
i(t)
Shorted
loop
Induced
flux 
(t)
wire. The loop encloses cross-sectional area Ac. According to Faraday’s law, the ﬂux induces a
voltage v(t) in the wire, given by
v(t)= dΦ(t)
dt (10.5)
where the polarities of v(t) andΦ(t) are deﬁned according to the right-hand rule, as in Fig. 10.2.
For a uniform ﬂux distribution, we can express v(t) in terms of the ﬂux density B(t) by substitu-
tion of Eq. (10.4):
v(t)= Ac
dB(t)
dt (10.6)
Thus, the voltage induced in a winding is related to the ﬂuxΦand ﬂux density B passing through
the interior of the winding.
Lenz’s law states that the voltage v(t) induced by the changing ﬂuxΦ(t)i nF i g .10.2 is of the
polarity that tends to drive a current through the loop to counteract the ﬂux change. For example,
consider the shorted loop of Fig. 10.3. The changing ﬂux Φ(t) passing through the interior of
the loop induces a voltage v(t) around the loop. This voltage, divided by the impedance of the
loop conductor, leads to a current i(t) as illustrated. The current i(t) induces a ﬂuxΦ′(t), which
tends to oppose the changes in Φ(t). Lenz’s law is invoked later in this chapter, to provide a
qualitative understanding of eddy current phenomena.
Ampere’s law relates the current in a winding to the magnetomotive force F and magnetic
ﬁeld H. The net MMF around a closed path of length ℓm is equal to the total current passing
through the interior of the path. For example, Fig. 10.4 illustrates a magnetic core, in which a
wire carrying current i(t) passes through the window in the center of the core. Let us consider
the closed path illustrated, which follows the magnetic ﬁeld lines around the interior of the core.
Ampere’s law states that
∮
closed path
H· dℓ= total current passing through interior of path (10.7)
Fig. 10.4 The net MMF around
a closed path is related by Am-
pere’s law to the total current passing
through the interior of the path

412 10 Basic Magnetics Theory
(a)
B
Hμ0
(b)
B
H
μ
Fig. 10.5 B–H characteristics: (a) of free space or air, (b) of a typical magnetic core material
The total current passing through the interior of the path is equal to the total current passing
through the window in the center of the core, or i(t). If the magnetic ﬁeld is uniform and of
magnitude H(t), then the integral is H(t)ℓm. So for the example of Fig. 10.4,E q .(10.7) reduces
to
F (t)= H(t)ℓm= i(t) (10.8)
Thus, the magnetic ﬁeld strength H(t) is related to the winding current i(t). We can view
winding currents as sources of MMF. Equation ( 10.8) states that the MMF around the core,
F (t)= H(t)ℓm, is equal to the winding current MMF i(t). The total MMF around the closed
loop, accounting for both MMFs, is zero.
The relationship between B and H, or equivalently betweenΦand F , is determined by the
core material characteristics. Figure 10.5a illustrates the characteristics of free space, or air:
B= μ0H (10.9)
The quantityμ0 is the permeability of free space, and is equal to 4 π· 10−7 Henries per meter
in MKS units. Figure 10.5b illustrates the B–H characteristic of a typical iron alloy under high-
level sinusoidal steady-state excitation. The characteristic is highly nonlinear, and exhibits both
hysteresis and saturation. The exact shape of the characteristic is dependent on the excitation,
and is diﬃcult to predict for arbitrary waveforms.
For purposes of analysis, the core material characteristic of Fig.10.5b is usually modeled by
the linear or piecewise-linear characteristics of Fig.10.6.I nF i g .10.6a, hysteresis and saturation
are ignored. The B–H characteristic is then given by
B= μH
μ= μrμ0 (10.10)
The core material permeabilityμcan be expressed as the product of the relative permeabilityμr
and ofμ0. Typical values ofμr lie in the range 103 to 105.
The piecewise-linear model of Fig. 10.6b accounts for saturation but not hysteresis. The
core material saturates when the magnitude of the ﬂux density B exceeds the saturation ﬂux
density Bsat.F o r| B|< Bsat, the characteristic follows Eq. ( 10.10). When| B|> Bsat,t h e
model predicts that the core reverts to free space, with a characteristic having a much smaller

10.1 Review of Basic Magnetics 413
(a)
B
H
μ = μr μ0
(b)
B
H
μ
Bsat
sat
Fig. 10.6 Approximation of the B–H characteristics of a magnetic core material: (a) by neglecting both
hysteresis and saturation, (b) by neglecting hysteresis
slope approximately equal to μ0. Square-loop materials exhibit this type of abrupt-saturation
characteristic, and additionally have a very large relative permeabilityμr. Soft materials exhibit
a less abrupt saturation characteristic, in whichμgradually decreases as H is increased. Typical
values of Bsat are 1 to 2 Tesla for iron laminations and silicon steel, 0.5 to 1 Tesla for powdered
iron and molypermalloy materials, and 0.25 to 0.5 Tesla for ferrite materials.
Unit systems for magnetic quantities are summarized in Table 10.1. The MKS system is
used throughout this book. The unrationalized CGS system also continues to ﬁnd some use.
Conversions between these systems are listed.
Table 10.1 Units for magnetic quantities
Quantity MKS Unrationalized CGS Conversions
Core material equation B=μ0μrHB =μrH
B Tesla Gauss 1 T = 104G
H Ampere/meter Oersted 1 A /m= 4π· 10−3 Oe
Φ Weber Maxwell 1W b= 108Mx
1T= 1W b/m2
Figure 10.7 summarizes the relationships between the basic electrical and magnetic quanti-
ties of a magnetic device. The winding voltage v(t) is related to the core ﬂux and ﬂux density
via Faraday’s law. The winding currenti(t) is related to the magnetic ﬁeld strength via Ampere’s
law. The core material characteristics relate B and H.
We can now determine the electrical terminal characteristics of the simple inductor of
Fig. 10.8a. A winding of n turns is placed on a core having permeabilityμ. Faraday’s law states
that the ﬂuxΦ(t) inside the core induces a voltage vturn(t) in each turn of the winding, given by
vturn(t)= dΦ(t)
dt (10.11)
Since the same ﬂuxΦ(t) passes through each turn of the winding, the total winding voltage is

414 10 Basic Magnetics Theory
Fig. 10.7 Summary of the steps in
determination of the terminal electri-
cal i–v characteristics of a magnetic
element
v(t)
i(t)
B(t), (t)
H(t), F (t)
Terminal
characteristics
Core
characteristics
Fig. 10.8 Inductor example:
(a) inductor geometry, (b) appli-
cation of Ampere’s law
(a)
core
n
turns
Core area
A
c
Core
permeability
μ
+
v(t)
i(t)
(b)
n
turns
i(t)
H
Magnetic
path
length l
m
v(t)= nvturn(t)= ndΦ(t)
dt (10.12)
Equation (10.12) can be expressed in terms of the average ﬂux density B(t) by substitution of
Eq. (10.4):
v(t)= nAc
dB(t)
dt (10.13)
where the average ﬂux density B(t)i sΦ(t)/Ac.
The use of Ampere’s law is illustrated in Fig. 10.8b. A closed path is chosen which follows
an average magnetic ﬁeld line around the interior of the core. The length of this path is called
the mean magnetic path lengthℓm. If the magnetic ﬁeld strengthH(t) is uniform, then Ampere’s
law states that Hℓm is equal to the total current passing through the interior of the path, that is,
the net current passing through the window in the center of the core. Since there are n turns of
wire passing through the window, each carrying currenti(t), the net current passing through the
window is ni(t). Hence, Ampere’s law states that
H(t)ℓm= ni(t) (10.14)

10.1 Review of Basic Magnetics 415
Let us model the core material characteristics by neglecting hysteresis but accounting for
saturation, as follows:
B=
⎧⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎩
Bsat for H≥Bsat/μ
μH for|H|< Bsat/μ
−Bsat for H≤−Bsat/μ
(10.15)
The B–H characteristic saturated slopeμ0 is much smaller thanμ, and is ignored here. A char-
acteristic similar to Fig. 10.6b is obtained. The current magnitude Isat at the onset of saturation
can be found by substitution of H= Bsat/μinto Eq. (10.14). The result is
Isat= Bsatℓm
μn (10.16)
We can now eliminateB and H from Eqs. (10.13)t o( 10.15), and solve for the electrical terminal
characteristics. For|I|< Isat, B= μH. Equation (10.13) then becomes
v(t)= μnAc
dH(t)
dt (10.17)
Substitution of Eq. (10.14) into Eq. (10.17) to eliminate H(t) then leads to
v(t)= μn2Ac
ℓm
di(t)
dt (10.18)
which is of the form
v(t)= Ldi(t)
dt (10.19)
with
L= μn2Ac
ℓm
(10.20)
So the device behaves as an inductor for|I|< Isat. When|I|> Isat, then the ﬂux density B(t)=
Bsat is constant. Faraday’s law states that the terminal voltage is then
v(t)= nAc
dBsat
dt = 0 (10.21)
When the core saturates, the magnetic device behavior approaches a short circuit. The device
behaves as an inductor only when the winding current magnitude is less than Isat. Practical
inductors exhibit some small residual inductance due to their nonzero saturated permeabilities;
nonetheless, in saturation the inductor impedance is greatly reduced, and large inductor currents
may result.
10.1.2 Magnetic Circuits
Figure 10.9a illustrates uniform ﬂux and magnetic ﬁeld inside an element having permeability
μ, lengthℓ, and cross-sectional area Ac. The MMF between the two ends of the element is
F= Hℓ (10.22)

416 10 Basic Magnetics Theory
(a)
Flux
{
Length l
MMF F Area
Ac
Core permeability μ
H
+
R= l
μAc
(b)
F
R
Fig. 10.9 An element containing magnetic ﬂux (a), and its equivalent magnetic circuit (b)
Since H= B/μand B=Φ/Ac, we can express F as
F= ℓ
μAc
Φ (10.23)
This equation is of the form
F=ΦR (10.24)
with
R= ℓ
μAc
(10.25)
Equation ( 10.24) resembles Ohm’s law. This equation states that the magnetic ﬂux through
an element is proportional to the MMF across the element. The constant of proportionality,
or the reluctance R, is analogous to the resistance R of an electrical conductor. Indeed, we
can construct a lumped-element magnetic circuit model that corresponds to Eq. ( 10.24), as in
Fig. 10.9b. In this magnetic circuit model, voltage and current are replaced by MMF and ﬂux,
while the element characteristic, Eq. (10.24), is represented by the analog of a resistor, having
reluctance R.
Complicated magnetic structures, composed of multiple windings and multiple heteroge-
neous elements such as cores and air gaps, can be represented using equivalent magnetic circuits.
These magnetic circuits can then be solved using conventional circuit analysis, to determine the
various ﬂuxes, MMFs, and terminal voltages and currents. Kirchhoﬀ’s laws apply to magnetic
circuits, and follow directly from Maxwell’s equations. The analog of Kirchhoﬀ’s current law
holds because the divergence of B is zero, and hence magnetic ﬂux lines are continuous and
cannot end. Therefore, any ﬂux line that enters a node must leave the node. As illustrated in
Fig. 10.10, the total ﬂux entering a node must be zero. The analog of Kirchho ﬀ’s voltage law
follows from Ampere’s law, Eq. (10.7). The left-hand-side integral in Eq. (10.7)i st h es u mo ft h e
MMFs across the reluctances around the closed path. The right-hand-side of Eq. ( 10.7) states
that currents in windings are sources of MMF. An n-turn winding carrying current i(t) can be
modeled as an MMF source, analogous to a voltage source, of value ni(t). When these MMF
sources are included, the total MMF around a closed path is zero.
Consider the inductor with air gap of Fig.10.11a. A closed path following the magnetic ﬁeld
lines is illustrated. This path passes through the core, of permeabilityμand lengthℓc, and across
the air gap, of permeabilityμ0 and lengthℓg. The cross-sectional areas of the core and air gap
are approximately equal. Application of Ampere’s law for this path leads to
Fc+ Fg= ni (10.26)

10.1 Review of Basic Magnetics 417
(a)
1
2
3
Node (b)
1
2
3
Node 1 = 2 + 3
Fig. 10.10 Kirchhoﬀ’s current law, applied to magnetic circuits: the net ﬂux entering a node must be
zero. (a) physical element, in which three legs of a core meet at a node; (b) magnetic circuit model
Fig. 10.11 Inductor with air gap example: (a) physical geometry; (b) magnetic circuit model
where Fc and Fg are the MMFs across the core and air gap, respectively. The core and air gap
characteristics can be modeled by reluctances as in Fig.10.9 and Eq. (10.25); the core reluctance
Rc and air gap reluctance Rg are given by
Rc= ℓc
μAc
Rg= ℓg
μ0Ac
(10.27)
A magnetic circuit corresponding to Eqs. (10.26) and (10.27) is given in Fig. 10.11b. The wind-
ing is a source of MMF, of value ni. The core and air gap reluctances are eﬀectively in series.
The solution of the magnetic circuit is
ni=Φ(Rc+ Rg) (10.28)
The ﬂuxΦ(t) passes through the winding, and so we can use Faraday’s law to write
v(t)= ndΦ(t)
dt (10.29)
Use of Eq. (10.28) to eliminateΦ(t) yields

418 10 Basic Magnetics Theory
Fig. 10.12 Eﬀe c to fa i rg a po nt h e
magnetic circuitΦvs. ni characteris-
tics. The air gap increases the current
Isat at the onset of core saturation
1
c + g
1
c
 = BAc
ni Hc
Bsat Ac
sat Ac
nIsat1 nIsat2
v(t)= n2
Rc+ Rg
di(t)
dt (10.30)
Therefore, the inductance L is
L= n2
Rc+ Rg
(10.31)
The air gap increases the total reluctance of the magnetic circuit, and decreases the inductance.
Air gaps are employed in practical inductors for two reasons. With no air gap ( Rg = 0),
the inductance is directly proportional to the core permeabilityμ. This quantity is dependent on
temperature and operating point, and is diﬃcult to control. Hence, it may be diﬃcult to construct
an inductor having a well-controlled value of L. Addition of an air gap having a reluctance Rg
greater than Rc causes the value of L in Eq. (10.31) to be insensitive to variations inμ.
Addition of an air gap also allows the inductor to operate at higher values of winding current
i(t) without saturation. The total ﬂuxΦis plotted vs. the winding MMF ni in Fig. 10.12. Since
Φis proportional to B, and when the core is not saturatedni is proportional to the magnetic ﬁeld
strength H in the core, Fig. 10.12 has the same shape as the core B–H characteristic. When the
core is not saturated,Φis related to ni according to the linear relationship of Eq. (10.28). When
the core saturates,Φis equal to
Φsat= BsatAc (10.32)
The winding current Isat at the onset of saturation is found by substitution of Eq. ( 10.32)
into (10.28):
Isat= BsatAc
n (Rc+ Rg) (10.33)
TheΦ-ni characteristics are plotted in Fig. 10.12 for two cases: (a) air gap present, and (b) no
air gap (Rg= 0). It can be seen that Isat is increased by addition of an air gap. Thus, the air gap
allows increase of the saturation current, at the expense of decreased inductance.
10.2 Transformer Modeling
Consider next the two-winding transformer of Fig. 10.13. The core has cross-sectional area Ac,
mean magnetic path lengthℓm, and permeabilityμ. An equivalent magnetic circuit is given in
Fig. 10.14. The core reluctance is

10.2 Transformer Modeling 419
Fig. 10.13 A two-winding trans-
former
Core
n1
turns
+
v1(t)
i1(t)
+
v2(t)
i2(t)
n2
turns
Fig. 10.14 Magnetic circuit that models the
two-winding transformer of Fig. 10.13
R= ℓm
μAc
(10.34)
Since there are two windings in this example, it is necessary to determine the relative polarities
of the MMF generators. Ampere’s law states that
Fc= n1i1+ n2i2 (10.35)
The MMF generators are additive, because the currents i1 and i2 pass in the same direction
through the core window. Solution of Fig.10.14 yields
ΦR= n1i1+ n2i2 (10.36)
This expression could also be obtained by substitution of Fc=ΦR into Eq. (10.35).
10.2.1 The Ideal Transformer
In the ideal transformer, the core reluctance R approaches zero. The causes the core MMF
Fc=ΦR also to approach zero. Equation (10.35) then becomes
0= n1i1+ n2i2 (10.37)
Also, by Faraday’s law, we have
v1= n1
dΦ
dt (10.38)
v2= n2
dΦ
dt
Note thatΦis the same in both equations above: the same total ﬂux links both windings. Elimi-
nation ofΦleads to

420 10 Basic Magnetics Theory
Ideal
n1 : n2
+
v1
+
v2
i1 i2
Fig. 10.15 Ideal transformer symbol
dΦ
dt = v1
n1
= v2
n2
(10.39)
Equations (10.37) and (10.39) are the equations of the ideal transformer:
v1
n1
= v2
n2
and n1i1+ n2i2= 0 (10.40)
The ideal transformer symbol of Fig. 10.15 is deﬁned by Eq. (10.40).
10.2.2 The Magnetizing Inductance
For the actual case in which the core reluctance R is nonzero, we have
ΦR= n1i1+ n2i2 with v1= n1
dΦ
dt (10.41)
Elimination ofΦyields
v1= n2
1
R
d
dt
[
i1+ n2
n1
i2
]
(10.42)
This equation is of the form
v1= LM
diM
dt (10.43)
where
LM = n2
1
R
iM = i1+ n2
n1
i2 (10.44)
are the magnetizing inductance and magnetizing current, referred to the primary winding. An
equivalent circuit is illustrated in Fig.10.16.
Figure 10.16 coincides with the transformer model introduced in Chap. 6. The magnetizing
inductance models the magnetization of the core material. It is a real, physical inductor, which
exhibits saturation and hysteresis. All physical transformers must contain a magnetizing induc-
tance. For example, suppose that we disconnect the secondary winding. We are then left with
a single winding on a magnetic core—an inductor. Indeed, the equivalent circuit of Fig. 10.16

10.2 Transformer Modeling 421
Fig. 10.16 Transformer model including magnetizing inductance
predicts this behavior, via the magnetizing inductance. The magnetizing current causes the ratio
of the winding currents to diﬀer from the turns ratio.
The transformer saturates when the core ﬂux density B(t) exceeds the saturation ﬂux den-
sity Bsat. When the transformer saturates, the magnetizing current iM(t) becomes large, the
impedance of the magnetizing inductance becomes small, and the transformer windings be-
come short circuits. It should be noted that large winding currentsi1(t) and i2(t) do not necessar-
ily cause saturation: if these currents obey Eq. (10.37), then the magnetizing current is zero and
there is no net magnetization of the core. Rather, saturation of a transformer is a function of the
applied volt-seconds. The magnetizing current is given by
iM(t)= 1
LM
∫
v1(t)dt (10.45)
Alternatively, Eq. (10.45) can be expressed in terms of the core ﬂux density B(t)a s
B(t)= 1
n1Ac
∫
v1(t)dt (10.46)
The ﬂux density and magnetizing current will become large enough to saturate the core when the
applied volt-secondsλ1 is too large, whereλ1 is deﬁned for a periodic ac voltage waveform as
λ1=
∫ t2
1
v1(t)dt (10.47)
The limits are chosen such that the integral is taken over the positive portion of the applied
periodic voltage waveform.
To ﬁx a saturating transformer, the ﬂux density should be decreased by increasing the num-
ber of turns, or by increasing the core cross-sectional areaAc. Adding an air gap has no eﬀect on
saturation of conventional transformers, since it does not modify Eq. (10.46). An air gap simply
makes the transformer less ideal, by decreasing LM and increasing iM(t) without changing B(t).
Saturation mechanisms in transformers diﬀer from those of inductors, because transformer satu-
ration is determined by the applied winding voltage waveforms, rather than the applied winding
currents.
10.2.3 Leakage Inductances
In practice, there is some ﬂux which links one winding but not the other, by “leaking” into the
air or by some other mechanism. As illustrated in Fig. 10.17, this ﬂux leads to leakage induc-

422 10 Basic Magnetics Theory
Fig. 10.17 Leakage ﬂux in a two-winding transformer: ( a) transformer geometry, (b) an equivalent sys-
tem
Fig. 10.18 Two-winding transformer equivalent circuit, including magnetizing inductance referred to
primary, and primary and secondary leakage inductances
tance, i.e., additional eﬀective inductances that are in series with the windings. A topologically
equivalent structure is illustrated in Fig. 10.17b, in which the leakage ﬂuxes Φℓ1 andΦℓ2 are
shown explicitly as separate inductors.
Figure 10.18 illustrates a transformer electrical equivalent circuit model, including series
inductors Lℓ1 and Lℓ2 which model the leakage inductances. These leakage inductances cause
the terminal voltage ratio v2(t)/v1(t)t od iﬀer from the ideal turns ratio n2/n1. In general, the
terminal equations of a two-winding transformer can be written

10.3 Loss Mechanisms in Magnetic Devices 423
[v1(t)
v2(t)
]
=
[L11 L12
L12 L22
]d
dt
[i1(t)
i2(t)
]
(10.48)
The quantity L12 is called the mutual inductance, and is given by
L12= n1n2
R = n2
n1
LM (10.49)
The quantities L11 and L22 are called the primary and secondary self-inductances, given by
L11= Lℓ1+ n1
n2
L12
L22= Lℓ2+ n2
n1
L12 (10.50)
Note that Eq. (10.48) does not explicitly identify the physical turns ratio n2/n1. Rather, Eq.
(10.48) expresses the transformer behavior as a function of electrical quantities alone. Equa-
tion (10.48) can be used, however, to deﬁne the eﬀective turns ratio
ne=
√
L22
L11
(10.51)
and the coupling coeﬃcient
k= L12
√L11L22
(10.52)
The coupling coeﬃcient k lies in the range 0 ≤k ≤1, and is a measure of the degree of
magnetic coupling between the primary and secondary windings. In a transformer with perfect
coupling, the leakage inductances Lℓ1 and Lℓ2 are zero. The coupling coeﬃcient k is then equal
to 1. Construction of low-voltage transformers having coupling coe ﬃcients in excess of 0.99
is quite feasible. When the coupling coeﬃcient is close to 1, then the eﬀective turns ratio ne is
approximately equal to the physical turns ratio n2/n1.
10.3 Loss Mechanisms in Magnetic Devices
10.3.1 Core Loss
Energy is required to eﬀect a change in the magnetization of a core material. Not all of this en-
ergy is recoverable in electrical form; a fraction is lost as heat. This power loss can be observed
electrically as hysteresis of the B–H loop.
Consider an n-turn inductor excited by periodic waveforms v(t) and i(t) having frequency f .
The net energy that ﬂows into the inductor over one cycle is
W=
∫
one cycle
v(t)i(t)dt (10.53)

424 10 Basic Magnetics Theory
We can relate this expression to the core B–H characteristic: substitute B(t)f o rv(t) using Fara-
day’s law, Eq. (10.13), and substitute H(t)f o ri(t) using Ampere’s law, i.e., Eq. (10.14):
W=
∫
one cycle
⎦
nAc
dB(t)
dt
)⎦H(t)ℓm
n
)
dt (10.54)
= (Acℓm)
∫
one cycle
Hd B
The term Acℓm is the volume of the core, while the integral is the area of the B–H loop:
(energy lost per cycle)= (core volume)(area of B−H loop) (10.55)
The hysteresis power loss PH is equal to the energy lost per cycle, multiplied by the excitation
frequency f :
PH = ( f )(Acℓm)
∫
one cycle
Hd B (10.56)
To the extent that the size of the hysteresis loop is independent of frequency, hysteresis loss
increases directly with operating frequency.
Flux
(t)
Core
i(t)
Eddy
current
Fig. 10.19 Eddy currents in an iron core
Magnetic core materials are iron alloys that,
unfortunately, are also good electrical conduc-
tors. As a result, ac magnetic ﬁelds can cause
electrical eddy currents to ﬂow within the core
material itself. An example is illustrated in
Fig. 10.19. The ac ﬂux Φ(t) passes through the
core. This induces eddy currents i(t) which, ac-
cording to Lenz’s law, ﬂow in paths that oppose
the time-varying ﬂuxΦ(t). These eddy currents
cause i
2R losses in the resistance of the core ma-
terial. The eddy current losses are especially sig-
niﬁcant in high-frequency applications.
According to Faraday’s law, the ac ﬂuxΦ(t) induces voltage in the core, which drives the
current around the paths illustrated in Fig. 10.19. Since the induced voltage is proportional to
the derivative of the ﬂux, the voltage magnitude increases directly with the excitation frequency
f . If the impedance of the core material is purely resistive and independent of frequency, then
the magnitude of the induced eddy currents also increases directly with f . This implies that
the i
2R eddy current losses should increase as f 2. In power ferrite materials, the core material
impedance magnitude actually decreases with increasing f . Over the useful frequency range,
the eddy current losses typically increase faster than f 2.
There is a basic tradeoﬀbetween saturation ﬂux density and core loss. Use of a high oper-
ating ﬂux density leads to reduced size, weight, and cost. Silicon steel and similar materials ex-
hibit saturation ﬂux densities of 1.5 to 2 T. Unfortunately, these core materials exhibit high core
loss. In particular, the low resistivity of these materials leads to high eddy current loss. Hence,
these materials are suitable for ﬁlter inductor and low-frequency transformer applications. The
core material is produced in laminations or thin ribbons, to reduce the eddy current magnitude.
Other ferrous alloys may contain molybdenum, cobalt, or other elements, and exhibit somewhat
lower core loss as well as somewhat lower saturation ﬂux densities.

10.3 Loss Mechanisms in Magnetic Devices 425
Iron alloys are also employed in powdered cores, containing ferromagnetic particles of suf-
ﬁciently small diameter such that eddy currents are small. These particles are bound together
using an insulating medium. Powdered iron and molybdenum permalloy powder cores exhibit
typical saturation ﬂux densities of 0.6 to 0.8 T, with core losses signiﬁcantly lower than lam-
inated ferrous alloy materials. The insulating medium behaves e ﬀectively as a distributed air
gap, and hence these cores have relatively low permeability. Powder cores ﬁnd application as
transformers at frequencies of several kHz, and as ﬁlter inductors in high frequency (100 kHz)
switching converters.
B, Tesla
0.01 0.1 0.3
Power loss density, Watts /cm3
0.01
0.1
1
20kHz
50kHz
100kHz
200kHz500kHz1MHz
Fig. 10.20 Typical core loss data for a high-frequency
power ferrite material. Power loss density is plotted vs.
peak ac ﬂux densityΔB, for sinusoidal excitation
Amorphous alloys exhibit low hys-
teresis loss. Core conductivity and eddy
current losses are somewhat lower than
ferrous alloys, but higher than ferrites.
Saturation ﬂux densities in the range 0.6
to 1.5 T are obtained.
Ferrite cores are ceramic materi-
als having low saturation ﬂux den-
sity, 0.25 to 0.5 T. Their resistivities
are much higher than other materi-
als, and hence eddy current losses are
much smaller. Manganese-zinc ferrite
cores ﬁnd widespread use as induc-
tors and transformers in converters hav-
ing switching frequencies of 10 kHz to
1 MHz. Nickel-zinc ferrite materials can
be employed at yet higher frequencies.
Figure 10.20 contains typical total
core loss data, for a certain ferrite ma-
terial. Power loss density, in Watts per
cubic centimeter of core material, is plot-
ted as a function of sinusoidal excitation
frequency f and peak ac ﬂux densityΔB.
At a given frequency, the core loss P
fe
can be approximated by an empirical function of the form
Pfe = Kfe (ΔB)β Acℓm (10.57)
The parameters Kfe and β are determined by ﬁtting Eq. (10.57) to the manufacturer’s published
data. Typical values of β for ferrite materials operating in their intended range ofΔB and f lie
in the range 2.6 to 2.8. The constant of proportionality Kfe increases rapidly with excitation
frequency f . The dependence of Kfe on f can also be approximated by empirical formulae that
are ﬁtted to the manufacturer’s published data; a fourth-order polynomial or a function of the
form Kfe 0 fξare sometimes employed for this purpose. Parameters in empirical formulae ﬁtted
to data measured under sinusoidal excitation can be used to improve prediction of ferrite core
loss with nonsinusoidal waveforms, as described in [96].

426 10 Basic Magnetics Theory
10.3.2 Low-Frequency Copper Loss
R
i(t)
Fig. 10.21 Winding
equivalent circuit that
models copper loss
Signiﬁcant loss also occurs in the resistance of the copper windings.
This is also a major determinant of the size of a magnetic device: if
copper loss and winding resistance were irrelevant, then inductor and
transformer elements could be made arbitrarily small by use of many
small turns of small wire.
Figure 10.21 contains an equivalent circuit of a winding, in which
element R models the winding resistance. The copper loss of the
winding is
P
cu= I2
rms R (10.58)
where Irms is the rms value of i(t). The dc resistance of the winding
conductor can be expressed as
R= ρℓb
Aw
(10.59)
where Aw is the wire bare cross-sectional area, and ℓb is the length
of the wire. The resistivity ρis equal to 1.724· 10−6Ω-cm for soft-
annealed copper at room temperature. This resistivity increases to 2.3· 10−6Ω-cm at 100◦C.
If a core has a mean length per turn given by MLT , then an n turn winding on this core will
have lengthℓb= nMLT . The resistance of this winding will be:
R= ρn(MLT )
Aw
(10.60)
Appendix B contains tables of the mean lengths per turn of standard ferrite core shapes, as
well as the areas of standard American wire gauges.
10.4 Eddy Currents in Winding Conductors
Eddy currents also cause power losses in winding conductors. This can lead to copper losses
signiﬁcantly in excess of the value predicted by Eqs. (10.58) and (10.59). The speciﬁc conductor
eddy current mechanisms are called the skin eﬀect and the proximity eﬀect. These mechanisms
are most pronounced in high-current conductors of multi-layer windings, particularly in high-
frequency converters.
10.4.1 Introduction to the Skin and Proximity Eﬀects
Figure 10.22a illustrates a currenti(t) ﬂowing through a solitary conductor. This current induces
magnetic ﬂuxΦ(t), whose ﬂux lines follow circular paths around the current as shown. Accord-
ing to Lenz’s law, the ac ﬂux in the conductor induces eddy currents, which ﬂow in a manner
that tends to oppose the ac ﬂux Φ(t). Figure 10.22b illustrates the paths of the eddy currents.
It can be seen that the eddy currents tend to reduce the net current density in the center of the
conductor, and increase the net current density near the surface of the conductor.
The current distribution within the conductor can be found by solution of Maxwell’s equa-
tions. For a sinusoidal currenti(t) of frequency f , the result is that the current density is greatest

10.4 Eddy Currents in Winding Conductors 427
(a)
i(t)
Wire
(t)
Eddy
currents
(b)
i(t)
Wire
Eddy
currents
Current
density
Fig. 10.22 The skin eﬀect: (a) current i(t) induces ﬂux Φ(t), which in turn induces eddy currents in
conductor; (b) the eddy currents tend to oppose the current i(t) in the center of the wire, and increase the
current on the surface of the wire
Frequency
100 C
25 C
#20 AWG
Wire diameter
#30 AWG
#40 AWG
Penetration
depth , cm
0.001
0.01
0.1
zHM1zHk001zHk01
Fig. 10.23 Penetration depthδ, as a function of frequency f , for copper wire
at the surface of the conductor. The current density is an exponentially decaying function of
distance into the conductor, with characteristic length δ known as the penetration depth or skin
depth. The penetration depth is given by
δ=
√ ρ
πμ f (10.61)
For a copper conductor, the permeability μis equal to μ0, and the resistivity ρis given in
Sect. 10.3.2. At 100◦C, the penetration depth of a copper conductor is
δ= 7.5√
f
cm (10.62)
with f expressed in Hz. The penetration depth of copper conductors is plotted in Fig. 10.23,a s
a function of frequency f . For comparison, the wire diameters d of standard American Wire

428 10 Basic Magnetics Theory
Gauge (AWG) conductors are also listed. It can be seen that d/δ= 1 for AWG #40 at approxi-
mately 500 kHz, while d/δ= 1 for AWG #22 at approximately 10 kHz.
T h es k i neﬀect causes the resistance and copper loss of solitary large-diameter wires to
increase at high frequency. High-frequency currents do not penetrate to the center of the con-
ductor. The current crowds at the surface of the wire, the inside of the wire is not utilized, and
the eﬀective wire cross-sectional area is reduced. However, the skin eﬀect alone is not suﬃcient
to explain the increased high-frequency copper losses observed in multiple-layer transformer
windings.
i
Current
density J
h
Area
i
AreaArea
i Conductor 1
Conductor 2
Fig. 10.24 The proximity eﬀect in adja-
cent copper foil conductors. Conductor 1
carries current i(t). Conductor 2 is open-
circuited
A conductor that carries a high-frequency current
i(t) induces copper loss in an adjacent conductor by
a phenomenon known as the proximity eﬀect.F i g -
ure 10.24 illustrates two copper foil conductors that are
placed in close proximity to each other. Conductor 1
carries a high-frequency sinusoidal current i(t), whose
penetration depth δ is much smaller than the thickness
h of conductors 1 or 2. Conductor 2 is open-circuited,
so that it carries a net current of zero. However, it is
possible for eddy currents to be induced in conductor
2 by the current i(t) ﬂowing in conductor 1.
The current i(t) ﬂowing in conductor 1 generates
a ﬂuxΦ(t) in the space between conductors 1 and 2;
this ﬂux attempts to penetrate conductor 2. By Lenz’s
law, a current is induced on the adjacent (left) side of
conductor 2, which tends to oppose the ﬂux Φ(t). If
the conductors are closely spaced, and if h≫ δ, then
the induced current will be equal and opposite to the
current i(t), as illustrated in Fig. 10.24.
Since conductor 2 is open-circuited, the net current
in conductor 2 must be zero. Therefore, a current +i(t) ﬂows on the right-side surface of con-
ductor 2. So the current ﬂowing in conductor 1 induces a current that circulates on the surfaces
of conductor 2.
Figure 10.25 illustrates the proximity eﬀect in a simple transformer winding. The primary
winding consists of three series-connected turns of copper foil, having thickness h≫ δ, and
carrying net current i(t). The copper foil is a strip of copper whose width is the same as the
height of the core window; this strip is wound around a leg of the core. Consequently, each
turn of this foil comprises one layer of the winding, as illustrated in Fig.10.25b. The secondary
winding is identical; to the extent that the magnetizing current is small, the secondary turns
carry net current−i(t). The windings pass through the window of a magnetic core; the magnetic
core material encloses the mutual ﬂux of the transformer.
The high-frequency sinusoidal current i(t) ﬂows on the right surface of primary layer 1,
adjacent to layer 2. This induces a copper loss in layer 1, which can be calculated as follows.
Let R
dc be the dc resistance of layer 1, given by Eq. ( 10.59), and let I be the rms value of
i(t). The skin eﬀect causes the copper loss in layer 1 to be equal to the loss in a conductor of
thickness δ with uniform current density. This reduction of the conductor thickness from h to δ
eﬀectively increases the resistance by the same factor. Hence, layer 1 can be viewed as having
an “ac resistance” given by
```
