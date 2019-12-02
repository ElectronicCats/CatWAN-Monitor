import {
  setSerialPorts,
  getDataPort,
  sentCommand
} from "../actions/action-types";
import store from "../store";

const launchpad = "COM3"; // default port

var SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const parser = new Readline();
var sp = new SerialPort(launchpad, { baudRate: 9600 }); // still works if NODE_ENV is set to development!
sp.pipe(parser);

sp.on("open", function(err) {
  console.log("open port!");

  parser.on("data", function(data) {
    let all_ports = [];
    SerialPort.list(function(err, ports) {
      ports.forEach(function(port) {
        all_ports.push(port.comName);
      });
    });
    console.log(all_ports);
    store.dispatch(setSerialPorts(all_ports));
    store.dispatch(getDataPort(data));
  });
});

const test = "res"


function stateChange() {
  let _state = store.getState();

  /* Send commands when they are added */
  if (_state.commands.length > 0 && _state.command_to_send == true) {
    console.log("Sending command: ", _state.commands[0]);
    store.dispatch(sentCommand(_state.commands[0]));
  }
}

store.subscribe(stateChange);
store.dispatch(getDataPort("000"));

export default {
  test
};
