
const mongoose=require('mongoose');

const AuthUserSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true,
},
phone:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
roles:{
    user:{
        type:Number,
        default:2001
    },
    Editor:Number,
    Admin:Number,
},
refreshToken:{
    type:String
}


},{timestamps:true});



const RoleUser=mongoose.model('RoleUser',AuthUserSchema);

module.exports=RoleUser