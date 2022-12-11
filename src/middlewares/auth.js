const { deserializeUser } = require('../utils/jwt');
/*
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
*/
async function userAuthorization(req, res, next) {
    try {
        const auth = req.header('Authorization');

        if (!auth) {
            res.statusCode = 403;
            throw new Error('Only for logged in users');
        }
    
        if (!auth.startsWith('Token')) {
            res.statusCode = 403;
            throw new Error('Authorization format not supported');
        }
    
    
        const token = auth.substring(6);
        /*
        const user = await deserializeUser(token);
    
        if (!user) {
            res.statusCode = 403;
            throw new Error('Authorization failed');
        }
        */
        const user = await deserializeUser(token).catch((error) => {
            res.statusCode = 401;
            throw new Error('Authorization failed');
        });
        req.user = user;
        return next();
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
    userAuthorization
};