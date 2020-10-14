"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = require("fs");

var searchRedditPostsByTopicPromise = function searchRedditPostsByTopicPromise(topic) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "new";
  if (!topic) return;
  var redditUrl = "https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort);
  (0, _nodeFetch["default"])(redditUrl).then(function (res) {
    return res.json();
  }).then(function (res) {
    var _res$data;

    var posts = (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.children) || [];
    return specifyFields(posts, fields);
  }).then(function (posts) {
    return _fs.promises.writeFile('data.json', JSON.stringify(posts, null, '\t'));
  }).then(function () {
    return console.log('Saved Successfully!');
  })["catch"](function (err) {
    return console.error(err);
  });
};

var searchRedditPostsByTopicAsync = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(topic) {
    var fields,
        sort,
        redditUrl,
        _results$data,
        res,
        results,
        data,
        posts,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            sort = _args.length > 2 && _args[2] !== undefined ? _args[2] : "new";

            if (topic) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            redditUrl = "https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort);
            _context.prev = 5;
            _context.next = 8;
            return (0, _nodeFetch["default"])(redditUrl);

          case 8:
            res = _context.sent;
            _context.next = 11;
            return res.json();

          case 11:
            results = _context.sent;
            data = (results === null || results === void 0 ? void 0 : (_results$data = results.data) === null || _results$data === void 0 ? void 0 : _results$data.children) || [];
            posts = specifyFields(data, fields);

            _fs.promises.writeFile('data.json', JSON.stringify(posts, null, '\t'));

            console.log('Saved Sucessfully');
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](5);
            console.error(_context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 18]]);
  }));

  return function searchRedditPostsByTopicAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

var specifyFields = function specifyFields(posts, fields) {
  if (!fields.length || !fields) return posts;
  return posts.map(function (post) {
    return fields.reduce(function (acc, field) {
      console.log(post === null || post === void 0 ? void 0 : post.data[field]);

      if ((post === null || post === void 0 ? void 0 : post.data[field]) !== undefined) {
        acc[field] = post === null || post === void 0 ? void 0 : post.data[field];
      }

      return acc;
    }, {});
  });
};

searchRedditPostsByTopicAsync('Gaming', ['thumbnail', 'title', 'id']);