const Account = require('../models/account');
const upload = require('../../config/multerConfig');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Lấy tất cả các tài khoản
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll(); // Tìm tất cả các tài khoản
        if (accounts.length !== 0) {
            res.status(200).json(accounts);
        } else {
            res.status(404).json({ error: 'account not found' });
        }

    } catch (err) {
        console.error('Error retrieving accounts:', err);
        res.status(500).json({ error: 'Failed to retrieve accounts' }, err);
    }
};

// Lấy tài khoản theo ID
exports.getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByPk(id); // Tìm tài khoản theo ID
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (err) {
        console.error('Error retrieving account:', err);
        res.status(500).json({ error: 'Failed to retrieve account' });
    }
};

// Tạo tài khoản mới với mật khẩu được mã hóa
exports.createAccount = async (req, res) => {
    try {
        const { username, email, password, role, avatar } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Tự động tạo username nếu không có
        const generatedUsername = email.split('@')[0]; // Lấy phần trước '@' của email

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là số rounds để tạo salt

        // Tạo tài khoản mới
        const newAccount = await Account.create({
            username: username || generatedUsername, // Sử dụng username do người dùng nhập hoặc username tự động tạo
            email,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa
            role: role || false,
            avatar: avatar || null,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(newAccount);
    } catch (err) {
        console.error('Error creating account:', err);
        res.status(500).json({ error: 'Failed to create account' });
    }
};



// Xóa tài khoản theo ID
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm tài khoản theo ID
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Xóa tài khoản
        await account.destroy();

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};


// Cập nhật tài khoản theo ID
exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role, avatar } = req.body;

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là số rounds để tạo salt

        // Tìm tài khoản theo ID
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Cập nhật thông tin tài khoản
        account.username = username || account.username; // Giữ nguyên nếu không được cung cấp
        account.email = email || account.email;
        account.password = hashedPassword || account.password;
        account.role = role !== undefined ? role : account.role; // Kiểm tra undefined để không bỏ qua giá trị false
        account.avatar = avatar || account.avatar;
        account.updatedAt = new Date(); // Cập nhật thời gian

        // Lưu thay đổi
        await account.save();

        res.status(200).json(account); // Trả về tài khoản đã cập nhật
    } catch (err) {
        console.error('Error updating account:', err);
        res.status(500).json({ error: 'Failed to update account' });
    }
};

// Hàm xử lý upload avatar trong accountController.js
exports.uploadAvatar = async (req, res) => {
    try {
        // Sử dụng upload.single('avatar') để xử lý upload file
        upload.single('avatar')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // Lỗi xử lý upload file
                console.error('Error uploading avatar:', err);
                res.status(500).json({ error: 'Failed to upload avatar' });
            } else if (err) {
                // Lỗi khác
                console.error('Error uploading avatar:', err);
                res.status(500).json({ error: 'Failed to upload avatar' });
            } else {
                // Upload thành công
                const { id } = req.params;

                // `req.file` chứa thông tin về file đã được upload
                if (!req.file) {
                    return res.status(400).json({ error: 'No file uploaded' });
                }

                // Cập nhật thông tin avatar trong cơ sở dữ liệu
                const account = await Account.findByPk(id);
                if (!account) {
                    return res.status(404).json({ error: 'Account not found' });
                }

                // Update account avatar with the uploaded file's path
                // account.avatar = req.file.path.replace(/^.*(\\access\\uploads\\)/, 'access/uploads/'); // `req.file` holds the uploaded file object
                // await account.save();

                // res.status(200).json({ message: 'Avatar uploaded successfully', account });

                const relativePath = path.relative(path.join(__dirname, '../../'), req.file.path);

                // Cập nhật avatar trong cơ sở dữ liệu với đường dẫn tương đối
                account.avatar = relativePath.replace(/\\/g, '/'); // Chuyển đổi dấu \ thành / nếu cần
                await account.save();

                res.status(200).json({ message: 'Avatar uploaded successfully', account });
            }
        });
    } catch (err) {
        console.error('Error uploading avatar:', err);
        res.status(500).json({ error: 'Failed to upload avatar' }, console.error('Error uploading avatar:', err));
    }
};
