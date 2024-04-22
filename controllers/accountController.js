
const joi=require('joi');

const Account=require('../models/accountModal');
const OTP=require('../models/OTPModal');
function generateOTP() {
    // Generate a random six-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert the number to a string
}

// Example usage


const register=async(req,res,next)=>{
    
  validationSchema=joi.object({
    name:joi.string().min(4).required().messages({
        "any.required":"Accont name must be  required",
        "string.min":"name should be minimum of 4 characters",
        "string.empty":"name is required"
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
//check if the exist or not in the dB





try {
    let account;
let otp;
     account=await Account.findOne({number:req.body.number});

     otp=await OTP.findOne({number:req.body.number});

    
    console.log(account)
   
     if(account){
        if(account.isOTPVerified){
        
            return res.json({STATUS:400,MESSAGE:"Account Already Exist"});
        }
       
        if(otp.otp_expiry>Date.now()){
    
            return res.json(
                {
                    STATUS:200,
                    MESSAGE:"Account created successfully Please Verify OTP",
                    OTP:otp.otp,
                    DATA:account
                }
            )
        }
       
        
        
       
        
        
        
        
        
        if(account && !account.isOTPVerified){
        
           await  Account.deleteMany({number:req.body.number,});
            await OTP.deleteMany({number:req.body.number});
        
        
        
        }
        
    
    
    }
   

} catch (error) {
    return next(error)
}

//check accoutn and otp











//Insert OTP in the db
const otp=generateOTP();

try {
    
    const newOTP=new OTP({
        number:req.body.number,
        otp_expiry:Date.now()+60000,
        otp:otp
        
    });
    newOTP.save();
} catch (error) {
    
}

//Save New Account
try {
    
  let isVerify=await Account.findOne({number:req.body.number});

    
    

    const newAccont=new Account({
        name:req.body.name,
        number:req.body.number
    });

   let savedAccount=await newAccont.save(); 

    res.json({
        STATUS:200,
        MESSAGE:"Account created successfully Please Verify OTP",
        OTP:otp,
        DATA:savedAccount
    })

} catch (error) {
    return next(error)
}







}


module.exports={register}