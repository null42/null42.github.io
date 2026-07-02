---
date: 2026-06-24
category: 电源控制
source: power
visibility: public
title: 第19章part 1 - 19 Digital Control of Switched-Mode Power Converters
tags:
  - power-electronics
status: learning
summary: "> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 807-826 > Chunk ID: `chapter-19-part-1`"
---

# 第19章part 1 - 19 Digital Control of Switched-Mode Power Converters

> Source: `Fundamentals of Power Electronics 3rd Edition.pdf`  
> Pages: 807-826  
> Chunk ID: `chapter-19-part-1`

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
19
Digital Control of Switched-Mode Power Converters
Digital control methods and digital controllers based on general-purpose or dedicated micro-
controllers, digital signal processors (DSP’s), or programmable logic devices have been widely
adopted in power electronics applications at relatively high-power levels, including motor drives
or grid-tied three-phase inverters and rectiﬁers. In these applications, digital control oﬀers clear
technical and economic advantages in addressing complex control, management, and monitor-
ing tasks. Digital control is also applicable to ubiquitous low-to-medium power switched-mode
power conversion applications such as point-of-load (POL) regulators, non-isolated and iso-
lated dc–dc converters, single-phase power factor correction (PFC) rectiﬁers and inverters, etc.
In these applications, switching frequencies are typically in the range from hundreds of kilo-
hertz to multiple megahertz, and much faster dynamic responses are required. The controller
cost and the controller power consumption can easily present signiﬁcant portions of the system
cost and power dissipation. In many applications, control challenges have been successfully
met by continuous advances of readily available analog controllers, using analysis, modeling,
and design techniques discussed in other chapters of this book. More recently, practical digital
control of high-frequency switched-mode power converters has moved from proof-of-concept
laboratory demonstrations [181–189], to digital PWM controller (DPWM) chips commercially
available from multiple vendors. A number of mixed-signal DPWM controller architectures and
implementation strategies have been investigated and realized in practice. For example, many
standard microcontrollers or DSP chips are now available, featuring multiple PWM and analog-
to-digital (A/D) conversion channels, allowing software-based control and power management
functions. High-performance digital control loops can also be realized using digital logic im-
plemented in ﬁeld-programmable gate array (FPGA) chips or specialized integrated circuits,
together with custom DPWM and A/D blocks, while programmability, power management, and
system interface functions are delegated to embedded microcontrollers.
In addition to taking advantage of continuous and rapid advances in digital controller re-
alizations, digital control techniques have opened opportunities for advances in high-frequency
switched-mode power conversion applications. Advantages of digital control include programma-
bility of parameters and ﬂexibility in applications. Furthermore, practical realizations of more
advanced techniques have been demonstrated, including approaches leading to improved dy-
namic responses [190–201], system identiﬁcation [202–205], auto-tuning and adaptive control
methods [206–214], as well as eﬃciency optimization and power management functions [215–
222].
© Springer Nature Switzerland AG 2020
R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,
https://doi.org/10.1007/978-3-030-43881-4_19
805

806 19 Digital Control of Switched-Mode Power Converters
Switching converter
Digital controller
Analog-to-digital
converter
Discrete-time
compensator
Gate drives
Load
Digital
PWM
Ts
L
CR v(t)
+
H(s)
vref
ve(t)
A/DGcd (z)
c(t)
vg(t)
iL(t)
ve[n]vc[n]
d[n]Ts
Fig. 19.1 Digitally controlled switched-mode power converter
The purpose of this chapter is to provide an introduction to analysis, modeling, and design
of digital control for high-frequency switched-mode power converters. Figure19.1 shows a dig-
itally controlled converter, using the synchronous buck converter as an example. The objectives
are to develop understanding of the operation of the digital PWM control loop, including the
eﬀects of delays and quantization, to model the loop dynamics, and to enable the reader to de-
sign high-performance digital control loops. It is assumed that the reader has mastery of the
materials in the preceding chapters, especially Chaps. 7–9, but no background in discrete-time
or digital control is assumed. Signal propagation and functional blocks in the digital control
loop are discussed in Sect. 19.1. Section 19.2 presents an introduction to discrete-time systems.
Discrete-time compensator design is presented in Sect. 19.3, while Sect. 19.4 gives an introduc-
tion to digital controller implementation techniques. A more detailed treatment of the subject
of digital control of high-frequency switched-mode power converters can be found in [223].
19.1 Digital Control Loop
In the digitally controlled switching converter of Fig.19.1, the output voltage is measured using
a sensor with gain H(s). The transfer function H(s) may include scaling and analog ﬁltering of
the output voltage. As in the conventional analog control loop, the sensor output signal is com-
pared with a reference voltage vre f to obtain the error signal ve(t). The error signal is sampled
in time and quantized in amplitude by an analog-to-digital (A/D) converter. The A/D sampling
usually occurs at a constant rate, which is called the sampling frequency fsampling = 1/Tsampling .
Then the A/D output ve[n] is a digital word that represents the analog error signal ve at time
t= nTsampling .T h eA/D sampling frequency is in general synchronized with the switching fre-
quency fs, fsampling = kf s, where k is a positive integer. In practice, a common choice is to select
the sampling period to be equal to the switching period: k= 1,
Tsampling = Ts (19.1)

