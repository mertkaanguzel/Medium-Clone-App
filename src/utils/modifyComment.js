const { modifyProfile } = require('./modifyProfile');


async function modifyComment(comment, loggedinUser) {
    const author = await modifyProfile(await comment.getCommenter(), loggedinUser);
    comment = comment.dataValues;
    comment.author = author;
    
    delete comment.UserUsername;
    delete comment.commenterUsername;
    delete comment.ArticleSlug;
    
    return comment;
}

module.exports = {
    modifyComment
}
