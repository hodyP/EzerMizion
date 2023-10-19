const type_of_volunteerData = require("../dal/type_of_volunteer-DB-accessor");

class type_of_volunteerColntroller{
    getAllType_of_volunteer=async(req,res)=>{
        const cities=await type_of_volunteerData.getAllType_of_volunteer();
        return res.status(cities.status).json(cities.result); 
    }
}

const type_of_volunteer=new type_of_volunteerColntroller();
module.exports=type_of_volunteer;