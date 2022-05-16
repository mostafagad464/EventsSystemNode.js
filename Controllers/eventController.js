

// const { request } = require("express");
const { response } = require("express");
const { request } = require("express");
const { path } = require("express/lib/application");
const Event=require("./../Models/eventModel");

module.exports.getAllEvents=(request,response,next)=>
{
    let count;
    Event.count({},function(err,count){
        this.count = count;
        console.log("Event count is: ", count )
    });

    // if(request.role==="admin")
    // {
        console.log(count);

        Event.find({}).populate({path:"mainSpeaker"}).populate({path:"otherSpeakers"}).populate({path:"students"})
                .then((data)=>{
                    response.status(200).json(data);
                })
                .catch(error=>next(error))
    // }
    /*
    else if(request.role==="student")
    {
        // console.log(request._id);
        Event.find({students:request._id}).populate({path:"mainSpeaker"}).populate({path:"otherSpeakers"}).populate({path:"students"})
        .then((data)=>{
            response.status(200).json({data});
        })
        .catch(error=>next(error))
    }

    else if(request.role==="speaker")
    {
        Event.find({otherSpeakers:request._id}).populate({path:"mainSpeaker"}).populate({path:"otherSpeakers"}).populate({path:"students"})
        .then((data)=>{
            if(data)
                response.status(200).json({data});
                else
                {
                    Event.find({mainSpeaker:request._id}).populate({path:"mainSpeaker"}).populate({path:"otherSpeakers"}).populate({path:"students"})
                        .then((data)=>{
                            if(data)
                                response.status(200).json({data});
                        })
                        .catch(error=>next(error))
                }
        })
        .catch(error=>next(error))
        // Look agian, need enhancemant.
    }
    */
}

module.exports.getEvent=(request,response,next)=>
{
    Event.findOne({_id:request.params.id}).populate({path:"mainSpeaker"}).populate({path:"otherSpeakers"}).populate({path:"students"})
                .then((data)=>{
                    response.status(200).json(data);
                })
                .catch(error=>next(error))
}

module.exports.createEvent=(request,response,next)=>
{
    // if(request.role!=="admin")
    //     throw new Error("Not Authorized...");
        
    let event=new Event({
        _id:request.body._id,
        title:request.body.title,
        event:request.body.event,
        mainSpeaker:request.body.mainSpeaker,
        otherSpeakers:request.body.otherSpeakers,
        students:request.body.students
    })
    event.save()
           .then(()=>{
               response.status(200).json({message:"Event Created"});
           })
           .catch(error=>next(error))
}

module.exports.editEvent=(request,response,next)=>
{
    // if(request.role!=="admin")
    //     if(request.role!=="speaker")
    //         throw new Error("Not Authorized...");

    // if(request.role==="speaker"&&(request.body.title||request.body.event||request.body.students))
    //     throw new Error("Not Authorized...");
    /*
    if(request.role==="speaker")
    {
        Event.updateOne({_id:request.body.id},{
            $set:{
                mainSpeaker:request.body.mainSpeaker,
                otherpeakers:request.body.otherpeakers,
            }
        })
                .then((data)=>{
                    if(data.matchedCount==0)
                        throw new Error("Event dosen't exists");
                    response.status(200).json({message:"Event Updated",data});
                })
                .catch(error=>next(error))
    }
    else
    */
    {

        Event.updateOne({_id:request.body.id},{
            $set:{
                title:request.body.title,
                event:request.body.event,
                mainSpeaker:request.body.mainSpeaker,
                otherpeakers:request.body.otherpeakers,
                students:request.body.students
            }
        })
                .then((data)=>{
                    if(data.matchedCount==0)
                        throw new Error("Event dosen't exists");
                    response.status(200).json({message:"Event Updated",data});
                })
                .catch(error=>next(error))
    }
}

module.exports.deleteEvent=(request,response,next)=>
{
    // if(request.role!=="admin")
    //     throw new Error("Not Authorized...");
    Event.deleteOne({_id:request.body.id})
           .then(data=>{
               response.status(200).json({message:"Event Deleted"});
           })
           .catch(error=>next(error))
}



// event.find({}).populate({path:"department"})