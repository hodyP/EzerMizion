const db = require('../models/index')
const Volunteer = db.volunteer
const City=db.city
const VolunteerTimer=db.volunteer_timer
const VolunteerDetails=db.VolunteerDetails
const NeedyRequest=db.needy_requests
class VolunteerDataAccessor
{
    getAllVolunteers= async()=>{
        const volunteers = await Volunteer.findAll({
            include : 
            [
                { model: City, as: 'city&volunteer', attributes:['name']},
                { model: VolunteerTimer, as: 'volunteer_timer&volunteer', attributes:['day','partInDayId','is_matched']}      
                ,{ model: NeedyRequest, as: 'needy_requests&volunteer'}
            ],                 
            where:{is_active:true}
    })  
  
        if (!volunteers?.length) {           
            return {status:400,result:{message:'No volunteers found'}};
        } 
    // const volunteerWithAll=await Promise.all(volunteers.map(async (volunteer)=>{
    //     if(volunteer.volunteer_timer_volunteer?.is_matched)
      
    // }))




        // const volunteerWithAll=await Promise.all(volunteers.map(async (volunteer)=>{
        //     volunteer.volunteer_timer&volunteer.day
        // const response=await Response.findOne({
            
        // })
        // }))
        // Add task to each action before sending the response 
    //     const actionsWithResponse = await Promise.all(actions.map(async (action) => {
    //     //const task = await Task.findById(action.task).lean().exec()
    //     const response = await Response.findOne({username:req.user,action:action._id}).select(["id", "body", "comments", "updatedAt"]).lean().exec()
    //     return { ...action, /*taskTitle: task?.title, taskBody:task?.body, toDate:task?.toDate, */ response }
    // }))

    // res.json(actionsWithResponse)
// }
       
        return {status:201,result:volunteers}
    }

    getOneVolunteer=async(id)=>{
        const volunteer = await Volunteer.findOne({include : 
            [
                { model: City, as: 'city&volunteer', attributes:['name']},
                { model: VolunteerTimer, as: 'volunteer_timer&volunteer', attributes:['day','partInDayId','is_matched']},
                { model: NeedyRequest, as: 'needy_requests&volunteer'}
            ],where:{id:id}})
        if(volunteer)
            return {status:201,result:{volunteer}};
        return {status:400,result:{message:'No volunteer found'}};
    } 

    createVolunteer=async(values)=>{
        const {first_name,last_name,phone,mail,cityId,neighborhood,street,
        identity_number,date_of_birth}=values;
        
        console.log(first_name,last_name,phone,mail,cityId,neighborhood,street,
            identity_number,date_of_birth);

        if (!first_name||!last_name||!phone||!mail||
            !cityId||!neighborhood||!street||!
            identity_number||!date_of_birth) {
                return {status:400,result:{message:'All fields are required'}};           
        }
        const volunteer = await Volunteer.create({
            first_name,last_name,phone,mail,
            cityId,neighborhood,street,
            identity_number,date_of_birth});
        if (volunteer) {
            return {status:201,result:volunteer};
        } 
        else {
            return {status:400,result:{message:'Invalid volunteer data received'}};           
        }
    } 

    updateVolunteer=async(values) =>{
        const {first_name,last_name,phone,mail,cityId,neighborhood,street,
            identity_number,date_of_birth} =values;

        if (!first_name||!last_name||!phone||!mail||
            !cityId||!neighborhood||!street||!
            identity_number||!date_of_birth) {
            return {status:400,result:{message:'All fields are required'}};
        }
        const volunteer = await Volunteer.update({
            first_name,last_name,phone,mail,
            cityId,neighborhood,street,
            identity_number,date_of_birth},{where:{id:req.params.id}});
            console.log(volunteer);
        if (volunteer) {
            return {status:201,result:volunteer};
        } 
        else {
            return {status:400,result:{message:'Invalid volunteer data received'}};      
        }
    }    
}

const volunteerDataAccessor=new VolunteerDataAccessor();
module.exports=volunteerDataAccessor;