const { Router } = require('express');
const { signupUser, signinUser} = require('../../controllers/users');
const route = Router();

route.post('/', signupUser);

route.post('/login', signinUser);

module.exports = route;