import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第19章part 1 - 19 Digital Control of Switched-Mode Power Converters","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第19章part 1 - 19 Digital Control of Switched-Mode Power Converters","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 807-826 > Chunk ID: `chapter-19-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/050-chapter-19-part-1.md","filePath":"content/power/fundamentals-work/chunks/050-chapter-19-part-1.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/050-chapter-19-part-1.md"};function l(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第19章part-1-19-digital-control-of-switched-mode-power-converters" tabindex="-1">第19章part 1 - 19 Digital Control of Switched-Mode Power Converters <a class="header-anchor" href="#第19章part-1-19-digital-control-of-switched-mode-power-converters" aria-label="Permalink to &quot;第19章part 1 - 19 Digital Control of Switched-Mode Power Converters&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 807-826<br> Chunk ID: <code>chapter-19-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>19</span></span>
<span class="line"><span>Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>Digital control methods and digital controllers based on general-purpose or dedicated micro-</span></span>
<span class="line"><span>controllers, digital signal processors (DSP’s), or programmable logic devices have been widely</span></span>
<span class="line"><span>adopted in power electronics applications at relatively high-power levels, including motor drives</span></span>
<span class="line"><span>or grid-tied three-phase inverters and rectiﬁers. In these applications, digital control oﬀers clear</span></span>
<span class="line"><span>technical and economic advantages in addressing complex control, management, and monitor-</span></span>
<span class="line"><span>ing tasks. Digital control is also applicable to ubiquitous low-to-medium power switched-mode</span></span>
<span class="line"><span>power conversion applications such as point-of-load (POL) regulators, non-isolated and iso-</span></span>
<span class="line"><span>lated dc–dc converters, single-phase power factor correction (PFC) rectiﬁers and inverters, etc.</span></span>
<span class="line"><span>In these applications, switching frequencies are typically in the range from hundreds of kilo-</span></span>
<span class="line"><span>hertz to multiple megahertz, and much faster dynamic responses are required. The controller</span></span>
<span class="line"><span>cost and the controller power consumption can easily present signiﬁcant portions of the system</span></span>
<span class="line"><span>cost and power dissipation. In many applications, control challenges have been successfully</span></span>
<span class="line"><span>met by continuous advances of readily available analog controllers, using analysis, modeling,</span></span>
<span class="line"><span>and design techniques discussed in other chapters of this book. More recently, practical digital</span></span>
<span class="line"><span>control of high-frequency switched-mode power converters has moved from proof-of-concept</span></span>
<span class="line"><span>laboratory demonstrations [181–189], to digital PWM controller (DPWM) chips commercially</span></span>
<span class="line"><span>available from multiple vendors. A number of mixed-signal DPWM controller architectures and</span></span>
<span class="line"><span>implementation strategies have been investigated and realized in practice. For example, many</span></span>
<span class="line"><span>standard microcontrollers or DSP chips are now available, featuring multiple PWM and analog-</span></span>
<span class="line"><span>to-digital (A/D) conversion channels, allowing software-based control and power management</span></span>
<span class="line"><span>functions. High-performance digital control loops can also be realized using digital logic im-</span></span>
<span class="line"><span>plemented in ﬁeld-programmable gate array (FPGA) chips or specialized integrated circuits,</span></span>
<span class="line"><span>together with custom DPWM and A/D blocks, while programmability, power management, and</span></span>
<span class="line"><span>system interface functions are delegated to embedded microcontrollers.</span></span>
<span class="line"><span>In addition to taking advantage of continuous and rapid advances in digital controller re-</span></span>
<span class="line"><span>alizations, digital control techniques have opened opportunities for advances in high-frequency</span></span>
<span class="line"><span>switched-mode power conversion applications. Advantages of digital control include programma-</span></span>
<span class="line"><span>bility of parameters and ﬂexibility in applications. Furthermore, practical realizations of more</span></span>
<span class="line"><span>advanced techniques have been demonstrated, including approaches leading to improved dy-</span></span>
<span class="line"><span>namic responses [190–201], system identiﬁcation [202–205], auto-tuning and adaptive control</span></span>
<span class="line"><span>methods [206–214], as well as eﬃciency optimization and power management functions [215–</span></span>
<span class="line"><span>222].</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_19</span></span>
<span class="line"><span>805</span></span>
<span class="line"><span></span></span>
<span class="line"><span>806 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>Switching converter</span></span>
<span class="line"><span>Digital controller</span></span>
<span class="line"><span>Analog-to-digital</span></span>
<span class="line"><span>converter</span></span>
<span class="line"><span>Discrete-time</span></span>
<span class="line"><span>compensator</span></span>
<span class="line"><span>Gate drives</span></span>
<span class="line"><span>Load</span></span>
<span class="line"><span>Digital</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR v(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>ve(t)</span></span>
<span class="line"><span>A/DGcd (z)</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>ve[n]vc[n]</span></span>
<span class="line"><span>d[n]Ts</span></span>
<span class="line"><span>Fig. 19.1 Digitally controlled switched-mode power converter</span></span>
<span class="line"><span>The purpose of this chapter is to provide an introduction to analysis, modeling, and design</span></span>
<span class="line"><span>of digital control for high-frequency switched-mode power converters. Figure19.1 shows a dig-</span></span>
<span class="line"><span>itally controlled converter, using the synchronous buck converter as an example. The objectives</span></span>
<span class="line"><span>are to develop understanding of the operation of the digital PWM control loop, including the</span></span>
<span class="line"><span>eﬀects of delays and quantization, to model the loop dynamics, and to enable the reader to de-</span></span>
<span class="line"><span>sign high-performance digital control loops. It is assumed that the reader has mastery of the</span></span>
<span class="line"><span>materials in the preceding chapters, especially Chaps. 7–9, but no background in discrete-time</span></span>
<span class="line"><span>or digital control is assumed. Signal propagation and functional blocks in the digital control</span></span>
<span class="line"><span>loop are discussed in Sect. 19.1. Section 19.2 presents an introduction to discrete-time systems.</span></span>
<span class="line"><span>Discrete-time compensator design is presented in Sect. 19.3, while Sect. 19.4 gives an introduc-</span></span>
<span class="line"><span>tion to digital controller implementation techniques. A more detailed treatment of the subject</span></span>
<span class="line"><span>of digital control of high-frequency switched-mode power converters can be found in [223].</span></span>
<span class="line"><span>19.1 Digital Control Loop</span></span>
<span class="line"><span>In the digitally controlled switching converter of Fig.19.1, the output voltage is measured using</span></span>
<span class="line"><span>a sensor with gain H(s). The transfer function H(s) may include scaling and analog ﬁltering of</span></span>
<span class="line"><span>the output voltage. As in the conventional analog control loop, the sensor output signal is com-</span></span>
<span class="line"><span>pared with a reference voltage vre f to obtain the error signal ve(t). The error signal is sampled</span></span>
<span class="line"><span>in time and quantized in amplitude by an analog-to-digital (A/D) converter. The A/D sampling</span></span>
<span class="line"><span>usually occurs at a constant rate, which is called the sampling frequency fsampling = 1/Tsampling .</span></span>
<span class="line"><span>Then the A/D output ve[n] is a digital word that represents the analog error signal ve at time</span></span>
<span class="line"><span>t= nTsampling .T h eA/D sampling frequency is in general synchronized with the switching fre-</span></span>
<span class="line"><span>quency fs, fsampling = kf s, where k is a positive integer. In practice, a common choice is to select</span></span>
<span class="line"><span>the sampling period to be equal to the switching period: k= 1,</span></span>
<span class="line"><span>Tsampling = Ts (19.1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.1 Digital Control Loop 807</span></span>
<span class="line"><span>Based on the discretized error signals ve[n], the digital compensator Gcd updates the duty-cycle</span></span>
<span class="line"><span>command signal vc[n] at the input of the digital pulse-width modulator (DPWM). Finally, given</span></span>
<span class="line"><span>vc[n], the DPWM outputs a switch control signal c(t) with duty cycle d[n] proportional to the</span></span>
<span class="line"><span>duty-cycle command vc[n]. The digital control loop is conceptually very similar to the standard</span></span>
<span class="line"><span>analog voltage-mode control loop discussed in Sect. 9.1, but with two signiﬁcant diﬀerences</span></span>
<span class="line"><span>due to (1) quantization in amplitude, and (2) sampling, i.e., quantization in time.</span></span>
<span class="line"><span>19.1.1 A/D and DPWM Quantization</span></span>
<span class="line"><span>In the control loop illustrated in Fig. 19.1, the digital signals ve[n] and vc[n] are represented by</span></span>
<span class="line"><span>digital variables having a ﬁnite number of bits. Practical A/D converters produce digital outputs</span></span>
<span class="line"><span>having a limited number of bits such as 12 or 14. Digital pulse-width modulators similarly are</span></span>
<span class="line"><span>limited in their resolution. This section introduces the quantization characteristics of the A /D</span></span>
<span class="line"><span>converter and of the digital pulse-width modulator.</span></span>
<span class="line"><span>Analog-to-Digital Conversion</span></span>
<span class="line"><span>In addition to sampling in time, the A /D converter performs quantization in amplitude. Fig-</span></span>
<span class="line"><span>ure 19.2a shows the quantization characteristic QA/D of a standard A/D converter operating</span></span>
<span class="line"><span>over an analog input voltage range from 0 to a full-scale voltage VFS . The sensed analog sig-</span></span>
<span class="line"><span>nal Hv is quantized to an nA/D-bit digital word. The least signiﬁcant bit (LSB) value of this</span></span>
<span class="line"><span>quantized signal is</span></span>
<span class="line"><span>qA/D= VFS</span></span>
<span class="line"><span>2nA/D</span></span>
<span class="line"><span>(19.2)</span></span>
<span class="line"><span>where nA/D is the A/D resolution in bits. The example in Fig. 19.2ai ss h o w nf o rnA/D = 3.</span></span>
<span class="line"><span>The A/D-converted sensed analog signal is digitally subtracted from the reference voltage vre f</span></span>
<span class="line"><span>to obtain the digital error signal ve[n]. As an alternative, the A/D quantization can be viewed</span></span>
<span class="line"><span>as shown in Fig. 19.2b, where the quantization characteristic is centered around zero. Either</span></span>
<span class="line"><span>way, analog voltages within a zero-error bin of width qA/D produce a zero digital error signal</span></span>
<span class="line"><span>ve[n]= 0, which implies that the LSB resolution qA/D determines how well the output voltage</span></span>
<span class="line"><span>can be regulated by the digital control loop.</span></span>
<span class="line"><span>As an example, suppose that H= 1, and that it is desired to regulate the output dc voltage</span></span>
<span class="line"><span>V within± 0.25% of Vre f = 1V ,i.e., within± 2.5 mV . The LSB resolution must therefore meet</span></span>
<span class="line"><span>the condition qA/D&lt; 5 mV . Equation (19.2) implies that the required A/D resolution in bits is</span></span>
<span class="line"><span>nA/D&gt; log2</span></span>
<span class="line"><span>⎦VFS</span></span>
<span class="line"><span>qA/D</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(19.3)</span></span>
<span class="line"><span>Suppose VFS = 2 V , which is a typical full-scale voltage value for standard A /D converters.</span></span>
<span class="line"><span>Then an A/D resolution of at least nA/D = 9 bits is required to meet the dc voltage regulation</span></span>
<span class="line"><span>speciﬁcation. When the quantization is centered around zero, as shown in Fig. 19.2b, the same</span></span>
<span class="line"><span>LSB resolution can be achieved but the voltage conversion range can be reduced, thus eﬀectively</span></span>
<span class="line"><span>reducing the number of bits required to represent ve[n]. Such “window” A/D converters have</span></span>
<span class="line"><span>been described in [181, 182, 184, 193].</span></span>
<span class="line"><span>Digital Pulse-Width Modulation</span></span>
<span class="line"><span>Digital pulse-width modulation, illustrated in Fig.19.3a, follows the same principles as the stan-</span></span>
<span class="line"><span>dard analog PWM described in Sect. 7.3,F i g .7.30. The duty-cycle command signal vc[n]i s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>808 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>ve</span></span>
<span class="line"><span>ve[n]= QA/D(ve)QA/D(Hv)</span></span>
<span class="line"><span>qA/D qA/D</span></span>
<span class="line"><span>ve[n]</span></span>
<span class="line"><span>Zero-error</span></span>
<span class="line"><span>bin</span></span>
<span class="line"><span>Zero-error</span></span>
<span class="line"><span>bin</span></span>
<span class="line"><span>ve[n]= ve</span></span>
<span class="line"><span>Hv</span></span>
<span class="line"><span>(a) (b)</span></span>
<span class="line"><span>VFS0</span></span>
<span class="line"><span>Fig. 19.2 A/D quantization characteristic over (a)0 −VFS voltage range, and (b) centered around zero</span></span>
<span class="line"><span>error</span></span>
<span class="line"><span>compared with a digital saw-tooth ramp, so that the duty cycle d[n] of the output control sig-</span></span>
<span class="line"><span>nal c(t) is proportional to vc[n] .A ss h o w ni nF i g .19.3a, the time resolution of the c(t) pulse is</span></span>
<span class="line"><span>qDPWM Ts where</span></span>
<span class="line"><span>qDPWM = 1</span></span>
<span class="line"><span>2nDPWM</span></span>
<span class="line"><span>(19.4)</span></span>
<span class="line"><span>and nDPWM is the DPWM resolution in bits. In the example shown in Fig. 19.3, nDPWM = 3.</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>qDPW M</span></span>
<span class="line"><span>d[n]</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>d[n]Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>(a) (b)</span></span>
<span class="line"><span>QDPW M(vc[n])</span></span>
<span class="line"><span>qDPW MTs</span></span>
<span class="line"><span>t0</span></span>
<span class="line"><span>2nDPW M − 1</span></span>
<span class="line"><span>Fig. 19.3 Digital pulse-width modulator: (a) time-quantization of the gate-drive signalc(t)a n d(b) quan-</span></span>
<span class="line"><span>tization characteristic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.1 Digital Control Loop 809</span></span>
<span class="line"><span>In Fig. 19.3a it is assumed that the amplitude of the digital saw-tooth ramp is 1 −2−nDPWM</span></span>
<span class="line"><span>which corresponds to the equivalent DPWM gain equal to 1 V−1, i.e., VM = 1 V . The resulting</span></span>
<span class="line"><span>DPWM quantization characteristic is shown in Fig. 19.3b.</span></span>
<span class="line"><span>In a standard DPWM implementation, the digital saw-tooth ramp is generated simply by a</span></span>
<span class="line"><span>digital counter driven by a digital clock with frequency fclk. The DPWM timing resolution is</span></span>
<span class="line"><span>then determined by the clock period Tclk= 1/ fclk,</span></span>
<span class="line"><span>qDPWM Ts= Tclk (19.5)</span></span>
<span class="line"><span>The duty-cycle resolution determines how precisely the converter output voltage can be posi-</span></span>
<span class="line"><span>tioned. For example, in a buck converter of Fig. 19.1, the dc output voltage is V= DVg.G i v e n</span></span>
<span class="line"><span>the duty-cycle quantization, the output voltage positioning resolution is therefore</span></span>
<span class="line"><span>ΔV= qDPWM Vg (19.6)</span></span>
<span class="line"><span>or,</span></span>
<span class="line"><span>ΔV</span></span>
<span class="line"><span>V = qDPWM</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>V = 1</span></span>
<span class="line"><span>2nDPWM</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>M (19.7)</span></span>
<span class="line"><span>Suppose that it is desired to position the output voltage within 0 .1% in a converter with</span></span>
<span class="line"><span>M= V/Vg = 0.2. Equation ( 19.7) implies that a 13-bit DPWM is required to meet the volt-</span></span>
<span class="line"><span>age positioning speciﬁcation, while Eq. ( 19.5) implies that a standard DPWM implementation</span></span>
<span class="line"><span>would require a clock frequency</span></span>
<span class="line"><span>fclk= 2nDPWM fs= 8192 fs (19.8)</span></span>
<span class="line"><span>If, for example, fs = 1 MHz, the required time resolution is 122 ps, and the required clock</span></span>
<span class="line"><span>frequency is fclk = 8.192 GHz. Equation ( 19.8) illustrates one of the practical challenges in</span></span>
<span class="line"><span>implementation of digital PWM controllers for high-frequency switched-mode power convert-</span></span>
<span class="line"><span>ers: the high switching frequency and the need for high DPWM resolution require high sys-</span></span>
<span class="line"><span>tem clock frequency. This problem has been addressed using alternative DPWM implemen-</span></span>
<span class="line"><span>tation techniques, resulting in practical high-frequency, high-resolution DPWM realizations</span></span>
<span class="line"><span>[181, 182, 184, 185, 188, 224–234].</span></span>
<span class="line"><span>Ideal Quantization Characteristics</span></span>
<span class="line"><span>The A/D and the DPWM quantization characteristics are highly nonlinear, which has implica-</span></span>
<span class="line"><span>tions on the stability and operation of the digitally controlled converter. Until we return to the</span></span>
<span class="line"><span>A/D and the DPWM quantization eﬀects in Sect. 19.4.2, we will assume that high-resolution</span></span>
<span class="line"><span>A/D and DPWM units are available so that quantization-induced nonlinearities in the digital</span></span>
<span class="line"><span>control loop can be neglected:</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>e[n]= QA/D(ve(nTs))≈ve(nTs)</span></span>
<span class="line"><span>d[n]≈vc[n]</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>= vc[n]</span></span>
<span class="line"><span>1V</span></span>
<span class="line"><span>(19.9)</span></span>
<span class="line"><span>For the DPWM, a common assumption is that VM = 1 V . The ideal (very high resolution)</span></span>
<span class="line"><span>quantization characteristics in Eq. ( 19.9) imply that the A/D converter and the DPWM blocks</span></span>
<span class="line"><span>can be modeled simply as unity gain blocks, ve[n]/ve(nTs)= 1, d[n]/vc[n]= 1V−1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>810 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>Steady-state</span></span>
<span class="line"><span>Transient</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>ve(t)</span></span>
<span class="line"><span>td</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Dc error</span></span>
<span class="line"><span>nTs (n + 1)Ts</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>(d)</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>d[n]Ts</span></span>
<span class="line"><span>tctrl</span></span>
<span class="line"><span>ve[n]</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>ˆc(t)</span></span>
<span class="line"><span>Fig. 19.4 Operating waveforms in a digitally controlled switched-mode power converter</span></span>
<span class="line"><span>19.1.2 Sampling and Delays in the Control Loop</span></span>
<span class="line"><span>Figure 19.4 illustrates steady-state and transient operation of a digitally controlled converter</span></span>
<span class="line"><span>where Eq. ( 19.1) is satisﬁed, so that the A /D sampling rate equals the switching frequency.</span></span>
<span class="line"><span>Ideally, the digital sample ve[n] of the error signal equals the value of the analog error signal</span></span>
<span class="line"><span>ve(t) at time nTs, ve[n]= ve(nTs). The quantity controlled by the digital feedback loop is the</span></span>
<span class="line"><span>sampled value ve[n] of the analog error signal ve(t). Assuming a well-designed feedback loop</span></span>
<span class="line"><span>with very large dc loop gain, the steady-state error is driven to zero, as shown in Fig.19.4a:</span></span>
<span class="line"><span>ve[n]→0 (19.10)</span></span>
<span class="line"><span>In equilibrium, the dc value Ve of the analog error signal may not be equal to zero. The dc</span></span>
<span class="line"><span>regulation error in the digitally controlled loop is a result of the fact that the error signal ve(t)</span></span>
<span class="line"><span>includes switching ripple so that the sample ve[n] is not necessarily equal to the dc value Ve.</span></span>
<span class="line"><span>The digitally controlled converter is a sampled-data system. With A /D sampling equal to the</span></span>
<span class="line"><span>switching frequency, the dc error in equilibrium can be interpreted as aliasing of the switching</span></span>
<span class="line"><span>ripple components to dc. The error is no larger than the amplitude of the ripple. A practical</span></span>
<span class="line"><span>implication is that sampling should be performed away from points in time when the sampled</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.1 Digital Control Loop 811</span></span>
<span class="line"><span>analog signal may include large noise caused by switching transitions, such as immediately</span></span>
<span class="line"><span>after switching events. Aliasing errors can be reduced by including an “anti-aliasing” analog</span></span>
<span class="line"><span>low-pass ﬁlter before the A/D converter, or by sampling the analog signal at a rate higher than</span></span>
<span class="line"><span>the switching frequency and performing the anti-aliasing ﬁltering digitally.</span></span>
<span class="line"><span>More generally, it should be understood that A/D sampling at fs aliases any frequency com-</span></span>
<span class="line"><span>ponents of the analog signal beyond the Nyquist rate fs/2 back to frequencies below fs/2[ 235].</span></span>
<span class="line"><span>Therefore, when we discuss frequency responses of the discrete-time compensatorGcd, we will</span></span>
<span class="line"><span>restrict our attention to frequencies up to the Nyquist frequency fs/2.</span></span>
<span class="line"><span>Let us now consider propagation of the signals through the digital control loop. Since the</span></span>
<span class="line"><span>A/D conversion is not instantaneous, the digital signal ve[n] is available to the digital controller</span></span>
<span class="line"><span>after a certain time interval commonly referred to as A/D conversion time. Given the updated</span></span>
<span class="line"><span>ve[n], the discrete-time compensatorGcd computes an update to the digital duty-cycle command</span></span>
<span class="line"><span>signal vc[n] at the input of the digital pulse-width modulator (DPWM). Combined, the A /D</span></span>
<span class="line"><span>conversion time plus the time it takes to computevc[n], equal a controller time delay tctrl shown</span></span>
<span class="line"><span>in Fig. 19.4. The duty-cycle command vc[n] is held constant through the switching period, as</span></span>
<span class="line"><span>shown in Fig. 19.4b. In response, the digital pulse-width modulator outputs a control pulse c(t)</span></span>
<span class="line"><span>shown in Fig. 19.4c with duty cycle d[n], where d[n]= vc[n]/VM = vc[n], assuming VM = 1V .</span></span>
<span class="line"><span>The diﬀerence ˆc(t) between the modulated and the steady-state pulse at the DPWM output is</span></span>
<span class="line"><span>shown in Fig. 19.4d. Note that the response ˆc(t) occurs with delay DTs after the time vc[n]i s</span></span>
<span class="line"><span>updated, which is a result of the sampling process associated with pulse-width modulation, as</span></span>
<span class="line"><span>discussed in Sect. 15.5.</span></span>
<span class="line"><span>It is important to note that there are two sampling processes in the digital control loop of</span></span>
<span class="line"><span>Fig. 19.1: sampling by the A/D converter and sampling by the pulse-width modulator. The time</span></span>
<span class="line"><span>between the two sampling events represents the delay in the digital control loop,</span></span>
<span class="line"><span>td= tctrl+ tmod= tctrl+ DTs (19.11)</span></span>
<span class="line"><span>The control loop delay in Eq. (19.11) includes two components: the timetctrl required to perform</span></span>
<span class="line"><span>A/D conversion and the time required by the digital compensator to compute an update of the</span></span>
<span class="line"><span>signal vc[n] at the DPWM inputs, and the modulator delay tmod = DTs associated with the</span></span>
<span class="line"><span>trailing-edge digital pulse-width modulator. Other DPWM types, such as leading-edge or dual-</span></span>
<span class="line"><span>edge DPWM oﬀer diﬀerent modulator delays, as summarized in Table19.1 [223]. These results</span></span>
<span class="line"><span>are consistent with the analysis presented in [68].</span></span>
<span class="line"><span>Table 19.1 Delays in regularly sampled pulse-width modulators</span></span>
<span class="line"><span>PWM Modulator delay tmod</span></span>
<span class="line"><span>Trailing-edge DTs</span></span>
<span class="line"><span>Leading-edge (1 −D)Ts</span></span>
<span class="line"><span>Dual-edge Ts/2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>812 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>In the frequency domain, the eﬀect of the delay td in the digital control loop can be modeled</span></span>
<span class="line"><span>by applying the Laplace transform to a signal delayed by td, as follows:</span></span>
<span class="line"><span>L{x(t−td)}=</span></span>
<span class="line"><span>t→+∞∫</span></span>
<span class="line"><span>t→−∞</span></span>
<span class="line"><span>x(t−td)e−stdt=</span></span>
<span class="line"><span>τ→+∞∫</span></span>
<span class="line"><span>τ→−∞</span></span>
<span class="line"><span>x(τ)e−s(τ+td )dτ= e−std x(s) (19.12)</span></span>
<span class="line"><span>It follows that the Laplace-transform frequency-domain model of the delay td is given by</span></span>
<span class="line"><span>Gdelay(s)= e−std (19.13)</span></span>
<span class="line"><span>with magnitude response|| Gdelay( jω)||= 1, and phase response given by</span></span>
<span class="line"><span>∠Gdelay( jω)=−ωtd (19.14)</span></span>
<span class="line"><span>The phase lag of Eq. (19.14) can be signiﬁcant, and should be taken into account in the design</span></span>
<span class="line"><span>of the discrete-time compensator. This issue is discussed further in Sect. 19.3.</span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems</span></span>
<span class="line"><span>The purpose of this section is to present a brief introduction to discrete-time system analysis and</span></span>
<span class="line"><span>modeling techniques. The techniques presented in this section enable design of the discrete-time</span></span>
<span class="line"><span>compensator Gcd(z) in the digitally controlled converter of Fig.19.1.</span></span>
<span class="line"><span>19.2.1 Integration in Continuous Time and in Discrete Time</span></span>
<span class="line"><span>A standard analog control loop around a switching converter is shown in Fig.7.1. The continuous-</span></span>
<span class="line"><span>time compensator Gc(s) can be designed based on the frequency-domain techniques discussed</span></span>
<span class="line"><span>in Chap. 9. Consider a simple integral compensator,</span></span>
<span class="line"><span>Gc(s)= vc(s)</span></span>
<span class="line"><span>ve(s)=ωo</span></span>
<span class="line"><span>s (19.15)</span></span>
<span class="line"><span>where ve is the error signal and vc is the signal applied to the input of the pulse-width modulator.</span></span>
<span class="line"><span>The continuous-time, s-domain transfer function Gc(s) has a pole at s= 0. In the time domain,</span></span>
<span class="line"><span>the output vc(t) of the compensator is an integral of the input ve(t),</span></span>
<span class="line"><span>vc(t)= vc(0)+ωo</span></span>
<span class="line"><span>t∫</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>ve(τ)dτ (19.16)</span></span>
<span class="line"><span>where vc(0) is the initial condition att= 0. Figure 19.5 illustrates an example of waveformsvc(t)</span></span>
<span class="line"><span>and ve(t). In this example, ve(t) is a sinusoidal waveform at frequency fs/10, where fs = 1/Ts</span></span>
<span class="line"><span>is the sampling frequency. Let us now consider how to realize the integral compensator in the</span></span>
<span class="line"><span>digital controller shown in Fig.19.1, i.e., how to compute the samples vc[n] at the discrete-time</span></span>
<span class="line"><span>compensator output given the discrete-time samples ve[n]= ve(nTs) at the compensator input.</span></span>
<span class="line"><span>First, note that the continuous-time integration in Eq. (19.16) can be written as:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems 813</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>ve(t)</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>ve[n− 1]</span></span>
<span class="line"><span>ve[n]</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>vc[n− 1]</span></span>
<span class="line"><span>Fig. 19.5 Continuous-time and discrete-time integration</span></span>
<span class="line"><span>vc(t)= vc(t−Ts)+ωo</span></span>
<span class="line"><span>t∫</span></span>
<span class="line"><span>t−Ts</span></span>
<span class="line"><span>ve(τ)dτ. (19.17)</span></span>
<span class="line"><span>To reproduce Eq. (19.17) exactly, the discrete-time compensator should perform the following</span></span>
<span class="line"><span>calculation:</span></span>
<span class="line"><span>vc(nTs)= vc[n]= vc[n−1]+ωo</span></span>
<span class="line"><span>nTs∫</span></span>
<span class="line"><span>(n−1)Ts</span></span>
<span class="line"><span>ve(τ)dτ (19.18)</span></span>
<span class="line"><span>where the integral over the interval (n−1)Ts to Ts represents the area under the waveform ve(t)</span></span>
<span class="line"><span>over the sampling interval Ts between t= (n−1)Ts and t= nTs. However, since values ofve(t)</span></span>
<span class="line"><span>are only available at discrete-times, the exact reproduction of the continuous-time integration in</span></span>
<span class="line"><span>Eq. (19.18) is not feasible. Instead, one must perform the integration approximately, using only</span></span>
<span class="line"><span>the available discrete-time samples of ve. One approach, based on a trapezoidal approximation</span></span>
<span class="line"><span>to the area under the waveform ve over a sampling period Ts, is illustrated in Fig. 19.5:</span></span>
<span class="line"><span>vc[n]= vc[n−1]+ωoTs</span></span>
<span class="line"><span>ve[n]+ ve[n−1]</span></span>
<span class="line"><span>2 (19.19)</span></span>
<span class="line"><span>The computation of vc[n]i nE q .( 19.19) is relatively simple, requiring only an addition of</span></span>
<span class="line"><span>ve[n−1] and ve[n], a multiplication by a constant, and an addition of the product and the</span></span>
<span class="line"><span>previously computed vc[n−1]. It is clear that Eq. (19.19) can easily be implemented in digital</span></span>
<span class="line"><span>logic hardware or as simple lines of code in software. Figure 19.5 shows how the samples vc[n]</span></span>
<span class="line"><span>obtained by the approximate discrete-time integration in Eq. ( 19.19) are close to, but not ex-</span></span>
<span class="line"><span>actly equal to the samples vc(nTs) of the analog integrator output signal vc(t). For a given ve(t),</span></span>
<span class="line"><span>increase of the sampling frequency causes the diﬀerences between the samples vc(nTs)o ft h e</span></span>
<span class="line"><span>analog, continuous-time integration in Eq. (19.17) and the discrete-time integrator outputsvc[n]</span></span>
<span class="line"><span>in Eq. (19.19) to diminish.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>814 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>The trapezoidal approximation leading to Eq. (19.19) is not the only possible way to approx-</span></span>
<span class="line"><span>imate continuous-time integration in discrete-time. The backward Euler approximation is given</span></span>
<span class="line"><span>by:</span></span>
<span class="line"><span>vc[n]= vc[n−1]+ωoTsve[n−1] (19.20)</span></span>
<span class="line"><span>The forward Euler approximation is</span></span>
<span class="line"><span>vc[n]= vc[n−1]+ωoTsve[n]. (19.21)</span></span>
<span class="line"><span>All three approximations ﬁnd application; generally the trapezoidal approximation is more ac-</span></span>
<span class="line"><span>curate.</span></span>
<span class="line"><span>19.2.2 z-Transform and Frequency Responses of Discrete-Time Systems</span></span>
<span class="line"><span>Equations ( 19.19), ( 19.20), and ( 19.21) deﬁne three discrete-time integral compensators in</span></span>
<span class="line"><span>the time domain. In the previous chapters, we have extensively relied on the continuous-</span></span>
<span class="line"><span>time Laplace transform, s-domain transfer functions, as well as on frequency responses and</span></span>
<span class="line"><span>frequency-domain analysis, modeling and design techniques. It is of interest to introduce the</span></span>
<span class="line"><span>corresponding transforms and frequency-domain techniques developed for discrete-time sys-</span></span>
<span class="line"><span>tems [176]. The introduction here is intended to be very brief and at a basic level, but su ﬃ-</span></span>
<span class="line"><span>cient to enable the reader to undertake digital controller designs based on the standard analog,</span></span>
<span class="line"><span>continuous-time background provided in the previous chapters.</span></span>
<span class="line"><span>In discrete-time systems, the Z-transform plays the role the Laplace transform has in</span></span>
<span class="line"><span>continuous-time circuits and systems. Given a discrete-time signal x[n], the Z-transform is</span></span>
<span class="line"><span>deﬁned as</span></span>
<span class="line"><span>Z{x[n]}= x(z)=</span></span>
<span class="line"><span>n→+∞∑</span></span>
<span class="line"><span>n→−∞</span></span>
<span class="line"><span>x[n]z−n (19.22)</span></span>
<span class="line"><span>Just like the Laplace transform, theZ-transform is linear:</span></span>
<span class="line"><span>Z{ax[n]+ by[n]}= aZ{x[n]}+ bZ{y[n]}= ax(z)+ by(z) (19.23)</span></span>
<span class="line"><span>where a and b are constants. For a variable delayed by one sampling period, the Z-transform</span></span>
<span class="line"><span>can be found as follows:</span></span>
<span class="line"><span>Z{x[n−1]}=</span></span>
<span class="line"><span>n→+∞∑</span></span>
<span class="line"><span>n→−∞</span></span>
<span class="line"><span>x[n−1]z−n=</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>x[k]z−(k+1)= z−1</span></span>
<span class="line"><span>k→+∞∑</span></span>
<span class="line"><span>k→−∞</span></span>
<span class="line"><span>x[k]z−k= z−1 x(z) (19.24)</span></span>
<span class="line"><span>It follows that delaying a discrete-time signal by a sampling period in time domain is equivalent</span></span>
<span class="line"><span>to multiplying theZ-transform of the signal by a factor z−1. In other words, z−1 models a unit</span></span>
<span class="line"><span>delay in the z-domain.</span></span>
<span class="line"><span>Application of the Z-transform, including Eq. ( 19.24), to the discrete-time integrator</span></span>
<span class="line"><span>Eq. (19.19), yields</span></span>
<span class="line"><span>vc(z)= z−1vc(z)+ωoTs</span></span>
<span class="line"><span>ve(z)+ z−1ve(z)</span></span>
<span class="line"><span>2 (19.25)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems 815</span></span>
<span class="line"><span>Table 19.2 Transfer functions of discrete-time integrators</span></span>
<span class="line"><span>Approximation Gcd(z)</span></span>
<span class="line"><span>Trapezoidal ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>z+ 1</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>Backward Euler ωoTs</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>Forward Euler ωoTs</span></span>
<span class="line"><span>z</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>which leads to the discrete-time, z-domain transfer function of the discrete-time integral com-</span></span>
<span class="line"><span>pensator of Eq. (19.19), derived using the trapezoidal approximation in Sect. 19.2.1:</span></span>
<span class="line"><span>Gcd(z)= vc(z)</span></span>
<span class="line"><span>ve(z)=ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1+ z−1</span></span>
<span class="line"><span>1−z−1 =ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>z+ 1</span></span>
<span class="line"><span>z−1 (19.26)</span></span>
<span class="line"><span>Table 19.2 shows the discrete-time z-domain transfer functions for the three considered discrete-</span></span>
<span class="line"><span>time integrators.</span></span>
<span class="line"><span>For continuous-time s-domain transfer functions, such as the continuous-time integral com-</span></span>
<span class="line"><span>pensator Gc(s)i nE q .( 19.15), we know that the response to a sinusoidal perturbation at fre-</span></span>
<span class="line"><span>quencyωcan be found by replacing s with jω, and evaluating the magnitude and phase of</span></span>
<span class="line"><span>Gc( jω). In particular, as discussed in Sect. 8.1 and shown in Fig. 8.3, the Bode plot of the inte-</span></span>
<span class="line"><span>gral compensator magnitude response is a straight line with−20 dB/decade slope. What can be</span></span>
<span class="line"><span>said about the frequency responses of Gcd(z)? To answer this question, recall that z−1 models a</span></span>
<span class="line"><span>unit delay in the z-domain. On the other hand, similar to the approach taken to model a delay</span></span>
<span class="line"><span>in Eq. (19.12), applying the Laplace transform to a signal x(t) delayed by a sampling period Ts</span></span>
<span class="line"><span>results in</span></span>
<span class="line"><span>L{x(t−Ts)}=</span></span>
<span class="line"><span>t→+∞∫</span></span>
<span class="line"><span>t→−∞</span></span>
<span class="line"><span>x(t−Ts)e−stdt=</span></span>
<span class="line"><span>τ→+∞∫</span></span>
<span class="line"><span>τ→−∞</span></span>
<span class="line"><span>x(τ)e−s(τ+Ts)dτ= e−sTs x(s) (19.27)</span></span>
<span class="line"><span>By comparing Eq. ( 19.24) and Eq. ( 19.27), we conclude that the frequency response of a z-</span></span>
<span class="line"><span>domain transfer function can be found by replacing z−1 with e−sTs , and then s with jω,a si nt h e</span></span>
<span class="line"><span>case of continuous-time s-domain transfer functions:</span></span>
<span class="line"><span>Gcd( jω)= Gcd(z)|z→ejωTs (19.28)</span></span>
<span class="line"><span>Let us evaluate the frequency response of the discrete-time integral compensator in Eq. (19.26):</span></span>
<span class="line"><span>Gcd( jω)=ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1+ e−jωTs</span></span>
<span class="line"><span>1−e−jωTs</span></span>
<span class="line"><span>=ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>ejωTs/2+ e−jωTs/2</span></span>
<span class="line"><span>ejωTs/2−e−jωTs/2 (19.29)</span></span>
<span class="line"><span>Application of Euler’s formula (ejx = cos x+ j sin x)t oE q .(19.29) leads to</span></span>
<span class="line"><span>Gcd( jω)=−jωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>cos</span></span>
<span class="line"><span>⎦ωTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>sin</span></span>
<span class="line"><span>⎦ωTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>) (19.30)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>816 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>It is of interest to compare the frequency responses ofGcd( jω)i nE q .(19.30) with the frequency</span></span>
<span class="line"><span>response Gc( jω) of the original continuous-time integral compensator in (19.15),</span></span>
<span class="line"><span>Gc( jω)=−jωo</span></span>
<span class="line"><span>ω (19.31)</span></span>
<span class="line"><span>The phase responses ofGcd ( jω)i nE q .(19.30) and Gc( jω)i nE q .(19.31) are exactly the same at</span></span>
<span class="line"><span>all frequencies. Both transfer functions exhibit−90◦phase at all frequencies. It should be noted</span></span>
<span class="line"><span>that this is the case only for the discrete-time integrator based on the trapezoidal approxima-</span></span>
<span class="line"><span>tion. In contrast, the phase responses of the discrete-time integrator based on the forward Euler</span></span>
<span class="line"><span>or the backward Euler approximations diﬀer from the phase response of the continuous-time</span></span>
<span class="line"><span>integrator.</span></span>
<span class="line"><span>To compare the magnitude responses, consider ﬁrst low frequencies such that (ωT</span></span>
<span class="line"><span>s/2)≪ 1,</span></span>
<span class="line"><span>i.e., f≪ fs/π,</span></span>
<span class="line"><span>Gcd( jω)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>(ωTs/2)≪1</span></span>
<span class="line"><span>≈−j</span></span>
<span class="line"><span>⎦ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>) 1⎦ωTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>)=−jωo</span></span>
<span class="line"><span>ω= Gc( jω) (19.32)</span></span>
<span class="line"><span>Equation ( 19.32) shows that the magnitude response of the discrete-time integrator approxi-</span></span>
<span class="line"><span>mates very well the magnitude response of the continuous-time integrator at frequencies su ﬃ-</span></span>
<span class="line"><span>ciently low compared to the sampling frequency ( f ≪ fs/π). At higher frequencies, however,</span></span>
<span class="line"><span>the diﬀerences in magnitude responses increase. The mismatch in magnitude responses is visi-</span></span>
<span class="line"><span>ble in Fig. 19.5. In this example, f= fs/10, and the mismatches between vc[n] and the values</span></span>
<span class="line"><span>vc(nTs) obtained at the output of the continuous-time integrator are relatively small, but visible.</span></span>
<span class="line"><span>Furthermore, while||Gc( jω)||&gt; 0 at all frequencies, ||Gcd( jω)||= 0 at frequencies such that</span></span>
<span class="line"><span>ωTs/2= (2k+ 1)π/2: Gcd( jω)</span></span>
<span class="line"><span>= 0, for f= fs</span></span>
<span class="line"><span>2, 3 fs</span></span>
<span class="line"><span>2 ,··· (19.33)</span></span>
<span class="line"><span>The magnitude responses of Gc(s) and Gcd(z) are compared in Fig. 19.6 for fs = 1 MHz and</span></span>
<span class="line"><span>fo= 100 kHz. The responses match closely at low frequencies, and depart more signiﬁcantly at</span></span>
<span class="line"><span>frequencies approaching fs/2 and beyond.</span></span>
<span class="line"><span>0.001 0.01 0.1 0.5 1 2</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-30</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>||Gcd ( jw)||</span></span>
<span class="line"><span>||Gc( jw)||</span></span>
<span class="line"><span>Fig. 19.6 Magnitude responses of the continuous-time and discrete-time integrators, fs = 1M H z ,fo =</span></span>
<span class="line"><span>100 kHz. The discrete-time integrator is based on the trapezoidal approximation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems 817</span></span>
<span class="line"><span>19.2.3 Continuous Time to Discrete Time Mapping</span></span>
<span class="line"><span>Sections 19.2.1 and 19.2.2 introduced discrete-time systems using a simple integral compen-</span></span>
<span class="line"><span>sator example. The objective of this section is to derive discrete-time compensator transfer</span></span>
<span class="line"><span>functions Gcd(z) starting from more complex continuous-time compensator transfer functions</span></span>
<span class="line"><span>Gc(s), such as PI, PD and PID compensators discussed in Chap. 9. There are many diﬀerent</span></span>
<span class="line"><span>continuous-time to discrete-time mapping approaches, i.e., approaches to ﬁnding Gcd(z)s t a r t -</span></span>
<span class="line"><span>ing from an s-domain transfer function Gc(s)[ 176]. Here we describe a mapping approach that</span></span>
<span class="line"><span>follows directly from the derivation of the discrete-time integrator in Sects. 19.2.1 and 19.2.2</span></span>
<span class="line"><span>using the trapezoidal approximation:</span></span>
<span class="line"><span>Gc(s)=ωo</span></span>
<span class="line"><span>s →Gcd(z)=ωoTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>z+ 1</span></span>
<span class="line"><span>z−1 (19.34)</span></span>
<span class="line"><span>Equation (19.34) suggests that starting from an arbitrary Gc(s), Gcd(z) can be obtained by re-</span></span>
<span class="line"><span>placing s as follows:</span></span>
<span class="line"><span>s→2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+ 1 (19.35)</span></span>
<span class="line"><span>By use of Eq. (19.35), Gcd(z) can be found as:</span></span>
<span class="line"><span>Gcd(z)= Gc(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>s→2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+1</span></span>
<span class="line"><span>(19.36)</span></span>
<span class="line"><span>The mapping deﬁned by Eqs. ( 19.35) and (19.36) is known as the bilinear or Tustin mapping</span></span>
<span class="line"><span>[176]. Figure 19.7 illustrates several properties of the bilinear mapping. In this example, an s-</span></span>
<span class="line"><span>domain transfer function contains several real poles at s= 0,−α1,...,α5 and several zeroes at</span></span>
<span class="line"><span>s= 0, jβ1,−jβ1,..., −jβ5. The mapping of these poles and zeroes into the z-plane is found by</span></span>
<span class="line"><span>solving for z in terms of s from Eq. (19.35):</span></span>
<span class="line"><span>z=</span></span>
<span class="line"><span>1+ sTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1−sTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>(19.37)</span></span>
<span class="line"><span>(a) (b)</span></span>
<span class="line"><span>Re(z)</span></span>
<span class="line"><span>Im(z)</span></span>
<span class="line"><span>-0.5 s</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>- 1- 2- 3- 4- 5</span></span>
<span class="line"><span>- 5</span></span>
<span class="line"><span>- 4</span></span>
<span class="line"><span>- 3</span></span>
<span class="line"><span>- 2</span></span>
<span class="line"><span>- 1</span></span>
<span class="line"><span>- 1- 2- 3- 4- 5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>34</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>- 5 - 4 - 3</span></span>
<span class="line"><span>- 2</span></span>
<span class="line"><span>- 1</span></span>
<span class="line"><span>-1 +1</span></span>
<span class="line"><span>+0.5 s</span></span>
<span class="line"><span>-0.5 s</span></span>
<span class="line"><span>Im(s)</span></span>
<span class="line"><span>Re(s)</span></span>
<span class="line"><span>Fig. 19.7 Mapping from s-plane (a)t o z-plane (b) using the bilinear method</span></span>
<span class="line"><span></span></span>
<span class="line"><span>818 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>The origin s= 0i nt h e s-plane maps to z= 1i nt h e z-plane. Recall that a continuous-time</span></span>
<span class="line"><span>integrator has a pole at s= 0. Hence, a discrete-time integrator has a pole at z=+ 1. As shown</span></span>
<span class="line"><span>in Table 19.2, this is true for all discrete-time integrators. From Eq. ( 19.37), it can be shown</span></span>
<span class="line"><span>that points s= jωon the s-plane imaginary axis map to points on the unit circle || z||= 1i n</span></span>
<span class="line"><span>the z-plane. Points on the negative real axis in the s plane map to points on the real axis in the</span></span>
<span class="line"><span>z-plane between z=+ 1 and z=−1. The entire left half-plane in the s-plane maps to the interior</span></span>
<span class="line"><span>of the unit circle in the z-plane.</span></span>
<span class="line"><span>As an example, consider mapping the PI compensator described in Sect. 9.5.2,</span></span>
<span class="line"><span>Gc(s)= Gc∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ωL</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(19.38)</span></span>
<span class="line"><span>First, we employ the bilinear mapping, Eq. (19.36), to express the compensator transfer function</span></span>
<span class="line"><span>Gcd(z) as a function of z:</span></span>
<span class="line"><span>Gcd(z)= Gc∞</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>1+ ωL⎦2</span></span>
<span class="line"><span>T2</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+ 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(19.39)</span></span>
<span class="line"><span>With some algebra, this can be expressed in pole-zero form as</span></span>
<span class="line"><span>Gcd(z)= Gc∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ωLTs</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>) z−1−ωLTs/2</span></span>
<span class="line"><span>1+ωLTs/2</span></span>
<span class="line"><span>z−1 (19.40)</span></span>
<span class="line"><span>Since fL in PI compensators is usually very low compared to fs,(ωLTs/2)≪ 1, Eq. (19.40) can</span></span>
<span class="line"><span>be simpliﬁed as follows:</span></span>
<span class="line"><span>Gcd(z)≈Gc∞</span></span>
<span class="line"><span>z−(1−ωLTs)</span></span>
<span class="line"><span>z−1 (19.41)</span></span>
<span class="line"><span>The discrete-time PI compensator has a pole at z= 1, and a real zero at approximately 1 −</span></span>
<span class="line"><span>ωLTs. For a given sampling frequency fs= 1/Ts,a sωL approaches zero, the discrete-time zero</span></span>
<span class="line"><span>tends to z= 1. In general, mapping continuous-time low-frequency poles or zeroes results in</span></span>
<span class="line"><span>discrete-time poles or zeroes close to the+1 point of thez-plane. This can lead to roundoﬀerrors</span></span>
<span class="line"><span>and design constraints in implementation of discrete-time compensators, discussed further in</span></span>
<span class="line"><span>Sect. 19.4.</span></span>
<span class="line"><span>Figure 19.8 compares the magnitude and phase responses of the analog PI compensator</span></span>
<span class="line"><span>Gc(s)i nE q .( 19.38), with Gc∞= 1, fL = 20 kHz, and the discrete-time PI compensator in</span></span>
<span class="line"><span>Eq. (19.40) obtained by bilinear mapping with fs= 1M H z ,</span></span>
<span class="line"><span>Gcd(z)= 1.063 z−0.8743</span></span>
<span class="line"><span>z−1 (19.42)</span></span>
<span class="line"><span>One may observe that the magnitude and phase responses match very well over frequencies well</span></span>
<span class="line"><span>below the sampling rate fs. The responses in Fig. 19.8 are plotted up to the Nyquist frequency</span></span>
<span class="line"><span>fs/2= 500 kHz.</span></span>
<span class="line"><span>As another example, consider mapping a PD compensator described in Sect. 9.5.1,</span></span>
<span class="line"><span>Gc(s)= Gc0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>) (19.43)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems 819</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>Magnitude [dB]</span></span>
<span class="line"><span>1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>80</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Phase [deg]</span></span>
<span class="line"><span>||Gc( jw)||</span></span>
<span class="line"><span>||Gcd ( jw)||</span></span>
<span class="line"><span>∠Gcd ( jw)</span></span>
<span class="line"><span>∠Gc( jw)</span></span>
<span class="line"><span>Fig. 19.8 Magnitude and phase responses of an analog, continuous-time PI compensatorGc(s), Gc∞= 1,</span></span>
<span class="line"><span>fL = 20 kHz, and the discrete-time compensator Gcd(z) obtained by bilinear mapping, fs = 1M H z</span></span>
<span class="line"><span>The bilinear mapping, Eq. (19.36), results in</span></span>
<span class="line"><span>Gcd(z)= Gc0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜</span></span>
<span class="line"><span>⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>1+ 2ωzTs</span></span>
<span class="line"><span>1+ 2</span></span>
<span class="line"><span>ωpTs</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟</span></span>
<span class="line"><span>⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>z−1−ω</span></span>
<span class="line"><span>zTs/2</span></span>
<span class="line"><span>1+ωzTs/2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>z−1−ωpTs/2</span></span>
<span class="line"><span>1+ωpTs/2</span></span>
<span class="line"><span>) (19.44)</span></span>
<span class="line"><span>The discrete-time PD compensator has a zero and a pole on the real z-plane axis. Suppose</span></span>
<span class="line"><span>that fs = 1 MHz and that it is desired to implement digitally a PD compensator with Gc0= 1,</span></span>
<span class="line"><span>fz= 100 kHz, fp= 400 kHz. Note that in this case the continuous-time zero and pole frequen-</span></span>
<span class="line"><span>cies are not much lower than the sampling frequency fs. By substituting the numerical values</span></span>
<span class="line"><span>in Eq. (19.40), we get</span></span>
<span class="line"><span>Gcd(z)= 2.329 z−0.5219</span></span>
<span class="line"><span>z+ 0.1137 (19.45)</span></span>
<span class="line"><span>The frequency responses of Gc(s) and Gcd(z) are compared in Fig. 19.9. Since the PD compen-</span></span>
<span class="line"><span>sator corner frequencies are relatively high, discrepancies can be observed in both magnitude</span></span>
<span class="line"><span>and phase responses, especially at frequencies approaching fs/2. After reaching a maximum</span></span>
<span class="line"><span>phase lead at √fz fp = 200 kHz, the phase of Gcd drops much faster with frequency than the</span></span>
<span class="line"><span>phase of Gc. The magnitude of Gcd is larger than the magnitude of Gc at all frequencies of</span></span>
<span class="line"><span>interest, and the diﬀerence in magnitude responses increases with frequency.</span></span>
<span class="line"><span>A generalization of the bilinear (Tustin) mapping known as frequency prewarping [176] can</span></span>
<span class="line"><span>be applied to mitigate, to some extent, the diﬀerences between Gc and Gcd frequency responses</span></span>
<span class="line"><span>in cases when corner frequencies of interest are relatively close to fs/2. The bilinear mapping</span></span>
<span class="line"><span>with prewarp is performed as follows:</span></span>
<span class="line"><span>s→kprewarp</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+ 1. (19.46)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>820 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>10 kHz 100 kHz</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>Magnitude [dB]</span></span>
<span class="line"><span>10 kHz 100 kHz</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>Phase [deg]</span></span>
<span class="line"><span>∠Gc( jw)</span></span>
<span class="line"><span>∠Gcd ( jw)</span></span>
<span class="line"><span>∠G∗</span></span>
<span class="line"><span>cd ( jw)</span></span>
<span class="line"><span>||G∗</span></span>
<span class="line"><span>cd ( jw)||</span></span>
<span class="line"><span>||Gcd ( jw)||</span></span>
<span class="line"><span>||Gc( jw)||</span></span>
<span class="line"><span>Fig. 19.9 Magnitude and phase responses of an analog, continuous-time PD compensator Gc(s), Gc0 =</span></span>
<span class="line"><span>1, fz = 100 kHz, fp = 400 kHz, the discrete-time compensator Gcd(z) obtained by bilinear mapping,</span></span>
<span class="line"><span>fs = 1 MHz, and the discrete-time compensator G∗</span></span>
<span class="line"><span>cd(z) obtained by bilinear mapping with prewarping at</span></span>
<span class="line"><span>fprewarp= 200 kHz</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd(z)= Gc(s)|s→kprewarp 2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+1</span></span>
<span class="line"><span>(19.47)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>kprewarp= ωprewarpTs/2</span></span>
<span class="line"><span>tan</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>ωprewarpTs/2</span></span>
<span class="line"><span>) (19.48)</span></span>
<span class="line"><span>is found so that the magnitude and the phase of Gc and G∗</span></span>
<span class="line"><span>cd match exactly at a particular fre-</span></span>
<span class="line"><span>quencyωprewarp,</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd( jωprewarp)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>Gc( jωprewarp)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>∠G∗</span></span>
<span class="line"><span>cd( jωprewarp)=∠Gc( jωprewarp)</span></span>
<span class="line"><span>(19.49)</span></span>
<span class="line"><span>Figure 19.9 shows the frequency responses of the discrete-time compensator G∗</span></span>
<span class="line"><span>cd obtained by</span></span>
<span class="line"><span>bilinear mapping with the prewarp frequency fprewarp = √fz fp = 200 kHz. The exact match</span></span>
<span class="line"><span>between Gcd∗and Gc at the prewarp frequency, and the improved match around the prewarp</span></span>
<span class="line"><span>frequency, are obtained at the expense of somewhat increased mismatch at lower frequencies.</span></span>
<span class="line"><span>As a ﬁnal example in this section, consider mapping the continuous-time PID compensator</span></span>
<span class="line"><span>described in Sect. 9.5.3. The compensator transfer function is</span></span>
<span class="line"><span>Gc(s)= Gcm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ωL</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>) ⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>) (19.50)</span></span>
<span class="line"><span>Compared to the transfer function in Eq. ( 9.64), the second pole at fp2 has been dropped from</span></span>
<span class="line"><span>the transfer function in Eq. ( 19.50). In a practical analog controller implementation, the high-</span></span>
<span class="line"><span>frequency pole at fp2 must be present to cause the gain to roll o ﬀat high frequencies and to</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.2 Introduction to Discrete-Time Systems 821</span></span>
<span class="line"><span>prevent the switching ripple from disrupting the operation of the analog pulse-width modula-</span></span>
<span class="line"><span>tor. Furthermore, the high-frequency pole is unavoidable due to analog circuit implementation</span></span>
<span class="line"><span>limitations, such as the op amp gain-bandwidth product. In the digital controller realization of</span></span>
<span class="line"><span>Fig. 19.1, the sensed analog voltage is sampled by the A /D converter at the rate equal to the</span></span>
<span class="line"><span>switching frequency. As a result, the switching ripple components are not present in the digi-</span></span>
<span class="line"><span>tal compensator, and there is no reason to map the high-frequency pole at fp2 to discrete-time.</span></span>
<span class="line"><span>Instead, the high-frequency (anti-aliasing) ﬁltering can be left in the sensing transfer function</span></span>
<span class="line"><span>H(s) in the analog domain, where it serves the purpose of attenuating switching ripples and</span></span>
<span class="line"><span>noise before A/D conversion. Using Eq. ( 19.47), the z-domain, discrete-time transfer function</span></span>
<span class="line"><span>of the PID compensator is obtained,</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd(z)= Gd</span></span>
<span class="line"><span>(z−zL)(z−zz)</span></span>
<span class="line"><span>(z−1)(z−zp) (19.51)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Gd= Gcm</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ a fL</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ a fz</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ a fp1</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>(19.52)</span></span>
<span class="line"><span>zL=</span></span>
<span class="line"><span>1−a fL</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>1+ a fL</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>, zz=</span></span>
<span class="line"><span>1−a fz</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>1+ a fz</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>, zp=</span></span>
<span class="line"><span>1−a fp1</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>1+ a fp1</span></span>
<span class="line"><span>fprewarp</span></span>
<span class="line"><span>(19.53)</span></span>
<span class="line"><span>a= tan</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>πfprewarp</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(19.54)</span></span>
<span class="line"><span>The mapping techniques discussed in this section, and many others, are well supported</span></span>
<span class="line"><span>by computer tools such as MATLAB [ 236]. Table 19.3 summarizes the bilinear mapping</span></span>
<span class="line"><span>(Eqs. 19.35, 19.36) and the bilinear mapping with prewarp (Eqs. 19.46–19.48), together with</span></span>
<span class="line"><span>the corresponding MATLAB functions.</span></span>
<span class="line"><span>Table 19.3 Continuous-time to discrete-time mapping</span></span>
<span class="line"><span>Method mapping MATLAB function</span></span>
<span class="line"><span>Bilinear (Tustin) s→2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+ 1 Gcd= c2d(Gc,Ts,’tustin’)</span></span>
<span class="line"><span>Bilinear (Tustin) with prewarp s→kprewarp</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>z+ 1 Gcd= c2d(Gc,Ts,’prewarp’,wprewarp)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>822 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>19.3 Discrete-Time Compensator Design</span></span>
<span class="line"><span>The loop gain Td in a digitally controlled converter includes the sensor transfer function H(s),</span></span>
<span class="line"><span>the control-to-output transfer function Gvd(s), the delay modeled as Gdelay(s)= e−std , and the</span></span>
<span class="line"><span>compensator transfer function Gcd(z)( o rG∗</span></span>
<span class="line"><span>cd(z)). It should be noted that the loop gain does not</span></span>
<span class="line"><span>include a zero-order-hold. The magnitude and phase responses of the loop gainTd can be found</span></span>
<span class="line"><span>as</span></span>
<span class="line"><span>Td( jω)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>H(s)Gvd(s)e−std</span></span>
<span class="line"><span>) ⏐⏐⏐⏐s→jω</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd(z)</span></span>
<span class="line"><span>⏐⏐⏐⏐z→ejωTs</span></span>
<span class="line"><span>(19.55)</span></span>
<span class="line"><span>Compared to the loop gain in an analog voltage-mode controlled converter, Eq. ( 9.4) with</span></span>
<span class="line"><span>VM = 1, Eq. (19.55)d iﬀers in two ways: the presence of the delay, and the sampled-data discrete-</span></span>
<span class="line"><span>time nature of the compensator Gcd. These diﬀerences are illustrated in the following example.</span></span>
<span class="line"><span>Example</span></span>
<span class="line"><span>The objective of this example is to evaluate the loop gain frequency response in Eq. (19.55) and</span></span>
<span class="line"><span>to compare it to the loop gain response with an analog controller. An analog PID compensator</span></span>
<span class="line"><span>is designed for a synchronous buck converter operating at fs = 1 MHz switching frequency.</span></span>
<span class="line"><span>The analog compensator transfer function given in Eq. ( 9.64), with fL = 8k H z ,fz = 33 kHz,</span></span>
<span class="line"><span>Gcm= 5.45, fp1= 300 kHz, fp2= 1 MHz, results in the crossover frequency fc= 100 kHz with</span></span>
<span class="line"><span>52◦phase margin. In equilibrium, V= Vre f = 1.8 V , so thatD≈V/Vg= 0.36.</span></span>
<span class="line"><span>Before mapping the analog compensator to discrete-time, the high-frequency pole at fp2 is</span></span>
<span class="line"><span>removed from the analog compensator transfer function. This pole is instead allocated to an</span></span>
<span class="line"><span>analog anti-aliasing ﬁlter in voltage sensing before the A/D converter,</span></span>
<span class="line"><span>H(s)= 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp2</span></span>
<span class="line"><span>(19.56)</span></span>
<span class="line"><span>Based on Gc(s)o fE q .( 19.50), with the use of bilinear mapping with the prewarp frequency</span></span>
<span class="line"><span>equal to the target crossover frequency, a discrete-time compensator of Eq. ( 19.51) is obtained</span></span>
<span class="line"><span>from Eqs. (19.52)–(19.54):</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd(z)= 27.3898(z−0.9493)(z−0.8063)</span></span>
<span class="line"><span>(z−1)(z−0.01278) (19.57)</span></span>
<span class="line"><span>The magnitude and phase responses of the loop gain Td, evaluated from Eq. (19.55), are shown</span></span>
<span class="line"><span>in Fig. 19.10 for several values of the loop delay td, in comparison to the loop gain responses</span></span>
<span class="line"><span>in the analog controlled converter (td= 0). The bilinear mapping with prewarp frequency equal</span></span>
<span class="line"><span>to the crossover frequency preserves the magnitude response very well. Furthermore, the delay</span></span>
<span class="line"><span>term does not aﬀect the magnitude responses at all. As a result, the magnitude responses in</span></span>
<span class="line"><span>the digital control loop stay essentially the same as the loop gain magnitude response with the</span></span>
<span class="line"><span>analog controller, and the crossover frequency remains the same, f</span></span>
<span class="line"><span>c ≈100 kHz. However, the</span></span>
<span class="line"><span>digital control loop delay more signiﬁcantly aﬀects the phase responses and the resulting phase</span></span>
<span class="line"><span>margins. The shortest considered delaytd= DTs= 0.36 μs assumes a high-performance digital</span></span>
<span class="line"><span>controller where the A/D conversion and the compensator computations are completed very</span></span>
<span class="line"><span>quickly so that tctrl ≈0. From Eq. (19.14), the additional phase lag at the crossover frequency</span></span>
<span class="line"><span>is−ωctd =−13◦, which reduces the phase margin to 52◦−13◦= 39◦. A delay of td = DTs+</span></span>
<span class="line"><span>Ts/2= 0.86 μs, which corresponds to tctrl = Ts/2= 0.5 μs, reduces the phase margin to 52◦−</span></span>
<span class="line"><span>31◦= 21◦. The ﬁnal case is when the A/D conversion and the compensator calculations take</span></span>
<span class="line"><span>an entire switching period, tctrl = Ts, which is representative of a very low-performance digital</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.3 Discrete-Time Compensator Design 823</span></span>
<span class="line"><span>td = 0</span></span>
<span class="line"><span>td = 0.36 ms</span></span>
<span class="line"><span>td = 0.86 ms</span></span>
<span class="line"><span>td = 1.36 ms</span></span>
<span class="line"><span>∠T</span></span>
<span class="line"><span>||T||</span></span>
<span class="line"><span>Fig. 19.10 Loop gain magnitude and phase responses in the synchronous buck converter design example</span></span>
<span class="line"><span>with the analog controller ( td = 0), and with digital controllers with several loop delays, td = DTs =</span></span>
<span class="line"><span>0.36 μs, td = DTs+ 0.5Ts = 0.86 μs, td = DTs+ Ts = 1.36 μs</span></span>
<span class="line"><span>implementation. In this case, the delay of td= DTs+ Ts= 1.36 μs reduces the phase margin to</span></span>
<span class="line"><span>just 52◦−49◦= 3◦. The example illustrates that the loop delay can be a very signiﬁcant factor</span></span>
<span class="line"><span>in the design of high-performance, wide-bandwidth digital control loops for high-frequency</span></span>
<span class="line"><span>switching power converters.</span></span>
<span class="line"><span>19.3.1 Design Procedure</span></span>
<span class="line"><span>A basic discrete-time compensator design procedure is described in this section based on the</span></span>
<span class="line"><span>description of the digital control loop and loop delay in Sect. 19.1, the analog regulator design</span></span>
<span class="line"><span>of Sect. 9.5, and the continuous-time to discrete-time mapping techniques of Sect. 19.2.3.T h e</span></span>
<span class="line"><span>approach consists of four steps:</span></span>
<span class="line"><span>1. Find the system uncompensated loop gain Tud(s), including the anticipated delay td due to</span></span>
<span class="line"><span>digital implementation, as discussed in Sect.19.1, and anti-aliasing analog ﬁltering in H(s):</span></span>
<span class="line"><span>Tud(s)= H(s)Gvd(s)Gdelay(s)= H(s)Gvd(s)e−std (19.58)</span></span>
<span class="line"><span>2. Design an analog continuous-time compensator Gc(s) using techniques discussed in Sect.9.5,</span></span>
<span class="line"><span>except that high-frequency analog roll-oﬀpoles should not be included in Gc(s). As ex-</span></span>
<span class="line"><span>plained further in the next section, in a PID compensator design, one may choose to position</span></span>
<span class="line"><span>the high-frequency pole at fp1 according to Eq. ( 19.68) so that the resulting discrete-time</span></span>
<span class="line"><span>compensator has the standard PID form of Eq. (19.69).</span></span>
<span class="line"><span>3. Map the analog compensator Gc(s) designed in Step 2 to the discrete-time compensator</span></span>
<span class="line"><span>Gcd(z) using the bilinear mapping, or to the discrete-time compensator G∗</span></span>
<span class="line"><span>cd(s)u s i n gt h e</span></span>
<span class="line"><span>bilinear mapping with prewarp, as discussed in Sect.19.2.3. The crossover frequency fc and</span></span>
<span class="line"><span></span></span>
<span class="line"><span>824 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>the phase margin designed in Step 2 can be preserved by choosing the prewarp frequency</span></span>
<span class="line"><span>fprewarp equal to the target crossover frequency fc,</span></span>
<span class="line"><span>fprewarp= fc (19.59)</span></span>
<span class="line"><span>4. Evaluate magnitude and phase responses of the loop gain Td using Eq. ( 19.55), and ver-</span></span>
<span class="line"><span>ify that the design targets are met. Furthermore, closed-loop frequency responses can be</span></span>
<span class="line"><span>evaluated as in Eqs. (9.4), but with Td from Eq. (19.55) replacing the continuous-time loop</span></span>
<span class="line"><span>gain T.</span></span>
<span class="line"><span>5. Realize the discrete-time compensator as described in Sect. 19.4.</span></span>
<span class="line"><span>The digital compensator design approach described in this section is based on continuous-time</span></span>
<span class="line"><span>small-signal averaged converter models, standard analog design techniques, and mapping from</span></span>
<span class="line"><span>continuous time to discrete time. It should be noted that Eq. (19.58) is an approximation based</span></span>
<span class="line"><span>on standard averaging techniques. Exact converter discrete-time converter models [ 237] allow</span></span>
<span class="line"><span>applications of more advanced design techniques directly in z-domain [176]. These techniques</span></span>
<span class="line"><span>are described in more detail in [223].</span></span>
<span class="line"><span>19.3.2 Design Example</span></span>
<span class="line"><span>The objective is to design a discrete-time digital compensatorGcd around the synchronous buck</span></span>
<span class="line"><span>converter shown in Fig.19.1. The input dc voltage is Vg= 5 V , and the objective is to precisely</span></span>
<span class="line"><span>regulate the output voltage to V = Vre f = 1.8 V . The inductance is L= 1 μH, with a series</span></span>
<span class="line"><span>resistance Rs = 30 mΩthat models a combination of MOSFET on-resistance and the inductor</span></span>
<span class="line"><span>winding resistance. The output ﬁlter capacitor has C= 200 μF and an equivalent series resis-</span></span>
<span class="line"><span>tance Resr = 0.8mΩ. The converter operates at fs = 1 MHz switching frequency, and the load</span></span>
<span class="line"><span>current is between 0 A and 5 A. When the converter is unloaded (R is very large), the converter</span></span>
<span class="line"><span>control-to-output transfer function is</span></span>
<span class="line"><span>Gvd(s)= Gd0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωesr</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (19.60)</span></span>
<span class="line"><span>where Gd0 = Vg = 5V , fesr = 1/(2πResrC)= 1M H z ,f0 ≈1/(2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC)= 11.3 kHz and</span></span>
<span class="line"><span>Q≈√L/C/(Rs+ Resr )= 2.3.</span></span>
<span class="line"><span>Let us ﬁrst design an analog PID compensator to achieve a crossover frequencyf= 100 kHz</span></span>
<span class="line"><span>with a phase margin of 52◦. Assuming H= 1, and VM = 1 V , following the design approach</span></span>
<span class="line"><span>exempliﬁed in Sect. 9.5.4, we arrive at the analog PID compensator</span></span>
<span class="line"><span>Gc(s)= Gcm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ωL</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>) ⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp2</span></span>
<span class="line"><span>) (19.61)</span></span>
<span class="line"><span>where Gcm = 5.45, fL = 8k H z ,fz = 33 kHz, and fp1 = 300 kHz are determined to meet the</span></span>
<span class="line"><span>crossover frequency and phase margin speciﬁcations, while fp2 = 1 MHz represents a high-</span></span>
<span class="line"><span>frequency pole in the analog control loop. The objective now is to follow the procedure outlined</span></span>
<span class="line"><span>in this section to design a digital controller given the same crossover frequency and phase mar-</span></span>
<span class="line"><span>gin speciﬁcations.</span></span></code></pre></div>`,10)])])}const m=s(i,[["render",l]]);export{u as __pageData,m as default};