19.1 Digital Control Loop 807
Based on the discretized error signals ve[n], the digital compensator Gcd updates the duty-cycle
command signal vc[n] at the input of the digital pulse-width modulator (DPWM). Finally, given
vc[n], the DPWM outputs a switch control signal c(t) with duty cycle d[n] proportional to the
duty-cycle command vc[n]. The digital control loop is conceptually very similar to the standard
analog voltage-mode control loop discussed in Sect. 9.1, but with two signiﬁcant diﬀerences
due to (1) quantization in amplitude, and (2) sampling, i.e., quantization in time.
19.1.1 A/D and DPWM Quantization
In the control loop illustrated in Fig. 19.1, the digital signals ve[n] and vc[n] are represented by
digital variables having a ﬁnite number of bits. Practical A/D converters produce digital outputs
having a limited number of bits such as 12 or 14. Digital pulse-width modulators similarly are
limited in their resolution. This section introduces the quantization characteristics of the A /D
converter and of the digital pulse-width modulator.
Analog-to-Digital Conversion
In addition to sampling in time, the A /D converter performs quantization in amplitude. Fig-
ure 19.2a shows the quantization characteristic QA/D of a standard A/D converter operating
over an analog input voltage range from 0 to a full-scale voltage VFS . The sensed analog sig-
nal Hv is quantized to an nA/D-bit digital word. The least signiﬁcant bit (LSB) value of this
quantized signal is
qA/D= VFS
2nA/D
(19.2)
where nA/D is the A/D resolution in bits. The example in Fig. 19.2ai ss h o w nf o rnA/D = 3.
The A/D-converted sensed analog signal is digitally subtracted from the reference voltage vre f
to obtain the digital error signal ve[n]. As an alternative, the A/D quantization can be viewed
as shown in Fig. 19.2b, where the quantization characteristic is centered around zero. Either
way, analog voltages within a zero-error bin of width qA/D produce a zero digital error signal
ve[n]= 0, which implies that the LSB resolution qA/D determines how well the output voltage
can be regulated by the digital control loop.
As an example, suppose that H= 1, and that it is desired to regulate the output dc voltage
V within± 0.25% of Vre f = 1V ,i.e., within± 2.5 mV . The LSB resolution must therefore meet
the condition qA/D< 5 mV . Equation (19.2) implies that the required A/D resolution in bits is
nA/D> log2
⎦VFS
qA/D
)
(19.3)
Suppose VFS = 2 V , which is a typical full-scale voltage value for standard A /D converters.
Then an A/D resolution of at least nA/D = 9 bits is required to meet the dc voltage regulation
speciﬁcation. When the quantization is centered around zero, as shown in Fig. 19.2b, the same
LSB resolution can be achieved but the voltage conversion range can be reduced, thus eﬀectively
reducing the number of bits required to represent ve[n]. Such “window” A/D converters have
been described in [181, 182, 184, 193].
Digital Pulse-Width Modulation
Digital pulse-width modulation, illustrated in Fig.19.3a, follows the same principles as the stan-
dard analog PWM described in Sect. 7.3,F i g .7.30. The duty-cycle command signal vc[n]i s

808 19 Digital Control of Switched-Mode Power Converters
ve
ve[n]= QA/D(ve)QA/D(Hv)
qA/D qA/D
ve[n]
Zero-error
bin
Zero-error
bin
ve[n]= ve
Hv
(a) (b)
VFS0
Fig. 19.2 A/D quantization characteristic over (a)0 −VFS voltage range, and (b) centered around zero
error
compared with a digital saw-tooth ramp, so that the duty cycle d[n] of the output control sig-
nal c(t) is proportional to vc[n] .A ss h o w ni nF i g .19.3a, the time resolution of the c(t) pulse is
qDPWM Ts where
qDPWM = 1
2nDPWM
(19.4)
and nDPWM is the DPWM resolution in bits. In the example shown in Fig. 19.3, nDPWM = 3.
vc[n]
qDPW M
d[n]
0
0
1
1
Ts
d[n]Ts
t
c(t)
(a) (b)
QDPW M(vc[n])
qDPW MTs
t0
2nDPW M − 1
Fig. 19.3 Digital pulse-width modulator: (a) time-quantization of the gate-drive signalc(t)a n d(b) quan-
tization characteristic

19.1 Digital Control Loop 809
In Fig. 19.3a it is assumed that the amplitude of the digital saw-tooth ramp is 1 −2−nDPWM
which corresponds to the equivalent DPWM gain equal to 1 V−1, i.e., VM = 1 V . The resulting
DPWM quantization characteristic is shown in Fig. 19.3b.
In a standard DPWM implementation, the digital saw-tooth ramp is generated simply by a
digital counter driven by a digital clock with frequency fclk. The DPWM timing resolution is
then determined by the clock period Tclk= 1/ fclk,
qDPWM Ts= Tclk (19.5)
The duty-cycle resolution determines how precisely the converter output voltage can be posi-
tioned. For example, in a buck converter of Fig. 19.1, the dc output voltage is V= DVg.G i v e n
the duty-cycle quantization, the output voltage positioning resolution is therefore
ΔV= qDPWM Vg (19.6)
or,
ΔV
V = qDPWM
Vg
V = 1
2nDPWM
1
M (19.7)
Suppose that it is desired to position the output voltage within 0 .1% in a converter with
M= V/Vg = 0.2. Equation ( 19.7) implies that a 13-bit DPWM is required to meet the volt-
age positioning speciﬁcation, while Eq. ( 19.5) implies that a standard DPWM implementation
would require a clock frequency
fclk= 2nDPWM fs= 8192 fs (19.8)
If, for example, fs = 1 MHz, the required time resolution is 122 ps, and the required clock
frequency is fclk = 8.192 GHz. Equation ( 19.8) illustrates one of the practical challenges in
implementation of digital PWM controllers for high-frequency switched-mode power convert-
ers: the high switching frequency and the need for high DPWM resolution require high sys-
tem clock frequency. This problem has been addressed using alternative DPWM implemen-
tation techniques, resulting in practical high-frequency, high-resolution DPWM realizations
[181, 182, 184, 185, 188, 224–234].
Ideal Quantization Characteristics
The A/D and the DPWM quantization characteristics are highly nonlinear, which has implica-
tions on the stability and operation of the digitally controlled converter. Until we return to the
A/D and the DPWM quantization eﬀects in Sect. 19.4.2, we will assume that high-resolution
A/D and DPWM units are available so that quantization-induced nonlinearities in the digital
control loop can be neglected:
v
e[n]= QA/D(ve(nTs))≈ve(nTs)
d[n]≈vc[n]
VM
= vc[n]
1V
(19.9)
For the DPWM, a common assumption is that VM = 1 V . The ideal (very high resolution)
quantization characteristics in Eq. ( 19.9) imply that the A/D converter and the DPWM blocks
can be modeled simply as unity gain blocks, ve[n]/ve(nTs)= 1, d[n]/vc[n]= 1V−1.

