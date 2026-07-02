---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 1 Introduction
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 19-30 > Chunk ID: `chapter-1`"
---

# 1 Introduction

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 19-30  
> Chunk ID: `chapter-1`

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
1
Introduction
1.1 Introduction to Power Processing
The ﬁeld of power electronics is concerned with the processing of electrical power using elec-
tronic devices [1–7]. The key element is the switching converter, illustrated in Fig. 1.1. In gen-
eral, a switching converter contains power input and control input ports, and a power output port.
The raw input power is processed as speciﬁed by the control input, yielding the conditioned out-
put power. One of several basic functions can be performed [ 2]. In a dc–dc converter, the dc
input voltage is converted to a dc output voltage having a larger or smaller magnitude, possibly
with opposite polarity or with isolation of the input and output ground references. In an ac-dc
rectiﬁer, an ac input voltage is rectiﬁed, producing a dc output voltage. The dc output voltage
and/or ac input current waveform may be controlled. The inverse process, dc–ac inversion,i n -
volves transforming a dc input voltage into an ac output voltage of controllable magnitude and
frequency. Ac-ac cycloconversion involves converting an ac input voltage to a given ac output
voltage of controllable magnitude and frequency.
Control is invariably required. It is nearly always desired to produce a well-regulated output
voltage, in the presence of variations in the input voltage and load current. As illustrated in
Fig. 1.2, a controller block is an integral part of any power processing system.
High eﬃciency is essential in any power processing application. The primary reason for
this is usually not the desire to save money on one’s electric bills, nor to conserve energy, in
spite of the nobility of such pursuits. Rather, high eﬃciency converters are necessary because
construction of low-eﬃciency converters, producing substantial output power, is impractical.
The eﬃciency of a converter having output power Pout and input power Pin is
Fig. 1.1 The switching converter, a
basic power processing block
Switching
converter
Power
input Power
output
Control
input
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_1
1

2 1 Introduction
Fig. 1.2 A controller is generally
required
Switching
converter
Power
input Power
output
Control
input
Controller
Reference
FeedbackFeedforward
η= Pout
Pin
(1.1)
The power lost in the converter Ploss = Pin−Pout can be related to the output power as:
Q= Pout
Ploss
= η
1−η (1.2)
0 0.5 1 1.5
0.2
0.4
0.6
0.8
h
1
Ploss / Pout
Fig. 1.3 Converter power loss vs. eﬃciency
Equation (1.2)i sp l o t -
ted in Fig. 1.3. The quan-
tity Q = Pout/Ploss is a
fundamental measure of
the quality of the power
converter. The loss P
loss
is converted into heat by
the converter circuit el-
ements and must be re-
moved by a cooling sys-
tem. In most applica-
tions, the maximum out-
put power is limited by
the capacity of the cool-
ing system to remove
this heat, and this lim-
its the maximum allow-
able output power. If the
loss power is substantial,
then a large and expen-
sive cooling system is
needed, the circuit ele-
ments within the converter may operate at high temperature, and the system reliability may be
reduced. Indeed, at high output powers, it may be impossible to adequately cool the converter
elements using a given cooling technology.

1.1 Introduction to Power Processing 3
Increasing the eﬃciency is the key to obtaining higher output powers. For example, if the
converter eﬃciency is 90%, then the converter loss power is equal to only 11% of the output
power and Pout/Ploss = 9. For a given cooling system technology and size, there is a maximum
amount of Ploss that can be handled. With this maximum loss, the maximum output power then
depends on the converter Q and eﬃciency according to Fig. 1.3. It can be seen that the output
power can be increased if the eﬃciency is increased. In this way,Q (and, less directly, eﬃciency
η) is a good measure of the success of a given converter technology. Figure 1.4 illustrates a
converter that processes a large amount of power, with very high Q. Since very little power
is lost, the converter elements can be packaged with high density and a small cooling system,
leading to a converter of small size and weight, and of low temperature rise.
Converter
Small converter
Large output powerLarge input power
Pin Pout
Fig. 1.4 A goal of current technology is to construct converters of small size and weight, which process
substantial power at high eﬃciency
How can we build a circuit that changes the voltage, yet dissipates negligible power? The
various conventional circuit elements are illustrated in Fig. 1.5. The available circuit elements
fall broadly into the classes of resistive elements, capacitive elements, magnetic devices includ-
ing inductors and transformers, semiconductor devices operated in the linear mode (for exam-
ple, as class A or class B ampliﬁers), and semiconductor devices operated in the switched mode
(such as in logic devices where transistors operate in either the fully on or fully o ﬀstates). In
conventional signal processing applications, where eﬃciency is not the primary concern, mag-
netic devices are usually avoided wherever possible, because of their large size and the diﬃculty
DTs Ts
Resistors Capacitors Magnetics Semiconductor devices
Linear-
mode
+
–
Switched-mode
Fig. 1.5 Devices available to the circuit designer [2]

