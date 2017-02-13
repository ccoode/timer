!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/assets/",t(t.s=6)}([function(e,t){},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(4),u=function(){function e(t){i(this,e),this._watchQueue=[],t&&(this.setup(t),t.hook&&this._watchQueue.push(t.hook))}return r(e,[{key:"setup",value:function(e){if("object"===("undefined"==typeof e?"undefined":o(e))&&null===e)throw new Error("setup(settings), settings need to be a object!");if("number"!=typeof e.timeout&&(e.timeout=parseInt(e.timeout,10)),isNaN(e.timeout))throw new Error("setup(settings), settings.timeout need to be a number!");if("number"!=typeof e.timeout)throw new Error("setup(settings), settings.timeout need to be a number!");this._timeoutId&&clearTimeout(this._timeoutId),this._settings=e,this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"start",value:function(){this._running||(this._running=!0,this._startTime=a(),this._update())}},{key:"pause",value:function(){this._running&&(this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._left-(a()-this._startTime),this._sync())}},{key:"stop",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=0,this._sync()}},{key:"reset",value:function(){this._timeoutId&&clearTimeout(this._timeoutId),this._running=!1,this._timeout=this._left=this._settings.timeout,this._sync()}},{key:"watch",value:function(e){this._watchQueue.push(e)}},{key:"_sync",value:function(){var e=this;this._watchQueue.forEach(function(t){t({timeout:e._timeout,running:e._running,onStart:e._running&&e._timeout===e._settings.timeout})})}},{key:"_update",value:function(){var e=this;if(this._sync(),this._timeout>0){var t=this._timeout%1e3||1e3;this._timeout-=t,this._running=!(this._timeout<=0)&&this._running,this._timeoutId=setTimeout(function(){e._update()},t)}}}]),e}();e.exports=u},function(e,t){},function(e,t,n){!function(e,n){n(t)}(this,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var i,o,r,a,u=[];for(a=arguments.length;a-- >2;)B.push(arguments[a]);for(n&&n.children&&(B.length||B.push(n.children),delete n.children);B.length;)if((o=B.pop())instanceof Array)for(a=o.length;a--;)B.push(o[a]);else null!=o&&o!==!1&&("number"!=typeof o&&o!==!0||(o=String(o)),r="string"==typeof o,r&&i?u[u.length-1]+=o:(u.push(o),i=r));var s=new t(e,n||void 0,u);return A.vnode&&A.vnode(s),s}function i(e,t){if(t)for(var n in t)e[n]=t[n];return e}function o(e){return i({},e)}function r(e,t){for(var n=t.split("."),i=0;i<n.length&&e;i++)e=e[n[i]];return e}function a(e){return"function"==typeof e}function u(e){return"string"==typeof e}function s(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function c(e,t){return n(e.nodeName,i(o(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function f(e,t,n){var i=t.split(".");return function(t){for(var o=t&&t.target||this,a={},s=a,c=u(n)?r(t,n):o.nodeName?o.type.match(/^che|rad/)?o.checked:o.value:t,f=0;f<i.length-1;f++)s=s[i[f]]||(s[i[f]]=!f&&e.state[i[f]]||{});s[i[f]]=c,e.setState(a)}}function l(e){!e._dirty&&(e._dirty=!0)&&1==Z.push(e)&&(A.debounceRendering||L)(h)}function h(){var e,t=Z;for(Z=[];e=t.pop();)e._dirty&&P(e)}function m(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function p(e,t){return e.nodeName(g(e),t||W)}function d(e,t){return u(t)?e instanceof Text:u(t.nodeName)?!e._componentConstructor&&v(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||m(t):void 0}function v(e,t){return e.normalizedNodeName===t||R(e.nodeName)===R(t)}function g(e){var t=o(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var i in n)void 0===t[i]&&(t[i]=n[i]);return t}function y(e){var t=e.parentNode;t&&t.removeChild(e)}function _(e,t,n,i,o){if("className"===t&&(t="class"),"class"===t&&i&&"object"==typeof i&&(i=s(i)),"key"===t);else if("class"!==t||o)if("style"===t){if((!i||u(i)||u(n))&&(e.style.cssText=i||""),i&&"object"==typeof i){if(!u(n))for(var r in n)r in i||(e.style[r]="");for(var r in i)e.style[r]="number"!=typeof i[r]||Q[r]?i[r]:i[r]+"px"}}else if("dangerouslySetInnerHTML"===t)e.innerHTML=i&&i.__html||"";else if("o"==t[0]&&"n"==t[1]){var c=e._listeners||(e._listeners={});t=R(t.substring(2)),i?c[t]||e.addEventListener(t,k,!!G[t]):c[t]&&e.removeEventListener(t,k,!!G[t]),c[t]=i}else if("list"!==t&&"type"!==t&&!o&&t in e)b(e,t,null==i?"":i),null!=i&&i!==!1||e.removeAttribute(t);else{var f=o&&t.match(/^xlink\:?(.+)/);null==i||i===!1?f?e.removeAttributeNS("http://www.w3.org/1999/xlink",R(f[1])):e.removeAttribute(t):"object"==typeof i||a(i)||(f?e.setAttributeNS("http://www.w3.org/1999/xlink",R(f[1]),i):e.setAttribute(t,i))}else e.className=i||""}function b(e,t,n){try{e[t]=n}catch(e){}}function k(e){return this._listeners[e.type](A.event&&A.event(e)||e)}function N(e){if(y(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||R(e.nodeName);(J[t]||(J[t]=[])).push(e)}}function w(e,t){var n=R(e),i=J[n]&&J[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return i.normalizedNodeName=n,i}function x(){for(var e;e=K.pop();)A.afterMount&&A.afterMount(e),e.componentDidMount&&e.componentDidMount()}function C(e,t,n,i,o,r){X++||(Y=o instanceof SVGElement,$=e&&!(V in e));var a=S(e,t,n,i);return o&&a.parentNode!==o&&o.appendChild(a),--X||($=!1,r||x()),a}function S(e,t,n,i){for(var o=t&&t.attributes;m(t);)t=p(t,n);if(null==t&&(t=""),u(t))return e&&e instanceof Text?e.nodeValue!=t&&(e.nodeValue=t):(e&&z(e),e=document.createTextNode(t)),e[V]=!0,e;if(a(t.nodeName))return H(e,t,n,i);var r=e,s=String(t.nodeName),c=Y,f=t.children;if(Y="svg"===s||"foreignObject"!==s&&Y,e){if(!v(e,s)){for(r=w(s,Y);e.firstChild;)r.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(r,e),z(e)}}else r=w(s,Y);var l=r.firstChild,h=r[V];if(!h){r[V]=h={};for(var d=r.attributes,g=d.length;g--;)h[d[g].name]=d[g].value}return E(r,t.attributes,h),!$&&f&&1===f.length&&"string"==typeof f[0]&&l&&l instanceof Text&&!l.nextSibling?l.nodeValue!=f[0]&&(l.nodeValue=f[0]):(f&&f.length||l)&&T(r,f,n,i),o&&"function"==typeof o.ref&&(h.ref=o.ref)(r),Y=c,r}function T(e,t,n,i){var o,r,a,u,s=e.childNodes,c=[],f={},l=0,h=0,m=s.length,p=0,v=t&&t.length;if(m)for(var g=0;g<m;g++){var _=s[g],b=_[V],k=v?(r=_._component)?r.__key:b?b.key:null:null;null!=k?(l++,f[k]=_):($||b)&&(c[p++]=_)}if(v)for(var g=0;g<v;g++){a=t[g],u=null;var k=a.key;if(null!=k)l&&k in f&&(u=f[k],f[k]=void 0,l--);else if(!u&&h<p)for(o=h;o<p;o++)if(r=c[o],r&&d(r,a)){u=r,c[o]=void 0,o===p-1&&p--,o===h&&h++;break}u=S(u,a,n,i),u&&u!==e&&(g>=m?e.appendChild(u):u!==s[g]&&(u===s[g+1]&&y(s[g]),e.insertBefore(u,s[g]||null)))}if(l)for(var g in f)f[g]&&z(f[g]);for(;h<=p;)u=c[p--],u&&z(u)}function z(e,t){var n=e._component;if(n)M(n,!t);else{e[V]&&e[V].ref&&e[V].ref(null),t||N(e);for(var i;i=e.lastChild;)z(i,t)}}function E(e,t,n){for(var i in n)t&&i in t||null==n[i]||_(e,i,n[i],n[i]=void 0,Y);if(t)for(var o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||_(e,o,n[o],n[o]=t[o],Y)}function j(e){var t=e.constructor.name,n=ee[t];n?n.push(e):ee[t]=[e]}function F(e,t,n){var i=new e(t,n),o=ee[e.name];if(U.call(i,t,n),o)for(var r=o.length;r--;)if(o[r].constructor===e){i.nextBase=o[r].nextBase,o.splice(r,1);break}return i}function O(e,t,n,i,o){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,i),i&&i!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=i),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&A.syncComponentUpdates===!1&&e.base?l(e):P(e,1,o)),e.__ref&&e.__ref(e))}function P(e,t,n,r){if(!e._disable){var u,s,c,f,l=e.props,h=e.state,d=e.context,v=e.prevProps||l,y=e.prevState||h,_=e.prevContext||d,b=e.base,k=e.nextBase,N=b||k,w=e._component;if(b&&(e.props=v,e.state=y,e.context=_,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(l,h,d)===!1?u=!0:e.componentWillUpdate&&e.componentWillUpdate(l,h,d),e.props=l,e.state=h,e.context=d),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!u){for(e.render&&(s=e.render(l,h,d)),e.getChildContext&&(d=i(o(d),e.getChildContext()));m(s);)s=p(s,d);var S,T,E=s&&s.nodeName;if(a(E)){var j=g(s);c=w,c&&c.constructor===E&&j.key==c.__key?O(c,j,1,d):(S=c,c=F(E,j,d),c.nextBase=c.nextBase||k,c._parentComponent=e,e._component=c,O(c,j,0,d),P(c,1,n,!0)),T=c.base}else f=N,S=w,S&&(f=e._component=null),(N||1===t)&&(f&&(f._component=null),T=C(f,s,d,n||!b,N&&N.parentNode,!0));if(N&&T!==N&&c!==w){var H=N.parentNode;H&&T!==H&&(H.replaceChild(T,N),S||(N._component=null,z(N)))}if(S&&M(S,T!==N),e.base=T,T&&!r){for(var U=e,I=e;I=I._parentComponent;)(U=I).base=T;T._component=U,T._componentConstructor=U.constructor}}!b||n?K.unshift(e):u||(e.componentDidUpdate&&e.componentDidUpdate(v,y,_),A.afterUpdate&&A.afterUpdate(e));var B,D=e._renderCallbacks;if(D)for(;B=D.pop();)B.call(e);X||r||x()}}function H(e,t,n,i){for(var o=e&&e._component,r=e,a=o&&e._componentConstructor===t.nodeName,u=a,s=g(t);o&&!u&&(o=o._parentComponent);)u=o.constructor===t.nodeName;return o&&u&&(!i||o._component)?(O(o,s,3,n,i),e=o.base):(o&&!a&&(M(o,!0),e=r=null),o=F(t.nodeName,s,n),e&&!o.nextBase&&(o.nextBase=e,r=null),O(o,s,1,n,i),e=o.base,r&&e!==r&&(r._component=null,z(r))),e}function M(e,t){A.beforeUnmount&&A.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var i=e._component;if(i)M(i,t);else if(n){n[V]&&n[V].ref&&n[V].ref(null),e.nextBase=n,t&&(y(n),j(e));for(var o;o=n.lastChild;)z(o,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function I(e,t,n){return C(n,e,{},!1,t)}var A={},B=[],D={},R=function(e){return D[e]||(D[e]=e.toLowerCase())},q="undefined"!=typeof Promise&&Promise.resolve(),L=q?function(e){q.then(e)}:setTimeout,W={},V="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",Q={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},G={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},Z=[],J={},K=[],X=0,Y=!1,$=!1,ee={};i(U.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=f(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=o(n)),i(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),l(this)},forceUpdate:function(){P(this,2)},render:function(){}}),e.h=n,e.cloneElement=c,e.Component=U,e.render=I,e.rerender=h,e.options=A})},function(e,t,n){(function(t){(function(){var n,i,o,r,a,u;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},i=t.hrtime,n=function(){var e;return e=i(),1e9*e[0]+e[1]},r=n(),u=1e9*t.uptime(),a=r-u):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(5))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function r(e){if(l===clearTimeout)return clearTimeout(e);if((l===i||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{return l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}function a(){d&&m&&(d=!1,m.length?p=m.concat(p):v=-1,p.length&&u())}function u(){if(!d){var e=o(a);d=!0;for(var t=p.length;t;){for(m=p,p=[];++v<t;)m&&m[v].run();v=-1,t=p.length}m=null,d=!1,r(e)}}function s(e,t){this.fun=e,this.array=t}function c(){}var f,l,h=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(e){f=n}try{l="function"==typeof clearTimeout?clearTimeout:i}catch(e){l=i}}();var m,p=[],d=!1,v=-1;h.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];p.push(new s(e,t)),1!==p.length||d||o(u)},s.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=c,h.addListener=c,h.once=c,h.off=c,h.removeListener=c,h.removeAllListeners=c,h.emit=c,h.binding=function(e){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(e){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){var t=e.isZ?n.i(y.h)("section",{className:"teamName"},n.i(y.h)("span",{className:"meta"},"正方"),n.i(y.h)("span",null,e.teamName)):n.i(y.h)("section",{className:"teamName right"},n.i(y.h)("span",null,e.teamName),n.i(y.h)("span",{className:"meta"},"反方"));return n.i(y.h)("article",{className:"teamMeta"+(e.forceHide?" force-hide":"")},t,n.i(y.h)("section",{className:"thought"},e.thought))}function s(e){return n.i(y.h)("section",{className:"clock"},m(e.timeout))}function c(e){return n.i(y.h)("div",{className:"middle"+(e.forceHide?" force-hide":"")},n.i(y.h)("span",{className:"fa-stack fa-2x"+(e.show?"":" hide"),onClick:function(){e.turn()}},n.i(y.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(y.h)("i",{className:"fa fa-arrows-h fa-stack-1x"})))}function f(e){return n.i(y.h)("section",{className:"control"},n.i(y.h)("span",{className:"fa-stack fa-2x"+(e.running||e.end?" hide":""),onClick:function(){e.onClick("start")}},n.i(y.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(y.h)("i",{className:"fa fa-play fa-stack-1x"})),n.i(y.h)("span",{className:"fa-stack fa-2x"+(!e.running||e.end?" hide":""),onClick:function(){e.onClick("pause")}},n.i(y.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(y.h)("i",{className:"fa fa-pause fa-stack-1x"})),n.i(y.h)("span",{className:"fa-stack fa-2x"+(e.end?" hide":""),onClick:function(){e.onClick("stop")}},n.i(y.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(y.h)("i",{className:"fa fa-stop fa-stack-1x"})),n.i(y.h)("span",{className:"fa-stack fa-2x"+(e.end?"":" hide"),onClick:function(){e.onClick("reset")}},n.i(y.h)("i",{className:"fa fa-circle fa-stack-2x"}),n.i(y.h)("i",{className:"fa fa-repeat fa-stack-1x"})))}function l(e){return n.i(y.h)("header",{className:"site-header"},n.i(y.h)("span",{className:"site-title"},config.title+" - "+config.subtitle),n.i(y.h)("a",{id:"fullscreen",href:"#",className:"nav-item",onClick:function(){return g()}},n.i(y.h)("i",{className:"fa fa-arrows-alt","aria-hidden":"true"})),n.i(y.h)("div",{className:"menu-container"},n.i(y.h)("a",{className:"nav-item menu-btn"},"环节"),n.i(y.h)("div",{className:"menu"},e.list)))}function h(){return n.i(y.h)("footer",{className:"site-footer"},n.i(y.h)("p",null,config.footer),n.i(y.h)("p",null,n.i(y.h)("a",{href:"https://github.com/ccoode/timer"},"源代码")))}function m(e){if(e>=0){var t=e/1e3,n=Math.ceil(t%60),i=Math.floor(t/60);return 60===n&&(i+=1,n=0),p(i)+":"+p(n)}}function p(e){return e<10?"0"+e:e}function d(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function v(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function g(){var e=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled,t=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;e&&!t?d(document.documentElement):t&&v()}Object.defineProperty(t,"__esModule",{value:!0});var y=n(3),_=(n.n(y),n(1)),b=n.n(_),k=n(2),N=(n.n(k),n(0)),w=(n.n(N),function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()),x=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.startSound=new Audio("assets/audio/begin.wav"),e.stopSound=new Audio("assets/audio/stop.wav"),e.alertSound=new Audio("assets/audio/alert.wav"),e.list=config.steps.map(function(t,i){return n.i(y.h)("a",{onClick:function(){e.changeStep(i)},key:i},t.name)}),e.methods=["start","stop","pause","reset"],e.methods.forEach(function(t){return e.registerMethod(t)});var i=config.steps[0],a=i.zf,u=i.ff,s=i.name;return e.state={stepName:s,index:0,zf:{timeout:1e3*a,running:!1},ff:{timeout:1e3*u,running:!1}},e.createTimers(),e}return a(t,e),w(t,[{key:"createTimers",value:function(){var e=this,t=this,n=function(t){return function(n){switch(!0){case 0===n.timeout:e.stopSound.play();break;case n.timeout<=3e4&&n.timeout>29e3:case n.timeout>0&&n.timeout<=5e3:e.alertSound.play();break;case n.onStart===!0:e.startSound.play()}e.setState(i({},t,{timeout:n.timeout,running:n.running}))}},o=function(e){return{get end(){return 0===t.state[e].timeout},get forceHide(){return t.state[e].timeout<0},timer:new b.a({timeout:1e3*config.steps[0][e],hook:n(e)})}};this.zf=o("zf"),this.ff=o("ff")}},{key:"registerMethod",value:function(e){var t=this;this[e]=function(n){return t[n].timer[e]()}}},{key:"changeStep",value:function(e){if(e!=this.state.index){var t=config.steps[e],n=t.zf,i=t.ff,o=t.name;this.zf.timer.setup({timeout:1e3*n}),this.ff.timer.setup({timeout:1e3*i}),this.setState({index:e,stepName:o})}}},{key:"next",value:function(){var e=this.state.index;this.changeStep((e+1)%config.steps.length)}},{key:"turn",value:function(){var e=this.state,t=e.zf,n=e.ff;!t.running||n.running||this.ff.end?t.running||!n.running||this.zf.end||(this.pause("ff"),this.start("zf")):(this.pause("zf"),this.start("ff"))}},{key:"getHandler",value:function(e){var t=this;return function(n){t.methods.indexOf(n)!==-1&&t[n](e)}}},{key:"render",value:function(){var e=this,t=this.state,i=t.zf,o=t.ff,r=t.stepName,a=this.zf.forceHide||this.ff.forceHide,m=!a&&i.running&&!o.running&&!this.ff.end||!i.running&&o.running&&!this.zf.end;return n.i(y.h)("div",{id:"root"},n.i(y.h)(l,{list:this.list}),n.i(y.h)("main",null,n.i(y.h)("div",{className:"timer"},n.i(y.h)("div",{className:"contain"+(this.zf.forceHide?" force-hide":"")},n.i(y.h)(u,{teamName:config.zf.name,isZ:!0,thought:config.zf.thought,forceHide:a}),n.i(y.h)(s,{timeout:i.timeout}),n.i(y.h)(f,{onClick:this.getHandler("zf"),running:i.running,end:this.zf.end})),n.i(y.h)(c,{turn:function(){return e.turn()},show:m,forceHide:a}),n.i(y.h)("div",{className:"contain right"+(this.ff.forceHide?" force-hide":"")},n.i(y.h)(u,{teamName:config.ff.name,isZ:!1,thought:config.ff.thought,forceHide:a}),n.i(y.h)(s,{timeout:o.timeout}),n.i(y.h)(f,{onClick:this.getHandler("ff"),running:o.running,end:this.ff.end}))),n.i(y.h)("div",{id:"wrapper"},n.i(y.h)("a",{id:"turnBtn",onClick:function(){e.next()},className:"btn"},r))),n.i(y.h)(h,null))}}]),t}(y.Component);n.i(y.render)(n.i(y.h)(x,null),document.querySelector("#react"))}]);