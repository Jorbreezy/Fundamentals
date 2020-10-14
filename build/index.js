"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _nodeFetch["default"])('https://www.reddit.com/r/pics/search.json?q=programming&sort=new').then(function (res) {
  return res.json();
}).then(function (res) {
  return _fs.promises.writeFile('data.json', JSON.stringify(res));
}).then(function () {
  return console.log('Saved Successfully');
})["catch"](function (err) {
  return console.error(err);
});