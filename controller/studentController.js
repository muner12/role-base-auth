const bcrypt=require('bcrypt');
const Joi=require('joi');

const Student=require('../model/studentModal');

const UserDTO=require('../dto/userDto');

const  register=async(req,res,next)=>{

    const validationSchema=Joi.object({
        name:Joi.string().min(5).max(50).required(),
        username:Joi.string().alphanum().min(5).max(20).required(),
        email:Joi.string().email().required(),
        phone:Joi.string().min(11).max(16).required(),
        roles:Joi.string().required(),
        password:Joi.string().alphanum().min(8).max(30).required(),
        confirm_password:Joi.ref('password')
    });

    const {error}=validationSchema.validate(req.body);
    if(error){
      return  next(error)
    }

    const {name,username,phone,email,roles,password}=req.body

    try {

    const userNameExist= await Student.findOne({username}).exec();
    const emailExist=await Student.findOne({email}).exec();

    if(userNameExist){
        let error={
            status:409,
            message:"username already exist, please try another one"
        }
        return next(error)
    }
    if(emailExist){
        let error={
            status:409,
            message:"email already exist, Please try another one"
        }
        return next(error)
    }



    } catch (error) {
        next(error)
    }
    
//check roles
    if(roles=="Teacher" || roles=="teacher"){

        let error={
            status:422,
            message:"Please Enter Student Role"
        }
        return next(error)
    }
        
    try {
        const hashedPwd=await bcrypt.hash(password,10);
    const user=new Student({
        name,
        username,
        email,
        phone,
        roles,
        password:hashedPwd
    });
    const newUser=await user.save();
    const userDto=new UserDTO(newUser);

    res.status(201).json({Result:userDto,auth:true})

    } catch (error) {
        next(error)
        
    }

    



}

module.exports={register}