const express = require('express');
//const cookieSession = require('cookie-session');
//const passport = require('passport');
const passport = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set view engine
//app.set('view engine', 'ejs');

// set up session cookies
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey]
// }));

// initialize passport
// app.use(passport.initialize());
// app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
// app.use('/auth/login', passport.authenticate('google', {scope: ['profile']}), (req,res)=>{
//     res.end();
// });

// app.use('/auth/google/redirect', passport.authenticate('google'),(req, res) => {
//     res.end(JSON.stringify(req.user));
// });

app.use('views/index');

// create home route
app.get('/', (req, res) => {
    res.render('', { user: req.user });
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
