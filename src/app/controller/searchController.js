const { Product, ProductImage } = require('../models/associations');

exports.getAllProductSearch = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'productImages', // Dùng alias 'productImages' để lấy dữ liệu ảnh
                },
            ],
        });

        // Định dạng lại dữ liệu theo yêu cầu
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            material: product.material,
            dimension: product.dimension,
            image: product.productImages.map(img => img.image), // Đưa tất cả các URL ảnh vào một mảng 'image'
        }));

        res.json(formattedProducts); // Trả về dữ liệu đã định dạng
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getSearchById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ params của URL

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Tìm sản phẩm theo id
        const product = await Product.findOne({
            where: { id: id }, // Điều kiện tìm kiếm theo id
            include: [
                {
                    model: ProductImage,
                    as: 'productImages', // Dùng alias 'productImages' để lấy dữ liệu ảnh
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Định dạng lại dữ liệu trả về
        const formattedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            material: product.material,
            dimension: product.dimension,
            image: product.productImages.map(img => img.image), // Đưa tất cả các URL ảnh vào một mảng 'image'
        };

        res.status(200).json(formattedProduct); // Trả về dữ liệu đã định dạng
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};


exports.getSearchByName = async (req, res) => {
    try {
        const { desc } = req.body; // Lấy trường desc từ query string

        if (!desc) {
            return res.status(400).json({ message: 'Description is required' });
        }

        // Tìm sản phẩm theo desc
        const products = await Product.findAll({
            where: { desc: desc }, // Điều kiện tìm kiếm theo trường desc
            include: [
                {
                    model: ProductImage,
                    as: 'productImages', // Dùng alias 'productImages' để lấy dữ liệu ảnh
                },
            ],
        });

        if (!products.length) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Định dạng lại dữ liệu trả về
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            material: product.material,
            dimension: product.dimension,
            image: product.productImages.map(img => img.image), // Đưa tất cả các URL ảnh vào một mảng 'image'
        }));

        res.status(200).json(formattedProducts); // Trả về dữ liệu đã định dạng
    } catch (error) {
        console.error('Error fetching product by desc:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

