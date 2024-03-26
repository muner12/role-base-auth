const dotenv=require('dotenv').config();


const DB_CONNECTION_STRING=process.env.MONGO_CONNECTION_URL

console.log()
module.exports={
    DB_CONNECTION_STRING
}