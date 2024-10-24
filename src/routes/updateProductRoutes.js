const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const updateProductController = require('../app/controller/updateProductController');
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('../config/auth');

router.put('/:id', updateProductController.updateProduct);


module.exports = router;
