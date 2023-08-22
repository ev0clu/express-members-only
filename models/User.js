const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, minLength: 1, maxLength: 20 },
    last_name: { type: String, required: true, minLength: 1, maxLength: 20 },
    username: { type: String, required: true, minLength: 4, maxLength: 10 },
    password: { type: String, required: true },
    member_status: { type: Boolean, default: false },
    admin_status: { type: Boolean, default: false },
    image: { type: String }
});

// Virtual for user's full name
userSchema.virtual('name').get(function () {
    return `${this.last_name}, ${this.first_name}`;
});

// Virtual for user's full name
userSchema.virtual('img').get(function () {
    return `/images/avatars/${this.image}.png`;
});

module.exports = mongoose.model('User', userSchema);
