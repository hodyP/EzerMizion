const { sequelize, DataTypes } = require("./sequelize");

    const volunteer_details = sequelize.define(
      "volunteer_details",
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
        type_of_volunteerId: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
      },
      {
        timestamps: false,
    } 
    );
    module.exports=volunteer_details;

  