var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const auth_controller = require('../controllers/authController');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

/* GET request for signup form page. */
router.get('/signup', auth_controller.signup_get);

/* POST request for signup form page. */
router.post('/signup', auth_controller.signup_post);

/* GET request for login form page. */
router.get('/login', auth_controller.login_get);

/* POST request for login form page. */
router.post('/login', auth_controller.login_post);

/* GET request for logout form page. */
router.get('/logout', auth_controller.logout_get);

module.exports = router;
