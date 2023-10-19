const volunteer_timerData = require("../dal/volunteer_timer-DB-accessor");
class Volunteer_timerController{
    
    createVolunteer_timer=async(req,res)=>{
       
        const volunteer_timer=await volunteer_timerData.createVolunteer_timer(req.body);
        return res.status(volunteer_timer.status).json(volunteer_timer.result);
    }

    getAllVolunteer_timerByVolunteerId=async(req,res)=>{
        const volunteerId=req.params.volunteerId;
        await volunteer_timerData.getAllVolunteer_timerById(volunteerId);
    }

    updateVolunteer_timer=async(req,res)=>{
        const values=req.body;
        const id=req.params.id;
        const volunteer_timer=await volunteer_timerData.updateVolunteer_timer(id,values);
        return res.status(volunteer_timer.status).json(volunteer_timer.result);
    }
    deleteVolunteer_timer=async(req,res)=>{
        const id=req.params.id;
        const volunteer_timer=await volunteer_timerData.deleteVolunteer_timer(id);
        return res.status(volunteer_timer.status).json(volunteer_timer.result);
    } 
}

const volunteer_timer=new Volunteer_timerController();
module.exports=volunteer_timer;