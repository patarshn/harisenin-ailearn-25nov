const express = require('express');
const { listProducts, getProduct } = require('./products');

const app = express();
app.use(express.json());

app.get('/products', listProducts);
app.get('/products/:id', getProduct);

module.exports = app;
