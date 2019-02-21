'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true }, function (err, response) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongo');
    }
});

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

//Prefix the API version
app.use('/api/v1', _routes2.default);

app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
});

// app.listen(port, () => {
//     console.log('The server has started on ' + `${port}`);
// });

exports.default = app;
//# sourceMappingURL=app.js.map