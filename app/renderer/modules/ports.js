import { setSerialPorts, getDataPort } from "../actions/houston-actions";

import store from "../store";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
const parser = new Readline();

let _state = store.getState();
console.log(_state);

const mutations = {
  SELECT_PORT(port) {
    _state.activePort = port;
  }
};

const getters = {
    
    LIST_PORTS() {
      if (_state.list_ports.listports.length > 0) {
        console.log(`State list ports: ${_state.list_ports.listports.length}`);
        //store.dispatch(sentCommand(_state.commands[0]));
      }
      console.log(_state.activePort);
      let all_ports = [];

      SerialPort.list(function(err, ports) {
        ports.forEach(function(port) {
          all_ports.push(port.comName);
        });
      });

      console.log(all_ports);
      store.dispatch(setSerialPorts(all_ports));
    }
}

const actions = {
  CONNECT_TO_SERIALPORT() {
    if(_state.activePort != null){
      var sp = new SerialPort(_state.activePort , { baudRate: 9600 }); // still works if NODE_ENV is set to development!
      sp.pipe(parser);
    
      sp.on("open", function(err) {
        console.log("open port!");
        parser.on("data", function(data) {
          console.log("Send data port!")
          store.dispatch(getDataPort(data));
        });
      });
    }
  }
}

//store.subscribe(connectToSerialPort);
store.dispatch(getDataPort("???"));
export default {
  actions,
  mutations,
  getters
};
