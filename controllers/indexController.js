const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// Display Index page on GET.
exports.index_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}).sort({ createdAt: 1 }).populate('createdBy').exec();
    res.render('index', { title: 'Members Only', allMessages: allMessages });
});
