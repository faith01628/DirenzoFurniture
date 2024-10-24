const Product = require('../models/products');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products.length !== 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'products not found' });
        }

    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ error: 'Failed to retrieve products' }, err);
    }
};

exports.getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByPk(id);
        if (!products) {
            return res.status(404).json({ error: 'products not found' });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

exports.createProducts = async (req, res) => {
    try {
        const { name, price, desc, material, dimension } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'name are required' });
        } else if (!price) {
            return res.status(400).json({ error: 'price are required' });
        } else if (!desc) {
            return res.status(400).json({ error: 'desc are required' });
        } else if (!dimension) {
            return res.status(400).json({ error: 'dimension are required' });
        }

        const newProduct = await Product.create({
            name: name,
            price: price,
            desc: desc,
            material: material,
            dimension: dimension,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating products:', err);
        res.status(500).json({ error: 'Failed to create products' });
    }
};


exports.deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm tài khoản theo ID
        const products = await Product.findByPk(id);
        if (!products) {
            return res.status(404).json({ error: 'products not found' });
        }

        // Xóa tài khoản
        await products.destroy();

        res.status(200).json({ message: 'products deleted successfully' });
    } catch (err) {
        console.error('Error deleting products:', err);
        res.status(500).json({ error: 'Failed to delete products' });
    }
};

exports.updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, desc, material, dimension } = req.body;
        const Products = await Product.findByPk(id);
        if (!Products) {
            return res.status(404).json({ error: 'Account not found' });
        }

        Products.name = name || Products.name;
        Products.price = price || Products.price;
        Products.desc = desc || Products.desc;
        Products.material = material || Products.material;
        Products.dimension = dimension || Products.dimension;
        Products.updatedAt = new Date();

        await Products.save();

        res.status(200).json(Products);
    } catch (err) {
        console.error('Error updating Products:', err);
        res.status(500).json({ error: 'Failed to update Products' });
    }
};