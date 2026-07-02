---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: Index
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 1068-1081 > Chunk ID: `index`"
---

# Index

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 1068-1081  
> Chunk ID: `index`

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
Index
A
Air gap
in ac inductor, 501
in coupled inductor, 448, 471, 473
in ﬂyback transformer, 449, 478
in inductor, 416–418, 445, 459–462, 462, 464
in transformer, 421
AL (mH/1000 turns), 465
American wire gauge (AWG)
choice of, 465, 473, 491, 502
data, 1049–1050
design examples, 476, 479, 495, 499
vs. skin depth, 428
Amorphous alloys, 425
Amp-second balance, see capacitor charge balance
Ampere’s law,411, 414, 416, 431
Analog-to-digital (A/D) conversion, 805, 807
quantization eﬀects, 830–838
realization of, 837
sampling, 810
Apparent power, 858
Artiﬁcial ramp
circuit, 741, 741–743
eﬀect on CCM transfer functions, 754–755
eﬀect on CPM boost low-harmonic rectiﬁer,
886–889
eﬀect on line-to-output transfer function of
CCM buck, 758
eﬀect on noise immunity of CPM controller
circuits, 745
eﬀect on small-signal CCM models, 746, 749
eﬀect on small-signal DCM models, 780–786
eﬀect on stability of CPM controllers, 742–745
in simulation model, 764
introduction into CPM controllers, 738–746
Asymptotes, see Bode plots
Audiosusceptibility Gvg(s), see Line-to-output
transfer function
Average current control
boost design example, 791–797
feedforward, 883–885
in low-harmonic rectiﬁer systems, 881–886
modeling of, 786–797
transfer functions, 788–791
Average power
and Fourier series, 850–853
in nonsinusoidal systems, 850–857
modeled by power source element, 593–598,
608–609
power factor, 854–857
predicted by averaged models, 59
sinusoidal phasor diagram, 858–859
Averaged switch modeling, 547–578
buck, boost, and buck-boost forms, 558–565
combined CCM/DCM simulation model,
608–621
derivation by circuit averaging, 548–558
examples
buck-boost transient simulation, 575–578
CCM SEPIC, 549–558
nonideal SEPIC, 572–574
SEPIC with conduction loss, 569–571
in discontinuous conduction mode,
589–598
of current-programmed CCM converters,
733–738
of ideal DCM switch networks, 595
prediction of indirect power, 555–558
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4
1071

1072 Index
Averaged switch modeling (cont.)
simulation of CCM, 568
simulation with conduction loss, 571–572
Averaging
ac models of buck, boost, and buck–boost
converters, 233
ac models of buck, boost, and buck-boost
converters, 234
accuracy in prediction of conduction losses,
60
approximation, discussion of, 222–225
approximation, discussion of , 218
basic approach , 220–242
capacitor charge balance, 24
diode-induced switching loss in boost converter,
94–98
diode-induced switching loss in buck converter,
90–93
ﬂyback ac model, 234–242
inductor volt-second balance, 23
introduction to , 215–220
modeling 3φconverters, 919–921
modeling rectiﬁer output, 900–905
of inductor current in CPM, 747
of quasi-resonant converters, 1003–1025
state-space, 251–271
to ﬁnd dc component, 6, 16
B
Ballast, electronic, 933–934
resonant inverter design, 957–973
Battery charger, 8, 74
B–H loop
core loss, 423–424
in a conventional transformer, 180, 447
in a coupled inductor, 448
in a ﬁlter inductor, 445
in a ﬂyback transformer, 449, 479
in an ac inductor, 446
modeling of, 412–413
Bidirectional dc–dc converters, 74
Bipolar junction transistor (BJT)
breakdown mechanisms in, 114–115
construction and operation of, 111–115
current focusing, 114
idealized switch characteristics, 69–71
on resistance, 56, 111–113
quasi-saturation, 115
storage time, 113
stored minority charge in, 111–114
switching waveforms, 112–115
Bode plots
asymptote analytical expressions, 293
CCM buck-boost example, 309–314
combinations, 290–293
complex poles, 294–297
deﬁnitions, 279–281
frequency inversion, 289–290
graphical construction of, 317–331
addition of asymptotes, 318–322
closed-loop transfer functions, 353
division, 325–331
parallel combination, 322–324
parallel resonance, 323–324
parallel resonant converter, 950
reactance graph paper, 324
series resonance, 320–322
series resonant converter, 945
real pole, 281–285
real zero, 287
right half-plane (RHP) zero, 288, 315, 317
transfer functions of buck, boost, buck-boost
converters, 315
Body diode, see MOSFET
Boost converter
as inverted buck converter,164–165
as low-harmonic rectiﬁer, 872–875
averaged switch model, DCM, 598
current-programmed
small-signal ac model, CCM, 731
DCM characteristics, 152
equivalent circuit modeling of
steady state, CCM, 49–54
modeling switching loss in, 94–98
nonideal analysis of, 46–49
quasi-resonant zero-current switching, 1013
semiconductor conduction losses in, 56–60
small-signal ac model
CCM, 233, 251
DCM, 598–608
steady-state analysis of
CCM, 24–29
DCM, 145–152
transfer functions, CCM, 315
with capacitor ESR, 264–271
Bootstrap power supply, 107
Bridge conﬁguration (dc–dc converters)
boost-derived full bridge, 198–201
buck-derived full bridge, 181–185
buck-derived half bridge, 185–186
full bridge transformer design example,
496–499

