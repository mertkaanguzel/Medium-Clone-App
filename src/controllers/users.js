const { User } = require('../models/index');
const { serializeUser } = require('../utils/jwt');
const { modifyUser } = require('../utils/modifyUser');
const bcrypt = require('bcrypt');

async function signupUser(req, res) {
    try {
        const userOpts = req.body.user;
        if (!userOpts.username) {
            throw new Error('Did not supply username');
        }
        if (!userOpts.email) {
            throw new Error('Did not supply email');
        }
        if (!userOpts.password) {
            throw new Error('Did not supply password');
        }

        const existingUser = await User.findByPk(userOpts.username);
        
        if(existingUser) {
            throw new Error('User aldready exists');
        }

        userOpts.password = await bcrypt.hash(userOpts.password, 10);
                
        const user = await User.create({
            ...userOpts,
        });

        if(!user) {
            throw new Error('Error creating user');
        }

        const createdUser = await modifyUser(user.get());
        createdUser.token = await serializeUser(createdUser);

        res.send({user: createdUser});
    }catch(error) {
        //const status = res.statusCode ? res.statusCode : 500;
        
        res.status(422).json({
            errors: {
                body : [error.message]
            }
        });  
    }
    
}

async function signinUser(req, res) {

    try {
        const userOpts = req.body.user;
        if (!userOpts.email) {
            res.statusCode = 403;
            throw new Error('Did not supply email');
        }
        if (!userOpts.password) {
            res.statusCode = 403;
            throw new Error('Did not supply password');
        }
    
        const user = await User.findOne({
            where: {
                email: userOpts.email
            }
        });
    
        if(!user) {
            res.statusCode = 403;
            throw new Error('No user with given email address');
        }
    
        const match = await bcrypt.compare(userOpts.password, user.password);
    
        if(!match) {
            res.statusCode = 403;
            throw new Error('Password does not match');
        }
    
        const createdUser = await modifyUser(user.get());
        createdUser.token = await serializeUser(createdUser);
    
        res.send({user: createdUser});
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
    signupUser,
    signinUser
};