---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第4章part 1 - 4 Switch Realization
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 82-101 > Chunk ID: `chapter-4-part-1`"
---

# 第4章part 1 - 4 Switch Realization

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 82-101  
> Chunk ID: `chapter-4-part-1`

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
4
Switch Realization
We have seen in previous chapters that the switching elements of the buck, boost, and several
other dc–dc converters can be implemented using a transistor and diode. One might wonder
why this is so, and how to realize semiconductor switches in general. These are worthwhile
questions to ask, and switch implementation can depend on the power processing function be-
ing performed. The switches of inverters and cycloconverters require more complicated imple-
mentations than those of dc–dc converters. Also, the way in which a semiconductor switch is
implemented can alter the behavior of a converter in ways not predicted by the ideal-switch
analysis of the previous chapters—an example is the discontinuous conduction mode treated in
the next chapter. The realization of switches using transistors and diodes is the subject of this
chapter.
i
v
+
–
1
0
Fig. 4.1 SPST switch,
with deﬁned voltage and
current polarities
Semiconductor power devices behave as single-pole single-throw
(SPST) switches, represented ideally in Fig. 4.1. So, although we of-
ten draw converter schematics using ideal single-pole double-throw
(SPDT) switches as in Fig. 4.2a, the schematic of Fig. 4.2b contain-
ing SPST switches is more realistic. The realization of a SPDT switch
using two SPST switches is not as trivial as it might at ﬁrst seem,
because Fig. 4.2a,b are not exactly equivalent. It is possible for both
SPST switches to be simultaneously in the on state or in the oﬀstate,
leading to behavior not predicted by the SPDT switch of Fig. 4.2a. In
addition, it is possible for the switch state to depend on the applied
voltage or current waveforms—a familiar example is the diode. In-
deed, and it is common for these phenomena to occur in converters
operating at light load, or occasionally at heavy load, leading to the discontinuous conduction
mode previously mentioned. The converter properties are then signiﬁcantly modiﬁed.
How an ideal switch can be realized using semiconductor devices depends on the polarity
of the voltage that the devices must block in the oﬀstate, and on the polarity of the current that
the devices must conduct in the on state. For example, in the dc–dc buck converter of Fig.4.2b,
switch A must block positive voltageVg when in the oﬀstate, and must conduct positive current
iL when in the on state. If, for all intended converter operating points, the current and blocking
voltage lie in a single quadrant of the plane as illustrated in Fig. 4.3, then the switch can be
implemented in a simple manner using a transistor or a diode. Use of single-quadrant switches
is common in dc–dc converters. Their operation is discussed brieﬂy here.
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_4
67

68 4 Switch Realization
L
CR
+
V
–
i
L(t)
+
–
1
2
Vg
L
CR
+
V
–
i
L(t)
+
–
+ vA –
–
vB
+
A
B
iA
iB
Vg
(a)
(b)
Fig. 4.2 Buck converter: (a) containing SPDT switch, (b) containing two SPST switches
Switch
off state voltage
Switch
on state
current
Fig. 4.3 A single-quadrant switch is capable of
conducting currents of a single polarity, and of
blocking voltages of a single polarity
In inverter circuits, two-quadrant switches
are required. The output current is ac, and hence
is sometimes positive and sometimes negative.
If this current ﬂows through the switch, then its
current is ac, and the semiconductor switch re-
alization is more complicated. A two-quadrant
SPST switch can be realized using a transistor
and diode. The dual case also sometimes oc-
curs, in which the switch current is always posi-
tive, but the blocking voltage is ac. This type of
two-quadrant switch can be constructed using a
diﬀerent arrangement of a transistor and diode.
Cycloconverters generally require four-quadrant
switches, which are capable of blocking ac volt-
ages and conducting ac currents. Realizations of
these elements are also discussed in this chapter.
Next, the synchronous rectiﬁer is examined.
The reverse-conducting capability of the metal-
oxide-semiconductor ﬁeld-eﬀect transistor (MOSFET) allows it to be used where a diode would
normally be required. If the MOSFET on-resistance is su ﬃciently small, then its conduction
loss is less than that obtained using a diode. Synchronous rectiﬁers are sometimes used in low-
voltage high-current applications to obtain improved eﬃciency. Several basic references treating
single-, two-, and four-quadrant switches are listed in the bibliography [4, 18–25].

