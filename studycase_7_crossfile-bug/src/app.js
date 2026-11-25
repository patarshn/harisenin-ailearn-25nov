const path = require('node:path');
const express = require('express');
const authRouter = require('./routes/auth.router');
const orderRouter = require('./routes/order.router');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRouter);
app.use('/orders', orderRouter);

module.exports = app;
