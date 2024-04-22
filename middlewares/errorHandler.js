const {ValidationError}=require('joi');


const errorHandler=(error,req,res,next)=>{
    let status=500
    let data={
        MESSAGE:"Internal Server  error"
    }

    if(error instanceof ValidationError){

        return res.status(400).json({
            ERROR:error.message,
            STATUS:400
            
        })

    }

    if(error.STATUS){
        status=error.STATUS
    }
    if(error.MESSAGE){

        data.MESSAGE=error.MESSAGE
    }

    res.status(status).json({
        ERROR:data.MESSAGE,
        STATUS:status
    })
}


module.exports=errorHandler