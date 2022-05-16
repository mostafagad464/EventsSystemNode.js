const jwt=require('jsonwebtoken');


module.exports=(request,response,next)=>
{
    let token,decodedToken;
    try
    {
        console.log(request.get("Authorization"));
        token=request.get("Authorization").split(" ")[1];
        decodedToken=jwt.verify(token,"ThisIsUserForThisWebSite");
    }
    catch(error)
    {
        next(new Error("Not Authorizated"));
    }
    request.role=decodedToken.role;
    request._id=decodedToken._id;
    
    // console.log(request.role);
    // console.log(decodedToken.role);
    // console.log(decodedToken);
    // console.log(request.body);
    // console.log(request._id);
    next();
}
