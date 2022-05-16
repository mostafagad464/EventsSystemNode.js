const express=require("express");
let router=express.Router();

const controller=require("./../Controllers/eventController");
const authMW=require("./../MiddleWares/authMiddleWare");

// router.use(authMW);

router.route("/events/:id")
.get(controller.getEvent)
.put(controller.editEvent)
.delete(controller.deleteEvent)

router.route("/events")
.get(controller.getAllEvents)
.post(controller.createEvent)
// .put(controller.editEvent)
// .delete(controller.deleteEvent)

module.exports=router;

