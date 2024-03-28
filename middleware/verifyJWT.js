const JWTServices=require('../services/JWTServices')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization
 

    if(authHeader==undefined || !authHeader.startsWith('Bearer')){
        const error={
            status:401,
            message:"Token Not provided please add token to the request header"
        }
        next(error)
    }
    
    const token=authHeader.split(' ')[1]
   
    let decode;
    try {
        decode=JWTServices.verifyAccessToken(token);
    } catch (error) {
        let err={
            status:401,
            message:"Token is expired Please loggined again"
        }
      return  next(err);
    }
   

   
   
    if(!decode){
            let error={
                status:403,
                message:"invalid token"
            }
            next(error);
    }

    req.user=decode.userInfo.username
    req.roles=decode.userInfo.roles
    next();


}

module.exports=verifyJWT