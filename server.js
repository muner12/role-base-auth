const epxress=require('express');
const dotenv=require('dotenv').config();
const dbConnect=require('./config/connection');
const mongoose=require('mongoose');
const errorHandlerMiddleware=require('./middleware/errorHandler');
const cookieParser=require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT');
const notFoundRouteHandler=require("./middleware/notFoundRouteHandler");
const cors=require('cors');
// Import Swagger documentation
const { swaggerUi, swaggerSpec, swaggerUiOptions } = require('./swagger');

const app=epxress();

const PORT=process.env.PORT || 8000
dbConnect();

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

app.get('/',(req,res)=>{
    res.status(201).json({"MESSAGE":"GET API FETCHED SUCCESSFULLY"});
})
app.use(epxress.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (use '*' with caution in production)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(cors());
app.use(cookieParser());

app.use('/api',require('./routes/register'));
app.use('/api',require('./routes/login'));

app.use('/api',require('./routes/refresh'));
app.use('/api',require('./routes/todo'));
app.use('/api',require('./routes/webhook'));


app.use(verifyJWT);

app.use('/api',require('./routes/routes'));


app.use(errorHandlerMiddleware)

mongoose.connection.once('open',()=>{
    console.log('connected To db')
    app.listen(PORT,()=>{
        console.log('SERVER IS RUNIING ON: http://localhost:'+PORT);
        console.log(`API Documentation available at: http://localhost:${PORT}/api-docs`);
    });
})
