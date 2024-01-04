const db = require('../models/index')
const Needy = db.needy
const City=db.city
const NeedyRequest=db.needy_requests

class NeedyDataAccessor
{
    getAllNeedys= async()=>{
        const needys = await Needy.findAll({
            include : 
            [
                { model: City, as: 'cityAndneedy', attributes:['name']},
                { model: NeedyRequest, as: 'needy_requestsAndneedy'}             
            ]               
        })  
        if (!needys?.length) {           
            return {status:400,result:{message:'No needys found'}};
        }  
        const needysfix = needys.map((needy) => ({
            ...needy.dataValues,
            city: needy.cityAndneedy.name,
          }));     
        return {status:201,result:needysfix}
    }

    getOneNeedy=async(id)=>{
        const needy = await Needy.findOne({
            include : 
            [
                { model: City, as: 'cityAndneedy', attributes:['name']}           
            ]  ,
            where:{id:id}})
        if(needy)
            return {status:201,result:{needy}};
        return {status:400,result:{message:'No needy found'}};    
    } 

    createNeedy=async(values)=>{
        const {first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
            remaind_time,description,last_time_updated}=values;
        
 
        if (!first_name||!last_name||!phone||
            !cityId||!neighborhood||!street||!
            remaind_time) {
                return {status:400,result:{message:'All fields are required'}};
            
        }
        const needy = await Needy.create({
            first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
            remaind_time,description,last_time_updated});
        if (needy) {
            return {status:201,result:needy};
        } 
        else {
            return {status:400,result:{message:'Invalid needy data received'}};           
        }
    } 

    updateNeedy=async(req) =>{
        const {first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
            remaind_time,description,last_time_updated} =req.body;

        if (!first_name||!last_name||!phone||
            !cityId||!neighborhood||!street||!
            remaind_time||!last_time_updated) {
            return {status:400,result:{message:'All fields are required'}};
        }
        const needy = await Needy.update({
            first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
            remaind_time,description,last_time_updated},{where:{id:req.params.id}});
            console.log(needy);
        if (needy) {
            return {status:201,result:needy};
        } 
        else {
            return {status:400,result:{message:'Invalid needy data received'}};      
        }
    } 
    
    getNeedyForFollowUp= async()=>{
        const date=new Date().toLocaleDateString();
        const needys = await Needy.findAll({where:{last_time_updated}}) //////לתקן 
        if (!needys?.length) {           
            return {status:400,result:{message:'No needys found'}};
        }        
        return {status:201,result:needys}
    }
}

const needyDataAccessor=new NeedyDataAccessor();
module.exports=needyDataAccessor;