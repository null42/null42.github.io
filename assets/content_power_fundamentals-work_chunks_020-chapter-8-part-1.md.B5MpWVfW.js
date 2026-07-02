import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const f=JSON.parse('{"title":"第8章part 1 - 8 Converter Transfer Functions","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第8章part 1 - 8 Converter Transfer Functions","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 288-307 > Chunk ID: `chapter-8-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/020-chapter-8-part-1.md","filePath":"content/power/fundamentals-work/chunks/020-chapter-8-part-1.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/020-chapter-8-part-1.md"};function i(c,n,t,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第8章part-1-8-converter-transfer-functions" tabindex="-1">第8章part 1 - 8 Converter Transfer Functions <a class="header-anchor" href="#第8章part-1-8-converter-transfer-functions" aria-label="Permalink to &quot;第8章part 1 - 8 Converter Transfer Functions&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 288-307<br> Chunk ID: <code>chapter-8-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>8</span></span>
<span class="line"><span>Converter Transfer Functions</span></span>
<span class="line"><span>The engineering design process is comprised of several major steps:</span></span>
<span class="line"><span>1. Speciﬁcations and other design goals are deﬁned.</span></span>
<span class="line"><span>2. A circuit is proposed . This is a creative process that draws on the physical insight and</span></span>
<span class="line"><span>experience of the engineer.</span></span>
<span class="line"><span>3. The circuit is modeled . The converter power stage is modeled as described in Chap. 7.</span></span>
<span class="line"><span>Components and other portions of the system are modeled as appropriate, often with vendor-</span></span>
<span class="line"><span>supplied data.</span></span>
<span class="line"><span>4. Design-oriented analysis of the circuit is performed. This involves development of equa-</span></span>
<span class="line"><span>tions that allow element values to be chosen such that speciﬁcations and design goals are</span></span>
<span class="line"><span>met. In addition, it may be necessary for the engineer to gain additional understanding and</span></span>
<span class="line"><span>physical insight into the circuit behavior, so that the design can be improved by adding</span></span>
<span class="line"><span>elements to the circuit or by changing circuit connections.</span></span>
<span class="line"><span>5. Model veriﬁcation. Predictions of the model are compared to a laboratory prototype, under</span></span>
<span class="line"><span>nominal operating conditions. The model is reﬁned as necessary, so that the model predic-</span></span>
<span class="line"><span>tions agree with laboratory measurements.</span></span>
<span class="line"><span>6. Worst-case analysis (or other reliability and production yield analysis) of the circuit is per-</span></span>
<span class="line"><span>formed. This involves quantitative evaluation of the model performance, to judge whether</span></span>
<span class="line"><span>speciﬁcations are met under all conditions. Computer simulation is well suited to this task.</span></span>
<span class="line"><span>7. Iteration. The above steps are repeated to improve the design until the worst-case behavior</span></span>
<span class="line"><span>meets speciﬁcations, or until the reliability and production yield are acceptably high.</span></span>
<span class="line"><span>This chapter covers techniques of design-oriented analysis, measurement of experimental trans-</span></span>
<span class="line"><span>fer functions, and computer simulation, as needed in steps 4, 5, and 6.</span></span>
<span class="line"><span>Sections 8.1 to 8.3 discuss techniques for analysis and construction of the Bode plots of the</span></span>
<span class="line"><span>converter transfer functions, input impedance, and output impedance predicted by the equiva-</span></span>
<span class="line"><span>lent circuit models of Chap. 7. For example, the small-signal equivalent circuit model of the</span></span>
<span class="line"><span>buck–boost converter is illustrated in Fig. 7.18c. This model is reproduced in Fig. 8.1, with the</span></span>
<span class="line"><span>important inputs and terminal impedances identiﬁed. The line-to-output transfer functionGvg(s)</span></span>
<span class="line"><span>is found by setting duty cycle variations ˆd(s) to zero, and then solving for the transfer function</span></span>
<span class="line"><span>from ˆvg(s)t oˆv(s):</span></span>
<span class="line"><span>Gvg(s)= ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐⏐⏐ ˆd(s)= 0</span></span>
<span class="line"><span>(8.1)</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_8</span></span>
<span class="line"><span>277</span></span>
<span class="line"><span></span></span>
<span class="line"><span>278 8 Converter Transfer Functions</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>1 : D D&#39; : 1</span></span>
<span class="line"><span>vg(s) Id(s) I (s)</span></span>
<span class="line"><span>(s) +</span></span>
<span class="line"><span>(s)</span></span>
<span class="line"><span>(Vg V) d(s)</span></span>
<span class="line"><span>Zout(s)Zin(s)</span></span>
<span class="line"><span>(s) Control input</span></span>
<span class="line"><span>Line</span></span>
<span class="line"><span>input</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>d</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>ˆ ˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>Fig. 8.1 Small-signal equivalent circuit model of the buck–boost converter, as derived in Chap.7</span></span>
<span class="line"><span>This transfer function describes how variations or disturbances in the applied input voltagevg(t)</span></span>
<span class="line"><span>lead to disturbances in the output voltage v(t). It is important in design of an output voltage</span></span>
<span class="line"><span>regulator. For example, in an oﬀ-line power supply, the converter input voltage vg(t) contains</span></span>
<span class="line"><span>undesired even harmonics of the ac power line voltage. The transfer function Gvg(s)i su s e dt o</span></span>
<span class="line"><span>determine the eﬀect of these harmonics on the converter output voltage v(t).</span></span>
<span class="line"><span>The control-to-output transfer functionGvd(s) is found by setting the input voltage variations</span></span>
<span class="line"><span>ˆvg(s) to zero, and then solving the equivalent circuit model for ˆv(s) as a function of ˆd(s):</span></span>
<span class="line"><span>Gvd(s)= ˆv(s)</span></span>
<span class="line"><span>ˆd(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvg(s)= 0</span></span>
<span class="line"><span>(8.2)</span></span>
<span class="line"><span>This transfer function describes how control input variations ˆd(s) inﬂuence the output voltage</span></span>
<span class="line"><span>ˆv(s). In an output voltage regulator system, Gvd(s) is a key component of the loop gain and has</span></span>
<span class="line"><span>a signiﬁcant eﬀect on regulator performance.</span></span>
<span class="line"><span>The output impedance Zout(s) is found under the conditions that ˆvg(s) and ˆd(s) variations are</span></span>
<span class="line"><span>set to zero. Zout(s) describes how variations in the load current aﬀect the output voltage. This</span></span>
<span class="line"><span>quantity is also important in voltage regulator design. It may be appropriate to deﬁne Zout(s)</span></span>
<span class="line"><span>either including or not including the load resistance R.</span></span>
<span class="line"><span>The converter input impedanceZin(s) plays a signiﬁcant role when an electromagnetic inter-</span></span>
<span class="line"><span>ference (EMI) ﬁlter is added at the converter power input. The relative magnitudes of Zin and</span></span>
<span class="line"><span>the EMI ﬁlter output impedance inﬂuence whether the EMI ﬁlter disrupts the transfer function</span></span>
<span class="line"><span>Gvd(s). Design of input EMI ﬁlters is the subject of Chap. 17.</span></span>
<span class="line"><span>An objective of this chapter is the construction of Bode plots of the important transfer func-</span></span>
<span class="line"><span>tions and terminal impedances of switching converters. For example, Fig. 8.2 illustrates the</span></span>
<span class="line"><span>magnitude and phase plots of Gvd(s) for the buck–boost converter model of Fig. 8.1. Rules for</span></span>
<span class="line"><span>construction of magnitude and phase asymptotes are reviewed in Sect. 8.1, including two types</span></span>
<span class="line"><span>of features that often appear in converter transfer functions: resonances and right half-plane</span></span>
<span class="line"><span>zeroes. Bode diagrams of the small-signal transfer functions of the buck–boost converter are</span></span>
<span class="line"><span>derived in detail in Sect.8.2, and the transfer functions of the basic buck, boost, and buck–boost</span></span>
<span class="line"><span>converters are tabulated. The physical origins of the right half-plane zero are also described.</span></span>
<span class="line"><span>Ad iﬃculty usually encountered in circuit analysis (step 4 of the above list) is the complex-</span></span>
<span class="line"><span>ity of the circuit model: practical circuits may contain hundreds of elements, and hence their</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 279</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>–180˚</span></span>
<span class="line"><span>–270˚</span></span>
<span class="line"><span>|| Gvd ||</span></span>
<span class="line"><span>Gd0 =</span></span>
<span class="line"><span>|| Gvd || Gvd</span></span>
<span class="line"><span>0 dBV</span></span>
<span class="line"><span>–20 dBV</span></span>
<span class="line"><span>–40 dBV</span></span>
<span class="line"><span>20 dBV</span></span>
<span class="line"><span>40 dBV</span></span>
<span class="line"><span>60 dBV</span></span>
<span class="line"><span>80 dBV</span></span>
<span class="line"><span>Q =</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>10-1/2Q f0</span></span>
<span class="line"><span>101/2Q f0</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>–40 dB/decade</span></span>
<span class="line"><span>–270˚</span></span>
<span class="line"><span>fz /10</span></span>
<span class="line"><span>10fz</span></span>
<span class="line"><span>1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>DD&#39; D&#39;R C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>D&#39;</span></span>
<span class="line"><span>2 LC</span></span>
<span class="line"><span>D&#39;2R</span></span>
<span class="line"><span>2 DL</span></span>
<span class="line"><span>(RHP)</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>DVg</span></span>
<span class="line"><span>(D&#39;)3RC</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>2D&#39;LC</span></span>
<span class="line"><span>Fig. 8.2 Bode plot of control-to-output transfer function predicted by the model of Fig.8.1, with analyti-</span></span>
<span class="line"><span>cal expressions for the important features</span></span>
<span class="line"><span>analysis may lead to complicated derivations, intractable equations, and lots of algebra mis-</span></span>
<span class="line"><span>takes. Design-oriented analysis [78] is a collection of tools and techniques that can alleviate</span></span>
<span class="line"><span>these problems. Some tools for approaching the design of a complicated converter system are</span></span>
<span class="line"><span>described in this chapter. Writing the transfer functions in normalized form directly exposes the</span></span>
<span class="line"><span>important features of the response. Analytical expressions for these features, as well as for the</span></span>
<span class="line"><span>asymptotes, lead to simple equations that are useful in design. Well-separated roots of trans-</span></span>
<span class="line"><span>fer function polynomials can be approximated in a simple way. Sect. 8.3 describes a graphical</span></span>
<span class="line"><span>method for constructing Bode plots of transfer functions and impedances, essentially by inspec-</span></span>
<span class="line"><span>tion. This method can: (1) reduce the amount of algebra and associated algebra mistakes; (2)</span></span>
<span class="line"><span>lead to greater insight into circuit behavior, which can be applied to design the circuit; and (3)</span></span>
<span class="line"><span>lead to the insight necessary to make suitable approximations that render the equations tractable.</span></span>
<span class="line"><span>Some more advanced techniques of design-oriented analysis are covered in Part IV.</span></span>
<span class="line"><span>Experimental measurement of transfer functions and impedances (needed in step 4, model</span></span>
<span class="line"><span>veriﬁcation) is discussed in Sect. 8.5. Use of computer simulation to plot converter transfer</span></span>
<span class="line"><span>functions (as needed in step 6, worst-case analysis) is covered in Chap. 14.</span></span>
<span class="line"><span>8.1 Review of Bode Plots</span></span>
<span class="line"><span>A Bode plot is a plot of the magnitude and phase of a transfer function or other complex-valued</span></span>
<span class="line"><span>quantity, vs. frequency. Magnitude in decibels and phase in degrees are plotted vs. frequency, us-</span></span>
<span class="line"><span>ing semi-logarithmic axes. The magnitude plot is eﬀectively a log–log plot, since the magnitude</span></span>
<span class="line"><span>is expressed in decibels and the frequency axis is logarithmic.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>280 8 Converter Transfer Functions</span></span>
<span class="line"><span>The magnitude of a dimensionless quantity G can be expressed in decibels as follows:</span></span>
<span class="line"><span>∥ G∥dB= 20 log10 (∥ G∥) (8.3)</span></span>
<span class="line"><span>Decibel values of some simple magnitudes are listed in Table 8.1. Care must be used when the</span></span>
<span class="line"><span>magnitude is dimensionless. Since it is not proper to take the logarithm of a quantity having</span></span>
<span class="line"><span>dimensions, the magnitude must ﬁrst be normalized. For example, to express the magnitude of</span></span>
<span class="line"><span>an impedance Z in decibels, we should normalize by dividing by a base impedance R</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>∥ Z∥dB= 20 log10</span></span>
<span class="line"><span>⎦∥ Z∥</span></span>
<span class="line"><span>Rbase</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.4)</span></span>
<span class="line"><span>Table 8.1 Expressing magnitudes in decibels</span></span>
<span class="line"><span>Actual magnitude Magnitude in dB</span></span>
<span class="line"><span>1/2 −6d B</span></span>
<span class="line"><span>10 d B</span></span>
<span class="line"><span>26 d B</span></span>
<span class="line"><span>5= 10/22 0 d B −6d B= 14 dB</span></span>
<span class="line"><span>10 20 dB</span></span>
<span class="line"><span>1000= 103 3· 20 dB= 60 dB</span></span>
<span class="line"><span>The value of Rbase is arbitrary, but we need</span></span>
<span class="line"><span>to tell others what value we have used. So</span></span>
<span class="line"><span>if ∥ Z∥ is 5 Ω, and we choose Rbase =</span></span>
<span class="line"><span>10 Ω, then we can say that ∥ Z∥dB =</span></span>
<span class="line"><span>20 log10(5Ω/10Ω)=−6 dB with respect to</span></span>
<span class="line"><span>10Ω. A common choice is Rbase = 1Ω; deci-</span></span>
<span class="line"><span>bel impedances expressed with Rbase = 1Ω</span></span>
<span class="line"><span>are said to be expressed in dB Ω.S o5 Ωis</span></span>
<span class="line"><span>equivalent to 14 dBΩ. Current switching har-</span></span>
<span class="line"><span>monics at the input port of a converter are of-</span></span>
<span class="line"><span>ten expressed in dB μA, or dB using a base</span></span>
<span class="line"><span>current of 1 μA : 60 dB μA is equivalent to</span></span>
<span class="line"><span>1000 μA, or 1 mA.</span></span>
<span class="line"><span>The magnitude Bode plots of functions equal to powers off are linear. For example, suppose</span></span>
<span class="line"><span>that the magnitude of a dimensionless quantity G( f )i s</span></span>
<span class="line"><span>∥ G∥=</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)n</span></span>
<span class="line"><span>(8.5)</span></span>
<span class="line"><span>where f0 and n are constants. The magnitude in decibels is</span></span>
<span class="line"><span>∥ G∥dB= 20 log10</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)n</span></span>
<span class="line"><span>= 20n log10</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.6)</span></span>
<span class="line"><span>This equation is plotted in Fig.8.3, for several values ofn. The magnitudes have value 1⇒0d B</span></span>
<span class="line"><span>at frequency f = f0. They are linear functions of log 10( f ). The slope is the change in ∥ G∥dB</span></span>
<span class="line"><span>arising from a unit change in log 10( f ); a unit increase in log 10( f ) corresponds to a factor of</span></span>
<span class="line"><span>10, or a decade, increase in f .F r o mE q . (8.6), a decade increase in f leads to an increase in</span></span>
<span class="line"><span>∥ G∥dB of 20n dB. Hence, the slope is 20 n dB per decade. Equivalently, we can say that the</span></span>
<span class="line"><span>slope is 20n log10(2)≈6n dB per octave, where an octave is a factor of 2 change in frequency.</span></span>
<span class="line"><span>In practice, the magnitudes of most frequency-dependent functions can usually be approximated</span></span>
<span class="line"><span>over a limited range of frequencies by functions of the form (8.5); over this range of frequencies,</span></span>
<span class="line"><span>the magnitude Bode plot is approximately linear with slope 20n dB/decade.</span></span>
<span class="line"><span>A simple transfer function whose magnitude is of the form (8.5)i st h epole at the origin:</span></span>
<span class="line"><span>G(s)= 1</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (8.7)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 281</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>log scale</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>00.1f0 10f0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>n = 1</span></span>
<span class="line"><span>n = 2</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>n20 dB/decade</span></span>
<span class="line"><span>40 dB/decade</span></span>
<span class="line"><span>Fig. 8.3 Magnitude Bode plots of functions which vary as f n are linear, with slope n dB per decade</span></span>
<span class="line"><span>The magnitude is</span></span>
<span class="line"><span>∥ G( jω))∥= 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (8.8)</span></span>
<span class="line"><span>If we deﬁne f=ω/2πand f0=ω0/2π,t h e nE q .(8.8) becomes</span></span>
<span class="line"><span>∥ G∥=</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)−1</span></span>
<span class="line"><span>(8.9)</span></span>
<span class="line"><span>which is of the form of Eq. ( 8.5) with n=−1. As illustrated in Fig. 8.3, the magnitude Bode</span></span>
<span class="line"><span>plot of the pole at the origin ( 8.7) has a−20 dB per decade slope, and passes through 0 dB at</span></span>
<span class="line"><span>frequency f= f0.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Cv1(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(s)</span></span>
<span class="line"><span>Fig. 8.4 Simple R–C low-pass ﬁlter example</span></span>
<span class="line"><span>8.1.1 Single-Pole Response</span></span>
<span class="line"><span>Consider the simpleR–C low-pass ﬁlter illustrated</span></span>
<span class="line"><span>in Fig. 8.4. The transfer function is given by the</span></span>
<span class="line"><span>voltage divider ratio</span></span>
<span class="line"><span>G(s)= v2(s)</span></span>
<span class="line"><span>v1(s)=</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>sC+ R</span></span>
<span class="line"><span>(8.10)</span></span>
<span class="line"><span>This transfer function is a ratio of voltages, and</span></span>
<span class="line"><span>hence is dimensionless. By multiplying the numer-</span></span>
<span class="line"><span>ator and denominator by sC, we can express the</span></span>
<span class="line"><span>transfer function as a rational fraction:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>282 8 Converter Transfer Functions</span></span>
<span class="line"><span>G(s)= 1</span></span>
<span class="line"><span>1+ sRC (8.11)</span></span>
<span class="line"><span>The transfer function now coincides with the following standard normalized form for a single</span></span>
<span class="line"><span>pole:</span></span>
<span class="line"><span>G(s)= 1⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (8.12)</span></span>
<span class="line"><span>The parameterω0 = 2πf0 is found by equating the coe ﬃcients of s in the denominators of</span></span>
<span class="line"><span>Eqs. (8.11) and (8.12). The result is</span></span>
<span class="line"><span>ω0= 1</span></span>
<span class="line"><span>RC (8.13)</span></span>
<span class="line"><span>Since R and C are real positive quantities, ω0 is also real and positive. The denominator of</span></span>
<span class="line"><span>Eq. (8.12) contains a root at s=−ω0, and hence G(s) contains a real pole in the left half of the</span></span>
<span class="line"><span>complex plane.</span></span>
<span class="line"><span>Im(G(j ))</span></span>
<span class="line"><span>Re(G(j ))</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>||G(j ) ||</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>Fig. 8.5 Magnitude and phase of the</span></span>
<span class="line"><span>complex-valued function G( jω)</span></span>
<span class="line"><span>To ﬁnd the magnitude and phase of the trans-</span></span>
<span class="line"><span>fer function, we let s = jω, where j is the square</span></span>
<span class="line"><span>root of−1. We then ﬁnd the magnitude and phase of</span></span>
<span class="line"><span>the resulting complex-valued function. With s= jω,</span></span>
<span class="line"><span>Eq. (8.12) becomes</span></span>
<span class="line"><span>G ( jω)= 1⎦</span></span>
<span class="line"><span>1+ jω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)=</span></span>
<span class="line"><span>1−jω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (8.14)</span></span>
<span class="line"><span>The complex-valued G( jω) is illustrated in Fig. 8.5,</span></span>
<span class="line"><span>for one value ofω. The magnitude is</span></span>
<span class="line"><span>G ( jω)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√[Re ⎦G ( jω) )]2+ [Im ⎦G ( jω) )]2</span></span>
<span class="line"><span>= 1√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(8.15)</span></span>
<span class="line"><span>Here, we have assumed thatω0 is real. In decibels, the magnitude is</span></span>
<span class="line"><span>∥ G( jω)∥dB=−20 log10</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎠dB (8.16)</span></span>
<span class="line"><span>The easy way to sketch the magnitude Bode plot of G is to investigate the asymptotic behavior</span></span>
<span class="line"><span>for large and small frequency.</span></span>
<span class="line"><span>For small frequency,ω≪ω0 and f≪ f0, it is true that</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>≪ 1 (8.17)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 283</span></span>
<span class="line"><span>Fig. 8.6 Magnitude</span></span>
<span class="line"><span>asymptotes for the</span></span>
<span class="line"><span>single real pole trans-</span></span>
<span class="line"><span>fer function</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>ff00.1f0 10f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>–20 dB</span></span>
<span class="line"><span>–40 dB</span></span>
<span class="line"><span>–60 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>|| G(j ) ||dB</span></span>
<span class="line"><span>The (ω/ω0)2 term of Eq. (8.15) is therefore much smaller than 1, and hence Eq. (8.15) becomes</span></span>
<span class="line"><span>∥ G( jω)∥≈1√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>= 1 (8.18)</span></span>
<span class="line"><span>In decibels, the magnitude is approximately</span></span>
<span class="line"><span>∥ G( jω)∥dB≈0 dB (8.19)</span></span>
<span class="line"><span>Thus, as illustrated in Fig. 8.6, at low frequency∥ G( jω)∥dB is asymptotic to 0 dB.</span></span>
<span class="line"><span>At high frequency,ω≫ω0 and f≫ f0. In this case, it is true that</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>≫ 1 (8.20)</span></span>
<span class="line"><span>We can then say that</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>≈</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(8.21)</span></span>
<span class="line"><span>Hence, Eq. (8.15) now becomes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G ( jω)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>≈ 1</span></span>
<span class="line"><span>√⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)−1</span></span>
<span class="line"><span>(8.22)</span></span>
<span class="line"><span>This expression coincides with Eq. ( 8.5), with n=−1. So at high frequency, ∥ G( jω)∥dB has</span></span>
<span class="line"><span>slope−20 dB per decade, as illustrated in Fig. 8.6. Thus, the asymptotes of∥ G( jω)∥ are equal</span></span>
<span class="line"><span>to 1 at low frequency, and (f/ f0)−1 at high frequency. The asymptotes intersect at f0. The actual</span></span>
<span class="line"><span>magnitude tends toward these asymptotes at very low frequency and very high frequency. In the</span></span>
<span class="line"><span>vicinity of the corner frequency f0, the actual curve deviates somewhat from the asymptotes.</span></span>
<span class="line"><span>The deviation of the exact curve from the asymptotes can be found by simply evaluating</span></span>
<span class="line"><span>Eq. (8.15). At the corner frequency f= f0,E q .(8.15) becomes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G ( jω</span></span>
<span class="line"><span>0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω0</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 = 1√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>(8.23)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>284 8 Converter Transfer Functions</span></span>
<span class="line"><span>Fig. 8.7 Deviation of the actual curve</span></span>
<span class="line"><span>from the asymptotes, real pole</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>–10 dB</span></span>
<span class="line"><span>–20 dB</span></span>
<span class="line"><span>–30 dB</span></span>
<span class="line"><span>||G(j ) || dB</span></span>
<span class="line"><span>3 dB1 dB</span></span>
<span class="line"><span>0.5f0 1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>In decibels, the magnitude is</span></span>
<span class="line"><span>∥ G( jω0)∥dB=−20 log10</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω0</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎠≈−3 dB (8.24)</span></span>
<span class="line"><span>So the actual curve deviates from the asymptotes by−3 dB at the corner frequency, as illustrated</span></span>
<span class="line"><span>in Fig. 8.7. Similar arguments show that the actual curve deviates from the asymptotes by−1d B</span></span>
<span class="line"><span>at f= f0/2 and at f= 2 f0.</span></span>
<span class="line"><span>The phase of G( jω)i s</span></span>
<span class="line"><span>∠G( jω)= tan−1</span></span>
<span class="line"><span>⎦Im(G( jω))</span></span>
<span class="line"><span>Re(G( jω))</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.25)</span></span>
<span class="line"><span>Insertion of the real and imaginary parts of Eq. (8.14) into Eq. (8.25) leads to</span></span>
<span class="line"><span>∠G( jω)=−tan−1</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.26)</span></span>
<span class="line"><span>This function is plotted in Fig.8.8. It tends to 0◦at low frequency and to−90◦at high frequency.</span></span>
<span class="line"><span>At the corner frequency f= f0, the phase is−45◦.</span></span>
<span class="line"><span>Fig. 8.8 Exact phase plot,</span></span>
<span class="line"><span>real pole</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0.01f0 0.1f0 f0 10f0 100f0</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>0 asymptote</span></span>
<span class="line"><span> asymptote</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 285</span></span>
<span class="line"><span>Fig. 8.9 One choice for</span></span>
<span class="line"><span>the mid-frequency phase</span></span>
<span class="line"><span>asymptote, which correctly</span></span>
<span class="line"><span>predicts the actual slope at</span></span>
<span class="line"><span>f= f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0.01f0 0.1f0 f0 100f0</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>fa = f0 / 4.81</span></span>
<span class="line"><span>fb = 4.81 f0</span></span>
<span class="line"><span>Since the high-frequency and low-frequency phase asymptotes do not intersect, we need a</span></span>
<span class="line"><span>third asymptote to approximate the phase in the vicinity of the corner frequency f0.O n ew a y</span></span>
<span class="line"><span>to do this is illustrated in Fig. 8.9, where the slope of the asymptote is chosen to be identical to</span></span>
<span class="line"><span>the slope of the actual curve at f = f0. It can be shown that, with this choice, the asymptote</span></span>
<span class="line"><span>intersection frequencies fa and fb are given by</span></span>
<span class="line"><span>fa = f0e−π/2≈f0</span></span>
<span class="line"><span>4.81 (8.27)</span></span>
<span class="line"><span>fb = f0eπ/2≈4.81 f0</span></span>
<span class="line"><span>A simpler choice, which better approximates the actual curve, is</span></span>
<span class="line"><span>fa = f0</span></span>
<span class="line"><span>10 (8.28)</span></span>
<span class="line"><span>fb = 10 f0</span></span>
<span class="line"><span>This asymptote is compared to the actual curve in Fig.8.10. The pole causes the phase to change</span></span>
<span class="line"><span>over a frequency span of approximately two decades, centered at the corner frequency. The slope</span></span>
<span class="line"><span>of the asymptote in this frequency span is−45</span></span>
<span class="line"><span>◦per decade. At the break frequencies fa and fb,</span></span>
<span class="line"><span>the actual phase deviates from the asymptotes by tan−1(0.1)= 5.7◦.</span></span>
<span class="line"><span>The magnitude and phase asymptotes for the single-pole response are summarized in</span></span>
<span class="line"><span>Fig. 8.11. It is good practice to consistently express single-pole transfer functions in the nor-</span></span>
<span class="line"><span>malized form of Eq. (8.12). Both terms in the denominator of Eq. (8.12) are dimensionless, and</span></span>
<span class="line"><span>the coeﬃcient of s0 is unity. Equation (8.12) is easy to interpret, because of its normalized form.</span></span>
<span class="line"><span>At low frequencies, where the ( s/ω0) term is small in magnitude, the transfer function is ap-</span></span>
<span class="line"><span>proximately equal to 1. At high frequencies, where the (s/ω0) term has magnitude much greater</span></span>
<span class="line"><span>than 1, the transfer function is approximately ( s/ω0)−1. This leads to a magnitude of ( f/ f0)−1.</span></span>
<span class="line"><span>The corner frequency is f0 =ω0/2π. So the transfer function is written directly in terms of its</span></span>
<span class="line"><span>salient features, that is, its asymptotes and its corner frequency.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>286 8 Converter Transfer Functions</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0.01f0 0.1f0 f0 100f0</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>fa = f0/10</span></span>
<span class="line"><span>fb = 10f0</span></span>
<span class="line"><span>Fig. 8.10 A simpler choice for the mid-frequency phase asymptote, which better approximates the curve</span></span>
<span class="line"><span>over the entire frequency range</span></span>
<span class="line"><span>0˚G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>–45˚</span></span>
<span class="line"><span>f0/10</span></span>
<span class="line"><span>10f0</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>–45˚/decade</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| G(j )|| dB 3 dB1 dB</span></span>
<span class="line"><span>0.5f0 1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>Fig. 8.11 Summary of the magnitude and phase Bode plot for the single real pole</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 287</span></span>
<span class="line"><span>8.1.2 Single Zero Response</span></span>
<span class="line"><span>A single zero response contains a root in the numerator of the transfer function, and can be</span></span>
<span class="line"><span>written in the following normalized form:</span></span>
<span class="line"><span>G(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.29)</span></span>
<span class="line"><span>This transfer function has magnitude</span></span>
<span class="line"><span>∥ G( jω)∥=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(8.30)</span></span>
<span class="line"><span>At low frequency, f≪ f0=ω0/2π, the transfer function magnitude tends to 1⇒0 dB. At high</span></span>
<span class="line"><span>frequency, f ≫ f0, the transfer function magnitude tends to ( f/ f0). As illustrated in Fig. 8.12,</span></span>
<span class="line"><span>the high-frequency asymptote has slope+20 dB/decade. The phase is given by</span></span>
<span class="line"><span>∠G( jω)= tan−1</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.31)</span></span>
<span class="line"><span>With the exception of a minus sign, the phase is identical to Eq. (8.26). Hence, suitable asymp-</span></span>
<span class="line"><span>totes are as illustrated in Fig. 8.12. The phase tends to 0◦at low frequency and to+90◦at high</span></span>
<span class="line"><span>frequency. Over the interval f0/10&lt; f&lt; 10 f0, the phase asymptote has a slope of+45◦/decade.</span></span>
<span class="line"><span>0˚G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>45˚</span></span>
<span class="line"><span>f0 /10</span></span>
<span class="line"><span>10f0 +90˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>+45˚/decade</span></span>
<span class="line"><span>+20 dB/decade</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| G(j ) || dB</span></span>
<span class="line"><span>3 dB1 dB</span></span>
<span class="line"><span>0.5f0 1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>Fig. 8.12 Summary of the magnitude and phase Bode plot for the single real zero</span></span>
<span class="line"><span></span></span>
<span class="line"><span>288 8 Converter Transfer Functions</span></span>
<span class="line"><span>8.1.3 Right Half-Plane Zero</span></span>
<span class="line"><span>Right half-plane zeroes are often encountered in the small-signal transfer functions of switching</span></span>
<span class="line"><span>converters. These terms have the following normalized form:</span></span>
<span class="line"><span>G(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.32)</span></span>
<span class="line"><span>The root of Eq. (8.32) is positive, and hence lies in the right half of the complex s-plane. The</span></span>
<span class="line"><span>right half-plane zero is also sometimes called a nonminimum phase zero. Its normalized form,</span></span>
<span class="line"><span>Eq. (8.32), resembles the normalized form of the (left half-plane) zero of Eq. ( 8.29), with the</span></span>
<span class="line"><span>exception of a minus sign in the coeﬃcient of s. The minus sign causes a phase reversal at high</span></span>
<span class="line"><span>frequency.</span></span>
<span class="line"><span>The transfer function has magnitude</span></span>
<span class="line"><span>∥ G( jω)∥=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(8.33)</span></span>
<span class="line"><span>This expression is identical to Eq. (8.30). Hence, it is impossible to distinguish a right half-plane</span></span>
<span class="line"><span>zero from a left half-plane zero by the magnitude alone. The phase is given by</span></span>
<span class="line"><span>∠G( jω)=−tan−1</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.34)</span></span>
<span class="line"><span>This coincides with the expression for the phase of the single pole, Eq. (8.26). So the right half-</span></span>
<span class="line"><span>plane zero exhibits the magnitude response of the left half-plane zero, but the phase response of</span></span>
<span class="line"><span>the pole. Magnitude and phase asymptotes are summarized in Fig. 8.13.</span></span>
<span class="line"><span>+20 dB/decade</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| G(j ) || dB</span></span>
<span class="line"><span>3 dB1 dB</span></span>
<span class="line"><span>0.5f0 1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>0˚G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>–45˚</span></span>
<span class="line"><span>f0 /10</span></span>
<span class="line"><span>10f0</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>–45˚/decade</span></span>
<span class="line"><span>Fig. 8.13 Summary of the magnitude and phase Bode plot for the single real RHP zero</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 289</span></span>
<span class="line"><span>8.1.4 Frequency Inversion</span></span>
<span class="line"><span>Two other forms arise, from inversion of the frequency axis. The inverted pole has the transfer</span></span>
<span class="line"><span>function</span></span>
<span class="line"><span>G(s)= 1⎦</span></span>
<span class="line"><span>1+ω0</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>) (8.35)</span></span>
<span class="line"><span>As illustrated in Fig.8.14, the inverted pole has a high-frequency gain of 1, and a low-frequency</span></span>
<span class="line"><span>asymptote having a+ 20 dB/decade slope. This form is useful for describing the gain of high-</span></span>
<span class="line"><span>pass ﬁlters, and of other transfer functions where it is desired to emphasize the high-frequency</span></span>
<span class="line"><span>gain, with attenuation of low frequencies. Equation (8.35) is equivalent to</span></span>
<span class="line"><span>G(s)=</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (8.36)</span></span>
<span class="line"><span>However, Eq. (8.35) more directly emphasizes that the high-frequency gain is 1.</span></span>
<span class="line"><span>The inverted zero has the form</span></span>
<span class="line"><span>G(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ω0</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(8.37)</span></span>
<span class="line"><span>As illustrated in Fig.8.15, the inverted zero has a high-frequency gain asymptote equal to 1, and</span></span>
<span class="line"><span>a low-frequency asymptote having a slope equal to −20 dB/decade. An example of the use of</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>+45˚</span></span>
<span class="line"><span>f0 /10</span></span>
<span class="line"><span>10f0</span></span>
<span class="line"><span>+90˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>–45˚/decade</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>+20 dB/decade</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>||G(j ) || dB</span></span>
<span class="line"><span>3 dB</span></span>
<span class="line"><span>1 dB</span></span>
<span class="line"><span>0.5f0</span></span>
<span class="line"><span>1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>Fig. 8.14 Inversion of the frequency axis: summary of the magnitude and phase Bode plots for the</span></span>
<span class="line"><span>inverted real pole</span></span>
<span class="line"><span></span></span>
<span class="line"><span>290 8 Converter Transfer Functions</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>G(j )</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>–45˚</span></span>
<span class="line"><span>f0 /10</span></span>
<span class="line"><span>10f0</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>5.7˚</span></span>
<span class="line"><span>+45˚/decade</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| G(j ) || dB</span></span>
<span class="line"><span>3 dB</span></span>
<span class="line"><span>1 dB</span></span>
<span class="line"><span>0.5f0</span></span>
<span class="line"><span>1 dB</span></span>
<span class="line"><span>2f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>Fig. 8.15 Inversion of the frequency axis: summary of the magnitude and phase Bode plot for the inverted</span></span>
<span class="line"><span>real zero</span></span>
<span class="line"><span>this type of transfer function is the proportional-plus-integral controller, discussed in connection</span></span>
<span class="line"><span>with feedback loop design in the next chapter. Equation (8.37) is equivalent to</span></span>
<span class="line"><span>G(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (8.38)</span></span>
<span class="line"><span>However, Eq. (8.37) is the preferred form when it is desired to emphasize the value of the high-</span></span>
<span class="line"><span>frequency gain asymptote.</span></span>
<span class="line"><span>The use of frequency inversion is illustrated by example in the next section.</span></span>
<span class="line"><span>8.1.5 Combinations</span></span>
<span class="line"><span>The Bode diagram of a transfer function containing several pole, zero, and gain terms can be</span></span>
<span class="line"><span>constructed by simple addition. At any given frequency, the magnitude (in decibels) of the</span></span>
<span class="line"><span>composite transfer function is equal to the sum of the decibel magnitudes of the individual</span></span>
<span class="line"><span>terms. Likewise, at a given frequency the phase of the composite transfer function is equal to</span></span>
<span class="line"><span>the sum of the phases of the individual terms.</span></span>
<span class="line"><span>For example, suppose that we have already constructed the Bode diagrams of two complex-</span></span>
<span class="line"><span>valued functions ofω, G</span></span>
<span class="line"><span>1(ω) and G2(ω). These functions have magnitudes R1(ω) and R2(ω),</span></span>
<span class="line"><span>and phases θ1(ω) and θ2(ω), respectively. It is desired to construct the Bode diagram of the</span></span>
<span class="line"><span>product G3(ω)= G1(ω) G2(ω). Let G3(ω) have magnitude R3(ω), and phase θ3(ω). To ﬁnd this</span></span>
<span class="line"><span>magnitude and phase, we can express G1(ω), G2(ω), and G3(ω) in polar form:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 291</span></span>
<span class="line"><span>G1(ω)= R1(ω)ejθ1(ω)</span></span>
<span class="line"><span>G2(ω)= R2(ω)ejθ2(ω) (8.39)</span></span>
<span class="line"><span>G3(ω)= R3(ω)ejθ3(ω)</span></span>
<span class="line"><span>The product G3(ω) can then be expressed as</span></span>
<span class="line"><span>G3(ω)= G1(ω)G2(ω)= R1(ω)ejθ1(ω)R2(ω)ejθ2(ω) (8.40)</span></span>
<span class="line"><span>Simpliﬁcation leads to</span></span>
<span class="line"><span>G3(ω)= (R1(ω)R2(ω)) ej(θ1(ω)+θ2(ω)) (8.41)</span></span>
<span class="line"><span>Hence, the composite phase is</span></span>
<span class="line"><span>θ3(ω)= θ1(ω)+θ2(ω) (8.42)</span></span>
<span class="line"><span>The total magnitude is</span></span>
<span class="line"><span>R3(ω)= R1(ω)R2(ω) (8.43)</span></span>
<span class="line"><span>When expressed in decibels, Eq. (8.43) becomes</span></span>
<span class="line"><span>⏐⏐⏐R3(ω)</span></span>
<span class="line"><span>⏐⏐⏐dB=</span></span>
<span class="line"><span>⏐⏐⏐R1(ω)</span></span>
<span class="line"><span>⏐⏐⏐dB+</span></span>
<span class="line"><span>⏐⏐⏐R2(ω)</span></span>
<span class="line"><span>⏐⏐⏐dB (8.44)</span></span>
<span class="line"><span>So the composite phase is the sum of the individual phases, and when expressed in decibels, the</span></span>
<span class="line"><span>composite magnitude is the sum of the individual magnitudes. The composite magnitude slope,</span></span>
<span class="line"><span>in dB per decade, is therefore also the sum of the individual slopes in dB per decade.</span></span>
<span class="line"><span>For example, consider construction of the Bode plot of the following transfer function:</span></span>
<span class="line"><span>G(s)= G0⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>) (8.45)</span></span>
<span class="line"><span>where G0 = 40⇒32 dB, f1 =ω1/2π= 100 Hz, f2 =ω2/2π= 2 kHz. This transfer function</span></span>
<span class="line"><span>contains three terms: the gainG0, and the poles at frequenciesf1 and f2. The asymptotes for each</span></span>
<span class="line"><span>of these terms are illustrated in Fig. 8.16.T h eg a i nG0 is a positive real number, and therefore</span></span>
<span class="line"><span>contributes zero phase shift with the gain 32 dB. The poles at 100 Hz and 2 kHz each contribute</span></span>
<span class="line"><span>asymptotes as in Fig. 8.11.</span></span>
<span class="line"><span>At frequencies less than 100 Hz, the G0 term contributes a gain magnitude of 32 dB, while</span></span>
<span class="line"><span>the two poles each contribute magnitude asymptotes of 0 dB. So the low-frequency composite</span></span>
<span class="line"><span>magnitude asymptote is 32 dB+ 0d B+ 0d B= 32 dB. For frequencies between 100 Hz and</span></span>
<span class="line"><span>2k H z , t h eG0 gain again contributes 32 dB, and the pole at 2 kHz continues to contribute a</span></span>
<span class="line"><span>0 dB magnitude asymptote. However, the pole at 100 Hz now contributes a magnitude asymp-</span></span>
<span class="line"><span>tote that decreases with a−20 dB per decade slope. The composite magnitude asymptote there-</span></span>
<span class="line"><span>fore also decreases with a−20 dB per decade slope, as illustrated in Fig. 8.16. For frequencies</span></span>
<span class="line"><span>greater than 2 kHz, the poles at 100 Hz and 2 kHz each contribute decreasing asymptotes hav-</span></span>
<span class="line"><span>ing slopes of −20 dB/decade. The composite asymptote therefore decreases with a slope of</span></span>
<span class="line"><span>−20 dB/decade−20 dB/decade=−40 dB/decade, as illustrated.</span></span>
<span class="line"><span>The composite phase asymptote is also constructed in Fig. 8.16. Below 10 Hz, all terms</span></span>
<span class="line"><span>contribute 0</span></span>
<span class="line"><span>◦asymptotes. For frequencies between f1/10= 10 Hz and f2/10= 200 Hz, the pole</span></span>
<span class="line"><span>at f1 contributes a decreasing phase asymptote having a slope of−45◦/decade. Between 200 Hz</span></span>
<span class="line"><span>and 10 f1 = 1 kHz, both poles contribute decreasing asymptotes with−45◦/decade slopes; the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>292 8 Converter Transfer Functions</span></span>
<span class="line"><span>–40 dB/decade</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span> G</span></span>
<span class="line"><span> G|| G ||</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–45˚</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>–135˚</span></span>
<span class="line"><span>–180˚</span></span>
<span class="line"><span>–60 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>–20 dB</span></span>
<span class="line"><span>–40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>100 Hz</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>2 kHz</span></span>
<span class="line"><span>G0 = 40 32 dB</span></span>
<span class="line"><span>–20 dB/decade</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>f1/10</span></span>
<span class="line"><span>10 Hz</span></span>
<span class="line"><span>f2/10</span></span>
<span class="line"><span>200 Hz</span></span>
<span class="line"><span>10f1</span></span>
<span class="line"><span>1 kHz</span></span>
<span class="line"><span>10f2</span></span>
<span class="line"><span>20 kHz</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–45˚/decade</span></span>
<span class="line"><span>–90˚/decade</span></span>
<span class="line"><span>–45˚/decade</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 8.16 Construction of magnitude and phase asymptotes for the transfer function of Eq. (8.45). Dashed</span></span>
<span class="line"><span>lines: asymptotes for individual terms. Solid lines: composite asymptotes</span></span>
<span class="line"><span>composite slope is therefore −90◦/decade. Between 1 kHz and 10 f2 = 20 kHz, the pole at</span></span>
<span class="line"><span>f1 contributes a constant−90◦phase asymptote, while the pole at f2 contributes a decreasing</span></span>
<span class="line"><span>asymptote with−45◦/decade slope. The composite slope is then−45◦/decade. For frequencies</span></span>
<span class="line"><span>greater than 20 kHz, both poles contribute constant −90◦asymptotes, leading to a composite</span></span>
<span class="line"><span>phase asymptote of−180◦.</span></span>
<span class="line"><span>As a second example, consider the transfer function A(s) represented by the magnitude</span></span>
<span class="line"><span>and phase asymptotes of Fig. 8.17. Let us write the transfer function that corresponds to these</span></span>
<span class="line"><span>asymptotes. The dc asymptote is A0. At corner frequency f1, the asymptote slope increases</span></span>
<span class="line"><span>from 0 dB/decade to+20 dB/decade. Hence, there must be a zero at frequencyf1. At frequency</span></span>
<span class="line"><span>f2, the asymptote slope decreases from+20 dB/decade to 0 dB/decade. Therefore the transfer</span></span>
<span class="line"><span>function contains a pole at frequency f2. So we can express the transfer function as</span></span>
<span class="line"><span>A(s)= A0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>) (8.46)</span></span>
<span class="line"><span>whereω1 andω2 are equal to 2πf1 and 2πf2, respectively.</span></span>
<span class="line"><span>Fig. 8.17 Magnitude and</span></span>
<span class="line"><span>phase asymptotes of example</span></span>
<span class="line"><span>transfer function A(s)</span></span>
<span class="line"><span>|| A ||</span></span>
<span class="line"><span> A</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>|| A0 ||dB +20 dB/decade</span></span>
<span class="line"><span>f1 /10</span></span>
<span class="line"><span>10f1 f2 /10</span></span>
<span class="line"><span>10f2</span></span>
<span class="line"><span>–45˚/decade+45˚/dec</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>|| A ||dB</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 293</span></span>
<span class="line"><span>We can use Eq. (8.46) to derive analytical expressions for the asymptotes. For f&lt; f1, and</span></span>
<span class="line"><span>letting s= jω, we can see that the (s/ω1) and (s/ω2) terms each have magnitude less than 1. The</span></span>
<span class="line"><span>asymptote is derived by neglecting these terms. Hence, the low-frequency magnitude asymptote</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝1+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝1+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1= A0 (8.47)</span></span>
<span class="line"><span>For f1&lt; f&lt; f2, the numerator term (s/ω1) has magnitude greater than 1, while the denominator</span></span>
<span class="line"><span>term ( s/ω2) has magnitude less than 1. The asymptote is derived by neglecting the smaller</span></span>
<span class="line"><span>terms:</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜</span></span>
<span class="line"><span>⎝1+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sω2</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟</span></span>
<span class="line"><span>⎠</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span>1 = A0</span></span>
<span class="line"><span>ω</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>(8.48)</span></span>
<span class="line"><span>This is the expression for the mid-frequency magnitude asymptote of A(s). For f &gt; f2,t h e</span></span>
<span class="line"><span>(s/ω1) and ( s/ω2) terms each have magnitude greater than 1. The expression for the high-</span></span>
<span class="line"><span>frequency asymptote is therefore:</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>A</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>s= jω</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>= A0</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>(8.49)</span></span>
<span class="line"><span>We can conclude that the high-frequency gain is</span></span>
<span class="line"><span>A∞= A0</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>(8.50)</span></span>
<span class="line"><span>Thus, we can derive analytical expressions for the asymptotes.</span></span>
<span class="line"><span>The transfer function A(s) can also be written in a second form, using inverted poles and</span></span>
<span class="line"><span>zeroes. Suppose that A(s) represents the transfer function of a high-frequency ampliﬁer, whose</span></span>
<span class="line"><span>dc gain is not important. We are then interested in expressing A(s) directly in terms of the high-</span></span>
<span class="line"><span>frequency gain A∞. We can view the transfer function as having an inverted pole at frequency</span></span>
<span class="line"><span>f2, which introduces attenuation at frequencies less than f2. In addition, there is an inverted zero</span></span>
<span class="line"><span>at f= f1.S o A(s) could also be written as</span></span>
<span class="line"><span>A(s)= A∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ω1</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ω2</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>) (8.51)</span></span>
<span class="line"><span>It can be veriﬁed that Eqs. (8.51) and (8.46) are equivalent.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>294 8 Converter Transfer Functions</span></span>
<span class="line"><span>8.1.6 Quadratic Pole Response: Resonance</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CRv1(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(s)</span></span>
<span class="line"><span>Fig. 8.18 Two-pole low-pass ﬁlter example</span></span>
<span class="line"><span>Consider next the transfer function</span></span>
<span class="line"><span>G(s) of the two-pole low-pass ﬁlter of</span></span>
<span class="line"><span>Fig. 8.18. The buck converter contains</span></span>
<span class="line"><span>a ﬁlter of this type. When manipulated</span></span>
<span class="line"><span>into canonical form, the models of the</span></span>
<span class="line"><span>boost and buck–boost also contain simi-</span></span>
<span class="line"><span>lar ﬁlters. One can show that the transfer</span></span>
<span class="line"><span>function of this network is</span></span>
<span class="line"><span>G(s)= v</span></span>
<span class="line"><span>2(s)</span></span>
<span class="line"><span>v1(s)= 1</span></span>
<span class="line"><span>1+ s L</span></span>
<span class="line"><span>R+ s2LC</span></span>
<span class="line"><span>(8.52)</span></span>
<span class="line"><span>This transfer function contains a second-order denominator polynomial, and is of the form</span></span>
<span class="line"><span>G(s)= 1</span></span>
<span class="line"><span>1+ a1 s+ a2 s2 (8.53)</span></span>
<span class="line"><span>with a1= L/R and a2= LC.</span></span>
<span class="line"><span>To construct the Bode plot of this transfer function, we might try to factor the denominator</span></span>
<span class="line"><span>into its two roots:</span></span>
<span class="line"><span>G(s)= 1⎦</span></span>
<span class="line"><span>1−s</span></span>
<span class="line"><span>s1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1−s</span></span>
<span class="line"><span>s2</span></span>
<span class="line"><span>) (8.54)</span></span>
<span class="line"><span>Use of the quadratic formula leads to the following expressions for the roots:</span></span>
<span class="line"><span>s1 =−a1</span></span>
<span class="line"><span>2a2</span></span>
<span class="line"><span>⎡⎢⎢⎢</span></span>
<span class="line"><span>⎢⎢⎢⎣1−</span></span>
<span class="line"><span>√1−4a2</span></span>
<span class="line"><span>a2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>⎤⎥⎥⎥</span></span>
<span class="line"><span>⎥⎥⎥⎦ (8.55)</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>2 =−a1</span></span>
<span class="line"><span>2a2</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎣1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−4a2</span></span>
<span class="line"><span>a2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎥⎥⎦ (8.56)</span></span>
<span class="line"><span>If 4a2 ≤a2</span></span>
<span class="line"><span>1, then the roots are real. Each real pole then exhibits a Bode diagram as derived in</span></span>
<span class="line"><span>Sect. 8.1.1, and the composite Bode diagram can be constructed as described in Sect. 8.1.5 (but</span></span>
<span class="line"><span>a better approach is described in Sect. 8.1.7).</span></span>
<span class="line"><span>If 4a2&gt; a2</span></span>
<span class="line"><span>1, then the roots (8.55) and (8.56) are complex. In Sect. 8.1.1, the assumption was</span></span>
<span class="line"><span>made thatω0 is real; hence, the results of that section cannot be applied to this case. We need to</span></span>
<span class="line"><span>do some additional work, to determine the magnitude and phase for the case when the roots are</span></span>
<span class="line"><span>complex.</span></span>
<span class="line"><span>The transfer functions of Eqs. ( 8.52) and ( 8.53) can be written in the following standard</span></span>
<span class="line"><span>normalized form:</span></span>
<span class="line"><span>G(s)= 1</span></span>
<span class="line"><span>1+ 2ζs</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (8.57)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.1 Review of Bode Plots 295</span></span>
<span class="line"><span>If the coeﬃcients a1 and a2 are real and positive, then the parametersζandω0 are also real and</span></span>
<span class="line"><span>positive. The parameterω0 is again the angular corner frequency, and we can deﬁnef0=ω0/2π.</span></span>
<span class="line"><span>The parameterζis called the damping factor:ζcontrols the shape of the transfer function in the</span></span>
<span class="line"><span>vicinity of f= f0. An alternative standard normalized form is</span></span>
<span class="line"><span>G(s)= 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (8.58)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Q= 1</span></span>
<span class="line"><span>2ζ (8.59)</span></span>
<span class="line"><span>The parameter Q is called the quality factor of the circuit, and is a measure of the dissipation</span></span>
<span class="line"><span>in the system. A more general deﬁnition of Q, for sinusoidal excitation of a passive element or</span></span>
<span class="line"><span>network, is</span></span>
<span class="line"><span>Q= 2π (peak stored energy)</span></span>
<span class="line"><span>(energy dissipated per cycle) (8.60)</span></span>
<span class="line"><span>For a second-order passive system, Eqs. (8.59) and (8.60) are equivalent. We will see that theQ-</span></span>
<span class="line"><span>factor has a very simple interpretation in the magnitude Bode diagrams of second-order transfer</span></span>
<span class="line"><span>functions.</span></span>
<span class="line"><span>Analytical expressions for the parametersQ andω0 can be found by equating like powers of</span></span>
<span class="line"><span>s in the original transfer function, Eq. (8.52), and in the normalized form, Eq. (8.58). The result</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span>f0 =ω0</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>(8.61)</span></span>
<span class="line"><span>Q= R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>The roots s1 and s2 of Eqs. (8.55) and ( 8.56) are real when Q≤0.5, and are complex when</span></span>
<span class="line"><span>Q&gt; 0.5.</span></span>
<span class="line"><span>The magnitude of G is</span></span>
<span class="line"><span>G ( jω)</span></span>
<span class="line"><span>= 1√⎛⎜⎜⎜⎜⎜⎝1−</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(8.62)</span></span>
<span class="line"><span>Asymptotes of∥ G∥ are illustrated in Fig. 8.19. At low frequencies, (ω/ω0)≪ 1, and hence</span></span>
<span class="line"><span>Fig. 8.19 Magni-</span></span>
<span class="line"><span>tude asymptotes for</span></span>
<span class="line"><span>the two-pole transfer</span></span>
<span class="line"><span>function</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>–2</span></span>
<span class="line"><span>–40 dB/decade</span></span>
<span class="line"><span>ff00.1f0 10f0</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>|| G(j ) ||dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>–20 dB</span></span>
<span class="line"><span>–40 dB</span></span>
<span class="line"><span>–60 dB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>296 8 Converter Transfer Functions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G</span></span>
<span class="line"><span></span></span>
<span class="line"><span>→1f o r ω≪ω</span></span>
<span class="line"><span>0 (8.63)</span></span>
<span class="line"><span>At high frequencies where (ω/ω0)≫ 1, the (ω/ω0)4 term dominates the expression inside the</span></span>
<span class="line"><span>radical of Eq. (8.62). Hence, the high-frequency asymptote is</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>→</span></span>
<span class="line"><span>⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>)−2</span></span>
<span class="line"><span>forω≫ω0 (8.64)</span></span>
<span class="line"><span>This expression coincides with Eq. (8.5), with n=−2. Therefore, the high-frequency asymptote</span></span>
<span class="line"><span>has slope−40 dB/decade. The asymptotes intersect at f= f0, and are independent of Q.</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>| Q |dB0 dB</span></span>
<span class="line"><span>–40 dB/decade</span></span>
<span class="line"><span>Fig. 8.20 Important features of the magnitude Bode</span></span>
<span class="line"><span>plot, for the two-pole transfer function</span></span>
<span class="line"><span>The parameter Q aﬀects the deviation of</span></span>
<span class="line"><span>the actual curve from the asymptotes, in the</span></span>
<span class="line"><span>neighborhood of the corner frequency f</span></span>
<span class="line"><span>0.T h e</span></span>
<span class="line"><span>exact magnitude at f= f0 is found by substi-</span></span>
<span class="line"><span>tution ofω=ω0 into Eq. (8.62):</span></span>
<span class="line"><span>G ( jω0)</span></span>
<span class="line"><span>= Q (8.65)</span></span>
<span class="line"><span>So the exact transfer function has magnitude</span></span>
<span class="line"><span>Q at the corner frequency f0. In decibels,</span></span>
<span class="line"><span>Eq. (8.65)i s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G ( jω</span></span>
<span class="line"><span>0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>dB=</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐Q</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>dB (8.66)</span></span>
<span class="line"><span>So if, for example, Q= 2⇒6 dB, then the</span></span>
<span class="line"><span>actual curve deviates from the asymptotes by 6 dB at the corner frequency f = f0. Salient</span></span>
<span class="line"><span>features of the magnitude Bode plot of the second-order transfer function are summarized in</span></span>
<span class="line"><span>Fig. 8.20.</span></span>
<span class="line"><span>The phase of G is</span></span>
<span class="line"><span>∠G ( jω)=−tan−1</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1−</span></span>
<span class="line"><span>⎦ω</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>⎤⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎥⎦</span></span>
<span class="line"><span>(8.67)</span></span>
<span class="line"><span>The phase tends to 0◦at low frequency and to−180◦at high frequency. At f = f0, the phase</span></span>
<span class="line"><span>is−90◦. As illustrated in Fig. 8.21, increasing the value of Q causes a sharper phase change be-</span></span>
<span class="line"><span>tween the 0◦and−180◦asymptotes. We again need a mid-frequency asymptote, to approximate</span></span>
<span class="line"><span>the phase transition in the vicinity of the corner frequency f0, as illustrated in Fig. 8.22.A si n</span></span>
<span class="line"><span>the case of the real single pole, we could choose the slope of this asymptote to be identical to</span></span>
<span class="line"><span>the slope of the actual curve at f= f0. It can be shown that this choice leads to the following</span></span>
<span class="line"><span>asymptote break frequencies:</span></span>
<span class="line"><span>fa=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>eπ/2)−1</span></span>
<span class="line"><span>2Q</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>fb=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>eπ/2) 1</span></span>
<span class="line"><span>2Q</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>(8.68)</span></span></code></pre></div>`,10)])])}const u=s(l,[["render",i]]);export{f as __pageData,u as default};
