const { Router } = require('express');

const route = Router({ mergeParams: true });;
const { createComment, getComments, deleteComment } = require('../../../controllers/comment');
const { userAuthorization } = require('../../../middlewares/auth');

route.post('/', userAuthorization, createComment);

route.get('/', userAuthorization, getComments);

route.delete('/:id', userAuthorization, deleteComment);



module.exports = route;