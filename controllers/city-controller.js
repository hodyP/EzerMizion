const cityData = require("../dal/city-DB-accessor");

class CityColntroller{
    getAllcities=async(req,res)=>{
        const cities=await cityData.getAllcities();
        return res.status(cities.status).json(cities.result); 
    }
    createCity=async(req,res)=>{
        const city=await cityData.createCity(req.body);
        return res.status(city.status).json(city.result); 
    }
}

const city=new CityColntroller();
module.exports=city;