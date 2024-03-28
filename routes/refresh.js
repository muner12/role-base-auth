const express=require('express');

const refreshController=require('../controller/refreshController')

const router=express();


router.route("/refresh").post(refreshController.refreshHandler);

module.exports=router