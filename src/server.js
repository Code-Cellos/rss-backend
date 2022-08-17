'use strict';

// 3rd Party Resources
const express = require('express');
const app = express();

require('dotenv').config();
// const cors = require('cors');

let PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect(process.env.DB);
// const UserObject = require('./userModel');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Handlers
const createUserData = require('./handlers/createUserData');
const addFeed = require('./parser');

// Esoteric Resources
const errorHandler = require('./errorHandlers/500.js');
const notFound = require('./errorHandlers/404.js');

// REQUIRE ROUTES
// const authRouter = require('./routes/auth.js');
// const alphaRoutes = require('./routes/alpha.js')
// const bravoRoutes = require('./routes/bravo.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use(authRouter);

addFeed('andrew');

app.post('/userData', createUserData);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    if (!PORT) {
      throw new error('Missing PORT');
    }
    app.listen(PORT, () => {
      console.log(`Server is up on ${PORT}`);
    });
  }
};
