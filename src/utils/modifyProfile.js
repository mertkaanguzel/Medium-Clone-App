const { filterUser } = require('./filterUser');

async function modifyProfile(profile, loggedinUser) {
    const followers = await profile.getFollowers();

    let isFollowing = followers.find(user => user.dataValues.username === loggedinUser.username);

    const filteredProfile = await filterUser(profile.get());
    delete filteredProfile.email;
    filteredProfile.following = Boolean(isFollowing);

    return filteredProfile;
}
module.exports = {
    modifyProfile
}
