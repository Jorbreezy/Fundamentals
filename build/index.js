"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRedditUrl = exports.extractFields = exports.processData = exports.fetchJson = exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(topic) {
    var fields,
        sort,
        url,
        res,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            sort = _args.length > 2 && _args[2] !== undefined ? _args[2] : "new";

            if (Array.isArray(fields)) {
              _context.next = 4;
              break;
            }

            throw new Error('Field has to be an array!');

          case 4:
            url = getRedditUrl(topic, sort);
            _context.prev = 5;
            _context.next = 8;
            return fetchJson(url);

          case 8:
            res = _context.sent;
            return _context.abrupt("return", processData(res, fields));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", console.error('Error: ', _context.t0));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 12]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;

var fetchJson = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _nodeFetch["default"])(url).then(function (res) {
              return res.json();
            })["catch"](function (err) {
              return console.error(err);
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchJson(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchJson = fetchJson;

var processData = function processData(res, fields) {
  var _res$data;

  var data = (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.children) || [];
  return extractFields(data, fields);
};

exports.processData = processData;

var extractFields = function extractFields(data) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!Array.isArray(data)) throw new Error('Data is not an array');
  if (!fields.length) return data;
  return data.map(function (obj) {
    if ((0, _typeof2["default"])(obj) === 'object') {
      return fields.reduce(function (acc, field) {
        if (typeof field !== 'string') throw new Error("".concat(field, " is not a string"));

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
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'new';
  if (!topic || typeof topic !== 'string') throw new Error('Topic not a string!');
  if (typeof sort !== 'string') throw new Error('Sort is not a string!');
  return "https://www.reddit.com/r/pics/search.json?q=".concat(topic, "&sort=").concat(sort);
};

exports.getRedditUrl = getRedditUrl;

