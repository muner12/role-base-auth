const epxress=require('express');
const dotenv=require('dotenv').config();
const app=epxress();

const PORT= 8080 || process.env.PORT;
app.get('/',(req,res)=>{

    res.status(201).json({"MESSAGE":"GET ROUTE"})
})

app.listen(PORT,()=>{
    console.log('SERVER IS RUNIING ON: http://localhost:'+PORT);
})