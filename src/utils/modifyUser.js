async function modifyUser(user) {
    const asArray = Object.entries(user);
    const attributes = ['email', 'username', 'bio', 'image'];

    const filtered = asArray.filter(([key, value]) => {
        return attributes.includes(key);
    });

    return Object.fromEntries(filtered);
}
module.exports = {
    modifyUser
}
