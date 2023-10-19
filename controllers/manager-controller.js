const managerData = require("../dal/manager-DB-accessor");

class ManagerController{
 login = async (req, res) => {
    const value=req.body;
    const manager=await managerData.login(value);
    return res.status(manager.status).json(manager.result);

}

register = async (req, res) => {
    const value=req.body;
    const manager=await managerData.register(value);
    return res.status(manager.status).json(manager.result);

}}

const manager=new ManagerController();
module.exports=manager;