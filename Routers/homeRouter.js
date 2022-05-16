
const express=require("express");

const controller=require("./../Controllers/homeController");

const router=express.Router();

router.route("/")
.get(controller.homeResponse);

module.exports=router;