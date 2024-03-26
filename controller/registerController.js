const bcrypt=require('bcrypt');
const Joi=require('joi');

const  register=async(req,res,next)=>{

    const validationSchema=Joi.object({
        name:Joi.string().min(5).max(50).required(),
        username:Joi.string().alphanum().min(5).max(20).required(),
        email:Joi.string().email().required(),
        phone:Joi.string().min(11).max(16).required(),
        password:Joi.string().alphanum().min(8).max(30).required(),
        confirm_password:Joi.ref('password')
    });

    const {error}=validationSchema.validate(req.body);
    if(error){
      return  next(error)
    }


}

module.exports={register}