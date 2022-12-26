const { modifyProfile } = require('./modifyProfile');
const { modifyFavorites } = require('./modifyFavorites');

async function modifyArticle(article, loggedinUser) {
    delete article.UserUsername;

    article.tagList = article.tagList.map((tag) => {
        return tag.dataValues.name;
    })

    article.author = await modifyProfile(article.author, loggedinUser);

    delete article.authorUsername;
   
    article = await modifyFavorites(article, loggedinUser);
    
    return article;
}

module.exports = {
    modifyArticle
}
