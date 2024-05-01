import { combineReducers } from "redux";

import authReducer from "./slices/authSliceTest";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
