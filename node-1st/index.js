/**
 * index.js main file
 * use for route
 * createdAt: 1/5/18
 * Author: Nikita
 * last update: 1/5/18 2:54 PM
 * */

// inject express in app
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config/config');

let app = express();

app.use(bodyParser.urlencoded({ extended: true })); // for use body-parser in app (get data from post method)

/**
 * to display name to the user
 * url GET /
 * @param {req} incoming REQUEST object
 * @param {res} RESPONSE object
 * @return name of user
 * */
app.get('/',(req,res) => {
    //res.send('hello world');
    res.json({name : 'harry'});
});

app.post('/xyz',(req,res)=> {
    res.send(req.body);

});

app.get('/my',(req,res)=>{
    res.send(req.query.name)
    res.end()
});

app.get('/my/:id',(req,res)=>{
    res.jsonp({name:'hp',id_key: req.params.id})
    res.end()
});

app.listen(config.port,(e) => {
    console.log('server up on ',config.port);
});

