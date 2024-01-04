const db = require('../models/index')
const City = db.city

class CityDataAccessor
{
    getAllcities= async()=>{
        const citys = await City.findAll({})  
        if (!citys?.length) {           
            return {status:400,result:{message:'No city found'}};
        }        
        return {status:201,result:citys}
    }
    createCity=async(values)=>{
        const {name}=values;
        console.log(name);
        if (!name) {
                return {status:400,result:{message:'field name is required'}};           
        }
        const city = await City.create({
            name});
        if (city) {
            return {status:201,result:city};
        } 
        else {
            return {status:400,result:{message:'Invalid city data received'}};           
        }
    }
}
const cityDataAccessor=new CityDataAccessor();
module.exports=cityDataAccessor;