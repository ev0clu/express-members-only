const dateFns = require('date-fns');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 30 },
    text: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    }
});

// Virtual for message's timestamp
messageSchema.virtual('timestamp').get(function () {
    return dateFns.format(this.createdAt, 'MM/dd/yyyy HH:mm');
});

// Virtual for message's URL
messageSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/post/${this._id}`;
});

module.exports = mongoose.model('Message', messageSchema);
