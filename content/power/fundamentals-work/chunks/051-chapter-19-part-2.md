---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第19章part 2 - 19 Digital Control of Switched-Mode Power Converters
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 827-846 > Chunk ID: `chapter-19-part-2`"
---

# 第19章part 2 - 19 Digital Control of Switched-Mode Power Converters

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 827-846  
> Chunk ID: `chapter-19-part-2`

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
19.3 Discrete-Time Compensator Design 825
In the introductory part of this section, we have found that the loop delay can a ﬀect the
digital control loop signiﬁcantly, and that excessive loop delays make it impossible to design
wide-bandwidth digital control loops. Let us assume a high-performance digital controller im-
plementation, with the delay td= DTs= 0.36 μs in the converter operating at fs= 1M H z .T h e
design objectives are the same as for the analog control loop: very large loop gain at low fre-
quencies, fc= 100 kHz crossover frequency, and 52◦phase margin. A single-pole anti-aliasing
ﬁlter with a pole at fp2= 1 MHz is included in the voltage sensor transfer function, Eq. (19.56).
Using the analog compensator design as a starting point, the PI corner frequency is kept the
same, fL = 8 kHz. Since the delay td introduces−13◦phase at the target crossover frequency,
the PD compensator must be redesigned to boost the phase lead at fc to 52◦+ 13◦= 65◦.G i v e n
the required phase leadθ= 65◦at fc= 100 kHz, Eq. (9.57) leads to fz= 22 kHz, fp1= 450 kHz.
Finally, Gcm is found to achieve the target crossover frequency,
Gcm=
√
fz
fp1
⎦fc
fo
)2 1
Vg
= 3.51/V (19.62)
Now that all parameters in the analog compensator of Eq. ( 19.50) have been determined,
Eqs. (19.52)–(19.54) yield the discrete-time compensator for fprewarp = fc,
G∗
cd(z)= 31.7593(z−0.9493)(z−0.8654)
(z−1)(z+ 0.1881) (19.63)
Figure 19.11 compares the loop gain magnitude and phase responses in the synchronous buck
regulator design example with the analog compensator in Eq. (19.61), and with the digital con-
troller designed to take into account the loop delaytd= DTs= 0.36 μs. Note that approximately
the same crossover frequency and phase margin have been achieved in the digitally controlled
regulator.
||T|| (analog controller)
||Td|| (digital controller)
∠Td
∠T
Fig. 19.11 Loop gain magnitude and phase responses in the synchronous buck regulator design example
with the analog controller ( td = 0), and with the digital controller designed to take into account the loop
delay td = DTs= 0.36 μs

826 19 Digital Control of Switched-Mode Power Converters
 1 % Synchronous Buck converter parameters
 2 Vg = 5; Vref = 1.8; D = Vref/Vg; % Input and reference voltages, duty cycle
 3 L = 1e-6; RL = 30e-3; % Inductance and series resistance
 4 C = 200e-6; Resr = 0.8e-3; % Capacitance and capacitor ESR
 5 fo = 1/(2*pi*sqrt(L*C)); % Pole frequency
 6 R = 1000; % Load resistance
 7 fs = 1e6; Ts = 1/fs; % Switching frequency and period
 8 
 9 s = tf('s'); z = tf('z',Ts); % Define s and z
10
11 % Open-loop control to output transfer function
12 Gvd = Vg*(Resr+1/s/C)/(Resr + 1/s/C + s*L + RL); 
13 fp2 = 1e6; H = 1/(1 + s/2/pi/fp2); % Sensor transfer function
14 Tu = H * Gvd; % Uncompensated loop gain, no delay
15
16 % Analog PID compensator
17 fc = 100e3; % Cross-over frequency
18 fL = 8e3; fz = 33e3; fp1 = 300e3; % Corner frequencies
19 Gcm = sqrt(fz/fp1)*(fc/fo)^2/Vg; % Mid-frequency gain
20 % Analog compensator transfer function
21 Gc = Gcm*(1 + 2*pi*fL/s)*(1 + s/2/pi/fz)/(1+s/2/pi/fp1); 
22 T = Gc*Tu; % Loop gain with analog compensator
23
24 % Uncompensated loop gain, including delay
25 td = D*Ts; % Delay in the digital control loop
26 Tu.IODelay = td; % Delay
27 Tud = c2d(Tu,Ts,'impulse'); % Mapping of Tu with delay 
28 % Analog PID compensator redesigned for digital implementation
29 fL = 8e3; fz = 22e3; fp1 = 450e3; % Corner frequencies
30 Gcm = sqrt(fz/fp1)*(fc/fo)^2/Vg; % Mid-frequency gain
31 Gca = Gcm*(1 + 2*pi*fL/s)*(1 + s/2/pi/fz)/(1+s/2/pi/fp1);
32 % Digital compensator transfer function
33 Gcd = c2d(Gca, Ts, 'prewarp', 2*pi*fc);
34 Td = Tud*Gcd; % Loop gain with digital compensator
35
36 % Compare magnitude and phase responses of T and Td
37 options = bodeoptions; options.Grid = 'on'; 
38 options.FreqUnits = 'Hz'; options.XLim = [100, 500e3]; 
39 bode(T, 'k', options); % Bode plot of T
40 hold on; % Overlay plots 
41 bode(Td, 'b', options); % Bode plot of Td
Fig. 19.12 A MATLAB script that generates the analog and digital loop gain Bode plots shown in
Fig. 19.11
A MATLAB script that generates the plots in Fig. 19.11 is shown in Fig. 19.12. The script
starts by assigning the converter parameters (lines 1-7), followed by deﬁnitions of complex vari-
ables s and z (line 9). Open-loop control-to-output transfer function of the buck converterGvd(s)
and the uncompensated loop gain Tu(s) are formulated in lines 11-14. Analog PID compensator
parameters are deﬁned in lines 16-19 followed by the analog compensator transfer function
Gc(s) in line 21 and the loop gain T(s) with the analog compensator in line 22. No delays are
included in the analog controller. In line 26, delay td = DTs is included as a property of the un-
compensated loop gain, which is then mapped to discrete-time uncompensated loop gain Tud(z)
in line 27. The analog compensator, redesigned to take the delay into account, is deﬁned in lines
28–31, and then mapped in line 33 to obtain the compensator G∗
cd(z), and the loop gain Td(z)
in line 34. Bode plots of T(s) and Td(z) are generated in lines 36-41 using the MATLABbode
command.

