const { Router } = require('express');

const route = Router();

route.post('/', (req, res) => {
    // TODO: Send current user
    res.send({
        "comment": {
          "id": 1,
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:22:56.637Z",
          "body": "It takes a Jacobian",
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }
      });
});

route.get('/', (req, res) => {
    // TODO: Send current user
    res.send({
        "comments": [{
          "id": 1,
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:22:56.637Z",
          "body": "It takes a Jacobian",
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }]
      });
});

route.delete('/:id', (req, res) => {
    
});



module.exports = route;