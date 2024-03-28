const express=require('express');
const router=express();

const ROLS_LIST=require('../config/rols_list');

const verifyRols=require('../middleware/verifyRole');



router.route("/users").post(verifyRols(ROLS_LIST.Admin,ROLS_LIST.User),(req,res,next)=>{
    res.status(201).json({"message":"protected routes accessable for only logged in User!"})
})

router.route("/admin").post(verifyRols(ROLS_LIST.Admin),(req,res,next)=>{
    res.status(201).json({"message":"protected routes accessable for only admin!"})
})

module.exports=router