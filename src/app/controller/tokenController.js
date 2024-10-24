const Token = require('../models/token');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.YOUR_SECRET_KEY;

exports.getAllToken = async (req, res) => {
    try {
        const token = await Token.findAll(); // Tìm tất cả các tài khoản
        if (token.length !== 0) {
            res.status(200).json(token);
        } else {
            res.status(404).json({ error: 'Token not found' });
        }
    } catch (err) {
        console.error('Error retrieving token:', err);
        res.status(500).json({ error: 'Failed to retrieve token' });
    }
};

exports.createOrUpdateToken = async (account) => {
    const token = jwt.sign(
        {
            id: account.id,
            username: account.username,
            email: account.email,
            role: account.role,
        },
        secretKey,
        { expiresIn: '1h' }
    );

    const existingToken = await Token.findOne({ where: { accountid: account.id } });

    if (existingToken) {
        existingToken.token = token;
        existingToken.updatedAt = new Date();
        await existingToken.save();
    } else {
        await Token.create({
            token: token,
            accountid: account.id
        });
    }

    return token;
};

exports.deleteToken = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await Token.findByPk(id);
        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }
        await token.destroy();
        res.status(200).json({ message: 'Token deleted successfully' });
    } catch (err) {
        console.error('Error deleting token:', err);
        res.status(500).json({ error: 'Failed to delete token' });
    }
};

exports.unactive = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await Token.findByPk(id);
        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }
        token.active = false;
        await token.save();
        res.status(200).json({ message: 'Token đã bị unactive' });
    } catch (err) {
        console.error('Error unactive token:', err);
        res.status(500).json({ error: 'Failed to unactive token' });
    }
};

exports.active = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await Token.findByPk(id);
        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }
        token.active = true;
        await token.save();
        res.status(200).json({ message: 'Token đã được active' });
    } catch (err) {
        console.error('Error active token:', err);
        res.status(500).json({ error: 'Failed to active token' });
    }
};