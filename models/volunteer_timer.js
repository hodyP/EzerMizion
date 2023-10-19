const { sequelize, DataTypes } = require("./sequelize");

    const volunteer_timer = sequelize.define(
      "volunteer_timer",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        volunteerId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        day: {
        type: DataTypes.STRING(45),
        allowNull: false
        },  
        partInDayId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        is_matched:{
          type: DataTypes.BOOLEAN,
          defaultValue:false,
          allowNull: false
        }
      },
      {
        timestamps: false,
    } 
    );
   module.exports=volunteer_timer;