const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const socket = require('express-ws')(app);

// setup pi connection
gpio.wiringPiSetup();
gpio.pinMode(8, gpio.INPUT);
gpio.pinMode(9, gpio.INPUT);

// listen for websocket connections
app.ws('/tilt', function(ws, req) {
	// event listener waiting for message via socket connection
	// ws.on('message', (message) => {
	// console.log('received: ${message}');
	// });

	// event listener waiting for connection to close
	ws.on('/end', () => {
		console.log('Connection closed.');
	});

	// send a reading from tilt sensor every 50 ms
	setInterval(()=>{
		ws.send(gpio.digitalRead(8));
	}, 50);

});

// listen for websocket connections
app.ws('/mercury', function(ws, req) {
	// event listener waiting for connection to close
	ws.on('end', () => {
		console.log('Connection closed.');
	});

	// send a reading from tilt sensor every 50 ms
	setInterval(()=>{
		ws.send(gpio.digitalRead(9));
	}, 50);

});


app.listen(500, () => {
	console.info('Server started on port 500');
});

