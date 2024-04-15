const {ValidationError}=require('joi');


const errorHandler=(error,req,res,next)=>{
    let status=500
    let data={
        message:"Internal Server  error"
    }

    if(error instanceof ValidationError){

                                                                                
    }
}