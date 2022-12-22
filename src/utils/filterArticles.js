const { modifyArticle } = require('./modifyArticle');
const { User, Article, Tag } = require('../models/index');

async function filterArticles(filters) {
    const { tag, author, favorited, limit = 20, offset = 0 } = filters;
    const queryOpts = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        /*
        include: [
            'tagList',
           'author',
           'favorites'
       ]
       */
      include: []
    };

    if (tag) queryOpts.include.push({
        model: Tag,
        as:  'tagList',
        where: {name: tag}
    });
    else queryOpts.include.push({
        model: Tag,
        as:  'tagList'
    });

    if (author) queryOpts.include.push({
        model: User,
        as:  'author',
        where: {username: author}
    });
    else queryOpts.include.push({
        model: User,
        as:  'author'
    });

    if (favorited) queryOpts.include.push({
        model: User,
        as:  'favorites',
        where: {username: favorited}
    });
    else queryOpts.include.push({
        model: User,
        as:  'favorites'
    });

    return queryOpts;
    
}

module.exports = {
    filterArticles
}
