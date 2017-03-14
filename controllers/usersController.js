var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');
var router = express();
var connection = require('../config/connection.js')





router.get("/sign-in", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/sign-in.html"));
});

router.get("/registration", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/registration.html"));
});









router.post('/login', function(req, res) {
  
  // var query = "SELECT * FROM users WHERE email = ?";

  // connection.query(query, [ req.body.email ], function(err, response) {
  //     if (response.length == 0){
  //       res.redirect('/sign-in')
  //     }

        bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
            if (result == true){

              req.session.logged_in = true;
              // NEED TO ADD TO USERS TABLE
              req.session.id = response[0].id;
              req.session.email = response[0].email; 
              req.session.first_name = response[0].first_name; 
              // GREET USER ON LOG-IN

              res.redirect('/home');
            }else{
              res.redirect('/sign-in')
            }
        });
  // });
});







router.post('/create', function(req,res) {
  // var query = "SELECT * FROM users WHERE email = ?"

  // connection.query(query, [ req.body.email ], function(err, response) {
    // console.log(response)
    // if (response.length > 0) {
    //   res.send('we already have an email for this account')
    // }else{

      bcrypt.genSalt(10, function(err, salt) {
          //res.send(salt)
          bcrypt.hash(req.body.password, salt, function(err, hash) {            
            var query = "INSERT INTO users (first_name, last_name, email, password, level) VALUES (?, ?, ?, ?, ?)"

            connection.query(query, [ req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.level], function(err, response) {

              req.session.logged_in = true;

              req.session.user_id = response.insertId; //only way to get id of an insert for the mysql npm package

              var query = "SELECT * FROM users WHERE id = ?"
              connection.query(query, [ req.session.user_id ], function(err, response) {
              	req.session.first_name = response[0].first_name;
              	req.session.last_name = response[0].last_name;
                req.session.email = response[0].email;
                req.session.level = response[0].level;

                res.redirect('/home')
              });
            });
          });
      });

    // }
  // });


});








router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

module.exports = router;