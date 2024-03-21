const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.association = model => {
  User.hasMany(model.Team)
}

module.exports = User;
