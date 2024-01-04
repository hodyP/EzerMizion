const express = require("express");
const needyController = require("../controllers/needy-controller");
const needyRouter = express.Router();

needyRouter.route("/")
    .get(needyController.getAllNeedys)
    .post(needyController.createNeedy)
   
needyRouter.route("/:id")
    .get(needyController.getOneNeedy)
    .patch(needyController.updateNeedy)
 
needyRouter.route("/follow_up")
    .get(needyController.getNeedyForFollowUp)

module.exports=needyRouter;