import {
  SEND_COMMAND,
  GET_DATA_PORTS, 
  SET_SERIAL_PORTS,
  SENT_COMMAND,
  INCREMENT_EPOCH,
  SWITCH_MOCK_OBC
} from "../actions/action-types";

const initialState = {
  data_port: {
    data: "000"
  },
  list_ports: {
    listports: []
  },
  activePort: '',
  timelinedata: [],
  commands: [],
  timeline_count: 0, // A counter of how many data items we've received. 
  command_sent_count: 0,
  command_to_send: false,
  epoch: 0,
  mockOBC: false
};

/* Reducer
    - takes in the state (the current state)
    - takes in an action (an action type string + some other data usually)
    - switch on the action, and depending on which action occurred, modify the state appropriately
        - we only ever append to the state
*/
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERIAL_PORTS:
      console.log("Data count:", state.ports)
      return { ...state,
        list_ports: {
          ...action.payload,
        }
      };
     case GET_DATA_PORTS:
      return { ...state,
        data_port: {
          ...action.payload,
        }
      };
    case SEND_COMMAND:
      console.log("Command", action.payload)
      return { ...state,
        commands: [...state.commands, {
          ...action.payload
        }],
        command_to_send: true
      };

    case SENT_COMMAND:
      return { ...state,
        commands: state.commands.slice(1),
        command_to_send: false,
        timelinedata: [
          ...state.timelinedata,
          {
            ...action.payload
          }
        ],
        timeline_count: state.timeline_count + 1
      };

    case INCREMENT_EPOCH:
      return { ...state,
        epoch: state.epoch + 1
      }

    case SWITCH_MOCK_OBC:
      return {...state, 
      mockOBC: action.payload.enable_mock
    }

    default:
      return state;
  }
};

export default rootReducer;
