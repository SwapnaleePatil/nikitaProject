const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true
    },password:{
        type : String,
        required : true
    }
});

let user = mongoose.model('users',userSchema);

module.exports={user}