const  registerModal=require("../model/registerModal");
const UserDTO=require("../dto/userDto");
const ViewUserController=async(req,res,next)=>{


    try {
        let users=await registerModal.find({roles:{user:2001}});

        //console.log(users)

        let newList=users.map(user => new UserDTO(user));
        res.status(200).json({Data:newList});
    } catch (error) {
        next(error)
    }
}


const viewAllUsersData=async(req,res,next)=>{
    
    try {
        let users=await registerModal.find();

        //console.log(users)

        let newList=users.map(user => new UserDTO(user));
        res.status(200).json({Data:newList});
    } catch (error) {
        next(error)
    }
}



module.exports={ViewUserController,viewAllUsersData}