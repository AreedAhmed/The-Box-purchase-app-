'use strict';

const supplier = document.getElementById('supp');
const dockitno = document.getElementById('docitno');
const date = document.getElementById('date');

const socket = io();

socket.on('acknowledgement', function(data){
	alert("Successfully stamped " + data.sup +" vales on google form on " + data.recDate);
});

document.querySelector('.pushToGoogleForm').addEventListener('click', function(event){
	event.preventDefault();
	var sup_value = `${supplier.value}`;
	var docitno_value = `${dockitno.value}`;
	var date_value = `${date.value}`;
	socket.emit('ui-Values', {sup_value,docitno_value,date_value});  
});
