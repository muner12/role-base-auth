const RoleUser=require('../model/registerModal');
const JWTServices=require('../services/JWTServices');
const bcrypt=require('bcrypt');

const assignRoleHandler=async(req,res,next)=>{

        const data=req.body
        const cookie=req.cookies;
        //check jwt in cookies
        console.log("cookie",cookie)
        if(!cookie.jwt){
        let error={
            status:401,
            message:"Token Not Provided Please Loggined!!!"
        }
        next(error);
        }

        //check loggined admin-> token adn verify token
        const token=cookie.jwt
        let decode;
        try {
             decode=JWTServices.verifyAccessToken(token);
            
             
        } catch (error) {
            let err={
                status:401,
                message:"Your Loggined Session is Expired Please Loggedin"
            }
            next(err)
        }
        //find user password from cookies 
        console.log("decode",decode);
        
        try {
            let userData= await RoleUser.findOne({username:decode.userInfo.username}).exec();
            let match=await bcrypt.compare(data.password,userData.password);
            if(!match){
                let error={
                    status:401,
                    message:"Incorrect Password Please Enter Your Correct Password"

                }
                next(error)
            }


        } catch (error) {
            next(error)
        }

        let username=data.username
        let fondUser;
    try {
         fondUser=await RoleUser.findOne({username}).exec();
        if(!fondUser){
            let error={
                status:401,
                message:"Username Not found please try again!"

            }
            next(error)
        }
    } catch (error) {
        next(error)
    }


    try {
        if(data.Admin){
            fondUser.roles.Admin=data.Admin
        }else if(data.Editor){
            fondUser.roles.Editor
        } 
      let save=await fondUser.save();

      res.status(200).json({"message":data.username+" roles changed successfully!"})

    } catch (error) {
        next(error)        
    }


}

module.exports={assignRoleHandler}