// Khai bao mongoose
const mongoose = require('mongoose');
// Khai bao Schema
const Schema = mongoose.Schema ;
// Khoi tao Schema voi cac collection
const productTypeSchema = new Schema({
    _id:mongoose.Types.ObjectId,
    name:{
        type:String,
        unique:true,
        require:true
    },
    description:{
        type:String
    }
});

//B4 Biên dịch Schema thành model
module.exports = mongoose.model('productType',productTypeSchema);