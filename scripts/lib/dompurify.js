!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DOMPurify=t()}(this,(function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:r}=Object;let{freeze:i,seal:a,create:l}=Object,{apply:c,construct:s}="undefined"!=typeof Reflect&&Reflect;i||(i=function(e){return e}),a||(a=function(e){return e}),c||(c=function(e,t,n){return e.apply(t,n)}),s||(s=function(e,t){return new e(...t)});const u=b(Array.prototype.forEach),m=b(Array.prototype.pop),f=b(Array.prototype.push),p=b(String.prototype.toLowerCase),d=b(String.prototype.toString),h=b(String.prototype.match),g=b(String.prototype.replace),T=b(String.prototype.indexOf),y=b(String.prototype.trim),E=b(Object.prototype.hasOwnProperty),A=b(RegExp.prototype.test),_=(N=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s(N,t)});var N;function b(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return c(e,t,o)}}function S(e,o){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p;t&&t(e,null);let i=o.length;for(;i--;){let t=o[i];if("string"==typeof t){const e=r(t);e!==t&&(n(o)||(o[i]=e),t=e)}e[t]=!0}return e}function R(e){for(let t=0;t<e.length;t++)E(e,t)||(e[t]=null);return e}function w(t){const n=l(null);for(const[o,r]of e(t))E(t,o)&&(Array.isArray(r)?n[o]=R(r):r&&"object"==typeof r&&r.constructor===Object?n[o]=w(r):n[o]=r);return n}function L(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return b(n.get);if("function"==typeof n.value)return b(n.value)}e=o(e)}return function(){return null}}const D=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),C=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),O=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),x=i(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),v=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),k=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),M=i(["#text"]),I=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),U=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),P=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),F=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),H=a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),z=a(/<%[\w\W]*|[\w\W]*%>/gm),B=a(/\${[\w\W]*}/gm),W=a(/^data-[\-\w.\u00B7-\uFFFF]/),G=a(/^aria-[\-\w]+$/),Y=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),j=a(/^(?:\w+script|data):/i),X=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=a(/^html$/i),$=a(/^[a-z][.\w]*(-[.\w]+)+$/i);var K=Object.freeze({__proto__:null,MUSTACHE_EXPR:H,ERB_EXPR:z,TMPLIT_EXPR:B,DATA_ATTR:W,ARIA_ATTR:G,IS_ALLOWED_URI:Y,IS_SCRIPT_OR_DATA:j,ATTR_WHITESPACE:X,DOCTYPE_NAME:q,CUSTOM_ELEMENT:$});const V=function(){return"undefined"==typeof window?null:window},Z=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return null}};var J=function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V();const o=e=>t(e);if(o.version="3.1.0",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;let{document:r}=n;const a=r,c=a.currentScript,{DocumentFragment:s,HTMLTemplateElement:N,Node:b,Element:R,NodeFilter:H,NamedNodeMap:z=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:B,DOMParser:W,trustedTypes:G}=n,j=R.prototype,X=L(j,"cloneNode"),$=L(j,"nextSibling"),J=L(j,"childNodes"),Q=L(j,"parentNode");if("function"==typeof N){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let ee,te="";const{implementation:ne,createNodeIterator:oe,createDocumentFragment:re,getElementsByTagName:ie}=r,{importNode:ae}=a;let le={};o.isSupported="function"==typeof e&&"function"==typeof Q&&ne&&void 0!==ne.createHTMLDocument;const{MUSTACHE_EXPR:ce,ERB_EXPR:se,TMPLIT_EXPR:ue,DATA_ATTR:me,ARIA_ATTR:fe,IS_SCRIPT_OR_DATA:pe,ATTR_WHITESPACE:de,CUSTOM_ELEMENT:he}=K;let{IS_ALLOWED_URI:ge}=K,Te=null;const ye=S({},[...D,...C,...O,...v,...M]);let Ee=null;const Ae=S({},[...I,...U,...P,...F]);let _e=Object.seal(l(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,be=null,Se=!0,Re=!0,we=!1,Le=!0,De=!1,Ce=!0,Oe=!1,xe=!1,ve=!1,ke=!1,Me=!1,Ie=!1,Ue=!0,Pe=!1;const Fe="user-content-";let He=!0,ze=!1,Be={},We=null;const Ge=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ye=null;const je=S({},["audio","video","img","source","image","track"]);let Xe=null;const qe=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$e="http://www.w3.org/1998/Math/MathML",Ke="http://www.w3.org/2000/svg",Ve="http://www.w3.org/1999/xhtml";let Ze=Ve,Je=!1,Qe=null;const et=S({},[$e,Ke,Ve],d);let tt=null;const nt=["application/xhtml+xml","text/html"],ot="text/html";let rt=null,it=null;const at=r.createElement("form"),lt=function(e){return e instanceof RegExp||e instanceof Function},ct=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!it||it!==e){if(e&&"object"==typeof e||(e={}),e=w(e),tt=-1===nt.indexOf(e.PARSER_MEDIA_TYPE)?ot:e.PARSER_MEDIA_TYPE,rt="application/xhtml+xml"===tt?d:p,Te=E(e,"ALLOWED_TAGS")?S({},e.ALLOWED_TAGS,rt):ye,Ee=E(e,"ALLOWED_ATTR")?S({},e.ALLOWED_ATTR,rt):Ae,Qe=E(e,"ALLOWED_NAMESPACES")?S({},e.ALLOWED_NAMESPACES,d):et,Xe=E(e,"ADD_URI_SAFE_ATTR")?S(w(qe),e.ADD_URI_SAFE_ATTR,rt):qe,Ye=E(e,"ADD_DATA_URI_TAGS")?S(w(je),e.ADD_DATA_URI_TAGS,rt):je,We=E(e,"FORBID_CONTENTS")?S({},e.FORBID_CONTENTS,rt):Ge,Ne=E(e,"FORBID_TAGS")?S({},e.FORBID_TAGS,rt):{},be=E(e,"FORBID_ATTR")?S({},e.FORBID_ATTR,rt):{},Be=!!E(e,"USE_PROFILES")&&e.USE_PROFILES,Se=!1!==e.ALLOW_ARIA_ATTR,Re=!1!==e.ALLOW_DATA_ATTR,we=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Le=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,De=e.SAFE_FOR_TEMPLATES||!1,Ce=!1!==e.SAFE_FOR_XML,Oe=e.WHOLE_DOCUMENT||!1,ke=e.RETURN_DOM||!1,Me=e.RETURN_DOM_FRAGMENT||!1,Ie=e.RETURN_TRUSTED_TYPE||!1,ve=e.FORCE_BODY||!1,Ue=!1!==e.SANITIZE_DOM,Pe=e.SANITIZE_NAMED_PROPS||!1,He=!1!==e.KEEP_CONTENT,ze=e.IN_PLACE||!1,ge=e.ALLOWED_URI_REGEXP||Y,Ze=e.NAMESPACE||Ve,_e=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&lt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&lt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(_e.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(Re=!1),Me&&(ke=!0),Be&&(Te=S({},M),Ee=[],!0===Be.html&&(S(Te,D),S(Ee,I)),!0===Be.svg&&(S(Te,C),S(Ee,U),S(Ee,F)),!0===Be.svgFilters&&(S(Te,O),S(Ee,U),S(Ee,F)),!0===Be.mathMl&&(S(Te,v),S(Ee,P),S(Ee,F))),e.ADD_TAGS&&(Te===ye&&(Te=w(Te)),S(Te,e.ADD_TAGS,rt)),e.ADD_ATTR&&(Ee===Ae&&(Ee=w(Ee)),S(Ee,e.ADD_ATTR,rt)),e.ADD_URI_SAFE_ATTR&&S(Xe,e.ADD_URI_SAFE_ATTR,rt),e.FORBID_CONTENTS&&(We===Ge&&(We=w(We)),S(We,e.FORBID_CONTENTS,rt)),He&&(Te["#text"]=!0),Oe&&S(Te,["html","head","body"]),Te.table&&(S(Te,["tbody"]),delete Ne.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');ee=e.TRUSTED_TYPES_POLICY,te=ee.createHTML("")}else void 0===ee&&(ee=Z(G,c)),null!==ee&&"string"==typeof te&&(te=ee.createHTML(""));i&&i(e),it=e}},st=S({},["mi","mo","mn","ms","mtext"]),ut=S({},["foreignobject","desc","title","annotation-xml"]),mt=S({},["title","style","font","a","script"]),ft=S({},[...C,...O,...x]),pt=S({},[...v,...k]),dt=function(e){let t=Q(e);t&&t.tagName||(t={namespaceURI:Ze,tagName:"template"});const n=p(e.tagName),o=p(t.tagName);return!!Qe[e.namespaceURI]&&(e.namespaceURI===Ke?t.namespaceURI===Ve?"svg"===n:t.namespaceURI===$e?"svg"===n&&("annotation-xml"===o||st[o]):Boolean(ft[n]):e.namespaceURI===$e?t.namespaceURI===Ve?"math"===n:t.namespaceURI===Ke?"math"===n&&ut[o]:Boolean(pt[n]):e.namespaceURI===Ve?!(t.namespaceURI===Ke&&!ut[o])&&!(t.namespaceURI===$e&&!st[o])&&!pt[n]&&(mt[n]||!ft[n]):!("application/xhtml+xml"!==tt||!Qe[e.namespaceURI]))},ht=function(e){f(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},gt=function(e,t){try{f(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){f(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Ee[e])if(ke||Me)try{ht(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},Tt=function(e){let t=null,n=null;if(ve)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===tt&&Ze===Ve&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=ee?ee.createHTML(e):e;if(Ze===Ve)try{t=(new W).parseFromString(o,tt)}catch(e){}if(!t||!t.documentElement){t=ne.createDocument(Ze,"template",null);try{t.documentElement.innerHTML=Je?te:o}catch(e){}}const i=t.body||t.documentElement;return e&&n&&i.insertBefore(r.createTextNode(n),i.childNodes[0]||null),Ze===Ve?ie.call(t,Oe?"html":"body")[0]:Oe?t.documentElement:i},yt=function(e){return oe.call(e.ownerDocument||e,e,H.SHOW_ELEMENT|H.SHOW_COMMENT|H.SHOW_TEXT|H.SHOW_PROCESSING_INSTRUCTION|H.SHOW_CDATA_SECTION,null)},Et=function(e){return e instanceof B&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof z)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},At=function(e){return"function"==typeof b&&e instanceof b},_t=function(e,t,n){le[e]&&u(le[e],(e=>{e.call(o,t,n,it)}))},Nt=function(e){let t=null;if(_t("beforeSanitizeElements",e,null),Et(e))return ht(e),!0;const n=rt(e.nodeName);if(_t("uponSanitizeElement",e,{tagName:n,allowedTags:Te}),e.hasChildNodes()&&!At(e.firstElementChild)&&A(/<[/\w]/g,e.innerHTML)&&A(/<[/\w]/g,e.textContent))return ht(e),!0;if(7===e.nodeType)return ht(e),!0;if(Ce&&8===e.nodeType&&A(/<[/\w]/g,e.data))return ht(e),!0;if(!Te[n]||Ne[n]){if(!Ne[n]&&St(n)){if(_e.tagNameCheck instanceof RegExp&&A(_e.tagNameCheck,n))return!1;if(_e.tagNameCheck instanceof Function&&_e.tagNameCheck(n))return!1}if(He&&!We[n]){const t=Q(e)||e.parentNode,n=J(e)||e.childNodes;if(n&&t)for(let o=n.length-1;o>=0;--o)t.insertBefore(X(n[o],!0),$(e))}return ht(e),!0}return e instanceof R&&!dt(e)?(ht(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!A(/<\/no(script|embed|frames)/i,e.innerHTML)?(De&&3===e.nodeType&&(t=e.textContent,u([ce,se,ue],(e=>{t=g(t,e," ")})),e.textContent!==t&&(f(o.removed,{element:e.cloneNode()}),e.textContent=t)),_t("afterSanitizeElements",e,null),!1):(ht(e),!0)},bt=function(e,t,n){if(Ue&&("id"===t||"name"===t)&&(n in r||n in at))return!1;if(Re&&!be[t]&&A(me,t));else if(Se&&A(fe,t));else if(!Ee[t]||be[t]){if(!(St(e)&&(_e.tagNameCheck instanceof RegExp&&A(_e.tagNameCheck,e)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(e))&&(_e.attributeNameCheck instanceof RegExp&&A(_e.attributeNameCheck,t)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(t))||"is"===t&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&A(_e.tagNameCheck,n)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(n))))return!1}else if(Xe[t]);else if(A(ge,g(n,de,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==T(n,"data:")||!Ye[e])if(we&&!A(pe,g(n,de,"")));else if(n)return!1;return!0},St=function(e){return"annotation-xml"!==e&&h(e,he)},Rt=function(e){_t("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee};let r=t.length;for(;r--;){const i=t[r],{name:a,namespaceURI:l,value:c}=i,s=rt(a);let f="value"===a?c:y(c);if(n.attrName=s,n.attrValue=f,n.keepAttr=!0,n.forceKeepAttr=void 0,_t("uponSanitizeAttribute",e,n),f=n.attrValue,n.forceKeepAttr)continue;if(gt(a,e),!n.keepAttr)continue;if(!Le&&A(/\/>/i,f)){gt(a,e);continue}De&&u([ce,se,ue],(e=>{f=g(f,e," ")}));const p=rt(e.nodeName);if(bt(p,s,f)){if(!Pe||"id"!==s&&"name"!==s||(gt(a,e),f=Fe+f),ee&&"object"==typeof G&&"function"==typeof G.getAttributeType)if(l);else switch(G.getAttributeType(p,s)){case"TrustedHTML":f=ee.createHTML(f);break;case"TrustedScriptURL":f=ee.createScriptURL(f);break}try{l?e.setAttributeNS(l,a,f):e.setAttribute(a,f),m(o.removed)}catch(e){}}}_t("afterSanitizeAttributes",e,null)},wt=function e(t){let n=null;const o=yt(t);for(_t("beforeSanitizeShadowDOM",t,null);n=o.nextNode();)_t("uponSanitizeShadowNode",n,null),Nt(n)||(n.content instanceof s&&e(n.content),Rt(n));_t("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,i=null,l=null;if(Je=!e,Je&&(e="\x3c!--\x3e"),"string"!=typeof e&&!At(e)){if("function"!=typeof e.toString)throw _("toString is not a function");if("string"!=typeof(e=e.toString()))throw _("dirty is not a string, aborting")}if(!o.isSupported)return e;if(xe||ct(t),o.removed=[],"string"==typeof e&&(ze=!1),ze){if(e.nodeName){const t=rt(e.nodeName);if(!Te[t]||Ne[t])throw _("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof b)n=Tt("\x3c!----\x3e"),r=n.ownerDocument.importNode(e,!0),1===r.nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!ke&&!De&&!Oe&&-1===e.indexOf("<"))return ee&&Ie?ee.createHTML(e):e;if(n=Tt(e),!n)return ke?null:Ie?te:""}n&&ve&&ht(n.firstChild);const c=yt(ze?e:n);for(;i=c.nextNode();)Nt(i)||(i.content instanceof s&&wt(i.content),Rt(i));if(ze)return e;if(ke){if(Me)for(l=re.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return(Ee.shadowroot||Ee.shadowrootmode)&&(l=ae.call(a,l,!0)),l}let m=Oe?n.outerHTML:n.innerHTML;return Oe&&Te["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&A(q,n.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+m),De&&u([ce,se,ue],(e=>{m=g(m,e," ")})),ee&&Ie?ee.createHTML(m):m},o.setConfig=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};ct(e),xe=!0},o.clearConfig=function(){it=null,xe=!1},o.isValidAttribute=function(e,t,n){it||ct({});const o=rt(e),r=rt(t);return bt(o,r,n)},o.addHook=function(e,t){"function"==typeof t&&(le[e]=le[e]||[],f(le[e],t))},o.removeHook=function(e){if(le[e])return m(le[e])},o.removeHooks=function(e){le[e]&&(le[e]=[])},o.removeAllHooks=function(){le={}},o}();return J}));