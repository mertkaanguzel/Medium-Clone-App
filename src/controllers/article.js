const { User, Article, Tag } = require('../models/index');
const { modifyArticle } = require('../utils/modifyArticle');
const { filterArticles } = require('../utils/filterArticles');
async function listArticles(req, res) {
    try {
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const queryOpts = await filterArticles(req.query);
        console.log(queryOpts);
        let articles = await Article.findAll(queryOpts);
        console.log(articles);
        
        
        let articleList = [];

        for(let article of articles) {
            articleList.push(await modifyArticle(article.dataValues, req.user));
        }
        
        

        res.send({articles: articleList});
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

async function createArticle(req, res) {
    try {

        const existingUser = await User.findByPk(req.user.username);
        
        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const articleOpts = req.body.article;
        
        if (!articleOpts.title) {
            throw new Error('Did not supply title');
        }
        if (!articleOpts.description) {
            throw new Error('Did not supply description');
        }
        if (!articleOpts.body) {
            throw new Error('Did not supply body');
        }

        articleOpts.slug = articleOpts.title.toLowerCase().split(' ').join('-')

        let article = await Article.create({...articleOpts});

        if(!article) {
            res.statusCode = 403;
            throw new Error('Error creating article');
        }

        await article.setAuthor(existingUser);

        if (articleOpts.tagList) {
            for (let name of articleOpts.tagList) {
                let tag = await Tag.findByPk(name);
                if (!tag) {
                    tag = await Tag.create({name: name});
                }
                await article.addTagList(tag); 
            }   
        }

        article = await Article.findByPk(articleOpts.slug, { include: [
            'tagList',
           'author',
           'favorites'
       ] });
       /* 
       article = await modifyArticle(article.get());
       article.author = await modifyUser(article.author.dataValues);
       delete article.authorUsername;
       */
       article = await modifyArticle(article.get(), req.user);


        res.send({article: article});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

async function getArticle(req, res) {
    try {

        const existingUser = await User.findByPk(req.user.username);
        
        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        let article = await Article.findByPk(slug, { include: [
             'tagList',
            'author',
            'favorites'
        ] });

        if(!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }
        /* 
       article = await modifyArticle(article.get());
       article.author = await modifyUser(article.author.dataValues);
       delete article.authorUsername;
       */
        article = await modifyArticle(article.get(), req.user);


        res.send({article: article});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

async function deleteArticle(req, res) {
    try {

        const existingUser = await User.findByPk(req.user.username);
        
        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        let article = await Article.findByPk(slug, { include: [
             'tagList',
            'author',
            'favorites'
        ] });

        if(!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }
        /* 
       article = await modifyArticle(article.get());
       article.author = await modifyUser(article.author.dataValues);
       delete article.authorUsername;
       */
        //article = await modifyArticle(article.get(), req.user);

        if(article.author.dataValues.username !== existingUser.dataValues.username) {
            res.statusCode = 403;
            throw new Error('The article can only be deleted by its author');
        }

        await article.destroy();


        //res.send({article: article});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}


async function toggleFavorite(req, res) {
    try {
        const existingUser = await User.findByPk(req.user.username);
        
        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const slug = req.params.slug;

        let article = await Article.findByPk(slug, { include: [
             'tagList',
            'author',
            'favorites'
        ] });

        if(!article) {
            res.statusCode = 403;
            throw new Error('No article with given slug');
        }

        if (req.method === "POST") await article.addFavorites(existingUser);
        if (req.method === "DELETE") await article.removeFavorites(existingUser);

        //await article.addFavorites(existingUser);

        /* 
       article = await modifyArticle(article.get());
       article.author = await modifyUser(article.author.dataValues);
       delete article.authorUsername;
       */
        await article.reload();

        article = await modifyArticle(article.get(), req.user);

        res.send({article: article});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

module.exports = {
    listArticles,
    createArticle,
    getArticle,
    toggleFavorite,
    deleteArticle
};