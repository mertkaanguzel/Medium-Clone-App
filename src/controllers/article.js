const { User, Article, Tag } = require('../models/index');

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

async function createArticles(req, res) {
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

        if (articleOpts.tagList) {
            articleOpts.tagList = articleOpts.tagList.map(tag => ({
                name: tag,
            }));
        }

        console.log(articleOpts.tagList);

        articleOpts.slug = articleOpts.title.toLowerCase().split(' ').join('-')

        const article = await Article.create({...articleOpts}, {include: 'tagList'});
       
        if(!article) {
            throw new Error('Error creating article');
        }
   
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
    createArticles
};