'use strict';

const supplier = document.getElementById('supp');
const dockitno = document.getElementById('docitno');
const date = document.getElementById('date');
const vat = document.getElementById('vat');
const job = document.getElementById('job');
var records = "";

const socket = io();

socket.on('acknowledgementOfStamping', function(data){
	alert("Successfully stamped " + data.sup +" vales on google form on " + data.recDate);
});

socket.on('sendSheetRecords', function(data){
	records = data.rows;
	if(records.length == 0){
		alert("No records found");
	}
	else{
		var col = [];
		for (var i = 0; i < records.length; i++) {
			for (var key in records[i]) {
				if (col.indexOf(key) === -1) {
					col.push(key);
				}
			}
		}
		var table = document.createElement("table");
		var tr = table.insertRow(-1);
		for (var i = 0; i < col.length; i++) {
			var th = document.createElement("th");     
			th.innerHTML = col[i];
			if(col[i] != "_xml" &&  col[i] != "id" &&  col[i] != "app:edited"  &&  col[i] != "_links"){
				tr.appendChild(th);
			}
		}
	
		for (var i = 0; i < records.length; i++) {
	
			tr = table.insertRow(-1);
	
			for (var j = 4; j < col.length; j++) {
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = records[i][col[j]];
			}
		}
		var divContainer = document.getElementById("showData");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);
	}
});

socket.on('userDeleteConfirmation', function(data){
	alert("The user " + data.delRow +" is deleted  from the database successfully");
});

document.querySelector('.pushToGoogleForm').addEventListener('click', function(event){
	event.preventDefault();
	var sup_value = `${supplier.value}`;
	var docitno_value = `${dockitno.value}`;
	var date_value = `${date.value}`;
	var vat_value = `${vat.value}`;
	var job_value = `${job.value}`;
	console.log(job_value);
	socket.emit('ui-Values', {sup_value,docitno_value,date_value,vat_value,job_value});  
});

document.querySelector('.getFromGoogleForm').addEventListener('click', function(event){
	event.preventDefault();
	socket.emit('ui-GetValues');  
});

document.querySelector('.delRecord').addEventListener('click', function(event){
	event.preventDefault();
	var delDockIt = document.getElementById('delDoctit');
	var delDockIt_value = `${delDockIt.value}`;
	console.log(delDockIt_value);
	socket.emit('record-del' , {delDockIt_value});  
});
