"use strict";

var _express = _interopRequireDefault(require("express"));

var _app = _interopRequireDefault(require("./routes/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 3000;
app.use('/', _app["default"]);
app.listen(PORT, function () {
  return console.log("Listening on port ".concat(PORT));
});