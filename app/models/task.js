// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Userauth" model that matches up with DB
var Task = sequelize.define("task", {
  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  group: {
    type: Sequelize.STRING
  },
  task: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  assigner: {
    type: Sequelize.STRING
  },
  assigner_email: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
});


// Syncs with DB
Task.sync();


// Makes the User Model available for other files (will also create a table)
module.exports = Task;