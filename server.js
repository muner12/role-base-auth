const express=require('express');

const dotenv=require('dotenv').config();


const  router=require('./routes/index');
const errorHandler=require('./middlewares/errorHandler');
const connectDB=require('./config/dbConnection');

const app=express();
const PORT=process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use('/api',router);


app.use(errorHandler)

app.listen(PORT,()=>{
    
console.log(`server running on:http://localhost:${PORT}`)

})