4.1 Switch Applications 69
Several power semiconductor devices are brieﬂy discussed in Sect.4.2. Majority-carrier de-
vices, including the MOSFET and Schottky diode, exhibit very fast switching times, and hence
are preferred when the oﬀ-state voltage levels are not too high. Minority-carrier devices, includ-
ing the bipolar junction transistor (BJT), insulated-gate bipolar transistor (IGBT), and thyristors
[silicon-controlled rectiﬁer (SCR) and gate turn-oﬀthyristor (GTO)] exhibit high breakdown
voltages with low forward voltage drops, at the expense of reduced switching speed. Recent
diodes and FET devices based on wide-bandgap semiconductors (SiC and GaN) represent a sig-
niﬁcant advance in the tradeoﬀbetween breakdown voltage, forward voltage drop, and switch-
ing times.
Having realized the switches using semiconductor devices, switching loss can next be dis-
cussed. There are a number of mechanisms that cause energy to be lost during the switching
transitions [26]. When a transistor drives a clamped inductive load, it experiences high instan-
taneous power loss during the switching transitions. Diode stored charge further increases this
loss, during the transistor turn-on transition. Energy stored in certain parasitic capacitances
and inductances is lost during switching. Parasitic ringing, which decays before the end of the
switching period, also indicates the presence of switching loss. Switching loss increases directly
with switching frequency, and imposes a maximum limit on the operating frequencies of practi-
cal converters.
4.1 Switch Applications
4.1.1 Single-Quadrant Switches
The ideal SPST switch is illustrated in Fig. 4.1. The switch contains power terminals 1 and 0,
with current and voltage polarities deﬁned as shown. In the on state, the voltagev is zero, while
the current i is zero in the oﬀstate. There is sometimes a third terminal C, where a control
signal is applied. Distinguishing features of the SPST switch include the control method (active
vs. passive) and the region of the i–v plane in which they can operate.
i
1
0
v
+
–
i
v
on
off
(a) (b)
Fig. 4.4 Diode symbol (a), and its ideal characteristic (b)
A passive switch does not contain
a control terminal C. The state of the
switch is determined by the waveforms
i(t) and v(t) applied to terminals 0 and
1. The most common example is the
diode, illustrated in Fig. 4.4. The ideal
diode requires that v(t)≤0 and i(t)≥0.
The diode is oﬀ(i = 0) when v < 0,
and is on ( v= 0) when i> 0. It can
block negative voltage but not positive
voltage. A passive SPST switch can be
realized using a diode provided that the
intended operating points [i.e., the val-
ues of v(t) and i(t) when the switch is in
the on and oﬀstates] lie on the diode characteristic of Fig. 4.4b.
The conducting state of an active switch is determined by the signal applied to the control
terminal C. The state does not directly depend on the waveforms v(t) and i(t) applied to ter-
minals 0 and 1. The BJT, MOSFET, IGBT, GTO, and MCT are examples of active switches.
Idealized characteristics i(t)v s .v(t) for the BJT and IGBT are sketched in Fig. 4.5. When the

