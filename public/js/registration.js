const regName = document.getElementById('registrationname');
const regPass = document.getElementById('registrationpassone');
const regPassConfirm = document.getElementById('registrationpassconfirm');

const socket = io();

socket.on('registrationConfirmation', function(){
    swal({
        icon: 'Success',
        title: 'Success',
        text: 'User successfully registered!',
    }); 
    regName.value = "";
    regPass.value = "";
    regPassConfirm.value = "";
});

document.querySelector('.signupbtn').addEventListener('click', function(event){
    event.preventDefault();
    var regName_value = `${regName.value}`;
    var regPass_value = `${regPass.value}`;
    var regPassConfirm_value = `${regPassConfirm.value}`;
    if(regName_value != "" && regPass_value != "" && regPassConfirm_value != ""){
        if((regPass_value === regPassConfirm_value)){
            socket.emit('registering-Values', {regName_value,regPassConfirm_value});
        }
        else{
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match, please re-enter!!',
            });  
        }
    }
});
