const express=require('express');
const router=express();

const ROLS_LIST=require('../config/rols_list');

const verifyRols=require('../middleware/verifyRole');
const assignRoleController=require('../controller/assignRoleController');
const ViewUserController=require('../controller/viewUserController');
const viewStudentByTeacher = require('../controller/viewStudentByTeacherController');
const AttendanceController=require('../controller/AttendanceController');


//userRoutes
router.route("/users").post(verifyRols(ROLS_LIST.Admin,ROLS_LIST.SuperAdmin),ViewUserController.ViewUserController)
//adimin routes
router.route("/admin").post(verifyRols(ROLS_LIST.Admin),(req,res,next)=>{
    res.status(201).json({"message":"protected routes accessable for only admin!"})
});
//Login Teacher Route
router.route("/viewStudentByTeacher").post(verifyRols(ROLS_LIST.Teacher,ROLS_LIST.SuperAdmin),viewStudentByTeacher.viewStudentByTeacher);
//super Admin Routes
router.route('/allUserData').post(verifyRols(ROLS_LIST.SuperAdmin),ViewUserController.viewAllUsersData);

router.route('/assignRole').post(verifyRols(ROLS_LIST.SuperAdmin),assignRoleController.assignRoleHandler);
router.route('/deleteRole').post(verifyRols(ROLS_LIST.SuperAdmin),assignRoleController.deleteRoleHandler);

//attendance Route
router.route('/studentAttendance').post(verifyRols(ROLS_LIST.Student),AttendanceController.AttendanceController);
router.route('/viewStudentAttendance').post(verifyRols(ROLS_LIST.Student),AttendanceController.viewAttendance);


module.exports=router