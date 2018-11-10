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
