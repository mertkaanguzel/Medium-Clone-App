const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('Comment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  });

  module.exports = Comment;