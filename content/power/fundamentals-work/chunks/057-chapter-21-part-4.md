---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第21章part 4 - 21 Pulse-Width Modulated Rectifiers
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 926-930 > Chunk ID: `chapter-21-part-4`"
---

# 第21章part 4 - 21 Pulse-Width Modulated Rectifiers

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 926-930  
> Chunk ID: `chapter-21-part-4`

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
21.8 Summary of Key Points 927
with the ac input voltages given by Eq. (21.153). The input ﬁlter has negligible eﬀect
of the low-frequency components of the converter waveforms. Determine the steady-
state dc output voltage V, as a function of VM, Dm, and ϕ.
(e) Determine the power factor. You may assume that the input ﬁlter completely removes
the switching harmonics from the currents ia(t), ib(t), and ic(t). However, the input
ﬁlter elements consume or supply negligible line frequency reactive power.
21.9 In the three-phase DCM ﬂyback rectiﬁer of Fig. 21.49, the input ﬁlter has negligible ef-
fect on the low-frequency components of the input ac waveforms. The transistor operates
with switching frequency fs and duty cycle d. Flyback transformers T1, T2, and T3 each
have magnetizing inductance L referred to the primary, turns ratio n : 1, and have negli-
gible leakage inductances.
C
+
v(t)
dc output
ia(t)
ib(t)
ic(t)
Q1
D1 D3D2
D4 D5 D6
T1
T2
T3
a
b
c
3
input
Input filter
D7 D9D8
D10 D11 D12
T1
T2
T3
Fig. 21.49 Isolated 3ϕac–dc rectiﬁer based on the ﬂyback converter operating in discontinuous conduc-
tion mode, Problem 21.9
(a) Determine expressions for the low-frequency components of the ac input and dc
output currents.
(b) Derive an averaged equivalent circuit model for the converter, and give expressions
for the element values.
(c) Derive the conditions for operation in the discontinuous conduction mode.
21.10 Power stage design of a universal-input boost rectiﬁer. The objective of this problem is to
work out the power stage design of a low-harmonic rectiﬁer based on the boost converter.
This converter is to be designed to operate anywhere in the world, and hence the input
voltage may vary over the range 90 to 270 Vrms, 50 to 60 Hz. The converter produces a
regulated 385 V dc output, at 1000 W. The switching frequency fs is 100 kHz. You may
assume that the controller operates perfectly, to produce an undistorted ac line current
waveform and a well-regulated dc output voltage.
(a) Derive an expression for how the duty cycle d(t) will vary over the ac line cycle.
You may neglect converter dynamics and losses. Sketch d(t) under conditions of
maximum and minimum ac line voltage.
(b) Specify the inductor:
(i) Specify the value of L such that, at the peak of the sinusoidal input voltage,
and under worst-case conditions, the inductor current ripple Δig is 20% of the
instantaneous low-frequency current ig(t).

928 21 Pulse-Width Modulated Rectiﬁers
(ii) Specify the worst-case values of the peak and rms inductor current, assuming
100% eﬃciency.
(c) Determine the worst-case rms currents of the MOSFET and diode, assuming 100%
eﬃciency.
(d) Specify the value ofC that leads to a worst-case low-frequency (≪ fs) output voltage
peak-peak ripple of 5 V .
(e) Given the following loss elements
Inductor winding resistance 0.1Ω
MOSFET on-resistance 0 .4Ω
Diode forward voltage drop 1.5 V
Switching loss: model as i2
g(t)(0.25Ω)
For a constant 1000 W load, and assuming that the controller operates perfectly as
described above, ﬁnd the rectiﬁer eﬃciency
(i) at an ac input voltage of 90 V rms
(ii) at an ac input voltage of 270 V rms
21.11 The ﬂyback converter shown in Fig. 21.50 operates in the continuous conduction mode.
The MOSFET has on-resistance Ron, and diode D1 has a constant forward voltage drop
VD. All other loss elements can be neglected. The turns ratio of the ﬂyback transformer
is 1:1. The controller varies the duty cycle such that⟨ig(t)⟩TS is equal to vg(t)/Re, where
Re is the emulated resistance. The input voltage is vin(t)= VM sin(ωt). The input ﬁlter
removes the switching harmonics from the input currentig(t), but has negligible eﬀect on
the low-frequency components of the converter waveforms.
R
vin(t)
iin(t) +
vg(t)
ig(t)
+
v(t)
id (t)
Q1
L
C
D1
Controller
i(t)
Input filter
Fig. 21.50 Low-harmonic rectiﬁer system based on the CCM ﬂyback converter, Problem 21.11
(a) Derive an expression for the rectiﬁer eﬃciency, in terms of VM, V, VD, Ron, and Re.
(b) Given the following values, ﬁnd the value of MOSFET on-resistance which leads to
an eﬃciency of 96%.
rms input voltage 120 V
Dc output voltage 120 V
Diode D1 forward voltage drop 1.5 V
Load power 200 W

