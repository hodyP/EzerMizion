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

    deleteVolunteer=async(req,res)=>{
        const arr=req.body.arr;
        const volunteer=await volunteerData.deleteVolunteer(arr);
        return res.status(volunteer.status).json(volunteer.result);    
    }

    createVolunteer=async(req,res)=>{     
        const volunteer=await volunteerData.createVolunteer(req.body);
        return res.status(volunteer.status).json(volunteer.result);
    }

    updateVolunteer=async(req,res)=>{
        const volunteer= await volunteerData.updateVolunteer(req);
        console.log(volunteer);
        return res.status(volunteer.status).json(volunteer.result);
    } 
    updateVolunteerToUnActive=async(req,res)=>{
        //יש ליישם אם יש בקשות שאין להם enddate אין לעדכן כלא פעילה.
        const volunteer =await volunteerData.updateVolunteerToUnActive(req);
        return res.status(volunteer.status).json(volunteer.result);
    }   
    getVolunteersByCondition=async(req,res)=>{
        const id = req.params.id;
        const city = req.params.city;
        const neighborhood = req.params.neighborhood; 
        const type = req.params.type;
        const day = req.params.day;
        const partInDay = req.params.partInDay;
        try{
              const volunteers=await volunteerData.getVolunteersByCondition(id,city,neighborhood,type,day,partInDay);
        return res.status(volunteers.status).json(volunteers.result); 

        }catch(ex)
        {
            console.log(ex);
            return res.status(500).json(ex);
        }
          }  
}

const volunteer=new VolunteerColntroller();
module.exports=volunteer;