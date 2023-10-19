const express = require("express");
const volunteer_detailsController = require("../controllers/volunteer_details-controller");
const volunteer_detailsRouter = express.Router();

volunteer_detailsRouter.route("/")
    .post(volunteer_detailsController.createVolunteer_details)
   
volunteer_detailsRouter.route("/:id")  
    .put(volunteer_detailsController.updatevolunteer_details)
    .delete(volunteer_detailsController.deletevolunteer_details)
    
volunteer_detailsRouter.route("/:volunteerId")
    .get(volunteer_detailsController.getAllvolunteer_detailsByVolunteerId)
    
module.exports=volunteer_detailsRouter;