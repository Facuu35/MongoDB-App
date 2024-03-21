/*

This file is for initializing passport.
Some of this file is provided for you.
Read this file and try to understand what
is happening.

*/

// Require passport dependency
const passport = require('passport')
// Require Google strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { getOrCreateUser } = require('./util')
// Here you will require() anything else you need


// This defines what will be in the session cookie
passport.serializeUser(function (user, done) {
    done(null, user)
})
// Find the user from the session and use result in callback function
passport.deserializeUser(async (user, done) => {
    try {
        done(null, user)
    } catch (error) {
        console.error(error)
        done(error.message)
    }
})

// Here you will set up a connection to Google using variables from your .env file
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // TODO: replace with your value
    callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`,
    // TODO: replace with your value
},
    async function (accessToken, refreshToken, profile, done) {
        try {

            /**
             * TODO: In the code below, replace `let user = { <stuff that is in there now> }`
             * with `let user = <use the getOrCreateUser function>`, see instructions Step 5.
             * This will retrieve the user from mongoDB for you.
             */

            let user = await getOrCreateUser(profile)

            return done(null, user);
        } catch (error) {
            done(error)
        }
    }
));

// Initilize Session storage in MongoDB
const initStore = session => {
    const MongoDbStore = require(`connect-mongodb-session`)(session)
    const store = new MongoDbStore({
        uri: process.env.ATLAS_CONNECTION_STRING,
        collection: `Sessions`,
    }, err => {
        if (err) console.error(err)
        else console.log(`Session Store Initialized`)
    })
    store.on(`error`, console.error)
    return store
}

module.exports = initStore
