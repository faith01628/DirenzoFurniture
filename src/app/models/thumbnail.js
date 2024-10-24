const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Thumbnail = sequelize.define('thumbnail', {
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
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Thumbnail;