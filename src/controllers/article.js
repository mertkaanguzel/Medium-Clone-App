const { User, Article, Tag } = require('../models/index');
const { filterArticle } = require('../utils/filterArticle');
const { filterUser } = require('../utils/filterUser');
async function listArticles(req, res) {
    try {
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const profileName = req.params.username;

        if(!profileName) {
            res.statusCode = 403;
            throw new Error('Did not supply username');
        }

        const profile = await User.findByPk(profileName, {include: 'followers'});
        
        if(!profile) {
            res.statusCode = 403;
            throw new Error('No profile with given username');
        }
        const followers = await profile.getFollowers();

        let follower = followers.find(user => user.dataValues.username === req.user.username);

        const filteredProfile = await filterUser(profile.get());
        delete filteredProfile.email;
        filteredProfile.following = Boolean(follower);
        

        res.send({profile: filteredProfile});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
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
       article = await filterArticle(article.get());
       article.author = await filterUser(article.author.dataValues);
       delete article.authorUsername;
       */
        article = await filterArticle(article.get(), existingUser, req.user);


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
       article = await filterArticle(article.get());
       article.author = await filterUser(article.author.dataValues);
       delete article.authorUsername;
       */
        article = await filterArticle(article.get(), existingUser, req.user);


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
       article = await filterArticle(article.get());
       article.author = await filterUser(article.author.dataValues);
       delete article.authorUsername;
       */
        await article.reload();

        article = await filterArticle(article.get(), existingUser, req.user);

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
    toggleFavorite
};