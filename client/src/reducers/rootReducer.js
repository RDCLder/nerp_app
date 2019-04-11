import { combineReducers } from "redux";
import firstReducer from "./firstReducer";
import secondReducer from "./secondReducer";

export default combineReducers({
    first: firstReducer,
    second: secondReducer
});