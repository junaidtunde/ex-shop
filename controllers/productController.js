import db from './../models/index';

const productController = {};

productController.createProduct = (req, res) => {
    const { name, description, price, category, image, color } = req.body;

    // Check if product already exists
    db.Product.findOne({name}).then(product => {
        if (product !== null) {
            res.status(409).json({status: false, message: 'This product already exists'});
        } else {
            // If not, create a new instance and save it
            const prod = new db.Product({
                name, 
                description,
                price: String(price),
                category,
                image,
                color
            });
    
            db.Product.create(prod, (err, created) => {
                if (err) {
                    res.status(500).json({status: false, message: "The transaction did not go through"});
                } else {
                    res.status(200).json({status: true, message: 'Created product', data: created});
                }
            });
        }
    }).catch(err => {
        res.status(500).json({status: false, message: err.message});
    });
};

productController.getProducts = (req, res) => {
    // Search for all products and return specific properties
    db.Product.find().select('_id name price').then(product => {
        if (product.length === 0) {
            res.status(404).json({status: false, message: 'No product was found'});
        } else {
            res.status(200).json({status: true, message: 'Found Products', data: product});
        }
    });
};

productController.getAllProductDetails = (req, res) => {
    // Search for all products and return specific properties
    db.Product.find().then(product => {
        if (product.length === 0) {
            res.status(404).json({status: false, message: 'No product was found'});
        } else {
            res.status(200).json({status: true, message: 'Found Products', data: product});
        }
    }).catch(err => res.status(500).json({status: false, message: err.message}));
};

productController.getProduct = (req, res) => {
    const { id } = req.body;
    db.Product.findById({_id: id}).then(product => {
        if (product.length === 0) {
            res.status(404).json({status: false, message: 'No product was found'});
        } else {
            res.status(200).json({status: true, message: 'Found Product', data: product});
        }
    }).catch(err => res.status(500).json({status: false, message: err.message}));
};

export default productController;