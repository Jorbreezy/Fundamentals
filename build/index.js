"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var searchData = function searchData(topic) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "new";
  (0, _nodeFetch["default"])("https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort)).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    _fs.promises.writeFile('data.json', JSON.stringify(res));
  }).then(function () {
    return console.log('Saved Successfully');
  })["catch"](function (err) {
    return console.error(err);
  });
};

searchData('Gaming');