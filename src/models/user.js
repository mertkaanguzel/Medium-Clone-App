const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    bio: DataTypes.STRING,
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
          },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });

  module.exports = User;