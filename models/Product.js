import mongoose from 'mongoose';
const { Schema } = mongoose;

// Initialise a new mongoose schema with the appropriate fields
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        help: 'This field is required'
    },
    description: {
        type: String,
        required: true,
        help: 'This field is required'
    },
    price: {
        type: String,
        required: true,
        help: 'This field is required'
    },
    category: {
        type: String,
        required: true,
        help: 'This field is required'
    },
    image: {
        type: String,
        required: true,
        help: 'This field is required'
    },
    color: {
        type: String,
        required: true,
        help: 'This field is required'
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;