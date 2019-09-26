const express= require("express");
const path= require('path');
const fs= require('fs');
const session=require("express-session");
const authRoutes = require('./routes/auth-routes');
const passport = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app=express();

app.use(passport.initialize());
app.use(session({
    secret: 'Js',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
// connect to mongoose
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongoose');
});

app.use(express.static('public'));

//set up routes
app.use('/auth', authRoutes);
// app.use('/auth/index', passport.authenticate('google', {scope: ['profile']}), (req,res)=>{
    
// });

// app.use('/auth/google/redirect', passport.authenticate('google'),(req, res) => {
//     res.redirect(res.sendFile('main.html',{root: path.join(__dirname, '/views')}));
// });


app.get('/', (req,res)=>{
    // res.render('index.html');
    res.sendFile('index.html',{root: path.join(__dirname, '/views')});
});


app.listen(3000,()=>{
    console.log(' app listening on port 3000');
});
