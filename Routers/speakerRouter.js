const express=require("express");
let router=express.Router();

const controller=require("./../Controllers/speakerController");
const authMW=require("./../MiddleWares/authMiddleWare");

// router.use(authMW);

router.route("/speakers/:id")
.get(controller.getSpeaker)
.put(controller.editSpeaker)
.delete(controller.deleteSpeaker)

router.route("/speakers")
.get(controller.getAllSpeakers)
.post(controller.createSpeaker)
// .put(controller.editSpeaker)
// .delete(controller.deleteSpeaker)

module.exports=router;

