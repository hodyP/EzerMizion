const db = require('../models/index')
const NeedyRequest = db.needy_requests
const Volunteer_timer = db.volunteer_timer

class NeedyRequestDataAccessor
{    
    createNeedyRequest=async(values)=>{
        const {day,type_of_valunteerId,part_in_dayId,needyId}=values;
        if (!day||!type_of_valunteerId||!part_in_dayId||!needyId) {          
            return {status:400,result:{message: 'some field is required'}};
        }
        const needy_request = await NeedyRequest.create({
            day,type_of_valunteerId,part_in_dayId,needyId});
        if (needy_request) 
        {
            return {status:201,result:needy_request};
        } 
        else {
            return {status:400,result:{ message:'Invalid needy_request data received'}};         
        }
    } 

    updateNeedyRequest=async(values) =>{
        const {day,type_of_valunteerId,part_in_dayId,volunteerId,needyId,start_date,end_date,is_approved} =values;

        if (!day||!type_of_valunteerId||!part_in_dayId||!needyId||!start_date) {
            return {status:400,result:{message:'All fields are required'}};
        }
        const needy_request = await NeedyRequest.update({
            day,type_of_valunteerId,part_in_dayId,volunteerId,needyId,start_date,
            end_date,is_approved},{where:{id:values.id}});
            console.log(needy_request);
        if (needy_request) {
            return {status:201,result:needy_request};
        } 
        else {
            return {status:400,result:{message:'Invalid needy_request data received'}};      
        }
    } 

    getNeedy_requetById=async(id)=>{
        const needyRequest = await NeedyRequest.findOne({where:{id:id}})
        if(needyRequest)
            return {status:201,result:{needyRequest}};
        return {status:400,result:{message:'No NeedyRequest found'}};
    }

    deleteNeedyRequest=async(id)=>{
        if (!id) {
            return res.status(400).json({ message: 'NeedyRequest ID required' })
        }
        await NeedyRequest.destroy({where: {id: id}});
            return {status:201,result:{message:`values  with ID ${id} deleted`}}
    }
    AllneedyRequestByNeedy=async(needyId)=>{

    const needyRequests = await NeedyRequest.findAll({where:{needyId:needyId,end_date:null}})

    if (!needyRequests?.length) {
        return {status:400,result:{message:'No needyRequests found'}}
    }
    return {status:201,result:needyRequests}
    }

    AllneedyRequestByVolunteer=async(volunteerId)=>{

        const needyRequests = await NeedyRequest.findAll({where:{volunteerId:volunteerId,end_date:null}})   
        if (!needyRequests?.length) {
            return {status:400,result:{message:'No needyRequests found'}}
        }
        return {status:201,result:needyRequests}
        }

    AllRequestMachedAndNotApproved=async()=>{

        const needyRequests = await NeedyRequest.findAll({where:{is_approved:false,volunteerId:{[Op.not]: null}}})
    
        if (!needyRequests?.length) {
            return {status:400,result:{message:'No needyRequests found'}}
        }
        return {status:201,result:needyRequests}

        }

    inlayNeedy_requet=async(body)=>{
        const {id,volunteerId,start_date}=body;
        if (!id||!volunteerId) {
            return {status:400,result:{message:'All fields are required'}};
        }
        const foundNeedyRequest = await NeedyRequest.findOne({where:{id:id}})
        if(!needyRequest)
            return {status:400,result:{message:'No needyRequest found'}};

        const foundVolunteer_timer=Volunteer_timer.findOne({where:{volunteerId:volunteerId,
            day:foundNeedyRequest.day,partInDayId:foundNeedyRequest.part_in_dayId,is_matched:false}});
        
        if(!foundVolunteer_timer)
            return {status:400,result:{message:'Not foundVolunteer_timer'}};
            
        const needyRequest = await NeedyRequest.update({volunteerId,start_date},{where:{id:id}})
        if(!needyRequest)
            return {status:400,result:{message:'Invalid needy_request data received'}};
        
        const volunteer_timer = await Volunteer_timer.update({is_matched:true},{where:{id:foundVolunteer_timer.id}})
        if(!volunteer_timer)
        {
            await NeedyRequest.update({volunteerId:null,start_date:null},{where:{id:id}});
            return {status:400,result:{message:'Invalid volunteer_timer data received',object:volunteer_timer}};
         }   
            return {status:201,result:{needyRequest}};
}}
const needyRequestDataAccessor=new NeedyRequestDataAccessor();
module.exports=needyRequestDataAccessor;