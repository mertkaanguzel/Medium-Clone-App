const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.send({
        "tags": [
          "reactjs",
          "angularjs"
        ]
      });
});

module.exports = route;