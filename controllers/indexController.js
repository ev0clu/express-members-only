const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// Display Index page on GET.
exports.index_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}).sort({ createdAt: 1 }).populate('createdBy').exec();
    res.render('index', { title: 'Members Only', allMessages: allMessages });
});

// Display Index page on GET.
exports.index_post = asyncHandler(async (req, res, next) => {
    const message = new Message({
        title: req.body.title,
        text: req.body.new_message,
        createdBy: req.user.id
    });

    await message.save();
    res.redirect('/');
});
