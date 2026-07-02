---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第4章part 3 - 4 Switch Realization
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 122-141 > Chunk ID: `chapter-4-part-3`"
---

# 第4章part 3 - 4 Switch Realization

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 122-141  
> Chunk ID: `chapter-4-part-3`

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
4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 107
Table 4.5 Comparison of Si Superjunction MOSFET and GaN FET
Si SJ MOSFET GaN FET
V oltage rating 650 V 650 V
Ron, 25–150◦C 24–60 m Ω 25–50 mΩ
Qg at VDS = 400V 123 nC (10 V) 12 nC (6 V)
VSD 0.8 V 4 V
Qrr 8.7μC–
trr 440 ns –
Fig. 4.53 Reverse conduction through a FET such as a GaN
device, when the gate is shorted to the source. The FET becomes
forward-biased when vds ≤−Vth
G
S
D
–
Vth
+
4.4.3 MOSFET Gate Drivers
Now let us discuss some practical circuitry and basic considerations for driving power MOS-
FETs. Figure 4.54 contains a synchronous buck converter; in which the main switchQ1 and the
synchronous rectiﬁer Q2 are both realized using power MOSFETs. This conﬁguration is found
in quite a few examples, including not only low-voltage dc–dc buck converters, but also dc-ac
inverter circuits and converters having bidirectional power ﬂow. The transistor conﬁguration is
also called a half-bridge circuit, and the gate driver circuitry illustrated in this ﬁgure is called
a half-bridge gate driver. The fundamentals of driving the MOSFETs in these applications are
nearly the same, and are discussed in this section in the context of the synchronous buck con-
verter.
In Fig. 4.54, MOSFET Q
2 is driven by low-side driver DRLS . Since the source of Q2 is
connected to ground, the gate is driven at zero volts to turn Q2 oﬀ, and at 12 V to turn Q2 on.
The source of MOSFET Q1 is connected to the switch node voltage vs(t); this voltage is
approximately zero when Q2 is on, but is approximately equal to the input voltage Vg when Q1
is on. The high-side driverDRHS must drive the gate ofQ1 to 0 V with respect tovs(t)t ot u r nQ1
oﬀ, and to+12 V with respect to vs(t)t ot u r nQ1 on. To drive Q1 in this manner, the high-side
driver circuit is referenced to the switch node voltage vs(t), and a level shifter circuit converts
the ground-referenced control signal to a vs-referenced signal as needed to drive the input of
DRHS .
A bootstrap power supply provides 12 V power to DRHS that is referenced to vs. When
MOSFET Q2 conducts, then capacitor Cboot charges to 12 V through diode Dboot and Q2. While
Q1 conducts, capacitor Cboot supplies power to DRHS , that is approximately+12 V with respect
to vs. It is necessary to periodically turn Q2 on, to recharge Cboot to 12 V and maintain power to
DRHS .
Up-to-date gate driver ICs containundervoltage lockout(UVLO) circuitry that reliably turns
oﬀboth MOSFETs when the 12 V power supply voltage is less than an UVLO threshold. This
forces the MOSFETs into a known safe OFF-state while the 12 V power supply starts up. For

108 4 Switch Realization
+
L
iL
+
vs(t)
Q1 D1
Q2
D2
+ 12 V
+ 12 V
Logic input
Vg
c(t)
Dboot
Cboot
Deadtime
generator
DRHS
DRLS
cHS(t) cLS(t)
Level
shift
Fig. 4.54 Buck converter with MOSFET synchronous rectiﬁer and half-bridge gate driver
reliable operation of the high-side bootstrap power supply, the voltage across capacitor Cboot
must be higher than this UVLO threshold.
The control signal c(t) is a logic signal that commands switching of the transistors, with
switching frequency fs and duty cycle Dc. This signal drives adeadtime generator that produces
signals that drive the driver circuitsDRLS and DRHS . It is necessary to make sure thatQ1 and Q2
do not simultaneously conduct, even for a few nanoseconds—simultaneous conduction leads to
very large current spikes drawn out of the source Vg, which can damage the MOSFETs or at
least substantially reduce the eﬃciency. The function of the deadtime generator is to insert small
delays, or deadtimes, that implement break-before-make switching, in which one transistor is
fully turned oﬀbefore the next transistor begins to turn on. Typical waveforms of the control
signals c(t), cHS (t), and cLS (t) are illustrated in Fig. 4.55.
Fig. 4.55 Control waveforms of the
deadtime generator block of Fig. 4.54
c(t)
cHS(t)
t
cLS(t)
DcTs
Tstdtd
Q1 on
Q1 off
Q2 on
Q2 off

