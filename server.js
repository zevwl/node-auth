// Load environment variables
require('dotenv').config();

/**
 * Dependencies
 */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// const jwt = require('jsonwebtoken');    // used to create, sign and verify tokens
const config = require('./config');
// const User = require('./app/models/user');
const router = require('./app/routes');
const favicon = require('serve-favicon');
const faviconUrl = path.join(__dirname, 'public', 'images', 'favicon.png');

/**
 * Configuration
 */
const port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// Tell express where to look for favicon
app.use(favicon(faviconUrl));

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Set routes
// app.use(require('./app/routes'));
app.use('/api', router);

app.get('/', (req, res) => {
    res.send(`Hello! The API is at http://localhost:${port}/api`);
});

/**
 * Start server
 */
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);