const needyData = require("../dal/needy-DB-accessor");

class NeedyColntroller{
    getAllNeedys=async(req,res)=>{
        const needys=await needyData.getAllNeedys();
        return res.status(needys.status).json(needys.result); 
    }

    getOneNeedy=async(req,res)=>{
        const needy=await needyData.getOneNeedy(req.params.id);
        return res.status(needy.status).json(needy.result);    
    }

    createNeedy=async(req,res)=>{
        const needy=await needyData.createNeedy(req.body);
        return res.status(needy.status).json(needy.result);
    }
    updateNeedy=async(req,res)=>{
        const needy= await needyData.updateNeedy(req);
        return res.status(needy.status).json(needy.result);
    } 
    
    getNeedyForFollowUp=async(req,res)=>{
        const needy= await needyData.getNeedyForFollowUp(req.body);
        return res.status(needy.status).json(needy.result);
    } 
}

const needy=new NeedyColntroller();
module.exports=needy;