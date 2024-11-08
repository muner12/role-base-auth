const dotenv=require('dotenv').config();


const DB_CONNECTION_STRING=process.env.MONGO_CONNECTION_URL
const REFRESH_SECRET_KEY="REFRESH_TOKEN_SECRET_KEY_123123123123"
const ACCESS_SECRET_KEY="ACCESS_TOKEN_SECRET_KEY_123123123123"

console.log()
module.exports={
    DB_CONNECTION_STRING,
    REFRESH_SECRET_KEY,
    ACCESS_SECRET_KEY
}