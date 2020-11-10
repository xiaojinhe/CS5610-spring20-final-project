module.exports = function() {
  const mongoose = require('mongoose');
  const databaseName = 'movie-time';
  let connectionString = 'mongodb://localhost:27017/' + databaseName;
  if (process.env.MONGODB_CONNECTION) {
    connectionString = process.env.MONGODB_CONNECTION
  }
  console.log('connectionString:', connectionString);
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose
};
