const express=require("express");
let router=express.Router();

const controller=require("./../Controllers/studentController");
const authMW=require("./../MiddleWares/authMiddleWare");

// router.use(authMW);

router.route("/students/:id")
.get(authMW, controller.getStudent)
.put(authMW, controller.editStudent)
.delete(authMW, controller.deleteStudent)

router.route("/students")
.get(authMW, controller.getAllStudents)
.post(authMW, controller.createStudent)
// .put(controller.editStudent)
// .delete(controller.deleteStudent)

module.exports=router;
