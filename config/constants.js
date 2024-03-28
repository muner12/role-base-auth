const dotenv=require('dotenv').config();


const DB_CONNECTION_STRING=process.env.MONGO_CONNECTION_URL
const REFRESH_SECRET_KEY=process.env.REFRESH_TOKEN_SECRET_KEY
const ACCESS_SECRET_KEY=process.env.ACCESS_TOKEN_SECRET_KEY

console.log()
module.exports={
    DB_CONNECTION_STRING,
    REFRESH_SECRET_KEY,
    ACCESS_SECRET_KEY
}