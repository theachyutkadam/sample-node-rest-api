const Sequelize = require('sequelize');
const sequelize = require('../db');

// module.exports = (sequelize) => {

const Match = sequelize.define('match', {
  startAt: {
    type: Sequelize.DATE,
    allowNull: false,
    isDate: true,
    isAfter: Date.now()
  },
  numberOfOvers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isNumeric: true,
    len: [2,10]
  },
  isDraw: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

Match.association = model => {
  Match.belongsTo(model.Team, {foreignKey: 'team1Id'});
  Match.belongsTo(model.Team, {foreignKey: 'team2Id'});
  Match.belongsTo(model.Team, {foreignKey: 'tossWinerTeamId'});
}

module.exports = Match;
// }
