import { setSerialPorts, getDataPort } from "../actions/houston-actions";

import store from "../store";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import axios from "axios";

const parser = new Readline();

let _state = store.getState();
console.log(_state);

export const getters = {
  async LIST_PORTS() {
    console.log("LIST_PORTS()");
    console.log(_state.activePort);

    let all_ports = [];
    await SerialPort.list(function(err, ports) {
      ports.forEach(function(port) {
        all_ports.push(port.comName);
      });
    });
    console.log(all_ports);

    store.dispatch(setSerialPorts(all_ports));

    if (_state.list_ports.listports.length > 0) {
      console.log(`State list ports: ${_state.list_ports.listports.length}`);
      //store.dispatch(sentCommand(_state.commands[0]));
    }
  }
};

export const actions = {
  CONNECT_TO_SERIALPORT(port, url, portUrl) {
    store.dispatch(getDataPort("???"));
    if (port != null) {
      var sp = new SerialPort(port, { baudRate: 9600 });
      sp.pipe(parser);
    }

    sp.on("open", function(err) {
      console.log("open port!");
      parser.on("data", function(data) {
        console.log("Send data port!");
        store.dispatch(getDataPort(data));
        if (url != undefined && portUrl != undefined) {
          console.log(`${url}:${portUrl}`);
          axios
            .post(`${url}:${portUrl}`, { data })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    });
  }
};

//store.subscribe(connectToSerialPort);
store.dispatch(getDataPort("???"));
