// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");


// Creates a "Group" model that matches up with DB
var Group = sequelize.define("group", {
  groupname: {
    type: Sequelize.STRING,
    primaryKey: true
  }}, 
  {
   timestamps: false
});

Group.sync();


// Makes the User Model available for other files (will also create a table)
module.exports = Group;

