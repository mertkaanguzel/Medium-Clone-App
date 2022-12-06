const { deserializeUser } = require('../utils/jwt');

async function userAuthorization(req, res, next) {
    const auth = req.header('Authorization');

    if(!auth) {
        return res.status(403).send({
            errors: {
                body: [
                    'Only for logged in users'
                ]
            }
        });
    }

    if(!auth.startsWith('Token')) {
        return res.status(400).send({
            errors: {
                body: [
                    'Authorization format not supported'
                ]
            }
        });
    }

    const token = auth.substring(6);

    try {
        const user = await deserializeUser(token);
        req.user = user;
        return next();
    } catch (error) {
        res.status(403).send({
            errors: {
                body: [
                    'Authorization failed'
                ]
            }
        });
    }


}

module.exports = {
    userAuthorization
};