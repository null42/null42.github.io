import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第19章part 2 - 19 Digital Control of Switched-Mode Power Converters","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第19章part 2 - 19 Digital Control of Switched-Mode Power Converters","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 827-846 > Chunk ID: `chapter-19-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/051-chapter-19-part-2.md","filePath":"content/power/fundamentals-work/chunks/051-chapter-19-part-2.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/051-chapter-19-part-2.md"};function l(t,n,o,c,r,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="第19章part-2-19-digital-control-of-switched-mode-power-converters" tabindex="-1">第19章part 2 - 19 Digital Control of Switched-Mode Power Converters <a class="header-anchor" href="#第19章part-2-19-digital-control-of-switched-mode-power-converters" aria-label="Permalink to &quot;第19章part 2 - 19 Digital Control of Switched-Mode Power Converters&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 827-846<br> Chunk ID: <code>chapter-19-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>19.3 Discrete-Time Compensator Design 825</span></span>
<span class="line"><span>In the introductory part of this section, we have found that the loop delay can a ﬀect the</span></span>
<span class="line"><span>digital control loop signiﬁcantly, and that excessive loop delays make it impossible to design</span></span>
<span class="line"><span>wide-bandwidth digital control loops. Let us assume a high-performance digital controller im-</span></span>
<span class="line"><span>plementation, with the delay td= DTs= 0.36 μs in the converter operating at fs= 1M H z .T h e</span></span>
<span class="line"><span>design objectives are the same as for the analog control loop: very large loop gain at low fre-</span></span>
<span class="line"><span>quencies, fc= 100 kHz crossover frequency, and 52◦phase margin. A single-pole anti-aliasing</span></span>
<span class="line"><span>ﬁlter with a pole at fp2= 1 MHz is included in the voltage sensor transfer function, Eq. (19.56).</span></span>
<span class="line"><span>Using the analog compensator design as a starting point, the PI corner frequency is kept the</span></span>
<span class="line"><span>same, fL = 8 kHz. Since the delay td introduces−13◦phase at the target crossover frequency,</span></span>
<span class="line"><span>the PD compensator must be redesigned to boost the phase lead at fc to 52◦+ 13◦= 65◦.G i v e n</span></span>
<span class="line"><span>the required phase leadθ= 65◦at fc= 100 kHz, Eq. (9.57) leads to fz= 22 kHz, fp1= 450 kHz.</span></span>
<span class="line"><span>Finally, Gcm is found to achieve the target crossover frequency,</span></span>
<span class="line"><span>Gcm=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>⎦fc</span></span>
<span class="line"><span>fo</span></span>
<span class="line"><span>)2 1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= 3.51/V (19.62)</span></span>
<span class="line"><span>Now that all parameters in the analog compensator of Eq. ( 19.50) have been determined,</span></span>
<span class="line"><span>Eqs. (19.52)–(19.54) yield the discrete-time compensator for fprewarp = fc,</span></span>
<span class="line"><span>G∗</span></span>
<span class="line"><span>cd(z)= 31.7593(z−0.9493)(z−0.8654)</span></span>
<span class="line"><span>(z−1)(z+ 0.1881) (19.63)</span></span>
<span class="line"><span>Figure 19.11 compares the loop gain magnitude and phase responses in the synchronous buck</span></span>
<span class="line"><span>regulator design example with the analog compensator in Eq. (19.61), and with the digital con-</span></span>
<span class="line"><span>troller designed to take into account the loop delaytd= DTs= 0.36 μs. Note that approximately</span></span>
<span class="line"><span>the same crossover frequency and phase margin have been achieved in the digitally controlled</span></span>
<span class="line"><span>regulator.</span></span>
<span class="line"><span>||T|| (analog controller)</span></span>
<span class="line"><span>||Td|| (digital controller)</span></span>
<span class="line"><span>∠Td</span></span>
<span class="line"><span>∠T</span></span>
<span class="line"><span>Fig. 19.11 Loop gain magnitude and phase responses in the synchronous buck regulator design example</span></span>
<span class="line"><span>with the analog controller ( td = 0), and with the digital controller designed to take into account the loop</span></span>
<span class="line"><span>delay td = DTs= 0.36 μs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>826 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span> 1 % Synchronous Buck converter parameters</span></span>
<span class="line"><span> 2 Vg = 5; Vref = 1.8; D = Vref/Vg; % Input and reference voltages, duty cycle</span></span>
<span class="line"><span> 3 L = 1e-6; RL = 30e-3; % Inductance and series resistance</span></span>
<span class="line"><span> 4 C = 200e-6; Resr = 0.8e-3; % Capacitance and capacitor ESR</span></span>
<span class="line"><span> 5 fo = 1/(2*pi*sqrt(L*C)); % Pole frequency</span></span>
<span class="line"><span> 6 R = 1000; % Load resistance</span></span>
<span class="line"><span> 7 fs = 1e6; Ts = 1/fs; % Switching frequency and period</span></span>
<span class="line"><span> 8 </span></span>
<span class="line"><span> 9 s = tf(&#39;s&#39;); z = tf(&#39;z&#39;,Ts); % Define s and z</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>11 % Open-loop control to output transfer function</span></span>
<span class="line"><span>12 Gvd = Vg*(Resr+1/s/C)/(Resr + 1/s/C + s*L + RL); </span></span>
<span class="line"><span>13 fp2 = 1e6; H = 1/(1 + s/2/pi/fp2); % Sensor transfer function</span></span>
<span class="line"><span>14 Tu = H * Gvd; % Uncompensated loop gain, no delay</span></span>
<span class="line"><span>15</span></span>
<span class="line"><span>16 % Analog PID compensator</span></span>
<span class="line"><span>17 fc = 100e3; % Cross-over frequency</span></span>
<span class="line"><span>18 fL = 8e3; fz = 33e3; fp1 = 300e3; % Corner frequencies</span></span>
<span class="line"><span>19 Gcm = sqrt(fz/fp1)*(fc/fo)^2/Vg; % Mid-frequency gain</span></span>
<span class="line"><span>20 % Analog compensator transfer function</span></span>
<span class="line"><span>21 Gc = Gcm*(1 + 2*pi*fL/s)*(1 + s/2/pi/fz)/(1+s/2/pi/fp1); </span></span>
<span class="line"><span>22 T = Gc*Tu; % Loop gain with analog compensator</span></span>
<span class="line"><span>23</span></span>
<span class="line"><span>24 % Uncompensated loop gain, including delay</span></span>
<span class="line"><span>25 td = D*Ts; % Delay in the digital control loop</span></span>
<span class="line"><span>26 Tu.IODelay = td; % Delay</span></span>
<span class="line"><span>27 Tud = c2d(Tu,Ts,&#39;impulse&#39;); % Mapping of Tu with delay </span></span>
<span class="line"><span>28 % Analog PID compensator redesigned for digital implementation</span></span>
<span class="line"><span>29 fL = 8e3; fz = 22e3; fp1 = 450e3; % Corner frequencies</span></span>
<span class="line"><span>30 Gcm = sqrt(fz/fp1)*(fc/fo)^2/Vg; % Mid-frequency gain</span></span>
<span class="line"><span>31 Gca = Gcm*(1 + 2*pi*fL/s)*(1 + s/2/pi/fz)/(1+s/2/pi/fp1);</span></span>
<span class="line"><span>32 % Digital compensator transfer function</span></span>
<span class="line"><span>33 Gcd = c2d(Gca, Ts, &#39;prewarp&#39;, 2*pi*fc);</span></span>
<span class="line"><span>34 Td = Tud*Gcd; % Loop gain with digital compensator</span></span>
<span class="line"><span>35</span></span>
<span class="line"><span>36 % Compare magnitude and phase responses of T and Td</span></span>
<span class="line"><span>37 options = bodeoptions; options.Grid = &#39;on&#39;; </span></span>
<span class="line"><span>38 options.FreqUnits = &#39;Hz&#39;; options.XLim = [100, 500e3]; </span></span>
<span class="line"><span>39 bode(T, &#39;k&#39;, options); % Bode plot of T</span></span>
<span class="line"><span>40 hold on; % Overlay plots </span></span>
<span class="line"><span>41 bode(Td, &#39;b&#39;, options); % Bode plot of Td</span></span>
<span class="line"><span>Fig. 19.12 A MATLAB script that generates the analog and digital loop gain Bode plots shown in</span></span>
<span class="line"><span>Fig. 19.11</span></span>
<span class="line"><span>A MATLAB script that generates the plots in Fig. 19.11 is shown in Fig. 19.12. The script</span></span>
<span class="line"><span>starts by assigning the converter parameters (lines 1-7), followed by deﬁnitions of complex vari-</span></span>
<span class="line"><span>ables s and z (line 9). Open-loop control-to-output transfer function of the buck converterGvd(s)</span></span>
<span class="line"><span>and the uncompensated loop gain Tu(s) are formulated in lines 11-14. Analog PID compensator</span></span>
<span class="line"><span>parameters are deﬁned in lines 16-19 followed by the analog compensator transfer function</span></span>
<span class="line"><span>Gc(s) in line 21 and the loop gain T(s) with the analog compensator in line 22. No delays are</span></span>
<span class="line"><span>included in the analog controller. In line 26, delay td = DTs is included as a property of the un-</span></span>
<span class="line"><span>compensated loop gain, which is then mapped to discrete-time uncompensated loop gain Tud(z)</span></span>
<span class="line"><span>in line 27. The analog compensator, redesigned to take the delay into account, is deﬁned in lines</span></span>
<span class="line"><span>28–31, and then mapped in line 33 to obtain the compensator G∗</span></span>
<span class="line"><span>cd(z), and the loop gain Td(z)</span></span>
<span class="line"><span>in line 34. Bode plots of T(s) and Td(z) are generated in lines 36-41 using the MATLABbode</span></span>
<span class="line"><span>command.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 827</span></span>
<span class="line"><span>v(t)( analog controller)</span></span>
<span class="line"><span>v(t)( digital controller)</span></span>
<span class="line"><span>vc(t)( analog controller)</span></span>
<span class="line"><span>vc[n]( digital controller)</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 19.13 Step-load (2.5 A to 5 A) transient responses in the synchronous buck converter example with</span></span>
<span class="line"><span>the analog controller (td = 0), and with the digital controller designed to take into account the loop delay</span></span>
<span class="line"><span>td = DTs = 0.36 μs: ( a) control signals vc for the analog and digital controllers, ( b) output voltage</span></span>
<span class="line"><span>responses v(t) for the analog and digital controllers</span></span>
<span class="line"><span>Figure 19.13 compares step-load (2.5 A to 5 A) transient responses. While the output volt-</span></span>
<span class="line"><span>age v(t) responses in Fig. 19.13b are very similar, diﬀerences can be appreciated in the control</span></span>
<span class="line"><span>signal responses shown in Fig. 19.13a. The digital controller produces discrete-time step-wise</span></span>
<span class="line"><span>waveform vc[n], while vc(t) in the analog controller is a continuous-time waveform that includes</span></span>
<span class="line"><span>a switching-ripple component.</span></span>
<span class="line"><span>19.4 Digital Controller Implementation</span></span>
<span class="line"><span>Digital controllers can be practically realized in a number of ways. For example, many stan-</span></span>
<span class="line"><span>dard microcontrollers or digital signal processing chips are now available, featuring multiple</span></span>
<span class="line"><span>PWM and A/D conversion channels, allowing software-based control and power management</span></span>
<span class="line"><span>functions. The digital controller and its digital compensation algorithm are implemented in the</span></span>
<span class="line"><span>ﬁrmware of these chips, using a programming language such as C. An alternative approach</span></span>
<span class="line"><span>consists of implementing the control loop in hardware, using ﬁeld-programmable gate arrays</span></span>
<span class="line"><span>(FPGA) or custom integrated circuits. In combination with specialized A/D and DPWM blocks,</span></span>
<span class="line"><span>this approach enables high-performance designs at high switching frequencies. Controllers of</span></span>
<span class="line"><span>this type can be developed, realized and tested using standard digital design ﬂow starting from</span></span>
<span class="line"><span></span></span>
<span class="line"><span>828 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>logic functions described using a hardware description language (HDL) such as VHDL or Ver-</span></span>
<span class="line"><span>ilog, prototyping and experimental veriﬁcations using FPGA development platforms, ultimately</span></span>
<span class="line"><span>targeting relatively small, relatively low gate-count integrated circuits capable of matching or</span></span>
<span class="line"><span>surpassing state-of-the-art analog solutions in terms of dynamic performance, power consump-</span></span>
<span class="line"><span>tion and cost. This section provides an introduction to digital controller implementation issues,</span></span>
<span class="line"><span>with pointers to further details discussed in literature.</span></span>
<span class="line"><span>19.4.1 Discrete-Time Compensator Realization</span></span>
<span class="line"><span>Analog compensators are typically realized usingRC networks around standard analog building</span></span>
<span class="line"><span>blocks - operational or transconductance ampliﬁers. A discrete-time compensatorG</span></span>
<span class="line"><span>cd is realized</span></span>
<span class="line"><span>using digital building blocks: adders, multipliers, and storage elements. There are many possible</span></span>
<span class="line"><span>ways to arrange these building blocks to realize a givenGcd(z)[ 176, 223]. This section presents</span></span>
<span class="line"><span>two realization architectures particularly well suited for discrete-time PI or PID compensators</span></span>
<span class="line"><span>in the digital control loop around a converter: a cascade realization, and a parallel realization.</span></span>
<span class="line"><span>The cascade realization of a PID transfer function Gcd(z)i nE q .( 19.51)i ss h o w ni n</span></span>
<span class="line"><span>Fig. 19.14.</span></span>
<span class="line"><span>ve[n] vc[n]</span></span>
<span class="line"><span>zL zz zp</span></span>
<span class="line"><span>z− 1 z− 1 z− 1 z− 1</span></span>
<span class="line"><span>Gd</span></span>
<span class="line"><span>Anti wind-up</span></span>
<span class="line"><span>limiter</span></span>
<span class="line"><span>u1[n] u2[n] u3[n] u4[n]</span></span>
<span class="line"><span>Fig. 19.14 Cascade realization of the discrete-time PID compensator</span></span>
<span class="line"><span>The equations that can be used as a starting point in coding the compensator in microcon-</span></span>
<span class="line"><span>troller software or in HDL are as follows:</span></span>
<span class="line"><span>u1[n]= Gdve[n]</span></span>
<span class="line"><span>u2[n]= u1[n]−zLu1[n−1]</span></span>
<span class="line"><span>u3[n]= u2[n]−zzu2[n−1]</span></span>
<span class="line"><span>u4[n]= u3[n]+ zpu4[n−1]</span></span>
<span class="line"><span>vc[n]= u4[n]+ vc[n−1]</span></span>
<span class="line"><span>(19.64)</span></span>
<span class="line"><span>The compensator parameters, the gainGd, the zeroeszL, zz and the polezp, are the multiplicative</span></span>
<span class="line"><span>factors, which can easily be programmable. Integration, which is performed in the last step of</span></span>
<span class="line"><span>Eq. (19.64), includes a limiter. The purpose of the limiter is to prevent the duty-cycle command</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>c[n] at the integrator output from drifting away from the allowed operating range (0 to 1, as-</span></span>
<span class="line"><span>suming DPWM with VM = 1). This ”anti-windup” limiter function is similar to voltage limiting</span></span>
<span class="line"><span>at the output of an analog compensator built around an op amp. In coding the compensator,</span></span>
<span class="line"><span>one must also pay attention to the number of bits allocated to digital words representing the</span></span>
<span class="line"><span>parameters and the signal values in order to prevent overﬂows or other calculation errors [223].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 829</span></span>
<span class="line"><span>Another realization of the PID compensator is the parallel form, derived by a partial fraction</span></span>
<span class="line"><span>expansion of Gcd:</span></span>
<span class="line"><span>Gcd(z)= Gd</span></span>
<span class="line"><span>(z−zL)(z−zz)</span></span>
<span class="line"><span>(z−1)(z−zp) = KP+ Ki</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1−z−1 + KD</span></span>
<span class="line"><span>1−z−1</span></span>
<span class="line"><span>1−zpz−1 (19.65)</span></span>
<span class="line"><span>where the coeﬃcients KP, KD, and KI can be found in terms of Gd, zL, zz and zp parameters,</span></span>
<span class="line"><span>KP= Gd(zL+ zz−zp−(2−zp)zLzz)</span></span>
<span class="line"><span>KI = Gd</span></span>
<span class="line"><span>(1−zL)(1−zz)</span></span>
<span class="line"><span>1−zp</span></span>
<span class="line"><span>Kd= Gd</span></span>
<span class="line"><span>(zL−zp)(zz−zp)</span></span>
<span class="line"><span>(1−zp)2</span></span>
<span class="line"><span>(19.66)</span></span>
<span class="line"><span>The parallel realization is shown in Fig. 19.15.</span></span>
<span class="line"><span>ve[n] vc[n]</span></span>
<span class="line"><span>z− 1</span></span>
<span class="line"><span>z− 1</span></span>
<span class="line"><span>z− 1</span></span>
<span class="line"><span>Anti wind-up</span></span>
<span class="line"><span>limiter</span></span>
<span class="line"><span>KP</span></span>
<span class="line"><span>KI</span></span>
<span class="line"><span>KD</span></span>
<span class="line"><span>zp</span></span>
<span class="line"><span>up[n]</span></span>
<span class="line"><span>ui[n]</span></span>
<span class="line"><span>ud [n]</span></span>
<span class="line"><span>ud1[n]</span></span>
<span class="line"><span>Fig. 19.15 Parallel realization of the discrete-time PID compensator</span></span>
<span class="line"><span>The equations serving as a starting point for microcontroller or HDL coding are as follows:</span></span>
<span class="line"><span>up[n]= KPve[n]</span></span>
<span class="line"><span>ui[n]= KIve[n]+ ui[n−1]</span></span>
<span class="line"><span>ud1[n]= KD(ve[n]−ve[n−1])</span></span>
<span class="line"><span>ud[n]= ud1[n]+ zpud[n−1]</span></span>
<span class="line"><span>vc[n]= up[n]+ ui[n]+ ud[n]</span></span>
<span class="line"><span>(19.67)</span></span>
<span class="line"><span>Note that an anti-windup limiter is included in the integration stage.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>830 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>The discrete-time PID transfer function in Eq. ( 19.65) has two zeroes and two poles. One</span></span>
<span class="line"><span>pole is at z= 1, which correspond to the integral action in the compensator. The second pole at</span></span>
<span class="line"><span>z= zp corresponds to the high-frequency pole at fp1 in the continuous-time PID compensator.</span></span>
<span class="line"><span>From Eq. (19.53), it follows that</span></span>
<span class="line"><span>fp1= fprewarp</span></span>
<span class="line"><span>a = fprewarp</span></span>
<span class="line"><span>tan</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>πfprewarp</span></span>
<span class="line"><span>fs</span></span>
<span class="line"><span>) (19.68)</span></span>
<span class="line"><span>results in zp = 0. In this case, the discrete-time transfer function Gcd has a simple PID form</span></span>
<span class="line"><span>[176], with KP, KI, and KD representing the proportional, integral, and derivative gains, respec-</span></span>
<span class="line"><span>tively,</span></span>
<span class="line"><span>Gcd(z)= Gd</span></span>
<span class="line"><span>(z−zL)(z−zz)</span></span>
<span class="line"><span>z(z−1) = KP+ KI</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1−z−1 + KD(1−z−1) (19.69)</span></span>
<span class="line"><span>With zp= 0, the realization in Fig.19.15 is simpliﬁed because ud= ud1. The simple PID form is</span></span>
<span class="line"><span>particularly well suited for design techniques based on tuning the gains KP, KI and KD directly</span></span>
<span class="line"><span>[176, 223].</span></span>
<span class="line"><span>19.4.2 Quantization Eﬀects, Digital Pulse-Width Modulators and A/D Converters</span></span>
<span class="line"><span>Figures 19.2 and 19.3 show A/D and DPWM quantization characteristics, respectively. So far,</span></span>
<span class="line"><span>in modeling and design of the digital control loop, we have neglected the quantization e ﬀects</span></span>
<span class="line"><span>by simply assuming that very high-resolution A /D and DPWM blocks are employed, so that</span></span>
<span class="line"><span>Eq. ( 19.9) holds. It has been observed that the nonlinearities introduced by practical, ﬁnite</span></span>
<span class="line"><span>resolution A/D and DPWM blocks can result in persistent disturbances sometimes referred to</span></span>
<span class="line"><span>as ”limit cycling” [238–240]. The quantization eﬀects, as well as basic conditions necessary to</span></span>
<span class="line"><span>avoid limit-cycling disturbances, are discussed in this section ﬁrst, followed by an overview of</span></span>
<span class="line"><span>A/D and DPWM implementation approaches.</span></span>
<span class="line"><span>Assuming that a stable digital feedback control loop has been designed, a digitally controlled</span></span>
<span class="line"><span>converter is expected to operate at an equilibrium point where all controller variables have</span></span>
<span class="line"><span>constant values, and where all converter waveforms are periodic, with the period equal to T</span></span>
<span class="line"><span>s =</span></span>
<span class="line"><span>1/ fs. To ﬁnd the equilibrium solution, consider a dc model of a digitally controlled converter,</span></span>
<span class="line"><span>including A/D and DPWM quantization, as shown in Fig. 19.16. This is a static model, so the</span></span>
<span class="line"><span>discrete-time compensator is represented by its dc gain Gcd0,</span></span>
<span class="line"><span>Gcd0= Gcd(z)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>z→1</span></span>
<span class="line"><span>(19.70)</span></span>
<span class="line"><span>while H0 is the sensor dc gain. Neglecting losses, the converter is represented by an ideal</span></span>
<span class="line"><span>1: M(D) transformer, where M(D) = V/Vg is the dc conversion ratio. The A /D quantiza-</span></span>
<span class="line"><span>tion characteristics Ve[n]= QA/D(Ve(nTs)) is shown in Fig.19.2, while the DWPM quantization</span></span>
<span class="line"><span>D= QDPWM (Vc[n]) is shown in Fig. 19.3. An equilibrium solution in the model of Fig. 19.16</span></span>
<span class="line"><span>can be found using a graphical approach illustrated in Fig. 19.17, where the digital error signal</span></span>
<span class="line"><span>Ve[n]a tt h eA/D converter output is shown as a function of the analog sample Ve = Ve(nTs)a t</span></span>
<span class="line"><span>the A/D converter input.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 831</span></span>
<span class="line"><span>Vg V Ho</span></span>
<span class="line"><span>Vref</span></span>
<span class="line"><span>VeVe[n]Vc[n]</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>QDPWM QA/DGcdo</span></span>
<span class="line"><span>1: M(D)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>A/D</span></span>
<span class="line"><span>quantization</span></span>
<span class="line"><span>DPWM</span></span>
<span class="line"><span>quantization</span></span>
<span class="line"><span>Fig. 19.16 Dc model of a digitally controlled converter, including A/D and DPWM quantization</span></span>
<span class="line"><span>Vref</span></span>
<span class="line"><span>Vref</span></span>
<span class="line"><span>Ve</span></span>
<span class="line"><span>Ve[n]= QA/D(Ve)</span></span>
<span class="line"><span>Ve[n]</span></span>
<span class="line"><span>Ve[n]</span></span>
<span class="line"><span>Ve[n]= Ve</span></span>
<span class="line"><span>Ve = Vref − VgHoGcdoVe[n]</span></span>
<span class="line"><span>Ve = Vref − VgHoQDPWM (GcdoVe[n])</span></span>
<span class="line"><span>Ve</span></span>
<span class="line"><span>qA/D</span></span>
<span class="line"><span>VgHoqDPW M</span></span>
<span class="line"><span>qDPW M/Gcdo</span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>AB</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 19.17 Graphical approach to ﬁnding the quiescent operating point in a digitally controlled converter</span></span>
<span class="line"><span>with A/Dc o n v e r t e ra n dD P W Mh a v i n g(a) inﬁnite resolution, and (b) ﬁnite resolution. Expressions for Ve</span></span>
<span class="line"><span>as a function of Ve[n] are shown for the synchronous buck converter example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>832 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>Consider ﬁrst the case in Fig. 19.17a where very high-resolution A/D and DPWM are em-</span></span>
<span class="line"><span>ployed, so that quantization eﬀects can be neglected. In this case, the equilibrium solution is</span></span>
<span class="line"><span>found at the intersection of the A/D characteristic:</span></span>
<span class="line"><span>Ve[n]= Ve (19.71)</span></span>
<span class="line"><span>and the dc characteristic of the components around the loop:</span></span>
<span class="line"><span>Ve= Vre f−VgH0Gcd0Ve[n] (19.72)</span></span>
<span class="line"><span>This assumes a synchronous buck converter example with M(D)= D. Elimination of Ve from</span></span>
<span class="line"><span>Eqs. (19.71) and (19.72) allows an equilibrium solution to be found algebraically:</span></span>
<span class="line"><span>Ve[n]= Vre f</span></span>
<span class="line"><span>1+ VgH0Gcd0</span></span>
<span class="line"><span>(19.73)</span></span>
<span class="line"><span>When the dc gain Gcd0 is large but ﬁnite, then the equilibrium point denoted as point A in</span></span>
<span class="line"><span>Fig. 19.17a is achieved, which corresponds to a small but nonzero dc error. In the case when the</span></span>
<span class="line"><span>compensator includes an integral action, Gcd0→∞, then the equilibrium solution is at point B,</span></span>
<span class="line"><span>which corresponds to zero dc error. This is all consistent with the discussion in Sect.9.2, which</span></span>
<span class="line"><span>shows how a large dc loop gain drives the regulation error to zero.</span></span>
<span class="line"><span>Consider next a case where practical, ﬁnite resolution A /D and DPWM elements are em-</span></span>
<span class="line"><span>ployed. A graphical solution is illustrated Fig. 19.17b. The A/D quantization characteristic is</span></span>
<span class="line"><span>now highly nonlinear, Ve[n]= QA/D(Ve), with the widths of the A/D quantization bins equal to</span></span>
<span class="line"><span>qA/D. Because of the DPWM quantization, the characteristic around the loop is also nonlinear:</span></span>
<span class="line"><span>Ve= Vre f−VgH0QDPWM (Gcd0Ve[n]) (19.74)</span></span>
<span class="line"><span>Again this assumes a synchronous buck converter example with M(D)= D, and dc control-to-</span></span>
<span class="line"><span>output gain equal to Gd0= Vg. The widths of the horizontal bins in the characteristic around the</span></span>
<span class="line"><span>loop are equal to VgH0qDPWM where qDPWM = 1/2nDPWM is the LSB resolution of the DPWM.</span></span>
<span class="line"><span>The height of a vertical step in the characteristic given by Eq. (19.74) is equal toqDPWM/Gcd0.I f</span></span>
<span class="line"><span>the compensator dc gain Gcd0 is ﬁnite, then the equilibrium solution is at point A in Fig.19.17b,</span></span>
<span class="line"><span>on a vertical segment of the A/D characteristic. The A/D output Ve[n] can only be equal to an</span></span>
<span class="line"><span>integer multiple ofqA/D, not a fraction ofqA/D. Therefore, the equilibrium point A in Fig.19.17b</span></span>
<span class="line"><span>is not feasible. Given a large, but ﬁnite dc gain of the compensator, the digitally controlled</span></span>
<span class="line"><span>converter does not have a ﬁxed equilibrium point. Instead, the A/D converter output must bounce</span></span>
<span class="line"><span>among two or more quantization steps, resulting in a persistent disturbance (limit cycling) in</span></span>
<span class="line"><span>converter waveforms.</span></span>
<span class="line"><span>If the compensator includes an integral action, Gcd0 →∞, the widths of the vertical steps</span></span>
<span class="line"><span>in the characteristic given by Eq. ( 19.74) vanish. The characteristic around the A/D converter</span></span>
<span class="line"><span>becomes a series of points, VgH0qDPWM apart on the horizontal (Ve) axis. In this case, multiple</span></span>
<span class="line"><span>equilibrium solutions are possible, as illustrated by two points B in Fig. 19.17b. Each one of</span></span>
<span class="line"><span>the two possible equilibrium solutions is inside the A/D converter zero-error bin, Ve[n]= 0. It</span></span>
<span class="line"><span>should be noted that the existence of multiple possible equilibrium solutions corresponding to</span></span>
<span class="line"><span>Ve[n]= 0 is predicated upon the assumption that the compensator includes integral action, and</span></span>
<span class="line"><span>that the widths of the bins due to DPWM quantization are shorter than the A/Db i n s ,</span></span>
<span class="line"><span>VgH0qDPWM &lt; qA/D (19.75)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 833</span></span>
<span class="line"><span>Equation (19.75) is a condition for the synchronous buck converter example where M(D)= D</span></span>
<span class="line"><span>and Gd0 = Vg. In general, a necessary condition for existence of an equilibrium solution in a</span></span>
<span class="line"><span>digitally controlled converter can be written as:</span></span>
<span class="line"><span>Gd0H0qDPWM &lt; qA/D (19.76)</span></span>
<span class="line"><span>where Gd0 is the converter dc control-to-output gain.</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>No quantization</span></span>
<span class="line"><span>No quantization</span></span>
<span class="line"><span>Quantization:</span></span>
<span class="line"><span>Quantization:</span></span>
<span class="line"><span>qA/D = 4m V</span></span>
<span class="line"><span>qA/D = 4m V</span></span>
<span class="line"><span>10-bit DPWM</span></span>
<span class="line"><span>10-bit DPWM</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>Fig. 19.18 Comparison of step-load (2.5 A-to-5 A) transient responses in the digitally controlled syn-</span></span>
<span class="line"><span>chronous buck regulator of Sect. 19.3.1 without and with quantization eﬀects, qA/D= 4m V ,nDPWM = 10</span></span>
<span class="line"><span>Figure 19.18 shows a comparison of step-load transient responses in the digitally controlled</span></span>
<span class="line"><span>synchronous buck regulator example of Sect. 19.3.1, for the case when very high-resolution</span></span>
<span class="line"><span>A/D and DPWM are employed so that quantization e ﬀects can be neglected, and for a case</span></span>
<span class="line"><span>of practical, ﬁnite resolution components, qA/D = 4m V , nDPWM = 10, qDWPM = 1/210,</span></span>
<span class="line"><span>VgH0qDPWM = 4.9 mV . The compensator includes an integral action, so that Gcd0 →∞,b u t</span></span>
<span class="line"><span>the DPWM resolution is not suﬃciently high and the condition in Eq. ( 19.75) is not met. The</span></span>
<span class="line"><span>step-load transient responses in Fig. 19.18 are similar, except that quantization eﬀects result in</span></span>
<span class="line"><span>periodic limit-cycling.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>834 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>0 50 100 150 200</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.3</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.7</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>0 50 100 150 200</span></span>
<span class="line"><span>1.77</span></span>
<span class="line"><span>1.78</span></span>
<span class="line"><span>1.79</span></span>
<span class="line"><span>1.8</span></span>
<span class="line"><span>1.81</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>t [µ s]</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>No quantization</span></span>
<span class="line"><span>No quantization</span></span>
<span class="line"><span>Quantization:</span></span>
<span class="line"><span>Quantization:</span></span>
<span class="line"><span>qA/D = 4m V</span></span>
<span class="line"><span>qA/D = 4m V</span></span>
<span class="line"><span>12-bit DPWM</span></span>
<span class="line"><span>12-bit DPWM</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>Fig. 19.19 Comparison of step-load (2.5 A-to-5 A) transient responses in the digitally controlled syn-</span></span>
<span class="line"><span>chronous buck regulator of Sect. 19.3.1 without and with quantization eﬀects, qA/D= 4m V ,nDPWM = 12</span></span>
<span class="line"><span>If Eq. (19.75) is not satisﬁed, the equilibrium solution may or may not exist, depending on</span></span>
<span class="line"><span>whether there is a point in the characteristic given by Eq. (19.74) inside the A/D converter zero-</span></span>
<span class="line"><span>error bin or not. Another important observation is that limit cycling, if it does occur, is relatively</span></span>
<span class="line"><span>small in amplitude, in the order of the LSB resolution q</span></span>
<span class="line"><span>A/D of the A/D converter, as illustrated</span></span>
<span class="line"><span>by the waveforms of Fig.19.18.</span></span>
<span class="line"><span>Figure 19.19 shows a comparison of the same step-load transient responses but for the</span></span>
<span class="line"><span>case when the DPWM resolution is increased to 12 bits, nDPWM = 12, qDWPM = 1/212,</span></span>
<span class="line"><span>VgH0qDPWM = 1.2 mV , thus meeting the condition in Eq. ( 19.75). After a brief transient, the</span></span>
<span class="line"><span>regulator with practical A/D and DPWM components comes to equilibrium without limit cy-</span></span>
<span class="line"><span>cling. Note that, after approximately 75 μsec, the output voltage remains within the zero-error</span></span>
<span class="line"><span>bin, and small-amplitude ringing (undamped by feedback control) decays towards the quantized</span></span>
<span class="line"><span>equilibrium point.</span></span>
<span class="line"><span>Related to the discussion of the existence of equilibrium solutions with A /D and DPWM</span></span>
<span class="line"><span>quantization, it is of interest to note that the A /D quantization, in combination with the inte-</span></span>
<span class="line"><span>gral action in the compensator, results in an eﬀective steady-state quantization of the duty-cycle</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 835</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Vc</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>qA/D</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>ve[n]</span></span>
<span class="line"><span>vc[n]</span></span>
<span class="line"><span>KI qA/D</span></span>
<span class="line"><span>Fig. 19.20 Waveforms illustrating quantization of the DPWM input signalvc[n] due to A/D quantization</span></span>
<span class="line"><span>and integral action of the digital compensator: (a) an impulse in error ve[n], and (b) impulse response of a</span></span>
<span class="line"><span>digital compensator with integral gain KI</span></span>
<span class="line"><span>command Vc[n]. As a result, for an equilibrium solution to exist, it is not suﬃcient that the com-</span></span>
<span class="line"><span>pensator includes integral action and that the DPWM resolution is su ﬃciently high. Consider</span></span>
<span class="line"><span>the response of an integral compensator to a unit error impulse of amplitude equal to qA/D, i.e.,</span></span>
<span class="line"><span>the smallest possible disturbance at the compensator input. The integrator response to this unit</span></span>
<span class="line"><span>impulse is a step, as shown in Fig. 19.20, where K</span></span>
<span class="line"><span>I is the integral gain. The step amplitude in</span></span>
<span class="line"><span>vc[n] is equal to KIqA/D. In conclusion, because of the A/D quantization and the integral gain</span></span>
<span class="line"><span>KI in the compensator, the duty-cycle command signalVc[n], and therefore the duty cycle itself,</span></span>
<span class="line"><span>are eﬀectively quantized with a bin width equal to KIqA/D, regardless of how high the DPWM</span></span>
<span class="line"><span>resolution may be. This eﬀective DPWM quantization has exactly the same eﬀect on the exis-</span></span>
<span class="line"><span>tence of an equilibrium solution as the DPWM LSB resolution qDWPM in Eq. ( 19.76), which</span></span>
<span class="line"><span>leads to another necessary condition,</span></span>
<span class="line"><span>Gd0H0KIqA/D&lt; qA/D (19.77)</span></span>
<span class="line"><span>or,</span></span>
<span class="line"><span>Gd0H0KI &lt; 1 (19.78)</span></span>
<span class="line"><span>When we combine the fact that an integral action is necessary, with the conditions in Eqs. (19.76)</span></span>
<span class="line"><span>and (19.78), we ﬁnd that the conditions for existence of an equilibrium solution in a digitally</span></span>
<span class="line"><span>controlled converter can be written as follows:</span></span>
<span class="line"><span>Gd0H0qDPWM &lt; qA/D</span></span>
<span class="line"><span>0&lt; KI &lt; 1</span></span>
<span class="line"><span>Gd0H0</span></span>
<span class="line"><span>(19.79)</span></span>
<span class="line"><span>where Gd0 is the converter dc control-to-output gain, andKI is the compensator integral gain. In</span></span>
<span class="line"><span>general, for any Gcd(z), KI can be found as</span></span>
<span class="line"><span>KI = lim</span></span>
<span class="line"><span>z→1</span></span>
<span class="line"><span>(z−1)Gcd(z) (19.80)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>836 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>One may verify that with qA/D= 4 mV , andnDPWM = 12, the conditions in Eq. (19.79) are both</span></span>
<span class="line"><span>met for the compensator in the design example of Sect. 19.3.1.</span></span>
<span class="line"><span>If the conditions in Eq. ( 19.79) are met, a digitally controlled converter has at least one</span></span>
<span class="line"><span>equilibrium solution in the zero-error bin of the A/D converter, Ve[n]= 0. It should be under-</span></span>
<span class="line"><span>stood, however, that existence of an equilibrium solution is not suﬃcient to guarantee no limit</span></span>
<span class="line"><span>cycling [238–240]. With quantization eﬀects, the converter is a complex nonlinear dynamic sys-</span></span>
<span class="line"><span>tem and limit-cycling disturbances can sometimes be observed even when the loop is design for</span></span>
<span class="line"><span>stable operation, and when the DPWM resolution and the compensator integral gain K</span></span>
<span class="line"><span>I meet</span></span>
<span class="line"><span>Eq. (19.79). On the other hand, for a stable, well-designed loop with high-resolution A /D and</span></span>
<span class="line"><span>DPWM components, the amplitude of any limit-cycling disturbances in the output voltage is</span></span>
<span class="line"><span>relatively small, in the order of q</span></span>
<span class="line"><span>A/D, as illustrated in the example of Fig. 19.18. Therefore, in</span></span>
<span class="line"><span>practice, such small-amplitude disturbances can often be tolerated.</span></span>
<span class="line"><span>Sections 19.1.1 and the discussion of quantization eﬀects point to the need for fast, high-</span></span>
<span class="line"><span>resolution A/D and DPWM components in a digitally controlled regulator.</span></span>
<span class="line"><span>Digital Pulse-Width Modulators</span></span>
<span class="line"><span>Modulators with high timing resolution are required so that the converter output voltage (or</span></span>
<span class="line"><span>current) can be precisely regulated. Furthermore, high-resolution pulse-width modulators are</span></span>
<span class="line"><span>needed to avoid or to minimize the amplitude of any limit-cycle disturbances. A digital modula-</span></span>
<span class="line"><span>tor in combination with the converter power stage operates as a power digital-to-analog (D/A)</span></span>
<span class="line"><span>converter, taking digital commandv</span></span>
<span class="line"><span>c[n] as an input and producing converter voltage (or current)</span></span>
<span class="line"><span>as an analog output. This power-D/A view has led to a number of DPWM developments based</span></span>
<span class="line"><span>on techniques adopted from the signal D/A conversion area.</span></span>
<span class="line"><span>A traditional counter-based DPWM replicates analog pulse-width modulation as shown in</span></span>
<span class="line"><span>Fig. 19.3: a saw-tooth or a triangular analog waveform is replaced by a digital counter clocked at</span></span>
<span class="line"><span>fclk, while a digital comparator outputs the modulated waveform by comparing the counter out-</span></span>
<span class="line"><span>put with the digital duty-cycle command vc[n]. A counter-based DPWM of resolution nDPWM</span></span>
<span class="line"><span>requires a clock frequency fclk = 2nDPWM fs, where fs is the switching frequency. To achieve</span></span>
<span class="line"><span>high resolution at high switching frequencies, prohibitively high clock rates may be required.</span></span>
<span class="line"><span>To remove the need for very high clock frequencies, a ﬁne time resolution can instead be</span></span>
<span class="line"><span>achieved using a tapped delay line [224]. The delay cells in the delay line can also be designed</span></span>
<span class="line"><span>to accomplish feed-forward compensation of the input voltage [ 184]. Hybrid DPWMs [ 225]</span></span>
<span class="line"><span>combine delay-line and counter approaches to achieve desirable tradeo ﬀs between clock rate</span></span>
<span class="line"><span>and complexity or gate count. Various hybrid DPWM implementations have been described in</span></span>
<span class="line"><span>[229, 232]. Other approaches in the area of high-resolution digital pulse-width modulation can</span></span>
<span class="line"><span>be found in [ 226, 230, 232, 233]. An overview and classiﬁcation of DPWM architectures and</span></span>
<span class="line"><span>realizations has been presented in [227].</span></span>
<span class="line"><span>In addition to high-resolution DPWM hardware architectures, following the power-D /A</span></span>
<span class="line"><span>view of a digitally controlled switched-mode power converter,ΔΣtechniques, which have been</span></span>
<span class="line"><span>used in signal processing and digital audio applications [241], have more recently been applied</span></span>
<span class="line"><span>to digitally controlled converters.</span></span>
<span class="line"><span>In the digital control loop, the ΔΣmodulator is placed between the discrete-time compen-</span></span>
<span class="line"><span>sator Gcd and the DPWM. Figure 19.21 shows a second-order ΔΣmodulator following the</span></span>
<span class="line"><span>“error-feedback” architecture [241]. The error-feedback architecture has an advantage of includ-</span></span>
<span class="line"><span>ing no delays in the forward path from the high-resolution nh-bit compensator output vch[n]t o</span></span>
<span class="line"><span>the lower-resolution nDPWM -bit duty-cycle command vc[n] provided to the hardware DPWM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.4 Digital Controller Implementation 837</span></span>
<span class="line"><span>vch[n] vc[n]</span></span>
<span class="line"><span>From </span></span>
<span class="line"><span>compensator</span></span>
<span class="line"><span>To </span></span>
<span class="line"><span>DPWM</span></span>
<span class="line"><span>nh nDPW M</span></span>
<span class="line"><span>nDPW M</span></span>
<span class="line"><span>(MSB)</span></span>
<span class="line"><span>nh − nDPW M</span></span>
<span class="line"><span>(LSB)</span></span>
<span class="line"><span>z− 1</span></span>
<span class="line"><span>z− 1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>2nd -order ∆Σmodulator</span></span>
<span class="line"><span>Fig. 19.21 Second-order error-feedbackΔΣmodulator placed between the compensator and the nDPWM -</span></span>
<span class="line"><span>bit DPWM c can improve the eﬀective DPWM resolution by nx = nh−nDPWM bits</span></span>
<span class="line"><span>component. In theΔΣmodulator, the nDPWM most signiﬁcant bits (MSB) of thenh-bit signal are</span></span>
<span class="line"><span>delivered to the nDPWM -bit DPWM, while the quantization error having nx = nh−nDPWM least</span></span>
<span class="line"><span>signiﬁcant bits (LSB) is fed back through a simple digital ﬁlter. The ΔΣmodulator shifts the</span></span>
<span class="line"><span>quantization error (viewed as quantization noise) to high frequencies, where the noise is ﬁltered</span></span>
<span class="line"><span>by the low-pass action of the switched-mode power converter. E ﬀective resolution improve-</span></span>
<span class="line"><span>ments can be obtained, thus enabling digital pulse-width modulation at high frequencies and</span></span>
<span class="line"><span>with low power consumption [188]. For example, with a 7-10-bit hardware DPWM, the second-</span></span>
<span class="line"><span>orderΔΣmodulator oﬀers about 6-7 bits of eﬀective resolution improvement. It has also been</span></span>
<span class="line"><span>shown that eﬀective resolution improvements are better with dual-edge (triangle-wave) DPWM</span></span>
<span class="line"><span>compared to trailing-edge (saw-tooth) DPWM [231].</span></span>
<span class="line"><span>In conclusion, by combining delay-line or hybrid DPWM techniques with ΔΣmodulation,</span></span>
<span class="line"><span>DPWM’s having very high eﬀective resolution can be realized using relatively modest hardware</span></span>
<span class="line"><span>resources, even at switching frequencies in the high megahertz range.</span></span>
<span class="line"><span>A/D Converters</span></span>
<span class="line"><span>For fast control loops and precise regulation, A/D converters must have high eﬀective resolution</span></span>
<span class="line"><span>around a reference, and a short conversion time. Furthermore, simplicity, low-power consump-</span></span>
<span class="line"><span>tion, and suitability for integration in digital VLSI processes are important. On the other hand,</span></span>
<span class="line"><span>linearity or wide conversion range may be compromised in order to reduce the A/D complexity.</span></span>
<span class="line"><span>These speciﬁcations diﬀer from the typical requirements in standard A/D converters developed</span></span>
<span class="line"><span>for signal processing, open-loop sensing, or slow control system applications, which is why</span></span>
<span class="line"><span>various switching converter-speciﬁc A/D realizations have been investigated.</span></span>
<span class="line"><span>A window-ﬂash A/D converter [ 182] consists of a small number of analog comparators</span></span>
<span class="line"><span>centered around an analog reference V</span></span>
<span class="line"><span>re f , with a conversion characteristic shown in Fig. 19.2b.</span></span>
<span class="line"><span>In some applications, as few as three A /D output levels (+qA/D,0 ,a n d−qA/D) are suﬃcient,</span></span>
<span class="line"><span>which allows a window-ﬂash A/D implementation using only two comparators [ 184]. Target-</span></span>
<span class="line"><span>ing implementation in digital VLSI processes, delay-line based window A /D converters have</span></span>
<span class="line"><span>been introduced in [ 181]. Instead of analog comparators, the voltage-dependent delay charac-</span></span>
<span class="line"><span>teristic of logic gates is used to perform voltage-to-delay and delay-to-digital conversion. Cur-</span></span>
<span class="line"><span>rent sensing using delay-line A/D has been proposed in [242]. The delay-line A/D concept has</span></span>
<span class="line"><span>been developed further in [ 189], where a high-performance, low-power, programmable archi-</span></span>
<span class="line"><span>tecture has been demonstrated. A similar approach, using a ring-oscillator A/D, targeting very</span></span>
<span class="line"><span></span></span>
<span class="line"><span>838 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>low-power mobile applications, has been described in [185]. An alternative A/D circuit realiza-</span></span>
<span class="line"><span>tion approach, using threshold inverter quantization (TIQ) has been proposed in [ 243]. In the</span></span>
<span class="line"><span>TIQ A/D approach, logic inverters with programmed thresholds replace analog comparators,</span></span>
<span class="line"><span>enabling fast conversion and asynchronous sampling in a high-performance digital hysteretic</span></span>
<span class="line"><span>controller [243].</span></span>
<span class="line"><span>19.5 Summary of Key Points</span></span>
<span class="line"><span>1. Digital control has become a practical technique for high-performance switching power</span></span>
<span class="line"><span>conversion systems that enables higher-level control functionality in modern power man-</span></span>
<span class="line"><span>agement systems. These control systems include analog-to-digital converters and digital</span></span>
<span class="line"><span>pulse-width modulators that perform signal quantization/sampling of both amplitude and</span></span>
<span class="line"><span>time. These quantization eﬀects introduce new phenomena that may limit controller perfor-</span></span>
<span class="line"><span>mance and that should be considered in the closed-loop design.</span></span>
<span class="line"><span>2. The analog system modeling, analysis, and design techniques of earlier chapters can be</span></span>
<span class="line"><span>adapted to the case when the controller /compensator is implemented digitally. The loop</span></span>
<span class="line"><span>gain T</span></span>
<span class="line"><span>d( jω) of the digital control system includes both the gains of the analog portions</span></span>
<span class="line"><span>such as Gvd( jω) and H( jω) as well as the gains of the A/D converter, digital compensator,</span></span>
<span class="line"><span>and the DPWM.</span></span>
<span class="line"><span>3. An approach to incorporate the digital controller discrete-time response Gcd(z) into the</span></span>
<span class="line"><span>continuous-time response Gvd(s)H(s) of the analog portion of the system is developed in</span></span>
<span class="line"><span>this chapter. Approximations can be employed that relate the digital and analog signals</span></span>
<span class="line"><span>associated with integration: the trapezoidal approximation Eq. ( 19.35) provides a way to</span></span>
<span class="line"><span>connect the s-plane transfer functions of the analog portion and the z-plane transfer func-</span></span>
<span class="line"><span>tions of the digital portion. The magnitude and phase of the loop gain T</span></span>
<span class="line"><span>d( jω) can be found</span></span>
<span class="line"><span>and plotted, and the important quantities such as the crossover frequency and phase margin</span></span>
<span class="line"><span>can be evaluated.</span></span>
<span class="line"><span>4. TheZ-transform is a well-known approach for modeling discrete-time digital systems such</span></span>
<span class="line"><span>as the digital compensator. This approach provides a direct and simple way to represent the</span></span>
<span class="line"><span>operation of digital compensators. The deﬁnition z= esTs , or the trapezoidal approxima-</span></span>
<span class="line"><span>tion (19.35), leads to a direct connection between the Z-transform of the digital domain</span></span>
<span class="line"><span>and the Laplace transform of the analog domain.</span></span>
<span class="line"><span>5. The converter modeling and analog controller design techniques of earlier chapters can</span></span>
<span class="line"><span>be employed as a starting point for design of a digital controller. The delays inherent in</span></span>
<span class="line"><span>the digital controller elements must be added. A PI, PD, or PID compensator is designed</span></span>
<span class="line"><span>as discussed in Chap. 9, that then is translated to the z-domain as discussed in Sect. 19.3.</span></span>
<span class="line"><span>Section 19.4 describes implementation of the compensator algorithm in digital hardware.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>19.1 A microcontroller operates at fclk = 120 MHz clock frequency and has counter-based</span></span>
<span class="line"><span>DPWM units. Assuming trailing-edge pulse-width modulation, calculate the DPWM</span></span>
<span class="line"><span>resolution as the number of bits n</span></span>
<span class="line"><span>DPWM available when the microcontroller is used to</span></span>
<span class="line"><span>implement a digital controller around a switched-mode power converter operating at dif-</span></span>
<span class="line"><span>ferent switching frequencies: (i) fs= 100 kHz, (ii) fs= 250 kHz, or (iii) fs= 1M H z .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.5 Summary of Key Points 839</span></span>
<span class="line"><span>19.2 A microcontroller has high-resolution DPWM units, which oﬀer 150 ps timing resolu-</span></span>
<span class="line"><span>tion. Assuming trailing-edge pulse-width modulation, calculate the DPWM resolution as</span></span>
<span class="line"><span>the number of bits nDPWM available when the microcontroller is used to implement a dig-</span></span>
<span class="line"><span>ital controller around a switched-mode power converter operating at diﬀerent switching</span></span>
<span class="line"><span>frequencies: (i) fs= 100 kHz, (ii) fs= 250 kHz, or (iii) fs= 1M H z .</span></span>
<span class="line"><span>19.3 A digital controller, which includes an nDPWM -bit DPWM, is used to control a switched-</span></span>
<span class="line"><span>mode power converter having dc conversion ratio M(D)= V/Vg. Derive an expression</span></span>
<span class="line"><span>for the voltage positioning resolution pv =ΔV/V in %, whereΔV is a step in the output</span></span>
<span class="line"><span>voltage V that corresponds to a least signiﬁcant bit (LSB) step qDPWM in duty cycle D.</span></span>
<span class="line"><span>The expression for pv should be in terms of M(D) and nDPWM . Based on this general</span></span>
<span class="line"><span>expression, derive pv as a function of D and nDPWM for the three basic conversion ratios:</span></span>
<span class="line"><span>(i) buck M(D)= D, (ii) boost M(D)= 1/(1−D), and (iii) buck–boost M(D)= D/(1−D).</span></span>
<span class="line"><span>In the three cases considered, how diﬃcult is it to precisely position the output voltage</span></span>
<span class="line"><span>at high step-down or high step-up conversion ratios?</span></span>
<span class="line"><span>19.4 A microcontroller has A/D converters with nA/D-bit resolution and full-scale voltage</span></span>
<span class="line"><span>VFS . The microcontroller is used to implement a digital controller around a switched-</span></span>
<span class="line"><span>mode power converter so that the output voltage is regulated at V= Vre f/Ho, where Ho</span></span>
<span class="line"><span>is the voltage sensing gain at dc. To allow for proper operation during transients, the</span></span>
<span class="line"><span>A/D converter must not saturate as long as the output voltage remains within ± 10% of</span></span>
<span class="line"><span>the nominal output voltage V. Choose Vre f and Ho as functions of V and VFS to achieve</span></span>
<span class="line"><span>the best possible resolution ΔV in output voltage regulation, where ΔV corresponds to</span></span>
<span class="line"><span>the zero-error bin of the A/D converter. Given nA/D = 10, VFS = 2 V , andV= 12 V ,</span></span>
<span class="line"><span>calculate numerical values for Vre f , Ho, andΔV.</span></span>
<span class="line"><span>19.5 A digital controller has a window A/D converter with a number of qA/D bins centered</span></span>
<span class="line"><span>around an analog reference voltage Vre f . The controller is used around a switched-mode</span></span>
<span class="line"><span>power converter so that the output voltage is regulated at V = Vre f/Ho, where Ho is</span></span>
<span class="line"><span>the voltage sensing gain at dc. To allow for proper operation during transients, the A/D</span></span>
<span class="line"><span>converter must not saturate as long as the output voltage remains within ± 10% of the</span></span>
<span class="line"><span>nominal output voltage V.H o wm a n yqA/D bins are required in the window A /D con-</span></span>
<span class="line"><span>verter? Given Vre f = 2V ,qA/D= 5 mV , andV= 12 V , calculate numerical values forHo,</span></span>
<span class="line"><span>ΔV corresponding to qA/D, and the number of bins required.</span></span>
<span class="line"><span>19.6 An analog proportional-derivative (PD) compensator transfer function is</span></span>
<span class="line"><span>Gc(s)= Gc0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>where Gc0 = 1, fz = 10 kHz and fp = 100 kHz. As discussed in Sect. 9.5.1, the analog</span></span>
<span class="line"><span>PD compensator oﬀers the largest phase lead at fx = √fz fp = 31.6 kHz. You may use</span></span>
<span class="line"><span>MATLAB or a tool of your choice to perform mapping and calculations requested in this</span></span>
<span class="line"><span>problem.</span></span>
<span class="line"><span>(a) Construct the Bode plot of Gc(s) magnitude and phase. Calculate the magnitude (in</span></span>
<span class="line"><span>dB) and phase (in degrees) responses at (i) f= fz, (ii) f= fx, and (iii) f= fp.</span></span>
<span class="line"><span>(b) Using bilinear mapping with prewarp at fprewarp = fx,m a pGc(s)t o G∗</span></span>
<span class="line"><span>cd(z). Calculate</span></span>
<span class="line"><span>the magnitude (in dB) and phase (in degrees) responses of G∗</span></span>
<span class="line"><span>cd at (i) f = fz, (ii)</span></span>
<span class="line"><span>f = fx, and (iii) f = fp, and compare to the results obtained in part (a) for three</span></span>
<span class="line"><span>diﬀerent sampling frequencies: fs = 500 kHz, fs = 250 kHz, and fs = 150 kHz.</span></span>
<span class="line"><span>Overlay Bode plots of Gc and G∗</span></span>
<span class="line"><span>cd for the three diﬀerent sampling frequencies.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>840 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>19.7 Figure 19.22 shows a boost voltage regulator similar to the closed-loop regulated boost</span></span>
<span class="line"><span>converter in Problem 9.3, except that the controller is implemented digitally. Converter</span></span>
<span class="line"><span>components can be considered ideal. The voltage sensor transfer function is</span></span>
<span class="line"><span>H(s)= Ho</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>where Ho = 1/120, and fp = 10 kHz. The voltage reference is Vre f = 1 V . The full-</span></span>
<span class="line"><span>scale voltage of the A/D converter is VFS = 2 V . The controller employs a trailing-edge</span></span>
<span class="line"><span>DPWM with VM = 1 V , and an integral discrete-time compensatorGcd(z). In parts (a)–</span></span>
<span class="line"><span>(c) of the problem, you may assume that the A /D converter and the DPWM are very</span></span>
<span class="line"><span>high-resolution components with unity gains. The A/D converter is sampling the sensed</span></span>
<span class="line"><span>voltage vs once per switching period, and the delay in the digital control loop is td =</span></span>
<span class="line"><span>tmod = DTs. To construct requested Bode plots and to perform numerical calculations</span></span>
<span class="line"><span>you may use MATLAB or a tool of your choice.</span></span>
<span class="line"><span>Fig. 19.22 Digitally controlled boost converter of Problem 19.7</span></span>
<span class="line"><span>(a) Determine steady-state dc output voltage V, duty cycle D, and delay td in the digital</span></span>
<span class="line"><span>control loop.</span></span>
<span class="line"><span>(b) Assuming analog controller implementation with a negligible delay, design an ana-</span></span>
<span class="line"><span>log integral compensator Gc(s)= Kc/s, i.e., determine Kc to obtain crossover fre-</span></span>
<span class="line"><span>quency fc = 125 Hz. With this Gc(s), construct the Bode plot of the loop gain T(s)</span></span>
<span class="line"><span>magnitude and phase. Label values of all corner frequencies andQ-factors, as appro-</span></span>
<span class="line"><span>priate. Determine phase margin.</span></span>
<span class="line"><span>(c) Following the design procedure of Sect.19.3, design a discrete-time integral compen-</span></span>
<span class="line"><span>sator Gcd(z) to achieve the same crossover frequency and phase margin speciﬁcations</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.5 Summary of Key Points 841</span></span>
<span class="line"><span>as in part (b). Overlay Bode plots of the magnitude and phase responses of T(s) and</span></span>
<span class="line"><span>Td(z) and numerically verify the values obtained for the crossover frequency and the</span></span>
<span class="line"><span>phase margin.</span></span>
<span class="line"><span>(d) Find the minimum A/D resolution nA/D and the minimum DPWM resolution nDPWM</span></span>
<span class="line"><span>required so that the dc output voltage is regulated to within± 0.25 V , and so that the</span></span>
<span class="line"><span>necessary no-limit-cycling conditions in Eq. (19.79)a r em e t .</span></span>
<span class="line"><span>Fig. 19.23 Digitally controlled forward converter of Problem 19.8</span></span>
<span class="line"><span>19.8 Figure 19.23 shows a digitally controlled forward converter. This closed-loop voltage</span></span>
<span class="line"><span>regulator is similar to the system with the analog controller in Problem9.5. The quiescent</span></span>
<span class="line"><span>value of the input voltage is Vg = 380 V . The transformer has turns ratio n1/n3 = 4.5.</span></span>
<span class="line"><span>The duty cycle produced by the digital pulse-width modulator is restricted to the range</span></span>
<span class="line"><span>0≤d(t)≤0.5 and in that range d[n]= vc[n]/VM where VM = 1 V . The DPWM employs</span></span>
<span class="line"><span>dual-edge modulation and hasnDPWM = 12-bit resolution. The A/D converter hasnA/D=</span></span>
<span class="line"><span>9-bit resolution and is sampling the sensed voltage vs once per switching period Ts.T h e</span></span>
<span class="line"><span>delay in the digital control loop is td = Ts/2. The A/D converter and the DPWM have</span></span>
<span class="line"><span>unity gains. Converter components can be considered ideal, and parameter values are</span></span>
<span class="line"><span>shown in Fig.19.23. The small-signal models and transfer functions of forward and buck</span></span>
<span class="line"><span>converters are similar. The transformer magnetizing inductance has negligible inﬂuence</span></span>
<span class="line"><span>on the converter dynamics, and can be ignored. The discrete-time compensator is</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>cd(z)= 0.1152z−0.91</span></span>
<span class="line"><span>z−1</span></span>
<span class="line"><span>You may use MATLAB or a tool of your choice to perform mapping, calculations, and</span></span>
<span class="line"><span>plotting.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>842 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>(a) Determine the quiescent values of the duty cycle D and the output voltage V.</span></span>
<span class="line"><span>(b) Derive expressions for the control-to-output transfer function Gvd(s) and the uncom-</span></span>
<span class="line"><span>pensated loop gain Tu(s), including eﬀects of the voltage sensor transfer function</span></span>
<span class="line"><span>H(s)= vs/v, and delay td in the digital control loop.</span></span>
<span class="line"><span>(c) Construct a Bode plot of the loop gainTd magnitude and phase. What is the crossover</span></span>
<span class="line"><span>frequency? What is the phase margin?</span></span>
<span class="line"><span>(d) Are the necessary no-limit-cycling conditions in Eq. (19.79) satisﬁed for the system</span></span>
<span class="line"><span>in Fig. 19.23?</span></span>
<span class="line"><span>Fig. 19.24 Digitally controlled buck–boost voltage regulator system, Problem 19.9</span></span>
<span class="line"><span>19.9 Design of a digitally controlled buck–boost voltage regulator. This design problem is</span></span>
<span class="line"><span>similar to Problem 9.9, except that the controller is implemented digitally. The buck–</span></span>
<span class="line"><span>boost converter of Fig. 19.24 operates in the continuous conduction mode, with the ele-</span></span>
<span class="line"><span>ment values shown. The nominal input voltage is Vg = 48 V, and it is desired to regu-</span></span>
<span class="line"><span>late the output voltage at −15 V. Design the best compensator that you can, which has</span></span>
<span class="line"><span>high crossover frequency (but no greater than 10% of the switching frequency), large</span></span>
<span class="line"><span>loop gain over the bandwidth of the feedback loop, and phase margin of at least 45 ◦.</span></span>
<span class="line"><span>The A/D converter, which has up to 12-bit resolution, nA/D ≤12, samples the sensed</span></span>
<span class="line"><span>output voltage once per switching period. The DPWM, which has up to 10-bit resolu-</span></span>
<span class="line"><span>tion, nDPWM ≤10 uses trailing-edge modulation. The delay in the digital control loop is</span></span>
<span class="line"><span>td = tmod = DTs.T h eA/D converter and the DPWM have unity gains. The sensor H(s)</span></span>
<span class="line"><span>has an inverting gain, and includes a single-pole anti-aliasing ﬁlter</span></span>
<span class="line"><span>H(s)=−H0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>where H0&gt; 0 and fp= 100 kHz. In the design, you may use MATLAB or a tool of your</span></span>
<span class="line"><span>choice to perform mapping, plotting and calculations.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>19.5 Summary of Key Points 843</span></span>
<span class="line"><span>(a) Specify the required value of H0. Select nA/D and nDPWM to achieve best possible dc</span></span>
<span class="line"><span>voltage regulation while meeting the necessary no-limit-cycling condition expressed</span></span>
<span class="line"><span>in Eq. (19.76).</span></span>
<span class="line"><span>(b) Design the discrete-time compensatorGcd(z). Construct Bode plots of the uncompen-</span></span>
<span class="line"><span>sated loop gain Tud magnitude and phase (including eﬀects of delay in the feedback</span></span>
<span class="line"><span>loop), as well as the magnitude and phase of your compensator transfer function</span></span>
<span class="line"><span>Gcd(z). Label the important features of your plots. Verify that the no-limit-cycling</span></span>
<span class="line"><span>conditions expressed in Eq. (19.79) are satisﬁed.</span></span>
<span class="line"><span>(c) Construct Bode diagrams of the magnitude and phase of your compensated loop</span></span>
<span class="line"><span>gain Td(z), and also of the magnitude of the quantities Td/(1+ Td) and 1/(1+ Td).</span></span>
<span class="line"><span>Calculate crossover frequency and phase margin.</span></span>
<span class="line"><span>(d) Discuss your design. What prevents you from further increasing the crossover fre-</span></span>
<span class="line"><span>quency?</span></span>
<span class="line"><span>Fig. 19.25 Boost converter with analog average current-mode control</span></span>
<span class="line"><span>19.10 Figure 19.25 shows a boost converter with analog average current-mode control of the</span></span>
<span class="line"><span>inductor current. The analog compensator transfer function is</span></span>
<span class="line"><span>Gci(s)= Gcm</span></span>
<span class="line"><span>1+ ωz</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>where Gcm= 0.63, fz= 4k H z ,fp= 25 kHz. The current sensing gain is Rf = 0.25Ω.</span></span>
<span class="line"><span>Figure 19.26 shows the same converter with average current-mode control implemented</span></span>
<span class="line"><span>digitally. Current sensing includes an analog single-pole anti-aliasing ﬁlter</span></span>
<span class="line"><span>vs</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>= Rf</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωa</span></span>
<span class="line"><span>where Rf = 0.25Ωand fa = 200 kHz. In both cases, the power stage parameters are</span></span>
<span class="line"><span>the same and losses can be neglected. You may assume that the A /D converter and</span></span>
<span class="line"><span></span></span>
<span class="line"><span>844 19 Digital Control of Switched-Mode Power Converters</span></span>
<span class="line"><span>Fig. 19.26 Boost converter with digital average current-mode control</span></span>
<span class="line"><span>Fig. 19.27 Timing diagram for the digitally controlled boost converter in Fig.19.26</span></span>
<span class="line"><span>the DPWM are very high-resolution components with unity gains. A timing diagram</span></span>
<span class="line"><span>illustrating sampling of the inductor current and operation of the digital pulse-width</span></span>
<span class="line"><span>modulator is shown in Fig. 19.27. Note that a dual-edge (triangle-wave) DPWM is em-</span></span>
<span class="line"><span>ployed. In the design of the digital controller you only need to consider the modular</span></span>
<span class="line"><span>delay t</span></span>
<span class="line"><span>d= tmod= Ts/2, as shown in Fig. 19.27. You may use MATLAB or a tool of your</span></span>
<span class="line"><span>choice to perform calculations, and to construct Bode plots.</span></span></code></pre></div>`,10)])])}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
