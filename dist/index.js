'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = require('socket.io');

var server = _http2.default.createServer(_app2.default);
var io = io.listen(server);

var port = process.env.PORT || 8080;

_app2.default.listen(port, function (err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Server running on ' + port);
});
//# sourceMappingURL=index.js.map