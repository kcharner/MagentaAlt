var mysql = require('mysql');
var path = require('path');
var bcrypt = require('bcryptjs');
var express = require('express');
var connection = require('../config/connection.js')
var q = require('q');
var router = express();

router.get('/applicants', function(req,res) {

	function getAppContract(){
		var defered = q.defer();
		var queryContracts = "SELECT COUNT(applicants.id) as total_contract, ";
		queryContracts += " contracts.contract_name as contract, ";
		queryContracts += " contracts.id as contract_id "
		queryContracts += " FROM applicants "; 
		queryContracts += " LEFT JOIN contracts ON applicants.contract_id = contracts.id ";
		queryContracts += " GROUP BY contract_id;"		
		connection.query(queryContracts, defered.makeNodeResolver());
		return defered.promise;
	}

	function getAppPost(){
		var defered = q.defer();
		var queryPositions = "SELECT COUNT(applicants.id) as total_pos, "
		queryPositions += " positions.id as position_id, ";
		queryPositions += " positions.position as position, ";
		queryPositions += " contracts.contract_name as contract ";
		queryPositions += " FROM applicants "; 
		queryPositions += " LEFT JOIN contracts ON applicants.contract_id = contracts.id ";
		queryPositions += " INNER JOIN positions ON applicants.position_id = positions.id ";
		queryPositions += " GROUP BY position_id;"
		connection.query(queryPositions, defered.makeNodeResolver());
		return defered.promise;	
	}

   q.all([getAppContract(),getAppPost()]).then(function(results){
 		res.json(results);
    });

});

router.get('/dashboard', function(req,res) {
    res.render('users/dashboard');
});

module.exports = router;
