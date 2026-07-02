---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第10章part 3 - 10 Basic Magnetics Theory
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 458-467 > Chunk ID: `chapter-10-part-3`"
---

# 第10章part 3 - 10 Basic Magnetics Theory

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 458-467  
> Chunk ID: `chapter-10-part-3`

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
10.5 Several Types of Magnetic Devices, Their B–H Loops, and Core vs. Copper Loss 449
Fig. 10.48 Coupled inductor minor
B–H loop
B
Hc0
Hc
Hc
coupled inductor
large excitation
B
10.5.5 Flyback Transformer
As discussed in Chap. 6, the ﬂyback transformer functions as an inductor with two windings.
The primary winding is used during the transistor conduction interval, and the secondary is used
during the diode conduction interval. A ﬂyback converter is illustrated in Fig. 10.49a, with the
ﬂyback transformer modeled as a magnetizing inductance in parallel with an ideal transformer.
The magnetizing current iM(t) is proportional to the core magnetic ﬁeld strength Hc(t). Typical
DCM waveforms are given in Fig.10.49b.
Since the ﬂyback transformer stores energy, an air gap is needed. Core loss depends on
the magnitude of the ac component of the magnetizing current. TheB–H loop for discontinuous
conduction mode operation is illustrated in Fig.10.50. When the converter is designed to operate
in DCM, the core loss is signiﬁcant. The peak ac ﬂux densityΔB is then chosen to maintain an
acceptably low core loss. For CCM operation, core loss is less signiﬁcant, and the maximum
ﬂux density may be limited only by saturation of the core. In either case, winding proximity
losses are typically quite signiﬁcant. Unfortunately, interleaving the windings has little impact
on the proximity loss because the primary and secondary winding currents are out of phase.
(a)
+
LM
+
v
vg
n1 : n2
iMi1 i2
(b) i1(t) i1,pk
i2(t)
tiM(t)
t
i1,pk
Fig. 10.49 Flyback transformer: (a) converter schematic, with transformer equivalent circuit; (b)D C M
current waveforms

450 10 Basic Magnetics Theory
Fig. 10.50 Operational B–H loop of a
DCM ﬂyback transformer
10.6 Summary of Key Points
1. Magnetic devices can be modeled using lumped-element magnetic circuits, in a manner
similar to that commonly used to model electrical circuits. The magnetic analogs of electri-
cal voltage V, current I, and resistance R are magnetomotive force (MMF) F , ﬂuxΦ, and
reluctance R, respectively.
2. Faraday’s law relates the voltage induced in a loop of wire to the derivative of ﬂux passing
through the interior of the loop.
3. Ampere’s law relates the total MMF around a loop to the total current passing through the
center of the loop. Ampere’s law implies that winding currents are sources of MMF, and
that when these sources are included, then the net MMF around a closed path is equal to
zero.
4. Magnetic core materials exhibit hysteresis and saturation. A core material saturates when
the ﬂux density B reaches the saturation ﬂux density B
sat.
5. Air gaps are employed in inductors to prevent saturation when a given maximum current
ﬂows in the winding, and to stabilize the value of inductance. The inductor with air gap
can be analyzed using a simple magnetic equivalent circuit, containing core and air gap
reluctances and a source representing the winding MMF.
6. Conventional transformers can be modeled using sources representing the MMFs of each
winding, and the core MMF. The core reluctance approaches zero in an ideal transformer.
Nonzero core reluctance leads to an electrical transformer model containing a magnetizing
inductance, eﬀectively in parallel with the ideal transformer. Flux that does not link both
windings, or “leakage ﬂux,” can be modeled using series inductors.
7. The conventional transformer saturates when the applied winding volt-seconds are too large.
Addition of an air gap has no eﬀect on saturation. Saturation can be prevented by increasing
the core cross-sectional area, or by increasing the number of primary turns.
8. Magnetic materials exhibit core loss, due to hysteresis of the B–H loop and to induced eddy
currents ﬂowing in the core material. In available core materials, there is a tradeoﬀbetween
high saturation ﬂux density B
sat and high core loss Pfe . Laminated iron alloy cores exhibit
the highest Bsat but also the highest Pfe , while ferrite cores exhibit the lowest Pfe but also
the lowest Bsat. Between these two extremes are powdered iron alloy and amorphous alloy
materials.
9. The skin and proximity eﬀects lead to eddy currents in winding conductors, which increase
the copper loss Pcu in high-current high-frequency magnetic devices. When a conductor has

