const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    type: [{
        type: mongoose.Types.ObjectId,
        ref: 'productType',
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('product', productSchema)