const { Router } = require('express');

const route = Router();
const { createArticle, getArticle, toggleFavorite, listArticles, deleteArticle, updateArticle } = require('../../../controllers/article');
const { userAuthorization } = require('../../../middlewares/auth');

//route.use('/comments', require('./comments'));
route.use('/:slug/comments', require('./comments'));

route.get('/', listArticles);

route.post('/', userAuthorization, createArticle);

route.get('/feed', userAuthorization, listArticles);

route.post('/:slug/favorite', userAuthorization, toggleFavorite);

route.delete('/:slug/favorite', userAuthorization, toggleFavorite);

route.get('/:slug', userAuthorization, getArticle);

route.put('/:slug', userAuthorization, updateArticle);

route.delete('/:slug', userAuthorization, deleteArticle);




module.exports = route;