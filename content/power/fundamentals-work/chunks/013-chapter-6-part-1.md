---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第6章part 1 - 6 Converter Circuits
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 177-196 > Chunk ID: `chapter-6-part-1`"
---

# 第6章part 1 - 6 Converter Circuits

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 177-196  
> Chunk ID: `chapter-6-part-1`

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
6
Converter Circuits
We have already analyzed the operation of a number of diﬀerent types of converters: buck, boost,
buck–boost, ´Cuk, voltage-source inverter, etc. With these converters, a number of diﬀerent func-
tions can be performed: step-down of voltage, step-up, inversion of polarity, and conversion of
dc to ac or vice-versa.
It is natural to ask: Where do these converters come from? What other converters occur,
and what other functions can be obtained? What are the basic relations between converters?
In this chapter, several diﬀerent circuit manipulations are explored, which explain the origins
of the basic converters. Inversion of source and load transforms the buck converter into the
boost converter. Cascade connection of converters, and simpliﬁcation of the resulting circuit,
shows how the buck–boost and ´Cuk converters are based on the buck and the boost converters.
Diﬀerential connection of the load between the outputs of two or more converters leads to a
single-phase or polyphase inverter. A short list of some of the better known converter circuits
follows this discussion.
Transformer-isolated dc–dc converters are also covered in this chapter. Use of a transformer
allows isolation and multiple outputs to be obtained in a dc–dc converter, and can lead to better
converter optimization when a very large or very small conversion ratio is required. The trans-
former is modeled as a magnetizing inductance in parallel with an ideal transformer; this allows
the analysis techniques of the previous chapters to be extended to cover converters containing
transformers. A number of well-known isolated converters, based on the buck, boost, buck–
boost, single-ended primary inductance converter (SEPIC), and ´Cuk, are listed and discussed.
Finally, the evaluation, selection, and design of converters to meet given requirements
are considered. Important performance-related attributes of transformer-isolated converters in-
clude: whether the transformer reset process imposes excessive voltage stress on the transis-
tors, whether the converter can supply a high-current output without imposing excessive current
stresses on the secondary-side components, and whether the converter can be well-optimized
to operate with a wide range of operating points, that is, with large tolerances in Vg and Pload.
Switch utilization is a simpliﬁed ﬁgure-of-merit that measures the ratio of the converter output
power to the total transistor voltage and current stress. As the switch utilization increases, the
converter eﬃciency increases while its cost decreases. Isolated converters with large variations
in operating point tend to utilize their power devices more poorly than nonisolated converters
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_6
163

164 6 Converter Circuits
which function at a single operating point. Computer spreadsheets are a good tool for optimiza-
tion of power-stage designs and for trade studies to select a converter topology for a given
application.
6.1 Circuit Manipulations
The buck converter (Fig. 6.1) was developed in Chap. 1 using basic principles. The switch re-
duces the voltage dc component, and the low-pass ﬁlter removes the switching harmonics. In
the continuous conduction mode, the buck converter has a conversion ratio ofM= D. The buck
converter is the simplest and most basic circuit, from which we will derive other converters.
Fig. 6.1 The basic buck converter
+
L
CR
+
V
1
2
Vg
6.1.1 Inversion of Source and Load
Let us consider ﬁrst what happens when we interchange the power input and power output ports
of a converter. In the buck converter of Fig.6.2a, voltage V1 is applied at port 1, and voltage V2
appears at port 2. We know that
V2= DV1 (6.1)
This equation can be derived using the principle of inductor volt-second balance, with the as-
sumption that the converter operates in the continuous conduction mode. Provided that the
switch is realized such that this assumption holds, then Eq. ( 6.1) is true regardless of the di-
rection of power ﬂow.
So let us interchange the power source and load, as in Fig. 6.2b. The load, bypassed by the
capacitor, is connected to converter port 1, while the power source is connected to converter
port 2. Power now ﬂows in the opposite direction through the converter. Equation ( 6.1)m u s t
still hold; by solving for the load voltage V1, one obtains
V1= 1
DV2 (6.2)
So the load voltage is greater than the source voltage. Figure 6.2b is a boost converter, drawn
backwards. Equation (6.2) nearly coincides with the familiar boost converter result, M(D)=
1/D′, except that D′ is replaced by D.
Since power ﬂows in the opposite direction, the standard buck converter unidirectional
switch realization cannot be used with the circuit of Fig. 6.2b. By following the discussion of
Chap. 4, one ﬁnds that the switch can be realized by connecting a transistor between the induc-
tor and ground, and a diode from the inductor to the load, as shown in Fig.6.2c. In consequence,

