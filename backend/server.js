const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const socket = require('express-ws')(app);

// setup pi connection
gpio.wiringPiSetup();
gpio.pinMode(8, gpio.INPUT);
gpio.pinMode(9, gpio.INPUT);

//app.use(express.static('./public'));

// listen for websocket connections
app.ws('/', function(ws, req) {
	// event listener waiting for message via socket connection
	ws.on('message', (message) => {
		console.log('received: ${message}');
	});

	// event listener waiting for connection to close
	ws.on('end', () => {
		console.log('Connection ended...');
	});

	// send a reading from tilt sensor every 50 ms
	setInterval(()=>{
		let data = {
			horse1:0,
			horse2:0
		};
		data.horse1 = gpio.digitalRead(8);
		data.horse2 = gpio.digitalRead(9);
		ws.send(JSON.stringify(data));
	}, 50);

});

app.listen(3000, () => {
	console.info('Server started on port 3000');
})