4 1 Introduction
of incorporating them into integrated circuits. In contrast, capacitors and magnetic devices are
important elements of switching converters, because ideally they do not consume power. It is the
resistive element, as well as the linear-mode semiconductor device, that is avoided [2]. Switched-
mode semiconductor devices are also employed. When a semiconductor device operates in the
oﬀstate, its current is zero and hence its power dissipation is zero. When the semiconductor de-
vice operates in the on (saturated) state, its voltage drop is small and hence its power dissipation
is also small. In either event, the power dissipated by the semiconductor device is low. So ca-
pacitive and inductive elements, as well as switched-mode semiconductor devices, are available
for synthesis of high-eﬃciency converters.
Let us now consider how to construct the simple dc–dc converter example illustrated in
Fig. 1.6. The input voltageV
g is 100 V . It is desired to supply 50 V to an eﬀective 5Ωload, such
that the dc load current is 10 A.
+
–
+
V
50 V
–
Vg
100 V
Dc-dc
converter
I
10 A
R
5 W
Fig. 1.6 A simple power processing example: construction of a 500 W dc–dc converter
Introductory circuits textbooks describe a low-e ﬃciency method to perform the required
function: the voltage divider circuit illustrated in Fig. 1.7a. The dc–dc converter then consists
simply of a variable resistor, whose value is adjusted such that the required output voltage is
obtained. The load current ﬂows through the variable resistor. For the speciﬁed voltage and
current levels, the power P
loss dissipated in the variable resistor equals the load power Pout =
500 W. The source Vg supplies power Pin = 1000 W. Figure 1.7b illustrates a more practical
implementation known as the linear series-pass regulator. The variable resistor of Fig. 1.7ai s
replaced by a linear-mode power transistor, whose base current is controlled by a feedback
system such that the desired output voltage is obtained. The power dissipated by the linear-
mode transistor of Fig.1.7b is approximately the same as the 500 W lost by the variable resistor
in Fig. 1.7a. Series-pass linear regulators generally ﬁnd modern application only at low power
levels of a few watts.
Figure 1.8 illustrates another approach. A single-pole double-throw (SPDT) switch is con-
nected as shown. The switch output voltagev
s(t) is equal to the converter input voltageVg when
the switch is in position 1, and is equal to zero when the switch is in position 2. The switch po-
sition is varied periodically, as illustrated in Fig. 1.9, such that v
s(t) is a rectangular waveform
having frequency fs and period Ts = 1/ fs. The duty cycle D is deﬁned as the fraction of time
in which the switch occupies position 1. Hence, 0 ≤D≤1. In practice, the SPDT switch is
realized using switched-mode semiconductor devices, which are controlled such that the SPDT
switching function is attained.

