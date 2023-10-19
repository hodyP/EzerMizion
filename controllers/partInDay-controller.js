const partInDayData = require("../dal/partInDay-DB-accessor");

class partInDayColntroller{
    getAllPartInDay=async(req,res)=>{
        const partInDay=await partInDayData.getAllPartInDay();
        return res.status(partInDay.status).json(partInDay.result); 
    }
}

const partInDay=new partInDayColntroller();
module.exports=partInDay;