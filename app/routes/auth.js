// app/routes/auth.js

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to redirect user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// Route to handle Google's callback and redirect back to client
router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    req.session.save(err => {
        if (err) {
            req.logout();
            res.sendStatus(500);
        } else {
            res.redirect(process.env.CLIENT_ORIGIN);
        }
    });
});

// Logout route
router.get('/logout', async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect(process.env.CLIENT_ORIGIN);
    });
});

module.exports = router;
