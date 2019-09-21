// const express=require("express");
// const app=express();

// app.use(req,res,()=>{

// })

// const mongo=require("mongodb");
// const md=mongo.MongoClient;
// md.connect("mongodb://localhost:27018/test",{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/main-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session().catch(err => console.log(err)););


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/index', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('', { user: req.user });
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
