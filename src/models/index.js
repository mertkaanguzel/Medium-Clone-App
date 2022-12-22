const sequelize = require('../database');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');
const Article = require('./article');
const Comment = require('./comment');
const Tag = require('./tag');

User.hasMany(Article); //{ as: 'author'}
Article.belongsTo(User, {as: 'author'});

User.hasMany(Comment);
Comment.belongsTo(User, {as: 'commenter'});

User.belongsToMany(Article, {through: 'Favorites'});
Article.belongsToMany(User, {through: 'Favorites', as: 'favorites'});

Article.hasMany(Comment); //{ as: 'author'}
Comment.belongsTo(Article);

Article.belongsToMany(Tag, {
    through:  'TagList',
    as: 'tagList',
    
});
Tag.belongsToMany(Article, {
    through:  'TagList',
});
User.belongsToMany(User, {
    as: 'followers', 
    through: 'Followers',
});

module.exports = {User, Article, Comment, Tag, sequelize};

/*
Article.belongsToMany(Tag, {
    through: { model: 'TagList', unique: false },
    as: 'tagList',
    constraints: false,
});
Tag.belongsToMany(Article, {
    through: { model: 'TagList', unique: false },
    constraints: false,
});
*/