21.8 Summary of Key Points 929
21.12 Derive an expression for the emulated resistanceRe(Vg,rms, Rs, kv, vcontrol) of the average-
current-controlled boost rectiﬁer with ac line voltage feedforward, Fig. 21.18.
21.13 Derive the CPM boost rectiﬁer static input characteristics, Eq. (21.60).
21.14 The boost rectiﬁer system of Fig. 21.51 employs average current control with ac line
voltage feedforward.
+
+
v(t)vg(t)
ig(t)
Gate
driver
Pulse width
modulator
CompensatorGc(s)
+
+
vref1(t)x
y
Multiplier
vcontrol(t) Gcv(s)
+
kv
xy
z2zPeak
detector VM
vref2(s)
va(s)
L
C
1
100
1
100
Ti (s)
Tv(s)
Pload
500 W
Fig. 21.51 Average current controlled boost rectiﬁer with input voltage feedforward, Problem 21.14
The ac line frequency is 50 Hz. The rectiﬁer drives a constant power load of 500 W. The
pulse-width modulator contains a ramp having a peak-to-peak amplitude of 3 V . There is
no compensator in the inner wide-bandwidth average current control feedback loop. The
average current sensing circuit has gain
v
a(s)
ig(s)= Rs⎦
1+ s
ω0
)
Other converter parameter values are
fs= 100kHz L= 2.5mH
f0= ω0
2π= 10kHz Rs= 1Ω
V= 385V Vg,rms= 230V
(a) Construct the magnitude and phase Bode diagrams of the loop gain Ti(s)o ft h e
average-current-control loop. Label important features.

930 21 Pulse-Width Modulated Rectiﬁers
(b) Determine numerical values of the crossover frequency and phase margin of Ti(s).
The outer low-bandwidth feedback loop has loop gain Tv(s). The compensator of
this loop has constant gainGcv(s)= 330. The multiplier gain iskv= 2. The capacitor
value is C= 680μF. The reference voltage vref2(t)i s3 . 8 5V .
(c) Determine the peak magnitude of the output 100 Hz voltage ripple.
(d) Determine the quiescent control voltage Vcontrol.
(e) Construct the magnitude and phase Bode diagrams of the loop gainTv(s) of the outer
feedback loop. Label important features.
(d) Determine numerical values of the crossover frequency and phase margin of Tv(s).
21.15 A critical conduction mode controller causes a boost rectiﬁer to exhibit an ac input cur-
rent waveform similar to Fig. 21.23b. The ac input voltage is 120 Vrms at 60 Hz. The
rectiﬁer supplies 225 Vdc to a 120 W load. The boost converter inductance isL= 600μH.
(a) Determine the emulated resistance Re.
(b) Write the numerical expression for the converter switching frequency fs, as a func-
tion of ton and the applied terminal voltages. Sketch fs vs. time.
(c) What is the maximum switching frequency? What is the minimum switching fre-
quency?
(d) Derive an analytical expression for the rms transistor current for this control method,
as a function of the magnitude of the sinusoidal line current. Compare the rms tran-
sistor current of this approach with a CCM boost rectiﬁer having negligible current
switching ripple.
21.16 To obtain an isolated dc output, the boost converter in Fig. 21.5 is replaced by the full-
bridge transformer-isolated CCM boost converter of Fig. 6.36. The transformer has neg-
ligible magnetizing current. The inductor current and capacitor voltage ripples are small,
the output capacitance is very large, and the converter is loaded with resistor R.
(a) Derive an expression for the RMS transistor current.
(b) Derive an expression for the RMS output capacitor current.

Part VI
Resonant Converters
```