19.4 Digital Controller Implementation 827
v(t)( analog controller)
v(t)( digital controller)
vc(t)( analog controller)
vc[n]( digital controller)
t [µ s]
t [µ s]
(a)
(b)
Fig. 19.13 Step-load (2.5 A to 5 A) transient responses in the synchronous buck converter example with
the analog controller (td = 0), and with the digital controller designed to take into account the loop delay
td = DTs = 0.36 μs: ( a) control signals vc for the analog and digital controllers, ( b) output voltage
responses v(t) for the analog and digital controllers
Figure 19.13 compares step-load (2.5 A to 5 A) transient responses. While the output volt-
age v(t) responses in Fig. 19.13b are very similar, diﬀerences can be appreciated in the control
signal responses shown in Fig. 19.13a. The digital controller produces discrete-time step-wise
waveform vc[n], while vc(t) in the analog controller is a continuous-time waveform that includes
a switching-ripple component.
19.4 Digital Controller Implementation
Digital controllers can be practically realized in a number of ways. For example, many stan-
dard microcontrollers or digital signal processing chips are now available, featuring multiple
PWM and A/D conversion channels, allowing software-based control and power management
functions. The digital controller and its digital compensation algorithm are implemented in the
ﬁrmware of these chips, using a programming language such as C. An alternative approach
consists of implementing the control loop in hardware, using ﬁeld-programmable gate arrays
(FPGA) or custom integrated circuits. In combination with specialized A/D and DPWM blocks,
this approach enables high-performance designs at high switching frequencies. Controllers of
this type can be developed, realized and tested using standard digital design ﬂow starting from

828 19 Digital Control of Switched-Mode Power Converters
logic functions described using a hardware description language (HDL) such as VHDL or Ver-
ilog, prototyping and experimental veriﬁcations using FPGA development platforms, ultimately
targeting relatively small, relatively low gate-count integrated circuits capable of matching or
surpassing state-of-the-art analog solutions in terms of dynamic performance, power consump-
tion and cost. This section provides an introduction to digital controller implementation issues,
with pointers to further details discussed in literature.
19.4.1 Discrete-Time Compensator Realization
Analog compensators are typically realized usingRC networks around standard analog building
blocks - operational or transconductance ampliﬁers. A discrete-time compensatorG
cd is realized
using digital building blocks: adders, multipliers, and storage elements. There are many possible
ways to arrange these building blocks to realize a givenGcd(z)[ 176, 223]. This section presents
two realization architectures particularly well suited for discrete-time PI or PID compensators
in the digital control loop around a converter: a cascade realization, and a parallel realization.
The cascade realization of a PID transfer function Gcd(z)i nE q .( 19.51)i ss h o w ni n
Fig. 19.14.
ve[n] vc[n]
zL zz zp
z− 1 z− 1 z− 1 z− 1
Gd
Anti wind-up
limiter
u1[n] u2[n] u3[n] u4[n]
Fig. 19.14 Cascade realization of the discrete-time PID compensator
The equations that can be used as a starting point in coding the compensator in microcon-
troller software or in HDL are as follows:
u1[n]= Gdve[n]
u2[n]= u1[n]−zLu1[n−1]
u3[n]= u2[n]−zzu2[n−1]
u4[n]= u3[n]+ zpu4[n−1]
vc[n]= u4[n]+ vc[n−1]
(19.64)
The compensator parameters, the gainGd, the zeroeszL, zz and the polezp, are the multiplicative
factors, which can easily be programmable. Integration, which is performed in the last step of
Eq. (19.64), includes a limiter. The purpose of the limiter is to prevent the duty-cycle command
v
c[n] at the integrator output from drifting away from the allowed operating range (0 to 1, as-
suming DPWM with VM = 1). This ”anti-windup” limiter function is similar to voltage limiting
at the output of an analog compensator built around an op amp. In coding the compensator,
one must also pay attention to the number of bits allocated to digital words representing the
parameters and the signal values in order to prevent overﬂows or other calculation errors [223].

19.4 Digital Controller Implementation 829
Another realization of the PID compensator is the parallel form, derived by a partial fraction
expansion of Gcd:
Gcd(z)= Gd
(z−zL)(z−zz)
(z−1)(z−zp) = KP+ Ki
1
1−z−1 + KD
1−z−1
1−zpz−1 (19.65)
where the coeﬃcients KP, KD, and KI can be found in terms of Gd, zL, zz and zp parameters,
KP= Gd(zL+ zz−zp−(2−zp)zLzz)
KI = Gd
(1−zL)(1−zz)
1−zp
Kd= Gd
(zL−zp)(zz−zp)
(1−zp)2
(19.66)
The parallel realization is shown in Fig. 19.15.
ve[n] vc[n]
z− 1
z− 1
z− 1
Anti wind-up
limiter
KP
KI
KD
zp
up[n]
ui[n]
ud [n]
ud1[n]
Fig. 19.15 Parallel realization of the discrete-time PID compensator
The equations serving as a starting point for microcontroller or HDL coding are as follows:
up[n]= KPve[n]
ui[n]= KIve[n]+ ui[n−1]
ud1[n]= KD(ve[n]−ve[n−1])
ud[n]= ud1[n]+ zpud[n−1]
vc[n]= up[n]+ ui[n]+ ud[n]
(19.67)
Note that an anti-windup limiter is included in the integration stage.

