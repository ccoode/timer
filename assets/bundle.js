!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/assets/",t(t.s=4)}([function(e,t,n){},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(t){o(this,e),this._watchQueue=[],t&&(this.setup(t),t.hook&&this._watchQueue.push(t.hook))}return i(e,[{key:"setup",value:function(e){this._timeoutId&&clearTimeout(this._timeoutId),this._settings=e,this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"start",value:function(){this._running||(this._running=!0,this._startTime=Date.now(),this._update())}},{key:"pause",value:function(){this._running&&(this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._left-(Date.now()-this._startTime),this._sync())}},{key:"stop",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=0,this._sync()}},{key:"reset",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"watch",value:function(e){this._watchQueue.push(e)}},{key:"_sync",value:function(){var e=this;this._watchQueue.forEach(function(t){t({timeout:e._timeout,running:e._running,onStart:e._running&&e._timeout===e._settings.timeout})})}},{key:"_update",value:function(){var e=this;if(this._sync(),this._timeout>0){var t=this._timeout%1e3||1e3;this._timeout-=t,this._running=!(this._timeout<=0)&&this._running,this._timeoutId=setTimeout(function(){e._update()},t)}}}]),e}();e.exports=r},function(e,t){},function(e,t,n){!function(e,n){n(t)}(this,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var o,i,r,a,s=[];for(a=arguments.length;a-- >2;)R.push(arguments[a]);for(n&&n.children&&(R.length||R.push(n.children),delete n.children);R.length;)if((i=R.pop())instanceof Array)for(a=i.length;a--;)R.push(i[a]);else null!=i&&i!==!1&&("number"!=typeof i&&i!==!0||(i=String(i)),r="string"==typeof i,r&&o?s[s.length-1]+=i:(s.push(i),o=r));var u=new t(e,n||void 0,s);return I.vnode&&I.vnode(u),u}function o(e,t){if(t)for(var n in t)e[n]=t[n];return e}function i(e){return o({},e)}function r(e,t){for(var n=t.split("."),o=0;o<n.length&&e;o++)e=e[n[o]];return e}function a(e){return"function"==typeof e}function s(e){return"string"==typeof e}function u(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function c(e,t){return n(e.nodeName,o(i(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function l(e,t,n){var o=t.split(".");return function(t){for(var i=t&&t.target||this,a={},u=a,c=s(n)?r(t,n):i.nodeName?i.type.match(/^che|rad/)?i.checked:i.value:t,l=0;l<o.length-1;l++)u=u[o[l]]||(u[o[l]]=!l&&e.state[o[l]]||{});u[o[l]]=c,e.setState(a)}}function f(e){!e._dirty&&(e._dirty=!0)&&1==Z.push(e)&&(I.debounceRendering||D)(h)}function h(){var e,t=Z;for(Z=[];e=t.pop();)e._dirty&&P(e)}function m(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function d(e,t){return e.nodeName(_(e),t||L)}function p(e,t){return s(t)?e instanceof Text:s(t.nodeName)?!e._componentConstructor&&v(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||m(t):void 0}function v(e,t){return e.normalizedNodeName===t||A(e.nodeName)===A(t)}function _(e){var t=i(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function g(e){var t=e.parentNode;t&&t.removeChild(e)}function b(e,t,n,o,i){if("className"===t&&(t="class"),"class"===t&&o&&"object"==typeof o&&(o=u(o)),"key"===t);else if("class"!==t||i)if("style"===t){if((!o||s(o)||s(n))&&(e.style.cssText=o||""),o&&"object"==typeof o){if(!s(n))for(var r in n)r in o||(e.style[r]="");for(var r in o)e.style[r]="number"!=typeof o[r]||Q[r]?o[r]:o[r]+"px"}}else if("dangerouslySetInnerHTML"===t)e.innerHTML=o&&o.__html||"";else if("o"==t[0]&&"n"==t[1]){var c=e._listeners||(e._listeners={});t=A(t.substring(2)),o?c[t]||e.addEventListener(t,k,!!G[t]):c[t]&&e.removeEventListener(t,k,!!G[t]),c[t]=o}else if("list"!==t&&"type"!==t&&!i&&t in e)y(e,t,null==o?"":o),null!=o&&o!==!1||e.removeAttribute(t);else{var l=i&&t.match(/^xlink\:?(.+)/);null==o||o===!1?l?e.removeAttributeNS("http://www.w3.org/1999/xlink",A(l[1])):e.removeAttribute(t):"object"==typeof o||a(o)||(l?e.setAttributeNS("http://www.w3.org/1999/xlink",A(l[1]),o):e.setAttribute(t,o))}else e.className=o||""}function y(e,t,n){try{e[t]=n}catch(e){}}function k(e){return this._listeners[e.type](I.event&&I.event(e)||e)}function N(e){if(g(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||A(e.nodeName);(J[t]||(J[t]=[])).push(e)}}function x(e,t){var n=A(e),o=J[n]&&J[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return o.normalizedNodeName=n,o}function w(){for(var e;e=K.pop();)I.afterMount&&I.afterMount(e),e.componentDidMount&&e.componentDidMount()}function C(e,t,n,o,i,r){X++||(Y=i instanceof SVGElement,$=e&&!(V in e));var a=S(e,t,n,o);return i&&a.parentNode!==i&&i.appendChild(a),--X||($=!1,r||w()),a}function S(e,t,n,o){for(var i=t&&t.attributes;m(t);)t=d(t,n);if(null==t&&(t=""),s(t))return e&&e instanceof Text?e.nodeValue!=t&&(e.nodeValue=t):(e&&E(e),e=document.createTextNode(t)),e[V]=!0,e;if(a(t.nodeName))return H(e,t,n,o);var r=e,u=String(t.nodeName),c=Y,l=t.children;if(Y="svg"===u||"foreignObject"!==u&&Y,e){if(!v(e,u)){for(r=x(u,Y);e.firstChild;)r.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(r,e),E(e)}}else r=x(u,Y);var f=r.firstChild,h=r[V];if(!h){r[V]=h={};for(var p=r.attributes,_=p.length;_--;)h[p[_].name]=p[_].value}return T(r,t.attributes,h),!$&&l&&1===l.length&&"string"==typeof l[0]&&f&&f instanceof Text&&!f.nextSibling?f.nodeValue!=l[0]&&(f.nodeValue=l[0]):(l&&l.length||f)&&z(r,l,n,o),i&&"function"==typeof i.ref&&(h.ref=i.ref)(r),Y=c,r}function z(e,t,n,o){var i,r,a,s,u=e.childNodes,c=[],l={},f=0,h=0,m=u.length,d=0,v=t&&t.length;if(m)for(var _=0;_<m;_++){var b=u[_],y=b[V],k=v?(r=b._component)?r.__key:y?y.key:null:null;null!=k?(f++,l[k]=b):($||y)&&(c[d++]=b)}if(v)for(var _=0;_<v;_++){a=t[_],s=null;var k=a.key;if(null!=k)f&&k in l&&(s=l[k],l[k]=void 0,f--);else if(!s&&h<d)for(i=h;i<d;i++)if(r=c[i],r&&p(r,a)){s=r,c[i]=void 0,i===d-1&&d--,i===h&&h++;break}s=S(s,a,n,o),s&&s!==e&&(_>=m?e.appendChild(s):s!==u[_]&&(s===u[_+1]&&g(u[_]),e.insertBefore(s,u[_]||null)))}if(f)for(var _ in l)l[_]&&E(l[_]);for(;h<=d;)s=c[d--],s&&E(s)}function E(e,t){var n=e._component;if(n)M(n,!t);else{e[V]&&e[V].ref&&e[V].ref(null),t||N(e);for(var o;o=e.lastChild;)E(o,t)}}function T(e,t,n){for(var o in n)t&&o in t||null==n[o]||b(e,o,n[o],n[o]=void 0,Y);if(t)for(var i in t)"children"===i||"innerHTML"===i||i in n&&t[i]===("value"===i||"checked"===i?e[i]:n[i])||b(e,i,n[i],n[i]=t[i],Y)}function F(e){var t=e.constructor.name,n=ee[t];n?n.push(e):ee[t]=[e]}function O(e,t,n){var o=new e(t,n),i=ee[e.name];if(U.call(o,t,n),i)for(var r=i.length;r--;)if(i[r].constructor===e){o.nextBase=i[r].nextBase,i.splice(r,1);break}return o}function j(e,t,n,o,i){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&I.syncComponentUpdates===!1&&e.base?f(e):P(e,1,i)),e.__ref&&e.__ref(e))}function P(e,t,n,r){if(!e._disable){var s,u,c,l,f=e.props,h=e.state,p=e.context,v=e.prevProps||f,g=e.prevState||h,b=e.prevContext||p,y=e.base,k=e.nextBase,N=y||k,x=e._component;if(y&&(e.props=v,e.state=g,e.context=b,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(f,h,p)===!1?s=!0:e.componentWillUpdate&&e.componentWillUpdate(f,h,p),e.props=f,e.state=h,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!s){for(e.render&&(u=e.render(f,h,p)),e.getChildContext&&(p=o(i(p),e.getChildContext()));m(u);)u=d(u,p);var S,z,T=u&&u.nodeName;if(a(T)){var F=_(u);c=x,c&&c.constructor===T&&F.key==c.__key?j(c,F,1,p):(S=c,c=O(T,F,p),c.nextBase=c.nextBase||k,c._parentComponent=e,e._component=c,j(c,F,0,p),P(c,1,n,!0)),z=c.base}else l=N,S=x,S&&(l=e._component=null),(N||1===t)&&(l&&(l._component=null),z=C(l,u,p,n||!y,N&&N.parentNode,!0));if(N&&z!==N&&c!==x){var H=N.parentNode;H&&z!==H&&(H.replaceChild(z,N),S||(N._component=null,E(N)))}if(S&&M(S,z!==N),e.base=z,z&&!r){for(var U=e,B=e;B=B._parentComponent;)(U=B).base=z;z._component=U,z._componentConstructor=U.constructor}}!y||n?K.unshift(e):s||(e.componentDidUpdate&&e.componentDidUpdate(v,g,b),I.afterUpdate&&I.afterUpdate(e));var R,q=e._renderCallbacks;if(q)for(;R=q.pop();)R.call(e);X||r||w()}}function H(e,t,n,o){for(var i=e&&e._component,r=e,a=i&&e._componentConstructor===t.nodeName,s=a,u=_(t);i&&!s&&(i=i._parentComponent);)s=i.constructor===t.nodeName;return i&&s&&(!o||i._component)?(j(i,u,3,n,o),e=i.base):(i&&!a&&(M(i,!0),e=r=null),i=O(t.nodeName,u,n),e&&!i.nextBase&&(i.nextBase=e,r=null),j(i,u,1,n,o),e=i.base,r&&e!==r&&(r._component=null,E(r))),e}function M(e,t){I.beforeUnmount&&I.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;if(o)M(o,t);else if(n){n[V]&&n[V].ref&&n[V].ref(null),e.nextBase=n,t&&(g(n),F(e));for(var i;i=n.lastChild;)E(i,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function B(e,t,n){return C(n,e,{},!1,t)}var I={},R=[],q={},A=function(e){return q[e]||(q[e]=e.toLowerCase())},W="undefined"!=typeof Promise&&Promise.resolve(),D=W?function(e){W.then(e)}:setTimeout,L={},V="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",Q={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},G={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},Z=[],J={},K=[],X=0,Y=!1,$=!1,ee={};o(U.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=l(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=i(n)),o(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),f(this)},forceUpdate:function(){P(this,2)},render:function(){}}),e.h=n,e.cloneElement=c,e.Component=U,e.render=B,e.rerender=h,e.options=I})},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){var t=e.isZ?(0,y.h)("section",{className:"teamName"},(0,y.h)("span",{className:"meta"},"正方"),(0,y.h)("span",null,e.teamName)):(0,y.h)("section",{className:"teamName right"},(0,y.h)("span",null,e.teamName),(0,y.h)("span",{className:"meta"},"反方"));return(0,y.h)("article",{className:"teamMeta"+(e.forceHide?" force-hide":"")},t,(0,y.h)("section",{className:"thought"},e.thought))}function c(e){return(0,y.h)("section",{className:"clock"},d(e.timeout))}function l(e){return(0,y.h)("div",{className:"middle"+(e.forceHide?" force-hide":"")},(0,y.h)("span",{className:"fa-stack fa-2x"+(e.show?"":" hide"),onClick:function(){e.turn()}},(0,y.h)("i",{className:"fa fa-circle fa-stack-2x"}),(0,y.h)("i",{className:"fa fa-arrows-h fa-stack-1x"})))}function f(e){return(0,y.h)("section",{className:"control"},(0,y.h)("span",{className:"fa-stack fa-2x"+(e.running||e.end?" hide":""),onClick:function(){e.onClick("start")}},(0,y.h)("i",{className:"fa fa-circle fa-stack-2x"}),(0,y.h)("i",{className:"fa fa-play fa-stack-1x"})),(0,y.h)("span",{className:"fa-stack fa-2x"+(!e.running||e.end?" hide":""),onClick:function(){e.onClick("pause")}},(0,y.h)("i",{className:"fa fa-circle fa-stack-2x"}),(0,y.h)("i",{className:"fa fa-pause fa-stack-1x"})),(0,y.h)("span",{className:"fa-stack fa-2x"+(e.end?" hide":""),onClick:function(){e.onClick("stop")}},(0,y.h)("i",{className:"fa fa-circle fa-stack-2x"}),(0,y.h)("i",{className:"fa fa-stop fa-stack-1x"})),(0,y.h)("span",{className:"fa-stack fa-2x"+(e.end?"":" hide"),onClick:function(){e.onClick("reset")}},(0,y.h)("i",{className:"fa fa-circle fa-stack-2x"}),(0,y.h)("i",{className:"fa fa-repeat fa-stack-1x"})))}function h(e){return(0,y.h)("header",{className:"site-header"},(0,y.h)("span",{className:"site-title"},config.title+" - "+config.subtitle),(0,y.h)("a",{id:"fullscreen",href:"#",className:"nav-item",onClick:function(){return g()}},(0,y.h)("i",{className:"fa fa-arrows-alt","aria-hidden":"true"})),(0,y.h)("div",{className:"menu-container"},(0,y.h)("a",{className:"nav-item menu-btn"},"环节"),(0,y.h)("div",{className:"menu"},e.list)))}function m(){return(0,y.h)("footer",{className:"site-footer"},(0,y.h)("p",null,config.footer),(0,y.h)("p",null,(0,y.h)("a",{href:"https://github.com/ccoode/timer"},"源代码")))}function d(e){if(e>=0){var t=e/1e3,n=Math.ceil(t%60),o=Math.floor(t/60);return 60===n&&(o+=1,n=0),p(o)+":"+p(n)}}function p(e){return e<10?"0"+e:e}function v(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function _(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function g(){var e=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled,t=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;e&&!t?v(document.documentElement):t&&_()}var b=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),y=n(3),k=n(1),N=o(k);n(2),n(0);var x=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.startSound=new Audio("assets/audio/begin.wav"),e.stopSound=new Audio("assets/audio/stop.wav"),e.alertSound=new Audio("assets/audio/alert.wav"),e.list=config.steps.map(function(t,n){return(0,y.h)("a",{onClick:function(){e.changeStep(n)},key:n},t.name)}),e.methods=["start","stop","pause","reset"],e.methods.forEach(function(t){return e.registerMethod(t)});var n=config.steps[0],o=n.zf,i=n.ff,s=n.name;return e.state={stepName:s,index:0,zf:{timeout:1e3*o,running:!1},ff:{timeout:1e3*i,running:!1}},e.createTimers(),e}return s(t,e),b(t,[{key:"createTimers",value:function(){var e=this,t=this,n=function(t){return function(n){switch(!0){case 0===n.timeout:e.stopSound.play();break;case n.timeout<=3e4&&n.timeout>29e3:case n.timeout>0&&n.timeout<=5e3:e.alertSound.play();break;case n.onStart===!0:e.startSound.play()}e.setState(i({},t,{timeout:n.timeout,running:n.running}))}},o=function(e){return{get end(){return 0===t.state[e].timeout},get forceHide(){return t.state[e].timeout<0},timer:new N.default({timeout:1e3*config.steps[0][e],hook:n(e)})}};this.zf=o("zf"),this.ff=o("ff")}},{key:"registerMethod",value:function(e){var t=this;this[e]=function(n){return t[n].timer[e]()}}},{key:"changeStep",value:function(e){if(e!=this.state.index){var t=config.steps[e],n=t.zf,o=t.ff,i=t.name;this.zf.timer.setup({timeout:1e3*n}),this.ff.timer.setup({timeout:1e3*o}),this.setState({index:e,stepName:i})}}},{key:"next",value:function(){var e=this.state.index;this.changeStep((e+1)%config.steps.length)}},{key:"turn",value:function(){var e=this.state,t=e.zf,n=e.ff;!t.running||n.running||this.ff.end?t.running||!n.running||this.zf.end||(this.pause("ff"),this.start("zf")):(this.pause("zf"),this.start("ff"))}},{key:"getHandler",value:function(e){var t=this;return function(n){t.methods.indexOf(n)!==-1&&t[n](e)}}},{key:"render",value:function(){var e=this,t=this.state,n=t.zf,o=t.ff,i=t.stepName,r=this.zf.forceHide||this.ff.forceHide,a=!r&&n.running&&!o.running&&!this.ff.end||!n.running&&o.running&&!this.zf.end;return(0,y.h)("div",{id:"root"},(0,y.h)(h,{list:this.list}),(0,y.h)("main",null,(0,y.h)("div",{className:"timer"},(0,y.h)("div",{className:"contain"+(this.zf.forceHide?" force-hide":"")},(0,y.h)(u,{teamName:config.zf.name,isZ:!0,thought:config.zf.thought,forceHide:r}),(0,y.h)(c,{timeout:n.timeout}),(0,y.h)(f,{onClick:this.getHandler("zf"),running:n.running,end:this.zf.end})),(0,y.h)(l,{turn:function(){return e.turn()},show:a,forceHide:r}),(0,y.h)("div",{className:"contain right"+(this.ff.forceHide?" force-hide":"")},(0,y.h)(u,{teamName:config.ff.name,isZ:!1,thought:config.ff.thought,forceHide:r}),(0,y.h)(c,{timeout:o.timeout}),(0,y.h)(f,{onClick:this.getHandler("ff"),running:o.running,end:this.ff.end}))),(0,y.h)("div",{id:"wrapper"},(0,y.h)("a",{id:"turnBtn",onClick:function(){e.next()},className:"btn"},i))),(0,y.h)(m,null))}}]),t}(y.Component);(0,y.render)((0,y.h)(x,null),document.querySelector("#react"))}]);