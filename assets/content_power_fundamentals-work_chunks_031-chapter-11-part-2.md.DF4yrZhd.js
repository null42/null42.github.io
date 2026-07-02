import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const h=JSON.parse('{"title":"第11章part 2 - 11 Inductor Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第11章part 2 - 11 Inductor Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 488-492 > Chunk ID: `chapter-11-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/031-chapter-11-part-2.md","filePath":"content/power/fundamentals-work/chunks/031-chapter-11-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/031-chapter-11-part-2.md"};function i(t,n,o,c,r,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="第11章part-2-11-inductor-design" tabindex="-1">第11章part 2 - 11 Inductor Design <a class="header-anchor" href="#第11章part-2-11-inductor-design" aria-label="Permalink to &quot;第11章part 2 - 11 Inductor Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 488-492<br> Chunk ID: <code>chapter-11-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>11.4 Examples 479</span></span>
<span class="line"><span>The number of winding 1 turns is chosen according to Eq. (11.54), as follows:</span></span>
<span class="line"><span>n1 = LM IM,max</span></span>
<span class="line"><span>BmaxAc</span></span>
<span class="line"><span>104</span></span>
<span class="line"><span>= (1.07· 10−3 H)(1.5A )</span></span>
<span class="line"><span>(0.25 T)(1.09 cm2) 104 (11.79)</span></span>
<span class="line"><span>= 58.7 turns</span></span>
<span class="line"><span>Since an integral number of turns is required, we roundoﬀthis value to</span></span>
<span class="line"><span>n1= 59 (11.80)</span></span>
<span class="line"><span>To obtain the desired turns ratio, n2 should be chosen as follows:</span></span>
<span class="line"><span>n2 =</span></span>
<span class="line"><span>⎦n2</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= (0.15)59 (11.81)</span></span>
<span class="line"><span>= 8.81</span></span>
<span class="line"><span>We again round this value oﬀ,t o</span></span>
<span class="line"><span>n2= 9 (11.82)</span></span>
<span class="line"><span>The fractions of the window area allocated to windings 1 and 2 are selected in accordance with</span></span>
<span class="line"><span>Eq. (11.56):</span></span>
<span class="line"><span>α 1 = I1</span></span>
<span class="line"><span>Itot</span></span>
<span class="line"><span>= (0.796 A)</span></span>
<span class="line"><span>(1.77 A) = 0.45</span></span>
<span class="line"><span>α 2 = n2I2</span></span>
<span class="line"><span>n1Itot</span></span>
<span class="line"><span>= (9)(6.5A )</span></span>
<span class="line"><span>(59)(1.77 A)= 0.55 (11.83)</span></span>
<span class="line"><span>The wire gauges should therefore be</span></span>
<span class="line"><span>AW1 ≤α 1KuWA</span></span>
<span class="line"><span>n1</span></span>
<span class="line"><span>= 1.09· 10−3 cm2 —use #28 AWG</span></span>
<span class="line"><span>AW2 ≤α 2KuWA</span></span>
<span class="line"><span>n2</span></span>
<span class="line"><span>= 8.88· 10−3 cm2 —use #19 AWG (11.84)</span></span>
<span class="line"><span>The above American Wire Gauges are selected using the wire gauge table given at the end of</span></span>
<span class="line"><span>Appendix B.</span></span>
<span class="line"><span>The above design does not account for core loss or copper loss caused by the proximity</span></span>
<span class="line"><span>eﬀect. Let us compute the core loss for this design. Figure Fig. 11.14 contains a sketch of the</span></span>
<span class="line"><span>B–H loop for this design. The ﬂux densityB(t) can be expressed as a dc component (determined</span></span>
<span class="line"><span>by the dc value of the magnetizing current IM), plus an ac variation of peak amplitudeΔB that</span></span>
<span class="line"><span>is determined by the current rippleΔiM. The maximum value of B(t) is labeled Bmax; this value</span></span>
<span class="line"><span>is determined by the sum of the dc component and the ac ripple component. The core material</span></span>
<span class="line"><span>saturates when the applied B(t) exceeds B</span></span>
<span class="line"><span>sat; hence, to avoid saturation, Bmax should be less</span></span>
<span class="line"><span>than Bsat. The core loss is determined by the amplitude of the ac variations in B(t), i.e., byΔB.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>480 11 Inductor Design</span></span>
<span class="line"><span>Fig. 11.14 B–H loop for the ﬂyback transformer</span></span>
<span class="line"><span>design example</span></span>
<span class="line"><span>B(t)</span></span>
<span class="line"><span>Hc(t)</span></span>
<span class="line"><span>CCM flyback</span></span>
<span class="line"><span>example</span></span>
<span class="line"><span>large excitation</span></span>
<span class="line"><span>Bsat</span></span>
<span class="line"><span>BBmax</span></span>
<span class="line"><span>Fig. 11.15 Variation of ﬂux density B(t), ﬂy-</span></span>
<span class="line"><span>back transformer example</span></span>
<span class="line"><span>vM(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>DTs</span></span>
<span class="line"><span>B(t)</span></span>
<span class="line"><span>Bmax</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>B</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>n1 Ac</span></span>
<span class="line"><span>The ac componentΔB is determined using Faraday’s law, as follows. Solution of Faraday’s</span></span>
<span class="line"><span>law for the derivative of B(t) leads to</span></span>
<span class="line"><span>dB(t)</span></span>
<span class="line"><span>dt = vM(t)</span></span>
<span class="line"><span>n1Ac</span></span>
<span class="line"><span>(11.85)</span></span>
<span class="line"><span>As illustrated in Fig. 11.15, the voltage applied during the ﬁrst subinterval is vM(t)= Vg.T h i s</span></span>
<span class="line"><span>causes the ﬂux density to increase with slope</span></span>
<span class="line"><span>dB(t)</span></span>
<span class="line"><span>dt = Vg</span></span>
<span class="line"><span>n1Ac</span></span>
<span class="line"><span>(11.86)</span></span>
<span class="line"><span>Over the ﬁrst subinterval 0 &lt; t&lt; DTs, the ﬂux density B(t) changes by the net amount 2ΔB.</span></span>
<span class="line"><span>This net change is equal to the slope given by Eq. (11.86), multiplied by the interval lengthDTs:</span></span>
<span class="line"><span>ΔB=</span></span>
<span class="line"><span>⎦ Vg</span></span>
<span class="line"><span>2n1Ac</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(DTs) (11.87)</span></span>
<span class="line"><span>Upon solving forΔB and expressing Ac in cm2, we obtain</span></span>
<span class="line"><span>ΔB= VgDTs</span></span>
<span class="line"><span>2n1Ac</span></span>
<span class="line"><span>104 (11.88)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.5 Summary of Key Points 481</span></span>
<span class="line"><span>B, Tesla</span></span>
<span class="line"><span>0.01 0.1 0.3</span></span>
<span class="line"><span>Power loss density,</span></span>
<span class="line"><span>Watts/cm3</span></span>
<span class="line"><span>0.01</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>20kHz</span></span>
<span class="line"><span>50kHz</span></span>
<span class="line"><span>100kHz</span></span>
<span class="line"><span>200kHz400kHz</span></span>
<span class="line"><span>150kHz</span></span>
<span class="line"><span>0.04</span></span>
<span class="line"><span>W/cm3</span></span>
<span class="line"><span>0.041</span></span>
<span class="line"><span>Fig. 11.16 Determination of core loss density for the ﬂyback transformer design example</span></span>
<span class="line"><span>For the ﬂyback transformer example, the peak ac ﬂux density is found to be</span></span>
<span class="line"><span>ΔB= (200 V)(0.4)(6.67 μs)</span></span>
<span class="line"><span>2(59)(1.09 cm2) 104 (11.89)</span></span>
<span class="line"><span>= 0.041 T</span></span>
<span class="line"><span>To determine the core loss, we next examine the data provided by the manufacturer for the</span></span>
<span class="line"><span>given core material. A typical plot of core loss is illustrated in Fig. 11.16. For the values ofΔB</span></span>
<span class="line"><span>and switching frequency of the ﬂyback transformer design, this plot indicates that 0.04 W will</span></span>
<span class="line"><span>be lost in every cm3 of the core material. Of course, this value neglects the eﬀects of harmonics</span></span>
<span class="line"><span>on core loss. The total core loss Pfe will therefore be equal to this loss density, multiplied by the</span></span>
<span class="line"><span>volume of the core:</span></span>
<span class="line"><span>Pfe = (0.04 W/cm3)(Acℓm)</span></span>
<span class="line"><span>= (0.04 W/cm3)(1.09 cm2)(5.77 cm) (11.90)</span></span>
<span class="line"><span>= 0.25 W</span></span>
<span class="line"><span>This core loss is less than the copper loss of 1.5 W, and neglecting the core loss is often war-</span></span>
<span class="line"><span>ranted in designs that operate in the continuous conduction mode and that employ ferrite core</span></span>
<span class="line"><span>materials.</span></span>
<span class="line"><span>11.5 Summary of Key Points</span></span>
<span class="line"><span>1. A variety of magnetic devices are commonly used in switching converters. These devices</span></span>
<span class="line"><span>diﬀer in their core ﬂux density variations, as well as in the magnitudes of the ac winding cur-</span></span>
<span class="line"><span>rents. When the ﬂux density variations are small, core loss can be neglected. Alternatively,</span></span>
<span class="line"><span>a low-frequency material can be used, having higher saturation ﬂux density.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>482 11 Inductor Design</span></span>
<span class="line"><span>2. The core geometrical constant Kg is a measure of the magnetic size of a core, for appli-</span></span>
<span class="line"><span>cations in which copper loss is dominant. In the Kg design method, ﬂux density and total</span></span>
<span class="line"><span>copper loss are speciﬁed. Design procedures for single-winding ﬁlter inductors and for con-</span></span>
<span class="line"><span>ventional multiple-winding transformers are derived.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>11.1 A simple buck converter operates with a 50 kHz switching frequency and a dc input volt-</span></span>
<span class="line"><span>age of Vg= 40 V. The output voltage is V= 20 V. The load resistance is R≥4Ω.</span></span>
<span class="line"><span>(a) Determine the value of the output ﬁlter inductance L such that the peak-to-average</span></span>
<span class="line"><span>inductor current rippleΔi is 10% of the dc component I.</span></span>
<span class="line"><span>(b) Determine the peak steady-state inductor current Imax.</span></span>
<span class="line"><span>(c) Design an inductor which has the values of L and Imax from parts (a) and (b). Use a</span></span>
<span class="line"><span>ferrite EE core, with Bmax = 0.25 T. Choose a value of winding resistance such that</span></span>
<span class="line"><span>the inductor copper loss is less than or equal to 1 W at room temperature. Assume</span></span>
<span class="line"><span>Ku= 0.5. Specify: core size, gap length, wire size (AWG), and number of turns.</span></span>
<span class="line"><span>11.2 A boost converter operates at the following quiescent point:Vg= 28 V, V= 48 V, Pload=</span></span>
<span class="line"><span>150 W, fs= 100 kHz. Design the inductor for this converter. Choose the inductance value</span></span>
<span class="line"><span>such that the peak current ripple is 10% of the dc inductor current. Use a peak ﬂux density</span></span>
<span class="line"><span>of 0.225 T, and assume a ﬁll factor of 0.5. Allow copper loss equal to 0.5% of the load</span></span>
<span class="line"><span>power, at room temperature. Use a ferrite PQ core. Specify: core size, air gap length, wire</span></span>
<span class="line"><span>gauge, and number of turns.</span></span>
<span class="line"><span>11.3 Extension of the K</span></span>
<span class="line"><span>g approach to design of two-winding transformers. It is desired to de-</span></span>
<span class="line"><span>sign a transformer having a turns ratio of 1 : n. The transformer stores negligible energy,</span></span>
<span class="line"><span>no air gap is required, and the ratio of the winding currents i2(t)/i1(t) is essentially equal</span></span>
<span class="line"><span>to the turns ratio n. The applied primary volt-secondsλ1 are deﬁned for a typical PWM</span></span>
<span class="line"><span>voltage waveform v1(t)i nF i g .10.45b; these volt-seconds should cause the maximum ﬂux</span></span>
<span class="line"><span>density to be equal to a speciﬁed value Bmax =ΔB. You may assume that the ﬂux density</span></span>
<span class="line"><span>B(t) contains no dc bias, as in Fig.10.46. You should allocate half of the core window area</span></span>
<span class="line"><span>to each winding. The total copper loss Pcu is also speciﬁed. You may neglect proximity</span></span>
<span class="line"><span>losses.</span></span>
<span class="line"><span>(a) Derive a transformer design procedure, in which the following quantities are speciﬁed:</span></span>
<span class="line"><span>total copper loss Pcu, maximum ﬂux density Bmax, ﬁll factor Ku, wire resistivityρ,r m s</span></span>
<span class="line"><span>primary current I1, applied primary volt-secondsλ1, and turns ratio 1:n. Your procedure</span></span>
<span class="line"><span>should yield the following data: required core geometrical constant Kg, primary and</span></span>
<span class="line"><span>secondary turns n1 and n2, and primary and secondary wire areas Aw1 and Aw2.</span></span>
<span class="line"><span>(b) The voltage waveform applied to the transformer primary winding of the ´Cuk converter</span></span>
<span class="line"><span>(Fig. 6.42c) is equal to the converter input voltageVg while the transistor conducts, and</span></span>
<span class="line"><span>is equal to −VgD/(1−D) while the diode conducts. This converter operates with a</span></span>
<span class="line"><span>switching frequency of 100 kHz, and a transistor duty cycle D equal to 0.4. The dc</span></span>
<span class="line"><span>input voltage is Vg = 120 V, the dc output voltage is V = 24 V, and the load power</span></span>
<span class="line"><span>is 200 W. You may assume a ﬁll factor of Ku = 0.3. Use your procedure of part (a) to</span></span>
<span class="line"><span>design a transformer for this application, in which Bmax= 0.15 T, and Pcu= 0.25 W at</span></span>
<span class="line"><span>100◦C. Use a ferrite PQ core. Specify: core size, primary and secondary turns, and wire</span></span>
<span class="line"><span>gauges.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11.5 Summary of Key Points 483</span></span>
<span class="line"><span>11.4 Coupled inductor design. The two-output forward converter of Fig. 10.47ae m p l o y s</span></span>
<span class="line"><span>secondary-side coupled inductors. An air gap is employed.</span></span>
<span class="line"><span>Design a coupled inductor for the following application: V1 = 5V, V2 = 15 V, I1 =</span></span>
<span class="line"><span>20 A, I2= 4A, D= 0.4. The magnetizing inductance should be equal to 8μH, referred to</span></span>
<span class="line"><span>the 5 V winding. You may assume a ﬁll factor Ku of 0.5. Allow a total of 1 W of copper</span></span>
<span class="line"><span>loss at 100◦C, and use a peak ﬂux density of Bmax= 0.2 T. Use a ferrite EE core. Specify:</span></span>
<span class="line"><span>core size, air gap length, number of turns, and wire gauge for each winding.</span></span>
<span class="line"><span>11.5 Flyback transformer design. A ﬂyback converter operates with a 160 Vdc input, and pro-</span></span>
<span class="line"><span>duces a 28 Vdc output. The maximum load current is 2 A. The transformer turns ratio is</span></span>
<span class="line"><span>8:1. The switching frequency is 100 kHz. The converter should be designed to operate in</span></span>
<span class="line"><span>the discontinuous conduction mode at all load currents. The total copper loss should be</span></span>
<span class="line"><span>less than 0.75 W.</span></span>
<span class="line"><span>(a) Choose the value of transformer magnetizing inductance L</span></span>
<span class="line"><span>M such that, at maximum</span></span>
<span class="line"><span>load current, D3= 0.1 (the duty cycle of subinterval 3, in which all semiconductors are</span></span>
<span class="line"><span>oﬀ). Please indicate whether your value of LM is referred to the primary or secondary</span></span>
<span class="line"><span>winding. What is the peak transistor current? The peak diode current?</span></span>
<span class="line"><span>(b) Design a ﬂyback transformer for this application. Use a ferrite pot core with Bmax =</span></span>
<span class="line"><span>0.25 Tesla, and with ﬁll factor Ku = 0.4. Specify: core size, primary and secondary</span></span>
<span class="line"><span>turns and wire sizes, and air gap length.</span></span>
<span class="line"><span>(c) For your design of part (b), compute the copper losses in the primary and secondary</span></span>
<span class="line"><span>windings. You may neglect proximity loss.</span></span>
<span class="line"><span>(d) For your design of part (b), compute the core loss. Loss data for the core material is</span></span>
<span class="line"><span>given by Fig. 10.20. Is the core loss less than the copper loss computed in Part (c)?</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{h as __pageData,m as default};
