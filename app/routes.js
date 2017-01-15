const express = require('express');
const router = express.Router();
const routerController = require('./controllers/router.controller');

// Export router
module.exports = router;

//=======================
// API routes
//=======================

// Setup route
router.get('/setup', routerController.setup);

router.get('/authenticate', routerController.authenticate);
router.post('/authenticate', routerController.authenticate);

//=======================
// Everything form here down is locked
//=======================
router.use(routerController.middleware);

// route to show a random message (GET http://localhost:8080/api/)
router.get('/', routerController.main);

// Get all users
router.get('/users', routerController.showUsers);

