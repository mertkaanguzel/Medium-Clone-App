const { User } = require('../models/index');
const { serializeUser, deserializeUser } = require('../utils/jwt');
const { filterUser } = require('../utils/filterUser');
const bcrypt = require('bcrypt');

async function createUser(userOpts) {
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

    const createdUser = await filterUser(user.get());
    createdUser.token = await serializeUser(createdUser);

    return createdUser;
}

async function verifyUser(userOpts) {
    if (!userOpts.email) {
        throw new Error('Did not supply email');
    }
    if (!userOpts.password) {
        throw new Error('Did not supply password');
    }

    const user = await User.findOne({
        where: {
            email: userOpts.email
        }
    });

    if(!user) {
        throw new Error('No user with given email address');
    }

    const match = await bcrypt.compare(userOpts.password, user.password);

    if(!match) {
        throw new Error('Password does not match');
    }

    const createdUser = await filterUser(user.get());
    createdUser.token = await serializeUser(createdUser);

    return createdUser;
}

module.exports = {
    createUser,
    verifyUser
};