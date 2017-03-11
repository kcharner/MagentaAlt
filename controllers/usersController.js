// var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');

var router = express();

router.get('/dashboard', function(req,res) {
  res.render('users/dashboard');
});

// router.post('/login', function(req, res) {
  
//   var query = "SELECT * FROM users WHERE email = ?";

//   connection.query(query, [ req.body.email ], function(err, response) {
//       if (response.length == 0){
//         res.redirect('/sign-in')
//       }

//         bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
//             if (result == true){

//               req.session.logged_in = true;
//               req.session.user_id = response[0].id;
//               req.session.user_email = response[0].email;
//               req.session.username = response[0].username;

//               res.redirect('/home');
//             }else{
//               res.redirect('/sign-in')
//             }
//         });
//   });
// });

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

module.exports = router;
