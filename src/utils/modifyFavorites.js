async function modifyFavorites(article, loggedinUser) {
    article.favoritesCount = article.favorites.length;
    if (loggedinUser) {
        const isFavorited = article.favorites.find(user => user.dataValues.username === loggedinUser.username);
        article.favorited = Boolean(isFavorited);
    }
    
    delete article.favorites;

    return article;
}

module.exports = {
    modifyFavorites
}
