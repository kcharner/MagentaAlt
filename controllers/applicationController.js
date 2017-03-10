// var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');

var router = express();

router.get('/', function(req,res) {
  res.render('index');
});

module.exports = router;
