const express = require('express');
const router = express.Router();
const accountController = require('../app/controller/accountController');
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('../config/auth');

router.get('/', accountController.getAllAccounts);

router.get('/:id', accountController.getAccountById);

router.post('/', accountController.createAccount);

router.put('/:id', authenticateUserToken, accountController.updateAccount);

router.delete('/:id', accountController.deleteAccount);

router.put('/upload-avatar/:id', accountController.uploadAvatar);

module.exports = router;
