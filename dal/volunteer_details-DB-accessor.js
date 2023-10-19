const db = require('../models/index')
const Volunteer_details = db.volunteer_details


class Volunteer_detailsDataAccessor
{  
    createVolunteer_details=async(values)=>{
        const {volunteerId,type_of_valunteerId}=values;
        
        console.log(volunteerId,type_of_valunteerId);

        if (!volunteerId||!type_of_valunteerId) {
            return res.status(400).json({ message: 'some field is required' })
        }
        const volunteer_details = await Volunteer_details.create({
            volunteerId,type_of_valunteerId});
        if (volunteer_details) {
            return res.status(201).json({volunteer_details})
        } 
        else {
            return res.status(400).json({ message:'Invalid volunteer_details data received' });
        }
    } 

    updateVolunteer_details=async(id,values) =>{
        const {volunteerId,day,partInDayId} = values;

        if (!volunteerId||!day||!partInDayId) {
            return {status:400,result:{ message:'some field is required'}};
        }
        const volunteer_details = await Volunteer_details.update({
            volunteerId,day,partInDayId},{where:{id:id}});
            console.log(volunteer_details);
        if (volunteer_details) {
            return {status:201,result:{ volunteer_details}};
        } 
        else {
            return {status:400,result:{ message:'Invalid Volunteer_details data received'}};
        }
    } 

    deleteVolunteer_details=async(id) =>{
        if (!id) {
            return {status:400,result:{ message:'Volunteer_details ID required'}};
        }      
        await Volunteer_details.destroy({
            where: {
              id: id
            }
        });
        return {status:201,result:{ message:`Volunteer_details  with ID ${id} deleted`}};
    } 

    getAllVolunteer_detailsById=async(volunteerId) =>{
        const citys = await city.findAll({where:{volunteerId:volunteerId}})  
        if (!citys?.length) {           
            return {status:400,result:{message:'No Volunteer_details found'}};
        }        
        return {status:201,result:citys}
    }
}
const volunteer_detailsDataAccessor=new Volunteer_detailsDataAccessor();
module.exports=volunteer_detailsDataAccessor;