const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:{
        type: String,
        reqired: true
    },
    lastName:{
        type: String,
        reqired: true
    },
    email:{
        type: String,
        reqired: true,
        unique: true
    },
    password:{
        type: String,
        reqired: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user',UserSchema)

module.exports = User