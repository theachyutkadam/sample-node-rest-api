const Sequelize = require('sequelize');
const sequelize = require('../db');

// module.exports = (sequelize) => {
const Team = sequelize.define('team', {
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  city: {type: Sequelize.STRING, allowNull: false},
  contact: {type: Sequelize.STRING, allowNull: false, min: 10. ,max: 13},
  status: {type: Sequelize.INTEGER, allowNull: false},
});

Team.association = model => {
  Team.hasMany(model.Match),
  Team.belongsTo(model.User, {foreignKey: 'captainId'})
}
module.exports = Team
// }
