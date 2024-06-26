const mongoose = require('mongoose');
const authConfig = require('../config/auth')

const sessionSchema = new mongoose.Schema({
    idUser: { type: String, ref: 'User', required: true },
    userName: { type: String, ref: 'User', required: true },
    token: { type: String, required: true },
    dtSession: { type: String, required: true, default: Date.now() }

});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;