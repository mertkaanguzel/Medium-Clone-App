const { modifyProfile } = require('./modifyProfile');
const { modifyFavorites } = require('./modifyFavorites');

async function filterArticle(article, profile, loggedinUser) {
    delete article.UserUsername;

    article.tagList = article.tagList.map((tag) => {
        return tag.dataValues.name;
    })

    article.author = await modifyProfile(profile, loggedinUser);

    delete article.authorUsername;
    /*
    article.favoritesCount = article.favorites.length;

    const isFavorited = article.favorites.find(user => user.dataValues.username === loggedinUser.username);

    article.favorited = Boolean(isFavorited);

    delete article.favorites;
    */
    article = await modifyFavorites(article, loggedinUser);
    
    article = Object.entries(article);
    
    return Object.fromEntries(article);
}

module.exports = {
    filterArticle
}
