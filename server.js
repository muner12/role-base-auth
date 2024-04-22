const express=require('express');

const dotenv=require('dotenv').config();
const mongoose=require('mongoose');

const  router=require('./routes/index');
const errorHandler=require('./middlewares/errorHandler');
const connectDB=require('./config/dbConnection');
const connectionError=require('./middlewares/dbConnectionError');
const app=express();
const PORT=process.env.PORT || 5000;
connectDB();

const db=mongoose.connection;


app.use(connectionError);
app.use(express.json());

app.use('/api',router);


app.use(errorHandler)

app.listen(PORT,()=>{
    
console.log(`server running on:http://localhost:${PORT}`)

})



