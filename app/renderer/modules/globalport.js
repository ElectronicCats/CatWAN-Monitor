import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";

export function __PORT__(port) {
  var sp = new SerialPort(port, { baudRate: 9600 });
  const parser = new Readline();
  sp.pipe(parser);
  return sp;
}
