const express=require('express');
const  router=require('./routes/index');
const dotenv=require('dotenv').config();





const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use('/api',router);



app.listen(PORT,()=>{
    
console.log(`server running on:http://localhost:${PORT}`)

})



