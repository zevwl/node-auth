const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chalk = require('chalk');

let userSchema = new Schema({
    username: {type: String, unique: true},
    name: String,
    password: String,
    admin: Boolean
});

userSchema.post('save', (error, doc, next) => {
    if (error.name == 'MongoError' && error.code === 11000) {
        next(new Error(chalk.red('Duplicate key error.')));
    } else {
        next(error);
    }
});

// Set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', userSchema);