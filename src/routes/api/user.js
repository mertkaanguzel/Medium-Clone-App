const { Router } = require('express');
const { userAuthorization } = require('../../middlewares/auth');
const route = Router();

route.get('/', userAuthorization, async (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
});

route.put('/', (req, res) => {
    res.send({
        "user": {
          "email": "jake@jake.jake",
          "token": "jwt.token.here",
          "username": "jake",
          "bio": "I work at statefarm",
          "image": null
        }
      });
});

module.exports = route;