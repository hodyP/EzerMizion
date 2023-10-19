const express = require("express");
const volunteerController = require("../controllers/volunteer-controller");
const volunteerRouter = express.Router();

volunteerRouter.route("/")
    .get(volunteerController.getAllVolunteers)
    .post(volunteerController.createVolunteer)
   
volunteerRouter.route("/:id")
    .get(volunteerController.getOneVolunteer)
    .patch(volunteerController.updateVolunteer)

// volunteerRouter.route("/:type/:day/:parInDay/:city")
//     .get(volunteerController.getVolunteerByCondition)
    
module.exports=volunteerRouter;
