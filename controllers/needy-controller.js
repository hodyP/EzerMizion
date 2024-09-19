const needyData = require("../dal/needy-DB-accessor");

class NeedyColntroller{
    getAllNeedys=async(req,res)=>{
        const needys=await needyData.getAllNeedys();
        return res.status(needys.status).json(needys.result); 
    }

    deleteNeedy=async(req,res)=>{
        const needys=await needyData.deleteNeedy(req.body.arr);
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
    updateForFollowUp=async(req,res)=>{
        const needy= await needyData.updateForFollowUp(req.body.id);
        return res.status(needy.status).json(needy.result);
    } 
    
    getNeedyForFollowUp=async(req,res)=>{
        try {
            
            const needy= await needyData.getNeedyForFollowUp();
            // if (!needy?.length) {           
            //     return res.status(200).json(null);
            // }  
            return res.status(200).json(needy);

          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
    } 
}

const needy=new NeedyColntroller();
module.exports=needy;