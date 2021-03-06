
const jwt = require("jsonwebtoken");

const Student = require("./../Models/studentModel")
const Speaker = require("./../Models/speakerModel");
const studentController = require("./../Controllers/studentController");
const SpeakerController = require("./../Controllers/speakerController");

module.exports.login = (request, response, next) => {
    let token;

    if (request.body.email == "admin" && request.body.password == "12345") {
        tok = jwt.sign({
            _id: 0,
            email: request.body.email,
            role: "admin"
        },
            "ThisIsUserForThisWebSite",
            { expiresIn: "1h" }
        );

        data = {
            _id: 0,
            email: "admin",
            role: "admin",
            token: tok
        }
        // response.status(200).json({message:"Login Successful", tok});
        // response.status(200).json(tok);
        response.status(200).json(data);
    }
    else if (request.body.role == "student") {
        Student.findOne({ email: request.body.email, password: request.body.password })
            .then(data => {
                if (data == null)
                    throw new Error("Email or Password isn't correct");

                token = jwt.sign({
                    _id: data._id,
                    email: data.email,
                    role: "student"
                },
                    "ThisIsUserForThisWebSite",
                    { expiresIn: "1h" }
                )
                role = request.body.role;

                response.status(200).json({ data, token, role });
            })
            .catch(error => next(error))
    }
    else if (request.body.role == "speaker") {
        Speaker.findOne({ email: request.body.email, password: request.body.password })
            .then(data => {
                if (data == null)
                    throw new Error("Email or Password isn't correct");
                token = jwt.sign({
                    _id: data._id,
                    email: data.email,
                    role: "speaker"
                },
                    "ThisIsUserForThisWebSite",
                    { expiresIn: "1h" }
                )
                role = request.body.role;
                console.log("here..")
                response.status(200).json({ data, token, role });
            })
            .catch(error => next(error))
    }
    else
        response.status(401).json({ message: "Login field, Please select your role" });
}

module.exports.register = (request, response, next) => {
    // console.log("In register: "+ request.body.role);
    if (request.body.role == "student") {
        Student.findOne({ email: request.body.email })
            .then(data => {
                if (data !== null)
                    response.status(401).json({ message: "This email aleady existes, please signin" });

                console.log("In register: Registerd");
                studentController.createStudent(request, response, next);
                response.status(200).json({ message: "Registeration Successful, Please login" });
            })
            .catch(error => next(error))
    }
    else if (request.body.role == "speaker") {
        Speaker.findOne({ email: request.body.email })
            .then(data => {
                if (data !== null)
                    response.status(401).json({ message: "You already registered, please login" });

                SpeakerController.createSpeaker(request, response, next);
                response.status(200).json({ message: "This email aleady existes, please signin" });
            })
            .catch(error => next(error))
    }
    else
        response.status(401).json({ message: "Please Select your role", token });
}


// Make check function for students and speakers exists

/*
module.exports.login=(request,response,next)=>
{
    let token;
   
    if(request.body.email=="admin"&&request.body.password=="12345")
    {
        token=jwt.sign({
                        _id:1,
                        email:request.body.email,
                        role:"admin"},
                        "ThisIsUserForThisWebSite",
                        {expiresIn:"1h"}
            );
        response.status(200).json({message:"Login Successful", token});
    }
    else 
    {
        Student.findOne({email:request.body.email,password:request.body.password})
                .then(data=>{
                    if(data)
                    {
                        token=jwt.sign({
                                            _id:data._id,
                                            email:data.email,
                                            role:"student"},
                                            "ThisIsUserForThisWebSite",
                                            {expiresIn:"1h"}
                                        )
                        response.status(200).json({message:"Login Successful", token});
                    }
                    else
                    {
                        Speaker.findOne({email:request.body.email,password:request.body.password})
                                .then(data=>{
                                    if(data)
                                    {
                                        token=jwt.sign({
                                                        _id:data._id,
                                                        email:data.email,
                                                        role:"speaker"},
                                                        "ThisIsUserForThisWebSite",
                                                        {expiresIn:"1h"}
                                                    )
                                        console.log("here..")
                                        response.status(200).json({message:"Login Successful", token});
                                    }
                                })
                                .catch(error=>next(error))
                    }            
                    throw new Error("Email or Password isn't correct");        
                })
                .catch(error=>next(error))
    }
}
*/