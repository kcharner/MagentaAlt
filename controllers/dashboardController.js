var mysql = require('mysql');
var path = require('path');
var bcrypt = require('bcryptjs');
var express = require('express');
var connection = require('../config/connection.js')
var Q = require('Q');
var router = express();

router.get('/applicants', function(req,res) {
	//Run query to get the total applicants by Contract
	function getAppContract(){
		var defered = Q.defer();
		var query = "SELECT COUNT(applicants.id) as total_contract, ";
		query += " contracts.contract_name as contract, ";
		query += " contracts.id as contract_id "
		query += " FROM applicants "; 
		query += " LEFT JOIN contracts ON applicants.contract_id = contracts.id ";
		query += " GROUP BY contract_id;"		
		connection.query(query, defered.makeNodeResolver());
		// console.log(defered.promise);
		return defered.promise;

	}

	//Run query to get the total applicants by position
	function getAppPost(){
		var defered = Q.defer();
		var query = "SELECT COUNT(applicants.id) as total_pos, "
		query += " positions.id as position_id, ";
		query += " positions.position as position, ";
		query += " contracts.contract_name as contract ";
		query += " FROM applicants "; 
		query += " LEFT JOIN contracts ON applicants.contract_id = contracts.id ";
		query += " INNER JOIN positions ON applicants.position_id = positions.id ";
		query += " GROUP BY contract_id, position_id"
		connection.query(query, defered.makeNodeResolver());
		console.log(defered.promise);
		return defered.promise;	
	}

	//Run query to get the contracts
	function getContract(){
		var defered = Q.defer();
		var query = "SELECT * "
		query += " FROM contracts; "; 
		connection.query(query, defered.makeNodeResolver());
		return defered.promise;	
	}

	//Run query to get the total positions
	function getPosition(){
		var defered = Q.defer();
		var query = "SELECT * "
		query += " FROM positions; "; 
		connection.query(query, defered.makeNodeResolver());
		return defered.promise;			
	}

	//return all queries
   	Q.all([getAppContract(),getAppPost(), getContract(), getPosition()]).then(function(results){
 		res.json(results);
    });
});


router.get('/dashboard', function(req,res) {
    res.render('users/dashboard');
});

module.exports = router;
