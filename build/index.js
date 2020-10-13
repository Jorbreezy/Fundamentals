"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _nodeFetch["default"])('https://www.reddit.com/r/pics/search.json?q=programming&sort=new').then(function (res) {
  return res.json();
}).then(function (res) {
  var data = JSON.stringify(res);

  _fs["default"].promises.writeFile('data.json', data).then(function () {
    return console.log('Saved Successfully');
  })["catch"](function (err) {
    throw err;
  });
})["catch"](function (err) {
  return console.error(err);
});