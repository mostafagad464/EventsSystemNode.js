const express=require("express");
let router=express.Router();

const controller=require("./../Controllers/eventController");
const authMW=require("./../MiddleWares/authMiddleWare");

// router.use(authMW);

router.route("/events/:id")
.get(controller.getEvent)
.put(authMW, controller.editEvent)
.delete(authMW, controller.deleteEvent)

router.route("/events")
.get(controller.getAllEvents)
.post(authMW, controller.createEvent)
// .put(controller.editEvent)
// .delete(controller.deleteEvent)

module.exports=router;

