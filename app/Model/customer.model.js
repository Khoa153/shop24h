const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const customerSchema = new Schema({
    _id:mongoose.Types.ObjectId,
    fullName:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:'order'
    }]
})

module.exports =  mongoose.model('customer',customerSchema)