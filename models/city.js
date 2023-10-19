const { sequelize, DataTypes } = require("./sequelize");

    const city = sequelize.define(
      "city",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
      },
      {
        timestamps: false,
    } 
    );
module.exports=city;