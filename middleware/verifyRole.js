
const verifyRols=(...allowedRols)=>{
    return (req,res,next)=>{
    if(!req.roles){
        const error={
            status:401,
            message:"unauthorized for this routes"
        }
        next(error)
    }
    const rolesArray=[...allowedRols];
    console.log(rolesArray,req.roles)
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    console.log("verify role",req.roles.map(role=>rolesArray.includes(role))) 
    if(!result){
        let error={
            status:401,
            message:"unauthorized for this route"
        }
        next(error)
    }
    next();

    }
}


module.exports=verifyRols