810 19 Digital Control of Switched-Mode Power Converters
Steady-state
Transient
t
t
t
t
Ts
Ts
ve(t)
td
DTs
0
Dc error
nTs (n + 1)Ts
(a)
(b)
(c)
(d)
vc[n]
d[n]Ts
tctrl
ve[n]
c(t)
ˆc(t)
Fig. 19.4 Operating waveforms in a digitally controlled switched-mode power converter
19.1.2 Sampling and Delays in the Control Loop
Figure 19.4 illustrates steady-state and transient operation of a digitally controlled converter
where Eq. ( 19.1) is satisﬁed, so that the A /D sampling rate equals the switching frequency.
Ideally, the digital sample ve[n] of the error signal equals the value of the analog error signal
ve(t) at time nTs, ve[n]= ve(nTs). The quantity controlled by the digital feedback loop is the
sampled value ve[n] of the analog error signal ve(t). Assuming a well-designed feedback loop
with very large dc loop gain, the steady-state error is driven to zero, as shown in Fig.19.4a:
ve[n]→0 (19.10)
In equilibrium, the dc value Ve of the analog error signal may not be equal to zero. The dc
regulation error in the digitally controlled loop is a result of the fact that the error signal ve(t)
includes switching ripple so that the sample ve[n] is not necessarily equal to the dc value Ve.
The digitally controlled converter is a sampled-data system. With A /D sampling equal to the
switching frequency, the dc error in equilibrium can be interpreted as aliasing of the switching
ripple components to dc. The error is no larger than the amplitude of the ripple. A practical
implication is that sampling should be performed away from points in time when the sampled

19.1 Digital Control Loop 811
analog signal may include large noise caused by switching transitions, such as immediately
after switching events. Aliasing errors can be reduced by including an “anti-aliasing” analog
low-pass ﬁlter before the A/D converter, or by sampling the analog signal at a rate higher than
the switching frequency and performing the anti-aliasing ﬁltering digitally.
More generally, it should be understood that A/D sampling at fs aliases any frequency com-
ponents of the analog signal beyond the Nyquist rate fs/2 back to frequencies below fs/2[ 235].
Therefore, when we discuss frequency responses of the discrete-time compensatorGcd, we will
restrict our attention to frequencies up to the Nyquist frequency fs/2.
Let us now consider propagation of the signals through the digital control loop. Since the
A/D conversion is not instantaneous, the digital signal ve[n] is available to the digital controller
after a certain time interval commonly referred to as A/D conversion time. Given the updated
ve[n], the discrete-time compensatorGcd computes an update to the digital duty-cycle command
signal vc[n] at the input of the digital pulse-width modulator (DPWM). Combined, the A /D
conversion time plus the time it takes to computevc[n], equal a controller time delay tctrl shown
in Fig. 19.4. The duty-cycle command vc[n] is held constant through the switching period, as
shown in Fig. 19.4b. In response, the digital pulse-width modulator outputs a control pulse c(t)
shown in Fig. 19.4c with duty cycle d[n], where d[n]= vc[n]/VM = vc[n], assuming VM = 1V .
The diﬀerence ˆc(t) between the modulated and the steady-state pulse at the DPWM output is
shown in Fig. 19.4d. Note that the response ˆc(t) occurs with delay DTs after the time vc[n]i s
updated, which is a result of the sampling process associated with pulse-width modulation, as
discussed in Sect. 15.5.
It is important to note that there are two sampling processes in the digital control loop of
Fig. 19.1: sampling by the A/D converter and sampling by the pulse-width modulator. The time
between the two sampling events represents the delay in the digital control loop,
td= tctrl+ tmod= tctrl+ DTs (19.11)
The control loop delay in Eq. (19.11) includes two components: the timetctrl required to perform
A/D conversion and the time required by the digital compensator to compute an update of the
signal vc[n] at the DPWM inputs, and the modulator delay tmod = DTs associated with the
trailing-edge digital pulse-width modulator. Other DPWM types, such as leading-edge or dual-
edge DPWM oﬀer diﬀerent modulator delays, as summarized in Table19.1 [223]. These results
are consistent with the analysis presented in [68].
Table 19.1 Delays in regularly sampled pulse-width modulators
PWM Modulator delay tmod
Trailing-edge DTs
Leading-edge (1 −D)Ts
Dual-edge Ts/2

812 19 Digital Control of Switched-Mode Power Converters
In the frequency domain, the eﬀect of the delay td in the digital control loop can be modeled
by applying the Laplace transform to a signal delayed by td, as follows:
L{x(t−td)}=
t→+∞∫
t→−∞
x(t−td)e−stdt=
τ→+∞∫
τ→−∞
x(τ)e−s(τ+td )dτ= e−std x(s) (19.12)
It follows that the Laplace-transform frequency-domain model of the delay td is given by
Gdelay(s)= e−std (19.13)
with magnitude response|| Gdelay( jω)||= 1, and phase response given by
∠Gdelay( jω)=−ωtd (19.14)
The phase lag of Eq. (19.14) can be signiﬁcant, and should be taken into account in the design
of the discrete-time compensator. This issue is discussed further in Sect. 19.3.
19.2 Introduction to Discrete-Time Systems
The purpose of this section is to present a brief introduction to discrete-time system analysis and
modeling techniques. The techniques presented in this section enable design of the discrete-time
compensator Gcd(z) in the digitally controlled converter of Fig.19.1.
19.2.1 Integration in Continuous Time and in Discrete Time
A standard analog control loop around a switching converter is shown in Fig.7.1. The continuous-
time compensator Gc(s) can be designed based on the frequency-domain techniques discussed
in Chap. 9. Consider a simple integral compensator,
Gc(s)= vc(s)
ve(s)=ωo
s (19.15)
where ve is the error signal and vc is the signal applied to the input of the pulse-width modulator.
The continuous-time, s-domain transfer function Gc(s) has a pole at s= 0. In the time domain,
the output vc(t) of the compensator is an integral of the input ve(t),
vc(t)= vc(0)+ωo
t∫
0
ve(τ)dτ (19.16)
where vc(0) is the initial condition att= 0. Figure 19.5 illustrates an example of waveformsvc(t)
and ve(t). In this example, ve(t) is a sinusoidal waveform at frequency fs/10, where fs = 1/Ts
is the sampling frequency. Let us now consider how to realize the integral compensator in the
digital controller shown in Fig.19.1, i.e., how to compute the samples vc[n] at the discrete-time
compensator output given the discrete-time samples ve[n]= ve(nTs) at the compensator input.
First, note that the continuous-time integration in Eq. (19.16) can be written as:

