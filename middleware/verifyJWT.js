const JWTServices=require('../services/JWTServices')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization

    if(!authHeader.startsWith('Bearer')){
        const error={
            status:401,
            message:"unuthorized"
        }
        next(error)
    }
    
    const token=authHeader.split(' ')[1]

    const decode=JWTServices.verifyAccessToken(token);

   
   
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