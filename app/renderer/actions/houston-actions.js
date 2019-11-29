import { REED_SERIALPORT, POST_SERIALPORT } from "./action-types"; // snag the action type string
import hash from "object-hash";
import store from '../store';

function get_epoch(){
    let state = store.getState();
    return(state.epoch);
}

export function sendCommand(cmd_input){
    return({
        type: SEND_COMMAND,
        payload: {
            data_type: "COMMAND",
            id: hash({text: cmd_input.text, timestamp: Date()}),
            text: cmd_input.command_input,
            epoch_sent: get_epoch() 
        }
    });
}

export function sentCommand(command){
    return({type: SENT_COMMAND, payload: command});
}


export function incrementEpoch(){
    return({type: INCREMENT_EPOCH});
}

export function reed_serialport(data){
    return({type: REED_SERIALPORT, payload: {data}})
}

export function post_serialport(data){
    return({type: POST_SERIALPORT, payload: {data}})
}