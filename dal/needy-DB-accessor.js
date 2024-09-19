const db = require('../models/index')
const Needy = db.needy
const City=db.city
const NeedyRequest=db.needy_requests
const { Op } = require('sequelize'); 


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
                { model: City, as: 'cityAndneedy', attributes:["id",'name']}           
            ]  ,
            where:{id:id}})
        if(needy)
            return {status:201,result:{needy}};
        return {status:400,result:{message:'No needy found'}};    
    } 

    deleteNeedy=async(arr)=>{
            console.log(arr);
          
            if (arr.length === 0) {
              return { status: 201, result: { message: 'המערך ריק, אין מזהים למחיקה.' } };
            }
          
            try {
              await NeedyRequest.destroy({
                where: {
                  needyId: {
                    [Op.in]: arr, 
                  },
                },
              });
          
              const result = await Needy.destroy({
                where: {
                  id: {
                    [Op.in]: arr,
                  },
                },
              });
          
              if (result > 0) {
                return { status: 201, result: { message: 'הרשומות נמחקו בהצלחה.' } };
              }
          
              return { status: 400, result: { message: `לא נמחקו שום רשומות עבור המזהים ${arr}` } };
            } catch (error) {
              console.error('שגיאה במחיקת הרשומות:', error);
              return { status: 400, result: { error: 'שגיאה בלתי צפויה במחיקת הרשומות.' } };
            }   
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
    
    getNeedyForFollowUp= async()=>{
        const neediesToUpdate = await Needy.findAll({
          where: {
            last_time_updated: {
              [db.op.lte]: db.sequelize.literal(`DATE_SUB(CURDATE(), INTERVAL remaind_time DAY)`)
            }
          }
        });
    }
    getNeedyForFollowUp= async()=>{
        const neediesToUpdate = await Needy.findAll({
          where: {
            last_time_updated: {
              [db.op.lte]: db.sequelize.literal(`DATE_SUB(CURDATE(), INTERVAL remaind_time DAY)`)
            }
          }
        });
       if(neediesToUpdate)
        return neediesToUpdate;
    return (null)
    }

    updateForFollowUp= async(id)=>{
        console.log(id);
        const date1=new Date();
        const needy = await Needy.update({
           last_time_updated:date1},{where:{id:id}});
            console.log(needy);
            if (needy) {
                return {status:201,result:needy};
            } 
            else {
                return {status:400,result:{message:'Invalid needy data received'}};      
            }
        };

        updateNeedy=async(req) =>{
            const {first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
                remaind_time,description,last_time_updated} =req.body;
      
            if (!first_name||!last_name||!phone||
                !cityId||!neighborhood||!street||!
                remaind_time) {
                return {status:400,result:{message:'All fields are required'}};
            }
            const needy = await Needy.update({
                first_name,last_name,phone,phone_2,mail,cityId,neighborhood,street,
                remaind_time,description},{where:{id:req.params.id}});
                console.log(needy);
            if (needy) {
                return {status:201,result:needy};
            } 
            else {
                return {status:300,result:{message:'Invalid needy data received'}};      
            }
        } 
    }


const needyDataAccessor=new NeedyDataAccessor();
module.exports=needyDataAccessor;