830 19 Digital Control of Switched-Mode Power Converters
The discrete-time PID transfer function in Eq. ( 19.65) has two zeroes and two poles. One
pole is at z= 1, which correspond to the integral action in the compensator. The second pole at
z= zp corresponds to the high-frequency pole at fp1 in the continuous-time PID compensator.
From Eq. (19.53), it follows that
fp1= fprewarp
a = fprewarp
tan
⎦
πfprewarp
fs
) (19.68)
results in zp = 0. In this case, the discrete-time transfer function Gcd has a simple PID form
[176], with KP, KI, and KD representing the proportional, integral, and derivative gains, respec-
tively,
Gcd(z)= Gd
(z−zL)(z−zz)
z(z−1) = KP+ KI
1
1−z−1 + KD(1−z−1) (19.69)
With zp= 0, the realization in Fig.19.15 is simpliﬁed because ud= ud1. The simple PID form is
particularly well suited for design techniques based on tuning the gains KP, KI and KD directly
[176, 223].
19.4.2 Quantization Eﬀects, Digital Pulse-Width Modulators and A/D Converters
Figures 19.2 and 19.3 show A/D and DPWM quantization characteristics, respectively. So far,
in modeling and design of the digital control loop, we have neglected the quantization e ﬀects
by simply assuming that very high-resolution A /D and DPWM blocks are employed, so that
Eq. ( 19.9) holds. It has been observed that the nonlinearities introduced by practical, ﬁnite
resolution A/D and DPWM blocks can result in persistent disturbances sometimes referred to
as ”limit cycling” [238–240]. The quantization eﬀects, as well as basic conditions necessary to
avoid limit-cycling disturbances, are discussed in this section ﬁrst, followed by an overview of
A/D and DPWM implementation approaches.
Assuming that a stable digital feedback control loop has been designed, a digitally controlled
converter is expected to operate at an equilibrium point where all controller variables have
constant values, and where all converter waveforms are periodic, with the period equal to T
s =
1/ fs. To ﬁnd the equilibrium solution, consider a dc model of a digitally controlled converter,
including A/D and DPWM quantization, as shown in Fig. 19.16. This is a static model, so the
discrete-time compensator is represented by its dc gain Gcd0,
Gcd0= Gcd(z)
⏐⏐⏐
⏐
z→1
(19.70)
while H0 is the sensor dc gain. Neglecting losses, the converter is represented by an ideal
1: M(D) transformer, where M(D) = V/Vg is the dc conversion ratio. The A /D quantiza-
tion characteristics Ve[n]= QA/D(Ve(nTs)) is shown in Fig.19.2, while the DWPM quantization
D= QDPWM (Vc[n]) is shown in Fig. 19.3. An equilibrium solution in the model of Fig. 19.16
can be found using a graphical approach illustrated in Fig. 19.17, where the digital error signal
Ve[n]a tt h eA/D converter output is shown as a function of the analog sample Ve = Ve(nTs)a t
the A/D converter input.

19.4 Digital Controller Implementation 831
Vg V Ho
Vref
VeVe[n]Vc[n]
D
QDPWM QA/DGcdo
1: M(D)
+
−
A/D
quantization
DPWM
quantization
Fig. 19.16 Dc model of a digitally controlled converter, including A/D and DPWM quantization
Vref
Vref
Ve
Ve[n]= QA/D(Ve)
Ve[n]
Ve[n]
Ve[n]= Ve
Ve = Vref − VgHoGcdoVe[n]
Ve = Vref − VgHoQDPWM (GcdoVe[n])
Ve
qA/D
VgHoqDPW M
qDPW M/Gcdo
A
AB
B
B
(a)
(b)
Fig. 19.17 Graphical approach to ﬁnding the quiescent operating point in a digitally controlled converter
with A/Dc o n v e r t e ra n dD P W Mh a v i n g(a) inﬁnite resolution, and (b) ﬁnite resolution. Expressions for Ve
as a function of Ve[n] are shown for the synchronous buck converter example

