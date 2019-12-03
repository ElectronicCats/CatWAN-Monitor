import { setSerialPorts, getDataPort } from "../actions/houston-actions";

import store from "../store";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import axios from "axios";

const parser = new Readline();

let _state = store.getState();
console.log(_state);

export const mutations = {
  SELECT_PORT(port) {
    console.log(`SELECT_PORT ${port}`);
    _state.activePort = port;
  }
};

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
      var sp = new SerialPort(port, { baudRate: 9600 }); // still works if NODE_ENV is set to development!
      sp.pipe(parser);
    }

    sp.on("open", function(err) {
      console.log("open port!");
      parser.on("data", function(data) {
        console.log("Send data port!");
        store.dispatch(getDataPort(data));
        console.log(`${url}:${portUrl}`);
        if (url != undefined && portUrl != undefined) {
          axios
            .post(`${url}:${portUrl}`, [
              {
                type: "uplink",
                payload: {
                  adr: false,
                  applicationID: "1",
                  applicationName: "Relay",
                  data: "AXQs7AKABAMDgAQDA4MAAdyQBGcA3A==",
                  devEUI: "0000000000000000",
                  deviceName: "Relay1",
                  fCnt: 1,
                  fPort: 1,
                  object: {
                    d1: data.charAt(0),
                    d2: data.charAt(1),
                    d3: data.charAt(2)
                  },
                  rxInfo: [
                    {
                      gatewayID: "USBStick",
                      loRaSNR: 2.0,
                      location: {
                        altitude: 0,
                        latitude: 0,
                        longitude: 0
                      },
                      name: "USBStick",
                      rssi: -108
                    }
                  ],
                  txInfo: {
                    dr: 3,
                    frequency: 90200000
                  }
                }
              }
            ])
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
