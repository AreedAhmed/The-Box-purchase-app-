'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const googleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./TheBox_JSON.json');

var sup = 0, recDate = 0, dockitno = 0;

app.use(express.static('public'));

io.on('connection', function (socket) {
	socket.on('ui-Values', function (data) {
		sup = data.sup_value;
		recDate = data.date_value;
		dockitno = data.docitno_value;
		callSpreadSheet(sup,dockitno,recDate);
		socket.emit('acknowledgement', {sup,recDate});
	});
});

async function callSpreadSheet(supp,dockitnoo,recDatee){
	const doc = new googleSpreadsheet('1yo9jH5YiZy5qAgXW6TqciZ-bGMCtvbAS1byhrziW93s');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];
	console.log(sheet.title);
	console.log(sheet.rowcount);
	
	const row = {

        NAME: 'Vasant',
        SUPPLIER: supp,
        DOCK_NO:dockitnoo,
        DATE:recDatee,
        VAT:'test',    
        JOB:'test',
        SAVE_DOCKET:'test'    
	}
	await promisify(sheet.addRow)(row); 
}

http.listen(5000, function () {
    console.log('listening on port number 5000');
});