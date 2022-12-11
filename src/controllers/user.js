const { User } = require('../models/index');
const { filterUser } = require('../utils/filterUser');
const bcrypt = require('bcrypt');

async function getCurrentUser(req, res) {

    res.send({user: req.user});

}

async function updateUser(req, res) {
    try {
        const existingUser = await User.findByPk(req.user.username);

        if(!existingUser) {
            res.statusCode = 403;
            throw new Error('No user with given username');
        }

        const userOpts = req.body.user;
        
        if(!userOpts) {
            res.statusCode = 403;
            throw new Error('At least one field is required.');
        }
      

        if(userOpts.username) delete userOpts.username;
        if(userOpts.password){
            userOpts.password = await bcrypt.hash(userOpts.password, 10);
        }

        const updatedUser = await existingUser.update(userOpts);
        const filteredUser = await filterUser(updatedUser.get());
        filteredUser.token = req.header('Authorization').substring(6);
        

        res.send({user: filteredUser});
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
    getCurrentUser,
    updateUser
};