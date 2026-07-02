import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第21章part 2 - 21 Pulse-Width Modulated Rectifiers","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第21章part 2 - 21 Pulse-Width Modulated Rectifiers","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 886-905 > Chunk ID: `chapter-21-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/055-chapter-21-part-2.md","filePath":"content/power/fundamentals-work/chunks/055-chapter-21-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/055-chapter-21-part-2.md"};function i(t,n,c,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第21章part-2-21-pulse-width-modulated-rectifiers" tabindex="-1">第21章part 2 - 21 Pulse-Width Modulated Rectifiers <a class="header-anchor" href="#第21章part-2-21-pulse-width-modulated-rectifiers" aria-label="Permalink to &quot;第21章part 2 - 21 Pulse-Width Modulated Rectifiers&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 886-905<br> Chunk ID: <code>chapter-21-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>21.3 Control of the Current Waveform 887</span></span>
<span class="line"><span>Boost converter</span></span>
<span class="line"><span>Current-programmed controller</span></span>
<span class="line"><span>Rvg(t)</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>is(t)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>vcontrol(t)</span></span>
<span class="line"><span>Multiplier X ic(t)</span></span>
<span class="line"><span>= kx vg(t) vcontrol(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>++</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Comparator Latch</span></span>
<span class="line"><span>ia(t)</span></span>
<span class="line"><span>Ts0</span></span>
<span class="line"><span>S</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>ma</span></span>
<span class="line"><span>Clock</span></span>
<span class="line"><span>Fig. 21.20 Current-programmed control of a boost rectiﬁer</span></span>
<span class="line"><span>by the inductor current ripple. Both mechanisms are most pronounced when the inductor current</span></span>
<span class="line"><span>is small, near the zero crossings of the ac line waveforms.</span></span>
<span class="line"><span>The static input characteristics, that is, the average input current vs. the input voltage, of the</span></span>
<span class="line"><span>current-programmed boost converter are given by</span></span>
<span class="line"><span>⟨ig(t)⟩Ts =</span></span>
<span class="line"><span>⎧⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎩</span></span>
<span class="line"><span>vg(t) Li2</span></span>
<span class="line"><span>c (t) fsV</span></span>
<span class="line"><span>2(V−vg(t))(vg(t)+ maL)2 in DCM</span></span>
<span class="line"><span>ic(t)−</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>ma+ vg(t)</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Ts in CCM</span></span>
<span class="line"><span>(21.60)</span></span>
<span class="line"><span>The converter operates in the continuous conduction mode when</span></span>
<span class="line"><span>⟨ig(t)⟩Ts &gt; TsV</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(21.61)</span></span>
<span class="line"><span>In terms of the control current ic(t), the condition for operation in CCM can be expressed</span></span>
<span class="line"><span>ic(t)&gt; TsV</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>⎦maL</span></span>
<span class="line"><span>V + vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1−vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(21.62)</span></span>
<span class="line"><span>In the conventional current-programmed rectiﬁer control scheme, the control current ic(t)i s</span></span>
<span class="line"><span>simply proportional to the ac input voltage:</span></span>
<span class="line"><span>ic(t)= vg(t)</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>(21.63)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>888 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0.0 0.2 0.4 0.6 0.8 1.0</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>jg(t)= ig(t) Ts</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>CCM</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= Rbase</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= 4</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= 0.33</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= 0.5</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= 2</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>Re = 0.2</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>e</span></span>
<span class="line"><span>= 0.1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>base</span></span>
<span class="line"><span>Re =10Rbase</span></span>
<span class="line"><span>ma = V</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>Rbase = 2L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Fig. 21.21 Static input characteristics of a current-programmed boost converter, with minimum stabiliz-</span></span>
<span class="line"><span>ing artiﬁcial ramp as in Eq. (21.64)</span></span>
<span class="line"><span>where Re is the emulated resistance that would be obtained if the average input current exactly</span></span>
<span class="line"><span>followed the reference current ic(t). The static input characteristics given by Eqs. ( 21.60)t o</span></span>
<span class="line"><span>(21.63) are plotted in Fig. 21.21. The average input current⟨ig(t)⟩Ts is plotted as a function of</span></span>
<span class="line"><span>the applied input voltage vg(t), for several values of emulated resistanceRe. The region near the</span></span>
<span class="line"><span>CCM-DCM boundary is shown. The curves are plotted for a ﬁxed artiﬁcial ramp having slope</span></span>
<span class="line"><span>ma= V</span></span>
<span class="line"><span>2L (21.64)</span></span>
<span class="line"><span>This is the minimum value of artiﬁcial ramp that stabilizes the boost current-programmed con-</span></span>
<span class="line"><span>troller at all static operating points. Decreasing ma below this value leads to instability at oper-</span></span>
<span class="line"><span>ating points in the continuous conduction mode at low vg(t)/V.</span></span>
<span class="line"><span>To obtain resistor emulation, it is desired that the static input characteristics be linear and</span></span>
<span class="line"><span>pass through the origin. It can be seen from Fig. 21.21 that this is not the case: the curves are</span></span>
<span class="line"><span>reasonably linear in the continuous conduction mode, but exhibit signiﬁcant curvature as the</span></span>
<span class="line"><span>CCM-DCM boundary is approached. The resulting average current waveforms are summarized</span></span>
<span class="line"><span>in Fig. 21.22.</span></span>
<span class="line"><span>To minimize the line current THD, it is apparent that the converter should be designed</span></span>
<span class="line"><span>to operate deeply in the continuous conduction mode for most of the ac line cycle. This is</span></span>
<span class="line"><span>accomplished with emulated resistances R</span></span>
<span class="line"><span>e that are much smaller than Rbase = 2L/Ts. In ad-</span></span>
<span class="line"><span>dition, the artiﬁcial ramp slope ma should be no greater than otherwise necessary. In practice,</span></span>
<span class="line"><span>THD of 5% to 10% can easily be obtained in rectiﬁers that function over a narrow range of</span></span>
<span class="line"><span>rms input voltages and load currents. However, low THD cannot be obtained at all operating</span></span>
<span class="line"><span>points in universal-input rectiﬁers; THD of 20% to 50% may be observed at maximum ac input</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.3 Control of the Current Waveform 889</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>Peak ig</span></span>
<span class="line"><span>Sinusoid</span></span>
<span class="line"><span>ma = V</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>Rbase = 2L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>= 0.1</span></span>
<span class="line"><span>Rbase Re</span></span>
<span class="line"><span>= 0.</span></span>
<span class="line"><span>33</span></span>
<span class="line"><span>Rbase Re</span></span>
<span class="line"><span>= 2Rbase</span></span>
<span class="line"><span>Fig. 21.22 Input current waveforms predicted by the static input characteristics of Fig. 21.21, compared</span></span>
<span class="line"><span>with a pure sinusoid. Curves are plotted for the case VM = 0.8V, with minimum stabilizing artiﬁcial ramp</span></span>
<span class="line"><span>voltage. This problem can be solved by biasing the current reference waveform. Design of</span></span>
<span class="line"><span>current-programmed rectiﬁers is discussed in [ 258–261], and some strategies for solving this</span></span>
<span class="line"><span>problem are addressed in [258].</span></span>
<span class="line"><span>21.3.3 Critical Conduction Mode and Hysteretic Control</span></span>
<span class="line"><span>Another control scheme sometimes used in low-harmonic rectiﬁers, as well as in dc–dc con-</span></span>
<span class="line"><span>verters and dc-ac inverters, is hysteretic control. Rather than operating at a ﬁxed switching fre-</span></span>
<span class="line"><span>quency and duty cycle, the hysteretic controller switches the transistor on and oﬀas necessary</span></span>
<span class="line"><span>to maintain a waveform within given limits. A special case of hysteretic control, called critical</span></span>
<span class="line"><span>conduction mode control, is implemented in several commercially available ICs, and is popular</span></span>
<span class="line"><span>for low-harmonic rectiﬁers rated below several hundred Watts [262–264].</span></span>
<span class="line"><span>An example is the sinusoid of Fig.21.23a, in which the boost converter input current is con-</span></span>
<span class="line"><span>trolled to follow a sinusoidal reference with a±10% tolerance. The inductor current increases</span></span>
<span class="line"><span>when the transistor is on, and decreases when the transistor is oﬀ. So this hysteretic controller</span></span>
<span class="line"><span>switches the transistor on whenever the input current falls below 90% of the reference input.</span></span>
<span class="line"><span>The controller switches the transistor oﬀwhenever the input current exceeds 110% of the ref-</span></span>
<span class="line"><span>erence. Hysteretic controllers tend to have simple implementations. However, they have the</span></span>
<span class="line"><span>disadvantages of variable switching frequency and reduced noise immunity.</span></span>
<span class="line"><span>Another example of hysteretic control is the waveform of Fig. 21.23b. The lower limit is</span></span>
<span class="line"><span>chosen to be zero, while the upper limit is twice the reference input. This controller operates the</span></span>
<span class="line"><span>boost converter at the boundary between the continuous and discontinuous conduction modes.</span></span>
<span class="line"><span>An alternative control scheme that generates the same waveform simply operates the transistor</span></span>
<span class="line"><span>with constant on-time: the transistor is switched on when the inductor current reaches zero, and</span></span>
<span class="line"><span>is switched oﬀafter a ﬁxed interval of length t</span></span>
<span class="line"><span>on. The resulting inductor current waveform will</span></span>
<span class="line"><span>have a peak value that depends directly on the applied input voltage, and whose average value</span></span>
<span class="line"><span></span></span>
<span class="line"><span>890 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>ton</span></span>
<span class="line"><span>Fig. 21.23 Input current waveforms of two boost converters with hysteretic control: (a)±10% regulation</span></span>
<span class="line"><span>band, (b) critical conduction mode operation (±100% regulation band)</span></span>
<span class="line"><span>is one-half of its peak. With either control approach, the converter naturally exhibits loss-free-</span></span>
<span class="line"><span>resistor or ideal rectiﬁer behavior. The emulated resistance is</span></span>
<span class="line"><span>Re= 2L</span></span>
<span class="line"><span>ton</span></span>
<span class="line"><span>(21.65)</span></span>
<span class="line"><span>This scheme has the advantage of small inductor size and low-cost control ICs. Disadvantages</span></span>
<span class="line"><span>are increased peak currents, variable switching frequency, and the need for additional input EMI</span></span>
<span class="line"><span>ﬁltering.</span></span>
<span class="line"><span>A typical critical conduction mode controller is illustrated in Fig. 21.24. A zero-current</span></span>
<span class="line"><span>detector senses when ig(t) (the inductor current) is zero; this is typically accomplished by mon-</span></span>
<span class="line"><span>itoring the voltage across the inductor. The zero-current detector sets a latch, turning on the</span></span>
<span class="line"><span>transistor and initiating the switching period. The transistor current is also monitored, and is</span></span>
<span class="line"><span>compared to a sinusoidal reference v</span></span>
<span class="line"><span>r(t) that is proportional to the applied input voltage vg(t).</span></span>
<span class="line"><span>When the sensed current is equal to the reference, the latch is reset and the transistor is turned</span></span>
<span class="line"><span>oﬀ.</span></span>
<span class="line"><span>Since the switching frequency can vary, possibly over a wide range, it is important to care-</span></span>
<span class="line"><span>fully design the converter power stage. For a given power P, the required transistor on-time ton</span></span>
<span class="line"><span>can be found by combining Eqs. (21.17) and (21.65), and solving for ton:</span></span>
<span class="line"><span>ton= 4LP</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>(21.66)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.3 Control of the Current Waveform 891</span></span>
<span class="line"><span>Boost converter</span></span>
<span class="line"><span>Controller</span></span>
<span class="line"><span>Rvac(t)</span></span>
<span class="line"><span>iac(t) +</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>vcontrol(t)</span></span>
<span class="line"><span>Multiplier X</span></span>
<span class="line"><span>vr (t)</span></span>
<span class="line"><span>= kx vg(t) vcontrol(t)</span></span>
<span class="line"><span>Rs</span></span>
<span class="line"><span>va(t)</span></span>
<span class="line"><span>Comparator</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>S</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>Zero current</span></span>
<span class="line"><span>ig detector</span></span>
<span class="line"><span>EMI filter</span></span>
<span class="line"><span>Latch</span></span>
<span class="line"><span>Fig. 21.24 A typical implementation of critical conduction mode</span></span>
<span class="line"><span>Application of the principle of volt-second balance to inductor L of Fig. 21.24 leads to the</span></span>
<span class="line"><span>following equation:</span></span>
<span class="line"><span>vgton+ (vg−V)toﬀ= 0 (21.67)</span></span>
<span class="line"><span>Hence, the transistor oﬀ-time is given by</span></span>
<span class="line"><span>toﬀ= ton</span></span>
<span class="line"><span>vg</span></span>
<span class="line"><span>(V−vg) (21.68)</span></span>
<span class="line"><span>The switching period Ts is equal to</span></span>
<span class="line"><span>Ts= toﬀ+ ton (21.69)</span></span>
<span class="line"><span>Substitution of Eqs. (21.66) and (21.68) into Eq. (21.69) yields</span></span>
<span class="line"><span>Ts= 4LP</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1−vg(t)</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>) (21.70)</span></span>
<span class="line"><span>The following expression for switching frequency is found by substitution of Eq. ( 21.11)i n t o</span></span>
<span class="line"><span>Eq. (21.70):</span></span>
<span class="line"><span>fs= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>= V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>4LP</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−VM</span></span>
<span class="line"><span>V |sin(ωt)|</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(21.71)</span></span>
<span class="line"><span>The maximum switching frequency occurs when sin(ωt) equals zero:</span></span>
<span class="line"><span>max fs= V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>4LP (21.72)</span></span>
<span class="line"><span>The minimum switching frequency occurs at the peak of the sine wave:</span></span>
<span class="line"><span>min fs= V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>4LP</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−VM</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(21.73)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>892 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>Equations (21.72) and (21.73) can be used to select the value of the inductanceL and the output</span></span>
<span class="line"><span>voltage V, so that the switching frequency varies over an acceptable range.</span></span>
<span class="line"><span>21.3.4 Nonlinear Carrier Control</span></span>
<span class="line"><span>The nonlinear carrier controller (NLC) is capable of attaining input resistor emulation in boost</span></span>
<span class="line"><span>and other converters that operate in the continuous conduction mode. Implementation of the</span></span>
<span class="line"><span>controller is quite simple, with no need for sensing of the input voltage or input current. There</span></span>
<span class="line"><span>is also no need for a current loop error ampliﬁer. The boost nonlinear-carrier charge controller</span></span>
<span class="line"><span>is inherently stable and is free from the stability problems that require addition of an artiﬁcial</span></span>
<span class="line"><span>ramp in current-programmed controllers.</span></span>
<span class="line"><span>A CCM boost rectiﬁer system with nonlinear-carrier charge control is illustrated in</span></span>
<span class="line"><span>Fig. 21.25, and waveforms are given in Fig. 21.26. The reasoning behind this approach is as</span></span>
<span class="line"><span>follows. It is desirable to control the transistor switch current i</span></span>
<span class="line"><span>s(t). This pulsating current is</span></span>
<span class="line"><span>much easier to sense than the continuous converter input current–a simple current transformer</span></span>
<span class="line"><span>can be used, as in Fig. 21.25. Further, it is desirable to control the integral of this current, or the</span></span>
<span class="line"><span>charge, for two reasons: (1) integration of the waveform leads to improved noise immunity and</span></span>
<span class="line"><span>(2) the integral of the waveform is directly related to its average value,</span></span>
<span class="line"><span>⟨i</span></span>
<span class="line"><span>s(t)⟩Ts = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+TS</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>is(τ)dτ (21.74)</span></span>
<span class="line"><span>S</span></span>
<span class="line"><span>R Q</span></span>
<span class="line"><span>Boost converter</span></span>
<span class="line"><span>Nonlinear-carrier charge controller</span></span>
<span class="line"><span>Rvg(t)</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>is(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>vcontrol(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Comparator Latch</span></span>
<span class="line"><span>Ts0</span></span>
<span class="line"><span>Clock</span></span>
<span class="line"><span>n : 1</span></span>
<span class="line"><span>Ci</span></span>
<span class="line"><span> vi (t)+</span></span>
<span class="line"><span>is /n vi (t)</span></span>
<span class="line"><span>Nonlinear carrier</span></span>
<span class="line"><span>generator</span></span>
<span class="line"><span>vc(t) Q</span></span>
<span class="line"><span>Fig. 21.25 Nonlinear carrier charge control of a boost converter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.3 Control of the Current Waveform 893</span></span>
<span class="line"><span>Fig. 21.26 Transistor current is(t), parabolic car-</span></span>
<span class="line"><span>rier voltage vc(t), and integrator voltage vi(t)w a v e -</span></span>
<span class="line"><span>forms for the NLC-controller boost rectiﬁer of</span></span>
<span class="line"><span>Fig. 21.25</span></span>
<span class="line"><span>TsdTs0</span></span>
<span class="line"><span>is(t)</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>vi (t)</span></span>
<span class="line"><span>In a ﬁxed-frequency system, Ts is constant, and the integral over one switching period is</span></span>
<span class="line"><span>proportional to the average value. Hence the average switch current can be controlled to be</span></span>
<span class="line"><span>proportional to a reference signal by simply switching the transistor oﬀwhen the integral of the</span></span>
<span class="line"><span>switch current is equal to the reference. In the controller of Fig.21.25, the switch current is(t)i s</span></span>
<span class="line"><span>scaled by the transformer turns ratio n, and then integrated by capacitor Ci, such that</span></span>
<span class="line"><span>vi(t)= 1</span></span>
<span class="line"><span>Ci</span></span>
<span class="line"><span>∫ dTs</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>is(τ)</span></span>
<span class="line"><span>n dτ for 0 &lt; t&lt; dTs (21.75)</span></span>
<span class="line"><span>The integrator voltage vi(t) is reset to zero at the end of each switching period, and the integra-</span></span>
<span class="line"><span>tion process begins anew at the beginning of the next switching period. So at the instant that the</span></span>
<span class="line"><span>transistor is switched oﬀ, the voltage v</span></span>
<span class="line"><span>i(dTs) is proportional to the average switch current:</span></span>
<span class="line"><span>vi(dTs)=⟨is⟩Ts</span></span>
<span class="line"><span>nCi fs</span></span>
<span class="line"><span>for interval 0 &lt; t&lt; Ts (21.76)</span></span>
<span class="line"><span>How should the average switch current be controlled? To obtain input resistor emulation, it is</span></span>
<span class="line"><span>desired that</span></span>
<span class="line"><span>⟨ig(t)⟩Ts = ⟨vg(t)⟩Ts</span></span>
<span class="line"><span>Re(vcontrol) (21.77)</span></span>
<span class="line"><span>It is further desired to avoid sensing either ig(t)o r vg(t). As with other schemes, we will sense</span></span>
<span class="line"><span>the dc output voltage ⟨v(t)⟩TS to construct a low-bandwidth feedback loop that balances the</span></span>
<span class="line"><span>average input and output powers. So let us determine the relationship between ⟨is(t)⟩Ts and</span></span>
<span class="line"><span>⟨v(t)⟩Ts implied by Eq. (21.77). If we assume that the boost converter operates in the continuous</span></span>
<span class="line"><span>conduction mode, then we can write</span></span>
<span class="line"><span>⟨is(t)⟩Ts = d(t)⟨ig(t)⟩Ts (21.78)</span></span>
<span class="line"><span>and</span></span>
<span class="line"><span>⟨vg(t)⟩Ts = d′(t)⟨v(t)⟩Ts (21.79)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>894 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>Substitution of Eqs. (21.78) and (21.79) into Eq. (21.77) leads to</span></span>
<span class="line"><span>⟨is(t)⟩Ts = d(t) (1−d(t)) ⟨v(t)⟩Ts</span></span>
<span class="line"><span>Re(vcontrol) (21.80)</span></span>
<span class="line"><span>The controller of Fig. 21.25 implements this equation.</span></span>
<span class="line"><span>The nonlinear carrier generator of Fig. 21.25 produces the parabolic waveform vc(t), given</span></span>
<span class="line"><span>by</span></span>
<span class="line"><span>vc(t)= vcontrol</span></span>
<span class="line"><span>⎦t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1−t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>for 0 ≤t≤Ts (21.81)</span></span>
<span class="line"><span>vc(t+ Ts)= vc(t)</span></span>
<span class="line"><span>This waveform is illustrated in Fig.21.26. Note that Eq. (21.81) resembles Eq. (21.80), with d(t)</span></span>
<span class="line"><span>replaced by (t/Ts). The controller switches the transistor oﬀat time t= dTs when the integrator</span></span>
<span class="line"><span>voltage vj(t) is equal to the carrier waveform vc(t). Hence, it is true that</span></span>
<span class="line"><span>vi(dTs)= vc(dTs)= vcontrol(t)d(t) (1−d(t)) (21.82)</span></span>
<span class="line"><span>Substitution of Eq. (21.76) yields</span></span>
<span class="line"><span>⟨is(t)⟩Ts</span></span>
<span class="line"><span>nCi fs</span></span>
<span class="line"><span>= vcontrol(t)d(t) (1−d(t)) (21.83)</span></span>
<span class="line"><span>This is of the same form as Eq. (21.80). Comparison of Eqs. (21.80) and (21.83) reveals that the</span></span>
<span class="line"><span>emulated resistance Re is given by</span></span>
<span class="line"><span>Re(vcontrol)= d(t)(1−d(t))⟨v(t)⟩Ts</span></span>
<span class="line"><span>⟨is(t)⟩Ts</span></span>
<span class="line"><span>= ⟨v(t)⟩Ts</span></span>
<span class="line"><span>nCi fsvcontrol(t) (21.84)</span></span>
<span class="line"><span>If the dc output voltage and the control voltage have negligible ac variation, then Re is essen-</span></span>
<span class="line"><span>tially constant, and the ac line current will exhibit low harmonic distortion. So neither the input</span></span>
<span class="line"><span>voltage nor the input current need to be sensed, and input resistor emulation can be obtained in</span></span>
<span class="line"><span>CCM boost converters by sensing only the switch current.</span></span>
<span class="line"><span>A simple way to generate the parabolic carrier waveform uses two integrators, as illustrated</span></span>
<span class="line"><span>in Fig. 21.27. The slowly varying control voltage vcontrol(t) is integrated, to obtain a ramp wave-</span></span>
<span class="line"><span>form vr(t) whose peak amplitude is proportional to vcontrol(t). The dc component of this wave-</span></span>
<span class="line"><span>form is removed, and then integrated again. The output of the second integrator is the parabolic</span></span>
<span class="line"><span>carrier v</span></span>
<span class="line"><span>c(t), illustrated in Fig. 21.26 and given by Eq. (21.81). Both integrators are reset to zero</span></span>
<span class="line"><span>before the end of each switching period by the clock generator. The amplitude of the parabolic</span></span>
<span class="line"><span>carrier, and hence also the emulated resistance, can be controlled by variation of vcontrol(t).</span></span>
<span class="line"><span>Equations ( 21.78) and ( 21.79) are valid only when the converter operates in the contin-</span></span>
<span class="line"><span>uous conduction mode. In consequence, the ac line current waveform is distorted when the</span></span>
<span class="line"><span>converter operates in DCM. Since this occurs near the zero crossings of the ac line voltage,</span></span>
<span class="line"><span>crossover distortion is generated. Nonetheless, the harmonic distortion is less severe than in</span></span>
<span class="line"><span>current-programmed schemes, and it is feasible to construct universal-input rectiﬁers that em-</span></span>
<span class="line"><span>ploy the NLC control approach. Total harmonic distortion is analyzed and plotted in [267].</span></span>
<span class="line"><span>Nonlinear carrier control can be applied to current-programmed boost rectiﬁers, as well as</span></span>
<span class="line"><span>to other rectiﬁers based on the buck–boost, SEPIC,´Cuk, or other topologies, with either integral</span></span>
<span class="line"><span>charge control or peak-current-programmed control [267, 268]. In these cases, a diﬀerent carrier</span></span>
<span class="line"><span>waveform must be employed. A nonlinear carrier controller in which the ac input voltage v</span></span>
<span class="line"><span>g(t)</span></span>
<span class="line"><span>is sensed, rather than the switch current is(t), is described in [269].</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 895</span></span>
<span class="line"><span>+vcontrol(t)</span></span>
<span class="line"><span>Integrator with reset Integrator with reset</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>Removal of dc</span></span>
<span class="line"><span>component</span></span>
<span class="line"><span>Clock</span></span>
<span class="line"><span>Fig. 21.27 Generation of parabolic carrier waveform by double integration</span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers</span></span>
<span class="line"><span>An additional issue that arises in PWM rectiﬁer systems is the control of power drawn from</span></span>
<span class="line"><span>the ac line, the power delivered to the dc load, and the energy stored in a bulk energy storage</span></span>
<span class="line"><span>capacitor.</span></span>
<span class="line"><span>21.4.1 Energy Storage</span></span>
<span class="line"><span>It is usually desired that the dc output voltage of a converter system can be regulated with high</span></span>
<span class="line"><span>accuracy. In practice, this is easily accomplished using a high-gain wide-bandwidth feedback</span></span>
<span class="line"><span>loop. A well-regulated dc output voltage v(t)= V is then obtained, which has negligible ac</span></span>
<span class="line"><span>variations. For a given constant load characteristic, the load currentI and the instantaneous load</span></span>
<span class="line"><span>power p</span></span>
<span class="line"><span>load(t)= Pload are also constant:</span></span>
<span class="line"><span>pload(t)= v(t)i(t)= VI (21.85)</span></span>
<span class="line"><span>However, the instantaneous input power pac(t) of a single-phase ideal rectiﬁer is not constant:</span></span>
<span class="line"><span>pac(t)= vg(t)ig(t) (21.86)</span></span>
<span class="line"><span>If vg(t) is given by Eq. (21.11), and if ig(t) follows Eq. (21.1), then the instantaneous input power</span></span>
<span class="line"><span>becomes</span></span>
<span class="line"><span>pac(t)= V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>sin2(ωt)= V2</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>2Re</span></span>
<span class="line"><span>(1−cos(2ωt)) (21.87)</span></span>
<span class="line"><span>which varies with time. The instantaneous input power is zero at the zero crossings of the ac</span></span>
<span class="line"><span>input voltage. Equations (21.85) and (21.87) are illustrated in Fig. 21.28a. Note that the desired</span></span>
<span class="line"><span>instantaneous load power pload(t) is not equal to the desired instantaneous rectiﬁer input power</span></span>
<span class="line"><span>pac(t). Some element within the rectiﬁer system must supply or consume the diﬀerence between</span></span>
<span class="line"><span>these two instantaneous powers.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>896 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Pload</span></span>
<span class="line"><span>pac(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>vc(t)</span></span>
<span class="line"><span>Fig. 21.28 Waveforms of a single-phase ideal rectiﬁer system: ( a) pulsating ac input power pin(t), and</span></span>
<span class="line"><span>constant dc load power Pload;( b) energy storage capacitor voltage vC (t)</span></span>
<span class="line"><span>Since the ideal rectiﬁer does not consume or generate power, nor does it contain signiﬁcant</span></span>
<span class="line"><span>internal energy storage, it is necessary to add to the system a low-frequency energy storage</span></span>
<span class="line"><span>element such as an electrolytic capacitor. The diﬀerence between the instantaneous input and</span></span>
<span class="line"><span>load powers ﬂows through this capacitor.</span></span>
<span class="line"><span>The waveforms of rectiﬁer systems containing reactive elements can be determined by so-</span></span>
<span class="line"><span>lution of the rectiﬁer energy equation [ 275, 276]. If the energy storage capacitor C is the only</span></span>
<span class="line"><span>system element capable of signiﬁcant low-frequency energy storage, then the power pC(t)ﬂ o w -</span></span>
<span class="line"><span>ing into the capacitor is equal to the di ﬀerence between the instantaneous input and output</span></span>
<span class="line"><span>powers:</span></span>
<span class="line"><span>pC(t)= dEC(t)</span></span>
<span class="line"><span>dt =</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>2 Cv2</span></span>
<span class="line"><span>C(t)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>dt = pac(t)−pload(t) (21.88)</span></span>
<span class="line"><span>where C is the capacitance, vC(t) is the capacitor voltage, and EC(t) is the energy stored in the</span></span>
<span class="line"><span>capacitor. Hence as illustrated in Fig. 21.28b, when pac(t)&gt; pload(t) then energy ﬂows into the</span></span>
<span class="line"><span>capacitor, and vC(t) increases. Likewise, vC(t) decreases when pac(t)&lt; pload(t). So the capacitor</span></span>
<span class="line"><span>voltage vC(t) must be allowed to increase and decrease as necessary to store and release the</span></span>
<span class="line"><span>required energy. In steady state, the average values of pac(t) and pload(t) must be equal, so that</span></span>
<span class="line"><span>over one ac line cycle there is no net change in capacitor stored energy.</span></span>
<span class="line"><span>Where can the energy storage capacitor be placed? It is necessary to separate the energy</span></span>
<span class="line"><span>storage capacitor from the regulated dc output, so that the capacitor voltage is allowed to in-</span></span>
<span class="line"><span>dependently vary as illustrated in Fig. 21.28b. A conventional means of accomplishing this is</span></span>
<span class="line"><span>illustrated in Fig. 21.29. A second dc–dc converter is inserted, between the energy storage ca-</span></span>
<span class="line"><span>pacitor and the regulated dc load. A wide-bandwidth feedback loop controls this converter, to</span></span>
<span class="line"><span>attain a well-regulated dc load voltage. The capacitor voltagev</span></span>
<span class="line"><span>C(t) is allowed to vary. Thus, this</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 897</span></span>
<span class="line"><span>vac(t)</span></span>
<span class="line"><span>iac(t)</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Ideal rectifier (LFR)</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>i2(t)ig(t)</span></span>
<span class="line"><span>pac(t) Ts</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>load</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>pload(t)= VI = Pload</span></span>
<span class="line"><span>Energy storage</span></span>
<span class="line"><span>capacitor</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>converter</span></span>
<span class="line"><span>Fig. 21.29 Elements of a single-phase-ac to dc power supply, in which the ac line current and dc load</span></span>
<span class="line"><span>voltage are independently regulated with high bandwidth. An internal independent energy storage capaci-</span></span>
<span class="line"><span>tor is required</span></span>
<span class="line"><span>system conﬁguration is capable of (1) wide-bandwidth control of the ac line current waveform,</span></span>
<span class="line"><span>to attain unity power factor, (2) internal low-frequency energy storage, and (3) wide-bandwidth</span></span>
<span class="line"><span>regulation of the dc output voltage. It is also possible to integrate these functions into a sin-</span></span>
<span class="line"><span>gle converter, provided that the required low-frequency independence of the input, output, and</span></span>
<span class="line"><span>capacitor voltages is maintained [277].</span></span>
<span class="line"><span>The energy storage capacitor also allows the system to function in other situations in which</span></span>
<span class="line"><span>the instantaneous input and output powers di ﬀer. For example, it is commonly required that</span></span>
<span class="line"><span>the output voltage remains regulated during ac line voltage failures of short duration. The hold-</span></span>
<span class="line"><span>up time is the duration that the output voltage v(t) remains regulated after v</span></span>
<span class="line"><span>ac(t) has become</span></span>
<span class="line"><span>zero. A typical requirement is that the system continues to supply power to the load during one</span></span>
<span class="line"><span>complete missing ac line cycle, that is, for 20 msec in a 50 Hz system. During the hold-up time,</span></span>
<span class="line"><span>the load power is supplied entirely by the energy storage capacitor. The value of capacitance</span></span>
<span class="line"><span>should be chosen such that at the end of the hold-up time, the capacitor voltage v</span></span>
<span class="line"><span>C(t) exceeds</span></span>
<span class="line"><span>the minimum value that the dc–dc converter requires to produce the desired load voltage.</span></span>
<span class="line"><span>The energy storage function could be performed by an element other than a capacitor, such</span></span>
<span class="line"><span>as an inductor. However, use of an inductor is a poor choice, because of its high weight and cost.</span></span>
<span class="line"><span>For example, a 100μF 100 V electrolytic capacitor and a 100μH 100 A inductor can each store</span></span>
<span class="line"><span>1 Joule of energy. But the capacitor is considerably smaller, lighter, and less expensive.</span></span>
<span class="line"><span>A problem introduced by the energy storage capacitor is the large inrush current observed</span></span>
<span class="line"><span>during the system turn-on transient. The capacitor voltage vC(t) is initially zero; substantial</span></span>
<span class="line"><span>amounts of charge and energy are required to raise this voltage to its equilibrium value. The</span></span>
<span class="line"><span>boost converter is not capable of limiting the magnitude of the resulting inrush current: even</span></span>
<span class="line"><span>when d(t) = 0, a large current ﬂows through the boost converter diode to the capacitor, as</span></span>
<span class="line"><span>long as the converter output voltage is less than the input voltage. Some additional circuitry is</span></span>
<span class="line"><span>required to limit the inrush current of the boost converter. Converters having a buck–boost type</span></span>
<span class="line"><span>conversion ratio are inherently capable of controlling the inrush current. This advantage comes</span></span>
<span class="line"><span>at the cost of additional switch stress.</span></span>
<span class="line"><span>It is also possible to design the ideal rectiﬁer to operate correctly when connected to utility</span></span>
<span class="line"><span>power systems anywhere in the world. Universal input rectiﬁers can operate with nominal ac</span></span>
<span class="line"><span>rms voltage magnitudes as low as the 100 V encountered in a portion of Japan, or as high</span></span>
<span class="line"><span>as the 260 V found in western Australia, with ac line frequencies of either 50 Hz or 60 Hz.</span></span>
<span class="line"><span>Regardless of the ac input voltage, the universal-input rectiﬁer produces a constant nominal dc</span></span>
<span class="line"><span>output voltage V</span></span>
<span class="line"><span>C.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>898 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>vac(t)</span></span>
<span class="line"><span>iac(t)</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Ideal rectifier (LFR)</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>i2(t)ig(t)</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>load</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>pload(t)= VI = Pload</span></span>
<span class="line"><span>Energy storage</span></span>
<span class="line"><span>capacitor</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>converter</span></span>
<span class="line"><span>+Pload V</span></span>
<span class="line"><span>pac(t) Ts</span></span>
<span class="line"><span>Fig. 21.30 Low-frequency equivalent circuit of the system of Fig.21.29</span></span>
<span class="line"><span>Let us now consider in more detail the low-frequency energy storage process of the system</span></span>
<span class="line"><span>of Fig. 21.29. Let us assume that the dc–dc converter contains a controller having bandwidth</span></span>
<span class="line"><span>much greater than the ac line frequency, such that the load voltage contains negligible low-</span></span>
<span class="line"><span>frequency variations. A low-frequency model of the dc–dc converter is then as illustrated in</span></span>
<span class="line"><span>Fig. 21.30. The dc–dc converter produces constant voltagev(t)= V modeled by a voltage source</span></span>
<span class="line"><span>as shown. This causes the load to draw constant currenti(t)= I, leading to load power p</span></span>
<span class="line"><span>load(t)=</span></span>
<span class="line"><span>Pload. To the extent that converter losses can be neglected, the dc–dc converter input port draws</span></span>
<span class="line"><span>power Pload, regardless of the value of vC(t). So the dc–dc converter input port can be modeled</span></span>
<span class="line"><span>as a constant power sink, of value Pload.</span></span>
<span class="line"><span>The model of Fig. 21.30 implies that the diﬀerence between the rectiﬁer power pac(t) and</span></span>
<span class="line"><span>the load power Pload ﬂows into the capacitor, as given by Eq. ( 21.88). The capacitor voltage</span></span>
<span class="line"><span>increases when pac(t) exceeds Pload, and decreases when pac(t)i sl e s st h a nPload. In steady</span></span>
<span class="line"><span>state, the average values of pac(t) and Pload must be equal. But note that pac(t) is determined</span></span>
<span class="line"><span>by the magnitudes of vac(t) and Re, and not by the load. The system of Fig. 21.30 contains no</span></span>
<span class="line"><span>mechanism to cause the average rectiﬁer power and load power to be equal. In consequence,</span></span>
<span class="line"><span>it is necessary to add an additional control system that adjusts R</span></span>
<span class="line"><span>e as necessary, to cause the</span></span>
<span class="line"><span>average rectiﬁer output power and dc–dc converter input power to balance. The conventional</span></span>
<span class="line"><span>way to accomplish this is simply to regulate the dc component of vC(t).</span></span>
<span class="line"><span>A complete system containing ideal rectiﬁcation, energy storage, and wide-bandwidth out-</span></span>
<span class="line"><span>put voltage regulation is illustrated in Fig. 21.31. This system incorporates the boost converter</span></span>
<span class="line"><span>and controller of Fig.21.5, as well as a generic dc–dc converter with output voltage feedback. In</span></span>
<span class="line"><span>addition, the system contains a low-bandwidth feedback loop, which regulates the dc component</span></span>
<span class="line"><span>of the energy storage capacitor voltage to be equal to a reference voltage vref2. This is accom-</span></span>
<span class="line"><span>plished by slow variations of vcontrol(t) and Re. This controller should have suﬃciently small</span></span>
<span class="line"><span>loop gain at the even harmonics of the ac line frequency, so that variations in Re are much</span></span>
<span class="line"><span>slower than the ac line frequency.</span></span>
<span class="line"><span>Increasing the bandwidth of the energy storage capacitor voltage controller can lead to sig-</span></span>
<span class="line"><span>niﬁcant ac line current harmonics. When this controller has wide bandwidth and high gain, then</span></span>
<span class="line"><span>it varies Re(t) quickly, distorting the ac line current waveform. In the extreme limit of perfect</span></span>
<span class="line"><span>regulation of the energy storage capacitor voltage vC(t)= VC, then the capacitor stored energy</span></span>
<span class="line"><span>is constant, and the instantaneous input ac line power pac(t) and load power pload(t) are equal.</span></span>
<span class="line"><span>The controller prevents the energy storage capacitor from performing its low-frequency energy</span></span>
<span class="line"><span>storage function. The ac line current then becomes</span></span>
<span class="line"><span>iac(t)= pac(t)</span></span>
<span class="line"><span>vac(t)= pload(t)</span></span>
<span class="line"><span>vac(t) = Pload</span></span>
<span class="line"><span>VM sin(ωt) (21.89)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 899</span></span>
<span class="line"><span>Boost converter</span></span>
<span class="line"><span>Wide-bandwidth input current controller</span></span>
<span class="line"><span>vac(t)</span></span>
<span class="line"><span>iac(t) +</span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>ig(t)vg(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>vcontrol(t)</span></span>
<span class="line"><span>Multiplier X</span></span>
<span class="line"><span>+vref1(t)</span></span>
<span class="line"><span>= kxvg(t)vcontrol(t)</span></span>
<span class="line"><span>Rs</span></span>
<span class="line"><span>va(t)</span></span>
<span class="line"><span>Gc(s)</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>Compensator</span></span>
<span class="line"><span>verr(t)</span></span>
<span class="line"><span>Converter Load</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>d(t)</span></span>
<span class="line"><span>+Compensator</span></span>
<span class="line"><span>and modulator</span></span>
<span class="line"><span>vref3</span></span>
<span class="line"><span>Wide-bandwidth output voltage controller</span></span>
<span class="line"><span>+Compensator vref2</span></span>
<span class="line"><span>Low-bandwidth energy-storage capacitor voltage controller</span></span>
<span class="line"><span>vC(t)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>Fig. 21.31 A complete dc power supply system incorporating a near-ideal single-phase boost rectiﬁer</span></span>
<span class="line"><span>system, energy storage capacitor, and dc–dc converter. Wide-bandwidth feedback loops regulate the ac</span></span>
<span class="line"><span>line current waveform and the dc load voltage, and a slow feedback loop regulates the energy storage</span></span>
<span class="line"><span>capacitor voltage</span></span>
<span class="line"><span>Fig. 21.32 Ac line current</span></span>
<span class="line"><span>waveform of the single-phase</span></span>
<span class="line"><span>ideal rectiﬁer with output volt-</span></span>
<span class="line"><span>age feedback, in the hypotheti-</span></span>
<span class="line"><span>cal case where constant instan-</span></span>
<span class="line"><span>taneous power is supplied to a</span></span>
<span class="line"><span>dc load. The THD tends to inﬁn-</span></span>
<span class="line"><span>ity, and the power factor tends</span></span>
<span class="line"><span>to zero</span></span>
<span class="line"><span>vac(t)</span></span>
<span class="line"><span>iac(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>This waveform is sketched in Fig.21.32. In this idealized limiting case, the ac line current tends</span></span>
<span class="line"><span>to inﬁnity at the zero crossings of the ac line voltage waveform, such that the instantaneous</span></span>
<span class="line"><span>input power is constant. It can be shown that the THD of this current waveform is inﬁnite, and</span></span>
<span class="line"><span>its distortion factor and power factor are zero. So the bandwidth of this controller should be</span></span>
<span class="line"><span>limited.</span></span>
<span class="line"><span>The energy storage capacitor voltage ripple can be found by integration of Eq. (21.88). Un-</span></span>
<span class="line"><span>der steady-state conditions, where the average value of p</span></span>
<span class="line"><span>ac(t)= Pload, integration of Eq. (21.88)</span></span>
<span class="line"><span>yields</span></span>
<span class="line"><span>EC(t)= 1</span></span>
<span class="line"><span>2Cv2</span></span>
<span class="line"><span>C(t)= EC(0)+</span></span>
<span class="line"><span>∫ t</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(−Pload cos(2ωt)) dt (21.90)</span></span>
<span class="line"><span>where ωis the ac line frequency. Evaluation of the integral leads to</span></span>
<span class="line"><span>EC(t)= EC(0)−Pload sin(2ωt)</span></span>
<span class="line"><span>2ω (21.91)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>900 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>Therefore, the capacitor voltage waveform is</span></span>
<span class="line"><span>vC(t)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2EC(t)</span></span>
<span class="line"><span>C =</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>C(0)−Pload</span></span>
<span class="line"><span>ωC sin(2ωt) (21.92)</span></span>
<span class="line"><span>It can be veriﬁed that the rms value of this waveform is VC,rms = vC(0). Hence, Eq. (21.92) can</span></span>
<span class="line"><span>be written</span></span>
<span class="line"><span>vC(t)= VC,rms</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−Pload</span></span>
<span class="line"><span>ωCV2</span></span>
<span class="line"><span>C,rms</span></span>
<span class="line"><span>sin(2ωt) (21.93)</span></span>
<span class="line"><span>This waveform is sketched in Fig. 21.28b. The minimum and maximum values of the capacitor</span></span>
<span class="line"><span>voltage occur when sin (2 ωt) is equal to 1 and -l, respectively. Therefore, the peak-to-peak</span></span>
<span class="line"><span>capacitor voltage ripple is</span></span>
<span class="line"><span>2ΔvC = VC,rms</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ Pload</span></span>
<span class="line"><span>ωCV2</span></span>
<span class="line"><span>C,rms</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−Pload</span></span>
<span class="line"><span>ωCV2</span></span>
<span class="line"><span>C,rms</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎥⎥⎦≈Pload</span></span>
<span class="line"><span>ωCVC,rms</span></span>
<span class="line"><span>(21.94)</span></span>
<span class="line"><span>The approximation is valid for Pload/(ωCV2</span></span>
<span class="line"><span>C,rms)s uﬃciently less than one, a condition that is</span></span>
<span class="line"><span>satisﬁed whenever the ac voltage ripple is suﬃciently less than VC,rms.</span></span>
<span class="line"><span>21.4.2 Modeling the Outer Low-Bandwidth Control System</span></span>
<span class="line"><span>As discussed above, the outer low-bandwidth controller, which varies the emulated resistance</span></span>
<span class="line"><span>as necessary to balance the average ac input and dc load powers, is common to all near-ideal</span></span>
<span class="line"><span>rectiﬁer systems. For design of this controller, the rectiﬁer can be modeled using the loss-free</span></span>
<span class="line"><span>resistor (LFR) model. Perturbation and linearization of the LFR lead to a small-signal equivalent</span></span>
<span class="line"><span>circuit that predicts the relevant small-signal transfer functions. Such a model is derived in this</span></span>
<span class="line"><span>section [245, 276, 278].</span></span>
<span class="line"><span>It is desirable to stabilize the rectiﬁer output voltage against variations in load power, ac</span></span>
<span class="line"><span>line voltage, and component characteristics. Hence, a voltage feedback loop is necessary. As</span></span>
<span class="line"><span>discussed in Sect. 21.4.1, this loop cannot attempt to remove the capacitor voltage ripple that</span></span>
<span class="line"><span>occurs at the second harmonic of the ac line frequency, 2 ω, since doing so would require that</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>e(t) change signiﬁcantly at the second harmonic frequency. This would introduce signiﬁcant</span></span>
<span class="line"><span>distortion, phase shift, and power factor degradation into the ac line current waveform. In con-</span></span>
<span class="line"><span>sequence this loop must have suﬃciently small gain at frequency 2ω, and hence its bandwidth</span></span>
<span class="line"><span>must be low. Therefore, for the purposes of designing the low-bandwidth outer control loop,</span></span>
<span class="line"><span>it is unnecessary to model the system high-frequency behavior. It can be assumed that any in-</span></span>
<span class="line"><span>ner wide-bandwidth controller operates ideally at low frequencies, such that the ideal rectiﬁer</span></span>
<span class="line"><span>model of Fig. 21.33a adequately represents the low-frequency system behavior.</span></span>
<span class="line"><span>A small-signal model is derived here that correctly predicts the control-to-output transfer</span></span>
<span class="line"><span>function and output impedance of any rectiﬁer system that can be modeled as a loss-free resistor.</span></span>
<span class="line"><span>The model neglects the complicating eﬀects of high-frequency switching ripple, and is valid for</span></span>
<span class="line"><span>control variations at frequencies suﬃciently less than the ac line frequency. Both resistive and</span></span>
<span class="line"><span>dc–dc converter/regulator loads are treated.</span></span>
<span class="line"><span>The steps in the derivation of the small-signal ac model are summarized in Fig. 21.33.F i g -</span></span>
<span class="line"><span>ure 21.33a is the basic ideal rectiﬁer model, in which the converter high-frequency switching</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 901</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Re (vcontrol)vg(t) Ts</span></span>
<span class="line"><span>vcontrol</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Ideal rectifier (LFR)</span></span>
<span class="line"><span>ac</span></span>
<span class="line"><span>input</span></span>
<span class="line"><span>dc</span></span>
<span class="line"><span>output</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>ig(t) Ts</span></span>
<span class="line"><span>p(t) Ts</span></span>
<span class="line"><span>i2(t) Ts</span></span>
<span class="line"><span>v(t) Ts</span></span>
<span class="line"><span>C Load</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>i2(t) Ts</span></span>
<span class="line"><span>v(t) TsC LoadV g,rms</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>V g,rms</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>cos2 2 t</span></span>
<span class="line"><span>Rectifier output port</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>i2(t) T2L</span></span>
<span class="line"><span>v(t) T2L</span></span>
<span class="line"><span>C LoadV g,rms</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>Rectifier output port</span></span>
<span class="line"><span>(d)</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Rectifier output port</span></span>
<span class="line"><span>r2g2vg,rms j2vcontrol R</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Fig. 21.33 Steps in the derivation of the low-frequency small-signal rectiﬁer model: (a) large-signal LFR</span></span>
<span class="line"><span>model, averaged over one switching period Ts;( b) separation of power source into its constant and time-</span></span>
<span class="line"><span>varying components; (c) removal of second harmonic components by averaging over one-half of the ac</span></span>
<span class="line"><span>line period T2L;( d) small-signal model obtained by perturbation and linearization of (c)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>902 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>ripple is removed via averaging over the switching period Ts, but waveform frequency com-</span></span>
<span class="line"><span>ponents slower than the switching frequency are correctly modeled, including the 2 ω second-</span></span>
<span class="line"><span>harmonic and dc components of output voltage. It is diﬃcult to use this model in design of the</span></span>
<span class="line"><span>feedback loop because it is highly nonlinear and time-varying.</span></span>
<span class="line"><span>If the ac input voltage vg(t)i s</span></span>
<span class="line"><span>vg(t)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2vg,rms|sin(ωt)| (21.95)</span></span>
<span class="line"><span>then the model of Fig. 21.33a predicts that the instantaneous output power⟨p(t)⟩Ts is</span></span>
<span class="line"><span>⟨p(t)⟩Ts =</span></span>
<span class="line"><span>⟨vg(t)⟩2</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Re(vcontrol(t))=</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>g,rms</span></span>
<span class="line"><span>Re(vcontrol(t)) (1−cos(2ωt)) (21.96)</span></span>
<span class="line"><span>The output power is comprised of a constant termv2</span></span>
<span class="line"><span>g,rms/Re, and a term that varies at the sec-</span></span>
<span class="line"><span>ond harmonic of the ac line frequency. These two terms are explicitly identiﬁed in Fig.21.33b.</span></span>
<span class="line"><span>The second-harmonic variation in⟨p(t)⟩TS leads to time-varying system equations, and slow</span></span>
<span class="line"><span>variations in vcontrol(t) lead to an output voltage spectrum containing components not only at the</span></span>
<span class="line"><span>frequencies present in vcontrol(t), but also at the even harmonics of the ac line frequency and their</span></span>
<span class="line"><span>sidebands, as well as at the switching frequency and its harmonics and sidebands. It is desired</span></span>
<span class="line"><span>to model only the low-frequency components excited by slow variations in vcontrol(t), the load,</span></span>
<span class="line"><span>and the ac line voltage amplitude vg,rms. The even harmonics of the ac line frequency can be</span></span>
<span class="line"><span>removed by averaging over one-half of the ac line period</span></span>
<span class="line"><span>T2L= 1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>ω= π</span></span>
<span class="line"><span>ω (21.97)</span></span>
<span class="line"><span>Hence, we average over the switching period Ts to remove the switching harmonics, and then</span></span>
<span class="line"><span>average again over one-half of the ac line period T2L to remove the even harmonics of the</span></span>
<span class="line"><span>ac line frequency. The resulting model is valid for frequencies suﬃciently less than the ac line</span></span>
<span class="line"><span>frequencyω. Averaging of the rectiﬁer output voltage is illustrated in Fig.21.34: averaging over</span></span>
<span class="line"><span>T2L removes the ac line frequency harmonics, leaving the underlying low-frequency variations.</span></span>
<span class="line"><span>By averaging the model of Fig. 21.33b over T2L, we obtain the model of Fig. 21.33c. This step</span></span>
<span class="line"><span>removes the second-harmonic variation in the power source.</span></span>
<span class="line"><span>The equivalent circuit of Fig. 21.33c is time-invariant, but nonlinear. We can now perturb</span></span>
<span class="line"><span>and linearize as usual, to construct a small-signal ac model that describes how slow variations</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>v(t) T2L</span></span>
<span class="line"><span>v(t) Ts</span></span>
<span class="line"><span>Fig. 21.34 Removal of components of v(t) at the harmonics of the ac line frequency, by averaging over</span></span>
<span class="line"><span>one-half of the ac line period T2L</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.4 Single-Phase Converter Systems Incorporating Ideal Rectiﬁers 903</span></span>
<span class="line"><span>in vcontrol(t), vg,rms, and the load, aﬀect the rectiﬁer output waveforms. Let us assume that the</span></span>
<span class="line"><span>averaged output voltage⟨v(t)⟩T2L , rectiﬁer averaged output current ⟨i2(t)⟩T2L , rms line voltage</span></span>
<span class="line"><span>amplitude vg,rms, and control voltage vcontrol(t) can be represented as quiescent values plus small</span></span>
<span class="line"><span>slow variations:</span></span>
<span class="line"><span>⟨v(t)⟩T2L = V+ ˆv(t)</span></span>
<span class="line"><span>⟨i2(t)⟩T2L = I2+ ˆi2(t) (21.98)</span></span>
<span class="line"><span>vg,rms= Vg,rms+ ˆvg,rms(t)</span></span>
<span class="line"><span>vcontrol(t)= Vcontrol+ ˆvcontrol(t)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>V≫| ˆv(t)|</span></span>
<span class="line"><span>I2≫| ˆi2(t)| (21.99)</span></span>
<span class="line"><span>Vg,rms ≫| ˆvg,rms(t)|</span></span>
<span class="line"><span>Vcontrol≫| ˆvcontrol(t)|</span></span>
<span class="line"><span>In the averaged model of Fig. 21.33c,⟨i2(t)⟩T2L is given by</span></span>
<span class="line"><span>⟨i2(t)⟩T2L =⟨p(t)⟩T2L</span></span>
<span class="line"><span>⟨v(t)⟩T2L</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>g,rms(t)</span></span>
<span class="line"><span>Re(vcontrol(t))⟨v(t)⟩T2L</span></span>
<span class="line"><span>(21.100)</span></span>
<span class="line"><span>= f</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>vg,rms(t),⟨v(t)⟩T2L, vcontrol(t)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>This equation resembles DCM buck–boost Eq. (15.50), and linearization proceeds in a similar</span></span>
<span class="line"><span>manner. Expansion of Eq. ( 21.100) in a three-dimensional Taylor series about the quiescent</span></span>
<span class="line"><span>operating point, and elimination of higher-order nonlinear terms, leads to</span></span>
<span class="line"><span>ˆi2(t)= g2 ˆvg,rms(t)+ j2 ˆvcontrol(t)−ˆv(t)</span></span>
<span class="line"><span>r2</span></span>
<span class="line"><span>(21.101)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>g2=</span></span>
<span class="line"><span>df</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>vg,rms, V, Vcontrol</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>dvg,rms</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>vg,rms=Vg,rms</span></span>
<span class="line"><span>= 2</span></span>
<span class="line"><span>Re(Vcontrol)</span></span>
<span class="line"><span>Vg,rms</span></span>
<span class="line"><span>V (21.102)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>r2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>df</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Vg,rms,⟨v⟩T2L, Vcontrol</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>d⟨v⟩T2L</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⟨v⟩T2L=V</span></span>
<span class="line"><span>=−I2</span></span>
<span class="line"><span>V (21.103)</span></span>
<span class="line"><span>j2=</span></span>
<span class="line"><span>df</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Vg,rms, V, vcontrol</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>dvcontrol</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>vcontrol=Vcontrol</span></span>
<span class="line"><span>=−</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g,rms</span></span>
<span class="line"><span>VR2</span></span>
<span class="line"><span>e (Vcontrol)</span></span>
<span class="line"><span>dRe(vcontrol)</span></span>
<span class="line"><span>dvcontrol</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>vcontrol=Vcontrol</span></span>
<span class="line"><span>(21.104)</span></span>
<span class="line"><span>A small-signal equivalent circuit based on Eq. (21.101) is given in Fig. 21.33d. Expressions for</span></span>
<span class="line"><span>the parameters g2, j2, and r2 for several controllers are listed in Table 21.1. This model is valid</span></span>
<span class="line"><span>for the conditions of Eq. (21.99), with the additional assumption that the output voltage ripple is</span></span>
<span class="line"><span>suﬃciently small. Figure21.33d is useful only for determining the various ac transfer functions;</span></span>
<span class="line"><span>no information regarding dc conditions can be inferred. The ac resistancer2 is derived from the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>904 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>Table 21.1 Small-signal model parameters for several types of rectiﬁer control schemes</span></span>
<span class="line"><span>Controller type g2 j2 r2</span></span>
<span class="line"><span>Average current control with feedforward, Fig.21.18 0 Pav</span></span>
<span class="line"><span>VVcontrol</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>Current-programmed control, Fig. 21.20 2Pav</span></span>
<span class="line"><span>VVg,rms</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>VVcontrol</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>Nonlinear-carrier charge control of boost rectiﬁer, Fig.21.25 2Pav</span></span>
<span class="line"><span>VVg,rms</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>VVcontrol</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>2Pav</span></span>
<span class="line"><span>Boost with critical conduction mode control, Fig. 21.24 2Pav</span></span>
<span class="line"><span>VVg,rms</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>VVcontrol</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>DCM buck–boost, ﬂyback, SEPIC, or ´Cuk converters 2Pav</span></span>
<span class="line"><span>VVg,rms</span></span>
<span class="line"><span>2Pav</span></span>
<span class="line"><span>VD</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>slope of the average value of the power source output characteristic, evaluated at the quiescent</span></span>
<span class="line"><span>operating point. The other coeﬃcients, j2 and g2, are also derived from the slopes of the same</span></span>
<span class="line"><span>characteristic, taken with respect to vcontrol(t) and vg,rms and evaluated at the quiescent operating</span></span>
<span class="line"><span>point. The resistance R is the incremental resistance of the load, evaluated at the quiescent</span></span>
<span class="line"><span>operating point. In the boost converter with hysteretic control, the transistor on-time ton replaces</span></span>
<span class="line"><span>vcontrol as the control input; likewise, the transistor duty cycled is taken as the control input to the</span></span>
<span class="line"><span>DCM buck–boost, ﬂyback, SEPIC, and ´Cuk converters. Harmonics are ignored for the current-</span></span>
<span class="line"><span>programmed and NLC controllers; the expressions given in Table21.1 assume that the converter</span></span>
<span class="line"><span>operates in CCM with negligible harmonics.</span></span>
<span class="line"><span>The control-to-output transfer function is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvcontrol(s)= j2R∥r2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ sC R∥r2</span></span>
<span class="line"><span>(21.105)</span></span>
<span class="line"><span>The line-to-output transfer function is</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvg,rms(s)= g2R∥r2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ sCR∥r2</span></span>
<span class="line"><span>(21.106)</span></span>
<span class="line"><span>Thus, the small-signal transfer functions of the high-quality rectiﬁer contain a single pole, ascrib-</span></span>
<span class="line"><span>able to the output ﬁlter capacitor operating in conjunction with the incremental load resistance</span></span>
<span class="line"><span>R and r</span></span>
<span class="line"><span>2,t h eeﬀective output resistance of the power source. Although this model is based on</span></span>
<span class="line"><span>the ideal rectiﬁer, its form is similar to that of the dc–dc DCM buck–boost converter ac model</span></span>
<span class="line"><span>of Chap. 15. This is natural, because the DCM buck–boost converter is itself a natural loss-free</span></span>
<span class="line"><span>resistor. The major diﬀerence is that the rms value of the ac input voltage must be used, and that</span></span>
<span class="line"><span>the second harmonic components of r2, j2, and g2 must additionally be removed via averaging.</span></span>
<span class="line"><span>Nonetheless, the equivalent circuit and ac transfer functions are of similar form.</span></span>
<span class="line"><span>When the rectiﬁer drives a regulated dc–dc converter as in Fig. 21.29, then the dc–dc con-</span></span>
<span class="line"><span>verter presents a constant power load to the rectiﬁer, as illustrated in Fig. 21.30. In equilibrium,</span></span>
<span class="line"><span>the rectiﬁer and dc–dc converter operate with the same average power Pav and the same dc</span></span>
<span class="line"><span>voltage V. The incremental resistance R of the constant power load is negative, and is given by</span></span>
<span class="line"><span>R=−V2</span></span>
<span class="line"><span>Pav</span></span>
<span class="line"><span>(21.107)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>21.5 RMS Values of Rectiﬁer Waveforms 905</span></span>
<span class="line"><span>which is equal in magnitude but opposite in polarity to the rectiﬁer incremental output resistance</span></span>
<span class="line"><span>r2, for all controllers except the NLC controller. The parallel combinationr2∥R then tends to an</span></span>
<span class="line"><span>open circuit, and the control-to-output and line-to-output transfer functions become</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvcontrol(s)= j2</span></span>
<span class="line"><span>sC (21.108)</span></span>
<span class="line"><span>and ˆv(s)</span></span>
<span class="line"><span>ˆvg,rms(s)= g2</span></span>
<span class="line"><span>sC (21.109)</span></span>
<span class="line"><span>In the case of the NLC controller, the parallel combinationr2∥R becomes equal to r2/2, and Eqs.</span></span>
<span class="line"><span>(21.105) and (21.106) continue to apply.</span></span>
<span class="line"><span>21.5 RMS Values of Rectiﬁer Waveforms</span></span>
<span class="line"><span>To correctly specify the power stage elements of a near-ideal rectiﬁer, it is necessary to compute</span></span>
<span class="line"><span>the root-mean-square values of their currents. A typical waveform such as the transistor current</span></span>
<span class="line"><span>of the boost converter, Fig. 21.35, is pulse-width modulated, with both the duty cycle and the</span></span>
<span class="line"><span>peak amplitude varying with the ac input voltage. When the switching frequency is much larger</span></span>
<span class="line"><span>than the ac line frequency, then the rms value can be well-approximated as a double integral.</span></span>
<span class="line"><span>The square of the current is integrated ﬁrst to ﬁnd its average over a switching period, and the</span></span>
<span class="line"><span>result is then integrated to ﬁnd the average over the ac line period. t</span></span>
<span class="line"><span>iQ(t)</span></span>
<span class="line"><span>Fig. 21.35 Modulated transistor current waveform, boost rectiﬁer</span></span>
<span class="line"><span>Computation of the rms and average values of the waveforms of a PWM rectiﬁer can be</span></span>
<span class="line"><span>quite tedious, and this can impede the eﬀective design of the power stage components. In this</span></span>
<span class="line"><span>section, several approximations are developed, which allow relatively simple analytical expres-</span></span>
<span class="line"><span>sions to be written for the rms and average values of the power stage currents, and which allow</span></span>
<span class="line"><span>comparison of converter approaches [255, 279]. The rms transistor current in the boost rectiﬁer</span></span>
<span class="line"><span>is found to be quite low.</span></span>
<span class="line"><span>The rms value of the transistor current is deﬁned as</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Qrms=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Tac</span></span>
<span class="line"><span>∫ Tac</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Q(t)dt (21.110)</span></span>
<span class="line"><span>where Tac is the period of the ac line waveform. The integral can be expressed as a sum of</span></span>
<span class="line"><span>integrals over all of the switching periods contained in one ac line period:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>906 21 Pulse-Width Modulated Rectiﬁers</span></span>
<span class="line"><span>IQms=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Tac</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Tac/Ts∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ nTs</span></span>
<span class="line"><span>(n−1)Ts</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Q(t)dt</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(21.111)</span></span>
<span class="line"><span>where Ts is the switching period. The quantity inside the parentheses is the value ofi2</span></span>
<span class="line"><span>Q averaged</span></span>
<span class="line"><span>over the nth switching period. The summation can be approximated by a Riemann integral in</span></span>
<span class="line"><span>the case when Ts is much less than Tac. This approximation corresponds to taking the limit as</span></span>
<span class="line"><span>Ts tends to zero, as follows:</span></span>
<span class="line"><span>IQrm≈</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Tac</span></span>
<span class="line"><span>lim</span></span>
<span class="line"><span>Ts→0</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎣Ts</span></span>
<span class="line"><span>Tac/Ts∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ nTs</span></span>
<span class="line"><span>(n−1)Ts</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Q(τ)dτ</span></span>
<span class="line"><span>)⎤⎥⎥⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Tac</span></span>
<span class="line"><span>∫ Tac</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Q(τ)dτdt (21.112)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>⟨⟨i2</span></span>
<span class="line"><span>Q(t)⟩TS⟩Tac</span></span>
<span class="line"><span>So i2</span></span>
<span class="line"><span>Q(t) is ﬁrst averaged over one switching period. The result is then averaged over the ac line</span></span>
<span class="line"><span>period, and the square root is taken of the result.</span></span>
<span class="line"><span>21.5.1 Boost Rectiﬁer Example</span></span>
<span class="line"><span>For the boost rectiﬁer, the transistor current iQ(t) is equal to the input current when the tran-</span></span>
<span class="line"><span>sistor conducts, and is zero when the transistor is oﬀ. Therefore, the average of i2</span></span>
<span class="line"><span>Q(t) over one</span></span>
<span class="line"><span>switching period is</span></span>
<span class="line"><span>⟨i2</span></span>
<span class="line"><span>Q⟩TS = 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ t+Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>Q(t)dt (21.113)</span></span>
<span class="line"><span>= d(t)i2</span></span>
<span class="line"><span>ac(t)</span></span>
<span class="line"><span>If the input voltage is given by</span></span>
<span class="line"><span>vac(t)= VM| sinωt| (21.114)</span></span>
<span class="line"><span>then the input current will be</span></span>
<span class="line"><span>iac(t)= VM</span></span>
<span class="line"><span>Re</span></span>
<span class="line"><span>| sinωt| (21.115)</span></span>
<span class="line"><span>where Re is the emulated resistance. With a constant output voltage V, the transistor duty cycle</span></span>
<span class="line"><span>must obey the relationship</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>vac(t)= 1</span></span>
<span class="line"><span>1−d(t) (21.116)</span></span>
<span class="line"><span>This assumes that the converter dynamics are fast compared to the ac line frequency. Substitu-</span></span>
<span class="line"><span>tion of Eq. (21.114)i n t o(21.116) and solution for d(t) yields</span></span>
<span class="line"><span>d(t)= 1−VM</span></span>
<span class="line"><span>V | sinωt| (21.117)</span></span>
<span class="line"><span>Substitution of Eqs. (21.115) and (21.117) into Eq. (21.113) yields the following expression</span></span></code></pre></div>`,10)])])}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
