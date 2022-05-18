/*
    Student:
    1- _id (Number)
    2- Email which is unique
    3- password
*/

const mongoose=require("mongoose");

// make email uniqe using logic
// use bcrypt plugin for encript password


let studentSchema=mongoose.Schema({
    _id:Number,
    email:String,
    username:String,
    name:String,
    bio:String,
    age:Number,
    password:String
})

let students=mongoose.model("students",studentSchema);

module.exports=students;