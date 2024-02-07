// config/passport.js
require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); 

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create a user based on Google profile information
                const existingUser = await User.findOne({
                    googleId: profile.id,
                });

                if (existingUser) {
                    // User already exists, return the user
                    return done(null, existingUser);
                }

                // User doesn't exist, create a new user in the database
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                });

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
    // Use the userId to fetch user information from the database
    cb(null, await User.findById(userId));
});

module.exports = passport;
