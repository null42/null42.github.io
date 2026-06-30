const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/VPLocalSearchBox.CmRwRwOh.js","assets/chunks/framework.B5tqjWbr.js"])))=>i.map(i=>d[i]);
import{d as h,c as l,r as u,n as I,o as a,a as U,t as w,b as y,w as v,T as de,e as f,_ as k,u as Ce,i as He,f as Ge,g as pe,h as C,j as d,k as r,l as O,m as re,p as M,q as W,s as Q,v as H,x as me,y as ve,z as Ee,A as Re,F as S,B as T,C as q,D as Y,E as P,G as $e,H as N,I as Ve,J as X,K as R,L as Z,M as Ue,N as we,O as ie,P as Me,Q as Le,R as ee,S as Oe,U as qe,V as Se,W as Ie,X as xe,Y as ze,Z as Ke,$ as je,a0 as Je,a1 as Qe,a2 as se,a3 as Ye,a4 as Pe}from"./framework.B5tqjWbr.js";const Xe=h({__name:"VPBadge",props:{text:{},type:{default:"tip"}},setup(e){return(n,t)=>(a(),l("span",{class:I(["VPBadge",e.type])},[u(n.$slots,"default",{},()=>[U(w(e.text),1)])],2))}}),Ze={key:0,class:"VPBackdrop"},en=h({__name:"VPBackdrop",props:{show:{type:Boolean}},setup(e){return(n,t)=>(a(),y(de,{name:"fade"},{default:v(()=>[e.show?(a(),l("div",Ze)):f("",!0)]),_:1}))}}),nn=k(en,[["__scopeId","data-v-54a304ca"]]),V=Ce;function tn(e,n){let t,o=!1;return()=>{t&&clearTimeout(t),o?t=setTimeout(e,n):(e(),(o=!0)&&setTimeout(()=>o=!1,n))}}function le(e){return e.startsWith("/")?e:`/${e}`}function fe(e){const{pathname:n,search:t,hash:o,protocol:s}=new URL(e,"http://a.com");if(He(e)||e.startsWith("#")||!s.startsWith("http")||!Ge(n))return e;const{site:i}=V(),c=n.endsWith("/")||n.endsWith(".html")?e:e.replace(/(?:(^\.+)\/)?.*$/,`$1${n.replace(/(\.md)?$/,i.value.cleanUrls?"":".html")}${t}${o}`);return pe(c)}function K({correspondingLink:e=!1}={}){const{site:n,localeIndex:t,page:o,theme:s,hash:i}=V(),c=C(()=>{var p,_;return{label:(p=n.value.locales[t.value])==null?void 0:p.label,link:((_=n.value.locales[t.value])==null?void 0:_.link)||(t.value==="root"?"/":`/${t.value}/`)}});return{localeLinks:C(()=>Object.entries(n.value.locales).flatMap(([p,_])=>c.value.label===_.label?[]:{text:_.label,link:on(_.link||(p==="root"?"/":`/${p}/`),s.value.i18nRouting!==!1&&e,o.value.relativePath.slice(c.value.link.length-1),!n.value.cleanUrls)+i.value})),currentLang:c}}function on(e,n,t,o){return n?e.replace(/\/$/,"")+le(t.replace(/(^|\/)index\.md$/,"$1").replace(/\.md$/,o?".html":"")):e}const sn={class:"NotFound"},an={class:"code"},rn={class:"title"},ln={class:"quote"},cn={class:"action"},un=["href","aria-label"],dn=h({__name:"NotFound",setup(e){const{theme:n}=V(),{currentLang:t}=K();return(o,s)=>{var i,c,m,p,_;return a(),l("div",sn,[d("p",an,w(((i=r(n).notFound)==null?void 0:i.code)??"404"),1),d("h1",rn,w(((c=r(n).notFound)==null?void 0:c.title)??"PAGE NOT FOUND"),1),s[0]||(s[0]=d("div",{class:"divider"},null,-1)),d("blockquote",ln,w(((m=r(n).notFound)==null?void 0:m.quote)??"But if you don't change your direction, and if you keep looking, you may end up where you are heading."),1),d("div",cn,[d("a",{class:"link",href:r(pe)(r(t).link),"aria-label":((p=r(n).notFound)==null?void 0:p.linkLabel)??"go to home"},w(((_=r(n).notFound)==null?void 0:_.linkText)??"Take me home"),9,un)])])}}}),pn=k(dn,[["__scopeId","data-v-6ff51ddd"]]);function De(e,n){if(Array.isArray(e))return j(e);if(e==null)return[];n=le(n);const t=Object.keys(e).sort((s,i)=>i.split("/").length-s.split("/").length).find(s=>n.startsWith(le(s))),o=t?e[t]:[];return Array.isArray(o)?j(o):j(o.items,o.base)}function mn(e){const n=[];let t=0;for(const o in e){const s=e[o];if(s.items){t=n.push(s);continue}n[t]||n.push({items:[]}),n[t].items.push(s)}return n}function vn(e){const n=[];function t(o){for(const s of o)s.text&&s.link&&n.push({text:s.text,link:s.link,docFooterText:s.docFooterText}),s.items&&t(s.items)}return t(e),n}function ce(e,n){return Array.isArray(n)?n.some(t=>ce(e,t)):O(e,n.link)?!0:n.items?ce(e,n.items):!1}function j(e,n){return[...e].map(t=>{const o={...t},s=o.base||n;return s&&o.link&&(o.link=s+o.link),o.items&&(o.items=j(o.items,s)),o})}function G(){const{frontmatter:e,page:n,theme:t}=V(),o=re("(min-width: 960px)"),s=M(!1),i=C(()=>{const D=t.value.sidebar,F=n.value.relativePath;return D?De(D,F):[]}),c=M(i.value);W(i,(D,F)=>{JSON.stringify(D)!==JSON.stringify(F)&&(c.value=i.value)});const m=C(()=>e.value.sidebar!==!1&&c.value.length>0&&e.value.layout!=="home"),p=C(()=>_?e.value.aside==null?t.value.aside==="left":e.value.aside==="left":!1),_=C(()=>e.value.layout==="home"?!1:e.value.aside!=null?!!e.value.aside:t.value.aside!==!1),g=C(()=>m.value&&o.value),b=C(()=>m.value?mn(c.value):[]);function $(){s.value=!0}function L(){s.value=!1}function x(){s.value?L():$()}return{isOpen:s,sidebar:c,sidebarGroups:b,hasSidebar:m,hasAside:_,leftAside:p,isSidebarEnabled:g,open:$,close:L,toggle:x}}function fn(e,n){let t;Q(()=>{t=e.value?document.activeElement:void 0}),H(()=>{window.addEventListener("keyup",o)}),me(()=>{window.removeEventListener("keyup",o)});function o(s){s.key==="Escape"&&e.value&&(n(),t==null||t.focus())}}function hn(e){const{page:n,hash:t}=V(),o=M(!1),s=C(()=>e.value.collapsed!=null),i=C(()=>!!e.value.link),c=M(!1),m=()=>{c.value=O(n.value.relativePath,e.value.link)};W([n,e,t],m),H(m);const p=C(()=>c.value?!0:e.value.items?ce(n.value.relativePath,e.value.items):!1),_=C(()=>!!(e.value.items&&e.value.items.length));Q(()=>{o.value=!!(s.value&&e.value.collapsed)}),ve(()=>{(c.value||p.value)&&(o.value=!1)});function g(){s.value&&(o.value=!o.value)}return{collapsed:o,collapsible:s,isLink:i,isActiveLink:c,hasActiveLink:p,hasChildren:_,toggle:g}}function _n(){const{hasSidebar:e}=G(),n=re("(min-width: 960px)"),t=re("(min-width: 1280px)");return{isAsideEnabled:C(()=>!t.value&&!n.value?!1:e.value?t.value:n.value)}}const gn=/\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/,ue=[];function Te(e){return typeof e.outline=="object"&&!Array.isArray(e.outline)&&e.outline.label||e.outlineTitle||"On this page"}function he(e){const n=[...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")].filter(t=>t.id&&t.hasChildNodes()).map(t=>{const o=Number(t.tagName[1]);return{element:t,title:yn(t),link:"#"+t.id,level:o}});return bn(n,e)}function yn(e){let n="";for(const t of e.childNodes)if(t.nodeType===1){if(gn.test(t.className))continue;n+=t.textContent}else t.nodeType===3&&(n+=t.textContent);return n.trim()}function bn(e,n){if(n===!1)return[];const t=(typeof n=="object"&&!Array.isArray(n)?n.level:n)||2,[o,s]=typeof t=="number"?[t,t]:t==="deep"?[2,6]:t;return Cn(e,o,s)}function Pn(e,n){const{isAsideEnabled:t}=_n(),o=tn(i,100);let s=null;H(()=>{requestAnimationFrame(i),window.addEventListener("scroll",o)}),Ee(()=>{c(location.hash)}),me(()=>{window.removeEventListener("scroll",o)});function i(){if(!t.value)return;const m=window.scrollY,p=window.innerHeight,_=document.body.offsetHeight,g=Math.abs(m+p-_)<1,b=ue.map(({element:L,link:x})=>({link:x,top:kn(L)})).filter(({top:L})=>!Number.isNaN(L)).sort((L,x)=>L.top-x.top);if(!b.length){c(null);return}if(m<1){c(null);return}if(g){c(b[b.length-1].link);return}let $=null;for(const{link:L,top:x}of b){if(x>m+Re()+4)break;$=L}c($)}function c(m){s&&s.classList.remove("active"),m==null?s=null:s=e.value.querySelector(`a[href="${decodeURIComponent(m)}"]`);const p=s;p?(p.classList.add("active"),n.value.style.top=p.offsetTop+39+"px",n.value.style.opacity="1"):(n.value.style.top="33px",n.value.style.opacity="0")}}function kn(e){let n=0;for(;e!==document.body;){if(e===null)return NaN;n+=e.offsetTop,e=e.offsetParent}return n}function Cn(e,n,t){ue.length=0;const o=[],s=[];return e.forEach(i=>{const c={...i,children:[]};let m=s[s.length-1];for(;m&&m.level>=c.level;)s.pop(),m=s[s.length-1];if(c.element.classList.contains("ignore-header")||m&&"shouldIgnore"in m){s.push({level:c.level,shouldIgnore:!0});return}c.level>t||c.level<n||(ue.push({element:c.element,link:c.link}),m?m.children.push(c):o.push(c),s.push(c))}),o}const $n=["href","title"],Vn=h({__name:"VPDocOutlineItem",props:{headers:{},root:{type:Boolean}},setup(e){function n({target:t}){const o=t.href.split("#")[1],s=document.getElementById(decodeURIComponent(o));s==null||s.focus({preventScroll:!0})}return(t,o)=>{const s=q("VPDocOutlineItem",!0);return a(),l("ul",{class:I(["VPDocOutlineItem",e.root?"root":"nested"])},[(a(!0),l(S,null,T(e.headers,({children:i,link:c,title:m})=>(a(),l("li",null,[d("a",{class:"outline-link",href:c,onClick:n,title:m},w(m),9,$n),i!=null&&i.length?(a(),y(s,{key:0,headers:i},null,8,["headers"])):f("",!0)]))),256))],2)}}}),Fe=k(Vn,[["__scopeId","data-v-53c99d69"]]),wn={class:"content"},Mn={"aria-level":"2",class:"outline-title",id:"doc-outline-aria-label",role:"heading"},Ln=h({__name:"VPDocAsideOutline",setup(e){const{frontmatter:n,theme:t}=V(),o=$e([]);Y(()=>{o.value=he(n.value.outline??t.value.outline)});const s=M(),i=M();return Pn(s,i),(c,m)=>(a(),l("nav",{"aria-labelledby":"doc-outline-aria-label",class:I(["VPDocAsideOutline",{"has-outline":o.value.length>0}]),ref_key:"container",ref:s},[d("div",wn,[d("div",{class:"outline-marker",ref_key:"marker",ref:i},null,512),d("div",Mn,w(r(Te)(r(t))),1),P(Fe,{headers:o.value,root:!0},null,8,["headers"])])],2))}}),Sn=k(Ln,[["__scopeId","data-v-f610f197"]]),In={class:"VPDocAsideCarbonAds"},xn=h({__name:"VPDocAsideCarbonAds",props:{carbonAds:{}},setup(e){const n=()=>null;return(t,o)=>(a(),l("div",In,[P(r(n),{"carbon-ads":e.carbonAds},null,8,["carbon-ads"])]))}}),Dn={class:"VPDocAside"},Tn=h({__name:"VPDocAside",setup(e){const{theme:n}=V();return(t,o)=>(a(),l("div",Dn,[u(t.$slots,"aside-top",{},void 0,!0),u(t.$slots,"aside-outline-before",{},void 0,!0),P(Sn),u(t.$slots,"aside-outline-after",{},void 0,!0),o[0]||(o[0]=d("div",{class:"spacer"},null,-1)),u(t.$slots,"aside-ads-before",{},void 0,!0),r(n).carbonAds?(a(),y(xn,{key:0,"carbon-ads":r(n).carbonAds},null,8,["carbon-ads"])):f("",!0),u(t.$slots,"aside-ads-after",{},void 0,!0),u(t.$slots,"aside-bottom",{},void 0,!0)]))}}),Fn=k(Tn,[["__scopeId","data-v-cb998dce"]]);function An(){const{theme:e,page:n}=V();return C(()=>{const{text:t="Edit this page",pattern:o=""}=e.value.editLink||{};let s;return typeof o=="function"?s=o(n.value):s=o.replace(/:path/g,n.value.filePath),{url:s,text:t}})}function Nn(){const{page:e,theme:n,frontmatter:t}=V();return C(()=>{var _,g,b,$,L,x,D,F;const o=De(n.value.sidebar,e.value.relativePath),s=vn(o),i=Bn(s,A=>A.link.replace(/[?#].*$/,"")),c=i.findIndex(A=>O(e.value.relativePath,A.link)),m=((_=n.value.docFooter)==null?void 0:_.prev)===!1&&!t.value.prev||t.value.prev===!1,p=((g=n.value.docFooter)==null?void 0:g.next)===!1&&!t.value.next||t.value.next===!1;return{prev:m?void 0:{text:(typeof t.value.prev=="string"?t.value.prev:typeof t.value.prev=="object"?t.value.prev.text:void 0)??((b=i[c-1])==null?void 0:b.docFooterText)??(($=i[c-1])==null?void 0:$.text),link:(typeof t.value.prev=="object"?t.value.prev.link:void 0)??((L=i[c-1])==null?void 0:L.link)},next:p?void 0:{text:(typeof t.value.next=="string"?t.value.next:typeof t.value.next=="object"?t.value.next.text:void 0)??((x=i[c+1])==null?void 0:x.docFooterText)??((D=i[c+1])==null?void 0:D.text),link:(typeof t.value.next=="object"?t.value.next.link:void 0)??((F=i[c+1])==null?void 0:F.link)}}})}function Bn(e,n){const t=new Set;return e.filter(o=>{const s=n(o);return t.has(s)?!1:t.add(s)})}const B=h({__name:"VPLink",props:{tag:{},href:{},noIcon:{type:Boolean},target:{},rel:{}},setup(e){const n=e,t=C(()=>n.tag??(n.href?"a":"span")),o=C(()=>n.href&&Ve.test(n.href)||n.target==="_blank");return(s,i)=>(a(),y(N(t.value),{class:I(["VPLink",{link:e.href,"vp-external-link-icon":o.value,"no-icon":e.noIcon}]),href:e.href?r(fe)(e.href):void 0,target:e.target??(o.value?"_blank":void 0),rel:e.rel??(o.value?"noreferrer":void 0)},{default:v(()=>[u(s.$slots,"default")]),_:3},8,["class","href","target","rel"]))}}),Wn={class:"VPLastUpdated"},Hn=["datetime"],Gn=h({__name:"VPDocFooterLastUpdated",setup(e){const{theme:n,page:t,lang:o}=V(),s=C(()=>new Date(t.value.lastUpdated)),i=C(()=>s.value.toISOString()),c=M("");return H(()=>{Q(()=>{var m,p,_;c.value=new Intl.DateTimeFormat((p=(m=n.value.lastUpdated)==null?void 0:m.formatOptions)!=null&&p.forceLocale?o.value:void 0,((_=n.value.lastUpdated)==null?void 0:_.formatOptions)??{dateStyle:"short",timeStyle:"short"}).format(s.value)})}),(m,p)=>{var _;return a(),l("p",Wn,[U(w(((_=r(n).lastUpdated)==null?void 0:_.text)||r(n).lastUpdatedText||"Last updated")+": ",1),d("time",{datetime:i.value},w(c.value),9,Hn)])}}}),En=k(Gn,[["__scopeId","data-v-1bb0c8a8"]]),Rn={key:0,class:"VPDocFooter"},Un={key:0,class:"edit-info"},On={key:0,class:"edit-link"},qn={key:1,class:"last-updated"},zn={key:1,class:"prev-next","aria-labelledby":"doc-footer-aria-label"},Kn={class:"pager"},jn=["innerHTML"],Jn=["innerHTML"],Qn={class:"pager"},Yn=["innerHTML"],Xn=["innerHTML"],Zn=h({__name:"VPDocFooter",setup(e){const{theme:n,page:t,frontmatter:o}=V(),s=An(),i=Nn(),c=C(()=>n.value.editLink&&o.value.editLink!==!1),m=C(()=>t.value.lastUpdated),p=C(()=>c.value||m.value||i.value.prev||i.value.next);return(_,g)=>{var b,$,L,x;return p.value?(a(),l("footer",Rn,[u(_.$slots,"doc-footer-before",{},void 0,!0),c.value||m.value?(a(),l("div",Un,[c.value?(a(),l("div",On,[P(B,{class:"edit-link-button",href:r(s).url,"no-icon":!0},{default:v(()=>[g[0]||(g[0]=d("span",{class:"vpi-square-pen edit-link-icon"},null,-1)),U(" "+w(r(s).text),1)]),_:1},8,["href"])])):f("",!0),m.value?(a(),l("div",qn,[P(En)])):f("",!0)])):f("",!0),(b=r(i).prev)!=null&&b.link||($=r(i).next)!=null&&$.link?(a(),l("nav",zn,[g[1]||(g[1]=d("span",{class:"visually-hidden",id:"doc-footer-aria-label"},"Pager",-1)),d("div",Kn,[(L=r(i).prev)!=null&&L.link?(a(),y(B,{key:0,class:"pager-link prev",href:r(i).prev.link},{default:v(()=>{var D;return[d("span",{class:"desc",innerHTML:((D=r(n).docFooter)==null?void 0:D.prev)||"Previous page"},null,8,jn),d("span",{class:"title",innerHTML:r(i).prev.text},null,8,Jn)]}),_:1},8,["href"])):f("",!0)]),d("div",Qn,[(x=r(i).next)!=null&&x.link?(a(),y(B,{key:0,class:"pager-link next",href:r(i).next.link},{default:v(()=>{var D;return[d("span",{class:"desc",innerHTML:((D=r(n).docFooter)==null?void 0:D.next)||"Next page"},null,8,Yn),d("span",{class:"title",innerHTML:r(i).next.text},null,8,Xn)]}),_:1},8,["href"])):f("",!0)])])):f("",!0)])):f("",!0)}}}),et=k(Zn,[["__scopeId","data-v-1bcd8184"]]),nt={class:"container"},tt={class:"aside-container"},ot={class:"aside-content"},st={class:"content"},at={class:"content-container"},rt={class:"main"},it=h({__name:"VPDoc",setup(e){const{theme:n}=V(),t=X(),{hasSidebar:o,hasAside:s,leftAside:i}=G(),c=C(()=>t.path.replace(/[./]+/g,"_").replace(/_html$/,""));return(m,p)=>{const _=q("Content");return a(),l("div",{class:I(["VPDoc",{"has-sidebar":r(o),"has-aside":r(s)}])},[u(m.$slots,"doc-top",{},void 0,!0),d("div",nt,[r(s)?(a(),l("div",{key:0,class:I(["aside",{"left-aside":r(i)}])},[p[0]||(p[0]=d("div",{class:"aside-curtain"},null,-1)),d("div",tt,[d("div",ot,[P(Fn,null,{"aside-top":v(()=>[u(m.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":v(()=>[u(m.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":v(()=>[u(m.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":v(()=>[u(m.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":v(()=>[u(m.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":v(()=>[u(m.$slots,"aside-ads-after",{},void 0,!0)]),_:3})])])],2)):f("",!0),d("div",st,[d("div",at,[u(m.$slots,"doc-before",{},void 0,!0),d("main",rt,[P(_,{class:I(["vp-doc",[c.value,r(n).externalLinkIcon&&"external-link-icon-enabled"]])},null,8,["class"])]),P(et,null,{"doc-footer-before":v(()=>[u(m.$slots,"doc-footer-before",{},void 0,!0)]),_:3}),u(m.$slots,"doc-after",{},void 0,!0)])])]),u(m.$slots,"doc-bottom",{},void 0,!0)],2)}}}),lt=k(it,[["__scopeId","data-v-e6f2a212"]]),ct=h({__name:"VPButton",props:{tag:{},size:{default:"medium"},theme:{default:"brand"},text:{},href:{},target:{},rel:{}},setup(e){const n=e,t=C(()=>n.href&&Ve.test(n.href)),o=C(()=>n.tag||(n.href?"a":"button"));return(s,i)=>(a(),y(N(o.value),{class:I(["VPButton",[e.size,e.theme]]),href:e.href?r(fe)(e.href):void 0,target:n.target??(t.value?"_blank":void 0),rel:n.rel??(t.value?"noreferrer":void 0)},{default:v(()=>[U(w(e.text),1)]),_:1},8,["class","href","target","rel"]))}}),ut=k(ct,[["__scopeId","data-v-93dc4167"]]),dt=["src","alt"],pt=h({inheritAttrs:!1,__name:"VPImage",props:{image:{},alt:{}},setup(e){return(n,t)=>{const o=q("VPImage",!0);return e.image?(a(),l(S,{key:0},[typeof e.image=="string"||"src"in e.image?(a(),l("img",R({key:0,class:"VPImage"},typeof e.image=="string"?n.$attrs:{...e.image,...n.$attrs},{src:r(pe)(typeof e.image=="string"?e.image:e.image.src),alt:e.alt??(typeof e.image=="string"?"":e.image.alt||"")}),null,16,dt)):(a(),l(S,{key:1},[P(o,R({class:"dark",image:e.image.dark,alt:e.image.alt},n.$attrs),null,16,["image","alt"]),P(o,R({class:"light",image:e.image.light,alt:e.image.alt},n.$attrs),null,16,["image","alt"])],64))],64)):f("",!0)}}}),J=k(pt,[["__scopeId","data-v-ab19afbb"]]),mt={class:"container"},vt={class:"main"},ft={class:"heading"},ht=["innerHTML"],_t=["innerHTML"],gt=["innerHTML"],yt={key:0,class:"actions"},bt={key:0,class:"image"},Pt={class:"image-container"},kt=h({__name:"VPHero",props:{name:{},text:{},tagline:{},image:{},actions:{}},setup(e){const n=Z("hero-image-slot-exists");return(t,o)=>(a(),l("div",{class:I(["VPHero",{"has-image":e.image||r(n)}])},[d("div",mt,[d("div",vt,[u(t.$slots,"home-hero-info-before",{},void 0,!0),u(t.$slots,"home-hero-info",{},()=>[d("h1",ft,[e.name?(a(),l("span",{key:0,innerHTML:e.name,class:"name clip"},null,8,ht)):f("",!0),e.text?(a(),l("span",{key:1,innerHTML:e.text,class:"text"},null,8,_t)):f("",!0)]),e.tagline?(a(),l("p",{key:0,innerHTML:e.tagline,class:"tagline"},null,8,gt)):f("",!0)],!0),u(t.$slots,"home-hero-info-after",{},void 0,!0),e.actions?(a(),l("div",yt,[(a(!0),l(S,null,T(e.actions,s=>(a(),l("div",{key:s.link,class:"action"},[P(ut,{tag:"a",size:"medium",theme:s.theme,text:s.text,href:s.link,target:s.target,rel:s.rel},null,8,["theme","text","href","target","rel"])]))),128))])):f("",!0),u(t.$slots,"home-hero-actions-after",{},void 0,!0)]),e.image||r(n)?(a(),l("div",bt,[d("div",Pt,[o[0]||(o[0]=d("div",{class:"image-bg"},null,-1)),u(t.$slots,"home-hero-image",{},()=>[e.image?(a(),y(J,{key:0,class:"image-src",image:e.image},null,8,["image"])):f("",!0)],!0)])])):f("",!0)])],2))}}),Ct=k(kt,[["__scopeId","data-v-dd8814ff"]]),$t=h({__name:"VPHomeHero",setup(e){const{frontmatter:n}=V();return(t,o)=>r(n).hero?(a(),y(Ct,{key:0,class:"VPHomeHero",name:r(n).hero.name,text:r(n).hero.text,tagline:r(n).hero.tagline,image:r(n).hero.image,actions:r(n).hero.actions},{"home-hero-info-before":v(()=>[u(t.$slots,"home-hero-info-before")]),"home-hero-info":v(()=>[u(t.$slots,"home-hero-info")]),"home-hero-info-after":v(()=>[u(t.$slots,"home-hero-info-after")]),"home-hero-actions-after":v(()=>[u(t.$slots,"home-hero-actions-after")]),"home-hero-image":v(()=>[u(t.$slots,"home-hero-image")]),_:3},8,["name","text","tagline","image","actions"])):f("",!0)}}),Vt={class:"box"},wt={key:0,class:"icon"},Mt=["innerHTML"],Lt=["innerHTML"],St=["innerHTML"],It={key:4,class:"link-text"},xt={class:"link-text-value"},Dt=h({__name:"VPFeature",props:{icon:{},title:{},details:{},link:{},linkText:{},rel:{},target:{}},setup(e){return(n,t)=>(a(),y(B,{class:"VPFeature",href:e.link,rel:e.rel,target:e.target,"no-icon":!0,tag:e.link?"a":"div"},{default:v(()=>[d("article",Vt,[typeof e.icon=="object"&&e.icon.wrap?(a(),l("div",wt,[P(J,{image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])])):typeof e.icon=="object"?(a(),y(J,{key:1,image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])):e.icon?(a(),l("div",{key:2,class:"icon",innerHTML:e.icon},null,8,Mt)):f("",!0),d("h2",{class:"title",innerHTML:e.title},null,8,Lt),e.details?(a(),l("p",{key:3,class:"details",innerHTML:e.details},null,8,St)):f("",!0),e.linkText?(a(),l("div",It,[d("p",xt,[U(w(e.linkText)+" ",1),t[0]||(t[0]=d("span",{class:"vpi-arrow-right link-text-icon"},null,-1))])])):f("",!0)])]),_:1},8,["href","rel","target","tag"]))}}),Tt=k(Dt,[["__scopeId","data-v-bd37d1a2"]]),Ft={key:0,class:"VPFeatures"},At={class:"container"},Nt={class:"items"},Bt=h({__name:"VPFeatures",props:{features:{}},setup(e){const n=e,t=C(()=>{const o=n.features.length;if(o){if(o===2)return"grid-2";if(o===3)return"grid-3";if(o%3===0)return"grid-6";if(o>3)return"grid-4"}else return});return(o,s)=>e.features?(a(),l("div",Ft,[d("div",At,[d("div",Nt,[(a(!0),l(S,null,T(e.features,i=>(a(),l("div",{key:i.title,class:I(["item",[t.value]])},[P(Tt,{icon:i.icon,title:i.title,details:i.details,link:i.link,"link-text":i.linkText,rel:i.rel,target:i.target},null,8,["icon","title","details","link","link-text","rel","target"])],2))),128))])])])):f("",!0)}}),Wt=k(Bt,[["__scopeId","data-v-b1eea84a"]]),Ht=h({__name:"VPHomeFeatures",setup(e){const{frontmatter:n}=V();return(t,o)=>r(n).features?(a(),y(Wt,{key:0,class:"VPHomeFeatures",features:r(n).features},null,8,["features"])):f("",!0)}}),Gt=h({__name:"VPHomeContent",setup(e){const{width:n}=Ue({initialWidth:0,includeScrollbar:!1});return(t,o)=>(a(),l("div",{class:"vp-doc container",style:we(r(n)?{"--vp-offset":`calc(50% - ${r(n)/2}px)`}:{})},[u(t.$slots,"default",{},void 0,!0)],4))}}),Et=k(Gt,[["__scopeId","data-v-c141a4bd"]]),Rt=h({__name:"VPHome",setup(e){const{frontmatter:n,theme:t}=V();return(o,s)=>{const i=q("Content");return a(),l("div",{class:I(["VPHome",{"external-link-icon-enabled":r(t).externalLinkIcon}])},[u(o.$slots,"home-hero-before",{},void 0,!0),P($t,null,{"home-hero-info-before":v(()=>[u(o.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":v(()=>[u(o.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":v(()=>[u(o.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":v(()=>[u(o.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":v(()=>[u(o.$slots,"home-hero-image",{},void 0,!0)]),_:3}),u(o.$slots,"home-hero-after",{},void 0,!0),u(o.$slots,"home-features-before",{},void 0,!0),P(Ht),u(o.$slots,"home-features-after",{},void 0,!0),r(n).markdownStyles!==!1?(a(),y(Et,{key:0},{default:v(()=>[P(i)]),_:1})):(a(),y(i,{key:1}))],2)}}}),Ut=k(Rt,[["__scopeId","data-v-e07eaea7"]]),Ot={},qt={class:"VPPage"};function zt(e,n){const t=q("Content");return a(),l("div",qt,[u(e.$slots,"page-top"),P(t),u(e.$slots,"page-bottom")])}const Kt=k(Ot,[["render",zt]]),jt=h({__name:"VPContent",setup(e){const{page:n,frontmatter:t}=V(),{hasSidebar:o}=G();return(s,i)=>(a(),l("div",{class:I(["VPContent",{"has-sidebar":r(o),"is-home":r(t).layout==="home"}]),id:"VPContent"},[r(n).isNotFound?u(s.$slots,"not-found",{key:0},()=>[P(pn)],!0):r(t).layout==="page"?(a(),y(Kt,{key:1},{"page-top":v(()=>[u(s.$slots,"page-top",{},void 0,!0)]),"page-bottom":v(()=>[u(s.$slots,"page-bottom",{},void 0,!0)]),_:3})):r(t).layout==="home"?(a(),y(Ut,{key:2},{"home-hero-before":v(()=>[u(s.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":v(()=>[u(s.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":v(()=>[u(s.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":v(()=>[u(s.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":v(()=>[u(s.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":v(()=>[u(s.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":v(()=>[u(s.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":v(()=>[u(s.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":v(()=>[u(s.$slots,"home-features-after",{},void 0,!0)]),_:3})):r(t).layout&&r(t).layout!=="doc"?(a(),y(N(r(t).layout),{key:3})):(a(),y(lt,{key:4},{"doc-top":v(()=>[u(s.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":v(()=>[u(s.$slots,"doc-bottom",{},void 0,!0)]),"doc-footer-before":v(()=>[u(s.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":v(()=>[u(s.$slots,"doc-before",{},void 0,!0)]),"doc-after":v(()=>[u(s.$slots,"doc-after",{},void 0,!0)]),"aside-top":v(()=>[u(s.$slots,"aside-top",{},void 0,!0)]),"aside-outline-before":v(()=>[u(s.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":v(()=>[u(s.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":v(()=>[u(s.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":v(()=>[u(s.$slots,"aside-ads-after",{},void 0,!0)]),"aside-bottom":v(()=>[u(s.$slots,"aside-bottom",{},void 0,!0)]),_:3}))],2))}}),Jt=k(jt,[["__scopeId","data-v-9a6c75ad"]]),Qt={class:"container"},Yt=["innerHTML"],Xt=["innerHTML"],Zt=h({__name:"VPFooter",setup(e){const{theme:n,frontmatter:t}=V(),{hasSidebar:o}=G();return(s,i)=>r(n).footer&&r(t).footer!==!1?(a(),l("footer",{key:0,class:I(["VPFooter",{"has-sidebar":r(o)}])},[d("div",Qt,[r(n).footer.message?(a(),l("p",{key:0,class:"message",innerHTML:r(n).footer.message},null,8,Yt)):f("",!0),r(n).footer.copyright?(a(),l("p",{key:1,class:"copyright",innerHTML:r(n).footer.copyright},null,8,Xt)):f("",!0)])],2)):f("",!0)}}),eo=k(Zt,[["__scopeId","data-v-566314d4"]]);function no(){const{theme:e,frontmatter:n}=V(),t=$e([]),o=C(()=>t.value.length>0);return Y(()=>{t.value=he(n.value.outline??e.value.outline)}),{headers:t,hasLocalNav:o}}const to={class:"menu-text"},oo={class:"header"},so={class:"outline"},ao=h({__name:"VPLocalNavOutlineDropdown",props:{headers:{},navHeight:{}},setup(e){const n=e,{theme:t}=V(),o=M(!1),s=M(0),i=M(),c=M();function m(b){var $;($=i.value)!=null&&$.contains(b.target)||(o.value=!1)}W(o,b=>{if(b){document.addEventListener("click",m);return}document.removeEventListener("click",m)}),ie("Escape",()=>{o.value=!1}),Y(()=>{o.value=!1});function p(){o.value=!o.value,s.value=window.innerHeight+Math.min(window.scrollY-n.navHeight,0)}function _(b){b.target.classList.contains("outline-link")&&(c.value&&(c.value.style.transition="none"),Me(()=>{o.value=!1}))}function g(){o.value=!1,window.scrollTo({top:0,left:0,behavior:"smooth"})}return(b,$)=>(a(),l("div",{class:"VPLocalNavOutlineDropdown",style:we({"--vp-vh":s.value+"px"}),ref_key:"main",ref:i},[e.headers.length>0?(a(),l("button",{key:0,onClick:p,class:I({open:o.value})},[d("span",to,w(r(Te)(r(t))),1),$[0]||($[0]=d("span",{class:"vpi-chevron-right icon"},null,-1))],2)):(a(),l("button",{key:1,onClick:g},w(r(t).returnToTopLabel||"Return to top"),1)),P(de,{name:"flyout"},{default:v(()=>[o.value?(a(),l("div",{key:0,ref_key:"items",ref:c,class:"items",onClick:_},[d("div",oo,[d("a",{class:"top-link",href:"#",onClick:g},w(r(t).returnToTopLabel||"Return to top"),1)]),d("div",so,[P(Fe,{headers:e.headers},null,8,["headers"])])],512)):f("",!0)]),_:1})],4))}}),ro=k(ao,[["__scopeId","data-v-6b867909"]]),io={class:"container"},lo=["aria-expanded"],co={class:"menu-text"},uo=h({__name:"VPLocalNav",props:{open:{type:Boolean}},emits:["open-menu"],setup(e){const{theme:n,frontmatter:t}=V(),{hasSidebar:o}=G(),{headers:s}=no(),{y:i}=Le(),c=M(0);H(()=>{c.value=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vp-nav-height"))}),Y(()=>{s.value=he(t.value.outline??n.value.outline)});const m=C(()=>s.value.length===0),p=C(()=>m.value&&!o.value),_=C(()=>({VPLocalNav:!0,"has-sidebar":o.value,empty:m.value,fixed:p.value}));return(g,b)=>r(t).layout!=="home"&&(!p.value||r(i)>=c.value)?(a(),l("div",{key:0,class:I(_.value)},[d("div",io,[r(o)?(a(),l("button",{key:0,class:"menu","aria-expanded":e.open,"aria-controls":"VPSidebarNav",onClick:b[0]||(b[0]=$=>g.$emit("open-menu"))},[b[1]||(b[1]=d("span",{class:"vpi-align-left menu-icon"},null,-1)),d("span",co,w(r(n).sidebarMenuLabel||"Menu"),1)],8,lo)):f("",!0),P(ro,{headers:r(s),navHeight:c.value},null,8,["headers","navHeight"])])],2)):f("",!0)}}),po=k(uo,[["__scopeId","data-v-2488c25a"]]);function mo(){const e=M(!1);function n(){e.value=!0,window.addEventListener("resize",s)}function t(){e.value=!1,window.removeEventListener("resize",s)}function o(){e.value?t():n()}function s(){window.outerWidth>=768&&t()}const i=X();return W(()=>i.path,t),{isScreenOpen:e,openScreen:n,closeScreen:t,toggleScreen:o}}const vo={},fo={class:"VPSwitch",type:"button",role:"switch"},ho={class:"check"},_o={key:0,class:"icon"};function go(e,n){return a(),l("button",fo,[d("span",ho,[e.$slots.default?(a(),l("span",_o,[u(e.$slots,"default",{},void 0,!0)])):f("",!0)])])}const yo=k(vo,[["render",go],["__scopeId","data-v-b4ccac88"]]),bo=h({__name:"VPSwitchAppearance",setup(e){const{isDark:n,theme:t}=V(),o=Z("toggle-appearance",()=>{n.value=!n.value}),s=M("");return ve(()=>{s.value=n.value?t.value.lightModeSwitchTitle||"Switch to light theme":t.value.darkModeSwitchTitle||"Switch to dark theme"}),(i,c)=>(a(),y(yo,{title:s.value,class:"VPSwitchAppearance","aria-checked":r(n),onClick:r(o)},{default:v(()=>[...c[0]||(c[0]=[d("span",{class:"vpi-sun sun"},null,-1),d("span",{class:"vpi-moon moon"},null,-1)])]),_:1},8,["title","aria-checked","onClick"]))}}),_e=k(bo,[["__scopeId","data-v-be9742d9"]]),Po={key:0,class:"VPNavBarAppearance"},ko=h({__name:"VPNavBarAppearance",setup(e){const{site:n}=V();return(t,o)=>r(n).appearance&&r(n).appearance!=="force-dark"&&r(n).appearance!=="force-auto"?(a(),l("div",Po,[P(_e)])):f("",!0)}}),Co=k(ko,[["__scopeId","data-v-3f90c1a5"]]),ge=M();let Ae=!1,ae=0;function $o(e){const n=M(!1);if(ee){!Ae&&Vo(),ae++;const t=W(ge,o=>{var s,i,c;o===e.el.value||(s=e.el.value)!=null&&s.contains(o)?(n.value=!0,(i=e.onFocus)==null||i.call(e)):(n.value=!1,(c=e.onBlur)==null||c.call(e))});me(()=>{t(),ae--,ae||wo()})}return Oe(n)}function Vo(){document.addEventListener("focusin",Ne),Ae=!0,ge.value=document.activeElement}function wo(){document.removeEventListener("focusin",Ne)}function Ne(){ge.value=document.activeElement}const Mo={class:"VPMenuLink"},Lo=["innerHTML"],So=h({__name:"VPMenuLink",props:{item:{}},setup(e){const{page:n}=V();return(t,o)=>(a(),l("div",Mo,[P(B,{class:I({active:r(O)(r(n).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon},{default:v(()=>[d("span",{innerHTML:e.item.text},null,8,Lo)]),_:1},8,["class","href","target","rel","no-icon"])]))}}),ne=k(So,[["__scopeId","data-v-7eeeb2dc"]]),Io={class:"VPMenuGroup"},xo={key:0,class:"title"},Do=h({__name:"VPMenuGroup",props:{text:{},items:{}},setup(e){return(n,t)=>(a(),l("div",Io,[e.text?(a(),l("p",xo,w(e.text),1)):f("",!0),(a(!0),l(S,null,T(e.items,o=>(a(),l(S,null,["link"in o?(a(),y(ne,{key:0,item:o},null,8,["item"])):f("",!0)],64))),256))]))}}),To=k(Do,[["__scopeId","data-v-a6b0397c"]]),Fo={class:"VPMenu"},Ao={key:0,class:"items"},No=h({__name:"VPMenu",props:{items:{}},setup(e){return(n,t)=>(a(),l("div",Fo,[e.items?(a(),l("div",Ao,[(a(!0),l(S,null,T(e.items,o=>(a(),l(S,{key:JSON.stringify(o)},["link"in o?(a(),y(ne,{key:0,item:o},null,8,["item"])):"component"in o?(a(),y(N(o.component),R({key:1,ref_for:!0},o.props),null,16)):(a(),y(To,{key:2,text:o.text,items:o.items},null,8,["text","items"]))],64))),128))])):f("",!0),u(n.$slots,"default",{},void 0,!0)]))}}),Bo=k(No,[["__scopeId","data-v-20ed86d6"]]),Wo=["aria-expanded","aria-label"],Ho={key:0,class:"text"},Go=["innerHTML"],Eo={key:1,class:"vpi-more-horizontal icon"},Ro={class:"menu"},Uo=h({__name:"VPFlyout",props:{icon:{},button:{},label:{},items:{}},setup(e){const n=M(!1),t=M();$o({el:t,onBlur:o});function o(){n.value=!1}return(s,i)=>(a(),l("div",{class:"VPFlyout",ref_key:"el",ref:t,onMouseenter:i[1]||(i[1]=c=>n.value=!0),onMouseleave:i[2]||(i[2]=c=>n.value=!1)},[d("button",{type:"button",class:"button","aria-haspopup":"true","aria-expanded":n.value,"aria-label":e.label,onClick:i[0]||(i[0]=c=>n.value=!n.value)},[e.button||e.icon?(a(),l("span",Ho,[e.icon?(a(),l("span",{key:0,class:I([e.icon,"option-icon"])},null,2)):f("",!0),e.button?(a(),l("span",{key:1,innerHTML:e.button},null,8,Go)):f("",!0),i[3]||(i[3]=d("span",{class:"vpi-chevron-down text-icon"},null,-1))])):(a(),l("span",Eo))],8,Wo),d("div",Ro,[P(Bo,{items:e.items},{default:v(()=>[u(s.$slots,"default",{},void 0,!0)]),_:3},8,["items"])])],544))}}),ye=k(Uo,[["__scopeId","data-v-bfe7971f"]]),Oo=["href","aria-label","innerHTML"],qo=h({__name:"VPSocialLink",props:{icon:{},link:{},ariaLabel:{}},setup(e){const n=e,t=M();H(async()=>{var i;await Me();const s=(i=t.value)==null?void 0:i.children[0];s instanceof HTMLElement&&s.className.startsWith("vpi-social-")&&(getComputedStyle(s).maskImage||getComputedStyle(s).webkitMaskImage)==="none"&&s.style.setProperty("--icon",`url('https://api.iconify.design/simple-icons/${n.icon}.svg')`)});const o=C(()=>typeof n.icon=="object"?n.icon.svg:`<span class="vpi-social-${n.icon}"></span>`);return(s,i)=>(a(),l("a",{ref_key:"el",ref:t,class:"VPSocialLink no-icon",href:e.link,"aria-label":e.ariaLabel??(typeof e.icon=="string"?e.icon:""),target:"_blank",rel:"noopener",innerHTML:o.value},null,8,Oo))}}),zo=k(qo,[["__scopeId","data-v-60a9a2d3"]]),Ko={class:"VPSocialLinks"},jo=h({__name:"VPSocialLinks",props:{links:{}},setup(e){return(n,t)=>(a(),l("div",Ko,[(a(!0),l(S,null,T(e.links,({link:o,icon:s,ariaLabel:i})=>(a(),y(zo,{key:o,icon:s,link:o,ariaLabel:i},null,8,["icon","link","ariaLabel"]))),128))]))}}),be=k(jo,[["__scopeId","data-v-e71e869c"]]),Jo={key:0,class:"group translations"},Qo={class:"trans-title"},Yo={key:1,class:"group"},Xo={class:"item appearance"},Zo={class:"label"},es={class:"appearance-action"},ns={key:2,class:"group"},ts={class:"item social-links"},os=h({__name:"VPNavBarExtra",setup(e){const{site:n,theme:t}=V(),{localeLinks:o,currentLang:s}=K({correspondingLink:!0}),i=C(()=>o.value.length&&s.value.label||n.value.appearance||t.value.socialLinks);return(c,m)=>i.value?(a(),y(ye,{key:0,class:"VPNavBarExtra",label:"extra navigation"},{default:v(()=>[r(o).length&&r(s).label?(a(),l("div",Jo,[d("p",Qo,w(r(s).label),1),(a(!0),l(S,null,T(r(o),p=>(a(),y(ne,{key:p.link,item:p},null,8,["item"]))),128))])):f("",!0),r(n).appearance&&r(n).appearance!=="force-dark"&&r(n).appearance!=="force-auto"?(a(),l("div",Yo,[d("div",Xo,[d("p",Zo,w(r(t).darkModeSwitchLabel||"Appearance"),1),d("div",es,[P(_e)])])])):f("",!0),r(t).socialLinks?(a(),l("div",ns,[d("div",ts,[P(be,{class:"social-links-list",links:r(t).socialLinks},null,8,["links"])])])):f("",!0)]),_:1})):f("",!0)}}),ss=k(os,[["__scopeId","data-v-f953d92f"]]),as=["aria-expanded"],rs=h({__name:"VPNavBarHamburger",props:{active:{type:Boolean}},emits:["click"],setup(e){return(n,t)=>(a(),l("button",{type:"button",class:I(["VPNavBarHamburger",{active:e.active}]),"aria-label":"mobile navigation","aria-expanded":e.active,"aria-controls":"VPNavScreen",onClick:t[0]||(t[0]=o=>n.$emit("click"))},[...t[1]||(t[1]=[d("span",{class:"container"},[d("span",{class:"top"}),d("span",{class:"middle"}),d("span",{class:"bottom"})],-1)])],10,as))}}),is=k(rs,[["__scopeId","data-v-6bee1efd"]]),ls=["innerHTML"],cs=h({__name:"VPNavBarMenuLink",props:{item:{}},setup(e){const{page:n}=V();return(t,o)=>(a(),y(B,{class:I({VPNavBarMenuLink:!0,active:r(O)(r(n).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,tabindex:"0"},{default:v(()=>[d("span",{innerHTML:e.item.text},null,8,ls)]),_:1},8,["class","href","target","rel","no-icon"]))}}),us=k(cs,[["__scopeId","data-v-815115f5"]]),ds=h({__name:"VPNavBarMenuGroup",props:{item:{}},setup(e){const n=e,{page:t}=V(),o=i=>"component"in i?!1:"link"in i?O(t.value.relativePath,i.link,!!n.item.activeMatch):i.items.some(o),s=C(()=>o(n.item));return(i,c)=>(a(),y(ye,{class:I({VPNavBarMenuGroup:!0,active:r(O)(r(t).relativePath,e.item.activeMatch,!!e.item.activeMatch)||s.value}),button:e.item.text,items:e.item.items},null,8,["class","button","items"]))}}),ps={key:0,"aria-labelledby":"main-nav-aria-label",class:"VPNavBarMenu"},ms=h({__name:"VPNavBarMenu",setup(e){const{theme:n}=V();return(t,o)=>r(n).nav?(a(),l("nav",ps,[o[0]||(o[0]=d("span",{id:"main-nav-aria-label",class:"visually-hidden"}," Main Navigation ",-1)),(a(!0),l(S,null,T(r(n).nav,s=>(a(),l(S,{key:JSON.stringify(s)},["link"in s?(a(),y(us,{key:0,item:s},null,8,["item"])):"component"in s?(a(),y(N(s.component),R({key:1,ref_for:!0},s.props),null,16)):(a(),y(ds,{key:2,item:s},null,8,["item"]))],64))),128))])):f("",!0)}}),vs=k(ms,[["__scopeId","data-v-afb2845e"]]);function fs(e){const{localeIndex:n,theme:t}=V();function o(s){var x,D,F;const i=s.split("."),c=(x=t.value.search)==null?void 0:x.options,m=c&&typeof c=="object",p=m&&((F=(D=c.locales)==null?void 0:D[n.value])==null?void 0:F.translations)||null,_=m&&c.translations||null;let g=p,b=_,$=e;const L=i.pop();for(const A of i){let E=null;const z=$==null?void 0:$[A];z&&(E=$=z);const te=b==null?void 0:b[A];te&&(E=b=te);const oe=g==null?void 0:g[A];oe&&(E=g=oe),z||($=E),te||(b=E),oe||(g=E)}return(g==null?void 0:g[L])??(b==null?void 0:b[L])??($==null?void 0:$[L])??""}return o}const hs=["aria-label"],_s={class:"DocSearch-Button-Container"},gs={class:"DocSearch-Button-Placeholder"},ke=h({__name:"VPNavBarSearchButton",setup(e){const t=fs({button:{buttonText:"Search",buttonAriaLabel:"Search"}});return(o,s)=>(a(),l("button",{type:"button",class:"DocSearch DocSearch-Button","aria-label":r(t)("button.buttonAriaLabel")},[d("span",_s,[s[0]||(s[0]=d("span",{class:"vp-icon DocSearch-Search-Icon"},null,-1)),d("span",gs,w(r(t)("button.buttonText")),1)]),s[1]||(s[1]=d("span",{class:"DocSearch-Button-Keys"},[d("kbd",{class:"DocSearch-Button-Key"}),d("kbd",{class:"DocSearch-Button-Key"},"K")],-1))],8,hs))}}),ys={class:"VPNavBarSearch"},bs={id:"local-search"},Ps={key:1,id:"docsearch"},ks=h({__name:"VPNavBarSearch",setup(e){const n=qe(()=>Se(()=>import("./VPLocalSearchBox.CmRwRwOh.js"),__vite__mapDeps([0,1]))),t=()=>null,{theme:o}=V(),s=M(!1),i=M(!1);H(()=>{});function c(){s.value||(s.value=!0,setTimeout(m,16))}function m(){const b=new Event("keydown");b.key="k",b.metaKey=!0,window.dispatchEvent(b),setTimeout(()=>{document.querySelector(".DocSearch-Modal")||m()},16)}function p(b){const $=b.target,L=$.tagName;return $.isContentEditable||L==="INPUT"||L==="SELECT"||L==="TEXTAREA"}const _=M(!1);ie("k",b=>{(b.ctrlKey||b.metaKey)&&(b.preventDefault(),_.value=!0)}),ie("/",b=>{p(b)||(b.preventDefault(),_.value=!0)});const g="local";return(b,$)=>{var L;return a(),l("div",ys,[r(g)==="local"?(a(),l(S,{key:0},[_.value?(a(),y(r(n),{key:0,onClose:$[0]||($[0]=x=>_.value=!1)})):f("",!0),d("div",bs,[P(ke,{onClick:$[1]||($[1]=x=>_.value=!0)})])],64)):r(g)==="algolia"?(a(),l(S,{key:1},[s.value?(a(),y(r(t),{key:0,algolia:((L=r(o).search)==null?void 0:L.options)??r(o).algolia,onVnodeBeforeMount:$[2]||($[2]=x=>i.value=!0)},null,8,["algolia"])):f("",!0),i.value?f("",!0):(a(),l("div",Ps,[P(ke,{onClick:c})]))],64)):f("",!0)])}}}),Cs=h({__name:"VPNavBarSocialLinks",setup(e){const{theme:n}=V();return(t,o)=>r(n).socialLinks?(a(),y(be,{key:0,class:"VPNavBarSocialLinks",links:r(n).socialLinks},null,8,["links"])):f("",!0)}}),$s=k(Cs,[["__scopeId","data-v-ef6192dc"]]),Vs=["href","rel","target"],ws=["innerHTML"],Ms={key:2},Ls=h({__name:"VPNavBarTitle",setup(e){const{site:n,theme:t}=V(),{hasSidebar:o}=G(),{currentLang:s}=K(),i=C(()=>{var p;return typeof t.value.logoLink=="string"?t.value.logoLink:(p=t.value.logoLink)==null?void 0:p.link}),c=C(()=>{var p;return typeof t.value.logoLink=="string"||(p=t.value.logoLink)==null?void 0:p.rel}),m=C(()=>{var p;return typeof t.value.logoLink=="string"||(p=t.value.logoLink)==null?void 0:p.target});return(p,_)=>(a(),l("div",{class:I(["VPNavBarTitle",{"has-sidebar":r(o)}])},[d("a",{class:"title",href:i.value??r(fe)(r(s).link),rel:c.value,target:m.value},[u(p.$slots,"nav-bar-title-before",{},void 0,!0),r(t).logo?(a(),y(J,{key:0,class:"logo",image:r(t).logo},null,8,["image"])):f("",!0),r(t).siteTitle?(a(),l("span",{key:1,innerHTML:r(t).siteTitle},null,8,ws)):r(t).siteTitle===void 0?(a(),l("span",Ms,w(r(n).title),1)):f("",!0),u(p.$slots,"nav-bar-title-after",{},void 0,!0)],8,Vs)],2))}}),Ss=k(Ls,[["__scopeId","data-v-9f43907a"]]),Is={class:"items"},xs={class:"title"},Ds=h({__name:"VPNavBarTranslations",setup(e){const{theme:n}=V(),{localeLinks:t,currentLang:o}=K({correspondingLink:!0});return(s,i)=>r(t).length&&r(o).label?(a(),y(ye,{key:0,class:"VPNavBarTranslations",icon:"vpi-languages",label:r(n).langMenuLabel||"Change language"},{default:v(()=>[d("div",Is,[d("p",xs,w(r(o).label),1),(a(!0),l(S,null,T(r(t),c=>(a(),y(ne,{key:c.link,item:c},null,8,["item"]))),128))])]),_:1},8,["label"])):f("",!0)}}),Ts=k(Ds,[["__scopeId","data-v-acee064b"]]),Fs={class:"wrapper"},As={class:"container"},Ns={class:"title"},Bs={class:"content"},Ws={class:"content-body"},Hs=h({__name:"VPNavBar",props:{isScreenOpen:{type:Boolean}},emits:["toggle-screen"],setup(e){const n=e,{y:t}=Le(),{hasSidebar:o}=G(),{frontmatter:s}=V(),i=M({});return ve(()=>{i.value={"has-sidebar":o.value,home:s.value.layout==="home",top:t.value===0,"screen-open":n.isScreenOpen}}),(c,m)=>(a(),l("div",{class:I(["VPNavBar",i.value])},[d("div",Fs,[d("div",As,[d("div",Ns,[P(Ss,null,{"nav-bar-title-before":v(()=>[u(c.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":v(()=>[u(c.$slots,"nav-bar-title-after",{},void 0,!0)]),_:3})]),d("div",Bs,[d("div",Ws,[u(c.$slots,"nav-bar-content-before",{},void 0,!0),P(ks,{class:"search"}),P(vs,{class:"menu"}),P(Ts,{class:"translations"}),P(Co,{class:"appearance"}),P($s,{class:"social-links"}),P(ss,{class:"extra"}),u(c.$slots,"nav-bar-content-after",{},void 0,!0),P(is,{class:"hamburger",active:e.isScreenOpen,onClick:m[0]||(m[0]=p=>c.$emit("toggle-screen"))},null,8,["active"])])])])]),m[1]||(m[1]=d("div",{class:"divider"},[d("div",{class:"divider-line"})],-1))],2))}}),Gs=k(Hs,[["__scopeId","data-v-9fd4d1dd"]]),Es={key:0,class:"VPNavScreenAppearance"},Rs={class:"text"},Us=h({__name:"VPNavScreenAppearance",setup(e){const{site:n,theme:t}=V();return(o,s)=>r(n).appearance&&r(n).appearance!=="force-dark"&&r(n).appearance!=="force-auto"?(a(),l("div",Es,[d("p",Rs,w(r(t).darkModeSwitchLabel||"Appearance"),1),P(_e)])):f("",!0)}}),Os=k(Us,[["__scopeId","data-v-a3e2920d"]]),qs=["innerHTML"],zs=h({__name:"VPNavScreenMenuLink",props:{item:{}},setup(e){const n=Z("close-screen");return(t,o)=>(a(),y(B,{class:"VPNavScreenMenuLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:r(n)},{default:v(()=>[d("span",{innerHTML:e.item.text},null,8,qs)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),Ks=k(zs,[["__scopeId","data-v-fa963d97"]]),js=["innerHTML"],Js=h({__name:"VPNavScreenMenuGroupLink",props:{item:{}},setup(e){const n=Z("close-screen");return(t,o)=>(a(),y(B,{class:"VPNavScreenMenuGroupLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:r(n)},{default:v(()=>[d("span",{innerHTML:e.item.text},null,8,js)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),Be=k(Js,[["__scopeId","data-v-e04f3e85"]]),Qs={class:"VPNavScreenMenuGroupSection"},Ys={key:0,class:"title"},Xs=h({__name:"VPNavScreenMenuGroupSection",props:{text:{},items:{}},setup(e){return(n,t)=>(a(),l("div",Qs,[e.text?(a(),l("p",Ys,w(e.text),1)):f("",!0),(a(!0),l(S,null,T(e.items,o=>(a(),y(Be,{key:o.text,item:o},null,8,["item"]))),128))]))}}),Zs=k(Xs,[["__scopeId","data-v-f60dbfa7"]]),ea=["aria-controls","aria-expanded"],na=["innerHTML"],ta=["id"],oa={key:0,class:"item"},sa={key:1,class:"item"},aa={key:2,class:"group"},ra=h({__name:"VPNavScreenMenuGroup",props:{text:{},items:{}},setup(e){const n=e,t=M(!1),o=C(()=>`NavScreenGroup-${n.text.replace(" ","-").toLowerCase()}`);function s(){t.value=!t.value}return(i,c)=>(a(),l("div",{class:I(["VPNavScreenMenuGroup",{open:t.value}])},[d("button",{class:"button","aria-controls":o.value,"aria-expanded":t.value,onClick:s},[d("span",{class:"button-text",innerHTML:e.text},null,8,na),c[0]||(c[0]=d("span",{class:"vpi-plus button-icon"},null,-1))],8,ea),d("div",{id:o.value,class:"items"},[(a(!0),l(S,null,T(e.items,m=>(a(),l(S,{key:JSON.stringify(m)},["link"in m?(a(),l("div",oa,[P(Be,{item:m},null,8,["item"])])):"component"in m?(a(),l("div",sa,[(a(),y(N(m.component),R({ref_for:!0},m.props,{"screen-menu":""}),null,16))])):(a(),l("div",aa,[P(Zs,{text:m.text,items:m.items},null,8,["text","items"])]))],64))),128))],8,ta)],2))}}),ia=k(ra,[["__scopeId","data-v-d99bfeec"]]),la={key:0,class:"VPNavScreenMenu"},ca=h({__name:"VPNavScreenMenu",setup(e){const{theme:n}=V();return(t,o)=>r(n).nav?(a(),l("nav",la,[(a(!0),l(S,null,T(r(n).nav,s=>(a(),l(S,{key:JSON.stringify(s)},["link"in s?(a(),y(Ks,{key:0,item:s},null,8,["item"])):"component"in s?(a(),y(N(s.component),R({key:1,ref_for:!0},s.props,{"screen-menu":""}),null,16)):(a(),y(ia,{key:2,text:s.text||"",items:s.items},null,8,["text","items"]))],64))),128))])):f("",!0)}}),ua=h({__name:"VPNavScreenSocialLinks",setup(e){const{theme:n}=V();return(t,o)=>r(n).socialLinks?(a(),y(be,{key:0,class:"VPNavScreenSocialLinks",links:r(n).socialLinks},null,8,["links"])):f("",!0)}}),da={class:"list"},pa=h({__name:"VPNavScreenTranslations",setup(e){const{localeLinks:n,currentLang:t}=K({correspondingLink:!0}),o=M(!1);function s(){o.value=!o.value}return(i,c)=>r(n).length&&r(t).label?(a(),l("div",{key:0,class:I(["VPNavScreenTranslations",{open:o.value}])},[d("button",{class:"title",onClick:s},[c[0]||(c[0]=d("span",{class:"vpi-languages icon lang"},null,-1)),U(" "+w(r(t).label)+" ",1),c[1]||(c[1]=d("span",{class:"vpi-chevron-down icon chevron"},null,-1))]),d("ul",da,[(a(!0),l(S,null,T(r(n),m=>(a(),l("li",{key:m.link,class:"item"},[P(B,{class:"link",href:m.link},{default:v(()=>[U(w(m.text),1)]),_:2},1032,["href"])]))),128))])],2)):f("",!0)}}),ma=k(pa,[["__scopeId","data-v-516e4bc3"]]),va={class:"container"},fa=h({__name:"VPNavScreen",props:{open:{type:Boolean}},setup(e){const n=M(null),t=Ie(ee?document.body:null);return(o,s)=>(a(),y(de,{name:"fade",onEnter:s[0]||(s[0]=i=>t.value=!0),onAfterLeave:s[1]||(s[1]=i=>t.value=!1)},{default:v(()=>[e.open?(a(),l("div",{key:0,class:"VPNavScreen",ref_key:"screen",ref:n,id:"VPNavScreen"},[d("div",va,[u(o.$slots,"nav-screen-content-before",{},void 0,!0),P(ca,{class:"menu"}),P(ma,{class:"translations"}),P(Os,{class:"appearance"}),P(ua,{class:"social-links"}),u(o.$slots,"nav-screen-content-after",{},void 0,!0)])],512)):f("",!0)]),_:3}))}}),ha=k(fa,[["__scopeId","data-v-2dd6d0c7"]]),_a={key:0,class:"VPNav"},ga=h({__name:"VPNav",setup(e){const{isScreenOpen:n,closeScreen:t,toggleScreen:o}=mo(),{frontmatter:s}=V(),i=C(()=>s.value.navbar!==!1);return xe("close-screen",t),Q(()=>{ee&&document.documentElement.classList.toggle("hide-nav",!i.value)}),(c,m)=>i.value?(a(),l("header",_a,[P(Gs,{"is-screen-open":r(n),onToggleScreen:r(o)},{"nav-bar-title-before":v(()=>[u(c.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":v(()=>[u(c.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":v(()=>[u(c.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":v(()=>[u(c.$slots,"nav-bar-content-after",{},void 0,!0)]),_:3},8,["is-screen-open","onToggleScreen"]),P(ha,{open:r(n)},{"nav-screen-content-before":v(()=>[u(c.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":v(()=>[u(c.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3},8,["open"])])):f("",!0)}}),ya=k(ga,[["__scopeId","data-v-7ad780c2"]]),ba=["role","tabindex"],Pa={key:1,class:"items"},ka=h({__name:"VPSidebarItem",props:{item:{},depth:{}},setup(e){const n=e,{collapsed:t,collapsible:o,isLink:s,isActiveLink:i,hasActiveLink:c,hasChildren:m,toggle:p}=hn(C(()=>n.item)),_=C(()=>m.value?"section":"div"),g=C(()=>s.value?"a":"div"),b=C(()=>m.value?n.depth+2===7?"p":`h${n.depth+2}`:"p"),$=C(()=>s.value?void 0:"button"),L=C(()=>[[`level-${n.depth}`],{collapsible:o.value},{collapsed:t.value},{"is-link":s.value},{"is-active":i.value},{"has-active":c.value}]);function x(F){"key"in F&&F.key!=="Enter"||!n.item.link&&p()}function D(){n.item.link&&p()}return(F,A)=>{const E=q("VPSidebarItem",!0);return a(),y(N(_.value),{class:I(["VPSidebarItem",L.value])},{default:v(()=>[e.item.text?(a(),l("div",R({key:0,class:"item",role:$.value},ze(e.item.items?{click:x,keydown:x}:{},!0),{tabindex:e.item.items&&0}),[A[1]||(A[1]=d("div",{class:"indicator"},null,-1)),e.item.link?(a(),y(B,{key:0,tag:g.value,class:"link",href:e.item.link,rel:e.item.rel,target:e.item.target},{default:v(()=>[(a(),y(N(b.value),{class:"text",innerHTML:e.item.text},null,8,["innerHTML"]))]),_:1},8,["tag","href","rel","target"])):(a(),y(N(b.value),{key:1,class:"text",innerHTML:e.item.text},null,8,["innerHTML"])),e.item.collapsed!=null&&e.item.items&&e.item.items.length?(a(),l("div",{key:2,class:"caret",role:"button","aria-label":"toggle section",onClick:D,onKeydown:Ke(D,["enter"]),tabindex:"0"},[...A[0]||(A[0]=[d("span",{class:"vpi-chevron-right caret-icon"},null,-1)])],32)):f("",!0)],16,ba)):f("",!0),e.item.items&&e.item.items.length?(a(),l("div",Pa,[e.depth<5?(a(!0),l(S,{key:0},T(e.item.items,z=>(a(),y(E,{key:z.text,item:z,depth:e.depth+1},null,8,["item","depth"]))),128)):f("",!0)])):f("",!0)]),_:1},8,["class"])}}}),Ca=k(ka,[["__scopeId","data-v-0009425e"]]),$a=h({__name:"VPSidebarGroup",props:{items:{}},setup(e){const n=M(!0);let t=null;return H(()=>{t=setTimeout(()=>{t=null,n.value=!1},300)}),je(()=>{t!=null&&(clearTimeout(t),t=null)}),(o,s)=>(a(!0),l(S,null,T(e.items,i=>(a(),l("div",{key:i.text,class:I(["group",{"no-transition":n.value}])},[P(Ca,{item:i,depth:0},null,8,["item"])],2))),128))}}),Va=k($a,[["__scopeId","data-v-51288d80"]]),wa={class:"nav",id:"VPSidebarNav","aria-labelledby":"sidebar-aria-label",tabindex:"-1"},Ma=h({__name:"VPSidebar",props:{open:{type:Boolean}},setup(e){const{sidebarGroups:n,hasSidebar:t}=G(),o=e,s=M(null),i=Ie(ee?document.body:null);W([o,s],()=>{var m;o.open?(i.value=!0,(m=s.value)==null||m.focus()):i.value=!1},{immediate:!0,flush:"post"});const c=M(0);return W(n,()=>{c.value+=1},{deep:!0}),(m,p)=>r(t)?(a(),l("aside",{key:0,class:I(["VPSidebar",{open:e.open}]),ref_key:"navEl",ref:s,onClick:p[0]||(p[0]=Je(()=>{},["stop"]))},[p[2]||(p[2]=d("div",{class:"curtain"},null,-1)),d("nav",wa,[p[1]||(p[1]=d("span",{class:"visually-hidden",id:"sidebar-aria-label"}," Sidebar Navigation ",-1)),u(m.$slots,"sidebar-nav-before",{},void 0,!0),(a(),y(Va,{items:r(n),key:c.value},null,8,["items"])),u(m.$slots,"sidebar-nav-after",{},void 0,!0)])],2)):f("",!0)}}),La=k(Ma,[["__scopeId","data-v-42c4c606"]]),Sa=h({__name:"VPSkipLink",setup(e){const{theme:n}=V(),t=X(),o=M();W(()=>t.path,()=>o.value.focus());function s({target:i}){const c=document.getElementById(decodeURIComponent(i.hash).slice(1));if(c){const m=()=>{c.removeAttribute("tabindex"),c.removeEventListener("blur",m)};c.setAttribute("tabindex","-1"),c.addEventListener("blur",m),c.focus(),window.scrollTo(0,0)}}return(i,c)=>(a(),l(S,null,[d("span",{ref_key:"backToTop",ref:o,tabindex:"-1"},null,512),d("a",{href:"#VPContent",class:"VPSkipLink visually-hidden",onClick:s},w(r(n).skipToContentLabel||"Skip to content"),1)],64))}}),Ia=k(Sa,[["__scopeId","data-v-fcbfc0e0"]]),xa=h({__name:"Layout",setup(e){const{isOpen:n,open:t,close:o}=G(),s=X();W(()=>s.path,o),fn(n,o);const{frontmatter:i}=V(),c=Qe(),m=C(()=>!!c["home-hero-image"]);return xe("hero-image-slot-exists",m),(p,_)=>{const g=q("Content");return r(i).layout!==!1?(a(),l("div",{key:0,class:I(["Layout",r(i).pageClass])},[u(p.$slots,"layout-top",{},void 0,!0),P(Ia),P(nn,{class:"backdrop",show:r(n),onClick:r(o)},null,8,["show","onClick"]),P(ya,null,{"nav-bar-title-before":v(()=>[u(p.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":v(()=>[u(p.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":v(()=>[u(p.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":v(()=>[u(p.$slots,"nav-bar-content-after",{},void 0,!0)]),"nav-screen-content-before":v(()=>[u(p.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":v(()=>[u(p.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3}),P(po,{open:r(n),onOpenMenu:r(t)},null,8,["open","onOpenMenu"]),P(La,{open:r(n)},{"sidebar-nav-before":v(()=>[u(p.$slots,"sidebar-nav-before",{},void 0,!0)]),"sidebar-nav-after":v(()=>[u(p.$slots,"sidebar-nav-after",{},void 0,!0)]),_:3},8,["open"]),P(Jt,null,{"page-top":v(()=>[u(p.$slots,"page-top",{},void 0,!0)]),"page-bottom":v(()=>[u(p.$slots,"page-bottom",{},void 0,!0)]),"not-found":v(()=>[u(p.$slots,"not-found",{},void 0,!0)]),"home-hero-before":v(()=>[u(p.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":v(()=>[u(p.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":v(()=>[u(p.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":v(()=>[u(p.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":v(()=>[u(p.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":v(()=>[u(p.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":v(()=>[u(p.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":v(()=>[u(p.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":v(()=>[u(p.$slots,"home-features-after",{},void 0,!0)]),"doc-footer-before":v(()=>[u(p.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":v(()=>[u(p.$slots,"doc-before",{},void 0,!0)]),"doc-after":v(()=>[u(p.$slots,"doc-after",{},void 0,!0)]),"doc-top":v(()=>[u(p.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":v(()=>[u(p.$slots,"doc-bottom",{},void 0,!0)]),"aside-top":v(()=>[u(p.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":v(()=>[u(p.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":v(()=>[u(p.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":v(()=>[u(p.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":v(()=>[u(p.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":v(()=>[u(p.$slots,"aside-ads-after",{},void 0,!0)]),_:3}),P(eo),u(p.$slots,"layout-bottom",{},void 0,!0)],2)):(a(),y(g,{key:1}))}}}),Da=k(xa,[["__scopeId","data-v-d8b57b2d"]]),We={Layout:Da,enhanceApp:({app:e})=>{e.component("Badge",Xe)}},Ta=["id","host","repo","repoid","category","categoryid","mapping","term","strict","reactionsenabled","emitmetadata","inputposition","theme","lang","loading"],Fa=h({__name:"Giscus",props:{id:{},host:{},repo:{},repoId:{},category:{},categoryId:{},mapping:{},term:{},theme:{},strict:{},reactionsEnabled:{},emitMetadata:{},inputPosition:{},lang:{},loading:{}},setup(e){const n=M(!1);return H(()=>{Se(()=>import("./giscus-Ci9LqPcC.BNebfDgq.js"),[]).then(()=>n.value=!0)}),(t,o)=>n.value?(a(),l("giscus-widget",{key:0,id:t.id,host:t.host,repo:t.repo,repoid:t.repoId,category:t.category,categoryid:t.categoryId,mapping:t.mapping,term:t.term,strict:t.strict,reactionsenabled:t.reactionsEnabled,emitmetadata:t.emitMetadata,inputposition:t.inputPosition,theme:t.theme,lang:t.lang,loading:t.loading},null,8,Ta)):f("",!0)}}),Aa={class:"kb-comments"},Na={key:1,class:"kb-comments-note"},Ba=h({__name:"GiscusComments",props:{term:{}},setup(e){const o="General";return(c,m)=>(a(),l("section",Aa,[r(!1)?(a(),y(r(Fa),{key:0,repo:r(void 0),"repo-id":r(void 0),category:r(o),"category-id":r(void 0),mapping:"specific",term:e.term,"reactions-enabled":"1","emit-metadata":"0","input-position":"bottom",theme:"preferred_color_scheme",lang:"zh-CN",loading:"lazy"},null,8,["repo","repo-id","category","category-id","term"])):(a(),l("p",Na," 留言区会在配置 giscus 后启用。发现问题时，可以先在本地 Markdown 旁记录，后续统一修正。 "))]))}}),Wa=h({__name:"Layout",setup(e){const{Layout:n}=We,{frontmatter:t,page:o}=Ce();return(s,i)=>(a(),y(r(n),null,{"doc-after":v(()=>[r(t).comments!==!1&&r(o).relativePath.startsWith("content/")?(a(),y(Ba,{key:0,term:r(o).relativePath},null,8,["term"])):f("",!0)]),_:1}))}}),Ha=[{title:"第一篇记录",date:"2026-06-30",category:"随笔",tags:["knowledge-base"],source:"blog",status:"learning",visibility:"public",summary:"这个知识库从离线 Markdown 写作和一键发布开始。",path:"content/blog/hello.md",url:"/content/blog/hello.html",body:`# 第一篇记录

这个知识库会先做好阅读、检索、评论和发布链路，再逐步迁移旧资料。
`},{title:"电机控制入口",date:"2026-06-30",category:"电机控制",tags:["FOC","SVPWM","Observer"],source:"motor",status:"learning",visibility:"public",summary:"电机控制方向的知识库入口。",path:"content/motor/getting-started.md",url:"/content/motor/getting-started.html",body:`# 电机控制入口

这里会整理 FOC、SVPWM、观测器、电流环、速度环和驱动器相关笔记。
`},{title:"电源控制入口",date:"2026-06-30",category:"电源控制",tags:["UPS","PFC","LLC"],source:"power",status:"learning",visibility:"public",summary:"电源控制方向的知识库入口。",path:"content/power/getting-started.md",url:"/content/power/getting-started.html",body:`# 电源控制入口

这里会整理 UPS、PFC、LLC、三电平逆变器、采样、保护和控制软件相关笔记。
`},{title:"个人知识库第一版上线记录",date:"2026-06-30",category:"随笔",tags:["blog","knowledge-base","VitePress","workflow"],source:"blog",status:"learning",visibility:"public",summary:"记录这个个人知识库第一版的结构、写作方式和后续迁移节奏。",path:"content/blog/knowledge-base-first-pass.md",url:"/content/blog/knowledge-base-first-pass.html",body:"# 个人知识库第一版上线记录\n\n这个站点的第一版先解决三个问题：能稳定阅读，能按分类和关键词找到文章，能用本地 Markdown 继续写作和发布。\n\n目前内容结构分成电源控制、电机控制、仿真与实验、工程笔记、项目归档和随笔。每篇文章使用 frontmatter 写元数据，例如分类、标签、状态和摘要；这些元数据不会显示在正文里，但会进入文章库索引。\n\n后续迁移会分批进行。第一批先放入电源概念文档，确认标题、摘要、标签、暗色模式和文章链接都正常，再继续搬更大的课程资料和电控知识库。\n\n## 这篇文章用来测试什么\n\n- 标签展示：`blog`、`knowledge-base`、`VitePress`、`workflow`。\n- 文章库关键词搜索：可以搜索 `VitePress` 或 `workflow`。\n- 时间归档：文章会进入 `2026-06`。\n- 留言区域：文章底部会显示 giscus 配置提示，后续填入真实配置后就能留言。\n"},{title:"概念：两电平 SVPWM",date:"2026-06-22",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"本页是 `lessons/0040-two-level-svpwm.html` 的源稿。",path:"content/power/concepts/two-level-svpwm.md",url:"/content/power/concepts/two-level-svpwm.html",body:`# 概念：两电平 SVPWM

本页是 \`lessons/0040-two-level-svpwm.html\` 的源稿。

## 它是什么

空间矢量脉宽调制（space vector pulse-width modulation / SVPWM）用相邻有效矢量和零矢量在一个 PWM 周期内平均合成目标 alpha/beta 电压。

## 为什么 UPS/PCS 需要它

三相逆变器、三相有源整流器和 PCS 都要把 dq 控制器输出的电压参考转换为三相占空比。

## 数学形式

\`\`\`text
sector = angle(v_alpha, v_beta)
T1, T2 = adjacent_vector_times(v_alpha, v_beta, Vdc, Ts)
T0 = Ts - T1 - T2
\`\`\`

## 一个仿真任务

扫描调制比，画出三相占空比和六扇区轨迹。

## 验收标准

- 能列出 6 个有效矢量和 2 个零矢量。
- 能解释 T1、T2、T0。
- 能说明 min-max 注入与零序注入的关系。

## 导师问题

项目代码使用扇区法、min-max 法还是查表法？只确认阅读入口。
`},{title:"概念：三电平 NPC 逆变器",date:"2026-06-22",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"本页是 `lessons/0042-three-level-npc-inverter.html` 的源稿。",path:"content/power/concepts/three-level-npc-inverter.md",url:"/content/power/concepts/three-level-npc-inverter.html",body:`# 概念：三电平 NPC 逆变器

本页是 \`lessons/0042-three-level-npc-inverter.html\` 的源稿。

## 它是什么

三电平 NPC 逆变器（three-level neutral-point-clamped inverter / NPC inverter）让每相输出 +Vdc/2、0、-Vdc/2 三种电平，降低电压应力和输出谐波。

## 为什么 UPS/PCS 需要它

中大功率 UPS 输出级和 PCS 交流侧常需要低谐波、高效率和较低 EMI。NPC 拓扑是常见三电平方案之一。

## 数学形式

\`\`\`text
P -> +Vdc / 2
O -> 0 through neutral clamp
N -> -Vdc / 2
\`\`\`

## 一个仿真任务

比较两电平和三电平相电压阶梯，再观察冗余小矢量对中点电压的影响。

## 验收标准

- 能画出 P/O/N 三种相电平。
- 能解释 NPC 为什么降低器件电压应力。
- 能说明冗余矢量和中点平衡的关系。

## 导师问题

NPC 中点平衡由调制层、外环还是单独控制器处理？
`},{title:"概念：三相功率与 dq 坐标变换",date:"2026-06-22",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"本页是 `lessons/0037-three-phase-power-dq-transform.html` 的源稿。它只讨论公开三相理论和教学参数，不包含公司内部采样标定、真实项目额定功率或控制器参数。",path:"content/power/concepts/three-phase-power-dq-transform.md",url:"/content/power/concepts/three-phase-power-dq-transform.html",body:`# 概念：三相功率与 dq 坐标变换

本页是 \`lessons/0037-three-phase-power-dq-transform.html\` 的源稿。它只讨论公开三相理论和教学参数，不包含公司内部采样标定、真实项目额定功率或控制器参数。

## 它是什么

三相系统（three-phase system）包含 A/B/C 三个相差 120 度的交流量。Clarke 变换（Clarke transform）把三相量变成 alpha/beta 两轴；Park 变换（Park transform）再把 alpha/beta 转到旋转 dq 坐标。

## 为什么 UPS/PCS 需要它

三相 UPS、Vienna PFC、三电平逆变器和 PCS 都要用 dq 坐标表达电流、功率和电压控制目标。

## 数学形式

\`\`\`text
alpha = xa
beta  = (xa + 2 * xb) / sqrt(3)
d =  alpha * cos(theta) + beta * sin(theta)
q = -alpha * sin(theta) + beta * cos(theta)
\`\`\`

## 一个仿真任务

生成三相正弦量，比较 abc、alpha/beta 和 d/q。把 theta 偏置 10 度，观察 q 轴偏置。

## 验收标准

- 能手写 Clarke/Park 公式。
- 能解释 dq 是坐标变化，不是新硬件量。
- 能说明 d/q 和 P/Q 的关系依赖 theta 对齐方式。

## 复盘问题

- 为什么对称三相可以由两个独立变量表示？
- theta 错误会怎样污染 q 轴？

## 导师问题

阅读三相代码时，theta 来源通常从哪个模块确认？只讨论通用阅读路径，不记录公司内部实现。
`},{title:"概念：Vienna PFC 与中点电压平衡",date:"2026-06-22",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"本页是 `lessons/0041-vienna-pfc-neutral-point-balance.html` 的源稿。",path:"content/power/concepts/vienna-pfc-neutral-point-balance.md",url:"/content/power/concepts/vienna-pfc-neutral-point-balance.html",body:`# 概念：Vienna PFC 与中点电压平衡

本页是 \`lessons/0041-vienna-pfc-neutral-point-balance.html\` 的源稿。

## 它是什么

维也纳整流器（Vienna rectifier）是三相三电平单向 PFC 整流拓扑。中点电压平衡（neutral-point voltage balance）要求上下母线电容电压接近相等。

## 为什么 UPS/PCS 需要它

中大功率三相 UPS 前级常需要高效率和低输入谐波。Vienna PFC 可降低器件应力，但必须管理分裂母线。

## 数学形式

\`\`\`text
Vdc = Vc_top + Vc_bottom
Vnp_err = Vc_top - Vc_bottom
id_ref = PI(Vdc_ref - Vdc)
iq_ref = 0
\`\`\`

## 一个仿真任务

人为设置上下电容电压不等，观察加入平衡项后 \`Vnp_err\` 收敛。

## 验收标准

- 能解释 Vienna 和三相 Boost PFC 的区别。
- 能说明为什么总母线电压正常不代表中点平衡。
- 能区分 Vdc 环、id/iq 环和中点平衡环。

## 导师问题

中点平衡逻辑在真实代码中通常放在调制层还是控制层？
`},{title:"概念：单相 PFC 的 PWM/ADC 时序与控制延迟",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）电流环不是“采样后立刻作用于功率级”。模数转换器（analog-to-digital converter / ADC）采样、控制计算、脉宽调制（pulse-width modulation / PWM）寄存器更新之间存在控制延迟（control ",path:"content/power/concepts/single-phase-pfc-pwm-delay.md",url:"/content/power/concepts/single-phase-pfc-pwm-delay.html",body:`# 概念：单相 PFC 的 PWM/ADC 时序与控制延迟

## 1. 它是什么

功率因数校正（power factor correction / PFC）电流环不是“采样后立刻作用于功率级”。模数转换器（analog-to-digital converter / ADC）采样、控制计算、脉宽调制（pulse-width modulation / PWM）寄存器更新之间存在控制延迟（control delay）。

本节只讲采样点（sampling point）、PWM 更新点和延迟如何影响电流跟踪，不展开完整开关级模型。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）里的 PFC 电流环通常运行很快。即使算法公式正确，如果采样点靠近开关噪声、PWM 更新晚一个或几个周期，实际电流也会落后参考，导致：

- 电流跟踪误差变大。
- 占空比补偿滞后。
- 高频噪声和采样抖动进入控制环。
- 电流环稳定裕度变差。

## 3. 物理直觉

控制延迟像开车时后视镜画面延迟。你看到的是稍早的状态，打方向盘作用到车辆也要一段时间。延迟越大，越容易修正过头或跟不上目标。

## 4. 数学形式

理想无延迟：

\`\`\`text
u[k] = controller(i_ref[k] - iL[k])
\`\`\`

有延迟时，可以近似写成：

\`\`\`text
u[k] = controller(i_ref[k - N] - iL[k - N])
delay_time = N * Ts
\`\`\`

其中 \`N\` 是延迟的控制周期数，\`Ts\` 是控制周期。

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_pwm_delay.py
\`\`\`

对比一个仿真任务：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_pwm_delay.py --delay-samples 0 --output simulations\\results\\pfc_pwm_delay_0.png --no-open
python simulations\\python\\single_phase_pfc_pwm_delay.py --delay-samples 5 --output simulations\\results\\pfc_pwm_delay_5.png --no-open
\`\`\`

观察：

- 电流参考 \`iref\` 与含延迟的实际电流 \`iL\` 是否有相位差。
- 跟踪误差是否随延迟增大而变大。
- ADC 采样点和 PWM 更新点是否清楚标出。
- 参数框中的延迟样本数和微秒数。

## 6. 固件落地

真实固件中，相关问题通常出现在：

- ADC 触发时刻是否避开开关边沿。
- ADC 转换完成中断和控制 ISR 的先后关系。
- PWM 比较寄存器是立即更新还是在周期边界影子加载。
- 控制计算是否跨周期生效。

读代码时要沿着“PWM 触发 ADC -> ADC 完成 -> ISR 计算 -> PWM 更新”追踪。

## 7. 常见误解

- 错误理解：控制公式对了，时序不重要。  
  正确理解：数字电源控制里，采样和更新时序直接影响相位裕度。

- 错误理解：采样越靠近边沿越及时。  
  正确理解：边沿附近开关噪声大，采样可能更差。

- 错误理解：延迟只影响高频细节。  
  正确理解：延迟会表现成相位滞后，电流环带宽越高越敏感。

## 8. 验收标准

- 能解释 ADC 采样点、ISR 计算、PWM 更新点之间的先后关系。
- 能把延迟样本数换算成微秒。
- 能在图中指出 \`iref\`、含延迟 \`iL\`、误差、ADC 采样点和 PWM 更新点。
- 能解释为什么延迟会增大跟踪误差。
- 能基于 \`single_phase_pfc_pwm_delay.py\` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中，延迟是几个控制周期？对应多少微秒？
- 把 \`--delay-samples\` 从 0 改到 5 后，RMS tracking error 如何变化？
- 如果真实工程使用 PWM 影子寄存器，控制输出通常什么时候生效？

## 10. 导师问题

- 我用 \`single_phase_pfc_pwm_delay.py\` 看到 3 个控制周期延迟会增大 RMS 跟踪误差。公司 PFC 电流环从 ADC 采样到 PWM 生效通常有几个周期延迟？
- 图中标出了 ADC 采样点和 PWM 更新点。公司平台一般在 PWM 周期的哪个位置触发 ADC 采样？
- PWM 比较寄存器是立即更新还是影子寄存器周期边界更新？这对控制延迟怎么算？
`},{title:"概念：单相 PFC 电流参考",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）的第一步，是让输入电流尽量跟交流输入电压同相、同形。电流参考（current reference）就是控制器希望输入电流跟踪的目标波形。",path:"content/power/concepts/single-phase-pfc-current-reference.md",url:"/content/power/concepts/single-phase-pfc-current-reference.html",body:`# 概念：单相 PFC 电流参考

## 1. 它是什么

功率因数校正（power factor correction / PFC）的第一步，是让输入电流尽量跟交流输入电压同相、同形。电流参考（current reference）就是控制器希望输入电流跟踪的目标波形。

本节只讲“电流参考怎么长出来”，不讲完整 PFC 电压环、电流环和 PWM 实现。本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据；学习记录中也不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）前级通常要从交流电网取电。如果输入电流畸变严重或与电压不同相，就会带来：

- 功率因数低，视在功率变大。
- 电网谐波电流增加。
- 前级整流和母线电容电流应力增大。

PFC 的目标是让电网看到的负载更接近电阻性负载。

## 3. 物理直觉

如果一个负载像纯电阻，那么电压为正时电流为正，电压为负时电流为负，并且二者同步变化。PFC 电流参考就是让电源前级“装得像电阻”。

整流后的 Boost PFC 功率级实际只处理正向电感电流，但从交流输入侧看，电流应当跟 \`vac\` 同相。

## 4. 数学形式

若希望输入功率为 \`P\`，电网均方根值（root mean square / RMS）为 \`Vrms\`，可以用等效电导：

\`\`\`text
G = P / Vrms^2
i_ref(t) = G * v_ac(t)
\`\`\`

这样平均功率为：

\`\`\`text
Pavg = mean(v_ac(t) * i_ref(t))
\`\`\`

在理想情况下，电流和电压同相，功率因数接近 1。

## 5. 一个仿真任务与仿真观察

一个仿真任务是运行 \`single_phase_pfc_current_reference.py\`，观察 \`vac\`、\`|vac|\`、\`iref\` 和瞬时功率之间的关系：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_current_reference.py
\`\`\`

对比目标功率：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_current_reference.py --target-power 500 --output simulations\\results\\pfc_current_ref_500w.png --no-open
python simulations\\python\\single_phase_pfc_current_reference.py --target-power 1500 --output simulations\\results\\pfc_current_ref_1500w.png --no-open
\`\`\`

观察：

- 交流输入电压 \`vac\` 是正负交替的正弦。
- 整流电压 \`|vac|\` 是 Boost PFC 功率级看到的正半波形状。
- 电流参考 \`iref\` 与 \`vac\` 同相。
- 瞬时功率 \`p(t)\` 有两倍工频脉动，但平均功率接近目标功率。

## 6. 固件落地

真实固件中，电流参考通常不是孤立公式，而是由以下信号共同决定：

- 电压环输出的功率或电流幅值指令。
- 交流电压采样或锁相环（phase-locked loop / PLL）提供的相位/单位正弦。
- 前馈和限幅逻辑。
- 电流环把实际电感电流跟踪到参考值。

本节只建立 \`iref\` 的形状，为后续电压环、电流环和 PLL 做准备。

## 7. 常见误解

- 错误理解：PFC 就是把输出母线电压升到 380 V。  
  正确理解：升压只是功率级功能；PFC 的关键是输入电流形状和相位。

- 错误理解：电流参考越大越好。  
  正确理解：电流参考幅值由功率需求、输入电压、限流和母线控制共同决定。

- 错误理解：整流后电压是正的，所以交流侧电流也只看正值。  
  正确理解：从电网侧看，电流仍应与交流电压同相，正负半周都要对应。

## 8. 验收标准

- 能解释功率因数校正（power factor correction / PFC）电流参考为什么要与 \`vac\` 同相。
- 能用 \`G = P / Vrms^2\` 推出 \`i_ref = G * vac\`。
- 能在图中指出 \`vac\`、\`|vac|\`、\`iref\` 和 \`p(t)\`。
- 能解释为什么瞬时功率有脉动，但平均功率接近目标功率。
- 能基于图中 PF、RMS 和功率参数准备导师问题。

## 9. 复盘问题

- 默认仿真中，\`Vrms=220 V\`、\`P=1000 W\`，电流 RMS 大约是多少？
- 如果目标功率从 500 W 提高到 1500 W，\`iref\` 幅值如何变化？
- 为什么本节没有直接讲完整电压环？如果电流参考都不会看，直接看双环控制会卡在哪里？

## 10. 导师问题

- 我用 \`single_phase_pfc_current_reference.py\` 看到 \`iref = G * vac\` 时功率因数接近 1。公司单相 PFC 代码里的电流参考是直接用输入电压采样生成，还是通过 PLL/单位正弦生成？
- 本节用 \`P / Vrms^2\` 生成等效电导。真实工程里电流参考幅值通常来自电压环输出、功率指令，还是前馈计算？
- 图中瞬时功率有两倍工频脉动。公司工程里母线电压环如何避免跟着二倍频纹波乱调？
`},{title:"概念：单相 PFC 电压环如何生成电流幅值",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）的电压环（voltage loop）是一个慢环。它根据直流母线电压误差，输出电流参考的幅值命令。",path:"content/power/concepts/single-phase-pfc-voltage-loop.md",url:"/content/power/concepts/single-phase-pfc-voltage-loop.html",body:`# 概念：单相 PFC 电压环如何生成电流幅值

## 1. 它是什么

功率因数校正（power factor correction / PFC）的电压环（voltage loop）是一个慢环。它根据直流母线电压误差，输出电流参考的幅值命令。

本节用电导命令（conductance command / G）表示这个幅值：

\`\`\`text
i_ref(t) = G * v_ac(t)
\`\`\`

上一节解释了 \`i_ref\` 的形状；本节解释 \`G\` 怎么随母线电压变化。本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要维持直流母线电压。如果负载功率突然增加，母线电容会放电，母线电压下降。电压环必须提高输入功率，让母线回到目标值。

如果没有电压环：

- 负载变大时母线会持续下降。
- 负载变小时母线可能过压。
- 后级逆变器的输入条件会变差。

## 3. 物理直觉

直流母线电容像水箱。负载是出水，PFC 输入功率是进水。水位低于目标时，电压环开大进水阀门；水位高于目标时，电压环关小阀门。

这里的“阀门开度”就是电流参考幅值，本文用电导 \`G\` 表示。

## 4. 数学形式

电压误差：

\`\`\`text
e_v[k] = Vbus_ref - Vbus[k]
\`\`\`

比例积分控制器（proportional-integral controller / PI）：

\`\`\`text
G[k] = clamp(Kp * e_v[k] + integral[k], Gmin, Gmax)
integral[k+1] = integral[k] + Ki * e_v[k] * Ts
\`\`\`

输入功率近似：

\`\`\`text
Pin[k] = G[k] * Vrms^2
\`\`\`

母线能量平衡：

\`\`\`text
0.5 * Cbus * (Vbus[k+1]^2 - Vbus[k]^2) = (Pin[k] - Pload[k]) * Ts
\`\`\`

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_voltage_loop.py
\`\`\`

对比一个仿真任务：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_voltage_loop.py --load-power-step 900 --output simulations\\results\\pfc_voltage_loop_900w.png --no-open
python simulations\\python\\single_phase_pfc_voltage_loop.py --load-power-step 1500 --output simulations\\results\\pfc_voltage_loop_1500w.png --no-open
\`\`\`

观察：

- 负载从 600 W 阶跃到 1200 W 后，母线电压先下降。
- 电压环提高 \`G\`。
- 输入功率 \`Pin\` 上升。
- 电流参考的均方根值（root mean square / RMS）随 \`G\` 增大。
- 母线电压逐步回到参考值附近。

## 6. 固件落地

真实 PFC 固件中，电压环通常运行得比电流环慢。它输出的可能不是 \`G\`，而是：

- 电流幅值命令。
- 功率命令。
- 电导命令。
- 归一化电流参考幅值。

工程阅读时先找：母线电压采样在哪里进入 PI，PI 输出如何限幅，输出又在哪里乘以输入电压或单位正弦。

## 7. 常见误解

- 错误理解：PFC 电压环直接控制 PWM。  
  正确理解：电压环通常只给电流幅值，内层电流环才负责快速跟踪。

- 错误理解：电压环越快越好。  
  正确理解：单相 PFC 母线有二倍工频纹波，电压环太快会把纹波错误调进电流参考。

- 错误理解：负载阶跃后母线不能有任何下跌。  
  正确理解：母线电容承担能量缓冲，短暂下跌正常，关键是恢复过程和保护边界。

## 8. 验收标准

- 能解释电压环（voltage loop）为什么是慢速外环。
- 能解释 \`G\` 增大为什么会提高输入功率。
- 能在 \`single_phase_pfc_voltage_loop.py\` 生成的图中指出母线电压、电导命令、输入功率、负载功率和电流参考 RMS。
- 能解释为什么需要 \`Gmax\` 限幅和抗积分饱和。
- 能基于仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中负载从多少 W 阶跃到多少 W？发生在多少 ms？
- 负载阶跃后，为什么 \`G\` 和电流参考 RMS 会升高？
- 如果电压环追踪二倍工频纹波，会对输入电流参考造成什么影响？

## 10. 导师问题

- 我用 \`single_phase_pfc_voltage_loop.py\` 看到负载从 600 W 到 1200 W 后，电压环提高 \`G\`，输入功率上升。公司 PFC 代码里电压环输出的是电流幅值、功率命令还是电导命令？
- 图中 \`Gmax\` 会限制最大输入功率。真实工程中 PFC 电压环输出限幅通常由哪些因素决定？
- 单相 PFC 母线上有二倍工频纹波。公司工程里电压环带宽如何避免追踪二倍频纹波？
`},{title:"概念：单相 PFC 内层电流环",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）的电流环（current loop）是内层快速环。它的任务是让实际电感电流（inductor current / iL）跟踪电流参考 `i_ref`。",path:"content/power/concepts/single-phase-pfc-current-loop.md",url:"/content/power/concepts/single-phase-pfc-current-loop.html",body:`# 概念：单相 PFC 内层电流环

## 1. 它是什么

功率因数校正（power factor correction / PFC）的电流环（current loop）是内层快速环。它的任务是让实际电感电流（inductor current / iL）跟踪电流参考 \`i_ref\`。

上一节电压环给出电流参考幅值，本节关注：

\`\`\`text
error = i_ref - iL
占空比命令 D = current_controller(error)
\`\`\`

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 前级要让输入电流跟着参考波形走。只有电压环不够，因为电压环只知道“要多少电流幅值”，不知道电感电流每个控制周期是否真的跟上了。

电流环的质量直接影响：

- 输入电流畸变。
- 功率因数。
- 过流风险。
- PFC 对负载变化和电网变化的响应。

## 3. 物理直觉

电压环像告诉你“目标速度是多少”，电流环像脚下的油门控制。参考电流在一个工频周期内不断变化，电流环要快速推着电感电流追上它。

## 4. 数学形式

电流误差：

\`\`\`text
e_i[k] = i_ref[k] - iL[k]
\`\`\`

比例积分控制器（proportional-integral controller / PI）：

\`\`\`text
u[k] = Kp * e_i[k] + integral[k] + feedforward[k]
integral[k+1] = integral[k] + Ki * e_i[k] * Ts
D[k] = clamp(0.5 + u[k] / Vbus, Dmin, Dmax)
\`\`\`

简化电感模型：

\`\`\`text
diL/dt = vL / L
vL ≈ (D - 0.5) * Vbus - R * iL
\`\`\`

这里的占空比命令（duty command / D）只是平均模型命令，不是开关级 PWM 波形。

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_current_loop.py
\`\`\`

对比一个仿真任务：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_current_loop.py --current-rms-reference 3 --output simulations\\results\\pfc_current_loop_3a.png --no-open
python simulations\\python\\single_phase_pfc_current_loop.py --current-rms-reference 8 --output simulations\\results\\pfc_current_loop_8a.png --no-open
\`\`\`

观察：

- 电流参考 \`iref\` 是正弦波。
- 实际电感电流 \`iL\` 应跟随 \`iref\`。
- 跟踪误差 \`e_i\` 不应长期偏大。
- 占空比命令 \`D\` 应在限幅内变化。

## 6. 固件落地

真实固件里，电流环通常在控制 ISR 中运行：

- 读取 ADC 采样的电感电流。
- 计算 \`i_ref - iL\`。
- 执行 PI 或 PR 等控制器。
- 加入前馈、限幅、抗积分饱和。
- 更新脉宽调制（pulse-width modulation / PWM）比较值。

工程阅读时重点找：电流采样在哪里更新、参考值在哪里传入、控制器输出如何限幅、PWM 何时更新。

## 7. 常见误解

- 错误理解：电压环输出电流幅值后，电流自然就会变成目标波形。  
  正确理解：必须有内层电流环让实际电感电流跟踪参考。

- 错误理解：电流环越猛越好。  
  正确理解：过高增益会导致噪声放大、占空比抖动和稳定性问题。

- 错误理解：平均模型等于真实开关波形。  
  正确理解：平均模型用于理解控制趋势，真实 PWM 还会带来开关纹波、采样延迟和调制限制。

## 8. 验收标准

- 能解释电流环（current loop）的输入、输出和作用。
- 能在图中指出 \`iref\`、\`iL\`、\`e_i\` 和 \`D\`。
- 能解释占空比命令（duty command / D）为什么需要限幅。
- 能解释均方根值（root mean square / RMS） tracking error 表示什么。
- 能基于 \`single_phase_pfc_current_loop.py\` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 默认仿真中，电流参考 RMS 是多少 A？跟踪误差大约是多少？
- 把参考电流提高到 8 A 后，占空比命令有什么变化？
- 如果占空比长时间撞到上限，可能是控制参数问题、输入电压问题，还是负载过重问题？

## 10. 导师问题

- 我用 \`single_phase_pfc_current_loop.py\` 看到 \`iL\` 跟踪 \`iref\`，但仍有误差。公司 PFC 电流环常用 PI、PR 还是其他控制器？
- 图中占空比命令有限幅。真实工程里 PFC 电流环的占空比限幅和过流保护如何配合？
- 本节用了平均模型。公司调试 PFC 电流环时通常先看平均模型、Simulink 开关模型，还是直接看示波器波形？
`},{title:"概念：单相 PFC 平均控制链",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）的平均模型（averaged model）把“开关每个周期怎么翻转”暂时压缩掉，只保留控制链路中的慢变量：",path:"content/power/concepts/single-phase-pfc-average-controller.md",url:"/content/power/concepts/single-phase-pfc-average-controller.html",body:`# 概念：单相 PFC 平均控制链

## 1. 它是什么

功率因数校正（power factor correction / PFC）的平均模型（averaged model）把“开关每个周期怎么翻转”暂时压缩掉，只保留控制链路中的慢变量：

\`\`\`text
母线电压误差 -> 电压环 -> 电导命令/功率命令 -> 前馈 -> 电流参考 -> 电流环/PWM -> 输入功率 -> 母线电压
\`\`\`

本节只讲一个概念：把前面几节学过的电压环（voltage loop）、前馈（feedforward）、电流环（current loop）、脉宽调制（pulse-width modulation / PWM）延迟串成一条能看懂的 PFC 控制链。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）工程代码通常不是按课程顺序分开的。你读到的可能是一个控制中断服务程序（control interrupt service routine / control ISR），里面同时出现采样、RMS 估算、电压环、电流参考、限幅、PWM 更新和保护判断。

平均控制链的作用是先建立“信号从哪里来、到哪里去”的地图。没有这张地图，读完整 C 工程时容易只看到局部公式，看不出它服务于哪一段能量流。

## 3. 物理直觉

负载突然变大时，直流母线电容先放电，母线电压下降。电压环看到误差后提高电导命令，PFC 从输入侧吸取更多功率。电流环和 PWM 不是无限快，所以实际输入功率会滞后命令功率一小段时间。输入功率大于负载功率后，母线电压逐步回到参考值。

## 4. 数学形式

教学平均模型使用下面几条关系：

\`\`\`text
e_v = Vbus_ref - Vbus
G_cmd = clamp(Kp * e_v + integral(Ki * e_v), Gmin, Gmax)
Irms_ref = G_cmd * Vrms
Pin_cmd = G_cmd * Vrms^2
Pin_actual[k] = low_pass(delay(Pin_cmd), current_loop_bandwidth)
Cbus * d(Vbus^2) / 2 = (Pin_actual - Pload) * dt
\`\`\`

这里 \`Pin_actual\` 不是开关级瞬时功率，而是被电流环带宽和延迟限制后的平均输入功率。

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_average_controller.py
\`\`\`

观察：

- 负载从 700 W 跳到 1200 W 后，母线电压先下跌。
- 电压环提高 \`G_cmd\`，\`Irms_ref\` 和 \`Pin_cmd\` 随之升高。
- \`Pin_actual\` 因电流环带宽和延迟滞后于 \`Pin_cmd\`。
- 母线电压在输入功率追上后回到参考附近。

延迟对比：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_average_controller.py --delay-samples 0 --output simulations\\results\\pfc_average_delay_0.png --no-open
python simulations\\python\\single_phase_pfc_average_controller.py --delay-samples 5 --output simulations\\results\\pfc_average_delay_5.png --no-open
\`\`\`

## 6. 固件落地

读固件时可以按这条链路找变量：

\`\`\`text
ADC samples
  -> Vbus, Vin, Iin scaling/filtering
  -> Vrms estimation
  -> voltage loop output
  -> feedforward and limit
  -> current reference
  -> current loop
  -> PWM compare update
\`\`\`

工程代码里还会叠加保护逻辑、模式状态机、软启动、限流、故障锁存和通信参数。本节模型不包含这些内容，但它能帮助你识别主控制链。

## 7. 常见误解

- 错误理解：平均模型能替代开关仿真。  
  正确理解：平均模型适合看控制链和慢动态，不能看开关纹波、二极管反向恢复、采样尖峰。

- 错误理解：电压环输出就是占空比。  
  正确理解：PFC 里电压环通常输出功率、电导或电流幅值类命令，内层电流环才产生 PWM 相关命令。

- 错误理解：母线电压下跌说明电压环一定错了。  
  正确理解：负载突变时电容先承担能量差，短暂下跌是正常动态，要看是否能恢复、是否超限。

## 8. 验收标准

- 能按顺序说出 \`Vbus error -> G_cmd -> Irms_ref -> Pin_actual -> Vbus\` 的因果链。
- 能解释负载阶跃后为什么母线电压先跌再恢复。
- 能在图中指出 \`Vbus\`、\`Pload\`、\`Pin_cmd\`、\`Pin_actual\`、\`G_cmd\`、\`Irms_ref\` 和 \`D_proxy\`。
- 能解释 \`--delay-samples\` 增大时，为什么 \`Pin_actual\` 更滞后于 \`Pin_cmd\`。
- 能基于生成的仿真图准备导师问题，而不是只问抽象概念。

## 9. 复盘问题

- 负载从 700 W 跳到 1200 W 后，母线电压为什么不会立刻保持在 380 V？
- \`Pin_cmd\` 和 \`Pin_actual\` 的差值主要代表哪两类工程因素？
- 如果 \`G_cmd\` 达到上限，母线仍然下跌，你会优先怀疑控制参数、功率能力还是保护限流？为什么？

## 10. 导师问题

- 我用 \`single_phase_pfc_average_controller.py\` 看到负载阶跃后，\`Pin_cmd\` 先上升，\`Pin_actual\` 因延迟滞后。公司 PFC 控制中电压环输出通常是功率命令、电导命令还是电流幅值命令？
- 图中 \`delay_samples=2\` 会增加输入功率跟踪误差。实际平台从 ADC 采样到 PWM 生效的延迟一般怎样计算？
- 如果真实产品还叠加限流和软启动，公司代码里这些限制通常放在电压环输出之后，还是电流参考生成之后？
`},{title:"概念：单相 PFC 输入电压前馈",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"功率因数校正（power factor correction / PFC）中的输入电压前馈（input-voltage feedforward）是把输入电压的均方根值（root mean square / RMS）提前放进功率命令到电流命令的换算里。",path:"content/power/concepts/single-phase-pfc-voltage-feedforward.md",url:"/content/power/concepts/single-phase-pfc-voltage-feedforward.html",body:`# 概念：单相 PFC 输入电压前馈

## 1. 它是什么

功率因数校正（power factor correction / PFC）中的输入电压前馈（input-voltage feedforward）是把输入电压的均方根值（root mean square / RMS）提前放进功率命令到电流命令的换算里。

本节只讲一个概念：为什么常见的平均模型里会写成：

\`\`\`text
G = Pcmd / Vrms^2
I_rms_ref = G * Vrms
\`\`\`

这里 \`G\` 是电导命令（conductance command / G），\`Pcmd\` 是输入功率命令，\`Vrms\` 是输入电压 RMS。

本节不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。维护本学习仓库时，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）的 PFC 级要在输入电网电压变化时尽量稳定地从电网取功率。如果只固定电导命令，那么：

\`\`\`text
Pin = G * Vrms^2
\`\`\`

当 \`Vrms\` 从 220 V 掉到 180 V，输入功率会明显下降；当 \`Vrms\` 升到 264 V，输入功率会明显上升。母线电压环最终能慢慢修正，但电网电压变化刚发生时会给母线带来扰动。

## 3. 物理直觉

PFC 把输入端“看起来”做成一个受控电阻或受控电导：电压越高，按比例吸取的电流越大。功率等于电压乘电流，所以如果 \`G\` 不变，功率会随 \`Vrms^2\` 变化。

输入电压前馈的直觉是：电压高时把电导命令压低，电压低时把电导命令抬高，让 \`G * Vrms^2\` 尽量保持等于功率命令。

## 4. 数学形式

平均意义下，单相正弦输入可写成：

\`\`\`text
v(t) = Vpk * sin(theta)
i_ref(t) = G * v(t)
Pin_avg = Vrms * Irms = G * Vrms^2
\`\`\`

为了让平均输入功率接近 \`Pcmd\`：

\`\`\`text
G_ff = Pcmd / Vrms^2
Irms_ref = G_ff * Vrms = Pcmd / Vrms
\`\`\`

这不是完整的电压环，也不是完整的电流环。它只是把输入电压变化提前补偿掉，减轻后面比例积分控制器（proportional-integral controller / PI）的压力。

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_voltage_feedforward.py
\`\`\`

对比一个仿真任务：

\`\`\`powershell
python simulations\\python\\single_phase_pfc_voltage_feedforward.py --rms-step 180 --output simulations\\results\\pfc_feedforward_180v.png --no-open
python simulations\\python\\single_phase_pfc_voltage_feedforward.py --rms-step 264 --output simulations\\results\\pfc_feedforward_264v.png --no-open
\`\`\`

观察：

- 输入电压 RMS 从 220 V 跳到 180 V 后，固定电导的输入功率会低于命令值。
- 使用 \`G = Pcmd / Vrms^2\` 后，输入功率仍接近 \`Pcmd\`。
- 图中的参数框写明 \`Vrms_initial\`、\`Vrms_step\`、\`Pcmd\`、控制频率和仿真时长。
- 每条曲线都有图例，不需要猜哪条曲线代表什么。

## 6. 固件落地

工程里通常不会把这个式子孤立地放着，而是放在 PFC 电压环输出到电流幅值之间：

\`\`\`text
Pcmd or voltage_loop_output
  -> input RMS measurement/filter
  -> G = Pcmd / max(Vrms^2, lower_limit)
  -> current reference amplitude
  -> PWM current loop
\`\`\`

实现时要注意：

- \`Vrms\` 需要滤波，不能直接使用噪声很大的瞬时采样值。
- 分母要加下限，避免低电压或采样异常时电流命令暴涨。
- 前馈只解决输入电压变化带来的功率换算问题，不能替代保护逻辑。
- 脉宽调制（pulse-width modulation / PWM）电流环仍然要负责实际电感电流跟踪。

## 7. 常见误解

- 错误理解：有了前馈就不需要母线电压环。  
  正确理解：前馈只补偿输入电压变化；负载变化、损耗和模型误差仍需要电压环修正。

- 错误理解：前馈越快越好。  
  正确理解：\`Vrms\` 估算太快会把采样噪声带进电流命令，通常要滤波和限幅。

- 错误理解：固定电流幅值比固定电导更稳。  
  正确理解：固定电流幅值时 \`Pin = Vrms * Irms\`，仍会随输入电压变化。

## 8. 验收标准

- 能解释为什么固定 \`G\` 时 \`Pin = G * Vrms^2\`。
- 能解释为什么 \`G = Pcmd / Vrms^2\` 可以让输入功率更接近命令值。
- 能在仿真图中指出 \`Vrms\`、\`Pin_fixed\`、\`Pin_ff\`、\`G_fixed\`、\`G_ff\`。
- 能说清楚低电压时为什么电流 RMS 命令会上升。
- 能基于 \`single_phase_pfc_voltage_feedforward.py\` 的仿真图准备具体导师问题。

## 9. 复盘问题

- 220 V 跳到 180 V 后，固定 \`G\` 的输入功率为什么会下降？下降比例大约和哪个量有关？
- 220 V 跳到 264 V 后，前馈为什么要降低 \`G\`？
- 如果 \`Vrms\` 估算值带噪声，电流命令会出现什么现象？

## 10. 导师问题

- 我用 \`single_phase_pfc_voltage_feedforward.py\` 看到 220 V 跳到 180 V 时，固定 \`G\` 的输入功率明显下降。公司 PFC 控制里是否使用 \`Vrms^2\` 输入电压前馈？
- 图里 \`G_ff\` 在低电压时变大。实际固件会怎样限制低压时的最大电流命令？
- 如果 \`Vrms\` 估算来自半周或整周滤波，公司平台一般怎样平衡前馈响应速度和噪声？
`},{title:"概念：单相全桥逆变器 LC 输出滤波",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"单相全桥逆变器（single-phase full-bridge inverter）把直流母线（DC bus）的电压通过四个功率开关变成高频脉宽调制（pulse-width modulation / PWM）桥臂电压。LC 滤波器（inductor-capacitor filter / LC filter）再把高频开关",path:"content/power/concepts/single-phase-inverter-lc-filter.md",url:"/content/power/concepts/single-phase-inverter-lc-filter.html",body:`# 概念：单相全桥逆变器 LC 输出滤波

## 1. 它是什么

单相全桥逆变器（single-phase full-bridge inverter）把直流母线（DC bus）的电压通过四个功率开关变成高频脉宽调制（pulse-width modulation / PWM）桥臂电压。LC 滤波器（inductor-capacitor filter / LC filter）再把高频开关分量压下去，让负载端看到接近 50 Hz 正弦的输出电压。

本节只讲一个概念：逆变器不是直接“生成干净正弦”，而是先生成高频 PWM 电压，再靠 LC 滤波器和控制环把目标基波保留下来。

保密边界：不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据。本节只使用教学模型和教学参数，不包含公司内部代码、未公开产品方案、客户项目参数或内部测试数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）在电池模式或双变换在线模式下，需要由直流母线向交流负载供电。逆变器负责把直流能量变成交流能量，LC 滤波器负责降低开关纹波，使输出电压满足负载和电能质量要求。

如果只理解控制器而不理解 LC 滤波器，你读固件时会看不懂为什么要采样输出电压、电感电流、直流母线电压，也不容易判断“波形畸变”到底来自调制、滤波器参数、负载还是控制环。

## 3. 物理直觉

全桥桥臂电压像一个高速来回切换的方波，平均值跟随 50 Hz 正弦参考。电感电流（inductor current / iL）不能突变，所以电感会阻挡高频电压突变；电容电压也不能突变，所以电容会把负载端电压变得平滑。二者组合后，高频 PWM 纹波被大幅衰减，低频 50 Hz 基波被保留下来。

## 4. 数学形式

教学模型使用双极性全桥 PWM：

\`\`\`text
m*sin(2*pi*f_out*t) 与三角载波比较
v_bridge = +Vdc 或 -Vdc

diL/dt = (v_bridge - v_out) / L
dv_out/dt = (iL - v_out/Rload) / C
f_res = 1 / (2*pi*sqrt(L*C))
\`\`\`

其中 \`m\` 是调制比。若全桥双极性输出在 \`+Vdc\` 和 \`-Vdc\` 之间切换，理想基波峰值约为 \`m*Vdc\`，所以 220 Vrms 输出在 400 V 母线下需要约 \`m = 220*sqrt(2)/400\`。

## 5. 一个仿真任务与仿真观察

运行：

\`\`\`powershell
python simulations\\python\\single_phase_inverter_lc_filter.py
\`\`\`

观察顺序：
- \`v_bridge\` 是高频 PWM 方波，不是干净正弦。
- \`v_out\` 是 LC 滤波后的输出电压，应接近 \`v_ref\`。
- \`i_L\` 反映滤波器和负载之间的能量交换。
- \`Output switching ripple\` 是从输出电压中扣掉 50 Hz 基波后的高频残差。

脚本默认保存并自动打开图片；如果无法自动打开，会打印完整图片路径。

一个仿真任务：改变滤波电感，观察输出纹波、电感电流峰值和 LC 谐振频率的变化。

\`\`\`powershell
python simulations\\python\\single_phase_inverter_lc_filter.py --filter-inductance 1.0e-3 --output simulations\\results\\inverter_lc_L_1p0mH.png --no-open
python simulations\\python\\single_phase_inverter_lc_filter.py --filter-inductance 2.5e-3 --output simulations\\results\\inverter_lc_L_2p5mH.png --no-open
\`\`\`

## 6. 固件落地

固件里常见的数据流是：

\`\`\`text
ADC samples
  -> Vdc, Vout, iL scaling/filtering
  -> sine reference or PLL angle
  -> voltage loop / current loop
  -> PWM compare update
  -> protection checks
\`\`\`

本节先不进入比例谐振（proportional resonant / PR）控制和均方根（root mean square / RMS）闭环，只要求你能把桥臂 PWM、电感电流、输出电压和 LC 参数联系起来。

## 7. 常见误解

- 错误理解：逆变器直接输出正弦电压。  
  正确理解：功率级先输出 PWM 电压，滤波器和控制环让负载端接近正弦。
- 错误理解：LC 截止频率越低越好。  
  正确理解：太低会增加体积、相位滞后和动态问题；太高又滤不掉开关纹波。
- 错误理解：只要输出 RMS 接近 220 V 就说明波形好。  
  正确理解：还要看纹波、谐波、瞬态、负载变化和保护边界。

## 8. 验收标准

- 能解释 \`v_bridge\`、\`v_out\`、\`v_ref\`、\`i_L\` 分别代表什么。
- 能说出为什么 LC 滤波器能压低开关纹波，但不会凭空决定输出基波幅值。
- 能根据图内参数框读出 Vdc、Vout_ref、f_out、f_sw、L、C、Rload、f_res 和 t_end。
- 能解释为什么桥臂纹波 RMS 明显大于输出纹波 RMS。
- 能基于 \`single_phase_inverter_lc_filter.py\` 生成的仿真图准备导师问题。

## 9. 复盘问题

- 400 V 直流母线下，要输出 220 Vrms，调制比为什么接近 0.778？
- 如果把电感从 1.0 mH 增大到 2.5 mH，输出纹波和电感电流峰值会怎样变化？代价是什么？
- 为什么 LC 谐振频率不能离 50 Hz 太近，也不能太靠近 10 kHz 开关频率？

## 10. 导师问题

- 我用 \`single_phase_inverter_lc_filter.py\` 看到桥臂 PWM 纹波远大于输出纹波。公司 UPS 固件通常会同时采样 \`Vout\` 和 \`iL\` 吗？各自主要用于控制还是保护？
- 仿真里 \`L=1.80 mH\`、\`C=20.00 uF\` 时 \`f_res\` 约为几百 Hz。真实产品选择 LC 参数时，通常先看开关频率、体积、动态响应还是保护裕量？
- 如果输出电压 RMS 正常但 \`Output switching ripple\` 偏大，真实调试时优先怀疑滤波器参数、PWM 死区、采样噪声还是控制环带宽？
`},{title:"概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"离散比例积分控制器（discrete proportional-integral controller / discrete PI）是在固定控制周期内，根据误差计算控制输出的最常见闭环控制器之一。",path:"content/power/concepts/discrete-pi-boost.md",url:"/content/power/concepts/discrete-pi-boost.html",body:`# 概念：离散比例积分控制器（discrete proportional-integral controller / discrete PI）

## 1. 它是什么

离散比例积分控制器（discrete proportional-integral controller / discrete PI）是在固定控制周期内，根据误差计算控制输出的最常见闭环控制器之一。

在 Boost 电压闭环里，误差通常是：

\`\`\`text
e[k] = Vref - Vout[k]
\`\`\`

控制器输出通常会转换成占空比命令（duty command / D）。

## 2. 不间断电源为什么需要它

不间断电源（uninterruptible power supply / UPS）里大量控制目标都需要闭环：

- 直流母线电压（DC bus voltage）要稳定。
- 功率因数校正（power factor correction / PFC）电流要跟踪参考。
- 逆变器（inverter）输出电压要跟踪正弦参考。
- 电池充放电电流要受限。

PI 控制器是很多 UPS C 语言工程的基础构件。你读控制中断服务程序（control interrupt service routine / control ISR）时，经常会看到误差计算、积分累加、限幅和占空比更新。

## 3. 物理直觉

比例项（proportional term / P）像“看到误差就立刻推一把”。误差越大，推得越大。

积分项（integral term / I）像“记账”。如果输出电压长期低于参考值，积分会不断累加，让占空比逐渐增加，直到稳态误差被消除。

占空比不能无限大，所以必须有限幅。积分项也不能无限累加，否则输出饱和后还继续积累，恢复时会很慢，这就是积分饱和或积分 windup。

## 4. 数学形式

位置式离散 PI 的一种常见写法：

\`\`\`text
e[k] = Vref - Vout[k]
I[k] = clamp(I[k-1] + Ki * e[k] * Ts, I_min, I_max)
u[k] = clamp(Kp * e[k] + I[k], D_min, D_max)
\`\`\`

其中：

- \`Ts\`：控制周期（control period）。
- \`Kp\`：比例增益（proportional gain）。
- \`Ki\`：积分增益（integral gain）。
- \`u[k]\`：控制输出，这里对应占空比命令。
- \`clamp\`：限幅函数。
- \`D_min\`、\`D_max\`：占空比上下限。

## 5. 仿真观察

使用脚本：

\`\`\`text
simulations/python/boost_discrete_pi.py
\`\`\`

图中观察三件事：

- 输出电压 \`Vout\` 是否接近参考电压 \`Vref\`。
- 电压误差 \`e\` 是否逐渐接近 0。
- 占空比命令 \`D\` 是否在上下限内变化。

当前模型是教学用平均模型，不是完整开关模型。它的目的是让你看懂闭环软件结构，而不是替代真实电源设计。

## 6. 固件落地

在 C 语言固件中，PI 通常出现在控制 ISR 里。这里的采样通常来自模数转换器（analog-to-digital converter / ADC），输出通常落到脉宽调制（pulse-width modulation / PWM）占空比：

\`\`\`text
读取 ADC -> 标幺化/滤波 -> 计算误差 -> PI 更新 -> 限幅 -> 更新 PWM 占空比
\`\`\`

读代码时要重点看：

- 误差的符号：是 \`Vref - Vout\` 还是 \`Vout - Vref\`。
- 积分项单位：是否乘了控制周期 \`Ts\`。
- 限幅位置：先限积分，还是只限最终输出。
- 饱和处理：输出到达上限或下限时，积分是否继续累加。
- 占空比更新：当前周期立即生效，还是下个更新事件生效。

## 7. 常见误解

- 错误理解：比例增益越大越快越好。  
  正确理解：过大的比例增益会导致振荡、噪声放大或占空比频繁打限。

- 错误理解：积分只要能消除稳态误差，就越大越好。  
  正确理解：积分过大可能导致超调和饱和恢复慢。

- 错误理解：输出限幅就够了，积分不需要管。  
  正确理解：输出饱和时积分继续累加，会造成 windup，必须考虑积分限幅或抗饱和。

- 错误理解：仿真里调好的 PI 参数可以直接放到公司产品。  
  正确理解：教学模型只说明结构。真实参数还要考虑采样、延迟、功率级、保护、噪声和硬件限制。

## 8. 一个仿真任务

运行：

\`\`\`powershell
python simulations\\python\\boost_discrete_pi.py --output simulations\\results\\boost_discrete_pi.png --no-open
python simulations\\python\\boost_discrete_pi.py --kp 0.006 --ki 40 --output simulations\\results\\boost_discrete_pi_slow.png --no-open
python simulations\\python\\boost_discrete_pi.py --duty-max 0.45 --output simulations\\results\\boost_discrete_pi_limited.png --no-open
\`\`\`

观察输出电压、参考电压、电压误差、占空比命令和占空比上下限。默认图路径是 \`simulations/results/boost_discrete_pi.png\`。

## 9. 验收标准

- 能解释误差、比例项、积分项、限幅和占空比命令的关系。
- 能写出位置式离散 PI 的基本公式。
- 能在图上指出输出电压、参考电压、误差和占空比。
- 能解释为什么占空比上限会导致输出电压达不到参考。
- 能说出读 C 代码时要检查误差符号、积分限幅和 PWM 更新时刻。

## 10. 复盘问题

- 打开 \`simulations/results/boost_discrete_pi.png\`，最终输出电压和参考电压相差多少？最终占空比是多少？
- 运行 \`--duty-max 0.45\` 后，如果输出达不到 96 V，是 PI 算法坏了，还是执行器限幅导致的？
- 如果 C 代码里误差写成 \`Vout - Vref\`，但 PI 输出仍直接加到占空比上，会发生什么？

## 11. 导师问题

- 我用 \`boost_discrete_pi.py\` 看到默认参数下最终输出约 96 V，占空比约 0.488。公司代码里的 Boost 或功率因数校正（power factor correction / PFC）电压环 PI 是位置式还是增量式？
- 我在脚本里对占空比和积分项都做了限幅。公司工程里抗积分饱和通常怎么写，是否有统一 PI 模块？
- 如果 ADC 采样值和 PWM 更新之间有一拍延迟，公司代码中会在 PI 参数整定时显式考虑这个延迟吗？
`},{title:"概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"连续导通模式（continuous conduction mode / CCM）指电感电流（inductor current）在一个开关周期内始终大于 0。断续导通模式（discontinuous conduction mode / DCM）指电感电流在一个开关周期内会降到 0，并保持一段零电流时间。",path:"content/power/concepts/ccm-dcm.md",url:"/content/power/concepts/ccm-dcm.html",body:`# 概念：连续导通模式（continuous conduction mode / CCM）与断续导通模式（discontinuous conduction mode / DCM）

## 1. 它是什么

连续导通模式（continuous conduction mode / CCM）指电感电流（inductor current）在一个开关周期内始终大于 0。断续导通模式（discontinuous conduction mode / DCM）指电感电流在一个开关周期内会降到 0，并保持一段零电流时间。

对 Boost 升压变换器（Boost converter）来说，CCM 和 DCM 不是两个不同电路，而是同一个电路在不同电感、负载、占空比和开关频率条件下表现出的两种工作状态。

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）里的功率因数校正（power factor correction / PFC）、电池升压直流-直流变换（direct current to direct current conversion / DC-DC）和辅助电源，都可能遇到电感电流是否断续的问题。

- 控制模型不同：CCM 常用平均模型更直观，DCM 的输入输出关系会受负载影响。
- 采样解释不同：电流采样如果落在零电流段，固件看到的不是“控制坏了”，而可能是工作模式已进入 DCM。
- 保护逻辑不同：轻载 DCM 很常见，不应误判为开路；重载下进入异常电流形态则要警惕电感饱和、驱动异常或采样异常。
- 噪声和效率不同：DCM 可能带来更大的峰值电流和电磁干扰（electromagnetic interference / EMI），但轻载控制可能更容易。

## 3. 物理直觉

电感像“电流惯性元件”。开关导通时，Boost 电感两端电压约为输入电压，电感电流上升；开关关断时，电感把能量送到输出，电感电流下降。

如果负载重、电感大、开关周期短，电感还没来得及把电流降到 0，下一个周期已经开始，这就是 CCM。

如果负载轻、电感小、开关周期长，电感在关断阶段把能量放完，电流降到 0，并等待下一个周期，这就是 DCM。

## 4. 数学形式

理想 Boost 在 CCM 下的电压关系是：

\`\`\`text
Vout = Vin / (1 - D)
\`\`\`

其中 \`D\` 是占空比（duty cycle / D）。

电感电流纹波可粗略估算为：

\`\`\`text
Delta_IL_on = Vin * D / (L * fsw)
\`\`\`

其中 \`L\` 是电感量（inductance），\`fsw\` 是开关频率（switching frequency）。当平均电感电流小于纹波的一半时，电流就容易碰到 0：

\`\`\`text
IL_avg <= Delta_IL / 2  ->  容易进入 DCM
\`\`\`

这个判断是工程直觉，不是完整设计公式。真实边界还会受输出电压、损耗、采样方式和控制策略影响。

## 5. 仿真观察

使用脚本：

\`\`\`text
simulations/python/boost_ccm_dcm.py
\`\`\`

默认参数偏向 DCM：

\`\`\`text
Vin=48 V, D=0.45, L=100 uH, C=470 uF, R=500 ohm, fsw=20 kHz
\`\`\`

观察重点：

- 电感电流曲线是否碰到红色零电流线。
- 图标题中的模式判断是 CCM 还是 DCM。
- 参数框里的 \`Tail zero fraction\` 是否明显大于 0。
- DCM 时最终输出电压不应机械套用 CCM 公式。

## 6. 固件落地

固件里不会直接拿示波器波形“看模式”，而是从采样值和状态判断：

- 电流采样接近 0 且持续出现在关断后段，可作为 DCM 迹象。
- 轻载时进入 DCM 可能是正常状态，不能直接报故障。
- 电流环控制器在 DCM 下的等效对象变化，比例积分控制器（proportional-integral controller / PI）的参数和限幅要谨慎。
- 保护逻辑要区分“轻载零电流”和“采样断线、驱动缺失、开关不开通”等故障。

## 7. 常见误解

- 错误理解：CCM 一定好，DCM 一定坏。  
  正确理解：它们是不同工况。重载功率级常希望 CCM 便于控制和降低峰值电流，轻载 DCM 很常见。

- 错误理解：只要占空比固定，Boost 输出一定等于 \`Vin / (1 - D)\`。  
  正确理解：这个公式主要适用于理想 CCM 稳态。DCM 下输出还与负载、电感、频率有关。

- 错误理解：电感电流碰到 0 就说明电路断了。  
  正确理解：轻载、小电感、高输出电压条件下，电感能量可能在本周期内释放完，这是 DCM 的正常现象。

- 错误理解：软件不需要关心 CCM/DCM。  
  正确理解：采样时刻、控制模型、保护阈值和轻载策略都会受工作模式影响。

## 8. 一个仿真任务

运行：

\`\`\`powershell
python simulations\\python\\boost_ccm_dcm.py --inductance 100e-6 --resistance 500 --output simulations\\results\\boost_ccm_dcm_dcm.png --no-open
python simulations\\python\\boost_ccm_dcm.py --inductance 1e-3 --resistance 50 --output simulations\\results\\boost_ccm_dcm_ccm.png --no-open
\`\`\`

观察两张图中的电感电流是否碰到零电流线，并记录 \`Tail min IL\`、\`Tail zero fraction\` 和模式判断。

## 9. 验收标准

- 能用一句话区分 CCM 和 DCM。
- 能在仿真图上指出电感电流是否碰到 0。
- 能说明为什么轻载、小电感更容易进入 DCM。
- 能解释为什么 DCM 下不能直接套用理想 CCM 公式。
- 能说出固件采样和保护逻辑为什么需要知道 CCM/DCM。

## 10. 复盘问题

- \`boost_ccm_dcm_dcm.png\` 里电感电流为 0 的区间对应开关导通、关断，还是关断后的等待？
- \`boost_ccm_dcm_ccm.png\` 里 \`Tail min IL\` 为什么能支持 CCM 判断？
- 如果把 \`--resistance 500\` 改成 \`--resistance 50\`，负载变重后为什么更不容易 DCM？

## 11. 导师问题

- 我用 \`boost_ccm_dcm.py --inductance 100e-6 --resistance 500\` 得到 DCM 波形，电感电流有明显零电流段。公司产品里轻载 PFC 或电池 DC-DC 是否允许类似零电流段？
- 我用 \`--inductance 1e-3 --resistance 50\` 得到 CCM 波形。实际项目里判断 CCM/DCM 主要看示波器电流探头，还是固件里的采样统计量？
- 如果固件在关断后段采到接近 0 A 的电感电流，公司通常如何区分正常 DCM、采样噪声和电流采样故障？
`},{title:"概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"脉宽调制（pulse-width modulation / PWM）是用固定开关频率下的导通时间比例来控制功率开关。这个比例叫占空比（duty cycle / D）。",path:"content/power/concepts/pwm-sampling.md",url:"/content/power/concepts/pwm-sampling.html",body:`# 概念：脉宽调制（pulse-width modulation / PWM）与模数转换器采样（analog-to-digital converter / ADC sampling）

## 1. 它是什么

脉宽调制（pulse-width modulation / PWM）是用固定开关频率下的导通时间比例来控制功率开关。这个比例叫占空比（duty cycle / D）。

模数转换器采样（analog-to-digital converter / ADC sampling）是把电压、电流等模拟量在某个时刻转换成数字量，交给控制中断服务程序（control interrupt service routine / control ISR）计算下一次控制输出。

本节只讲一个点：**PWM 决定功率级什么时候切换，ADC 决定固件在什么时候“看见”功率级。**

## 2. UPS 为什么需要它

不间断电源（uninterruptible power supply / UPS）控制软件不是连续观察电路，而是在固定时刻采样，再在固定中断里计算。

如果采样时刻不合适，固件可能看到：

- 开关噪声尖峰，而不是真实平均电流。
- 电感电流谷底，误以为电流太小或进入异常状态。
- 控制延迟增大，导致电压环或电流环相位裕度变差。

所以读 UPS C 语言工程时，必须看懂 PWM 更新事件、ADC 触发事件和控制 ISR 的时间关系。

## 3. 物理直觉

Boost 开关导通时，电感电流上升；开关关断时，电感电流下降。电流波形不是平滑直线，而是带有开关纹波。

ADC 如果刚好在开关跳变附近采样，就容易采到尖峰、振铃或驱动噪声。工程上常把采样点放在相对安静的位置，例如关断后经过一小段延时，或者电流纹波较稳定的位置。

这不是“采样越快越好”的问题，而是“在正确时刻采样”的问题。

## 4. 数学形式

开关周期：

\`\`\`text
Ts = 1 / fsw
\`\`\`

导通时间：

\`\`\`text
Ton = D * Ts
\`\`\`

采样时刻可以用周期内相位表示：

\`\`\`text
t_sample = (n + sample_phase) * Ts + sample_delay
\`\`\`

其中：

- \`fsw\`：开关频率（switching frequency）。
- \`Ts\`：开关周期（switching period）。
- \`D\`：占空比（duty cycle / D）。
- \`sample_phase\`：采样相位，0.8 表示每个周期 80% 位置。
- \`sample_delay\`：采样延迟，用来避开开关边沿后的噪声。

## 5. 仿真观察

使用脚本：

\`\`\`text
simulations/python/boost_pwm_sampling.py
\`\`\`

图中有三类信息：

- PWM 载波（PWM carrier）与占空比命令。
- 开关状态（switch state）。
- 电感电流（inductor current）与 ADC 采样点。

观察重点不是输出电压，而是采样点落在电流纹波的哪个位置。

## 6. 固件落地

在 C 语言工程里，这个概念通常分散在几个文件中：

- PWM 初始化：设置频率、计数模式、比较值和更新事件。
- ADC 初始化：设置触发源、采样通道、采样时间和转换序列。
- 控制 ISR：读取 ADC 结果，计算控制器，更新下一周期 PWM 占空比。
- 保护逻辑：判断采样值是否越界，是否需要关断 PWM 或进入故障状态。

你读代码时要追问：这个 ADC 值对应的是哪个 PWM 周期、哪个相位、哪个物理量？

## 7. 常见误解

- 错误理解：ADC 采样越快越好。  
  正确理解：采样频率和采样相位都重要。采在开关噪声上，快也没用。

- 错误理解：PWM 占空比一更新，输出马上按新值变化。  
  正确理解：很多定时器有影子寄存器（shadow register），新占空比要等更新事件才生效。

- 错误理解：控制 ISR 里读到的电流就是“当前连续真实电流”。  
  正确理解：它是某个采样时刻的离散值，带有采样延迟、滤波延迟和量化误差。

- 错误理解：仿真只要画平均值就够了。  
  正确理解：采样点和开关纹波的位置关系，必须看时序图才能理解。

## 8. 一个仿真任务

运行：

\`\`\`powershell
python simulations\\python\\boost_pwm_sampling.py --output simulations\\results\\boost_pwm_sampling.png --no-open
python simulations\\python\\boost_pwm_sampling.py --sample-phase 0.2 --output simulations\\results\\boost_pwm_sampling_phase_02.png --no-open
python simulations\\python\\boost_pwm_sampling.py --sample-phase 0.8 --output simulations\\results\\boost_pwm_sampling_phase_08.png --no-open
\`\`\`

观察红色 ADC 采样点落在电感电流纹波的哪个位置，并记录采样相位、采样延迟、采样电流值和开关状态。

## 9. 验收标准

- 能解释 PWM、ADC、控制 ISR 三者的先后关系。
- 能用 \`Ts = 1 / fsw\` 和 \`Ton = D * Ts\` 计算周期和导通时间。
- 能在 \`simulations/results/boost_pwm_sampling.png\` 上指出 ADC 采样点落在电感电流纹波的哪个位置。
- 能解释为什么采在开关边沿附近可能不可靠。
- 能把仿真图转换成一个具体的 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 \`simulations/results/boost_pwm_sampling.png\`，红色 ADC 采样点落在电感电流的上升段还是下降段？
- 如果 \`fsw = 20 kHz\`，一个开关周期是多少微秒？\`D = 0.45\` 时导通时间是多少微秒？
- 如果把采样点放在开关翻转边沿附近，固件可能读到什么问题？

## 11. 导师问题

- 我用 \`boost_pwm_sampling.py\` 看到 ADC 采样点放在每周期 80% 位置。公司 Boost 或功率因数校正（power factor correction / PFC）电流采样通常放在 PWM 周期的哪个相位，为什么？
- 如果控制 ISR 读取的是上一个 PWM 周期的 ADC 结果，公司代码里通常如何标注或处理这个一拍延迟？
- 公司平台的 PWM 占空比更新是立即生效，还是通过影子寄存器在更新事件生效？我应该从哪个初始化文件确认？
`},{title:"概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架",date:"2026-06-21",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"控制中断服务程序（control interrupt service routine / control ISR）是电源控制软件里按固定周期运行的核心函数。它通常完成：",path:"content/power/concepts/boost-firmware-skeleton.md",url:"/content/power/concepts/boost-firmware-skeleton.html",body:`# 概念：Boost 控制中断服务程序（control interrupt service routine / control ISR）软件骨架

## 1. 它是什么

控制中断服务程序（control interrupt service routine / control ISR）是电源控制软件里按固定周期运行的核心函数。它通常完成：

\`\`\`text
读取采样 -> 保护判断 -> 控制计算 -> 限幅 -> 更新调制输出 -> 记录状态
\`\`\`

本节用 Boost 电压闭环做一个通用学习骨架，不涉及任何公司内部代码、产品参数或客户项目数据。

## 2. 为什么 UPS 需要它

不间断电源（uninterruptible power supply / UPS）软件不是只有控制算法。一个能运行的基本软件至少要把这些事情串起来：

- 模数转换器（analog-to-digital converter / ADC）采样。
- 脉宽调制（pulse-width modulation / PWM）占空比更新。
- 离散比例积分控制器（discrete proportional-integral controller / discrete PI）计算。
- 过压、欠压、过流等保护。
- 故障锁存和安全关断。

如果只会 PI 公式，但看不懂 ISR 里的数据流，就很难阅读完整 C 工程。

## 3. 物理直觉

控制 ISR 像一条固定节拍的流水线。每来一次中断，软件只允许做一小段确定的事情：

1. 看一眼当前电压和电流。
2. 判断是否危险。
3. 如果安全，就计算下一次占空比。
4. 如果危险，就关断调制输出，并锁存故障。

故障锁存的意思是：一旦出现严重故障，不因为下一次采样恢复正常就自动重新开机。真实 UPS 需要明确的复位条件和状态机。

## 4. 数学形式

控制 ISR 的核心可以写成伪代码。下面的 \`OV\`、\`UV\`、\`OC\` 分别表示过压阈值（over-voltage threshold / OV）、欠压阈值（under-voltage threshold / UV）和过流阈值（over-current threshold / OC）：

\`\`\`text
if fault_latched:
    duty = 0
elif Vout > OV:
    fault = over_voltage
    duty = 0
elif Vout < UV:
    fault = under_voltage
    duty = 0
elif abs(IL) > OC:
    fault = over_current
    duty = 0
else:
    error = Vref - Vout
    integrator = clamp(integrator + Ki * error * Ts)
    duty = clamp(Kp * error + integrator, Dmin, Dmax)
\`\`\`

这段伪代码的重点不是语法，而是顺序：故障锁存优先，其次保护判断，最后才允许控制器更新占空比。

## 5. 仿真观察

使用脚本：

\`\`\`text
simulations/python/boost_firmware_skeleton.py
\`\`\`

图中观察四件事：

- 输出电压是否跟踪参考值。
- 估算电感电流是否低于过流阈值。
- 占空比命令是否在运行中变化。
- 故障码是否保持为 \`NONE\`，或者在故障后锁存。

可以故意降低过压阈值来观察故障锁存：

\`\`\`text
python simulations/python/boost_firmware_skeleton.py --over-voltage 90 --output simulations/results/boost_firmware_ov_fault.png
\`\`\`

## 6. 固件落地

真实 C 工程中，这个骨架可能分散在多个文件：

- \`adc.c\` 或驱动层：采样触发、转换结果读取。
- \`pwm.c\` 或驱动层：比较寄存器、占空比更新、关断输出。
- \`control.c\`：控制 ISR、PI 控制器、前馈、限幅。
- \`protection.c\`：过压、欠压、过流、采样异常。
- \`state_machine.c\`：启动、运行、故障、恢复。

阅读时不要只找一个 \`PI()\` 函数。要沿着“ADC 数据从哪里来、保护在哪里判断、PWM 在哪里更新、故障如何锁存”这条链路追踪。

## 7. 常见误解

- 错误理解：控制算法就是固件主体。  
  正确理解：控制算法只是固件的一部分，保护、状态机、驱动接口和参数管理同样关键。

- 错误理解：故障采样恢复正常后就可以自动继续输出。  
  正确理解：严重故障通常要锁存，等待状态机确认复位条件。

- 错误理解：保护逻辑都可以放在慢任务里。  
  正确理解：过流、过压等快速风险通常要在 ISR 或硬件比较器里快速处理。

- 错误理解：Python 骨架和真实 C 工程差不多。  
  正确理解：Python 骨架只帮助理解数据流。真实工程还要处理外设寄存器、定点数、实时性、异常路径和硬件保护。

## 8. 保密边界

本仓库只记录公开的、教学用的简化模型和个人理解，不能记录公司内部代码、未公开产品方案、客户项目参数、内部测试数据、内部通信协议细节或任何无法公开复述的调试结论。向导师请教时，可以展示本节生成的 Python 波形、参数、伪代码和自己的问题，但不要把公司工程文件复制进本仓库。

## 9. 验收标准

- 能画出采样、保护、控制、限幅、脉宽调制（pulse-width modulation / PWM）更新的控制中断服务程序（control interrupt service routine / control ISR）数据流。
- 能解释为什么故障锁存后占空比命令保持为 0，而不是采样恢复正常后自动重启。
- 能在 \`simulations/results/boost_firmware_skeleton.png\` 上指出输出电压、估算电感电流、占空比命令和故障码。
- 能说明哪些逻辑适合放在 ISR，哪些逻辑更适合放在状态机。
- 能基于脚本中的 \`control_isr()\` 准备 C 工程代码阅读问题。

## 10. 复盘问题

- 打开 \`simulations/results/boost_firmware_skeleton.png\`，最终故障码是什么？最终占空比是多少？
- 运行 \`python simulations/python/boost_firmware_skeleton.py --over-voltage 90 --output simulations/results/boost_firmware_ov_fault.png\` 后，故障发生后占空比是否恢复？为什么？
- 如果真实 C 工程里保护判断放在比例积分控制器之后，可能有什么风险？

## 11. 导师问题

- 我用 \`boost_firmware_skeleton.py\` 看到正常运行时最终故障码是 \`NONE\`，占空比约 0.526。公司代码中 Boost 或功率因数校正（power factor correction / PFC）控制 ISR 的数据流是否也是“采样、保护、控制、限幅、更新 PWM”？
- 我把 \`--over-voltage 90\` 后会触发过压故障并关断占空比。公司工程里故障锁存和故障清除通常由哪个模块负责？
- 如果某些过流保护由硬件比较器处理，固件 ISR 里还会不会重复检查软件过流阈值？
`},{title:"概念：升压变换器（Boost Converter）",date:"2026-06-20",category:"电源控制",tags:["power-electronics"],source:"power",status:"learning",visibility:"public",summary:"升压变换器（Boost converter）是一种开关电源电路，它通过“先把能量存进电感，再把电感能量送到输出”的方式，把较低的直流输入电压（DC input voltage）变成较高的直流输出电压（DC output voltage）。",path:"content/power/concepts/boost-converter.md",url:"/content/power/concepts/boost-converter.html",body:`# 概念：升压变换器（Boost Converter）

## 1. 它是什么（What It Is）

升压变换器（Boost converter）是一种开关电源电路，它通过“先把能量存进电感，再把电感能量送到输出”的方式，把较低的直流输入电压（DC input voltage）变成较高的直流输出电压（DC output voltage）。

一句话：**Boost 不是凭空升压，而是用电感暂存能量，再在关断阶段把输入电压和电感电压叠加到输出。**

## 2. UPS 为什么需要它（Why UPS Needs It）

UPS（uninterruptible power supply，不间断电源）通常需要一个稳定的高压直流母线（DC bus），后级逆变器（inverter）才能把直流电变成交流输出。

Boost 类电路常出现在这些位置：

- 单相功率因数校正（power factor correction / PFC）前级：把整流后的电压升到稳定 DC 母线，同时让输入电流更接近正弦。
- 电池放电路径（battery discharge path）：电池电压较低时，需要升压后供给母线。
- 其他前端电源变换级（front-end power conversion stage）：把不稳定输入变成可控直流输出。

所以你学 Boost，不只是学一个小拓扑，而是在学 PFC、DC-DC、电池供电、母线控制的共同基础。

## 3. 物理直觉（Physical Intuition）

关键元件是电感（inductor）。电感的基本性格是：**不允许电流突然变化**。

### 开关导通阶段（switch on-time）

开关管（switch，例如 MOSFET）导通时，输入电源把电压加到电感上，电感电流（inductor current）上升，磁场能量增加。

\`\`\`text
输入电源 -> 电感 -> 开关管 -> 地
source -> inductor -> switch -> ground
\`\`\`

这时二极管（diode）反向截止，输出端主要靠输出电容（output capacitor）给负载供电。

### 开关关断阶段（switch off-time）

开关管关断时，电感电流不能立刻变成 0。为了维持电流继续流动，电感两端电压会反向，和输入电源一起把电流推过二极管，送到输出端。

\`\`\`text
输入电源 + 电感 -> 二极管 -> 输出电容和负载
source + inductor -> diode -> output capacitor and load
\`\`\`

输出电压能高于输入电压，是因为关断阶段输出端收到的是“输入电源 + 电感释放能量”的共同作用。

## 4. 数学形式（Mathematical Form）

在理想连续导通模式（continuous conduction mode / CCM）下，Boost 的稳态电压关系是：

\`\`\`text
Vout = Vin / (1 - D)
\`\`\`

其中：

- \`Vin\`：输入电压（input voltage），单位 V。
- \`Vout\`：输出电压（output voltage），单位 V。
- \`D\`：占空比（duty cycle），表示一个开关周期内导通时间所占比例，范围是 0 到 1 之间。

这个公式来自电感伏秒平衡（inductor volt-second balance）：稳态时，电感一个周期内的平均电压必须为 0。

导通时：

\`\`\`text
VL = Vin
\`\`\`

关断时：

\`\`\`text
VL = Vin - Vout
\`\`\`

一个周期平均为 0：

\`\`\`text
Vin * D + (Vin - Vout) * (1 - D) = 0
\`\`\`

整理得到：

\`\`\`text
Vout = Vin / (1 - D)
\`\`\`

注意：这个公式有前提。它假设器件理想、稳态、连续导通模式（CCM）、没有二极管压降、没有开关损耗、没有电容电阻损耗，并且控制稳定。

## 5. 仿真观察（Simulation Observation）

使用脚本：

\`\`\`text
simulations/python/boost_open_loop.py
\`\`\`

你要观察：

- 占空比（duty cycle / D）增大时，输出电压通常会上升。
- 开关导通时，电感电流上升。
- 开关关断时，电感电流下降。
- 电感量（inductance / L）变大时，电流纹波（current ripple）变小。
- 电容量（capacitance / C）变大时，输出电压纹波（voltage ripple）变小。

当前这个 Python 脚本是开环开关仿真（open-loop switching simulation），目的不是做商业级精确模型，而是让你看见两个开关状态和能量转移。

如果仿真结果和 \`Vout = Vin / (1 - D)\` 不一致，不要急着认为公式错了。先检查它是否真的满足理想 CCM 稳态条件。

## 6. 固件落地（Firmware Landing）

在嵌入式固件（embedded firmware）里，Boost 通常会对应这些内容：

- PWM 占空比命令（PWM duty command）：决定开关管导通多久。
- ADC 采样（analog-to-digital converter sampling）：采输入电压、输出电压、电感电流。
- 控制中断服务程序（control interrupt service routine / control ISR）：周期性计算下一次占空比。
- 保护逻辑（protection logic）：过流、过压、欠压、采样异常。
- 状态机（state machine）：软启动、正常运行、故障、恢复。

在 PFC 里，Boost 级不仅要让 \`Vout\` 稳定，还要让输入电流跟随输入电压波形，从而提高功率因数（power factor / PF）。

## 7. 常见误解（Common Misunderstandings）

- 错误理解：Boost 能凭空创造能量。  
  正确理解：Boost 是用更大的输入电流换更高的输出电压，忽略损耗时输入功率约等于输出功率。

- 错误理解：占空比越接近 1，输出电压就能无限升高。  
  正确理解：真实电路受开关损耗、电感饱和、二极管恢复、电流限制、控制稳定性限制，占空比不能无限接近 1。

- 错误理解：输出电压升高是因为电容自己充得更高。  
  正确理解：电容只是储能和滤波，升压的关键是电感在关断阶段改变电压极性，把能量推到输出端。

- 错误理解：\`Vout = Vin / (1 - D)\` 永远准确。  
  正确理解：它是理想 CCM 稳态公式。断续导通模式（DCM）、损耗、开环不稳定、负载变化都会让结果偏离。

## 8. 可以问导师的问题（Mentor Questions）

- 公司 UPS 产品中，哪些模块最像 Boost 变换器：PFC 前级、电池放电路径，还是其他模块？
- 公司调试 PFC 时更常用平均模型（average model）还是开关模型（switching model）？
- Boost 类功率级中，哪些电压和电流保护是必须硬件快速处理的？
`}],Ga={class:"kb-archive"},Ea={class:"kb-filterbar"},Ra=["value"],Ua=["value"],Oa={class:"kb-result-count"},qa={class:"kb-article-list"},za=["href"],Ka={class:"kb-article-date"},ja={class:"kb-article-summary"},Ja={class:"kb-tags"},Qa=h({__name:"ArchivePage",setup(e){const n=M(""),t=M("全部"),o=M("全部"),s=Ha,i=C(()=>["全部",...Array.from(new Set(s.map(p=>p.category))).sort()]),c=C(()=>["全部",...Array.from(new Set(s.map(p=>p.date.slice(0,7)))).sort().reverse()]),m=C(()=>{const p=n.value.trim().toLowerCase();return s.filter(_=>{const g=t.value==="全部"||_.category===t.value,b=o.value==="全部"||_.date.startsWith(o.value),$=[_.title,_.summary,_.category,..._.tags,_.body].join(" ").toLowerCase(),L=!p||$.includes(p);return g&&b&&L})});return(p,_)=>(a(),l("section",Ga,[d("div",Ea,[se(d("input",{"onUpdate:modelValue":_[0]||(_[0]=g=>n.value=g),class:"kb-search-input","aria-label":"关键词搜索",title:"搜索 Buck / FOC / SVPWM / 采样时序"},null,512),[[Ye,n.value]]),se(d("select",{"onUpdate:modelValue":_[1]||(_[1]=g=>t.value=g),class:"kb-select","aria-label":"分类"},[(a(!0),l(S,null,T(i.value,g=>(a(),l("option",{key:g,value:g},w(g),9,Ra))),128))],512),[[Pe,t.value]]),se(d("select",{"onUpdate:modelValue":_[2]||(_[2]=g=>o.value=g),class:"kb-select","aria-label":"时间"},[(a(!0),l(S,null,T(c.value,g=>(a(),l("option",{key:g,value:g},w(g),9,Ua))),128))],512),[[Pe,o.value]])]),d("div",Oa,w(m.value.length)+" 篇文章",1),d("div",qa,[(a(!0),l(S,null,T(m.value,g=>(a(),l("a",{key:g.url,class:"kb-article-card",href:g.url},[d("span",Ka,w(g.date),1),d("strong",null,w(g.title),1),d("span",ja,w(g.summary),1),d("span",Ja,[(a(!0),l(S,null,T(g.tags,b=>(a(),l("span",{key:b,class:"kb-tag"},w(b),1))),128))])],8,za))),128))])]))}}),Xa={extends:We,Layout:Wa,enhanceApp({app:e}){e.component("ArchivePage",Qa)}};export{Xa as R,fs as c,V as u};
