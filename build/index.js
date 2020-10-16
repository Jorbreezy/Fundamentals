"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeJsonFile = exports.getRedditUrl = exports.extractFields = exports.processData = exports.fetchJsonData = exports.searchRedditPostsByTopicAsync = exports.searchRedditPostsByTopicPromise = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = _interopRequireDefault(require("fs"));

// Set the fetch -> json into a helper function instead of repeating them
var searchRedditPostsByTopicPromise = function searchRedditPostsByTopicPromise(topic) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "new";
  var url = getRedditUrl(topic, sort);
  fetchJsonData(url).then(function (res) {
    return processData(res, fields);
  }).then(function (posts) {
    return writeJsonFile('data.json', posts);
  })["catch"](function (err) {
    return console.error('Error: ', err);
  });
};

exports.searchRedditPostsByTopicPromise = searchRedditPostsByTopicPromise;

var searchRedditPostsByTopicAsync = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(topic) {
    var fields,
        sort,
        url,
        data,
        posts,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            sort = _args.length > 2 && _args[2] !== undefined ? _args[2] : "new";
            url = getRedditUrl(topic, sort);
            _context.prev = 3;
            _context.next = 6;
            return fetchJsonData(url);

          case 6:
            data = _context.sent;
            posts = processData(data, fields);
            writeJsonFile('data.json', posts);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function searchRedditPostsByTopicAsync(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Pass all the data into specify fields
// Extract Fields
// Allow it to be specific to an array of objects
// Could add a function Process data and use specify/extract fields in it


exports.searchRedditPostsByTopicAsync = searchRedditPostsByTopicAsync;

var fetchJsonData = function fetchJsonData(url) {
  return (0, _nodeFetch["default"])(url).then(function (res) {
    return res.json();
  })["catch"](function (err) {
    return console.error(err);
  });
};

exports.fetchJsonData = fetchJsonData;

var processData = function processData(res, fields) {
  var _res$data;

  var data = (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.children) || [];
  return extractFields(data, fields);
};

exports.processData = processData;

var extractFields = function extractFields(data, fields) {
  if (!fields.length || !fields) return data;
  return data.map(function (obj) {
    if ((0, _typeof2["default"])(obj) === 'object') {
      return fields.reduce(function (acc, field) {
        if ((obj === null || obj === void 0 ? void 0 : obj.data[field]) !== undefined) {
          acc[field] = obj === null || obj === void 0 ? void 0 : obj.data[field];
        }

        return acc;
      }, {});
    }
  });
};

exports.extractFields = extractFields;

var getRedditUrl = function getRedditUrl(topic) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "new";
  if (!topic && typeof topic !== 'string') return new Error('Topic not a string!');
  if (typeof sort !== 'string') return new Error('Sort is not a string!');
  return "https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort);
};

exports.getRedditUrl = getRedditUrl;

var writeJsonFile = function writeJsonFile(filename, data) {
  _fs["default"].writeFileSync(filename, JSON.stringify(data, null, '\t'));

  console.log('Saved Successfully!');
};

exports.writeJsonFile = writeJsonFile;