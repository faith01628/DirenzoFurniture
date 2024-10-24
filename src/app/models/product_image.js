const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const Product = require('./products');

const ProductImage = sequelize.define('productImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    productid: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});


module.exports = ProductImage;

