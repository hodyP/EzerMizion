const db = require('../models/index')
const Type_of_volunteer = db.type_of_volunteer

class Type_of_volunteerDataAccessor
{
    getAllTypes_of_volunteer= async()=>{
        const types_of_volunteers = await Type_of_volunteer.findAll({})  
        if (!types_of_volunteers?.length) {           
            return {status:400,result:{message:'No type_of_volunteer found'}};
        }        
        return {status:201,result:types_of_volunteers}
    }
    create_Type_of_volunteer=async(values)=>{
        const {name}=values;
        console.log(name);
        if (!name) {
                return {status:400,result:{message:'field name is required'}};           
        }
        const type_of_volunteer = await Type_of_volunteer.create({
            name});
        if (type_of_volunteer) {
            return {status:201,result:type_of_volunteer};
        } 
        else {
            return {status:400,result:{message:'Invalid type_of_volunteer data received'}};           
        }
    }
    
}
const type_of_volunteerDataAccessor=new Type_of_volunteerDataAccessor();
module.exports=type_of_volunteerDataAccessor;