19.2 Introduction to Discrete-Time Systems 813
t
t
(a)
(b)
ve(t)
vc(t)
Ts
ve[n− 1]
ve[n]
vc[n]
vc[n− 1]
Fig. 19.5 Continuous-time and discrete-time integration
vc(t)= vc(t−Ts)+ωo
t∫
t−Ts
ve(τ)dτ. (19.17)
To reproduce Eq. (19.17) exactly, the discrete-time compensator should perform the following
calculation:
vc(nTs)= vc[n]= vc[n−1]+ωo
nTs∫
(n−1)Ts
ve(τ)dτ (19.18)
where the integral over the interval (n−1)Ts to Ts represents the area under the waveform ve(t)
over the sampling interval Ts between t= (n−1)Ts and t= nTs. However, since values ofve(t)
are only available at discrete-times, the exact reproduction of the continuous-time integration in
Eq. (19.18) is not feasible. Instead, one must perform the integration approximately, using only
the available discrete-time samples of ve. One approach, based on a trapezoidal approximation
to the area under the waveform ve over a sampling period Ts, is illustrated in Fig. 19.5:
vc[n]= vc[n−1]+ωoTs
ve[n]+ ve[n−1]
2 (19.19)
The computation of vc[n]i nE q .( 19.19) is relatively simple, requiring only an addition of
ve[n−1] and ve[n], a multiplication by a constant, and an addition of the product and the
previously computed vc[n−1]. It is clear that Eq. (19.19) can easily be implemented in digital
logic hardware or as simple lines of code in software. Figure 19.5 shows how the samples vc[n]
obtained by the approximate discrete-time integration in Eq. ( 19.19) are close to, but not ex-
actly equal to the samples vc(nTs) of the analog integrator output signal vc(t). For a given ve(t),
increase of the sampling frequency causes the diﬀerences between the samples vc(nTs)o ft h e
analog, continuous-time integration in Eq. (19.17) and the discrete-time integrator outputsvc[n]
in Eq. (19.19) to diminish.

814 19 Digital Control of Switched-Mode Power Converters
The trapezoidal approximation leading to Eq. (19.19) is not the only possible way to approx-
imate continuous-time integration in discrete-time. The backward Euler approximation is given
by:
vc[n]= vc[n−1]+ωoTsve[n−1] (19.20)
The forward Euler approximation is
vc[n]= vc[n−1]+ωoTsve[n]. (19.21)
All three approximations ﬁnd application; generally the trapezoidal approximation is more ac-
curate.
19.2.2 z-Transform and Frequency Responses of Discrete-Time Systems
Equations ( 19.19), ( 19.20), and ( 19.21) deﬁne three discrete-time integral compensators in
the time domain. In the previous chapters, we have extensively relied on the continuous-
time Laplace transform, s-domain transfer functions, as well as on frequency responses and
frequency-domain analysis, modeling and design techniques. It is of interest to introduce the
corresponding transforms and frequency-domain techniques developed for discrete-time sys-
tems [176]. The introduction here is intended to be very brief and at a basic level, but su ﬃ-
cient to enable the reader to undertake digital controller designs based on the standard analog,
continuous-time background provided in the previous chapters.
In discrete-time systems, the Z-transform plays the role the Laplace transform has in
continuous-time circuits and systems. Given a discrete-time signal x[n], the Z-transform is
deﬁned as
Z{x[n]}= x(z)=
n→+∞∑
n→−∞
x[n]z−n (19.22)
Just like the Laplace transform, theZ-transform is linear:
Z{ax[n]+ by[n]}= aZ{x[n]}+ bZ{y[n]}= ax(z)+ by(z) (19.23)
where a and b are constants. For a variable delayed by one sampling period, the Z-transform
can be found as follows:
Z{x[n−1]}=
n→+∞∑
n→−∞
x[n−1]z−n=
k→+∞∑
k→−∞
x[k]z−(k+1)= z−1
k→+∞∑
k→−∞
x[k]z−k= z−1 x(z) (19.24)
It follows that delaying a discrete-time signal by a sampling period in time domain is equivalent
to multiplying theZ-transform of the signal by a factor z−1. In other words, z−1 models a unit
delay in the z-domain.
Application of the Z-transform, including Eq. ( 19.24), to the discrete-time integrator
Eq. (19.19), yields
vc(z)= z−1vc(z)+ωoTs
ve(z)+ z−1ve(z)
2 (19.25)

