const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize'); // Import Sequelize config
const registerApiRoutes = require('./routes/indexRoutes'); // Import API route handlers

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (ensure it's pointing to the correct folder)
app.use(express.static(path.join(__dirname, '../')));

// Sync Sequelize
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Register API Routes
registerApiRoutes(app);

// Register Client and Admin Routes
const routeFileMap = {
    '/homeAdmin': 'product/view-product.html',
    '/postAdmin': 'product/add-product.html',
    '/putAdmin': 'product/update-product.html',
    '/getAdmin': 'product/detail-product.html',
    '/getDesc': 'thumbnail/view-desc.html',
    '/postDesc': 'thumbnail/add-desc.html',
    '/putDesc': 'thumbnail/update-desc.html',
    '/accountAdmin': 'account/account.html'
};

// Helper function to serve static HTML files
const serveFile = (dir, routeFileMap = {}) => (req, res) => {
    const page = routeFileMap[req.path] || req.path.replace('/', '') + '.html'; // Append .html if not in map
    const filePath = path.join(__dirname, 'resource', 'views', dir, page);

    // Debug the file path


    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving file:', err);
            res.status(404).send('Page not found');
        }
    });
};

// Client Routes
app.get(['/home', '/sign-up', '/sign-in', '/forgot-password', '/about-us', '/collection', '/product', '/view-product'], serveFile('client'));


// Admin Routes with mapping for custom filenames
app.get(['/homeAdmin', '/postAdmin', '/putAdmin', '/getAdmin', '/getDesc', '/postDesc', '/putDesc', '/accountAdmin'], serveFile('admin', routeFileMap));

// Login and 404 pages
app.get(['/login', '/register', '/404', '/login1'], serveFile(''));

// Product Search
const searchProduct = (req, res) => {
    const product = req.query.product;
    const filePath = product
        ? path.join(__dirname, 'resource', 'views', 'client', 'product-item.html')
        : path.join(__dirname, 'resource', 'views', 'client', 'no-product-search.html');
    res.sendFile(filePath);
};

app.get("/product-item", searchProduct);

// Start the server
app.listen(5008, () => {
    console.log('Server started on port 5008');
});