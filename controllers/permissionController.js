const User = require('../models/User');
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

// Display Profile form on GET.
exports.admin_get = asyncHandler(async (req, res, next) => {
    res.render('admin', { title: 'Admin', errors: null });
});

// Display Profile form on POST.
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