19.2 Introduction to Discrete-Time Systems 815
Table 19.2 Transfer functions of discrete-time integrators
Approximation Gcd(z)
Trapezoidal ωoTs
2
z+ 1
z−1
Backward Euler ωoTs
1
z−1
Forward Euler ωoTs
z
z−1
which leads to the discrete-time, z-domain transfer function of the discrete-time integral com-
pensator of Eq. (19.19), derived using the trapezoidal approximation in Sect. 19.2.1:
Gcd(z)= vc(z)
ve(z)=ωoTs
2
1+ z−1
1−z−1 =ωoTs
2
z+ 1
z−1 (19.26)
Table 19.2 shows the discrete-time z-domain transfer functions for the three considered discrete-
time integrators.
For continuous-time s-domain transfer functions, such as the continuous-time integral com-
pensator Gc(s)i nE q .( 19.15), we know that the response to a sinusoidal perturbation at fre-
quencyωcan be found by replacing s with jω, and evaluating the magnitude and phase of
Gc( jω). In particular, as discussed in Sect. 8.1 and shown in Fig. 8.3, the Bode plot of the inte-
gral compensator magnitude response is a straight line with−20 dB/decade slope. What can be
said about the frequency responses of Gcd(z)? To answer this question, recall that z−1 models a
unit delay in the z-domain. On the other hand, similar to the approach taken to model a delay
in Eq. (19.12), applying the Laplace transform to a signal x(t) delayed by a sampling period Ts
results in
L{x(t−Ts)}=
t→+∞∫
t→−∞
x(t−Ts)e−stdt=
τ→+∞∫
τ→−∞
x(τ)e−s(τ+Ts)dτ= e−sTs x(s) (19.27)
By comparing Eq. ( 19.24) and Eq. ( 19.27), we conclude that the frequency response of a z-
domain transfer function can be found by replacing z−1 with e−sTs , and then s with jω,a si nt h e
case of continuous-time s-domain transfer functions:
Gcd( jω)= Gcd(z)|z→ejωTs (19.28)
Let us evaluate the frequency response of the discrete-time integral compensator in Eq. (19.26):
Gcd( jω)=ωoTs
2
1+ e−jωTs
1−e−jωTs
=ωoTs
2
ejωTs/2+ e−jωTs/2
ejωTs/2−e−jωTs/2 (19.29)
Application of Euler’s formula (ejx = cos x+ j sin x)t oE q .(19.29) leads to
Gcd( jω)=−jωoTs
2
cos
⎦ωTs
2
)
sin
⎦ωTs
2
) (19.30)

816 19 Digital Control of Switched-Mode Power Converters
It is of interest to compare the frequency responses ofGcd( jω)i nE q .(19.30) with the frequency
response Gc( jω) of the original continuous-time integral compensator in (19.15),
Gc( jω)=−jωo
ω (19.31)
The phase responses ofGcd ( jω)i nE q .(19.30) and Gc( jω)i nE q .(19.31) are exactly the same at
all frequencies. Both transfer functions exhibit−90◦phase at all frequencies. It should be noted
that this is the case only for the discrete-time integrator based on the trapezoidal approxima-
tion. In contrast, the phase responses of the discrete-time integrator based on the forward Euler
or the backward Euler approximations diﬀer from the phase response of the continuous-time
integrator.
To compare the magnitude responses, consider ﬁrst low frequencies such that (ωT
s/2)≪ 1,
i.e., f≪ fs/π,
Gcd( jω)
⏐⏐
⏐⏐
(ωTs/2)≪1
≈−j
⎦ωoTs
2
) 1⎦ωTs
2
)=−jωo
ω= Gc( jω) (19.32)
Equation ( 19.32) shows that the magnitude response of the discrete-time integrator approxi-
mates very well the magnitude response of the continuous-time integrator at frequencies su ﬃ-
ciently low compared to the sampling frequency ( f ≪ fs/π). At higher frequencies, however,
the diﬀerences in magnitude responses increase. The mismatch in magnitude responses is visi-
ble in Fig. 19.5. In this example, f= fs/10, and the mismatches between vc[n] and the values
vc(nTs) obtained at the output of the continuous-time integrator are relatively small, but visible.
Furthermore, while||Gc( jω)||> 0 at all frequencies, ||Gcd( jω)||= 0 at frequencies such that
ωTs/2= (2k+ 1)π/2: Gcd( jω)
= 0, for f= fs
2, 3 fs
2 ,··· (19.33)
The magnitude responses of Gc(s) and Gcd(z) are compared in Fig. 19.6 for fs = 1 MHz and
fo= 100 kHz. The responses match closely at low frequencies, and depart more signiﬁcantly at
frequencies approaching fs/2 and beyond.
0.001 0.01 0.1 0.5 1 2
-40
-30
-20
-10
0
10
20
30
40
Magnitude, dB
f
fs
||Gcd ( jw)||
||Gc( jw)||
Fig. 19.6 Magnitude responses of the continuous-time and discrete-time integrators, fs = 1M H z ,fo =
100 kHz. The discrete-time integrator is based on the trapezoidal approximation

19.2 Introduction to Discrete-Time Systems 817
19.2.3 Continuous Time to Discrete Time Mapping
Sections 19.2.1 and 19.2.2 introduced discrete-time systems using a simple integral compen-
sator example. The objective of this section is to derive discrete-time compensator transfer
functions Gcd(z) starting from more complex continuous-time compensator transfer functions
Gc(s), such as PI, PD and PID compensators discussed in Chap. 9. There are many diﬀerent
continuous-time to discrete-time mapping approaches, i.e., approaches to ﬁnding Gcd(z)s t a r t -
ing from an s-domain transfer function Gc(s)[ 176]. Here we describe a mapping approach that
follows directly from the derivation of the discrete-time integrator in Sects. 19.2.1 and 19.2.2
using the trapezoidal approximation:
Gc(s)=ωo
s →Gcd(z)=ωoTs
2
z+ 1
z−1 (19.34)
Equation (19.34) suggests that starting from an arbitrary Gc(s), Gcd(z) can be obtained by re-
placing s as follows:
s→2
Ts
z−1
z+ 1 (19.35)
By use of Eq. (19.35), Gcd(z) can be found as:
Gcd(z)= Gc(s)
⏐⏐⏐
⏐
s→2
Ts
z−1
z+1
(19.36)
The mapping deﬁned by Eqs. ( 19.35) and (19.36) is known as the bilinear or Tustin mapping
[176]. Figure 19.7 illustrates several properties of the bilinear mapping. In this example, an s-
domain transfer function contains several real poles at s= 0,−α1,...,α5 and several zeroes at
s= 0, jβ1,−jβ1,..., −jβ5. The mapping of these poles and zeroes into the z-plane is found by
solving for z in terms of s from Eq. (19.35):
z=
1+ sTs
2
1−sTs
2
(19.37)
(a) (b)
Re(z)
Im(z)
-0.5 s
1
2
3
4
5
- 1- 2- 3- 4- 5
- 5
- 4
- 3
- 2
- 1
- 1- 2- 3- 4- 5
1
2
34
5
- 5 - 4 - 3
- 2
- 1
-1 +1
+0.5 s
-0.5 s
Im(s)
Re(s)
Fig. 19.7 Mapping from s-plane (a)t o z-plane (b) using the bilinear method

