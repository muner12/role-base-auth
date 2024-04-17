const notFoundRouteHandler=(req,res)=>{
    

    res.status(404).json({message:"Route Not Found"})
}


module.exports=notFoundRouteHandler