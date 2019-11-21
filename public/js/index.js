const logName = document.getElementById('loginname');
const logPass = document.getElementById('loginpass');
var btn = document.getElementById('.login');
var logPass_value, logName_value;
const socket = io();

socket.on('userTrueConfirmation', function(data){
    if(data.userVerification){
        var url= "purchase.html"; 
        window.location = url;    
    }
    else{
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid credentials, please re-enter!!',
        });  
    }
    logName.value = "";
    logPass.value = "";
});

document.querySelector('.login').addEventListener('click', function(event){
    event.preventDefault();
    logName_value = `${logName.value}`;
    logPass_value = `${logPass.value}`;
    socket.emit('logcheck-Values', {logName_value,logPass_value});
});
