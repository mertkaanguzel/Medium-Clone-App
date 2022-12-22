const { Router } = require('express');
const { Tag } = require('../../models/index');
const route = Router();

route.get('/', async (req, res) => {
  const list = [ { name: 'reactjs' }, { name: 'angularjs' }, { name: 'dragons' } ];  
  let result = await Tag.bulkCreate(list, {
    updateOnDuplicate: ['name'],
  });
  res.send(result);
});

module.exports = route;