const express=require('express');
const needy_requetController=require('../controllers/needy_request-controller');
const needy_requetRouter=express.Router();

needy_requetRouter.route('/')
    .post(needy_requetController.createneedyRequest)
    .get(needy_requetController.getAllRequestMachedAndNotApproved)
    
needy_requetRouter.route('/:id/shibuz')
    .post(needy_requetController.cancelShibuz)
    .put(needy_requetController.updateNeedyRequestForShibuz)
    // .delete(לחמוק שדות שקשורים לשיבוץ)

needy_requetRouter.route('/:id')
    .get(needy_requetController.getNeedy_requetById)
    .put(needy_requetController.updateNeedyRequest)
    .delete(needy_requetController.deleteNeedyRequest)
    .patch(needy_requetController.updateEndDate)
  
needy_requetRouter.route('/volunteer/:id/history')
    .get(needy_requetController.getAllNeedyRequestHistoryForVolunteerId)  

needy_requetRouter.route('/volunteer/:id')
    .get(needy_requetController.getAllNeedyRequestForVolunteerId)
   

needy_requetRouter.route('/needy/:id')
    .get(needy_requetController.getAllNeedyRequestForNeedyId)

    needy_requetRouter.route('/needy/:id/history')
    .get(needy_requetController.getAllNeedyRequestHistoryForNeedyId)  

  module.exports=needy_requetRouter