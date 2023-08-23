const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display Sign up form on GET.
exports.member_get = asyncHandler(async (req, res, next) => {
    res.render('member', { title: 'Join', errors: null });
});

// Display Sign up form on POST.
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
            console.log('asd');
            // Data from form is valid. Update user member status.
            await User.findByIdAndUpdate(req.user.id, { member_status: true });

            return res.redirect('/');
        }
    })
];
