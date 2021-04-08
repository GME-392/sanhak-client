import { combineReducers } from "redux";
import { AppState } from "./AppState";
import { UserData } from "./UserData";

export const rootReducer = combineReducers({ AppState, UserData });