6.1 Circuit Manipulations 165
Fig. 6.2 Inversion of source
and load transforms a buck
converter into a boost con-
verter: (a) buck converter, (b)
inversion of source and load,
(c) realization of switch
(a) Port 1 Port 2
+
L1
2
+
V1
+
V2
Power flow
(b) Port 1 Port 2
+
L1
2
+
V1
+
V2
Power flow
(c) Port 1 Port 2
+
L
+
V1
+
V2
Power flow
the transistor duty cycle D becomes the fraction of time which the single-pole double-throw
(SPDT) switch of Fig. 6.2b spends in position 2, rather than in position 1. So we should in-
terchange D with its complement D′ in Eq. (6.2), and the conversion ratio of the converter of
Fig. 6.2ci s
V1= 1
D′ V2 (6.3)
Thus, the boost converter can be viewed as a buck converter having the source and load con-
nections exchanged, and in which the switch is realized in a manner that allows reversal of the
direction of power ﬂow.

166 6 Converter Circuits
+
Converter 2Converter 1
Vg
+
V1
+
V
D
V1
Vg
= M1(D) V
V1
= M2(D)
Fig. 6.3 Cascade connection of converters
6.1.2 Cascade Connection of Converters
Converters can also be connected in cascade, as illustrated in Fig. 6.3 [15, 44]. Converter 1 has
conversion ratio M1(D), such that its output voltage V1 is
V1= M1(D)Vg (6.4)
This voltage is applied to the input of the second converter. Let us assume that converter 2 is
driven with the same duty cycle D applied to converter 1. If converter 2 has conversion ratio
M2(D), then the output voltage V is
V= M2(D)V1 (6.5)
Substitution of Eq. (6.4) into Eq. (6.5) yields
V
Vg
= M(D)= M1(D)M2(D) (6.6)
Hence, the conversion ratio M(D) of the composite converter is the product of the individual
conversion ratios M1(D) and M2(D).
Let us consider the case where converter 1 is a buck converter, and converter 2 is a boost
converter. The resulting circuit is illustrated in Fig.6.4. The buck converter has conversion ratio
V1
Vg
= D (6.7)
The boost converter has conversion ratio
V
V1
= 1
1−D (6.8)
So the composite conversion ratio is
V
Vg
= D
1−D (6.9)
The composite converter has a noninverting buck–boost conversion ratio. The voltage is reduced
when D< 0.5, and increased when D> 0.5.

