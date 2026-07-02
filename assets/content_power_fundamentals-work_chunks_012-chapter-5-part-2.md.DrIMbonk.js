import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.B5tqjWbr.js";const h=JSON.parse('{"title":"第5章part 2 - 5 The Discontinuous Conduction Mode","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第5章part 2 - 5 The Discontinuous Conduction Mode","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 169-176 > Chunk ID: `chapter-5-part-2`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/012-chapter-5-part-2.md","filePath":"content/power/fundamentals-work/chunks/012-chapter-5-part-2.md","lastUpdated":null}'),i={name:"content/power/fundamentals-work/chunks/012-chapter-5-part-2.md"};function t(l,n,o,c,r,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="第5章part-2-5-the-discontinuous-conduction-mode" tabindex="-1">第5章part 2 - 5 The Discontinuous Conduction Mode <a class="header-anchor" href="#第5章part-2-5-the-discontinuous-conduction-mode" aria-label="Permalink to &quot;第5章part 2 - 5 The Discontinuous Conduction Mode&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 169-176<br> Chunk ID: <code>chapter-5-part-2</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>5.4 Summary of Results and Key Points 155</span></span>
<span class="line"><span>5.4 An unregulated dc input voltage Vg varies over the range 35 V ≤Vg ≤70 V. A buck</span></span>
<span class="line"><span>converter reduces this voltage to 28 V; a feedback loop varies the duty cycle as necessary</span></span>
<span class="line"><span>such that the converter output voltage is always equal to 28 V . The load power varies over</span></span>
<span class="line"><span>the range 10 W≤Pload≤1000 W. The element values are</span></span>
<span class="line"><span>L= 22 μH C= 470 μF fs= 75 kHz</span></span>
<span class="line"><span>Losses may be ignored.</span></span>
<span class="line"><span>(a) Over what range of Vg and load current does the converter operate in CCM?</span></span>
<span class="line"><span>(b) Determine the maximum and minimum values of the steady-state transistor duty cy-</span></span>
<span class="line"><span>cle.</span></span>
<span class="line"><span>5.5 The transistors in the converter of Fig. 5.22 are driven by the same gate drive signal, so</span></span>
<span class="line"><span>that they turn on and oﬀin synchronism with duty cycle D.</span></span>
<span class="line"><span>Fig. 5.22 Watkins–Johnson</span></span>
<span class="line"><span>converter of Problem 5.5 + CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VVg</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>Q2</span></span>
<span class="line"><span>(a) Determine the conditions under which this converter operates in the discontinuous</span></span>
<span class="line"><span>conduction mode, as a function of the steady-state duty ratioD and the dimensionless</span></span>
<span class="line"><span>parameter K= 2L/RTs.</span></span>
<span class="line"><span>(b) What happens to your answer to Part (a) for D&lt; 0.5?</span></span>
<span class="line"><span>(c) Derive an expression for the dc conversion ratio M(D, K). Sketch M vs. D for K= 10</span></span>
<span class="line"><span>and for K= 0.1, over the range 0≤D≤1.</span></span>
<span class="line"><span>5.6 In the buck converter illustrated in Fig. 5.23, the diode has forward voltage drop VF .Y o u</span></span>
<span class="line"><span>may model this voltage as being independent of current. All other elements should be mod-</span></span>
<span class="line"><span>eled as ideal. In this problem, you will show how this diode drop changes the equations of</span></span>
<span class="line"><span>the discontinuous conduction mode.</span></span>
<span class="line"><span>Fig. 5.23 Buck converter of</span></span>
<span class="line"><span>Problem 5.6 +</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>CR</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VD1Vg</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>iD(t)</span></span>
<span class="line"><span>(a) Derive the conditions under which the converter operates in the discontinuous con-</span></span>
<span class="line"><span>duction mode. Express your result in terms of the quantities K= 2L/RTs and Kcrit.</span></span>
<span class="line"><span>Note that Kcrit may now depend not only on D, but also on other element values.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>156 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>(b) Derive closed-form analytical expressions for the conversion ratio M= V/Vg for both</span></span>
<span class="line"><span>continuous and discontinuous conduction modes.</span></span>
<span class="line"><span>(c) The element values are</span></span>
<span class="line"><span>VD= 0.5V fs= 250 kHz</span></span>
<span class="line"><span>Vg= 5V R= 4Ω</span></span>
<span class="line"><span>L1= 2.2 μH</span></span>
<span class="line"><span>C is large. Plot the conversion ratio M= V/Vg for the entire range 0≤D≤1.</span></span>
<span class="line"><span>(d) What happens near D= 0? Does the converter operate in CCM or DCM? Compare</span></span>
<span class="line"><span>with your result from part (a).</span></span>
<span class="line"><span>5.7 DCM mode boundary analysis of the ´Cuk converter of Fig. 5.24. The capacitor voltage</span></span>
<span class="line"><span>ripples are small.</span></span>
<span class="line"><span>+ D1</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VQ1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i1 i2</span></span>
<span class="line"><span>iD</span></span>
<span class="line"><span>+ vC1</span></span>
<span class="line"><span>Fig. 5.24 ´Cuk converter, Problems 5.7, 5.8, 5.14,a n d5.15</span></span>
<span class="line"><span>(a) Sketch the diode current waveform for CCM operation. Find its peak value, in terms</span></span>
<span class="line"><span>of the ripple magnitudes ΔiL1, ΔiL2, and the dc components I1 and I2,o ft h et w o</span></span>
<span class="line"><span>inductor currents iL1(t) and iL2(t), respectively.</span></span>
<span class="line"><span>(b) Derive an expression for the conditions under which the ´Cuk converter operates in the</span></span>
<span class="line"><span>discontinuous conduction mode. Express your result in the form K&lt; Kcrit(D), and</span></span>
<span class="line"><span>give formulas for K and Kcrit(D).</span></span>
<span class="line"><span>5.8 DCM conversion ratio analysis of the ´Cuk converter of Fig.5.24.</span></span>
<span class="line"><span>(a) Suppose that the converter operates at the boundary between CCM and DCM, with</span></span>
<span class="line"><span>the following element and parameter values:</span></span>
<span class="line"><span>D= 0.4 fs= 100 kHz</span></span>
<span class="line"><span>Vg= 120V R= 10Ω</span></span>
<span class="line"><span>L1= 54 μH L2= 27 μH</span></span>
<span class="line"><span>C1= 47 μF C2= 100 μF</span></span>
<span class="line"><span>Sketch the diode current waveformiD(t), and the inductor current waveformsi1(t) and</span></span>
<span class="line"><span>i2(t). Label the magnitudes of the ripples and dc components of these waveforms.</span></span>
<span class="line"><span>(b) Suppose next that the converter operates in the discontinuous conduction mode, with</span></span>
<span class="line"><span>ad iﬀerent choice of parameter and element values. Derive an analytical expression</span></span>
<span class="line"><span>for the dc conversion ratio M(D, K).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.4 Summary of Results and Key Points 157</span></span>
<span class="line"><span>(c) Sketch the diode current waveform iD(t), and the inductor current waveformsi1(t) and</span></span>
<span class="line"><span>i2(t), for operation in the discontinuous conduction mode.</span></span>
<span class="line"><span>5.9 DCM mode boundary analysis of the modiﬁed SEPIC of Fig.5.25 The converter illustrated</span></span>
<span class="line"><span>in Fig. 5.25 is similar to the SEPIC, except that an additional diode is placed in series</span></span>
<span class="line"><span>with the input inductor L1. The objective of this problem is to analyze the discontinuous</span></span>
<span class="line"><span>conduction mode associated with large ripple in the inductor current i1(t).</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>C2</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v</span></span>
<span class="line"><span>Q1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>RVg</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>Fig. 5.25 Modiﬁed SEPIC for Problem 5.9</span></span>
<span class="line"><span>i1(t)</span></span>
<span class="line"><span>t0 DTs Ts</span></span>
<span class="line"><span>Conducting</span></span>
<span class="line"><span>devices: Q1, D1</span></span>
<span class="line"><span>D1Ts D2Ts D3Ts</span></span>
<span class="line"><span>D1, D2 D2</span></span>
<span class="line"><span>Fig. 5.26 Inductor current waveform i1(t)</span></span>
<span class="line"><span>For this problem, you may assume that the switching ripples in the current of inductor L2,</span></span>
<span class="line"><span>the voltage of capacitor C1, and the voltage of capacitor C2, are negligible. Figure 5.26</span></span>
<span class="line"><span>depicts the inductor current waveformi1(t) and the sequence of conducting devices for the</span></span>
<span class="line"><span>discontinuous conduction mode that is the subject of this problem. Neglect all losses.</span></span>
<span class="line"><span>(a) Derive an expression for the boundary between the discontinuous conduction mode</span></span>
<span class="line"><span>illustrated in Fig. 5.26 and the continuous conduction mode. Express your result in</span></span>
<span class="line"><span>terms of the parameters K and Kcrit(D), in the usual manner, and give expressions for</span></span>
<span class="line"><span>K and Kcrit.</span></span>
<span class="line"><span>(b) Derive the system of equations that relate the dc components of the important wave-</span></span>
<span class="line"><span>forms of the circuit in the discontinuous conduction mode of Fig. 5.26. Solve to ﬁnd</span></span>
<span class="line"><span>the conversion ratio:</span></span>
<span class="line"><span>M(D, K)= V</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>Your result should be a function of D and K only, with other intermediate variables</span></span>
<span class="line"><span>eliminated.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>158 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>5.10 DCM mode boundary analysis of the SEPIC of Fig. 5.27</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>D1L1</span></span>
<span class="line"><span>C2 R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>VQ1</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>i1</span></span>
<span class="line"><span>i2</span></span>
<span class="line"><span>iD</span></span>
<span class="line"><span>L2</span></span>
<span class="line"><span>Fig. 5.27 SEPIC, Problems 5.10 and 5.11</span></span>
<span class="line"><span>(a) Sketch the diode current waveform for CCM operation. Find its peak value, in terms</span></span>
<span class="line"><span>of the ripple magnitudes ΔiL1, ΔiL2, and the dc components I1 and I2,o ft h et w o</span></span>
<span class="line"><span>inductor currents iL1(t) and iL2(t), respectively.</span></span>
<span class="line"><span>(b) Derive an expression for the conditions under which the SEPIC operates in the dis-</span></span>
<span class="line"><span>continuous conduction mode. Express your result in the form K&lt; Kcrit(D), and give</span></span>
<span class="line"><span>formulas for K and Kcrit(D).</span></span>
<span class="line"><span>5.11 DCM conversion ratio analysis of the SEPIC of Fig.5.27.</span></span>
<span class="line"><span>(a) Suppose that the converter operates at the boundary between CCM and DCM, with</span></span>
<span class="line"><span>the following element and parameter values:</span></span>
<span class="line"><span>D= 0.225 fs= 100 kHz</span></span>
<span class="line"><span>Vg= 120V R= 10Ω</span></span>
<span class="line"><span>L1= 50 μH L2= 75 μH</span></span>
<span class="line"><span>C1= 47 μF C2= 200μF</span></span>
<span class="line"><span>Sketch the diode current waveformiD(t), and the inductor current waveformsi1(t) and</span></span>
<span class="line"><span>i2(t). Label the magnitudes of the ripples and dc components of these waveforms.</span></span>
<span class="line"><span>(b) Suppose next that the converter operates in the discontinuous conduction mode, with</span></span>
<span class="line"><span>ad iﬀerent choice of parameter and element values. Derive an analytical expression</span></span>
<span class="line"><span>for the dc conversion ratio M(D, K).</span></span>
<span class="line"><span>(c) Sketch the diode current waveform iD(t), and the inductor current waveformsi1(t) and</span></span>
<span class="line"><span>i2(t), for operation in the discontinuous conduction mode.</span></span>
<span class="line"><span>5.12 An L−C input ﬁlter is added to a buck converter as illustrated in Fig. 5.28. Inductors L1</span></span>
<span class="line"><span>and L2 and capacitor C2 are large in value, such that their switching ripples are small. All</span></span>
<span class="line"><span>losses can be neglected.</span></span>
<span class="line"><span>(a) Sketch the capacitor C1 voltage waveform v1(t), and derive expressions for its dc</span></span>
<span class="line"><span>component V1 and peak ripple magnitudeΔv1.</span></span>
<span class="line"><span>(b) The load current is increased ( R is decreased in value) such that Δv1 is greater than</span></span>
<span class="line"><span>V1.</span></span>
<span class="line"><span>(i) Sketch the capacitor voltage waveform v1(t).</span></span>
<span class="line"><span>(ii) For each subinterval, determine which semiconductor devices conduct.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.4 Summary of Results and Key Points 159</span></span>
<span class="line"><span>C1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v1</span></span>
<span class="line"><span>L2Q1</span></span>
<span class="line"><span>D1</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L1</span></span>
<span class="line"><span>Vg R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2C2</span></span>
<span class="line"><span>i1 i2</span></span>
<span class="line"><span>Fig. 5.28 Buck converter with input ﬁlter, Problems 5.12 and 5.13</span></span>
<span class="line"><span>(iii) Determine the conditions under which the discontinuous conduction mode oc-</span></span>
<span class="line"><span>curs. Express your result in the form K&lt; Kcrit(D), and give formulas for K and</span></span>
<span class="line"><span>Kcrit(D).</span></span>
<span class="line"><span>5.13 Derive an expression for the conversion ratio M(D, K) of the DCM converter described</span></span>
<span class="line"><span>in the previous problem. Note: D is the transistor duty cycle.</span></span>
<span class="line"><span>5.14 In the Cuk converter of Fig. 5.24, inductors L1 and L2 and capacitor C2 are large in value,</span></span>
<span class="line"><span>such that their switching ripples are small. All losses can be neglected.</span></span>
<span class="line"><span>(a) Assuming that the converter operates in CCM, sketch the capacitor C1 voltage wave-</span></span>
<span class="line"><span>form vC1(t), and derive expressions for its dc componentV1 and peak ripple magnitude</span></span>
<span class="line"><span>ΔvC1.</span></span>
<span class="line"><span>(b) The load current is increased ( R is decreased in value) such thatΔvC1 is greater than</span></span>
<span class="line"><span>V1.</span></span>
<span class="line"><span>(i) Sketch the capacitor voltage waveform vC1(t).</span></span>
<span class="line"><span>(ii) For each subinterval, determine which semiconductor devices conduct.</span></span>
<span class="line"><span>(iii) Determine the conditions under which the discontinuous conduction mode oc-</span></span>
<span class="line"><span>curs. Express your result in the form K&lt; Kcrit(D), and give formulas for K and</span></span>
<span class="line"><span>Kcrit(D).</span></span>
<span class="line"><span>5.15 Derive an expression for the conversion ratio M(D, K)o ft h eD C M ´Cuk converter de-</span></span>
<span class="line"><span>scribed in the previous problem. Note: D is the transistor duty cycle.</span></span>
<span class="line"><span>5.16 A DCM buck–boost converter as in Fig.5.21 is to be designed to operate under the follow-</span></span>
<span class="line"><span>ing conditions:</span></span>
<span class="line"><span>136 V≤Vg≤204 V</span></span>
<span class="line"><span>5W ≤Pload≤100 W</span></span>
<span class="line"><span>V=−150 V</span></span>
<span class="line"><span>fs= 100 kHz</span></span>
<span class="line"><span>You may assume that a feedback loop will vary to transistor duty cycle as necessary to</span></span>
<span class="line"><span>maintain a constant output voltage of−150 V .</span></span>
<span class="line"><span>Design the converter, subject to the following considerations:</span></span>
<span class="line"><span>•The converter should operate in the discontinuous conduction mode at all times</span></span>
<span class="line"><span>•Given the above requirements, choose the element values to minimize the peak inductor</span></span>
<span class="line"><span>current</span></span>
<span class="line"><span>•The output voltage peak ripple should be less than 1V .</span></span>
<span class="line"><span>Specify:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>160 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a) The inductor value L</span></span>
<span class="line"><span>(b) The output capacitor value C</span></span>
<span class="line"><span>(c) The worst-case peak inductor current ipk</span></span>
<span class="line"><span>(d) The maximum and minimum values of the transistor duty cycle D</span></span>
<span class="line"><span>5.17 A DCM boost converter as in Fig. 5.12 is to be designed to operate under the following</span></span>
<span class="line"><span>conditions:</span></span>
<span class="line"><span>18 V≤Vg≤36 V</span></span>
<span class="line"><span>5W ≤Pload≤100 W</span></span>
<span class="line"><span>V= 48 V</span></span>
<span class="line"><span>fs= 150 kHz</span></span>
<span class="line"><span>You may assume that a feedback loop will vary to transistor duty cycle as necessary to</span></span>
<span class="line"><span>maintain a constant output voltage of 48 V .</span></span>
<span class="line"><span>Design the converter, subject to the following considerations:</span></span>
<span class="line"><span>•The converter should operate in the discontinuous conduction mode at all times. To</span></span>
<span class="line"><span>ensure an adequate design margin, the inductance L should be chosen such that K is no</span></span>
<span class="line"><span>greater than 75% of Kcrit at all operating points.</span></span>
<span class="line"><span>•Given the above requirements, choose the element values to minimize the peak inductor</span></span>
<span class="line"><span>current.</span></span>
<span class="line"><span>•The output voltage peak ripple should be less than 1V .</span></span>
<span class="line"><span>Specify:</span></span>
<span class="line"><span>(a) The inductor value L</span></span>
<span class="line"><span>(b) The output capacitor value C</span></span>
<span class="line"><span>(c) The worst-case peak inductor current ipk</span></span>
<span class="line"><span>(d) The maximum and minimum values of the transistor duty cycle D.</span></span>
<span class="line"><span>(e) The values of D, K, and Kcrit at the following operating points: ( i) Vg = 18 V and</span></span>
<span class="line"><span>Pload = 5W ;( ii) Vg= 36 V and Pload = 5W ;( iii) Vg= 18 V and Pload = 100 W; (iv)</span></span>
<span class="line"><span>Vg= 36 V and Pload=100 W.</span></span>
<span class="line"><span>5.18 In dc–dc converters used in battery-powered portable equipment, it is sometimes required</span></span>
<span class="line"><span>that the converter continue to regulate its load voltage with high eﬃciency while the load</span></span>
<span class="line"><span>is in a low-power “sleep” mode. The power required by the transistor gate drive circuitry,</span></span>
<span class="line"><span>as well as much of the switching loss, is dependent on the switching frequency but not on</span></span>
<span class="line"><span>the load current. So to obtain high eﬃciency at very low load powers, a variable-frequency</span></span>
<span class="line"><span>control scheme is used, in which the switching frequency is reduced in proportion to the</span></span>
<span class="line"><span>load current.</span></span>
<span class="line"><span>Consider the boost converter system of Fig.5.29a. The battery pack consists of two nickel-</span></span>
<span class="line"><span>cadmium cells, which produce a voltage of V</span></span>
<span class="line"><span>g = 2.4V± 0.4 V . The converter boosts</span></span>
<span class="line"><span>this voltage to a regulated 5 V . As illustrated in Fig. 5.29b, the converter operates in the</span></span>
<span class="line"><span>discontinuous conduction mode, with constant transistor on-time ton. The transistor oﬀ-</span></span>
<span class="line"><span>time tof f is varied by the controller to regulate the output voltage.</span></span>
<span class="line"><span>(a) Write the equations for the CCM-DCM boundary and conversion ratio M= V/Vg,i n</span></span>
<span class="line"><span>terms of ton, tof f, L, and the eﬀective load resistance R.</span></span>
<span class="line"><span>For parts (b) and (c), the load current can vary between 100μA and 1 A. The transistor</span></span>
<span class="line"><span>on-time is ﬁxed: ton= 10 μs.</span></span>
<span class="line"><span>(b) Select values for L and C such that:</span></span>
<span class="line"><span>•The output voltage peak ripple is no greater than 50 mV ,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.4 Summary of Results and Key Points 161</span></span>
<span class="line"><span>Fig. 5.29 Boost con-</span></span>
<span class="line"><span>verter employed in</span></span>
<span class="line"><span>portable battery-powered</span></span>
<span class="line"><span>equipment with sleep</span></span>
<span class="line"><span>mode, Problem 5.18:</span></span>
<span class="line"><span>(a) converter circuit,</span></span>
<span class="line"><span>(b) inductor current</span></span>
<span class="line"><span>waveform</span></span>
<span class="line"><span>(a) L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v(t)Vg</span></span>
<span class="line"><span>i(t)</span></span>
<span class="line"><span>Battery pack Effective load</span></span>
<span class="line"><span>Iload</span></span>
<span class="line"><span>(b) i(t)</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>ipk</span></span>
<span class="line"><span>ton toff</span></span>
<span class="line"><span>•The converter always operates in DCM, and</span></span>
<span class="line"><span>•The peak inductor current is as small as possible.</span></span>
<span class="line"><span>(c) For your design of part (b), what are the maximum and minimum values of the switch-</span></span>
<span class="line"><span>ing frequency?</span></span>
<span class="line"><span>5.19 An unregulated dc input voltage Vg varies over the range 35V ≤Vg ≤70V. A buck</span></span>
<span class="line"><span>converter reduces this voltage to 28 V; a feedback loop varies the duty cycle as necessary</span></span>
<span class="line"><span>such that the converter output voltage is always equal to 28 V . The load power varies over</span></span>
<span class="line"><span>the range 10W≤P</span></span>
<span class="line"><span>load≤1000W. The buck converter elements areL= 22μH, C= 470μF,</span></span>
<span class="line"><span>fs= 75kHz. Losses may be ignored.</span></span>
<span class="line"><span>Pload</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>1000 W</span></span>
<span class="line"><span>10 W</span></span>
<span class="line"><span>75 V35 V</span></span>
<span class="line"><span>Fig. 5.30 Vg vs. Pload axes, Problem 5.19</span></span>
<span class="line"><span></span></span>
<span class="line"><span>162 5 The Discontinuous Conduction Mode</span></span>
<span class="line"><span>(a) Over what range of Vg and Pload does the converter operate in continuous conduction</span></span>
<span class="line"><span>mode? Sketch the mode boundary on the axes of Fig. 5.30, and identify the region</span></span>
<span class="line"><span>over which the converter operates in CCM.</span></span>
<span class="line"><span>(b) Determine the maximum and minimum values of the steady-state transistor duty cy-</span></span>
<span class="line"><span>cle.</span></span></code></pre></div>`,10)])])}const m=s(i,[["render",t]]);export{h as __pageData,m as default};
