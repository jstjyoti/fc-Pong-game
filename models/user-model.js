const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    level: Number,
    score: Number,
    speed: Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;