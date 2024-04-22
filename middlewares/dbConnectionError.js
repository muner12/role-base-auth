const mongoose=require('mongoose');
let db=mongoose.connection;


const connectionError=(req,res,next)=>{
    

  

    // Check if the database is connected
    if (mongoose.connection.readyState === 1) {
        // If database is connected, proceed to the next middleware
        next();
    } else {
        // If database is not connected, return an error response
        res.status(500).json({
            STATUS:'FAILED',
            ERROR_MESSAGE:"Database connection error",
            ERROR_CODE:500,

        })
    }

}


module.exports=connectionError