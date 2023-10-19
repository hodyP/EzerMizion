const volunteer_detailsData = require("../dal/volunteer_details-DB-accessor");
class Volunteer_detailsController{

    createVolunteer_details=async(req,res)=>{
        const volunteer_details=await volunteer_detailsData.createVolunteer_details(req.body);
        return res.status(volunteer_details.status).json(volunteer_details.result);
    }
    
    getAllVolunteer_detailsByVolunteerId=async(req,res)=>{
        const volunteerId=req.params.volunteerId;
        await volunteer_detailsData.getAllVolunteer_detailsById(volunteerId);
    }

    updateVolunteer_details=async(req,res)=>{
        const values=req.body;
        const id=req.params.id;
        const volunteer_details=await volunteer_detailsData.updateVolunteer_details(id,values);
        return res.status(volunteer_details.status).json(volunteer_details.result);
    }
    deleteVolunteer_details=async(req,res)=>{
        const id=req.params.id;
        const volunteer_details=await volunteer_detailsData.deleteVolunteer_details(id);
        return res.status(volunteer_details.status).json(volunteer_details.result);
    } 
}

const volunteer_details=new Volunteer_detailsController();
module.exports=volunteer_details;