const User = require('../models/user');
const jwt = require('jsonwebtoken');    // used to create, sign and verify tokens
const secret = process.env.SECRET;

module.exports = {
    main,
    setup,
    showUsers,
    authenticate,
    middleware
};

// Main route
function main(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
}

function setup(req, res) {

    // Create sample user
    let nick = new User({
        username: 'nick',
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });

    // Save the sample user
    nick.save((err) => {
        if (err) {
            throw err;
        }

        console.log('User saved successfully!');
        res.json({ success: true });
    });
}

// Return all users (GET http://localhost:8080/api/users)
function showUsers(req, res) {

    User.find({}, (err, users) => {
        res.json(users);
    });
}

function authenticate(req, res) {

    if (req.method === 'GET') {
        return res.send('Authenticate only via POST.');
    }

    User.findOne({ username: req.body.username }, (err, user) => {

        if (err) {
            throw err;
        }

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });

        } else if (user) {

            // Check if password matches
            if (user.password != req.body.password)  {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                let token = jwt.sign(user, secret, {
                    expiresIn: '1440m'  // expires in 24 hours
                });

                // Return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
}

function middleware(req, res, next) {

    // Check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Decode token
    if (token) {

        // Verifies secret and checks exp
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {

                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        // if there is no token, return an error
        return res.status(403).send({ success: false, message: 'No token provided.' });

    }
}