const express = require('express');
const router = express.Router();
const accountController = require('../app/controller/loginController');

router.post('/', accountController.login);

router.post('/auto', accountController.loginAuto);

module.exports = router;
