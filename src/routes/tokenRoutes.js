const express = require('express');
const router = express.Router();
const tokenController = require('../app/controller/tokenController');
const { authenticateAdminToken } = require('../config/auth');

router.get('/', authenticateAdminToken, tokenController.getAllToken);

router.put('/:id', authenticateAdminToken, tokenController.unactive);

router.put('/:id/active', authenticateAdminToken, tokenController.active);

router.delete('/:id', authenticateAdminToken, tokenController.deleteToken);

module.exports = router;
