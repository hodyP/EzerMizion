const db = require('../models/index')
const Volunteer_details = db.volunteer_details


class Volunteer_detailsDataAccessor
{  
    createVolunteer_details=async(values)=>{
        const {volunteerId,type_of_volunteerId}=values;
        
        console.log(volunteerId,type_of_volunteerId);

        if (!volunteerId||!type_of_volunteerId) {
            return res.status(400).json({ message: 'some field is required' })
        }
        const volunteer_details = await Volunteer_details.create({
            volunteerId,type_of_volunteerId});
        if (volunteer_details) {
            return {status:201,result:volunteer_details}
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
        const volunteer_details = await Volunteer_details.findAll({where:{volunteerId:volunteerId}})  
        if (!volunteer_details?.length) {           
            return {status:400,result:{message:'No Volunteer_details found'}};
        }        
        return {status:201,result:volunteer_details}
    }
}
const volunteer_detailsDataAccessor=new Volunteer_detailsDataAccessor();
module.exports=volunteer_detailsDataAccessor;