818 19 Digital Control of Switched-Mode Power Converters
The origin s= 0i nt h e s-plane maps to z= 1i nt h e z-plane. Recall that a continuous-time
integrator has a pole at s= 0. Hence, a discrete-time integrator has a pole at z=+ 1. As shown
in Table 19.2, this is true for all discrete-time integrators. From Eq. ( 19.37), it can be shown
that points s= jωon the s-plane imaginary axis map to points on the unit circle || z||= 1i n
the z-plane. Points on the negative real axis in the s plane map to points on the real axis in the
z-plane between z=+ 1 and z=−1. The entire left half-plane in the s-plane maps to the interior
of the unit circle in the z-plane.
As an example, consider mapping the PI compensator described in Sect. 9.5.2,
Gc(s)= Gc∞
⎦
1+ωL
s
)
(19.38)
First, we employ the bilinear mapping, Eq. (19.36), to express the compensator transfer function
Gcd(z) as a function of z:
Gcd(z)= Gc∞
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝
1+ ωL⎦2
T2
z−1
z+ 1
)
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠
(19.39)
With some algebra, this can be expressed in pole-zero form as
Gcd(z)= Gc∞
⎦
1+ωLTs
2
) z−1−ωLTs/2
1+ωLTs/2
z−1 (19.40)
Since fL in PI compensators is usually very low compared to fs,(ωLTs/2)≪ 1, Eq. (19.40) can
be simpliﬁed as follows:
Gcd(z)≈Gc∞
z−(1−ωLTs)
z−1 (19.41)
The discrete-time PI compensator has a pole at z= 1, and a real zero at approximately 1 −
ωLTs. For a given sampling frequency fs= 1/Ts,a sωL approaches zero, the discrete-time zero
tends to z= 1. In general, mapping continuous-time low-frequency poles or zeroes results in
discrete-time poles or zeroes close to the+1 point of thez-plane. This can lead to roundoﬀerrors
and design constraints in implementation of discrete-time compensators, discussed further in
Sect. 19.4.
Figure 19.8 compares the magnitude and phase responses of the analog PI compensator
Gc(s)i nE q .( 19.38), with Gc∞= 1, fL = 20 kHz, and the discrete-time PI compensator in
Eq. (19.40) obtained by bilinear mapping with fs= 1M H z ,
Gcd(z)= 1.063 z−0.8743
z−1 (19.42)
One may observe that the magnitude and phase responses match very well over frequencies well
below the sampling rate fs. The responses in Fig. 19.8 are plotted up to the Nyquist frequency
fs/2= 500 kHz.
As another example, consider mapping a PD compensator described in Sect. 9.5.1,
Gc(s)= Gc0
⎦
1+ s
ωz
)
⎦
1+ s
ωp
) (19.43)

19.2 Introduction to Discrete-Time Systems 819
1 kHz 10 kHz 100 kHz
10
0
10
20
30
Magnitude [dB]
1 kHz 10 kHz 100 kHz
80
60
40
20
0
Phase [deg]
||Gc( jw)||
||Gcd ( jw)||
∠Gcd ( jw)
∠Gc( jw)
Fig. 19.8 Magnitude and phase responses of an analog, continuous-time PI compensatorGc(s), Gc∞= 1,
fL = 20 kHz, and the discrete-time compensator Gcd(z) obtained by bilinear mapping, fs = 1M H z
The bilinear mapping, Eq. (19.36), results in
Gcd(z)= Gc0
⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜
⎜⎜⎜⎜⎝
1+ 2ωzTs
1+ 2
ωpTs
⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟
⎟⎟⎟⎟⎠
⎦
z−1−ω
zTs/2
1+ωzTs/2
)
⎦
z−1−ωpTs/2
1+ωpTs/2
) (19.44)
The discrete-time PD compensator has a zero and a pole on the real z-plane axis. Suppose
that fs = 1 MHz and that it is desired to implement digitally a PD compensator with Gc0= 1,
fz= 100 kHz, fp= 400 kHz. Note that in this case the continuous-time zero and pole frequen-
cies are not much lower than the sampling frequency fs. By substituting the numerical values
in Eq. (19.40), we get
Gcd(z)= 2.329 z−0.5219
z+ 0.1137 (19.45)
The frequency responses of Gc(s) and Gcd(z) are compared in Fig. 19.9. Since the PD compen-
sator corner frequencies are relatively high, discrepancies can be observed in both magnitude
and phase responses, especially at frequencies approaching fs/2. After reaching a maximum
phase lead at √fz fp = 200 kHz, the phase of Gcd drops much faster with frequency than the
phase of Gc. The magnitude of Gcd is larger than the magnitude of Gc at all frequencies of
interest, and the diﬀerence in magnitude responses increases with frequency.
A generalization of the bilinear (Tustin) mapping known as frequency prewarping [176] can
be applied to mitigate, to some extent, the diﬀerences between Gc and Gcd frequency responses
in cases when corner frequencies of interest are relatively close to fs/2. The bilinear mapping
with prewarp is performed as follows:
s→kprewarp
2
Ts
z−1
z+ 1. (19.46)

820 19 Digital Control of Switched-Mode Power Converters
10 kHz 100 kHz
0
5
10
Magnitude [dB]
10 kHz 100 kHz
0
20
40
Phase [deg]
∠Gc( jw)
∠Gcd ( jw)
∠G∗
cd ( jw)
||G∗
cd ( jw)||
||Gcd ( jw)||
||Gc( jw)||
Fig. 19.9 Magnitude and phase responses of an analog, continuous-time PD compensator Gc(s), Gc0 =
1, fz = 100 kHz, fp = 400 kHz, the discrete-time compensator Gcd(z) obtained by bilinear mapping,
fs = 1 MHz, and the discrete-time compensator G∗
cd(z) obtained by bilinear mapping with prewarping at
fprewarp= 200 kHz
G∗
cd(z)= Gc(s)|s→kprewarp 2
Ts
z−1
z+1
(19.47)
where
kprewarp= ωprewarpTs/2
tan
⎦
ωprewarpTs/2
) (19.48)
is found so that the magnitude and the phase of Gc and G∗
cd match exactly at a particular fre-
quencyωprewarp,
G∗
cd( jωprewarp)
=
Gc( jωprewarp)

