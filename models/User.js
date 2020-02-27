const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true//Обязательность поля 
    },
    email:{
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String,
        unique: true
    },
    avatar:{ 
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);