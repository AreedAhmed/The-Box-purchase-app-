'use strict';
var records = "";

const socket = io();

socket.on('sendSheetRecords', function(data){
    console.log(data.rows);
	records = data.rows;
	if(records.length == 0){
		swal({
			icon: 'error',
			title: 'Error',
			text: 'No purchases found',
		}); 
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


function getData(){
    socket.emit('ui-GetValues'); 
}
