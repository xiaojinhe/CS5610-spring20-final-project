module.exports = function() {
  const mongoose = require('mongoose');
  const databaseName = 'movie-time';
  let connectionString = 'mongodb://localhost:27017/' + databaseName;
  if(process.env.MLAB_USERNAME_WEBDEV) {
    let username = process.env.MLAB_USERNAME_WEBDEV;
    let password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133086.mlab.com:33086/'+ databaseName;
  }
  console.log('connectionString:', connectionString);
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
