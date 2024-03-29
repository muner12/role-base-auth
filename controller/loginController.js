
const Joi=require('joi');
const bcrypt=require('bcrypt');
const JWTServices=require('../services/JWTServices');
const UserDTO=require('../dto/userDto');

const RoleUser=require('../model/registerModal');

const login=async(req,res,next)=>{

    const validationSchema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required(),
    });
    const {username,password}=req.body
    const {error}=validationSchema.validate(req.body);

    if(error){
        return next(error)
    }

   try {
    
    let fondUser= await RoleUser.findOne({username}).exec();
    if(!fondUser){
        let error={
            status:401,
            message:"Invalid Username or Password,Please Entery correct login credentials"
        }
        next(error);
    }

    const match=await bcrypt.compare(password,fondUser.password)
    if(match){
        const roles=Object.values(fondUser.roles).filter(Boolean);

        const refreshToken=JWTServices.refreshToken({ "userInfo":{ "username":fondUser.username, "roles":roles} }, '1d');
        const accessToken=JWTServices.accessToken({ "userInfo":{ "username":fondUser.username, "roles":roles} }, '1h');
        fondUser.refreshToken=refreshToken

        const result=await fondUser.save();
        const userdto=new UserDTO(result);
        res.cookie('jwt',refreshToken,{httpOnly:true,secure:true,sameSite:'None',maxAge:1000*60*60*24});
        res.cookie('jwt',accessToken,{httpOnly:true,secure:true,sameSite:'None',maxAge:1000*60*60});

        res.status(201).json({"userInfo":userdto,"roles":roles,"accessToken":accessToken});

       
       
    }else{
        let error={
            status:401,
            message:"Invalid Username or Password,Please Entery correct login credentials"
        }
        return next(error)
    }



   } catch (error) {
    next(error)
   }

}

module.exports={login}