1.1 Introduction to Power Processing 5
+
– R
5 W
+
V
50 V
–
Vg
100 V
I
10 A
+ 50 V –
Ploss = 500 W
Pout = 500 WPin = 1000 W
+
– R
5 W
+
V
50 V
–
Vg
100 V
I
10 A+ 50 V –
Ploss ≈ 500 W
Pout = 500 WPin ≈ 1000 W
+–Linear amplifier
and base driver
Vref
(a)
(b)
Fig. 1.7 Changing the dc voltage via dissipative means: (a) voltage divider, (b) series pass regulator
+
– R
+
v(t)
50 V
–
1
2
+
vs(t)
–
Vg
100 V
I
10 A
Fig. 1.8 Insertion of SPDT switch which changes the dc component of the voltage
vs(t) Vg
DTs (1 – D) Ts
0
t
switch
position: 12 1
Vs = DVg
Fig. 1.9 Switch output voltage waveform vs(t)

6 1 Introduction
The switch changes the dc component of the voltage. Recall from Fourier analysis that the
dc component of a periodic waveform is equal to its average value. Hence, the dc component of
vs(t)i s
Vs= 1
Ts
∫ Ts
0
vs(t)dt= DVg (1.3)
Thus, the switch changes the dc voltage, by a factor equal to the duty cycle D. To convert the
input voltage Vg = 100 V into the desired output voltage of V= 50 V, a duty cycle of D= 0.5
is required.
Again, the power dissipated by the switch is ideally zero. When the switch contacts are
closed, then their voltage is zero and hence the power dissipation is zero. When the switch
contacts are open, then the current is zero and again the power dissipation is zero. So we have
succeeded in changing the dc voltage component, using a device that is ideally lossless.
In addition to the desired dc component V
s, the switch output voltage waveform vs(t)a l s o
contains undesirable harmonics of the switching frequency. In most applications, these harmon-
ics must be removed, such that the output voltage v(t) is essentially equal to the dc component
V= Vs. A low-pass ﬁlter can be employed for this purpose. Figure 1.10 illustrates the introduc-
tion of a single-section L–C low-pass ﬁlter. If the ﬁlter comer frequency f0 is suﬃciently less
than the switching frequency fs, then the ﬁlter essentially passes only the dc component ofvs(t).
To the extent that the switch, inductor, and capacitor elements are ideal, the e ﬃciency of this
dc–dc converter can approach 100%.
+
– R
+
v(t)
–
1
2
+
vs(t)
–
Vg
100 V
i(t)
L
C
Ploss small Pout = 500 WPin ≈ 500 W
Fig. 1.10 Addition of L–C low-pass ﬁlter, for removal of switching harmonics
In Fig. 1.11, a control system is introduced for regulation of the output voltage. Since the
output voltage is a function of the switch duty cycle, a control system can be constructed that
varies the duty cycle to cause the output voltage to follow a given reference. Figure 1.11 also
illustrates a typical way in which the SPDT switch is realized using switched-mode semicon-
ductor devices. The converter power stage developed in Figs. 1.8, 1.9, 1.10, 1.11 is called the
buck converter, because it reduces the dc voltage.
Converters can be constructed that perform other power processing functions. For example,
Fig. 1.12 illustrates a circuit known as the boost converter, in which the positions of the induc-
tor and SPDT switch are interchanged. This converter is capable of producing output voltages
that are greater in magnitude than the input voltage. In general, any given input voltage can
be converted into any desired output voltage, using a converter containing switching devices
embedded within a network of reactive elements.

1.1 Introduction to Power Processing 7
(t)
TsdTs t
+
–
+
v
–
v
g
Switching converterPower
input
Load
–+
Compensator
vref
Reference
input
HvPulse-width
modulator
vc
Transistor
gate driver
Gc(s)
H(s)
ve
Error
signal
Sensor
gain
i
Fig. 1.11 Addition of control system to regulate the output voltage
+
–
L
CR
+
V
–
1
2
Vg
D
0 0.2 0.4 0.6 0.8 1
V
5Vg
4Vg
3Vg
2Vg
Vg
0
(a)
(b)
Fig. 1.12 The boost converter: (a) ideal converter circuit, (b) output voltage V vs. transistor duty cycle D
Figure 1.13a illustrates a simple dc-1øac inverter circuit. As illustrated in Fig. 1.13b, the
switch duty cycle is modulated sinusoidally. This causes the switch output voltage vs(t) to con-
tain a low-frequency sinusoidal component. The L–C ﬁlter cutoﬀfrequency f0 is selected to
pass the desired low-frequency components of vs(t), but to attenuate the high-frequency switch-

