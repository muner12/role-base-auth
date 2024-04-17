
const mongoose=require('mongoose');

const teacherSchema=new mongoose.Schema({
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
    type:String,
    required:true
},
refreshToken:{
    type:String
}


},{timestamps:true});



const Teacher=mongoose.model('Teacher',teacherSchema);

module.exports=Teacher