4.4 Metal-Oxide-Semiconductor Field-Eﬀect Transistor (MOSFET) 109
Let us consider next the details of the switching transition in which the synchronous rectiﬁer
Q2 turns oﬀ, and then the main switch Q1 turns on. In Fig. 4.56, the low-side driver DRLS and
MOSFET Q2 are replaced by equivalent circuit models that aid in understanding the waveforms
observed during this switching transition. The driverDRLS is replaced by a Thevenin-equivalent
model consisting of a voltage sourcevthev(t) and a resistanceRthev. The voltage sourcevthev is the
open-circuit output voltage of the driver, and can be assumed to be proportional to the control
signal cLS (t)o fF i g .4.55. The resistance Rthev can be viewed, to ﬁrst order, as arising from the
on-resistance of the output driver stage MOSFETs of the driver DRLS . It is traditional to rate
gate drivers according to their peak current capability; so, for example, a driver rated at 12 V
and 1 A would exhibit Rthev = (12 V)/(1 A)= 12Ω. Additionally, in Fig. 4.56, MOSFET Q2 is
replaced with an equivalent circuit model consisting of the device capacitancesCgs, Cgd, andCds ,
body diode D2, and a dependent current source that models the dependence of the drain current
on vgs and vs.
+
L
iL
+
vs(t)
Q1 D1
+ 12 V
+
Rthev
vthev(t)
Cgd
Cgs
+
vgs(t)
Gate driver
model
MOSFET
model
Vg
D2Cds
igd
idr
Fig. 4.56 Detail of half-bridge gate driver of Fig. 4.54, with low-side driver modeled by Thevenin-
equivalent network, and with MOSFET Q2 replaced by its equivalent circuit model
Waveforms of the switching transition are illustrated in Fig.4.57. Initially, Q2 is on, and its
gate-to-source voltage vgs(t) is high. The switch node voltage vs(t) is approximately zero, and
transistor Q1 is oﬀ. When the control signal cLS (t) commands the low-side driver to turn Q2 oﬀ,
then the Q2 gate capacitances begin to discharge through the driver resistance Rthev. When the
Q2 gate voltage vgs(t) falls below the Q2 threshold voltage Vth, then MOSFET Q2 is fully oﬀ.
With a properly chosen deadtime td, this happens before Q1 begins to turn on.
After Q2 has turned oﬀ, but before Q1 turns on, where does the inductor current iL(t)ﬂ o w ?
It is assumed that the inductor current has small ripple, and does not signiﬁcantly change over
the switching times illustrated in Fig. 4.57. With both Q1 and Q2 in the oﬀstate, and with
positive inductor current in the direction illustrated, the inductor current will forward-bias the
body diode D
2. This body diode will continue to conduct for the remainder of the deadtime.

110 4 Switch Realization
Fig. 4.57 Waveforms for the
switching transition where Q2 turns
oﬀand then Q1 turns on
cHS(t)
t
cLS(t)
td
vgs(t)
vs(t)
0
Vg
Vth
tr
Q2 Q1D2
Conducting
Devices:
tvr
At the conclusion of the deadtime, the control signal cHS (t) commands the high-side driver
to turn Q1 on. Since body diode D2 is conducting, it must undergo a reverse-recovery process,
and hence reverse current ﬂows through D2 (also ﬂowing through Q1 and Vg). Consequently,
D2 induces switching loss in Q1, as described in Sect. 4.3.I nF i g .4.57,t h eD2 reverse recovery
time is labeled tr.
When the reverse recovery of D2 has progressed enough to allow the diode voltage to
change, then the switch node voltage vs(t) will rise. Figure 4.57 is sketched for the case that
the body diode softness factor is S = 0, so that the voltage vs(t) changes after the reverse re-
covery has concluded. During the interval of length tvr, the switch node voltage rises from zero
to Vg. During this interval, the energy stored in the output capacitances Cds of MOSFETs Q1
and Q2 is dissipated as switching loss in Q1. Switching loss as described in Sect. 4.2.2 is also
induced in Q1.
It can be observed from Fig. 4.56 that when vgs(t) and vthev(t) are both zero, there is zero
voltage across Rthev, and hence idr is zero. This is what happens at the beginning of the tvr
interval of Fig. 4.57. But since vs(t) is rising, current igd = Cgd dvs/dt is induced in capacitance
Cgd. This current must ﬂow intoCgs since idr = 0. Hence, vgs(t) must increase as shown. Forvgs
greater than zero, some negative driver currentidr will occur, limited by the Thevenin resistance
Rthev.
How high does vgs(t) become during the tvr interval? It is important thatvgs remain less than
vth for the entire interval, so that MOSFET Q2 remains oﬀ.I f vgs rises above Vth, then Q2 will
begin to turn on, leading to oscillations and additional switching loss. It is important to maintain
vgs < Vth for the entire Q1 turn-on interval.
A commonly used solution for reducing the rise of Vgs(t) is illustrated in Fig. 4.58. A small-
value resistor Rg1 is connected between the high-side driverDRHS and the gate of MOSFET Q1.
This slows down the turn-on ofQ1, reducing the rate at which the switch node voltagevs(t)r i s e s .
Hence the current igd of the Q2 gate-to-drain capacitance is reduced, and vgs(t) increases more
slowly. If Rg1 is large enough, then the low-side driver DRLS is able to maintain vgs(t) less than

4.5 Minority-Carrier Transistors 111
+
–
L
Q1 D1
Q2
D2
+ 12 V
+ 12 V
Logic input
Vg
c(t)
Dboot
Cboot
Deadtime
generator
DRHS
DRLS
cHS(t) cLS(t)
Level
shift
Rg1
Dg1
Fig. 4.58 Addition of resistor Rg1 and diode Dg1 between high-side driver and gate of Q1, to slow down
the turn-on of Q1 and maintain the Vgs of Q2 below Vth during the Q1 turn-on transition
Vth. Diode Dg1 bypasses Rg1 during the turn-oﬀtransition of Q1, so that Rg1 reduces the turn-on
speed but does not aﬀect the turn-oﬀspeed. If the inductor current iL can reverse polarity, then
it may be desirable to insert a similar Rg2 and Dg2 network at the gate of Q2.
4.5 Minority-Carrier Transistors
4.5.1 Bipolar Junction Transistor (BJT)
A cross-section of an NPN power BJT is illustrated in Fig. 4.59. As with other power devices,
current ﬂows vertically through the silicon wafer. A lightly doped n−region is inserted in the
collector, to obtain the desired voltage breakdown rating. The transistor operates in the oﬀstate
Fig. 4.59 Power BJT structure.
Crosshatched regions are metallized
contacts
Collector
n
n
p
EmitterBase
n nn

