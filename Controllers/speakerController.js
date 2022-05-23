
const { response } = require("express");
const { request } = require("express");
const Speaker = require("./../Models/speakerModel");

module.exports.getAllSpeakers = (request, response, next) => {
    // if(request.role!=="admin")
    // if(request.role!=="speaker")
    // if(request.role!=="student")
    // throw new Error("Not Authorized...");
    Speaker.find({})
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(error => next(error))
}

module.exports.getSpeaker = (request, response, next) => {
    console.log(request.params.id);
    Speaker.findOne({ _id: request.params.id })
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
}

module.exports.createSpeaker = (request, response, next) => {
    // if(request.role!=="admin")
    //     throw new Error("Not Authorized...");    
    // if(Speaker.find({email:request.body.email})!==null)
    //     throw new Error("Email is doublicated please login");
    Speaker.find({ email: request.body.email })
        .then((data) => {
            console.log(data);
            if (data) {
                console.log("inside if condition");
                let speaker = new Speaker({
                    email: request.body.email,
                    username: request.body.username,
                    name: request.body.name,
                    bio: request.body.bio,
                    age: request.body.age,
                    password: request.body.password,
                    address: request.body.address
                })
                speaker.save()
                    .then(() => {
                        response.status(200).json({ message: "Speaker Created" });
                    })
                    .catch(error => next(error))
            }
            // else {
            //     throw new Error("Email is doublicated please login");
            // }
        });
    // console.log(request.body);
    // let speaker=new Speaker({
    //     email:request.body.email,
    //     username:request.body.username,
    //     name:request.body.name,
    //     bio:request.body.bio,
    //     age:request.body.age,
    //     password:request.body.password,
    //     address:request.body.address
    // })
    // speaker.save()
    //        .then(()=>{
    //            response.status(200).json({message:"Speaker Created"});
    //        })
    //        .catch(error=>next(error))
}

module.exports.editSpeaker = (request, response, next) => {
    // if(Speaker.find({email:request.body.email})!==null)
    //     throw new Error("Email is doublicated,you can't use this email");
    if (request.role !== "admin")
        if (request.role !== "speaker" && request.params.id !== request._id)
            throw new Error("Not Authorized...");

    if (request.role == "admin") {
        // if(request.body.password || request.body.username)
        //     throw new Error("Not Authorized...");
        Speaker.updateOne({ _id: request.body._id }, {
            $set: {
                email: request.body.email,
                username: request.body.username,
                name: request.body.name,
                bio: request.body.bio,
                age: request.body.age,
                // password:request.body.password,
                address: request.body.address
            }
        })
            .then((data) => {
                if (data.matchedCount == 0)
                    throw new Error("Speaker dosen't exists");
                response.status(200).json({ message: "Speaker Updated", data });
            })
            .catch(error => next(error))
    }
    else {
        if (request._id !== request.body._id)
            throw new Error("Not Authorized...");
        Speaker.updateOne({ _id: request.body._id }, {
            $set: {
                email: request.body.email,
                username: request.body.username,
                username: request.body.username,
                name: request.body.name,
                bio: request.body.bio,
                age: Nrequest.body.age,
                password: request.body.password,
                address: request.body.address
            }
        })
            .then((data) => {
                if (data.matchedCount == 0)
                    throw new Error("Speaker dosen't exists");
                response.status(200).json({ message: "Speaker Updated", data });
            })
            .catch(error => next(error))

    }
}

module.exports.deleteSpeaker = (request, response, next) => {
    if (request.role !== "admin")
        if (request.role !== "speaker" && request._id !== request.body.id)
            throw new Error("Not Authorized...");

    // if(request._id!==request.body.id)
    //     throw new Error("Not Authorized...");

    Speaker.deleteOne({ _id: request.params.id })
        .then(data => {
            response.status(200).json({ message: "Speaker Deleted", data });
        })
        .catch(error => next(error))
}
