'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

function verifyToken(req, res, next) {
    // GET THE AUTH HEADER VALUE
    var bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // verify jwt
        _jsonwebtoken2.default.verify(bearerHeader, process.env.SECRET_KEY, function (err, data) {
            _models2.default.User.findById(data.user).then(function (user) {
                if (user) {
                    req.user = data.user;
                    next();
                } else {
                    res.status(403).json({ status: false, message: 'Unauthorized' });
                }
            }).catch(function (err) {
                if (err) {
                    res.status(403).json({ status: false, message: 'Unauthorized' });
                }
            });
        });
    } else {
        //forbiden
        res.status(403).json({ status: false, message: 'Unauthorized' });
    }
}

routes.get('/', function (req, res) {
    res.json({ status: true });
});

exports.default = routes;
//# sourceMappingURL=routes.js.map