'use strict';
var delDockIt = "",delDockIt_value="";
const socket = io();

socket.on('userDeleteConfirmation', function(data){
    if(data.delBool){
        swal({
            icon: 'success',
            title: 'Success',
            text: 'The supplier is deleted  from the database successfully',
        }); 
        delDockIt.value = "";
    }
    else{
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No supplier records are found',
        }); 
    }
});

document.querySelector('.delRecord').addEventListener('click', function(event){
	event.preventDefault();
	delDockIt = document.getElementById('delDoctit');
	delDockIt_value = `${delDockIt.value}`;
	socket.emit('record-del' , {delDockIt_value});  
});