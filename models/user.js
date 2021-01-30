const mongoose = require('mongoose')


var user = new mongoose.Schema({

    'id': String,
    'name': String,
    'email': {
        type: String,
        unique: true
    },
    'password': String,
    "refreshToken": String,
    "photoURL": String




});

module.exports = mongoose.model("siteuser", user);