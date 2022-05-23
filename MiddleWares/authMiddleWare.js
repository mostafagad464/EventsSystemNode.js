const jwt = require('jsonwebtoken');


module.exports = (request, response, next) => {
    if (request.method != "OPTIONS") {


        let token, decodedToken;
        try {
            // console.log(request.headers);
            // console.log("=======================");

            // console.log(request.get("Authorization"))

            // console.log(request.body);
            // console.log(request);
            // console.log("=======================");
            // console.log(request.headers);
            // console.log(request.rawHeaders);
            // console.log(request.rawHeaders[9]);
            // console.log("=======================");
            // console.log(request.get("Authorization"));
            token = request.get("Authorization").split(" ")[1];
            decodedToken = jwt.verify(token, "ThisIsUserForThisWebSite");
        }
        catch (error) {
            next(new Error("Not Authorizated"));
        }
        // console.log("===========================");

        // console.log(decodedToken);
        request.role = decodedToken.role;
        request._id = decodedToken._id;

        // console.log(request.role);
        // console.log(decodedToken.role);
        // console.log(decodedToken);
        // console.log(request.body);
        // console.log(request._id);
        next();
    }
}
