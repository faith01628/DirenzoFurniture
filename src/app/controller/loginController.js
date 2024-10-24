const Account = require('../models/account');
const bcrypt = require('bcrypt');
const { createOrUpdateToken } = require('./tokenController');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const account = await Account.findOne({ where: { email } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = await createOrUpdateToken(account);

        res.status(200).json({
            message: 'Login successful',
            token,   // Trả về token
            account: {
                id: account.id,
                username: account.username,
                email: account.email,
                role: account.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginAuto = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const account = await Account.findOne({ where: { email } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        if (password !== account.password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = await createOrUpdateToken(account);

        res.status(200).json({
            message: 'Login successful',
            token,   // Trả về token
            account: {
                id: account.id,
                username: account.username,
                email: account.email,
                role: account.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};