Index 1073
minimization of transformer copper loss in,
468–470
Bridge conﬁguration (inverters)
single phase, 7, 170–173
three phase, 74, 174, 174
Buck 3φinverter, see V oltage source inverter
Buck converter, 15
analysis of closed-loop regulator via feedback
theorem, 528–540
as a high power factor rectiﬁer, 875
current-programmed
averaged switch model, CCM, 733–738
DCM characteristics, 152
employing synchronous rectiﬁer, 78–79
equivalent circuit modeling of
steady-state, CCM, 54–56
multi-resonant realization, 1019–1020
quasi-resonant realizations
zero-current switching, 1003–1015
zero-voltage switching, 1018
quasi-square wave realization, 1020–1025
small-signal ac model
DCM, 604–605
small-signal ac model, CCM, 251
steady-state analysis of
CCM, 15–24
DCM, 140–145, 598
switching loss in, 80–82, 90–93
transfer functions, CCM, 315
transfer functions, DCM, 605–606
Buck-boost converter, see also Flyback converter
as low-harmonic rectiﬁer, 878–880
averaged switch model, DCM, 589–606
current-programmed
ac simple model, CCM, 729–733
dc–3φac inverter, 76
DCM characteristics, 152, 595–598
ideal circuit and conversion ratio, 17
simulation of, 575–578
small-signal ac model, CCM, 251
small-signal ac model, DCM, 604–605
state-space averaging of, 259–264
transfer functions, CCM, 315
transfer functions, DCM, 606
transformer isolation in, 194–198
C
Canonical circuit model, 245–251
development of, 245–247
manipulation into canonical form, 248–250
results for basic converters, 250–251
Capacitor charge balance
boost converter example, 27
´Cuk converter example, 32
deﬁnition, 24
in discontinuous conduction mode, 140, 143
nonideal boost converter examples, 48, 58
Capacitor equivalent series resistance (ESR), 264,
862
Capacitor voltage ripple
boost converter example, 29
buck converter example, 35–37
´Cuk converter example, 35
in converters containing two-pole ﬁlters, 35–37
Charge balance, see Capacitor charge balance
Circuit averaging, 548–554
Compensators, see also Control system design
design example, 383–392
discrete-time, 812, 822–830
introduction, 347
lag, 380–382
lead, 377–379
lead-lag, 382–383
PD, 377–379
PI, 380–382
PID, 382–383
Complex power, 858
Computer power supply, 8
Conduction loss, see Copper loss, Semiconductor
conduction loss
Conductivity modulation, 79–80, 88, 101,
111–113, 115
Continuous time to discrete time mapping,
817–821
backward Euler approximation, 814
bilinear (Tustin), 817
forward Euler approximation, 814
trapezoidal approximation, 813
with prewarping, 819
Control system design, see also Compensators,
Negative feedback, 347–407
closed-loop transfer functions, 350–358
compensation, 376–392
design example, 383–392
digital control loop, 806–812, 822–827
for low-harmonic rectiﬁers
approaches, 880–894
control of dc output, 895–905
modeling average current control, 786–797
phase margin
Nyquist stability criterion, 364–369
test, 359

