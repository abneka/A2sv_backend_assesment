const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const recipeRoute = require('./recipe.route'); // Import the recipe routes
const commentRoute = require('./comment.route'); // Import the comment routes
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/recipes', // Add the recipe routes
    route: recipeRoute,
  },
  {
    path: '/comments', // Add the comment routes
    route: commentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
