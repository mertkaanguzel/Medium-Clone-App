const { Router } = require('express');

const route = Router();

route.use('/user', require('./user'));
route.use('/users', require('./users'));
route.use('/profiles', require('./profiles'));
route.use('/tag', require('./tags'));
route.use('/articles', require('./articles'));

module.exports = route;