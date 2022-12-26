const { User, Article, Tag, Comment } = require('../models/index');
const { modifyComment } = require('../utils/modifyComment');

async function createComment(req, res) {
    try {
       
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        if (!slug) {
            res.statusCode = 403;
            throw new Error('Missing slug paramater');
        }

        const article = await Article.findByPk(slug);

        if (!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }

        const commentBody = req.body.comment.body;
        
        if (!commentBody) {
            throw new Error('Did not supply body');
        }
  
        let comment = await Comment.create({
            body: commentBody
        });

        await comment.setCommenter(existingUser);
        await comment.setArticle(article);

        comment = await modifyComment(comment, req.user);

        res.send({comment: comment});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        console.log(error);

        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

async function getComments(req, res) {
    try {
       
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        if (!slug) {
            res.statusCode = 403;
            throw new Error('Missing slug paramater');
        }

        const article = await Article.findByPk(slug);

        if (!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }

        let comments = await Comment.findAll({
            include: [
                {
                    model: Article,
                    where: {
                        slug: article.dataValues.slug
                    }
                }
            ]
        });

        let commentList = [];

        for(let comment of comments) {
            let _article = await modifyComment(comment, req.user);
            delete _article.Article;
            commentList.push(_article);
        }

        res.send({comments: commentList});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        console.log(error);

        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

async function deleteComment(req, res) {
    try {
       
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        if (!slug) {
            res.statusCode = 403;
            throw new Error('Missing slug paramater');
        }

        const id = req.params.id;

        if (!id) {
            res.statusCode = 403;
            throw new Error('Missing id paramater');
        }

        const article = await Article.findByPk(slug);

        if (!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }

        const comment = await Comment.findByPk(id);

        if (!comment) {
            res.statusCode = 403;
            throw new Error('No comment with given id');
        }

        const author = await comment.getCommenter();

        if (author.dataValues.username !== existingUser.dataValues.username) {
            res.statusCode = 403;
            throw new Error('The comment can only be deleted by its author');
        }

        await comment.destroy({ truncate: true, restartIdentity: true });
        
  
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        console.log(error);

        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

module.exports = {
    createComment,
    getComments,
    deleteComment   

};