1074 Index
Control system design (cont.)
vs. closed-loop peaking, 370–373
vs. closed-loop transient response, 373–376
stability, 358–375
voltage regulator
block diagram, 347–349
design speciﬁcations, 376–377
Control-to-output transfer function
of current programmed converters, 736–737,
752–760
of DCM converters, 604–606, 621
simulation of, 611–618
Control-to-output transfer function Gvd(s)
by graphical construction, 330
input ﬁlter, eﬀect of, 677–685
of CCM buck, boost, and buck-boost converters,
315
predicted by canonical model, 247
Conversion ratio M, see also Switch conversion
ratioμ
by sinusoidal approximation, 938–944
in low-harmonic rectiﬁers, 870–872
modeling of, 44
of ´Cuk converter, 33, 598
of boost, 17, 151, 598
of buck, 17, 145, 598
of buck–boost, 17, 152
of buck-boost, 598
of loss-free resistor networks, 597
of parallel resonant converter, 947–950,
983–988
of resonant switch converters, 1012
of SEPIC, 598
of series resonant converter, 944–947, 977–983
Cooling system
size vs. Q, 2
Copper loss
allocation of window area to minimize,465–470,
487–488
high frequency eﬀects
proximity eﬀect, 442
skin eﬀect, 426
inductor design to meet speciﬁed, 459–465
low frequency, 426
modeling in converters, 46–54
multiple winding design to meet speciﬁed,
470–473
Core loss, 423–425, 479–481
Correction factor, see Extra element theorem
Coupled inductors, 448
design, 470–473
in ´Cuk and SEPIC converters, 453–454
in ﬂyback converter, 476–481
in multiple-output buck-derived converters, 448,
474–476
Crossover frequency, 354, 355, 359, 364, 365, 372,
377
´Cuk converter
as low-harmonic rectiﬁer, 875, 908
conversion ratio M(D), 33, 598
DCM averaged switch model of, 598
derivation by cascade connection, 168
derivation by rotation of three-terminal cell, 170
steady-state analysis of, 30–35
transformer design example, 492–496
Current injection, 396–397
Current mode, see Current programmed control
Current programmed control, 725–799
ac modeling of
CCM more accurate model, 746–760
CCM simple approximation, 728–738
via averaged switch modeling, CCM, 733–738
via averaged switch modeling, DCM, 779–786
addition of input ﬁlter to, 760–763
artiﬁcial ramp, 741–746
average current control, 786–797
controller circuit, 725
controller small-signal block diagram, 746–752
high-frequency dynamics, 772–779
in full-bridge buck converters, 184, 726
in half-bridge buck converters, 186, 727
in low-harmonic rectiﬁers, 886–889
in push-pull buck converters, 193
oscillation for D> 0.5, 738–746
simulation of, 763–769
susceptibility to noise, 727
with voltage feedback, 769–772
Current ripple, see Inductor current ripple
Current source inverter, 174
Current-fed bridge, 176
Current-programmed control
controller circuit, 725
Cycloconverter, 1, 76
D
Damping, see also Q factor, Input ﬁlters
by two resistive elements, high-Q approxima-
tion, 301–304
of input ﬁlters, 678, 691–704
Q factor, 295
vs. load step response, 375–376
vs. overshoot, 373–375

Index 1075
vs. phase margin, 370–373
DC conversion ratio, see Conversion ratio M
DC transformer model
derivation of, 43–46
in a nonideal boost converter, 51
in a nonideal buck converter, 55
in canonical model, 245
in small-signal ac model of boost with capacitor
ESR, 271
in small-signal ac models, 231, 233
manipulation of circuits containing, 45
Deadtime, 109
Decibel (dB), 280
Design-oriented analysis, techniques of
analytical expressions for asymptotes, 279, 293
analytical expressions for salient features, 310,
315
approximate factorization, 304–308
closed-loop peaking vs. phase margin, 370–373
damping the internal resonances of the SEPIC,
644–648
extra element theorem, 625–648
feedback theorem, 510–540
frequency inversion, 289–290, 293
graphical construction
of Bode plots, 317–331
of closed-loop transfer functions, 353–358
high-Q approximation, 301–304
input ﬁlter design inequalities, 684–685, 689,
692, 706
introduction to, 277–279
introduction to null double injection, 509–510
low-Q approximation, 298–301
n-extra element theorem, 648–668
philosophy of, 277
Digital control, 805
compensator design, 822–827
control loop, 806–812
delay in the control loop, 811
design example, 824–827
design procedure, 823
discrete-time systems, 812–821
implementation, 827–838
quantization eﬀects, 830–836
Digital pulse-width modulation (DPWM), 805,
807–812
quantization eﬀects, 830–838
realization of, 836–837
sampling, 810
Diode
antiparallel, 72–73
characteristics of, 89
fast recovery, 88
forward voltage drop, see also Semiconductor
conduction losses, 56, 87–89
freewheeling, 71
parallel operation of, 89
recovered charge Qr, 87, 92, 997, 998
recovery mechanisms, 85–87
Schottky, 88
SiC, 89, 105
snubbing of, 999
soft recovery, 87
switching loss, 90–98, 997, 998, 1000
switching waveforms, 86, 90
wide bandgap, 89
zero-current switching of, 953
zero-voltage switching of, 955
Direct forward transmission through feedback path
G0, 512
Discontinuous conduction mode (DCM), 135–154,
585–624
boost converter analysis, 145, 152
buck converter analysis, 140, 145
current programmed control, 779–786
equivalent circuit modeling of, 585–622
high-frequency dynamics in, 618–621
in low-harmonic rectiﬁers
boost rectiﬁer, 873–875
ﬂyback rectiﬁer, 878–880
in parallel resonant converter, 984–988
in series resonant converter, 979–983
mode boundary
in boost rectiﬁer, 875
vs. load current and R
e, 598
vs. K, 135–140
origin of, 135–140
results for basic converters, 152
simulation of, 608–618
small-signal ac modeling of, 600–606
to reset forward transformer, 190
Displacement factor, 855, 858
Distortion factor, 855–856, see also Total harmonic
distortion
of single phase rectiﬁer, 856–857
Distributed power system, 8
Duty ratio D
complement of, 16
deﬁnition of, 16
eﬀect of switching times on, 90, 94

