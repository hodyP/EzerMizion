const { sequelize, DataTypes } = require("./sequelize");
    const type_of_volunteer = sequelize.define(
      "type_of_volunteer",
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
    module.exports=type_of_volunteer;
  