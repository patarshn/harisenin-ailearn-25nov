const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const { users } = require('./data');
const invoiceRouter = require('./routes/invoice.router');

const app = express();
app.use(express.json());

app.post('/auth/login', (req, res) => {
  const user = users.find((u) => u.username === req.body.username && u.password === req.body.password);
  if (!user) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Login gagal' } });
  res.json({ data: { token: jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' }) } });
});

app.use('/invoices', invoiceRouter);

module.exports = app;
