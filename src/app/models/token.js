const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const Account = require('./account');

const Token = sequelize.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    accountid: {
        type: DataTypes.INTEGER,
        references: {
            model: Account, // Tên của model mà khóa ngoại tham chiếu
            key: 'id', // Khóa chính của model Account
        },
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,  // Giá trị mặc định là false
    }
});

module.exports = Token;