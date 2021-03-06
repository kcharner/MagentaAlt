var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');
var router = express();
var bodyParser = require("body-parser");
var connection = require('../config/connection.js');
var query;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// router.get('/home', function(req, res) {
//   if (req.session.logged_in = true) {
//     res.redirect('homepage');
//   } else if (req.session.logged_in = false) {
//     res.redirect('/');
//   } else {
//     res.send("TEST")
//   }
// });

//get request to the homepage
router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, "../views/users/homepage.html"));
});

// get request that takes user to sign-in page
router.get("/sign-in", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/sign-in.html"));
});

// get request that takes user to registration page
router.get("/registration", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/registration.html"));
});

// get request that destroys a logged in user's session
router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

// post requst that takes in information when a user logs in
router.post('/login', function(req, res) { 
    var query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [req.body.email], function(err, response) {
      var userLevel = response[0].level;
      
      if (response.length == 0) {
        res.redirect("/sign-in")
      } else if (response.length > 0) {
            bcrypt.compare(req.body.password, response[0].password, function(err, result) {
                   if (result == true ) {     
                        req.session.logged_in = true;
                        req.session.first_name = response[0].first_name
                        req.session.last_name = response[0].last_name
                        req.session.user_email = response[0].email
                        if (userLevel ==2) {res.redirect("/dashboard")
                        }else { res.redirect("/home")
                        }
                } else {
                  res.redirect("/sign-in");
                }
            }); //closing off bcrypt (line 55)
      } //close off first else (line 54)
    }); //close query (line 49)
}); //close post (line 47)

// post request to register new user to use the ATS system
router.post('/newUser', function(req,res) {

  query = "SELECT * FROM users WHERE email = ?"

  connection.query(query, [req.body.email], function(err, response) {
    console.log(response);
    if (response.length > 0) {
      res.send("We already have a user associated with that email")
    } else {

      bcrypt.hash(req.body.password, 10, function(err, hash) {
      
        query = "INSERT INTO users (first_name, last_name, email, password, level) VALUES (?, ?, ?, ?, ?)";
            
        connection.query(query, [req.body.first_name, req.body.last_name, req.body.email, hash, req.body.level], function(error, results, field) {
          res.redirect('/home')
        });
      });

    }
  })

});


module.exports = router;