//it's important to take babysteps, that way you'll know when there's an error
//we're using Sequelize to look up a username and password
//then we get the result
//getting a password, encrypting it, then re-encrypting and comparing the two

var Sequelize = require('sequelize');
var connection = new Sequelize('password_db', 'root');

var bcrypt = require('bcrypt');

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
    bcrypt.hash(password, salt, function(err, hash){
      User.create({
        name: username,
        password: hash
      })
    })
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
      saveUser(result.UserName, result.UserPassword);
    });
  } else {
    console.log("Not a valid submission!");
  }
});