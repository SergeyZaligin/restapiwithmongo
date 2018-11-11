const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    res.status(404).json({
      message: 'Такого токена не обнаружено.',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    jwt.verify(token, config.jwtSecret);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Неверный токен.' });
    }
  }

  next();
};
