var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');
var router = express();
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
  port: 8889,
  host: "localhost",
  user: "root",
  password: "root",
  database: "magenta_db"
});


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, "../views/users/homepage.html"))
});
// post request for the new appliant form
router.post("/create", function(req, res) {

    var query = "INSERT INTO applicants (first_name, last_name, home_phone, cell_phone, email, contract_id, position_id, driver_license, driver_exp, sora_license, sora_exp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // Connection to mysql initalized
    connection.query(query, [ req.body.first_name, req.body.last_name, req.body.home_phone, req.body.cell_phone, req.body.email, req.body.contract_id, req.body.position_id, req.body.driver_license, req.body.driver_exp, req.body.sora_license, req.body.sora_exp ], function(response) {
            res.redirect('/home')
        });
})

router.post("/viewAll", function(req, res) {

    // var contractOption = req.body;
    // console.log(contractOption.contract);

    var query = "SELECT a.id, a.first_name, a.last_name, a.cell_phone, a.email, c.contract_name, p.position FROM applicants a LEFT JOIN contracts c ON c.id = a.contract_id LEFT JOIN positions p ON a.position_id = p.id WHERE contract_id = ?";

    connection.query(query, [req.body.contract], function(err, response) {

      console.log(response);
      res.send(response);

    });


})




module.exports = router;
