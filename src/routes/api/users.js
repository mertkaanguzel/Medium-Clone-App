const { Router } = require('express');
const { verifyUser, createUser} = require('../../controllers/users');
const route = Router();

route.post('/', async (req, res) => {
  try {
    const createdUser = await createUser(req.body.user);
    res.send(createdUser);
  }catch(error) {
    res.status(422).send({
      errors: {
        body: [error.message] 
      }
    });
  }
});

route.post('/login', async (req, res) => {
  try {
    const verifiedUser = await verifyUser(req.body.user);
    res.send(verifiedUser);
  }catch(error) {
    res.status(422).send({
      errors: {
        body: [error.message] 
      }
    });
  }
});

module.exports = route;