'use strict';

const supplier = document.getElementById('supp');
const dockitno = document.getElementById('docitno');
const date = document.getElementById('date');
const vat = document.getElementById('vat');
const job = document.getElementById('job');
const userName = document.getElementById('loginname');


const socket = io();

socket.on('acknowledgementOfStamping', function(data){
	swal({
		icon: 'success',
		title: 'Success',
		text: 'Successfully purchased',
	}); 
	supplier.value = ""; 
	dockitno.value = "";
	date.value = "";
	vat.value = "";
	job.value = "";
});

document.querySelector('.pushToGoogleForm').addEventListener('click', function(event){
	event.preventDefault();
	var sup_value = `${supplier.value}`;
	var docitno_value = `${dockitno.value}`;
	var date_value = `${date.value}`;
	var vat_value = `${vat.value}`;
	var job_value = `${job.value}`;
	if(sup_value != "" && docitno_value != "" && date_value!= "" && vat_value != "" && job_value != ""){
		socket.emit('ui-Values', {sup_value,docitno_value,date_value,vat_value,job_value});  
	}
});

