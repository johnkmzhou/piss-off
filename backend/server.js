const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const socket = require('express-ws')(app);

// setup pi connection
gpio.wiringPiSetup();

const tilt = () => {
	return  gpio.analogRead();
}

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

	setInterval(()=>{
		ws.send(tilt());
	}, 50);

});

app.listen(3000, () => {
	console.info('Server started on port 3000');
}

