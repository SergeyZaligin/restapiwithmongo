const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const User = require('../models').user;

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });

  if (candidate) {
    const isValid = bCrypt.compareSync(password, candidate.password);

    if (isValid) {
      const token = jwt.sign(
        { id: candidate._id.toString(), role: candidate.role },
        config.jwtSecret,
      );
      res.json({ token });
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
  // .exec()
  // .then((user) => {
  //   if (!user) {
  //     res.status(401).json({ message: 'User does not exist.' });
  //   }
  //   const isValid = bCrypt.compareSync(password, user.password);
  //   if (isValid) {
  //     const token = jwt.sign(user._id.toString(), config.jwtSecret);
  //     res.json({ token });
  //   } else {
  //     res.status(404).json({ message: 'Invalid access.' });
  //   }
  // })
  // .catch(err => res.status(500).json({ message: err.message }));
};

module.exports.login = (req, res) => {
  res.status(200).json({
    login: true,
  });
};

module.exports.registration = (req, res) => {
  res.status(200).json({
    registration: true,
  });
};