112 4 Switch Realization
(cutoﬀ) when the p–n base-emitter junction and the p–n−base-collector junction are reverse-
biased; the applied collector-to-emitter voltage then appears essentially across the depletion
region of the p–n−junction. The transistor operates in the on state (saturation) when both junc-
tions are forward-biased; substantial minority charge is then present in the p and n−regions.
This minority charge causes the n−region to exhibit a low on-resistance via the conductivity
modulation eﬀect. Between the oﬀstate and the on state is the familiar active region, in which
the p–n base-emitter junction is forward-biased and the p–n−base-collector junction is reverse-
biased. When the BJT operates in the active region, the collector current is proportional to the
base region minority charge, which in turn is proportional (in equilibrium) to the base current.
There is in addition a fourth region of operation known as quasi-saturation, occurring between
the active and saturation regions. Quasi-saturation occurs when the base current is insuﬃcient
to fully saturate the device; hence, the minority charge present in then−region is insuﬃcient to
fully reduce the n−region resistance, and high transistor on-resistance is observed.
+
VCC
RL
RB
vs(t)
iC(t)
+
vCE(t)
iB(t)
vBE(t)
+
Fig. 4.60 Circuit for BJT switching time example
Consider the simple switching circuit of
Fig. 4.60. Figure 4.61 contains waveforms il-
lustrating the BJT turn-on and turn-o ﬀtran-
sitions. The transistor operates in the o ﬀ
state during interval (1), with the base-emitter
junction reverse-biased by the source voltage
v
s(t)=−Vs1. The turn-on transition is initi-
ated at the beginning of interval (2), when
the source voltage changes to v
s(t)=+ Vs2.
Positive current is then supplied by source
vs to the base of the BJT. This current ﬁrst
charges the capacitances of the depletion re-
gions of the reverse-biased base-emitter and
base-collector junctions. At the end of inter-
val (2), the base-emitter voltage exceeds zero
suﬃciently for the base-emitter junction to
become forward-biased. The length of interval (2) is called the turn-on delay time. During in-
terval (3), minority charge is injected across the base-emitter junction from the emitter into the
base region; the collector current is proportional to this minority base charge. Hence during
interval (3), the collector current increases. Since the transistor drives a resistive load RL,t h e
collector voltage also decreases during interval (3). This causes the voltage to reduce across the
reverse-biased base-collector depletion region (Miller) capacitance. Increasing the base current
IB1 (by reducing RB or increasing Vs2) increases the rate of change of both the base region mi-
nority charge and the charge in the Miller capacitance. Hence, increasedIB1 leads to a decreased
turn-on switching time.
Near or at the end of interval (3), the base-collector p–n−junction becomes forward-biased.
Minority carriers are then injected into the n−region, reducing its eﬀective resistivity. Depend-
ing on the device geometry and the magnitude of the base current, a voltage tail [interval
(4)] may be observed as the apparent resistance of the n−region decreases via conductivity
modulation. The BJT reaches on-state equilibrium at the beginning of interval (5), with low
on-resistance and with substantial minority charge present in both the n−and p regions. This
minority charge signiﬁcantly exceeds the amount necessary to support the active region con-
duction of the collector current ICon; its magnitude is a function of IB1−ICon/β, whereβis the
active-region current gain.

4.5 Minority-Carrier Transistors 113
t
(1) (2) (3) (4) (5) (6)
vs(t)
vBE(t)
iB(t)
vCE(t)
iC(t)
s1
Vs2
s1
0.7 V
0
IB1
VCC
IConRon
0
ICon
B2
(7) (8) (9)
Fig. 4.61 BJT turn-on and turn-oﬀtransition waveforms
The turn-oﬀprocess is initiated at the beginning of interval (6), when the source voltage
changes to vs(t)=−Vs1. The base-emitter junction remains forward-biased as long as minority
carriers are present in its vicinity. Also, the collector current continues to beiC(t)= ICon as long
as the minority charge exceeds the amount necessary to support the active region conduction of
ICon, that is, as long as excess charge is present. So during interval (6), a negative base current
ﬂows equal to−IB2 = (−Vs1−vBE (t))/RB. This negative base current actively removes the to-
tal stored minority charge. Recombination further reduces the stored minority charge. Interval
(6) ends when all of the excess minority charge has been removed. The length of interval (6)

114 4 Switch Realization
Fig. 4.62 Ideal base current waveform
for minimization of switching times
iB(t) IB1
B2
IBon
0
t
is called the storage time. During interval (7), the transistor operates in the active region. The
collector current iC(t) is now proportional to the stored minority charge. Recombination and
the negative base current continue to reduce the minority base charge, and hence the collector
current decreases. In addition, the collector voltage increases, and hence the base current must
charge the Miller capacitance. At the end of interval (7), the minority stored charge is equal
to zero, and the base-emitter junction can become reverse-biased. The length of interval (7) is
called the turn-oﬀtime or fall time. During interval (8), the reverse-biased base-emitter junc-
tion capacitance is discharged to voltage −V
s1. During interval (9), the transistor operates in
equilibrium, in the oﬀstate.
It is possible to turn the transistor o ﬀusing IB2 = 0; for example, we could let Vs1 be
approximately zero. However, this leads to very long storage and turn-o ﬀswitching times. If
IB2 = 0, then all of the stored minority charge must be removed passively, via recombination.
From the standpoint of minimizing switching times, the base current waveform of Fig. 4.62 is
ideal. The initial base current IB1 is large in magnitude, such that charge is inserted quickly into
the base, and the turn-on switching times are short. A compromise value of equilibrium on-state
current IBon is chosen, to yield a reasonably low collector-to-emitter forward voltage drop, while
maintaining moderate amounts of excess stored minority charge and hence keeping the storage
time reasonably short. The current −IB2 is large in magnitude, such that charge is removed
quickly from the base and hence the storage and turn-oﬀswitching times are minimized.
Unfortunately, in most BJTs, the magnitudes of IB1 and IB2 must be limited because ex-
cessive values lead to device failure. As illustrated in Fig. 4.63, the base current ﬂows laterally
through the p region. This current leads to a voltage drop in the resistance of the p material,
which inﬂuences the voltage across the base-emitter junction. During the turn-oﬀtransition, the
base current−IB2 causes the base-emitter junction voltage to be greater in the center of the base
Fig. 4.63 Al a r g eIB2 leads to focus-
ing of the emitter current away from
the base contacts, due to the voltage
induced by the lateral base region
current
Collector
n
n-
p
EmitterBase
n
B2
p+ +

