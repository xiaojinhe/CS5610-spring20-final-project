module.exports = function() {
  const mongoose = require('mongoose');
  const databaseName = 'movie-time';
  const connectionString = 'mongodb://localhost:27017/' + databaseName;
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
