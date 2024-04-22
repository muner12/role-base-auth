
const OTP = require("../models/OTPModal");
const Account=require("../models/accountModal");
const joi=require('joi');
const OTPController=async(req,res,next) =>{

    validationSchema=joi.object({
        otp:joi.string().min(6).max(6).required().messages({
            "any.required":"OTP must be  required",
            "string.min":"OTP should be minimum of 6 digits",
            "string.max":"OTP should be maximum of 6 digits",
            "string.empty":"OTP is required"
        }),
        number:joi.string().min(13).pattern(/^\+[1-9]\d{1,13}$/).required().messages({
            "any.required":"number must be required",
            "string.pattern.base":"Phone number must be a valid international format",
            "string.empty":"number is required",
            "string.min":"number should be minimum of 13 characters"
        })
      });
    
      let {error}=validationSchema.validate(req.body);
      if(error){
    
        return next(error);
      }


    const {number,otp}=req.body;


    try {
        
        const account= await Account.findOne({number});
        console.log(account)
        if(account===null){
            let error={
                STATUS:400,
                MESSAGE:"This number not Exits"
            }
            next(error)
        }

        let otpData=await OTP.findOne({number:number});


        if(otpData.otp!=otp){
            let error={
                STATUS:400,
                MESSAGE:"Please Enter Correct OTP"
            }
            return next(error)
        }
        

        if(otpData.otp_expiry<Date.now()){

            let error={
                STATUS:400,
                MESSAGE:"OTP Expired"
            }

            return next(error)
        }


        if(otpData.otp===otp){
        
        

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
            return next(error)
        }
    } catch (error) {
        let eror={
            MESSAGE:"OTP CONtroller er "
        }
        next(eror)
    }
    

};

module.exports = OTPController