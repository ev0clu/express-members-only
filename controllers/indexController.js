const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display Index page on GET.
exports.index_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}).sort({ createdAt: -1 }).populate('createdBy').exec();
    res.render('index', {
        title: 'Members Only',
        allMessages: allMessages,
        errors: null
    });
});

// Display Index page on GET.
exports.index_post = [
    body('message_title', 'Title must not be empty and it has min. 3 characters.')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('message_text', 'Text field must not be empty and it has min. 5 characters.')
        .trim()
        .isLength({ min: 5 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.message_title,
            text: req.body.message_text,
            createdBy: req.user.id
        });

        if (!errors.isEmpty()) {
            const allMessages = await Message.find({})
                .sort({ createdAt: -1 })
                .populate('createdBy')
                .exec();
            res.render('index', {
                title: 'Members Only',
                allMessages: allMessages,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Save the record.
            await message.save();
            res.redirect('/');
        }
    })
];
