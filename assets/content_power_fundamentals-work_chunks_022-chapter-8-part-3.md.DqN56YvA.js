import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.B5tqjWbr.js";const h=JSON.parse('{"title":"第8章part 3 - 8 Converter Transfer Functions","description":"","frontmatter":{"date":"2026-06-24T00:00:00.000Z","category":"电源控制","source":"power","visibility":"public","title":"第8章part 3 - 8 Converter Transfer Functions","tags":["power-electronics"],"status":"learning","summary":"> Source: `Fundamentals of Power Electronics 3rd Edition.pdf` > Pages: 328-347 > Chunk ID: `chapter-8-part-3`"},"headers":[],"relativePath":"content/power/fundamentals-work/chunks/022-chapter-8-part-3.md","filePath":"content/power/fundamentals-work/chunks/022-chapter-8-part-3.md","lastUpdated":null}'),l={name:"content/power/fundamentals-work/chunks/022-chapter-8-part-3.md"};function i(t,n,c,o,r,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h1 id="第8章part-3-8-converter-transfer-functions" tabindex="-1">第8章part 3 - 8 Converter Transfer Functions <a class="header-anchor" href="#第8章part-3-8-converter-transfer-functions" aria-label="Permalink to &quot;第8章part 3 - 8 Converter Transfer Functions&quot;">​</a></h1><blockquote><p>Source: <code>Fundamentals of Power Electronics 3rd Edition.pdf</code><br> Pages: 328-347<br> Chunk ID: <code>chapter-8-part-3</code></p></blockquote><h2 id="主干提取" tabindex="-1">主干提取 <a class="header-anchor" href="#主干提取" aria-label="Permalink to &quot;主干提取&quot;">​</a></h2><ul><li>TODO: 提取本节核心论点、公式关系、控制框图含义、器件/拓扑约束和实验结论。</li></ul><h2 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>English term</th><th>中文译名</th><th>Notes</th></tr></thead><tbody><tr><td>TODO</td><td>TODO</td><td>TODO</td></tr></tbody></table><h2 id="中文翻译" tabindex="-1">中文翻译 <a class="header-anchor" href="#中文翻译" aria-label="Permalink to &quot;中文翻译&quot;">​</a></h2><p>TODO: 在这里写专业、通顺、前后一致的中文译文。</p><h2 id="英文原文" tabindex="-1">英文原文 <a class="header-anchor" href="#英文原文" aria-label="Permalink to &quot;英文原文&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions 317</span></span>
<span class="line"><span>Fig. 8.39 Waveforms of the con-</span></span>
<span class="line"><span>verters of Fig. 8.38,f o ras t e pr e -</span></span>
<span class="line"><span>sponse in duty cycle. The average</span></span>
<span class="line"><span>diode current and output voltage</span></span>
<span class="line"><span>initially decrease, as predicted by</span></span>
<span class="line"><span>the RHP zero. Eventually, the in-</span></span>
<span class="line"><span>ductor current increases, causing</span></span>
<span class="line"><span>the average diode current and the</span></span>
<span class="line"><span>output voltage to increase</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>iD(t)</span></span>
<span class="line"><span>iD(t) Ts</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>| v(t) |</span></span>
<span class="line"><span>t</span></span>
<span class="line"><span>iL(t)</span></span>
<span class="line"><span>d = 0.6d = 0.4</span></span>
<span class="line"><span>The increased duty cycle causes the inductor current to slowly increase, and hence the aver-</span></span>
<span class="line"><span>age diode current eventually exceeds its original d= 0.4 equilibrium value. The output voltage</span></span>
<span class="line"><span>eventually increases in magnitude, to the new equilibrium value corresponding to d= 0.6.</span></span>
<span class="line"><span>The presence of a right half-plane zero tends to destabilize wide-bandwidth feedback loops,</span></span>
<span class="line"><span>because during a transient the output initially changes in the wrong direction. The phase margin</span></span>
<span class="line"><span>test for feedback loop stability is discussed in the next chapter; when a RHP zero is present,</span></span>
<span class="line"><span>it is diﬃcult to obtain an adequate phase margin in conventional single-loop feedback systems</span></span>
<span class="line"><span>having wide bandwidth. Prediction of the right half-plane zero, and the consequent explanation</span></span>
<span class="line"><span>of why the feedback loops controlling CCM boost and buck–boost converters tend to oscillate,</span></span>
<span class="line"><span>was one of the early successes of averaged converter modeling.</span></span>
<span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions</span></span>
<span class="line"><span>Often, we can draw approximate Bode diagrams by inspection, without large amounts of messy</span></span>
<span class="line"><span>algebra and the inevitable associated algebra mistakes. A great deal of insight can be gained into</span></span>
<span class="line"><span>the operation of the circuit using this method. It becomes clear which components dominate</span></span>
<span class="line"><span>the circuit response at various frequencies, and so suitable approximations become obvious.</span></span>
<span class="line"><span>Analytical expressions for the approximate corner frequencies and asymptotes can be obtained</span></span>
<span class="line"><span>directly. Impedances and transfer functions of quite complicated networks can be constructed.</span></span>
<span class="line"><span>Thus insight can be gained, so that the design engineer can modify the circuit to obtain a desired</span></span>
<span class="line"><span>frequency response.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>318 8 Converter Transfer Functions</span></span>
<span class="line"><span>The graphical construction method, also known as “doing algebra on the graph,” involves</span></span>
<span class="line"><span>use of a few simple rules for combining the magnitude Bode plots of impedances and transfer</span></span>
<span class="line"><span>functions.</span></span>
<span class="line"><span>8.3.1 Series Impedances: Addition of Asymptotes</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>1 μF</span></span>
<span class="line"><span>Z(s)</span></span>
<span class="line"><span>Fig. 8.40 Series R–C network example</span></span>
<span class="line"><span>A series connection represents the addition of</span></span>
<span class="line"><span>impedances. If the Bode diagrams of the individual</span></span>
<span class="line"><span>impedance magnitudes are known, then the asymptotes</span></span>
<span class="line"><span>of the series combination are found by simply taking</span></span>
<span class="line"><span>the largest of the individual impedance asymptotes. In</span></span>
<span class="line"><span>many cases, the result is exact. In other cases, such as</span></span>
<span class="line"><span>when the individual asymptotes have the same slope,</span></span>
<span class="line"><span>then the result is an approximation; nonetheless, the</span></span>
<span class="line"><span>accuracy of the approximation can be quite good.</span></span>
<span class="line"><span>Consider the series-connected R–C network of</span></span>
<span class="line"><span>Fig. 8.40. It is desired to construct the magnitude</span></span>
<span class="line"><span>asymptotes of the total series impedance Z(s), where</span></span>
<span class="line"><span>Z(s)= R+ 1</span></span>
<span class="line"><span>sC (8.150)</span></span>
<span class="line"><span>Let us ﬁrst sketch the magnitudes of the individual impedances. The 10 Ωresistor has an</span></span>
<span class="line"><span>impedance magnitude of 10Ω⇒20 dBΩ. This value is independent of frequency, and is given</span></span>
<span class="line"><span>in Fig. 8.41. The capacitor has an impedance magnitude of 1/ωC. This quantity varies inversely</span></span>
<span class="line"><span>withω, and hence its magnitude Bode plot is a line with slope−20 dB/decade. The line passes</span></span>
<span class="line"><span>through 1Ω⇒0d BΩat the angular frequencyωwhere</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ωC= 1Ω (8.151)</span></span>
<span class="line"><span>that is, at</span></span>
<span class="line"><span>ω= 1</span></span>
<span class="line"><span>(1Ω)C= 1</span></span>
<span class="line"><span>(1Ω)(10−6F)= 106 rad/sec (8.152)</span></span>
<span class="line"><span>Fig. 8.41</span></span>
<span class="line"><span>Impedance</span></span>
<span class="line"><span>magnitudes of the</span></span>
<span class="line"><span>individual elements</span></span>
<span class="line"><span>in the network of</span></span>
<span class="line"><span>Fig. 8.40</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R = 10 20 dB</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C =1 at 159 kHz</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions 319</span></span>
<span class="line"><span>In terms of frequency f , this occurs at</span></span>
<span class="line"><span>f= ω</span></span>
<span class="line"><span>2π= 106</span></span>
<span class="line"><span>2π= 159 kHz (8.153)</span></span>
<span class="line"><span>So the capacitor impedance magnitude is a line with slope −20 dB/dec, and which passes</span></span>
<span class="line"><span>through 0 dBΩat 159 kHz, as shown in Fig. 8.41. It should be noted that, for simplicity, the</span></span>
<span class="line"><span>asymptotes in Fig. 8.41 have been labeled R and 1/ωC. But to draw the Bode plot, we must</span></span>
<span class="line"><span>actually plot dBΩ; for example, 20 log10(R/1Ω) and 20 log10((1/ωC)/1Ω).</span></span>
<span class="line"><span>Let us now construct the magnitude of Z(s), given by Eq. (8.150). The magnitude of Z can</span></span>
<span class="line"><span>be approximated as follows:</span></span>
<span class="line"><span>Z ( jω)</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>R+ 1</span></span>
<span class="line"><span>jωC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>≈</span></span>
<span class="line"><span>⎧⎪⎪⎪⎨⎪⎪⎪⎩</span></span>
<span class="line"><span>R for R≫ 1/ωC</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ωC for R≪ 1/ωC (8.154)</span></span>
<span class="line"><span>The asymptotes of the series combination are simply the larger of the individual resistor and</span></span>
<span class="line"><span>capacitor asymptotes, as illustrated by the heavy lines in Fig. 8.42. For this example, these</span></span>
<span class="line"><span>are in fact the exact asymptotes of ∥Z∥. In the limiting case as frequency tends to zero (dc),</span></span>
<span class="line"><span>then the capacitor tends to an open circuit. The series combination is then dominated by the</span></span>
<span class="line"><span>capacitor, and the exact function tends asymptotically to the capacitor impedance magnitude. In</span></span>
<span class="line"><span>the limiting case as frequency tends to inﬁnity, then the capacitor tends to a short circuit, and</span></span>
<span class="line"><span>the total impedance becomes simply R.S ot h e R and 1/ωC lines are the exact asymptotes for</span></span>
<span class="line"><span>this example.</span></span>
<span class="line"><span>The corner frequency f</span></span>
<span class="line"><span>0, where the asymptotes intersect, can now be easily deduced. At</span></span>
<span class="line"><span>angular frequencyω0= 2πf0, the two asymptotes are equal in value:</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>ω0C= R (8.155)</span></span>
<span class="line"><span>Solution forω0 and f0 leads to:</span></span>
<span class="line"><span>ω0 = 1</span></span>
<span class="line"><span>RC= 1</span></span>
<span class="line"><span>(10Ω)(10−6F)= 105 rad/sec</span></span>
<span class="line"><span>f0 =ω0</span></span>
<span class="line"><span>2π= 1</span></span>
<span class="line"><span>2πRC= 16 kHz (8.156)</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 RC =1 6k H z</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>Fig. 8.42 Construction of the composite asymptotes of∥ Z∥. The asymptotes of the series combination</span></span>
<span class="line"><span>can be approximated by simply selecting the larger of the individual resistor and capacitor asymptotes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>320 8 Converter Transfer Functions</span></span>
<span class="line"><span>So if we can write analytical expressions for the asymptotes, then we can equate the expressions</span></span>
<span class="line"><span>to ﬁnd analytical expressions for the corner frequencies where the asymptotes intersect.</span></span>
<span class="line"><span>The deviation of the exact curve from the asymptotes follows all of the usual rules. The</span></span>
<span class="line"><span>slope of the asymptotes changes by +20 dB/decade at the corner frequency f0 (i.e., from</span></span>
<span class="line"><span>−20 dBΩ/decade to 0 dBΩ/decade), and hence there is a zero at f = f0. So the exact curve</span></span>
<span class="line"><span>deviates from the asymptotes by+3d BΩat f= f0, and by+1d BΩat f= 2 f0 and at f= f0/2.</span></span>
<span class="line"><span>8.3.2 Series Resonant Circuit Example</span></span>
<span class="line"><span>Z(s)</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>Fig. 8.43 Series R–L–C network example</span></span>
<span class="line"><span>As a second example, let us construct the</span></span>
<span class="line"><span>magnitude asymptotes for the series R–L–</span></span>
<span class="line"><span>C circuit of Fig. 8.43. The series impedance</span></span>
<span class="line"><span>Z(s)i s</span></span>
<span class="line"><span>Z(s)= R+ sL+ 1</span></span>
<span class="line"><span>sC (8.157)</span></span>
<span class="line"><span>The magnitudes of the individual resistor, in-</span></span>
<span class="line"><span>ductor, and capacitor asymptotes are plotted</span></span>
<span class="line"><span>in Fig. 8.44, for the values</span></span>
<span class="line"><span>R= 1kΩ</span></span>
<span class="line"><span>L= 1 mH (8.158)</span></span>
<span class="line"><span>C= 0.1μF</span></span>
<span class="line"><span>The series impedance Z(s) is dominated by the capacitor at low frequency, by the resistor at mid</span></span>
<span class="line"><span>frequencies, and by the inductor at high frequencies, as illustrated by the bold line in Fig. 8.44.</span></span>
<span class="line"><span>The impedance Z(s) contains a zero at angular frequency ω1, where the capacitor and resistor</span></span>
<span class="line"><span>asymptotes intersect. By equating the expressions for the resistor and capacitor asymptotes, we</span></span>
<span class="line"><span>can ﬁndω</span></span>
<span class="line"><span>1:</span></span>
<span class="line"><span>R= 1</span></span>
<span class="line"><span>ω1C⇒ω1= 1</span></span>
<span class="line"><span>RC (8.159)</span></span>
<span class="line"><span>A second zero occurs at angular frequencyω2, where the inductor and resistor asymptotes inter-</span></span>
<span class="line"><span>sect. Upon equating the expressions for the resistor and inductor asymptotes at ω2, we obtain</span></span>
<span class="line"><span>the following:</span></span>
<span class="line"><span>Fig. 8.44 Graphical</span></span>
<span class="line"><span>construction of ∥ Z∥</span></span>
<span class="line"><span>of the series R–L–C</span></span>
<span class="line"><span>network of Fig. 8.43,</span></span>
<span class="line"><span>for the element values</span></span>
<span class="line"><span>speciﬁed by Eq. (8.158)</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>100 k</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions 321</span></span>
<span class="line"><span>Fig. 8.45 Graphical con-</span></span>
<span class="line"><span>struction of impedance</span></span>
<span class="line"><span>asymptotes for the series</span></span>
<span class="line"><span>R–L–C network example,</span></span>
<span class="line"><span>with R decreased to 10Ω</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>100 k</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>R=ω2L⇒ω2= R</span></span>
<span class="line"><span>L (8.160)</span></span>
<span class="line"><span>So simple expressions for all important features of the magnitude Bode plot of Z(s) can be</span></span>
<span class="line"><span>obtained directly. It should be noted that Eqs. (8.159) and (8.160) are approximate, rather than</span></span>
<span class="line"><span>exact, expressions for the corner frequenciesω1 andω2. Equations (8.159) and (8.160) coincide</span></span>
<span class="line"><span>with the results obtained via the low-Q approximation of Sect. 8.1.7.</span></span>
<span class="line"><span>Next, suppose that the value of R is decreased to 10Ω.A s R is reduced in value, the approx-</span></span>
<span class="line"><span>imate corner frequencies ω1 andω2 move closer together until, at R= 100Ω, they are both</span></span>
<span class="line"><span>100 krad/sec. Reducing R further in value causes the asymptotes to become independent of the</span></span>
<span class="line"><span>value of R, as illustrated in Fig. 8.45 for R= 10ω.T h e∥ Z∥ asymptotes now switch directly</span></span>
<span class="line"><span>fromωL to 1/ωC.</span></span>
<span class="line"><span>So now there are two zeroes atω=ω0. At corner frequencyω0, the inductor and capacitor</span></span>
<span class="line"><span>asymptotes are equal in value. Hence,</span></span>
<span class="line"><span>ω0L= 1</span></span>
<span class="line"><span>ω0C= R0 (8.161)</span></span>
<span class="line"><span>Solution for the angular corner frequencyω0 leads to</span></span>
<span class="line"><span>ω0= 1√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>(8.162)</span></span>
<span class="line"><span>Atω=ω0, the inductor and capacitor impedances both have magnitude R0, called the charac-</span></span>
<span class="line"><span>teristic impedance.</span></span>
<span class="line"><span>Since there are two zeroes at ω=ω0, there is a possibility that the two poles could be</span></span>
<span class="line"><span>complex conjugates, and that peaking could occur in the vicinity ofω=ω0. So let us investigate</span></span>
<span class="line"><span>what the actual curve does atω=ω0. The actual value of the series impedance Z( jω0)i s</span></span>
<span class="line"><span>Z( jω0)= R+ jω0L+ 1</span></span>
<span class="line"><span>jω0C (8.163)</span></span>
<span class="line"><span>Substitution of Eq. (8.161) into Eq. (8.163) leads to</span></span>
<span class="line"><span>Z( jω0)= R+ jR0+ R0</span></span>
<span class="line"><span>j = R+ jR0−jR0= R (8.164)</span></span>
<span class="line"><span>Atω=ω0, the inductor and capacitor impedances are equal in magnitude but opposite in phase.</span></span>
<span class="line"><span>Hence, they exactly cancel out in the series impedance, and we are left with Z( jω0)= R,a s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>322 8 Converter Transfer Functions</span></span>
<span class="line"><span>Fig. 8.46 Ac-</span></span>
<span class="line"><span>tual impedance</span></span>
<span class="line"><span>magnitude (solid</span></span>
<span class="line"><span>line) for the series</span></span>
<span class="line"><span>resonant R–L–C</span></span>
<span class="line"><span>example. The induc-</span></span>
<span class="line"><span>tor and capacitor</span></span>
<span class="line"><span>impedances cancel</span></span>
<span class="line"><span>out at f = f</span></span>
<span class="line"><span>0,a n d</span></span>
<span class="line"><span>hence Z( jω0)= R</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>100 k</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 dB</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>Q = R0 /R</span></span>
<span class="line"><span>Actual curve</span></span>
<span class="line"><span>illustrated in Fig. 8.46. The actual curve in the vicinity of the resonance at ω=ω0 can deviate</span></span>
<span class="line"><span>signiﬁcantly from the asymptotes, because its value is determined byR rather thanωL or 1/ωC.</span></span>
<span class="line"><span>We know from Sect. 8.1.6 that the deviation of the actual curve from the asymptotes at</span></span>
<span class="line"><span>ω=ω0 is equal to Q.F r o mF i g .8.46, one can see that</span></span>
<span class="line"><span>⏐⏐⏐ Q</span></span>
<span class="line"><span>⏐⏐⏐dB=</span></span>
<span class="line"><span>⏐⏐⏐ R0</span></span>
<span class="line"><span>⏐⏐⏐dBΩ−</span></span>
<span class="line"><span>⏐⏐⏐ R</span></span>
<span class="line"><span>⏐⏐⏐dBΩ (8.165)</span></span>
<span class="line"><span>or,</span></span>
<span class="line"><span>Q= R0</span></span>
<span class="line"><span>R (8.166)</span></span>
<span class="line"><span>Equations (8.161)t o( 8.166) are exact results for the series resonant circuit.</span></span>
<span class="line"><span>The practice of adding asymptotes by simply selecting the larger asymptote can be applied</span></span>
<span class="line"><span>to transfer functions as well as impedances. For example, suppose that we have already con-</span></span>
<span class="line"><span>structed the magnitude asymptotes of two transfer functions, G1 and G2, and we wish to ﬁnd</span></span>
<span class="line"><span>the asymptotes of G= G1+ G2. At each frequency, the asymptote for G can be approximated</span></span>
<span class="line"><span>by simply selecting the larger of the asymptotes for G1 and G2:</span></span>
<span class="line"><span>G= G1+ G2≈</span></span>
<span class="line"><span>⎧⎪⎪⎨⎪⎪⎩</span></span>
<span class="line"><span>G1,</span></span>
<span class="line"><span>G1</span></span>
<span class="line"><span>≫</span></span>
<span class="line"><span>G2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G2,</span></span>
<span class="line"><span>G2</span></span>
<span class="line"><span>≫</span></span>
<span class="line"><span>G1</span></span>
<span class="line"><span> (8.167)</span></span>
<span class="line"><span>Corner frequencies can be found by equating expressions for asymptotes as illustrated in the</span></span>
<span class="line"><span>preceding examples. In the next chapter, we will see that this approach yields a simple and</span></span>
<span class="line"><span>powerful method for determining the closed-loop transfer functions of feedback systems.</span></span>
<span class="line"><span>8.3.3 Parallel Impedances: Inverse Addition of Asymptotes</span></span>
<span class="line"><span>A parallel combination represents inverse addition of impedances:</span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>par= 1⎦1</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>+ 1</span></span>
<span class="line"><span>Z2</span></span>
<span class="line"><span>+···</span></span>
<span class="line"><span>)= Z1</span></span>
<span class="line"><span> Z2</span></span>
<span class="line"><span>··· (8.168)</span></span>
<span class="line"><span>If the asymptotes of the individual impedances Z1, Z2,... , are known, then the asymptotes</span></span>
<span class="line"><span>of the parallel combination Zpar can be found by simply selecting the smallest individual</span></span>
<span class="line"><span>impedance asymptote. This is true because the smallest impedance will have the largest inverse,</span></span>
<span class="line"><span>and will dominate the inverse sum. As in the case of the series impedances, this procedure will</span></span>
<span class="line"><span>often yield the exact asymptotes of Zpar.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions 323</span></span>
<span class="line"><span>Z(s) RLC</span></span>
<span class="line"><span>Fig. 8.47 Parallel R–L–C network example</span></span>
<span class="line"><span>Let us construct the magnitude asymp-</span></span>
<span class="line"><span>totes for the parallel R–L–C network of</span></span>
<span class="line"><span>Fig. 8.47, using the following element values:</span></span>
<span class="line"><span>R= 10Ω</span></span>
<span class="line"><span>L= 1 mH (8.169)</span></span>
<span class="line"><span>C= 0.1μF</span></span>
<span class="line"><span>Impedance magnitudes of the individual ele-</span></span>
<span class="line"><span>ments are illustrated in Fig. 8.48. The asymptotes for the total parallel impedance Z are approx-</span></span>
<span class="line"><span>imated by simply selecting the smallest individual element impedance, as shown by the heavy</span></span>
<span class="line"><span>line in Fig. 8.48. So the parallel impedance is dominated by the inductor at low frequency, by</span></span>
<span class="line"><span>the resistor at mid frequencies, and by the capacitor at high frequency. Approximate expressions</span></span>
<span class="line"><span>for the angular corner frequencies are again found by equating asymptotes:</span></span>
<span class="line"><span>atω=ω</span></span>
<span class="line"><span>1, R=ω1L⇒ω1= R</span></span>
<span class="line"><span>L (8.170)</span></span>
<span class="line"><span>atω=ω2, R= 1</span></span>
<span class="line"><span>ω2C⇒ω2= 1</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>These expressions could have been obtained by conventional analysis, combined with the low-Q</span></span>
<span class="line"><span>approximation of Sect. 8.1.7.</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>f2</span></span>
<span class="line"><span>Fig. 8.48 Construction of the composite asymptotes of∥ Z∥, for the parallelR–L–C example. The asymp-</span></span>
<span class="line"><span>totes of the parallel combination can be approximated by simply selecting the smallest of the individual</span></span>
<span class="line"><span>resistor, inductor, and capacitor asymptotes</span></span>
<span class="line"><span>8.3.4 Parallel Resonant Circuit Example</span></span>
<span class="line"><span>Figure 8.49 illustrates what happens when the value of R in the parallel R–L–C network is</span></span>
<span class="line"><span>increased to 1 kΩ. The asymptotes for∥ Z∥ then become independent of R, and change directly</span></span>
<span class="line"><span>fromωL to 1/ωC at angular frequencyω0. The corner frequencyω0 is now the frequency where</span></span>
<span class="line"><span>the inductor and capacitor asymptotes have equal value:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>324 8 Converter Transfer Functions</span></span>
<span class="line"><span>Fig. 8.49 Graphical con-</span></span>
<span class="line"><span>struction of impedance</span></span>
<span class="line"><span>asymptotes for the parallel</span></span>
<span class="line"><span>R–L–C example, with R</span></span>
<span class="line"><span>increased to 1 kΩ</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>R040 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>ω0L= 1</span></span>
<span class="line"><span>ω0C= R0 (8.171)</span></span>
<span class="line"><span>which implies that</span></span>
<span class="line"><span>ω0= 1√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>(8.172)</span></span>
<span class="line"><span>Atω=ω0, the slope of the asymptotes of∥ Z∥ changes from+20 dB/decade to−20 dB/decade,</span></span>
<span class="line"><span>and hence there are two poles. We should investigate whether peaking occurs, by determining</span></span>
<span class="line"><span>the exact value of∥ Z∥ atω=ω</span></span>
<span class="line"><span>0, as follows:</span></span>
<span class="line"><span>Z ( jω0)= (R)</span></span>
<span class="line"><span> ( jω0L)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦ 1</span></span>
<span class="line"><span>jω0C</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>= 1⎦1</span></span>
<span class="line"><span>R+ 1</span></span>
<span class="line"><span>jω0L+ jω0C</span></span>
<span class="line"><span>) (8.173)</span></span>
<span class="line"><span>Substitution of Eq. (8.171)i n t o(8.173) yields</span></span>
<span class="line"><span>Z ( jω0)= 1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>R+ 1</span></span>
<span class="line"><span>jR0</span></span>
<span class="line"><span>+ j</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>= 1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>R−j</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>+ j</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>= R (8.174)</span></span>
<span class="line"><span>So atω=ω0, the impedances of the inductor and capacitor again cancel out, and we are left with</span></span>
<span class="line"><span>Z( jω0)= R. The values of L and C determine the values of the asymptotes, but R determines</span></span>
<span class="line"><span>the value of the actual curve atω=ω0.</span></span>
<span class="line"><span>The actual curve is illustrated in Fig.8.50. The deviation of the actual curve from the asymp-</span></span>
<span class="line"><span>totes atω=ω0 is</span></span>
<span class="line"><span>⏐⏐⏐ Q</span></span>
<span class="line"><span>⏐⏐⏐dB=</span></span>
<span class="line"><span>⏐⏐⏐ R</span></span>
<span class="line"><span>⏐⏐⏐dBΩ−</span></span>
<span class="line"><span>⏐⏐⏐ R0</span></span>
<span class="line"><span>⏐⏐⏐dBΩ (8.175)</span></span>
<span class="line"><span>or,</span></span>
<span class="line"><span>Q= R</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>(8.176)</span></span>
<span class="line"><span>Equations (8.171)t o( 8.176) are exact results for the parallel resonant circuit.</span></span>
<span class="line"><span>The graphical construction method for impedance magnitudes is well known, and reac-</span></span>
<span class="line"><span>tance paper can be purchased commercially. As illustrated in Fig. 8.51, the magnitudes of</span></span>
<span class="line"><span>the impedances of various inductances, capacitances, and resistances are plotted on semi-</span></span>
<span class="line"><span>logarithmic axes. Asymptotes for the impedances of R–L–C networks can be sketched directly</span></span>
<span class="line"><span>on these axes, and numerical values of corner frequencies can then be graphically determined.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.3 Graphical Construction of Impedances and Transfer Functions 325</span></span>
<span class="line"><span>Fig. 8.50 Actual</span></span>
<span class="line"><span>impedance magni-</span></span>
<span class="line"><span>tude (solid line) for</span></span>
<span class="line"><span>the parallel resonant</span></span>
<span class="line"><span>R–L–C example. The</span></span>
<span class="line"><span>inductor and capacitor</span></span>
<span class="line"><span>impedances cancel out</span></span>
<span class="line"><span>at f = f</span></span>
<span class="line"><span>0, and hence</span></span>
<span class="line"><span>Z( jω0)= R</span></span>
<span class="line"><span>1 MHz100 kHz10 kHz1 kHz100 Hz</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Z ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>R0Actual curve40 dB</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>0.1 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>10 </span></span>
<span class="line"><span>1 </span></span>
<span class="line"><span>100 m</span></span>
<span class="line"><span>100 </span></span>
<span class="line"><span>1 k</span></span>
<span class="line"><span>10 k</span></span>
<span class="line"><span>10 m</span></span>
<span class="line"><span>1 m</span></span>
<span class="line"><span>100 ! H</span></span>
<span class="line"><span>1 mH</span></span>
<span class="line"><span>10 ! H 100 nH 10 nH 1 nH</span></span>
<span class="line"><span>10 Hz 100 Hz 1 kHz 10 kHz 100 kHz 1 MHz</span></span>
<span class="line"><span>1 ! H</span></span>
<span class="line"><span>10 mH</span></span>
<span class="line"><span>100 mH</span></span>
<span class="line"><span>1 H</span></span>
<span class="line"><span>10 H</span></span>
<span class="line"><span>10 ! F</span></span>
<span class="line"><span>100 ! F1 mF10 mF100 mF1 F</span></span>
<span class="line"><span>1 ! F</span></span>
<span class="line"><span>100 nF</span></span>
<span class="line"><span>10 nF</span></span>
<span class="line"><span>1 nF</span></span>
<span class="line"><span>100 pF</span></span>
<span class="line"><span>20 dB</span></span>
<span class="line"><span>0 dB</span></span>
<span class="line"><span>40 dB</span></span>
<span class="line"><span>60 dB</span></span>
<span class="line"><span>80 dB</span></span>
<span class="line"><span>Fig. 8.51 “Reactance paper”: an aid for graphical construction of impedances, with the magnitudes of</span></span>
<span class="line"><span>various inductive, capacitive, and resistive impedances preplotted</span></span>
<span class="line"><span>8.3.5 Voltage Divider Transfer Functions: Division of Asymptotes</span></span>
<span class="line"><span>Usually, we can express transfer functions in terms of impedances—for example, as the ratio</span></span>
<span class="line"><span>of two impedances. If we can construct these impedances as described in the previous sections,</span></span>
<span class="line"><span>then we can divide to construct the transfer function. In this section, construction of the transfer</span></span>
<span class="line"><span>function H(s) of the two-pole R–L–C low-pass ﬁlter (Fig.8.52) is discussed in detail. A ﬁlter of</span></span>
<span class="line"><span>this form appears in the canonical model for two-pole converters, and the results of this section</span></span>
<span class="line"><span>are applied in the converter examples of the next section.</span></span>
<span class="line"><span>The familiar voltage divider formula shows that the transfer function of this circuit can be</span></span>
<span class="line"><span>expressed as the ratio of impedancesZ2/Zin, where Zin= Z1+Z2 is the network input impedance:</span></span>
<span class="line"><span>ˆv2(s)</span></span>
<span class="line"><span>ˆv1(s)= Z2</span></span>
<span class="line"><span>Z1+ Z2</span></span>
<span class="line"><span>= Z2</span></span>
<span class="line"><span>Zin</span></span>
<span class="line"><span>(8.177)</span></span>
<span class="line"><span>For this example, Z1(s)= sL, and Z2(s) is the parallel combination of R and 1/sC. Hence, we</span></span>
<span class="line"><span>can ﬁnd the transfer function asymptotes by constructing the asymptotes of Z2 and of the series</span></span>
<span class="line"><span></span></span>
<span class="line"><span>326 8 Converter Transfer Functions</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>v2(s)</span></span>
<span class="line"><span>H(s)</span></span>
<span class="line"><span>Zout</span></span>
<span class="line"><span>Z2Z1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Zinv1(s)</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>L C R Zout</span></span>
<span class="line"><span>Z2Z1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C R</span></span>
<span class="line"><span>Z2Z1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Zin</span></span>
<span class="line"><span>Fig. 8.52 Two-pole low-pass ﬁlter based on voltage divider circuit: (a) transfer function H(s), (b) deter-</span></span>
<span class="line"><span>mination of Zout(s) by setting independent sources to zero, (c) determination of Zin(s)</span></span>
<span class="line"><span>combination represented by Zin, and then dividing. Another approach, which is easier to apply</span></span>
<span class="line"><span>in this example, is to multiply the numerator and denominator of Eq. (8.177)b y Z1:</span></span>
<span class="line"><span>ˆv2(s)</span></span>
<span class="line"><span>ˆv1(s)= Z2Z1</span></span>
<span class="line"><span>Z1+ Z2</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>= Zout</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>(8.178)</span></span>
<span class="line"><span>where Zout= Z1∥ Z2 is the output impedance of the voltage divider. So another way to construct</span></span>
<span class="line"><span>the voltage divider transfer function is to ﬁrst construct the asymptotes for Z1 and for the par-</span></span>
<span class="line"><span>allel combination represented by Zout, and then divide. This method is useful when the parallel</span></span>
<span class="line"><span>combination Z1∥Z2 is easier to construct than the series combination Z1+ Z2.I to f t e ng i v e sa</span></span>
<span class="line"><span>diﬀerent approximate result, which may be more (or sometimes less) accurate than the result</span></span>
<span class="line"><span>obtained using Zin.</span></span>
<span class="line"><span>The output impedance Zout in Fig. 8.52bi s</span></span>
<span class="line"><span>Zout(s)= R</span></span>
<span class="line"><span> 1</span></span>
<span class="line"><span>sC</span></span>
<span class="line"><span> sL (8.179)</span></span>
<span class="line"><span>The impedance of the parallel R–L–C network is constructed in Sect. 8.3.3, and is illustrated in</span></span>
<span class="line"><span>Fig. 8.51a for the high-Q case.</span></span>
<span class="line"><span>According to Eq. (8.178), the voltage divider transfer function magnitude is∥ H∥=∥ Zout∥/</span></span>
<span class="line"><span>∥ Z1∥. This quantity is constructed in Fig. 8.53b. Forω&lt;ω0, the asymptote of ∥ Zout∥ co-</span></span>
<span class="line"><span>incides with ∥Z1∥: both are equal to ωL. Hence, the ratio is ∥ Zout∥/∥ Z1∥ = 1. For ω&gt;</span></span>
<span class="line"><span>ω0, the asymptote of ∥ Zout∥ is 1/ωC, while ∥ Z1∥ id equal to ωL. The ratio then becomes</span></span>
<span class="line"><span>∥ Zout∥/∥ Z1∥= 1/ω2LC, and hence the high-frequency asymptote has a−40 dB/decade slope.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.4 Graphical Construction of Converter Transfer Functions 327</span></span>
<span class="line"><span>Fig. 8.53 Graphical construction of</span></span>
<span class="line"><span>H and Zout of the voltage divider cir-</span></span>
<span class="line"><span>cuit: ( a) output impedance Zout;( b)</span></span>
<span class="line"><span>transfer function H</span></span>
<span class="line"><span>(a) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>|| Z1 || = L</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Q = R /R0L</span></span>
<span class="line"><span>L =1</span></span>
<span class="line"><span>1/ C</span></span>
<span class="line"><span>L = 1</span></span>
<span class="line"><span>2LC</span></span>
<span class="line"><span>H = Zout</span></span>
<span class="line"><span>Z1</span></span>
<span class="line"><span>Fig. 8.54 Eﬀect of increasing L</span></span>
<span class="line"><span>on the output impedance asymptotes,</span></span>
<span class="line"><span>corner frequency, and Q-factor</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>Increasing</span></span>
<span class="line"><span>L L</span></span>
<span class="line"><span>Atω= ω0, ∥ Zout∥ has exact value R, while ∥Z1∥ has exact value R0. The ratio is then</span></span>
<span class="line"><span>∥ H( jω0)∥=∥ Zout( jω0)∥/∥ Z1( jω0)∥= R/R0 = Q. So the ﬁlter transfer function H has the</span></span>
<span class="line"><span>sameω0 and Q as the impedance Zout.</span></span>
<span class="line"><span>It now becomes obvious how variations in element values aﬀect the salient features of the</span></span>
<span class="line"><span>transfer function and output impedance. For example, the eﬀect of increasing L is illustrated in</span></span>
<span class="line"><span>Fig. 8.54. This causes the angular resonant frequency ω0 to be reduced, and also reduces the</span></span>
<span class="line"><span>Q-factor.</span></span>
<span class="line"><span>8.4 Graphical Construction of Converter Transfer Functions</span></span>
<span class="line"><span>The small-signal equivalent circuit model of the buck converter, derived in Chap. 7, is repro-</span></span>
<span class="line"><span>duced in Fig. 8.55. Let us construct the transfer functions and terminal impedances of this con-</span></span>
<span class="line"><span>verter, using the graphical approach of the previous section.</span></span>
<span class="line"><span>The output impedance Zout(s) is found with the ˆd(s) and ˆvg(s) sources set to zero; the circuit</span></span>
<span class="line"><span>of Fig. 8.56a is then obtained. This model coincides with the parallel R–L–C circuit analyzed</span></span>
<span class="line"><span>in Sects. 8.3.3 and 8.3.4. As illustrated in Fig. 8.56b, the output impedance is dominated by the</span></span>
<span class="line"><span></span></span>
<span class="line"><span>328 8 Converter Transfer Functions</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>1 : D</span></span>
<span class="line"><span>vg(t) Id (t)</span></span>
<span class="line"><span>Vg d(t)</span></span>
<span class="line"><span>i(t) +</span></span>
<span class="line"><span>v(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Zout(s)Zin(s)</span></span>
<span class="line"><span>ˆ ˆ</span></span>
<span class="line"><span>ˆˆ</span></span>
<span class="line"><span>ˆ</span></span>
<span class="line"><span>Fig. 8.55 Small-signal model of the buck converter, with input impedance Zin(s) and output impedance</span></span>
<span class="line"><span>Zout(s) explicitly deﬁned</span></span>
<span class="line"><span>(a) L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>Zout(s)</span></span>
<span class="line"><span>(b) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>Fig. 8.56 Construction of buck converter output impedance Zout(s): (a) circuit model; ( b) impedance</span></span>
<span class="line"><span>asymptotes</span></span>
<span class="line"><span>inductor at low frequency, and by the capacitor at high frequency. At the resonant frequency f0,</span></span>
<span class="line"><span>given by</span></span>
<span class="line"><span>f0= 1</span></span>
<span class="line"><span>2π</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>LC</span></span>
<span class="line"><span>(8.180)</span></span>
<span class="line"><span>the output impedance is equal to the load resistance R.T h eQ-factor of the circuit is equal to</span></span>
<span class="line"><span>Q= R</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>(8.181)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>R0=ω0L= 1</span></span>
<span class="line"><span>ω0C=</span></span>
<span class="line"><span>√</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>C (8.182)</span></span>
<span class="line"><span>Thus, the circuit is lightly damped (high Q) at light load, where the value of R is large.</span></span>
<span class="line"><span>The converter input impedance Zin(s) is also found with the ˆd(s) and ˆvg(s) sources set to</span></span>
<span class="line"><span>zero, as illustrated in Fig. 8.57a. The input impedance is referred to the primary side of the 1:D</span></span>
<span class="line"><span>transformer, and is equal to</span></span>
<span class="line"><span>Zin(s)= 1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>[Z1(s)+ Z2(s)] (8.183)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.4 Graphical Construction of Converter Transfer Functions 329</span></span>
<span class="line"><span>(a) L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>1 : D</span></span>
<span class="line"><span>Zin(s)</span></span>
<span class="line"><span>Z1(s) Z2(s)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>(b) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 RC</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>2 LC</span></span>
<span class="line"><span>R0 = L</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>(c) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>|| Z1 ||</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>|| Z2 ||</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>(d) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>|| Z1 ||</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>|| Z2 ||</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>(e)</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>f1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>2</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>CD2</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>D2R</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>D2|| Zin ||</span></span>
<span class="line"><span>||</span></span>
<span class="line"><span>Fig. 8.57 Construction of the input impedance Zin(s) for the buck converter: ( a) circuit model; ( b)t h e</span></span>
<span class="line"><span>individual resistor, inductor, and capacitor impedance magnitudes; (c) construction of the impedance mag-</span></span>
<span class="line"><span>nitudes∥Z1∥ and∥Z2∥;( d) construction of∥Zout∥;( e) ﬁnal result∥Zin∥</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>Z1(s)= sL (8.184)</span></span>
<span class="line"><span>and</span></span>
<span class="line"><span>Z2(s)= R</span></span>
<span class="line"><span> 1</span></span>
<span class="line"><span>sC (8.185)</span></span>
<span class="line"><span>We begin construction of the impedance asymptotes corresponding to Eqs. ( 8.183)t o( 8.185)</span></span>
<span class="line"><span>by constructing the individual resistor, capacitor, and inductor impedances as in Fig.8.57b. The</span></span>
<span class="line"><span>impedances in Fig. 8.57 are constructed for the case R&gt; R0. As illustrated in Fig. 8.57c,∥Z1∥</span></span>
<span class="line"><span>coincides with the inductor reactance ωL. The impedance ∥Z2∥ is asymptotic to resistance R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>330 8 Converter Transfer Functions</span></span>
<span class="line"><span>at low frequencies and to the capacitor reactance 1 /ωC at high frequency. The resistor and</span></span>
<span class="line"><span>capacitor asymptotes intersect at corner frequency f1, given by</span></span>
<span class="line"><span>f1= 1</span></span>
<span class="line"><span>2πRC (8.186)</span></span>
<span class="line"><span>According to Eq. (8.183), the input impedance Zin(s) is equal to the series combination of Z1(s)</span></span>
<span class="line"><span>and Z2(s), divided by the square of the turns ratioD. The asymptotes for the series combination</span></span>
<span class="line"><span>[Z1(s)+ Z2(s)] are found by selecting the larger of the∥Z1∥ and∥Z2∥ asymptotes. The∥Z1∥ and</span></span>
<span class="line"><span>∥Z2∥ asymptotes intersect at frequency f0, given by Eq. (8.180). It can be seen from Fig. 8.57c</span></span>
<span class="line"><span>that the series combination is dominated by Z2 for f&lt; f0 and by Z1 for f&gt; f0. Upon scaling</span></span>
<span class="line"><span>the [Z1(s)+ Z2(s)] asymptotes by the factor 1/D2, the input impedance asymptotes of Fig.8.57e</span></span>
<span class="line"><span>are obtained.</span></span>
<span class="line"><span>The zeroes of Zin(s), at frequency f0,h a v et h es a m eQ-factor as the poles of Zout(s)</span></span>
<span class="line"><span>[Eq. (8.181)]. One way to see that this is true is to note that the output impedance can be ex-</span></span>
<span class="line"><span>pressed as</span></span>
<span class="line"><span>Zout(s)= Z1(s)Z2(s)</span></span>
<span class="line"><span>Z1(s)+ Z2(s)= Z1(s)Z2(s)</span></span>
<span class="line"><span>D2Zin(s) (8.187)</span></span>
<span class="line"><span>Hence, we can relate Zout(s)t o Zin(s) as follows:</span></span>
<span class="line"><span>Zin(s)= 1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>Z1(s)Z2(s)</span></span>
<span class="line"><span>Zout(s) (8.188)</span></span>
<span class="line"><span>The impedances∥Z1∥,∥Z2∥, and∥ Zout∥ are illustrated in Fig. 8.57d. At the resonant frequency</span></span>
<span class="line"><span>f= f0, impedance Z1 has magnitude R0 and impedance Z2 has magnitude approximately equal</span></span>
<span class="line"><span>to R0. The output impedance Zout has magnitude R. Hence, Eq. ( 8.188) predicts that the input</span></span>
<span class="line"><span>impedance has the magnitude</span></span>
<span class="line"><span>∥ Zin∥≈1</span></span>
<span class="line"><span>D2</span></span>
<span class="line"><span>R0R0</span></span>
<span class="line"><span>R at f= f0 (8.189)</span></span>
<span class="line"><span>At f= f0, the asymptotes of the input impedance have magnitude R0/D2. The deviation from</span></span>
<span class="line"><span>the asymptotes is therefore equal to Q= R/R0, as illustrated in Fig. 8.57e.</span></span>
<span class="line"><span>The control-to-output transfer functionGvd(s) is found with the ˆvg(s) source set to zero, as in</span></span>
<span class="line"><span>Fig. 8.58a. This circuit coincides with the voltage divider analyzed in Sect.8.3.5. Hence, Gvd(s)</span></span>
<span class="line"><span>can be expressed as</span></span>
<span class="line"><span>Gvd(s)= Vg</span></span>
<span class="line"><span>Zout(s)</span></span>
<span class="line"><span>Z1(s) (8.190)</span></span>
<span class="line"><span>The quantities∥ Zout∥ and∥Z1∥ are constructed in Fig. 8.58b. According to Eq. (8.190), we can</span></span>
<span class="line"><span>construct∥Gvd(s)∥ by ﬁnding the ratio of∥ Zout∥ and∥Z1∥, and then scaling the result by Vg.F o r</span></span>
<span class="line"><span>f&lt; f0,∥ Zout∥ and∥Z1∥ are both equal toωL and hence∥ Zout∥/∥Z1∥ is equal to 1. As illustrated</span></span>
<span class="line"><span>in Fig. 8.58c, the low-frequency asymptote of ∥Gvd(s)∥ has value Vg.F o r f &gt; f0,∥ Zout∥ has</span></span>
<span class="line"><span>asymptote 1/ωC, and∥Z1∥ is equal toωL. Hence,∥ Zout∥/∥Z1∥ has asymptote 1/ω2LC, and the</span></span>
<span class="line"><span>high-frequency asymptote of∥Gvd(s)∥ is equal to Vg/ω2LC.T h e Q-factor of the two poles at</span></span>
<span class="line"><span>f= f0 is again equal to R/R0.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.4 Graphical Construction of Converter Transfer Functions 331</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>RCVg (t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>(b) 1</span></span>
<span class="line"><span>C</span></span>
<span class="line"><span>R</span></span>
<span class="line"><span>|| Zout ||</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>R0</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>|| Z1 || = L</span></span>
<span class="line"><span>(c)</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Q = R /R0Vg</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>L = Vg</span></span>
<span class="line"><span>Vg</span></span>
<span class="line"><span>1/ C</span></span>
<span class="line"><span>L = Vg</span></span>
<span class="line"><span>2LC|| Gvd(s) ||</span></span>
<span class="line"><span>dˆ vˆ</span></span>
<span class="line"><span>Fig. 8.58 Construction of the control-to-output transfer functionGvd(s) for the buck converter: (a) circuit</span></span>
<span class="line"><span>model; (b) relevant impedance asymptotes; (c) transfer function∥Gvd(s)∥</span></span>
<span class="line"><span>Fig. 8.59 The line-to-output trans-</span></span>
<span class="line"><span>fer function Gvg(s) for the buck con-</span></span>
<span class="line"><span>verter: (a) circuit model; ( b) magni-</span></span>
<span class="line"><span>tude asymptotes</span></span>
<span class="line"><span>(a)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>L</span></span>
<span class="line"><span>RC</span></span>
<span class="line"><span>1 : D</span></span>
<span class="line"><span>g(t)</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>(t)</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>(b)</span></span>
<span class="line"><span>f0</span></span>
<span class="line"><span>Q = R /R0</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>2LC|| Gvg(s) ||</span></span>
<span class="line"><span>D</span></span>
<span class="line"><span>vˆ vˆ</span></span>
<span class="line"><span>The line-to-output transfer function Gvg(s) is found with the ˆd(s) sources set to zero, as</span></span>
<span class="line"><span>in Fig. 8.59a. This circuit contains the same voltage divider as in Fig. 8.58, and additionally</span></span>
<span class="line"><span>contains the 1:D transformer. The transfer function Gvg(s) can be expressed as</span></span>
<span class="line"><span>Gvg(s)= DZout(s)</span></span>
<span class="line"><span>Z1(s) (8.191)</span></span>
<span class="line"><span>This expression is similar to Eq. (8.190), except for the scaling factor of D. Therefore, the line-</span></span>
<span class="line"><span>to-output transfer function of Fig. 8.59b has the same shape as the control-to-output transfer</span></span>
<span class="line"><span>function Gvd(s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>332 8 Converter Transfer Functions</span></span>
<span class="line"><span>8.5 Measurement of AC Transfer Functions and Impedances</span></span>
<span class="line"><span>It is good engineering practice to measure the transfer functions of prototype converters and</span></span>
<span class="line"><span>converter systems. Such an exercise can verify that the system has been correctly modeled and</span></span>
<span class="line"><span>designed. Also, it is often useful to characterize individual circuit elements through measure-</span></span>
<span class="line"><span>ment of their terminal impedances.</span></span>
<span class="line"><span>Small-signal ac magnitude and phase measurements can be made using an instrument</span></span>
<span class="line"><span>known as a network analyzer, or frequency response analyzer. The key inputs and outputs of</span></span>
<span class="line"><span>a basic network analyzer are illustrated in Fig.8.60. The network analyzer provides a sinusoidal</span></span>
<span class="line"><span>output voltage ˆv</span></span>
<span class="line"><span>z of controllable amplitude and frequency. This signal can be injected into the</span></span>
<span class="line"><span>system to be measured, at any desired location. The network analyzer also has two (or more)</span></span>
<span class="line"><span>inputs, ˆvx and ˆvy. The return electrodes of ˆvz, ˆvy, and ˆvx are internally connected to earth ground.</span></span>
<span class="line"><span>The network analyzer performs the function of a narrowband tracking voltmeter: it measures the</span></span>
<span class="line"><span>components of ˆvx and ˆvy at the injection frequency, and displays the magnitude and phase of the</span></span>
<span class="line"><span>quantity ˆvy/ˆvx. The narrowband tracking voltmeter feature is essential for switching converter</span></span>
<span class="line"><span>measurements; otherwise, switching ripple and noise corrupt the desired sinusoidal signals and</span></span>
<span class="line"><span>make accurate measurements impossible [ 80]. Modem network analyzers can automatically</span></span>
<span class="line"><span>sweep the frequency of the injection source ˆvz to generate magnitude and phase Bode plots of</span></span>
<span class="line"><span>the transfer function ˆvy/ˆvx.</span></span>
<span class="line"><span>A typical test setup for measuring the transfer function of an ampliﬁer is illustrated in</span></span>
<span class="line"><span>Fig. 8.61. A potentiometer, connected between a dc supply voltage VCC and ground, is used</span></span>
<span class="line"><span>to bias the ampliﬁer input to attain the correct quiescent operating point. The injection source</span></span>
<span class="line"><span>voltage ˆvz is coupled to the ampliﬁer input terminals via a dc blocking capacitor. This blocking</span></span>
<span class="line"><span>capacitor prevents the injection voltage source from upsetting the dc bias. The network ana-</span></span>
<span class="line"><span>lyzer inputs ˆv</span></span>
<span class="line"><span>x and ˆvy are connected to the input and output terminals of the ampliﬁer. Hence,</span></span>
<span class="line"><span>the measured transfer function is</span></span>
<span class="line"><span>Network Analyzer</span></span>
<span class="line"><span>Injection source Measured inputs</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>Magnitude</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>Frequency</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>vz+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>+– +–</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>Data</span></span>
<span class="line"><span>17.3 dB</span></span>
<span class="line"><span>– 134.7˚</span></span>
<span class="line"><span>Data bus</span></span>
<span class="line"><span>to computer</span></span>
<span class="line"><span>Fig. 8.60 Key features and functions of a network analyzer: sinusoidal source of controllable amplitude</span></span>
<span class="line"><span>and frequency, two inputs, and determination of relative magnitude and phase of the input components at</span></span>
<span class="line"><span>the injection frequency</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.5 Measurement of AC Transfer Functions and Impedances 333</span></span>
<span class="line"><span>Network Analyzer</span></span>
<span class="line"><span>Injection source Measured inputs</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>Magnitude</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>Frequency</span></span>
<span class="line"><span>vz</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>vz+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>+– +–</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>Data</span></span>
<span class="line"><span>–4.7 dB</span></span>
<span class="line"><span>– 162.8˚</span></span>
<span class="line"><span>Data bus</span></span>
<span class="line"><span>to computer</span></span>
<span class="line"><span>Device</span></span>
<span class="line"><span>under test</span></span>
<span class="line"><span>G(s)</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>VCC</span></span>
<span class="line"><span>DC</span></span>
<span class="line"><span>bias</span></span>
<span class="line"><span>adjust</span></span>
<span class="line"><span>DC</span></span>
<span class="line"><span>blocking</span></span>
<span class="line"><span>capacitor</span></span>
<span class="line"><span>Fig. 8.61 Measurement of a transfer function</span></span>
<span class="line"><span>ˆvy(s)</span></span>
<span class="line"><span>ˆvx(s)= G(s) (8.192)</span></span>
<span class="line"><span>Note that the blocking capacitance, bias potentiometer, and ˆvz amplitude have no eﬀect on the</span></span>
<span class="line"><span>measured transfer function</span></span>
<span class="line"><span>An impedance</span></span>
<span class="line"><span>Z(s)= ˆv(s)</span></span>
<span class="line"><span>ˆi(s)</span></span>
<span class="line"><span>(8.193)</span></span>
<span class="line"><span>can be measured by treating the impedance as a transfer function from current to voltage. For</span></span>
<span class="line"><span>example, measurement of the output impedance of an ampliﬁer is illustrated in Fig. 8.62.T h e</span></span>
<span class="line"><span>quiescent operating condition is again established by a potentiometer which biases the ampliﬁer</span></span>
<span class="line"><span>input. The injection source ˆv</span></span>
<span class="line"><span>z is coupled to the ampliﬁer output through a dc blocking capacitor.</span></span>
<span class="line"><span>The injection source voltage ˆvz excites a current ˆiout in impedance Zs. This current ﬂows into the</span></span>
<span class="line"><span>output of the ampliﬁer, and excites a voltage across the ampliﬁer output impedance:</span></span>
<span class="line"><span>Zout(s)= ˆvy(s)</span></span>
<span class="line"><span>ˆiout(s)</span></span>
<span class="line"><span>⏐⏐</span></span>
<span class="line"><span>⏐⏐⏐</span></span>
<span class="line"><span>⏐</span></span>
<span class="line"><span>ampliﬁer</span></span>
<span class="line"><span>ac input = 0</span></span>
<span class="line"><span>(8.194)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>334 8 Converter Transfer Functions</span></span>
<span class="line"><span>VCC</span></span>
<span class="line"><span>DC</span></span>
<span class="line"><span>bias</span></span>
<span class="line"><span>adjust</span></span>
<span class="line"><span>Device</span></span>
<span class="line"><span>under test</span></span>
<span class="line"><span>G(s)</span></span>
<span class="line"><span>Input</span></span>
<span class="line"><span>Output</span></span>
<span class="line"><span>Zout +</span></span>
<span class="line"><span>– vz</span></span>
<span class="line"><span>iout</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>V oltage</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>Zs</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>Rsource</span></span>
<span class="line"><span>DC blocking</span></span>
<span class="line"><span>capacitor</span></span>
<span class="line"><span>Current</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>+–</span></span>
<span class="line"><span>Fig. 8.62 Measurement of the output impedance of a circuit</span></span>
<span class="line"><span>A current probe is used to measure ˆiout. The current probe produces a voltage proportional</span></span>
<span class="line"><span>to ˆiout; this voltage is connected to the network analyzer input ˆ vx. A voltage probe is used to</span></span>
<span class="line"><span>measure the ampliﬁer output voltage ˆvy. The network analyzer displays the transfer function</span></span>
<span class="line"><span>ˆvy/ˆvx, which is proportional to Zout. Note that the value of Zs and the amplitude of ˆvz do not</span></span>
<span class="line"><span>aﬀect the measurement of Zout.</span></span>
<span class="line"><span>In power applications, it is sometimes necessary to measure impedances that are very small</span></span>
<span class="line"><span>in magnitude. Grounding problems [ 4] cause the test setup of Fig. 8.62 to fail in such cases.</span></span>
<span class="line"><span>The reason is illustrated in Fig. 8.63a. Since there turn connections of the injection source ˆ vz</span></span>
<span class="line"><span>and the analyzer input ˆvy are both connected to earth ground, the injected current ˆiout can return</span></span>
<span class="line"><span>to the source through the return connections of either the injection source or the voltage probe.</span></span>
<span class="line"><span>In practice, ˆiout divides between the two paths according to their relative impedances. Hence,</span></span>
<span class="line"><span>a signiﬁcant current (1 −k)ˆiout ﬂows through the return connection of the voltage probe. If</span></span>
<span class="line"><span>the voltage probe return connection has some total contact and wiring impedance Zprobe, then</span></span>
<span class="line"><span>the current induces a voltage drop (1 −k)ˆioutZprobe in the voltage probe wiring, as illustrated</span></span>
<span class="line"><span>in Fig. 8.63a. Hence, the network analyzer does not correctly measure the voltage drop across</span></span>
<span class="line"><span>the impedance Z. If the internal ground connections of the network analyzer have negligible</span></span>
<span class="line"><span>impedance, then the network analyzer will display the following impedance:</span></span>
<span class="line"><span>Z+ (1−k)Zprobe= Z+ Zprobe</span></span>
<span class="line"><span>Zrz (8.195)</span></span>
<span class="line"><span>Here, Zrz is the impedance of the injection source return connection. So to obtain an accurate</span></span>
<span class="line"><span>measurement, the following condition must be satisﬁed:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span></span></span>
<span class="line"><span>≫</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>⎦</span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Z</span></span>
<span class="line"><span>rz</span></span>
<span class="line"><span>) </span></span>
<span class="line"><span></span></span>
<span class="line"><span> (8.196)</span></span>
<span class="line"><span>A typical lower limit on∥ Z∥ is a few tens or hundreds of milliohms.</span></span>
<span class="line"><span>An improved test setup for measurement of small impedances is illustrated in Fig.8.63b. An</span></span>
<span class="line"><span>isolation transformer is inserted between the injection source and the dc blocking capacitor. The</span></span>
<span class="line"><span>return connections of the voltage probe and injection source are no longer in parallel, and the</span></span>
<span class="line"><span>injected current ˆi</span></span>
<span class="line"><span>out must now return entirely through the injection source return connection. An</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.5 Measurement of AC Transfer Functions and Impedances 335</span></span>
<span class="line"><span>(a) Impedance</span></span>
<span class="line"><span>under test</span></span>
<span class="line"><span>Z(s) +</span></span>
<span class="line"><span>– vz</span></span>
<span class="line"><span>iout</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>V oltage</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>Rsource</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Network Analyzer</span></span>
<span class="line"><span>Injection source</span></span>
<span class="line"><span>Measured</span></span>
<span class="line"><span>inputs</span></span>
<span class="line"><span>V oltage</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>return</span></span>
<span class="line"><span>connection</span></span>
<span class="line"><span>Injection</span></span>
<span class="line"><span>source</span></span>
<span class="line"><span>return</span></span>
<span class="line"><span>connection</span></span>
<span class="line"><span>iout</span></span>
<span class="line"><span>Zrz</span></span>
<span class="line"><span>{{Zprobe</span></span>
<span class="line"><span>ki out</span></span>
<span class="line"><span>(1 –k) iout</span></span>
<span class="line"><span>+ –(1 –k) iout Zprobe</span></span>
<span class="line"><span>(b) Impedance</span></span>
<span class="line"><span>under test</span></span>
<span class="line"><span>Z(s) +</span></span>
<span class="line"><span>– vz</span></span>
<span class="line"><span>iout</span></span>
<span class="line"><span>vy</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>V oltage</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>Rsource</span></span>
<span class="line"><span>vx</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>–</span></span>
<span class="line"><span>Network Analyzer</span></span>
<span class="line"><span>Injection source</span></span>
<span class="line"><span>Measured</span></span>
<span class="line"><span>inputs</span></span>
<span class="line"><span>V oltage</span></span>
<span class="line"><span>probe</span></span>
<span class="line"><span>return</span></span>
<span class="line"><span>connection</span></span>
<span class="line"><span>Injection</span></span>
<span class="line"><span>source</span></span>
<span class="line"><span>return</span></span>
<span class="line"><span>connection</span></span>
<span class="line"><span>Zrz</span></span>
<span class="line"><span>{{Zprobe</span></span>
<span class="line"><span>+ –0V</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>iout</span></span>
<span class="line"><span>1 : n</span></span>
<span class="line"><span>Fig. 8.63 Measurement of a small impedance Z(s): (a) current ﬂowing in the return connection of the</span></span>
<span class="line"><span>voltage probe induces a voltage drop that corrupts the measurement; ( b) an improved experiment, incor-</span></span>
<span class="line"><span>porating isolation of the injection source</span></span>
<span class="line"><span></span></span>
<span class="line"><span>336 8 Converter Transfer Functions</span></span>
<span class="line"><span>added beneﬁt is that the transformer turns ratio n can be increased, to better match the injection</span></span>
<span class="line"><span>source impedance to the impedance under test. Note that the impedances of the transformer, of</span></span>
<span class="line"><span>the blocking capacitor, and of the probe and injection source return connections, do not a ﬀect</span></span>
<span class="line"><span>the measurement. Much smaller impedances can therefore be measured using this improved</span></span>
<span class="line"><span>approach.</span></span>
<span class="line"><span>8.6 Summary of Key Points</span></span>
<span class="line"><span>1. The magnitude Bode diagrams of functions which vary as ( f/ f0)n have slopes equal to</span></span>
<span class="line"><span>20n dB per decade, and pass through 0 dB at f= f0.</span></span>
<span class="line"><span>2. It is good practice to express transfer functions in normalized pole-zero form; this form</span></span>
<span class="line"><span>directly exposes expressions for the salient features of the response, that is, the corner</span></span>
<span class="line"><span>frequencies, reference gain, etc.</span></span>
<span class="line"><span>3. The right half-plane zero exhibits the magnitude response of the left half-plane zero, but</span></span>
<span class="line"><span>the phase response of the pole.</span></span>
<span class="line"><span>4. Poles and zeroes can be expressed in frequency-inverted form when it is desirable to refer</span></span>
<span class="line"><span>the gain to a high-frequency asymptote.</span></span>
<span class="line"><span>5. A two-pole response can be written in the standard normalized form of Eq. ( 8.58). When</span></span>
<span class="line"><span>Q&gt; 0.5, the poles are complex conjugates. The magnitude response then exhibits peaking</span></span>
<span class="line"><span>in the vicinity of the corner frequency, with an exact value of Q at f = f0.H i g hQ also</span></span>
<span class="line"><span>causes the phase to change sharply near the corner frequency.</span></span>
<span class="line"><span>6. When Q is less than 0.5, the two-pole response can be plotted as two real poles. The low-</span></span>
<span class="line"><span>Q approximation predicts that the two poles occur at frequencies f0/Q and Qf 0. These</span></span>
<span class="line"><span>frequencies are within 10% of the exact values for Q≤0.3.</span></span>
<span class="line"><span>7. When a circuit includes two damping elements, the composite Q-factor can be estimated</span></span>
<span class="line"><span>as the “parallel combination” (inverse addition) of the Q-factors determined by the two</span></span>
<span class="line"><span>elements individually. This estimation is within 10% of the exact value when the product</span></span>
<span class="line"><span>of the individual Q-factors is greater than 5.</span></span>
<span class="line"><span>8. The low- Q approximation can be extended to ﬁnd approximate roots of an arbitrary-degree</span></span>
<span class="line"><span>polynomial. Approximate analytical expressions for the salient features can be derived.</span></span>
<span class="line"><span>Numerical values are used to justify the approximations.</span></span>
<span class="line"><span>9. Salient features of the transfer functions of the buck, boost, and buck–boost converters are</span></span>
<span class="line"><span>tabulated in Sect. 8.2.2. The line-to-output transfer functions of these converters contain</span></span>
<span class="line"><span>two poles. Their control-to-output transfer functions contain two poles, and may addition-</span></span>
<span class="line"><span>ally contain a right half-plane zero.</span></span>
<span class="line"><span>10. Approximate magnitude asymptotes of impedances and transfer functions can be easily</span></span>
<span class="line"><span>derived by graphical construction. This approach is a useful supplement to conventional</span></span>
<span class="line"><span>analysis, because it yields physical insight into the circuit behavior, and because it exposes</span></span>
<span class="line"><span>suitable approximations. Several examples, including the impedances of basic series and</span></span>
<span class="line"><span>parallel resonant circuits and the transfer function H(s) of the voltage divider circuit, are</span></span>
<span class="line"><span>worked in Sect. 8.3. The input impedance, output impedance, and transfer functions of the</span></span>
<span class="line"><span>buck converter are constructed in Sect.8.4, and physical origins of the asymptotes, corner</span></span>
<span class="line"><span>frequencies, and Q-factor are found.</span></span>
<span class="line"><span>11. Measurement of transfer functions and impedances using a network analyzer is discussed</span></span>
<span class="line"><span>in Sect. 8.5. Careful attention to ground connections is important when measuring small</span></span>
<span class="line"><span>impedances.</span></span></code></pre></div>`,10)])])}const f=s(l,[["render",i]]);export{h as __pageData,f as default};
