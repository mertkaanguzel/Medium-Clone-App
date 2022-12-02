const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  module.exports = Tag;