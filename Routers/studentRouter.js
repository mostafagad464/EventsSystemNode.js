const express=require("express");
let router=express.Router();

const controller=require("./../Controllers/studentController");
const authMW=require("./../MiddleWares/authMiddleWare");

router.route("/students/:id")
.get(controller.getStudent)
.put(controller.editStudent)
.delete(controller.deleteStudent)
// router.use(authMW);

router.route("/students")
.get(controller.getAllStudents)
.post(controller.createStudent)
// .put(controller.editStudent)
// .delete(controller.deleteStudent)

module.exports=router;
