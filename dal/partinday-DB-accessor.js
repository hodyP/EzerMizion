const db = require('../models/index')
const partInDay = db.partInDay

class PartInDayDataAccessor
{
    getAllPartInDay= async()=>{
        const partInDays = await partInDay.findAll({})  
        if (!partInDays?.length) {           
            return {status:400,result:{message:'No partInDay found'}};
        }        
        return {status:201,result:partInDays}
    }
}
const partInDayDataAccessor=new PartInDayDataAccessor();
module.exports=partInDayDataAccessor;