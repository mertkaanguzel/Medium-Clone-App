const { User } = require('../models/index');
const { filterUser } = require('../utils/filterUser');

async function getProfile(req, res) {
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

async function followProfile(req, res) {
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

        const profile = await User.findByPk(profileName);
        
        if(!profile) {
            res.statusCode = 403;
            throw new Error('No profile with given username');
        }

        await profile.addFollowers(existingUser);

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

async function unfollowProfile(req, res) {
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

        const profile = await User.findByPk(profileName);
        
        if(!profile) {
            res.statusCode = 403;
            throw new Error('No profile with given username');
        }

        await profile.removeFollowers(existingUser);

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


module.exports = {
    getProfile,
    followProfile,
    unfollowProfile
};