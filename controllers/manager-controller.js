const managerData = require("../dal/manager-DB-accessor");

class ManagerController{
 login = async (req, res) => {
    const value=req.body;
    const manager=await managerData.login(value);
    res.setHeader("Authorization", `Bearer ${manager.result.accessToken}`);
    return res.status(manager.status).json(manager.result);

}

register = async (req, res) => {
    const value=req.body;
    const manager=await managerData.register(value);
    res.setHeader("Authorization", `Bearer ${manager.accessToken}`);
    return res.status(manager.status).json(manager.result);
}}
const manager=new ManagerController();
module.exports=manager;