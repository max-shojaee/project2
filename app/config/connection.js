// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

if (process.env.JAWSDB_URL) {
  // Creates mySQL connection using Sequelize
      var sequelize = new Sequelize("mycirkle", "root", "Tabestan_20", {
      host: "process.env.JAWSDB_URL",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
  });
}
else
{
  // Creates mySQL connection using Sequelize
  var sequelize = new Sequelize("mycirkle", "root", "Tabestan_20", {
  host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

// Exports the connection for other files to use
module.exports = sequelize;
