var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');

var router = express();

router.get('/applicants', function(req,res) {
	res.json()
});

// // var query = "SELECT * FROM applicants"

// // connection.query(query, function(err, data) {
// //     // res.render('coupons/index', {
// //     //     purchase_coupon: true,
// //     //     coupons: coupons,
// //     //     logged_in: req.session.logged_in,
// //     //     user_email: req.session.user_email,
// //     //     user_id: req.session.user_id,
// //     //     company: req.session.company,
// //     //     username: req.session.username
// //     // });
    
// //     console.log(data.length);

// // });
// // the button handler
// // $('#create').click(function () {
// //     chart.exportChart();
// // });
// // module.exports = chart;
