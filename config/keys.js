module.exports = {
  mongoUrl: 'mongodb://admin:123456t@ds259253.mlab.com:59253/api',
  jwt: {
    secret: 'this is sparta',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '2m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '3m',
      },
    },
  },
};
