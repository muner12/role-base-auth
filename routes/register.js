const express=require('express');
const router=express.Router();
const registerController=require('../controller/registerController');
const studentController=require('../controller/studentController');
const teacherController=require('../controller/TeacherController');

//Genral User Register Route

router.route('/register').post(registerController.register);
//student Register Route

router.route('/studentRegister').post(studentController.register);

//Teacher Register Route

router.route('/teacherRegister').post(teacherController.register);

module.exports=router