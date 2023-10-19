const express=require('express');
const needy_requetController=require('../controllers/needy_request-controller');
const needy_requetRouter=express.Router();

needy_requetRouter.route('/')
    .post(needy_requetController.updateNeedyRequest)
    .get(needy_requetController.getAllRequestMachedAndNotApproved)

needy_requetRouter.route('/:id')
    .get(needy_requetController.getNeedy_requetById)
    .put(needy_requetController.updateNeedyRequest)
    .delete(needy_requetController.deleteNeedyRequest)

needy_requetRouter.route('volunteer/:id')
    .get(needy_requetController.getAllNeedyRequestForVolunteerId)
        
needy_requetRouter.route('needy/:id')
    .get(needy_requetController.getAllNeedyRequestForNeedyId)

// needy_requetRouter.put('/inlay',inlayNeedy_requet)

module.exports=needy_requetRouter