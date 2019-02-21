import express from 'express';
const _routes = express.Router();
import multer from 'multer';
import path from 'path';
import db from '../models';

// Initilaizing multer with diskStorge property
const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

// Initializing multer and saving instance in upload
const upload = multer({storage: store}).single('file');

// Creating route for file upload
_routes.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {
        // If there was an error uploading the file, return the error
        if (err) {
            console.log(err);
            return res.status(501).json({status: false,  message: err});
        }
        // If there was no error
        res.status(200).json({originalname: req.file.originalname, uploadname: req.file.filename});
    });
});

_routes.post('/download', (req, res, next) => {
    const filepath = path.join(__dirname, '../public/uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

export default _routes;