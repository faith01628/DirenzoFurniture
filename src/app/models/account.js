const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

// Định nghĩa mô hình Account
const Account = sequelize.define('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Thiết lập Id là khóa chính
        autoIncrement: true,  // Tự động tăng giá trị Id
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,  // Giá trị mặc định là false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,  // Cho phép giá trị null nếu không có avatar
    },
});

module.exports = Account;
