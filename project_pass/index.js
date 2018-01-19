var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var path = require('path');
//var users = require('./db/users');
var mongoose =  require('mongoose');


var User = require('./db/user').user;
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/user',(er,db) => {
    useMongoClient : true;
});


app.use(passport.initialize());
app.use(passport.session());

// passport.use(new Strategy(
//     function (username,password,cb) {
//         console.log(username+'  :  '+password);
//         users.findByName(username,(err,user) => {
//             if(err){
//                 console.log('error >',user);
//                 return cb(err);
//             }else if(!user){
//                 console.log('user not found ',user);
//                 return cb(null,false);
//             }else if(user.password!=password){
//                 console.log('incorect password ',user);
//                 return cb(null,false);
//             }else {
//                 console.log('corect: ',user);
//                 return cb(null,user);
//             }
//         });
// }));


passport.use(new Strategy(
    function (username,password,cb) {

        //console.log(username+'  :  '+password);

        User.findOne({username}).then((doc) =>{
           // console.log('result from database : ',doc);
            //res.send({doc});
            //cb(doc);
            if(!doc){
                //console.log('user not found ',doc);
                return cb(null,false);
            }else if(doc.password!=password){
                //console.log('incorect password ',doc);
                return cb(null,false);
            }else {
               // console.log('corect: ',doc);
                return cb(null,doc);
            }
        },(e) => {
            cb(e);
            //res.status(400).send('error',e);
        });
    }
));


passport.serializeUser(function (user,cb) {
    //console.log(user.id);
    cb(null,user.id);
});

passport.deserializeUser(function (id,cb) {
    db.users.findById(id,(err,user) => {
        if(err){
            return cb(err);
        }
        return cb(null,user);
    });
});



app.use(bodyParser.urlencoded({extended : true}));
//app.use(b.
// odyParser.json());

app.get('/data',(req,res) => {
    User.find({}).then((doc) =>{
        console.log('result from database : ',doc);
        res.send({doc});
       // cb(doc);
    },(e) => {
        //cb(e);
        res.status(400).send('error',e);
    });
    }
);


app.get('/login',(req,res) => {
    res.sendfile('./views/login.html')
    //res.sendFile(path.join(__dirname,'./views','login.html'));
});

app.post('/insert',(req,res) => {
    var u = {
        username : req.body.username,
        password : req.body.password
    }
    var u1 = new User(u);
    u1.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.send(e);
    });
});

app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/loginSuccess',
    }));

app.get('/loginSuccess',(req,res,next) => {
    res.send('success');
});

app.listen(3000,(er)=>{
    if(er){
    return console.log('error : ',er);
    }
    console.log('server is up on port 3000');
});