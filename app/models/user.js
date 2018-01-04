// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");


// Creates a "User" model that matches up with DB
var User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  group: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

User.sync();


// Makes the User Model available for other files (will also create a table)
module.exports = User;