10.6 Summary of Key Points 451
thickness approaching or larger than the penetration depth δ, magnetic ﬁelds in the vicinity
of the conductor induce eddy currents in the conductor. According to Lenz’s law, these eddy
currents ﬂow in paths that tend to oppose the applied magnetic ﬁelds.
10. The magnetic ﬁeld strengths in the vicinity of the winding conductors can be determined by
use of MMF diagrams. These diagrams are constructed by application of Ampere’s law, fol-
lowing the closed paths of the magnetic ﬁeld lines which pass near the winding conductors.
Multiple-layer noninterleaved windings can exhibit high maximum MMFs, with resulting
high eddy currents and high copper loss.
11. An expression for the copper loss in a layer, as a function of the magnetic ﬁeld strengths
or MMFs surrounding the layer, is given in Sect. 10.4.4. This expression can be used in
conjunction with the MMF diagram, to compute the copper loss in each layer of a winding.
The results can then be summed, yielding the total winding copper loss. When the eﬀective
layer thickness is near to or greater than one skin depth, the copper losses of multiple-layer
noninterleaved windings are greatly increased.
12. Pulse-width modulated winding currents contain signiﬁcant total harmonic distortion; this
can lead to a further increase of copper loss. The increase in proximity loss caused by
current harmonics is most pronounced in multiple-layer noninterleaved windings, with an
eﬀective layer thickness near one skin depth.
Problems
10.1 The core illustrated in Fig. 10.51a is 1 cm thick. All legs are 1 cm wide, except for the
right-hand side vertical leg, which is 0.5 cm wide. You may neglect nonuniformities in
the ﬂux distribution caused by turning comers.
(a)
Core relative permeability μr = 1000
n1 = 10
3 cm 3 cm
3c m
3c m
0.5 cm
1c m
1c m
i1
n1 turns
3c m
3c m
(b)
n1 = 10
i1
n1 turns
n2 = 20
i2
n2 turns
Fig. 10.51 Problem 10.1
(a) Determine the magnetic circuit model of this device, and label the values of all re-
luctances in your model.
(b) Determine the inductance of the winding.
A second winding is added to the same core, as shown in Fig. 10.51b.
(c) Modify your model of part (a) to include this winding.

452 10 Basic Magnetics Theory
(d) The electrical equations for this circuit may be written in the form
[v1
v2
]
=
[L11 L12
L12 L22
]d
dt
[i1
i2
]
Use superposition to determine analytical expressions and numerical values for L11,
L12, and L22.
10.2 Two windings are placed as illustrated in Fig.10.52a on a core of uniform cross-sectional
area Ac = 1c m2. Each winding has 50 turns. The relative permeability of the core is
μr= 104.
Fig. 10.52 Problem 10.2
(a)
5 cm
5 cm
5 cm
i2+
v2
i1+
v1
(b)
L+
(c)
L
(a) Sketch an equivalent magnetic circuit, and determine numerical values for each reluc-
tance.
(b) Determine the self-inductance of each winding.
(c) Determine the inductance L+ obtained when the windings are connected in series as
in Fig. 10.52b.
(d) Determine the inductance L−obtained when the windings are connected in anti-series
as in Fig. 10.52c.
10.3 All three legs of the magnetic device illustrated in Fig. 10.53 are of uniform cross-
sectional area AC. Legs 1 and 2 each have magnetic path length 3 ℓ, while leg 3 has
magnetic path lengthℓ. Both windings have n turns. The core has permeabilityμ≫μ0.
Fig. 10.53 Magnetic core for
Problem 10.3
i2
+
v2
i1
+
v1
Leg
1
Leg
3
Leg
2

