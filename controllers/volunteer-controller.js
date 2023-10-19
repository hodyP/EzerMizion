const volunteerData = require("../dal/volunteer-DB-accessor");
const volunteer_detailsData = require("../dal/volunteer_details-DB-accessor");
const volunteer_timerData=require("../dal/volunteer_timer-DB-accessor");

class VolunteerColntroller{
    getAllVolunteers=async(req,res)=>{
        const volunteers=await volunteerData.getAllVolunteers();
        return res.status(volunteers.status).json(volunteers.result); 
    }

    getOneVolunteer=async(req,res)=>{
        const id=req.params.id;
        const volunteer=await volunteerData.getOneVolunteer(id);
        return res.status(volunteer.status).json(volunteer.result);    
    }

    createVolunteer=async(req,res)=>{     
        const volunteer=await volunteerData.createVolunteer(req.body);
        return res.status(volunteer.status).json(volunteer.result);
    }

    updateVolunteer=async(req,res)=>{
        const volunteer= await volunteerData.updateVolunteer(req.body);
        return res.status(volunteer.status).json(volunteer.result);
    }      
}

const volunteer=new VolunteerColntroller();
module.exports=volunteer;