4.5 Minority-Carrier Transistors 115
region, and smaller at the edges near the base contacts. This causes the collector current to focus
near the center of the base region. In a similar fashion, a large IB1 causes the collector current
to crowd near the edges of the base region during the turn-on transition. Since the collector-to-
emitter voltage and collector current are simultaneously large during the switching transitions,
substantial power loss can be associated with current focusing. Hence hot spots are induced at
the center or edge of the base region. The positive temperature coe ﬃcient of the base-emitter
junction current (corresponding to a negative temperature coe ﬃcient of the junction voltage)
can then lead to thermal runaway and device failure. Thus, to obtain reliable operation, it may
be necessary to limit the magnitudes of I
B1 and IB2. It may also be necessary to add external
snubber networks which the reduce the instantaneous transistor power dissipation during the
switching transitions.
Steady-state characteristics of the BJT are illustrated in Fig.4.64.I nF i g .4.64a, the collector
current IC is plotted as a function of the base current IB, for various values of collector-to-
emitter voltage VCE . The cutoﬀ, active, quasi-saturation, and saturation regions are identiﬁed.
At a given collector currentIc, to operate in the saturation region with minimum forward voltage
drop, the base current IB must be suﬃciently large. The slope dIC/dIB in the active region is
the current gain β. It can be seen that β decreases at high current–near the rated current of
the BJT, the current gain decreases rapidly and hence it is diﬃcult to fully saturate the device.
Collector current IC is plotted as a function of collector-to-emitter voltage VCE in Fig. 4.64b,
for various values of IB. The breakdown voltages BVsus, BVCEO , and BVCBO are illustrated.
BVCBO is the avalanche breakdown voltage of the base-collector junction, with the emitter open
circuited or with suﬃciently negative base current. BVCBO is the somewhat smaller collector-
emitter breakdown voltage observed when the base current is zero; as avalanche breakdown is
approached, free carriers are created that have the same e ﬀect as a positive base current and
that cause the breakdown voltage to be reduced. BVsus is the breakdown voltage observed with
positive base current. Because of the high instantaneous power dissipation, breakdown usually
results in destruction of the BJT. In most applications, the oﬀ-state transistor voltage must not
exceed BVCBO .
At voltage levels up to 600 V , the BJT has been replaced by the MOSFET in power applica-
tions. At 600 V and above, the BJT has been displaced by a more recent minority-carrier device,
the IGBT.
4.5.2 Insulated-Gate Bipolar Transistor (IGBT)
A cross-section of the IGBT is illustrated in Fig. 4.65. Comparison with Fig. 4.47 reveals that
the IGBT and power MOSFET are very similar in construction. The key di ﬀerence is the p
region connected to the collector of the IGBT. So the IGBT is a modern four-layer power semi-
conductor device having a MOS gate.
The function of the added p region is to inject minority charges into the n
−region while the
device operates in the on state, as illustrated in Fig. 4.65. When the IGBT conducts, the p–n−
junction is forward-biased, and the minority charges injected into then−region cause conductiv-
ity modulation. This reduces the on-resistance of the n−region, and allows high-voltage IGBTs
to be constructed which have low forward voltage drops. IGBTs rated as low as 600 V and as
high as 6500 V are readily available. The forward voltage drops of these devices are typically 2
to 4 V , much lower than would be obtained in equivalent MOSFETs of the same silicon area.
Several schematic symbols for the IGBT are in current use; the symbol illustrated in
Fig. 4.66a is the most popular. A two-transistor equivalent circuit for the IGBT is illustrated

116 4 Switch Realization
(a)
0 A
5 A
10 A
IC VCE = 200 V
0 A 50 mA 100 mA 150 mA
Cutoff
IB
VCE = 20 V
VCE = 5 V
VCE = 0.2 V
VCE = 0.5 V
Active region
Quasi-saturation
Saturation regionSlope
= 
(b) IC
VCE
IB = 0
Open emitter
BVCBOBVCEOBVsus
Increasing IB
Fig. 4.64 BJT static characteristics: ( a) IC vs. IB, illustrating the regions of operation; ( b) IC vs. VCE ,
illustrating voltage breakdown characteristics
in Fig. 4.66b. The IGBT functions eﬀectively as an n-channel power MOSFET, cascaded by a
PNP emitter-follower BJT. The physical locations of the two eﬀective devices are illustrated in
Fig. 4.67. It can be seen that there are two e ﬀective currents: the eﬀective MOSFET channel
current i1, and the eﬀective PNP collector current i2.
The price paid for the reduced voltage drop of the IGBT is its increased switching times,
especially during the turn-oﬀtransition. In particular, the IGBT turn-oﬀtransition exhibits a
phenomenon known as current tailing.T h eeﬀective MOSFET can be turned oﬀquickly, by re-
moving the gate charge such that the gate-to-emitter voltage is negative. This causes the channel
current i
1 to quickly become zero. However, the PNP collector current i2 continues to ﬂow as
long as minority charge is present in the n−region. Since there is no way to actively remove the
stored minority charge, it slowly decays via recombination. So i2 slowly decays in proportion