∠G∗
cd( jωprewarp)=∠Gc( jωprewarp)
(19.49)
Figure 19.9 shows the frequency responses of the discrete-time compensator G∗
cd obtained by
bilinear mapping with the prewarp frequency fprewarp = √fz fp = 200 kHz. The exact match
between Gcd∗and Gc at the prewarp frequency, and the improved match around the prewarp
frequency, are obtained at the expense of somewhat increased mismatch at lower frequencies.
As a ﬁnal example in this section, consider mapping the continuous-time PID compensator
described in Sect. 9.5.3. The compensator transfer function is
Gc(s)= Gcm
⎦
1+ωL
s
) ⎦
1+ s
ωz
)
⎦
1+ s
ωp1
) (19.50)
Compared to the transfer function in Eq. ( 9.64), the second pole at fp2 has been dropped from
the transfer function in Eq. ( 19.50). In a practical analog controller implementation, the high-
frequency pole at fp2 must be present to cause the gain to roll o ﬀat high frequencies and to

19.2 Introduction to Discrete-Time Systems 821
prevent the switching ripple from disrupting the operation of the analog pulse-width modula-
tor. Furthermore, the high-frequency pole is unavoidable due to analog circuit implementation
limitations, such as the op amp gain-bandwidth product. In the digital controller realization of
Fig. 19.1, the sensed analog voltage is sampled by the A /D converter at the rate equal to the
switching frequency. As a result, the switching ripple components are not present in the digi-
tal compensator, and there is no reason to map the high-frequency pole at fp2 to discrete-time.
Instead, the high-frequency (anti-aliasing) ﬁltering can be left in the sensing transfer function
H(s) in the analog domain, where it serves the purpose of attenuating switching ripples and
noise before A/D conversion. Using Eq. ( 19.47), the z-domain, discrete-time transfer function
of the PID compensator is obtained,
G∗
cd(z)= Gd
(z−zL)(z−zz)
(z−1)(z−zp) (19.51)
where
Gd= Gcm
fp1
fz
⎦
1+ a fL
fprewarp
)⎦
1+ a fz
fprewarp
)
1+ a fp1
fprewarp
(19.52)
zL=
1−a fL
fprewarp
1+ a fL
fprewarp
, zz=
1−a fz
fprewarp
1+ a fz
fprewarp
, zp=
1−a fp1
fprewarp
1+ a fp1
fprewarp
(19.53)
a= tan
⎦
πfprewarp
fs
)
(19.54)
The mapping techniques discussed in this section, and many others, are well supported
by computer tools such as MATLAB [ 236]. Table 19.3 summarizes the bilinear mapping
(Eqs. 19.35, 19.36) and the bilinear mapping with prewarp (Eqs. 19.46–19.48), together with
the corresponding MATLAB functions.
Table 19.3 Continuous-time to discrete-time mapping
Method mapping MATLAB function
Bilinear (Tustin) s→2
Ts
z−1
z+ 1 Gcd= c2d(Gc,Ts,’tustin’)
Bilinear (Tustin) with prewarp s→kprewarp
2
Ts
z−1
z+ 1 Gcd= c2d(Gc,Ts,’prewarp’,wprewarp)

822 19 Digital Control of Switched-Mode Power Converters
19.3 Discrete-Time Compensator Design
The loop gain Td in a digitally controlled converter includes the sensor transfer function H(s),
the control-to-output transfer function Gvd(s), the delay modeled as Gdelay(s)= e−std , and the
compensator transfer function Gcd(z)( o rG∗
cd(z)). It should be noted that the loop gain does not
include a zero-order-hold. The magnitude and phase responses of the loop gainTd can be found
as
Td( jω)=
⎦
H(s)Gvd(s)e−std
) ⏐⏐⏐⏐s→jω
G∗
cd(z)
⏐⏐⏐⏐z→ejωTs
(19.55)
Compared to the loop gain in an analog voltage-mode controlled converter, Eq. ( 9.4) with
VM = 1, Eq. (19.55)d iﬀers in two ways: the presence of the delay, and the sampled-data discrete-
time nature of the compensator Gcd. These diﬀerences are illustrated in the following example.
Example
The objective of this example is to evaluate the loop gain frequency response in Eq. (19.55) and
to compare it to the loop gain response with an analog controller. An analog PID compensator
is designed for a synchronous buck converter operating at fs = 1 MHz switching frequency.
The analog compensator transfer function given in Eq. ( 9.64), with fL = 8k H z ,fz = 33 kHz,
Gcm= 5.45, fp1= 300 kHz, fp2= 1 MHz, results in the crossover frequency fc= 100 kHz with
52◦phase margin. In equilibrium, V= Vre f = 1.8 V , so thatD≈V/Vg= 0.36.
Before mapping the analog compensator to discrete-time, the high-frequency pole at fp2 is
removed from the analog compensator transfer function. This pole is instead allocated to an
analog anti-aliasing ﬁlter in voltage sensing before the A/D converter,
H(s)= 1
1+ s
ωp2
(19.56)
Based on Gc(s)o fE q .( 19.50), with the use of bilinear mapping with the prewarp frequency
equal to the target crossover frequency, a discrete-time compensator of Eq. ( 19.51) is obtained
from Eqs. (19.52)–(19.54):
G∗
cd(z)= 27.3898(z−0.9493)(z−0.8063)
(z−1)(z−0.01278) (19.57)
The magnitude and phase responses of the loop gain Td, evaluated from Eq. (19.55), are shown
in Fig. 19.10 for several values of the loop delay td, in comparison to the loop gain responses
in the analog controlled converter (td= 0). The bilinear mapping with prewarp frequency equal
to the crossover frequency preserves the magnitude response very well. Furthermore, the delay
term does not aﬀect the magnitude responses at all. As a result, the magnitude responses in
the digital control loop stay essentially the same as the loop gain magnitude response with the
analog controller, and the crossover frequency remains the same, f
c ≈100 kHz. However, the
digital control loop delay more signiﬁcantly aﬀects the phase responses and the resulting phase
margins. The shortest considered delaytd= DTs= 0.36 μs assumes a high-performance digital
controller where the A/D conversion and the compensator computations are completed very
quickly so that tctrl ≈0. From Eq. (19.14), the additional phase lag at the crossover frequency
is−ωctd =−13◦, which reduces the phase margin to 52◦−13◦= 39◦. A delay of td = DTs+
Ts/2= 0.86 μs, which corresponds to tctrl = Ts/2= 0.5 μs, reduces the phase margin to 52◦−
31◦= 21◦. The ﬁnal case is when the A/D conversion and the compensator calculations take
an entire switching period, tctrl = Ts, which is representative of a very low-performance digital

