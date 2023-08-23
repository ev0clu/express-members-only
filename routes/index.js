var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/indexController');
const auth_controller = require('../controllers/authController');
const permission_controller = require('../controllers/permissionController');

/* GET home page. */
router.get('/', index_controller.index_get);

/* POST home page. */
router.post('/', index_controller.index_post);

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

/* GET request for member form page. */
router.get('/member', permission_controller.member_get);

/* POST request for member form page. */
router.post('/member', permission_controller.member_post);

/* GET request for profile form page. */
router.get('/profile', permission_controller.profile_get);

/* GET request for profile form page. */
router.get('/admin', permission_controller.admin_get);

/* POST request for profile form page. */
router.post('/admin', permission_controller.admin_post);

module.exports = router;
