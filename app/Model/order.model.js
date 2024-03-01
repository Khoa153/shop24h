const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    orderDate: { type: Date, default: Date.now() },
    shippedDate: { type: Date },
    note: { type: String },
    orderDetails: [{ type: mongoose.Types.ObjectId, ref: 'orderDetail' }],
    cost: { type: Number, default: 0 }
});


module.exports = mongoose.model('order', OrderSchema);;