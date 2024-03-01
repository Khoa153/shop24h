const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    _id:mongoose.Types.ObjectId,
    product:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    quanity:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('orderDetail',orderDetailSchema)