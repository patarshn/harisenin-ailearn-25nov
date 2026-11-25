const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = function auth(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(/\s+/);
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Token wajib diisi' } });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Token tidak valid' } });
  }
};