70 4 Switch Realization
i
v
on
off
i
1
0
v
+
–
C
i
1
0
v
+
–
C
)b()a(
Fig. 4.5 Bipolar junction transistor (BJT) and insulated-gate bipolar transistor (IGBT) symbols (a), and
their idealized switch characteristics (b)
i
v
on
off
on
(reverse conduction)
i
1
0
v
+
–
C
(a) (b)
Fig. 4.6 Power MOSFET symbol (a), and its idealized switch characteristic (b)
control terminal causes the transistor to be in the o ﬀstate, i= 0 and the device is capable of
blocking positive voltage: v≥0. When the control terminal causes the transistor to be in the
on state, v= 0 and the device is capable of conducting positive current: i≥0. The reverse-
conducting and reverse-blocking characteristics of the BJT and IGBT are poor or nonexistent,
and have essentially no application in the power converter area. The power MOSFET (Fig.4.6)
has similar characteristics, except that it is able to conduct current in the reverse direction. With
one notable exception (the synchronous rectiﬁer discussed later), the MOSFET is normally op-
erated with i≥0, in the same manner as the BJT and IGBT. So an active SPST switch can be
realized using a BJT, IGBT, or MOSFET, provided that the intended operating points lie on the
transistor characteristic of Fig. 4.5b.
To determine how to implement an SPST switch using a transistor or diode, one compares
the switch operating points with the i−v characteristics of Figs. 4.4b, 4.5b, and 4.6b. For exam-
ple, when it is intended that the SPDT switch of Fig. 4.2a be in position 1, SPST switch A of

4.1 Switch Applications 71
iA
vA
iL
(a) (b)
Vg
Switch A
on
Switch A
off
iB
vB
iL
–Vg
Switch B
on
Switch B
off
Fig. 4.7 Operating points of switch A,( a), and switch B,( b), in the buck converter of Fig.4.2b
Fig. 4.2b is closed, and SPST switch B is opened. Switch A then conducts the positive inductor
current, iA = iL, and switch B must block negative voltage, vB =−Vg. These switch operating
points are illustrated in Fig.4.7. Likewise, when it is intended that the SPDT switch of Fig.4.2a
be in position 2, then SPST switch A is opened and switch B is closed. Switch B then conducts
the positive inductor current, iB= iL, while switch A blocks positive voltage, vA= Vg.
By comparison of the switch A operating points of Fig. 4.7a with Figs. 4.5b and 4.6b, it can
be seen that a transistor (BJT, IGBT, or MOSFET) could be used, since switch A must block
positive voltage and conduct positive current. Likewise, comparison of Fig. 4.7b with Fig. 4.4b
reveals that switch B can be implemented using a diode, since switch B must block negative
voltage and conduct positive current. Hence a valid switch realization is given in Fig.4.8.
Figure 4.8 is an example of a single-quadrant switch realization: the devices are capable of
conducting current of only one polarity, and blocking voltage of only one polarity. When the
controller turns the transistor on, the diode becomes reverse-biased sincevB=−Vg. It is required
that Vg be positive; otherwise, the diode will be forward-biased. The transistor conducts current
iL. This current should also be positive, so that the transistor conducts in the forward direction.
When the controller turns the transistor oﬀ, the diode must turn on so that the inductor cur-
rent can continue to ﬂow. Turning the transistor oﬀcauses the inductor current iL(t) to decrease.
Since vL(t)= LdiL(t)/dt, the inductor voltage becomes su ﬃciently negative to forward-bias
the diode, and the diode turns on. Diodes that operate in this manner are sometimes called
freewheeling diodes. It is required that iL be positive; otherwise, the diode cannot be forward-
+
–
L iL(t)iA
vA
vB
+
–
iB
vL(t)
+–
+–
Vg
Fig. 4.8 Implementation of SPST switches of Fig. 4.2b using a transistor and diode

72 4 Switch Realization
biased since iB = iL. The transistor blocks voltage Vg; this voltage should be positive to avoid
operating the transistor in the reverse blocking mode.
4.1.2 Current-Bidirectional Two-Quadrant Switches
In any number of applications such as dc-ac inverters and servo ampliﬁers, it is required that
the switching elements conduct currents of both polarities, but block only positive voltages. A
current-bidirectional two-quadrant SPST switch of this type can be realized using a transistor
and diode, connected in an antiparallel manner as in Fig. 4.9.
The MOSFET of Fig. 4.6 is also a two-quadrant switch. However, it should be noted here
that practical power MOSFETs inherently contain a built-in diode, often called the body diode,
as illustrated in Fig.4.10a. The switching speed of the body diode typically is slower than that of
the MOSFET. If the body diode is allowed to conduct, then high peak currents can occur during
the diode tum-oﬀtransition. Some MOSFETs are not rated to handle these currents, and device
failure can occur. To avoid this situation, external series and antiparallel diodes can be added as
i
v
on
(transistor conducts)
off
on
(diode conducts)
i
1
0
v
+
–
C
(a) (b)
Fig. 4.9 A current-bidirectional two-quadrant SPST switch: ( a) implementation using a transistor and
antiparallel diode, (b) idealized switch characteristics
i
1
0
v
+
–
C
)b()a(
Fig. 4.10 The power MOSFET inherently contains a built-in body diode: (a) equivalent circuit, (b) addi-
tion of external diodes to prevent conduction of body diode

4.1 Switch Applications 73
+
–
L
+
–
Vg
Vg CR
Q1
Q2
D1
D2
iL
iA
iB
v0
+
–
vB
+
–
vA
+
–
Fig. 4.11 Inverter circuit using two-quadrant switches
Fig. 4.12 Output voltage vs. duty cycle,
for the inverter of Fig.4.11. This converter
can produce both positive and negative
output voltages
v0
D
Vg
–Vg
0
0.5 1
in Fig. 4.10b. Power MOSFETs can be speciﬁcally designed to have a fast recovery body diode,
and to operate reliably when the body diode is allowed to conduct the rated MOSFET current.
However, signiﬁcant switching loss induced by the diode reverse-recovery process (discussed
later in this chapter) may occur, depending on the switching speed and stored charge of the body
diode.
A SPDT current-bidirectional two-quadrant switch can again be derived using two SPST
switches as in Fig.4.2b. An example is given in Fig.4.11. This converter operates from positive
and negative dc supplies, and can produce an ac output voltagev(t) having either polarity. Tran-
sistor Q
2 is driven with the complement of the Q1 drive signal, so that Q1 conducts during the
ﬁrst subinterval 0< t< DTs, and Q2 conducts during the second subinterval DTs< t< Ts.
It can be seen from Fig. 4.11 that the switches must block voltage 2Vg. It is required that Vg
be positive; otherwise, diodes D1 and D2 will conduct simultaneously, shorting out the source.
It can be shown via inductor volt-second balance that
v0= (2D−1)Vg (4.1)
This equation is plotted in Fig.4.12. The converter output voltagev0 is positive for D> 0.5, and
negative for D< 0.5. By sinusoidal variation of the duty cycle,

74 4 Switch Realization
Fig. 4.13 The switches in the inverter of
Fig. 4.11 must be capable of conducting both
positive and negative current, but need block
only positive voltage
Switch
on state
current
Switch
off state
voltage
+
–Vg
ia
ib
ic
Fig. 4.14 The dc–3φac voltage-source inverter requires two-quadrant switches
D(t)= 0.5+ Dm sin(ωt) (4.2)
with Dn being a constant less than 0.5, the output voltage becomes sinusoidal. Hence this con-
verter could be used as a dc-ac inverter.
The load current is given by v0/R; in equilibrium, this current coincides with the inductor
current iL,
iL= v0
R = (2D−1)Vg
R (4.3)
The switches must conduct this current. So the switch current is also positive when D> 0.5,
and negative when D< 0.5. With high-frequency duty-cycle variations, the L−C ﬁlter may
introduce a phase lag into the inductor current waveform, but it is nonetheless true that switch
currents of both polarities occur. So the switch must operate in two quadrants of the plane, as
illustrated in Fig. 4.13. When i
L is positive, Q1 and D2 alternately conduct. When iL is negative,
Q2 and D1 alternately conduct.
A well-known dc-3øac inverter circuit, thevoltage-source inverter(VSI), operates in a simi-
lar manner. As illustrated in Fig.4.14, the VSI contains three two-quadrant SPDT switches, one
per phase. These switches block the dc input voltage Vg, and must conduct the output ac phase
currents ia, ib, and ic, respectively. Figure4.14 illustrates realization of the current-bidirectional
switches using IGBTs with antiparallel diodes.
Another current-bidirectional two-quadrant switch example is the bidirectional battery
charger/discharger illustrated in Fig. 4.15. This converter can be used, for example, to inter-

4.1 Switch Applications 75
L
Q1
Q2
D1
D2
vbatt
+
–
vbus
Spacecraft
main power bus
+
–
vbus > vbatt
Fig. 4.15 Bidirectional battery charger/discharger, based on the dc–dc buck converter
face a battery to the main power bus of a spacecraft. Both the dc bus voltagevbus and the battery
voltage vbatt are always positive. The semiconductor switch elements block positive voltage
vbus. When the battery is being charged, iL is positive, and Q1 and D2 alternately conduct cur-
rent. When the battery is being discharged, iL is negative, and Q2 and D1 alternately conduct.
At the time a diode would conduct, it is possible for the gate driver to turn on its antiparallel
MOSFET; the MOSFET then operates as asynchronous rectiﬁer as described in Sect. 4.1.5.A l -
though this is a dc–dc converter, it requires two-quadrant switches because the power can ﬂow
in either direction. Figure 4.15 illustrates realization of the current-bidirectional switches using
MOSFETs having fast-recovery body diodes.
Converters performing battery charging and battery discharging functions now ﬁnd signiﬁ-
cant application in portable electronic devices such as cell phones and laptop computers. When
the battery is being charged, the converter controller implements algorithms that control the
charging proﬁle needed by the battery. While the battery is being discharged, the converter
controller regulates the bus voltage.
4.1.3 Voltage-Bidirectional Two-Quadrant Switches
Switch
on state
current
Switch
off state
voltage
Fig. 4.16 V oltage-bidirectional two-quadrant
switch properties
Another type of two-quadrant switch, having
the voltage-bidirectional properties illustrated in
Fig. 4.16, is sometimes required. In applications
where the switches must block both positive
and negative voltages, but conduct only positive
current, an SPST switch can be constructed us-
ing a series-connected transistor and diode as in
Fig. 4.17. When it is intended that the switch
be in the oﬀstate, the controller turns the tran-
sistor oﬀ. The diode then blocks negative volt-
age, and the transistor blocks positive voltage.
The series connection can block negative volt-
ages up to the diode voltage rating, and positive
voltages up to the transistor voltage rating. The
silicon-controlled rectiﬁer is another example of
a voltage-bidirectional two-quadrant switch.

76 4 Switch Realization
Fig. 4.17 A voltage-bidirectional
two-quadrant SPST switch: ( a)i m -
plementation using a transistor and
series diode, ( b) idealized switch
characteristics
i
1
0
v
+
–
C
i
v
on
off
(transistor
blocks voltage)
off
(diode
blocks voltage)
(a) (b)
+
–
iL
Vg
φa
φb
φc
+
vab(t)
–
+
vbc(t)
–
Fig. 4.18 Dc–3φbuck–boost inverter
A converter that requires this type of two-quadrant switch is the dc-3øac buck–boost inverter
shown in Fig.4.18 [22]. If the converter functions in inverter mode, so that the inductor current
iL(t) is always positive, then all switches conduct only positive current. But the switches must
block the output ac line-to-line voltages, which are sometimes positive and sometimes negative.
Hence voltage-bidirectional two-quadrant switches are required.
4.1.4 Four-Quadrant Switches
The most general type of switch is the four-quadrant switch, capable of conducting currents of
either polarity and blocking voltages of either polarity, as in Fig. 4.19. There are several ways
of constructing a four-quadrant switch. As illustrated in Fig. 4.20b, two current-bidirectional
two-quadrant switches described in Sect. 4.1.2 can be connected back-to-back. The transistors
are driven on and oﬀsimultaneously. Another approach is the antiparallel connection of two
voltage-bidirectional two-quadrant switches described in Sect. 4.1.3,a si nF i g .4.20a. A third
approach, using only one transistor but additional diodes, is given in Fig.4.20c.
Cycloconverters are a class of converters requiring four-quadrant switches. For example, a
3øac-to-3øac matrix converter is illustrated in Fig.4.21. Each of the nine SPST switches is real-
ized using one of the semiconductor networks of Fig. 4.20. With proper control of the switches,
this converter can produce a three-phase output of variable frequency and voltage, from a given
three-phase ac input. Note that there are no dc signals in this converter: all of the input and
output voltages and currents are ac, and hence four-quadrant switches are necessary.

4.1 Switch Applications 77
Fig. 4.19 A four-quadrant switch can conduct
either polarity of current, and can block either
polarity of voltage
Switch
on state
current
Switch
off state
voltage
i
1
0
v
+
–
i
1
0
v
+
–
i
1
0
v
+
–
)c()b()a(
Fig. 4.20 Three ways of implementing a four-quadrant SPST switch
ib
ic
ia
+
–
+–
+–van(t)
vcn(t)
vbn(t)
tuptuocaø3tupnicaø3
Fig. 4.21 A3φac–3φac matrix converter, which requires nine SPST four-quadrant switches

78 4 Switch Realization
4.1.5 Synchronous Rectiﬁers
The ability of the MOSFET channel to conduct current in the reverse direction makes it possible
to employ a MOSFET where a diode would otherwise be required. When the MOSFET is
connected as in Fig. 4.22a [note that the source and drain connections are reversed from the
connections of Fig. 4.6a], the characteristics of Fig. 4.22b are obtained. The device can now
block negative voltage and conduct positive current, with properties similar to those of the
diode in Fig.4.4. The MOSFET must be controlled such that it operates in the on state when the
diode would normally conduct, and in the oﬀstate when the diode would be reverse-biased.
Thus, we could replace the diode in the buck converter of Fig. 4.8 with a MOSFET, as in
Fig. 4.23. The BJT has also been replaced with a MOSFET in the ﬁgure. MOSFETQ2 is driven
with the complement of the Q1 control signal.
The trend in computer power supplies is reduction of output voltage levels, from 3.3 V
to lower levels. As the output voltage is reduced, the diode conduction loss increases; in con-
sequence, the diode conduction loss is easily the largest source of power loss in a sub-3.3 V
power supply. Unfortunately, the diode junction contact potential limits what can be done to
reduce the forward voltage drop of diodes. Schottky diodes having reduced junction potential
can be employed; nonetheless, low-voltage power supplies containing diodes that conduct the
output current must have low eﬃciency.
i
1
0
v
+
–
C
i
v
on
off
on
(reverse conduction)
(a) (b)
Fig. 4.22 Power MOSFET connected as a synchronous rectiﬁer, (a), and its idealized switch characteris-
tics, (b)
+
–
L iL(t)iA
vA
vB
+
–
iB
+–
Q1
Q2
C
C
Vg
Fig. 4.23 Buck converter, implemented using a synchronous rectiﬁer

4.2 Introduction to Power Semiconductors 79
A solution is to replace the diodes with MOSFETs operated as synchronous rectiﬁers. The
conduction loss of a MOSFET having on-resistance Ron and operated with rms current is Irms ,
is Irms 2Ron. The on-resistance can be decreased by use of a larger MOSFET. So the conduction
loss can be reduced as low as desired, if one is willing to pay for a su ﬃciently large device.
Synchronous rectiﬁers ﬁnd widespread use in low-voltage power supplies.
The half-bridge MOSFET switches of Fig. 4.23 are also called synchronous switches and
this buck converter is often called a synchronous buck converter. Most often, the synchronous
rectiﬁer Q2 is driven with the complement of the gate drive signal that controls the main MOS-
FET Q1. Further details regarding gate drivers of synchronous buck converters are discussed in
Sect. 4.4.3.
4.2 Introduction to Power Semiconductors
4.2.1 Breakdown Voltage, Forward Voltage, and Switching Speed
The most fundamental challenge in power semiconductor design is obtaining a high breakdown
voltage, while maintaining low forward voltage drop and on-resistance [ 27, 28]. A closely re-
lated issue is the longer switching times of high-voltage low on-resistance devices; during these
switching times, signiﬁcant switching loss can be induced in the semiconductor devices. The
tradeoﬀbetween breakdown voltage, on-resistance, and switching times is a key distinguishing
feature of the various power devices.
The breakdown voltage of a reverse-biased p–n junction and its associated depletion re-
gion is a function of doping level: obtaining a high breakdown voltage requires low doping
concentration, and hence high resistivity, in the material on at least one side of the junction.
This high-resistivity region is usually the dominant contributor to the on-resistance of the de-
vice, and hence high-voltage devices must have higher on-resistance than low-voltage devices.
In majority-carrier devices, including the MOSFET and Schottky diode, this accounts for the
ﬁrst-order dependence of on-resistance on rated voltage. However,minority-carrier devices, in-
cluding the diﬀused-junction p–n diode, the bipolar junction transistor (BJT), the insulated-gate
bipolar transistor (IGBT), and the thyristor family (SCR, GTO), exhibit another phenomenon
known as conductivity modulation. When a minority-carrier device operates in the on state, mi-
nority carriers are injected into the lightly doped high-resistivity region by the forward-biased
p–n junction. The resulting high concentration of minority carriers eﬀectively reduces the ap-
parent resistivity of the region, reducing the on-resistance of the device. Hence, minority-carrier
devices exhibit lower on-resistances than comparable majority-carrier devices.
However, the advantage of decreased on-resistance in minority-carrier devices comes with
the disadvantage of decreased switching speed. The conducting state of any semiconductor de-
vice is controlled by the presence or absence of key charge quantities within the device, and
the turn-on and turn-oﬀswitching times are equal to the times required to insert or remove
this controlling charge. Devices operating with conductivity modulation are controlled by their
injected minority carriers. The total amount of controlling minority charge in minority-carrier
devices is much greater than the charge required to control an equivalent majority-carrier de-
vice. Although the mechanisms for inserting and removing the controlling charge of the vari-
ous devices can diﬀer, it is nonetheless true that, because of their large amounts of minority
charge, minority-carrier devices exhibit switching times that are signiﬁcantly longer than those

80 4 Switch Realization
of majority-carrier devices. In consequence, majority-carrier devices ﬁnd application at lower
voltage levels and higher switching frequencies, while the reverse is true of minority-carrier
devices.
The fundamental relationship between breakdown voltage, on-resistance, and switching
speed, is a function of the energy bandgap of the semiconductor material. Electrons having
low energy (in the valence band) are tightly bound to their atoms and do not participate in the
conduction of electrical current. Electrons having su ﬃciently high energy (in the conduction
band) are easily able to move from one atom to the next, and hence can participate in the con-
duction of current. The band gap of a semiconductor material is the energy diﬀerence between
the highest energy state of the valence band and the lowest energy state of the conduction band.
The bandgap of Silicon (Si) is approximately 1.1 eV .
Use of a wide-bandgap (WBG) semiconductor material can lead to a very signiﬁcant
improvement in this tradeoﬀbetween voltage breakdown, on-resistance, and switching time.
Power diodes and transistors based on Silicon Carbide (SiC, bandgap approximately 3.2 eV) or
Gallium Nitride (GaN, bandgap 3.4 eV) materials are now becoming commercially signiﬁcant.
These devices exhibit high-voltage characteristics that are superior to Silicon devices. Schottky
diodes based on SiC technology are widely available at 600 to 1700 V , and can signiﬁcantly
improve converter eﬃciency relative to Si technology. Commercial power MOSFET devices
based on SiC technology are available or have been announced at voltages of 600 V to 10
kV , and exhibit on-resistance and switching time far superior to what can be achieved with Si.
Power transistors based on GaN technology are also available at voltages up to 650 V; these
also exhibit signiﬁcantly better switching time and on-resistance.
A detailed description of power semiconductor device physics and switching mechanisms
is beyond the scope of this book. Selected references on power semiconductor devices are listed
in the reference section [ 8, 11, 26, 28–40]. Rather, this and the following sections discuss the
origins of switching times and forward voltage drop in power semiconductor devices at a high
level. The averaged models of Chap. 3 are then extended to include switching losses. How the
diﬀerent types of power semiconductor switches address the tradeoﬀbetween forward voltage
drop and switching speed is also considered.
4.2.2 Transistor Switching Loss with Clamped Inductive Load
The nonzero switching times of practical semiconductor devices lead to power loss during the
switching transitions. This loss, calledswitching loss, can signiﬁcantly reduce the eﬃciency of a
switching converter. Multiple physical mechanisms induce switching loss; the most signiﬁcant
are discussed throughout this chapter.
Consider ﬁrst the switching waveforms in the buck converter of Fig. 4.24. Let us treat the
diode as ideal, and investigate only the switching loss due to the transistor switching times.
Semiconductor output capacitances, transformer leakage inductances, diode reverse recovery,
and other sources of switching loss are neglected in this ﬁrst example. A MOSFET is illustrated
in Fig. 4.24, but the introductory arguments of this section could apply to any power transistor.
The diode and inductor present a clamped inductive load to the transistor. With such a load,
the transistor voltage v
A(t) and current iA(t) do not change simultaneously. For example, a mag-
niﬁed view of the transistor turn-oﬀ-transition waveforms is given in Fig. 4.25. For simplicity,
the waveforms are approximated as piecewise linear. The switching times are short, such that
the inductor current iL(t) is essentially constant during the entire switching transitiont0< t< t2.

4.2 Introduction to Power Semiconductors 81
+
LiL(t)iA
vA
vB
+
iBDTs Ts
+
Ideal
diode
Physical
MOSFET
Gate
driver
Vg
Fig. 4.24 MOSFET driving a clamped inductive load, buck converter example
Transistor
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
area
Woff
Vg iL
t0 t1 t2
iB(t)
vB(t)
Fig. 4.25 Magniﬁed view of transistor turn-oﬀtransition waveforms for the circuit of Fig.4.24
No current ﬂows through the diode while the diode is reverse-biased, and the diode cannot be-
come forward-biased while its voltage vB(t) is negative. So ﬁrst, the voltage vA(t) across the
transistor must rise from zero to Vg. The interval length (t1−t0) is essentially the time required
for the gate driver to charge the MOSFET gate-to-drain capacitance. The transistor currentiA(t)
is constant and equal to iL during this interval.
The diode voltage vB(t) and current iB(t)a r eg i v e nb y
vB(t)= vA(t)−Vg
iA(t)+ iB(t)= iL (4.4)

82 4 Switch Realization
At time t= t1, when vA = Vg, the diode becomes forward-biased. The current iL now begins to
commute from the transistor to the diode. The interval length (t2−t1) is the time required for the
gate driver to discharge the MOSFET gate-to-source capacitance down to the threshold voltage
which causes the MOSFET to be in the oﬀstate.
The instantaneous powerpA(t) dissipated by the transistor is equal tovA(t)iA(t). This quantity
is also sketched in Fig. 4.25. The energy Wof f lost during the transistor turn-oﬀtransition is the
area under this waveform. With the simplifying assumption that the waveforms are piecewise-
linear, then the energy lost is the area of the shaded triangle:
W
of f = 1
2 VgiL(t2−t0) (4.5)
This is the energy lost during each transistor turn-o ﬀtransition in the simpliﬁed circuit of
Fig. 4.24. A transistor having shorter switching time (t2−t0) would be expected to exhibit lower
energy lost during this switching transition.
The transistor turn-on waveforms of the simpliﬁed circuit of Fig.4.24 are qualitatively simi-
l a rt ot h o s eo fF i g .4.25, with the time axis reversed. The transistor current must ﬁrst rise from 0
to iL. The diode then becomes reverse-biased, and the transistor voltage can fall fromVg to zero.
The instantaneous transistor power dissipation again has peak value VgiL, and if the waveforms
are piecewise linear, then the energy lost during the turn-on transition Won i sg i v e nb y0 . 5VgiL
multiplied by the transistor turn-on time.
Thus, during one complete switching period, the total energy lost during the turn-on and
turn-oﬀtransitions is (Won+Wof f ). If the switching frequency is fs, then the average power loss
incurred due to switching is
Psw= 1
Ts
∫
switching
transitions
pA(t)dt= (Won+ Wof f ) fs (4.6)
So the switching loss Psw is directly proportional to the switching frequency. This loss is also
directly proportional to the energy losses Won and Wof f ; transistors having faster switching
speeds are expected to exhibit lower switching loss.
The above arguments constitute a simpliﬁed and highly idealized view of switching loss.
Unfortunately, often they are insuﬃcient to explain the observed converter behavior related to
switching loss; for example, they do not explain why zero-current switching of converters in-
corporating MOSFETs and diodes is inferior to zero-voltage switching (converters that employ
these soft-switching phenomena are the subject of Chaps. 22 and 23). Hence, the sections that
follow reﬁne these arguments to account for the eﬀects of diode reverse recovery, device output
capacitances, and similar phenomena.
4.3 The Power Diode
4.3.1 Introduction to Power Diodes
A p–n diode is illustrated in Fig. 4.26. The right side of the p–n junction is doped with donor
atoms that contribute weakly bound electrons to the semiconductor lattice, which can easily
move from atom to atom. The left side of the junction is doped with acceptor atoms that create

4.3 The Power Diode 83
Fig. 4.26 A p–n junction
diode
+ v
np +
+
+
+
+
+
+ +
+
Fig. 4.27 Creation of de-
pletion region at the p–n
junction
np +
+
+
+
+
+
+ +
+
+
+
+
+
+
E
vo +
holes, which can also easily move from atom to atom and eﬀectively act as positive charge carri-
ers. At the normal operating temperatures of the diode, these majority carriers exhibit thermally
induced vibrations that cause them to move randomly around the semiconductor lattice.
At the p–n junction, a depletion region forms. This occurs because the thermally induced
motion of the charge carriers causes them to diﬀuse in the direction of decreasing carrier concen-
tration. As illustrated in Fig.4.27, the concentration of mobile electrons is high on the right side
of the junction, and low on the left side, and hence electrons diﬀuse to the left. These electrons
become mobile minority carriers in the p region, having an energy state suﬃcient to continue
to easily move from atom to atom within the semiconductor lattice. In a similar manner, holes
diﬀuse into the n region, where they become minority carriers as well.
These mobile carriers leave behind ionized dopant atoms near the junction, causing an elec-
tric ﬁeld to form. For example, when a majority-carrier electron from the n region diﬀuses into
the p region, it leaves behind an ionized atom in the n region that is missing an electron and
therefore has net positive charge. Likewise, when holes from the p region diﬀuse into the n re-
gion, they leave behind ionized atoms having net negative charge. This region of ionized atoms
near the junction is called the space-charge layer,o r depletion region. These ionized atoms
within this region lead to an electric ﬁeld E, with net voltage v
o, as illustrated in Fig. 4.27.T h e
voltage vo constitutes an energy barrier which tends to oppose the diﬀusion of the mobile carri-
ers: it causes carriers to drift in the opposite direction. As more mobile carriers di ﬀuse across
the junction, the ﬁeld continues to build. The device comes to equilibrium when the voltage
and the electric ﬁeld strength are large enough to counteract the net diﬀusion of mobile charges
across the junction.
Figure 4.28 illustrates the situation in which an external voltage is applied that reverse-biases
the p–n junction. This external voltage causes the further ionization of dopant atoms near the
junction, and increases the size of the depletion region. Eﬀectively, the applied voltage appears
across the depletion region and the electric ﬁeld within this region is increased. Increasing
the reverse voltage requires that additional charge (from the external circuit) be added to the
depletion region; this is a capacitive eﬀect that leads to the junction capacitance of the diode.
Figure 4.29 illustrates the situation in which an external source forward-biases thep–n junc-
tion. This external source reduces the voltage across the p–n junction, such that the depletion

84 4 Switch Realization
Fig. 4.28 The diode
under reverse-bias condi-
tions
np +
+
+
+
+
+
+ +
+
+
+
+
+
+
E
vo ++
+
+
+
+
+
Fig. 4.29 The
diode under
forward-bias
conditions
np +
+
+
+
+
+
+ +
+
+
+
+
E
vo +
np
vo +
+
+
Hole concentrationElectron concentration
Fig. 4.30 Minority-carrier concentrations and recombination under forward-bias conditions
region electric ﬁeld is not large enough to counteract di ﬀusion of carriers across the junction.
Under these forward-bias conditions, holes from the p-region diﬀuse across the junction, and
become minority carriers in the n-region whose energy state is high enough to enable them be
mobile carriers. Similarly, electrons from the n-region diﬀuse across the junction and become
mobile minority carriers in the p-region.
Figure 4.30 illustrates the mechanisms for conduction of current under forward-bias condi-
tions. Electrons enter then-region from the external circuit, through the contact at the right edge
of the n-region. These electrons become majority carriers in the n-region. Likewise, electrons
leave the p-region through the contact at the left side of the p-region, creating majority-carrier
holes in the p-region. Some of these majority carriers di ﬀuse across the forward-biased p–n
junction, and become minority carriers.
A number of processes cause minority carriers to lose their energy and recombine with ma-
jority carriers. This occurs at some rate, and therefore the minority carriers last for an eﬀective
lifetimeτL before recombination. As the minority carriers diﬀuse away from the junction, their

4.3 The Power Diode 85
concentration diminishes through recombination as illustrated in Fig. 4.30. The slope of this
concentration curve determines the rate at which the minority carriers diﬀuse.
Under forward-bias conditions, the forward current consists entirely of recombination. A
majority carrier from the external circuit enters the semiconductor at one of the contacts. This
majority carrier may recombine with a minority carrier. Alternatively, it may diﬀuse across the
junction, become a minority carrier, and then recombine.
Under forward-bias conditions, the diode is charge controlled. It can be shown that the
voltage v across the depletion region is related to the minority charge concentrations p
s and ns
at the edge of the depletion region according to the diode equation (written below as a function
of the hole concentration at the right edge of the depletion region of Fig. 4.30):
ps(t)= Qs0
⎦
eλv(t)−1
)
(4.7)
The quantityλis kT/qe where k is Boltzmann’s constant, T is the Kelvin temperature, and
qe is the charge of the electron. This equation states that greater forward-bias leads to greater
minority charge injected across the junction. It also implies that the junction voltage cannot be
decreased unless the minority charge at the edge of the depletion region is decreased.
We can model the switching behavior using a lumped-element model of the minority charge.
In the simplest single-lump model, we letq(t) be equal to the total minority charge on one side of
the junction. This charge can reduce by recombination, and it can increase through application
of positive terminal current i(t). Hence we can write
dq(t)
dt = i(t)−q(t)
τL
(4.8)
In this equation, q/τL is the rate at which the minority carriers recombine. In equilibrium, the
total stored minority charge q(t) is related to the charge concentration ps(t)o r ns(t) at the edge
of the depletion region.
In equilibrium, the net stored minority charge does not change: dq(t)/dt = 0. Equations
(4.7) and (4.8) then predict
i(t)= q(t)
τL
= Q0
τL
⎦
eλv(t)−1
)
= I0
⎦
eλv(t)−1
)
(4.9)
This is the traditional exponential diode equation. It can be seen that this is an equilibrium
expression, and it does not hold during transient conditions ( i.e. during the diode switching
times). In particular, during the diode turn-oﬀswitching transition, the voltagev(t) is determined
by the stored minority charge concentration according to Eq. ( 4.7). To reduce this voltage, the
stored minority charge must be removed. During the turn-oﬀswitching transition, the current
can deviate from Eq. (4.9); Eq. (4.8) predicts that negative current can actively reduce the stored
minority charge.
Figure 4.31 illustrates typical diode waveforms and stored minority charge concentration
proﬁles during the turn-oﬀtransient. Initially (for t ≤t0), the diode is in the on state, with
a forward voltage v(t0)> 0 and conducting current i(t0)= Ion. The depletion region extends
some distance x0 from the p–n junction; the shaded region illustrated in Fig. 4.31b denotes the
depletion region at t = t0.F o r x > x0, there is a distribution of stored minority charge as
illustrated in Fig. 4.31bf o rt= t0. The slope of this minority charge curve is proportional to the
rate at which the minority carriers diﬀuse; this slope at x= x0 is proportional to Ion.

