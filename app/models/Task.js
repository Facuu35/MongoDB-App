/*
This file is for creating a Mongoose Model/Schema
*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    // TODO: define the necessary fields for Task, using documentation (see instructions Step 5.Models.2)
    UserId: String, // String is shorthand for {type: String}
    Text: String,
    Done: Boolean,
    Date: String
}, { /** TODO: specify the collection here (see instructions) */ });

// TODO: convert your `taskSchema` into a model, using the documentation (Step 5.Models.2).

const Task = mongoose.model('task', taskSchema);

module.exports = Task;

