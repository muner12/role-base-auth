
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
   
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    
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