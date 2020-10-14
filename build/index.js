"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var searchTopics = function searchTopics(topic) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "new";
  if (!topic) return;
  var redditUrl = "https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort);
  (0, _nodeFetch["default"])(redditUrl).then(function (res) {
    return res.json();
  }).then(function (res) {
    var _res$data;

    return (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.spec) || [];
  }).then(function (posts) {
    return _fs.promises.writeFile('data.json', JSON.stringify(posts, null, '\t'));
  })["catch"](function (err) {
    return console.error(err);
  });
};

searchTopics('gaming');