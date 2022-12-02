const { Router } = require('express');

const route = Router();

route.post('/', (req, res) => {
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

route.post('/login', (req, res) => {
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