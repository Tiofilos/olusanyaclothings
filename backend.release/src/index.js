const log = require('npmlog');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

if (process.env.VERBOSE) {
  log.level = 'verbose';
  log.info('main', 'verbose on');
}

// Important: this environ var allows to check the auth before loading routes
if (process.env.ENABLE_AUTH === undefined) {
  process.env.ENABLE_AUTH = 'on';
}
const api = require('./routes');

require('dotenv').config();

const app = express();

// Config app
app.set('port', process.env.PORT || 3000);

app.use(cors({})); // Config this later
app.use(helmet({})); // Config this later
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Config this later

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'));
} else if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Config routers
app.use(api);

const port = app.get('port');

const cb = () => {
  log.info('Express', `Server running on, http://0.0.0.0:${port}`);
};

// Create MongoDB URI
//const MONGODB_URI = `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`;
const MONGODB_URI = process.env.MONGODB_URI
// Wait for MongoDB connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, cb);
  })
  .catch((err) => log.error('MongoDB connection', err));

const db = mongoose.connection;

db.on('error', log.error.bind(log.error, 'MongoDB error event'));

// For testing
module.exports = app;
