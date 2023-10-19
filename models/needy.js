const { sequelize, DataTypes } = require("./sequelize");

    const needy = sequelize.define(
      "needy",
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
        phone: {
            type: DataTypes.STRING(45),
            allowNull: false
            },
        phone_2: {
          type: DataTypes.STRING(45),
          allowNull: true
          }, 
        mail: {
            type: DataTypes.STRING(45),
            allowNull: true
            },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        neighborhood: {
            type: DataTypes.STRING(45),
            allowNull: false
            },
        street: {
            type: DataTypes.STRING(45),
            allowNull: false
            },
        remaind_time: {
            type: DataTypes.STRING(45),
            allowNull: false
            },
        description: {
            type: DataTypes.STRING(300),
            allowNull: true
            }
            ,
        last_time_updated:{
          type: DataTypes.DATEONLY,
          defaultValue:new Date().toLocaleDateString(),
          allowNull: false
        }
      },
      {
        timestamps: false,} 
    );
module.exports=needy;