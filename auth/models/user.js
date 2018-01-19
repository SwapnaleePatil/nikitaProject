const mongoose = require('mongoose');

var UserDetail  = new mongoose.Schema({
    username: String,
    password: String
}, {
    collection: 'userInfo'
});


var UserDetail = mongoose.model('User',UserDetail );

module.exports={UserDetail};