1076 Index
E
Eddy currents
in magnetic cores, 424–425
in winding conductors, 426–430
Eﬀective resistance Re
in DCM averaged switch model, 592–598
in loss-free resistor model, 592–598
in resonant converter models
with capacitive ﬁlter network, 942
with inductive ﬁlter network, 949
Eﬃciency, 1
calculation via averaged model, 52, 59
converter Q, 2
of boost converter
low-harmonic rectiﬁer, 910–917
nonideal dc-dc, 52
vs. switching frequency, 126
Electric vehicle powertrain, 9
Emulated resistance Re, 868
Equilibrium, see Steady state
Equivalent circuit modeling
of CCM converters operating in steady state,
43–61
of converters having pulsating input currents,
54–56
of diode-induced switching loss, 90–98
of ﬂyback converter, CCM, 197
of ideal rectiﬁers, 868–870, 885, 896–900
of switch networks
DCM, 589–598
small-signal ac models
canonical, 250–251
CCM, 230–234
DCM, 600–606
Equivalent series resistance (esr) of capacitor, see
Capacitor equivalent series resistance (ESR)
Experimental techniques
measurement of impedances, 333–336
grounding problems, 334
measurement of loop gains
by current injection, 396–397
by voltage injection, 394–395
of an unstable system, 397–398
measurement of small-signal transfer functions,
332–333
Extra element theorem, 625–673
applications of
damping a two-section input ﬁlter, 700–704
damping the internal resonances of the SEPIC,
644–648
input ﬁlter design, 679–691
resonant inverter, load dependence of,
961–965
derivation of, 628–631
impedance inequalities, 631–632
reciprocity relationship, 967
summary of, 626–627
F
Factorization, approximate
approximate roots of arbitrary degree
polynomial, 304–308
graphical construction of Bode diagrams,
317–331
high Q approximation, 301–304
low Q approximation, 298–301
Faraday’s law,410–411
Feedback theorem, 510–540
buck regulator example , 528–540
derivation of , 513–518
gain G0, 512
ideal forward gain G∞, 512
loop gain T, 511
null loop gain Tn, 512
op amp PD compensator example , 519–528
reciprocity relationship, 518
summary of , 510–513
Ferrite
applications of, 446, 447, 474–481, 494–497
core loss, 424, 425
core tables, 1044–1048
saturation ﬂux density, 413
Fill factor, see Ku
Filter inductor
B–H loop of, 444
design of
derivation of procedure, 459–464
Kg design procedure, 464–465
FluxΦ, 410, 413, 415–417, 461
Flux density B
deﬁnition, 410
saturation, 412–413, 415
Flux-linkage balance, see Inductor volt-second
balance
Flyback converter, see also Buck-boost converter
ac model of, 234–242
derivation of, 194–195
modeling losses in, 210
multiple outputs, 198, 211
steady-state analysis of, 195–197
two transistor version, 205
Flyback transformer, 195, 449

Index 1077
Forward converter, see also Buck converter,
187–192
steady-state analysis of, 187–191
transformer reset mechanisms, 187–191
transformer utilization in, 192
two-transistor version, 191
Four-quadrant switch, see Switch
Freewheeling diode, 71
G
G∞(ideal closed-loop forward gain), 512
G0 (open-loop disturbance transfer function, or
direct forward transmission), 512
GaN
2D electron gas, 106
FET, 105
reverse conduction, 106
Gate driver, 107–111
bootstrap power supply, 107
deadtimes, 108
undervoltage lockout (UVLO), 108
Gate turn-oﬀthyristor (GTO), 121
Graphical construction of Bode plots, see Bode
plots
Gyrator characteristic of SRC, 980
H
H-bridge, 7, 181–185
Half bridge
gate drive considerations, 107–111
transformer-isolated buck-derived, 185
Harmonic correction, 922
Harmonic loss factor FH , 442
Harmonics in power systems
average power vs. Fourier series, 850–853
distortion factor, 855
in three-phase systems, 859–861
neutral currents, 859–861
power factor, 854–857
rectiﬁer harmonics, 856–857
root-mean-square value of waveform, 853
total harmonic distortion, 856
HEMT, 106
Hot spot formation, 89, 115, 121
Hysteretic control, 889
I
Ideal rectiﬁer, see also Low harmonic rectiﬁers
in converter systems, 895–905
properties of, 868–870
realization of, 870–880
three-phase, 917
Indirect power, 555–558
Inductor copper loss, see Copper loss
Inductor current ripple
boost example, 29
buck example, 20–22
calculation of, 21
´Cuk converter example, 35
in a ﬁlter inductor, 444
in an ac inductor, 446
in converters containing two-pole ﬁlters, 37
magnitude vs. DCM, 139
Inductor design
ac inductor design
derivation, 500–501
procedure, 501–502
ﬁlter inductor design
derivation, 459–464
Kg design procedure, 464–465
Inductor volt-second balance
boost converter example, 27
buck converter example, 24
´Cuk converter example, 32
deﬁnition, 23
in discontinuous conduciton mode, 140
Input ﬁlters, 675–723
cascaded ﬁlter sections, 700–704
conducted EMI, attenuation of, 675–676
conducted susceptibility, 676
damping of
objectives, 689–692
Rf −Cb parallel damping, 694–696
Rf −Lb parallel damping, 696–698
Rf −Lb series damping, 698
eﬀect on control-to-output transfer function
buck example, 676–679
general result, 679–682, 684–685
introduction of RHP zeroes, 690
with current mode control, 760–763
eﬀect on output impedance, 682
impedance inequalities for design, 684–685,
762–763
negative incremental input resistance, 682–684
stability criteria, 704–720
Input port, converter
ac equivalent circuit model, 231
ac modeling of, 226–227
boost static characteristics, 872–875, 887–888
modeling via state-space averaging, 260
steady-state modeling of, 54–56
Inrush current, 897

