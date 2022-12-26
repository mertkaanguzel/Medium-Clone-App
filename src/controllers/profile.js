const { User } = require('../models/index');
const { modifyProfile } = require('../utils/modifyProfile')

async function getProfile(req, res) {
    try {
        if (req.user) {
            const existingUser = await User.findByPk(req.user.username);

            if(!existingUser) {
                res.statusCode = 403;
                throw new Error('No user with given username');
            }
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
      
       const modifiedProfile = await modifyProfile(profile, req.user);

        res.send({profile: modifiedProfile});
    }catch(error) {
        const status = res.statusCode ? res.statusCode : 422;
        
        res.status(status).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}


async function toggleFollow(req, res) {
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

        if (req.method === "POST") await profile.addFollowers(existingUser);
        if (req.method === "DELETE") await profile.removeFollowers(existingUser);

       const modifiedProfile = await modifyProfile(profile, req.user);
        

        res.send({profile: modifiedProfile});
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
    toggleFollow
};