const Product = require('./products');
const ProductImage = require('./product_image');

// Thiết lập quan hệ giữa Product và ProductImage
Product.hasMany(ProductImage, { foreignKey: 'productid', as: 'productImages' });
ProductImage.belongsTo(Product, { foreignKey: 'productid', as: 'product' });

module.exports = { Product, ProductImage };
