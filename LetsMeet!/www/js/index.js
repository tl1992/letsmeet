// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

	// Populate the database 
	function populateDB(tx) {
		tx.executeSql('DROP TABLE IF EXISTS USERDATA');
		tx.executeSql('CREATE TABLE IF NOT EXISTS USERDATA (id unique, phone, name)');
		tx.executeSql('INSERT INTO USERDATA (id, phone, name) VALUES (1, "0615556393", "Danny Coenen")');
	}
	
	// Query the database
	function queryDB(tx) {
		tx.executeSql('SELECT * FROM USERDATA', [], querySuccess, errorCB);
	}
	
	function querySuccess(tx, results) {
  		console.log("Returned rows = " + results.rows.length);
  		// this will be true since it was a select statement and so rowsAffected was 0
	  	if (!results.rowsAffected) {
			console.log('No rows affected!');
			return false;
	  	}
  		// for an insert statement, this property will return the ID of the last inserted row
  		console.log("Last inserted row ID = " + results.insertId);
    }
	
	// Transaction error callback
		function errorCB(err) {
		console.log("Error processing SQL: "+err.code);
	}
	
	// Transaction success callback
	function successCB() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(queryDB, errorCB);
	}
	
	// Cordova is ready
	function onDeviceReady() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
	}