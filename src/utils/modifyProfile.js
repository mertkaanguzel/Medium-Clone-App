const { modifyUser } = require('./modifyUser');

async function modifyProfile(profile, loggedinUser) {
    const followers = await profile.getFollowers();/*profile.dataValues.followers;*/

    let isFollowing = followers.find(user => user.dataValues.username === loggedinUser.username);

    const filteredProfile = await modifyUser(/*profile.get()*/profile.dataValues);
    delete filteredProfile.email;
    filteredProfile.following = Boolean(isFollowing);

    return filteredProfile;
}
module.exports = {
    modifyProfile
}
