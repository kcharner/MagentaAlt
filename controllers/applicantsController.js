var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');

var router = express();

router.get('/home', function(req,res) {
  res.render('users/homepage');
});

module.exports = router;

