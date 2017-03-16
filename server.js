// Dependencies
// =============================================================
var bcrypt = require("bcryptjs");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');
//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6*1000*1000*1000*1000*1000*1000 }}));
app.use(cookieParser());

// ejs is an npm package to render HTML files with express
// =============================================================
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

//this is needed for css files to work!!!!!!
app.use(express.static(path.join(__dirname, '/public')));

// Start The Server
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

var applicationController = require("./controllers/applicationController.js");
var usersController = require("./controllers/usersController.js");
var applicantsController = require("./controllers/applicantsController.js");
var dashboardController = require("./controllers/dashboardController.js");

app.use("/", applicationController, usersController, applicantsController, dashboardController);



// app.use("/", usersController);

// Sets up the Express app to handle data parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// =============================================================
// Basic route that sends the user first to the AJAX Page

// app.get("/sign-in", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/home", function(req, res) {
//   res.sendFile(path.join(__dirname, "home.html"));
// });

// app.get("/dashboard", function(req, res) {
//   res.sendFile(path.join(__dirname, "dashboard.html"));
// });

// app.post('/login', function(req, res) {
  
//   var query = "SELECT * FROM users WHERE email = ?";

//   connection.query(query, [ req.body.email ], function(err, response) {
//       if (response.length == 0){
//         res.redirect('/users/sign-in')
//       }

//         bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
//             if (result == true){

//               req.session.logged_in = true;
//               req.session.user_id = response[0].id;
//               req.session.user_email = response[0].email;
//               req.session.username = response[0].username;

//               res.redirect('/home');
//             }else{
//               res.redirect('index');
//             }
//         });
//   });
// });












