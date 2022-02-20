const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;