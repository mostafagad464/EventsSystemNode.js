
module.exports.homeResponse=(request,response,next)=>
{
    response.status(200).json({message:"Home Page Response"});
}



