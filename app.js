
const express=require("express");
const mongoose=require("mongoose");
const body_parser=require("body-parser");

const authRouter=require("./Routers/authRouter");
const homeRouter=require("./Routers/homeRouter");
const eventRouter=require("./Routers/eventRouter"); 
const speakerRouter=require("./Routers/speakerRouter"); 
const studentRouter=require("./Routers/studentRouter"); 

const server=express();

mongoose.connect("mongodb://localhost:27017/EventsSystem")
        .then(()=>{
            console.log("Database connected");
            server.listen(process.env.PORT|8080, ()=>{
                console.log("I'm Listening.....");
            })
        })
        .catch(error=>console.log("Database Connection Failed!"))

// Logger Middle Ware
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
})

//

server.use((request,response,next)=>{
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    response.header("Access-Control-Allow-Headers","*");
    next();
})
//Content-Type,Authorization

// 
server.use(body_parser.json());
server.use(body_parser.urlencoded({extends:false}));


// Routers
server.use(authRouter);
server.use(homeRouter);
server.use(eventRouter);
server.use(speakerRouter);
server.use(studentRouter);

// Not Found Middle Ware
server.use((request,response,next)=>{
    response.status(404).json({message:"Page is Not Found"});
})

// Error Middle Ware
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
})
