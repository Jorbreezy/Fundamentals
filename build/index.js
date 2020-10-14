"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = searchTopics = function searchTopics(topic) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "new";
  if (!topic) return;
  (0, _nodeFetch["default"])("https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort)).then(function (res) {
    return res.json();
  }).then(function (res) {
    return res.data.children;
  }).then(function (posts) {
    return posts.map(specifyFields);
  }).then(function (posts) {
    return _fs.promises.writeFile('data.json', JSON.stringify(posts, null, '\t'));
  })["catch"](function (err) {
    return console.error(err);
  });
};

exports["default"] = _default;

var specifyFields = function specifyFields(_ref) {
  var _ref$data = _ref.data,
      id = _ref$data.id,
      title = _ref$data.title,
      author = _ref$data.author,
      subreddit = _ref$data.subreddit,
      thumbnail = _ref$data.thumbnail,
      url = _ref$data.url,
      ups = _ref$data.ups,
      downs = _ref$data.downs;
  return {
    id: id,
    title: title,
    author: author,
    subreddit: subreddit,
    thumbnail: thumbnail,
    url: url,
    ups: ups,
    downs: downs
  };
};