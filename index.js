const app = require('./app');

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line
app.listen(3000, () => console.log(`Server start on http://localhost:${PORT}`));
