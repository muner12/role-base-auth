const express=require('express');
const router=express.Router();
const registerController=require('../controller/registerController');

router.route('/register').post(registerController.register);


module.exports=router