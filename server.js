const express=require('express');
const { test } = require('media-typer');





const app=express();
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    
console.log(`server running on:http://localhost:${PORT}`)

})



