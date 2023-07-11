var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/indexController');
const form_controller = require('../controllers/formController');

/* GET home page. */
router.get('/', index_controller.index_get);

/* GET request for  up page. */
router.get('/signup-form', form_controller.signup_get);

router.post('/signup-form', form_controller.signup_post);

router.get('/login-form', form_controller.login_get);

router.post('/login-form', form_controller.login_post);

module.exports = router;
