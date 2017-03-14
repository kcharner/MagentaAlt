var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var path = require('path');
var router = express();
var bodyParser = require("body-parser");
var connection = require("../config/connection.js");
var query;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//get request to the homepage
router.get('/home', function(req, res) {
  res.render('users/homepage');
});

// post request to create new appliant 
router.post("/create", function(req, res) {

    query = "SELECT * FROM applicants WHERE email = ?";

    connection.query(query, [req.body.email], function(err, response) {
        if (response.length > 0) {
            res.send('This applicant has already been added into our system.')
        } else {
    
            query = "INSERT INTO applicants (first_name, last_name, home_phone, cell_phone, email, contract_id, position_id, driver_license, driver_exp, sora_license, sora_exp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            connection.query(query, [req.body.first_name, req.body.last_name, req.body.home_phone, req.body.cell_phone, req.body.email, req.body.contract_id, req.body.position_id, req.body.driver_license, req.body.driver_exp, req.body.sora_license, req.body.sora_exp], function(error, results, field) {
                  console.log("Here's an error!");
                  console.log(error);
                  console.log("End error");
                  res.redirect('/home')
              });
        }});
});

// get request that renders the user to the update-applicant page
router.get("/update-applicant", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/users/update-applicant.html"));
  // res.render("users/update-applicant")
});

// post request to view all applicants (add in conditional for whether or not there are open applicants)
router.post("/viewAll", function(req, res) {
  
    query = "SELECT a.id, a.first_name, a.last_name, a.cell_phone, a.email, c.contract_name, p.position FROM applicants a LEFT JOIN contracts c ON c.id = a.contract_id LEFT JOIN positions p ON a.position_id = p.id WHERE contract_id = ?";

    connection.query(query, [req.body.contract], function(err, response) {

      console.log(response);
      res.send(response);

    });
});

// 

// GET request for display application_process information associated with the selected applicants email

// router.get("/viewApplicantProcess", function(req, res) {

//     query = "SELECT * from applicants where lastName = ?";

//     if (response.length > 0) {
//         res.send('We do not have a record for this applicant.')
//     } else {
//       query = "SELECT * from applicants where id = ?";
//     }

// SELECT a.id, a.first_name, a.last_name, ap.applicant_id, ap.applied, ap.fp_appt, ap.fp_background_approval, ap.orange_tag, ap.sida_class, ap.side_result, ap.orientation_training, ap.safety_training, ap.customer_training, ap.receive_id from applicants a LEFT JOIN application_process ap ON ap.applicant_id = a.id WHERE email='miriam@magentaATS.com';
    //revise to update applicant status: changing 
//     connection.query("", [],function(err, result) {
//           res.redirect("/home"); 
//       });
// });



// put request for finalizing updates of applicant's form
router.put("/update", function(req, res) {

    query = "SELECT * from applicants where lastName = ?";

    if (response.length > 0) {
        res.send('We do not have a record for this applicant.')
    } else {
      query = "SELECT * from applicants where id = ?";
    }

    //revise to update applicant status: changing 
    connection.query("UPDATE application_process SET applied = ?, SET fp_appt = ?, SET fp_background_approval = ?, SET orange_tag = ?, SET sida_class = ?, SET side_result = ?, SET orientation_training = ?, SET safety_training = ?, SET customer_training = ?, SET receive_id = ?, SET id_front = ?, SET id_back = ?, SET id_exp = ? WHERE id = this.id", [req.body.applied, req.body.fp_appt, req.body.fp_background_approval, req.body.orange_tag, req.body.sida_class, req.body.side_result, req.body.orientation_training, req.body.safety_training, req.body.customer_training, req.body.receive_id, req.body.id_front, req.body.id_back, req.body.id_exp],function(err, result) {
          res.redirect("/home"); 
      });
});

// to delete an applicant
// router.delete("/:id", function(req, res) {
//   connection.query("DELETE FROM applicants WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       throw err;
//     }
//     res.redirect("/home");
//   });
// });

module.exports = router;











