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
    console.log("/api");
  });

  // Get all users
  app.get("/api/allusers", function(req, res) {
    console.log("/api/allusers")
    User.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Get all tasks
  app.get("/api/all", function(req, res) {
    console.log("/api/all")
    Task.findAll({}).then(function(results) {
      res.json(results);
    });
  });


  // Get a specific user
  app.get("/api/:username", function(req, res) {
    console.log("/api/:username")
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


  // Get a specific task
  app.get("/api/tasks/:id", function(req, res) {
    console.log("/api/tasks/:id");
    console.log(req.params.id)
    if (req.params.id) {
      Task.findAll({
        where: {
          id: req.params.id
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });


  // Add a user
  app.post("/api/user", function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        group: req.body.group,
        picture: req.body.picture
    }).then(function(results) {
      res.json(results);
    });
  });


  // Add a Task
  app.post("/api/task", function(req, res) {
    Task.create({
        username: req.body.username,
        name: req.body.name,
        group: req.body.group,
        task: req.body.task,
        state: req.body.state
    }).then(function(results) {
      res.json(results);
    });
  });


   // Update a Task
  app.post("/api/update/:id", function(req, res) {
    console.log("/api/update/:id");
    Task.Update(
      {task: req.body.task,
       state: req.body.state,
       notes: req.body.notes},
      {where: req.params.id}).then(function(results) {
      res.json(results);
    });
  });


  // Delete a Task
  app.post("/api/delete/:id", function(req, res) {
    console.log("/api/delete/:id");
    Task.destroy({
      where: {
        id: req.body.id
      }
    });
  });

};