4.5 Minority-Carrier Transistors 117
Fig. 4.65 IGBT structure.
Crosshatched regions
are metallized contacts.
Shaded regions are in-
sulating silicon dioxide
layers
Collector
p
n
nn
pp
Emitter
Gate
nn
Minority carrier
injection
Fig. 4.66 The IGBT: (a) schematic
symbol, (b) equivalent circuit
(a)
Collector
Emitter
Gate
(b) C
E
G
i2i1
Fig. 4.67 Physical locations of the
eﬀective MOSFET and PNP compo-
nents of the IGBT
p
n
nnp p nn
i2 i1
Collector
Emitter
to the minority charge, and a current tail is observed. The length of the current tail can be re-
duced by introduction of recombination centers in the n−region, at the expense of a somewhat
increased on-resistance. The current gain of the eﬀective PNP transistor can also be minimized,
causing i1 to be greater than i2. Nonetheless, the turn-oﬀswitching time of the IGBT is sig-
niﬁcantly longer than that of the MOSFET, with typical turn-o ﬀtimes in the range 0.5 μst o
5 μs.

118 4 Switch Realization
Fig. 4.68 IGBT switching
loss example +
LiL(t)iA
vA
vB
+
iBDTs Ts
+
Ideal
diode
Physical
IGBT
Gate
driver
Vg
A buck converter circuit containing an ideal diode and nonideal (physical) IGBT is illus-
trated in Fig. 4.68. Turn-oﬀtransition waveforms are illustrated in Fig. 4.69; these waveforms
are similar to the MOSFET waveforms of Fig. 4.25. The diode is initially reverse-biased, and
the voltage vA(t) rises from approximately zero to Vg. The interval length (t1−t0) is the time re-
quired for the gate drive circuit to charge the IGBT gate-to-collector capacitance. At timet= t1,
the diode becomes forward-biased, and current begins to commute from the IGBT to the diode.
The interval (t2−t1) is the time required for the gate drive circuit to discharge the IGBT gate-
to-emitter capacitance to the threshold value which causes the eﬀective MOSFET in Fig. 4.66b
to be in the oﬀstate. This time can be minimized by use of a high-current gate drive circuit
which discharges the gate capacitance quickly. However, switching oﬀthe eﬀective MOSFET
does not completely interrupt the IGBT current iA(t): current i2(t) continues to ﬂow through the
eﬀective PNP bipolar junction transistor of Fig. 4.66b as long as minority carriers continue to
Fig. 4.69 IGBT turn-oﬀtran-
sition waveforms for the circuit
of Fig. 4.68
IGBT
waveforms
Diode
waveforms
t
t
t
pA(t)
= vAiA
iL
VgvA(t)
iA(t)
00
00
iL
g
Vg iL
t0 t1 t2
}
Current tail
t3
iB(t)
vB(t)
Area Woff

4.5 Minority-Carrier Transistors 119
exist within its base region. During the interval t2 < t< t3, the current is proportional to this
stored minority charge, and the current tail interval length (t3−t2) is equal to the time required
for this remaining stored minority charge to recombine.
The energy Wof f lost during the turn-oﬀtransition of the IGBT is again the area under
the instantaneous power waveform, as illustrated in Fig. 4.69. The switching loss can again be
evaluated using Eq. (4.6). Switching loss typically limits the maximum switching frequencies
of conventional PWM converters employing IGBTs to roughly 1 to 30 kHz.
The added p–n−diode junction of the IGBT is not normally designed to block signiﬁcant
voltage. Hence, the IGBT has negligible reverse voltage-blocking capability.
Since the IGBT is a four-layer device, there is the possibility of SCR-type latchup, in which
the IGBT cannot be turned oﬀby gate voltage control. Recent devices are not susceptible to this
problem. These devices are quite robust, hot spot and current crowding problems are nonexis-
tent, and the need for external snubber circuits is minimal.
The on-state forward voltage drop of the IGBT can be modeled by a forward-biased diode
junction, in series with an eﬀective on-resistance. The temperature coeﬃcient of the IGBT for-
ward voltage drop is complicated by the fact that the diode junction voltage has a negative tem-
perature coeﬃcient, while the on-resistance has a positive temperature coeﬃcient. Fortunately,
near rated current the on-resistance dominates, leading to an overall positive temperature coeﬃ-
cient. In consequence, IGBTs can be easily connected in parallel, with a modest current derating.
Large modules are commercially available, containing multiple parallel-connected chips.
Characteristics of several commercially available single-chip IGBTs and multiple-chip
IGBT modules are listed in Table4.6.
4.5.3 Thyristors (SCR, GTO)
Of all conventional semiconductor power devices, the silicon-controlled rectiﬁer (SCR) is the
oldest, has the lowest cost per rated kV A, and is capable of controlling the greatest amount
of power. Devices having voltage ratings of 5000 to 7000 V and current ratings of several
thousand amperes are available. In utility dc transmission line applications, series-connected
light-triggered SCRs are employed in inverters and rectiﬁers that interface the ac utility system
Table 4.6 Characteristics of several commercial IGBTs
Part number Rated maximum
voltage
Rated average
current
VF (typical) tf (typical)
Single-chip devices
HGTP12N60A4 600 V 23 A 2.0 V 70 ns
HGTG32N60E2 600 V 32 A 2.4 V 0 .62 μs
HGTG30N120D2 1200 V 30 A 3.2 V 0 .58 μs
Multiple-chip modules
CM400HA-12E 600 V 400 A 2.7 V 0 .3 μs
CM300HA-24E 1200 V 300 A 2.7 V 0 .3 μs
CM800HA-34H 1700 V 800 A 3.3 V 0 .6 μs
High voltage modules
CM 800HB-50H 2500 V 800 A 3.15 V 1 .0 μs
CM 600HB-90H 4500 V 900 A 3.3 V 1 .2 μs

