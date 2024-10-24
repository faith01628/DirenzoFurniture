const { Sequelize } = require('sequelize');
require('dotenv').config();


const UserDatbase = process.env.USER_NAME_DATABASE;
const HostDatbase = process.env.HOST_DATABASE;
const PasswordDatbase = process.env.PASSWORD_DATABASE;

// Thiết lập kết nối đến MySQL
const sequelize = new Sequelize('sql_furni1_trans', UserDatbase, PasswordDatbase, {
    host: HostDatbase,
    dialect: 'mysql',
    logging: false,
});


module.exports = sequelize;
