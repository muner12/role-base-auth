const RoleUser=require('../model/registerModal');
const JWTServices=require('../services/JWTServices');
const bcrypt=require('bcrypt');

const assignRoleHandler=async(req,res,next)=>{

        const data=req.body
        const cookie=req.cookies;
        //check jwt in cookies
        
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

const deleteRoleHandler=async(req,res,next)=>{

//check if token provided or not via cookies

let data=req.body
let cookie=req.cookies
let token=cookie.jwt;
let decode;
if(!cookie.jwt){
    let error={
        status:401,
        message:"Token Not Provided Please Loggined!!!"
    }
    next(error);
}
//check username is available or not
let fondUser;
try {
    
     fondUser= await RoleUser.findOne({username:data.username}).exec();
    if(!fondUser){
        let error={
            status:401,
            message:"Username Not found please try again!"
        }
  return  next(error);
    }

    
} catch (error) {
    next(error)
}

//check user role availabe or not
if(!fondUser.roles[data.role]){
    let error={
        status:404,
        message:"Role Not found please try again!"
    }
     return  next(error);
}


//check token is valid or expired
try {
    
    decode=JWTServices.verifyAccessToken(token);
    
} catch (error) {
    let err={
        status:401,
        message:"Your Loggined Session is Expired Please Loggedin"
    }
    return next(err)
}

//check sav
//check superAdmin password
try {
    
    const user=await RoleUser.findOne({username:decode.userInfo.username}).exec();
    const match=await bcrypt.compare(data.password,user.password);
    if(!match){
        let error={
            status:401,
            message:"Incorrect Password Please Enter Your Correct Password"
        }
        return next(error)
    }

} catch (error) {
    return next(error)
}


try {
    
    let updateUser = await RoleUser.findOneAndUpdate(
        {
            username: data.username
        },
        {
            $unset: {
                [`roles.${data.role}`]: '' // Using dot notation to specify nested field
            }
        },
        {
            new: true // To return the updated document
        }
    );
    

return res.json({Message:updateUser})
} catch (error) {
    return next(error)
}



}
module.exports={assignRoleHandler,deleteRoleHandler}