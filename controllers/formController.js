const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const images = [
    { name: 'bear', url: '/images/avatars/bear.png' },
    { name: 'fish', url: '/images/avatars/fish.png' },
    { name: 'fox', url: '/images/avatars/fox.png' },
    { name: 'giraffe', url: '/images/avatars/giraffe.png' },
    { name: 'panda', url: '/images/avatars/panda.png' },
    { name: 'rabbit', url: '/images/avatars/rabbit.png' }
];

// Display Sign up form on GET.
exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render('signup-form', { title: 'Sign Up', images: images, errors: null });
});

// Display Sign up form on POST.
exports.signup_post = [
    // Validate and sanitize fields.
    // Validate and sanitize fields.

    body('first_name', 'First name must be min. 3 and max. 20 characters')
        .trim()
        .isLength({ min: 1, max: 20 })
        .escape(),
    body('last_name', 'Last name must be min. 3 and max. 20 characters')
        .trim()
        .isLength({ min: 1, max: 20 })
        .escape(),
    body('username', 'Username must be min. 4 and max. 10 characters')
        .trim()
        .isLength({ min: 4, max: 10 })
        .custom(async (username) => {
            const existingUsername = await User.findOne({ username });

            if (existingUsername) {
                throw new Error('Username already in use');
            }
        })
        .escape(),
    body('password', 'Password must be min. 4 and max. 10 characters')
        .trim()
        .isLength({ min: 4, max: 10 })
        .escape(),
    body('confirm-password', 'Password fields do not match')
        .trim()
        .custom((confirmPassword, { req }) => confirmPassword === req.body.password)
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a User object with escaped and trimmed data.
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            member_status: req.body.member_status,
            admin_status: req.body.admin_status,
            image: req.body.avatar
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            res.render('signup-form', {
                title: 'Sign Up',
                images: images,
                errors: errors.array()
            });
        } else {
            // Data from form is valid. Save movie.
            await user.save();
            res.redirect('/');
        }
    })
];

// Display Log in form on GET.
exports.login_get = asyncHandler(async (req, res, next) => {
    res.render('login-form', { title: 'Log in', errors: null });
});

// Display Log in form on POST.
exports.login_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: login POST');
});
/*
// Handle Director create on POST.
exports.signup_post = [
    // Validate and sanitize fields.
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.'),
    body('last_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Last name must be specified.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_death', 'Invalid date of death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Director object with escaped and trimmed data
        const director = new Director({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('director_form', {
                title: 'Create Director',
                director: director,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            // Save director.
            await director.save();
            // Redirect to new director record.
            res.redirect(director.url);
        }
    })
];*/
