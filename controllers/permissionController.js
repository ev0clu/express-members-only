const User = require('../models/User');
const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display Member form on GET.
exports.member_get = asyncHandler(async (req, res, next) => {
    res.render('member', { title: 'Join', errors: null });
});

// Display Member form on POST.
exports.member_post = [
    // Validate and sanitize fields.
    body('checkbox').custom((value) => {
        if (value !== 'on') {
            throw new Error('Checkbox must be checked.');
        }
        return true;
    }),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            res.render('member', {
                title: 'Join',
                errors: errors.array()
            });
        } else {
            // Data from form is valid. Update user member status.
            await User.findByIdAndUpdate(req.user.id, { member_status: true });

            return res.redirect('/');
        }
    })
];

// Display Profile form on GET.
exports.profile_get = asyncHandler(async (req, res, next) => {
    res.render('profile', { title: 'Profile', errors: null });
});

// Display Admin form on GET.
exports.admin_get = asyncHandler(async (req, res, next) => {
    res.render('admin', { title: 'Admin', errors: null });
});

// Display Admin form on POST.
exports.admin_post = [
    // Validate and sanitize fields.
    body('admin_key').custom((value) => {
        if (value !== '3.1415') {
            throw new Error('Wrong answer.');
        }
        return true;
    }),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            res.render('admin', {
                title: 'Admin',
                errors: errors.array()
            });
        } else {
            // Data from form is valid. Update user member status.
            await User.findByIdAndUpdate(req.user.id, { admin_status: true });

            return res.redirect('/');
        }
    })
];

// Display Post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('createdBy').exec();

    res.render('post_delete', {
        title: 'Delete Post',
        message: message,
        errors: null
    });
});

// Handle Post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
    // Delete object and redirect to the home page.
    await Message.findByIdAndRemove(req.params.id);
    res.redirect('/');
});

// Display Post delete form on GET.
exports.post_edit_get = asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('createdBy').exec();

    res.render('post_edit', {
        title: 'Edit Post',
        message: message,
        errors: null
    });
});

// Display Post delete form on GET.
exports.post_edit_post = [
    body('title', 'Title must not be empty and it has min. 3 characters.')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('text', 'Text field must not be empty and it has min. 5 characters.')
        .trim()
        .isLength({ min: 5 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            createdBy: req.user.id,
            createdAt: Date.now(),
            _id: req.params.id // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            const message = await Message.findById(req.params.id).populate('createdBy').exec();

            res.render('post_edit', {
                title: 'Edit Post',
                message: message,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            await Message.findByIdAndUpdate(req.params.id, message, {});

            // Redirect to home page.
            res.redirect('/');
        }
    })
];
