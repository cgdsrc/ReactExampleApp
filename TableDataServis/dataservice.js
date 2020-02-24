//NOT: modulleri package.json ile indirmek için "npm install" komutu kullanılır

/* ------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------- MODULES ---------------------------------------------------*/
/* ------------------------------------------------------------------------------------------------------- */
const net = require('net');                         // npm i net --save
const express = require('express');                 // npm i express --save
const http = require('http');                       // npm i http --save
const socketio = require('socket.io');              // npm i socket.io --save
const data1 = require('./data1.js');
const data2 = require('./data2.js');

/* -------------------------------------------- USE MODULES ---------------------------------------------- */
const App = express();
var KitServer = http.createServer(App);
var SocketIO = socketio(KitServer);

//console.log('---------------------- REACT DATA SERVİCE STARTED ----------------------');
console.log(GetCurrentTimestamp() + '\tREACT DATA SERVİCE STARTED');

/* ------------------------------------------------------------------------------------------------------- */
/* ---------------------------- ERROR HANDLING FOR UNCAUGHT EXCEPTION -------------------------------------*/
/* ------------------------------------------------------------------------------------------------------- */

process.on('uncaughtException', (err) => { console.error(GetCurrentTimestamp() + '\tReact Data Service handle uncaught exception : ' + err.stack); });

// uygulama kapatılırken yapılacak işlemler - https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
process.on('exit', () => {
	console.log(GetCurrentTimestamp() + '\tReact Data Service handle exit.');
});

/* ------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------  SOCKET IO ---------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */
const SERVICE_SOCKET_IO_IP = '127.0.0.1';
const SERVICE_SOCKET_IO_PORT = 1060;

// Serlient baglanti parametreleri
var SerlientIsConnected = false;
var SerlientSocket = null;
var SerlientLastHBTime = 0;

// Serlient baglanti parametrelerini temizle
var clearSerlientParameters = () => {
	SerlientIsConnected = false;
	SerlientLastHBTime = 0;
	SerlientSocket = null;
};


var SerlientJsonArr = data1;

var SerlientJsonArr2 = data2;

var isSwitchData = false;

KitServer.listen(SERVICE_SOCKET_IO_PORT, SERVICE_SOCKET_IO_IP, () => {
	console.log(GetCurrentTimestamp() + `\tReact Data Service is up on  ${SERVICE_SOCKET_IO_IP}:${SERVICE_SOCKET_IO_PORT} (SOCKET IO) \n`);
});

SocketIO.on('connection', (socket) => {

	// React Data Client HB senaryosu
	socket.on('RdsHB', (data) => {
		On_RsdHBScenario(socket, data);

		//console.log("hb");

	});

	//React Data Client bağlantı kopma senaryosu
	socket.on('disconnect', () => {
		clearSerlientParameters();
	});

	console.log('Connection established on React Data Service Socket. Port : ' + socket.request.connection.remotePort + ' IP : ' + socket.request.connection.remoteAddress)

	SerlientIsConnected = true;
	SerlientSocket = socket;

});
function degis() {
	isSwitchData = !isSwitchData;
}
setInterval(degis, 10000)

// React Data Service arayuzunden HB  mesajı alındı
function On_RsdHBScenario(sock, data) {
	// Data degisme kontrolu
	if (!isSwitchData) {
		sock.emit('RdsHBAck', SerlientJsonArr);
		//console.log("hebek");


		checkRdsData4Notify(sock, SerlientJsonArr)
	}
	else {
		sock.emit('RdsHBAck', SerlientJsonArr2);

		checkRdsData4Notify(sock, SerlientJsonArr2)
		//	console.log("hebek2");
	}

	// Data degistir
	//isSwitchData = !isSwitchData;
}

function checkRdsData4Notify(sock, data) {
	for (var i in data) {
		// Data Kontrolu
		var fieldid = data[i].FieldId;
		var status = data[i].FieldValue.status;
		var value = data[i].FieldValue.value;
		var type = data[i].FieldValue.type;

		var Notify = {
			Head: fieldid,
			Body: value,
			Type: status
		};

		sock.emit('Notify', Notify);
	}
}


/** 
 * @description Bu fonksiyon şimdiki zamanı "YYYY-MM-DD hh:mm:ss.SSS" formatında döndürür ( örn: 2019-01-01 09:05:01.220 )
 * @return {string} şimdiki zaman değeri 
 */
function GetCurrentTimestamp() {

	var date = new Date();
	var hours = (date.getUTCHours() - date.getTimezoneOffset() / 60) % 24;
	if (hours < 10) hours = '0' + hours;
	var minutes = date.getMinutes();
	if (minutes < 10) minutes = '0' + minutes;
	var day = date.getDate();
	if (day < 10) day = '0' + day;
	var month = date.getMonth() + 1;
	if (month < 10) month = '0' + month;
	var seconds = date.getSeconds();
	if (seconds < 10) seconds = '0' + seconds;

	var milliseconds = date.getMilliseconds();
	if (milliseconds < 10) { milliseconds = '00' + milliseconds; }
	else if (milliseconds < 100) milliseconds = '0' + milliseconds;

	return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}  