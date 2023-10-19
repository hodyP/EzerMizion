const cityData = require("../dal/city-DB-accessor");

class cityColntroller{
    getAllcities=async(req,res)=>{
        const cities=await cityData.getAllcities();
        return res.status(cities.status).json(cities.result); 
    }
}

const city=new cityColntroller();
module.exports=city;