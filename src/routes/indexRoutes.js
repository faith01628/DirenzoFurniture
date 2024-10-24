// Import your route files
const accountRoutes = require('../routes/accountRoutes');
const loginRoutes = require('../routes/loginRoutes');
const tokenRoutes = require('../routes/tokenRoutes');
const productsRoutes = require('../routes/productsRoutes');
const thumbnailRoutes = require('../routes/thumbnailRoutes');
const product_imageRoutes = require('../routes/product_imageRoutes');
const searchRoutes = require('../routes/searchRoutes');
const updateProductRoutes = require('../routes/updateProductRoutes');
const deleteProductRoutes = require('../routes/deleteProductRoutes');

// Function to register API routes
const registerApiRoutes = (app) => {
    app.use('/account', accountRoutes);
    app.use('/login', loginRoutes);
    app.use('/token', tokenRoutes);
    app.use('/products', productsRoutes);
    app.use('/thumbnail', thumbnailRoutes);
    app.use('/product_image', product_imageRoutes);
    app.use('/search', searchRoutes);
    app.use('/updateProduct', updateProductRoutes);
    app.use('/deleteProduct', deleteProductRoutes);
};

module.exports = registerApiRoutes;
