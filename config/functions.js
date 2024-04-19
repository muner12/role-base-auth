function CompareDate(outTime){
   console.log(outTime);
    let OTP=outTime.split(':');
    let CT=new Date();
    let ST=new Date();
    ST.setHours(OTP[0])
    ST.setMinutes(OTP[1])
    ST.setSeconds(OTP[2]);
    
    console.log(ST,CT)
    if(CT>ST){
       return false
    }else{
        return true
    }
    
}


let currentDateAndTime=()=>{
    
let currentDate= new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();
let date=`${year}-${month}-${day}`;
let time=`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
   

return {date,time}
}



let sevenDaysAgoDate=()=>{
    // Get the current date
const currentDate = new Date();

// Subtract 7 days from the current date
const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 7);

const year = sevenDaysAgo.getFullYear();
const month = sevenDaysAgo.getMonth() + 1; // Months are zero-based, so add 1
const day = sevenDaysAgo.getDate();
let date=`${year}-${month}-${day}`;
   return date


}

module.exports={CompareDate,currentDateAndTime,sevenDaysAgoDate}