const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})


module.exports =  mongoose.model('Users',userSchema)