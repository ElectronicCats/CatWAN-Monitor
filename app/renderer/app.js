import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
// import SerialPort from 'serialport';
import {
  getSerialPorts,
  getDataPort,
  sentCommand,
  incrementEpoch
} from "./actions/houston-actions";
import MainComponent from "./components/MainComponent";
import OBCSim from "./simulation/obc-sim";

import Navbar from "./components/Navbar";

const launchpad = "COM3"; // default port

const use_real_port = true;

// Fake serial port
// var SerialPort = require('serialport');

// if (process.env.NODE_ENV == 'development') {
//   SerialPort = require('virtual-serialport');
// }

const obc = new OBCSim();
var SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

var sp = new SerialPort(launchpad, { baudRate: 9600 }); // still works if NODE_ENV is set to development!
const parser = new Readline()
sp.pipe(parser)


sp.on("open", function(err) {
  console.log("open port!");
  parser.on("data", function(data) {
    store.dispatch(getDataPort(data));
  });
});

/* State Change Handler */
function stateChange() {
  let _state = store.getState();

  /* Send commands when they are added */
  if (_state.commands.length > 0 && _state.command_to_send == true) {
    console.log("Sending command: ", _state.commands[0]);
    store.dispatch(sentCommand(_state.commands[0]));
  }
}

store.subscribe(stateChange);

// TODO: SerialPort.list will return good ports
function SerialPortList(){
  let all_ports = [];
  SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
      all_ports.push(port.comName);
    });
  });
  console.log(all_ports);
  store.dispatch(getSerialPorts(all_ports));
}

// I think this is just an Electron thing
const rootElement = document.querySelector(
  document.currentScript.getAttribute("data-container")
);

// Render the main component, the parent for everything else on the page
// Wrap the app and allow redux store access
ReactDOM.render(
  <Fragment>
    <Navbar />
    <Provider store={store}>
      <MainComponent />
    </Provider>
  </Fragment>,
  rootElement
);
