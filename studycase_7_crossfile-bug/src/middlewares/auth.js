const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  const token = header.split(' ')[1];
  const payload = jwt.verify(token, jwtSecret);
  req.user = { id: payload.sub, username: payload.username };
  next();
};