19.3 Discrete-Time Compensator Design 823
td = 0
td = 0.36 ms
td = 0.86 ms
td = 1.36 ms
∠T
||T||
Fig. 19.10 Loop gain magnitude and phase responses in the synchronous buck converter design example
with the analog controller ( td = 0), and with digital controllers with several loop delays, td = DTs =
0.36 μs, td = DTs+ 0.5Ts = 0.86 μs, td = DTs+ Ts = 1.36 μs
implementation. In this case, the delay of td= DTs+ Ts= 1.36 μs reduces the phase margin to
just 52◦−49◦= 3◦. The example illustrates that the loop delay can be a very signiﬁcant factor
in the design of high-performance, wide-bandwidth digital control loops for high-frequency
switching power converters.
19.3.1 Design Procedure
A basic discrete-time compensator design procedure is described in this section based on the
description of the digital control loop and loop delay in Sect. 19.1, the analog regulator design
of Sect. 9.5, and the continuous-time to discrete-time mapping techniques of Sect. 19.2.3.T h e
approach consists of four steps:
1. Find the system uncompensated loop gain Tud(s), including the anticipated delay td due to
digital implementation, as discussed in Sect.19.1, and anti-aliasing analog ﬁltering in H(s):
Tud(s)= H(s)Gvd(s)Gdelay(s)= H(s)Gvd(s)e−std (19.58)
2. Design an analog continuous-time compensator Gc(s) using techniques discussed in Sect.9.5,
except that high-frequency analog roll-oﬀpoles should not be included in Gc(s). As ex-
plained further in the next section, in a PID compensator design, one may choose to position
the high-frequency pole at fp1 according to Eq. ( 19.68) so that the resulting discrete-time
compensator has the standard PID form of Eq. (19.69).
3. Map the analog compensator Gc(s) designed in Step 2 to the discrete-time compensator
Gcd(z) using the bilinear mapping, or to the discrete-time compensator G∗
cd(s)u s i n gt h e
bilinear mapping with prewarp, as discussed in Sect.19.2.3. The crossover frequency fc and

824 19 Digital Control of Switched-Mode Power Converters
the phase margin designed in Step 2 can be preserved by choosing the prewarp frequency
fprewarp equal to the target crossover frequency fc,
fprewarp= fc (19.59)
4. Evaluate magnitude and phase responses of the loop gain Td using Eq. ( 19.55), and ver-
ify that the design targets are met. Furthermore, closed-loop frequency responses can be
evaluated as in Eqs. (9.4), but with Td from Eq. (19.55) replacing the continuous-time loop
gain T.
5. Realize the discrete-time compensator as described in Sect. 19.4.
The digital compensator design approach described in this section is based on continuous-time
small-signal averaged converter models, standard analog design techniques, and mapping from
continuous time to discrete time. It should be noted that Eq. (19.58) is an approximation based
on standard averaging techniques. Exact converter discrete-time converter models [ 237] allow
applications of more advanced design techniques directly in z-domain [176]. These techniques
are described in more detail in [223].
19.3.2 Design Example
The objective is to design a discrete-time digital compensatorGcd around the synchronous buck
converter shown in Fig.19.1. The input dc voltage is Vg= 5 V , and the objective is to precisely
regulate the output voltage to V = Vre f = 1.8 V . The inductance is L= 1 μH, with a series
resistance Rs = 30 mΩthat models a combination of MOSFET on-resistance and the inductor
winding resistance. The output ﬁlter capacitor has C= 200 μF and an equivalent series resis-
tance Resr = 0.8mΩ. The converter operates at fs = 1 MHz switching frequency, and the load
current is between 0 A and 5 A. When the converter is unloaded (R is very large), the converter
control-to-output transfer function is
Gvd(s)= Gd0
1+ s
ωesr
1+ s
Qω0
+
⎦s
ω0
)2 (19.60)
where Gd0 = Vg = 5V , fesr = 1/(2πResrC)= 1M H z ,f0 ≈1/(2π
√
LC)= 11.3 kHz and
Q≈√L/C/(Rs+ Resr )= 2.3.
Let us ﬁrst design an analog PID compensator to achieve a crossover frequencyf= 100 kHz
with a phase margin of 52◦. Assuming H= 1, and VM = 1 V , following the design approach
exempliﬁed in Sect. 9.5.4, we arrive at the analog PID compensator
Gc(s)= Gcm
⎦
1+ ωL
s
) ⎦
1+ s
ωz
)
⎦
1+ s
ωp1
)⎦
1+ s
ωp2
) (19.61)
where Gcm = 5.45, fL = 8k H z ,fz = 33 kHz, and fp1 = 300 kHz are determined to meet the
crossover frequency and phase margin speciﬁcations, while fp2 = 1 MHz represents a high-
frequency pole in the analog control loop. The objective now is to follow the procedure outlined
in this section to design a digital controller given the same crossover frequency and phase mar-
gin speciﬁcations.
```
