'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const timestamp = require('time-stamp');
const googleSpreadsheet = require('google-spreadsheet');
const creds = require('./TheBox_JSON.json');
const doc = new googleSpreadsheet('1yo9jH5YiZy5qAgXW6TqciZ-bGMCtvbAS1byhrziW93s');

var sup = 0, recDate = 0, dockitno = 0,name = 0,job = 0,vat = 0;

app.use(express.static('public'));

io.on('connection', function (socket) {

	socket.on('logcheck-Values',function(data){
	var logged_userdata = data.logName_value;
	var logged_password = data.logPass_value;
	var userVerification = false;
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(2, function (err, userrows) {
				for (var i = 0; i < userrows.length; i++) {
					if(logged_userdata == userrows[i].name && logged_password == userrows[i].password){
						userVerification = true;
					}
				}
				socket.emit('userTrueConfirmation', {userVerification});
			});
		});
	});

	socket.on('registering-Values', function(data){
		doc.useServiceAccountAuth(creds, function (err) {
			doc.addRow(2, { 
			  TIMESTAMP:timestamp.utc('YYYY/MM/DD:mm:ss'),
			  NAME:data.regName_value,
			  PASSWORD: data.regPassConfirm_value,
			}, function(err) {
			if(err) {
			  console.log(err);
			}
			else{
				socket.emit('registrationConfirmation');
			}
		  });
	  });
	});

	socket.on('ui-Values', function (data) {
		sup = data.sup_value;
		recDate = data.date_value;
		dockitno = data.docitno_value;
		job = data.job_value;
		vat = data.vat_value;
		sendSheetData(sup,dockitno,recDate,job,vat);
		socket.emit('acknowledgementOfStamping', {sup,recDate});
	});

	socket.on('ui-GetValues',function(){
		getSheetData();
	});
	async function getSheetData(){	
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(1, function (err, rows) {
				socket.emit('sendSheetRecords', {rows});
			});
		});
	}

	socket.on('record-del', function(data){
		var delRow = data.delDockIt_value;
		var delBool = false;
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(1, function (err, rows) {
				for (var i = 0; i < rows.length; i++) {
					if(delRow == rows[i].dockno){
						rows[i].del();
						delBool = true;
					}
				}
				socket.emit('userDeleteConfirmation', {delBool});
			});
		});
	});

});

async function sendSheetData(supp,dockitnoo,recDatee,jobb,vatt){
	doc.useServiceAccountAuth(creds, function (err) {
	  doc.addRow(1, { 
		TIMESTAMP:timestamp.utc('YYYY/MM/DD:mm:ss'),
        SUPPLIER: supp,
        DOCK_NO:dockitnoo,
        DATE:recDatee,
        VAT:vatt,    
        JOB:jobb,
  		 }, function(err) {
	  if(err) {
	    console.log(err);
	  }
	});
});
	
}

http.listen(5000, function () {
    console.log('listening on port number 5000');
});