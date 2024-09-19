const express = require("express");
const needyController = require("../controllers/needy-controller");
const needyRouter = express.Router();
const volunteerController=require("../controllers/volunteer-controller");

needyRouter.route("/")
    .get(needyController.getAllNeedys)
    .post(needyController.createNeedy)
    .delete(needyController.deleteNeedy)
    
needyRouter.route("/followUp")
    .get(needyController.getNeedyForFollowUp)
    .post(needyController.updateForFollowUp)
   
needyRouter.route("/:id")
    .get(needyController.getOneNeedy)
    .patch(needyController.updateNeedy)


needyRouter.route("/:id/shibuz/:id/:city/:neighborhood/:type/:day/:partInDay")
    .get(volunteerController.getVolunteersByCondition)

module.exports=needyRouter;