10.6 Summary of Key Points 453
(a) Sketch a magnetic equivalent circuit, and give analytical expressions for all element
values. A voltage source is connected to winding 1, such that v1(t) is a square wave
of peak value Vmax and period Ts. Winding 2 is open-circuited.
(b) Sketch i1(t) and label its peak value.
(c) Find the ﬂuxϕ2(t) in leg 2. Sketchϕ2(t) and label its peak value.
(d) Sketch v2(t) and label its peak value.
10.4 The magnetic device illustrated in Fig. 10.54a consists of two windings, which can re-
place the two inductors in a ´Cuk, SEPIC, or other similar converter. For this problem, all
three legs have the same uniform cross-sectional area Ac. The legs have gaps of lengths
g1, g2, and g3, respectively. The core permeabilityμis very large. You may neglect fring-
ing ﬂux. Legs 1 and 2 have windings containing n1 and n2 turns, respectively.
(a) i2
+
v2
i1
+
v1
n1
turns
n2
turns
Gap
length
g1
g3
Gap
length
g
2
(b)
+ R V
+
Vg
i1 i2
n1
turns
n2
turns
Fig. 10.54 Magnetic core and converter for Problem 10.4
(a) Derive a magnetic circuit model for this device, and give analytical expressions for
each reluctance in your model. Label the polarities of the MMF generators.
(b) Write the electrical terminal equations of this device in the matrix form
[v1
v2
]
=
[L11 L12
L12 L22
]d
dt
[i1
i2
]
and derive analytical expressions for L11, L12, and L22.
(c) Derive an electrical circuit model for this device, and give analytical expressions
for the turns ratio and each inductance in your model, in terms of the turns and
reluctances of part (a).
This single magnetic device is to be used to realize the two inductors of the ´Cuk
converter, as in Fig.10.54b.

454 10 Basic Magnetics Theory
(d) Sketch the voltage waveforms v1(t) and v2(t), making the linear-ripple approxima-
tion as appropriate. You may assume that the converter operates in the continuous
conduction mode.
(e) The voltage waveforms of part (d) are applied to your model of parts (b) and (c).
Solve your model to determine the slopes of the inductor current ripples during in-
tervals DTs and D′Ts. Sketch the steady-state inductor current waveforms i1(t) and
i2(t), and label all slopes.
(f) By skillful choice of n1/n2 and the air gap lengths, it is possible to make the induc-
tor current rippleΔi in either i1(t)o r i2(t) go to zero. Determine the conditions on
n1/n2, g1, g2, and g3 that cause the current ripple in i2(t) to become zero. Sketch the
resulting i1(t) and i2(t), and label all slopes.
It is possible to couple the inductors in this manner, and cause one of the inductor cur-
rent ripples to go to zero, in any converter in which the inductor voltage waveforms are
proportional.
10.5 Over its usable operating range, a certain permanent magnet material has the B–H char-
acteristics illustrated by the solid line in Fig. 10.55. The magnet has lengthℓm = 0.5c m ,
and cross-sectional area 4 cm2. Bm = 1 T. Derive an equivalent magnetic circuit model
for the magnet, and label the numerical values of the elements.
Fig. 10.55 B–H characteristic of the per-
manent magnet material for Problem 10.5
B
H
μ = 1.06 μ0
Bm
10.6 The two-transistor forward converter of Fig. 6.29 operates with Vg = 300 V, V= 28 V,
switching frequency fs = 100 kHz, and turns ratio n = 0.25. The dc load power is
250 W. The transformer uses an EC41 ferrite core; relevant data for this core is listed
in Appendix B. The core loss is given by Fig. 10.20. The primary winding consists of
44 turns of #21 AWG wire, and the secondary winding is composed of 11 turns of #15
AWG wire. Data regarding the American wire gauge is also listed in AppendixB. For this
problem, you may assume that ΔB= Bmax/2, and you may neglect skin and proximity
losses. You may assume that the magnetizing current and the output ﬁlter inductor current
are very small.
(a) Estimate the core loss of this transformer
(b) Determine the copper loss of this transformer. You may neglect proximity losses.
10.7 The two-transistor forward converter of Fig. 6.29 operates in CCM with Vg = 300 V,
V = 28 V, switching frequency fs = 100 kHz, and turns ratio n= 0.25. The dc load
power is 250 W. The transformer uses an EC41 ferrite core; relevant data for this core is
listed in Appendix B. This core has window heightℓw = 2.78 cm. The primary winding
consists of 44 turns of #24 AWG wire, and the secondary winding is composed of 11
turns of #14 AWG wire. Each winding comprises one layer. Data regarding the American
wire gauge is also listed in Appendix B. The winding operates at room temperature.