1078 Index
Insulated-gate bipolar transistor (IGBT)
construction of, 115–119
current tailing in, 116, 122
equivalent circuit, 116
forward voltage drop, modeling of, 119
idealized switch characteristics, 70
parallel operation of, 119
switching loss in, 118
Inverters, 1
high frequency, 933–934, 958–973
single phase, 7, 73, 170–173
three phase, 74, 76, 174, 174
Iron laminations, 413, 424
K
K, dimensionless parameter
critical value Kcrit(D), 138–140, 144–147,
151–152
DCM boundary, 139–140, 146–147, 152
steady-state DCM analysis, 144–145, 151–153,
597
Kg, core geometrical constant
deﬁnition of, 463–464, 1043
ferrite core tables of, 1044–1048
ﬁlter inductor design using, 464–465
multiple winding magnetics design using,
470–473
Kgfe , ac core geometrical constant
ac inductor design using, 499–502
deﬁnition of, 489, 1043
ferrite core tables of, 1044–1048
transformer design using
derivation, 486–490
examples, 492–499
ﬁrst-pass procedure, 490–492
Ku, window utilization factor, 462
L
LCC resonant converter, 933, 961, 964–967, 969
Lenz’s law,411, 424, 426, 428
Line-to-output transfer function Gvg(s)
by graphical construction, 331
closed-loop, 351, 355
control system design of, 376, 389, 390
in closed-loop block diagram, 386
of CCM buck, boost, and buck-boost converters,
315
of DCM converters, 605
predicted by canonical model, 247
Linear ripple approximation, see Small ripple
approximation
Litz wire, 440
LLC resonant converter, 933, 972–973
Loop gain, see also Control system design,
Negative feedback, Feedback theorem
buck regulator example, 537
compensator design, 376–392
crossover frequency, 354
deﬁnition based on block diagram, 351
deﬁnition based on null double injection, 511
eﬀect on closed-loop disturbance transfer
functions, 351
eﬀect on closed-loop reference-to-output
transfer function, 353
measurement of , 392–398
null loop gain, 512
op amp example, 522
phase margin test, 359
Loss-free resistor model
averaged switch model of DCM, 592–598
ideal rectiﬁer model
single phase, 868–870
three phase, 917
Low harmonic rectiﬁers, see also Ideal rectiﬁers,
see also Ideal rectiﬁers
controller schemes
average current control, 881–886
critical conduction mode, 889–892
current programmed control, 886–889
hysteretic control, 889
nonlinear carrier control, 892–894
modeling of
eﬃciency and losses, 910–917
low-bandwidth control loop, 900–905
rms calculations in, 905–910
M
Magnetic circuits, 415–418
Magnetic ﬁeld H, 409, 412–413
Magnetics, 409–451
ac inductor design, 499–502
basic relationships, 409–415
copper loss, 426, 463, 487–488
core loss, 423–425, 486–487
coupled inductor design, 465–476
ﬂyback transformer design, 476–481
inductor design, 459–465
magnetic circuits, 415–418
magnetic devices, types of, 444–449
optimizingΔB to minimize total loss, 485,
488–490

