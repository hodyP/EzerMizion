const db = require('../models/index')
const type_of_volunteer = db.type_of_volunteer

class type_of_volunteerDataAccessor
{
    getAllType_of_volunteer= async()=>{
        const type_of_volunteers = await type_of_volunteer.findAll({})  
        if (!type_of_volunteers?.length) {           
            return {status:400,result:{message:'No type_of_volunteer found'}};
        }        
        return {status:201,result:type_of_volunteers}
    }
}
const type_of_volunteerDataAccessor=new type_of_volunteerDataAccessor();
module.exports=type_of_volunteerDataAccessor;