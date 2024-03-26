const epxress=require('express');
const dotenv=require('dotenv').config();
const dbConnect=require('./config/connection');
const mongoose=require('mongoose');
const errorHandlerMiddleware=require('./middleware/errorHandler');
const app=epxress();

const PORT= 8080 || process.env.PORT;
dbConnect();
app.get('/',(req,res)=>{

    res.status(201).json({"MESSAGE":"GET ROUTE"})
})
app.use(epxress.json());

app.use('/api',require('./routes/register'));


app.use(errorHandlerMiddleware)

mongoose.connection.once('open',()=>{
    console.log('connected To db')
    app.listen(PORT,()=>{
        console.log('SERVER IS RUNIING ON: http://localhost:'+PORT);
    });
})