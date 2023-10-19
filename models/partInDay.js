const { sequelize, DataTypes } = require("./sequelize");

    const partInDay = sequelize.define(
      "partInDay",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name_time: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
      },
      {
        timestamps: false,
    } 
    );
    module.exports=partInDay;

  