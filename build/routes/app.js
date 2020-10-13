"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("constants");

var _express = require("express");

var router = (0, _express.Router)();
router.get('/test', function (req, res) {
  return res.send('Hello World!');
});
var _default = router;
exports["default"] = _default;