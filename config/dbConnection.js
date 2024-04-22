const mongoose=require('mongoose');
const {MONGO_URI}=require('./constants');
const connectDB=async()=>{

    try {
        const conn=await mongoose.connect(MONGO_URI,{
            useUnifiedTopology:true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
}catch (error) {
    console.log(error);
}

}


module.exports=connectDB