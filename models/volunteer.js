const { sequelize, DataTypes } = require("./sequelize");

    const volunteer = sequelize.define(
      "volunteer",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: true
          },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(45),
            allowNull: false
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
            allowNull: true
            },
        identity_number: {
            type: DataTypes.STRING(45),
            allowNull: true
            },   
        is_active: {
            type: DataTypes.BOOLEAN,     
            defaultValue:true,
            allowNull: false
            },
        date_of_birth:{
            type:DataTypes.DATEONLY
        }
      },
      {
        timestamps: false,
    } 
    );
   module.exports=volunteer;