832 19 Digital Control of Switched-Mode Power Converters
Consider ﬁrst the case in Fig. 19.17a where very high-resolution A/D and DPWM are em-
ployed, so that quantization eﬀects can be neglected. In this case, the equilibrium solution is
found at the intersection of the A/D characteristic:
Ve[n]= Ve (19.71)
and the dc characteristic of the components around the loop:
Ve= Vre f−VgH0Gcd0Ve[n] (19.72)
This assumes a synchronous buck converter example with M(D)= D. Elimination of Ve from
Eqs. (19.71) and (19.72) allows an equilibrium solution to be found algebraically:
Ve[n]= Vre f
1+ VgH0Gcd0
(19.73)
When the dc gain Gcd0 is large but ﬁnite, then the equilibrium point denoted as point A in
Fig. 19.17a is achieved, which corresponds to a small but nonzero dc error. In the case when the
compensator includes an integral action, Gcd0→∞, then the equilibrium solution is at point B,
which corresponds to zero dc error. This is all consistent with the discussion in Sect.9.2, which
shows how a large dc loop gain drives the regulation error to zero.
Consider next a case where practical, ﬁnite resolution A /D and DPWM elements are em-
ployed. A graphical solution is illustrated Fig. 19.17b. The A/D quantization characteristic is
now highly nonlinear, Ve[n]= QA/D(Ve), with the widths of the A/D quantization bins equal to
qA/D. Because of the DPWM quantization, the characteristic around the loop is also nonlinear:
Ve= Vre f−VgH0QDPWM (Gcd0Ve[n]) (19.74)
Again this assumes a synchronous buck converter example with M(D)= D, and dc control-to-
output gain equal to Gd0= Vg. The widths of the horizontal bins in the characteristic around the
loop are equal to VgH0qDPWM where qDPWM = 1/2nDPWM is the LSB resolution of the DPWM.
The height of a vertical step in the characteristic given by Eq. (19.74) is equal toqDPWM/Gcd0.I f
the compensator dc gain Gcd0 is ﬁnite, then the equilibrium solution is at point A in Fig.19.17b,
on a vertical segment of the A/D characteristic. The A/D output Ve[n] can only be equal to an
integer multiple ofqA/D, not a fraction ofqA/D. Therefore, the equilibrium point A in Fig.19.17b
is not feasible. Given a large, but ﬁnite dc gain of the compensator, the digitally controlled
converter does not have a ﬁxed equilibrium point. Instead, the A/D converter output must bounce
among two or more quantization steps, resulting in a persistent disturbance (limit cycling) in
converter waveforms.
If the compensator includes an integral action, Gcd0 →∞, the widths of the vertical steps
in the characteristic given by Eq. ( 19.74) vanish. The characteristic around the A/D converter
becomes a series of points, VgH0qDPWM apart on the horizontal (Ve) axis. In this case, multiple
equilibrium solutions are possible, as illustrated by two points B in Fig. 19.17b. Each one of
the two possible equilibrium solutions is inside the A/D converter zero-error bin, Ve[n]= 0. It
should be noted that the existence of multiple possible equilibrium solutions corresponding to
Ve[n]= 0 is predicated upon the assumption that the compensator includes integral action, and
that the widths of the bins due to DPWM quantization are shorter than the A/Db i n s ,
VgH0qDPWM < qA/D (19.75)

19.4 Digital Controller Implementation 833
Equation (19.75) is a condition for the synchronous buck converter example where M(D)= D
and Gd0 = Vg. In general, a necessary condition for existence of an equilibrium solution in a
digitally controlled converter can be written as:
Gd0H0qDPWM < qA/D (19.76)
where Gd0 is the converter dc control-to-output gain.
t [µ s]
t [µ s]
(a)
(b)
No quantization
No quantization
Quantization:
Quantization:
qA/D = 4m V
qA/D = 4m V
10-bit DPWM
10-bit DPWM
vc[n]
v(t)
Fig. 19.18 Comparison of step-load (2.5 A-to-5 A) transient responses in the digitally controlled syn-
chronous buck regulator of Sect. 19.3.1 without and with quantization eﬀects, qA/D= 4m V ,nDPWM = 10
Figure 19.18 shows a comparison of step-load transient responses in the digitally controlled
synchronous buck regulator example of Sect. 19.3.1, for the case when very high-resolution
A/D and DPWM are employed so that quantization e ﬀects can be neglected, and for a case
of practical, ﬁnite resolution components, qA/D = 4m V , nDPWM = 10, qDWPM = 1/210,
VgH0qDPWM = 4.9 mV . The compensator includes an integral action, so that Gcd0 →∞,b u t
the DPWM resolution is not suﬃciently high and the condition in Eq. ( 19.75) is not met. The
step-load transient responses in Fig. 19.18 are similar, except that quantization eﬀects result in
periodic limit-cycling.

834 19 Digital Control of Switched-Mode Power Converters
0 50 100 150 200
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0 50 100 150 200
1.77
1.78
1.79
1.8
1.81
t [µ s]
t [µ s]
(a)
(b)
No quantization
No quantization
Quantization:
Quantization:
qA/D = 4m V
qA/D = 4m V
12-bit DPWM
12-bit DPWM
vc[n]
v(t)
Fig. 19.19 Comparison of step-load (2.5 A-to-5 A) transient responses in the digitally controlled syn-
chronous buck regulator of Sect. 19.3.1 without and with quantization eﬀects, qA/D= 4m V ,nDPWM = 12
If Eq. (19.75) is not satisﬁed, the equilibrium solution may or may not exist, depending on
whether there is a point in the characteristic given by Eq. (19.74) inside the A/D converter zero-
error bin or not. Another important observation is that limit cycling, if it does occur, is relatively
small in amplitude, in the order of the LSB resolution q
A/D of the A/D converter, as illustrated
by the waveforms of Fig.19.18.
Figure 19.19 shows a comparison of the same step-load transient responses but for the
case when the DPWM resolution is increased to 12 bits, nDPWM = 12, qDWPM = 1/212,
VgH0qDPWM = 1.2 mV , thus meeting the condition in Eq. ( 19.75). After a brief transient, the
regulator with practical A/D and DPWM components comes to equilibrium without limit cy-
cling. Note that, after approximately 75 μsec, the output voltage remains within the zero-error
bin, and small-amplitude ringing (undamped by feedback control) decays towards the quantized
equilibrium point.
Related to the discussion of the existence of equilibrium solutions with A /D and DPWM
quantization, it is of interest to note that the A /D quantization, in combination with the inte-
gral action in the compensator, results in an eﬀective steady-state quantization of the duty-cycle

