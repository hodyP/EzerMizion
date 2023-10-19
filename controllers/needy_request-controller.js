const needyRequestData = require("../dal/needyRequest-DB-accessor");

class NeedyRequestController{
    createneedyRequest=async(req,res)=>{
        const needyRequest=await needyRequestData.createNeedyRequest(req.body);
        return res.status(needyRequest.status).json(needyRequest.result);
    }
    updateNeedyRequest=async(req,res)=>{
        
        const needyRequest=await needyRequestData.updateNeedyRequest(req.body);
        return res.status(needyRequest.status).json(needyRequest.result);
    }

    getNeedy_requetById=async(req,res)=>{ 
        const needyRequest=await needyRequestData.getNeedy_requetById(req.params.id);
        return res.status(needyRequest.status).json(needyRequest.result);
    }

    deleteNeedyRequest=async(req,res)=>{
        if(!(req.body.is_approved))
        {
            const needyRequest=await needyRequestData.deleteNeedyRequest(req.params.id);
            return res.status(needyRequest.status).json(needyRequest.result);
        }
        return res.status(400).json({message:'you must not delede matched needyRequeest'});
    }
    getAllNeedyRequestForNeedyId=async(req,res)=>{
        const needyId=req.body.needyId;
        const needyRequest=await needyRequestData.AllneedyRequestByNeedy(needyId);
            return res.status(needyRequest.status).json(needyRequest.result);
        }
    getAllNeedyRequestForVolunteerId=async(req,res)=>{
        const volunteerId=req.body.volunteerId;    
        const needyRequest=await needyRequestData.AllneedyRequestByVolunteer(volunteerId);
            return res.status(needyRequest.status).json(needyRequest.result);
        } 
    getAllRequestMachedAndNotApproved=async(req,res)=>{
            
        const needyRequest=await needyRequestData.AllRequestMachedAndNotApproved();
            return res.status(needyRequest.status).json(needyRequest.result);
        } 

    inlayNeedy_requet=async(req,res)=>{
            
        const needyRequest=await needyRequestData.inlayNeedy_requet(req.body);
            return res.status(needyRequest.status).json(needyRequest.result);
        } 
}
const needyRequest=new NeedyRequestController();
module.exports=needyRequest;
