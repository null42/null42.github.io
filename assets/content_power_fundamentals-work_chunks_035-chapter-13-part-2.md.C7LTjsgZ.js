import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 535-551 > Chunk ID: `chapter-13-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/035-chapter-13-part-2.md","filePath":"content/power/fundamentals-work/chunks/035-chapter-13-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/035-chapter-13-part-2.md"};function i(t,n,o,c,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第13章part-2-13-techniques-of-design-oriented-analysis-the-feedback-theorem" tabindex="-1">第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem <a class="header-anchor" href="#第13章part-2-13-techniques-of-design-oriented-analysis-the-feedback-theorem" aria-label="Permalink to &quot;第13章part 2 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 535-551<br> Chunk ID: <code>chapter-13-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>13.4 Example: Closed-Loop Regulator 529</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+ 1 : M Le</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(s)vg(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3</span></span>
<span class="line"><span>C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vx(s)</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>d(s)</span></span>
<span class="line"><span>vy(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>iload (s)</span></span>
<span class="line"><span>e(s)d(s)</span></span>
<span class="line"><span>j(s)d(s)</span></span>
<span class="line"><span>Fig. 13.18 Application of feedback theorem to buck regulator example</span></span>
<span class="line"><span>the small-signal model, we can employ superposition to express the output perturbation ˆv as a</span></span>
<span class="line"><span>function of input perturbations ˆvre f ,ˆvg, and ˆiload:</span></span>
<span class="line"><span>ˆv(s)= Gr(s)ˆvre f (s)+ Gg(s)ˆvg(s)−Zoˆiload (13.76)</span></span>
<span class="line"><span>The closed-loop transfer functions Gr, Gg, and Zo can each be found through application of the</span></span>
<span class="line"><span>feedback theorem, and can be expressed in the form of Eq. (13.1). Speciﬁcally, we can express</span></span>
<span class="line"><span>Eq. (13.76)a s :</span></span>
<span class="line"><span>ˆv(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>G∞r</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ G0r</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆvre f (s)+</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>G∞g</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ G0g</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>−</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Z∞o</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ Z0o</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆiload (13.77)</span></span>
<span class="line"><span>The terms G∞r and G0r are found using the feedback theorem with ˆvg and ˆiload set to zero, and</span></span>
<span class="line"><span>the terms G∞g and G0g are found using the feedback theorem with ˆvre f and ˆiload set to zero. The</span></span>
<span class="line"><span>terms Z∞o and Z0o are found using the feedback theorem with ˆvg and ˆvre f set to zero. The loop</span></span>
<span class="line"><span>gain T is found with ˆvg,ˆvre f , and ˆiload all set to zero. In the following analysis, the operational</span></span>
<span class="line"><span>ampliﬁer is treated as ideal.</span></span>
<span class="line"><span>The closed-loop reference-to-output ideal forward gain G∞r(s) is found with ˆvg and ˆiload set</span></span>
<span class="line"><span>to zero and with ˆvy nulled:</span></span>
<span class="line"><span>G∞r(s)= ˆv</span></span>
<span class="line"><span>ˆvre f</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0, ˆiload=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.78)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>530 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(s)vg = 0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3</span></span>
<span class="line"><span>C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>d(s)</span></span>
<span class="line"><span>vy(s) o 0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>v = vref</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>}Z3</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>1 : Me(s)d(s)</span></span>
<span class="line"><span>j(s)d(s)</span></span>
<span class="line"><span>Le</span></span>
<span class="line"><span>Fig. 13.19 Determination of G∞r</span></span>
<span class="line"><span>The small-signal model with these conditions is illustrated in Fig. 13.19. Nulling ˆvy in the pres-</span></span>
<span class="line"><span>ence of ˆvre f causes the negative input of the ideal op amp ˆv−to be equal to ˆvre f .B u tˆv−and ˆv</span></span>
<span class="line"><span>are related according to the voltage divider ratio of the feedback network:</span></span>
<span class="line"><span>ˆv−= ˆv</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3+ Z1</span></span>
<span class="line"><span>= ˆvre f (13.79)</span></span>
<span class="line"><span>where the error ampliﬁer impedances are</span></span>
<span class="line"><span>Z1= R1+</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span> 1</span></span>
<span class="line"><span>sC2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(13.80)</span></span>
<span class="line"><span>Z2= R4 (13.81)</span></span>
<span class="line"><span>Z3= R3+ 1</span></span>
<span class="line"><span>sC3</span></span>
<span class="line"><span>(13.82)</span></span>
<span class="line"><span>Therefore, G∞r is equal to:</span></span>
<span class="line"><span>G∞r=</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3+ Z1</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3</span></span>
<span class="line"><span>) (13.83)</span></span>
<span class="line"><span>At dc, this gain reduces to</span></span>
<span class="line"><span>G∞r(0)= R4+ R1+ R2</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>(13.84)</span></span>
<span class="line"><span>In a dc regulator having constant vre f , the dynamics of Eq. (13.83) are irrelevant, and the ideal</span></span>
<span class="line"><span>output voltage is equal to G∞r(0)Vre f . When the reference can vary, then the poles and zeroes</span></span>
<span class="line"><span>of Eq. (13.83) may introduce signiﬁcant dynamics.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator 531</span></span>
<span class="line"><span>+ 1 : M</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(s)vg = 0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>vref</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3</span></span>
<span class="line"><span>C3</span></span>
<span class="line"><span>R4</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>d(s) = 0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM +</span></span>
<span class="line"><span>vx(s) o 0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v = vref</span></span>
<span class="line"><span>Zout</span></span>
<span class="line"><span>e(s)d(s)</span></span>
<span class="line"><span>j(s)d(s)</span></span>
<span class="line"><span>Le</span></span>
<span class="line"><span>Fig. 13.20 Determination of G0r</span></span>
<span class="line"><span>The direct forward transmission through the feedback path G0r is</span></span>
<span class="line"><span>G0r(s)= ˆv</span></span>
<span class="line"><span>ˆvre f</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvg=0, ˆiload=0</span></span>
<span class="line"><span>ˆvx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.85)</span></span>
<span class="line"><span>The small-signal model with these conditions is illustrated in Fig. 13.20. Nulling ˆvx causes no</span></span>
<span class="line"><span>ampliﬁed error signal to reach the output ˆv via the forward path of the loop: nulling ˆvx also nulls</span></span>
<span class="line"><span>ˆd, and hence the ˆd sources of the power stage model are also zero. As illustrated in Fig. 13.20,</span></span>
<span class="line"><span>the secondary voltage of the ideal transformer model becomes zero.</span></span>
<span class="line"><span>The ˆvre f signal can nonetheless have a small inﬂuence on the output ˆv. With the assumption</span></span>
<span class="line"><span>that the op amp is ideal, its positive and negative input terminals are equal and hence ˆv−= ˆvre f .</span></span>
<span class="line"><span>The output voltage ˆv is related to ˆv−= ˆvre f through the voltage divider ratio</span></span>
<span class="line"><span>ˆv= ˆv− Zout</span></span>
<span class="line"><span>Zout+ Z1</span></span>
<span class="line"><span>(13.86)</span></span>
<span class="line"><span>where the converter open-loop output impedance is</span></span>
<span class="line"><span>Zout= R</span></span>
<span class="line"><span></span></span>
<span class="line"><span> 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sL</span></span>
<span class="line"><span>e (13.87)</span></span>
<span class="line"><span>and the feedback network impedance Z1 is given by Eq. (13.80). Hence, G0r is</span></span>
<span class="line"><span>G0r= Zout</span></span>
<span class="line"><span>Zout+ Z1</span></span>
<span class="line"><span>(13.88)</span></span>
<span class="line"><span>Thus, the direct forward transmission of the reference signal through the feedback path is</span></span>
<span class="line"><span>nonzero.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>532 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-140</span></span>
<span class="line"><span>-120</span></span>
<span class="line"><span>-100</span></span>
<span class="line"><span>-80</span></span>
<span class="line"><span>-60</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Gr</span></span>
<span class="line"><span>G r</span></span>
<span class="line"><span>G0r</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>Phase, degrees</span></span>
<span class="line"><span>Gr</span></span>
<span class="line"><span>G r</span></span>
<span class="line"><span>G0r</span></span>
<span class="line"><span>Fig. 13.21 Magnitude and phase Bode plots of the transfer functions G∞r, G0r,a n d Gr for the buck</span></span>
<span class="line"><span>regulator example. Dashed curves: ideal reference-to-output gain G∞r and direct forward transmission</span></span>
<span class="line"><span>through feedback path G0r. Solid curves: reference-to-output transfer function Gr</span></span>
<span class="line"><span>Figure 13.21 contains plots of the transfer functions G∞r, G0r, and Gr for the power stage</span></span>
<span class="line"><span>element values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. Speciﬁcally,</span></span>
<span class="line"><span>the power stage parameters are L = 50μH, C = 500μF, R = 3Ω, Vg = 28 V, V = 15 V.</span></span>
<span class="line"><span>The compensator and feedback circuit parameters are Vre f = 5V , VM = 4V , R1 = 11 kΩ,</span></span>
<span class="line"><span>R2= 85 kΩ, R3= 120 kΩ, R4= 47 kΩ, C2= 1.1n F ,C3= 2.7 nF. It can be seen that the transfer</span></span>
<span class="line"><span>function Gr(s) follows the ideal gainG∞r(s) from dc up to the 5 kHz bandwidth of the feedback</span></span>
<span class="line"><span>loop, in accordance with the description of Sect. 9.2.2. The direct forward transmission term</span></span>
<span class="line"><span>G0r is small and does not inﬂuence Gr(s) at frequencies below half of the switching frequency.</span></span>
<span class="line"><span>The ideal forward gain from ˆvg to the output ˆv is</span></span>
<span class="line"><span>G∞g(s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvre f=0, ˆiload=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.89)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator 533</span></span>
<span class="line"><span>Fig. 13.22 Determination of G∞g</span></span>
<span class="line"><span>The small-signal model with these conditions is illustrated in Fig. 13.22. Nulling ˆvy in the pres-</span></span>
<span class="line"><span>ence of ˆvre f = 0 causes ˆv−to be zero. Consequently the voltage across R4 and also across the</span></span>
<span class="line"><span>R3 −C3 branches are zero, and so there is no current through those elements. This implies</span></span>
<span class="line"><span>that there is no current through the R1−R2−C2 branch, and hence no voltage across it either.</span></span>
<span class="line"><span>Therefore the output voltage ˆv must be zero. So</span></span>
<span class="line"><span>G∞g= 0 (13.90)</span></span>
<span class="line"><span>In the limit of inﬁnite loop gain, ˆvg variations do not inﬂuence the output ˆv.</span></span>
<span class="line"><span>The gain G0g is the open-loop disturbance transfer function from ˆvg to ˆv, and is deﬁned as</span></span>
<span class="line"><span>G0g(s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvre f=0, ˆiload=0</span></span>
<span class="line"><span>ˆvx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.91)</span></span>
<span class="line"><span>The small-signal model with these conditions is illustrated in Fig. 13.23. Nulling ˆvx causes ˆd to</span></span>
<span class="line"><span>be zero. Consequently the voltage at the output of the dc transformer model is equal to Mˆvg.</span></span>
<span class="line"><span>The output voltage is equal to this voltage multiplied by the ﬁlter transfer function He(s). So</span></span>
<span class="line"><span>G0g= MHe(s) (13.92)</span></span>
<span class="line"><span>The gain G0g coincides with the open-loop line-to-output transfer function Gvg(s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>534 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Fig. 13.23 Determination of G0g</span></span>
<span class="line"><span>Figure 13.24 contains plots of the transfer functions G0g and Gg, again for the power stage</span></span>
<span class="line"><span>element values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. The closed-loop</span></span>
<span class="line"><span>line-to-output transfer function Gg(s) follows the open-loop disturbance transfer functionGvg=</span></span>
<span class="line"><span>G0g above the crossover frequency of 5 kHz, as discussed in Sect. 9.2.1. Below the crossover</span></span>
<span class="line"><span>frequency, Gg is reduced by the factor 1/(1+ T).</span></span>
<span class="line"><span>The quantity Z∞o is the regulator output impedance under the conditions that the feedback</span></span>
<span class="line"><span>loop operates ideally, with zero error. Z∞o is deﬁned as:</span></span>
<span class="line"><span>Z∞o(s)=−ˆv</span></span>
<span class="line"><span>ˆiload</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0, ˆvg=0</span></span>
<span class="line"><span>ˆvy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.93)</span></span>
<span class="line"><span>Figure 13.25 illustrates the small-signal model under these conditions. With ˆvre f set to zero and</span></span>
<span class="line"><span>with ˆvy nulled, ˆv−is also nulled. Then there is no voltage across the elements R4, R3,o r C3,</span></span>
<span class="line"><span>and hence the currents through these elements are zero. Consequently the currents through the</span></span>
<span class="line"><span>elements R1, R2, and C2 are zero, and hence the voltages across these elements are also nulled.</span></span>
<span class="line"><span>Therefore ˆv= ˆv−= 0. So the regulator ideal output impedance is</span></span>
<span class="line"><span>Z∞o(s)=−0</span></span>
<span class="line"><span>ˆiload</span></span>
<span class="line"><span>= 0 (13.94)</span></span>
<span class="line"><span>When the regulator operates ideally, load current disturbances do not aﬀect the output voltage.</span></span>
<span class="line"><span>The quantity Z0o is the regulator output impedance under open-loop conditions, with ˆvx set</span></span>
<span class="line"><span>to zero. Z0o is deﬁned as:</span></span>
<span class="line"><span>Z0o(s)=−ˆv</span></span>
<span class="line"><span>ˆiload</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0, ˆvg=0</span></span>
<span class="line"><span>ˆvx=0</span></span>
<span class="line"><span>(13.95)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator 535</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-140</span></span>
<span class="line"><span>-120</span></span>
<span class="line"><span>-100</span></span>
<span class="line"><span>-80</span></span>
<span class="line"><span>-60</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Gg</span></span>
<span class="line"><span>G0g</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>Phase, degrees</span></span>
<span class="line"><span>Gg</span></span>
<span class="line"><span>G0g</span></span>
<span class="line"><span>Fig. 13.24 Magnitude and phase Bode plots of the transfer functions G0g and Gg for the buck regulator</span></span>
<span class="line"><span>example. Dashed curves: disturbance transfer functionG0g= Gvg. Solid curves: closed-loop line-to-output</span></span>
<span class="line"><span>transfer function Gg</span></span>
<span class="line"><span>Figure 13.26 illustrates the small-signal model under these conditions. With ˆvre f set to zero and</span></span>
<span class="line"><span>with ˆvx set to zero, ˆd is zero and the transformer voltage is zero. Since ˆvre f is zero, ˆv−= 0. The</span></span>
<span class="line"><span>output impedance is then</span></span>
<span class="line"><span>Z0o(s)=−ˆv</span></span>
<span class="line"><span>ˆiload</span></span>
<span class="line"><span>= Zout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>1 (13.96)</span></span>
<span class="line"><span>where Zout is the power stage output impedance given by Eq. ( 13.87) and Z1 is the feedback</span></span>
<span class="line"><span>network impedance given by Eq. (13.80). In the usual case where Zout is much smaller than Z1,</span></span>
<span class="line"><span>this expression reduces to Zout.</span></span>
<span class="line"><span>Figure 13.27 contains plots of the transfer functions Z0o and Zo for the power stage element</span></span>
<span class="line"><span>values of Sect. 9.5.4 and the compensator circuit values of Fig. 15.29. The closed-loop output</span></span>
<span class="line"><span>impedance Zo(s) follows the open-loop output impedance Zout = Z0o above the crossover fre-</span></span>
<span class="line"><span>quency of 5 kHz, as discussed in Sect. 9.2.1. Below the crossover frequency, Zo is reduced by</span></span>
<span class="line"><span>the factor 1/(1+ T) relative to Zout.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>536 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Fig. 13.25 Determination of ideal output impedance Z∞o</span></span>
<span class="line"><span>Fig. 13.26 Determination of open-loop output impedance Z0o</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator 537</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-140</span></span>
<span class="line"><span>-120</span></span>
<span class="line"><span>-100</span></span>
<span class="line"><span>-80</span></span>
<span class="line"><span>-60</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>Z0o</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>180Phase, degrees</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>Z0o</span></span>
<span class="line"><span>Fig. 13.27 Magnitude and phase Bode plots of the transfer functions Z0o and Zo for the buck regulator</span></span>
<span class="line"><span>example. Dashed curves: disturbance transfer functionZ0o= Zout. Solid curves: closed-loop line-to-output</span></span>
<span class="line"><span>transfer function Zo</span></span>
<span class="line"><span>The loop gain T(s)i s</span></span>
<span class="line"><span>T(s)= ˆvy</span></span>
<span class="line"><span>ˆvx</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvre f=0, ˆiload=0</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>(13.97)</span></span>
<span class="line"><span>The small-signal model with these conditions is illustrated in Fig.13.28. To ﬁnd T(s), we begin</span></span>
<span class="line"><span>with the signal ˆvx, and ﬁnd how it propagates around the loop to the ˆ vy point. Under these</span></span>
<span class="line"><span>conditions, the output voltage ˆv is equal to ˆvx multiplied by the PWM gain (1/VM) and by the</span></span>
<span class="line"><span>converter control-to-output gain Gvd(s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>538 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Fig. 13.28 Determination of loop gain T(s)</span></span>
<span class="line"><span>ˆv= Gvd(s)</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆvx (13.98)</span></span>
<span class="line"><span>By solution of the model of Fig. 13.28, the power stage control-to-output transfer function is</span></span>
<span class="line"><span>Gvd(s)= e(s)MHe(s) (13.99)</span></span>
<span class="line"><span>with He(s) equal to the transfer function of the canonical model Le–C output ﬁlter.</span></span>
<span class="line"><span>With ˆvre f set to zero, the ideal op amp causes ˆv−= 0, and hence there is no current through</span></span>
<span class="line"><span>R4. The transfer function from ˆv to ˆvy is given by the inverting ampliﬁer formula:</span></span>
<span class="line"><span>ˆvy</span></span>
<span class="line"><span>ˆv = Z3</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>(13.100)</span></span>
<span class="line"><span>where Z1 i sg i v e nb yE q .(13.80) and Z3 is given by Eq. (13.82). The loop gain is the product of</span></span>
<span class="line"><span>Eqs. (13.98) and (13.100):</span></span>
<span class="line"><span>T(s)= Gvd(s)</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>)⎦Z3</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(13.101)</span></span>
<span class="line"><span>Figure 13.29 contains plots of the loop gain T(s) for the power stage element values of</span></span>
<span class="line"><span>Sect. 9.5.4 and the compensator circuit values of Fig. 15.29.</span></span>
<span class="line"><span>In summary, the closed-loop transfer function from the reference ˆvre f to the output ˆv is</span></span>
<span class="line"><span>Gr(s)=</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3</span></span>
<span class="line"><span>Z1+</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Z3</span></span>
<span class="line"><span>) T</span></span>
<span class="line"><span>1+ T+ Zout</span></span>
<span class="line"><span>Z1+ Zout</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (13.102)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator 539</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20</span></span>
<span class="line"><span>40</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>Magnitude, dB</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>101 102 103 104</span></span>
<span class="line"><span>Frequency, Hz</span></span>
<span class="line"><span>-270</span></span>
<span class="line"><span>-225</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Phase, degrees</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>Fig. 13.29 Magnitude and phase Bode plots of the loop gain T(s) for the buck regulator example</span></span>
<span class="line"><span>The closed-loop transfer function from input voltage disturbances ˆvg to the output ˆv is</span></span>
<span class="line"><span>Gg(s)= MHe</span></span>
<span class="line"><span>1+ T (13.103)</span></span>
<span class="line"><span>The closed-loop output impedance is</span></span>
<span class="line"><span>Zo=</span></span>
<span class="line"><span>Zout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (13.104)</span></span>
<span class="line"><span>with T given by Eq. (13.101). The canonical model parameters of Table 7.1 for the buck con-</span></span>
<span class="line"><span>verter are substituted as appropriate into the above expressions.</span></span>
<span class="line"><span>This closed-loop regulator example includes three independent sources: the reference ˆ vre f</span></span>
<span class="line"><span>and disturbances ˆvg and ˆiload. Superposition is employed to apply the feedback theorem three</span></span>
<span class="line"><span>times, once for each independent input, and we ﬁnd a G0 and G∞term associated with each</span></span>
<span class="line"><span>source. The G∞r term has the physical interpretation of the ideal closed-loop gain from the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>540 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>reference to the output, and corresponds to the 1/H term identiﬁed in Sect. 9.2.2.T h eG0r term</span></span>
<span class="line"><span>has the physical interpretation of direct forward transmission from ˆ vre f through the feedback</span></span>
<span class="line"><span>path to the output. The disturbance transfer functionG0g is the open-loop line-to-output transfer</span></span>
<span class="line"><span>function, and coincides with Gvg(s) of the open-loop converter. In this example, G∞g is zero:</span></span>
<span class="line"><span>when the feedback loop operates ideally, no ˆvg disturbances reach the output.</span></span>
<span class="line"><span>The feedback theorem provides a general way to deﬁne and determine the loop gain T.</span></span>
<span class="line"><span>Although we have found three closed-loop transfer functions from the three independent sources</span></span>
<span class="line"><span>to the output, there is a single physical feedback loop in the system, and a single expression for</span></span>
<span class="line"><span>the loop gain.</span></span>
<span class="line"><span>13.5 Summary of Key Points</span></span>
<span class="line"><span>1. The Feedback Theorem employs null double injection and linear superposition to determine</span></span>
<span class="line"><span>closed-loop gains and other important transfer functions of a feedback circuit, without need</span></span>
<span class="line"><span>to break the circuit into blocks that are noninteracting and unidirectional. An ideal injec-</span></span>
<span class="line"><span>tion point is identiﬁed, and then certain “thought experiments” are performed that lead to</span></span>
<span class="line"><span>derivation of analytical expressions for the important transfer functions of the closed-loop</span></span>
<span class="line"><span>circuit.</span></span>
<span class="line"><span>2. A given closed-loop gain G(s) is expressed in terms of an ideal gain G</span></span>
<span class="line"><span>∞(the limiting</span></span>
<span class="line"><span>transfer function with inﬁnite loop gain), a gain G0 (the limiting transfer function for zero</span></span>
<span class="line"><span>loop gain), and the loop gain T. The Feedback Theorem provides a simpliﬁed framework</span></span>
<span class="line"><span>for deriving these quantities.</span></span>
<span class="line"><span>3. An operational ampliﬁer circuit intended for use as a PD compensator is analyzed using</span></span>
<span class="line"><span>the Feedback Theorem. In this example, the G∞gain is found to be the transfer function</span></span>
<span class="line"><span>when the op amp is ideal. The G0 gain arises from direct forward transmission of the input</span></span>
<span class="line"><span>signal through the feedback path. The actual transfer function G is found to deviate signif-</span></span>
<span class="line"><span>icantly from G∞at high frequencies where the op amp has insu ﬃcient internal gain; this</span></span>
<span class="line"><span>can signiﬁcantly degrade the behavior of the PD compensator.</span></span>
<span class="line"><span>4. A closed-loop buck converter with PID compensator circuit is analyzed via the Feedback</span></span>
<span class="line"><span>Theorem, to derive the closed-loop transfer functions from the reference input and line input</span></span>
<span class="line"><span>to the output, as well as the closed-loop output impedance. This example illustrates how</span></span>
<span class="line"><span>the Feedback Theorem is useful for analyzing closed-loop disturbance transfer functions as</span></span>
<span class="line"><span>well as the reference-to-output transfer function.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>13.1 A feedback ampliﬁer is shown in Fig. 13.30 including voltage injection vz suitable for</span></span>
<span class="line"><span>application of the Feedback Theorem. The objective in this problem is to solve for the</span></span>
<span class="line"><span>ampliﬁer gain</span></span>
<span class="line"><span>G= vo</span></span>
<span class="line"><span>vi</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>vz=0</span></span>
<span class="line"><span>using the Feedback Theorem. Derive expressions forG∞, T, G0, and Tn, and show that the</span></span>
<span class="line"><span>reciprocity relationship holds. Your expressions should be in terms of the circuit parameter</span></span>
<span class="line"><span>values R1, R2, C, Ro, Ao.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.5 Summary of Key Points 541</span></span>
<span class="line"><span>Fig. 13.30 Feedback ampliﬁer of Problem 13.1</span></span>
<span class="line"><span>13.2 A feedback ampliﬁer is shown in Fig. 13.31 including current injection iz suitable for</span></span>
<span class="line"><span>application of the Feedback Theorem. The objective in this problem is to solve for the</span></span>
<span class="line"><span>ampliﬁer gain</span></span>
<span class="line"><span>G= vo</span></span>
<span class="line"><span>vi</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>iz=0</span></span>
<span class="line"><span>using the Feedback Theorem. Derive expressions forG∞, T, G0, and Tn, and show that the</span></span>
<span class="line"><span>reciprocity relationship holds. Your expressions should be in terms of the circuit parameter</span></span>
<span class="line"><span>values R1, C, and gm.</span></span>
<span class="line"><span>Fig. 13.31 Feedback ampliﬁer of Problem 13.2</span></span>
<span class="line"><span>13.3 Figure 13.32 shows a PI compensator circuit in the closed-loop switching voltage regu-</span></span>
<span class="line"><span>lator of Problem 9.5. The PI compensator is constructed around an op amp provided in</span></span>
<span class="line"><span>a standard PWM controller chip. The input to the compensator is the regulator output</span></span>
<span class="line"><span>voltage v, and the output of the compensator is voltage vc. The reference voltage Vre f is</span></span>
<span class="line"><span>constant. The purpose of this problem is to show how the Feedback Theorem can be used</span></span>
<span class="line"><span>in the design of the PI compensator circuit. The closed-loop transfer function of interest is</span></span>
<span class="line"><span>G(s)= ˆvc</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>542 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Fig. 13.32 PI compensator constructed around a transconductance ampliﬁer, Problem 13.3</span></span>
<span class="line"><span>(a) Assuming the op amp in Fig. 13.32 is ideal, show that</span></span>
<span class="line"><span>G∞(s)= ˆvc</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ideal op−amp</span></span>
<span class="line"><span>= G∞∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ω1</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>and derive expressions for the salient features of G∞(s) in terms of R1, R2, R3, C3.</span></span>
<span class="line"><span>Compute the numerical values for G∞∞and f1. Note that the assumption that the op</span></span>
<span class="line"><span>amp is ideal (in a negative-feedback circuit) is equivalent to the assumption that the</span></span>
<span class="line"><span>error signal is nulled in the Feedback Theorem terms. Hence, the transfer function</span></span>
<span class="line"><span>found in this part of the problem is equal to G</span></span>
<span class="line"><span>∞of the Feedback Theorem.</span></span>
<span class="line"><span>Assuming G(s)≈G∞(s), the closed-loop voltage regulator shown in Problem 9.5 should</span></span>
<span class="line"><span>be stable with adequate phase margin. A designer made this assumption, built the circuit,</span></span>
<span class="line"><span>and expected to obtain stable operation with well regulated output voltage. In lab experi-</span></span>
<span class="line"><span>ments, however, the switched-mode voltage regulator is found to be unstable, producing</span></span>
<span class="line"><span>oscillating voltages and currents. Knowing that you are familiar with the Feedback Theo-</span></span>
<span class="line"><span>rem, the designer asks you for assistance.</span></span>
<span class="line"><span>Looking through the PWM controller datasheet, you realize that the op amp provided</span></span>
<span class="line"><span>is not really a standard op amp with a large voltage gain and a low output impedance</span></span>
<span class="line"><span>but instead a transconductance ampliﬁer, which can be modeled as a controlled current</span></span>
<span class="line"><span>source, as shown in Fig. 13.33.</span></span>
<span class="line"><span>Fig. 13.33 Model of the transconductance ampliﬁer in Problem 13.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.5 Summary of Key Points 543</span></span>
<span class="line"><span>Furthermore, you ﬁnd that the transconductance gm of the ampliﬁer can be as low as</span></span>
<span class="line"><span>gmmin = 100μA/V and as high as gmmax = 1m A/V due to process and temperature</span></span>
<span class="line"><span>variations. You realize that the problem is well suited for application of the Feedback</span></span>
<span class="line"><span>Theorem and you proceed in several steps to address the stability problem encountered by</span></span>
<span class="line"><span>the designer.</span></span>
<span class="line"><span>(b) Using the current injection technique, ﬁnd analytical expressions for Go, T, and Tn</span></span>
<span class="line"><span>in the PI compensator of Fig. 13.32, taking into account the ampliﬁer model shown</span></span>
<span class="line"><span>in Fig. 13.33. Express the transfer functions in the standard factored pole-zero forms,</span></span>
<span class="line"><span>and derive expressions for the salient features in terms ofR1, R2, R3, C3, and gm. Show</span></span>
<span class="line"><span>that the reciprocity relationship holds.</span></span>
<span class="line"><span>(c) Using the results of part (b), derive an expression for the closed-loop transfer function</span></span>
<span class="line"><span>G(s), and show that G(s) can be written as</span></span>
<span class="line"><span>G(s)= ˆvc</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>= G′</span></span>
<span class="line"><span>∞∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ω′</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Calculate and put in a table numerical values for G′</span></span>
<span class="line"><span>∞∞and f′</span></span>
<span class="line"><span>1 for the two extreme</span></span>
<span class="line"><span>values of gm, gmmin and gmmax, and compare these values to G∞∞and f1 found in</span></span>
<span class="line"><span>part (a). Explain why the switched-mode voltage regulator using the compensator of</span></span>
<span class="line"><span>Fig. 13.32 may become unstable.</span></span>
<span class="line"><span>(d) Suggest how to change the component values in the PI compensator in Fig. 13.32 so</span></span>
<span class="line"><span>that G∞(s) remains the same as found in part (a), and so that the compensator gainG(s)</span></span>
<span class="line"><span>closely approximates the ideal G∞(s) for all possible values of the transconductance</span></span>
<span class="line"><span>gm.</span></span>
<span class="line"><span>13.4 A model of an op amp is shown in Fig. 13.7b. In the model, Ro= 100Ω, and</span></span>
<span class="line"><span>Gop (s)= Ao</span></span>
<span class="line"><span>1⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>where Ao= 105→100 dB, f1= 10 Hz, and f2= 1M H z .</span></span>
<span class="line"><span>a) The op amp is used to construct closed-loop ampliﬁers with three di ﬀerent ideal</span></span>
<span class="line"><span>closed-loop gains: (i) G∞= 1, G∞=−1, and (iii) G∞= 10. Sketch circuit diagrams</span></span>
<span class="line"><span>of these three closed-loop ampliﬁers and choose resistance values.</span></span>
<span class="line"><span>b) For each of the closed-loop ampliﬁers considered in part (a), sketch the magnitude</span></span>
<span class="line"><span>and phase responses of the loop gain T(s) and determine numerical values for the</span></span>
<span class="line"><span>crossover frequency and the phase margin.</span></span>
<span class="line"><span>c) For each of the closed-loop ampliﬁers considered in part (a), derive an expression</span></span>
<span class="line"><span>for the closed-loop gain G(s) using the Feedback Theorem. Your expression should</span></span>
<span class="line"><span>be in the standard normalized form. Sketch the magnitude and phase responses and</span></span>
<span class="line"><span>annotate the plots with salient features of G(s).</span></span>
<span class="line"><span>13.5 A point-of-load (POL) voltage regulator using a synchronous buck converter is shown in</span></span>
<span class="line"><span>Fig. 13.34. Losses can be neglected except for the losses due to the inductor resistance RL</span></span>
<span class="line"><span>and the capacitor equivalent series resistance Resr . The PID compensator is constructed</span></span>
<span class="line"><span>around an op amp. In this problem, you may assume that the op amp has ideal charac-</span></span>
<span class="line"><span>teristics. The pulse-width modulator has a very large input resistance, so that a voltage</span></span>
<span class="line"><span>injection source ˆvz can be ideally inserted between the compensator and the PWM.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>544 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Fig. 13.34 Synchronous buck voltage regulator with a PID compensator, Problems 13.5 and 13.6</span></span>
<span class="line"><span>a) Derive an expression for the loop gain T(s). The expression should be in standard</span></span>
<span class="line"><span>normalized form. Salient features of T(s) should be expressed in terms of the circuit</span></span>
<span class="line"><span>parameters shown in Fig. 13.34. Plot the magnitude and phase responses of the loop</span></span>
<span class="line"><span>gain, and determine numerical values for the crossover frequency fc and the phase</span></span>
<span class="line"><span>marginϕm.</span></span>
<span class="line"><span>b) In this part of the problem, the objective is to determine the closed-loop output</span></span>
<span class="line"><span>impedance Zo(s)=−ˆv/ˆiload of the POL voltage regulator using the Feedback The-</span></span>
<span class="line"><span>orem. Derive expressions for Z∞o, Z0o, and the null loop gain Tnz in standard normal-</span></span>
<span class="line"><span>ized forms. Show that the reciprocity relationship holds. Plot the magnitude and phase</span></span>
<span class="line"><span>responses of Zo(s).</span></span>
<span class="line"><span>c) In this part of the problem, the objective is to determine the closed-loop line-to-output</span></span>
<span class="line"><span>transfer function Gg(s)= ˆv/ˆvg using the Feedback Theorem. Derive expressions for</span></span>
<span class="line"><span>G∞g, G0g, and the null loop gain Tng in standard normalized forms. Show that the</span></span>
<span class="line"><span>reciprocity relationship holds. Plot the magnitude and phase responses of Gg(s).</span></span>
<span class="line"><span>d) In this part of the problem, the objective is to determine the closed-loop reference-</span></span>
<span class="line"><span>to-output response Gr(s)= ˆv/ˆvre f using the Feedback Theorem. Derive expressions</span></span>
<span class="line"><span>for G∞r, G0r, and the null loop gain Tnr in standard normalized forms. Show that the</span></span>
<span class="line"><span>reciprocity relationship holds. Plot the magnitude and phase responses of Gr(s).</span></span>
<span class="line"><span>e) Modify the PID compensator circuit so that T(s) remains exactly the same as found</span></span>
<span class="line"><span>in part (a), and so that the ideal reference-to-output response has unity gain at all</span></span>
<span class="line"><span>frequencies, i.e., so that G∞r= 1.</span></span>
<span class="line"><span>13.6 A model of the op amp used to construct the PID compensator in the voltage regulator of</span></span>
<span class="line"><span>Fig. 13.34 is shown in Fig. 13.7b. In the model, Ro= 0, and</span></span>
<span class="line"><span>Gop (s)= ωGBW</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.5 Summary of Key Points 545</span></span>
<span class="line"><span>where fGBW is the unity gain frequency, also referred to as the gain-bandwidth product</span></span>
<span class="line"><span>of the op amp. The objective in this problem is to examine how ﬁnite fGBW of the op</span></span>
<span class="line"><span>amp aﬀects closed-loop performance of the voltage regulator in Fig. 13.34. The transfer</span></span>
<span class="line"><span>function of interest is the PID compensator gain</span></span>
<span class="line"><span>Gc(s)=−ˆvc</span></span>
<span class="line"><span>ˆv</span></span>
<span class="line"><span>a) For the closed-loop ampliﬁer that implements the PID compensator, derive expres-</span></span>
<span class="line"><span>sions for the loop gain Tc(s), the ideal forward gain Gc∞, and the direct forward</span></span>
<span class="line"><span>transmission Gc0. The expressions should be in terms of the circuit parameters shown</span></span>
<span class="line"><span>in Fig. 13.34 and ωGBW . Overlay Bode plots of the magnitude and phase of Gc for</span></span>
<span class="line"><span>three diﬀerent values of fGBW :( i ) fGBW = 1 MHz, (ii) fGBW = 10 MHz, and (iii)</span></span>
<span class="line"><span>fGBW = 25 MHz.</span></span>
<span class="line"><span>b) Consider loop gain T(s) in the voltage regulator of Fig. 13.34, taking into account</span></span>
<span class="line"><span>Gc(s) found in part (a). Overlay Bode plots of the magnitude and phase ofT(s)f o rt h e</span></span>
<span class="line"><span>three diﬀerent values of fGBW considered in part (a). For each fGBW , calculate numeri-</span></span>
<span class="line"><span>cal values of the crossover frequency fc and the phase marginϕm, and compare to the</span></span>
<span class="line"><span>results obtained assuming an ideal op amp,i.e., assuming thatGc= Gc∞. Comment on</span></span>
<span class="line"><span>how large the gain-bandwidth product of the op amp should be so that the impact on</span></span>
<span class="line"><span>the closed-loop performance of the voltage regulator in Fig. 13.34 can be neglected.</span></span>
<span class="line"><span>13.7 Do Problem 9.7. Verify the result for the closed-loop transfer function ˆig(s)/ˆvre f (s)u s i n g</span></span>
<span class="line"><span>the Feedback Theorem. Then, using the Feedback Theorem, derive an expression for the</span></span>
<span class="line"><span>closed-loop input admittance</span></span>
<span class="line"><span>Y</span></span>
<span class="line"><span>g=</span></span>
<span class="line"><span>ˆig</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>Plot the magnitude and phase responses of Yg. In what range of frequencies is the magni-</span></span>
<span class="line"><span>tude of Yg approximately equal to the ideal Yg∞.</span></span>
<span class="line"><span>13.8 Do Problem 9.8. Then ﬁnd the closed-loop output impedance Zo using the Feedback</span></span>
<span class="line"><span>Theorem and verify that the speciﬁcations are met: magnitude of the closed-loop output</span></span>
<span class="line"><span>impedance should be less than 0.2Ωover the entire frequency range 0 to 20 kHz.</span></span>
<span class="line"><span>13.9 Do Problem 9.9. Then, using the Feedback Theorem, derive an expression for the closed-</span></span>
<span class="line"><span>loop reference-to-output response Gr = ˆv/ˆvre f . Plot the magnitude and phase responses</span></span>
<span class="line"><span>of Gr. Over what range of frequencies is the magnitude of Gr approximately equal to the</span></span>
<span class="line"><span>ideal Gr∞?</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{u as __pageData,f as default};
