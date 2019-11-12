const logName = document.getElementById('loginname');
const logPass = document.getElementById('loginpass');
var btn = document.getElementById('.login');

const socket = io();

socket.on('userTrueConfirmation', function(){
    // alert("User successfully logged in");      
});

document.querySelector('.login').addEventListener('click', function(event){
    event.preventDefault();
    var logName_value = `${logName.value}`;
    var logPass_value = `${logPass.value}`;
    if(logName_value != "" && logPass_value != ""){
        socket.emit('logcheck-Values', {logName_value,logPass_value});
    }
    else{
        alert("Invalid Credentials");
        logName_value = "";
        logPass_value = "";
    }
});
