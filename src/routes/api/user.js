const { Router } = require('express');
const { userAuthorization } = require('../../middlewares/auth');
const { getCurrentUser, updateUser } = require('../../controllers/user');
const route = Router();
/*
route.get('/', userAuthorization, async (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
});
*/
route.get('/', userAuthorization, getCurrentUser);
route.put('/', userAuthorization, updateUser);

module.exports = route;