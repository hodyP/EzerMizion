const db = require('../models/index')
const Volunteer = db.volunteer
const City=db.city
const VolunteerTimer=db.volunteer_timer
const VolunteerDetails=db.volunteer_details
const NeedyRequest=db.needy_requests
const TypeOfVolunteer=db.type_of_volunteer;

const { Op } = require('sequelize'); 


class VolunteerDataAccessor
{
    getAllVolunteers= async()=>{
        try{
        const volunteers = await Volunteer.findAll({
            include : 
            [
                { model: City, as: 'cityAndvolunteer', attributes:['name']},
                {model:VolunteerDetails,as:'volunteer_detailsAndvolunteer',
                include: [{ model: TypeOfVolunteer, as: 'volunteer_detailsAndtype_of_volunteer', attributes: ['name'] }] },
                { model: VolunteerTimer, as: 'volunteer_timerAndvolunteer', attributes:['day','partInDayId','is_matched']},     
                { model: NeedyRequest, as: 'needy_requestsAndvolunteer'}
            ],                 
            where:{is_active:true}
    })  
        if (!volunteers?.length) {           
            return {status:400,result:{message:'No volunteers found'}};
        }   
        console.log(volunteers); 
        console.log("uyyyyyyyyyyyyy");
     console.log(volunteers[0].volunteer_detailsAndvolunteer);
        const transformedVolunteers = volunteers.map((volunteer) => ({
            id: volunteer.id,
            first_name: volunteer.first_name,
            last_name: volunteer.last_name,
            phone: volunteer.phone,
            mail: volunteer.mail,
            cityId: volunteer.cityId,
            neighborhood: volunteer.neighborhood,
            street: volunteer.street,
            identity_number: volunteer.identity_number,
            is_active: volunteer.is_active,
            date_of_birth: volunteer.date_of_birth,
            city: volunteer.cityAndvolunteer.name,
            volunteer_details: volunteer.volunteer_detailsAndvolunteer
                ? volunteer.volunteer_detailsAndvolunteer.map((details) => ({
                    type_of_volunteer: details.type_of_volunteer?.name || null,
                    }))
                : [], 
            volunteer_timer: volunteer.volunteer_timerAndvolunteer.map((timer) => ({
              day: timer.day,
              partInDayId: timer.partInDayId,
              is_matched: timer.is_matched,
              needyrequest: volunteer.needy_requestsAndvolunteer.find((request) =>
                request.volunteerId === volunteer.id &&
                request.day === timer.day &&
                request.part_in_dayId === timer.partInDayId
              )
            }))
          }));
        return {status:201,result:transformedVolunteers}}
        catch(err)
        {
            console.log(err);
        }
    }

     getOneVolunteer = async (id) => {
        try {
          const volunteer = await Volunteer.findOne({
            include: [
              {
                model: City,
                as: 'cityAndvolunteer',
                attributes: ['name'],
              },
              {
                model: VolunteerDetails,
                as: 'volunteer_detailsAndvolunteer',
                include: [
                  {
                    model: TypeOfVolunteer,
                    as: 'volunteer_detailsAndtype_of_volunteer',
                    attributes: ['name',"id"],
                  },
                ],
              },
              {
                model: VolunteerTimer,
                as: 'volunteer_timerAndvolunteer',
                attributes: ['day', 'partInDayId', 'is_matched'],
              },
              {
                model: NeedyRequest,
                as: 'needy_requestsAndvolunteer',
                attributes: ['day', 'type_of_volunteerId'],
              },
            ],
            where: { id: id },
          });
      
          if (volunteer) {
            const transformedVolunteer = {
              id: volunteer.id,
              first_name: volunteer.first_name,
              last_name: volunteer.last_name,
              phone: volunteer.phone,
              mail: volunteer.mail,
              cityId: volunteer.cityId,
              neighborhood: volunteer.neighborhood,
              street: volunteer.street,
              identity_number: volunteer.identity_number,
              is_active: volunteer.is_active,
              date_of_birth: volunteer.date_of_birth,
              city: volunteer.cityAndvolunteer ? volunteer.cityAndvolunteer.name : null,
              volunteer_details: volunteer.volunteer_detailsAndvolunteer.map((details) => ({
                id: details.volunteer_detailsAndtype_of_volunteer
                ? details.volunteer_detailsAndtype_of_volunteer.id
                : null,
              name: details.volunteer_detailsAndtype_of_volunteer
                ? details.volunteer_detailsAndtype_of_volunteer.name
                : null,
              })),
              
              volunteer_timer: volunteer.volunteer_timerAndvolunteer.map((timer) => ({
                day: timer.day,
                partInDayId: timer.partInDayId,
                is_matched: timer.is_matched,
                needyrequest: volunteer.needy_requestsAndvolunteer.find((request) =>
                  request.day === timer.day &&
                  request.partInDayId === timer.partInDayId
                ) || null,
              })),
            };
            return { status: 201, result: { transformedVolunteer } };
          }
          return { status: 400, result: { message: 'No volunteer found' } };
        } catch (err) {
          console.error('Error fetching volunteer:', err);
          return { status: 500, result: { message: 'Server error' } };
        }
      };