19.4 Digital Controller Implementation 835
t
t
Ts
Vc
0
qA/D
(a)
(b)
ve[n]
vc[n]
KI qA/D
Fig. 19.20 Waveforms illustrating quantization of the DPWM input signalvc[n] due to A/D quantization
and integral action of the digital compensator: (a) an impulse in error ve[n], and (b) impulse response of a
digital compensator with integral gain KI
command Vc[n]. As a result, for an equilibrium solution to exist, it is not suﬃcient that the com-
pensator includes integral action and that the DPWM resolution is su ﬃciently high. Consider
the response of an integral compensator to a unit error impulse of amplitude equal to qA/D, i.e.,
the smallest possible disturbance at the compensator input. The integrator response to this unit
impulse is a step, as shown in Fig. 19.20, where K
I is the integral gain. The step amplitude in
vc[n] is equal to KIqA/D. In conclusion, because of the A/D quantization and the integral gain
KI in the compensator, the duty-cycle command signalVc[n], and therefore the duty cycle itself,
are eﬀectively quantized with a bin width equal to KIqA/D, regardless of how high the DPWM
resolution may be. This eﬀective DPWM quantization has exactly the same eﬀect on the exis-
tence of an equilibrium solution as the DPWM LSB resolution qDWPM in Eq. ( 19.76), which
leads to another necessary condition,
Gd0H0KIqA/D< qA/D (19.77)
or,
Gd0H0KI < 1 (19.78)
When we combine the fact that an integral action is necessary, with the conditions in Eqs. (19.76)
and (19.78), we ﬁnd that the conditions for existence of an equilibrium solution in a digitally
controlled converter can be written as follows:
Gd0H0qDPWM < qA/D
0< KI < 1
Gd0H0
(19.79)
where Gd0 is the converter dc control-to-output gain, andKI is the compensator integral gain. In
general, for any Gcd(z), KI can be found as
KI = lim
z→1
(z−1)Gcd(z) (19.80)

836 19 Digital Control of Switched-Mode Power Converters
One may verify that with qA/D= 4 mV , andnDPWM = 12, the conditions in Eq. (19.79) are both
met for the compensator in the design example of Sect. 19.3.1.
If the conditions in Eq. ( 19.79) are met, a digitally controlled converter has at least one
equilibrium solution in the zero-error bin of the A/D converter, Ve[n]= 0. It should be under-
stood, however, that existence of an equilibrium solution is not suﬃcient to guarantee no limit
cycling [238–240]. With quantization eﬀects, the converter is a complex nonlinear dynamic sys-
tem and limit-cycling disturbances can sometimes be observed even when the loop is design for
stable operation, and when the DPWM resolution and the compensator integral gain K
I meet
Eq. (19.79). On the other hand, for a stable, well-designed loop with high-resolution A /D and
DPWM components, the amplitude of any limit-cycling disturbances in the output voltage is
relatively small, in the order of q
A/D, as illustrated in the example of Fig. 19.18. Therefore, in
practice, such small-amplitude disturbances can often be tolerated.
Sections 19.1.1 and the discussion of quantization eﬀects point to the need for fast, high-
resolution A/D and DPWM components in a digitally controlled regulator.
Digital Pulse-Width Modulators
Modulators with high timing resolution are required so that the converter output voltage (or
current) can be precisely regulated. Furthermore, high-resolution pulse-width modulators are
needed to avoid or to minimize the amplitude of any limit-cycle disturbances. A digital modula-
tor in combination with the converter power stage operates as a power digital-to-analog (D/A)
converter, taking digital commandv
c[n] as an input and producing converter voltage (or current)
as an analog output. This power-D/A view has led to a number of DPWM developments based
on techniques adopted from the signal D/A conversion area.
A traditional counter-based DPWM replicates analog pulse-width modulation as shown in
Fig. 19.3: a saw-tooth or a triangular analog waveform is replaced by a digital counter clocked at
fclk, while a digital comparator outputs the modulated waveform by comparing the counter out-
put with the digital duty-cycle command vc[n]. A counter-based DPWM of resolution nDPWM
requires a clock frequency fclk = 2nDPWM fs, where fs is the switching frequency. To achieve
high resolution at high switching frequencies, prohibitively high clock rates may be required.
To remove the need for very high clock frequencies, a ﬁne time resolution can instead be
achieved using a tapped delay line [224]. The delay cells in the delay line can also be designed
to accomplish feed-forward compensation of the input voltage [ 184]. Hybrid DPWMs [ 225]
combine delay-line and counter approaches to achieve desirable tradeo ﬀs between clock rate
and complexity or gate count. Various hybrid DPWM implementations have been described in
[229, 232]. Other approaches in the area of high-resolution digital pulse-width modulation can
be found in [ 226, 230, 232, 233]. An overview and classiﬁcation of DPWM architectures and
realizations has been presented in [227].
In addition to high-resolution DPWM hardware architectures, following the power-D /A
view of a digitally controlled switched-mode power converter,ΔΣtechniques, which have been
used in signal processing and digital audio applications [241], have more recently been applied
to digitally controlled converters.
In the digital control loop, the ΔΣmodulator is placed between the discrete-time compen-
sator Gcd and the DPWM. Figure 19.21 shows a second-order ΔΣmodulator following the
“error-feedback” architecture [241]. The error-feedback architecture has an advantage of includ-
ing no delays in the forward path from the high-resolution nh-bit compensator output vch[n]t o
the lower-resolution nDPWM -bit duty-cycle command vc[n] provided to the hardware DPWM

