const { Router } = require('express');

const route = Router();
const { createArticle, getArticle, toggleFavorite, listArticles, deleteArticle } = require('../../../controllers/article');
const { userAuthorization } = require('../../../middlewares/auth');

route.use('/comments', require('./comments'));
route.use('/:slug/comments', require('./comments'));

route.get('/', userAuthorization, listArticles);

route.post('/', userAuthorization, createArticle);

route.get('/feed', (req, res) => {
    res.send({
        "articles":[{
          "slug": "how-to-train-your-dragon",
          "title": "How to train your dragon",
          "description": "Ever wonder how?",
          "body": "It takes a Jacobian",
          "tagList": ["dragons", "training"],
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:48:35.824Z",
          "favorited": false,
          "favoritesCount": 0,
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }, {
          "slug": "how-to-train-your-dragon-2",
          "title": "How to train your dragon 2",
          "description": "So toothless",
          "body": "It a dragon",
          "tagList": ["dragons", "training"],
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:48:35.824Z",
          "favorited": false,
          "favoritesCount": 0,
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }],
        "articlesCount": 2
      });
});

route.post('/:slug/favorite', userAuthorization, toggleFavorite);

route.delete('/:slug/favorite', userAuthorization, toggleFavorite);

route.get('/:slug', userAuthorization, getArticle);

route.put('/:slug', (req, res) => {
    res.send({
        "article": {
          "slug": "how-to-train-your-dragon",
          "title": "How to train your dragon",
          "description": "Ever wonder how?",
          "body": "It takes a Jacobian",
          "tagList": ["dragons", "training"],
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:48:35.824Z",
          "favorited": false,
          "favoritesCount": 0,
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }
      });
});

route.delete('/:slug', userAuthorization, deleteArticle);




module.exports = route;