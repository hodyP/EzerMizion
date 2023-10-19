const db = require('../models/index')
const city = db.city

class cityDataAccessor
{
    getAllcities= async()=>{
        const citys = await city.findAll({})  
        if (!citys?.length) {           
            return {status:400,result:{message:'No city found'}};
        }        
        return {status:201,result:citys}
    }
}
const cityDataAccessor=new cityDataAccessor();
module.exports=cityDataAccessor;