19.4 Digital Controller Implementation 837
vch[n] vc[n]
From 
compensator
To 
DPWM
nh nDPW M
nDPW M
(MSB)
nh − nDPW M
(LSB)
z− 1
z− 1
2
2nd -order ∆Σmodulator
Fig. 19.21 Second-order error-feedbackΔΣmodulator placed between the compensator and the nDPWM -
bit DPWM c can improve the eﬀective DPWM resolution by nx = nh−nDPWM bits
component. In theΔΣmodulator, the nDPWM most signiﬁcant bits (MSB) of thenh-bit signal are
delivered to the nDPWM -bit DPWM, while the quantization error having nx = nh−nDPWM least
signiﬁcant bits (LSB) is fed back through a simple digital ﬁlter. The ΔΣmodulator shifts the
quantization error (viewed as quantization noise) to high frequencies, where the noise is ﬁltered
by the low-pass action of the switched-mode power converter. E ﬀective resolution improve-
ments can be obtained, thus enabling digital pulse-width modulation at high frequencies and
with low power consumption [188]. For example, with a 7-10-bit hardware DPWM, the second-
orderΔΣmodulator oﬀers about 6-7 bits of eﬀective resolution improvement. It has also been
shown that eﬀective resolution improvements are better with dual-edge (triangle-wave) DPWM
compared to trailing-edge (saw-tooth) DPWM [231].
In conclusion, by combining delay-line or hybrid DPWM techniques with ΔΣmodulation,
DPWM’s having very high eﬀective resolution can be realized using relatively modest hardware
resources, even at switching frequencies in the high megahertz range.
A/D Converters
For fast control loops and precise regulation, A/D converters must have high eﬀective resolution
around a reference, and a short conversion time. Furthermore, simplicity, low-power consump-
tion, and suitability for integration in digital VLSI processes are important. On the other hand,
linearity or wide conversion range may be compromised in order to reduce the A/D complexity.
These speciﬁcations diﬀer from the typical requirements in standard A/D converters developed
for signal processing, open-loop sensing, or slow control system applications, which is why
various switching converter-speciﬁc A/D realizations have been investigated.
A window-ﬂash A/D converter [ 182] consists of a small number of analog comparators
centered around an analog reference V
re f , with a conversion characteristic shown in Fig. 19.2b.
In some applications, as few as three A /D output levels (+qA/D,0 ,a n d−qA/D) are suﬃcient,
which allows a window-ﬂash A/D implementation using only two comparators [ 184]. Target-
ing implementation in digital VLSI processes, delay-line based window A /D converters have
been introduced in [ 181]. Instead of analog comparators, the voltage-dependent delay charac-
teristic of logic gates is used to perform voltage-to-delay and delay-to-digital conversion. Cur-
rent sensing using delay-line A/D has been proposed in [242]. The delay-line A/D concept has
been developed further in [ 189], where a high-performance, low-power, programmable archi-
tecture has been demonstrated. A similar approach, using a ring-oscillator A/D, targeting very

838 19 Digital Control of Switched-Mode Power Converters
low-power mobile applications, has been described in [185]. An alternative A/D circuit realiza-
tion approach, using threshold inverter quantization (TIQ) has been proposed in [ 243]. In the
TIQ A/D approach, logic inverters with programmed thresholds replace analog comparators,
enabling fast conversion and asynchronous sampling in a high-performance digital hysteretic
controller [243].
19.5 Summary of Key Points
1. Digital control has become a practical technique for high-performance switching power
conversion systems that enables higher-level control functionality in modern power man-
agement systems. These control systems include analog-to-digital converters and digital
pulse-width modulators that perform signal quantization/sampling of both amplitude and
time. These quantization eﬀects introduce new phenomena that may limit controller perfor-
mance and that should be considered in the closed-loop design.
2. The analog system modeling, analysis, and design techniques of earlier chapters can be
adapted to the case when the controller /compensator is implemented digitally. The loop
gain T
d( jω) of the digital control system includes both the gains of the analog portions
such as Gvd( jω) and H( jω) as well as the gains of the A/D converter, digital compensator,
and the DPWM.
3. An approach to incorporate the digital controller discrete-time response Gcd(z) into the
continuous-time response Gvd(s)H(s) of the analog portion of the system is developed in
this chapter. Approximations can be employed that relate the digital and analog signals
associated with integration: the trapezoidal approximation Eq. ( 19.35) provides a way to
connect the s-plane transfer functions of the analog portion and the z-plane transfer func-
tions of the digital portion. The magnitude and phase of the loop gain T
d( jω) can be found
and plotted, and the important quantities such as the crossover frequency and phase margin
can be evaluated.
4. TheZ-transform is a well-known approach for modeling discrete-time digital systems such
as the digital compensator. This approach provides a direct and simple way to represent the
operation of digital compensators. The deﬁnition z= esTs , or the trapezoidal approxima-
tion (19.35), leads to a direct connection between the Z-transform of the digital domain
and the Laplace transform of the analog domain.
5. The converter modeling and analog controller design techniques of earlier chapters can
be employed as a starting point for design of a digital controller. The delays inherent in
the digital controller elements must be added. A PI, PD, or PID compensator is designed
as discussed in Chap. 9, that then is translated to the z-domain as discussed in Sect. 19.3.
Section 19.4 describes implementation of the compensator algorithm in digital hardware.
Problems
19.1 A microcontroller operates at fclk = 120 MHz clock frequency and has counter-based
DPWM units. Assuming trailing-edge pulse-width modulation, calculate the DPWM
resolution as the number of bits n
DPWM available when the microcontroller is used to
implement a digital controller around a switched-mode power converter operating at dif-
ferent switching frequencies: (i) fs= 100 kHz, (ii) fs= 250 kHz, or (iii) fs= 1M H z .

