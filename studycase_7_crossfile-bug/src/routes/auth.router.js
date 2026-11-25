const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { findUserByCredentials } = require('../models/user.model');

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByCredentials(username, password);
  if (!user) {
    return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Username atau password salah' } });
  }
  const token = jwt.sign({ sub: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
  res.json({ data: { token } });
});

module.exports = router;
