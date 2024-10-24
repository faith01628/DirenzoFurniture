const Product = require('../models/products');
const ProductImage = require('../models/product_image');
const upload = require('../../config/multerConfig');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
// Controller update product
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, desc, material, dimension, imagesToCreate, imagesToUpdate, imagesToDelete } = req.body;

    try {
        // Bước 1: Cập nhật thông tin product
        await Product.update(
            { name, price, desc, material, dimension },
            { where: { id: productId } }
        );
        console.log('Product updated successfully');

        // Bước 2: Xử lý cập nhật hình ảnh (product images)
        // 2.1: Thêm mới hình ảnh
        if (imagesToCreate && imagesToCreate.length > 0) {
            for (let newImage of imagesToCreate) {
                await ProductImage.create({
                    productid: productId,
                    image: newImage
                });
                console.log('Image created successfully');
            }
        }

        // 2.2: Cập nhật hình ảnh
        if (imagesToUpdate && imagesToUpdate.length > 0) {
            for (let updatedImage of imagesToUpdate) {
                await ProductImage.update(
                    { image: updatedImage.image }, // Dữ liệu mới
                    { where: { id: updatedImage.id, productid: productId } } // Tìm đúng hình ảnh để cập nhật
                );
                console.log('Image updated successfully');
            }
        }

        // 2.3: Xóa hình ảnh
        if (imagesToDelete && imagesToDelete.length > 0) {
            for (let deletedImageId of imagesToDelete) {
                await ProductImage.destroy({ where: { id: deletedImageId, productid: productId } });
                console.log('Image deleted successfully');
            }
        }

        return res.status(200).json({ message: 'Product and images updated successfully' });

    } catch (error) {
        console.error('Failed to update product or images:', error);
        return res.status(500).json({ error: 'An error occurred while updating the product or images' });
    }
};


