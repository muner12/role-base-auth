
const OTP = require("../models/OTPModal");
const Account=require("../models/accountModal");

const OTPController=async(req,res,next) =>{

    const {number,otp}=req.body;


    try {
        
        let otpData=await OTP.findOne({number:number});
        

        if(otpData.otp_expiry<Date.now()){

            let error={
                STATUS:400,
                MESSAGE:"OTP Expired"
            }

            return next(error)
        }


        if(otpData.otp===otp){
        
        const account= await Account.findOne({number});

        account.isOTPVerified=true;
        await account.save();

            

            res.json({
                STATUS:200,
                MESSAGE:"OTP Verified successfully",

            })
        }else{
            let error={
                STATUS:400,
                MESSAGE:"Please Enter Correct OTP"
            }
        }
    } catch (error) {
        
    }
    

};

module.exports = OTPController