8 1 Introduction
1
2
+
–
Load
+ v(t)–
2
1
Vg
vs(t)
–+
t
vs(t)
(a)
(b)
Fig. 1.13 A bridge-type dc-1φac inverter: (a) ideal inverter circuit, ( b) typical pulse-width-modulated
switch voltage waveform vs(t), and its low-frequency component
ing harmonics. The controller modulates the duty cycle such that the desired output frequency
and voltage magnitude are obtained.
1.2 Several Applications of Power Electronics
The power levels encountered in high-eﬃciency switching converters range from (1) less than
one watt, in dc–dc converters within battery-operated portable equipment, to (2) tens, hundreds,
or thousands of watts in power supplies for computers and o ﬃce equipment, to (3) kilowatts
to megawatts, in variable-speed motor drives, to (4) roughly 1000 megawatts in the rectiﬁers
and inverters that interface dc transmission lines to the ac utility power system. The converter
systems of several applications are illustrated in this section.
A power supply system for a laptop computer is illustrated in Fig. 1.14. A lithium battery
powers the system, and several dc–dc converters change the battery voltage into the voltages
required by the loads. A buck converter produces the low-voltage dc required by the micropro-
cessor. A boost converter increases the battery voltage to the level needed by the disk drive. An
inverter produces high-voltage high-frequency ac to drive lamps that light the display. A charger
with transformer isolation converts the ac line voltage into dc to charge the battery. The converter
switching frequencies are typically in the vicinity of several hundred kilohertz; this leads to sub-
stantial reductions in the size and weight of the reactive elements. Power management is used,
to control sleep modes in which power consumption is reduced and battery life is extended.
In a distributed power system , an intermediate dc voltage appears at the computer backplane.
Each printed circuit card contains high-density dc–dc converters that produce locally regulated
low voltages. Commercial applications of power electronics include oﬀ-line power systems for
computers, oﬃce and laboratory equipment, uninterruptable ac power supplies, and electronic
ballasts for gas discharge lighting.

1.2 Several Applications of Power Electronics 9
vac(t)
iac(t) Charger
PWM
Rectifier
Lithium
battery
ac line input
Inverter
Buck
converter
Boost
converter
Display
backlighting
Microprocessor
Power
management
Disk
drive
Fig. 1.14 A laptop computer power supply system
Solar
array
+
vbus
–
Batteries
Battery
charge/discharge
controllers
Dc-dc
converter
Payload
Dc-dc
converter
Payload
Dissipative
shunt regulator
Fig. 1.15 Power system of an earth-orbiting spacecraft
Figure 1.15 illustrates a power system of an earth-orbiting spacecraft. A solar array produces
the main power bus voltage Vbus. DC–DC converters convert Vbus to the regulated voltages
required by the spacecraft payloads. Battery charge /discharge controllers interface the main
power bus to batteries; these controllers may also contain dc–dc converters. Aerospace applica-
tions of power electronics include the power systems of aircraft, spacecraft, and other aerospace
vehicles.
Figure 1.16 illustrates an electric vehicle power and drive system. Batteries are charged
by a converter that draws high power-factor sinusoidal current from a single-phase or three-
phase ac line. The batteries supply power to variable-speed ac motors to propel the vehicle. The
speeds of the ac motors are controlled by variation of the electrical input frequency. Inverters
produce three-phase ac output voltages of variable frequency and variable magnitude, to control
the speed of the ac motors and the vehicle. A dc–dc converter steps down the battery voltage

