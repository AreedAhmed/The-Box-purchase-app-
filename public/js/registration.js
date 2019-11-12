const regName = document.getElementById('registrationname');
const regPass = document.getElementById('registrationpassone');
const regPassConfirm = document.getElementById('registrationpassconfirm');

const socket = io();

document.querySelector('.register').addEventListener('click', function(event){
    event.preventDefault();
    var regName_value = `${regName.value}`;
    var regPass_value = `${regPass.value}`;
    var regPassConfirm_value = `${regPassConfirm.value}`;
    if(regPass_value === regPassConfirm_value){
        socket.emit('registering-Values', {regName_value,regPassConfirm_value});
    }
    else{
        alert("The passwords do not match");
    }
});
