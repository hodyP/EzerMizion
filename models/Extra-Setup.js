const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
  const { city, needy_requests, needy, partInDay, type_of_volunteer, volunteer_details , volunteer_timer,volunteer } = sequelize.models;
  
  needy.belongsTo(city, { foreignKey: "cityId", as: "city&needy" });
  city.hasMany(needy, { foreignKey: "cityId", as: "city&needy" });

  volunteer.belongsTo(city, { foreignKey: "cityId", as: "city&volunteer" });
  city.hasMany(volunteer, { foreignKey: "cityId", as: "city&volunteer" });

  needy_requests.belongsTo(needy, { foreignKey: "needyId", as: "needy_requests&needy" });
  needy.hasMany(needy_requests, { foreignKey: "needyId", as: "needy_requests&needy" });

  needy_requests.belongsTo(volunteer, { foreignKey: "volunteerId", as: "needy_requests&volunteer" });
  volunteer.hasMany(needy_requests, { foreignKey: "volunteerId", as: "needy_requests&volunteer" });
  
  needy_requests.belongsTo(type_of_volunteer, { foreignKey: "type_of_valunteerId", as: "needy_requests&type_of_volunteer" });
  type_of_volunteer.hasMany(needy_requests, { foreignKey: "type_of_valunteerId", as: "needy_requests&type_of_volunteer" });

  needy_requests.belongsTo(partInDay, { foreignKey: "part_in_dayId", as: "needy_requests&part_in_dayId" });
  partInDay.hasMany(needy_requests, { foreignKey: "part_in_dayId", as: "needy_requests&part_in_dayId" });
  volunteer_details.belongsTo(volunteer, { foreignKey: "volunteerId", as: "volunteer_details&volunteer" });
  volunteer.hasMany(volunteer_details, { foreignKey: "volunteerId", as: "volunteer_details&volunteer" });

  volunteer_details.belongsTo(type_of_volunteer, { foreignKey: "type_of_valunteerId", as: "volunteer_details&type_of_volunteer" });
  type_of_volunteer.hasMany(volunteer_details, { foreignKey: "type_of_valunteerId", as: "volunteer_details&type_of_volunteer" });

  volunteer_timer.belongsTo(volunteer, { foreignKey: "volunteerId", as: "volunteer_timer&volunteer" });
  volunteer.hasMany(volunteer_timer, { foreignKey: "volunteerId", as: "volunteer_timer&volunteer" });

  volunteer_timer.belongsTo(partInDay, { foreignKey: "partInDayId", as: " volunteer_timer&partInDay" });
  partInDay.hasMany(volunteer_timer, { foreignKey: "partInDayId", as: " volunteer_timer&partInDay" });
};
module.exports = { applyExtraSetup };
