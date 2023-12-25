const db = require('../models/index')
const Manager = db.manager
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

class ManagerDataAccessor
{
    register= async(values)=>{
        const {first_name,last_name, password} = values

        if (!first_name || !last_name || !password) {
            return {status:400,result:{message:'All fields are required'}};
        }
    
        const duplicate = await Manager.findOne({where:{first_name:first_name,last_name:last_name}})
    
        if(duplicate){
            return {status:409,result:{message:'Duplicate username'}};
        }
    
        const hashedPwd = await bcrypt.hash(password, 10)
    
        const managerObject = {first_name,last_name, password:hashedPwd}
        const manager = await Manager.create(managerObject)
        if (manager) {  
            return {status:201,result:{manager}};
            
        } else {
            return {status:400,result:{message:'Invalid user data received'}};
        } 
    }

    login=async(values)=>{
        
        const { first_name,last_name, password } = values;
        if (!first_name||!last_name ||!password) {
            return {status:400,result:{message:'All fields are required'}};
        }

        const foundManager = await Manager.findOne({where:{first_name:first_name,last_name:last_name}})
        
        if (!foundManager ) {
            return {status:401,result:{message:'Unauthorized'}};
        }

        const passwordMatch = await bcrypt.compare(password, foundManager.password);
        if (passwordMatch) { 
       
        const userInfo= {id:foundManager.id, first_name:foundManager.first_name, last_name:foundManager.last_name}
        const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
        return {status:201,result:{accessToken:accessToken,user:userInfo}};   }
        else {
            console.log('Password comparison failed');
            console.log('Stored Password Hash:', foundManager.password);
            console.log('Provided Password:', password);
            return { status: 401, result: { message: 'Unauthorized' } };
        }
    }
}
const managerDataAccessor=new ManagerDataAccessor();
module.exports=managerDataAccessor;