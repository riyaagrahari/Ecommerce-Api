const express = require('express');
const router = express.Router();

const logoutController = require('../Controllers/logout')
const loginController = require('../Controllers/postLogin')
const signupController = require('../Controllers/signup')

router.post('/login', loginController);

router.get('/logout', logoutController);

router.post('/signup', signupController);

module.exports = router;