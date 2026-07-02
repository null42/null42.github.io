import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const f=JSON.parse('{"title":"第9章part 2 - 9 Controller Design","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第9章part 2 - 9 Controller Design","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 378-397 > Chunk ID: `chapter-9-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/025-chapter-9-part-2.md","filePath":"content/power/fundamentals-work/chunks/025-chapter-9-part-2.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/025-chapter-9-part-2.md"};function i(t,n,c,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第9章part-2-9-controller-design" tabindex="-1">第9章part 2 - 9 Controller Design <a class="header-anchor" href="#第9章part-2-9-controller-design" aria-label="Permalink to &quot;第9章part 2 - 9 Controller Design&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 378-397<br> Chunk ID: <code>chapter-9-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>9.4 Stability 367</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>Unit circle</span></span>
<span class="line"><span>f = 0f</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>3</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>–1</span></span>
<span class="line"><span>Re[T(s)]</span></span>
<span class="line"><span>Im[T(s)]</span></span>
<span class="line"><span>T(jω )</span></span>
<span class="line"><span>T(–jω )</span></span>
<span class="line"><span>®¥</span></span>
<span class="line"><span>Fig. 9.18 Nyquist plot for the example having three crossover frequencies (Fig. 9.17): (a) mapping of</span></span>
<span class="line"><span>the contourΓA through the loop gain T(s), (b) mapping of the complete Nyquist contour through the loop</span></span>
<span class="line"><span>gain T(s)</span></span>
<span class="line"><span>the−1 point is encircled twice. Hence, the closed-loop transfer functions contain two poles in</span></span>
<span class="line"><span>the right half of the complex plane, and this feedback system is unstable.</span></span>
<span class="line"><span>Example 3: Integrator in Feedback Loop</span></span>
<span class="line"><span>If the Nyquist contourΓpasses through one or more singularities of the loop gainT(s), then the</span></span>
<span class="line"><span>conformal mapping property is lost, and the arguments of the above sections no longer apply.</span></span>
<span class="line"><span>This case can occur when the loop gain T(s) contains one or more poles lying on the imaginary</span></span>
<span class="line"><span>axis. A common example is the use of an integrator in the compensator (see Sect.9.5.2), leading</span></span>
<span class="line"><span>to a pole at the origin. An example of a loop gain containing a pole at the origin is:</span></span>
<span class="line"><span>T(s)= 1⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>) (9.33)</span></span>
<span class="line"><span>The corner frequenciesω0,ω1, andω2 are positive and real in this example. This special case</span></span>
<span class="line"><span>can be handled by redeﬁning the Nyquist contour of Fig.9.13 as illustrated in Fig.9.19. A fourth</span></span>
<span class="line"><span>segmentΓD is added, to jog the contour around the singularity. Segment ΓD is deﬁned to be a</span></span>
<span class="line"><span>semicircular arc as follows:</span></span>
<span class="line"><span>s=ϵ ejθ with ϵ→0 and θ∈(−90◦,+90◦) (9.34)</span></span>
<span class="line"><span>The loop gain T(s)o fE q . (9.33) contains no poles inside the modiﬁed Nyquist contour of</span></span>
<span class="line"><span>Fig. 9.19. Hence the number of right half-plane poles of the closed-loop transfer function</span></span>
<span class="line"><span>T/(1+ T) is equal to the number of encirclements of the −1 point by the mapped modiﬁed</span></span>
<span class="line"><span>Nyquist contour T(Γ).</span></span>
<span class="line"><span>The magnitude and phase Bode plot ofT(s) is sketched in Fig.9.20 for some speciﬁc values</span></span>
<span class="line"><span>ofω0,ω1, andω2. For this example, T(s) exhibits a crossover frequency fc with phase margin</span></span>
<span class="line"><span>ϕm as illustrated.</span></span>
<span class="line"><span>Figure 9.21a illustrates the ﬁrst part of the Nyquist plot, in which segment ΓA is mapped</span></span>
<span class="line"><span>through the loop gain T(s). Along this segment, s= jωwithωvarying fromϵ (→0) to∞.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>368 9 Controller Design</span></span>
<span class="line"><span>Fig. 9.19 Modiﬁcation of the Nyquist contour to</span></span>
<span class="line"><span>handle the special case in which the loop gain in-</span></span>
<span class="line"><span>cludes a pole at the origin. Segment Γ</span></span>
<span class="line"><span>D deﬁned by</span></span>
<span class="line"><span>Eq. (9.34) routes the Nyquist contour around the pole</span></span>
<span class="line"><span>at s = 0. The locations of poles of Eq. ( 9.33)a r e</span></span>
<span class="line"><span>marked x</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>Crossover</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>–20 dB</span></span>
<span class="line"><span>–40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>0˚</span></span>
<span class="line"><span>–90˚</span></span>
<span class="line"><span>–180˚</span></span>
<span class="line"><span>–270˚</span></span>
<span class="line"><span>ϕm</span></span>
<span class="line"><span>∠ T</span></span>
<span class="line"><span>∠ T||T ||</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>fp2</span></span>
<span class="line"><span>Fig. 9.20 Bode plot of loop gain T(s) for the example of Eq. (9.33)</span></span>
<span class="line"><span>SegmentΓB is again deﬁned by Eq. (9.28), and this segment again maps to the origin. Seg-</span></span>
<span class="line"><span>mentΓC is the complex conjugate of ΓC. The mapping of contours ΓA,ΓB, andΓC through</span></span>
<span class="line"><span>the loop gain T(s) is illustrated in Fig. 9.21b. It can be seen that this contour is not closed; to</span></span>
<span class="line"><span>complete the mapped contour,ΓD must be incorporated.</span></span>
<span class="line"><span>Substitution of the mapping deﬁned by Eq. (9.34) into the loop gain of Eq. (9.33) leads to:</span></span>
<span class="line"><span>T(ϵejθ)= 1⎦ϵejθ</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ϵejθ</span></span>
<span class="line"><span>ω1</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ϵejθ</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>) (9.35)</span></span>
<span class="line"><span>Asϵ tends to zero, the pole terms associated with the corner frequencies ω1 andω2 tend to 1.</span></span>
<span class="line"><span>Equation (9.35) then reduces to</span></span>
<span class="line"><span>T(ϵejθ)=ω0 e−jθ</span></span>
<span class="line"><span>ϵ (9.36)</span></span>
<span class="line"><span>Asϵ tends to zero, the magnitude of Eq. ( 9.36) tends to inﬁnity. As θvaries from −90◦to</span></span>
<span class="line"><span>+90◦, the phase of the mapped contour varies from +90◦to−90◦. The complete contour is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 369</span></span>
<span class="line"><span>Fig. 9.21 Nyquist plot for the example of an integrator in the feedback loop (Fig. 9.20): (a) mapping of</span></span>
<span class="line"><span>the contourΓA through the loop gain T(s), (b) mapping of the contoursΓA,ΓB,a n dΓC through the loop</span></span>
<span class="line"><span>gain T(s), (c) mapping of complete modiﬁed Nyquist contour</span></span>
<span class="line"><span>illustrated in Fig. 9.21c. It can be seen that the mapped contour is now closed, and that there</span></span>
<span class="line"><span>are no encirclements of the−1 point provided that the phase margin is positive. The contour of</span></span>
<span class="line"><span>Fig. 9.21c represents a stable system.</span></span>
<span class="line"><span>Summary: Nyquist Stability Criterion</span></span>
<span class="line"><span>Thus, the Nyquist stability criterion is closely related to the Bode plot of the loop gain. The</span></span>
<span class="line"><span>segmentΓA corresponds to letting s= jω, and the mapping of ΓA through the loop gain T(s)</span></span>
<span class="line"><span>constitutes a polar plot of T( jω). The number of right half-plane poles of the closed-loop trans-</span></span>
<span class="line"><span>fer functions T/(1+T) and 1/(1+T) is rigorously discerned via determination of the number of</span></span>
<span class="line"><span>encirclements of the−1 point by the Nyquist contour mapped through the loop gain T(s). This</span></span>
<span class="line"><span>explains the origins of the phase margin test, and also provides a stability test for more complex</span></span>
<span class="line"><span>cases such as loop gains having multiple crossover frequencies.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>370 9 Controller Design</span></span>
<span class="line"><span>9.4.3 The Relationship Between Phase Margin and Closed-Loop Damping Factor</span></span>
<span class="line"><span>How much phase margin is necessary? Is a worst-case phase margin of 1 ◦satisfactory? Of</span></span>
<span class="line"><span>course, good designs should have adequate design margins, but there is another important reason</span></span>
<span class="line"><span>why additional phase margin is needed. A small phase margin (in T) causes the closed-loop</span></span>
<span class="line"><span>transfer functions T/(1+ T) and 1/(1+ T) to exhibit resonant poles with high Q in the vicinity</span></span>
<span class="line"><span>of the crossover frequency. The system transient response exhibits overshoot and ringing. As</span></span>
<span class="line"><span>the phase margin is reduced these characteristics become worse (higherQ, longer ringing) until,</span></span>
<span class="line"><span>for ϕm≤0◦, the system becomes unstable.</span></span>
<span class="line"><span>Let us consider a loop gainT(s) which is well-approximated, in the vicinity of the crossover</span></span>
<span class="line"><span>frequency, by the following function:</span></span>
<span class="line"><span>T(s)= 1⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>) (9.37)</span></span>
<span class="line"><span>Magnitude and phase asymptotes are plotted in Fig.9.22. This function is a good approximation</span></span>
<span class="line"><span>near the crossover frequency for many common loop gains, in which∥ T∥ approaches unity gain</span></span>
<span class="line"><span>with a−20 dB/decade slope, with an additional pole at frequency f2 = ω2/2π. Any additional</span></span>
<span class="line"><span>poles and zeroes are assumed to be suﬃciently far above or below the crossover frequency, such</span></span>
<span class="line"><span>that they have negligible eﬀect on the system transfer functions near the crossover frequency.</span></span>
<span class="line"><span>Note that, as f2→∞, the phase marginϕm approaches 90◦.A s f2→0, ϕm→0◦.S oa s f2</span></span>
<span class="line"><span>is reduced, the phase margin is also reduced. Let’s investigate how this aﬀects the closed-loop</span></span>
<span class="line"><span>response via T/(1+ T). We can write</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s)= 1</span></span>
<span class="line"><span>1+ 1</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>+ s2</span></span>
<span class="line"><span>ω0ω2</span></span>
<span class="line"><span>(9.38)</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>f2/10</span></span>
<span class="line"><span>10f2</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0 f2</span></span>
<span class="line"><span>f 2</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>Fig. 9.22 Magnitude and phase asymptotes for the loop gain T of Eq. (9.37)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 371</span></span>
<span class="line"><span>using Eq. (9.37). By putting this into the standard normalized quadratic form, one obtains</span></span>
<span class="line"><span>T(s)</span></span>
<span class="line"><span>1+ T(s)= 1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 (9.39)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>ωc=√ω0ω2= 2πfc</span></span>
<span class="line"><span>Q= ω0</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>√ω0</span></span>
<span class="line"><span>ω2</span></span>
<span class="line"><span>So the closed-loop response contains quadratic poles at fc, the geometric mean of f0 and f2.</span></span>
<span class="line"><span>These poles have a low Q-factor when f0 ≪ f2. In this case, we can use the low- Q approxima-</span></span>
<span class="line"><span>tion to estimate their frequencies:</span></span>
<span class="line"><span>Qωc= ω0 (9.40)</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>Q = ω2</span></span>
<span class="line"><span>Magnitude asymptotes are plotted in Fig.9.23 for this case. It can be seen that these asymptotes</span></span>
<span class="line"><span>conform to the rules of Sect.9.3 for constructing T/(1+T) by the algebra-on-the-graph method.</span></span>
<span class="line"><span>Next consider the high-Q case. When the pole frequency f2 is reduced, reducing the phase</span></span>
<span class="line"><span>margin, then the Q-factor given by Eq. (9.39) is increased. For Q&gt; 0.5, resonant poles occur at</span></span>
<span class="line"><span>frequency fc. The magnitude Bode plot for the case f2&lt; f0 is given in Fig.9.24. The frequency</span></span>
<span class="line"><span>fc continues to be the geometric mean of f2 and f0, and fc now coincides with the crossover</span></span>
<span class="line"><span>(unity-gain) frequency of the∥ T∥ asymptotes. The exact value of the closed-loop gainT/(1+T)</span></span>
<span class="line"><span>at frequency fc is equal to Q= f0/ fc. As shown in Fig. 9.24, this is identical to the value of the</span></span>
<span class="line"><span>low-frequency−20 dB/decade asymptote ( f0/ f ), evaluated at frequency fc. It can be seen that</span></span>
<span class="line"><span>the Q-factor becomes very large as the pole frequency f2 is reduced.</span></span>
<span class="line"><span>The asymptotes of Fig. 9.24 also follow the algebra-on-the-graph rules of Sect. 9.3,b u tt h e</span></span>
<span class="line"><span>deviation of the exact curve from the asymptotes is not predicted by the algebra-on-the-graph</span></span>
<span class="line"><span>method.</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0 f2</span></span>
<span class="line"><span>f 2</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>fc = f0 f2</span></span>
<span class="line"><span>Q = f0 / fc</span></span>
<span class="line"><span>Fig. 9.23 Construction of magnitude asymptotes of the closed-loop transfer function T/(1+ T), for the</span></span>
<span class="line"><span>low-Q case</span></span>
<span class="line"><span></span></span>
<span class="line"><span>372 9 Controller Design</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>f0 f2</span></span>
<span class="line"><span>f 2</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>1+ T fc = f0 f2</span></span>
<span class="line"><span>Q = f0/fc</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>Fig. 9.24 Construction of magnitude asymptotes of the closed-loop transfer function T/(1+ T), for the</span></span>
<span class="line"><span>high-Q case</span></span>
<span class="line"><span>These two poles with Q-factor appear in both T/(1+T) and 1/(1+T). We need an easy way</span></span>
<span class="line"><span>to predict the Q-factor. We can obtain such a relationship by ﬁnding the frequency at which the</span></span>
<span class="line"><span>magnitude of T is exactly equal to unity. We then evaluate the exact phase ofT at this frequency,</span></span>
<span class="line"><span>and compute the phase margin. This phase margin is a function of the ratiof0/ f2,o r Q2. We can</span></span>
<span class="line"><span>then solve to ﬁnd Q as a function of the phase margin. The result is</span></span>
<span class="line"><span>Q=</span></span>
<span class="line"><span>√cosϕm</span></span>
<span class="line"><span>sinϕm</span></span>
<span class="line"><span>ϕm= tan−1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 4Q4</span></span>
<span class="line"><span>2Q4</span></span>
<span class="line"><span>(9.41)</span></span>
<span class="line"><span>This function is plotted in Fig. 9.25, with Q expressed in dB. It can be seen that obtaining real</span></span>
<span class="line"><span>poles (Q&lt; 0.5) requires a phase margin of at least 76◦. To obtain Q= 1, a phase margin of 52◦</span></span>
<span class="line"><span>is needed. The system with a phase margin of 1◦exhibits a closed-loop response with very high</span></span>
<span class="line"><span>Q! With a small phase margin, T( jω) is very nearly equal to−1 in the vicinity of the crossover</span></span>
<span class="line"><span>frequency. The denominator (1+ T) then becomes very small, causing the closed-loop transfer</span></span>
<span class="line"><span>functions to exhibit a peaked response at frequencies near the crossover frequency fc.</span></span>
<span class="line"><span>Figure 9.25 is the result for the simple loop gain deﬁned by Eq. ( 9.37). However, this loop</span></span>
<span class="line"><span>gain is a good approximation for many other loop gains that are encountered in practice, in</span></span>
<span class="line"><span>which∥ T∥ approaches unity gain with a−20 dB/decade slope, with an additional pole at fre-</span></span>
<span class="line"><span>quency f2. If all other poles and zeroes of T(s)a r es uﬃciently far above or below the crossover</span></span>
<span class="line"><span>frequency, then they have negligible eﬀect on the system transfer functions near the crossover</span></span>
<span class="line"><span>frequency, and Fig.9.25 gives a good approximation for the relationship betweenϕm and Q.</span></span>
<span class="line"><span>Another common case is the one in which∥ T∥ approaches unity gain with a−40 dB/decade</span></span>
<span class="line"><span>slope, with an additional zero at frequency f2.A s f2 is increased, the phase margin is decreased</span></span>
<span class="line"><span>and Q is increased. It can be shown that the relation betweenϕm and Q is exactly the same, Eq.</span></span>
<span class="line"><span>(9.41).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 373</span></span>
<span class="line"><span>0° 10° 20° 30° 40° 50° 60° 70° 80° 90°</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>Q =1 0 dB</span></span>
<span class="line"><span>Q = 0.5</span></span>
<span class="line"><span>m = 52</span></span>
<span class="line"><span>m = 76</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>5 dB</span></span>
<span class="line"><span>10 dB</span></span>
<span class="line"><span>15 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>Fig. 9.25 Relationship between loop-gain phase marginϕm and closed-loop peaking factor Q</span></span>
<span class="line"><span>A case where Fig. 9.25 fails is when the loop gain T(s) contains three or more poles at or</span></span>
<span class="line"><span>near the crossover frequency. The closed-loop response then also contains three or more poles</span></span>
<span class="line"><span>near the crossover frequency, and these poles cannot be completely characterized by a single</span></span>
<span class="line"><span>Q-factor. Additional work is required to ﬁnd the behavior of the exact T/(1+ T) and 1/(1+ T)</span></span>
<span class="line"><span>near the crossover frequency, but nonetheless it can be said that a small phase margin leads to a</span></span>
<span class="line"><span>peaked closed-loop response.</span></span>
<span class="line"><span>9.4.4 Transient Response vs. Damping Factor</span></span>
<span class="line"><span>One can solve for the unit-step response of the T/(1+ T) transfer function, by multiplying</span></span>
<span class="line"><span>Eq. (9.39)b y1/s and then taking the inverse Laplace transform. The result for Q&gt; 0.5i s</span></span>
<span class="line"><span>ˆv(t)= 1+ 2Qe−ωct/2Q</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>4Q2−1</span></span>
<span class="line"><span>sin</span></span>
<span class="line"><span>⎡⎢⎢⎢⎢⎢⎣</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>4Q2−1</span></span>
<span class="line"><span>2Q ωct+ tan−1 ⎦√</span></span>
<span class="line"><span>4Q2−1</span></span>
<span class="line"><span>)⎤⎥⎥⎥⎥⎥⎦ (9.42)</span></span>
<span class="line"><span>For Q&lt; 0.5, the result is</span></span>
<span class="line"><span>ˆv(t)= 1−ω2</span></span>
<span class="line"><span>ω2−ω1</span></span>
<span class="line"><span>e−ω1t−ω1</span></span>
<span class="line"><span>ω1−ω2</span></span>
<span class="line"><span>e−ω2t (9.43)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>ω1,ω2=ωc</span></span>
<span class="line"><span>2Q</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1±</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−4Q2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(9.44)</span></span>
<span class="line"><span>These equations are plotted in Fig. 9.26 for various values of Q.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>374 9 Controller Design</span></span>
<span class="line"><span>Fig. 9.26 Unit-step response of the second-order system, Eqs. (9.42)a n d(9.43), for various values of Q</span></span>
<span class="line"><span>According to Eq. (9.39), when f2 &gt; 4 f0,t h eQ-factor is less than 0.5, and the closed-loop</span></span>
<span class="line"><span>response contains a low-frequency and a high-frequency real pole. The transient response in</span></span>
<span class="line"><span>this case, Eq. (9.43), contains decaying-exponential functions of time, of the form</span></span>
<span class="line"><span>Ae</span></span>
<span class="line"><span>(pole)t (9.45)</span></span>
<span class="line"><span>This is called the “overdamped” case. With very low Q, the low-frequency pole leads to a slow</span></span>
<span class="line"><span>step response.</span></span>
<span class="line"><span>For f2= 4 f0,t h eQ-factor is equal to 0.5. The closed-loop response contains two real poles</span></span>
<span class="line"><span>at frequency 2 f0. This is called the “critically damped” case. The transient response is faster</span></span>
<span class="line"><span>than in the overdamped case, because the lowest-frequency pole is at a higher frequency. This is</span></span>
<span class="line"><span>the fastest response that does not exhibit overshoot. Atωct=πradians (t= 1/2 fc), the voltage</span></span>
<span class="line"><span>has reached 82% of its ﬁnal value. At ωct= 2πradians (t= 1/ fc), the voltage has reached</span></span>
<span class="line"><span>98.6% of its ﬁnal value.</span></span>
<span class="line"><span>For f2 &lt; 4 f0,t h eQ-factor is greater than 0.5. The closed-loop response contains complex</span></span>
<span class="line"><span>poles, and the transient response exhibits sinusoidal-type waveforms with decaying amplitude,</span></span>
<span class="line"><span>Eq. (9.42). The rise time of the step response is faster than in the critically damped case, but the</span></span>
<span class="line"><span>waveforms exhibit overshoot. The peak value of v(t)i s</span></span>
<span class="line"><span>peak ˆv(t)= 1+ e</span></span>
<span class="line"><span>−π/</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>4Q2−1 (9.46)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.4 Stability 375</span></span>
<span class="line"><span>This is called the “underdamped” case. A Q-factor of 1 leads to an overshoot of 16.3%, while</span></span>
<span class="line"><span>a Q-factor of 2 leads to a 44.4% overshoot. Large Q-factors lead to overshoots approaching</span></span>
<span class="line"><span>100%.</span></span>
<span class="line"><span>The exact transient response of the feedback loop may di ﬀer from the plots of Fig. 9.26,</span></span>
<span class="line"><span>because of additional poles and zeroes in T, and because of diﬀerences in initial conditions.</span></span>
<span class="line"><span>Nonetheless, Fig.9.26 illustrates how high-Q poles lead to overshoot and ringing. In most power</span></span>
<span class="line"><span>applications, overshoot is unacceptable. For example, in a 3.3 V computer power supply, the</span></span>
<span class="line"><span>voltage must not be allowed to overshoot to 5 or 6 volts when the supply is turned on—this</span></span>
<span class="line"><span>would likely destroy all of the integrated circuits in the computer! So the Q-factor must be</span></span>
<span class="line"><span>suﬃciently low, often 0.5 or less, corresponding to a phase margin of at least 76◦.</span></span>
<span class="line"><span>9.4.5 Load Step Response vs. Damping Factor</span></span>
<span class="line"><span>Usually we also are interested in the response of the output voltage to a step change in load cur-</span></span>
<span class="line"><span>rent. Let us consider the case where the closed-loop output impedance can be well approximated</span></span>
<span class="line"><span>by a second-order function of the form</span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>out(s)=</span></span>
<span class="line"><span>⎦sR0</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Qωc</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ωc</span></span>
<span class="line"><span>)2 (9.47)</span></span>
<span class="line"><span>This constitutes an eﬀective parallel R−L−C impedance having characteristic impedance R0,</span></span>
<span class="line"><span>resonant frequency fc, and Q-factor Q. Also consider that the load current takes a step change</span></span>
<span class="line"><span>of magnitude I0, with the following Laplace transform:</span></span>
<span class="line"><span>ˆiload= I0</span></span>
<span class="line"><span>s (9.48)</span></span>
<span class="line"><span>One can multiply Eqs. ( 9.47) and ( 9.48), and then invert the Laplace transform to derive an</span></span>
<span class="line"><span>expression for the output voltage response ˆv(t). For Q&lt; 0.5, the result is:</span></span>
<span class="line"><span>ˆv(t)=−I0R0Q√</span></span>
<span class="line"><span>1−4Q2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>e−ω1t−e−ω2t)</span></span>
<span class="line"><span>(9.49)</span></span>
<span class="line"><span>withω1 andω2 deﬁned as in Eq. (9.44). For the high-Q case Q&gt; 0.5, the result is:</span></span>
<span class="line"><span>ˆv(t)=−I0R02Q√</span></span>
<span class="line"><span>4Q2−1</span></span>
<span class="line"><span>e−ωct/2Q sin</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>4Q2−1</span></span>
<span class="line"><span>2Q ωct</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠ (9.50)</span></span>
<span class="line"><span>These equations are plotted in Fig. 9.27 for various values of Q and for I0R0= 1. For non-unity</span></span>
<span class="line"><span>I0R0, the curves can be multiplied by I0R0: the peak deviation in ˆ v(t) is proportional to the</span></span>
<span class="line"><span>magnitude of the current step I0 multiplied by the characteristic impedance R0.F o rQ&lt; 0.5, the</span></span>
<span class="line"><span>peak voltage deviation has magnitude slightly less than I0R0Q.A t Q= 0.5, the peak voltage</span></span>
<span class="line"><span>deviation is approximately−0.368 I0R0.A s Q→∞, the peak voltage deviation tends to−I0R0.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>376 9 Controller Design</span></span>
<span class="line"><span>ct</span></span>
<span class="line"><span>0 5 10 15</span></span>
<span class="line"><span>-1</span></span>
<span class="line"><span>-0.5</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Q = 50</span></span>
<span class="line"><span>Q = 10</span></span>
<span class="line"><span>Q = 4</span></span>
<span class="line"><span>Q = 2</span></span>
<span class="line"><span>Q = 1</span></span>
<span class="line"><span>Q = 0.75</span></span>
<span class="line"><span>Q = 0.5</span></span>
<span class="line"><span>Q = 0.3</span></span>
<span class="line"><span>Q = 0.2</span></span>
<span class="line"><span>Q = 0.1</span></span>
<span class="line"><span>Q = 0.05</span></span>
<span class="line"><span>Fig. 9.27 Response of the second-order system to a unit step change in load current, Eqs. ( 9.49)</span></span>
<span class="line"><span>and (9.50), for various values of Q. These curves are plotted for I0R0= 1</span></span>
<span class="line"><span>9.5 Regulator Design</span></span>
<span class="line"><span>Let’s now consider how to design a regulator system, to meet speciﬁcations or design goals re-</span></span>
<span class="line"><span>garding rejection of disturbances, transient response, and stability. Typical dc regulator designs</span></span>
<span class="line"><span>are deﬁned using speciﬁcations such as the following:</span></span>
<span class="line"><span>1. Eﬀect of load current variations on the output voltage regulation. The output voltage must</span></span>
<span class="line"><span>remain within a speciﬁed range when the load current varies in a prescribed way. This</span></span>
<span class="line"><span>amounts to a limit on the maximum magnitude of the closed-loop output impedance of</span></span>
<span class="line"><span>Eq. (9.6), repeated below</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>−ˆiload(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐⏐⏐ ˆvg=0</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>= Zout(s)</span></span>
<span class="line"><span>1+ T(s) (9.51)</span></span>
<span class="line"><span>If, over some frequency range, the open-loop output impedance Zout has magnitude that</span></span>
<span class="line"><span>exceeds the limit, then the loop gain T must be suﬃciently large in magnitude over the</span></span>
<span class="line"><span>same frequency range, such that the magnitude of the closed-loop output impedance given</span></span>
<span class="line"><span>in Eq. (9.51) is less than the given limit.</span></span>
<span class="line"><span>2. Eﬀect of input voltage variations (for example, at the second harmonic of the ac line fre-</span></span>
<span class="line"><span>quency) on the output voltage regulation . Speciﬁc maximum limits are usually placed on</span></span>
<span class="line"><span>the amplitude of variations in the output voltage at the second harmonic of the ac line fre-</span></span>
<span class="line"><span>quency (120 Hz or 100 Hz). If we know the magnitude of the rectiﬁcation voltage ripple</span></span>
<span class="line"><span>which appears at the converter input (as ˆvg), then we can calculate the resulting output volt-</span></span>
<span class="line"><span>age ripple (in ˆv) using the closed loop line-to-output transfer function of Eq. (9.5), repeated</span></span>
<span class="line"><span>below</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.5 Regulator Design 377</span></span>
<span class="line"><span>ˆv(s)</span></span>
<span class="line"><span>ˆvg(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ˆvre f=0</span></span>
<span class="line"><span>ˆiload=0</span></span>
<span class="line"><span>= Gvg(s)</span></span>
<span class="line"><span>1+ T(s) (9.52)</span></span>
<span class="line"><span>The output voltage ripple can be reduced by increasing the magnitude of the loop gain at</span></span>
<span class="line"><span>the ripple frequency. In a typical good design,∥ T∥ is 20 dB or more at 120 Hz, so that the</span></span>
<span class="line"><span>transfer function of Eq. (9.52) is at least an order of magnitude smaller than the open-loop</span></span>
<span class="line"><span>line-to-output transfer function∥ Gvg∥.</span></span>
<span class="line"><span>3. Transient response time. When a speciﬁed large disturbance occurs, such as a large step</span></span>
<span class="line"><span>change in load current or input voltage, the output voltage may undergo a transient. Dur-</span></span>
<span class="line"><span>ing this transient, the output voltage typically deviates from its speciﬁed allowable range.</span></span>
<span class="line"><span>Eventually, the feedback loop operates to return the output voltage within tolerance. The</span></span>
<span class="line"><span>time required to do so is the transient response time; typically, the response time can be</span></span>
<span class="line"><span>shortened by increasing the feedback loop crossover frequency.</span></span>
<span class="line"><span>4. Overshoot and ringing . As discussed in Sect. 9.4.4, the amount of overshoot and ringing</span></span>
<span class="line"><span>allowed in the transient response may be limited. Such a speciﬁcation implies that the phase</span></span>
<span class="line"><span>margin must be suﬃciently large.</span></span>
<span class="line"><span>Each of these requirements imposes constraints on the loop gainT(s). Therefore, the design</span></span>
<span class="line"><span>of the control system involves modifying the loop gain. As illustrated in Fig.9.2, a compensator</span></span>
<span class="line"><span>network is added for this purpose. Several well-known strategies for design of the compensator</span></span>
<span class="line"><span>transfer function G</span></span>
<span class="line"><span>c(s) are discussed below.</span></span>
<span class="line"><span>9.5.1 Lead ( PD) compensator</span></span>
<span class="line"><span>This type of compensator transfer function is used to improve the phase margin. A zero is added</span></span>
<span class="line"><span>to the loop gain, at a frequency fz suﬃciently far below the crossover frequency fc, such that</span></span>
<span class="line"><span>the phase margin of T(s) is increased by the desired amount. The lead compensator is also</span></span>
<span class="line"><span>called a proportional-plus-derivative,o r PD, controller—at high frequencies, the zero causes</span></span>
<span class="line"><span>the compensator to diﬀerentiate the error signal. It often ﬁnds application in systems originally</span></span>
<span class="line"><span>containing a two-pole response. By use of this type of compensator, the bandwidth of the feed-</span></span>
<span class="line"><span>back loop (i.e., the crossover frequency fc) can be extended while maintaining an acceptable</span></span>
<span class="line"><span>phase margin.</span></span>
<span class="line"><span>As i d eeﬀect of the zero is that it causes the compensator gain to increase with frequency,</span></span>
<span class="line"><span>with a+20 dB/decade slope. So steps must be taken to ensure that∥ T∥ remains equal to unity</span></span>
<span class="line"><span>at the desired crossover frequency. Also, since the gain of any practical ampliﬁer must tend to</span></span>
<span class="line"><span>zero at high frequency, the compensator transfer function Gc(s) must contain high-frequency</span></span>
<span class="line"><span>poles. These poles also have the beneﬁcial eﬀect of attenuating high-frequency noise. Of partic-</span></span>
<span class="line"><span>ular concern are the switching frequency harmonics present in the output voltage and feedback</span></span>
<span class="line"><span>signals. If the compensator gain at the switching frequency is too great, then these switching</span></span>
<span class="line"><span>harmonics are ampliﬁed by the compensator, and can disrupt the operation of the pulse-width</span></span>
<span class="line"><span>modulator (see Sect. 7.3). So the compensator network should contain poles at a frequency less</span></span>
<span class="line"><span>than the switching frequency. These considerations typically restrict the crossover frequency</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>c to be less than approximately 10% of the converter switching frequency fs. In addition, the</span></span>
<span class="line"><span>circuit designer must take care not to exceed the gain-bandwidth limits of available operational</span></span>
<span class="line"><span>ampliﬁers.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>378 9 Controller Design</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span> Gc</span></span>
<span class="line"><span>GG c0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>fz /10</span></span>
<span class="line"><span>fp/10 10fz</span></span>
<span class="line"><span>fmax</span></span>
<span class="line"><span>= fz fp</span></span>
<span class="line"><span>+ 45 /decade</span></span>
<span class="line"><span>/decade</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>Gc0</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>||||</span></span>
<span class="line"><span>Fig. 9.28 Magnitude and phase asymptotes of the PD compensator transfer function Gc of Eq. (9.53)</span></span>
<span class="line"><span>The transfer function of the lead compensator therefore contains a low-frequency zero and</span></span>
<span class="line"><span>several high-frequency poles. A simpliﬁed example containing a single high-frequency pole is</span></span>
<span class="line"><span>given in Eq. (9.53) and illustrated in Fig. 9.28.</span></span>
<span class="line"><span>Gc(s)= Gc0</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωz</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp</span></span>
<span class="line"><span>) (9.53)</span></span>
<span class="line"><span>The maximum phase occurs at a frequency fϕmax given by the geometrical mean of the pole and</span></span>
<span class="line"><span>zero frequencies:</span></span>
<span class="line"><span>fϕmax=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>fz fp (9.54)</span></span>
<span class="line"><span>To obtain the maximum improvement in phase margin, we should design our compensator so</span></span>
<span class="line"><span>that the frequency fϕmax coincides with the loop gain crossover frequency fc. The value of the</span></span>
<span class="line"><span>phase at this frequency can be shown to be</span></span>
<span class="line"><span>∠Gc</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>fϕmax</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= tan−1</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎠ (9.55)</span></span>
<span class="line"><span>This equation is plotted in Fig. 9.29. Equation (9.55) can be inverted to obtain</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>= 1+ sin(θ)</span></span>
<span class="line"><span>1−sin(θ) (9.56)</span></span>
<span class="line"><span>where θ=∠Gc( fϕmax). Equations (9.55) and (9.53) imply that, to optimally obtain a compen-</span></span>
<span class="line"><span>sator phase lead ofθat frequency fc, the pole and zero frequencies should be chosen as follows:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.5 Regulator Design 379</span></span>
<span class="line"><span>1 10 100 1000</span></span>
<span class="line"><span>Maximum</span></span>
<span class="line"><span>phase lead</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>15</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>45</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>75</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>fp / fz</span></span>
<span class="line"><span>Fig. 9.29 Maximum phase leadθvs. frequency ratio fp/ fz for the lead compensator</span></span>
<span class="line"><span>fz= fc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−sin(θ)</span></span>
<span class="line"><span>1+ sin(θ)</span></span>
<span class="line"><span>fp= fc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ sin(θ)</span></span>
<span class="line"><span>1−sin(θ)</span></span>
<span class="line"><span>(9.57)</span></span>
<span class="line"><span>When it is desired to avoid changing the crossover frequency, the magnitude of the compen-</span></span>
<span class="line"><span>sator gain is chosen to be unity at the loop gain crossover frequency fc. This requires that Gc0</span></span>
<span class="line"><span>be chosen according to the following formula:</span></span>
<span class="line"><span>Gc0=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>(9.58)</span></span>
<span class="line"><span>It can be seen that Gc0 is less than unity, and therefore the lead compensator reduces the dc</span></span>
<span class="line"><span>gain of the feedback loop. Other choices of Gc0 can be selected when it is desired to shift the</span></span>
<span class="line"><span>crossover frequency fc; for example, increasing the value ofGc0 causes the crossover frequency</span></span>
<span class="line"><span>to increase. If the frequencies fp and fz are chosen as in Eq. (9.57), then fϕmax of Eq. (9.53) will</span></span>
<span class="line"><span>coincide with the new crossover frequency fc.</span></span>
<span class="line"><span>The Bode diagram of a typical loop gainT(s) containing two poles is illustrated in Fig.9.30.</span></span>
<span class="line"><span>The phase margin of the original T(s) is small, since the crossover frequency fc is substantially</span></span>
<span class="line"><span>greater than the pole frequency f0. The result of adding a lead compensator is also illustrated.</span></span>
<span class="line"><span>The lead compensator of this example is designed to maintain the same crossover frequency but</span></span>
<span class="line"><span>improve the phase margin.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>380 9 Controller Design</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span>T0</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>m</span></span>
<span class="line"><span>T0 Gc0 Original gain</span></span>
<span class="line"><span>Compensated gain</span></span>
<span class="line"><span>Original phase asymptotes</span></span>
<span class="line"><span>Compensated phase asymptotes</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>Fig. 9.30 Compensation of a loop gain containing two poles, using a lead (PD) compensator. The phase</span></span>
<span class="line"><span>marginϕm is improved</span></span>
<span class="line"><span>9.5.2 Lag ( PI) Compensator</span></span>
<span class="line"><span>This type of compensator is used to increase the low-frequency loop gain, such that the output</span></span>
<span class="line"><span>is better regulated at dc and at frequencies well below the loop crossover frequency. As given</span></span>
<span class="line"><span>in Eq. (9.59) and illustrated in Fig.9.31, an inverted zero is added to the loop gain, at frequency</span></span>
<span class="line"><span>fL.</span></span>
<span class="line"><span>Gc(s)= Gc∞</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ωL</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(9.59)</span></span>
<span class="line"><span>If fL is suﬃciently lower than the loop crossover frequency fc, then the phase margin is un-</span></span>
<span class="line"><span>changed. This type of compensator is also called a proportional-plus-integral,o r PI, controller.</span></span>
<span class="line"><span>At low frequencies, the inverted zero causes the compensator to integrate the error signal.</span></span>
<span class="line"><span>To the extent that the compensator gain can be made arbitrarily large at dc, the dc loop gain</span></span>
<span class="line"><span>T(0) becomes arbitrarily large. This causes the dc component of the error signal to approach</span></span>
<span class="line"><span>zero. In consequence, the steady-state output voltage is perfectly regulated, and the disturbance-</span></span>
<span class="line"><span>to-output transfer functions approach zero at dc. Such behavior is easily obtained in practice,</span></span>
<span class="line"><span>with the compensator of Eq. (9.59) realized using a conventional operational ampliﬁer.</span></span>
<span class="line"><span>Although the PI compensator is useful in nearly all types of feedback systems, it is an</span></span>
<span class="line"><span>especially simple and eﬀective approach for systems originally containing a single pole. For the</span></span>
<span class="line"><span>example of Fig. 9.32, the original uncompensated loop gain is of the form</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>u(s)= Tu0⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>) (9.60)</span></span>
<span class="line"><span>The compensator transfer function of Eq. ( 9.59) is used, so that the compensated loop gain is</span></span>
<span class="line"><span>T(s)= Tu(s) Gc(s). Magnitude and phase asymptotes of T(s) are also illustrated in Fig. 9.32.</span></span>
<span class="line"><span>The compensator high-frequency gain Gc∞is chosen to obtain the desired crossover frequency</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.5 Regulator Design 381</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>Gc</span></span>
<span class="line"><span> Gc</span></span>
<span class="line"><span>Gc</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>fL/10</span></span>
<span class="line"><span>+ 45 /decade</span></span>
<span class="line"><span>fL</span></span>
<span class="line"><span>10fL</span></span>
<span class="line"><span>|| ||</span></span>
<span class="line"><span>Fig. 9.31 Magnitude and phase asymptotes of the PI compensator transfer function Gc of Eq. (9.59)</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>Gc Tu0</span></span>
<span class="line"><span>fL</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Tu0</span></span>
<span class="line"><span> Tu</span></span>
<span class="line"><span>u</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| T ||</span></span>
<span class="line"><span>|| T || fc</span></span>
<span class="line"><span> T</span></span>
<span class="line"><span>10fL</span></span>
<span class="line"><span>10f0 m</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 9.32 Compensation of a loop gain containing a single pole, using a lag (PI) compensator. The loop</span></span>
<span class="line"><span>gain magnitude is increased</span></span>
<span class="line"><span>fc. If we approximate the compensated loop gain by its high-frequency asymptote, then at high</span></span>
<span class="line"><span>frequencies we can write</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>≈Tu0Gc∞⎦f</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>) (9.61)</span></span>
<span class="line"><span>At the crossover frequency f= fc, the loop gain has unity magnitude. Equation (9.61) predicts</span></span>
<span class="line"><span>that the crossover frequency is</span></span>
<span class="line"><span>fc≈Tu0Gc∞f0 (9.62)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>382 9 Controller Design</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>Gc Tu0</span></span>
<span class="line"><span>fL f0</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>fL f0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Gc Tu0</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>|| ||</span></span>
<span class="line"><span>Fig. 9.33 Construction of∥1/(1+ T)∥, for the PI-compensated example of Fig. 9.32</span></span>
<span class="line"><span>Hence, to obtain a desired crossover frequency fc, we should choose the compensator gain Gc∞</span></span>
<span class="line"><span>as follows:</span></span>
<span class="line"><span>Gc∞= fc</span></span>
<span class="line"><span>Tu0 f0</span></span>
<span class="line"><span>(9.63)</span></span>
<span class="line"><span>The corner frequency fL is then chosen to be suﬃciently less than fc, such that an adequate</span></span>
<span class="line"><span>phase margin is maintained.</span></span>
<span class="line"><span>Magnitude asymptotes of the quantity 1/(1+ T(s)) are constructed in Fig. 9.33. At frequen-</span></span>
<span class="line"><span>cies less than fL,t h ePI compensator improves the rejection of disturbances. At dc, where the</span></span>
<span class="line"><span>magnitude of Gc approaches inﬁnity, the magnitude of 1/(1+T) tends to zero. Hence, the closed-</span></span>
<span class="line"><span>loop disturbance-to-output transfer functions, such as Eqs. (9.51) and (9.52), tend to zero at dc.</span></span>
<span class="line"><span>9.5.3 Combined ( PID) Compensator</span></span>
<span class="line"><span>The advantages of the lead and lag compensators can be combined, to obtain both wide band-</span></span>
<span class="line"><span>width and zero steady-state error. At low frequencies, the compensator integrates the error sig-</span></span>
<span class="line"><span>nal, leading to large low-frequency loop gain and accurate regulation of the low-frequency com-</span></span>
<span class="line"><span>ponents of the output voltage. At high frequency (in the vicinity of the crossover frequency),</span></span>
<span class="line"><span>the compensator introduces phase lead into the loop gain, improving the phase margin. Such a</span></span>
<span class="line"><span>compensator is sometimes called a PID controller.</span></span>
<span class="line"><span>A typical Bode diagram of a practical version of this compensator is illustrated in Fig. 9.34.</span></span>
<span class="line"><span>The compensator has transfer function</span></span>
<span class="line"><span>G</span></span>
<span class="line"><span>c(s)= Gcm</span></span>
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
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>ωp2</span></span>
<span class="line"><span>) (9.64)</span></span>
<span class="line"><span>The inverted zero at frequency fL functions in the same manner as the PI compensator. The</span></span>
<span class="line"><span>zero at frequency fz adds phase lead in the vicinity of the crossover frequency, as in the PD</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.5 Regulator Design 383</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span> Gc</span></span>
<span class="line"><span>Gc|||| Gc|||| Gc</span></span>
<span class="line"><span>Gcm</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fp1</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>fz /10</span></span>
<span class="line"><span>fp1/10</span></span>
<span class="line"><span>10fz</span></span>
<span class="line"><span>fL</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>fL /10</span></span>
<span class="line"><span>10fL</span></span>
<span class="line"><span>90 /decade</span></span>
<span class="line"><span>45 /decade</span></span>
<span class="line"><span>/decade</span></span>
<span class="line"><span>fp2</span></span>
<span class="line"><span>fp2 /10</span></span>
<span class="line"><span>10fp1</span></span>
<span class="line"><span>Fig. 9.34 Magnitude and phase asymptotes of the combined (PID) compensator transfer function Gc of</span></span>
<span class="line"><span>Eq. (9.64)</span></span>
<span class="line"><span>compensator. The high-frequency poles at frequencies fp1 and fp2 must be present in practical</span></span>
<span class="line"><span>compensators, to cause the gain to roll oﬀat high frequencies and to prevent the switching ripple</span></span>
<span class="line"><span>from disrupting the operation of the pulse-width modulator. The loop gain crossover frequency</span></span>
<span class="line"><span>fc is chosen to be greater than fL and fz, but less than fp1 and fp2.</span></span>
<span class="line"><span>9.5.4 Design Example</span></span>
<span class="line"><span>To illustrate the design of PI and PD compensators, let us consider the design of a combined</span></span>
<span class="line"><span>PID compensator for the dc–dc buck converter system of Fig. 9.35. The input voltage vg(t)f o r</span></span>
<span class="line"><span>this system has nominal value 28 V . It is desired to supply a regulated 15 V to a 5 A load. The</span></span>
<span class="line"><span>load is modeled here with a 3Ωresistor. An accurate 5 V reference is available.</span></span>
<span class="line"><span>The ﬁrst step is to select the feedback gainH(s). The gain H is chosen such that the regulator</span></span>
<span class="line"><span>produces a regulated 15 V dc output. Let us assume that we will succeed in designing a good</span></span>
<span class="line"><span>feedback system, which causes the output voltage to accurately follow the reference voltage.</span></span>
<span class="line"><span>This is accomplished via a large loop gain T, which leads to a small error voltage: ve ≈0.</span></span>
<span class="line"><span>Hence, Hv≈vre f So we should choose</span></span>
<span class="line"><span>H= Vre f</span></span>
<span class="line"><span>V = 5</span></span>
<span class="line"><span>15= 1</span></span>
<span class="line"><span>3 (9.65)</span></span>
<span class="line"><span>The quiescent duty cycle is given by the steady-state solution of the converter:</span></span>
<span class="line"><span>D= V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>= 15</span></span>
<span class="line"><span>28= 0.536 (9.66)</span></span>
<span class="line"><span>The quiescent value of the control voltage, Vc, must satisfy Eq. (7.85). Hence,</span></span>
<span class="line"><span>Vc= DVM = 2.14 V (9.67)</span></span>
<span class="line"><span>Thus, the quiescent conditions of the system are known. It remains to design the compensator</span></span>
<span class="line"><span>gain Gc(s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>384 9 Controller Design</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)vg(t)</span></span>
<span class="line"><span>28 V</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Compensator</span></span>
<span class="line"><span>HvPulse-width</span></span>
<span class="line"><span>modulator</span></span>
<span class="line"><span>vc</span></span>
<span class="line"><span>Transistor</span></span>
<span class="line"><span>gate driver</span></span>
<span class="line"><span>Gc(s)</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>ve</span></span>
<span class="line"><span>Error</span></span>
<span class="line"><span>signal</span></span>
<span class="line"><span>Sensor</span></span>
<span class="line"><span>gain</span></span>
<span class="line"><span>iload</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>50 μH</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>500 μF</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>3 </span></span>
<span class="line"><span>fs = 100 kHz</span></span>
<span class="line"><span>VM = 4 V vref</span></span>
<span class="line"><span>5 V</span></span>
<span class="line"><span>Fig. 9.35 Design example</span></span>
<span class="line"><span>Fig. 9.36 System small-signal ac model, design example</span></span>
<span class="line"><span>A small-signal ac model of the regulator system is illustrated in Fig. 9.36. The buck con-</span></span>
<span class="line"><span>verter ac model is represented in canonical form. Disturbances in the input voltage and in the</span></span>
<span class="line"><span>load current are modeled. For generality, reference voltage variations ˆ vre f are included in the</span></span>
<span class="line"><span>diagram; in a dc voltage regulator, these variations are normally zero.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.5 Regulator Design 385</span></span>
<span class="line"><span>The open-loop converter transfer functions are discussed in the previous chapters. The open-</span></span>
<span class="line"><span>loop control-to-output transfer function is</span></span>
<span class="line"><span>Gvd(s)= V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s L</span></span>
<span class="line"><span>R+ s2LC</span></span>
<span class="line"><span>(9.68)</span></span>
<span class="line"><span>The open-loop control-to-output transfer function contains two poles, and can be written in the</span></span>
<span class="line"><span>following normalized form:</span></span>
<span class="line"><span>Gvd(s)= Gd0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Q0ω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (9.69)</span></span>
<span class="line"><span>By equating like coeﬃcients in Eqs. (9.68) and ( 9.69), one ﬁnds that the dc gain, corner fre-</span></span>
<span class="line"><span>quency, and Q-factor are given by</span></span>
<span class="line"><span>Gd0= V</span></span>
<span class="line"><span>D= 28 V</span></span>
<span class="line"><span>f0= ω0</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>= 1 kHz (9.70)</span></span>
<span class="line"><span>Q0= R</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>L= 9.5⇒19.5d B</span></span>
<span class="line"><span>In practice, parasitic loss elements, such as the capacitor equivalent series resistance ( esr),</span></span>
<span class="line"><span>would cause a lower Q-factor to be observed. Figure 9.37 contains a Bode diagram of Gvd(s).</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span> T |||| T0 = 8.6 18.7 dB</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Q0 = 9.5 19.5 dB</span></span>
<span class="line"><span>fz</span></span>
<span class="line"><span>fp</span></span>
<span class="line"><span>fc</span></span>
<span class="line"><span>Q0</span></span>
<span class="line"><span>1/T0 = 0.12 </span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ T</span></span>
<span class="line"><span>1 Hz 10 Hz 100 Hz 1 kHz 10 kHz 100 kHz</span></span>
<span class="line"><span>Fig. 9.37 Converter small-signal control-to-output transfer function Gvd, design example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>386 9 Controller Design</span></span>
<span class="line"><span>The open-loop line-to-output transfer function is</span></span>
<span class="line"><span>Gvg(s)= D 1</span></span>
<span class="line"><span>1+ s L</span></span>
<span class="line"><span>R+ s2LC</span></span>
<span class="line"><span>(9.71)</span></span>
<span class="line"><span>This transfer function contains the same poles as inGvd(s), and can be written in the normalized</span></span>
<span class="line"><span>form</span></span>
<span class="line"><span>Gvg(s)= Gg0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>1+ s</span></span>
<span class="line"><span>Q0ω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2 (9.72)</span></span>
<span class="line"><span>with Gg0= D. The open-loop output impedance of the buck converter is</span></span>
<span class="line"><span>Zout(s)= R</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sL= sL</span></span>
<span class="line"><span>1+ s L</span></span>
<span class="line"><span>R+ s2LC</span></span>
<span class="line"><span>(9.73)</span></span>
<span class="line"><span>Use of these equations to represent the converter in block-diagram form leads to the com-</span></span>
<span class="line"><span>plete system block diagram of Fig. 9.38. The loop gain of the system is</span></span>
<span class="line"><span>T(s)= Gc(s)</span></span>
<span class="line"><span>⎦1</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>Gvd(s)H(s) (9.74)</span></span>
<span class="line"><span>Substitution of Eq. (9.69)i n t o(9.74) leads to</span></span>
<span class="line"><span>T(s)=</span></span>
<span class="line"><span>⎦Gc(s)H(s)</span></span>
<span class="line"><span>VM</span></span>
<span class="line"><span>) ⎦V</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>) 1⎛⎜⎜⎜⎜⎜⎝1+ s</span></span>
<span class="line"><span>Q0ω0</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>⎦s</span></span>
<span class="line"><span>ω0</span></span>
<span class="line"><span>)2⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(9.75)</span></span>
<span class="line"><span>The closed-loop disturbance-to-output transfer functions are given by Eqs. (9.5) and (9.6).</span></span>
<span class="line"><span>Fig. 9.38 System block diagram, design example</span></span></code></pre></div>`,10)])])}const u=s(l,[["render",i]]);export{f as __pageData,u as default};
