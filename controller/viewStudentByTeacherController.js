const  Student=require("../model/studentModal");

const UserDTO=require("../dto/userDto");
const viewStudentByTeacher=async(req,res,next)=>{
    

    try {
        
        let student=await Student.find();

        let dto=student.map(student => new UserDTO(student));
        res.status(200).json({Data:dto});

    } catch (error) {
        return next(error);
    }

}


module.exports={viewStudentByTeacher}