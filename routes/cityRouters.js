const express = require("express");
const cityController = require("../controllers/city-controller");
const cityRouter = express.Router();

cityRouter.route("/")
    .get(cityController.getAllcities)
    
module.exports=cityRouter;