import { createStore } from "redux";
import rootReducer from "./reducers/catwan-reducers";

const store = createStore(rootReducer);
export default store;