19.5 Summary of Key Points 839
19.2 A microcontroller has high-resolution DPWM units, which oﬀer 150 ps timing resolu-
tion. Assuming trailing-edge pulse-width modulation, calculate the DPWM resolution as
the number of bits nDPWM available when the microcontroller is used to implement a dig-
ital controller around a switched-mode power converter operating at diﬀerent switching
frequencies: (i) fs= 100 kHz, (ii) fs= 250 kHz, or (iii) fs= 1M H z .
19.3 A digital controller, which includes an nDPWM -bit DPWM, is used to control a switched-
mode power converter having dc conversion ratio M(D)= V/Vg. Derive an expression
for the voltage positioning resolution pv =ΔV/V in %, whereΔV is a step in the output
voltage V that corresponds to a least signiﬁcant bit (LSB) step qDPWM in duty cycle D.
The expression for pv should be in terms of M(D) and nDPWM . Based on this general
expression, derive pv as a function of D and nDPWM for the three basic conversion ratios:
(i) buck M(D)= D, (ii) boost M(D)= 1/(1−D), and (iii) buck–boost M(D)= D/(1−D).
In the three cases considered, how diﬃcult is it to precisely position the output voltage
at high step-down or high step-up conversion ratios?
19.4 A microcontroller has A/D converters with nA/D-bit resolution and full-scale voltage
VFS . The microcontroller is used to implement a digital controller around a switched-
mode power converter so that the output voltage is regulated at V= Vre f/Ho, where Ho
is the voltage sensing gain at dc. To allow for proper operation during transients, the
A/D converter must not saturate as long as the output voltage remains within ± 10% of
the nominal output voltage V. Choose Vre f and Ho as functions of V and VFS to achieve
the best possible resolution ΔV in output voltage regulation, where ΔV corresponds to
the zero-error bin of the A/D converter. Given nA/D = 10, VFS = 2 V , andV= 12 V ,
calculate numerical values for Vre f , Ho, andΔV.
19.5 A digital controller has a window A/D converter with a number of qA/D bins centered
around an analog reference voltage Vre f . The controller is used around a switched-mode
power converter so that the output voltage is regulated at V = Vre f/Ho, where Ho is
the voltage sensing gain at dc. To allow for proper operation during transients, the A/D
converter must not saturate as long as the output voltage remains within ± 10% of the
nominal output voltage V.H o wm a n yqA/D bins are required in the window A /D con-
verter? Given Vre f = 2V ,qA/D= 5 mV , andV= 12 V , calculate numerical values forHo,
ΔV corresponding to qA/D, and the number of bins required.
19.6 An analog proportional-derivative (PD) compensator transfer function is
Gc(s)= Gc0
1+ s
ωz
1+ s
ωp
where Gc0 = 1, fz = 10 kHz and fp = 100 kHz. As discussed in Sect. 9.5.1, the analog
PD compensator oﬀers the largest phase lead at fx = √fz fp = 31.6 kHz. You may use
MATLAB or a tool of your choice to perform mapping and calculations requested in this
problem.
(a) Construct the Bode plot of Gc(s) magnitude and phase. Calculate the magnitude (in
dB) and phase (in degrees) responses at (i) f= fz, (ii) f= fx, and (iii) f= fp.
(b) Using bilinear mapping with prewarp at fprewarp = fx,m a pGc(s)t o G∗
cd(z). Calculate
the magnitude (in dB) and phase (in degrees) responses of G∗
cd at (i) f = fz, (ii)
f = fx, and (iii) f = fp, and compare to the results obtained in part (a) for three
diﬀerent sampling frequencies: fs = 500 kHz, fs = 250 kHz, and fs = 150 kHz.
Overlay Bode plots of Gc and G∗
cd for the three diﬀerent sampling frequencies.

840 19 Digital Control of Switched-Mode Power Converters
19.7 Figure 19.22 shows a boost voltage regulator similar to the closed-loop regulated boost
converter in Problem 9.3, except that the controller is implemented digitally. Converter
components can be considered ideal. The voltage sensor transfer function is
H(s)= Ho
1+ s
ωp
where Ho = 1/120, and fp = 10 kHz. The voltage reference is Vre f = 1 V . The full-
scale voltage of the A/D converter is VFS = 2 V . The controller employs a trailing-edge
DPWM with VM = 1 V , and an integral discrete-time compensatorGcd(z). In parts (a)–
(c) of the problem, you may assume that the A /D converter and the DPWM are very
high-resolution components with unity gains. The A/D converter is sampling the sensed
voltage vs once per switching period, and the delay in the digital control loop is td =
tmod = DTs. To construct requested Bode plots and to perform numerical calculations
you may use MATLAB or a tool of your choice.
Fig. 19.22 Digitally controlled boost converter of Problem 19.7
(a) Determine steady-state dc output voltage V, duty cycle D, and delay td in the digital
control loop.
(b) Assuming analog controller implementation with a negligible delay, design an ana-
log integral compensator Gc(s)= Kc/s, i.e., determine Kc to obtain crossover fre-
quency fc = 125 Hz. With this Gc(s), construct the Bode plot of the loop gain T(s)
magnitude and phase. Label values of all corner frequencies andQ-factors, as appro-
priate. Determine phase margin.
(c) Following the design procedure of Sect.19.3, design a discrete-time integral compen-
sator Gcd(z) to achieve the same crossover frequency and phase margin speciﬁcations

