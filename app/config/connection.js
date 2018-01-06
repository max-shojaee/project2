// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

if (process.env.JAWSDB_URL) {
  // Creates mySQL connection using Sequelize
      var sequelize = new Sequelize("phtn224x85wco5s4", "t3nfqnyp1jije7v1", "u5kxn5u7av1vtnzo", {
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
  var sequelize = new Sequelize("phtn224x85wco5s4", "t3nfqnyp1jije7v1", "u5kxn5u7av1vtnzo", {
  host: "k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
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