10.6 Summary of Key Points 455
(a) Determine the primary and secondary copper losses induced by the dc components
of the winding currents.
(b) Determine the primary and secondary copper losses induced by the fundamental
components of the winding currents.
(c) Determine the primary and secondary copper losses induced by the second harmonic
components of the winding currents.
10.8 The winding currents of the transformer in a high-voltage inverter are essentially sinu-
soidal, with negligible harmonics and no dc components. The primary winding consists
of one layer containing 10 turns of round copper wire. The secondary winding consists
of 250 turns of round copper wire, arranged in ten layers. The operating frequency is
f= 50 kHz, and the winding porosity is 0.8. Determine the primary and secondary wire
diameters and wire gauges that minimize the total copper loss.
10.9 A certain three-winding transformer contains one primary and two secondaries. The oper-
ating frequency is 40 kHz. The primary winding contains a total of 60 turns of #26 AWG,
arranged in three layers. The secondary windings each consist of ﬁve turns of copper
foil, one turn per layer. The foil thickness is 0.25 mm. The primary layers have porosity
0.8, while the secondary layer porosity is 1. The primary winding carries a sinusoidal
current having rms value I, while each secondary carries rms current 6 I. The windings
are not interleaved: the primary winding is closest to the center leg of the core, followed
by secondary winding #1, followed by secondary winding #2.
(a) Sketch an MMF diagram illustrating the magnetic ﬁelds in the vicinity of each wind-
ing layer.
(b) Determine the increased copper loss, due to the proximity eﬀect, in each layer.
(c) Determine the ratio of copper loss to dc copper loss, F
R, for the entire transformer
windings.
(d) In this application, it is not feasible to interleave the primary winding with the other
windings. However, changing the conductor size is permissible. Discuss how the
windings could be better optimized.
10.10 A transformer winding contains a four-layer primary winding, and two two-layer sec-
ondary windings. Each layer of the primary winding carries total current I. Each layer
of secondary winding #1 carries total current 1.5I. Each layer of secondary winding #2
carries total current 0.5I. All currents are sinusoidal. The e ﬀective relative conductor
thickness is ϕ= 2. The windings are partially interleaved, in the following order: two
primary layers, followed by both layers of secondary #1, followed by both layers of sec-
ondary #2, and ﬁnally the two remaining primary layers. You may assume that the core
has negligible reluctance.
(a) Sketch an MMF diagram for this winding arrangement.
(b) Each primary layer has dc resistance R
dc−p, and each secondary layer has dc resis-
tance Rdc−s. Determine the increased copper loss, due to the proximity e ﬀect, for
each layer.
(c) Determine the increase in total transformer copper loss, due to the proximity eﬀect.
10.11 A transformer is connected to a voltage source and a load as illustrated in Fig. 10.56.
The primary winding is excited by the voltage v1(t) whose waveform is illustrated in
Fig. 10.57. The switching frequency is fs = 1/Ts = 200 kHz, and the duty cycle is
D= 1/3. The load current is a 200 kHz sinusoid having amplitude 5 A rms.

