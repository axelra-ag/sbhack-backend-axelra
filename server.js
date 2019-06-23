const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fs = require("fs");

const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Connect to mongodb
DB_connection().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));

  app.use("/maps", require("./routes/map"));
  app.use("/user", require("./routes/user"));
  app.use("/challenge", require("./routes/challenges"));
  app.use("/history", require("./routes/history"));

  require('./config/challenges');

}).catch(err => {
  console.log(err);
});


function DB_connection() {
  return new Promise((resolve, reject) => {
    let uri = 'mongodb+srv://cluster0-nfsf8.mongodb.net/test?retryWrites=true&w=majority';
    mongoose.connect(uri, {
      dbName: 'cluster0',
      useNewUrlParser: true,
      useCreateIndex: true,
      auth: {
        user: 'admin',
        password: ',j,th',
      },
    }).then(
        () => {
          console.log('App was to DB.');
          resolve();
        },
        err => {
          console.log(err);
          reject(err);
        }
    );
  })
}