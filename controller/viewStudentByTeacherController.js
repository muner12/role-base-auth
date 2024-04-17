const  Student=require("../model/studentModal");
const viewStudentByTeacher=async(req,res,next)=>{
    

    try {
        
        let student=await Student.find();

        res.status(200).json({Data:student});

    } catch (error) {
        return next(error);
    }

}


module.exports={viewStudentByTeacher}