import { setSerialPorts, getDataPort } from "../actions/catwan-actions";

import store from "../store";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import axios from "axios";

/**
 */
import { userInfo } from "os";
import fs from "fs";

let logFileName;
if (process.platform == "darwin") {
  console.log(userInfo().username);
  logFileName = `/Users/${userInfo().username}/Documents/ec-catwan-monitor`;
} else if (process.platform == "win32") {
  console.log(userInfo().username);
  logFileName = `C:\\Users\\${
    userInfo().username
  }\\Documents\\ec-catwan-monitor`;
} else if (process.platform == "linux") {
  console.log(userInfo().username);
  logFileName = `/home/ec-catwan-monitor`;
}

fs.mkdir(`${logFileName}`, { recursive: true }, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("Directory created successfully!");
});
console.log(logFileName);

const parser = new Readline();

let _state = store.getState();
console.log(_state);

export const getters = {
  async LIST_PORTS() {
    console.log("LIST_PORTS()");
    console.log(_state.activePort);
    let all_ports = [];
    await SerialPort.list().then((ports) => {
      ports.forEach(function(port) {
        console.log(port.path);
        console.log(port.pnpId);
        console.log(port.manufacturer);
        all_ports.push(port.comName);
      });
    });

    store.dispatch(setSerialPorts(all_ports));
  },
  __SET_PORT() {
    console.log(this.port);
    var sp = new SerialPort(this.port, { baudRate: 9600 });
    sp.pipe(parser);
    console.log(sp);
    return sp;
  },
};

export const actions = {
  CONNECT_TO_SERIALPORT(port, url, urlPort, connection) {
    store.dispatch(getDataPort("..."));
    const state = { port, url, urlPort, connection };
    const sp = getters.__SET_PORT.call(state);
    if (connection) {
      //sp.close();
    }

    if (!connection) {
      let __url = url;
      let __urlPort = urlPort;
      console.table("ENTRY IN FUNCTION");

      let timeDate = "init";
      let log;

      sp.on("open", function(err) {
        console.log("open port!");

        parser.on("data", function(data) {
          try {
            let obj = [
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
                    d3: data.charAt(2),
                  },
                  rxInfo: [
                    {
                      gatewayID: "USBStick",
                      loRaSNR: 2,
                      location: {
                        altitude: 0,
                        latitude: 0,
                        longitude: 0,
                      },
                      name: "USBStick",
                      rssi: -108,
                    },
                  ],
                  txInfo: {
                    dr: 3,
                    frequency: 90200000,
                  },
                },
              },
            ];

            let date = new Date();

            log = JSON.stringify(obj) + "\n";

            console.log("Send data port!");
            store.dispatch(getDataPort(data));

            if (__url != undefined && __urlPort != undefined) {
              axios
                .post(`${__url}:${__urlPort}`, obj)
                .then(function(response) {
                  console.log(response);
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
            fs.appendFile(
              `${logFileName}/log.txt`,
              `${timeDate}, Url: ${__url}:${__urlPort}, 
               data: ${log}`,
              function(error) {
                if (error) throw error; // Handle the error just in case
              }
            );

            timeDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, hr: ${date.getHours()} min: ${date.getMinutes()}`;
          } catch (e) {
            console.log(e.message);
          }
        });
      });
    }
  },
};

//store.subscribe(connectToSerialPort);
store.dispatch(getDataPort("..."));
