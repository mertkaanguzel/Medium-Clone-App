const sequelize = require('../database');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');
const Article = require('./article');
const Comment = require('./comment');
const Tag = require('./tag');

User.hasMany(Article, {as: 'author'});
Article.belongsTo(User);

User.hasMany(Comment, {as: 'commenter'});
Comment.belongsTo(User);

User.belongsToMany(Article, {through: 'favorites'});
User.belongsToMany(Article, {through: 'favorites'});

Article.hasMany(Comment, { as: 'author'});
Comment.belongsTo(Article);

Article.belongsToMany(Tag, {through: 'articleTags'});
Tag.belongsToMany(Article, {through: 'articleTags'});

module.exports = {User, Article, Comment, Tag, sequelize};