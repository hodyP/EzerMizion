const express = require("express");
const volunteer_timerController = require("../controllers/volunteer_timer-controller");
const volunteer_timerRouter = express.Router();

volunteer_timerRouter.route("/")
    .post(volunteer_timerController.createVolunteer_timer) 

volunteer_timerRouter.route("/:id")  
    .put(volunteer_timerController.updateVolunteer_timer)
    .delete(volunteer_timerController.deleteVolunteer_timer)
    
volunteer_timerRouter.route("/:volunteerId")
    .get(volunteer_timerController.getAllVolunteer_timerByVolunteerId)

module.exports=volunteer_timerRouter;