const express = require("express");
const type_of_volunteerController = require("../controllers/type_of_volunteer-controller");
const type_of_volunteerRouter = express.Router();

type_of_volunteerRouter.route("/")
    .get(type_of_volunteerController.getAllType_of_volunteer)
    
module.exports=type_of_volunteerRouter;