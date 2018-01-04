// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../models/user.js");
var Task = require("../models/task.js");
var Group = require("../models/group.js");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api", function(req, res) {
    /*
    Task.findAll({}).then(function(results) {
      console.log("------------------> main screen"+results);
      res.json(results);
    });
    */
  });

  // Get all books
  app.get("/api/all", function(req, res) {
    Task.findAll({}).then(function(results) {
      res.json(results);
    });
  });


  // Get a specific book
  app.get("/api/:username", function(req, res) {
    if (req.params.username) {
      User.findAll({
        where: {
          username: req.params.username
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  // Get all books of a specific genre
  app.get("/api/genre/:genre", function(req, res) {
    /*
    if (req.params.genre) {
      Book.findAll({
        where: {
          genre: req.params.genre
        }
      }).then(function(results) {
        res.json(results);
      });
    }
    */
  });

  // Get all books from a specific author
  app.get("/api/author/:author", function(req, res) {
    /*
    if (req.params.author) {
      Book.findAll({
        where: {
          author: req.params.author
        }
      }).then(function(results) {
        res.json(results);
      });
    }
    */
  });

  // Get all "long" books (books 300 pages or more)
  app.get("/api/books/long", function(req, res) {
    /*
    Book.findAll({
      where: {
        pages: {
          $gte: 300
        }
      },
      order: [["pages", "DESC"]]
    }).then(function(results) {
      res.json(results);
    });
    */
  });

  // Get all "short" books (books 150 pages or less)
  app.get("/api/books/short", function(req, res) {
    /*
    Book.findAll({
      where: {
        pages: {
          $lte: 150
        }
      },
      order: [["pages", "ASC"]]
    }).then(function(results) {
      res.json(results);
    });
    */
  });

  // Add a user
  app.post("/api/user", function(req, res) {
    console.log("User:");
    console.log(req.body);
    User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        group: req.body.group
    });
  });


  // Add Task
  app.post("/api/task", function(req, res) {
    console.log("Task:");
    console.log(req.body);
    Task.create({
        username: req.body.username,
        name: req.body.name,
        task: req.body.task,
        group: req.body.group,
        completed: req.body.completed,
        private: req.body.private
    });
  });

  // Delete a book
  app.post("/api/delete", function(req, res) {
    /*
    console.log("Book Data:");
    console.log(req.body);
    Book.destroy({
      where: {
        id: req.body.id
      }
    });
  */
  });

};
