const { Router } = require('express');
const route = Router();
const { getProfile, followProfile, unfollowProfile } = require('../../controllers/profile');
const { userAuthorization } = require('../../middlewares/auth');

route.get('/:username', userAuthorization, getProfile);

route.post('/:username/follow', userAuthorization, followProfile);

route.delete('/:username/follow', userAuthorization, unfollowProfile);

module.exports = route;