
const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
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



const Student=mongoose.model('Student',studentSchema);

module.exports=Student