Index 1079
optimizing window allocation to minimize
copper loss, 465–470
proximity eﬀect, 426–442
transformer basics, 178–181, 418–423
transformer design, 485–499
Magnetizing current, 180, 420
Magnetomotive force (MMF)
deﬁnition, 409
eﬀect of interleaving on, 438–440
in magnetic circuits, 415–417
MMF diagrams, 431–432, 434
Majority carrier devices, see also MOSFET,
Schottky diode, 79
Matrix converter, 76
Mean length per turn (MLT )
deﬁnition, 463
ferrite core tables, 1044–1048
Measurement of transfer functions and loop gains,
see Experimental techniques
Minority carrier devices, see also Bipolar Junction
Transistor, Diode, Insulated Gate Bipolar
Transistor, 79
Modulation index, 921
MOSFET
as a current-bidirectional switch, 72
as a synchronous rectiﬁer, 78
body diode, 72, 101
capacitances, 101
characteristics, 101
conduction loss, modeling of, 56–60
construction, 99
deadtime, 109
gate drivers, 107–111
idealized switch characteristics, 70
parasitic BJT, 101
SiC, 103–105
snubber, 1001
superjunction, 103
switching loss induced by Cds , 123, 1000
switching loss with clamped inductive load, 80
zero-voltage and zero-current switching of,
1002–1003
Motor drive, 9
Multiplying controller, see also Average current
control, current programmed control,
884–886
Multiresonant switch, 1019–1020
N
n-extra element theorem, 648–668
bridge-T ﬁlter example, 658–661
damped input ﬁlter example, 662–668
frequency inversion, 661–668
introduction, 649–653
procedure, 653–654
two-section LC ﬁlter example, 654–658
Negative feedback, see also Control system design
eﬀect on bandwidth, 355
eﬀects of, on network transfer functions,
350–353
objectives of, 215, 347–351
reduction of disturbances by, 355–358
reduction of sensitivity to variations in forward
gain, 353
Nonlinear carrier control, 892–894
Nonminimum phase zero, see Right half-plane
zero
Null loop gain Tn, 512
Nyquist stability criterion, 360–369
encirclements of−1 point, 363
input ﬁlter stability analysis, 718–720
modiﬁcation of Nyquist contour for special
cases, 367–369
Nyquist contour, 362–363
phase margin, 364
principle of the argument, 360–362
stability test, 363–364
three crossover frequencies, 365–367
O
Op amp compensator circuit
analysis via feedback theorem, 519–528
Output characteristics
of LLC, 973
of parallel resonant converter, 986
of resonant inverters, 958–960, 975
of series resonant converter, 982–983
Output impedance Zout(s)
predicted by canonical model, 247
Overshoot, 373–375
P
Parallel resonant converter
analysis via sinusoidal approximation, 947–950
dependence of transistor current on load, 961
exact analysis, 983–988
introduction to, 933
Passthrough mode, 98
Permeability
deﬁnition, 412–413
of free spaceμ0, 412
relativeμr, 412

1080 Index
Phase asymptotes
complex poles, 296–297
inverted forms, 289
real pole, 284–285
real zero, 287
RHP zero, 288
Phase margin, 359, 366, 369, 373
in Nyquist stability criterion, 364–367
input ﬁlter, undamped, eﬀect on, 691
modiﬁcation of by input ﬁlter, 678, 706–710
stability test, 359
vs. closed-loop damping factor, 370–373
Powdered iron, 413, 425
Power factor, see also Total harmonic distortion,
Displacement factor, Distortion factor
deﬁnition of, 854
single-phase rectiﬁer, 856–857
with sinusoidal voltage, 855–857
Power sink element
deﬁnition of, 594
input port characteristic of ideal switching
regulator, 682
Power source element
deﬁnition of, 593–598
in ac-to-dc power supply system, 897–898
in averaged switch models
current programmed mode, CCM, 734–735
in DCM switch networks, 594
in ideal rectiﬁer model, 869, 918
in switched-mode regulators, 682–684
linearization of, 603–604
properties of, 596–598
Proximity eﬀect, 426–442
interleaving, eﬀect on, 438–440
layer copper loss, 434–435
Litz wire, eﬀect of, 440
MMF diagrams, 436–440
PWM waveform harmonics, 441–442
simple explanation, 428–430
transformer design procedure, accounting for,
488
winding loss, total, 436–438
winding porosityη, 433
Pulse-width modulation (PWM), 4–6
digital, 805, 807–812, 836–837
modeling of pulse-width modulator, 242–245
operation of pulse-width modulator, 242–243
spectrum of PWM waveform, 216
Push-pull isolated converters
based on boost converter, 201
based on buck converter, 192–193
based on Watkins-Johnson converter,201
Q
Q factor
closed-loop vs. phase margin, 370–373
converter quality factor, 2
ﬁnding analytical expression for, 311
graphical determination of, 321–324
high Q approximation, 301–304
load step response vs., 375–376
low Q approximation, 298–301
of complex poles, 295
overshoot vs., 373–375
predicted by canonical model, 315
Quasi-resonant converters, see also Multiresonant
converters, Quasi-square wave converters
zero-current switching, 1003–1015
full wave, 1014–1015
half wave, 1005–1014
zero-voltage switching, 1017–1018
Quasi-square wave converters, 1020–1025
Quasi-static approximation, 886
Quiescent operating point, 218, 227, 233,
244
R
Reactive power
deﬁnition, 858
Rectiﬁers, 1
energy storage in single phase, 895–900
high quality, 849
ideal, 868–870
ideal three phase, 917–922
in resonant dc–dc converter, 934, 940
in resonant dc-dc converter, 942,
947–949
line-commutated
single-phase, 856–857
Reluctance R, 416
Resonance
Bode plot of complex poles, 294–297
damping of, 691–698
graphical construction examples, 321–324
parallel resonant circuit, 322–324
series resonant circuit, 320–322

