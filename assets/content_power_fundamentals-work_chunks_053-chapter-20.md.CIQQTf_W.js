import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"20 Power and Harmonics in Nonsinusoidal Systems","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"20 Power and Harmonics in Nonsinusoidal Systems","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 849-865 > Chunk ID: `chapter-20`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/053-chapter-20.md","filePath":"content/power/fundamentals-work/chunks/053-chapter-20.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/053-chapter-20.md"};function i(t,n,c,r,o,h){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="_20-power-and-harmonics-in-nonsinusoidal-systems" tabindex="-1">20 Power and Harmonics in Nonsinusoidal Systems <a class="header-anchor" href="#_20-power-and-harmonics-in-nonsinusoidal-systems" aria-label="Permalink to &quot;20 Power and Harmonics in Nonsinusoidal Systems&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 849-865<br> Chunk ID: <code>chapter-20</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>20</span></span>
<span class="line"><span>Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>Rectiﬁcation used to be a much simpler topic. A textbook could cover the topic simply by dis-</span></span>
<span class="line"><span>cussing the various circuits, such as the peak-detection and inductor-input rectiﬁers, the phase-</span></span>
<span class="line"><span>controlled bridge, polyphase transformer connections, and perhaps multiplier circuits. But re-</span></span>
<span class="line"><span>cently, rectiﬁers have become much more sophisticated, and are now systems rather than mere</span></span>
<span class="line"><span>circuits. They often include pulse-width modulated converters such as the boost converter, with</span></span>
<span class="line"><span>control systems that regulate the ac input current waveform. So modern rectiﬁer technology</span></span>
<span class="line"><span>now incorporates many of the dc–dc converter fundamentals.</span></span>
<span class="line"><span>The reason for this is the undesirable ac line current harmonics, and low power factors, of</span></span>
<span class="line"><span>conventional peak-detection and phase-controlled rectiﬁers. The adverse eﬀects of power sys-</span></span>
<span class="line"><span>tem harmonics are well-recognized. These eﬀects include: unsafe neutral current magnitudes in</span></span>
<span class="line"><span>three-phase systems, heating and reduction of life in transformers and induction motors, degra-</span></span>
<span class="line"><span>dation of system voltage waveforms, unsafe currents in power factor correction capacitors, and</span></span>
<span class="line"><span>malfunctioning of certain power system protection elements. In a real sense, conventional rec-</span></span>
<span class="line"><span>tiﬁers are harmonic polluters of the ac power distribution system. With the widespread deploy-</span></span>
<span class="line"><span>ment of electronic equipment in our society, rectiﬁer harmonics have become a signiﬁcant and</span></span>
<span class="line"><span>measurable problem. Thus there is a need for high-quality rectiﬁers, which operate with high</span></span>
<span class="line"><span>power factor, high eﬃciency, and reduced generation of harmonics. Several international stan-</span></span>
<span class="line"><span>dards now exist that speciﬁcally limit the magnitudes of harmonic currents, for both high-power</span></span>
<span class="line"><span>equipment such as industrial motor drives and low-power equipment such as electronic ballasts</span></span>
<span class="line"><span>for ﬂuorescent lamps and power supplies for oﬃce equipment.</span></span>
<span class="line"><span>This chapter treats the ﬂow of energy in power systems containing nonsinusoidal waveforms.</span></span>
<span class="line"><span>Average power, rms values, and power factor are expressed in terms of the Fourier series of the</span></span>
<span class="line"><span>voltage and current waveforms. Harmonic currents in three-phase systems are discussed, and</span></span>
<span class="line"><span>present-day standards are listed. The following chapters treat harmonics and harmonic mitiga-</span></span>
<span class="line"><span>tion in conventional line-commutated rectiﬁers, high-quality rectiﬁer circuits and their models,</span></span>
<span class="line"><span>and control of high-quality rectiﬁers.</span></span>
<span class="line"><span>© Springer Nature Switzerland AG 2020</span></span>
<span class="line"><span>R. W. Erickson, D. Maksimovi´c, Fundamentals of Power Electronics,</span></span>
<span class="line"><span>https://doi.org/10.1007/978-3-030-43881-4_20</span></span>
<span class="line"><span>849</span></span>
<span class="line"><span></span></span>
<span class="line"><span>850 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>+Source Load</span></span>
<span class="line"><span>Surface S</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 20.1 Observe the transmission of energy through surface S</span></span>
<span class="line"><span>20.1 Average Power</span></span>
<span class="line"><span>Let us consider the transmission of energy from a source to a load, through a given surface as</span></span>
<span class="line"><span>in Fig. 20.1. In the network of Fig. 20.1, the voltage waveform v(t) (not necessarily sinusoidal)</span></span>
<span class="line"><span>is given by the source, and the current waveform is determined by the response of the load. In</span></span>
<span class="line"><span>the more general case in which the source output impedance is signiﬁcant, then v(t) and i(t)</span></span>
<span class="line"><span>both depend on the characteristics of the source and load. Balanced three-phase systems may be</span></span>
<span class="line"><span>treated in the same manner, on a per-phase basis, using a line current and line-to-neutral voltage.</span></span>
<span class="line"><span>If v(t) and i(t) are periodic, then they may be expressed as Fourier series:</span></span>
<span class="line"><span>v(t)= V</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>Vn cos(nωt−ϕn) (20.1)</span></span>
<span class="line"><span>i(t)= I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>In cos(nωt−θn)</span></span>
<span class="line"><span>where the period of the ac line voltage waveform is deﬁned as T = 2π/ω. In general, the</span></span>
<span class="line"><span>instantaneous power p(t)= v(t)i(t) can assume both positive and negative values at various</span></span>
<span class="line"><span>points during the ac line cycle. Energy then ﬂows in both directions between the source and</span></span>
<span class="line"><span>load. It is of interest to determine the net energy transmitted to the load over one cycle, or</span></span>
<span class="line"><span>Wcycle=</span></span>
<span class="line"><span>∫ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v(t)i(t) dt (20.2)</span></span>
<span class="line"><span>This is directly related to the average power as follows:</span></span>
<span class="line"><span>Pav= Wcycle</span></span>
<span class="line"><span>T = 1</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>∫ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v(t)i(t) dt (20.3)</span></span>
<span class="line"><span>Let us investigate the relationship between the harmonic content of the voltage and current wave-</span></span>
<span class="line"><span>forms, and the average power. Substitution of the Fourier series, Eq. (20.1), into Eq. (20.3) yields</span></span>
<span class="line"><span>Pav= 1</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>∫ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝V0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>Vn cos (nωt−ϕn)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎝I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>In cos (nωt−θn)</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎠dt (20.4)</span></span>
<span class="line"><span>To evaluate this integral, we must multiply out the inﬁnite series. It can be shown that the inte-</span></span>
<span class="line"><span>grals of cross-product terms are zero, and the only contributions to the integral comes from the</span></span>
<span class="line"><span>products of voltage and current harmonics of the same frequency:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.1 Average Power 851</span></span>
<span class="line"><span>∫ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>(Vn cos(nωt−ϕn))( Im cos(mωt−θm)) dt=</span></span>
<span class="line"><span>⎧⎪⎪⎨⎪⎪⎩</span></span>
<span class="line"><span>0i f n/nequalm</span></span>
<span class="line"><span>VnIn</span></span>
<span class="line"><span>2 cos (ϕn−θn) if n= m (20.5)</span></span>
<span class="line"><span>The average power is therefore</span></span>
<span class="line"><span>Pav= V0I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>VnIn</span></span>
<span class="line"><span>2 cos (ϕn−θn) (20.6)</span></span>
<span class="line"><span>So net energy is transmitted to the load only when the Fourier series of v(t) and i(t) contain</span></span>
<span class="line"><span>terms at the same frequency. For example, if v(t) and i(t) both contain third harmonic, then net</span></span>
<span class="line"><span>energy is transmitted at the third harmonic frequency, with average power equal to</span></span>
<span class="line"><span>V3I3</span></span>
<span class="line"><span>2 cos (ϕ3−θ3) (20.7)</span></span>
<span class="line"><span>Here, V3I3/2 is equal to the rms volt-amperes of the third harmonic current and voltage. The</span></span>
<span class="line"><span>cos(φ3−θ3) term is a displacement term which accounts for the phase diﬀerence between the</span></span>
<span class="line"><span>third harmonic voltage and current.</span></span>
<span class="line"><span>Fig. 20.2 V oltage, current, and in-</span></span>
<span class="line"><span>stantaneous power waveforms, ex-</span></span>
<span class="line"><span>ample 1. The voltage contains only</span></span>
<span class="line"><span>fundamental and the current con-</span></span>
<span class="line"><span>tains only third harmonic. The av-</span></span>
<span class="line"><span>erage power is zero</span></span>
<span class="line"><span>v(t) i(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>p(t) = v(t)i(t)</span></span>
<span class="line"><span>Pav = 0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Some examples of power ﬂow in systems containing harmonics are illustrated in Figs. 20.2</span></span>
<span class="line"><span>to 20.4. In example 1, Fig. 20.2, the voltage contains fundamental only, while the current con-</span></span>
<span class="line"><span>tains third harmonic only. It can be seen that the instantaneous power waveform p(t) has a zero</span></span>
<span class="line"><span>average value, and hence Pav is zero. Energy circulates between the source and load, but over</span></span>
<span class="line"><span>one cycle the net energy transferred to the load is zero. In example 2, Fig. 20.3, the voltage and</span></span>
<span class="line"><span>current each contain only third harmonic. The average power is given by Eq. (20.7) in this case.</span></span>
<span class="line"><span>In example 3, Fig. 20.4, the voltage waveform contains fundamental, third harmonic, and</span></span>
<span class="line"><span>ﬁfth harmonic, while the current contains fundamental, ﬁfth harmonic, and seventh harmonic,</span></span>
<span class="line"><span>as follows:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>852 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>Fig. 20.3 V oltage, current, and in-</span></span>
<span class="line"><span>stantaneous power waveforms, ex-</span></span>
<span class="line"><span>ample 2. The voltage and current</span></span>
<span class="line"><span>each contain only third harmonic,</span></span>
<span class="line"><span>and are in phase. Net energy is</span></span>
<span class="line"><span>transmitted at the third harmonic</span></span>
<span class="line"><span>frequency</span></span>
<span class="line"><span>v(t), i(t)</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>p(t) = v(t)i(t)</span></span>
<span class="line"><span>Pav = 0.5</span></span>
<span class="line"><span>Fig. 20.4 V oltage, current, and</span></span>
<span class="line"><span>instantaneous power waveforms,</span></span>
<span class="line"><span>example 3. The voltage contains</span></span>
<span class="line"><span>fundamental, third, and ﬁfth</span></span>
<span class="line"><span>harmonics. The current contains</span></span>
<span class="line"><span>fundamental, ﬁfth, and seventh</span></span>
<span class="line"><span>harmonics. Net energy is transmit-</span></span>
<span class="line"><span>ted at the fundamental and ﬁfth</span></span>
<span class="line"><span>harmonic frequencies</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.5</span></span>
<span class="line"><span>1.0</span></span>
<span class="line"><span>p(t) = v(t)i(t)</span></span>
<span class="line"><span>Pav = 0.32</span></span>
<span class="line"><span>0.0</span></span>
<span class="line"><span>0.2</span></span>
<span class="line"><span>0.4</span></span>
<span class="line"><span>0.6</span></span>
<span class="line"><span>v(t)= 1.2 cos (ωt)+ 0.33 cos(3ωt)+ 0.2 cos (5ωt)</span></span>
<span class="line"><span>i(t)= 0.6 cos (ωt+ 30◦)+ 0.1 cos (5ωt+ 45◦)+ 0.1 cos(7ωt+ 60◦) (20.8)</span></span>
<span class="line"><span>Average power is transmitted at the fundamental and ﬁfth harmonic frequencies, since only</span></span>
<span class="line"><span>these frequencies are present in both waveforms. The average power is found by evaluation of</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.2 Root-Mean-Square (RMS) Value of a Waveform 853</span></span>
<span class="line"><span>Eq. (20.6); all terms are zero except for the fundamental and ﬁfth harmonic terms, as follows:</span></span>
<span class="line"><span>pav= (1.2)(0.6)</span></span>
<span class="line"><span>2 cos(30◦)+ (0.2)(0.1)</span></span>
<span class="line"><span>2 cos(45◦)= 0.32 (20.9)</span></span>
<span class="line"><span>The instantaneous power and its average are illustrated in Fig.20.4.</span></span>
<span class="line"><span>20.2 Root-Mean-Square (RMS) Value of a Waveform</span></span>
<span class="line"><span>The rms value of a periodic waveform v(t) with period T is deﬁned as</span></span>
<span class="line"><span>(rms value)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>∫ T</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>v2(t)dt (20.10)</span></span>
<span class="line"><span>The rms value can also be expressed in terms of the Fourier components. Insertion of Eq. (20.1)</span></span>
<span class="line"><span>into Eq. (20.10), and simpliﬁcation using Eq. (20.5), yields</span></span>
<span class="line"><span>(rms value)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>0 +</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>V2n</span></span>
<span class="line"><span>2 (20.11)</span></span>
<span class="line"><span>Again, the integrals of the cross-product terms are zero. This expression holds when the wave-</span></span>
<span class="line"><span>form is a current:</span></span>
<span class="line"><span>(rms current)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>I2n</span></span>
<span class="line"><span>2 (20.12)</span></span>
<span class="line"><span>Thus, the presence of harmonics in a waveform always increases its rms value. In particular,</span></span>
<span class="line"><span>in the case where the voltage v(t) contains only fundamental while the current i(t) contains</span></span>
<span class="line"><span>harmonics, then the harmonics increase the rms value of the current while leaving the average</span></span>
<span class="line"><span>power unchanged. This is undesirable, because the harmonics do not lead to net delivery of</span></span>
<span class="line"><span>energy to the load, yet they increase the Irms 2R losses in the system.</span></span>
<span class="line"><span>In a practical system, series resistances always exist in the source, load, and/or transmission</span></span>
<span class="line"><span>wires, which lead to unwanted power losses obeying the expression</span></span>
<span class="line"><span>(rms current)2Rseries (20.13)</span></span>
<span class="line"><span>Examples of such loss elements are the resistance of ac generator windings, the resistance of the</span></span>
<span class="line"><span>wire connecting the source and load, the resistance of transformer windings, and the resistance</span></span>
<span class="line"><span>of semiconductor devices, and magnetics windings in switching converters. Thus, it is desired</span></span>
<span class="line"><span>to make the rms current as small as possible, while transferring the required amount of energy</span></span>
<span class="line"><span>and average power to the load.</span></span>
<span class="line"><span>Shunt resistances usually also exist, which cause power loss according to the relation</span></span>
<span class="line"><span>(rms voltage)2</span></span>
<span class="line"><span>Rshunt</span></span>
<span class="line"><span>(20.14)</span></span>
<span class="line"><span>Examples include the core losses in transformers and ac generators, and switching converter</span></span>
<span class="line"><span>transistor switching loss. Therefore, it is desired to also make the rms voltage as small as possi-</span></span>
<span class="line"><span>ble while transferring the required average power to the load.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>854 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>20.3 Power Factor</span></span>
<span class="line"><span>Power factor is a ﬁgure-of-merit that measures how eﬀectively energy is transmitted between a</span></span>
<span class="line"><span>source and load network. It is measured at a given surface as in Fig.20.1, and is deﬁned as</span></span>
<span class="line"><span>power factor= (average power)</span></span>
<span class="line"><span>(rms voltage)(rms current) (20.15)</span></span>
<span class="line"><span>The power factor always has a value between zero and one. The ideal case, unity power factor,</span></span>
<span class="line"><span>occurs for a load that obeys Ohm’s Law. In this case, the voltage and current waveforms have</span></span>
<span class="line"><span>the same shape, contain the same harmonic spectrum, and are in phase. For a given average</span></span>
<span class="line"><span>power throughput, the rms current and voltage are minimized at maximum (unity) power factor,</span></span>
<span class="line"><span>that is, with a linear resistive load. In the case where the voltage contains no harmonics but the</span></span>
<span class="line"><span>load is nonlinear and contains dynamics, then the power factor can be expressed as a product of</span></span>
<span class="line"><span>two terms, one resulting from the phase shift of the fundamental component of the current, and</span></span>
<span class="line"><span>the other resulting from the current harmonics.</span></span>
<span class="line"><span>20.3.1 Linear Resistive Load, Nonsinusoidal Voltage</span></span>
<span class="line"><span>In this case, the current harmonics are in phase with, and proportional to, the voltage harmonics.</span></span>
<span class="line"><span>As a result, all harmonics result in the net transfer of energy to the load. The current harmonic</span></span>
<span class="line"><span>magnitudes and phases are</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>n= Vn</span></span>
<span class="line"><span>R (20.16)</span></span>
<span class="line"><span>θn= ϕn so cos(θn−ϕn)= 1 (20.17)</span></span>
<span class="line"><span>The rms voltage is again</span></span>
<span class="line"><span>(rms voltage)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>V2n</span></span>
<span class="line"><span>2 (20.18)</span></span>
<span class="line"><span>and the rms current is</span></span>
<span class="line"><span>(rms current)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>I2n</span></span>
<span class="line"><span>2 =</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>R2 +</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>V2n</span></span>
<span class="line"><span>2R2 (20.19)</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>R(rms voltage)</span></span>
<span class="line"><span>By use of Eq. (20.6), the average power is</span></span>
<span class="line"><span>Pav = V0I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>VnIn</span></span>
<span class="line"><span>2 cos(ϕn−θn)</span></span>
<span class="line"><span>= V2</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>R +</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>V2</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>2R (20.20)</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>R(rms voltage)2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.3 Power Factor 855</span></span>
<span class="line"><span>Insertion of Eqs. (20.19) and (20.20) into Eq. (20.15) then shows that the power factor is unity.</span></span>
<span class="line"><span>Thus, if the load is linear and purely resistive, then the power factor is unity regardless of the</span></span>
<span class="line"><span>harmonic content of v(t). The harmonic content of the load current waveform i(t) is identical to</span></span>
<span class="line"><span>that of v(t), and all harmonics result in the transfer of energy to the load. This raises the possi-</span></span>
<span class="line"><span>bility that one could construct a power distribution system based on nonsinusoidal waveforms</span></span>
<span class="line"><span>in which the energy is eﬃciently transferred to the load.</span></span>
<span class="line"><span>20.3.2 Nonlinear Dynamical Load, Sinusoidal Voltage</span></span>
<span class="line"><span>If the voltage v(t) contains a fundamental component but no dc component or harmonics, so</span></span>
<span class="line"><span>that V0 = V2 = V3 =... = 0, then harmonics in i(t) do not result in transmission of net energy</span></span>
<span class="line"><span>to the load. The average power expression, Eq. (20.6), becomes</span></span>
<span class="line"><span>Pav= V1I1</span></span>
<span class="line"><span>2 cos(ϕ1−θ1) (20.21)</span></span>
<span class="line"><span>However, the harmonics in i(t)d oaﬀect the value of the rms current:</span></span>
<span class="line"><span>(rms current)=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>I2n</span></span>
<span class="line"><span>2 (20.22)</span></span>
<span class="line"><span>Hence, as in example 1 (Fig. 20.2), harmonics cause the load to draw more rms current from</span></span>
<span class="line"><span>the source, but not more average power. Increasing the current harmonics does not cause more</span></span>
<span class="line"><span>energy to be transferred to the load, but does cause additional losses in series resistive elements</span></span>
<span class="line"><span>Rseries.</span></span>
<span class="line"><span>Also, the presence of load dynamics and reactive elements, which causes the phase of the</span></span>
<span class="line"><span>fundamental components of the voltage and current to di ﬀer by (θ1 −ϕ1), also reduces the</span></span>
<span class="line"><span>power factor. The cos(ϕ1−θ1) term in the average power Eq. (20.21) becomes less than unity.</span></span>
<span class="line"><span>However, the rms value of the current, Eq. ( 20.22), does not depend on the phase. So shifting</span></span>
<span class="line"><span>the phase of i(t) with respect tov(t) reduces the average power without changing the rms voltage</span></span>
<span class="line"><span>or current, and hence the power factor is reduced.</span></span>
<span class="line"><span>By substituting Eqs. ( 20.21) and (20.22)i n t o(20.15), we can express the power factor for</span></span>
<span class="line"><span>the sinusoidal voltage in the following form:</span></span>
<span class="line"><span>(power factor)=</span></span>
<span class="line"><span>⎛⎜⎜⎜</span></span>
<span class="line"><span>⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n−1</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎞⎟⎟⎟</span></span>
<span class="line"><span>⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>(cos(ϕ</span></span>
<span class="line"><span>1−θ1)) (20.23)</span></span>
<span class="line"><span>= (distortion factor)(displacement factor)</span></span>
<span class="line"><span>So when the voltage contains no harmonics, then the power factor can be written as the product</span></span>
<span class="line"><span>of two terms. The ﬁrst, called the distortion factor, is the ratio of the rms fundamental compo-</span></span>
<span class="line"><span>nent of the current to the total rms value of the current</span></span>
<span class="line"><span>(distortion factor)=</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=1</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>n</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>= (rms fundamental current)</span></span>
<span class="line"><span>(rms current) (20.24)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>856 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>THD</span></span>
<span class="line"><span>Distortion factor</span></span>
<span class="line"><span>0%</span></span>
<span class="line"><span>20%</span></span>
<span class="line"><span>40%</span></span>
<span class="line"><span>60%</span></span>
<span class="line"><span>80%</span></span>
<span class="line"><span>100%</span></span>
<span class="line"><span>70%</span></span>
<span class="line"><span>80%</span></span>
<span class="line"><span>90%</span></span>
<span class="line"><span>100%</span></span>
<span class="line"><span>Fig. 20.5 Distortion factor vs. total harmonic distortion</span></span>
<span class="line"><span>The second term of Eq. (20.23) is called the displacement factor, and is the cosine of the angle</span></span>
<span class="line"><span>between the fundamental components of the voltage and current waveforms.</span></span>
<span class="line"><span>The total harmonic distortion (THD) is deﬁned as the ratio of the rms value of the waveform</span></span>
<span class="line"><span>not including the fundamental, to the rms fundamental magnitude. When no dc is present, this</span></span>
<span class="line"><span>can be written as:</span></span>
<span class="line"><span>(THD)=</span></span>
<span class="line"><span>√∞∑</span></span>
<span class="line"><span>n=2</span></span>
<span class="line"><span>I2n</span></span>
<span class="line"><span>I1</span></span>
<span class="line"><span>(20.25)</span></span>
<span class="line"><span>The total harmonic distortion and the distortion factor are closely related. Comparison of Eqs.</span></span>
<span class="line"><span>(20.24) and (20.25), with I0= 0, leads to</span></span>
<span class="line"><span>(distortion factor)= 1√</span></span>
<span class="line"><span>1+ (THD)2</span></span>
<span class="line"><span>(20.26)</span></span>
<span class="line"><span>This equation is plotted in Fig. 20.5. The distortion factor of a waveform with a moderate</span></span>
<span class="line"><span>amount of distortion is quite close to unity. For example, if the waveform contains third har-</span></span>
<span class="line"><span>monic whose magnitude is 10% of the fundamental, the distortion factor is 99.5%. Increasing</span></span>
<span class="line"><span>the third harmonic to 20% decreases the distortion factor to 98%, and a 33% harmonic magni-</span></span>
<span class="line"><span>tude yields a distortion factor of 95%. So the power factor is not signiﬁcantly degraded by the</span></span>
<span class="line"><span>presence of harmonics unless the harmonics are quite large in magnitude.</span></span>
<span class="line"><span>An example of a case in which the distortion factor is much less than unity is the conven-</span></span>
<span class="line"><span>tional peak-detection rectiﬁer of Fig. 20.6. In this circuit, the ac line current consists of short-</span></span>
<span class="line"><span>duration current pulses occurring at the peak of the voltage waveform. The fundamental com-</span></span>
<span class="line"><span>ponent of the line current is essentially in phase with the voltage, and the displacement factor</span></span>
<span class="line"><span>is close to unity. However, the low-order current harmonics are quite large, close in magnitude</span></span>
<span class="line"><span>to that of the fundamental—a typical current spectrum is given in Fig. 20.7. The distortion fac-</span></span>
<span class="line"><span>tor of peak-detection rectiﬁers is usually in the range 55%–65%. The resulting power factor is</span></span>
<span class="line"><span>similar in value.</span></span>
<span class="line"><span>In North America, the standard 120 V power outlet is protected by a 15 A circuit breaker.</span></span>
<span class="line"><span>In consequence, the available load power is quite limited. Derating the circuit breaker current</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.3 Power Factor 857</span></span>
<span class="line"><span>Fig. 20.6 Conventional peak-detection rectiﬁer</span></span>
<span class="line"><span>100%</span></span>
<span class="line"><span>91%</span></span>
<span class="line"><span>73%</span></span>
<span class="line"><span>52%</span></span>
<span class="line"><span>32%</span></span>
<span class="line"><span>19% 15% 15% 13% 9%</span></span>
<span class="line"><span>0%</span></span>
<span class="line"><span>20%</span></span>
<span class="line"><span>40%</span></span>
<span class="line"><span>60%</span></span>
<span class="line"><span>80%</span></span>
<span class="line"><span>100%</span></span>
<span class="line"><span>13 579 1 1 1 3 1 5 1 7 1 9</span></span>
<span class="line"><span>Harmonic number</span></span>
<span class="line"><span>Harmonic amplitude,</span></span>
<span class="line"><span>percent of fundamental</span></span>
<span class="line"><span>THD = 136%</span></span>
<span class="line"><span>Distortion factor = 59%</span></span>
<span class="line"><span>Fig. 20.7 Typical ac line current spectrum of a single-phase peak-detection rectiﬁer. Harmonics 1 to 19</span></span>
<span class="line"><span>are shown</span></span>
<span class="line"><span>by 20%, assuming typical eﬃciencies for the dc–dc converter and peak- detection rectiﬁer, and</span></span>
<span class="line"><span>with a power factor of 55%, one obtains the following estimate for the maximum available dc</span></span>
<span class="line"><span>load power:</span></span>
<span class="line"><span>(ac voltage) (derated breaker current) (power factor) (rectiﬁer eﬃciency)</span></span>
<span class="line"><span>= (120V) (80% of15 A) (0 .55) (0 .98) (20.27)</span></span>
<span class="line"><span>= 776 W</span></span>
<span class="line"><span>The less-than-unity eﬃciency of a dc–dc converter would further reduce the available dc load</span></span>
<span class="line"><span>power. Using a peak-detection rectiﬁer to supply a load power greater than this requires that the</span></span>
<span class="line"><span>user installs higher amperage and/or higher voltage service, which is inconvenient and costly.</span></span>
<span class="line"><span>The use of a rectiﬁer circuit having nearly unity power factor would allow a signiﬁcant increase</span></span>
<span class="line"><span>in available dc load power:</span></span>
<span class="line"><span>(ac voltage) (derated breaker current) (power factor) (rectiﬁer eﬃciency)</span></span>
<span class="line"><span>= (120V) (80% of 15A) (0 .99) (0 .93) (20.28)</span></span>
<span class="line"><span>= 1325W</span></span>
<span class="line"><span>or almost twice the available power of the peak-detection rectiﬁer. This alone can be a com-</span></span>
<span class="line"><span>pelling reason to employ high-quality rectiﬁers in commercial systems.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>858 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>Real axis</span></span>
<span class="line"><span>Imaginary</span></span>
<span class="line"><span>axis</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>I</span></span>
<span class="line"><span>S = VI*</span></span>
<span class="line"><span>||S|| = Vrms</span></span>
<span class="line"><span>Irms</span></span>
<span class="line"><span>1 1</span></span>
<span class="line"><span>1 1</span></span>
<span class="line"><span>1 1</span></span>
<span class="line"><span>P</span></span>
<span class="line"><span>Q</span></span>
<span class="line"><span>Fig. 20.8 Power phasor diagram for a sinusoidal system, illustrating the voltage, current, and complex</span></span>
<span class="line"><span>power phasors</span></span>
<span class="line"><span>20.4 Power Phasors in Sinusoidal Systems</span></span>
<span class="line"><span>The apparent power is deﬁned as the product of the rms voltage and rms current. Apparent</span></span>
<span class="line"><span>power is easily measured—it is simply the product of the readings of a voltmeter and ammeter</span></span>
<span class="line"><span>placed in the circuit at the given surface. Many power system elements, such as transformers,</span></span>
<span class="line"><span>must be rated according to the apparent power that they are able to supply. The unit of apparent</span></span>
<span class="line"><span>power is the volt-ampere, or V A. The power factor, deﬁned in Eq. (20.15), is the ratio of average</span></span>
<span class="line"><span>power to apparent power.</span></span>
<span class="line"><span>In the case of sinusoidal voltage and current waveforms, we can additionally deﬁne the</span></span>
<span class="line"><span>complex power S and the reactive power Q. If the sinusoidal voltage v(t) and current i(t) can</span></span>
<span class="line"><span>be represented by the phasors V and I, then the complex power is a phasor deﬁned as</span></span>
<span class="line"><span>S= VI</span></span>
<span class="line"><span>∗= P+ jQ (20.29)</span></span>
<span class="line"><span>Here, I∗is the complex conjugate of I, and j is the square root of−1. The magnitude of S,o r</span></span>
<span class="line"><span>∥S∥, is equal to the apparent power, measured in V A. The real part ofS is the average power P,</span></span>
<span class="line"><span>having units of watts. The imaginary part of S is the reactive power Q, having units of reactive</span></span>
<span class="line"><span>volt-amperes, or V ARs.</span></span>
<span class="line"><span>A phasor diagram illustrating S, P, and Q, is given in Fig. 20.8. The angle (ϕ1−θ1)i st h e</span></span>
<span class="line"><span>angle between the voltage phasor V and the current phasor I.(ϕ1−θ1) is additionally the phase</span></span>
<span class="line"><span>of the complex power S. The power factor in the purely sinusoidal case is therefore</span></span>
<span class="line"><span>power factor= P</span></span>
<span class="line"><span>∥S∥= cos(ϕ1−θ1) (20.30)</span></span>
<span class="line"><span>It should be emphasized that this equation is valid only for systems in which the voltage and</span></span>
<span class="line"><span>current are purely sinusoidal. The distortion factor of Eq. ( 20.24) then becomes unity, and the</span></span>
<span class="line"><span>power factor is equal to the displacement factor as in Eq. (20.30).</span></span>
<span class="line"><span>The reactive power Q does not lead to net transmission of energy between the source and</span></span>
<span class="line"><span>load. When reactive power is present, the rms current and apparent power are greater than</span></span>
<span class="line"><span>the minimum amount necessary to transmit the average power P. In an inductor, the current</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.5 Harmonic Currents in Three-Phase Systems 859</span></span>
<span class="line"><span>lags the voltage by 90◦, causing the displacement factor to be zero. The alternate storing and</span></span>
<span class="line"><span>releasing of energy in an inductor leads to current ﬂow and nonzero apparent power, but the</span></span>
<span class="line"><span>average power P is zero. Just as resistors consume real (average) power P, inductors can be</span></span>
<span class="line"><span>viewed as consumers of reactive power Q. In a capacitor, the current leads to voltage by 90 ◦,</span></span>
<span class="line"><span>again causing the displacement factor to be zero. Capacitors supply reactive power Q, and are</span></span>
<span class="line"><span>commonly placed in the utility power distribution system near inductive loads. If the reactive</span></span>
<span class="line"><span>power supplied by the capacitor is equal to the reactive power consumed by the inductor, then</span></span>
<span class="line"><span>the net current (ﬂowing from the source into the capacitor-inductive-load combination) will be</span></span>
<span class="line"><span>in phase with the voltage, leading unity power factor and minimum rms current magnitude.</span></span>
<span class="line"><span>It will be seen in the next chapter that phase-controlled rectiﬁers produce a nonsinusoidal</span></span>
<span class="line"><span>current waveform whose fundamental component lags the voltage. This lagging current does</span></span>
<span class="line"><span>not arise from energy storage, but it does nonetheless lead to a reduced displacement factor,</span></span>
<span class="line"><span>and to rms current and apparent power that are greater than the minimum amount necessary to</span></span>
<span class="line"><span>transmit the average power.</span></span>
<span class="line"><span>20.5 Harmonic Currents in Three-Phase Systems</span></span>
<span class="line"><span>The presence of harmonic currents can also lead to some special problems in three-phase sys-</span></span>
<span class="line"><span>tems. In a four-wire three-phase system, harmonic currents can lead to large currents in the</span></span>
<span class="line"><span>neutral conductors, which may easily exceed the conductor rms current rating. Power factor</span></span>
<span class="line"><span>correction capacitors may experience signiﬁcantly increased rms currents, causing them to fail.</span></span>
<span class="line"><span>In this section, these problems are examined, and the properties of harmonic current ﬂow in</span></span>
<span class="line"><span>three-phase systems are derived.</span></span>
<span class="line"><span>20.5.1 Harmonic Currents in Three-Phase Four-Wire Networks</span></span>
<span class="line"><span>Let us consider the three-phase four-wire network of Fig. 20.9. In general, we can express the</span></span>
<span class="line"><span>Fourier series of the line currents and line-neutral voltages as follows:</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>a(t)= Ia0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>Iak cos(kωt−θak)</span></span>
<span class="line"><span>ib(t)= Ib0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>Ibk cos(k(ωt−120◦)−θbk) (20.31)</span></span>
<span class="line"><span>ic(t)= Ic0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>Ick cos(k(ωt+ 120◦)−θck)</span></span>
<span class="line"><span>van(t)= Vm cos(ωt)</span></span>
<span class="line"><span>vbn(t)= Vm cos(ωt−120◦) (20.32)</span></span>
<span class="line"><span>vCn(t)= Vm cos(ωt+ 120◦)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>860 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>van(t)</span></span>
<span class="line"><span>vbn(t)</span></span>
<span class="line"><span>vcn(t)</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>nIdeal</span></span>
<span class="line"><span>source</span></span>
<span class="line"><span>Nonlinear</span></span>
<span class="line"><span>loads</span></span>
<span class="line"><span>Neutral connection</span></span>
<span class="line"><span>ia(t)</span></span>
<span class="line"><span>ic(t)</span></span>
<span class="line"><span>in(t)</span></span>
<span class="line"><span>ib(t)</span></span>
<span class="line"><span>Fig. 20.9 Current ﬂow in a three-phase four-wire network</span></span>
<span class="line"><span>The neutral current is therefore in= ia+ ib+ ic,o r</span></span>
<span class="line"><span>in(t)= Ia0+ Ib0+ Ic0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=1</span></span>
<span class="line"><span>[Iak cos(kωt−θak)+ Ibk cos(k(ωt−120◦)−θbk)+ Ick cos(k(ωt+ 120◦)−θck)](20.33)</span></span>
<span class="line"><span>When the load is unbalanced (even though the voltages are balanced and undistorted), we can</span></span>
<span class="line"><span>say little else about the neutral and line currents. If the load is unbalanced and nonlinear, then</span></span>
<span class="line"><span>the line and neutral currents may contain harmonics of any order, including even and triplen</span></span>
<span class="line"><span>harmonics.</span></span>
<span class="line"><span>Equation ( 20.33) is considerably simpliﬁed in the case where the loads are balanced. A</span></span>
<span class="line"><span>balanced nonlinear load is one in which I</span></span>
<span class="line"><span>ak = Ibk = Ick = Ik and θak = θbk = θck = θk, for all</span></span>
<span class="line"><span>k; that is, the harmonics of the three phases all have equal amplitudes and phase shifts. In this</span></span>
<span class="line"><span>case, Eq. (20.33) reduces to</span></span>
<span class="line"><span>in(t)= 3I0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=3,6,9,···</span></span>
<span class="line"><span>3Ik cos(kωt−θk) (20.34)</span></span>
<span class="line"><span>Hence, the fundamental and most of the harmonics cancel out, and do not appear in the neutral</span></span>
<span class="line"><span>conductor. Thus, it is in the interests of the utility to balance their nonlinear loads as well as</span></span>
<span class="line"><span>their harmonics.</span></span>
<span class="line"><span>But not all of the harmonics cancel out of Eq. ( 20.34) :t h ed ca n d triplen (triple-n,o r</span></span>
<span class="line"><span>3, 6, 9,... ) harmonics add rather than cancel. The rms neutral current is</span></span>
<span class="line"><span>in,rms= 3</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>0+</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>k=3,6,9,···</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>k</span></span>
<span class="line"><span>2 (20.35)</span></span>
<span class="line"><span>Example</span></span>
<span class="line"><span>A balanced nonlinear load produces line currents containing fundamental and 20% third</span></span>
<span class="line"><span>harmonic: ian(t)= I1 cos(ωt−θ1)+ 0.2I1 cos(3ωt−θ3). Find the rms neutral current, and</span></span>
<span class="line"><span>compare its amplitude to the rms line current amplitude.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.5 Harmonic Currents in Three-Phase Systems 861</span></span>
<span class="line"><span>Solution:</span></span>
<span class="line"><span>in,rms = 3</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>(0.2I1)2</span></span>
<span class="line"><span>2 = 0.6I1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>i1,rms =</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>I2</span></span>
<span class="line"><span>1+ (0.2I1)2</span></span>
<span class="line"><span>2 = I1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1+ 0.04≈I1</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>(20.36)</span></span>
<span class="line"><span>So the neutral current magnitude is 60% of the line current magnitude! The triplen harmonics in</span></span>
<span class="line"><span>the three phases add, such that 20% third harmonic leads to 60% third harmonic neutral current.</span></span>
<span class="line"><span>Yet the presence of the third harmonic has very little eﬀect on the rms value of the line current.</span></span>
<span class="line"><span>Signiﬁcant unexpected neutral current ﬂows.</span></span>
<span class="line"><span>20.5.2 Harmonic Currents in Three-Phase Three-Wire Networks</span></span>
<span class="line"><span>If there is no neutral connection to the wye-connected load, as in Fig. 20.10, then in(t)m u s t</span></span>
<span class="line"><span>be zero. If the load is balanced, then Eq. ( 20.34) still applies, and therefore the dc and triplen</span></span>
<span class="line"><span>harmonics of the load currents must be zero. Therefore, the line currents ia, ib, and ic cannot</span></span>
<span class="line"><span>contain triplen or dc harmonics. What happens is that a voltage is induced at the load neutral</span></span>
<span class="line"><span>point n′, containing dc and triplen harmonics, which eliminates the triplen and dc load current</span></span>
<span class="line"><span>harmonics.</span></span>
<span class="line"><span>This result is true only when the load is balanced. With an unbalanced load, all harmonics</span></span>
<span class="line"><span>can appear in the line currents, including triplen and dc. In practice, the load is never exactly</span></span>
<span class="line"><span>balanced, and some small amounts of third harmonic line currents are measured.</span></span>
<span class="line"><span>With a delta-connected load as in Fig. 20.11, there is also no neutral connection, so the line</span></span>
<span class="line"><span>currents cannot contain triplen or dc components. But the loads are connected line-to-line, and</span></span>
<span class="line"><span>are excited by undistorted sinusoidal voltages. Hence triplen harmonic and dc currents do, in</span></span>
<span class="line"><span>general, ﬂow through the nonlinear loads. Therefore, these currents simply circulate around the</span></span>
<span class="line"><span>delta. If the load is balanced, then again no triplen harmonics appear in the line currents.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>van(t)</span></span>
<span class="line"><span>vbn(t)</span></span>
<span class="line"><span>vcn(t)</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>nIdeal</span></span>
<span class="line"><span>source</span></span>
<span class="line"><span>Nonlinear</span></span>
<span class="line"><span>loads</span></span>
<span class="line"><span>ia(t)</span></span>
<span class="line"><span>ic(t)</span></span>
<span class="line"><span>in(t) = 0</span></span>
<span class="line"><span>ib(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vn&#39;n</span></span>
<span class="line"><span>n&#39;</span></span>
<span class="line"><span>Fig. 20.10 Current ﬂow in a three-phase three-wire wye-connected network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>862 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>van(t)</span></span>
<span class="line"><span>vbn(t)</span></span>
<span class="line"><span>vcn(t)</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>nIdeal</span></span>
<span class="line"><span>source</span></span>
<span class="line"><span>Delta-</span></span>
<span class="line"><span>connected</span></span>
<span class="line"><span>nonlinear</span></span>
<span class="line"><span>loads</span></span>
<span class="line"><span>ia(t)</span></span>
<span class="line"><span>ic(t)</span></span>
<span class="line"><span>in(t) = 0</span></span>
<span class="line"><span>ib(t)</span></span>
<span class="line"><span>Fig. 20.11 A balanced nonlinear delta-connected load may generate triplen current harmonics. These</span></span>
<span class="line"><span>harmonics circulate around the delta, but do not ﬂow through the lines if the load phases are balanced</span></span>
<span class="line"><span>20.5.3 Harmonic Current Flow in Power Factor Correction Capacitors</span></span>
<span class="line"><span>Harmonic currents tend to ﬂow through shunt-connected power factor correction capacitors. To</span></span>
<span class="line"><span>some extent, this is a good thing because the capacitors tend to low-pass ﬁlter the power sys-</span></span>
<span class="line"><span>tem currents, and prevent nonlinear loads from polluting the entire power system. The ﬂow of</span></span>
<span class="line"><span>harmonic currents is then conﬁned to the nonlinear load and local power factor correction ca-</span></span>
<span class="line"><span>pacitors, and voltage waveform distortion is reduced. High-frequency harmonic currents tend to</span></span>
<span class="line"><span>ﬂow through shunt capacitors because the capacitor impedance decreases with frequency, while</span></span>
<span class="line"><span>the inductive impedance of transmission lines increases with frequency. In this sense, power fac-</span></span>
<span class="line"><span>tor correction capacitors mitigate the eﬀects of harmonic currents arising from nonlinear loads</span></span>
<span class="line"><span>in much the same way that they mitigate the eﬀects of reactive currents that arise from inductive</span></span>
<span class="line"><span>loads.</span></span>
<span class="line"><span>esr</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Fig. 20.12 Capacitor</span></span>
<span class="line"><span>equivalent circuit. Losses</span></span>
<span class="line"><span>are modeled by an equiv-</span></span>
<span class="line"><span>alent series resistance</span></span>
<span class="line"><span>(ESR)</span></span>
<span class="line"><span>But the problem is that the power factor correction capacitors</span></span>
<span class="line"><span>may not be rated to handle these harmonic currents, and hence there</span></span>
<span class="line"><span>is a danger that the capacitors may overheat and fail when they are</span></span>
<span class="line"><span>exposed to signiﬁcant harmonic currents. The loss in capacitors is</span></span>
<span class="line"><span>modeled using an equivalent series resistance (ESR) as shown in</span></span>
<span class="line"><span>Fig. 20.12. The ESR models dielectric loss (hysteresis of the dielec-</span></span>
<span class="line"><span>tric D−E loop), contact resistance, and foil and lead resistances.</span></span>
<span class="line"><span>Power loss occurs, equal to i</span></span>
<span class="line"><span>rms 2(esr). Dielectric materials are typi-</span></span>
<span class="line"><span>cally poor conductors of heat, so a moderate amount of power loss</span></span>
<span class="line"><span>can cause a large temperature rise in the center of the capacitor. In</span></span>
<span class="line"><span>consequence, the rms current must be limited to a safe value.</span></span>
<span class="line"><span>Typical power factor correction capacitors are rated by voltageV,</span></span>
<span class="line"><span>frequency f , and reactive power in kV ARs. These ratings are com-</span></span>
<span class="line"><span>puted from the capacitance C and safe rms current I</span></span>
<span class="line"><span>rms, assuming</span></span>
<span class="line"><span>undistorted sinusoidal waveforms, as follows:</span></span>
<span class="line"><span>rated rms voltageVrms= Irms</span></span>
<span class="line"><span>2πfC (20.37)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.5 Harmonic Currents in Three-Phase Systems 863</span></span>
<span class="line"><span>rated rms voltage= I2</span></span>
<span class="line"><span>rms</span></span>
<span class="line"><span>2πfC (20.38)</span></span>
<span class="line"><span>In an undistorted system, the rms current, and hence also the capacitor ESR loss, cannot in-</span></span>
<span class="line"><span>crease unless the rms voltage is also increased. But high-frequency harmonics can lead to larger</span></span>
<span class="line"><span>rms currents without an increased voltage. Any harmonics that ﬂow result in increased rms cur-</span></span>
<span class="line"><span>rent beyond the expected value predicted by Eq. (20.37). If the capacitor is not rated to handle</span></span>
<span class="line"><span>additional power loss, then failure or premature aging can occur.</span></span>
<span class="line"><span>Problems</span></span>
<span class="line"><span>20.1 Passive rectiﬁer circuit. In the passive rectiﬁer circuit of Fig. 20.13, L is very large, such</span></span>
<span class="line"><span>that the inductor current i(t) is essentially dc. All components are ideal.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vR(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>ig(t)</span></span>
<span class="line"><span>S1 S2</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>40 </span></span>
<span class="line"><span>vg(t)</span></span>
<span class="line"><span>230 Vrms</span></span>
<span class="line"><span>50 Hz</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Fig. 20.13 Passive rectiﬁer circuit of Problem 20.1</span></span>
<span class="line"><span>(a) Determine the dc output voltage, current, and power.</span></span>
<span class="line"><span>(b) Sketch the ac line current waveform ig(t) and the rectiﬁer output voltage waveform</span></span>
<span class="line"><span>vR(t).</span></span>
<span class="line"><span>(c) Determine the ac line current rms magnitude, fundamental rms magnitude, and third</span></span>
<span class="line"><span>harmonic rms magnitude. If it is required that the third harmonic magnitude be less</span></span>
<span class="line"><span>than 2.3 A rms, would this rectiﬁer network conform?</span></span>
<span class="line"><span>(d) Determine the power factor, measured at surfaces S</span></span>
<span class="line"><span>1 and S 2.</span></span>
<span class="line"><span>20.2 The three-phase rectiﬁer of Fig. 20.14 is connected to a balanced 60 Hz 3ø ac480V (rms,</span></span>
<span class="line"><span>line-line) sinusoidal source as shown. All elements are ideal. The inductance L is large,</span></span>
<span class="line"><span>such that the current i(t) is essentially constant, with negligible 360 Hz ripple.</span></span>
<span class="line"><span>(a) Sketch the waveform vd(t).</span></span>
<span class="line"><span>(b) Determine the dc output voltage V</span></span>
<span class="line"><span>(c) Sketch the line current waveforms ia(t), ib(t), and ic(t).</span></span>
<span class="line"><span>(d) Find the Fourier series of ia(t).</span></span>
<span class="line"><span>(e) Find the distortion factor, displacement factor, power factor, and line current THD.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>864 20 Power and Harmonics in Nonsinusoidal Systems</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vd(t)</span></span>
<span class="line"><span>Li(t)</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>20 </span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>V</span></span>
<span class="line"><span>ia(t)</span></span>
<span class="line"><span>ib(t)</span></span>
<span class="line"><span>ic(t)</span></span>
<span class="line"><span>a</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>Balanced</span></span>
<span class="line"><span>480 V</span></span>
<span class="line"><span>Fig. 20.14 Three-phase rectiﬁer circuit of Problem 20.2</span></span>
<span class="line"><span>20.3 Harmonic pollution police. In the network of Fig. 20.15, voltage harmonics are observed</span></span>
<span class="line"><span>at the indicated surface. The object of this problem is to decide whether to blame the</span></span>
<span class="line"><span>source or the load for the observed harmonic pollution. Either the source element or the</span></span>
<span class="line"><span>load element contains a nonlinearity that generates harmonics, while the other element is</span></span>
<span class="line"><span>linear.</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>daoLecruoS</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>Surface</span></span>
<span class="line"><span>S</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>Fig. 20.15 Single-phase power system of Problems 20.3 to 20.5</span></span>
<span class="line"><span>(a) Consider ﬁrst the case where the load is a passive linear impedance Z2(s), and hence</span></span>
<span class="line"><span>its phase lies in the range −90◦≤∠Z2(iω)≤+90◦for all positive ω. The source</span></span>
<span class="line"><span>generates harmonics. Express the average power P in the form</span></span>
<span class="line"><span>P=</span></span>
<span class="line"><span>∞∑</span></span>
<span class="line"><span>n=0</span></span>
<span class="line"><span>Pn</span></span>
<span class="line"><span>where Pn is the average power transmitted to the load by harmonic number n. What</span></span>
<span class="line"><span>can you say about the polarities of the Pns?</span></span>
<span class="line"><span>(b) Consider next the case where the load is nonlinear, while the source is linear and can</span></span>
<span class="line"><span>be modeled by a Thevenin-equivalent sinusoidal voltage source and linear impedance</span></span>
<span class="line"><span>Z1(s). Again express the average power P as a sum of average powers, as in part (a).</span></span>
<span class="line"><span>What can you say about the polarities of the Pns in this case?</span></span>
<span class="line"><span>(c) The following Fourier series are measured:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>20.5 Harmonic Currents in Three-Phase Systems 865</span></span>
<span class="line"><span>Harmonic number v(t) i(t)</span></span>
<span class="line"><span>Magnitude Phase Magnitude Phase</span></span>
<span class="line"><span>1 230 V 0 ◦ 6A −20◦</span></span>
<span class="line"><span>3 20 V 180 ◦ 4A 2 0 ◦</span></span>
<span class="line"><span>58 V 6 0 ◦ 1A −110◦</span></span>
<span class="line"><span>Who do you accuse? Explain your reasoning.</span></span>
<span class="line"><span>20.4 For the network and waveforms of Problem 20.3, determine the power factor at the indi-</span></span>
<span class="line"><span>cated surface, and the average power ﬂowing to the load. Harmonics higher in frequency</span></span>
<span class="line"><span>than the ﬁfth harmonic are negligible in magnitude.</span></span>
<span class="line"><span>20.5 Repeat Problem 20.3(c), using the following Fourier series:</span></span>
<span class="line"><span>Harmonic number v(t) i(t)</span></span>
<span class="line"><span>Magnitude Phase Magnitude Phase</span></span>
<span class="line"><span>1 120 V 0 ◦ 5A 2 5 ◦</span></span>
<span class="line"><span>34 V 6 0 ◦ 0.5 A 40 ◦</span></span>
<span class="line"><span>52 V −160◦ 0.2 A −100◦</span></span>
<span class="line"><span>20.6 A balanced three-phase wye-connected load is constructed using a 20 Ωresistor in each</span></span>
<span class="line"><span>phase. This load is connected to a balanced three-phase wye-connected voltage source,</span></span>
<span class="line"><span>whose fundamental voltage component is 380 Vrms line-to-line. In addition, each (line-to-</span></span>
<span class="line"><span>neutral) voltage source produces third and ﬁfth harmonics. Each harmonic has amplitude</span></span>
<span class="line"><span>20 Vrms, and is in phase with the (line-to-neutral) fundamental.</span></span>
<span class="line"><span>(a) The source and load neutral points are connected, such that a four-wire system is</span></span>
<span class="line"><span>obtained. Find the Fourier series of the line currents and the neutral current.</span></span>
<span class="line"><span>(b) The neutral connection is broken, such that a three-wire system is obtained. Find the</span></span>
<span class="line"><span>Fourier series of the line currents. Also ﬁnd the Fourier series of the voltage between</span></span>
<span class="line"><span>the source and load neutral points.</span></span></code></pre></div>`,10)])])}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
