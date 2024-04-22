const express=require('express');
const accoutController=require('../controllers/accountController');
const OTPController=require('../controllers/OTPController');

const router=express.Router();

router.get('/test',(req,res,next)=>{
    res.json({message:"Message"})
})
router.post('/createAccount',accoutController.register);
router.post('/verifyOTP',OTPController);

module.exports=router