456 10 Basic Magnetics Theory
Fig. 10.56 Transformer circuit of
Problem 10.11 +
n1:n2
v1(t daol)
Fig. 10.57 Primary volt-
age waveform v1(t) for Prob-
lem 10.11 t
v1(t) +24 V
TsDTs
The transformer consists of a ferrite PQ 26/25 core, with ﬂat copper (ribbon) windings.
The primary winding consists of two turns of ﬂat copper of rectangular cross-section,
with a copper width of 1.25 cm and a copper thickness of 0.07 cm. The secondary wind-
ing consists of eight turns of ﬂat copper also of rectangular cross-section, with a copper
width of 1.25 cm and a copper thickness of 0.017 cm. Each turn comprises one layer in
the winding. You may assume that the transformer operates at a temperature of 100 ◦C.
The core loss data for this core operating at 200 kHz is plotted in Fig. 10.58.
Fig. 10.58 Core loss vs. peak ac
ﬂux density for Problem 10.11
ΔB, Tesla
0.01 0.1 0.3
Power loss density, Watts/cm3
0.01
0.1
1
200kHz
The primary and secondary windings are interleaved as follows:
•Three layers of secondary
•One layer of primary
•Two layers of secondary

10.6 Summary of Key Points 457
•One layer of primary
•Three layers of secondary
(a) Find the peak ac ﬂux density ΔB and the core loss Pfe for this transformer.
(b) Find the dc resistance Rdc andϕfor each layer.
(c) Sketch the MMF diagram for this transformer, and ﬁnd the eﬀective m for each layer.
(d) Compute the total power loss in each layer, and the total transformer loss, in Watts.
10.12 The windings in the transformer shown in Fig.10.59 are realized using copper foil layers
arranged as shown in Fig.10.60. The primary has two turns, each consisting of a layer of
copper foil carrying high-frequency sinusoidal current 2 i. The secondary has four turns,
Fig. 10.59 Transformer of Prob-
lem 10.12
2:4
primary secondary
2 i i
pri1 pri2sec1 sec2 sec3 sec4
Core
MMF
F(x)
x
Fig. 10.60 MMF diagram for a simple transformer with interleaved windings. Each layer operates with
m= 1

458 10 Basic Magnetics Theory
each consisting of a layer of copper foil carrying current i. The foil thickness is much
greater than the penetration depthδ, i.e., ϕ≫ 1. The windings are partially interleaved
as illustrated in Fig. 10.60. The copper loss due to a current i through a copper layer of
thicknessδis equal to P.
(a) Sketch the current distribution in the layers, and the MMF diagram for this winding
arrangement.
(b) Find the total copper loss in the transformer, in terms of P.
(c) It is desired to rearrange the winding layers to minimize the total copper loss. Sketch
how the layers should be arranged, sketch the corresponding MMF diagram, and
compute the total loss in terms of P.
10.13 A single-output forward converter contains a transformer having a noninterleaved sec-
ondary winding with four layers. The converter operates at D= 0.3i nC C M ,w i t ha
secondary winding current waveform similar to Fig.10.38.
(a) Estimate the value ofϕ
1 that minimizes the secondary winding copper losses.
(b) Determine the resulting secondary copper loss, relative to I2
rms Rdc.
10.14 A schematic diagram and waveforms of the isolated SEPIC, operating in CCM, are given
in Figs. 6.39 and 6.40.
(a) Do you expect the SEPIC transformer to contain an air gap? Why or why not?
(b) Sketch the SEPIC transformer B–H loop, for CCM operation.
(c) For CCM operation, do you expect core loss to be signiﬁcant? Explain your reason-
ing.
(d) For CCM operation, do you expect winding proximity losses to be signiﬁcant? Ex-
plain your reasoning.
```