6.1 Circuit Manipulations 167
The circuit of Fig. 6.4 can be simpliﬁed considerably. Note that inductors L1 and L2, along
with capacitor C1, form a three-pole low-pass ﬁlter. The conversion ratio does not depend on
the number of poles present in the low-pass ﬁlter, and so the same steady-state output voltage
should be obtained when a simpler low-pass ﬁlter is used. In Fig.6.5a, capacitor C1 is removed.
Inductors L1 and L2 are now in series, and can be combined into a single inductor as shown
in Fig. 6.5b. This converter, the noninverting buck–boost converter, continues to exhibit the
conversion ratio given in Eq. (6.9).
The switches of the converter of Fig.6.5b can also be simpliﬁed, leading to a negative output
voltage. When the switches are in position 1, the converter reduces to Fig.6.6a. The inductor is
connected to the input sourceVg, and energy is transferred from the source to the inductor. When
the switches are in position 2, the converter reduces to Fig.6.6b. The inductor is then connected
to the load, and energy is transferred from the inductor to the load. To obtain a negative output,
we can simply reverse the polarity of the inductor during one of the subintervals (say, while
+
1
2
L1
C1
+
V1 R
+
V
1
2L2
C2
{
{
Buck converter Boost converter
Vg
Fig. 6.4 Cascade connection of buck converter and boost converter
(a)
+
1
2
L1
R
+
V
1
2L2
C2Vg
(b)
+
V
1
2L
+
1
2
iL
Vg
Fig. 6.5 Simpliﬁcation of the cascaded buck and boost converter circuit of Fig. 6.4:( a) removal of ca-
pacitor C1,( b) combining of inductors L1 and L2

168 6 Converter Circuits
(a)
+
+
VVg
iL
(b)
+
+
V
Vg
iL
Fig. 6.6 Connections of the circuit of Fig. 6.5b: (a) while the switches are in position 1, ( b) while the
switches are in position 2
(a)
+
+
VVg
iL
(b)
+
+
V
Vg
iL
Fig. 6.7 Reversal of the output voltage polarity, by reversing the inductor connections while the switches
are in position 2: ( a) connections with the switches in position 1, ( b) connections with the switches in
position 2
the switches are in position 2). The individual circuits of Fig. 6.7 are then obtained, and the
conversion ratio becomes V
Vg
=−D
1−D (6.10)
Note that one side of the inductor is now always connected to ground, while the other side is
switched between the input source and the load. Hence only one SPDT switch is needed, and the
converter circuit of Fig.6.8 is obtained. Figure6.8 is recognized as the conventional buck–boost
converter.
Thus, the buck–boost converter can be viewed as a cascade connection of buck and boost
converters. The properties of the buck–boost converter are consistent with this viewpoint. In-
deed, the equivalent circuit model of the buck–boost converter contains a 1: D (buck) dc trans-
former, followed by a D′ : 1 (boost) dc transformer. The buck–boost converter inherits the
pulsating input current of the buck converter, and the pulsating output current of the boost con-
verter.
Other converters can be derived by cascade connections. The ´Cuk converter (Fig.2.20)w a s
originally derived [ 15, 44] by cascading a boost converter (converter 1), followed by a buck
(converter 2). A negative output voltage is obtained by reversing the polarity of the internal
Fig. 6.8 Converter circuit obtained
from the subcircuits of Fig. 6.7 +
+
V
12
Vg
iL

6.1 Circuit Manipulations 169
capacitor connection during one of the subintervals; as in the buck–boost converter, this opera-
tion has the additional beneﬁt of reducing the number of switches. The equivalent circuit model
of the ´Cuk converter contains a D′:1 (boost) ideal dc transformer, followed by a 1: D (buck)
ideal dc transformer. The ´Cuk converter inherits the nonpulsating input current property of the
boost converter, and the nonpulsating output current property of the buck converter.
6.1.3 Rotation of Three-Terminal Cell
The buck, boost, and buck–boost converters each contains an inductor that is connected to a
SPDT switch. As illustrated in Fig. 6.9a, the inductor-switch network can be viewed as a basic
cell having the three terminals labeled a, b, and c. It was ﬁrst pointed out in [15, 44], and later
in [45], that there are three distinct ways to connect this cell between the source and load. The
connections a–Ab –Bc –C lead to the buck converter. The connections a–Ab –Bc –C amount
to inversion of the source and load, and lead to the boost converter. The connections a–Ab –B
c–C lead to the buck–boost converter. So the buck, boost, and buck–boost converters could be
viewed as being based on the same inductor-switch cell, with diﬀerent source and are connected
in series with the source load connections.
(a)
+
+
v
1
2
Vg
Three-terminal cell
aB bA
c
C
(b)
+
+
v
1
2
Three-terminal cell
Aa bB
c
C
Vg
Fig. 6.9 Rotation of three-terminal switch cells: (a) switch/inductor cell, (b) switch/capacitor cell
A dual three-terminal network, consisting of a capacitor-switch cell, is illustrated in Fig.6.9b.
Filter inductors are connected in series with the source and load, such that the converter input
and output currents are nonpulsating. There are again three possible ways to connect this cell

170 6 Converter Circuits
between the source and load. The connections a–Ab –Bc –C lead to a buck converter with L-C
input low-pass ﬁlter. The connections a–Ab –Bc –C coincide with inversion of source and load,
and lead to a boost converter with an added outputL–C ﬁlter section. The connections a–Ab –B
c–C lead to the ´Cuk converter.
Rotation of more complicated three-terminal cells is explored in [46].
6.1.4 Diﬀerential Connection of the Load
In inverter applications, where an ac output is required, a converter is needed that is capa-
ble of producing an output voltage of either polarity. By variation of the duty cycle in the
correct manner, a sinusoidal output voltage having no dc bias can then be obtained. Of the
converters studied so far in this chapter, the buck and the boost can produce only a posi-
tive unipolar output voltage, while the buck–boost and ´Cuk converters produce only a nega-
tive unipolar output voltage. How can we derive converters that can produce bipolar output
voltages?
Converter 1 +
V1
+
V
D
Converter 2
+Vg
+
V2
D'
loaddc source
V1 = M(D) Vg
V2 = M(D') Vg
Fig. 6.10 Obtaining a bipolar output by diﬀerential connection of load
A well-known technique for obtaining a bipolar output is the di ﬀerential connection of
the load across the outputs of two known converters, as illustrated in Fig. 6.10. If converter
1 produces voltage V1, and converter 2 produces voltage V2, then the load voltage V is
given by
V= V1−V2 (6.11)
Although V1 and V2 may both individually be positive, the load voltageV can be either positive
or negative. Typically, if converter 1 is driven with duty cycleD, then converter 2 is driven with
its complement, D′, so that when V1 increases, V2 decreases, and vice versa.

6.1 Circuit Manipulations 171
Several well-known inverter circuits can be derived using the diﬀerential connection. Let us
realize converters 1 and 2 of Fig.6.10 using buck converters. Figure6.11a is obtained. Converter
(a)
+
V1
+
V
+Vg
+
V2
1
2
1
2
Buck converter 1}
Buck converter 2 {
(b)
+Vg
1
2
1
2
+
V
Fig. 6.11 Derivation of bridge inverter (H-bridge): (a)d iﬀerential connection of load across outputs of
buck converters, (b) bypassing load by capacitor, (c) combining series inductors, (d) circuit (c)r e d r a w ni n
its usual form

172 6 Converter Circuits
(c)
+Vg
1
2
1
2
+
V
(d)
+
L
C
R
+ V 
2
1iL
Vg
1
2
Fig. 6.11 (continued)
Fig. 6.12 Conversion ratio of theH-
bridge inverter circuit
D
M(D)
10.5
1
0
1 is driven with duty cycleD, while converter 2 is driven with duty cycleD′. So when the SPDT
switch of converter 1 is in the upper position, then the SPDT switch of converter 2 is in the lower
position, and vice-versa. Converter 1 then produces output voltage V
1 = DVg, while converter
2 produces output voltage V2= D′Vg. The diﬀerential load voltage is
V= DVg−D′Vg (6.12)

6.1 Circuit Manipulations 173
+
V1
+Vg
+
V2
dc source
+
V3
D2
D3
Vn
+ vbn
an
 +
cn +V2 = M(D2) Vg
V3 = M(D3) Vg
Converter 1
D1
V1 = M(D1) Vg
Converter 2
Converter 3
Fig. 6.13 Generation of dc–3φac inverter by diﬀerential connection of 3φload
Simpliﬁcation leads to
V= (2D−1)Vg (6.13)
This equation is plotted in Fig. 6.12. It can be seen the output voltage is positive for D> 0.5,
and negative for D< 0.5. If the duty cycle is varied sinusoidally about a quiescent operating
point of 0.5, then the output voltage will be sinusoidal, with no dc bias.
The circuit of Fig. 6.11a can be simpliﬁed. It is usually desired to bypass the load directly
with a capacitor, as in Fig. 6.11b. The two inductors are now eﬀectively in series, and can be
combined into a single inductor as in Fig. 6.11c. Figure 6.11d is identical to Fig. 6.11c, but is
redrawn for clarity. This circuit is commonly called the H-bridge, or bridge inverter circuit. Its
use is widespread in servo ampliﬁers and single-phase inverters. Its properties are similar to
those of the buck converter, from which it is derived.
Polyphase inverter circuits can be derived in a similar manner. A three-phase load can be
connected diﬀerentially across the outputs of three dc–dc converters, as illustrated in Fig. 6.13.
If the three-phase load is balanced, then the neutral voltage V
n will be equal to the average of
the three converter output voltages:
Vn= 1
3 (V1+ V2+ V3) (6.14)
If the converter output voltages V1, V2, and V3 contain the same dc bias, then this dc bias will
also appear at the neutral point Vn. The phase voltages Van, Vbn, and Vcn are given by

174 6 Converter Circuits
Van= V1−Vn
Vbn= V2−Vn
Vcn= V3−Vn
(6.15)
It can be seen that the dc biases cancel out, and do not appear in Van, Vbn, and Vcn.
Let us realize converters 1, 2, and 3 of Fig. 6.13 using buck converters. Figure6.14a is then
obtained. The circuit is redrawn in Fig. 6.14b for clarity. This converter is known by several
names, including the voltage-source inverter and the buck-derived three-phase bridge.
Inverter circuits based on dc–dc converters other than the buck converter can be derived in a
similar manner. Figure6.14c contains a three-phase current-fed bridge converter having a boost-
type voltage conversion ratio, also known as the current source inverter. Since most inverter
applications require the capability to reduce the voltage magnitude, a dc–dc buck converter is
usually cascaded at the dc input port of this inverter. Several other examples of three-phase
inverters are given in [ 19, 22, 47], in which the converters are capable of both increasing and
decreasing the voltage magnitude.
6.2 A Short List of Converters
An inﬁnite number of converters are possible, and hence it is not feasible to list them all. A short
list is given here.
Let us consider ﬁrst the class of single-input single-output converters, containing a single
inductor. There are a limited number of ways in which the inductor can be connected between
the source and load. If we assume that the switching period is divided into two subintervals,
then the inductor should be connected to the source and load in one manner during the ﬁrst
subinterval, and in a diﬀerent manner during the second subinterval. One can examine all of
the possible combinations, to derive the complete set of converters in this class [ 48–50]. By
elimination of redundant and degenerate circuits, one ﬁnds that there are eight converters, listed
in Fig. 6.15. How the converters are counted can actually be a matter of semantics and personal
preference; for example, many people in the ﬁeld would not consider the noninverting buck–
boost converter as distinct from the inverting buck–boost. Nonetheless, it can be said that a
converter is deﬁned by the connections between its reactive elements, switches, source, and
load; by how the switches are realized; and by the numerical range of reactive element values.
The ﬁrst four converters of Fig. 6.15, the buck, boost, buck–boost, and the noninverting
buck–boost, have been previously discussed. These converters produce a unipolar dc output
voltage. With these converters, it is possible to increase, decrease, and/or invert a dc voltage.
Converters 5 and 6 are capable of producing a bipolar output voltage. Converter 5, the
H-
bridge, has previously been discussed. Converter 6 is a nonisolated version of the current-fed
converter of Fig. 6.38b; this converter is denoted the Watkins-Johnson converter [51–55]. This
converter can also produce a bipolar output voltage; however, its conversion ratio M(D)i sa
nonlinear function of duty cycle. The number of switch elements can be reduced by using a
two-winding inductor as shown. The function of the inductor is similar to that of the ﬂyback
converter, discussed in the next section. When switch 1 is closed the upper winding is used,
while when switch 2 is closed, current ﬂows through the lower winding. The current ﬂows
through only one winding at any given instant, and the total ampere-turns of the two windings
are a continuous function of time. Advantages of this converter are its ground-referenced load
and its ability to produce a bipolar output voltage using only two SPST current-bidirectional

6.2 A Short List of Converters 175
(a)
+Vg
+
V2
3 ac load
dc source
+
V3
Vn
+ vbn
an
 +
cn +
+
V1
(b) 3 ac loaddc source
Vn
+ vbn
an
 +
cn +
+Vg
(c) 3 ac loaddc source
Vn
+ vbn
an
 +
cn +
+Vg
Fig. 6.14 Dc–3φac inverter topologies: ( a)d iﬀerential connection of 3φload across outputs of buck
converters; (b) simpliﬁcation of low-pass ﬁlters to obtain the dc–3 φac voltage-source inverter; ( c)t h e
dc–3φac current source inverter

176 6 Converter Circuits
2. Boost
+
+
V
1
2
Vg
M(D)= 1
D
1. Buck
+
+
V
1
2
Vg
M(D)= D
+
+
V
12
Vg
3. Buck-boost M(D D
D
+
V
1
2
+
1
2
Vg
4. Noninverting buck-boost M(D)= D
D
M(D)
D
1
0
0.5
0 0.5 1
M(D)
D
2
0
1
0 0.5 1
3
4
M(D)
0
D0 0.5 1
M(D)
D
2
0
1
0 0.5 1
3
4
Fig. 6.15 Eight members of the basic class of single-input single-output converters containing a single
inductor
switches. The isolated version and its variants have found application in high-voltage dc power
supplies.
Converters 7 and 8 can be derived as the inverses of converters 5 and 6. These converters
are capable of interfacing an ac input to a dc output. The ac input current waveform can have
arbitrary waveshape and power factor.
The class of single-input single-output converters containing two inductors is much larger.
Several of its members are listed in Fig.6.16.T h e ´Cuk converter has been previously discussed
and analyzed. It has an inverting buck–boost characteristic, and exhibits nonpulsating input and

6.3 Transformer Isolation 177
6. Watkins-Johnson
5. Bridge
7. Current-fed bridge
8. Inverse of Watkins-Johnson
M(D)=2 D
M(D)= 2D 1
D
M(D)= 1
2D
M(D)= D
2D
1
2
+ + V Vg
2
1
M(D)
1
0
D0.5 1
+
12
12
Vg
+
V
M(D)
D0.5 1
0
1
M(D)
2
0
1
D0.5 1
M(D)
2
0
1
D0.5 1
+ + V 
1
2
2
1
Vg
+Vg
21
21
+
V
+
V
+
1
2Vg
or
or +
V+Vg
1
2
Fig. 6.15 (continued)
output terminal currents. The SEPIC (single-ended primary inductance converter) [ 56], and its
inverse, have noninverting buck–boost characteristics. The ´Cuk and SEPIC also exhibit the
desirable feature that the MOSFET source terminal is connected to ground; this simpliﬁes the
construction of the gate drive circuitry. Two inductor converters having conversion ratiosM(D)
that are biquadratic functions of the duty cycle D are also numerous. An example is converter
4o fF i g .6.16 [57]. This converter can be realized using a single transistor and three diodes.
Its conversion ratio is M(D)= D
2. This converter may ﬁnd use in nonisolated applications
that require a large step-down of the dc voltage, or in applications having wide variations in
operating point.

178 6 Converter Circuits
2. SEPIC
1. Cuk
3. Inverse of SEPIC
M(D D
D
4. Buck 2
M(D)= D
D
M(D)
0
D0 0.5 1
M(D)
D
2
0
1
0 0.5 1
3
4
+
+
V
1 2
Vg
M(D)= D2
M(D)= D
D M(D)
D
2
0
1
0 0.5 1
3
4
M(D)
D
1
0
0.5
0 0.5 1
+
+
VVg 1
2
+
1
2Vg
+
V
+Vg
1
2
1
2
+
V
Fig. 6.16 Several members of the basic class of single-input single-output converters containing two
inductors
6.3 Transformer Isolation
In a large number of applications, it is desired to incorporate a transformer into a switching
converter, to obtain dc isolation between the converter input and output. For example, in oﬀ-line
applications (where the converter input is connected to the ac utility system), isolation is usually
required by regulatory agencies. Isolation could be obtained in these cases by simply connecting

6.3 Transformer Isolation 179
a 50 Hz or 60 Hz transformer at the converter ac input. However, since transformer size and
weight vary inversely with frequency, signiﬁcant improvements can be made by incorporating
the transformer into the converter, so that the transformer operates at the converter switching
frequency of tens or hundreds of kilohertz.
When a large step-up or step-down conversion ratio is required, the use of a transformer can
allow better converter optimization. By proper choice of the transformer turns ratio, the voltage
or current stresses imposed on the transistors and diodes can be minimized, leading to improved
eﬃciency and lower cost.
Multiple dc outputs can also be obtained in an inexpensive manner, by adding multiple sec-
ondary windings and converter secondary-side circuits. The secondary turns ratios are chosen
to obtain the desired output voltages. Usually only one output voltage can be regulated via con-
trol of the converter duty cycle, so wider tolerances must be allowed for the auxiliary output
voltages. Cross regulationis a measure of the variation in an auxiliary output voltage, given that
the main output voltage is perfectly regulated [58–60].
A physical multiple-winding transformer having turns ratio n
1:n2:n3:... is illustrated in
Fig. 6.17, and the schematic symbol for this transformer is illustrated in Fig. 6.18a. A simple
equivalent circuit is illustrated in Fig.6.18b, which is suﬃcient for understanding the operation
of most transformer-isolated converters. The model assumes perfect coupling between windings
and neglects losses; more accurate models are discussed in a later chapter. The ideal transformer
obeys the relationships
Fig. 6.17 Physical construction of a
three-winding transformer
Magnetic core
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
n3
turns
i3(t)
+ v3(t
v1(t)
n1
= v2(t)
n2
= v3(t)
n3
=...
0= n1i′
1(t)+ n2i2(t)+ n3i3(t)+...
(6.16)
In parallel with the ideal transformer is an inductance LM, called the magnetizing inductance,
referred to the transformer primary in the ﬁgure.
Physical transformers must contain a magnetizing inductance. For example, suppose we dis-
connect all windings except for the primary winding. We are then left with a single winding on
a magnetic core—an inductor. Indeed, the equivalent circuit of Fig.6.18b predicts this behavior,
via the magnetizing inductance.

180 6 Converter Circuits
The magnetizing current iM(t) is proportional to the magnetic ﬁeld H(t) inside the trans-
former core. The physical B–H characteristics of the transformer core material, illustrated in
Fig. 6.19, govern the magnetizing current behavior. For example, if the magnetizing current
iM(t) becomes too large, then the magnitude of the magnetic ﬁeld H(t) causes the core to satu-
rate. The magnetizing inductance then becomes very small in value, eﬀectively shorting out the
transformer.
(a) n1 : n2
: n3
+
v1(t)
+
v2(t)
+
v3(t)
i1(t) i2(t)
i3(t)
Transformer
(b)
n1 : n2
: n3
+
v1(t)
+
v2(t)
+
v3(t)
i1(t) i2(t)
i3(t)
Ideal
transformer
i1'(t)
LM
iM(t)
Transformer
Fig. 6.18 A multiple-winding transformer: (a) schematic symbol, (b) equivalent circuit model containing
a magnetizing inductance and ideal transformer
Fig. 6.19 B−H characteristics
of transformer core
B(t) v1(t) dt
H(t) iM(t)
slope LM
saturation
The presence of the magnetizing inductance explains why transformers do not work in dc
circuits: at dc, the magnetizing inductance has zero impedance, and shorts out the windings. In a
well-designed transformer, the impedance of the magnetizing inductance is large in magnitude

6.3 Transformer Isolation 181
over the intended range of operating frequencies, such that the magnetizing current iM(t) has
much smaller magnitude than i1(t). Then i′
1(t)≈i1(t), and the transformer behaves nearly as an
ideal transformer. It should be emphasized that the magnetizing current iM(t) and the primary
winding current i1(t) are independent quantities.
The magnetizing inductance must obey all of the usual rules for inductors. In the model of
Fig. 6.18b, the primary winding voltage v1(t) is applied across LM, and hence
v1(t)= LM
diM(t)
dt (6.17)
Integration leads to
iM(t)−iM(0)= 1
LM
∫ t
0
v1(τ)dτ (6.18)
So the magnetizing current is determined by the integral of the applied winding voltage. The
principle of inductor volt-second balance also applies: when the converter operates in steady
state, the dc component of voltage applied to the magnetizing inductance must be zero:
0= 1
Ts
∫ Ts
0
v1(t)dt (6.19)
Since the magnetizing current is proportional to the integral of the applied winding voltage, it
is important that the dc component of this voltage be zero. Otherwise, during each switching
period there will be a net increase in magnetizing current, eventually leading to excessively
large currents and transformer saturation.
The operation of converters containing transformers may be understood by inserting the
model of Fig. 6.18b in place of the transformer in the converter circuit. Analysis then proceeds
as described in the previous chapters, treating the magnetizing inductance as any other inductor
of the converter.
Practical transformers must also contain leakage inductance. A small part of the ﬂux linking
a winding may not link the other windings. In the two-winding transformer, this phenomenon
may be modeled with small inductors in series with the windings. In most isolated converters,
leakage inductance is a nonideality that leads to switching loss, increased peak transistor voltage,
and that degrades cross-regulation, but otherwise has no inﬂuence on basic converter operation.
There are several ways of incorporating transformer isolation into a dc–dc converter. The
full-bridge, half-bridge, forward, and push-pull converters are commonly used isolated versions
of the buck converter. Similar isolated variants of the boost converter are known. The ﬂyback
converter is an isolated version of the buck–boost converter. These isolated converters, as well
as isolated versions of the SEPIC and the ´Cuk converter, are discussed in this section.
6.3.1 Full-Bridge and Half-Bridge Isolated Buck Converters
The full-bridge transformer-isolated buck converter is sketched in Fig.6.20a. A version contain-
ing a center-tapped secondary winding is shown; this circuit is commonly used in converters
producing low output voltages. The two halves of the center-tapped secondary winding may
be viewed as separate windings, and hence we can treat this circuit element as a three-winding

182 6 Converter Circuits
(a)
CR
+
v
LD5
D6
1: n
: n
i(t)
+
vs(t)
+
vT(t)+Vg
D1
Q1
D2Q2
D3
Q3
D4Q4
i1(t) iD5(t)
(b)
CR
+
v
LD5
D6
1: n
: n
i(t)
+
vs(t)
+
vT(t)+Vg
i1(t) iD5(t)
D1
Q1
D2Q2
D3
Q3
D4Q4
LM
i1'(t)
iM(t)
iD6(t)
Ideal
Transformer model
Fig. 6.20 Full-bridge transformer-isolated buck converter: ( a) schematic diagram, ( b) replacement of
transformer with equivalent circuit model
transformer having turns ratio 1: n:n. When the transformer is replaced by the equivalent cir-
cuit model of Fig. 6.18b, the circuit of Fig. 6.20b is obtained. Typical waveforms are illustrated
in Fig. 6.21. The output portion of the converter is similar to the nonisolated buck converter—
compare the vs(t) and i(t) waveforms of Fig.6.21 with Figs. 2.1b and 2.10.
During the ﬁrst subinterval 0 < t < DTs, transistors Q1 and Q4 conduct, and the trans-
former primary voltage is vT = Vg. This positive voltage causes the magnetizing current iM(t)
to increase with a slope of Vg/LM. The voltage appearing across each half of the center-tapped
secondary winding is nVg, with the polarity mark at positive potential. Diode D5 is therefore
forward-biased, and D6 is reverse-biased. The voltage vs(t) is then equal to nVg, and the output
ﬁlter inductor current i(t) ﬂows through diode D5.
Several transistor control schemes are possible for the second subinterval DTs < t< Ts.
In the most common scheme, all four transistors are switched o ﬀ, and hence the transformer
voltage is vT = 0. Alternatively, transistors Q2 and Q4 could conduct, or transistors Q1 and Q3
could conduct. In any event, diodes D5 and D6 are both forward-biased during this subinterval;
each diode conducts approximately one-half of the output ﬁlter inductor current.
Actually, the diode currents iD5 and iD6 during the second subinterval are functions of both
the output inductor current and the transformer magnetizing current. In the ideal case (no mag-
netizing current), the transformer causes i
D5(t) and iD6(t) to be equal in magnitude since, if
i′
1(t)= 0, then niD5(t)= niD6(t). But the sum of the two diode currents is equal to the output
inductor current:
iD5(t)+ iD6(t)= i(t) (6.20)
```
