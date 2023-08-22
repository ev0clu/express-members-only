var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/indexController');
const auth_controller = require('../controllers/authController');

/* GET home page. */
router.get('/', index_controller.index_get);

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
