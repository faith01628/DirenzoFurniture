const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const thumbnailController = require('../app/controller/thumbnailController');
const { authenticateAdminToken, authenticateBothTokens } = require('../config/auth');

router.get('/', thumbnailController.getAllThumbnail);

router.get('/:id', thumbnailController.getThumbnailById);

router.post('/product', thumbnailController.getThumbnailByName);

router.post('/', upload.single('image'), thumbnailController.createThumbnail);

router.delete('/:id', thumbnailController.deleteThumbnail);

router.put('/:id', upload.single('image'), thumbnailController.updateThumbnail);

module.exports = router;
