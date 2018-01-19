const express = require('express');
const path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;


const mongoose = require('./db/mongoose').mongoose;
const {UserDetail} = require('./models/user');

passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username);
    return done(null, false);
    // process.nextTick(function() {
    //     UserDetails.findOne({
    //         'username': username,
    //     }, function(err, user) {
    //         if (err) {
    //             return done(err);
    //         }
    //
    //         if (!user) {
    //             return done(null, false);
    //         }
    //
    //         if (user.password != password) {
    //             return done(null, false);
    //         }
    //
    //         return done(null, user);
    //     });
    // });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local',{
        failureRedirect :'/loginFailure'
    }),function(req, res) {
    res.redirect('/loginSuccess');
});

app.get('/loginFailure',(req,res,next) =>{
    res.send('failed...');
});

app.get('/loginSuccess',(req,res,next) => {
    res.send('success');
});

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'./views','login.html'));
});


app.listen(3000,(err) =>{
    if(err){
        return console.log(err);
    }
    console.log('server is up on port 3000');
});