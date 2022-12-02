const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Article = sequelize.define('Article', {
    slug: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    body: DataTypes.TEXT,
  });

  module.exports = Article;