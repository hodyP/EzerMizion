const { sequelize, DataTypes } = require("./sequelize");

    const manager = sequelize.define(
      "manager",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
        last_name: {
        type: DataTypes.STRING(45),
        allowNull: false
        },       
        password:{
            type:DataTypes.TEXT,
            allowNull: false
        }     
      },
      {
        timestamps: false} 
    );
    module.exports =manager;
  