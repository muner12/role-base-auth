
const jwt=require('jsonwebtoken');

const RoleUser=require('../model/registerModal');
const JWTServices=require('../services/JWTServices');
const UserDTO=require('../dto/userDto');
const refreshHandler=async(req,res,next)=>{
    let cookie=req.cookies;
    if(!cookie.jwt){
        let error={
            status:401,
            message:"UnAuthorized Please loggin"
        }
        next(error)
    }

    let refreshToken=cookie.jwt;
    const fondUser=await RoleUser.findOne({refreshToken}).exec();
    if(!fondUser){
        let error={
            status:401,
            message:"unauthorized Please Loggin"
        }
        next(error)
    }

    let decode=JWTServices.verifyRefreshToken(refreshToken);

    if(decode.userInfo.username!==fondUser.username){
        const error={
            status:401,
            message:"unauthorized please login!"
        }
        next(error)
    }
    
    const roles=Object.values(fondUser.roles).filter(Boolean);
    const accessToken=JWTServices.accessToken({ "userInfo":{ "username":fondUser.username, "roles":roles} }, '60s');
   let  userdto=new UserDTO(fondUser);
    res.status(201).json({"userInfo":userdto,"roles":roles,"accessToken":accessToken});




}

module.exports={refreshHandler}