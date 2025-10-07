const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Password for each user
    role: { type: String, required: true },
    canAddEvidence: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);