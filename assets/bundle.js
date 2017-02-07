!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/assets/",t(t.s=4)}([function(e,t){},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t){n(this,e),this._watchQueue=[],t&&(this.setup(t),t.hook&&this._watchQueue.push(t.hook))}return i(e,[{key:"setup",value:function(e){this._timeoutId&&clearTimeout(this._timeoutId),this._settings=e,this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"start",value:function(){this._running||(this._running=!0,this._startTime=Date.now(),this._update())}},{key:"pause",value:function(){this._running&&(this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._left-(Date.now()-this._startTime),this._sync())}},{key:"stop",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=0,this._sync()}},{key:"reset",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"watch",value:function(e){this._watchQueue.push(e)}},{key:"_sync",value:function(){var e=this;this._watchQueue.forEach(function(t){t({timeout:e._timeout,running:e._running,onStart:e._running&&e._timeout===e._settings.timeout})})}},{key:"_update",value:function(){var e=this;if(this._sync(),this._timeout>0){var t=this._timeout%1e3||1e3;this._timeout-=t,this._running=!(this._timeout<=0)&&this._running,this._timeoutId=setTimeout(function(){e._update()},t)}}}]),e}();e.exports=o},function(e,t){},function(e,t,n){!function(e,n){n(t)}(this,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var i,o,r,a,s=[];for(a=arguments.length;a-- >2;)R.push(arguments[a]);for(n&&n.children&&(R.length||R.push(n.children),delete n.children);R.length;)if((o=R.pop())instanceof Array)for(a=o.length;a--;)R.push(o[a]);else null!=o&&o!==!1&&("number"!=typeof o&&o!==!0||(o=String(o)),r="string"==typeof o,r&&i?s[s.length-1]+=o:(s.push(o),i=r));var u=new t(e,n||void 0,s);return I.vnode&&I.vnode(u),u}function i(e,t){if(t)for(var n in t)e[n]=t[n];return e}function o(e){return i({},e)}function r(e,t){for(var n=t.split("."),i=0;i<n.length&&e;i++)e=e[n[i]];return e}function a(e){return"function"==typeof e}function s(e){return"string"==typeof e}function u(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function c(e,t){return n(e.nodeName,i(o(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function l(e,t,n){var i=t.split(".");return function(t){for(var o=t&&t.target||this,a={},u=a,c=s(n)?r(t,n):o.nodeName?o.type.match(/^che|rad/)?o.checked:o.value:t,l=0;l<i.length-1;l++)u=u[i[l]]||(u[i[l]]=!l&&e.state[i[l]]||{});u[i[l]]=c,e.setState(a)}}function f(e){!e._dirty&&(e._dirty=!0)&&1==Z.push(e)&&(I.debounceRendering||D)(h)}function h(){var e,t=Z;for(Z=[];e=t.pop();)e._dirty&&P(e)}function m(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function d(e,t){return e.nodeName(_(e),t||L)}function p(e,t){return s(t)?e instanceof Text:s(t.nodeName)?!e._componentConstructor&&v(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||m(t):void 0}function v(e,t){return e.normalizedNodeName===t||A(e.nodeName)===A(t)}function _(e){var t=o(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var i in n)void 0===t[i]&&(t[i]=n[i]);return t}function g(e){var t=e.parentNode;t&&t.removeChild(e)}function b(e,t,n,i,o){if("className"===t&&(t="class"),"class"===t&&i&&"object"==typeof i&&(i=u(i)),"key"===t);else if("class"!==t||o)if("style"===t){if((!i||s(i)||s(n))&&(e.style.cssText=i||""),i&&"object"==typeof i){if(!s(n))for(var r in n)r in i||(e.style[r]="");for(var r in i)e.style[r]="number"!=typeof i[r]||Q[r]?i[r]:i[r]+"px"}}else if("dangerouslySetInnerHTML"===t)e.innerHTML=i&&i.__html||"";else if("o"==t[0]&&"n"==t[1]){var c=e._listeners||(e._listeners={});t=A(t.substring(2)),i?c[t]||e.addEventListener(t,k,!!G[t]):c[t]&&e.removeEventListener(t,k,!!G[t]),c[t]=i}else if("list"!==t&&"type"!==t&&!o&&t in e)y(e,t,null==i?"":i),null!=i&&i!==!1||e.removeAttribute(t);else{var l=o&&t.match(/^xlink\:?(.+)/);null==i||i===!1?l?e.removeAttributeNS("http://www.w3.org/1999/xlink",A(l[1])):e.removeAttribute(t):"object"==typeof i||a(i)||(l?e.setAttributeNS("http://www.w3.org/1999/xlink",A(l[1]),i):e.setAttribute(t,i))}else e.className=i||""}function y(e,t,n){try{e[t]=n}catch(e){}}function k(e){return this._listeners[e.type](I.event&&I.event(e)||e)}function N(e){if(g(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||A(e.nodeName);(J[t]||(J[t]=[])).push(e)}}function x(e,t){var n=A(e),i=J[n]&&J[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return i.normalizedNodeName=n,i}function w(){for(var e;e=K.pop();)I.afterMount&&I.afterMount(e),e.componentDidMount&&e.componentDidMount()}function C(e,t,n,i,o,r){X++||(Y=o instanceof SVGElement,$=e&&!(V in e));var a=S(e,t,n,i);return o&&a.parentNode!==o&&o.appendChild(a),--X||($=!1,r||w()),a}function S(e,t,n,i){for(var o=t&&t.attributes;m(t);)t=d(t,n);if(null==t&&(t=""),s(t))return e&&e instanceof Text?e.nodeValue!=t&&(e.nodeValue=t):(e&&E(e),e=document.createTextNode(t)),e[V]=!0,e;if(a(t.nodeName))return H(e,t,n,i);var r=e,u=String(t.nodeName),c=Y,l=t.children;if(Y="svg"===u||"foreignObject"!==u&&Y,e){if(!v(e,u)){for(r=x(u,Y);e.firstChild;)r.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(r,e),E(e)}}else r=x(u,Y);var f=r.firstChild,h=r[V];if(!h){r[V]=h={};for(var p=r.attributes,_=p.length;_--;)h[p[_].name]=p[_].value}return T(r,t.attributes,h),!$&&l&&1===l.length&&"string"==typeof l[0]&&f&&f instanceof Text&&!f.nextSibling?f.nodeValue!=l[0]&&(f.nodeValue=l[0]):(l&&l.length||f)&&z(r,l,n,i),o&&"function"==typeof o.ref&&(h.ref=o.ref)(r),Y=c,r}function z(e,t,n,i){var o,r,a,s,u=e.childNodes,c=[],l={},f=0,h=0,m=u.length,d=0,v=t&&t.length;if(m)for(var _=0;_<m;_++){var b=u[_],y=b[V],k=v?(r=b._component)?r.__key:y?y.key:null:null;null!=k?(f++,l[k]=b):($||y)&&(c[d++]=b)}if(v)for(var _=0;_<v;_++){a=t[_],s=null;var k=a.key;if(null!=k)f&&k in l&&(s=l[k],l[k]=void 0,f--);else if(!s&&h<d)for(o=h;o<d;o++)if(r=c[o],r&&p(r,a)){s=r,c[o]=void 0,o===d-1&&d--,o===h&&h++;break}s=S(s,a,n,i),s&&s!==e&&(_>=m?e.appendChild(s):s!==u[_]&&(s===u[_+1]&&g(u[_]),e.insertBefore(s,u[_]||null)))}if(f)for(var _ in l)l[_]&&E(l[_]);for(;h<=d;)s=c[d--],s&&E(s)}function E(e,t){var n=e._component;if(n)M(n,!t);else{e[V]&&e[V].ref&&e[V].ref(null),t||N(e);for(var i;i=e.lastChild;)E(i,t)}}function T(e,t,n){for(var i in n)t&&i in t||null==n[i]||b(e,i,n[i],n[i]=void 0,Y);if(t)for(var o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||b(e,o,n[o],n[o]=t[o],Y)}function F(e){var t=e.constructor.name,n=ee[t];n?n.push(e):ee[t]=[e]}function O(e,t,n){var i=new e(t,n),o=ee[e.name];if(U.call(i,t,n),o)for(var r=o.length;r--;)if(o[r].constructor===e){i.nextBase=o[r].nextBase,o.splice(r,1);break}return i}function j(e,t,n,i,o){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,i),i&&i!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=i),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&I.syncComponentUpdates===!1&&e.base?f(e):P(e,1,o)),e.__ref&&e.__ref(e))}function P(e,t,n,r){if(!e._disable){var s,u,c,l,f=e.props,h=e.state,p=e.context,v=e.prevProps||f,g=e.prevState||h,b=e.prevContext||p,y=e.base,k=e.nextBase,N=y||k,x=e._component;if(y&&(e.props=v,e.state=g,e.context=b,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(f,h,p)===!1?s=!0:e.componentWillUpdate&&e.componentWillUpdate(f,h,p),e.props=f,e.state=h,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!s){for(e.render&&(u=e.render(f,h,p)),e.getChildContext&&(p=i(o(p),e.getChildContext()));m(u);)u=d(u,p);var S,z,T=u&&u.nodeName;if(a(T)){var F=_(u);c=x,c&&c.constructor===T&&F.key==c.__key?j(c,F,1,p):(S=c,c=O(T,F,p),c.nextBase=c.nextBase||k,c._parentComponent=e,e._component=c,j(c,F,0,p),P(c,1,n,!0)),z=c.base}else l=N,S=x,S&&(l=e._component=null),(N||1===t)&&(l&&(l._component=null),z=C(l,u,p,n||!y,N&&N.parentNode,!0));if(N&&z!==N&&c!==x){var H=N.parentNode;H&&z!==H&&(H.replaceChild(z,N),S||(N._component=null,E(N)))}if(S&&M(S,z!==N),e.base=z,z&&!r){for(var U=e,B=e;B=B._parentComponent;)(U=B).base=z;z._component=U,z._componentConstructor=U.constructor}}!y||n?K.unshift(e):s||(e.componentDidUpdate&&e.componentDidUpdate(v,g,b),I.afterUpdate&&I.afterUpdate(e));var R,q=e._renderCallbacks;if(q)for(;R=q.pop();)R.call(e);X||r||w()}}function H(e,t,n,i){for(var o=e&&e._component,r=e,a=o&&e._componentConstructor===t.nodeName,s=a,u=_(t);o&&!s&&(o=o._parentComponent);)s=o.constructor===t.nodeName;return o&&s&&(!i||o._component)?(j(o,u,3,n,i),e=o.base):(o&&!a&&(M(o,!0),e=r=null),o=O(t.nodeName,u,n),e&&!o.nextBase&&(o.nextBase=e,r=null),j(o,u,1,n,i),e=o.base,r&&e!==r&&(r._component=null,E(r))),e}function M(e,t){I.beforeUnmount&&I.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var i=e._component;if(i)M(i,t);else if(n){n[V]&&n[V].ref&&n[V].ref(null),e.nextBase=n,t&&(g(n),F(e));for(var o;o=n.lastChild;)E(o,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function B(e,t,n){return C(n,e,{},!1,t)}var I={},R=[],q={},A=function(e){return q[e]||(q[e]=e.toLowerCase())},W="undefined"!=typeof Promise&&Promise.resolve(),D=W?function(e){W.then(e)}:setTimeout,L={},V="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",Q={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},G={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},Z=[],J={},K=[],X=0,Y=!1,$=!1,ee={};i(U.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=l(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=o(n)),i(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),f(this)},forceUpdate:function(){P(this,2)},render:function(){}}),e.h=n,e.cloneElement=c,e.Component=U,e.render=B,e.rerender=h,e.options=I})},function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.isZ?n.i(g.h)("section",{className:"teamName"},n.i(g.h)("span",{className:"meta"},"正方"),n.i(g.h)("span",null,e.teamName)):n.i(g.h)("section",{className:"teamName right"},n.i(g.h)("span",null,e.teamName),n.i(g.h)("span",{className:"meta"},"反方"));return n.i(g.h)("article",{className:"teamMeta"+(e.forceHide?" force-hide":"")},t,n.i(g.h)("section",{className:"thought"},e.thought))}function u(e){return n.i(g.h)("section",{className:"clock"},m(e.timeout))}function c(e){return n.i(g.h)("div",{className:"middle"+(e.forceHide?" force-hide":"")},n.i(g.h)("span",{className:"fa-stack fa-2x"+(e.show?"":" hide"),onClick:function(){e.turn()}},n.i(g.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(g.h)("i",{className:"fa fa-arrows-h fa-stack-1x"})))}function l(e){return n.i(g.h)("section",{className:"control"},n.i(g.h)("span",{className:"fa-stack fa-2x"+(e.running||e.end?" hide":""),onClick:function(){e.onClick("start")}},n.i(g.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(g.h)("i",{className:"fa fa-play fa-stack-1x"})),n.i(g.h)("span",{className:"fa-stack fa-2x"+(!e.running||e.end?" hide":""),onClick:function(){e.onClick("pause")}},n.i(g.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(g.h)("i",{className:"fa fa-pause fa-stack-1x"})),n.i(g.h)("span",{className:"fa-stack fa-2x"+(e.end?" hide":""),onClick:function(){e.onClick("stop")}},n.i(g.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(g.h)("i",{className:"fa fa-stop fa-stack-1x"})),n.i(g.h)("span",{className:"fa-stack fa-2x"+(e.end?"":" hide"),onClick:function(){e.onClick("reset")}},n.i(g.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(g.h)("i",{className:"fa fa-repeat fa-stack-1x"})))}function f(e){return n.i(g.h)("header",{className:"site-header"},n.i(g.h)("span",{className:"site-title"},config.title+" - "+config.subtitle),n.i(g.h)("a",{id:"fullscreen",href:"#",className:"nav-item",onClick:function(){return _()}},n.i(g.h)("i",{className:"fa fa-arrows-alt","aria-hidden":"true"})),n.i(g.h)("div",{className:"menu-container"},n.i(g.h)("a",{className:"nav-item menu-btn"},"环节"),n.i(g.h)("div",{className:"menu"},e.list)))}function h(){return n.i(g.h)("footer",{className:"site-footer"},n.i(g.h)("p",null,config.footer),n.i(g.h)("p",null,n.i(g.h)("a",{href:"https://github.com/ccoode/timer"},"源代码")))}function m(e){if(e>=0){var t=e/1e3,n=Math.ceil(t%60),i=Math.floor(t/60);return 60===n&&(i+=1,n=0),d(i)+":"+d(n)}}function d(e){return e<10?"0"+e:e}function p(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function v(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function _(){var e=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled,t=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;e&&!t?p(document.documentElement):t&&v()}Object.defineProperty(t,"__esModule",{value:!0});var g=n(3),b=(n.n(g),n(1)),y=n.n(b),k=n(2),N=(n.n(k),n(0)),x=(n.n(N),function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()),w=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.startSound=new Audio("assets/audio/begin.wav"),e.stopSound=new Audio("assets/audio/stop.wav"),e.alertSound=new Audio("assets/audio/alert.wav"),e.list=config.steps.map(function(t,i){return n.i(g.h)("a",{onClick:function(){e.changeStep(i)},key:i},t.name)}),e.methods=["start","stop","pause","reset"],e.methods.forEach(function(t){return e.registerMethod(t)});var i=config.steps[0],a=i.zf,s=i.ff,u=i.name;return e.state={stepName:u,index:0,zf:{timeout:1e3*a,running:!1},ff:{timeout:1e3*s,running:!1}},e.createTimers(),e}return a(t,e),x(t,[{key:"createTimers",value:function(){var e=this,t=this,n=function(t){return function(n){switch(!0){case 0===n.timeout:e.stopSound.play();break;case n.timeout<=3e4&&n.timeout>29e3:case n.timeout>0&&n.timeout<=5e3:e.alertSound.play();break;case n.onStart===!0:e.startSound.play()}e.setState(i({},t,{timeout:n.timeout,running:n.running}))}},o=function(e){return{get end(){return 0===t.state[e].timeout},get forceHide(){return t.state[e].timeout<0},timer:new y.a({timeout:1e3*config.steps[0][e],hook:n(e)})}};this.zf=o("zf"),this.ff=o("ff")}},{key:"registerMethod",value:function(e){var t=this;this[e]=function(n){return t[n].timer[e]()}}},{key:"changeStep",value:function(e){if(e!=this.state.index){var t=config.steps[e],n=t.zf,i=t.ff,o=t.name;this.zf.timer.setup({timeout:1e3*n}),this.ff.timer.setup({timeout:1e3*i}),this.setState({index:e,stepName:o})}}},{key:"next",value:function(){var e=this.state.index;this.changeStep((e+1)%config.steps.length)}},{key:"turn",value:function(){var e=this.state,t=e.zf,n=e.ff;!t.running||n.running||this.ff.end?t.running||!n.running||this.zf.end||(this.pause("ff"),this.start("zf")):(this.pause("zf"),this.start("ff"))}},{key:"getHandler",value:function(e){var t=this;return function(n){t.methods.indexOf(n)!==-1&&t[n](e)}}},{key:"render",value:function(){var e=this,t=this.state,i=t.zf,o=t.ff,r=t.stepName,a=this.zf.forceHide||this.ff.forceHide,m=!a&&i.running&&!o.running&&!this.ff.end||!i.running&&o.running&&!this.zf.end;return n.i(g.h)("div",{id:"root"},n.i(g.h)(f,{list:this.list}),n.i(g.h)("main",null,n.i(g.h)("div",{className:"timer"},n.i(g.h)("div",{className:"contain"+(this.zf.forceHide?" force-hide":"")},n.i(g.h)(s,{teamName:config.zf.name,isZ:!0,thought:config.zf.thought,forceHide:a}),n.i(g.h)(u,{timeout:i.timeout}),n.i(g.h)(l,{onClick:this.getHandler("zf"),running:i.running,end:this.zf.end})),n.i(g.h)(c,{turn:function(){return e.turn()},show:m,forceHide:a}),n.i(g.h)("div",{className:"contain right"+(this.ff.forceHide?" force-hide":"")},n.i(g.h)(s,{teamName:config.ff.name,isZ:!1,thought:config.ff.thought,forceHide:a}),n.i(g.h)(u,{timeout:o.timeout}),n.i(g.h)(l,{onClick:this.getHandler("ff"),running:o.running,end:this.ff.end}))),n.i(g.h)("div",{id:"wrapper"},n.i(g.h)("a",{id:"turnBtn",onClick:function(){e.next()},className:"btn"},r))),n.i(g.h)(h,null))}}]),t}(g.Component);n.i(g.render)(n.i(g.h)(w,null),document.querySelector("#react"))}]);