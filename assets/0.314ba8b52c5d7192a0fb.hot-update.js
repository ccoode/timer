webpackHotUpdate(0,{

/***/ 58:
/* exports provided: default */
/* exports used: default */
/*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_toggleFullscreen__ = __webpack_require__(/*! ../utils/toggleFullscreen */ 63);



/* eslint-disable jsx-a11y/no-static-element-interactions */
function Header(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      children = _ref.children;

  return __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
    'header',
    { className: 'site-header' },
    __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
      'span',
      { className: 'site-title' },
      title + ' - ' + subtitle
    ),
    __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
      'a',
      { id: 'fullscreen', className: 'nav-item', onClick: function onClick() {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_toggleFullscreen__["a" /* default */])();
        } },
      __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement('i', { className: 'fa fa-arrows-alt', 'aria-hidden': 'true' })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
      'div',
      { className: 'menu' },
      __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
        'a',
        { className: 'cover' },
        '\u73AF\u8282'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react__["b" /* default */].createElement(
        'div',
        { className: 'content' },
        children
      )
    )
  );
}

Header.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].string.isRequired,
  subtitle: __WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].string.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].oneOfType([__WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].element, __WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].arrayOf(__WEBPACK_IMPORTED_MODULE_0_react__["d" /* PropTypes */].element)]).isRequired
};
/* harmony default export */ __webpack_exports__["a"] = Header;

/***/ })

})
//# sourceMappingURL=0.314ba8b52c5d7192a0fb.hot-update.js.map