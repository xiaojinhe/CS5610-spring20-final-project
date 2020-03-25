module.exports = function() {
  const mongoose = require('mongoose');
  const databaseName = 'movie-time';
  const connectionString = 'mongodb://localhost/' + databaseName;
  mongoose.connect(connectionString);
};
