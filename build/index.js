"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://www.reddit.com/r/pics/search.json?q=gaming&sort=best
var searchData = function searchData(topic) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "new";
  if (!topic) return;
  (0, _nodeFetch["default"])("https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort)).then(function (res) {
    return res.json();
  }).then(function (res) {
    return res.data.children;
  }).then(function (posts) {
    return posts.map(mutateData);
  }).then(function (posts) {
    return _fs.promises.writeFile('data.json', JSON.stringify(posts, null, '\t'));
  })["catch"](function (err) {
    return console.error(err);
  });
};

var mutateData = function mutateData(_ref) {
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

searchData('Gaming', 'Best');