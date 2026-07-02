import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const d=JSON.parse('{"title":"第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 515-534 > Chunk ID: `chapter-13-part-1`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/034-chapter-13-part-1.md","filePath":"content/power/fundamentals-work/chunks/034-chapter-13-part-1.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/034-chapter-13-part-1.md"};function i(c,n,t,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第13章part-1-13-techniques-of-design-oriented-analysis-the-feedback-theorem" tabindex="-1">第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem <a class="header-anchor" href="#第13章part-1-13-techniques-of-design-oriented-analysis-the-feedback-theorem" aria-label="Permalink to &quot;第13章part 1 - 13 Techniques of Design-Oriented Analysis: The Feedback Theorem&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 515-534<br> Chunk ID: <code>chapter-13-part-1</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>13</span></span>
<span class="line"><span>Techniques of Design-Oriented Analysis: The</span></span>
<span class="line"><span>Feedback Theorem</span></span>
<span class="line"><span>13.1 Introduction to Part IV</span></span>
<span class="line"><span>Part IV of this text develops analytical tools needed to understand and design larger power</span></span>
<span class="line"><span>electronic systems. It builds on the basic modeling and analysis techniques developed in PartII</span></span>
<span class="line"><span>to analyze and simulate complex feedback circuits, including those having input EMI ﬁlters,</span></span>
<span class="line"><span>current-mode control, or digital control.</span></span>
<span class="line"><span>As introduced in Chap. 8, Design-Oriented Analysis (D-OA) is a collection of analytical</span></span>
<span class="line"><span>tools that aid the analysis of complex circuits and systems, with the goal of deriving tractable</span></span>
<span class="line"><span>equations that are useful for design. Part IV covers three more advanced techniques of D-OA</span></span>
<span class="line"><span>that are based on linear superposition and the null double injection analysis technique. The</span></span>
<span class="line"><span>goal of these techniques is the further development of analytical tools that aid in the design of</span></span>
<span class="line"><span>complex analog systems, including development of additional approximation methods and of</span></span>
<span class="line"><span>more powerful analytical methods.</span></span>
<span class="line"><span>The closed-loop switching regulator block diagram studied in Sect. 9.1 employs idealized</span></span>
<span class="line"><span>blocks that do not explicitly represent input and output impedances or bidirectional signal ﬂow.</span></span>
<span class="line"><span>While this often is a useful approach, there are cases where interactions between circuit ele-</span></span>
<span class="line"><span>ments are not easily characterized as unidirectional blocks that do not signiﬁcantly load each</span></span>
<span class="line"><span>other. Middlebrook’s General Feedback Theorem [106] is a general technique that allows de-</span></span>
<span class="line"><span>termination of loop gains and other important transfer functions of a circuit, without need for</span></span>
<span class="line"><span>identiﬁcation of blocks. This technique can be viewed as a generalization of the loop gain mea-</span></span>
<span class="line"><span>surement techniques described in Sect. 9.6, to perform analytical “thought experiments” to ﬁnd</span></span>
<span class="line"><span>the transfer functions obtained by null double injection in the feedback circuit.</span></span>
<span class="line"><span>The single-loop version of the feedback theorem is derived in Sect. 13.2, based on linear</span></span>
<span class="line"><span>superposition and null double injection. Two common circuit examples are then examined. The</span></span>
<span class="line"><span>eﬀect of the bandwidth of a practical op amp on the behavior of a PD compensator circuit is</span></span>
<span class="line"><span>determined in Sect. 13.3. The feedback theorem is employed to ﬁnd the closed-loop transfer</span></span>
<span class="line"><span>functions of a buck regulator in Sect. 13.4. This analysis is extended in Chap. 17 to examine</span></span>
<span class="line"><span>the eﬀect of an input EMI ﬁlter on a buck regulator, and in Chap.18 to examine the eﬀect of an</span></span>
<span class="line"><span>EMI ﬁlter on a current-mode regulator system.</span></span>
<span class="line"><span>Averaged switch modeling is a subset of the subject of averaged converter modeling, and</span></span>
<span class="line"><span>leads to results that are equivalent to the models developed in Chap. 8. This technique is par-</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_13</span></span>
<span class="line"><span>509</span></span>
<span class="line"><span></span></span>
<span class="line"><span>510 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>ticularly well suited to SPICE-based simulation of converters, and is developed in Chap. 14.</span></span>
<span class="line"><span>Averaged switch modeling also exposes the fundamental direct and indirect power conversion</span></span>
<span class="line"><span>mechanisms that are inherent in high-eﬃciency electronic power conversion circuits. Averaged</span></span>
<span class="line"><span>switch modeling is extended to ac modeling of the discontinuous conduction mode in Chap.15.</span></span>
<span class="line"><span>The Extra Element Theorem exposes how a known transfer function is changed by addition</span></span>
<span class="line"><span>of a new network element; this theorem is introduced in Chap. 16. A classic application of the</span></span>
<span class="line"><span>EET is the addition of an input EMI ﬁlter to a closed-loop switching regulator, and damping of</span></span>
<span class="line"><span>this ﬁlter so that it does not degrade regulator performance and stability. Input ﬁlter analysis and</span></span>
<span class="line"><span>design is covered in Chap. 17.T h en–Extra Element Theorem (n–EET) is an extension of the</span></span>
<span class="line"><span>EET to cover the simultaneous addition of multiple elements to a circuit. A useful application</span></span>
<span class="line"><span>of the n–EET is the treatment of all reactive components as extra elements: a transfer function</span></span>
<span class="line"><span>can be written as a normalized rational fraction with little or no algebra.</span></span>
<span class="line"><span>Current-mode control is a popular approach to control of switching converters, in which the</span></span>
<span class="line"><span>peak transistor current replaces the duty cycle as the control variable that is commanded by the</span></span>
<span class="line"><span>compensator output. This approach contains an inherent inner current feedback loop, which can</span></span>
<span class="line"><span>improve control response but complicates the analysis. The Tan model [ 107] of current-model</span></span>
<span class="line"><span>control systems is developed in Chap. 18.</span></span>
<span class="line"><span>With the advent of high-performance low-cost microcontrollers, digital control of switch-</span></span>
<span class="line"><span>ing converters has proliferated. Digital control techniques for switching power converters are</span></span>
<span class="line"><span>introduced in Chap. 19. The basic issues of sampling, quantization, and discrete time eﬀects are</span></span>
<span class="line"><span>described and characterized. Techniques for design of digital compensators are developed.</span></span>
<span class="line"><span>13.2 The Feedback Theorem</span></span>
<span class="line"><span>Middlebrook’s Feedback Theorem is an application of the technique ofnull double injection,t o</span></span>
<span class="line"><span>derive the important transfer functions of a closed-loop feedback circuit. In the presence of the</span></span>
<span class="line"><span>input signal source, a test source is injected at a suitable point within the feedback circuit, and</span></span>
<span class="line"><span>key quantities are derived under conditions of setting one of the independent inputs to zero, or</span></span>
<span class="line"><span>of adjusting the two independent sources such that a dependent signal is nulled to zero. The null</span></span>
<span class="line"><span>double injection technique relies on linear superposition to ﬁnd the desired transfer functions</span></span>
<span class="line"><span>under these null or zeroed conditions. The feedback theorem is stated in Sect. 13.2.1, and is</span></span>
<span class="line"><span>derived in Sect. 13.2.2.</span></span>
<span class="line"><span>13.2.1 Basic Result</span></span>
<span class="line"><span>Consider the feedback circuit represented by Fig. 13.1. The independent input source of this</span></span>
<span class="line"><span>circuit is u</span></span>
<span class="line"><span>i(s) and the output is uo(s) (the generic symbol u is employed; these signals may be</span></span>
<span class="line"><span>voltages, currents, or other quantities). The circuit includes a feedback loop having loop gain</span></span>
<span class="line"><span>T(s); in the laboratory, we could measure this loop gain using the voltage injection method of</span></span>
<span class="line"><span>Sect. 9.6.1 or the current injection method of Sect. 9.6.2. V oltage or current injection using a</span></span>
<span class="line"><span>source uz(s) is also illustrated in Fig. 13.1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.2 The Feedback Theorem 511</span></span>
<span class="line"><span>y(s)+ +Input</span></span>
<span class="line"><span>ui(s)</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>uo(s)</span></span>
<span class="line"><span>Injection</span></span>
<span class="line"><span>uz(s)</span></span>
<span class="line"><span>Error</span></span>
<span class="line"><span>signal ux(s)</span></span>
<span class="line"><span>Loop gain T(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Fig. 13.1 A feedback circuit contains an input source ui(s), output uo(s), and injection source uz(s)</span></span>
<span class="line"><span>As noted in Sects. 9.6.1 and 9.6.2, the accuracy of the loop gain measured via the injec-</span></span>
<span class="line"><span>tion method depends on the degree of loading at the injection point, according to Eqs. ( 9.96)</span></span>
<span class="line"><span>and (9.100). In a practical laboratory experiment, some inaccuracy may be unavoidable. How-</span></span>
<span class="line"><span>ever, for the purposes of theoretical analysis, we may choose to inject at anideal injection point</span></span>
<span class="line"><span>where the impedance inequalities ( 9.96)o r( 9.100) are exactly satisﬁed. In such an analytical</span></span>
<span class="line"><span>“thought experiment,” we inject at a point immediately following an ideal voltage source or cur-</span></span>
<span class="line"><span>rent source whose value depends directly on the error signal of the feedback loop. Speciﬁcally,</span></span>
<span class="line"><span>we inject at an ideal point that satisﬁes both of the following criteria:</span></span>
<span class="line"><span>•A signal uz is injected directly after a source uy that is proportional to the error signal of the</span></span>
<span class="line"><span>feedback loop.</span></span>
<span class="line"><span>•The forward portion of the feedback loop must contain no parallel paths that allow the</span></span>
<span class="line"><span>ampliﬁed error signal to reach the output without passing through the ideal injection point.</span></span>
<span class="line"><span>If the injection point is shorted to ground, i.e.,i f ux = 0, then none of the ampliﬁed error</span></span>
<span class="line"><span>signal should reach the output.</span></span>
<span class="line"><span>Injection at an ideal point satisfying both of the above requirements will lead to an exact expres-</span></span>
<span class="line"><span>sion for the physical loop gain T(s).</span></span>
<span class="line"><span>The system of Fig. 13.1 contains two independent sources, ui(s) and the injection source</span></span>
<span class="line"><span>uz(s). There are three dependent quantities: the output uo(s), and the signals uy(s) and ux(s),</span></span>
<span class="line"><span>immediately before and after the injection source. Note the minus sign associated with uy in</span></span>
<span class="line"><span>Fig. 13.1: this is needed to cancel the minus sign associated with negative feedback and obtain</span></span>
<span class="line"><span>the correct loop gain polarity. We can deﬁne thought experiments in which an independent</span></span>
<span class="line"><span>source is set to zero, or in which a dependent source is nulled. These thought experiments allow</span></span>
<span class="line"><span>solution for the gains G∞(s), G0(s), T(s), and Tn(s), and ﬁnally for the overall transfer function:</span></span>
<span class="line"><span>G(s)= uo</span></span>
<span class="line"><span>ui</span></span>
<span class="line"><span>= G∞</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ G0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (13.1)</span></span>
<span class="line"><span>Each thought experiment is described in detail below.</span></span>
<span class="line"><span>Loop gain T(s): The input ui(s) is set to zero. In the presence of the injection source uz(s),</span></span>
<span class="line"><span>the circuit is solved for the loop gain T(s):</span></span>
<span class="line"><span>T(s)= uy(s)</span></span>
<span class="line"><span>ux(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>(13.2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>512 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>In practice, we assume that we know ux(s), and follow how it propagates around the feedback</span></span>
<span class="line"><span>loop to ﬁnd uy(s). When the above conditions for an ideal injection point are satisﬁed, then the</span></span>
<span class="line"><span>resulting T(s) will have the physical interpretation of the circuit loop gain.</span></span>
<span class="line"><span>Ideal forward gain G∞(s): In the presence of the input ui(s), the signal uz(s) is injected</span></span>
<span class="line"><span>and is adjusted as necessary to null uy(s). Under these conditions, referred to as null double</span></span>
<span class="line"><span>injection, the circuit is solved to ﬁnd uo(s). The ideal forward gain is</span></span>
<span class="line"><span>G∞(s)= uo(s)</span></span>
<span class="line"><span>ui(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>uy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.3)</span></span>
<span class="line"><span>The quantity uy is dependent on both independent sources ui and uz, and hence there is some</span></span>
<span class="line"><span>choice of ui and uz that will cause uy to be nulled to zero. Note that nulling uy is not the same</span></span>
<span class="line"><span>as shorting uy: the null condition takes place in the original circuit, and results from a speciﬁc</span></span>
<span class="line"><span>selection of values of the independent sources. Speciﬁcally, nulling uy eﬀectively also nulls the</span></span>
<span class="line"><span>error signal because of the conditions satisﬁed by the ideal injection point. HenceG∞is the gain</span></span>
<span class="line"><span>from the input ui to the output uo under the condition that the error signal is nulled to zero: the</span></span>
<span class="line"><span>output is perfectly regulated. It can be veriﬁed that the gain G(s)o fE q .( 13.1) reduces to G∞</span></span>
<span class="line"><span>under the condition that T→∞.</span></span>
<span class="line"><span>If the feedback circuit employs a conventional operational ampliﬁer, then nullingvy is equiv-</span></span>
<span class="line"><span>alent to employing the principle of virtual ground, in accordance with common practice in the</span></span>
<span class="line"><span>analysis of op amp circuits. In an op amp circuit with negative feedback,G∞coincides with the</span></span>
<span class="line"><span>gain when an ideal op amp is present.</span></span>
<span class="line"><span>Gain G0(s): In this thought experiment, null double injection is performed as follows: in the</span></span>
<span class="line"><span>presence of the input ui(s), the signal uz(s) is injected and is adjusted as necessary to null ux(s).</span></span>
<span class="line"><span>Under these conditions, the circuit is solved to ﬁnd uo(s). The gain G0 is</span></span>
<span class="line"><span>G0(s)= uo(s)</span></span>
<span class="line"><span>ui(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ux→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.4)</span></span>
<span class="line"><span>Note that nulling ux eﬀectively prevents the ampliﬁed error signal from reaching the output,</span></span>
<span class="line"><span>because of the conditions satisﬁed by the ideal injection point. Hence G0 is the gain from the</span></span>
<span class="line"><span>input ui to the output uo under the condition that the feedback loop does not control the output.</span></span>
<span class="line"><span>It can be veriﬁed that the gain G(s)o fE q .(13.1) reduces to G0 under the condition that T→0.</span></span>
<span class="line"><span>The physical interpretation of G0 depends on the quantity being analyzed. For an ampliﬁer</span></span>
<span class="line"><span>in which ui and uo are the input and output voltages, G0 has the interpretation of direct forward</span></span>
<span class="line"><span>transmission through the feedback path. With ux nulled, there is no way for the input signal to</span></span>
<span class="line"><span>reach the output via the forward path of the loop, and soG0 must result from signals reaching the</span></span>
<span class="line"><span>output by ﬂowing (backwards!) through the feedback path. In the case of disturbance transfer</span></span>
<span class="line"><span>functions such as a closed-loop Zout or Gvg,t h eG0 term represents the open-loop disturbance</span></span>
<span class="line"><span>transfer function.</span></span>
<span class="line"><span>Null loop gain Tn(s): In the presence of the input ui(s), the signal uz(s) is injected and</span></span>
<span class="line"><span>is adjusted as necessary to null the output uo(s). Note that this is another case of null double</span></span>
<span class="line"><span>injection. Under these conditions, the circuit is solved for the null loop gain Tn(s):</span></span>
<span class="line"><span>Tn(s)= uy(s)</span></span>
<span class="line"><span>ux(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.5)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.2 The Feedback Theorem 513</span></span>
<span class="line"><span>Solution for Tn is similar to the analysis of T, although it is usually somewhat simpler because</span></span>
<span class="line"><span>Tn does not depend on the load impedance. The null loop gainTn has less physical interpretation</span></span>
<span class="line"><span>than does T; it is related to the other above quantities according to the reciprocity relationship:</span></span>
<span class="line"><span>Tn(s)</span></span>
<span class="line"><span>T(s) = G∞(s)</span></span>
<span class="line"><span>G0(s) (13.6)</span></span>
<span class="line"><span>Hence one can solve for three of the four gains, whichever is easiest, then employ the reci-</span></span>
<span class="line"><span>procity relationship to ﬁnd the fourth gain. Finally, the overall closed-loop gain G(s) is found</span></span>
<span class="line"><span>by evaluation of Eq. (13.1).</span></span>
<span class="line"><span>13.2.2 Derivation</span></span>
<span class="line"><span>The basic results of Sect.13.2.1 can be derived through the use of superposition and null double</span></span>
<span class="line"><span>injection in the several thought experiments described.</span></span>
<span class="line"><span>+ ue(s) uo(s)ui(s)</span></span>
<span class="line"><span>iz</span></span>
<span class="line"><span>ixiy</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 13.2 Current injection iz = uz at an ideal injection point in a feedback loop. The original condition</span></span>
<span class="line"><span>is illustrated, in which iz is set to zero</span></span>
<span class="line"><span>Original condition: uz = 0, in the presence of the input ui. Figure 13.2 illustrates current</span></span>
<span class="line"><span>injection at an ideal injection point, with the original condition iz = 0. In this case, the closed-</span></span>
<span class="line"><span>loop forward gain G(s)i sg i v e nb y</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>uz=0</span></span>
<span class="line"><span>= Gui (13.7)</span></span>
<span class="line"><span>This is the deﬁnition ofG(s). Additionally, under this condition we can expressix and iy in terms</span></span>
<span class="line"><span>of the input ui:</span></span>
<span class="line"><span>ix</span></span>
<span class="line"><span>⏐⏐⏐⏐iz=0</span></span>
<span class="line"><span>=−iy</span></span>
<span class="line"><span>⏐⏐⏐⏐iz=0</span></span>
<span class="line"><span>= Ga(s)ui (13.8)</span></span>
<span class="line"><span>For the current injection illustrated in Fig. 13.2, ux = ix and uy = iy. Equation ( 13.8)i st h e</span></span>
<span class="line"><span>deﬁnition of Ga(s). Both G(s) and Ga(s) are unknowns at this point. It is desired to eliminate</span></span>
<span class="line"><span>Ga, and to solve for G.</span></span>
<span class="line"><span>Injection of uz: Figure 13.3 illustrates the case in which the input ui is set to zero, and</span></span>
<span class="line"><span>current injection iz = uz is applied. Under these conditions, we can express iy as some function</span></span>
<span class="line"><span>of ix as follows:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>514 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>iy</span></span>
<span class="line"><span>⏐⏐⏐⏐ui=0</span></span>
<span class="line"><span>= T(s) ix</span></span>
<span class="line"><span>⏐⏐⏐⏐ui=0</span></span>
<span class="line"><span>(13.9)</span></span>
<span class="line"><span>This is the deﬁnition of the loop gain T(s).</span></span>
<span class="line"><span>Under these conditions, we can also express the quantities ix and iy as functions of the</span></span>
<span class="line"><span>injection source iz, by writing the node equation at the injection point:</span></span>
<span class="line"><span>ix+ iy= iz (13.10)</span></span>
<span class="line"><span>By substitution of Eq. (13.9) into Eq. (13.10) and solution for ix and iy, we can ﬁnd that</span></span>
<span class="line"><span>+ ue(s) uo(s)ui(s)</span></span>
<span class="line"><span>iz</span></span>
<span class="line"><span>ixiy</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 13.3 Current injection iz= uz, with the input ui set to zero</span></span>
<span class="line"><span>ix</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>1+ T iz (13.11)</span></span>
<span class="line"><span>iy</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>= T</span></span>
<span class="line"><span>1+ T iz (13.12)</span></span>
<span class="line"><span>Also under these conditions, we can express the output uo in terms of the injection source iz as</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>= Gb(s) ix</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>= Gb</span></span>
<span class="line"><span>1+ T iz (13.13)</span></span>
<span class="line"><span>This is the deﬁnition of Gb. It is desired to eliminate Gb.</span></span>
<span class="line"><span>In the presence of both ui and uz= iz: we can employ superposition to express the depen-</span></span>
<span class="line"><span>dent quantities ix, iy, and uo as functions of the two independent inputs ui and iz.F o rix, we can</span></span>
<span class="line"><span>write</span></span>
<span class="line"><span>ix= ix</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>iz=0</span></span>
<span class="line"><span>+ ix</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>(13.14)</span></span>
<span class="line"><span>Substitution of Eqs. (13.8) and (13.11) into Eq. (13.14) leads to the general expression for ix:</span></span>
<span class="line"><span>ix= Ga ui+ 1</span></span>
<span class="line"><span>1+ T iz (13.15)</span></span>
<span class="line"><span>We can ﬁnd a similar expression for iy:</span></span>
<span class="line"><span>iy= iy</span></span>
<span class="line"><span>⏐⏐⏐⏐iz=0</span></span>
<span class="line"><span>+ iy</span></span>
<span class="line"><span>⏐⏐⏐⏐ui=0</span></span>
<span class="line"><span>(13.16)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.2 The Feedback Theorem 515</span></span>
<span class="line"><span>Substitution of Eqs. (13.8) and (13.12) into Eq. (13.16) leads to the general expression for iy:</span></span>
<span class="line"><span>iy=−Ga ui+ T</span></span>
<span class="line"><span>1+ T iz (13.17)</span></span>
<span class="line"><span>The output uo can be expressed via superposition as</span></span>
<span class="line"><span>uo= uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>iz=0</span></span>
<span class="line"><span>+ uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ui=0</span></span>
<span class="line"><span>(13.18)</span></span>
<span class="line"><span>Substitution of Eqs. (13.7) and (13.13) into Eq. (13.18) leads to the general expression for uo:</span></span>
<span class="line"><span>uo= Gu i+ Gb</span></span>
<span class="line"><span>1+ T iz (13.19)</span></span>
<span class="line"><span>Next, we perform the “thought experiments” described in Sect. 13.2.1.</span></span>
<span class="line"><span>+ ue(s) uo(s)ui(s)</span></span>
<span class="line"><span>iz</span></span>
<span class="line"><span>ixiy</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 13.4 In the presence of ui, adjust iz= uz to null iy</span></span>
<span class="line"><span>Null double injection, nulling iy: In the presence of the input ui, adjust iz as necessary to</span></span>
<span class="line"><span>null iy, as illustrated in Fig. 13.4. Under these conditions, Eq. (13.17) becomes</span></span>
<span class="line"><span>0=−Ga ui+ T</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>iy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.20)</span></span>
<span class="line"><span>and Eq. (13.19) becomes</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐⏐⏐iy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gu i+ Gb</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐⏐⏐iy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.21)</span></span>
<span class="line"><span>Elimination of iz from Eqs. (13.20) and (13.21) leads to</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>iy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gui+ GaGb</span></span>
<span class="line"><span>T ui (13.22)</span></span>
<span class="line"><span>We can deﬁne</span></span>
<span class="line"><span>G∞= G+ GaGb</span></span>
<span class="line"><span>T (13.23)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>516 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Hence</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>iy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= G∞ui (13.24)</span></span>
<span class="line"><span>In this thought experiment, we adjust iz as necessary to null iy. Since iy is directly proportional</span></span>
<span class="line"><span>to the error signal, nulling iy also nulls the error signal. Hence the gain G∞has the physical</span></span>
<span class="line"><span>interpretation of the ideal forward gain of the loop, with zero error.</span></span>
<span class="line"><span>Null double injection, nulling ix: In the presence of the input ui, adjust iz as necessary to</span></span>
<span class="line"><span>null ix, as illustrated in Fig. 13.5. Under these conditions, Eq. (13.15) becomes</span></span>
<span class="line"><span>0= Ga ui+ 1</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.25)</span></span>
<span class="line"><span>Equation (13.19) becomes</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gu i+ Gb</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.26)</span></span>
<span class="line"><span>Elimination of iz from Eqs. (13.25) and (13.26) leads to</span></span>
<span class="line"><span>ue(s) uo(s)ui(s)</span></span>
<span class="line"><span>iz</span></span>
<span class="line"><span>ixiy</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>G0(s)</span></span>
<span class="line"><span>Fig. 13.5 In the presence of ui, adjust iz= uz to null ix</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= Gui−GaGbui (13.27)</span></span>
<span class="line"><span>We can deﬁne</span></span>
<span class="line"><span>G0= G−GaGb (13.28)</span></span>
<span class="line"><span>Hence</span></span>
<span class="line"><span>uo</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ix→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= G0ui (13.29)</span></span>
<span class="line"><span>In this thought experiment, we adjust iz as necessary to null ix. Consequently, there is no trans-</span></span>
<span class="line"><span>mission of the ampliﬁed error signal through the forward path:ix= 0. In the system depicted in</span></span>
<span class="line"><span>Fig. 13.5, the only other way to obtain a nonzero output is via the feedback path, assuming that</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.2 The Feedback Theorem 517</span></span>
<span class="line"><span>signals are capable of propagating in either direction through this path. Hence, the gain G0 has</span></span>
<span class="line"><span>the physical interpretation of direct forward transmission through the feedback path.</span></span>
<span class="line"><span>In later examples, we will see that G0 may have the interpretation of the open-loop gain</span></span>
<span class="line"><span>from disturbances to the output. In these examples, the system architecture is more complex</span></span>
<span class="line"><span>than is envisioned in Fig. 13.5.</span></span>
<span class="line"><span>+ ue(s) uo(s)ui(s)</span></span>
<span class="line"><span>iz</span></span>
<span class="line"><span>ixiy</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Fig. 13.6 In the presence of ui, adjust iz= uz to null uo</span></span>
<span class="line"><span>Null double injection, nulling uo: In the presence of the input ui, adjust iz as necessary to</span></span>
<span class="line"><span>null uo, as illustrated in Fig. 13.6. Note that the output uo is not shorted. For example, in the</span></span>
<span class="line"><span>case where the output uo is a voltage, this null condition implies that zero current ﬂows through</span></span>
<span class="line"><span>the load impedance, and any current produced by the output block must ﬂow directly into the</span></span>
<span class="line"><span>feedback path.</span></span>
<span class="line"><span>Under these conditions, Eq. (13.19) becomes</span></span>
<span class="line"><span>0= Gu</span></span>
<span class="line"><span>i+ Gb</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐⏐⏐uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.30)</span></span>
<span class="line"><span>Equation (13.15) becomes</span></span>
<span class="line"><span>ix= Ga ui+ 1</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.31)</span></span>
<span class="line"><span>And Eq. (13.17) becomes</span></span>
<span class="line"><span>iy=−Ga ui+ T</span></span>
<span class="line"><span>1+ T iz</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.32)</span></span>
<span class="line"><span>We can eliminateui and iz</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>from the above equations, and solve for the relationship between</span></span>
<span class="line"><span>iy and ix under the condition that the output uo is nulled. After performing some algebra, we</span></span>
<span class="line"><span>obtain the following result:</span></span>
<span class="line"><span>iy</span></span>
<span class="line"><span>⏐⏐⏐⏐uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= TG+ GaGb</span></span>
<span class="line"><span>G−GaGb</span></span>
<span class="line"><span>ix</span></span>
<span class="line"><span>⏐⏐⏐⏐uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.33)</span></span>
<span class="line"><span>We can deﬁne</span></span>
<span class="line"><span>Tn= iy</span></span>
<span class="line"><span>ix</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>uo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= TG+ GaGb</span></span>
<span class="line"><span>G−GaGb</span></span>
<span class="line"><span>(13.34)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>518 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>The null loop gain T n is the transfer function from ix to iy under the condition that, in the</span></span>
<span class="line"><span>presence of the input ui, the injection source iz is adjusted to null the output uo. The null loop</span></span>
<span class="line"><span>gain Tn has less physical interpretation than the loop gain T; it is similar except that the eﬀects</span></span>
<span class="line"><span>of output loading are removed. Hence Tn is somewhat simpler to compute than T. The next</span></span>
<span class="line"><span>paragraphs give a simple way to relate T and Tn, and hence computation of Tn can be a useful</span></span>
<span class="line"><span>step in the computation of T.</span></span>
<span class="line"><span>Final result: With the above deﬁnitions, one can solve the feedback circuit for the quantities</span></span>
<span class="line"><span>G0, G∞, T, and Tn. One can determine the closed-loop transfer function G in terms of these</span></span>
<span class="line"><span>quantities, by eliminating the intermediate quantities Ga and Gb from the above equations and</span></span>
<span class="line"><span>solving for G in terms of G0, G∞, T, and Tn.F r o mE q .(13.28), we have</span></span>
<span class="line"><span>G0= G−GaGb (13.35)</span></span>
<span class="line"><span>From Eq. (13.23),</span></span>
<span class="line"><span>G∞= G+ GaGb</span></span>
<span class="line"><span>T (13.36)</span></span>
<span class="line"><span>which can be rewritten as</span></span>
<span class="line"><span>G∞T= TG+ GaGb (13.37)</span></span>
<span class="line"><span>From Eq. (13.34), we have</span></span>
<span class="line"><span>Tn= TG+ GaGb</span></span>
<span class="line"><span>G−GaGb</span></span>
<span class="line"><span>(13.38)</span></span>
<span class="line"><span>Substitution of Eqs. (13.35) and (13.37) into Eq. (13.38) leads to the reciprocity relationship</span></span>
<span class="line"><span>Tn= G∞T</span></span>
<span class="line"><span>G0</span></span>
<span class="line"><span>or Tn</span></span>
<span class="line"><span>T = G∞</span></span>
<span class="line"><span>G0</span></span>
<span class="line"><span>(13.39)</span></span>
<span class="line"><span>This important relationship implies that we need only to solve for three of the gains G0, G∞, T,</span></span>
<span class="line"><span>and Tn; the fourth can be found from Eq. ( 13.39). Further, if the three gains are expressed in</span></span>
<span class="line"><span>factored pole-zero form, then the fourth gain that results from Eq. (13.39) will also be factored.</span></span>
<span class="line"><span>Now eliminate the quantity GaGb from Eqs. (13.35) and (13.36), and use the result to solve</span></span>
<span class="line"><span>Eqs. (13.35)t o( 13.39)f o rG. After a few lines of algebra, the following result is obtained:</span></span>
<span class="line"><span>G= G∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>Tn</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>) = G∞</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ G0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (13.40)</span></span>
<span class="line"><span>This is the desired expression for the closed-loop gain G. Note that, for large loop gain,</span></span>
<span class="line"><span>G→G∞ for ∥T∥→∞ (13.41)</span></span>
<span class="line"><span>So G∞is the closed-loop forward gain with large loop gain. For small loop gain,</span></span>
<span class="line"><span>G→G0 for ∥T∥→0 (13.42)</span></span>
<span class="line"><span>Hence G0 is the closed-loop forward gain when the loop gain tends to zero.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit 519</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>++vin</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>R3</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>v+</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Gop(s) (v+ v )</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Fig. 13.7 Op amp PD compensator circuit example: (a) circuit schematic, (b) op amp equivalent circuit</span></span>
<span class="line"><span>model</span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit</span></span>
<span class="line"><span>As a ﬁrst example of application of the feedback theorem, let us analyze the op amp circuit</span></span>
<span class="line"><span>illustrated in Fig. 13.7a. With an ideal op amp, this lead-lag circuit exhibits a transfer func-</span></span>
<span class="line"><span>tion having a zero and pole, and is suitable as a PD compensator in feedback loops requiring</span></span>
<span class="line"><span>improvement of phase margin. To examine the impact of the frequency response and output</span></span>
<span class="line"><span>impedance of a practical op amp, we will model the op amp using the equivalent circuit il-</span></span>
<span class="line"><span>lustrated in Fig. 13.7b. The positive and negative input ports are modeled with inﬁnite input</span></span>
<span class="line"><span>impedance, and a Thevenin-equivalent circuit models the output port. The op amp gain is</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>op (s)= Gop0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>) (13.43)</span></span>
<span class="line"><span>For this example, the op amp model values are</span></span>
<span class="line"><span>Gop0= 105⇒100 dB f1=ω1</span></span>
<span class="line"><span>2π= 10 Hz</span></span>
<span class="line"><span>Ro= 50 Ω</span></span>
<span class="line"><span>This typical op amp internal gain Gop exhibits a dc gain of 100 dB and a pole at 10 Hz; its</span></span>
<span class="line"><span>magnitude Bode plot is given in Fig. 13.8. The op amp unity gain frequency is 1 MHz: for</span></span>
<span class="line"><span>frequencies above 10 Hz, the magnitude asymptote follows the equation</span></span>
<span class="line"><span>∥Gop∥≈1M H z</span></span>
<span class="line"><span>f (13.44)</span></span>
<span class="line"><span>The element values are</span></span>
<span class="line"><span>R1= 1.6k Ω R2= 16 Ω RL= 100 Ω</span></span>
<span class="line"><span>R3= 1.6k Ω C= 0.1μF</span></span>
<span class="line"><span>To analyze this feedback circuit, we insert the op amp model of Fig. 13.7b into the circuit of</span></span>
<span class="line"><span>Fig. 13.7a, leading to the equivalent circuit illustrated in Fig.13.9.</span></span>
<span class="line"><span>To apply the feedback theorem, we ﬁrst identify an ideal injection point. The error signal of</span></span>
<span class="line"><span>this op amp feedback circuit can be taken to be the op amp diﬀerential input voltage (v+−v−):</span></span>
<span class="line"><span>when this voltage is zero, the op amp circuit operates ideally with zero error. In the op amp</span></span>
<span class="line"><span>model of Fig.13.7b, the dependent voltage source is proportional to (v+−v−), and hence we can</span></span>
<span class="line"><span>employ voltage injection immediately following this source as illustrated in Fig. 13.9: this will</span></span>
<span class="line"><span></span></span>
<span class="line"><span>520 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>120 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>Gop0</span></span>
<span class="line"><span>|| Gop ||</span></span>
<span class="line"><span>Fig. 13.8 The op amp internal gain exhibits a single-pole response with a unity gain frequency of 1 MHz</span></span>
<span class="line"><span>cause vy to be directly proportional to the error signal ( v+−v−). With this choice of injection</span></span>
<span class="line"><span>point, we can solve the circuit to ﬁnd G0, G∞, T, and Tn as described in Sect. 13.2.1.</span></span>
<span class="line"><span>The ideal forward gain G∞is found according to Eq. (13.3). For this example, we obtain</span></span>
<span class="line"><span>G∞(s)= vout(s)</span></span>
<span class="line"><span>vin(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>vy→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.45)</span></span>
<span class="line"><span>As with all examples of null double injection, the key to easily solving for this gain is to begin</span></span>
<span class="line"><span>with the null condition and its implications. When vy is nulled, the dependent voltage source</span></span>
<span class="line"><span>−Gop v−is also nulled, which implies that v−is nulled. Hence, the current if can be related to</span></span>
<span class="line"><span>the input voltage vin as follows:</span></span>
<span class="line"><span>+vin</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2 R3</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>C Ro</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>op(s) v</span></span>
<span class="line"><span>v+ = 0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vxvy</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>if</span></span>
<span class="line"><span>Fig. 13.9 PD compensator circuit, with the op amp equivalent circuit model inserted. V oltage injection</span></span>
<span class="line"><span>at the output of the dependent voltage source is included</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit 521</span></span>
<span class="line"><span>if =− vin−v−</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v−→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>=− vin</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>) (13.46)</span></span>
<span class="line"><span>The null condition also allows us to easily relate the output voltage vout to if :</span></span>
<span class="line"><span>vout= v−+ if R3</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>v−→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>= if R3 (13.47)</span></span>
<span class="line"><span>Substitution of Eq. (13.46)i n t o(13.47) leads to the expression for G∞:</span></span>
<span class="line"><span>G∞=− R3</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)=−R3</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>1+ s (R1+ R2) C</span></span>
<span class="line"><span>1+ sR2C (13.48)</span></span>
<span class="line"><span>For this op amp circuit example, the steps in determination of G∞coincide with use of the</span></span>
<span class="line"><span>“virtual ground” principle commonly employed in beginning circuit analysis classes: nulling vy</span></span>
<span class="line"><span>leads to v+= v−. The above analysis then follows. Indeed, the null double injection analysis of</span></span>
<span class="line"><span>G∞can be viewed as a generalization to arbitrary feedback circuits.</span></span>
<span class="line"><span>Substitution of numerical values into Eq. ( 13.48) reveals that G∞contains a DC gain G∞0,</span></span>
<span class="line"><span>zero at frequency f2, and pole at frequency f3, as follows:</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| G∞ ||</span></span>
<span class="line"><span>G∞ 0 = 1</span></span>
<span class="line"><span>⇒ 0 dB</span></span>
<span class="line"><span>∠ G∞</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>100 Hz</span></span>
<span class="line"><span>+20 dB/decade</span></span>
<span class="line"><span>f2 /10</span></span>
<span class="line"><span>10f2</span></span>
<span class="line"><span>10 kHz</span></span>
<span class="line"><span>1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>|| G∞ || ∠ G∞</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>45</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>1 kHz</span></span>
<span class="line"><span>f3</span></span>
<span class="line"><span>100 kHz</span></span>
<span class="line"><span>+ 45 /decade /decade</span></span>
<span class="line"><span>Fig. 13.10 Bode plot of G∞, op amp example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>522 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>∥G∞0∥= R3</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>= 1⇒0 dB (13.49)</span></span>
<span class="line"><span>f2= 1</span></span>
<span class="line"><span>2π(R1+ R2) C= 1 kHz (13.50)</span></span>
<span class="line"><span>f3= 1</span></span>
<span class="line"><span>2πR2C= 100 kHz (13.51)</span></span>
<span class="line"><span>A Bode plot of G∞is given in Fig. 13.10. This transfer function is typical of a PD compensator</span></span>
<span class="line"><span>that might be employed to improve the phase margin of a switching converter feedback system</span></span>
<span class="line"><span>having a crossover frequency in the vicinity of 10 kHz.</span></span>
<span class="line"><span>The loop gain T(s) is found according to Eq. (13.2). For this example, we obtain</span></span>
<span class="line"><span>T(s)= vy(s)</span></span>
<span class="line"><span>vx(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>vin=0</span></span>
<span class="line"><span>(13.52)</span></span>
<span class="line"><span>Under the condition that the input voltage vin is set to zero, the equivalent circuit of Fig. 13.9</span></span>
<span class="line"><span>reduces to Fig. 13.11.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2 R3</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>C Ro</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>op(s) v</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vxvy</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>Fig. 13.11 Determination of loop gain T(s)</span></span>
<span class="line"><span>To ﬁnd the loop gainT(s), we take vx as given and solve the circuit for vy. This can be done</span></span>
<span class="line"><span>in several steps: ﬁrst ﬁnd the transfer function from vx to vout, then the transfer function from</span></span>
<span class="line"><span>vout to v−, and then the transfer function from v−to vy. The loop gain can then be expressed as</span></span>
<span class="line"><span>T(s)=</span></span>
<span class="line"><span>⎦vout</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>)⎦v−</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>) ⎦vy</span></span>
<span class="line"><span>v−</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(13.53)</span></span>
<span class="line"><span>The ﬁrst two terms of Eq. ( 13.53) are voltage divider transfer functions, while the third is the</span></span>
<span class="line"><span>op amp internal gain Gop . Hence we can express Eq. (13.53)a s :</span></span>
<span class="line"><span>T(s)=</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>3+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)]</span></span>
<span class="line"><span>Ro+ RL</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>3+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)]</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>R3+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>v−</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Gop (s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>v−</span></span>
<span class="line"><span>(13.54)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit 523</span></span>
<span class="line"><span>We could simplify this expression via algebraic manipulations, to expressT(s) in factored form.</span></span>
<span class="line"><span>However, it is easier to ﬁnd the factoredT(s) by use of the reciprocity relationship, Eq. (13.39).</span></span>
<span class="line"><span>Hence, the construction of the Bode plot of T(s) is reserved for later, afterG0 and Tn have been</span></span>
<span class="line"><span>found.</span></span>
<span class="line"><span>The direct forward transmission gain G0(s) is found as deﬁned in Ex. (13.4). For this exam-</span></span>
<span class="line"><span>ple, we obtain</span></span>
<span class="line"><span>G0(s)= vout(s)</span></span>
<span class="line"><span>vin(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>vx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.55)</span></span>
<span class="line"><span>In the model of Fig. 13.9, in the presence of the input vin we adjust the injection source vz</span></span>
<span class="line"><span>such that vx is nulled. Under these conditions, the dependent voltage source −Gop v−does not</span></span>
<span class="line"><span>inﬂuence the output, and the circuit reduces to Fig.13.12, with Ro eﬀectively in parallel withRL.</span></span>
<span class="line"><span>+vin</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vout</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2 R3</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>Fig. 13.12 Determination of direct forward transmission through feedback path, G0</span></span>
<span class="line"><span>It can be seen that G0 is a voltage divider transfer function:</span></span>
<span class="line"><span>G0(s)= vout(s)</span></span>
<span class="line"><span>vin(s)</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>vx→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span></span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>RL+ R3+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span>) (13.56)</span></span>
<span class="line"><span>This expression can be simpliﬁed via algebraic manipulation to the following factored form:</span></span>
<span class="line"><span>G0(s)=</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>R1+ R3+ Ro</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>1+ sC (R1+ R2)</span></span>
<span class="line"><span>1+ sC</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R3+ Ro</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>)) (13.57)</span></span>
<span class="line"><span>The expression for G0 is in the following standard normalized form:</span></span>
<span class="line"><span>G0= G00</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω4</span></span>
<span class="line"><span>) (13.58)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>524 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>G00=</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>R1+ R3+ Ro</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>= 0.0103⇒−39.7d B</span></span>
<span class="line"><span>f2=ω2</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2πC (R1+ R2)= 1 kHz (13.59)</span></span>
<span class="line"><span>f4=ω4</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2πC</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R2+ R1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>3+ Ro</span></span>
<span class="line"><span></span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>))= 1930 Hz</span></span>
<span class="line"><span>Figure 13.13 contains the Bode plot of G0(s).∥G0∥ is small in this example, and is unlikely to</span></span>
<span class="line"><span>inﬂuence G(s) over frequencies of interest. However, this computation assists in determination</span></span>
<span class="line"><span>of the factored T(s).</span></span>
<span class="line"><span>The null loop gain Tn(s) is found as deﬁned in Eq. (13.5). For this example, we obtain</span></span>
<span class="line"><span>Tn(s)= vy(s)</span></span>
<span class="line"><span>vx(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>vo→</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(13.60)</span></span>
<span class="line"><span>In the model of Fig.13.14: in the presence of the inputvin, we adjust the injection sourcevz such</span></span>
<span class="line"><span>that the output vout is nulled. Under these conditions, we ﬁnd the transfer function from vx to vy.</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| G∀ ||</span></span>
<span class="line"><span>G∀0 = 0.0103</span></span>
<span class="line"><span>⇒</span></span>
<span class="line"><span>1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>|| G∀ ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>1 kHz</span></span>
<span class="line"><span>f4</span></span>
<span class="line"><span>1.93 kHz</span></span>
<span class="line"><span>Fig. 13.13 Bode plot of the magnitude of G0</span></span>
<span class="line"><span>+vin</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vout null</span></span>
<span class="line"><span> 0</span></span>
<span class="line"><span>R1</span></span>
<span class="line"><span>R2 R3</span></span>
<span class="line"><span>RL</span></span>
<span class="line"><span>C Ro</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>op(s) v</span></span>
<span class="line"><span>v+ = 0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>®</span></span>
<span class="line"><span>vxvy</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>if</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>if</span></span>
<span class="line"><span>Fig. 13.14 Determination of null loop gain Tn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit 525</span></span>
<span class="line"><span>The null condition implies that there is no voltage across the load resistor RL and hence</span></span>
<span class="line"><span>there is no current through the load resistor. The op amp output current is</span></span>
<span class="line"><span>if = vx</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>(13.61)</span></span>
<span class="line"><span>Since the load current is zero, the currentif ﬂows through R3. Since the load voltage is zero, we</span></span>
<span class="line"><span>can express v−as:</span></span>
<span class="line"><span>v−=−if R3 (13.62)</span></span>
<span class="line"><span>The voltage vy is related to v−by the op amp gain Gop :</span></span>
<span class="line"><span>vy= Gop (s)v− (13.63)</span></span>
<span class="line"><span>Hence, we can express the null loop gain as</span></span>
<span class="line"><span>Tn(s)=</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>(−R3)</span></span>
<span class="line"><span>v−</span></span>
<span class="line"><span>if</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Gop (s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>v−</span></span>
<span class="line"><span>(13.64)</span></span>
<span class="line"><span>The expression for Tn is considerably simpler than the expression for T, because the load</span></span>
<span class="line"><span>impedance does not aﬀect Tn. The null loop gain contains the same poles as Gop (s).</span></span>
<span class="line"><span>We can now employ the reciprocity relationship, Eq. ( 13.39), to ﬁnd a factored expression</span></span>
<span class="line"><span>for the loop gain T(s):</span></span>
<span class="line"><span>T= G0Tn</span></span>
<span class="line"><span>G∞</span></span>
<span class="line"><span>(13.65)</span></span>
<span class="line"><span>Insertion of Eqs. (13.64), (13.58), and (13.48) into Eq. (13.65) leads to the following expression</span></span>
<span class="line"><span>for the loop gain:</span></span>
<span class="line"><span>T(s)=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>−R3</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>Gop (s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>Tn</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>G00</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω4</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>G0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>−R1</span></span>
<span class="line"><span>R3</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω3</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext/bracehext</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>G∞</span></span>
<span class="line"><span>= T0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω3</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω4</span></span>
<span class="line"><span>) (13.66)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>T0= R1</span></span>
<span class="line"><span>Ro</span></span>
<span class="line"><span>Gop0G00</span></span>
<span class="line"><span>= 33000⇒90.7 dB (13.67)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>526 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>Figure 13.15 contains a sketch of the magnitude and phase asymptotes of this loop gain. It can</span></span>
<span class="line"><span>be seen that T(s) contains a DC gain of 90.7 dB, poles at 10 Hz and 1.9 kHz, and a zero at 100</span></span>
<span class="line"><span>kHz. The crossover frequency fc can be estimated using the magnitude asymptote between the</span></span>
<span class="line"><span>1.9 kHz pole and the 100 kHz zero; over this range of frequencies, we can express the magnitude</span></span>
<span class="line"><span>asymptote as:</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>T0 ⇒ 90.7 dB</span></span>
<span class="line"><span>∠ T</span></span>
<span class="line"><span>100 kHz1 Hz 10 Hz 100 Hz 1 kHz 10 kHz</span></span>
<span class="line"><span>|| T || ∠ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>10 Hz</span></span>
<span class="line"><span>f3</span></span>
<span class="line"><span>/decade</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>f4</span></span>
<span class="line"><span>1.9 kHz</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>ϕm</span></span>
<span class="line"><span>Fig. 13.15 Sketch of the magnitude and phase asymptotes of the loop gain T(s)</span></span>
<span class="line"><span>T(s)= T0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝1+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ω3</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω4</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>∥T∥≈T0</span></span>
<span class="line"><span>(1)⎦ω</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦ω</span></span>
<span class="line"><span>ω4</span></span>
<span class="line"><span>) (13.68)</span></span>
<span class="line"><span>At the crossover frequency fc, the magnitude of T is equal to unity. Insertion ofω=ωc with</span></span>
<span class="line"><span>∥T∥= 1i n t oE q .(13.68) leads to</span></span>
<span class="line"><span>1= T0</span></span>
<span class="line"><span>ω1ω4</span></span>
<span class="line"><span>ω2c</span></span>
<span class="line"><span>(13.69)</span></span>
<span class="line"><span>Hence the crossover frequency is</span></span>
<span class="line"><span>fc=ωc</span></span>
<span class="line"><span>2π=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>T0 f1 f4</span></span>
<span class="line"><span>= 25.2 kHz (13.70)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>13.3 Example: Op Amp PD Compensator Circuit 527</span></span>
<span class="line"><span>We can estimate the phase margin as follows. Since the crossover frequency is more than a</span></span>
<span class="line"><span>decade above both pole frequencies, the poles contribute a total of−180◦to∠T( fc). The zero at</span></span>
<span class="line"><span>f3= 100 kHz contributes phase</span></span>
<span class="line"><span>tan−1 fc</span></span>
<span class="line"><span>f3</span></span>
<span class="line"><span>= 14.2◦ (13.71)</span></span>
<span class="line"><span>Hence, the phase of T at the crossover frequency is</span></span>
<span class="line"><span>∠T( fc)=−180◦+ 14.2◦=−165.8◦ (13.72)</span></span>
<span class="line"><span>The phase margin is</span></span>
<span class="line"><span>ϕm= 180◦+∠T( fc)= 14.2◦ (13.73)</span></span>
<span class="line"><span>Although the phase margin is positive, it is not very large. This implies that the closed-loop</span></span>
<span class="line"><span>transfer function T/(1+T) contains complex poles at fc having high Q determined by evaluation</span></span>
<span class="line"><span>of Eq. (9.41):</span></span>
<span class="line"><span>Q=</span></span>
<span class="line"><span>√cosϕm</span></span>
<span class="line"><span>sinϕm</span></span>
<span class="line"><span>= 4⇒12 dB (13.74)</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>|| T/ (1+T ) ||</span></span>
<span class="line"><span>f3</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>f4</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>QdB</span></span>
<span class="line"><span>Fig. 13.16 Graphical construction of the closed-loop transfer function T/(1+ T)</span></span>
<span class="line"><span>The graphical construction method can now be employed to construct the closed-loop trans-</span></span>
<span class="line"><span>fer function T/(1+ T) according to Eq. (9.11). The result is illustrated in Fig. 13.16.B e l o wt h e</span></span>
<span class="line"><span>crossover frequency fc,∥T∥ is large and hence T/(1+ T) is approximately equal to 1. There</span></span>
<span class="line"><span>are two poles at the crossover frequency, having Q factor given by Eq. (13.74). At frequencies</span></span>
<span class="line"><span>above fc, the transfer function∥T/(1+ T)∥ follows∥T∥.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>528 13 Techniques of Design-Oriented Analysis: The Feedback Theorem</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span>1 MHz10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>1 kHz</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>25 kHz</span></span>
<span class="line"><span>|| G ||</span></span>
<span class="line"><span>|| G∞ ||</span></span>
<span class="line"><span>∠ G</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>45</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>∠ G</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>100 Hz</span></span>
<span class="line"><span>f2 /10</span></span>
<span class="line"><span>∠ G</span></span>
<span class="line"><span>∠ G∞</span></span>
<span class="line"><span>Fig. 13.17 Graphical construction of the closed-loop transfer function G</span></span>
<span class="line"><span>Finally, the closed-loop transfer function G= vout/vin can be found using Eq. ( 13.1), with</span></span>
<span class="line"><span>the result illustrated in Fig. 13.17. G is given by</span></span>
<span class="line"><span>G= G∞</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T+ G0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T (13.75)</span></span>
<span class="line"><span>The term G0/(1+ T) is small, and is found to be insigniﬁcant below 30 MHz. Hence G follows</span></span>
<span class="line"><span>G∞below the crossover frequency, where T/(1+ T)≈1. The T/(1+ T) term introduces its</span></span>
<span class="line"><span>resonance at the crossover frequency, and G diﬀers signiﬁcantly from G∞at frequencies above</span></span>
<span class="line"><span>fc. The op amp is unable to produce the required gain at frequencies above 25 kHz, causing</span></span>
<span class="line"><span>the closed-loop transfer function to diﬀer signiﬁcantly from the prediction obtained using the</span></span>
<span class="line"><span>traditional op amp virtual ground principle.</span></span>
<span class="line"><span>If this op amp circuit is employed as a PD compensator in a switching converter feedback</span></span>
<span class="line"><span>loop, the compensator resonance at 25 kHz may seriously degrade the stability of the converter</span></span>
<span class="line"><span>feedback loop. The resonance may introduce additional converter crossover frequencies, and the</span></span>
<span class="line"><span>converter phase margin at frequencies approaching or exceeding 25 kHz may be substantially</span></span>
<span class="line"><span>reduced. It would be possible to make G follow G</span></span>
<span class="line"><span>∞at higher frequencies by employing an op</span></span>
<span class="line"><span>amp whose unity gain frequency is larger: the PD circuit fc could be increased from 25 kHz to</span></span>
<span class="line"><span>100 kHz by increasing the op amp unity gain frequency from 1 MHz to 4 MHz.</span></span>
<span class="line"><span>13.4 Example: Closed-Loop Regulator</span></span>
<span class="line"><span>As a second example, consider application of the feedback theorem to the closed-loop buck</span></span>
<span class="line"><span>regulator of Sect. 9.5.4, with the compensator circuit of Fig. 15.29. Figure 13.18 shows the</span></span>
<span class="line"><span>small-signal canonical model of the CCM converter power stage (from Fig. 7.38), along with</span></span>
<span class="line"><span>the feedback and PID compensator circuit, and with injection ˆvz applied.</span></span>
<span class="line"><span>The output of this system is taken to be the output voltage v. There are three independent</span></span>
<span class="line"><span>inputs: the reference voltage vre f , the power input vg, and the load current variation iload.I n</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{d as __pageData,f as default};
