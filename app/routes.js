const express = require('express');
const router = express.Router();
const routerController = require('./controllers/router.controller');

// Export router
module.exports = router;


// Lock the app to only allow authenticated users
router.use(routerController.middleware);


// route to show a random message (GET http://localhost:8080/api/)
router.get('/', routerController.main);

/**
 * API routes
 */

// Setup route
router.get('/setup', routerController.setup);

router.get('/users', routerController.showUsers);

router.get('/authenticate', routerController.authenticate);
router.post('/authenticate', routerController.authenticate);

// TODO: route middleware to verify a token

