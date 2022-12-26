const { User, Tag } = require('../models/index');

async function filterArticles(filters, loggedinUser) {
    const { tag, author, favorited, limit = 20, offset = 0 } = filters;
    const queryOpts = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [],
        order: [['createdAt', 'DESC']],
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


    let authorOpts = {
        model: User,
        as: 'author'
    };

    if (author) {
        authorOpts.where = {username: author};
    }

    if (loggedinUser) {
        authorOpts.include  =  [
            {
                model: User,
                as:  'followers',
                where: {username: loggedinUser.username}
            }
        ];
    }

    queryOpts.include.push(authorOpts);


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
