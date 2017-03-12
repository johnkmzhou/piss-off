const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const socket = require('express-ws')(app);

// setup pi connection
gpio.wiringPiSetup();
gpio.pinMode(8, gpio.INPUT);
gpio.pinMode(9, gpio.INPUT);

// listen for websocket connections
app.ws('/tilt', function (ws, req) {
  // event listener waiting for message via socket connection
  // ws.on('message', (message) => {
  // console.log('received: ${message}');
  // });
  try {
    // send a reading from tilt sensor every 50 ms
    let intervalTilt = setInterval(() => {
      ws.send(gpio.digitalRead(8));
    }, 500);

    // event listener waiting for connection to close
    ws.on('/end', () => {
      console.log('Connection closed.');
      clearInterval(intervalTilt);
    });
  } catch (error) {
    console.log(error)
  }
});

// listen for websocket connections
app.ws('/mercury', function (ws, req) {
  try {
    // send a reading from tilt sensor every 50 ms
    let intervalMercury = setInterval(() => {
      ws.send(gpio.digitalRead(9));
    }, 500);

    // event listener waiting for connection to close
    ws.on('end', () => {
      console.log('Connection closed.');
      clearInterval(intervalMercury);
    });
  } catch (error) {
    console.log(error)
  }
});

// listen for websocket connection
app.ws('/flush', function (ws, req) {
  try {
    // send a reading if button is pushed
    let intervalFlush = setInterval(() => {
      let i = gpio.digitalRead(7);
      if (i === 1) {
        ws.send(i)
      }
    }, 50);
    // event listener waiting for connection to close
    ws.on('end', () => {
      console.log('Connection closed.');
      clearInterval(intervalFlush);
    });
  } catch (error) {
    console.log(error)
  }
});

app.listen(3000, () => {
  console.info('Server started on port 3000');
});

