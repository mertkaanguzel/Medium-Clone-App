const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('Comment', {
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  });

  module.exports = Comment;