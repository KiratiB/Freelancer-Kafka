import { combineReducers } from "redux";
import actionReducer from "./actionReducer";
import signUpReducer from "./signUpReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
    actionReducer, signUpReducer, projectReducer
});