10 1 Introduction
3øac line
50/60 Hz
Battery
charger
battery
+
vb
–
Variable-frequency
Variable-voltage ac
Inverter
ac machine
Inverter
Inverter
ac machine
DC-DC
converter
µP
system
controller
Vehicle
electronicsLow-voltage
dc bus
control bus
ac machine ac machine
Inverter
Fig. 1.16 An electric vehicle power and drive system
to the lower dc levels required by the electronics of the system. Applications of motor drives
include speed control of industrial processes, such as control of compressors, fans, and pumps;
transportation applications such as electric vehicles, subways, and locomotives; and motion
control applications in areas such as computer peripherals and industrial robots.
Power electronics also ﬁnds application in other diverse industries, including dc power sup-
plies, uninterruptable power supplies, and battery chargers for portable electronics, electric ve-
hicles, and the telecommunications industry; inverter systems for renewable energy generation
applications such as wind and photovoltaic power; and utility power systems applications in-
cluding high-voltage dc transmission and static VAR (reactive volt-ampere) compensators.
1.3 Elements of Power Electronics
One of the things that makes the power electronics ﬁeld interesting is its incorporation of con-
cepts from a diverse set of ﬁelds, including:
•analog circuits
•electronic devices
•control systems
•power systems
•magnetics
•electric machines
•numerical simulation

1.3 Elements of Power Electronics 11
Thus, the practice of power electronics requires a broad electrical engineering background. In
addition, there are fundamental concepts that are unique to the power electronics ﬁeld, and that
require specialized study.
The presence of high-frequency switching makes the understanding of switched-mode con-
verters not straightforward. Hence, converter modeling is central to the study of power electron-
ics. As introduced in Eq. (1.3), the dc component of a periodic waveform is equal to its average
value. This ideal can be generalized, to predict the dc components of all converter waveforms
via averaging. In Part I of this book, averaged equivalent circuit models of converters operating
in steady state are derived. These models not only predict the basic ideal behavior of switched-
mode converters, but also model eﬃciency and losses. Realization of the switching elements,
using power semiconductor devices, is also discussed.
Design of the converter control system requires models of the converter dynamics. In PartII
of this book, the averaging technique is extended, to describe low-frequency variations in the
converter waveforms. Small-signal equivalent circuit models are developed, which predict the
control-to-output and line-to-transfer functions, as well as other ac quantities of interest. These
models are then employed to design converter control systems and to lend an understanding of
the well-known current-programmed control technique.
The magnetic elements are key components of any switching converter. The design of high-
power high-frequency magnetic devices having high e ﬃciency and small size and weight is
central to most converter technologies. High-frequency power magnetics design is discussed in
Part III.
More advanced control, design-oriented analysis, and simulation are the topics of Part IV.
The Feedback Theorem, Extra Element Theorem, andn-Extra Element Theorem are techniques
of design-oriented analysis that enable analytical solution and design of complex systems, based
on the ideas of null double injection. These techniques are applied to converter control systems,
damping internal resonances, designing input ﬁlters, and analyzing peak- and average-current
mode control. The average switch modeling approach to converter modeling is developed, and
is employed to model converter dynamics in the discontinuous conduction mode and to perform
SPICE-based averaged simulations of converters. High-frequency converter dynamics are con-
sidered based on the ideas of converter sampled-data modeling; this explains observed behavior
of discontinuous conduction mode converters and of current programmed converters are fre-
quencies approaching half of the switching frequency. Digital control of switching converters
is now implemented in a variety of converter applications; analog-to-digital converters, digital
pulse-width modulators, and digital compensators are modeled and discussed.
Pollution of the ac power system by rectiﬁer harmonics is a recognized problem. As a re-
sult, many converter systems now incorporate low-harmonic rectiﬁers, which draw sinusoidal
currents from the utility system. These modern rectiﬁers are considerably more sophisticated
than the conventional diode bridge: they may contain high-frequency switched-mode convert-
ers, with control systems that regulate the ac line current waveform. Modem rectiﬁer technology
is treated in Part V.
Resonant converters employ quasi-sinusoidal waveforms, as opposed to the rectangular
waveforms of the buck converter illustrated in Fig. 1.9. These resonant converters ﬁnd appli-
cation where high-frequency inverters and converters are needed. Resonant converters are mod-
eled in Part VI. Their loss mechanisms, including the processes of zero-voltage switching and
zero-current switching, are discussed.

Part I
Converters in Equilibrium
```
