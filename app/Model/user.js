const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    roles:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('User',userModel)