const Thumbnail = require('../models/thumbnail');

exports.getAllThumbnail = async (req, res) => {
    try {
        const thumbnail = await Thumbnail.findAll();
        if (thumbnail.length !== 0) {
            res.status(200).json(thumbnail);
        } else {
            res.status(404).json({ error: 'thumbnail not found' });
        }

    } catch (err) {
        console.error('Error retrieving thumbnail:', err);
        res.status(500).json({ error: 'Failed to retrieve thumbnail' }, err);
    }
};

exports.getThumbnailById = async (req, res) => {
    try {
        const { id } = req.params;
        const thumbnail = await Thumbnail.findByPk(id);
        if (!thumbnail) {
            return res.status(404).json({ error: 'thumbnail not found' });
        }
        res.status(200).json(thumbnail);
    } catch (err) {
        console.error('Error retrieving thumbnail:', err);
        res.status(500).json({ error: 'Failed to retrieve thumbnail' });
    }
};

exports.getThumbnailByName = async (req, res) => {
    try {
        const { name } = req.body; // Lấy name từ query string

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Tìm thumbnail theo tên
        const thumbnail = await Thumbnail.findOne({ where: { name: name } });

        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }

        res.status(200).json(
            thumbnail
        );

    } catch (error) {
        console.error('Error fetching thumbnail:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



exports.createThumbnail = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file.path.replace(/^.*(\\access\\uploads\\)/, 'access/uploads/');

        // Kiểm tra các trường bắt buộc
        if (!name || !image) {
            return res.status(400).json({ error: 'name and image are required' });
        }

        // Tạo tài khoản mới
        const newThumbnail = await Thumbnail.create({
            name,
            image,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(newThumbnail);
    } catch (err) {
        console.error('Error creating Thumbnail:', err);
        res.status(500).json({ error: 'Failed to create Thumbnail' });
    }
};



exports.deleteThumbnail = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm tài khoản theo ID
        const thumbnail = await Thumbnail.findByPk(id);
        if (!thumbnail) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Xóa tài khoản
        await thumbnail.destroy();

        res.status(200).json({ message: 'Thumbnail deleted successfully' });
    } catch (err) {
        console.error('Error deleting Thumbnail:', err);
        res.status(500).json({ error: 'Failed to delete Thumbnail' });
    }
};


exports.updateThumbnail = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check if a file was uploaded
        let imagePath = null;
        if (req.file) {
            // Use the path provided by multer
            imagePath = req.file.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
            // Only keep the relevant part of the path
            imagePath = imagePath.replace(/^.*?(\/access\/uploads\/)/, 'access/uploads/');
        }

        // Find the thumbnail by ID
        const thumbnail = await Thumbnail.findByPk(id);
        if (!thumbnail) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Update thumbnail details
        thumbnail.name = name || thumbnail.name;
        thumbnail.image = imagePath || thumbnail.image; // Update only if new image was provided
        thumbnail.updatedAt = new Date();

        // Save changes
        await thumbnail.save();

        res.status(200).json(thumbnail);
    } catch (err) {
        console.error('Error updating thumbnail:', err);
        res.status(500).json({ error: 'Failed to update thumbnail' });
    }
};