Index 1081
Resonant converters, see also Quasi-resonant
converters, Multi-resonant converters,
Quasi-square wave converters, Zero-voltage
transition converters, 933–988
analysis by sinusoidal approximation, 938–944
LCC, 960–971
LLC, 972–973
parallel resonant converter, 947–950, 983–988
properties of, 957–973
series resonant converter, 944–947, 977–983
soft switching in, 951–955
Resonant inverters, design of, 957–976
dependence of transistor current on load,
960–965
LCC example, 967–971
LLC example, 972–973
output characteristic, 958–960
results for basic tank networks, 973–976
ZCS/ZVS boundary, 965–967
Resonant link converters, 935
Right half-plane zero
Bode plot, 288
caused by input ﬁlter, 690
origins of, 316–317
Ripple, switching, 18–22, 35–37, 135–139, 216,
224
Root mean square value
comparison of ideal rectiﬁer topologies,
908–910
of commonly-observed converter waveforms,
1037–1042
of rectiﬁer waveforms, 905–910
vs. Fourier series, 853
S
Sampling
and delays in digital control loop, 810–812
of A/Dc o n v e r t e r ,806
of current-programmed controller, 773–779
of pulse-width modulator, 244–245, 811
Saturation
of inductors, 415, 418
of magnetic materials, 412–413
of transformers, 180, 421
Schottky diode, 88
Semiconductor conduction loss
boost converter example, 56–60
inclusion in ac model, 234, 259
with synchronous rectiﬁer, 79
Semiconductor power devices, see also Bipolar
junction transistor, Diode, Gate turn-oﬀ
thyristor, Insulated gate bipolar transistor,
Schottky diode, Silicon controlled rectiﬁer,
67–128
charge control of, 79, 85–87, 112–115
conductivity modulation, 79, 112
majority vs. minority carriers, 79
realization of switches using, 67–79
SEPIC, see Single-ended primary inductance
converter
Series pass regulator, 4
Series resonant converter
analysis via sinusoidal approximation, 938–947
dependence of transistor current on load, 964
exact characteristics
continuous conduction mode, 977–979
control plane characteristic, 980–982
discontinuous conduction mode, 979–980
output characteristic, 982–983
introduction to, 933, 934
subharmonic modes in, 946–947
zero-current switching in, 951–954
zero-voltage switching in, 954–955
SiC MOSFET, 104
Silicon controlled rectiﬁer (SCR), 119–122
equivalent circuit, 120
gate turn-oﬀthyristor, 121
inverter grade, 121
Simulation, 566–578, 608–618
CCM model including conduction losses,
571–572
combined CCM-DCM switch model, 608–614
combined CCM/DCM averaged switch
simulation model, 608–621
current programmed mode control model,
763–764
CCM model, 764–765
combined CCM-DCM model, 765–766
examples
buck voltage regulator, 614–618
buck with current programmed control,
766–769
SEPIC frequency response, 611–614
objectives, 566–568
of loop gain and closed-loop responses,614–618
Single quadrant switch, 69–72
deﬁnitions, 69
origins of DCM, 135–140
realization of, 69–72
Single-ended primary inductance converter
(SEPIC), 177
analysis via extra element theorem, 640–644

1082 Index
Single-ended primary inductance converter
(SEPIC) (cont.)
as a low-harmonic rectiﬁer, 875, 878, 908
average switch model of
CCM derivation, 548–554
combined CCM-DCM model, 611–614
discontinuous conduction mode, 598
losses and eﬃciency, 572–574
conversion ratio M(D), 177
damping the internal resonance, 644–648
Gvd as eﬀective buck-boost plus glitch, 641
indirect power in, 555–558
inverse of, 177, 201
transformer isolation in, 201
Skin eﬀect, see also Proximity eﬀect, 426–428
Small ripple approximation, see also Averaging
and average power loss, prediction of, 59–60
boost example, 26
buck example, 19–20
´Cuk example, 30–32
deﬁnition, 19
failure of in two-pole ﬁlters, 35
in discontinuous conduction mode, 140–141
Small-signal ac modeling, 218–220
canonical model, 245–251
equivalent circuit model, 230–234
of low harmonic rectiﬁers, 902–905
perturbation and linearization, 227–229,
232–233
via averaged switch modeling, 552–554,
563–565
Snubber networks, 115, 119, 999, 1001
Soft switching, see also Zero-current switch-
ing, Zero-voltage switching, see also
Zero-current switching, Zero-voltage
switching
Spacecraft power system, 9
SPICE, see Simulation
State-space averaging, 251–271
basic result, 255–259
boost example with capacitor ESR, 264–271
buck-boost example, 259–264
writing the state equations of a network,
252–254
Steady state
equilibrium point via state-space averaging, 255
inductor current waveform, 22–23
quiescent operating point, 218, 227
Subharmonic
modes of series resonant converter, 946–947,
982
numberξ, 977
Switch, see also Averaged switch modeling
averaged modeling of, 547–578
current-bidirectional two-quadrant, 72–75
four-quadrant, 76
ideal SPDT in converters, 4, 67
ideal SPST, 67
passive vs. active, 69–70
power dissipated by ideal, 6
quasi-resonant, 1003–1025
realization of, using semiconductor devices,
67–79
single-quadrant, 69–72
synchronous rectiﬁer, 78–79
synchronous switches, operation of, 107–111
voltage-bidirectional two-quadrant, 75–76
Switch conversion ratio
boost converter example, 1013–1014
combined CCM-DCM model, 610
deﬁnition, 608–610, 1005, 1012
of multiresonant switch, 1020
of quasi-resonant switches
full-wave ZCS, 1014
full-wave ZVS, 1018
half-wave ZCS, 1011
half-wave ZVS, 1018
of quasi-square wave switches, 1023
Switched mode, 4–6
Switching frequency
converter eﬃciency vs., 93, 126
deﬁnition of, 15
transformer size vs., 495–496
Switching harmonics, see also Ripple, switching, 6
removal of via averaging, 216–218, 224–225
Switching loss, see also Soft switching, Zero-
current switching, Zero-voltage switching,
122–126
boost converter model, 94–98
buck converter model, 90–93
current tailing in IGBTs, 117–119, 1003
device capacitances, 122–124, 1000
diode-induced, 90–98, 124–126, 997
eﬀect on converter eﬃciency, 126
equivalent circuit modeling of, 90–98
induced by diode reverse recovery,92
leakage inductance, 124–126, 999
ringing waveforms, 124, 998
with clamped inductive load, 80–82
Synchronous rectiﬁers, 78–79
Synchronous switches, 78–79, 107–111

