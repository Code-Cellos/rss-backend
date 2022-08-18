'use strict';

// 3rd Party Resources
const express = require('express');
const app = express();

require('dotenv').config();

let PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect(process.env.DB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Handlers
const createUserData = require('./handlers/createUserData');
const addFeed = require('./handlers/parser');
const receiveUrlFromFrontEnd = require('./handlers/getFeeds');

// Esoteric Resources
const errorHandler = require('./errorHandlers/500.js');
const notFound = require('./errorHandlers/404.js');
const { getFeeds, setUrl } = require('./handlers/getFeeds');
// const setUrl = require('./handlers/setUrl');

// REQUIRE ROUTES
// const authRouter = require('./routes/auth.js');
// const alphaRoutes = require('./routes/alpha.js')
// const bravoRoutes = require('./routes/bravo.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/feeds', setUrl);
app.get('/feeds', getFeeds);

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
