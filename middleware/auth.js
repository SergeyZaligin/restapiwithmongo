const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys').jwt;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    res.status(404).json({
      message: 'Такого токена не обнаружено.',
    });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, secret);
    if (payload.type !== 'access') {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired.' });
      return;
    }
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Неверный токен.' });
      return;
    }
  }

  next();
};
