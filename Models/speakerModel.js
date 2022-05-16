/*
    Speaker:
        1- _id (ObjectID)
        2- Email which is unique
        3- UserName
        4- Password [encrypted BONUS]
        5- Address (city ,street and building)
*/

const mongoose=require("mongoose");

// make email uniqe using logic
// use bcrypt plugin for encript password
// don't miss address details

let speakerSchema=mongoose.Schema({
    // _id:mongoose.Types.ObjectId,
    email:String,
    username:String,
    password:String,
    address:{
        city:String,
        street:String,
        building:String
    }
})

let speakers=mongoose.model("speakers",speakerSchema);

module.exports=speakers;