120 4 Switch Realization
Fig. 4.70 The SCR: ( a)
schematic symbol, ( b) equiv-
alent circuit
(a)
Anode (A)
Cathode (K)
Gate (G)
(b) Anode
Cathode
GateQ1
Q2
Fig. 4.71 Physical locations
of the eﬀective NPN and PNP
components of the SCR
A
n
p
GK
nn
p
K
Q1
Q2
to dc transmission lines which carry roughly 1 kA and 1 MV . A single large SCR ﬁlls a silicon
wafer that is several inches in diameter, and is mounted in a hockey-puck-style case.
The schematic symbol of the SCR is illustrated in Fig. 4.70a, and an equivalent circuit con-
taining NPN and PNP BJT devices is illustrated in Fig.4.70b. A cross-section of the silicon chip
is illustrated in Fig. 4.71.Eﬀective transistor Q1 is composed of the n, p, and n−regions, while
eﬀective transistor Q2 is composed of the p, n−, and p regions as illustrated.
The device is capable of blocking both positive and negative anode-to-cathode voltages.
Depending on the polarity of the applied voltage, one of thep–n−junctions is reverse-biased. In
either case, the depletion region extends into the lightly dopedn−region. As with other devices,
the desired voltage breakdown rating is obtained by proper design of the n−region thickness
and doping concentration.
The SCR can enter the on state when the applied anode-to-cathode voltage vAK is positive.
Positive gate current iG then causes eﬀective transistor Q1 to turn on; this in turn supplies base
current to eﬀective transistor Q2, and causes it to turn on as well. The e ﬀective connections
of the base and collector regions of transistors Q1 and Q2 constitute a positive feedback loop.
Provided that the product of the current gains of the two transistors is greater than one, then
the currents of the transistors will increase regeneratively. In the on state, the anode current is
limited by the external circuit, and both e ﬀective transistors operate fully saturated. Minority
carriers are injected into all four regions, and the resulting conductivity modulation leads to
very low forward voltage drop. In the on state, the SCR can be modeled as a forward-biased
diode junction in series with a low-value on-resistance. Regardless of the gate current, the SCR
is latched in the on state: it cannot be turned oﬀexcept by application of negative anode current

4.5 Minority-Carrier Transistors 121
Fig. 4.72 Static iA–vAK characteristics of
the SCR
iA
vAK
iG = 0
increasing iG
Forward
conducting
Reverse
blocking Forward
blocking
Reverse
breakdown
or negative anode-to-cathode voltage. In phase-controlled converters, the SCR turns oﬀat the
zero crossing of the converter ac input or output waveform. In forced commutation converters,
external commutation circuits force the controlled turn-oﬀof the SCR, by reversing either the
anode current or the anode-to-cathode voltage.
Static iA−vAK characteristics of the conventional SCR are illustrated in Fig. 4.72. It can
be seen that the SCR is a voltage-bidirectional two-quadrant switch. The turn-on transition is
controlled actively via the gate current. The turn-oﬀtransition is passive.
During the turn-oﬀtransition, the rate at which forward anode-to-cathode voltage is reap-
plied must be limited, to avoid retriggering the SCR. The turn-o ﬀtime t
q is the time required
for minority stored charge to be actively removed via negative anode current, and for recombi-
nation of any remaining minority charge. During the turn-oﬀtransition, negative anode current
actively removes stored minority charge, with waveforms similar to diode turn-o ﬀtransition
waveforms of Fig. 4.31. Thus, after the ﬁrst zero crossing of the anode current, it is necessary
to wait for time tq before reapplying positive anode-to-cathode voltage. It is then necessary to
limit the rate at which the anode-to-cathode voltage increases, to avoid retriggering the device.
Inverter-grade SCRs are optimized for faster switching times, and exhibit smaller values of t
q.
Conventional SCR wafers have large feature size, with coarse or nonexistent interdigitation
of the gate and cathode contacts. The parasitic elements arising from this large feature size lead
to several limitations. During the turn-on transition, the rate of increase of the anode current
must be limited to a safe value. Otherwise, cathode current focusing can occur, which leads to
formation of hot spots and device failure.
The coarse feature size of the gate and cathode structure is also what prevents the conven-
tional SCR from being turned oﬀby active gate control. One might apply a negative gate current,
in an attempt to actively remove all of the minority stored charge and to reverse-bias the p–n
gate-cathode junction. The reason that this attempt fails is illustrated in Fig.4.73.T h el a r g en e g -
ative gate current ﬂows laterally through the adjoining the p region, inducing a voltage drop as
shown. This causes the gate-cathode junction voltage to be smaller near the gate contact, and
relatively larger away from the gate contact. The negative gate current is able to reverse-bias
only the portion of the gate-cathode junction in the vicinity of the gate contact; the remainder
of the gate-cathode junction continues to be forward-biased, and cathode current continues to
ﬂow. In eﬀect, the gate contact is able to inﬂuence only the nearby portions of the cathode.
The gate turn oﬀthyristor, or GTO, is a more recent power device having small feature
size. The gate and cathode contacts highly interdigitated, such that the entire gate-cathode p–n

