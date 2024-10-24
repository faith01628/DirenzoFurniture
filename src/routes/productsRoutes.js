const express = require('express');
const router = express.Router();
const productsController = require('../app/controller/productsController');
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('../config/auth');

router.get('/', authenticateAdminToken, productsController.getAllProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.createProducts);

router.delete('/:id', authenticateBothTokens, productsController.deleteProducts);

router.put('/:id', authenticateUserToken, productsController.updateProducts);

module.exports = router;