Index 1083
T
Temperature rise
in a converter, 2
in magnetics, 1043
Thyristor, 119–122
Tn (null loop gain), 512
Topologies of converters, see also Boost, Bridge
conﬁguration, Buck, Buck-boost, etc.
cascade connections, 166–169
converter synthesis, 174–177
diﬀerential connection of load, 170–174
inversion of source and load, 164–165
low-harmonic rectiﬁers, 908–912
resonant converters, 933–937
resonant switch converters, 1016–1025
rotation of three-terminal cell, 169–170
transformer isolation, 178–202
Total harmonic distortion
deﬁnition, 856
of current-programmed rectiﬁers, 888
of peak detection rectiﬁer, 856
vs. distortion factor, 856
Transfer functions, see also Bode plots
graphical construction of, 325–331
input ﬁlter, eﬀect on, 679–691
measurement of, 332–333
of DCM converters, 600–608
of low-harmonic rectiﬁers, 900–905
of the buck, boost, and buck-boost converters,
315
predicted by canonical model, 245–247, 315
simulation of, 608–618
Transformer-isolated converters, 178–202
boost-derived, 198–201
´Cuk, 201–202
ﬂyback, 194–198
forward, 187–192
full-bridge buck-derived, 181–185
half-bridge buck-derived, 185–186
multiple outputs and cross-regulation, 179
push-pull buck-derived, 192–193
SEPIC, 201
transformer model, 179–181
use of volt-second balance in, 181
Transformers
B–H loop in, 180, 421
design of
derivation, 486–490
ﬁrst-pass procedure, 490–492
ﬂyback transformer, 476–481
winding area optimization, 465–470
ﬂyback transformer, 195, 449
in isolated converters, 178–202
leakage inductance, 181, 421–423
magnetizing inductance, 187, 420–421
modeling of, 178–181, 418–423
push-pull boost, 201
SEPIC transformer, 201
volt-second balance in, 179–181
Triplen harmonics
in three-phase four-wire networks, 860–861
in three-phase inverter/rectiﬁer modulation
schemes, 922
in three-phase three-wire networks, 861
Two-quadrant switch, see Switch
U
Undervoltage lockout (UVLO), 108
Universal input rectiﬁers, 897
V
V olt-second balance,see Inductor volt-second
balance
V oltage conversion ratio,see Conversion ratio M
V oltage injection,394–395
V oltage-source inverter,74, 919
W
Watkins-Johnson converter,174
inverse of, 176
isolated push-pull, 201
Wide bandgap devices, 80, 103–105
GaN FETs, 103–106
High electron mobility transistor (HEMT), 106
SiC MOSFETs, 103–105
SiC Schottky diode, 89
Window area WA
allocation of, to minimize total copper loss,
465–470
deﬁnition, 462
ferrite core tables, 1044–1048
Window utilization factor Ku, 462
Wire area AW
American wire gauge (AWG) table, 1049–1050
inductor design, 462, 465
Z
Zero-current switching, 936
eﬀect on diode-induced switching loss, 999
in quasi-resonant converters, 997–999, 999
in resonant converters, 951–954
ZCS-ZVS mode boundary, 965, 967

1084 Index
Zero-voltage switching, 936
in active-clamp snubber, 1029
in auxiliary resonant commutated pole, 1033
in multiresonant switch, 1019
in quasi-resonant converters, 999
in quasi-square wave converters, 1025
in resonant converters, 954–955
in zero-voltage transition converter, 1028
of MOSFETs, 1003
ZCS-ZVS mode boundary, 965–967
Zero-voltage transition buck-derived converter,
1025–1028
```