122 4 Switch Realization
A
n
p
GK
nn
p
K
++
G
iA
Fig. 4.73 Negative gate current is unable to completely reverse-bias the gate-cathode junction. The anode
current focuses away from the gate contact
junction can be reverse-biased via negative gate current during the turn-oﬀtransition. Like the
SCR, a single large GTO can ﬁll an entire silicon wafer. Maximum voltage and current ratings
of commercial GTOs are lower than those of SCRs.
The turn-oﬀgain of a GTO is the ratio of on-state current to the negative gate current magni-
tude required to switch the device oﬀ. Typical values of this gain are 2 to 5, meaning that several
hundred amperes of negative gate current may be required to turn oﬀa GTO conducting 1000 A.
Also of interest is the maximum controllable on-state current. The GTO is able to conduct peak
currents signiﬁcantly greater than the rated average current; however, it may not be possible to
switch the device oﬀunder gate control while these high peak currents are present.
4.6 Additional Sources of Switching Loss
Switching loss caused by transistor switching times with a clamped inductive load is introduced
in Sect. 4.2.2. Current tailing in IGBTs leads to this type of switching loss, as discussed in
Sect. 4.5.2. Diode reverse recovery also induces switching loss as modeled in Sect. 4.3.3.
Several other sources of switching loss are discussed in this section. Semiconductor output
capacitances store energy that is dissipated in the transistor at the transistor turn-on transition.
Inductances that eﬀectively are in series with the transistor store energy when the transistor
conducts; when the transistor turns o ﬀand interrupts the inductor current, the stored energy
is dissipated in the transistor. Diode reverse recovery can also induce switching loss in other
circuit elements. These additional mechanisms of switching loss are discussed in this section.
4.6.1 Device Capacitances, and Leakage, Package, and Stray Inductances
Reactive elements can also lead to switching loss. Capacitances that are eﬀectively in parallel
with switching elements are shorted out when the switch turns on, and any energy stored in
the capacitance is lost. The capacitances are charged without energy loss when the switching
elements turn oﬀ, and the transistor turn-oﬀloss W
of f computed in Eq. ( 4.5) may be reduced.

4.6 Additional Sources of Switching Loss 123
Fig. 4.74 The energy stored in the
semiconductor output capacitances is
lost during the transistor turn-on tran-
sition +
+Vg
Cds
Cj
Likewise, inductances that are eﬀectively in series with a switching element lose their stored
energy when the switch turns oﬀ. Hence, series inductances lead to additional switching loss at
turn-oﬀ, but can reduce the transistor turn-on loss.
The stored energies of the reactive elements can be summed to ﬁnd the total energy loss
per switching period due to these mechanisms. For linear capacitors and inductors, the stored
energy is
WC =
∑
capacitive
elements
1
2 CiV2
i (4.41)
WL =
∑
inductive
elements
1
2 LjI2
j
A common source of this type of switching loss is the output capacitances of the semiconductor
switching devices. The depletion layers of reverse-biased semiconductor devices exhibit capac-
itance which stores energy. When the transistor turns on, this stored energy is dissipated by
the transistor. For example, in the buck converter of Fig. 4.74, the MOSFET exhibits drain-to-
source capacitance C
ds , and the reverse-biased diode exhibits junction capacitance C j.D u r i n g
the switching transitions these two capacitances are eﬀectively in parallel, since the dc source
Vg is eﬀectively a short-circuit at high frequency. To the extent that the capacitances are linear,
the energy lost when the MOSFET turns on is
WC = 1
2
⎦
Cds+ C j
)
V2
g (4.42)
Typically, this type of switching loss is signiﬁcant at voltage levels above 100 V . The MOS-
FET gate drive circuit, which must charge and discharge the MOSFET gate capacitances, also
exhibits this type of loss.
As noted in Sect. 4.4.1, the incremental drain-to-source capacitance C
ds of the power MOS-
FET is a strong function of the drain-to-source voltage vds. Cds(vds) follows an approximate
inverse-square root dependence of vds, as given by Eq. ( 4.39). The energy stored in Cds at
vds= VDS is
WCds=
∫
vdsiCdt=
∫ VDS
0
vdsCds(vds)dvds (4.43)
where iC = Cds (vds)dvds/dt is the current in Cds. Substitution of Eq. (4.39)i n t o(4.43) yields
WCds=
∫ vDS
0
C′
0(vds)√vds dvds= 2
3 Cds(VDS)V2
DS (4.44)

