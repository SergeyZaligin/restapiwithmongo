const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const config = require('./config/keys');

mongoose
  .connect(
    config.mongoUrl,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('Connection mongodb success!!!');
  })
  .catch(error => console.log(error));

const app = express();

app.use(morgan('dev'));
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);
app.use(bodyparser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

module.exports = app;
