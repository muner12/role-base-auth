const {ValidationError}=require('joi')
const errorHandlerMiddleware=(error,req,res,next)=>{
    let status=500;
    let data={
        
        message:"internal Server Error"
    }

    if(error instanceof ValidationError){
        status=422;
        data.message=error.message
        return res.status(status).json(data);
    }

    if(error.status){
        status=error.status
    }

    if(error.message){
        data.message=error.message
    }

    return res.status(status).json(data);






}


module.exports=errorHandlerMiddleware