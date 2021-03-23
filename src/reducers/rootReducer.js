import { combineReducers } from "redux";
import { animalReducer } from "./animalReducer";

import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  animal: animalReducer,
});
