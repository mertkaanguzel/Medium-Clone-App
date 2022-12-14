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

User.belongsToMany(Article, {through: 'Favorites'});
User.belongsToMany(Article, {through: 'Favorites'});

Article.hasMany(Comment, { as: 'author'});
Comment.belongsTo(Article);

Article.belongsToMany(Tag, {
    through: { model: 'TagList', unique: false },
    as: 'tagList',
    constraints: false,
});
Tag.belongsToMany(Article, {
    through: { model: 'TagList', unique: false },
    constraints: false,
});

User.belongsToMany(User, {
    as: 'followers', 
    through: 'Followers',
});

module.exports = {User, Article, Comment, Tag, sequelize};