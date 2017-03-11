const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const socket = require('express-ws')(app);

// setup pi connection
gpio.wiringPiSetup();
gpio.pinMode(8, gpio.INPUT);
gpio.pinMode(9, gpio.INPUT);


const tilt = () => {
	// return gpio.analogRead(8);
	return gpio.digitalRead(8);
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

	// send a reading from tilt sensor every 50 ms
	setInterval(()=>{
		let tilt_value = tilt();
		console.log(tilt_value)
		ws.send(tilt_value);
	}, 50);

});

// testing
setInterval(()=>{
	let tilt_value = tilt();
//	console.log('tilt switch' + tilt_value);
	console.log('mercury digital switch' + gpio.digitalRead(9));
	console.log('mercury analog switch' + gpio.analogRead(9));
}, 500);

app.listen(3000, () => {
	console.info('Server started on port 3000');
})

