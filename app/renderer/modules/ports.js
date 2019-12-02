import { setSerialPorts, getDataPort } from "../actions/houston-actions";

import store from "../store";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
const parser = new Readline();


function listPorts() {
  let all_ports = [];

  SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
      all_ports.push(port.comName);
    });
  });

  console.log(all_ports);
  store.dispatch(setSerialPorts(all_ports));
}

function connectToSerialPort(port) {
  let _state = store.getState();
  console.log(_state);

  /*if (_state.list_items.length > 0) {
    console.log("State list ports: ", _state.commands[0]);
    store.dispatch(sentCommand(_state.commands[0]));
  }*/
  console.log(port);
  const launchpad = port != undefined ? port : "COM3"; // default port
  var sp = new SerialPort(launchpad, { baudRate: 9600 }); // still works if NODE_ENV is set to development!
  sp.pipe(parser);

  sp.on("open", function(err) {
    console.log("open port!");
    parser.on("data", function(data) {
      store.dispatch(getDataPort(data));
    });
  });
}

store.subscribe(connectToSerialPort);
store.dispatch(getDataPort("000"));

export default {
  listPorts,
  connectToSerialPort
};
