const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display Index page on GET.
exports.index_get = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Members Only' });
});
