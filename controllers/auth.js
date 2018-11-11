const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys').jwt;

const User = require('../models').user;
const Token = require('../models').token;
const authHelper = require('../helpers/authHelper');

const updateTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();

  return authHelper.replaceDbRefreshToken(refreshToken.id, userId).then(() => ({
    accessToken,
    refreshToken: refreshToken.token,
  }));
};

module.exports.isAuth = (req, res) => {
  res.status(200).json({
    message: 'Auth success!',
  });
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });
  console.log('candidate', candidate);
  if (candidate) {
    const isValid = bCrypt.compareSync(password, candidate.password);
    console.log('isValid', isValid);
    if (isValid) {
      updateTokens(candidate._id).then(tokens => res.json(tokens));
    } else {
      res.status(401).json({
        message: 'Логин или пароль не совпадают',
      });
    }
  } else {
    res.status(404).json({
      message: 'Пользователь не зарегистрирован',
    });
  }
};

module.exports.refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);

    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid token.' });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired.' });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid tokensss.' });
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then((token) => {
      if (token === null) {
        throw new Error('Invalid token.');
      }

      return updateTokens(token.userId);
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({ message: err.message }));
};
