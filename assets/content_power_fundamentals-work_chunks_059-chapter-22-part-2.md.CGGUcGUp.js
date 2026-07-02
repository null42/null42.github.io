import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const u=JSON.parse('{"title":"第22章part 2 - 22 Resonant Conversion","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第22章part 2 - 22 Resonant Conversion","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 951-970 > Chunk ID: `chapter-22-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/059-chapter-22-part-2.md","filePath":"content/power/fundamentals-work/chunks/059-chapter-22-part-2.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/059-chapter-22-part-2.md"};function l(t,n,c,o,r,h){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第22章part-2-22-resonant-conversion" tabindex="-1">第22章part 2 - 22 Resonant Conversion <a class="header-anchor" href="#第22章part-2-22-resonant-conversion" aria-label="Permalink to &quot;第22章part 2 - 22 Resonant Conversion&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 951-970<br> Chunk ID: <code>chapter-22-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>22.3 Soft Switching 953</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ids(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>2 + t</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices:</span></span>
<span class="line"><span>of Q1, Q4 of Q1, Q4</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>vds1(t)</span></span>
<span class="line"><span>Fig. 22.26 Transistor Q1 voltage and current waveforms, for operation of the series resonant converter</span></span>
<span class="line"><span>below resonance in the k= 1 CCM</span></span>
<span class="line"><span>age fundamental component vs1(t), as shown in Fig.22.25. In consequence, the zero crossing of</span></span>
<span class="line"><span>the current waveform is(t) occurs before the zero crossing of the voltage vs(t).</span></span>
<span class="line"><span>For the half-cycle 0&lt; t&lt; Ts/2, the switch voltage vs is equal to+Vg.F o r0&lt; t&lt; tβ,t h e</span></span>
<span class="line"><span>current is(t) is positive and transistorsQ1 and Q4 conduct. Diodes D1 and D4 conduct when is(t)</span></span>
<span class="line"><span>is negative, over the interval tβ&lt; t&lt; Ts/2. The situation during Ts/2&lt; t&lt; Ts is symmetrical.</span></span>
<span class="line"><span>Since is1(t) leads vs1(t), the transistors conduct before their respective antiparallel diodes. Note</span></span>
<span class="line"><span>that, at any given time during the D1 conduction interval tβ&lt; t&lt; Ts/2, transistor Q1 can be</span></span>
<span class="line"><span>turned oﬀwithout incurring switching loss. The circuit naturally causes the transistor turn-o ﬀ</span></span>
<span class="line"><span>transition to be lossless, and long turn-oﬀswitching times can be tolerated.</span></span>
<span class="line"><span>In general, zero-current switching can occur when the resonant tank presents an e ﬀective</span></span>
<span class="line"><span>capacitive load to the switches, so that the switch current zero crossings occur before the switch</span></span>
<span class="line"><span>voltage zero crossings. In the bridge conﬁguration, zero-current switching is characterized by</span></span>
<span class="line"><span>the half-bridge conduction sequence Q1–D1–Q2–D2, such that the transistors are turned o ﬀ</span></span>
<span class="line"><span>while their respective antiparallel diodes conduct. It is possible, if desired, to replace the transis-</span></span>
<span class="line"><span>tors with naturally commutated thyristors whenever the zero-current-switching property occurs</span></span>
<span class="line"><span>at the turn-oﬀtransition.</span></span>
<span class="line"><span>The transistor turn-on transition in Fig. 22.26 is similar to that of a PWM switch: it is hard-</span></span>
<span class="line"><span>switched and is not lossless. During the turn-on transition ofQ1, diode D2 must turn oﬀ. Neither</span></span>
<span class="line"><span>the transistor current nor the transistor voltage is zero, Q1 passes through a period of high</span></span>
<span class="line"><span>instantaneous power dissipation, and switching loss occurs. As in the PWM case, the reverse</span></span>
<span class="line"><span>recovery current of diode D2 ﬂows through Q1. This current spike can be the largest component</span></span>
<span class="line"><span>of switching loss. In addition, the energy stored in the drain-to-source capacitances ofQ1 and Q2</span></span>
<span class="line"><span>and in the depletion layer capacitance of D1 is lost when Q1 turns on. These turn-on transition</span></span>
<span class="line"><span>switching loss mechanisms can be a major disadvantage of zero-current-switching schemes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>954 22 Resonant Conversion</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>g</span></span>
<span class="line"><span>vs1(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>is(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices:</span></span>
<span class="line"><span>turn-on of</span></span>
<span class="line"><span>Q1, Q4</span></span>
<span class="line"><span>turn-off of</span></span>
<span class="line"><span>Q1, Q4</span></span>
<span class="line"><span>turn-on of</span></span>
<span class="line"><span>Q2, Q3</span></span>
<span class="line"><span>turn-off of</span></span>
<span class="line"><span>Q2, Q3</span></span>
<span class="line"><span>Fig. 22.27 Switch network output waveforms for the series resonant converter, operated above resonance</span></span>
<span class="line"><span>in the continuous conduction mode. Zero-voltage switching aids the transistor turn-on process</span></span>
<span class="line"><span>Since zero-current switching does not address the switching loss mechanisms that dominate in</span></span>
<span class="line"><span>MOSFET converters, improvements in eﬃciency typically are not observed.</span></span>
<span class="line"><span>22.3.2 Operation of the Full-Bridge Above Resonance: Zero-Voltage Switching</span></span>
<span class="line"><span>When the series resonant converter is operated above resonance, the zero-voltage switching</span></span>
<span class="line"><span>phenomenon can occur, in which the circuit causes the transistor voltage to become zero before</span></span>
<span class="line"><span>the controller turns the transistor on. With a minor circuit modiﬁcation, the transistor turn-o ﬀ</span></span>
<span class="line"><span>transitions can also be caused to occur at zero voltage. This process can lead to signiﬁcant</span></span>
<span class="line"><span>reductions in the switching losses of converters based on MOSFETs and diodes.</span></span>
<span class="line"><span>For the full-bridge circuit of Fig. 22.24, the switch output voltage vs(t), and its fundamental</span></span>
<span class="line"><span>component vs1(t), as well as the approximately sinusoidal tank current waveform is(t), are plot-</span></span>
<span class="line"><span>ted in Fig. 22.27. At frequencies greater than the tank resonant frequency, the input impedance</span></span>
<span class="line"><span>of the tank networkZi(s) is dominated by the tank inductor impedance. Hence, the tank presents</span></span>
<span class="line"><span>an eﬀective inductive load to the bridge, and the switch currentis(t) lags the switch voltage fun-</span></span>
<span class="line"><span>damental component vs1(t), as shown in Fig. 22.27. In consequence, the zero crossing of the</span></span>
<span class="line"><span>voltage waveform vs(t) occurs before the current waveform is(t).</span></span>
<span class="line"><span>For the half-cycle 0&lt; t&lt; Ts/2, the switch voltage vs(t) is equal to+Vg.F o r0&lt; t&lt; tα,t h e</span></span>
<span class="line"><span>current is(t) is negative and diodes D1 and D4 conduct. Transistors Q1 and Q4 conduct when</span></span>
<span class="line"><span>is(t) is positive, over the interval tα &lt; t&lt; Ts/2. The waveforms during Ts/2&lt; t&lt; Ts are</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.3 Soft Switching 955</span></span>
<span class="line"><span>symmetrical. Since the zero crossing of vs(t) leads the zero crossing of is(t), the transistors</span></span>
<span class="line"><span>conduct after their respective antiparallel diodes. Note that, at any given time during the D1</span></span>
<span class="line"><span>conduction interval 0 &lt; t&lt; tα, transistor Q1 can be turned on without incurring switching</span></span>
<span class="line"><span>loss. The circuit naturally causes the transistor turn-on transition to be lossless, and long turn-</span></span>
<span class="line"><span>on switching times can be tolerated. A particularly signiﬁcant implication of this is that the</span></span>
<span class="line"><span>switching loss associated with reverse recovery of the antiparallel diodes is avoided. Relatively</span></span>
<span class="line"><span>slow diodes, such as the MOSFET body diodes, can be employed for realization of diodes D</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>to D4. In addition, the output capacitances of transistors Q1 to Q4 and diodes D1 to D4 do not</span></span>
<span class="line"><span>lead to switching loss.</span></span>
<span class="line"><span>In general, zero-voltage switching can occur when the resonant tank presents an e ﬀective</span></span>
<span class="line"><span>inductive load to the switches, and hence the switch voltage zero crossings occur before the</span></span>
<span class="line"><span>switch current zero crossings. In the bridge conﬁguration, zero-voltage switching is character-</span></span>
<span class="line"><span>ized by the half-bridge conduction sequence D1–Q1–D2–Q2, such that the transistors are turned</span></span>
<span class="line"><span>on while their respective antiparallel diodes conduct. Since the transistor voltage is zero during</span></span>
<span class="line"><span>the entire turn-on transition, switching loss due to slow turn-on times or due to energy storage</span></span>
<span class="line"><span>in any of the device capacitances does not occur at turn-on.</span></span>
<span class="line"><span>The transistor turn-oﬀtransition in Fig.22.28 is similar to that of a PWM switch. In convert-</span></span>
<span class="line"><span>ers that employ IGBTs or other minority-carrier devices, signiﬁcant switching loss may occur</span></span>
<span class="line"><span>at the turn-oﬀtransitions. The current tailing phenomenon causes Q</span></span>
<span class="line"><span>1 to pass through a period</span></span>
<span class="line"><span>of high instantaneous power dissipation, and switching loss occurs.</span></span>
<span class="line"><span>To assist the transistor turn-oﬀprocess, small capacitorsCleg may be introduced into the legs</span></span>
<span class="line"><span>of the bridge, as demonstrated in Fig. 22.29. In a converter employing MOSFETs, the device</span></span>
<span class="line"><span>output capacitances are suﬃcient for this purpose, with no need for external discrete capacitors.</span></span>
<span class="line"><span>A delay is also introduced into the gate drive signals, so that there is a short commutation inter-</span></span>
<span class="line"><span>val when all four transistors are oﬀ. During the normalQ1, D1, Q2, and D2 conduction intervals,</span></span>
<span class="line"><span>the leg capacitors appear in parallel with the semiconductor switches, and have no eﬀect on the</span></span>
<span class="line"><span>converter operation. However, these capacitors introduce commutation intervals at transistor</span></span>
<span class="line"><span>turn-oﬀ. When Q</span></span>
<span class="line"><span>1 is turned oﬀ, the tank current is(Ts/2) ﬂows through the switch capacitances</span></span>
<span class="line"><span>Cleg instead of Q1, and the voltage across Q1 and Cleg increases. Eventually, the voltage across</span></span>
<span class="line"><span>Q1 reaches Vg; diode D2 then becomes forward-biased. If the MOSFET turn-oﬀtime is suﬃ-</span></span>
<span class="line"><span>ciently fast, then the MOSFET is switched fully oﬀbefore the drain voltage rises signiﬁcantly</span></span>
<span class="line"><span>above zero, and negligible turn-oﬀswitching loss is incurred. The energy stored in the device</span></span>
<span class="line"><span>capacitances, that is, in Cleg, is transferred to the tank inductor. The fact that none of the semi-</span></span>
<span class="line"><span>conductor device capacitances or stored charges lead to switching loss is the major advantage</span></span>
<span class="line"><span>of zero-voltage switching, and is the most common motivation for its use. MOSFET converters</span></span>
<span class="line"><span>can typically be operated in this manner, using only the internal drain-to-source capacitances.</span></span>
<span class="line"><span>However, other devices such as IGBTs typically require substantial external capacitances to</span></span>
<span class="line"><span>reduce the losses incurred during the IGBT turn-oﬀtransitions.</span></span>
<span class="line"><span>An additional advantage of zero-voltage switching is the reduction of EMI associated with</span></span>
<span class="line"><span>device capacitances. In conventional PWM converters and also, to some extent, in zero-current</span></span>
<span class="line"><span>switching converters, signiﬁcant high-frequency ringing and current spikes are generated by the</span></span>
<span class="line"><span>rapid charging and discharging of the semiconductor device capacitances during the turn-on</span></span>
<span class="line"><span>and/or turn-oﬀtransitions.</span></span>
<span class="line"><span>Ringing is conspicuously absent from the waveforms of converters in which all semiconduc-</span></span>
<span class="line"><span>tor devices switch at zero voltage; these converters inherently do not generate this type of EMI.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>956 22 Resonant Conversion</span></span>
<span class="line"><span>Ts</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ids(t)</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices:</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>vds1(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>turn-on of</span></span>
<span class="line"><span>Q1, Q4</span></span>
<span class="line"><span>turn-off of</span></span>
<span class="line"><span>Q1, Q4</span></span>
<span class="line"><span>Fig. 22.28 Transistor Q1 voltage and current waveforms, for operation of the series resonant converter</span></span>
<span class="line"><span>above resonance in the k= 0 CCM</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>+Vg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>Q3</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>D4</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vs(t)</span></span>
<span class="line"><span>is(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>vds1(t)</span></span>
<span class="line"><span>to remainder</span></span>
<span class="line"><span>of converter</span></span>
<span class="line"><span>Cleg</span></span>
<span class="line"><span>Cleg Cleg</span></span>
<span class="line"><span>Cleg</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices:</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>vds1(t)</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>Q4</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>D3</span></span>
<span class="line"><span>Turn off</span></span>
<span class="line"><span>Q1, Q4</span></span>
<span class="line"><span>Commutation</span></span>
<span class="line"><span>interval</span></span>
<span class="line"><span>X</span></span>
<span class="line"><span>Fig. 22.29 Introduction of small capacitorsCleg, which reduce the turn-oﬀ-transition switching loss when</span></span>
<span class="line"><span>the series resonant converter is operated above resonance: ( a) bridge circuit, ( b) transistor voltage wave-</span></span>
<span class="line"><span>form</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 957</span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters</span></span>
<span class="line"><span>The properties of the CCM PWM converters studied in previous chapters are largely unaﬀected</span></span>
<span class="line"><span>by the load current. In consequence, these converters exhibit several desirable properties that</span></span>
<span class="line"><span>are often taken for granted. The transistor current is proportional to the load current; hence con-</span></span>
<span class="line"><span>duction losses become small at light load, leading to good light-load eﬃciency. Also, the output</span></span>
<span class="line"><span>impedance is low, and hence the dc output voltage does not signiﬁcantly depend on the load</span></span>
<span class="line"><span>i−v characteristic (at least, in CCM). Unfortunately, these good properties are not necessarily</span></span>
<span class="line"><span>shared by resonant converters. Of central importance in design of a resonant converter is the</span></span>
<span class="line"><span>selection of the resonant tank topology and element values, so that the transistor conduction</span></span>
<span class="line"><span>losses at light load are minimized, so that zero-voltage switching is obtained over a wide range</span></span>
<span class="line"><span>of load currents (preferably, for all anticipated loads, but at least at full and intermediate load</span></span>
<span class="line"><span>powers), and so that the converter dynamic range is compatible with the loadi−v characteristic.</span></span>
<span class="line"><span>These design issues are addressed in this section.</span></span>
<span class="line"><span>The conduction loss caused by circulating tank currents is well-recognized as a problem in</span></span>
<span class="line"><span>resonant converter design. These currents are independent of, or only weakly dependent on, the</span></span>
<span class="line"><span>load current, and lead to poor eﬃciency at light load. In Fig. 22.30, the switch current i</span></span>
<span class="line"><span>s(s)i s</span></span>
<span class="line"><span>equal to vs(s)/Zi(s). If we want the switch current to track the load current, then at the switching</span></span>
<span class="line"><span>frequency||Zi|| should be dominated by, or at least strongly inﬂuenced by, the load resistanceR.</span></span>
<span class="line"><span>Unfortunately, this is often not consistent with the requirement for zero-voltage switching, in</span></span>
<span class="line"><span>which Zi is dominated by a tank inductor.</span></span>
<span class="line"><span>vs1(t)</span></span>
<span class="line"><span>Effective</span></span>
<span class="line"><span>resistive</span></span>
<span class="line"><span>load</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>is(t) i(t)</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Zi Zo</span></span>
<span class="line"><span>Transfer function</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Effective</span></span>
<span class="line"><span>sinusoidal</span></span>
<span class="line"><span>source Resonant</span></span>
<span class="line"><span>network</span></span>
<span class="line"><span>Purely reactive</span></span>
<span class="line"><span>Fig. 22.30 Resonant inverter model</span></span>
<span class="line"><span>To design a resonant converter that exhibits good properties, the engineer must develop</span></span>
<span class="line"><span>physical insight into how the load resistance R aﬀects the tank input impedance and output</span></span>
<span class="line"><span>voltage.</span></span>
<span class="line"><span>In this section, the inverter output characteristics, zero-voltage switching boundary, and the</span></span>
<span class="line"><span>dependence of transistor current on load resistance, are related to the properties of the tank net-</span></span>
<span class="line"><span>work under the extreme conditions of an open-circuited or short-circuited load. The undamped</span></span>
<span class="line"><span>tank network responses are easily plotted, and the insight needed to optimize the tank network</span></span>
<span class="line"><span>design can be gained quickly.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>958 22 Resonant Conversion</span></span>
<span class="line"><span>22.4.1 Inverter Output Characteristics</span></span>
<span class="line"><span>Let us ﬁrst investigate how the magnitude of the inverter output voltage||v|| depends on the load</span></span>
<span class="line"><span>current magnitude||i||. Consider the resonant inverter system of Fig. 22.30.L e t H∞(s)b et h e</span></span>
<span class="line"><span>open-circuit (R→∞) transfer function of the tank network:</span></span>
<span class="line"><span>H∞(s)= v(s)</span></span>
<span class="line"><span>vs1(s)</span></span>
<span class="line"><span>⏐⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>R→∞</span></span>
<span class="line"><span>(22.33)</span></span>
<span class="line"><span>and let Zo0(s) be the output impedance, determined when the source vs1(s) is short-circuited.</span></span>
<span class="line"><span>Then we can model the output port of the tank network using the Thevenin-equivalent circuit of</span></span>
<span class="line"><span>Fig. 22.31. Solution of this circuit using the voltage divider formula leads to</span></span>
<span class="line"><span>v(s)= H∞(s)vs1(s) R</span></span>
<span class="line"><span>R+ Zo0(s) (22.34)</span></span>
<span class="line"><span>At a given angular switching frequencyωs = 2πfs, the phasor representing the magnitude and</span></span>
<span class="line"><span>phase of the ac output voltage is found by letting s= jωs:</span></span>
<span class="line"><span>v( jωs)= H∞( jωs)vs1( jωs) R</span></span>
<span class="line"><span>R+ Zo0( jωs) (22.35)</span></span>
<span class="line"><span>The magnitude can be found by noting that</span></span>
<span class="line"><span>∥v( jωs)∥2= v( jωs)v∗( jωs) (22.36)</span></span>
<span class="line"><span>where v∗( jωs) is the complex conjugate of v( jωs). Substitution of Eq. (22.35) into Eq. (22.36)</span></span>
<span class="line"><span>leads to</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Zo0</span></span>
<span class="line"><span>H vs1</span></span>
<span class="line"><span>Tank network</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v R</span></span>
<span class="line"><span>i</span></span>
<span class="line"><span>Fig. 22.31 Thevenin-equivalent circuit that models the output port of the tank network</span></span>
<span class="line"><span>∥v( jωs)∥2=</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>H∞( jωs)vs1( jωs) R</span></span>
<span class="line"><span>R+ Zo0( jωs)</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>H∞( jωs)vs1( jωs) R</span></span>
<span class="line"><span>R+ Zo0( jωs)</span></span>
<span class="line"><span>)∗</span></span>
<span class="line"><span>= H∞( jωs)H∗</span></span>
<span class="line"><span>∞( jωs)vs1( jωs)v∗</span></span>
<span class="line"><span>s1( jωs) R2</span></span>
<span class="line"><span>(R+ Zo0( jωs))( R+ Zo0( jωs))∗</span></span>
<span class="line"><span>=∥H∞( jωs)∥2∥vs1( jωs)∥2 R2</span></span>
<span class="line"><span>(R+ Zo0( jωs))( R+ Zo0( jωs))∗ (22.37)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 959</span></span>
<span class="line"><span>This result can be further simpliﬁed with the assumption that the tank network contains only</span></span>
<span class="line"><span>purely reactive elements, i.e., that any losses or other resistive elements within the tank network</span></span>
<span class="line"><span>have negligible eﬀect. Then the output impedance Zo0( jωs), as well as all other driving-point</span></span>
<span class="line"><span>impedances of the tank network, are purely imaginary quantities. This implies that the complex</span></span>
<span class="line"><span>conjugate Z</span></span>
<span class="line"><span>∗</span></span>
<span class="line"><span>o0( jωs)i sg i v e nb y</span></span>
<span class="line"><span>Z∗</span></span>
<span class="line"><span>o0( jωs)=−Zo0( jωs) (22.38)</span></span>
<span class="line"><span>Substitution of Eq. (22.38) into Eq. (22.37) and simpliﬁcation leads to</span></span>
<span class="line"><span>∥v( jωs)∥2=∥H∞( jωs)∥2∥vs( jωs)∥2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+∥Zo0( jωs)∥2</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>) (22.39)</span></span>
<span class="line"><span>with</span></span>
<span class="line"><span>R=||v( jωs)||</span></span>
<span class="line"><span>||i( jωs)|| (22.40)</span></span>
<span class="line"><span>Substitution of Eq. (22.40) into Eq. (22.39) and rearrangement of terms yields</span></span>
<span class="line"><span>∥v( jωs)∥2+∥i( jωs)∥2∥Zo0( jωs)∥2=∥H∞( jωs)∥2∥vs( jωs)∥2 (22.41)</span></span>
<span class="line"><span>Hence, at a given frequency, the inverter output characteristic, that is, the relationship between</span></span>
<span class="line"><span>||v( jωs)|| and||i( jωs)|| is elliptical. Equation (22.41) can be further rearranged, into the form</span></span>
<span class="line"><span>∥v( jωs)∥2</span></span>
<span class="line"><span>V2oc</span></span>
<span class="line"><span>+∥i( jωs)∥2</span></span>
<span class="line"><span>I2sc</span></span>
<span class="line"><span>= 1 (22.42)</span></span>
<span class="line"><span>where the open-circuit voltage Voc and short-circuit current Isc are given by</span></span>
<span class="line"><span>Voc =∥H∞( jωs)∥∥vs( jωs)∥</span></span>
<span class="line"><span>Isc=∥H∞( jωs)||∥vs( jωs)∥</span></span>
<span class="line"><span>||Zo0( jωs)∥ = Voc</span></span>
<span class="line"><span>∥Zo0( jωs)∥ (22.43)</span></span>
<span class="line"><span>|| i ||</span></span>
<span class="line"><span>|| v ||Voc</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Matched load</span></span>
<span class="line"><span>R = || Zo0</span></span>
<span class="line"><span>||</span></span>
<span class="line"><span>Isc</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>Inverter output</span></span>
<span class="line"><span>characteristic</span></span>
<span class="line"><span>Voc = H vs</span></span>
<span class="line"><span>Isc = H vs</span></span>
<span class="line"><span>Zo0</span></span>
<span class="line"><span>Fig. 22.32 Elliptical output characteristics of resonant inverters. A resistive matched load is also illus-</span></span>
<span class="line"><span>trated</span></span>
<span class="line"><span></span></span>
<span class="line"><span>960 22 Resonant Conversion</span></span>
<span class="line"><span>These inverter output characteristics are constructed in Fig. 22.32. This characteristic describes</span></span>
<span class="line"><span>how, at a given switching frequency, the ac output voltage magnitude varies as the circuit is</span></span>
<span class="line"><span>loaded. The equilibrium output voltage is given by the intersection of this elliptical character-</span></span>
<span class="line"><span>istic with the load i−v characteristic. For example, Fig. 22.32 also illustrates a superimposed</span></span>
<span class="line"><span>resistive load line having slope 1/R, in the special case where R=||Zo0( jωs)||. This value of R</span></span>
<span class="line"><span>corresponds to matched-load operation, in which the converter output power is maximized. It</span></span>
<span class="line"><span>can be shown that the operating point is then given by</span></span>
<span class="line"><span>∥v( jωs)∥2= Voc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>∥i( jωs)∥2= Isc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>(22.44)</span></span>
<span class="line"><span>Note that Fig. 22.32 can also be applied to the output i−v characteristics of resonant dc–dc</span></span>
<span class="line"><span>converters, since the output rectiﬁer then loads the tank with an eﬀective resistive load Re.</span></span>
<span class="line"><span>22.4.2 Dependence of Transistor Current on Load</span></span>
<span class="line"><span>The transistors must conduct the current appearing at the input port of the tank network, is(t).</span></span>
<span class="line"><span>This current is determined by the tank network input impedance Zi( jωs):</span></span>
<span class="line"><span>is1( jωs)= vs1( jωs)</span></span>
<span class="line"><span>Zi( jωs) (22.45)</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>Cp</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>fm|| Zi0 ||</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>Fig. 22.33 Tank network, parallel resonant converter example: ( a) tank circuit, ( b) bode plot of input</span></span>
<span class="line"><span>impedance magnitude∥Zi∥ for the limiting cases R→0a n dR→∞</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 961</span></span>
<span class="line"><span>As described previously, obtaining good light-load eﬃciency requires that ||Zi( jωs)|| increase</span></span>
<span class="line"><span>as the load resistance R increases. To understand how ||Zi( jωs)|| depends on R, let us sketch</span></span>
<span class="line"><span>||Zi( jωs)|| in the extreme cases of an open-circuited (R→∞) and short-circuited (R→0) load:</span></span>
<span class="line"><span>Zi0( jωs)= Zi( jωs)|R→0</span></span>
<span class="line"><span>Zi∞( jωs)= Zi( jωs)|R→∞ (22.46)</span></span>
<span class="line"><span>For example, consider the parallel resonant converter of Figs. 22.19, 22.20, 22.21, 22.22,</span></span>
<span class="line"><span>22.23. The Bode diagrams of the impedances ||Zi0( jωs)|| and∥Zi∞( jωs)|| are constructed in</span></span>
<span class="line"><span>Fig. 22.33. Zi0(s) is found with the load R shorted, and is equal to the inductor impedance</span></span>
<span class="line"><span>sL. Zi∞(s), found with the loadR open-circuited, is given by the series combination (sL+ 1/sC).</span></span>
<span class="line"><span>It can be seen in Fig. 22.33 that the impedance magnitudes||Zi0( jωs)|| and||Zi∞( jωs)|| intersect</span></span>
<span class="line"><span>at frequency fm. If the switching frequency is chosen such that fs &lt; fm, then∥Zi∞( jωs)||&gt;</span></span>
<span class="line"><span>∥Zi0( jωs)∥. The converter then exhibits the desirable characteristic that the no-load switch cur-</span></span>
<span class="line"><span>rent magnitude ∥vs( jωs)∥/||Zi∞( jωs)|| is smaller than the switch current under short-circuit</span></span>
<span class="line"><span>conditions,||vs( jωs)∥/∥Zi0( jωs)∥. In fact, the short-circuit switch current is limited by the</span></span>
<span class="line"><span>impedance of the tank inductor, while the open-circuit switch current is determined primarily</span></span>
<span class="line"><span>by the impedance of the tank capacitor.</span></span>
<span class="line"><span>If the switching frequency is chosen such that fs &gt; fm, then||Zi∞( jωs)||&lt;||Zi0( jωs)∥.T h e</span></span>
<span class="line"><span>no-load switch current is then greater in magnitude than the switch current when the load is</span></span>
<span class="line"><span>short-circuited! When the load current is reduced or removed, the transistors will continue to</span></span>
<span class="line"><span>conduct large currents and generate high conduction losses. This causes the eﬃciency at light</span></span>
<span class="line"><span>load to be poor. It can be concluded that, to obtain good light-load e ﬃciency in the parallel</span></span>
<span class="line"><span>resonant converter, one should choose fs suﬃciently less than fm. Unfortunately, this requires</span></span>
<span class="line"><span>operation below resonance, leading to reduced output voltage dynamic range and a tendency to</span></span>
<span class="line"><span>lose the zero-voltage switching property. Input impedances of the series, parallel, and LCC tank</span></span>
<span class="line"><span>circuits are sketched in Fig. 22.34.</span></span>
<span class="line"><span>A remaining question is how||Z</span></span>
<span class="line"><span>i( jωs)|| behaves for intermediate values of load between the</span></span>
<span class="line"><span>open-circuit and short-circuit conditions. The answer is given by Theorem22.1 below:||Zi( jωs)||</span></span>
<span class="line"><span>varies monotonically with R, and therefore is bounded by ∥Zi0( jωs)∥ and||Zi∞( jωs)∥. Hence,</span></span>
<span class="line"><span>the Bode plots of the limiting cases ||Zi0(iωs)∥ and∥Zi∞( jωs)∥ provide a correct qualitative</span></span>
<span class="line"><span>understanding of the behavior of||Zi|| for all R. The theorem is valid for lossless tank networks.</span></span>
<span class="line"><span>Theorem 22.1. If the tank network is purely reactive, then its input impedance ||Zi∥ is a mono-</span></span>
<span class="line"><span>tonic function of the load resistance R.</span></span>
<span class="line"><span>This theorem is proven by use of Middlebrook’s Extra Element Theorem (see Chap. 16).</span></span>
<span class="line"><span>The tank network input impedance Zi(s) can be expressed as a function of the load resistance R</span></span>
<span class="line"><span>and the tank network driving-point impedances, as follows:</span></span>
<span class="line"><span>Zi(s)= Zi0(s)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Zo0(s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Zo∞(s)</span></span>
<span class="line"><span>)= Zi∞(s)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Zo0(s)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ Zo∞(s)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>) (22.47)</span></span>
<span class="line"><span>where Zi0 and Zi∞are the resonant network input impedances, with the load short-circuited or</span></span>
<span class="line"><span>open-circuited, respectively, andZo0 and Zo∞are the resonant network output impedances, with</span></span>
<span class="line"><span></span></span>
<span class="line"><span>962 22 Resonant Conversion</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>|| Zi0 ||</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>Series CsL</span></span>
<span class="line"><span>Zi Zo</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>fm|| Zi0 ||</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>Parallel</span></span>
<span class="line"><span>ZoCp</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>fm</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>|| Zi0 ||</span></span>
<span class="line"><span>LCC</span></span>
<span class="line"><span>Zo</span></span>
<span class="line"><span>Cs</span></span>
<span class="line"><span>Cp</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>Fig. 22.34 Series, parallel, and LCC resonant tank networks, and their input impedances Zi0 and Zi∞</span></span>
<span class="line"><span>the source input short-circuited or open-circuited, respectively. These terminal impedances are</span></span>
<span class="line"><span>simple functions of the tank elements, and their Bode diagrams are easily constructed. The input</span></span>
<span class="line"><span>impedances of the series resonant, parallel resonant, and LCC inverters are listed in Fig. 22.34.</span></span>
<span class="line"><span>Since these impedances do not depend on the load, they are purely reactive, ideally have zero</span></span>
<span class="line"><span>real parts [330], and their complex conjugates are given byZ∗</span></span>
<span class="line"><span>o0=−Zo0, Z∗</span></span>
<span class="line"><span>o∞=−Zo∞, etc. Again,</span></span>
<span class="line"><span>recall that the magnitude of a complex impedance Z( jω) can be expressed as the square root of</span></span>
<span class="line"><span>Z( jω)Z∗( jω). Hence, the magnitude of Zi(s)i sg i v e nb y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 963</span></span>
<span class="line"><span>∥Zi∥2= ZiZ∗</span></span>
<span class="line"><span>i = Zi0(s)Z∗</span></span>
<span class="line"><span>i0(s)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Zo0(s)</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Z∗</span></span>
<span class="line"><span>o0(s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Zo∞(s)</span></span>
<span class="line"><span>)⎦</span></span>
<span class="line"><span>1+ R</span></span>
<span class="line"><span>Z∗o∞(s)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>=∥Zi0∥2</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R2</span></span>
<span class="line"><span>||Zo0||2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R2</span></span>
<span class="line"><span>||Zo∞||2</span></span>
<span class="line"><span>) (22.48)</span></span>
<span class="line"><span>where Z∗</span></span>
<span class="line"><span>i is the complex conjugate of Zi.</span></span>
<span class="line"><span>Next, let us diﬀerentiate Eq. (22.48) with respect to R:</span></span>
<span class="line"><span>d∥Zi∥2</span></span>
<span class="line"><span>dR = 2R∥Zi0∥2</span></span>
<span class="line"><span>⎦ 1</span></span>
<span class="line"><span>∥Zo0∥2 −1</span></span>
<span class="line"><span>||Zo∞∥2</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>1+ R2</span></span>
<span class="line"><span>∥Zo∞∥2</span></span>
<span class="line"><span>)2 (22.49)</span></span>
<span class="line"><span>The derivative has roots at ( i) R= 0, (ii) R=∞, and in the special case ( iii) where||Zi0∥=</span></span>
<span class="line"><span>||Zi∞||. Since the derivative is otherwise nonzero, the resonant network input impedance∥Zi∥ is</span></span>
<span class="line"><span>a monotonic function of R, over the range 0&lt; R&lt;∞. In special case (iii),||Zi|| is independent</span></span>
<span class="line"><span>of R. Therefore, Theorem 22.1 is proved.</span></span>
<span class="line"><span>An example is given in Figs. 22.36 and 22.35, for the LCC inverter. Figure22.35 illustrates</span></span>
<span class="line"><span>the impedance asymptotes of the limiting cases||Zi0|| and||Zi∞||. Variation of||Zi|| between these</span></span>
<span class="line"><span>limits, for ﬁnite nonzero R, is illustrated in Fig. 22.36. The open-circuit resonant frequency f∞</span></span>
<span class="line"><span>and the short-circuit resonant frequency f0 are given by</span></span>
<span class="line"><span>f0= 1</span></span>
<span class="line"><span>2π√LCs</span></span>
<span class="line"><span>f∞= 1</span></span>
<span class="line"><span>2π√LCs∥Cp</span></span>
<span class="line"><span>(22.50)</span></span>
<span class="line"><span>where Cs||Cp denotes inverse addition of Cs and Cp:</span></span>
<span class="line"><span>Cs∥Cp= 1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Cs</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>Cp</span></span>
<span class="line"><span>(22.51)</span></span>
<span class="line"><span>For the LCC inverter, the impedance magnitudes ||Zi0|| and∥Zi∞∥ are equal at frequency fm,</span></span>
<span class="line"><span>given by</span></span>
<span class="line"><span>fm= 1</span></span>
<span class="line"><span>2π√LCs∥2Cp</span></span>
<span class="line"><span>(22.52)</span></span>
<span class="line"><span>If the switching frequency is chosen to be greater than fm, then||Zi∞|| is less than∥Zi0||.T h i s</span></span>
<span class="line"><span>implies that, as the load current is decreased, the transistor current will increase. Such a con-</span></span>
<span class="line"><span>verter will have poor eﬃciency at light load, and will exhibit signiﬁcant circulating currents. If</span></span>
<span class="line"><span>the switching frequency is chosen to be less than fm, then the transistor current will increase</span></span>
<span class="line"><span>with decrease with decreasing load current. The short-circuit current is limited by ||Zi0∥, while</span></span>
<span class="line"><span></span></span>
<span class="line"><span>964 22 Resonant Conversion</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>fm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>|| Zi0 ||</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>f0 = 1</span></span>
<span class="line"><span>2 LCs</span></span>
<span class="line"><span>f = 1</span></span>
<span class="line"><span>2 LCs||Cp</span></span>
<span class="line"><span>fm = 1</span></span>
<span class="line"><span>2 LCs||2C p</span></span>
<span class="line"><span>f0 f</span></span>
<span class="line"><span>Fig. 22.35 Construction of the quantities∥Zi0∥ and∥Zi∞∥, for the LCC inverter</span></span>
<span class="line"><span>the circulating currents under open-circuit conditions are determined by ||Zi∞||. In general, if</span></span>
<span class="line"><span>f&gt; fm, then the transistor current is greater than or equal to the short-circuit current for all R.</span></span>
<span class="line"><span>The inequality is reversed when f&lt; fm.</span></span>
<span class="line"><span>The impedance magnitudes||Zi0∥ and||Zi∞|| are illustrated in Fig. 22.34 for the series, paral-</span></span>
<span class="line"><span>lel, and LCC tank networks. In the case of the series tank network,∥Zi∞||=∞. In consequence,</span></span>
<span class="line"><span>the no-load transistor current is zero, both above resonance and below resonance. Hence, the</span></span>
<span class="line"><span>series resonant inverter exhibits the desirable property that the transistor current is proportional</span></span>
<span class="line"><span>to the load current. In addition, when the load is short-circuited, the current magnitude is limited</span></span>
<span class="line"><span>by the impedance of the series resonant tank. For the parallel and LCC inverters, it is desirable</span></span>
<span class="line"><span>to operate below the frequency f</span></span>
<span class="line"><span>m.</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| Zi || ff∀</span></span>
<span class="line"><span>increasing R</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>fm</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>increasing R</span></span>
<span class="line"><span>Fig. 22.36 Variation of tank network input impedance∥Zi∥ with load resistance R,L C Ci n v e r t e r .A st h e</span></span>
<span class="line"><span>load resistance is increased,∥Zi∥ changes monotonically from∥Zi0∥ to∥Zi∞∥</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 965</span></span>
<span class="line"><span>Thus, the dependence of the transistor current on load can be easily determined, using an</span></span>
<span class="line"><span>intuitive frequency-domain approach.</span></span>
<span class="line"><span>22.4.3 Dependence of the ZVS/ZCS Boundary on Load Resistance</span></span>
<span class="line"><span>It is also necessary to determine the critical load resistance R= Rcrit at the boundary between</span></span>
<span class="line"><span>ZVS and ZCS. This boundary can also be expressed as a function of the impedancesZi0 and Zi∞.</span></span>
<span class="line"><span>As discussed in Sect. 22.3, zero-voltage switching occurs when the switch current is(t) lags</span></span>
<span class="line"><span>the switch voltage vs(t). Zero-voltage switching occurs when is(t) leads vs(t). This deﬁnition</span></span>
<span class="line"><span>ignores the eﬀects of semiconductor output capacitances, and hence gives an approximate</span></span>
<span class="line"><span>ZVS/ZCS boundary. The phase between the switch current and switch voltage is again deter-</span></span>
<span class="line"><span>mined by the input impedance of the tank network:</span></span>
<span class="line"><span>is1( jωs)= vs1( jωs)</span></span>
<span class="line"><span>Zi( jωs) (22.53)</span></span>
<span class="line"><span>Hence, zero-voltage switching occurs when Zi( jωs) is inductive in nature, zero-current switch-</span></span>
<span class="line"><span>ing occurs when Zi( jωs) is capacitive in nature, and the ZVS /ZCS boundary occurs where</span></span>
<span class="line"><span>Zi( jωs) has zero phase.</span></span>
<span class="line"><span>It is instructive to again consider the limiting cases of a short-circuited and open-circuited</span></span>
<span class="line"><span>load. The Bode plots of Zi0( jωs) and Zi∞( jωs) for an LCC inverter example are sketched in</span></span>
<span class="line"><span>Fig. 22.37. Since, in these limiting cases, the input impedance Zi is composed only of the reac-</span></span>
<span class="line"><span>tive tank elements, Zi0( jωs) and Zi∞( jωs) are purely imaginary quantities having phase of either</span></span>
<span class="line"><span>−90◦or+90◦.F o r fs &lt; f0, both Zi0( jωs) and Zi∞( jωs) are dominated by the tank capacitor</span></span>
<span class="line"><span>orcapacitors; the phase of Zi( jωs) is therefore−90◦. Hence, zero-current switching is obtained</span></span>
<span class="line"><span>under both short-circuit and open-circuit conditions. For fs &gt; f∞, both Zi0( jωs) and Zi∞( jωs)</span></span>
<span class="line"><span>are dominated by the tank inductor; hence the phase of Zi( jωs)i s+90◦. Zero-voltage switching</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>p</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>s</span></span>
<span class="line"><span>|| Zi0 ||</span></span>
<span class="line"><span>|| Zi ||</span></span>
<span class="line"><span>f0 f</span></span>
<span class="line"><span>ZVS</span></span>
<span class="line"><span>for all R</span></span>
<span class="line"><span>ZCS</span></span>
<span class="line"><span>for all R</span></span>
<span class="line"><span>ZCS: R &gt; Rcrit</span></span>
<span class="line"><span>ZVS: R &lt; Rcrit</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>Zi0</span></span>
<span class="line"><span>fm</span></span>
<span class="line"><span>Fig. 22.37 Use of the input impedance quantities Zi0 and Zi∞to determine the ZCS/ZVS boundaries,</span></span>
<span class="line"><span>LCC example</span></span>
<span class="line"><span></span></span>
<span class="line"><span>966 22 Resonant Conversion</span></span>
<span class="line"><span>is obtained for both a short-circuited and an open-circuited load. For f0 &lt; fs &lt; f∞, Zi0( jωs)</span></span>
<span class="line"><span>is dominated by the tank inductor while Zi∞( jωs) is dominated by the tank capacitors. This</span></span>
<span class="line"><span>implies that zero-voltage switching is obtained under short-circuit conditions, and zero-voltage</span></span>
<span class="line"><span>switching is obtained under open-circuit conditions. For this case, there must be some critical</span></span>
<span class="line"><span>value of load resistance R= Rcrit that represents the boundary between ZVS and ZCS, and that</span></span>
<span class="line"><span>causes the phase of Zi( jωs) to be equal to 0◦.</span></span>
<span class="line"><span>The behavior of Zi( jωs) for nonzero ﬁnite R is easily extrapolated from the limiting cases</span></span>
<span class="line"><span>discussed above. Theorem 22.2 below shows that:</span></span>
<span class="line"><span>1. If zero-current switching occurs for both an open-circuited load and a short-circuited load</span></span>
<span class="line"><span>[i.e., Zi0( jωs) and Zi∞( jωs) both have phase+90◦], then zero-current switching occurs for</span></span>
<span class="line"><span>all loads.</span></span>
<span class="line"><span>2. If zero-voltage switching occurs for both an open-circuited load and a short-circuited load</span></span>
<span class="line"><span>[i.e., Zi0( jωs) and Zi∞( jωs) both have phase−90◦], then zero-voltage switching occurs for</span></span>
<span class="line"><span>all loads.</span></span>
<span class="line"><span>3. If zero-voltage switching occurs for an open-circuited load and zero-current switching oc-</span></span>
<span class="line"><span>curs for a short-circuited load [i.e., Zi0( jωs) has phase−90◦and Zi∞( jωs) has phase+90◦],</span></span>
<span class="line"><span>then zero-voltage switching occurs for R &gt; Rcrit, and zero-current switching occurs for</span></span>
<span class="line"><span>R&lt; Rcrit, with Rcrit given by Eq. (22.54) below.</span></span>
<span class="line"><span>4. If zero-current switching occurs for an open-circuited load and zero-voltage switching oc-</span></span>
<span class="line"><span>curs for a short-circuited load [i.e., Zi0( jωs) has phase+90◦and Zi∞( jωs) has phase−90◦],</span></span>
<span class="line"><span>then zero-current switching occurs for R &gt; Rcrit, and zero-voltage switching occurs for</span></span>
<span class="line"><span>R&lt; Rcrit, with Rcrit given by Eq. (22.54) below.</span></span>
<span class="line"><span>For the LCC example, we can therefore conclude that, for fs &lt; f0, zero-current switching</span></span>
<span class="line"><span>occurs for all values of R.F o r fs &gt; f∞, zero-voltage switching occurs for all values of R.F o r</span></span>
<span class="line"><span>f0&lt; fs&lt; f∞, the boundary between ZVS and ZCS is given by Eq. (22.54).</span></span>
<span class="line"><span>Theorem 22.2. If the tank network is purely reactive, then the boundary between zero-current</span></span>
<span class="line"><span>switching and zero-voltage switching occurs when the load resistance R is equal to the critical</span></span>
<span class="line"><span>value Rcrit, given by</span></span>
<span class="line"><span>Rcrit =∥Zo0∥</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>−Zi∞</span></span>
<span class="line"><span>Zi0</span></span>
<span class="line"><span>(22.54)</span></span>
<span class="line"><span>This theorem relies on the assumption that zero-current switching occurs when the tank in-</span></span>
<span class="line"><span>put impedance is capacitive in nature, while zero-voltage switching occurs for inductive-input</span></span>
<span class="line"><span>impedances. The boundary therefore occurs where the phase of Zi( jω) is zero. This deﬁnition</span></span>
<span class="line"><span>gives a necessary but not suﬃcient condition for zero-voltage switching when signiﬁcant semi-</span></span>
<span class="line"><span>conductor output capacitance is present.</span></span>
<span class="line"><span>The result is derived by ﬁnding the value of R which causes the imaginary part of Zi( jω)i n</span></span>
<span class="line"><span>Eq. (22.47) to be zero. Since the tank network is assumed to ideal and lossless, the impedances</span></span>
<span class="line"><span>Zo∞, Zo0, and Zi∞must have zero real parts. Hence,</span></span>
<span class="line"><span>Im(Zi(Rcrit))= Im(Zi∞)Re</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎝</span></span>
<span class="line"><span>1+ Zo0</span></span>
<span class="line"><span>Rcrit</span></span>
<span class="line"><span>1+ Zo∞</span></span>
<span class="line"><span>Rcrit</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>= Im(Zi∞)</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝1−Zo0Zo∞</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>crit</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>⎛⎜⎜⎜⎜⎝1+∥Zo∞∥2</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>crit</span></span>
<span class="line"><span>⎞⎟⎟⎟⎟⎠</span></span>
<span class="line"><span>= 0 (22.55)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 967</span></span>
<span class="line"><span>where Im(Z) and Re( Z) denote the imaginary and real parts of the complex quantity Z.T h e</span></span>
<span class="line"><span>nontrivial solution to Eq. (22.55)i sg i v e nb y</span></span>
<span class="line"><span>1= Zo0Zo∞</span></span>
<span class="line"><span>R2</span></span>
<span class="line"><span>crit</span></span>
<span class="line"><span>(22.56)</span></span>
<span class="line"><span>hence,</span></span>
<span class="line"><span>Rcrit =</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>Zo0Zo∞ (22.57)</span></span>
<span class="line"><span>A useful equivalent form makes use of the reciprocity identities</span></span>
<span class="line"><span>Zo0</span></span>
<span class="line"><span>Zo∞</span></span>
<span class="line"><span>= Zi0</span></span>
<span class="line"><span>Zi∞</span></span>
<span class="line"><span>(22.58)</span></span>
<span class="line"><span>Use of Eq. (22.58) to eliminate Zo∞from Eq. (22.57) leads to</span></span>
<span class="line"><span>Rcrit =∥Zo0∥</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>−Zi∞</span></span>
<span class="line"><span>Zi0</span></span>
<span class="line"><span>(22.59)</span></span>
<span class="line"><span>This is the desired result. The quantity Zo0 is the inverter output impedance, and R=||Zo0||</span></span>
<span class="line"><span>corresponds to operation at matched load with maximum output power. The impedances Zi∞</span></span>
<span class="line"><span>and Zi0 are purely imaginary, and hence Eq. ( 22.59) has no real solution unless Zi∞and Zi0</span></span>
<span class="line"><span>are of opposite phase. As illustrated in Fig. 22.37, if at a given frequency Zi∞and Zi0 are both</span></span>
<span class="line"><span>inductive, then zero-voltage switching occurs for all loads. Zero-current switching occurs for</span></span>
<span class="line"><span>all loads when Zi∞and Zi0 are both capacitive. Therefore, Theorem 22.2 is proved.</span></span>
<span class="line"><span>Figure 22.38a illustrates the phase response of Zi( jω)a s R varies from 0 to∞, for the LCC</span></span>
<span class="line"><span>inverter. A typical dependence of Rcrit and the matched-load impedance ∥Zo0|| on frequency</span></span>
<span class="line"><span>is illustrated in Fig. 22.38b. Zero-voltage switching occurs for all loads when f &gt; f∞, and</span></span>
<span class="line"><span>zero-current switching occurs for all loads when f &lt; f0. Over the range f0 &lt; f &lt; f∞, Zi0 is</span></span>
<span class="line"><span>inductive while Zi∞is capacitive; hence, zero-voltage switching occurs forR&lt; Rcrit while zero-</span></span>
<span class="line"><span>current switching occurs for R&gt; Rcrit. At frequency fm, Rcrit =∥Zo0||, and hence the ZVS/ZCS</span></span>
<span class="line"><span>boundary is encountered exactly at matched load. It is commonly desired to obtain zero-voltage</span></span>
<span class="line"><span>switching at matched load, with low circulating currents and good eﬃciency at light load. It is</span></span>
<span class="line"><span>apparent that this requires operation in the range f0&lt; f&lt; fm. Zero-voltage switching will then</span></span>
<span class="line"><span>be obtained under matched-load and short-circuit conditions, but will be lost at light load. The</span></span>
<span class="line"><span>choice of element values such that ||Zi0∥≪|| Zi∞|| is advantageous in that the range of loads</span></span>
<span class="line"><span>leading to zero-voltage switching is maximized.</span></span>
<span class="line"><span>22.4.4 Another Example</span></span>
<span class="line"><span>As another example, let us consider selection of the resonant tank elements to obtain a given</span></span>
<span class="line"><span>output characteristic at a certain switching frequency, and let us evaluate the eﬀect of this choice</span></span>
<span class="line"><span>on Rcrit. It is desired to operate a resonant inverter at switching frequencyfs= 100 kHz, with an</span></span>
<span class="line"><span>input voltage of Vg= 160 V . The converter should be capable of producing an open-circuit peak</span></span>
<span class="line"><span>output voltage Voc= 400 V, and should also produce a nominal output of 150 Vrms at 25 W. It</span></span>
<span class="line"><span>is desired to select resonant tank elements that accomplish this.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>968 22 Resonant Conversion</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>-90</span></span>
<span class="line"><span>-60</span></span>
<span class="line"><span>-30</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>60</span></span>
<span class="line"><span>90</span></span>
<span class="line"><span>ff0</span></span>
<span class="line"><span>R = </span></span>
<span class="line"><span>R = 0</span></span>
<span class="line"><span>increasing R</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>Zi</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>Rcrit</span></span>
<span class="line"><span>||Zo0</span></span>
<span class="line"><span>||</span></span>
<span class="line"><span>f0 f∞fm</span></span>
<span class="line"><span>ZCS</span></span>
<span class="line"><span>ZVS</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>f</span></span>
<span class="line"><span>Fig. 22.38 ZCS/ZVS boundary, LCC inverter example: ( a) variation of tank network input impedance</span></span>
<span class="line"><span>phase shift with load resistance, (b) comparison of Rcrit with matched-load impedance∥Zo0∥</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 969</span></span>
<span class="line"><span>The speciﬁcations imply that the converter should exhibit an open-circuit transfer function</span></span>
<span class="line"><span>of</span></span>
<span class="line"><span>∥H∞( jωs)∥= Voc</span></span>
<span class="line"><span>Vs1</span></span>
<span class="line"><span>= (400 V)⎦4</span></span>
<span class="line"><span>π160 V</span></span>
<span class="line"><span>)= 1.96 (22.60)</span></span>
<span class="line"><span>The required short-circuit current is found by solving Eq. (22.42)f o rIsc:</span></span>
<span class="line"><span>Isc= I√</span></span>
<span class="line"><span>1−</span></span>
<span class="line"><span>⎦V</span></span>
<span class="line"><span>Voc</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>(22.61)</span></span>
<span class="line"><span>The speciﬁcations also imply that the peak voltage and current at the nominal operating point</span></span>
<span class="line"><span>are</span></span>
<span class="line"><span>V= 150</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2= 212V</span></span>
<span class="line"><span>I= P</span></span>
<span class="line"><span>Vrms</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2= 25W</span></span>
<span class="line"><span>150V</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2= 0.236A (22.62)</span></span>
<span class="line"><span>Rnom= V</span></span>
<span class="line"><span>I = 900Ω</span></span>
<span class="line"><span>Substitution of Eq. (22.62) into Eq. (22.61) yields</span></span>
<span class="line"><span>Isc= (0.236A)√</span></span>
<span class="line"><span>1−</span></span>
<span class="line"><span>⎦212V</span></span>
<span class="line"><span>400V</span></span>
<span class="line"><span>)2</span></span>
<span class="line"><span>= 0.278A (22.63)</span></span>
<span class="line"><span>Matched load therefore occurs at the operating point</span></span>
<span class="line"><span>Vmat= Voc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>= 283V</span></span>
<span class="line"><span>Imat= Isc</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>= 0.196A (22.64)</span></span>
<span class="line"><span>∥Zo0( jωs)∥= Voc</span></span>
<span class="line"><span>Isc</span></span>
<span class="line"><span>= 1439Ω</span></span>
<span class="line"><span>Let us select the values of the tank elements in the LCC tank network illustrated in</span></span>
<span class="line"><span>Fig. 22.39a. The impedances of the series and parallel branches can be represented using the</span></span>
<span class="line"><span>reactances Xs and Xp illustrated in Fig. 22.39b, with</span></span>
<span class="line"><span>jXs= jωsL+ 1</span></span>
<span class="line"><span>jωsCs</span></span>
<span class="line"><span>= j</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>ωsL−1</span></span>
<span class="line"><span>ωsCs</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>jXp= 1</span></span>
<span class="line"><span>jωsCp</span></span>
<span class="line"><span>= j</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>−1</span></span>
<span class="line"><span>ωsCp</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(22.65)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>970 22 Resonant Conversion</span></span>
<span class="line"><span>(a) LC s</span></span>
<span class="line"><span>Cp</span></span>
<span class="line"><span>(b) jXs</span></span>
<span class="line"><span>jXp</span></span>
<span class="line"><span>Fig. 22.39 Tank network of the LCC inverter example: ( a) schematic, ( b) representation of series and</span></span>
<span class="line"><span>parallel branches by reactances Xs and Xp</span></span>
<span class="line"><span>The transfer function H∞( jωs) is given by the voltage divider formula</span></span>
<span class="line"><span>H∞( jωs)= jXp</span></span>
<span class="line"><span>jXs+ jXp</span></span>
<span class="line"><span>(22.66)</span></span>
<span class="line"><span>The output impedance Zo0( jωs) is given by the parallel combination</span></span>
<span class="line"><span>Zo0( jωs)= jXs∥ jXp= −XsXp</span></span>
<span class="line"><span>j(Xs+ Xp) (22.67)</span></span>
<span class="line"><span>Solution of Eqs. (22.66) and (22.67)f o rXp and Xs leads to</span></span>
<span class="line"><span>jXp= Zo0( jωs)</span></span>
<span class="line"><span>1−H∞( jωs) (22.68)</span></span>
<span class="line"><span>Xs= Xp</span></span>
<span class="line"><span>1−H∞( jωs)</span></span>
<span class="line"><span>H∞( jωs)</span></span>
<span class="line"><span>Hence, the capacitance Cp should be chosen equal to</span></span>
<span class="line"><span>Xp =−1499Ω</span></span>
<span class="line"><span>Cp=−1</span></span>
<span class="line"><span>ωsXp</span></span>
<span class="line"><span>= H∞( jωs)−1</span></span>
<span class="line"><span>ωs||Zo0( jωs)∥= (1.96)−1</span></span>
<span class="line"><span>(2π100kHz)( 1439Ω)/simequal1nF (22.69)</span></span>
<span class="line"><span>and the reactance of the series branch should be chosen according to</span></span>
<span class="line"><span>Xs= Xp</span></span>
<span class="line"><span>1−H∞( jωs)</span></span>
<span class="line"><span>H∞( jωs) = (−1493Ω) 1−(1.96)</span></span>
<span class="line"><span>(1.96) = 733Ω (22.70)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>22.4 Load-Dependent Properties of Resonant Converters 971</span></span>
<span class="line"><span>Since Xs is comprised of the series combination of the inductor L and capacitor Cs, there is a</span></span>
<span class="line"><span>degree of freedom in choosing the values of L and capacitor Cs to realize Xs. For example, we</span></span>
<span class="line"><span>could choose Cs very large (tending to a short circuit); this eﬀectively would result in a parallel</span></span>
<span class="line"><span>resonant converter with L= Xs/ωs= 1.17mH. For nonzero Cs, L must be chosen according to</span></span>
<span class="line"><span>L= 1</span></span>
<span class="line"><span>ωs</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Xs+ 1</span></span>
<span class="line"><span>ωsCs</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>(22.71)</span></span>
<span class="line"><span>For example, the choice Cs = Cp = 1.06 nF leads to L= 3.5 mH. Designs using diﬀerent Cs</span></span>
<span class="line"><span>will exhibit exactly the same characteristics at the design frequency; however, the behavior at</span></span>
<span class="line"><span>other switching frequencies will diﬀer.</span></span>
<span class="line"><span>For the tank network illustrated in Fig.22.39,t h ev a l u eo fRcrit is completely determined by</span></span>
<span class="line"><span>the parameters of the output characteristic ellipse; i.e., by the speciﬁcation of Vg, Voc, and Isc.</span></span>
<span class="line"><span>Note that Zo∞, the tank output impedance with the tank input port open-circuited, is equal tojXp.</span></span>
<span class="line"><span>Substitution of expressions for Zo∞and Zo0 into Eq. (22.57) leads to the following expression</span></span>
<span class="line"><span>for Rcrit:</span></span>
<span class="line"><span>Rcrit =</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>o0( jωs)</span></span>
<span class="line"><span>1−H∞( jωs) (22.72)</span></span>
<span class="line"><span>Since Zo0 and H∞are determined by the operating point speciﬁcations, then Rcrit is also. Eval-</span></span>
<span class="line"><span>uation of Eq. ( 22.72) for this example leads to Rcrit = 1466Ω. Therefore, the inverter will</span></span>
<span class="line"><span>operate with zero-voltage switching for R&lt; 1466Ω, including at the nominal operating point</span></span>
<span class="line"><span>R = 900Ω. Other topologies of tank network, more complex than the circuit illustrated in</span></span>
<span class="line"><span>Fig. 22.39b, may have additional degrees of freedom that allow Rcrit to be independently cho-</span></span>
<span class="line"><span>sen.</span></span>
<span class="line"><span>The choice Cs = 3Cp = 3.2 nF leads to L = 1.96 μH. The following frequencies are</span></span>
<span class="line"><span>obtained:</span></span>
<span class="line"><span>f∞= 127kHz</span></span>
<span class="line"><span>fm = 100.6kHz</span></span>
<span class="line"><span>fs= 100.0kHz</span></span>
<span class="line"><span>f0 = 64kHz (22.73)</span></span>
<span class="line"><span>Regardless of how Cs is chosen, the open-circuit tank input impedance is</span></span>
<span class="line"><span>Zi∞= j</span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Xs+ Xp</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= j (733Ω+(−1493Ω))=−j760Ω (22.74)</span></span>
<span class="line"><span>Therefore, when the load is open-circuited, the transistor peak current has magnitude</span></span>
<span class="line"><span>Is1= Vs1</span></span>
<span class="line"><span>∥Zi∞∥=</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>π(160V)</span></span>
<span class="line"><span>760Ω= 0.268A (22.75)</span></span>
<span class="line"><span>When the load is short-circuited, the transistor peak current has magnitude</span></span>
<span class="line"><span>Is1= Vs1</span></span>
<span class="line"><span>∥Zi0∥= Vs1</span></span>
<span class="line"><span>|Xs|=</span></span>
<span class="line"><span>4</span></span>
<span class="line"><span>π(160V)</span></span>
<span class="line"><span>(733Ω) = 0.278A (22.76)</span></span>
<span class="line"><span>which is nearly the same as the result in Eq. ( 22.75). The somewhat large open-circuit switch</span></span>
<span class="line"><span>current occurs because of the relatively high speciﬁed open-circuit output voltage; lower values</span></span>
<span class="line"><span>of Voc would reduce the result in Eq. (22.75).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>972 22 Resonant Conversion</span></span>
<span class="line"><span>22.4.5 LLC Example</span></span>
<span class="line"><span>A transformer-isolated dc–dc converter based on theLLC tank network is illustrated in Fig.22.40.</span></span>
<span class="line"><span>This converter ﬁnds application in oﬀ-line dc power supplies, including charger adapters for</span></span>
<span class="line"><span>laptop computers. Tank capacitorC also functions as a dc blocking capacitor that ensures trans-</span></span>
<span class="line"><span>former volt-second balance. Tank inductors Ls and Lp can partly or wholly be implemented</span></span>
<span class="line"><span>using the transformer leakage and magnetizing inductances. When the converter is properly</span></span>
<span class="line"><span>designed, the transistors can operate with zero-voltage switching.</span></span>
<span class="line"><span>Fig. 22.40 A transformer-isolated dc–dc converter based on the LLC resonant tank circuit</span></span>
<span class="line"><span>The tank input impedances Zi0 (with load shorted) and Zi∞(with load open-circuited) are</span></span>
<span class="line"><span>illustrated in Fig. 22.41. Under short-circuit conditions, the tank resonant frequency is</span></span>
<span class="line"><span>f0= 1</span></span>
<span class="line"><span>2π√LsC</span></span>
<span class="line"><span>(22.77)</span></span>
<span class="line"><span>Under open-circuit conditions, the tank resonant frequency is</span></span>
<span class="line"><span>f∞= 1</span></span>
<span class="line"><span>2π√(Ls+ Lp)C</span></span>
<span class="line"><span>(22.78)</span></span>
<span class="line"><span>In each case, the tank input impedance Zi is a series resonant circuit, with the short-circuit reso-</span></span>
<span class="line"><span>nant frequency being higher than the open-circuit resonant frequency. The tank input impedance</span></span>
<span class="line"><span>∥ Zi∥ is constructed in Fig. 22.42.</span></span>
<span class="line"><span>At low switching frequency fs &lt; f∞, the transistors operate with zero-current switching</span></span>
<span class="line"><span>for all loads. At high switching frequency fs &gt; f0, the transistors operate with zero-voltage</span></span>
<span class="line"><span>switching for all loads. Over the intermediate frequency range f∞&lt; fs &lt; f0, the transistors</span></span>
<span class="line"><span>operate with zero-voltage switching at light load R&gt; Rcrit, and with zero-current switching at</span></span>
<span class="line"><span>heavy load R&lt; Rcrit. The critical resistance Rcrit can be shown to be</span></span>
<span class="line"><span>Rcrit = Ro0</span></span>
<span class="line"><span>nF√</span></span>
<span class="line"><span>1+ n</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>1−F2</span></span>
<span class="line"><span>1+ n</span></span>
<span class="line"><span>F2−1 (22.79)</span></span></code></pre></div>`,10)])])}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
