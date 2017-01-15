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

const router = require('./app/routes');
const favicon = require('serve-favicon');
const faviconUrl = path.join(__dirname, 'public', 'images', 'favicon.png');
const database = process.env.database;
const secret = process.env.secret;


//=======================
// Configuration
//=======================
const port = process.env.PORT || 8080;
mongoose.connect(database);
app.set('superSecret', secret);

// Tell express where to look for favicon
app.use(favicon(faviconUrl));

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));


//=======================
// Routes
//=======================

app.use('/api', router);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

//=======================
// Start server
//=======================
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);