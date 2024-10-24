const Product = require('../models/products');
const ProductImage = require('../models/product_image');

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Find all images associated with the product
        const productImages = await ProductImage.findAll({ where: { productid: productId } });

        if (productImages.length > 0) {
            // Delete all images first
            await ProductImage.destroy({ where: { productid: productId } });
        }

        // Now delete the product itself
        const deletedProduct = await Product.destroy({ where: { id: productId } });

        if (deletedProduct) {
            return res.status(200).json({ message: 'Product and associated images deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
};

module.exports = { deleteProduct };
