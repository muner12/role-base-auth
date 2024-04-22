const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    isOTPVerified:{
        type:Boolean,
        default:false
    }
});



const Account = mongoose.model("Account",accountSchema);
module.exports=Account
