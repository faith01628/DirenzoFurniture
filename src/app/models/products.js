const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    material: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dimension: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

module.exports = Product;
