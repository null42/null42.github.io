import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第18章part 4 - 18 Current-Programmed Control","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第18章part 4 - 18 Current-Programmed Control","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 787-806 > Chunk ID: `chapter-18-part-4`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/049-chapter-18-part-4.md","filePath":"content/power/fundamentals-work/chunks/049-chapter-18-part-4.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/049-chapter-18-part-4.md"};function i(t,n,o,c,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第18章part-4-18-current-programmed-control" tabindex="-1">第18章part 4 - 18 Current-Programmed Control <a class="header-anchor" href="#第18章part-4-18-current-programmed-control" aria-label="Permalink to &quot;第18章part 4 - 18 Current-Programmed Control&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 787-806<br> Chunk ID: <code>chapter-18-part-4</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>18.8 Discontinuous Conduction Mode 785</span></span>
<span class="line"><span>Small-signal models of DCM CPM converters can be derived by perturbation and lineariza-</span></span>
<span class="line"><span>tion of the averaged models of Figs.18.47 and 18.49. The results are given in Fig.18.50. Param-</span></span>
<span class="line"><span>eters of the small-signal models are listed in Tables18.7 and 18.8.</span></span>
<span class="line"><span>Fig. 18.49 Averaged models of current-programmed DCM converters: (a) buck, (b) boost</span></span>
<span class="line"><span>The CPM DCM small-signal models of Fig. 18.50 are quite similar to the respective small-</span></span>
<span class="line"><span>signal models of DCM duty ratio controlled converters illustrated in Figs.15.19 and 15.21.T h e</span></span>
<span class="line"><span>sole diﬀerences are the parameter expressions of Tables 18.7 and 18.8. Transfer functions can</span></span>
<span class="line"><span>be determined in a similar manner. In particular, a simple approximate way to determine the</span></span>
<span class="line"><span>low-frequency small-signal transfer functions of the CPM DCM buck, boost, and buck–boost</span></span>
<span class="line"><span>converters is to simply let the inductance L tend to zero in the equivalent circuits of Fig. 18.50.</span></span>
<span class="line"><span>This approximation is justiﬁed for frequencies su ﬃciently less than the converter switching</span></span>
<span class="line"><span>frequency, because in the discontinuous conduction mode the value of L is small, and hence</span></span>
<span class="line"><span>the pole and any RHP zero associated with L occur at frequencies near to or greater than the</span></span>
<span class="line"><span>switching frequency. For all three converters, the equivalent circuit of Fig.18.51 is obtained.</span></span>
<span class="line"><span>Figure 18.51 predicts that the control-to-output transfer function G</span></span>
<span class="line"><span>vc(s)i s</span></span>
<span class="line"><span>Gvc(s)= ˆv</span></span>
<span class="line"><span>ˆic</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆv8=0</span></span>
<span class="line"><span>= Gc0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>(18.196)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>Gc0= f2(R∥r2)</span></span>
<span class="line"><span>ωp= 1</span></span>
<span class="line"><span>(R∥r2)C</span></span>
<span class="line"><span></span></span>
<span class="line"><span>786 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.50 Small-signal models of DCM CPM converters, derived by perturbation and linearization of</span></span>
<span class="line"><span>Figs. 18.47 and 18.49:( a) buck, (b) boost, (c) buck–boost</span></span>
<span class="line"><span>The line-to-output transfer function is predicted to be</span></span>
<span class="line"><span>Gvg(s)= ˆv</span></span>
<span class="line"><span>ˆvg</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆic=0</span></span>
<span class="line"><span>= Gg0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>(18.197)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>Gg0= g2(R∥r2)</span></span>
<span class="line"><span>If desired, more accurate expressions which account for inductor dynamics can be derived by</span></span>
<span class="line"><span>solution of the models of Fig. 18.50.</span></span>
<span class="line"><span>18.9 Average Current-Mode Control</span></span>
<span class="line"><span>Average current-mode (ACM) control is another popular current programming technique [177,</span></span>
<span class="line"><span>178]. A block diagram of an average current-mode controlled converter is shown in Fig. 18.52.</span></span>
<span class="line"><span>A sensed current signal Rf i is compared to a control signalvc= Rf ic, where Rf is the equivalent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 787</span></span>
<span class="line"><span>Table 18.7 Current-programmed DCM small-signal equivalent circuit parameters: input port</span></span>
<span class="line"><span>Converter g1 f1 r1</span></span>
<span class="line"><span>Buck 1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦ M2</span></span>
<span class="line"><span>1−M</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>) 2 It</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>−R</span></span>
<span class="line"><span>⎦1−M</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Boost −1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦ M</span></span>
<span class="line"><span>M−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>2 I</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>⎛⎜⎜</span></span>
<span class="line"><span>⎜</span></span>
<span class="line"><span>⎜</span></span>
<span class="line"><span>⎜⎜⎜</span></span>
<span class="line"><span>⎜</span></span>
<span class="line"><span>⎜</span></span>
<span class="line"><span>⎜</span></span>
<span class="line"><span>⎝</span></span>
<span class="line"><span>2−M</span></span>
<span class="line"><span>M−1+ 2ma/m1</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>⎞⎟⎟</span></span>
<span class="line"><span>⎟</span></span>
<span class="line"><span>⎟</span></span>
<span class="line"><span>⎟⎟⎟</span></span>
<span class="line"><span>⎟</span></span>
<span class="line"><span>⎟</span></span>
<span class="line"><span>⎟</span></span>
<span class="line"><span>⎠</span></span>
<span class="line"><span>Buck–boost 0 2 I</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>−R</span></span>
<span class="line"><span>M2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Table 18.8 Current-programmed DCM small-signal equivalent circuit parameters: output port</span></span>
<span class="line"><span>Converter g2 f2 r2</span></span>
<span class="line"><span>Buck 1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦ M</span></span>
<span class="line"><span>1−M</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>(2−M)−M</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>) 2 I</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>(1−M)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1−2M+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Boost 1</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦ M</span></span>
<span class="line"><span>M−1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>2 I2</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦M−1</span></span>
<span class="line"><span>M</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Buck–boost 2M</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>⎦ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ma</span></span>
<span class="line"><span>m1</span></span>
<span class="line"><span>) 2 I2</span></span>
<span class="line"><span>Ic</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>Fig. 18.51 Simpliﬁed small-signal model obtained by letting L become zero in Fig. 18.50a,b, or c</span></span>
<span class="line"><span>current sensing resistance. The error signal is processed by a current loop compensator Gci(s),</span></span>
<span class="line"><span>which generates the control input vm for a pulse-width modulator. In response, the PWM pro-</span></span>
<span class="line"><span>duces a switch control signal c(t) with duty cycle d proportional to the PWM control input vm.</span></span>
<span class="line"><span>One may note that the current control loop shown in Fig.18.52 follows the same basic approach</span></span>
<span class="line"><span>discussed in Chap. 9, except that the control objective is to regulate a converter current instead</span></span>
<span class="line"><span></span></span>
<span class="line"><span>788 18 Current-Programmed Control</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>—</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>sensing</span></span>
<span class="line"><span>Rf i</span></span>
<span class="line"><span>vc = Rf ic</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Gci(s)</span></span>
<span class="line"><span>Current loop</span></span>
<span class="line"><span>compensator</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>Converter power stage</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>Fig. 18.52 Average current-mode controlled converter</span></span>
<span class="line"><span>of a converter voltage. Since current sensing and current loop compensator often incorporate</span></span>
<span class="line"><span>low-pass ﬁltering functions, the current control loop e ﬀectively regulates the average current</span></span>
<span class="line"><span>⟨i(t)⟩Ts . Ideally,</span></span>
<span class="line"><span>⟨i(t)⟩Ts = 1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>⟨vc(t)⟩Ts (18.198)</span></span>
<span class="line"><span>Average current-mode control ﬁnds signiﬁcant application in PWM rectiﬁers and inverters; the</span></span>
<span class="line"><span>rectiﬁer application is discussed further in Sect. 21.3.1.</span></span>
<span class="line"><span>18.9.1 System Model and Transfer Functions</span></span>
<span class="line"><span>To design the current loop compensator Gci(s), it is convenient to represent the system small-</span></span>
<span class="line"><span>signal model in a block diagram form, as shown in Fig.18.53. The converter duty-cycle control</span></span>
<span class="line"><span>transfer functions are based on the averaged converter models developed in Chap. 7.F o rt h e</span></span>
<span class="line"><span>basic converters, these transfer functions are summarized in Tables 18.3, 18.4, 18.5. Applying</span></span>
<span class="line"><span>the Feedback Theorem to the model in Fig. 18.53 yields an expression for the small-signal</span></span>
<span class="line"><span>closed-loop response of the current ˆi,</span></span>
<span class="line"><span>ˆi= 1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>ˆvc+ Gig</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>ˆvg (18.199)</span></span>
<span class="line"><span>where the current loop gain Ti(s)i s</span></span>
<span class="line"><span>Ti= Rf Gci</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Gid (18.200)</span></span>
<span class="line"><span>The closed-loop control-to-current transfer function is</span></span>
<span class="line"><span>Gic(s)=</span></span>
<span class="line"><span>ˆi</span></span>
<span class="line"><span>ˆvc</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>= Gic∞</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>(18.201)</span></span>
<span class="line"><span>where Gic∞= 1/Rf is the ideal closed-loop response of the average current control loop. One</span></span>
<span class="line"><span>may note that the ideal closed-loop response of the average current control loop is identical</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 789</span></span>
<span class="line"><span>Fig. 18.53 Block diagram that models the average current-mode control loop in Fig. 18.52</span></span>
<span class="line"><span>to the response predicted by the simple model of the current-programmed control discussed</span></span>
<span class="line"><span>in Sect. 18.1. Designing the current loop compensator Gci(s) amounts to shaping the current</span></span>
<span class="line"><span>loop gain Ti to achieve a desired crossover frequency fci and stability margins, following the</span></span>
<span class="line"><span>approaches discussed in Chap. 9.</span></span>
<span class="line"><span>Compared to CPM control (peak current mode) discussed in Sects. 18.8–18.8, average</span></span>
<span class="line"><span>current-mode control has several advantages. First, direct control over the average current is</span></span>
<span class="line"><span>required in some applications such as battery chargers, drivers for light emitting diodes, low-</span></span>
<span class="line"><span>harmonic rectiﬁers, and grid-tied inverters. Furthermore, low-pass ﬁltering associated with cur-</span></span>
<span class="line"><span>rent sensing and G</span></span>
<span class="line"><span>ci implies reduced sensitivity to noise and switching disturbances. Stable</span></span>
<span class="line"><span>operation can be achieved at any duty ratio without the need for slope compensation by addi-</span></span>
<span class="line"><span>tion of an artiﬁcial ramp. Limiting the current control signal vc provides a limitation on the</span></span>
<span class="line"><span>average but not the peak current. As a result, just as in duty-cycle controlled converters, addi-</span></span>
<span class="line"><span>tional circuitry is usually required to achieve cycle-by-cycle protection against excessive peak</span></span>
<span class="line"><span>currents during transients or fault conditions in ACM controlled converters.</span></span>
<span class="line"><span>In many applications, an outer voltage control loop is closed around an ACM controlled con-</span></span>
<span class="line"><span>verter, as shown in Fig.18.54. In the outer voltage loop, a sensed output voltageHv is compared</span></span>
<span class="line"><span>to a reference V</span></span>
<span class="line"><span>re f . The error signal is processed by a voltage loop compensator Gcv to produce</span></span>
<span class="line"><span>the control signal vc, which serves as the reference for the current control loop. A small-signal</span></span>
<span class="line"><span>model of the system in Fig. 18.54 is shown in Fig. 18.55.</span></span>
<span class="line"><span>Application of the Feedback Theorem to the inner current control loop yields the following</span></span>
<span class="line"><span>expression for the small-signal output voltage as a function of perturbations in vc and vg,</span></span>
<span class="line"><span>ˆv=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Gci</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆvc+</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Gvg(s)−Gig</span></span>
<span class="line"><span>Gid</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ˆvg (18.202)</span></span>
<span class="line"><span>With the inner current control loop closed, the control-to-output voltage transfer function</span></span>
<span class="line"><span>Gvc(s)i sg i v e nb y</span></span>
<span class="line"><span>Gvc(s)= ˆv</span></span>
<span class="line"><span>ˆvc</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= Gci</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>Gid</span></span>
<span class="line"><span>Ti</span></span>
<span class="line"><span>1+ Ti</span></span>
<span class="line"><span>(18.203)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>790 18 Current-Programmed Control</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>—</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>sensing</span></span>
<span class="line"><span>Rf i</span></span>
<span class="line"><span>vc = Rf ic</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Gci(s)</span></span>
<span class="line"><span>Current loop</span></span>
<span class="line"><span>compensator</span></span>
<span class="line"><span>PWM</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>Converter power stage</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>VrefGcv(s)</span></span>
<span class="line"><span>Voltage loop</span></span>
<span class="line"><span>compensator</span></span>
<span class="line"><span>Fig. 18.54 Output voltage control loop closed around an average current-mode controlled converter</span></span>
<span class="line"><span>Fig. 18.55 Block diagram that models the average current-mode controlled converter with an outer volt-</span></span>
<span class="line"><span>age control loop as shown in Fig. 18.54</span></span>
<span class="line"><span>For the purposes of designing the voltage loop compensator, the system block diagram of</span></span>
<span class="line"><span>Fig. 18.55 can now be simpliﬁed as shown in Fig. 18.56 The voltage loop compensator design</span></span>
<span class="line"><span>amounts to shaping the voltage loop gain</span></span>
<span class="line"><span>Tv= HGcvGvc (18.204)</span></span>
<span class="line"><span>to achieve a desired crossover frequency and stability margins using the techniques discussed</span></span>
<span class="line"><span>in Chap. 9.</span></span>
<span class="line"><span>It should be noted that the design of the two-loop system of Fig.18.56 can be approached in</span></span>
<span class="line"><span>a number of diﬀerent ways. In the approach described above the inner current loop is designed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 791</span></span>
<span class="line"><span>Fig. 18.56 Block diagram that models the outer voltage control loop around an average current-mode</span></span>
<span class="line"><span>controlled converter</span></span>
<span class="line"><span>ﬁrst, based on the current loop gain Ti. Next, with the inner current loop closed, the control to</span></span>
<span class="line"><span>voltage transfer function Gvc(s) is found from Eq. (18.203), and the voltage loop compensator</span></span>
<span class="line"><span>is designed based on the outer voltage loop gain Tv given by Eq. (18.204). This inner-loop ﬁrst,</span></span>
<span class="line"><span>outer-loop second design approach is illustrated by an example in the next section.</span></span>
<span class="line"><span>18.9.2 Design Example: ACM Controlled Boost Converter</span></span>
<span class="line"><span>An average current-mode controlled boost converter is shown in Fig. 18.57. The current and</span></span>
<span class="line"><span>voltage control loops follow the block diagram of Fig. 18.54: average inductor current is reg-</span></span>
<span class="line"><span>ulated in the inner current control loop, and output voltage is regulated in the outer voltage</span></span>
<span class="line"><span>control loop. The converter operates from Vg = 170 V , and deliversPout = 2 kW of power at</span></span>
<span class="line"><span>V= 400 V . The switching frequency is fs = 100 kHz, the amplitude of the PWM saw-tooth</span></span>
<span class="line"><span>ramp is VM = 4 V , and the equivalent current sensing resistance is Rf = 0.25Ω. The voltage</span></span>
<span class="line"><span>reference is Vre f = 3 V , and the voltage sensing gain isH= Vre f/V= 0.0075. In this example,</span></span>
<span class="line"><span>the objectives are to design a current loop compensator Gci to attain a crossover frequency of</span></span>
<span class="line"><span>fci= 10 kHz, or one tenth of the switching frequency, and then to design a voltage loop compen-</span></span>
<span class="line"><span>sator Gcv so that a crossover frequency of fcv = 1 kHz is obtained in the outer voltage control</span></span>
<span class="line"><span>loop. Converter losses can be neglected.</span></span>
<span class="line"><span>At the quiescent dc operating point,</span></span>
<span class="line"><span>D= 1−Vg</span></span>
<span class="line"><span>V = 0.575</span></span>
<span class="line"><span>Ig= I= Pout</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= 11.8A</span></span>
<span class="line"><span>Vc= Rf I= 2.94 V</span></span>
<span class="line"><span>A small-signal model of the ACM controlled boost converter is shown in Fig. 18.58.F r o m</span></span>
<span class="line"><span>Eq. (18.200), the uncompensated current loop gain Tiu, with unity gain compensator Gci= 1, is</span></span>
<span class="line"><span>Tiu= Rf</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Gid(s) (18.205)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>792 18 Current-Programmed Control</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>+– Vref</span></span>
<span class="line"><span>H</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>Gcv(s)</span></span>
<span class="line"><span>Gci(s) PWM</span></span>
<span class="line"><span>c(t)</span></span>
<span class="line"><span>Li</span></span>
<span class="line"><span>vm</span></span>
<span class="line"><span>vc = Rf ic</span></span>
<span class="line"><span>Rf i</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Fig. 18.57 Average current-mode controlled boost converter</span></span>
<span class="line"><span>Fig. 18.58 Small-signal model of the average current-mode controlled boost converter of Fig.18.57</span></span>
<span class="line"><span>where the converter duty-cycle to inductor current transfer function Gid(s)i sg i v e nb y</span></span>
<span class="line"><span>Gid(s)=</span></span>
<span class="line"><span>ˆi</span></span>
<span class="line"><span>ˆd</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>ˆvg=0</span></span>
<span class="line"><span>= Gid0</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωzi</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>ωo</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωo</span></span>
<span class="line"><span>)2 (18.206)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 793</span></span>
<span class="line"><span>Fig. 18.59 Uncompensated loop gain for the current-mode controlled boost converter of Fig.18.57</span></span>
<span class="line"><span>Gid0 = 2V</span></span>
<span class="line"><span>D′2R= 55.4A →34.9 dbA</span></span>
<span class="line"><span>fzi= 1</span></span>
<span class="line"><span>πRC= 121 Hz</span></span>
<span class="line"><span>fo = D′</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>= 745 Hz</span></span>
<span class="line"><span>Q= D′R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L= 12.4→21.8d B</span></span>
<span class="line"><span>The uncompensated current loop gain is sketched in Fig. 18.59. The low-frequency gain equals</span></span>
<span class="line"><span>Tiu0= Rf</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>Gid0= 3.46→10.8 dB (18.207)</span></span>
<span class="line"><span>Around the target crossover frequency fci = 10 kHz, the magnitude of Tiu rolls oﬀat</span></span>
<span class="line"><span>−20 dB/dec,</span></span>
<span class="line"><span>||Tiu||→Tiu0</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>o</span></span>
<span class="line"><span>ωziω= Rf</span></span>
<span class="line"><span>Lω</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>(18.208)</span></span>
<span class="line"><span>while the corresponding phase response asymptote equals −90◦. A simple gain (proportional</span></span>
<span class="line"><span>(P) compensator) would therefore be suﬃcient to achieve the desired crossover frequency with</span></span>
<span class="line"><span>adequate phase margin. As discussed in Sect. 9.5.2, a lag (PI) compensator o ﬀers a way to</span></span>
<span class="line"><span>increase the low-frequency loop gain and to achieve perfect dc regulation of the average inductor</span></span>
<span class="line"><span>current. Furthermore, a pole is typically added in the current loop compensator transfer function</span></span>
<span class="line"><span>in order to attenuate high-frequency switching ripple, and low-pass ﬁlter the sensed current</span></span>
<span class="line"><span>signal. A typical ACM current loop compensator transfer function is therefore given by</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>ci(s)= Gcm</span></span>
<span class="line"><span>1+ ωz</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>(18.209)</span></span>
<span class="line"><span>and the compensator response is sketched in Fig. 18.60.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>794 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.60 Magnitude and phase responses of the current loop compensator</span></span>
<span class="line"><span>The compensator zero is placed below the target crossover frequency ( fzi &lt; fci), while the</span></span>
<span class="line"><span>pole is placed above the crossover frequency (fp&gt; fci). Using Eq. (18.208), gain Gcm is selected</span></span>
<span class="line"><span>so that the loop gain magnitude equals 1 (0 dB) at the target crossover frequency fci,</span></span>
<span class="line"><span>Gcm</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Lωci</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>= 1 (18.210)</span></span>
<span class="line"><span>Hence,</span></span>
<span class="line"><span>Gcm= Lωci</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>V = 0.63 (18.211)</span></span>
<span class="line"><span>The phase margin can be found by adding contributions of the pole at zero of the PI compensator</span></span>
<span class="line"><span>(−90◦), the quadratic pole and zero inGid (approximately−90◦), as well as the compensator zero</span></span>
<span class="line"><span>at fz and the pole at fp,</span></span>
<span class="line"><span>ϕm= 180◦+∠Ti( jωci)= 180◦−90◦−90◦+ tan−1</span></span>
<span class="line"><span>⎦fci</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>−tan−1</span></span>
<span class="line"><span>⎦fci</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(18.212)</span></span>
<span class="line"><span>Al o w e rfz contributes to a higher phase margin at the expense of reduced loop gain magnitude</span></span>
<span class="line"><span>at frequencies below fci. A higher fp contributes to a higher phase margin at the expense of</span></span>
<span class="line"><span>reduced attenuation of the switching ripple by the compensator. Choosing, somewhat arbitrarily,</span></span>
<span class="line"><span>fz= fci/2.5= 4 kHz and fp= 2.5 fci= 25 kHz, results in the phase margin of</span></span>
<span class="line"><span>ϕm= 68◦−22◦= 46◦ (18.213)</span></span>
<span class="line"><span>Magnitude and phase responses of the compensated current loop gain are shown in Fig. 18.61,</span></span>
<span class="line"><span>conﬁrming that the compensator in Eq. (18.209) with Gcm= 0.63, fz= 4 kHz, and fp= 25 kHz</span></span>
<span class="line"><span>meets the design objectives.</span></span>
<span class="line"><span>The closed-loop control-to-current transfer function Gic found using Eq. (18.201) has mag-</span></span>
<span class="line"><span>nitude and phase responses shown in Fig. 18.62. At low frequencies, the closed-loop response</span></span>
<span class="line"><span>follows the ideal gain Gic∞= 1/Rf .G i v e nϕm = 46◦, the closed-loop transfer function exhibits</span></span>
<span class="line"><span>a peaked response at frequencies near the crossover frequency fci, which is consistent with the</span></span>
<span class="line"><span>discussion in Sect. 9.4.3.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 795</span></span>
<span class="line"><span>Fig. 18.61 Compensated loop gain for the average current-mode controlled boost converter of Fig.18.57</span></span>
<span class="line"><span>10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-40</span></span>
<span class="line"><span>-20</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>20 Magnitude [dB]</span></span>
<span class="line"><span>10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>-180</span></span>
<span class="line"><span>-135</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-45</span></span>
<span class="line"><span>0 Phase [deg]</span></span>
<span class="line"><span>1/Rf</span></span>
<span class="line"><span>||Gic||</span></span>
<span class="line"><span>∠Gic</span></span>
<span class="line"><span>Fig. 18.62 Closed-loop control-to-current response in the average current-mode controlled boost con-</span></span>
<span class="line"><span>verter of Fig. 18.57</span></span>
<span class="line"><span></span></span>
<span class="line"><span>796 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.63 Closed-loop control-to-output voltage response in the average current-mode controlled boost</span></span>
<span class="line"><span>converter of Fig.18.57</span></span>
<span class="line"><span>Fig. 18.64 Loop gain in the voltage control loop around the average current-mode controlled boost con-</span></span>
<span class="line"><span>verter of Fig. 18.57</span></span>
<span class="line"><span>The next step is to design a voltage loop compensator Gcv to attain a crossover of fcv in the</span></span>
<span class="line"><span>outer voltage control loop. The design is based on the block diagram of Fig.18.54, where Gvc is</span></span>
<span class="line"><span>the closed-loop control-to-output voltage transfer function found from Eq. (18.203) and shown</span></span>
<span class="line"><span>in Fig. 18.63. At frequencies well below the current loop crossoverfci, Gvc can be approximated</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.9 Average Current-Mode Control 797</span></span>
<span class="line"><span>as</span></span>
<span class="line"><span>Gvc≈1</span></span>
<span class="line"><span>Rf</span></span>
<span class="line"><span>Gvd</span></span>
<span class="line"><span>Gid</span></span>
<span class="line"><span>= D′R</span></span>
<span class="line"><span>2Rf</span></span>
<span class="line"><span>1− s</span></span>
<span class="line"><span>ωz,RHP</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωzi</span></span>
<span class="line"><span>(18.214)</span></span>
<span class="line"><span>fz,RHP = D′2R</span></span>
<span class="line"><span>2πL = 9.2k H z</span></span>
<span class="line"><span>fzi= 1</span></span>
<span class="line"><span>πRC= 121 Hz</span></span>
<span class="line"><span>The magnitude and phase responses of the completeGvc from Eq. (18.203) and the approximate</span></span>
<span class="line"><span>Gvc from Eq. (18.214)a r es h o w ni nF i g .18.63. In cases when fcv &lt;&lt; fci, i.e., when the voltage</span></span>
<span class="line"><span>loop is designed conservatively, the design of the voltage loop compensator Gcv can be based</span></span>
<span class="line"><span>on the approximate Gvc from Eq. (18.214). Since Gvc has a dominant pole at fzi and behaves</span></span>
<span class="line"><span>as a single-pole transfer function around the target voltage loop crossover of fcv = 1k H z ,i ti s</span></span>
<span class="line"><span>suﬃcient to consider a simple PI compensator</span></span>
<span class="line"><span>Gcv(s)= Gvm</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ ωzv</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(18.215)</span></span>
<span class="line"><span>where Gvm can be found from Eq. (18.204) to attain the desired crossover frequency fcv,</span></span>
<span class="line"><span>Gvm= 2πfcvCR f</span></span>
<span class="line"><span>D′H = 16.4 (18.216)</span></span>
<span class="line"><span>and fzv can be selected to achieve a tradeoﬀbetween phase margin and the magnitude of Tv at</span></span>
<span class="line"><span>frequencies below fcv. Selecting</span></span>
<span class="line"><span>fzv= fcv</span></span>
<span class="line"><span>3 = 333 Hz (18.217)</span></span>
<span class="line"><span>results in the voltage loop phase margin of</span></span>
<span class="line"><span>ϕmv≈180◦−90◦−90◦+ tan−1 fcv</span></span>
<span class="line"><span>fzv</span></span>
<span class="line"><span>= 72◦ (18.218)</span></span>
<span class="line"><span>The resulting voltage loop gain is shown in Fig.18.64.</span></span>
<span class="line"><span>The two-step design process illustrated by the example above is relatively simple: the inner</span></span>
<span class="line"><span>current loop is designed ﬁrst, followed by the voltage loop design. In both loops around ACM</span></span>
<span class="line"><span>controlled converters, simple PI compensators are typically suﬃcient to achieve desired regula-</span></span>
<span class="line"><span>tion bandwidths with adequate stability margins. In the ACM controlled boost design example,</span></span>
<span class="line"><span>we followed a conservative approach where the outer voltage loop crossover frequency fcv is</span></span>
<span class="line"><span>set to be well below the current loop crossover frequency fci. This approach, while commonly</span></span>
<span class="line"><span>applied in practice, is not necessarily the only available option. Depending on application and</span></span>
<span class="line"><span>regulation bandwidth requirements, other approaches can be pursued in two-loop systems.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>798 18 Current-Programmed Control</span></span>
<span class="line"><span>18.10 Summary of Key Points</span></span>
<span class="line"><span>1. In current-programmed control, the peak switch current is(t) follows the control input ic(t).</span></span>
<span class="line"><span>This widely used control scheme has the advantage of a simpler control-to-output transfer</span></span>
<span class="line"><span>function. The line-to-output transfer functions of current-programmed buck converters are</span></span>
<span class="line"><span>also reduced.</span></span>
<span class="line"><span>2. The basic current-programmed controller is unstable when D&gt; 0.5, regardless of the con-</span></span>
<span class="line"><span>verter topology. The controller can be stabilized by addition of an artiﬁcial ramp having</span></span>
<span class="line"><span>slope ma. When ma&gt; 0.5m2, then the controller is stable for all duty cycles.</span></span>
<span class="line"><span>3. The behavior of current-programmed converters can be modeled in a simple and intuitive</span></span>
<span class="line"><span>manner by the ﬁrst-order approximation⟨iL(t)⟩TS ≈ic(t). The averaged terminal waveforms</span></span>
<span class="line"><span>of the switch network can then be modeled simply by a current source of value ic, in con-</span></span>
<span class="line"><span>junction with a power sink or power source element. Perturbation and linearization of these</span></span>
<span class="line"><span>elements leads to the small-signal model. Alternatively, the small-signal converter equa-</span></span>
<span class="line"><span>tions derived in Chap. 7 can be adapted to cover the current-programmed mode, using the</span></span>
<span class="line"><span>simple approximation iL(t)≈ic(t).</span></span>
<span class="line"><span>4. The simple model predicts that one pole is eliminated from the converter line-to-output</span></span>
<span class="line"><span>and control-to-output transfer functions. Current programming does not alter the transfer</span></span>
<span class="line"><span>function zeroes. The dc gains become load-dependent.</span></span>
<span class="line"><span>5. The more accurate model of Sect. 18.3 correctly accounts for the diﬀerence between the av-</span></span>
<span class="line"><span>erage inductor current⟨i</span></span>
<span class="line"><span>L(t)⟩Ts and the control input ic(t). This model predicts the nonzero</span></span>
<span class="line"><span>line-to-output transfer function Gvg(s) of the buck converter. The current-programmed con-</span></span>
<span class="line"><span>troller behavior is modeled by a block diagram, which is appended to the small-signal</span></span>
<span class="line"><span>converter models derived in Chap. 7. Analysis of the resulting multiloop feedback system</span></span>
<span class="line"><span>Sect. 18.4 then leads to the relevant transfer functions derived.</span></span>
<span class="line"><span>6. The more accurate model predicts that the inductor pole occurs at the crossover frequency</span></span>
<span class="line"><span>fc of the eﬀective current feedback loop gainTi(s). The frequency fc typically occurs in the</span></span>
<span class="line"><span>vicinity of the converter switching frequency fs. The more accurate model also predicts that</span></span>
<span class="line"><span>the line-to-output transfer function Gvg(s) of the buck converter is nulled whenma= 0.5m2.</span></span>
<span class="line"><span>7. The more accurate averaged CPM model of Sect. 18.3 can be implemented as a SPICE</span></span>
<span class="line"><span>subcircuit, as shown in Sect. 18.5. The averaged CPM model can then be combined with</span></span>
<span class="line"><span>averaged switch models of Chap.14 to construct averaged circuit models suitable for SPICE</span></span>
<span class="line"><span>simulations.</span></span>
<span class="line"><span>8. A converter system incorporating current-programmed control often includes an outer volt-</span></span>
<span class="line"><span>age feedback loop, the purpose of which is to regulate the converter output voltage. Since</span></span>
<span class="line"><span>current programming results in simpler control-to-output dynamics, wide-bandwidth out-</span></span>
<span class="line"><span>put voltage control can usually be obtained without the use of compensator lead networks,</span></span>
<span class="line"><span>as discussed in Sect. 18.6.</span></span>
<span class="line"><span>9. Current-programmed converters operating in the discontinuous conduction mode are mod-</span></span>
<span class="line"><span>eled in Sect. 18.8. The averaged transistor waveforms can be modeled by a power sink,</span></span>
<span class="line"><span>while the averaged diode waveforms are modeled by a power source. The power is con-</span></span>
<span class="line"><span>trolled by i</span></span>
<span class="line"><span>c(t). Perturbation and linearization of these averaged models, as usual, leads to</span></span>
<span class="line"><span>small-signal equivalent circuits.</span></span>
<span class="line"><span>10. Neither the simple model of Sect. 18.1, which neglects inductor dynamics, nor the more</span></span>
<span class="line"><span>accurate model of Sect. 18.3, which implies a single-pole response at high frequencies,</span></span>
<span class="line"><span>predicts current-programmed instability or the need for the artiﬁcial ramp discussed in</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.10 Summary of Key Points 799</span></span>
<span class="line"><span>Sect. 18.2. Section 18.7 explains high-frequency dynamics of current-programmed con-</span></span>
<span class="line"><span>verters using sampled-data modeling techniques. The sampled-data model shows how the</span></span>
<span class="line"><span>control-to-current frequency response exhibits peaking around one half of the switching</span></span>
<span class="line"><span>frequency if the artiﬁcial ramps slope ma is small, ultimately leading to instability for duty</span></span>
<span class="line"><span>cycles greater than 0.5 if no artiﬁcial ramp is employed. Addition of artiﬁcial ramp leads</span></span>
<span class="line"><span>to stable operation, reduced sensitivity to noise, and frequency responses that are well pre-</span></span>
<span class="line"><span>dicted by the more accurate averaged model of Sect. 18.3.</span></span>
<span class="line"><span>11. Average current-mode (ACM) control is another popular control technique where an aver-</span></span>
<span class="line"><span>age current is sensed and controlled using a feedback loop around a duty-cycle controlled</span></span>
<span class="line"><span>converter. ACM controllers have improved noise immunity, and exhibit stable operation</span></span>
<span class="line"><span>over wide range of duty cycles as well as relatively simple dynamics. In addition to con-</span></span>
<span class="line"><span>struction of inner current control loops, ACM controllers are often used in applications that</span></span>
<span class="line"><span>require direct control over the converter average input or output current, such as battery</span></span>
<span class="line"><span>chargers, drivers for light emitting diodes, as well as grid-tied rectiﬁers and inverters.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>18.1 A nonideal buck converter operates in the continuous conduction mode, with the values</span></span>
<span class="line"><span>Vg = 10 V, f2 = 100 kHz, L= 4 μH, C= 75 μF, and R= 0.25Ω. The desired full-load</span></span>
<span class="line"><span>output is 5 V at 20 A. The power stage contains the following loss elements: MOSFET</span></span>
<span class="line"><span>on-resistance R</span></span>
<span class="line"><span>on = 0.1Ω, Schottky diode forward voltage drop VD = 0.5 V, inductor</span></span>
<span class="line"><span>winding resistance RL= 0.03Ω.</span></span>
<span class="line"><span>(a) Steady-state analysis: determine the converter steady-state duty cycleD, the inductor</span></span>
<span class="line"><span>current ripple slopes m1 and m2, and the dimensionless parameter K= 2L/RTs.</span></span>
<span class="line"><span>(b) Determine the small-signal equations for this converter, for duty-cycle control.</span></span>
<span class="line"><span>A current-programmed controller is now implemented for this converter. An artiﬁcial</span></span>
<span class="line"><span>ramp is used, having a ﬁxed slope Ma = 0.5M2, where M2 is the steady-state slope</span></span>
<span class="line"><span>m2 obtained with an output of 5 V at 20 A.</span></span>
<span class="line"><span>(c) Over what range of D is the current-programmed controller stable? Is it stable at</span></span>
<span class="line"><span>rated output?</span></span>
<span class="line"><span>Note that the nonidealities aﬀect the stability boundary.</span></span>
<span class="line"><span>(d) Determine the control-to-output transfer function Gvc(s), using the simple approxi-</span></span>
<span class="line"><span>mation⟨iL(t)⟩Ts ≈ic(t). Give analytical expressions for the corner frequency and dc</span></span>
<span class="line"><span>gain. Sketch the Bode plot of Gvc(s).</span></span>
<span class="line"><span>18.2 Use the averaged switch modeling approach to model the CCM boost converter with</span></span>
<span class="line"><span>current-programmed control:</span></span>
<span class="line"><span>(a) Deﬁne the switch network terminal quantities as in Fig.14.13a. With the assumption</span></span>
<span class="line"><span>that⟨iL(t)⟩Ts ≈ic(t), determine expressions for the average values of the switch</span></span>
<span class="line"><span>network terminal waveforms, and hence derive the equivalent circuit of Fig.18.9a.</span></span>
<span class="line"><span>(b) Perturb and linearize your model of part (a), to obtain the equivalent circuit of</span></span>
<span class="line"><span>Fig. 18.13.</span></span>
<span class="line"><span>(c) Solve your model of part (b), to derive expressions for the control-to-output transfer</span></span>
<span class="line"><span>function Gvc(s) and the line-to-output transfer function Gvg(s). Express your results</span></span>
<span class="line"><span>in standard normalized form, and give analytical expressions for the corner frequen-</span></span>
<span class="line"><span>cies and dc gains.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>800 18 Current-Programmed Control</span></span>
<span class="line"><span>18.3 Use the averaged switch modeling approach to model the CCM ´Cuk converter with</span></span>
<span class="line"><span>current-programmed control. A ´Cuk converter is diagrammed in Fig.2.20.</span></span>
<span class="line"><span>(a) It is desired to model the switch network with an ic current source and a dependent</span></span>
<span class="line"><span>power source or sink, using the approach of Sect. 18.1.2. How should the switch</span></span>
<span class="line"><span>network terminal voltages and currents be deﬁned?</span></span>
<span class="line"><span>(b) Sketch the switch network terminal voltage and current waveforms. With the assump-</span></span>
<span class="line"><span>tion that⟨i1(t)⟩Ts −⟨i2(t)⟩Ts ≈ic(t) (where i1 and i2 are the inductor currents deﬁned</span></span>
<span class="line"><span>in Fig. 2.20), determine expressions for the average values of the switch network ter-</span></span>
<span class="line"><span>minal waveforms, and hence derive an equivalent circuit similar to the equivalent</span></span>
<span class="line"><span>circuits of Fig. 18.9.</span></span>
<span class="line"><span>(c) Perturb and linearize your model of part (b), to obtain a small-signal equivalent cir-</span></span>
<span class="line"><span>cuit similar to the model of Fig. 18.10. It is not necessary to solve your model.</span></span>
<span class="line"><span>18.4 The full-bridge converter of Fig. 6.20a operates with V</span></span>
<span class="line"><span>g = 320 V, and supplies 1000 W</span></span>
<span class="line"><span>to a 42 V resistive load. Losses can be neglected, the duty cycle is 0.7, and the switch-</span></span>
<span class="line"><span>ing period Ts deﬁned in Fig. 6.21 is 10 μsec. L= 50 μH and C = 100 μF. A current-</span></span>
<span class="line"><span>programmed controller is employed, whose waveforms are referred to the secondary</span></span>
<span class="line"><span>side of the transformer. In the following calculations, you may neglect the transformer</span></span>
<span class="line"><span>magnetizing current.</span></span>
<span class="line"><span>(a) What is the minimum artiﬁcial ramp slope m</span></span>
<span class="line"><span>a that will stabilize the controller at the</span></span>
<span class="line"><span>given operating point? Express your result in terms of m2.</span></span>
<span class="line"><span>(b) An artiﬁcial ramp having the slope ma = m2 is employed. Sketch the Bode plot of</span></span>
<span class="line"><span>the current loop gain Ti(s), and label numerical values of the corner frequencies and</span></span>
<span class="line"><span>dc gains. It is not necessary to re-derive the analytical expression for Ti. Determine</span></span>
<span class="line"><span>the crossover frequency fc.</span></span>
<span class="line"><span>(c) For ma = m2, sketch the Bode plots of the control-to-output transfer function Gvc(s)</span></span>
<span class="line"><span>and line-to-output transfer function Gvg(s), and label numerical values of the corner</span></span>
<span class="line"><span>frequencies and dc gains. It is not necessary to re-derive analytical expressions for</span></span>
<span class="line"><span>these transfer functions.</span></span>
<span class="line"><span>18.5 In a CCM current-programmed buck converter, it is desired to minimize the line-to-</span></span>
<span class="line"><span>output transfer function Gvg(s) via the choice ma = 0.5m2. However, because of com-</span></span>
<span class="line"><span>ponent tolerances, the value of inductance L can vary by±10% from its nominal value</span></span>
<span class="line"><span>of 100 μH. Hence, ma is ﬁxed in value while m2 varies, and ma= 0.5m2 is obtained only</span></span>
<span class="line"><span>at the nominal value ofL. The switching frequency is 100 kHz, the output voltage is 15 V ,</span></span>
<span class="line"><span>the load current varies over the range 2 to 4 A, and the input voltage varies over the range</span></span>
<span class="line"><span>22 to 32 V . You may neglect losses. Determine the worst-case (maximum) value of the</span></span>
<span class="line"><span>line-to-output dc gain G</span></span>
<span class="line"><span>vg(0).</span></span>
<span class="line"><span>18.6 The nonideal ﬂyback converter of Fig. 7.19 employs current-programmed control, with</span></span>
<span class="line"><span>artiﬁcial ramp having slope ma. MOSFET Q1 exhibits on-resistance Ron. All current-</span></span>
<span class="line"><span>programmed controller waveforms are referred to the transformer primary side.</span></span>
<span class="line"><span>(a) Derive a block diagram which models the current-programmed controller, of form</span></span>
<span class="line"><span>similar to Fig.18.24. Give analytical expressions for the gains in your block diagram.</span></span>
<span class="line"><span>(b) Combine your result of part (a) with the converter small-signal model. Derive a new</span></span>
<span class="line"><span>expression for the control-to-output transfer function Gvc(s).</span></span>
<span class="line"><span>18.7 A buck converter operates with current-programmed control. The element values are</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.10 Summary of Key Points 801</span></span>
<span class="line"><span>Vg= 120 V D= 0.6</span></span>
<span class="line"><span>R= 10Ω fs= 100 kHz</span></span>
<span class="line"><span>L= 550 μH C= 100 μF</span></span>
<span class="line"><span>An artiﬁcial ramp is employed, having slope 0.15 A/μsec.</span></span>
<span class="line"><span>(a) Construct the magnitude and phase asymptotes of the control-to-output transfer</span></span>
<span class="line"><span>function Gvd(s) for duty-cycle control. On the same plot, construct the magnitude</span></span>
<span class="line"><span>and phase asymptotes of the control-to-output transfer function Gvc(s) for current-</span></span>
<span class="line"><span>programmed control. Compare.</span></span>
<span class="line"><span>(b) Construct the magnitude asymptotes of the line-to-output transfer functionGvg(s)f o r</span></span>
<span class="line"><span>duty-cycle control. On the same plot, construct the magnitude asymptotes of the line-</span></span>
<span class="line"><span>to-output transfer function Gvg−cpm (s) for current-programmed control. Compare.</span></span>
<span class="line"><span>18.8 A buck–boost converter operates in the discontinuous conduction mode. Its current-</span></span>
<span class="line"><span>programmed controller has no compensating artiﬁcial ramp: ma= 0.</span></span>
<span class="line"><span>(a) Derive an expression for the control-to-output transfer function Gvc(s), using the</span></span>
<span class="line"><span>approximation L≈O. Give analytical expressions for the corner frequency and dc</span></span>
<span class="line"><span>gain.</span></span>
<span class="line"><span>(b) Repeat part (a), with the inductor included. Show that, provided the inductor is suﬃ-</span></span>
<span class="line"><span>ciently small, then the inductor merely adds a high-frequency pole and zero toGvc(s),</span></span>
<span class="line"><span>and the low-frequency pole derived in part (a) is essentially unchanged.</span></span>
<span class="line"><span>(c) At the CCM-DCM boundary, what is the minimum value of the RHP zero frequency?</span></span>
<span class="line"><span>18.9 A current-programmed boost converter interfaces a 3 V battery to a small portable 5 V</span></span>
<span class="line"><span>load. The converter operates in the discontinuous conduction mode, with constant tran-</span></span>
<span class="line"><span>sistor on-time t</span></span>
<span class="line"><span>on and variable oﬀ-time; the switching frequency can therefore vary and</span></span>
<span class="line"><span>is used as the control variable. There is no artiﬁcial ramp, and the peak transistor current</span></span>
<span class="line"><span>ic is equal to a ﬁxed value Ic; in practice, Ic is chosen to minimize the total loss.</span></span>
<span class="line"><span>(a) Sketch the transistor and diode voltage and current waveforms. Determine expres-</span></span>
<span class="line"><span>sions for the waveform average values, and hence derive a large-signal averaged</span></span>
<span class="line"><span>equivalent circuit for this converter.</span></span>
<span class="line"><span>(b) Perturb and linearize your model of part (a), to obtain a small-signal equivalent cir-</span></span>
<span class="line"><span>cuit. Note that the switching frequency f</span></span>
<span class="line"><span>s should be perturbed.</span></span>
<span class="line"><span>(c) Solve your model of part (b), to derive an expression for the low-frequency control-</span></span>
<span class="line"><span>to-output transfer function Gvf (s)= ˆv(s)/ ˆfs(s). Express your results in standard nor-</span></span>
<span class="line"><span>malized form, and give analytical expressions for the corner frequencies and dc gains.</span></span>
<span class="line"><span>You may assume that L is small.</span></span>
<span class="line"><span>18.10 A current-programmed boost converter is employed in a low-harmonic rectiﬁer system,</span></span>
<span class="line"><span>in which the input voltage is a rectiﬁed sinusoid: vg(t)= VM| sin(ωt)|. The dc output</span></span>
<span class="line"><span>voltage is v(t) = V &gt; VM. The capacitance C is large, such that the output voltage</span></span>
<span class="line"><span>contains negligible ac variations. It is desired to control the converter such that the input</span></span>
<span class="line"><span>current i</span></span>
<span class="line"><span>g(t) is proportional to vg(t): ig(t)= vg(t)/Re, where Re is a constant, called the</span></span>
<span class="line"><span>“emulated resistance.” The averaged boost converter model of Fig. 18.9a suggests that</span></span>
<span class="line"><span>this can be accomplished by simply letting ic(t) be proportional to vg(t), according to</span></span>
<span class="line"><span>ic(t)= vg(t)/Re. You may make the simplifying assumption that the converter always</span></span>
<span class="line"><span>operates in the continuous conduction mode.</span></span>
<span class="line"><span>(a) Solve the model of Fig. 18.9a, subject to the assumptions listed above, to determine</span></span>
<span class="line"><span>the power⟨p(t)⟩Ts . Find the average value of⟨p(t)⟩Ts , averaged over one cycle of the</span></span>
<span class="line"><span>ac input vg(t).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>802 18 Current-Programmed Control</span></span>
<span class="line"><span>(b) An artiﬁcial ramp is necessary to stabilize the current-programmed controller at</span></span>
<span class="line"><span>some operating points. What is the minimum value of ma that ensures stability at</span></span>
<span class="line"><span>all operating points along the input rectiﬁed sinusoid? Express your result as a func-</span></span>
<span class="line"><span>tion of V and L. Show your work.</span></span>
<span class="line"><span>(c) The artiﬁcial ramp and inductor current ripple cause the average input current to</span></span>
<span class="line"><span>diﬀer from ic(t). Derive an algebraic expression for ⟨ig(t)⟩Ts , as a function of ic(t)</span></span>
<span class="line"><span>and other quantities such as ma, vg(t), V, L, and Ts. For this part, you may assume</span></span>
<span class="line"><span>that the inductor dynamics are negligible. Show your work.</span></span>
<span class="line"><span>(d) Substitute vg(t)= VM| sin(ωt)| and ic(t)= vg(t)/Re, into your result of part (c), to</span></span>
<span class="line"><span>determine an expression for ig(t). How does ig(t)d iﬀer from a rectiﬁed sinusoid?</span></span>
<span class="line"><span>18.11 Figure 18.65 shows a buck converter with a charge controller [ 179]. Operation of the</span></span>
<span class="line"><span>charge controller is similar to operation of the current-programmed controller. At the</span></span>
<span class="line"><span>beginning of each switching period, at time t= 0, a short clock pulse sets the SR latch.</span></span>
<span class="line"><span>The logic high signal at the Q output of the latch turns the power MOSFET on. At the</span></span>
<span class="line"><span>same time, the logic low signal at theQ output of the latch turns the switchS s oﬀ. Current</span></span>
<span class="line"><span>Ksis proportional to the power MOSFET current charges the capacitor Cs.A t t= dTs,</span></span>
<span class="line"><span>the capacitor voltage vq(t) reaches the control input voltage Rf ic, the comparator output</span></span>
<span class="line"><span>goes high and resets the latch. The logic low signal at the Q output of the latch turns the</span></span>
<span class="line"><span>power MOSFET oﬀ. At the same time, the logic high signal at the Q output of the latch</span></span>
<span class="line"><span>turns the switch S s on, which quickly discharges the capacitor Cs to zero.</span></span>
<span class="line"><span>Fig. 18.65 Buck converter with charge controller, Problem 18.11</span></span>
<span class="line"><span></span></span>
<span class="line"><span>18.10 Summary of Key Points 803</span></span>
<span class="line"><span>In this problem, the converter and controller parameters are: Vg = 24 V, fs = 1/Ts =</span></span>
<span class="line"><span>100 kHz, L= 60μH, C= 100 μF, R= 3Ω, KsTs/Cs = Rf = 1Ω. You can assume that</span></span>
<span class="line"><span>the converter operates in continuous conduction mode.</span></span>
<span class="line"><span>(a) Find expressions for the average values of the switch network terminal waveforms,</span></span>
<span class="line"><span>and hence derive a large-signal averaged switch model of the buck switch network</span></span>
<span class="line"><span>with charge control. The control input to the model is the control current ic.T h e</span></span>
<span class="line"><span>averaged switch model should consist of a current source and a power source. The</span></span>
<span class="line"><span>switch duty cycle d should not appear in the model.</span></span>
<span class="line"><span>(b) Using the averaged switch model derived in part (a), ﬁnd an expression for the quies-</span></span>
<span class="line"><span>cent output voltage V as a function of Vg, Ic, and R.G i v e nIc = 2 A, ﬁnd numerical</span></span>
<span class="line"><span>values for V, I1, I2, and the duty cycle D. For this quiescent operating point, sketch</span></span>
<span class="line"><span>the waveforms i1(t), i2(t), and vq(t) during one switching period.</span></span>
<span class="line"><span>(c) Perturb and linearize the averaged switch model from part (a) to derive a small-</span></span>
<span class="line"><span>signal averaged switch model for the buck switch network with charge control. Find</span></span>
<span class="line"><span>analytical expressions for all parameter values in terms of the converter parameters</span></span>
<span class="line"><span>and the quiescent operating conditions. Sketch the complete small-signal model of</span></span>
<span class="line"><span>the buck converter with the charge controller.</span></span>
<span class="line"><span>(d) Solve the model obtained in part (c) to ﬁnd the control-to-output transfer function</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>vc(s)= ˆv/ˆic. At the quiescent operating point found in part (b), construct the Bode</span></span>
<span class="line"><span>plot for the magnitude ofGvc and label all salient features of the magnitude response.</span></span>
<span class="line"><span>(e) Comment on advantages charge control may have compared to duty-cycle control or</span></span>
<span class="line"><span>current-programmed control.</span></span>
<span class="line"><span>18.12 Figure 18.66 shows a buck converter with a one-cycle controller [ 180]. Operation of</span></span>
<span class="line"><span>the one-cycle controller is similar to operation of the current-programmed controller. At</span></span>
<span class="line"><span>the beginning of each switching period, at time t= 0, a short clock pulse sets the SR</span></span>
<span class="line"><span>latch. The logic high signal at the Q output of the latch turns the power MOSFET on. At</span></span>
<span class="line"><span>the same time, the logic low signal at the Q output of the latch turns the switch S s oﬀ.</span></span>
<span class="line"><span>Current Gsv2(t) proportional to the voltagev2(t) charges the capacitorCs.A t t= dTs,t h e</span></span>
<span class="line"><span>capacitor voltage vs(t) reaches the control input voltage vc, the comparator output goes</span></span>
<span class="line"><span>high and resets the latch. The logic low signal at theQ output of the latch turns the power</span></span>
<span class="line"><span>MOSFET oﬀ. At the same time, the logic high signal at the Q output of the latch turns</span></span>
<span class="line"><span>the switch S s on, which quickly discharges the capacitor Cs to zero.</span></span>
<span class="line"><span>In this problem, the converter and controller parameters are: Vg = 24 V, fs = 1/Ts =</span></span>
<span class="line"><span>100 kHz, L= 60 μH, C= 100 μF, R= 3Ω, GsTs/Cs = 1. You can assume that the</span></span>
<span class="line"><span>converter operates in the continuous conduction mode.</span></span>
<span class="line"><span>(a) Find expressions for the average values of the switch network terminal waveforms,</span></span>
<span class="line"><span>and hence derive a large-signal averaged switch model of the buck switch network</span></span>
<span class="line"><span>with one-cycle control. The control input to the model is the control voltage vc.T h e</span></span>
<span class="line"><span>switch duty cycle d should not appear in the model.</span></span>
<span class="line"><span>(b) Using the averaged switch model derived in part (a), ﬁnd an expression for the qui-</span></span>
<span class="line"><span>escent output voltage V as a function of Vc.G i v e nVc = 10 V, ﬁnd the numerical</span></span>
<span class="line"><span>values for V, I1, I2, and the duty cycle D. For this quiescent operating point, sketch</span></span>
<span class="line"><span>the waveforms i1(t), i2(t), and vs(t) during one switching period.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>804 18 Current-Programmed Control</span></span>
<span class="line"><span>Fig. 18.66 Buck converter with one-cycle controller, Problem 18.12</span></span>
<span class="line"><span>(c) Perturb and linearize the averaged switch model from part (a) to derive a small-signal</span></span>
<span class="line"><span>averaged switch model for the buck switch network with one-cycle control. Find</span></span>
<span class="line"><span>analytical expressions for all parameter values in terms of the converter parameters</span></span>
<span class="line"><span>and the quiescent operating conditions. Sketch the complete small-signal model of</span></span>
<span class="line"><span>the buck converter with the one-cycle controller.</span></span>
<span class="line"><span>(d) Solve the model obtained in part (c) to ﬁnd the control-to-output transfer function</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>vc(s)= ˆv/ˆvc, and the line-to-output transfer function Gvg(s)= ˆv/ˆvg. For the qui-</span></span>
<span class="line"><span>escent operating point found in part (b), sketch the magnitude Bode plots of these</span></span>
<span class="line"><span>transfer functions, and label all salient features.</span></span>
<span class="line"><span>(e) Comment on advantages one-cycle control may have compared to duty-cycle con-</span></span>
<span class="line"><span>trol.</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
