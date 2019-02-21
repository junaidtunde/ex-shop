import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        help: "This field is required"
    },
    lastname: {
        type: String,
        required: true,
        help: "This field is required"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        help: "This field is required"
    },
    state: {
        type: String,
        required: true,
        help: "This field is required"
    },
    lga: {
        type: String,
        required: true,
        help: "This field is required"
    },
    phone: {
        type: String,
        required: true,
        help: "This field is required"
    },
    password: {
        type: String,
        required: true,
        help: "This field is required"
    },
    image_url: {
        type: String,
        default: "https://i.imgur.com/8DJCTs7.png"
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

//Write some "pre" functions

//
const User = mongoose.model('User', userSchema);

export default User;