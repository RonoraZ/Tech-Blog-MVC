//Creating the route for express 

const router = require('express').Router(); 

//Creating routes to import from api folder 

const apiRoutes = require('./api'); 

//Creating route to import from home-route 

const homeRoutes = require('./home-routes.js'); 

//Creating route to import from dashboard-routes 

const dashboardRoutes = require('./dashboard-routes.js'); 

//Creating the direction of the routes that will be used . 
const commentRoutes = require('./api/comment-routes');
const postRoutes = require ('./api/post-routes'); 
const userRoutes = require('./api/user-routes') 

console.log(userRoutes);

router.use('/comment',commentRoutes); 
router.use('/post-routes',postRoutes); 
router.use('/user-routes',userRoutes);
router.use('/',homeRoutes); 
router.use('/api',apiRoutes); 
router.use('/dashboard',dashboardRoutes); 

module.exports = router;