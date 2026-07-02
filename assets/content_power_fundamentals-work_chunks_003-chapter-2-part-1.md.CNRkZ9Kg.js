import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第2章part 1 - 2 Principles of Steady-State Converter Analysis","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第2章part 1 - 2 Principles of Steady-State Converter Analysis","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 31-50 > Chunk ID: `chapter-2-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/003-chapter-2-part-1.md","filePath":"content/power/fundamentals-work/chunks/003-chapter-2-part-1.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/003-chapter-2-part-1.md"};function i(t,n,c,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第2章part-1-2-principles-of-steady-state-converter-analysis" tabindex="-1">第2章part 1 - 2 Principles of Steady-State Converter Analysis <a class="header-anchor" href="#第2章part-1-2-principles-of-steady-state-converter-analysis" aria-label="Permalink to &quot;第2章part 1 - 2 Principles of Steady-State Converter Analysis&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 31-50<br> Chunk ID: <code>chapter-2-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2</span></span>
<span class="line"><span>Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>2.1 Introduction</span></span>
<span class="line"><span>In the previous chapter, the buck converter was introduced as a means of reducing the dc voltage,</span></span>
<span class="line"><span>using only nondissipative switches, inductors, and capacitors. The switch produces a rectangular</span></span>
<span class="line"><span>waveform vs(t) as illustrated in Fig. 2.1. The voltage vs(t) is equal to the dc input voltage Vg</span></span>
<span class="line"><span>when the switch is in position 1, and is equal to zero when the switch is in position 2. In practice,</span></span>
<span class="line"><span>the switch is realized using power semiconductor devices, such as transistors and diodes, which</span></span>
<span class="line"><span>are controlled to turn on and oﬀas required to perform the function of the ideal switch. The</span></span>
<span class="line"><span>switching frequency fs, equal to the inverse of the switching period Ts, generally lies in the</span></span>
<span class="line"><span>range of 1 kHz–1 MHz, depending on the switching speed of the semiconductor devices. The</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>– R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>DTs D&#39;Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Switch</span></span>
<span class="line"><span>position: 12 1</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.1 Ideal switch, (a), used to reduce the voltage dc component, and (b) its output voltage waveform</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_2</span></span>
<span class="line"><span>15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>16 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>Fig. 2.2 Determination of the switch out-</span></span>
<span class="line"><span>put voltage dc component, by integrating</span></span>
<span class="line"><span>and dividing by the switching period</span></span>
<span class="line"><span>vs(t) Vg</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>〈vs〉 = DVgarea =</span></span>
<span class="line"><span>DTsVg</span></span>
<span class="line"><span>duty ratio D is the fraction of time that the switch spends in position 1, and is a number between</span></span>
<span class="line"><span>zero and one. The complement of the duty ratio, D′, is deﬁned as (1−D).</span></span>
<span class="line"><span>The switch reduces the dc component of the voltage: the switch output voltagevs(t) has a dc</span></span>
<span class="line"><span>component that is less than the converter dc input voltage Vg. From Fourier analysis, we know</span></span>
<span class="line"><span>that the dc component of vs(t) is given by its average value⟨vs⟩,o r</span></span>
<span class="line"><span>⟨vs⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vs(t)dt (2.1)</span></span>
<span class="line"><span>As illustrated in Fig.2.2, the integral is given by the area under the curve, orDTsVg. The average</span></span>
<span class="line"><span>value is therefore</span></span>
<span class="line"><span>⟨vs⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>(DTsVg)= DVg (2.2)</span></span>
<span class="line"><span>So the average value, or dc component, of vs(t) is equal to the duty cycle times the dc input</span></span>
<span class="line"><span>voltage Vg. The switch reduces the dc voltage by a factor of D.</span></span>
<span class="line"><span>What remains is to insert a low-pass ﬁlter as shown in Fig.2.3. The ﬁlter is designed to pass</span></span>
<span class="line"><span>the dc component of vs(t), but to reject the components of vs(t) at the switching frequency and</span></span>
<span class="line"><span>its harmonics. To accomplish this, we design the ﬁlter such that its cuto ﬀfrequency is much</span></span>
<span class="line"><span>lower than the switching frequency. The output voltage v(t) is then essentially equal to the dc</span></span>
<span class="line"><span>component of vs(t):</span></span>
<span class="line"><span>v≈⟨vs⟩= DVg (2.3)</span></span>
<span class="line"><span>The converter of Fig. 2.3 has been realized using lossless elements. To the extent that they are</span></span>
<span class="line"><span>ideal, the inductor, capacitor, and switch do not dissipate power. For example, when the switch</span></span>
<span class="line"><span>is closed, its voltage drop is zero, and the current is zero when the switch is open. In either</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Fig. 2.3 Insertion of low-pass ﬁler, to remove the switching harmonics and pass only the dc component</span></span>
<span class="line"><span>of vs(t) to the output</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.1 Introduction 17</span></span>
<span class="line"><span>Fig. 2.4 Buck converter dc output voltage V vs.</span></span>
<span class="line"><span>duty cycle D</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0 D</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>case, the power dissipated by the switch is zero. Hence, e ﬃciencies approaching 100% can</span></span>
<span class="line"><span>be obtained. So to the extent that the components are ideal, we can realize our objective of</span></span>
<span class="line"><span>changing dc voltage levels using a lossless network.</span></span>
<span class="line"><span>M(D)</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>M(D)</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>M(D)</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>–5</span></span>
<span class="line"><span>–4</span></span>
<span class="line"><span>–3</span></span>
<span class="line"><span>–2</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>– L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>12</span></span>
<span class="line"><span>M(D)= D</span></span>
<span class="line"><span>M(D)= 1</span></span>
<span class="line"><span>1–D</span></span>
<span class="line"><span>M(D)= –D</span></span>
<span class="line"><span>1–D</span></span>
<span class="line"><span>iL (t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>iL (t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>iL (t)Vg</span></span>
<span class="line"><span>Fig. 2.5 Three basic converters and their dc conversion ratios M(D)= V/Vg:( a) buck, ( b) boost, ( c)</span></span>
<span class="line"><span>buck–boost</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>The network of Fig. 2.3 also allows control of the output. Figure 2.4 is the control charac-</span></span>
<span class="line"><span>teristic of the converter. The output voltage, given by Eq. ( 2.3), is plotted vs. duty cycle. The</span></span>
<span class="line"><span>buck converter has a linear control characteristic. Also, the output voltage is less than or equal</span></span>
<span class="line"><span>to the input voltage, since 0 ≤D≤1. Feedback systems are often constructed that adjust the</span></span>
<span class="line"><span>duty cycle D to regulate the converter output voltage. Inverters or power ampliﬁers can also be</span></span>
<span class="line"><span>built, in which the duty cycle varies slowly with time and the output voltage follows.</span></span>
<span class="line"><span>The buck converter is just one of many possible switching converters. Two other commonly</span></span>
<span class="line"><span>used converters, which perform diﬀerent voltage conversion functions, are illustrated in Fig.2.5.</span></span>
<span class="line"><span>In the boost converter, the positions of the inductor and switch are reversed. It is shown later</span></span>
<span class="line"><span>in this chapter that the boost converter steps the voltage up: V ≥Vg. Another converter, the</span></span>
<span class="line"><span>buck–boost converter, can either increase or decrease the magnitude of the voltage, but the</span></span>
<span class="line"><span>polarity is inverted. So with a positive input voltage, the ideal buck–boost converter can produce</span></span>
<span class="line"><span>a negative output voltage of any magnitude. It may at ﬁrst be surprising that dc output voltages</span></span>
<span class="line"><span>can be produced that are greater in magnitude than the input, or that have opposite polarity. But</span></span>
<span class="line"><span>it is indeed possible to produce any desired dc output voltage using a passive network of only</span></span>
<span class="line"><span>inductors, capacitors, and embedded switches.</span></span>
<span class="line"><span>In the above discussion, it was possible to derive an expression for the output voltage of</span></span>
<span class="line"><span>the buck converter, Eq. ( 2.3), using some simple arguments based on Fourier analysis. How-</span></span>
<span class="line"><span>ever, it may not be immediately obvious how to directly apply these arguments to ﬁnd the dc</span></span>
<span class="line"><span>output voltage of the boost, buck–boost, or other converters. The objective of this chapter is the</span></span>
<span class="line"><span>development of a more general method for analyzing any switching converter comprised of a</span></span>
<span class="line"><span>network of inductors, capacitors, and switches [4, 8–13].</span></span>
<span class="line"><span>The principles of inductor volt-second balance and capacitor charge balance are derived;</span></span>
<span class="line"><span>these can be used to solve for the inductor currents and capacitor voltages of switching convert-</span></span>
<span class="line"><span>ers. A useful approximation, the small-ripple or linear-ripple approximation, greatly facilitates</span></span>
<span class="line"><span>the analysis. Some simple methods for selecting the ﬁlter element values are also discussed.</span></span>
<span class="line"><span>2.2 Inductor Volt-Second Balance, Capacitor Charge Balance, and the</span></span>
<span class="line"><span>Small-Ripple Approximation</span></span>
<span class="line"><span>Let us more closely examine the inductor and capacitor waveforms in the buck converter of</span></span>
<span class="line"><span>Fig. 2.6. It is impossible to build a perfect low-pass ﬁlter that allows the dc component to pass</span></span>
<span class="line"><span>but completely removes the components at the switching frequency and its harmonics. So the</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>+ vL(t) – iC(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Fig. 2.6 Buck converter circuit, with the inductor voltage vL(t) and capacitor voltage vC (t) waveforms</span></span>
<span class="line"><span>speciﬁcally identiﬁed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 19</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Actual waveform</span></span>
<span class="line"><span>v(t) = V + vripple(t)</span></span>
<span class="line"><span>dc component V</span></span>
<span class="line"><span>Fig. 2.7 Output voltage waveform v(t), consisting of dc component V and switching ripple vripple (t)</span></span>
<span class="line"><span>low-pass ﬁlter must allow at least some small amount of the high-frequency harmonics gen-</span></span>
<span class="line"><span>erated by the switch to reach the output. Hence, in practice the output voltage waveform v(t)</span></span>
<span class="line"><span>appears as illustrated in Fig. 2.7, and can be expressed as</span></span>
<span class="line"><span>v(t)= V+ vripple (t) (2.4)</span></span>
<span class="line"><span>So the actual output voltage v(t) consists of the desired dc component V, plus a small undesired</span></span>
<span class="line"><span>ac component vripple (t) arising from the incomplete attenuation of the switching harmonics by</span></span>
<span class="line"><span>the low-pass ﬁlter. The magnitude of vripple (t) has been exaggerated in Fig. 2.7.</span></span>
<span class="line"><span>The output voltage switching ripple should be small in any well-designed converter, since</span></span>
<span class="line"><span>the object is to produce a dc output. For example, in a computer power supply having a 3.3 V</span></span>
<span class="line"><span>output, the switching ripple is normally required to be less than a few tens of millivolts, or less</span></span>
<span class="line"><span>than 1% of the dc component V. So it is nearly always a good approximation to assume that the</span></span>
<span class="line"><span>magnitude of the switching ripple is much smaller than the dc component:</span></span>
<span class="line"><span>∥vripple∥≪ V (2.5)</span></span>
<span class="line"><span>Therefore, the output voltage v(t) is well approximated by its dc component V, with the small-</span></span>
<span class="line"><span>ripple term vripple (t) neglected:</span></span>
<span class="line"><span>v(t)≈V (2.6)</span></span>
<span class="line"><span>This approximation, known as the small-ripple approximation,o rt h elinear-ripple approxima-</span></span>
<span class="line"><span>tion, greatly simpliﬁes the analysis of the converter waveforms and is used throughout this book.</span></span>
<span class="line"><span>With this approximation, we replace the exponential or damped sinusoidal expressions for the</span></span>
<span class="line"><span>inductor and capacitor waveforms with simpler linear waveforms; this approximation is justiﬁed</span></span>
<span class="line"><span>provided that the switching period is much shorter than the natural time constants of the circuit.</span></span>
<span class="line"><span>The small-ripple approximation is applied to the inductor currents and capacitor voltages of the</span></span>
<span class="line"><span>converter, which are continuous variables. It must not be applied to discontinuous waveforms</span></span>
<span class="line"><span>of the converter, such as the switch voltage, switch current, or inductor voltage.</span></span>
<span class="line"><span>Next let us analyze the inductor current waveform. We can ﬁnd the inductor current by inte-</span></span>
<span class="line"><span>grating the inductor voltage waveform. With the switch in position 1, the left side of the inductor</span></span>
<span class="line"><span>is connected to the input voltage V</span></span>
<span class="line"><span>g, and the circuit reduces to Fig.2.8a. It should be noted here</span></span>
<span class="line"><span>that the reference polarities of vL(t) and iL(t) have been carefully deﬁned in Fig. 2.6, and these</span></span>
<span class="line"><span>reference polarities are consistently followed in the circuits of Fig. 2.8a,b. The inductor voltage</span></span>
<span class="line"><span>vL(t) is given by</span></span>
<span class="line"><span>vL= Vg−v(t) (2.7)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>As described above, the output voltage v(t) consists of the dc component V,p l u sas m a l la c</span></span>
<span class="line"><span>ripple term vripple (t). We can make the small-ripple approximation here, Eq. ( 2.6), to replace</span></span>
<span class="line"><span>v(t) with its dc component V:</span></span>
<span class="line"><span>vL≈Vg−V (2.8)</span></span>
<span class="line"><span>So with the switch in position 1, the inductor voltage is essentially constant and equal toVg−V,</span></span>
<span class="line"><span>as shown in Fig. 2.9. By knowledge of the inductor voltage waveform, the inductor current can</span></span>
<span class="line"><span>be found by use of the deﬁnition</span></span>
<span class="line"><span>vL(t)= LdiL(t)</span></span>
<span class="line"><span>dt (2.9)</span></span>
<span class="line"><span>Thus, during the ﬁrst interval, when vL(t) is approximately ( Vg−V), the slope of the inductor</span></span>
<span class="line"><span>current waveform is</span></span>
<span class="line"><span>diL(t)</span></span>
<span class="line"><span>dt = vL(t)</span></span>
<span class="line"><span>L ≈Vg−V</span></span>
<span class="line"><span>L (2.10)</span></span>
<span class="line"><span>which follows by dividing Eq. (2.9)b y L, and substituting Eq. (2.8). Since the inductor voltage</span></span>
<span class="line"><span>vL(t) is essentially constant while the switch is in position 1, the inductor current slope is also</span></span>
<span class="line"><span>essentially constant and the inductor current increases linearly.</span></span>
<span class="line"><span>Similar arguments apply during the second subinterval, when the switch is in position 2.</span></span>
<span class="line"><span>The left side of the inductor is then connected to ground, leading to the circuit of Fig. 2.8b. It is</span></span>
<span class="line"><span>important to consistently deﬁne the polarities of the inductor current and voltage; in particular,</span></span>
<span class="line"><span>the polarity of v</span></span>
<span class="line"><span>L(t) is deﬁned consistently in Figs. 2.7, 2.8a,b. So the inductor voltage during</span></span>
<span class="line"><span>the second subinterval is given by</span></span>
<span class="line"><span>vL(t)=−v(t) (2.11)</span></span>
<span class="line"><span>Use of the small-ripple approximation, Eq. (2.6), leads to</span></span>
<span class="line"><span>vL(t)≈−V (2.12)</span></span>
<span class="line"><span>So the inductor voltage is also essentially constant while the switch is in position 2, as illustrated</span></span>
<span class="line"><span>in Fig. 2.9. Substitution of Eq. ( 2.12) into Eq. ( 2.9) and solution for the slope of the inductor</span></span>
<span class="line"><span>current yields</span></span>
<span class="line"><span>diL(t)</span></span>
<span class="line"><span>dt ≈−V</span></span>
<span class="line"><span>L (2.13)</span></span>
<span class="line"><span>Hence, during the second subinterval the inductor current changes with a negative and essen-</span></span>
<span class="line"><span>tially constant slope.</span></span>
<span class="line"><span>We can now sketch the inductor current waveform (Fig.2.10). The inductor current begins at</span></span>
<span class="line"><span>some initial value iL(0). During the ﬁrst subinterval, with the switch in position 1, the inductor</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>+ vL(t) – iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>+ vL(t) – iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–Vg</span></span>
<span class="line"><span>(b)(a)</span></span>
<span class="line"><span>Fig. 2.8 Buck converter circuit: (a) while the switch is in position 1, (b) while the switch is in position 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 21</span></span>
<span class="line"><span>Fig. 2.9 Steady-state inductor voltage</span></span>
<span class="line"><span>waveform, buck converter</span></span>
<span class="line"><span>vL(t) Vg – V</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>– V</span></span>
<span class="line"><span>D&#39;TsDTs</span></span>
<span class="line"><span>Switch</span></span>
<span class="line"><span>position: 12 1</span></span>
<span class="line"><span>Fig. 2.10 Steady-state inductor current</span></span>
<span class="line"><span>waveform, buck converter –V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg –V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>iL(0)</span></span>
<span class="line"><span>iL(DTs)</span></span>
<span class="line"><span>ΔiL</span></span>
<span class="line"><span>current increases with the slope given in Eq. ( 2.10). At time t= DTs, the switch changes to</span></span>
<span class="line"><span>position 2. The current then decreases with the constant slope given by Eq. ( 2.13). At time</span></span>
<span class="line"><span>t= Ts, the switch changes back to position 1, and the process repeats.</span></span>
<span class="line"><span>It is of interest to calculate the inductor current ripple ΔiL. As illustrated in Fig. 2.10,t h e</span></span>
<span class="line"><span>peak inductor current is equal to the dc component I plus the peak-to-average rippleΔiL.T h i s</span></span>
<span class="line"><span>peak current ﬂows through not only the inductor, but also through the semiconductor devices</span></span>
<span class="line"><span>that comprise the switch. Knowledge of the peak current is necessary when specifying the rat-</span></span>
<span class="line"><span>ings of these devices.</span></span>
<span class="line"><span>Since we know the slope of the inductor current during the ﬁrst subinterval, and we also</span></span>
<span class="line"><span>know the length of the ﬁrst subinterval, we can calculate the ripple magnitude. The i</span></span>
<span class="line"><span>L(t)w a v e -</span></span>
<span class="line"><span>form is symmetrical about I, and hence during the ﬁrst subinterval the current increases by 2ΔiL</span></span>
<span class="line"><span>(sinceΔiL is the peak ripple, the peak-to-peak ripple is 2ΔiL). So the change in current, 2ΔiL,</span></span>
<span class="line"><span>is equal to the slope (the applied inductor voltage divided by L) times the length of the ﬁrst</span></span>
<span class="line"><span>subinterval (DTs):</span></span>
<span class="line"><span>(change in iL)= (slope)(length of subinterval)</span></span>
<span class="line"><span>(2ΔiL)=</span></span>
<span class="line"><span>⎦Vg−V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(DTs) (2.14)</span></span>
<span class="line"><span>Solution forΔiL yields</span></span>
<span class="line"><span>ΔiL= Vg−V</span></span>
<span class="line"><span>2L DTs (2.15)</span></span>
<span class="line"><span>Typical values ofΔiL lie in the range of 10%– 20% of the full-load value of the dc component</span></span>
<span class="line"><span>I. It is undesirable to allowΔiL to become too large; doing so would increase the peak currents of</span></span>
<span class="line"><span>the inductor and of the semiconductor switching devices, and would increase their size and cost.</span></span>
<span class="line"><span>So by design the inductor current ripple is also usually small compared to the dc component I.</span></span>
<span class="line"><span>The small-ripple approximation i</span></span>
<span class="line"><span>L(t)≈I is usually justiﬁed for the inductor current.</span></span>
<span class="line"><span>The inductor value can be chosen such that a desired current rippleΔiL is attained. Solution</span></span>
<span class="line"><span>of Eq. (2.15) for the inductance L yields</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>L= Vg−V</span></span>
<span class="line"><span>2ΔiL</span></span>
<span class="line"><span>DTs (2.16)</span></span>
<span class="line"><span>This equation is commonly used to select the value of inductance in the buck converter.</span></span>
<span class="line"><span>It is entirely possible to solve converters exactly, without use of the small-ripple approxima-</span></span>
<span class="line"><span>tion. For example, one could use the Laplace transform to write expressions for the waveforms</span></span>
<span class="line"><span>of the circuits of Fig. 2.8a,b. One could then invert the transforms, match boundary conditions,</span></span>
<span class="line"><span>and ﬁnd the periodic steady-state solution of the circuit. Having done so, one could then ﬁnd</span></span>
<span class="line"><span>the dc components of the waveforms and the peak values. But this is a great deal of work, and</span></span>
<span class="line"><span>the results are nearly always intractable. Besides, the extra work involved in writing equations</span></span>
<span class="line"><span>that exactly describe the ripple is a waste of time, since the ripple is small and is undesired. The</span></span>
<span class="line"><span>small-ripple approximation is easy to apply, and quickly yields simple expressions for the dc</span></span>
<span class="line"><span>components of the converter waveforms.</span></span>
<span class="line"><span>The inductor current waveform of Fig.2.10 is drawn under steady-state conditions, with the</span></span>
<span class="line"><span>converter operating in equilibrium. Let us consider next what happens to the inductor current</span></span>
<span class="line"><span>when the converter is ﬁrst turned on. Suppose that the inductor current and output voltage are</span></span>
<span class="line"><span>initially zero, and an input voltage V</span></span>
<span class="line"><span>g is then applied. As shown in Fig. 2.11, iL(0) is zero.</span></span>
<span class="line"><span>During the ﬁrst subinterval, with the switch in position 1, we know that the inductor current</span></span>
<span class="line"><span>will increase, with a slope of ( Vg −v)/L and with v initially zero. Next, with the switch in</span></span>
<span class="line"><span>position 2, the inductor current will change with a slope of −v/L; since v is initially zero, this</span></span>
<span class="line"><span>slope is essentially zero. It can be seen that there is a net increase in inductor current over the</span></span>
<span class="line"><span>ﬁrst switching period, becauseiL(Ts) is greater thaniL(0). Since the inductor current ﬂows to the</span></span>
<span class="line"><span>output, the output capacitor will charge slightly, andv will increase slightly. The process repeats</span></span>
<span class="line"><span>during the second and succeeding switching periods, with the inductor current increasing during</span></span>
<span class="line"><span>each subinterval 1 and decreasing during each subinterval 2.</span></span>
<span class="line"><span>As the output capacitor continues to charge and v increases, the slope during subinterval 1</span></span>
<span class="line"><span>decreases while the slope during subinterval 2 becomes more negative. Eventually, the point is</span></span>
<span class="line"><span>reached where the increase in inductor current during subinterval 1 is equal to the decrease in</span></span>
<span class="line"><span>inductor current during subinterval 2. There is then no net change in inductor current over a</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>iL(0) = 0</span></span>
<span class="line"><span>iL(nTs)</span></span>
<span class="line"><span>iL(Ts)</span></span>
<span class="line"><span>2Ts nTs (n + 1)Ts</span></span>
<span class="line"><span>iL((n + 1)Ts)</span></span>
<span class="line"><span>Vg –v(t)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>–v(t)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Fig. 2.11 Inductor current waveform during converter turn-on transient</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.2 V olt-Second and Charge Balance, Small-Ripple Approximation 23</span></span>
<span class="line"><span>complete switching period, and the converter operates in steady state. The converter waveforms</span></span>
<span class="line"><span>are periodic: iL(nTs)= iL((n+ 1)Ts). From this point on, the inductor current waveform appears</span></span>
<span class="line"><span>as in Fig. 2.10.</span></span>
<span class="line"><span>The requirement that, in equilibrium, the net change in inductor current over one switching</span></span>
<span class="line"><span>period be zero leads us to a way to ﬁnd steady-state conditions in any switching converter: the</span></span>
<span class="line"><span>principle of inductor volt-second balance. Given the deﬁning relation of an inductor:</span></span>
<span class="line"><span>vL(t)= LdiL(t)</span></span>
<span class="line"><span>dt (2.17)</span></span>
<span class="line"><span>Integration over one complete switching period, say from t= 0t o Ts, yields</span></span>
<span class="line"><span>iL(Ts)−iL(0)= 1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>∫ TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt (2.18)</span></span>
<span class="line"><span>This equation states that the net change in inductor current over one switching period, given by</span></span>
<span class="line"><span>the left-hand side of Eq. ( 2.18), is proportional to the integral of the applied inductor voltage</span></span>
<span class="line"><span>over the interval. In steady state, the initial and ﬁnal values of the inductor current are equal,</span></span>
<span class="line"><span>and hence the left-hand side of Eq. ( 2.18) is zero. Therefore, in steady state the integral of the</span></span>
<span class="line"><span>applied inductor voltage must be zero:</span></span>
<span class="line"><span>0=</span></span>
<span class="line"><span>∫ TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt (2.19)</span></span>
<span class="line"><span>The right-hand side of Eq. (2.19) has the units of volt-seconds or ﬂux-linkages. Equation (2.19)</span></span>
<span class="line"><span>states that the total area, or net volt-seconds, under the vL(t) waveform must be zero.</span></span>
<span class="line"><span>An equivalent form is obtained by dividing both sides of Eq. ( 2.19) by the switching</span></span>
<span class="line"><span>period Ts:</span></span>
<span class="line"><span>0= 1</span></span>
<span class="line"><span>TS</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt=⟨vL⟩ (2.20)</span></span>
<span class="line"><span>The right-hand side of Eq. (2.20) is recognized as the average value, or dc component, of vL(t).</span></span>
<span class="line"><span>Equation (2.20) states that, in equilibrium, the applied inductor voltage must have zero dc com-</span></span>
<span class="line"><span>ponent.</span></span>
<span class="line"><span>The inductor voltage waveform of Fig. 2.9 is reproduced in Fig. 2.12, with the area un-</span></span>
<span class="line"><span>der the vL(t) curve speciﬁcally identiﬁed. The total area λis given by the areas of the two</span></span>
<span class="line"><span>rectangles, or</span></span>
<span class="line"><span>λ=</span></span>
<span class="line"><span>∫ TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt= (Vg−V)(DTs)+ (−V)(D′Ts) (2.21)</span></span>
<span class="line"><span>Fig. 2.12 The principle of inductor volt-</span></span>
<span class="line"><span>second balance: in steady state, the net</span></span>
<span class="line"><span>volt-seconds applied to an inductor ( i.e.,</span></span>
<span class="line"><span>the total areaλ) must be zero</span></span>
<span class="line"><span>vL(t) Vg – V</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>– V</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>Total area λ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>24 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>The average value is therefore</span></span>
<span class="line"><span>⟨vL⟩= λ</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>= D(Vg−V)+ D′(−V) (2.22)</span></span>
<span class="line"><span>By equating⟨vL⟩ to zero, and noting that D+ D′= 1, one obtains</span></span>
<span class="line"><span>0= DVg−(D+ D′)V= DVg−V (2.23)</span></span>
<span class="line"><span>Solution for V yields</span></span>
<span class="line"><span>V= DVg (2.24)</span></span>
<span class="line"><span>which coincides with the result obtained previously, Eq. (2.3). So the principle of inductor volt-</span></span>
<span class="line"><span>second balance allows us to derive an expression for the dc component of the converter output</span></span>
<span class="line"><span>voltage. An advantage of this approach is its generality—it can be applied to any converter. One</span></span>
<span class="line"><span>simply sketches the applied inductor voltage waveform, and equates the average value to zero.</span></span>
<span class="line"><span>This method is used later in this chapter, to solve several more complicated converters.</span></span>
<span class="line"><span>Similar arguments can be applied to capacitors. The deﬁning equation of a capacitor is</span></span>
<span class="line"><span>iC(t)= C dvC(t)</span></span>
<span class="line"><span>dt (2.25)</span></span>
<span class="line"><span>Integration of this equation over one switching period yields</span></span>
<span class="line"><span>vC(Ts)−vC(0)= 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>∫ TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iC(t)dt (2.26)</span></span>
<span class="line"><span>In steady state, the net change over one switching period of the capacitor voltage must be zero,</span></span>
<span class="line"><span>so that the left-hand side of Eq. ( 2.26) is equal to zero. Therefore, in equilibrium the integral</span></span>
<span class="line"><span>of the capacitor current over one switching period (having the dimensions of amp-seconds, or</span></span>
<span class="line"><span>charge) should be zero. There is no net change in capacitor charge in steady state. An equivalent</span></span>
<span class="line"><span>statement is</span></span>
<span class="line"><span>0= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iC(t)dt=⟨iC⟩ (2.27)</span></span>
<span class="line"><span>The average value, or dc component, of the capacitor current must be zero in equilibrium.</span></span>
<span class="line"><span>This should be an intuitive result. If a dc current is applied to a capacitor, then the capacitor</span></span>
<span class="line"><span>will charge continually and its voltage will increase without bound. Likewise, if a dc voltage is</span></span>
<span class="line"><span>applied to an inductor, then the ﬂux will increase continually and the inductor current will in-</span></span>
<span class="line"><span>crease without bound. Equation (2.27), called the principle of capacitor amp-second balance or</span></span>
<span class="line"><span>capacitor charge balance, can be used to ﬁnd the steady-state currents in a switching converter.</span></span>
<span class="line"><span>2.3 Boost Converter Example</span></span>
<span class="line"><span>The boost converter, Fig.2.13a, is another well-known switched-mode converter that is capable</span></span>
<span class="line"><span>of producing a dc output voltage greater in magnitude than the dc input voltage. A practical</span></span>
<span class="line"><span>realization of the switch, using a MOSFET and diode, is shown in Fig. 2.13b. Let us apply the</span></span>
<span class="line"><span>small-ripple approximation and the principles of inductor volt-second balance and capacitor</span></span>
<span class="line"><span>charge balance to ﬁnd the steady-state output voltage and inductor current for this converter.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.3 Boost Converter Example 25</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>iC(t)+ vL(t) –</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>iC(t)+ vL(t) –</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>DTs Ts</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.13 Boost converter: (a) with ideal switch, (b) practical realization using MOSFET and diode</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+ vL(t) –</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+ vL(t) –</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.14 Boost converter circuit, (a) while the switch is in position 1, (b) while the switch is in position 2</span></span>
<span class="line"><span>With the switch in position 1, the right-hand side of the inductor is connected to ground,</span></span>
<span class="line"><span>resulting in the network of Fig. 2.14a. The inductor voltage and capacitor current for this subin-</span></span>
<span class="line"><span>terval are given by</span></span>
<span class="line"><span>vL = Vg (2.28)</span></span>
<span class="line"><span>iC =−v</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>26 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>Use of the linear-ripple approximation, v≈V, leads to</span></span>
<span class="line"><span>vL = V (2.29)</span></span>
<span class="line"><span>iC =−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>With the switch in position 2, the inductor is connected to the output, leading to the circuit of</span></span>
<span class="line"><span>Fig. 2.14b. The inductor voltage and capacitor current are then</span></span>
<span class="line"><span>vL = Vg−v (2.30)</span></span>
<span class="line"><span>iC = iL−v</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Use of the small-ripple approximation, v≈V and iL≈I, leads to</span></span>
<span class="line"><span>vL = Vg−V (2.31)</span></span>
<span class="line"><span>iC = I−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Equations (2.29) and (2.31) are used to sketch the inductor voltage and capacitor current wave-</span></span>
<span class="line"><span>forms of Fig. 2.15.</span></span>
<span class="line"><span>It can be inferred from the inductor voltage waveform of Fig.2.15a that the dc output voltage</span></span>
<span class="line"><span>V is greater than the input voltage Vg. During the ﬁrst subinterval, vL(t) is equal to the dc input</span></span>
<span class="line"><span>voltage Vg, and positive volt-seconds are applied to the inductor. Since, in steady-state, the</span></span>
<span class="line"><span>total volt-seconds applied over one switching period must be zero, negative volt-seconds must</span></span>
<span class="line"><span>be applied during the second subinterval. Therefore, the inductor voltage during the second</span></span>
<span class="line"><span>subinterval, (V</span></span>
<span class="line"><span>g−V), must be negative. Hence, V is greater than Vg.</span></span>
<span class="line"><span>The total volt-seconds applied to the inductor over one switching period are</span></span>
<span class="line"><span>∫ TS</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt= (Vg)DTs+ (Vg−V)D′Ts (2.32)</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>Vg – V</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>D&#39;Ts</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>– V/R</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>I – V/R</span></span>
<span class="line"><span>D&#39;Ts</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.15 Boost converter voltage and current waveforms</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.3 Boost Converter Example 27</span></span>
<span class="line"><span>Fig. 2.16 Dc conversion ratioM(D)</span></span>
<span class="line"><span>of the boost converter</span></span>
<span class="line"><span>M(D)</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>M(D)= 1</span></span>
<span class="line"><span>D&#39;= 1</span></span>
<span class="line"><span>1– D</span></span>
<span class="line"><span>By equating this expression to zero and collecting terms, one obtains</span></span>
<span class="line"><span>Vg(D+ D′)−VD</span></span>
<span class="line"><span>′</span></span>
<span class="line"><span>= 0 (2.33)</span></span>
<span class="line"><span>Solution for V, and by noting that (D+ D′)= 1, yields the expression for the output voltage,</span></span>
<span class="line"><span>V= Vg</span></span>
<span class="line"><span>D′ (2.34)</span></span>
<span class="line"><span>The voltage conversion ratio M(D) is the ratio of the output to the input voltage of a dc–dc</span></span>
<span class="line"><span>converter. Equation (2.34) predicts that the voltage conversion ratio is given by</span></span>
<span class="line"><span>M(D)= V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>D′ = 1</span></span>
<span class="line"><span>1−D (2.35)</span></span>
<span class="line"><span>This equation is plotted in Fig. 2.16.A t D= 0, V = Vg. The output voltage increases as D</span></span>
<span class="line"><span>increases, and in the ideal case tends to inﬁnity as D tends to 1. So the ideal boost converter</span></span>
<span class="line"><span>is capable of producing any output voltage greater than the input voltage. There are, of course,</span></span>
<span class="line"><span>limits to the output voltage that can be produced by a practical boost converter. In the next</span></span>
<span class="line"><span>chapter, component nonidealities are modeled, and it is found that the maximum output voltage</span></span>
<span class="line"><span>of a practical boost converter is indeed limited. Nonetheless, very large output voltages can be</span></span>
<span class="line"><span>produced if the nonidealities are suﬃciently small.</span></span>
<span class="line"><span>The dc component of the inductor current is derived by use of the principle of capacitor</span></span>
<span class="line"><span>charge balance. During the ﬁrst subinterval, the capacitor supplies the load current, and the</span></span>
<span class="line"><span>capacitor is partially discharged. During the second subinterval, the inductor current supplies</span></span>
<span class="line"><span>the load and, additionally, recharges the capacitor. The net change in capacitor charge over one</span></span>
<span class="line"><span>switching period is found by integrating the i</span></span>
<span class="line"><span>C(t) waveform of Fig.2.15b,</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iC(t)dt=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>DTs+</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>I−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>D′Ts (2.36)</span></span>
<span class="line"><span>Collecting terms, and equating the result to zero, leads to the steady-state result</span></span>
<span class="line"><span>−V</span></span>
<span class="line"><span>R (D+ D′)+ ID′= 0 (2.37)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>28 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>Fig. 2.17 Variation of inductor cur-</span></span>
<span class="line"><span>rent dc component I with duty cycle</span></span>
<span class="line"><span>D, boost converter</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>8</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Vg/R</span></span>
<span class="line"><span>By noting that (D+D′)= 1, and by solving for the inductor current dc componentI, one obtains</span></span>
<span class="line"><span>I= V</span></span>
<span class="line"><span>D′R (2.38)</span></span>
<span class="line"><span>So the inductor current dc component I is equal to the load current, V/R, divided by D′. Substi-</span></span>
<span class="line"><span>tution of Eq. (2.34) to eliminate V yields</span></span>
<span class="line"><span>I= Vg</span></span>
<span class="line"><span>D′2R (2.39)</span></span>
<span class="line"><span>This equation is plotted in Fig. 2.17. It can be seen that the inductor current becomes large as D</span></span>
<span class="line"><span>approaches 1.</span></span>
<span class="line"><span>This inductor current, which coincides with the dc input current in the boost converter, is</span></span>
<span class="line"><span>greater than the load current. Physically, this must be the case: to the extent that the converter</span></span>
<span class="line"><span>elements are ideal, the converter input and output powers are equal. Since the converter output</span></span>
<span class="line"><span>voltage is greater than the input voltage, the input current must likewise be greater than the out-</span></span>
<span class="line"><span>put current. In practice, the inductor current ﬂows through the semiconductor forward voltage</span></span>
<span class="line"><span>drops, the inductor winding resistance, and other sources of power loss. As the duty cycle ap-</span></span>
<span class="line"><span>proaches one, the inductor current becomes very large and these component nonidealities lead</span></span>
<span class="line"><span>to large power losses. In consequence, the eﬃciency of the boost converter decreases rapidly at</span></span>
<span class="line"><span>high duty cycle.</span></span>
<span class="line"><span>Next, let us sketch the inductor current i</span></span>
<span class="line"><span>L(t) waveform and derive an expression for the</span></span>
<span class="line"><span>inductor current ripple ΔiL. The inductor voltage waveform vL(t) has been already found</span></span>
<span class="line"><span>(Fig. 2.15), so we can sketch the inductor current waveform directly. During the ﬁrst subinterval,</span></span>
<span class="line"><span>with the switch in position 1, the slope of the inductor current is given by</span></span>
<span class="line"><span>diL(t)</span></span>
<span class="line"><span>dt = vL(t)</span></span>
<span class="line"><span>L = Vg</span></span>
<span class="line"><span>L (2.40)</span></span>
<span class="line"><span>Likewise, when the switch is in position 2, the slope of the inductor current waveform is</span></span>
<span class="line"><span>diL(t)</span></span>
<span class="line"><span>dt = vL(t)</span></span>
<span class="line"><span>L = Vg−V</span></span>
<span class="line"><span>L (2.41)</span></span>
<span class="line"><span>The inductor current waveform is sketched in Fig.2.18. During the ﬁrst subinterval, the change</span></span>
<span class="line"><span>in inductor current, 2ΔiL, is equal to the slope multiplied by the length of the subinterval, or</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.3 Boost Converter Example 29</span></span>
<span class="line"><span>Fig. 2.18 Boost converter inductor</span></span>
<span class="line"><span>current waveform iL(t) Vg –V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>I ΔiL</span></span>
<span class="line"><span>Fig. 2.19 Boost converter output</span></span>
<span class="line"><span>voltage waveform v(t)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>V Δv</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>C – V</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>–V</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>2ΔiL= Vg</span></span>
<span class="line"><span>L DTs (2.42)</span></span>
<span class="line"><span>Solution forΔiL leads to</span></span>
<span class="line"><span>ΔiL= Vg</span></span>
<span class="line"><span>2L DTs (2.43)</span></span>
<span class="line"><span>This expression can be used to select the inductor value L such that a given value of ΔiL is</span></span>
<span class="line"><span>obtained.</span></span>
<span class="line"><span>Likewise, the capacitor voltage v(t) waveform can be sketched, and an expression derived</span></span>
<span class="line"><span>for the output voltage ripple peak magnitudeΔv. The capacitor current waveform iC(t)i sg i v e n</span></span>
<span class="line"><span>in Fig. 2.15. During the ﬁrst subinterval, the slope of the capacitor voltage waveform v(t)i s</span></span>
<span class="line"><span>dvC(t)</span></span>
<span class="line"><span>dt = iC(t)</span></span>
<span class="line"><span>C =−V</span></span>
<span class="line"><span>RC (2.44)</span></span>
<span class="line"><span>During the second subinterval, the slope is</span></span>
<span class="line"><span>dvC(t)</span></span>
<span class="line"><span>dt = iC(t)</span></span>
<span class="line"><span>C = I</span></span>
<span class="line"><span>C−V</span></span>
<span class="line"><span>RC (2.45)</span></span>
<span class="line"><span>The capacitor voltage waveform is sketched in Fig.2.19. During the ﬁrst subinterval, the change</span></span>
<span class="line"><span>in capacitor voltage,−2Δv, is equal to the slope multiplied by the length of the subinterval:</span></span>
<span class="line"><span>−2Δv=−V</span></span>
<span class="line"><span>RC DTs (2.46)</span></span>
<span class="line"><span>Solution forΔv yields</span></span>
<span class="line"><span>Δv= V</span></span>
<span class="line"><span>2RC DTs (2.47)</span></span>
<span class="line"><span>This expression can be used to select the capacitor value C to obtain a given output voltage</span></span>
<span class="line"><span>ripple peak magnitudeΔv.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>30 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>2.4 ´Cuk Converter Example</span></span>
<span class="line"><span>As a second example, consider the ´Cuk converter of Fig. 2.20a. This converter performs a dc</span></span>
<span class="line"><span>conversion function similar to the buck–boost converter: it can either increase or decrease the</span></span>
<span class="line"><span>magnitude of the dc voltage, and it inverts the polarity. A practical realization using a transistor</span></span>
<span class="line"><span>and diode is illustrated in Fig. 2.20b.</span></span>
<span class="line"><span>This converter operates via capacitive energy transfer. As illustrated in Fig. 2.21, capacitor</span></span>
<span class="line"><span>C1 is connected through L1 to the input source while the switch is in position 2, and source</span></span>
<span class="line"><span>energy is stored in C1. When the switch is in position 1, this energy is released through L2 to</span></span>
<span class="line"><span>the load.</span></span>
<span class="line"><span>The inductor currents and capacitor voltages are deﬁned, with polarities assigned somewhat</span></span>
<span class="line"><span>arbitrarily, in Fig.2.20a. In this section, the principles of inductor volt-second balance and capac-</span></span>
<span class="line"><span>itor charge balance are applied to ﬁnd the dc components of the inductor currents and capacitor</span></span>
<span class="line"><span>voltages. The voltage and current ripple magnitudes are also found.</span></span>
<span class="line"><span>During the ﬁrst subinterval, while the switch is in position 1, the converter circuit reduces</span></span>
<span class="line"><span>to Fig. 2.21a. The inductor voltages and capacitor currents are</span></span>
<span class="line"><span>vL1 = Vg</span></span>
<span class="line"><span>vL2 =−v1−v2</span></span>
<span class="line"><span>iC1= i2 (2.48)</span></span>
<span class="line"><span>iC2= i2−v2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>We next assume that the switching ripple magnitudes ini1(t), i2(t), v1(t), and v2(t) are small</span></span>
<span class="line"><span>compared to their respective dc components I1, I2, V1, and V2. We can therefore make the</span></span>
<span class="line"><span>small-ripple approximation, and Eq. (2.48) becomes</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>C1 L2</span></span>
<span class="line"><span>1 2</span></span>
<span class="line"><span>+ v1 –i1 i2</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>C1 L2</span></span>
<span class="line"><span>+ v1 –i1 i2</span></span>
<span class="line"><span>D1Q1Vg</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.20 ´Cuk converter: (a) with ideal switch, (b) practical realization using MOSFET and diode</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.4 ´Cuk Converter Example 31</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span> –</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>iC1 iC2</span></span>
<span class="line"><span>+ vL2 –+ vL1 –</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2i1 i2</span></span>
<span class="line"><span> +</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>iC1</span></span>
<span class="line"><span>iC2</span></span>
<span class="line"><span>+ vL2 –+ vL1 –</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Fig. 2.21 ´Cuk converter circuit: (a) while switch is in position 1, (b) while switch is in position 2</span></span>
<span class="line"><span>vL1 = Vg</span></span>
<span class="line"><span>vL2 =−V1−V2 (2.49)</span></span>
<span class="line"><span>iC1 = I2</span></span>
<span class="line"><span>iC2 = I2−V2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>During the second subinterval, with the switch in position 2, the converter circuit elements are</span></span>
<span class="line"><span>connected as in Fig. 2.21b. The inductor voltages and capacitor currents are:</span></span>
<span class="line"><span>vL1 = Vg−v1</span></span>
<span class="line"><span>vL2 =−v2</span></span>
<span class="line"><span>iC1 = i1 (2.50)</span></span>
<span class="line"><span>iC2 = i2−v2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>We again make the small-ripple approximation, and hence Eq. (2.50) becomes</span></span>
<span class="line"><span>vL1 = Vg−V1</span></span>
<span class="line"><span>vL2 =−V2</span></span>
<span class="line"><span>iC1 = I1 (2.51)</span></span>
<span class="line"><span>iC2 = I2−V2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Equations (2.49) and (2.51) are used to sketch the inductor voltage and capacitor current wave-</span></span>
<span class="line"><span>forms in Fig. 2.22.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>32 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>vL1(t)</span></span>
<span class="line"><span>Vg – V1</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>D&#39;Ts</span></span>
<span class="line"><span>vL2(t)</span></span>
<span class="line"><span>– V1 – V2</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>– V2</span></span>
<span class="line"><span>D&#39;Ts</span></span>
<span class="line"><span>iC1(t)</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>D&#39;Ts</span></span>
<span class="line"><span>iC2(t)</span></span>
<span class="line"><span>I2 – V2 /R (= 0)</span></span>
<span class="line"><span>tDTs D&#39;Ts</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>(d)</span></span>
<span class="line"><span>Fig. 2.22 ´Cuk converter waveforms: (a) inductor voltage vL1(t), (b) inductor voltage vL2(t), (c) capacitor</span></span>
<span class="line"><span>current iC1(t), (d) capacitor current iC2(t)</span></span>
<span class="line"><span>The next step is to equate the dc components, or average values, of the waveforms of</span></span>
<span class="line"><span>Fig. 2.22 to zero, to ﬁnd the steady-state conditions in the converter. The results are</span></span>
<span class="line"><span>⟨vL1⟩= DVg+ D′ ⎦</span></span>
<span class="line"><span>Vg−V1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= 0</span></span>
<span class="line"><span>⟨vL2⟩= D (−V1−V2)+ D′(−V2)= 0 (2.52)</span></span>
<span class="line"><span>⟨iC1⟩= DI2+ D′I1= 0</span></span>
<span class="line"><span>⟨iC2⟩= I2−V2</span></span>
<span class="line"><span>R = 0</span></span>
<span class="line"><span>Solution of this system of equations for the dc components of the capacitor voltages and inductor</span></span>
<span class="line"><span>currents leads to</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.4 ´Cuk Converter Example 33</span></span>
<span class="line"><span>M(D)</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>-5</span></span>
<span class="line"><span>-4</span></span>
<span class="line"><span>-3</span></span>
<span class="line"><span>-2</span></span>
<span class="line"><span>-1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>M(D)= V2</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>=– D</span></span>
<span class="line"><span>1– D</span></span>
<span class="line"><span>Fig. 2.23 Dc conversion ratio M(D)=−V/Vg of the ´Cuk converter</span></span>
<span class="line"><span>V1 = Vg</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>V2 =−D</span></span>
<span class="line"><span>D′ Vg (2.53)</span></span>
<span class="line"><span>I1 =−D</span></span>
<span class="line"><span>D′ I2=</span></span>
<span class="line"><span>⎦D</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>)2 Vg</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>I2 = V2</span></span>
<span class="line"><span>R =−D</span></span>
<span class="line"><span>D′</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>The dependence of the dc output voltage V2 on the duty cycle D is sketched in Fig. 2.23.</span></span>
<span class="line"><span>The inductor current waveforms are sketched in Fig. 2.24a,b, and the capacitor C1 voltage</span></span>
<span class="line"><span>waveform v1(t) is sketched in Fig. 2.24c. During the ﬁrst subinterval, the slopes of the wave-</span></span>
<span class="line"><span>forms are given by</span></span>
<span class="line"><span>di1(t)</span></span>
<span class="line"><span>dt = vL1(t)</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>= Vg</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>di2(t)</span></span>
<span class="line"><span>dt = vL2(t)</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>=−V1−V2</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>(2.54)</span></span>
<span class="line"><span>dv1(t)</span></span>
<span class="line"><span>dt = iC1(t)</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>= I2</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>Equation (2.49) has been used here to substitute for the values of vL1, vL2, and iC1 during the</span></span>
<span class="line"><span>ﬁrst subinterval. During the second interval, the slopes of the waveforms are given by</span></span>
<span class="line"><span>di1(t)</span></span>
<span class="line"><span>dt = vL1(t)</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>= Vg−V1</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>di2(t)</span></span>
<span class="line"><span>dt = vL2(t)</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>=−V2</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>(2.55)</span></span>
<span class="line"><span>dv1(t)</span></span>
<span class="line"><span>dt = iC1(t)</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>= I1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>Equation (2.51) was used to substitute for the values of vL1, vL2, and iC1 during the second</span></span>
<span class="line"><span>subinterval.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>34 2 Principles of Steady-State Converter Analysis</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>tDTs Ts</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>Δi1</span></span>
<span class="line"><span>Vg –V1</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>–V2</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>–V1 –V2</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>i2(t)</span></span>
<span class="line"><span>tDTs Ts</span></span>
<span class="line"><span>I2 Δi2</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>v1(t)</span></span>
<span class="line"><span>tDTs Ts</span></span>
<span class="line"><span>V1</span></span>
<span class="line"><span>Δv1</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>Fig. 2.24 ´Cuk converter waveforms: ( a) inductor current i1(t), (b) inductor current i2(t), (c) capacitor</span></span>
<span class="line"><span>voltage v1(t)</span></span>
<span class="line"><span>During the ﬁrst subinterval, the quantities i1(t), i2(t), and v1(t) change by 2Δi1,−2Δi2, and</span></span>
<span class="line"><span>−2Δv1, respectively. These changes are equal to the slopes given in Eq. ( 2.54), multiplied by</span></span>
<span class="line"><span>the subinterval length DTs, yielding</span></span>
<span class="line"><span>Δi1 = VgDTs</span></span>
<span class="line"><span>2L1</span></span>
<span class="line"><span>Δi2 = V1+ V2</span></span>
<span class="line"><span>2L2</span></span>
<span class="line"><span>DTs (2.56)</span></span>
<span class="line"><span>Δv1 =−I2DTs</span></span>
<span class="line"><span>2C1</span></span>
<span class="line"><span>The dc relationships, Eq. ( 2.53), can now be used to simplify these expressions and eliminate</span></span>
<span class="line"><span>V1, V2, and I1, leading to</span></span>
<span class="line"><span>Δi1= VgDTs</span></span>
<span class="line"><span>2L1</span></span>
<span class="line"><span>Δi2= VgDTs</span></span>
<span class="line"><span>2L2</span></span>
<span class="line"><span>(2.57)</span></span>
<span class="line"><span>Δv1 = VgD2Ts</span></span>
<span class="line"><span>2D′RC1</span></span></code></pre></div>`,10)])])}const v=s(l,[["render",i]]);export{u as __pageData,v as default};
