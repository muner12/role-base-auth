const {ValidationError}=require('joi');


const errorHandler=(error,req,res,next)=>{
    let status=500
    let data={
        MESSAGE:"Internal Server  error"
    }

    if(error instanceof ValidationError){

        return res.status(400).json({
            STATUS:'FAILED',
            ERROR_MESSAGE:error.message,
            ERROR_FILTER:'TECHNICAL_ISSUE',
            ERROR_CODE:400,
            DB_DATA:""
            
        })

    }

    if(error.STATUS){
        status=error.STATUS
    }
    if(error.MESSAGE){

        data.MESSAGE=error.MESSAGE
    }

    res.status(status).json({
        STATUS:'FAILED',
        ERROR_MESSAGE:data.MESSAGE,
        ERROR_CODE:status,
        ERROR_FILTER:'TECHNICAL_ISSUE',
        DB_DATA:null
    })
}


module.exports=errorHandler