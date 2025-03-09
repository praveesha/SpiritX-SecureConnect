const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 8 },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);