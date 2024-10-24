const ProductImage = require('../models/product_image');
// const Account = require('../models/account');
// const upload = require('../../config/multerConfig');
// const multer = require('multer');
// const path = require('path');

// Lấy tất cả các tài khoản
exports.getAllProductImage = async (req, res) => {
    try {
        const productImage = await ProductImage.findAll(); // Tìm tất cả các tài khoản
        if (productImage.length !== 0) {
            res.status(200).json(productImage);
        } else {
            res.status(404).json({ error: 'product image not found' });
        }

    } catch (err) {
        console.error('Error retrieving product image:', err);
        res.status(500).json({ error: 'Failed to retrieve product image' }, err);
    }
};

// Lấy tài khoản theo ID
exports.getProductImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const productImage = await ProductImage.findByPk(id); // Tìm tài khoản theo ID
        if (!productImage) {
            return res.status(404).json({ error: 'product image not found' });
        }
        res.status(200).json(productImage);
    } catch (err) {
        console.error('Error retrieving product image:', err);
        res.status(500).json({ error: 'Failed to retrieve product image' });
    }
};

exports.createProductImage = async (req, res) => {
    try {
        const { productid } = req.body;
        const image = req.file.path.replace(/^.*(\\access\\uploads\\)/, 'access/uploads/');

        if (!productid || !image) {
            return res.status(400).json({ error: 'productid and image are required' });
        }

        const newProductImage = await ProductImage.create({
            productid: productid,
            image: image,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(newProductImage);
    } catch (err) {
        console.error('Error creating Product image:', err);
        res.status(500).json({ error: 'Failed to create Product image' });
    }
};


exports.deleteProductImage = async (req, res) => {
    try {
        const { id } = req.params;

        const productImage = await ProductImage.findByPk(id);
        if (!productImage) {
            return res.status(404).json({ error: 'product image not found' });
        }

        await productImage.destroy();

        res.status(200).json({ message: 'product image deleted successfully' });
    } catch (err) {
        console.error('Error deleting product image:', err);
        res.status(500).json({ error: 'Failed to delete product image' });
    }
};

exports.updateProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { productid } = req.body;
        const image = req.file.path.replace(/^.*(\\access\\uploads\\)/, 'access/uploads/');

        const productImage = await ProductImage.findByPk(id);
        if (!productImage) {
            return res.status(404).json({ error: 'product image not found' });
        }

        productImage.productid = productid || productImage.productid;
        productImage.image = image || productImage.image;
        productImage.updatedAt = new Date();

        await productImage.save();

        res.status(200).json(productImage);
    } catch (err) {
        console.error('Error updating product image:', err);
        res.status(500).json({ error: 'Failed to update product image' });
    }
};
