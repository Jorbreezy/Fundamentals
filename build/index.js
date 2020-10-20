"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedditUrl = exports.extractFields = exports.processData = exports.fetchJson = void 0;
var node_fetch_1 = require("node-fetch");
exports.default = (function (topic, fields, sort) {
    if (fields === void 0) { fields = []; }
    if (sort === void 0) { sort = "new"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var url, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Array.isArray(fields))
                        throw new Error('Field has to be an array!');
                    url = exports.getRedditUrl(topic, sort);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exports.fetchJson(url)];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, exports.processData(res, fields)];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, console.error('Error: ', err_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
});
exports.fetchJson = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default(url)
                    .then(function (res) { return res.json(); })
                    .catch(function (err) { return console.error(err); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.processData = function (res, fields) {
    var _a;
    var data = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.children;
    return exports.extractFields(data, fields);
};
exports.extractFields = function (data, fields) {
    if (fields === void 0) { fields = []; }
    if (!Array.isArray(data))
        throw new Error('Data is not an array');
    if (!fields.length)
        return data;
    return data.map(function (obj) {
        if (typeof obj === 'object') {
            return fields.reduce(function (acc, field) {
                var _a;
                if (typeof field !== 'string')
                    throw new Error(field + " is not a string");
                var newObject = __assign({}, acc);
                if ((obj === null || obj === void 0 ? void 0 : obj.data[field]) !== undefined) {
                    newObject = __assign(__assign({}, acc), (_a = {}, _a[field] = obj === null || obj === void 0 ? void 0 : obj.data[field], _a));
                }
                return newObject;
            }, {});
        }
    });
};
exports.getRedditUrl = function (topic, sort) {
    if (sort === void 0) { sort = 'new'; }
    if (!topic || typeof topic !== 'string')
        throw new Error('Topic not a string!');
    if (typeof sort !== 'string')
        throw new Error('Sort is not a string!');
    return "https://www.reddit.com/r/pics/search.json?q=" + topic + "&sort=" + sort;
};
