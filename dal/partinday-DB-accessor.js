const db = require('../models/index')
const partInDay = db.partInDay

class partInDayDataAccessor
{
    getAllPartInDay= async()=>{
        const partInDays = await partInDay.findAll({})  
        if (!partInDays?.length) {           
            return {status:400,result:{message:'No partInDay found'}};
        }        
        return {status:201,result:partInDays}
    }
}
const partInDayDataAccessor=new partInDayDataAccessor();
module.exports=partInDayDataAccessor;