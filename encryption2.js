var Sequelize = require('sequelize');
var connection = new Sequelize('password_db', 'root');

var bcrypt = require('bcryptjs');

//using prompt to interact with user
var prompt = require('prompt');
prompt.start();
prompt.message = '';

//model
var User = connection.define('user', {
  name: Sequelize.TEXT,
  password: Sequelize.TEXT
});

var saveUser = function(username, password){
  bcrypt.genSalt(10, function(err, salt){
    console.log("Salt the first time around is " + salt);
    bcrypt.hash(password, salt, function(err, hash){
      User.create({
        name: username,
        password: hash
      })
    })
  })
}

var checkUser = function(username, password){
  User.findOne({
    where: {
      name: username,
    }
  }).then(function(results){
    bcrypt.compare(password, results.dataValues.password, function(err, results){
      console.log("Results are " + results);
      if(results){
        console.log(results);
        console.log("Successfully logged in!");
      } else {
        console.log("Your login credentials do not work");
      }
    })
  }).catch(function(err){
    console.log("Database error");
  })
}

console.log("Please enter R or L for register for a new account or Login in to existing one.")
prompt.get(['input'], function(err, result) {
  console.log(result.input);
  if (result.input == "R") {
    prompt.get(["UserName", "UserPassword"], function(err, result){
      saveUser(result.UserName, result.UserPassword);
    });
  } else if (result.input == "L") {
    //check the user login
    console.log("Please enter login info!");
    prompt.get(["UserName", "UserPassword"], function(err, result){
      checkUser(result.UserName, result.UserPassword);
    });
  } else {
    console.log("Not a valid submission!");
  }
});