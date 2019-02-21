'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _routes = _express2.default.Router();


// Initilaizing multer with diskStorge property
var store = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

// Initializing multer and saving instance in upload
var upload = (0, _multer2.default)({ storage: store }).single('file');

// Creating route for file upload
_routes.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        // If there was an error uploading the file, return the error
        if (err) {
            console.log(err);
            return res.status(501).json({ status: false, message: err });
        }
        // If there was no error
        res.status(200).json({ originalname: req.file.originalname, uploadname: req.file.filename });
    });
});

_routes.post('/download', function (req, res, next) {
    var filepath = _path2.default.join(__dirname, '../public/uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

exports.default = _routes;
//# sourceMappingURL=file.js.map