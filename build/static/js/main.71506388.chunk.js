(this["webpackJsonpbeauty-challenge"]=this["webpackJsonpbeauty-challenge"]||[]).push([[0],{10:function(e,t,r){"use strict";r.r(t);var o=r(1),n=r(0),a=r.n(n),i=r(3),l=r.n(i);r(9),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function c(e,t){var r=Object(n.useState)((function(){var r=new URLSearchParams(location.search).get(e);return null===r?t:r})),a=Object(o.a)(r,2),i=a[0],l=a[1],c=Object(n.useRef)(null),u=Object(n.useRef)(!1);return Object(n.useLayoutEffect)((function(){c.current=i,u.current||(u.current=!0,setTimeout((function(){if(u.current){var t=new URLSearchParams(location.search);t.set(e,c.current),history.replaceState(null,null,"?"+t.toString()),u.current=!1}}),500))}),[e,i,c,u]),[i,l]}function u(e,t){13!==e.keyCode&&27!==e.keyCode||(e.preventDefault(),e.target.blur()),13===e.keyCode&&t(e.target.value)}function s(e,t){return e+"?"+function(e){var t=new URLSearchParams;return Object.entries(e).forEach((function(e){var r=Object(o.a)(e,2),n=r[0],a=r[1];return void 0!==a&&t.append(n,a)})),t}(t)}function d(e,t){var r=Math.abs(Math.sin((e+t)/2));return Math.min(1,r*r*r+.5).toFixed(2)}var m=a.a.forwardRef((function(e,t){var r=e.height,o=e.outerColor,n=e.innerColor,i=e.arrowColor,l=e.leftShade,c=e.rightShade,u=e.onOuterColor,s=e.onArrowColor;return a.a.createElement("svg",{ref:t,className:"mx-auto max-w-xs",xmlns:"http://www.w3.org/2000/svg",width:"100%",height:r,viewBox:"-1800 -3118 3600 3118"},a.a.createElement("path",{onClick:s,d:"M0-15e2v1e3L-866 0z",style:{fill:i,opacity:l}}),a.a.createElement("path",{onClick:s,d:"M0-15e2v1e3L866 0z",style:{fill:i,opacity:c}}),a.a.createElement("path",{d:"M0-2118v618L-866 0h-357z",style:{fill:n,opacity:l}}),a.a.createElement("path",{d:"M0-2118v618L866 0h357z",style:{fill:n,opacity:c}}),a.a.createElement("path",{onClick:u,d:"M0-3118v1e3L-1223 0h-577z",style:{fill:o,opacity:l}}),a.a.createElement("path",{onClick:u,d:"M0-3118v1e3L1223 0h577z",style:{fill:o,opacity:c}}))})),f=a.a.forwardRef((function(e,t){var r=e.label,o=e.color,n=e.setColor,i=e.colors;return a.a.createElement("div",{className:"flex flex-col"},a.a.createElement("fieldset",null,a.a.createElement("legend",{className:["block text-sm font-medium",i.inputLabel].join(" ")},r),a.a.createElement("div",{className:"flex mt-1"},a.a.createElement("input",{ref:t,type:"color",value:o,onKeyDown:function(e){return u(e,n)},onChange:function(e){return n(e.target.value)},className:["mr-3 w-12 h-10 md:w-8 md:h-8 appearance-none outline-none rounded-md overflow-hidden border",i.border,i.borderFocus,i.bg].join(" ")}),a.a.createElement("input",{type:"text",value:o,onKeyDown:function(e){return u(e,n)},onChange:function(e){return n(e.target.value)},className:["form-input w-full h-10 md:w-28 md:h-8 appearance-none outline-none rounded-md overflow-hidden border",i.border,i.borderFocus,i.inputText,i.inputTextFocus,i.inputTextPlaceholder,i.inputBg,i.inputBgHover,i.inputBgFocus].join(" "),placeholder:"#rrggbb"}))))})),h={dark:{bg:"bg-gray-900",bgButtons:"bg-gray-700",bgNav:"bg-gray-800",border:"border-gray-500",borderFocus:"focus:border-white",title:"text-white",description:"text-gray-300 ",modeButtonText:"text-gray-300",modeButtonTextHover:"hover:text-white",resetButtonActive:"active:bg-gray-700",resetButtonBg:"bg-gray-600",resetButtonHover:"hover:bg-gray-500",resetButtonText:"text-white",twitterButtonActive:"active:bg-blue-700",twitterButtonBg:"bg-blue-600",twitterButtonHover:"hover:bg-blue-500",twitterButtonText:"text-white",inputBg:"bg-gray-800",inputBgFocus:"focus:bg-gray-900",inputBgHover:"hover:bg-gray-900",inputLabel:"text-gray-500",inputText:"text-gray-100",inputTextFocus:"focus:text-white",inputTextPlaceHolder:"placeholder-gray-500"},light:{bg:"bg-gray-100",bgButtons:"bg-gray-300",bgNav:"bg-gray-200",border:"border-gray-500",borderFocus:"focus:border-black",title:"text-black",description:"text-gray-700 ",modeButtonText:"text-gray-700",modeButtonTextHover:"hover:text-black",resetButtonActive:"active:bg-gray-700",resetButtonBg:"bg-gray-600",resetButtonHover:"hover:bg-gray-500",resetButtonText:"text-white",twitterButtonActive:"active:bg-blue-700",twitterButtonBg:"bg-blue-600",twitterButtonHover:"hover:bg-blue-500",twitterButtonText:"text-white",inputBg:"bg-gray-200",inputBgFocus:"focus:bg-gray-100",inputBgHover:"hover:bg-gray-100",inputLabel:"text-gray-500",inputText:"text-gray-900",inputTextFocus:"focus:text-black",inputTextPlaceHolder:"placeholder-gray-500"}};function g(e){var t=new MouseEvent("click",{view:window,bubbles:!0,cancleable:!0,target:e});e.dispatchEvent(t),e.focus()}function v(){var e=function(){var e=a.a.useState((function(){return window.localStorage.getItem("colorMode")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")})),t=Object(o.a)(e,2),r=t[0],n=t[1];return a.a.useEffect((function(){var e=window.matchMedia("(prefers-color-scheme: dark)"),t=function(){return n(e.matches?"dark":"light")};return e.addEventListener("change",t),function(){return e.removeEventListener("change",t)}})),a.a.useEffect((function(){return window.localStorage.setItem("colorMode",r)})),[r,n]}(),t=Object(o.a)(e,2),r=t[0],i=t[1],l=h[r],u=c("outer-color","#7f7f7f"),v=Object(o.a)(u,2),b=v[0],w=v[1],p="dark"===r?"rgba(255, 255, 255, 0.03)":"rgba(0, 0, 0, 0.03)",x=c("arrow-color","#7f7f7f"),y=Object(o.a)(x,2),E=y[0],B=y[1],k=Object(n.useRef)(),j=Object(n.useRef)(),C=Object(n.useRef)(),N=function(){var e=Object(n.useState)([0,0]),t=Object(o.a)(e,2),r=t[0],a=t[1],i=function(e){return a([e.clientX,e.clientY])};return Object(n.useLayoutEffect)((function(){return window.addEventListener("mousemove",i),function(){return window.removeEventListener("mousemove",i)}}),[]),r}(),L=Object(o.a)(N,2),M=L[0],O=L[1];!function(){var e=Object(n.useState)({width:0,height:0}),t=Object(o.a)(e,2),r=t[0],a=t[1];Object(n.useLayoutEffect)((function(){var e=function(){return a({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[])}();var T=function(e,t,r){var o=e.current&&e.current.getBoundingClientRect();return o&&Math.atan2(t-o.x-o.width/2,r-o.y-o.height/1.6)||0}(k,M,O),H="dark"===r?1:-1,S=d(H*T,Math.PI/3),z=d(H*T,-Math.PI/3),A=function(){return g(j.current)},F=function(){return g(C.current)};return a.a.createElement("div",{className:"min-h-screen flex"},a.a.createElement("main",{className:["flex flex-col justify-center w-full",l.bg].join(" ")},a.a.createElement(m,{ref:k,height:"100%",outerColor:b,innerColor:p,arrowColor:E,leftShade:z,rightShade:S,onOuterColor:A,onArrowColor:F})),a.a.createElement("div",{className:["relative max-w-sm w-full md:w-72 flex flex-col flex-shrink-0 z-40",l.bgNav].join(" ")},a.a.createElement("div",{className:"absolute top-0 right-0 m-4"},a.a.createElement("button",{onClick:function(){return i("dark"===r?"light":"dark")},className:"relative flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600","aria-label":"Close sidebar"},a.a.createElement("div",{className:["absolute top-0 right-0 transform transition-all ease-in-out duration-500 sm:duration-700","dark"===r?"opacity-100":"opacity-0"].join(" ")},a.a.createElement("svg",{className:["h-6 w-6 transition-opacity ease-in-out duration-500 sm:duration-700","dark"===r?"opacity-100 rotate-0":"opacity-0 rotate-180",l.modeButtonText,l.modeButtonTextHover].join(" "),stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},a.a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"}))),a.a.createElement("div",{className:["absolute top-0 right-0 transform transition-all ease-in-out duration-500 sm:duration-700","dark"===r?"opacity-0 rotate-180":"opacity-100 rotate-0"].join(" ")},a.a.createElement("svg",{className:["h-6 w-6",l.modeButtonText,l.modeButtonTextHover].join(" "),stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},a.a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"}))))),a.a.createElement("div",{className:"flex-1 h-0 overflow-auto"},a.a.createElement("div",{className:["flex-shrink-0 flex flex-col px-4 py-5",l.bgNav].join(" ")},a.a.createElement("div",{className:"flex items-center"},a.a.createElement("svg",{className:["mr-3 h-6 w-6",l.title].join(" "),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"})),a.a.createElement("div",{className:["font-bold text-xl",l.title].join(" ")},"Beauty Challenge")),a.a.createElement("div",{className:["pt-2",l.description].join(" ")},"Choose your favorite logo color combination and share it with us!")),a.a.createElement("aside",{className:"px-4 space-y-4"},a.a.createElement("div",{className:["landscape:hidden w-full p-2 rounded-md overflow-hidden border",l.border,l.bg].join(" ")},a.a.createElement(m,{height:"100",outerColor:b,innerColor:p,arrowColor:E,leftShade:z,rightShade:S,onOuterColor:A,onArrowColor:F})),[{ref:j,label:"Outer color",color:b,setColor:w},{ref:C,label:"Arrow color",color:E,setColor:B}].map((function(e){return a.a.createElement(f,Object.assign({key:e.label},e,{colors:l}))})))),a.a.createElement("div",{className:["flex flex-row-reverse p-4 z-10",l.bgButtons].join(" ")},a.a.createElement("div",{className:"flex items-center mx-auto"},a.a.createElement("div",{className:"rounded-md shadow-sm mx-2"},a.a.createElement("button",{onClick:function(e){w("#7f7f7f"),B("#7f7f7f")},type:"button",className:["inline-flex items-center px-4 py-2 md:py-1 border border-transparent text-base leading-6 font-medium rounded-md focus:outline-none focus:border-none focus:shadow-outline-none transition ease-in-out duration-150",l.resetButtonText,l.resetButtonBg,l.resetButtonHover,l.resetButtonActive].join(" ")},a.a.createElement("svg",{className:"-ml-1 mr-3 h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})),"Reset")),a.a.createElement("div",{className:"rounded-md shadow-sm mx-2"},a.a.createElement("button",{onClick:function(){return function(e,t){var r=s(location.origin+location.pathname,{"outer-color":e,"arrow-color":t}),o=s("https://twitter.com/intent/tweet",{text:"\ud83d\udc85 I just played #BeautyChallengeTheGame\n\nFind my result & play it \ud83d\udc49",url:r});window.open(o,"_blank")}(b,E)},type:"button",className:["inline-flex items-center px-4 py-2 md:py-1 border border-transparent text-base leading-6 font-medium rounded-md focus:outline-none focus:border-none focus:shadow-outline-none transition ease-in-out duration-150",l.twitterButtonText,l.twitterButtonBg,l.twitterButtonHover,l.twitterButtonActive].join(" ")},a.a.createElement("svg",{className:"-ml-1 mr-3 h-5 w-5",fill:"currentColor",role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{d:"M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"})),"Save"))))))}l.a.render(a.a.createElement(v,null),document.getElementById("app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},4:function(e,t,r){e.exports=r(10)},9:function(e,t,r){}},[[4,1,2]]]);
//# sourceMappingURL=main.71506388.chunk.js.map