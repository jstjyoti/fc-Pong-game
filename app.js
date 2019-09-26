const express= require("express");
const path= require('path');
const fs= require('fs');
const session=require("express-session");
const authRoutes = require('./routes/auth-routes');
const passport = require('./config/passport-setup');
// const mongoose = require('mongoose');
// const keys = require('./config/keys');
const app=express();

app.use(passport.initialize());
app.use(session({
    secret: 'Js',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
// // connect to mongoose
// mongoose.connect(keys.mongodb.dbURI, (err) => {
//     if(err){
//         console.log(err);
//     }
//     console.log('connected to mongoose');
// });

app.use(express.static('public'));

//set up routes
app.use('/auth', authRoutes);


app.get('/', (req,res)=>{
    // res.render('index.html');
    res.sendFile('index.html',{root: path.join(__dirname, '/views')});
});


app.listen(process.env.PORT || 5000,()=>{
    console.log(' app listening on port 5000');
});