124 4 Switch Realization
This energy is lost each time the MOSFET switches on. From the standpoint of switching loss,
the drain-to-source capacitance is equivalent to a linear capacitance having the value4
3 Cds (VDS).
The Schottky diode is essentially a majority-carrier device, which does not exhibit a reverse-
recovery transient such as in Fig. 4.31. Reverse-biased Schottky diodes do exhibit signiﬁcant
junction capacitance, however, which can be modeled with a parallel capacitorC j as in Fig.4.74,
and which leads to energy loss at the transistor turn-on transition.
Common sources of series inductance are transformer leakage inductances in isolated con-
verters (discussed in Chap. 6), as well as the inductances of interconnections and of semicon-
ductor device packages. In addition to generating switching loss, these elements can lead to
excessive peak voltage stress during the transistor turn-oﬀtransition. Interconnection and pack-
age inductances can lead to signiﬁcant switching loss in high-current applications, and leakage
inductance is an important source of switching loss in many transformer-isolated converters.
4.6.2 Inducing Switching Loss in Other Elements
Diode stored minority charge can induce switching loss in the (nonideal) converter reactive
elements. As an example, consider the circuit of Fig. 4.75, containing an ideal voltage source
vj(t), an inductor L, a capacitor C (which may represent the diode junction capacitance, or
the junction capacitance in parallel with an external capacitor), and a silicon diode. The diode
switching processes of many converter and rectiﬁer circuits can be modeled by a circuit of
this form. The voltage source produces the rectangular waveform v
i(t) illustrated in Fig. 4.76.
This voltage is initially positive, causing the diode to become forward-biased and the inductor
current iL(t) to increase linearly with slope V1/L. Since the current is increasing, the stored
minority charge inside the diode also increases. At time t= t1, the source voltage vi(t) becomes
negative, and the inductor current decreases with slope diL/dt = −V2/L. The diode stored
charge also decreases, but at a slower rate that depends not only on iL but also on the minority-
carrier recombination lifetime of the silicon material in the diode. Hence, at time t= t2, when
iL(t) reaches zero, some stored minority charge remains in the diode. So the diode continues
to be forward-biased, and the inductor current continues to decrease with the same slope. The
negative current for t> t
2 constitutes a reverse diode current, which actively removes diode
stored charge. At some time later, t= t3, the diode stored charge in the vicinity of the diode
junction becomes zero, and the diode junction becomes reverse-biased. The inductor current
is now negative, and must ﬂow through the capacitor. The inductor and capacitor then form a
series resonant circuit, which rings with decaying sinusoidal waveforms as shown. This ringing
is eventually damped out by the parasitic loss elements of the circuit, such as the inductor
winding resistance, inductor core loss, and capacitor equivalent series resistance.
The diode recovered charge induces loss in this circuit. During the interval t
2 < t< t3,t h e
minority stored charge Qr recovered from the diode is
Fig. 4.75 A circuit in which the diode
stored charge induces ringing, and ulti-
mately switching loss, in (nonideal) reac-
tive elements
+
LiL(t)
vL(t) +
Silicon
diodevi(t) CvB(t)
iB(t)

4.6 Additional Sources of Switching Loss 125
Fig. 4.76 Waveforms of the circuit of
Fig. 4.75
t
2
Area
r
t
V1
0
vi(t)
t
t3t1 t2
vB(t)
iL(t)
2
0
0
Qr=−
∫ t3
t2
iL(t)dt (4.45)
This charge is directly related to the energy stored in the inductor during this interval. The
energy WL stored in the inductor is the integral of the power ﬂowing into the inductor:
WL=
∫ t3
t2
vL(t)iL(t)dt (4.46)
During this interval, the applied inductor voltage is
vL(t)= LdiL(t)
dt =−V2 (4.47)
Substitution of Eq. (4.47) into Eq. (4.46) leads to
WL=
∫ t3
t2
LdiL(t)
dt iL(t)dt=
∫ t3
t2
(−V2)iL(t)dt (4.48)
Evaluation of the integral on the left side yields the stored inductor energy att= t3,o r Li2
L(t3)/2.
The right-side integral is evaluated by noting thatV2 is constant and by substitution of Eq. (4.45),
yielding V2Qr. Hence, the energy stored in the inductor at t= t3 is
WL= 1
2 Li2
L(t3)= V2Qr (4.49)
or, the recovered charge multiplied by the source voltage. Fort> t3, the ringing of the resonant
circuit formed by the inductor and capacitor causes this energy to be circulated back and forth

126 4 Switch Realization
between the inductor and capacitor. If parasitic loss elements in the circuit cause the ringing
amplitude to eventually decay to zero, then the energy becomes lost as heat in the parasitic
elements.
So diode stored minority charge can lead to loss in circuits that do not contain an active
switching element. Also, ringing waveforms that decay before the end of the switching period
indicate the presence of switching loss.
4.6.3 Eﬃciency vs. Switching Frequency
Suppose next that we add up all of the energies lost due to switching, as discussed above:
Wtot= Won+ Woﬀ+ WD+ WC+ WL+... (4.50)
This is the energy lost in the switching transitions of one switching period. To obtain the average
switching power loss, we must multiply by the switching frequency:
Psw= Wtot fsw (4.51)
Other losses in the converter include the conduction losses Pcond, modeled and solved as in
Chap. 3, and other frequency-independent ﬁxed losses Pfix e d, such as the power required to
operate the control circuit. The total loss is therefore
Ploss = Pcond+ Pfix e d+ Wtot fsw (4.52)
which increases linearly with frequency. At the critical frequency
fcrit = Pcond+ Pfix e d
Wtot
(4.53)
the switching losses are equal to the other converter losses. Below this critical frequency, the to-
tal loss is dominated by the conduction and ﬁxed loss, and hence the total loss and converter eﬃ-
ciency are not strong functions of switching frequency. Above the critical frequency, the switch-
ing loss dominates the total loss, and the converter eﬃciency decreases rapidly with increasing
switching frequency. Typical dependence of the full-load converter eﬃciency on switching fre-
quency is plotted in Fig.4.77, for an arbitrary choice of parameter values. The critical frequency
fcrit can be taken as a rough upper limit on the switching frequency of a practical converter.
4.7 Summary of Key Points
1. How an SPST ideal switch can be realized using semiconductor devices depends on the
polarity of the voltage that the devices must block in the oﬀstate, and on the polarity of the
current which the devices must conduct in the on state.
2. Single-quadrant SPST switches can be realized using a single transistor or a single diode,
depending on the relative polarities of the oﬀ-state voltage and on-state current.
3. Two-quadrant SPST switches can be realized using a transistor and diode, connected in se-
ries (bidirectional-voltage) or in antiparallel (bidirectional-current). Several four-quadrant
schemes are also listed here.
```
