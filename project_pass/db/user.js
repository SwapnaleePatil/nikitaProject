const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

var user = mongoose.model('user',UserSchema);

module.exports={user};

