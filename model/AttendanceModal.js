

const mongoose=require('mongoose');

const studentAttendanceSchema=new mongoose.Schema({
    stdId:{
        type:String,ref:'Student',required:true
    },
    username:{
        type:String,required:true
    },
    date:{
        type:String,required:true
    
    },
    time:{
        type:String,required:true
    }

});


const StudentAttendance=mongoose.model('StudentAttendance',studentAttendanceSchema);

module.exports=StudentAttendance