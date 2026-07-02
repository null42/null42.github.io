import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const h=JSON.parse('{"title":"第5章part 1 - 5 The Discontinuous Conduction Mode","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第5章part 1 - 5 The Discontinuous Conduction Mode","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 149-168 > Chunk ID: `chapter-5-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/011-chapter-5-part-1.md","filePath":"content/power/fundamentals-work/chunks/011-chapter-5-part-1.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/011-chapter-5-part-1.md"};function l(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第5章part-1-5-the-discontinuous-conduction-mode" tabindex="-1">第5章part 1 - 5 The Discontinuous Conduction Mode <a class="header-anchor" href="#第5章part-1-5-the-discontinuous-conduction-mode" aria-label="Permalink to &quot;第5章part 1 - 5 The Discontinuous Conduction Mode&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 149-168<br> Chunk ID: <code>chapter-5-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>5</span></span>
<span class="line"><span>The Discontinuous Conduction Mode</span></span>
<span class="line"><span>When the ideal switches of a dc–dc converter are implemented using current-unidirectional</span></span>
<span class="line"><span>and/or voltage-unidirectional semiconductor switches, one or more new modes of operation</span></span>
<span class="line"><span>known as discontinuous conduction modes (DCM) can occur. The discontinuous conduction</span></span>
<span class="line"><span>mode arises when the switching ripple in an inductor current or capacitor voltage is large enough</span></span>
<span class="line"><span>to cause the polarity of the applied switch current or voltage to reverse, such that the current-</span></span>
<span class="line"><span>or voltage-unidirectional assumptions made in realizing the switch with semiconductor devices</span></span>
<span class="line"><span>are violated. The DCM is commonly observed in dc–dc converters and rectiﬁers, and can also</span></span>
<span class="line"><span>sometimes occur in inverters or in other converters containing two-quadrant switches.</span></span>
<span class="line"><span>The discontinuous conduction mode typically occurs with large inductor current ripple in a</span></span>
<span class="line"><span>converter operating at light load and containing current-unidirectional switches. Since it is usu-</span></span>
<span class="line"><span>ally required that converters operate with their loads removed, DCM is frequently encountered.</span></span>
<span class="line"><span>Indeed, some converters are purposely designed to operate in DCM for all loads.</span></span>
<span class="line"><span>The properties of converters change radically in the discontinuous conduction mode. The</span></span>
<span class="line"><span>conversion ratio M becomes load-dependent, and the output impedance is increased. Control of</span></span>
<span class="line"><span>the output may be lost when the load is removed. We will see in a later chapter that the converter</span></span>
<span class="line"><span>dynamics are also signiﬁcantly altered.</span></span>
<span class="line"><span>In this chapter, the origins of the discontinuous conduction mode are explained, and the</span></span>
<span class="line"><span>mode boundary is derived. Techniques for solution of the converter waveforms and output volt-</span></span>
<span class="line"><span>age are also described. The principles of inductor volt-second balance and capacitor charge</span></span>
<span class="line"><span>balance must always be true in steady state, regardless of the operating mode. However, appli-</span></span>
<span class="line"><span>cation of the small- ripple approximation requires some care, since the inductor current ripple</span></span>
<span class="line"><span>(or one of the inductor current or capacitor voltage ripples) is not small.</span></span>
<span class="line"><span>Buck and boost converters are solved as examples. Characteristics of the basic buck, boost,</span></span>
<span class="line"><span>and buck–boost converters are summarized in tabular form.</span></span>
<span class="line"><span>5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary</span></span>
<span class="line"><span>Let us consider how the inductor and switch current waveforms change as the load power is</span></span>
<span class="line"><span>reduced. Let us use the buck converter (Fig. 5.1) as a simple example. The inductor current</span></span>
<span class="line"><span>iL(t) and diode current iD(t) waveforms are sketched in Fig. 5.2 for the continuous conduction</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_5</span></span>
<span class="line"><span>135</span></span>
<span class="line"><span></span></span>
<span class="line"><span>136 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.1 Buck converter</span></span>
<span class="line"><span>example +</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VD1Vg</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>iD(t)</span></span>
<span class="line"><span>mode. As described in Chap. 2, the inductor current waveform contains a dc component I,</span></span>
<span class="line"><span>plus switching ripple of peak amplitude ΔiL. During the second subinterval, the diode current</span></span>
<span class="line"><span>is identical to the inductor current. The minimum diode current during the second subinterval</span></span>
<span class="line"><span>is equal to ( I−ΔiL); since the diode is a single-quadrant switch, operation in the continuous</span></span>
<span class="line"><span>conduction mode requires that this current remain positive. As shown in Chap. 2, the inductor</span></span>
<span class="line"><span>current dc component I is equal to the load current:</span></span>
<span class="line"><span>I= V</span></span>
<span class="line"><span>R (5.1)</span></span>
<span class="line"><span>(a) iL(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>0D T s Ts</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices: Q1 D1 Q1</span></span>
<span class="line"><span>(b) iD(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>Fig. 5.2 Buck converter waveforms in the continuous conduction mode: ( a) inductor current iL(t),</span></span>
<span class="line"><span>(b) diode current iD(t)</span></span>
<span class="line"><span>since no dc current ﬂows through capacitorC. It can be seen thatI depends on the load resistance</span></span>
<span class="line"><span>R. The switching ripple peak amplitude is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary 137</span></span>
<span class="line"><span>(a) iL(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices: Q1 D1 Q1</span></span>
<span class="line"><span>iL</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>(b) iD(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>I iL</span></span>
<span class="line"><span>Fig. 5.3 Buck converter waveforms at the boundary between the continuous and discontinuous conduc-</span></span>
<span class="line"><span>tion modes: (a) inductor current iL(t), (b) diode current iD(t)</span></span>
<span class="line"><span>ΔiL= (Vg−V)</span></span>
<span class="line"><span>2L DTs= VgDD′Ts</span></span>
<span class="line"><span>2L (5.2)</span></span>
<span class="line"><span>The ripple magnitude depends on the applied voltage (Vg−V), on the inductance L, and on the</span></span>
<span class="line"><span>transistor conduction time DTs. But it does not depend on the load resistance R. The inductor</span></span>
<span class="line"><span>current ripple magnitude varies with the applied voltages rather than the applied currents.</span></span>
<span class="line"><span>Suppose now that the load resistance R is increased, so that the dc load current is decreased.</span></span>
<span class="line"><span>The dc component of inductor current I will then decrease, but the ripple magnitude ΔiL will</span></span>
<span class="line"><span>remain unchanged. If we continue to increase R, eventually the point is reached where I=ΔiL,</span></span>
<span class="line"><span>illustrated in Fig.5.3. It can be seen that the inductor currentiL(t) and the diode current iD(t)a r e</span></span>
<span class="line"><span>both zero at the end of the switching period. Yet the load current is positive and nonzero.</span></span>
<span class="line"><span>What happens if we continue to increase the load resistance R? The diode current cannot</span></span>
<span class="line"><span>be negative; therefore, the diode must become reverse-biased before the end of the switching</span></span>
<span class="line"><span>period. As illustrated in Fig. 5.4, there are now three subintervals during each switching period</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>s. During the ﬁrst subinterval of length D1Ts the transistor conducts, and the diode conducts</span></span>
<span class="line"><span>during the second subinterval of length D2Ts. At the end of the second subinterval the diode</span></span>
<span class="line"><span>current reaches zero, and for the remainder of the switching period neither the transistor nor the</span></span>
<span class="line"><span>diode conduct. The converter operates in the discontinuous conduction mode.</span></span>
<span class="line"><span>Figure 5.3 suggests a way to ﬁnd the boundary between the continuous and discontinuous</span></span>
<span class="line"><span>conduction modes. It can be seen that, for this buck converter example, the diode current is</span></span>
<span class="line"><span>positive over the entire interval DTs &lt; t&lt; Ts provided that I&gt;ΔiL. Hence, the conditions for</span></span>
<span class="line"><span>operation in the continuous and discontinuous conduction modes are</span></span>
<span class="line"><span></span></span>
<span class="line"><span>138 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a) iL(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices: Q1 D1 Q1</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>X</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>(b) iD(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>D2Ts</span></span>
<span class="line"><span>Fig. 5.4 Buck converter waveforms in the discontinuous conduction mode: (a) inductor current iL(t), (b)</span></span>
<span class="line"><span>diode current iD(t)</span></span>
<span class="line"><span>I&gt;ΔiL for CCM (5.3)</span></span>
<span class="line"><span>I&lt;ΔiL for DCM</span></span>
<span class="line"><span>where I andΔiL are found assuming that the converter operates in the continuous conduction</span></span>
<span class="line"><span>mode. Insertion of Eqs. (5.1) and (5.2) into Eq. (5.3) yields the following condition for operation</span></span>
<span class="line"><span>in the discontinuous conduction mode:</span></span>
<span class="line"><span>DVg</span></span>
<span class="line"><span>R &lt; DD′TsVg</span></span>
<span class="line"><span>2L (5.4)</span></span>
<span class="line"><span>Simpliﬁcation leads to</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>RTs</span></span>
<span class="line"><span>&lt; D′ (5.5)</span></span>
<span class="line"><span>This can also be expressed</span></span>
<span class="line"><span>K&lt; Kcrit(D) for DCM (5.6)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>K= 2L</span></span>
<span class="line"><span>RTs</span></span>
<span class="line"><span>and Kcrit(D)= D′</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.1 Origin of the Discontinuous Conduction Mode, and Mode Boundary 139</span></span>
<span class="line"><span>Fig. 5.5 Buck converter Kcrit(D)v s . D.T h e</span></span>
<span class="line"><span>converter operates in CCM when K &gt; Kcrit,</span></span>
<span class="line"><span>and in DCM when K&lt; Kcrit Kcrit(D) =1 D</span></span>
<span class="line"><span>0 D1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>K = 2L/RTs</span></span>
<span class="line"><span>K &lt; Kcrit:</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>K &gt; Kcrit:</span></span>
<span class="line"><span>CCM</span></span>
<span class="line"><span>The dimensionless parameter K is a measure of the tendency of a converter to operate in the</span></span>
<span class="line"><span>discontinuous conduction mode. Large values of K lead to continuous mode operation, while</span></span>
<span class="line"><span>small values lead to the discontinuous mode for some values of duty cycle. The critical value of</span></span>
<span class="line"><span>K at the boundary between modes, Kcrit(D), is a function of duty cycle, and is equal to D′ for</span></span>
<span class="line"><span>the buck converter.</span></span>
<span class="line"><span>The critical value Kcrit(D) is plotted vs. duty cycle D in Fig. 5.5. An arbitrary choice of K</span></span>
<span class="line"><span>is also illustrated. For the values shown, it can be seen that the converter operates in DCM at</span></span>
<span class="line"><span>low duty cycle, and in CCM at high duty cycle. Figure5.6 illustrates what happens with heavier</span></span>
<span class="line"><span>loading. The load resistance R is reduced in value, such that K is larger. If K is greater than one,</span></span>
<span class="line"><span>then the converter operates in the continuous conduction mode for all duty cycles.</span></span>
<span class="line"><span>It is natural to express the mode boundary in terms of the load resistance R, rather than the</span></span>
<span class="line"><span>dimensionless parameter K. Equation (5.6) can be rearranged to directly expose the dependence</span></span>
<span class="line"><span>of the mode boundary on the load resistance:</span></span>
<span class="line"><span>R&lt; Rcrit(D) for CCM (5.7)</span></span>
<span class="line"><span>R&gt; Rcrit(D)f o rD C M</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Rcrit(D)= 2L</span></span>
<span class="line"><span>D′Ts</span></span>
<span class="line"><span>So the converter enters the discontinuous conduction mode when the load resistance R exceeds</span></span>
<span class="line"><span>the critical value Rcrit. This critical value depends on the inductance, the switching period, and</span></span>
<span class="line"><span>the duty cycle. Note that, since D′ ≤1, the minimum value of Rcrit is 2 L/Ts. Therefore, if</span></span>
<span class="line"><span>R &lt; 2L/Ts, then the converter will operate in the continuous conduction mode for all duty</span></span>
<span class="line"><span>cycles.</span></span>
<span class="line"><span>Fig. 5.6 Comparison of K with Kcrit(D), for a</span></span>
<span class="line"><span>larger value of K.S i n c eK &gt; 1, the converter</span></span>
<span class="line"><span>operates in CCM for all D Kcrit(D)=1 D</span></span>
<span class="line"><span>0 D1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>K = 2L/RTs</span></span>
<span class="line"><span>K &gt; Kcrit:</span></span>
<span class="line"><span>CCM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>140 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>These results can be applied to loads that are not pure linear resistors. An e ﬀective load</span></span>
<span class="line"><span>resistance R is deﬁned as the ratio of the dc output voltage to the dc load current: R= V/I.T h i s</span></span>
<span class="line"><span>eﬀective load resistance is then used in the above equations.</span></span>
<span class="line"><span>Table 5.1 CCM-DCM mode boundaries for the buck, boost, and buck–boost converters</span></span>
<span class="line"><span>Converter Kcrit(D)m a x</span></span>
<span class="line"><span>0≤D≤1</span></span>
<span class="line"><span>(Kcrit) Rcrit(D)m i n</span></span>
<span class="line"><span>0≤D≤1</span></span>
<span class="line"><span>(Rcrit)</span></span>
<span class="line"><span>Buck (1 −D)1 2L</span></span>
<span class="line"><span>(1−D)Ts</span></span>
<span class="line"><span>2 L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Boost D(1−D)2 4</span></span>
<span class="line"><span>27</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>D(1−D)2Ts</span></span>
<span class="line"><span>27</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>Buck–boost (1 −D)2 1 2L</span></span>
<span class="line"><span>(1−D)2Ts</span></span>
<span class="line"><span>2 L</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>A similar mode boundary analysis can be performed for other converters. The boost con-</span></span>
<span class="line"><span>verter is analyzed in Sect. 5.3, while analysis of the buck–boost converter is left as a homework</span></span>
<span class="line"><span>problem. The results are listed in Table 5.1, for the three basic dc–dc converters. In each case,</span></span>
<span class="line"><span>the dimensionless parameter K is deﬁned as K= 2L/RTs, and the mode boundary is given by</span></span>
<span class="line"><span>K&gt; Kcrit(D)o r R&lt; Rcrit(D) for CCM (5.8)</span></span>
<span class="line"><span>K&lt; Kcrit(D)o r R&gt; Rcrit(D)f o rD C M</span></span>
<span class="line"><span>5.2 Analysis of the Conversion Ratio M(D, K)</span></span>
<span class="line"><span>With a few modiﬁcations, the same techniques and approximations developed in Chap.2 for the</span></span>
<span class="line"><span>steady-state analysis of the continuous conduction mode may be applied to the discontinuous</span></span>
<span class="line"><span>conduction mode.</span></span>
<span class="line"><span>(a) Inductor volt-second balance. The dc component of the voltage applied to an inductor must</span></span>
<span class="line"><span>be zero:</span></span>
<span class="line"><span>⟨vL⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>vL(t)dt= 0 (5.9)</span></span>
<span class="line"><span>(b) Capacitor charge balance. The dc component of current applied to a capacitor must be zero:</span></span>
<span class="line"><span>⟨iC⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iC(t)dt= 0 (5.10)</span></span>
<span class="line"><span>These principles must be true for any circuit that operates in steady state, regardless of the</span></span>
<span class="line"><span>operating mode.</span></span>
<span class="line"><span>(c) The linear-ripple approximation. Care must be used when employing the linear-ripple ap-</span></span>
<span class="line"><span>proximation in the discontinuous conduction mode.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.2 Analysis of the Conversion Ratio M(D, K) 141</span></span>
<span class="line"><span>(i) Output capacitor voltage ripple . Regardless of the operating mode, it is required that</span></span>
<span class="line"><span>the output voltage ripple be small. Hence, for a well-designed converter operating in</span></span>
<span class="line"><span>the discontinuous conduction mode, the peak output voltage rippleΔv should be much</span></span>
<span class="line"><span>smaller in magnitude than the output voltage dc component V. So the linear-ripple</span></span>
<span class="line"><span>approximation applies to the output voltage waveform:</span></span>
<span class="line"><span>v(t)≈V (5.11)</span></span>
<span class="line"><span>(ii) Inductor current ripple . By deﬁnition, the inductor current ripple is not small in the</span></span>
<span class="line"><span>discontinuous conduction mode. Indeed, Eq. (5.3) states that the inductor current ripple</span></span>
<span class="line"><span>ΔiL is greater in magnitude than the dc componentI. So neglecting the inductor current</span></span>
<span class="line"><span>ripple leads to inaccurate results. In other converters, several inductor currents, or a</span></span>
<span class="line"><span>capacitor voltage, may contain large switching ripple which should not be neglected.</span></span>
<span class="line"><span>The equations necessary for solution of the voltage conversion ratio can be obtained by invoking</span></span>
<span class="line"><span>volt-second balance for each inductor voltage, and charge balance for each capacitor current, in</span></span>
<span class="line"><span>the network. The switching ripple is ignored in the output capacitor voltage, but the inductor</span></span>
<span class="line"><span>current switching ripple must be accounted for in this buck converter example.</span></span>
<span class="line"><span>Let us analyze the conversion ratio M= V/V</span></span>
<span class="line"><span>g of the buck converter of Eq. (5.1). When the</span></span>
<span class="line"><span>transistor conducts, for 0&lt; t&lt; D1Ts, the converter circuit reduces to the network of Fig. 5.7a.</span></span>
<span class="line"><span>The inductor voltage and capacitor current are given by</span></span>
<span class="line"><span>vL(t)= Vg−v(t) (5.12)</span></span>
<span class="line"><span>iC(t)= iL(t)−v(t)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>By making the linear-ripple approximation, to ignore the output capacitor voltage ripple, one</span></span>
<span class="line"><span>obtains</span></span>
<span class="line"><span>vL(t)≈Vg−V (5.13)</span></span>
<span class="line"><span>iC(t)≈iL(t)−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Note that the inductor current ripple has not been ignored.</span></span>
<span class="line"><span>The diode conducts during subinterval 2, D1Ts&lt; t&lt; (D1+ D2)Ts. The circuit then reduces</span></span>
<span class="line"><span>to Fig. 5.7b. The inductor voltage and capacitor current are given by</span></span>
<span class="line"><span>vL(t)=−v(t) (5.14)</span></span>
<span class="line"><span>iC(t)= iL(t)−v(t)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>By neglecting the ripple in the output capacitor voltage, one obtains</span></span>
<span class="line"><span>vL(t)≈−V (5.15)</span></span>
<span class="line"><span>iC(t)≈iL(t)−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>The diode becomes reverse-biased at time t= (D1+ D2)Ts. The circuit is then as shown in</span></span>
<span class="line"><span>Fig. 5.7c, with both transistor and diode in the o ﬀstate. The inductor voltage and inductor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>142 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.7 Buck converter circuits for op-</span></span>
<span class="line"><span>eration in the discontinuous conduction</span></span>
<span class="line"><span>mode: (a) during subinterval 1, (b) during</span></span>
<span class="line"><span>subinterval 2, (c) during subinterval 3</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)+ vL(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)+ vL(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)+ vL(t)</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>current are both zero for the remainder of the switching period ( D1+ D2)Ts &lt; t&lt; Ts.T h e</span></span>
<span class="line"><span>network equations for the third subinterval are given by</span></span>
<span class="line"><span>vL= 0, iL= 0 (5.16)</span></span>
<span class="line"><span>iC(t)= iL(t)−v(t)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Note that the inductor current is constant and equal to zero during the third subinterval, and</span></span>
<span class="line"><span>therefore the inductor voltage must also be zero in accordance with the relationship vL(t)=</span></span>
<span class="line"><span>Ld iL(t)/dt. In practice, parasitic ringing is observed during this subinterval. This ringing occurs</span></span>
<span class="line"><span>owing to the resonant circuit formed by the inductor and the semiconductor device capacitances,</span></span>
<span class="line"><span>and typically has little inﬂuence on the converter steady-state properties. Again ignoring the</span></span>
<span class="line"><span>output capacitor voltage ripple, one obtains</span></span>
<span class="line"><span>vL(t)= 0 (5.17)</span></span>
<span class="line"><span>iC(t)=−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Equations (5.13), (5.15), and (5.17) can now be used to plot the inductor voltage waveform as</span></span>
<span class="line"><span>in Fig. 5.8. According to the principle of inductor volt-second balance, the dc component of this</span></span>
<span class="line"><span>waveform must be zero. Since the waveform is rectangular, its dc component (or average value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.2 Analysis of the Conversion Ratio M(D, K) 143</span></span>
<span class="line"><span>Fig. 5.8 Inductor voltage waveform</span></span>
<span class="line"><span>vL(t), buck converter operating in discon-</span></span>
<span class="line"><span>tinuous conduction mode</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Ts t</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>is easily evaluated:</span></span>
<span class="line"><span>⟨vL(t)⟩= D1(Vg−V)+ D2(−V)+ D3(0)= 0 (5.18)</span></span>
<span class="line"><span>Solution for the output voltage yields</span></span>
<span class="line"><span>V= Vg</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D1+ D2</span></span>
<span class="line"><span>(5.19)</span></span>
<span class="line"><span>The transistor duty cycle D (which coincides with the subinterval 1 duty cycle D1) is the con-</span></span>
<span class="line"><span>trol input to the converter, and can be considered known. But the subinterval 2 duty cycle D2</span></span>
<span class="line"><span>is unknown, and hence another equation is needed to eliminate D2 and solve for the output</span></span>
<span class="line"><span>voltage V.</span></span>
<span class="line"><span>The second equation is obtained by use of capacitor charge balance. The connection of the</span></span>
<span class="line"><span>capacitor to its adjacent components is detailed in Fig.5.9. The node equation of this network is</span></span>
<span class="line"><span>iL(t)= iC(t)+ v(t)</span></span>
<span class="line"><span>R (5.20)</span></span>
<span class="line"><span>By capacitor charge balance, the dc component of capacitor current must be zero:</span></span>
<span class="line"><span>⟨iC⟩= 0 (5.21)</span></span>
<span class="line"><span>Therefore, the dc load current must be supplied entirely by the other elements connected to the</span></span>
<span class="line"><span>node. In particular, for the case of the buck converter, the dc component of inductor current</span></span>
<span class="line"><span>must be equal to the dc load current:</span></span>
<span class="line"><span>⟨iL⟩= V</span></span>
<span class="line"><span>R (5.22)</span></span>
<span class="line"><span>So we need to compute the dc component of the inductor current.</span></span>
<span class="line"><span>Since the inductor current ripple is not small, determination of the inductor current dc com-</span></span>
<span class="line"><span>ponent requires that we examine the current waveform in detail. The inductor current waveform</span></span>
<span class="line"><span>is sketched in Fig. 5.10. The current begins the switching period at zero, and increases during</span></span>
<span class="line"><span>Fig. 5.9 Connection of the output capacitor to adja-</span></span>
<span class="line"><span>cent components in the buck converter</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>iL(t) v(t)/R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>144 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.10 Inductor current</span></span>
<span class="line"><span>waveform iL(t), buck converter</span></span>
<span class="line"><span>operating in discontinuous</span></span>
<span class="line"><span>conduction mode</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>t0D T s Ts</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>iL = I</span></span>
<span class="line"><span>ipkVg V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>the ﬁrst subinterval with a constant slope, given by the applied voltage divided by the induc-</span></span>
<span class="line"><span>tance. The peak inductor current ipk is equal to the constant slope, multiplied by the length of</span></span>
<span class="line"><span>the ﬁrst subinterval:</span></span>
<span class="line"><span>iL(D1Ts)= ipk= Vg−V</span></span>
<span class="line"><span>L D1Ts (5.23)</span></span>
<span class="line"><span>The dc component of the inductor current is again the average value:</span></span>
<span class="line"><span>⟨iL⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iL(t)dt (5.24)</span></span>
<span class="line"><span>The integral, or area under the iL(t) curve, is the area of the triangle having height ipk and</span></span>
<span class="line"><span>base dimension (D1+ D2)Ts. Use of the triangle area formula yields</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iL(t)dt= 1</span></span>
<span class="line"><span>2ipk(D1+ D2)Ts (5.25)</span></span>
<span class="line"><span>Substitution of Eqs. (5.23) and (5.25) into Eq. (5.24) leads to</span></span>
<span class="line"><span>⟨iL⟩= (Vg−V)</span></span>
<span class="line"><span>⎦D1Ts</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(D1+ D2) (5.26)</span></span>
<span class="line"><span>Finally, by equating this result to the dc load current, according to Eq. (5.22), we obtain</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>R= D1Ts</span></span>
<span class="line"><span>2L (D1+ D2)(Vg−V) (5.27)</span></span>
<span class="line"><span>Thus, we have two unknowns, V and D2, and we have two equations. The ﬁrst equation, Eq.</span></span>
<span class="line"><span>(5.19), was obtained by inductor volt-second balance, while the second equation, Eq. ( 5.27),</span></span>
<span class="line"><span>was obtained using capacitor charge balance. Elimination of D2 from the two equations, and</span></span>
<span class="line"><span>solution for the voltage conversion ratio M(D1, K)= V/Vg, yields</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= 2</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4K</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>(5.28)</span></span>
<span class="line"><span>where K= 2L/RTs</span></span>
<span class="line"><span>valid for K&lt; Kcrit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.3 Boost Converter Example 145</span></span>
<span class="line"><span>Fig. 5.11 V oltage conversion</span></span>
<span class="line"><span>ratio M(D, K), buck converter</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>0.8</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>M(D,K)</span></span>
<span class="line"><span>0.0 0.2 0.4 0.6 0.8 1.0</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>K = 0.01</span></span>
<span class="line"><span>K = 0.1</span></span>
<span class="line"><span>K = 0.5</span></span>
<span class="line"><span>K 1</span></span>
<span class="line"><span>This is the solution of the buck converter operating in discontinuous conduction mode.</span></span>
<span class="line"><span>The complete buck converter characteristics, including both continuous and discontinuous</span></span>
<span class="line"><span>conduction modes, are therefore</span></span>
<span class="line"><span>M=</span></span>
<span class="line"><span>⎧⎪⎪</span></span>
<span class="line"><span>⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎪⎪⎩</span></span>
<span class="line"><span>D for K&gt; K</span></span>
<span class="line"><span>crit</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4K</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>for K&lt; Kcrit (5.29)</span></span>
<span class="line"><span>where the transistor duty cycle D is identical to the subinterval 1 duty cycle D1 of the above</span></span>
<span class="line"><span>derivation. These characteristics are plotted in Fig. 5.11, for several values of K. It can be seen</span></span>
<span class="line"><span>that the eﬀect of the discontinuous conduction mode is to cause the output voltage to increase.</span></span>
<span class="line"><span>As K tends to zero (the unloaded case), M tends to unity for all nonzero D. The characteristics</span></span>
<span class="line"><span>are continuous, and Eq. (5.28) intersects the CCM characteristic M= D at the mode boundary.</span></span>
<span class="line"><span>5.3 Boost Converter Example</span></span>
<span class="line"><span>As a second example, consider the boost converter of Fig. 5.12. Let us determine the bound-</span></span>
<span class="line"><span>ary between modes, and solve for the conversion ratio in the discontinuous conduction mode.</span></span>
<span class="line"><span>Behavior of the boost converter operating in the continuous conduction mode was analyzed pre-</span></span>
<span class="line"><span>viously, in Sect. 2.3, and expressions for the inductor current dc component I and ripple peak</span></span>
<span class="line"><span>magnitudeΔiL were found.</span></span>
<span class="line"><span>When the diode conducts, its current is identical to the inductor current iL(t). As can be</span></span>
<span class="line"><span>seen from Fig. 2.18, the minimum value of the inductor current during the diode conduction</span></span>
<span class="line"><span>subinterval DTs &lt; t&lt; Ts is (I−ΔiL). If this minimum current is positive, then the diode is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>146 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.12 Boost converter example</span></span>
<span class="line"><span>+ Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>+ vL(t)</span></span>
<span class="line"><span>iD(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>forward-biased for the entire subinterval DTs&lt; t&lt; Ts, and the converter operates in the contin-</span></span>
<span class="line"><span>uous conduction mode. So the conditions for operation of the boost converter in the continuous</span></span>
<span class="line"><span>and discontinuous conduction modes are</span></span>
<span class="line"><span>I&gt;ΔiL for CCM (5.30)</span></span>
<span class="line"><span>I&lt;ΔiL for DCM</span></span>
<span class="line"><span>which is identical to the results for the buck converter. Substitution of the CCM solutions for I</span></span>
<span class="line"><span>andΔiL,E q s .(2.39) and (2.43), yields</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>D′2R&gt; DTsVg</span></span>
<span class="line"><span>2L for CCM (5.31)</span></span>
<span class="line"><span>This equation can be rearranged to obtain</span></span>
<span class="line"><span>2L</span></span>
<span class="line"><span>RTs</span></span>
<span class="line"><span>&gt; DD′2 for CCM (5.32)</span></span>
<span class="line"><span>which is in the standard form</span></span>
<span class="line"><span>K&gt; Kcrit(D) for CCM (5.33)</span></span>
<span class="line"><span>K&lt; Kcrit(D)f o rD C M</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>K= 2L</span></span>
<span class="line"><span>RTs</span></span>
<span class="line"><span>and Kcrit(D)= DD′2</span></span>
<span class="line"><span>The conditions for operation in the continuous or discontinuous conduction modes are of similar</span></span>
<span class="line"><span>form to those for the buck converter; however, the critical value Kcrit(D)i sad iﬀerent function</span></span>
<span class="line"><span>of the duty cycle D. The dependence of Kcrit(D) on the duty cycle D is plotted in Fig. 5.13.</span></span>
<span class="line"><span>Kcrit(D) is zero at D= 0 and at D= 1, and has a maximum value of 4/27 at D= 1/3. Hence, if</span></span>
<span class="line"><span>K is greater than 4/27, then the converter operates in the continuous conduction mode for all D.</span></span>
<span class="line"><span>Figure 5.14 illustrates what happens when K is less than 4/27. The converter then operates in</span></span>
<span class="line"><span>the discontinuous conduction mode for some intermediate range of values of D near D= 1/3.</span></span>
<span class="line"><span>But the converter operates in the continuous conduction mode near D= 0 and D= 1. Unlike</span></span>
<span class="line"><span>the buck converter, the boost converter must operate in the continuous conduction mode near</span></span>
<span class="line"><span>D= 0 because the ripple magnitude approaches zero while the dc component I does not.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.3 Boost Converter Example 147</span></span>
<span class="line"><span>Fig. 5.13 Boost converter</span></span>
<span class="line"><span>Kcrit(D)v s .D</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.05</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>0.15</span></span>
<span class="line"><span>Kcrit(D)</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Kcrit</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>3 = 4</span></span>
<span class="line"><span>27</span></span>
<span class="line"><span>Fig. 5.14 Comparison of K</span></span>
<span class="line"><span>with Kcrit(D)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.05</span></span>
<span class="line"><span>0.1</span></span>
<span class="line"><span>0.15</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>crit</span></span>
<span class="line"><span>(D)</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>K &lt; Kcrit</span></span>
<span class="line"><span>DCM CCM</span></span>
<span class="line"><span>K &gt; Kcrit</span></span>
<span class="line"><span>CCM</span></span>
<span class="line"><span>Next, let us analyze the conversion ratio M= V/Vg of the boost converter. When the tran-</span></span>
<span class="line"><span>sistor conducts, for the subinterval 0&lt; t&lt; D1Ts, the converter circuit reduces to the circuit of</span></span>
<span class="line"><span>Fig. 5.15a. The inductor voltage and capacitor current are given by</span></span>
<span class="line"><span>vL(t)= Vg (5.34)</span></span>
<span class="line"><span>iC(t)=−v(t)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>148 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.15 Boost converter circuits</span></span>
<span class="line"><span>for operation in the discontinuous</span></span>
<span class="line"><span>conduction mode: ( a) during</span></span>
<span class="line"><span>subinterval 1, 0 &lt; t&lt; D1Ts,</span></span>
<span class="line"><span>(b) during subinterval 2,</span></span>
<span class="line"><span>D1Ts&lt; t&lt; (D1+ D2)Ts,( c) during</span></span>
<span class="line"><span>subinterval 3, (D1+ D2)Ts&lt; t&lt; Ts</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>+ vL(t)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>+ vL(t)</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>+ vL(t)</span></span>
<span class="line"><span>Use of the linear-ripple approximation, to ignore the output capacitor voltage ripple, leads to</span></span>
<span class="line"><span>vL(t)≈Vg (5.35)</span></span>
<span class="line"><span>iC(t)≈−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>During the second subinterval D1Ts &lt; t&lt; (D1+ D2)Ts, the diode conducts. The circuit then</span></span>
<span class="line"><span>reduces to Fig. 5.15b. The inductor voltage and capacitor current are given by</span></span>
<span class="line"><span>vL(t)= Vg−v(t) (5.36)</span></span>
<span class="line"><span>iC(t)= i(t)−v(t)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Neglect of the output capacitor voltage ripple yields</span></span>
<span class="line"><span>vL(t)≈Vg−V (5.37)</span></span>
<span class="line"><span>iC(t)≈i(t)−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>The inductor current ripple has not been neglected.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.3 Boost Converter Example 149</span></span>
<span class="line"><span>During the third subinterval, (D1+ D2)Ts &lt; t&lt; Ts, both transistor and diode are in the oﬀ</span></span>
<span class="line"><span>state, and Fig. 5.15c is obtained. The network equations are</span></span>
<span class="line"><span>vL= 0, i= 0</span></span>
<span class="line"><span>iC(t)=−v(t)</span></span>
<span class="line"><span>R (5.38)</span></span>
<span class="line"><span>Use of the small-ripple approximation yields</span></span>
<span class="line"><span>vL(t)= 0 (5.39)</span></span>
<span class="line"><span>iC(t)=−V</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Equations (5.35), (5.37), and (5.39) are now used to sketch the inductor voltage waveform as</span></span>
<span class="line"><span>in Fig. 5.16. By volt-second balance, this waveform must have zero dc component when the</span></span>
<span class="line"><span>converter operates in steady state. By equating the average value of thisvL(t) waveform to zero,</span></span>
<span class="line"><span>one obtains</span></span>
<span class="line"><span>D1Vg+ D2(Vg−V)+ D3(0)= 0 (5.40)</span></span>
<span class="line"><span>Solution for the output voltage V yields</span></span>
<span class="line"><span>V= D1+ D2</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>Vg (5.41)</span></span>
<span class="line"><span>The diode duty cycleD2 is again an unknown, and so a second equation is needed for elimination</span></span>
<span class="line"><span>of D2 before the output voltage V can be found.</span></span>
<span class="line"><span>We can again use capacitor charge balance to obtain the second equation. The connection</span></span>
<span class="line"><span>of the output capacitor to its adjacent components is detailed in Fig. 5.17. Unlike the buck</span></span>
<span class="line"><span>converter, the diode in the boost converter is connected to the output node. The node equation</span></span>
<span class="line"><span>of Fig. 5.17 is</span></span>
<span class="line"><span>iD(t)= iC(t)+ v(t)</span></span>
<span class="line"><span>R (5.42)</span></span>
<span class="line"><span>Fig. 5.16 Inductor voltage waveform</span></span>
<span class="line"><span>vL(t), boost converter operating in discon-</span></span>
<span class="line"><span>tinuous conduction mode</span></span>
<span class="line"><span>vL(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Ts t</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Fig. 5.17 Connection of the output capacitor to ad-</span></span>
<span class="line"><span>jacent components in the boost converter</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>D1 iD(t)</span></span>
<span class="line"><span>iC(t)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>150 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>where iD(t) is the diode current. By capacitor charge balance, the capacitor current iC(t)m u s t</span></span>
<span class="line"><span>have zero dc component in steady state. Therefore, the diode current dc component ⟨iD⟩ must</span></span>
<span class="line"><span>be equal to the dc component of the load current:</span></span>
<span class="line"><span>⟨iD⟩= V</span></span>
<span class="line"><span>R (5.43)</span></span>
<span class="line"><span>So we need to sketch the diode current waveform, and ﬁnd its dc component.</span></span>
<span class="line"><span>The waveforms of the inductor currenti(t) and diode current iD(t) are illustrated in Fig.5.18.</span></span>
<span class="line"><span>The inductor current begins at zero, and rises to a peak value ipk during the ﬁrst subinterval.</span></span>
<span class="line"><span>This peak value ipk is equal to the slope Vg/L, multiplied by the length of the ﬁrst subinterval,</span></span>
<span class="line"><span>D1Ts:</span></span>
<span class="line"><span>ipk= Vg</span></span>
<span class="line"><span>L D1Ts (5.44)</span></span>
<span class="line"><span>The diode conducts during the second subinterval, and the inductor current then decreases to</span></span>
<span class="line"><span>zero, where it remains during the third subinterval. The diode current iD(t) is identical to the</span></span>
<span class="line"><span>inductor current i(t) during the second subinterval. During the ﬁrst and third subintervals, the</span></span>
<span class="line"><span>diode is reverse-biased and hence iD(t) is zero.</span></span>
<span class="line"><span>The dc component of the diode current,⟨iD⟩,i s</span></span>
<span class="line"><span>⟨iD⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iD(t)dt (5.45)</span></span>
<span class="line"><span>(a) i(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>ipkVg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Vg V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>(b) iD(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>iD </span></span>
<span class="line"><span>Vg V</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Fig. 5.18 Boost converter waveforms in the discontinuous conduction mode: (a) inductor current i(t), (b)</span></span>
<span class="line"><span>diode current iD(t)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.3 Boost Converter Example 151</span></span>
<span class="line"><span>The integral is the area under the iD(t) waveform. As illustrated in Fig. 5.18b, this area is the</span></span>
<span class="line"><span>area of the triangle having peak value ipk and base dimension D2Ts:</span></span>
<span class="line"><span>∫ Ts</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iD(t)dt= 1</span></span>
<span class="line"><span>2 iρkD2Ts (5.46)</span></span>
<span class="line"><span>Substitution of Eqs. (5.44) and (5.46) into Eq. (5.45) leads to the following expression for the</span></span>
<span class="line"><span>dc component of the diode current:</span></span>
<span class="line"><span>⟨iD⟩= 1</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>2 ipk D2Ts</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= VgD1D2Ts</span></span>
<span class="line"><span>2L (5.47)</span></span>
<span class="line"><span>By equating this expression to the dc load current as in Eq. (5.43), one obtains the ﬁnal result</span></span>
<span class="line"><span>VgD1D2Ts</span></span>
<span class="line"><span>2L = V</span></span>
<span class="line"><span>R (5.48)</span></span>
<span class="line"><span>So now we have two unknowns, V and D2. We have two equations: Eq. ( 5.41) obtained via</span></span>
<span class="line"><span>inductor volt-second balance, and Eq. ( 5.48) obtained using capacitor charge balance. Let us</span></span>
<span class="line"><span>now eliminate D2 from this system of equations, and solve for the output voltageV. Solution of</span></span>
<span class="line"><span>Eq. (5.41)f o rD2 yields</span></span>
<span class="line"><span>D2= D1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>V−Vg</span></span>
<span class="line"><span>(5.49)</span></span>
<span class="line"><span>By inserting this result into Eq. ( 5.48), and rearranging terms, one obtains the following</span></span>
<span class="line"><span>quadratic equation:</span></span>
<span class="line"><span>V2−VVg−</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>g D2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>K = 0 (5.50)</span></span>
<span class="line"><span>Use of the quadratic formula yields</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>1±</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4D2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>2 (5.51)</span></span>
<span class="line"><span>The quadratic equation has two roots: one of the roots of Eq. ( 5.51) is positive, while the other</span></span>
<span class="line"><span>is negative. We already know that the output voltage of the boost converter should be positive,</span></span>
<span class="line"><span>and indeed, from Eq. (5.41), it can be seen that V/Vg must be positive since the duty cycles D1</span></span>
<span class="line"><span>and D2 are positive. So we should select the positive root:</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= M(D1, K)=</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4D2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>2 (5.52)</span></span>
<span class="line"><span>where K= 2L/RTs</span></span>
<span class="line"><span>valid for K&lt; Kcrit(D)</span></span>
<span class="line"><span>This is the solution of the boost converter operating in the discontinuous conduction mode.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>152 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>Fig. 5.19 V oltage conversion</span></span>
<span class="line"><span>ratio M(D, K) of the boost con-</span></span>
<span class="line"><span>verter, including both continu-</span></span>
<span class="line"><span>ous and discontinuous conduc-</span></span>
<span class="line"><span>tion modes</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>M(D,K)</span></span>
<span class="line"><span>0 0.25 0.5 0.75 1</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>K </span></span>
<span class="line"><span>= 0.01</span></span>
<span class="line"><span>K = 0.05</span></span>
<span class="line"><span>K = 0.1</span></span>
<span class="line"><span>K 4/27</span></span>
<span class="line"><span>The complete boost converter characteristics, including both continuous and discontinuous</span></span>
<span class="line"><span>conduction modes, are</span></span>
<span class="line"><span>M=</span></span>
<span class="line"><span>⎧⎪⎪⎪⎪⎪⎪⎪⎪⎨⎪⎪⎪⎪⎪⎪⎪⎪⎩</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1−D for K&gt; Kcrit</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4D2</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>2 for K&lt; Kcrit</span></span>
<span class="line"><span>(5.53)</span></span>
<span class="line"><span>These characteristics are plotted in Fig. 5.19, for several values of K. As in the buck converter,</span></span>
<span class="line"><span>the eﬀect of the discontinuous conduction mode is to cause the output voltage to increase. The</span></span>
<span class="line"><span>DCM portions of the characteristics are nearly linear, and can be approximated as</span></span>
<span class="line"><span>M≈1</span></span>
<span class="line"><span>2+ D√</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>(5.54)</span></span>
<span class="line"><span>5.4 Summary of Results and Key Points</span></span>
<span class="line"><span>The characteristics of the basic buck, boost, and buck–boost are summarized in Table 5.2.E x -</span></span>
<span class="line"><span>pressions for Kcrit(D), as well as for the solutions of the dc conversion ratios in CCM and DCM,</span></span>
<span class="line"><span>and for the DCM diode conduction duty cycle D2, are given.</span></span>
<span class="line"><span>The dc conversion ratios of the DCM buck, boost, and buck–boost converters are compared</span></span>
<span class="line"><span>in Fig. 5.20. The buck–boost characteristic is a line with slope 1 /</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>K. The characteristics of</span></span>
<span class="line"><span>the buck and the boost converters are both asymptotic to this line, as well as to the line M=</span></span>
<span class="line"><span>1. Hence, when operated deeply into the discontinuous conduction mode, the boost converter</span></span>
<span class="line"><span>characteristic becomes nearly linear with slope 1/</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>K, especially at high duty cycle. Likewise,</span></span>
<span class="line"><span>the buck converter characteristic becomes nearly linear with the same slope, when operated</span></span>
<span class="line"><span>deeply into discontinuous conduction mode at low duty cycle.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.4 Summary of Results and Key Points 153</span></span>
<span class="line"><span>Table 5.2 Summary of CCM-DCM characteristics for the buck, boost, and buck–boost converters</span></span>
<span class="line"><span>Converter Kcrit(D)D C M M(D, K)D C M D2(D, K) CCM M(D)</span></span>
<span class="line"><span>Buck (1 −D) 2</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4K/D2</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>D M(D, K) D</span></span>
<span class="line"><span>Boost D(1−D)2 1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4D2/K</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>D M(D, K) 1</span></span>
<span class="line"><span>1−D</span></span>
<span class="line"><span>Buck–boost (1 −D)2 −D√</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>K −D</span></span>
<span class="line"><span>1−D</span></span>
<span class="line"><span>with K= 2L/RTs. DCM occurs for K&lt; Kcrit.</span></span>
<span class="line"><span>Fig. 5.20 Comparison of the dc</span></span>
<span class="line"><span>conversion ratios of the buck–boost,</span></span>
<span class="line"><span>buck, and boost converters oper-</span></span>
<span class="line"><span>ated in the discontinuous conduction</span></span>
<span class="line"><span>mode</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0 0.2 0.4 0.6 0.8 1</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>Boost</span></span>
<span class="line"><span>Buck</span></span>
<span class="line"><span>Buck-boost</span></span>
<span class="line"><span> (</span></span>
<span class="line"><span>DCM</span></span>
<span class="line"><span>M(D,K)</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>K</span></span>
<span class="line"><span>The following are the key points of this chapter:</span></span>
<span class="line"><span>1. The discontinuous conduction mode occurs in converters containing current- or voltage-</span></span>
<span class="line"><span>unidirectional switches, when the inductor current or capacitor voltage ripple is large</span></span>
<span class="line"><span>enough to cause the switch current or voltage to reverse polarity.</span></span>
<span class="line"><span>2. Conditions for operation in the discontinuous conduction mode can be found by determin-</span></span>
<span class="line"><span>ing when the inductor current or capacitor voltage ripples and dc components cause the</span></span>
<span class="line"><span>switch on state current or oﬀstate voltage to reverse polarity.</span></span>
<span class="line"><span>3. The dc conversion ratio M of converters operating in the discontinuous conduction mode</span></span>
<span class="line"><span>can be found by application of the principles of inductor volt-second and capacitor charge</span></span>
<span class="line"><span>balance.</span></span>
<span class="line"><span>4. Extra care is required when applying the small-ripple approximation. Some waveforms,</span></span>
<span class="line"><span>such as the output voltage, should have small ripple which can be neglected. Other wave-</span></span>
<span class="line"><span>forms, such as one or more inductor currents, may have large ripple that cannot be ignored.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>154 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>5. The characteristics of a converter changes signiﬁcantly when the converter enters DCM.</span></span>
<span class="line"><span>The output voltage becomes load-dependent, resulting in an increase in the converter output</span></span>
<span class="line"><span>impedance.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>5.1 The elements of the buck–boost converter of Fig.5.21 are ideal: all losses may be ignored.</span></span>
<span class="line"><span>Your results for parts (a) and (b) should agree with Table5.2.</span></span>
<span class="line"><span>Fig. 5.21 Buck–boost converter of</span></span>
<span class="line"><span>Problems 5.1, 5.2,a n d5.16 + LC R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VVg</span></span>
<span class="line"><span>Q1 D1</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>(a) Show that the converter operates in discontinuous conduction mode when K&lt; Kcrit,</span></span>
<span class="line"><span>and derive expressions for K and Kcrit.</span></span>
<span class="line"><span>(b) Derive an expression for the dc conversion ratio V/Vg of the buck–boost converter</span></span>
<span class="line"><span>operating in discontinuous conduction mode.</span></span>
<span class="line"><span>(c) For K= 0.1, plot V/Vg over the entire range 0≤D≤1.</span></span>
<span class="line"><span>(d) Sketch the inductor voltage and current waveforms for K= 0.1 and D= 0.3. Label</span></span>
<span class="line"><span>salient features.</span></span>
<span class="line"><span>(e) What happens to V at no load (R→∞)? Explain why, physically.</span></span>
<span class="line"><span>5.2 For this problem, the buck–boost converter of Fig. 5.21 employs a diode having forward</span></span>
<span class="line"><span>voltage drop VD. All other elements should be modeled as ideal. Express your results in</span></span>
<span class="line"><span>terms of the transistor duty cycle D, the input voltage Vg, the diode forward voltage drop</span></span>
<span class="line"><span>VD, and the dimensionless parameter K= 2L/RTs where Ts is the switching period.</span></span>
<span class="line"><span>(a) Derive an expression for the conditions under which this converter operates in the</span></span>
<span class="line"><span>discontinuous conduction mode. Express your result in the form K&lt; Kcrit, and give</span></span>
<span class="line"><span>an expression for Kcrit.</span></span>
<span class="line"><span>(b) Derive an equation for the steady-state output voltage V. Manipulate your equation</span></span>
<span class="line"><span>into the form</span></span>
<span class="line"><span>V= f</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>D, K, Vg, VD</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>5.3 A certain buck converter contains a synchronous rectiﬁer, as described in Sect. 4.1.5.</span></span>
<span class="line"><span>(a) Does this converter operate in the discontinuous conduction mode at light load? Ex-</span></span>
<span class="line"><span>plain.</span></span>
<span class="line"><span>(b) The load resistance is disconnected ( R→∞), and the converter is operated with duty</span></span>
<span class="line"><span>cycle 0.5. Sketch the inductor current waveform.</span></span></code></pre></div>`,10)])])}const v=s(i,[["render",l]]);export{h as __pageData,v as default};
