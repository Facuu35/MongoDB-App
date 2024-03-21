/*
This file is for creating a Mongoose Model/Schema
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // TODO: define the necessary fields for User
    Id: String, // String is shorthand for {type: String}
    Email: String,
    UserName: String
}, { /** TODO: specify the collection here (see instructions) */ });

// Convert the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;

// TODO: add your model here to export it.
// Anything in module.exports is accessible from other files.
