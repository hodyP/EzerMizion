const express = require("express");
const partInDayController = require("../controllers/partInDay-controller");
const partInDayRouter = express.Router();

partInDayRouter.route("/")
    .get(partInDayController.getAllPartInDay)
    
module.exports=partInDayRouter;