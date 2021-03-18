const express = require('express');
const productsController = require('../controller/productsController');

const route = express.Router();

// Url: http://localhost:5000/api/products/all
// Method: GET
// Description: Fetch all products
// Public
route.get('/all', productsController.getProducts);

// Url: http://localhost:5000/api/products/:productId
// Method: GET
// Description: Fetch single product
// Public
route.get('/:productId', productsController.getProduct);

// Url: http://localhost:5000/api/products/add-product
// Method: POST
// Description: Create new product
// Private --> For now Public
route.post('/add-product', productsController.postNewProduct);

module.exports = route;