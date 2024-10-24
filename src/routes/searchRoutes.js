const express = require('express');
const router = express.Router();
const searchController = require('../app/controller/searchController');


router.get('/', searchController.getAllProductSearch);

router.get('/:id', searchController.getSearchById);

router.post('/', searchController.getSearchByName);


module.exports = router;
