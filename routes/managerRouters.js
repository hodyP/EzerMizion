const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const managerController = require("../controllers/manager-controller")
const managerRouter = express.Router()

managerRouter.route("/register")
  .post( managerController.register);

managerRouter.route("/login")
  .post( managerController.login);

module.exports = managerRouter