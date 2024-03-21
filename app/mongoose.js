require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

// Access Atlas connection string from environment variables
const atlasConnectionString = process.env.ATLAS_CONNECTION_STRING; // Corrected to use process.env

// Connect to MongoDB using Mongoose
mongoose.connect(atlasConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoose;
