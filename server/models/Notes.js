const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  //Foreign key
        ref: 'user'
    },
    title:{
        type: String,
        reqired: true
    },
    description:{
        type: String,
        reqired: true,
        unique: true
    },
    tag:{
        type: String,
        reqired: true
    },
    pinned:{
        type: Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes',NotesSchema)