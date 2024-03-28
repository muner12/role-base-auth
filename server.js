const epxress=require('express');
const dotenv=require('dotenv').config();
const dbConnect=require('./config/connection');
const mongoose=require('mongoose');
const errorHandlerMiddleware=require('./middleware/errorHandler');
const cookieParser=require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT');

const app=epxress();

const PORT= 8080 || process.env.PORT;
dbConnect();
app.get('/',(req,res)=>{

    res.status(201).json({"MESSAGE":"GET ROUTE"})
})
app.use(epxress.json());

app.use(cookieParser());

app.use('/api',require('./routes/register'));
app.use('/api',require('./routes/login'));

app.use('/api',require('./routes/refresh'));

app.use(verifyJWT);

app.use('/api',require('./routes/routes'));


app.use(errorHandlerMiddleware)

mongoose.connection.once('open',()=>{
    console.log('connected To db')
    app.listen(PORT,()=>{
        console.log('SERVER IS RUNIING ON: http://localhost:'+PORT);
    });
})