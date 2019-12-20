let mongoose = require('mongoose');
let CONSTANTS = require('../constants')
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(
  CONSTANTS.DB_URL,
  {
    user: "",
    pass: "",
    config: { autoIndex: true },
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err) {
    if (err) {
      console.log('DB Error:', err);
      process.exit(1);
    }
    else {
      console.log('MongoDB Connected');
    }
  });