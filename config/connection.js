const mongoose=require('mongoose');

const {DB_CONNECTION_STRING}=require('./constants');
const dotenv=require('dotenv')
dotenv.config();
const dbConnect=async()=>{
  
    try {
        const con=await mongoose.connect(DB_CONNECTION_STRING);
        console.log("database connected to",con.connection.host)
    } catch (error) {
        console.log(error)
    }
}

module.exports=dbConnect;