const { sequelize, DataTypes } = require("./sequelize");
 
    const needy_requests = sequelize.define(
      "needy_requests",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        day: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
        type_of_valunteerId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        part_in_dayId: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        volunteerId: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        needyId: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
          },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
          },
          is_approved:{
            type: DataTypes.BOOLEAN,     
            defaultValue:false,
            allowNull: true
          }
      },
      
      {
        timestamps: false,
    } 
    );
    module.exports=needy_requests;
  