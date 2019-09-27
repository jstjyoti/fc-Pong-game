const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const passport = require('../config/passport-setup');


router.use(session({
    secret: 'Js',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// auth login
router.get('/login', (req, res) => {
        res.sendFile('index.html', { root: path.join(__dirname, '../', '/views') })
   
});
router.get('/main', (req, res) => {
    if(req.session.user){
        res.sendFile('main.html', { root: path.join(__dirname, '../', '/views') });
    }
    else{
        res.send("invalid login");
    }
   
});
// auth logout
router.get('/logout', (req, res) => {
    // sessions remove
    req.session.destroy(
        (err)=>{
            res.sendFile('logout.html', { root: path.join(__dirname, '../', '/views') });
        }
    )
    

});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    req.session.user = req.user;
    // res.send(JSON.stringify(req.user));
    res.redirect("/auth/main")
});

module.exports = router;