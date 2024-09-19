const express = require("express");
const volunteerController = require("../controllers/volunteer-controller");
const volunteerRouter = express.Router();

volunteerRouter.route("/")
    .get(volunteerController.getAllVolunteers)
    .post(volunteerController.createVolunteer)
    .delete(volunteerController.deleteVolunteer)
   
volunteerRouter.route("/:id")
    .get(volunteerController.getOneVolunteer)
    .patch(volunteerController.updateVolunteer)
volunteerRouter.route("/unactive/:id")
    .put(volunteerController.updateVolunteerToUnActive)
      
module.exports=volunteerRouter;
