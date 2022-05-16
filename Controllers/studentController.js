
const Student=require("./../Models/studentModel");

module.exports.getAllStudents=(request,response,next)=>
{
    // if(request.role!=="admin"||"speaker"||"student")
    // if(request.role!=="admin")
        // if(request.role!=="speaker")
            // if(request.role!=="student")
                // throw new Error("Not Authorized...");

    Student.find({})
           .then((data)=>{
                response.status(200).json(data);
           })
           .catch(error=>next(error));
}

module.exports.getStudent = (request,response,next)=>
{
    console.log(request.params.id);

    Student.findOne({_id:request.params.id})
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch(error=>next(error));
}

module.exports.createStudent=(request,response,next)=>
{
    // console.log(Student.exists({email:request.body.email},(data)=>{data}));
    // console.log(request.body.email);

    // if(Student.exists({email:request.body.email})!==null)
    //     throw new Error("Email is doublicated please login");
    console.log("befoore create student");
    // if(request.role!=="admin")
        // throw new Error("Not Authorized...");   
    let student=new Student({
                                _id:request.body._id,
                                email:request.body.email,
                                password:request.body.password
                            })
    student.save()
           .then(()=>{
               console.log("from create student response");
               response.status(200).json({message:"Student Created"});
           })
           .catch(error=>next(error))
}

module.exports.editStudent=(request,response,next)=>
{
    // if(request.role!=="admin")
    //     if(request.role!=="student")
    //         throw new Error("Not Authorized...");
    // if(Student.find({email:request.body.email})!==null)
    //     throw new Error("Email is doublicated,you can't use this email");
    // if(request.role=="admin")
    // {
        // if(request.body.password)
        //     throw new Error("Not Authorized...");
        Student.updateOne({_id:request.params.id},{
                                $set:{
                                    email:request.body.email,
                                }
                            })
                .then((data)=>{
                    if(data.matchedCount==0)
                        throw new Error("Student dosen't exists");
                    response.status(200).json({message:"Student Updated",data});
                })
                .catch(error=>next(error))
    // }
    // else 
    // {
    //     if(request._id!==request.body.id)
    //         throw new Error("Not Authorized...");
    //     Student.updateOne({_id:request.body.id},{
    //                             $set:{
    //                                 email:request.body.email,
    //                                 password:request.body.password
    //                             }
    //                         })
    //             .then((data)=>{
    //                 if(data.matchedCount==0)
    //                     throw new Error("Student dosen't exists");
    //                 response.status(200).json({message:"Student Updated",data});
    //             })
    //             .catch(error=>next(error))
    // }
}

module.exports.deleteStudent=(request,response,next)=>
{
    // if(request.role!=="admin")
    //     if(request.role!=="student")//&&request._id!==request.body.id)
    //         throw new Error("Not Authorized...");

    // if(request._id!==request.body.id)
    //     throw new Error("Not Authorized...");
        
    Student.deleteOne({_id:request.params.id})
           .then(data=>{
               response.status(200).json({message:"Student Deleted"});
           })
           .catch(error=>next(error))
}
