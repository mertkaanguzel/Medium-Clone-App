const { Router } = require('express');
const route = Router();
const { getProfile, toggleFollow } = require('../../controllers/profile');
const { userAuthorization } = require('../../middlewares/auth');

route.get('/:username', userAuthorization, getProfile);

route.post('/:username/follow', userAuthorization, toggleFollow);

route.delete('/:username/follow', userAuthorization, toggleFollow);

module.exports = route;