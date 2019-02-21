import express from 'express';
import controllers from './../controllers';
import jwt from 'jsonwebtoken';
import db from '../models';

const routes = express();

// Serves as a middleware to verify user token and return user id to the request controller
function verifyToken (req, res, next){
    // GET THE AUTH HEADER VALUE
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // verify jwt
        jwt.verify(bearerHeader, process.env.SECRET_KEY, (err, data)=>{
            db.User.findById(data.user).then((user)=>{
                if (user) {
                    req.user = data.user   ; 
                    next();             
                }else{
                    res.status(403).json({ status: false, message: 'Unauthorized' });
                }
            }).catch((err)=>{
                if (err) { res.status(403).json({ status: false, message: 'Unauthorized' }); }
            });
        });
        
    } else {
        //forbiden
        res.status(403).json({ status: false, message: 'Unauthorized' });
    }
}


routes.get('/', (req, res)=>{
    res.json({status: true});
});

// Product routes
routes.post('/product/create', controllers.productController.createProduct);
routes.get('/product/specific', controllers.productController.getProducts);
routes.get('/product/all', controllers.productController.getAllProductDetails);
routes.post('/product/one', controllers.productController.getProduct);


export default routes;