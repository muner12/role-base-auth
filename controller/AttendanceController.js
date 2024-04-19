const AttendanceModal=require('../model/AttendanceModal');
const JWTServices=require('../services/JWTServices');
const moment=require('moment');
const  {CompareDate,currentDateAndTime,sevenDaysAgoDate}=require('../config/functions')


let {date,time}=currentDateAndTime()
const AttendanceController=async(req,res,next)=>{
let {username}=req.body;

    //check if the time of attendence is exceds than vacatiom time

     if(!CompareDate("14:30:00"))
     {
       let error={
           status:422,
           message:"Attendence Time Out, Now Your are not able to mark your attendence"
       }
       
        return next(error)
    }


        try {
          let count=await  AttendanceModal.aggregate([
            {
              '$match': {
                'date': date,
                'username':username
              }
            }, {
              '$count': 'total'
            }
          ]);
          console.log(count)

          if(count[0].total>0){
            let error={
                status:422,
                message:"Attendence is Already Marked"
            }
            return next(error)
          }

           

        } catch (error) {
            next(error)
        }

    

    let decode;

try {
    decode=JWTServices.verifyAccessToken(req.cookies.jwt);

} catch (error) {

    next(error);
}













try {
      

   // let adate="2024-4-13";

    let attendence=new AttendanceModal({
        stdId:decode.userInfo.id,
        username,
        date:date,
        time:time
    });

    let response=await attendence.save();
    res.json({data:"Attendence Marked"});
    
} catch (error) {
    next(error)
}





}




//-------------------------------------------------------------View Attendence-----------------------------

const viewAttendance=async(req,res,next)=>{
    let sevenDaysAgo=sevenDaysAgoDate();
    console.log(sevenDaysAgo)

    let response=await  AttendanceModal.aggregate([
      {
        '$match': {
          'date': {
            '$gte': sevenDaysAgo,
            '$lt': "2024-4-18",

          }
        }
      },
      
    ])

    console.log(response)


    res.status(200).json({data:response})
}

module.exports={AttendanceController,viewAttendance}