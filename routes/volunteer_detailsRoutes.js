const express = require("express");
const volunteer_detailsController = require("../controllers/volunteer_details-controller");
const volunteer_detailsRouter = express.Router();

volunteer_detailsRouter.route("/")
    .post(volunteer_detailsController.createVolunteer_details)
   
volunteer_detailsRouter.route("/:id")  
   /// .put(volunteer_detailsController.updateVolunteer_details)
    .delete(volunteer_detailsController.deleteVolunteer_details)
    
volunteer_detailsRouter.route("/volunteer/:id")
    .get(volunteer_detailsController. getAllVolunteer_detailsByVolunteerId)
    .put(volunteer_detailsController. updateVolunteer_details)
module.exports=volunteer_detailsRouter;