const { Router } = require('express');

const route = Router();

route.get('/:username', (req, res) => {
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

route.post('/:username/follow', (req, res) => {
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

route.delete('/:username/follow', (req, res) => {
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