19.5 Summary of Key Points 841
as in part (b). Overlay Bode plots of the magnitude and phase responses of T(s) and
Td(z) and numerically verify the values obtained for the crossover frequency and the
phase margin.
(d) Find the minimum A/D resolution nA/D and the minimum DPWM resolution nDPWM
required so that the dc output voltage is regulated to within± 0.25 V , and so that the
necessary no-limit-cycling conditions in Eq. (19.79)a r em e t .
Fig. 19.23 Digitally controlled forward converter of Problem 19.8
19.8 Figure 19.23 shows a digitally controlled forward converter. This closed-loop voltage
regulator is similar to the system with the analog controller in Problem9.5. The quiescent
value of the input voltage is Vg = 380 V . The transformer has turns ratio n1/n3 = 4.5.
The duty cycle produced by the digital pulse-width modulator is restricted to the range
0≤d(t)≤0.5 and in that range d[n]= vc[n]/VM where VM = 1 V . The DPWM employs
dual-edge modulation and hasnDPWM = 12-bit resolution. The A/D converter hasnA/D=
9-bit resolution and is sampling the sensed voltage vs once per switching period Ts.T h e
delay in the digital control loop is td = Ts/2. The A/D converter and the DPWM have
unity gains. Converter components can be considered ideal, and parameter values are
shown in Fig.19.23. The small-signal models and transfer functions of forward and buck
converters are similar. The transformer magnetizing inductance has negligible inﬂuence
on the converter dynamics, and can be ignored. The discrete-time compensator is
G
cd(z)= 0.1152z−0.91
z−1
You may use MATLAB or a tool of your choice to perform mapping, calculations, and
plotting.

842 19 Digital Control of Switched-Mode Power Converters
(a) Determine the quiescent values of the duty cycle D and the output voltage V.
(b) Derive expressions for the control-to-output transfer function Gvd(s) and the uncom-
pensated loop gain Tu(s), including eﬀects of the voltage sensor transfer function
H(s)= vs/v, and delay td in the digital control loop.
(c) Construct a Bode plot of the loop gainTd magnitude and phase. What is the crossover
frequency? What is the phase margin?
(d) Are the necessary no-limit-cycling conditions in Eq. (19.79) satisﬁed for the system
in Fig. 19.23?
Fig. 19.24 Digitally controlled buck–boost voltage regulator system, Problem 19.9
19.9 Design of a digitally controlled buck–boost voltage regulator. This design problem is
similar to Problem 9.9, except that the controller is implemented digitally. The buck–
boost converter of Fig. 19.24 operates in the continuous conduction mode, with the ele-
ment values shown. The nominal input voltage is Vg = 48 V, and it is desired to regu-
late the output voltage at −15 V. Design the best compensator that you can, which has
high crossover frequency (but no greater than 10% of the switching frequency), large
loop gain over the bandwidth of the feedback loop, and phase margin of at least 45 ◦.
The A/D converter, which has up to 12-bit resolution, nA/D ≤12, samples the sensed
output voltage once per switching period. The DPWM, which has up to 10-bit resolu-
tion, nDPWM ≤10 uses trailing-edge modulation. The delay in the digital control loop is
td = tmod = DTs.T h eA/D converter and the DPWM have unity gains. The sensor H(s)
has an inverting gain, and includes a single-pole anti-aliasing ﬁlter
H(s)=−H0
1+ s
ωp
where H0> 0 and fp= 100 kHz. In the design, you may use MATLAB or a tool of your
choice to perform mapping, plotting and calculations.

19.5 Summary of Key Points 843
(a) Specify the required value of H0. Select nA/D and nDPWM to achieve best possible dc
voltage regulation while meeting the necessary no-limit-cycling condition expressed
in Eq. (19.76).
(b) Design the discrete-time compensatorGcd(z). Construct Bode plots of the uncompen-
sated loop gain Tud magnitude and phase (including eﬀects of delay in the feedback
loop), as well as the magnitude and phase of your compensator transfer function
Gcd(z). Label the important features of your plots. Verify that the no-limit-cycling
conditions expressed in Eq. (19.79) are satisﬁed.
(c) Construct Bode diagrams of the magnitude and phase of your compensated loop
gain Td(z), and also of the magnitude of the quantities Td/(1+ Td) and 1/(1+ Td).
Calculate crossover frequency and phase margin.
(d) Discuss your design. What prevents you from further increasing the crossover fre-
quency?
Fig. 19.25 Boost converter with analog average current-mode control
19.10 Figure 19.25 shows a boost converter with analog average current-mode control of the
inductor current. The analog compensator transfer function is
Gci(s)= Gcm
1+ ωz
s
1+ s
ωp
where Gcm= 0.63, fz= 4k H z ,fp= 25 kHz. The current sensing gain is Rf = 0.25Ω.
Figure 19.26 shows the same converter with average current-mode control implemented
digitally. Current sensing includes an analog single-pole anti-aliasing ﬁlter
vs
iL
= Rf
1
1+ s
ωa
where Rf = 0.25Ωand fa = 200 kHz. In both cases, the power stage parameters are
the same and losses can be neglected. You may assume that the A /D converter and

844 19 Digital Control of Switched-Mode Power Converters
Fig. 19.26 Boost converter with digital average current-mode control
Fig. 19.27 Timing diagram for the digitally controlled boost converter in Fig.19.26
the DPWM are very high-resolution components with unity gains. A timing diagram
illustrating sampling of the inductor current and operation of the digital pulse-width
modulator is shown in Fig. 19.27. Note that a dual-edge (triangle-wave) DPWM is em-
ployed. In the design of the digital controller you only need to consider the modular
delay t
d= tmod= Ts/2, as shown in Fig. 19.27. You may use MATLAB or a tool of your
choice to perform calculations, and to construct Bode plots.
```
