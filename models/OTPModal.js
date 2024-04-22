const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    otp_expiry:{
        type:Number,
        required:true
    }
});




const OTP = mongoose.model("OTP",otpSchema);
module.exports=OTP