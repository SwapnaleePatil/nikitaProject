const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const session  = require('express-session');
const path = require('path');


let user = require('./models/user').user;

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({secret : 'key'}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/user',(er,db)=>{
    useMongoClient : true
});

passport.use(new strategy(
    function (username,password,callback) {
    //console.log('in middleware....');
        user.findOne({username}).then((doc) => {

            if(!doc){
                console.log('!doc : ',doc);
                return callback(null,false);
            }else if(doc.password!==password){
                console.log('invalid password : ',doc);
                return callback(null,false);
            }else {
                console.log('successful : ',doc);
                return callback(null,doc);
            }
        }).catch((e) => {
            cosole.log('in cacth');
             callback(e);
        });
    }
));

passport.serializeUser((user,callback) => {
    console.log('ser');
    callback(null,user.id);
});

passport.deserializeUser((id,callback) => {
    user.findById(id,(err,user) => {
        console.log('deser');
        if(err){
            return callback(err);
        }
        callback(err,user);
    });
});


app.set('views',__dirname,'/views');
app.set('view engine','html');

app.get('/login',(req,res) => {
    //res.send('hello');
    res.sendfile('./views/login.html');
});


/*
* METHOD : post
* PURPOSE : to authenticate user without using passport
* */
// app.post('/login',(req,res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     console.log(username+' : '+password);
//     user.findOne({username}).then((doc) => {
//         console.log(doc);
//         if(doc.password === password){
//             res.send(doc);
//         }else {
//             //res.send('invalid password ...!');
//             res.sendfile('./views/login.html');
//         }
//
//     }).catch((e) => {
//         console.log(e);
//         res.send('invalid username');
//     });
//
// });


app.post('/login',passport.authenticate('local', {
    failureRedirect : '/login',
    successRedirect : '/successLogin'
}));
app.get('/successLogin',(req,res) => {
    let s = req.session;
    console.log(s);
    //res.sendfile('./views/successfulLogin.html');
   // res.send(s);
    res.sendFile(path.join(__dirname,'views','successfulLogin.html'),{session : s});
});
app.post('/successLogin',(req,res) => {
    //res.send('welcome');

    console.log('post');
    res.send({user : req.user});
});

app.post('/insert',(req,res) => {
    let u = new user({
        username:req.body.username,
        password:req.body.password
    });

    u.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.send(e);
    });
});

app.get('/display',(req,res) =>{
    user.find().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.send(e);
    });
});

app.get('/logout',function (req,res) {
    console.log('before logout',req.session);
    req.logout();
    console.log('after logout',req.session);
    //res.send('logged out');
    ///res.sendfile('./views/login.html');
    res.sendfile('./views/login.html');
});
app.listen(3000,(e)=>{
    if(e){
        console.log('error : ',e);
    }
    console.log('server is up on port : 3000');
});