const { filterUser } = require('./filterUser');

async function modifyFavorites(article, loggedinUser) {
    article.favoritesCount = article.favorites.length;

    const isFavorited = article.favorites.find(user => user.dataValues.username === loggedinUser.username);

    article.favorited = Boolean(isFavorited);

    delete article.favorites;

    return article;
}
module.exports = {
    modifyFavorites
}
