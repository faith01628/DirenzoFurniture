const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const product_imageController = require('../app/controller/product_imageController');
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('../config/auth');

router.get('/', product_imageController.getAllProductImage);

router.get('/:id', product_imageController.getProductImageById);

router.post('/', upload.single('image'), product_imageController.createProductImage);

router.delete('/:id', authenticateAdminToken, product_imageController.deleteProductImage);

router.put('/:id', upload.single('image'), product_imageController.updateProductImage);

module.exports = router;
