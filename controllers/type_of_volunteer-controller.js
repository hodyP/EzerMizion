const type_of_volunteerData= require("../dal/type_of_volunteer-DB-accessor");
class type_of_volunteerController{
    getAllType_of_volunteer=async(req,res)=>{
        const allTypesOfVolunteers=await type_of_volunteerData.getAllTypes_of_volunteer();
        return res.status(allTypesOfVolunteers.status).json(allTypesOfVolunteers.result); 
    }
    createType_of_volunteer=async(req,res)=>{
        const typeOfVolunteer=await type_of_volunteerData.create_Type_of_volunteer(req.body);
        return res.status(typeOfVolunteer.status).json(typeOfVolunteer.result)
    }
}

const type_of_volunteer=new type_of_volunteerController();
module.exports=type_of_volunteer;