86 4 Switch Realization
(a)
i(t)
0
v(t)
t
t0 t1 t2 t3 t4
Ion
Voff
(b)
Minority
charge
x
t = t0
t1
t2
0 x0 t = t3x3
Fig. 4.31 The diode reverse-recovery process: ( a) waveforms of diode voltage v and diode current i;
(b) minority charge concentration on one side of the p–n junction
At time t= t0, the external circuit begins to reverse the direction of the applied current i(t).
The rate di/dt at which the current changes is determined by the external circuit, and typically
is limited by wiring and package inductances, transistor driver circuitry, etc.
The current has become negative at time t= t1. The total stored charge, which is the area
under the minority charge concentration curve of Fig.4.31b, has been reduced by both negative
current and by recombination according to Eq.4.8. The slope of the charge concentration curve
at the edge of the depletion region is negative, reﬂecting the reversal of current across the junc-
tion. Because of its polarity, the electric ﬁeld within the depletion region does not oppose the
ﬂow of minority carriers in the reverse direction, and the current i(t) now includes minority car-
riers ﬂowing backwards across the depletion region. Since the minority charge concentration at
x= x0 is still substantial, Eq. (4.7) predicts that the voltage across the depletion region remains
positive. Because of the exponential nature of the diode equation, the voltage v(t)a t t= t1 is
only slightly reduced from its initial value, and the diode remains forward-biased.
At time t = t2, the stored minority charge at x = x0 has been removed. Equation ( 4.7)
now predicts that the voltage across the depletion region can become negative. However, stored
minority charge remains for x> x0, as illustrated in Fig. 4.31b. For t> t2, this minority charge
continues to be removed, while the voltage becomes more negative. At timet= t3, the depletion
region has increased in size, and extends to x= x3 [not shown in Fig. 4.31b]. Finally, at time
t= t4, all of the minority stored charge has been removed. The diode now blocks the full reverse
voltage Vof f , with no substantial reverse current.
Let us consider the power consumption of the diode during the reverse-recovery process, as
predicted by the waveforms of Fig.4.31a. For t< t0, the power ﬂowing into the diode is
p(t)= v(t)i(t)= VF Ion (4.10)
where VF is the forward voltage drop of the diode given by Eq. ( 4.9). This is the conduction
loss of the diode. At time t= t1, the current has reversed while the voltage remains positive;
```
