const express = require('express');
const { deleteProduct } = require('../app/controller/deleteProductController');

const router = express.Router();

router.delete('/:productId', deleteProduct);

module.exports = router;
