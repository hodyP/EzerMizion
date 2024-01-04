const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
  const { city, needy_requests, needy, partInDay, type_of_volunteer, volunteer_details , volunteer_timer,volunteer } = sequelize.models;
  
  needy.belongsTo(city, { foreignKey: "cityId", as: "cityAndneedy" });
  city.hasMany(needy, { foreignKey: "cityId", as: "cityAndneedy" });

  volunteer.belongsTo(city, { foreignKey: "cityId", as: "cityAndvolunteer" });
  city.hasMany(volunteer, { foreignKey: "cityId", as: "cityAndvolunteer" });

  needy_requests.belongsTo(needy, { foreignKey: "needyId", as: "needy_requestsAndneedy" });
  needy.hasMany(needy_requests, { foreignKey: "needyId", as: "needy_requestsAndneedy" });

  needy_requests.belongsTo(volunteer, { foreignKey: "volunteerId", as: "needy_requestsAndvolunteer" });
  volunteer.hasMany(needy_requests, { foreignKey: "volunteerId", as: "needy_requestsAndvolunteer" });
  
  needy_requests.belongsTo(type_of_volunteer, { foreignKey: "type_of_volunteerId", as: "needy_requestsAndtype_of_volunteer" });
  type_of_volunteer.hasMany(needy_requests, { foreignKey: "type_of_volunteerId", as: "needy_requestsAndtype_of_volunteer" });

  needy_requests.belongsTo(partInDay, { foreignKey: "part_in_dayId", as: "needy_requestsAndpart_in_dayId" });
  partInDay.hasMany(needy_requests, { foreignKey: "part_in_dayId", as: "needy_requestsAndpart_in_dayId" });
  
  volunteer_details.belongsTo(volunteer, { foreignKey: "volunteerId", as: "volunteer_detailsAndvolunteer" });
  volunteer.hasMany(volunteer_details, { foreignKey: "volunteerId", as: "volunteer_detailsAndvolunteer" });

  volunteer_details.belongsTo(type_of_volunteer, { foreignKey: "type_of_volunteerId", as: "volunteer_detailsAndtype_of_volunteer" });
  type_of_volunteer.hasMany(volunteer_details, { foreignKey: "type_of_volunteerId", as: "volunteer_detailsAndtype_of_volunteer" });

  volunteer_timer.belongsTo(volunteer, { foreignKey: "volunteerId", as: "volunteer_timerAndvolunteer" });
  volunteer.hasMany(volunteer_timer, { foreignKey: "volunteerId", as: "volunteer_timerAndvolunteer" });

  volunteer_timer.belongsTo(partInDay, { foreignKey: "partInDayId", as: " volunteer_timerAndpartInDay" });
  partInDay.hasMany(volunteer_timer, { foreignKey: "partInDayId", as: " volunteer_timerAndpartInDay" });
};
module.exports = { applyExtraSetup };
