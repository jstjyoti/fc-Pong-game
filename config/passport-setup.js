const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const keys = require('./keys');
const User = require('../models/user-model');
const mongoose = require('mongoose');
const keys = require('../config/keys');
// connect to mongoose
mongoose.connect(keys.mongodb.dbURI, (err) => {
    if(err){
        console.log(err);
    }
    console.log('connected to mongoose');
});
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    //User.findById(id).then((user) => {
        done(null, user);
    //});
});

passport.use(
    new GoogleStrategy({ 
        callbackURL : '/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile.photos[0].value,
                    level: 1,
                    score: 0,
                    speed: 4
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
        //return done(null,profile);
    })
);

module.exports=passport;