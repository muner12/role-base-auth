const express=require('express');

const router=express.Router();


router.post('/webhook',(req,res)=>{
    console.log('Webhook received:',req.body);
    res.status(200).send('Webhook processed successfully');
})



module.exports=router;