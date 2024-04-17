const express=require('express');
const loginController=require('../controller/loginController');

const router=express.Router();
//gental User login
router.route('/login').post(loginController.login);

//student Login
router.route('/studentLogin').post(loginController.studentLogin);


//Teacher Login
router.route("/teacherLogin").post(loginController.teacherLogin);
module.exports=router