    getVolunteersByCondition=async(id,city,neighborhood,type,day,partInDay)=>{
        try{
            const cityInstance = await City.findOne({ where: { name: city } });
            const cityId = cityInstance ? cityInstance.id : null;
    
            if (!cityId) {
                return { status: 400, result: { message: 'City not found' } };
            }
            const whereConditions = {
                is_active: true,
                cityId: cityId
            };
    
            if (neighborhood) {
                whereConditions.neighborhood = neighborhood;
            }
            const volunteers = await Volunteer.findAll({
                include : 
                [
                    { model: City, as: 'cityAndvolunteer', attributes:['name']},
                    {model:VolunteerDetails,as:'volunteer_detailsAndvolunteer',
                    include: [{ model: TypeOfVolunteer, as: 'volunteer_detailsAndtype_of_volunteer', attributes: ['name'] }] },
                    { model: VolunteerTimer, as: 'volunteer_timerAndvolunteer', attributes:['day','partInDayId','is_matched']},     
                    { model: NeedyRequest, as: 'needy_requestsAndvolunteer'}
                ],                 
                where:whereConditions
        })  
            if (!volunteers?.length) {           
                return {status:400,result:{message:'No volunteers found'}};
            }   
            const transformedVolunteers = volunteers.map((volunteer) => ({
                id: volunteer.id,
                first_name: volunteer.first_name,
                last_name: volunteer.last_name,
                phone: volunteer.phone,
                mail: volunteer.mail,
                cityId: volunteer.cityId,
                neighborhood: volunteer.neighborhood,
                street: volunteer.street,
                identity_number: volunteer.identity_number,
                is_active: volunteer.is_active,
                date_of_birth: volunteer.date_of_birth,
                city: volunteer.cityAndvolunteer.name,
                volunteer_details: volunteer.volunteer_detailsAndvolunteer
                    ? volunteer.volunteer_detailsAndvolunteer.map((details) => ({
                        type_of_volunteer: details.type_of_volunteer?.name || null,
                        }))
                    : [], 
                volunteer_timer: volunteer.volunteer_timerAndvolunteer.map((timer) => ({
                  day: timer.day,
                  partInDayId: timer.partInDayId,
                  is_matched: timer.is_matched,
                  needyrequest: volunteer.needy_requestsAndvolunteer.find((request) =>
                    request.volunteerId === volunteer.id &&
                    request.day === timer.day &&
                    request.part_in_dayId === timer.partInDayId
                  )
                }))
              }));
            return {status:201,result:transformedVolunteers}}
            catch(err)
            {
                console.log(err);
            }
    }

    createVolunteer=async(values)=>{
        try{
            const {first_name,last_name,phone,mail,cityId,neighborhood,street,
            identity_number,date_of_birth}=values;
            
            console.log(first_name,last_name,phone,mail,cityId,neighborhood,street,
                identity_number,date_of_birth);

            if (!last_name||!phone||
                !cityId||!neighborhood) {
                    return {status:400,result:{message:'All fields are required'}};           
            }
            const volunteer = await Volunteer.create({
                first_name,last_name,phone,mail,
                cityId,neighborhood,street,
                identity_number,date_of_birth});
                if (volunteer) {
                    const volunteerId = volunteer.id;       
                    return { status: 201, result: { ...volunteer.toJSON(), id: volunteerId } };
                } else {
                    return { status: 400, result: { message: 'Invalid volunteer data received' } };
                }
        }
        catch(err)
        {
            console.log(err);
        } 
    } 

    updateVolunteer=async(req) =>{
        try{
            const {first_name,last_name,phone,mail,cityId,neighborhood,street,
                identity_number,date_of_birth} =req.body;

            if (!last_name||!phone||
                !cityId||!neighborhood) {
                return {status:400,result:{message:'All fields are required'}};
            }
            const volunteer = await Volunteer.update({
                first_name,last_name,phone,mail,
                cityId,neighborhood,street,
                identity_number,date_of_birth},{where:{id:req.params.id}});
                console.log(volunteer);
            if (volunteer) {
                return {status:201,result:volunteer};
            } 
            else {
                return {status:400,result:{message:'Invalid volunteer data received'}};      
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    deleteVolunteer=async(arr)=>{
       
        if (arr.length === 0) {
          return { status: 201, result: { message: 'המערך ריק, אין מזהים למחיקה.' } };
        } 
        try {
            // await NeedyRequest.update({volunteerId:null,start_date:null,is_approved:false},
            //     {where: {
            //       volunteerId: {
            //         [Op.in]: arr, 
            //       },
            //     },
            
            //   });

              //////////////////
              const currentDate = new Date(); 
              for (let i = 0; i < arr.length; i++) {
                const id = arr[i];
                const needyRequest = await NeedyRequest.update({volunteerId:null},{ where: { volunteerId: id } });
          
                if (!needyRequest) {
                  console.log(`מתנדב עם ID ${id} לא נמצא בטבלת פרטי מתנדב`);
                  continue;   }
          

                  const updateResult = await Volunteer.update(
                    { is_active: false  , end_date: currentDate }, // השדה לעדכון
                    { where: { id: id } } // תנאי ה- WHERE
                  );
                 
              
                  volunteerIds.splice(i, 1); 
                  i--; 
              }
                ///////////////////////

            await VolunteerDetails.destroy({
                where: {
                  volunteerId: {
                    [Op.in]: arr, 
                  },
                },
                
              });

              await VolunteerTimer.destroy({
                where: {
                  volunteerId: {
                    [Op.in]: arr, 
                  },
                },
                
              });

          const result = await Volunteer.destroy({
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

    updateVolunteerToUnActive=async(req) =>{
        try{
            const id =req.params.id;

            if (!id) {
                return {status:400,result:{message:'id is required'}};
            }           
            const volunteer = await Volunteer.update({
                is_active:false},{where:{id:req.params.id}});
                console.log(volunteer);
            if (volunteer) {
                return {status:201,result:volunteer};
            } 
            else {
                return {status:400,result:{message:'Invalid volunteer data received'}};      
            }
        }catch(err)
        {
            console.log(err);
        }
    }
}

const volunteerDataAccessor=new VolunteerDataAccessor();
module.exports=volunteerDataAccessor;